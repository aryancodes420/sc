import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import IdeaDetailClient from './IdeaDetailClient';

export default async function IdeaDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: idea }, { data: bookmark }] = await Promise.all([
    supabase
      .from('ideas')
      .select('*, clusters(id, label, industry, post_count)')
      .eq('id', params.id)
      .single(),
    supabase
      .from('bookmarks')
      .select('id')
      .eq('idea_id', params.id)
      .maybeSingle(),
  ]);

  if (!idea) notFound();

  return <IdeaDetailClient idea={idea} isBookmarked={!!bookmark} />;
}
