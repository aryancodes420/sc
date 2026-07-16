# 05 — Navigation & collection audit

## Current structure (verified)
- **Header menu:** `main-menu` (Horizon header). A stale duplicate `dog-nook-header`
  menu exists but is unused (per handoff). **[Verify]** exact header links live.
- **Homepage category bar:** Shop all · Calming Essentials · Grooming · Mealtime &
  Feeding · Travel & Outdoor · The Rescue Bundle. (`index.json`) [Obs]
- **Collections (live):** calming-essentials (2), grooming (2), mealtime-feeding (2),
  travel-outdoor (**1**). No collection has an image. [Obs — API]

## Can customers shop by problem, not just product type?
Partly. The "Shop by need" heading is problem-framed, but the collections beneath
it are **product categories** (grooming, feeding, travel), not problems. The nearest
competitors route by problem ("Anxious Pet", "Enrichment for nervous dogs" — S21–22).

### Problem-based navigation — assessed against the actual range
The brief lists candidate collections; here is whether the **8-product** catalogue
supports each **today**:
| Candidate | Supported now? | Would contain |
|---|---|---|
| Calm & Comfort | **Yes** | Calming Donut Bed, Lick Mat (, Snuffle Mat) |
| Enrichment & Boredom Relief | **Yes** | Snuffle Mat, Lick Mat, Slow-Feeder Bowl |
| Slower Mealtimes | Thin | Slow-Feeder Bowl, Snuffle Mat (2) |
| Stress-Free Grooming | Thin | Grooming Glove, Nail Grinder (2) |
| Rescue Dog Essentials | **Yes (via bundle + beds/mats)** | Rescue Bundle, Bed, Lick/Snuffle Mat |

**Recommendation:** don't multiply near-empty collections. With 8 products, use
**2–3 benefit collections that each hold ≥3 products** (Calm & Comfort;
Enrichment; Grooming & Care), plus keep the Rescue Bundle as a hero entry point.
Avoid single-product collections. **[Judg]**

## Audit checklist
| Item | Finding | Action |
|---|---|---|
| Menu terminology | Category-led, clear | Add 1–2 benefit entry points |
| Collection naming | Functional | Consider benefit names where range allows |
| Filters | None evident in custom sections | Low priority at 8 SKUs; revisit as range grows |
| Sorting | Collections set to BEST_SELLING with 0 sales history → effectively arbitrary | Set a deliberate manual order per collection |
| Product-card info | Title, price, star scaffold | Cards are **imageless** → weak. Add images (P1) |
| Pricing presentation | Clean; sale framing only where real | Keep; ensure no fake compare-at |
| Review visibility | "New/Be first" everywhere | Resolves once reviews exist |
| Sale / badges | Restrained | Good; keep honest |
| Image consistency | N/A — no images | Establish one shoot style (see 06) |
| Quick-add | Not in custom card (links to PDP) | Optional later; PDP-first is fine at this size |
| Mobile usability | Responsive grids | [Verify] live |
| Empty collections | Travel & Outdoor = 1 product | Merge into "Out & About" or fold liner into another; avoid 1-item grids |
| Duplicate products | None in active set; demo product exists | Ensure `dog-nook-pdp-demo` is not published |
| Choice overload | Not a risk (8 SKUs) | N/A |

## Shortest logical journey (today)
Home → category-bar pill (e.g. "Calming Essentials") → collection (2 products, no
images) → PDP → ATC. **Two friction points:** imageless collection grid, and a
1-product Travel collection dead-ends discovery. **[Obs][Judg]**

## Recommended discovery paths
1. **By need:** Home → "Calm & Comfort" (≥3 imaged products) → PDP → ATC.
2. **By flagship:** Home hero → Rescue Bundle PDP → ATC (fastest; make bundle facts true first).
3. **By moment:** Home → "For fireworks / settling a rescue" tile → curated products.
