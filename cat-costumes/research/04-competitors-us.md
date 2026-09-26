# 04 · US and global DTC competitors — cat costumes and cat accessories

Research date: 2026-09-26. All catalogue numbers were pulled live from each store's `/products.json` and `/collections.json` (Shopify) or `/wp-json/wc/store/v1/products` (WooCommerce) on that date unless marked otherwise. Follower counts come from TikTok profile pages (fetched directly) and Instagram profile pages (via DuckDuckGo result snippets of instagram.com, because instagram.com itself rate-limited direct fetches). Prices are in USD unless shown in £.

**Labels:** VERIFIED = fetched today, URL given. ESTIMATED = derived, method stated.
**FX assumption (ESTIMATED):** £1 ≈ $1.34 throughout. Change the figure and the sterling equivalents move proportionally.

---

## 1. Headline findings

1. **There is no cat-first costume DTC brand of any scale in the US.** Every cat-first Shopify brand found (Made By Cleo, Sweet Pickles Designs, Pawsome Couture, Supakit, Cheshire & Wain) sells collars, bow ties and bandanas, not costumes. Every costume brand found (Pandaloon, Pet Costume Center, Rubie's, Sassy Woof) is dog-first with a cat corner. VERIFIED — see Section 3 tables.
2. **Pet Krewe, the brand everyone names as "the cat costume company", has left the category on its own site.** petkrewe.com now lists 24 products, all Salty Cat and Ella's Best pet food (5 collections, every product created in 2025). Its costumes survive only as an Amazon storefront. VERIFIED: https://petkrewe.com/products.json, https://petkrewe.com/collections.json.
3. **US cat-accessory price points sit 30–60 % above Catwalk Club's launch prices.** Bow ties $9.99–13.95, bandanas $10.46–13.95, everyday collars $13.99–33.00, collar-plus-bow sets $29.95. Catwalk Club's Bow Tie Collar at £8.99 (≈ $12.05) and Bandana at £7.99 (≈ $10.71) sit at the very bottom of the US range. VERIFIED prices, ESTIMATED FX.
4. **Cat costume volume in the US lives on marketplaces, not DTC sites.** On TikTok Shop US the "cat costumes" keyword page is 25 listings, of which one Chinese seller's Bat Wings cape ($13.22, 4.3★, 319 reviews) shows 6,396 sold on the listing and 11.7K sold on its product page; 13 of the other 24 listings show 0–1 sold. VERIFIED: https://shop.tiktok.com/us/k/cat-costumes and https://shop.tiktok.com/us/pdp/1729402737525035882.
5. **This corrects the earlier sourcing note** (sourcing.md, "bat wings 2 sold" on TikTok Shop). The same product type is now the top cat-costume seller on TikTok Shop US — the Halloween ramp has started in earnest since that crawl. VERIFIED today.
6. **US pet-costume spend is $0.92 bn for Halloween 2026** (NRF, up from $0.86 bn in 2025); pumpkin is the #1 pet costume at 11.6 % of buyers, hot dog 5.9 %, ghost next. VERIFIED 2025 figure: https://nrf.com/media-center/press-releases/nrf-consumer-survey-finds-halloween-spending-to-reach-record-13-1-billion. 2026 figure VERIFIED via Gift Shop Magazine's reproduction of the NRF release (nrf.com timed out on fetch): https://giftshopmag.com/news/nrf-halloween-survey-shows-consumer-spending-expected-to-reach-13-5-billion/.
7. **Shipping to the UK from US brands is slow and dear**: Made By Cleo quotes 12–14 business days internationally ("often 8–14" to the UK); Pawsome Couture ships UK at £2 flat, 5–10 business days; The Foggy Dog does not ship outside the US and Canada at all. A UK-stocked brand with 1–3 day delivery has a structural advantage at home. VERIFIED — Section 5.

---

## 2. Method and what was blocked

| Step | Result |
|---|---|
| Discovery | DuckDuckGo via Playwright (10 + 18 queries), Bing (degraded results), 70+ direct domain probes for `/products.json` |
| Catalogue pulls | 15 Shopify stores fully paginated; 2 WooCommerce stores via Store API |
| Store pages | Homepage, shipping policy, FAQ, bestseller collections and 6 product pages per key store (JSON-LD `aggregateRating` where present) |
| Socials | TikTok profile JSON (`followerCount`, `heartCount`, `videoCount`) direct; Instagram via DDG snippets of instagram.com |
| Marketplaces | TikTok Shop US keyword pages and one PDP parsed from embedded JSON-LD; Amazon UK product page for Pet Krewe Lion Mane |
| **Blocked** | Etsy (HTTP 403), Amazon.com (captcha page), Chewy (HTTP 429), Reddit search (login wall), Instagram direct (429), Google Trends (429), TikTok Shop UK keyword page (captcha — not bypassed), html.duckduckgo.com (bot check; Playwright DDG used instead), nrf.com (timeout on the 2026 release) |

---

## 3. The stores

### 3.1 Catalogue size, price and activity (VERIFIED from `/products.json`, 2026-09-26)

| # | Store | Platform · base | Products | Collections | Min | Median | Max | Cat-titled products | Added 2025 | Added 2026 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Made By Cleo — madebycleo.com | Shopify · Austin TX | 1,530 | 83 | $2.96 | $20.95 | $34.95 | 1,524 | 363 | 358 |
| 2 | Pawsome Couture — pawsomecouture.com | Shopify · ships US/UK/AU/CA | 259 | 73 | $0 | $25.00 | $112 | 136 | 18 | 0 |
| 3 | Sweet Pickles Designs — sweetpicklesdesigns.com | Shopify · Portland OR | 481 | 29 | $2.00 | $12.99 | $120 | 394 | 26 | 1 |
| 4 | Pet Costume Center — petcostumecenter.com | WooCommerce · US | 600 | — | $3.00 | $20.99 | $1,092 | 231 | n/a | n/a |
| 5 | Sassy Woof (Sassy Meow line) — sassywoof.com | Shopify · Sterling VA | 1,382 | 250+ | $6.99 | $24.99 | $84.99 | 55 | 337 | 109 |
| 6 | Pandaloon — pandaloon.com | Shopify · US | 16 | 17 | $4.95 | $29.00 | $31.99 | 0 | 2 | 0 |
| 7 | FuzzYard US — fuzzyard.com | Shopify · AU brand, US store | 1,118 | 197 | $0 | $15.99 | $109.99 | 106 | 0 | 1,118 |
| 8 | Pet Krewe — petkrewe.com | Shopify · New Orleans | 24 | 5 | $0 | — | $32.99 | 14 (all food) | 24 | 0 |
| 9 | Meowingtons — meowingtons.com | Shopify · New York | 351 | 93 | $3.00 | $25.00 | $350 | 326 | 23 | 2 |
| 10 | Happy & Polly — happyandpolly.com | Shopify · US/CN | 182 | 250+ | $0.01 | $49.99 | $999.99 | 155 | 56 | 60 |
| — | The Foggy Dog — thefoggydog.com | Shopify · San Francisco | 758 | 250+ | $3.00 | $38.50 | $350 | 20 | 175 | 355 |
| — | CatLadyBox — catladybox.com | Shopify · US | 356 | 35 | $2.00 | $12.99 | $269.94 | 287 | 207 | 149 |
| — | Best Dressed Pets US — bestdressedpetsus.com | Shopify · dropship (eprolo) | 260 | 14 | $5.00 | $15.00 | $110 | 20 | 0 | 0 |
| — | Rubie's — rubies.com | Shopify · wholesale, no retail prices | 820 | 79 | placeholder | — | — | 6 | 28 | 0 |
| — | Cheshire & Wain — cheshireandwain.com (UK) | Shopify · London | 92 | 51 | £3.50 | £39.00 | £300 | 88 | 16 | 8 |
| — | Supakit — supakit.co (UK) | Shopify · Northampton | 13 | 12 | £0 | £25.00 | £60 | 11 | 0 | 1 |

Notes. "Cat-titled" = title, type or tags contain cat/kitten/kitty/feline. "Added" = `created_at` year. Pet Krewe's 14 cat-titled products are Salty Cat food and treats, not costumes. Rubie's products.json carries `999999.99` on every variant — it is a trade site, not DTC, so it is excluded from the ranking. Sources: `https://<domain>/products.json?limit=250&page=N` for each store; `https://petcostumecenter.com/wp-json/wc/store/v1/products?per_page=100`.

### 3.2 What each store actually sells for cats, with prices (VERIFIED from collection and product pages)

| Store | Cat wearables found | Price points | Compare-at / discount seen |
|---|---|---|---|
| Made By Cleo | 310 flower-collar sets, 267 bow ties, 239 bandanas, 234 collars, 226 bunny-ear-bow sets, 221 bow-tie-collar sets; 4 "pet costumes" | Bow tie $13.95; collar $18.95; bandana $13.95; collar + bunny-ear bow $29.95; collar + flower $27.95. Costumes: Witch Hat $14.95, Bat Wing cape $17.95, Dracula $20.95, Santa Hat $14.95 | Halloween collection (191 items, created 28 Aug 2026) is 25 % off: bow tie $10.46, collar $14.21, bandana $10.46, sets $20.96–22.46. Costumes 25 % off: Witch Hat $11.21, Bat Wing $13.46, Dracula $15.71 |
| Sweet Pickles Designs | 147 cat/dog bow ties, 118 collars, 55 bandanas; Halloween collection 35 items | Bow tie $9.99; bandana $12.99; cat collar $13.99–14.99 | Bow tie compare-at $15.50; collar compare-at $15.49 (tiny) |
| Pawsome Couture | 6 cat-collar products (each multi-colour), 34 tagged collars & accessories | Cotton kitten collar $22; cotton cat collar $26; leather $29; luxury leather $33; velvet $33 | Leather/velvet compare-at $40 |
| Pet Costume Center | 54 products in "Cat Costumes" category | Min $4.60, median $14.76, mean $14.24, max $26.99. 20 under $10, 26 at $10–19.99, 8 at $20–29.99. E.g. Superman cape $12.62, Firefighter $11.35, Pirate walking $16.11, Sushi $16.58, Shark hat $14.63, Tuxedo bandana $6.61, Bat collar $6.99, Christmas tutu $7.47 | Most cat items "on sale"; 20 of the 54 out of stock on 26 Sep |
| Sassy Woof / Sassy Meow | 20 cat collars, 14 cat bow ties, 19 cat harnesses, 15 bundles | Cat collar $15.99–17.99; cat bow tie $7.99–10.99; cat bundle $60.99 | Licensed Hello Kitty, Garfield, CatDog |
| Pandaloon | "cat-costumes" collection = 8 walking costumes, all dog-titled | $24.99–31.99 (Lion with Mane $24.99, Panda $31.99, Bunny/Unicorn/Teddy $29.99) | Compare-at $39.99–49.99 |
| FuzzYard US | 25 breakaway cat collars; 12 "Cat Fashion Packs" (incl. Spooky Kitty, Cat-O-Lanterns) | Cat collar $7.99–8.99; fashion pack $13.99 | None |
| Pet Krewe | None on site. Amazon UK: Cat Lion Mane | £18.99–21.99 (RRP £29.99), 4.3★, 1,946 ratings, rank 2,657 in "Costumes for Dogs" | VERIFIED https://www.amazon.co.uk/dp/B010E4TAKW |
| Meowingtons | "for-cats" collection 69 items — trees $299–350, toys, beds; "cat-bow-ties" collection = 1 product | Median $42.50 in for-cats | Pizza bed $22 (was $38), 177 reviews |
| Happy & Polly | "cat-clothes" collection = 1 product; Halloween = gothic trees and a ghost fountain | $34.99–159.99 | Judge.me 1,385 reviews sitewide |

Sources: `https://madebycleo.com/collections/{bestsellers-2026,halloween,pet-costumes}/products.json`; `https://sweetpicklesdesigns.com/collections/{halloween,cat-small-dog-collars}/products.json`; `https://pawsomecouture.com/collections/{best-sellers,cat-collars}/products.json`; `https://sassywoof.com/collections/{cat-collars,cat-bowties,cat-bundles}/products.json`; `https://pandaloon.com/collections/cat-costumes/products.json`; `https://fuzzyard.com/collections/{cat-fashion-packs,breakaway-cat-collars}/products.json`; `https://meowingtons.com/collections/for-cats/products.json`; `https://happyandpolly.com/collections/halloween/products.json`.

### 3.3 Reviews, bestsellers and social reach

| Store | Review platform | Review evidence (VERIFIED) | Bestsellers (VERIFIED) | Instagram | TikTok followers · likes · videos |
|---|---|---|---|---|---|
| Made By Cleo | Judge.me + Loox + Yotpo scripts | Homepage widget "from 33246 reviews"; Engraved ID Tag ~4,895; AirTag holder ~1,178; Witch Hat ~122; Santa Hat ~115; Bat Wing ~73 | Engraved Pet ID Tag $10.46; AirTag holder $7.46; Pumpkin Patch bow tie/collar/bandana/set | 29K (DDG snippet) | 3,984 · 8.8K · 104 |
| Pawsome Couture | Custom widget | Luxury Leather Cat Collars 570 reviews 4.9★; Cotton Cat Collars 115 5.0★; Velvet 57 4.9★; Teeny Tiny Paw Necklace 816 4.9★; claims "trusted by 300,000+ cat lovers since 2015" | Jewellery for humans dominates (necklace $52, ring $36); collars $33 | 161K | 56 · 181 · 8 |
| Sweet Pickles Designs | None detected | No review widget or counts on product pages | Bow ties $9.99, bandanas $12.99 | 18K | 1,168 · 9.1K · 152 |
| Pet Costume Center | Judge.me | "from 616 reviews" sitewide; per-product 0 in Store API | Licensed dog costumes (Star Wars, Disney) | 12K | 1,661 · 131 · 8 |
| Sassy Woof | Stamped | Not exposed on pages fetched | Dog harness/collar sets; retail at PetSmart, Petco, Walmart, Chewy | 364K | 71,600 · 3.0M · 840 |
| Pandaloon | None detected | "As seen on Shark Tank" / "As seen on TikTok" claims; no counts | Panda Puppy $31.99; Bumblebee $29 | 25K | 18,900 · 673.7K · 11 |
| FuzzYard US | Judge.me-style counts | 1–6 reviews per product (store launched Jan 2026) | Dog toys, sweaters | 108K global · 3,192 US · 13K UK | not fetched |
| Pet Krewe | Junip | On site: none. Amazon UK Lion Mane 1,946 ratings 4.3★ | Salty Cat food | 34 on @petkrewe (bio now pet food; story snippet shows old 12K) | account exists, count not exposed |
| Meowingtons | Stamped | Mouse Hunt toy ~301; Pizza bed ~177; Jungle Gym ~68 | Milton the Cat calendar, backpacks | 742K | 1,070 · 42.7K · 168 |
| Happy & Polly | Judge.me | 1,385 sitewide; Gothic Cat Tree 103 4.81★ | Cat trees, fountains | 151K | 86,000 · 1.3M · 891 |
| The Foggy Dog | Okendo + Yotpo | not exposed | Walk sets $92–132 | 371K | 11,500 · 31.3K · 887 |
| Cheshire & Wain (UK) | Okendo | Rococo collar ~34; Royal Caviar ~22 | £75 collars | 24K | 671 · 23.2K · 333 |
| Supakit (UK) | Loox | "Rated 4.7/5 – 2299 reviews" sitewide; Breakaway Collar 1,100 4.7★; Harness 663 4.7★ | Breakaway collar £22.50; harness £60 | not found | 217 · 805 · 41 |

Instagram sources: DuckDuckGo snippets of `https://www.instagram.com/<handle>/` fetched 2026-09-26 (Playwright). TikTok sources: `https://www.tiktok.com/@<handle>` embedded JSON, fetched 2026-09-26.

---

## 4. Ranking (at least six, with evidence)

Ranking criterion: relevance to Catwalk Club's category (cat wearables) first, then proof of demand (reviews, sold counts), then audience. Chains (Chewy/Frisco, Target, Spirit) excluded per brief; Rubie's excluded as a wholesaler.

| Rank | Store | Why it ranks here | Threat / lesson for Catwalk Club |
|---|---|---|---|
| 1 | **Made By Cleo** | The only cat-first brand with real scale: 1,530 SKUs, 33,246 reviews, 716 products added in 2025–26, Halloween drop on 28 Aug 2026, 25 % seasonal discount, worldwide shipping incl. UK, GBP pricing. IG 29K. | The blueprint for "collars as the engine": bestsellers are ID tags and AirTag holders under $11, then $14–30 bow/collar sets. Its UK delivery is 8–14 days — Catwalk Club wins on speed at home. |
| 2 | **Pawsome Couture** | 161K IG, 570-review leather collar at $33, UK shipping at £2 flat. But 0 products added in 2026, 176 items tagged "low stock" — a brand coasting on audience. | Shows the US will pay $22–33 for a cat collar with a brand behind it. Its bestsellers are jewellery for humans — accessories for the owner are a proven upsell. |
| 3 | **Sweet Pickles Designs** | 481 SKUs of cat bow ties $9.99, bandanas $12.99, collars $13.99–14.99; 18K IG; also sells on Etsy. Only 27 products added in 2025–26. | Closest price-for-price comparator to Catwalk Club's Bow Tie and Bandana. No review widget at all — Catwalk Club's Judge.me set-up is already ahead. |
| 4 | **Pet Costume Center** | The only US site with a real cat-costume range: 54 cat costumes, median $14.76, 616 Judge.me reviews, 12K IG, ships worldwide via DHL. WooCommerce, licensed-heavy, 20 of 54 cat lines out of stock. | Proves the US cat-costume price band is $10–20, and that stock-outs at the end of September are normal in this category. |
| 5 | **Sassy Woof (Sassy Meow)** | 364K IG, 71.6K TikTok with 3.0M likes, mass retail distribution; cat line of ~50 SKUs at $7.99–17.99. Dog-first. | The licensed route (Hello Kitty, Garfield) and bundles at $60.99. Its cat bow tie at $7.99–10.99 is the US floor for a branded bow tie. |
| 6 | **Pandaloon** | 16 SKUs, walking costumes $24.99–31.99 against $39.99–49.99 compare-at; 25K IG; 18.9K TikTok followers with 673.7K likes from just 11 videos. Cat collection is dog products relabelled. | Evidence that a single viral pet-costume video format (walking costume) can carry a brand for years. Also evidence that "cat costume" pages stuffed with dog products are common — Catwalk Club's genuinely cat-fitted range is a differentiator. |
| 7 | **FuzzYard US** | New US store (all 1,118 SKUs created Jan 2026), cat collars $7.99–8.99 and $13.99 cat fashion packs; 108K IG globally, separate UK store. | A well-funded Australian brand is now pricing cat collars at $7.99 in the US — the low end is not empty. |
| 8 | **Pet Krewe** | Former category leader; site now sells pet food only. Lion Mane still sells on Amazon UK (1,946 ratings, £18.99–21.99). | The Lion Mane price on Amazon UK (£18.99) is nearly double Catwalk Club's £9.99; the earlier sourcing note's "£3.61 on Amazon UK" refers to unbranded listings, not Pet Krewe. |
| 9 | **Meowingtons** | 742K IG, but 232 of 351 products are Printify print-on-demand for humans; one cat bow tie. | Audience without a wearables range — a partnership or wholesale target rather than a competitor. |
| 10 | **Happy & Polly** | 151K IG, 86K TikTok, 1,385 reviews — all furniture. | Same: audience, not a costume competitor. |

Excluded from ranking: The Foggy Dog (20 cat items, US/Canada shipping only), CatLadyBox (subscription box merch), Best Dressed Pets US (eprolo dropship, nothing added since Feb 2022, "all ship from China" — the kind of store Catwalk Club must not resemble), Rubie's (wholesale).

---

## 5. Shipping promises and UK reach (VERIFIED from shipping policy / FAQ pages, 2026-09-26)

| Store | Domestic promise | International / UK | Ships to UK? |
|---|---|---|---|
| Made By Cleo | 1–3 business days production; US First Class 2–4 days | International First Class 12–14 business days; "Canada, Australia or the UK… often within 8–14 days" | Yes — GBP in currency selector. https://madebycleo.com/pages/faq |
| Pawsome Couture | USA 5–9 business days, $3.95 (free over $50) | UK £2 flat, free over £40, 5–10 business days; CA/AU similar; rest of world 10–20 days | Yes — dedicated UK rates and Christmas cut-off (9 Dec). https://pawsomecouture.com/policies/shipping-policy |
| Sweet Pickles Designs | Not stated | "Buyers are responsible for any customs and import taxes" | Yes (implied), GBP shown |
| Pet Costume Center | $5 flat ground; free 1–3 day over $49 | Worldwide via DHL, customer pays duties; some countries excluded | Yes. https://petcostumecenter.com/shipping/ |
| Sassy Woof | Free US shipping $50+; ships in 1–3 business days | Country selector includes UK (GBP) | Yes. https://sassywoof.com/pages/shipping |
| Pandaloon | Free US shipping over $50; "Buy with Prime" | Country selector includes UK (GBP) | Yes |
| FuzzYard US | Free US shipping over $30 | No UK in selector; separate fuzzyard.co.uk | Via UK store only |
| Meowingtons | Ships from New York within 24 h; USPS 3–5 days | Rest of world DHL 4–12 business days; customs payable | Yes. https://meowingtons.com/policies/shipping-policy |
| Happy & Polly | Free over $19; stocked items 3–7 days | International standard 12–30 days (drop-ship from China for many lines) | Yes |
| The Foggy Dog | Calculated at checkout | "Ships to addresses within the United States and Canada" only | **No** |
| Pet Krewe | Free over $35 | UK in selector (food only) | Costumes: Amazon UK only |
| Supakit (UK) | Ships from Northampton; Royal Mail Tracked 4–5 business days | Free shipping over threshold | UK native |
| Cheshire & Wain (UK) | Free UK shipping over £80 | "Ships worldwide from the UK" | UK native |

---

## 6. Marketplaces: TikTok Shop US (VERIFIED 2026-09-26) and Amazon

### 6.1 TikTok Shop US, keyword "cat costumes" — https://shop.tiktok.com/us/k/cat-costumes

| Listing (top of 25) | Seller | Price | Rating · reviews | Sold (listing) |
|---|---|---|---|---|
| Bat Wings Cat Costume, Adjustable Pet Outfit | Hanhanle pet | $13.22 | 4.3 · 319 | 6,396 |
| Funny Chucky Halloween Dog Costume with Wig | KMomax | $18.16 | 4.3 · 226 | 2,494 |
| 3 Pcs Summer Pet Vest Shirt Set | BOLE HOME | $4.21 | 4.7 · 58 | 622 |
| Funny Chucky Halloween Dog Costume | BOHEM COCO | $17.99 (was $29.98) | 4.1 · 7 | 246 |
| Kawaii Bee Hooded Top for Small Dogs | jfws shop | $9.99 (was $19.98) | 4.0 · 1 | 40 |
| Littlearth NCAA Pet Stretch Jersey | QVC, Inc | $33.97 | 5.0 · 4 | 27 |
| Lion Mane Cat Costume | The Holiday Season | $6.99 | 5.0 · 1 | 0 |
| Halloween Cat Costume, Bat Wings Cape | PawMini Hub | $6.49 | 5.0 · 1 | 1 |
| Spider Cat Mask | SheyM.Shop | $7.00 | 5.0 · 1 | 3 |
| Pet Life LED Santa / Snowman hoodies | QVC, Inc | $26.98–54.00 | 5.0 · 1 | 0 |

Of the 25 listings, 13 show 0–1 sold. Total sold across all 25 = 9,861, of which the top two listings are 90 %.

**Top product's page** — https://shop.tiktok.com/us/pdp/1729402737525035882: "11.7K sold", 4.3★ from 503 ratings (319 US), shop "Hanhanle pet" 21.3K sold, 83 % positive feedback, ships from overseas, "Global standard shipping" 6–11 days, $7.99 shipping fee, free 30-day returns. Reviews mention arm straps being "really thick and bulky". This is the same product family as Catwalk Club's Devil Bat Cape.

### 6.2 Other TikTok Shop US keyword pages

| Keyword page | Listings | Total sold | Listings with ≥100 sold | Top item |
|---|---|---|---|---|
| cat costume (https://www.tiktok.com/shop/k/cat-costume) | 25 | 3,161 | 5 | Human costumes (Fashion Nova, Dolls Kill, Leg Avenue). Pet items: Arsoxy lion headband $9.99, 3.7★, 270 sold; Trail Hub bat-wing $12.99, 111 sold; HATONE Christmas Santa hat & cloak $12.99 (was $25.99), 41 sold; Wovo pumpkin set $15.99, 1 sold |
| cat clothes (https://shop.tiktok.com/us/k/cat-clothes) | 25 | 943 | 2 | BOLE HOME vest set $4.21, 622 sold |
| cat bandana (https://shop.tiktok.com/us/k/cat-bandana) | 10 | 946 | 3 | The Cattery Shop enamel pin $7.95, 539 sold; 6-pack bandana sets $8.73–8.96, 130–199 sold |
| cat bow tie collar, lion mane cat costume, cat halloween costume | 404 — no keyword page exists | — | — | — |
| UK: shop.tiktok.com/gb/k/cat-costumes | Captcha wall — not bypassed | — | — | — |

Reading: TikTok Shop US cat-costume demand is real but concentrated in one or two Chinese-shipped listings at $13–18; the branded US DTC players are absent from these pages. A UK seller with real-cat video and 1–3 day delivery would face no branded competition on TikTok Shop UK, but that page could not be verified today.

### 6.3 Amazon

- Amazon.com blocked (captcha). Amazon UK returned the Pet Krewe Cat Lion Mane: £18.99 (also shown £21.99 / RRP £29.99), 4.3★, 1,946 ratings, Best Sellers Rank 216,827 in Pet Supplies and 2,657 in "Costumes for Dogs". VERIFIED https://www.amazon.co.uk/dp/B010E4TAKW. Note the category: even the best-known cat lion mane is ranked as a dog costume.
- Pet Krewe costumes live at https://www.amazon.com/stores/PetKrewe/page/335F892F-EC49-4375-A9DD-5060AE250F77 (DDG-verified URL; page content not fetched).

---

## 7. US market versus UK — what it means for Catwalk Club

### 7.1 Price tolerance

| Item | US DTC range (VERIFIED) | Catwalk Club launch → list (VERIFIED data.js) | Catwalk Club in USD (ESTIMATED at 1.34) |
|---|---|---|---|
| Bow tie (alone) | $7.99 (Sassy Meow) – $13.95 (Made By Cleo) | Bow Tie Collar £8.99 → £10.99 | $12.05 → $14.73 |
| Bandana | $10.46 (Cleo sale) – $13.99 (FuzzYard pack) | Bandana Collar £7.99 → £9.49 | $10.71 → $12.72 |
| Everyday collar | $7.99 (FuzzYard) – $33 (Pawsome Couture); Cleo $18.95, Sweet Pickles $14.99, Sassy Meow $15.99–17.99 | — | — |
| Bat / devil cape | $13.22 (TikTok Shop), $13.46–17.95 (Cleo) | Devil Bat Cape £12.99 → £15.49 | $17.41 → $20.76 |
| Lion mane | $6.99 (TikTok, 0 sold) – $24.99 (Pandaloon walking); Amazon UK Pet Krewe £18.99 | Lion Mane £9.99 → £11.99 | $13.39 → $16.07 |
| Pumpkin / hat sets | $11.21–14.95 (Cleo hats); PCC $7.47–14.63 | Pumpkin Hat & Ruffle Collar £11.99 → £14.49 | $16.07 → $19.42 |
| Santa set | $14.95 (Cleo hat); TikTok $12.99 hat + cloak | Santa Hat & Scarf Set £17.99 → £21.49 | $24.11 → $28.80 |
| Collar + bow set | $29.95 (Cleo), $60.99 (Sassy Meow bundle) | Halloween Pair £23.99 → £28.99 | $32.15 → $38.85 |

Reading (ESTIMATED from the table): Catwalk Club's collar and bandana prices are at the floor of the US branded range, so the planned 15–20 % move to list prices is safe on international comparables. The costume lines (bat cape, pumpkin set, Santa set) sit at or slightly above the US marketplace price for the same Chinese-made item, which is where the real-cat video, UK stock and 1–3 day delivery have to earn the premium.

### 7.2 Seasonality

- US brands drop Halloween on the last week of August: Made By Cleo's Halloween collection items are dated 2026-08-28; its Pumpkin Patch range was created 2023-08-29 and 2024-08-28. VERIFIED (`created_at` in products.json).
- End-of-September stock-outs are normal: 20 of Pet Costume Center's 54 cat costumes were out of stock on 26 Sep. VERIFIED.
- NRF: pet-costume spend $0.92 bn (2026) vs $0.86 bn (2025); pumpkin 11.6 %, hot dog 5.9 %, ghost next. VERIFIED (Section 1).
- Christmas is the second peak and the one where cat wearables outsell costumes: Made By Cleo's Santa Hat (~115 reviews) and Witch Hat (~122) are its most-reviewed costume items; Cheshire & Wain tags 39 products "xmas"/"catmas". VERIFIED.
- Google Trends could not be fetched (429), so no direct US-vs-UK search-curve comparison is available in this document.

### 7.3 Dog versus cat mix

| Store | Dog items | Cat items | Ratio |
|---|---|---|---|
| Pet Costume Center | 261 dog costumes | 54 cat costumes | 4.8 : 1 |
| FuzzYard US | 1,012 | 106 | 9.5 : 1 |
| Sassy Woof | 1,327 | 55 | 24 : 1 |
| The Foggy Dog | 738 | 20 | 37 : 1 |
| Pandaloon "cat costumes" collection | 8 (dog-titled) | 0 | all dog |
| Amazon UK category for Pet Krewe Cat Lion Mane | "Costumes for Dogs" | — | — |
| Made By Cleo, Sweet Pickles, Pawsome Couture, Supakit, Cheshire & Wain | — | cat-first | collars, bow ties, bandanas only |

VERIFIED counts from products.json / Store API. Reading: the US costume market is dog-first by roughly 5:1 to 25:1 at the brand level; cat-first brands avoid costumes and make their money on collars and sets. Catwalk Club's cat-fitted costume range plus collars is a positioning nobody in this set occupies. The owner's openness to small dogs matches how every US comparator labels its products ("Cat / Small Dog").

### 7.4 Implications for the £100,000 net-profit goal (ESTIMATED, reasoning only)

1. **Do not enter the US with costumes by post from the UK.** The US comparables ship domestically in 2–5 days for $0–5; a UK parcel would arrive later than TikTok Shop's Chinese sellers (6–11 days) at a higher landed price. Enter the US, if at all, with collars and bow ties via Shopify Markets after the UK Halloween peak, priced $12.99–14.99 — inside the Sweet Pickles / Sassy Meow band and below Made By Cleo.
2. **Copy Made By Cleo's engine, not its shipping.** ID tags and AirTag holders under $11 are its two most-reviewed products (4,895 and 1,178 reviews). A £6.99–9.99 engraved tag or AirTag holder is a cheap, light, year-round line that the current seven-product range lacks.
3. **Use the late-August drop date.** Every US brand launches Halloween on 28–29 August. Catwalk Club's 2027 Halloween range should be live by 25 August 2027; this year's launch is already a month behind the US calendar, which argues for leaning on Christmas (Santa set, collars) from mid-October.
4. **Legal floor check on what was seen.** Pandaloon shows $39.99–49.99 compare-at prices against $24.99–31.99 sale prices with no dated end; Made By Cleo's 25 % Halloween discount is a genuine collection-wide reduction from prices that were live before 28 Aug. The Cleo pattern (real prior price, whole-collection, seasonal) is the one to mirror under the DMCC Act; the Pandaloon pattern is not.

---

## 8. Source list (all fetched 2026-09-26)

- Catalogues: `https://madebycleo.com/products.json`, `https://sweetpicklesdesigns.com/products.json`, `https://pawsomecouture.com/products.json`, `https://sassywoof.com/products.json`, `https://pandaloon.com/products.json`, `https://fuzzyard.com/products.json`, `https://petkrewe.com/products.json`, `https://meowingtons.com/products.json`, `https://happyandpolly.com/products.json`, `https://thefoggydog.com/products.json`, `https://catladybox.com/products.json`, `https://bestdressedpetsus.com/products.json`, `https://rubies.com/products.json`, `https://cheshireandwain.com/products.json`, `https://supakit.co/products.json` (each with `?limit=250&page=N`), plus the matching `/collections.json`.
- WooCommerce: `https://petcostumecenter.com/wp-json/wc/store/v1/products?per_page=100&page=N`; `https://zezelife.com/wp-json/wc/store/v1/products` (cat furniture, 371 products — not ranked).
- Shipping: `https://madebycleo.com/pages/faq`, `https://pawsomecouture.com/policies/shipping-policy`, `https://petcostumecenter.com/shipping/`, `https://meowingtons.com/policies/shipping-policy`, `https://thefoggydog.com/policies/shipping-policy`, `https://happyandpolly.com/policies/shipping-policy`, `https://sassywoof.com/pages/shipping`, `https://supakit.co/blogs/support/shipping`, `https://sweetpicklesdesigns.com/policies/shipping-policy`, `https://bestdressedpetsus.com/policies/shipping-policy`.
- TikTok Shop: `https://shop.tiktok.com/us/k/cat-costumes`, `https://www.tiktok.com/shop/k/cat-costume`, `https://shop.tiktok.com/us/k/cat-clothes`, `https://shop.tiktok.com/us/k/cat-bandana`, `https://shop.tiktok.com/us/pdp/1729402737525035882`.
- Social: `https://www.tiktok.com/@{madebycleo,sweetpicklesdesigns,meowingtonsco,pawsomecouture,cheshireandwain,supakitstore,thefoggydog,sassywoof,pandaloon,petcostumecenter,happyandpolly}`; Instagram counts from DuckDuckGo snippets of `https://www.instagram.com/{madebycleo,sweetpicklesdesigns,meowingtonsco,pawsomecouture,petkrewe,petcostumecenter,pandalooncom,fuzzyard,fuzzyard_usa,fuzzyarduk,cheshireandwain,sassywoof,thefoggydog,happyandpolly}/`.
- Amazon UK: `https://www.amazon.co.uk/dp/B010E4TAKW`.
- NRF: `https://nrf.com/media-center/press-releases/nrf-consumer-survey-finds-halloween-spending-to-reach-record-13-1-billion` (2025); `https://giftshopmag.com/news/nrf-halloween-survey-shows-consumer-spending-expected-to-reach-13-5-billion/` (2026 figures, reproduced from NRF).
- Catwalk Club prices: `/home/user/sc/cat-costumes/site/assets/data.js`.
