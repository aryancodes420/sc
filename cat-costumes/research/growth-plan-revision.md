# GROWTH-PLAN.md revision — 26 September 2026

Revised `/home/user/sc/cat-costumes/GROWTH-PLAN.md` in place (structure unchanged, 1,084 lines). Original saved as `scratchpad/revise/GROWTH-PLAN.v1.md`. Working files: `scratchpad/revise/rederive.py` (unit economics, baskets, marketplace rows, US/EU, cash), `scratchpad/revise/sens.py` (model sensitivities), `scratchpad/roadmap/model.py` (v2 constants; original kept as `model_v1.py`).

## One cost basis

Every number now sits on the bow tie at £2.84 landed (10-buyers §10) and list prices (the base case). The first draft mixed that with `01-maths`' £1.82 in every blended, basket, Trio, paid-CAC and model figure.

| Figure | First draft | Now | Derivation |
|---|---|---|---|
| Blended contribution (60/25/15), regular / registered | £11.11 / £9.23 | **£10.54 / £8.66** | rederive.py, list prices, Festive Pair £30.49 ships free, £30+ baskets as component sums (VERIFIED inputs: Tracked 48 £2.85/£3.65, 2%+25p, Klarna 4.99%+30p; ESTIMATED packaging/returns) |
| Blended, launch / registered | £7.76 / £6.15 | £7.29 / £5.68 | same |
| Launch → regular lever | +£3.35 | **+£3.25** | same |
| Blended AOV incl. delivery | £23.53 | £23.42 (launch £20.10) | same |
| Single-item mix goods AOV / gross / GM | £13.48 / £8.55 / 63% | £13.46 / £8.23 / 61% | same |
| Bow tie launch-price single order | £7.18 | £6.13 | same |
| Scenario A orders, regular / launch | 10,140 (845/mo; "1,500 Nov, 1,900 Dec") / 15,230 | **10,800 (900/mo; ~1,370 Nov / ~1,740 Dec on the roadmap shape) / 16,500** | solve N·c − 8%·(N·AOV − £90k) − £800 = £100k |
| Scenario A sessions/month at 1.5 / 2.5 / 3.0% | 56,300; "halves above 2.5%" | 60,000 / 36,000 / 30,000 (−40% at 2.5%; halves at 3.0%) | arithmetic |
| Halloween Trio | £16.03 (+£0.14 vs pair), Klarna £14.88 | **£14.99 (−£0.90 vs the £15.89 pair), Klarna £13.83** | rederive.py |
| Festive Trio / Festive Pair | £15.44 / (£12.03) | £14.39 / £10.98 (+£3.41) | same |
| Three bow ties / two bow ties | £22.05 (69%) / £16.08 | £18.91 (59%) / £13.99 (58%) | same |
| WELCOME10 / £2 off / gift wrap | £8.06 (−£1.08) / £7.14 / £10.49 | £7.02 (−£1.07) / £6.13 / £9.43 | same |
| Free delivery at £25 | "changes nothing" | costs £3.87 on the £28.99 Pair (→£12.02) and the £27.99 set (→£15.05) | same |
| Santa + bat basket | £30.98 → £8.59 (launch, in a regular table) | £36.98 → £14.62 (+£5.67); launch £8.74 | same |
| Break-even / scale CAC: blend, Trio, Klarna Trio, Festive | £11.11/£5.55; £16.03/£8.02; £14.88/£7.44; £15.44/£7.72 | £10.54/£5.27; £14.99/£7.50; £13.83/£6.92; £14.39/£7.20 | same |
| Amazon UK collar at £9.99 free delivery | £5.90 (5% tier on £12.98 with £2.99 delivery — wrong tier) / FBM Individual £3.02 | **£2.93 on the Professional plan** (Individual cannot set free delivery or run ads — VERIFIED sell.amazon.co.uk/pricing re-fetched); £9.99+£2.99 on the 15% tier £4.04 | rederive.py |
| Amazon £2 rise sensitivity | "nets ~£0.60" | nets ~£0.32 at £11.99; −£0.49 at £10.99 | with 20% VAT on fees |
| TikTok Shop §5.7 table | launch prices + £2.99, costume mis-added £3.48, affiliate on delivery | site parity (regular + £3.95): collar £7.08, costume £7.03, Pair £13.34, Santa £6.98; affiliates on product price | rederive.py; TikTok formula |
| TikTok Shop §7.5 price rule | "£9.99 / £14.99 free delivery (= site price plus delivery)" | site item price + £3.95 delivery per SKU (site all-in £14.94 / £19.44 regular) | data.js DELIVERY.cost 3.95 |
| Model TikTok Shop contribution | £4.80 | £4.19 (11-organic blend at £2.84; parity ~£7 flagged as upside) | model v2 |
| US basket | £8.73 (RM LL £15.40, £4 duty) / £15.31 (Evri £9.14) | −£1.70 (RM small parcel £14.25 online, 40% duty) / +£1.10 (Evri live £11.59); +£2.80 / +£5.60 at the 28% floor | duty stack MFN 2.8% + §301 25% + 12.5% (ESTIMATED classification, reported by re-check); online RM rates reported, not re-fetched (403) |
| US single costume | −£1.15 | −£2.65 to −£2.80 | same |
| Model US contribution | £14.52 | £3.30 | midpoint |
| EU Germany single / basket | −£1.42 / £7.98 (£10.58 one code) | −£0.53 (LL £9.90) or +£1.31 (small parcel £8.15) / £8.67 two codes, £11.40 one | online rates |
| Goal path net (16,430 orders) | £107,031, "£7,000 buffer any one assumption missing by 7% removes" | **£88,465** on £356,657 revenue, £20,091 VAT; all channels −7% = −£5.5k; own-site −7% = −£4.5k (largest single) | model v2 |
| What closes £100k | — | all channels +13% (£100.8k); +1,200 own-site organic orders (£100.9k); TikTok Shop at £7/order (£101.7k) | sens.py |
| Base case / downside | £39,389 / £14,459 | **£32,864 / £12,090** | model v2 (same volumes) |
| Probabilities | 2% / 3% / 8% (5–12%) | 2% / 3% / ~5% (3–8%), explicitly unquantified judgements; distribution implies median £20–25k so £33k = good year | judgement |
| Sensitivities: CVR 1.0% / AOV £23.5 / repeat zero / returns 10% / CAC £12 | −£25k / −£11k / −£6k (600) / −£5k / "−£15k and −3,000 orders" | −£28k / −£6k (−£16k if trios never built) / −£5k (520) / −£3.3k own site, −£4.5k incl. marketplaces / −£8k same volume, −£8k and −1,990 orders if switched off | sens.py |
| Marketplace share | ~£9k per 10 points | ~£12–14k per 10 points | 1,643 × (£11.9 − £3.3) less VAT effect |
| Owner cash | "~£14k between now and 15 Nov (£2.5k + £11.8k + £5k)" | **£14,270 by 10 Oct (£13,471 net of £799); ~£19,300 by 15 Nov (~£18,500 new)** | 14-roadmap §3b components |
| Launch stock | "145 units, £799, VERIFIED arithmetic" | £799 / 145 on the 20-per-product reading (incl. 20 dropshipped bandanas → 125 held / £742); £1,285 / 225 if per size variant; £825 at $2.05 — ESTIMATED | LAUNCH-CHECKLIST §A wording |
| October stock cap | ~200 orders | ~100–200 orders (£2–4k); reorder lands late Oct–mid Nov, after the 14 Oct order-by | 1.45 units/order, 10–20 day lead |
| TikTok Shop first payout | ~13–14 Nov | ~17–18 Nov (31 days from delivery + ~3 bank days); late-Oct orders early Dec | Seller Academy article (VERIFIED, saved) |

## Facts corrected

- Made By Cleo: oldest product created 22 Jul 2014 (VERIFIED live, products.json page 7) → ≥146 months; 3,800–7,600 orders/month, not "if ~8 years, 5,700–11,500".
- "Best UK cat-wearable TikTok has 242 followers" → Cheshire & Wain 671 (the plan's own row 8), Pipkin and Bella 242, Supakit 217, Kittyrama 171; Furmily 3,425 as a salon.
- Pets at Home: the bat-wing collar is the only *Halloween-themed* cat wearable in a 40–50-item cat campaign that also carries a £3.25 plain collar and a £10 harness set; not "the entire range".
- Giant Paws: £300/day ÷ £130–180 = 1.7–2.3 orders/day, ~50–70/month (not 60–90); 16→20–25 sellers on re-check.
- Supakit collar £22.50–£29.50 (the £31 was USD); harness ~£25–60 not £34–82.
- Order proxies that sum on-site + Trustpilot reviews are upper bounds; Amazon UK "median 26 reviews" tagged as a same-day snapshot.
- Lion-mane UK "300–600/month" dropped as unanchored.
- Bow tie's biggest review month is November (15 of 80; Dec 14) — VERIFIED from the saved feedback JSON; Christmas hats 74/81 = 91% Nov–Jan (93% Oct–Jan). Seasonality retagged ESTIMATED as a UK proxy (GB buyers 0–5%).
- Q4 share of costume revenue 75–85% (07-demand), not 60–70%.
- Halloween reframed: the larger UK search moment (reviewers' Google Trends read, reported not re-fetched — Trends is blocked from this egress), missed by timing; Christmas is the peak the store can be on time for; Christmas jumper moved into wave 1.
- Lion mane low reviews: 3 of 5 from two buyers on size M; four size-S reviews say too small. Spider: all three low reviews plus one 4★ mention wire legs.
- Santa re-source: GM 49% (regular) → 65%, contribution per order £8.95 → ~£5.33; case is price point and cash per unit, not margin.
- "Twenty SKUs is the shape every profitable comparator has" → a judgement; no comparator's profitability verified; ranges 13–1,530 lines.
- Bandana £9.94 rests on the 14 Sep $2.37 card (~£9.77 at $2.55) and two unverified dropship assumptions.
- Etsy Offsite Ads optional under $10k (mandatory at 12% from $10k), not "(mandatory)".
- TikTok shipping: any approved tracked carrier; of Royal Mail's, only Tracked 24/48.
- Amazon referral fee on the total price incl. delivery; refund admin lesser of £5 or 20% (VERIFIED live).
- IOSS: a GB business cannot register directly; needs an intermediary; UK VAT registration is not a prerequisite. EU gate reworded in §7.4, §7.5, §9.
- Cat of the Month: site terms run a judged competition → CAP 8.26 (independent judge/panel) or convert to a random draw (8.24); any cat photo must qualify for the free route. §1.1, §5.9, §6.9, §10.
- Parcel2Go Evri £9.14 is in the DDP table but the live quote is from £11.59.
- Royal Mail business account: eligibility only (£5,000/yr or 1,000 items); prices quote-only.
- TikTok Ads UK 20% VAT on spend for a non-VAT-registered advertiser added to §6 (reported by re-check; page script-rendered, not re-read) → in-platform targets ÷1.2; ad-group floor £16/day (£15 does not clear $20 at £0.7546).
- Sponsored Products cap aligned to £1.00/order everywhere; US volume aligned to 15–40/month; Amazon Professional from the first listing everywhere; FBA trigger 35 units/month.

## Not done / blocked

- Research files (`14-roadmap`, `10-buyers`, `11-organic`, `13-channels`, `05-marketplaces`, `01-maths`) still carry the superseded figures; only GROWTH-PLAN.md and `roadmap/model.py` were revised.
- Could not fetch here: royalmail.com (403 — online international prices carried as reported/ESTIMATED), ads.tiktok.com VAT article (script-rendered), Google Trends (blocked), US tariff sources (carried as reported, ESTIMATED classification).
