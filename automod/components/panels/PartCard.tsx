'use client';
import { useBuildStore } from '@/lib/store/buildStore';
import { formatGBP } from '@/lib/utils/price';
import type { Part } from '@/lib/types';

interface PartCardProps {
  part: Part;
}

export function PartCard({ part }: PartCardProps) {
  const selectedParts = useBuildStore((s) => s.selectedParts);
  const selectPart    = useBuildStore((s) => s.selectPart);
  const removePart    = useBuildStore((s) => s.removePart);

  const isSelected = selectedParts.get(part.section)?.id === part.id;

  return (
    <div
      className={`
        relative bg-surface border rounded-xl overflow-hidden transition-all cursor-pointer group
        ${isSelected ? 'border-accent shadow-[0_0_0_1px_#F97316]' : 'border-border hover:border-muted'}
      `}
      onClick={() => isSelected ? removePart(part.section) : selectPart(part)}
    >
      {/* Part thumbnail */}
      <div className="aspect-video bg-surface-hi flex items-center justify-center overflow-hidden">
        <img
          src={part.thumbnail_url}
          alt={part.name}
          className="w-full h-full object-contain p-4"
          onError={(e) => {
            // Fallback to a coloured placeholder
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
      </div>

      <div className="p-3">
        <div className="font-mono text-[9px] text-muted uppercase tracking-wider mb-0.5">{part.brand}</div>
        <div className="text-sm font-semibold text-white leading-snug mb-2">{part.name}</div>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold text-sm">{formatGBP(part.price_gbp)}</span>
          {part.buy_url && (
            <a
              href={part.buy_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-mono text-muted hover:text-accent transition-colors"
            >
              BUY →
            </a>
          )}
        </div>
      </div>

      {/* Selected tick */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
