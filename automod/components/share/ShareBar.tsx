'use client';
import { useState } from 'react';

interface ShareBarProps {
  slug: string;
  onClose: () => void;
}

export function ShareBar({ slug, onClose }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/builds/${slug}`
    : `/builds/${slug}`;

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-surface-hi border border-accent/40 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Build saved!</span>
        <button onClick={onClose} className="text-muted hover:text-white text-sm">✕</button>
      </div>
      <div className="flex gap-2">
        <input
          readOnly
          value={url}
          className="flex-1 bg-bg border border-border rounded-lg px-3 py-2 text-xs text-muted font-mono truncate outline-none"
        />
        <button
          onClick={copy}
          className="px-3 py-2 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-orange-500 transition-colors whitespace-nowrap"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
