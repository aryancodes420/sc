'use client';
// components/ui/CopyButton.tsx
// Moved from app/(dashboard)/idea/[id]/CopyButton.tsx

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={copy}
      className={`
        border rounded-[3px] px-[10px] py-1
        text-[10px] font-mono tracking-[0.06em] cursor-pointer transition-all duration-150
        ${copied
          ? 'bg-accent-muted border-accent text-accent'
          : 'bg-surface-high border-border text-muted hover:text-[#FAFAFA]'}
      `}
    >
      {copied ? '✓ COPIED' : 'COPY'}
    </button>
  );
}
