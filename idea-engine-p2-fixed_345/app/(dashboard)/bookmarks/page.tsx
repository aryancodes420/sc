import { createClient } from '@/lib/supabase/server';
import BookmarksClient, { type BookmarkIdea } from './BookmarksClient';

export const revalidate = 60;

export default async function BookmarksPage() {
  const supabase = createClient();

  // bookmarks → ideas is a many-to-one FK join.
  // PostgREST returns `ideas` as a single object (not array) per bookmark row.
  const { data } = await supabase
    .from('bookmarks')
    .select(`
      id,
      created_at,
      ideas (
        id, rank, date, category, problem, audience,
        difficulty, time_to_mvp_days, monetisation_model, score_breakdown
      )
    `)
    .order('created_at', { ascending: false });

  // Unwrap the nested object, drop any rows where ideas was null (orphaned bookmark)
  // PostgREST returns many-to-one FK joins as a single object, but the TS client
  // infers an array type. Cast through unknown to satisfy strict mode.
  const ideas: BookmarkIdea[] = (data ?? [])
    .map(b => (b.ideas as unknown) as BookmarkIdea | null)
    .filter((idea): idea is BookmarkIdea => idea !== null);

  return <BookmarksClient ideas={ideas} />;
}
