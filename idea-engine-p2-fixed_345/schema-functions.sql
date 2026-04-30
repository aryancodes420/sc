-- ================================================================
-- IDEA ENGINE — SQL Functions
-- Run AFTER schema.sql in Supabase SQL Editor
-- ================================================================

-- Nearest cluster by cosine distance (used by clustering worker)
CREATE OR REPLACE FUNCTION nearest_cluster(
  query_embedding vector(1024),
  match_threshold float,   -- cosine DISTANCE threshold (e.g. 0.25 = similarity 0.75)
  match_count     int
)
RETURNS TABLE (id uuid, distance float)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, (c.centroid_embedding <=> query_embedding)::float AS distance
  FROM clusters c
  WHERE c.centroid_embedding IS NOT NULL
    AND (c.centroid_embedding <=> query_embedding) < match_threshold
  ORDER BY distance ASC
  LIMIT match_count;
END;
$$;

-- Recalculate centroid as mean of all post embeddings in a cluster
CREATE OR REPLACE FUNCTION recalc_centroid(cluster_id uuid)
RETURNS void
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE clusters c
  SET centroid_embedding = (
    SELECT avg(rp.embedding)
    FROM raw_posts rp
    WHERE rp.cluster_id = c.id
      AND rp.embedding IS NOT NULL
  )
  WHERE c.id = cluster_id;
END;
$$;
