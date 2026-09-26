# 09 — Teardown 5: Giant Paws (giantpaws.co.uk) vs Catwalk Club

Researched 26 September 2026 for Catwalk Club (UK Shopify store, seven launch products £7.99–£17.99 plus four bundles, goal £100,000 net profit in the 12 months to September 2027). This is the storefront-mechanics teardown of the friend's store; `02-giantpaws.md` (same day) covers their catalogue, prices, review counts and sales proxy and is not repeated here. Every figure is tagged **VERIFIED** (fetched today, URL or file given) or **ESTIMATED** (method given). UK spelling throughout.

## The six findings that matter

1. **Giant Paws is a £110-median furniture store and most of its conversion mechanics only make sense at that ticket.** Free delivery on every order, "Pay in 3" on the product page, a £19.99 Mystery Gift Box upsell and a £10-off-£75 post-add pop-up all pay for themselves on a £189.99 tower. At our £7.99–£17.99 they do not. The friend's store is a source of *patterns*, not *settings*. VERIFIED (§4, §5).
2. **Their page structure is a good one and we already have most of it.** Gallery → three objection accordions ("Will this fit my cat? / When will it arrive? / Is the quality good?") → title, rating, price, instalments → variant → quantity + Add to cart → Buy with Shop Pay → three-line trust list → payment icons → three detail accordions → quiz → upsell grid → reviews → draw. Our `product.html` renders the same sequence (`objectionCards`, `expressRow`, `trustRow`, `detailsAccordions`, `crossSell`, `drawBlock`, `mountQuiz`). The differences are in what sits *behind* the blocks: real payment buttons, a real cart drawer, real search. VERIFIED (§4.4).
3. **Three things on their pages are what we must not copy, and one of them is now live on ours.** (a) A per-visitor 3-day countdown with no deadline (`data-duration="259200" data-deadline=""`), (b) "Rated 4.8/5 from 20 reviews" rendered by the theme on a product created 11 days ago while the Loox app holds 2 reviews store-wide, (c) a £1,500 weekly prize draw with no free-entry route and `Translation missing:` strings where the steps should be. Our own LED ticker is showing **00D 00H 00M 00S** and every product still carries the crossed-out list price four days after `SALE.ends` (22 Sep). That is the same false-urgency class as (a). VERIFIED (§4.1, §4.4, §5.3).
4. **They are 10× heavier and 15× slower to interactive than we are, and they are now loading Google Tag Manager and Google Ads tags.** Chromium, mobile: their PDP is 12.6 MB over 397 requests with DOMContentLoaded at 3.3 s; ours is 1.24 MB over 21 requests at 0.25 s. 3.6 MB of theirs is `googletagmanager.com` and `googleadservices.com` also loads, neither of which appeared in the 18 Sep crawl. The friend is either running or about to run Google Ads. Ask about it. VERIFIED (§2).
5. **Their mobile product page puts Add to cart at 894 px; ours is at 1,726 px.** Same block order, but their header is one 72 px row with a burger, their objection cards are three compact tiles, and their gallery is 422 px tall. Ours has a 61 px top bar, a two-row 116 px header, a 42 px LED ticker, a 340 px gallery, a thumbnail strip, then four full-width accordions before the title. Halving that is the single biggest mobile conversion change available to us. VERIFIED (§3).
6. **Neither store does what the buyer voice in `07-demand.md` asks for on a product page:** a short on-body video above the fold, a plain wear-time and safety line ("a few minutes for a photo; breakaway buckle; bell comes off"), a gift note at checkout, and a Christmas posting cut-off. Those are ours to take. VERIFIED (§5.3).

---

## 1. What was fetched

| Page | URL | Method | HTTP | Note |
|---|---|---|---|---|
| Homepage | `https://giantpaws.co.uk/` | curl ×4 + Chromium desktop/mobile | 200 | 603 KB HTML |
| Best-selling sort | `/collections/all?sort_by=best-selling` | curl | 200 | Rank 1 non-bundle is still Silver Lodge |
| Best-seller PDP | `/products/silver-lodge-164cm-cat-tower` | curl ×4 + Chromium | 200 | 913–933 KB HTML; £189.99 (was £179.99 at the 02 fetch earlier today; `updated_at 2026-09-26T03:33`) |
| Collection | `/collections/cat-towers-trees` | curl ×4 + Chromium | 200 | 35 items |
| Cart, empty | `/cart` | curl ×4 + Chromium | 200 | |
| Cart, 1 item | `/cart` after `POST /cart/add.js` (variant 53715186024714) | Chromium | 200 | One tower added, nothing bought |
| Checkout, step 1 | `/checkout` | curl (302 → `shop.app/...shoppay`) then Chromium (`/checkouts/cn/.../en-gb`) | 302 / 200 | Contact + delivery + payment form rendered; not submitted |
| `/products.json?limit=250`, `/collections.json`, `/cart.js`, `/policies/shipping-policy`, `/pages/avada-faqs`, `/pages/size-guide` | | curl | 200 | `/pages/track-your-order` → **404** (linked from every footer) |
| Loox widget JSON for product 10625245413642 | `loox.io/widget/t9khQVjOTe/reviews/...` | curl | 200 | Returns the widget shell only; count not readable this way (02-giantpaws.md read it via the page widget: 0 for this product) |
| Ours | `site/index.html`, `product.html?id=lion-mane`, `shop.html`, `cart.html` (served from `127.0.0.1:8765`) + `site.js`, `data.js`, `site.css`, `reviews.js` read in full | Chromium desktop/mobile | 200 | |

All VERIFIED. Raw HTML, extracted structure (`*.txt`), Chromium metrics (`pw-results.json`) and 40 screenshots are in `scratchpad/gp5/`.

---

## 2. Speed and page weight

### 2.1 curl, desktop UA, 26 Sep 2026 (VERIFIED)

| Page | HTML (uncompressed) | HTML (br/gzip) | TTFB run 1 | run 2 | run 3 | run 4 | Total transfer (best) |
|---|---|---|---|---|---|---|---|
| Homepage | 603 KB | 85 KB | 0.33 s | 0.36 s | 0.27 s | 0.25 s | 0.39 s |
| Silver Lodge PDP | 913–933 KB | 99 KB | 0.35 s | 0.16 s | 0.16 s | — | 0.34 s |
| Cat Towers collection | 623 KB | — | 0.19 s | 0.17 s | 0.21 s | 0.17 s | 0.64 s |
| Cart (empty) | 234 KB | — | 0.63 s | 0.14 s | 0.17 s | 0.16 s | 0.28 s |
| `/checkout` (302 hop) | — | — | 4.27 s | — | — | — | 5.27 s incl. redirect chain |
| `/products.json` (118 products) | 553 KB | — | 0.88 s | — | — | — | 0.93 s |

Shopify's edge serves their HTML in 0.15–0.35 s; the server is not the problem. The HTML itself is the problem: a 913 KB product page carries every review card, the quiz, the upsell grid, the full mega-menu twice (drawer and desktop) and the predictive-search results inline. Ours cannot be TTFB-measured until it is on Shopify; the static HTML is 5.9–10.9 KB per page.

### 2.2 Chromium render, `load` + 7 s settle (theirs) / 2.5 s (ours), decoded bytes (VERIFIED, `gp5/pw-results.json`)

| Page | Requests | Total | JS | CSS | Images | DOMContentLoaded | `load` | DOM nodes | Page height |
|---|---|---|---|---|---|---|---|---|---|
| **GP home desktop** | 333 | 11.1 MB | 5.7 MB | 0.9 MB | 0.9 MB | 2.6 s | 5.0 s | 3,004 | 6,151 px |
| **GP home mobile** | 326 | 10.5 MB | 5.8 MB | 0.9 MB | 0.2 MB | 2.5 s | 4.9 s | 3,006 | 4,865 px |
| **GP PDP desktop** | 392 | 12.4 MB | 6.4 MB | 0.9 MB | 0.9 MB | 3.1 s | 4.8 s | 3,988 | 4,065 px |
| **GP PDP mobile** | 397 | 12.6 MB | 6.4 MB | 0.9 MB | 1.0 MB | 3.3 s | 4.7 s | 3,988 | 5,363 px |
| **GP collection desktop** | 365 | 11.2 MB | 5.7 MB | 0.8 MB | 0.8 MB | 2.8 s | 5.3 s | 3,065 | 3,425 px |
| **GP cart (1 item) desktop** | 391 | 12.4 MB | 7.1 MB | 0.8 MB | 0.04 MB | 1.0 s | 3.2 s | 1,159 | 1,362 px |
| **GP checkout desktop** | 370 | 13.6 MB | 11.5 MB | 0.5 MB | 0.01 MB | 1.7 s | 6.4 s | 971 | 1,763 px |
| **GP checkout mobile** | 483 | 14.5 MB | 12.0 MB | 0.6 MB | 0.2 MB | 1.8 s | 6.4 s | 1,045 | 2,206 px |
| CC home desktop | 25 | 1.27 MB | 0.09 MB | 0.06 MB | 1.04 MB | 0.19 s | 0.28 s | 670 | 7,400 px |
| CC home mobile | 22 | 1.14 MB | 0.09 MB | 0.06 MB | 0.91 MB | 0.18 s | 0.22 s | 670 | 9,509 px |
| CC PDP (Lion Mane) desktop | 21 | 1.24 MB | 0.12 MB | 0.06 MB | 0.99 MB | 0.23 s | 0.26 s | 1,062 | 7,934 px |
| CC PDP mobile | 21 | 1.24 MB | 0.12 MB | 0.06 MB | 0.99 MB | 0.25 s | 0.29 s | 1,062 | 8,992 px |
| CC shop desktop | 24 | 1.19 MB | 0.09 MB | 0.06 MB | 0.96 MB | 0.12 s | 0.14 s | 375 | 2,830 px |
| CC cart (1 item) mobile | 22 | 0.26 MB | 0.09 MB | 0.06 MB | 0.10 MB | 0.04 s | 0.05 s | 198 | 2,071 px |

Where the weight goes (PDP mobile, by host, VERIFIED): `giantpaws.co.uk` 7.3 MB (theme JS bundle `compiled_assets/scripts.js` plus per-section scripts), `www.googletagmanager.com` 3.6 MB, `cdn.shopify.com` 1.2 MB, `shop.app` 0.3 MB, `static.klaviyo.com` 0.15 MB, `loox.io` 0.06 MB. `www.googleadservices.com` also loads on the homepage. Neither GTM nor Google Ads appeared in the 18 Sep saved crawl or in the served HTML today; they are injected through Shopify's pixel manager, which means the friend has connected the Google & YouTube channel or a GA4/Ads pixel in the last eight days.

Image handling: 101–117 of their 126–130 images carry `srcset` and 103–119 are lazy-loaded; 36 of 109 collection images have no alt text. Ours: 0 of 37–43 images have `srcset` (every `<img>` is the 800×800 WebP, displayed at 162–344 px on a phone), 12–21 have no alt (thumbnails and hover images, decorative). VERIFIED.

Reading (ESTIMATED): on a 4G phone their PDP is 5–8 s to usable; ours will be under 2 s even after Shopify adds its own ~0.5 MB of runtime. Speed is an advantage we should protect by not installing app bloat (Loox + Klaviyo + GTM is what took them to 12 MB) rather than something we need to fix.

---

## 3. Mobile behaviour (390 × 844, iPhone UA) — VERIFIED from screenshots and measured positions

| Element | Giant Paws | Catwalk Club |
|---|---|---|
| Header | Single 72 px sticky row: burger · search · logo · dark-mode toggle · cart | 61 px top bar (scrolls) + **116 px two-row sticky header** (logo row, then Shop · Fit & care · FAQ · Saved · Cart) |
| Announcement | 42 px sticky LED ticker under the header ("YOUR SALE ENDS IN 02D 23H 59M 51S · Up to 30% off") | 42 px LED ticker, not sticky, reading **00D 00H 00M 00S** |
| Sticky chrome total | 114 px | 116 px (plus 61 px top bar until scrolled) |
| Hero | Copy left, cat photo right, two CTAs ("Shop Maine Coon Towers", "Join the £1,500 draw"), three underlined benefit lines | Kicker, H1, lede, two CTAs, then the lion-mane hero photo below the fold |
| PDP: y of H1 | 724 px | 1,083 px |
| PDP: y of price | 909 px | 1,404 px (desktop) / below H1 on mobile |
| PDP: y of Add to cart | **894 px** (just under one screen) | **1,726 px** (two screens) |
| PDP: objection cards | Three tiles in one row (icon, label, +), ~110 px tall in total | Four full-width `<details>` rows, one open by default, ~330 px |
| Gallery | 422 px carousel with dots, thumbnails below, wishlist heart + "Join the £1,500 draw" pill + "In stock" pill overlaid | 340 px main image, six 48 px thumbnails, "Enter Cat of the Month" pill + "In stock" pill overlaid |
| Sticky add-to-cart | `sticky-add-to-cart__bar` in the HTML (image, variant, price, button) — not visible at load or after scroll in the headless run | `.sticky-atc` bottom bar appears once the buy box scrolls off (name, size, Add to cart); price hidden on ≤560 px |
| Floating buttons | "☏ Get in touch" pill bottom-right (opens WhatsApp / "Online assistance" = Shopify Inbox) | "🎁 10% off your first order" bottom-left + "💬 Help me choose" bottom-right, both lifted 86 px when the sticky bar shows |
| Pop-ups | Theme dialog "10% off your first order" (email + optional phone) — did not fire within 7 s in Chromium; "Checkout now and save £10" dialog fires on add-to-cart when basket ≥ £75 | `.modal` first-order offer fires after 7 s on every page except product and cart |
| Collection | Sticky compare-table headers (`<th>` position:sticky), filter/sort drawer, "See 35 items" | Chip rows (category, size), search box, sort select; no drawer |
| Cart | Summary card becomes sticky (`position:sticky`) on mobile at y=471 | Summary is static on ≤960 px |
| Horizontal overflow | None (390/390) | None (390/390) |
| Chat | Shopify Inbox web component `gp-unified-help` covering the viewport (0×0 visible until opened) + WhatsApp link | Our own panel: WhatsApp (when a number exists), contact page, size guide |

Reading: their mobile chrome is tighter and their PDP gets to the button in one screen. Ours reaches it in two, mostly because of the header, the ticker and the accordion stack. See change #2.

---

## 4. Element-by-element walk

Legend: **GP** = Giant Paws, **CC** = Catwalk Club (what our code actually renders — read from `index.html`, `product.html`, `shop.html`, `cart.html`, `site.js`, `data.js`).

### 4.1 Site-wide chrome

| Element | Giant Paws (VERIFIED from HTML/render) | Catwalk Club (VERIFIED from code/render) | Read |
|---|---|---|---|
| Announcement / ticker | Sticky LED strip: "YOUR SALE ENDS IN 02D 23H 59M 51S • Up to 30% off ›". `<gp-sale-countdown data-mode="visitor_preview" data-duration="259200" data-deadline="" data-confirmed="false" data-campaign="header-3d-20260924">` — a rolling 72-hour timer per visitor, no fixed end. No free-delivery line in the ticker (it is in the trust strip instead). | `.topbar`: "Free UK delivery over £30 · 🎃 Order by 14 October for Halloween — 19 days left" (real date maths in `countdownHTML()`), then `.led` ticker "SALE ENDS IN 00D 00H 00M 00S" because `SALE.ends` = 22 Sep and `SALE.active` is still `true`. | Theirs is a banned practice under CPUT/DMCC (false time-limit). Ours is honest in design but is currently displaying an expired countdown and expired reference prices — fix today (change #1). |
| Header | Logo, seven-item nav with mega-menus (Shop Maine Coon collection, Shop all, Tailored Furniture, Guides, Our Journey, Contact, Bundles, More), search icon → predictive-search modal (products, prices), light/dark toggle, Account, Cart bubble. Mobile: burger drawer. | Logo + five text links (Shop, Fit & care, FAQ, Saved with count, Cart with count). No search, no account. Mobile: same links wrap to a second row. | Their search and account are Shopify built-ins we get free on the theme (`predictive-search`, `routes.account_url`); wire them. Their dark-mode toggle is a gimmick. |
| Trust strip | Three icons under the hero: "Free standard UK delivery — On all orders", "4.9/5 from 5,000+ happy cat parents", "10% off your first order — Use code FIRST". | `.strip` three items: "Free UK delivery on orders over £30", "30-day returns worn or not", "10% off your first order — WELCOME10". | "5,000+ happy cat parents" on a store with 16 products that have ever sold (02 §5) is an unsubstantiated claim — do not copy. Ours states only things we control. |
| Pop-up | Theme dialog `gp-contact-popup`: "A first treat from Giant Paws — 10% off your first order", email + optional phone, "Unlock my 10% off", "Keep exploring". Also Klaviyo onsite JS loaded (company V3VmdE). Second dialog `gp-now-offer` after add-to-cart: "Checkout now and save £10 — Use NOW at checkout on orders of £75 or more", deep link `/discount/NOW?redirect=/checkout`. | `initOffer()`: bottom-left tab "🎁 10% off your first order" plus a one-time modal after 7 s (not on product/cart pages), email field, shows code WELCOME10 on submit (not wired to an email tool yet). | Their post-add "£10 off £75" is a clean AOV lever: a discount deep link that pre-applies at checkout. Our equivalent at our ticket is "free delivery at £30" surfaced at the moment of add (change #4). |
| Chat | Shopify Inbox (`storefront/web-components/chat.js`) behind a "Get in touch" pill offering "WhatsApp live support ↗" (+44 7356 016713) and "Online assistance →". | `.chat-fab` "💬 Help me choose" panel → WhatsApp (only when `CONTACT.whatsapp` is set; it is blank), "Send a message", "Size guide". | Same idea. Install Shopify Inbox (free) and put a WhatsApp Business number in `CONTACT.whatsapp` before launch. |
| Footer | One tagline ("For the cat who makes it home."), a single collapsed "Help & information" accordion (Our Journey, FAQ, Guides, Contact Us, Shipping & Returns, Size Guide, Privacy, Terms, Track Your Order → **404**), 13 payment icons. **No company name, address, company number, email or phone in the footer; no social links anywhere on the site.** | Four columns (brand, Shop ×4, Help ×9, Legal ×4 as `#` placeholders), "Demo storefront — not yet trading" line, 10 payment icons via `paymentIcons()`. No company details yet. | Both fail the Consumer Contracts Regulations trader-identity test today. Ours must have real policy pages and a trader name/address before the first order (change #9). Do not ship a footer link to a 404. |
| Analytics | Shopify web pixels + **Google Tag Manager (3.6 MB) + Google Ads conversion tag**, Klaviyo tracking, Loox. No Meta or TikTok pixel in the served HTML. | None. | GA4 + Meta + TikTok pixels via Shopify Customer Events before launch, and ask the friend what the Google tag is for (change #12). |

### 4.2 Homepage, top to bottom

| # | Giant Paws section | Catwalk Club section | What matters |
|---|---|---|---|
| 1 | Hero: kicker "BUILT FOR MAINE COONS & BIGGER CATS", H1 "Because bigger cats deserve better", three underlined benefit lines, CTAs "Shop Maine Coon Towers" + "Join the £1,500 draw", cat photo with two stickers ("Bigger Cats Happier Lives ♡", "FOR MAINE COONS & LARGE CATS"). | Hero: kicker "🎃 Halloween 2026 is in", H1 "Costumes your cat will look unfairly good in.", lede, CTAs "Shop all" + "Halloween first", lion-mane photo with two stickers ("Seriously cute ♡", "Sized for cats — faces always clear"). | Near-identical pattern (the same builder's hand, evidently). Theirs leads with a prize draw as the second CTA; ours leads with the seasonal collection, which is the right call for the 14-week Halloween/Christmas window. |
| 2 | Trust strip (free delivery, 4.9/5 from 5,000+, 10% off). | Trust strip (free over £30, 30-day returns, WELCOME10). | See 4.1. |
| 3 | 13 category circles with product photos (Maine Coon Collection, Cat Towers, Litter Trays…, Shop all). | 5 category circles (`categoryCircles()`: Everyday, Halloween, Christmas, Bundles, Everything) with product photos. | Same pattern; ours is the right size for seven SKUs. |
| 4 | **Review carousel**: 60+ cards, each = product photo + price (+ SALE/compare-at) + 5 stars + quote + "— Name I., Customer review" + product title, arrows, "You can swipe for days or join us today!". | Nothing equivalent (we have no own reviews; supplier reviews are shown only on product pages). | Their 60 quotes are the same theme-rendered text as the "20 reviews" on each PDP, on products created 12–20 Sep, while the review app holds 2 (02 §4). Do not copy the mechanism. The *layout* (photo + price + quote + name) is worth reusing once Judge.me holds real reviews. |
| 5 | "Find your cat's new favourite" product carousel: heart, badge (BEST SELLER / SOLD OUT), title, "Rated 4.9/5 from 20 reviews", price, size pills (M/L/XL) inline, **Add** button or **Notify** (opens a contact form: "This sends a request to Giant Paws; it is not an automatic back-in-stock subscription"). | "Everything we make" grid (`renderGrid`): badge, photo with hover-swap second image, title, `cardRating()` stars + supplier count, blurb, price with strike-through, wishlist heart, quick add (one-size → straight to cart; sized → "Pick size" link; sold out → "🔔 Notify" toast). | Their inline size pills on the card are a good idea for the Bandana/Lion Mane/Cape/Spider (change #7). Their honest "not an automatic subscription" note is the right way to run notify-me without an app. |
| 6 | "Picture it in their corner of the room (Tap to view and swipe)": **10 real product videos** in phone frames with product links. | "Picture it on your cat — Ten-second clips, phone-shot": `videoRow()` renders **5 empty phone frames** labelled "video coming" because `HOME_VIDEOS = []`. | The one content item we have not made. The owner can film all seven in an afternoon (change #3). |
| 7 | "Your cat could help you win £1,500" weekly draw block: "share a photo of your cat with their Giant Paws purchase", `Translation missing: en.gp_conversion.draw_steps`, "Previous winners: Milo, Luna, Nala". | "Your cats, dressed" UGC wall (six empty "Your cat here" frames until real winners exist) + Cat of the Month (£25 credit, free entry, no purchase necessary, terms page). | Purchase-gated prize draw with no free route and no terms breaches the CAP Code (competitions need a free entry route — the legal floor for this project). Ours is compliant by design; keep `DRAW.winners` empty until real. |
| 8 | "Tailored Furniture" carousel: four bespoke designs at £2,395–£4,495 + £300–£500 delivery, 15–45 day lead. | "Cheaper together" bundles grid + `#savebox` listing each bundle's £1.99 saving. | Not comparable. Our savings are explicit; theirs are "Save more by bundling" with no figure (02 §7). |
| 9 | "What does my cat need?" 3-step quiz (size, space, budget) → recommended / closest alternatives / more to explore. | "Which costume for my cat?" 3-step quiz (`mountQuiz`: occasion, tolerance, neck cm or breed) → sized shortlist. | Ours answers the two real objections (will they wear it, will it fit); theirs answers budget. Keep ours. |
| 10 | "Let's find what feels right for your cat — Help me choose on WhatsApp ↗". | "Getting the size right" + "Why Catwalk Club" panels. | Their WhatsApp CTA mid-page is cheap and human; add ours once the number exists. |
| 11 | "Our weekly winners" podium (Milo, Luna, Nala with ♛ 1/2/3). | Winners podium (`podium()`) — hidden until `DRAW.winners` has entries. | Same block, ours honest. |
| 12 | Two accordions: Delivery & returns, How tailored furniture works. | Four FAQ accordions (size, delivery, keep it on, Halloween order-by). | Ours is better targeted. |
| 13 | Sign-up pop-up button "10% off your first order · Sign up" (inline). | Newsletter block "Get first pick of the Halloween drop" (form not wired: `toast('Not wired up yet')`). | Wire to Shopify Email / Klaviyo free tier before launch. |
| 14 | Footer (see 4.1). | Footer (see 4.1). | |

Missing on both: no "as seen on / press", no founder or "about us" strip on the home page (theirs has "Our Journey" in the nav only; our About page exists but is not linked from the home body).

### 4.3 Collection page

| Element | GP `/collections/cat-towers-trees` (35 items) | CC `shop.html` (11 live items) | Read |
|---|---|---|---|
| Heading | H1 "Cat Trees & Towers for Large Cats" + one-line intro + in-page nav ("Shop towers ↓", "Compare models & prices", "Delivery details", "Returns policy"). | H1 "Everything we make" + intro. | Their H1 carries the search phrase; ours should say "for cats" (07-demand finding 1). |
| Compare table | "Compare towers" table: thumbnail, name, price, height, two "Why others chose" bullets per model, sticky headers, size-guide link. Includes bundles at £249.99–£709.99. | None. | At seven SKUs a one-row-per-product "which one" table (occasion · what the cat wears · sizes · price) is more useful than a grid to a first-time buyer (change #8). |
| Filters | Drawer: Availability (In stock / Out of stock), Price (min/max, "highest is £709.99"); "35 items"; grid-density toggle. | Category chips (Everything/Everyday/Halloween/Christmas/Bundles), size chips (Any/S/M/L/One size), search box. | Ours is better for our range. |
| Sort | 9 options incl. Best selling, Most relevant, Date. | 4 options (Featured, price ×2, A–Z). | Add "Best selling" once Shopify has order data (free on the theme). |
| Product card | Heart · badge (Sale / Sold out; "🔥 Running low", "Our pick" on the PDP upsell grid) · **image carousel with ‹ › and "1 / 5" counter** · quick-add form with **Add** and **Choose** (variant modal) · title · price · compare-at · "Save £105.01" · "4.7/5 · 22 reviews". Cards have no blurb. | Badge · image with hover-swap · title · stars + count · blurb (hidden ≤560 px) · price + strike + "Save 17%" · heart · quick add / "Pick size". | Their "Save £105.01" against a £245 compare-at on a product created 12 Sep is the reference-pricing risk 02 §7 flagged. Our cards are fine; copy the in-card variant picker for sized products (change #7). |
| Rating on card | "4.7/5 · 22 reviews" on every card. | Supplier-listing average and count (e.g. "4.8 (585)" bow tie) from `RATING_SUMMARY`. | Ours is labelled on the PDP ("collected from the maker's listing… shared with permission") but **not on the card**; add a one-word qualifier or tooltip so a card does not imply own reviews (change #10). |
| Pagination | 35 in one page. | 11 in one page. | — |

### 4.4 Product page (their Silver Lodge £189.99 vs our Lion Mane £9.99)

| # | Element | Giant Paws | Catwalk Club | Read |
|---|---|---|---|---|
| 1 | Breadcrumbs | Home / Cat Towers & Trees / [title] | Home / Halloween / Lion Mane (`breadcrumbs()` + BreadcrumbList JSON-LD) | Equal. |
| 2 | Gallery | 5 images, ‹ › arrows, dots "Slide 1 of 5", thumbnail strip, zoom dialog with thumbnails, `model-viewer` element present (no 3D asset), no video. Overlays: heart, "Join the £1,500 draw ↗", "In stock". | 6 supplier images, thumbnail buttons swap the main image, no zoom, no swipe, no arrows, no video (slot renders "Lifestyle videos go here"). Overlays: "📸 Enter Cat of the Month", "In stock · ready to ship" (hard-coded; `p.stock` unset). | Add swipe + zoom (Shopify's media gallery does both). Video is the bigger gap: the buyer's first question is "what does it look like on a moving cat" (07 §6b #1–2). |
| 3 | Objection cards | Three `<details>` tiles: "Will this fit my cat?" (generic text + "Take me to the fit guide"), "When will it arrive?" ("Free standard UK delivery usually takes 3–5 working days from dispatch, after 1–2 working days for processing"), "Is the quality good?" (generic). | Three `<details>` cards + a fourth "Will my cat keep it on?": fit card has a **live neck-cm size finder** that selects the size button; delivery card computes a real date window ("arrives Tue 30 Sep – Thu 2 Oct") and a price table; quality card lists material, care, returns. | Ours is materially better in content. Theirs is materially better in footprint on mobile (one row of three). Keep our content, adopt their layout (change #2). |
| 4 | Title + rating | H1 "Maine Coon Cat Tower — Silver Lodge, 164cm" (H1 differs from the card title "Maine Coon Cat Tree 164cm \| Large Cat Tower – Silver Lodge"), "Rated 4.8/5 from 20 reviews" linking to the theme's review block. | H1 "Lion Mane", alias tag "aka Kingsley", `ratingLine()` "★★★★★ 4.6 · 104 reviews" linking to #reviews (supplier reviews). | Put "for cats" in our H1 ("Lion Mane for Cats"). Their 20 reviews on an 11-day-old product versus 2 in the app (02 §4): do not copy. |
| 5 | Price | "£189.99" then "Pay in 3 interest-free instalments of £63.33 with **shop** ⓘ" (Shop Pay Instalments via `shopify-payment-terms`). No compare-at on this product; 15 variants elsewhere show "Regular price £55.00 · Save £10.01". | `priceHTML()`: "£9.99 ~~£11.99~~ Save 17%", "You've saved £2.00", "Launch offer: £9.99 until Tue 22 Sept, then £11.99", then `instalmentsLine()` — which never renders because every product is under `INSTALMENTS.min = 30`. | Our strike-through is four days past its stated end (change #1). Instalments: their line renders because the basket is £189.99; Shop Pay Instalments / Klarna have minimums well above £17.99 (ESTIMATED: Klarna Pay in 3 UK typically £30+; Shop Pay Instalments availability in the UK is per-store), so the Klarna icon in our buy box should be removed until it is real. |
| 6 | Variant | "Colour: Light Grey" (single value shown as text). Card grids show size pills. | Size buttons S/M/L with `aria-pressed`, size note "M — neck 32cm / 12.6in · Cap 26cm", link "How to measure". | Ours better. |
| 7 | Quantity + ATC | − 1 + and "🛒 Add to cart" (dark red, full width). | − 1 + and "Add to cart" (pink, full width) + wishlist ♡. | Equal. |
| 8 | Express pay | "Buy with **shop** Pay" (real `shopify-payment-button`, dynamic checkout) + "More payment options". | `expressRow()`: four **dummy** buttons (Shop Pay, PayPal, Apple Pay, G Pay) that toast "activates on Shopify once payments are enabled", with a caption saying so. | On Shopify use `{{ form \| payment_button }}` and delete the dummies; a fake button in production is worse than none. |
| 9 | Trust lines | Three rows with icons: "Free standard UK delivery", "30-day returns · conditions apply", "Secure checkout"; then 13 payment icons; then "In stock". | `trustRow()`: four tiles "Free UK delivery over £30", "30-day returns worn or not", "Sized for cats — faces and eyes clear", "Secure checkout — Shopify Payments" (or "UK stock" for the bandana); then 10 payment icons. | Equal; ours says "worn or not", which matters for this category. |
| 10 | Ticks / "for me if" | Inside the details accordion: "A complete everyday retreat" bullets and "This is for me if…" (three lines). | `tickList()` three ticks under the blurb, then `forMeIf()` section after the buy box. | Same block; ours is above the fold. |
| 11 | Accordions | "Product details & dimensions" (sizes, long copy, "Dimensions and details", setup and care), "Delivery & Returns", "Is it right for my cat?" (two quick checks + the full 3-step quiz embedded). | `detailsAccordions()`: "Product details & dimensions" (specs, in the box, size table, materials & care), "Delivery & returns" (table + "Placeholder terms — confirm before trading"), "Is it right for my cat?" (wear guidance + link to quiz). | Equal structure. Ours has a placeholder note visible to customers — remove before launch. Neither has a **safety** block (breakaway, bell, kittens, supervision, wire legs) — change #5. |
| 12 | Quiz | Embedded in accordion 3 and again as a section (`gp-global-quiz`). | `#pdpquiz` section "Not sure this is the one?" | Equal. |
| 13 | Cross-sell | "More comfort for their everyday" — 12-card grid with hearts, badges ("Sale", "Our pick", "🔥 Running low"), Add/Choose quick-add, compare-at, "Save £10.01", rating line. | `crossSell()` "Cheaper together": the bundles this product sits in, partner image, "Add the Spider Costume as a bundle", price + "Save £1.99"; then "Goes well with" (4 cards, same category first); then recently viewed. | Ours is tighter and the saving is real. Their "🔥 Running low" badge sits on a product with no stock number and 3 sizes — do not copy without live inventory. |
| 14 | Reviews | Theme block "Loved in homes like yours": 4.8 average, 5-bar distribution (17/2/1/0/0), 20 cards with initials avatar, name, stars, one-line text, "Show all 20 reviews", sticky summary aside on desktop. No photos, no dates, no verified-purchase tag, no filter. Loox widget script loads but renders nothing for this product. | `syndicatedHTML()`: 4.6 average, distribution bars, star-filter chips with counts, six cards then "Show all 104 reviews", flag avatar, "Verified purchase" tag, date, country, size bought, star-only ratings section, source note "Reviews collected from the maker's listing for this product, shared with permission." Own-review block (`REVIEWS`) takes precedence once real reviews exist. | Ours is more transparent and more useful. The risk is the card-level number (4.3). |
| 15 | Draw / competition | "Your cat could help you win £1,500" with `Translation missing:` steps and "Previous winners Milo, Luna, Nala". | `drawBlock()`: Cat of the Month, £25 credit, "Free to enter, no purchase necessary", first round closes 31 Oct 2026, mailto entry. | Ours is compliant; theirs is not. |
| 16 | Size help | "Take me to the fit guide" → `/pages/size-guide`; FAQ tells the buyer to measure "comfortable resting position". | Neck-cm finder in the fit card, size note per button, `sizing.html`, `breeds.html` (typical neck by breed), quiz step 3 takes cm or breed. | Ours is the strongest single feature on the page. |
| 17 | Sticky ATC | Present in HTML (`sticky-add-to-cart__bar` with image, variant, price, button) but not shown in the headless render. | Shows after the buy box scrolls out; works. | Ours works. |
| 18 | Structured data | Product JSON-LD via SEOAnt app (02 §6). | Product + BreadcrumbList + Organization JSON-LD with shipping and return policy, `priceValidUntil` = `SALE.ends` (**2026-09-22, in the past**). | Fix with change #1. |

### 4.5 Cart

| Element | GP `/cart` with one £189.99 item | CC `cart.html` with one £9.99 item | Read |
|---|---|---|---|
| Heading | "Your basket · 1 item — Their next favourite spot starts here." | "Your cart". | — |
| Line item | Image, title, "Colour: Light Grey", price, − 1 +, "Remove". | Image, title, "Size: M", − 1 +, "Remove", line total. | Equal. |
| Upsell | "🎁 Mystery Gift Box — Surprise gift worth over £50 · Add · £19.99" (one-click add). The product's own description says "worth more than you paid"; its price was £9.99 at the 02 fetch this morning and £19.99 now. | None. | The mechanism (one-tap add-on in the summary) is exactly right for us; the claim is not. Ours: "Add the Bow Tie Collar · £8.99 — takes you over £30, delivery becomes free" (change #4). |
| Discount code | "Have a discount code? +" accordion in the cart. | None (WELCOME10 is shown in the pop-up; nowhere to enter it before checkout). | Shopify checkout has the field; a cart-level field is optional. Skip. |
| Free-delivery bar | **None.** "Shipping — Calculated at checkout" and "Duties and taxes included. Shipping is calculated at checkout." even though every order ships free. | `.progress` bar + "Spend £20.01 more for free UK delivery" / "✅ You've got free UK delivery", delivery line shows £3.95 or Free, total includes it. | Ours is better and is the AOV lever that matters at our ticket. Move it into a drawer that opens on add (change #4). |
| Totals | Subtotal, Shipping (calculated at checkout), Estimated total. | Subtotal, Delivery, Total, instalments line (never renders under £30). | — |
| Checkout | 13 payment icons, "🔒 Secure checkout →", "Or use express checkout": **Shop Pay, PayPal, G Pay** (real buttons, iframes from paypal.com and pay.google.com), "🔒 Secure payment · Need a hand? Chat with us", "Continue shopping". | "Checkout" button that toasts "needs a payment provider", "No payment provider connected yet — this is a demo storefront." | Real vs demo. On Shopify the cart template gives us `additional_checkout_buttons` for free. |
| Empty state | "Your cart is empty — Have an account? Log in to check out faster. Continue shopping". | "🐈 Nothing in here yet — Your cat is, for now, undressed and content. Start shopping". | Ours has personality; add "Log in" once accounts exist. |
| Gift note / message | None. | None. | Change #6 (Christmas is the strongest UK moment, 07 §6c). |

### 4.6 Checkout (as far as public pages go)

`GET /checkout` first 302s to `shop.app/checkout/.../shoppay` (Shop Pay's universal redirect) and, with that skipped, renders Shopify's one-page checkout at `/checkouts/cn/<token>/en-gb`. VERIFIED from `gp5/checkout_headers.txt` and the Chromium render.

| Element | Giant Paws | What it means for us |
|---|---|---|
| Express checkout row | Shop Pay · PayPal · G Pay above the form (Apple Pay would show on Safari). | Same row appears for us once Shopify Payments + PayPal are on; Shop Pay is the one that lifts mobile conversion most (returning Shop Pay users are pre-filled). Turn on Shop Pay, Apple Pay, Google Pay, PayPal — already in `LAUNCH-CHECKLIST.md` B. |
| Contact | "Email or mobile phone number", **"Email me with news and offers" pre-ticked**, "Sign in". | Pre-ticked marketing consent is against the ICO/PECR position on consent for consumers (must be an affirmative act). Leave ours unticked (Settings → Checkout → Marketing options). |
| Delivery | Country UK, name, address with lookup, city, postcode, phone optional, "Text me with news and offers" (unticked). | Standard. |
| Shipping method | "Enter your shipping address to view available shipping methods." | Standard. Ours will show "Standard tracked £3.95" / "Free over £30". |
| Payment | Credit card (+5 icons) · **Klarna** · **Shop Pay — Pay in full or in installments** · PayPal; "Remember me / Save my information for a faster checkout". | Klarna and Shop Pay Instalments are enabled on their Shopify Payments. Their minimums will not reach an £8–£18 single item; on a £30+ basket they might. Keep `INSTALMENTS.enabled` off until confirmed in Settings → Payments. |
| Order summary | Product, quantity badge, price, **"Discount code" field with Apply**, subtotal, shipping "Enter shipping address", total. | Standard. |
| Trust / policy links | Refund policy, Shipping, Privacy policy, Terms of service, Contact in the checkout footer. | These are the Shopify policy pages; ours are `#` placeholders today (change #9). |
| Weight | 13.6–14.5 MB and 6.4 s to `load` — 11.5 MB of it JavaScript (Shopify checkout runtime + GTM + PayPal). | Not ours to change; note that Shopify checkout itself is heavy, so the storefront should not be. |

Nothing beyond step 1 was exercised: no address entered, no payment attempted.

---

## 5. The three lists

### 5.1 What they do that we don't (VERIFIED, ranked by likely conversion impact for our store)

| # | Element | Where | Worth copying? |
|---|---|---|---|
| 1 | **Real express-checkout buttons** on the PDP ("Buy with Shop Pay" + "More payment options") and in the cart (Shop Pay, PayPal, G Pay). | PDP, cart, checkout | Yes — free with Shopify Payments; replace our four dummy buttons. |
| 2 | **Header search** (predictive: product name, price, image) and **Account** link. | Header | Yes — theme built-ins. |
| 3 | **Post-add pop-up with a discount deep link** ("Checkout now and save £10 — orders £75+", `/discount/NOW?redirect=/checkout`). | After add-to-cart | Mechanism yes, threshold no: for us the moment-of-add message is the £30 free-delivery gap and a one-tap add-on. |
| 4 | **One-tap add-on in the cart summary** (Mystery Gift Box). | Cart | Yes, as a named product (bow tie collar / bandana), no "worth over £50" claim. |
| 5 | **Ten real product videos** on the home page in phone frames. | Home | Yes — ours has the frames and no clips. |
| 6 | **Compact three-tile objection row** and **single-row 72 px mobile header with burger**. | PDP, all pages | Yes — the layout, not the copy. |
| 7 | **Variant pills and Add/Choose quick-add on product cards**; **image carousel with counter on cards**. | Collection, home, upsell grid | Pills yes; carousel optional. |
| 8 | **Comparison table** with "Why others chose" bullets and sticky headers. | Collection | Yes, as a 7-row "which one" table. |
| 9 | **Sticky order summary** on mobile cart. | Cart | Yes (CSS only). |
| 10 | **"Notify" flow that is honest** ("sends a request to Giant Paws; it is not an automatic back-in-stock subscription"). | Cards, PDP | Yes — our notify button is a toast placeholder. |
| 11 | **Sort by best selling**, in-stock filter. | Collection | Yes once orders exist. |
| 12 | Sold-out state still sells: "Notify · Ask about stock". | Cards | Yes. |
| 13 | **Google tag / Google Ads conversion tracking**, Klaviyo, Shopify Inbox. | All pages | Tracking yes (GA4 + Meta + TikTok via Customer Events); Klaviyo free tier or Shopify Email; Inbox yes. |
| 14 | **WhatsApp Business** number linked from the help pill and the home page. | All | Yes — `CONTACT.whatsapp` is blank. |
| 15 | Dark-mode toggle; `model-viewer` hooks; SEOAnt JSON-LD. | Header, PDP | No. |
| — | *Not worth copying and not lawful for us:* rolling per-visitor countdown; "4.9/5 from 5,000+ happy cat parents"; 20 theme-rendered reviews per new product; "Save £105.01" against compare-ats set on creation; "🔥 Running low" with no inventory; purchase-gated £1,500 weekly draw with no free route; pre-ticked marketing consent; "Surprise gift worth over £50" at £19.99. | | These are the friend's risks, not our patterns. |

### 5.2 What we do that they don't (VERIFIED from our code and render)

| # | Element | Where |
|---|---|---|
| 1 | **Neck-cm size finder** inside the fit card that picks the size button; per-size neck note; breed-to-size page; quiz step 3 takes cm or breed. | PDP, `breeds.html`, quiz |
| 2 | **Real delivery date window** ("Order today: arrives Tue 30 Sep – Thu 2 Oct") and a delivery price table in the objection card. | PDP |
| 3 | **Free-delivery progress bar** with the exact £ gap, delivery shown in the total. | Cart |
| 4 | **Bundle savings stated in £** on cards, PDP cross-sell and the home "save box"; bundle pages list contents. | Home, PDP, shop |
| 5 | **"Will my cat keep it on?" answered per product**, "This is for you if…", "worn or not" returns wording, "faces and eyes always clear". | PDP, home |
| 6 | **Supplier reviews with provenance**: source note, distribution, star filter, verified-purchase tag, date, country, size bought, star-only ratings; own reviews take precedence when they exist. | PDP |
| 7 | **Honest urgency**: a real Halloween order-by date with day count; Cat of the Month with a free entry route and no invented winners; empty UGC/video frames rather than filler. | Top bar, home, PDP |
| 8 | **Working sticky add-to-cart bar** that follows size selection. | PDP |
| 9 | Wishlist with a header count and a Saved page; recently viewed; category and size chip filters with URL state; product search box. | Shop, header |
| 10 | 10× lighter pages, 15× faster DOMContentLoaded, 21–25 requests. | All |
| 11 | Product JSON-LD with shipping and return policy, Organization JSON-LD with contact point. | PDP, home |
| 12 | Alias nicknames ("aka Kingsley"), which give the video content a character to build on. | PDP |

### 5.3 What neither does that buyers want (from `07-demand.md`)

| # | Buyer need (07 reference) | Evidence | Neither store has it |
|---|---|---|---|
| 1 | **Video of the product on a moving cat, above the fold** (§6b #1–2: "will my cat hate it", "is it cruel") | Reddit norm "five seconds, one photo, then treats"; 10–100× views on on-body video | GP has videos of furniture on the home page only, none on the PDP; we have empty frames. |
| 2 | **Plain safety and wear-time block**: breakaway explained with the trade-off, bell removable, kittens under ~9 months supervised, "a few minutes for a photo", wire-cored spider legs, not for lead use (§6b #4–5) | 6 supplier reviews on the buckle; "the bell" and "wire" in the negative word list; Amazon "quick release" autocomplete | GP: "30-day returns · conditions apply". CC: care line only; `confirm` notes are internal. |
| 3 | **"For cats" in every title/H1** (§1, finding 1) | 7 of 10 "cat costume" suggestions are human costumes; Amazon has "cat outfits for cats only" | GP is furniture (n/a). CC H1s are "Lion Mane", "Spider Costume". |
| 4 | **Gift note / gift message at checkout** and gift framing (§6a #6, §6c Christmas) | 4 supplier reviews "for a friend's cat"; Christmas is the strongest UK moment | Neither. Shopify cart attributes make this a 10-line change. |
| 5 | **Christmas last-posting date** in the announcement after 31 Oct, and stock-by-1-Nov messaging (§7 #1) | 80–100% of Christmas-set reviews Nov–Jan | GP: none. CC: `countdownHTML()` falls to a generic "Christmas is in" line with no date. |
| 6 | **Colour in the variant name and photographed on a cat** (§1b: black, blue, red, orange bow-tie searches) | Amazon autocomplete is colour-first for collars | GP n/a. CC bow tie has no colour variant; `confirm` still lists "which plaid colourways to stock". |
| 7 | **"Cats & small dogs"** on collars, bandana and spider (§7 #3) | Dog Halloween video views 10–100× cat | Neither store says it in a title. |
| 8 | **The honest-middle tone in copy** ("she hates it but it lasts five seconds") and a "she said no" return promise in the buy box (§6d) | Community's own framing outperforms "she loves it" | GP: "Loved in homes like yours". CC: close ("Put it on, get the shot, take it off") but not in the buy box. |
| 9 | **Own photo/video reviews with a request email** (§3) | Reviews with photos are the Amazon differentiator; GP's are theme text | GP: Loox installed, 2 reviews. CC: nothing installed. |
| 10 | **Birthday and wedding SKUs** (§6a #4, #8) | 2,024- and 667-upvote birthday-hat threads; Etsy "cat bow tie wedding" | Neither. |
| 11 | **A size guarantee in words**: "wrong size? swap free" (§6b #3: "too big / fell off") | Largest 1–3★ reason on the mane and collar listings | Neither. Our "30 days, worn or not" is close; say "free size swap" explicitly. |

---

## 6. Prioritised change list for Catwalk Club

Ordered by legal floor first, then conversion impact ÷ build effort. "Lever" is the funnel step it moves.

| # | Change | Lever | Build note for the developer |
|---|---|---|---|
| 1 | **Kill the expired launch offer today.** The LED reads 00D 00H 00M 00S on every page, every product shows the crossed-out list price, "You've saved £2.00" and "until Tue 22 Sept", and Product JSON-LD carries `priceValidUntil: 2026-09-22`. Either end it (prices to `list`) or set a real future `SALE.ends` and charge `list` after it. | Legal floor (DMCC Act 2024 reference pricing and false time-limits) | `data.js`: `SALE.active=false` and copy each `list` into `price`, **or** move `SALE.ends`. Then harden: `saleActive = () => SALE.active && Date.now() < new Date(SALE.ends)` in `site.js` so `priceHTML()`, `savedLine()`, `mountTicker()` and `productJsonLd()` all switch off at the deadline. Theme: same guard in `sale-ticker.liquid` and the price snippet; clear Compare-at on every variant when it ends. |
| 2 | **Mobile PDP: Add to cart within one screen.** Header to one 64 px row (logo, search, cart, burger); top bar scrolls; ticker off (see #1); objection cards become a single row of three tiles that open the existing content; gallery 360 px with swipe; order: gallery → title/rating/price → size → ATC → express → trust. | Mobile PDP conversion (ATC from 1,726 px to ~900 px, matching theirs) | `site.css` ≤640 px: `.nav .links` hidden behind a burger `<details>`; `.objections{display:grid;grid-template-columns:repeat(3,1fr)}` with `summary` as icon + label + "+", content rendered below the buy box; `mountGallery()` adds `scroll-snap-type:x mandatory` on `.main`. Theme: same in `main-product.liquid`; use the section's media gallery for swipe/zoom. |
| 3 | **Film and mount the seven on-body clips (10–20 s, phone, real cats) and put one at the top of each PDP gallery and in the five home frames.** Clasp pop for the bow tie; mane going on and the cat walking; cape and spider on a moving cat; "she hates it, five seconds" tone. | PDP conversion; answers objections #1–2; content for TikTok/IG at the same time | Shopify: product media (video first); static: `p.videos=["assets/video/lion-mane.mp4"]` renders in the existing `<video muted loop playsinline>` block — move that block into the gallery as slide 1; `HOME_VIDEOS` entries fill `videoRow()`. |
| 4 | **Cart drawer on add-to-cart with the free-delivery gap and one one-tap add-on.** "Lion Mane added · Spend £20.01 more for free delivery · Add the Bow Tie Collar £8.99 → free delivery" ; Checkout + express buttons in the drawer. | AOV (the £30 threshold is our version of their £10-off-£75); fewer cart-page bounces | Static: replace `toast()` in `addToCart()` callers with `openDrawer()` that renders the `cart.html` summary block plus one `xcard`; pick the add-on as the cheapest live product not in the cart that closes the gap. Theme: `cart-drawer` section with `cart.total_price` vs `settings.free_shipping_threshold * 100` and `additional_checkout_buttons`. |
| 5 | **Safety and wear block on every product.** Breakaway explained with the trade-off; bell removable (make it so); kittens under ~9 months supervised; "on for the photo, then off"; spider legs wire-cored, supervised, not for chewers; not for lead use. No comfort or welfare *claims*. | Trust; return-rate; ASA-safe | `data.js`: `safety: []` per product; render as a fourth tick group under `tickList()` and inside "Is it right for my cat?"; theme metafield `custom.safety` (list). |
| 6 | **Gift message field and Christmas cut-off.** Optional 140-char gift note in the cart/drawer (cart attribute); after 31 Oct the top bar reads "Order by [Royal Mail last 2nd-class date] for Christmas — N days left". | Christmas conversion (strongest UK moment) | Shopify: `<textarea name="attributes[Gift message]">` in the cart form; `countdownHTML()` gets `CHRISTMAS = { cutoff: "2026-12-1x" }` (confirm the Royal Mail date in `01-maths.md`/policy) and the same branch logic as Halloween. |
| 7 | **Size pills on sized product cards** (Bandana, Lion Mane, Cape, Spider, two bundles) so "Pick size" becomes a one-tap add. | Collection → cart rate | `quickAdd()`: for `p.sizes` render `<button data-qs="S">S</button>…` that calls `addToCart(p.id, size, 1)`; theme: variant radios in the card form. |
| 8 | **"Which one?" table on the shop page and home**: one row per product — occasion · what the cat wears (collar / hat / body) · sizes · from £ · Add. | Findability for first-time buyers; matches their compare table at our scale | Static: build from `PRODUCTS` + `WEAR` + `CATEGORIES` in `shop.html` above the grid (`<table class="mini-table">`, sticky `<th>`); theme: section with product blocks. |
| 9 | **Real trader identity and policies before the first order.** Trader name, address and email in the footer and Contact page; Shipping, Refund, Terms, Privacy as Shopify policy pages replacing the four `#` links; remove "Placeholder terms — confirm before trading" from the PDP accordion and the "Demo storefront" line. | Legal (Consumer Contracts Regulations); checkout trust | Footer `Legal` → `/policies/shipping-policy` etc.; `ORG` JSON-LD gets `address`; `detailsAccordions()` string cleanup. |
| 10 | **Label the card rating as the maker's listing rating** until own reviews exist, and install Judge.me (free) with photo/video review requests so real reviews replace it. | Trust without implying own reviews (DMCC: no misleading review presentation) | `cardRating()`: append `<span class="muted">maker's listing</span>` or a `title` attribute; keep `REVIEWS` precedence; Judge.me app block on PDP + collection badge. |
| 11 | **Turn on the real payment stack and delete the dummies.** Shopify Payments + Shop Pay + Apple/Google Pay + PayPal; `payment_button` on the PDP; `additional_checkout_buttons` in the cart; hide the Klarna icon and keep `INSTALMENTS.enabled=false` until Settings → Payments confirms a minimum we can actually reach. Marketing consent at checkout unticked. | Checkout completion, especially mobile Shop Pay users | Theme `main-product.liquid` `{{ form \| payment_button }}`; remove `expressRow()` from the static preview or keep with its caption; `PAYMENT_ICONS` filtered to what is switched on. |
| 12 | **Analytics before launch** (GA4 + Meta + TikTok pixels via Customer Events, UTM discipline), and ask the friend what the Google tag is doing — Google Ads conversion tracking implies spend or planned spend, and their Google Ads figures are the most useful numbers they can share. | Attribution for the organic plan; informs the ads-from-sales decision | Settings → Customer events; no theme code. Add "Google Ads spend and ROAS" to the question list in `02-giantpaws.md` §10. |
| 13 | **Header search, account link, honest notify-me.** Predictive search in the header; account icon; "Notify" opens a short email form that says it is a manual reply, or use Shopify's free back-in-stock flow. | Findability; returning customers; captures demand on sold-out sizes | Theme: `predictive-search` section, `routes.account_url`; static: search input in `.nav` → `shop.html?q=` with `paint()` reading `q`. |
| 14 | **"For cats" in titles and H1s; "cats & small dogs" on collars, bandana and spider; colour variants for the bow tie photographed on a cat.** | Search-intent match (07 finding 1); reach (07 §7 #3); colour-first collar demand | `data.js` `name` fields ("Lion Mane for Cats", "Spider Costume for Cats & Small Dogs"); `options: Colour` once stock is decided; JSON-LD and `document.title` follow `p.name`. |
| 15 | **Responsive images** (400/800 px WebP + `srcset`/`sizes`) and lazy-load below the fold. | Keep the 10× speed edge once Shopify adds its runtime | Build step with `sharp`; `productImg()` emits `srcset`; theme uses `image_url: width` + `srcset`. |
| 16 | **Sticky cart summary on mobile** and a "Log in to check out faster" line in the empty cart. | Cart completion | `.summary{position:sticky;top:120px}` on ≤960 px (currently forced static); theme cart template. |
| 17 | **WhatsApp number and Shopify Inbox.** | Pre-purchase questions (sizing is the #1 question) | `CONTACT.whatsapp`; install Inbox and hide `.chat-fab` when its widget is present. |
| 18 | **Wire the newsletter and pop-up forms** to Shopify Email or Klaviyo free tier, with WELCOME10 created as a real once-per-customer discount. | Email capture (their pop-up and ours are both promising a code) | Shopify Forms app or Klaviyo embed replaces the `onsubmit` toast in `index.html` and `initOffer()`. |

---

## 7. Blocked / not settled

| Item | What happened | What was used instead |
|---|---|---|
| Their traffic, conversion rate, AOV, order count, ad spend | Not on any public page; the friend has not yet sent them | 02-giantpaws.md §9 ESTIMATE (2–3 furniture orders/day at £300/day) stands; the new Google Ads tag is a question to add |
| Loox per-product count via the widget JSON endpoint | `loox.io/widget/t9khQVjOTe/reviews/<id>` returns the widget shell, not a count | 02-giantpaws.md read the rendered widget (0 for Silver Lodge; 2 store-wide); today's PDP render confirms the review block is theme HTML (`gp-reviews__*`), not Loox markup |
| Their sticky add-to-cart bar and Klaviyo/theme pop-up timing | Neither became visible in the headless run (7 s settle, scroll not simulated on the PDP) | Presence verified in HTML; behaviour ESTIMATED as "shows on scroll / on exit or delay" |
| Checkout beyond step 1 (shipping options, Klarna minimum, order confirmation) | Not attempted — no address entered, no payment; that would be placing an order | Payment methods list and instalment providers read from the rendered step 1 |
| Our TTFB and real-device Core Web Vitals | Static site served locally; cannot be measured until the theme is on Shopify | Chromium decoded-bytes and DOM timings for both sites |
| `/pages/track-your-order` | Their footer link returns 404 | Noted as a defect on their side |
