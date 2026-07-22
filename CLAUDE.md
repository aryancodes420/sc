# The Dog Nook Shopify Theme Project

## Business

Store: The Dog Nook
Domain: thedognook.co.uk
Market: United Kingdom
Business model: Shopify ecommerce using third-party fulfilment
Primary niche: Products intended to support anxious dogs, rescue dogs and calmer home routines.

## Core positioning

Primary positioning:
"Helping anxious dogs feel safe at home."

The store must feel like a trustworthy specialist retailer, not a generic dropshipping catalogue.

## Current product categories

- Snuffle mats
- Slow feeders
- Lick mats
- Wall-mounted lick mats
- Calming dog beds
- Electric dog nail trimmers
- Other enrichment and comfort products where appropriate

## Target customer

UK dog owners who:
- Have an anxious, nervous, reactive or recently rescued dog
- Want practical ways to create calmer routines
- Care strongly about their dog's wellbeing
- May feel uncertain about which products are suitable
- Need reassurance, clear explanations and trustworthy delivery information

## Conversion priorities

1. Explain the store's purpose within five seconds.
2. Help visitors identify the right product for their dog's situation.
3. Communicate product outcomes without unsupported medical claims.
4. Remove signs of generic dropshipping.
5. Establish trust before asking for the sale.
6. Make mobile purchasing simple.
7. Make delivery, returns, materials, dimensions and usage clear.
8. Prioritize genuine usability over decorative redesigns.
9. Preserve site speed.
10. Avoid fake urgency, fake reviews, invented statistics or fabricated credentials.

## Brand principles

The brand should feel:
- Calm
- Reassuring
- Helpful
- Knowledgeable
- Warm but not childish
- Premium enough to be credible
- Focused on dog welfare rather than aggressive selling

## Required constraints

- Never edit or publish the live theme.
- Work only on the locally pulled draft theme.
- Do not push changes unless explicitly instructed.
- Do not install Shopify apps.
- Do not fabricate reviews, customer counts, scientific evidence or certifications.
- Do not make medical or guaranteed behavioural claims.
- Do not change product prices without explicit authorization.
- Do not remove existing functionality without documenting the reason.
- Prefer theme-native Liquid, CSS and lightweight JavaScript.
- Avoid unnecessary dependencies and large JavaScript libraries.
- Preserve editable Shopify section settings where reasonably possible.
- Ensure changes work in Shopify's theme editor.
- Prioritize mobile because most acquisition traffic is expected to be mobile.
- Record all material changes.

## Required workflow

For substantial work:

1. Audit first.
2. Cite the exact template, section, snippet or asset involved.
3. Explain the customer problem.
4. Explain the proposed change.
5. Estimate impact, confidence and implementation effort.
6. Check for conflicts with other findings.
7. Produce a plan before modifying files.
8. Implement in small batches.
9. Run Theme Check after implementation.
10. Summarize changed files and testing requirements.

---

# Project operations (reference)

> Session-verified 2026-07-22. Concrete facts a fresh session needs. Always
> re-verify live details before relying on them — the single Shopify store is
> shared, so the catalogue can change between sessions.

## Where things live

- **Theme source:** everything under `dog-nook-theme/`. Custom files are namespaced
  `dog-nook-*`; custom CSS classes are namespaced `.tdn-*`. It layers on top of
  Shopify's **Horizon** theme — it is not a from-scratch theme.
- **Deeper context docs (read these before large work):**
  - `HANDOFF.md` — living handoff (deploy details, traps, history).
  - `BUILDER-COORDINATION.md` — catalogue decisions when multiple sessions run.
  - `audit/` — the full conversion audit; start with
    `audit/16-prelaunch-status-and-roadmap.md` (live-verified status + roadmap),
    then `audit/00-executive-summary.md`.
- **Design tokens** (top of `assets/dog-nook.css`): `--tdn-cream #F3EDE4` (bg),
  `--tdn-sage #7C8767` (brand), `--tdn-charcoal #2E2A22` (text),
  `--tdn-terracotta #C17A57` (accent/sale). Fonts: Playfair Display (display),
  Inter (body).

## File map (`dog-nook-theme/`)

- `assets/` — `dog-nook.css` (tokens + base components — large, avoid redeploying),
  `dog-nook-cro.css` (stars/PDP/a11y), `dog-nook-anim.css` (motion),
  `dog-nook-pdp.css` (PDP buy-box + product-card overrides), `dog-nook.js`.
- `sections/` — `dog-nook-hero`, `-category-bar`, `-trust-strip`, `-why`,
  `-featured-bundle`, `-collection-list` (homepage "Shop by need" grid),
  `-reviews-placeholder` (real review wall), `-newsletter`, `-product` (PDP),
  `-bundle`, `-shop`, `-collection`, `-collections-index`, `-faq`, `-contact`,
  `-rich-text`, `-announcement`.
- `snippets/` — `dog-nook-head` (loads all CSS/JS + SEO fallbacks + email popup),
  `-stars`, `-product-card`, `-pdp-form` (buy form), `-pdp-extra` (PDP FAQ/reviews/
  cross-sell), `-email-popup`, `-trust-panel`, `-cart-progress`, `-cookie-banner`.
- `templates/` — `index`, `product`, `product.bundle`, `product.settle-in-bundle`,
  `collection`, `list-collections`, `page.shop`, `page.about`, `page.contact`,
  `page.faq`.
- `store-config/` — reference copies of `cart-drawer.liquid` and `footer-group.json`.

## Shopify targets

- Store: **The Dog Nook** · `thedognook.co.uk` · admin `kkeqih-jm.myshopify.com` ·
  Basic plan · GBP.
- **Published/MAIN theme:** `gid://shopify/OnlineStoreTheme/193140818203`
  ("Dog Nook PDP — working"). **Do NOT edit or publish it.**
- **Draft (deploy target):** `gid://shopify/OnlineStoreTheme/193158119707`
  ("The Dog Nook — Design install"). All work goes here. **Publishing is the
  owner's action only.**
- MCP: Shopify (`mcp__Shopify__*`) and GitHub. These reconnect frequently — if a
  tool "isn't found", retry.

## Deploy recipe (the theme is NOT auto-synced from git)

A theme change needs **both**: (a) the edit in `dog-nook-theme/` (git), and
(b) a `themeFilesUpsert` to the **draft** theme. Then verify.

1. `base64 -w0 <file>` and deploy via `themeFilesUpsert` with
   `body: { type: "BASE64", value: "<base64>" }`.
2. **Verify:** query the file's `checksumMd5` back and compare to `md5sum <file>`.
   For `.liquid`/`.css`/`.js` the checksum must match exactly.
3. **⚠️ base64 corruption trap:** hand-emitted base64 occasionally gains a stray
   homoglyph → `FILE_VALIDATION_ERROR` ("Content contains invalid characters") or,
   worse, silently-different content. Keep deployed files small, verify the
   checksum every time, and re-deploy on any mismatch.
4. **JSON templates normalize on save:** Shopify prepends an auto-generated header
   comment and prunes settings equal to their section's schema default, so a JSON
   template's `checksumMd5` will NOT match git even on a good deploy. Verify JSON
   by reading the file body back and inspecting the content, not the checksum.

## Catalogue snapshot (re-verify live before relying on it)

- **9 active (selling) products:** Lick Mat £11.99 · Snuffle Mat £22.99 · Calming
  Donut Bed £29.99/£37.99/£44.99 (S/M/L) · Grooming Glove £11.99 · Nail Grinder
  £19.99 · Slow-Feeder Bowl £14.99 · Car Boot Liner £29.99 · **New Rescue Bundle
  £34.99** (compare £49.97, save £14.98) · **Settle-In Bundle £64.99** (compare
  £72.97, save £7.98).
- **Two-tier bundle strategy:** New Rescue Bundle = entry; Settle-In Bundle =
  premium. Featured across the homepage, category bar and collection cards.
- **Collections:** `calming-essentials` (holds the New Rescue Bundle),
  `settling-a-new-rescue` (holds the Settle-In Bundle), `grooming`,
  `mealtime-feeding`, `travel-outdoor`, `fireworks-storms` (all-draft → empty on
  the storefront). Bundle-containing collections auto-show a "Bundle inside ·
  Save £X" badge on the homepage grid and `/collections`.
- **7 draft products** (Heartbeat Companion, Calming Coat, Snuffle Ball, Calming
  Snood, Wobble Feeder, First Nights Bundle, Fireworks Kit) — unsourced, hidden;
  activate only after sourcing + real specs + real photos. **2 archived**
  (Travel Seatbelt Harness, Wall-Mount Lick Pad). **1 unlisted PDP demo.**
- Every active and draft product already has a per-product `custom.faq` metafield
  (a JSON list of `{q,a}`) that `dog-nook-pdp-extra.liquid` renders on the PDP.

## Reviews & honesty

- Reviews are **real only**. The reviews wall + `product.metafields.reviews.*`
  aggregate reflect genuine owner reviews. **Never fabricate** reviews, ratings,
  counts, statistics or credentials (also a firm UK-law line — DMCC 2024 / CMA).
- Consent: the cookie banner is wired to Shopify's Customer Privacy API (declining
  actually withholds marketing/analytics consent).

## Known pre-launch gaps

- **No product photography** — the biggest remaining conversion lever (placeholder
  colour tiles + a card wordmark stand in for now). Planned via a later image pass.
- The finished design lives on the **unpublished draft**; it is not live until the
  owner publishes it.

## The recurring CSS "link trap"

`assets/dog-nook.css` scopes inline links with a high-specificity `:not()` list.
Any new `<a>`-based component must be added to that exclusion list, or its text
renders sage-on-sage and disappears.
