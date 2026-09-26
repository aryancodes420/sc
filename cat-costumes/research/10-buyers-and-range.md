# 10 — What makes people buy a cat costume: triggers, moments, copy, offers, the verdict on our seven, and what to add next

Written 26 September 2026 for Catwalk Club (UK Shopify store, seven launch products £7.99–£17.99 launch / £9.49–£21.49 regular, four bundles; goal £100,000 net profit in the 12 months to 30 September 2027). Built on `07-demand.md` (buyer voice), `01-maths.md` (unit economics), `08-ranking.md` and the five `09-teardown-*.md` files, plus **new fetches today** of 39 AliExpress search pages (2,294 unique listings parsed) and 36 supplier feedback feeds. Every number is **VERIFIED** (fetched today or read from the repo/prior file, source given) or **ESTIMATED** (method stated). Regular prices are the base case throughout because the launch offer expired on 22 September (`data.js` `SALE.ends`) and must not be shown as a reference price under the DMCC Act 2024. UK spelling.

---

## 0. The answer in eight lines

1. **People buy a cat costume for a photo, and a collar to look smart every day.** The photo (Christmas card, grandma, Instagram, "serotonin boost" threads) is the #1 trigger in every source; "handsome collar / dapper / gentleman" is #2 and is the only trigger that runs 12 months a year. VERIFIED (`07-demand.md` §6a; 585 bow-tie reviews).
2. **The objection that loses the sale is "my cat will hate it", and the honest answer wins it back.** The community's own norm is "five seconds, one photo, then treats"; the copy that converts says exactly that and offers a no-quibble 30-day return. Never "cats love it" (ASA/CAP). VERIFIED.
3. **The UK moment is Christmas, not Halloween.** 93–100% of Christmas-set reviews land Nov–Jan; the bow tie's Christmas peak beats its Halloween one; UK Reddit has zero cat-costume threads while r/CasualUK's 8,647-upvote thread is about *not* dressing up. Halloween is the US/EU moment (Amazon US #1 cat apparel item is a $5.99 bat wing, 8,626 reviews). VERIFIED.
4. **Homepage order today: Spider → Devil Bat Cape → Bow Tie (in colours) → Halloween Trio → Lion Mane → Pumpkin set → Santa set; from 1 November flip to Bow Tie red tartan → Santa set → Festive Trio.** Reasoning in §6.
5. **The offer that fits is a three-item bundle at £34.99 that clears the £30 free-delivery line (contribution £16.03 vs £15.89 for the pair), a "one for every season" bow-tie trio at £27.99 (£22.05), and a two-cat pair at £19.99 (£16.08).** A 10% first-order code costs £1.08 on a bow tie order; free delivery at £20 instead of £30 costs £3.87 on a two-collar basket. ESTIMATED from VERIFIED inputs (§7).
6. **Verdict on the seven:** Bow Tie Collar and Spider Costume are **winners**; Devil Bat Cape, Lion Mane and Bandana Collar are **passengers** (keep, reposition); Pumpkin Hat & Ruffle Collar and the Santa Hat & Scarf Set as sourced are **drops** — re-source the Santa set at $2.74 (knitted, 4.9★) and replace the pumpkin *hat* with a bat-wing traffic item. §8.
7. **The bow tie's cost in the repo is a promo price.** Today the listing card shows original $2.05 / seller offer $1.99 / new-user promo $1.33; the repo's $1.09 was the first-order promo on 14 September. Real landed cost is ~£2.84, not £1.82; gross at £10.99 is still 74%. VERIFIED today (§10).
8. **Add next, in this order:** embroidered breakaway collar in 10+ colours (10,793 orders on one listing, $2.09), AirTag breakaway collar (9,484 orders, $3.76), tuxedo/wedding bow tie (3,281, $3.28), birthday set (UK-stock listing, 5.0★), fleece jumper for Sphynx/thin-coated cats (1,995, 4.9★), cat harness & lead (2,486, 4.9★), Christmas snowflake bow collar (1,013, 4.9★), cheap bat wings (3,579, $4.72), dinosaur fleece hoodie for small dogs (1,603). All AliExpress Choice, all 4.5★+, listing ids in §9. VERIFIED today.

---

## 1. What was fetched today and how

| Source | Method | Result |
|---|---|---|
| AliExpress search HTML, 39 queries (`https://www.aliexpress.com/w/wholesale-<slug>.html?SearchText=...`) | curl, desktop Chrome UA, `en-GB` | HTTP 200 every time, 60 cards per page; 2,294 unique listings parsed from the embedded `itemList` JSON: product id, title, original and promo price, `real_trade_count` (exact lifetime orders), star rating, Choice tag, ship-from. Files: `scratchpad/ali/*.json`, `ali/all_items.json` |
| AliExpress `shipFromCountry=UK` filter | same, `&shipFromCountry=UK` | **Ignored by the server in curl** — every result still ships from CN. The 14 Sep finding that the bandana and birthday-set listings are UK-stocked (`sourcing.md`) carries over unverified today. Confirm on the listing before ordering |
| AliExpress feedback endpoint (`feedback.aliexpress.com/pc/searchEvaluation.do`) for 36 listings | curl, page 1 × 20 | Total ratings, star split, buyer country, latest review date, low-star text. Files: `ali/fb/<id>.json`. Four fetches hit a transient empty response and succeeded on retry |
| Royal Mail Christmas last-posting dates | `royalmail.com/christmas/last-posting-dates` and two variants | HTTP 403 on all three; dates in §4 are ESTIMATED from the pattern of prior years |
| Prior files | read | `07-demand.md` (Reddit 41 threads, autocomplete, review seasonality, YouTube), `01-maths.md`, `08-ranking.md`, `09-teardown-1…5.md`, `03/04/05` for price anchors, `sourcing.md`, `supplier-reviews.md`, `data.js` |

Prices on AliExpress search cards are shown three ways: the **original price** (what a repeat buyer pays), a **seller offer** and a **new-user promo** ($0.33–$1.33). Every cost in this file is the **original price**, which is the one to plan on.

---

## 2. Ranked buying triggers

Ranked by how often each appears across Reddit (41 threads), the seven suppliers' review feeds (944 reviews on our listings plus ~5,000 ratings on candidate listings), autocomplete on three platforms and YouTube view counts. Counts are VERIFIED in `07-demand.md` §2–§5 and `supplier-reviews.md`; the ranking is the same evidence re-weighted for *what it sells*.

| # | Trigger | Strength of evidence | What it sells | What to do on the site |
|---|---|---|---|---|
| 1 | **The photo** — Christmas card, "so we can send photos to grandma", the annual r/cats Halloween photo thread (1,369 upvotes, 94 comments), "serotonin boost" | Strongest; appears in every source; 6 supplier reviews mention photos | Everything; sets for Christmas, spider/bat/mane for Halloween | Sell the *photo*, not the garment: every hero image is a cat in the product in a home setting; "Get the shot in five minutes" is the promise |
| 2 | **Looking smart every day** — "handsome collar", "dapper", "gentleman", "cat drip", "fancy man", "compliments" | 9 of 80 bow-tie reviews; the "handsome collar" story (cat rubs his face on it) is the most-liked pro-costume Reddit comment | Bow Tie Collar; every collar added in §9 | Year-round base load; the 12-month business |
| 3 | **Seasonal colour rotation** — "black and white most of the year, red at Christmas, blue and yellow plaid for spring/Easter, orange for Halloween" (one US buyer, Oct 2025); "second time I ordered" ×2; "I have several colours for my kitten" | 7 repeat/multi-colour mentions in 80 bow-tie reviews; review data shows Colour codes 1–18 on the listing | Bow tie in colourways; the repeat purchase the maths needs | Colour is a variant, named, photographed on a cat; "collect the seasons" set (§7) |
| 4 | **Safety upgrade** — wants a breakaway that is also nice; "quick release clip, nice peace of mind"; "everything is either boring, gaudy, or not even a breakaway" | 6 buckle mentions in 80 reviews; Amazon UK autocompletes "cat bandana collar quick release"; the 10,793-order everyday collar listing leads its title with "Safety Breakaway Buckle" | All collars | "Breakaway" in the H1 and the `<title>`; a 3-second clasp-pop clip |
| 5 | **Birthday** — "Every year I put my cat in a birthday hat. Every year she hates it" (248 upvotes); "It's her 3rd birthday! She hates the hat" (2,024 upvotes); Etsy "cat bandana with birthday cap"; Amazon UK Best Sellers #5, #11, #16, #23, #26 are birthday sets | Two of the largest cat threads found are birthday hats; five birthday sets in the Amazon UK top 30 | Birthday set (§9 #4) | Add it; a "birthday" chip on the shop page; a gift-note field |
| 6 | **Matching household / two cats** — "our family costume this year is…"; "matching costume for two cats" | Reddit, 56-upvote comment; two-cat pairs asked for | Pairs; "for cats & small dogs" | Two-of-the-same pair price (§7) |
| 7 | **Gift for someone else's cat** — "for my friend's cat", "for my boyfriend's cat" | 4 of 80 bow-tie reviews | Gift note, gift wrap, Christmas cut-off | Gift note in cart from 1 November |
| 8 | **Transformation / the laugh** — "if you have an orange cat it will look like a miniature lion"; "laughed for a good five minutes"; "the cat and neighbours are shocked" | 8 mentions across mane/spider/sets; reaction videos reach 0.8–8.6M views vs 10–110k for "best costumes" lists | Lion Mane, Spider, Bat Cape — as *content* | Film the reaction, never the catwalk |
| 9 | **Foster/adoption photos** — "cute pictures help get them adopted" | Reddit, 1 strong comment; rescues post adoption photos weekly | Collars, capes | Rescue partnership: donate 20 collars for UGC (CAP: only claim a charity tie-in that exists) |
| 10 | **Wedding** — Etsy autocompletes "cat bow tie wedding"; tuxedo bow-tie listing 3,281 orders; Amazon US Casidoxi tuxedo collar 782 reviews at $9.97 | Autocomplete + listing volume | Black/white tuxedo bow tie (§9 #3) | "Cat of honour" story, Apr–Sep |

---

## 3. Ranked objections and the answer that stays inside the law

| # | Objection (buyer's words) | Where it shows | Honest answer (use verbatim) | Do not say |
|---|---|---|---|---|
| 1 | "99% of the time, yeah, cats hate being dressed up" · "my cat would claw my face" | Dominant in all three Reddit debate threads (428, 99, 29 comments) | "Most cats will put up with a collar or a cape for a photo. Some never will. Put it on, get the shot, take it off, pay in treats. If yours says no, send it back within 30 days — worn or not." | "Cats love it", "comfortable", "she won't even notice", any welfare or comfort claim (ASA/CAP health-claim territory) |
| 2 | "It's cruel / cats aren't dolls / for internet points" | Reddit, upvoted but not the buyer | Show cats walking, sitting and jumping normally in it; state "a few minutes for the photo"; no argument with critics | Any claim it calms, soothes or reduces stress |
| 3 | "Too big / it fell off / scared my young cat" — the #1 product complaint (4 of 5 low mane reviews; pumpkin collar; Santa hat "a bit big"; bandana "ridiculously tiny" vs "bit big for a toy poodle") | Supplier reviews, Reddit | Real neck cm **measured on our samples**, in cm and inches; minimum cat weight for mane and spider; "under 3 kg or under 9 months: take the smaller size"; free size swap | "One size fits all", the supplier's chart digits read from a small photo (`data.js` `confirm` note on the cape) |
| 4 | "Is the breakaway safe? Kittens? The bell?" — "clasp too stiff / too easy", "take at least the bell off", kittens under ~9 months may not trigger it | 37-comment CatAdvice safety thread; 3 clasp reviews; 1 bell review | "The buckle is meant to pop if the collar snags — that is the trade-off. Under 2.5 kg it may not: supervise kittens. Bell comes off (or tick 'no bell')." | "100% safe", "vet-approved" (unless a named vet has approved it in writing) |
| 5 | "The wire legs" — 3 of 4 low spider reviews (broken leg on arrival, "wire may hurt pets") | Supplier reviews | Inspect every unit; "wire-cored legs, supervised wear only, not for chewers"; free replacement for any leg damaged in transit | Silence |
| 6 | "Amazon has it for £3.61" (lion mane); "£5.99 bat wings" (US) | `sourcing.md`; Amazon US #1 | "Cat-sized (S/M/L by neck), UK stock, 2–4 day tracked delivery, real photos on real cats, 30-day returns." Price the mane and any bat wings as traffic items | Pretending the Amazon item does not exist |
| 7 | "Cheap synthetic / a mockery of a cat" (the one GB 1★ on the mane) | Supplier reviews | Cannot be argued away. Honest photography, and let the objector pass | Over-claiming quality |
| 8 | "Will it arrive in time?" | Halloween window closes ~14–20 Oct; Christmas last post | Order-by date on every page; delivery window under the price; stock held in the UK (the promise in `DELIVERY` is only true for UK-held stock) | "2–4 working days" on anything that is not physically in the UK |

---

## 4. Moments and dates that drive purchases — UK and US, this year

The window is 26 September 2026 to 30 September 2027, so it contains **one** Halloween, **one** Christmas, and the whole of the 2027 spring/summer collar season; Halloween 2027 falls outside it. Order windows are ESTIMATED from review-date seasonality (2–5 week review lag on 10–20 day shipping, `07-demand.md` §4) and from US brands' drop dates (`04-competitors-us.md` §7.2).

| Moment | Date | UK strength | US strength | Order window (customers buy) | What must be live and in stock | Evidence |
|---|---|---|---|---|---|---|
| **Halloween** | Sat 31 Oct 2026 | Muted (no UK cat-costume thread anywhere; CasualUK "the UK doesn't dress up") | Strongest US moment; NRF pet-costume spend $0.92bn 2026; Amazon US New Releases already all-Halloween on 26 Sep | **Now – 20 Oct** for UK delivery; US brands dropped 28 Aug | Spider, Bat Cape, Lion Mane, Halloween Trio; bat wings traffic item if it can land by 15 Oct (10–20 days: borderline) | VERIFIED `07` §2, §4; `04` §7.2; `05` §2.2 |
| National Black Cat Day (Cats Protection, UK) | Tue 27 Oct 2026 | Small, UK-native, content moment | — | 20–27 Oct | Bow tie on a black cat (also answers "bow hidden in fur") | ESTIMATED date (annual, 27 Oct); content only |
| National Cat Day (US) | Thu 29 Oct 2026 | — | Content moment | — | Content only | ESTIMATED (annual) |
| **Black Friday / Cyber Monday** | Fri 27 Nov – Mon 30 Nov 2026 | Real UK moment; the only lawful place for a genuine, dated, collection-wide reduction from prices that have been charged since launch | Same | 20–30 Nov | A real prior price on every SKU since 26 Sep; Christmas stock landed | DMCC: Made By Cleo's dated collection-wide 25% is the lawful pattern (`09-teardown-1`) |
| **Christmas photo / gift** | Fri 25 Dec 2026 | **Strongest UK moment**: "cat christmas outfit pets at home" autocompletes; 93–100% of Christmas-set reviews Nov–Jan; bow tie peaks Nov–Dec (36% of its year) | Second US peak; Made By Cleo's Santa Hat is its most-reviewed costume | **1 Nov – ~18 Dec**; gifts by Royal Mail last dates | Bow tie in red tartan, Santa set (re-sourced), Christmas snowflake bow collar, Festive Trio, gift note, cut-off date on the top bar from 1 Dec | VERIFIED `07` §1, §4, §6c |
| Christmas Jumper Day (Save the Children) | Fri 11 Dec 2026 (second Friday; ESTIMATED) | Content moment; the Christmas knitted jumper listing has 5,164 orders | — | 1–10 Dec | Christmas jumper (§9) | ESTIMATED date; VERIFIED listing |
| Royal Mail last posting dates | 2nd Class / Tracked 48 ~Sat 19 Dec; 1st Class / Tracked 24 ~Mon 21 Dec 2026 | Hard stop for gifts | — | — | Top bar "Order by [date] for Christmas" | ESTIMATED (royalmail.com returned 403 on all three attempts today); confirm in November |
| New Year / "new collar" | 1 Jan 2027 | Small; bow-tie reviews continue in Jan (9 of 80) | Small | Jan | Everyday collars, AirTag collar | VERIFIED review dates |
| **Valentine's Day** | Sun 14 Feb 2027 | Small, gift-led ("for my boyfriend's cat") | Larger; TikTok Shop US bat-cape title includes "Valentine's Day" | 1–12 Feb | Red bow tie, heart bandana (weak listing: 96 orders), tuxedo bow tie | VERIFIED `09-teardown-2` §1; listing data today |
| Mothering Sunday (UK) | Sun 7 Mar 2027 (3 weeks before Easter; ESTIMATED) | Gift moment for "cat mums" | US Mother's Day Sun 9 May 2027 | late Feb – 5 Mar | Gift bundles, gift note | ESTIMATED |
| **Easter / spring** | Sun 28 Mar 2027 | "blue and yellow plaid for spring/Easter sunday" (review); bandana listing peaks Apr–Jun (mostly dog buyers) | Same | Mar – Jun | Spring plaids, flower collar, bandanas, small-dog bandanas | VERIFIED `07` §4 (bandana 36/35/31 reviews in Apr/May/Jun) |
| Wedding season | May – Sep 2027 | Niche | Niche | Apr – Aug | Tuxedo bow tie (black/white), white lace collar | VERIFIED Etsy autocomplete; 3,281-order tuxedo listing |
| Birthdays | all year | Steady; 5 birthday sets in Amazon UK Cat Clothing top 30 | Steady; 4 in Amazon US top 30 | all year | Birthday set (§9 #4) | VERIFIED `05` §1.2, §2.1 |
| Adoption / "gotcha day" | all year | Rescue content | Same | all year | Collars | VERIFIED Reddit #10 |
| International Cat Day | Sun 8 Aug 2027 | Content | Content | — | — | ESTIMATED (annual) |
| Halloween 2027 pre-season | drop by **25 Aug 2027** | — | US brands drop 28 Aug | Late Aug – Sep 2027 | 2027 Halloween range ordered by June 2027 — outside the goal window's revenue but inside its cash plan | VERIFIED `04` §7.2 |

Reading for the plan: **Q4 2026 is 60–70% of the year's costume revenue** (ESTIMATED from the review shares), and the Christmas half of it is the UK-native half. From January the shop lives on collars and the need-based lines in §9; the calendar above is the content calendar for the owner's daily posting.

---

## 5. Hooks and page copy we can use

Rules applied: no claim a cat *enjoys* or is *calmed* by anything; no "vet-approved"; no fabricated numbers; the maker's-listing rating labelled as such; no countdown without a real deadline; every claim of stock, delivery and returns must be true on the day.

### 5a. Video hooks (TikTok / Reels / Shorts — first line on screen)

1. "Rating my cat's reaction to five Halloween costumes. She was not consulted."
2. "POV: it's the 30th of October and you've just remembered the cat."
3. "He hates it. It lasted five seconds. Worth it." *(the community's own framing — `07` §6d)*
4. "Orange cat + £11.99 = miniature lion." *(supplier review, Dec 2025)*
5. "The bell debate, settled: it comes off." *(3-second clip of the bell unclipping)*
6. "Does a breakaway collar actually break away? Watch." *(clasp pops under a tug)*
7. "Which one would your cat tolerate? Collar / collar and hat / anything, honestly." *(the site's own quiz — `WEAR_LABELS` in `data.js`)*
8. "Christmas card photo in under five minutes: collar on, treat, shutter, collar off."
9. "Dressing the foster kittens for their adoption photos." *(only with a real rescue)*
10. "Grumpy strawberry energy." *(caption template for any reaction clip)*
11. "Small dog owners: yes, it fits. Neck 24–40 cm." *(bandana/bow tie on a chihuahua)*
12. "Black cat, red tartan. That's the post." *(27 Oct, National Black Cat Day)*

### 5b. Homepage

13. Hero: **"Seriously cute costumes for cats. Worn for the photo, off in five minutes."**
14. Sub-line: "Cat-sized fits by neck measurement · breakaway collars · UK stock, tracked delivery in 2–4 working days · 30 days to change your mind, worn or not." *(each clause must be true before it goes live — `09-teardown-2` P0-2)*
15. Halloween strip (until 20 Oct): "Order by Tuesday 14 October for Halloween." *(real date from stock; move the date, never fake it)*
16. From 1 Nov: "Christmas photo sorted: red tartan bow tie £10.99 · Order by [Royal Mail date] for Christmas."
17. Trust row: "Dispatched from [town] within 1 working day · Royal Mail Tracked 48 · Free UK delivery over £30 · Returns accepted worn or not, 30 days."

### 5c. Product page lines

18. Bow Tie Collar H1: **"Bow Tie Collar for Cats & Small Dogs — breakaway buckle, bell optional"**; subtitle "Adjusts to fit most adult cats over 2.5 kg. Eighteen plaids on the maker's listing; we stock red, blue and green (photographed on a black cat, a white cat and a tabby)."
19. Bow Tie "why this one": "The tag goes between the bow straps so it doesn't spin round — a tip from a buyer who's on her second set."
20. Spider Costume H1: **"Spider Costume for Cats & Small Dogs — Halloween, S/M by neck"**; line: "Eight wire-cored plush legs on a felt body, two Velcro straps. Supervised wear only; not for chewers. Every set is checked for bent legs before it leaves us."
21. Devil Bat Cape: "Cape, hood and horns in one piece, Velcro at the neck. Most cats tolerate a loose cape better than a hat — this is the one to start with." *(tolerance ranking from `07` §2c: capes and collars tolerated, hats hated)*
22. Lion Mane: "Runs big — buyers of the maker's listing said so. Under 3.5 kg, take S. If it isn't the lion you pictured, send it back."
23. Pumpkin set / Santa set: "The ruffle collar is the part most cats keep on; the hat is for the photo. Two minutes, one treat, done."
24. Fit card on every product: "Under 3 kg or under 9 months? Take the smaller size and stay with them — breakaway buckles need a cat's weight to pop."
25. Keep-it-on card: "Put it on, get the shot, take it off. If your cat says no, that's a return, not a failure."
26. Reviews block label: "Reviews of the maker's listing, shared with permission — not yet reviews of Catwalk Club." *(replaces the "Verified purchase" pill — DMCC)*
27. Delivery line under price: "£3.95 tracked, free over £30 · arrives Tue 29 Sep – Thu 1 Oct." *(computed, only on UK-held stock)*

### 5d. Cart, drawer and email

28. Drawer after add: "Spider added. £14.51 more for free delivery — add the Bow Tie Collar (£10.99) and you're there."
29. Cart gift line: "Sending it to someone else's cat? Add a free gift note — we leave the price off the slip."
30. Welcome email subject: "Your 10% code, and the only rule: five minutes, then treats."
31. Post-purchase (day 10) review request: "How did it go? A photo of the reaction — good or bad — helps the next cat owner more than five stars." *(no incentive tied to a rating; Cat of the Month stays the free-entry route)*
32. Christmas top bar from 1 Dec: "Last order for Christmas delivery: [date]. After that, we'll still try — but we won't promise."

### 5e. Ad/listing titles for search (Amazon, Etsy, TikTok Shop, Google)

33. "Halloween Costume for Cats — Spider, Cat-Sized S/M, UK Stock" · "Cat Bow Tie Collar Red Tartan — Breakaway, Bell Removable, Cats & Small Dogs" · "Lion Mane Costume for Cats — S/M/L by Neck" · "Cat Christmas Outfit — Santa Hat & Scarf, Festive Set". Always the species qualifier: 7 of 10 "cat costume" suggestions are human costumes (`07` §1).

---

## 6. Product order on the homepage

Order by (a) what search intent names, (b) what the moment is, (c) margin per order, (d) what has stock. VERIFIED inputs from `07` §1 (only the spider is a named autocomplete term), `01-maths.md` §3 (contribution per order) and `sourcing.md` (sold counts).

**26 Sep – 20 Oct (Halloween window):**

| Slot | Product | Why here | Contribution / single order at regular price (ESTIMATED, §7 method) |
|---|---|---|---|
| 1 | **Spider Costume** | The only costume that is a search term ("cat halloween costume spider", Amazon UK #4) and the transformation clip | £8.30 |
| 2 | **Devil Bat Cape** | Bat is the archetype that sells 5,000+/month in the US; loose capes are the most-tolerated costume; needs a hero video because its listing has 0 reviews | £9.78 |
| 3 | **Bow Tie Collar, three colours (orange plaid for Halloween)** | The margin engine; year-round; the item to add to reach £30 | £9.14 |
| 4 | **Halloween Trio (bat + spider + bow tie) £34.99** | The only bundle that clears free delivery and Klarna; the AOV lever | £16.03 |
| 5 | **Lion Mane** | Trend #2 cat costume (MetLife/Google Trends 2025) but polluted search and an Amazon £3.61 anchor; a content item priced as traffic | £5.58 |
| 6 | **Pumpkin Hat & Ruffle Collar** | Trend #1 costume theme but the *hat* barely sells (72 orders on the listing) and margin is 32% of charged | £5.81 |
| 7 | **Santa Hat & Scarf Set** | Not the moment yet; thinnest margin; re-source | £8.95 |

**1 Nov – 18 Dec (Christmas window):** 1 Bow Tie Collar red tartan → 2 Santa set (re-sourced) → 3 Festive Trio £36.99 → 4 Christmas snowflake bow collar (§9) → 5 Christmas jumper (§9, if landed) → 6 Bat Cape ("last few") → 7 Spider.

**January – September 2027:** 1 Bow Tie (spring plaids) → 2 Everyday breakaway collar in colours (§9 #1) → 3 AirTag collar → 4 Fleece jumper → 5 Harness & lead → 6 Birthday set → 7 Bandana (cats & small dogs).

Card rule: three chips on every card — occasion, what the cat wears (collar / collar and hat / body), from £ — because the quiz data in `data.js` (`WEAR`) already encodes tolerance and it is the first question every buyer asks.

---

## 7. Offers that fit, with the margin cost of each

Method: `01-maths.md` inputs — landed costs from `sourcing.md` (bow tie kept at £1.82 for comparability; see §10 for the corrected £2.84), Royal Mail Tracked 48 online rates (£2.85 large letter / £3.65 small parcel, VERIFIED), packaging £0.35/£0.60, Shopify Payments 2% + 25p (Klarna 4.99% + 30p), returns 5% allowance. Regular prices. All rows ESTIMATED from VERIFIED inputs; script `scratchpad/ali/offers.py`.

| Offer | Charged | Contribution | % | What it costs vs the plain alternative | Verdict |
|---|---|---|---|---|---|
| Bow tie alone, £10.99 + £3.95 delivery (baseline) | £14.94 | £9.14 | 61% | — | The unit everything is measured against |
| **Halloween Trio**: bat + spider + bow tie at £34.99, free delivery, Klarna eligible | £34.99 | £16.03 | 46% | +£0.14 vs the Halloween Pair at £28.99 (£15.89) and the customer gets a collar and free delivery; the store gets a £30+ order and a collar buyer who comes back | **Build it.** The single best offer in the range |
| Halloween Trio paid by Klarna | £34.99 | £14.88 | 43% | −£1.15 Klarna fee | Accept; Klarna is what makes £35 feel like £11.66 |
| Festive Trio: Santa set + bow tie + bandana (own stock) at £36.99 | £36.99 | £15.44 | 42% | +£3.41 vs Festive Pair at £30.49 (£12.03) | Build for 1 Nov |
| **"One for every season"**: three bow ties (red, blue, orange/green) at £27.99 + delivery | £31.94 | £22.05 | 69% | Sells three of the highest-margin item in one parcel; £5.97 off three | **Build it.** Mirrors the verified buyer behaviour (four collars for four seasons) |
| **Two cats**: two bow ties at £19.99 + delivery | £23.94 | £16.08 | 67% | £1.99 off; matching-household trigger | Build it (also works as "cat & small dog") |
| WELCOME10 (10% off goods) on a bow tie order | £13.84 | £8.06 | 58% | −£1.08 per order | Keep: cheapest acquisition tool there is, and the pop-up already promises it |
| £2 off first order instead of 10% | £12.94 | £7.14 | 55% | −£2.00 | Worse than 10% on every basket under £20 |
| Free delivery at £20 instead of £30, on a two-collar basket (£20.48) | £20.48 | £11.61 | 57% | −£3.87 vs charging delivery (£15.48) | **Do not lower the threshold.** Build baskets up to £30 with the add-on box instead |
| Free delivery threshold £25 | — | no change on any bundle-led basket (all land at £28.99–£36.99 or under £25) | — | — | No effect; leave at £30 |
| Gift wrap £1.99 (tissue, card, £0.60 cost) | £16.93 | £10.49 | 62% | +£1.35 per taker | Offer from 1 Nov; charge for it |
| Genuine 10% Halloween collection reduction (dated, from prices charged since 26 Sep) on the spider | £17.89 | £6.78 | 38% | −£1.52 per order | Only if stock is at risk of being unsold after 20 Oct; must be dated and real (DMCC) |
| Bandana alone (dropship) | £13.44 | £9.94 | 74% | — | Highest single-item contribution; keep it on every "add one more" prompt |
| Lion mane alone | £15.94 | £5.58 | 35% | — | Traffic item: do not discount further |
| Pumpkin set alone | £18.44 | £5.81 | 32% | — | See §8 |
| Santa set alone | £25.44 | £8.95 | 35% | — | See §8 |

Two structural notes. First, **none of the four launch bundles reaches £30**, so the theme's free-delivery bar and the Klarna line are unreachable by the store's own best offers (`01-maths.md` §4); the two trios fix that. Second, **first-order discounts, gifting and the trios all cost less than £1.60 per order, while lowering the free-delivery line costs £3.87** — the cheap offers are the ones that raise the basket, not the ones that cut the price.

---

## 8. Verdict on the seven

| Product | Verdict | Reasons (VERIFIED unless tagged) | Action |
|---|---|---|---|
| **Bow Tie Collar** | **Winner** | 5,063 orders on the listing (today), 585 ratings at 4.8; sells in every month with a Nov–Dec peak; "handsome collar / gentleman / compliments" is trigger #2; 74% gross even at the corrected $2.05 cost; the add-on that carries every basket to £30; Amazon-able under the £10 / 5% referral tier | Make colour a variant (red, blue, green now; orange for next Halloween); bell on/off tick-box; photograph on black, white and tabby cats; put "breakaway" in the H1 |
| **Spider Costume** | **Winner** (for the next four weeks) | The only costume that is a search term on Amazon UK for both cats and dogs; 71% of its listing's reviews Oct–Jan; loose body + Velcro is a tolerated format; £8.30 contribution alone, £16.03 in the Trio. Risk: wire legs (3 of 4 low reviews) — inspect every unit. Note `sourcing.md`'s Sep-15 trend list ranked spider weakest on TikTok Shop US (10 sold); the autocomplete signal in `07` is the stronger and more recent evidence | Lead Halloween with it; "for Cats & Small Dogs" in the title; leg-inspection line on the page; box it (small parcel) |
| **Devil Bat Cape** | **Passenger** — keep, needs proof | Bat is the highest-volume cat-costume archetype in both markets (Amazon US #1 at $5.99, 8,626 reviews; TikTok Shop US 11.7K sold), but *our* listing (3256812487071410) has 0 reviews and did not surface in today's searches; its cost is uncertain ($4.54 or $7.29); a £15.49 cape is judged against a £5.99 memory | Keep for the Trio; film it first (a moving cat in the cape is the proof the listing lacks); confirm the price on the sample invoice; add the $4.72 bat-wing harness (§9 #8) as the traffic item beneath it |
| **Lion Mane** | **Passenger** — content item, not a profit item | Trend #2 cat costume; 769 orders, 4.6★, but 4 of 5 low reviews are "too big / scared my young cat"; Amazon UK from £3.61; £5.58 contribution alone; search polluted by the "lion cut" haircut | Keep at £11.99 as the reaction-video star; "runs big, take S under 3.5 kg"; never discount below £9.99; a fuller mane would be the only reason to re-source |
| **Bandana Collar** | **Passenger** — right product, wrong story | 1,745 orders, 4.7★, UK-stock dropship (per 14 Sep; not re-verifiable today), £9.94 contribution — the best single-item number in the range — but photographed on dogs, buyers are mostly dog owners, buckle is not a breakaway, one GB 1★ "ridiculously tiny", and it is 60% above the UK handmade norm (£4.99) | Reposition as **"Bandana Collar for Cats & Small Dogs"** with measured S/M/L in cm; it is the bridge to the small-dog range and the Feb–Aug counter-season; add a cat-sized print bandana later (§9) only at £8.99+ |
| **Pumpkin Hat & Ruffle Collar** | **Drop** (after this Halloween's stock) | 72 orders and 8 ratings on the listing; the hat is the most-hated format ("they HATE hats"); the one low review is "collar too big"; 32% contribution; pumpkin is the #1 *theme* but demand is for a pumpkin body/vest, not a hat (`sourcing.md` finding 3) | Sell through; do not reorder. For 2027 replace with the pumpkin Halloween vest (3256812384132687, $4.09, 260 orders, 4.9★) or the Christmas-tree variant of the same listing for December |
| **Santa Hat & Scarf Set** | **Drop as sourced; re-source** | 104 orders, 15 ratings; $11.16 original price today (repo $10.73); 35% contribution; the scarf is what gets worn ("they could only use the little scarf", "headband Velcro doesn't hold"); UK comparison set is Christmas collars at £9.99–10.99 | Re-source to the knitted Santa hat + scarf 3256809994960270 ($2.74, 203 orders, 4.9★, 14 ratings — small sample) at £9.99 (65% gross), or the Santa/elk hat + bandana set 3256807808942214 ($9.90, 945 orders, 4.7★, 91 ratings) at £14.99; order by 10 October to land for 1 November |

Net: two winners, three passengers that earn their place with a repositioning, two drops. The range after the swaps is still seven lines, with the Christmas line's gross margin moving from 39% to 65%.

---

## 9. What to add next

Selection rule: a listing found in today's AliExpress search HTML with ≥200 lifetime orders, ≥4.5★, Choice, and a UK retail anchor from the prior files. Landed £ = original $ × 0.79 × 1.2 (AliExpress charges UK VAT) + £0.90 shipping share (the repo's method, ESTIMATED). Contribution = single-item order at the suggested retail with £3.95 delivery charged, Tracked 48, packaging, 2% + 25p fees and 5% returns (ESTIMATED, same as §7). "Ratings" is the feedback endpoint's star total today; "Orders" is the search card's `real_trade_count`. All listing data VERIFIED today, 26 Sep 2026; all ship from China (10–20 days) unless stated.

### 9a. Evergreen, with repeat purchase (cats and small dogs)

| # | Product | Listing id | Orig. $ | Landed £ | Orders | Rating (ratings) | Choice | Suggested UK retail | Gross £ / GM% | Contrib. £ | UK anchor (VERIFIED, prior files) | Why |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Everyday breakaway collar, embroidered (cherry blossom, multi-colour), with bell** | 3256808219835212 | 2.09 | 2.88 | **10,793** | 4.9 (1,325) | Yes | **£8.99** | 6.11 / 68% | 6.09 | Pets at Home plain collar £7; Bells & Whiskers fabric collar £9.99–£10.99; Amazon UK Cat Collars median £6.95 | The highest-volume cat wearable found today; colour-first search; the repeat item (a buyer owns four); sits under Amazon's £10 / 5% line |
| 2 | **AirTag breakaway collar, reflective, with bell** | 3256807120307119 | 3.76 | 4.46 | 9,484 | 4.9 (752) | Yes | **£12.99** | 8.53 / 66% | 8.39 | Supakit AirTag holder £25; Made By Cleo AirTag holder ~1,178 reviews (its #2 product) | Need-based, no welfare objection, year-round; the "safety upgrade" trigger (#4) turned into a product. Alternative: 3256808655179088 at $2.33, 5,032 orders but 4.6★ with 21 one-stars — avoid |
| 3 | **Tuxedo / wedding bow tie collar, black & white** | 3256808220000842 | 3.28 | 4.01 | 3,281 | 4.9 (158) | Yes | **£9.99** | 5.98 / 60% | 5.92 | Amazon US Casidoxi tuxedo collar $9.97, 782 reviews; Etsy "cat bow tie wedding" | Wedding and "gentleman" triggers; the black/white the plaid listing lacks |
| 4 | **Birthday bib + party hat set** | 3256805761442603 (UK-stock per 14 Sep, unverified today) or 3256809052778786 ($5.90, 607 orders, 4.8★, 69 ratings, 2-piece with bandana) | 3.64 | 4.35 | 282 | 5.0 (20) | Yes | **£8.99** (2-piece £10.99) | 4.64 / 52% | 4.59 | Amazon UK JOTFA birthday set £9.99, 744 reviews (#11 Cat Clothing); Tyqour £4.79 (#5) | Trigger #5; five birthday sets in the Amazon UK top 30; the 2,024-upvote thread is a birthday hat. Small sample on the UK-stock listing (20 ratings) — start with the dropship version, no stock risk |
| 5 | **Fleece jumper / Sphynx pullover** | 3256810343781613 | 7.62 | 8.12 | 1,995 | 4.9 (317) | Yes | **£16.99** | 8.87 / 52% | 7.45 | Amazon UK Oslueidy Sphynx turtleneck £13.99, 187 reviews (#8); EXPAWLORER tartan jumper £14.99, 851 reviews; Clothes for Cats median £12.50; Prince & Princess £8–12.50 | The need-based line (`competitors.md`: "sells to cats who need clothing — no welfare objection, no seasonal cliff"); lifts AOV toward £30. Budget alternative 3256805795270245 at $4.43, 1,303 orders, 4.8★ (8 one-stars) at £12.99 |
| 6 | **Cat harness & lead set, escape-resistant vest** | 3256807619230721 | 10.43 | 10.79 | 2,486 | 4.9 (277) | Yes | **£19.99** | 9.20 / 46% | 7.65 | Supakit harness £34–£82 (663 reviews); Pipkin and Bella's best-selling sort is led by cat harnesses | Highest ticket in the range; year-round; brings the basket to £30 on its own with a collar. Never claim "escape-proof" (unverifiable) |
| 7 | **Flower collar with bell** | 3256806810179121 | 4.60 | 5.26 | 2,910 | 4.9 (356) | Yes | **£9.99** | 4.73 / 47% | 4.63 | Made By Cleo Flower Collar Sets are its 4th-largest product type (42 in first 250) | Already on the held list in `sourcing.md`; spring/Easter; lower margin than #1, so second wave |
| 8 | **Bow tie colourways** (same listing, real price) | 3256803258255247 | 2.05 | 2.84 | 5,063 | 4.8 (585) | Yes | £10.99 | 8.15 / 74% | 8.09 | Amazon UK bow-tie shelf £2.32–£6.82; Pipkin and Bella £6; Bells & Whiskers £9.99–£10.99 | Not a new product — a variant. Listed here because it is the cheapest range extension there is |
| 9 | Engraved ID tag (supplier engraves; 10–20 day lead) | 3256811520430924 | 4.92 | 5.56 | 2,652 | 4.9 (318) | Yes | £9.99 | 4.43 / 44% | 4.40 | Made By Cleo engraved tag ~4,895 reviews (its #1 product); Supakit £13–15 | The review magnet in the US model — but the engraving lead time and 7 one-star reviews on the listing argue for a UK engraver instead. Third wave |
| 10 | Post-op recovery suit | 3256804216024542 | 3.13 | 3.87 | 854 | 4.6 (65) | Yes | £12.99 | 9.12 / 70% | 9.00 | Amazon UK Cat Clothing #1 and #2 are recovery suits (£16.99, 455 reviews; £6.49, 176); 19 of the top 60 | The biggest need-based category in UK "cat clothing" — and off-brand for a costume shop. Optional: a "Care" collection if the owner wants the volume; 4 one-stars on the listing |
| 11 | Cat-print tie-on bandana (cat-sized) | 3256806811029306 | 5.25 | 5.88 | 993 | 4.9 (134) | Yes | £8.99 (not £6.99: 16% GM) | 3.11 / 35% | 3.05 | Bells & Whiskers bandana £4.99; Cat World £2.50 | Only if the bandana collar's dog photography proves a problem; margin is thin |

### 9b. Seasonal and small-dog lines

| # | Product | Listing id | Orig. $ | Landed £ | Orders | Rating (ratings) | Choice | Suggested UK retail | Gross £ / GM% | Contrib. £ | UK anchor | When to order |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 12 | **Bat wings harness (the £5.99-Amazon archetype)** | 3256806852892442 | 4.72 | 5.37 | 3,579 | 4.7 (535) | Yes | **£8.99** | 3.62 / 40% | 3.54 | Amazon US #1 cat apparel $5.99 (8,626 reviews); Amazon UK XUKZIMA £6.99, Vivifying £5.99 (316) | Now, if it can land by 15 Oct; otherwise June 2027 for the 2027 season. One US 3★ today: "huge… very stiff" — size it honestly. Alternative 3256807290377680 ($4.54, 1,513, 4.9★) |
| 13 | **Christmas snowflake bow collar (cotton)** | 3256807362715355 | 5.65 | 6.26 | 1,013 | 4.9 (109; 4 GB in the last 20) | Yes | **£9.99** | 3.73 / 37% | 3.61 | Bells & Whiskers 35 Christmas collar SKUs at £9.99–£10.99; Ancol Christmas collar £4.92 | By 10 Oct for 1 Nov. Margin is thin at £9.99; bundle it (Festive Trio) or price £10.99 |
| 14 | **Knitted Santa hat + scarf (re-source for the Santa set)** | 3256809994960270 | 2.74 | 3.50 | 203 | 4.9 (14) | Yes | **£9.99** | 6.49 / 65% | 5.34 | Pets at Home has no cat Santa set; B&W Christmas collars £9.99–£10.99 | By 10 Oct. Small sample — order one as a sample first |
| 15 | Santa/elk hat + bandana bib set (larger, photographed on cats) | 3256807808942214 | 9.90 | 10.29 | 945 | 4.7 (91) | Yes | £14.99 | 4.70 / 31% | 3.27 | — | Only if #14 fails the sample |
| 16 | **Santa-print Christmas bandana** | 3256807656894293 | 1.79 | 2.60 | 345 | 4.8 (33; 3 GB) | Yes | £6.99 | 4.39 / 63% | 4.43 | Bells & Whiskers bandana £4.99 | By 10 Oct; the cheapest Christmas add-on for "one more thing" |
| 17 | **Christmas knitted jumper, cats & small dogs** | 3256809877720984 | 8.53 | 8.99 | 5,164 | 4.5 (828; 39 one-star) | Yes | £17.99 | 9.00 / 50% | 7.54 | Furmily Christmas jumper £26; Prince & Princess £16; Amazon UK 2-pack pumpkin/ghost sweaters £11.99 (72) | By 10 Oct; Christmas Jumper Day content. The 4.5★ and 39 one-stars are a sizing warning — publish chest and length in cm from the sample |
| 18 | **Dinosaur fleece hoodie (small dogs first)** | 3256809093693639 | 7.59 | 8.10 | 1,603 | 4.5 (201; 7 one-star) | Yes | £16.99 | 8.89 / 52% | 7.48 | Pet Costume Center dog:cat 4.8:1; dog Halloween video views 10–100× cat | The small-dog opener: the 2027 Halloween line and a winter coat in one. Order June 2027 |
| 19 | Cowboy hat + bandana | 3256807290759275 | 5.60 | 6.21 | 5,106 | 4.9 (362) | Yes | £9.99 | 3.78 / 38% | 2.56 | Amazon US choyaxo cowboy set $7.88, 1,104 reviews (#80) | Volume is real but dog-led and thin at £9.99; only as a small-dog line at £11.99 |
| 20 | Pumpkin Halloween vest (the pumpkin *body* the market wants) | 3256812384132687 | 4.09 | 4.78 | 260 | 4.9 (—) | Yes | £12.99 | 8.21 / 63% | 6.96 | Chewy pumpkin ride-on $15.99; NRF pumpkin 11.6% of pet costumes | The 2027 replacement for the pumpkin hat; sample in spring |

Not recommended from today's data: witch hat + cape sets (best listing 56 orders, several at 1–3.5★), spider alternatives (best 72 orders and LED-lit for large dogs), ghost costumes (≤89 orders), pirate sets (98 orders, 4.3★), reindeer antlers for pets (every top result is a human headband), Valentine's heart bandana (96 orders, 8 ratings), the nun gag costume (brand risk, as `sourcing.md` said).

### 9c. Order of adding, and why

| Wave | When | Add | Cash (ESTIMATED at 20 units each, landed) | Reason |
|---|---|---|---|---|
| 0 (this week, with the Halloween order) | 26 Sep – 1 Oct | Bow tie in three colours; Halloween Trio built from existing stock; bat wings only if the supplier's delivery estimate lands by 15 Oct | ~£115 for 40 extra bow ties | No new SKUs; fixes the AOV problem the maths found |
| 1 | order by 10 Oct, live 1 Nov | Knitted Santa set (#14), Christmas snowflake bow collar (#13), Santa bandana (#16), everyday breakaway collar in 4 colours (#1) | ~£560 | Christmas is the UK peak and the current Santa set is the thinnest margin in the shop |
| 2 | order mid-Nov, live January | AirTag collar (#2), tuxedo bow tie (#3), birthday set as dropship (#4), fleece jumper (#5) | ~£450 | The January–September base load; need-based lines with no seasonal cliff |
| 3 | order February, live March | Harness & lead (#6), flower collar (#7), spring plaids, small-dog bandana sizes | ~£520 | Easter/spring and the wedding season; the £30 basket on its own |
| 4 | order June 2027 | Dinosaur hoodie (#18), pumpkin vest (#20), bat wings (#12), Christmas jumper (#17) for the 2027 season | ~£560 | US brands drop Halloween on 28 August; be live by 25 August 2027 |

Twenty SKUs by spring is the shape every profitable comparator has (Bells & Whiskers 264 collar SKUs; Supakit 13 products × 69 variants; Made By Cleo 1,274). Seven cannot carry 10,000–20,000 orders (`01-maths.md` §8).

---

## 10. A cost correction found on the way: the bow tie was priced at a promo

`sourcing.md` records the Bow Tie Collar listing (3256803258255247) at "$1.09, 5,000+ sold" on 14 September, and `data.js`/`01-maths.md` build the £1.82 landed cost and 80% margin on it. Today the same card in five different search pages shows **original price $2.05, seller offer $1.99, new-user promo $1.33** (VERIFIED, `ali/*.html`, `utLogMap.originPriceAmount = 205`). The lion mane, bandana and Santa listings show their repo cost as the *original* price ($4.19, $2.55, $11.16 vs $4.20, $2.37, $10.73), so the bow tie is the one line where the promo was recorded as the cost. On a 40-unit reorder the price will be ~$2.05.

| | Repo | Today |
|---|---|---|
| Supplier $ | 1.09 | 2.05 (original) |
| Landed £ (× 0.79 × 1.2 + shipping share) | 1.82 | 2.84 |
| Gross at £10.99 | 9.17 (83%) | 8.15 (74%) |
| Contribution, single order at regular price | £9.14 | ~£8.09 |

Still the best margin in the range; the plan does not change, but the reorder budget in `LAUNCH-CHECKLIST` §A (25 units) should assume £2.84 not £1.82. Confirm at checkout before the bulk order.

---

## 11. Blocked or not obtainable today

| Item | What happened | Used instead |
|---|---|---|
| AliExpress "ships from UK" filter | `shipFromCountry=UK` ignored in curl; all results CN | 14 Sep finding for the bandana and birthday set carried over, tagged unverified; check on the listing |
| Devil Bat Cape (3256812487071410) and Spider (3256805889809397) listing cards | Neither surfaced in six related searches today (search returns 60 of thousands) | `sourcing.md` and `07-demand.md` §3 data (0 and 38 reviews) carried over |
| Royal Mail Christmas last posting dates 2026 | HTTP 403 on three URLs | ESTIMATED from prior-year pattern; confirm in November |
| Amazon UK / US product and review pages | Blocked in the earlier sessions; not retried | `05-marketplaces.md` Best Sellers data (fetched 26 Sep) |
| Etsy, TikTok Shop UK, Google Trends | Blocked / login-walled in earlier sessions; not retried | Autocomplete, review dates, YouTube (`07`) |
| Giant Paws conversion rate, AOV, traffic source | Not yet received from the friend | 1.5% CVR and 25% bundle attach assumed in `01-maths.md`; nothing in this file depends on them except the wave cash plan's timing |
| Feedback endpoint sample | Page 1 × 20 reviews per candidate listing; star totals are listing-wide | Country and low-star text are from the 20 most recent only |

Working files: `scratchpad/ali/` (39 search HTML+JSON, `all_items.json` with 2,294 listings, `fb/` feedback JSON, `fetch.py`, `summ.py`, `fb.py`, `offers.py`).
