# 08 — Copy & persuasion audit

**Overall:** the copy is one of the store's real strengths — native UK English,
genuinely empathetic, low-pressure, and free of fake urgency. The problems are
**factual consistency**, a few **unsupportable claims**, and **missing structured
proof**, not tone.

## What's working (keep)
- Empathetic, specific product narratives ("home eleven days and still hasn't lain
  down properly"). [Obs]
- Honest risk-reversal voice: "the risk is ours, not yours". [Obs]
- Explicit non-medical framing ("comfort and enrichment tools, not medical
  treatments") — correct and safe. [Obs]
- Honest reviews stance ("we never write our own"). [Obs][S18]

## Copy inventory — issues & fixes
| # | Location | Current copy | Problem | Recommended replacement | Principle |
|---|---|---|---|---|---|
| C1 | `footer-group.json` | "trading name of **[YOUR NAME]** … Business address: **[YOUR ADDRESS]**" | Placeholder; legal breach + trust tell | Real name + geographic address | S14 |
| C2 | `footer-group.json` | "© 2026 The Dog Nook · **Made in the UK**" | Likely untrue for CJ goods | "Run from the UK" / "A UK business" | S17 |
| C3 | `page.faq.json` f2 | "the Car Boot Liner **ships same-day from our UK warehouse**" | Likely untrue; contradicts other pages | State the real dispatch/delivery window | S17, S5 |
| C4 | `index.json` trust b4 | "Fast UK dispatch — Usually 1–2 days" | Conflicts w/ bundle "4–7 days"; plausibility | One honest, consistent line | S5 |
| C5 | Bundle description vs `index.json` | Grooming Glove / "Save £9.98" **vs** slow-feeder / "SAVE £15" | Contradiction; misleading saving | One component list + one true saving + genuine compare-at | S19 |
| C6 | `page.faq.json` f4 | "Is this a dropshipping store? We're a small UK team…" | Evasive; risks misleading given the model | Answer honestly: curated range, where it ships from, why it's still worth buying here | S17 |
| C7 | PDP short/desc | No structured specs | Missing proof (size/material/care) | Add spec list + "suitable / not ideal for" | S3 |
| C8 | Global CTA | "Add to Cart" | US term on UK store (elsewhere "basket") | "Add to basket" for consistency | [Judg] |
| C9 | Reviews section (home) | "Real reviews, coming soon" | Advertises absence of proof | Replace with guarantee/why-we-choose until real reviews exist | [Judg] |
| C10 | Hero subheading | "Calming beds, mats and grooming tools for dogs who need a little extra reassurance." | Good but omits UK/curation/guarantee | Add curation + 30-day proof (see proposed-copy) | [Judg] |

## AI-sounding / filler / repetition check
- Low incidence — the copy mostly reads human. [Obs]
- Minor repetition of "the risk is ours" across why-section, PDP and FAQ; fine as a
  motif, don't over-multiply.
- Avoid drifting into over-sentimentality if scaling copy; the current restraint is
  an asset.

## Manipulative-urgency check
- **None found** — no countdowns, no fake scarcity, no "X people viewing". Keep it
  that way (also the legally safe choice — S17). [Obs]

## Ready-to-use rewrites
- Positioning + homepage strings → `proposed-copy/positioning-and-homepage-copy.md`
- Full PDP rewrite (Calming Donut Bed) → `proposed-copy/pdp-calming-donut-bed.md`
- Honest delivery + dropshipping FAQ answers → `proposed-copy/delivery-and-trust-copy.md`
