# Catwalk Club — Shopify theme

A complete, standalone Shopify theme carrying the Catwalk Club design. Not a Dawn overlay —
it has its own `layout/`, `config/` and `locales/`, so it can be uploaded to an empty store
and work on its own. (`../../dog-nook-theme/` is the other pattern: files that drop *into*
Dawn. This one replaces it.)

**Validated with Shopify's own `@shopify/theme-check`: 33 files, 84 checks, 0 offenses.**

---

## Deploying it

You need a Shopify store and the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli).

```bash
cd cat-costumes/theme
shopify theme push --unpublished    # uploads as a draft — nothing goes live
shopify theme dev                   # or preview locally against the store
```

Push as **unpublished** first and preview it before making it the live theme.

---

## What's in it

| | |
|---|---|
| `layout/theme.liquid` | Document shell, fonts, skip link |
| `sections/` | 17 sections — header, footer, hero, trust strip, category tiles, featured products, size finder, newsletter, plus `main-*` for product, collection, cart, page, search and collection list, and full FAQ and Fit & care page sections |
| `snippets/product-card.liquid` | Product card with illustrated fallback |
| `snippets/catwalk-fonts.liquid` | Self-hosted Fredoka + Nunito via `asset_url` |
| `templates/` | JSON templates for every page type, plus `404.liquid` |
| `assets/catwalk.css` | The full design system |
| `assets/catwalk.js` | Size finder, cm/inch toggle, wishlist, illustrated fallbacks |

Cart, checkout, inventory, search and pagination are **Shopify's** — this theme doesn't
reimplement them. What it adds is everything Shopify doesn't give you: the interactive size
finder, breed presets, the unit toggle, and the informational gallery.

---

## Store setup after pushing

**1. Collections** — create four, matching the catalogue in `../README.md`:
`holiday-seasonal`, `cute-everyday`, `novelty-funny`, `bundles`.
Then open the theme editor and point each homepage category tile at one.

**2. Menus** — `main-menu` (Shop, Fit & care, FAQ) and `footer`. The header and footer
sections read whichever menus you pick in the editor.

**3. Pages** — create two pages and assign their templates in the page's Online Store settings:

| Page | Template to assign |
|---|---|
| Fit & care | `page.sizing` |
| FAQ | `page.faq` |

The FAQ ships with all ten questions pre-filled as editable blocks.

**4. Product metafields** — all optional; the theme degrades gracefully without them.
Create these under Settings → Custom data → Products, namespace **`custom`**:

| Key | Type | Used for |
|---|---|---|
| `fit` | Single line text | The green fit pill — *"Close fit with stretch. Size up if between sizes."* |
| `materials` | Single line text | Materials & care accordion |
| `care` | Single line text | Materials & care accordion |
| `blurb` | Single line text | Short line under the title |
| `badge` | Single line text | Card badge (e.g. `Bestseller`) |
| `motif` | Single line text | Which illustration to use — see below |

**5. Theme settings** — set the free-delivery threshold, delivery cost and returns window
under Theme settings. These feed the product page table and the cart progress bar, so
**make them match your real shipping settings**.

---

## About the illustrations

Products without a photograph render a generated SVG cat instead of an empty grey box, and
the product page shows a visible "Illustration, not a photograph" banner.

Set `custom.motif` to pick which one: `pumpkin`, `bat`, `santa`, `antlers`, `party`,
`jumper`, `bandana`, `bowtie`, `hoodie`, `flower`, `mane`, `dino`, `shark`, `cape`.
Left blank, one is chosen deterministically from the product handle.

**This is scaffolding, not a feature.** The moment a product has real photographs the theme
uses them and the banner disappears. Delete `hydrateArt` from `catwalk.js` once every
product is photographed.

---

## Still to do before this sells anything

1. **Photography.** Unchanged, and still the blocker.
2. **Products.** The theme is empty until you create them — catalogue and prices are in
   `../README.md`, and every price there is a placeholder.
3. **Payments, taxes and shipping.** Shopify's, not the theme's.
4. **Legal pages.** Shipping, refunds, terms, privacy. Create as pages and link from the
   footer menu.
5. **Reviews.** Install Judge.me or Loox — both competitors use Judge.me. Never write your
   own: fake reviews are banned by the DMCC Act 2024.
