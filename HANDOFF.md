# The Dog Nook — Living Handoff

> **Read this first, top to bottom.** It gives a fresh Claude Code session
> everything needed to continue this project with zero prior context: what it is,
> how to deploy, the traps that will bite you, what's already done, and what's next.
>
> **Last updated:** 2026-07-16 (Session 2 — SEO + conversion overhaul)

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
  collections grid (+"View all"), reviews placeholder, newsletter. Announcement bar
  copy matches spec.

### Honest gaps (do not pretend these are done)
- **No real reviews yet** — needs Judge.me installed (owner, see `REVIEWS-SETUP.md`)
  and real buyers. Everything shows "Be the first to review" until then.
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

1. **Get real reviews flowing** — owner installs Judge.me + enables review-request
   emails (`REVIEWS-SETUP.md` has the copy). Highest-impact remaining lever.
2. **Real lifestyle photography** — swap placeholder blocks for warm calm-dog
   shots; also produce a proper branded 1200×630 OG share image.
3. **Post-launch analytics** — turn on Shopify/GA, watch drop-off, optimise on real
   data (iterative, not a one-shot build).
4. **Homepage social og:description** — owner sets it in Online Store → Preferences.
5. Optional: cart-stage cross-sell once the live cart can be tested; per-collection
   scenario copy (currently one shared default via `collection.json`).

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
