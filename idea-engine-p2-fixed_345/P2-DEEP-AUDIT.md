# IDEA ENGINE P2 — DEEP AUDIT + OPTIMISATION

**Audited:** 2026-04-25  
**Codebase:** `idea-engine-p2-full.zip` (pipeline-queue architecture)  
**Files scanned:** 52

---

## TRIAGE TABLE

| # | Issue | Severity | File | Status |
|---|-------|----------|------|--------|
| 1 | Classifier complaint count races inside `Promise.all` | P1 | `workers/classifier.ts:109` | FIXED |
| 2 | Embedding stored as JSON string, not pgvector literal | P0 | `workers/embeddings.ts:170` | FIXED |
| 3 | Cluster prune deletes all recent small clusters, not just new ones | P0 | `workers/clustering.ts:191` | FIXED |
| 4 | New clusters get 0 momentum (25% weight), permanently underranked day 1 | P1 | `workers/scorer.ts:33` | FIXED |
| 5 | `EvidenceSchema.url` rejects non-standard URLs, crashes Opus synthesis | P0 | `lib/types.ts:116` | FIXED |
| 6 | Sidebar countdown targets local 10 AM, not UTC 10 AM | P2 | `components/Sidebar.tsx:22` | FIXED |
| 7 | Bookmarks API uses `createServiceClient` bypassing RLS | P2 | `app/api/bookmarks/[id]/route.ts` | FIXED |
| 8 | Dead Reddit OAuth vars in `env.example` | P3 | `env.example` | FIXED |
| 9 | `parseLLMJson` fails if LLM prefixes text before JSON | P1 | `lib/utils.ts:30` | FIXED |
| 10 | Trigger route has NO auth — anyone can POST and start $2.50 pipeline run | P0 | `app/api/trigger/route.ts:15` | FIXED |
| 11 | `/api/pipeline/advance` has NO auth — unauthenticated pipeline execution | P0 | `app/api/pipeline/advance/route.ts:41` | FIXED |
| 12 | Embedding cache check is sequential: 1 redis.get() per post | PERF | `workers/embeddings.ts:36-43` | FIXED |
| 13 | Embedding cache write is sequential: 1 redis.set() per embedding | PERF | `workers/embeddings.ts:63-66` | FIXED |
| 14 | Scorer upserts 50 daily_scores rows sequentially | PERF | `workers/scorer.ts:198-210` | FIXED |
| 15 | Synthesizer upserts ideas one-by-one instead of batch | PERF | `workers/synthesizer.ts:240-256` | FIXED |
| 16 | `RawPostInsertSchema.url` z.string().url() rejects edge-case URLs | P2 | `lib/types.ts:54` | FIXED |
| 17 | Voyage 429 retry has no limit — infinite recursion on persistent rate-limit | P1 | `workers/embeddings.ts:85-89` | FIXED |
| 18 | `pipeline-queue.ts` getJob does wasteful stringify→parse round-trip | P3 | `lib/pipeline-queue.ts:60` | FIXED |
| 19 | PostgREST JSON path ordering is text-based (`engagement_json->score`) | P2 | 3 files | FLAGGED |
| 20 | `clusters.category` defaults to B2C for all new clusters | P3 | `workers/clustering.ts:155` | FLAGGED |
| 21 | Bookmarks `UNIQUE(idea_id)` blocks multi-user | P3 | `migrations/002_add_bookmarks.sql` | FLAGGED |

---

## FIX DETAILS

### #1 — Classifier complaint count race (P1)

**Root cause:** `complaints++` inside `Promise.all(map(...))` — side effect in parallel callback races.

**Fix:** Count from synchronous `results` array before parallel DB writes.

---

### #2 — Embedding stored as JSON string (P0 FATAL)

**Root cause:** `JSON.stringify(embedding)` produces `"[0.1,0.2,...]"` — double-escaped. pgvector needs `[0.1,0.2,...]` literal. Every embedding is garbage; all clustering silently fails.

**Fix:** `` `[${embedding.join(',')}]` ``

---

### #3 — Cluster prune CASCADE-deletes valid data (P0 FATAL)

**Root cause:** Prune query uses time-window + `post_count < 3` on all clusters. Catches pre-existing clusters whose trigger hasn't updated `post_count` yet. CASCADE deletes their `cluster_posts`, orphans `raw_posts.cluster_id`.

**Fix:** Only prune clusters from `newClusterPosts` map (created in this run).

---

### #4 — New cluster momentum = 0 (P1)

**Root cause:** `calcMomentum` returns 0 for `isNew`. 25% of composite lost on day 1.

**Fix:** `isNew && last3d > 0 → 0.5` (neutral baseline).

---

### #5 — Evidence URL Zod crashes Opus synthesis (P0 FATAL)

**Root cause:** `z.string().url()` on LLM-generated URLs. One malformed URL kills the entire $0.50+ Opus batch.

**Fix:** `z.string().max(500)`.

---

### #6 — Sidebar countdown wrong timezone (P2)

**Root cause:** `setHours(10)` uses local TZ. Cron is UTC.

**Fix:** `setUTCHours(10)` + `setUTCDate()`.

---

### #7 — Bookmarks bypass RLS (P2)

**Root cause:** `createServiceClient()` in POST/DELETE handlers.

**Fix:** Single `getAuthClient()` returns RLS-respecting client + user.

---

### #8 — Dead env vars (P3)

**Root cause:** Reddit OAuth vars in `env.example` but worker uses no-auth.

**Fix:** Replace with comment.

---

### #9 — parseLLMJson fragile (P1)

**Root cause:** Only strips markdown fences, then `JSON.parse` on full string. LLM preamble like "Here is the result:" causes crash.

**Fix:** Find first `{`/`[`, find matching last `}`/`]`, parse only that substring.

---

### #10 — Trigger route has NO auth (P0 SECURITY)

**Root cause:** `/api/trigger` POST handler has zero auth check. Middleware excludes `/api/*`. Any unauthenticated request starts a full pipeline run ($2.50+ in LLM spend).

**Fix:** Add Supabase session check at handler entry.

---

### #11 — Pipeline advance has NO auth (P0 SECURITY)

**Root cause:** `/api/pipeline/advance` POST accepts `{ runId }` with no auth. Anyone can execute arbitrary pipeline stages.

**Fix:** Require `Authorization: Bearer ${CRON_SECRET}` header. Updated `enqueueNextStage()` to send it.

---

### #12 — Embedding cache check is O(n) round-trips (PERF)

**Root cause:** Sequential `redis.get()` per post. 500 posts = 500 serial round-trips.

**Fix:** `redis.mget(...cacheKeys)` — single round-trip.

**Impact:** ~10-50x faster cache check depending on post count.

---

### #13 — Embedding cache write is O(n) round-trips (PERF)

**Root cause:** Sequential `redis.set()` per embedding.

**Fix:** `redis.pipeline()` + batch `pipe.set()` + single `pipe.exec()`.

---

### #14 — Scorer writes 50 rows sequentially (PERF)

**Root cause:** Loop with `await supabase.upsert()` per cluster.

**Fix:** Build array of all 50 score rows, single `upsert(scoreRows, { onConflict })`.

**Impact:** 50 DB round-trips → 1.

---

### #15 — Synthesizer writes ideas one-by-one (PERF)

**Root cause:** Loop with `await supabase.upsert()` per idea.

**Fix:** Batch all ideas per category into single upsert.

**Impact:** 5 DB round-trips → 1 per category.

---

### #16 — RawPostInsertSchema URL validation too strict (P2)

**Root cause:** `z.string().url().nullable()` rejects edge-case URLs from scrapers.

**Fix:** `z.string().nullable()`.

---

### #17 — Voyage 429 infinite recursion (P1)

**Root cause:** `callVoyage` retries on 429 by calling itself with no retry limit.

**Fix:** Add `retries` parameter, cap at 3.

---

### #18 — getJob wasteful parse round-trip (P3)

**Root cause:** Upstash SDK may return parsed object; code does `JSON.stringify` then `JSON.parse`.

**Fix:** Check `typeof raw`, return directly if already object.

---

## FLAGGED (not fixed — require migration or decision)

### #19 — JSON path sort is text-based (P2)

`ORDER BY engagement_json->score` via PostgREST compares text, not numbers. Score `9` sorts above `80`. Fix requires generated column or application-side sort.

### #20 — New clusters default to B2C (P3)

`clustering.ts:155` hardcodes `category: 'B2C'`. Clusters below `MIN_CLUSTER_SIZE` never get labelled. Schema requires migration to allow NULL.

### #21 — Bookmarks single-user only (P3)

`UNIQUE(idea_id)` means one bookmark per idea globally. Fix requires `user_id` column + `UNIQUE(user_id, idea_id)`.

---

## FILE CHANGES SUMMARY

| Action | File | Notes |
|--------|------|-------|
| MODIFIED | `workers/classifier.ts` | Race-free complaint count |
| MODIFIED | `workers/embeddings.ts` | pgvector format, mget/pipeline cache, retry cap |
| MODIFIED | `workers/clustering.ts` | Run-scoped prune |
| MODIFIED | `workers/scorer.ts` | Momentum baseline, batch upsert |
| MODIFIED | `workers/synthesizer.ts` | Batch idea upsert |
| MODIFIED | `lib/types.ts` | Relaxed URL validation |
| MODIFIED | `lib/utils.ts` | Robust JSON extraction |
| MODIFIED | `lib/pipeline-queue.ts` | Auth header, clean getJob |
| MODIFIED | `components/Sidebar.tsx` | UTC countdown |
| MODIFIED | `app/api/trigger/route.ts` | Restored session auth |
| MODIFIED | `app/api/pipeline/advance/route.ts` | Added CRON_SECRET auth |
| MODIFIED | `app/api/bookmarks/[id]/route.ts` | RLS-respecting client |
| MODIFIED | `env.example` | Removed dead Reddit vars |

---

## SUMMARY

| Severity | Count | Fixed |
|----------|-------|-------|
| P0 FATAL / SECURITY | 5 | 5 |
| P1 | 4 | 4 |
| P2 | 3 | 3 |
| P3 | 2 | 2 |
| PERF | 4 | 4 |
| **Total** | **18** | **18** |

**3 flagged items** require migrations or design decisions — not applied.

**Performance impact:** ~60 sequential DB/Redis round-trips eliminated per pipeline run. Embedding cache check dropped from O(n) to O(1) round-trips. Scorer and synthesizer DB writes dropped from O(n) to O(1).
