// components/ui/StatusPill.tsx
// Run status badge: completed / failed / running

type Status = 'completed' | 'failed' | 'running' | string;

interface StatusPillProps {
  status: Status;
}

const map: Record<string, string> = {
  completed: 'bg-accent-muted text-accent border-[#065F46]',
  failed:    'bg-[#450A0A] text-danger border-[#7F1D1D]',
  running:   'bg-[#1C0A00] text-[#F59E0B] border-[#78350F]',
};

const labels: Record<string, string> = {
  completed: 'COMPLETED',
  failed:    'FAILED',
  running:   'RUNNING',
};

export default function StatusPill({ status }: StatusPillProps) {
  const cls   = map[status]   ?? 'bg-surface-high text-muted border-border';
  const label = labels[status] ?? status.toUpperCase();
  return (
    <span className={`
      inline-block border rounded-[3px] px-[7px] py-[1px]
      text-[10px] font-mono font-semibold tracking-[0.08em]
      ${cls}
    `}>
      {label}
    </span>
  );
}
