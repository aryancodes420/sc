# Catwalk Club — Shopify theme

A complete, standalone Shopify theme carrying the Catwalk Club design: its own `layout/`,
`config/` and `locales/`, so it uploads to an empty store and works on its own.

**Validated with Shopify's own `@shopify/theme-check`: 68 files, 0 offenses.**

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
| `layout/theme.liquid` | Document shell, fonts, skip link, structured data, first-order offer, chat button |
| `sections/` | 30 sections — header, footer, announcement (with a genuine countdown), hero, trust strip, category tiles, featured products, save-by-bundling, your-cats-dressed (UGC wall), call-out band, FAQ (page or compact homepage block), recently viewed, why-fit, newsletter, first-order offer, About, costume quiz, sizes by breed, Cat of the Month, plus `main-*` for product, collection, cart, page, contact, track-order, blog, article, search and collection list, and the Fit & care page section |
| `snippets/` | `product-card`, `breadcrumbs`, `structured-data` (JSON-LD), `chat-fab`, `catwalk-fonts` |
| `templates/` | JSON templates for every page type, plus `404.liquid` |
| `assets/catwalk.css` | The full design system (same file as the static site, plus theme-only rules) |
| `assets/catwalk.js` | Gallery, wishlist, variant size notes, stock pill, sticky add-to-cart, delivery dates, offer pop-up, chat toggle, countdown, recently viewed, quiz, sizes by breed |

Cart, checkout, inventory, search, pagination, the contact form and the newsletter form are
**Shopify's** — this theme doesn't reimplement them.

---

## Product page, top to bottom

1. Breadcrumbs
2. **Hero gallery** (six photos, thumbnails)
3. Three **objection cards**: *Will it fit my cat?* · *When will it arrive?* (real dates) · *Will my cat keep it on?*
4. Title · **rating line** (honest "No reviews yet" until a reviews app writes real numbers) · price · **stock pill** ("In stock", "Only 3 left", "Sold out", follows the chosen size) · blurb · three **ticks**
5. Size picker · quantity · **Add to cart** · **Shop Pay / PayPal / Apple Pay / Google Pay** (`payment_button`, appears once enabled under Settings → Payments) · four-icon trust row · **payment icons** (`shop.enabled_payment_types`)
6. **Sticky add-to-cart bar** once the buy box scrolls off screen
7. *This is for you if…* (`custom.for_me_if`)
8. Lifestyle **videos** (any video media on the product)
9. **Reviews** — app block slot for Judge.me or Loox; heading becomes "Real cats, real results" once reviews exist
10. **Details**: what you get, in the box, dimensions & fit, materials & care, delivery & returns
11. **Cheaper together** — the bundles this product sits in, with the saving spelled out (`custom.bundles`)
12. Related products

## Store setup after pushing

**1. Collections** — `everyday`, `halloween`, `christmas`, `bundles`. Point the homepage tiles
and featured sections at them in the editor.

**2. Menus** — `main-menu` (Shop, Fit & care, FAQ) and `footer` (the four collections, Fit & care,
FAQ, Track your order, Contact, About, legal pages).

**3. Pages** — create these and assign the template in the page's *Online Store* settings:

| Page | Template | Notes |
|---|---|---|
| Fit & care | `page.sizing` | Handle `fit-and-care` |
| FAQ | `page.faq` | Ten questions pre-filled |
| Contact | `page.contact` | Shopify's contact form; posts to the store email |
| Track your order | `page.track-order` | Links to account login + Shop app, or to a tracking app if you set one |
| About | `page.about` | Pre-filled; edit in the theme editor |
| Which costume? (quiz) | `page.quiz` | Handle `quiz`. Assign the seven products to the pre-made blocks in the editor |
| Sizes by breed | `page.breeds` | Handle `sizes-by-breed`. Ten breeds pre-filled; pick the sized products in the section's product list |
| Cat of the Month | `page.photo-draw` | Judged photo competition, free entry, terms included. Fill in the promoter line before the first round |

**Blog** — create a blog called *Journal* (or keep Shopify's *News*). Three posts are drafted in
`../content/blog/` (measuring, sizes by breed, keeping it on): paste each in as an article. The
`blog` and `article` templates are in the theme with BlogPosting structured data.

Then set **Theme settings → Contact & chat**: contact email, WhatsApp number (optional),
hours, the contact and size-guide page links.

**4. Product metafields** — namespace **`custom`**, Settings → Custom data → Products. Values
for every product are in `../site/assets/data.js`.

| Key | Type | Used for |
|---|---|---|
| `fit` | Single line text | Green fit pill; the fit card for one-size products |
| `blurb` | Single line text | Line under the title |
| `ticks` | List of single line text | Three ticks under the blurb |
| `for_me_if` | List of single line text | "This is for you if…" block |
| `keep_on` | Single line text | Per-product answer to "Will my cat keep it on?" (falls back to the section default) |
| `specs` | List of single line text | "What you get" |
| `box` | List of single line text | "In the box" |
| `care` | Single line text | Materials & care |
| `size_notes` | Multi-line text | One line per variant, in variant order |
| `badge` | Single line text | Card badge |
| `badge_uk` | True/false | "UK stock" in the trust row and stock pill |
| `bundles` | List of products | Bundles this product belongs to → "Cheaper together" |
| `contains` | List of products | On a bundle: its components → "What's in it" and the partner shown in cross-sell |
| `alias` | Single line text | Optional nickname tag under the title (e.g. `Kingsley`) |
| `motif` | Single line text | Illustration fallback if a product has no photo |

**Size collections** — create automated collections *Fits S*, *Fits M*, *Fits L* (condition:
variant title equals S / M / L) and *One size* (tag `one-size`). The shop page's chip row lists
every non-empty collection automatically, so they appear as filters with no theme change.

Reviews apps (Judge.me, Loox) write to the standard `reviews.rating` and `reviews.rating_count`
metafields. The rating line, the reviews heading and the JSON-LD `aggregateRating` read those and
show nothing until they exist. **Never fill them by hand** (DMCC Act 2024).

**5. Theme settings** — free-delivery threshold, delivery cost, returns window (they feed the
product page, cart bar and structured data, so match your real shipping settings); *Orders &
stock* for the low-stock threshold and an optional tracking app URL.

**6. First-order offer** — the pop-up's form is Shopify's newsletter form, so signups land in
Customers tagged `welcome10`. Create the discount first (Discounts → code `WELCOME10`, 10% off,
once per customer), then a Shopify Email automation "Welcome" that sends it. Text, code, delay
and on/off are in the *First-order offer* section in the editor.

**7. Chat** — the "Help me choose" button links to WhatsApp (if a number is set) and the contact
page. If you install **Shopify Inbox** instead, turn this button off in Theme settings.

**8. Homepage blocks** — `index.json` already carries, in order: hero, trust strip, tiles, the
seven, bundles, *Save by bundling* (point it at the bundles collection), *Your cats, dressed*
(add real customer photos as blocks; empty frames show until then), the quiz call-out (set its
link to the quiz page), fit & why, four compact FAQs, recently viewed, newsletter.

**9. Announcement countdown** — real dates in the section settings (order-by 14 Oct, event
31 Oct). The bar counts down to the order-by date, changes wording after it, and drops to the
Christmas line after the event. Nothing resets or repeats.

---

## Illustrated fallback

Any product without a photograph renders a generated SVG cat instead of an empty box. Every
launch product has six photos, so this only matters for new products before their photos land.
`custom.motif` picks the illustration: `bowtie`, `bandana`, `mane`, `cape`, `bat`, `pumpkin`, `santa`.
