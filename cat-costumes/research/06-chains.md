# 06 — The chains and generalists as price and expectation anchors

Researched 26 September 2026 for Catwalk Club (UK Shopify, cat costumes and collars, launch prices £7.99–£17.99, bundles £14.99–£24.99). Every figure is tagged **VERIFIED** (fetched today, URL given) or **ESTIMATED** (method stated). Prices are as displayed on the retailer's site today; US prices are in USD and not converted.

## The five findings that matter

1. **No UK chain sells a cat costume.** Pets at Home's "Halloween Shop — Cat" campaign has 50 products and exactly one wearable: a £3 bat-wing cat collar. Across all 142 items in its Halloween shop, every costume, cape, onesie, jumper, hat and headpiece is labelled "Dog". Zooplus UK returns zero costumes for "cat halloween" (12 results, all beds and toys). B&M's two "Halloween Pet Outfits" (£7/£8) are S/M and M/L dog sizing. Home Bargains has a £1.99 pet witch hat. Jollyes has a "Cat Halloween" category but its site blocks automated access (see Blocked). **VERIFIED** (URLs below). The anchor a UK shopper carries into your shop is therefore a *dog* costume price, not a cat one.
2. **The UK chain anchor for a full costume is £7–£8; a headpiece/accessory is £2–£3; a knit is £10.** Pets at Home: pumpkin, bat and spider dog costumes £8; vampire cape £8; skeleton onesie, devil hoodie, ghost/pumpkin sweaters £10; pumpkin headpiece £3; witch hat £2; ghost bandana £3; bat-wing cat collar £3. B&M: pet outfit £7 (S/M) / £8 (M/L), dog wings £4, bandana £2. Home Bargains: witch hat £1.99. **VERIFIED.**
3. **The UK chain anchor for a decorated cat collar is £3–£5.** Pets at Home own-brand bow-tie cat collars are £3 (slide-on bow) and £5 (Spotty Bow Tie, Polka Dot Bow); plain collars £1.50–£3.50; the premium Cococat range is £10. Zooplus cat/small collars £2.59–£7.19. **VERIFIED.** Your Bow Tie Collar at £8.99 is 1.8× the top Pets at Home own-brand bow-tie collar and needs the breakaway-plus-bell-plus-plaid story and the six photos to carry it.
4. **Chain Halloween ranges went live online in the second half of August 2026 and Christmas ranges on 21–23 September.** Pets at Home Halloween SKUs carry `newInDate` 14–17 Aug 2026; its Christmas cat and dog SKUs 21–23 Sep 2026. B&M's pet outfits have `publishdate` 16 Aug 2026 (stock arrived at its DC from 20 Jul 2026) and structured-data `priceValidUntil` 26 Oct 2026. Petco announced its drop on 27 Jul 2026 and PetSmart on 6 Aug 2026. **VERIFIED.** You are launching five to six weeks after the chains, with roughly five weeks of Halloween selling left.
5. **Chain product pages are thin.** Pets at Home's bat-wing cat collar page has one photo, no video, no Q&A, one review (dated 13 Sep 2026), a "features and benefits" bullet list, "suitable for / not suitable for" lines and, on the bow-tie collar, a one-line size guide ("Collar Size 21–34cm"). PetSmart shows 2–6 sizes with a size-chart link and 0–2 reviews per costume. **VERIFIED.** Nobody in this set shows a cat wearing the product on video, a neck-measuring guide, or a "will my cat tolerate it" answer. That is the gap a specialist page fills.

---

## 1. Pets at Home (petsathome.com) — the UK anchor

Fetched 26 Sep 2026 from the site's embedded page data (`__NEXT_DATA__`) on search, campaign and product pages.

### 1a. Halloween 2026 — what a cat owner actually finds

| Campaign / search | Items | Wearables for cats | Source |
|---|---|---|---|
| Halloween Shop — Cat | 50 | 1 (Reflective Bat Wing Cat Collar, £3) | https://www.petsathome.com/campaigns/listing/halloween-shop-cat |
| Halloween Shop — All | 142 | 1 (same collar) | https://www.petsathome.com/campaigns/listing/halloween-shop-all (pages 1–4) |
| Halloween Shop — Dog | 99 | n/a | https://www.petsathome.com/campaigns/listing/halloween-shop-dog |
| Search "cat costume" | 7 | 0 (recovery suit, harnesses, wipes) | https://www.petsathome.com/search?searchTerm=cat%20costume |
| Search "cat cape" | 6 | 0 | https://www.petsathome.com/search?searchTerm=cat%20cape |
| Search "cat hat" | 10 | 0 (all dog hats) | https://www.petsathome.com/search?searchTerm=cat%20hat |

**VERIFIED.** Every costume in the range is a dog SKU.

### 1b. Pets at Home Halloween wearables — the price ladder (all "Dog" SKUs unless stated)

| Item | Price | Reviews | Live online since | Note |
|---|---|---|---|---|
| Halloween Reflective Bat Wing **Cat** Collar | £3.00 | 1 (★5, 13 Sep 2026) | before 14 Aug (no newInDate) | faux leather, slide-off wings, breakaway clasp, bell, "unsuitable for kittens"; page JSON shows `standardCost` 1.03 |
| Pumpkin Dog Bowtie | £2.00 | 0 | — | |
| Starry Night Dog Bow Tie | £2.00 | 0 | 14 Aug 2026 | |
| Night Sky Witch Dog Hat | £2.00 | 0 | — | |
| Pumpkin Dog Headpiece | £3.00 | 0 | 14 Aug 2026 | |
| Bat Wings Dog Headpiece | £3.00 | 0 | — | |
| Ghost Dog Bandana / Starry Night Dog Bandana | £3.00 | 0 | 14 Aug 2026 | |
| Pumpkin Dog Costume | £8.00 | 0 | 14 Aug 2026 | |
| Bat Dog Costume | £8.00 | 0 | 14 Aug 2026 | |
| SYD the Spider Dog Costume | £8.00 | 0 | — | |
| Vampire Dog Cape | £8.00 | 0 | 17 Aug 2026 | |
| Glow in the Dark Skeleton Dog Onesie | £10.00 | 0 | 14 Aug 2026 | |
| Lil' Devil Dog Hoodie | £10.00 | 0 | 14 Aug 2026 | |
| White Little Pumpkin Dog Sweater / Fairisle Ghost Dog Sweater | £10.00 | 0 | 14 Aug 2026 | |

**VERIFIED** — https://www.petsathome.com/campaigns/listing/halloween-shop-all and https://www.petsathome.com/search?searchTerm=halloween%20costume. Promotion fields on every Halloween item were empty on 26 Sep 2026: **no Halloween markdowns yet**. Not one Halloween wearable had a review other than the cat collar. A third-party write-up of the in-store range (updated 6 Sep 2026) lists the same ladder — £2 witch hat, £3 ghost bandana, £3 bat wings, £8 spider, £10 devil — and no cat items: https://houndy.dogfuriendly.com/whats-new-at-pets-at-home-for-halloween-2026/ **VERIFIED**.

### 1c. Pets at Home cat collars — the everyday anchor

| Item | Price | Rating (n) |
|---|---|---|
| Pets Essentials Thin Cat Collar | £1.50 | ★4.8 / ★3.8 |
| Nylon Cat Collar (black/red) | £2.50 | ★3.2 / ★4.4 |
| Kitten Collar | £2.50–£3.50 | ★2.8 |
| Plaid / Rainbow / Fish Bone Cat Collar | £3.25 | ★4.3–4.8 (4) |
| Reflective cat collars (various) | £3.50 | ★3.8–5 |
| **Bow & Tie Cat Collar Blue** (slide-on bow) | **£3.00** | ★5 (7) |
| Cat Bow Tie Gold (slide-on accessory) | £3.00 | ★5 (1) |
| **Spotty Bow Tie Cat Collar Blue** | **£5.00** | ★4.4–4.7 (3–5) |
| Cat Collar Polka Dot Bow Pink | £5.00 | ★5 (4) |
| Diamante / Stud / Herringbone Cat Collar | £5.00 | ★3.3–4.5 |
| Rosewood Designer Cat Collar Red Bow Tie | £5.00 | 0 |
| Christmas Cat Collar & Bow Tie Cream (new 21 Sep 2026) | £5.00 | 0 |
| Cat Collars Multi Coloured 3 Pack | £7.00 | 0 |
| Rogz GlowCat Safeloc | £7.00 | 0 |
| Cococat Tweed / Leopard / Flower Cat Collar | £10.00 | 0 |
| Cat Collar, Harness & Lead Set | £12.00 | 0 |

**VERIFIED** — https://www.petsathome.com/search?searchTerm=cat-collars-and-accessories and https://www.petsathome.com/search?searchTerm=cat%20bow%20tie. The Spotty Bow Tie page JSON shows `standardCost` 1.24 against £5 retail (a 4× mark-up; the bat-wing collar is £1.03 against £3). Both fields are exposed in the public page data; treat as indicative of chain economics, not as something to quote to customers.

### 1d. Pets at Home Christmas 2026 (went live 21–23 Sep 2026)

Cat wearables: Christmas Cat Collar & Bow Tie £5 (the only one in 114 "Christmas gifts for cats"). Dog wearables: Reindeer / Turkey Dog Costume £10–£12, Christmas Tree Dog Costume £10, eight Christmas dog jumpers £10, Santa Paws Dog Cape £10–£12, Christmas Tree / Antler Dog Headpiece £4, Candy Cane Dog Hat £5, Velvet Bow Tie £5, Stripey Bow Tie £4. **VERIFIED** — https://www.petsathome.com/product/listing/christmas/christmas-gifts-for-cats and https://www.petsathome.com/search?searchTerm=christmas%20dog%20costume. Your Santa Hat & Scarf Set at £17.99 sits £6–£8 above the £10–£12 chain anchor for a full Christmas dog costume; it has no cat-specific chain comparator.

### 1e. Pets at Home delivery, returns and page features

| Promise | Detail | Source |
|---|---|---|
| Standard home delivery | £3.95 on orders £10–£39.99; £5.95 under £10; **free over £40** | product-page `deliveryPriceOptions` JSON |
| Next day | £5.95 (£7.95 under £10); £2.95 with £40+ | same |
| Click & Collect | free, "Collect in 1 hour" | same |
| Returns | 30 days (`merchantReturnDays: 30` in schema.org offer data) | https://www.petsathome.com/product/pets-at-home-spotty-bow-tie-cat-collar-blue/7119250P |
| Product page | 1 image, no video, no Q&A, "features and benefits" bullets, suitable / not suitable lines, size guide as one line, reviews with photos allowed ("Images and videos" review carousel), Easy Repeat subscription block | same, and https://www.petsathome.com/product/pets-at-home-halloween-reflective-bat-wing-cat-collar/7154464P |

**VERIFIED.** The support/FAQ pages themselves load client-side and could not be read as text; the figures above come from the product-page JSON.

---

## 2. Jollyes (jollyes.co.uk) — BLOCKED, partial

Every URL (home, search, category, sitemap) returned a Cloudflare "Just a moment…" challenge (HTTP 403) to curl, WebFetch and a real Chromium via Playwright; help.jollyes.co.uk also returned 403; archive.org rate-limited (429). No captcha bypass was attempted.

What can be said from search-engine snippets only (**ESTIMATED — secondary source, not fetched**):
- Jollyes has a "Cat Halloween" category (https://www.jollyes.co.uk/autumn/cat/cat-halloween.html) and "Cat Christmas Outfits" (https://www.jollyes.co.uk/christmas/cat/outfits.html), so unlike Pets at Home it at least merchandises cat outfits as a category. Product count and prices unknown.
- Delivery: standard from £3.50, express from £4, free over £45; Click & Collect free within 1 hour; returns within 30 days of receipt, free in-store, courier return cost deducted from refund (snippets from jollyes.co.uk/delivery-and-collect-in-store and /i/returns-and-refunds).

---

## 3. Zooplus UK (zooplus.co.uk)

| Query | Result | Source |
|---|---|---|
| "cat halloween" | 12 products, none wearable (beds, bowls, placemat) | https://www.zooplus.co.uk/search/results?q=cat%20halloween |
| "halloween" | 12 products, same | https://www.zooplus.co.uk/search/results?q=halloween |
| "cat costume" | 160 products, none a costume (bowls, litter, food) | https://www.zooplus.co.uk/search/results?q=cat%20costume |
| "bow tie" | 1 product (a rabbit cage) | https://www.zooplus.co.uk/search/results?q=bow%20tie |
| "cat clothing" | 58 products, all dog coats/jumpers (TIAKI reindeer dog jumper £5.29–£8.19; quilted dog coat £11.69–£18.29, ★4.6 from 788 reviews) | https://www.zooplus.co.uk/search/results?q=cat%20clothing |
| "cat collar" | 57 products; cat-sized: Trixie Cat Collar with Address Tag £2.59 (★3.2, 17), Simon's Cat Collar £3.99 (★2, 20), Nomad Tales XS 24–36cm £3.69–£3.99 (★3.7–4.1, 34–43) | https://www.zooplus.co.uk/search/results?q=cat%20collar |

**VERIFIED.** Zooplus UK has no cat costume at all; its relevance is as the delivery/returns anchor: **free standard delivery from £39**, next-day available in eligible postcodes if ordered by 3pm Mon–Thu, Click & Collect, and **14 days to return** for a full refund with return costs covered (https://www.zooplus.co.uk/info/about/returns, homepage banner). Zooplus tiles show a star rating and review count on every product, and "Was = the lowest price of the item within [period]" wording — the DMCC-compliant form of a reference price.

---

## 4. B&M (bmstores.co.uk)

B&M's search is Algolia-powered; the public search index the site itself queries was used (same data the page shows). Product pages were then fetched directly.

| Item | Price | Size | Category | Published online | Source |
|---|---|---|---|---|---|
| Halloween Pet Outfit — Spider | £7.00 | S/M | Pets > Dog Coats & Clothes; Halloween > Halloween Pets | 16 Aug 2026 (DC arrival 20 Jul 2026) | https://www.bmstores.co.uk/products/halloween-pet-outfit-s-m-spider-4352371 |
| Halloween Pet Outfit — Spider | £8.00 | M/L | same | 16 Aug 2026 | https://www.bmstores.co.uk/products/halloween-pet-outfit-m-l-spider-4352381 |
| Halloween Pet Outfit — Pumpkin | £7.00 | S/M | same | 16 Aug 2026 | https://www.bmstores.co.uk/products/halloween-pet-outfit-s-m-pumpkin-4352372 |
| Halloween Pet Outfit — Pumpkin | £8.00 | M/L | same | 16 Aug 2026 | https://www.bmstores.co.uk/products/halloween-pet-outfit-m-l-pumpkin-4352382 |
| Howl-O-Ween Dog Wings | £4.00 | S/M | Halloween Pet Costumes | (2023 SKU) | https://www.bmstores.co.uk/products/halloween-dog-wings-size-s-m-398403 |
| Howl-O-Ween Pet Bandana | £2.00 | one size | Halloween Pet Accessories | 16 Aug 2026 | https://www.bmstores.co.uk/products/howl-o-ween-pet-bandana-435242 |
| Halloween pet toys (rope, crinkle, tennis) | £1.50–£3.50 | — | Halloween Pets | Aug 2026 | Algolia index `prod_bmstores`, query "pet halloween" (51 hits) |

**VERIFIED.** Notes: the outfits carry `buyonline: False` and the pages say "buy in-store at B&M" — these are **store-only** lines; no reviews, no video, one to four photos, no size chart beyond "S/M, M/L"; the product disclaimer reads "This is not a chew toy. Pets should not be left unsupervised while wearing this"; structured data `priceValidUntil` 2026-10-26; `issale: False` on 26 Sep. Search "cat collar" returns two flea collars only, "cat costume" nothing wearable. B&M's own Halloween party article names only a dog witch hat, pet balls and dog treats as the pet range (https://www.bmstores.co.uk/lifestyle/throw-the-halloween-party-of-your-life-this-year-with-bandm). Delivery/returns pages returned 404; the product page footer shows a Returns policy "last updated November 2024" without a stated window in the fetched text.

---

## 5. Home Bargains (home.bargains)

| Item | Price | Category | Source |
|---|---|---|---|
| My Pets Halloween Pet Dress-up — Witch Hat | £1.99 | Halloween Pets (3 items in total: this, a £0.79 vinyl dog toy, a £1.99 feeding mat) | https://home.bargains/category/571/halloween-pets |
| Chester's Dog Christmas Costume (red / green) | £3.99 | Christmas Pet | https://home.bargains/category/859/christmas-pet |
| Chester's Sleigh Pet Bed | £7.99 | Christmas Pet | same |

**VERIFIED.** Home Bargains' on-site search is non-functional today (its Algolia endpoint returns 404 and every query shows "No matching products"), so only category browsing works. No cat collar or cat costume online. The Halloween pet range is one wearable at £1.99; the Christmas dog costume at £3.99 is the lowest full-costume price anywhere in this set.

---

## 6. Argos (argos.co.uk) — BLOCKED

Search, category, product-finder API and desktop/mobile user agents all returned "Access Denied" (HTTP 403); WebFetch 403; archive.org 429. Search-engine snippets show Argos has a "dog costume" results page (https://www.argos.co.uk/sd/dog-costume/) and a cat supplies category, but no cat costume page appeared in any snippet. **ESTIMATED:** Argos is not a meaningful cat-costume anchor; its relevance is delivery expectation (same-day Fast Track £3.95, free store collection — from search snippets only).

---

## 7. PetSmart (petsmart.com, US)

Fetched 26 Sep 2026. Prices USD. Relevant because PetSmart is the one large chain that lists costumes as "Dog & Cat" with cat sizing, so it is the closest thing to a chain cat-costume anchor.

| Item | Price | Sizes | Reviews | Source |
|---|---|---|---|---|
| Thrills & Chills Halloween Bat / Pumpkin / Skull / Ghost / Howdy / Cow Print **Kitten & Cat Collar** | $9.99 | Kitten, Cat (Adult) | 0–1 | https://www.petsmart.com/cat/collars-harnesses-and-leashes/collars/?q=halloween |
| Whisker City breakaway cat collars (everyday) | $7.99–$9.99 (sale $3.59–$8.99) | 2 | 8–115 | same |
| Thrills & Chills Devil / Princess / Pirate / Clown / Angel Halo Wings / Cowboy Hat & Bandana **Dog & Cat Costume Set** | $16.99 | 2 (S/M, L/XL) | 0–2 | https://www.petsmart.com/search/?q=cat%20costume |
| Thrills & Chills Pumpkin / Dinosaur / Dragon / Lobster / Hot Dog / Highland Cow / Doll with Knife **Dog & Cat Costume** | $19.99 | 5–6 | 0–2 | same |
| Rubie's licensed Dog & Cat costumes (Stitch, Gremlins, Banana, Butterfly, Shark) | $34.99 list, $19.99–$25.99 on sale | 2–4 | 0–2 | same |
| Disney Nightmare Before Christmas Oogie Boogie Costume Hoodie **for Cats** | $14.99 | 2 | 2 | same |

**VERIFIED.** 187 results for "cat costume"; 580 in the Halloween shop. Current promotions on 26 Sep 2026: "Save 20% online with code SAVE20 thru 9/27" on nearly everything and "Buy 1, get the 2nd 50% off all dog & cat collars, harnesses & leashes thru 9/27" — i.e. **the US chain is already discounting Halloween five weeks out**. Delivery: "Free shipping on select orders $49+" (members), same-day delivery, pick up in store. Product pages: size selector, a size-chart link (`sizeChart` present in page data), 50+ images across the page (product plus recommendations), reviews module; no Q&A found. Returns: 60 days with receipt (**ESTIMATED** — from search-result summaries of petsmart.com/help/returns-and-refunds-H0008a.html, which itself returned 404 on fetch). Range announced 6 Aug 2026 (PR Newswire, https://www.prnewswire.com/news-releases/petsmarts-2026-thrills--chills-halloween-collection-features-styles-for-every-pet-personality-302844461.html **VERIFIED**).

---

## 8. Petco (petco.com, US) — BLOCKED on site; press and trade sources used

Category, search and product pages returned 403 to curl, Playwright and WebFetch. **VERIFIED from press:** Petco's Halloween drop was announced 27 Jul 2026 — "over 300 festive items", "starting at $3, most under $20", cat-specific items named: bat-wings costume, cowboy costume, mice two-pack, bat teaser, pumpkin-topper scratch post (https://corporate.petco.com/2026-07-27-Petco-Launches-Halloween-Drop-Featuring-Hundreds-of-Exclusive,-On-Trend-Finds). **VERIFIED from a trade round-up (published 25 Jul, updated 23 Sep 2026):** Petco cat costumes — Dracula/Vampire, Witch 2-piece, Bat Wings, Fishbowl headpiece, Pickle — all **$12.00**; Target cat items $5–$6 headpieces, $6 glitter wings, $12 dog-and-cat sweater; Chewy/Frisco pumpkin cat ride-on $15.99 (https://hauntedattractionnetwork.com/best-halloween-pet-costumes-2026/). Returns 60 days (refund in first 30, store credit 31–60) and free shipping over $49 — **ESTIMATED** from search-result summaries.

## 9. Chewy (chewy.com, US) — BLOCKED

Every request returned HTTP 429. **ESTIMATED from search snippets:** Chewy's Frisco own-brand lists ~127 cat costume options priced "under $10 to $30+"; 365-day free returns with prepaid label; free shipping over $49. Not fetched.

---

## 10. Where Catwalk Club's prices sit

Launch prices from `site/assets/data.js` (regular "list" price in brackets). Chain anchors are the nearest like-for-like item a UK shopper will have seen.

| Catwalk Club product | Launch (list) | Nearest UK chain anchor | Ratio to anchor | Nearest US chain anchor |
|---|---|---|---|---|
| Bow Tie Collar (breakaway, bell, plaid) | £8.99 (£10.99) | PAH Spotty Bow Tie Cat Collar £5; PAH slide-on Bow & Tie £3; Cococat £10 | 1.8× / 3.0× / 0.9× | PetSmart Halloween cat collar $9.99 |
| Bandana Collar (UK stock, S/M/L) | £7.99 (£9.49) | PAH Ghost Dog Bandana £3; B&M pet bandana £2; PAH Franky's pet bandana £1.87–£2.50 | 2.7× / 4.0× | PetSmart cowboy hat & bandana set $16.99 |
| Lion Mane (S/M/L) | £9.99 (£11.99) | PAH headpieces £3; PAH dog costume £8; B&M outfit £7–£8 | 3.3× / 1.25× | Petco cat costume $12; PetSmart set $16.99 |
| Devil Bat Cape + hood (S/M/L) | £12.99 (£15.49) | PAH Vampire Dog Cape £8; PAH Bat Dog Costume £8; B&M dog wings £4 | 1.6× | Petco Bat Wings cat $12; PetSmart Devil set $16.99 |
| Spider Costume (S/M) | £12.99 (£15.49) | PAH SYD Spider Dog Costume £8; B&M Spider Pet Outfit £7–£8 | 1.6× | PetSmart full costume $19.99 |
| Pumpkin Hat & Ruffle Collar | £11.99 (£14.49) | PAH Pumpkin Dog Headpiece £3 + Pumpkin Dog Bowtie £2 (= £5); PAH Pumpkin Dog Costume £8; HB witch hat £1.99 | 2.4× / 1.5× | Target gnome/alien headpiece $5; PetSmart pumpkin $19.99 |
| Santa Hat & Scarf Set | £17.99 (£21.49) | PAH Santa's Helper Dog Hat £1.50–£2 + All Wrapped Up Dog Scarf £5 (= £7); PAH Christmas dog costume £10–£12; HB dog Christmas costume £3.99 | 2.6× / 1.5× | — |
| Halloween Pair bundle | £23.99 (£28.99) | two PAH dog costumes £16 | 1.5× | — |
| First Costume Kit bundle | £14.99 (£18.49) | PAH costume £8 + collar £5 = £13 | 1.15× | — |

**VERIFIED** inputs; ratios are arithmetic. Reading: the two collars are priced at the top of the UK chain ladder (Cococat-level), the costumes at roughly 1.5–1.6× the £8 chain anchor, and the two-piece sets at 1.5× a chain full costume. In US-chain terms your costumes (£12.99 ≈ $17) sit level with PetSmart's $16.99 sets and above Petco's $12 cat costumes — so the US is not a cheaper market for you, but it is one where "cat costume" is a normal SKU with $9.99–$19.99 expected pricing.

The DMCC point on your "list" prices: the regular prices (£10.99–£21.49) have never been charged — `SALE.active` is `true` and `SALE.ends` is `2026-09-22`, four days ago, with the countdown still running. A crossed-out price that has never been the selling price, and a sale that "ends" but continues, are exactly the two practices the DMCC Act 2024 targets. Zooplus's on-site wording ("Was = the lowest price of the item within the last 30 days") is the compliant model. Either drop the crossed-out prices until the regular price has genuinely been charged for a period, or make the launch offer a coded discount with a real end date that is honoured.

---

## 11. What a UK shopper expects because of the chains

| Expectation | Chain benchmark (VERIFIED unless noted) | Catwalk Club today (`data.js`, LAUNCH-CHECKLIST) | Gap |
|---|---|---|---|
| Standard delivery cost | PAH £3.95; Jollyes from £3.50 (est.); Zooplus included above threshold | £3.95 | level |
| Free-delivery threshold | PAH £40; Zooplus £39; Jollyes £45 (est.) | £30 | **better** — say so on every page |
| Speed | PAH next day £5.95, Click & Collect in 1 hour; Zooplus next day by 3pm cut-off; PetSmart same-day | 2–4 working days; China-shipped lines 10–20 days | **worse** — the UK-stocked bandana is the only line that competes; give delivery dates per product, not a site-wide promise |
| Returns window | PAH 30 days; Jollyes 30 days (est.); Zooplus 14 days, return cost covered; Chewy 365 (est.) | 30 days | level; "cat won't wear it" as an accepted reason would beat all of them |
| Price of a full costume | £7–£8 (PAH, B&M); £10 knit; £10–£12 Christmas costume | £9.99–£12.99 | shopper needs to see why: cat-specific sizing, two pieces, six photos, real cat on video |
| Price of an accessory | £2–£3 headpiece/bandana/bow tie; £3–£5 decorated cat collar | £7.99–£8.99 | the biggest ratio in the range; lean on breakaway safety, bell, and "stays on all day" |
| Reviews on the page | PAH 0–7 per collar, 0 on every Halloween costume; PetSmart 0–2 per costume; Zooplus 17–43 on cat collars | supplier-listing ratings shown "from the makers' listings" | thin everywhere — a dozen genuine UK reviews with photos would out-review Pets at Home's entire Halloween range; never pad them |
| Size guidance | PAH one line ("Collar Size 21–34cm", "unsuitable for kittens"); B&M "S/M, M/L"; PetSmart size-chart link | neck/chest cm per size on each product | **better** — make it visible on the card, not just the page |
| Safety wording | PAH: breakaway clasp, "two fingers" fit test, "check for redness"; B&M: "not a chew toy, do not leave unsupervised"; PAH press: fire-retardant, no loose glitter/sequins | breakaway on bow tie; spider legs "keep away from chewers" | add the supervised-wear and two-finger lines to every product; do not claim fire-retardancy or any safety property you have not tested (ASA/CAP) |
| Video, Q&A | none on PAH or B&M product pages; none found on PetSmart | none | open field — the owner will film real cats; a 15-second "on in one go" clip per product beats every chain |
| Seasonal timing | Halloween live online 14–17 Aug (PAH), 16 Aug (B&M), 27 Jul (Petco), 6 Aug (PetSmart); Christmas live 21–23 Sep (PAH); B&M prices held to 26 Oct; PetSmart already 20% off | launching 26 Sep | you are late for Halloween 2026 and early enough for Christmas; treat this Halloween as a content-and-reviews season, and plan the 2027 Halloween range to be live by **1 August** |

**ESTIMATED** timing for markdowns: with B&M's prices valid to 26 Oct and PetSmart already discounting, expect UK chains to clear Halloween pet lines from the last week of October and shoppers to expect 50%-off signs from 1 November. Do not chase that; the two-piece sets and collars hold value into Christmas and photo-season.

---

## Blocked

- **Jollyes** — Cloudflare bot challenge on every URL and on help.jollyes.co.uk (403). Category names and delivery/returns terms from search snippets only.
- **Argos** — Akamai "Access Denied" (403) on search, category, product-finder API, desktop and mobile agents, WebFetch.
- **Petco** — 403 on category, search and product pages; press release and trade round-up used instead.
- **Chewy** — 429 on every request; search snippets only.
- **archive.org** — 429 rate-limited, so no archived copies of the above.
- **DuckDuckGo HTML and Bing** — bot-detection page / irrelevant results through the proxy; WebSearch worked and was used.
- **Home Bargains search** — their own Algolia endpoint returns 404, so on-site search shows "No matching products" for every query; category pages were used.
- **Pets at Home support pages** (delivery, returns) — client-rendered; figures taken from product-page JSON instead.
