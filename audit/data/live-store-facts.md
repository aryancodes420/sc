# Live store facts — extracted from the Shopify Admin API

> Source of truth for the audit. Everything here was pulled live from the
> connected store (`thedognook.co.uk`) via the Shopify MCP on **2026-07-16**,
> not inferred from the theme. Where a figure could not be re-verified via the
> available (read-only, approval-gated) tools, it is marked **[unverified]**.

## Shop
| Field | Value |
|---|---|
| Name | The Dog Nook |
| Primary domain | thedognook.co.uk |
| Plan | Basic |
| Currency | GBP |
| Country / timezone | United Kingdom / BST |
| Contact email (account) | aryansarna@hotmail.com |

## Products (active) — 8 total
| Title | Handle | Type | Price | Images | Inventory | SKU |
|---|---|---|---|---|---|---|
| The Lick Mat | lick-mat-1 | Calming | £9.99 | **0** | 0 | null |
| The Snuffle Mat | snuffle-mat-medium-1 | Feeding | £22.99 | **0** | 0 | null |
| The Calming Donut Bed | calming-donut-bed-1 | Calming | £44.99 | **0** | 0 | null |
| The Grooming Glove | grooming-glove-1 | Grooming | £11.99 | **0** | 0 | null |
| The Nail Grinder | nail-grinder-1 | Grooming | £19.99 | **0** | 0 | null |
| The Slow-Feeder Bowl | slow-feeder-bowl-1 | Feeding | £14.99 | **0** | 0 | null |
| The Car Boot Liner | car-boot-liner-1 | Travel | £29.99 | **0** | 0 | null |
| The New Rescue Bundle | the-new-rescue-bundle-1 | (none) | £34.99 | **0** | 0 | null |

**Verified critical facts:**
- **Every product has zero images** (`featuredMedia: null`, `images: []` on all 8). Confirmed twice (product search + single-product detail on the bundle).
- **All inventory is 0.** Add-to-cart works only because variants are set to continue selling at 0 stock (per handoff; inventory policy field not returned by the read-only tools — treat as [unverified] but consistent with 0 inventory + active status).
- **All SKUs are null.**
- The handoff lists 11 products incl. `wall-mount-lick-pad-1` and `travel-seatbelt-harness-1`; these are **not in the active catalogue** (draft/archived). A `dog-nook-pdp-demo` also exists (demo).

## Collections (published) — 4 shoppable + 1 default
| Title | Handle | Products | Image |
|---|---|---|---|
| Calming Essentials | calming-essentials | 2 | none |
| Grooming | grooming | 2 | none |
| Mealtime & Feeding | mealtime-feeding | 2 | none |
| Travel & Outdoor | travel-outdoor | **1** | none |
| Home page | frontpage | 0 (unused default) | none |

- No collection has an image.
- `travel-outdoor` contains a single product (The Car Boot Liner).

## Bundle contents contradiction (verified)
| Where | Contents stated | "Separately" price | Saving stated |
|---|---|---|---|
| **Product description** (live API) | Lick Mat + Snuffle Mat + **Grooming Glove** | £44.97 | **Save £9.98** |
| **Homepage** featured-bundle section (`index.json`) | Lick mat + snuffle mat + **slow-feeder bowl** | £49.97 | **SAVE £15** / compare £49.97 |

Same product, two different component lists and two different savings figures. The
bundle variant's `compareAtPrice` could not be re-read via the read-only tools
(**[unverified]** whether the £49.97 strike-through actually renders on the PDP).

## Delivery claims found across the site (verified in code/API)
| Location | Claim |
|---|---|
| Homepage trust strip | "Fast UK dispatch — Usually 1–2 days" |
| Homepage hero ticks / trust strip | "Free UK delivery over £35" |
| FAQ | "Most items dispatched within 1–2 days; the Car Boot Liner **ships same-day from our UK warehouse**" |
| PDP trust panel (default) | "Dispatched within 1–2 days · Free UK delivery over £35" |
| Bundle product description | "Dispatched within 1–2 days · **Delivered in 4–7 days**" |

Business context states the model is **dropshipping via CJdropshipping**. The
"UK warehouse / same-day / 1–2 day" language must be reconciled with actual
fulfilment reality (see 07-trust-and-dropshipping-risk.md and 10-legal-risk-checklist.md).

## Footer business identity (verified in `store-config/footer-group.json`)
> "The Dog Nook is a trading name of **[YOUR NAME]**, a sole trader registered in
> England & Wales. Business address: **[YOUR ADDRESS]** · Email: hello@thedognook.co.uk"

Placeholders are unfilled. Social links all point to bare platform homepages
(`facebook.com/`, `instagram.com/`, `tiktok.com/`, `youtube.com/`, `x.com/`).

## Access limitations for this audit
- **Storefront is firewalled from this environment.** `https://thedognook.co.uk`,
  the myshopify domain, and the preview-theme URL all return `403 CONNECT tunnel
  failed`. **No Playwright/browser testing, no live Lighthouse, no visual/mobile
  pixel testing, no checkout walkthrough was possible.** All such items are marked
  as requiring live verification.
- The general Admin GraphQL tool is **approval-gated** in this environment and
  returned "requires approval"; only the specific read tools (`get-shop-info`,
  `search_products`, `get-product`, `search_collections`) were usable. Policy-page
  bodies, exact variant `compareAtPrice`, installed apps/pixels, and theme
  publish state could **not** be independently re-verified via API and rely on the
  theme code + handoff.
