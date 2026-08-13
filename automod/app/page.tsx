import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_#F97316] animate-pulse" />
          <span className="font-mono text-xs text-muted uppercase tracking-[0.18em]">AutoMod</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Build your
          <span className="text-accent"> Astra.</span>
        </h1>
        <p className="text-muted text-lg mb-10 leading-relaxed">
          Visualise modifications on your 2011 Vauxhall Astra J in 3D.<br />
          Pick parts, see prices, share your build.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/build"
            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors text-center"
          >
            Start Building →
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-surface border border-border text-muted font-semibold rounded-lg hover:text-white hover:border-muted transition-colors text-center"
          >
            Sign in to save builds
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[
            { label: 'Mod categories', value: '8' },
            { label: 'Curated parts', value: '20+' },
            { label: 'Shareable builds', value: '∞' },
          ].map(s => (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-accent mb-1">{s.value}</div>
              <div className="font-mono text-xs text-muted uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
