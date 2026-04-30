'use client';
import { useState } from 'react';
import StatusPill from '@/components/ui/StatusPill';

interface RunMetadata {
  llmCost?: { totalCostUsd?: number };
}
interface Run {
  id: string; started_at: string; completed_at: string | null;
  posts_ingested: number; clusters_found: number; ideas_generated: number;
  status: string; error: string | null; metadata: RunMetadata | null;
}

function costStr(run: Run): string {
  const usd = run.metadata?.llmCost?.totalCostUsd;
  if (usd == null) return '—';
  return `$${usd.toFixed(3)}`;
}

function dur(run: Run): string {
  if (!run.completed_at) return '—';
  const s   = Math.round((new Date(run.completed_at).getTime() - new Date(run.started_at).getTime()) / 1000);
  const m   = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${String(sec).padStart(2, '0')}s`;
}
function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ── Mobile card ────────────────────────────────────────────────────
function MobileRunCard({ run }: { run: Run }) {
  const [showError, setShowError] = useState(false);
  const borderColor = run.status === 'failed' ? 'border-l-danger' : run.status === 'running' ? 'border-l-[#F59E0B]' : 'border-l-border';

  return (
    <div className={`bg-surface border border-border rounded-md mb-2 overflow-hidden border-l-[3px] ${borderColor}`}>
      {/* Header row */}
      <div className="flex justify-between items-center px-3.5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <StatusPill status={run.status} />
          <span className="font-mono text-[10px] text-muted">{timeAgo(run.started_at)}</span>
        </div>
        <span className="font-mono text-[10px] text-muted">{dur(run)}</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4">
        {[
          { label: 'Posts',    value: run.posts_ingested.toLocaleString(), accent: false },
          { label: 'Clusters', value: run.clusters_found.toLocaleString(), accent: false },
          { label: 'Ideas',    value: run.ideas_generated || '—',          accent: !!run.ideas_generated },
          { label: 'Cost',     value: costStr(run),                        accent: false },
        ].map((s, i) => (
          <div key={s.label} className={`py-2.5 text-center ${i < 3 ? 'border-r border-border' : ''}`}>
            <div className={`font-mono text-[16px] font-bold ${s.accent ? 'text-accent' : 'text-[#FAFAFA]'}`}>{s.value}</div>
            <div className="font-mono text-[8px] text-muted uppercase tracking-[0.06em]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Error toggle */}
      {run.error && (
        <>
          <div onClick={() => setShowError(!showError)} className="flex justify-between items-center px-3.5 py-2 border-t border-border cursor-pointer">
            <span className="font-mono text-[10px] text-danger tracking-[0.06em]">VIEW ERROR</span>
            <span className="text-[10px] text-muted">{showError ? '▲' : '▼'}</span>
          </div>
          {showError && (
            <div className="px-3.5 py-2.5 bg-[#450A0A] border-t border-[#7F1D1D]">
              <pre className="font-mono text-[11px] text-[#FCA5A5] m-0 whitespace-pre-wrap break-words leading-relaxed">{run.error}</pre>
            </div>
          )}
        </>
      )}

      {/* Run ID */}
      <div className="px-3.5 py-1.5 border-t border-border">
        <span className="font-mono text-[9px] text-[#3F3F46]">{run.id}</span>
      </div>
    </div>
  );
}

// ── Desktop table ──────────────────────────────────────────────────
function DesktopTable({ runs }: { runs: Run[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const COLS = '110px 90px 110px 100px 90px 60px 70px 24px';

  return (
    <div className="bg-surface border border-border rounded-md overflow-hidden">
      <div className="grid px-4 py-2 border-b border-border bg-surface-high text-[9px] font-mono text-muted uppercase tracking-[0.1em]" style={{ gridTemplateColumns: COLS }}>
        {['Run ID','Status','Started','Duration','Posts','Ideas','Cost',''].map(h => <span key={h}>{h}</span>)}
      </div>

      {runs.map(run => (
        <div key={run.id}>
          <div
            onClick={() => setExpanded(expanded === run.id ? null : run.id)}
            className={`grid px-4 py-3 cursor-pointer border-b border-border transition-colors items-center ${expanded === run.id ? 'bg-surface-high' : 'hover:bg-surface-high/50'}`}
            style={{ gridTemplateColumns: COLS }}
          >
            <span className="font-mono text-[11px] text-accent">{run.id.slice(0, 8)}…</span>
            <StatusPill status={run.status} />
            <div>
              <div className="font-mono text-[11px] text-[#FAFAFA]">
                {new Date(run.started_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="font-mono text-[10px] text-muted">
                {new Date(run.started_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <span className="font-mono text-[12px] text-[#FAFAFA]">{dur(run)}</span>
            <span className="font-mono text-[12px] text-[#FAFAFA]">{run.posts_ingested.toLocaleString()}</span>
            <span className={`font-mono text-[12px] ${run.ideas_generated ? 'text-accent' : 'text-muted'}`}>{run.ideas_generated || '—'}</span>
            <span className="font-mono text-[12px] text-muted">{costStr(run)}</span>
            <span className="text-[10px] text-muted text-center">{expanded === run.id ? '▲' : '▼'}</span>
          </div>

          {expanded === run.id && (
            <div className={`px-4 py-3 border-b border-border border-l-[3px] ${run.error ? 'bg-[#450A0A] border-l-danger' : 'bg-surface-high border-l-accent'}`}>
              {run.error ? (
                <>
                  <div className="font-mono text-[9px] text-danger uppercase tracking-[0.1em] mb-1">Error</div>
                  <div className="font-mono text-[11px] text-[#FCA5A5] leading-relaxed">{run.error}</div>
                </>
              ) : (
                <div className="flex gap-6 flex-wrap">
                  {[
                    { label: 'Posts ingested',  v: run.posts_ingested.toLocaleString() },
                    { label: 'Clusters found',  v: run.clusters_found.toLocaleString() },
                    { label: 'Ideas generated', v: String(run.ideas_generated) },
                    { label: 'LLM cost',        v: costStr(run) },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="font-mono text-[9px] text-muted uppercase tracking-[0.08em]">{s.label}</div>
                      <div className="font-mono text-[16px] font-bold text-[#FAFAFA]">{s.v}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {runs.length === 0 && (
        <div className="px-4 py-8 text-center font-mono text-[12px] text-muted">
          No runs yet. Click TRIGGER RUN to start the first pipeline run.
        </div>
      )}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────
export default function RunsClient({ runs }: { runs: Run[] }) {
  const [triggering, setTriggering] = useState(false);
  const [triggerMsg, setTriggerMsg] = useState('');
  const latest = runs.find(r => r.status === 'completed');

  // Fix #8: POST to /api/trigger (auth-protected), not GET to cron route
  async function handleTrigger() {
    setTriggering(true);
    setTriggerMsg('');
    try {
      const res  = await fetch('/api/trigger/ui', { method: 'POST' });
      const data = await res.json() as { success?: boolean; skipped?: boolean; reason?: string; error?: string; stats?: { ideasGenerated: number } };
      if (data.success)  setTriggerMsg(`Done — ${data.stats?.ideasGenerated ?? 0} ideas generated`);
      else if (data.skipped) setTriggerMsg(`Skipped — ${data.reason ?? "today's run already exists"}`);
      else               setTriggerMsg(`Error: ${data.error ?? 'unknown'}`);
    } catch {
      setTriggerMsg('Network error — check console');
    }
    setTriggering(false);
  }

  return (
    <div className="bg-bg min-h-screen font-sans">
      <div className="px-4 py-4 md:px-8 md:py-8 md:max-w-[900px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3.5 md:mb-7 gap-3 md:gap-0">
          <div>
            <h1 className="font-mono text-[15px] md:text-[18px] font-bold text-[#FAFAFA] m-0 tracking-[0.05em]">
              PIPELINE RUNS
            </h1>
            <p className="font-mono text-[11px] text-muted mt-1 m-0">Daily ingestion history</p>
          </div>
          <button
            onClick={handleTrigger}
            disabled={triggering}
            className={`w-full md:w-auto px-3.5 py-2.5 md:py-[7px] rounded border font-mono text-[11px] font-bold tracking-[0.08em] transition-colors ${triggering ? 'bg-surface-high border-border text-muted cursor-not-allowed' : 'bg-accent-muted border-accent text-accent cursor-pointer hover:bg-[#065F46]'}`}
          >
            {triggering ? '⟳ RUNNING...' : '⟳ TRIGGER RUN'}
          </button>
        </div>

        {/* Status message */}
        {triggerMsg && (
          <div className={`border rounded px-3.5 py-2 mb-3.5 font-mono text-[11px] ${triggerMsg.startsWith('Error') ? 'bg-[#450A0A] border-danger text-danger' : 'bg-accent-muted border-accent text-accent'}`}>
            {triggerMsg}
          </div>
        )}

        {/* Latest run summary */}
        {latest && (
          <div className="bg-surface border border-border rounded-md p-3.5 md:p-5 mb-3.5 md:mb-5">
            <div className="flex items-center gap-2 mb-3 md:mb-4 flex-wrap">
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.1em]">Last successful run</span>
              <StatusPill status="completed" />
              <span className="font-mono text-[10px] text-muted">{timeAgo(latest.started_at)} · {dur(latest)}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
              {[
                { label: 'Posts ingested',  value: latest.posts_ingested.toLocaleString() },
                { label: 'Clusters found',  value: latest.clusters_found.toLocaleString() },
                { label: 'Ideas generated', value: String(latest.ideas_generated) },
                { label: 'Duration',        value: dur(latest) },
                { label: 'LLM cost',        value: costStr(latest) },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-mono text-[9px] text-muted uppercase tracking-[0.1em] mb-1">{s.label}</div>
                  <div className="font-mono text-[18px] md:text-[22px] font-bold text-[#FAFAFA]">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile cards */}
        <div className="md:hidden">
          {runs.map(run => <MobileRunCard key={run.id} run={run} />)}
          {runs.length === 0 && (
            <div className="bg-surface border border-border rounded-md p-8 text-center font-mono text-[12px] text-muted">
              No runs yet. Tap TRIGGER RUN above.
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <DesktopTable runs={runs} />
        </div>
      </div>
    </div>
  );
}
