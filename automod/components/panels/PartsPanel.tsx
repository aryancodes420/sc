'use client';
import { useEffect, useState } from 'react';
import { useBuildStore } from '@/lib/store/buildStore';
import { PartCard } from './PartCard';
import { Spinner } from '@/components/ui/Spinner';
import type { Part } from '@/lib/types';

export function PartsPanel() {
  const activeSection = useBuildStore((s) => s.activeSection);
  const [parts, setParts]     = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeSection) return;
    setLoading(true);
    fetch(`/api/parts?section=${activeSection}`)
      .then((r) => r.json())
      .then((data: Part[]) => { setParts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeSection]);

  const sectionLabel = activeSection?.replace(/_/g, ' ') ?? '';

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 border-b border-border flex-shrink-0">
        <h2 className="font-mono text-[10px] text-muted uppercase tracking-widest">
          {sectionLabel || 'Select a section'}
        </h2>
        {parts.length > 0 && (
          <p className="text-xs text-muted mt-0.5">{parts.length} option{parts.length !== 1 ? 's' : ''} available</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Spinner />
          </div>
        ) : parts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <div className="text-3xl mb-3">🏎</div>
            <p className="text-muted text-sm">Select a category above<br />to browse parts</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {parts.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
