# Mobile UX Audit — The Dog Nook (Draft Theme)

Read-only, source-code audit of `/home/user/sc/dog-nook-theme/`. No browser rendering was available (live storefront firewalled), so findings are split into **Confirmed (from source)** and **Hypothesis (needs rendered verification)**. Breakpoints referenced throughout: theme uses `max-width: 760px`, `900px`, `680px`, `620px` — there is no explicit 320/375/390/430px breakpoint anywhere in the custom CSS; all four target widths fall inside the single `≤760px` mobile bucket, so anything that looks fine at 430px will render identically (and any cramming will be worst) at 320px.

## 1. Above-the-fold clarity
- **Confirmed:** Load order is catbar → hero → trust-strip (`templates/index.json`). Hero (`sections/dog-nook-hero.liquid`) mobile H1 sizes: split layout 40px, full-bleed 42px (`.tdn-hero__h1`, `.tdn-hero-b .tdn-hero__h1`, `@media max-width:760px`). Positioning line "Helping anxious dogs feel safe at home" should appear via the eyebrow/heading text (content-editable, not verifiable from code alone).
- **Confirmed defect (no imagery):** Full-bleed hero (`.tdn-hero-b`) and split hero (`.tdn-hero-a__media`) both render CSS-gradient placeholders with an uppercase label span when no `image`/`s.image` is set (`dog-nook-hero.liquid` lines 38-43, 61-64). Per the architecture map, **no product/lifestyle photography exists yet**, so the hero — the single most important above-the-fold element — is very likely a flat gradient block with placeholder text on all four widths. This directly undercuts "explain the store's purpose in 5 seconds" (CLAUDE.md conversion priority 1) since a calm/trustworthy specialist brand needs a real photo, not a gradient tile.
- **Hypothesis:** At 320-375px the full-bleed hero's `min-height: 440px` (mobile override) plus catbar (~14px padding + pill row) plus header (Horizon, height unknown) could push meaningful content (H1, CTA) below one viewport height on short devices — needs rendered check.

## 2. Header height
- **Confirmed:** Header markup/CSS is Horizon's, not in this theme's custom files (architecture-map.md, "Header, footer and cart drawer are Horizon's"). No custom overrides to header height were found in `dog-nook.css`/`dog-nook-cro.css`. **Cannot audit header height from this codebase** — it is upstream Horizon markup not present in `dog-nook-theme/`. Flag as out-of-scope/needs live inspection.

## 3. Menu usability
- Same limitation: main nav (`main-menu`) is Horizon's. Not present in custom source. No confirmed defects; not auditable here.
- **Category bar** (`sections/dog-nook-category-bar.liquid`) is custom and sits right under the header: a JS-driven auto-scrolling marquee (`requestAnimationFrame`, `speed: 0.035px/ms`) of pills. Pauses on `touchstart`/hover. This is a genuine risk area:
  - **Confirmed:** Pills are `<a>` tags with `padding: 9px 18px` (`.tdn-catbar__pill`, dog-nook.css line 177) → tap target height ≈ 9+9+~16(line-height)=~34px, **below the 44px WCAG 2.5.5 / 48px Material guideline**. This is the one interactive control in the file explicitly *not* covered by the `dog-nook-cro.css` "target size" fixes (which only patch `.tdn-swatch`).
  - **Confirmed:** Continuous auto-scroll while the user's thumb is near the top of the screen (right under the header, prime scroll-start real estate) risks accidental taps on a moving target on touch devices, and the animation runs indefinitely with no `prefers-reduced-motion` respect for the *scrolling itself* (only `-webkit-mask`/scrollbar hiding is conditioned on reduced-motion in the JS `REDUCE` check, which does correctly disable the animation loop and switch to `overflow-x:auto` — so this part is actually handled correctly, on review).

## 4. Tap target sizes
- **Confirmed fixes present:** `dog-nook-cro.css` explicitly bumps `.tdn-swatch` to 44×44px (comment cites WCAG 2.5.5) and adds `:focus-visible` outlines to swatches/thumbs/accordions.
- **Confirmed defects:**
  - `.tdn-catbar__pill` ≈34px tall (see above) — not covered by the AA pass.
  - `.tdn-pdp__thumb` gallery thumbnails: 6-column grid (`grid-template-columns: repeat(6, 1fr)`), `aspect-ratio: 1`, inside a `tdn-wrap` that on mobile has `--tdn-side-pad: 20px`. On a 320px viewport, available width ≈320-40=280px, minus 5×8px gaps=40px → 240px/6 ≈ 40px per thumb — under 44px, and shrinks further toward 320px. This is a **confirmed geometric defect**, not a hypothesis (fixed grid column count regardless of viewport, no mobile override in `dog-nook-cro.css`/`dog-nook-pdp.css`).
  - `.tdn-sizebtn` (PDP size pills): `min-width:46px; padding:10px 16px` → acceptable height ≈44px, fine.
  - `.tdn-pagination a`/`.page.current`: `padding: 6px 12px` (dog-nook-collection.liquid / dog-nook-shop.liquid stylesheets) → ~12-16px tall text link, **well under 44px** minimum tap target on collection/shop pagination.
  - Cookie banner and email-popup buttons use `.tdn-btn` (13px padding) or explicit 48px heights (`.tdn-emailpop__input`, `.tdn-emailpop__submit` = 48px) — these are fine.

## 5. Text readability
- **Confirmed:** Body font 15px (`.tdn-muted`), fields 15px, buttons 14.5px — all above the commonly-cited 12-13px minimum, fine.
- **Confirmed (AA fix already applied):** `dog-nook-cro.css` documents contrast fixes: `--tdn-faint` from ~3.0:1 to ~4.6:1, terracotta small text from ~3.0:1 to ~4.9:1. This is good, verifiable evidence of an accessibility pass in the CSS comments (not independently re-measured by me — trusting the documented calc, but I did not re-render to confirm rasterized contrast).
- **Hypothesis:** `.tdn-pdp__regular` uses `-webkit-text-fill-color: currentColor` combined with `color: var(--tdn-faint-2)` and `text-decoration: line-through` — layering strikethrough + light color could reduce legibility of the compare-at price on small screens; needs visual check.

## 6. Image cropping
- **Confirmed:** All key image spots use `object-fit: cover` (`.tdn-product-card__media img`, `.tdn-pdp__mainimg`, `.tdn-hero-a__img`, `.tdn-bundlep__bg`), which is standard and generally safe, but `cover` crops aggressively on square vs landscape source mismatches. With `.tdn-product-card__media { aspect-ratio: 4/3 }` fixed regardless of viewport, any portrait-oriented product photo (once real photography is added) will be cropped on the sides — a **future risk**, not a current defect since there are no real images yet.
- **Confirmed:** `dog-nook-product-card.liquid` falls back to a plain text placeholder (`.tdn-product-card__ph`, wordmark) when `p.featured_media` is blank — per the architecture map this is true for essentially the whole catalogue right now. This is the single biggest known gap (documented in HANDOFF/architecture map), directly affecting every grid at every breakpoint (homepage, shop, collection, cross-sell).

## 7. Horizontal overflow
- **Confirmed risk, not yet a proven bug:** `.tdn-catbar__track { width: max-content }` with pills `flex: 0 0 auto` inside `.tdn-catbar { overflow: hidden }` — overflow is contained by the wrapping element, so this should not cause page-level horizontal scroll. Mask-image gradient (`-webkit-mask-image`) at `36px` from each edge is fixed regardless of viewport; at 320px this eats a proportionally larger chunk of visible pill row — cosmetic only.
- **Confirmed safe pattern:** `.tdn-wrap { max-width; padding: 0 var(--tdn-side-pad) }` with `--tdn-side-pad: 20px` on mobile is a normal contained-width wrapper; no evidence of elements escaping it (no fixed pixel widths found in the audited files that exceed 320px minus padding), **except** the PDP thumbnail grid math above, which is a layout-density issue, not literal overflow (CSS grid `1fr` columns will not overflow, they'll just shrink).
- **Hypothesis:** `.tdn-pdp__price` uses `display:flex; flex-wrap: wrap` — should reflow safely, but the badge (`.tdn-badge`) + regular price + sale price together could wrap awkwardly on 320px; needs visual check.
- No `white-space: nowrap` found on price/heading elements that would force overflow.

## 8. Pop-up obstruction
- **Confirmed:** Email popup (`snippets/dog-nook-email-popup.liquid`) is a fixed, full-viewport modal (`.tdn-emailpop { position: fixed; inset: 0 }`) with `max-width: 420px` card and `padding: 20px` — on 320px width the card is effectively edge-to-edge (320-40=280px usable), which is acceptable, not obstructive by design (it's a real modal, not an unclosable banner).
- **Confirmed correct behavior:** Popup explicitly excludes `/cart` and `/checkout` (`if (/\/(cart|checkout)(\/|$|\?)/.test(location.pathname)) return;`), is focus-trapped, closes on Escape/backdrop/X, and restores focus on close — this is a well-built pattern, no obstruction defect found.
- **Confirmed:** Triggers at 12s dwell OR 45% scroll — reasonable engagement gating, not immediate/aggressive.
- **Confirmed:** Cookie banner (`.tdn-cookie`) is `position: fixed; bottom:16px; left/right:16px` and does NOT reserve space (no `body` padding-bottom compensation) — **could visually stack with or sit very close to the PDP's sticky Add-to-Cart bar** (`.tdn-pdp-sticky`, also `position:fixed; bottom:0`) on the same viewport for a first-time visitor landing directly on a PDP. This is a **confirmed structural overlap risk**: both `.tdn-cookie` and `.tdn-pdp-sticky` are independently `position: fixed` near the bottom of the screen with no z-index coordination logic or mutual-exclusion in the JS — `.tdn-pdp-sticky` has `z-index:50`, `.tdn-cookie` has `z-index:90`, so the cookie banner would sit on top of / obscure the sticky Add-to-Cart bar until dismissed. This is a genuine mobile conversion-priority-6 conflict ("make mobile purchasing simple") worth flagging as a confirmed layering conflict, though exact visual severity (how much of the ATC bar is covered) needs rendered confirmation.

## 9. Sticky elements
- **Confirmed:** `.tdn-pdp-sticky` (mobile-only ATC bar, `display:none` → `flex` at `≤760px`) is `position:fixed; bottom:0` with `backdrop-filter: blur(8px)`, `padding: 12px 18px`, and a `.tdn-pdp-sticky__btn { width:100%; padding:14px }`. This is a solid, expected pattern — good for "Add-to-cart visibility."
- **Confirmed defect (see #8):** No coordination with the cookie banner or (potentially) Shopify's own cart-drawer trigger/announcement bar for stacking/z-index priority beyond the two z-index values noted.
- **Hypothesis:** No `padding-bottom` is added to the PDP's scrollable content to prevent the sticky bar's ~70-80px height from covering the last part of page content (e.g., final FAQ accordion, footer) — common "sticky bar covers footer/last CTA" issue; needs rendered check since Horizon's own footer/global CSS may already handle safe-area insets.
- **Confirmed:** No `env(safe-area-inset-bottom)` handling found in `.tdn-pdp-sticky` or `.tdn-cookie` for iPhone notch/home-indicator devices (390/430px iPhone class) — a common real defect where fixed bottom bars sit under the home-indicator gesture area. This is a **confirmed omission** (no safe-area CSS anywhere in the four custom stylesheets), affecting iPhone X+ (375/390/430) most.

## 10. Product gallery
- **Confirmed:** `.tdn-pdp__main` fixed height `460px` desktop → `300px` at `≤760px` (`dog-nook-cro.css`). Thumbnail click swaps `#tdn-pdp-main`'s `src` via inline `onclick` (inline JS in the Liquid loop, `sections/dog-nook-product.liquid` line 40) — functional but not using `srcset`/responsive images on swap (only `image_url: width:1000`), so swapped images may be heavier than necessary on mobile connections; also no lazy-load coordination for swap target.
- **Confirmed defect (tap target):** 6-column thumbnail grid becomes sub-44px on 320-375px widths (see #4). This is the most concrete, code-verifiable gallery defect.
- **Confirmed:** No swipe/touch gesture support for the main image — only tap on thumbnails. On a touch device, users often expect horizontal swipe on the main image; absence isn't a "bug" but is a usability gap relative to typical mobile PDP conventions (this is a UX-convention observation, not a proven conversion issue).

## 11. Variant controls
- **Confirmed:** Color swatches 44×44px (AA-fixed), size pills `min-width:46px` — both meet target-size guidance.
- **Confirmed:** Swatch/size selection JS (`dog-nook.js` `initSwatches`) correctly updates hidden `id` input, price display, and ATC button state/label on selection — functionally sound, progressive enhancement (form still works via native `select` fallback for multi-option products).
- **Confirmed gap:** For products with `product.options.size > 1` (not single-option), the fallback is a plain `<select>` styled with `.tdn-field` — no visual swatch/pill styling, and this `<select>` does **not** wire into the same JS price-update logic (`initSwatches` only targets `[data-tdn-swatches]` groups) — so multi-option products rely entirely on native browser `<select>` behavior and a full page reload/native form submit for variant price changes to reflect (the JS never touches `[name="id"]` selects). This is a **confirmed functional gap** for any product with 2+ real option dimensions (e.g., if a future product has Size × Color) — price/availability won't live-update until submit. Currently the catalogue's multi-variant product (Calming Donut Bed, S/M/L) is single-option (size), so it hits the size-pill path and should work; this gap would only bite future multi-option products.

## 12. Add-to-cart visibility
- **Confirmed:** Two CTAs stacked in the main buy-box (`tdn-pdp__cta`): primary "Buy it now — Secure checkout" (custom JS, `/cart/add.js` → `/checkout` redirect) and secondary outline "Add to Cart" (native form submit). Both `width:100%` (`tdn-btn--block`), 15px padding — good visibility, clear hierarchy.
- **Confirmed:** Mobile sticky bar duplicates ATC at the bottom — good redundancy for long PDP pages.
- **Confirmed risk:** The custom "Buy it now" JS button (`data-tdn-buynow`) does `fetch('/cart/add.js', ...)` then hard-navigates to `/checkout`, bypassing Shopify's normal cart-drawer UX and any dynamic-checkout button; on failure it falls back to `form.submit()`. No visible loading state (spinner/label change) is applied beyond `btn.disabled = true` — the button text doesn't change to "Adding…", so a slow network could look unresponsive between tap and navigation (see #17 Loading states).

## 13. Accordion usability
- **Confirmed:** Shared `.tdn-accordion` component (dog-nook.css) used consistently across PDP FAQ (`dog-nook-pdp-extra.liquid`), collection "Good to know" (`dog-nook-collection.liquid`), and presumably the FAQ page. JS (`dog-nook.js: initAccordions`) toggles `.is-open`, sets `aria-expanded`, and swaps the +/− sign — solid, accessible pattern with `:focus-visible` outline in the AA CSS pass.
- **Confirmed:** Question button `padding: 18px 0` gives a comfortably tall (~50px+) tap target — good.
- No defects found in accordion mechanics.

## 14. Form usability
- **Confirmed:** PDP quantity input: `type="number"`, `inputmode="numeric"`, width `82px` — reasonable, though native number spinners on mobile Safari/Chrome can be small/fiddly; no custom +/- stepper buttons provided (a common mobile-friendliness convention, absence is a UX-convention gap not a bug).
- **Confirmed:** Contact form / email popup form fields are 48px tall inputs — good target size.
- **Confirmed:** Shop page's sort `<select>` is a custom-styled native select with a background-image caret; at `≤620px` it goes `width:100%` and drops the `margin-left:auto` — reasonable mobile adaptation. Sort re-orders DOM client-side only (no pagination-aware re-sort — note `paginate ... by 48`; sorting only reorders the current page's 48 items, so on collections with >48 products, sort will be incomplete/incorrect — **confirmed logical limitation**, not currently triggered by the 9-product catalogue but a latent defect if catalogue grows).

## 15. Cart drawer
- **Confirmed:** Cart drawer itself (`store-config/cart-drawer.liquid`) is stock Horizon markup/CSS with `dog-nook-cart-progress` spliced in via `{% render 'dog-nook-cart-progress' %}` inside `scroll-hint` content, before `cart-drawer__items`.
- **Confirmed:** `dog-nook-cart-progress.liquid` computes free-shipping progress purely in Liquid (re-renders correctly on drawer refresh via Shopify's Section Rendering API, since it's part of the section-rendered content) — good, avoids the JS/Liquid double-render mismatch that the now-"currently unused" `dog-nook-freeship-bar.liquid` JS variant apparently had.
- **Confirmed:** `.tdn-cartbar` uses `var(--cart-drawer-padding, 20px)` for horizontal padding — inherits Horizon's spacing token, consistent with native drawer content.
- No confirmed layout defects in the drawer; it rides on Horizon's own responsive drawer chrome (`theme-drawer__dialog`), which is out of this theme's custom-file scope and not independently re-auditable here beyond the spliced-in free-ship bar.

## 16. Checkout handoff
- **Confirmed:** "Buy it now" custom button intercepts and does `fetch('/cart/add.js')` → `window.location.href = '/checkout'`. This bypasses Shopify's native Buy Button / dynamic checkout components (the PDP file's own comment says the native `payment_button` was deliberately removed to avoid a duplicate). Risk: a custom fetch-based add-to-cart + hard redirect is a **higher-risk custom code path** than Shopify's native dynamic checkout button for edge cases (draft-order gating, third-party payment integrations, localized/markets checkout URLs, cart validation errors like sold-out-between-render) — errors only fall back to `form.submit()` (which itself may 422 silently if `/cart/add.js` failed for a real reason like stock). This is a **confirmed code-path risk**, not a confirmed bug (no way to trigger/observe an actual failure without live testing).
- **Confirmed:** `{{ form | payment_terms }}` (Shop Pay installments messaging) still renders — fine, standard.

## 17. Loading states
- **Confirmed gaps:**
  - "Buy it now" button: only `btn.disabled = true`, no text/spinner change during the `fetch` round-trip — perceived unresponsiveness risk on slow mobile networks.
  - Shop sort: reordering is synchronous/instant (no network), no loading state needed — fine.
  - No skeleton/placeholder states found for the product-card image slot beyond the static gradient background (which effectively acts as a permanent "loading" tone since there are no real images) — for real photography once added, images use `loading: 'lazy'` and multiple `widths` (good practice) but no explicit low-quality placeholder/blur-up, so late-loading images could cause a visible pop-in, especially on 3/4G mobile.
- **Hypothesis:** Google Fonts loaded via `<link ... display=swap>` in `dog-nook-head.liquid` — `display=swap` is correct practice to avoid invisible text, but two font families (Playfair Display + Inter, multiple weights/italics) block-render until the CSS request resolves; on slow mobile networks this is a common FOUT/CLS contributor. Needs Lighthouge/rendered measurement to quantify — cannot fabricate a score.

## 18. Layout shifts (CLS risk)
- **Confirmed risk factors (source-verified, impact not measured):**
  - Product-card/PDP images lack explicit `width`/`height` attributes in the `image_tag` calls reviewed (`dog-nook-product-card.liquid`, `dog-nook-product.liquid`) — relying on `aspect-ratio` CSS on the *container* (`.tdn-product-card__media { aspect-ratio: 4/3 }`, PDP `.tdn-pdp__main { height:460px/300px }` fixed height) does reserve space correctly for those two spots, so CLS should be **mitigated** there, not defect.
  - Scroll-reveal (`dog-nook.js: initReveal`) explicitly designs against pre-load flash by only hiding elements below `vh * 0.92` at bind time and adding `.tdn-reveal` class only then — a genuinely good CLS-avoidance pattern, confirmed by code reading, not just claimed.
  - **Confirmed gap:** Cookie banner and email popup both self-inject via JS after `DOMContentLoaded`/timers — since they're `position: fixed`, they do not push content and should not cause CLS; correct.
  - Category-bar marquee: JS clones pill sets and measures `stride()`/`scrollWidth` after DOM insertion, then starts `requestAnimationFrame` — this happens after initial paint, so first paint could show a static (non-cloned) row before JS mutates it; unlikely to shift layout height (fixed `padding: 14px`) but could show a visible "pop" of duplicate pills appearing, a minor polish issue rather than CLS.
  - Web fonts: `Playfair Display`/`Inter` swap-in after initial paint is a classic CLS contributor (font metric mismatch) — no explicit `font-display` fallback sizing/`size-adjust` was found to counter this. Flag as a **hypothesis** requiring Lighthouse/CLS field data to size the actual impact.

---

## Summary of confirmed defects (source-verified, ranked by likely impact)
1. **No product photography** — hero, product cards, PDP, bundle images all fall back to gradient/placeholder text across every template. Single biggest gap (already flagged in architecture-map.md), affects every one of the 18 categories above indirectly.
2. **Cookie banner (`.tdn-cookie`, z-index 90) can overlay the mobile sticky Add-to-Cart bar (`.tdn-pdp-sticky`, z-index 50)** on first-time PDP visits — `assets/dog-nook.css` line 152-159 vs `assets/dog-nook-cro.css` line 58.
3. **PDP gallery thumbnails (`.tdn-pdp__thumb`, `assets/dog-nook-cro.css` line 27) are a fixed 6-column grid** that computes to ~40px squares at 320-375px — below the 44px target-size standard the rest of the CSS otherwise enforces.
4. **Category-bar pills (`.tdn-catbar__pill`, `assets/dog-nook.css` line 177)** are ~34px tall tap targets on a continuously auto-scrolling row directly under the header — both a target-size and moving-target usability issue.
5. **Pagination links (`.tdn-pagination a`, in `dog-nook-collection.liquid`/`dog-nook-shop.liquid` inline stylesheets)** have `padding: 6px 12px` — under 44px tap height.
6. **No `env(safe-area-inset-bottom)` handling** on either fixed-bottom element (`.tdn-pdp-sticky`, `.tdn-cookie`) — a common iPhone home-indicator overlap issue on 375/390/430 device classes.
7. **Multi-option product variant `<select>` fallback isn't wired into the live price/ATC-state JS** (`dog-nook.js: initSwatches` only binds `[data-tdn-swatches]`) — latent gap for any future 2+-option product.
8. **Shop-page client-side sort only reorders the current paginated batch (48 items)** — silently incorrect if the catalogue ever exceeds 48 products in one view.
9. **"Buy it now" custom button has no loading/label-change state** during its `fetch('/cart/add.js')` call — perceived unresponsiveness risk.

## Items needing rendered/live verification (explicitly not confirmed, cannot fabricate)
- Actual header height and mobile nav/menu usability (Horizon-owned markup, not present in this repo's custom files).
- Real visual severity of the cookie-banner/sticky-ATC overlap (exact pixel coverage).
- Actual CLS/LCP/font-swap impact — no Lighthouse or rendered measurement was possible (firewalled storefront); any specific score would be fabricated and is deliberately omitted.
- Visual wrapping behavior of the PDP price/badge row and hero text at exactly 320/375/390/430px.
- Whether the sticky ATC bar visually covers the final on-page content (footer, last FAQ accordion) due to missing bottom padding compensation.

## Key files referenced
- `/home/user/sc/dog-nook-theme/assets/dog-nook.css`
- `/home/user/sc/dog-nook-theme/assets/dog-nook-cro.css`
- `/home/user/sc/dog-nook-theme/assets/dog-nook-pdp.css`
- `/home/user/sc/dog-nook-theme/assets/dog-nook-anim.css`
- `/home/user/sc/dog-nook-theme/assets/dog-nook.js`
- `/home/user/sc/dog-nook-theme/sections/dog-nook-hero.liquid`
- `/home/user/sc/dog-nook-theme/sections/dog-nook-category-bar.liquid`
- `/home/user/sc/dog-nook-theme/sections/dog-nook-trust-strip.liquid`
- `/home/user/sc/dog-nook-theme/sections/dog-nook-product.liquid`
- `/home/user/sc/dog-nook-theme/sections/dog-nook-bundle.liquid`
- `/home/user/sc/dog-nook-theme/sections/dog-nook-collection.liquid`
- `/home/user/sc/dog-nook-theme/sections/dog-nook-shop.liquid`
- `/home/user/sc/dog-nook-theme/snippets/dog-nook-pdp-form.liquid`
- `/home/user/sc/dog-nook-theme/snippets/dog-nook-pdp-extra.liquid`
- `/home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid`
- `/home/user/sc/dog-nook-theme/snippets/dog-nook-email-popup.liquid`
- `/home/user/sc/dog-nook-theme/snippets/dog-nook-cart-progress.liquid`
- `/home/user/sc/dog-nook-theme/snippets/dog-nook-head.liquid`
- `/home/user/sc/dog-nook-theme/store-config/cart-drawer.liquid`
- `/home/user/sc/audit-reports/architecture-map.md`