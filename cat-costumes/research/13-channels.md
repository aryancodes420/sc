# 13 — Channels beyond the UK site: Etsy, Amazon UK, Amazon US, TikTok Shop UK, and shipping to the US/EU

Catwalk Club · researched 26 September 2026 · UK spelling. Every figure is **VERIFIED** (fetched today, URL given, or read from the repo) or **ESTIMATED** (method stated). Fee rates for Amazon UK/US, Etsy and TikTok Shop UK were verified in `05-marketplaces.md` §5 and are re-used here with their sources; everything about postage, customs, US fulfilment and AliExpress delivery to the US was fetched fresh today. Raw captures: `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/ch/` (`po_*.txt` Post Office price tables, `ali_US_*.html` AliExpress search pages, `pw_*.txt` rendered pages, `chmaths.py` for every table below).

Reference items throughout: the **Bow Tie Collar** (launch £8.99, regular £10.99, landed £1.82, ~50 g packed, Royal Mail large letter) and a **£12.99 costume** (Devil Bat Cape / Spider, landed £5.70 average, ~150 g packed, small parcel). Prices, landed costs, packaging (£0.35 / £0.60) and UK postage (Tracked 48 online £2.85 / £3.65) are the VERIFIED inputs from `01-maths.md` §1–3.

---

## 0. The answer in eight lines

1. **Every marketplace cuts the collar's contribution roughly in half and the costume's by 50–90%.** On our own site a single collar order leaves £7.18 and a costume £6.02; the best marketplace case is £4.63 (collar, Amazon FBA) and £3.40 (costume, Etsy). Amazon UK FBM at £14.99 leaves **£0.59** on a costume. ESTIMATED from VERIFIED fee rates, §3.
2. **TikTok Shop UK is the only marketplace that costs nothing to open and sits on the traffic we are already making.** No set-up, no monthly fee, 9% commission incl. VAT, up to £800 of TikTok-funded buyer vouchers, dispatch within 2 business days. VERIFIED (§2.4). It should go live with the site.
3. **Amazon UK is a collar channel, not a costume channel**, and only with FBA and the Professional plan once volume passes ~35 units a month; before that FBM Individual leaves £3.02 on a £9.99 collar against a shelf where the reviewed collars sell at £2.32–£6.82. §3.
4. **Etsy's fees are fine (about 12–15% all-in after VAT on fees) but the product is off-policy** until the owner has an item they genuinely designed; the creativity-standards page was blocked again today (403) so this remains unverified and must be read by hand before listing. §2.3.
5. **Shipping a single £12.99 costume to the US from the UK loses money on every method**: the cheapest tracked Royal Mail price is £11.25–£13.85 (VERIFIED, Post Office table) and the de minimis exemption ended on 29 Aug 2025 (VERIFIED, Executive Order) so duty now applies to every parcel. A £30+ basket with £9.99 delivery charged clears £8.73 via Royal Mail or ~£15 via Evri/Parcel2Go at £9.14 (VERIFIED price). §4.
6. **A US 3PL brings the landed cost of a £12.99 costume at the US door to ~£12.95 and delivery to 2–5 days; Amazon FBA US to ~£10.45 and 1–2 days; dropshipping from AliExpress Choice to ~£2.64 and 5–10 days** (VERIFIED delivery window "Oct 01–06" on 26 Sep). Only the last two make a single-item US order profitable, and each has a catch: FBA needs ~£3–5k of stock and a US importer set-up (contribution on a $14.99 cape is still negative); dropship delivers an AliExpress bag that the buyer could have bought for $5.99 on Amazon.com with 8,626 reviews. §4.3.
7. **The EU costs €3 per HS code per parcel since 1 July 2026 (VERIFIED, European Commission) plus VAT that we cannot pre-collect until the store is UK-VAT-registered (IOSS registration requires it — VERIFIED, GOV.UK).** Park the EU until VAT registration; the maths then works only for £30+ baskets. §5.
8. **Order to add channels:** own site (now) → TikTok Shop UK (this week) → US via the own site for £30+ baskets only (when a video gets US traffic) → Amazon UK collars FBM (November, after 20 real reviews) → Amazon UK FBA (at 35+ collar units/month) → Etsy (only with an own-designed product) → EU (at VAT registration) → Amazon US (not this year). Triggers with numbers in §7.

---

## 1. What was fetched today and what was blocked

| Source | Result | Used for |
|---|---|---|
| `https://www.postoffice.co.uk/mail/international-tracked?country=usa` (and `germany`, `ireland`) | 200, full weight/price tables | Royal Mail International Tracked prices to the US and EU (branch prices) |
| `https://www.postoffice.co.uk/mail/international-standard?country=usa` (and `germany`, `france`) | 200 | International Standard (untracked) prices |
| `royalmail.com` (price finder, international pages, business pages, help site) | 403 / 502 on every attempt (curl and Chromium) | Royal Mail online prices could not be read; the earlier price-finder capture showed "from £8.10", which equals the Post Office letter rate below, so branch and online are treated as the same for international |
| `https://www.parcel2go.com/parcel-delivery/usa` and `/content-hub/how-tariffs-affect-shipping-to-usa`, `/international-shipping-hub/business/eu-customs-changes` | 200 | Evri/UPS prices to the US, DDP notes, EU €3 duty explainer |
| `https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/` | 200 | US de minimis suspension (effective 29 Aug 2025), postal duty method |
| `https://taxation-customs.ec.europa.eu/eu-customs-reform_en` | 200 | EU €3 flat duty from 1 July 2026 |
| `https://www.gov.uk/guidance/register-for-the-vat-import-one-stop-shop-scheme`, `/guidance/exporting-to-the-usa`, `/export-goods` | 200 | IOSS prerequisites, zero-rating exports |
| `https://www.aliexpress.com/w/wholesale-<product>.html?shipCountry=US` (7 products) | 200; the page ignores `shipCountry` and renders for the US because the proxy egress is in the US (`"ship_to_country":"US"` in the payload) | US-market prices and "Delivery: Oct 01–06" windows on Choice listings; GB/DE windows could **not** be read |
| `https://help.etsy.com/hc/en-gb/articles/115014483627` (Fees and Taxes), `/115015672808` (How to Open a Shop) | 200 in Chromium | Etsy fee structure, set-up fee mechanics (amount not shown) |
| `https://www.etsy.com/uk/legal/creativity-standards` | 403 (DataDome) | Not bypassed; policy fit unverified |
| `https://seller-uk.tiktok.com/university/essay?knowledge_id=7753826522154754` and Academy search pages | 200 in Chromium | Seller fee definitions, 2-business-day dispatch rule, FBT existence |
| `https://sell.amazon.co.uk/fulfilment-by-amazon`, `/sell-online`, `https://sell.amazon.com/sell-online`, `/global-selling` | 200 | New-seller incentives, plan fees, FBA New Selection terms |
| `https://www.shipbob.com/fulfillment-cost-calculator/` | 200 | ShipBob's published example rate card (receiving, storage, pick fees) |
| `https://www.shipmonk.com/pricing` | 200 | Confirms a monthly minimum exists (amount by quote) |
| `https://supplychain.amazon.com/pricing` (Amazon MCF) | 200 but prices load by JavaScript/quote | not usable |
| `https://www.shopify.com/uk/pricing` | 200 | International card rate 3.1% + 25p; "Estimate and collect duties and taxes" and "Show prices in local currencies" listed as plan features |
| `help.shopify.com` Managed Markets / duties pages | 403 (Cloudflare) | Managed Markets fee not verified |
| `cbp.gov`, `help.royalmail.com`, `business.help.royalmail.com`, `evri.com` price pages, DuckDuckGo/Bing discovery | 403 / 404 / 502 / degraded | US duty rate for postal items, Royal Mail's US DDP handling, Evri direct prices — all ESTIMATED below |

---

## 2. Channel by channel: what it costs, how long to a first sale, fit

### 2.1 Summary table

| Channel | Set-up cost | Monthly cost | Per-order fees (VERIFIED unless marked) | Time to first sale (ESTIMATED, method in notes) | Fit for our seven | Status |
|---|---|---|---|---|---|---|
| **Own Shopify site (UK)** | £0 beyond the theme already built | £25 Basic (£19 paid yearly) | Shopify Payments 2% + 25p (3.1% + 25p international/Amex) | Days: whenever the first TikTok/Instagram clip lands; no platform gate | Best: full margin, our copy, our branding | Live |
| **TikTok Shop UK** | £0 ("No fees, no deposits and no hidden costs") | £0 | 9% commission incl. VAT on (net sales + customer-paid shipping + platform discount) − refunds; Pet Supplies = 9%; new-seller reduced rate exists but is not public; affiliate commission is seller-set; up to £800 TikTok-funded buyer vouchers | 1–3 weeks: registration/verification 1–5 days, then the first sale comes from the first video that gets a few thousand views with a product tag; the owner is filming anyway | Good for costumes in season and collars year-round; it is where "cat drip" clips already live | **Open this week** |
| **Amazon UK — FBM (Individual)** | £0 (product identifiers: GTIN/EAN needed or a GS1 exemption) | £0; £0.75 + VAT per unit | Referral 5% (price ≤ £10) / 15% (> £10) in Pet Clothing & Food, min £0.25, on price incl. delivery; refund admin 20% of referral; fees carry 20% VAT for a non-VAT-registered seller | 3–8 weeks: identity/bank verification (days to 2 weeks), then a zero-review listing on a shelf whose reviewed collars carry 636–3,201 reviews; first sale needs a keyword nobody else owns or Sponsored Products (no budget) | Collars only (5% tier under £10); costumes leave < £1 | November, after 20 real site reviews |
| **Amazon UK — FBA (Professional)** | Inbound shipment ESTIMATED £0.30/unit; prep £0.15/unit | £25 + VAT | Referral as above + Low-Price FBA fulfilment £1.73 (≤ 210 g standard envelope) / £1.87 (≤ 460 g) + 1.5% surcharge; storage £0.76 per cu ft (Jan–Sep), £1.51 (Oct–Dec); FBA New Selection: free storage 120 days and free removals for 100 units if the first shipment is within 90 days of the first buyable ASIN | Adds 1–2 weeks to FBM for check-in | Collars; costumes only if landed cost falls | At 35+ collar units/month (the £25 plan beats £0.75/unit at 34 units) |
| **Etsy UK** | One-time non-refundable set-up fee "varies by location", shown only at sign-up (ESTIMATED £12–25; the amount page returned 403) | £0 | $0.20 per listing per 4 months; 6.5% transaction on order total incl. postage; Etsy Payments 4% + £0.20 (UK bank); Regulatory Operating fee for UK sellers (percentage not captured; ESTIMATED 0.32%); Offsite Ads 15% on attributed orders while under $10k/yr (mandatory); 2.5% currency conversion if listing currency ≠ bank currency; VAT on all fees | 2–6 weeks: shop opens the same day; Etsy search favours new listings briefly, then reviews; first sale usually from search on a long-tail term ("cat bow tie wedding" is an Etsy autocomplete term, 07 §1) | Poor as-is: factory-sourced items are outside "handmade/designed by you" unless a design element is genuinely ours; Reddit buyers name Etsy as where they look for *quality* cat costumes (07 §2) | Only with an own-designed product |
| **Amazon US** | US tax interview (W-8BEN), a US-compliant listing, and for FBA an importer of record + freight; ESTIMATED £300–600 of one-off freight/broker costs for a first 200-unit shipment | $39.99 Professional (or $0.99/item Individual); linked global accounts pay the lower of $39.99 or the sum of regional fees | Referral 15% Pet Supplies, min $0.30; FBA small standard ≤ 2 oz $3.32 (item $10–50) non-peak, **$3.51 peak 15 Oct–14 Jan**; 4–6 oz $3.45; Low-Price FBA ~$0.86 less for items under $10; fuel/logistics surcharge on top (percentage not public); $50k of new-seller incentives (headline) | 6–12 weeks: account + tax + inbound freight + customs + check-in; and the shelf is deeper (Cat Apparel median 350 reviews, top item $5.99 with 8,626 reviews) | Poor at our costs: a $14.99 cape is negative after fees (§4.4); a $9.99 collar clears ~£1.50 | Not in this 12-month window |
| **US/EU orders on the own site (Shopify Markets)** | £0 to switch on; DDP labels need a carrier that offers them | £0 (Managed Markets fee not verified) | 3.1% + 25p international card rate; postage £9.14–£15.40 per order (§4.1); duty (US: rate ESTIMATED; EU: €3 per HS code VERIFIED) | Days once enabled; volume follows wherever the videos travel | Only £30+ baskets; never single items | US: at the first US-heavy video. EU: at VAT registration |

Sources: `https://www.shopify.com/uk/pricing`; `https://seller-uk-accounts.tiktok.com/account/register` and Academy article 7753826522154754 (05 §5.4, re-rendered today: `ch/pw_tt_newseller.txt`, `ch/pw_tt_search_sla.txt`); `https://sell.amazon.co.uk/pricing`, `/low-price-fba-rates`, `/fulfilment-by-amazon` (05 §5.1; `ch/amz_uk_fba.txt`); `https://sell.amazon.com/pricing`, `/global-selling`, Seller Central GABBX6GZPA8MSZGW (05 §5.2; `ch/amz_us_global.txt`); `https://help.etsy.com/hc/en-gb/articles/115014483627`, `/115015628847`, `/115015672808` (`ch/pw_etsy_fees.txt`, `ch/pw_etsy_open.txt`). Time-to-first-sale figures are ESTIMATED from the mechanics each page describes (verification steps, dispatch rules, review moats in 05 §1–2), not from any seller data.

### 2.2 Amazon UK — details that change the decision

- **Two tiers, one line.** "Pet Clothing and Food" is 5% at or under £10 and 15% above (VERIFIED, `sell.amazon.co.uk/pricing`, effective 5 Jan 2026). A £9.99 collar pays £0.50; a £10.49 collar pays £1.57. Never list a collar above £10 on Amazon.
- **Amazon's price is the shelf's price.** The reviewed bow-tie collars sell at £2.32–£6.82 with 564–3,201 reviews and "600–700+ bought in past month" (VERIFIED 05 §1.4). A £9.99 listing with zero reviews and no ad budget is a test of whether "breakaway + plaid + real-cat photos" can hold a premium; the honest expectation is single-digit units a month until reviews exist.
- **Dropshipping rules.** Amazon's policy requires the seller to be the seller of record and forbids packing slips or branding from a third party. The AliExpress-UK-warehouse Bandana Collar therefore cannot be fulfilled to Amazon orders from AliExpress (ESTIMATED from the published drop-shipping policy, not re-fetched today); it is a site/TikTok-only line.
- **FBA New Selection** (VERIFIED, `sell.amazon.co.uk/fulfilment-by-amazon`): free storage for 120 days and free removals for 180 days on 100 units of new-to-FBA ASINs if the first shipment is created within 90 days of the first buyable ASIN. That makes a 100-collar FBA test cheap once the Professional plan is justified.
- **New-seller incentives** (VERIFIED headline "£42,000 in incentives"; "10% back on your first £40,000 in eligible branded sales" requires Brand Registry, i.e. a registered trade mark — not something to chase this year).

### 2.3 Etsy — details

- Fee mechanics VERIFIED from the help centre today (`ch/pw_etsy_fees.txt`): listing $0.20; transaction 6.5% of the total order amount including postage; Offsite Ads 15% under $10,000 USD of trailing-365-day sales, 12% above, capped at $100 per order; 2.5% currency conversion when needed; a Regulatory Operating fee for UK sellers "charged on your order total, which includes item price, delivery and gift wrap" (the percentage sits on a linked page that was not rendered — ESTIMATED 0.32%); payment processing 4% + £0.20 for a UK bank account (VERIFIED 05 §5.3); "Etsy Payments processing fees are subject to VAT" (VERIFIED).
- Set-up fee: "a one-time, non-refundable shop set-up fee must be paid… helps us invest in support for new sellers, as well as enhanced security checks" (VERIFIED, `ch/pw_etsy_open.txt`); amount shown only at sign-up (ESTIMATED £12–25).
- Fit: Etsy's own description is "handmade, vintage, custom" (VERIFIED 05 §3). Our seven are factory goods from AliExpress Choice listings; describing them as "designed by" us would be a false claim (legal floor). The creativity-standards page could not be read (403). **Do not list the launch seven on Etsy.** A genuinely own-designed printed bandana or embroidered collar (a Route B/UK-maker product) is the Etsy candidate, and Bells & Whiskers (09-teardown-3) shows that a UK handmade collar seller lives on exactly that Etsy + own-site mix.

### 2.4 TikTok Shop UK — details

- Costs VERIFIED (05 §4–5.4; re-rendered today): no set-up, no monthly, 9% commission inclusive of taxes; Pet Supplies = 9% in the category sheet; a "new seller reduced commission period" exists but its rate/length is shown only after registration; "up to £800 in TikTok-funded vouchers" for new sellers; other seller-paid lines are TikTok Shop shipping labels (if used), FBT fees (if used), seller-funded vouchers and affiliate commission at a seller-set rate.
- Operations VERIFIED from the Academy search snippets today (`ch/pw_tt_search_sla.txt`): "sellers must make sure that the order status in Seller Center is updated to 'Shipped' within 2 business days of an order being placed"; a "UK 2-Day Shipping label" exists; free-sample requests from creators are expected to be fulfilled within 17 days (shipped by seller) for a video/LIVE. A "Rate Card for Shipped by Seller" (effective 15 July) and "Rate Card for Shipping Charges" exist in the Academy; the click-through failed, so **the label prices are not verified** — the table in §3 assumes our own Royal Mail Tracked 48 label at the online price.
- Fit: it is the only marketplace where the product page is the video. Costumes are a 14-week window (07 §4) and TikTok is where the window is widest. Affiliate commission is the one paid lever with a CAC you set in advance: at 15% on a £14.99 costume it is £2.25 per order, below the £3.01 contribution, so affiliate orders still clear ~£0.75 (§3); at 20% they break even. Set affiliate commission at 10–12% and only on the collars and £23.99+ bundles.

---

## 3. What each UK channel does to contribution per order (ESTIMATED arithmetic on VERIFIED rates; `ch/chmaths.py`)

Assumptions: launch prices; marketplace prices set with **free delivery to the buyer** on Amazon and TikTok (the shelf norm) at £9.99 collar / £14.99 costume; Etsy charges postage separately (£2.95 / £3.50) because Etsy buyers expect it; own Royal Mail Tracked 48 label at the online price (£2.85 large letter, £3.65 small parcel) on every seller-shipped channel; Amazon and Etsy fees carry 20% VAT because the store is not VAT-registered; returns allowance 5% (own site), 6% (Etsy), 8% (Amazon/TikTok, where returns are platform-driven) of the cost lost on a return (postage, packaging, fees and half the landed cost); monthly plan fees excluded from per-order rows.

| Channel | Item | Charged £ | Landed £ | Postage + packaging £ | Channel and payment fees £ | Returns allowance £ | **Contribution £** | % |
|---|---|---|---|---|---|---|---|---|
| Own site (UK), single item, £3.95 delivery charged | Bow Tie Collar | 12.94 | 1.82 | 3.20 | 0.51 | 0.23 | **7.18** | 55% |
| Amazon UK, FBM, Individual plan (£0.75/unit), free delivery to buyer | Bow Tie Collar | 9.99 | 1.82 | 3.20 | 1.50 | 0.45 | **3.02** | 30% |
| Amazon UK, FBA Low-Price rate, Professional plan (£25/mo separate) | Bow Tie Collar | 9.99 | 1.82 | 0.50 | 2.71 | 0.33 | **4.63** | 46% |
| Etsy UK, own dispatch, postage charged to buyer | Bow Tie Collar | 11.94 | 1.82 | 3.20 | 1.97 | 0.36 | **4.58** | 38% |
| TikTok Shop UK, seller-shipped, free delivery to buyer | Bow Tie Collar | 9.99 | 1.82 | 3.20 | 0.90 | 0.40 | **3.67** | 37% |
| Own site (UK), single item, £3.95 delivery charged | £12.99 costume | 16.94 | 5.70 | 4.25 | 0.59 | 0.38 | **6.02** | 36% |
| Amazon UK, FBM, Individual plan (£0.75/unit), free delivery to buyer | £12.99 costume | 14.99 | 5.70 | 4.25 | 3.60 | 0.86 | **0.59** | 4% |
| Amazon UK, FBA Low-Price rate, Professional plan (£25/mo separate) | £12.99 costume | 14.99 | 5.70 | 0.50 | 4.98 | 0.67 | **3.15** | 21% |
| Etsy UK, own dispatch, postage charged to buyer | £12.99 costume | 16.49 | 5.70 | 4.25 | 2.56 | 0.58 | **3.40** | 21% |
| TikTok Shop UK, seller-shipped, free delivery to buyer | £12.99 costume | 14.99 | 5.70 | 4.25 | 1.35 | 0.68 | **3.01** | 20% |

Fee build-ups: Amazon FBM collar = 5% × £9.99 + £0.75, × 1.2 VAT = £1.50; Amazon FBM costume = 15% × £14.99 + £0.75, × 1.2 = £3.60; Amazon FBA collar = (5% × £9.99 + £1.73 × 1.015) × 1.2 = £2.71, plus £0.30 inbound + £0.05 storage + £0.15 prep in the postage column (ESTIMATED); Etsy collar = (6.5% + 4% + 0.32%) × £11.94 + £0.20 + £0.15, × 1.2 = £1.97; TikTok = 9% × price.

Sensitivities (same script):

| Lever | Collar | Costume |
|---|---|---|
| Etsy Offsite Ads (15% on an attributed order, + VAT) | −£2.15 → contribution £2.43 | −£2.97 → **£0.43** |
| TikTok affiliate commission at 15% on an affiliate order | −£1.50 → £2.17 | −£2.25 → **£0.76** |
| Amazon UK Professional plan £25 + VAT spread over 35 units/month | −£0.86/unit | −£0.86/unit |
| Selling at regular prices instead of launch (+£2.00 collar / +£2.50 costume, keeping the £10 Amazon line for the collar impossible at £10.99) | +£1.9 on site/Etsy/TikTok; on Amazon the collar tips into the 15% tier: referral £0.50 → £1.65 + VAT, so the £2.00 rise nets only ~+£0.6 | +£2.1–2.4 everywhere |
| Costume boxed weight over 460 g (Amazon standard envelope limit) | — | FBA fee rises to the large-envelope £2.42 band: −£0.66 |

Reading: **the own site is worth £2.5–4 more per order than any marketplace**, which is the price of free traffic. On marketplaces the collars are the only line whose contribution survives fees and a competitive shelf price, and the costume only clears £3 where postage is not stacked on a 15% commission (FBA, Etsy, TikTok).

---

## 4. The United States

### 4.1 Postage from the UK (VERIFIED, Post Office branch prices, fetched 26 Sep 2026)

Royal Mail International Tracked, USA (Zone 4). "Aims to deliver worldwide in 5–7 working days"; full end-to-end tracking; £50 compensation included. A customs form is required. Source: `https://www.postoffice.co.uk/mail/international-tracked?country=usa`.

| Format | Max size | Weight | Price |
|---|---|---|---|
| Letter | 24 × 16.5 × 0.5 cm | ≤ 100 g | £8.10 |
| Large letter | 35.3 × 25 × 2.5 cm | ≤ 100 g | **£11.25** |
| Large letter | | ≤ 250 g | **£13.85** |
| Large letter | | ≤ 500 g | £15.40 |
| Large letter | | ≤ 750 g | £19.20 |
| Parcel | L+W+D ≤ 90 cm, no side > 60 cm | ≤ 250 g | £17.85 |
| Parcel | | ≤ 500 g | £23.15 |
| Parcel | | ≤ 1 kg | £29.55 |
| Parcel | | ≤ 2 kg | £33.65 |

Royal Mail International Standard (untracked, £20 compensation), USA: large letter ≤ 100 g £3.60 (letter rate shown for ≤ 100 g), parcel ≤ 250 g **£19.50**, ≤ 500 g £27.45, ≤ 1 kg £34.50 (`…/international-standard?country=usa`). The untracked parcel is dearer than the tracked large letter, so the large letter (a collar, a folded cape, a bandana) is the format that matters: **£11.25 for anything under 100 g, £13.85 under 250 g**. The Spider Costume and Lion Mane, which need a box (01 §3), fall into the £17.85 parcel band.

Parcel2Go to the USA (`https://www.parcel2go.com/parcel-delivery/usa`, VERIFIED): "tracked delivery services starting from £11.59"; **Evri Standard ParcelShop £9.14**; UPS Access Point £20.69 (£17.99 Smart Send); UPS Express Saver £22.69 (£19.99); "DDP options starting from just £9.11". Whether the £9.14 Evri service is the DDP one is not stated on the page (ESTIMATED: it is the cheapest economy service, 7–14 days). The Royal Mail online business rate ("International Business Tracked" via Click & Drop) could not be read (403).

### 4.2 US duty since 29 August 2025 (VERIFIED order; rate ESTIMATED)

- The Executive Order of 30 July 2025 (`whitehouse.gov`, fetched today) suspended duty-free de minimis treatment "for all countries" from **12:01 a.m. EDT on 29 August 2025**. Postal shipments pay either an ad valorem duty "equal to the effective IEEPA tariff rate applicable to the country of origin" or, for six months only (now expired), a flat $80/$160/$200 per item; the country of origin "must be declared". Our goods are **made in China** whatever warehouse they leave from, so the China rate applies, not the UK's.
- The tariff regime has moved since: the IEEPA tariffs were struck down by the Supreme Court on 20 Feb 2026 and replaced by a 10% Section 122 global tariff that itself expired on 24 July 2026 and was ruled unlawful at the Court of International Trade; the de minimis closure was kept in force by a separate order (context from `en.wikipedia.org/wiki/Tariffs_in_the_second_Trump_administration`, fetched today — a signpost, not a primary source). Parcel2Go's explainer (VERIFIED, fetched today) says "not much has changed… most parcels sent to the United States will be subject to duties and taxes… all commercial imports" and recommends DDP.
- **ESTIMATED duty on our parcels: 10–30% of declared value** (MFN duty on HTS 4201 pet apparel ~2.8% + Section 301 China duty 7.5–25% + whatever general tariff is in force on the day). On a £12.99 costume declared at retail that is £1.30–£3.90; the tables use £2.00 per single item and £4.00 per £30+ basket, paid by us under DDP. Under DDU the recipient pays it plus a carrier handling fee and the parcel waits — a returns and one-star generator. **Get a live DDP quote from Parcel2Go or Royal Mail Click & Drop before the first US order; do not guess.**
- VAT: exports are zero-rated once VAT-registered; before registration there is no UK VAT on the sale either (VERIFIED, `gov.uk/guidance/exporting-to-the-usa`: "You must not charge VAT for online sales to the US").

### 4.3 Four ways to fulfil a US order for a £12.99 costume (landed £5.70, ~150 g packed)

| Option | Product £ | Postage / fulfilment £ | Packaging £ | Freight in, duty, inbound £ | **Landed at the US door £** | Delivery time | Evidence and caveats |
|---|---|---|---|---|---|---|---|
| Ship from UK, Royal Mail International Tracked large letter ≤ 250 g | 5.70 | 13.85 | 0.60 | 2.00 duty (ESTIMATED, DDP) | **22.15** | 5–7 working days aim (VERIFIED) + customs | Price VERIFIED; the £11.25 ≤ 100 g band fits a collar or a bandana (→ £17.30 for a costume that packs under 100 g, £13.60 for a collar) |
| Ship from UK, Evri Standard ParcelShop via Parcel2Go | 5.70 | 9.14 | 0.60 | 2.00 (ESTIMATED) | **17.44** | ESTIMATED 7–14 days | Price VERIFIED; service level and DDP status of this exact service not stated |
| US 3PL (ShipBob-type), stock sent by air | 5.70 | 4.90 pick/pack + USPS (ESTIMATED $6.50) | 0.30 (3PL mailer) | 0.80 air freight (ESTIMATED £160 for a 200-unit carton) + 1.10 duty (ESTIMATED 20% of customs value) + 0.13 receiving ($35 first 2 hours, VERIFIED ShipBob, spread over 200 units) + 0.02 storage ($5/bin/month VERIFIED) | **12.95** | 2–5 days inside the US (ShipBob customer quote "5.2 days down to about 3.6", VERIFIED page, ESTIMATED for us) | ShipBob publishes only an example rate card (receiving $35/2 h, storage $40 pallet / $10 shelf / $5 bin per month, picks $0.26 after the included ones); ShipMonk confirms a monthly minimum set at ~80% of projected pick fees (VERIFIED concept, no figure). Expect ESTIMATED $100–250/month minimums |
| Amazon FBA US (Amazon.com orders only) | 5.70 | 2.60 (FBA 4–6 oz $3.45 non-peak VERIFIED; peak ESTIMATED $3.65) | 0.00 | 0.80 freight + 1.10 duty + 0.20 inbound placement (ESTIMATED) + 0.05 storage | **10.45** | 1–2 days Prime | Plus 15% referral and $39.99/month; needs an importer of record, US tax interview, GTINs; peak fees 15 Oct–14 Jan cover both selling seasons |
| Dropship direct from AliExpress Choice to the US buyer | 2.64 (ESTIMATED $3.50 incl. shipping; a comparable Choice bat cape shows **$2.33**, 196 sold, VERIFIED) | 0.00 | 0.00 (AliExpress bag) | duty status unverified (ESTIMATED included in Choice pricing since Aug 2025) | **2.64** | **5–10 days** ("Delivery: Oct 01 – 06" on Choice listings fetched 26 Sep, VERIFIED `ch/ali_US_cat-bat-cape-costume.html`) | No branding, no quality control, the seller's stock and price can change daily (sourcing.md saw a listing go to "1 left" overnight); the same product is $5.99 with 8,626 reviews on Amazon.com (05 §2.1) |

AliExpress US-market prices seen today for our product types (VERIFIED display prices, USD, ship-to US; "New shoppers save" promotions apply to first orders only): bat capes $2.33–$7.98; bow-tie collars $1.09–$3.05 (the $3.05 plaid breakaway collar shows 485 sold); lion manes $1.09–$11.36; pumpkin hats $1.09–$5.72; santa hat + scarf sets $1.09–$2.79; spider costumes $3.89–$27.24. Delivery windows on Choice items were uniformly "Oct 01 – 06".

### 4.4 Contribution per US order (ESTIMATED arithmetic; Shopify Payments 3.1% + 25p on international cards VERIFIED; returns 5% of cost lost)

| Route | Charged £ | Fees £ | Returns £ | **Contribution £** |
|---|---|---|---|---|
| Own site: single £12.99 costume, £9.99 delivery charged, Royal Mail Int. Tracked LL ≤ 250 g £13.85, DDP duty £2.00 | 22.98 | 0.96 | 1.01 | **−1.15** |
| Own site: £30+ basket (2 costumes + collar, £34.97), £9.99 delivery charged, Royal Mail Int. Tracked LL ≤ 500 g £15.40, duty £4.00 | 44.96 | 1.64 | 1.41 | **8.73** |
| Own site: same basket via Evri ParcelShop £9.14 (if DDP), duty £4.00 | 44.96 | 1.64 | 1.10 | **15.31** |
| Own site: single £12.99 costume from a US 3PL, £4.99 delivery charged (US-normal), 3PL all-in £7.25 incl. freight/duty share | 17.98 | 0.81 | 0.55 | **3.68** |
| Amazon US FBA: costume at $14.99 (£11.31): referral £1.70, FBA £2.60, freight/duty/inbound £2.15, returns 8% | 11.31 | 4.30 | 0.74 | **−1.58** |
| Amazon US FBA: costume at $16.99 (£12.82) | 12.82 | 4.52 | 0.76 | **−0.32** |
| Amazon US FBA: collar at $9.99 (£7.54), Low-Price FBA ESTIMATED $2.46 | 7.54 | 2.99 | 0.38 | **1.48** |
| Own site: single £12.99 costume dropshipped from AliExpress Choice, £4.99 delivery charged, product £2.64 | 17.98 | 0.81 | 0.11 | **14.42** (but see the caveats above: this is reselling a $2.33 AliExpress item to Americans at $24 with a 5–10 day AliExpress delivery) |

Reading: from the UK, the US is a **£30+ basket business with a £9.99 delivery charge**, worth £9–15 an order and realistically 20–40 orders a month if a video travels (01 §8 assumed 25). A US 3PL only pays once US volume is ~150+ orders a month (a $150–250 monthly minimum plus ~£12.95 landed cost against £3.68 per single order), which is not a year-one number. Amazon US does not work at these landed costs and prices (the reference product is $5.99 Prime with 8,626 reviews — 05 §2.1). Dropshipping is the one option where a single US costume order makes money, and it is the option that turns "UK-stocked, cat-fitted, real-cat video" into "AliExpress bag in 5–10 days".

---

## 5. The EU

### 5.1 Postage (VERIFIED, Post Office, Zone 1: Germany/Ireland/France)

| Service | Large letter ≤ 100 g | ≤ 250 g | ≤ 500 g | Parcel ≤ 250 g | ≤ 500 g | ≤ 1 kg | Delivery aim |
|---|---|---|---|---|---|---|---|
| International Tracked | **£9.95** | **£10.75** | £12.15 | £12.50 | £13.30 | £15.15 | 3–4 working days to Ireland, France, Germany, Spain, Netherlands, Switzerland, Belgium, Sweden, Austria, Luxembourg; 3–5 elsewhere in Europe |
| International Standard (untracked) | £3.80 | £6.15 | £7.65 | £9.80 | £12.05 | £14.90 | not stated on the page |

Sources: `https://www.postoffice.co.uk/mail/international-tracked?country=germany` (identical for `ireland`), `…/international-standard?country=germany` and `?country=france`.

### 5.2 Duty, VAT and product-safety rules

- **€3 per item type per parcel since 1 July 2026** on B2C consignments up to €150 from outside the EU, "abolishing the duty exemption applicable until 30 June 2026", temporary until 1 July 2028 (VERIFIED, `https://taxation-customs.ec.europa.eu/eu-customs-reform_en`, Council Regulation (EU) 2026/382). Parcel2Go's guide (VERIFIED) adds: charged per HS code, not per unit; mandatory Product Identifiers (GTIN/EAN-style) on low-value parcels from 1 November 2026; and that it applies whether or not the seller is IOSS-registered. Our costumes and collars sit in one or two HS codes (4201 for pet apparel/collars; a hat may classify separately), so £2.60–£5.20 per parcel.
- **VAT**: EU VAT (19–27%) is due on every consignment. IOSS lets the seller collect it at checkout and file monthly, but registering directly requires the business to "be registered for UK VAT" first (VERIFIED, `gov.uk/guidance/register-for-the-vat-import-one-stop-shop-scheme`). Until then the destination post collects VAT plus a handling fee from the recipient (ESTIMATED €3–6, e.g. Deutsche Post/An Post), which is the same conversion killer as US DDU.
- **GPSR**: the EU General Product Safety Regulation "came into effect on 13 December 2024" and affects UK businesses selling to EU consumers (VERIFIED snippet from `business.gov.uk` via Bing; the page itself returned 404). It requires an EU-established responsible person named on the product/packaging, traceability details and safety documentation. For cat collars and costumes that means appointing an EU responsible-person service (ESTIMATED £150–400/year) before the first EU sale. Northern Ireland is inside this regime.

### 5.3 Contribution per EU order (ESTIMATED; International Tracked prices VERIFIED)

| Route | Charged £ | Fees £ | Returns £ | **Contribution £** |
|---|---|---|---|---|
| Germany, single £12.99 costume, £6.99 delivery charged, Int. Tracked LL ≤ 250 g £10.75, €3 duty (£2.60) paid by us; VAT collected from the recipient by the post (no IOSS) | 19.98 | 0.87 | 0.88 | **−1.42** |
| Germany, £30+ basket £34.97, £6.99 delivery charged, Int. Tracked LL ≤ 500 g £12.15, €3 duty × 2 HS codes (£5.20) | 41.96 | 1.55 | 1.30 | **7.98** (£10.58 if one HS code) |

Reading: the EU is the US with cheaper postage and a flat duty; it is still a £30+ basket business, and it cannot be done cleanly until VAT registration (for IOSS) and an EU responsible person are in place. Ireland is the one EU market where our English-language TikTok content lands unchanged and postage is Zone 1; it is the first EU country to open.

---

## 6. Etsy, Amazon and TikTok as fulfilment or traffic sources for each other

- **Amazon FBA UK stock can serve other channels** ("Fulfil orders across channels — use FBA inventory for sales on other channels", VERIFIED `sell.amazon.co.uk/fulfilment-by-amazon`; MCF UK rates not fetched). At the 100-unit New Selection allowance this is a way to hold collars in a warehouse for £0 storage while testing Amazon; it does not change the per-order economics on the own site because MCF fees replace Royal Mail at roughly the same £2–3 (ESTIMATED).
- **Fulfilled by TikTok Shop (FBT) UK** exists ("Sign up for FBT for free", VERIFIED Academy search result); fees not read. Not needed at launch volumes.
- **Etsy Offsite Ads and TikTok affiliate are the only "paid" traffic that fits 01 §7's rule** (CAC known before the order, under the £6–9 ceiling): 15% Offsite Ads on a £16.49 Etsy order is £2.47 + VAT; a 12% TikTok affiliate on a £14.99 order is £1.80. Both are below the contribution of the order they bring, unlike cold Meta/TikTok ads at £20–40 CAC.

---

## 7. Recommended order to add channels, with the trigger for each

| # | Channel | Add when (trigger) | Why this order | What to do |
|---|---|---|---|---|
| 1 | **Own Shopify site, UK** | Now | £7.18 / £6.02 per single order — £2.5–4 more than any marketplace; every video links here | Launch; end the expired launch offer (01 §2) |
| 2 | **TikTok Shop UK** | This week, before the first video is posted | £0 to open; 9% is the lowest marketplace take; the £800 vouchers are launch-week discount money we do not have to fund; dispatch within 2 business days is already our promise | Register at `seller-uk-accounts.tiktok.com`; connect the Shopify catalogue with the TikTok app; list all seven at £9.99 / £14.99 free delivery so the TikTok price equals the site's price-plus-delivery; keep affiliate commission off until a creator is worth 10–12% on collars/bundles; send free samples only against a video commitment |
| 3 | **US orders on the own site (Shopify Markets), £30+ baskets only** | The first video with ≥ 30% US viewers, or 5 US "do you ship to…" comments/emails | £8.73–£15.31 per basket with £9.99 delivery charged; £0 set-up; the Halloween window is US-shaped (07 §2) | Enable the US market in GBP (no conversion fee); set a £30 minimum for US checkout and £9.99 delivery; buy DDP labels (Parcel2Go from £9.11–£9.14 or Royal Mail Click & Drop) — never DDU; declare "made in China" and the HTS code; expect 20–40 orders/month, not a channel |
| 4 | **Amazon UK, FBM Individual, collars only (Bow Tie; a second collar design if stocked)** | 1 November 2026 **and** ≥ 20 genuine site reviews **and** ≥ 50 collars in stock after October | £0.75/unit, no fixed cost; the 5% tier under £10 makes the collar the only SKU that clears £3; after Halloween the collar is the year-round line (07 §4) | Get a GS1 GTIN or exemption; list at £9.99 with free delivery; photograph on a cat; put "breakaway" and colour in the title; no costumes |
| 5 | **Amazon UK, FBA on the Professional plan** | Amazon collar sales ≥ 35 units/month for two consecutive months (the £25 + VAT plan beats £0.75 + VAT per unit at 34), or a second sub-£10 line is added | £4.63 vs £3.02 per collar; FBA New Selection gives 100 units free storage/removals if shipped within 90 days of the first ASIN | Send 100 collars in one carton; keep costumes off unless landed cost < £4 |
| 6 | **Etsy UK** | Only when a product is genuinely designed by the owner (printed bandana artwork, embroidered collar) — not before | Fees are fine (£4.58 collar / £3.40 costume) but factory goods fail Etsy's standards and the legal floor; Etsy is where Reddit buyers look for "quality" (07 §2) | Read `etsy.com/legal/creativity-standards` by hand; pay the set-up fee; list the designed item with "made-to-order in [town]" copy that is true |
| 7 | **EU orders on the own site (Ireland first)** | UK VAT registration (needed for IOSS) **and** an EU responsible person appointed; realistically when rolling turnover approaches £90k | £7.98–£10.58 per £30+ basket; €3 duty is flat and known; Ireland gets English content and Zone 1 postage | Register IOSS; add the responsible-person label; £30 minimum, £6.99 delivery, International Tracked |
| 8 | **Amazon US** | Not in the 12 months to Sep 2027 unless: a US-priced product with landed cost < $4 and price ≥ $12, ~£3–5k of stock capital, a freight forwarder/importer set-up, and a first inbound by August 2027 for Halloween 2027 (outside the window) | Negative contribution on a $14.99 cape; $39.99/month; peak FBA fees 15 Oct–14 Jan; the shelf is 8,626-review deep | Park; revisit with the collar at $9.99 (Low-Price FBA) as the only candidate |
| — | **US 3PL** | US own-site orders ≥ 150/month for two months | £12.95 landed and £3.68 per single order only beats ship-from-UK at volume; monthly minimums ESTIMATED $100–250 | Quote ShipBob/ShipMonk with real weights; until then ship £30+ baskets from the UK |
| — | **Dropship direct to US buyers** | Never as the brand's default; acceptable only for a clearly-labelled "ships from our supplier, 5–10 days" line if the US traffic is large and stock money is not | £14.39 on paper; destroys the "UK-stocked, cat-fitted, real-cat video" positioning and ships the same $2.33 item the buyer can get on Amazon for $5.99 | If used: separate collection, honest delivery copy, no "UK stock" claim on those pages |

**Legal floor on every channel:** no incentivised, imported or fabricated reviews (Amazon and TikTok also suspend for it); marketplace "was £X" prices must be real prior selling prices (DMCC Act 2024); no "vet-approved"/"safe for cats" claims without evidence (CAP); free-entry route on any TikTok giveaway; on US/EU pages state duties honestly ("duties included" only when a DDP label is actually bought).

---

## 8. Blocked or unverifiable today

| Item | Status |
|---|---|
| Royal Mail online/business international prices, Royal Mail's US DDP handling and fee | `royalmail.com` 403, `help.royalmail.com` 502 (Chromium); Post Office branch prices used, treated as equal to online for international |
| US duty rate on China-origin postal items in Sep 2026 | `cbp.gov` 403; White House EO VERIFIED for the mechanism; the current rate is ESTIMATED 10–30% and must come from a live DDP quote |
| Etsy creativity standards; set-up fee amount; Regulatory Operating fee percentage | `etsy.com/legal/*` 403 (DataDome); help-centre fee article rendered, but those two figures live on pages that were not |
| TikTok Shop UK shipping-label rate card, FBT fees, new-seller reduced commission rate | Academy articles exist (titles seen) but click-through failed; not bypassed |
| Amazon MCF (UK/US) fees; Amazon US inbound placement fee and fuel surcharge; Amazon UK EFN cross-border fees | Pages load prices by script or behind login |
| Shopify Managed Markets fee; duties-collection fee | `help.shopify.com` Managed Markets pages 403 |
| AliExpress delivery windows to the UK and Germany | Search pages render for the US regardless of `shipCountry`; UK "10–20 days" from `sourcing.md` stands |
| ShipBob/ShipMonk per-order all-in price for our parcel | Quote-only; example rate card VERIFIED, per-order figure ESTIMATED |
| GPSR guidance page | `business.gov.uk` and `gov.uk` URLs 404; the "13 December 2024" effective date is from the Bing snippet of the business.gov.uk page |
| Search-engine discovery | DuckDuckGo returned captcha (202) and Bing RSS returned unrelated results for every query |
