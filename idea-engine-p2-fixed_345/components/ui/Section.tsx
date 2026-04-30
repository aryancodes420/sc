// components/ui/Section.tsx
// Titled card container used throughout dashboard detail pages.

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ title, children, className = '' }: SectionProps) {
  return (
    <div className={`bg-surface border border-border rounded-md p-4 mb-3 ${className}`}>
      <div className="text-[9px] text-muted font-mono uppercase tracking-[0.1em] mb-2.5">
        {title}
      </div>
      {children}
    </div>
  );
}
