/**
 * workers/embeddings.ts — Stage 3: Embedding Generation
 * Generates voyage-3 embeddings for complaint posts, caches in Redis,
 * writes back to raw_posts.embedding.
 *
 * Fix #10: DB writes parallelised in chunks of 10 (was sequential row-by-row).
 * Fix #12: Checks update response for errors; validates embedding dimension before write.
 *
 * Standalone: npx tsx workers/embeddings.ts
 */

import { Redis } from '@upstash/redis';
import { createServiceClient } from '@/lib/supabase/server';
import { sha256hex, sleep, chunk } from '@/lib/utils';

// VOYAGE_API_KEY: from dash.voyageai.com
// OPENAI_API_KEY: fallback if Voyage unavailable
const VOYAGE_MODEL  = 'voyage-3';
const OPENAI_MODEL  = 'text-embedding-3-small';
const VOYAGE_URL    = 'https://api.voyageai.com/v1/embeddings';
const OPENAI_URL    = 'https://api.openai.com/v1/embeddings';
const BATCH_SIZE    = 128;
const CACHE_PREFIX  = 'emb:v3:';
const EMBEDDING_DIM = 1024;
const DB_PARALLEL   = 10; // concurrent DB writes

async function getEmbeddingsCached(
  texts: string[],
  redis: Redis,
  useOpenAI = false
): Promise<number[][]> {
  const results: (number[] | null)[] = new Array(texts.length).fill(null);
  const missing: { idx: number; text: string }[] = [];

  // Batch cache check — single round trip via mget
  const cacheKeys = texts.map(t => `${CACHE_PREFIX}${sha256hex(t)}`);
  const cached = await redis.mget<(number[] | null)[]>(...cacheKeys);
  for (let i = 0; i < texts.length; i++) {
    if (cached[i]) {
      results[i] = cached[i];
    } else {
      missing.push({ idx: i, text: texts[i] });
    }
  }

  if (missing.length === 0) return results as number[][];

  console.log(`  [embeddings] cache miss: ${missing.length}/${texts.length}`);

  const missingBatches = chunk(missing, BATCH_SIZE);
  for (const batch of missingBatches) {
    const batchTexts = batch.map(m => m.text);
    let embeddings: number[][];

    if (!useOpenAI && process.env.VOYAGE_API_KEY) {
      embeddings = await callVoyage(batchTexts);
    } else if (process.env.OPENAI_API_KEY) {
      embeddings = await callOpenAI(batchTexts);
    } else {
      throw new Error('No embedding provider available. Set VOYAGE_API_KEY or OPENAI_API_KEY.');
    }

    for (let j = 0; j < batch.length; j++) {
      results[batch[j].idx] = embeddings[j];
    }
    // Batch cache writes via pipeline
    const pipe = redis.pipeline();
    for (let j = 0; j < batch.length; j++) {
      const key = `${CACHE_PREFIX}${sha256hex(batch[j].text)}`;
      pipe.set(key, embeddings[j]); // permanent — no TTL
    }
    await pipe.exec();

    await sleep(200);
  }

  return results as number[][];
}

async function callVoyage(texts: string[], retries = 0): Promise<number[][]> {
  const res = await fetch(VOYAGE_URL, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${process.env.VOYAGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: VOYAGE_MODEL, input: texts }),
  });

  if (res.status === 429) {
    if (retries >= 3) throw new Error('Voyage API rate limited after 3 retries');
    const wait = parseInt(res.headers.get('Retry-After') ?? '60', 10) * 1000;
    console.warn(`  [voyage] Rate limited — waiting ${wait}ms (retry ${retries + 1}/3)`);
    await sleep(wait);
    return callVoyage(texts, retries + 1);
  }

  if (!res.ok) throw new Error(`Voyage API error ${res.status}: ${await res.text()}`);

  const json = await res.json() as { data: Array<{ embedding: number[] }> };
  return json.data.map(d => d.embedding);
}

async function callOpenAI(texts: string[]): Promise<number[][]> {
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: OPENAI_MODEL, input: texts, dimensions: EMBEDDING_DIM }),
  });

  if (!res.ok) throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`);
  const json = await res.json() as { data: Array<{ embedding: number[] }> };
  return json.data.map(d => d.embedding);
}

export interface EmbeddingsResult {
  processed: number;
  cached: number;
  writeErrors: number;
  durationMs: number;
}

export async function runEmbeddings(runId?: string | null): Promise<EmbeddingsResult> {
  const t0       = Date.now();
  const supabase = createServiceClient();
  const redis    = new Redis({
    url:   process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  let query = supabase
    .from('raw_posts')
    .select('id, text')
    .eq('is_complaint', true)
    .is('embedding', null);
  if (runId) query = query.eq('run_id', runId);

  const { data: posts, error } = await query;
  if (error) throw new Error(`Fetch posts: ${error.message}`);
  if (!posts || posts.length === 0) {
    console.log('[embeddings] No posts without embeddings.');
    return { processed: 0, cached: 0, writeErrors: 0, durationMs: Date.now() - t0 };
  }

  console.log(`[embeddings] ${posts.length} posts to embed`);

  const batches     = chunk(posts, BATCH_SIZE);
  let processed     = 0;
  let writeErrors   = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch      = batches[i];
    const texts      = batch.map(p => p.text);
    const embeddings = await getEmbeddingsCached(texts, redis);

    // ── Fix #10+#12: Parallel writes with error checking ─────────
    const writeChunks = chunk(
      batch.map((post, j) => ({ post, embedding: embeddings[j] })),
      DB_PARALLEL
    );

    for (const writeChunk of writeChunks) {
      const results = await Promise.all(writeChunk.map(({ post, embedding }) => {
        // Fix #12: Validate dimension before write
        if (!embedding || embedding.length !== EMBEDDING_DIM) {
          console.error(`  [embeddings] Dimension mismatch for post ${post.id}: got ${embedding?.length ?? 0}, expected ${EMBEDDING_DIM}`);
          return { error: { message: 'dimension_mismatch' } };
        }

        // pgvector text literal: [0.1,0.2,...] — NOT JSON.stringify which double-escapes
        return supabase
          .from('raw_posts')
          .update({ embedding: `[${embedding.join(',')}]` })
          .eq('id', post.id);
      }));

      // Fix #12: Check write errors
      for (const r of results) {
        if (r.error) {
          writeErrors++;
          console.error(`  [embeddings] DB write error: ${r.error.message}`);
        }
      }
    }

    processed += batch.length;
    console.log(`  batch ${i + 1}/${batches.length} — ${processed}/${posts.length} done`);
  }

  if (writeErrors > 0) {
    console.warn(`[embeddings] ${writeErrors} write errors out of ${processed} posts`);
  }

  return { processed, cached: 0, writeErrors, durationMs: Date.now() - t0 };
}

if (require.main === module) {
  runEmbeddings().then(r => {
    console.log(`\nDone: ${r.processed} posts embedded, ${r.writeErrors} write errors, ${r.durationMs}ms`);
    process.exit(r.writeErrors > 0 ? 1 : 0);
  }).catch(e => { console.error(e); process.exit(1); });
}
