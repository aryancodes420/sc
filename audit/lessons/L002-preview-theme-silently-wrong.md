# L002 — `?preview_theme_id=` gets silently dropped, and you analyse the wrong theme

**Filed:** 2026-08-12 · **By:** `claude/dog-nook-theme-review-pbwho6` · **Cost:** I produced a
full analysis of a bundle page, then found it was the **live** theme, not the draft.
Binned it. Had I not checked, I'd have reported confident findings about the wrong site.

## Symptom

You fetch the documented preview URL:

```
https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731
```

You get **HTTP 200** and a real, plausible Dog Nook page. Everything looks right. But you
are looking at theme `193140818203` (the old live theme), not the draft you were asked to
work on.

Nothing warns you. The page renders. The findings look coherent. They're just about the
wrong theme.

## What it actually was

Two silent failure modes:

1. **The 301 eats the query string.** `kkeqih-jm.myshopify.com` → `thedognook.co.uk`, and
   the `?preview_theme_id=` is dropped on the redirect. `curl -L` follows it happily.
2. **The preview needs a cookie, not a parameter.** The param only *sets* a cookie. If
   your client doesn't store and resend cookies across the redirect (`curl` without
   `-c/-b`, `urllib` without a `CookieJar`), you silently fall back to the published theme.

Symptom that gave it away: the live theme has **zero** `tdn-` classes, the draft has
hundreds. Identical byte counts between "preview" and "live" fetches is the other tell.

## The fix

**Assert the theme on every single page load.** Shopify hands it to you:

```js
await page.evaluate(() => window.Shopify.theme)
// { id: 193438056731, name: "The Dog Nook — Design install (CRO working copy)",
//   role: "unpublished" }
```

Server-side equivalent, no browser needed:

```bash
curl -sSL -c cj -b cj "https://thedognook.co.uk/<path>?preview_theme_id=<ID>" \
  | grep -o 'Shopify\.theme = {[^}]*}'
```

Rules that make it stick:

- Hit the **primary domain** (`thedognook.co.uk`), never the `myshopify.com` alias — no
  redirect, nothing to drop.
- Always use a **shared cookie jar** (`-c jar -b jar`) or a real browser context.
- Treat any page whose theme id ≠ your target as **unverified** and refuse to analyse it.
  `tools/agent-browser/browse.mjs` does this and errors out rather than returning data.
- Visual confirmation: on the draft, Shopify renders its own preview bar at the bottom
  reading *"The Dog Nook — Design install (CRO working copy) · Draft"*. If it's absent
  from your screenshot, you're on live.

## The rule

**Never analyse a page without first proving which theme served it.** A 200 and a
plausible-looking page prove nothing — `Shopify.theme.id` is the only evidence that counts.
