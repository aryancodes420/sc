/**
 * workers/scorer.ts — Stage 5: Cluster Scoring
 * Computes all 5 scoring dimensions for top-50 clusters.
 * Frequency + momentum: computed from DB counts.
 * Intensity + monetisation + mvp_ease: batched Sonnet calls (chunked by 10).
 *
 * Fix #4:  max_tokens raised to 4096 per chunk of 10 (was 8192 for 50 — truncation).
 * Fix #5:  posts_7d now filters by created_at within 7 days (was counting all-time).
 * Fix #6:  LLM call chunked into batches of 10 clusters (was 50 in one call).
 *
 * Standalone: npx tsx workers/scorer.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { ScoringBatchOutputSchema } from '@/lib/types';
import { parseLLMJson, chunk, compositeScore, today, LLMCostAccumulator } from '@/lib/utils';

const MODEL            = 'claude-sonnet-4-5-20250514';
const TOP_N_SCORE      = 50;
const SAMPLE_POSTS     = 20;
const LLM_CHUNK_SIZE   = 10;  // Fix #6: clusters per LLM call
const LLM_MAX_TOKENS   = 4096; // Fix #4: safe for 10 clusters (~350 tok/cluster)

// ── Frequency formula ──────────────────────────────────────────────
function calcFrequency(posts7d: number, maxPosts7d: number): number {
  if (maxPosts7d === 0) return 0;
  return Math.log(posts7d + 1) / Math.log(maxPosts7d + 1);
}

// ── Momentum formula ───────────────────────────────────────────────
// Day-1 clusters with posts get baseline 0.5 so they aren't penalised 25% of composite.
function calcMomentum(last3d: number, prev3d: number, isNew: boolean): number {
  if (isNew) return last3d > 0 ? 0.5 : 0;
  const raw = (last3d - prev3d) / Math.max(prev3d, 1);
  return Math.min(Math.max(raw, 0), 1);
}

// ── LLM scoring for one chunk of clusters ──────────────────────────
async function llmScoreChunk(
  clusters: Array<{ id: string; label: string; posts: string[] }>,
  client: Anthropic,
  costs?: LLMCostAccumulator
): Promise<Map<string, { intensity: number; monetisation: number; mvp_ease: number }>> {
  const prompt = clusters.map((c, i) =>
    `CLUSTER ${i} — "${c.label}":\n${c.posts.slice(0, SAMPLE_POSTS).map(p => `• ${p.slice(0, 200)}`).join('\n')}`
  ).join('\n\n---\n\n');

  const msg = await client.messages.create({
    model:      MODEL,
    max_tokens: LLM_MAX_TOKENS,
    system: `You are evaluating complaint clusters for startup opportunity potential.

Score each cluster 0.0–1.0 on three dimensions:
- intensity: How severe is the pain? (0=mild annoyance, 0.5=significant friction, 1=business-critical/users losing money)
- monetisation: How likely are users to pay for a solution? (0=no signal, 0.5=might pay, 1=strong willingness-to-pay evidence)
- mvp_ease: How easy is an MVP to build? (0=requires novel tech/heavy regulation, 0.5=standard web app, 1=simple CRUD with existing APIs)

Return ONLY valid JSON:
{
  "scores": [
    {
      "cluster_index": 0,
      "intensity": 0.8,
      "monetisation": 0.7,
      "mvp_ease": 0.6,
      "intensity_reasoning": "brief reason",
      "monetisation_reasoning": "brief reason",
      "mvp_ease_reasoning": "brief reason"
    }
  ]
}`,
    messages: [{ role: 'user', content: `Score these ${clusters.length} complaint clusters:\n\n${prompt}` }],
  });

  const raw    = (msg.content[0] as { type: string; text: string }).text;
  costs?.add(MODEL, msg.usage.input_tokens, msg.usage.output_tokens);
  const parsed = ScoringBatchOutputSchema.parse(parseLLMJson(raw));

  const out = new Map<string, { intensity: number; monetisation: number; mvp_ease: number }>();
  for (const s of parsed.scores) {
    const cluster = clusters[s.cluster_index];
    if (cluster) out.set(cluster.id, { intensity: s.intensity, monetisation: s.monetisation, mvp_ease: s.mvp_ease });
  }
  return out;
}

// ── Orchestrate LLM scoring across all chunks ─────────────────────
async function llmScoreClusters(
  clusters: Array<{ id: string; label: string; posts: string[] }>,
  client: Anthropic,
  costs?: LLMCostAccumulator
): Promise<Map<string, { intensity: number; monetisation: number; mvp_ease: number }>> {
  const out     = new Map<string, { intensity: number; monetisation: number; mvp_ease: number }>();
  const batches = chunk(clusters, LLM_CHUNK_SIZE);

  for (let i = 0; i < batches.length; i++) {
    console.log(`  [scorer] LLM chunk ${i + 1}/${batches.length} (${batches[i].length} clusters)`);
    const chunkResult = await llmScoreChunk(batches[i], client, costs);
    for (const [k, v] of chunkResult) out.set(k, v);
  }

  return out;
}

export interface ScorerResult {
  clustersScored: number;
  topComposite: number;
  durationMs: number;
}

export async function runScorer(costs?: LLMCostAccumulator): Promise<ScorerResult> {
  const t0       = Date.now();
  const supabase = createServiceClient();
  const client   = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const dateStr  = today();

  // Get top 50 clusters by post count
  const { data: clusters, error: ce } = await supabase
    .from('clusters')
    .select('id, label, post_count, first_seen_date')
    .order('post_count', { ascending: false })
    .limit(TOP_N_SCORE);

  if (ce || !clusters || clusters.length === 0) {
    console.log('[scorer] No clusters to score.');
    return { clustersScored: 0, topComposite: 0, durationMs: Date.now() - t0 };
  }

  console.log(`[scorer] Scoring ${clusters.length} clusters`);

  // ── Fix #5: Count posts within correct time windows ────────────
  const sevenDaysAgo  = new Date(Date.now() - 7 * 86400_000).toISOString();
  const threeDaysAgo  = new Date(Date.now() - 3 * 86400_000).toISOString();
  const sixDaysAgo    = new Date(Date.now() - 6 * 86400_000).toISOString();

  const countPromises = clusters.map(async c => {
    // posts_7d: count posts in this cluster created within last 7 days
    const { count: posts7d } = await supabase
      .from('raw_posts')
      .select('*', { count: 'exact', head: true })
      .eq('cluster_id', c.id)
      .gte('created_at', sevenDaysAgo);

    // count_last_3d: posts created in last 3 days
    const { count: last3d } = await supabase
      .from('raw_posts')
      .select('*', { count: 'exact', head: true })
      .eq('cluster_id', c.id)
      .gte('created_at', threeDaysAgo);

    // count_prev_3d: posts created 3-6 days ago
    const { count: prev3d } = await supabase
      .from('raw_posts')
      .select('*', { count: 'exact', head: true })
      .eq('cluster_id', c.id)
      .gte('created_at', sixDaysAgo)
      .lt('created_at', threeDaysAgo);

    return {
      id:      c.id,
      posts7d: posts7d ?? 0,
      last3d:  last3d ?? 0,
      prev3d:  prev3d ?? 0,
      isNew:   c.first_seen_date === dateStr,
    };
  });
  const counts     = await Promise.all(countPromises);
  const maxPosts7d = Math.max(...counts.map(c => c.posts7d), 1);

  // Fetch sample posts for LLM scoring
  const clusterWithPosts = await Promise.all(
    clusters.map(async c => {
      const { data: posts } = await supabase
        .from('raw_posts')
        .select('text')
        .eq('cluster_id', c.id)
        .eq('is_complaint', true)
        .limit(SAMPLE_POSTS);
      return { id: c.id, label: c.label, posts: (posts ?? []).map(p => p.text) };
    })
  );

  // ── Fix #6: Chunked LLM scoring ────────────────────────────────
  console.log('[scorer] LLM scoring...');
  const llmScores = await llmScoreClusters(clusterWithPosts, client, costs);

  // Compute daily_scores rows
  let topComposite = 0;
  const scoreRows = clusters.map(c => {
    const count     = counts.find(x => x.id === c.id)!;
    const llm       = llmScores.get(c.id) ?? { intensity: 0.5, monetisation: 0.5, mvp_ease: 0.5 };
    const frequency = calcFrequency(count.posts7d, maxPosts7d);
    const momentum  = calcMomentum(count.last3d, count.prev3d, count.isNew);
    const composite = compositeScore({ frequency, momentum, ...llm });

    if (composite > topComposite) topComposite = composite;

    return {
      cluster_id:    c.id,
      date:          dateStr,
      posts_7d:      count.posts7d,
      count_last_3d: count.last3d,
      count_prev_3d: count.prev3d,
      frequency,
      momentum,
      intensity:     llm.intensity,
      monetisation:  llm.monetisation,
      mvp_ease:      llm.mvp_ease,
      composite,
    };
  });

  // Batch upsert all scores in one call
  const { error: upsertErr } = await supabase
    .from('daily_scores')
    .upsert(scoreRows, { onConflict: 'cluster_id,date' });
  if (upsertErr) console.error(`[scorer] daily_scores upsert error: ${upsertErr.message}`);

  console.log(`[scorer] Top composite: ${topComposite.toFixed(3)}`);
  return { clustersScored: clusters.length, topComposite, durationMs: Date.now() - t0 };
}

if (require.main === module) {
  runScorer().then(r => {
    console.log(`\nDone: ${r.clustersScored} clusters scored, top=${r.topComposite.toFixed(3)}, ${r.durationMs}ms`);
    process.exit(0);
  }).catch(e => { console.error(e); process.exit(1); });
}
