/**
 * workers/classifier.ts — Stage 2: Complaint Classification
 * Reads unclassified posts from today's run, batches 20 per Sonnet call,
 * writes is_complaint + complaint_score back to raw_posts.
 *
 * Fix #10: DB updates parallelised in chunks of 10 (was sequential row-by-row).
 *
 * Standalone: npx tsx workers/classifier.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { ComplaintBatchOutputSchema } from '@/lib/types';
import { chunk, parseLLMJson, LLMCostAccumulator } from '@/lib/utils';

// ANTHROPIC_API_KEY: from console.anthropic.com/settings/keys
const MODEL = 'claude-sonnet-4-5-20250514';
const DB_PARALLEL = 10; // concurrent DB writes

const SYSTEM_PROMPT = `You are a complaint detection system for a startup idea discovery engine.
Classify each Reddit post as a genuine user complaint (problem with existing tools/workflows) or not.

A complaint is: frustration with a broken workflow, missing feature, bad UX, pricing issue,
integration failure, data loss, poor support, or slow performance.

NOT a complaint: questions, success stories, self-promotion, news, tutorials, meta discussion.

Return ONLY valid JSON — no markdown fences, no explanation:
{
  "classifications": [
    {
      "post_index": 0,
      "is_complaint": true,
      "complaint_score": 0.92,
      "complaint_type": "missing_feature",
      "reasoning": "User explicitly states feature X is absent and causes workflow pain"
    }
  ]
}

complaint_type must be one of: missing_feature, broken_workflow, pricing_frustration,
poor_ux, data_loss, integration_failure, slow_performance, poor_support, other.
Set to null if is_complaint is false.`;

interface Post { id: string; text: string; }

async function classifyBatch(
  posts: Post[],
  client: Anthropic,
  costs?: LLMCostAccumulator
): Promise<Array<{ id: string; is_complaint: boolean; complaint_score: number }>> {
  const numbered = posts
    .map((p, i) => `[${i}] ${p.text.slice(0, 400)}`)
    .join('\n\n---\n\n');

  const msg = await client.messages.create({
    model:      MODEL,
    max_tokens: 2048,
    system:     SYSTEM_PROMPT,
    messages:   [{ role: 'user', content: `Classify these ${posts.length} posts:\n\n${numbered}` }],
  });

  const raw  = (msg.content[0] as { type: string; text: string }).text;
  costs?.add(MODEL, msg.usage.input_tokens, msg.usage.output_tokens);
  const parsed = ComplaintBatchOutputSchema.parse(parseLLMJson(raw));

  return parsed.classifications.map(c => ({
    id:              posts[c.post_index].id,
    is_complaint:    c.is_complaint,
    complaint_score: c.complaint_score,
  }));
}

export interface ClassifierResult {
  total: number;
  complaints: number;
  durationMs: number;
}

export async function runClassifier(runId?: string | null, costs?: LLMCostAccumulator): Promise<ClassifierResult> {
  const t0       = Date.now();
  const supabase = createServiceClient();
  const client   = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  let query = supabase
    .from('raw_posts')
    .select('id, text')
    .is('is_complaint', null);
  if (runId) query = query.eq('run_id', runId);

  const { data: posts, error } = await query;
  if (error) throw new Error(`Fetch posts: ${error.message}`);
  if (!posts || posts.length === 0) {
    console.log('[classifier] No unclassified posts.');
    return { total: 0, complaints: 0, durationMs: Date.now() - t0 };
  }

  console.log(`[classifier] ${posts.length} posts to classify`);
  const batches  = chunk(posts, 20);
  let complaints = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch   = batches[i];
    const results = await classifyBatch(batch, client, costs);

    // Count complaints from synchronous results BEFORE parallel DB writes
    complaints += results.filter(r => r.is_complaint).length;
    const updateChunks = chunk(results, DB_PARALLEL);
    for (const updateBatch of updateChunks) {
      await Promise.all(updateBatch.map(r =>
        supabase
          .from('raw_posts')
          .update({ is_complaint: r.is_complaint, complaint_score: r.complaint_score })
          .eq('id', r.id)
      ));
    }

    console.log(`  batch ${i + 1}/${batches.length} — ${results.filter(r => r.is_complaint).length} complaints`);
  }

  return { total: posts.length, complaints, durationMs: Date.now() - t0 };
}

if (require.main === module) {
  runClassifier().then(r => {
    console.log(`\nDone: ${r.complaints}/${r.total} complaints, ${r.durationMs}ms`);
    process.exit(0);
  }).catch(e => { console.error(e); process.exit(1); });
}
