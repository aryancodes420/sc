Confirmed: no `loading`/`fetchpriority` attributes anywhere in `dog-nook-hero.liquid`'s image tag, and no deprecated `img_url`/`{% include %}` usage anywhere in the theme. I now have everything needed for the final report.

# The Dog Nook — Performance Audit (dog-nook-theme, static analysis)

## 0. Tooling note
`shopify theme check` is **not installed** in this environment (`which shopify` → not found; `shopify theme check` → `command not found`). No Theme Check output exists to cite. Everything below is static source analysis of `/home/user/sc/dog-nook-theme/`. Nothing here should be read as a Theme Check violation list — it is a manual review against the same categories. All render-dependent claims (actual LCP element, actual CLS, actual script execution cost) are marked as **hypotheses**; the live storefront is firewalled so nothing was measured.

Also note: `layout/theme.liquid` and Horizon's core assets are **not present in this repo** (`dog-nook-theme/` has no `layout/` directory) — the architecture doc confirms the head/body includes are hand-edited directly on the theme, outside git. This audit could not inspect that file, so **any third-party scripts Horizon or the merchant may have added directly in `theme.liquid` are outside this audit's visibility** — flagged as a gap, not a clean bill of health.

---

## 1. Render-blocking assets
**File:** `snippets/dog-nook-head.liquid:8-15`
Four separate first-party stylesheets (`dog-nook.css`, `dog-nook-cro.css`, `dog-nook-anim.css`, `dog-nook-pdp.css`) plus one Google Fonts stylesheet are all requested as blocking `<link rel="stylesheet">` in `<head>`, in addition to whatever Horizon's own `theme.liquid` already loads.
- **Impact:** Each is small individually (3–11.5KB), but 5 separate render-blocking requests (4 same-origin + 1 cross-origin to `fonts.googleapis.com`) means extra round trips before first paint, worse than one concatenated file. The cross-origin Google Fonts request is the costlier one (DNS + TLS + fetch to a third domain before CSSOM can complete).
- **Fix:** Concatenate the 4 `dog-nook-*.css` files into one asset (they're already split for "deploy reliability" per the file headers, which is a *deploy-workflow* convenience, not a performance requirement) once deploys stabilize; consider self-hosting or preloading the font files.
- **Regression risk:** Low for concatenation (pure asset merge); the split-for-reliable-deploys pattern is documented in the code comments (`assets/dog-nook-anim.css:1-9`, `assets/dog-nook-cro.css:1-2`) as an intentional workaround for base64 deploy corruption — reversing it needs care with the deploy recipe in `HANDOFF.md`.
- **Effort:** Low (CSS merge) to Medium (if deploy tooling needs to change too).

**File:** `snippets/dog-nook-head.liquid:10`
Google Fonts loads 5 font weights/styles (`Playfair Display: 500,600,700,italic 500`; `Inter: 400,500,600,700`) via a single blocking stylesheet, no `rel="preload"` on the actual font files, only `preconnect`.
- **Impact (hypothesis):** `display=swap` avoids invisible text, but the initial CSSOM-blocking round trip to fetch the Google CSS, then a second round trip to fetch each `.woff2`, delays first contentful paint of styled text and risks a FOUT-driven reflow (see CLS section below).
- **Fix:** Preload the 1–2 above-the-fold font files (e.g., Playfair Display 600 for `h1`, Inter 400 for body) with `<link rel="preload" as="font" type="font/woff2" crossorigin>`, and consider trimming to only the weights actually used (audit shows `h1/h2/h3` use 600, italic 500 appears unused in the reviewed sections — verify against theme editor content before removing).
- **Regression risk:** Low-medium — removing a weight that a merchant later uses in custom copy (e.g. bold) would silently fall back to synthetic bold.
- **Effort:** Low.

---

## 2. Duplicate scripts / inconsistent JS architecture
Three separate inline `<script>` blocks exist outside the shared `assets/dog-nook.js` bundle, each re-implementing its own `DOMContentLoaded` + `shopify:section:load` boot pattern rather than hooking into the existing `window.TDN` namespace (`assets/dog-nook.js:159-175`):
- `sections/dog-nook-category-bar.liquid:29-89`
- `sections/dog-nook-shop.liquid:53-81`
- `snippets/dog-nook-pdp-form.liquid:103-120`

**Technical explanation:** Each is guarded against double-binding (`dataset.tdnBound`, `window.__tdnBuyNowBound`), so there is no functional duplication bug, but this is architecturally inconsistent — three different event-wiring conventions coexist: (a) direct per-element listeners in `dog-nook.js`, (b) a root-scoped `initX(root)` pattern re-run on `shopify:section:load` in category-bar/shop, and (c) a single global delegated `document.addEventListener('click', ...)` in the PDP buy-now snippet.
**Customer impact:** None directly observable; this is a maintainability/perf-pattern risk — every future section is likely to copy-paste another inline `<script>` instead of extending the shared bundle, growing inline-script count and per-page parse cost over time.
**Recommended fix:** Consolidate these three behaviours into `assets/dog-nook.js` behind the existing `initAll(root)` dispatcher, keeping one convention.
**Risk of regression:** Medium — the category-bar marquee and PDP buy-now logic are both interaction-critical; moving them needs careful re-testing in the theme editor (section re-render).
**Effort:** Medium.

---

## 3. Global scripts that should be conditional
**File:** `assets/dog-nook.js:121-130` (`initFreeShip`) and `snippets/dog-nook-freeship-bar.liquid` (whole file)
`initFreeShip()` runs unconditionally on every page (`document.addEventListener('DOMContentLoaded', ...)` at line 168), querying `[data-tdn-freeship]`.
**Directly observed:** `dog-nook-freeship-bar.liquid` is **never rendered anywhere in the theme** — I grepped the whole repo and the only matches for `dog-nook-freeship-bar` are the snippet's own self-referential comment and `README.md`. The actual cart-drawer free-ship bar is a *different*, Liquid-computed implementation (`snippets/dog-nook-cart-progress.liquid`, spliced into `store-config/cart-drawer.liquid:114`) that needs no JS/fetch at all.
**Impact:** Because no `[data-tdn-freeship]` element ever exists, `bars.length` is always 0 and the function returns immediately — so there's no runtime cost beyond the dead code shipping in the bundle. It's not "conditional-that-should-be-global," it's genuinely **unused code shipped to every visitor**.
**Recommended fix:** Delete `snippets/dog-nook-freeship-bar.liquid` and the `initFreeShip`/`renderFreeShip` functions in `assets/dog-nook.js:101-130`, since `dog-nook-cart-progress.liquid` already does this job with no JS. Document the removal per CLAUDE.md's "record all material changes" / "don't remove functionality without documenting" rule (this specific functionality is provably dead, not live).
**Risk of regression:** Low, provided nothing in the un-auditable `layout/theme.liquid` calls this snippet directly (can't verify — flagged as gap in section 0).
**Effort:** Low.

---

## 4. Excessive JavaScript
Overall JS footprint is modest and not a genuine bloat problem: `assets/dog-nook.js` is 175 lines (~7.8KB unminified), plus the three inline scripts above. No large frameworks, no jQuery, no bundler cruft. This category is **not a defect** on the current evidence — flagging only the dead-code removal above and the fragmentation in section 2.

---

## 5. Third-party scripts
**None found** in the audited add-on layer. Grepped for common analytics/CDN/library signatures (`gtag`, `googletagmanager`, `klaviyo`, `fbevents`, `facebook.net`, `jsdelivr`, `unpkg`, jQuery) across `dog-nook-theme/` — zero matches. The cookie-consent plumbing (`assets/dog-nook.js:56-98`, wired to `Shopify.customerPrivacy`) exists specifically to gate such scripts, but none are currently wired into the audited files, which is consistent with the "no installed apps" constraint in CLAUDE.md.
**Gap:** Because `layout/theme.liquid` is not present in this repo (see section 0), I cannot confirm whether any third-party script exists in the head/body outside this add-on. Treat "no third-party scripts" as scoped to the audited add-on files only.

---

## 6. Large CSS files
Not a real problem at current sizes: `dog-nook.css` 11.6KB / 189 lines, `dog-nook-cro.css` 7.7KB, `dog-nook-pdp.css` 3.1KB, `dog-nook-anim.css` 3.0KB — combined ~24.5KB uncompressed, small by modern standards. The "large, avoid redeploying" language in the architecture doc refers to *deploy-tooling risk* (base64 corruption on large hand-emitted payloads), not to page-weight — don't conflate the two. See section 1 for the real issue (request count, not byte count).

---

## 7. Unused CSS or JavaScript
- **`snippets/dog-nook-freeship-bar.liquid`** — entire file unused (see section 3).
- **`assets/dog-nook.js:101-130`** (`renderFreeShip`, `initFreeShip`) — dead code, ships to every page (see section 3).
- I did not find unused CSS selectors beyond what's tied to the above dead snippet (`.tdn-freeship__msg` etc. are shared with the live `dog-nook-cart-progress.liquid`, so the classes themselves are still used — only the JS-driven variant is dead).

---

## 8. Image sizing / Responsive images
Mostly well-implemented: product cards (`snippets/dog-nook-product-card.liquid:27`), hero (`sections/dog-nook-hero.liquid:40`), rich-text (`sections/dog-nook-rich-text.liquid:13`), collection cards, and PDP gallery all use `image_url` + `image_tag` with explicit `widths` for `srcset`. Card media containers use fixed `aspect-ratio: 4/3` (`assets/dog-nook.css:109`) and fixed-height media boxes elsewhere — this correctly prevents shift once an image loads into a placeholder slot (a positive finding, not a defect).

**Gap — PDP main image priority.** `sections/dog-nook-product.liquid:29`:
```
{{ product.featured_media | image_url: width: 1000 | image_tag: id: 'tdn-pdp-main', class: 'tdn-pdp__mainimg', widths: '500, 750, 1000', alt: ... }}
```
No `loading` or `fetchpriority` attribute at all (confirmed via grep — zero matches for `loading:`/`fetchpriority` in this file except the lazy-loaded thumbnails at line 44). This image is very likely the LCP element on every PDP.
**Customer impact (hypothesis, unverified — no rendering available):** without `fetchpriority="high"` (or at minimum explicit `loading="eager"`), the browser may not prioritize this fetch as aggressively as it should for an above-the-fold hero image, especially if any current or future browser default treats unattributed images conservatively.
**Fix:** Add `loading: 'eager', fetchpriority: 'high'` to the `image_tag` filter call (Shopify's `image_tag` supports arbitrary HTML attributes as filter params).
**Risk:** Very low — purely additive attribute.
**Effort:** Low.

**Same gap on the hero image**, `sections/dog-nook-hero.liquid:40` — no `loading`/`fetchpriority` attribute on the split-layout hero image, which is a homepage LCP candidate when a merchant uploads a real photo (currently unused since no product photography exists per the architecture doc, but the code path is live and will matter as soon as images are added).
**Fix:** Same as above.
**Effort:** Low.

---

## 9. Lazy loading
Generally correct: collection cards (`sections/dog-nook-collection-list.liquid:29`), collections-index (`sections/dog-nook-collections-index.liquid:33`), product cards, and PDP gallery thumbnails (`sections/dog-nook-product.liquid:44`) all use `loading: 'lazy'` appropriately for below-the-fold or secondary imagery. The only correction needed is the *opposite* direction — the two above-the-fold images (PDP main, hero) should be explicitly eager/high-priority, not lazy (see section 8). No instances of `loading="lazy"` misapplied to an above-the-fold image were found.

---

## 10. Font loading
Covered in section 1. Additional note: `--tdn-font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;` and `--tdn-font-body: 'Inter', system-ui, ...` (`assets/dog-nook.css:33-34`) have reasonable fallback stacks, which mitigates layout jump severity somewhat, but Playfair Display's letterforms/metrics differ meaningfully from Georgia — a FOUT reflow is still a real risk on `h1`/`h2` (58–64px display type, `assets/dog-nook-cro.css` + hero stylesheet) given `display=swap`. Flagged as **hypothesis** (CLS category below) since it can't be measured here.

---

## 11. Liquid loops
**File:** `sections/dog-nook-collection-list.liquid:9-25` and `sections/dog-nook-collections-index.liquid:13-29`
Both sections nest a `for bp in coll.products` loop **inside** an outer loop (`for block in section.blocks` / `for coll in coll_list`) purely to detect whether a collection contains a bundle product and compute the best available saving, e.g.:
```liquid
for bp in coll.products
  if bp.type == 'Bundle' or bp.handle contains 'bundle'
    ...
  endif
endfor
```
**Technical explanation:** This is an O(collections × products-per-collection) Liquid computation that re-runs on **every** homepage and `/collections` page load — Liquid has no caching for this kind of derived value.
**Customer impact:** Negligible today (9 active products, ≤6 collections). It will scale linearly and re-execute on every request as the catalogue grows — a scaling risk, not a current defect.
**Recommended fix:** If the catalogue grows meaningfully, move the "has bundle / best save" signal to a collection-level metafield set at publish time instead of recomputing via Liquid loop on every page view.
**Risk of regression:** Low to adopt now, but needs a metafield-population workflow — extra process overhead for a currently-tiny catalogue.
**Effort:** Medium (requires metafield setup + admin workflow, not just a template edit).

**File:** `snippets/dog-nook-pdp-extra.liquid:16-21`
Cross-sell loop iterates the full related collection with a manual `shown`/`continue`-style guard to cap at 3 renders — fine at current catalogue size, same scaling caveat as above, no action needed now.

---

## 12. Repeated snippet rendering
**File:** `sections/dog-nook-product.liquid:56,71` + `snippets/dog-nook-pdp-extra.liquid:61`
`{% render 'dog-nook-stars', stars_product: product ... %}` is invoked **three times** per PDP page load (info block, reviews bar, reviews section), each independently re-reading `product.metafields.reviews.rating`/`rating_count` and redoing the same star-count math (`snippets/dog-nook-stars.liquid:18-33`).
**Technical explanation:** Liquid `render` calls are isolated scopes with no shared-state caching, so the same metafield lookup + arithmetic happens three separate times.
**Customer impact:** Negligible — Liquid metafield reads and simple math are cheap server-side operations; this does not measurably affect page render time at this scale.
**Recommended fix:** Low priority; if ever revisited, compute `rating_num`/`count_num` once at the top of `dog-nook-product.liquid` and pass them into a lighter stars-render snippet instead of three independent metafield reads.
**Risk of regression:** Low.
**Effort:** Low, but low priority — not worth doing proactively given negligible cost.

---

## 13. Layout shifts (CLS)
**Positive finding:** Fixed-dimension containers are used consistently for image slots — `.tdn-product-card__media { aspect-ratio: 4/3 }` (`assets/dog-nook.css:109`), `.tdn-pdp__main { height: 460px }` / `300px` mobile (`assets/dog-nook-cro.css:23,65`), `.tdn-hero-a__media { min-height: 420px }` (`sections/dog-nook-hero.liquid:58`), `.tdn-coll-card__media { height: 150px }`, `.tdn-cindex__media { height: 190px }`. This is good practice and should keep image-load-driven CLS low regardless of whether a real photo or the placeholder tone is shown.

**Hypothesis-only risk — font swap reflow:** `display=swap` on Google Fonts (`snippets/dog-nook-head.liquid:10`) combined with the Georgia→Playfair Display fallback-to-webfont swap on large headings (`.tdn-h1`, up to 64px, `assets/dog-nook-cro.css`/hero stylesheet) is a documented general risk of text reflow/CLS when web fonts load after the fallback has already rendered. **Cannot be measured in this environment** — flagged as a hypothesis, not a confirmed defect.

**Positive finding:** The email popup (`snippets/dog-nook-email-popup.liquid`) and cookie banner (`snippets/dog-nook-cookie-banner.liquid`) are both `position: fixed` and self-inject via JS after `DOMContentLoaded` — because they're taken out of normal flow, they should not push page content and cause CLS, regardless of injection timing.

---

## 14. Event-handler duplication
Covered substantively in section 2. Additional specific note:

**File:** `sections/dog-nook-product.liquid:104-116` vs `snippets/dog-nook-pdp-form.liquid:13-101`
The PDP renders **two separate `<form>` elements** for add-to-cart: the main buy-box form (via `dog-nook-pdp-form.liquid`) and a second, independent mobile sticky-bar form (`sections/dog-nook-product.liquid:110-115`). The sticky form's `<input type="hidden" name="quantity">` is absent, so it implicitly always adds **quantity 1**, regardless of whatever quantity the customer set in the main form's `#tdn-qty` input.
**Technical explanation:** These are two independently-submitted forms with no shared state — the quantity selector in the main form does not affect the sticky bar.
**Customer impact:** A mobile customer who changes quantity to e.g. 2 in the main form, then uses the sticky "Add to Cart" bar instead of the in-line button, will add only 1 unit, silently diverging from their stated intent. This is a functional/UX defect, not purely a performance one, but it stems from the same duplicated-form architecture flagged here.
**Recommended fix:** Either mirror the quantity value into the sticky form via JS on input change, or remove the standalone quantity input from the sticky flow's expectations (e.g., document that the sticky bar always adds 1, if that's an accepted trade-off).
**Risk of regression:** Low to fix (add a quantity sync listener); the current behavior is a silent under-add, not a hard failure — but it should be fixed since it can undercount an order.
**Effort:** Low.

---

## 15. App embed remnants
None found. No `{% render 'app-*' %}`, no app-block schema entries, no app-proxy or app-embed script tags in the audited files — consistent with the "no installed apps" project constraint.

---

## 16. Deprecated Liquid
None found. The codebase consistently uses `{% render %}` (no deprecated `{% include %}`), current `image_url`/`image_tag` filters (no deprecated `img_url`/`img_tag`), and standard `paginate`/`form` tags. No deprecated Liquid patterns detected in a full-repo grep.

---

## 17. Theme Check violations
Could not be produced — `shopify` CLI is not installed in this environment (see section 0). No violation list exists; do not treat the absence of output as "zero violations." If Theme Check is available in the actual dev environment, it should be run before/after any implementation per the CLAUDE.md workflow (`Run Theme Check after implementation`).

---

## 18. Console-risk patterns
No `console.log`/`console.warn`/`console.error`/`console.debug` calls found anywhere in `dog-nook-theme/` (full-repo grep, zero matches) — clean on this specific check.
Noted but low-severity: several silent `try { } catch (e) {}` blocks around `localStorage` and `Shopify.customerPrivacy` calls (`assets/dog-nook.js:72,86,94`; `snippets/dog-nook-email-popup.liquid:48,53,79`) swallow errors without any logging. This is a reasonable defensive pattern for privacy-mode/Safari ITP edge cases, but it also means real failures (e.g., a broken consent API call) would be invisible during QA — informational only, not a defect requiring action.

---

## Summary of concrete, actionable items (in rough priority order)

| # | Finding | File(s) | Effort | Risk |
|---|---|---|---|---|
| 1 | Dead free-ship JS/snippet shipped to every page | `assets/dog-nook.js:101-130`, `snippets/dog-nook-freeship-bar.liquid` | Low | Low |
| 2 | PDP main image has no `loading`/`fetchpriority` hint | `sections/dog-nook-product.liquid:29` | Low | Low |
| 3 | Hero image has no `loading`/`fetchpriority` hint | `sections/dog-nook-hero.liquid:40` | Low | Low |
| 4 | Sticky mobile ATC form silently ignores selected quantity | `sections/dog-nook-product.liquid:104-116` | Low | Low |
| 5 | 4 first-party CSS files + Google Fonts CSS all render-blocking, no font preload | `snippets/dog-nook-head.liquid:8-15` | Low–Medium | Low–Medium |
| 6 | Three inline `<script>` blocks duplicate the shared JS bootstrap pattern instead of extending `window.TDN` | `sections/dog-nook-category-bar.liquid`, `sections/dog-nook-shop.liquid`, `snippets/dog-nook-pdp-form.liquid` | Medium | Medium |
| 7 | Nested Liquid loops recompute "has bundle / best save" per page view (scaling risk, not current defect) | `sections/dog-nook-collection-list.liquid:9-25`, `sections/dog-nook-collections-index.liquid:13-29` | Medium | Low |
| 8 | `dog-nook.js` category-bar marquee runs a continuous `requestAnimationFrame` loop with no visibility/off-screen pause (only pauses on hover/tab-hidden) | `sections/dog-nook-category-bar.liquid:65-76` | Low–Medium | Low |

No items above require removing functionality that customers rely on; items 1 and 4 are dead-code/bug-adjacent cleanups, the rest are additive attributes or internal refactors. Per CLAUDE.md workflow, nothing has been edited — this is the audit stage only.