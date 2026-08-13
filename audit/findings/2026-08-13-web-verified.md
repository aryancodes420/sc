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

## 🚨 THE POSITIONING BET IS NOT WHAT WE THOUGHT — read before building 3-3-3

`POSITIONING.md` rests on one load-bearing sentence: *"every rescue teaches it, only
charities rank for it, and **no retailer has claimed it commercially**."*

**That is false.** At least eight UK commercial sites already publish 3-3-3 content:

| Who | What they do with it |
|---|---|
| **PetBuds** (petbuds.co.uk, Bradford) | **A Shopify pet retailer already mapping products to stages** — article 08 Jan 2026: chew-proof bed for the 3 days, chew-proof toys for the 3 weeks, lick mat for the 3 months, with inline Add to Cart / Quick Add buttons. This is precisely the plan in `POSITIONING.md`, already shipped. |
| Gravitis Pet Supplies | UK retailer, article live since **16 Jun 2022** — content only, no product tie-in |
| Animal Friends | UK pet insurer, FCA-regulated, uses "the 3-3-3 rule" explicitly |
| Wagtails · Chase Canines · BarkSmart · Welly and Tails · Pound on Pastures | UK dog services publishing it |
| UKUSCAdoggie (non-UK) | Ties **a snuffle mat and a lick mat** — our exact categories — to the stages |

**How run #1 got it wrong, in its own words:** it recorded that "every retail domain
returned 403 to direct fetch" and that competitor data was "search-snippet derived, not
read off live pages." So it inferred *nobody has claimed this* from *I could not open any
retail site*. Absence of evidence became evidence of absence, and the conclusion went
into `POSITIONING.md` in good faith.

**What this does and doesn't mean.** It does **not** kill the position — 3-3-3 is still a
real customer need, still on-brand, and nobody in the UK owns it *well*. What dies is the
"uncontested, no competitor has it" premise, and with it the claim that this alone is the
moat. PetBuds is a live precedent to study, not a reason to stop. **But the owner decided
in good faith on the strength of that premise and deserves to re-decide knowing it's wrong.**

## Competitor prices — read off live product pages, not snippets

Run #1 could not retrieve a single cave-bed price. These were read off the retailers' own
product data (observed 2026-08-12, GBP inc VAT):

| Retailer | Product | Price |
|---|---|---|
| Zooplus | Igloo Dog Den, 71×54×57cm | **£42.99** |
| Collared Creatures | Luxury Dog Cave Bed | S 65cm **£87.98** · M 80cm **£109.98** · L 98cm **£129.99** · XL **£149.99** |
| Collared Creatures | Luxury Snuggle Sack | XS **£63.79** → XXL **£178.49** |
| Collared Creatures | Deluxe Comfort Cocoon | S **£99.98** · M **£135.98** · L **£154.98** · XL **£189.98** |
| Charley Chau | Burrow Bag (cotton) | S **£100** · M **£120** · L **£180** |

⚠️ **This contradicts run #1's "the Deep Nook could go to £99.99."** That was inference
with no retrievable price behind it. £99.99 sits mid-table against genuine UK handmade
brands with real photography and review counts in the thousands — a position we cannot
currently support with zero product photos.

## What competitors do on the product page that we don't

`calmingdogbeds.co.uk/products/calming-donut-dog-bed`, loaded at 375px and 1440px, in order:
photo carousel (5 real shots) → H1 → stars **+ "(1,193)"** → **two paragraphs of empathy
copy** → price → colour swatches → size → quantity → Add to cart → Size Chart.

**Empathy copy sits above the price.** `myanxiousdog.co.uk` does the same, with girth
ranges right under the buy button.

**Ours at 375px:** announcement bar → header → breadcrumb → a grey placeholder block
reading "PRODUCT ON CLEAN BACKGROUND" → "CALMING ESSENTIALS" → H1 → "4.8 · 10 reviews".
Price barely visible. **Zero words of selling copy on the entire first screen** — and the
product copy is the strongest asset in the project.

## Three more that survived, which I under-reported

- **Mobile PDP overflows to 420px inside a 375px viewport — and the lost 45px cannot be
  scrolled to.** A class collision: `.tdn-sizes` is used for both the size-guide *table*
  (`min-width:420px` in `dog-nook-cro2.css`) and the size-*selector* pill row, and cro2
  loads last. Result at 375px: "They stood in the doo", "Delivered in 4–7 work", and the
  sticky Add to Cart button clipped. **This is worse than the gutter bug** and needs a
  rename, not a padding tweak.
- **The cart page has no free-delivery progress bar at all.** Three real carts built by
  permalink (£34.98, £64.97, empty): zero progress elements, zero threshold text anywhere
  in 306KB of HTML. The only mention of £35 on the page is the announcement bar.
- **No privacy link at any of the three email-capture points** (newsletter, quiz, popup) —
  though the page does carry privacy links in the footer, so this is a placement fix.

## Two claims that need your judgement, not mine

- **The hero says "Less anxious."** The standing rule is that the ASA treats anxiety as a
  health condition — "reduces anxiety" prohibited, "for dogs who find fireworks hard"
  permitted. "Less anxious." as the largest type on the site, directly above named
  products, is an outcome claim on that state. Verifier's read; worth a decision.
- **"Registered UK trader"** in the homepage trust strip. A verifier challenged it as
  false and **that challenge failed** — sole traders *are* registered with HMRC, so the
  phrase isn't provably untrue. But it's ambiguous and unsubstantiated in a trust strip.
  Not a compliance item; a credibility one.

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
