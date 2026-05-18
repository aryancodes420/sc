import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const [{ data: cluster }, { data: posts }] = await Promise.all([
    supabase.from('clusters').select('*').eq('id', params.id).single(),
    supabase
      .from('raw_posts')
      .select('id, text, url, source, engagement_json, created_at, author')
      .eq('cluster_id', params.id)
      .eq('is_complaint', true)
      .limit(50),
  ]);

  if (!cluster) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const sorted = (posts ?? []).sort((a, b) => {
    const scoreA = (a.engagement_json as Record<string, number> | null)?.score ?? 0;
    const scoreB = (b.engagement_json as Record<string, number> | null)?.score ?? 0;
    return scoreB - scoreA;
  });

  return NextResponse.json({ cluster, posts: sorted });
}
