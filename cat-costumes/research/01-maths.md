# 01 — Unit economics and the £100k goal maths

Catwalk Club · seven products, four bundles · written 26 September 2026 · goal: £100,000 net profit in the 12 months to 30 September 2027.

Every figure is tagged **VERIFIED** (fetched today or read from the repo, source given) or **ESTIMATED** (assumption stated). "Net profit" here means the business's profit after product, postage, packaging, payment fees, returns, VAT, ad spend and fixed costs, **before the owner's income tax and National Insurance** — those come out of the £100k, not before it.

---

## 0. The answer in six lines

1. The products are good margin **per unit** (39–80% gross at launch prices, 49–83% at regular prices) but low **per order**: a typical single-item order leaves **£5.95** after postage, packaging and fees, and **£4.74** once the store is VAT-registered. ESTIMATED from VERIFIED inputs, §3.
2. Because the £30 free-delivery line sits above every bundle (£14.99–£24.99), the store's own bundles never trigger it. Baskets that clear £30 leave **£11.21** (£8.62 registered). §4.
3. **Scenario A (organic only)** needs **~1,270 orders a month** at launch prices, or **~845 a month** at regular prices — roughly 55–85k sessions a month at a 1.5% conversion rate. §6.
4. **Scenario B (organic + ads paid from sales)** does not reach the goal at any realistic cost per acquisition: a paid order at the blended £20 AOV loses money above a £6 CAC, and a £30+ basket order loses money above an £8.60 CAC. UK Meta/TikTok CACs for a £15–25 basket run £15–40 (ESTIMATED). Ads can buy revenue here; they cannot buy profit at these prices. §7.
5. **Scenario C (B + Amazon/Etsy/TikTok Shop + US)** is the only one where the arithmetic closes, and it needs **~1,700 orders a month** (about 20,600 in the year, ~15,500 of them on marketplaces), which is ~140× the planned launch stock of 145 units and needs roughly £8–12k of stock bought per month in season. §8.
6. The binding constraint is not demand or margin, it is **cash and the calendar**: the plan holds £799 of stock (VERIFIED, §9) going into the one Halloween inside the 12-month window (Halloween 2027 falls outside it). A realistic year-one outcome is **£10–40k net**, unless the owner puts money into stock before October, lifts AOV above £30, and adds higher-ticket lines. §10.

---

## 1. Inputs and where each one came from

| Input | Value | Status | Source |
|---|---|---|---|
| Launch prices, regular ("list") prices, supplier $ costs | per product, §2 | VERIFIED | `/home/user/sc/cat-costumes/site/assets/data.js` (`price`, `list`, `source.cost`) |
| Landed cost per unit (£) | per product, §2 | VERIFIED (repo method) | `sourcing.md` → "Pricing decision (18 Sep 2026)": supplier $ × 0.79 £/$ × 1.2 (UK VAT charged by AliExpress at checkout) + shipping share (£0.63–£1.19/unit implied) |
| Live exchange rate | $1 = £0.7546 (25 Sep 2026) | VERIFIED | https://api.frankfurter.dev/v1/latest?base=USD&symbols=GBP |
| Royal Mail Tracked 48, online price, Large Letter (≤1kg) | **£2.85** inc VAT | VERIFIED | https://www.royalmail.com/sending/uk/tracked-48 (price table fetched 26 Sep 2026; Post Office counter price £3.30 for ≤750g) |
| Royal Mail Tracked 48, online price, Small Parcel (≤2kg) | **£3.65** inc VAT | VERIFIED | same page (counter £4.45; Medium parcel £5.55 online) |
| Royal Mail Tracked 48 with Signature | LL £4.85 / Small £5.25 online | VERIFIED | same page |
| Royal Mail 2nd Class (untracked) parcels | from £3.95 online; letters from 91p | VERIFIED | https://www.royalmail.com/price-finder |
| Royal Mail International Tracked (for US) | from £8.10 (letters) / £8.15 (parcels) online | VERIFIED "from" price only | https://www.royalmail.com/price-finder; the per-weight table is in a PDF the site refused to serve (403) |
| Reseller cross-check | Parcel2Go resells Tracked 48 LL at £2.85 and Small at £3.65 inc VAT | VERIFIED | https://www.parcel2go.com/couriers/royal-mail |
| Shopify Basic plan | **£25/month** monthly, £19/month paid yearly | VERIFIED | https://www.shopify.com/uk/pricing |
| Shopify Payments, Basic, online standard UK cards | **2% + 25p** | VERIFIED | same page |
| Shopify Payments, Amex / international cards | 3.1% + 25p | VERIFIED | same page |
| Shopify Payments, Klarna | 4.99% + 30p | VERIFIED | same page |
| Third-party gateway transaction fee (if not using Shopify Payments) | 2% | VERIFIED | same page |
| UK VAT registration threshold | **£90,000** rolling 12-month taxable turnover | VERIFIED | https://www.gov.uk/register-for-vat |
| VAT Flat Rate Scheme, "Retailing not listed elsewhere" | **7.5%** of VAT-inclusive turnover, 1% off in the first year; join only if turnover ≤ £150k ex VAT; 16.5% if goods < 2% of turnover (not the case here) | VERIFIED | https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay and /eligibility |
| Amazon UK referral fee, "Pet Clothing and Food" | **5% for items priced ≤ £10, 15% above £10**, min £0.25, charged on price incl. delivery | VERIFIED | https://sell.amazon.co.uk/pricing |
| Amazon UK selling plans | Individual £0.75/unit; Professional £25/month ex VAT | VERIFIED | same page |
| Amazon refund administration fee | lesser of £5 or 20% of the referral fee | VERIFIED | same page |
| Etsy UK fees | 6.5% transaction + 4% + 20p payment + £0.16 listing + 15% Offsite Ads on attributed orders | ESTIMATED (Etsy's fee page returned 403; figures from memory of the published UK schedule) | https://www.etsy.com/uk/legal/fees/ (blocked) |
| TikTok Shop UK commission | ~9% + payment fee | ESTIMATED (seller-uk.tiktok.com page needs login) | — |
| Packaging | £0.35 per large letter (mailing bag, tissue, label), £0.60 per small parcel (small box, tissue, label) | ESTIMATED, inside the £0.30–0.60 brief | — |
| Returns allowance | 5% of orders; a return costs the outbound postage, packaging and payment fee plus half the product's landed cost (fur-contaminated items are hard to resell) | ESTIMATED | supplier listings rate 4.6–4.8★ (`data.js`), which argues against a high return rate; sizing on four products argues for some |
| Conversion rate | 1.5% base (1.0–2.5% range) | ESTIMATED; replace with the Giant Paws figure when it arrives | typical for a new Shopify store on cold social traffic |
| Seasonality | Oct 30% of the year's orders, Nov 15%, Dec 15%, Jan–Sep 40% | ESTIMATED | `README.md` §5: "pet-costume buying concentrates in the two weeks before 31 October" |

Not fetched: Royal Mail's business price guide and online price guide PDFs (all royalmail.com PDF links returned 403), Etsy's fee page (403), TikTok Shop's fee page (login), Shopify's refund-fee help page (403). Business-account (OBA) discounts for Tracked 48 at volume therefore could not be quantified.

---

## 2. Per product: price, cost, gross margin

Landed cost as the repo computes it (at £0.79/$) and at today's rate (£0.7546/$), keeping the same per-unit shipping share. The live rate is ~4.5% kinder than the repo assumed; the repo figure is used as the base everywhere below (conservative).

| Product | Launch £ | Regular £ | Supplier $ | Landed £ (repo, $1=£0.79) | Landed £ at live FX | Gross £ @launch | GM% @launch | Gross £ @regular | GM% @regular |
|---|---|---|---|---|---|---|---|---|---|
| Bow Tie Collar | 8.99 | 10.99 | 1.09 | 1.82 | 1.77 | 7.17 | 80% | 9.17 | 83% |
| Bandana Collar (UK-stock dropship) | 7.99 | 9.49 | 2.37 | 2.88 | 2.78 | 5.11 | 64% | 6.61 | 70% |
| Lion Mane | 9.99 | 11.99 | 4.20 | 5.17 | 4.99 | 4.82 | 48% | 6.82 | 57% |
| Devil Bat Cape | 12.99 | 15.49 | 4.54 | 5.49 | 5.30 | 7.50 | 58% | 10.00 | 65% |
| Spider Costume | 12.99 | 15.49 | 4.93 | 5.86 | 5.65 | 7.13 | 55% | 9.63 | 62% |
| Pumpkin Hat & Ruffle Collar | 11.99 | 14.49 | 6.48 | 7.33 | 7.05 | 4.66 | 39% | 7.16 | 49% |
| Santa Hat & Scarf Set | 17.99 | 21.49 | 10.73 | 10.96 | 10.50 | 7.03 | 39% | 10.53 | 49% |

All VERIFIED from `data.js` and `sourcing.md`; the live-FX column is ESTIMATED from the VERIFIED rate.

**Blended (weighted by the single-item order mix in §3):** goods AOV £11.19, landed £4.93, gross £6.26, **56% gross margin at launch prices**; at regular prices goods AOV £13.48, gross £8.55, **63%**.

Two things to fix before the maths gets used:

- **The launch offer has already expired.** `data.js` has `SALE.active: true` with `ends: "2026-09-22"`, four days ago. Under the DMCC Act 2024 a crossed-out "regular" price is only lawful if it is the price genuinely charged; a strike-through left up after its own deadline is exactly what the CMA fines. Either move `price` to `list` today, or set a new, real deadline. From here on the **regular price is the base case**, and the launch price the sensitivity — not the other way round.
- **The bat cape cost is uncertain** ($4.54 or $7.29 depending on which listing field is right, `sourcing.md`). At $7.29 its landed cost is £8.10 and launch gross falls to £4.89 (38%).

---

## 3. Contribution per order: single items

Postage service is chosen by size and weight. Royal Mail Large Letter is ≤35.3 × 25 × 2.5 cm and ≤750g at the counter / ≤1kg online; Small Parcel is ≤45 × 35 × 16 cm, ≤2kg (VERIFIED Tracked 48 page weight bands; dimensions from Royal Mail's published format definitions, ESTIMATED not re-fetched). Weights are ESTIMATED from the product photos and materials; confirm on the samples.

| Product | Est. weight | Fits 2.5cm large letter? | Service | Postage (online, inc VAT) |
|---|---|---|---|---|
| Bow Tie Collar | ~20g | Yes | Tracked 48 Large Letter | £2.85 |
| Bandana Collar | ~35g | Yes | Dropshipped from the AliExpress UK warehouse — delivery is inside the £2.88 landed cost; no Catwalk postage or packaging, but no branded parcel either | £0.00 |
| Lion Mane | ~110g | No (faux fur bulk) | Tracked 48 Small Parcel | £3.65 |
| Devil Bat Cape | ~70g | Yes if folded flat in a mailer; the horn hood is the risk — test on the sample; fallback Small Parcel £3.65 | Tracked 48 Large Letter | £2.85 |
| Spider Costume | ~120g | No (wire-cored plush legs; two supplier buyers received a leg broken in transit — it needs a box) | Tracked 48 Small Parcel | £3.65 |
| Pumpkin Hat & Ruffle Collar | ~80g | No (15 × 12cm hat) | Tracked 48 Small Parcel | £3.65 |
| Santa Hat & Scarf Set | ~90g | Borderline; box it to protect the plush trim | Tracked 48 Small Parcel | £3.65 |

Contribution per single-item order at launch prices. Every single-item order is under £30 so the customer pays the £3.95 delivery charge (`DELIVERY.cost` in `data.js`), which is revenue. Shopify Payments (2% + 25p) is charged on the full amount taken, delivery included.

| Product | Charged (item + £3.95 delivery) | Landed cost | Postage | Packaging | Shopify Payments | Returns allowance (5%) | **Contribution per order** | % of charged |
|---|---|---|---|---|---|---|---|---|
| Bow Tie Collar | 12.94 | 1.82 | 2.85 | 0.35 | 0.51 | 0.23 | **7.18** | 55% |
| Bandana Collar (dropship) | 11.94 | 2.88 | 0.00 | 0.00 | 0.49 | 0.10 | **8.47** | 71% |
| Lion Mane | 13.94 | 5.17 | 3.65 | 0.60 | 0.53 | 0.37 | **3.62** | 26% |
| Devil Bat Cape | 16.94 | 5.49 | 2.85 | 0.35 | 0.59 | 0.33 | **7.33** | 43% |
| Spider Costume | 16.94 | 5.86 | 3.65 | 0.60 | 0.59 | 0.39 | **5.85** | 35% |
| Pumpkin Hat & Ruffle Collar | 15.94 | 7.33 | 3.65 | 0.60 | 0.57 | 0.42 | **3.37** | 21% |
| Santa Hat & Scarf Set | 21.94 | 10.96 | 3.65 | 0.60 | 0.69 | 0.52 | **5.52** | 25% |

ESTIMATED from VERIFIED prices, costs, postage and fee rates; packaging and returns are assumptions (§1).

**Mix S — single-item orders**, weighted 30% bow tie, 10% bandana, 15% lion, 12% bat, 8% spider, 15% pumpkin, 10% santa (ESTIMATED from AliExpress sold-counts in `sourcing.md` and the trend ranking pumpkin > lion > bat): AOV charged **£15.14** (goods £11.19 + delivery £3.95), product cost £4.93, postage + packaging £3.38, fees £0.55, returns £0.32 → **£5.95 contribution per order (39%)**.

Read that carefully: on a lion mane or a pumpkin set, postage plus packaging (£4.25) costs almost as much as the product (£5.17–£7.33) and the order clears under £4. The collars, not the costumes, carry the margin — exactly as `sourcing.md` said.

---

## 4. Contribution per order: bundles and £30+ baskets

**Bundles** (each £1.99 under its components, all shipped from own stock — the First Costume Kit needs bandanas held in stock, not dropshipped, or it becomes two parcels):

| Bundle | Launch £ | Components £ | Landed cost | GM% | Service | Charged incl. £3.95 delivery | Postage | Packaging | Fees | Returns | **Contribution** | % |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Halloween Pair (bat + spider) | 23.99 | 25.98 | 11.35 | 53% | Small parcel | 27.94 | 3.65 | 0.60 | 0.81 | 0.54 | **10.99** | 39% |
| Pumpkin Patch (pumpkin + bow tie) | 18.99 | 20.98 | 9.15 | 52% | Small parcel | 22.94 | 3.65 | 0.60 | 0.71 | 0.48 | **8.35** | 36% |
| First Costume Kit (bow tie + bandana) | 14.99 | 16.98 | 4.70 | 69% | Large letter | 18.94 | 2.85 | 0.35 | 0.63 | 0.31 | **10.10** | 53% |
| Festive Pair (santa + bow tie) | 24.99 | 26.98 | 12.78 | 49% | Small parcel | 28.94 | 3.65 | 0.60 | 0.83 | 0.57 | **10.51** | 36% |

**None of the four bundles reaches the £30 free-delivery line.** Every bundle buyer still pays £3.95, and none of them qualifies for the Klarna "Pay in 3" line (`INSTALMENTS.min: 30`). Both features in the theme are, today, unreachable by the store's own best offers.

**£30+ baskets** (free delivery, so the store absorbs postage; 15% of these assumed to pay by Klarna at 4.99% + 30p):

| Basket | Goods £ | Units | Landed cost | Postage | Packaging | Fees | Returns | **Contribution** | % |
|---|---|---|---|---|---|---|---|---|---|
| Halloween Pair + Lion Mane | 33.98 | 3 | 16.52 | 3.65 | 0.60 | 1.09 | 0.68 | **11.44** | 34% |
| Bat Cape + Spider + Bow Tie | 34.97 | 3 | 13.17 | 3.65 | 0.60 | 1.11 | 0.60 | **15.84** | 45% |
| Festive Pair + Bandana | 32.98 | 3 | 15.66 | 3.65 | 0.60 | 1.07 | 0.66 | **11.35** | 34% |
| Santa Set + Bat Cape (the only two-item basket over £30 without a bundle) | 30.98 | 2 | 16.45 | 3.65 | 0.60 | 1.02 | 0.67 | **8.59** | 28% |

Note the two-item case: adding a £12.99 cape to a £17.99 Santa set to cross £30 gives the customer £3.95 free delivery and the store only £3 more contribution than the Santa set alone. The three-item baskets, where the third item is a collar, are the ones worth engineering for.

### AOV under three mixes, and the realistic blend

| Mix | AOV charged (incl. delivery) | Goods AOV | Product cost | Postage + packaging | Fees | Returns | **Contribution / order, before VAT registration** | VAT at 8% of takings (§5) | **Contribution / order, VAT-registered** | % |
|---|---|---|---|---|---|---|---|---|---|---|
| S — single items | 15.14 | 11.19 | 4.93 | 3.38 | 0.55 | 0.32 | **5.95** | 1.21 | **4.74** | 31% |
| B — bundles (30/25/25/20) | 24.64 | 20.69 | 9.42 | 3.99 | 0.74 | 0.47 | **10.01** | 1.97 | **8.04** | 33% |
| T — £30+ baskets (equal weights) | 32.38 | 32.38 | 15.22 | 4.25 | 1.05 | 0.65 | **11.21** | 2.59 | **8.62** | 27% |
| **Blend 60% S / 25% B / 15% T** (launch prices) | **20.10** | 16.74 | 7.60 | 3.66 | 0.67 | 0.41 | **7.76** | 1.61 | **6.15** | 31% |
| **Blend at regular prices** (goods +20.5%) | **23.53** | 20.17 | 7.60 | 3.66 | 0.74 | 0.41 | **11.11** | 1.88 | **9.23** | 39% |

All ESTIMATED from VERIFIED inputs. The 60/25/15 blend is the planning assumption for the scenarios; Giant Paws' real bundle attach rate should replace it when received.

---

## 5. VAT — the cost that appears on the way to £100k

To make £100k net at ~£6–9 contribution per order the store turns over £240–330k, so it crosses the **£90,000** registration threshold (VERIFIED, gov.uk) some time in its first winter. From that point:

| Regime | VAT cost as % of takings | Notes |
|---|---|---|
| Below £90k rolling turnover | 0% | Sales carry no VAT; AliExpress VAT (the ×1.2 in the landed cost) is a straight cost |
| Flat Rate Scheme, retail not listed elsewhere | 7.5% of VAT-inclusive takings; **6.5% in the first year** (VERIFIED) | Only while turnover ≤ £150k ex VAT (VERIFIED). No input VAT reclaim |
| Standard scheme | 16.67% output VAT on takings, less input VAT on postage/packaging (~3% of takings) and, if AliExpress is set up B2B with the VAT number so import VAT is recoverable, less ~5.5% on goods → **~8.2% net** (ESTIMATED); **~13.6%** if the goods VAT cannot be recovered | Required above £150k ex VAT |

The scenarios use **8% of takings above £90k** as the VAT cost (ESTIMATED, between FRS and a properly set-up standard scheme). If the AliExpress purchases stay B2C, the standard-scheme cost is 13.6% and every registered-order contribution below falls by a further ~£1.10. Get an accountant to set the AliExpress account up as a VAT-registered business buyer before registration: that single step is worth about £1 per order.

---

## 6. Scenario A — organic only (TikTok, Instagram, Facebook, Reddit; £0 ad spend)

Fixed costs: Shopify Basic £25/month (VERIFIED), domain ~£1/month, a photo-review app ~£10/month, accounting software ~£10/month, product-liability insurance ~£10/month, samples and props ~£160 one-off → **~£800/year** (ESTIMATED). The owner's time is unpaid.

Solve for the orders that give £100,000 after product, postage, packaging, fees, returns, VAT (8% above £90k) and fixed costs:

| | Launch prices (blend, £7.76/order) | Regular prices (blend, £11.11/order) |
|---|---|---|
| Orders needed in the year | **15,230** | **10,140** |
| Orders per month (flat) | **1,270** | **845** |
| October (30% of the year) | 4,570 orders (~150/day) | 3,040 orders (~100/day) |
| Revenue | £306,000 | £238,500 |
| VAT | £17,300 | £11,900 |
| Ad spend | £0 | £0 |
| Net profit | £100,000 | £100,000 |
| Sessions/month at 1.0% / 1.5% / 2.5% CVR | 127,000 / 84,600 / 50,800 | 84,500 / 56,300 / 33,800 |

ESTIMATED throughout, from VERIFIED unit inputs.

What organic volume actually delivers, at the same assumptions:

| Orders/month | Orders/year | Revenue (launch) | Net profit (launch) | Revenue (regular) | Net profit (regular) | Sessions/month at 1.5% CVR |
|---|---|---|---|---|---|---|
| 50 | 600 | £12,100 | £3,900 | £14,100 | £5,900 | 3,300 |
| 100 | 1,200 | £24,100 | £8,500 | £28,200 | £12,500 | 6,700 |
| 200 | 2,400 | £48,200 | £17,800 | £56,500 | £25,900 | 13,300 |
| 300 | 3,600 | £72,400 | £27,100 | £84,700 | £39,200 | 20,000 |
| 400 | 4,800 | £96,500 | £35,900 | £112,900 | £50,700 | 26,700 |
| 600 | 7,200 | £144,700 | £50,700 | £169,400 | £72,900 | 40,000 |
| 800 | 9,600 | £193,000 | £65,400 | £225,900 | £95,000 | 53,300 |
| 1,000 | 12,000 | £241,200 | £80,200 | £282,400 | £117,200 | 66,700 |

For scale: the friend's Giant Paws runs ~£300/day = ~£9k/month (owner's figure, unverified) selling £120–370 cat furniture (VERIFIED from the saved `products.json`), i.e. probably 40–70 orders a month. Catwalk Club needs 12–30× that order count from a standing start, with 7 SKUs, on social alone. A new pet account with real cats posting daily can plausibly reach 5–25k sessions a month in season with a few viral clips (ESTIMATED), which is the 100–400 orders/month band: **£8–50k net**, not £100k.

**Verdict: A does not reach the goal.** It is, however, where all the profit that does get made comes from, because organic orders carry no acquisition cost.

---

## 7. Scenario B — organic plus ads funded from sales

Assume organic settles at 400 orders/month (the upper end of the plausible band, £35,900 net on its own) and ads are switched on once sales fund them. Ads are pointed at £30+ baskets, the best case for a paid order (£11.21 contribution, £8.62 once registered).

| CAC | Net per paid order (after VAT, £30+ basket) | Paid orders needed for £100k total | Paid orders/month | Ad spend/year | Paid revenue/year | Implied paid sessions/month at 2% CVR | Implied CPC at 2% CVR |
|---|---|---|---|---|---|---|---|
| £5 | £3.62 | 17,700 | 1,480 | £88,600 | £573,600 | 73,800 | £0.10 |
| £8 | £0.62 | 103,700 | 8,640 | £829,900 | £3.36m | 432,000 | £0.16 |
| £12 | −£3.38 | not reachable — every paid order loses money | — | — | — | — | £0.24 |
| £20 | −£11.38 | not reachable | — | — | — | — | £0.40 |
| £30 | −£21.38 | not reachable | — | — | — | — | £0.60 |

At the blended £20.10 AOV the break-even CAC is **£6.15** (registered) / £7.76 (pre-registration). UK Meta and TikTok cold-traffic CPCs of £0.40–0.80 at a 2% conversion rate give CACs of £20–40 (ESTIMATED; industry-typical, not fetched). The only ad format that gets near £5–8 is boosting ("Spark Ads") a clip that has already gone viral organically, on a bundle page at £30+, and that is not a budget you can plan on.

**Verdict: B does not reach the goal, and at realistic CACs it lowers profit while raising revenue.** Ads make sense here only (a) as retargeting of people who already visited (CAC £3–6, small volume), (b) to amplify proven organic clips, and (c) once AOV is above ~£35 and a repeat purchase is measurable (a collar buyer coming back for Christmas roughly doubles the allowable CAC). "Funded from revenue" also competes with stock for the same cash — see §9.

---

## 8. Scenario C — B plus Amazon UK, Etsy, TikTok Shop and the US

Per-order economics on marketplaces (single item, £2.99 delivery charged, marketplace returns at 8%):

| Channel and item | Charged | Landed cost | Postage + packaging | Channel fees | Returns | Contribution (pre-VAT) | Contribution (VAT-registered) |
|---|---|---|---|---|---|---|---|
| Amazon UK FBM — Bow Tie Collar at £9.99 (5% referral tier, VERIFIED) | £12.98 | £1.82 | £3.20 | £0.65 | £0.38 | £6.93 | **£5.89** |
| Amazon UK FBM — costume at £12.99 (15% tier, VERIFIED) | £15.98 | £5.70 | £4.25 | £2.40 | £0.76 | £2.87 | **£1.59** |
| Etsy UK — costume at £12.99 (fees ESTIMATED) | £15.98 | £5.70 | £4.25 | £2.28 | £0.75 | £3.00 | **£1.72** |
| TikTok Shop UK — costume at £12.99 (fees ESTIMATED) | £15.98 | £5.70 | £4.25 | £1.84 | £0.72 | £3.48 | **£2.20** |
| US DTC — £30+ basket, £9.99 delivery charged, Royal Mail International Tracked ESTIMATED £9.50 (from-price £8.10 VERIFIED), 3.1% + 25p international card fee (VERIFIED) | £42.37 | £15.22 | £10.10 | £1.56 | £0.96 | £14.52 | **£14.52** (exports are zero-rated) |

Two findings. **Costumes barely make money on marketplaces** (£1.60–2.20 a unit) because 15% commission plus £4.25 to post a £12.99 item leaves nothing, and Amazon already lists lion manes at £3.61 (`sourcing.md`). **Collars do** — the bow tie sits under Amazon's £10 line where the referral fee is 5%, and it is the best-selling item on AliExpress by a mile. If Catwalk Club goes to Amazon, it goes with collars (and any other sub-£10 line), not the costume range. US orders are good money per order but need a £30+ basket to carry £9.50 postage; expect a low conversion rate on a £9.99 delivery charge and treat it as a 20–40 orders/month add-on, not a channel.

Blended marketplace contribution, half collars half costumes: **~£3.90 per order** (registered). Fixed costs rise by ~£600/year (Amazon Professional £25 + VAT/month once past 40 units, listing fees, a connector app).

Solve with organic at 400/month (£35,900), US at 25/month (£4,350), paid ads at break-even (they add revenue, not profit):

| | Scenario C |
|---|---|
| Marketplace orders needed | **~15,500/year = ~1,290/month** |
| Total orders | **~20,600/year = ~1,715/month** (October ~6,170, Nov and Dec ~3,090 each, Jan–Sep ~915/month) |
| Revenue | ~£335,000 (DTC £96k, marketplaces £225k, US £13k) plus whatever break-even ad revenue is bought |
| Ad spend | Whatever is spent returns itself and no more (assume £0–30k) |
| VAT | ~£18,500 (DTC above £90k, plus 8% of marketplace takings; US exports zero-rated) |
| Net profit | £100,000 |
| Conversion × traffic implied | DTC 400 orders/month ≈ 27k sessions at 1.5%; marketplace 1,290 orders/month at Amazon's typical 8–12% listing conversion (ESTIMATED) ≈ 11–16k listing views/month, which for a 7-SKU seller with no reviews is page-one ranking for "cat bow tie collar" and similar terms |

**Verdict: C is the only scenario where the arithmetic reaches £100k, and it depends on** (1) ~1,290 marketplace orders a month, mostly collars, from listings that start with zero reviews; (2) stock of ~2,500 units a month in season (~£10k of purchases per month, see §9); (3) the VAT setup in §5 being done properly; (4) the range growing well beyond seven SKUs — small dogs, more collar designs, need-based lines — because 20,000 orders on seven products is not a shape any comparable seller shows (the strongest AliExpress listing has 5,000+ lifetime sales, VERIFIED `sourcing.md`).

---

## 9. The cash ceiling nobody has priced in

The launch plan buys 25 bow ties and 20 of each other line (LAUNCH-CHECKLIST §A): 145 units, **£799 of stock** at the repo's landed costs (VERIFIED arithmetic: 25 × £1.82 + 20 × £37.69). With no capital, growth is limited to what the last batch's contribution can buy, on a 10–20 day China lead time (VERIFIED `sourcing.md`):

| Cycle | Units available | Orders (~1.45 units each) | Contribution at £7.76 | Reorder it funds | When it lands |
|---|---|---|---|---|---|
| Launch stock (order this week) | 145 | ~100 | ~£780 | ~140 units | mid/late October — after the 14 October order-by date |
| Second batch | ~140 | ~95 | ~£740 | ~130 units | November |

October 2026, the month that carries ~30% of the year's demand, is capped at roughly **200 orders and £4,000 of revenue by stock, whatever the traffic does**. And Halloween 2027 is outside the 12-month window. The compounding path from £800 cannot reach 10,000–20,000 orders in the year; scenario C's ~2,500 units a month in season needs roughly **£8–12k of stock bought per month in September–November**, i.e. capital, a Shopify Capital advance once there is a sales history, or supplier terms.

The dropship bandana is the exception: it needs no stock, ships from a UK warehouse, and leaves £8.47 an order — the highest contribution of any single item. It is the one line whose volume is not cash-capped.

---

## 10. What reaches the goal, plainly

- **Neither A nor B reaches £100k.** A tops out around £35–50k net if organic is very good (400/month); B adds revenue but subtracts profit at any CAC above ~£6–8.
- **C reaches it on paper only**, at ~1,700 orders a month, ~20,000 in the year, with ~£10k/month of stock in season and a collar-led Amazon presence. From a standing start with £800 of stock and one Halloween in the window, the honest year-one expectation is **£10–40k net**.
- The 12-month goal is really a **contribution-per-order problem**: at £6–9 per order it needs 11,000–16,000 orders; at £15 per order it needs ~7,000. Levers, in order of size:

| Lever | Effect on contribution per order | Evidence |
|---|---|---|
| End the launch offer now and sell at regular prices | +£3.35 (£7.76 → £11.11); orders needed fall from 15,200 to 10,100 | §2, §6; also required by the DMCC Act since the deadline has passed |
| Build a three-item bundle priced £30–35 (e.g. two costumes + collar, "Halloween Trio") so bundles reach free delivery and Klarna | £15.84 on the bat + spider + bow tie basket vs £10.99 on the pair | §4 |
| Put capital into stock before October (even £3–5k) | Removes the ~200-order October cap; every extra October order is ~£8–11 | §9 |
| Add higher-ticket, need-based lines (Sphynx/hairless-cat jumpers at £20–30 from Prince & Princess, small-dog range) | A £25 jumper at ~50% margin in a large letter leaves ~£9 alone and lifts blended AOV toward £30 | `competitors.md`: Clothes for Cats, 172 products, median £12.50, sells to cats that need clothing; `sourcing.md` Route B |
| Collars on Amazon UK (5% tier under £10) | £5.89 per order with no acquisition cost | §8 |
| Set AliExpress purchasing up as a VAT-registered B2B buyer before registration | ~+£1.10 per order once registered | §5 |
| Buy at the live exchange rate / negotiate 100+ unit pricing | +£0.05–0.46 per unit at today's rate; typical 10–20% bulk discount ESTIMATED | §2 |
| Royal Mail business account (OBA) at 1,000+ parcels/year | Business Tracked 48 rates are below the £2.85/£3.65 online rates but the guide PDF was blocked | not quantified |
| Retarget, and boost only proven organic clips | The only paid traffic with a CAC under the £6–9 ceiling | §7 |

- **When the Giant Paws numbers arrive**, replace three assumptions in this file and re-run: conversion rate (1.5%), bundle attach (25%), and the share of traffic that is organic. If Giant Paws converts above 2.5% on cold social traffic, scenario A's traffic requirement halves; it still does not close the gap without the stock money.

The scripts that produced these tables are `maths.py` and `scen.py` in the scratchpad; every table above is their output, rounded.
