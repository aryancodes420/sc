/**
 * lib/types.ts
 * All Zod schemas for every LLM-bound and DB-bound structure.
 */
import { z } from 'zod';

// ── Reddit API ─────────────────────────────────────────────────────
export const RedditTokenResponseSchema = z.object({
  access_token: z.string(),
  token_type:   z.string(),
  expires_in:   z.number(),
  scope:        z.string(),
});
export type RedditTokenResponse = z.infer<typeof RedditTokenResponseSchema>;

export const RedditPostDataSchema = z.object({
  id:              z.string(),
  author:          z.string().nullable().default('[deleted]'),
  title:           z.string(),
  selftext:        z.string().default(''),
  url:             z.string(),
  permalink:       z.string(),
  subreddit:       z.string(),
  score:           z.number(),
  num_comments:    z.number(),
  upvote_ratio:    z.number().default(0),
  created_utc:     z.number(),
  is_self:         z.boolean(),
  stickied:        z.boolean().default(false),
  over_18:         z.boolean().default(false),
  link_flair_text: z.string().nullable().optional(),
});
export type RedditPostData = z.infer<typeof RedditPostDataSchema>;

export const RedditListingSchema = z.object({
  kind: z.literal('Listing'),
  data: z.object({
    after:    z.string().nullable(),
    children: z.array(z.object({
      kind: z.literal('t3'),
      data: RedditPostDataSchema,
    })),
  }),
});

// ── DB inserts ─────────────────────────────────────────────────────
export const RawPostInsertSchema = z.object({
  source:          z.enum(['reddit','product_hunt','app_store','play_store','hackernews']),
  source_id:       z.string().max(256),
  author:          z.string().nullable(),
  title:           z.string().nullable(),
  text:            z.string().min(1),
  created_at:      z.string().datetime(),
  url:             z.string().nullable(),
  engagement_json: z.record(z.unknown()),
  run_id:          z.string().uuid().nullable(),
});
export type RawPostInsert = z.infer<typeof RawPostInsertSchema>;

// ── Stage 2: Complaint classifier ─────────────────────────────────
export const ComplaintTypeSchema = z.enum([
  'missing_feature','broken_workflow','pricing_frustration',
  'poor_ux','data_loss','integration_failure',
  'slow_performance','poor_support','other',
]);
export type ComplaintType = z.infer<typeof ComplaintTypeSchema>;

export const ComplaintClassificationSchema = z.object({
  post_index:      z.number().int().min(0),
  is_complaint:    z.boolean(),
  complaint_score: z.number().min(0).max(1),
  complaint_type:  ComplaintTypeSchema.nullable(),
  reasoning:       z.string().max(200),
});

export const ComplaintBatchOutputSchema = z.object({
  classifications: z.array(ComplaintClassificationSchema),
});
export type ComplaintBatchOutput = z.infer<typeof ComplaintBatchOutputSchema>;

// ── Stage 4: Cluster labelling ─────────────────────────────────────
export const ClusterLabelSchema = z.object({
  cluster_index: z.number().int(),
  label:         z.string().max(100),
  category:      z.enum(['B2C','B2B']),
  industry:      z.string().max(100),
  problem_type:  z.string().max(100),
  reasoning:     z.string().max(300),
});

export const ClusterLabelBatchOutputSchema = z.object({
  labels: z.array(ClusterLabelSchema),
});
export type ClusterLabelBatchOutput = z.infer<typeof ClusterLabelBatchOutputSchema>;

// ── Stage 5: Scoring ───────────────────────────────────────────────
export const ClusterLLMScoresSchema = z.object({
  cluster_index:          z.number().int().min(0),
  intensity:              z.number().min(0).max(1),
  monetisation:           z.number().min(0).max(1),
  mvp_ease:               z.number().min(0).max(1),
  intensity_reasoning:    z.string().max(200),
  monetisation_reasoning: z.string().max(200),
  mvp_ease_reasoning:     z.string().max(200),
});

export const ScoringBatchOutputSchema = z.object({
  scores: z.array(ClusterLLMScoresSchema),
});
export type ScoringBatchOutput = z.infer<typeof ScoringBatchOutputSchema>;

// ── Stage 6+7: Final idea output ───────────────────────────────────
export const EvidenceSchema = z.object({
  quote:  z.string().max(500),
  source: z.string().max(100),
  url:    z.string().max(500),  // relaxed — LLM may produce non-standard or relative URLs
});

export const ScoreBreakdownSchema = z.object({
  frequency:    z.number().min(0).max(1),
  momentum:     z.number().min(0).max(1),
  intensity:    z.number().min(0).max(1),
  monetisation: z.number().min(0).max(1),
  mvp_ease:     z.number().min(0).max(1),
  composite:    z.number().min(0).max(1),
});

export const IdeaOutputSchema = z.object({
  rank:               z.number().int().min(1).max(10),
  category:           z.enum(['B2C','B2B']),
  problem:            z.string().min(20).max(500),
  audience:           z.string().min(10).max(200),
  evidence:           z.array(EvidenceSchema).length(3),
  market_gap:         z.string().min(20).max(500),
  mvp:                z.string().min(20).max(1000),
  monetisation_model: z.enum(['subscription','saas','marketplace','ads','usage']),
  difficulty:         z.enum(['low','medium','high']),
  time_to_mvp_days:   z.number().int().min(1).max(180),
  score_breakdown:    ScoreBreakdownSchema,
  build_prompt:       z.string().min(200),
});
export type IdeaOutput = z.infer<typeof IdeaOutputSchema>;

// Fix #7: Batch output schema for batched Opus synthesis calls
export const IdeaBatchOutputSchema = z.object({
  ideas: z.array(IdeaOutputSchema),
});
export type IdeaBatchOutput = z.infer<typeof IdeaBatchOutputSchema>;
