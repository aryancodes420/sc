# Live catalogue changes (Shopify Admin API)

## 2026-07-27 — CRO wave 2 wiring (draft theme `193438056731`)
Activated the 3 inert wave-2 features (see `DEPLOY-ME.md` / `HANDOFF.md` §10).

**Theme edit — `templates/index.json`** (redeployed, checksum `02ad221750e242634b8127ed99be68d5`, 12,123 B; repo synced):
- Added `quiz` (`dog-nook-quiz`) after `why`; 5 answer blocks → ACTIVE products:
  🎆 `lick-mat-1` · 🏠 `the-settle-in-bundle` · 🚪 `snuffle-mat-medium-1` · 🍽️ `slow-feeder-bowl-1` · ✂️ `grooming-glove-1`.
- Added `countdown` (`dog-nook-countdown`) after `hero`, **`enabled:false`, no cutoff** — awaits owner's real CJ transit times.

**Metafields — `custom.bundle_handle` (single_line_text_field)** for the PDP bundle upsell:
| Product | GID | value |
|---|---|---|
| The Lick Mat | 10311314768155 | `the-settle-in-bundle` |
| The Snuffle Mat | 10311317258523 | `the-settle-in-bundle` |
| The Calming Donut Bed | 10311318274331 | `the-settle-in-bundle` |
| The Slow-Feeder Bowl | 10311321518363 | `the-new-rescue-bundle-1` |

Grooming Glove / Nail Grinder / Car Boot Liner left unset (in no active bundle; snippet no-ops).
`dog-nook.js` / `dog-nook-cro.css` untouched. Live `193140818203` never touched. Not visually verified (firewall).

---

# Live catalogue changes (Shopify Admin API) — 2026-07-16

---

## 2026-07-20 — Phase 1 range expansion (new DRAFT products)
Per `audit/15-product-expansion-action-plan.md` Phase 1. Created as **DRAFT** —
NOT customer-facing until the owner sources the item, replaces every `{VERIFY}`
placeholder in the description with real measured specs, and adds real photos.
`custom.faq` metafield set on each (honest usage/returns answers only, no guessed
specs). Prices are proposed RRP; inventory untracked (matches the rest of the range).

| Product | GID | RRP | Type | Notes |
|---|---|---|---|---|
| **The Heartbeat Companion** | `10328011571483` | £24.99 | Calming | Separation/night-time/rescue plush w/ heartbeat pulse. Single variant. `{VERIFY}`: size, outer, pulse unit/battery, warmth pack, washing. |
| **The Calming Coat** | `10328011702555` | £24.99 | Calming | Compression/pressure wrap for fireworks·storms·travel. **S/M/L variants** (all £24.99). Copy is comfort-framed, non-medical. `{VERIFY}`: chest cm per size, material, fastening, washing. |
| **The Snuffle Ball** | `10328011833627` | £14.99 | Feeding | Foraging enrichment, complements Snuffle Mat. Single variant. `{VERIFY}`: size, material, washing. |

**Before the owner sets any of these ACTIVE:** fill all `{VERIFY}` specs, add real
photography, then add to the relevant collection (Calming Essentials / Mealtime).
Copy already follows the honest rules (no medical/behavioural cure claims, non-medical
disclaimer line, no fake reviews/urgency).

## 2026-07-20 — Phase 2 + Phase 3 (new DRAFT products, bundles, collections)
Per `audit/15-...` Phases 2–3. All DRAFT until sourced + `{VERIFY}` filled + photographed.

### Phase 2 — new single products
| Product | GID | RRP | Type | Variants | `{VERIFY}` |
|---|---|---|---|---|---|
| **The Calming Snood** | `10328015339803` | £9.99 | Calming | Small/Medium, Large | head/neck cm, material, washing |
| **The Wobble Feeder** | `10328015536411` | £13.99 | Feeding | single | size/capacity, difficulty dial, material, cleaning |

### Phase 3 — bundles (single-SKU descriptive bundles, same model as New Rescue Bundle)
| Bundle | GID | Contents | Price | compareAt (genuine sum) | Save |
|---|---|---|---|---|---|
| **The First Nights Bundle** | `10328016290075` | Donut Bed + Heartbeat Companion + Lick Mat | S £54.99 / M £61.99 / L £67.99 | 66.97 / 74.97 / 81.97 | ~£12 (17–18%) |
| **The Fireworks Kit** | `10328016453915` | Calming Coat + Calming Snood + Snuffle Ball | £39.99 (all sizes) | 49.97 | £9.98 (20%) |
Bundle size variant sets the size-bearing item (bed / coat); the other two items are
constant. First Nights `templateSuffix=bundle` ✓. Compare-at prices set on both ✓.

### Phase 3 — collections
- **Created** `Fireworks & Storms` (`gid://…/Collection/527313371419`) — Fireworks Kit,
  Calming Coat, Calming Snood, Snuffle Ball, Heartbeat Companion. (All DRAFT → grid is
  empty on storefront until those products are set ACTIVE. Not yet linked in nav.)
  ⚠️ handle came out as `fireworks-amp-storms` (ampersand double-encoded at create);
  title fixed to "Fireworks & Storms". **Handle still needs cleanup** — see pending.
- **Created** `Rescue Essentials` (`gid://…/Collection/527313404187`) — First Nights
  Bundle, New Rescue Bundle, Donut Bed, Heartbeat Companion, Lick Mat, Snuffle Mat.
- **Added new SKUs to existing collections:** Calming Essentials += Heartbeat, Coat,
  Snood · Mealtime & Feeding += Snuffle Ball, Wobble · Grooming += Snood.

### ⏳ PENDING — needs owner to approve one `graphql_mutation` run
The reconnected Shopify MCP began gating raw `graphql_mutation`/`graphql_query` behind
an interactive approval (built-in tools were unaffected). These 3 ops are ready to run
in one approval when the owner is back:
1. **Fireworks Kit `templateSuffix=bundle`** — until set it renders on the default
   product template (still works; just not the bundle layout). First Nights already has it.
2. **Fireworks & Storms handle** → `fireworks-storms` (cosmetic URL cleanup).
3. **Per-product `custom.faq` metafields** for the 4 products created after the
   disconnect (Snood, Wobble, First Nights, Fireworks). Until set, their PDPs fall back
   to the shared FAQ section (no error, just generic). The FAQ JSON is ready below.
   *(Heartbeat, Calming Coat and Snuffle Ball FAQ metafields were set successfully
   before the disconnect.)*

Ready FAQ JSON (paste as `custom.faq`, type JSON):
- **Calming Snood** (`10328015339803`): `[{"q":"Will it stop my dog reacting to fireworks?","a":"It takes the edge off the noise for many dogs, but it isn't ear protection to a measured rating and won't silence the world. Use it alongside a safe, quiet space — and for severe noise phobia, speak to your vet too. If it's not right, you're covered by our 30-day guarantee."},{"q":"Can I use it for grooming and drying?","a":"Yes — that's the second job it does. It holds flappy ears back and covered, which makes bath time and blow-drying calmer and less of a wrestle."},{"q":"How do I introduce it?","a":"Pop it on for a few minutes at a time on a calm day, with a treat or two, so it's familiar before you use it for a stressful event. Never leave it so tight it bothers them, and take it off between uses."}]`
- **Wobble Feeder** (`10328015536411`): `[{"q":"What food works in it?","a":"Dry kibble and firm, small treats work best — they roll out a few at a time as your dog nudges it. Wet or sticky food will clog it."},{"q":"Is it noisy on hard floors?","a":"It can rattle on tile or laminate as your dog rolls it. Many owners use it on a rug or mat to keep the noise down, which also slows it slightly for more of a challenge."},{"q":"Is it safe to leave my dog alone with it?","a":"Supervise the first few sessions to see how your dog treats it. It's a feeder, not a chew toy — take it away from a determined chewer and check it now and then for damage."}]`
- **First Nights Bundle** (`10328016290075`): `[{"q":"What's included?","a":"The Calming Donut Bed (in your chosen size), the Heartbeat Companion and the Lick Mat — three gentle things to help a nervous or newly-adopted dog settle through the night."},{"q":"How much do I save?","a":"From £66.97 bought separately (Small) down to £54.99 as a bundle — a saving of around £12. The Medium and Large options save a similar amount on the larger bed."},{"q":"Which size should I choose?","a":"The size sets the bed only. Measure your dog curled up and pick the bed that gives them room to turn — get in touch if you're between sizes and we'll help."},{"q":"Is this right for a rescue dog?","a":"Yes — it's built for exactly the first unsettled weeks. The bed gives them a den, the Heartbeat Companion gives them company at night, and the Lick Mat helps them wind down."}]`
- **Fireworks Kit** (`10328016453915`): `[{"q":"What's included?","a":"The Calming Coat (in your chosen size), the Calming Snood and the Snuffle Ball — three calming tools to set up before fireworks, a storm or any loud event."},{"q":"How much do I save?","a":"£49.97 bought separately, £39.99 as a kit — you save £9.98."},{"q":"When should I use it?","a":"Set it up before the noise starts, not once your dog is already panicking. Coat on, snood ready, Snuffle Ball loaded — ideally introduced on a calm day first so none of it is brand-new."},{"q":"Will it fix my dog's noise phobia?","a":"It helps many dogs cope with the edge of a loud night, but it's comfort kit, not a cure. For severe or worsening noise phobia, please involve your vet or a behaviourist."}]`

---

# Live catalogue changes (Shopify Admin API) — 2026-07-16

These were written **directly to the live store** via the built-in product tools
(which, unlike the theme-deploy GraphQL mutation, are **not** approval-gated). They
took effect immediately on the catalogue — they do **not** depend on the theme
deploy. Source of truth: the product-build handoff supplied by the owner.

## Applied
| Product | Change |
|---|---|
| **The Lick Mat** | Price £9.99 → **£11.99** (per handoff; also makes the bundle maths genuine). Description enhanced with spec block (food-grade silicone, 19.8×19.8×1cm, dishwasher-safe, suction base, includes spreader, non-medical line). |
| **The New Rescue Bundle** | Description corrected to the locked contents (Lick + Snuffle + Slow-Feeder), maths "£11.99 + £22.99 + £14.99 = £49.97 → £34.99, save £15", and variant **compareAtPrice set to £49.97** (genuine sum of the three standalone prices). Old Grooming-Glove/£44.97/save-£9.98 copy removed. |
| **The Snuffle Mat** | Spec block: 56×38cm, non-slip base, **4 anchor points (2 suction straps + 2 fleece pockets)**, machine washable. (Removed the possibly-inaccurate "round four-pocket" line.) |
| **The Calming Donut Bed** | Spec block: plush faux-fur, removable machine-washable cover, non-slip base, "Large 80cm, up to Labrador size". **Still a single £44.99 variant** (see below). |
| **The Grooming Glove** | Spec block: mesh + TPR pad, anti-bite fabric, drawstring cinch, 21×5.5cm, **right-hand design**, reverse side doubles as a lint brush. |
| **The Nail Grinder** | Spec block: diamond wheel/brass shaft, adjustable power+digital display, LED, dust-proof filter, USB rechargeable. **Removed the "sized for small and large paws" line** (implied the swappable-ports claim the handoff says not to publish). Delivery updated to **4–8 days**. |
| **The Slow-Feeder Bowl** | Spec block: food-safe PP, 22.5cm × 4.8cm, maze base, non-slip, dishwasher safe, "best for small–medium, large breeds may need a refill". |
| **The Car Boot Liner** | Spec block: waterproof quilted + non-slip PVC, ~185×105cm, side wings + headrest cut-outs, zip pocket, double-velcro straps, black. Kept its honest UK-warehouse same-day / 2–5 day line. |

All 8 descriptions follow the honest rules: no health/medical claims, no fabricated
reviews, no fake urgency.

## Could NOT do from this session (needs admin, Shopify CLI, or an approved write session)
1. **Calming Donut Bed → S/M/L size variants** (owner chose S+M+L). Creating new
   product options/variants needs the GraphQL `productSet` / `productVariantsBulkCreate`
   mutation, which is approval-gated here. The built-in product tool can only edit
   existing variants. **Build spec to apply in admin:**
   | Size | SKU | Price | (Landed) |
   |---|---|---|---|
   | S | CJGY1616904-S-White Brown | £29.99 | £7.16 |
   | M | CJGY1616904-M-Light Grey | £37.99 | £10.94 |
   | L | CJGY1616904-L-Black | £44.99 | £16.25 |
   Add a "Size" option with S/M/L; keep XL off for now. (The existing single variant
   is already at the £44.99 L price.)
2. **"Track quantity" untick / Sold-out fix** — owner is handling this in admin
   (2 clicks per product). Not attempted here.
3. **Colour variant options** (e.g. Snuffle Grey/Blue/Green, Slow-Feeder Peach/Teal)
   — same variant-creation gate as the beds. Do in admin if wanted.
4. **Product images** — none uploaded; still the biggest conversion gap. `update-product`
   accepts only public HTTPS image URLs, so real photography must be uploaded (admin
   or via `upload-image` once URLs exist).

## Still-open items from the handoff (not launch blockers)
- Nail Grinder: confirm head/port design against a physical sample before adding any
  "multiple heads" wording (kept out for now — safe).
- Donut Bed M/XL shipping re-quote if expanding beyond S/M/L.
- Samples order (~£61) before going fully live.
- SKUs are still null on all variants — add the CJ SKUs in admin for order routing.

---

## 2026-07-25 — CRO wave 2 deployed to the draft theme

Theme-file only. **No catalogue changes** (no products, collections, discounts or
metafields were created or edited in this session).

- **Target:** `gid://shopify/OnlineStoreTheme/193158119707` — "The Dog Nook —
  Design install", role `UNPUBLISHED`. Not published — that stays the owner's click.
- **Live theme `193140818203` untouched.**
- **Order used** (mandatory, per `DEPLOY-ME.md`): snippets → assets → sections →
  `snippets/dog-nook-head.liquid` last, so head never renders a snippet that
  isn't there yet.
- **Not redeployed, as instructed:** `assets/dog-nook.js` (`fa7f38fe…`) and
  `assets/dog-nook.css` (`eda5e4f6…`) — both confirmed byte-identical before and
  after the deploy.

All 15 upserted and `checksumMd5`-verified against local `md5sum`:

| # | File | md5 |
|---|---|---|
| 1 | `snippets/dog-nook-jsonld.liquid` | `cf8d8ad123b04ab223f8bb207e5fa9df` |
| 2 | `snippets/dog-nook-specs.liquid` | `9cc840b74229bca9f14ea4385cff3390` |
| 3 | `snippets/dog-nook-bundle-upsell.liquid` | `052c72de1dbb92cc52f7d3938e36fb2f` |
| 4 | `snippets/dog-nook-pdp-gallery.liquid` | `b84cfc02f1a5040735c3f64b92aad005` |
| 5 | `snippets/dog-nook-quiz-steps.liquid` | `d29b8efdb1781ef1044d3688e360db8f` |
| 6 | `assets/dog-nook-cro2.css` | `13e51256cd6cee978c3703fc447c2010` |
| 7 | `assets/dog-nook-cro3.css` | `4cc44cda1f55df5e46739533da7c66da` |
| 8 | `assets/dog-nook-gallery.js` | `ca4727f3abb575f5e0dcf2277773c253` |
| 9 | `assets/dog-nook-quiz.js` | `fd9881644136efc5de8862f8a1b46490` |
| 10 | `sections/dog-nook-product.liquid` | `9f9e6b14ac9aedb979028a624f37206d` |
| 11 | `sections/dog-nook-quiz.liquid` | `e1276d123002c687bfaa17a40a56d37d` |
| 12 | `sections/dog-nook-countdown.liquid` | `17c2fbea44f3bf1e1ede0ada2b99d8e1` |
| 13 | `sections/dog-nook-featured-bundle.liquid` | `0af15fd85d71895044248d884bb518ab` |
| 14 | `sections/dog-nook-collections-index.liquid` | `7fe92ad4e0829535aeefe602baded7de` |
| 15 | `snippets/dog-nook-head.liquid` | `475eecb82d6895d6dd0efb94dd5faa3f` |

### Two source bugs found during the deploy — correcting the record

`DEPLOY-ME.md` blamed the earlier failure on a lost raw-GraphQL grant and stated
"There is nothing wrong with the files." The grant was fine in this session; two
files were genuinely invalid and Shopify's validator rejected them:

1. `dog-nook-jsonld.liquid` — `FILE_VALIDATION_ERROR: Liquid syntax error (line 90)`.
   A literal `}` sat inside a `{{ … }}` output tag (`'/search?q={search_term_string}'`).
   Liquid scans an output tag non-greedily to the first closing brace, so the tag
   terminated early. Moved the string into an `assign`; `{% … %}` tag syntax is not
   affected. Rendered JSON-LD is unchanged.
2. `dog-nook-countdown.liquid` — `'stylesheet' tag must not be nested inside other tags`.
   The `{% stylesheet %}` block was inside `{%- if s.enabled -%}`. Moved the `endif`
   above it. The rules are inert when the section is disabled, so no behaviour change.

A scan of all 11 CRO Liquid files found no other stray `}` inside an output tag, and
a nesting check across every file in `sections/` found no other misplaced
`schema` / `stylesheet` / `javascript` block.

### Not verified here
The storefront is firewalled from this environment, so the preview was **not**
loaded. Verification is checksum-level only — the owner should click through
`https://kkeqih-jm.myshopify.com/?preview_theme_id=193158119707` (homepage + a PDP).

### Also noticed
A third theme exists that no doc mentions: `193438056731` — "The Dog Nook — Design
install (CRO working copy)", `UNPUBLISHED`, updated 2026-07-25T03:16Z. Not touched.
Worth confirming it isn't a parallel session's duplicate before it drifts.

### Correction, same day — deployed again to the RIGHT theme (`193438056731`)

The owner confirmed that the theme they actually edit is **"The Dog Nook — Design
install (CRO working copy)" `193438056731`**, not `193158119707`. `DEPLOY-ME.md` and
`HANDOFF.md` §2 both named the wrong one; both are now corrected.

All 15 files were re-deployed to `193438056731` in the same mandated order
(snippets → assets → sections → head last) and checksum-verified. Same md5s as the
table above. Theme still UNPUBLISHED. Its own `dog-nook.js` (`2c583546…`) and
`dog-nook.css` (`eda5e4f6…`) were not touched.

**That theme was NOT a copy of `193158119707`.** Before this deploy it was running the
pre-split monolithic `dog-nook-product.liquid` (12,975 bytes) and the old
`dog-nook-head.liquid` — i.e. it was behind, not ahead. All four delegate snippets it
now needs (`dog-nook-stars`, `dog-nook-pdp-form`, `dog-nook-trust-panel`,
`dog-nook-pdp-extra`) were confirmed present before head was deployed.

**`193158119707` was left as-is.** A clean revert wasn't possible: 9 of the 15 files
were new there, and the prior contents of the other 6 were never captured (only their
checksums). It should be treated as an abandoned branch of the theme.

**Asset drift is the real open problem.** `dog-nook.js` and `dog-nook-cro.css` now
exist in three mutually different versions across git and the two drafts, and git
matches neither theme (table in `HANDOFF.md` §2). CRO wave 2 is therefore layered on
top of two different JS baselines. Nobody has established which is correct — resolve
before publishing.
