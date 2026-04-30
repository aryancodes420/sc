import { createClient } from '@/lib/supabase/server';
import TodayClient from './TodayClient';

export const revalidate = 300;

// Clamp date string to valid range: no future dates, no more than 90 days back
function clampDate(raw: string | undefined): string {
  const today = new Date().toISOString().slice(0, 10);
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return today;
  if (raw > today) return today;
  const floor = new Date(Date.now() - 90 * 86400_000).toISOString().slice(0, 10);
  if (raw < floor) return floor;
  return raw;
}

function offsetDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00Z'); // noon UTC avoids DST edge
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export default async function TodayPage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const supabase = createClient();
  const dateStr  = clampDate(searchParams.date);
  const today    = new Date().toISOString().slice(0, 10);

  const prevDate = offsetDate(dateStr, -1);
  const nextDate = offsetDate(dateStr,  1);

  // Fetch ideas for requested date
  const { data: ideas } = await supabase
    .from('ideas')
    .select('*')
    .eq('date', dateStr)
    .order('rank', { ascending: true });

  // Check whether adjacent days have ideas (determines arrow visibility)
  const [{ count: prevCount }, { count: nextCount }] = await Promise.all([
    supabase.from('ideas').select('*', { count: 'exact', head: true }).eq('date', prevDate),
    supabase.from('ideas').select('*', { count: 'exact', head: true }).eq('date', nextDate),
  ]);

  const dateLabel = new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <TodayClient
      ideas={ideas ?? []}
      date={dateLabel}
      dateStr={dateStr}
      isToday={dateStr === today}
      prevDate={(prevCount ?? 0) > 0 ? prevDate : null}
      nextDate={dateStr < today && (nextCount ?? 0) > 0 ? nextDate : null}
    />
  );
}
