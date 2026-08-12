# The Dog Nook — the £100k plan

> **Built:** 2026-07-25 · **Horizon:** Aug 2026 → Jul 2027
> **Goal:** £100,000 net profit · **Anchor:** Bonfire Night, 5 Nov 2026 (14 weeks out)
>
> Every number here is reproducible. The model is `growth/model.py`; the
> spreadsheet is `growth/dog-nook-model.xlsx`. Market benchmarks are cited.
> **Product costs are ESTIMATES until you confirm real CJ landed costs** — that is
> the single input most likely to change these answers.

---

## 1. The headline: you have been aiming at the wrong number

The old catalogue averaged ~£25 an order. At that AOV, £100k profit needs **45+
orders a day** — which is why it felt impossible. It was.

Your new bundle ladder changes the arithmetic completely:

| What you need | At £25 AOV (old) | At £80 AOV (new ladder) |
|---|---|---|
| Orders per day | ~45 | **~7** |
| Orders per year | ~16,400 | **~2,600** |
| Revenue | ~£410k | **~£209k** |

**£100k net profit = ~2,600 orders at ~£80, with half your traffic owned.**
Seven orders a day. That is a real, reachable business.

### The two levers that actually move it

I solved for £100k across every combination of AOV, owned-traffic share and ROAS.
The result is unambiguous — **ad budget is not the lever.** These are:

| AOV | Owned traffic | ROAS | £ profit/order | Orders/yr | Orders/day | Revenue |
|---:|---:|---:|---:|---:|---:|---:|
| £60 | 30% | 2.5 | £20.75 | 4,874 | 13.4 | £292k |
| £60 | 50% | 3.5 | £28.98 | 3,490 | 9.6 | £209k |
| £70 | 50% | 3.5 | £33.85 | 2,988 | 8.2 | £209k |
| **£80** | **50%** | **3.5** | **£38.72** | **2,612** | **7.2** | **£209k** |
| £80 | 65% | 3.5 | £42.15 | 2,400 | 6.6 | £192k |
| £100 | 65% | 3.5 | £52.75 | 1,917 | 5.3 | £192k |

Read across any row: **raising AOV from £60 to £80 removes ~900 orders a year from
the job.** Raising owned traffic from 30% to 65% removes another ~560. Doubling ad
spend removes none — it just buys the same orders at worse efficiency (see §4).

**Therefore the entire build tonight is pointed at two things: basket size, and
traffic you don't rent.** Bundles, upsells and the quiz raise AOV. SEO content,
email flows and the quiz's email capture raise owned share.

---

## 2. Unit economics — every SKU

Contribution = price − landed cost − payment fees (2% + 25p) − 5% refund/breakage
provision. It is what's left to pay for advertising and profit.

### Singles

| Product | Price | Landed* | Gross % | Contribution | C% |
|---|---:|---:|---:|---:|---:|
| Calming Snood | £9.99 | £1.50 | 85.0% | £7.54 | 75.5% |
| Lick Mat | £11.99 | £2.50 | 79.1% | £8.40 | 70.1% |
| Grooming Glove | £11.99 | £2.00 | 83.3% | £8.90 | 74.2% |
| Wobble Feeder | £13.99 | £3.50 | 75.0% | £9.26 | 66.2% |
| Slow-Feeder Bowl | £14.99 | £3.00 | 80.0% | £10.69 | 71.3% |
| Snuffle Ball | £14.99 | £3.00 | 80.0% | £10.69 | 71.3% |
| Nail Grinder | £19.99 | £5.50 | 72.5% | £12.84 | 64.2% |
| Snuffle Mat | £22.99 | £5.00 | 78.3% | £16.13 | 70.2% |
| Heartbeat Companion | £24.99 | £5.00 | 80.0% | £17.99 | 72.0% |
| Calming Coat | £24.99 | £5.50 | 78.0% | £17.49 | 70.0% |
| Auto-Play Ball | £24.99 | £7.00 | 72.0% | £15.99 | 64.0% |
| Car Boot Liner | £29.99 | £9.00 | 70.0% | £18.64 | 62.2% |
| Donut Bed (S/M/L) | £29.99–44.99 | £9–15 | 66.7–70% | £18.64–26.59 | 59–62% |
| Weighted Blanket | £34.99 | £11.00 | 68.6% | £21.29 | 60.8% |
| Deep Nook (L/XL/XXL) | £59.99–89.99 | £20–30 | 66.7–67.5% | £35.54–53.44 | 59–60% |

### Bundles — where the money is

| Bundle | Price | Landed* | Gross % | Contribution | C% |
|---|---:|---:|---:|---:|---:|
| First Days Kit | £34.99 | £10.50 | 70.0% | £21.79 | 62.3% |
| Settle-In Bundle | £64.99 | £18.20 | 72.0% | £41.99 | 64.6% |
| Home-Alone Kit | £69.99 | £15.00 | 78.6% | £49.84 | 71.2% |
| **Fireworks Survival Kit** | **£84.99** | **£17.50** | **79.4%** | **£61.29** | **72.1%** |
| Complete Calm System | £139.99 | £44.00 | 68.6% | £85.94 | 61.4% |

\* *Landed = product + shipping, ESTIMATED. Verify with CJ before trusting these.*

**One Fireworks Survival Kit is worth seven Lick Mats.** £61.29 of contribution
versus £8.40. That single fact should drive every ad, every email and every page.

### ⚠️ The bundle parcel trap — check this before you scale

If CJ ships bundle components as **separate parcels**, you pay shipping per parcel.
I modelled it at £2.75 extra per additional parcel:

| Bundle | Parcels | Landed rises to | Gross % falls to | Contribution falls to | Loss/order |
|---|---:|---:|---:|---:|---:|
| First Days Kit | 3 | £16.00 | 54.3% | £16.29 | **−£5.50** |
| Settle-In Bundle | 3 | £23.70 | 63.5% | £36.49 | **−£5.50** |
| Home-Alone Kit | 3 | £20.50 | 70.7% | £44.34 | −£5.50 |
| Fireworks Survival Kit | 5 | £28.50 | 66.5% | £50.29 | **−£11.00** |
| Complete Calm System | 5 | £55.00 | 60.7% | £74.94 | **−£11.00** |

At 2,600 orders a year that is **£14,000–28,000 of profit** depending on the answer.
It also means a 5-parcel bundle has **five chances to arrive late** — catastrophic in
the week before Bonfire Night.

**ACTION (you, this week):** ask CJ whether bundle SKUs can be combined into one
parcel, and what a combined-parcel fee looks like. If they can't, consider
restricting bundles to 3 components or sourcing the fireworks components from the
**GB warehouse** only.

---

## 3. Twelve-month simulation

Assumptions: UK dog-anxiety seasonality (Oct 1.65×, Nov 1.95×, Dec 1.30×, Feb 0.75×),
Q4 ad-auction inflation (−25% ROAS Oct–Dec), ad saturation as spend rises, and a
learning-phase cap of +50% ad spend month-on-month. Fixed costs £95/mo.

### Scenario A — BASE (modest execution)
*CR reaches 2.0%, AOV £66, ROAS 2.8, owned traffic 32%, £450/mo committed*

**£34,226 revenue · 567 orders · £13,621 ads · £6,658 profit**

Breaks even in month 2, never really escapes. This is what happens if the site goes
live but content and email don't get built.

### Scenario B — GOOD (strong execution)
*CR 2.5%, AOV £76, ROAS 3.4, owned traffic 45%, £600/mo committed + 65% reinvested*

| Month | Orders | /day | AOV | Ad spend | Revenue | Profit | Cumulative |
|---|---:|---:|---:|---:|---:|---:|---:|
| Aug | 19 | 0.6 | £58 | £600 | £1,110 | £0 | £0 |
| Sep | 35 | 1.2 | £60 | £900 | £2,086 | £310 | £310 |
| Oct | 60 | 2.0 | £61 | £1,350 | £3,708 | £876 | £1,186 |
| **Nov** | **112** | **3.7** | £63 | £2,025 | **£7,036** | £2,285 | £3,470 |
| Dec | 114 | 3.8 | £65 | £3,038 | £7,365 | £1,479 | £4,950 |
| Jan | 124 | 4.1 | £66 | £3,598 | £8,176 | £1,427 | £6,377 |
| Feb | 126 | 4.2 | £68 | £3,928 | £8,568 | £1,343 | £7,720 |
| Mar | 150 | 5.0 | £70 | £4,088 | £10,432 | £2,351 | £10,071 |
| Apr | 196 | 6.5 | £71 | £4,847 | £13,932 | £3,786 | £13,857 |
| May | 269 | 9.0 | £73 | £6,273 | £19,581 | £5,901 | £19,758 |
| Jun | 322 | 10.7 | £74 | £8,000 | £23,973 | £6,928 | £26,686 |
| Jul | 328 | 10.9 | £76 | £8,000 | £24,935 | £7,532 | £34,218 |

**£130,902 revenue · 1,856 orders · £46,647 ads · £34,218 profit**

### Scenario C — STRETCH (everything breaks right)
*CR 2.9%, AOV £86, ROAS 4.0, owned traffic 55%, aggressive reinvestment*

**£267,654 revenue · 3,349 orders · £96,902 ads · £69,741 profit**

---

## 4. The honest verdict — and what it changes

**£100,000 net profit inside the first 12 months is at the edge of what this model
produces.** Even the stretch case — where conversion, AOV, ROAS and owned traffic all
land at the top of their realistic ranges — reaches **£69,741**.

The reason is structural, not effort: **you launch in August with no audience, so you
capture only a fraction of the 2026 fireworks spike.** Oct–Nov 2026 arrives before
your SEO has indexed, your email list exists, or your ad account has learned. You get
maybe a third of what that season is worth to you.

That is not a reason to lower the goal. It's a reason to be precise about it:

| | Target | Realistic |
|---|---|---|
| **Year 1** (Aug 26 – Jul 27) | £100k profit | **£35k–70k profit** on £130k–270k revenue |
| **Month 12 run-rate** | — | **£90k–190k annualised** |
| **Year 2** (Aug 27 – Jul 28) | — | **£100k+ comfortably** — with Oct/Nov 2027 as a single two-month payday, hit with a real list, real reviews and ranked content |

**Bonfire Night 2026 is your rehearsal. Bonfire Night 2027 is your payday.** The work
tonight is designed so that by October 2027 you own the search results, the email
list and the reviews for "dog scared of fireworks" in the UK.

### What would have to be true to hit £100k *this* year
All four, simultaneously:
1. **AOV ≥ £80** — bundles must be the default purchase, not the upsell
2. **Owned traffic ≥ 50% of orders by March** — the list and the content have to carry it
3. **Live and advertising by 1 September** — every week later costs you fireworks season
4. **The parcel trap resolved favourably** — worth up to £28k on its own

Miss any one and you land in Scenario B. Which is still a genuinely good first year.

---

## 5. Why more ad budget is not the answer

The model applies diminishing returns: effective ROAS × `1/(1 + spend/£3,000 × 0.22)`.

| Monthly ad spend | ROAS multiplier | £3.5 ROAS becomes |
|---:|---:|---:|
| £600 | 0.96 | 3.36 |
| £1,500 | 0.90 | 3.16 |
| £3,000 | 0.82 | 2.87 |
| £6,000 | 0.69 | 2.42 |
| £14,000 | 0.51 | 1.79 |
| £20,000 | 0.41 | 1.44 |

In the stretch scenario, ad spend rises to £20,000/month and **ROAS collapses to
1.5×** — the last £6,000/month barely washes its face. There is a ceiling on what
this niche will profitably absorb, and you hit it around £6–8k/month.

**Past that point, growth has to come from owned channels.** This is the single most
important strategic conclusion in this document.

### Your safe monthly ad commitment
Never let ad spend exceed **last month's contribution**. Concretely:

| Month | Committed (your money) | Reinvested | Total safe spend |
|---|---:|---:|---:|
| Aug | £600 | £0 | £600 |
| Sep | £600 | £300 | £900 |
| Oct | £600 | £750 | £1,350 |
| Nov | £600 | £1,425 | £2,025 |
| Dec | £600 | £2,438 | £3,038 |
| Jan onward | £600 | 65% of prior contribution | cap at £8,000 |

**Cash-flow warning:** November spend is committed *before* November revenue lands,
and Shopify payouts lag 2–3 days. Going into Bonfire Night you need roughly
**£2,500 of working capital** to cover ad spend and CJ order costs before the money
arrives. Have it ready in October.

---

## 6. The five numbers you check every Monday

Everything above collapses to this. Print it.

| # | Metric | Where | Target by Mar 2027 | Red flag |
|---|---|---|---|---|
| 1 | **Orders/day (7-day avg)** | Shopify home | 7+ | falling 2 weeks running |
| 2 | **AOV** | Shopify → Reports | £80 | below £65 |
| 3 | **Conversion rate** | Shopify → Reports | 2.5% | below 1.5% |
| 4 | **Owned-traffic share of orders** | GA4 (email+organic+direct ÷ all) | 50% | below 30% |
| 5 | **Blended MER** (total revenue ÷ total ad spend) | your own maths | 3.5× | below 2.5× |

If #2 and #4 are on target, £100k arrives whether or not the rest is perfect.
If they're not, no amount of ad spend fixes it.

---

## 7. What this means for the rest of tonight's build

Directly downstream of the maths above:

- **AOV work is the top priority** → bundle upsell on every PDP, quiz that recommends
  a kit not a product, free-ship threshold re-modelled, Complete Calm System made
  visible rather than buried
- **Owned-traffic work is joint top** → SEO articles written now to index before
  October, quiz as an email-capture engine, full email flow set
- **The fireworks season is the one unrepeatable event** → dedicated landing page,
  countdown to real order-by cut-offs, campaign sequence
- **Parcel economics get verified before scaling** → nothing else moves £28k for one
  email to a supplier

---

## Appendix — assumptions you can challenge

| Assumption | Value | Source / confidence |
|---|---|---|
| UK pet-care ecommerce conversion rate | 2.70% | IRP Commerce, Jun 2026 · **High** |
| Shopify pet-care conversion rate | 3.28% | Shopify benchmark · Medium |
| UK pet-care AOV | £85.50–£100.87 | IRP Commerce, May–Jun 2026 · **High** |
| Meta UK CPM (feed) | £7.50–£14 | 2026 benchmarks · Medium |
| Meta UK CPC | £0.45–£1.10 | 2026 benchmarks · Medium |
| Q4 CPC inflation | +30–50% | 2026 benchmarks · **High** |
| Median Meta ROAS (35k brands) | 1.86× | 2025 analysis · **High** |
| UK dogs with firework fear | 41% / 4.1m | PDSA PAW Report · **High** |
| UK dogs total | 11.1–15.5m | PDSA / UK Pet Food 2026 · Medium |
| Email as % of ecommerce revenue | 38–45% (P90) | Klaviyo 2026 · Medium |
| Welcome-flow conversion | 12–18% | Klaviyo 2026 · Medium |
| Cart-abandon recovery | 8–12% | Klaviyo 2026 · Medium |
| CJ China→UK transit | 7–17 days | CJ docs 2026 · **High** |
| CJ GB warehouse transit | 3–7 days | CJ docs 2026 · **High** |
| **Product landed costs** | see §2 | **ESTIMATE — owner must verify** |
| Gross margin blended | 70% | derived from above · Medium |
| Refund/breakage provision | 5% of revenue | industry-typical · Medium |
| Ad saturation curve | k=0.22 @ £3k | modelling judgement · **Low — challenge this** |
