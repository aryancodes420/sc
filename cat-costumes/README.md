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

| Product | Launch price | Regular price | Landed | Gross at launch | Margin at launch | Sizes |
|---|---|---|---|---|---|---|
| **Bow Tie Collar** | £8.99 | £10.99 | £1.82 | £7.17 | 80% | One size |
| **Bandana Collar** | £7.99 | £9.49 | £2.88 | £5.11 | 64% | S/M/L |
| **Lion Mane** | £9.99 | £11.99 | £5.17 | £4.82 | 48% | S/M/L |
| **Devil Bat Cape** | £12.99 | £15.49 | £5.49 | £7.50 | 58% | S/M/L |
| **Spider Costume** | £12.99 | £15.49 | £5.86 | £7.13 | 55% | S/M |
| **Pumpkin Hat & Ruffle Collar** | £11.99 | £14.49 | £7.33 | £4.66 | 39% | One size |
| **Santa Hat & Scarf Set** | £17.99 | £21.49 | £10.96 | £7.03 | 39% | One size |

The launch price runs to a fixed deadline (22 Sept 2026, 23:59 UK) with the regular price shown
crossed out. Ending the offer is a manual step (see `LAUNCH-CHECKLIST.md`); nothing changes by itself.

Bundles:
- **Halloween Pair** — £23.99 (components £25.98, saves £1.99)
- **Pumpkin Patch** — £18.99 (components £20.98, saves £1.99)
- **First Costume Kit** — £14.99 (components £16.98, saves £1.99)
- **Festive Pair** — £24.99 (components £26.98, saves £1.99)

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
2. **Work through `LAUNCH-CHECKLIST.md`** — stock first, then the Shopify account, theme,
   products, bundles, apps, legal, tests.
3. **Own photography and lifestyle videos** once stock lands. Supplier photos are in place
   for launch; your own are what the ads need.
4. **Connect payments and write the legal pages** before taking a single order.

### On the Shopify route

The store-preview tool was tried first and returned no viewable previews in this session —
it reports `pending` and delivers finished storefronts to the Shopify interface, which
didn't surface them here. The inputs in §1 are kept so it can be retried later.

The site in `site/` is deliberately portable: the catalogue lives in one file
(`site/assets/data.js`) and maps cleanly onto Shopify products, variants and collections
if you go that way. Nothing here is wasted by switching.
