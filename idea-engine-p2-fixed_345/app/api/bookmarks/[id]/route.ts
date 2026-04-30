/**
 * /api/bookmarks/[id] — Toggle bookmark on an idea
 * POST   /api/bookmarks/[id]  → bookmark idea
 * DELETE /api/bookmarks/[id]  → remove bookmark
 * Both require an authenticated Supabase session.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface Params { params: { id: string } }

async function getAuthClient() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function POST(_req: NextRequest, { params }: Params) {
  const { supabase, user } = await getAuthClient();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Verify idea exists
  const { data: idea } = await supabase
    .from('ideas')
    .select('id')
    .eq('id', params.id)
    .maybeSingle();

  if (!idea) return NextResponse.json({ error: 'Idea not found' }, { status: 404 });

  const { error } = await supabase
    .from('bookmarks')
    .upsert({ idea_id: params.id }, { onConflict: 'idea_id', ignoreDuplicates: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookmarked: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { supabase, user } = await getAuthClient();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('idea_id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookmarked: false });
}
