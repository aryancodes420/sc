/**
 * workers/producthunt.ts — Stage 1e: Product Hunt Ingestion
 * Uses Product Hunt GraphQL API v2 with client credentials OAuth.
 * Fetches posts from last 24h sorted by votes + top comments per post.
 * Comments are the primary complaint signal — post descriptions are secondary.
 *
 * Env vars required:
 *   PRODUCT_HUNT_CLIENT_ID     — from producthunt.com/v2/oauth/applications
 *   PRODUCT_HUNT_CLIENT_SECRET — from producthunt.com/v2/oauth/applications
 *
 * Standalone: npx tsx workers/producthunt.ts
 */

import { createServiceClient } from '@/lib/supabase/server';
import { RawPostInsertSchema, type RawPostInsert } from '@/lib/types';
import { sleep } from '@/lib/utils';

const PH_TOKEN_URL   = 'https://api.producthunt.com/v2/oauth/token';
const PH_GQL_URL     = 'https://api.producthunt.com/v2/api/graphql';
const LOOKBACK_HOURS = 24;
const MIN_VOTES      = 5;   // ignore very low traction posts
const COMMENTS_PER_POST = 20;
const UPSERT_CHUNK   = 500;
const DELAY_MS       = 500; // PH free tier is generous, 500ms is safe

// Credentials read from PRODUCT_HUNT_CLIENT_ID and PRODUCT_HUNT_CLIENT_SECRET env vars

interface PHToken { access_token: string; expires_in: number }

interface PHComment {
  id: string;
  body: string;
  votesCount: number;
  createdAt: string;
  user: { name: string } | null;
}

interface PHPost {
  id: string;
  name: string;
  tagline: string;
  description: string | null;
  votesCount: number;
  commentsCount: number;
  createdAt: string;
  url: string;
  comments: { edges: Array<{ node: PHComment }> };
}

interface GQLResponse {
  data?: {
    posts?: {
      edges: Array<{ node: PHPost }>;
      pageInfo: { hasNextPage: boolean; endCursor: string };
    };
  };
  errors?: Array<{ message: string }>;
}

// ── OAuth: client credentials flow ───────────────────────────────
async function getAccessToken(): Promise<string> {
  const clientId     = process.env.PRODUCT_HUNT_CLIENT_ID!;
  const clientSecret = process.env.PRODUCT_HUNT_CLIENT_SECRET!;

  if (!clientId || !clientSecret) {
    throw new Error('PRODUCT_HUNT_CLIENT_ID or PRODUCT_HUNT_CLIENT_SECRET not set');
  }

  const res = await fetch(PH_TOKEN_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id:     clientId,
      client_secret: clientSecret,
      grant_type:    'client_credentials',
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`PH token error ${res.status}: ${txt}`);
  }

  const data = await res.json() as PHToken;
  return data.access_token;
}

// ── GraphQL query ─────────────────────────────────────────────────
const POSTS_QUERY = `
  query FetchPosts($cursor: String, $postedAfter: DateTime) {
    posts(order: VOTES, after: $cursor, first: 20, postedAfter: $postedAfter) {
      edges {
        node {
          id
          name
          tagline
          description
          votesCount
          commentsCount
          createdAt
          url
          comments(first: ${COMMENTS_PER_POST}, order: VOTES) {
            edges {
              node {
                id
                body
                votesCount
                createdAt
                user { name }
              }
            }
          }
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

async function gqlFetch(
  token: string,
  variables: Record<string, unknown>
): Promise<GQLResponse> {
  const res = await fetch(PH_GQL_URL, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      Accept:          'application/json',
      Authorization:   `Bearer ${token}`,
    },
    body: JSON.stringify({ query: POSTS_QUERY, variables }),
  });

  if (!res.ok) throw new Error(`PH GQL HTTP ${res.status}`);
  return res.json() as Promise<GQLResponse>;
}

// ── Conversion helpers ────────────────────────────────────────────
function postToInsert(
  post: PHPost,
  runId: string | null
): RawPostInsert | null {
  const text = [post.tagline, post.description].filter(Boolean).join('\n\n').trim();
  if (text.length < 20) return null;

  return RawPostInsertSchema.parse({
    source:     'product_hunt',
    source_id:  `ph_post_${post.id}`,
    author:     null,
    title:      post.name,
    text,
    created_at: post.createdAt,
    url:        post.url,
    engagement_json: {
      votes:         post.votesCount,
      comments:      post.commentsCount,
      source:        'product_hunt',
      content_type:  'post',
    },
    run_id: runId,
  });
}

function commentToInsert(
  comment: PHComment,
  post: PHPost,
  runId: string | null
): RawPostInsert | null {
  const text = comment.body.trim();
  if (text.length < 20) return null;

  return RawPostInsertSchema.parse({
    source:     'product_hunt',
    source_id:  `ph_comment_${comment.id}`,
    author:     comment.user?.name ?? null,
    title:      null,
    text,
    created_at: comment.createdAt,
    url:        post.url,
    engagement_json: {
      votes:         comment.votesCount,
      post_name:     post.name,
      post_id:       post.id,
      source:        'product_hunt',
      content_type:  'comment',
    },
    run_id: runId,
  });
}

async function upsert(rows: RawPostInsert[]): Promise<number> {
  if (rows.length === 0) return 0;
  const supabase = createServiceClient();
  let inserted = 0;
  for (let i = 0; i < rows.length; i += UPSERT_CHUNK) {
    const batch = rows.slice(i, i + UPSERT_CHUNK);
    const { error, count } = await supabase
      .from('raw_posts')
      .upsert(batch, { onConflict: 'source,source_id', ignoreDuplicates: true, count: 'exact' });
    if (error) throw new Error(`Supabase upsert: ${error.message}`);
    inserted += count ?? 0;
  }
  return inserted;
}

// ── Main ──────────────────────────────────────────────────────────
export interface ProductHuntResult {
  postsIngested: number;
  phPostsScanned: number;
  phCommentsScanned: number;
  errors: string[];
  durationMs: number;
}

export async function runProductHuntIngestion(
  runId: string | null = null
): Promise<ProductHuntResult> {
  const t0           = Date.now();
  const errors:      string[] = [];
  const allRows:     RawPostInsert[] = [];
  const cutoff       = new Date(Date.now() - LOOKBACK_HOURS * 3_600_000).toISOString();
  let phPostsScanned = 0;
  let phCommentsScanned = 0;

  console.log('[producthunt] Fetching posts from last 24h');

  let token: string;
  try {
    token = await getAccessToken();
    console.log('[producthunt] OAuth token acquired');
  } catch (err) {
    const msg = (err as Error).message;
    console.error('[producthunt] Auth failed:', msg);
    return { postsIngested: 0, phPostsScanned: 0, phCommentsScanned: 0, errors: [msg], durationMs: Date.now() - t0 };
  }

  let cursor: string | null = null;
  let page = 0;
  const MAX_PAGES = 5; // 5 × 20 = 100 posts max

  while (page < MAX_PAGES) {
    try {
      const vars: Record<string, unknown> = { postedAfter: cutoff };
      if (cursor) vars.cursor = cursor;

      const gql = await gqlFetch(token, vars);

      if (gql.errors?.length) {
        errors.push(gql.errors.map(e => e.message).join('; '));
        break;
      }

      const pageData = gql.data?.posts;
      if (!pageData) break;

      const posts = pageData.edges.map(e => e.node);
      if (posts.length === 0) break;

      for (const post of posts) {
        if (post.votesCount < MIN_VOTES) continue;
        phPostsScanned++;

        // Ingest the post itself
        const postRow = postToInsert(post, runId);
        if (postRow) allRows.push(postRow);

        // Ingest each comment
        for (const edge of post.comments.edges) {
          phCommentsScanned++;
          const commentRow = commentToInsert(edge.node, post, runId);
          if (commentRow) allRows.push(commentRow);
        }
      }

      console.log(`  [producthunt] Page ${page + 1}: ${posts.length} posts, ${allRows.length} rows so far`);

      if (!pageData.pageInfo.hasNextPage) break;
      cursor = pageData.pageInfo.endCursor;
      page++;
      await sleep(DELAY_MS);
    } catch (err) {
      const msg = (err as Error).message;
      errors.push(`Page ${page}: ${msg}`);
      console.error('[producthunt] Error:', msg);
      break;
    }
  }

  const inserted = await upsert(allRows);
  console.log(`[producthunt] Done: ${inserted} new rows | ${phPostsScanned} posts + ${phCommentsScanned} comments scanned`);

  return {
    postsIngested:     inserted,
    phPostsScanned,
    phCommentsScanned,
    errors,
    durationMs: Date.now() - t0,
  };
}

if (require.main === module) {
  runProductHuntIngestion().then(r => {
    console.log(`\nDone: ${r.postsIngested} posts ingested, ${r.durationMs}ms`);
    if (r.errors.length) console.error('Errors:', r.errors);
    process.exit(r.errors.length ? 1 : 0);
  });
}
