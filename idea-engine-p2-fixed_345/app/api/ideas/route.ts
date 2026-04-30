import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const date     = searchParams.get('date') ?? new Date().toISOString().slice(0, 10);
  const category = searchParams.get('category'); // B2C | B2B | null

  let query = supabase
    .from('ideas')
    .select('*')
    .eq('date', date)
    .order('rank', { ascending: true });

  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ideas: data ?? [], date });
}
