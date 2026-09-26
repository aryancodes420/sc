# 03 · UK stores that actually sell cat costumes, collars and clothing

Researched 26 September 2026 for Catwalk Club (seven launch products, £7.99–£17.99, plus four bundles).
Every number is tagged **VERIFIED** (fetched today, URL given) or **ESTIMATED** (method given). Raw
fetches are saved in `scratchpad/research/uk/` (`crawl-<domain>.json` = full `/products.json` +
`/collections.json` + homepage scan; `wc-<domain>*.json` = WooCommerce Store API; `pdp-*.html`;
`tt-*.html` TikTok profiles; `home-*.html`).

## 1. What the evidence says in one paragraph

**No UK store specialises in cat costumes.** Thirty-one candidate domains were checked; the only
"cat costume" storefront on a `.co.uk` domain (Halloween Kingdom) turned out to be an Amazon affiliate
site created in June 2026 whose "Add to cart" sits next to a "Check Price" button linking to
`amazon.co.uk/dp/…?tag=hwk06-21` (VERIFIED, §6). Pets at Home returns **0 results** for "cat halloween"
(VERIFIED). The UK stores that *do* sell cat wearables well sell **collars, bandanas and bow ties**, not
costumes, and they win on one of two things: *review volume* (Supakit 2,299 Loox reviews; Cheshire &
Wain 536 Okendo reviews; Bells & Whiskers 386 Trustpilot + 308 on-site product reviews) or
*price-point breadth* (Pipkin and Bella: 215 products, median £10, 125 Trustpilot reviews at 4.9).
Their TikTok followings are tiny (Supakit 217, Pipkin and Bella 242, Kittyrama 171) — the one UK indie pet
shop with real TikTok traction is Amy's Pet Supplies (9,361 followers, 79,600 likes, 1,826 videos),
a generalist in Braintree. For Catwalk Club that means: (a) the costume niche is open at every price
point in the UK, (b) the everyday collar/bandana/bow-tie half of the range walks straight into
Bells & Whiskers and Pipkin and Bella territory at £4.99–£12, and (c) a founder who films real cats
on TikTok has no established UK cat-accessory competitor there at all.

## 2. Method and what was blocked

| Step | Result |
|---|---|
| DuckDuckGo HTML search (curl) | **Blocked** — served a "select all squares containing a duck" challenge on every query, including single sequential ones. Mojeek returned 403; Brave and DDG-lite returned no results; Bing ignored the query and returned generic "cat" pages. Discovery was done with the WebSearch tool instead (US-biased index, so UK-only micro-shops may be under-represented). |
| Shopify detection | `/products.json?limit=250&page=N` paginated for every candidate; 20 Shopify stores confirmed (`myshopify` domain read from homepage). |
| WooCommerce detection | `/wp-json/wc/store/v1/products?per_page=100` paginated; 5 stores confirmed; this API exposes **per-product review counts and ratings**, which Shopify's JSON does not. |
| Bestsellers | `/collections/all?sort_by=best-selling` fetched for 13 Shopify stores; product order parsed. |
| Reviews | Loox / Judge.me / Okendo markup parsed from product pages; Okendo store-level API (`api.okendo.io/v1/stores/<id>/review_aggregate`) worked for two stores; Judge.me widget API refused every store's page token; Trustpilot blocked curl (403) but worked through WebFetch. |
| Socials | TikTok profile pages fetched directly (`followerCount` in page JSON). **Instagram returned HTTP 429 on every profile**; follower counts below come from search-engine snippets of the profile page and are tagged ESTIMATED. Facebook not attempted. |
| Company age | Companies House company pages fetched for Supakit and Kittyrama; others via search snippets of Companies House. |
| **Blocked entirely** | Amazon UK search (2 KB bot page, then 503), Etsy market and shop pages (403), Reddit `search.json` (403 on both old. and www.), Instagram profiles (429), Playwright renders of Clothes for Cats / Hiro + Wolf / Prince & Princess product pages (45–60 s timeouts through the proxy). |

## 3. Ranked: UK stores with evidence of performance

Ranking weighs verified review volume and recency, catalogue depth in cat wearables, longevity and
social reach. "Cat wearables" = collars, bandanas, bow ties, harnesses, clothing, costumes for cats.

| # | Store | Platform · since | Products (cat-related) | Cat-wearable price range · median | Review evidence | Socials (followers) | Why it ranks here |
|---|---|---|---|---|---|---|---|
| 1 | **Supakit** · supakit.co · London | Shopify · Ltd inc. 22 Sep 2017 (Companies House 10977463, micro-entity accounts) VERIFIED | 13 (11) VERIFIED | Collar £31, harness £34–82 · median £34 VERIFIED | **2,299 Loox reviews site-wide; 1,100 on the breakaway collar (4.7), 663 on the harness (4.7)** VERIFIED (homepage + product JSON-LD) · Trustpilot **222 reviews, 4.6**, latest 7 Jul 2026 VERIFIED | IG ~19K (ESTIMATED, search snippet) · TikTok **217** followers / 805 likes / 41 videos VERIFIED · YouTube, Pinterest | Highest verified review count of any UK cat-accessory brand. 13 SKUs, 14.2 images per product. Sells training courses (LearnWorlds) alongside product. Shows premium cat-only can work at 3–4× Catwalk Club's collar price. |
| 2 | **Cheshire & Wain** · cheshireandwain.com · Bridport, Dorset | Shopify · brand since 2013 (own "Our Story"; not found on Companies House by name) | 92 (88) VERIFIED | Leather cat collars £16–£250 · median £55 (32 collars) VERIFIED | **Okendo store aggregate: 536 reviews, 513 five-star, 467 with photos/video**, updated 25 Sep 2026 VERIFIED (api.okendo.io) · no Trustpilot profile (404) VERIFIED | IG ~25K (ESTIMATED, snippet) · FB · reels of collars being made | Biggest Instagram audience in the set and the most photo reviews. Luxury leather, UK-made in the Midlands. Not a costume seller: the only seasonal item is a £6 "Santa Claws" gift bag. |
| 3 | **Bells & Whiskers** · bellsandwhiskers.co.uk · Newark, Notts | WooCommerce · Ltd inc. 24 Feb 2021 (13221299) VERIFIED | **600 (431 cat)** VERIFIED via Store API | Fabric cat collars £9.99–£10.99, cat bandanas **£4.99**, Christmas cat collars £9.99–£10.99 (35 SKUs), Halloween cat collars £10.50–£10.99 · overall median £10.50 VERIFIED | **308 on-site product reviews across 115 products, mean rating 4.99** VERIFIED (Store API) · Trustpilot **386 reviews, 4.9**, latest 5 Sep 2026 VERIFIED · claims "over 4,000 five-star reviews across Etsy, Trustpilot, Google and Facebook" (ESTIMATED — their claim; Etsy blocked) | IG @bellswhiskers (count not obtainable) · FB · Etsy shop HandcraftedPetGifts (403) | **Closest like-for-like to Catwalk Club's Bow Tie and Bandana Collars.** Handmade in-house, 262 fabric cat collar SKUs, dedicated *Halloween For Cat* and *Yuletide Cat Collars* categories. Sets the UK indie price ceiling for a fabric cat collar at ~£10.50 and a bandana at £4.99. |
| 4 | **Pipkin and Bella** · pipkinandbella.co.uk · Bathgate, Scotland | Shopify (oldest product 30 May 2023; business "started May 2019" per snippets; no Ltd found) VERIFIED/ESTIMATED | 215 (145) VERIFIED | Cat collars £8–£12 (24), bow ties **£3–£8** (19), bandanas **£2.40–£10** (14), cat harnesses (17) · median £10 VERIFIED | Trustpilot **125 reviews, 4.9, 99% five-star**, latest 13 Sep 2026 VERIFIED · no on-site review app | IG ~9.4K (ESTIMATED, snippet) · TikTok **242** followers / 5,012 likes / **228 videos** VERIFIED · FB, X, Pinterest | Best-selling sort puts **adjustable cat harnesses** first (VERIFIED). 7.3 images per product. Prestige Awards "Pet Goods Retailer of the Year 22/23" (their claim). The price-point competitor: their bow tie at £6 undercuts Catwalk Club's £8.99. |
| 5 | **Hiro + Wolf** · hiro-and-wolf.com · Margate, Kent | Shopify · Ltd inc. 7 Apr 2015 (09527336) VERIFIED; brand launched 2013 (ESTIMATED, founder LinkedIn snippet) | 227 (74) VERIFIED · 150 collections | Cat collars £17–£70 (63, median £24), cat bow ties £17–£49, cat bandanas £19–£30 VERIFIED | Judge.me: **75 reviews on "Over the Rainbow" cat collar**; 88 reviews across the 14 product pages sampled; cat collars other than that one show 0–2 VERIFIED · no Trustpilot (404) VERIFIED | IG ~11K (ESTIMATED, snippet) · FB, YouTube, Pinterest · wholesale on Faire · Margate shop | Best-selling sort is **all dog collars** (VERIFIED) — cats are a side range. 68 products added in 2025 (VERIFIED). RocketReach claims "$3M revenue 2025" — data-broker figure, **unverified, treat as noise**. |
| 6 | **Kittyrama** · kittyrama.com · Poole, Dorset | Shopify (store rebuilt: 34 of 35 products created 2025) · Ltd inc. 22 May 2013 (08539663) VERIFIED | 35 (35) VERIFIED | Silicone breakaway collars **£14.99–£16.99** (24), carriers to £79.99 · median £15.99 VERIFIED | Judge.me installed but **no review widget renders** on product pages (Playwright, VERIFIED) · no Trustpilot (404) · International Cat Care "Cat Friendly Approved" accreditation and "as seen in Vogue" (their claims) | IG ~4.5K (ESTIMATED, snippet) · TikTok **171** followers / 5,489 likes / **253 videos** VERIFIED · X, FB | Wins through **stockists, not DTC**: listed at NVS (vet wholesaler), Healthy Pet Store, The Pets Larder, Amy's Pet Supplies, Lola & Nell, Creoate (VERIFIED from search results). The 253 TikToks with 171 followers is a warning about product-only content. |
| 7 | **Clothes for Cats + Prince & Princess Petwear** · clothesforcats.co.uk · St Helens | Shopify — **both storefronts run on the same account** (`Shopify.shop` on clothesforcats.co.uk = `princeandprincesspetwear.myshopify.com`) VERIFIED · trading since 2006 (oldest product 28 Mar 2007) VERIFIED | 171 (168) + 249 (113) VERIFIED | Cat clothing median £15–£17; cat collars £3–£21 (median £10.50); P&P vegan-leather safety cat collars £11 VERIFIED | Judge.me installed, **no review widget on product pages**, Trustpilot no profile (404) VERIFIED · Facebook 75 followers (ESTIMATED, snippet) · **no social links on clothesforcats.co.uk at all** VERIFIED | none linked | The UK cat-clothing category owner by SKU count (86 clothing lines) but with no visible social proof. 95 products added 2024, 23 in 2025, 12 in 2026 (VERIFIED) — slowing. Also a wholesaler (trade portal) — a potential *supplier* for a knit line, as sourcing.md already notes. |
| 8 | **Cat World Feline Superstore** · catworldshop.co.uk · Oswestry, Shropshire | Shopify (`bengal-cat-world.myshopify.com`, oldest product Jan 2018) VERIFIED | **784 (708)** VERIFIED | Handmade over-collar cat/dog bandanas **£2.50** (33), Trixie collars; overall median £3.50–£4 VERIFIED | Trustpilot **57 reviews, 4.8, 100% five-star**, 16 in the last 12 months, latest 17 Sep 2026 VERIFIED · Judge.me shows 0–3 per product VERIFIED | FB, YouTube, X · physical shop · eBay store | 296 products added in 2026 alone (VERIFIED) — very active. The £2.50 handmade bandana is the UK floor price for Catwalk Club's £7.99 Bandana Collar. Sells socks, cards and mugs; no costumes. |
| 9 | **Noggins & Binkles** · nogginsandbinkles.com | Shopify (oldest product May 2018) VERIFIED | 149 (68) VERIFIED | Vegan-cork breakaway cat collars £14–£30 (median £22), cat bow tie £14 VERIFIED | No review app, no Trustpilot (404) VERIFIED | IG ~4.5K (ESTIMATED, snippet) · FB, Pinterest | 19 products added in 2026 (VERIFIED). Best-selling sort leads with engraved ID tags. Design-led, no seasonal range. |
| 10 | **Furmily** · furmily.co.uk · London (Nine Elms, Stratford) | Shopify (products from Dec 2020) VERIFIED | 84 (48) VERIFIED | Cat outfits £6–£115, "Cat Outfits" collection, "Made in Chelsea" cloak £26, Christmas jumper £26 VERIFIED | Trustpilot **2 reviews** VERIFIED · Judge.me-style JSON-LD shows 3 reviews on a treat box | IG ~5.2K (ESTIMATED, snippet) · TikTok **3,425** followers / 11,400 likes / 246 videos VERIFIED | The only UK store with a *cat outfits* collection, but it is primarily a grooming salon; best-sellers are a treats subscription and grooming. Strongest TikTok of the cat-specific set. |
| 11 | **The Kitty Bling Boutique** · thekittyblingboutique.com | Shopify (products 2021–22) VERIFIED | 47 (47) VERIFIED | Crystal cat collars **£134–£186**, median £164 VERIFIED | Okendo store aggregate **37 reviews, 36 five-star** VERIFIED (api.okendo.io) · Trustpilot none | IG ~235 (ESTIMATED, snippet) · FB, Pinterest | Proof that even a 235-follower shop can sell £164 cat collars with 37 reviews; 1.3 images per product. Niche, not a competitor. |
| 12 | **The Prancing Dog** · theprancingdog.co.uk · Larbert | Shopify (2018) VERIFIED | 124 (13) VERIFIED | Cat bandanas £6.99 (7 designs, incl. Halloween/Christmas dog versions £7.49) VERIFIED | none found | IG, TikTok (no data returned), FB | 96 dog bandana SKUs; cat is an afterthought. Shows the personalised seasonal bandana at £6.99–£7.49. |

Also checked and **excluded from the ranking**: Battersea shop (12 virtual products, "no longer sells
physical gifts" — VERIFIED), Catit UK (brand store, 187 products, one bow-tie collar), Comfort Style
(944 dropship products; 346 reviews on a hair trimmer; the dog Chucky costume and Santa dress have 0
reviews — VERIFIED), Amy's Pet Supplies and The Pets Larder (generalists; see §5), Mega Fancy Dress
(2,000 human costumes; 13 "cat" items are human cat outfits — VERIFIED), Cat Cave Co (USD store,
US shop ID — not UK, VERIFIED), Petiquette (220 dog collars, 4 cat), Bark Boutique (dog only, 22 dog
costumes £14.99–£19.99, 1 review), Healthy Pet Store (food), Sphynx In Clothes (61 products, 47 on
sale, WooCommerce, 0 reviews), Meadow Sphynx / SphynxFashion (Wix), The Sphynx Cat Clothing Co (Wix,
~1,210 IG followers per snippet), IconicSX and Pets Villa (403), Kitty Direct and Cool Cat Collars
(WooCommerce with API disabled), Dottie's Pet Boutique (custom-dog-collars.co.uk, non-Shopify).

## 4. Like-for-like price check against Catwalk Club's launch prices

Catwalk Club prices from `site/assets/data.js` (launch offer / regular). UK competitor figures are
lowest variant price per product from today's catalogue fetches (VERIFIED unless noted).

| Catwalk Club product | Launch → regular | UK indie floor | UK indie typical | UK premium | Reading |
|---|---|---|---|---|---|
| Bow Tie Collar | £8.99 → £10.99 | Pipkin and Bella bow tie £3.00 (bow only) | Pipkin and Bella £6.00 median; Bells & Whiskers fabric cat collar £9.99–£10.99; Noggins & Binkles cork bow tie £14 | Hiro + Wolf £17–£49 | £8.99 sits in the middle. The regular £10.99 is level with Bells & Whiskers' handmade collars, so the page must show a *real* photographed cat and the breakaway buckle to hold that. |
| Bandana Collar | £7.99 → £9.49 | Cat World handmade over-collar bandana **£2.50**; Pipkin and Bella £2.40 | Bells & Whiskers £4.99; Prancing Dog £6.99; Pipkin and Bella median £8 | Hiro + Wolf £19–£30 | **Most exposed product.** At £7.99 it is 60% above the handmade UK typical (£4.99) with no maker story. Either bundle it (as First Costume Kit already does) or reprice toward £5.99. |
| Lion Mane | £9.99 → £11.99 | Amazon UK from £3.61 (competitors.md, 14 Sep) | Halloween Kingdom affiliate lists a lion mane wig (Amazon) | Cat Cave Co (US) £24.99-equivalent | No UK store stocks one. Zero UK DTC comparison; the comparison is Amazon. |
| Devil Bat Cape / Spider Costume | £12.99 → £15.49 | Halloween Kingdom (Amazon affiliate) vampire cape £6, bat wings £10 | Comfort Style bat wings (dog) £15 | — | No UK store stocks a cat cape or spider costume. The only "UK" prices are Amazon pass-throughs. |
| Pumpkin Hat & Ruffle Collar | £11.99 → £14.49 | — | Bells & Whiskers Halloween pumpkin-print cat collar £10.50 | — | The nearest UK product is a printed collar, not a hat. |
| Santa Hat & Scarf Set | £17.99 → £21.49 | Bells & Whiskers Christmas cat collar £9.99–£10.99 (35 designs, 28 reviews) | Prince & Princess Christmas knit Sphynx jumper £16; Furmily Christmas jumper £26 | — | £17.99 is the most expensive single item and the UK Christmas comparison set is collars at half the price. Justify with the two-piece and photography, or move it into the Festive Pair bundle as the hero. |

ESTIMATED reading across the set: Catwalk Club's costume half (five products) has **no UK DTC
comparator at all**; its everyday half (two products) is priced 30–60% above the handmade UK indie
norm. That is a story problem more than a price problem, because the UK indies sell on "handmade in
our studio" and Catwalk Club sells imported stock (sourcing.md).

## 5. Social channels: what the UK field actually looks like

TikTok figures were fetched directly from profile pages today (VERIFIED). Instagram counts are from
search-engine snippets (ESTIMATED; Instagram blocked direct fetches with HTTP 429).

| Handle | Store | TikTok followers | Likes | Videos | Instagram (est.) |
|---|---|---|---|---|---|
| @amyspetsupplies | Amy's Pet Supplies (Braintree generalist, 392 products) | **9,361** | 79,600 | 1,826 | — |
| @furmilyuk | Furmily | 3,425 | 11,400 | 246 | ~5.2K |
| @catituk | Catit UK (brand) | 333 | 688 | 37 | — |
| @pipkin_and_bella | Pipkin and Bella | 242 | 5,012 | 228 | ~9.4K |
| @supakitstore | Supakit | 217 | 805 | 41 | ~19K |
| @kittyramaltd | Kittyrama | 171 | 5,489 | 253 | ~4.5K |
| @halloween_kingdom | Halloween Kingdom | 0 | 0 | 0 | not found |
| @megacharacters | Mega Fancy Dress (human costumes) | 35,400 | 965,700 | 494 | — |
| — | Cheshire & Wain | no TikTok linked | — | — | ~25K |
| — | Hiro + Wolf | no TikTok linked | — | — | ~11K |
| — | Noggins & Binkles | no TikTok linked | — | — | ~4.5K |
| — | Clothes for Cats | none linked | — | — | FB 75 |

Reading (ESTIMATED): the three cat-accessory brands that post on TikTok average 1.6 to 32 likes per
video — product-only content. Amy's Pet Supplies gets ~44 likes per video across 1,826 posts by
showing a real shop, real animals and a person. Nobody in the UK cat-wearables field has a founder on
camera with cats in the product; that is the open lane for Catwalk Club, and it costs hours, not money.

## 6. Traps: stores that look like competitors and are not

| Store | What it looks like | What the data shows |
|---|---|---|
| **Halloween Kingdom** halloweenkingdom.co.uk | "Cat Costumes for Pets" collection, 74 cat-tagged products | Shopify store where **every product was created between 29 Jun and 18 Aug 2026**; ≥2,000 products (fetch capped); product page has both "Add to cart" and a **"Check Price" button to `amazon.co.uk/dp/B0FKTG8XN6/?tag=hwk06-21`** (an Amazon Associates tag); titles are raw Amazon listing titles ("Ling Bai…", "Peutier…"); TikTok 0 followers; Trustpilot none. **An affiliate catalogue, not a retailer.** VERIFIED. Its cat-costume price list (vampire cape £6, bat wings £10, cowboy hat + bandana £14, lion-mane wig, fairy costume) is therefore Amazon UK's price list — useful as the price ceiling shoppers see before they find Catwalk Club. |
| **Mega Fancy Dress** | "cat costumes" collection, 35K TikTok | Human fancy dress; 13 "cat" items are women's/kids' cat outfits; dog costumes exist, cat does not. VERIFIED. |
| **Comfort Style** | "Cat Clothing & Accessories" collection, Judge.me + Loox | 944 dropship products (duvets, nail kits, trimmers); the pet costumes have 0 reviews. VERIFIED. |
| **Cat Cave Co** | "Cat Costume for Halloween (Lion Mane)" £24.99, 18 costume items | US store (USD, `countryCode: US`). Not UK. VERIFIED. |
| **Pets at Home** | Press release about a "spooky season" range | Site search "cat halloween" returns **0 results** today (VERIFIED via fetch). Their Halloween copy stresses fire-retardant, no glitter/sequins — the safety language a UK buyer expects. |

## 7. What this means for Catwalk Club (ranked by what the evidence supports)

1. **The costume gap is real and UK-wide.** Five of seven launch products have no UK DTC comparator;
   the only UK-domain costume site is an Amazon affiliate. Catwalk Club is the first UK store in the
   niche, which also means no local demand proof exists beyond Amazon rankings (blocked today) — the
   14 Sep note that Amazon lion manes start at £3.61 stands.
2. **Reviews are the moat the winners built, and it took years.** Supakit (2017) has 2,299; Cheshire &
   Wain (2013) 536; Bells & Whiskers (2021) 386 Trustpilot + 308 on-site; Pipkin and Bella (2019) 125.
   All four ask for reviews (Loox/Okendo/Trustpilot invitations). Catwalk Club's empty review section
   is correct under the DMCC Act but means launch conversion must come from photography, the size
   finder and the founder video — the things the ranked stores lack.
3. **Reprice or re-story the Bandana Collar.** £7.99 vs £2.50–£4.99 handmade UK norm. The Bow Tie
   Collar at £8.99 is defensible; at the £10.99 regular price it needs the breakaway-buckle and real-cat
   photography to sit beside Bells & Whiskers.
4. **Copy the seasonal-collar move, not the costume move, for repeat revenue.** Bells & Whiskers runs
   35 Christmas cat collar SKUs at £9.99–£10.99 with 28 reviews and a *Halloween For Cat* category —
   low-risk wearables that sell to the 59% who will not dress a cat. A printed Halloween/Christmas
   collar at £8.99 is the cheapest add to the range with a proven UK price.
5. **Stockists are how Kittyrama and Prince & Princess scale** (NVS, Pets Larder, Amy's, Creoate,
   Faire). With no ad budget, a Faire/Creoate wholesale listing is a zero-cost channel the owner has
   not yet listed in LAUNCH-CHECKLIST.md.
6. **TikTok is empty of cat-wearable brands.** Best cat-specific account is 3,425 followers. Amy's
   Pet Supplies proves a UK indie can reach 9K followers / 80K likes by posting daily with a person and
   real animals — the owner's stated plan, executed by nobody in this niche yet.

## 8. Source URLs (all fetched 26 Sep 2026)

- Catalogues: `https://<domain>/products.json?limit=250&page=N` and `/collections.json` for supakit.co, cheshireandwain.com, pipkinandbella.co.uk, hiro-and-wolf.com, kittyrama.com, clothesforcats.co.uk, princeprincesspetwear.co.uk, catworldshop.co.uk, nogginsandbinkles.com, furmily.co.uk, thekittyblingboutique.com, theprancingdog.co.uk, halloweenkingdom.co.uk, megafancydress.co.uk, comfortstyle.co.uk, catit.co.uk, thepetslarder.co.uk, amyspetsupplies.co.uk, shop.battersea.org.uk, catcaveco.com.
- WooCommerce: `https://www.bellsandwhiskers.co.uk/wp-json/wc/store/v1/products?per_page=100&page=N` (also petiquettecollars.co.uk, bark-boutique.co.uk, healthypetstore.co.uk, sphynxinclothes.co.uk).
- Bestsellers: `https://<domain>/collections/all?sort_by=best-selling`.
- Reviews: https://supakit.co/ and https://supakit.co/products/breakaway-cat-collars (Loox, JSON-LD); https://api.okendo.io/v1/stores/e0b4f636-975d-405f-879e-61a2eb791e31/review_aggregate (Cheshire & Wain); https://api.okendo.io/v1/stores/a2e32064-8e40-4fd8-b994-3a67d0a7e2d5/review_aggregate (Kitty Bling); https://hiro-and-wolf.com/products/over-the-rainbow-cat-collar (Judge.me); Trustpilot: https://uk.trustpilot.com/review/supakit.co, /pipkinandbella.co.uk, /bellsandwhiskers.co.uk, /bengalcatworld.co.uk, /furmily.co.uk (404 for clothesforcats.co.uk, princeprincesspetwear.co.uk, hiro-and-wolf.com, cheshireandwain.com, kittyrama.com, halloweenkingdom.co.uk).
- TikTok: https://www.tiktok.com/@supakitstore, @furmilyuk, @kittyramaltd, @pipkin_and_bella, @catituk, @amyspetsupplies, @megacharacters, @halloween_kingdom.
- Companies House: https://find-and-update.company-information.service.gov.uk/company/10977463 (Supakit), /company/08539663 (Kittyrama), /company/09527336 (Hiro and Wolf), /company/13221299 (Bells & Whiskers).
- Halloween Kingdom affiliate evidence: https://halloweenkingdom.co.uk/collections/cat-fancy-dress and its first product page (saved as `research/uk/hk-pdp.html`).
- Pets at Home: https://www.petsathome.com/search?q=cat%20halloween (0 results).
- Catwalk Club prices: `/home/user/sc/cat-costumes/site/assets/data.js`.
