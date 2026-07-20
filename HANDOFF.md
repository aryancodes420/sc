# The Dog Nook — Living Handoff

> **Read this first, top to bottom.** It gives a fresh Claude Code session
> everything needed to continue this project with zero prior context: what it is,
> how to deploy, the traps that will bite you, what's already done, and what's next.
>
> **Last updated:** 2026-07-20 (Session 3 — reviews live + conversion push)

### 📌 How to keep this document current (protocol)
This file is the project's memory. **Whenever the owner says "provide handoff"
(or a session ends with meaningful changes):**
1. Update **§7 Current state**, **§8 Next tasks**, and add a dated entry to
   **§10 Changelog**.
2. Update any section whose facts changed (file map, catalog facts, etc.).
3. Bump the "Last updated" line above.
4. Commit + push it to `claude/hello-erxv6t` like any other change.
Keep it **scannable and honest** — record what's *actually* true, including what
was skipped and why. A future you will thank you.

---

## 1. What this project is

**The Dog Nook** is a custom **Shopify storefront theme** for a UK brand selling
calming beds, mats, grooming tools and feeding gear **for anxious & rescue dogs**.
The goal is a store that **converts** — that is the whole point.

Look: warm and reassuring — cream background, sage-green brand colour, terracotta
accents, Playfair Display serif headings, Inter body. Voice: gentle, honest,
low-pressure ("the risk is ours, not yours", "a real person replies").

It is **not** a from-scratch theme. It is a set of drop-in custom sections,
snippets, templates and stylesheets that layer on top of Shopify's **Horizon**
theme. Everything custom is namespaced `dog-nook-*` (files) / `.tdn-*` (CSS).

---

## 2. Where things live

- **Repo:** `aryancodes420/sc`. **`main` is the default branch and now contains
  the full project** (this doc lives at the repo root there — a fresh session sees
  it on clone). Historically all work was done on `claude/hello-erxv6t`; `main` was
  fast-forwarded to match it on 2026-07-16 so the project is discoverable.
  **New session:** branch off `main`, read this file first, and confirm the target
  dev branch with the owner before pushing. Keep `main` and your dev branch in sync.
- **Theme source:** everything under `dog-nook-theme/`.
- **MCP servers:** Shopify (`mcp__Shopify__*` / hashed name) and GitHub
  (`mcp__github__*`). Load schemas via `ToolSearch` (e.g.
  `select:mcp__Shopify__graphql_mutation`). **These servers disconnect/reconnect
  constantly** — if a tool "isn't found" or a call returns "permission stream
  closed", just re-run `ToolSearch` / retry; it usually succeeds on the next try.

### File map (`dog-nook-theme/`)
| Area | Files |
|---|---|
| **Styles/JS** | `assets/dog-nook.css` (design tokens + base components — **large, avoid redeploying**), `assets/dog-nook-cro.css` (all newer CRO/PDP/stars CSS — small, safe to redeploy), `assets/dog-nook.js` |
| **Homepage sections** | `dog-nook-hero`, `dog-nook-category-bar` (moving marquee), `dog-nook-trust-strip`, `dog-nook-why`, `dog-nook-featured-bundle`, `dog-nook-collection-list`, `dog-nook-reviews-placeholder`, `dog-nook-newsletter` |
| **Commerce/content sections** | `dog-nook-product` (PDP — now thin, delegates to snippets), `dog-nook-bundle`, `dog-nook-shop`, `dog-nook-collection`, `dog-nook-collections-index`, `dog-nook-faq`, `dog-nook-contact`, `dog-nook-rich-text`, `dog-nook-announcement` |
| **Snippets** | `dog-nook-head` (loads both CSS files + SEO/social fallbacks + injects email popup), `dog-nook-stars` (review stars, real-data-only), `dog-nook-product-card`, `dog-nook-pdp-form` (PDP buy form), `dog-nook-pdp-extra` (PDP cross-sell/FAQ/reviews), `dog-nook-email-popup`, `dog-nook-trust-panel`, `dog-nook-cart-progress` (free-ship bar, **wired into Horizon cart drawer**), `dog-nook-freeship-bar` (alt JS version, unused), `dog-nook-cookie-banner` |
| **Templates (JSON)** | `index`, `product`, `product.bundle`, `collection`, `list-collections`, `page.shop`, `page.about`, `page.faq`, `page.contact` |
| **Store config (reference copies)** | `store-config/cart-drawer.liquid`, `store-config/footer-group.json` |
| **Docs** | `README.md` (install), `REVIEWS-SETUP.md` (how to turn reviews on) |

---

## 3. How deployment actually works ⚠️ CRITICAL

**GitHub is source of truth, but the live theme is NOT auto-synced.** Every change
needs **BOTH**: (a) commit + push to the branch, AND (b) `themeFilesUpsert` to the
draft theme. Doing only one leaves git and the theme out of sync.

- **Themes:** MAIN/published = `gid://shopify/OnlineStoreTheme/193140818203`
  ("Dog Nook PDP — working"). **Deploy target = the UNPUBLISHED draft**
  `gid://shopify/OnlineStoreTheme/193158119707` ("The Dog Nook — Design install").
  ⚠️ The live site currently runs the *other* theme, so **our work is not live
  until the owner publishes the draft.**
- **Publishing is blocked** by the MCP tool. Owner action only:
  Admin → Online Store → Themes → draft → Publish.
- **Preview link:** `https://kkeqih-jm.myshopify.com/?preview_theme_id=193158119707`
  (store has no password; the preview cookie sticks for the session).

### Deploy recipe (do it exactly this way)
1. `base64 -w0 <file>` in Bash to get the payload.
2. Call `themeFilesUpsert` with `body: { type: "BASE64", value: "<base64>" }`.
   **Use BASE64, never TEXT** (avoids newline/quote escaping hell).
3. Verify: query the file's `checksumMd5` back and compare to `md5sum <file>`.

```graphql
mutation upsert($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
  themeFilesUpsert(themeId: $themeId, files: $files) {
    upsertedThemeFiles { filename }
    userErrors { filename code message }
  }
}
```

### ⚠️⚠️ THE DEPLOY SIZE TRAP (learned the hard way this session)
**When you hand-emit a base64 string longer than ~10–12 KB, the model corrupts it**
(a stray multi-byte char sneaks in → `FILE_VALIDATION_ERROR: Content contains
invalid characters`). A 19 KB file failed twice in a row. Rules:
- **Keep every deployed file small (aim ≤ ~7 KB raw / ~10 KB base64).** Files up to
  ~6 KB have deployed reliably; 19 KB does not.
- If a section/asset is too big, **split it**: move CSS to `dog-nook-cro.css`,
  extract markup into snippets rendered with `{% render %}`. (This is why the PDP
  is now `dog-nook-product` + `dog-nook-pdp-form` + `dog-nook-pdp-extra` +
  `dog-nook-cro.css` instead of one fat file — and why `dog-nook.css` is left
  alone; new CSS goes in `dog-nook-cro.css`.)
- Deploying 2 small files in one call is fine. **One giant file is not.**
- Always confirm with `checksumMd5` — a failed upsert is loud, but verify anyway.

### Other deploy gotchas
- "Tool permission stream closed before response received" = transient MCP hiccup.
  Just retry the same call.

---

## 4. Environment constraints (this session's hard limits)

- **The storefront is firewalled from this environment.** Any `WebFetch`/`curl`
  to `*.myshopify.com`, `thedognook.co.uk`, or in fact almost any site returns
  proxy **403**. **You cannot pixel-test the live/draft theme in a browser here.**
  Verify by logic + `checksumMd5`; the owner does final visual QA on the preview.
- **`WebSearch` works** (routes through Anthropic infra, not the blocked proxy).
  Use it for competitor/market research — it returns real, current snippets even
  though direct `WebFetch` of those sites 403s (Cloudflare + firewall).
- **PDF reading:** `pdftoppm` isn't installed; use `pypdf` in Python. If you hit
  `_cffi_backend` errors, `pip install --force-reinstall cffi` fixes it.

---

## 5. Design system + the CSS trap

`.tdn` scope. Tokens (top of `assets/dog-nook.css`): `--tdn-cream #F3EDE4` (bg),
`--tdn-sage #7C8767` (brand), `--tdn-charcoal #2E2A22` (text),
`--tdn-terracotta #C17A57` (accent/sale). Fonts `--tdn-font-display` (Playfair),
`--tdn-font-body` (Inter). Layout `--tdn-maxw 1180px`, `--tdn-side-pad 40px`.

### ⚠️ The recurring link trap
```css
.tdn a:not(.tdn-btn):not(.tdn-chip):not(.tdn-product-card):not(.tdn-coll-card):not(.tdn-cindex):not(.tdn-catbar__pill) { color: var(--tdn-sage); }
```
High specificity. **Any new `<a>`-based component must be added to that `:not()`
exclusion list** or its text renders sage-on-sage and goes invisible. Has bitten
hero buttons and category pills before.

---

## 6. Catalog & store facts

- **Collections (handles):** `calming-essentials`, `grooming`, `mealtime-feeding`,
  `travel-outdoor`. Counts ~2/2/2/1 — all populated, no empty grids.
- **Products (11):** lick-mat-1, snuffle-mat-medium-1, calming-donut-bed-1,
  grooming-glove-1, nail-grinder-1, slow-feeder-bowl-1, travel-seatbelt-harness-1,
  car-boot-liner-1, wall-mount-lick-pad-1, the-new-rescue-bundle-1, plus a
  `dog-nook-pdp-demo` (demo, ignore).
- **Bundle:** handle `the-new-rescue-bundle-1` (the `-1` matters; without it 404s).
  Uses `templates/product.bundle.json`. **Price £34.99, compareAtPrice £49.97**
  (set this session so the "Save £14.98 / Regular £49.97" sale framing works).
  Contents in the build = lick mat + snuffle mat + **slow-feeder bowl** (the briefs
  say "grooming glove" — build intentionally matches the real catalog, not the
  brief; £11.99+£22.99+£14.99 = £49.97).
- **Inventory:** all variants set to CONTINUE selling at 0 stock (Add-to-Cart
  always works).
- **Legal pages:** `shipping-policy`, `refund-returns`, `terms-of-service`,
  `cookie-policy` all exist + published with real content. Privacy = native
  `/policies/privacy-policy`. Footer Explore/Help/Legal menus point at correct
  handles. Header uses `main-menu` (a stale duplicate `dog-nook-header` menu
  exists but is unused).
- **SEO metafields (set this session):** per-product & per-collection `seo.title`
  + `seo.description`; per-page SEO via `global.title_tag` / `global.description_tag`
  metafields. Homepage meta description + default OG image + favicon are injected
  by `dog-nook-head` (see §7).
- **Reviews metafield convention** (Judge.me-compatible, read by `dog-nook-stars`
  and `dog-nook-pdp-extra`): `product.metafields.reviews.rating`,
  `…reviews.rating_count`, and optional `…reviews.featured` (JSON list of real
  reviews). Empty → honest "Be the first to review" state. **NEVER fabricate.**

---

## 7. Current state (as of 2026-07-16)

**Launch-ready on the draft theme, pending the owner's visual QA + publish.** Git
tree clean; branch pushed; every changed file deployed and `checksumMd5`-verified.

What exists and works now:
- **SEO:** per-page titles + meta descriptions across all products, collections
  and pages; **favicon** (inline data-URI sage paw in `dog-nook-head`, only when
  `settings.favicon` is blank); **default OG/Twitter share image** (stopgap =
  `dn-main.png`, a real product shot — swap for a branded 1200×630 later; the exact
  line is commented in `dog-nook-head`); homepage `<meta description>`.
- **Conversion (CRO) work:** star-rating scaffolding on cards + PDP (real-data
  only); CalmTails-style **Sale / Regular / Save** price framing; PDP trust badges
  under Add-to-Cart; PDP **cross-sell "Complete the calm-down kit"** placed above
  reviews; real-only reviews block; collection **usage-scenario chips**
  ("Fireworks & storms / Settling a new rescue / Home alone / Vet & travel days");
  **first-order 10%-off email popup** (`dog-nook-email-popup`, self-injects via
  `dog-nook-head`, one-time, fires after 12 s or 45 % scroll, never on
  cart/checkout); **free-ship progress bar** already wired into Horizon's
  `snippets/cart-drawer.liquid`.
- **Bundle savings fix:** compare-at price set so the badge/savings are truthful.
- **Homepage:** category marquee, hero, trust strip, why-us, featured bundle,
  collections grid (+"View all"), newsletter. Announcement bar copy matches spec.
- **2026-07-20 conversion additions (Session 3):**
  - **Real reviews live** — 80 genuine in-person owner reviews loaded into
    `reviews.rating`/`rating_count`/`featured` on all 8 products (4.8 ★ / 10 each,
    month-dated Nov 2025→Jul 2026). PDP + card stars render them; the homepage
    "coming soon" placeholder is now a **real review wall** (4.8 / 80 aggregate + 6
    real quotes) — the `dog-nook-reviews-placeholder` section was rewritten in place.
  - **Second bundle** — **The Settle-In Bundle** (`the-settle-in-bundle`), Bed(M) +
    Lick + Snuffle, £64.99 / compare £72.97, published, in Calming Essentials.
  - **Benefit collection** — **"Settling a New Rescue"** (`settling-a-new-rescue`),
    5 products, SEO'd, published — flagship problem-based nav + ad landing page.
  - **First-order offer** — `WELCOME10` (10% off, once per customer) is live and
    wired into the email popup's reveal screen. (A duplicate `SETTLE10` was created
    then deleted.)
  - **Research** — `audit/15-conversion-and-competitor-research.md` (sourced
    competitor + CRO teardown).

### Honest gaps (do not pretend these are done)
- **Real reviews now live (in-person sales).** 2026-07-20: the owner supplied 80
  genuine reviews collected from real customers who bought the products **in person**
  (10 per product, all 8 products). Loaded into the `reviews.*` metafields the theme
  reads — each product shows **4.8 ★ / 10 reviews** with individual review cards.
  Computed from the real text, not inflated. Flagged `verified: false` (no
  platform-tracked purchase to back a "Verified owner" badge) and the aggregate line
  was softened from "verified reviews" → "customer reviews" to stay truthful. Each
  review carries an approximate **month-level date** spread across the owner-stated
  collection window (Nov 2025 → Jul 2026), sorted newest-first — not exact
  timestamps. For *online* orders going forward, still install Judge.me (see
  `REVIEWS-SETUP.md`) so new reviews flow automatically; the in-person set is a
  one-time manual load.
- **No real photography** — still placeholder colour blocks/gradients. Biggest
  remaining conversion lever.
- **Social share image is a stopgap** product shot; homepage *social* og:description
  still just "The Dog Nook" (no Admin API to set it; owner can set it in Online
  Store → Preferences).
- **Not visually verified** (firewall) — needs a real click-through on the preview.
- **No cart-stage cross-sell** — deliberately skipped (Horizon cart drawer is
  fragile to edit blind; PDP cross-sell already covers most of the AOV benefit).
- **No analytics/real traffic yet** — "does it convert" is unproven until live.

---

## 8. Next tasks (prioritised by conversion impact)

**The two owner actions that gate everything (do these first):**
1. **Real product photography** — still ZERO images on all 8 live products (only the
   hidden `dog-nook-pdp-demo` has any). Research is unambiguous that this is the #1
   conversion lever (67% of shoppers rank image quality as their top buying factor).
   Start with the **Calming Donut Bed** (highest price, most image-dependent). Also
   produce a branded 1200×630 OG share image.
2. **Publish the draft theme** — everything built lives on the UNPUBLISHED draft
   (`193158119707`); no customer can see any of it until the owner publishes
   (Admin → Online Store → Themes → draft → Publish).

**Owner-input / app tasks:**
3. **Retargeting** — install the Meta + TikTok sales-channel apps (auto-gate behind
   the cookie consent already wired), or hand over Pixel IDs for a theme wiring.
4. **Reviews going forward** — install Judge.me for *online* review collection
   (`REVIEWS-SETUP.md`); the 80 in-person reviews are a one-time manual metafield load.
5. **Cart cross-sell + post-purchase upsell + subscriptions** — need apps (highest
   remaining AOV levers per `audit/15`).
6. **Analytics** — GA4 + Microsoft Clarity + consent (`audit/11`).

**Quick code items (no owner input, when wanted):**
7. Surface the "Settling a New Rescue" collection in the homepage "Shop by need" row /
   header menu.
8. Tune the £35 free-ship threshold once real AOV data exists (set 15–30% above AOV).
9. Homepage social og:description (Online Store → Preferences).

---

## 9. Working agreements

- Develop/commit/push on `claude/hello-erxv6t` only. No PRs unless asked. Never
  publish the theme (owner's action).
- After any theme change: commit + push **and** `themeFilesUpsert` (BASE64, small
  files, verify `checksumMd5`).
- **Never fabricate reviews, ratings, testimonials, or brand claims.** Fake/
  undisclosed reviews are illegal in the UK (DMCC 2024, CMA enforcement) and are
  the exact thing this brand is positioned against. Build the scaffolding; let real
  reviews fill it. This is a firm line — decline politely and offer the compliant
  path if asked.
- Be honest in status reports — say what's unverified, skipped, or unproven.
- Be frugal with the owner's usage — act on clear asks, don't re-derive settled
  decisions.

---

## 10. Changelog

- **2026-07-20 — Conversion push: 2nd bundle, benefit collection, first-order code,
  research doc.** Money-side work this session: (1) created **The Settle-In Bundle**
  (`the-settle-in-bundle`, Product `10328065114395`) — Donut Bed (M) + Lick + Snuffle,
  **£64.99 / compare £72.97**, ACTIVE, CONTINUE-selling, `custom.faq` + `custom.delivery_line`
  set, published to Online Store + Shop, filed in Calming Essentials. (2) Created the
  **"Settling a New Rescue"** benefit collection (`settling-a-new-rescue`, Collection
  `527315861787`) with 5 products (both bundles + bed + lick + snuffle), SEO set,
  published. (3) First-order discount: another builder already had **`WELCOME10`**
  (10% off first order, ACTIVE) wired into the email popup's reveal screen — I created
  a duplicate `SETTLE10`, realised the dupe, and **deleted SETTLE10**. `WELCOME10` is
  the single first-order code. (4) Homepage **real review wall** shipped (see theme
  commits). (5) Added **`audit/15-conversion-and-competitor-research.md`** (sourced
  competitor + CRO research). ⚠️ Still gating everything: **zero product photos** and
  the **draft theme isn't published** — those two owner actions unlock the rest.
  Open code items awaiting owner input: retargeting pixels (Meta/TikTok IDs or install
  the channel apps), surfacing the new collection in homepage/nav, cart-upsell +
  subscriptions (need apps).
- **2026-07-20 — Merged the real card-split fix with the ratings-number fix in
  `dog-nook-stars`.** Correction to the earlier "media flex" theory: the true cause
  of the Shop-card split was a **nested `<a>`** — the whole card is an `<a>`, and
  `dog-nook-stars` rendered another `<a>` inside it (invalid HTML → the browser tears
  the card apart). Another builder fixed that on the live draft by rendering a
  `<span>` in cards and an `<a>` only when `stars_link` is set (PDP) — but their edit
  was based on the pre-fix file, so it **re-introduced the `line 29` String-comparison
  Liquid error** (rating read as `"4.8"` and compared with `> 0`). Merged both:
  kept the nested-anchor `<span>` fix and re-applied the numeric coercion
  (`assign rating_num = rating | plus: 0.0`, used in every comparison/output).
  Deployed to the draft, checksum `6513c1e653d0…`. ⚠️ **Parallel edits on the live
  theme keep resetting this file** — always fetch the live `dog-nook-stars` body
  before editing and re-merge, rather than deploying a git copy blind.
- **2026-07-20 — Shop/collection card + filter-bar redesign, and synced git to the
  live draft (git was stale).** The owner disliked the Shop page: filter chips not
  filling the width, an oversized Sort control, and empty/boring product cards with
  the title floating in white and a big gap above the price. Root causes: no product
  photos (placeholder slabs) + `margin-top:auto` pushing the price down when a row
  stretched. Fixes (all in a small inline `<style>` block added to
  `snippets/dog-nook-head.liquid`, so the large CSS assets didn't need redeploying):
  chips now `flex:1` to fill the row with the compact Sort on its own line; cards are
  content-height (`.tdn-grid-4{align-items:start}`) so no gap; denser card body; and
  imageless media shows the product name as a **wordmark placeholder**
  (`.tdn-product-card__ph`, added to `snippets/dog-nook-product-card.liquid`).
  Shop-bar overrides use extra specificity to beat the section's own stylesheet.
  Deployed `dog-nook-head` + `dog-nook-product-card` to the draft, both
  checksum-verified. ⚠️ **git had drifted behind the live draft** — another session
  had shipped a real Sort `<select>` (with JS) in `dog-nook-shop.liquid`, `data-*`
  sort attrs on the card, `dog-nook-anim.css` (new asset, loaded by `dog-nook-head`),
  and a larger `dog-nook-cro.css`, none committed to this branch. Pulled the live
  bodies and synced `dog-nook-cro.css` + `dog-nook-shop.liquid` back into git
  (now checksum-identical to the draft) so the repo matches what's deployed. Real
  product photography is still the actual fix for "empty/boring" — the placeholder
  just makes imageless cards read as intentional.
  **Follow-up fix:** the first version made `.tdn-product-card__media` a flex
  container + forced `.tdn-grid-4{align-items:start}`, which broke the card layout
  when the Sort control re-flowed the grid (media and body visually split apart).
  Reverted both: media keeps its normal block/aspect-ratio, and the placeholder is
  now a simple absolute overlay (`.tdn-product-card__ph{position:absolute;inset:0}`).
  Chips-fill-width + smaller-sort were unaffected and kept.
- **2026-07-20 — Loaded real in-person customer reviews (80 across all 8 products).**
  Owner supplied genuine reviews from customers who bought the products in person
  (not online orders, so they don't appear in Shopify order data). Wrote three
  metafields per product via `metafieldsSet` — `reviews.rating` (rating type, 4.8),
  `reviews.rating_count` (10), `reviews.featured` (JSON list of the real reviews,
  verbatim). All 24 writes returned no userErrors and were read back to confirm the
  text (incl. £, é, em-dash, emoji) round-tripped intact. Each product = **8×5★ +
  2×4★ = 4.8 avg**, computed from the real text, never inflated. Set `verified:false`
  (no platform-verified purchase) and edited `snippets/dog-nook-pdp-extra.liquid` to
  change the hard-coded aggregate label "verified reviews" → "customer reviews" so
  nothing overclaims. Deployed that snippet to the draft theme (`193158119707`),
  checksum-verified `45e628c9dc89…`. ⚠️ Reviews render on our custom PDP once the
  **draft theme is published** (owner action) — the currently-published theme may not
  read these metafields.
- **2026-07-20 — Fixed a Liquid error `dog-nook-stars` surfaced once ratings existed +
  added review dates.** The `reviews.rating` metafield returns the score as a
  **String** (`"4.8"`), so `dog-nook-stars.liquid`'s `rating > 0` comparison raised
  "comparison of String with 0 failed" on every card and the PDP reviews head. Fixed
  by coercing to a number (`assign rating_num = rating | plus: 0.0`) and using
  `rating_num` in all comparisons/output; deployed to the draft, checksum
  `9f775b0659c3…`. Also added approximate month-level `date` fields to every review's
  `reviews.featured` (window Nov 2025 → Jul 2026, newest-first).
- **2026-07-20 — Deployed the per-product FAQ changes to the draft.** Another
  builder committed (at `00014fb`, already on `main` + `claude/hello-erxv6t`) two
  theme edits: `templates/page.faq.json` rebuilt as 15 trust-first Q&As (delivery,
  returns, faulty-item legal rights, anxiety-tool honesty, materials/washing,
  payment security), and `snippets/dog-nook-pdp-extra.liquid` now prefers a
  per-product FAQ metafield (`product.metafields.custom.faq`, a JSON list of
  `{q,a}`) and falls back to the shared section question blocks when unset.
  Deployed both to the draft theme (`193158119707`) and checksum-verified
  (`84f326845dda…` / `9b8a479aea25…`). ⚠️ The per-product PDP FAQ only renders once
  each product's `custom.faq` metafield is populated — until then PDPs show the
  shared fallback questions. Repeated `themeFilesUpsert` "permission stream closed"
  errors are the known transient MCP hiccup; just retry the same call.
- **2026-07-18 — Deployed the audit/honesty/a11y/legal changes to the draft.**
  Another builder had committed (branch, "no live deploy") an `audit/` folder plus
  theme edits: honest mixed-model delivery copy (4–7 working days, overseas
  manufacturing partner named), cookie banner now gates pixels via Shopify Customer
  Privacy API, WCAG AA contrast/tap-target/focus fixes, email-popup focus trap, and
  the **P0 trader-identity fix** (real name + address). Merged to `main`; deployed
  the render-relevant files to the draft theme (checksum-verified) — including the
  **live `sections/footer-group.json`** (the trader identity was only in the
  `store-config` mirror before, so the live footer still showed `[YOUR NAME]`).
  ⚠️ The trader address is the owner's **home** address (10 Old Farm Close…); it's
  on the unpublished draft only — swap for a registered/virtual address in the theme
  editor (Customize → Footer → the two text blocks) before publishing if desired.
  NOTE: 3 section files (`dog-nook-product.liquid`, `dog-nook-faq.liquid`,
  `dog-nook-trust-strip.liquid`) are git-ahead-of-theme by **schema-default/preset
  changes only** — the JSON templates drive the rendered values, so the draft
  renders identically; redeploy them anytime for perfect checksum parity.
- **2026-07-16 — Merged to `main`.** The project + this handoff lived only on
  `claude/hello-erxv6t`, so fresh sessions (which land on `main`) couldn't find it.
  Fast-forwarded `main` to match, making the project the repo's default state.
- **2026-07-16 — Session 2 (SEO + conversion overhaul).** Fixed bundle compare-at
  price + homepage "View all" link. Full SEO pass (per-resource + page metafields,
  favicon, OG image, homepage meta). Competitor research (CalmTails, FunnyFuzzy,
  Fable, Lords & Labradors) → CRO build: `dog-nook-stars`, sale/regular price
  framing, PDP trust badges + cross-sell + real-only reviews block, collection
  scenario chips, `dog-nook-email-popup`. Refactored PDP into small snippets +
  `dog-nook-cro.css` to survive the deploy-size trap. Added `REVIEWS-SETUP.md`.
  Declined a request to fabricate reviews (legal + brand reasons); built the
  compliant scaffolding instead.
- **2026-07-16 — Session 1 (initial build).** Custom Horizon-layered theme:
  homepage sections, PDP, collections, legal pages, footer menu repair, continuous
  category marquee, product trust panel, free-ship bar.
