import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils/slug';
import catalog from '@/lib/catalog/parts.json';
import type { Part, BuildSnapshot } from '@/lib/types';

export async function POST(req: NextRequest) {
  const { vehicle_id, name, selected_part_ids, user_id } = await req.json();

  if (!vehicle_id || !name || !Array.isArray(selected_part_ids)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const parts = catalog.parts as Part[];
  const selectedParts = selected_part_ids
    .map((id: string) => parts.find(p => p.id === id))
    .filter(Boolean) as Part[];

  const snapshot: BuildSnapshot = {
    parts: selectedParts.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price_gbp: p.price_gbp,
      thumbnail_url: p.thumbnail_url,
      section: p.section,
    })),
    total_gbp: selectedParts.reduce((sum, p) => sum + p.price_gbp, 0),
  };

  const supabase = createClient();

  for (let attempt = 0; attempt < 3; attempt++) {
    const slug = generateSlug(name);
    const { data, error } = await supabase
      .from('am_builds')
      .insert({
        slug,
        user_id: user_id ?? null,
        vehicle_id,
        name,
        selected_parts: selected_part_ids,
        snapshot_json: snapshot,
        is_public: true,
      })
      .select('slug')
      .single();

    if (!error && data) {
      return NextResponse.json({ slug: data.slug });
    }
    if (error?.code !== '23505') {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Failed to generate unique slug' }, { status: 500 });
}

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get('user_id');
  if (!user_id) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });

  const supabase = createClient();
  const { data, error } = await supabase
    .from('am_builds')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
