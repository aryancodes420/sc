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
- [ ] **Settings → Payments:** enable Shopify Payments; turn on **Shop Pay, Apple Pay, Google Pay**; add PayPal. The product page's "Buy now" button only appears once these are on.
- [ ] **Settings → Taxes:** UK VAT (register if/when required; charge VAT-inclusive prices either way).
- [ ] **Settings → Shipping:** one UK zone. Standard £3.95; **free over £30**. These must match the theme settings below and the product-page table.
- [ ] Settings → Checkout: guest checkout on, email marketing opt-in checkbox on.

## C · Theme

- [x] Theme built and passing `theme-check` (`theme/`).
- [ ] `cd cat-costumes/theme && shopify theme push --unpublished`, then preview it.
- [ ] **Theme settings:** free-delivery threshold `30`, delivery cost `£3.95`, returns `30`, footer tagline, logo, favicon.
- [ ] **Menus:** `main-menu` (Shop, Fit & care, FAQ) and `footer` (Everyday, Halloween, Christmas, Bundles, Fit & care, FAQ, legal pages).
- [ ] **Collections:** `everyday`, `halloween`, `christmas`, `bundles`, plus Shopify's built-in *All*. Point the four homepage tiles and the two featured-product sections at them in the editor.
- [ ] **Pages:** *Fit & care* (template `page.sizing`, collection setting → All) and *FAQ* (template `page.faq`, ten questions pre-filled).
- [ ] Publish the theme when the products are in.

## D · Products — the seven

- [x] Catalogue, specs, sizes, care, in-the-box and 42 photos are all in `site/assets/data.js` and `site/assets/img/`.
- [ ] Create the seven products. For each: title, blurb → description, **variants** (option `Size`: S/M/L, or S/M) with the launch prices, upload its six photos, set inventory tracking on.
- [ ] Metafields (namespace `custom`): `fit`, `specs` (list), `box` (list), `care`, `size_notes` (one line per variant), `blurb`, `badge`, `badge_uk` (bandana only). Values are all in `data.js`.
- [ ] Assign each product to its collection.
- [ ] **Lifestyle videos:** film a 10–20 second clip of each product on a cat and add it as product media. The product page shows videos automatically when they exist. No videos exist yet — this is the one content item still to be made.

## E · Bundles — the four

- [ ] Install the free **Shopify Bundles** app and build the four bundles below from their component products, so bundle stock draws down the real stock.
- [ ] Set the bundle prices; each saves £1.99 against its components.

## F · Apps

- [ ] **Judge.me** (reviews) — add its app block to the product page's *Reviews* slot in the theme editor. Never seed reviews by hand (DMCC Act 2024).
- [ ] **Shopify Bundles** — above.
- [ ] Shopify Email or Klaviyo — connect the newsletter form.

## G · Legal & policy

- [ ] Generate **Refund, Privacy, Terms, Shipping** policies from Settings → Policies (Shopify provides UK templates), then link them in the footer menu.
- [ ] Put the returns window and shipping terms in the policies exactly as the site states them (30 days, £3.95 / free over £30).
- [ ] Business details in the footer / contact page (trader name, address, email) — a UK legal requirement for distance selling.
- [ ] Cookie consent banner (Shopify's built-in, Settings → Customer privacy).

## H · Before flipping the switch

- [ ] Place a **test order** with Shopify's Bogus Gateway, then a real £1 order and refund it.
- [ ] Test Apple Pay on an iPhone and Shop Pay on desktop.
- [ ] Check every product page on a phone: gallery, size picker, Buy now button, videos, reviews slot, details.
- [ ] Connect Google Analytics 4 and the Meta pixel (Settings → Customer events / channels).
- [ ] Remove the password page. Set the launch date to the day the stock lands.

## I · After stock lands

- [ ] Count in, set inventory quantities per variant.
- [ ] Photograph your own cat in three of the seven (own imagery, not the supplier's, for ads).
- [ ] First email to the list. Ads start only once you have the above.

---

## The seven — products and prices

| Product | Price | Sizes | Collection |
|---|---|---|---|
| Bow Tie Collar | £8.99 | adjustable | Everyday |
| Bandana Collar *(UK stock)* | £7.99 | S / M / L | Everyday |
| Lion Mane | £9.99 | S / M / L | Halloween |
| Devil Bat Cape | £12.99 | S / M / L | Halloween |
| Spider Costume | £12.99 | S / M | Halloween |
| Pumpkin Hat & Ruffle Collar | £11.99 | one size | Halloween |
| Santa Hat & Scarf Set | £17.99 | one size | Christmas |

## The four bundles

| Bundle | Contents | Price | Saves |
|---|---|---|---|
| Halloween Pair | Devil Bat Cape + Spider Costume | £23.99 | £1.99 |
| Pumpkin Patch | Pumpkin Hat & Ruffle Collar + Bow Tie Collar | £18.99 | £1.99 |
| First Costume Kit | Bow Tie Collar + Bandana Collar | £14.99 | £1.99 |
| Festive Pair | Santa Hat & Scarf Set + Bow Tie Collar | £24.99 | £1.99 |
