# 09 — Teardown 2: Hanhanle pet "Bat Wings Cat Costume" (TikTok Shop US) vs Catwalk Club

Researched 26 September 2026 for Catwalk Club (UK Shopify store, seven launch products £7.99–£17.99 plus four bundles, goal £100k net profit by September 2027). Every figure is **VERIFIED** (fetched today, URL or file given) or **ESTIMATED** (method given). UK spelling. Prices on the TikTok side are USD as shown.

Their page: https://shop.tiktok.com/us/pdp/1729402737525035882 (canonical slug `/bat-wing-cat-costume-by-pet-supplies-adjustable-indoor-outdoor-wear/…`). Ours: `/home/user/sc/cat-costumes/site/index.html`, `product.html?id=bat-cape`, `shop.html`, `cart.html`, logic in `site/assets/site.js`, data in `site/assets/data.js` — all read in full, and rendered in Chromium at 1366×900 and 390×844 from a local server. Screenshots and raw dumps: `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/tt2/`.

## The five findings that matter

1. **Our own launch offer has expired on the page and is still showing the reference price.** `SALE.ends` is `2026-09-22T23:59:59+01:00`; today is 26 September. The LED ticker on every page reads `SALE ENDS IN 00D 00H 00M 00S` while the bat cape page shows `£12.99 £15.49 SAVE 16%`, "You've saved £2.50" and "Launch offer: £12.99 until Tue, 22 Sept, then £15.49." A crossed-out price whose stated end date has passed is exactly the "fake reference price / fake urgency" pattern the DMCC Act 2024 targets. Fix before anything else. VERIFIED (`data.js` line `const SALE`, render `tt2/ours-d-pdp.txt`).
2. **They sell on volume proof; we sell on fit help. Neither has real customer reviews of our product type in the UK.** Their buy box carries `4.3★ (503) · 11.7K sold`, 319 written reviews (202 five-star), a photo-review strip and 15 creator videos. Our bat cape page shows "No reviews yet — be the first" (the supplier listing behind it has 0 reviews). Our substitutes — four objection accordions, an inline size finder, breed guide and quiz — are things they do not have at all. VERIFIED.
3. **Their page is heavy and slow; ours is light but unoptimised for mobile.** Their PDP HTML is 196 KB with 1.66 MB of JavaScript, 111–128 requests and 2.35–2.84 MB transferred (plus a 1.7 MB MP4 on mobile); curl TTFB 1.49–3.40 s over three runs. Ours is 9.5 KB of HTML, 24 requests and 1.19 MB, of which 0.94 MB is 38 images served at 800×800 with no `srcset`. On a 390 px phone our header block (top bar + two-row nav + ticker) occupies roughly 430 px before the breadcrumb. VERIFIED (Chromium `performance` entries, curl `-w`).
4. **Their size guide is better than ours on the one thing buyers complain about most: fit.** Their chart gives chest 32–40 cm, neck 24–32 cm, suggested weight ≤ 4 kg, wingspan 43 cm, height 16 cm, "3 mm felt", "two Velcro straps" and "between sizes, take the larger". Our cape gives neck "approx. 29/33/40 cm" and length only — no chest, no weight, and the figures are flagged in `data.js` as read from a small photo. 07-demand ranks "too big / fell off" the number-one product complaint. VERIFIED.
5. **Their homepage, cart and checkout are behind a puzzle captcha for anonymous visitors; their category ("keyword") page and store page render.** Not bypassed. So the cart/checkout comparison below is limited to what the PDP promises ("Buy now" direct-to-checkout, coupon centre, protections row), the mobile sticky bar and the store page. VERIFIED (screenshots `tt2/home-desk-top.png`, `tt2/cart-desk-top.png`).

## Method and what was fetched

| Page type | Theirs | Result | Ours (rendered from `python3 -m http.server`) |
|---|---|---|---|
| Homepage | https://shop.tiktok.com/us | "Security Check" puzzle captcha in curl and Chromium — **blocked, not bypassed** | `index.html` — full render, desktop and mobile |
| Best-selling product | https://shop.tiktok.com/us/pdp/1729402737525035882 | HTTP 200 in curl and Chromium, 53 KB embedded state JSON parsed | `product.html?id=bat-cape` |
| Collection | https://shop.tiktok.com/us/k/cat-costumes (keyword page, the closest public equivalent) and store page https://shop.tiktok.com/us/store/hanhanle-pet/8646932003735245674 | Both render (a captcha overlay appears on the keyword page after load; content behind it captured) | `shop.html` |
| Cart | https://shop.tiktok.com/us/cart | Puzzle captcha — **blocked** | `cart.html` seeded with Devil Bat Cape S + Bow Tie Collar |
| Checkout | https://shop.tiktok.com/us/checkout | HTTP 404 unauthenticated; checkout is app/login only — **blocked** | No checkout (demo storefront, no payment provider) |

Their product data below comes from the page's embedded `loaderData` JSON (`tt2/pdp_state.json`), cross-checked against the rendered text (`tt2/pdp-desk.txt`, `tt2/pdp-mob.txt`).

## 1. Their product, in numbers (all VERIFIED from the PDP JSON unless stated)

| Field | Value |
|---|---|
| Title | "Bat Wings Cat Costume, Adjustable Pet Outfit for Indoor and Outdoor Parties, Halloween or Valentine's Day Dress-Up for Cats and Kittens #GLOBAL PICKS" (149 characters) |
| Price | $13.22, single SKU (Colour "Signal black", Specification "s"), stock 318, purchase limit 200 |
| Shipping | $7.99 "Global standard shipping", free over $45.00, 6–11 days, "Estimated delivery Oct 2 – 7", ships from overseas, "Global shipping by TikTok" |
| Promotion | "Flash sale" label; `discount_rate 0.0756`, countdown ends 1790467199000 = 23:59:59 UTC today — a daily-resetting timer with **no crossed-out price shown** on this product |
| Sold | 11,664 ("11.7K sold"; tooltip: global count since listing, excluding returns). Keyword page shows 6.4K for the same listing |
| Reviews | 4.3★ from 503 ratings; 319 written: 5★ 202 · 4★ 52 · 3★ 38 · 2★ 10 · 1★ 17; 107 pages of 3; all three visible reviews US, verified purchase, with variant "Black, s" and date; one 4★ says "arm straps were really thick and bulky and my cat was pretty uncomfortable" |
| Gallery | 5 images at 1800×1800 + 1 video (19.4 s, three renditions 0.64/1.01/1.67 MB) = "1/6" |
| Description | 1 size-table image (760×300) + 5 bullet paragraphs in 【brackets】 + 5 images (800×800: lifestyle, size & fit, construction call-outs) |
| Size chart | Chest 32–40 cm (12.5–15.7 in), neck 24–32 cm (9.4–12.5 in), weight ≤ 4 kg / 8.8 lb, wingspan 43 cm, height 16 cm, ±2 cm; "3 mm nature felt", adjustable Velcro at neck and chest |
| Specs table | Quantity per pack 1; batteries No; material "Fabric"; power N/A; sensitive goods "Non sensitive" — a generic platform template |
| Seller | Hanhanle pet, 4.4★, 21.3K sold (39.5K global), 19 products, 1,317 shop reviews, **0% 24h response rate, 0% ships within 48 h, 83% positive feedback**, business address Zhejiang, China. Other 18 products are bird feeders, reptile hammocks and a cat teaser toy |
| Creator videos | 16 tiles under "Videos for this product", 15 tagged "Creator earns commission"; counters 22.0K, 8.2K, then 102–726 each (about 33.3K in total across the tiles) |
| Structured data | No JSON-LD in the HTML (grep `ld+json` = 0) |

Sources: page JSON `product_info`, `review_info`, `shop_info`, `promotion_tag`; images `tt2/gal1.png`, `tt2/gal3.png`, `tt2/desc0.png`.

## 2. Speed and weight (VERIFIED)

| Measure | Their PDP, desktop | Their PDP, mobile | Their keyword page | Our PDP, desktop | Our PDP, mobile | Our home, desktop |
|---|---|---|---|---|---|---|
| HTML bytes | 196,000 | 18,690 (mobile shell) | 759,082 | 9,548 | 9,548 | 10,864 |
| curl TTFB (3 runs) | 1.49 s / 2.28 s / 3.40 s | — | — | local only (1–5 ms) | — | — |
| curl total | 1.54 s / 2.40 s / 3.51 s | — | — | — | — | — |
| Chromium TTFB | 2.33 s | 1.47 s | 1.49 s | n/a (local) | n/a | n/a |
| DOMContentLoaded | 3.80 s | 3.49 s | 2.94 s | — | — | — |
| load event | 4.04 s | 3.58 s | 3.33 s | 0.18 s (local) | 0.26 s (local) | 0.16 s (local) |
| Requests | 111 | 128 | 131 | 24 | 22 | 24 |
| Transferred | 2.84 MB | 2.35 MB (+1.72 MB MP4 captured) | 5.29 MB | 1.19 MB | 1.10 MB | 1.26 MB |
| Decoded | 8.30 MB | 7.95 MB | 10.46 MB | 1.19 MB | 1.10 MB | 1.26 MB |
| JavaScript | 1.66 MB | 1.74 MB | 1.67 MB | 117 KB | 117 KB | 88 KB |
| Images | 126 `<img>`; 1.08 MB | 104; 0.53 MB | 62; 3.50 MB | 38; 0.94 MB | 38; 0.85 MB | 43; 1.04 MB |
| Fonts | 485 KB woff | 589 KB | 349 KB | 61 KB (8 local woff2) | 61 KB | 61 KB |
| Page height | inner scroll container (900 px viewport) | 19,362 px at 390 wide | — | 7,024 px | 7,827 px | 7,400 px |

Reading: our network cost cannot be compared like-for-like (they were fetched over the proxy from a US CDN; ours from localhost), but the byte and request counts are: they ship 14× our JavaScript and 5× our request count. Our weakness is images — every card and thumbnail loads an 800×800 WebP with no `srcset`, so a phone downloads the same 0.85 MB a desktop does. ESTIMATED: on a 4G connection (~5 Mbps effective) our PDP is a 2–3 s full load; theirs 5–7 s plus the video.

## 3. Element-by-element walk

Legend: **Y** = present, **–** = absent, **P** = partial/placeholder.

### 3.1 Site chrome (announcement, header, footer, pop-ups, chat)

| Element | Theirs (PDP / keyword page) | Ours (all pages) |
|---|---|---|
| Announcement / ticker | – none. Promotions live in a "Coupon Center" link | **Y** top bar: "Free UK delivery over £30 · 🎃 Order by 14 October for Halloween — 19 days left" (real dates); **plus** the red LED "SALE ENDS IN" ticker, currently at 00:00:00 (see finding 1) |
| Header | Logo; dominant search bar with rotating promo placeholder ("cheap electric scooter for adults 50 mph"); Coupon Center; Get app; Log in; cart icon. Left rail: Orders, Sell, Customer support, More | Logo; Shop, Fit & care, FAQ, Saved (count), Cart (count). No search in header (search only on shop page). On 390 px it wraps to two rows |
| Breadcrumbs | **Y** TikTok Shop › Pet Supplies › Dog & Cat Clothing › Costumes (3-level taxonomy) | **Y** Home › Halloween › Devil Bat Cape, plus BreadcrumbList JSON-LD |
| Login/discount pop-over | **Y** desktop: "Welcome! Ready for Some Savings? Log in to see your exclusive discounts". Mobile: full-screen modal "New customer coupon — 50% off, no min. spend, valid 1 day after claiming — Open app" (app-only, "eligibility may vary") | **Y** "🎁 10% off your first order" tab, one-time modal after 7 s (not on product/cart pages), email form → shows code WELCOME10. Code does not yet exist in Shopify; form not wired |
| Chat | – none on the web page ("24/7 in-app support" claim only) | **Y** "💬 Help me choose" panel → WhatsApp (when number set), contact form, size guide |
| Footer | Shop, Sell, About, Customer support, Legal, Discover; then ~50 "Discover" keyword links (mechanical keyboards, shampoo…) | Four columns (brand, Shop by category, Help ×9, Legal ×4 — **Legal links are `#` placeholders**), copyright "Demo storefront — not yet trading", payment icons row |
| Cookie/consent | – not shown to this session | – none |

### 3.2 Homepage

Theirs is captcha-gated, so this row compares our homepage with their store page and keyword page (the pages a TikTok visitor actually lands on from a video).

| Element | Their store / keyword page | Our `index.html` |
|---|---|---|
| Hero | – none. Store page: name, "21.3K Sold", then a grid | **Y** headline "Costumes your cat will look *unfairly* good in", lion-mane photo, "Sized for cats" sticker, two CTAs (Shop all / Halloween first) |
| Trust strip | Keyword page: "Featured brands · Authenticated products · Verified shops" | **Y** three stats: free UK delivery over £30 · 30-day returns "worn or not" · 10% off first order |
| Categories | Left rail categories (login-gated); breadcrumb taxonomy | **Y** four category circles with real photos (Everyday, Halloween, Christmas, Bundles) + "Everything" |
| Product grid | Cards: image, "Free shipping" badge, brand + verified tick, "Stock Up Deals"/"Flash sale"/"Limited time deal 03:51:17" labels, rating + sold count, price with strike-through and % off, add-to-cart icon | **Y** all 7 products then 4 bundles: badge (Bestseller/Halloween/UK stock/Save £1.99), hover-swap second photo, star rating from the maker's listing (bat cape shows none), blurb, price (with strike while SALE active), wishlist heart, quick add (one-size) or "Pick size" |
| Video | – on store page | **P** "Picture it on your cat" — five phone frames, all "video coming" placeholders (`HOME_VIDEOS = []`) |
| Bundles / AOV | – | **Y** bundles grid + "Save more by bundling" box listing each bundle's saving |
| UGC | – (creator videos live on the PDP) | **P** "Your cats, dressed" — six empty "Your cat here" frames; Cat of the Month CTA |
| Quiz / finder | – | **Y** three-step quiz inline (occasion → tolerance → neck/breed) returning sized cards |
| FAQ | – | **Y** four accordions (size, delivery, keep it on, Halloween cut-off) |
| Recently viewed | – | **Y** (per browser) |
| Email capture | – (app coupon instead) | **P** newsletter block; submit shows "Not wired up yet" toast |

### 3.3 Collection / listing page

| Element | Their keyword page `cat costumes` | Our `shop.html` |
|---|---|---|
| Result count | – (25 cards, "View more") | – none |
| Sort | – | **Y** Featured / price / A–Z |
| Filters | – (login for more) | **Y** category chips, size chips (S/M/L/one size), free-text search |
| Card badges | Free shipping, verified brand, deal labels, % off | Bestseller / Halloween / Christmas / UK stock / Save £1.99 |
| Card social proof | rating + "6.4K sold" | rating + count from maker's listing; no sold count |
| Card price | strike + red % | strike + "SAVE 16%" while SALE active |
| Quick add | cart icon (login) | **Y** one-tap for one-size items; "Pick size" for sized |
| Related searches | **Y** "cats costume, cat costumes halloween, christmas cat costume, cat outfits…" | – |
| Species mix | 25 cards: cat, dog and human costumes mixed; 13 of 24 other cat listings show 0–1 sold | 11 cards, all cat-fitted |

### 3.4 Product page, top to bottom

| Element | Theirs | Ours (`product.html?id=bat-cape`) |
|---|---|---|
| Gallery | 5 photos + video, "GLOBAL PICKS" badge baked into image 1, thumbnails with play icon, mobile swipe "1/6" | 6 supplier photos, thumbnails, swipe/magnify; pills over photo: "📸 Enter Cat of the Month", "In stock". **No video** — the slot lower down says "Lifestyle videos go here" |
| Objection handling | – nothing above the fold beyond title | **Y** four accordions: "Will it fit my cat?" (inline neck-cm → size finder that also selects the size button), "When will it arrive?" (computed dates + table), "Is the quality good?" (material, "every photo is the product you get, on a real cat", care, 30-day return), "Will my cat keep it on?" |
| Title | 149-character keyword string incl. "Cats and Kittens", "Valentine's Day" | "Devil Bat Cape" + alias "AKA VLAD"; no species/occasion qualifier (07-demand: "for cats" must be in the title) |
| Social proof line | "Sold by Hanhanle pet · 4.3★ (503) · 11.7K sold ⓘ" | "☆☆☆☆☆ No reviews yet — be the first" |
| Price | "$13.22" large, then "$7.99 shipping on this order"; "Free shipping on orders over $45.00" in green | "£12.99 £15.49 SAVE 16%" + "You've saved £2.50" + "Launch offer… until Tue, 22 Sept, then £15.49" (**expired**) |
| Instalments | – | **Y** Klarna Pay-in-3 line, but only ≥ £30, so absent on every single product |
| Variants | Colour (1) and Specification (1) button groups; mobile "Select options › Signal black,s" sheet | Size buttons S/M/L with live neck note "S — neck approx. 29cm · Length approx. 30cm" |
| Quantity | stepper | stepper (max 20) |
| Primary CTA | **"Buy now"** (red, primary) then "Add to cart" (secondary); mobile sticky bar from first paint: Add to cart · Buy now | "Add to cart" (primary), wishlist ♡; sticky bar appears only after the buy box scrolls off |
| Express pay | – (platform checkout) | **P** Shop Pay / PayPal / Apple Pay / G Pay buttons that only toast "activates on Shopify"; Shopify will render real ones via `payment_button` |
| Coupons | "Coupon center › Claim your eligible deals — Log in to check your coupons" | – (first-order code via pop-up only) |
| Delivery block | Accordion "Shipping & delivery — Many items qualify for free shipping…"; JSON says "Estimated delivery Oct 2 – 7" | Objection card + accordion table: UK tracked 2–4 working days £3.95, free over £30; JSON-LD `OfferShippingDetails` |
| Returns | "free returns within 30 days of delivery… Please log in to view this item's specific return policy" | "30 days to return it, worn or not" + "Placeholder terms — confirm before trading"; JSON-LD claims `FreeReturn` |
| Trust row | "TikTok Shop protections": Secure payments · Data privacy · Money-back guarantee · Delivery guarantee · 24/7 in-app support · Easy returns and refunds | **Y** four tiles: free delivery · 30-day returns · sized for cats · secure checkout; payment logo row (10 icons) |
| Seller card | "About this shop": avatar, 4.4★, 21.3K sold, 0% response, 0% ships in 48 h, 83% positive, Visit | – (About page in footer) |
| Reviews | Score, 5-bar histogram, "Photos from reviews" strip, sort (Recommended/Most recent), filters (All stars / Includes visuals / Verified purchase), cards with avatar, masked name, country, stars, text, photos, variant, date; 107 pages | Empty state for this product; for the other six, maker's reviews syndicated with score, bars, star-filter chips, flags, "Show all", source note |
| Video section | "Videos for this product": 16 creator tiles, "Creator earns commission" | **P** empty "Lifestyle videos go here" box |
| Description | 5 【bracket】 paragraphs, generic ("Crafted from fabric… ensures a snug fit for different breeds") | blurb + 3 ticks + fit line + "This is for you if…" (3 bullets) |
| Details / specs | Platform table (batteries: No; power: N/A) + size-chart image + construction image | Accordion: "What you get" (5 specs), "In the box" (cape + hood), size table (neck + length), measuring rule, care |
| Size help | Chart with chest, neck, weight, wingspan; "between sizes take the larger" | Neck-only table; size finder; breeds page; "Between sizes? Take the larger" |
| Safety & compliance | Seller name + business address | – (no business details; About page has a "fill before trading" box) |
| Cross-sell | "Shop review" (one review of a cat toy), "Explore more from Hanhanle pet" (bird feeders, reptile hammocks), "You may also like" (women's dresses, hair extensions, $128 Dolls Kill costumes) | **Y** "Cheaper together" — the Halloween Pair with the partner product and "Save £1.99"; "Goes well with" (4 same-category cards); competition block; quiz; recently viewed |
| Q&A | `page_sections` lists a "questions" section but nothing renders anonymously | – (link "Ask us anything about it" → contact) |
| Related searches | **Y** "People also searched for" ×14 incl. "cat bat costume", "bat costume for pets", "cat wing costume" | – |
| Structured data | – | **Y** Product (offers per size, shipping, returns), BreadcrumbList, Organization |

### 3.5 Cart and checkout

| Element | Theirs | Ours |
|---|---|---|
| Cart page | Captcha-gated; PDP promises "Buy now" straight to checkout | Lines with photo, size, qty stepper, remove; Summary: subtotal, delivery £3.95, **free-delivery progress bar** ("Spend £8.02 more"), total, Pay-in-3 line ≥ £30, Checkout (demo) |
| Upsell in cart | unknown | – none (no "add the Spider Costume to make the Halloween Pair", no one-tap add to reach £30) |
| Discount code field | coupon centre (login) | – |
| Gift note / message | unknown | – |
| Express pay in cart | unknown | – |
| Checkout | app/login only | none yet (Shopify Checkout once live) |

### 3.6 Mobile behaviour (390×844)

| Aspect | Theirs | Ours |
|---|---|---|
| First screen | Compact one-row header (back, logo, search, account, cart); full-bleed image; price + title + proof; "Select options" row; sticky Add to cart / Buy now; then the 50%-off "Open app" modal covers it | Top bar (2 lines) + logo row + nav row + LED ticker ≈ 430 px of chrome; breadcrumb; gallery; objection cards. The "10% off" tab and "Help me choose" FAB overlap the "When will it arrive?" card |
| Gallery | swipe, counter "1/6", video in slot 6 | swipe, thumbnails |
| Sticky CTA | from load, two buttons | appears after buy box scrolls out of view, one button + price + size |
| Page length | 19,362 px (cross-sell grids of unrelated goods) | 7,827 px |
| Images | responsive (300/800/1800 renditions requested by breakpoint) | one 800×800 rendition everywhere |

## 4. WHAT THEY DO THAT WE DON'T (VERIFIED, ranked by likely conversion impact)

| # | Element | Their implementation | Why it matters for us |
|---|---|---|---|
| 1 | Sold count + rating in the buy box | "4.3★ (503) · 11.7K sold" with a tooltip defining the count | The single strongest proof on the page. We cannot copy the number; we can build towards a real one (see change 6) |
| 2 | Product video in the gallery | 19 s clip as slot 6, play icon on the thumbnail, autoplay-ready renditions | The owner can film every product on a real cat; our video slots are empty placeholders |
| 3 | Creator UGC videos on the PDP | 16 tiles, 15 commission-tagged, 22K and 8.2K on the top two | Shows the costume on many different cats; our UGC wall is six empty frames |
| 4 | Photo-review strip and review filters | "Photos from reviews", filters Includes visuals / Verified purchase / star, sort | Buyers scan photos first; our syndicated reviews are text only |
| 5 | Chest + weight + wingspan size chart | ≤ 4 kg, chest 32–40 cm, neck 24–32 cm, 43 cm span, ±2 cm; construction call-outs (3 mm felt, two Velcro straps) | 07-demand §3c: "too big" is the top complaint; we give neck and length only, marked "approx." |
| 6 | "Buy now" direct-to-checkout as primary CTA | Red "Buy now" above grey "Add to cart"; mobile sticky pair from first paint | Fewer steps for a £13 impulse buy from a video |
| 7 | Shipping cost and date next to the price | "$7.99 shipping on this order" under the price; "Estimated delivery Oct 2 – 7"; green free-threshold line | Ours is inside an accordion above the price, not beside it |
| 8 | Platform protections row | Secure payments · Money-back guarantee · Delivery guarantee · Easy returns | We have a four-tile trust row; the wording "money-back" and "delivery guarantee" is stronger than "secure checkout" |
| 9 | Seller scorecard | Response rate, ships-within-48 h, positive feedback (theirs are 0%/0%/83% — a weakness we can beat) | A UK seller shipping in 1 day can publish real dispatch stats |
| 10 | "People also searched for" / related searches | 14 internal-link phrases on the PDP; 7 on the keyword page | Cheap SEO for the "for cats" qualifier problem in 07-demand §1 |
| 11 | Keyword-rich title | 149 characters with species, occasion, use | Ours: "Devil Bat Cape" — no "for cats", no "Halloween" |
| 12 | Card-level "sold" and deal labels on listing cards | "6.4K sold", "Free shipping", "Flash sale" | Only the honest parts transfer: free-delivery badge on cards over £30 (bundles) |
| 13 | Header search | Dominant search box (with promotional placeholder) | Our catalogue is 11 items; low priority |
| 14 | Coupon centre / new-customer 50% modal | App-only, login-gated, "eligibility may vary" | Do **not** copy the mechanics; ours (10% by email) is cleaner |
| 15 | Daily-resetting "Flash sale" countdown | Ends 23:59:59 UTC every day; no crossed-out price on this SKU | **Do not copy** — this is the fake-urgency pattern banned under DMCC 2024. Our own zero-ticker is the mirror image of the same fault |

## 5. WHAT WE DO THAT THEY DON'T (VERIFIED from our code and render)

| # | Element | Ours | Value |
|---|---|---|---|
| 1 | Objection accordions above the buy box | Fit (with inline size finder that selects the size), delivery dates, quality/care/returns, "will my cat keep it on" | Answers the four questions 07-demand §6b ranks first; they have nothing |
| 2 | Size finder, breed guide, quiz | `sizeFor()`, `breeds.html` (10 breeds), 3-step quiz on home, PDP and `quiz.html` | Their chart is static; ours computes the size |
| 3 | Bundles with the saving spelled out | Four bundles, "Cheaper together" cross-sell, "Save £1.99", "Save more by bundling" box | Their cross-sell is bird feeders and women's dresses |
| 4 | Free-delivery progress bar in cart | "Spend £8.02 more for free UK delivery" | AOV lever they cannot show anonymously |
| 5 | Honest wear-time copy | "Put it on, get the shot, take it off", "faces, eyes and mouth stay clear", "30 days to return it, worn or not" | Matches the Reddit consensus in 07-demand §2c; their copy claims "without causing any discomfort or stress" |
| 6 | Real Halloween cut-off countdown | "Order by 14 October — 19 days left", disappears after the date | Genuine, date-based urgency (allowed) |
| 7 | Product-specific "what you get / in the box / care" | Five specs, two-piece box list, wash instructions | Their spec table is "Batteries included: No" |
| 8 | Structured data | Product with per-size offers, shipping, returns; BreadcrumbList; Organization | They emit none; ours can win rich results for "devil bat cape for cats" |
| 9 | Wishlist, recently viewed, alias names | `catwalk.wish.v2`, `catwalk.recent.v1`, "AKA VLAD" | Small, but theirs have none of it without login |
| 10 | Chat / "Help me choose" | WhatsApp or contact, size guide | They rely on in-app support |
| 11 | Instalments and payment logos | Klarna Pay-in-3 (≥ £30), 10 payment icons, express row (placeholder) | Their checkout is opaque until login |
| 12 | Cat of the Month competition with free entry | Pills on the photo, block on the PDP, `photo-draw.html` | UGC engine they replace with paid creators |
| 13 | Page weight | 9.5 KB HTML, 117 KB JS, 24 requests | 14× less JavaScript than theirs |
| 14 | Two-piece product | Cape **plus** devil-horn hood; two looks | Theirs is wings only |
| 15 | UK-native promises | £3.95 tracked 2–4 working days, free over £30, 30-day returns, "UK stock" badge on the bandana | Theirs: $7.99, 6–11 days from China |

## 6. WHAT NEITHER DOES THAT BUYERS WANT (from `07-demand.md`)

| # | Buyer want (07-demand reference) | Theirs | Ours | Gap |
|---|---|---|---|---|
| 1 | Show the cat walking, sitting and jumping normally in the costume (§6b #2) | Video shows a cat lying on the floor | No video | Film a 15 s "on, walk, sit, off" clip per product |
| 2 | Minimum weight / size-down guidance and a kitten warning (§2c, §3c) | "≤ 4 kg" only | none | Add "under 3 kg pick S; not for kittens under 9 months unsupervised" |
| 3 | The fastening going on in 10 seconds, with treats (§3c "cat won't stay still") | – | – | A clasp/Velcro demo clip is also the breakaway-collar proof buyers ask for |
| 4 | Honest tolerance ranking: hats hated, capes and collars tolerated (§2c) | – | quiz asks tolerance, but PDP copy does not say it | One line on each PDP: "Capes and collars are tolerated by most cats; hats are for a two-minute photo" |
| 5 | "For cats & small dogs" in the title and species qualifier everywhere (§1b) | "Cats and Kittens"; reviewers mention puppies | none | Rename titles and meta titles |
| 6 | Colour-first variants with a photo per colour (§1b) | single black SKU | bow tie lists "range of plaid colourways" but has no colour picker | Colour variants with their own photo, at least on the bow tie |
| 7 | Q&A on the product (§6b) | section exists, nothing renders | link to contact | Three real Q&As per product |
| 8 | Gift note and gift-ready packaging (§6a #6) | – | – | Gift note field in cart; "arrives by 18 Dec" line in November |
| 9 | A price justification against the £3.61 Amazon mane (§6b #6) | – | – | "Why £12.99" line: UK dispatch, real-cat photos, fit help, 30-day returns |
| 10 | Matching household / two-cat offer (§6a #5) | – | bundles are two different items | "Two of the same, size each" option |
| 11 | Returns clarity: who pays return postage | "free returns" but item policy login-gated | "placeholder terms" while JSON-LD claims `FreeReturn` | Decide and make page, policy and JSON-LD agree |
| 12 | Real reviews of this product in the UK | 319 US reviews | 0 (maker listing has 0) | Post-purchase review flow from order 1 |
| 13 | Removable bell / no bell option on the bow tie (§2b #15, §3c) | n/a | "Plaid bow tie with bell" | Say whether the bell detaches |

## 7. Prioritised change list for OUR store

Each row: the conversion lever it pulls and a one-line build note. P0 = before taking an order; P1 = this week (Halloween window closes ~14–20 Oct); P2 = October; P3 = November onwards.

| Pri | Change | Lever | Build note for the developer |
|---|---|---|---|
| P0 | **End the expired launch offer state.** Either set `SALE.active: false` and move each `price` to `list` (if the rise is genuine) or set a new genuine `ends` date; and make `saleActive()` return false automatically once `SALE.ends` has passed so a zero ticker and a stale strike-through can never render again | Legal (DMCC 2024 reference-price rules), trust | `site.js`: `const saleActive = () => SALE.active === true && new Date(SALE.ends) > new Date();` and make `mountTicker()` remove itself when the clock hits zero; mirror in the Liquid theme; add a launch-checklist item "the 'then £X' price must actually be charged on that date" |
| P0 | Make the delivery promise match fulfilment. `DELIVERY = 2–4 working days` is only true for stock held in the UK; six of seven products are AliExpress-sourced | Trust, refund rate | Confirm UK-held stock before launch; if any line dropships, set `noDeliveryDates: true` on it and show the real window; keep `deliveryWindow()` for UK-held stock |
| P0 | Align returns everywhere: page says "placeholder terms", JSON-LD says `FreeReturn`, home says "30-day returns worn or not" | Trust, legal consistency | Write the refund policy, then set `returnFees` in `productJsonLd()` from one constant in `data.js` (`RETURNS = { days: 30, freePostage: true/false }`) and render the same words on PDP, cart and footer |
| P0 | Wire the email capture and create the `WELCOME10` discount; fill the four legal footer links; remove "Demo storefront — not yet trading" | Retention, legal | Shopify Email/Klaviyo form in `offer-popup` section; Discounts → WELCOME10 once per customer; policy pages generated in Settings → Policies |
| P1 | **Product video in the gallery**, slot 6 with a play thumbnail, autoplay muted on the PDP; a 15 s "on, walk, sit, off" clip per product, plus a 10 s fastening clip for the collars | PDP conversion (their single biggest proof after sold count) | `mountGallery()`: if `p.videos[0]`, append `<button data-i="v"><img poster>▶</button>` and swap `[data-main]` to `<video playsinline muted loop controls>`; Shopify: product media video, same theme code |
| P1 | Size chart upgrade on every sized product: add chest girth and suggested weight (and wingspan/length for the cape), state "measured on our sample ±1 cm", add "under 3 kg take S; not for kittens under 9 months unsupervised" | Return rate, "will it fit" objection (top complaint in 07-demand) | `data.js` `sizes[]` gain `chest` and `weight`; `detailsAccordions()` and `sizing.html` add the columns; `sizeFor()` also checks chest when given; measure the samples on arrival (already in the `confirm` list) |
| P1 | Shipping cost and arrival date beside the price, TikTok-style: "£3.95 delivery · free over £30 · arrives Tue 29 Sep – Thu 1 Oct" | Reduces the surprise at checkout; the objection card is above the fold but above the price | In `product.html` `pdp-head`, after `priceHTML`: `<p class="shipline">` using `DELIVERY` and `deliveryWindow()`; hide dates when `noDeliveryDates` |
| P1 | "Buy now" beside "Add to cart", and a mobile sticky bar visible from first paint | Fewer steps from a TikTok/Instagram tap to checkout | Shopify: `{{ form | payment_button }}` under the ATC (already planned for the express row); static: `stickyATC()` show when `.pdp-buy` is not intersecting (IntersectionObserver) rather than only after it scrolls above; add "Buy now" that calls the same add then `location.href = '/checkout'` on Shopify |
| P1 | Compact mobile header: one row (logo, search icon, saved, cart) with a drawer for Shop / Fit & care / FAQ; top bar on one line; stop the offer tab and chat FAB covering the objection cards | Scroll depth, bounce on the 390 px first screen | `site.css` `@media (max-width: 640px)`: `.nav` one row, `.links` into a `<details>` drawer; `.offer-tab` collapses to the gift icon after the first view; `.chat-fab` icon-only; add `padding-bottom` when `.has-sticky` |
| P1 | Titles and meta titles with the species and occasion: "Devil Bat Cape for Cats — Halloween Costume with Hood"; "Spider Costume for Cats & Small Dogs" | Organic traffic quality (07-demand §1: bare "cat costume" is a human-costume term) | `data.js` add `seoTitle`; `document.title` and JSON-LD `name` use it; keep the short name as the H1 alias |
| P1 | Responsive images: 400 px and 800 px WebP with `srcset`/`sizes`; `fetchpriority="high"` on the first gallery image; lazy-load everything below the fold (already done for i > 0) | Mobile LCP; our 0.85–1.04 MB of images per page is the only heavy thing we ship | Generate `*-400.webp` for the 42 photos; `productImg()` emits `srcset="…-400.webp 400w, ….webp 800w" sizes="(max-width:640px) 45vw, 300px"`; Shopify: `image_url: width` filters |
| P1 | Cart upsell and one-tap top-up: "You're £8.02 from free delivery — add the Bow Tie Collar £8.99"; "Add the Spider Costume and make it the Halloween Pair, save £1.99"; discount-code field; gift-note field | AOV (the free-delivery bar already exists; give it a button) | `cart.html` `render()`: after the progress bar, pick the cheapest one-size product that clears the gap and render `quickAdd(p)`; reuse `crossSell()` bundle logic for lines whose product sits in a bundle; Shopify: cart attributes for the gift note |
| P1 | Trust row wording: "Money-back guarantee — 30 days, worn or not", "Dispatched within 1 working day from the UK", "Secure checkout — Shopify Payments · Klarna" | Matches the protections language buyers see on marketplaces | `trustRow()` copy only; the dispatch promise must be true |
| P2 | Review engine from order one: Judge.me/Loox with photo request at day 10, "Includes photos" filter, photo strip above the list; Cat of the Month stays the free-entry route (no review incentive tied to rating) | Proof — the gap we cannot close any other way | Static site: `reviewsHTML()` add a `.rev-photos` strip from `r.photo` and a "With photos" chip in `wireReviewList()`; Shopify: app widget in `main-product`; keep `REVIEWS = {}` empty until real |
| P2 | Real customer video wall: embed the owner's own TikToks/Reels (and later customers') on home and PDP via oEmbed; later run TikTok Shop affiliate / Shopify Collabs so creators earn commission the way Hanhanle's do | Social proof at scale; also the organic traffic plan | `HOME_VIDEOS[]` accepts `{ tiktok: "https://www.tiktok.com/@…/video/…" }` → `<blockquote class="tiktok-embed">` + embed script loaded once; PDP `p.videos` same |
| P2 | Real dispatch and sales stats when they exist: "Dispatched within 1 day: 98% of orders", "23 sold this week" — only from live data, never seeded | Trust (their scorecard is 0%/0%/83%; a UK shop can beat it) | Shopify Flow writes `sold_7d` and `dispatch_1d_pct` metafields; theme renders only when non-zero; static site: leave out |
| P2 | Q&A block: three real questions per product with answers, "Ask a question" form | Objection handling, long-tail SEO | `data.js` `qa: [{q, a}]`; render after reviews as `<details>`; FAQPage JSON-LD |
| P2 | "People also searched for" on PDPs: 6–8 real phrases from 07-demand §6d linking to collection URLs ("halloween costume for cats", "cat bat costume", "cat bow tie collar red") | SEO for the "for cats" qualifier | `data.js` `related: []` per product; render as chips above the footer; Shopify: metafield list |
| P2 | Colour variants with a photo per colour on the bow tie (and bandana) | Colour is the top collar search modifier (07-demand §1b) | `data.js` `colours: [{ label, image }]`; `product.html` colour buttons swap the main image; Shopify: variant images |
| P2 | Honest tolerance line on each PDP and the "walks normally" clip | The welfare objection (07-demand §6b #2) | Add `tolerance` string per product to `objectionCards()` "keep it on" card |
| P3 | Gift-readiness for Christmas: "Order by 18 December" in the top bar from 1 November, gift note, "sent in a plain box" line | Christmas is the UK peak (07-demand §6c) | `countdownHTML()` Christmas branch already exists; add `CHRISTMAS = { cutoff }` and the cart note |
| P3 | Two-of-the-same offer: "Two cats? Add a second, pick each size, save £1.99" | Matching-household trigger (07-demand §6a #5) | Reuse bundle logic with `contains: [id, id]` and per-line size |

Do **not** copy from their page: the daily-resetting "Flash sale" timer, the login-gated coupon centre, the "50% off — open app" interstitial, or any sold/review number that is not ours.

## 8. Risks noticed on our side while walking the pages (VERIFIED)

| Risk | Where | Note |
|---|---|---|
| Expired reference price and zero countdown | every page; `data.js` SALE | Finding 1 and change P0-1 |
| "Every photo on this page is the product you get, on a real cat" | `objectionCards()` quality card | The photos are the supplier's listing images; the bat cape hero (cat by a fireplace with pumpkins and a hand) should be checked to be a genuine photograph before that sentence stays — ASA/CAP treats a rendered image presented as a photo of the product as misleading |
| 2–4 working day delivery on AliExpress-sourced lines | `DELIVERY` in `data.js` | Change P0-2 |
| `FreeReturn` in JSON-LD vs "placeholder terms" on the page | `productJsonLd()` | Change P0-3 |
| Legal footer links are `#`; newsletter and offer forms are not wired; `WELCOME10` does not exist | all pages | Change P0-4 |
| Full-page screenshots show blank regions | `tt2/ours-*-full.png` | `motion.js` scroll-reveal keeps sections invisible until scrolled; harmless for users, but any screenshot-based QA or thumbnail capture will show gaps — consider `prefers-reduced-motion`-style bypass when `navigator.webdriver` is true |

## Blocked / not obtainable

| Source | What happened | What was used instead |
|---|---|---|
| shop.tiktok.com/us homepage and /us/cart | "Security Check" puzzle captcha in curl and in Chromium (desktop UA); not bypassed | Store page and keyword page (both render) for the listing/collection comparison; PDP JSON for cart/checkout promises |
| /us/checkout | HTTP 404 unauthenticated (login/app only) | PDP "Buy now" and shipping/returns modules |
| Their live TTFB from a UK connection | Fetched through the session proxy; three curl runs 1.49–3.40 s | Reported as measured, labelled |
| Like-for-like load time for our pages | Only a local server exists (no Shopify store live) | Bytes, request counts and image sizes, which transfer to any host |
| Creator video view counts | The counter under each tile is not labelled in the JSON; values recorded as shown (22.0K, 8.2K, …) | Reported as "counters" |

Working files: `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/tt2/` — `pdp.html` (curl), `pdp_state.json` (embedded state), `pdp-desk.txt`/`pdp-mob.txt` (rendered text), `*-top.png`/`*-full.png` (screenshots, theirs and ours), `gal*.png`/`desc*.png` (their gallery and description images), `pw-tt.js`/`pw-ours.js` (Playwright scripts).
