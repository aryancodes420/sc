import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { formatGBP } from '@/lib/utils/price';
import type { Build } from '@/lib/types';

export default async function BuildsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: builds } = await supabase
    .from('am_builds')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

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
          New Build
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">My Builds</h1>

        {!builds || builds.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏎</div>
            <p className="text-muted mb-6">You haven't saved any builds yet.</p>
            <Link href="/build" className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-orange-500 transition-colors">
              Start your first build
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(builds as Build[]).map((build) => (
              <Link
                key={build.id}
                href={`/builds/${build.slug}`}
                className="bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors group"
              >
                <div className="font-bold text-white group-hover:text-accent transition-colors mb-1 truncate">
                  {build.name}
                </div>
                <div className="text-2xl font-bold text-accent mb-3">
                  {formatGBP(build.snapshot_json?.total_gbp ?? 0)}
                </div>
                <div className="flex flex-wrap gap-1">
                  {(build.snapshot_json?.parts ?? []).slice(0, 3).map((p) => (
                    <span key={p.id} className="text-[10px] font-mono bg-surface-hi border border-border text-muted px-2 py-0.5 rounded-full">
                      {p.brand}
                    </span>
                  ))}
                  {(build.snapshot_json?.parts?.length ?? 0) > 3 && (
                    <span className="text-[10px] font-mono text-muted">
                      +{(build.snapshot_json?.parts?.length ?? 0) - 3} more
                    </span>
                  )}
                </div>
                <div className="font-mono text-[10px] text-muted mt-3 tracking-wider">
                  /builds/{build.slug}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
