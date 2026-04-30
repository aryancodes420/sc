import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ClusterClient from './ClusterClient';

export const revalidate = 300;

export default async function ClusterPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: cluster }, { data: posts }] = await Promise.all([
    supabase.from('clusters').select('*').eq('id', params.id).single(),
    supabase
      .from('raw_posts')
      .select('id, text, url, source, engagement_json, created_at, author')
      .eq('cluster_id', params.id)
      .eq('is_complaint', true)
      .order('engagement_json->score', { ascending: false })
      .limit(50),
  ]);

  if (!cluster) notFound();

  return <ClusterClient cluster={cluster} posts={posts ?? []} />;
}
