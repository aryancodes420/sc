# Catwalk Club — launch checklist

Everything between where the repo is now and a Shopify store that can take an order.
Ticked items are done in the repo. Everything else is yours, in roughly this order.
Dates assume a Halloween launch: customers stop ordering around **mid-October**.

---

## A · Stock — this week, before anything else

- [ ] Open each of the seven listings and check the seller: **feedback ≥ 95%, store open > 1 year, a UK delivery date showing.** (`sourcing.md` has the links.)
- [ ] Confirm the nine open items on the listings (`site/README.md` → *Before ordering*): exact neck ranges, plaid colourways to stock, bat cape chart digits.
- [ ] **Place the bulk order** — 20 units per variant, 25 of the bow tie collar. China-direct is 10–20 days. Every day this slips shortens the Halloween window.
- [ ] Bandana collar: dropship from the UK-stocked listing (no stock to hold).
- [ ] Optional but wise: one sample of each, to your door, to see quality before the boxes land.

## B · Shopify account

- [ ] Create the store (Basic plan). Set **currency GBP**, country UK, timezone.
- [ ] Buy or connect the domain.
- [ ] **Settings → Payments:** enable Shopify Payments; turn on **Shop Pay, Apple Pay, Google Pay**; add PayPal. The product page's express buttons only appear once these are on.
- [ ] **Klarna** (inside Shopify Payments): switch it on so the "Pay in 3" line renders on product pages and in the cart. It only appears on baskets over Klarna's minimum.
- [ ] **Settings → Taxes:** UK VAT (register if/when required; charge VAT-inclusive prices either way).
- [ ] **Settings → Shipping:** one UK zone. Standard £3.95; **free over £30**. These must match the theme settings below and the product-page table.
- [ ] Settings → Checkout: guest checkout on, email marketing opt-in checkbox on.

## C · Theme

- [x] Theme built and passing `theme-check` (`theme/`).
- [ ] `cd cat-costumes/theme && shopify theme push --unpublished`, then preview it.
- [ ] **Theme settings:** free-delivery threshold `30`, delivery cost `£3.95`, returns `30`, footer tagline, logo, favicon.
- [ ] **Menus:** `main-menu` (Shop, Fit & care, FAQ) and `footer` (Everyday, Halloween, Christmas, Bundles, Fit & care, FAQ, Track your order, Contact, About, legal pages).
- [ ] **Collections:** `everyday`, `halloween`, `christmas`, `bundles`, plus Shopify's built-in *All*. Point the four homepage tiles and the two featured-product sections at them in the editor.
- [ ] **Pages:** *Fit & care* (`page.sizing`), *FAQ* (`page.faq`), *Contact* (`page.contact`), *Track your order* (`page.track-order`), *About* (`page.about`), *Which costume? quiz* (`page.quiz` — assign the seven products to its blocks), *Sizes by breed* (`page.breeds` — pick the four sized products), *Cat of the Month* (`page.photo-draw` — fill in the promoter line). All pre-filled.
- [ ] **Blog:** paste the three drafts from `content/blog/` in as articles (measuring, sizes by breed, keeping it on). Link the blog in the footer menu.
- [ ] **Size collections:** automated *Fits S / Fits M / Fits L* (variant title equals S/M/L) and *One size* (tag `one-size`); they appear as shop filters automatically.
- [ ] **Homepage:** point *Save by bundling* at the bundles collection; assign the seven products to the quiz blocks; leave *Your cats, dressed* and the winners podium empty until real photos exist.
- [ ] **Product template:** set the competition page link on the *Product* section (pill on the photo) and the *Competition block*; assign the seven products to the product-page quiz blocks.
- [ ] **Announcement bar:** confirm the order-by date (14 Oct) matches what the supplier lead time actually allows once stock is in.
- [ ] **Launch offer:** set the deadline under Theme settings → Launch offer (same moment for everyone). The red LED ticker and the "until" line on product pages run off it and vanish when it passes.
- [ ] **When the offer ends (manual, nothing automatic):** turn the ticker off in Theme settings, then on every variant set Price to the regular price and clear Compare-at. Do it the same day the ticker hits zero — a strike-through left up after the deadline is the thing the CMA fines.
- [ ] **Theme settings → Contact & chat:** contact email, WhatsApp number if you want the WhatsApp button, hours. Point the contact and size-guide links at the pages above.
- [ ] Publish the theme when the products are in.

## D · Products — the seven

- [x] Catalogue, specs, sizes, care, in-the-box and 42 photos are all in `site/assets/data.js` and `site/assets/img/`.
- [ ] Create the seven products. For each: title, blurb → description, **variants** (option `Size`: S/M/L, or S/M) with **Price = launch price and Compare-at = regular price** (table below), upload its six photos, set inventory tracking on.
- [ ] Metafields (namespace `custom`): `fit`, `blurb`, `ticks` (list), `for_me_if` (list), `alias` (optional nickname), `specs` (list), `box` (list), `care`, `size_notes` (one line per variant), `badge`, `badge_uk` (bandana only). Values are all in `data.js` (`ticks`, `forMeIf`, `alias`).
- [ ] Cross-sell metafields: on each product, `bundles` → the bundle products it sits in; on each bundle, `contains` → its two components. That is what draws the "Cheaper together" cards with the saving.
- [ ] Assign each product to its collection.
- [ ] **Lifestyle videos:** film a 10–20 second clip of each product on a cat and add it as product media. The product page shows videos automatically when they exist. No videos exist yet — this is the one content item still to be made.

## E · Bundles — the four

- [ ] Install the free **Shopify Bundles** app and build the four bundles below from their component products, so bundle stock draws down the real stock.
- [ ] Set the bundle prices; each saves £1.99 against its components.

## F · Apps

- [ ] **Judge.me or Loox** (reviews) — add its app block to the product page's *Reviews* slot in the theme editor. Photo reviews (Loox) suit this shop best. The rating line under the title fills itself once real reviews exist. Never seed reviews by hand (DMCC Act 2024).
- [ ] **Shopify Bundles** — above.
- [ ] **First-order offer:** Discounts → create code `WELCOME10`, 10% off, once per customer, new customers only. Then Shopify Email → Automations → *Welcome new subscriber*, sending the code to customers tagged `welcome10`. The pop-up is already in the theme.
- [ ] **Shopify Inbox** (free) for chat — then turn off the theme's "Help me choose" button in Theme settings; or keep the theme button and add a WhatsApp Business number instead.
- [ ] Optional: a tracking app (Parcel Panel or Track123, free tiers) and paste its page URL into Theme settings → Orders & stock, so the Track your order page looks orders up directly.

## G · Legal & policy

- [ ] Generate **Refund, Privacy, Terms, Shipping** policies from Settings → Policies (Shopify provides UK templates), then link them in the footer menu.
- [ ] Put the returns window and shipping terms in the policies exactly as the site states them (30 days, £3.95 / free over £30).
- [ ] Business details on the About page's *Business details* box and the contact page (trader name, address, email) — a UK legal requirement for distance selling.
- [ ] Cookie consent banner (Shopify's built-in, Settings → Customer privacy).

## H · Before flipping the switch

- [ ] Place a **test order** with Shopify's Bogus Gateway, then a real £1 order and refund it.
- [ ] Test Apple Pay on an iPhone and Shop Pay on desktop.
- [ ] Check every product page on a phone: gallery, objection cards, size picker + stock pill, express checkout buttons, sticky add-to-cart, videos, reviews slot, details, cross-sell.
- [ ] Test the offer pop-up end to end: sign up, check the customer appears tagged `welcome10`, check the welcome email arrives with a working code.
- [ ] Send a test message through the Contact page and confirm it lands in the store email.
- [ ] Connect Google Analytics 4 and the Meta pixel (Settings → Customer events / channels).
- [ ] Remove the password page. Set the launch date to the day the stock lands.

## I · After stock lands

- [ ] Count in, set inventory quantities per variant.
- [ ] Photograph your own cat in three of the seven (own imagery, not the supplier's, for ads).
- [ ] Open the first *Cat of the Month* round (1 October) and post it on Instagram/TikTok; the first winner's photo becomes the first frame on the homepage wall.
- [ ] First email to the list. Ads start only once you have the above.

---

## The seven — launch offer and regular prices

The store opens on a **launch offer** with one fixed deadline (`SALE.ends` in `data.js`,
*Theme settings → Launch offer* on Shopify; currently **22 Sept 2026, 23:59 UK**). While it runs
the launch price is charged and the regular price shows crossed out with the saving. **Nothing
switches by itself.** When the ticker reaches zero it sits at 00D 00H 00M 00S until you end the
offer by hand: set `SALE.active` to `false` and move each `price` to its `list` figure in
`data.js`; on Shopify turn the ticker off, set each Price to the regular figure and clear
Compare-at. **The regular price has to be what you actually charge afterwards** — that is what
makes the strike-through true.

| Product | Launch price | Regular price | Saving | Sizes | Collection |
|---|---|---|---|---|---|
| Bow Tie Collar | £8.99 | £10.99 | 18% | adjustable | Everyday |
| Bandana Collar *(UK stock)* | £7.99 | £9.49 | 16% | S / M / L | Everyday |
| Lion Mane | £9.99 | £11.99 | 17% | S / M / L | Halloween |
| Devil Bat Cape | £12.99 | £15.49 | 16% | S / M / L | Halloween |
| Spider Costume | £12.99 | £15.49 | 16% | S / M | Halloween |
| Pumpkin Hat & Ruffle Collar | £11.99 | £14.49 | 17% | one size | Halloween |
| Santa Hat & Scarf Set | £17.99 | £21.49 | 16% | one size | Christmas |

On Shopify: **Price = launch price, Compare-at price = regular price**, on every variant.

## The four bundles

| Bundle | Contents | Launch price | Regular price | Saving | vs buying separately |
|---|---|---|---|---|---|
| Halloween Pair | Devil Bat Cape + Spider Costume | £23.99 | £28.99 | 17% | £1.99 |
| Pumpkin Patch | Pumpkin Hat & Ruffle Collar + Bow Tie Collar | £18.99 | £23.49 | 19% | £1.99 |
| First Costume Kit | Bow Tie Collar + Bandana Collar | £14.99 | £18.49 | 19% | £1.99 |
| Festive Pair | Santa Hat & Scarf Set + Bow Tie Collar | £24.99 | £30.49 | 18% | £1.99 |

Each bundle stays £1.99 cheaper than its two pieces both during and after the offer.
