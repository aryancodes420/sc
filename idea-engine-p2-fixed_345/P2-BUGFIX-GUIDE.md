# IDEA ENGINE P2 — BUG REPORT + FIX GUIDE

**Audited:** 2026-04-24
**Codebase:** `idea-engine-p2-full.zip`
**Files scanned:** 48

---

## TRIAGE TABLE

| # | Issue | Severity | File | Status |
|---|-------|----------|------|--------|
| 1 | Classifier complaint count races inside `Promise.all` | P1 | `workers/classifier.ts:67` | FIXED |
| 2 | Embedding stored as JSON string, not pgvector literal | P0 | `workers/embeddings.ts:109` | FIXED |
| 3 | Cluster prune deletes *all* recent small clusters, not just new ones | P0 | `workers/clustering.ts:130` | FIXED |
| 4 | New clusters get 0 momentum (25% weight), permanently underranked on day 1 | P1 | `workers/scorer.ts:20` | FIXED |
| 5 | Zod `EvidenceSchema.url` rejects non-standard URLs from LLM, crashes synthesis | P0 | `lib/types.ts:84` | FIXED |
| 6 | Sidebar countdown targets local 10 AM, not UTC 10 AM (cron schedule) | P2 | `components/Sidebar.tsx:17` | FIXED |
| 7 | Bookmarks API uses `createServiceClient` bypassing RLS | P2 | `app/api/bookmarks/[id]/route.ts` | FIXED |
| 8 | Dead Reddit OAuth vars in `env.example` (worker uses no-auth) | P3 | `env.example` | FIXED |
| 9 | `parseLLMJson` fails if LLM prefixes text before JSON | P1 | `lib/utils.ts:30` | FIXED |
| 10 | Ingest cron creates duplicate run if one is already running | P1 | `app/api/cron/ingest/route.ts` | FIXED |
| 11 | PostgREST JSON path ordering is text-based, not numeric (`engagement_json->score`) | P2 | 3 files | FLAGGED |
| 12 | `clusters.category` defaults to `B2C` for all new clusters; small ones never get labelled | P3 | `workers/clustering.ts:97` | FLAGGED |
| 13 | `bookmarks` table `UNIQUE(idea_id)` blocks multi-user | P3 | `migrations/002_add_bookmarks.sql` | FLAGGED |

---

## FIX DETAILS

### #1 — Classifier complaint count race (P1)

**Root cause:** `complaints++` executes inside `Promise.all(updateBatch.map(...))` — side effect in a parallel callback races with other iterations.

**Fix:** Count complaints from the synchronous `results` array *before* the parallel DB writes.

```diff
- await Promise.all(updateBatch.map(r => {
-   if (r.is_complaint) complaints++;
-   return supabase.from('raw_posts').update(...)
- }));
+ complaints += results.filter(r => r.is_complaint).length;
+ await Promise.all(updateBatch.map(r =>
+   supabase.from('raw_posts').update(...)
+ ));
```

**Regression guard:** The counter uses `.filter().length` on a frozen array — no mutation, no race possible.

---

### #2 — Embedding stored as JSON string (P0 FATAL)

**Root cause:** `JSON.stringify(embedding)` produces `"[0.1,0.2,...]"` — a JSON-escaped string. pgvector expects the text literal `[0.1,0.2,...]`. Every embedding write succeeds but stores garbage that pgvector can't use for cosine distance. All clustering fails silently.

**Fix:**
```diff
- .update({ embedding: JSON.stringify(embedding) })
+ .update({ embedding: `[${embedding.join(',')}]` })
```

**Regression guard:** After write, read one row back and assert `typeof embedding[0] === 'number'` (pgvector returns arrays through PostgREST).

---

### #3 — Cluster prune deletes valid clusters (P0 FATAL)

**Root cause:** Prune query uses `.gte('created_at', last24h).lt('post_count', 3)` and tries to exclude "safe" IDs via `NOT IN`. But it catches pre-existing clusters whose `post_count` hasn't been updated by the trigger yet, CASCADE-deleting their `cluster_posts` and orphaning `raw_posts.cluster_id`.

**Fix:** Only prune clusters created in this run (`newClusterPosts` map keys) that are still below threshold. Never touch pre-existing clusters.

**Regression guard:** After prune, assert `SELECT count(*) FROM raw_posts WHERE cluster_id NOT IN (SELECT id FROM clusters) AND cluster_id IS NOT NULL` returns 0 (no orphaned foreign keys).

---

### #4 — New cluster momentum = 0 (P1)

**Root cause:** `calcMomentum` returns 0 for `isNew === true`. Momentum is 25% of composite. A brand-new cluster with 20 posts in its first 3 days gets `momentum=0`, losing 25 points of composite. It ranks below stale clusters with residual momentum.

**Fix:** New clusters with posts get baseline momentum 0.5. New clusters with 0 posts stay at 0.

```diff
- if (isNew) return 0;
+ if (isNew) return last3d > 0 ? 0.5 : 0;
```

---

### #5 — Evidence URL Zod validation crashes synthesis (P0 FATAL)

**Root cause:** `EvidenceSchema` has `z.string().url()`. The LLM produces evidence URLs from post data. If any URL is malformed, empty, or relative, Zod throws and the *entire* Opus synthesis batch fails — 0 ideas generated, $0.50+ Opus tokens wasted.

**Fix:** Relax to `z.string().max(500)`. URL format is cosmetic in evidence display.

---

### #6 — Sidebar countdown targets local time (P2)

**Root cause:** `next.setHours(10, 0, 0, 0)` uses local timezone. Cron runs at `0 10 * * *` UTC. User in EST sees countdown to 10 AM EST (3 PM UTC), 5h off.

**Fix:** `next.setUTCHours(10, 0, 0, 0)` + `next.setUTCDate(...)`.

---

### #7 — Bookmarks bypass RLS (P2)

**Root cause:** POST and DELETE handlers use `createServiceClient()` which bypasses RLS entirely. The `getUser()` check verifies auth, but the write uses a service key that can modify any row. Should use `createClient()` which respects RLS policies.

**Fix:** Replace `createServiceClient()` with `createClient()` in both handlers. Single function `getAuthClient()` returns both the RLS client and user.

---

### #8 — Dead env vars (P3)

**Root cause:** `env.example` lists `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USER_AGENT` but `workers/reddit.ts` uses no-auth public JSON endpoints. Dead config confuses setup.

**Fix:** Replace with a comment noting no Reddit credentials are needed.

---

### #9 — `parseLLMJson` fragile (P1)

**Root cause:** LLMs sometimes prepend text like "Here is the result:" or append "I hope this helps". The original parser only strips markdown fences, then calls `JSON.parse` on the whole string. This throws on any preamble.

**Fix:** Find the first `{` or `[`, then find the matching last `}` or `]`, parse only that substring.

---

### #10 — Ingest cron creates duplicate runs (P1)

**Root cause:** The idempotency check allowed a new run if an existing run was `status='running'` but its metadata stage wasn't `'ingested'`. Two overlapping cron invocations (Vercel can do this on cold starts) would both pass the guard and create separate runs, doubling all ingestion.

**Fix:** Any existing run in `running` status blocks new run creation, regardless of stage.

---

## FLAGGED (not fixed — require migration or architecture decision)

### #11 — JSON path sort is text-based (P2)

`ORDER BY engagement_json->score` via PostgREST compares text, not numbers. Score `9` sorts above `80`. Affects synthesizer evidence selection and cluster detail display. Fix requires a generated column `ALTER TABLE raw_posts ADD COLUMN engagement_score INT GENERATED ALWAYS AS ((engagement_json->>'score')::int) STORED` + index, or sort application-side.

### #12 — New clusters default to `B2C` (P3)

`workers/clustering.ts:97` hardcodes `category: 'B2C'` for new clusters. Clusters below `MIN_CLUSTER_SIZE` never get labelled, permanently skewing B2C counts. Fix requires either schema migration to allow `NULL` category, or labelling all clusters (not just large ones).

### #13 — Bookmarks single-user only (P3)

`UNIQUE(idea_id)` on bookmarks table means only one bookmark per idea globally. By design for single-operator, but blocks multi-user. Fix requires adding `user_id UUID REFERENCES auth.users(id)` + changing unique to `UNIQUE(user_id, idea_id)`.

---

## SUMMARY

| Severity | Count | Fixed |
|----------|-------|-------|
| P0 FATAL | 3 | 3 |
| P1 | 4 | 4 |
| P2 | 2 | 2 |
| P3 | 3 | 1 |
| **Total** | **12** | **10** |

**3 flagged items** require migrations or design decisions — not applied to the fixed zip.

Fixed codebase: `idea-engine-p2-fixed.zip`
