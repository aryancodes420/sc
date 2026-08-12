# 🌐 agent-browser — make the browser work in a Claude Code container

**If a session tells you "I can't see the site", point it here first.**

Chromium ships in these containers but cannot open outbound `:443`, so every HTTPS page
fails with `ERR_CONNECTION_RESET` — which reads exactly like a blocked network policy and
isn't one. Two small pieces fix it. Background: [`../../audit/lessons/L001`](../../audit/lessons/L001-chromium-https-blocked.md).

## Use it

```bash
python3 tools/agent-browser/tunnel.py 8899 &          # leave running

# any page
node tools/agent-browser/browse.mjs https://thedognook.co.uk/ --shot home.png

# a Shopify DRAFT theme, asserted (exits 2 if the wrong theme is served)
node tools/agent-browser/browse.mjs \
  https://thedognook.co.uk/products/the-settle-in-bundle \
  --theme 193438056731 --shot settle-in.png --grep "bought separately" --grep "SAVE"

# phone viewport
node tools/agent-browser/browse.mjs https://thedognook.co.uk/ --mobile --shot home-375.png
```

If Playwright isn't resolvable, link the global modules once:
`ln -sfn /opt/node22/lib/node_modules ./node_modules`

| Exit | Meaning |
|---|---|
| 0 | OK |
| 2 | **Theme mismatch** — you were served a different theme than you asked for |
| 3 | Navigation/load failure |

## How it works

**`tunnel.py`** — a CONNECT-only forward proxy on loopback. Chromium speaks plain HTTP to
it (which works), Python opens the real socket (which works) and relays raw bytes.
**TLS stays end-to-end; the tunnel never decrypts anything.**

**`browse.mjs`** — reads the certificate chain actually presented, derives its SPKI
hashes, and passes them to `--ignore-certificate-errors-spki-list`. That pins the known
Anthropic egress-gateway CA and **leaves verification on for everything else**.

> ⚠️ Never swap this for `--ignore-certificate-errors` or `ignoreHTTPSErrors: true`. Those
> disable verification globally and the proxy README forbids it. Pins are recomputed per
> run because they're environment-specific — never hardcode yesterday's.

## Why `--theme` matters

`?preview_theme_id=` only *sets a cookie*, and the `myshopify.com` → primary-domain 301
drops the query string. A client that doesn't carry cookies across that redirect silently
gets the **published** theme — with a 200 and a page that looks completely plausible.

A full analysis was once written against the wrong theme and thrown away. `--theme` makes
that failure loud: it asserts `window.Shopify.theme.id` and refuses to return data on
mismatch. See [`../../audit/lessons/L002`](../../audit/lessons/L002-preview-theme-silently-wrong.md).

**Store reference** — live `193140818203` · draft/working `193438056731` ·
abandoned `193158119707`. Deploy only to the draft; publishing is the owner's click.
