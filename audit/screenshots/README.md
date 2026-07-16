# Screenshots — not captured (environment limitation)

The audit brief (Phase 1, steps 3–7) asks for screenshots of the live/preview
storefront at 390 / 768 / 1440 px and of every significant issue.

**These could not be captured.** This audit environment is firewalled from the
public internet for storefront hosts: `https://thedognook.co.uk`, the store's
`*.myshopify.com` domain, and the preview-theme URL all return
`403 CONNECT tunnel failed` (verified 2026-07-16; see `../data/live-store-facts.md`).
Playwright/Chromium cannot reach the site, so no rendered screenshots exist.

### What was used instead
- **Live Shopify Admin API** for catalogue/collection/pricing/image facts.
- **Static analysis of the theme source** for layout, copy, responsive behaviour,
  accessibility and performance characteristics.

### What still needs a real browser pass (owner or a networked session)
Capture these at 390 px, 768 px and 1440 px on the **preview theme**
(`?preview_theme_id=193158119707`) and save them here:
1. Homepage — full-length, each breakpoint.
2. A collection page (e.g. `/collections/calming-essentials`).
3. A product page (e.g. `/products/calming-donut-bed-1`) incl. sticky mobile ATC.
4. The bundle PDP (`/products/the-new-rescue-bundle-1`) — to confirm whether the
   £49.97 strike-through / "Save £15" actually renders.
5. Cart drawer with the free-ship progress bar.
6. The email pop-up and the cookie banner.
7. Checkout entry (first step) — confirm delivery/threshold messaging matches copy.
8. 404 page and an empty-search result.
9. Footer — to confirm the `[YOUR NAME]/[YOUR ADDRESS]` placeholder is live.

A Lighthouse run (mobile, throttled) against the same preview URL should be saved
to `../data/` as `lighthouse-home.json` / `lighthouse-pdp.json` when available.
