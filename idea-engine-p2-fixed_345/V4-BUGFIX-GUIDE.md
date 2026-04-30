# Idea Engine v4 — 6 Bugs Found + Fixes

All bugs are in the HN worker addition + Reddit worker rewrite + trigger route changes.
Frontend was untouched in v4 and remains clean from the v3 fix pass.

---

## BUG 1 — HN worker inserts posts as source='reddit' (FATAL)
**File:** `workers/hackernews.ts` line 90, `schema.sql`, `lib/types.ts`
**Broken code:**
```ts
source: 'reddit', // reuse reddit source type since schema only allows known sources
```
**Root cause:** The DB CHECK constraint only allows `reddit/product_hunt/app_store/play_store`. Instead of adding `'hackernews'` to the constraint and Zod enum, the builder lied and used `'reddit'` with a `source_id: 'hn_...'` prefix. This corrupts the data in three ways: cluster detail pages show `r/hackernews`, frequency counts mix Reddit and HN posts making scoring wrong, and there's no way to query HN-only posts.
**Fix:** Three changes:
1. `schema.sql` — add `'hackernews'` to the CHECK constraint
2. `lib/types.ts` — add `'hackernews'` to the `RawPostInsertSchema.source` Zod enum
3. `workers/hackernews.ts` — change `source: 'reddit'` to `source: 'hackernews'`

**Migration for existing databases** — run once in Supabase SQL Editor:
```sql
ALTER TABLE raw_posts DROP CONSTRAINT raw_posts_source_check;
ALTER TABLE raw_posts ADD CONSTRAINT raw_posts_source_check
  CHECK (source IN ('reddit','product_hunt','app_store','play_store','hackernews'));
```
This migration file is included at `migrations/001_add_hackernews_source.sql`.

---

## BUG 2 — Reddit worker will timeout (FATAL)
**File:** `workers/reddit.ts` line 16
**Broken code:**
```ts
const MAX_PAGES_PER_SUB = 5;
const DELAY_BETWEEN_REQ = 7000; // 7s between requests
```
**Root cause:** The builder rewrote the Reddit worker to use public JSON endpoints instead of OAuth, but set a 7-second delay between every request. 20 subreddits × 5 pages max × 7s = 700 seconds worst case. `maxDuration` is 300s. The ingest cron will timeout before finishing half the subreddits.
**Fix:** Reduce delay to 2s (public JSON endpoint tolerates ~10 rpm without issues) and cap pages to 3:
```ts
const MAX_PAGES_PER_SUB = 3;
const DELAY_BETWEEN_REQ = 2000;
```
Worst case: 20 × 3 × 2s = 120s. With HN running in parallel (~15s), total ingestion stays well under 300s.

---

## BUG 3 — Trigger route auth removed (P1)
**File:** `app/api/trigger/route.ts` line 19
**Broken code:**
```ts
export async function POST(_req: NextRequest) {
  // no auth check — anyone can call this
```
**Root cause:** Builder removed the Supabase session auth check. The middleware matcher excludes `/api/*`, so there's no auth layer. Any unauthenticated request can POST to `/api/trigger` and start a full pipeline run costing ~$2.50 in LLM spend (Opus synthesis).
**Fix:** Restore the session check:
```ts
export async function POST(req: NextRequest) {
  const supabaseAuth = createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
```
Also restore the `createClient` import from `@/lib/supabase/server`.

---

## BUG 4 — HN posts display as r/hackernews in cluster view (P2)
**Files:** `workers/hackernews.ts` lines 97-98, `app/(dashboard)/cluster/[id]/ClusterClient.tsx`
**Broken code:**
```ts
// hackernews.ts
engagement_json: {
  subreddit: 'hackernews',  // renders as "r/hackernews" in cluster view
}
```
**Root cause:** The HN worker stuffed `subreddit: 'hackernews'` into engagement_json to reuse the cluster detail rendering. But the ClusterClient renders `r/{subreddit}` — so HN posts show as `r/hackernews` which is wrong.
**Fix:** Two changes:
1. HN worker — remove `subreddit` from engagement_json, keep `source: 'hackernews'` and add `tags` for HN metadata
2. ClusterClient PostCard — check `post.source` and render an orange `HN` badge for hackernews posts, `r/{subreddit}` for reddit posts

---

## BUG 5 — No worker:hackernews script in package.json (P2)
**File:** `package.json`
**Root cause:** Reddit has `"worker:reddit": "tsx workers/reddit.ts"` but no equivalent for HN. Can't run the HN worker standalone. Pipeline script also doesn't include it.
**Fix:** Add the script and update pipeline:
```json
"worker:hackernews": "tsx workers/hackernews.ts",
"pipeline": "tsx workers/reddit.ts && tsx workers/hackernews.ts && tsx workers/classifier.ts && ..."
```

---

## BUG 6 — Zod enum doesn't accept 'hackernews' (P2)
**File:** `lib/types.ts`
**Broken code:**
```ts
source: z.enum(['reddit','product_hunt','app_store','play_store']),
```
**Root cause:** Masked by bug 1 (worker lied with `'reddit'`), but once the source is corrected to `'hackernews'`, Zod validation would reject it.
**Fix:**
```ts
source: z.enum(['reddit','product_hunt','app_store','play_store','hackernews']),
```

---

## File Changes Summary

| Action | File | Notes |
|--------|------|-------|
| MODIFIED | `schema.sql` | Added 'hackernews' to source CHECK |
| MODIFIED | `lib/types.ts` | Added 'hackernews' to Zod source enum |
| MODIFIED | `workers/hackernews.ts` | Fixed source, removed subreddit from engagement_json |
| MODIFIED | `workers/reddit.ts` | Reduced delay 7s→2s, pages 5→3 |
| MODIFIED | `app/api/trigger/route.ts` | Restored session auth |
| MODIFIED | `app/(dashboard)/cluster/[id]/ClusterClient.tsx` | HN-specific orange badge |
| MODIFIED | `package.json` | Added worker:hackernews, updated pipeline |
| CREATED | `migrations/001_add_hackernews_source.sql` | Run once on existing databases |
