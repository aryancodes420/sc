/**
 * workers/synthesizer.ts — Stage 6+7: Idea Synthesis + Build Prompt
 * Takes top 5 B2C + 5 B2B clusters by composite score.
 * Two Opus calls (one per category) instead of 10 individual calls.
 *
 * Fix #2:  Idempotency check uses count query, not limit(1) with >= 10.
 * Fix #3:  Uses clusters!inner join so PostgREST filters parent rows by category.
 * Fix #7:  Batched Opus calls — 2 calls (B2C + B2B) instead of 10 loop calls.
 *
 * Standalone: npx tsx workers/synthesizer.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { IdeaOutputSchema, IdeaBatchOutputSchema } from '@/lib/types';
import { parseLLMJson, today, LLMCostAccumulator } from '@/lib/utils';
import type { IdeaOutput } from '@/lib/types';

// ANTHROPIC_API_KEY: opus for final synthesis only — higher quality, higher cost
const MODEL = 'claude-opus-4-6';

const BUILD_PROMPT_TEMPLATE = `---
ROLE: You are a senior full-stack engineer building an MVP in one weekend.
OBJECTIVE: [one sentence]
USERS: [exact persona]
CORE LOOP: [3-5 steps the user takes to get value]
STACK: Next.js 14 + Supabase + TypeScript + Tailwind (unless domain requires different)
DATA MODEL: [tables + key columns]
API SURFACE: [endpoints with method + purpose]
UI: [screens in order, key components per screen]
BUILD STEPS: [numbered, each step shippable independently]
DEFERRED: [features explicitly out of scope for MVP]
SELF-OPTIMISE: Before writing code, criticise this plan for 3 weaknesses and propose fixes. Then build.
---`;

const SYSTEM_PROMPT = `You are a startup idea analyst. Given multiple complaint clusters, synthesise a concrete, buildable app idea for EACH cluster with a ready-to-use build prompt.

Return ONLY valid JSON — no markdown fences, no explanation:
{
  "ideas": [
    {
      "rank": <number>,
      "category": "B2C" | "B2B",
      "problem": "<clear 1-2 sentence problem statement>",
      "audience": "<specific target user persona, 1 sentence>",
      "evidence": [
        {"quote": "<verbatim from a real post, max 150 chars>", "source": "<subreddit or source>", "url": "<post url>"},
        {"quote": "...", "source": "...", "url": "..."},
        {"quote": "...", "source": "...", "url": "..."}
      ],
      "market_gap": "<what existing solutions miss, 1-2 sentences>",
      "mvp": "<exactly what to build for MVP, specific features, 2-3 sentences>",
      "monetisation_model": "subscription" | "saas" | "marketplace" | "ads" | "usage",
      "difficulty": "low" | "medium" | "high",
      "time_to_mvp_days": <integer>,
      "score_breakdown": {"frequency": 0.0, "momentum": 0.0, "intensity": 0.0, "monetisation": 0.0, "mvp_ease": 0.0, "composite": 0.0},
      "build_prompt": "<full build prompt following the template, 400-800 words>"
    }
  ]
}

Build prompt template each idea must follow:
${BUILD_PROMPT_TEMPLATE}

Each idea must have EXACTLY 3 evidence items. Be specific and concrete. Each build_prompt must be copy-pasteable into a new Claude conversation and produce a working MVP.`;

interface ClusterInput {
  rank: number;
  id: string;
  label: string;
  category: 'B2C' | 'B2B';
  industry: string;
  problem_type: string;
  score: {
    frequency: number; momentum: number; intensity: number;
    monetisation: number; mvp_ease: number; composite: number;
  };
  evidencePosts: Array<{ text: string; url: string; source: string; score: number }>;
}

// ── Fix #7: Batch synthesis — one call per category ────────────────
async function synthesiseBatch(
  clusters: ClusterInput[],
  client: Anthropic,
  costs?: LLMCostAccumulator
): Promise<IdeaOutput[]> {
  if (clusters.length === 0) return [];

  const userContent = clusters.map(c => {
    const evidenceSummary = c.evidencePosts
      .map((p, i) => `  ${i + 1}. [${p.source}] score=${p.score}: "${p.text.slice(0, 300)}"`)
      .join('\n');

    return `CLUSTER (rank ${c.rank}, ${c.category}):
Label: ${c.label}
Industry: ${c.industry}
Problem type: ${c.problem_type}
Scores: ${JSON.stringify(c.score)}
Evidence posts:
${evidenceSummary}`;
  }).join('\n\n===\n\n');

  const msg = await client.messages.create({
    model:      MODEL,
    max_tokens: 16384,
    system:     SYSTEM_PROMPT,
    messages:   [{
      role: 'user',
      content: `Synthesise ${clusters.length} build-ready app ideas from these complaint clusters. Return ALL ${clusters.length} ideas in one JSON response.\n\n${userContent}`,
    }],
  });

  const raw    = (msg.content[0] as { type: string; text: string }).text;
  costs?.add(MODEL, msg.usage.input_tokens, msg.usage.output_tokens);
  const parsed = IdeaBatchOutputSchema.parse(parseLLMJson(raw));

  // Enforce ranks from our side — don't trust LLM
  return parsed.ideas.map((idea, i) => ({
    ...idea,
    rank:     clusters[i]?.rank ?? i + 1,
    category: clusters[i]?.category ?? idea.category,
  }));
}

export interface SynthesizerResult {
  ideasGenerated: number;
  durationMs: number;
}

export async function runSynthesizer(runId?: string | null, costs?: LLMCostAccumulator): Promise<SynthesizerResult> {
  const t0       = Date.now();
  const supabase = createServiceClient();
  const client   = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const dateStr  = today();

  // ── Fix #2: Correct idempotency check ─────────────────────────
  const { count: existingCount } = await supabase
    .from('ideas')
    .select('*', { count: 'exact', head: true })
    .eq('date', dateStr);

  if ((existingCount ?? 0) >= 10) {
    console.log('[synthesizer] Ideas for today already generated — skipping');
    return { ideasGenerated: 0, durationMs: Date.now() - t0 };
  }

  // ── Fix #3: Use !inner join so PostgREST filters parent rows ──
  const fetchTop = async (cat: 'B2C' | 'B2B') => {
    const { data, error } = await supabase
      .from('daily_scores')
      .select(`
        composite, frequency, momentum, intensity, monetisation, mvp_ease,
        cluster_id,
        clusters!inner (id, label, category, industry, problem_type)
      `)
      .eq('date', dateStr)
      .eq('clusters.category', cat)
      .order('composite', { ascending: false })
      .limit(5);

    if (error) throw new Error(`Fetch top ${cat}: ${error.message}`);
    return data ?? [];
  };

  const [topB2C, topB2B] = await Promise.all([fetchTop('B2C'), fetchTop('B2B')]);

  // Build cluster inputs with evidence posts
  const buildInputs = async (
    rows: typeof topB2C,
    startRank: number
  ): Promise<ClusterInput[]> => {
    const inputs: ClusterInput[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row     = rows[i];
      const cluster = row.clusters as unknown as {
        id: string; label: string; category: 'B2C' | 'B2B';
        industry: string; problem_type: string;
      };

      const { data: posts } = await supabase
        .from('raw_posts')
        .select('text, url, source, engagement_json')
        .eq('cluster_id', cluster.id)
        .eq('is_complaint', true)
        .order('engagement_json->score', { ascending: false })
        .limit(5);

      inputs.push({
        rank:        startRank + i,
        id:          cluster.id,
        label:       cluster.label,
        category:    cluster.category,
        industry:    cluster.industry ?? 'General',
        problem_type: cluster.problem_type ?? 'other',
        score: {
          frequency:    row.frequency,
          momentum:     row.momentum,
          intensity:    row.intensity,
          monetisation: row.monetisation,
          mvp_ease:     row.mvp_ease,
          composite:    row.composite,
        },
        evidencePosts: (posts ?? []).map(p => ({
          text:   p.text,
          url:    p.url ?? '',
          source: p.source,
          score:  (p.engagement_json as { score?: number })?.score ?? 0,
        })),
      });
    }

    return inputs;
  };

  const b2cInputs = await buildInputs(topB2C, 1);
  const b2bInputs = await buildInputs(topB2B, b2cInputs.length + 1);

  if (b2cInputs.length === 0 && b2bInputs.length === 0) {
    console.log('[synthesizer] No scored clusters for today.');
    return { ideasGenerated: 0, durationMs: Date.now() - t0 };
  }

  // ── Fix #7: Two batched Opus calls instead of 10 loop calls ────
  let ideasGenerated = 0;

  for (const batch of [b2cInputs, b2bInputs]) {
    if (batch.length === 0) continue;
    const cat = batch[0].category;
    console.log(`[synthesizer] Synthesising ${batch.length} ${cat} ideas with Opus (batched)`);

    try {
      const ideas = await synthesiseBatch(batch, client, costs);

      // Batch upsert all ideas for this category
      const ideaRows = ideas
        .map((idea, i) => {
          const cluster = batch[i];
          if (!cluster) return null;
          return {
            cluster_id:         cluster.id,
            run_id:             runId ?? null,
            date:               dateStr,
            rank:               idea.rank,
            category:           idea.category,
            problem:            idea.problem,
            audience:           idea.audience,
            evidence_json:      idea.evidence,
            market_gap:         idea.market_gap,
            mvp:                idea.mvp,
            monetisation_model: idea.monetisation_model,
            difficulty:         idea.difficulty,
            time_to_mvp_days:   idea.time_to_mvp_days,
            score_breakdown:    idea.score_breakdown,
            build_prompt:       idea.build_prompt,
          };
        })
        .filter(Boolean);

      if (ideaRows.length > 0) {
        const { error: upsertErr } = await supabase
          .from('ideas')
          .upsert(ideaRows, { onConflict: 'date,rank' });
        if (upsertErr) console.error(`[synthesizer] ${cat} upsert error: ${upsertErr.message}`);
      }

      ideasGenerated += ideaRows.length;
      for (const idea of ideas) {
        console.log(`  [${idea.rank}/10] ${idea.category} "${idea.problem.slice(0, 60)}..." score=${idea.score_breakdown.composite.toFixed(3)}`);
      }
    } catch (err) {
      console.error(`  [synthesizer] ${cat} batch failed: ${(err as Error).message}`);
    }
  }

  return { ideasGenerated, durationMs: Date.now() - t0 };
}

if (require.main === module) {
  runSynthesizer().then(r => {
    console.log(`\nDone: ${r.ideasGenerated} ideas generated, ${r.durationMs}ms`);
    process.exit(0);
  }).catch(e => { console.error(e); process.exit(1); });
}
