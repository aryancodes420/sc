'use client';
import { useState } from 'react';
import Link from 'next/link';
import Pill from '@/components/ui/Pill';

export interface BookmarkIdea {
  id: string; rank: number; date: string; category: string;
  problem: string; audience: string; difficulty: string;
  time_to_mvp_days: number; monetisation_model: string;
  score_breakdown: {
    frequency: number; momentum: number; intensity: number;
    monetisation: number; mvp_ease: number; composite: number;
  };
}


function modelColor(m: string) {
  return ({ subscription: 'blue', saas: 'purple', marketplace: 'amber' } as Record<string, string>)[m] ?? 'muted';
}
function diffColor(d: string) {
  return ({ low: 'text-accent', medium: 'text-[#F59E0B]', high: 'text-danger' } as Record<string, string>)[d] ?? 'text-muted';
}

function BookmarkCard({
  idea,
  onRemove,
}: {
  idea: BookmarkIdea;
  onRemove: (id: string) => void;
}) {
  const [removing, setRemoving] = useState(false);
  const pct = Math.round(idea.score_breakdown.composite * 100);

  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault(); // don't navigate
    setRemoving(true);
    try {
      await fetch(`/api/bookmarks/${idea.id}`, { method: 'DELETE' });
      onRemove(idea.id);
    } catch {
      setRemoving(false);
    }
  }

  return (
    <div className="bg-surface border border-border rounded-md mb-2 overflow-hidden">
      <Link href={`/idea/${idea.id}`} className="no-underline block">
        <div className="px-4 py-3.5">
          {/* Top row */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Pill color={idea.category === 'B2C' ? 'blue' : 'purple'}>{idea.category}</Pill>
              <Pill color={modelColor(idea.monetisation_model) as 'blue' | 'purple' | 'amber' | 'muted'}>
                {idea.monetisation_model}
              </Pill>
              <span className={`font-mono text-[10px] ${diffColor(idea.difficulty)}`}>
                ● {idea.difficulty.toUpperCase()}
              </span>
              <span className="font-mono text-[10px] text-muted">{idea.time_to_mvp_days}d build</span>
            </div>
            <div className="text-right ml-3 flex-shrink-0">
              <div className="font-mono text-[22px] font-bold text-accent leading-none">{pct}</div>
              <div className="font-mono text-[8px] text-muted tracking-[0.1em]">SCORE</div>
            </div>
          </div>

          <div className="text-[14px] font-semibold text-[#FAFAFA] leading-snug mb-1">{idea.problem}</div>
          <div className="text-[12px] text-muted leading-relaxed mb-2">{idea.audience}</div>

          {/* Date */}
          <div className="font-mono text-[10px] text-[#3F3F46]">
            {new Date(idea.date + 'T12:00:00Z').toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </div>
        </div>
      </Link>

      {/* Remove button — outside Link to avoid nested anchors */}
      <div className="border-t border-border px-4 py-2 flex justify-end">
        <button
          onClick={handleRemove}
          disabled={removing}
          className={`font-mono text-[10px] tracking-[0.06em] border-none bg-transparent cursor-pointer transition-colors ${removing ? 'text-[#3F3F46]' : 'text-muted hover:text-danger'}`}
        >
          {removing ? 'REMOVING...' : '✕ REMOVE'}
        </button>
      </div>
    </div>
  );
}

export default function BookmarksClient({ ideas: initialIdeas }: { ideas: BookmarkIdea[] }) {
  const [ideas, setIdeas] = useState(initialIdeas);

  function handleRemove(id: string) {
    setIdeas(prev => prev.filter(i => i.id !== id));
  }

  return (
    <div className="bg-bg min-h-screen font-sans">
      <div className="p-4 md:p-8 md:max-w-[900px]">
        <div className="mb-5 md:mb-7">
          <h1 className="font-mono text-[15px] md:text-[18px] font-bold text-[#FAFAFA] tracking-[0.05em]">
            BOOKMARKS
          </h1>
          <p className="font-mono text-[11px] text-muted mt-1">
            {ideas.length} saved {ideas.length === 1 ? 'idea' : 'ideas'}
          </p>
        </div>

        {ideas.length === 0 ? (
          <div className="bg-surface border border-border rounded-md p-12 text-center">
            <div className="text-2xl mb-3">◈</div>
            <div className="font-mono text-[13px] text-muted mb-1">No bookmarks yet.</div>
            <div className="font-mono text-[11px] text-[#3F3F46]">
              Open any idea and tap the bookmark button to save it here.
            </div>
          </div>
        ) : (
          ideas.map(idea => (
            <BookmarkCard key={idea.id} idea={idea} onRemove={handleRemove} />
          ))
        )}
      </div>
    </div>
  );
}
