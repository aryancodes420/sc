# Implementation notes (for the build phase — AFTER approval)

This audit made **no production changes**. When changes are approved, follow the
handoff's discipline. These notes translate the action plan into safe, reversible
build steps.

## Ground rules (from HANDOFF.md)
- **Two-step deploy, always:** commit + push to the dev branch **and**
  `themeFilesUpsert` to the **draft** theme (`gid://…/193158119707`). Git and the
  live theme are not auto-synced.
- **Deploy-size trap:** keep every deployed file small (≤ ~7 KB raw / ~10 KB base64);
  use BASE64, verify `checksumMd5`. New CSS goes in `dog-nook-cro.css`, **not** the
  large `dog-nook.css`.
- **CSS link trap:** any new `<a>`-based component must be added to the
  `.tdn a:not(…)` exclusion list in `dog-nook.css:50-51`, or its text renders
  sage-on-sage (invisible).
- **Never publish the theme** (owner action). **Never fabricate reviews/ratings.**
- Confirm the target dev branch with the owner before pushing (session config said
  `claude/handoff-review-1tmqbf`; handoff said `claude/hello-erxv6t`).

## Where each fix lands (files)
| Action | File(s) | Deploy note |
|---|---|---|
| P0-1/P0-2 identity + origin | `store-config/footer-group.json` | This mirrors live footer config; the real edit is in **Admin → theme editor footer**. Update the repo copy to match. |
| P0-3 delivery consistency | `sections/dog-nook-product.liquid`, `snippets/dog-nook-trust-panel.liquid`, `sections/dog-nook-faq.liquid`, `templates/page.faq.json`, `templates/index.json` | Small files — safe. Verify checksum. |
| P0-4 functional consent | `snippets/dog-nook-cookie-banner.liquid`, `assets/dog-nook.js` | Prefer Shopify **Customer Privacy API**; gate pixels. Test consent state before/after. |
| P0-5 bundle fix | `templates/index.json` + bundle **product** (Admin: description + variant compareAtPrice) | Make homepage section + product agree. |
| P0-6 FAQ honesty | `sections/dog-nook-faq.liquid`, `templates/page.faq.json` | Small. |
| P1-1 photography | Product **media** (Admin) — no theme change | Add width/height; theme already emits responsive `widths`. |
| P1-3 reviews | Install Judge.me; metafields already read by `dog-nook-stars`, `dog-nook-pdp-extra` | Follow `dog-nook-theme/REVIEWS-SETUP.md`. |
| P1-5 reviews-placeholder swap | `sections/dog-nook-reviews-placeholder.liquid`, `templates/index.json` | Small. |
| P2-1 PDP spec block | `sections/dog-nook-product.liquid` (+ product metafields) | Watch file size; if it grows, split into a `dog-nook-pdp-specs` snippet. |
| P2-2 contrast | `assets/dog-nook.css` (tokens `--tdn-faint`, `--tdn-faint-2`) + usages | `dog-nook.css` is the **large** file — editing tokens is a small diff but the whole file redeploys; verify checksum carefully, or override the specific colours in `dog-nook-cro.css`. |
| P2-3 targets/focus | `assets/dog-nook-cro.css`, `snippets/dog-nook-email-popup.liquid`, `assets/dog-nook.js` | Small. |
| P2-4 JSON-LD | new snippet rendered from `dog-nook-head` or PDP | Keep AggregateRating out until reviews are real. |
| P3-2 gallery onclick → JS | `sections/dog-nook-product.liquid`, `assets/dog-nook.js` | Behaviour-preserving refactor; test thumb swap. |

## Suggested commit slices (small, reversible)
1. `fix: real company identity + honest origin in footer` (P0-1/2)
2. `fix: single consistent honest delivery message` (P0-3)
3. `fix: bundle contents + saving consistent across home and PDP` (P0-5)
4. `fix: transparent dropshipping/delivery FAQ answers` (P0-6)
5. `feat: functional cookie consent gating` (P0-4)
6. `a11y: raise faint-text contrast to AA; enlarge tap targets; popup focus trap` (P2-2/3)
7. `feat: PDP structured spec block` (P2-1)
8. `feat: Product/Offer JSON-LD` (P2-4)
9. `chore: reviews-placeholder → trust block until real reviews` (P1-5)

Each slice: commit + push, then deploy the touched files to the draft theme and
verify `checksumMd5`. Do not batch a large file with others.

## Verification per change (since live browsing is firewalled here)
- Re-read the file's `checksumMd5` and compare to `md5sum`.
- Ask the owner to visually QA on the preview
  (`?preview_theme_id=193158119707`) at 390 / 768 / 1440 px.
- For consent/pixels and delivery/checkout, the owner should click through on a real
  browser — this environment cannot.
