// components/ui/ScoreBar.tsx
// Mono number + horizontal filled bar. value is 0–1.

interface ScoreBarProps {
  value: number;
  barWidth?: string; // Tailwind width class e.g. 'w-20'
}

export default function ScoreBar({ value, barWidth = 'w-20' }: ScoreBarProps) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[15px] font-bold text-accent min-w-[32px]">
        {pct}
      </span>
      <div className={`${barWidth} h-[3px] bg-border rounded-sm overflow-hidden`}>
        <div
          className="h-full bg-accent rounded-sm transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
