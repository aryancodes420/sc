# 02 · Giant Paws benchmark (giantpaws.co.uk)

Researched 26 September 2026 for Catwalk Club. Sources: fresh fetches of
`https://giantpaws.co.uk/products.json`, `/collections.json`, `/sitemap.xml` and its four
child sitemaps, the homepage, 118 product pages, six info pages, the Loox review widget for
every product, and the 18 September crawl saved in `scratchpad/gp/`. Every number is tagged
**VERIFIED** (fetched, URL given) or **ESTIMATED** (method given).

## 1. The one-paragraph verdict

Giant Paws is not a costume competitor and its numbers do not transfer to a £7.99–£17.99 range.
It is a five-month-old Shopify store (oldest product created 3 May 2026) selling Maine Coon
cat *furniture* at a median price of **£109.99**, with no social channels linked anywhere on
the site, and it has been rebuilt at speed in the last fortnight: 56 products added and 42 of
62 surviving prices cut by 7–38% between our two crawls. It has **2 real reviews** in its
review app while its pages display "Rated 4.8/5 from 20 reviews" on 62 products and "4.9/5
from 5,000+ happy cat parents" on the homepage. The friend's £300/day is therefore
**2–3 furniture orders a day**, not a traffic figure, and the store's on-page mechanics are a
list of what Catwalk Club must **not** copy. The valuable thing the friend can give is the
private Shopify analytics (traffic source, conversion rate, AOV, ad spend) — not the storefront.

## 2. Catalogue size and shape

| Metric | 18 Sep 2026 (saved crawl) | 26 Sep 2026 (fresh) | Tag |
|---|---|---|---|
| Published products (`/products.json`) | 65 | **118** | VERIFIED |
| Added / removed in 8 days | — | +56 / −3 | VERIFIED |
| Variants (available) | — | 126 (121) | VERIFIED |
| Collections (`/collections.json`) | 15 | 17 | VERIFIED |
| Vendors | Giant Paws | Giant Paws 75 · PawHut 27 · COSTWAY 16 | VERIFIED |
| Product creation dates | — | 13 Sep: 81 · 12 Sep: 17 · 15 Sep: 8 · 19 Aug: 7 · 17–20 Sep: 4 · 3 May: 1 | VERIFIED |
| Images per product (avg) | — | 4.1 (one product has none) | VERIFIED |
| Blog article URLs in `sitemap_blogs_1.xml` | — | **514** articles + index | VERIFIED |
| Pages in `sitemap_pages_1.xml` | — | 26 (11 are breed guides) | VERIFIED |

Reading: 98 of 118 products were created on 12–15 September 2026. PawHut and COSTWAY are
UK-warehoused drop-ship brands (AOSOM group / Costway UK), and the public product tags still
carry internal workflow labels — `supplier-check-pending` (60 products), `production-images-pending`
(28), `delivery-check-pending` (10), `image-rights-pending` (10), `cat-suitability-unverified` (4),
`wayfair-shortlist-20260915` (7). VERIFIED from tag counts in `/products.json`. This is a
catalogue being generated faster than it is being checked.

Store age: the earliest `created_at` is **2026-05-03** (Highland Retreat tower). VERIFIED.
So "£300/day" is at most five months of trading history, and the current storefront is two
weeks old.

## 3. Price bands (26 Sep, lowest variant price per product)

| Band | Products | Share |
|---|---|---|
| £0–19.99 | 4 | 3% |
| £20–49.99 | 17 | 14% |
| £50–99.99 | 34 | 29% |
| £100–149.99 | 34 | 29% |
| £150–199.99 | 11 | 9% |
| £200–299.99 | 12 | 10% |
| £300–499.99 | 2 | 2% |
| £500+ | 4 | 3% |
| **Min / median / mean / max** | **£9.99 / £109.99 / £136.40 / £699.99** | VERIFIED |

Only 4 products sit in Catwalk Club's entire price range (£7.99–£17.99): the Mystery Gift Box
(£9.99), the Mess-Free Food Squeezer (£12.99), a compact litter tray (£19.95) and the AeroMat
pad (£19.99).

**Price movement between crawls (VERIFIED, 62 overlapping products):** 42 changed. 40 were
cut, by 7% to 38% (Highland Retreat £849 → £649.99; Feline Sovereign Spire £369.99 → £249.99;
Silver Lodge £269.99 → £179.99; Velvet Nest £79.99 → £49.99). Two bundles went **up** 20–22%.
Every `compare_at_price` that existed on 18 Sep was removed on those products; on 26 Sep only
15 variants carry a compare-at (all 12–15 Sep creations, e.g. Modern Vine £179.99 "was £340",
Paw Villian £74.99 "was £120"). A store cutting a third off its prices in a week is a store
that was not converting at the old prices.

## 4. Reviews: what the app holds versus what the pages say

**Review app:** Loox (`loox.io/widget/t9khQVjOTe/…?shop=8u0unj-bg.myshopify.com`). Fetching
`https://loox.io/widget/t9khQVjOTe/reviews` (shop-wide) and `/reviews/{product_id}` for all
118 products:

| Loox figure | Value | Tag |
|---|---|---|
| Total reviews in Loox, whole store | **2** | VERIFIED |
| Store average | 5.0 | VERIFIED |
| The Velvet Nest (bed) | 1 review (Joanna R., verified; bed arrived wrong size, praises WhatsApp service) | VERIFIED |
| The Atelier Loft 118 cm tower | 1 review ("I loved it!") | VERIFIED |
| Products with 0 Loox reviews | 116 of 118 | VERIFIED |
| JSON-LD `aggregateRating` on any product page | none (0 of 118) | VERIFIED |

**What the storefront displays instead (VERIFIED from 118 product pages + homepage):**

| Displayed claim | Where | Count |
|---|---|---|
| "Rated x.x/5 from N reviews" line under the title (hard-coded theme block, not Loox) | 62 product pages | sum of N = **1,060** |
| Products showing exactly 19–24 "reviews", all created 12–15 Sep 2026 | product pages | 50 |
| "4.9/5 from 5,000+ happy cat parents" | homepage hero strip | 1 |
| Five-star `<blockquote>` testimonials with first name + initial, "Customer review" | homepage | **63** (58 five-star, 3 four-star, 2 three-star) |
| Product cards "4.9/5 · 22 reviews" in cross-sell rails | product pages | on every page |

The "most-reviewed" products by displayed count are the Hearthside perch and Highland Retreat
(24 each), Ultimate Pawhouse and Cashmere Comb (22), Purr-celain and Taj MeowHall (21), then
44 products at exactly 20. These counts cannot be reconciled with 2 app reviews, 5 months of
trading, or products that are 11 days old, so **displayed review counts are not usable as a
sales proxy** and must not be treated as evidence of anything. Whether they are aggregated
supplier reviews or something else is not stated anywhere on the site.

For Catwalk Club this is the legal floor in action: our `RATING_SUMMARY` in `data.js` is
supplier-listing data and the checklist already says it must sit in its own labelled block with
written permission. Never let it become "Rated 4.8/5 from 585 reviews" under our own title.

## 5. A real sales proxy: Shopify's best-selling sort

Shopify computes `?sort_by=best-selling` from actual order history; products with no sales fall
back to the collection's default order. On `/collections/all?sort_by=best-selling` the ranked
run ends after **16 products**; from rank 17 the list is identical to the default order with
those 16 removed (verified by diffing against `/collections/all`). So **16 of 118 products have
ever recorded a sale** through this collection. VERIFIED.

| Rank | Product | Price 26 Sep | Created | Displayed "reviews" | Loox reviews |
|---|---|---|---|---|---|
| 1 | Silver Lodge 164 cm tower | £179.99 | 15 Sep | 20 | 0 |
| 2 | Scratch Central post | £59.99 | 12 Sep | 20 | 0 |
| 3 | Taj MeowHall 185 cm tower | £159.99 | 12 Sep | 21 | 0 |
| 4 | Highland Retreat 197 cm tower (SOLD OUT) | £649.99 | 3 May | 24 | 0 |
| 5 | Silver Velvet Nest 76 cm bed | £59.99 | 20 Sep | 0 | 0 |
| 6 | Mystery Gift Box | £9.99 | 19 Sep | 0 | 0 |
| 7 | Grand Cabinet-Fit 58 cm litter tray | £28.85 | 17 Sep | 0 | 0 |
| 8 | Cabinet-Fit 48 cm litter tray | £19.95 | 17 Sep | 0 | 0 |
| 9 | Misty Perch 143 cm tower | £219.99 | 15 Sep | 20 | 0 |
| 10 | Grand Summit 201 cm tower | £249.99 | 15 Sep | 20 | 0 |
| 11 | Atelier Loft 118 cm tower | £259.99 | 15 Sep | 20 | 1 |
| 12 | Willow Nook 99 cm tower | £284.99 | 15 Sep | 19 | 0 |
| 13 | The Velvet Nest bed | £49.99 | 12 Sep | 20 | 1 |
| 14 | AeroMat Chill Pad | £19.99 | 12 Sep | 20 | 0 |
| 15 | Ultimate Pawhouse tower | £129.99 | 12 Sep | 22 | 0 |
| 16 | Feline Sovereign Spire | £249.99 | 12 Sep | 20 | 0 |

Reading (ESTIMATED): sales are concentrated in towers at £130–£285 with a tail of £10–£60
add-ons. Shopify's best-selling ranking weights recent sales, and 14 of the 16 were created this
month, so the ranking mostly reflects the last two weeks. Products with the largest displayed
review counts (Hearthside 24, Cashmere Comb 22, Purr-celain 21) do **not** appear among the 16
sellers, which is further evidence the displayed counts are not sales-linked.

## 6. Apps and tooling (from script tags, app blocks and page handles)

| Tool | Evidence | Tag |
|---|---|---|
| Custom theme "Giant Paws Bespoke V6" (`theme_store_id: null`), current version named "Hero & comparison fixes — 22 Sep" | `Shopify.theme` object, homepage | VERIFIED |
| Loox (photo reviews) | app block + widget JS | VERIFIED |
| Klaviyo (email/SMS, onsite pop-up "10% off your first order", company_id V3VmdE); Klaviyo Reviews block flag present | `static.klaviyo.com` | VERIFIED |
| SEOAnt / "SEOWill AI SEO" (JSON-LD, broken-link redirect, instant-page preloading, HTML sitemaps) | `cdn.shopify.com/extensions/…/seowill-ai-seo-121` | VERIFIED |
| Shopify Inbox chat | `storefront/web-components/chat.js` | VERIFIED |
| Avada FAQ | `/pages/avada-faqs` in sitemap | VERIFIED |
| WhatsApp Business (+44 7356 016713) as the only external link on the site | `wa.me` hrefs | VERIFIED |
| Shop Pay / Shop app, UCP agent commerce endpoints, `agents.md` | `/.well-known/ucp`, `sitemap_agentic_discovery.xml` | VERIFIED |
| Shopify web pixels only; `facebookCapiEnabled: false`; no Meta pixel (`fbq`), TikTok pixel, GA4 tag, Hotjar or Clarity found in HTML | script scan of home + product pages | VERIFIED (absence in served HTML; a pixel could still be loaded via Shopify's pixel manager) |
| Payment icons: Amex, Apple Pay, Diners, Discover, Google Pay, JCB, **Klarna**, Maestro, Mastercard, PayPal, Shop Pay, UnionPay, Visa | footer | VERIFIED |
| Not present: Judge.me, Yotpo/Okendo (only as Klaviyo placeholder variables), Trustpilot, Rebuy, PushOwl, Gorgias | scan | VERIFIED |

## 7. Urgency and discount mechanics (what is on the page, and what it means)

| Mechanic | Detail (VERIFIED from HTML) | Legal read for Catwalk Club |
|---|---|---|
| Header LED ticker "YOUR SALE ENDS IN 03D 00H 00M 00S · Up to 30% off" | `<gp-sale-countdown data-mode="visitor_preview" data-duration="259200" data-deadline="" data-confirmed="false" data-campaign="header-3d-20260924">` — a rolling 3-day timer with no real deadline | **Do not copy.** A countdown that resets per visitor is a false time-limit (CPUT/DMCC Act 2024 banned practice). Our ticker runs to one fixed `SALE.ends` moment — keep it that way. |
| "10% off your first order · code FIRST" (ticker fallback + Klaviyo pop-up) | homepage, all pages | Fine. Same as our `WELCOME10`. |
| "● Going out fast!" pill on the product photo | 10 products incl. £674.99 bundle and £12.99 squeezer, no stock number shown | Do not copy without live inventory counts behind it. |
| "SOLD OUT / Notify · Ask about stock" | 5 products incl. the flagship | Fine. |
| "Regular price £55.00 · Save £20.01" cross-sell cards | 15 variants with compare-at; compare-at removed elsewhere after price cuts | Only lawful if £55 was genuinely charged for a meaningful period. Our regular prices must go live and be charged after 22 Sep for the same reason (see §10). |
| "£1,500 weekly draw — share a photo of your cat with their Giant Paws purchase"; "Previous winners: Milo, Luna, Nala"; page shows "Translation missing: en.gp_conversion.draw_steps" | `/pages/review-submission`, pill on every product | A purchase-gated prize draw with no visible free-entry route or terms. Our "Cat of the Month" already has a free route — keep it, publish terms, never show winners who do not exist. A £1,500 weekly prize against £2,100/week revenue is also not credible (ESTIMATED). |
| Mystery Gift Box £9.99 | rank 6 seller | Worth copying honestly: a low-ticket add-on lifts AOV. For us: a £4.99–£6.99 "surprise collar" from bow-tie/bandana stock. |
| Free standard UK delivery on all orders; 30-day returns; "24/7 chat support, email replies within 3 working hours" | homepage, collection page | Free delivery is affordable at a £110 median; at our £8–£18 it is not — keep £3.95 / free over £30. |
| "Find what my cat needs" 3-question quiz (size, space, budget) | all pages | Good pattern; ours exists (`page.quiz`). |
| Bespoke "tailored furniture" quotes "Estimated total £2,695–£4,995", 15–45 day lead time | homepage | Not relevant to us. |
| Bundles: 9 bundles £45.99–£699.99 described as "Save more by bundling", no saving figure shown; bundle prices rose 20–22% this week | `/collections/bundles` | Our bundles show the saving explicitly (£1.99). Better. |

## 8. Channels

| Channel | Finding | Tag |
|---|---|---|
| Instagram / TikTok / Facebook / YouTube / Pinterest links on site | **None.** Zero social hrefs in homepage, product, collection or info pages; the only external links are two `wa.me` WhatsApp links | VERIFIED |
| TikTok handles @giantpaws.co.uk, @giantpawsuk, @giantpaws | all return "Couldn't find this account" | VERIFIED |
| Instagram probe | HTTP 429 (rate-limited); cannot confirm either way | BLOCKED |
| Amazon / Etsy / eBay / TikTok Shop links or badges on site | none | VERIFIED (absence) |
| Etsy shop probe `GiantPawsUK` | HTTP 403 (blocked) | BLOCKED |
| Trustpilot `uk.trustpilot.com/review/giantpaws.co.uk` | HTTP 403 bot wall | BLOCKED |
| Search presence (DuckDuckGo HTML) | connection reset by proxy on every attempt; Reddit search redirected/blocked | BLOCKED |
| Organic SEO effort | 514 blog articles (breed size guides, "do Maine Coons need bigger litter trays", weight-limit explainers), 11 breed-guide pages, HTML sitemaps, SEOAnt JSON-LD | VERIFIED |
| Email | Klaviyo pop-up with phone-number field (SMS) | VERIFIED |

Reading (ESTIMATED): with no social presence linked and a two-week-old content library that
Google will not have ranked yet, £300/day cannot be organic social or SEO. The realistic
sources are paid search/Shopping or paid Meta traffic, or the figure predates the rebuild. This
is the single most important thing to get from the friend.

## 9. Orders per day implied by £300/day

Giant Paws' AOV is unknown; the friend has promised it. Bounding it from the verified price
list and the 16 sellers:

| Scenario | AOV assumption (method) | Orders/day at £300 | Orders/month | Tag |
|---|---|---|---|---|
| Tower-led | £180 (median of the 9 towers in the 16 sellers, £130–£285) | 1.7 | ~50 | ESTIMATED |
| Mixed basket | £130 (tower share ~55%, add-ons £10–£60 with mystery box / tray attach) | 2.3 | ~70 | ESTIMATED |
| Accessory-heavy | £60 (beds, trays, scratch post dominate) | 5.0 | ~150 | ESTIMATED |

Most likely **2–3 orders/day, 60–90/month** (ESTIMATED). At a Shopify-typical 1–2% conversion
that implies only **100–300 sessions/day**. If the friend's traffic is materially higher, the
conversion rate is low and the price cuts of the last week are the response.

What that means against our goal: £100,000 net in 12 months at Catwalk Club's blended gross
margin of roughly 55% (README table, £4.66–£7.50 gross per unit) and an ESTIMATED AOV of
£16–£20 after bundles and multi-buys needs on the order of **£250,000–£300,000 revenue, i.e.
35–50 orders a day** — 15–25× Giant Paws' order volume. Giant Paws' economics (few orders, high
ticket, free delivery, Klarna) are the opposite of ours (many orders, low ticket, postage
matters). Nothing in its storefront is a template for that volume.

## 10. What to ask the friend for — exact metrics, and how each changes our plan

Ask for screenshots or CSV exports from Shopify Admin → Analytics for the **last 90 days and
last 30 days** (both, because the storefront changed on 12–24 Sep):

| # | Ask for (exact Shopify report) | Why | How the number changes our plan |
|---|---|---|---|
| 1 | **Sessions by traffic source / referrer** (Analytics → Sessions by referrer, and by landing page) | Tells us whether £300/day is paid, organic, direct or email | If >50% paid: their playbook needs ad money we do not have; ignore their conversion numbers and use them only for AOV. If organic search dominates: their 514-article blog is the mechanism — we copy the *approach* (breed × occasion guides) at our own scale. If direct/email: they are trading on returning customers we will not have for months. |
| 2 | **Online store conversion rate**, split into added-to-cart, reached checkout, converted | Benchmarks our funnel before we have data | Their rate at £110 median will be *lower* than ours should be at £12. If they convert 1.5% on £110 items, we should plan on 2–3% and fall back to 1.5% as a floor in the forecast. Anything under 1% on their side says the price cuts were forced. |
| 3 | **AOV and units per order** (Analytics → Average order value; Orders report → line items) | Turns £300/day into orders/day and attach rate | Confirms §9. If their mystery box / tray attach is high, we build the £4.99 add-on and the bundle up-sell in the cart drawer at launch rather than in Tier 2. |
| 4 | **Orders per day, last 90 days, daily** (Orders export) | Shows trend before and after the rebuild and price cuts | If orders rose only after the 12–24 Sep cuts, "£300/day" is a post-discount number and the pre-cut baseline is what a new store with normal prices should expect. |
| 5 | **Marketing spend and ROAS** (Marketing → campaigns; Meta/Google ad account totals) | Whether £300/day is bought | Sets the ad budget we should expect to fund from sales: if they spend £100/day for £300/day, we should not expect ads to be profitable at a £16 AOV until reviews and a 3–5% conversion rate exist. |
| 6 | **Returning customer rate and email revenue share** (Klaviyo dashboard: attributed revenue %) | Whether Klaviyo is earning its fee | If email is >15% of revenue, install Shopify Email at launch with a welcome flow and a post-delivery "send us a photo" flow; Klaviyo only when list >2,000. |
| 7 | **Top products by units** (Analytics → Sales by product) with the date the Loox reviews came in | Confirms our §5 proxy and the product-count truth | If units are concentrated in 3–4 towers, we take that as confirmation that a launch range of 7 is not too small, and put filming effort on the 2 best sellers (bow tie, bandana) first. |
| 8 | **Shipping cost per order and carrier** (Shopify Shipping / carrier invoices) | Free delivery is their conversion lever | Their per-order cost on a 20 kg tower is £8–£15 (ESTIMATED); ours is £2–£3 large-letter. That supports a **free delivery over £20** test for us rather than £30, if their data shows the free-delivery threshold moved conversion. |
| 9 | **Refund/return rate and reasons** | Cat furniture "wrong size" appears in their one bed review | If their return rate is >8%, we keep the neck-measure fit content front and centre; fit is the same failure mode for costumes. |
| 10 | **What generated the on-page review counts and the £1,500 draw terms** | Due diligence, not a metric | If there is no lawful basis, we do not reuse any of their theme code or copy, and we do not adopt their app stack as a "proven" template. |
| 11 | **Klarna share of checkout** | Whether BNPL matters at their AOV | Irrelevant under £30 baskets; if Klarna is >20% of their orders, that is another reason their funnel does not transfer to ours. |

Ask for the raw numbers, not the summary card; the summary card in Shopify defaults to a
comparison period that hides trend.

## 11. What Catwalk Club should and should not take from this

**Take**

| Idea | Evidence it is used | How we apply it |
|---|---|---|
| Low-ticket add-on that sells (Mystery Gift Box, rank 6 of 16 sellers in 7 days) | §5 | £4.99–£6.99 "Surprise collar" from bow-tie/bandana stock; shows in cart drawer |
| Breed-specific content and size guides as the SEO engine | 514 articles, 11 breed pages | Our three blog drafts become a "sizes by breed" series (Maine Coon, Ragdoll, Sphynx, British Shorthair…) with neck ranges from `data.js` |
| WhatsApp as the support channel that customers mention unprompted | the one substantive Loox review praises it | Set the `CONTACT.whatsapp` number before launch |
| Quiz → shortlist | all pages | Already built; keep |
| Klarna/Shop Pay icons | footer | Already in theme |

**Do not take**

| Practice | Why |
|---|---|
| Displayed review counts with no review-app basis, "5,000+ happy cat parents", hard-coded five-star testimonials | Fabricated or unverifiable reviews — DMCC Act 2024 banned practice, CMA fines up to 10% of turnover |
| Rolling per-visitor 3-day countdown | False urgency — banned practice |
| "Was £120" reference prices on items that went live at the sale price | Unverifiable reference price |
| Purchase-gated £1,500 weekly draw with named "previous winners" | Needs a free entry route and published terms (CAP Code §8); winners must be real |
| "Going out fast!" without stock numbers | Unsubstantiated scarcity |

**One immediate action on our own store (found while comparing):** `site/assets/data.js` has
`SALE.active: true` with `ends: "2026-09-22T23:59:59+01:00"` — the launch-offer deadline passed
four days ago, so the ticker is sitting at zero with strike-through regular prices still showing.
Either set a new fixed deadline before publishing or set `active: false` and move each `price`
to its `list`. Leaving it as-is is exactly the practice §7 warns against. VERIFIED from the file.

## 12. Blocked or unverifiable

| Item | Status |
|---|---|
| Trustpilot page for giantpaws.co.uk | HTTP 403 bot verification wall |
| DuckDuckGo search (5 queries, 2 retries) | connection reset through the proxy every time; one 202 with an empty result page |
| Reddit search JSON (old.reddit and www) | 302 to consent/HTML, no JSON |
| Instagram handle probes | HTTP 429 |
| Etsy shop probe | HTTP 403 |
| Giant Paws' actual traffic, conversion, AOV, ad spend | private — awaiting the friend (§10) |
| Whether the 1,060 displayed "reviews" have any source | not stated on the site; Loox shows 2 |
