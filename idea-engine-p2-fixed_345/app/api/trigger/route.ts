/**
 * /api/trigger — Manual pipeline trigger
 * Creates a run record + Redis job, then kicks off the first stage.
 * Each stage runs in its own function call via /api/pipeline/advance.
 * Stays well under Vercel Hobby's 60s limit.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient }        from '@/lib/supabase/server';
import { createJob, enqueueNextStage } from '@/lib/pipeline-queue';
import { today }                       from '@/lib/utils';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Auth: accept CRON_SECRET (from cron jobs + /api/trigger/ui proxy)
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const dateStr  = today();

  // Idempotency: block if a run already exists today
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

  // Create DB run record
  const { data: run, error: re } = await supabase
    .from('runs')
    .insert({ status: 'running', metadata: { date: dateStr, stage: 'started', trigger: 'manual' } })
    .select('id')
    .single();

  if (re || !run) {
    return NextResponse.json({ error: `Failed to create run: ${re?.message}` }, { status: 500 });
  }

  // Create Redis job for stage chaining
  await createJob(run.id, dateStr);

  // Kick off stage 1 (fire-and-forget)
  const host    = req.headers.get('host') ?? 'localhost:3000';
  const proto   = host.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${proto}://${host}`;
  enqueueNextStage(run.id, baseUrl);

  console.log(`[trigger] Run ${run.id} started — pipeline advancing via queue`);

  return NextResponse.json({
    success: true,
    runId:   run.id,
    message: 'Pipeline started. Stages running async — check /runs for progress.',
  });
}
