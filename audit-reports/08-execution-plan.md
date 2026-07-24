# The Dog Nook — Exact CRO Execution Plan

> Derived from `00-master-cro-plan.md` (+ the seven specialist reports). This is
> the precise, file-by-file plan.

## Implementation status (2026-07-24)

All code-completable items are DONE and deployed to the CRO working-copy draft
`gid://shopify/OnlineStoreTheme/193438056731` (verified; committed to branch
`claude/dog-nook-file-review-gl61uw`). Publishing stays the owner's action.

- **Batch 1 — DONE:** D3, Q4, Q2 (freeship snippet removed from git; the orphan
  file couldn't be API-deleted from the theme — delete via Admin → Edit code if
  desired), Q3, Q1, C2, D1 (social URLs cleared).
- **Batch 2 — DONE:** Q5, Q6, Q7, ST4.
- **Batch 3 — DONE:** C3 (FAQ origin resequenced, disclosure preserved), C4
  (trust-strip de-duplicated).
- **Batch 4 — code DONE, data/inspection pending:** ST1 spec block scaffold
  shipped (reads `custom.materials/dimensions/care/safety/whats_in_box`, hides
  when empty) — **needs real per-product values + metafield defs in Admin**;
  ST2 Product/Offer JSON-LD shipped (aggregateRating only when a real review
  count exists) — **still worth validating a live PDP in Google Rich Results**;
  ST3 intentionally deferred (not needed at 9 single-option products).

### Remaining — owner/external only (cannot be done in code without fabricating)
- **Batch 5 (D2/C1/C5):** real product photography for 9 products + 2 bundles,
  plus per-image alt text. Biggest remaining conversion lever. (C5's hero-alt
  `<br>` strip is already done in Batch 1.)
- **ST1 data:** real Materials/Dimensions/Care/Safety/box values per product.
- **D4: CONFIRMED (2026-07-24)** — `WELCOME10` verified live via Admin API:
  ACTIVE, 10% off, once per customer (first order), all customers, no expiry.
  The popup/newsletter promise is backed by a real code. No action needed.
- **D1:** decide real social profile URLs (icons currently hidden).
- **Batch 6 (S1–S4):** A/B experiments — ship only with real traffic, never as
  fact.

## Deploy target & safety
- **Work theme (deploy here):** `gid://shopify/OnlineStoreTheme/193438056731` —
  "The Dog Nook — Design install (CRO working copy)", UNPUBLISHED. Created as a
  duplicate of the draft so the current draft is preserved as a rollback point.
- **Do NOT touch:** live/MAIN `193140818203`; leave the previous draft
  `193158119707` as the known-good baseline.
- **Deploy method (every code change):** edit the file in `dog-nook-theme/`
  (git) → `base64 -w0` → `themeFilesUpsert` to `193438056731` (BASE64) → verify
  `checksumMd5` for `.liquid/.css/.js`; for JSON templates read the body back
  (they normalize). Keep payloads small (base64 corruption trap). Commit each
  batch to the branch.
- **Constraints honoured:** no live-theme edits, no publishing, no fabricated
  reviews/urgency, no medical claims, no price changes, preserve editable
  section settings, prefer theme-native Liquid/CSS/light JS.

## Owner inputs required (blockers on specific items)
- **D1** — real Dog Nook profile URLs for Facebook/Instagram/TikTok/YouTube/X, OR
  a decision to remove the social block until profiles exist.
- **D4** — confirm an active `WELCOME10` discount (10%, first-order) exists in
  Admin → Discounts. (Verification only; no code.)
- **D2 / C1 / C5** — real product photography (9 products + 2 bundles) + per-image
  alt text. Deferred to the Higgsfield pass; not in Batch 1.
- **ST1** — the real Materials / Dimensions / Care / Safety values per product
  (to populate metafields).

---

# BATCH 1 — Safe, high-confidence, no redesign, no photo dependency
*All items below are code/copy I can implement and deploy to the work theme now.*

## D3 — Mobile sticky ATC must honour the selected quantity  ·  [code] · effort 2 · risk low
**Problem:** the sticky mobile form is separate from the main buy form and has no
quantity field, so it always adds 1 even if the shopper set qty 2.
**Files:** `sections/dog-nook-product.liquid`, `assets/dog-nook.js`.
**Exact change:**
1. In `sections/dog-nook-product.liquid`, inside the sticky `{%- form 'product', product -%}` block, add a synced hidden qty next to the existing `<input type="hidden" name="id">`:
   `<input type="hidden" name="quantity" value="1" data-tdn-sticky-qty>`
2. In `assets/dog-nook.js`, add a small initializer (called from `initAll`): on change/input of `#tdn-qty`, copy its value into every `[data-tdn-sticky-qty]`. Guard for absence of `#tdn-qty`.
**Deploy:** upsert both files to `193438056731`; verify checksums.
**Verify:** on a PDP at ≤760px, set qty 2, add via the sticky bar → cart shows 2.

## Q4 — Accessible labels on contact + newsletter inputs  ·  [code/a11y] · effort 1 · risk none
**Problem:** placeholder-only inputs (WCAG 1.3.1 / 3.3.2 fail; breaks mobile autofill).
**Files:** `sections/dog-nook-contact.liquid`, `sections/dog-nook-newsletter.liquid`.
**Exact change:** add `aria-label` to each field (pattern already used in the email popup):
- Contact: name input → `aria-label="Your name"`; email → `aria-label="Your email"`; textarea → `aria-label="How can we help?"`.
- Newsletter: email input → `aria-label="Email address"`.
**Deploy:** upsert both; verify checksums.
**Verify:** each field has an accessible name (axe / manual).

## Q2 — LCP image priority hints + delete dead free-ship code  ·  [code/perf] · effort 1 · risk very low
**Problem:** PDP main image has no priority hint; `dog-nook-freeship-bar` snippet + `initFreeShip/renderFreeShip` JS are unused (live path is `dog-nook-cart-progress`) yet ship to every page.
**Files:** `sections/dog-nook-product.liquid`, `sections/dog-nook-hero.liquid`, `assets/dog-nook.js`, delete `snippets/dog-nook-freeship-bar.liquid`.
**Exact change:**
1. PDP main image (`dog-nook-product.liquid`, the `product.featured_media | image_tag` call): add `loading: 'eager', fetchpriority: 'high'`.
2. Hero Layout-A image (`dog-nook-hero.liquid`, the `s.image | image_tag` call): add the same. *(Note: the homepage hero currently uses the full-bleed gradient variant with no `<img>`, so this only bites once Layout A / a hero image is used — apply anyway for correctness.)*
3. In `assets/dog-nook.js`: remove `renderFreeShip`, `initFreeShip`, and the `initFreeShip()` call in the `DOMContentLoaded` handler. Grep-confirm no other reference before deleting the snippet file.
4. Delete `snippets/dog-nook-freeship-bar.liquid` (via `themeFilesDelete` on the work theme). Record the removal (CLAUDE.md "record material changes").
**Deploy:** upsert the 2 sections + JS; `themeFilesDelete` the snippet on `193438056731`.
**Verify:** view-source shows `fetchpriority="high"` on the PDP image; cart free-ship bar still works (it uses `dog-nook-cart-progress`, untouched).

## Q3 — Remove stale "coming soon" reviews keys from `index.json`  ·  [code] · effort 1 · risk low
**Problem:** the homepage `reviews` section still sets `heading:"Real reviews, coming soon"`, `body`, `placeholder_note` — orphaned keys (the live section reads `title`/`subtitle`/`agg_*` and renders the real 4.8/80 wall). Latent honesty risk if the schema is ever refactored.
**File:** `templates/index.json` (the `reviews` section `settings`).
**Exact change:** delete the `heading`, `body`, and `placeholder_note` keys; keep `eyebrow`. (Optionally set the real `title`/`subtitle`/`agg_*` explicitly so they're not schema-default-dependent.)
**Deploy:** upsert `index.json`; verify by reading the body back (JSON normalizes).
**Verify:** homepage still shows the real review wall; no "coming soon" text anywhere.

## Q1 — Sticky ATC bottom-padding + safe-area + cookie-banner overlap  ·  [code] · effort 2 · risk low
**Problem:** no space reserved for the fixed `.tdn-pdp-sticky` (~70–80px) so the last content/footer is occluded on mobile; the cookie banner (z-index 90) can sit over the ATC (z-index 50); neither uses `env(safe-area-inset-bottom)`.
**File:** `assets/dog-nook-pdp.css` (small, loads last — avoids redeploying the large `dog-nook-cro.css`).
**Exact change:** in a `@media (max-width:760px)` block:
- Reserve space so the sticky bar never covers content — e.g. add bottom padding to the PDP wrapper (`.tdn[data-tdn-product]` or a body class) equal to the sticky height.
- `.tdn-pdp-sticky { padding-bottom: calc(12px + env(safe-area-inset-bottom)); }`
- Lift the cookie banner clear of the ATC (raise `.tdn-cookie` bottom offset above the sticky bar height on mobile, or ensure it doesn't overlap) — coordinate so the banner sits *above*, not *over*, the ATC.
**Deploy:** upsert `dog-nook-pdp.css`; verify checksum.
**Verify:** PDP at 390/430px with the cookie banner active — ATC and last section fully visible above the iPhone home indicator; banner doesn't cover the ATC.

## C2 — PDP delivery promise must match the honest mixed timelines  ·  [content] · effort 1 · risk low
**Problem:** every PDP shows a fixed "🚚 Fast, tracked dispatch" promise title (even on 4–7-day overseas items) and an absolute "In stock — ready to dispatch" line — inflated vs the honest FAQ.
**Files:** `sections/dog-nook-product.liquid` (trust-promise grid), `snippets/dog-nook-pdp-form.liquid` (stock line).
**Exact change:**
- Change the first promise **title** "Fast, tracked dispatch" → a neutral, honest label (e.g. "Tracked UK delivery"), and keep the subtext bound to the honest per-product line (`{{ _delivery }}`, already sourced from `custom.delivery_line | default: s.delivery_text`). No new claims.
- Soften the stock line in `dog-nook-pdp-form.liquid`: "In stock — ready to dispatch" → "In stock" (drop the immediacy implication). Leave the availability logic unchanged.
**Deploy:** upsert both; verify checksums.
**Verify:** each PDP's promise text matches that product's delivery metafield / FAQ (spot-check the Car Boot Liner vs an overseas item).

## D1 — Footer social links → real profiles or removed  ·  [config] · effort 1 · risk low · **needs owner input**
**Problem:** social icons point to bare platform homepages (`facebook.com/` …) — the clearest dropshipping tell; contradicts positioning.
**File:** `store-config/footer-group.json` is only a reference copy; the **live** footer is Horizon's `sections/footer-group.json` (block `social_links_Ew63Kq`). Edit that on the work theme (or Admin → theme editor → Footer → Social links).
**Exact change (owner picks one):** (a) set the real Dog Nook profile URLs, or (b) clear the URLs so the icons don't render.
**Deploy:** upsert `sections/footer-group.json` to `193438056731` (JSON — verify by reading body back), or do it in the theme editor.
**Verify:** each icon resolves to a real profile in preview, or the row is gone.

---

# BATCH 2 — Accessibility + mobile polish (code-confirmed)

## Q5 — Swatch radiogroup ARIA + hide decorative emoji  ·  [code/a11y] · effort 2 · risk low
**Files:** `snippets/dog-nook-pdp-form.liquid`, `snippets/dog-nook-trust-panel.liquid`, `sections/dog-nook-product.liquid`, `snippets/dog-nook-cart-progress.liquid`.
**Change:** on the colour-swatch branch add `role="radio"` + `aria-checked` (mirror what the size-pill branch already does) and wrap with `role="radiogroup"`; add `aria-hidden="true"` to decorative emoji (trust-panel icons, promise icons, freeship emoji). *(Swatch path is dormant until a colour product ships — but cheap to fix now.)*

## Q6 — Inline-link contrast ≥4.5:1 + marquee pause on focus  ·  [code/a11y] · effort 2 · risk medium (link-trap)
**Files:** `assets/dog-nook-cro.css` (where the other contrast fixes live — NOT the big `dog-nook.css`), `sections/dog-nook-category-bar.liquid`.
**Change:** darken the inline-link colour used by `.tdn a:not(...)` to ≥4.5:1 on cream via a `dog-nook-cro.css` override (respect the `:not()` "link trap" — the override must cover the same inline-link surfaces). In the category-bar JS, add `focus`/`blur` handlers that pause/resume the marquee (mirror the existing hover/touch pause) so a focused pill doesn't slide away (SC 2.2.2).
**Risk note:** the link colour interacts with the high-specificity `:not()` exclusion list — verify across all inline-link surfaces after the change.

## Q7 — Cookie banner + email popup focus/announcement  ·  [code/a11y] · effort 2 · risk low
**Files:** `snippets/dog-nook-cookie-banner.liquid`, `snippets/dog-nook-email-popup.liquid`, `assets/dog-nook.js`.
**Change:** when the cookie banner shows, move focus into it (or add `aria-live`) and add `aria-modal`; when the email popup opens, set `inert`/`aria-hidden="true"` on the background so a virtual cursor can't escape it (keep the existing focus-trap + focus-restore).

## ST4 — Tap targets: category pills + pagination ≥44px  ·  [code/a11y] · effort 2 · risk low
**Files:** `assets/dog-nook.css` pills (override in `dog-nook-cro.css` to avoid redeploying the big file), collection/shop pagination CSS.
**Change:** raise `.tdn-catbar__pill` height and `.tdn-pagination a` padding to ≥44px targets. Verify the pill row height change doesn't break the marquee stride measurement.

---

# BATCH 3 — Honest copy & merchandising (no redesign)

## C3 — Re-sequence the FAQ "manufacturing partner overseas" sentence  ·  [content] · effort 1
**File:** `templates/page.faq.json` block `f2`. Lead with curation/QA rationale; keep the origin disclosure as a secondary factual clause (must NOT be removed — compliance). Owner sign-off on tone.

## C4 — De-duplicate repeated trust claims  ·  [content] · effort 2
**File:** `templates/index.json` (settings for `trust-strip` + `why`). Re-scope the trust-strip cells to *different* facts (materials / UK-based specialist / real 30-day guarantee stated once) rather than restating free-delivery + guarantee that the hero and why-us already carry. Keep both sections (preserve editable settings) — copy change only.

---

# BATCH 4 — Structured product depth (code + product-data)

## ST1 — Materials / Dimensions / Care / Safety + "What's in the box" on the standard PDP  ·  [code + product-data] · effort 3
**File:** `sections/dog-nook-product.liquid` — add render blocks mirroring the existing `custom.delivery_line` pattern, reading `custom.materials` / `custom.dimensions` / `custom.care` / `custom.safety` (define these metafields in Admin) and rendering only when present. Populate per product (owner/ops).
**Verify:** PDP shows the spec block when populated, hides cleanly when empty.

## ST2 — Confirm Product JSON-LD still fires under the custom PDP  ·  [seo] · effort 2 · needs live inspection
Inspect the live `layout/theme.liquid` / Horizon `main-product` (not in this repo) to confirm structured data survives; add Product/Offer JSON-LD if displaced. Validate with Google Rich Results Test on a live PDP.

## ST3 — Pre-expansion guards (do WHEN catalogue grows)  ·  [code]
Before shipping any colour / multi-option product or a >48-item collection: responsive PDP thumbnail column count; visible swatch captions; wire the multi-option `<select>` to the price/ATC JS; make the shop sort pagination-aware. Not needed at 9 single-option products.

---

# BATCH 5 — Photography programme (deferred to Higgsfield)
**D2 / C1** real photos for 9 products + 2 bundles (shoot to `aspect-ratio:4/3` / `object-fit:cover` so portraits don't crop); **C5** per-image alt text + strip tags from the hero alt fallback (`dog-nook-hero.liquid`) so a literal `<br>` can't leak into alt. Sequence alt-text with the upload.

---

# BATCH 6 — Experiments (only with real traffic; treat as hypotheses)
**S1** move "Shop by need" grid earlier · **S2** persona-neutral hero CTA · **S3** bundle order / comparison · **S4** newsletter vs 10%-popup double-ask. Do NOT ship as fact — A/B with a real metric once traffic supports significance; otherwise leave as-is.

---

## Ops-only verifications (no code)
- **D4** — confirm `WELCOME10` is a live 10%/first-order discount.
- **D1** — confirm real social profiles exist (else remove the block).
- **ST1** — gather real per-product Materials/Dimensions/Care/Safety values.

## Recommended sequence
Batch 1 (D3, Q4, Q2, Q3, Q1, C2, D1) → Batch 2 (Q5, Q6, Q7, ST4) → Batch 3 (C3, C4) → Batch 4 (ST1, ST2, ST3) → Batch 5 photography → Batch 6 experiments. Commit + deploy each batch to `193438056731`; run Theme Check in a CLI-enabled dev env after each batch; owner does visual QA on the work-theme preview; publishing stays the owner's action.
