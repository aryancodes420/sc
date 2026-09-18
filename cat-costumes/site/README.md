# Catwalk Club — storefront

A working cat-costume shop for the seven launch products. Plain HTML, CSS and JavaScript —
no build step, no framework, no dependencies.

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## The seven

| Product | Retail | Landed | Gross | Margin | Sizes |
|---|---|---|---|---|---|
| **Bow Tie Collar** | £8.99 | £1.82 | £7.17 | 80% | One size |
| **Bandana Collar** | £7.99 | £2.88 | £5.11 | 64% | S/M/L |
| **Lion Mane** | £9.99 | £5.17 | £4.82 | 48% | S/M/L |
| **Devil Bat Cape** | £12.99 | £5.49 | £7.50 | 58% | S/M/L |
| **Spider Costume** | £12.99 | £5.86 | £7.13 | 55% | S/M |
| **Pumpkin Hat & Ruffle Collar** | £11.99 | £7.33 | £4.66 | 39% | One size |
| **Santa Hat & Scarf Set** | £17.99 | £10.96 | £7.03 | 39% | One size |

Every spec bullet, size figure and "in the box" line on the site was read from the
supplier listing's own title or its product photos (the size-chart images). Nothing is
invented. The full record — including supplier IDs, costs and what still needs confirming —
is `assets/data.js`.

### Bundles
- **Halloween Pair** — £23.99 (components £25.98, saves £1.99)
- **Pumpkin Patch** — £18.99 (components £20.98, saves £1.99)
- **First Costume Kit** — £14.99 (components £16.98, saves £1.99)
- **Festive Pair** — £24.99 (components £26.98, saves £1.99)

## Photography

`assets/img/` holds **six real product photos per product (42 total, 3.1 MB)**, pulled from
each supplier listing at 800px. These are the supplier's own listing images, used the way
every dropship store uses them; replace them with your own photography over time, and don't
use them anywhere the supplier could object to (paid ads with their watermark, etc.).
The bat cape's lead image was reordered so a clean cat photo shows first — one of the
supplier's shots has their own text baked in.

## Before ordering — confirm these on the listings

- **Bow Tie Collar** — Exact adjustable neck range (cm)
- **Bow Tie Collar** — Which plaid colourways to stock
- **Bandana Collar** — Whether the buckle is a breakaway type — listing photos show a standard side-release buckle
- **Bandana Collar** — Listing photos are of dogs; consider a cat-specific bandana later
- **Lion Mane** — Colour options (listing shows a natural tan)
- **Devil Bat Cape** — Size-chart figures were read from a small photo — confirm S/M/L length, width and neck on the listing before printing them
- **Pumpkin Hat & Ruffle Collar** — The same listing offers a Christmas-tree hat with red/green ruffle — a candidate for the Christmas slot
- **Santa Hat & Scarf Set** — Hat and scarf dimensions (cm)

## Pages

| File | What it does |
|---|---|
| `index.html` | Hero (real photo), four tiles, all seven, four bundles, fit + why panels, newsletter |
| `shop.html` | Everything with filters (Everyday / Halloween / Christmas / Bundles), search and sort |
| `product.html` | `?id=<id>` — six-photo gallery, size picker with per-size neck note, what you get, in the box, size & fit, materials & care, delivery & returns, wear tips, related |
| `cart.html` | Lines carry size; free-delivery progress; totals |
| `sizing.html` | Fit & care — how to measure, every size we sell in one table, care per product, returns |
| `faq.html` | Ten questions for this range |
| `wishlist.html` | Saved items (per-browser) |

## Verified

Headless Chromium, after the rebuild: 7 products and 4 bundles render on the homepage,
all 42 images load (no broken `<img>` on any page), Halloween filter returns 4, search
finds the three velcro products, price sort ascends, the lion mane gallery switches between
its six photos, S/M/L buttons show the right neck note, add-to-cart carries the size, cart
totals reconcile (£43.97 then £31.98 after a removal), one-size products show no size
picker, bundles with sized components offer S/M, unknown ids show a not-found page,
wishlist persists across pages, Fit & care renders 14 size rows and 7 care rows, FAQ has
10 entries, no console errors, no horizontal overflow on five pages at 390px.

## Still to do before this sells anything

1. **Pricing is set** (18 Sep 2026) at the top of the mainstream tier — level with Pets at Home /
   Petco, 1.5–2.5× Amazon, below specialists. Rationale and anchors in `../sourcing.md`.
2. **Confirm the list above** on each listing before placing the bulk order.
3. **Payments, legal pages, reviews app.** Unchanged.
