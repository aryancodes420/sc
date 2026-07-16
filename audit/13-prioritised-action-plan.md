# 13 — Prioritised action plan

Ranking follows the brief's order: **truthfulness/safety → technical failures →
trust → offer clarity → mobile friction → delivery/returns → discovery →
persuasion → performance → polish.**

Legend — **Impact** L/M/H · **Confidence** L/M/H · **Effort** S/M/L · **Discipline**
Copy / Design / Dev / Merch / Ops / Analytics.

## P0 — Store-breaking / misleading / legally risky (do first)
| ID | Action | Impact | Conf | Effort | Disc | Files |
|---|---|---|---|---|---|---|
| P0-1 | Replace `[YOUR NAME]/[YOUR ADDRESS]` with real trader identity + geographic address | H | H | S | Ops/Copy | `store-config/footer-group.json` |
| P0-2 | Remove/replace "Made in the UK"; state true origin | H | H | S | Copy | `footer-group.json` |
| P0-3 | Reconcile all delivery claims to one honest, consistent promise (incl. realistic window + origin) | H | H | S | Copy/Ops | `index.json`, `dog-nook-faq.liquid`, `page.faq.json`, `dog-nook-product.liquid`, `dog-nook-trust-panel.liquid` |
| P0-4 | Make cookie consent functional (gate non-essential pixels via Shopify Customer Privacy API / app); only name pixels that exist | H | M | M | Dev | `dog-nook-cookie-banner.liquid`, `dog-nook.js`, theme settings |
| P0-5 | Fix bundle to one true component list + one true saving + genuine compare-at | H | H | S | Merch/Copy | `index.json` + bundle product (Admin) |
| P0-6 | Rewrite the "Is this a dropshipping store?" FAQ answer to be transparent | M | H | S | Copy | `dog-nook-faq.liquid`, `page.faq.json` |
| P0-7 | Verify each policy page is real (not template) & consistent with FAQ | M | M | S | Ops | Shopify policies (live) |

## P1 — Major barrier to purchase
| ID | Action | Impact | Conf | Effort | Disc | Files/Source |
|---|---|---|---|---|---|---|
| P1-1 | **Add real product photography** (hero + in-use + one in-scale per product) | H | H | M–L | Design/Merch | Product media (Admin) |
| P1-2 | Add a real hero image/short video | H | M | M | Design | `dog-nook-hero`, homepage media |
| P1-3 | Install Judge.me; collect real post-purchase reviews (scaffolding exists) | H | H | S–M | Ops/Dev | `REVIEWS-SETUP.md`, review metafields |
| P1-4 | Populate real social profiles or remove placeholder links | M | H | S | Ops/Copy | `footer-group.json` |
| P1-5 | Replace "Real reviews, coming soon" with credible non-review trust until reviews exist | M | M | S | Copy/Design | `dog-nook-reviews-placeholder.liquid`, `index.json` |
| P1-6 | Add collection images; fix/merge the 1-product Travel collection | M | M | S | Merch/Design | Collections (Admin), `index.json` |

## P2 — Meaningful conversion / usability
| ID | Action | Impact | Conf | Effort | Disc | Files |
|---|---|---|---|---|---|---|
| P2-1 | Structured PDP spec block (dimensions, material, care, safety, suitable/not-ideal-for) | M | M | M | Copy/Dev | `dog-nook-product.liquid` (+ metafields) |
| P2-2 | Fix faint-text contrast to ≥4.5:1 | M | H | S | Dev | `dog-nook.css`, `dog-nook-cro.css` |
| P2-3 | Swatch/target sizes ≥44px; focus trap + focus-restore on popup | M | M | S | Dev | `dog-nook-cro.css`, `dog-nook-email-popup.liquid`, `dog-nook.js` |
| P2-4 | Add Product/Offer JSON-LD (AggregateRating only when real) | M | M | S | Dev | new snippet in `dog-nook-head`/PDP |
| P2-5 | "Add to Cart" → "Add to basket" (UK consistency) | L | M | S | Copy | product section/snippets |
| P2-6 | Problem→product homepage row ("fireworks / new rescue / mealtimes / grooming") | M | M | M | Design/Copy | `index.json`, section |

## P3 — Optimisation / polish
| ID | Action | Impact | Conf | Effort | Disc | Files |
|---|---|---|---|---|---|---|
| P3-1 | Self-host/preload fonts; trim weights | L | M | S | Dev | `dog-nook-head.liquid`, assets |
| P3-2 | Move inline gallery `onclick` into `dog-nook.js`; swap `srcset` | L | M | S | Dev | `dog-nook-product.liquid`, `dog-nook.js` |
| P3-3 | Real branded 1200×630 OG image; fix width/height meta | L | M | S | Design | `dog-nook-head.liquid`, asset |
| P3-4 | Qty stepper + express-pay on PDP | L | L | S | Dev | PDP form |
| P3-5 | 2–3 honest education guides (fireworks, settling a rescue) | M | L | M | Copy | blog/pages |

## P4 — Optional experiments (see 12-testing-roadmap.md)
Only once traffic supports power: T1 imagery, T2 delivery honesty, T3 reviews,
T4 hero, T5 bundle framing, T6 spec block. Until then, run Track A qualitative.

## Recommended implementation sequence
1. **P0 batch** (all — cheap, mandatory, mostly config/copy). Ship together.
2. **P1-1 photography + P1-3 reviews app** in parallel (longest lead time — start now).
3. **P1-2/4/5/6** trust + homepage/collection imagery.
4. **P2** PDP depth + accessibility + schema.
5. **Analytics** (GA4 + Clarity + consent) — ideally alongside P0-4 so you can measure everything after.
6. **P3** polish, then **P4** experiments once powered.

## Effort vs impact snapshot
- **Highest impact, lowest effort:** P0-1, P0-3, P0-5, P1-4, P2-2 → do this week.
- **Highest impact, higher effort:** P1-1 photography, P1-3 reviews → start now, they gate everything else.
