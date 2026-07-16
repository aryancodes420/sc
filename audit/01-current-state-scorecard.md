# 01 — Current-state scorecard

Each category scored **0–10**, deliberately **not** inflated. Scores reflect what
a real cautious UK customer experiences today. Because the storefront could not be
opened in a browser (firewall — see `data/live-store-facts.md`), scores rely on
the theme code + live Admin API data; anything that would change with live testing
is flagged **[needs live verification]**.

| # | Category | Score | Primary evidence |
|---|---|:---:|---|
| 1 | Positioning clarity | **7** | Hero "Less anxious. More at home."; eyebrow "Made for anxious & rescue dogs"; tight, specific niche. Clear and specific. |
| 2 | Brand differentiation | **6** | Strong voice ("the risk is ours, not yours"), curated-range story, honest anti-dropshipping stance. Undercut by no proof and generic products. |
| 3 | Immediate trust | **3** | Zero product images; placeholder legal identity `[YOUR NAME]/[YOUR ADDRESS]`; placeholder social links; no reviews; contradictory delivery claims. |
| 4 | Homepage effectiveness | **5** | Sensible section order and copy, but hero + all media are gradients/placeholders; "Real reviews, coming soon" occupies prime social-proof space. |
| 5 | Navigation | **6** | Clear category bar + "shop by need"; but one collection (Travel & Outdoor) holds a single product. |
| 6 | Collection usability | **4** | No product images in grids; no visible filters/sorting; thin collections (1–2 products). |
| 7 | Product-page persuasion | **6** | Good narrative copy, cross-sell, FAQ accordions, trust badges, sticky mobile ATC. No images and no reviews cap it. |
| 8 | Product information | **5** | Descriptions are strong; but no structured dimensions/materials/care/safety; SKUs null; scale unknown. |
| 9 | Visual quality | **1** | **Every product and collection has zero images, store-wide** (API-verified). Placeholders only. |
| 10 | Mobile experience | **5** | Responsive CSS, sticky ATC, single-column PDP. Swatches 38px (below 44px). Not testable live. [needs live verification] |
| 11 | Delivery transparency | **3** | Conflicting claims: "1–2 day dispatch" vs "same-day UK warehouse" vs bundle "delivered 4–7 days"; dropshipping origin undisclosed. |
| 12 | Returns transparency | **6** | 30-day guarantee + 14-day CCR right + hygiene exclusion all stated in FAQ. Returns address/process page unverified. [needs live verification] |
| 13 | Social proof | **1** | Zero reviews (honest empty state — ethically correct, commercially empty); placeholder social; no UGC. |
| 14 | Accessibility | **5** | ARIA on accordions/swatches is present; but faint-text tokens (#8a8377/#9a9184 on cream ≈3:1) fail WCAG AA 1.4.3; no focus trap on modal; 38px swatch targets. |
| 15 | Performance | **6** | Light deferred JS; ironically fast LCP because there are no images; render-blocking Google Fonts + font-swap CLS risk. Not measurable live. [needs live verification] |
| 16 | Technical quality | **6** | Clean progressive-enhancement theme, namespaced, small deployable files; some inline `onclick`, duplicated CSS rules. Console/network unverified. [needs live verification] |
| 17 | Legal / customer-info completeness | **3** | Placeholder trader identity + address (CCR breach risk); cookie banner offers "Decline" but gates nothing; policy bodies unverified. |
| 18 | Checkout readiness | **5** | Standard Shopify checkout (Basic plan); ATC relies on continue-selling at 0 stock; free-ship progress bar wired. Untested live. [needs live verification] |

**Unweighted average: ≈ 4.6 / 10.**

## How to read this
The store is **well-built at the theme/code layer** (much better than a typical
dropshipping template) but **empty and unverifiable at the content/trust layer**.
The five scores dragging everything down — visual quality (1), social proof (1),
immediate trust (3), delivery transparency (3), legal completeness (3) — are all
**content, catalogue and configuration problems, not code problems.** That is good
news: most of the highest-impact fixes do not require rebuilding the theme.

## Biggest single lever
**Product photography (category 9 = 1/10).** Baymard research finds product images
are the first thing shoppers engage with on a PDP, and users rely on them to judge
suitability and scale (S1–S3). A store selling comfort objects for anxious dogs with
**no images of any product** cannot convert at a normal rate regardless of how good
the copy is.
