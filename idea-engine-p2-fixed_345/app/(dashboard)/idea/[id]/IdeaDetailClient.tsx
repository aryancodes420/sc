'use client';
import { useState } from 'react';
import Link from 'next/link';
import Pill from '@/components/ui/Pill';
import Section from '@/components/ui/Section';
import CopyButton from '@/components/ui/CopyButton';

interface Evidence { quote: string; source: string; url: string; }
interface ScoreBreakdown {
  frequency: number; momentum: number; intensity: number;
  monetisation: number; mvp_ease: number; composite: number;
}
interface Cluster { id: string; label: string; industry: string; post_count: number; }
interface Idea {
  id: string; rank: number; category: string; problem: string; audience: string;
  difficulty: string; time_to_mvp_days: number; monetisation_model: string;
  market_gap: string; mvp: string; build_prompt: string;
  evidence_json: Evidence[]; score_breakdown: ScoreBreakdown;
  clusters: Cluster | null;
}

const DIMS = [
  { key: 'frequency',    label: 'Frequency',    abbr: 'FRQ', weight: '30%' },
  { key: 'momentum',     label: 'Momentum',     abbr: 'MOM', weight: '25%' },
  { key: 'intensity',    label: 'Intensity',    abbr: 'INT', weight: '20%' },
  { key: 'monetisation', label: 'Monetisation', abbr: 'MON', weight: '15%' },
  { key: 'mvp_ease',     label: 'MVP Ease',     abbr: 'MVP', weight: '10%' },
] as const;

function modelColor(m: string): 'blue'|'purple'|'amber'|'muted' {
  return ({ subscription:'blue', saas:'purple', marketplace:'amber' } as Record<string,'blue'|'purple'|'amber'|'muted'>)[m] ?? 'muted';
}
function diffColor(d: string) {
  return ({ low:'text-accent', medium:'text-[#F59E0B]', high:'text-danger' } as Record<string,string>)[d] ?? 'text-muted';
}

// ── Mobile tab content ─────────────────────────────────────────────
function OverviewTab({ idea }: { idea: Idea }) {
  const cluster = idea.clusters;
  return (
    <div>
      <Section title="Market Gap">
        <p className="text-[13px] text-[#FAFAFA] leading-[1.7] m-0">{idea.market_gap}</p>
      </Section>
      <Section title="MVP Scope">
        <p className="text-[13px] text-[#FAFAFA] leading-[1.7] m-0">{idea.mvp}</p>
      </Section>
      <Section title="Quick Stats">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Time to MVP',  value: `${idea.time_to_mvp_days} days`, cls: 'text-[#FAFAFA]' },
            { label: 'Difficulty',   value: idea.difficulty.toUpperCase(),    cls: diffColor(idea.difficulty) },
            { label: 'Model',        value: idea.monetisation_model,          cls: 'text-[#FAFAFA]' },
            { label: 'Source posts', value: String(cluster?.post_count ?? '—'), cls: 'text-[#FAFAFA]' },
          ].map(m => (
            <div key={m.label} className="bg-surface-high rounded px-2.5 py-2">
              <div className={`font-mono text-[14px] font-bold ${m.cls}`}>{m.value}</div>
              <div className="font-mono text-[8px] text-muted uppercase tracking-[0.06em]">{m.label}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function EvidenceTab({ evidence }: { evidence: Evidence[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {evidence.map((e, i) => (
        <div key={i} className={`bg-surface border border-border rounded-md p-3.5 border-l-[3px] ${i === 0 ? 'border-l-accent' : 'border-l-accent-muted'}`}>
          <p className="text-[13px] text-[#FAFAFA] m-0 mb-2 leading-relaxed italic">"{e.quote}"</p>
          <a href={e.url} target="_blank" rel="noreferrer" className="text-[10px] text-accent font-mono no-underline">{e.source} ↗</a>
        </div>
      ))}
    </div>
  );
}

function BuildTab({ prompt }: { prompt: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="font-mono text-[9px] text-muted uppercase tracking-[0.1em]">Copy into a new Claude conversation</div>
        <CopyButton text={prompt} />
      </div>
      <pre className="font-mono text-[11px] text-muted m-0 leading-[1.7] whitespace-pre-wrap break-words bg-bg p-3.5 rounded-md border border-border overflow-auto">{prompt}</pre>
    </div>
  );
}

// ── Desktop score panel ────────────────────────────────────────────
function ScorePanel({ score, cluster, idea }: { score: ScoreBreakdown; cluster: Cluster | null; idea: Idea }) {
  const composite = Math.round(score.composite * 100);
  return (
    <div>
      <Section title="Score Breakdown">
        <div className="text-center mb-4 pb-4 border-b border-border">
          <div className="font-mono text-[52px] font-bold text-accent leading-none">{composite}</div>
          <div className="font-mono text-[9px] text-muted tracking-[0.1em] mt-1 uppercase">composite</div>
        </div>
        {DIMS.map(d => (
          <div key={d.key} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="font-mono text-[10px] text-muted">
                {d.label}<span className="text-[#3F3F46] ml-1.5">{d.weight}</span>
              </span>
              <span className="font-mono text-[10px] text-[#FAFAFA] font-bold">
                {Math.round((score[d.key] ?? 0) * 100)}
              </span>
            </div>
            <div className="h-[3px] bg-border rounded-sm">
              <div className="h-full bg-accent rounded-sm" style={{ width: `${(score[d.key] ?? 0) * 100}%` }} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Meta">
        {[
          { label: 'Time to MVP', value: `${idea.time_to_mvp_days} days` },
          { label: 'Difficulty',  value: idea.difficulty },
          { label: 'Model',       value: idea.monetisation_model },
          { label: 'Category',    value: idea.category },
        ].map(m => (
          <div key={m.label} className="flex justify-between items-center mb-2.5">
            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.08em]">{m.label}</span>
            <span className="font-mono text-[11px] text-[#FAFAFA] font-semibold">{m.value}</span>
          </div>
        ))}
        {cluster && (
          <Link href={`/cluster/${cluster.id}`} className="block mt-2 py-1.5 px-2.5 bg-surface-high border border-border rounded text-[10px] text-muted font-mono text-center no-underline tracking-[0.06em] hover:text-[#FAFAFA] transition-colors">
            VIEW SOURCE CLUSTER ({cluster.post_count} posts) ↗
          </Link>
        )}
      </Section>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────
const TABS = [
  { key: 'overview', label: 'Overview'     },
  { key: 'evidence', label: 'Evidence'     },
  { key: 'build',    label: 'Build Prompt' },
] as const;
type TabKey = typeof TABS[number]['key'];

export default function IdeaDetailClient({ idea, isBookmarked: initialBookmarked }: { idea: Idea; isBookmarked: boolean }) {
  const [tab, setTab]           = useState<TabKey>('overview');
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [bookmarking, setBookmarking] = useState(false);
  const score    = idea.score_breakdown as ScoreBreakdown;
  const evidence = idea.evidence_json as Evidence[];
  const cluster  = idea.clusters;
  const top3     = idea.rank <= 3;

  async function toggleBookmark() {
    setBookmarking(true);
    try {
      const method = bookmarked ? 'DELETE' : 'POST';
      const res = await fetch(`/api/bookmarks/${idea.id}`, { method });
      if (res.ok) setBookmarked(!bookmarked);
    } catch { /* silent — button will re-enable */ }
    setBookmarking(false);
  }

  return (
    <div className="bg-bg min-h-screen font-sans">
      <div className="px-4 pt-4 md:px-8 md:pt-8 md:max-w-[960px]">

        {/* Back + Bookmark */}
        <div className="flex justify-between items-center mb-5">
          <Link href="/today" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted no-underline tracking-[0.06em] hover:text-[#FAFAFA] transition-colors">
            ← TODAY'S IDEAS
          </Link>
          <button
            onClick={toggleBookmark}
            disabled={bookmarking}
            className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] border rounded px-2.5 py-1 transition-colors bg-transparent cursor-pointer ${bookmarked ? 'border-accent text-accent hover:bg-accent-muted' : 'border-border text-muted hover:border-[#3F3F46] hover:text-[#FAFAFA]'} ${bookmarking ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {bookmarked ? '★ SAVED' : '☆ SAVE'}
          </button>
        </div>

        {/* Header */}
        <div className="flex gap-4 items-start mb-6">
          <div className={`w-9 h-9 md:w-11 md:h-11 rounded-md flex-shrink-0 flex items-center justify-center font-mono text-[13px] md:text-[16px] font-bold border ${top3 ? 'bg-accent-muted border-accent text-accent' : 'bg-surface-high border-border text-muted'}`}>
            {String(idea.rank).padStart(2, '0')}
          </div>
          <div>
            <div className="flex gap-2 mb-2 flex-wrap">
              <Pill color={idea.category === 'B2C' ? 'blue' : 'purple'}>{idea.category}</Pill>
              <Pill color={modelColor(idea.monetisation_model)}>{idea.monetisation_model}</Pill>
              <Pill color="muted">{idea.difficulty}</Pill>
              {cluster && <Pill color="muted">{cluster.industry}</Pill>}
            </div>
            <h1 className="text-[16px] md:text-[20px] font-bold text-[#FAFAFA] m-0 mb-1.5 leading-snug">{idea.problem}</h1>
            <p className="text-[12px] md:text-[13px] text-muted m-0">{idea.audience}</p>
          </div>
        </div>

        {/* Mobile inline score */}
        <div className="md:hidden bg-surface border border-border rounded-md p-3.5 mb-3.5">
          <div className="flex items-center gap-3 mb-3">
            <div className="font-mono text-[32px] font-bold text-accent leading-none">
              {Math.round(score.composite * 100)}
            </div>
            <div className="font-mono text-[9px] text-muted tracking-[0.08em] leading-relaxed">
              COMPOSITE<br/>SCORE
            </div>
          </div>
          <div className="flex gap-1.5">
            {DIMS.map(d => (
              <div key={d.key} className="flex-1">
                <div className="flex justify-between mb-[3px]">
                  <span className="font-mono text-[8px] text-muted">{d.abbr}</span>
                  <span className="font-mono text-[8px] text-[#FAFAFA] font-bold">{Math.round((score[d.key] ?? 0) * 100)}</span>
                </div>
                <div className="h-[3px] bg-border rounded-sm">
                  <div className="h-full bg-accent rounded-sm" style={{ width: `${(score[d.key] ?? 0) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile tab bar */}
      <div className="md:hidden sticky top-0 z-10 flex border-b border-border bg-bg">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 text-center border-none cursor-pointer bg-transparent font-mono text-[11px] font-semibold tracking-[0.04em] border-b-2 transition-all duration-150 ${tab === t.key ? 'border-accent text-accent' : 'border-transparent text-muted'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mobile tab content */}
      <div className="md:hidden px-4 py-4 pb-20">
        {tab === 'overview' && <OverviewTab idea={idea} />}
        {tab === 'evidence' && <EvidenceTab evidence={evidence} />}
        {tab === 'build'    && <BuildTab prompt={idea.build_prompt} />}
      </div>

      {/* Desktop 2-col layout */}
      <div className="hidden md:grid px-8 pb-8 gap-4" style={{ gridTemplateColumns: '1fr 260px', maxWidth: 960 }}>
        {/* Left */}
        <div>
          <Section title="Market Gap">
            <p className="text-[13px] text-[#FAFAFA] leading-[1.7] m-0">{idea.market_gap}</p>
          </Section>
          <Section title="MVP">
            <p className="text-[13px] text-[#FAFAFA] leading-[1.7] m-0">{idea.mvp}</p>
          </Section>
          <Section title="Evidence (3 real posts)">
            <div className="flex flex-col gap-3">
              {evidence.map((e, i) => (
                <div key={i} className="border-l-2 border-accent-muted pl-3">
                  <p className="text-[12px] text-[#FAFAFA] m-0 mb-1 leading-relaxed italic">"{e.quote}"</p>
                  <a href={e.url} target="_blank" rel="noreferrer" className="text-[10px] text-accent font-mono no-underline">{e.source} ↗</a>
                </div>
              ))}
            </div>
          </Section>
          <div className="bg-surface border border-border rounded-md p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="font-mono text-[9px] text-muted uppercase tracking-[0.1em]">Build Prompt</div>
              <CopyButton text={idea.build_prompt} />
            </div>
            <pre className="font-mono text-[11px] text-muted m-0 leading-[1.7] whitespace-pre-wrap break-words max-h-[280px] overflow-auto bg-bg p-3 rounded border border-border">{idea.build_prompt}</pre>
          </div>
        </div>
        {/* Right */}
        <ScorePanel score={score} cluster={cluster} idea={idea} />
      </div>
    </div>
  );
}
