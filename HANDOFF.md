# The Dog Nook — Session Handoff

> Read this first. It gives a fresh Claude Code session everything needed to
> continue work on this project without prior context.

---

## 1. What this project is

**The Dog Nook** is a custom **Shopify storefront theme** for a UK brand selling
calming beds, mats, grooming tools and feeding gear **for anxious & rescue dogs**.

The look is warm and reassuring: cream background, sage-green brand colour,
terracotta accents, a Playfair Display serif for headings and Inter for body.
Voice is gentle, honest, low-pressure ("the risk is ours, not yours",
"a real person replies").

It is **not** a from-scratch theme. It is a set of drop-in custom sections,
snippets, templates and one stylesheet that layer on top of Shopify's **Horizon**
theme. Everything custom is namespaced `dog-nook-*` (files) / `.tdn-*` (CSS).

---

## 2. Where things live

- **Repo:** `aryancodes420/sc`
- **Working branch:** `claude/hello-erxv6t` (develop, commit, and push here — do
  NOT push elsewhere without explicit permission)
- **Theme source:** everything under `dog-nook-theme/`
- **This project uses the Shopify MCP server** (`mcp__Shopify__*`) and the GitHub
  MCP server (`mcp__github__*`). Load tool schemas via `ToolSearch` when needed
  (e.g. `ToolSearch` query `select:mcp__Shopify__graphql_mutation`). MCP servers
  in this environment disconnect/reconnect intermittently — if a tool "isn't
  found", re-run ToolSearch; it waits for reconnect.

### File map (`dog-nook-theme/`)
| Area | Files |
|---|---|
| **Styles/JS** | `assets/dog-nook.css` (all design tokens + component CSS), `assets/dog-nook.js` |
| **Homepage sections** | `dog-nook-hero`, `dog-nook-category-bar` (moving marquee), `dog-nook-trust-strip`, `dog-nook-why`, `dog-nook-featured-bundle`, `dog-nook-collection-list`, `dog-nook-reviews-placeholder`, `dog-nook-newsletter` |
| **Commerce/content sections** | `dog-nook-product`, `dog-nook-bundle`, `dog-nook-shop`, `dog-nook-collection`, `dog-nook-collections-index`, `dog-nook-faq`, `dog-nook-contact`, `dog-nook-rich-text`, `dog-nook-announcement` |
| **Snippets** | `dog-nook-head` (loads the CSS), `dog-nook-product-card`, `dog-nook-trust-panel`, `dog-nook-cart-progress`, `dog-nook-freeship-bar`, `dog-nook-cookie-banner` |
| **Templates (JSON)** | `index`, `product`, `product.bundle`, `collection`, `list-collections`, `page.shop`, `page.about`, `page.faq`, `page.contact` |
| **Store config** | `store-config/cart-drawer.liquid`, `store-config/footer-group.json` (reference copies of theme-level config) |
| **Docs** | `README.md` (install guide) |

---

## 3. How deployment actually works ⚠️ IMPORTANT

**GitHub is the source of truth, but the live theme is NOT auto-synced from
GitHub.** Files are pushed to the theme manually via the Shopify Admin API.

- **Target theme:** unpublished/draft theme
  `gid://shopify/OnlineStoreTheme/193158119707`
- **Mechanism:** `mcp__Shopify__graphql_mutation` → `themeFilesUpsert`
- Theme **publishing is blocked** by the MCP tool for safety. The store owner
  must publish manually: **Shopify Admin → Online Store → Themes → (draft theme)
  → Actions → Publish.**

### The deploy gotcha (learned the hard way)
1. **One file per `themeFilesUpsert` call.** Sending multiple large files in a
   single call makes the tool's permission stream abort ("Tool permission stream
   closed before response received"). Splitting into single-file calls fixed it
   every time.
2. **Use `BASE64` body type**, not `TEXT`, to avoid all newline/quote escaping
   problems. Generate with `base64 -w0 <file>` in Bash, paste the string as the
   `value`.

Deploy mutation shape:
```graphql
mutation upsert($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
  themeFilesUpsert(themeId: $themeId, files: $files) {
    upsertedThemeFiles { filename }
    userErrors { filename code message }
  }
}
```
Variables: `{ themeId, files: [{ filename: "assets/dog-nook.css",
body: { type: "BASE64", value: "<base64>" } }] }`

**Every code change needs BOTH:** (a) commit + push to the branch, AND (b)
`themeFilesUpsert` to the draft theme. Doing only one leaves git and the live
theme out of sync.

---

## 4. Design system cheat-sheet

All custom markup is wrapped in a `.tdn` scope. Key tokens (see top of
`assets/dog-nook.css`):
- `--tdn-cream #F3EDE4` (bg), `--tdn-sage #7C8767` (brand), `--tdn-charcoal
  #2E2A22` (text), `--tdn-terracotta #C17A57` (accent/sale)
- Fonts: `--tdn-font-display` (Playfair Display), `--tdn-font-body` (Inter)
- Layout: `--tdn-maxw 1180px`, `--tdn-side-pad 40px` (20px on mobile)

### ⚠️ The recurring CSS trap
There is a generic link rule:
```css
.tdn a:not(.tdn-btn):not(.tdn-chip):not(.tdn-product-card):not(.tdn-coll-card):not(.tdn-cindex):not(.tdn-catbar__pill) { color: var(--tdn-sage); }
```
It has **high specificity** (many `:not()`s) and will override a component's own
text colour. **Any new `<a>`-based component (button, chip, pill) must be added
to that `:not()` exclusion list**, or its text renders sage-on-sage and goes
invisible. This bug has bitten hero buttons and the category pills already.

---

## 5. Products, collections, catalog facts

- **Collections (handles):** `calming-essentials`, `grooming`,
  `mealtime-feeding`, `travel-outdoor`
- **Bundle product handle:** `the-new-rescue-bundle-1` (note the `-1` suffix —
  `the-new-rescue-bundle` without it 404s). Uses `templates/product.bundle.json`.
- **Inventory:** all variants set to **CONTINUE** selling when out of stock, so
  Add-to-Cart works even at 0 stock (was previously DENY/blocked).
- **Legal pages created:** `shipping-policy`, `refund-returns`,
  `terms-of-service`, `cookie-policy` (linked from footer menus).
- Footer Explore/Help/Legal menus were repaired via `menuUpdate` GraphQL
  mutations to point at correct handles.

---

## 6. Current state (as of this handoff)

**Feature-complete and deployed to the draft theme.** Latest work: the homepage
category bar is a **continuously-moving marquee** — auto-scrolls, loops
seamlessly (pills cloned at runtime), pauses on hover/touch so pills stay
clickable, respects `prefers-reduced-motion`, sits above the hero under the
header. Speed constant is `speed = 0.035` px/ms inside
`sections/dog-nook-category-bar.liquid`.

**Latest commits on `claude/hello-erxv6t`:**
- `Make category bar a continuously-moving marquee`
- `Fix category pill text visibility + move carousel above hero`
- `Add scrolling category bar and product trust panel; fix footer`

Git working tree is clean; branch pushed; draft theme matches HEAD.

**Only outstanding action:** the owner publishes the draft theme (see §3).

---

## 7. Likely next tasks (not started)

1. **Marquee polish** — tune `speed`, or add collection thumbnail images inside
   each pill instead of plain text.
2. **Reviews** — replace `dog-nook-reviews-placeholder` with a real reviews
   integration once verified reviews exist.
3. **Pre-launch QA** — click through every page on the live preview and fix
   anything visually off before publishing.
4. **SEO basics** — page titles, meta descriptions, favicon, social share image.

---

## 8. Working agreements

- Develop/commit/push on `claude/hello-erxv6t` only.
- Do **not** open a PR unless explicitly asked.
- Do **not** publish the theme (blocked; owner's action).
- After any theme code change: commit + push **and** `themeFilesUpsert` the
  changed file(s), one file per call, BASE64 body.
- Be frugal with the store owner's usage — act on clear asks, don't re-derive
  settled decisions.
