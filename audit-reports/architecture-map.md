# The Dog Nook — Storefront architecture map

> Phase 1 output. Read this + `/home/user/sc/CLAUDE.md` before auditing.
> Source of truth for the audit is the local theme at
> `/home/user/sc/dog-nook-theme/`. This is a **local copy of the UNPUBLISHED
> draft theme** — do not attempt to touch the live store.

## What the theme is
A drop-in **add-on layered on Shopify's Horizon theme**. All custom files are
namespaced `dog-nook-*`; all custom CSS classes are `.tdn-*`. **Header, footer
and cart drawer are Horizon's** (this add-on styles page content + templates).
Design tokens: cream `#F3EDE4` bg, sage `#7C8767` brand, charcoal `#2E2A22`
text, terracotta `#C17A57` accent. Fonts: Playfair Display (display) + Inter
(body), loaded from Google Fonts.

## Global load path
`snippets/dog-nook-head.liquid` is rendered once in `<head>` (via a one-line
edit to `layout/theme.liquid`) and loads, in order:
`dog-nook.css` (tokens + base components, large) → `dog-nook-cro.css`
(stars/PDP/review cards + WCAG AA overrides) → `dog-nook-anim.css` (motion +
scroll reveal) → `dog-nook-pdp.css` (PDP buy-box + product-card overrides) →
`dog-nook.js` (defer). It also emits SEO/OG fallbacks (favicon data-URI,
default share image, homepage meta description) and injects
`dog-nook-email-popup`. `dog-nook-cookie-banner` renders before `</body>`.

## Templates → sections
| Template | Renders | Notes |
|---|---|---|
| `templates/index.json` | catbar → hero → trust-strip → why → bundle_intro (rich-text) → **bundle_premium** (Settle-In £64.99) → **bundle_entry** (New Rescue £34.99) → collections (grid, 5 tiles) → reviews (real review wall) → newsletter | homepage |
| `templates/product.json` | `dog-nook-product` → `dog-nook-pdp-form` (variant swatches/size pills, qty, "Buy it now" + Add to Cart, Shop Pay terms) + `dog-nook-pdp-extra` (cross-sell / per-product FAQ / reviews) + `dog-nook-trust-panel` + `dog-nook-stars` | standard PDP; mobile sticky ATC |
| `templates/product.bundle.json` | `dog-nook-bundle` | New Rescue Bundle (templateSuffix `bundle`) |
| `templates/product.settle-in-bundle.json` | `dog-nook-bundle` | Settle-In Bundle; **suffix not yet set live**, so its PDP currently renders on the default product template |
| `templates/collection.json` | `dog-nook-collection` | banner + product grid + "Good to know" accordions |
| `templates/list-collections.json` | `dog-nook-collections-index` | 2-col cards, explicit `collection_list` order, bundle "Save £X" badges |
| `templates/page.shop.json` | `dog-nook-shop` | all products + working client-side Sort dropdown |
| `templates/page.about.json` | `dog-nook-rich-text` | founder story |
| `templates/page.contact.json` | `dog-nook-contact` | real Shopify contact form + business-details disclosure |
| `templates/page.faq.json` | `dog-nook-faq` | 15 Q&A accordions |

## Key snippets
`dog-nook-product-card` (placeholder wordmark for image-less products; bundle
badge + category pill positioned via cro/pdp css), `dog-nook-stars` (renders
only real `reviews.rating`/`rating_count` metafields — honest empty state
otherwise), `dog-nook-email-popup` (WELCOME10, fires at 12s or 45% scroll,
focus-trapped), `dog-nook-cookie-banner` + JS (wired to Shopify Customer
Privacy API), `dog-nook-cart-progress` (free-ship bar spliced into Horizon's
cart drawer), `dog-nook-trust-panel`, `dog-nook-pdp-form`, `dog-nook-pdp-extra`,
`dog-nook-freeship-bar` (alt JS version, currently unused).

## Navigation (live, verified)
- Header `main-menu`: Shop (`/pages/shop`), Collections (`/collections`), About,
  Contact, FAQ — all resolve to existing published pages.
- Homepage category bar (`dog-nook-category-bar`): a continuously-scrolling
  marquee of pills (Shop all, the 4 category collections, The Rescue Bundle).
- Footer (Horizon `footer-group`): Explore / Help / Legal menus → real
  pages + `/policies/*`. Real trader identity present.

## Catalogue context (live, verified this session — not part of the theme code)
- **9 active products:** Lick Mat £11.99 · Snuffle Mat £22.99 · Calming Donut
  Bed £29.99/£37.99/£44.99 (S/M/L) · Grooming Glove £11.99 · Nail Grinder
  £19.99 · Slow-Feeder Bowl £14.99 · Car Boot Liner £29.99 · **New Rescue
  Bundle £34.99** (compare £49.97, save £14.98) · **Settle-In Bundle £64.99**
  (compare £72.97, save £7.98). Two-tier bundle strategy.
- Collections: `calming-essentials` (holds New Rescue Bundle) ·
  `settling-a-new-rescue` (holds Settle-In Bundle) · `grooming` ·
  `mealtime-feeding` · `travel-outdoor` (**1 product**) · `fireworks-storms`
  (all-draft → **empty** on storefront).
- Every active + draft product has a per-product `custom.faq` JSON metafield
  rendered by `dog-nook-pdp-extra`.
- **NO product photography anywhere** — placeholder colour tiles + a card
  wordmark stand in. This is the single biggest known gap.
- Reviews: a real review wall (`dog-nook-reviews-placeholder`) shows a genuine
  4.8/80 aggregate + real owner quotes. No fabricated reviews.

## Honesty / compliance posture already in place
Honest mixed delivery (1–2 day dispatch, ~4–7 day delivery; Car Boot Liner
same-day UK), real trader identity (footer + contact), functional cookie
consent, WCAG AA contrast/tap-target/focus fixes in `dog-nook-cro.css`, no fake
urgency/scarcity/reviews. These are brand-critical constraints — flag anything
that regresses them.

## Environment limits for auditors (be honest about these)
- The **live storefront is firewalled** from this environment: no browser
  rendering, screenshots, Lighthouse, or live checkout walk-through. Audit the
  **source** and clearly mark anything that needs rendered verification as a
  hypothesis, not a confirmed defect.
- `shopify theme check` / Shopify CLI may not be installed — if a command can't
  run, say so and fall back to static analysis.
