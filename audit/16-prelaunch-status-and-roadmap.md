# 16 — Pre-launch status & roadmap (live-verified)

> **Prepared 2026-07-22.** A full re-read of the theme + all docs, **reconciled
> against the live Shopify store** (products, collections, menus, pages, themes
> pulled live this session) plus fresh 2025-26 competitor/CRO research.
> Photography is deliberately **out of scope** here (deferred to a Higgsfield pass).
>
> This supersedes the raw findings in `00`–`15` where they've since been fixed —
> the older audit was written 2026-07-16, before the trust/legal/a11y/delivery
> batch and the catalogue expansion landed. Read this for the *current* truth.

---

## 0. TL;DR — where you actually are

**The build is in good shape. The store is NOT launch-ready yet, but for a small,
finite list of reasons — and most are decisions or content, not code.**

Three things gate launch, in order:

1. **🔴 The finished store isn't live.** All the good work sits on the **UNPUBLISHED
   draft** theme "The Dog Nook — Design install" (`193158119707`, updated 07-20).
   The **published/live** theme is the older "Dog Nook PDP — working"
   (`193140818203`, last touched 07-15) — it predates the SEO, honesty, a11y,
   footer-identity and per-product-FAQ work. **Until you publish the draft, none of
   it is live.** (Owner action — publishing is blocked for automated tools.)
2. **🔴 No product images, store-wide** — every active product has `featuredMedia:
   null`. This is the single biggest conversion blocker and the top dropshipping
   "tell." Deferred to the Higgsfield pass per your instruction, but nothing else
   moves the needle as much.
3. **🟠 A bundle-strategy decision only you can make** (see §4) — the theme funnels
   everyone to the £34.99 Rescue Bundle, but the catalogue now also has an active
   £64.99 Settle-In Bundle that the theme never mentions.

Everything else is either **done** (§2) or a **tractable fix list** (§6–§8).

---

## 1. What this covers / how it was verified

- **Theme:** every file in `dog-nook-theme/` re-read (41 files).
- **Docs:** `HANDOFF.md`, `BUILDER-COORDINATION.md`, all of `audit/` incl.
  implementation notes and proposed-copy.
- **Live store (pulled this session via Admin API):** all products + statuses +
  prices + variants + images; all collections + membership + storefront-visible
  counts; all navigation menus; all pages; theme publish roles.
- **Research:** competitor teardowns + 2025-26 CRO benchmarks (§9).

---

## 2. What's DONE (reconciled to the live store — don't redo these)

The 07-16 audit's scariest findings are **already fixed**. Confirmed:

| Area | Status | Evidence |
|---|---|---|
| **Legal trader identity** (was `[YOUR NAME]/[YOUR ADDRESS]`) | ✅ Real name + address + email in footer + contact page | `footer-group.json`, `page.contact.json` — "Aryan Sarna · 10 Old Farm Close, Hounslow, TW4 7AB" |
| **"Made in the UK"** overclaim | ✅ Changed to "A UK business" | `footer-group.json` |
| **Cookie consent gated nothing** | ✅ Now wired to Shopify Customer Privacy API; declining actually withholds consent | `dog-nook.js`, `dog-nook-cookie-banner.liquid` |
| **Contradictory delivery claims** | ✅ Honest mixed model everywhere (1–2 day dispatch, ~4–7 day delivery; Car Boot Liner same-day UK) | `index.json`, `page.faq.json`, `product.json`, PDP trust panel |
| **Evasive "dropshipping?" FAQ** | ✅ Rewritten as transparent "Where do your products ship from?" | `page.faq.json` |
| **WCAG AA contrast + 44px tap targets + focus states + popup focus-trap** | ✅ Done | `dog-nook-cro.css`, `dog-nook-email-popup.liquid`, `dog-nook-stars.liquid` |
| **Bundle maths inconsistency** (£9.98 vs £15, wrong contents) | ✅ New Rescue Bundle now = Lick £11.99 + Snuffle £22.99 + Slow-Feeder £14.99 = £49.97; **live compareAt = £49.97** verified | live product API |
| **Donut Bed single-size** | ✅ Now has **S £29.99 / M £37.99 / L £44.99** live | live product API |
| **Legal pages** (shipping, refund-returns, terms, cookie, privacy) | ✅ All exist + published; footer menus resolve correctly | live pages + menus |
| **SEO metafields, favicon, OG fallback, homepage meta** | ✅ In `dog-nook-head` + per-resource metafields | theme + handoff |
| **15-question FAQ + per-product FAQ metafield system** | ✅ Built (`custom.faq` JSON → PDP, with shared fallback) | `page.faq.json`, `dog-nook-pdp-extra.liquid` |

**Navigation is correct and working.** Verified live: header `main-menu` → Shop
(`/pages/shop`), Collections (`/collections`), About, Contact, FAQ — **every target
page exists and is published**. Footer Explore/Help/Legal menus all resolve to real
pages/policies. The Rescue Bundle link (`/products/the-new-rescue-bundle-1`) is valid.

---

## 3. Live catalogue — the source-of-truth table

### Active (customer-facing) — 9 products
| Product | Handle | Price | Type | Images |
|---|---|---|---|---|
| The Lick Mat | `lick-mat-1` | £11.99 | Calming | ❌ 0 |
| The Snuffle Mat | `snuffle-mat-medium-1` | £22.99 | Feeding | ❌ 0 |
| The Calming Donut Bed | `calming-donut-bed-1` | £29.99–44.99 (S/M/L) | Calming | ❌ 0 |
| The Grooming Glove | `grooming-glove-1` | £11.99 | Grooming | ❌ 0 |
| The Nail Grinder | `nail-grinder-1` | £19.99 | Grooming | ❌ 0 |
| The Slow-Feeder Bowl | `slow-feeder-bowl-1` | £14.99 | Feeding | ❌ 0 |
| The Car Boot Liner | `car-boot-liner-1` | £29.99 | Travel | ❌ 0 |
| **The New Rescue Bundle** | `the-new-rescue-bundle-1` | £34.99 (compare £49.97) | *(none)* | ❌ 0 |
| **The Settle-In Bundle** | `the-settle-in-bundle` | £64.99 (compare £72.97) | Bundle | ❌ 0 |

### Draft (created, NOT customer-facing — need sourcing + specs + photos)
Heartbeat Companion £24.99 · Calming Coat £24.99 (S/M/L) · Snuffle Ball £14.99 ·
Calming Snood £9.99 (S-M/L) · Wobble Feeder £13.99 · **First Nights Bundle**
£54.99–67.99 · **Fireworks Kit** £39.99.

### Archived (hidden) / Demo
Travel Seatbelt Harness £15.99 · Wall-Mount Lick Pad £13.99 · plus
`dog-nook-pdp-demo` (**UNLISTED** — reachable by direct URL; archive/delete before
launch so it can't be stumbled on).

**Every active product has zero images. All inventory 0 (continue-selling, so ATC
works). All SKUs null** (fine for display; needed for order routing before you ship).

---

## 4. 🟠 The decision only you can make: bundle & collection strategy

The catalogue and the theme have drifted apart because two builder sessions ran in
parallel. Right now:

- **The theme** (hero button, category bar, "Featured bundle" section, footer link)
  sends everyone to **The New Rescue Bundle £34.99**.
- **The catalogue** also has **The Settle-In Bundle £64.99** (Bed M + Lick + Snuffle,
  ~72% margin, ships from in-stock items) — which `BUILDER-COORDINATION.md` designates
  the *live flagship* — but **the theme never mentions it**, and it has no bundle
  template (renders as a plain product page).

You need to pick one of:
- **(A) Two-tier ladder (recommended):** New Rescue Bundle = entry (£34.99), Settle-In
  = premium (£64.99). Feature both — e.g. Settle-In as the homepage hero bundle,
  Rescue Bundle as the "start small" option. Give Settle-In `templateSuffix=bundle`
  so it uses the nice bundle layout, and add a "what's inside" block.
- **(B) One flagship.** Pick one, retire/de-emphasise the other, point all theme CTAs
  at the winner.

**Related merchandising gap (easy win either way):** your richest, most on-brand
collection — **"Settling a New Rescue"** (5 live products incl. *both* bundles) — is
**not on the homepage**, while the thin **Travel & Outdoor (1 product)** *is*. Swap
Travel out of the homepage grid for "Settling a New Rescue," and add a problem-based
**"Calm & Settle / Anxious Dog"** collection to primary nav (this is the single
highest-value merchandising move — see §9, Lords & Labradors model).

---

## 5. Collections & nav — live-verified visibility

| Collection | Handle | Storefront-visible | Note |
|---|---|---|---|
| Calming Essentials | `calming-essentials` | 3 (Settle-In, Donut Bed, Lick Mat) | homepage grid ✓ |
| Grooming | `grooming` | 2 (Nail Grinder, Glove) | homepage grid ✓ |
| Mealtime & Feeding | `mealtime-feeding` | 2 (Slow-Feeder, Snuffle Mat) | homepage grid ✓ |
| Travel & Outdoor | `travel-outdoor` | **1** (Car Boot Liner) | 🟠 thin; on homepage grid |
| **Settling a New Rescue** | `settling-a-new-rescue` | **5** (both bundles + Bed + Snuffle + Lick) | 🟢 best collection, **not featured** |
| **Fireworks & Storms** | `fireworks-storms` | **0** (all 5 members are DRAFT) | 🟠 published-but-empty |
| Home page | `frontpage` | 0 | Shopify default, unused |

- 🟠 **Fireworks & Storms is a live, empty collection.** It's not linked in nav yet
  (low risk), and the theme's collections-index hides zero-product collections, so
  it won't surface on `/collections`. But if anything ever links `/collections/
  fireworks-storms` it shows an empty grid. Leave unlinked until its products go
  live, or unpublish it for now.
- 🟠 **Stale `dog-nook-header` menu** still exists (unused duplicate of `main-menu`,
  points Shop→`/collections/all`). Harmless but delete it to avoid future confusion.

---

## 6. 🔴 Fix before launch — text/nav correctness & loose ends

Small, mostly-config, mostly-builder-doable:

1. **Publish the draft theme** `193158119707` after a visual QA click-through on the
   preview. *(Owner — automated publish is blocked.)* **This is the #1 gate.**
2. **Resolve the bundle strategy (§4)** and wire the theme to match — otherwise the
   homepage advertises a different flagship than your catalogue intends.
3. **Swap the homepage collection grid:** drop Travel & Outdoor (1 product), add
   "Settling a New Rescue" (5). *(Builder — `index.json` block edit.)*
4. **Archive/delete the `dog-nook-pdp-demo` product** and the stale `dog-nook-header`
   menu. *(Owner/admin.)*
5. **Unpublish or leave-unlinked "Fireworks & Storms"** until its products are live.
6. **Social links** (`footer-group.json`) still point at bare platform homepages
   (`facebook.com/`, `instagram.com/`, …). Either point at real profiles or remove
   them — empty socials are a trust "tell." *(Owner decides; builder edits.)*
7. **"Save £15" wording:** live maths is £49.97 − £34.99 = **£14.98**. The dynamic
   badges already show £14.98 (truthful); only static fallback labels say "£15."
   Tighten those to "£14.98" (or "almost £15") so no surface ever overstates it.
8. **Run the 2 pending GraphQL ops** (`PENDING-graphql-ops.md`): Fireworks Kit
   `templateSuffix=bundle` + 4 `custom.faq` metafields (Snood, Wobble, First Nights,
   Fireworks Kit). Draft-only, safe, one idempotent call.
9. **OG image meta mismatch** in `dog-nook-head` (declares 1100×1100 but the URL
   requests width=1200). Cosmetic; fix when you make the real branded 1200×630 image.

---

## 7. What's MISSING (needed for a credible launch)

- **Product photography** — the launch blocker. *(Deferred to Higgsfield.)* Per
  product, plan for: hero on clean bg, **one in-use-with-a-real-dog**, **one in-scale**
  shot (critical for the bed), texture close-up, what's-in-box. Also a real branded
  **1200×630 OG share image** and **collection images**.
- **Reviews** — none yet. Scaffolding is built and real-data-only (`REVIEWS-SETUP.md`).
  Install **Judge.me** (free) + turn on post-purchase review-request emails. *(Owner.)*
- **Founder story with a real face + your rescue dog** — highest-value trust asset
  while review-light (§9). The About page structure exists; it needs the real story +
  a photo.
- **SKUs on variants** (all null) — add CJ SKUs before you ship, for order routing.
- **Analytics** — GA4 + Microsoft Clarity + a funnel event map, so post-launch
  decisions are data-driven (see `11-analytics-measurement-plan.md`).
- **Structured PDP spec block** (dimensions / material / care / size guide) — the copy
  already exists ready-to-load in `audit/proposed-copy/product-faqs-metafield.md` and
  `pdp-calming-donut-bed.md`; it just needs loading into `custom.faq` / descriptions.

---

## 8. Draft-product go-live checklist (per item, before setting ACTIVE)

For each of the 7 drafts: ① source it (real CJ cost + confirm neutral packaging) →
② replace every `{VERIFY}` spec in the description with a real measured value →
③ add real photos → ④ confirm it's in the right collection(s) → ⑤ set its `custom.faq`
→ ⑥ set ACTIVE. The **First Nights Bundle** stays parked until the Heartbeat Companion
is sourced (it depends on it). Don't set any bundle ACTIVE whose components are drafts.

---

## 9. CRO improvements to build in (competitor-informed, on-brand)

Your "no fake reviews / no fake urgency / no medical claims" rules are a **competitive
advantage** for a research-heavy, risk-averse rescue-owner audience — lean in.

**Highest-value, do first**
1. **Problem-based nav collection** — "Calm & Settle / Anxious Dog," grouped by
   *trigger* not product type (fireworks, new rescue, separation, grooming). *Rescue
   owners shop by problem, not category.* (Lords & Labradors model.)
2. **Feature both bundles as hero products with visible % savings** and "starter-kit"
   framing ("everything to settle a new rescue in week one"). *Bundles lift AOV 15–25%
   and remove first-timer paralysis.*
3. **Guarantee as loud risk-reversal on every PDP** — "Try it 30 days; if it doesn't
   help your dog settle, send it back — no forms, no fuss." *Visible guarantees lift
   sales ~21–26%.* Consider extending to **60 days** (ThunderShirt) — longer windows
   *reduce* returns because decision-urgency drops.
4. **Founder story, real face + real rescue dog**, on homepage + About. *Top-weighted
   trust signal when you have no reviews.*
5. **Free-shipping progress bar** tied to £35 in the cart drawer — you already have
   `dog-nook-cart-progress` wired in; make sure it's visible & correct. *10–20% AOV lift.*

**PDP structure (Product → Benefits → Proof → Purchase)**
6. **Benefit-led titles** ("Calming Donut Bed — raised bolsters help anxious dogs curl
   up and settle"), not bare product names.
7. **Sticky mobile ATC** (already in the theme — verify it fires) + thin trust bar
   (free delivery / 30-day / dispatch) directly under the buy button.
8. **Size guides** on the bed (S/M/L) — *wrong-size returns are the #1 refund driver.*
9. **"Frequently bought together"** on every PDP (bed + lick mat; grinder + glove;
   car liner + travel). Your PDP cross-sell block exists — feed it good pairings.
10. **Mechanism-story, never medical:** "bolstered sides let anxious dogs curl and feel
    held, like a den" — sells the outcome without a health claim.

**Homepage / capture**
11. Bestsellers/bundle row immediately after the hero; problem→solution rows by trigger
    that double as internal links to the problem-collections.
12. **Email popup timing:** 6–10s or scroll-depth (you're at 12s/45% — fine; don't go
    earlier). 10% off first order, mobile-first. Popups convert ~5–8%.
13. **Honest seasonal urgency only:** "order by [date] for delivery before Bonfire
    Night." Real deadlines convert *and* build trust. **Never** reset-on-refresh timers
    or "only 2 left" on untracked stock — the top dropshipper trust-killers.

**Ethical anxiety angles**
14. Sell the *owner's relief*, not a cure; name the rescue-specific insight ("reacting
    to triggers from a past you can't see") — the strongest emotional hook for this
    segment. Build a seasonal **"Firework Season"** collection each autumn.

---

## 10. Updated pre-launch roadmap (sequenced)

**Gate 1 — decisions (you):** bundle strategy (§4); social links keep-or-cut; extend
guarantee to 60 days? ; which draft products to prioritise sourcing.

**Gate 2 — content & config (mostly builder, some admin):** wire theme to the bundle
decision; swap homepage collection grid (add "Settling a New Rescue"); archive demo
product + stale menu; run the 2 pending GraphQL ops; load ready-made PDP spec/FAQ copy;
tidy "£14.98" wording; delete/unpublish empty Fireworks collection until ready.

**Gate 3 — trust foundation (you, longest lead — start now):** install Judge.me +
review-request emails; write the founder story; **product photography (Higgsfield
pass)** + collection images + branded OG image.

**Gate 4 — publish:** visual QA on the preview → **publish the draft theme** →
set the homepage social og:description in Online Store → Preferences.

**Gate 5 — instrument & iterate (post-launch):** GA4 + Clarity + funnel events; add
SKUs; then qualitative testing (5-user tests, session recordings) — **not** A/B tests
until traffic supports statistical power (see `12-testing-roadmap.md`).

**Photography note:** everything above is deliverable *without* photos except the
launch itself. When you're ready for the Higgsfield pass, the highest-ROI shots are
(1) the Donut Bed in-scale with a real dog, (2) each bundle's flat-lay, (3) one warm
calm-dog hero. I can help wire those in and generate the prompts when you say go.
