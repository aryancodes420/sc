# 2026-08-13 — Web-verified findings (full-cycle run)

> **Every finding below was produced by loading the page in a real browser on draft theme
> `193438056731`, with `Shopify.theme.id` asserted on each load.** Nothing here is
> source-reading dressed as observation — the failure mode that spoiled run #1.
>
> **Coverage is partial and deliberately so.** 93 of ~133 agents completed; the owner
> stopped the run. Gate, See (6 page types) and Research (3 streams) finished in full;
> the Verify phase got through 93 of 123 findings. The unverified tail is the
> lowest-value end of the list. **61 findings survived attack · 22 were killed.**

---

## 🔴 DO THIS FIRST — the bundle pages state a saving that isn't true

**One template serves every bundle, with The First Days Kit's contents and prices
hardcoded into it.** Every other bundle wears First Days Kit's numbers.

`/products/the-settle-in-bundle` (£64.99) renders, verbatim:

| On the page | Truth |
|---|---|
| "WHAT'S INSIDE — Lick Mat £11.99 · Snuffle Mat £22.99 · Slow-Feeder Bowl £14.99" | It's **Donut Bed + Lick Mat + Snuffle Mat**. No slow-feeder. |
| "Bought separately **£49.97**" | **£72.97** |
| Badge "BEST VALUE · **SAVE £15**" | **£7.98** |
| Eyebrow "THE RESCUE BUNDLE", H1 "Three gentle essentials for a nervous dog settling in" | That's the *First Days Kit's* copy, on the Settle-In page |

Read literally, the page says the bundle costs more than its parts. That is a false
savings claim plus a misdescription of goods (DMCC 2024 / CMA).

**It contradicts itself too:** First Days Kit shows badge "SAVE £15" and price chip
"You save £14.98" on the same screen. The homepage already says £14.98.

**True figures — pulled live from the Admin API:**
Donut Bed **S £29.99 · M £37.99 · L £44.99** · Lick Mat £11.99 · Snuffle Mat £22.99 ·
Slow-Feeder £14.99

| Bundle | Contents | Separately | Price | True saving |
|---|---|---|---|---|
| First Days Kit (`the-new-rescue-bundle-1`) | Lick + Snuffle + Slow-Feeder | £49.97 | £34.99 | **£14.98** |
| Settle-In (`the-settle-in-bundle`) | Bed (M £37.99) + Lick + Snuffle | £72.97 | £64.99 | **£7.98** |

⚠️ `START-HERE-NEXT-BUILDER.md` writes £72.97 as "£44.99 + £11.99 + £22.99". £44.99 is the
**Large** bed and that sums to £79.97. The £72.97 total is right; it uses the **Medium**.
Fix that line or the next builder publishes a fresh false number from it.

**Blocked on:** Shopify MCP `graphql_mutation` approval (theme write). Everything else is ready.

---

## Then these three

### 1. Mobile has no side gutters — on every page
`assets/dog-nook.css` lines 58–60. `.tdn-wrap` sets horizontal padding; `.tdn-section` sets
`padding: 64px 0`. Equal specificity (0,1,0), `.tdn-section` declared **second**, so it wins
— and any element carrying **both** classes loses its left/right padding entirely. Confirmed
against the deployed CDN stylesheet, not just the repo. Text runs edge-to-edge at 375px,
which is where most of the traffic will land. One-line fix, sitewide effect.

### 2. Add to Cart does a full page reload
`/products/lick-mat-1` serves two plain `<form method="post" action="/cart/add">` and **zero**
`product-form-component` elements, so Horizon's AJAX handler never binds and the deployed
`dog-nook.js` doesn't replace it. Every add-to-cart is a full navigation — no cart drawer, no
free-delivery progress bar, no upsell moment. This is the core conversion mechanic.

### 3. The email popup takes the whole mobile screen at 12 seconds
Reproduced repeatedly: `.tdn-emailpop` appears at **~12.1–12.7s** with no scrolling, at
`0,0,375×812` — the entire viewport — `position: fixed`, `z-index: 90`. A first-time mobile
visitor gets the shop replaced by a discount modal before they've reached a product.

---

## Everything else that survived attack

| # | Finding | Page | Fixable now? |
|---|---|---|---|
| 1 | Every product card shows an identical **"4.8 · 10 reviews"** — same score, same count, on all 8. Genuine reviews, but uniformity reads as fabricated | shop, collections | ✅ |
| 2 | Donut Bed copy says "Large, 80cm — suits most dogs up to Labrador size" while **three** variants (S/M/L) are live and purchasable | PDP | ✅ |
| 3 | No size guide, no structured spec block, no short description; specs are bullets buried inside the description body | PDP | ✅ |
| 4 | Swatches update price and variant id but never write `?variant=` to the URL — a shared or refreshed link loses the selection | PDP | ✅ |
| 5 | **Zero 3-3-3 language anywhere** on the bundle pages — the approved positioning is not implemented on the pages that sell it | bundles | ✅ |
| 6 | All three premium bundles **404** (still DRAFT), including the £139.99 Complete Calm System | site-wide | ⚠️ owner |
| 7 | Mobile homepage is **7,745px** tall — four-plus screens before the bundles | home | ✅ |
| 8 | Collection banner descriptions absent on 4 of 5 collections; clipped mid-sentence on the fifth ("home is a…") | collections | ✅ |
| 9 | Product grid hardcoded to 4 columns | collections, shop | ✅ |
| 10 | Meta description is 320 chars — truncated in results | bundles | ✅ |
| 11 | Scenario chips render as inert `<span>` — they look filterable and do nothing | collections | ✅ |
| 12 | Shop-page filter chips are one-way doors: no way back to unfiltered | shop | ✅ |
| 13 | Category pills duplicate (Calming, Travel, Grooming, Calming, Grooming…) | shop | ✅ |
| 14 | **Zero product photographs anywhere** — 0 `<img>` in every card, gallery falls back to `#8B9578` blocks | everywhere | ❌ **needs photos** |
| 15 | Hero is a flat gradient, no photograph | home | ❌ **needs photos** |

**Correction to my own earlier note:** I previously flagged the shop-page sort control as
fake. On the deployed draft it is **real** — `data-tdn-sort`, six working options
(featured, price-asc, price-desc, title-asc, title-desc, date-desc), verified by
re-ordering the cards. The git copy is stale; the theme is ahead. Ignore that item.

---

## Killed findings (22) — the most valuable part

22 claims were investigated and **did not survive**. The recurring shape: *"the observation
is real, but the diagnosis, scope or offered proof is wrong."* Several would have sent a
builder to fix the wrong thing, and one repeated run #1's exact error — asserting a
consequence nobody had observed. Notable kills:

- The homepage review aggregate ("4.8 / from 80 real owner reviews") was challenged as
  unsubstantiated. **It held up** — the strings render and the reviews are the owner's
  genuine in-person ones. Nothing to change; nothing to delete.
- A claim that the popup covers the cookie banner's buttons: **measured false** — the card
  sits at y209–603, the banner at y613–796.
- A claim about the category marquee's animation mechanism: **refuted** — it animates by
  transform stepping ~35px/s, not the mechanism claimed.
- Several layout findings whose cited evidence URL, when loaded, served the **live** theme
  rather than the draft — the L002 trap, caught by the theme assertion.

---

## What only you can do

1. **Product photography** — the launch gate. Two findings above are unfixable without it,
   and they're the two highest-impact ones on the list.
2. **Approve Shopify `graphql_mutation`** — every theme fix, including the bundle pricing,
   is blocked behind it.
3. **Decide the premium bundles** — three are built but DRAFT and currently 404.
4. **Publish the theme** — last step, your click, always.

Everything else on this page is mine.

---

## Method note

Browser access in this container needs a loopback CONNECT tunnel plus egress-gateway CA
pinning — see `tools/agent-browser/` and `audit/lessons/L001`. Verify agents used that
tooling and asserted the theme on every load; several explicitly caught the preview-cookie
trap (`audit/lessons/L002`) that would otherwise have had them auditing the live theme.
