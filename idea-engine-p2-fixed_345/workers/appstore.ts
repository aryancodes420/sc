/**
 * workers/appstore.ts — Stage 1c: App Store Review Ingestion
 * Uses Apple's free iTunes RSS feed — no API key, no rate limits.
 * Fetches the 50 most recent reviews for each target app.
 *
 * Standalone: npx tsx workers/appstore.ts
 */

import { createServiceClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { RawPostInsertSchema, type RawPostInsert } from '@/lib/types';
import { sleep } from '@/lib/utils';

const LOOKBACK_HOURS = 24 * 7; // App Store RSS has no date filter — take last 7d from feed
const UPSERT_CHUNK   = 500;
const DELAY_MS       = 1000; // 1s between apps — Apple RSS is lenient

// Top productivity/business apps — (name, apple_id)
const TARGET_APPS = [
  { name: 'Notion',      id: '1232780281' },
  { name: 'Slack',       id: '618783545'  },
  { name: 'Trello',      id: '461504587'  },
  { name: 'Monday.com',  id: '1298450613' },
  { name: 'Asana',       id: '489969512'  },
  { name: 'Todoist',     id: '572688855'  },
  { name: 'Calendly',    id: '1141203986' },
  { name: 'Zapier',      id: '1309417006' },
  { name: 'Airtable',    id: '1063637232' },
  { name: 'Linear',      id: '1445323832' },
] as const;

// iTunes RSS returns JSON feed for app reviews
// https://itunes.apple.com/us/rss/customerreviews/id=APP_ID/sortBy=mostRecent/json
const ITUNES_RSS = (appId: string) =>
  `https://itunes.apple.com/us/rss/customerreviews/id=${appId}/sortBy=mostRecent/json`;

// ── Zod schemas for iTunes RSS response ───────────────────────────
const ItunesEntrySchema = z.object({
  id:      z.object({ label: z.string() }),
  title:   z.object({ label: z.string() }),
  content: z.object({ label: z.string() }),
  'im:rating': z.object({ label: z.string() }).optional(),
  author:  z.object({ name: z.object({ label: z.string() }) }).optional(),
  updated: z.object({ label: z.string() }).optional(),
  link:    z.object({ attributes: z.object({ href: z.string() }) }).optional(),
});

const ItunesRSSSchema = z.object({
  feed: z.object({
    entry: z.array(ItunesEntrySchema).optional(),
  }),
});

type ItunesEntry = z.infer<typeof ItunesEntrySchema>;

async function fetchAppReviews(appId: string): Promise<ItunesEntry[]> {
  const url = ITUNES_RSS(appId);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'IdeaEngine/1.0', Accept: 'application/json' },
  });

  if (!res.ok) {
    console.warn(`  [appstore] HTTP ${res.status} for app ${appId}`);
    return [];
  }

  const json = await res.json();
  const parsed = ItunesRSSSchema.safeParse(json);
  if (!parsed.success) {
    console.warn(`  [appstore] Parse error for app ${appId}:`, parsed.error.issues[0]?.message);
    return [];
  }

  return parsed.data.feed.entry ?? [];
}

function toInsert(
  entry: ItunesEntry,
  appName: string,
  appId: string,
  cutoffMs: number,
  runId: string | null
): RawPostInsert | null {
  const title   = entry.title.label.trim();
  const body    = entry.content.label.trim();
  const text    = body ? `${title}\n\n${body}` : title;
  const rating  = parseInt(entry['im:rating']?.label ?? '3', 10);

  if (text.length < 20) return null;

  // Reject reviews newer than LOOKBACK — we only want recent ones from the feed
  const updatedRaw = entry.updated?.label;
  if (updatedRaw) {
    const ts = new Date(updatedRaw).getTime();
    if (isNaN(ts) || ts < cutoffMs) return null;
  }

  // Only ingest low-rated reviews (1-3 stars) — those are complaints
  if (rating > 3) return null;

  const reviewId   = entry.id.label;
  const authorName = entry.author?.name.label ?? null;
  const url        = entry.link?.attributes.href ?? `https://apps.apple.com/app/id${appId}`;
  const createdAt  = updatedRaw
    ? new Date(updatedRaw).toISOString()
    : new Date().toISOString();

  return RawPostInsertSchema.parse({
    source:     'app_store',
    source_id:  `as_${appId}_${reviewId}`,
    author:     authorName,
    title,
    text,
    created_at: createdAt,
    url,
    engagement_json: {
      rating,
      app_name: appName,
      app_id:   appId,
      source:   'app_store',
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

export interface AppStoreResult {
  postsIngested: number;
  appsScraped:   number;
  errors:        string[];
  durationMs:    number;
}

export async function runAppStoreIngestion(runId: string | null = null): Promise<AppStoreResult> {
  const t0         = Date.now();
  const cutoffMs   = Date.now() - LOOKBACK_HOURS * 3_600_000;
  const errors:    string[] = [];
  const allRows:   RawPostInsert[] = [];
  let   appsScraped = 0;

  console.log(`[appstore] Fetching reviews for ${TARGET_APPS.length} apps`);

  for (const app of TARGET_APPS) {
    try {
      const entries = await fetchAppReviews(app.id);
      let appCount  = 0;

      for (const entry of entries) {
        const row = toInsert(entry, app.name, app.id, cutoffMs, runId);
        if (row) { allRows.push(row); appCount++; }
      }

      console.log(`  ${app.name.padEnd(14)} → ${entries.length} reviews, ${appCount} complaints`);
      appsScraped++;
      await sleep(DELAY_MS);
    } catch (err) {
      const msg = `${app.name}: ${(err as Error).message}`;
      errors.push(msg);
      console.error('  [appstore] Error:', msg);
    }
  }

  const inserted = await upsert(allRows);
  console.log(`[appstore] Done: ${inserted} new posts from ${allRows.length} complaints across ${appsScraped} apps`);

  return { postsIngested: inserted, appsScraped, errors, durationMs: Date.now() - t0 };
}

if (require.main === module) {
  runAppStoreIngestion().then(r => {
    console.log(`\nDone: ${r.postsIngested} posts, ${r.appsScraped} apps, ${r.durationMs}ms`);
    if (r.errors.length) console.error('Errors:', r.errors);
    process.exit(r.errors.length ? 1 : 0);
  });
}
