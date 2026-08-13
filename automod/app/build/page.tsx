import dynamic from 'next/dynamic';
import { SectionNav } from '@/components/panels/SectionNav';
import { PartsPanel } from '@/components/panels/PartsPanel';
import { BuildSummary } from '@/components/panels/BuildSummary';
import Link from 'next/link';

// Three.js is not SSR-safe — must load client-side only
const CarViewer = dynamic(
  () => import('@/components/viewer/CarViewer').then((m) => m.CarViewer),
  { ssr: false, loading: () => <ViewerSkeleton /> }
);

function ViewerSkeleton() {
  return (
    <div className="w-full h-full bg-surface rounded-xl flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-xs text-muted">Loading 3D model...</p>
      </div>
    </div>
  );
}

export default function BuildPage() {
  return (
    <div className="flex flex-col h-screen bg-bg overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_#F97316] animate-pulse" />
          <Link href="/" className="font-mono text-sm font-bold text-white tracking-wider hover:text-accent transition-colors">
            AUTOMOD
          </Link>
          <span className="text-border mx-2">|</span>
          <span className="text-sm text-muted">2011 Vauxhall Astra Turbo 1.4</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/builds" className="text-sm text-muted hover:text-white transition-colors font-mono">
            MY BUILDS
          </Link>
          <Link href="/login" className="text-sm text-muted hover:text-accent transition-colors font-mono">
            SIGN IN
          </Link>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        {/* 3D Viewer — center/main */}
        <div className="flex flex-col flex-1 min-h-0 p-3 gap-3">
          {/* Viewer */}
          <div className="flex-1 min-h-0">
            <CarViewer />
          </div>
          {/* Section tabs below viewer */}
          <div className="flex-shrink-0">
            <SectionNav />
          </div>
        </div>

        {/* Right sidebar on desktop, bottom stack on mobile */}
        <div className="flex flex-col lg:flex-row lg:w-[680px] flex-shrink-0 min-h-0 border-t border-border lg:border-t-0 lg:border-l">
          {/* Parts panel */}
          <div className="flex-1 min-h-0 overflow-hidden border-b border-border lg:border-b-0 lg:border-r lg:w-[340px]" style={{ maxHeight: '40vh', minHeight: '220px' }}>
            <div className="h-full overflow-hidden" style={{ maxHeight: 'inherit' }}>
              <PartsPanel />
            </div>
          </div>
          {/* Build summary */}
          <div className="flex-1 min-h-0 overflow-hidden lg:w-[340px]" style={{ maxHeight: '40vh', minHeight: '220px' }}>
            <div className="h-full overflow-hidden" style={{ maxHeight: 'inherit' }}>
              <BuildSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
