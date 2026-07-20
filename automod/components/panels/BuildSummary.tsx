'use client';
import { useState } from 'react';
import { useBuildStore } from '@/lib/store/buildStore';
import { formatGBP } from '@/lib/utils/price';
import { SaveBuildModal } from '@/components/share/SaveBuildModal';
import { ShareBar } from '@/components/share/ShareBar';

export function BuildSummary() {
  const selectedParts = useBuildStore((s) => s.selectedParts);
  const removePart    = useBuildStore((s) => s.removePart);
  const getTotalGBP   = useBuildStore((s) => s.getTotalGBP);
  const clearBuild    = useBuildStore((s) => s.clearBuild);

  const [saveOpen, setSaveOpen]   = useState(false);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);

  const parts = Array.from(selectedParts.values());
  const total = getTotalGBP();

  return (
    <div className="flex flex-col h-full border-t border-border lg:border-t-0 lg:border-l">
      <div className="px-4 pt-4 pb-3 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white">Your Build</h2>
          {parts.length > 0 && (
            <button
              onClick={clearBuild}
              className="text-xs text-muted hover:text-danger transition-colors font-mono"
            >
              CLEAR
            </button>
          )}
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-bold text-accent">{formatGBP(total)}</span>
          <span className="text-xs text-muted font-mono">EST. TOTAL</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {parts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">🛒</div>
            <p className="text-sm text-muted">No parts selected yet.<br />Pick something from the panel.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {parts.map((part) => (
              <li key={part.id} className="flex items-start gap-3 bg-surface-hi border border-border rounded-xl p-3">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[9px] text-muted uppercase tracking-wider">{part.brand}</div>
                  <div className="text-sm text-white font-medium leading-snug truncate">{part.name}</div>
                  <div className="text-sm font-bold text-accent mt-0.5">{formatGBP(part.price_gbp)}</div>
                </div>
                <button
                  onClick={() => removePart(part.section)}
                  className="text-muted hover:text-danger transition-colors mt-0.5 flex-shrink-0"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 border-t border-border flex-shrink-0">
        {savedSlug ? (
          <ShareBar slug={savedSlug} onClose={() => setSavedSlug(null)} />
        ) : (
          <button
            onClick={() => setSaveOpen(true)}
            disabled={parts.length === 0}
            className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save & Share Build
          </button>
        )}
      </div>

      <SaveBuildModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        onSaved={(slug) => { setSavedSlug(slug); setSaveOpen(false); }}
      />
    </div>
  );
}
