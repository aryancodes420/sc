import { createClient } from '@/lib/supabase/server';
import RunsClient from './RunsClient';

export const revalidate = 60;

export default async function RunsPage() {
  const supabase = createClient();
  const { data: runs } = await supabase
    .from('runs')
    .select('id, started_at, completed_at, posts_ingested, clusters_found, ideas_generated, status, error, metadata')
    .order('started_at', { ascending: false })
    .limit(30);

  return <RunsClient runs={runs ?? []} />;
}
