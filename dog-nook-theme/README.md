# The Dog Nook — Horizon theme add-on

Drop-in Shopify sections, snippets and templates that recreate **The Dog Nook**
storefront design on top of the **Horizon** theme. Everything is editable from the
Shopify theme editor (Online Store → Themes → Customize), and product / collection /
cart content is wired to your live Shopify catalogue.

> Built for the connected store **The Dog Nook** (`thedognook.co.uk`, GBP).

---

## What's in the box

```
dog-nook-theme/
├── assets/
│   ├── dog-nook.css          # design tokens (colours, type, buttons, cards) + shared components
│   └── dog-nook.js           # accordions, colour swatches, cookie banner, free-ship bar
├── snippets/
│   ├── dog-nook-head.liquid          # loads fonts + CSS + JS (include once in <head>)
│   ├── dog-nook-cookie-banner.liquid # Meta/TikTok cookie consent (include once before </body>)
│   ├── dog-nook-freeship-bar.liquid  # free-delivery progress bar for the cart drawer
│   └── dog-nook-product-card.liquid  # shared product card
├── sections/
│   ├── dog-nook-announcement.liquid       # optional sage announcement bar
│   ├── dog-nook-hero.liquid               # hero — Variant B (full-bleed) by default, A also available
│   ├── dog-nook-trust-strip.liquid        # 4 trust cells
│   ├── dog-nook-why.liquid                # "Why The Dog Nook" 3 cards
│   ├── dog-nook-featured-bundle.liquid    # featured bundle (wire to a real product)
│   ├── dog-nook-collection-list.liquid    # "Shop by need" collection grid
│   ├── dog-nook-reviews-placeholder.liquid# "Real reviews, coming soon" (no fake reviews)
│   ├── dog-nook-newsletter.liquid         # charcoal newsletter band (real signup form)
│   ├── dog-nook-product.liquid            # PDP — gallery, swatches, ATC, sticky bar (wired)
│   ├── dog-nook-collection.liquid         # collection banner + grid + "good to know" (wired)
│   ├── dog-nook-collections-index.liquid  # collections index (large cards)
│   ├── dog-nook-rich-text.liquid          # About / story page
│   ├── dog-nook-faq.liquid                # FAQ accordion
│   └── dog-nook-contact.liquid            # contact page (real Shopify contact form)
└── templates/
    ├── index.json              # homepage
    ├── product.json            # product page
    ├── collection.json         # collection page (also /collections/all = "Shop all")
    ├── list-collections.json   # collections index
    ├── page.about.json         # About page
    ├── page.contact.json       # Contact page
    └── page.faq.json           # FAQ page
```

All sections are **standard Online Store 2.0 sections** (they carry their own
`{% schema %}`, `{% stylesheet %}` and settings), so they sit happily inside Horizon
and appear in the theme editor's **Add section** list, each prefixed with `TDN`.

---

## Install

You can copy the files into your theme with the **Shopify CLI** (recommended) or the
**online code editor**. In both cases the folder names map 1:1 onto your Horizon theme.

### Option A — Shopify CLI

```bash
# from your local copy of the Horizon theme
cp -R dog-nook-theme/assets/*        assets/
cp -R dog-nook-theme/snippets/*      snippets/
cp -R dog-nook-theme/sections/*      sections/
cp -R dog-nook-theme/templates/*     templates/
shopify theme dev     # preview locally
shopify theme push    # push to the store (push to an unpublished copy first)
```

### Option B — Online code editor
Online Store → Themes → (Horizon) → ⋯ → **Edit code**, then create each file under the
matching folder and paste the contents.

### Required one-time edits to `layout/theme.liquid`
Two include lines make the fonts/styles and the cookie banner load site-wide:

```liquid
<!-- just before </head> -->
{% render 'dog-nook-head' %}

<!-- just before </body> -->
{% render 'dog-nook-cookie-banner' %}
```

That's the only change to a core Horizon file. Everything else is additive.

---

## Wire it to your store

The templates expect a few things to exist. Create them once and the design fills in
with real data:

1. **Collections** — create `Calming Essentials`, `Grooming`, `Mealtime & Feeding`,
   `Travel & Outdoor` (any handles). Then open the homepage in the editor and point each
   card in **TDN Collection grid** at the matching collection. Do the same in
   **TDN Collections index** if you want a curated order.
2. **Products** — add your 7 products with prices, a product **type** (shows as the card
   pill, e.g. "Grooming"), and images. Assign each to a collection.
3. **The Rescue Bundle** — create it as a normal product (price £34.99, compare-at £49.97
   for the "You save £15" chip). In **TDN Featured bundle**, pick that product so the price
   and "Add bundle to basket" are live. Point the hero's primary button at its URL.
4. **Pages** — create pages with handles `about`, `contact`, `faq`. Shopify auto-uses
   `page.about.json` / `page.contact.json` / `page.faq.json`.
5. **"Shop all"** — links to `/collections/all`, which renders through `collection.json`.

### Optional metafields (nice-to-haves, all have fallbacks)
- `custom.short_description` (product, single line) — the short blurb under the PDP price.
- `custom.delivery_line` (product, single line) — per-product delivery line in the info panel.
- `custom.swatch_hex` (variant, single line, colour) — exact swatch colour. Without it,
  common colour names (Sage, Oat, Clay, Charcoal, Cream) are auto-mapped; anything else
  falls back to a neutral sage-grey.

### Colour swatches on the PDP
If a product has a **single option** (e.g. "Colour" with Sage / Oat / Clay), the PDP shows
it as selectable swatches exactly like the design, and price/availability update on click.
Single-variant products just show **Add to Cart**; multi-option products fall back to a
standard variant dropdown.

---

## Editing in the theme editor
Every headline, sub-line, eyebrow, button label/link, colour and image is a section
setting or block — no code needed to change copy. Trust cells, why-us cards, collection
cards, FAQ items and PDP questions are **blocks** you can add, remove and reorder.

**Hero:** ships as **Variant B (full-bleed gradient)**. To switch to the split layout,
open **TDN Hero** and set *Layout → A · Split*. Both variants share the same copy fields.

---

## Design tokens (for reference)
Defined as CSS variables in `assets/dog-nook.css` — change them once to re-skin everything:

| Token | Value | Use |
|---|---|---|
| `--tdn-cream` | `#F3EDE4` | page background |
| `--tdn-sage` | `#7C8767` | primary / brand |
| `--tdn-charcoal` | `#2E2A22` | text / dark sections |
| `--tdn-terracotta` | `#C17A57` | sale / accent |
| Display font | Playfair Display | headings, prices, logo |
| Body font | Inter | body / UI |

## Brand rules kept intact
- No fabricated reviews — the reviews section stays as verified-review placeholders.
- No fake urgency, countdowns or invented discounts.
- Delivery shown honestly (free over £35, otherwise in full at checkout).
- Cookie/pixel consent (Meta & TikTok) included.
- Muted placeholder tones stand in until real photography is added.

## Notes / limitations
- **Header, footer and cart drawer stay Horizon's.** This add-on styles the page content
  and templates. To get the design's free-delivery progress bar in the cart, drop
  `{% render 'dog-nook-freeship-bar' %}` into Horizon's cart drawer snippet.
- Fonts load from Google Fonts. To use Shopify's font system instead, swap the `<link>` in
  `dog-nook-head.liquid` for `font_face` calls with your theme's font settings.
