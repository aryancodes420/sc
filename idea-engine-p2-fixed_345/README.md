# Idea Engine

10 validated app ideas per day, mined from real user complaints on Reddit, Product Hunt, and app stores.

## What it does

Runs daily at 10:00 AM. Ingests ~10k posts, filters complaints, clusters them semantically, scores each cluster, and synthesises 10 build-ready ideas (5 B2C + 5 B2B) with copy-paste Claude build prompts.

---

## Setup (one-time, ~30 min)

### 1. Create accounts

| Service | URL | Free tier |
|---------|-----|-----------|
| Supabase | https://supabase.com | ✅ |
| Vercel | https://vercel.com | ✅ |
| Upstash | https://upstash.com | ✅ |
| Voyage AI | https://dash.voyageai.com | ✅ 50M tokens/mo |
| Reddit | https://www.reddit.com/prefs/apps | ✅ |

### 2. Create the Next.js project

```powershell
cd C:\Users\<you>\Documents
npx create-next-app@14 idea-engine --typescript --tailwind --app --import-alias "@/*" --no-src-dir
cd idea-engine
npm install @supabase/supabase-js @supabase/ssr @upstash/redis zod @anthropic-ai/sdk voyageai
npm install -D tsx
```

### 3. Copy these files

Drop every file from this folder into your `idea-engine` project, matching the paths exactly.

### 4. Set up environment variables

```powershell
copy env.example .env.local
```

Open `.env.local` and fill in every `REPLACE_WITH_...` value. See comments in the file for where to find each key.

### 5. Run the database schema

1. Open your Supabase project → **SQL Editor**
2. Paste and run `schema.sql`
3. Paste and run `schema-functions.sql`

### 6. Deploy to Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

During deployment, Vercel will ask you to set environment variables. Add every key from `.env.local`.

### 7. Verify cron is configured

In Vercel Dashboard → your project → **Settings → Crons**, you should see:
```
GET /api/cron/daily  —  0 10 * * *  (daily at 10:00 AM UTC)
```

### 8. Add CRON_SECRET to Vercel

In Vercel Dashboard → **Settings → Environment Variables**, add:
- `CRON_SECRET` = the same value from your `.env.local`

---

## Running the pipeline manually

Trigger a full run via browser or curl:
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-app.vercel.app/api/cron/daily
```

Or run individual stages locally:
```powershell
npm run worker:reddit       # Stage 1: ingest posts
npm run worker:classifier   # Stage 2: detect complaints
npm run worker:embeddings   # Stage 3: generate embeddings
npm run worker:clustering   # Stage 4: cluster + label
npm run worker:scorer       # Stage 5: score clusters
npm run worker:synthesizer  # Stage 6+7: generate ideas

# Or run the full pipeline in sequence:
npm run pipeline
```

---

## Dashboard

| Route | What it shows |
|-------|--------------|
| `/today` | 10 ranked idea cards, B2C/B2B filter |
| `/idea/[id]` | Full breakdown + copy-ready build prompt |
| `/cluster/[id]` | Raw evidence posts that generated an idea |
| `/runs` | Pipeline run history, status, errors |

---

## Cost guardrails

| Component | Daily est. | Monthly est. |
|-----------|-----------|-------------|
| Vercel (hobby) | $0 | $0 |
| Supabase (free tier) | $0 | $0 |
| Upstash Redis | ~$0.01 | ~$0.30 |
| Voyage embeddings | ~$0.10 | ~$3 |
| Anthropic Sonnet (classif + scoring) | ~$1.00 | ~$30 |
| Anthropic Opus (10 idea syntheses) | ~$1.50 | ~$45 |
| **Total** | **~$2.60** | **~$78** |

To cut costs below $50/mo: swap Opus for Sonnet in `workers/synthesizer.ts` (change `MODEL` constant). Quality drops slightly.

---

## Scoring formula

```
composite = 0.30·frequency + 0.25·momentum + 0.20·intensity + 0.15·monetisation + 0.10·mvp_ease

frequency    = log(posts_7d + 1) / log(max_posts_7d + 1)
momentum     = (count_last_3d - count_prev_3d) / max(count_prev_3d, 1), clipped [0,1]
               Day-1 fix: momentum = 0 for clusters seen for the first time today
intensity    = LLM-rated complaint severity (0–1)
monetisation = LLM-rated willingness-to-pay (0–1)
mvp_ease     = LLM-rated inverse of build complexity (0–1)
```

---

## Credentials to fill in (grepping guide)

All placeholder credentials are marked with `REPLACE_WITH_` prefix in `env.example`. Run:

```powershell
# Find all unfilled placeholders
Select-String -Path .env.local -Pattern "REPLACE_WITH_"
```

Every line that appears in that output still needs a real value.

---

## Troubleshooting

**Pipeline fails at embeddings stage**
→ Check `VOYAGE_API_KEY` is set. If Voyage is rate-limiting, set `OPENAI_API_KEY` as fallback.

**Reddit returns 403**
→ Your `REDDIT_USER_AGENT` is likely malformed. Format must be `AppName/1.0 by username`.

**Cron not firing**
→ Vercel Crons require a Pro plan for schedules more frequent than daily. Daily (0 10 * * *) works on free tier.

**No ideas generated but clusters exist**
→ Run scorer first (`npm run worker:scorer`), then synthesizer. Ideas require daily_scores rows to exist for today.

**Supabase: "vector extension not found"**
→ In Supabase Dashboard → Database → Extensions, enable `vector` manually, then re-run `schema.sql`.
