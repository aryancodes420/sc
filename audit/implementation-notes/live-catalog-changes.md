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
