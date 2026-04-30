/**
 * lib/pipeline-queue.ts
 * Lightweight job queue for Vercel Hobby plan (60s function limit).
 * Each pipeline stage completes within 60s then enqueues the next stage
 * via a self-call to /api/pipeline/advance. Uses Upstash Redis for state.
 *
 * Stages:
 *   ingest    → classify → embed → cluster → score → synthesize → done
 *
 * Key schema:
 *   pipeline:job:{runId}  — job state (TTL 2h)
 */

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export type PipelineStage =
  | 'ingest'
  | 'classify'
  | 'embed'
  | 'cluster'
  | 'score'
  | 'synthesize'
  | 'done'
  | 'failed';

export interface PipelineJob {
  runId:     string;
  stage:     PipelineStage;
  dateStr:   string;
  startedAt: number;
  updatedAt: number;
  stats:     Record<string, unknown>;
  error?:    string;
}

const JOB_TTL_SECONDS = 7200; // 2 hours
const KEY = (runId: string) => `pipeline:job:${runId}`;

export async function createJob(runId: string, dateStr: string): Promise<PipelineJob> {
  const job: PipelineJob = {
    runId,
    stage:     'ingest',
    dateStr,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    stats:     {},
  };
  await redis.set(KEY(runId), JSON.stringify(job), { ex: JOB_TTL_SECONDS });
  return job;
}

export async function getJob(runId: string): Promise<PipelineJob | null> {
  const raw = await redis.get<string | PipelineJob>(KEY(runId));
  if (!raw) return null;
  if (typeof raw === 'string') return JSON.parse(raw) as PipelineJob;
  return raw as PipelineJob;
}

export async function advanceJob(
  runId: string,
  nextStage: PipelineStage,
  stats: Record<string, unknown>
): Promise<void> {
  const job = await getJob(runId);
  if (!job) throw new Error(`Job ${runId} not found in Redis`);
  const updated: PipelineJob = {
    ...job,
    stage:     nextStage,
    updatedAt: Date.now(),
    stats:     { ...job.stats, ...stats },
  };
  await redis.set(KEY(runId), JSON.stringify(updated), { ex: JOB_TTL_SECONDS });
}

export async function failJob(runId: string, error: string): Promise<void> {
  const job = await getJob(runId);
  if (!job) return;
  const updated: PipelineJob = { ...job, stage: 'failed', updatedAt: Date.now(), error };
  await redis.set(KEY(runId), JSON.stringify(updated), { ex: JOB_TTL_SECONDS });
}

/** Fire-and-forget: kick off next stage without waiting for it */
export function enqueueNextStage(runId: string, baseUrl: string): void {
  // Non-blocking fetch — we don't await this
  fetch(`${baseUrl}/api/pipeline/advance`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.CRON_SECRET}`,
    },
    body:    JSON.stringify({ runId }),
  }).catch(err => console.error(`[queue] Failed to enqueue next stage for ${runId}:`, err));
}
