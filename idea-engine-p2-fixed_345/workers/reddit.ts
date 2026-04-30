/**
 * workers/reddit.ts — Stage 1: Reddit Ingestion (no-auth version)
 * Uses Reddit's free public JSON endpoints — no API key needed.
 * Appends .json to subreddit /new URLs. Rate limit: ~10 req/min.
 *
 * Standalone: npx tsx workers/reddit.ts
 */

import { createServiceClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { RawPostInsertSchema, type RawPostInsert } from '@/lib/types';
import { sleep } from '@/lib/utils';

const LOOKBACK_HOURS    = 24;
const POSTS_PER_PAGE    = 100;
const MAX_PAGES_PER_SUB = 3;    // Fix: was 5 — 20 subs × 5 pages × 7s = 700s > maxDuration
const DELAY_BETWEEN_REQ = 2000; // Fix: was 7000 — 2s is safe for public JSON (tested ~10 rpm)
const UPSERT_CHUNK      = 500;

const TARGET_SUBREDDITS = [
  'entrepreneur','SaaS','startups','smallbusiness','freelance',
  'consulting','webdev','programming','devops','ExperiencedDevs',
  'productivity','nocode','Notion','personalfinance','realestate',
  'legaladvice','Teachers','marketing','ecommerce','customerservice',
] as const;

const RedditJsonPostSchema = z.object({
  id:           z.string(),
  author:       z.string().nullable().default('[deleted]'),
  title:        z.string(),
  selftext:     z.string().default(''),
  url:          z.string(),
  permalink:    z.string(),
  subreddit:    z.string(),
  score:        z.number(),
  num_comments: z.number(),
  upvote_ratio: z.number().default(0),
  created_utc:  z.number(),
  is_self:      z.boolean(),
  stickied:     z.boolean().default(false),
  over_18:      z.boolean().default(false),
});

const RedditJsonListingSchema = z.object({
  data: z.object({
    after:    z.string().nullable(),
    children: z.array(z.object({
      kind: z.string(),
      data: RedditJsonPostSchema,
    })),
  }),
});

async function fetchSubreddit(
  sub: string,
  cutoffUtc: number
): Promise<{ posts: z.infer<typeof RedditJsonPostSchema>[]; requests: number }> {
  const posts: z.infer<typeof RedditJsonPostSchema>[] = [];
  let after: string | null = null;
  let requests = 0;

  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; IdeaEngine/1.0)',
    'Accept': 'application/json',
  };

  for (let page = 0; page < MAX_PAGES_PER_SUB; page++) {
    const qs  = new URLSearchParams({ limit: String(POSTS_PER_PAGE), sort: 'new', t: 'day' });
    if (after) qs.set('after', after);
    const url = `https://www.reddit.com/r/${sub}/new.json?${qs}`;

    try {
      const res = await fetch(url, { headers });
      requests++;

      if (res.status === 429) {
        console.warn(`  [reddit] r/${sub} rate limited — waiting 60s`);
        await sleep(60_000);
        continue;
      }
      if (!res.ok) {
        console.warn(`  [reddit] r/${sub} HTTP ${res.status} — skipping`);
        break;
      }

      const json = await res.json();
      const listing = RedditJsonListingSchema.safeParse(json);
      if (!listing.success) { console.warn(`  [reddit] r/${sub} parse error`); break; }

      let hitCutoff = false;
      for (const { data: post } of listing.data.data.children) {
        if (post.created_utc < cutoffUtc) { hitCutoff = true; break; }
        if (post.stickied || post.over_18) continue;
        const body = [post.title, post.selftext].filter(Boolean).join(' ').trim();
        if (body.length < 20) continue;
        posts.push(post);
      }

      after = listing.data.data.after;
      if (hitCutoff || !after) break;

      // Respect rate limit between pages
      await sleep(DELAY_BETWEEN_REQ);
    } catch (err) {
      console.warn(`  [reddit] r/${sub} fetch error: ${(err as Error).message}`);
      break;
    }
  }

  return { posts, requests };
}

function toInsert(post: z.infer<typeof RedditJsonPostSchema>, runId: string | null): RawPostInsert {
  const text = post.selftext?.trim()
    ? `${post.title}\n\n${post.selftext}`.trim()
    : post.title.trim();

  return RawPostInsertSchema.parse({
    source:     'reddit',
    source_id:  post.id,
    author:     post.author === '[deleted]' ? null : post.author,
    title:      post.title,
    text,
    created_at: new Date(post.created_utc * 1000).toISOString(),
    url:        `https://reddit.com${post.permalink}`,
    engagement_json: {
      score: post.score, num_comments: post.num_comments,
      upvote_ratio: post.upvote_ratio, subreddit: post.subreddit,
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

export interface RedditResult {
  postsIngested: number;
  totalRequests: number;
  errors: string[];
  durationMs: number;
}

export async function runRedditIngestion(runId: string | null = null): Promise<RedditResult> {
  const t0         = Date.now();
  const cutoffUtc  = Math.floor(Date.now() / 1000) - LOOKBACK_HOURS * 3600;
  let totalInserted = 0;
  let totalRequests = 0;
  const errors: string[] = [];

  console.log(`[reddit] Starting no-auth ingestion across ${TARGET_SUBREDDITS.length} subreddits`);

  for (const sub of TARGET_SUBREDDITS) {
    try {
      const { posts, requests } = await fetchSubreddit(sub, cutoffUtc);
      totalRequests += requests;
      const rows     = posts.map(p => toInsert(p, runId));
      const inserted = await upsert(rows);
      totalInserted += inserted;
      console.log(`  r/${sub.padEnd(20)} fetched=${posts.length} new=${inserted}`);
      // Delay between subreddits to avoid rate limiting
      await sleep(DELAY_BETWEEN_REQ);
    } catch (err) {
      const msg = `r/${sub}: ${(err as Error).message}`;
      errors.push(msg);
      console.error(' ', msg);
    }
  }

  return { postsIngested: totalInserted, totalRequests, errors, durationMs: Date.now() - t0 };
}

if (require.main === module) {
  runRedditIngestion().then(r => {
    console.log(`\nDone: ${r.postsIngested} posts, ${r.totalRequests} requests, ${r.durationMs}ms`);
    if (r.errors.length) console.error('Errors:', r.errors);
    process.exit(r.errors.length ? 1 : 0);
  });
}
