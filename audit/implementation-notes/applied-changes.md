# Applied changes log

Small, reversible fixes applied to the theme **source** (git only so far). None
deployed to the live theme. Draft-theme deploy status noted at the bottom.

## Batch 1 — Accessibility + functional consent (no owner input required)
| Change | File | Maps to |
|---|---|---|
| Faint-text tokens darkened to meet AA contrast (`--tdn-faint`/`--tdn-faint-2` → `#6f6a5c` ≈4.6:1 on cream; overridden in cro.css so the large token file isn't redeployed) | `assets/dog-nook-cro.css` | P2-2, 09 §a11y (SC 1.4.3) |
| Small terracotta text (card sale price + save pill) darkened to `#9c5230` (≈4.9:1) | `assets/dog-nook-cro.css` | P2-2 (SC 1.4.3) |
| Swatch tap targets 38px → 44px | `assets/dog-nook-cro.css` | P2-3 (SC 2.5.5) |
| Visible `:focus-visible` outlines on swatches, gallery thumbs, accordion buttons | `assets/dog-nook-cro.css` | P2-3 (SC 2.4.7) |
| Accessible labels on empty star-rating states | `snippets/dog-nook-stars.liquid` | 09 §a11y (SC 1.1.1) |
| Email popup: focus trap + restore focus to trigger on close | `snippets/dog-nook-email-popup.liquid` | P2-3 (SC 2.4.3) |
| Cookie consent now propagates the choice to Shopify Customer Privacy API (marketing/analytics/preferences/sale_of_data); re-applies stored choice on load | `assets/dog-nook.js` | P0-4 |
| Cookie banner copy made truthful — stops naming Meta/TikTok pixels that aren't verified as installed | `snippets/dog-nook-cookie-banner.liquid` | P0-4, L4 |

### Notes / caveats
- **Consent gating depends on how pixels are installed.** The Customer Privacy API
  gates Shopify-managed marketing pixels/Customer Events. If any pixel is hard-coded
  outside that system, it must additionally be wrapped to check
  `Shopify.customerPrivacy.userCanBeTracked()`. Pending the owner's answer on which
  pixels exist (audit question 5), the banner copy is deliberately network-agnostic
  and truthful either way.
- Contrast values computed against the cream background `#F3EDE4`; re-verify with a
  live contrast checker during QA.

## NOT yet done (needs owner input — see 13-prioritised-action-plan.md)
P0-1/2 identity+origin, P0-3 delivery consistency, P0-5 bundle fix, P0-6 FAQ honesty
— all await the business details (real name/address, true fulfilment/delivery times,
correct bundle contents).

## Draft-theme deploy status
Deploy to the draft theme (`themeFilesUpsert`) requires the Shopify GraphQL
**mutation** tool, which is **approval-gated in this environment** (the read-only
`graphql_query` already returned "requires approval"). If the deploy could not be
completed here, the committed source is ready for the owner (or an approved session)
to deploy via the handoff recipe (BASE64, verify `checksumMd5`) to the **draft**
theme only. Do not publish.
