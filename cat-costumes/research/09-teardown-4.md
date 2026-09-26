# 09 — Teardown 4: Supakit vs Catwalk Club

Researched 26 September 2026 for Catwalk Club (UK, seven launch products £7.99–£17.99 plus four bundles, goal £100k net profit by September 2027). Supakit (supakit.co, London/Northampton, Ltd since 2017) is the UK cat-accessory store with the most reviews per SKU found in 03/08 — 13 products, 2,299 Loox reviews, 1,100 of them on one breakaway collar — so its storefront is the best UK picture of what converts a cat owner at a premium price. Every figure is tagged **VERIFIED** (fetched today; URL or file given) or **ESTIMATED** (method given). UK spelling. Our side is read from `/home/user/sc/cat-costumes/site/{index,product,shop,cart}.html`, `site/assets/site.js` and `site/assets/data.js`, and rendered in Chromium from a local server (`python3 -m http.server`) — nothing about our store is guessed.

## The six findings that matter

1. **Supakit sells one collar 1,100 times over by making colour the product.** Their bestseller is a single Shopify product with 18 variants (9 colours × Regular/Kitten), 46 photos (four or five per colour, the collar on a cat in every colour), colour swatches in the buy box, and a collection page that shows one card per colour. Our Bow Tie Collar listing says "available in a range of plaid colourways" in `data.js` but has **no colour variant at all** — the customer cannot choose. The demand research found colour is the #1 way people search for collars (Amazon suggests black, blue, red, yellow, orange for "cat bow tie"). This is the single biggest gap. VERIFIED (§3.1, §4.1; `data.js` line `specs: [... "Available in a range of plaid colourways ..."]`, `sizes: null`).
2. **They size collars by cat weight, not neck — and say why.** "Supakit collars are fully adjustable, so there's no need to measure your cat's neck. Simply choose based on your cat's weight, which determines which strength breakaway buckle they'll need. Regular: over 2.5 kg / 5.5 lb+. Kitten: 1 kg – 2.5 kg." That is the minimum-weight-for-breakaway warning 07-demand asked for, turned into a size choice. We ask for a neck measurement on a collar that adjusts, and say nothing about kittens under ~1.5 kg not triggering a breakaway. VERIFIED (§3.4).
3. **Their product page has exactly four things ours lacks that cost nothing: an annotated hero photo, a video in the gallery, a "Complete the set" carousel with ratings and swatches, and press quotes.** The first image carries handwritten callouts ("Removable bell", "Adjustable, slimline band", "Vet-recommended breakaway buckle"); a Shopify-hosted mp4 sits in the gallery and a YouTube "Supakit Breakaway Cat Collar" video sits in an open-by-default accordion; and three press quotes (Cosmopolitan "Winner: Best Cat Collar", The Spruce Pets, The Wildest) sit above the reviews. VERIFIED (§3.4). The owner can film the video this week; the annotated photo is a 20-minute job.
4. **We are ahead on the buy-box mechanics they don't have** — sticky add-to-cart, express-pay row, delivery-date promise, objection cards, size finder, cross-sell saving, quiz, wishlist, chat button, first-order pop-up, FAQ accordions on the homepage, quick-add on cards, search/sort/size filters on the shop page, breadcrumbs. Supakit has **none** of these on the product page: one "Add to cart" button, no express pay until checkout, no sticky bar, no chat, no pop-up, no urgency, no compare-at price on any of 13 products. VERIFIED (§3.4, §4.2, `products.json`: `compare_at_price` empty on all 69 variants).
5. **They are 5–13× heavier than us and it costs them seconds.** Rendered in Chromium, their homepage transfers 6.69 MB over 171 requests and their product page 15.98 MB over 385 requests (9.4 MB of JavaScript: a 1.6 MB YouTube player, a 947 KB Shopify Forms bundle, ~1.8 MB of checkout preload); `load` fires at 2.3 s / 3.4 s on desktop. Ours: 1.27 MB / 25 requests (home) and 1.27 MB / 35 (product), `load` at 0.29 s / 0.22 s locally. Their raw HTML alone is 355 KB (home) and 722 KB (product) against our 11 KB and 10 KB. VERIFIED (§5).
6. **Our own render shows the same defect the last three teardowns flagged, still live: the LED ticker reads "SALE ENDS IN 00D 00H 00M 00S" on every page while every price is still struck through.** `SALE.ends` is `2026-09-22`; today is the 26th. Supakit shows no reference prices at all. Under the DMCC Act 2024 a crossed-out price against an expired deadline is the pattern the CMA has said it will act on. Fix before anything else in §8. VERIFIED (`data.js`: `SALE = { active: true, ..., ends: "2026-09-22T23:59:59+01:00" }`; render `ours-mobile-product.png`).

---

## 1. What was fetched

| Page | URL | HTTP | HTML bytes | curl TTFB / total | Rendered in Chromium |
|---|---|---|---|---|---|
| Homepage | https://supakit.co/ | 200 | 354,970 | 0.21 s / 0.49 s | yes — desktop 1366×850 and mobile 390×844 |
| Best-selling product (the 1,100-review collar; `bestsellers` collection's first two cards are an ID tag and this collar) | https://supakit.co/products/breakaway-cat-collars | 200 | 721,538 | 0.17 s / 0.45 s | yes, both; plus a second render with the `localization=GB` cookie so prices, threshold and Klarna show in the UK market |
| Product JSON | https://supakit.co/products/breakaway-cat-collars.js | 200 | 55,554 | 0.25 s | — |
| Collection | https://supakit.co/collections/breakaway-cat-collars (also /collections/all, /collections/bestsellers) | 200 | 294,535 | 0.18 s / 0.45 s | yes, both |
| Cart (empty, then with one collar added by clicking Add to cart) | https://supakit.co/cart and `/cart.js` | 200 | 311,110 | 0.16 s / 0.42 s | yes, both; drawer captured on add |
| Checkout (one item) | https://supakit.co/checkout → `/checkouts/cn/…/en-gb` | 200 | — | — | yes; public up to the payment step |
| Catalogue | https://supakit.co/products.json?limit=250, /collections.json | 200 | 136,116 / 5,711 | 0.41 s / 0.28 s | — |
| Policies / support | /policies/refund-policy, /policies/shipping-policy, /blogs/support/shipping, /blogs/support/returns, /pages/reviews | 200 | 240–325 KB | — | — |

All VERIFIED. Nothing failed to render. One caveat that matters for reading the numbers: **the proxy's egress is in the US, so a plain browser session is redirected by Shopify Markets to the `en-us` market ($40.00, "ships from Columbus, OH", free shipping over $115).** Curl (no JS) and the cookie-forced render both return the UK market (£29.50, Northampton, free over £85). UK figures are used throughout; the US ones are noted where they tell us something. Screenshots and dumps: `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/supakit/` (`gb-*.png` UK market, `desktop-*/mobile-*.png` US market, `ours-*.png` our pages, `pw*.js`, `pw.json`, `pwgb.json`, `ours.json`, `*.out` raw HTML, `*.txt` extracted text).

**Their stack (VERIFIED from `Shopify.theme` and script hosts in the HTML):** theme **Streamline 7.0.0** (Archetype) customised as "SUPAKIT – Supawlie v1"; **Loox** reviews (widget `NybiKb6G4r`); **Klarna** on-site messaging app block; **Shopify Forms** (947 KB bundle loaded, but no pop-up rendered in 8 s on home, collection or product on either device); **Microsoft Clarity** session recording; **Consentmo** cookie consent; Shopify Markets with 30 countries and a currency selector in the footer; YouTube embed; two AWS Lambda endpoints (custom pre-order / free-shipping logic). No Klaviyo, no Gorgias/Tidio/Inbox, no Judge.me, no Yotpo, no GTM tag found.

**Their catalogue (VERIFIED, `products.json`):** 13 products, 69 variants. Breakaway Cat Collar £22.50 (Kitten) / £29.50 (Regular), 18 variants, 46 images; harness £60 (24 variants, 38 images); leashes £35; AirTag holder £25; engraved ID tags £13–15; catnip toy kit £25; extra bells £5; gift cards £30–200; a £50 harness-training course and a free 10-day "bootcamp" (lead magnet). `compare_at_price` is null on every variant — the store has no sale mechanics at all. Tags in use: `_label_NEW`, `_non-returnable`, `_disable-instant-atc`, `multivariant`.

---

## 2. Homepage, top to bottom

| # | Element | Supakit (VERIFIED, UK market unless noted) | Catwalk Club `index.html` (VERIFIED) | Verdict |
|---|---|---|---|---|
| 1 | Announcement bar | One dark 32 px bar carrying two rotating messages: "FREE SHIPPING ON ORDERS OVER £85" and "★★★★★ RATED 4.7 / 5 – 2299 REVIEWS" (per-market: $115 in the US). Not sticky. | `.topbar`: "Free UK delivery over £30 · 🎃 Order by 14 October for Halloween — 19 days left" (genuine countdown from `HALLOWEEN.cutoff`), **then** a second full-width red LED strip "SALE ENDS IN 00D 00H 00M 00S • …" repeating eight times. | Their bar is a review-count trust signal; we have no review count to show and should not invent one. Remove the dead LED strip today (§8 #1). Our £30 threshold vs their £85 is the right call for £8–18 items. |
| 2 | Header | 131 px: boxed logo, six-item nav (HOME, COLLARS ▾, HARNESSES ▾, ACCESSORIES ▾, TRAINING ▾, MORE ▾), account, search, cart. Dropdowns hold ~30 links including "Collar Size Chart", "Harness Size Chart", "Reviews", "Giving Back", "Collab With Supakit". Mobile: logo + cart, and a **fixed bottom "☰ MENU" bar (68 px)** that stays on screen on every page. | 71 px (compacts on scroll), five links: Shop, Fit & care, FAQ, Saved, Cart. Mobile: 116 px fixed header with the links wrapped onto a second row. | Their bottom-thumb menu is a good mobile pattern; our 116 px mobile header plus topbar plus LED strip consumes 30 % of a 844 px viewport before content. Trim (§8 #3). |
| 3 | Hero | Full-bleed slideshow, two slides: Bengal cat in a harness in foliage, "Explore in Safety & Style — Discover the Supakit Cat Harness [Shop now]"; slide 2 "Slide on ID Tags". No price, no product card. | Split hero: kicker "🎃 Halloween 2026 is in", H1 "Costumes your cat will look unfairly good in.", lede, two CTAs (Shop all / Halloween first), lion-mane supplier photo with "Sized for cats" sticker. | Ours has a claim and two CTAs; theirs has a mood photo of a real cat in the product. Our hero image is a supplier listing shot — the one thing the owner can change by filming. |
| 4 | Scrolling text strip | Marquee: "Every order donates two shelter cat meals" ×35. | None. | A charity line is a trust and differentiation device we do not have. See §7.3. |
| 5 | Mission block | H1 "Luxury Accessories For Wild-At-Heart Cats" + 40-word mission + four icons: Next-level comfort · Luxury materials · Specially for cats · Built to last. | Three-stat strip: Free UK delivery over £30 · 30-day returns worn or not · 10% off your first order WELCOME10. | Comparable; ours is transactional, theirs is brand. Both fine. |
| 6 | Category blocks | Two image-and-text panels (Breakaway Cat Collars → Shop; The Supakit Cat Harness → Shop). | Four photo circles (Everyday, Halloween, Christmas, Bundles) + "Everything". | Fine both ways. |
| 7 | Press logos | "Recommended by" — six logos (Cosmopolitan, The Spruce Pets, The Wildest and three more; alt text empty). | None. | We have no press. Nothing to copy yet; see §7.3 for the honest substitute (rescue partnership). |
| 8 | Product carousel | "Bestsellers": 17 cards (image, title, price, Loox stars + count "(1,100)"), horizontal scroll with chevrons. No quick-add, no badges, no compare-at. | "Everything we make": seven cards each with badge, image that swaps to the second photo on hover, star rating from the maker's listing, blurb, price with strike-through, wishlist heart, quick-add / Pick size. Then a four-card bundles grid and a "Save more by bundling" box. | We are ahead on card mechanics. Their cards carry a real review count; ours carry AliExpress counts with a "(585)" that a buyer will read as ours — see §8 #2. |
| 9 | Explore More | Seven text chips (Cat Collars, Kitten Collars, Cat Harnesses, Leashes, ID Tags, Harness Training, AirTag Holders). | Not needed at 11 SKUs. | — |
| 10 | Giving back | "Your order makes a difference — With every order, we're proud to donate two nutritious meals to … Blind Cat Rescue [Learn more]" with photo. | None. | See §7.3. |
| 11 | Craft block | "Expertly crafted — Never mass produced. Each Supakit designer cat accessory is handcrafted in our workshop…" [Our story]. | "Why Catwalk Club" panel (Built for cats / Real photos, real specs / Fast, free delivery) and "Getting the size right" panel. | Theirs is a provenance story we cannot tell (ours are AliExpress goods). Ours is honest; keep it. |
| 12 | Blog | Three posts ("How to Keep Cats Cool in Hot Weather", "Best Cat Collars for 2026", "Product Spotlight: The Cork Collection"). | None on the homepage (three drafts exist in `content/blog/`, per LAUNCH-CHECKLIST). | Their blog feeds SEO for "best cat collars"; ours should go live with the three drafts. |
| 13 | Videos / UGC / quiz / FAQ | None of these on the homepage. | Video row (five phone frames, all "video coming"), UGC wall (six empty "Your cat here" frames), winners podium (hidden), three-step quiz, four FAQ accordions, recently viewed. | Ours is richer but shows **three visibly empty blocks**. Until clips and photos exist these read as "nothing has happened here". Hide the empties (§8 #6). |
| 14 | Newsletter | Footer "Join the club — get 10% off your first order, plus early-access to new releases, giveaways and offers" (Shopify Forms). | "Get first pick of the Halloween drop" (form fires a toast: not wired). | Same offer; ours needs wiring (LAUNCH-CHECKLIST F). |
| 15 | Footer | Help (Shipping, Returns, Support), About (Giving Back, Our Story, Collab, Reviews), currency selector (30 countries), five socials (Instagram, Facebook, Pinterest, TikTok, YouTube), policies, © line, **13 payment icons** (Amex, Apple Pay, Bancontact, Diners, Discover, Google Pay, iDEAL/Wero, Klarna, Maestro, Mastercard, Shop Pay, UnionPay, Visa). No postal address. | Brand blurb, Shop ×4, Help ×9, Legal ×4 placeholders (`href="#"`), "Demo storefront — not yet trading", 10 payment icons. | Neither footer shows a UK address (a distance-selling requirement for us; theirs is on the About page). Our legal links are still `#`. |
| 16 | Pop-ups | **None rendered** in 8 s on any page, desktop or mobile, in either market — despite the Shopify Forms bundle being loaded. Only the Consentmo cookie banner (a 280 px card bottom-right on desktop; on mobile it covers the bottom 40 % of the viewport until "Accept"). | One-time modal after 7 s on non-product pages ("10% off, and first pick of the Halloween drop"), plus a persistent "🎁 10% off your first order" tab bottom-left. No cookie banner. | Theirs is quieter. Ours is fine but we have no consent banner — add Shopify's (Settings → Customer privacy) before launch. |
| 17 | Chat | None (no widget, no Inbox/Gorgias script). Support is via "Ask a question" form on the product page and a contact page. | "💬 Help me choose" floating button → panel (WhatsApp when set, Send a message, Size guide). | We win. |
| 18 | Page height | 6,542 px desktop / 6,791 px mobile. | 7,400 px desktop / 9,509 px mobile. | Ours is longer on a phone because of the empty blocks and the quiz. |

---

## 3. Product page, top to bottom (their `/products/breakaway-cat-collars`, UK market, vs our `product.html?id=bow-tie-collar`)

### 3.1 Their product in numbers (VERIFIED, `products.json` and `.js`)

| Fact | Value |
|---|---|
| Title / H1 | "Breakaway Cat Collar" (product) → H1 "Leather Cat Collar - Emerald Green" (variant-aware). `<title>`: "Breakaway Cat Collar \| Award-Winning Collar for Cats – Supakit®" |
| Variants | 18: 9 styles (8 leather colours + Natural vegan cork) × 2 sizes (Regular £29.50, Kitten £22.50) |
| Images | 46, four or five per colour, alt text stuffed with search terms ("Quick Release Kitten Collar - Supakit - Midnight Blue", "Bengal Cat Collar - Supakit - Burgundy"); gallery filters to the selected colour |
| Stock | `inventory_quantity` exposed in the page JSON: 50, 21, 24, 4, 12, 4 … ; low-stock message threshold `data-threshold='2'`; pre-order logic with "Estimated to ship by" and a confirm dialog |
| Reviews | Loox: 1,100 on this product, 4.7; JSON-LD `AggregateRating` present; store-wide 2,299 |
| Compare-at | none |
| Price valid until (JSON-LD) | 2026-10-06 (Shopify default, not a sale) |

### 3.2 Element walk

| # | Element | Supakit (VERIFIED) | Catwalk Club (VERIFIED from `product.html` + `site.js`) | Verdict |
|---|---|---|---|---|
| 1 | Breadcrumbs | None on the product page (collection page has "Home › Collars › Breakaway Cat Collars"). | "Home › Everyday › Bow Tie Collar" + BreadcrumbList JSON-LD. | We win. |
| 2 | Gallery | Desktop: vertical thumbnail rail (4 shown for the current colour) + large square main image; "Zoom image" on each. **First image is an annotated flat-lay**: handwritten callouts "Adjustable, slimline band", "Removable bell", "Vet-recommended breakaway buckle". Images 2–4: the collar on a cat, close-up, a kitten. Mobile: swipeable carousel with dots. A Shopify-hosted mp4 (`cdn.shopify.com/videos/…mp4`) is in the media set. | Main image + six thumbnails, arrow keys, swipe, hover-magnify; two pills over the image ("📸 Enter Cat of the Month", "In stock"). All six images are supplier listing photos; the bow tie's first image is a 12-colour collage with a bare-plastic buckle. No video. | Copy the annotated first image (§8 #4) and put a real cat video in the gallery (§8 #5). |
| 3 | Objection cards | None. Objections are handled lower by the FAQ accordion. | Four expanding cards above the title: Will it fit (with a neck-cm size finder), When will it arrive (dated window, table), Is the quality good, Will my cat keep it on. | We win — but on mobile the H1 sits 1,083 px down the page, below the gallery and the cards. Consider moving the title and price above the cards on mobile. |
| 4 | Title, price, rating | H1, then "£29.50" left and Loox stars "(1,100)" right, linking to the review widget. No strike-through, no "save". | H1, "aka Reginald" alias tag, rating line "★★★★★ 4.8 · 585 reviews" (AliExpress listing reviews), price "£8.99 ~~£10.99~~ Save 18%", "You've saved £2.00", "Launch offer: £8.99 until Tue 22 Sep, then £10.99", pay-in-3 line (hidden under £30). | Their price block is one number. Ours has four lines of offer copy against a date that has passed. See §8 #1. The "585 reviews" line reads as our reviews; see §8 #2. |
| 5 | Variant picker — colour | "Style" row: nine circular swatches (colour-filled), selected one ringed, with the name "Emerald Green / Leather" under the label. Choosing a swatch re-filters the gallery and changes the H1. | **No colour option.** `data.js` says "Available in a range of plaid colourways (red, blue, green, pink, white and more)" in the spec bullets and `sizes: null`. | Biggest gap (§8 #2 in priority terms; listed as #2 below). |
| 6 | Variant picker — size | "Size" dropdown Regular / Kitten with a "Size chart 📏" link opening a modal: "fully adjustable, so there's no need to measure your cat's neck. Simply choose based on your cat's weight" — Regular over 2.5 kg / 5.5 lb+; Kitten 1–2.5 kg / 2.2–5.5 lb; "Once your kitten is heavy enough … switch to the regular collar. This reduces the likelihood of collar losses." Link to exact dimensions and "Need help with sizing? Send a message". | Size buttons where a product has sizes, each with a neck-cm note; no sizes on the bow tie ("Adjustable elastic strap. Fits most adult cats."). Neck-based everywhere; kg never mentioned. | Adopt the weight framing for collars and add the kitten minimum (§8 #7). |
| 7 | Stock | Green dot "In stock and ready to ship"; low-stock and pre-order states exist in the code. | Green "In stock · ready to ship" pill on the image; low-stock variant exists in code (`p.stock <= 5`). | Equal. |
| 8 | USP icons | Four line-icons under the picker: Luxury leather · Breakaway safety buckle · Supreme comfort · No fray. | Three tick bullets under the blurb ("Breakaway buckle releases under pressure", "Elastic strap adjusts…", "Bell and plaid bow — on in seconds") and a four-icon trust row after the button. | Equal in function. |
| 9 | Add to cart | One full-width dark-green "Add to cart" button. **No express-pay buttons, no quantity selector, no sticky bar** (the theme's `.sticky-cart` CSS exists but no element renders on either device). `_disable-instant-atc` tag on some products. Clicking opens a cart drawer. | Quantity stepper + "Add to cart" + wishlist heart; then a four-button express row (Shop Pay, PayPal, Apple Pay, Google Pay) that today only shows a toast "activates on Shopify once payments are enabled"; sticky add-to-cart bar appears once the buy box scrolls off. | We are ahead on mechanics — once the express buttons are real. On Shopify use `{{ form | payment_button }}` so they render only when a wallet is actually available. |
| 10 | Instalments | Klarna on-site messaging block directly under the button: pink Klarna badge, "3 payments at 0% interest with Klarna. Check purchase power. 18+, T&C apply, Credit subject to status." Shown at £29.50. | `instalmentsLine()` renders "Pay in 3 interest-free instalments of £X with Klarna (orders over £30)" only when the amount is ≥ £30 — so on every single product (max £17.99) it is hidden; it shows on the cart at ≥ £30. | Fine. Klarna's own UK minimum is set by Klarna, not us; on Shopify the Klarna OSM app block renders the compliant wording automatically. |
| 11 | Trust box | Two cells: "FREE SHIPPING on orders over £85" · "EASY RETURNS within 30 days", then an accordion "SHIPPING & RETURNS INFO" with a table: Economy untracked 7–9 business days · Tracked Royal Mail 4–5 · Expedited Priority Courier Signed 3–4; "Your order will ship from Northampton, UK"; engraved items +2–3 weeks; "Simple returns up to 30 days after delivery. More info." | Four-icon trust row (Free UK delivery over £30 · 30-day returns worn or not · Sized for cats · Secure checkout) and ten payment icons; the delivery card above gives a dated window "arrives Tue 30 Sep – Thu 2 Oct" and a two-row rate table. | Ours is stronger (dated promise, lower threshold, "worn or not"). Their returns page reveals the catch: customer pays return postage, "free of any traces of pet hair", no exchanges. Say ours out loud on the page (§8 #9). |
| 12 | Description | 45-word intro + five bold benefit bullets: Safety First (vet-recommended quick-release) · Love At First Sniff (natural materials) · A Perfect Fit (fully adjustable) · **Bell or No Bell, It's Up To You (removable bell)** · Next-Level Comfort. Copy makes comfort claims ("your cat won't even know they have a collar on", "helping them fall in love with their collar from day one") that we would not make under CAP. | Blurb + three ticks + "This is for you if…" three bullets + fit line. | Their bell is removable and they sell it as a benefit. Ours is fixed. The bell is the most repeated Reddit complaint (07 §2). §8 #8. |
| 13 | Cross-sell | "Complete the set" carousel inside the buy column: AirTag Holder £25 (42 reviews, nine swatches), Cat ID Tag from £13 (132), Slide-On ID Tag £13 "NEW" (9), Harness £60 (663). Each card has stars and count; no add-to-cart from the card. | "Cheaper together" section: the bundles this product sits in, with the partner's photo, "Add the Bandana Collar as a bundle", bundle price and "Save £1.99". Then "Goes well with" (four cards), the competition block, a quiz and recently viewed. | Both have it. Theirs sits inside the buy column (seen before scrolling); ours is seven screens down. Move one bundle card up beside the button (§8 #10). |
| 14 | Video | Accordion "VIDEO", **open by default**, with a YouTube embed "Supakit Breakaway Cat Collar" (a white cat, close-up). Plus the mp4 in the gallery. | "See it on a cat" section with an honest placeholder: "Lifestyle videos go here — film a 10–20 second clip…". | They have two videos; we have a placeholder. §8 #5. |
| 15 | Accordions | VIDEO · DETAILS AND CARE (care: "wipe clean… remove the collar before applying spot-on flea treatments and leave off for 48 hours"; materials: "Genuine leather, ethically sourced in Europe, tarnish-proof gold hardware"; size guide) · FAQS (six: are they safe; my cat loses collars; bell; what is breakaway; leather vs cork; hairless/long-haired cats) · ASK A QUESTION (name, email, message, hCaptcha). | Three accordions: Product details & dimensions (specs, in the box, size table, materials & care), Delivery & returns, Is it right for my cat. | Their "ask a question" form on the page is worth copying — it is the only support route they offer and it converts hesitation into an email. §8 #11. |
| 16 | Brand / charity / press | "Expertly Crafted" (handcrafted in our workshop) · "Giving Back — every order donates two sanctuary meals at Blind Cat Rescue" · press block: Cosmopolitan "Winner: Best Cat Collar" with a quote, The Spruce Pets "Best Leather Cat Collar", The Wildest "Best Cat Collar". | Competition block ("Your cat could be next month's winner"), quiz. | See §7.3 for the honest equivalents. |
| 17 | Reviews | Loox widget in an iframe: "1,100 Reviews · Write a review"; cards with name, date (dd/mm/yyyy), text, **"Item type: Burgundy / Leather / Regular"**, "+1"/"+2" photo thumbnails, 10 per page, "Show more reviews". Newest review 22/09/2026 — four days old. Reviews are also aggregated on `/pages/reviews` ("Overall rating: 4.7 / 5 from 2299 reviews", each with product name, "Verified", date). | Reviews section: our own `REVIEWS` object is empty; below it `syndicatedHTML()` renders the AliExpress listing reviews with "4.8 ★★★★★ Based on 585 reviews", a star-filter chip row, cards with a country flag avatar, **"Verified purchase" pill**, date, size, text; one-line note "Reviews collected from the maker's listing for this product, shared with permission." | Their pattern shows the variant bought — copy that when real reviews exist. Our "Verified purchase" pill on reviews of a different seller's listing is the DMCC risk flagged in 09-teardown-1 and still present in `site.js` (`syndicatedHTML`, `who = r => … 'Verified purchase'`). §8 #2. |
| 18 | Recommendations | "You may also like" (Shopify recommendations, one card) · "Explore More" chips. | "Goes well with" ×4, recently viewed. | Equal. |
| 19 | Page height | 10,202 px desktop / 10,287 px mobile. | 8,408 px desktop / 9,877 px mobile. | Both long; theirs is long because of 46 thumbnails and press; ours because of the quiz and competition blocks. |

### 3.3 What a first-time buyer sees on a phone (390 × 844, VERIFIED from `gb-mobile-pdp-full.png` and `ours-mobile-product.png`)

| Scroll position | Supakit | Catwalk Club |
|---|---|---|
| 0–844 px | Announcement (32 px) · full-width annotated collar photo · carousel dots · H1 — and the cookie banner covering the bottom 40 % until tapped | Topbar (2 lines, 48 px) · header (116 px) · LED strip (32 px) · breadcrumbs · gallery with two pills · thumbnails · first objection card — with the offer tab and chat button overlapping the second card |
| 844–1,700 px | Price · stars (1,100) · nine swatches · size dropdown + size chart · "In stock" · four icons · **Add to cart** · Klarna · trust box | Remaining objection cards · H1 · alias · rating · price/offer block · blurb · ticks · fit line |
| 1,700–2,600 px | Description bullets · Complete the set carousel | Quantity + **Add to cart** + heart · express row · trust row · payment icons · "This is for you if…" |
| Bottom bar | Fixed "☰ MENU" (68 px) | Sticky add-to-cart bar appears once the buy box scrolls off; offer tab and chat button fixed |

Their add-to-cart is reached after roughly 1.5 screens; ours after roughly 2.5 screens (the H1 is 1,083 px down on mobile, VERIFIED `ours.json`). Neither page has horizontal scroll. Ours has three fixed elements at the bottom (sticky ATC, offer tab, chat) that can stack on a small phone.

---

## 4. Collection, cart and checkout

### 4.1 Collection page (their `/collections/breakaway-cat-collars` vs our `shop.html`)

| Element | Supakit (VERIFIED) | Catwalk Club (VERIFIED) |
|---|---|---|
| Header | Breadcrumb "› COLLARS › Breakaway Cat Collars", H1, 55-word description ("Award-winning breakaway cat collars … vet-recommended quick-release safety buckle"). | H1 "Everything we make" + one line. |
| Sub-navigation | Three child chips: Kitten Collars · Leather Cat Collars · Luxury Cat Collars (each a collection of the same product). | Five category chips (Everything, Everyday, Halloween, Christmas, Bundles) + "Fits" chips (Any, S, M, L, One size) + "Sizes by breed" link. |
| Search / sort / filter | **None** — no search box, no sort, no filters. | Search-as-you-type, sort (featured / price / A–Z), category and size filters. |
| Cards | Nine cards, **one per colour of the same product** (`?variant=` links), square image, title "Leather Cat Collar - Emerald Green", price, Loox stars + "(1,100)". No badge, no second image, no quick-add, no compare-at. Two columns on mobile, three on desktop. | Seven or eleven cards: badge (Bestseller / UK stock / Halloween / Save £1.99), image with hover-swap, rating, blurb, price with strike-through, wishlist heart, quick-add or "Pick size". |
| Below the grid | "Explore More" chips · SEO block "What is a Breakaway Cat Collar?" (110 words, links to ID tags) · charity image "Every order donates two meals". | Nothing. |
| Verdict | Their one-card-per-colour trick multiplies a 13-product store into a 30-card storefront and lets colour search land on the right image. Ours is mechanically richer. Adopt one-card-per-colourway for the bow tie once colours exist (§8 #2). Add a 60-word SEO paragraph per category (§8 #12). |

### 4.2 Cart

| Element | Supakit (VERIFIED, UK market) | Catwalk Club (VERIFIED, `cart.html`) |
|---|---|---|
| On add | Slide-in drawer: **free-shipping progress bar** "You're £55.50 away from free shipping!" (turns to "Free shipping unlocked!"), line with image, style, size, quantity stepper, price; Subtotal; "Shipping, taxes, and discount codes calculated at checkout."; black "Check out". No upsell, no express pay, no notes. | Toast "1 × Bow Tie Collar added", fly-to-cart animation, header count bump; no drawer. |
| `/cart` page | Table (Product / Quantity / Total), same progress line, "Check out", "Continue shopping", then "Popular picks" — a 17-card carousel with stars and counts. No express-pay buttons, no discount field, no gift note. | Lines with image, size, remove, stepper, line total; sticky summary panel: Subtotal, Delivery £3.95 or Free, progress bar "Spend £21.01 more for free UK delivery", Total, pay-in-3 line when ≥ £30, "Checkout" (toast: no payment provider). No upsell on the cart page. |
| Empty state | "Your cart is currently empty. Continue shopping" + Popular picks. | "🐈 Nothing in here yet — Your cat is, for now, undressed and content. [Start shopping]". |
| Verdict | Both have the progress bar. Neither has express pay in the cart. Their "Popular picks" under the cart is the cheapest upsell there is; ours has none — add the bundle that completes what's in the cart (§8 #10). Our summary: "Spend £21.01 more" against a £30 threshold on an £8.99 line is a strong nudge to the bundle. |

### 4.3 Checkout (as far as public pages go, VERIFIED `gb-desktop-checkout.png`, `pwgb.json`)

Shopify one-page checkout at `supakit.co/checkouts/cn/…/en-gb`. Top: **Express checkout — Shop Pay and Google Pay** (Apple Pay would appear in Safari), "OR". Contact: email, "Email me with news and offers" **pre-ticked**. Delivery: country (30 options, UK first), name, address, city, postcode, phone. Shipping method: "Enter your shipping address to view available shipping methods" (rates hidden until address — so the £3.99 economy rate a reviewer mentions is not visible up front). Payment: Credit card (Visa, Mastercard, Amex "+5"), **Klarna** as a payment option, "Use shipping address as billing address", discount code field, "Save my information" (Shop account), "Review order". Order summary: line, "Total GBP £29.50 — Including £4.92 in taxes" (VAT-registered). Footer: Refund policy, Privacy, Terms, Contact.

Everything here is Shopify default. What we should match: marketing opt-in on, Klarna and Shop Pay enabled, and — one better — show the shipping rate before the address (Shopify allows a "shipping rates" note on the cart page; our cart already prints £3.95 / Free).

---

## 5. Speed and page weight (VERIFIED)

### 5.1 Server response (curl, browser User-Agent, proxy egress US → UK-hosted Shopify CDN)

| Page | Supakit HTML bytes | Supakit TTFB / total | Catwalk Club HTML bytes | Catwalk Club (local) |
|---|---|---|---|---|
| Home | 354,970 | 0.21 s / 0.49 s | 10,864 | — |
| Product | 721,538 | 0.17 s / 0.45 s | 9,548 | — |
| Collection | 294,535 | 0.18 s / 0.45 s | 6,773 | — |
| Cart | 311,110 | 0.16 s / 0.42 s | 5,917 | — |

Shopify's CDN is fast on TTFB; their HTML is 30–70× ours because the theme inlines the entire mega-menu, all 46 gallery images' markup twice (thumbnail rail and main), the full variant JSON, and the cart drawer on every page.

### 5.2 Fully rendered (Chromium, all resources, 8 s settle)

| Page (device) | Requests | Transferred | of which JS | Images | `load` event | Hosts |
|---|---|---|---|---|---|---|
| Supakit home (desktop) | 171 | 6.69 MB | 5.49 MB | 0.45 MB | 2.26 s | 15 |
| Supakit home (mobile) | 173 | 6.69 MB | 5.62 MB | 0.34 MB | 1.78 s | 15 |
| Supakit product (desktop) | 385 | 15.98 MB | 9.67 MB | 3.61 MB | 3.38 s | 25 |
| Supakit product (mobile) | — | — | — | — | 2.44 s | — |
| Catwalk Club home (desktop, local) | 25 | 1.27 MB | 0.09 MB | 1.04 MB | 0.29 s | 1 |
| Catwalk Club home (mobile, local) | 22 | 1.14 MB | 0.09 MB | 0.91 MB | 0.23 s | 1 |
| Catwalk Club product (desktop, local) | 35 | 1.27 MB | 0.12 MB | 1.06 MB | 0.22 s | 1 |
| Catwalk Club shop (desktop, local) | 22 | 1.12 MB | 0.09 MB | 0.96 MB | 0.09 s | 1 |
| Catwalk Club cart (desktop, local) | 36 | 0.49 MB | 0.18 MB | 0.13 MB | 0.06 s | 1 |

Their ten heaviest product-page resources: YouTube player 1.63 MB + 0.93 MB + 0.54 MB CSS; Shopify Forms 0.95 MB; checkout-web preload 0.83 + 0.47 + 0.30 MB; the page HTML 0.72 MB; Loox carousel 0.29 MB; Shopify web-pixel manager 0.28 MB. The YouTube embed alone is ~3.1 MB on every product view — the same mistake Made By Cleo makes (09-teardown-1 §5). Our comparable load times are local (no network), so they are a floor not a forecast — ESTIMATED: on Shopify's CDN with the same theme weight, expect our pages to land at 1.5–2.5 MB and `load` under 1.5 s, provided we do not add a YouTube embed, a session recorder and a 1 MB forms bundle.

Our own weight is 82 % images: the lion-mane hero is 174 KB and the bow-tie card image 131 KB at 800 px. Serving 400 px card images would take the home page under 0.7 MB (ESTIMATED from file sizes in `site/assets/img/`).

---

## 6. Mobile behaviour (390 × 844, VERIFIED from renders)

| Behaviour | Supakit | Catwalk Club |
|---|---|---|
| Fixed chrome | Bottom "☰ MENU" bar 68 px on every page; announcement bar scrolls away; header not sticky. | Header 116 px sticky (two rows) + topbar 48 px + LED strip 32 px at the top; offer tab (32 px) and chat button (35 px) fixed bottom; sticky ATC bar on product pages. |
| First screen, product | Annotated product photo fills it; H1 just visible; cookie banner over the lower 40 %. | Breadcrumbs, gallery with two pills, thumbnails, first objection card. Price and title not yet visible. |
| Gallery | Swipe carousel with dots; thumbnails hidden. | Main image + six-thumb strip, swipe works. |
| Variant picking | Swatches wrap to two rows; size is a native dropdown. | Size buttons (none on bow tie). |
| Cart | Full-height drawer; progress bar at the top; single "Check out". | Separate cart page; summary panel stacks under the lines. |
| Horizontal scroll | None. | None. |
| Page height, product | 10,287 px. | 9,877 px. |
| Cookie consent | Consentmo card, two buttons, blocks the buy box until dismissed. | None. |

Take-aways: our top chrome is 196 px before content on a phone (23 % of the viewport) and needs to lose the LED strip and one header row; their bottom thumb-menu is worth borrowing if the nav grows. Our three fixed bottom elements (sticky ATC, offer tab, chat) collide on product pages — the offer tab should hide there.

---

## 7. The three lists

### 7.1 What they do that we don't (VERIFIED, ranked by likely conversion impact for our range)

| # | Supakit does | Evidence | Why it matters to us |
|---|---|---|---|
| 1 | Colour as a variant with swatches, per-colour photos and one collection card per colour | 18 variants, 46 images, `?variant=` cards | Colour is how collar buyers search (07 §1). Our bow tie has no colour choice at all. |
| 2 | Annotated first photo with the three buying facts written on it | "Removable bell / Adjustable slimline band / Vet-recommended breakaway buckle" | Answers the fit and safety objections before the scroll; no code. |
| 3 | Video in the gallery and a second video accordion | mp4 in media, YouTube embed open by default | 07 §5: video is the format that travels; ours is a placeholder. |
| 4 | Size by cat weight with the kitten minimum | Regular >2.5 kg, Kitten 1–2.5 kg, in kg and lb | Removes measuring for collars; states the breakaway minimum (07 §2 #16). |
| 5 | Removable bell sold as a benefit | "Bell or No Bell, It's Up To You"; £5 spare bells SKU | Most-repeated Reddit complaint; also a £5 add-on. |
| 6 | Review count in the announcement bar, stars on every card, variant shown on each review, photo reviews | "Rated 4.7/5 – 2299 reviews"; "Item type: …"; "+1/+2" | The moat. We cannot fake it; we can set up the collection flow from order one. |
| 7 | "Complete the set" carousel inside the buy column | AirTag holder, ID tag, harness with stars and swatches | Our bundles sit seven screens down. |
| 8 | Shipping speed table naming the carrier and the dispatch town | Royal Mail Tracked 4–5 days, "ships from Northampton, UK" | Ours says "UK standard, tracked"; naming Royal Mail and the town is free trust. |
| 9 | Charity line on every order | "Every order donates two shelter cat meals" (marquee + block) | A UK-tone differentiator that also feeds the rescue-photo UGC route (07 §6a #7). |
| 10 | Press quotes | Cosmopolitan, Spruce Pets, The Wildest | We have none; the honest substitute is customer and rescue quotes once they exist. |
| 11 | Product FAQ accordion + "Ask a question" form on the page | six FAQs, hCaptcha form | Turns hesitation into an email; ours links away to faq.html. |
| 12 | Category SEO paragraph and a child-collection chip row | "What is a Breakaway Cat Collar?" | Our shop page has no crawlable copy. |
| 13 | Care warning about spot-on flea treatment | "remove the collar … leave off for 48 hours" | A real safety instruction we should carry on every collar. |
| 14 | Multi-currency, 30 countries, per-market thresholds | Shopify Markets; $115 / £85 | Owner is open to US/EU; Markets is a switch, not a build. |
| 15 | Blog with a "best cat collars 2026" post | homepage blog block | Three drafts already exist in `content/blog/`. |
| 16 | Cookie consent banner | Consentmo | Legally required for us too (PECR); Shopify's built-in is free. |
| 17 | Marketing opt-in pre-ticked at checkout; Klarna as a payment method | checkout render | Settings, not code. |

### 7.2 What we do that they don't (VERIFIED from our code and renders)

| # | Catwalk Club does | Where |
|---|---|---|
| 1 | Objection cards above the fold with a neck-cm size finder that selects the size | `objectionCards()`, `wireMiniFinder()` |
| 2 | Dated delivery promise ("arrives Tue 30 Sep – Thu 2 Oct") and a two-row rate table | `deliveryWindow()` |
| 3 | Sticky add-to-cart bar | `stickyATC()` |
| 4 | Express-pay row on the product page (placeholder until Shopify) | `expressRow()` |
| 5 | Quantity stepper on the product page | `product.html` |
| 6 | Bundles with the saving spelled out, and a "Save more by bundling" homepage box | `crossSell()`, `bundleSaving()` |
| 7 | Quick-add / Pick size on every card; hover second image; wishlist | `productCard()`, `quickAdd()` |
| 8 | Search, sort, category and size filters on the shop page | `shop.html` |
| 9 | Three-step quiz (occasion → tolerance → neck) on home, product and its own page | `mountQuiz()` |
| 10 | Breeds page with typical neck ranges | `breeds.html`, `BREEDS` |
| 11 | Chat button with WhatsApp option | `initChat()` |
| 12 | First-order offer pop-up and tab | `initOffer()` |
| 13 | Homepage FAQ accordions, product grid and bundles on the homepage | `index.html` |
| 14 | "Will my cat keep it on?" answered honestly per product ("Put it on, get the shot, take it off") | `objectionCards()` |
| 15 | Genuine Halloween order-by countdown | `countdownHTML()` |
| 16 | Free-delivery threshold at £30 (theirs £85) and returns "worn or not" | `FREE_SHIPPING_AT`, trust row |
| 17 | Cat of the Month competition with a free entry route | `photo-draw.html`, `DRAW` |
| 18 | Product, Organization and BreadcrumbList JSON-LD with shipping and return policy | `productJsonLd()` |
| 19 | Recently viewed | `mountRecent()` |
| 20 | 5–13× lighter pages | §5 |

### 7.3 What neither does that buyers want (from `07-demand.md`)

| # | Buyers want (07 reference) | Supakit | Catwalk Club | What to build |
|---|---|---|---|---|
| 1 | The honest reaction: "she hates it, it lasted five seconds" (07 §5, §6d) | Comfort claims instead ("won't even know", "fall in love from day one") | Honest copy, no video | Film the reaction, not the catwalk; put the 10-second clip in the gallery. |
| 2 | "For cats & small dogs" in the title (07 §1, dog demand 10–100×) | Cat-only brand | Titles say "Bow Tie Collar" | Rename: "Bow Tie Collar for Cats & Small Dogs — breakaway". |
| 3 | "Quick release" / "breakaway" in the title (07 §1b) | Yes ("Breakaway Cat Collar") | Only in body copy | Put it in the H1 and the `<title>`. |
| 4 | Colour photographed on a cat, including black and white cats (07 §3c) | Cat photos per colour, mostly one tabby | Supplier collage | One phone photo per colourway on the owner's cats. |
| 5 | cm **and** inches on size tables (07 §6b #3) | kg and lb, no neck cm | cm only (inches only on the mane) | Add inches to every size row. |
| 6 | Kitten safety: under ~9 months / light kittens may not trigger the breakaway (07 §2 #16) | Partly (Kitten size 1–2.5 kg) | Nothing | One sentence on every collar page and in the FAQ. |
| 7 | Birthday and wedding moments (07 §6a #4, #8) | No | No | Birthday bandana + hat set (in sourcing.md), a black/white bow tie "cat of honour" story. |
| 8 | Gift note / gift for a friend's cat (07 §6a #6) | No | No | Shopify cart note + "It's a gift" tick box; Christmas cut-off date on the topbar in November. |
| 9 | Free returns shown up front (07 §6b #1 "if it's not for your cat, return it") | No — customer pays postage, "free of pet hair" | We say "30 days, worn or not" but the policy pages are `#` | Write the policy and link it; keep "worn or not". |
| 10 | Bell removable **and** sold without (07 §2 #15) | Removable; £5 spare bells | Fixed bell | Source the removable-bell variant; add "no bell" option. |
| 11 | Show the clasp opening (07 §3c "difficult to open / too easy") | Annotated photo only | Nothing | Three-second clip of the breakaway popping under a tug. |
| 12 | Trustpilot or an external review source on the site (03: Supakit has 222 Trustpilot reviews, 4.6, not shown) | Not on site | Not applicable yet | Open a Trustpilot profile at launch; invite every customer. |
| 13 | A UK business address and hours in the footer (distance-selling rule; 09-teardown-1 §2 #14) | Not in the footer | Not anywhere | Add to About and footer before the first order. |
| 14 | Live chat or WhatsApp with a human (Reddit: "where do I find a good one", 07 §2 #23) | No | Button exists, number blank | Add the WhatsApp Business number. |

---

## 8. Prioritised change list for our store

Ordered by conversion impact ÷ build cost, for this range and this owner. Levers: **T** trust, **O** objection removal, **A** AOV, **R** reach/SEO, **S** speed, **L** legal.

| # | Change | Lever | Evidence | Build note for the developer |
|---|---|---|---|---|
| 1 | **Kill the expired launch offer today.** Either set a real future `SALE.ends` and keep prices, or set `SALE.active=false` and move every `price` to `list`. Never show a struck-through price against a passed date. | L, T | §2 #1, §3.2 #4; DMCC Act 2024 | `data.js`: `SALE.active=false` and `price = list` for all 11 items in one edit; `mountTicker()` and `savePct()` already switch off on `active=false`. Theme: Theme settings → Launch offer off, clear compare-at on every variant. Delete `.led` markup from the theme if no offer is planned this quarter. |
| 2 | **Make colour a variant on the Bow Tie Collar (and the Bandana), with swatches, one photo per colour and one shop card per colour.** Also change the review-source pill: "Verified purchase" → "Review of the maker's listing", and move the "(585)" count off the card unless the source note sits beside it. | O, R, L | §3.1, §4.1, 07 §1b; 09-teardown-1 §8 #1 | `data.js`: add `colours: [{ id:"red", name:"Red plaid", image:"bow-tie-red.webp", hex:"#c62828" }, …]`; `product.html`: swatch row above the size row, selected colour → main image + alt + `addToCart(id, size, qty, colour)`; cart line key becomes `id+size+colour`. `shop.html`: when `p.colours`, emit one card per colour with `?id=bow-tie-collar&c=red`. Theme: option `Colour` on the product, one image per variant, `product-card.liquid` loops `product.options_by_name['Colour'].values` when the collection is `everyday`. `site.js` `syndicatedHTML()`: change the `vtag` text and add `title` attributes pointing at the source note. |
| 3 | **Trim mobile chrome to one row.** Header to a single 64 px row (logo, Shop, Cart, ☰), topbar one line, LED strip gone, offer tab hidden on product and cart pages. | O, S | §3.3, §6 | `site.css` `.nav .links` → hide Fit & care/FAQ/Saved under a ☰ on `max-width: 640px`; `initOffer()` already skips the pop-up on product/cart — extend to `tab.hidden` there. Consider Supakit's bottom "MENU" bar instead if the nav grows. |
| 4 | **Annotated first photo for every product.** Three handwritten callouts on the hero image: what fastens it, what adjusts, what stays clear. | O | §3.2 #2 | No code. Owner shoots the product flat on a plain background, adds callouts in Canva, exports 1200 px webp, replaces `images[0]` in `data.js`. Keep the supplier collage as image 2. |
| 5 | **Put a real cat video in the gallery**, 10–20 s, honest reaction, plus a 3-second clasp-release clip on the collars. | O, T | §3.2 #14, 07 §5 | `data.js`: `videos: ["assets/video/bow-tie.mp4"]` already renders in "See it on a cat"; also add it as gallery item 0 with a poster: `mountGallery()` — if `p.videos[0]`, first thumb is `<video muted playsinline loop>`. Theme: upload as product media; `main-product.liquid` already renders `media.media_type == 'video'`. **Never** use a YouTube embed (3.1 MB, §5). |
| 6 | **Hide empty blocks until they have content.** Video row, UGC wall, winners podium render only when `HOME_VIDEOS.length`, `DRAW.winners.length`. | T | §2 #13 | `index.html`: wrap sections 3, 7 in `if(...)`; `videoRow()`/`ugcWall()` return `""` when empty and the section gets `hidden`. Theme: section settings "show when empty" default false. |
| 7 | **Size collars by weight, and print the kitten minimum.** On the bow tie and bandana: "Adjusts to fit any cat over 2.5 kg. Under 2.5 kg / 9 months a breakaway may not release under a light kitten — supervise wear." Add kg/lb and cm/in to every size table. | O, T | §3.2 #6, 07 §2 #16, §6b #3 | `data.js`: add `minWeightKg: 2.5` to collars; `objectionCards()` fit card prints it; `FIT_GUIDE` gains a `kitten` line; `detailsAccordions()` size rows print `neck` + `" (" + (cm/2.54).toFixed(1) + " in)"`. Theme: metafield `custom.min_weight_kg`. |
| 8 | **Removable bell, and a "no bell" choice.** | O, A | §3.2 #12, 07 §2 #15 | Sourcing first (the supplier's bell is on a split ring — confirm on the sample). Then `data.js` `options: [{ name:"Bell", values:["With bell","No bell"] }]` and a radio under the size row; or sell "Spare bells ×2 £2.99" as a card in Complete the set. |
| 9 | **Say the returns terms out loud where they beat Supakit's.** "30 days, worn or not, we pay UK return postage" — and write the four policy pages so the footer links stop being `#`. | T, L | §3.2 #11, §4.3 | `trustRow()` copy; footer `<a href="#">` → Shopify `/policies/*`. LAUNCH-CHECKLIST G. If the owner will not pay return postage, change the copy now — do not promise it. |
| 10 | **Move one "Complete the set" card into the buy column, and add "Popular picks" under the cart.** On the bow tie: the Pumpkin Patch bundle ("Add the Pumpkin set — £18.99, save £1.99") directly under the trust row; on the cart page: the bundle that contains what's in the basket, or the bow tie. | A | §3.2 #13, §4.2 | `product.html`: call `crossSell(p)` once with `{ compact:true, limit:1 }` after `trustRow(p)`; keep the full section lower. `cart.html`: after `#lines`, render `renderGrid()` of `PRODUCTS.filter(b => b.cat==="bundle" && b.contains.some(id => cart.has(id)))` else the two bestsellers. Theme: `main-cart.liquid` featured-collection block pointed at `bundles`. |
| 11 | **Product FAQ accordion + "Ask a question" form on the page.** Five product-specific questions (fit, keep it on, bell, wash, returns) and a form that posts to the contact email with the product name pre-filled. | O | §3.2 #15 | `detailsAccordions()`: add `<details>` "Questions people ask" from a per-product `faq: [{q,a}]` in `data.js` (fallback to the four homepage ones); "Ask a question" → `contact.html?product=id` already exists; inline it as a mini form on the theme using `{% form 'contact' %}` with a hidden `product` field. |
| 12 | **Crawlable copy on the shop and category views** — 60–100 words per category ("Halloween costumes for cats and small dogs…", "Breakaway bow tie collars…") using the search phrasing from 07 §6d, plus `<title>`s that carry "for cats", "breakaway", "small dogs". | R | §4.1, 07 §1 | `CATEGORIES[].seo` in `data.js`; `shop.html` prints it under the H1 when `current !== "all"`; theme: collection description field. Product `<title>` = `p.name + " for Cats & Small Dogs — " + keyword`. |
| 13 | **Shipping table names the carrier and the town; add the flea-treatment care line.** "Royal Mail Tracked 48, 2–4 working days, dispatched from [town]"; care: "Remove before spot-on flea treatment; leave off 48 hours." | T | §3.2 #11, §7.1 #13 | `DELIVERY` gains `carrier:"Royal Mail Tracked 48", from:"<town>"`; `objectionCards()` delivery table and `detailsAccordions()` print them; `care` strings in `data.js` for the two collars. |
| 14 | **Charity line and rescue partnership.** "Every order feeds a shelter cat for a day" only if a real agreement exists (name the rescue, state the amount); otherwise "£1 from every order to [rescue]" once signed. | T, R | §2 #4, #10; 07 §6a #7 | Topbar rotation: `countdownHTML()` alternates with a `CHARITY.line` when `CHARITY.partner` is set. Do not publish until the partner is real (CAP: charitable claims must be substantiated). |
| 15 | **Review collection from order one** — Loox or Judge.me with photo request 10 days after delivery, "Item type" (size/colour) shown on each review, Trustpilot invite in the dispatch email; announcement bar shows the count only once ≥ 20 real reviews. | T | §3.2 #17, 03 §2 | LAUNCH-CHECKLIST F; `ratingLine()` already prefers `REVIEWS` over supplier data. Add `RATING_MIN_TO_SHOW = 20` and gate the card stars on it. |
| 16 | **Settings, not code:** Shopify Markets on for US/EU with per-market free-shipping thresholds; Klarna and Shop Pay on so `payment_button` renders real express buttons; marketing opt-in pre-ticked; Shopify's cookie banner on; card images served at 400 px. | R, S, L | §4.3, §5, §6 | Theme: replace `expressRow()` placeholder with `{{ form \| payment_button }}`; `product-card.liquid` uses `image_url: width: 400`; static site: add `bow-tie-1-400.webp` variants via `srcset`. |

Items 1, 3, 6 and 16 are a day's work in total and remove every element that currently makes the store look less finished than Supakit's. Items 2, 4, 5 and 7 are the ones that move conversion on the product that will carry the year (the bow tie, 80 % gross margin, sells in every month per 07 §4).

---

## 9. Risks noticed on our side while walking the pages (VERIFIED)

| Risk | Where | Fix |
|---|---|---|
| Expired sale ticker with live strike-throughs | every page, `SALE.ends = 2026-09-22` | §8 #1 |
| "Verified purchase" pill on reviews of another seller's listing; "4.8 · 585 reviews" under our title | `syndicatedHTML()`, `ratingLine()` | §8 #2 |
| Footer legal links are `href="#"`; no business address | all pages | §8 #9; LAUNCH-CHECKLIST G |
| Newsletter form and checkout button only fire toasts | `index.html`, `cart.html` | LAUNCH-CHECKLIST B/F |
| Express-pay buttons are placeholders that toast | `expressRow()` | §8 #16 |
| Three empty content blocks on the homepage | `index.html` | §8 #6 |
| No cookie consent | all pages | Shopify Settings → Customer privacy |
| Bow tie has no colour choice though the copy promises one | `data.js` | §8 #2 |
| 196 px of fixed chrome on mobile before content | `site.css`, `mountTicker()` | §8 #3 |
| Instalment line never shows on a product page (all < £30) — fine, but the LAUNCH-CHECKLIST says it "renders on product pages" | `instalmentsLine()` | Correct the checklist wording |

---

## Blocked / not obtainable

| Item | What happened | What was used instead |
|---|---|---|
| Supakit's real UK shipping rates | Checkout hides rates until an address is entered; the £3.99 figure comes from a customer review on `/pages/reviews` | Their shipping-speed table (Economy untracked 7–9, Tracked 4–5, Expedited 3–4 business days) from the product page |
| Supakit pop-up / lead-magnet content | Shopify Forms bundle loads but nothing rendered in 8 s on any page, either device, either market; not triggered by exit intent in a headless session | Footer "Join the club — 10% off" copy |
| Supakit's Loox photo-review images and Q&A | The reviews iframe rendered text and 10 thumbnails; Q&A tab not present on this widget | Text and "Item type" pattern captured |
| Supakit traffic, conversion, AOV | Not public | Ranking estimate in 08 (390–780 orders/month from review velocity) |
| Apple Pay presence in checkout | Chromium on Linux does not expose Apple Pay; Shop Pay + Google Pay observed | Footer payment icons list Apple Pay |
| Our pages on a real CDN | Rendered from a local server, so load times are a floor | Byte counts, which are hosting-independent |
| Geolocation | Proxy egress is US, so default renders hit the `en-us` market | Second render with `localization=GB` cookie; curl (no JS) returns GB by default |
