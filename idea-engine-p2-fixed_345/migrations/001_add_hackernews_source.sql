-- ================================================================
-- MIGRATION: Add 'hackernews' source type
-- Run in Supabase SQL Editor ONCE on existing databases.
-- New databases using schema.sql already include this.
-- ================================================================

ALTER TABLE raw_posts DROP CONSTRAINT raw_posts_source_check;
ALTER TABLE raw_posts ADD CONSTRAINT raw_posts_source_check
  CHECK (source IN ('reddit','product_hunt','app_store','play_store','hackernews'));
