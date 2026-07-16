# 00 — Executive summary

**The Dog Nook** — evidence-based ecommerce conversion audit.
Prepared 2026-07-16. Storefront: thedognook.co.uk (Shopify, Basic plan, GBP, UK).

## The one-paragraph verdict
The Dog Nook has a **genuinely strong, specific position** (comfort and enrichment
for anxious & rescue dogs), a **well-engineered custom theme**, and **honest,
well-written copy**. But it is **not currently in a state to convert at a normal
rate**, for reasons that are almost entirely about **content, trust and
configuration rather than code**: every product has **zero images**, there are
**no reviews**, the **legal business identity in the footer is still a
`[YOUR NAME]/[YOUR ADDRESS]` placeholder**, **social links are empty**, and
**delivery promises contradict each other** (and likely contradict the reality of
CJdropshipping fulfilment). A cautious UK shopper landing here today has strong
signals that this is a new, unproven dropshipping store — the exact impression the
brand's own copy tries to argue against. Fixing the truth-and-trust layer is worth
more than any persuasion tweak.

## Scope & honesty notes
- **Storefront is firewalled from this environment**, so **no browser/Playwright
  testing, live Lighthouse, mobile pixel testing or checkout walkthrough was
  possible.** Findings come from (a) the live Shopify Admin API and (b) the theme
  source code. Anything needing live confirmation is flagged throughout.
- All catalogue facts were pulled live (see `data/live-store-facts.md`). No
  statistics, competitor performance, or customer behaviour has been invented.
- The audit **did not modify any theme or production file.** Recommendations are
  staged for approval.

## Scores at a glance (0–10, uninflated)
Lowest: **Visual quality 1 · Social proof 1 · Immediate trust 3 · Delivery
transparency 3 · Legal completeness 3.**
Highest: **Positioning clarity 7 · Brand differentiation 6 · Product-page
persuasion 6 · Performance 6 · Technical quality 6.**
Unweighted average **≈ 4.6/10.** Full table: `01-current-state-scorecard.md`.

## The 10 most serious problems (ranked by the brief's priority order)
1. **P0 — Placeholder legal identity in the footer.** `[YOUR NAME]` / `[YOUR
   ADDRESS]` are unfilled. UK distance-selling law requires a real trader identity
   and geographic address (S14–S16). This is both a compliance risk and a top
   dropshipping "tell". *File:* `store-config/footer-group.json`.
2. **P0 — Contradictory / likely-unsubstantiated delivery claims.** "1–2 day
   dispatch" and "same-day from our UK warehouse" vs the bundle's "delivered
   4–7 days", on a store fulfilled via CJdropshipping. Misleading delivery timing
   is a named unfair practice (S17) and a top-3 abandonment cause (S5).
   *Files:* `index.json`, `dog-nook-faq.liquid`, `page.faq.json`, `dog-nook-product.liquid`.
3. **P0 — Cookie/consent banner gates nothing.** It claims Meta & TikTok pixels
   are used and offers "Decline", but declining sets a localStorage flag and loads
   the same scripts either way. UK PECR/consent expectation. *File:*
   `dog-nook-cookie-banner.liquid` + `dog-nook.js`.
4. **P1 — Zero product images, store-wide (API-verified).** The single biggest
   conversion barrier; images are shoppers' first PDP action (S1). *Source:* store
   content, not theme.
5. **P1 — Bundle contents & savings contradict between homepage and PDP.**
   Grooming Glove + "Save £9.98" vs slow-feeder bowl + "SAVE £15". Inconsistent
   savings claims risk misleading-price rules (S19) and read as sloppy/untrustworthy.
   *Files:* `index.json`, bundle product description.
6. **P1 — No social proof and empty social profiles.** Zero reviews; social links
   point to bare platform homepages. Trust vacuum for an unknown brand (S5 trust
   signals). *Files:* store content + `footer-group.json`.
7. **P1 — "Is this a dropshipping store?" FAQ answer is evasive.** Given the stated
   model, the current answer risks misleading customers rather than being honestly
   transparent (S17). *File:* `dog-nook-faq.liquid` / `page.faq.json`.
8. **P2 — Product pages lack structured specifics** (dimensions, materials, care,
   safety, in-scale reference). Users try to judge scale from images/specs (S3).
   *Source:* product content + optional PDP spec block.
9. **P2 — Faint-text colour tokens fail WCAG AA contrast** (~3:1 vs required 4.5:1
   for `--tdn-faint`/`--tdn-faint-2` on cream; S10). Also 38px swatch targets
   below the 44px guideline (S11). *File:* `dog-nook.css`, `dog-nook-cro.css`.
10. **P2 — Thin "Travel & Outdoor" collection (1 product)** and no collection
    imagery create an empty, low-credibility discovery path. *Source:* catalogue.

## The 10 highest-value improvements
1. **Add real product photography + one in-scale shot per product** (S1–S3). Highest lever.
2. **Fill in the real trader identity + geographic address** in the footer (S14).
3. **Reconcile delivery messaging to one honest, consistent promise** everywhere;
   state realistic dispatch/delivery windows and origin if non-UK (S5, S17).
4. **Make the cookie banner actually gate non-essential pixels** (or switch to
   Shopify's Customer Privacy API / consent app).
5. **Fix the bundle to one true component list and one true saving**, with a
   genuine compare-at basis (S19).
6. **Install a review app (Judge.me) and seed with real post-purchase reviews**;
   the scaffolding already exists (`REVIEWS-SETUP.md`). Never fabricate (S18).
7. **Point social links at real, populated profiles** — or remove them until they exist.
8. **Add a structured PDP spec block** (dimensions, material, care, safety, "suitable/not suitable for").
9. **Fix accessibility contrast + tap targets** (S10–S12).
10. **Add GA4 + Microsoft Clarity and a funnel event map** so future changes can be
    judged on data, not opinion (see `11-analytics-measurement-plan.md`).

## What must happen before any A/B testing
Traffic is almost certainly too low for statistically valid A/B tests. Prioritise
**truth-and-trust fixes, usability testing, session recordings and objection
surveys** first (see `12-testing-roadmap.md`). Do not run underpowered split tests.

## Prioritised sequence (summary — full plan in `13-prioritised-action-plan.md`)
1. Truthfulness & legal (P0 #1–3 above) — *cheap, mandatory, mostly config.*
2. Trust foundation: photography, reviews app, real social, bundle fix.
3. Product-page depth: specs, scale, objection handling.
4. Mobile & accessibility polish.
5. Analytics instrumentation, then qualitative testing, then (only later) A/B.

## Deliverables index
`01` scorecard · `02` positioning · `03` competitor benchmark · `04` homepage ·
`05` navigation/collections · `06` product pages · `07` trust/dropshipping-risk ·
`08` copy audit + rewrites · `09` technical/perf/a11y · `10` legal checklist ·
`11` analytics plan · `12` testing roadmap · `13` prioritised action plan ·
`14` source register · plus `data/`, `proposed-copy/`, `implementation-notes/`,
`screenshots/` (see its README re: firewall).
