-- ================================================================
-- MIGRATION: Add bookmarks table
-- Run in Supabase SQL Editor ONCE.
-- ================================================================

CREATE TABLE bookmarks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id    UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(idea_id)
);

CREATE INDEX idx_bookmarks_idea_id    ON bookmarks(idea_id);
CREATE INDEX idx_bookmarks_created_at ON bookmarks(created_at DESC);

-- RLS: authenticated users can read + write their own bookmarks.
-- Since this is a single-operator app, all authenticated users share the
-- same bookmark list (no user_id column needed for now).
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookmarks_select" ON bookmarks
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "bookmarks_insert" ON bookmarks
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "bookmarks_delete" ON bookmarks
  FOR DELETE USING (auth.role() = 'authenticated');
