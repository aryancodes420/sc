/**
 * workers/playstore.ts — Stage 1d: Google Play Review Ingestion
 * Uses google-play-scraper (npm) which scrapes the public Play Store web endpoint.
 * No API key needed. Same app list as App Store worker.
 *
 * Install: npm install google-play-scraper
 * Standalone: npx tsx workers/playstore.ts
 */

import { createServiceClient } from '@/lib/supabase/server';
import { RawPostInsertSchema, type RawPostInsert } from '@/lib/types';
import { sleep } from '@/lib/utils';

// Lazy-import to avoid bundler issues — package is CJS
// eslint-disable-next-line @typescript-eslint/no-require-imports
const gplay = require('google-play-scraper') as {
  reviews: (opts: {
    appId: string;
    sort: number;
    num: number;
    lang: string;
    country: string;
    paginate?: boolean;
  }) => Promise<{ data: GPlayReview[] }>;
  sort: { NEWEST: number; RATING: number };
};

interface GPlayReview {
  id:        string;
  userName:  string | null;
  text:      string | null;
  score:     number;
  date:      Date;
  url:       string;
  title?:    string | null;
}

const LOOKBACK_HOURS = 24 * 7; // 7 days
const REVIEWS_PER_APP = 100;
const UPSERT_CHUNK    = 500;
const DELAY_MS        = 1500; // slightly longer — scraper hits web endpoint

// Same apps as App Store — Play Store IDs differ
const TARGET_APPS = [
  { name: 'Notion',      id: 'notion.id'                      },
  { name: 'Slack',       id: 'com.Slack'                      },
  { name: 'Trello',      id: 'com.trello'                     },
  { name: 'Monday.com',  id: 'com.monday'                     },
  { name: 'Asana',       id: 'com.asana.app'                  },
  { name: 'Todoist',     id: 'com.todoist.android.Todoist'    },
  { name: 'Calendly',    id: 'com.calendly.android'           },
  { name: 'Zapier',      id: 'com.zapier.android'             },
  { name: 'Airtable',    id: 'com.formagrid.airtable'         },
  { name: 'Linear',      id: 'io.linear'                      },
] as const;

function toInsert(
  review: GPlayReview,
  appName: string,
  appId: string,
  cutoffMs: number,
  runId: string | null
): RawPostInsert | null {
  const body  = review.text?.trim() ?? '';
  const title = review.title?.trim() ?? '';
  const text  = title && body ? `${title}\n\n${body}` : (body || title);

  if (text.length < 20) return null;

  // Only ingest 1–3 star reviews (complaints)
  if (review.score > 3) return null;

  // Date filter
  const ts = review.date instanceof Date ? review.date.getTime() : new Date(review.date).getTime();
  if (isNaN(ts) || ts < cutoffMs) return null;

  return RawPostInsertSchema.parse({
    source:     'play_store',
    source_id:  `gp_${appId}_${review.id}`,
    author:     review.userName ?? null,
    title:      title || null,
    text,
    created_at: new Date(ts).toISOString(),
    url:        review.url ?? `https://play.google.com/store/apps/details?id=${appId}`,
    engagement_json: {
      rating:   review.score,
      app_name: appName,
      app_id:   appId,
      source:   'play_store',
    },
    run_id: runId,
  });
}

async function fetchPlayReviews(appId: string): Promise<GPlayReview[]> {
  const result = await gplay.reviews({
    appId,
    sort:    gplay.sort.NEWEST,
    num:     REVIEWS_PER_APP,
    lang:    'en',
    country: 'us',
  });
  return result.data ?? [];
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

export interface PlayStoreResult {
  postsIngested: number;
  appsScraped:   number;
  errors:        string[];
  durationMs:    number;
}

export async function runPlayStoreIngestion(runId: string | null = null): Promise<PlayStoreResult> {
  const t0        = Date.now();
  const cutoffMs  = Date.now() - LOOKBACK_HOURS * 3_600_000;
  const errors:   string[] = [];
  const allRows:  RawPostInsert[] = [];
  let appsScraped = 0;

  console.log(`[playstore] Fetching reviews for ${TARGET_APPS.length} apps`);

  for (const app of TARGET_APPS) {
    try {
      const reviews  = await fetchPlayReviews(app.id);
      let appCount   = 0;

      for (const review of reviews) {
        const row = toInsert(review, app.name, app.id, cutoffMs, runId);
        if (row) { allRows.push(row); appCount++; }
      }

      console.log(`  ${app.name.padEnd(14)} → ${reviews.length} reviews, ${appCount} complaints`);
      appsScraped++;
      await sleep(DELAY_MS);
    } catch (err) {
      const msg = `${app.name} (${app.id}): ${(err as Error).message}`;
      errors.push(msg);
      console.error('  [playstore] Error:', msg);
    }
  }

  const inserted = await upsert(allRows);
  console.log(`[playstore] Done: ${inserted} new posts from ${allRows.length} complaints across ${appsScraped} apps`);

  return { postsIngested: inserted, appsScraped, errors, durationMs: Date.now() - t0 };
}

if (require.main === module) {
  runPlayStoreIngestion().then(r => {
    console.log(`\nDone: ${r.postsIngested} posts, ${r.appsScraped} apps, ${r.durationMs}ms`);
    if (r.errors.length) console.error('Errors:', r.errors);
    process.exit(r.errors.length ? 1 : 0);
  });
}
