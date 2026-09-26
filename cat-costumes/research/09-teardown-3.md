# 09 — Teardown 3: Bells & Whiskers (bellsandwhiskers.co.uk) vs Catwalk Club

Researched 26 September 2026 for Catwalk Club (UK, seven launch products £7.99–£17.99 plus four bundles, goal £100,000 net profit by September 2027). Every figure is **VERIFIED** (fetched today, URL or file given) or **ESTIMATED** (method given). UK spelling. Bells & Whiskers is the closest UK like-for-like to our Bow Tie and Bandana Collars (03-competitors-uk.md ranks it #3 UK, 08-ranking.md #5 overall): a Newark, Nottinghamshire maker of handmade fabric cat collars at £9.99–£10.99 on WooCommerce, with Halloween and Christmas cat-collar categories.

## The five findings that matter

1. **They win on proof, we win on everything else about the page.** Their homepage carries a Google-reviews carousel ("EXCELLENT · Based on 68 reviews", Trustindex widget), a "4000 5* reviews across Etsy, Trustpilot, Google & Facebook" claim, a Companies House number and a street address in the footer, a Trustpilot link, and their best-seller shows "Rated 5.00 out of 5 (2 customer reviews)" with photo uploads. We show a maker-listing rating (4.8 · 585 for the bow tie) with a "shared with permission" note and empty UGC frames. Everything else on our product page (objection accordions, size finder, delivery window, express-pay row, sticky add-to-cart, cross-sell, quiz) they simply do not have. VERIFIED (§3, §4).
2. **Their site is 8–11× heavier and 20–30× slower to load than ours.** Chromium desktop: their homepage is 188 requests, 11.2 MB decoded (5.7 MB JavaScript, 2.0 MB CSS), `load` at 9.6 s; their product page 113 requests, 9.3 MB, 6.8 s; basket 134 requests, 10.3 MB. curl TTFB 1.5–2.9 s. Ours: 20–31 requests, 0.25–1.27 MB, `load` 110–316 ms on a local server (so no TTFB comparison). Our one weakness is the same as in teardown 2: 0 of 40 product images carry `srcset`, so a 390 px phone downloads 800×800 files to show them at 162–344 px. VERIFIED (§2).
3. **Their buy box is faster to reach on a phone than ours, and their page is half the length.** On a 390 px viewport their "Add to basket" sits 1,504 px down (1.8 screens); ours (Lion Mane) sits 1,726 px down (2.0 screens) below a fixed 116 px header, a 61 px top bar, a 30 px LED ticker, breadcrumbs, a 344 px gallery, and three objection accordions. Their whole product page is 5,276 px tall; ours is 8,992 px (Lion Mane) to 9,877 px (Bow Tie). VERIFIED (§2, Playwright `pw2.js`).
4. **Their fulfilment promise is the weakest thing on their site and the biggest opening for ours.** Their basket and checkout carry a notice that orders placed after 12 September will not start being made until 25 September; their policy says 4–6 business days to make plus 2–3 days Tracked 48 at £2.95 (or £2.98 at checkout on a £2.50 item); no free-delivery threshold; no Northern Ireland shipping; returns only on unused, unopened items with tags on, at the buyer's cost, and "discounted items are final". We promise 2–4 working days, free over £30, and 30-day returns "worn or not". That promise is only worth having if it is true: everything except the Bandana ships from China in 10–20 days unless we hold UK stock (sourcing.md). VERIFIED (§3.4, §5).
5. **Our launch-offer ticker is still showing an expired sale and a struck-through price.** `SALE.ends` is `2026-09-22T23:59:59+01:00`; today is the 26th. Every page renders `SALE ENDS IN 00D 00H 00M 00S` and product pages show `£8.99 £10.99 SAVE 18%` with "Launch offer: £8.99 until Tue, 22 Sept, then £10.99". This was flagged in teardown 2 and is still live. Bells & Whiskers shows no reference prices at all (Store API: `price == regular_price` on all 100 most-popular products, `on_sale: false`). A struck-through price whose deadline has passed is the DMCC Act 2024 "fake reference price" pattern; it must be fixed before anything in the change list. VERIFIED (`data.js`, screenshots `bw/cc-pdp-mob-top.png`).

## Method and what was fetched

| What | How | Result |
|---|---|---|
| Homepage `https://www.bellsandwhiskers.co.uk/` | curl (desktop UA) ×3, Playwright desktop 1366×900 and mobile 390×844 | 200, 321 KB HTML. Screenshots `bw/bw-home-{desk,mob}-{top,full}.png` |
| Best-selling product | WooCommerce Store API `wp-json/wc/store/v1/products?per_page=100&orderby=popularity` → #1 is `Blue Fabric Cat Collar With Gold Star Print` (id 94719) | 200. Page fetched ×3 by curl and rendered both viewports |
| Collection page `product-category/fabric-cat-collars/` and `product-category/halloween-cat-collars-bandanas/` | curl + Playwright | 200 |
| Basket `bells-whiskers-basket/` empty, then with one item added through the public `/?add-to-cart=96897` link (a £2.50 ID capsule) | Playwright | 200; `bw/bw-basket-filled-desk.png`, `bw/bw-basket-filled.txt` |
| Checkout `pet-gifts-bells-whiskers/` (guest checkout form, not submitted) | Playwright | 200; `bw/bw-checkout-desk.png`, `bw/bw-checkout.txt` |
| Delivery, returns and FAQ pages | curl | 200 |
| Shopify-style `/products.json`, `/collections.json`, `/collections/all`, `/checkout/` | curl | 404 — it is WordPress 7.0.2 / WooCommerce 11.1.0 (`<meta name="generator">`), not Shopify |
| Trustpilot `uk.trustpilot.com/review/bellsandwhiskers.co.uk`, Etsy shop | curl | 403 both (blocked). The Trustpilot figure below is from 03-competitors-uk.md, fetched earlier today by WebFetch |
| Ours | `site/index.html`, `product.html`, `shop.html`, `cart.html`, `assets/site.js`, `assets/data.js`, `assets/reviews.js` read in full; rendered from a local `python3 -m http.server` at 127.0.0.1:8765 in the same Playwright runs | Screenshots `bw/cc-*-{desk,mob}-*.png`, metrics `bw/pw-results.json` |

Nothing was logged into and no captcha was bypassed. Playwright byte counts are decoded response bodies (`response.body().length`), so they overstate wire transfer for gzip'd text but are comparable between the two sites.

## 1. Who they are, in numbers

| Metric | Bells & Whiskers | Catwalk Club | Tag |
|---|---|---|---|
| Platform | WordPress 7.0.2 + WooCommerce 11.1.0, Uncode theme, PayPal Payments, Flexible Shipping, Trustindex, Trustpilot plugin, Contact Form 7, GTM | Static demo → Shopify theme in `theme/` | VERIFIED (`home.html` plugin slugs) |
| Company | Bells & Whiskers Ltd, No. 13221299, Northgate Business Centre, Newark NG24 1EZ (footer) | Not yet trading (footer says so) | VERIFIED |
| Catalogue | 600 products, 431 cat (03-competitors-uk.md); Fabric Cat Collars category alone "Showing 1–7 of 264 results", 38 pages | 7 products + 4 bundles | VERIFIED |
| Price of the 100 most popular | £2.50–£24.99; top four by popularity are cat collars at £10.49–£10.99; no product on sale, `price == regular_price` for all 100 | £7.99–£17.99 launch, £9.49–£21.49 regular; bundles £14.99–£24.99 | VERIFIED (Store API) |
| Best seller | Blue Fabric Cat Collar With Gold Star Print, £10.50, 3 sizes, max 4 per order, 2 photos (collar only, no cat), 5.00 from 2 reviews dated Aug 2022 | Bow Tie Collar £8.99 (list £10.99), 6 supplier photos, maker rating 4.8 from 585 | VERIFIED |
| Reviews | 308 on-site product reviews across 115 products, mean 4.99; Trustpilot 386 reviews at 4.9 (03-competitors-uk.md, fetched earlier today); Google 68 reviews via Trustindex on the homepage; claim "over 4000 5* star reviews" across four platforms (their claim, unverifiable) | 0 own reviews; 944 maker-listing reviews syndicated on six product pages | VERIFIED / their claim ESTIMATED |
| Delivery | Made to order in 4–6 business days (6–8 bespoke), then Tracked 48 £2.95 (2–3 days) or Tracked 24 £3.95; £2.98 P&P charged on a £2.50 basket; free delivery only "from time to time" on some products; no P.O. boxes; no Northern Ireland "until further notice" | 2–4 working days tracked £3.95, free over £30 | VERIFIED (delivery page, basket) |
| Returns | 30 days, unused/unworn/unopened with tags, buyer pays postage, refund excludes postage, discounted and bespoke items final | 30 days "worn or not" (placeholder terms) | VERIFIED |
| Payment | PayPal (cards via PayPal), Apple Pay, Google Pay frame in basket; no Klarna/Clearpay; no Shop Pay | Placeholder row: Shop Pay, PayPal, Apple Pay, Google Pay; Klarna pay-in-3 line ≥£30; 10 payment icons | VERIFIED |

## 2. Speed, weight and mobile behaviour

### 2.1 curl timings (server → first byte), desktop UA, 26 Sep 2026

| Page | HTML size | TTFB run 1 | run 2 | run 3 | Total |
|---|---|---|---|---|---|
| Homepage | 321 KB | 1.96 s | 1.50 s | 1.92 s | 1.84–2.30 s |
| Best-seller PDP | 157 KB | 2.88 s | 2.77 s | 2.25 s | 2.50–3.13 s |
| Fabric Cat Collars category | 120 KB | 1.70 s | — | — | 1.87 s |
| Basket (empty) | 132 KB | 1.02 s | — | — | 1.18 s |

Ours cannot be measured for TTFB until it is on Shopify; the static HTML is 5.9–10.9 KB per page. VERIFIED.

### 2.2 Chromium render, `networkidle`, decoded bytes

| Page | Requests | Total | JS | CSS | Images | DOMContentLoaded | `load` | DOM nodes | Page height |
|---|---|---|---|---|---|---|---|---|---|
| **B&W home desktop** | 188 | 11.2 MB | 5.7 MB | 2.0 MB | 2.9 MB | 7.1 s | 9.6 s | 2,846 | 8,925 px |
| **B&W home mobile** | 197 | 13.5 MB | 5.1 MB | 2.0 MB | 5.7 MB | 6.8 s | 9.4 s | 2,817 | 15,063 px |
| **B&W PDP desktop** | 113 | 9.3 MB | 6.4 MB | 1.9 MB | 0.6 MB | 5.2 s | 6.8 s | 1,059 | 3,930 px |
| **B&W PDP mobile** | 115 | 10.1 MB | 6.4 MB | 1.9 MB | 1.4 MB | 4.7 s | 6.0 s | 1,069 | 5,276 px |
| **B&W category desktop** | 97 | 9.0 MB | 5.6 MB | 1.9 MB | 1.1 MB | 3.9 s | 4.6 s | 759 | 3,091 px |
| **B&W basket desktop** | 134 | 10.3 MB | 7.7 MB | 2.0 MB | 0.1 MB | 4.0 s | 5.7 s | 788 | 1,922 px |
| CC home desktop | 25 | 1.27 MB | 0.09 MB | 0.06 MB | 1.04 MB | 0.22 s | 0.27 s | 670 | 7,400 px |
| CC home mobile | 22 | 1.14 MB | 0.09 MB | 0.06 MB | 0.91 MB | 0.22 s | 0.29 s | 670 | 9,509 px |
| CC PDP (bow tie) desktop | 31 | 0.90 MB | 0.12 MB | 0.06 MB | 0.64 MB | 0.26 s | 0.29 s | 1,248 | 8,408 px |
| CC PDP (bow tie) mobile | 31 | 0.90 MB | 0.12 MB | 0.06 MB | 0.64 MB | 0.28 s | 0.32 s | 1,248 | 9,877 px |
| CC shop desktop | 24 | 1.19 MB | 0.09 MB | 0.06 MB | 0.96 MB | 0.13 s | 0.18 s | 375 | 2,830 px |
| CC cart desktop | 20 | 0.25 MB | 0.09 MB | 0.06 MB | 0.02 MB | 0.08 s | 0.11 s | 172 | 1,316 px |

VERIFIED (`bw/pw-results.json`). Their mobile homepage downloads 5.7 MB of images because the hero strip and the 34-link category list load full-size assets; 37 of 131 images have no alt text. Ours loads 0 images with `srcset` (40 `<img>` at 800×800, displayed at 162–344 px on a phone), 15–21 without alt on the home/PDP (thumbnails and card hover images are decorative, so that is mostly fine).

### 2.3 Mobile behaviour (390×844)

| Element | Bells & Whiskers | Catwalk Club |
|---|---|---|
| Fixed chrome | 89 px header (logo, search, basket, hamburger); no announcement bar; no sticky add-to-cart; a slide-in side-cart drawer (400 px wide, off-canvas until an item is added) | 61 px top bar (free delivery + Halloween countdown, scrolls away) + **fixed 116 px two-row header** + 30 px LED ticker + two fixed pills at the bottom ("10% off your first order" and "Help me choose", 32–35 px) + sticky add-to-cart bar once the buy box scrolls off. Roughly 180 px of permanent chrome on an 844 px screen |
| PDP: distance to price / size / add-to-cart | 1,042 / 1,384 / 1,504 px (two stacked 390×390 product photos first, then title) | 1,154 / 1,604 / 1,726 px (breadcrumb, gallery 344 px + 6 thumbnails, three objection accordions, title, rating, price, saving, ticks, fit line, then size and buttons) |
| Gallery | Two full-width images stacked vertically, no thumbnails, no zoom, both product-only on white | 1 main + 6 thumbnails, tap to swap, supplier photos with cats; two overlaid pills ("Enter Cat of the Month", "In stock") |
| Size picker | `<select>` "Choose an option" with three ranges in cm and inches | Three buttons with a note "S — neck 28cm / 11in · Cap 24cm" and a "Sizes are neck measurements" link |
| Horizontal overflow | none (scrollW = innerW) | none |
| Pop-ups | none seen after 9 s on desktop or 4 s on mobile; a cookie/GDPR string exists in source but no banner rendered | Email/10%-off modal opens after 7 s on home and shop (not on product or cart), once per browser |
| Chat | none (no Crisp/Tawk/WhatsApp script loaded) | "Help me choose" panel → contact page / size guide (WhatsApp link only when a number exists) |

VERIFIED (`pw2.js` output, screenshots).

## 3. Element-by-element walk

Legend: **B&W** = what Bells & Whiskers renders today; **CC** = what our `site/` renders today (read from the files, not guessed).

### 3.1 Site-wide chrome

| Element | Bells & Whiskers | Catwalk Club |
|---|---|---|
| Announcement / ticker | None. The only "announcement" is a holiday notice on the basket/checkout ("orders placed after midday Saturday 12th September … dispatched from Friday 25th September") | Top bar: "Free UK delivery over £30 · 🎃 Order by 14 October for Halloween — 19 days left" (real countdown from `HALLOWEEN.cutoff`); plus a red LED ticker "SALE ENDS IN 00D 00H 00M 00S" — **expired since 22 Sept** |
| Header | Centred logo, split nav (KITTEN & CAT / PUPPY & DOG / INSPIRATION / ABOUT · SHOP ALL / FAQS / DELIVERY / CONTACT), search icon, basket icon; mega-menu with 34 categories; Login link | Logo + Shop / Fit & care / FAQ / Saved (wishlist count) / Cart (count). No search in the header, no account link |
| Search | Site search (`no-livesearch` class: no predictive results) | Search box on shop page only, filters name/blurb/specs |
| Footer | Email, logo, Facebook, Instagram; postal address; four range links; Trustpilot link; Cookies & Privacy, Delivery, Returns, Terms of Sale; "Secured by PayPal" badge; © line with company number | Shop / Help (9 links: fit, FAQ, quiz, breeds, Cat of the Month, returns, track order, contact, about) / Legal (four `#` placeholders); 10 payment icons; "Demo storefront — not yet trading" |
| Trust badges | Google Customer Reviews badge iframe (renders as 2×2 px — effectively invisible), Trustpilot "Review us on" trustbox iframe, PayPal badge | Payment icons row in footer and buy box; no third-party badge |
| Analytics | Google Tag Manager | none in static site |

### 3.2 Homepage, top to bottom

| Element | Bells & Whiskers | Catwalk Club |
|---|---|---|
| Hero | Full-width photo strip: three dogs and two cats in collars/bandanas, italic "Crafted for Cats & Dogs", logo; **no button**. On mobile the hero image is dropped and the page opens on a text h1 "Quality handcrafted Cat & Dog collars, bandanas and more, designed & made in England…" | Kicker "🎃 Halloween 2026 is in", h1 "Costumes your cat will look unfairly good in.", lede, two buttons (Shop all / Halloween first), lion-mane photo with "Seriously cute" and "Sized for cats" stickers |
| Trust strip | Below the fold: "UK MADE" / "Special Gifts" / "Hand Crafted" / "Quality Checked" three-icon block | Directly under the hero: Free UK delivery over £30 / 30-day returns worn or not / 10% off first order WELCOME10 |
| Categories | A 34-item text list of every category (AirTag Holders … Velvet Velour Dog Collars), each with an arrow; on mobile it is the first thing under the h1 | Four photo circles (Everyday, Halloween, Christmas, Bundles) with a note each |
| Brand story | Two long paragraphs: "one of the largest collections of British made … collars in the whole of the UK", "made with care at our studio in Newark", "over 4000 5* star reviews gathered across Etsy, Trustpilot, Google & Facebook" with links | "Why Catwalk Club" panel: built for cats, real photos/real specs, free delivery — three lines |
| Social proof | Google reviews carousel via Trustindex: "EXCELLENT ★★★★★ Based on 68 reviews", nine named reviewers with dates Feb–Jun 2026 and a "Verified by Trustindex" badge; reviews mention "breakaway safety release buckle", "the only one I've been able to get Ray to wear", and one asks for colour/pattern filters | "Your cats, dressed" UGC wall — six empty "Your cat here" frames until winners exist |
| FAQ accordions | Seven: bandana sizing, puppy collar sizing, collar vs popper bandanas, bow-tie fit (up to 3 cm collar), bespoke service, leather care, washing | Four: size, delivery time, will my cat keep it on, Halloween order date |
| Product rows | Three carousels: DOG COLLARS (14), CAT COLLARS (12), DOG BANDANAS (12), each card = photo, "Select options" / "Add to basket" (simple products), Quick-View, title, price or price range | "Everything we make" (7 cards) → "Picture it on your cat" (five empty phone frames, `HOME_VIDEOS = []`) → "Cheaper together" (4 bundle cards) → "Save more by bundling" box with the four savings → UGC → quiz (3 questions) → sizing/why panels → 4 FAQs → recently viewed → newsletter form |
| Newsletter | none | "Get first pick of the Halloween drop" form (not wired) + the 7-second modal |

### 3.3 Collection page

| Element | Bells & Whiskers (Fabric Cat Collars) | Catwalk Club (shop.html) |
|---|---|---|
| Header | Full-width banner of four cat close-ups in collars, h1 "Fabric Cat Collars" | h1 "Everything we make", one-line lede |
| Count / pagination | "Showing 1–7 of 264 results", **7 per page, 38 pages**, default "Sorted by latest" | All 11 in one grid, no pagination |
| Sort | Popularity, average rating, latest, price low→high, high→low | Featured, price both ways, name A–Z (no rating or popularity) |
| Filters | **None** (a Google reviewer on their own homepage asks for colour/pattern/theme filters) | Category chips (Everything/Everyday/Halloween/Christmas/Bundles), "Fits:" size chips (S/M/L/one size), search box, "Sizes by breed" link |
| Card | Product photo on white (no cat), "Out of stock" text label where relevant, "Select options" (variable) or "Add to basket" (simple), "Quick-View" on hover, h3 title, price or "£7.50 – £13.50" range. **No star rating on cards** even though the Store API holds one for each product | Badge (Bestseller / UK stock / Halloween / Christmas / Save £1.99), photo with hover-swap to second image, wishlist heart, title, **stars + count from the maker listing**, blurb, price with strike-through and SAVE % while `SALE.active`, quick add ("🛒 Add" for one-size, "Pick size" link for sized items) |
| Quick add | Simple products add from the card; variable products go to the page | One-size products add from the card |

### 3.4 Product page (their best seller vs our Bow Tie Collar / Lion Mane)

| Element | Bells & Whiskers | Catwalk Club |
|---|---|---|
| Gallery | 2 images, product on white, no cat, no zoom, no video; stacked on mobile | 6 supplier images with cats, thumbnails, "Enter Cat of the Month" and "In stock" pills; video section present but empty ("Lifestyle videos go here") |
| Rating line | "★★★★★ (2 customer reviews)" linking to the tab; `AggregateRating` JSON-LD present | "★★★★★ 4.8 · 585 reviews" from the maker listing, linking to #reviews; product, offer, shipping, return-policy and breadcrumb JSON-LD |
| Title / price | h1, then "£10.50" as an h6 (no compare-at, no saving) | h1 + "aka Reginald" alias tag + price with strike-through, "SAVE 18%", "You've saved £2.00", "Launch offer … until Tue, 22 Sept" (expired) |
| Instalments | none | "Pay in 3 … with Klarna" only when basket ≥ £30, so never on a single product |
| Short description | Bold pipe line: "Soft & Flexible | Washable & Adjustable | Handmade & Not Mass Produced | Cute Star Charm | Lightweight" then "Read further down for more information…" | Blurb + three tick bullets + fit line "⇔ Adjustable elastic strap. Fits most adult cats." |
| Objection handling | none above the fold | Three accordions before the title: "Will it fit my cat?" (with a neck-cm size finder that selects the size), "When will it arrive?" (dated window, table, free-over-£30), "Is the quality good?" (material, care, returns); plus "Will my cat keep it on?" with a per-product answer |
| Size help | `<select>` with "Kitten 12cm–20cm [5″–8″] / Adult 18cm–25cm / Large Adult 23cm–30cm"; description says "sizes approx", collar width 1 cm; no how-to-measure | Size buttons with neck cm/in per size, "Sizes are neck measurements — How to measure", size finder, breeds page, quiz |
| Quantity | Stepper, capped at 4 | Stepper, capped at 20 |
| Add to cart | Dark green "Add to basket"; adds to side-cart drawer | Pink "Add to cart" + wishlist heart; toast confirmation; sticky bar after scroll |
| Express pay | none on the PDP (PayPal/Apple/Google appear only at basket/checkout) | Placeholder Shop Pay / PayPal / Apple Pay / Google Pay row with "goes live on Shopify once payments are enabled" |
| Trust row | Social share icons (Facebook, X, Threads, Pinterest, LinkedIn, WhatsApp, Bluesky, Telegram); SKU; 28 product tags | Four-icon row (free delivery, 30-day returns, sized for cats, secure checkout / UK stock) + payment icons |
| Description | One tab: handmade in Nottinghamshire, buckle/tri-glide/bell/charm, sizes, wash at 30, recycled packaging, **liability disclaimer** ("not responsible for accidental damage including chewing, swallowing, choking, poorly fitted accessories…"), colour disclaimer | Accordions: Product details & dimensions (specs, in the box, size table, fit guide), Delivery & returns (table), Is it right for my cat? (wear-time guidance, quiz link) |
| Reviews | WooCommerce reviews tab: two 5★ reviews (Aug 2022) with names, times and photo slots; "Add a review" form open to anyone (name + email, no purchase check) | Maker-listing block: 4.8 score, distribution bars, star filter chips, 6 cards then "Show all", "Ratings without a comment", one-line source note; no own-review form |
| Cross-sell | "Have you seen these other great gifts" carousel (7 items, mixed cat collars and a dog bandana; rendered empty in our headless screenshot until the carousel initialised); Prev/Next product links | "Cheaper together" bundle cards with the saving, "Goes well with" grid of 4, Cat of the Month block, mini quiz, recently viewed |
| Videos | none | slot only |
| Breadcrumbs | Below the buy box ("Home / Blue Fabric …") | Above the gallery (Home › Everyday › Bow Tie Collar) |
| Stock | Store API `is_in_stock`; "Out of stock" label on cards | "In stock · ready to ship" / "dispatched from UK stock" pill; "Only N left" and Notify button wired in code for `stock`/`soldOut` flags |

### 3.5 Basket and checkout

| Element | Bells & Whiskers | Catwalk Club |
|---|---|---|
| Add-to-cart feedback | Side-cart drawer slides in from the right ("No products in the basket" when empty); mini-cart count in header | Toast + header count; no drawer |
| Basket page | Google-reviews carousel **above** the basket; holiday dispatch notice; table (thumbnail, name, price, qty, subtotal); coupon field + Apply; "Update basket"; totals: Subtotal £2.50, "Postage & Packaging: £2.98 — Shipping options will be updated during checkout", Total £5.48; "Proceed to checkout" | Line rows with qty steppers and Remove; summary: subtotal, delivery (£3.95 or Free), **progress bar to free delivery** ("Spend £x more for free UK delivery"), total, Klarna line ≥£30, Checkout button (demo) |
| Upsells in cart | none | none |
| Express pay in cart | Google Pay `payframe` iframe and PayPal script load on the basket page | none |
| Checkout | WooCommerce classic one-page checkout at `/pet-gifts-bells-whiskers/`: coupon toggle, billing (name, country, address, city, county, postcode, phone, email), "Deliver to a different address?", order table, P&P £2.98, payment radios **PayPal** and **Apple Pay** ("Also includes the option to make secure credit or debit card payments"), privacy line, required terms checkbox; guest checkout allowed; login form on the same page | Not built (Shopify checkout will supply address, shipping, Shop Pay, PayPal, Apple/Google Pay, discount code) |
| Free-shipping threshold | none | £30 |

VERIFIED (`bw/bw-basket-filled.txt`, `bw/bw-checkout.txt`, `cart.html`).

## 4. The three lists

### 4.1 What they do that we don't

| # | Element | Evidence | Why it converts |
|---|---|---|---|
| 1 | **Real, named, dated customer reviews on the homepage and basket** (Google via Trustindex, 68 reviews; Trustpilot 386 at 4.9; 308 on-site) | Homepage, basket page; 03-competitors-uk.md | The single biggest gap. Our maker-listing reviews are honest but foreign and about a different seller's service; theirs say "arrived super quickly", "the only one I've been able to get Ray to wear" |
| 2 | **Company registration number and street address in the footer** | Footer © line, Ltd No. 13221299 | First-store credibility; DMCC/Consumer Contracts Regs expect trader identity anyway |
| 3 | **Photo upload on product reviews** (WooCommerce review images) | `[IMG:]` under each review on the PDP | Photo reviews are the UGC we currently have empty frames for |
| 4 | **Site search in the header** and an **account/login link** | Header on every page | Search is on our shop page only; Shopify gives both for free |
| 5 | **Sort by popularity and by average rating** | Category `<select>` | We have featured/price/name only |
| 6 | **Category landing banner with cats wearing the product** | Fabric Cat Collars banner: four cat close-ups | Our shop page opens on a text h1 |
| 7 | **Side-cart drawer on add** | `.uncode_sidecart` fixed element | Keeps the buyer on the product page and shows the running total; we redirect attention with a toast only |
| 8 | **Coupon field in the basket** | Basket page | Shopify checkout has it; our demo cart does not show one |
| 9 | **Express pay (Google Pay / PayPal) loaded in the basket, Apple Pay at checkout** | Basket iframes, checkout radios | Ours is a placeholder row until Shopify Payments is on |
| 10 | **Quick-view on cards** | 42 `quick-view` matches on the homepage | Lets a browser see sizes without leaving the grid |
| 11 | **Product-care and washing instructions in the FAQ** and a **bespoke/made-to-measure service** | FAQ accordions, "Do you offer a bespoke service? Yes!" | Maker story; we cannot copy the bespoke part but we can copy the care FAQ |
| 12 | **Structured liability and colour disclaimers on every product** | PDP description | Not a conversion lever, but a legal one: we have no "supervise your cat / not for lead use / kittens under 9 months" line on the page beyond the accordion |
| 13 | **Explicit made-to-order and holiday dispatch notices** at basket and checkout | Basket, checkout, delivery page | Honesty about timing; we need the equivalent for stock that is still in transit from China |
| 14 | **Prev / Next product links** and **social share row** on the PDP | PDP footer of buy box | Minor browsing aids |
| 15 | **Google Tag Manager** | Two GTM scripts | We have no analytics; Shopify + GA4/Meta pixel needed for any paid or organic attribution |

### 4.2 What we do that they don't

| # | Element | Evidence in our files | Conversion lever |
|---|---|---|---|
| 1 | Announcement bar with a **genuine dated countdown** (order by 14 Oct, N days left) | `countdownHTML()` in site.js | Urgency that is real |
| 2 | **Free-delivery threshold** (£30) in the bar, trust strip, cart progress bar and delivery accordion | `FREE_SHIPPING_AT`, cart.html | AOV lift; they charge £2.98 on a £2.50 order |
| 3 | **Objection accordions before the price**: fit (with neck-cm size finder), delivery window with dates, quality, "will my cat keep it on" | `objectionCards()`, `wireMiniFinder()` | Answers 07-demand's top three objections on the page |
| 4 | **Dated delivery window** ("arrives Tue 29 Sep – Thu 1 Oct") | `deliveryWindow()` | They give "4–6 business days to make, then 2–3 to ship" only on a policy page |
| 5 | **Six photos per product with cats**, hover-swap on cards, thumbnails, "In stock" pill | `mountGallery()`, `productCard()` | They show two photos of the collar on white |
| 6 | **Stars and review counts on cards** and a review block with distribution, star filter and show-all | `cardRating()`, `syndicatedHTML()` | Their cards carry no rating at all |
| 7 | **Reference price + saving + "until" line** while the offer runs | `priceHTML()`, `savedLine()` | Legitimate only while the deadline is in the future — see finding 5 |
| 8 | **Klarna pay-in-3 line** (≥ £30), 10 payment icons, express-pay row | `instalmentsLine()`, `expressRow()` | They take PayPal/Apple/Google only, no BNPL |
| 9 | **Sticky add-to-cart bar** on scroll | `stickyATC()` | Their button scrolls away |
| 10 | **Bundles with the saving spelled out**, cross-sell to the bundle a product sits in, "Goes well with" | `crossSell()`, `bundleSaving()` | They have collar & lead sets for dogs only |
| 11 | **Quiz, breed size guide, sizes-by-breed link, size chips on the shop page** | quiz.html, breeds.html, shop.html | Filters and finders they lack (their own customer asked) |
| 12 | **Wishlist** with count in the header | `toggleWish()` | none on theirs |
| 13 | **Recently viewed** | `mountRecent()` | none |
| 14 | **First-order 10% pop-up + tab + newsletter form** | `initOffer()` | none — no email capture at all on their site |
| 15 | **"Help me choose" chat panel**, contact page with product pre-fill, track-order page | `initChat()`, contact.html | They have an email address and Contact Form 7 |
| 16 | **Cat of the Month** free-entry photo competition | `DRAW`, photo-draw.html | UGC engine; legal (free entry route) |
| 17 | **Video slots** (home and PDP) | `HOME_VIDEOS`, `.videos` | Empty today; theirs do not exist |
| 18 | **Per-product "This is for you if…", ticks, alias name, care line, what's-in-the-box** | data.js fields | Their description is one block of text |
| 19 | **Product/Offer/Shipping/Return JSON-LD and Organization JSON-LD** | `productJsonLd()`, `orgJsonLd()` | They have `AggregateRating` only |
| 20 | **Speed**: 20–31 requests, ≤ 1.27 MB, no third-party scripts | pw-results.json | Theirs is 97–197 requests, 9–13.5 MB |

### 4.3 What neither does that buyers want (from 07-demand.md)

| # | Buyer want | Evidence (07-demand) | Who is closest |
|---|---|---|---|
| 1 | **Real UK customer reviews of the actual product, with a photo of the cat wearing it** | §2 "Etsy is most likely to have quality"; 6 reviews mention photos | B&W has the review system and 68 Google reviews but its best seller has 2 reviews from 2022; we have none of our own |
| 2 | **A 3–10 second clip of the item going on, the clasp popping, and the cat walking normally** | §3c "Cat won't stay still", "clasp is difficult to open"; §6b objection 2 "show cats walking, sitting and jumping normally" | Neither has any video; we have the slots and the owner can film |
| 3 | **Minimum cat weight / kitten warning and the breakaway trade-off explained** | §2b #16 (kittens under ~9 months may not trigger a breakaway), #17 (jaw caught when too loose), §3c "too big / comes off small cats" is the #1 complaint | Neither. B&W says "quick release buckle" and buries a disclaimer; our fit accordion says "two fingers of slack" |
| 4 | **Bell removable, stated** | §2b #15, #18; supplier review "I removed the bell" | Neither says it. B&W's collars ship with a bell; our bow tie has a bell |
| 5 | **Photos on black and on white cats** (bow "already covered in fur") | §3c | Neither (B&W: product on white; ours: supplier shots, mostly tabby/ginger) |
| 6 | **Colour / pattern / theme filters** | B&W's own Google reviewer (Freya Lister, 06/04/2026) on their homepage | Neither; ours has category and size only |
| 7 | **Birthday product** | §6a trigger #4 (2,024- and 667-upvote threads; Etsy/Amazon autocomplete) | Neither (sourcing.md has a UK-stocked birthday bib + hat at $2.54–3.65) |
| 8 | **Gift note / gift wrap and a stated Christmas last-order date** | §6a trigger #6 (gift for a friend's cat), §6c Christmas is the strongest UK moment | Neither; our countdown is Halloween only |
| 9 | **"For cats" in every title** to beat the human-costume ambiguity | §1 finding 1 | B&W titles say "Cat Collar"; our titles are "Lion Mane", "Devil Bat Cape", "Spider Costume" — no species |
| 10 | **Seasonal colourway rotation of one proven collar** (red for Christmas, orange for Halloween) | §6a trigger #3 | B&W: 35 Christmas and a Halloween collar category. We list one plaid bow tie with colourways unconfirmed |
| 11 | **Honest wear-time copy: "a few minutes for the photo, then off, then treats"** | §6b objection 1; never claim "cats love it" | We have it in the "keep it on" accordion; B&W doesn't need it (collars). Neither puts it on the card or in the title area |
| 12 | **Live human help at the moment of sizing** | §6b objections 3–4 | Neither has live chat; B&W replies by email in 24 h, we have a panel that links to a form |
| 13 | **Matching two-cat / cat-and-small-dog sets** | §6a trigger #5 | Neither, though our bundles and B&W's dog range are one step away |
| 14 | **Rescue / foster tie-in** | §6a trigger #7 | Neither |
| 15 | **Instalments on a single item under £30** | Not in 07 — ESTIMATED from Klarna's usual UK minimum; every product is under £30 so our pay-in-3 line never shows | Neither in practice |

## 5. Prioritised change list for Catwalk Club

Ordered by (legal floor first) then expected conversion impact ÷ build effort. "Lever" names the step in the funnel it moves.

| # | Change | Lever | Build note for the developer |
|---|---|---|---|
| 1 | **End the launch offer today or move the deadline forward.** The ticker reads 00D 00H and product pages still show the struck-through list price and "until Tue, 22 Sept" | Legal floor (DMCC 2024 reference pricing); trust | `data.js`: set `SALE.active=false` and copy each `list` into `price`, or set `SALE.ends` to a real future date and keep the strike-through only until then; theme: Theme settings → Launch offer, clear Compare-at on every variant. Make `mountTicker()` and `priceHTML()` refuse to render when `Date.now() > SALE.ends` so this cannot recur |
| 2 | **Own reviews from day one: install Judge.me (free) with photo/video reviews and the post-purchase email; show the widget on PDP, cards and cart; add a Google Business Profile so a Google-reviews strip is possible later** | Trust → PDP conversion; B&W's whole advantage | Shopify: Judge.me app, enable "review request 14 days after delivery", photo reviews, star badge on collection cards; keep `syndicatedHTML()` as a second, clearly labelled block below own reviews (already coded, `REVIEWS` takes precedence) |
| 3 | **Film and mount the videos the slots are waiting for: 10 s on-body clip per product (clasp pop for the bow tie, mane going on, cat walking in the cape)** | PDP conversion; answers "will my cat keep it on" and the clasp complaint | Drop MP4/WebM into product media on Shopify; static: `p.videos = ["assets/video/x.mp4"]` and `HOME_VIDEOS` entries; `<video muted loop playsinline preload="metadata">` is already the markup |
| 4 | **Cut mobile chrome and page length: make the header a single 56–64 px row (logo, search, cart, burger), let the top bar scroll, remove the LED ticker, collapse the objection accordions to one row of three chips above the price, move Cat of the Month + quiz + recently-viewed below "Goes well with"** | Mobile PDP conversion: add-to-cart from 1,726 px to under 1,300 px; page from 9,000–9,900 px toward 5,000 px | `site.css` `header.site` on ≤ 640 px: one row, hide text nav behind a burger; `product.html` order: gallery → title/rating/price → size → ATC → express → chips → ticks; `.objections` becomes `display:flex` chips that scroll to the accordion content lower down |
| 5 | **Responsive images: generate 400/800 px WebP and add `srcset`/`sizes`; lazy-load everything below the fold** | Speed on mobile (0.9–1.0 MB of images per page today); Core Web Vitals for organic TikTok/Instagram traffic on 4G | Build step in `build.js`: `sharp` to emit `-400.webp`; `productImg()` adds `srcset="…-400.webp 400w, ….webp 800w" sizes="(max-width:640px) 50vw, 300px"`. Shopify: `image_url: width` with `srcset` in the theme |
| 6 | **Put "for cats" in every product title and H1 and add the qualifier to the shop page H1** ("Lion Mane for Cats", "Spider Costume for Cats & Small Dogs") | Search intent match (07-demand finding 1) → click-through from Google, TikTok Shop, Etsy | `data.js` `name` fields; `document.title` and JSON-LD already read `p.name` |
| 7 | **Safety block on every product: breakaway explained with the trade-off, kittens under ~9 months / under 1.5 kg supervised, bell is removable (make it so), not for lead use, supervise wear, wire-cored spider legs** | Trust; return-rate reduction; ASA-safe (no safety *claims*, just guidance) | New `safety` array per product in `data.js` rendered inside "Is it right for my cat?" and as one line under the ticks; theme: metafield `custom.safety` |
| 8 | **Free-delivery threshold everywhere the cart is: side-cart drawer with progress bar on add-to-cart, not just the cart page** | AOV (bundles + a second collar cross the £30 line) | Static: replace `toast()` on add with a `.drawer` that renders the cart summary block; Shopify: theme cart-drawer section with `cart.total_price` vs 3000 |
| 9 | **Company details in the footer once incorporated (or sole-trader name + address), plus real Shipping/Refund/Terms/Privacy pages replacing the four `#` links** | Trust at checkout; legal (Consumer Contracts Regs) | Footer `Legal` list → Shopify policy pages (`/policies/…`); Organization JSON-LD `address` field |
| 10 | **Christmas cut-off and gift note: swap the Halloween countdown to "Order by [last posting date] for Christmas" after 31 Oct, add an optional gift message field in the cart** | Christmas is the strongest UK moment (07 §6c) | `countdownHTML()` already falls through to a Christmas line — give it a `CHRISTMAS.cutoff` date; Shopify cart attribute `Gift message` (textarea) in the cart drawer |
| 11 | **Birthday set and seasonal colourways of the bow tie (Christmas red tartan, Halloween orange)** as new SKUs | New buying triggers #3 and #4; year-round base load | Add products to `data.js`/Shopify; the UK-stocked birthday bib + hat is in sourcing.md (Route A, no stock risk) |
| 12 | **Colour and occasion filters on the shop page** (their reviewer asked; we have the chips already) | Findability once the range grows past ~10 SKUs | Add `colours: []` and `occasions: []` to each product; render as chip rows next to the size chips in `shop.html`; Shopify: tags + Search & Discovery filters |
| 13 | **Sort by rating and by bestselling** | Matches B&W; useful once own reviews exist | `shop.html` sort options `rating` (from `cardRating`) and `best` (manual order field `rank`) |
| 14 | **Make the pay-in-3 line show on single products by switching provider or lowering the minimum only if the provider allows it; otherwise remove the line from the PDP** | Honesty; every product is under the £30 minimum so the line never renders and the Klarna icon in the buy box implies something it does not deliver | `INSTALMENTS.min` follows the provider's real minimum from Settings → Payments; hide the Klarna icon from `PAYMENT_ICONS` until it is switched on |
| 15 | **Header search and account link** | Findability; returning-customer flow | Shopify theme: predictive search section in header, `routes.account_url`; static: search input in `.nav` that forwards to `shop.html?q=` (add `q` param handling to the `paint()` filter) |
| 16 | **Analytics before launch: GA4 + Meta pixel + TikTok pixel via Shopify's Customer Events, UTM discipline on every social post** | Attribution for the organic plan; needed before any ad is funded from sales | Shopify Settings → Customer events; no theme code |
| 17 | **Photograph the bow tie on a black cat and a white cat; state colourways in stock** | Removes "bow hidden in fur" and "which colour will I get" doubts; the `confirm` list in `data.js` still has "Which plaid colourways to stock" open | Owner shoot; add to `images`; add a colour variant once stock is decided |
| 18 | **Honest dispatch notice per product until UK stock lands** ("Dispatched from UK stock" vs "Ships in N days") driven by a real per-product field, not the current default "In stock · ready to ship" | Legal floor (no false delivery promise); return/complaint reduction | `stockPill()` and `objectionCards()` read a `dispatch: { from: "UK", days: [2,4] }` field; Shopify: metafield + the delivery-window snippet |

## 6. What this teardown does not settle

- Their traffic, conversion rate and AOV are not visible; 08-ranking.md's ESTIMATE (170–345 orders/month from 694 reviews over 67 months) stands.
- Trustpilot and Etsy blocked automated reads today (403); the 386-review / 4.9 figure is from the earlier fetch recorded in 03-competitors-uk.md.
- Their related-products carousel and quick-view were not exercised (headless screenshot captured the carousel before it initialised); the presence of both is verified in source.
- Our TTFB and real-device Core Web Vitals cannot be measured until the theme is on Shopify.

Files: screenshots and extracted text in `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/bw/` (`bw-*`, `cc-*`, `pw-results.json`, `*.html.txt`, `bw-basket-filled.txt`, `bw-checkout.txt`).
