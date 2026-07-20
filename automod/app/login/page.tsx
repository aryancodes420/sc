'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

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
      <div className="bg-accent-dim border border-accent/30 rounded-xl px-4 py-4 mb-5">
        <div className="font-mono text-[10px] text-accent font-bold tracking-widest mb-1">LINK SENT</div>
        <div className="text-sm text-muted leading-relaxed">
          Check <strong className="text-white">{email}</strong> for your sign-in link.
        </div>
      </div>
      <button
        onClick={() => setSent(false)}
        className="w-full py-3 bg-transparent border border-border text-muted rounded-xl font-mono text-xs hover:text-white transition-colors tracking-wider"
      >
        ← TRY DIFFERENT EMAIL
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-mono text-[10px] text-muted uppercase tracking-widest mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 bg-surface-hi border border-border rounded-xl text-white font-mono text-sm outline-none focus:border-accent placeholder:text-muted transition-colors"
        />
      </div>
      {error && <p className="font-mono text-xs text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading || !email}
        className="w-full py-3 bg-accent text-white font-bold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-mono text-sm tracking-wider"
      >
        {loading ? 'SENDING...' : 'SEND MAGIC LINK'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_#F97316] animate-pulse" />
          <Link href="/" className="font-mono text-sm font-bold text-white tracking-widest hover:text-accent transition-colors">
            AUTOMOD
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
        <p className="text-sm text-muted mb-8">Save and share your builds across devices.</p>

        <LoginForm />

        <p className="text-center text-sm text-muted mt-6">
          <Link href="/build" className="text-accent hover:underline">
            Continue without signing in →
          </Link>
        </p>
      </div>
    </div>
  );
}
