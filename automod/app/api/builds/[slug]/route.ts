import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('am_builds')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Build not found' }, { status: 404 });
  return NextResponse.json(data);
}
