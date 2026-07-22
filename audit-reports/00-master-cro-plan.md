# The Dog Nook — Consolidated CRO Implementation Plan (CRO Lead)

Read-only audit of `/home/user/sc/dog-nook-theme/`. Live storefront firewalled — render-dependent items flagged as hypotheses; no scores fabricated from unmeasured renders. This plan is advisory only; no theme files edited. Scores use (Impact × Confidence) / Effort. Change-type tags: [CODE] [CONTENT] [PHOTO] [PRODUCT-DATA] [OFFER] [OPS].

## Consolidation notes (duplicates merged, conflicts resolved)
- **Photography gap** raised by reports 01/02/03/04/05 → single item C1. It is [PHOTO]/[CONTENT], not a code task, and gates the impact of most messaging fixes.
- **Stale reviews JSON keys** (`heading`/`body`/`placeholder_note` in `index.json`) raised by 01/02/05 → single item Q3. Confirmed non-live-facing (schema uses `title`/`subtitle`), so severity is low — rejecting the framing that it is customer-facing.
- **Emoji trust icons + "generic dropshipping tell"** (01/02/04) → treated as a differentiation hypothesis (S-series), NOT a defect. No evidence it depresses conversion; reject as a redesign trigger.
- **Homepage resequencing / bundle order / hero-CTA persona** (01/02) → grouped as structural experiments (S1–S3), explicitly conflicting with "prevent unnecessary redesign" unless traffic-validated.
- **Conflict resolved:** Report 02 recommends *merging* trust-strip and why-us; Report 01 wants to *keep* why-us near top. Resolution: do not delete either component (preserves editable sections); instead de-duplicate repeated claims by re-scoping copy — deferred content task, not a structural teardown.
- **Marquee**: 02/04/06/07 all touch it. Reduced-motion is already handled correctly (verified in 04/07); the real gaps are keyboard-focus pause (a11y) and sub-44px pill tap targets. Motion-removal is a hypothesis only.

---

## 1. Critical defects (fix before any publish)

### D1 — Footer social icons link to bare platform homepages [CODE/CONFIG]
- Supporting: Report 05 (item 3). Verified directly: `store-config/footer-group.json` lines 331–335 — `facebook.com/`, `instagram.com/`, `youtube.com/`, `tiktok.com/`, `x.com/`.
- Friction: clearest "generic dropshipping tell" in the theme; clicking a social icon dumps a trust-seeking UK buyer on a platform homepage. Directly contradicts CLAUDE.md positioning.
- Component/files: `dog-nook-theme/store-config/footer-group.json` (block `social_links_Ew63Kq`), and the live footer-group in the theme editor.
- Required: real Dog Nook profile URLs, or remove the block until profiles exist. [OPS decision on which].
- Impact 4 · Confidence 5 · Effort 1 · **Priority 20.0**
- Regression risk: low (URL/config change; removing block alters footer layout slightly). Note: footer is Horizon-owned — edit via footer-group config, not theme Liquid.
- Validation: confirm each icon resolves to a real profile in theme editor preview; or confirm block removed.

### D2 — No product photography anywhere [PHOTO] (pre-launch blocker)
- Supporting: 01/02/03/04/05 + architecture map. Confirmed in code: `sections/dog-nook-hero.liquid` (placeholder label), `snippets/dog-nook-product-card.liquid` (wordmark tile), `sections/dog-nook-product.liquid` line 31 ("Product on clean background"), `dog-nook-featured-bundle.liquid`/`dog-nook-bundle.liquid` ("Bundle flat-lay").
- Friction: buyers of tactile comfort products cannot judge size/material/fit; literal instructional placeholder strings would render on a live launch. Undermines "relevant to my dog" and "trustworthy."
- Component/files: all image-bearing sections above (code paths already correct — they consume `featured_media`/`image`).
- Required: real photography for 9 active products + 2 bundles, plus per-image alt text (see A-series). This is a content/ops deliverable, not a code fix.
- Impact 5 · Confidence 4 (photography→conversion is a strong ecommerce prior, not site-measured) · Effort 5 · **Priority 4.0**
- Regression risk: low technically; portrait sources will crop under `aspect-ratio:4/3` and PDP `object-fit:cover` (Report 04) — shoot/crop to spec.
- Validation: visual QA of homepage grid, PDP gallery, both bundle PDPs at 320/390/430px after upload.

### D3 — Mobile sticky ATC form silently ignores selected quantity [CODE]
- Supporting: Report 06 (item 14). `sections/dog-nook-product.liquid` ~104–116: the sticky mobile form has no `quantity` input and is independent of the main form's `#tdn-qty`, so it always adds 1.
- Friction: a mobile buyer (dominant traffic) who sets qty 2 then uses the sticky bar under-orders silently — direct revenue loss.
- Component/files: `sections/dog-nook-product.liquid`, `snippets/dog-nook-pdp-form.liquid`, `assets/dog-nook.js`.
- Required: JS to mirror qty into the sticky form on change (or an accepted documented "sticky always adds 1").
- Impact 3 · Confidence 5 · Effort 2 · **Priority 7.5**
- Regression risk: low; test both add paths update the drawer count correctly.
- Validation: set qty 2, add via sticky bar, confirm cart shows 2.

### D4 — WELCOME10 / "10% off first order" promise unverifiable in code [OPS/OFFER]
- Supporting: 01 (F7), 02 (§2H). `sections/dog-nook-newsletter.liquid` and `snippets/dog-nook-email-popup.liquid` both promise code `WELCOME10`.
- Friction: if the discount is inactive/expired, it is a broken promise at the email-capture moment (and a UK CMA/DMCC exposure).
- Component/files: newsletter + popup snippets (copy is fine); the gap is backend.
- Required: confirm an active `WELCOME10` discount exists in Shopify Admin > Discounts (10%, first-order). [OPS verification only].
- Impact 3 · Confidence 2 (cannot confirm from source) · Effort 1 · **Priority 6.0**
- Regression risk: none (verification task).
- Validation: apply WELCOME10 in a test checkout.

---

## 2. High-confidence quick wins (code-confirmed, small, low-risk)

### Q1 — Sticky ATC bar has no bottom-padding compensation; can be overlaid by cookie banner [CODE]
- Supporting: 03 (item 2), 04 (defects 2 & 6). No `padding-bottom` reserves space for `.tdn-pdp-sticky` (fixed, ~70–80px); `.tdn-cookie` (z-index 90) sits above `.tdn-pdp-sticky` (z-index 50); neither uses `env(safe-area-inset-bottom)`.
- Friction: bottom of PDP content/footer occluded on mobile; cookie banner can cover the primary ATC on a first-visit PDP landing; iPhone home-indicator overlap.
- Component/files: `assets/dog-nook-cro.css` (`.tdn-pdp-sticky`, `.tdn-cookie`), optionally `sections/dog-nook-product.liquid` wrapper.
- Required: add page bottom padding equal to sticky height; add `env(safe-area-inset-bottom)`; coordinate z-index/offset so cookie banner sits above (not over) the ATC.
- Impact 3 · Confidence 4 (code fact; visual severity is hypothesis) · Effort 2 · **Priority 6.0**
- Regression risk: low; verify no double-gap on non-PDP pages.
- Validation: render PDP at 390/430px with cookie banner active; confirm ATC + last section fully visible above the home indicator.

### Q2 — Above-the-fold images lack priority hints; dead free-ship JS ships to every page [CODE/PERF]
- Supporting: Report 06 (items 1, 2, 3, 8). PDP main image (`sections/dog-nook-product.liquid:29`) and hero image (`sections/dog-nook-hero.liquid:40`) have no `fetchpriority`/`loading`. `snippets/dog-nook-freeship-bar.liquid` + `assets/dog-nook.js:101–130` (`initFreeShip`/`renderFreeShip`) are provably unused (live path is `dog-nook-cart-progress.liquid`).
- Friction: slower LCP on the two most important images once photography ships; dead code on every visitor.
- Component/files: `sections/dog-nook-product.liquid`, `sections/dog-nook-hero.liquid`, `assets/dog-nook.js`, `snippets/dog-nook-freeship-bar.liquid`.
- Required: add `loading:'eager', fetchpriority:'high'` to the two LCP images; delete the dead free-ship snippet + JS (document per CLAUDE.md "record material changes").
- Impact 2 (LCP effect unmeasured — protects performance) · Confidence 4 · Effort 1 · **Priority 8.0**
- Regression risk: very low (additive attrs; removed code is grep-confirmed unreferenced — verify nothing in the un-inspectable `layout/theme.liquid` renders the snippet before deleting).
- Validation: view-source shows the attributes; confirm cart free-ship bar still works via `dog-nook-cart-progress`.

### Q3 — Remove stale reviews-section keys from `index.json` [CODE/CONFIG]
- Supporting: 01 (F4), 02 (§2F), 05 (item 4). `templates/index.json` reviews section still sets `heading:"Real reviews, coming soon"`, `body`, `placeholder_note` — orphaned (schema uses `title`/`subtitle`); real 4.8/80 wall renders regardless.
- Friction: none live; latent risk that "coming soon" resurfaces and contradicts honesty policy if schema is refactored.
- Component/files: `dog-nook-theme/templates/index.json` (reviews section).
- Required: delete the three orphaned keys.
- Impact 1 · Confidence 5 · Effort 1 · **Priority 5.0**
- Regression risk: low (JSON normalizes on save — verify by reading body back, not checksum, per HANDOFF).
- Validation: real review wall still renders; no "coming soon" text.

### Q4 — Contact + newsletter inputs are placeholder-only (WCAG 1.3.1/3.3.2 fail) [CODE/A11Y]
- Supporting: Report 07 (items 3, 4). `sections/dog-nook-contact.liquid:17–19` and `sections/dog-nook-newsletter.liquid:14` have no label/`aria-label`. Fix pattern already exists in `dog-nook-email-popup.liquid` (`aria-label="Email address"`).
- Friction: form fields unusable/uncheckable for AT users and mobile autofill on a trust-critical audience.
- Component/files: `sections/dog-nook-contact.liquid`, `sections/dog-nook-newsletter.liquid`.
- Required: add visually-hidden `<label>` or `aria-label` per field.
- Impact 2 · Confidence 5 · Effort 1 · **Priority 10.0**
- Regression risk: none.
- Validation: axe/manual — each field has an accessible name.

### Q5 — Colour-swatch selection state + decorative emoji not exposed correctly to AT [CODE/A11Y]
- Supporting: Report 07 (items 1, 13). `dog-nook-pdp-form.liquid:50–54` swatches lack `role="radio"`/`aria-checked` (size pills already do it right); promise/trust emoji lack `aria-hidden="true"` (the buy-now lock icon already sets it).
- Friction: AT users can't tell selected colour; noisy emoji announcements. (Swatch path currently dormant — only Donut Bed is live, size-based — so impact is latent.)
- Component/files: `snippets/dog-nook-pdp-form.liquid`, `sections/dog-nook-product.liquid`, `snippets/dog-nook-trust-panel.liquid`, `snippets/dog-nook-cart-progress.liquid`.
- Required: add radiogroup ARIA to swatch branch; `aria-hidden="true"` on decorative emoji.
- Impact 2 · Confidence 5 · Effort 2 · **Priority 5.0**
- Regression risk: low.
- Validation: screen-reader announces selected swatch; emoji not read.

### Q6 — Sage inline-link contrast ~3.8:1 (below AA 4.5:1) + marquee doesn't pause on keyboard focus [CODE/A11Y]
- Supporting: Report 07 (items 12, 6). `assets/dog-nook.css:50–51` link colour `--tdn-sage` on cream ≈3.8:1; `dog-nook-category-bar.liquid` pauses on hover/touch but not `focus`/`blur` (SC 2.2.2 risk).
- Friction: low-vision readers struggle with inline links; keyboard users see focused pill slide away.
- Component/files: `assets/dog-nook.css` (or `dog-nook-cro.css` where other contrast fixes live), `sections/dog-nook-category-bar.liquid`.
- Required: darken inline-link colour to ≥4.5:1 (respect the CSS `:not()` "link trap"); add focus/blur pause to marquee JS.
- Impact 2 · Confidence 4 (contrast calc not re-rendered) · Effort 2 · **Priority 4.0**
- Regression risk: medium on link colour (link-trap exclusion list — any new value must be verified across inline-link surfaces).
- Validation: contrast checker ≥4.5:1; tab onto a pill and confirm it stops.

### Q7 — Cookie banner + email popup: focus/announcement gaps [CODE/A11Y]
- Supporting: Report 07 (items 7, 8). Cookie banner `role="dialog"` but no focus move/announce/`aria-modal`; email popup traps Tab but doesn't `inert`/`aria-hidden` the background.
- Friction: consent banner may go unnoticed by AT (UK consent = compliance exposure); popup escapable by virtual cursor.
- Component/files: `snippets/dog-nook-cookie-banner.liquid`, `snippets/dog-nook-email-popup.liquid`, `assets/dog-nook.js`.
- Required: move focus into banner on show / add `aria-live`; set `inert`/`aria-hidden` on background while popup open.
- Impact 2 · Confidence 4 · Effort 2 · **Priority 4.0**
- Regression risk: low; preserve existing focus-restore logic.
- Validation: screen-reader pass on show/dismiss of both.

---

## 3. Structural improvements (larger, code-confirmed, still relatively contained)

### ST1 — Add structured Materials / Dimensions / Care / Safety + "What's in the box" to standard PDP [CODE + PRODUCT-DATA]
- Supporting: Report 03 (items 3, 6, 9). No `custom.materials`/`dimensions`/`care`/`safety` metafields are read anywhere; "what's in the box" module exists only on the bundle template (`dog-nook-bundle.liquid:27–45`). Answers to "suitable for my dog / what size / how used / what arrives" depend entirely on free-text description.
- Friction: three of the eight PDP purchase questions are structurally unsupported — high purchasing-clarity cost for an uncertain audience.
- Component/files: `sections/dog-nook-product.liquid` (render blocks mirroring existing `custom.delivery_line` pattern), Shopify Admin metafield definitions.
- Required: define + populate metafields per product (product-data/ops), plus render blocks.
- Impact 4 · Confidence 4 · Effort 3 · **Priority 5.3**
- Regression risk: low (additive; graceful when empty). Preserve editable section settings.
- Validation: PDP renders details when populated, hides cleanly when empty.

### ST2 — Confirm Horizon Product JSON-LD still fires under the custom PDP [CODE/SEO]
- Supporting: Report 03 (item 1). Zero `application/ld+json`/`schema.org` in `dog-nook-theme/`; `layout/theme.liquid`/`main-product.liquid` not in repo — cannot confirm Horizon's native structured data survives the custom section.
- Friction: if displaced, loss of price/availability/rating rich-snippet eligibility.
- Component/files: live `layout/theme.liquid` / Horizon `main-product` (not in local repo).
- Required: inspect live theme; if missing, add product JSON-LD.
- Impact 2 · Confidence 3 · Effort 2 · **Priority 3.0**
- Regression risk: low.
- Validation: Google Rich Results Test on a live PDP URL.

### ST3 — Guard latent variant/UX defects before new variant products go live [CODE]
- Supporting: 03 (items 4, 5), 04 (defects 3, 7, 8). Dormant today but real: colour swatches lack visible per-swatch captions + unmapped colour names fall back to grey; multi-option products fall to a bare `<select>` not wired to live price/ATC JS (`initSwatches` binds only `[data-tdn-swatches]`); 6-col PDP thumbnail grid computes ~40px (<44px) at 320–375px; shop client-side sort only reorders the current 48-item page.
- Friction: none now (single-option catalogue, ≤9 products) — becomes a defect when a colour/size×colour product or a >48-item collection ships.
- Component/files: `snippets/dog-nook-pdp-form.liquid`, `assets/dog-nook.js`, `assets/dog-nook-cro.css` (thumb grid), `sections/dog-nook-shop.liquid`.
- Required: add responsive thumb column count; visible swatch captions; wire multi-option select to price JS; make sort pagination-aware — do when catalogue expansion is scheduled.
- Impact 2 · Confidence 5 · Effort 3 · **Priority 3.3**
- Regression risk: low; test the Donut Bed size path still works.
- Validation: add a test colour/2-option product; render at 320px.

### ST4 — Tap-target fixes for catbar pills + pagination [CODE/A11Y]
- Supporting: Report 04 (defects 4, 5). `.tdn-catbar__pill` ≈34px tall; `.tdn-pagination a` `padding:6px 12px` (<44px) — both below the standard the rest of the CSS enforces.
- Friction: mis-taps on mobile, worst on a moving marquee row.
- Component/files: `assets/dog-nook.css` (pills), collection/shop inline pagination CSS.
- Required: raise to ≥44px targets.
- Impact 2 · Confidence 5 · Effort 2 · **Priority 5.0**
- Regression risk: low; check pill row height doesn't break marquee measurement.
- Validation: measure ≥44px at 320px.

---

## 4. Content & merchandising work (copy/data/offer — no redesign)

### C1 — Photography programme: see D2 (pre-launch blocker). [PHOTO]

### C2 — Rewrite PDP "Fast, tracked dispatch" to match disclosed mixed timelines [CONTENT]
- Supporting: Report 05 (items 1, 2, 11). `sections/dog-nook-product.liquid:76–79` shows fixed "🚚 Fast, tracked dispatch" on every product incl. overseas 4–7-day items; `dog-nook-pdp-form.liquid:70–74` shows absolute "In stock — ready to dispatch" purely off `product.available`.
- Friction: PDP-only readers get an inflated expectation vs the honest FAQ; expectation mismatch on a third-party-fulfilment operation.
- Component/files: `sections/dog-nook-product.liquid`, `snippets/dog-nook-pdp-form.liquid`; leverage existing per-product `custom.delivery_line` (already supported at line 75).
- Required: use the honest delivery line as the promise label; soften absolute stock claim; confirm inventory-sync accuracy [OPS].
- Impact 2 · Confidence 4 · Effort 1 · **Priority 8.0**
- Regression risk: low; keep it honest, add no new claims.
- Validation: PDP promise text matches FAQ/delivery metafield per product.

### C3 — Re-sequence FAQ "manufacturing partner overseas" sentence [CONTENT]
- Supporting: Report 01 (F2), 05 (item 1). `templates/page.faq.json` block `f2` leads with overseas-manufacturing language next to the "why not Amazon" consideration.
- Friction: only place copy volunteers a classic dropshipping tell; weakens the curation differentiator. Keep full honesty — reorder, don't remove.
- Component/files: `templates/page.faq.json`.
- Required: lead with curation/QA rationale; fulfilment origin as secondary factual detail. No factual change.
- Impact 2 · Confidence 3 (perception hypothesis) · Effort 1 · **Priority 6.0**
- Regression risk: low; must not delete the disclosure (compliance).
- Validation: FAQ still discloses origin truthfully; owner sign-off on tone.

### C4 — De-duplicate repeated trust claims across hero/trust-strip/why-us [CONTENT]
- Supporting: 01 (F5), 02 (§2A). "Free delivery over £35", "30-day guarantee", "for rescue dogs" repeat across 4 consecutive sections.
- Friction: wasted scroll real estate that could differentiate or guide; dilutes each claim.
- Component/files: `templates/index.json` settings for `sections/dog-nook-trust-strip.liquid` + `dog-nook-why.liquid` (copy-only; keep both components to preserve editable sections).
- Required: re-scope trust-strip cells to *different* facts (materials/UK-based/real specialist) rather than restating the guarantee.
- Impact 2 · Confidence 3 · Effort 2 · **Priority 3.0**
- Regression risk: low (copy/settings only).
- Validation: no claim appears more than twice above the collection grid.

### C5 — Per-image alt text once photography ships + hero alt `<br>` leak [CONTENT + CODE]
- Supporting: Report 07 (items 10, C-section). `dog-nook-hero.liquid:40` `alt: ... default: s.heading | escape` will escape literal `<br>` from the heading default into alt if no per-image alt is set.
- Friction: garbled screen-reader alt; generic title-only alt across the catalogue.
- Component/files: `sections/dog-nook-hero.liquid` (strip tags before escape) + admin alt-text entry per image (content/ops).
- Required: meaningful descriptive alt per photo; small Liquid fix on hero fallback.
- Impact 1 · Confidence 5 · Effort 2 · **Priority 2.5**
- Regression risk: low; dormant until photography ships — sequence alongside D2.
- Validation: alt text reads as clean sentences.

---

## 5. Experiments requiring traffic (do NOT ship as fact — validate before adopting)

These are CRO heuristics, not evidence. Per instruction, treat as hypotheses; run only with sufficient traffic and a real metric. Reject if the store lacks traffic to reach significance.

### S1 — Move "Shop by need" collection grid earlier (ahead of the two bundle pitches)
- Supporting: 01 (F3, F8), 02 (§2I). Grid is 8th of ~10 sections; product-fit discovery is delayed behind two full-width bundle pitches.
- Component/files: `templates/index.json` `order` array. Impact 3 · Confidence 2 · Effort 1 · **Priority 6.0**. Risk: low (reorder only, sections preserved). Validate: A/B on add-to-cart / homepage→PDP rate.

### S2 — Demote hero primary CTA from a specific bundle to persona-neutral discovery
- Supporting: 01 (F6), 02 (§2B). `templates/index.json` hero `button_1_url:/products/the-new-rescue-bundle-1` mismatches anxious-but-not-newly-rescued visitors. Impact 3 · Confidence 2 · Effort 1 · **Priority 6.0**. Risk: low. Validate: A/B primary CTA click-through + downstream conversion.

### S3 — Order bundles entry-before-premium and/or add a side-by-side comparison
- Supporting: 01 (F3), 02 (§2E). Currently `bundle_premium` (£64.99) renders before `bundle_entry` (£34.99), identical component twice. Impact 2 · Confidence 2 · Effort 2 · **Priority 2.0**. Risk: low. Validate: A/B bundle conversion + AOV (note: high-anchor-first is also defensible — do not assume).

### S4 — Relationship between on-page newsletter and 10% popup (avoid double-ask)
- Supporting: 01 (F7), 02 (§2H). Same WELCOME10 offer in both. Impact 1 · Confidence 2 · Effort 2 · **Priority 1.0**. Popup already suppresses after submit; only suppress-after-seen is the delta. Validate: signup rate with/without linkage.

---

## 6. Rejected or deferred

- **Remove/redesign emoji trust icons** (01 F5, 02 §2D, 04): REJECTED as a defect. Reduced-motion and honesty are already handled; "emoji = dropshipping" is an unproven perception claim. Do not trigger a redesign. May be revisited as a low-priority visual-polish content task after photography.
- **Delete trust-strip or why-us / merge sections** (02): DEFERRED. Conflicts with 01 and with "preserve editable Shopify section settings." Address via copy de-dup (C4), not section deletion.
- **Disable the category-bar auto-scroll marquee** (02 §2G): DEFERRED — attention-competition is a render-dependent hypothesis with no measurement. Only the a11y focus-pause (Q6) and tap-target (ST4) parts are actionable now.
- **Concatenate the 4 `dog-nook-*.css` files / self-host fonts** (06 §1): DEFERRED. The split is a deliberate base64-deploy-reliability workaround (HANDOFF); merging risks deploy corruption for an unmeasured, small (~24.5KB) gain. Font *preload* of 1–2 above-the-fold weights is the only low-risk slice worth doing — fold into Q2 if desired.
- **Refactor 3 inline scripts into `window.TDN` / consolidate stars renders / bundle-badge metafield vs Liquid loop** (06 §2, §11, §12): DEFERRED. Maintainability/scaling only; negligible cost at 9 products; medium regression risk on interaction-critical code. Revisit if catalogue grows materially.
- **Add swipe gestures / qty stepper buttons to PDP** (04 §10, §14): DEFERRED — UX-convention preference, no evidence of conversion loss.
- **"Buy it now" custom fetch→/checkout path risk** (04 §16): MONITOR, not fix. Higher-risk than native dynamic checkout but has a `form.submit()` fallback and no observed failure; cannot test live. Add a loading/label state (small a11y win, Report 07 item 11) — fold into Q-series if touching that file.
- **Cookie banner "one-line dispatch generalises over Car Boot Liner exception"** (05 item 11): REJECTED as low/no-action — FAQ caveat exists; optional parenthetical only.

---

## Recommended execution order
1. D1, D4, Q3 (config/verification, minutes each). 2. Q4, Q2, D3 (confirmed code fixes/bug). 3. Q1, Q5, Q6, Q7, ST4 (mobile + a11y batch). 4. C2, C3 (honest copy). 5. **D2 + C1 + C5 photography programme** (the dominant lever — sequence alt-text and hero fix with it). 6. ST1 (structured PDP data). 7. ST2/ST3 as SEO check / pre-expansion guard. 8. S1–S4 experiments only if traffic supports significance.

Run Theme Check after any implementation batch (CLI not installed in this audit environment — install in the dev environment before editing). All work targets the draft theme only; publishing is the owner's action.

## Key files referenced
`/home/user/sc/dog-nook-theme/store-config/footer-group.json` · `templates/index.json` · `templates/page.faq.json` · `sections/dog-nook-product.liquid` · `sections/dog-nook-hero.liquid` · `sections/dog-nook-contact.liquid` · `sections/dog-nook-newsletter.liquid` · `sections/dog-nook-category-bar.liquid` · `sections/dog-nook-trust-strip.liquid` · `sections/dog-nook-why.liquid` · `sections/dog-nook-shop.liquid` · `snippets/dog-nook-pdp-form.liquid` · `snippets/dog-nook-pdp-extra.liquid` · `snippets/dog-nook-product-card.liquid` · `snippets/dog-nook-email-popup.liquid` · `snippets/dog-nook-cookie-banner.liquid` · `snippets/dog-nook-cart-progress.liquid` · `snippets/dog-nook-freeship-bar.liquid` · `snippets/dog-nook-head.liquid` · `assets/dog-nook.css` · `assets/dog-nook-cro.css` · `assets/dog-nook.js`. Not in local repo (need live inspection): `layout/theme.liquid`, Horizon `main-product`/header/footer chrome.