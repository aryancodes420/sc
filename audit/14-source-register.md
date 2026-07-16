# 14 — Source register

Every external source cited in this audit, with publisher and access date
(**accessed 2026-07-16** unless noted). Primary/authoritative sources are
prioritised. Where a search summary reported a statistic, it is attributed to the
searched publisher; figures marked **[verify at source]** should be confirmed
against the primary page before being quoted externally, because they were read
via search-result summaries rather than the full primary document.

## Ecommerce UX research (primary)
| # | Title | Publisher | URL | Used for |
|---|---|---|---|---|
| S1 | Product Page UX Best Practices | Baymard Institute | https://baymard.com/blog/current-state-ecommerce-product-page-ux | Users' first action is images; image reliance |
| S2 | Product Details Page UX Research Studies | Baymard Institute | https://baymard.com/research/product-page | PDP content requirements |
| S3 | Provide at Least One 'In Scale' Image | Baymard Institute | https://baymard.com/blog/in-scale-product-images | Scale/size images (42% try to gauge scale) [verify at source] |
| S4 | Include Descriptive Text or Graphics for Some Product Images (52% Don't) | Baymard Institute | https://baymard.com/blog/product-images-descriptive-text | Annotated images |
| S5 | E-Commerce Cart & Checkout Usability Research | Baymard Institute | https://baymard.com/research/checkout-usability | Abandonment causes; guest checkout (19% abandon over forced account) [verify at source] |
| S6 | Image Gallery UX: Always Signpost Hidden Thumbnails | Baymard Institute | https://baymard.com/blog/truncating-product-gallery-thumbnails | Gallery thumbnail signposting |

> Note on Baymard statistics: the headline cart-abandonment figure (~70%) and the
> "unexpected cost / forced account / delivery timing" breakdown are widely
> reproduced from Baymard's research; exact current percentages should be read
> from S5 directly before external quoting.

## Performance (primary)
| # | Title | Publisher | URL | Used for |
|---|---|---|---|---|
| S7 | Web Vitals | Google / web.dev | https://web.dev/articles/vitals | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 |
| S8 | How the Core Web Vitals thresholds were defined | Google / web.dev | https://web.dev/articles/defining-core-web-vitals-thresholds | Threshold rationale, 75th percentile |
| S9 | Understanding Core Web Vitals and Google Search | Google for Developers | https://developers.google.com/search/docs/appearance/core-web-vitals | CWV as a ranking/page-experience signal |

## Accessibility (primary)
| # | Title | Publisher | URL | Used for |
|---|---|---|---|---|
| S10 | Understanding SC 1.4.3: Contrast (Minimum) | W3C WAI | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum | 4.5:1 normal / 3:1 large text (AA) |
| S11 | Understanding SC 2.5.5: Target Size (Enhanced) | W3C WAI | https://www.w3.org/WAI/WCAG21/Understanding/target-size.html | 44×44px target guidance |
| S12 | Understanding SC 2.5.8: Target Size (Minimum) | W3C WAI | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | 24×24px minimum (WCAG 2.2 AA) |
| S13 | Contrast Checker | WebAIM | https://webaim.org/resources/contrastchecker/ | Contrast-ratio method |

## UK law & consumer protection (primary / official)
| # | Title | Publisher | URL | Used for |
|---|---|---|---|---|
| S14 | The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 | legislation.gov.uk | https://www.legislation.gov.uk/uksi/2013/3134 | 14-day cancellation; pre-contract info; trader identity + geographic address |
| S15 | Online and distance selling for businesses | GOV.UK | https://www.gov.uk/online-and-distance-selling-for-businesses | Distance-selling trader obligations |
| S16 | Consumer contracts: distance sales | Business Companion (CTSI) | https://www.businesscompanion.info/en/quick-guides/distance-sales/consumer-contracts-distance-sales | Practical distance-selling guidance |
| S17 | Unfair commercial practices (CMA207) | CMA / GOV.UK | https://www.gov.uk/government/publications/unfair-commercial-practices-cma207/unfair-commercial-practices | DMCC Act banned practices incl. pressure selling |
| S18 | Fake reviews guidance (CMA208) | CMA / GOV.UK | https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf | Fake/commissioned reviews & aggregate ratings in scope |
| S19 | Price transparency guidance (CMA209) referenced within CMA207 | CMA / GOV.UK | https://www.gov.uk/government/publications/unfair-commercial-practices-cma207/unfair-commercial-practices | Drip pricing / partitioned pricing |
| S20 | The DMCC Act bans fake reviews | CMS Law (secondary, dated commentary) | https://cms.law/en/gbr/legal-updates/no-more-faux-five-stars-the-dmcc-act-bans-fake-reviews | Enforcement context; effective 6 Apr 2025; fines up to 10% global turnover |

## Competitor / category (observable features only)
| # | Site | Publisher | URL | Observed feature used |
|---|---|---|---|---|
| S21 | My Anxious Dog — Enrichment for Nervous Dogs | myanxiousdog.co.uk | https://myanxiousdog.co.uk/collections/enrichment | Direct competitor: whole brand positioned around nervous dogs; problem-based collection |
| S22 | Lords & Labradors — Anxious Pet collection | lordsandlabradors.co.uk | https://www.lordsandlabradors.co.uk/collections/anxious-pet | Problem-based "Anxious Pet" navigation; £75 free-delivery threshold |
| S23 | FunnyFuzzy UK | funnyfuzzy.co.uk | https://funnyfuzzy.co.uk/collections/mats-rugs | DTC pet brand: lifestyle photography, education blog, themed products |
| S24 | Pets at Home — Dog calming & anxiety | petsathome.com | https://www.petsathome.com/product/listing/dog/dog-healthcare-and-treatments/dog-calming-and-anxiety | Trusted incumbent: category breadth, reviews, delivery options |
| S25 | Millbry Hill / DryDogs / ZOOMADOG | various UK | https://millbryhill.co.uk/collections/pet-dog-snuffle-treat-mats ; https://drydogs.co.uk ; https://zoomadog.co.uk | Category price/feature reference points |

> Competitor sites could not be opened in-browser from this environment (firewall).
> Observations are limited to what public search results describe plus general,
> verifiable facts (e.g. a named collection existing). No competitor performance,
> conversion or traffic claim is made anywhere in this audit.

## Internal evidence (primary — this store)
| # | Source | Used for |
|---|---|---|
| I1 | Shopify Admin API (get-shop-info, search_products, get-product, search_collections), 2026-07-16 | Catalogue, pricing, image absence, collections — see `data/live-store-facts.md` |
| I2 | Theme repository `dog-nook-theme/` @ branch `claude/hello-erxv6t` (commit 4c9dd25) | All template/section/snippet/asset/CSS/JS analysis |
| I3 | `HANDOFF.md` (repo root) | Store/deploy context; product history; known gaps |
