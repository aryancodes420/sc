import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatGBP } from '@/lib/utils/price';
import type { Build } from '@/lib/types';

interface Props {
  params: { slug: string };
}

export default async function BuildSharePage({ params }: Props) {
  const supabase = createClient();
  const { data: build } = await supabase
    .from('am_builds')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!build) notFound();

  const b = build as Build;
  const parts = b.snapshot_json?.parts ?? [];
  const total = b.snapshot_json?.total_gbp ?? 0;

  return (
    <div className="min-h-screen bg-bg">
      <header className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <Link href="/" className="font-mono text-sm font-bold text-white tracking-widest hover:text-accent transition-colors">
            AUTOMOD
          </Link>
        </div>
        <Link href="/build" className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-orange-500 transition-colors">
          Build Your Own →
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Shared Build</div>
          <h1 className="text-3xl font-bold text-white">{b.name}</h1>
          <p className="text-muted text-sm mt-1">2011 Vauxhall Astra Turbo 1.4</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-bold text-accent">{formatGBP(total)}</span>
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Estimated total</span>
          </div>

          {parts.length === 0 ? (
            <p className="text-muted text-sm">No parts in this build.</p>
          ) : (
            <ul className="space-y-3">
              {parts.map((part) => (
                <li key={part.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="font-mono text-[10px] text-muted uppercase tracking-wider">{part.brand}</div>
                    <div className="text-sm font-semibold text-white">{part.name}</div>
                    <div className="font-mono text-[10px] text-muted mt-0.5">
                      {part.section.replace(/_/g, ' ')}
                    </div>
                  </div>
                  <div className="text-accent font-bold text-sm">{formatGBP(part.price_gbp)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center">
          <p className="text-muted text-sm mb-4">Want to customise your own Astra?</p>
          <Link
            href="/build"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-orange-500 transition-colors"
          >
            Start Your Build →
          </Link>
        </div>
      </main>
    </div>
  );
}
