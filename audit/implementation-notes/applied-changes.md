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

## Batch 2 — Trader identity + honest delivery (owner details supplied 2026-07-16)
Sole trader **Aryan Sarna**, **10 Old Farm Close, Hounslow, TW4 7AB, UK**, contact
`hello@thedognook.co.uk` (used the existing store email — confirm the mailbox is
monitored/forwards). Fulfilment is genuinely mixed (Car Boot Liner = UK warehouse,
same-day, 2–5 days; Donut Bed/Snuffle/Lick/Glove = China via YunExpress, 1–2 day
dispatch, 4–7 day delivery; Nail Grinder + Slow-Feeder still unverified on CJ).

| Change | File | Maps to |
|---|---|---|
| Footer trader identity → real name + Hounslow address + email | `store-config/footer-group.json` | P0-1 |
| Footer origin "Made in the UK" → "A UK business" | `store-config/footer-group.json` | P0-2 |
| Contact page now shows the business address | `sections/dog-nook-contact.liquid`, `templates/page.contact.json` | P0-1 |
| PDP delivery line default → honest "1–2 day dispatch · ~4–7 day delivery" | `templates/product.json`, `sections/dog-nook-product.liquid` | P0-3 |
| PDP delivery FAQ answer → mixed model (UK boot liner same-day vs 4–7 day rest) | `templates/product.json` | P0-3 |
| Homepage trust strip "Fast UK dispatch/Usually 1–2 days" → "Dispatched in 1–2 days / Delivery ~4–7 days" | `templates/index.json`, `sections/dog-nook-trust-strip.liquid` | P0-3 |
| FAQ delivery answer → honest mixed timings | `templates/page.faq.json`, `sections/dog-nook-faq.liquid` | P0-3, C3/C4 |
| FAQ "Is this a dropshipping store?" → "Where do your products ship from?" with transparent overseas disclosure | `templates/page.faq.json`, `sections/dog-nook-faq.liquid` | P0-6, C6 |

All edited JSON templates validated. Section-preset defaults were aligned too, so
re-adding a section can't resurrect the old "same-day UK warehouse"/"Fast UK
dispatch"/"Made in UK" claims. `index.json` w3 + `dog-nook-why` keep "same-day
answers" (that's support reply speed, which is honest — not a delivery claim).

### Owner follow-ups for delivery
- The footer identity + origin live in the **theme editor** (footer section text
  blocks); the repo `store-config/footer-group.json` is a reference copy. Apply the
  same two strings in **Admin → theme editor → Footer** (or deploy the file).
- For the Car Boot Liner's faster promise to show on its own PDP, set its
  `custom.delivery_line` metafield to: `Dispatched same-day from our UK warehouse ·
  Delivered in 2–5 working days · Free UK delivery over £35`.
- **Confirm Nail Grinder + Slow-Feeder Bowl** dispatch/delivery on CJ before relying
  on the 4–7 day default for them.

## Still open
- **Bundle fix (P0-5):** blocked on a real discrepancy — the live Lick Mat is
  **£9.99**, not £11.99, so the three components sum to **£47.97**, not £49.97.
  Awaiting the owner's choice: (A) raise Lick Mat to £11.99 (then £49.97 / Save £15
  is genuine) or (B) set the bundle compare-at to £47.97 / Save £12.98.
- **Pixels (P0-4 copy):** owner to list what's firing in Settings → Customer events;
  the consent plumbing is already in and correct regardless.

## Draft-theme deploy status
Deploy to the draft theme (`themeFilesUpsert`) requires the Shopify GraphQL
**mutation** tool, which is **approval-gated in this environment** (the read-only
`graphql_query` already returned "requires approval"). If the deploy could not be
completed here, the committed source is ready for the owner (or an approved session)
to deploy via the handoff recipe (BASE64, verify `checksumMd5`) to the **draft**
theme only. Do not publish.
