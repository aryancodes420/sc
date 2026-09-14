# Catwalk Club — storefront

A working cat-costume shop. Plain HTML, CSS and JavaScript — no build step, no framework,
no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Pages

| File | What it does |
|---|---|
| `index.html` | Hero, four category tiles, eight bestsellers, size finder, honesty panel, newsletter |
| `shop.html` | All 16 products with category filters. Deep-links via `?cat=holiday` etc. |
| `product.html` | Per-product page via `?id=<product-id>`. Size picker, quantity, add to cart, size chart, related items |
| `cart.html` | Line items, quantity controls, remove, free-delivery progress, totals |
| `sizing.html` | Size finder with breed presets, how to measure, full chart, safe-wear guidance, returns |
| `faq.html` | Ten honest answers, including "will my cat actually wear this?" |
| `wishlist.html` | Saved items (per-browser, localStorage) |

## Where things live

- **`assets/data.js`** — the entire catalogue, size chart and free-delivery threshold.
  Edit this one file to change products or prices; every page reads from it.
- **`assets/site.js`** — SVG artwork generator, cart (localStorage), rendering, size finder.
- **`assets/site.css`** — design system. Colours and radii are CSS custom properties at the top.
- **`assets/fonts/`** — self-hosted Fredoka + Nunito. See `NOTICE.md`.

## Built against the competition

See [`../competitors.md`](../competitors.md) for the measured analysis. Features adopted from
**Clothes for Cats** (the UK category owner) and **PIKAPIKA** (the premium benchmark):

- One-line **fit statement** on every product
- **Four measurements** — neck, chest, waist, back — in **cm and inches** with a live toggle
- **Materials & care** and a **delivery & returns** table, per product, in accordions
- **Multi-view gallery**, **reviews** section, **wishlist**, **search and sort**, trust badges

Where this site goes further: an interactive **size finder** (they publish static tables
only), **seven breed presets** for people without a tape measure, and a gallery that shows
*where to measure* and *how the breakaway buckle works* rather than ten photos of the same
jumper.

The reviews section renders an honest empty state. No invented testimonials — wire it to
Judge.me or Loox (both competitors use Judge.me) once real orders exist.

## Verified

Checked in headless Chromium: all 16 products render, category filters work, size selection
and quantity work, cart maths are correct (including the £30 free-delivery threshold and the
£3.95 charge below it), removal works, an unknown product id shows a proper not-found state,
no console errors, brand fonts load, and there is no horizontal overflow at 390px wide.

Re-verified after the competitor upgrade: 3 gallery views switch, 4 product accordions open,
the size table carries a waist column, the cm→inch toggle converts (`28–33cm` → `11–13"`),
search and price sort work, all 7 breed presets resolve to a size, the wishlist persists
across pages, the FAQ renders 10 entries, and cart maths still reconcile.

## The artwork is not real

Every product image is a **generated SVG cat**, drawn by `catArt()` in `site.js`. It exists so
the site doesn't render as a grid of broken images while you have no photographs.

**It is not a substitute for product photography.** Replace it before you show this to a
customer — swap the `.art` blocks for `<img>` tags. This is the same blocker that has held up
The Dog Nook, and it will decide your launch date here too.

## Before this takes a single order

1. **Photography.** As above. Nothing else matters until this is done.
2. **Prices.** Every price is invented. Replace with landed cost + margin.
3. **Payments.** The checkout button is deliberately inert — it says so rather than faking a
   flow. Connect Shopify, Stripe or similar.
4. **Legal pages.** Shipping, refunds, terms, privacy and cookies are all `#` placeholders.
   The Dog Nook's versions are a good starting point but must be rewritten for this business.
5. **Policy claims.** "Free UK delivery over £30", "30-day returns, worn or not" and "£3.95
   delivery" are placeholders in `data.js` and the page copy. Make them true or change them.
6. **Product claims.** The copy deliberately avoids saying a costume calms, comforts or settles
   a cat — those are health claims and the ASA treats them as such. Keep it that way.

## Porting to Shopify

The structure maps over directly: `PRODUCTS` becomes products with size variants, `CATEGORIES`
become collections, the two bundles become bundle products, and `sizing.html` becomes a page
linked from every product. The CSS is portable as-is.
