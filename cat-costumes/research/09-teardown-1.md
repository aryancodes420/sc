# 09 — Teardown 1: Made By Cleo vs Catwalk Club

Researched 26 September 2026 for Catwalk Club (UK, seven launch products £7.99–£17.99 plus four bundles, goal £100k net profit by September 2027). Made By Cleo (madebycleo.com, Austin TX) is the only cat-first DTC brand at scale found in 04/08 — 1,274 live products, 83 collections, a Judge.me widget claiming 33,247 reviews — so its storefront is the best available picture of what a cat-accessory buyer is already used to. Every figure is tagged **VERIFIED** (fetched today, URL or file given) or **ESTIMATED** (method given). UK spelling. Our side is read from `/home/user/sc/cat-costumes/site/{index,product,shop,cart}.html`, `site/assets/site.js` and `site/assets/data.js`, and rendered in Chromium from a local server — nothing about our store is guessed.

## The six findings that matter

1. **Their store is a catalogue machine; ours is a persuasion machine — and we are already ahead on most conversion elements.** Made By Cleo's product page has no sticky add-to-cart, no express-pay buttons, no trust row, no video of a cat, no size finder, no cross-sell saving, inches-only sizing and a 15-day / 15 %-restocking-fee returns policy. We have all of those (30-day returns "worn or not"). VERIFIED (§3, §4).
2. **Three things they do that we must copy: a removable-bell choice, an "add-on" upsell in the buy box, and matching-print cross-sell.** The bell is the single most-repeated Reddit complaint (07 §2), MBC makes it a free tick-box; their ID-tag tick-box ($12.95+) sits inside the buy box, and "Related Items" shows 13 same-print pieces. Ours has a bell we cannot remove, no add-on, and a four-card "Goes well with". VERIFIED (§3.3, §3.7).
3. **Their reviews are imported from Etsy and say so on every card ("Review written in Etsy"); ours are imported from AliExpress and say "Verified purchase".** Their pattern is the DMCC-compatible one. Ours needs the label changed and the "Verified purchase" pill removed before launch. VERIFIED (§3.6, §8 change 1).
4. **Our launch-offer ticker is already showing zero with crossed-out prices still live.** `SALE.ends` is 22 Sep 2026; today is 26 Sep. A strike-through against a deadline that has passed is exactly the reference-price practice the DMCC Act 2024 targets. Fix today. VERIFIED (`data.js` line `SALE = { active: true, ..., ends: "2026-09-22T23:59:59+01:00" }`).
5. **They are 17× heavier than us.** Their homepage transfers 22.1 MB over 314 requests (15.4 MB of JavaScript, 6.4 MB of it a YouTube embed loaded on every page); ours transfers 1.26 MB over 35 requests. Their `load` event fires at 2.9–4.7 s on a fast connection; ours in 0.15–0.30 s locally. Speed is a lever we keep only if we resist adding their app stack. VERIFIED (§6).
6. **What neither store does is the demand research's shortlist: a reaction video, a minimum-weight warning for kittens and the breakaway, "for cats & small dogs" in *our* titles, cm-and-inch sizing together, and a colourway photographed on a cat.** These are the cheapest remaining wins and the owner can film all of them. VERIFIED against 07 (§5).

---

## 1. What was fetched

| Page | URL | HTTP | HTML size | curl TTFB / total (best of 3) | Rendered in Chromium |
|---|---|---|---|---|---|
| Homepage | https://www.madebycleo.com/ | 200 | 315,545 B | 0.14 s / 0.28 s | yes, desktop 1366 and mobile 390 |
| Best-selling product (a collar; the two items above it in Bestsellers are an ID tag and an AirTag holder) | https://www.madebycleo.com/products/cat-collar-pumpkin-patch-cranberry-burgundy-fall-harvest-cat-collar-breakaway-or-non-breakaway-thanksgiving-cat-small-dog | 200 | 653,857 B | 0.15 s / 0.59 s | yes, both |
| Collection | https://www.madebycleo.com/collections/bestsellers-2026 and /collections/halloween | 200 | 668,948 B | 0.41 s / 0.94 s | yes, both |
| Cart (empty and with one item added via `/cart/add.js`) | https://www.madebycleo.com/cart | 200 | 209,292 B | 0.51 s / 0.74 s | yes, both |
| Checkout (one item in cart) | redirected to https://www.madebycleo.com/checkouts/cn/… | 200 | — | — | yes, mobile; public up to the payment step |
| Catalogue | https://madebycleo.com/products.json?limit=250, /collections.json?limit=250, /collections/{bestsellers-2026,pet-costumes}/products.json | 200 | 6.7 MB / 46 KB | — | — |
| Policies / FAQ | /policies/refund-policy, /pages/faq | 200 | 213 KB / 226 KB | — | — |

All VERIFIED. Nothing failed to render. The Attentive pop-up appears as a full-viewport iframe; its text was read from the rendered frame. Screenshots and dumps are in `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/mbc/` (`shot_*.png`, `ours_*.png`, `*_text.txt`, `pw*.js`).

Their stack (VERIFIED from script hosts and section markup in `home_.html`): Shopify theme **Turbo 3.0.1** (Out of the Sandbox), Judge.me reviews (with Loox and Yotpo scripts still loaded), Klaviyo, Attentive (pop-up + SMS), AppHero announcement bar, PageFly, Elfsight Instagram feed, Afterpay, Google Tag Manager, Meta pixel, Square, Twitter widget, YouTube embed.

Their catalogue (VERIFIED, products.json): 1,274 products in "All Products"; 83 collections; product types in the first 250: Pet Bandana 51, Pet Bow Tie 46, Bunny Ear Bow Collar Set 42, Flower Collar Set 42, Pet Collar 37, Bow Tie Collar Set 32. Prices $6.95–$34.95, median $18.95. Four costumes only (Dracula $20.95, Witch Hat $14.95, Bat Wing $17.95, Santa Hat $14.95), the Halloween ones 25 % off since the 28 Aug 2026 drop. Their Halloween sale is a real compare-at reduction on a dated collection — the lawful pattern (04 §7).

---

## 2. Homepage, top to bottom

| # | Element | Made By Cleo (VERIFIED) | Catwalk Club `index.html` (VERIFIED) | Verdict |
|---|---|---|---|---|
| 1 | Announcement bar | Sticky, 44 px: "25% OFF Halloween Styles 🎃🦇 [Shop the SALE]" (AppHero). Stays fixed on every page, desktop and mobile. | Static `.topbar`: "Free UK delivery over £30 · 🎃 Order by 14 October for Halloween — N days left" (genuine countdown from `HALLOWEEN.cutoff`). Then a second red LED strip "Sale ends in 00D 00H 00M 00S" (expired). | Ours carries two messages plus a dead ticker. Keep the free-delivery + order-by line; remove the LED ticker until a real offer with a future date exists. |
| 2 | Utility bar | Sticky 40 px: social icons, Contact Us, Help/FAQ, Blog, search, currency (USD/CAD/AUD/GBP/EUR/JPY), Login, cart count. | None; header carries Shop, Fit & care, FAQ, Saved, Cart. | Their search box is prominent in two places; we have search only on shop.html. Fine for 11 SKUs. |
| 3 | Header | Centred 130 px logo, then a 7-item nav (Home, Shop ▾ mega-menu, Halloween SALE, Fall Favorites, Bestsellers, New Arrivals, ID Tags & Accessories) and a search field. Header block is 323 px tall before any content. Mega menu: 5 columns (product type, accessories, patterns/themes, seasons/holidays, colour) — ~70 links. | 71 px compact header that compacts further on scroll; 5 links. | We are better: their first screen on mobile is announcement + menu bar (83 px fixed) + logo; ours reaches the hero faster. |
| 4 | Hero | Full-width slideshow: photo of a tabby in a fall collar, "hello fall — Fresh fall prints, cozy classics and a little Halloween mischief…". No CTA button in the slide, no price, no product. | Split hero: kicker "🎃 Halloween 2026 is in", H1 "Costumes your cat will look unfairly good in.", two CTAs (Shop all / Halloween first), lion-mane photo with "Sized for cats" sticker. | Ours has a CTA and a claim; theirs has mood. Their photo is a real cat in their product; ours is a supplier listing image. |
| 5 | Trust strip | None on the homepage. | Three-stat strip: Free UK delivery over £30 · 30-day returns worn or not · 10% off first order WELCOME10. | We win. |
| 6 | Brand statement | "One-Stop Shopping for Stylish, Modern Cats & Their Humans" + 90-word paragraph ("300+ designs… breakaway or non-breakaway… matching bow ties, bandanas, engraved ID tags"). | Two panels lower down: "Getting the size right" and "Why Catwalk Club" (Built for cats / Real photos, real specs / Fast, free delivery). | Comparable. |
| 7 | Categories | 8 image tiles: Halloween SALE, New Arrivals, Fall Favorites, Velvet, Bestsellers, ID Tags & Charms, AirTag Holders, Bunny Ear Bow Sets. | 4 photo circles (Everyday, Halloween, Christmas, Bundles) + "Everything". | Fine. Theirs mixes season, material and product type; ours is season-led, which matches our range. |
| 8 | Featured product grid | **None.** The homepage never shows a product card or a price. | "Everything we make" — all 7 products with rating, blurb, price, wishlist heart and quick-add; then a 4-card bundles grid. | We win: a visitor can buy from our homepage in one tap. |
| 9 | Long-form blocks | 9 image-with-text blocks totalling 6,147 px on desktop (Spooky SALE, Fall collection, Engraved ID tags, Charms, Bandanas 300+, AirTag holders, "Cool + Unique Designs", "Choose the Perfect Collar", Gift cards), each with one button. | Video row (5 phone frames, honest "video coming" placeholders), bundles, "Save more by bundling" box, UGC wall (empty frames), quiz, FAQ accordions, recently viewed, newsletter. | Ours is more useful but also has three visibly empty blocks (videos, UGC wall, winners). Empty frames are honest but they read as "nothing has happened here yet". |
| 10 | Social feed | Elfsight Instagram feed (1.4 MB of script; images did not render in our crawl). | None (UGC wall placeholder + @catwalkclub call-out). | Neither has real UGC showing today. |
| 11 | Reviews block | Judge.me carousel "What Our Customers Are Saying — from 33247 reviews", ~20 cards with name, date, product title, text. Newest card shown is dated 11/22/2021. | None on the homepage (reviews live on the product page). | Their block is stale (2021 dates) but the number does the work. We should not fake one; a "first reviews" block goes live when the first real review does. |
| 12 | FAQ | 6 accordions, all about collars: kitten safety, replacement interval, remove at night, how tight (two-finger rule), "do collars bother cats", bells. Two answers open with "Absolutely!" and make comfort/safety claims that would need substantiation under CAP in the UK. | 4 accordions: sizing, delivery, "Will my cat actually keep it on?", when to order for Halloween. | Ours is more honest and more relevant. Keep. |
| 13 | Newsletter | "Stay In Touch — Sign up… so you don't miss our next SALE or new product announcements!" | "Get first pick of the Halloween drop" (form not wired). | Comparable; ours needs Klaviyo/Shopify Email wiring (LAUNCH-CHECKLIST F). |
| 14 | Footer | "Sitelinks" (Contact, Shipping + FAQs, Returns & Exchanges, Gift Cards, Blog, About, Wholesale, Privacy), "Welcome" block with email, hours (Mon–Fri 9–5 Central), street address, socials, 10 payment icons. Hidden sizing content for the modal. | 4 columns (brand, Shop, Help ×9 links, Legal ×4 placeholders "#"), legal line "Demo storefront — not yet trading", 10 payment icons. | Ours needs real legal pages and the business address (UK distance-selling requirement). Their footer has a physical address and hours — a trust signal we lack. |
| 15 | Pop-up | Attentive full-viewport modal on first product-page view: "UNLOCK 15% OFF YOUR ORDER — Valid for All Regular-Priced Items", email field, CONTINUE. After close, a floating "GET 15% OFF ✕" tab bottom-left on every page. Also Klaviyo loaded. | One-time modal after 7 s on non-product/cart pages: "10% off, and first pick of the Halloween drop", email → shows code WELCOME10; floating "🎁 10% off your first order" tab. | Same pattern. Theirs is 15 %, fires immediately and covers the whole screen on mobile; ours is gentler. Keep ours; test 15 % once margin is known (bow tie at 80 % gross can carry it; the Santa set at 39 % cannot). |
| 16 | Chat | None found (no Inbox/Gorgias/Tidio script; no chat widget rendered on any page). | "💬 Help me choose" floating button → panel with WhatsApp (when set), Send a message, Size guide. | We win. |
| 17 | Sticky elements on mobile | Announcement (43 px) + menu bar (40 px) fixed at top = 83 px of a 844 px viewport permanently used. | Compact header (116 px on mobile at the top, compacts on scroll), offer tab and chat button bottom. | Both fine; ours should not grow. |

Their homepage is 11,184 px tall on desktop (VERIFIED, `document.body.scrollHeight`); ours is 7,400 px. Neither is short, but theirs contains zero products.

---

## 3. Product page, top to bottom

Their page: the Pumpkin Patch – Cranberry cat collar, $18.95, 5.0 ★ from 73 reviews. Ours: `product.html?id=lion-mane` (and the code paths in `site.js` that apply to every product).

| # | Element | Made By Cleo (VERIFIED) | Catwalk Club (VERIFIED from `product.html` + `site.js`) | Verdict |
|---|---|---|---|---|
| 3.1 | Breadcrumbs | Home / Products / full title (uppercase, small). No collection in the trail. | Home / Halloween / Lion Mane + BreadcrumbList JSON-LD. | Ours is better (collection link, structured data). |
| 3.2 | Gallery | Large main image left, then a grid of thumbnails — 10 product images (including a cat wearing the collar, a "this listing is for" graphic, a colour line-up and a collage), 47 `<img>` nodes in the gallery area. Zoom on hover. No video in the gallery. | Main image + 6 thumbnails, swipe on touch, magnify on hover, arrow keys; "📸 Enter Cat of the Month" pill and "In stock" pill over the photo. | Comparable. Their photos are their own, on their own cats, in their own studio; ours are supplier listing images (README flags this). The pills over our photo are a plus. |
| 3.3 | Title | 140-character SEO title: `Cat Collar - "Pumpkin Patch - Cranberry" - Burgundy Fall Harvest Cat Collar / Thanksgiving / Breakaway Buckle or Non-Breakaway / Cat, Kitten + Small Dog Sizes`. Every title carries "Cat, Kitten + Small Dog" and "Breakaway". | "Lion Mane" + alias tag "aka Kingsley". | Theirs is ugly but it is what 07 §1 says search needs: species qualifier, "breakaway", occasion. Ours has none of those words in the H1. Add a subtitle line, not a longer H1. |
| 3.4 | Rating line | Judge.me badge "★★★★★ 73 reviews" linking to the widget. Preview badges are hidden on collection and homepage by CSS. | "★★★★★ 4.6 · 104 reviews" from `SUPPLIER_REVIEWS` (AliExpress listing), else "No reviews yet — be the first". | Same placement. Ours must be labelled as the maker's listing rating at this point too, not just at the bottom of the reviews block. |
| 3.5 | Price / saving | "$18.95" plain. On sale items (Halloween collection) red sale price with grey strike-through and a red "Sale" badge; `compare_at_price` set on 90 of 250 products. Currency selector shows GBP but "Orders will be processed in USD" on the cart. | "£9.99 £11.99 Save 17%" + "You've saved £2.00" + "Launch offer: £9.99 until Tue 22 Sep, then £11.99." | Ours shows an **expired** deadline (22 Sep) today. Their strike-through is against a real prior price with no deadline claim. Fix ours (§8 change 2). |
| 3.6 | Instalments | "Afterpay available for orders up to $4,000 ⓘ" under the price on every product, regardless of basket. | "Pay in 3 interest-free instalments of £X with Klarna (orders over £30)" — only when the amount ≥ £30, so it never shows on a single product page (max £17.99); shows in the cart. | Neither is wrong. Klarna's UK Pay-in-3 minimum applies; leave as is. |
| 3.7 | Options / variant UI | Three dropdowns: Neck Size (Kitten 6–10", Adult Cat 8–13", XL Cat 12–16", Tiny Dog, Mini Dog, Small Dog), Buckle Clasp (Breakaway / Non-Breakaway), Hardware colour (Gold / Silver) = 24 variants. Then two tick-boxes: **"Include bell with collar (free)"** (ticked) and **"Include ID tag with collar ($12.95 & up)"** in a yellow box ("After clicking Add To Cart you will be taken to the ID Tag page to customize it"). | Size buttons S/M/L with the neck cm of the chosen size printed underneath; no colour choice; no add-ons. | **Copy the bell tick-box and the add-on box.** Our bow tie's bell is the #1 Reddit objection (07 §2 #15, #18). Our quick-win add-on is a second collar colour or the bandana (see §8). |
| 3.8 | Size help | Link "Sizing & Hardware Options ›" opens a modal: size table (inches only), string-measuring tip, "in-between sizes: tell us in Special Instructions and our seamstresses adjust", slide-tag note, breakaway vs non-breakaway explanation with illustration ("~11 lbs of tensile force"), embedded YouTube "Tips for Adjusting the Sizing & Fit". | Three expanding objection cards above the title: **Will it fit my cat?** with a neck-cm input that selects the size for you; **When will it arrive?** with a date range and a price table; **Is the quality good?** with material, care and returns; plus **Will my cat keep it on?** with product-specific honest copy. Sizes in cm and inches in the table. Links to Sizes by breed and How to measure. | We win on mechanics (input → size). They win on one thing: a **video** of the fit being adjusted. Ours has a "video-slot" placeholder. |
| 3.9 | Add to cart | Qty stepper + full-width teal "ADD TO CART". No express-pay buttons on the product page (no `shopify-payment-button` rendered). | Qty stepper + "Add to cart" + wishlist heart; express row (Shop Pay, PayPal, Apple Pay, Google Pay — placeholders until Shopify payments are enabled); 4-icon trust row; 10 payment logos; sticky add-to-cart bar once the buy box scrolls off. | We win on every count once the placeholders are live on Shopify. |
| 3.10 | Delivery promise | "▸ Estimated Delivery between Wed, Sep 30 and Thu, Oct 8. Please allow 1–3 business days… EXPEDITED shipping is also available at checkout." | "Order today: arrives Tue 29 Sep – Thu 1 Oct" (2–4 working days) inside the delivery card; "In stock · ready to ship" pill. | Both good. Their window is 4–12 days; ours 2–4. State ours louder — it is the main advantage a UK-stocked shop has over them (04 §5: 8–14 days to the UK). |
| 3.11 | Description | Tabs Overview / Options / Shipping. Overview is 7 bullets, five of which are cross-links (ID tag, matching bow tie, flower corsage, charms & bells, metal buckle upgrade). "Proudly made in the USA." Options tab repeats the sizing modal. Shipping tab: processing 2–4 business days, US 4–7 days, UK 2–3 weeks (avg 18 days), VAT/duties warning. | Blurb + 3 ticks + fit line; "This is for you if…" (3 bullets); accordions: Product details & dimensions (specs, in the box, size table, care), Delivery & returns, Is it right for my cat?. | Ours is more structured; theirs sells accessories from inside the description. Add one cross-link bullet to ours. |
| 3.12 | Trust signals | None in the buy box. Trust is carried by the 73-review badge and "made in the USA". | Trust row (Free UK delivery / 30-day returns / Sized for cats / Secure checkout), payment logos. | We win. |
| 3.13 | Video | One YouTube embed (fit-adjustment tips) inside the sizing modal — and the 6.4 MB YouTube player loads on every page of the site, including the cart. No cat-reaction or try-on video. | "See it on a cat" section, currently a placeholder box saying to film a 10–20 s clip. | Neither shows a cat in the product moving. The owner can film this week. |
| 3.14 | Reviews layout | Judge.me widget: "Customer Reviews ★★★★★ 5.0 (73 reviews)", Diamond Authenticity / Transparency medals, WRITE A REVIEW, search / filter / sort (Most Relevant, Most Recent, Highest, Lowest, Only Pictures, Pictures First, Videos First, Most Helpful), a strip of 10 customer photo thumbnails, then cards: stars, first name, "Verified" pill, date, text, photo, and on every card **"Review written in Etsy"**; some cards say "Review for Pet Bandana – …" (grouped across the print's sibling products). 15 pages. | Score + star bars, star-filter chips, first 6 cards then "Show all", cards with flag avatar, name, **"Verified purchase"** pill, date, country, size, text; "Ratings without a comment" list; one-line source note at the bottom: "Reviews collected from the maker's listing for this product, shared with permission." | Their labelling is the model: source stated on each card, first-party "Verified" only where Judge.me verified the order. Ours says "Verified purchase" on reviews of a different seller's listing. Change the pill to "Maker's listing" and repeat the source line at the top (§8 change 1). Their photo strip is worth copying once we have photos. |
| 3.15 | Cross-sell | "Related Items": 13 cards of the same print (bandana, bow tie, sets, flower sets, teal colourway) with prices; "Recently Viewed Items". | "Cheaper together": the bundles this product sits in, each with "Save £1.99"; "Goes well with" (4 same-category cards); recently viewed; competition block; inline quiz. | Ours states the saving; theirs shows the family. Both are right — add a "Complete the look" row of everyday collars under costumes. |
| 3.16 | Back in stock | "Notify me when this product is available" form (hidden unless sold out; Turbo built-in). | `quickAdd()` renders a "🔔 Notify" button when `soldOut` — wired to a toast only. | Wire ours to Shopify's back-in-stock app before Halloween sizes run out. |
| 3.17 | Scarcity / urgency | None. No stock counts, no timers. | "Only N left" pill when `p.stock ≤ 5` (real stock field), Halloween order-by countdown (real date), LED sale ticker (expired). | Keep only what is true. |
| 3.18 | Structured data | Microdata Offer on the price (`itemprop="price"`), empty `ld+json` script. | Product + Offer (with shipping and return policy) + BreadcrumbList JSON-LD. | We win. |

Their product page is 5,532 px tall on desktop and 6,699 px on mobile; ours is 7,934 / 8,992 px (VERIFIED). Ours is longer because of the quiz, competition and cross-sell blocks. Acceptable, but the mobile order should put reviews before "This is for you if…" (see §8).

---

## 4. Collection, cart and checkout

### 4.1 Collection page (their `/collections/bestsellers-2026` and `/collections/halloween` vs our `shop.html`)

| Element | Made By Cleo (VERIFIED) | Catwalk Club (VERIFIED) |
|---|---|---|
| Layout | Breadcrumb, H1, full-width banner photo, left sidebar that is the whole site menu (5 groups, ~70 links) — not filters — and a 3-column grid, 48 per page, numbered pagination. | H1 + lede, search box, sort select (Featured / Price ↑ / Price ↓ / A–Z), category chips, size chips (S / M / L / One size), "Sizes by breed →", grid. |
| Sort / filter | None on the page (no `sort_by`, no faceted filters). | Sort and two filter rows. We win, and with 11 SKUs the filters are almost decorative — keep them, they signal that sizing is taken seriously. |
| Card | One image (hover swap off — `swap-false`), title truncated to one line, price; on sale: red price, grey strike-through, red "Sale" badge top-right. **No stars** (Judge.me preview badge suppressed on collections by CSS), **no quick add, no wishlist, no colour swatches**, no second image. | Badge (Bestseller / UK stock / Halloween / Save £1.99), photo with second-photo hover swap, title, star line with count, one-line blurb, price with strike-through and "Save N%", wishlist heart, quick-add (one-size straight to basket; sized → "Pick size"). |
| Verdict | Their cards are catalogue thumbnails; ours are mini product pages. Ours will convert better from the grid; the one thing to add is a **colour count** ("4 colours") once colourways exist. |

### 4.2 Cart

| Element | Made By Cleo (VERIFIED, cart with one $18.95 collar) | Catwalk Club `cart.html` (VERIFIED) |
|---|---|---|
| Line item | Image, full title, three variant properties as text, price, qty stepper, remove. | Image, name, size, qty stepper, remove, line total. |
| Summary | Subtotal; "Afterpay available for orders up to $4,000"; "Orders will be processed in USD." | Subtotal, Delivery (£3.95 or Free), **free-delivery progress bar** ("Spend £11.02 more for free UK delivery" / "✅ You've got free UK delivery"), Total, Klarna Pay-in-3 line over £30. |
| Notes / gifting | "Special Instructions" textarea with the example "Do not include bell"; **"🎁 Click here to add gift wrapping!"** button; engraving-info note. | None. |
| Upsells | None. | None. |
| Buttons | CHECKOUT; express: Shop Pay, Amazon Pay, Google Pay; Continue Shopping. | Checkout (demo toast); no express buttons in the cart. |
| Trust / delivery | None. | None beyond the delivery line. |
| Verdict | Ours has the free-shipping bar, theirs has gift wrap and order notes. Add both to ours: a gift note field is free on Shopify, and a bundle-nudge row ("Add the Bow Tie Collar for £8.99 and get free delivery") pulls AOV. |

### 4.3 Checkout (as far as public pages go)

Their checkout (VERIFIED, mobile screenshot `shot_checkout_mobile.png`) is stock Shopify Checkout: order summary collapsed with total; Express checkout row — Shop Pay (full-width purple), PayPal, Amazon Pay, Google Pay, "Show more options"; email with "Email me with news and offers" pre-ticked; delivery form; shipping methods appear after address; payment: Credit card (Visa / MC / Amex +5), Shop Pay "Pay in full or in installments", PayPal, Afterpay; "Save my information" (Shop account); "Add discount" field; "Pay now"; policy links. No trust badges, no upsell, no delivery-date reassurance beyond what Shopify shows.

Ours is not connected yet. On Shopify we get the same checkout; the only choices are the ones in LAUNCH-CHECKLIST B (Shop Pay, Apple Pay, Google Pay, PayPal, Klarna on) plus turning on the marketing tick-box. Nothing to copy beyond that.

---

## 5. Speed and page weight

Method: Chromium 1194 via Playwright, `load` event, then 6 s idle, then a scroll to the bottom to trigger lazy loads; bytes counted from every response body. Their pages ran through the session proxy (adds latency, so their `tLoad` is an upper bound); ours ran against a local `python3 -m http.server`, so our `tLoad` is a lower bound and only the byte and request counts are comparable. All VERIFIED.

| Page | MBC requests | MBC transferred | of which JS | of which images | MBC `load` | Ours requests | Ours transferred | of which JS | of which images | Ours `load` (local) |
|---|---|---|---|---|---|---|---|---|---|---|
| Home, desktop | 314 | 22.1 MB | 15.4 MB | 3.6 MB | 4.65 s | 35 | 1.26 MB | 86 KB | 1.04 MB | 0.30 s |
| Home, mobile | 342 | 20.9 MB | 14.2 MB | 3.7 MB | 4.14 s | 35 | 1.26 MB | 86 KB | 1.04 MB | 0.27 s |
| Product, desktop | 487 | 23.3 MB | 17.3 MB | 2.8 MB | 4.61 s | 35 | 1.41 MB | 114 KB | 1.16 MB | 0.23 s |
| Product, mobile | 528 | 24.2 MB | 18.7 MB | 2.0 MB | 3.87 s | 35 | 1.41 MB | 114 KB | 1.16 MB | 0.26 s |
| Collection, desktop | 518 | 23.1 MB | 17.0 MB | 2.2 MB | 3.13 s | 34 | 1.18 MB | 86 KB | 0.96 MB | 0.15 s |
| Cart, desktop | 363 | 19.9 MB | 17.0 MB | 64 KB | 2.90 s | 20 | 384 KB | 86 KB | 232 KB | 0.07 s |

Where their bytes go (VERIFIED, homepage desktop, top hosts): madebycleo.com 6.7 MB, **youtube.com 6.4 MB** (the fit video embed is loaded on every page, including the cart, where it is inside the hidden sizing modal), googletagmanager.com 2.5 MB, elfsightcdn.com 1.4 MB, cdn.shopify.com 1.1 MB, connect.facebook.net 0.8 MB, squarecdn.com 0.5 MB, platform.twitter.com 0.4 MB. Their HTML alone is 316–669 KB per page because the full mega-menu is repeated four times in the markup (desktop nav, mobile nav, sidebar, footer sizing block).

Our weight is images: the hero `lion-mane-2.webp` is 174 KB and `bow-tie-1.webp` 131 KB at 800 px (VERIFIED `ls -l`). Serving a 480 px variant to phones would cut the homepage to about 0.7 MB (ESTIMATED: the seven first images average 75 KB at 800 px; at 480 px WebP roughly 40 % of that).

The lesson is not "we are faster" — on Shopify we will pick up Shopify's own scripts and the review app — it is that every app we add (Judge.me, Klaviyo, a pop-up app, an Instagram feed, a pixel manager) costs 0.4–6 MB and 30–100 requests, and their store shows what 15 of them look like. Budget: stay under 3 MB and 100 requests on the product page (ESTIMATED target, below the median Shopify store).

---

## 6. Mobile behaviour

| Behaviour | Made By Cleo (VERIFIED, 390×844 iPhone UA) | Catwalk Club (VERIFIED, same viewport) |
|---|---|---|
| Fixed chrome | Announcement 43 px + menu bar 40 px (hamburger, logo, search, cart) fixed at top on every page. | Header 116 px at the top of the page, compacts on scroll; offer tab and chat button fixed bottom. |
| Horizontal scroll | None. | None (`scrollWidth == clientWidth` on all four pages). |
| Pop-up | Attentive modal fills the whole viewport (iframe 390×844) on product-page entry; on other pages a 60 px floating tab. | 10 %-off modal after 7 s on home/shop only; card-sized, dismissable. |
| Product page order | Gallery → title → stars → price → Afterpay → 3 dropdowns → bell tick → ID-tag box → qty → ATC → delivery estimate → tabs → related (13) → recently viewed → reviews (paginated) → newsletter → footer. | Breadcrumbs → gallery with pills → 4 objection cards → title → alias → stars → price/saving → blurb → ticks → fit → size buttons → qty/ATC/heart → express row → trust → logos → "for you if" → video slot → reviews → accordions → cross-sell → competition → quiz → related → recently viewed → footer. Sticky ATC bar appears once the buy box scrolls off. |
| Collection | Sidebar menu collapses; 2-column grid; pagination. | Chips wrap; 2-column grid. |
| Cart | Full-width CHECKOUT then Shop Pay, Amazon Pay, G Pay stacked. | Summary card stacks under lines; Checkout button. |

Our mobile product page puts four objection cards between the photo and the price. That answers questions early, but it pushes the price 1.5 screens down. Test moving the cards to just under the buy box (§8 change 6).

---

## 7. The three lists

### 7.1 What they do that we don't

| # | Element | Evidence | Why it matters for us |
|---|---|---|---|
| 1 | **Removable-bell tick-box in the buy box** ("Include bell with collar (Free)", default on; cart note example "Do not include bell"). | Product page, VERIFIED. | "Take the bell off" is the most repeated collar complaint on Reddit (07 §2 #15, #18) and one supplier review. Our bow tie ships with a bell and no choice. |
| 2 | **Add-on upsell inside the buy box** ("Include ID tag with collar ($12.95 & up)" in a highlighted box). | Product page, VERIFIED. | Raises AOV at the moment of decision. Our AOV lever today is only the bundle card further down. |
| 3 | **Matching-print family cross-sell** (13 "Related Items" of the same print: bandana, bow tie, sets). | Product page, VERIFIED. | Lets one design sell 3–6 SKUs. We have one design per product. |
| 4 | **Species and safety words in every title** ("Cat, Kitten + Small Dog Sizes", "Breakaway Buckle or Non-Breakaway", occasion). | products.json, VERIFIED. | 07 §1: "cat costume" is a human-costume query; Amazon suggests "cat outfits for cats only", "cat bandana collar quick release". Our H1s are "Lion Mane", "Bow Tie Collar". |
| 5 | **Buckle choice with the trade-off explained** (breakaway vs non-breakaway, "~11 lbs of tensile force", "never with a leash"). | Sizing modal, VERIFIED. | We sell one breakaway collar and one standard-buckle bandana without explaining why either. |
| 6 | **Own photography on their own cats for every listing**, plus a customer-photo strip at the top of reviews (10 thumbnails). | Gallery and Judge.me widget, VERIFIED. | Our 42 photos are the supplier's (README). Real photos are the single biggest trust gap. |
| 7 | **Fit video** (YouTube: adjusting the collar) linked from the size modal. | VERIFIED. | We have a video slot and no video. |
| 8 | **Gift wrap and order-notes on the cart** ("Click here to add gift wrapping!", "Special Instructions"). | Cart, VERIFIED. | Christmas is the UK peak (07 §6c); 4 supplier reviews were gifts. We have neither. |
| 9 | **Imported reviews labelled per card** ("Review written in Etsy") and verified pills only on Judge.me-verified orders. | VERIFIED. | This is the DMCC-safe labelling; ours says "Verified purchase" on AliExpress reviews. |
| 10 | **Physical address and opening hours in the footer**, "made in the USA" in copy. | Footer, VERIFIED. | UK distance-selling law needs our trader name and address anyway; it also reads as trust. |
| 11 | **Seasonal navigation** (Halloween SALE, Fall Favorites, Holiday Shop, Birthday, Wedding, Valentine's… 13 season collections; 10 colour collections). | collections.json, VERIFIED (83 collections). | Their catalogue is built around moments and colours — exactly the demand map in 07 §6c. We have three seasons and no colour. |
| 12 | **Multi-currency selector** (USD/CAD/AUD/GBP/EUR/JPY) and a per-country shipping table. | VERIFIED. | Only matters when we open the US/EU; note it for Shopify Markets. |
| 13 | **Back-in-stock form built into the theme.** | VERIFIED. | Ours is a toast. Halloween sizes will sell out unevenly. |
| 14 | **15 % email pop-up, immediate, plus a persistent tab.** | VERIFIED. | Ours is 10 % after 7 s. Test, don't copy blindly — the mobile full-screen version is hostile. |

### 7.2 What we do that they don't

| # | Element (VERIFIED in our code) | Their equivalent |
|---|---|---|
| 1 | Products and prices on the homepage with quick-add. | None — no product on the homepage. |
| 2 | Objection cards answered above the fold: fit (with a neck-cm → size finder that selects the size), arrival date, quality, "will my cat keep it on". | Sizing behind a modal link; delivery line under ATC; nothing on tolerance. |
| 3 | Sizes as neck measurements in **cm and inches**, size notes under the picker, Sizes-by-breed page, quiz (occasion → tolerance → neck). | Inches only; a size table; no breed guide; no quiz. |
| 4 | Express-pay row, trust row and payment logos in the buy box; **sticky add-to-cart** on scroll. | ATC only; no sticky bar. |
| 5 | Free-delivery threshold everywhere: top bar, trust strip, cart **progress bar**. | No free-shipping offer found on any page. |
| 6 | **30-day returns "worn or not"** stated on product, cart and FAQ. | 15 days, new/unused only, 15 % restocking fee, buyer pays postage, bow ties/charms/tags non-refundable (refund policy, VERIFIED). |
| 7 | Bundles with the saving stated (£1.99 each) and a "Cheaper together" block on every component. | Sets exist (bow-tie collar set $30.95 vs $18.95 + $13.95 = $32.90, saving $1.95) but the saving is never stated. |
| 8 | Honest tolerance copy per product ("Put it on, get the shot, take it off"), wear-time guidance, supervise note, wire-leg warning on the spider. | "Absolutely!" FAQ answers making comfort claims. |
| 9 | Real Halloween order-by countdown; stock pill; "Only N left" only from a real stock field. | None. |
| 10 | Chat button (WhatsApp/contact/size guide). | None. |
| 11 | Wishlist with count; recently viewed on home and product. | Recently viewed only. |
| 12 | Cat of the Month competition with a free entry route and an honest empty winners wall; UGC frames. | None (Instagram feed only). |
| 13 | Product + Offer + BreadcrumbList JSON-LD with shipping and return policy. | Microdata price only. |
| 14 | 1.2–1.4 MB pages, 35 requests. | 20–24 MB, 314–528 requests. |

### 7.3 What neither does that buyers want (from 07-demand)

| # | Buyer want (07 evidence) | MBC | Us | Cheapest fix |
|---|---|---|---|---|
| 1 | **The reaction video** — "not impressed / she hates it but it lasts five seconds" clips out-perform "she loves it" 10–100× (07 §5). | No cat video at all. | Empty video slot. | Owner films 7 × 15-second clips on a phone this week; one per product page, five on the homepage row. |
| 2 | **Minimum weight / kitten warning for breakaway collars** — kittens under ~9 months may not trigger the release (07 §2 #16); mane and spider "too big for 1-year-olds" (07 §3c). | Says "safe for kittens — Absolutely!". | Says "size-up if between sizes" (which is the wrong direction for small cats per the reviews). | One line in the fit card: "Under 3 kg or under 9 months? Take the smaller size and supervise." |
| 3 | **Colour in the name and a photo of each colour on a cat** — Amazon suggests bow tie black/blue/red/yellow/orange; a buyer owns four collars for four seasons (07 §1, §6a). | Colour is in the title; photos are flat-lay plus one cat shot per print. | One plaid, no colour choice, supplier photos. | Stock 3 plaid colourways (data.js already lists red/blue/green/pink/white as available), name them, photograph each on a cat. |
| 4 | **Birthday and wedding moments** (07 §6c: 2,024-upvote birthday-hat thread; Etsy "cat bow tie wedding"). | Birthday and Wedding collections exist (140 and 254 items). | Nothing. | Add the UK-stocked birthday set from sourcing.md and a black or white bow tie; two collection chips. |
| 5 | **Honest "depends on the cat" framing with a no-quibble return** (07 §6b #1). | No. | Yes on the product page; not in the pop-up, cart or ads. | Repeat "if your cat says no, 30 days to send it back" in the cart and the welcome email. |
| 6 | **"For cats & small dogs" on collars, bandanas and the spider** (07 §1 dog demand is 10–100× larger; supplier bandana buyers are mostly dog owners). | Yes, in every title. | Only in the specs bullets. | Subtitle line under each H1. |
| 7 | **The clasp demonstrated** — "difficult to open", "is it really a breakaway?" (07 §3c; MBC review "worried the clasp wasn't actually a breakaway"). | A fit-adjustment video, not a release demo. | Text only. | A 5-second clip of the buckle popping under a tug, in the quality card. |
| 8 | **Real UK delivery speed on the card**, not just the product page. | No. | No. | "2–4 working days" line on every card and in the cart. |
| 9 | **Post-purchase photo request that feeds the wall** (07 §6a #7 foster photos; UGC). | Judge.me asks for a review photo. | Competition page, nothing automated. | Judge.me/Loox review request with photo → the review photo strip becomes the UGC wall. |
| 10 | **Gift note and Christmas cut-off date** (07 §6a #6). | Gift wrap, no cut-off. | Neither. | Gift-note field in the cart; last-order date for Christmas in the top bar from 1 December. |

---

## 8. Prioritised change list for our store

Ordered by (legal urgency) then (conversion impact ÷ build effort). Lever key: **CR** conversion rate, **AOV** average order value, **RET** returns/refunds, **TRF** traffic (search), **TRU** trust. Build notes refer to the static site; mirror each in `theme/` per LAUNCH-CHECKLIST C.

| # | Change | Lever | Evidence | Build note (one line) |
|---|---|---|---|---|
| 1 | **Relabel the syndicated reviews.** Replace the "Verified purchase" pill on maker's-listing reviews with "Maker's listing", put the source line above the score, and add "(maker's listing)" to the rating line under the title and on cards. | TRU, legal floor | MBC labels every imported card "Review written in Etsy"; DMCC Act 2024 bans presenting reviews misleadingly. | `site.js` `syndicatedHTML()`/`who()`: change `vtag` text; move `SYNDICATION_NOTE` `<p>` to the top of `.synd-block`; `ratingLine()` and `cardRating()` append `· maker's listing`. |
| 2 | **Kill the expired launch offer today.** Either set `SALE.active=false` and move every `price` to `list`, or set a new real `SALE.ends` and keep the launch prices. Remove the LED ticker until an offer with a future date exists. | legal floor, TRU | `SALE.ends = 2026-09-22`; today 26 Sep; strike-throughs still render. | `data.js` `SALE`; `mountTicker()` should also `return` when `SALE.ends < now`. |
| 3 | **Bell choice.** Add a "Bell: on / off (we remove it before dispatch)" toggle on the Bow Tie Collar and the Festive Pair / Pumpkin Patch / First Costume Kit bundles; carry it as a line property to the cart. | CR, RET | MBC free tick-box; 07 §2 #15/#18; supplier review "I removed the bell". | `data.js` add `bellOption: true` to the four products; `product.html` render a two-button toggle next to size; `addToCart(id, size, qty, props)` stores `props.bell`; cart row prints "Bell: off". Shopify: a line-item property. |
| 4 | **Buy-box add-on.** Under the ATC on every product, one tick-box "Add the Bow Tie Collar (+£8.99)" (on the bow tie itself: "Add the Bandana Collar (+£7.99)"), pre-unticked, with "gets you to free delivery" when the sum ≥ £30. | AOV | MBC "Include ID tag ($12.95 & up)" box; our free-delivery threshold is £30 and no single item reaches it. | `site.js` new `addonBox(p)` after `expressRow()`; on add, call `addToCart(addonId, null, 1)` too; reuse `bundleSaving` copy. |
| 5 | **Species and safety subtitle under every H1.** "Lion mane costume for cats & small dogs · S/M/L by neck"; "Bow tie collar for cats · breakaway buckle · bell optional". Also put these words in `<title>` and the JSON-LD `name`. | TRF, CR | MBC titles; 07 §1 species ambiguity, "quick release" as a search term. | `data.js` add `subtitle` per product; `product.html` render `<p class="subtitle">` after `aliasTag(p)`; `document.title = p.name + " — " + p.subtitle`. |
| 6 | **Mobile buy-box order test.** On phones, move the four objection cards from above the title to directly under the trust row (keep the "fit" card first). | CR | Ours puts the price 1.5 screens down on mobile (§6); MBC reaches price in 1 screen. | `product.html`: render `objectionCards(p)` after `paymentIcons()` inside a `@media (max-width:640px)` reorder using CSS `order` on `.pdp-stack` children, so desktop keeps the current layout. |
| 7 | **Kitten / small-cat line in the fit card and the size finder.** "Under 3 kg or under 9 months? Take the smaller size and supervise — breakaway buckles need a cat's weight to pop." And correct `FIT_GUIDE.between` for the mane: reviews say it runs big. | RET, TRU | 07 §3c (4 of 5 low mane reviews are "too big"), §2 #16. | `data.js` `FIT_GUIDE.kitten`; `objectionCards()` fit card prints it; `sizeFor()` returns the smaller size when a `small` flag is set. |
| 8 | **Film seven 15-second clips and one clasp demo.** One per product ("she tolerated it for the photo"), one of the breakaway buckle releasing under a tug. Fill `HOME_VIDEOS` and each product's `videos`. | CR, TRU, TRF | Neither store has a cat moving in the product; 07 §5 reaction format; MBC's only video is fit tips. | `data.js` `HOME_VIDEOS[]` and `videos: ["assets/video/lion-mane.mp4"]`; the page already renders them; keep each under 2 MB (720p, 15 s, H.264). |
| 9 | **Gift note + Christmas cut-off.** A "Gift note (free)" textarea in the cart summary carried as a cart attribute; from 1 December the top bar says "Order by [date] for Christmas". | AOV, CR | MBC gift wrap + order notes; 07 §6c Christmas is the UK peak; 4 gift reviews. | `cart.html` add `<textarea data-gift>` saved in `localStorage` with the cart; `countdownHTML()` add a `CHRISTMAS = { cutoff }` branch after the Halloween branch. |
| 10 | **Colourways for the bow tie.** Stock three plaids (red, blue, green — the supplier lists them), add a colour picker, name colours in titles, photograph each on a cat. | AOV, TRF, repeat | MBC sells the same print in 5 forms; supplier reviews: "second time I ordered", "red at Christmas, blue for spring, orange for Halloween". | `data.js` `colours: [{label, images}]`; `product.html` colour buttons that swap the gallery; cart line carries colour. Shopify: a second option. |
| 11 | **Delivery speed on every card and in the cart.** "UK 2–4 working days" under the price on cards; "Arrives Tue 29 Sep – Thu 1 Oct" in the cart summary. | CR | Our one structural edge over MBC (18 days to the UK) is only stated on the product page. | `productCard()` append `<span class="ship">`; `cart.html` reuse `deliveryWindow()`. |
| 12 | **Wire back-in-stock.** Replace the toast with an email capture per size; on Shopify use the free back-in-stock app. | CR (recovered) | MBC has it; Halloween sizes sell unevenly (07 §3c: S sells to small cats, M "too big"). | `quickAdd()` and the PDP: `soldOut`/`stock` per size, `<form data-notify>` posting to the email tool. |
| 13 | **Fill the empty frames or hide them.** Until clips and winners exist, collapse the video row and UGC wall to a single line ("First Cat of the Month closes 31 Oct — enter here") instead of six empty placeholders. | TRU | Three visibly empty homepage blocks today; MBC has none. | `videoRow()`/`ugcWall()`: when nothing real exists return one `.panel` line, not frames. |
| 14 | **Business details in the footer.** Trader name, UK address, email, hours (from `CONTACT`). | TRU, legal | MBC footer; UK Consumer Contracts Regulations. | `initChrome()` inject a `.biz` line under `footer .legal` from `CONTACT` + a new `BUSINESS` object in `data.js`. |
| 15 | **Serve smaller hero and card images on phones.** Add 480 px WebP variants and `srcset`. | CR (speed) | Our page weight is 82 % images; 174 KB hero. | `productImg()` add `srcset="${IMG}${file} 800w, ${IMG}sm/${file} 480w" sizes="(max-width:640px) 100vw, 400px"`. |
| 16 | **App budget on Shopify.** Rule: product page under 3 MB and 100 requests; one review app (not three), no Instagram-feed app, no YouTube embed — host clips as product media. | CR (speed) | MBC: 23 MB / 487 requests, 6.4 MB YouTube on the cart. | LAUNCH-CHECKLIST F: strike "Loox or Judge.me" to "Judge.me only"; add a Lighthouse check to H. |

Items 1, 2 and 14 are legal-floor and take under an hour together. Items 3, 4, 5, 7 and 11 are the conversion core and are a day's work in the static site plus a day in Liquid. Items 8 and 10 need the owner (camera, stock order). ESTIMATED effort throughout; no A/B data exists yet — the friend's Giant Paws conversion figures, when they arrive, are the baseline to measure against.

---

## Blocked / not obtainable

| Item | What happened | Used instead |
|---|---|---|
| MBC checkout beyond the payment step | Requires entering an address and paying; not attempted. | Public checkout page (express buttons, payment methods, marketing tick-box) read and screenshotted. |
| MBC GBP prices | Currency selector lists GBP but the storefront served USD to our session and the cart says "Orders will be processed in USD". | USD quoted; £ equivalents in 04-competitors-us.md used its own rate. |
| MBC shipping rates and free-shipping threshold | No free-shipping claim on any fetched page; rates only appear after an address in checkout. | Processing and transit times from the Shipping tab and FAQ. |
| MBC traffic, conversion rate, AOV | Not public. | Review counts as the only volume proxy (08). |
| Their Instagram feed images | Elfsight feed loaded 1.4 MB of script but rendered no images in headless Chromium. | Noted as present; not assessed. |
| Our store's real network timings | Static site served from localhost; Shopify hosting will differ. | Byte and request counts compared; local load times reported as lower bounds only. |
