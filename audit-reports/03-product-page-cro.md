# The Dog Nook — Product Page (PDP) Conversion Audit

Scope: `dog-nook-theme/templates/product.json`, `product.bundle.json`, `product.settle-in-bundle.json`, `sections/dog-nook-product.liquid`, `sections/dog-nook-bundle.liquid`, `snippets/dog-nook-pdp-form.liquid`, `dog-nook-pdp-extra.liquid`, `dog-nook-trust-panel.liquid`, `dog-nook-stars.liquid`, `dog-nook-product-card.liquid`, `assets/dog-nook.css` / `dog-nook-cro.css` / `dog-nook-pdp.css`, `snippets/dog-nook-head.liquid`. Read-only static analysis; no rendering, screenshots or Lighthouse were run (storefront firewalled) — anything needing a rendered view is labelled a **hypothesis**.

---

## 1. Can a customer confidently answer the 8 questions?

| Question | Verdict | Evidence |
|---|---|---|
| Is this suitable for my dog? | **Partially.** Positioning/FAQ copy talks about anxious/rescue dogs generally, but there is no structured "suitability" field (breed size, temperament, age) anywhere in the PDP markup — it depends entirely on whatever is in `product.description` (rte) and the per-product `custom.faq` metafield, which this repo cannot see (live product content, not theme code). | `sections/dog-nook-product.liquid:90-95`, `snippets/dog-nook-pdp-extra.liquid:30-51` |
| What size do I need? | **Yes for the Donut Bed** (S/M/L rendered as labelled text pills, not colour swatches — `is_size` branch), **no dedicated sizing-guidance content** (no fit chart / dog-weight-to-size mapping component exists anywhere in the templates). | `snippets/dog-nook-pdp-form.liquid:14-27` |
| How do I use it? | **Only via FAQ/description**, no dedicated "How to use" structured block/section. Whatever usage instructions exist live only in `product.description` or `custom.faq` (live data, unverifiable from repo). | same as above |
| What exactly arrives? | **Weak.** No "what's in the box" / contents list on the standard PDP (`dog-nook-product.liquid`) — that structured list only exists on the **bundle** template (`dog-nook-bundle.liquid:27-45`, "What's inside" panel). Single-product PDPs rely solely on gallery images + description. |
| When will it arrive? | **Yes, clearly.** Per-product delivery line via `product.metafields.custom.delivery_line` with a store-wide fallback (`s.delivery_text`), shown in a dedicated trust-promise row plus repeated in the FAQ block and `dog-nook-trust-panel`. Honest, non-urgent phrasing ("Dispatched in 1–2 days · Delivered in about 4–7 working days"). | `templates/product.json:8`, `sections/dog-nook-product.liquid:75-78` |
| Can I return it? | **Yes.** "30-day money-back guarantee" stated in a promise box and in `dog-nook-trust-panel`. No policy page cross-linked from the PDP itself though (only from footer, per architecture map). | `sections/dog-nook-product.liquid:79` |
| Why is it worth this price? | **Thin.** Sale framing (compare-at, "Save £X") is only shown if `compare_at_price` is set; standard PDP has nothing else building price justification (no material-quality callouts, no "why we charge this" copy block) beyond the generic 4 trust-promise icons repeated on every product regardless of category. |
| Is this business trustworthy? | **Reasonably yes** — real trader identity in footer (per architecture map), honest delivery language, real review aggregate (`dog-nook-stars.liquid` — genuinely gates on `rating_count > 0`, no fabricated stars), payment icons pulled from `shop.enabled_payment_types` (not hardcoded/fake logos), a genuine "Be the first to review" empty state. This is one of the theme's clear strengths. | `snippets/dog-nook-stars.liquid:34-69`, `sections/dog-nook-product.liquid:84-88` |

---

## 2. Direct defects observed in code (not hypotheses)

### Theme-level (component/template logic and CSS)

1. **No JSON-LD / structured product data anywhere in this repo.** Grepped the entire `dog-nook-theme/` tree for `application/ld+json`, `schema.org`, `itemtype` — zero matches. There is also no local `layout/theme.liquid` or `sections/main-product.liquid` in this checkout to inspect, so it's unknown whether Horizon's native structured data still fires underneath the custom `dog-nook-product` section, or whether it was displaced. **This needs verification against the live theme's `layout/theme.liquid`/Horizon base** — flagged as a hypothesis-with-a-confirmed-gap-in-the-local-repo, not a confirmed live defect. If Horizon's markup is gone, Google won't get price/availability/rating rich-snippet eligibility.
   - Confidence: high that the *custom* PDP emits none itself; medium that Horizon's underlying JSON-LD is missing (need to check the live/base theme files not present in this repo).
   - Impact if true: medium (organic rich-snippet CTR), effort: low (Horizon usually ships this natively — just confirm it isn't being overridden).

2. **Fixed mobile sticky Add-to-Cart bar has no body/page bottom-padding compensation.** `.tdn-pdp-sticky` is `position: fixed` and forced `display: flex` under 760px (`assets/dog-nook-cro.css:58-68`), but no rule anywhere in `dog-nook.css`/`dog-nook-cro.css`/`dog-nook-pdp.css` adds bottom padding/margin to the page or the last section to prevent the ~70–80px fixed bar overlapping content underneath it (e.g., the tail of the reviews block, FAQ accordions, or footer). Confirmed by grep — zero `padding-bottom` rules exist in `dog-nook.css`. This is a directly-observed CSS gap; the *visual severity* is a hypothesis pending rendering.
   - Impact: medium (content/footer occlusion on mobile, the majority-traffic device per CLAUDE.md), confidence: high (code fact) / medium (severity), effort: low (one CSS rule).

3. **Standard PDP has no "what's in the box" / contents module.** Only the bundle template (`sections/dog-nook-bundle.liquid:27-45`) has a structured contents panel. Single products (Lick Mat, Snuffle Mat, Donut Bed, Grooming Glove, Nail Grinder, Slow-Feeder Bowl, Car Boot Liner) have no equivalent — "what exactly arrives" depends entirely on gallery + description copy.
   - Impact: medium, confidence: high (code fact), effort: medium (new schema block + section markup).

4. **Colour-swatch variant path has no visible on-page label per option, only a tooltip/aria-label.** In `snippets/dog-nook-pdp-form.liquid:28-56`, when a product has one non-size option, each swatch is a plain coloured `<button>` with only `title=`/`aria-label=` text — no visible caption under each swatch. Only the *currently selected* value is shown via `data-tdn-swatch-label`. If a future product uses this path with option values that aren't literally "Sage/Oat/Clay/Charcoal/Cream" it silently falls back to a generic grey (`#9AA593`) unless a `variant.metafields.custom.swatch_hex` is set — a real bug surface for any future colour-variant product, though **currently dormant**: the only live variant product (Calming Donut Bed, S/M/L) uses the separate `is_size` text-pill branch, not this one.
   - Impact: low today / medium if colour variants are added later, confidence: high (code fact), effort: low.

5. **Two-option products fall back to a bare `<select>` dropdown with no swatches/pills at all** (`snippets/dog-nook-pdp-form.liquid:59-67`, the `single_option == false, multi-option` branch). No current active product has 2+ options, so this is dormant, but it's a materially worse UX than the swatch/pill paths and would reduce variant-selection confidence if a size+colour product is added.
   - Impact: low today, confidence: high, effort: medium (would need real swatch+size combo UI).

### Product-data-level (cannot verify from this repo — content lives in Shopify admin, not git)

6. **No structured Materials / Dimensions / Care / Safety fields exist anywhere in the PDP schema.** The only metafields referenced by the theme are `custom.short_description`, `custom.delivery_line`, `custom.faq`, and (per variant) `custom.swatch_hex`. There is no `custom.materials`, `custom.dimensions`, `custom.care_instructions`, or `custom.safety_info` metafield reference in any template/snippet. Whatever exists on this front today is buried inside the free-text `product.description` RTE and/or the per-product FAQ list — meaning presentation, findability and consistency across products depend entirely on whoever wrote each product's description, with no theme-enforced structure. This is a genuine gap in the *theme's data model*, distinct from whether the actual descriptions are good (that's product-data content, which this repo cannot see).
   - Impact: high (directly blocks "is this suitable for my dog / what size / how do I use it" — three of the eight target questions), confidence: high (code fact: no such fields are read), effort: medium (add metafields + render blocks, mirroring how `delivery_line`/`faq` are already done).

7. **Live product description/FAQ content itself is out of scope of this repo** and was not inspected (it lives in Shopify admin, not in `dog-nook-theme/`). Any content-quality judgment ("is the copy actually reassuring/clear") would be a hypothesis — I have not fabricated a view on it.

### Photography-level

8. **Confirmed no product photography exists**, per `audit-reports/architecture-map.md` (already-documented, live-verified fact, not re-derived here): all `product.featured_media` checks fall through to colour-tile placeholders (`sections/dog-nook-product.liquid:27-34`, `snippets/dog-nook-product-card.liquid:24-30`). This is the single largest lever on "what exactly arrives" and "is this suitable for my dog" — a customer cannot visually confirm size, material or design without a photo. Already flagged store-wide; nothing new to add except that it also silently disables the thumbnail gallery, video-play icon, and zoom-style behaviours (`tdn-pdp__thumbs`, `tdn-pdp__play`) — all dead code paths on every current product.

### Offer-level

9. **Price-justification content is generic, not product-specific.** The four trust-promise boxes (`sections/dog-nook-product.liquid:76-81`) are identical on every PDP (dispatch, free-delivery threshold, guarantee, secure checkout) — none of them speak to *why this specific product* costs what it does (materials, make quality, etc.), because no such field exists (see item 6). Compare-at-price sale badges work correctly when set (`tdn-pdp__saleprice`/`savebadge`, lines 58-64) — no fake-urgency or scarcity language found in the buy-box, consistent with CLAUDE.md's no-fake-urgency rule.

### Policy-level

10. **No inline link from the PDP itself to a full returns/refund policy page** — the guarantee is stated as a one-line promise box only (`sections/dog-nook-product.liquid:79`); a customer wanting the exact mechanics of a return must leave the PDP and find the footer policy link. Minor friction, not a trust violation (the top-line claim itself is honest and unembellished — good).

---

## 3. Things done correctly (worth preserving, do not regress)

- Reviews are rendered honestly: `dog-nook-stars.liquid` shows real stars only when `rating_count > 0`, with a genuine "Be the first to review" empty state otherwise, and never a hardcoded number. `dog-nook-pdp-extra.liquid:80-83` mirrors this.
- Payment icons are pulled live from `shop.enabled_payment_types` (`sections/dog-nook-product.liquid:84-88`, `dog-nook-trust-panel.liquid:11-16`), not a hardcoded logo strip — no risk of advertising unsupported payment methods.
- Delivery copy is specific, non-alarmist and per-product-overridable via metafield with a sane fallback.
- "Buy it now" uses a real `/cart/add.js` + redirect flow with a graceful `form.submit()` fallback on fetch failure (`dog-nook-pdp-form.liquid:103-120`) — no dead button risk.
- Mobile-first CSS: PDP gallery/info correctly stack to one column ≤760px, sticky ATC only appears on mobile, size pills have ≥44px hit target per the a11y block (`dog-nook-cro.css:89`).
- FAQ correctly prefers a real per-product `custom.faq` metafield over generic section blocks (`dog-nook-pdp-extra.liquid:30-51`), and no product data is fabricated to fill it.

---

## 4. Recommendations, ranked (impact / confidence / effort)

1. **Add bottom padding/margin to compensate for the fixed mobile sticky ATC bar.** Impact: medium, Confidence: high (code fact) / medium (visual severity, needs render check), Effort: low. File: `assets/dog-nook-cro.css` (`.tdn-pdp-sticky` block) or `sections/dog-nook-product.liquid` wrapper.
2. **Confirm whether Horizon's native Product JSON-LD still renders under the custom PDP section** (check the live `layout/theme.liquid` / `sections/main-product.liquid`, not present in this local checkout). Impact: medium (SEO rich snippets), Confidence: medium, Effort: low once confirmed.
3. **Add structured Materials / Dimensions / Care / Safety metafields + a rendered "Product details" block**, mirroring the existing `custom.delivery_line` pattern. Impact: high (three of the eight target customer questions depend on this), Confidence: high, Effort: medium.
4. **Add a lightweight "what's in the box" line/module to the standard PDP** (not just the bundle template), even a single metafield-driven sentence would help. Impact: medium, Confidence: high, Effort: low–medium.
5. **Give the colour-swatch variant path a visible text caption per swatch (not just tooltip/aria-label), and document/verify the fallback for unmapped colour names** before any colour-variant product goes live. Impact: low now / medium later, Confidence: high, Effort: low.
6. **Product photography** — already the store's top known gap (per `audit-reports/architecture-map.md`); nothing to add beyond confirming it also disables the thumbnail/video gallery UI on every current product.

No changes were made to any file; this is a read-only audit as instructed.