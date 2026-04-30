'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Pill from '@/components/ui/Pill';

interface ScoreBreakdown {
  frequency: number; momentum: number; intensity: number;
  monetisation: number; mvp_ease: number; composite: number;
}
interface Idea {
  id: string; rank: number; category: string; problem: string;
  audience: string; difficulty: string; time_to_mvp_days: number;
  monetisation_model: string; score_breakdown: ScoreBreakdown;
}

const DIMS = [
  { key: 'frequency',    label: 'Frequency', w: '30%' },
  { key: 'momentum',     label: 'Momentum',  w: '25%' },
  { key: 'intensity',    label: 'Intensity', w: '20%' },
  { key: 'monetisation', label: 'Monetise',  w: '15%' },
  { key: 'mvp_ease',     label: 'MVP Ease',  w: '10%' },
] as const;

function modelColor(m: string) {
  return ({ subscription:'blue', saas:'purple', marketplace:'amber' } as Record<string,string>)[m] ?? 'muted';
}
function diffColor(d: string) {
  return ({ low:'text-accent', medium:'text-[#F59E0B]', high:'text-danger' } as Record<string,string>)[d] ?? 'text-muted';
}

// ── Mobile swipe card ──────────────────────────────────────────────
function SwipeCard({ idea }: { idea: Idea }) {
  const sb   = idea.score_breakdown;
  const pct  = Math.round(sb.composite * 100);
  const top3 = idea.rank <= 3;

  return (
    <Link href={`/idea/${idea.id}`} className="no-underline">
      <div className="w-[calc(100vw-32px)] flex-shrink-0 bg-surface border border-border rounded-lg p-[18px] snap-center">
        {/* Rank + score */}
        <div className="flex justify-between items-start mb-3.5">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-md flex items-center justify-center font-mono text-[14px] font-bold border ${top3 ? 'bg-accent-muted border-accent text-accent' : 'bg-surface-high border-border text-muted'}`}>
              {String(idea.rank).padStart(2, '0')}
            </div>
            <div className="flex gap-1.5">
              <Pill color={idea.category === 'B2C' ? 'blue' : 'purple'}>{idea.category}</Pill>
              <Pill color={modelColor(idea.monetisation_model) as 'blue'|'purple'|'amber'|'muted'}>{idea.monetisation_model}</Pill>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[36px] font-bold text-accent leading-none">{pct}</div>
            <div className="font-mono text-[9px] text-muted tracking-[0.1em] mt-0.5">COMPOSITE</div>
          </div>
        </div>

        <div className="text-[15px] font-semibold text-[#FAFAFA] leading-snug mb-2">{idea.problem}</div>
        <div className="text-[12px] text-muted mb-4 leading-relaxed">{idea.audience}</div>

        <div className="flex gap-4 py-2.5 border-t border-b border-border mb-4">
          <div>
            <div className="font-mono text-[14px] font-bold text-[#FAFAFA]">{idea.time_to_mvp_days}d</div>
            <div className="font-mono text-[9px] text-muted uppercase">Build</div>
          </div>
          <div>
            <div className={`font-mono text-[14px] font-bold ${diffColor(idea.difficulty)}`}>{idea.difficulty.toUpperCase()}</div>
            <div className="font-mono text-[9px] text-muted uppercase">Difficulty</div>
          </div>
        </div>

        {DIMS.map(d => (
          <div key={d.key} className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] text-muted w-[60px]">{d.label}</span>
            <div className="flex-1 h-[3px] bg-border rounded-sm">
              <div className="h-full bg-accent rounded-sm" style={{ width: `${(sb[d.key] ?? 0) * 100}%` }} />
            </div>
            <span className="font-mono text-[10px] font-bold text-[#FAFAFA] w-6 text-right">{Math.round((sb[d.key] ?? 0) * 100)}</span>
            <span className="font-mono text-[9px] text-[#3F3F46] w-6">{d.w}</span>
          </div>
        ))}

        <div className="mt-3.5 pt-2.5 border-t border-border text-center">
          <span className="font-mono text-[11px] text-accent font-semibold tracking-[0.06em]">
            VIEW FULL IDEA + BUILD PROMPT →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Desktop list card ──────────────────────────────────────────────
function DesktopCard({ idea }: { idea: Idea }) {
  const [hov, setHov]  = useState(false);
  const sb             = idea.score_breakdown;
  const pct            = Math.round(sb.composite * 100);
  const top3           = idea.rank <= 3;

  return (
    <Link href={`/idea/${idea.id}`} className="no-underline">
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={`grid gap-4 rounded-md px-5 py-4 cursor-pointer transition-all duration-100 mb-1.5 border ${hov ? 'bg-surface-high border-[#3F3F46]' : 'bg-surface border-border'}`}
        style={{ gridTemplateColumns: '40px 1fr 160px' }}
      >
        <div className="pt-0.5">
          <div className={`w-[30px] h-[30px] rounded flex items-center justify-center font-mono text-[12px] font-bold border ${top3 ? 'bg-accent-muted border-accent text-accent' : 'bg-surface-high border-border text-muted'}`}>
            {String(idea.rank).padStart(2, '0')}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Pill color={idea.category === 'B2C' ? 'blue' : 'purple'}>{idea.category}</Pill>
            <Pill color={modelColor(idea.monetisation_model) as 'blue'|'purple'|'amber'|'muted'}>{idea.monetisation_model}</Pill>
            <span className={`font-mono text-[10px] ${diffColor(idea.difficulty)}`}>● {idea.difficulty.toUpperCase()}</span>
            <span className="font-mono text-[10px] text-muted">{idea.time_to_mvp_days}d build</span>
          </div>
          <div className="text-[14px] font-semibold text-[#FAFAFA] mb-1 leading-snug">{idea.problem}</div>
          <div className="text-[12px] text-muted">{idea.audience}</div>
        </div>
        <div className="flex flex-col items-end justify-center gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[16px] font-bold text-accent min-w-[32px]">{pct}</span>
            <div className="w-20 h-[3px] bg-border rounded-sm">
              <div className="h-full bg-accent rounded-sm" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="font-mono text-[9px] text-muted tracking-[0.08em]">COMPOSITE</span>
        </div>
      </div>
    </Link>
  );
}

interface TodayClientProps {
  ideas: Idea[];
  date: string;
  dateStr: string;
  isToday: boolean;
  prevDate: string | null;
  nextDate: string | null;
}

// ── Main export ────────────────────────────────────────────────────
export default function TodayClient({ ideas, date, isToday, prevDate, nextDate }: TodayClientProps) {
  const router                      = useRouter();
  const [filter, setFilter]         = useState<'all' | 'B2C' | 'B2B'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const scrollRef                   = useRef<HTMLDivElement>(null);
  const visible = filter === 'all' ? ideas : ideas.filter(i => i.category === filter);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / Math.max(visible.length, 1);
      const idx = Math.min(Math.round(el.scrollLeft / cardWidth), visible.length - 1);
      setCurrentIdx(idx);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [visible.length]);

  function nav(dateParam: string | null) {
    if (!dateParam) return;
    router.push(`/today?date=${dateParam}`);
  }

  return (
    <div className="bg-bg min-h-screen font-sans">
      <div className="p-4 md:p-8 md:max-w-[900px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-7 gap-2.5 md:gap-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Prev arrow */}
              <button
                onClick={() => nav(prevDate)}
                disabled={!prevDate}
                aria-label="Previous day"
                className={`w-6 h-6 flex items-center justify-center rounded border font-mono text-[12px] transition-colors ${prevDate ? 'border-border text-muted hover:border-[#3F3F46] hover:text-[#FAFAFA] cursor-pointer' : 'border-transparent text-[#27272A] cursor-default'}`}
              >
                ←
              </button>
              <h1 className="font-mono text-[15px] md:text-[18px] font-bold text-[#FAFAFA] tracking-[0.05em]">
                {isToday ? "TODAY'S IDEAS" : 'IDEAS'}
              </h1>
              {/* Next arrow */}
              <button
                onClick={() => nav(nextDate)}
                disabled={!nextDate}
                aria-label="Next day"
                className={`w-6 h-6 flex items-center justify-center rounded border font-mono text-[12px] transition-colors ${nextDate ? 'border-border text-muted hover:border-[#3F3F46] hover:text-[#FAFAFA] cursor-pointer' : 'border-transparent text-[#27272A] cursor-default'}`}
              >
                →
              </button>
            </div>
            <p className="font-mono text-[11px] text-muted">{date}</p>
          </div>
          {/* Filter tabs */}
          <div className="flex bg-surface border border-border rounded overflow-hidden">
            {(['all', 'B2C', 'B2B'] as const).map(f => (
              <button
                key={f}
                onClick={() => { setFilter(f); setCurrentIdx(0); }}
                className={`flex-1 md:flex-none px-3.5 py-1.5 border-none cursor-pointer font-mono text-[11px] font-semibold tracking-[0.06em] transition-colors border-r border-border last:border-r-0 ${filter === f ? 'bg-surface-high text-[#FAFAFA]' : 'bg-transparent text-muted'}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="bg-surface border border-border rounded-md p-12 text-center">
            <div className="text-2xl mb-3">◈</div>
            <div className="font-mono text-[13px] text-muted">
              {ideas.length === 0 ? 'No ideas generated yet. Pipeline runs at 10:00 AM.' : `No ${filter} ideas today.`}
            </div>
          </div>
        )}

        {/* Mobile carousel */}
        {visible.length > 0 && (
          <>
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory md:hidden pb-1 scrollbar-hide"
              style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              {visible.map(idea => <SwipeCard key={idea.id} idea={idea} />)}
            </div>
            {/* Dots + counter */}
            <div className="md:hidden flex justify-center gap-1.5 mt-3.5">
              {visible.map((_, i) => (
                <div key={i} className={`h-[5px] rounded-sm transition-all duration-200 ${i === currentIdx ? 'w-4 bg-accent' : 'w-[5px] bg-border'}`} />
              ))}
            </div>
            <div className="md:hidden text-center mt-2 font-mono text-[10px] text-muted">
              {currentIdx + 1} / {visible.length}
            </div>
          </>
        )}

        {/* Desktop list */}
        <div className="hidden md:block">
          {visible.map(idea => <DesktopCard key={idea.id} idea={idea} />)}
        </div>
      </div>

    </div>
  );
}
