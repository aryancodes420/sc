'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const TICKER_ITEMS = [
  { label: 'Posts ingested today', value: '12,847' },
  { label: 'Complaints detected',  value: '3,291'  },
  { label: 'Active clusters',      value: '187'    },
  { label: 'Ideas generated',      value: '10'     },
  { label: 'Sources monitored',    value: '20 subreddits' },
  { label: 'Avg composite score',  value: '0.73'   },
];

const SAMPLE_IDEAS = [
  { rank: 1, cat: 'B2C', title: 'Invoice tracking for freelancers',      score: 89 },
  { rank: 2, cat: 'B2B', title: 'Automated compliance checks for SaaS',  score: 84 },
  { rank: 3, cat: 'B2C', title: 'Meal prep planner with grocery API',     score: 81 },
];

function TickerFeed() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % SAMPLE_IDEAS.length), 3000);
    return () => clearInterval(id);
  }, []);
  const idea = SAMPLE_IDEAS[idx];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {TICKER_ITEMS.map(t => (
          <div key={t.label} className="bg-surface-high border border-border rounded px-3 py-2.5">
            <div className="font-mono text-[18px] font-bold text-[#FAFAFA] mb-0.5">{t.value}</div>
            <div className="font-mono text-[9px] text-muted uppercase tracking-[0.08em]">{t.label}</div>
          </div>
        ))}
      </div>
      <div className="font-mono text-[9px] text-muted uppercase tracking-[0.1em] mb-2">Today's top idea</div>
      <div className="bg-surface-high border border-border rounded-md p-3.5 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-mono text-[10px] text-accent mb-1">
              #{String(idea.rank).padStart(2, '0')} · {idea.cat}
            </div>
            <div className="text-[13px] text-[#FAFAFA] font-semibold leading-snug">{idea.title}</div>
          </div>
          <div className="font-mono text-2xl font-bold text-accent">{idea.score}</div>
        </div>
      </div>
      <div className="flex gap-1.5 justify-center mt-3">
        {SAMPLE_IDEAS.map((_, i) => (
          <div key={i} className={`h-1 rounded-sm transition-all duration-200 ${i === idx ? 'w-4 bg-accent' : 'w-1 bg-border'}`} />
        ))}
      </div>
    </div>
  );
}

function MobileStatsBar() {
  return (
    <div className="flex md:hidden border-b border-border bg-surface">
      {[
        { v: '12.8k', l: 'Posts' },
        { v: '3.3k',  l: 'Complaints' },
        { v: '187',   l: 'Clusters' },
        { v: '10',    l: 'Ideas' },
      ].map((s, i) => (
        <div key={s.l} className={`flex-1 py-2.5 text-center ${i < 3 ? 'border-r border-border' : ''}`}>
          <div className="font-mono text-[14px] font-bold text-[#FAFAFA]">{s.v}</div>
          <div className="font-mono text-[8px] text-muted uppercase tracking-[0.06em]">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function LoginForm() {
  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (err) { setError(err.message); setLoading(false); return; }
    setSent(true);
    setLoading(false);
  }

  if (sent) return (
    <div>
      <div className="bg-accent-muted border border-[#065F46] rounded-md px-4 py-3.5 mb-5">
        <div className="font-mono text-[10px] text-accent font-bold tracking-[0.1em] mb-1">LINK SENT</div>
        <div className="text-[13px] text-muted leading-relaxed">
          Check <strong className="text-[#FAFAFA]">{email}</strong>
        </div>
      </div>
      <button onClick={() => setSent(false)} className="w-full py-2.5 bg-transparent border border-border text-muted rounded font-mono text-[11px] cursor-pointer tracking-[0.06em] hover:text-[#FAFAFA] transition-colors">
        ← TRY DIFFERENT EMAIL
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <label className="block font-mono text-[10px] text-muted uppercase tracking-[0.1em] mb-1.5">Email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="w-full px-3.5 py-3 bg-surface-high border border-border rounded text-[#FAFAFA] font-mono text-[16px] md:text-[14px] outline-none focus:border-accent placeholder:text-[#3F3F46] transition-colors"
      />
      {error && <div className="font-mono text-[11px] text-danger mt-2">{error}</div>}
      <button
        type="submit"
        disabled={loading || !email}
        className={`w-full py-3 mt-5 rounded font-mono text-[12px] font-bold tracking-[0.08em] border-none transition-colors ${loading ? 'bg-accent-muted text-accent cursor-not-allowed' : 'bg-accent text-bg cursor-pointer hover:bg-[#0ea572]'}`}
      >
        {loading ? 'SENDING...' : 'SEND MAGIC LINK'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg font-sans">
      {/* Mobile stats bar */}
      <MobileStatsBar />

      {/* Desktop left panel */}
      <div className="hidden md:flex md:flex-1 md:max-w-lg bg-surface border-r border-border px-10 py-12 flex-col justify-center">
        <div className="font-mono text-[9px] text-muted uppercase tracking-[0.12em] mb-6">LIVE PIPELINE STATS</div>
        <TickerFeed />
      </div>

      {/* Right / mobile form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-10 py-8">
        <div className="w-full max-w-[360px]">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_#10B981] animate-pulse" />
            <span className="font-mono text-[15px] font-bold text-[#FAFAFA] tracking-[0.14em]">IDEA ENGINE</span>
          </div>
          <p className="font-mono text-[11px] text-muted mb-10 leading-relaxed">
            10 validated app ideas per day,<br />mined from real user complaints.
          </p>
          <LoginForm />
        </div>
      </div>

    </div>
  );
}
