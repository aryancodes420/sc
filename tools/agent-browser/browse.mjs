#!/usr/bin/env node
/**
 * browse.mjs — working browser access from a Claude Code container.
 *
 * Solves the two traps documented in audit/lessons/L001 and L002:
 *   L001  Chromium cannot open :443 here → route it through tunnel.py, and pin the
 *         sandbox egress-gateway CA by SPKI (TLS verification stays ON).
 *   L002  ?preview_theme_id= is silently dropped → assert Shopify.theme.id and refuse
 *         to return data for the wrong theme.
 *
 * Usage:
 *   python3 tools/agent-browser/tunnel.py 8899 &
 *   node tools/agent-browser/browse.mjs <url> [options]
 *
 * Options:
 *   --theme <id>     Require this Shopify theme id; exit non-zero on mismatch
 *   --shot <path>    Save a full-page screenshot
 *   --mobile         Use a 375x812 viewport instead of 1440x1000
 *   --grep <regex>   Print matching lines of rendered text (repeatable)
 *   --text           Print all rendered body text
 *   --proxy <url>    Tunnel address (default http://127.0.0.1:8899)
 *
 * Exit codes: 0 ok · 2 theme mismatch · 3 navigation/load failure
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import fs from 'fs';

const argv = process.argv.slice(2);
if (!argv[0] || argv[0].startsWith('-')) {
  console.error('usage: browse.mjs <url> [--theme id] [--shot f.png] [--mobile] [--grep re] [--text]');
  process.exit(1);
}
const url = argv[0];
const opt = (n, d = null) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : d; };
const has = (n) => argv.includes(n);
const greps = argv.reduce((a, v, i) => (v === '--grep' ? [...a, argv[i + 1]] : a), []);
const PROXY = opt('--proxy', 'http://127.0.0.1:8899');

/** Derive the SPKI pins from the chain actually presented (L001: they are env-specific). */
function spkiPins(host) {
  const port = PROXY.split(':').pop();
  const chain = execFileSync('bash', ['-c',
    `echo | openssl s_client -connect ${host}:443 -proxy 127.0.0.1:${port} -showcerts 2>/dev/null`
  ], { encoding: 'utf8', timeout: 45000 });
  const certs = chain.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g) || [];
  if (!certs.length) throw new Error('no cert chain via tunnel — is tunnel.py running?');
  return certs.map(c => execFileSync('bash', ['-c',
    `openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64`
  ], { input: c, encoding: 'utf8' }).trim()).join(',');
}

const host = new URL(url).host;
const pins = spkiPins(host);

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors-spki-list=' + pins],
  proxy: { server: PROXY },
});
const ctx = await browser.newContext({
  viewport: has('--mobile') ? { width: 375, height: 812 } : { width: 1440, height: 1000 },
});
const page = await ctx.newPage();

const wantTheme = opt('--theme');
try {
  // L002: the param only SETS a cookie — prime it on the same origin first.
  if (wantTheme) {
    await page.goto(`${new URL(url).origin}/?preview_theme_id=${wantTheme}`, { waitUntil: 'domcontentloaded' });
  }
  const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  const theme = await page.evaluate(() => window.Shopify?.theme ?? null);

  console.log(`status : ${resp?.status()}`);
  console.log(`title  : ${await page.title()}`);
  console.log(`theme  : ${theme ? `${theme.id} (${theme.name}) [${theme.role}]` : 'n/a — not a Shopify page'}`);

  if (wantTheme && String(theme?.id) !== String(wantTheme)) {
    console.error(`\n✖ THEME MISMATCH — wanted ${wantTheme}, served ${theme?.id}.`);
    console.error('  Refusing to return page data (see audit/lessons/L002).');
    await browser.close();
    process.exit(2);
  }

  if (opt('--shot')) {
    await page.screenshot({ path: opt('--shot'), fullPage: true });
    console.log(`shot   : ${opt('--shot')}`);
  }

  if (greps.length || has('--text')) {
    const body = await page.evaluate(() => document.body.innerText);
    if (has('--text')) console.log('\n--- rendered text ---\n' + body);
    for (const g of greps) {
      const m = body.match(new RegExp(`.{0,70}${g}.{0,70}`, 'gi'));
      console.log(`\ngrep /${g}/ → ${m ? m.length : 0} hit(s)`);
      (m || []).slice(0, 8).forEach(x => console.log('   ' + x.replace(/\s+/g, ' ').trim()));
    }
  }
  await browser.close();
} catch (e) {
  console.error('✖ load failed:', String(e).split('\n')[0]);
  await browser.close();
  process.exit(3);
}
