// components/ui/Pill.tsx
// Colored tag badge used across idea cards, cluster pages, detail views.

type PillColor = 'green' | 'blue' | 'purple' | 'amber' | 'muted';

interface PillProps {
  children: React.ReactNode;
  color?: PillColor;
}

const colorMap: Record<PillColor, string> = {
  green:  'bg-accent-muted text-accent border-[#065F46]',
  blue:   'bg-[#0C1A2E] text-[#60A5FA] border-[#1D4ED8]',
  purple: 'bg-[#1A0A2E] text-[#A78BFA] border-[#5B21B6]',
  amber:  'bg-[#1C0A00] text-[#F59E0B] border-[#78350F]',
  muted:  'bg-surface-high text-muted border-border',
};

export default function Pill({ children, color = 'muted' }: PillProps) {
  return (
    <span className={`
      inline-block border rounded-[3px] px-[7px] py-[1px]
      text-[10px] font-mono font-semibold tracking-[0.08em] uppercase whitespace-nowrap
      ${colorMap[color]}
    `}>
      {children}
    </span>
  );
}
