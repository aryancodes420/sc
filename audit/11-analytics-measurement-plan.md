# 11 — Analytics & measurement plan

Goal: make future decisions on **evidence**, not opinion — and, given low traffic,
lean on **diagnosis + qualitative** data rather than underpowered A/B tests.
Collect only what you'll use (data minimisation; aligns with L4 consent).

## Events to measure (the funnel)
| Stage | Event | Source | Why |
|---|---|---|---|
| Landing | `page_view` (home/collection/product) | GA4 auto + Shopify | Entry & drop-off |
| Discovery | `view_item_list` (collection view) | GA4 | Is discovery working? |
| Search | `search` + results count | GA4 | Search use & zero-results |
| Product | `view_item` | GA4 (Shopify GA4 native events) | PDP reach |
| Media | product image/video interaction | Clarity + custom | Are shoppers hunting for images they can't find? (proves the imagery gap) |
| Variant | variant/swatch select | custom | Option confusion |
| Intent | `add_to_cart` | GA4 native | Core micro-conversion |
| Cart | `view_cart` / drawer open | GA4 | Cart friction |
| Free-ship | progress-bar threshold reached | custom | AOV lever working? |
| Checkout | `begin_checkout` | GA4 native | Checkout initiation |
| Purchase | `purchase` | GA4 native + Shopify | Revenue |
| Content | FAQ open, delivery/returns click, review-section view | custom | Which objections dominate |
| Capture | email signup (popup vs footer) | custom | Popup value |
| Exit | scroll depth, rage-clicks, dead-clicks, exit page | Clarity | Where/why they leave |

## Tool stack (Basic plan-appropriate)
| Tool | Role | Notes |
|---|---|---|
| **Shopify Analytics** | Source of truth for sessions, conversion rate, AOV, top products | Built in |
| **GA4** | Funnel + acquisition + event detail | Use Shopify's native GA4 / Customer Events; respect consent |
| **Microsoft Clarity** | Session recordings + heatmaps + rage/dead-clicks | Free; **highest value at low traffic** — qualitative "why" |
| **Meta Pixel** | Only if running Meta ads | Gate behind consent; don't install speculatively |
| **Post-purchase survey** | "How did you hear about us?" + "What nearly stopped you buying?" | Shopify post-purchase or a free tool |
| **On-site objection micro-survey** | Exit/PDP: "What's stopping you today?" | 1 question; feeds copy/PDP fixes |
| **Support-inbox analysis** | Tag incoming questions (size, delivery, safety…) | Free, direct voice-of-customer |

## Instrumentation notes
- Use **Shopify Customer Events (web pixels)** for custom events so they respect the
  consent state — which must first be made functional (L4).
- Add **UTMs** to every ad/social link so acquisition is attributable.
- Keep a simple **funnel dashboard**: view_item → add_to_cart → begin_checkout →
  purchase, with step-to-step conversion %.

## Diagnosis guide — which problem is it?
| Symptom | Likely cause | How to confirm |
|---|---|---|
| Sessions but almost no `view_item` | Weak homepage/nav or bad traffic | Landing→PDP rate; Clarity on home; check UTM source quality |
| PDP views, low `add_to_cart` | Weak product presentation (no images/proof/price) | Clarity PDP recordings; objection survey; image-zoom attempts |
| `add_to_cart` but low `begin_checkout` | Cart friction / delivery cost surprise | Cart recordings; drop at free-ship threshold |
| `begin_checkout` but low `purchase` | Checkout friction / trust / payment | Shopify checkout analytics; abandonment reasons (S5) |
| High traffic, low everything | Poor traffic quality / product-market fit | Source breakdown; bounce; survey "were you looking for this?" |
| Good micro-metrics, no revenue | Pricing / trust / delivery expectations | Survey + support tags + returns reasons |

## Reporting cadence
Weekly: sessions, CVR, AOV, funnel step %, top exit pages, top support questions.
Monthly: qualitative themes from Clarity + surveys → next fixes. Don't over-report.
