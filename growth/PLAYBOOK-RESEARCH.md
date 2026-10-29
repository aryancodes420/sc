# Playbook research: what the best operators do, with sources

> The knowledge base behind `CLAUDE.md` §4. Every line has a source and a date.
> **Add to it, don't start over:** when you research something new, add it here with its
> URL and date, and mark it ✅ confirmed (primary source or 2+ independent sources),
> ⚠️ contested, or 🔸 single or vendor source.
> Refresh anything older than 3 months before relying on it. Once the store has 2–3 weeks
> of its own data, **its own funnel beats every number here.**
>
> First compiled 2026-10-21 by three research agents. Google help pages carry no update
> date, so they are treated as current at that date.

---

## A. Google Shopping: launching a new account

### A1. Bids and CPC benchmarks (UK)
- 🔸 **UK pet products, Shopping:** average CPC £0.28–£0.48, median ROAS 5.1x (2025 data,
  240 UK accounts). Furniture runs £0.55–£1.10. Source: Visionary Marketing, 18 May 2026,
  https://visionary-marketing.co.uk/blog/google-shopping-for-uk-ecommerce-complete-guide
- 🔸 **Pet supplies:** CPC £0.33, CTR 1.14%, CVR 5.84%. Bidnamic (undated),
  https://www.bidnamic.com/google-shopping-for-pet-supplies. Skewed towards cheap
  consumables. Don't expect 5.8% CVR on a £60–£130 item from an unknown store.
- **What this means for this store:** £0.45 is at the top of the pet average. That average
  is weighted to cheap consumables, and a £60–£130 bed competes more like furniture.
  Starting points:

  | Product | Starting bid |
  |---|---|
  | Bed | £0.55–0.65 |
  | Steps / ramp / car steps | ~£0.45 |
  | Blanket | £0.30–0.35 |

  If impressions are thin after 3–5 days, raise bids 10–20%.
- **Max CPC ceiling** = breakeven CPA × expected CVR.

### A2. When to judge a product (⚠️ contested: no Google rule exists)
- **SKU Analyzer** (updated 13 Aug 2026),
  https://skuanalyzer.com/guides/wasted-spend/low-performers/
  - Minimum data before judging: **14–21 days and 200+ clicks** at 10+ clicks/day; **30 days
    and 100+ clicks** at 2–10/day.
  - With **0 conversions**: flag at **2× target CPA**, cut bids at **2×** over 30–60 days,
    exclude at **3×** over 60+ days. The same source also says 5× elsewhere.
- **OPTIMZD** (19 Sep 2026): make no exclusion decision below **50 clicks in 30 days**. £100+
  a month with 0 conversions is urgent.
  https://www.optimzd.io/en/blog/wanneer-product-uitsluiten
- **Visionary:** first conversions usually arrive in **7–14 days**; ROAS stabilises by
  **day 30–45**.
- **At £30/day ÷ £0.45 (≈66 clicks/day across 5 products), expect 14–30 days before any
  single product has enough data to judge.** Concentrating spend on 1–2 hero products
  shortens that.

### A3. Structure for weeks 1–4
- One Standard Shopping campaign. Priority is irrelevant with a single campaign.
  - Split product groups by item ID, or use one ad group per product if you want per-product
    negatives.
  - The bed's 4 sizes are 4 item IDs. Put the product name in `custom_label_0` so you can
    report and bid on the bed as a whole.
- 🔸 Manual CPC or Maximise Clicks for 4–6 weeks. A learning period of 7–14 days with no
  structural changes. Brand negatives from day one. Lionel Fenestraz, 26 Mar 2026,
  https://lionelz.com/en/blog/shopping-campaign-structure-google-ads-2026/
- ✅ **Location: United Kingdom, "Presence"** (not the default "Presence or interest"). You
  only ship to GB, so interest-only clicks from elsewhere can't convert.
  https://support.google.com/google-ads/answer/1722038
- ⚠️ **Search partners off** for month 1. Older studies show partners convert lower at a
  similar CPA. Also **turn off auto-applied recommendations**, which are reported to switch
  partners back on.
- ✅ **No device or schedule bid adjustments until there is conversion data.**
  https://support.google.com/google-ads/answer/2732132

### A4. When to leave manual CPC
- ✅ **Google's tROAS minimum** (Search/Shopping): **15 conversions in 30 days**, with
  ~4 weeks of conversion values recommended first.
  https://support.google.com/google-ads/answer/6268637
- ⚠️ **Practitioners want more:** 30–50 a month for 2 months (Lionelz). tROAS on about 12 a
  month "starves itself" (Visionary). PMax needs 30–50 in its first month.
- **Path:** Manual CPC → Maximise Conversion Value at ~15–30 a month → tROAS or PMax at
  30–50+.
- Google flagged that a bidding-system change from 17 Aug 2026 may cause tCPA/tROAS
  fluctuations.

### A5. Search terms hygiene
- ✅ Check **every other day** for the first few weeks, then weekly; review lists monthly.
  **Phrase match** negatives by default. The search terms report adds them as exact unless
  you change it. Store Growers, 6 Mar 2026,
  https://www.storegrowers.com/negative-keywords/
- **Keep separate lists:** irrelevant / competitors / products we don't sell / too generic.
- **Starter negatives for this range** (synthesis; confirm against real search terms):
  - free, diy, how to make, homemade, pattern, plans, sewing, crochet
  - second hand, used, ebay, gumtree, marketplace, wholesale, bulk, jobs
  - baby, toddler, step stool, loft ladder, pool, hot tub, caravan, wheelchair, boat,
    stair gate
  - electric blanket, weighted blanket, kennel, crate, rabbit, horse
  - **Competitor brands** go in their own list as they appear.
  - **Don't** pre-block "ikea" or "cat" before you have data.

---

## B. Feed and Merchant Center

### B1. Titles (✅ https://support.google.com/merchants/answer/6324415)
- Up to 150 characters; users usually see the **first ~70**.
- **Not allowed:** promo text, price, delivery claims, company name, CAPS for emphasis.
- **Brand in the title** only if it differentiates the product, which an unknown store
  brand doesn't.
- **Formula:** product type + key benefit + size/dimensions + material/colour.
- Say "water-resistant" for the blanket. Never "waterproof" unless it is.
- 🔸 A Producthero 2025 test of search-term titles reported +66% clicks and +14% CTR
  (seen secondhand only).

### B2. Categories and identifiers
- ✅ **`google_product_category`:**

  | Product | Category |
  |---|---|
  | Bed | **4434** Dog Beds |
  | Steps, ramp, car steps | **6973** Pet Steps & Ramps |
  | Blanket | **500084** Pet Bed Accessories |

  Taxonomy: https://www.google.com/basepages/producttype/taxonomy-with-ids.en-GB.txt
- `product_type`: one value, levels separated by " > ".
- **Custom labels:** product family, margin band, price band.
- ✅ **GTIN:** submit the supplier's GTIN only if it is genuine. Otherwise set
  `identifier_exists = no` (the app's "custom product" setting).
  https://support.google.com/merchants/answer/6324478

### B3. Images (✅ https://support.google.com/merchants/answer/6324350)
- **Not allowed:** promo text, watermarks, logos, borders or badges. Supplier images with
  overlays like "NON-SLIP!" get disapproved.
- Minimum 500×500 from 31 Jan 2027; ~1500×1500 recommended.
- Turn on automatic image improvements.

### B4. 🔴 Sale prices: this affects the bed today
- ✅ **The Google & YouTube app sends Shopify compare-at as `price` and the Shopify price
  as `sale_price`.** https://support.google.com/merchants/answer/15474557
- ✅ **UK rule:** the higher price must have been the valid price for **30 days within the
  past 200**, and the discount must be **>5% and <90%**.
  https://support.google.com/merchants/answer/9017019
- **What this means for this store:** it launched on 12 Oct, so no "was" price can qualify
  yet. **Remove compare-at prices for at least 30 days.** A "was" price that was never
  charged is also a misrepresentation and DMCC Act risk; the DMCC regime has been in force
  since 6 Apr 2025.

### B5. Shipping, returns and store quality
- ✅ **Merchant Center shipping:** handling time and transit time must match the site, and
  every surcharge must be disclosed.
- ✅ **Return policy** (window and cost) must match the site.
  https://support.google.com/merchants/answer/10220642
- ✅ **"Fast and free" annotation** needs free delivery within a country-specific time
  window. Dropship transit times rarely qualify.
  https://support.google.com/merchants/answer/9780562
- ✅ **Store Quality / Top Quality Store** (UK supported) measures:
  - delivery time and cost
  - return window and cost
  - image resolution and count
  - site speed
  - e-wallets
  - shop rating

  Changes take up to 30 days to show.
  https://support.google.com/merchants/answer/14261098
- ✅ **Shop ratings:** reviews from the last 24 months; most merchants qualify at 100+
  reviews; 3.5★+ needed for ads. **Enable Google Customer Reviews (free) now.**
  https://support.google.com/google-ads/answer/2375474

### B6. Free listings
- ✅ On by default for new accounts. They show on the Shopping tab, Search, Images, Lens,
  YouTube, Maps and Gemini. https://support.google.com/merchants/answer/13889434
- 🔸 **Modest value:** about 4–5% of Shopping clicks, with CVR about 18% higher than paid
  (ROI Revolution, 2020–21 data).
- **Sales from free listings are not Google Ads conversions.** Count them in Shopify.
- **A suspension removes free listings and ads together.**

---

## C. Conversion tracking

- ✅ **Only Purchase is Primary.** Add to basket and Begin checkout are Secondary: they
  show in "All conversions" and aren't used for bidding.
  https://support.google.com/google-ads/answer/11461796
- ✅ **Enhanced conversions:** Google & YouTube app → Settings → Google Ads settings →
  Enhanced conversions → on, then accept the customer data terms.
  https://support.google.com/google-ads/answer/13494537
- ✅ **Consent:** use Shopify's own cookie banner, or a third-party one integrated with
  Shopify's customer privacy API.
  https://help.shopify.com/en/manual/privacy-and-security/privacy/consent
- ✅ **Modelled conversions need 700 ad clicks in 7 days** per country/domain (page dated
  2021). At £30/day this store gets at most ~460 clicks a week. **So no modelling: buyers
  who decline cookies won't be counted in Ads.** Reconcile Ads conversions with Shopify
  orders every week. https://support.google.com/google-ads/answer/10548233
- ✅ **Verifying it works:**
  - Place a 100%-discount test order and check in **Tag Assistant** that the purchase tag
    fires with a value and a transaction ID.
    https://support.google.com/google-ads/answer/10989978
  - A test order that didn't come from an ad click won't appear as an Ads conversion.
  - Conversion statuses as of Jul 2026: Active, Needs attention, Misconfigured, Awaiting
    conversions (normal for 48h), Removed.
- 🔸 **A gap of more than 20%** between Shopify orders and Ads conversions over 7 days
  means tracking is broken (ScaleUp, Feb 2026).
- **Why Ads shows 0 conversions despite sales:**
  - Purchase is set to secondary, or isn't in the campaign's goals.
  - A legacy or duplicate tag is set as primary.
  - The wrong Ads account is linked.
  - The buyer declined consent and there's no modelling.
  - The sale came from a free listing or organic visit.
  - Reporting lag (conversions are attributed to the click date).
  - A third-party payment gateway.
  - A Merchant Center suspension breaks the integration.

---

## D. Misrepresentation: what gets new stores suspended

- ✅ **Google's policy:** https://support.google.com/merchants/answer/6150127
  - **Egregious, meaning suspension without warning:**
    - false identity or contact details
    - hiding the business location or **fulfilment source**
    - hiding the true shipping origin to imply local delivery
    - not disclosing all costs, including return shipping
    - burying handling times
    - return windows that start at purchase rather than delivery
    - undisclosed restocking fees
    - refusing refunds your own policy allows
  - Unavailable offers and **unreliable claims** (e.g. "relieves arthritis") get a 7-day
    warning first.
- ✅ **Baseline requirements:** at least one contact method; a return and refund policy with
  process and timelines; HTTPS checkout; a conventional payment method.
  https://support.google.com/merchants/answer/6363310
- 🔸 **Practitioner list of triggers** (metricfixer, 5 Aug 2026):
  - legal entity, address and phone inconsistent across site and Google
  - template policies
  - **fake countdown timers, stock warnings, purchase pop-ups**
  - **demo or imported reviews**
  - delivery times that don't separate handling from transit
  - **price, VAT or structured data that doesn't match the feed**
  - copied AliExpress/CJ descriptions

  https://metricfixer.com/publications/online-advertising/merchant-center-misrepresentation-audit-guide
- 🔸 **Appeals:** review takes up to 7 business days, with a ~1-week cooldown after the
  second failure. Appeals are finite; after that the suspension is permanent, and a new
  Merchant Center for the same business counts as circumvention. **Fix everything before
  the first review request.**

---

## E. Funnel benchmarks: diagnosing a store before it has sales

> Compiled 2026-10-21. Category Shopping CTR and CVR figures are old (2019), and
> bundle, upsell and BNPL uplifts are mostly vendor numbers. Treat these as orientation,
> not targets.

- ✅ **Check tracking first.** Store Growers found inaccurate conversion tracking in
  **54%** (66 of 122) of audited accounts. In the same audits: unmanaged search terms
  **61%**, titles misaligned with searches **32%**, PMax misconfigured **76%**, dynamic
  remarketing missing or broken **70%**. Dennis Moons, 16 Oct 2026,
  https://www.storegrowers.com/google-ads-mistakes/
- **Shopping CTR:**
  - 🔸 Average **0.66%**, top quartile **1.2%+** (16k campaigns, Jan–Sep 2025).
    https://focus-digital.co/average-google-ads-click-through-rate/
  - 🔸 Pet care 0.68%, home & garden 0.90% (2019 WordStream data via Store Growers, Jan 2026).
- 🔸 **Bounce rate:** ecommerce average 36–47%, mobile ~10 points higher.
  https://www.shopify.com/blog/bounce-rate
- **Add to cart:**
  - 🔸 Shopify average **4.6%**, top 20% **7.5%**, top 10% **9.6%** (Littledata, via Blend
    Commerce 2025).
  - 🔸 Dynamic Yield: 6.08%.
- 🔸 **Checkout completion:** average **45%**, top 20% **59%**. Pet stores run 50–60%
  (eightx, 29 May 2026).
- 🔸 **Session → order:**
  - UK median **1.85%** (gogochimp, 28 Jun 2026).
  - Home & garden median 1.62%.
  - Higher-ticket, considered items convert lower.
  - Pet care on Shopping is ~**1.07%** (2019).
- ⚠️ **Mobile vs desktop:** retail desktop 3.7% vs mobile ~2.0% (Contentsquare, Feb 2026).
  Mobile is 62.4% of UK sales, and Dynamic Yield shows the reverse. Segment your own data.
- **Rule of three:** zero sales in *n* clicks bounds CVR below 3/n at 95% confidence.
  100 clicks → <3%. 300 clicks → <1%.

## F. Kill, keep and scale: what practitioners use (⚠️ no consensus)

- 🔸 **Minimum data before judging:** 40–60 clicks or 1× target CPA. **Exclude** at 1.5×
  target CPA with 0 sales over 14 days, when CVR is below 1/3 of the category average, or
  when price is >10% above the main competitors. Lengow,
  https://www.lengow.com/get-to-know-more/exclusion-of-underperforming-products
- 🔸 **"2× rule"** (Jackson Blackledge, Echelonn, 9 Jun 2025): cut a product when spend
  reaches 2× its price without breaking even. Single anecdote, 674 products cut.
- 🔸 **100+ clicks with <2 sales** (Practical Ecommerce, 2021).
- 🔸 **Scale:** budgets **≤30% every few days**. Emmanuel Flossie (FeedArmy), Shopify AMA,
  5 May 2025.
  https://community.shopify.com/t/ama-recap-april-google-shopping-and-google-ads-with-emmanuel-flossie/412585
- ✅ **tROAS experiments** need 15+ conversions in 30 days.
  https://support.google.com/google-ads/answer/11204214
- 🔸 **Breakeven CVR** at £0.45 CPC, *assuming* a 40% contribution margin (replace with
  real landed costs):

  | Product | Price | Breakeven CVR |
  |---|---|---|
  | Bed (XXL) | £129.99 | 0.87% |
  | Car steps | £69.99 | 1.6% |
  | 2-in-1 steps/ramp | £59.99 | 1.9% |
  | Sofa steps | £49.99 | 2.25% |
  | Blanket | £39.99 | 2.8% |

  → **The higher-ticket items are the realistic Shopping heroes. The blanket works better
  as an add-on than as a cold-traffic product.**

## G. Trust and conversion levers for an unknown store

- ✅ **Baymard cart-abandonment reasons** (Sep 2025, excluding "just browsing"):

  | Reason | Share |
  |---|---|
  | Extra costs | 40% |
  | Delivery too slow | 20% |
  | Didn't trust the site with card details | 19% |
  | Forced account creation | 18% |
  | Returns policy | 13% |
  | Couldn't see total cost up front | 12% |
  | Not enough payment methods | 9% |

  https://baymard.com/lists/cart-abandonment-rate
- ✅ **Baymard product pages** (Mar 2026):
  - Show a total-cost estimate near Buy (67% of sites don't).
  - Link the returns policy on the product page (44% don't; 60% of users look there).
  - Include an image showing real size (37% don't).

  https://baymard.com/blog/current-state-ecommerce-product-page-ux
- ✅ **Show a delivery date, not a speed.**
  https://baymard.com/blog/shipping-speed-vs-delivery-date
- ✅ Separate "Returns" and "Shipping" links in the footer.
- ✅ **Reviews:** users trust 4.5★ from 57 ratings over 5★ from 4. Hide the rating widget
  below ~5 reviews. https://baymard.com/blog/user-perception-of-product-ratings
- 🔸 **UK shoppers:**
  - 91% want a simple way to contact support; 64.3% won't return after a failed delivery
    (Sendcloud, Jun 2025).
  - 82% reconsider when unexpected delivery costs appear; 55% name wrong delivery times as
    their top frustration (Ingrid, Mar 2026).
- ⚠️ **Shop Pay:** Shopify's "+50%" claim comes from an unpublished, self-commissioned
  study. A named case showed about 1–1.6% store-wide. Turn it on, but expect small gains.
- ✅ **BNPL** has been **FCA-regulated since 15 Jul 2026**. Use the provider's approved
  wording. 🔸 A 2021 Bain UK survey found 57% of merchants saw conversion rise and baskets
  20–30% larger.
- 🔸 **Abandoned-cart email:** about $6.77 revenue per recipient, top 10% $13.70 (Klaviyo,
  Oct 2026).
- 🔸 **Remarketing:** the minimum audience dropped to **100 users** (Search, Display,
  YouTube) in Dec 2025.
- 🔸 **Post-purchase one-click upsell:** median take rate 0.3% in one app's data, against
  vendor claims of 3–8%. Low priority.
- ✅ **UK legal minimum:** a 14-day right to cancel for distance sales. If the cancellation
  information is missing, the right extends by up to 12 months.
  https://www.businesscompanion.info/en/quick-guides/distance-sales/consumer-contracts-distance-sales

## H. Most-cited first-month mistakes (ranked by how often ~10 sources mention them)

1. A weak offer or price, or thin margin (under ~30% is called near-impossible).
2. A store that looks like a scam: no real contact details, vague returns, fake-looking
   social proof, copied supplier text.
3. Slow or opaque shipping and surprise costs. One anecdote: cutting shipping from 20 to 5
   days dropped refunds from 8% to 2%.
4. Broken conversion tracking (54% of audits).
5. Unmanaged search terms and titles that don't match searches.
6. Judging too early, or too little budget.
7. Merchant Center misrepresentation suspension.

## I. UK enforcement: tactics that are now illegal or high-risk

- ✅ **DMCC Act in force since 6 Apr 2025.** The CMA fines directly, up to 10% of global
  turnover.
- ✅ **Fake urgency and timers:**
  - The CMA fined **Wayfair £4.8m** and **Appliances Direct £1.2m** on **15 Oct 2026**.
    https://www.retail-insight-network.com/newsletters/cma-wayfair-appliances-direct-misleading-sales
  - CMA207: urgency and scarcity claims must be true.
    https://www.ashurstperkinscoie.com/en/insights/mind-the-nudge-the-dmccs-crackdown-on-manipulative-online-design/
- ✅ **Reference prices:** in **Emma Sleep** (judgment 30 Jul 2026), the company admitted
  breaches including a struck-through price on a new product never sold at that price, and
  countdown clocks. A "was" price beside a cheaper bundle price was also flagged.
  https://www.lewissilkin.com/insights/2026/08/03/uk-consumer-law-revolution-reference-prices-emma-sleep-case-update-high-cour-102nfr0
- ✅ **Fake or misleadingly presented reviews** are a banned practice (Sch. 20 para 13;
  CMA208). The CMA opened 5 review investigations on 27 Mar 2026. Showing imported
  AliExpress or Amazon reviews as your own is high risk (inference from the statutory
  definition).
  https://cms.law/en/gbr/legal-updates/no-more-faux-five-stars-the-dmcc-act-bans-fake-reviews
- ✅ **Drip pricing:** mandatory fees must be in the headline price (CMA209, Nov 2025).
- ✅ **Pre-ticked paid add-ons** were penalised in the Appliances Direct case. Keep any
  shipping-protection add-on unticked.

---

## J. Competitor price snapshot: what a shopper sees beside us (21 Oct 2026)

> Amazon UK product and Best Seller pages were read live with a London postcode. Pets at Home
> pages were read from their page data. Google Trends GB, 5 years.
> **Could not load:** the Google Shopping results page itself, Argos, eBay, ManoMano, The
> Range, Wayfair (403). **Re-check before any price change.** Amazon review counts are often
> shared across sizes. "Comparable" here means similar size and spec. Quality may differ, so
> check whether our item is the same factory product before concluding.

**Delivery:** most Amazon comparables arrive **next day** (22 Oct to London). We quote 2–9
business days on every product.

| Product | Us | Typical market | Position |
|---|---|---|---|
| Bolster bed M / L / XL / XXL | £59.99 / 79.99 / 99.99 / 129.99 | Amazon £28–£60 (Bedsure, Amazon Basics, Dreamcatcher). Pets at Home branded: Noble £50–60, Silentnight £70–80, Scruffs Harvard XL £99.99 / XXL £149.99 | 🔴 2–2.7× Amazon. ≈ branded Pets at Home |
| 3-step sofa steps 60×40×40 | £49.99 | Amazon £24–£29 (ROMROL £25.49, 643★; Nepfaivy £26.99, 2,036★; Pawchop £28.71). Premium tier £38–£46 | 🔴 ~1.8× market |
| 2-in-1 steps & ramp | £59.99 | Gardner Pet 2-in-1 **£39.99**, next-day, 2,107★, 100+ bought/month. Other convertibles £67–£70 | 🟡 at market. +£20 vs the leader, below other convertibles |
| Folding 4-step car steps (fabric treads) | £69.99 | Amazon fabric-tread £25–£30. Aluminium £49–£70 | 🔴 aluminium price for a fabric spec |
| Water-resistant blanket 170×210 | £39.99 | Amazon £23–£33 (PICK FOR LIFE #1 £32.99) | 🟠 20–75% above. **8 colours** are a real difference |

**Amazon URLs** (prefix `amazon.co.uk/dp/`):
- Beds: B0DJWKFS39, B0BBV27VMH, B0DJWK1VYK, B0F4XCVDXC, B0F1V8XW5J, B0F13RK113, B0DJWHDTXJ, B0BBV8483Y
- Steps: B0F7R3R5N8, B0BY4C2VHD, B08B85GB69, B0GXZFF3K4, B0CS6GZ4YQ
- 2-in-1: B0DRGDLCF8, B0DL4H3L9Z, B0H6QDZ23M
- Car steps: B0DWXN8QWD, B0CLHCXV91, B0DL4J6W35, B0D9M33FSF, B0FW4Y2KZR
- Blanket: B0FW3MY6LF, B09TY96848, B0C49HLLBT, B0DXVDFTRS

**Pets at Home:** P70485 (Silentnight), P71631 (Noble), P72096 (Scruffs Harvard).

### Demand (Google Trends GB, relative scores, not search counts)
- "dog steps" ≈ 51 and "dog ramp" ≈ 45, versus "dog car ramp" ≈ 9 and "orthopaedic dog
  bed" ≈ 1 on the same chart.
- "dog blanket" ≈ 1.6× "dog steps".
- "dog steps" is **+39%** year on year.
- 🔸 "ramp dog" and "stair steps for dogs" show ~6.6k searches/month each (SEO Monitor,
  seen only in a search snippet).

**Seasonality (index, 100 = average month):**

| Term | Oct | Nov | Dec | Peak |
|---|---|---|---|---|
| dog steps / ramp | 86–97 | 86–97 | 86–97 | **Jan–Feb (108–110)** |
| dog car ramp | 73–78 | 73–78 | 73–78 | Jul–Aug (131–146), low now |
| dog bed | 113 | 122 | 121 | — |
| orthopaedic dog bed | 116 | 123 | 131 | — |
| dog blanket | **131** | **157** | **154** | — |

### What the research recommends (owner decides prices)
1. **Hero: the 2-in-1 steps & ramp, ~£20/day.** It has the smallest price gap, the
   biggest and fastest-growing demand, the convertible niche is proven by Gardner Pet's
   volume, and January is a peak. The page must explain the £20 premium over Gardner Pet:
   - the 86cm ramp's gentler slope (state the angle) for dogs who shouldn't jump
   - 41cm steps that suit standard sofas
   - a video of it converting
   - the weight limit
2. **Second: the bed in XL/XXL only, ~£10/day test.** It has the strongest winter
   seasonality, and £100–£130 order value can absorb click costs. Position it against
   Silentnight and Scruffs, not Amazon. It needs proof on the page:
   - foam density (kg/m³) and solid-foam depth
   - internal sleeping area
   - liner and spare-cover availability
3. **Hold the 3-step and car steps** off paid traffic unless repriced, to about
   £29.99–£34.99 to compete. Car-step demand is at its yearly low.
4. **Blanket:** demand peaks in Nov–Dec. It works on cold traffic only at about £29.99 or
   with a gift angle. Otherwise keep it as the £30 add-on, which already exists.
5. **Everyone:** show a **delivery date** and a Christmas last-order date. Show who pays
   return postage on bulky items.

---

## K. Sourcing from Temu (checked 2026-10-21)

- ✅ **Temu UK Terms of Use, last updated 11 Jan 2026,** https://www.temu.com/uk/terms-of-use.html
  - §2.1: users must be "using the Services solely for personal (non-commercial) use".
  - §3.1: "for your own use, and not on behalf of or for the benefit of any third party".
  - §7.5: no use "for the benefit of another business unless explicitly permitted". Temu may
    refuse service, terminate accounts or cancel purchases if this is breached.
  - Dropshipping isn't named, but the clauses cover it.
- 🔸 **Enforcement** (seller blogs, unverified): Temu reportedly flags reseller patterns such
  as many single-item orders to different addresses or repeat purchases of one SKU. Results
  include order caps, cancellations and bans.
  https://branvas.com/blogs/news/temu-dropshipping-risks-alternatives
- 🔸 **Packaging is Temu-branded,** so the customer can tell where the item came from.
  ⚠️ This is a general claim from one seller blog and was **not verified for the BOFNL bed**.
  UK local-warehouse sellers may ship in their own cartons. Verify with a sample order.
  https://branvas.com/blogs/news/temu-dropshipping-risks-alternatives
- **What this means for this store:** Temu is acceptable for proving demand with the first
  few orders. Before scaling, move to a source that permits resale: the brand directly
  (BOFNL), CJ Dropshipping, or a UK wholesaler. A cancelled order after the customer has paid
  becomes a late delivery, then a refund or chargeback.

---

## L. Per-size Shopping titles for a Shopify store (checked 2026-10-21)

- ✅ **How this store's feed builds titles (from live data):** Merchant Center title = Shopify
  **SEO title** + variant name. Example: "Orthopaedic Bolster Dog Bed | The Dog Nook
  Medium". One SEO title is shared by every size, so a measurement in cm can't go there.
- 🔸 **The Google & YouTube app** has a "Product title preference" (SEO title or product
  title). There is no per-variant or metafield title option.
  https://community.shopify.com/t/feature-request-google-youtube-app-should-support-custom-metafields-for-product-titles/584385
- ✅ **Supplemental data source** (Google Sheets: columns `id`, `title`) overrides attributes
  of existing items, matched by ID. It can't add or remove products. The "Supplemental
  sources" tab only appears after enabling the **"Advanced data source management"** add-on
  (Settings → Add-ons). https://support.google.com/merchants/answer/14990942
- 🔸 **Shopify IDs work in supplemental sheets.** Cypress North's guide (5 Feb 2025) shows a
  `shopify_US_…` ID example. This store's IDs are `shopify_ZZ_<product>_<variant>`, exactly
  as Merchant Center shows them.
  https://cypressnorth.com/resources/guides/how-to-use-a-supplemental-feed-in-google-merchant-center-next-a-step-by-step-guide/
- 🔸 **Risk:** an Aug 2026 blog reports that Shopify is moving merchants to a new "Shopify App
  API" data source. Rules and supplements tied to the old feed ID may stop applying. Re-check
  the titles after any data-source change.
  https://www.4mdigitalconsulting.com/post/shopify-google-feed-migration-why-your-feed-rules-might-vanish-overnight
- **Rejected alternative:** renaming the Shopify variants to include cm. The live theme maps
  sizes by exact variant name (`dn-bed-checkout.liquid`: `case size_variant.title when
  'Medium'…`), so renaming would break the size picker and dimension labels.
- **Chosen method:** a clean SEO title in Shopify (base for every size) plus a supplemental
  sheet with per-size titles: `growth/merchant-center/bed-titles-supplemental.csv`. Size and
  cm sit inside the first ~70 visible characters, because size decides the click for a bed.

---

## M. UK keyword demand for the bed (Google Keyword Planner via Supermetrics, 2026-10-21)

✅ Primary data from the store's own Google Ads account (8576250915), location GB, English.
Bids are Google's top-of-page range.

| Keyword | Searches/mo | Top-of-page bid |
|---|---:|---|
| large dog bed | 9,900 | £0.15–£0.76 |
| dog bed for large dogs | 9,900 | £0.15–£0.76 |
| extra large dog bed | 2,400 | £0.18–£0.85 |
| memory foam dog bed | 2,400 | £0.19–£1.18 |
| washable dog bed | 1,900 | £0.16–£0.85 |
| xxl dog bed | 1,000 | £0.16–£0.73 |
| orthopaedic dog bed | 880 | £0.25–£1.49 |
| orthopaedic dog bed large | 720 | £0.22–£1.41 |
| dog bed with sides | 590 | £0.15–£0.79 |
| senior dog bed | 390 | £0.19–£1.32 |
| dog bed for arthritis | 390 | £0.20–£1.57 |
| bolster dog bed | 320 | £0.23–£1.07 |
| dog bed for old dog | 50 | £0.20–£1.44 |

All are rated HIGH competition. Notes:
- **"Memory foam"**: the Temu listing claims it, but our page says "foam-filled". Don't use
  it in ads until a sample confirms.
- **"Arthritis"**: health-adjacent, so keep it out of ad copy (CLAUDE.md §6).
- **Search text ads don't depend on Merchant Center product approval.** They go through normal
  ad review instead (usually about one business day).

---

## N. "No products displayed" / parked-domain flag: what fixed it for other Shopify stores (researched 2026-10-28)

> Shopify Community threads, read in full via their .json endpoints. All anecdotal; Google
> doesn't state exact triggers. Emmanuel Flossie (FeedArmy, Google Shopping specialist)
> answers most of them.

| Case | Their situation | What fixed it / advice |
|---|---|---|
| Rob, 2021 ([37777](https://community.shopify.com/t/google-merchant-centre-suspension-due-to-parked-site/37777)) | Parked site / "No products on website" despite live products | Checked the guideline list, **re-requested review → approved quickly**. Believed Google "was working from the old data" of its first crawl |
| Betty, 2021 (same thread) | Parked domain | Cause: an **old unused domain still connected to Shopify** whose pages 404'd. Advice: disconnect it |
| Boops, 2024 ([353668](https://community.shopify.com/t/merchant-center-products-disapproved-how-to-fix/353668)) | "Domain does not show any products" | **Added missing policies, completed product info, linked Google Ads**, requested review → all approved |
| Everman, 2024 ([367167](https://community.shopify.com/t/google-merchant-center-problems/367167)) | **Same wording as ours** ("problem identified with the domain of your online store") | Advice: business name, **address, email, phone, hours in the footer of every page**; **real product photos**, not edited/mock-up images; description below Add to cart |
| "Website needs improvement" cases ([221024](https://community.shopify.com/t/how-to-fix-website-needs-improvements-account-issue-in-google-merchant-centre/221024), [355098](https://community.shopify.com/t/google-merchant-center-website-or-online-store-needs-improvement-help-needed/355098)) | Similar account-level quality flags | Template images/text, broken links, policy links missing from the footer, **@gmail-style email instead of a domain email**, **testimonials shown without saying where they come from**, missing images |
| 2026 ([599865](https://community.shopify.com/t/google-shopping-feed-products-not-showing-or-getting-disapproved-on-shopify/599865)) | Products not updating from Shopify | Flossie: a known **Google & YouTube app sync bug**; fix is uninstall/reinstall the app. ⚠️ For us this risks restarting the initial review, so it's a last resort |
| 2026 ([599372](https://community.shopify.com/t/recurring-google-merchant-center-product-page-unavailable-issue-manual-recrawl-fixes-it-then-it-slowly-comes-back/599372)) | Recurring "page unavailable" | Suspected Shopify rate-limiting Googlebot, and variant URLs. Manual recrawl clears it |

**Applied to The Dog Nook (28 Oct):**
- ✅ Already in place: policies, contact page with a postal address, about page, no broken
  links (crawl verified), no template text, domain live, Google Ads linked.
- ❌ Gaps matching the advice above:
  - no phone number
  - email is @hotmail.com, not @thedognook.co.uk
  - address not in the footer
  - evergreen countdown live
  - review counts sourced from another listing, shown without saying where they come from
  - possibly edited product images

---

## O. Search terms in Shopping: how to control them (2026-10-29)

- ✅ Shopping has **no positive keywords**. Google matches searches to products from feed data
  (title, description, product type, category). We steer with titles, negatives and bids.
  https://support.google.com/google-ads/answer/6275313?hl=en
- ✅ **Negatives don't match close variants** (plurals, misspellings, synonyms), so add the
  variants yourself.
  - Broad negative: blocks if all its words appear, in any order.
  - Phrase negative: blocks that exact word sequence, with other words around it.
  - Exact negative: blocks only the identical query.
  - Negatives added from the search terms report default to exact match.

  https://support.google.com/google-ads/answer/2453972?hl=en ·
  https://support.google.com/google-ads/answer/7302992?hl=en ·
  https://support.google.com/google-ads/answer/7102466?hl=en-GB
- ✅ An **account-level negative list** applies to Search and Shopping inventory.
  https://support.google.com/google-ads/answer/11396330?hl=en
- 🔸 **Query sculpting** (advanced): 3 campaigns with the same products at High, Medium and
  Low priority.
  - The High campaign catches generic queries at a low bid. Its negatives push specific
    queries down to Medium/Low campaigns with higher bids.
  - Known pitfalls: Google doesn't always respect priorities, and campaign-level negatives
    apply to every product in the campaign.
  - Many advertisers now use a single Smart Bidding campaign instead.
  - For this store: only worth it after 2–4 weeks of search-term data and more budget.

  https://www.datafeedwatch.com/blog/negative-keywords-and-priority-settings-in-google-shopping ·
  https://www.storegrowers.com/google-shopping-campaign-priority ·
  https://nilsrooijmans.com/daily/?p=1644
