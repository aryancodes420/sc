# 12 — Paid ads for a first-time advertiser, funded from sales

Catwalk Club · UK · seven launch products £7.99–£17.99 (regular £9.49–£21.49) plus bundles · written 26 September 2026 · goal £100,000 net profit in the 12 months to 30 September 2027. Every figure is tagged **VERIFIED** (fetched today, URL given, or read from the repo or an earlier research file with its section cited) or **ESTIMATED** (method stated). UK spelling. Margins are the ones in `01-maths.md` and `10-buyers-and-range.md`; nothing here re-derives them.

The owner has never run a paid ad, has no ad budget, has unlimited hours, can film real cats in every product and will go on camera. This file is written for that person.

---

## 0. The answer in eight lines

1. **Ads cannot buy profit at these prices; they can only buy orders that organic content has already made cheap.** The blended order at regular prices leaves £11.11 before ad cost (£9.23 once VAT-registered). Cold UK social traffic at a typical £0.35–0.70 cost per click and 1.5–2% conversion costs £17–47 per order. So the first paid pound goes into **retargeting people who already visited** and **boosting clips that already went viral**, never into cold prospecting. (§2, §5; `01-maths.md` §7 VERIFIED arithmetic; CPC/CVR ESTIMATED.)
2. **The trigger to start is organic proof, not a date:** stock landed and photographed, the Meta pixel and Conversions API firing on a real purchase, the launch offer's expired strike-through removed, and either 35+ organic orders a week for two consecutive weeks or one organic clip past ~50,000 views. Until then the ad account is set up but spends £0. (§3.)
3. **The first budget is £5/day of retargeting and £15/day of one Advantage+ sales test — £140 a week — and it is paid out of the previous week's contribution, capped at 15% of it and never out of the stock re-order money.** It rises by at most 20% every three to four days, only while the seven-day cost per order stays under the "scale" line. (§4.)
4. **Meta first, TikTok second, for reasons that are mechanical, not fashionable:** Meta's UK minimums fit a £5/day retargeting set; TikTok's published minimum is $20/day per ad group and $50/day per campaign (VERIFIED), its custom audiences need 1,000 matched users (VERIFIED), and its best format for us, Spark Ads, only works once an organic post exists to boost. TikTok is where the organic clips live, so it gets the Spark budget when a clip earns it, and GMV Max when TikTok Shop UK is switched on. (§5.)
5. **The only landing pages that can carry a paid click are the ones with a £30+ basket built in:** the Halloween Trio (£34.99, £16.03 contribution before ads) and, from 1 November, the Festive Trio (£36.99, £15.44). A single £10.99 bow tie leaves £9.14, a lion mane £5.58; the mane must never receive paid traffic. (§8; `10-buyers-and-range.md` §7 VERIFIED arithmetic.)
6. **The KPI ladder is set by our margins, not by industry averages:** blended break-even ROAS is 2.1×; scale only above 4.2× (cost per order under £5.55); stop any ad set that has spent £150 or run seven days at under 2.1×. On the Trio page the same lines are £16.03 break-even and £8.02 scale. (§9.)
7. **Email is the cheaper half of "retargeting":** the WELCOME10 pop-up, Shopify Messaging's welcome and abandoned-checkout automations and a post-delivery review request cost nothing per send at launch volumes and convert visitors the pixel would otherwise pay to see twice. Cat of the Month is a free-entry, CAP-compliant list-builder. (§10.)
8. **The honest calendar:** launch stock lands mid-October, after the 14 October Halloween order-by date, and October is capped at ~200 orders by the £799 of stock (`01-maths.md` §9). The first real paid window is therefore **Christmas (1 November – 18 December)**, on the Festive Trio and the red tartan bow tie; Halloween 2026 gets retargeting and Spark boosts only. Halloween 2027 falls outside the profit window. (§3, §12.)

---

## 1. What was fetched today, and what was not

| Source | What it gave | Status |
|---|---|---|
| Meta Business Help Centre — "About the learning phase" (`facebook.com/business/help/112167992830700`) | Exit after ~50 results in the week after the last significant edit; higher CPA during learning; avoid edits, high ad volume, unrealistic budgets; Shops ads need 17 website + 5 Meta purchases | VERIFIED (Chromium; curl returns HTTP 400 on every facebook.com page) |
| Meta — "About learning limited" (`/business/help/269269737396981`) | Learning limited when unlikely to reach ~50 optimisation events in 7 days; fixes: combine ad sets, widen audience, raise budget, move from purchase to add-to-basket | VERIFIED |
| Meta — "Significant edits and learning phase" (`/business/help/316478108955072`) | Any change to targeting, creative, optimisation event, bid strategy, adding an ad, or a 7-day pause resets learning; budget changes reset it only if large ($100→$1,000 does, $100→$101 does not) | VERIFIED |
| Meta — "Best practices for minimum budgets" (`/business/help/203183363050448`) | Minimums vary by country and objective and are shown in Ads Manager; with a cost-per-result goal the daily budget should be ≥5× the goal; purchase optimisation needs more budget than landing-page views | VERIFIED (no GBP figure published) |
| Meta — "About daily budgets" (`/business/help/190490051321426`) | Meta may spend up to 75% over the daily budget on a given day (175% cap) and up to 7× daily per Sunday–Saturday week | VERIFIED |
| Meta — "About Advantage+ campaign budget" (`/business/help/153514848493595`) | One campaign budget distributed across ≥2 ad sets; analyse at campaign level | VERIFIED |
| Meta — "About Advantage+ sales campaigns" (`/business/help/1362234537597370`) | Sales objective with Advantage+ audience, placement and budget; Meta claims 9% lower cost per conversion on average; best practice: connect first-party data, provide diverse creative | VERIFIED (the 9% is Meta's own claim) |
| Meta — "Best practices for cost-per-result goal" (`/business/help/176339196621566`) | Works best at 50–100+ conversions a week; set the goal 10–20% above the observed cost; with no history, run Highest volume for two weeks first; evaluate on weekly averages; wait 7 days after any change | VERIFIED |
| Meta — "Choosing advertising objectives" (`/business/help/1438417719786914`) | Six objectives; Sales = purchases or add-to-basket on a website; Traffic is for clicks only | VERIFIED |
| Meta — "About ad auctions" (`/business/help/430291176997542`) | Winner = bid × estimated action rate × ad quality; relevance can beat a higher bid | VERIFIED |
| Meta — "How much it costs to advertise" (`/business/help/201828586525529`) | No price list; the advertiser sets the budget; campaign and account spending limits exist | VERIFIED |
| Meta — website custom audiences, create from website events, lookalike audiences (`610516375684216`, `666509013483225`, `164749007013531`) | Retarget 30-day visitors who did not buy; exclude buyers; upsell buyers; lookalike from a source audience, 1–10% | VERIFIED |
| Meta — "Best practices for aspect ratios" (`/business/help/103816146375741`) | 9:16 for Stories and Reels; 4:5 for Facebook Feed images; 1:1 for Instagram Feed; supply all ratios or Meta crops | VERIFIED |
| Meta — "Meta Advantage+ features" (`/business/help/2486309305148646`) | Names of the automation toggles used in §6 | VERIFIED |
| TikTok Ads Manager help — "About budgets" (`ads.tiktok.com/help/article/budget`, July 2026) | **Daily budget minimums: campaign > $50, ad group > $20**; lifetime = days × daily minimum; raise budgets ≤40% per change in learning, ≤30% after, no more often than every two days | VERIFIED |
| TikTok — "Learning Phase" (`/help/article/learning-phase`, June 2026) | Volatility declines after ~25 results or 7 days; do not pause or re-edit during learning | VERIFIED |
| TikTok — "How to set up Campaign Budget Optimization" (`/help/article/campaign-budget-optimization`, Aug 2026) | Ad-group budget ≥5× target CPA; 3–5 ad groups with 2–3 creatives each; wait 3 days or 50 conversions before adjusting; ≤30% changes | VERIFIED |
| TikTok — "About Spark Ads" (`/help/article/spark-ads`, June 2026) | Boost an organic post; all likes, comments, follows accrue to the organic post; supports Conversions and Sales objectives; up to 10 minutes | VERIFIED |
| TikTok — "Available bidding strategies" (`/help/article/bidding-strategies`, Sep 2026) | Maximum Results (default) vs Target cost per result; conversions campaigns fluctuate and show high CPM before learning completes | VERIFIED |
| TikTok — "About Custom Audiences" (Nov 2025), "About lookalike audiences" (Jun 2025) | **1,000 matched users minimum** to use a custom audience; lookalike source minimum 1,000 | VERIFIED |
| TikTok — "TikTok Auction In-Feed Ads" specs (June 2026) | 9:16 at ≥540×960; non-Spark captions cannot carry links, @ or hashtags; Spark captions show 4 lines | VERIFIED |
| TikTok — "Create Video Shopping Ads for TikTok Shop" (Mar 2026) | Since July 2025 **GMV Max is the only supported campaign type for TikTok Shop ads** | VERIFIED |
| TikTok — "About TikTok Pixel", "About Smart Creative" | Pixel events from product view to purchase; Smart Creative auto-rotates fatigued videos after 3–5 days | VERIFIED |
| Shopify Help — "Facebook and Instagram by Meta" channel | Channel is free on all plans; creates the pixel, sets data-sharing level, Conversions API | VERIFIED (`help.shopify.com/en/manual/online-sales-channels/facebook-instagram-by-meta`) |
| Shopify Help — "Shopify Messaging" (formerly Shopify Email) | Email, SMS and WhatsApp campaigns and automations from the admin; priced by messages sent; available on Basic | VERIFIED (`help.shopify.com/.../shopify-messaging`; the per-email price page redirected, so the free allowance is not verified) |
| Klaviyo pricing (`klaviyo.com/pricing`) | Free plan: up to 250 active profiles, 500 emails/month | VERIFIED |
| Shopify UK blog, "How much do Facebook ads cost?" (30 Nov 2025) | Average CPC $0.87 and CPM $16.06 in November 2025 (a global, all-industry average) | VERIFIED that the page says so; irrelevant as a UK pet-niche forecast, so treated as ESTIMATED context |
| ASA/CAP — "Promotional marketing: prize draws" (`asa.org.uk/advice-online/promotional-marketing-prize-draws.html`) | Significant conditions in the ad (rule 8.17); random or independently supervised winner selection (8.24); publish winners' surname and county (8.28.5); prize within 30 days | VERIFIED |
| Our own files: `01-maths.md`, `07-demand.md`, `08-ranking.md`, `09-teardown-1..5.md`, `10-buyers-and-range.md`, `site/assets/data.js`, `LAUNCH-CHECKLIST.md` | Contribution per order, AOV, stock cap, seasonality, hooks, offers, page state | VERIFIED (file paths cited inline) |

**Blocked:** Meta Ad Library (HTTP 403 in Chromium, so no competitor ad examples); TikTok Creative Center Top Ads (renders four generic cards, the rest is login-gated); WordStream and Varos benchmark pages (403 / empty); `facebook.com/business/ads/pricing` (login wall); TikTok GMV Max help article (slug not resolvable); the Shopify Messaging price page (redirects to the overview); gov.uk DMCC guidance page (404 at the guessed URL). Nothing was bypassed. No UK pet-niche CPM, CPC or conversion benchmark could be fetched, so every cost figure in §4 and §9 is ESTIMATED and the plan is built to replace it with the account's own numbers inside two weeks.

---

## 2. The maths ads must obey

Ads are judged against **contribution before ad cost**, i.e. what is left after product, postage, packaging, payment fees and the returns allowance (`01-maths.md` §3–4, `10-buyers-and-range.md` §7; both ESTIMATED from VERIFIED prices, Royal Mail rates and Shopify fees). VAT is shown as an 8%-of-takings deduction for the registered case (`01-maths.md` §5). Regular prices are the base case, because the launch offer's own deadline (22 Sep) has passed and the strike-through must come down before any ad runs (DMCC Act 2024; `10-buyers-and-range.md` §0).

| Landing page / basket | Charged £ | Contribution before ads (pre-VAT) £ | Same, VAT-registered £ | **Break-even CAC** (= contribution) | **Scale line** (CAC ≤ 50% of contribution) | Break-even ROAS | Scale ROAS |
|---|---|---|---|---|---|---|---|
| Blend 60% single / 25% bundle / 15% £30+ basket, regular prices | 23.53 | 11.11 | 9.23 | £11.11 | **£5.55** | 2.12× | 4.24× |
| **Halloween Trio** (bat + spider + bow tie) £34.99, free delivery | 34.99 | 16.03 | 13.23 | £16.03 | **£8.02** | 2.18× | 4.37× |
| Halloween Trio paid by Klarna (4.99% + 30p) | 34.99 | 14.88 | 12.08 | £14.88 | £7.44 | 2.35× | 4.70× |
| Festive Trio (Santa set + bow tie + bandana) £36.99, from 1 Nov | 36.99 | 15.44 | 12.48 | £15.44 | **£7.72** | 2.40× | 4.79× |
| Bow Tie Collar single £10.99 + £3.95 delivery | 14.94 | 9.14 | 7.94 | £9.14 | £4.57 | 1.63× | 3.27× |
| Bandana single (UK dropship) £9.49 + £3.95 | 13.44 | 9.94 | 8.86 | £9.94 | £4.97 | 1.35× | 2.70× |
| Spider Costume single £15.49 + £3.95 | 19.44 | 8.30 | 6.74 | £8.30 | £4.15 | 2.34× | 4.68× |
| Lion Mane single £11.99 + £3.95 | 15.94 | 5.58 | 4.30 | £5.58 | £2.79 | 2.86× | 5.71× |

ESTIMATED from VERIFIED inputs; script output in `scratchpad/research/paid/` (the ladder was recomputed today from the `01-maths` and `10-buyers` figures).

Why "scale" is half of contribution and not break-even: a paid order at break-even adds revenue and zero profit, and this business needs profit per order, not turnover — at £6–9 net per order it needs 11,000–16,000 orders to reach the goal (`01-maths.md` §10). A paid order is only worth having if it leaves at least as much as an organic order would after the ad, i.e. roughly half the contribution, **or** it recruits a collar buyer who comes back at Christmas (the repeat purchase is not measurable yet; `01-maths.md` §7 says it roughly doubles the allowable CAC once it is).

What that CAC means in clicks. Cost per order = CPC ÷ conversion rate:

| Target CAC | Max CPC at 1.0% CVR | 1.5% | 2.0% | 3.0% | 4.0% |
|---|---|---|---|---|---|
| £5.55 (blend, scale) | £0.06 | £0.08 | £0.11 | £0.17 | £0.22 |
| £8.02 (Trio, scale) | £0.08 | £0.12 | £0.16 | £0.24 | £0.32 |
| £11.11 (blend, break-even) | £0.11 | £0.17 | £0.22 | £0.33 | £0.44 |
| £16.03 (Trio, break-even) | £0.16 | £0.24 | £0.32 | £0.48 | £0.64 |

And what a CPC costs to buy. CPC = CPM ÷ (1,000 × click-through rate):

| CPM | CPC at 0.5% CTR | 1.0% | 1.5% | 2.0% | 3.0% |
|---|---|---|---|---|---|
| £5 | £1.00 | £0.50 | £0.33 | £0.25 | £0.17 |
| £7 | £1.40 | £0.70 | £0.47 | £0.35 | £0.23 |
| £9 | £1.80 | £0.90 | £0.60 | £0.45 | £0.30 |
| £12 | £2.40 | £1.20 | £0.80 | £0.60 | £0.40 |

Reading the two tables together: at a £7 CPM (ESTIMATED; the only public average found is a global $16.06, Shopify blog, which UK pet video on Reels usually undercuts — ESTIMATED), a **cold** ad needs a 2% link CTR **and** a 3% conversion rate to land at £11.67 per order, which is still above the blend's scale line. Only the Trio page (scale £8.02) or a retargeting audience (conversion 4–6%, ESTIMATED) gets under it. That is the whole argument of this file in two tables.

---

## 3. When to start: the trigger

Not a date. Five gates, all of which must be true; the ad account is built beforehand (§12, days 1–3) but spends nothing.

| # | Gate | Why | How to check |
|---|---|---|---|
| 1 | **Stock is on the shelf and the strike-through is gone.** Regular prices live, `SALE.active` false, ticker removed; only in-stock items are advertised | An ad into a sold-out or DMCC-non-compliant page is money burned and a CMA risk; October is capped at ~200 orders by £799 of stock whatever the traffic (`01-maths.md` §9 VERIFIED) | `data.js` / Shopify prices; inventory > 20 units on the advertised bundle's components |
| 2 | **Pixel and Conversions API report a real purchase.** Meta pixel via the free Facebook & Instagram channel (VERIFIED, Shopify help), TikTok pixel via its channel; test with a £1 order and refund it | Purchase-optimised campaigns need the purchase event; without it every campaign is "learning limited" from day one (VERIFIED, Meta) | Meta Events Manager shows Purchase with value and currency; Ads Manager "Results" column |
| 3 | **Three own-cat clips and one photo set per advertised product exist** (`LAUNCH-CHECKLIST.md` §F: "Photograph your own cat… for ads"; `README.md` §5: "ads into an unphotographed catalogue waste money") | Supplier photos cannot be used in ads (image rights) and cannot show the cat-fitted, UK-stock difference | Files in `site/assets/video/`, `HOME_VIDEOS` populated |
| 4 | **Organic proof:** either (a) ≥35 organic orders a week for two consecutive weeks, or (b) one organic TikTok/Reel past ~50,000 views with a link-in-bio click-through of ≥1% (ESTIMATED thresholds) | (a) means conversion, AOV and the funnel work without paying — 35 orders × £11.11 = £389/week of contribution, of which 15% (£58) is the first week's budget; (b) means a creative already beats the CTR the tables in §2 need, and Spark Ads keep its engagement (VERIFIED, TikTok) | Shopify Analytics → Sessions by referrer and Conversion rate; TikTok analytics on the post |
| 5 | **Retargeting audiences are big enough to serve:** ≥500 site sessions in the last 30 days (ESTIMATED practical floor for a Meta website audience) and, for TikTok, 1,000 matched users (VERIFIED minimum) | Retargeting is the only paid traffic with a CAC under the ceiling (`01-maths.md` §10); it needs people to retarget | Meta Audiences → size estimate; TikTok Audience Manager |

Realistic timing against the calendar (`10-buyers-and-range.md` §4 VERIFIED dates):

| Window | What ads do | Why |
|---|---|---|
| 26 Sep – ~15 Oct | **Nothing paid.** Build the account, pixel, audiences, three automations; film; post daily | Stock is in transit (10–20 days China lead, `sourcing.md` VERIFIED); Halloween order-by 14 Oct |
| ~15 Oct – 31 Oct | Retargeting at £5/day if gate 5 passes; Spark boost only a clip that has already gone viral; Halloween Trio page | UK Halloween pet demand is muted (`07-demand.md` finding 4); the stock cap makes prospecting pointless |
| **1 Nov – 18 Dec** | **The first real test**: £5/day retargeting + £15/day Advantage+ sales on the Festive Trio and red tartan bow tie; scale by §4 rules; stop by Royal Mail's last posting date | Christmas is the UK-native peak: 93–100% of Christmas-set reviews and the bow tie's 36% peak fall Nov–Jan (`07-demand.md` §4 VERIFIED) |
| 19 Dec – 31 Jan | Retargeting only; Boxing-day "one for every season" three-bow-tie offer | Costumes stop selling after January (`07` §4); collars continue |
| Feb – Aug 2027 | Retargeting + one always-on collar prospecting test at £10/day if it ever hits the scale line; bandanas for cats and small dogs Mar–Jun | Year-round base load; bandana peaks Apr–Jun |
| From 25 Aug 2027 | Halloween 2027 pre-season prospecting, funded by the year's profit | Revenue lands in October 2027, outside the goal window; spend is inside it — budget it as an investment, not as this year's profit lever |

---

## 4. The first budget and how it scales

**Rule 1 — ads are paid from last week's contribution, never from stock money.** Weekly ad budget ≤ 15% of the previous seven days' contribution before ads (ESTIMATED policy; the point is that stock re-orders come first because stock, not traffic, caps October — `01-maths.md` §9). The table is what that produces:

| Organic orders/week | Contribution/week at £11.11 | 15% → ad budget/week | Per day |
|---|---|---|---|
| 20 | £222 | £33 | £4.80 |
| 35 (gate 4a) | £389 | £58 | £8.30 |
| 50 | £556 | £83 | £11.90 |
| 70 | £778 | £117 | £16.70 |
| 100 | £1,111 | £167 | £23.80 |

**Rule 2 — the first configuration is £20/day, split £5 retargeting / £15 prospecting, for 14 days (£280), and it is a learning budget, not a profit budget.** What £280 buys at ESTIMATED cold rates (£7 CPM, 1% CTR, 1.5% CVR): 40,000 impressions, 400 clicks, about 6 orders. Meta's learning phase wants ~50 purchases in a week (VERIFIED); at a £9 cost per order that is £65/day, which the owner does not have. So:

- Expect **"Learning limited"** on the prospecting ad set and accept it (Meta: "not a penalty", VERIFIED). Do not fix it by switching the optimisation event to add-to-basket, which Meta suggests (VERIFIED) — for a £10.99 item that optimises for window-shoppers; keep Purchase and judge on pooled 14-day numbers.
- Do not touch the ad set for seven days: targeting, creative, optimisation event, bid strategy and adding an ad all reset learning (VERIFIED list); a budget change of ≤20% does not.
- Meta may spend up to 175% of a daily budget on one day and 7× in a Sunday–Saturday week (VERIFIED). Set a **campaign spending limit** of £300 and an **account spending limit** of £500 (VERIFIED tools) so a runaway day cannot take the stock money.

**Rule 3 — scaling is slow and conditional.**

| Condition (7-day, ad-set level, ≥ £150 spent) | Action |
|---|---|
| Cost per order ≤ scale line (£5.55 blend / £8.02 Trio / £7.72 Festive Trio) | Raise budget 20% (Meta: small changes do not reset learning; TikTok: ≤30%, no more than every two days — VERIFIED). Repeat every 3–4 days while true. Ceiling: the 15% rule and stock cover |
| Scale line < cost per order ≤ break-even | Hold budget. Swap the worst creative for a new one (in a **new** ad set, so the running one keeps its learning). No increase |
| Cost per order > break-even for 7 days **or** after £150 | **Pause.** Keep the retargeting set. Diagnose with the ladder in §9 before any restart |
| Cost per order ≤ scale line for 3 consecutive weeks and ≥ 50 purchases/week | Switch bid strategy to **cost-per-result goal** set 10–20% above the observed cost (VERIFIED Meta guidance: run Highest volume first, then set the goal; ad set budget ≥ 5× the goal) |

**Rule 4 — the ceiling is stock, then cash, then CAC.** Never let seven-day paid orders exceed a third of the units on hand for the advertised bundle; a paid order that ships late becomes a refund plus the ad cost.

What this can and cannot do for the goal. Even at the scale line on the Trio (£8.02 CAC, £8.01 left per order), 1,000 paid Trio orders in the Christmas window need ~£8,000 of ad spend, which the 15% rule only releases once organic contribution is running at ~£50,000 over the same weeks — i.e. the ads follow the organic curve, they cannot lead it. That is consistent with `01-maths.md` §7: scenario B does not reach £100k; ads are a margin-neutral amplifier at best in year one. ESTIMATED.

---

## 5. Meta vs TikTok for this product

| Factor | Meta (Facebook + Instagram) | TikTok | Verdict for Catwalk Club |
|---|---|---|---|
| Published minimum budget | Varies by country/objective, shown in Ads Manager; guidance is daily ≥ 5× a cost-per-result goal when one is set (VERIFIED). A £5/day retargeting ad set runs | Daily budget must exceed **$50 per campaign and $20 per ad group** (VERIFIED, July 2026) — about £37 / £15 (ESTIMATED at $1 = £0.75) | Meta fits the §4 budget; TikTok's floor is the entire first-week budget in one ad group |
| Retargeting floor | Website custom audience from pixel events; no published minimum for delivery, but the audience must be large enough to serve (ESTIMATED ≥500) | Custom audiences need **1,000 matched users** (VERIFIED) | Meta retargeting can run in week one; TikTok's cannot until traffic is 3–5× larger |
| Learning phase | ~50 results in 7 days (VERIFIED) | ~25 results or 7 days (VERIFIED) | TikTok is more forgiving on volume, but the budget floor cancels that |
| Best format for a cat clip | Reels and Stories 9:16 (VERIFIED aspect guidance); the same vertical file serves both | In-feed 9:16 ≥540×960; **Spark Ads** boost the organic post and keep its likes, comments and follows (VERIFIED) | Shoot once at 9:16; Spark is the reason TikTok exists in this plan |
| Shopify integration | Free channel creates the pixel, catalogue and Conversions API (VERIFIED, Shopify help) | Channel page blocked today (Cloudflare); pixel documented (VERIFIED, TikTok help) | Meta is a 20-minute set-up from the Shopify admin |
| Marketplace route | Facebook Shop / Instagram Shopping (VERIFIED, Shopify help) — not a priority | TikTok Shop UK at 9% commission, and **GMV Max is the only supported Shop ads campaign since July 2025** (VERIFIED) | When TikTok Shop UK is live (`05-marketplaces.md` §7 priority 2), GMV Max replaces Web Conversions for TikTok spend |
| Who is on it for our moments | UK Christmas gifting: cat-owning parents and grandparents, Facebook cat groups (ESTIMATED — no demographic data fetched) | Where the organic cat content and the reaction format live (`07-demand.md` §5); UK cat-wearable accounts are tiny (best 242 followers, `08-ranking.md`) | Meta for Christmas gifts; TikTok for the reaction clip |
| Creative automation | Advantage+ creative optimises versions of the same asset (VERIFIED) | Smart Creative pauses fatigued videos after 3–5 days (VERIFIED) | Both fine once there are ≥4 creatives; off for the first test so the results are readable |
| Risk for a beginner | Account restrictions are common on new ad accounts (Meta lists "Troubleshoot a disabled or restricted account" as a top support topic on every page fetched — VERIFIED that it is listed) | Same class of risk; plus the $20/day floor on a mistaken campaign | Verify the business, add a second admin, start small on both |

**Decision.** Meta carries the retargeting and the first prospecting test. TikTok gets money only as Spark Ads on a clip that has already proved itself organically (gate 4b), at its £15/day ad-group floor for seven days, pointed at the Trio page, and later as GMV Max on TikTok Shop UK. Instagram Reels placement (inside the Meta campaign) covers the "TikTok-style" audience on Meta without a second budget.

---

## 6. The first campaign structure, exactly

### 6.1 Meta — two campaigns, three ad sets, £20/day

| Level | Setting | Value | Why |
|---|---|---|---|
| **Campaign A: "CC – Retarget"** | Objective | **Sales** → conversion location Website → performance goal **Maximise number of conversions**, event **Purchase** (VERIFIED objective map) | The only audience with a CAC under the ceiling |
| | Budget | £5/day, ad set budget (no Advantage+ campaign budget — one ad set) | Rule 2 |
| | Ad set A1 "Visitors 30d not buyers" | Include: website custom audience, all visitors 30 days **plus** Instagram/Facebook engagers 90 days; **exclude** Purchase 180 days (VERIFIED audience types) | Retarget non-buyers; never pay to show ads to buyers |
| | Placements | Advantage+ placements (VERIFIED name) | Cheapest inventory; Reels/Stories will take most of it |
| | Location / age | United Kingdom, 18+ | UK-only stock and postage |
| | Creatives | 3: Brief 2 (breakaway proof), Brief 4 (honest "five seconds"), a 4:5 photo carousel of the bow tie on a black, white and tabby cat | Objection-answering for people who already saw the product |
| | Frequency guard | If 7-day frequency > 4, refresh creative; if audience < 500, pause | Small audiences burn out in days (ESTIMATED) |
| **Campaign B: "CC – Prospect – A+ Sales"** | Type | **Advantage+ sales campaign** (VERIFIED: sales objective with Advantage+ audience, placements and budget) | Meta's own guidance for a sales campaign; least for a beginner to get wrong |
| | Budget | £15/day Advantage+ campaign budget; campaign spending limit £300 | Rule 2; VERIFIED spend-limit tools |
| | Ad set B1 "UK cats – broad" | Advantage+ audience with **suggestions**: interests cats, cat lovers; age 25–65+; UK; **exclude** Purchase 180 days and Visitors 30 days (so A and B do not compete in the auction) | Advantage+ audience widens beyond suggestions (VERIFIED); exclusions stop auction overlap |
| | Ad set B2 (only when B1 has ≥ 20 purchases) "Lookalike 1–3% of purchasers" | Lookalike from Purchase audience (VERIFIED) | Needs a source audience first; add later, do not launch with it |
| | Placements | Advantage+ placements; upload 9:16 and 4:5 versions of every asset (VERIFIED ratio guidance) | Avoid Meta's auto-crops cutting the cat's head off |
| | Bid strategy | **Highest volume** for the first two weeks; cost-per-result goal only after a baseline exists (VERIFIED guidance) | |
| | Creatives (4) | Brief 1 (five-costume reaction), Brief 3 (Christmas card in five minutes — from 1 Nov; before that Brief 4), Brief 5 (quiz), the 4:5 photo carousel | Diverse creative is Meta's own first best practice (VERIFIED) |
| | Landing pages | Halloween Trio (to 20 Oct) → Festive Trio (from 1 Nov); carousel → Bow Tie Collar red tartan; quiz ad → quiz page | §8 |
| **Budget split** | | Retarget 25% / Prospect 75% at £20/day; move to 15/85 as the retargeting audience saturates (frequency > 4) | |
| **Attribution** | | Default 7-day click / 1-day view; **judge on Shopify orders, not Ads Manager**, because Ads Manager will claim organic buyers who saw a retargeting ad | ESTIMATED practice; the Shopify Marketing report and UTM `utm_source=meta` on every ad link |
| **Reporting columns** | | Amount spent, Results (purchases), Cost per result, Purchase ROAS, Link CTR, CPC (link), CPM, Frequency, **Last significant edit** and **Results since last edit** (VERIFIED columns) | The two learning-phase columns tell you whether a bad number is a learning number |

### 6.2 TikTok — one campaign, one ad group, only when a clip has earned it

| Level | Setting | Value |
|---|---|---|
| Campaign "CC – Spark – [clip name]" | Objective | Website Conversions, optimisation **Complete Payment** (pixel), buying type auction; CBO off (one ad group) |
| Ad group | Budget | Daily, £15–16 (must exceed the $20 floor, VERIFIED); lifetime cap 7 days × daily |
| | Targeting | UK, 18+, broad; no interest layers (TikTok's own CBO guidance prefers volume, VERIFIED); exclude the pixel's purchasers once the audience reaches 1,000 (VERIFIED floor) |
| | Bid | Maximum Results (default, VERIFIED); expect CPM volatility in learning (VERIFIED) |
| | Creative | **Spark Ad** of the organic post (authorisation code from the TikTok account); caption unchanged; CTA "Shop now" → Trio page with `utm_source=tiktok` |
| | Rules | Do not pause or edit for 7 days (VERIFIED learning guidance); budget changes ≤40% and no more than every two days (VERIFIED). Stop at day 7 if cost per order > £8.02 on the Trio |
| Later | TikTok Shop UK live | Replace with a **Product GMV Max** campaign (VERIFIED: the only Shop ads type) on the same clips; commission 9% (`05-marketplaces.md` VERIFIED) |

---

## 7. Five creative briefs, from footage we can shoot

Rules for all five: real cats, real products, no claim that a cat *loves*, *enjoys*, is *calmed* or *comforted* by anything (ASA/CAP, `README.md` §4); wear time shown as seconds to a few minutes; face, ears and legs unrestricted on camera; no maker's-listing ratings shown as ours; no countdown without a real deadline; captions carry the species qualifier ("for cats") because 7 of 10 "cat costume" searches are human costumes (`07-demand.md` finding 1 VERIFIED). Shoot everything **9:16, 1080×1920, ≤30 fps, H.264/AAC** (Meta video guidance VERIFIED; TikTok ≥540×960 VERIFIED) and export a **4:5 crop** for feed. First frame must read without sound; on-screen text inside the safe zone. Hooks are the community's own words from `07-demand.md` §6d and `10-buyers-and-range.md` §5a (VERIFIED sources).

| # | Working title and hook (first line on screen) | Shot list (what to film) | Length | Landing page | What it tests | Legal check |
|---|---|---|---|---|---|---|
| **1** | **"Rating my cat's reaction to five costumes. She was not consulted."** | Owner on camera, one cat, five quick try-ons: Bow Tie (rating 9/10 "handsome"), Spider, Devil Bat Cape, Lion Mane ("miniature lion"), Pumpkin set (hat comes straight off — keep it, that is the joke). Each: on in ≤5 s, one still pose, treat, off. End card: the Trio with price and "free UK delivery" | 25–35 s | Halloween Trio (to 20 Oct); from 1 Nov re-cut with the Santa set as #5 → Festive Trio | The reaction format that reaches 0.8–8.6M views on YouTube vs 10–110k for earnest lists (`07` §5 VERIFIED); the prospecting hook | Honest ratings; no "she loves it"; hat shown coming off |
| **2** | **"Does a breakaway collar actually break away? Watch."** | Macro: the bow tie's buckle; a gentle tug on a snag (a cupboard handle) and it pops; 2-second re-clip; bell unclipped ("The bell debate, settled: it comes off"); the tag tucked between the bow straps so it doesn't spin (a buyer's tip, `10` §5c) | 8–15 s | Bow Tie Collar PDP, red tartan variant selected | The safety objection (#4 in `07` §6b) as an ad; the highest-CTR-per-second format for retargeting | "Breakaway" is a mechanism we show, not a safety claim; add the kitten line: "under 9 months / 3 kg, supervise — the buckle needs a cat's weight" |
| **3** | **"Christmas card photo in under five minutes: collar on, treat, shutter, collar off."** *(from 1 Nov)* | Timer in corner; Santa scarf + red tartan bow tie go on; phone on a book, fairy lights; three takes, the third is the card; collar off, treat; the printed card in hand | 20–30 s | Festive Trio £36.99 | The UK-native Christmas moment (`07` §6c); gifting; the £30+ basket | Wear time shown; "Order by [Royal Mail last date]" only once the date is confirmed in November |
| **4** | **"He hates it. It lasted five seconds. Worth it."** | Phone-shot, unpolished: the Devil Bat Cape goes on a visibly unimpressed cat, one perfect photo, cape off, cat walks away normally; text: "Some cats will. Some won't. 30 days to send it back, worn or not" | 10–15 s | Halloween Trio; in retargeting, the product the visitor viewed | The honest-middle framing that outperforms "she loves it" on every platform measured (`07` §7); the returns promise as the objection-killer | The returns line must match the live policy (`09-teardown-2` P0-2); "worn or not" only if that is truly the policy |
| **5** | **"Which one would your cat tolerate? A collar / a collar and a hat / anything, honestly."** | Three cats (or one cat, three days), each labelled with a `WEAR_LABELS` tier from `data.js`; a bow tie on the shy one, the mane on the middle one, the spider on the "anything" cat; end: "Take the 20-second quiz" | 15–20 s | Quiz page (`quiz.html` / `page.quiz`) → product | Cold-audience self-selection; a quiz visit is a cheap first touch that seeds the retargeting audience and the email list | Tiers are tolerance descriptions, not comfort claims |

Two production notes. Shoot every product on a 3.5 kg cat, not a large one, because "too big" is the number-one complaint on the makers' listings (`07-demand.md` §3c VERIFIED) and a size-honest video pre-empts the return. And keep the raw takes: the "not impressed" outtakes are Brief 4's next three versions, which is how the creative gets refreshed without a new shoot.

---

## 8. Landing pages to use, and what must be true on them first

| Priority | Page | Use for | Contribution before ads | Must be true before a paid click lands (VERIFIED state today unless stated) |
|---|---|---|---|---|
| 1 | **Halloween Trio** bundle (bat + spider + bow tie, £34.99, free delivery, Klarna) — **does not exist yet**; `10-buyers-and-range.md` §7 says build it | Prospecting to 20 Oct; Spark boosts | £16.03 | Built as a bundle product with `contains` metafields; one size selector for both costumes; components in stock |
| 2 | **Festive Trio** (Santa set + bow tie + bandana, £36.99) — to build for 1 Nov | Prospecting 1 Nov – 18 Dec | £15.44 | Re-sourced Santa set landed by 1 Nov (`10` §8, §9c); bandana held in stock, not dropshipped, or it ships as two parcels (`01-maths.md` §4) |
| 3 | **Bow Tie Collar PDP**, red tartan variant preselected | Retargeting; the photo carousel; year-round | £9.14 | Colour as a variant; bell on/off tick-box; "breakaway" in the H1; photographed on three cats (`10` §8) |
| 4 | **Quiz page** | Brief 5 cold traffic | n/a (assist) | Quiz result links to in-stock products with the "for me if" lines |
| 5 | Spider Costume PDP | Only in retargeting to people who viewed it | £8.30 | Leg-inspection line, chest measurement, S/M by neck (`09-teardown-2` finding 4) |
| Never | Lion Mane PDP, Pumpkin set PDP, homepage, the shop grid for cold traffic | — | £5.58 / £5.81 | The mane and pumpkin cannot carry any CAC; the homepage and grid add a click before the buy box |

Site-wide conditions that apply to every paid landing:

| Condition | Evidence today | Fix |
|---|---|---|
| **The expired launch offer is still rendering**: `SALE.active: true`, `ends: 2026-09-22`, ticker at 00D 00H 00M 00S, strike-through list prices on every product | `data.js` line `const SALE` VERIFIED; `09-teardown-2` finding 1; `09-teardown-5` finding 3 | Set `active: false`, move `price` to `list`, remove the ticker. A paid click into a fake reference price is the exact DMCC banned practice, and Meta's ad-quality score also penalises "withholding information" (VERIFIED auction page) |
| Mobile Add-to-cart sits at 1,726 px on our product page vs 894 px on Giant Paws | `09-teardown-5` finding 5 VERIFIED | Collapse the top bar, ticker and pre-title accordions; paid mobile traffic will not scroll 1,700 px |
| No on-body video above the fold | `09-teardown-5` finding 6 | The 8-second cut of Brief 2/4 as the first gallery slot — the ad's promise repeated on the page |
| Reviews block shows the maker's listing rating | `10` §5c line 26 | Label it "Reviews of the maker's listing — not yet reviews of Catwalk Club" or hide it; Judge.me collects ours (`LAUNCH-CHECKLIST.md` §D) |
| Delivery line | `10` §5c line 27 | "£3.95 tracked, free over £30 · arrives [computed dates]" — only on UK-held stock |
| Pixel events | `LAUNCH-CHECKLIST.md` §F: "Connect GA4 and the Meta pixel" — unticked | Both pixels plus Meta Conversions API via the channel; ViewContent, AddToCart, InitiateCheckout, Purchase with value |
| UTMs | none | `?utm_source=meta&utm_medium=paid&utm_campaign=prospect-trio&utm_content=brief1` on every ad; the Shopify Marketing report is the referee |

---

## 9. The KPI ladder: stop / watch / scale, for our margins

Read top to bottom; a bad number lower down is usually caused by the number above it. Benchmarks in the "watch" column are ESTIMATED (no UK pet benchmark could be fetched; the only public figure is a global $0.87 CPC / $16.06 CPM, Shopify blog, Nov 2025 — VERIFIED that it was published, not that it applies). The stop/scale lines in the CAC and ROAS rows are **derived from our contribution** (§2) and are the ones that matter.

| Rung | Metric | Stop / fix | Watch | Scale-worthy | What it tells you when it is bad |
|---|---|---|---|---|---|
| 1 | **CPM** (cost per 1,000 impressions) | > £12 on cold UK Reels/Feed for 3 days | £7–12 | < £7 | Audience too narrow or ad quality low (auction = bid × action rate × quality, VERIFIED); in learning, TikTok warns CPM runs high (VERIFIED) — wait 7 days before judging |
| 2 | **Link CTR** | < 0.7% | 0.7–1.5% | > 1.5% (retargeting > 2%) | The hook fails in the first second. Fix the creative, not the audience: a new ad in a new ad set |
| 3 | **CPC (link)** = CPM ÷ (10 × CTR%) | > £0.60 cold | £0.30–0.60 | < £0.30 | Follows from 1 and 2; there is no separate fix |
| 4 | **Landing-page view rate** (LPV ÷ link clicks) | < 70% | 70–85% | > 85% | Page too slow or the wrong page; our PDP is 1.2 MB / 21 requests (`09-teardown-5` VERIFIED), so a low rate is more likely a deep link that 404s or a redirect |
| 5 | **Add-to-cart rate** (ATC ÷ LPV) | < 5% | 5–10% | > 10% | The page does not repeat the ad's promise, or price shock (£34.99 Trio against a £5.99 Amazon memory — `08-ranking.md` §4) |
| 6 | **Conversion rate** (purchases ÷ LPV) | < 1.0% cold, < 3% retargeting | 1–2% cold, 3–5% retargeting | > 2.5% cold, > 5% retargeting | Checkout friction, delivery charge on sub-£30 baskets, no reviews yet. Replace with Giant Paws' real figure when the friend sends it (`02-giantpaws.md` §10) |
| 7 | **CAC / cost per purchase** — blend | **> £11.11** for 7 days or after £150 | £5.55–11.11 | **≤ £5.55** | The number the business runs on |
| 7 | — Halloween Trio page | > £16.03 | £8.02–16.03 | ≤ £8.02 | |
| 7 | — Festive Trio page | > £15.44 | £7.72–15.44 | ≤ £7.72 | |
| 7 | — Bow Tie PDP (retargeting) | > £9.14 | £4.57–9.14 | ≤ £4.57 | |
| 8 | **ROAS** (Shopify-attributed revenue ÷ spend) — blend | **< 2.1×** | 2.1–4.2× | **≥ 4.2×** | ROAS lines are the same facts as row 7 expressed in revenue; use whichever Ads Manager shows, but reconcile to Shopify orders weekly |
| 8 | — Halloween Trio page | < 2.2× | 2.2–4.4× | ≥ 4.4× | |
| 8 | — Festive Trio page | < 2.4× | 2.4–4.8× | ≥ 4.8× | |
| 8 | — Bow Tie PDP | < 1.6× | 1.6–3.3× | ≥ 3.3× | A low-ticket page needs a lower ROAS to break even but a higher one to be worth scaling — do not copy an "industry 3× ROAS" rule, it is wrong in both directions here |
| 9 | **Frequency** (retargeting) | > 6 in 7 days | 3–6 | < 3 | Audience exhausted; widen the window from 30 to 60 days or refresh creative |
| 10 | **Paid share of orders** | > 40% of weekly orders paid | 15–40% | < 15% | If ads are most of the orders, the business is buying revenue at ~zero profit (`01-maths.md` §7); the organic engine, not the ads, has to be fixed |

Three reading rules. **Pool 7 days** before acting (Meta: weekly averages, VERIFIED; TikTok: 3 days or 50 conversions, VERIFIED). **Spend £150 per ad set before a stop decision**, because at £9 a purchase, £150 is 16 expected purchases and the difference between 10 and 20 is noise. **Judge CAC on Shopify's order count with UTMs, not on Ads Manager's Results**, and treat the difference as view-through claims on organic buyers.

---

## 10. Retargeting and email capture

### 10.1 Audiences (Meta; TikTok mirrors once each reaches 1,000 — VERIFIED floor)

| Audience | Definition | Window | Used in | Excluded from |
|---|---|---|---|---|
| Buyers | Purchase event | 180 days | Post-purchase cross-sell only (Christmas collar to a Halloween buyer, from 1 Nov) | Every prospecting and retargeting set |
| Cart abandoners | AddToCart or InitiateCheckout, no Purchase | 7 days | Retarget ad set, highest priority; Brief 4 + the returns line | — |
| Product viewers | ViewContent, no AddToCart | 14 days | Retarget; the product they viewed (dynamic catalogue ad once the catalogue is synced through the Meta channel) | — |
| All visitors | Any pixel event | 30 days (60 if < 500 people) | Retarget; Brief 2 and the carousel | Prospecting (so A and B do not overlap in the auction) |
| Engagers | Instagram account and Facebook Page engagement, video viewers ≥ 50% | 90 days | Retarget; the cheapest audience because organic posting fills it daily | Prospecting |
| Email list | Customer list custom audience from Shopify subscribers | rolling | Retarget + lookalike source once ≥ 1,000 | — |
| Lookalike 1–3% | From Buyers, then from the email list | — | Prospecting B2, after 20+ purchases | — |

Retargeting economics (ESTIMATED): CPM £9, CTR 2%, CVR 5% → CPC £0.45, CAC £9.00 — under the Trio's break-even and near the bow tie's; the figures to beat within the first fortnight. The audience is small, so the budget stays at £5/day and the win is a low CAC, not volume.

### 10.2 Email and the pop-up — the retargeting that costs nothing per send

| Piece | Tool | Cost at launch scale | What it does | Legal note |
|---|---|---|---|---|
| **WELCOME10 pop-up** (already in the theme; `LAUNCH-CHECKLIST.md` §D) | Theme + Shopify discount code, once per customer, new customers only | £0; −£1.08 contribution on a bow tie order (`10` §7 VERIFIED arithmetic) | Captures the visitor a paid click bought; 10% off is cheaper than every other offer tested in `10` §7 | Real 10% off the regular price; not a "was" price |
| **Welcome automation** (subject: "Your 10% code, and the only rule: five minutes, then treats") | Shopify Messaging automations (VERIFIED: automations exist; usage-priced; on Basic) or Klaviyo free (VERIFIED: 250 profiles / 500 sends) | £0–£few/month | Sends the code; second email 3 days later: Brief 2 as a GIF + the size guide | Marketing consent tick-box at checkout (`LAUNCH-CHECKLIST.md` §B) |
| **Abandoned checkout** | Shopify's built-in abandoned-checkout email + a Messaging automation at 1 h and 24 h | £0 | The 7-day cart audience by email, before the pixel pays for it | No fake "your basket expires" urgency; "£X more for free delivery — add the Bow Tie" is the lawful nudge (`10` §5d) |
| **Post-delivery review request** (day 10) | Judge.me (installed per checklist) | £0 | "A photo of the reaction — good or bad — helps the next cat owner more than five stars" | No incentive tied to a rating; never seed reviews (DMCC) |
| **Cat of the Month** (`DRAW` in `data.js`: free to enter, £25 credit, closes last day of month, first close 31 Oct 2026) | Photo-draw page + Instagram/TikTok | £25/month | The free-entry route into the email list and the UGC wall; the winner's photo is the next month's ad | CAP rules VERIFIED today: state how to enter, closing date, prize and eligibility **in the ad** (8.17); pick the winner at random or with an independent observer and keep evidence (8.24); publish surname and county of winners and tell entrants you will (8.28.5); prize within 30 days; never say "winner" of a draw that has not happened; never make purchase a condition |
| **Christmas cut-off email** | Messaging campaign, 1 Dec and the day before Royal Mail's last date | usage | The one email of the year with a real deadline | Real date only |
| Klaviyo upgrade | when the list passes ~2,000 (`02-giantpaws.md` §10 row 6) | from paid tier | Flows, segments, predictive; not before | — |

Capture rate to aim for: 3–5% of sessions to email (ESTIMATED typical for a pop-up with a real discount). At 5,000 sessions a month that is 150–250 subscribers a month, i.e. the Klaviyo free tier lasts about six weeks, which is why Shopify Messaging is the default.

---

## 11. The ten mistakes that burn a first budget (in the order a beginner makes them)

| # | Mistake | Why it burns money here specifically | Do instead |
|---|---|---|---|
| 1 | **Advertising into the expired sale** | Fake reference price = DMCC banned practice; CMA fines up to 10% of turnover (`02-giantpaws.md` §11); Meta's quality score punishes "withholding information" (VERIFIED) | Gate 1 in §3 before the first pound |
| 2 | **Prospecting first, retargeting never** | Cold CAC £17–47 (ESTIMATED) against a £11.11 break-even; the only paid traffic under the ceiling is retargeting (`01-maths.md` §10) | Campaign A runs first and always |
| 3 | **Choosing the Traffic objective because it is cheap** | Traffic buys clicks from people who click (VERIFIED objective map); a £0.10 click that never buys is dearer than a £0.60 click that does | Sales objective, Purchase event, from day one |
| 4 | **Editing every day** | Every targeting, creative, event or bid change resets the learning phase (VERIFIED list) and the "bad" numbers you reacted to were learning numbers | 7-day, £150 rule; new ideas go in a new ad set |
| 5 | **Sending cold clicks to a £10.99 single item or the Lion Mane** | £9.14 and £5.58 to play with; delivery charge under £30 kills conversion | Trio pages only for cold traffic |
| 6 | **Spending the stock money** | October is capped at ~200 orders by £799 of stock (`01-maths.md` §9 VERIFIED); a paid order you cannot ship is a refund plus the ad | 15% rule; campaign and account spending limits (VERIFIED tools) |
| 7 | **Using the supplier's photos and the maker's ratings in ads** | Image rights, and a "4.8★ (585)" that is not ours is a fabricated-review claim on an ad — the ASA and the CMA both act on it | Own footage only; ratings only when Judge.me has real ones |
| 8 | **Six audiences × six creatives on £20/day** | 36 ads sharing 50 purchases a week can never learn (VERIFIED: "avoid high ad volumes"); TikTok CBO needs 3–5 ad groups with budget ≥ 5× target CPA each (VERIFIED) — that is £150/day, not £15 | One prospecting ad set, four creatives; TikTok one ad group |
| 9 | **Trusting Ads Manager ROAS** | View-through and 7-day click attribution will claim organic buyers who were shown a retargeting ad; the store is not making the profit the dashboard implies | Shopify orders with UTMs are the referee; paid share of orders ≤ 40% |
| 10 | **"She loves it", "vet-approved", "calming", "selling fast", countdowns** | ASA health/comfort claims; DMCC false urgency; the welfare-objector comments will also tank ad quality and CTR | The community's own framing: "five seconds, one photo, treats" (`07` §6d) — it is honest and it outperforms |

Bonus, because it is the one that ends accounts rather than budgets: a brand-new ad account with a new payment method, a new domain and a sudden £300 day is what Meta's automated restriction looks for (ESTIMATED from Meta listing "disabled or restricted account" as a top support topic on every page fetched today). Verify the business, add a second admin, spend £5/day for a week before £20.

---

## 12. The two-week learning plan

Starts the day gates 1–3 in §3 are met (realistically the week the stock lands, ~12–16 October) and gate 4 or 5 is met. If they are met later, the days shift; the order does not. Budgets are the §4 first configuration: £5/day retargeting, £15/day prospecting, £20/day total, £280 for the fortnight, TikTok only if a clip earns it.

| Day | Do | Read / decide | Spend |
|---|---|---|---|
| **1** | Fix `SALE` (prices to regular, ticker off). Install the Facebook & Instagram channel from Shopify (free, VERIFIED); create the pixel, choose Maximum data-sharing, enable Conversions API. Install the TikTok pixel. Place a £1 test order, refund it; confirm Purchase with value in Meta Events Manager. Verify the business in Business Manager; add a second admin; add the payment method | Events fire? If not, nothing else this week | £0 |
| **2** | Build the audiences in §10.1. Build the Halloween Trio (or Festive Trio, if after 1 Nov) as a bundle product. UTM every URL. Set campaign spending limit £300 and account limit £500 | Audience sizes: all visitors 30d ≥ 500? | £0 |
| **3** | Shoot Briefs 1, 2, 4 and the three-cat photo set (Brief 3 waits for the Santa set; Brief 5 needs three cats). Export 9:16 and 4:5 of each. Post Brief 1 organically on TikTok and Reels today — it is also the Spark candidate | — | £0 |
| **4** | Build Campaign A (retarget, £5/day, three creatives) and Campaign B (Advantage+ sales, £15/day, four creatives, Highest volume). Switch on A only | — | £5 |
| **5** | Switch on B. Turn on Shopify Messaging welcome and abandoned-checkout automations; test both to your own inbox | Delivery status should read "Learning" (VERIFIED), not "Rejected" — fix any ad rejection today | £20 |
| **6–7** | Post organically daily. Do not touch the campaigns | Look only at CPM and link CTR (rungs 1–2). If a creative's CTR < 0.5% after 2,000 impressions, note it — do not pause yet | £20/day |
| **8** | First read, pooled days 5–7 | CPM, CTR, LPV rate, ATC rate by creative. Kill nothing under £150 spent unless CTR < 0.5% and LPV rate < 60% (a broken link) | £20 |
| **9–11** | If Brief 1 has passed ~50k organic views: authorise it as a Spark Ad and launch the TikTok ad group at £16/day for 7 days to the Trio page. Otherwise no TikTok spend | Reconcile Ads Manager purchases with Shopify orders carrying `utm_source=meta`; note the gap | £20 (+£16 if Spark) |
| **12** | Second shoot day: three new versions of Brief 4 from outtakes; Brief 2 in a second colour; Brief 3 if the Santa set has landed. Add them as a **new ad set** in Campaign B (adding an ad to a running set resets its learning, VERIFIED) | — | £20 |
| **14** | Fortnight read, pooled days 5–14 (~£200 spent) | Per ad set: cost per purchase and Shopify-reconciled ROAS against the §9 lines for its landing page. Decide: **≤ scale line** → +20% budget; **between** → hold, rotate creative; **> break-even** → pause B, keep A. Write the numbers into the file that replaces the ESTIMATED benchmarks in §9 | £20 |
| **15** | If the friend's Giant Paws analytics have arrived, replace the 1.5% conversion assumption in §2 and re-run the CPC ceilings (`02-giantpaws.md` §10) | — | — |

What "success" looks like at day 14 (ESTIMATED): retargeting at £5–9 per order on 5–10 orders; prospecting between the scale and break-even lines on 10–20 orders with one creative clearly ahead on CTR; email capturing 3–5% of sessions; paid orders under 40% of the week's total. What "stop" looks like: prospecting over £16 per Trio order after £150, or any week where ad spend would have to come out of the next stock order.

---

## 13. Blocked or not obtainable today

| Item | What happened | What was used instead |
|---|---|---|
| Meta Ad Library (UK, "cat costume") | HTTP 403 in Chromium; not bypassed | No competitor ad examples; creative briefs built from `07-demand.md` and `10-buyers-and-range.md` evidence |
| TikTok Creative Center Top Ads (UK, pets) | Renders four generic cards; the rest is login-gated | Nothing |
| Meta GBP minimum budgets and any published CPM/CPC | Meta publishes no prices; the minimum-budget page says minimums vary by country and appear in Ads Manager | Meta's own budget rules (≥5× cost goal, 175%/7× flexibility) VERIFIED; costs ESTIMATED and to be replaced by the account's own numbers at day 14 |
| UK pet-niche CPM/CPC/CVR benchmarks (WordStream, Varos, Lebesgue) | 403 / empty / 404 | A global $0.87 CPC / $16.06 CPM from Shopify's UK blog as context only |
| TikTok GMV Max help article; TikTok channel page on help.shopify.com | Slug not resolvable; Cloudflare challenge | The Video Shopping Ads page's statement that GMV Max is the only Shop ads type since July 2025 (VERIFIED) |
| Shopify Messaging per-email price | Price page redirects to the overview | "Priced by messages sent" (VERIFIED); Klaviyo free tier limits (VERIFIED) as the fallback |
| Giant Paws' real conversion rate, AOV, ad spend and ROAS | Private; awaiting the friend | 1.5% CVR planning assumption from `01-maths.md`; §12 day 15 replaces it |
| gov.uk DMCC guidance page | 404 at the guessed URL | The legal floor as given in the brief and `02-giantpaws.md` §11 |

Working files: `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/research/paid/` (Meta help pages as `pw-meta-*.txt`, TikTok help pages as `tt-*.html`, Shopify and Klaviyo pages, the ASA prize-draw page); the Playwright scripts `paid-pw.js` to `paid-pw4.js` in the scratchpad root.
