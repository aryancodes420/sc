/**
 * /api/pipeline/advance — Single-stage pipeline executor
 * Called by: /api/trigger (to start) and by itself (to chain stages).
 * Each invocation runs exactly ONE stage then returns.
 * Next stage is enqueued via a fire-and-forget fetch to this same endpoint.
 *
 * This keeps every function call under Vercel Hobby's 60s limit.
 *
 * Stages: ingest → classify → embed → cluster → score → synthesize → done
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient }        from '@/lib/supabase/server';
import {
  getJob, advanceJob, failJob, enqueueNextStage,
  type PipelineStage,
} from '@/lib/pipeline-queue';
import { LLMCostAccumulator }         from '@/lib/utils';

// Workers
import { runRedditIngestion }         from '@/workers/reddit';
import { runHackerNewsIngestion }     from '@/workers/hackernews';
import { runAppStoreIngestion }       from '@/workers/appstore';
import { runPlayStoreIngestion }      from '@/workers/playstore';
import { runProductHuntIngestion }    from '@/workers/producthunt';
import { runClassifier }              from '@/workers/classifier';
import { runEmbeddings }              from '@/workers/embeddings';
import { runClustering }              from '@/workers/clustering';
import { runScorer }                  from '@/workers/scorer';
import { runSynthesizer }             from '@/workers/synthesizer';

// Hobby plan: 60s hard limit. Each stage must complete within this.
export const maxDuration = 60;

function getBaseUrl(req: NextRequest): string {
  const host  = req.headers.get('host') ?? 'localhost:3000';
  const proto = host.startsWith('localhost') ? 'http' : 'https';
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  // Internal endpoint — verify CRON_SECRET to prevent unauthenticated pipeline execution
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { runId } = await req.json() as { runId: string };
  if (!runId) return NextResponse.json({ error: 'runId required' }, { status: 400 });

  const job = await getJob(runId);
  if (!job) return NextResponse.json({ error: `Job ${runId} not found` }, { status: 404 });
  if (job.stage === 'done' || job.stage === 'failed') {
    return NextResponse.json({ skipped: true, stage: job.stage });
  }

  const supabase  = createServiceClient();
  const baseUrl   = getBaseUrl(req);
  const log       = (msg: string) => console.log(`[pipeline][${runId}][${job.stage}] ${msg}`);
  const t0        = Date.now();

  log(`Starting stage: ${job.stage}`);

  try {
    switch (job.stage as PipelineStage) {

      // ── Stage: ingest ───────────────────────────────────────────
      case 'ingest': {
        const [reddit, hn, appstore, playstore, producthunt] = await Promise.all([
          runRedditIngestion(runId),
          runHackerNewsIngestion(runId),
          runAppStoreIngestion(runId),
          runPlayStoreIngestion(runId),
          runProductHuntIngestion(runId),
        ]);
        const totalIngested =
          reddit.postsIngested + hn.postsIngested +
          appstore.postsIngested + playstore.postsIngested +
          producthunt.postsIngested;

        await supabase.from('runs').update({ posts_ingested: totalIngested }).eq('id', runId);
        await advanceJob(runId, 'classify', {
          ingest: { reddit: reddit.postsIngested, hn: hn.postsIngested,
                    appstore: appstore.postsIngested, playstore: playstore.postsIngested,
                    producthunt: producthunt.postsIngested, total: totalIngested },
        });
        log(`Ingested ${totalIngested} posts in ${Date.now() - t0}ms`);
        enqueueNextStage(runId, baseUrl);
        return NextResponse.json({ stage: 'ingest', done: true, next: 'classify' });
      }

      // ── Stage: classify ─────────────────────────────────────────
      case 'classify': {
        const costs      = new LLMCostAccumulator();
        const classifier = await runClassifier(runId, costs);
        const snap       = costs.snapshot();
        await advanceJob(runId, 'embed', {
          classify: { complaints: classifier.complaints, total: classifier.total, costUsd: snap.costUsd },
        });
        log(`Classified ${classifier.total} posts in ${Date.now() - t0}ms`);
        enqueueNextStage(runId, baseUrl);
        return NextResponse.json({ stage: 'classify', done: true, next: 'embed' });
      }

      // ── Stage: embed ────────────────────────────────────────────
      case 'embed': {
        const embeddings = await runEmbeddings(runId);
        await advanceJob(runId, 'cluster', {
          embed: { processed: embeddings.processed, cacheHits: embeddings.cached },
        });
        log(`Embedded ${embeddings.processed} posts in ${Date.now() - t0}ms`);
        enqueueNextStage(runId, baseUrl);
        return NextResponse.json({ stage: 'embed', done: true, next: 'cluster' });
      }

      // ── Stage: cluster ──────────────────────────────────────────
      case 'cluster': {
        const costs      = new LLMCostAccumulator();
        const clustering = await runClustering(runId, costs);
        const snap       = costs.snapshot();
        const clustersFound = clustering.clustersCreated + clustering.clustersUpdated;
        await supabase.from('runs').update({ clusters_found: clustersFound }).eq('id', runId);
        await advanceJob(runId, 'score', {
          cluster: { created: clustering.clustersCreated, updated: clustering.clustersUpdated, costUsd: snap.costUsd },
        });
        log(`Clustered in ${Date.now() - t0}ms`);
        enqueueNextStage(runId, baseUrl);
        return NextResponse.json({ stage: 'cluster', done: true, next: 'score' });
      }

      // ── Stage: score ────────────────────────────────────────────
      case 'score': {
        const costs  = new LLMCostAccumulator();
        const scorer = await runScorer(costs);
        const snap   = costs.snapshot();
        await advanceJob(runId, 'synthesize', {
          score: { clustersScored: scorer.clustersScored, topComposite: scorer.topComposite, costUsd: snap.costUsd },
        });
        log(`Scored ${scorer.clustersScored} clusters in ${Date.now() - t0}ms`);
        enqueueNextStage(runId, baseUrl);
        return NextResponse.json({ stage: 'score', done: true, next: 'synthesize' });
      }

      // ── Stage: synthesize ───────────────────────────────────────
      case 'synthesize': {
        const costs       = new LLMCostAccumulator();
        const synthesizer = await runSynthesizer(runId, costs);
        const snap        = costs.snapshot();

        // Compute total cost across all stages
        const stageStats  = job.stats as Record<string, { costUsd?: number }>;
        const stageCosts  = ['classify','cluster','score']
          .reduce((s, k) => s + (stageStats[k]?.costUsd ?? 0), 0);
        const totalCostUsd = stageCosts + snap.costUsd;

        await supabase.from('runs').update({
          status:          'completed',
          completed_at:    new Date().toISOString(),
          ideas_generated: synthesizer.ideasGenerated,
          metadata: {
            date:       job.dateStr,
            stage:      'completed',
            durationMs: Date.now() - job.startedAt,
            llmCost: {
              totalCostUsd,
              synthesisCostUsd: snap.costUsd,
              inputTokens:      snap.inputTokens,
              outputTokens:     snap.outputTokens,
              byModel:          snap.byModel,
            },
          },
        }).eq('id', runId);

        await advanceJob(runId, 'done', {
          synthesize: { ideasGenerated: synthesizer.ideasGenerated, costUsd: snap.costUsd, totalCostUsd },
        });

        log(`Synthesized ${synthesizer.ideasGenerated} ideas in ${Date.now() - t0}ms | total cost $${totalCostUsd.toFixed(4)}`);
        return NextResponse.json({ stage: 'synthesize', done: true, next: 'done', totalCostUsd });
      }

      default:
        return NextResponse.json({ skipped: true, reason: `Unknown stage: ${job.stage}` });
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error(`[pipeline][${runId}][${job.stage}] FATAL: ${msg}`);
    await failJob(runId, msg);
    await supabase.from('runs').update({
      status: 'failed', completed_at: new Date().toISOString(), error: msg,
    }).eq('id', runId);
    return NextResponse.json({ error: msg, stage: job.stage, runId }, { status: 500 });
  }
}
