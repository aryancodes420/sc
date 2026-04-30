/**
 * /api/cron/synthesize — Safety net for stalled pipeline runs
 * Runs at 10:20 AM UTC. If the queue-based pipeline stalled
 * (e.g. a stage timed out mid-chain), this resumes it.
 * Under normal operation this will find nothing to do.
 */

import { NextRequest, NextResponse }  from 'next/server';
import { createServiceClient }         from '@/lib/supabase/server';
import { getJob, enqueueNextStage }    from '@/lib/pipeline-queue';
import { today }                       from '@/lib/utils';

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const dateStr  = today();

  // Find today's running run
  const { data: run } = await supabase
    .from('runs')
    .select('id, status')
    .gte('started_at', `${dateStr}T00:00:00Z`)
    .eq('status', 'running')
    .maybeSingle();

  if (!run) {
    const { data: completed } = await supabase
      .from('runs')
      .select('id')
      .gte('started_at', `${dateStr}T00:00:00Z`)
      .eq('status', 'completed')
      .maybeSingle();

    return NextResponse.json({
      skipped: true,
      reason: completed ? 'Already completed' : 'No run found for today',
    });
  }

  // Check Redis job state
  const job = await getJob(run.id);
  if (!job) {
    // Redis job expired or was never created — pipeline is unrecoverable today
    await supabase.from('runs').update({
      status: 'failed', completed_at: new Date().toISOString(),
      error: 'Pipeline job state lost. Run /api/trigger tomorrow.',
    }).eq('id', run.id);
    return NextResponse.json({ error: 'Job state lost', runId: run.id }, { status: 500 });
  }

  if (job.stage === 'done' || job.stage === 'failed') {
    return NextResponse.json({ skipped: true, stage: job.stage });
  }

  // Resume from current stage
  const host    = req.headers.get('host') ?? 'idea-engine-woad.vercel.app';
  const baseUrl = `https://${host}`;
  enqueueNextStage(run.id, baseUrl);

  console.log(`[cron/synthesize] Resuming stalled run ${run.id} at stage ${job.stage}`);
  return NextResponse.json({ resumed: true, runId: run.id, stage: job.stage });
}
