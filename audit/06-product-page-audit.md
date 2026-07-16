# 06 — Product-page audit

PDP is built from `sections/dog-nook-product.liquid` + `dog-nook-pdp-form` +
`dog-nook-pdp-extra` + `dog-nook-trust-panel` + `dog-nook-stars`. The **template
is well-structured**; the **content is thin and imageless**.

## PDP element checklist (applies to all products)
| Element | Present in theme? | Real content? | Note |
|---|---|---|---|
| Title | ✅ | ✅ | "The Lick Mat" etc. |
| First/hero image | ✅ (supports it) | **❌ none** | Falls back to a coloured block. P1. (S1) |
| Image quality/consistency | ✅ gallery + thumbs | **❌** | Nothing to show. |
| Lifestyle / in-use imagery | ✅ supported | **❌** | Critical for "does it help my dog". (S1) |
| Demonstration video | ✅ supported | **❌** | Add short clips. |
| Scale / dimensions | ❌ no structured field | **❌** | Users judge scale from images/specs (S3). |
| Variant explanation | ✅ swatches/select | Only where variants exist (most are single-variant) | Fine. |
| Price | ✅ | ✅ | Clean. |
| Compare-at price | ✅ logic | Bundle only, **[unverified]** it renders | Verify; keep honest. |
| Quantity control | ❌ not in custom form | — | Add a qty stepper (minor). |
| Add-to-cart | ✅ | ✅ | Works via continue-selling. |
| Sticky mobile ATC | ✅ | ✅ | Good. |
| Payment options | Badge "Secure checkout"; Shopify Payments at checkout | ✅ | Consider express-pay buttons. |
| Delivery estimate | ✅ trust panel | ⚠️ **inconsistent** | Reconcile (see 07). |
| Returns info | ✅ trust panel | ✅ | Good. |
| Benefits | ✅ description copy | ✅ strong | Benefit-led narrative is a strength. |
| Features/specs | ⚠️ prose only | Partial | Add a structured spec list. |
| Usage / cleaning instructions | ❌ | ❌ | Add (esp. lick/snuffle mats — hygiene). |
| Materials | ❌ | ❌ | Add (safety + trust). |
| Safety info | ❌ | ❌ | Add ("supervise use", non-toxic, etc. — only if true). |
| Suitability / limitations | Partial (FAQ) | Partial | Add "suitable for / not ideal for". |
| FAQs | ✅ accordion blocks | ✅ | Good; expand per product. |
| Reviews | ✅ real-only block | **❌ none yet** | Install Judge.me; seed real. (S18) |
| Review authenticity | ✅ "never fabricated" | ✅ | Ethically + legally correct (S18). |
| UGC | ✅ supported (featured JSON) | ❌ | Later. |
| Cross-sell | ✅ "Complete the calm-down kit" | ✅ (imageless) | Good pattern; needs images. |
| Bundles | ✅ | ⚠️ inconsistent | Fix. |
| Guarantee/trust messaging | ✅ badges + panel | ✅ | Good. |

## Per-product analysis (customer problem → proof needed)
> Descriptions were read live; they are genuinely good and honest. The gap is
> **imagery, structured specs, and proof** — not narrative.

**The Lick Mat (£9.99)** — *Problem:* dog can't self-settle (fireworks/separation).
*Outcome:* a calming, focusing activity. *Mechanism:* repetitive licking. *Main
benefit:* something to do that soothes. *Suitable:* most dogs; anxious/rescue.
*Not ideal:* aggressive chewers (supervise; note it). *Objections:* "does it
actually work / is it safe / how do I clean it." *Proof needed:* in-use photo/video,
material (food-grade silicone if true), dishwasher-safe note, size vs a hand.
*Cross-sell:* Snuffle Mat, Slow-Feeder. *Bundle:* Rescue Bundle.

**The Snuffle Mat (£22.99)** — *Problem:* boredom/energy → destructive behaviour.
*Outcome:* 20-min nose-work. *Mechanism:* foraging in fleece. *Objections:* washable?
size? durability for chewers? *Proof:* in-use video, machine-wash note, dimensions,
capacity ("hides ~1 cup kibble").

**The Calming Donut Bed (£44.99)** — *Problem:* dog won't settle/sleep, esp. new
rescue. *Outcome:* a secure place to burrow. *Mechanism:* raised rim + soft fill.
*Objections:* **size/scale (critical at this price)**, machine-washable? chew-proof?
*Proof:* size chart by dog weight/breed, in-scale photo with a dog, washability,
material. **Highest-value PDP to photograph well.**

**The Grooming Glove (£11.99)** — *Problem:* dog fears the brush. *Outcome:* grooming
as stroking → trust. *Objections:* does it get loose hair? one-size? *Proof:* before/
after hair shot, sizing, material.

**The Nail Grinder (£19.99)** — *Problem:* clippers scare the dog / quicking fear.
*Outcome:* quieter, gradual trimming. *Objections:* **noise level (the whole point)**,
battery/charging, safety. *Proof:* dB/quiet claim (only if measured), rechargeable
spec, how-to, safety guard note.

**The Slow-Feeder Bowl (£14.99)** — *Problem:* gulping/bloat risk, food gone in
seconds. *Outcome:* slower, calmer eating. *Objections:* dishwasher-safe? size/volume?
non-slip? *Proof:* capacity, dishwasher note, base grip.

**The Car Boot Liner (£29.99)** — *Problem:* mess/anxiety in the car. *Outcome:*
protected, settled travel. *Objections:* **fit (which cars?)**, waterproof? secure?
*Proof:* dimensions + fit guidance, waterproof material, fixings. Reframe under
"calmer car trips" to tie to positioning.

**The New Rescue Bundle (£34.99)** — *Problem:* settling a new rescue. **Fix the
contradiction first** (see `data/live-store-facts.md`): pick one true component
list + one true saving, and ensure the compare-at basis is genuine (S19).

## Example: fully rewritten PDP
A complete, honest rewrite of **The Calming Donut Bed** (benefits-first, scannable,
honest limitations, no fabricated claims, no fake urgency/scarcity, no invented
reviews) is in:
**`proposed-copy/pdp-calming-donut-bed.md`.**

## Summary
The PDP *framework* is good enough to convert. It is starved of the three things
that actually sell a comfort product to a cautious owner: **images, structured
specifics, and real reviews.** None require theme surgery — they are content + one
optional spec block.
