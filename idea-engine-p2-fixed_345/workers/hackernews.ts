/**
 * workers/hackernews.ts — Hacker News Ingestion
 * Uses HN's free public Algolia API — no key needed, no rate limits.
 * Fetches posts tagged as "ask_hn" and story posts from last 24h.
 * Great source of developer + founder complaints and problems.
 *
 * Standalone: npx tsx workers/hackernews.ts
 */

import { createServiceClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { RawPostInsertSchema, type RawPostInsert } from '@/lib/types';
import { sleep } from '@/lib/utils';

const LOOKBACK_HOURS = 24;
const UPSERT_CHUNK   = 500;

// Algolia HN search API — free, no auth
const HN_API = 'https://hn.algolia.com/api/v1/search_by_date';

// Search queries that surface complaints and problems
const SEARCH_QUERIES = [
  'frustrated annoyed broken',
  'not working fails error',
  'wish there was alternative',
  'problem with workflow',
  'terrible experience bad UX',
  'no good tool for',
  'spending too much time',
  'nobody has solved',
  'pain point missing feature',
  'manual process automate',
  'ask HN: how do you',
  'ask HN: is there a tool',
  'ask HN: why is there no',
  'ask HN: looking for',
] as const;

const HNHitSchema = z.object({
  objectID:       z.string(),
  title:          z.string().nullable().default(''),
  story_text:     z.string().nullable().default(''),
  comment_text:   z.string().nullable().default(''),
  author:         z.string().nullable().default(''),
  url:            z.string().nullable().default(''),
  points:         z.number().nullable().default(0),
  num_comments:   z.number().nullable().default(0),
  created_at_i:   z.number(),
  _tags:          z.array(z.string()).default([]),
});

const HNResponseSchema = z.object({
  hits: z.array(HNHitSchema),
  nbHits: z.number(),
});

async function fetchHNQuery(
  query: string,
  cutoffTimestamp: number
): Promise<z.infer<typeof HNHitSchema>[]> {
  const params = new URLSearchParams({
    query,
    tags:              '(story,ask_hn,show_hn)',
    numericFilters:    `created_at_i>${cutoffTimestamp}`,
    hitsPerPage:       '50',
    attributesToRetrieve: 'objectID,title,story_text,comment_text,author,url,points,num_comments,created_at_i,_tags',
  });

  const res = await fetch(`${HN_API}?${params}`, {
    headers: { 'User-Agent': 'IdeaEngine/1.0' },
  });

  if (!res.ok) {
    console.warn(`  [hn] Query "${query}" failed: HTTP ${res.status}`);
    return [];
  }

  const json = await res.json();
  const parsed = HNResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.warn(`  [hn] Parse error for query "${query}"`);
    return [];
  }

  return parsed.data.hits;
}

function toInsert(hit: z.infer<typeof HNHitSchema>, runId: string | null): RawPostInsert | null {
  const text = [
    hit.title,
    hit.story_text ?? hit.comment_text ?? '',
  ].filter(Boolean).join('\n\n').trim();

  if (text.length < 20) return null;

  return RawPostInsertSchema.parse({
    source:     'hackernews',
    source_id:  `hn_${hit.objectID}`,
    author:     hit.author || null,
    title:      hit.title || null,
    text,
    created_at: new Date(hit.created_at_i * 1000).toISOString(),
    url:        hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
    engagement_json: {
      score:        hit.points ?? 0,
      num_comments: hit.num_comments ?? 0,
      source:       'hackernews',
      tags:         hit._tags ?? [],
    },
    run_id: runId,
  });
}

async function upsert(rows: RawPostInsert[]): Promise<number> {
  if (rows.length === 0) return 0;
  const supabase = createServiceClient();
  let inserted = 0;
  for (let i = 0; i < rows.length; i += UPSERT_CHUNK) {
    const chunk = rows.slice(i, i + UPSERT_CHUNK);
    const { error, count } = await supabase
      .from('raw_posts')
      .upsert(chunk, { onConflict: 'source,source_id', ignoreDuplicates: true, count: 'exact' });
    if (error) throw new Error(`Supabase upsert: ${error.message}`);
    inserted += count ?? 0;
  }
  return inserted;
}

export interface HackerNewsResult {
  postsIngested: number;
  durationMs: number;
  errors: string[];
}

export async function runHackerNewsIngestion(runId: string | null = null): Promise<HackerNewsResult> {
  const t0             = Date.now();
  const cutoffTs       = Math.floor(Date.now() / 1000) - LOOKBACK_HOURS * 3600;
  const seen           = new Set<string>();
  const allRows: RawPostInsert[] = [];
  const errors: string[] = [];

  console.log(`[hn] Starting Hacker News ingestion — ${SEARCH_QUERIES.length} queries`);

  for (const query of SEARCH_QUERIES) {
    try {
      const hits = await fetchHNQuery(query, cutoffTs);
      let newCount = 0;

      for (const hit of hits) {
        if (seen.has(hit.objectID)) continue;
        seen.add(hit.objectID);
        const row = toInsert(hit, runId);
        if (row) { allRows.push(row); newCount++; }
      }

      console.log(`  "${query}" → ${hits.length} hits, ${newCount} new`);
      await sleep(300); // brief pause between queries
    } catch (err) {
      const msg = `query "${query}": ${(err as Error).message}`;
      errors.push(msg);
      console.error('  [hn] Error:', msg);
    }
  }

  const inserted = await upsert(allRows);
  console.log(`[hn] Done: ${inserted} posts inserted from ${allRows.length} unique hits`);

  return { postsIngested: inserted, durationMs: Date.now() - t0, errors };
}

if (require.main === module) {
  runHackerNewsIngestion().then(r => {
    console.log(`\nDone: ${r.postsIngested} posts, ${r.durationMs}ms`);
    process.exit(r.errors.length ? 1 : 0);
  });
}
