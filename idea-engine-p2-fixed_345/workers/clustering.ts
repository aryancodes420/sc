/**
 * workers/clustering.ts — Stage 4: Clustering + Labelling
 * Groups complaint posts by semantic similarity using pgvector cosine distance.
 * Labels each cluster (category, industry, problem_type) via batched Sonnet call.
 *
 * Standalone: npx tsx workers/clustering.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { ClusterLabelBatchOutputSchema } from '@/lib/types';
import { parseLLMJson, chunk, today, LLMCostAccumulator } from '@/lib/utils';

const MODEL              = 'claude-sonnet-4-5-20250514'; // fallback: claude-sonnet-4-6
const COSINE_THRESHOLD   = 0.75;  // posts with similarity >= this join the cluster
const MIN_CLUSTER_SIZE   = 3;     // discard clusters smaller than this
const LABEL_BATCH_SIZE   = 20;    // clusters per labelling call

// ── Cosine distance via pgvector ───────────────────────────────────
// Returns the most similar cluster for a given post embedding.
// <=> is the cosine distance operator: similarity = 1 - distance
async function findNearestCluster(
  embedding: number[],
  supabase: ReturnType<typeof createServiceClient>
): Promise<{ id: string; similarity: number } | null> {
  const { data, error } = await supabase.rpc('nearest_cluster', {
    query_embedding: embedding,
    match_threshold: 1 - COSINE_THRESHOLD, // convert similarity threshold to distance
    match_count:     1,
  });

  if (error || !data || data.length === 0) return null;
  return { id: data[0].id, similarity: 1 - data[0].distance };
}

// ── Recalculate centroid for a cluster ─────────────────────────────
async function recalcCentroid(
  clusterId: string,
  supabase: ReturnType<typeof createServiceClient>
): Promise<void> {
  // pgvector supports avg() on vector columns
  await supabase.rpc('recalc_centroid', { cluster_id: clusterId });
}

// ── Label clusters via batched LLM call ───────────────────────────
async function labelClusters(
  clusters: Array<{ id: string; samplePosts: string[] }>,
  client: Anthropic,
  costs?: LLMCostAccumulator
): Promise<void> {
  const supabase = createServiceClient();
  const batches  = chunk(clusters, LABEL_BATCH_SIZE);

  for (const batch of batches) {
    const prompt = batch.map((c, i) =>
      `CLUSTER ${i}:\n${c.samplePosts.slice(0, 5).map(p => `- ${p.slice(0, 200)}`).join('\n')}`
    ).join('\n\n---\n\n');

    const msg = await client.messages.create({
      model:      MODEL,
      max_tokens: 4096,
      system: `You are a market research analyst identifying patterns in user complaints.
For each cluster of similar complaints, assign:
- label: concise problem title (max 8 words, e.g. "Invoice tracking for freelancers")
- category: B2C if the end users are consumers/individuals, B2B if businesses/teams
- industry: industry sector (e.g. "Freelance", "SaaS", "Real Estate", "Healthcare")
- problem_type: type of problem (e.g. "workflow_gap", "missing_tool", "pricing", "integration")

Return ONLY valid JSON — no markdown, no explanation:
{
  "labels": [
    {
      "cluster_index": 0,
      "label": "Invoice tracking for freelancers",
      "category": "B2C",
      "industry": "Freelance",
      "problem_type": "workflow_gap",
      "reasoning": "Posts describe forgetting to invoice clients"
    }
  ]
}`,
      messages: [{ role: 'user', content: `Label these ${batch.length} complaint clusters:\n\n${prompt}` }],
    });

    const raw    = (msg.content[0] as { type: string; text: string }).text;
    costs?.add(MODEL, msg.usage.input_tokens, msg.usage.output_tokens);
    const parsed = ClusterLabelBatchOutputSchema.parse(parseLLMJson(raw));

    for (const label of parsed.labels) {
      const cluster = batch[label.cluster_index];
      if (!cluster) continue;
      await supabase.from('clusters').update({
        label:        label.label,
        category:     label.category,
        industry:     label.industry,
        problem_type: label.problem_type,
      }).eq('id', cluster.id);
    }

    console.log(`  labelled ${batch.length} clusters`);
  }
}

export interface ClusteringResult {
  postsProcessed: number;
  clustersCreated: number;
  clustersUpdated: number;
  durationMs: number;
}

export async function runClustering(runId?: string | null, costs?: LLMCostAccumulator): Promise<ClusteringResult> {
  const t0       = Date.now();
  const supabase = createServiceClient();
  const client   = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  // Get complaint posts with embeddings from this run that haven't been clustered yet
  let query = supabase
    .from('raw_posts')
    .select('id, text, embedding')
    .eq('is_complaint', true)
    .is('cluster_id', null)
    .not('embedding', 'is', null);
  if (runId) query = query.eq('run_id', runId);

  const { data: posts, error } = await query;
  if (error) throw new Error(`Fetch posts: ${error.message}`);
  if (!posts || posts.length === 0) {
    console.log('[clustering] No posts to cluster.');
    return { postsProcessed: 0, clustersCreated: 0, clustersUpdated: 0, durationMs: Date.now() - t0 };
  }

  console.log(`[clustering] ${posts.length} posts to cluster`);

  let clustersCreated = 0;
  let clustersUpdated = 0;
  const affectedClusters = new Set<string>();
  const newClusterPosts:  Map<string, string[]> = new Map();

  for (const post of posts) {
    const embedding = post.embedding as unknown as number[];
    const nearest   = await findNearestCluster(embedding, supabase);

    let clusterId: string;

    if (nearest && nearest.similarity >= COSINE_THRESHOLD) {
      // Assign to existing cluster
      clusterId = nearest.id;
      clustersUpdated++;
    } else {
      // Create new cluster (label = placeholder, will be updated by LLM)
      const { data: newCluster, error: ce } = await supabase
        .from('clusters')
        .insert({
          label:              'Unlabelled',
          category:           'B2C',
          centroid_embedding: embedding,
          first_seen_date:    today(),
          last_seen_date:     today(),
        })
        .select('id')
        .single();

      if (ce || !newCluster) throw new Error(`Create cluster: ${ce?.message}`);
      clusterId = newCluster.id;
      clustersCreated++;
      newClusterPosts.set(clusterId, []);
    }

    // Link post to cluster
    await supabase.from('cluster_posts').upsert({
      cluster_id: clusterId,
      post_id:    post.id,
      similarity: nearest?.similarity ?? 1.0,
    }, { onConflict: 'cluster_id,post_id', ignoreDuplicates: true });

    // Update raw_posts.cluster_id
    await supabase.from('raw_posts').update({ cluster_id: clusterId }).eq('id', post.id);

    affectedClusters.add(clusterId);
    if (newClusterPosts.has(clusterId)) {
      newClusterPosts.get(clusterId)!.push(post.text);
    }
  }

  // Recalculate centroids for all touched clusters
  console.log(`[clustering] Recalculating ${affectedClusters.size} centroids`);
  for (const cid of affectedClusters) {
    await recalcCentroid(cid, supabase);
  }

  // Remove small clusters (< MIN_CLUSTER_SIZE posts) created in THIS run only.
  // Never prune pre-existing clusters — post_count trigger may not have fired yet.
  const newClusterIds = Array.from(newClusterPosts.keys());
  if (newClusterIds.length > 0) {
    const { data: smallClusters } = await supabase
      .from('clusters')
      .select('id')
      .in('id', newClusterIds)
      .lt('post_count', MIN_CLUSTER_SIZE);

    if (smallClusters && smallClusters.length > 0) {
      const ids = smallClusters.map(c => c.id);
      await supabase.from('clusters').delete().in('id', ids);
      console.log(`[clustering] Pruned ${ids.length} small new clusters`);
    }
  }

  // Label new clusters
  const toLabel = Array.from(affectedClusters)
    .filter(id => newClusterPosts.has(id))
    .map(id => ({ id, samplePosts: newClusterPosts.get(id) ?? [] }))
    .filter(c => c.samplePosts.length >= MIN_CLUSTER_SIZE);

  if (toLabel.length > 0) {
    console.log(`[clustering] Labelling ${toLabel.length} new clusters`);
    await labelClusters(toLabel, client, costs);
  }

  return {
    postsProcessed: posts.length,
    clustersCreated,
    clustersUpdated,
    durationMs: Date.now() - t0,
  };
}

if (require.main === module) {
  runClustering().then(r => {
    console.log(`\nDone: ${r.postsProcessed} posts, ${r.clustersCreated} new clusters, ${r.clustersUpdated} updated, ${r.durationMs}ms`);
    process.exit(0);
  }).catch(e => { console.error(e); process.exit(1); });
}
