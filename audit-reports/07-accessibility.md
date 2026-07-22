# The Dog Nook — Accessibility Audit (dog-nook-theme, draft, read-only)

Scope: static source review of `/home/user/sc/dog-nook-theme/`. No rendering, screenshots, or Lighthouse were available (firewalled), per the environment limits noted in `audit-reports/architecture-map.md`. All render-dependent items are explicitly flagged as hypotheses. Header, footer and the cart drawer chrome are Horizon's own code (only `store-config/cart-drawer.liquid` reference copy and `dog-nook-cart-progress.liquid` insert were reviewable); anything about Horizon's own markup is marked as out-of-scope/hypothesis.

---

## A. Confirmed code defects (directly observed in source)

1. **Colour swatches have no selection state exposed to assistive tech.**
   `dog-nook-theme/snippets/dog-nook-pdp-form.liquid` lines 50–54: each `<button class="tdn-swatch" ... aria-label="{{ variant.title }}">` has no `role="radio"`/`aria-checked` (unlike the size-pill branch just above it, lines 18–26, which correctly uses `role="radiogroup"`/`role="radio"`/`aria-checked`). Screen reader users get the colour name but never learn which swatch is currently selected — only a CSS box-shadow (`.tdn-swatch.is-selected`, `dog-nook-cro.css` line 52) communicates it.
   - **Accessibility impact:** blind/low-vision customers can't tell which colour is active without triggering `change` events they can't perceive.
   - **Customer impact:** a sighted user tabbing/clicking has the same experience as everyone, so this only affects AT users, but it is a real ordering/confidence gap on a purchase-critical control.

2. **PDP "size" radiogroup uses ARIA `role="radio"` without roving tabindex/arrow-key support.**
   Same file, lines 18–26: every `.tdn-sizebtn` is independently focusable (no `tabindex="-1"` management), and `dog-nook.js` (`initSwatches`, lines 29–54) only binds `click`. The ARIA Authoring Practices radiogroup pattern expects one tab stop with Arrow-key movement between options; here Tab moves through every size individually and Arrow keys do nothing.
   - **Accessibility impact:** non-conformant ARIA — AT users who know the radiogroup convention will try arrow keys and nothing will happen; NVDA/JAWS may still announce it as a broken/partial radiogroup.
   - **Customer impact:** still operable (Tab + Enter/Space works), so this is a conformance/confidence issue rather than a blocker.

3. **Contact form fields have no `<label>` or `aria-label` — placeholder-only labelling.**
   `dog-nook-theme/sections/dog-nook-contact.liquid` lines 17–19: name, email and message fields use only `placeholder="..."`, no associated `<label>`, `aria-label`, or `aria-labelledby`.
   - **Accessibility impact:** a clear WCAG 1.3.1/3.3.2 failure. Placeholder text disappears once the user types, is not reliably read by all AT, and cannot be programmatically associated with the field.
   - **Customer impact:** any customer who forgets which field is which after typing (common on mobile with autofill/autocorrect obscuring placeholder) has no way to check — a real ordinary-usability cost on a page meant to build trust with an already-anxious audience.

4. **Newsletter email input is placeholder-only.**
   `dog-nook-theme/sections/dog-nook-newsletter.liquid` line 14: `<input type="email" ... placeholder="Your email address" required>` with no label/aria-label. Same defect class as #3, on the homepage signup band. (Contrast: the email popup, `dog-nook-email-popup.liquid` line 20, does the right thing with `aria-label="Email address"` — the fix pattern already exists elsewhere in the codebase.)

5. **Filter/sort state is not exposed to assistive tech.**
   - `dog-nook-theme/sections/dog-nook-shop.liquid` lines 21–25: filter chips (`<a class="tdn-chip {% if active %}tdn-chip--on{% endif %}">`) carry no `aria-current` for the active filter.
   - `dog-nook-theme/sections/dog-nook-collection.liquid` lines 30–37: identical pattern for collection tag filters.
   - The "Sort by" `<select data-tdn-sort>` (`dog-nook-shop.liquid` lines 27–37, JS lines 53–80) re-orders the DOM client-side with no `aria-live` announcement of the new order.
   - **Accessibility impact:** screen reader users can't tell which filter is currently applied, and get no confirmation a sort actually happened.
   - **Customer impact:** sighted users see the visual highlight and instant re-flow; this gap is AT-specific but real, on a page dedicated to helping uncertain buyers "find the right product" (a stated conversion priority in `CLAUDE.md`).

6. **Category-bar marquee doesn't pause on keyboard focus (only hover/touch).**
   `dog-nook-theme/sections/dog-nook-category-bar.liquid` JS (lines 65–83): `pos -= speed*dt` runs continuously; `hovered` is only set on `mouseenter`/`touchstart`/`touchend`, never on `focus`/`blur` of the pill links. A keyboard user who tabs onto a pill while `prefers-reduced-motion` is not set will see that pill continue sliding out from under the focus ring.
   - **Accessibility impact:** likely fails SC 2.2.2 (Pause, Stop, Hide) for keyboard-only users specifically, since the only stated exception paths (hover/touch) don't cover keyboard.
   - **Customer impact:** disorienting for anyone tabbing through the header on a laptop with a mouse plugged in but navigating by keyboard (motor-impairment use case), and mildly odd even for sighted mouse users who tab past it.
   - Note: `prefers-reduced-motion: reduce` is correctly respected (line 42, `viewport.style.overflowX = 'auto'`) — that part is solid.

7. **Cookie banner: ambiguous ARIA role, no focus management, no announcement.**
   `dog-nook-theme/snippets/dog-nook-cookie-banner.liquid` line 8: `role="dialog" aria-label="Cookie consent"` on a `hidden` element toggled visible by `dog-nook.js` (`initCookie`, lines 83–99). It is not `aria-modal`, has no focus trap, and focus is never moved into it when it appears (contrast with the email popup, which correctly captures `lastFocused`, traps Tab, and restores focus on close).
   - **Accessibility impact:** labelling it `role="dialog"` implies modal-like behaviour that isn't delivered; a screen reader user browsing linearly may not discover the banner appeared at all, since nothing announces it and focus doesn't move.
   - **Customer impact:** a UK consent banner that isn't reliably noticed by AT users is also a compliance exposure (Customer Privacy API consent should be an informed, discoverable choice) as well as a usability gap.

8. **Email popup traps Tab focus but does not hide background content from screen reader "browse mode."**
   `dog-nook-theme/snippets/dog-nook-email-popup.liquid` — focus trap (lines 62–75) only intercepts the Tab key. Nothing sets `aria-hidden="true"`/`inert` on the rest of the page while the dialog is open.
   - **Accessibility impact:** NVDA/JAWS/VoiceOver users navigating by virtual cursor (not just Tab) can still read and interact with page content behind the popup, defeating the modal's intent and potentially letting them "lose" the dialog.
   - **Customer impact:** sighted-mouse users are unaffected; this is squarely an AT-user defect on a first-purchase discount mechanism.

9. **PDP FAQ / collection "Good to know" accordions: button not linked to its panel via `aria-controls`/`id`.**
   `dog-nook-theme/snippets/dog-nook-pdp-extra.liquid` (lines 36–39), `sections/dog-nook-faq.liquid` (lines 8–11), `sections/dog-nook-collection.liquid` (lines 59–62): each `<button class="tdn-accordion__q">` toggles `aria-expanded` correctly (via `dog-nook.js` `initAccordions`, lines 12–26) and the panel is correctly `display:none`/`display:block` (`dog-nook.css` lines 137–138, so content is properly hidden from AT when collapsed — that part is correct) — but no `id` on `.tdn-accordion__a` and no `aria-controls` on the button. This is a best-practice gap rather than a hard WCAG failure (aria-expanded alone is sufficient for state), but it means AT that surfaces "controls" relationships (some screen reader quick-nav features) can't jump straight to the answer.

10. **Hero image `alt` fallback can inject literal markup into alt text.**
    `dog-nook-theme/sections/dog-nook-hero.liquid` line 40: `alt: s.image.alt | default: s.heading | escape`. The heading schema default explicitly instructs merchants to use `<br>` for line breaks (schema line 90: "Heading (use `<br>` for a line break)"). If a real photo is uploaded without merchant-entered alt text (the documented "no photography yet" gap makes this latent today), the fallback will escape the raw `<br>` into literal text, and a screen reader will announce it as garbled markup rather than a clean sentence.
    - **Accessibility impact:** malformed alt text once photography is added and a merchant forgets per-image alt text — a real defect, currently dormant because no hero images are uploaded yet.
    - **Customer impact:** none until photography ships; flagging now so it isn't rediscovered as a "new" bug during the image pass.

11. **"Buy it now" button gives no loading/progress feedback.**
    `dog-nook-theme/snippets/dog-nook-pdp-form.liquid` lines 103–120: on click the button is `disabled` with no text change, no spinner, and no `aria-live` status; if the `fetch` fails it silently re-enables and falls back to `form.submit()`.
    - **Accessibility impact:** AT users get no confirmation the click registered or that anything is happening (button is simply "disabled," no state announced).
    - **Customer impact:** on a slow mobile connection (this store's dominant traffic per `CLAUDE.md`), a customer who sees no visible change may tap again or assume the button is broken — a genuine ordinary-usability risk on the highest-intent action on the page.

12. **Colour contrast: default inline-link colour (`--tdn-sage` on cream/white) is below AA for normal text.**
    `dog-nook-theme/assets/dog-nook.css` lines 50–51 set inline link colour to `var(--tdn-sage)` (#7C8767). Calculated contrast of #7C8767 on white/#F3EDE4 is roughly **3.8:1**, which clears the 3:1 threshold for large text/UI components but fails the 4.5:1 threshold required for normal-size body text links (SC 1.4.3). This is separate from the already-documented "link trap" (invisible sage-on-sage) in `CLAUDE.md` — this is links that render as visible sage text but at insufficient contrast for low-vision readers. `dog-nook-cro.css` (lines 71–90) already fixes several other contrast issues (`--tdn-faint`, terracotta sale text) but does not touch this base link colour.
    - **Accessibility impact:** low-vision users may struggle to read inline links (e.g. the contact page's `mailto:` link, cookie banner's Privacy Policy link, PDP "Contact us" link) at default sage.
    - **Customer impact:** marginal for most users but a real barrier for the low-vision segment of an already vulnerable, "reassurance-seeking" customer base per the brand brief.

13. **Decorative emoji icons are not marked `aria-hidden`, causing redundant/confusing announcements.**
    Examples: `dog-nook-theme/sections/dog-nook-product.liquid` lines 77–80 (🚚 📦 🛡️ 🔒 promise icons), `snippets/dog-nook-trust-panel.liquid` lines 8–10, `snippets/dog-nook-cart-progress.liquid` line 18 (🎉). None of these emoji spans carry `aria-hidden="true"`, so screen readers will announce e.g. "delivery truck, Fast, tracked dispatch" — redundant with the adjacent text, not broken but noisy. (The PDP "Buy it now" lock icon at `dog-nook-pdp-form.liquid` line 84 *does* correctly use `aria-hidden="true"` — the fix pattern already exists, just isn't applied consistently.)

---

## B. Visual/rendering-dependent items — hypotheses only (cannot be confirmed without live rendering)

These are plausible risks based on source but require a browser/screen-reader pass on the actual storefront to confirm:

- **Free-shipping cart-progress bar announcement.** `dog-nook-theme/snippets/dog-nook-cart-progress.liquid` renders a message ("You're £X away from free delivery") inside Horizon's AJAX-refreshed cart drawer with no `aria-live` wrapper in the reviewed snippet. Whether Horizon's own `cart-items-component`/`cart-drawer-component` (not present in this repo, only referenced in `store-config/cart-drawer.liquid`) supplies a surrounding live region for the whole drawer update is unknown from source alone — needs live verification with a screen reader after adding/removing a cart item.
- **Skip-navigation link.** No skip-link markup exists anywhere in `dog-nook-theme/` (custom head/foot snippets don't add one), but header/footer are Horizon's own `layout/theme.liquid`, which is not present in this repo copy. Horizon likely ships its own skip link — this cannot be confirmed or denied from the available source and must be checked live.
- **Focus visibility theme-wide beyond the CRO overrides.** `dog-nook-cro.css` lines 92–102 add explicit focus rings to swatches, thumbnails, accordion buttons and size pills, but general links/buttons inherit whatever Horizon's base focus styles are — cannot verify actual rendered contrast/visibility of the default focus ring without a browser.
- **Modal/drawer stacking when both the email popup and cookie banner are eligible to show simultaneously** (e.g., a first-time visitor who scrolls 45% before the cookie choice is made) — could create two overlapping fixed-position dialogs. Layout collision is plausible from the CSS (`z-index: 90` on the popup; cookie banner has no z-index set in the reviewed snippet) but needs a rendered check.
- **Reduced-motion coverage for animations beyond `dog-nook-anim.css` and the category-bar** (e.g., the email popup's `tdn-pop-in` keyframe at `dog-nook-email-popup.liquid` line 32) is not gated by any `prefers-reduced-motion` check — worth a render-time check on a reduced-motion device, though it's a brief 0.3s entrance animation so real-world impact is likely low.

---

## C. Content-management requirements (not code defects — need merchant/editor action)

- **Every product/section-level image relies on merchant-entered alt text via `.alt | default: <heading/title>`.** The pattern is correct in code (`dog-nook-product-card.liquid` line 26, `dog-nook-product.liquid` line 29, `dog-nook-bundle.liquid` line 15, `dog-nook-collections-index.liquid` line 33), but once real photography is uploaded (the store's single biggest known gap per `HANDOFF.md`/architecture map), someone must actually type meaningful alt text per image in the Shopify admin, distinct from the product title, describing what the photo shows (e.g., "Charcoal snuffle mat with treats hidden in fleece strips") rather than letting every image fall back to the bare product title.
- **FAQ/accordion question-and-answer text length and reading level** are merchant-editable content (`dog-nook-faq.liquid`, per-product `custom.faq` metafields) — worth a plain-language pass given the anxious/uncertain target customer, but this is a copy decision, not a code defect.
- **Link purpose in prose content** (e.g., collection `description`, product `description` rich text rendered via `{{ collection.description }}` / `{{ product.description }}`) is merchant-authored HTML not reviewable from theme code — any "click here"/"read more" style links entered via the Shopify rich-text editor would fail SC 2.4.4 (Link Purpose) and can only be caught by reviewing actual admin content, not the template.

---

## Summary table

| # | Area | File(s) | Status |
|---|---|---|---|
|1|Colour swatch selection state|`snippets/dog-nook-pdp-form.liquid`|Confirmed|
|2|Size radiogroup keyboard pattern|`snippets/dog-nook-pdp-form.liquid`|Confirmed|
|3|Contact form labels|`sections/dog-nook-contact.liquid`|Confirmed|
|4|Newsletter input label|`sections/dog-nook-newsletter.liquid`|Confirmed|
|5|Filter/sort state + announcement|`sections/dog-nook-shop.liquid`, `sections/dog-nook-collection.liquid`|Confirmed|
|6|Marquee doesn't pause on focus|`sections/dog-nook-category-bar.liquid`|Confirmed|
|7|Cookie banner role/focus/announce|`snippets/dog-nook-cookie-banner.liquid`|Confirmed|
|8|Email popup background not hidden from AT|`snippets/dog-nook-email-popup.liquid`|Confirmed|
|9|Accordion `aria-controls` missing|`snippets/dog-nook-pdp-extra.liquid`, `sections/dog-nook-faq.liquid`, `sections/dog-nook-collection.liquid`|Confirmed (minor)|
|10|Hero alt-text `<br>` leakage (latent)|`sections/dog-nook-hero.liquid`|Confirmed (dormant until photography ships)|
|11|"Buy it now" no loading feedback|`snippets/dog-nook-pdp-form.liquid`|Confirmed|
|12|Sage link contrast ~3.8:1|`assets/dog-nook.css`|Confirmed|
|13|Emoji icons not `aria-hidden`|`sections/dog-nook-product.liquid`, `snippets/dog-nook-trust-panel.liquid`, `snippets/dog-nook-cart-progress.liquid`|Confirmed (minor)|
|—|Cart-update live announcement|`snippets/dog-nook-cart-progress.liquid` + Horizon cart drawer (not in repo)|Hypothesis|
|—|Skip-navigation link|Horizon `layout/theme.liquid` (not in repo)|Hypothesis|
|—|General focus-ring visibility|Horizon base + `dog-nook-cro.css`|Hypothesis|
|—|Popup/cookie-banner stacking collision|`snippets/dog-nook-email-popup.liquid` + `dog-nook-cookie-banner.liquid`|Hypothesis|
|—|Alt text quality once photography ships|Multiple product-image templates|Content-management|
|—|Rich-text link purpose|Product/collection descriptions (admin content)|Content-management|

No files were edited — this is an audit only, per instructions.