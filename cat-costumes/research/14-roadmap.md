# 14 — The twelve-month roadmap: 26 September 2026 to 30 September 2027

Written 26 September 2026 for Catwalk Club (UK Shopify store, seven launch products £7.99–£17.99 plus four bundles; owner has unlimited hours, no ad budget, real cats to film, and a friend's store as a benchmark). Goal: **£100,000 net profit in the 12 months to 30 September 2027**, net meaning after product, postage, packaging, payment and marketplace fees, returns, VAT, ad spend and fixed costs, before the owner's own income tax.

Every figure is tagged **VERIFIED** (fetched today or read from the repo; URL or file given) or **ESTIMATED** (method stated). This file adds no new market data of its own beyond two fetches (Shopify Capital eligibility, and a re-try of Royal Mail's Christmas dates, which was refused again); it assembles the unit economics in `01-maths.md`, the seasonality in `07-demand.md`, the channel and offer evidence in `05`, `10`, `11` and `12`, and the storefront findings in `09-teardown-1..5.md` into one month-by-month plan. The model that produced every table is `scratchpad/roadmap/model.py`; its output is `scratchpad/roadmap/out.json`. UK spelling.

---

## 0. The answer in eight lines

1. **£100k is reachable on paper only as Scenario C, and only if roughly £12–15k of the owner's own cash goes into stock in the next six weeks.** The goal path below needs 16,430 orders across five channels (own site organic, own site paid, TikTok Shop UK, Amazon UK collars, US), £365k of revenue, £22k of ad spend and £21k of VAT to leave £107k — a £7k buffer above the goal, which any one assumption missing by 7% removes. ESTIMATED from VERIFIED inputs (§3).
2. **The same evidence, read without optimism, says a good first year is £25–45k net** (base case £39k on 5,860 orders) and a poor one is £10–15k. The difference between the base case and the goal path is not effort; it is capital in October, a marketplace engine that starts from zero reviews, and one or two organic waves that the feed data says happen to about one post in ten. §4.
3. **The year is decided by 19 December.** Q4 2026 carries 24% of the goal path's orders and 31% of its profit in eleven weeks, and every later month's stock is bought with that profit; October alone is capped at ~200 orders and ~£4k of revenue by the £799 launch stock unless money goes in first (`01-maths.md` §9 VERIFIED). Halloween 2027's revenue is outside the window; only its cost is inside. §5.
4. **Christmas, not Halloween, is the UK moment** — 93–100% of Christmas-set reviews and the bow tie's biggest peak fall in Nov–Jan (`07-demand.md` §4 VERIFIED) — so the Christmas stock order on **10 October** is the single largest decision of the year, made two weeks after launch on fourteen days of TikTok data. §6, decision point 3.
5. **The store cannot lawfully take its first order in its current state**: `SALE.ends` is 22 September and every page still shows a struck-through regular price and a `00D 00H 00M 00S` ticker (VERIFIED in all five teardowns). Fixing it — regular prices as the base case — is also what lifts contribution per order from £7.76 to £11.11 (`01-maths.md` §2). Day 1 job. §6.
6. **Ads never lead in this plan.** They are switched on only after organic proof (35 orders a week for two weeks, or one clip past 50,000 views), only on £30+ Trio pages, only at ≤ £8 per order, and only from 15% of the previous week's contribution (`12-paid.md` §3–4). The goal path spends £22k on ads across the year and gets £8 of contribution per paid order after the ad — margin-neutral amplification, not a profit lever. §2.
7. **Honest probabilities:** Scenario A (organic only) **≈ 2%**; Scenario B (organic + ads) **≈ 3%**; Scenario C (B + marketplaces + US) **≈ 8%**. The probability of at least £50k is about 20%, of at least £20k about 55%, and of a loss (capital spent on stock that does not sell) about 10% if the owner funds the goal path. §9.
8. **The twelve decision points in §8 are where the plan changes** — the capital decision this week, the Christmas order on 10 October, the ads gate in mid-November, the 100-day read on 5 January, the range pivot on 1 March, and the Halloween 2027 order on 1 June are the six that move the outcome by more than £10k each.

---

## 1. Inputs the roadmap is built on

| Input | Value used | Status | Source |
|---|---|---|---|
| Regular prices £9.49–£21.49; launch prices 15–20% lower | Regular prices are the base case from Day 1 | VERIFIED | `site/assets/data.js` (`price`, `list`); `LAUNCH-CHECKLIST.md` price table |
| Launch offer status | `SALE.active: true`, `ends: 2026-09-22` — expired, still displayed | VERIFIED | `data.js` line 255; renders in `09-teardown-2..5` |
| Contribution per own-site order, regular prices, 60/25/15 single/bundle/£30+ mix | £11.11 pre-VAT (47% of £23.53 charged); £9.23 VAT-registered | ESTIMATED from VERIFIED prices, Royal Mail Tracked 48 £2.85/£3.65, Shopify Payments 2% + 25p | `01-maths.md` §4 |
| Bow tie real cost | $2.05 (not the $1.09 promo) → landed £2.84, contribution £8.09 not £9.14 | VERIFIED today's listing card | `10-buyers-and-range.md` §10 |
| Halloween Trio (£34.99) / Festive Trio (£36.99) contribution | £16.03 / £15.44 pre-VAT; scale-line CAC £8.02 / £7.72 | ESTIMATED from VERIFIED inputs | `10-buyers-and-range.md` §7; `12-paid.md` §2 |
| TikTok Shop UK | 9% commission incl. VAT, no set-up fee, 31-day introductory settlement, Tracked 24/48 required, 25 shoppable videos/day cap, free-sample and affiliate programmes | VERIFIED | `11-organic.md` §7 (seller-uk.tiktok.com articles) |
| TikTok Shop contribution per order | Bow tie £5.62 (no affiliate) / £4.42 (10% affiliate); costume £3.48; Halloween Pair £7.96; blended plan value **£4.80** | ESTIMATED | `11-organic.md` §7.3 |
| Amazon UK collars | 5% referral under £10, 15% above; Individual plan £0.75/unit, Professional £25/month; FBM bow tie at £9.99 leaves £6.93 pre-VAT at the repo cost, **£5.90** at the corrected cost | VERIFIED fee rates; contribution ESTIMATED | `01-maths.md` §1, §8; `05-marketplaces.md` §5.1 |
| Amazon UK bow-tie shelf | £2.32–£6.82, 636–3,201 reviews, "600+/700+ bought in past month" | VERIFIED | `05-marketplaces.md` §1.4; `08-ranking.md` #7 |
| US DTC order | £30+ basket + £9.99 delivery, International Tracked from £8.10; contribution £14.52, exports zero-rated | VERIFIED from-price; contribution ESTIMATED | `01-maths.md` §8 |
| VAT | £90,000 rolling threshold; Flat Rate 7.5% (6.5% first year) while ≤ £150k; plan uses 8% of UK takings once registered | VERIFIED threshold and rates; 8% ESTIMATED blend | `01-maths.md` §5 (gov.uk) |
| Seasonality | Costumes: 71–85% of reviews Oct–Jan; Christmas sets 93–100% Nov–Jan; bow tie every month, 36% Nov–Dec; bandana Apr–Jun | VERIFIED (supplier review dates) | `07-demand.md` §4 |
| Supplier lead time | China-direct 10–20 days; bandana UK-stocked dropship | VERIFIED | `sourcing.md` |
| Launch stock | 145 units, £799 landed; ~100 orders' worth | VERIFIED arithmetic | `01-maths.md` §9; `LAUNCH-CHECKLIST.md` §A |
| Shopify Capital (UK) | Minimum requirement "Sell on Shopify for at least 90 days"; offer by invitation from the underwriting model, not guaranteed; "repay as you sell" | VERIFIED today | https://www.shopify.com/uk/capital |
| Organic reach | Feed median 17,400 plays; top 10% ≥ 1.6M; 35% ≥ 100k; original-sound clips median 27,100 | VERIFIED (921 TikTok posts) | `11-organic.md` §2.1 |
| Bio-link click-through 0.3–1% of plays; site conversion 1.5% (1.0–2.5%) | Plan uses 0.5% and 1.5–2.0% | ESTIMATED | `11-organic.md` §8; `01-maths.md` §1 |
| Comparable order volumes | Bells & Whiskers 170–345/month after 5.5 years; Supakit 390–780/month after 9 years; Pipkin and Bella 50–105/month; Made By Cleo 5,700–11,500/month on 1,274 products | ESTIMATED from VERIFIED review counts | `08-ranking.md` §3 |
| Royal Mail Christmas last posting dates 2026 | Tracked 48 ~Sat 19 Dec, Tracked 24 ~Mon 21 Dec | ESTIMATED (royalmail.com returned 403 again today on two URLs) | `10-buyers-and-range.md` §4 |
| Giant Paws conversion rate, AOV, traffic sources | Not yet received | BLOCKED | `02-giantpaws.md` §10 |

---

## 2. The assumptions table — what has to be true for £100k

Each row gives the value the goal path needs, what the evidence says is likely, and what the plan does if the number comes in below the goal value. ESTIMATED unless tagged.

| Assumption | Goal path needs | Evidence says | Consequence if it comes in at the evidence value | Replace with real data by |
|---|---|---|---|---|
| **Stock capital in the first six weeks** | ~£2.5k by 30 Sep (Halloween + collars), ~£12k by 10 Oct (Christmas + wave 1), ~£17k of stock shipped in December funded from Oct–Nov contribution plus owner cash | Plan holds £799 (VERIFIED); no capital mentioned; Shopify Capital not possible before ~30 Dec (90 days, VERIFIED) | October capped at ~200 orders, Christmas at what October's £2–3k of contribution can buy: **base case £39k, not £107k** | Decision point 1, this week |
| **Own-site conversion rate** (organic sessions → orders) | 1.5% Oct, 2.0% Nov–Dec, 1.8% Jan–Sep | 1.5% base, 1.0–2.5% range (`01-maths.md`); Giant Paws' real figure pending | At 1.0% the same traffic gives two-thirds of the orders: goal path −£25k | Shopify Analytics, week 2; friend's figure |
| **Own-site organic sessions** | 14.7k (Oct) → 32.5k (Nov) → 45k (Dec) → 17–28k/month (Jan–Jul) → 42.5k (Sep); 60–85% from TikTok/IG/YT bio links | Needs 2–6M TikTok plays a month at a 0.5% bio click; the feed's top 10% clear 1.6M per post, so this is one wave post plus 25 median posts a month (`11-organic.md` §8) | If the account stays at median (17k plays × 30 posts = 0.5M/month): ~2,500 sessions, ~40 orders — the downside case | TikTok Analytics weekly from Day 7 |
| **Traffic by source (own site, goal path Nov–Dec)** | TikTok bio 40% · Instagram 15% · YouTube Shorts 5% · Facebook 3% · email/SMS 15% · direct + search 12% · paid 10% | Every UK cat brand's TikTok is under 700 followers (VERIFIED); email share is 0 until the list exists; search takes months | If email and direct do not reach 25% by December, Christmas repeat and gift orders fall by ~150 | Shopify "Sessions by referrer" weekly |
| **AOV, own site** | £24 Oct → £27 Nov–Dec (Trios, gift wrap, three-bow-tie set) → £25–26.5 Jan–Sep as AirTag collar, jumper, harness join the range | £23.53 at regular prices on the 60/25/15 mix; no bundle reaches £30 today (`01-maths.md` §4); Trios not yet built | At £23.5 flat: contribution per organic order £10.80 not £12.40, goal path −£11k | Shopify AOV weekly; friend's bundle attach rate |
| **Paid CAC on Trio pages** | ≤ £8 (scale line); paid orders 0 in Oct, 250–400/month Nov–Dec, 80–130 Jan–Jul, 200–320 Aug–Sep | Cold UK social £17–47 per order at £0.35–0.70 CPC and 1.5–2% CVR; only retargeting (£5–9) and Spark boosts of proven clips get near £8 (`12-paid.md` §2, §10) | At £12 paid orders lose money: switch off prospecting, keep retargeting; goal path −£15k and −3,000 orders | Meta/TikTok Ads Manager reconciled to Shopify UTMs, day 14 of ads |
| **TikTok Shop UK orders** | 150 (Oct) → 450–600 (Nov–Dec) → 200–400 (Jan–Jul) → 650 (Sep); ~29% of all orders | Hanhanle sold 11.7K of one bat cape on TikTok Shop US over ~two seasons (VERIFIED); no UK sold-counts obtainable (blocked); in-app tag-to-order rate unpublished, plan uses 3% of tagged-video views | If TikTok Shop delivers a third of plan: −£11k net, and December's stock order loses the cash it expected on 13 Nov | TikTok Shop Analytics from the first week of listing |
| **Amazon UK collars** | 80 (Nov) → 200 (Dec) → 200–450/month; page-one for "cat bow tie collar" with Sponsored Products at ~£1/order | Shelf is £2.32–£6.82 with 636–3,201 reviews; UK Cat Collars node median 1,092 reviews (VERIFIED); our listing starts at 0 reviews at £9.99 | Likely outcome 50–150/month: −£12k net | Amazon Business Reports, sessions and unit session % weekly from December |
| **Marketplace share of orders** | 48% (TikTok Shop 29%, Amazon 20%) | Own site is the higher-margin channel (`05-marketplaces.md` §6); marketplaces are needed for volume, not margin | Higher share = lower blended contribution (£4.80–5.90 vs £11–12); each 10 points of share moved from own site to marketplaces costs ~£9k at goal volume | Monthly channel mix |
| **US DTC** | 15–40 orders/month from November | Cat Apparel top 60 on Amazon US median 350 reviews, all Prime (VERIFIED); own-site US buyers must accept £9.99 delivery | Zero US orders: −£4k | Shopify Markets sessions by country |
| **Repeat purchase** | 12% of Nov–Dec collar buyers return by Sep 2027; 8% of Jan–Jun buyers buy again in-window; ~600 repeat orders in the year, counted inside the organic figures | Bow-tie buyers "second time I ordered", four colours for four seasons (VERIFIED reviews); no Catwalk data | Zero repeat: −£6k and the allowable CAC never rises above £8 | Shopify "Returning customer rate" from January |
| **Returns** | 5% own site, 8% marketplaces (inside contribution) | Supplier listings 4.6–4.8★; sizing is the top complaint (VERIFIED `07` §3) | At 10% own-site returns: −£0.45 per order, −£5k | Refunds report monthly |
| **VAT** | Registered from January 2027 (cumulative turnover passes £90k in December); 8% of UK takings thereafter; AliExpress purchases set up B2B so import VAT is recoverable | Standard scheme with unrecoverable goods VAT is ~13.6% (`01-maths.md` §5) | At 13.6%: −£14k | Accountant appointment in November |
| **Supplier lead time and quality** | 10–20 days every time; spider legs inspected; bow tie at $2.05; bat cape at $4.54 not $7.29 | VERIFIED lead time; bat cape cost uncertain (`sourcing.md`) | A 30-day December delay loses the Christmas window: −£20k | Sample invoice and first delivery |
| **Fixed costs** | £110–190/month plus one-offs £1,320 (samples, lighting, Amazon Pro from Nov, accountant, VAT set-up) | £800/year in Scenario A, £1,400 in C (`01-maths.md` §6, §8) | Small either way | Bank statement monthly |
| **The owner's hours** | Daily posting (7 TikToks + 7 Reels + 7 Shorts a week through December), packing up to 100 parcels a day in December, comments answered within the hour | The owner has unlimited hours; a 100-parcel day is ~5 hours of packing at 3 minutes each (ESTIMATED) | Packing displaces filming in December; plan a helper for 1–19 Dec at goal volume | — |

Reading: the goal path stands on **five** assumptions that are outside the owner's control or unproven — capital, a viral wave, marketplace conversion from zero reviews, an £8 CAC, and the friend's conversion rate — and on **four** that are inside it: the legal fix, the Trio, the daily posting, and the Christmas order on time. Everything the owner controls is done in October.

---

## 3. The goal path, month by month

Scenario C with every assumption in §2 holding. Orders are by channel; AOV is revenue ÷ orders across all channels (marketplace AOVs of £13–17 pull it below the £24–27 own-site figure); contribution is before ad spend; VAT applies from January; fixed includes one-offs. ESTIMATED throughout from the VERIFIED unit inputs in §1.

| Month | Own site organic | Own site paid | TikTok Shop UK | Amazon UK | US | **Orders** | AOV £ | Revenue £ | Ad spend £ | Contribution £ | VAT £ | Fixed £ | **Net £** | Cumulative £ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oct 2026 (from 26 Sep) | 220 | 0 | 150 | 0 | 0 | **370** | 20.96 | 7,755 | 0 | 3,149 | 0 | 530 | **2,619** | 2,619 |
| Nov 2026 | 650 | 250 | 450 | 80 | 20 | **1,450** | 24.56 | 35,611 | 2,230 | 15,003 | 0 | 490 | **12,283** | 14,902 |
| Dec 2026 | 900 | 400 | 600 | 200 | 30 | **2,130** | 24.66 | 52,517 | 3,550 | 22,293 | 0 | 190 | **18,553** | 33,454 |
| Jan 2027 | 300 | 80 | 200 | 200 | 15 | **795** | 20.98 | 16,682 | 940 | 7,021 | 1,284 | 790 | **4,008** | 37,462 |
| Feb 2027 | 340 | 100 | 250 | 240 | 20 | **950** | 21.14 | 20,088 | 1,140 | 8,419 | 1,539 | 190 | **5,550** | 43,012 |
| Mar 2027 | 420 | 120 | 330 | 280 | 25 | **1,175** | 21.32 | 25,049 | 1,340 | 10,449 | 1,919 | 190 | **7,000** | 50,012 |
| Apr 2027 | 460 | 130 | 370 | 320 | 25 | **1,305** | 21.32 | 27,828 | 1,460 | 11,612 | 2,141 | 190 | **7,821** | 57,833 |
| May 2027 | 500 | 130 | 400 | 350 | 25 | **1,405** | 21.35 | 30,002 | 1,490 | 12,527 | 2,315 | 190 | **8,531** | 66,365 |
| Jun 2027 | 500 | 130 | 400 | 350 | 25 | **1,405** | 21.35 | 30,002 | 1,490 | 12,527 | 2,315 | 190 | **8,531** | 74,896 |
| Jul 2027 | 500 | 130 | 400 | 350 | 25 | **1,405** | 21.35 | 30,002 | 1,490 | 12,527 | 2,315 | 190 | **8,531** | 83,427 |
| Aug 2027 | 600 | 200 | 500 | 400 | 30 | **1,730** | 21.74 | 37,613 | 2,750 | 15,716 | 2,907 | 190 | **9,868** | 93,296 |
| Sep 2027 | 850 | 320 | 650 | 450 | 40 | **2,310** | 22.69 | 52,411 | 4,060 | 22,042 | 4,057 | 190 | **13,735** | 107,031 |
| **Year** | 6,240 | 1,990 | 4,700 | 3,220 | 280 | **16,430** | 22.25 | **365,559** | 21,940 | 153,285 | 20,794 | 3,520 | **107,031** | |

Per-channel contribution used: own-site organic 46% of AOV (£11.04–12.65); paid £16.03 on a £35 Trio, less £8 CAC in the ad column; TikTok Shop £4.80 on £16.50; Amazon £5.90 on £12.98 plus £1 of Sponsored Products in the ad column; US £14.52 on £42.37. Retargeting floor £100–150/month; Halloween 2027 pre-season prospecting £600 (Aug) and £900 (Sep) at break-even.

### 3a. The traffic the goal path implies (ESTIMATED)

| Month | Own-site organic sessions | of which social bio-links | email + direct + search | Paid sessions (Trio pages, 2.5% CVR) | TikTok Shop tagged-video views (3% tag-to-order) | Amazon listing sessions (10% CVR) | TikTok plays needed at a 0.5% bio click |
|---|---|---|---|---|---|---|---|
| Oct 2026 | 14,700 | 12,500 | 2,200 | 0 | 5,000 | 0 | 2.5M |
| Nov 2026 | 32,500 | 22,750 | 9,750 | 10,000 | 15,000 | 800 | 4.5M |
| Dec 2026 | 45,000 | 29,250 | 15,750 | 16,000 | 20,000 | 2,000 | 5.8M |
| Jan 2027 | 16,700 | 10,000 | 6,700 | 3,200 | 6,700 | 2,000 | 2.0M |
| Feb 2027 | 18,900 | 11,300 | 7,600 | 4,000 | 8,300 | 2,400 | 2.3M |
| Mar 2027 | 23,300 | 14,000 | 9,300 | 4,800 | 11,000 | 2,800 | 2.8M |
| Apr 2027 | 25,600 | 15,300 | 10,200 | 5,200 | 12,300 | 3,200 | 3.1M |
| May–Jul 2027 (each) | 27,800 | 16,700 | 11,100 | 5,200 | 13,300 | 3,500 | 3.3M |
| Aug 2027 | 33,300 | 20,700 | 12,700 | 8,000 | 16,700 | 4,000 | 4.1M |
| Sep 2027 | 42,500 | 27,600 | 14,900 | 12,800 | 21,700 | 4,500 | 5.5M |

Conversion used: 1.5% (Oct), 2.0% (Nov–Dec, Sep), 1.8% otherwise. Social share of own-site sessions 85% in October falling to 60% as email and search build. For scale: 45,000 own-site sessions in December is the top of the range estimated for Supakit today (16,000–52,000/month after nine years, `08-ranking.md` #6). The TikTok plays column is the honest one — **4.5–5.8M plays a month in November and December** is three or four wave posts (top-10% clips at ≥ 1.6M) on top of daily median posting.

### 3b. Stock and cash the goal path needs (ESTIMATED; 1.45 units per own-site order, 3 per Trio/US order, 1.15 per marketplace order, £5.00 blended landed cost at regular-price mix)

| Month shipped | Units | Landed cost £ | Must be ordered by | Funded from |
|---|---|---|---|---|
| Oct 2026 | 490 | 2,460 | 26–30 Sep 2026 | **Owner cash** (launch plan covers £799 of it) |
| Nov 2026 | 2,360 | 11,810 | 10 Oct 2026 (Christmas wave 1 + collars) | **Owner cash** — October's contribution (£2.6k) has not arrived and TikTok Shop's October money pays out ~13 Nov (31-day introductory settlement, VERIFIED) |
| Dec 2026 | 3,520 | 17,580 | 1 Nov 2026 (top-up 15 Nov by air freight) | Nov own-site contribution (Shopify Payments pays in days) + owner cash ~£5k |
| Jan 2027 | 1,180 | 5,900 | mid-Nov 2026 (wave 2 range) | November contribution |
| Feb 2027 | 1,420 | 7,080 | early Jan 2027 | December contribution; Shopify Capital if offered (eligible from ~30 Dec) |
| Mar 2027 | 1,750 | 8,730 | early Feb 2027 (wave 3: harness, flower collar, spring plaids) | Prior month |
| Apr–Jul 2027 (each) | 1,930–2,050 | 9,600–10,300 | one month ahead | Prior month |
| Aug 2027 | 2,600 | 12,980 | early Jul 2027 (includes Halloween 2027 range ordered in June) | Prior month |
| Sep 2027 | 3,580 | 17,890 | early Aug 2027 | Prior month |

The cash requirement is front-loaded: roughly **£14k of owner money between now and 15 November** (£2.5k + £11.8k, less the £799 already planned, plus a ~£5k December top-up partly covered by November's own-site takings). From January the business funds itself on a one-month lag. Nothing else in this file matters if this row is not funded; without it the plan is §4's base case.

---

## 4. What the evidence actually supports — base case and downside

Same model, same unit economics, with the volumes the comparables and the feed data make likely rather than possible. ESTIMATED.

### 4a. Base case — organic works about as well as the evidence says it can; TikTok Shop and Amazon collars added on time; ads retargeting only; October stock-capped

| Month | Own site organic | Own site paid | TikTok Shop | Amazon UK | US | **Orders** | AOV £ | Revenue £ | Ad spend £ | Contribution £ | VAT £ | Fixed £ | **Net £** | Cumulative £ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oct 2026 | 120 | 0 | 60 | 0 | 0 | **180** | 21.17 | 3,810 | 0 | 1,585 | 0 | 530 | **1,055** | 1,055 |
| Nov 2026 | 260 | 20 | 180 | 20 | 0 | **480** | 22.00 | 10,560 | 330 | 4,352 | 0 | 150 | **3,872** | 4,928 |
| Dec 2026 | 340 | 30 | 240 | 60 | 5 | **675** | 21.99 | 14,841 | 450 | 6,126 | 0 | 150 | **5,526** | 10,454 |
| Jan 2027 | 120 | 0 | 80 | 60 | 5 | **265** | 19.36 | 5,131 | 160 | 2,108 | 0 | 450 | **1,498** | 11,951 |
| Feb 2027 | 140 | 0 | 100 | 80 | 5 | **325** | 19.26 | 6,260 | 180 | 2,570 | 0 | 150 | **2,240** | 14,192 |
| Mar 2027 | 170 | 10 | 130 | 100 | 10 | **420** | 19.75 | 8,297 | 280 | 3,396 | 0 | 150 | **2,966** | 17,158 |
| Apr 2027 | 190 | 10 | 150 | 120 | 10 | **480** | 19.71 | 9,461 | 300 | 3,875 | 0 | 150 | **3,425** | 20,583 |
| May 2027 | 200 | 10 | 160 | 140 | 10 | **520** | 19.48 | 10,131 | 320 | 4,154 | 0 | 150 | **3,684** | 24,266 |
| Jun 2027 | 200 | 10 | 160 | 140 | 10 | **520** | 19.48 | 10,131 | 320 | 4,154 | 0 | 150 | **3,684** | 27,950 |
| Jul 2027 | 200 | 10 | 160 | 140 | 10 | **520** | 19.48 | 10,131 | 320 | 4,154 | 0 | 150 | **3,684** | 31,633 |
| Aug 2027 | 230 | 20 | 200 | 160 | 10 | **620** | 19.57 | 12,136 | 1,070 | 4,962 | 0 | 150 | **3,742** | 35,375 |
| Sep 2027 | 320 | 40 | 280 | 200 | 15 | **855** | 20.18 | 17,252 | 1,570 | 7,063 | 1,329 | 150 | **4,014** | 39,389 |
| **Year** | 2,490 | 160 | 1,900 | 1,220 | 90 | **5,860** | 20.16 | **118,139** | 5,300 | 48,498 | 1,329 | 2,480 | **39,389** | |

This is a store doing 265–855 orders a month by the end of year one — already above Bells & Whiskers' estimated run-rate after five years, and inside Supakit's after nine. It crosses the VAT threshold in August 2027. It is a good outcome, and it is £60k short of the goal.

### 4b. Downside — no stock capital, no breakout clip, marketplaces late

| Month | Orders | AOV £ | Revenue £ | Ad spend £ | Contribution £ | Fixed £ | Net £ | Cumulative £ |
|---|---|---|---|---|---|---|---|---|
| Oct 2026 | 130 | 21.00 | 2,730 | 0 | 1,144 | 530 | 614 | 614 |
| Nov 2026 | 220 | 21.27 | 4,680 | 150 | 1,930 | 130 | 1,650 | 2,264 |
| Dec 2026 | 300 | 20.52 | 6,155 | 170 | 2,523 | 130 | 2,223 | 4,487 |
| Jan–Feb 2027 (each) | 130–140 | 18.5 | 2,430–2,560 | 130–140 | 1,004–1,063 | 130 | 744–793 | 6,023 |
| Mar–Jul 2027 (each) | 170–210 | 18.2 | 3,080–3,840 | 150–160 | 1,276–1,594 | 130 | 996–1,304 | 12,130 |
| Aug 2027 | 250 | 18.11 | 4,529 | 820 | 1,855 | 130 | 905 | 13,035 |
| Sep 2027 | 360 | 18.33 | 6,598 | 1,140 | 2,694 | 130 | 1,424 | 14,459 |
| **Year** | **2,530** | 18.93 | **47,889** | 3,340 | 19,759 | 1,960 | **14,459** | |

No VAT registration; the owner's hours earn roughly £5 an hour. This is the `01-maths.md` "£10–40k" band's floor and it is where a store that follows the plan but gets no wave lands.

---

## 5. The launch calendar

Dates VERIFIED where a source is named; otherwise ESTIMATED from the review-date seasonality in `07-demand.md` §4 and the lead times in `sourcing.md`. Today is Saturday 26 September 2026.

| Date | Event | What must be done by then | Source / status |
|---|---|---|---|
| **Sat 26 – Sun 27 Sep** | Legal fix and first post | Set `SALE.active` false, move every `price` to `list`, remove the ticker and every compare-at price on Shopify; first TikTok/Reel/Short goes up Sunday 27 Sep (Day 1 of the `11-organic` calendar) | VERIFIED defect (`data.js`; teardowns 2–5) |
| **Mon 28 – Wed 30 Sep** | Bulk order + samples in one shipment | Halloween SKUs, bow ties in three colours (at $2.05, not $1.09), bandana dropship live; the "sample" is the first unit out of the box — a separate sample cannot arrive before the bulk order must be placed | VERIFIED 10–20 day lead (`sourcing.md`); bow-tie cost `10-buyers` §10 |
| **Wed 30 Sep** | Decision point 1 — capital | £2.5k now, ~£12k by 10 Oct, or accept the base case | §8 |
| **1 Oct** | Cat of the Month round 1 opens (free entry route, published terms) | `LAUNCH-CHECKLIST.md` §I; CAP §8 | VERIFIED checklist |
| **1–5 Oct** | TikTok Shop UK registration; Shopify connected; two collars and five seasonal SKUs listed at site prices | Sole-trader ID, selfie video, bank in same name (VERIFIED requirements) | `11-organic.md` §7.2 |
| **8–20 Oct** | Launch stock lands (10–20 days from 28–30 Sep) | Count in, inspect every spider leg, weigh and measure every SKU on arrival, set inventory, film the on-body clips the same day, store opens to orders the day the boxes land | VERIFIED lead time |
| **Sat 10 Oct** | **Decision point 3 — Christmas order** (wave 1: knitted Santa set, snowflake bow collar, Santa bandana, everyday embroidered collar in four colours, bow tie in Christmas red/tartan; three sizes of order) | Lands 20–30 Oct for 1 Nov | `10-buyers` §9c wave 1 (VERIFIED listings) |
| **Wed 14 Oct** | Halloween "order by" date currently in `data.js` and on the announcement bar | Move it: stock lands 8–20 Oct, so the honest date is **Mon 26 Oct** for Tracked 48 (2–4 working days) / Tue 27 Oct for Tracked 24. Publish the real one; do not leave an order-by date that is earlier than the stock | VERIFIED `data.js` date; new date ESTIMATED from Tracked 48 window |
| **Mid-Oct** | Ads account built, pixel firing on a £1 test order, audiences created; £0 spent | `12-paid.md` §12 days 1–3 | VERIFIED Meta rules |
| **Tue 27 Oct** | National Black Cat Day (Cats Protection) — bow tie on a black cat content | Content only | ESTIMATED date |
| **Wed 28 Oct** | Last Halloween dispatch day (Tracked 48 to arrive Fri 30 Oct) | Then flip the homepage to Christmas on **1 Nov** (`10-buyers` §6) | ESTIMATED |
| **Sat 31 Oct** | Halloween | Decision point 4 — Halloween sell-through read | — |
| **Sun 1 Nov** | Christmas live: Festive Trio, red tartan bow tie, Santa set, gift wrap £1.99, gift note; Christmas cut-off on the top bar from 1 Dec | Wave 1 stock landed | `10-buyers` §4, §7 |
| **~13–14 Nov** | First TikTok Shop payout (orders from ~10 Oct, 31-day introductory settlement + 3 bank days) | Until then December's stock is funded from Shopify Payments takings and owner cash | VERIFIED settlement terms |
| **Mid-Nov** | Decision point 5 — ads gate; wave 2 order (AirTag collar, tuxedo bow tie, birthday set dropship, fleece jumper) for January | `12-paid.md` §3; `10-buyers` §9c | — |
| **Fri 27 – Mon 30 Nov** | Black Friday – Cyber Monday: the one lawful, dated, collection-wide reduction from prices genuinely charged since 26 Sep; announced with the end date; prices return on 1 Dec | Made By Cleo's dated 25% is the compliant pattern (`09-teardown-1`) | DMCC Act 2024 |
| **1 Dec** | Amazon UK collars go live (Individual plan, FBM), once ≥ 20 genuine site reviews exist; Christmas cut-off on the top bar | `05-marketplaces.md` §7 | VERIFIED fees |
| **Fri 11 Dec** | Christmas Jumper Day (Save the Children) — content | ESTIMATED date | — |
| **~Thu 17 Dec** | Site's Christmas order-by for Tracked 48 (Royal Mail ~Sat 19 Dec last 2nd Class/Tracked 48; ~Mon 21 Dec Tracked 24) — **confirm on royalmail.com in November; today's fetch was refused (403)** | Top bar from 1 Dec | ESTIMATED |
| **22 Dec – 3 Jan** | Post-Christmas: costumes delisted from TikTok Shop, "one for every season" three-bow-tie offer, Boxing Day email; no ads except retargeting | `11-organic` §7.4; `12-paid` §3 | — |
| **~30 Dec** | Shopify Capital eligibility window opens (90 days of selling) — an offer is not guaranteed | VERIFIED requirement | shopify.com/uk/capital |
| **Tue 5 Jan 2027** | **Decision point 7 — the 100-day read**; VAT registration filed if turnover passed £90k in December (register within 30 days of the end of that month; effective 1 Feb) | Accountant appointed in November | VERIFIED threshold |
| **January** | The dip: costume sales stop (mane, spider ≤ 5 reviews/month Feb–Sep VERIFIED); wave 2 lands; content shifts to "handsome collar", AirTag, birthdays | — | `07-demand` §4 |
| **1–12 Feb** | Valentine's window; red bow tie, tuxedo bow tie, "for my boyfriend's cat" gifting | Sun 14 Feb 2027 | VERIFIED trigger (`07` §6) |
| **Early Feb** | Wave 3 order (harness & lead, flower collar, spring plaids, small-dog bandana sizes) for March | `10-buyers` §9c | — |
| **1 Mar** | **Decision point 8 — range pivot** | — | — |
| **Sun 7 Mar** | Mothering Sunday (three weeks before Easter) — "cat mum" gift bundles | ESTIMATED date | — |
| **Sun 28 Mar** | Easter; spring plaids, flower collar; bandana peak begins (Apr–Jun, mostly dog owners) | VERIFIED bandana seasonality | `07` §4 |
| **Apr – Aug** | Summer: bandanas for cats and small dogs, wedding-season tuxedo bow tie (May–Sep), birthdays, harness; 3–4 posts a week; the small-dog extension | — | `10-buyers` §4 |
| **Tue 1 Jun** | **Decision point 9 — Halloween 2027 order** (dinosaur hoodie, pumpkin vest, bat wings, Christmas jumper; £3–5k) | Lands by July; live by 25 Aug | `10-buyers` §9c wave 4 |
| **Sun 8 Aug** | International Cat Day — content | ESTIMATED | — |
| **Wed 25 Aug** | Halloween 2027 range drops (US brands dropped 28 Aug in 2026, VERIFIED); pre-season prospecting from the year's profit | `04-competitors-us` §7.2 | — |
| **Sept 2027** | Pre-season orders; **decision point 11 — US/EU**; the window closes **Thu 30 Sep 2027** | — | — |

---

## 6. Month by month: what to do, what to watch, and where the plan changes

Each month has the goal-path target (from §3), the base-case target (from §4a), the jobs, the leading indicators that say which path the store is on, and the decision that month can trigger. Leading-indicator thresholds are ESTIMATED and tied to the `11-organic.md` §8.2 and `12-paid.md` §9 ladders.

### October 2026 (26 Sep – 31 Oct): launch, Halloween, and the capital decision

| | Goal path | Base case |
|---|---|---|
| Orders / AOV / revenue | 370 / £20.96 / £7,755 | 180 / £21.17 / £3,810 |
| Ad spend / net | £0 / £2,619 | £0 / £1,055 |

**Do:** fix the expired offer (Day 1); order stock (28–30 Sep); post daily from 27 Sep; register TikTok Shop and list; build the Halloween Trio (£34.99) as a Shopify Bundle; add colour variants to the bow tie; build the ads account and pixel but spend nothing; Cat of the Month round 1; open the store the day stock lands; film every product on a cat that day; ship every order Tracked 48 the same or next day; ask every buyer for a photo review on delivery + 3 days (Judge.me; never seed).

**Watch (weekly):** posts published (target 7 TikTok + 7 Reels + 7 Shorts); median plays (Days 1–7 ≥ 500; Days 8–14 ≥ 1,500; Days 15–21 ≥ 3,000); best post (≥ 5,000 / ≥ 25,000 / ≥ 100,000 by those weeks); followers (100 / 300 / 1,000 / 2,000 by Day 30); bio-link clicks ÷ plays (≥ 0.3%); sessions (≥ 50 / 200 / 500 a week); CVR (≥ 1% from week 2); orders (≥ 3 / 15 / 25 a week); TikTok Shop sample requests (≥ 3 by Day 21); stock cover per SKU; email list (≥ 25 in week 1).

**Decision points:** 1 (capital, 30 Sep), 2 (Christmas order size, 10 Oct), 3 (Halloween read, 31 Oct) — §8.

### November 2026: the Christmas ramp — the month the year is made

| | Goal path | Base case |
|---|---|---|
| Orders / AOV / revenue | 1,450 / £24.56 / £35,611 | 480 / £22.00 / £10,560 |
| Ad spend / net | £2,230 / £12,283 | £330 / £3,872 |

**Do:** homepage flips to Christmas 1 Nov (red tartan bow tie → Santa set → Festive Trio); gift wrap and gift note; 5–7 posts a week, Christmas content (the YouTube "cat christmas outfit" shelf is empty of real cats — own it with one honest video); TikTok Shop Open Collaboration at 10% on collars and bundles, target invitations to the creators whose October clips sold; December stock order by 1 Nov, air-freight top-up 15 Nov; wave 2 order mid-Nov; appoint an accountant (VAT, FRS, AliExpress B2B set-up); Black Friday plan: a dated, genuine, collection-wide reduction 27–30 Nov only; weekly email from the list; ads gate check mid-month.

**Watch:** orders per week (goal ≥ 300; base ≥ 100); AOV ≥ £26 with Trio attach ≥ 15% of orders; email share of orders ≥ 10%; reviews collected (≥ 20 genuine by 30 Nov — the Amazon gate); TikTok Shop share of orders and its 31-day cash lag; paid CAC on the Festive Trio (≤ £7.72 scale, > £15.44 stop); paid share of orders < 40%; stock cover ≥ 3 weeks on Santa set and red bow tie; returns < 5%.

**Decision point:** 5 (ads on/off), 6 (Amazon go/no-go) — §8.

### December 2026 (to ~17 Dec for gifts): peak

| | Goal path | Base case |
|---|---|---|
| Orders / AOV / revenue | 2,130 / £24.66 / £52,517 | 675 / £21.99 / £14,841 |
| Ad spend / net | £3,550 / £18,553 | £450 / £5,526 |

**Do:** Christmas cut-off on the top bar from 1 Dec (confirm Royal Mail's dates in November); Amazon UK collars live 1 Dec (Individual plan; switch to Professional when the month passes 40 units); daily email in the last week before cut-off; a packing helper for 1–19 Dec at goal volume (~100 parcels a day); after the cut-off, switch content and the homepage to "one for every season" collars and January's AirTag collar; delist costumes from TikTok Shop on 22 Dec; wave 2 lands; Shopify Capital eligibility from ~30 Dec.

**Watch:** on-time dispatch ≥ 98% (a late Christmas parcel is a refund plus a one-star review); orders per day in the 1–17 Dec window (goal ≥ 100; base ≥ 35); Amazon sessions and unit-session % (≥ 8% on the bow tie); Sponsored Products cost per order ≤ £1.50; cumulative revenue against the £90k VAT line; cash: December's stock bill vs November's takings.

**Decision point:** none scheduled — execute. The 100-day read is 5 January.

### January 2027: the dip, VAT, and the year-one read

| | Goal path | Base case |
|---|---|---|
| Orders / AOV / revenue | 795 / £20.98 / £16,682 | 265 / £19.36 / £5,131 |
| Ad spend / net | £940 / £4,008 | £160 / £1,498 |

**Do:** VAT registration if December crossed £90k (effective 1 Feb; the model charges it from January to be safe); AliExpress account converted to a VAT-registered business buyer before the first registered purchase (worth ~£1.10 an order, `01-maths.md` §5); wave 2 live: AirTag breakaway collar £12.99, tuxedo bow tie £9.99, birthday set (dropship), fleece jumper £16.99 — need-based, year-round, no welfare objection; 3–4 posts a week on the "handsome collar", AirTag and birthday pillars; Reddit as a member only (photo posts, no links); Amazon: add the embroidered everyday collar; sell-through of leftover costumes at a genuine, dated January reduction or hold for Halloween 2027 (they keep).

**Watch:** organic orders per month against the 60–120 band (`11-organic` §8.2: below 60 by March means the range, not the content, is the problem); returning-customer rate (first reading; goal ≥ 8% of Nov–Dec buyers by end-March); AOV holding ≥ £24 as the jumper and AirTag collar attach; Amazon reviews (≥ 10 by 31 Jan); TikTok follower count ≥ 5,000.

**Decision point:** 7 (100-day read, 5 Jan) — §8.

### February 2027: Valentine's, wave 3 order

| | Goal path | Base case |
|---|---|---|
| Orders / AOV / revenue | 950 / £21.14 / £20,088 | 325 / £19.26 / £6,260 |
| Ad spend / net | £1,140 / £5,550 | £180 / £2,240 |

**Do:** Valentine's window 1–12 Feb (red bow tie, tuxedo, gifting copy — "for my boyfriend's cat" is a verified trigger); wave 3 order early Feb (harness & lead £19.99, flower collar, spring plaids, small-dog bandana sizes); first always-on collar prospecting test at £10/day only if a retargeting set has been under the £4.57 bow-tie scale line for three weeks; Pinterest pins from existing stills (search traffic for "cat bow tie" and "cat christmas outfit" next winter); one Amazon Sponsored Products campaign on the bow tie at a £1.50 cost-per-order cap.

**Watch:** Valentine's orders vs January (goal +20%); Amazon share (goal 25% of orders; base 25%); paid CAC; the friend's numbers if they have arrived — replace the 1.5–2.0% conversion assumption and re-run the model.

### March 2027: spring, Mothering Sunday, Easter, and the range pivot

| | Goal path | Base case |
|---|---|---|
| Orders / AOV / revenue | 1,175 / £21.32 / £25,049 | 420 / £19.75 / £8,297 |
| Ad spend / net | £1,340 / £7,000 | £280 / £2,966 |

**Do:** Mothering Sunday 7 Mar gift bundles; Easter 28 Mar spring plaids and flower collar; wave 3 live; bandana repositioned "for Cats & Small Dogs" with measured S/M/L in cm ahead of its Apr–Jun peak; harness lifts the £30 basket on its own; "sizes by breed" blog series as the search engine (the Giant Paws 514-article approach at our scale, `02-giantpaws.md` §11).

**Watch:** own-site organic orders ≥ 60/month is the floor (`11-organic` §8.2); units per order ≥ 1.5; harness attach; small-dog share of bandana orders (a leading indicator for the small-dog range decision in June).

**Decision point:** 8 (range pivot, 1 Mar) — §8.

### April – July 2027: the collar base load and the small-dog extension

| | Goal path (each month) | Base case (each month) |
|---|---|---|
| Orders / AOV / revenue | 1,305–1,405 / £21.3 / £27.8–30.0k | 480–520 / £19.5–19.7 / £9.5–10.1k |
| Ad spend / net | £1,460–1,490 / £7.8–8.5k | £300–320 / £3.4–3.7k |

**Do:** bandanas (Apr–Jun peak, mostly dog owners — the bridge to small dogs); wedding-season tuxedo bow tie May–Sep; birthdays all year; 3–4 posts a week, character-account format (a named cat with a personality is what the 500k–1.3M-follower pet accounts are, `11-organic` §2.3); TikTok Shop affiliates on collars at 10%; Amazon range to four collar SKUs plus the AirTag collar; a Royal Mail business account once the run-rate passes ~1,000 parcels a year (business Tracked 48 rates were not obtainable — ask for the quote); Halloween 2027 samples ordered in May, bulk in June; monthly model re-run with real CVR, AOV, repeat rate and channel mix.

**Watch:** the month-on-month order trend (goal +7% a month; base flat at ~500); returning-customer rate ≥ 12% of all orders by June; marketplace share ≤ 50%; VAT rolling total (base case crosses £90k in August); paid share < 25%; Amazon organic rank for "cat bow tie collar" (page one by June or stop Sponsored Products).

**Decision point:** 9 (Halloween 2027 order, 1 Jun), 10 (small dogs, 1 Jun) — §8.

### August – September 2027: Halloween 2027 pre-season, and the window closes

| | Goal path | Base case |
|---|---|---|
| Aug orders / AOV / revenue / ads / net | 1,730 / £21.74 / £37,613 / £2,750 / £9,868 | 620 / £19.57 / £12,136 / £1,070 / £3,742 |
| Sep orders / AOV / revenue / ads / net | 2,310 / £22.69 / £52,411 / £4,060 / £13,735 | 855 / £20.18 / £17,252 / £1,570 / £4,014 |

**Do:** Halloween 2027 range live by 25 Aug (dinosaur hoodie for small dogs, pumpkin vest, bat wings at £8.99 as the traffic item, Christmas jumper for December); pre-season prospecting from the year's profit at break-even (£600 Aug, £900 Sep in the goal path — an investment whose revenue lands in October 2027, outside the window); the one-year-old account has a year of clips to re-cut; International Cat Day 8 Aug content; US/EU via Shopify Markets for collars only if the UK run-rate justifies it.

**Watch:** September orders vs September 2026's zero — the only true year-on-year figure the store will have is the pre-season; pre-order share; stock cover into October 2027; the final cumulative net on 30 Sep 2027.

**Decision point:** 11 (US/EU, 1 Aug), 12 (year-two capital, 30 Sep) — §8.

---

## 7. Leading indicators — the one-page weekly sheet

Read every Sunday evening; the columns are the ones each research file asked for. Goal-path and base-case thresholds are ESTIMATED; the CAC and ROAS lines are derived from our contribution (`12-paid.md` §9) and are not industry averages.

| Indicator | Where | Green (goal path) | Amber (base case) | Red (change the plan) |
|---|---|---|---|---|
| Posts published (TikTok / Reels / Shorts) | Platform analytics | 7 / 7 / 7 a week through Dec; 3–4 a week Jan–Aug | 5 / 5 / 5 | < 3 a week — the whole plan is content |
| Median plays per post (week) | TikTok Analytics | ≥ 3,000 by week 3; ≥ 10,000 by December | 1,500–3,000 | < 500 after week 2: hooks, first-second text, closer framing |
| Best post in the month | TikTok Analytics | ≥ 250k (Oct), ≥ 500k (Nov–Dec), ≥ 1M a quarter after | ≥ 100k | No post over 25k in a month: change formats, not effort |
| Bio-link clicks ÷ plays | Shopify UTM sessions ÷ plays | ≥ 0.5% | 0.3–0.5% | < 0.3%: the CTA and the bio, not the clip |
| Own-site sessions / week | Shopify | ≥ 3,500 (Oct wk 4), ≥ 8,000 (Nov), ≥ 11,000 (Dec) | 40–50% of that | < 500 by week 4 |
| Conversion rate | Shopify | ≥ 2.0% | 1.5–2.0% | < 1.0%: PDP (empty video slots, price vs £5.99 memory, delivery charge, no reviews) |
| AOV | Shopify | ≥ £26 (Nov–Dec), ≥ £24.5 after | £22–24 | < £21: Trio not attaching; add-on box in the buy box (`09-teardown-1`) |
| Trio / bundle attach | Shopify | ≥ 15% of orders | 8–15% | < 5% |
| Orders per week, all channels | Shopify + TikTok Shop + Amazon | Oct: 25 by wk 4; Nov: 300+; Dec: 500+; Jan–Jul: 180–330; Sep: 500+ | Oct 15–25; Nov 100; Dec 150; Jan–Jul 60–120; Sep 200 | Oct < 10 by week 4; any month under 60 after January |
| Paid CAC (Shopify-reconciled, UTM) | Ads Manager vs Shopify | ≤ £8.02 Trio / ≤ £5.55 blend (scale) | between scale and break-even (£16.03 / £11.11): hold | > break-even for 7 days or after £150: pause prospecting, keep retargeting |
| Paid share of orders | Shopify | < 15% | 15–40% | > 40%: buying revenue at zero profit |
| Ad spend ÷ last week's contribution | Bank | ≤ 15% | ≤ 15% | Any week where ads would come out of the stock order |
| TikTok Shop orders / week and sample requests | TikTok Shop Analytics; Affiliate Centre | ≥ 100/week Nov–Dec; ≥ 5 sample requests a week | 40/week | 0 tagged-video orders after 2 weeks of tagging: the listing (title "for cats & small dogs", sizes in cm, creator videos) |
| Genuine reviews collected | Judge.me | 20 by 30 Nov; 100 by 31 Mar | 20 by 31 Dec | Fewer than 5 by 30 Nov: the review-request flow is broken; never pad |
| Amazon unit-session % (bow tie) | Amazon Business Reports | ≥ 10% | 6–10% | < 4% with Sponsored spend: pull spend, fix images/price |
| Returning customer rate | Shopify | ≥ 8% (Mar), ≥ 12% (Jun) | 5–8% | < 3%: no repeat engine — allowable CAC stays at £8 for ever |
| Returns / refunds | Shopify | < 5% | 5–8% | > 10%: sizing content and the measured cm on every page |
| Stock cover, top 3 SKUs | Inventory | ≥ 3 weeks | 2–3 weeks | < 10 days in November: air-freight top-up now |
| Cash: next stock order funded? | Bank | Yes, from last month's takings | Yes, with owner top-up | No: cut the order to what is funded, never the ads first — there are no ads to cut in the base case |
| Cumulative net vs goal path | This file | On or above the §3 cumulative line | On the §4a line | Below the §4b line: re-base to the downside and cut fixed costs |
| Legal floor | Site audit monthly | No struck-through prices without a real prior price and a dated end; no rolling countdown; no displayed ratings without the app's real count; free entry route on every draw; no "safe"/"vet-approved"/"loves it" copy | — | Any breach: fix the same day (CMA fines up to 10% of turnover, `02-giantpaws.md` §11) |

---

## 8. The decision points — where the plan changes

| # | Date | Decision | The evidence that decides it | If yes / on track | If no / below |
|---|---|---|---|---|---|
| 1 | **Wed 30 Sep 2026** | **Put ~£14k of owner cash into stock between now and 15 Nov, or run the base case** | `01-maths.md` §9: £799 caps October at ~200 orders; Shopify Capital impossible before ~30 Dec (VERIFIED 90-day rule); TikTok Shop pays October's money ~13 Nov (VERIFIED) | Order 490 units now (£2.5k), plan the £12k Christmas order for 10 Oct; goal path stays open | Order the 145-unit plan (£799) and re-base every target in this file to §4a; the goal becomes £35–45k with a real chance, and the £100k plan is deferred to year two |
| 2 | **Sun 27 Sep** | Fix the expired launch offer and adopt regular prices as the base case | Every teardown found it live; DMCC Act 2024; +£3.35 contribution per order (`01-maths.md` §2) | Prices honest from Day 1; a lawful, dated Black Friday reduction becomes possible in November | Not optional: no order should be taken with the ticker at 00:00 and strike-throughs showing |
| 3 | **Sat 10 Oct 2026** | **Size the Christmas order** on 14 days of data: **small** (~£3k: 400 units, base case), **medium** (~£7k), **large** (~£12k: 2,360 units, goal path) | Days 1–14 thresholds: median plays ≥ 1,500 and one post ≥ 25,000 → medium; a post ≥ 100,000 and ≥ 15 pre-orders/week → large; below both → small (`11-organic` §8.2) | Large order lands 20–30 Oct for 1 Nov; air-freight top-up decision on 15 Nov | Small order; Christmas is sold from the bow tie (year-round item) and the dropship bandana, whose volume is not cash-capped |
| 4 | **Sat 31 Oct 2026** | Halloween read: sell-through of mane, spider, cape, pumpkin | Goal: ≥ 70% of Halloween units sold by 31 Oct; the stock cap means "sold out" is the likely reading in the base case too | Reorder nothing Halloween until June 2027; re-source the pumpkin hat out (`10-buyers` §8) | < 40% sold: hold for 2027 (costumes keep) — do not discount into a UK November that does not want them; test the US for the leftover capes via Shopify Markets in November if the £9.99 delivery converts at all |
| 5 | **~15 Nov 2026** | **Switch on paid** (£5/day retargeting + £15/day Advantage+ on the Festive Trio) | Gates: stock on shelf; pixel firing; three own-cat clips per advertised product; ≥ 35 organic orders/week for two weeks **or** one clip ≥ 50k with ≥ 1% bio click; ≥ 500 sessions in 30 days (`12-paid.md` §3) | Two-week learning plan; scale 20% every 3–4 days only under the £7.72 line; budget ≤ 15% of last week's contribution | Retargeting only (£5/day) if only gate 5 is met; nothing if the pixel is not firing. Ads never come out of stock money |
| 6 | **1 Dec 2026** | Amazon UK collars (Individual, FBM) | ≥ 20 genuine site reviews; bow tie at the corrected £2.84 cost; only sub-£10 items (5% referral tier VERIFIED) | List bow tie, embroidered collar, tuxedo bow tie; Professional plan when a month passes 40 units | Fewer than 20 reviews: wait; Amazon with no reviews next to Ancol at £3.96 and 636 reviews is Sponsored-Products money burned |
| 7 | **Tue 5 Jan 2027** | **The 100-day read** — which path is the store on? | Cumulative net: goal path £33k+; base case £10k+; downside < £5k. Also: reviews, returning rate, channel mix, VAT status | Goal path: file VAT, take a Shopify Capital offer only for stock, order wave 2 large, keep the plan | Base case: keep the plan, re-base targets to §4a, stop reading the goal-path column; Downside: cut fixed costs to Shopify + one app, drop paid entirely, move the range to need-based lines (AirTag collar, jumper, harness) which sell without a wave |
| 8 | **Mon 1 Mar 2027** | Range pivot: is January–February the content or the range? | Own-site organic orders < 60/month in both months with plays still ≥ median → range problem (`11-organic` §8.2) | ≥ 60: wave 3 as planned (harness, flower collar, spring plaids) | < 60: bring wave 4's small-dog lines forward to March (dog Halloween content has 10–100× the audience, `07-demand` §5), add the hairless-cat jumper line, and consider Prince & Princess UK wholesale (`sourcing.md` Route B) for a UK-made story |
| 9 | **Tue 1 Jun 2027** | **Halloween 2027 order** (£3–5k) — the only spend in the window whose revenue is mostly outside it | Trailing 90-day run-rate; cash on hand; Halloween 2026 sell-through; UK Halloween pet demand is muted (`07` finding 4), so the 2027 order is sized for TikTok Shop and the small-dog range, not for UK cat costume demand alone | Order wave 4 (dinosaur hoodie, pumpkin vest, bat wings, Christmas jumper) at ~£3k; live 25 Aug | Run-rate < 400 orders/month: order at ~£1.5k (bat wings and hoodie only) and treat Halloween 2027 as a content season, not a stock season |
| 10 | **1 Jun 2027** | Small dogs as a second audience | Share of bandana orders from dog owners (goal ≥ 30%); "cats & small dogs" title tests on TikTok Shop | Small-dog range (hoodie, bandanas, cowboy set at £11.99) | Stay cat-only; put the money into collar colours |
| 11 | **1 Aug 2027** | US/EU via Shopify Markets (collars, £30+ baskets, £9.99 delivery) | UK run-rate ≥ 1,000 orders/month and Christmas-collar stock on hand; US listings are all Prime with 350 median reviews (`05` §2.1), so this is own-site only | Enable Markets for US/EU, collars and Trios only; US content angle (Halloween is the US moment) | Park it; the US is not this year's market for a UK-shipped £15 costume |
| 12 | **Thu 30 Sep 2027** | Year-two capital and the Christmas 2027 order | The year's actual net; whether Christmas 2026 was the UK peak the evidence says (`07` §4) | Christmas 2027 order sized from Christmas 2026 actuals × growth; ads from profit | — |

Two rules that sit above every decision point: **ads are paid from last week's contribution and never from stock money**, and **no decision is ever made on a struck-through price, a countdown, a review count or a "bought in the last month" badge that is not literally true** — the DMCC Act 2024 is the floor under all twelve.

---

## 9. Probability of £100k under each scenario, honestly

The scenarios are the three in `01-maths.md` §6–8. Probabilities are ESTIMATED judgements, not measurements; the reasoning is the evidence. "Reach the goal" means ≥ £100,000 net in the window on the definition in the header.

| Scenario | What it requires (this file's model) | The evidence for and against | Probability of ≥ £100k | Expected net (central) |
|---|---|---|---|---|
| **A — organic only** (TikTok, Instagram, Facebook, Reddit; £0 ads) | 11,800 own-site orders at ~£26.4 AOV: 300 in October (stock-capped), **1,500 in November and 1,900 in December** (75,000–95,000 sessions a month at 2%), 600–1,000 a month from January, 1,500 in September 2027; ~£312k revenue; VAT from January | *For:* the owner has the one thing nobody in the UK niche has — a founder on camera with real cats, unlimited hours, and a feed where one post in ten clears 1.6M plays (VERIFIED); the top-ranked UK cat-wearable TikTok has 242 followers, so there is no incumbent. *Against:* November's 1,500 orders is 2–4× the estimated monthly run-rate of Supakit after nine years and 4–9× Bells & Whiskers after five (VERIFIED review counts, ESTIMATED orders); it needs 4.5–5.8M plays a month with a 0.5% bio click and a 2% CVR, all in month two; October is stock-capped whatever the traffic; UK Halloween pet demand is thin (VERIFIED Reddit); Reddit and Facebook are not link channels (VERIFIED rules); the year has one Christmas and it starts in five weeks | **≈ 2%** (1–3%) | £20–35k |
| **B — organic + ads funded from sales** | Organic at the upper plausible band (220 → 600–700 in Nov–Dec → 300–450 → 600 in Sep) **plus ~10,000 paid Trio orders at ≤ £8 CAC** (£79k of ad spend, 1,200–1,500 paid orders a month in Nov–Dec); 14,700 orders; £470k revenue | *For:* Trio pages at £34.99 clear the £30 free-delivery line and leave £16.03 before ads, so an £8 CAC is a real profit (`10-buyers` §7); retargeting and Spark boosts of proven clips can run at £5–9 (ESTIMATED). *Against:* cold UK social costs £17–47 per order at published-typical CPCs (ESTIMATED; no UK pet benchmark was fetchable); Meta's learning phase wants 50 purchases a week (VERIFIED) which £20/day cannot deliver; the 15%-of-contribution rule means £9,750 of November ad spend needs £65k of October–November contribution first — the ads cannot lead; in `01-maths.md` §7 every paid order at the blended AOV loses money above a £6 CAC; and "funded from sales" competes with December's £17k stock bill for the same cash | **≈ 3%** (2–5%) | £20–40k — ads add revenue and, at realistic CACs, subtract profit |
| **C — B + Amazon UK, Etsy, TikTok Shop UK + the US** (the §3 goal path) | 16,430 orders: 6,240 own-site organic, 1,990 paid, **4,700 TikTok Shop, 3,220 Amazon collars**, 280 US; £366k revenue; £22k ads; £21k VAT; **~£14k of owner cash into stock by mid-November**; 20 SKUs by spring; 4.5–5.8M plays a month in Nov–Dec | *For:* TikTok Shop costs nothing up front, takes 9% (VERIFIED), has in-app checkout that removes the bio-link step, a free-sample and affiliate machine (VERIFIED), and one CN seller sold 11.7K units of a bat cape on the US version (VERIFIED); the bow tie sits under Amazon's £10 / 5% line (VERIFIED) and is the highest-volume cat wearable found (5,063 orders on the listing, VERIFIED); the UK Amazon review moat is shallow (median 26 in Cat Clothing, VERIFIED); the range extensions with 1,000–10,000 verified orders each exist (`10-buyers` §9). *Against:* every marketplace order carries £4.80–5.90, so the plan needs ~7,900 of them from listings that begin at zero reviews on a shelf priced £2.32–£6.82 with 636–3,201 reviews; TikTok Shop UK sold-counts could not be obtained (blocked), so its 29% share of the plan rests on a US analogue; the capital is the owner's risk; the buffer is £7k on £107k, i.e. any two of §2's rows missing by 5% each takes it under the line; the comparable that reaches this order volume (Made By Cleo, 5,700–11,500/month) does it on 1,274 products after years, not on 20 in month eight | **≈ 8%** (5–12%) | £30–50k if funded; £25–45k if not (the base case) |

**The outcome distribution, if the owner funds the goal path** (ESTIMATED): ≥ £100k about 8%; ≥ £50k about 20%; ≥ £20k about 55%; between £0 and £20k about 35%; a net loss (stock bought for a Christmas that did not come, or a Halloween 2027 range ordered on a run-rate that fell) about 10%. Without the capital the loss probability falls to ~3% and the ≥ £50k probability to ~8%.

**Why the number is not zero.** Three things in the evidence are genuinely unusual: the feed's top decile is enormous relative to the accounts posting into it (`11-organic` §2.2: 7,000-follower accounts with 8M-play posts and a "comment HORSEMAN" mechanic); nobody in the UK niche is on camera with cats; and TikTok Shop UK's in-app checkout plus free samples is a distribution channel that did not exist for any of the ranked comparators when they were building. If one wave lands in the first week of November on a tagged Festive Trio, the December column of §3 is not fantasy. It is just not the median.

**Why the number is not higher.** The goal path asks a first-time seller, in month two, with fourteen days of data, to commit £12k to a Christmas order, and then to outsell every UK cat-accessory brand found — on seven products, with no reviews, in a category where UK Halloween demand is muted and Christmas is a seven-week window. The most likely year is the §4a base case: a real business doing 500–850 orders a month by September 2027, on £118k of revenue, netting ~£39k, with a range, a review base and a content library that make £100k a credible **year-two** goal.

---

## 10. What to replace, and when

| Assumption in this file | Replace with | When |
|---|---|---|
| Conversion rate 1.5–2.0%; bundle attach 15–25%; organic share of traffic | Giant Paws' Shopify analytics (`02-giantpaws.md` §10 asks 1–3) — then the store's own from week 2 | As soon as received; re-run `roadmap/model.py` |
| Bio-link click 0.5%; TikTok Shop tag-to-order 3% | TikTok Analytics and TikTok Shop Analytics | Day 14 |
| Paid CAC £8 | The account's own 14-day pooled figure | Day 14 of ads (`12-paid.md` §12) |
| Amazon 10% unit-session %, £1 Sponsored cost per order | Amazon Business Reports | Two weeks after listing |
| Royal Mail Christmas dates (ESTIMATED 19/21 Dec) | royalmail.com (403 today) | November |
| VAT 8% | Accountant's FRS vs standard calculation with the AliExpress B2B status | November |
| £5.00 blended landed cost; bat cape $4.54 vs $7.29 | Sample invoices | First delivery |
| Bells & Whiskers / Supakit monthly-order proxies (review counts ÷ 3–6%) | Nothing better is obtainable without their private data | — |

---

## 11. Blocked or not obtainable today

| Item | What happened | What was used instead |
|---|---|---|
| Royal Mail last posting dates for Christmas 2026 | HTTP 403 on `royalmail.com/christmas/last-posting-dates` and `/sending/christmas` (desktop UA) | Prior-year pattern, ESTIMATED 19 Dec (2nd Class/Tracked 48) and 21 Dec (1st/Tracked 24); confirm in November |
| Shopify Capital UK offer terms (amount, remittance rate) | Public page gives only the 90-day minimum and "repay as you sell"; terms are shown in the admin to eligible stores | 90-day rule VERIFIED; no funding assumed before January and none guaranteed |
| Giant Paws conversion rate, AOV, traffic sources, ad spend | Not yet received from the friend | 1.5–2.0% CVR planning range; §10 lists the swap |
| TikTok Shop UK sold-counts, tag-to-order conversion, new-seller reduced commission | Logged-out shell / login-gated (earlier files); not retried, not bypassed | US analogue (Hanhanle 11.7K sold, VERIFIED) and a 3% tag-to-order assumption |
| UK pet-niche CPM/CPC/CVR benchmarks | Blocked in `12-paid.md` | £8 CAC as the scale line derived from our own contribution, to be replaced by the account's numbers |
| Amazon UK product pages and the standard FBA rate card | Bot-gated (earlier files) | Best Sellers pages and the pricing page (VERIFIED fee tiers) |
| Any comparable's real monthly orders | Private | Review counts ÷ 3–6% review rate (ESTIMATED method, `08-ranking.md` §2) |

Working files: `scratchpad/roadmap/model.py` (the month-by-month model for the goal path, base case, downside, and the Scenario A and B "required" tables), `scratchpad/roadmap/out.json` (its output), `scratchpad/shopcap.html` (Shopify Capital UK page), `scratchpad/rm_xmas.html` (the 403 response).
