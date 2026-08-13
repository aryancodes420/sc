'use client';
import { useBuildStore } from '@/lib/store/buildStore';
import type { SectionId } from '@/lib/types';

const SECTIONS: { id: SectionId; label: string; emoji: string }[] = [
  { id: 'front_aero',   label: 'Front Aero',   emoji: '🏎' },
  { id: 'rear_aero',    label: 'Rear Aero',    emoji: '💨' },
  { id: 'side_skirts',  label: 'Side Skirts',  emoji: '⚡' },
  { id: 'wheels',       label: 'Wheels',       emoji: '⭕' },
  { id: 'paint',        label: 'Paint & Wrap', emoji: '🎨' },
  { id: 'window_tint',  label: 'Window Tint',  emoji: '🌙' },
  { id: 'suspension',   label: 'Suspension',   emoji: '📉' },
  { id: 'exhaust',      label: 'Exhaust',      emoji: '🔥' },
];

export function SectionNav() {
  const activeSection  = useBuildStore((s) => s.activeSection);
  const setActive      = useBuildStore((s) => s.setActiveSection);
  const selectedParts  = useBuildStore((s) => s.selectedParts);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {SECTIONS.map((sec) => {
        const isActive   = activeSection === sec.id;
        const hasSelection = selectedParts.has(sec.id);
        return (
          <button
            key={sec.id}
            onClick={() => setActive(sec.id)}
            className={`
              flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
              ${isActive
                ? 'bg-accent text-white shadow-[0_0_12px_#F9731640]'
                : 'bg-surface border border-border text-muted hover:text-white hover:border-muted'
              }
            `}
          >
            <span>{sec.emoji}</span>
            <span className="whitespace-nowrap">{sec.label}</span>
            {hasSelection && !isActive && (
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}
