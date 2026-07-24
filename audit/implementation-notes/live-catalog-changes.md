# Live catalogue changes (Shopify Admin API)

## 2026-07-24 — Draft-first range build (Theme B "CRO working copy" set as working theme)
All on the shared live store; **everything DRAFT/unpublished — nothing customer-facing.**

**New DRAFT products**
| Product | GID | Price | Notes |
|---|---|---|---|
| The Deep Nook (hooded cave bed) | 10337502298395 | L £59.99 / XL £79.99 / XXL £89.99 | Supplier CONFIRMED (CJ, 4.9★, £16–35 landed). `custom.faq` set. Needs sample + photos + measured specs before ACTIVE |
| The Auto-Play Ball | 10337504133403 | £24.99 | Motion-activated self-moving ball. `custom.faq` set. Source + photo |
| The Calming Weighted Blanket | 10337504428315 | £34.99 | `custom.faq` set. {VERIFY} fill/weight/sizes + photo |

**New DRAFT bundles** (compare-at = true sum of component prices)
| Bundle | GID | Price | compareAt | Save |
|---|---|---|---|---|
| The Complete Calm System (flagship) | 10337505837339 | £139.99 | £174.95 | £34.96 |
| The Home-Alone Kit | 10337506427163 | £69.99 | £84.96 | £14.97 |
| The Fireworks Survival Kit | 10337506885915 | £84.99 | £109.95 | £24.96 |

**Renames**
- The New Rescue Bundle (10311327023387) → **The First Days Kit** (handle unchanged: `the-new-rescue-bundle-1`)
- The Fireworks Kit (10328016453915) → **The Fireworks Ready Kit**

**Retired:** The First Nights Bundle (10328016290075) → **ARCHIVED** (superseded by The Complete Calm System)

**New collection:** Home Alone & Separation (Collection/527586427163, handle `home-alone-separation`) — 5 products
(Home-Alone Kit, Auto-Play Ball, Heartbeat Companion, Wobble Feeder, Snuffle Ball). Grid empty on the
storefront until member products go ACTIVE.

**Before anything goes ACTIVE:** owner sources (real cost + neutral packaging), fills {VERIFY} specs, adds real photos.
**Pending:** Theme B (`193438056731`) homepage wiring — relabel renamed bundles; feature the flagship once photographed.

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
