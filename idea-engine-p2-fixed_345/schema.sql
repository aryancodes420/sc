-- ================================================================
-- IDEA ENGINE — Full Schema
-- Paste into Supabase SQL Editor and click Run
-- ================================================================

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- RUNS
-- ================================================================
CREATE TABLE runs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at    TIMESTAMPTZ,
  posts_ingested  INTEGER NOT NULL DEFAULT 0,
  clusters_found  INTEGER NOT NULL DEFAULT 0,
  ideas_generated INTEGER NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'running'
                  CHECK (status IN ('running','completed','failed')),
  error           TEXT,
  metadata        JSONB NOT NULL DEFAULT '{}'
);

-- ================================================================
-- RAW_POSTS
-- ================================================================
CREATE TABLE raw_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source          TEXT NOT NULL CHECK (source IN ('reddit','product_hunt','app_store','play_store','hackernews')),
  source_id       TEXT NOT NULL,
  author          TEXT,
  title           TEXT,
  text            TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL,
  url             TEXT,
  engagement_json JSONB NOT NULL DEFAULT '{}',
  ingested_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  run_id          UUID REFERENCES runs(id) ON DELETE SET NULL,
  is_complaint    BOOLEAN,
  complaint_score FLOAT CHECK (complaint_score BETWEEN 0 AND 1),
  embedding       vector(1024),
  cluster_id      UUID,
  UNIQUE (source, source_id)
);

CREATE INDEX idx_raw_posts_created_at ON raw_posts(created_at DESC);
CREATE INDEX idx_raw_posts_run_id     ON raw_posts(run_id);
CREATE INDEX idx_raw_posts_complaint  ON raw_posts(is_complaint) WHERE is_complaint = true;
CREATE INDEX idx_raw_posts_cluster    ON raw_posts(cluster_id);
CREATE INDEX idx_raw_posts_embedding_null ON raw_posts(id) WHERE embedding IS NULL AND is_complaint = true;

-- ================================================================
-- CLUSTERS
-- ================================================================
CREATE TABLE clusters (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label              TEXT NOT NULL,
  category           TEXT NOT NULL CHECK (category IN ('B2C','B2B')),
  industry           TEXT,
  problem_type       TEXT,
  centroid_embedding vector(1024),
  post_count         INTEGER NOT NULL DEFAULT 0,
  first_seen_date    DATE NOT NULL DEFAULT CURRENT_DATE,
  last_seen_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_clusters_category ON clusters(category);
CREATE INDEX idx_clusters_industry  ON clusters(industry);

ALTER TABLE raw_posts
  ADD CONSTRAINT fk_raw_posts_cluster
  FOREIGN KEY (cluster_id) REFERENCES clusters(id) ON DELETE SET NULL;

-- ================================================================
-- CLUSTER_POSTS
-- ================================================================
CREATE TABLE cluster_posts (
  cluster_id UUID NOT NULL REFERENCES clusters(id) ON DELETE CASCADE,
  post_id    UUID NOT NULL REFERENCES raw_posts(id) ON DELETE CASCADE,
  similarity FLOAT NOT NULL CHECK (similarity BETWEEN 0 AND 1),
  PRIMARY KEY (cluster_id, post_id)
);

CREATE INDEX idx_cluster_posts_post       ON cluster_posts(post_id);
CREATE INDEX idx_cluster_posts_similarity ON cluster_posts(cluster_id, similarity DESC);

-- ================================================================
-- DAILY_SCORES
-- ================================================================
CREATE TABLE daily_scores (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id    UUID NOT NULL REFERENCES clusters(id) ON DELETE CASCADE,
  date          DATE NOT NULL DEFAULT CURRENT_DATE,
  posts_7d      INTEGER NOT NULL DEFAULT 0,
  count_last_3d INTEGER NOT NULL DEFAULT 0,
  count_prev_3d INTEGER NOT NULL DEFAULT 0,
  frequency     FLOAT NOT NULL DEFAULT 0,
  momentum      FLOAT NOT NULL DEFAULT 0,
  intensity     FLOAT NOT NULL DEFAULT 0,
  monetisation  FLOAT NOT NULL DEFAULT 0,
  mvp_ease      FLOAT NOT NULL DEFAULT 0,
  composite     FLOAT NOT NULL DEFAULT 0,
  sample_post_ids UUID[] NOT NULL DEFAULT '{}',
  llm_notes     TEXT,
  UNIQUE (cluster_id, date)
);

CREATE INDEX idx_daily_scores_date      ON daily_scores(date DESC);
CREATE INDEX idx_daily_scores_composite ON daily_scores(date DESC, composite DESC);

-- ================================================================
-- IDEAS
-- ================================================================
CREATE TABLE ideas (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id         UUID NOT NULL REFERENCES clusters(id) ON DELETE CASCADE,
  run_id             UUID REFERENCES runs(id) ON DELETE SET NULL,
  date               DATE NOT NULL DEFAULT CURRENT_DATE,
  rank               INTEGER NOT NULL CHECK (rank BETWEEN 1 AND 10),
  category           TEXT NOT NULL CHECK (category IN ('B2C','B2B')),
  problem            TEXT NOT NULL,
  audience           TEXT NOT NULL,
  evidence_json      JSONB NOT NULL DEFAULT '[]',
  market_gap         TEXT NOT NULL,
  mvp                TEXT NOT NULL,
  monetisation_model TEXT NOT NULL CHECK (monetisation_model IN ('subscription','saas','marketplace','ads','usage')),
  difficulty         TEXT NOT NULL CHECK (difficulty IN ('low','medium','high')),
  time_to_mvp_days   INTEGER NOT NULL,
  score_breakdown    JSONB NOT NULL DEFAULT '{}',
  build_prompt       TEXT NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (date, rank)
);

CREATE INDEX idx_ideas_date     ON ideas(date DESC);
CREATE INDEX idx_ideas_category ON ideas(category);
CREATE INDEX idx_ideas_rank     ON ideas(date DESC, rank ASC);

-- ================================================================
-- RLS
-- ================================================================
ALTER TABLE runs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_posts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE clusters      ENABLE ROW LEVEL SECURITY;
ALTER TABLE cluster_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_scores  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas         ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth_read_runs"          ON runs          FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_raw_posts"     ON raw_posts     FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_clusters"      ON clusters      FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_cluster_posts" ON cluster_posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_daily_scores"  ON daily_scores  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "auth_read_ideas"         ON ideas         FOR SELECT USING (auth.role() = 'authenticated');

-- ================================================================
-- TRIGGER — keep clusters.post_count current
-- ================================================================
CREATE OR REPLACE FUNCTION sync_cluster_stats()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE clusters SET
    post_count     = (SELECT COUNT(*) FROM cluster_posts WHERE cluster_id = NEW.cluster_id),
    last_seen_date = CURRENT_DATE
  WHERE id = NEW.cluster_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_sync_cluster_stats
  AFTER INSERT ON cluster_posts
  FOR EACH ROW EXECUTE FUNCTION sync_cluster_stats();
