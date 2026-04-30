import crypto from 'crypto';

export function sha256hex(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

export function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

export async function fetchWithRetry(
  url: string,
  init: RequestInit,
  maxRetries = 3
): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const res = await fetch(url, init);
    if (res.status === 429) {
      const wait = parseInt(res.headers.get('Retry-After') ?? '60', 10) * 1000;
      console.warn(`[retry] 429 on ${url} — waiting ${wait}ms`);
      await sleep(wait);
      continue;
    }
    return res;
  }
  throw new Error(`fetchWithRetry exhausted after ${maxRetries} attempts: ${url}`);
}

/** Parse LLM response — strips fences, extracts first JSON object/array */
export function parseLLMJson<T>(text: string): T {
  let clean = text.replace(/```json\n?|```\n?/g, '').trim();
  // Find the first { or [
  const objStart = clean.indexOf('{');
  const arrStart = clean.indexOf('[');
  if (objStart === -1 && arrStart === -1) {
    throw new Error(`No JSON found in LLM response: ${clean.slice(0, 120)}`);
  }
  const start = objStart === -1 ? arrStart : arrStart === -1 ? objStart : Math.min(objStart, arrStart);
  clean = clean.slice(start);
  // Find matching close from the end
  const closeChar = clean[0] === '{' ? '}' : ']';
  const lastClose = clean.lastIndexOf(closeChar);
  if (lastClose === -1) throw new Error(`Unclosed JSON in LLM response`);
  clean = clean.slice(0, lastClose + 1);
  return JSON.parse(clean) as T;
}

/** Chunk array into groups of n */
export function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

/** Normalise a value into [0,1] given observed max */
export function normalise(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.min(value / max, 1);
}

/** Composite score formula from spec */
export function compositeScore(dims: {
  frequency: number;
  momentum: number;
  intensity: number;
  monetisation: number;
  mvp_ease: number;
}): number {
  return (
    0.30 * dims.frequency +
    0.25 * dims.momentum +
    0.20 * dims.intensity +
    0.15 * dims.monetisation +
    0.10 * dims.mvp_ease
  );
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// ── LLM cost tracking ──────────────────────────────────────────────
// Pricing as of 2025-04 (per 1M tokens)
const PRICE: Record<string, { input: number; output: number }> = {
  'claude-sonnet-4-5-20250514': { input: 3.00,  output: 15.00 },
  'claude-opus-4-6':            { input: 15.00, output: 75.00 },
};

export interface LLMUsageSnapshot {
  inputTokens:  number;
  outputTokens: number;
  costUsd:      number;
  byModel:      Record<string, { inputTokens: number; outputTokens: number; costUsd: number }>;
}

/** Mutable accumulator — pass one instance through a pipeline run, read at the end */
export class LLMCostAccumulator {
  private _inputTokens  = 0;
  private _outputTokens = 0;
  private _byModel: Record<string, { inputTokens: number; outputTokens: number; costUsd: number }> = {};

  add(model: string, inputTokens: number, outputTokens: number): void {
    this._inputTokens  += inputTokens;
    this._outputTokens += outputTokens;
    if (!this._byModel[model]) {
      this._byModel[model] = { inputTokens: 0, outputTokens: 0, costUsd: 0 };
    }
    this._byModel[model].inputTokens  += inputTokens;
    this._byModel[model].outputTokens += outputTokens;
    const price = PRICE[model] ?? { input: 3.00, output: 15.00 };
    const cost  = (inputTokens / 1_000_000) * price.input + (outputTokens / 1_000_000) * price.output;
    this._byModel[model].costUsd += cost;
  }

  totalCostUsd(): number {
    return Object.values(this._byModel).reduce((s, m) => s + m.costUsd, 0);
  }

  snapshot(): LLMUsageSnapshot {
    return {
      inputTokens:  this._inputTokens,
      outputTokens: this._outputTokens,
      costUsd:      this.totalCostUsd(),
      byModel:      JSON.parse(JSON.stringify(this._byModel)),
    };
  }
}
