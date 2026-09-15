# Cat costumes store — launch pack

Decisions and starting content for the cat costume shop. This is a **separate business
from The Dog Nook** — nothing here shares its catalogue, theme, or positioning.

> **The shop is built and working: [`site/`](site/).** Open `site/index.html` in a browser,
> or `cd site && python3 -m http.server 8000`. See [`site/README.md`](site/README.md) for
> what's verified and what must be replaced before it takes an order.
>
> Brand: **Catwalk Club** — *"Seriously cute costumes for cats."*
>
> Competitor analysis (measured from their live catalogues): [`competitors.md`](competitors.md).
>
> Supplier research for the launch 10 (live listings + supplier sites, 14 Sep 2026): [`sourcing.md`](sourcing.md).
>
> **Shopify theme: [`theme/`](theme/)** — a complete standalone theme carrying this design.
> Passes Shopify's own `theme-check` with 0 offenses. `shopify theme push --unpublished`.

> Prices are in GBP on the assumption this trades in the UK like The Dog Nook.
> If the new store is set to another currency, re-point the ladder rather than
> converting these numbers literally.

---

## 1. Store preview inputs

These are the exact fields used to generate the storefront previews. Keep them —
regenerating with tweaked wording is the cheapest way to get a different look.

| Field | Value |
|---|---|
| **Sells** | cat costumes, holiday seasonal, cute everyday, novelty funny, bandanas, hats |
| **For** | young online cat owners, gift buyers, devoted cat parents, all ages |
| **Style** | playful, colourful, bright pastels, rounded bubbly type, fun, toy-like |

**A preview can only be claimed as a brand-new store.** It cannot be applied to an
existing one, and signing up through a preview link creates a real store.

---

## 2. The launch seven

The original fourteen-SKU draft was replaced by seven sourced, photographed, verified
products. The site and the Shopify theme are built around exactly these.

| Product | Retail | Sizes | Supplier cost | Sold | Rating |
|---|---|---|---|---|---|
| **Bow Tie Collar** | £8.99 | One size / adjustable | $1.09 | 5,000+ | 4.8 |
| **Bandana Collar** | £7.99 *(placeholder)* | S/M/L | $2.37 | 1,000+ | 4.7 |
| **Lion Mane** | £11.99 | S/M/L | $4.20 | 700+ | 4.6 |
| **Devil Bat Cape** | £10.99 | S/M/L | $4.54 | 1,000+ | 4.6 |
| **Spider Costume** | £12.99 *(placeholder)* | S/M | $4.93 | 500+ | 4.6 |
| **Pumpkin Hat & Ruffle Collar** | £9.99 *(placeholder)* | One size / adjustable | $6.48 | 77 | 4.6 |
| **Santa Hat & Scarf Set** | £17.99 *(placeholder)* | One size / adjustable | $10.73 | 106 | 4.7 |

Bundles:
- **Halloween Pair** — Devil Bat Cape + Spider Costume → £21.99 (from £23.98)
- **Pumpkin Patch** — Pumpkin Hat & Ruffle Collar + Bow Tie Collar → £16.99 (from £18.98)
- **First Costume Kit** — Bow Tie Collar + Bandana Collar → £14.99 (from £16.98)
- **Festive Pair** — Santa Hat & Scarf Set + Bow Tie Collar → £24.99 (from £26.98)

Full record with supplier IDs: `site/assets/data.js`. Sourcing history: `sourcing.md`.

## 3. Sizing

Everything in the launch range is a collar, a hat, a mane or a short cape, so sizing is a
**neck measurement**, not chest girth. The lion mane, bat cape, spider and bandana collar
come in S/M/L (spider S/M); the rest adjust. Every size, read from each product's own size
chart, is on the site's Fit & care page.

## 4. Welfare copy — get this right before launch

Cats tolerate clothing far less readily than dogs. Handled honestly this builds trust;
handled carelessly it invites complaints.

**Do:**
- Sell on fit, fabric and photos — things you can actually show.
- State plainly that costumes are for **short, supervised wear**.
- Note that some cats simply will not wear anything, and keep returns easy on that basis.
- Use breakaway or adjustable fastenings and say so.

**Don't:**
- Claim a costume calms, comforts, soothes or reduces stress. Those are health claims and
  the ASA treats them as such — the same trap already flagged in The Dog Nook's `STATUS.md`.
- Show a costume covering the face, ears or restricting the legs.
- Imply all-day wear.

Nothing should have small detachable parts a cat can swallow.

---

## 5. Timing

Halloween is the peak by a wide margin, and pet-costume buying concentrates in the
**two weeks before 31 October**. Christmas is second. Both need stock landed and product
photography done well before the spike — ads into an unphotographed catalogue waste money.

Everyday lines (bandanas, collars, jumpers) are what keep revenue alive between spikes;
they are the reason not to build a Halloween-only shop.

---

## 6. Next steps

1. **Look at the site** — `cd site && python3 -m http.server 8000`.
   Tell me what to change: name, colours, copy, products, prices.
2. **Get real photography.** As with The Dog Nook, this is the blocker that decides the
   launch date. The site currently draws illustrated placeholder cats so nothing appears
   broken, but they are not sellable product images.
3. **Replace every price** with your real landed cost + margin.
4. **Connect payments and write the legal pages** before taking a single order.

### On the Shopify route

The store-preview tool was tried first and returned no viewable previews in this session —
it reports `pending` and delivers finished storefronts to the Shopify interface, which
didn't surface them here. The inputs in §1 are kept so it can be retried later.

The site in `site/` is deliberately portable: the catalogue lives in one file
(`site/assets/data.js`) and maps cleanly onto Shopify products, variants and collections
if you go that way. Nothing here is wasted by switching.
