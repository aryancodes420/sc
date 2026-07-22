# The Dog Nook — Customer-Trust Audit (Draft Theme, Read-Only)

Scope: static source review only, per environment limits (no rendering/Lighthouse/live checkout). Anything requiring a rendered view is marked **[Hypothesis]**. Everything else is a **[Observed]** defect with exact file/line citations.

---

## 1. Overseas fulfilment wording vs. universal "fast dispatch" promises
**[Observed]** — `dog-nook-theme/templates/page.faq.json` (block `f2`) states plainly: *"Some items are stocked here in the UK (like the Car Boot Liner); others are made and shipped by our manufacturing partner overseas, which is why those take about 4–7 working days."*

This is honest disclosure (good), but it sits alongside a **universal, undifferentiated promise on every single PDP**: `dog-nook-theme/sections/dog-nook-product.liquid` lines 76-79 render a fixed trust box — *"🚚 Fast, tracked dispatch"* — for every product regardless of whether it's the UK-stocked Car Boot Liner or an overseas-fulfilled item that takes 4-7 days. The word "Fast" is applied identically to both fulfilment paths.
- Classification: **Expectation mismatch** (mild — the FAQ elsewhere corrects the record, but a shopper who only reads the PDP box, not the FAQ, gets an inflated dispatch expectation).
- Minimum correction: change the PDP promise copy from the generic "Fast, tracked dispatch" to the same honest line already used elsewhere ("Dispatched in 1–2 days · arrives in ~4–7 days" via `product.metafields.custom.delivery_line`, which the section already supports at line 75 — just stop letting "Fast, tracked dispatch" be the fixed label).

## 2. Static "In stock — ready to dispatch" badge not tied to verified inventory
**[Observed]/[Hypothesis]** — `dog-nook-theme/snippets/dog-nook-pdp-form.liquid` lines 70-74 render *"● In stock — ready to dispatch"* whenever `product.available` is true — i.e. purely from Shopify's inventory flag, with no distinction for the overseas-fulfilled items described in the FAQ.
- Given CLAUDE.md's own description of the business as "third-party fulfilment," whether Shopify's `available` flag is genuinely kept in sync with the overseas manufacturing partner's real stock is unverifiable from source alone — flagging as a hypothesis-level **brand-promise-vs-fulfilment-capability risk**.
- Classification: **Expectation mismatch** (hypothesis).
- Minimum correction: either confirm inventory sync is real-time and accurate, or soften the copy to something the fulfilment chain can always support, e.g. "Ready to order — see delivery details below" instead of an absolute stock/dispatch claim.

## 3. Footer social links point to generic platform homepages, not real Dog Nook profiles
**[Observed]** — `dog-nook-theme/store-config/footer-group.json` lines 327-345, block `social_links_Ew63Kq`:
```
"facebook_url": "https://www.facebook.com/",
"instagram_url": "https://www.instagram.com/",
"youtube_url": "https://www.youtube.com/",
"tiktok_url": "https://www.tiktok.com/",
"twitter_url": "https://x.com/",
```
These are bare root-domain URLs — not `thedognook` handles. A UK customer clicking the Instagram/Facebook icon lands on the generic platform homepage, not a store profile. This is the clearest template-leftover / generic-catalogue "tell" found in the whole audit, and directly undermines the "trustworthy specialist retailer, not a generic dropshipping catalogue" positioning from CLAUDE.md.
- Classification: **Credibility risk / Brand inconsistency** (highest-priority finding in this audit).
- Minimum correction: either link each icon to the real, existing Dog Nook profile, or remove the `social_links` block entirely until real profiles exist. Do not publish with root-domain placeholders live.

## 4. Orphaned/stale review-section settings in the homepage JSON
**[Observed]** — `dog-nook-theme/templates/index.json` lines 113-121, section `reviews`, sets:
```
"heading": "Real reviews, coming soon",
"body": "We only show reviews once they're real...",
"placeholder_note": "Awaiting verified review"
```
But the actual section file, `dog-nook-theme/sections/dog-nook-reviews-placeholder.liquid`, was rewritten to a real review wall using setting ids `title` / `subtitle` / `agg_rating` / `agg_count` (confirmed by its own comment, lines 1-9, and schema, lines 66-86). `heading`/`body`/`placeholder_note` are not schema fields, so they render as nothing — the live default ("Loved by dog owners", 4.8/80 real reviews) is what actually shows. This is **not currently a customer-visible defect** (verified by comparing schema ids against the JSON), but it is dead/stale template content sitting in source, which is exactly the kind of copy-paste leftover this audit is asked to catch.
- Classification: **Template leftover / Brand inconsistency** (source-level, low severity — no live impact).
- Minimum correction: delete the three orphaned keys from `templates/index.json` so the file can't confuse a future editor or accidentally resurface stale "coming soon" wording if the section schema is ever refactored back to those ids.

## 5. Total absence of real product photography — placeholder text visible if launched as-is
**[Observed]** — Confirmed directly in code, not just per the architecture map: 
- `dog-nook-theme/sections/dog-nook-hero.liquid` line 42: `<span class="tdn-hero-a__ph">{{ s.image_placeholder_label }}</span>` — default label "Calm dog on bed" (schema line 101).
- `dog-nook-theme/sections/dog-nook-product.liquid` line 31: literal fallback text **"Product on clean background"** shown in place of a product photo.
- `dog-nook-theme/sections/dog-nook-featured-bundle.liquid` line 19 / `dog-nook-bundle.liquid` line 19: "Bundle flat-lay" / "Flat-lay of all three" placeholder labels.
- `dog-nook-theme/snippets/dog-nook-product-card.liquid` line 29: falls back to rendering the product title as text over a flat colour tile.

If published in this state, a UK customer buying a physical item for their anxious dog would see literal instructional/placeholder strings instead of photos on the homepage hero, every product card, both bundle PDPs, and the standard PDP gallery.
- Classification: **Credibility risk / Purchase anxiety** (the single largest trust gap found — already flagged as the top known gap in the architecture map/HANDOFF, restated here because it is directly customer-facing and unresolved).
- Minimum correction: do not publish until at least the 9 active products and both bundles have real photography; this is a pre-launch blocker, not a nice-to-have.

## 6. Trader identity, address and privacy — good, but a personal-safety note
**[Observed]** — `dog-nook-theme/templates/page.contact.json` line 10 and `store-config/footer-group.json` lines 262-287 both disclose the real trader name and a residential-looking address ("The Dog Nook (Aryan Sarna) · 10 Old Farm Close, Hounslow, TW4 7AB"). This satisfies UK trader-identity disclosure law and is genuinely good for customer trust (real person, real UK address, quick-reply promise). Not a customer-trust risk; flagged only because it doubles as the owner's home address, which is a personal-safety consideration outside this audit's remit but worth the business owner's attention.

## 7. Product claims, wellness language, and medical-claim discipline — good
**[Observed]** — Every place anxiety/calming benefits are discussed (`page.faq.json` f8, f12; `dog-nook-product.liquid` schema question block lines 135-136, 140) consistently frames products as *"comfort and enrichment tools, not medical treatments"* and defers to a vet for genuine anxiety. No instances of fabricated statistics, invented studies, or guaranteed behavioural outcomes were found anywhere in the reviewed templates/sections/snippets.
- Classification: none — compliant with CLAUDE.md's "no medical or guaranteed behavioural claims" constraint. No correction needed.

## 8. Fake urgency / fake scarcity / fake social proof — none found
**[Observed]** — No countdown timers, no "X people viewing this," no invented stock-scarcity counters, and reviews are explicitly marked as real with an honest empty state ("Be the first to review" in `dog-nook-pdp-extra.liquid` lines 80-84) when a product genuinely has none. The homepage aggregate (4.8/80) is called out in-code as real (`dog-nook-reviews-placeholder.liquid` lines 3-9). This is compliant with the "no fake urgency/scarcity/reviews" constraint.
- Classification: none — no correction needed.

## 9. Guarantees and returns — clear and internally consistent
**[Observed]** — The 30-day money-back guarantee and the separate legal 14-day cancellation right are consistently and correctly distinguished across `page.faq.json` (f5, f6, f15), `dog-nook-trust-panel.liquid`, `dog-nook-why.liquid`, and the PDP trust box. Hygiene exceptions for opened lick mats/snuffle mats/grooming items are disclosed with a faulty-goods carve-out. No contradiction found between sections.
- Classification: none.

## 10. Payment reassurance — consistent and accurate
**[Observed]** — Payment icons are driven by `shop.enabled_payment_types` (`dog-nook-product.liquid` lines 84-88, `dog-nook-trust-panel.liquid` lines 11-17) so they can't drift from what's actually enabled at checkout; FAQ f13/f14 correctly describe Shopify-processed, encrypted checkout. No fabricated security badges/certifications found.
- Classification: none.

## 11. Minor: one-line "Dispatched in 1–2 days" trust-strip generalizes over a disclosed exception
**[Observed]** — `dog-nook-theme/sections/dog-nook-trust-strip.liquid` preset (and `templates/index.json` lines 33-42) shows a blanket "Dispatched in 1–2 days / Delivery about 4–7 days" cell store-wide, while the FAQ (f1/f2) correctly notes the Car Boot Liner ships same-day with 2-5 day delivery. This is a minor oversimplification, not a contradiction (the FAQ caveat exists), so severity is low.
- Classification: **Expectation mismatch** (low severity).
- Minimum correction: none required if the FAQ stays linked/discoverable; optionally add "(except Car Boot Liner — see FAQ)" if wanting zero ambiguity.

## 12. Currency, language, domain/branding — no issues found
**[Observed]** — All prices use the `money` filter (GBP), copy is consistently British English, and `hello@thedognook.co.uk` / `thedognook.co.uk` framing is used consistently across contact, footer and FAQ with no leaked `myshopify.com` references or supplier brand names in the reviewed theme files.

---

## Priority ranking for correction
1. Footer social links → real profiles or remove (item 3) — **Credibility risk**, cheap fix, currently live-facing.
2. Product photography gap (item 5) — **Credibility risk/Purchase anxiety** — pre-launch blocker, larger effort.
3. Universal "Fast, tracked dispatch" PDP copy vs. disclosed overseas timelines (item 1) — **Expectation mismatch**, cheap copy fix.
4. Static "ready to dispatch" claim vs. third-party fulfilment reality (item 2) — **Expectation mismatch**, needs a fulfilment-process confirmation, not just a copy edit.
5. Orphaned reviews-section JSON keys (item 4) — **Template leftover**, cosmetic/source-only, no live impact — cleanup only.

Relevant files: `/home/user/sc/dog-nook-theme/templates/page.faq.json`, `/home/user/sc/dog-nook-theme/sections/dog-nook-product.liquid`, `/home/user/sc/dog-nook-theme/snippets/dog-nook-pdp-form.liquid`, `/home/user/sc/dog-nook-theme/store-config/footer-group.json`, `/home/user/sc/dog-nook-theme/templates/index.json`, `/home/user/sc/dog-nook-theme/sections/dog-nook-reviews-placeholder.liquid`, `/home/user/sc/dog-nook-theme/sections/dog-nook-hero.liquid`, `/home/user/sc/dog-nook-theme/sections/dog-nook-featured-bundle.liquid`, `/home/user/sc/dog-nook-theme/sections/dog-nook-bundle.liquid`, `/home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid`, `/home/user/sc/dog-nook-theme/templates/page.contact.json`, `/home/user/sc/dog-nook-theme/templates/page.about.json`.