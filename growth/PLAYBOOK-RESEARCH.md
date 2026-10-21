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
