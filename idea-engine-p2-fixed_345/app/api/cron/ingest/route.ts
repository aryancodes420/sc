/**
 * /api/cron/ingest — Kicks off the daily pipeline
 * Runs at 10:00 AM UTC. Creates run + Redis job, fires stage 1.
 * Actual work happens in /api/pipeline/advance (stage-chained, each <60s).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient }        from '@/lib/supabase/server';
import { createJob, enqueueNextStage } from '@/lib/pipeline-queue';
import { today }                       from '@/lib/utils';

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const dateStr  = today();

  // Idempotency
  const { data: existingRun } = await supabase
    .from('runs')
    .select('id, status')
    .gte('started_at', `${dateStr}T00:00:00Z`)
    .in('status', ['completed', 'running'])
    .maybeSingle();

  if (existingRun) {
    return NextResponse.json({
      skipped: true, runId: existingRun.id,
      reason: `Today's run already ${existingRun.status}`,
    });
  }

  const { data: run, error: re } = await supabase
    .from('runs')
    .insert({ status: 'running', metadata: { date: dateStr, stage: 'started' } })
    .select('id')
    .single();

  if (re || !run) {
    return NextResponse.json({ error: `Failed to create run: ${re?.message}` }, { status: 500 });
  }

  await createJob(run.id, dateStr);

  const host    = req.headers.get('host') ?? 'idea-engine-woad.vercel.app';
  const baseUrl = `https://${host}`;
  enqueueNextStage(run.id, baseUrl);

  console.log(`[cron/ingest] Run ${run.id} created — pipeline advancing via queue`);
  return NextResponse.json({ success: true, runId: run.id, message: 'Pipeline queued' });
}
