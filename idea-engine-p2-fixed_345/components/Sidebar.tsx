'use client';
// components/Sidebar.tsx
// Desktop: 220px left sidebar
// Mobile: sticky top bar + fixed bottom tab bar

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/today',     label: 'Ideas', icon: '◈' },
  { href: '/bookmarks', label: 'Saved', icon: '★' },
  { href: '/runs',      label: 'Runs',  icon: '⟳' },
] as const;

function useCountdown() {
  const [text, setText] = useState('');
  useEffect(() => {
    const tick = () => {
      const now  = new Date();
      const next = new Date();
      // Cron runs at 10:00 UTC — must target UTC, not local
      next.setUTCHours(10, 0, 0, 0);
      if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
      const diff = next.getTime() - now.getTime();
      setText(`${Math.floor(diff / 3_600_000)}h ${Math.floor((diff % 3_600_000) / 60_000)}m`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return text;
}

export default function Sidebar() {
  const pathname  = usePathname();
  const router    = useRouter();
  const countdown = useCountdown();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[220px] md:flex-col md:flex-shrink-0 bg-surface border-r border-border h-screen sticky top-0">
        <div className="px-5 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_#10B981] animate-pulse" />
            <span className="font-mono text-[13px] font-bold text-[#FAFAFA] tracking-[0.12em]">IDEA ENGINE</span>
          </div>
        </div>
        <div className="px-5 py-3 border-b border-border">
          <div className="text-[9px] text-muted font-mono uppercase tracking-[0.1em] mb-0.5">Next run</div>
          <div className="font-mono text-[12px] text-accent">10:00 AM · in {countdown}</div>
        </div>
        <nav className="py-2 flex-1">
          {NAV.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <a key={item.href} href={item.href} className={`flex items-center gap-2.5 px-5 py-2.5 no-underline transition-all duration-100 border-l-2 ${active ? 'bg-surface-high border-accent' : 'border-transparent'}`}>
                <span className={`text-[13px] ${active ? 'text-accent' : 'text-muted'}`}>{item.icon}</span>
                <span className={`text-[12px] ${active ? 'text-[#FAFAFA] font-semibold' : 'text-muted'}`}>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="px-5 py-3 border-t border-border">
          <button onClick={handleSignOut} className="bg-transparent border-none text-muted text-[11px] font-mono tracking-[0.06em] cursor-pointer p-0">SIGN OUT</button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="flex md:hidden sticky top-0 z-20 bg-surface border-b border-border px-4 py-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[7px] h-[7px] rounded-full bg-accent shadow-[0_0_6px_#10B981] animate-pulse" />
          <span className="font-mono text-[12px] font-bold text-[#FAFAFA] tracking-[0.1em]">IDEA ENGINE</span>
        </div>
        <div className="font-mono text-[10px] text-accent">⟳ {countdown}</div>
      </header>

      {/* Mobile bottom tabs */}
      <nav className="fixed bottom-0 left-0 right-0 flex md:hidden bg-surface border-t border-border z-20" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {NAV.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <a key={item.href} href={item.href} className={`flex-1 flex flex-col items-center py-2.5 gap-[3px] no-underline border-t-2 -mt-px ${active ? 'border-accent' : 'border-transparent'}`}>
              <span className={`text-[18px] ${active ? 'text-accent' : 'text-muted'}`}>{item.icon}</span>
              <span className={`font-mono text-[9px] font-semibold tracking-[0.06em] uppercase ${active ? 'text-accent' : 'text-muted'}`}>{item.label}</span>
            </a>
          );
        })}
        <button onClick={handleSignOut} className="flex-1 flex flex-col items-center py-2.5 gap-[3px] border-t-2 border-transparent -mt-px bg-transparent cursor-pointer">
          <span className="text-[18px] text-muted">⏻</span>
          <span className="font-mono text-[9px] font-semibold tracking-[0.06em] uppercase text-muted">MORE</span>
        </button>
      </nav>
    </>
  );
}
