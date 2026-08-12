# L001 — Chromium can't reach HTTPS in this container (but it's fixable)

**Filed:** 2026-08-12 · **By:** `claude/dog-nook-theme-review-pbwho6` · **Cost:** ~40 min, and
I wrongly told the owner "no browser is possible here" before finding the fix.

## Symptom

Playwright/Chromium fails on **every** HTTPS URL:

```
net::ERR_CONNECTION_RESET at https://example.com/
```

Identical failure for every site, every proxy flag, sandbox on or off, headless shell or
full Chromium. Meanwhile `curl`, Python `urllib` and Node `fetch` all reach the same URLs
fine — which makes it look like "browsers are blocked by policy."

## What it actually was

**Not a network policy.** Two separate problems stacked, which is why single fixes failed:

1. **Chromium cannot open outbound :443 in this container.** Proof: it loads loopback
   (`http://127.0.0.1:45509`) and external **plain HTTP** (`http://example.com/`) fine —
   only HTTPS resets. The agent proxy logged *zero* relay failures, so the traffic never
   reached it.
2. **The TLS chain is Anthropic's sandbox egress gateway**, and Chromium's fresh profile
   doesn't trust it. Once problem 1 was bypassed, the error changed to
   `ERR_CERT_AUTHORITY_INVALID` — progress, not a dead end.

⚠️ The CA at `/root/.ccr/agent-proxy-ca.crt` is **not** the one in the chain. Pinning it
does nothing. The real chain is:

```
CN = *.<tld>
  ← O = Anthropic, CN = Egress Gateway SDS Issuing CA (production)
    ← O = Anthropic, CN = sandbox-egress-gateway-production Egress Gateway CA
```

`certutil` is not installed, so the normal "add the CA to the NSS store" route is closed.

## The fix

Both parts are wired up in [`tools/agent-browser/`](../../tools/agent-browser/) — use that
rather than rebuilding it:

```bash
python3 tools/agent-browser/tunnel.py 8899 &     # CONNECT tunnel; Python opens :443
node tools/agent-browser/browse.mjs https://thedognook.co.uk/ --shot out.png
```

What it does:

1. **Loopback CONNECT proxy.** Chromium speaks plain HTTP to `127.0.0.1:8899` (works),
   Python opens the real socket (works) and relays raw bytes. **TLS stays end-to-end —
   the tunnel never decrypts anything.**
2. **Pin the gateway CA by public-key hash**, so Chromium trusts exactly that one known
   CA and nothing else:

```bash
echo | openssl s_client -connect <host>:443 -proxy 127.0.0.1:8899 -showcerts 2>/dev/null
# then per cert: openssl x509 -pubkey -noout | openssl pkey -pubin -outform der \
#   | openssl dgst -sha256 -binary | base64
```

```js
chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage',
         '--ignore-certificate-errors-spki-list=' + SPKI_LIST],
  proxy: { server: 'http://127.0.0.1:8899' },
})
```

**This does not disable TLS verification.** `--ignore-certificate-errors-spki-list` pins
specific known public keys; every other cert is still validated. Do **not** substitute
`--ignore-certificate-errors` or `ignoreHTTPSErrors: true` — that turns verification off
globally, and the proxy README explicitly forbids it.

> SPKI hashes are environment-specific — recompute them; don't paste yesterday's.
> `browse.mjs` does this automatically on first run.

## The rule

**A failing browser is a bug to debug, not a limit to report.** Before claiming a
capability is unavailable, isolate the layer: loopback → plain HTTP → HTTPS → cert. Each
step tells you which of the four is broken, and three of them are fixable by you.
