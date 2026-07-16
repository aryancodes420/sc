# 09 — Technical, performance & accessibility audit

**Hard limitation:** the storefront is firewalled from this environment, so **no
live Lighthouse, no real Core Web Vitals field data, no console/network capture,
and no browser accessibility scan were possible.** Everything below is **static
analysis of the theme source**. Runtime-dependent items are marked
**[needs live verification]**. Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 (S7).

## Performance
| Finding | File / line | Severity | User impact | Fix | Regression risk |
|---|---|---|---|---|---|
| Render-blocking Google Fonts (Playfair + Inter, many weights) via `<link rel=stylesheet>` | `dog-nook-head.liquid:8-10` | Medium | Delays first paint; `display=swap` avoids FOIT but causes a **font-swap reflow (CLS/INP risk)** | Preload the two woff2s, or self-host via `font_url`/theme assets; trim to needed weights | Low |
| Two separate CSS files loaded site-wide | `dog-nook-head.liquid:11-12` | Low | 2 requests | Acceptable (intentional, per deploy-size strategy); could combine later | Low |
| `fetch('/cart.js')` on every page for free-ship bar | `dog-nook.js:92-101` | Low | Minor extra request even on pages with no bar | Guard: only fetch if a bar exists (it already early-returns if none) — OK | Low |
| Email popup + cookie JS inline | popup/banner snippets | Low | Small inline JS; fine | — | — |
| **No product images anywhere** | store content | — | Ironically makes LCP *fast* (text/gradient LCP), but this is a **conversion**, not perf, problem | Add images **with** width/height + responsive `srcset` (theme already emits `widths` + lazy) to protect CLS | Low |
| Inline `onclick` handler for gallery thumb swap | `dog-nook-product.liquid:40` | Low | Works; mild CSP/maintainability smell; swaps `src` only (no `srcset`) | Move to `dog-nook.js`; swap `srcset` too | Low |
| Duplicated `.tdn-eyebrow` / `.tdn-eyebrow--light` rules | `dog-nook.css:62-73` | Trivial | Tiny extra bytes | De-dupe | Low |

**Expectation once images are added:** LCP will depend on the hero/first product
image. The theme already emits responsive `widths` and `loading=lazy` on cards, and
Shopify serves WebP via `image_url` — so if images carry explicit dimensions, CWV
should stay healthy. **[needs live verification]** with Lighthouse post-photography.

## SEO / metadata
| Finding | Evidence | Severity | Fix |
|---|---|---|---|
| Homepage meta description injected only via custom snippet | `dog-nook-head.liquid:29-31` | OK | Keep; verify Horizon isn't double-emitting |
| Per-product / per-collection SEO metafields set (per handoff) | handoff §6 | OK | [Verify] populated on all |
| OG image is a 1100×1100 stopgap; `og:image:width/height` say 1100 but URL requests `width=1200` | `dog-nook-head.liquid:22-26` | Low | Produce a real branded 1200×630; fix width/height to match |
| Favicon = inline SVG data-URI when none set | `dog-nook-head.liquid:17-19` | OK | Fine; upload a real one eventually |
| Heading hierarchy | PDP uses one `<h1>` (product title), sections use `<h2>/<h3>` | OK | Homepage hero heading is in `dog-nook-hero` — [Verify] it's an `<h1>` on index |
| Product/Offer schema (JSON-LD) | **Not found in custom sections** | Medium | Add Product + Offer (+ AggregateRating only when real) structured data for rich results |
| Canonical tags | Horizon default | [Verify] | Confirm canonicals on products in >1 collection |
| Image alt text | Theme sets `alt: product.title` fallback | OK-by-design | Real, descriptive alts once images exist |

## Accessibility (WCAG 2.1/2.2 AA)
| Finding | File | SC | Severity | Fix |
|---|---|---|---|---|
| **Faint text tokens fail contrast.** `--tdn-faint #8a8377` (~3.0:1) and `--tdn-faint-2 #9a9184` (~2.6:1) on cream `#F3EDE4` are below **4.5:1** for normal text | `dog-nook.css:16-17`, used in crumbs/meta/labels | 1.4.3 (S10) | **High** | Darken faint text to ≥4.5:1 (e.g. ~#6f6a5e) for body-size uses |
| Terracotta sale price `#C17A57` (~3.0:1) on cream — passes only if rendered as *large* text (≥18px/14px-bold) | `dog-nook-cro.css:17,34` | 1.4.3 | Medium | Ensure sale price is large/bold, or darken terracotta for small uses |
| Swatch targets 38×38px | `dog-nook-cro.css:51` | 2.5.5/2.5.8 (S11-12) | Medium | Increase to ≥44×44 (or ≥24 min for 2.2 AA) |
| Email-popup modal: no focus trap; focus not restored on close | `dog-nook-email-popup.liquid` | 2.4.3/1.4.13 | Medium | Trap focus within dialog; return focus to trigger on close (Esc/backdrop already close) |
| Swatches are `<button>` without `role=radio`/`radiogroup`; `aria-checked` only set on click | `dog-nook-pdp-form.liquid`, `dog-nook.js:37-39` | 4.1.2 | Low | Add radiogroup semantics + initial `aria-checked` |
| Empty star-rating `<a>` (non-linked variant) lacks an aria-label | `dog-nook-stars.liquid:56-59` | 1.1.1 | Low | Add `aria-label="No reviews yet"` |
| Accordion panel toggled by class — confirm closed panels are truly hidden from AT | `dog-nook.js:20-24` + CSS | 1.3.1 | Low | Ensure closed `.tdn-accordion__a` is `display:none` (not just visually) |
| Gallery thumb buttons use `alt=''` | `dog-nook-product.liquid:44` | 1.1.1 | OK | Decorative thumbnails — acceptable |

**Positives:** progressive enhancement (sections work without JS), `aria-expanded`
on accordions, `aria-modal`/labelled dialog, `prefers-reduced-motion` respected in
cart drawer, Horizon's `--minimum-touch-target` used in cart. Good baseline.

## Cookie / consent (technical)
`dog-nook-cookie-banner.liquid` + `dog-nook.js:57-70`: the banner sets
`localStorage['tdn_consent']` on Accept/Decline but **does not conditionally load or
block any pixel/tag**. It also *states* Meta & TikTok pixels are in use. Net effect:
**consent choice has no technical effect.** See `10-legal-risk-checklist.md`. Fix:
gate non-essential scripts behind consent, or adopt Shopify's Customer Privacy /
Consent API (Basic plan supports the consent banner + Customer Privacy API), and
only claim the pixels that are actually installed. **[needs live verification]** of
which pixels exist.

## Broken Liquid / errors
- No obvious broken Liquid in the reviewed files; logic guards for blank data are
  present. Full console/network/error verification **[needs live verification]**.
