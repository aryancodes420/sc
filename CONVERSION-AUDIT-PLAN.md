# The Conversion Audit — objective & plan

> **Status: APPROVED 2026-08-05.** This is the spec the executing builder works to.
> **Phase 0.5 is DONE — the position is decided: see `POSITIONING.md`.** Start at Phase 1.

---

## The objective

**Make every element of every page on The Dog Nook convert better than the equivalent
element on every competitor's page.**

Not "be as good as." Better. Element by element, measured, with the reasoning written down.

The store's job is to turn a worried owner of an anxious or rescue dog into a buyer, at the
highest order value they'll honestly accept. Every finding in this audit must connect to
that, or it doesn't belong in the report.

---

## What "better" means — the scoring rubric

Vague findings ("improve the hero") are useless. Every element on every page — ours and
theirs — gets scored **1–5 on five dimensions**:

| # | Dimension | The question it answers |
|---|---|---|
| 1 | **Clarity** | In 3 seconds, is it obvious what this is and who it's for? |
| 2 | **Motivation** | Does it give a real reason to want it, in the owner's own emotional language? |
| 3 | **Trust** | Why should a stranger believe this? What proof is on screen? |
| 4 | **Friction** | What stands between wanting it and having bought it? |
| 5 | **Relevance** | Does it speak to an *anxious/rescue dog* owner specifically, not "dog owner"? |

**Output per element:** our score, each competitor's score, the gap, and the specific change
that closes it. A finding without a proposed replacement is not finished work.

---

## ⚠️ The flaw in the obvious version of this plan — read first

An element-by-element comparison has a built-in ceiling: **it makes you slightly better than
your rivals at everything, and the best at nothing.** Score every element against theirs,
close every gap, and you land at "competent" — a well-executed version of the same shop.
That does not win. People don't switch shops for a marginally better trust badge.

The stores that win are the ones that are the **obvious** choice for a specific person with a
specific problem. That's a positioning decision, and it has to come *first*, because it
changes what every element on every page is supposed to say. "Improve the hero" is a
meaningless instruction until you know what the hero is arguing.

**So the sequence is: decide what we're the best in the world at → then audit every element
against that.** Comparison tells us where we're behind. Positioning tells us what to aim at.
We need both, in that order.

There are three candidate positions already evidenced in the research, and each has a
competitor-proof moat:

1. **The 3-3-3 timeline.** Every UK rescue teaches it (3 days decompress / 3 weeks settle /
   3 months at home); only charities rank for it; no retailer has claimed it. It maps
   exactly onto the bundle ladder, which turns the price tiers into *stages of a dog
   settling in* rather than discount tiers. **This is the strongest of the three.**
2. **The indoor problem.** My Anxious Dog owns "anxious dog" but sells the outdoor,
   on-lead, other-people problem. Nobody owns the dog who won't settle at night, won't eat
   for three days, paces, shadows you room to room. That is every product we sell.
3. **Sold by hand, proven in person.** We have real reviews from real customers who bought
   face to face, before the website existed. No dropshipper can fake that, and it directly
   answers the complaint that sinks our nearest rival ("not really a UK business").

**Phase 0.5 picks one as primary.** Everything downstream is judged against it.

---

## Who we're measuring against

Pick from three tiers — you learn different things from each. **Do not copy tier 1 blindly:
our nearest competitor has poor Trustpilot reviews, so imitating them imports their
weaknesses.**

- **Tier 1 — direct UK rivals (beat these).** `calmingdogbeds.co.uk` · `myanxiousdog.co.uk`
  · Thundershirt UK · Snuggle Puppy UK. Plus any others surfaced in Phase 0. These define
  the category's table stakes — and tier 1 is *beatable*, which is the whole opportunity.
- **Tier 2 — big UK pet retail (match these).** Pets at Home · Lords & Labradors ·
  Bella & Duke. Not rivals — they set what a UK shopper *expects* a shop to do. Falling
  below this baseline reads as amateur.
- **Tier 3 — best-in-class DTC (steal from these).** Any category. Brands with genuinely
  excellent product pages and checkout. This is where ideas that beat the category come
  from — copying tier 1 alone caps us at "slightly better than mediocre".

---

## Scope — every page type, every element

### Pages
Homepage · Collection · Product (single) · Product (bundle) · Cart & drawer · Checkout ·
Shop/all · About · Contact · FAQ · Policy pages · Blog index & article · Search results ·
404 · Every email-capture point.

### Elements inside a product page (the highest-value page)
Gallery · title · price & savings display · variant/size selector · Add to Cart · trust
badges · delivery promise · returns promise · short description · long description · specs ·
size guide · reviews · FAQ · cross-sell/upsell · sticky mobile buy bar · breadcrumbs.

**Each one gets: screenshot → scored → compared → rewritten if it loses.**

### Both viewports
**Desktop AND mobile (375px).** Mobile is where most traffic lands and this site has
*never* been checked on a phone. Where they differ, mobile wins the argument.

---

## The plan — seven phases

### Phase 0 · Set up
Confirm web access works (the previous run was blind — see `START-HERE-NEXT-BUILDER.md`).
Lock the competitor list. Agree the rubric. **Nothing else starts until this is done.**

### Phase 0.5 · Decide the position — **the phase everything else depends on**
Pick the primary position from the three candidates above (recommendation: **the 3-3-3
timeline**, with "sold by hand" as the supporting trust story). Write it as one sentence
that a stranger would understand. Every element scored later is judged on how well it
advances that sentence — not just on whether it beats a rival.
**Owner decision. Nothing else starts until it's made.**

### Phase 1 · Capture
Screenshot every page of ours and every equivalent page of each competitor, desktop and
mobile. Extract every piece of on-page copy verbatim. This is the evidence base — every
later claim must point back to a screenshot or a quote.

### Phase 2 · Does it actually work?
Functional testing, not opinion. Click every link. Submit every form. Add to cart, open the
drawer, reach checkout. Test the quiz end to end. Test the email popup. Check the cookie
banner. Record what breaks, with the steps to reproduce it.
*Also: page speed. A slow page loses more sales than bad copy — and nobody has measured it.*

### Phase 3 · Compare, element by element
Apply the rubric. Our element vs theirs, scored, with the gap named. Produce a table where
every row is one element and it's instantly visible where we lose.

### Phase 4 · Rewrite what loses
For every element scoring below a competitor: **write the replacement.** Actual copy,
actual layout change — not "consider improving." The deliverable is the new version, ready
to paste.

### Phase 5 · Prioritise
Every fix gets impact × effort, and a **"needs photos: yes/no"** flag (see the honest
constraint below). Output is a work queue in order, not a report.

### Phase 6 · Build
Execute the queue against the **draft theme only**. One change at a time. Never publish.

### Phase 7 · Verify
Re-screenshot each changed element and compare against the before shot. Confirm it renders,
on desktop and mobile, and that the fix did what it claimed. **No self-certification —
whoever built it doesn't get to be the one who signs it off.**

---

## ⚠️ The honest constraint — read this before approving

**The two biggest conversion levers in ecommerce are product imagery and social proof.**

- Every product currently has **no photograph**.
- The store has **real reviews from in-person sales** — but they're only on 8 products, and
  they aren't yet shown as a proper review system.

No amount of copywriting beats a good photograph of the product in a real home. So the
audit must split every finding into:

- **Fixable now** — copy, layout, structure, trust, friction, speed, functionality
- **Needs photography first** — anything where the honest answer is "the picture is the fix"

Expect the second list to contain the single highest-impact items. That is not a reason to
skip the audit — it's a reason to run both tracks in parallel: the builder fixes everything
in list one while the owner shoots list two.

**A second honest note:** with no live traffic yet, this audit is *heuristic* — based on
established conversion principles and competitor comparison, not on your own data. It will
be right about most things and wrong about some. Once traffic is running, real behaviour
beats every opinion in this document, including mine.

---

## What you hadn't accounted for (add these)

1. **Page speed.** Measure it. A three-second delay costs more conversions than any headline.
2. **The checkout itself.** Highest drop-off point in any store. Check guest checkout is on,
   express payment buttons (Shop Pay / Apple Pay / Google Pay) are enabled, and that the
   free-delivery threshold isn't broken by the WELCOME10 discount.
3. **Post-purchase.** Order confirmation and shipping emails are part of the experience and
   drive repeat business — the cheapest revenue there is.
4. **Search and 404.** Both are pages real customers hit, and both are usually ignored.
5. **Don't only copy tier-1 rivals.** They're beatable *because* they're mediocre. Bring in
   best-in-class references or you'll cap yourself at "slightly better than average."
6. **Accessibility.** Contrast, tap-target size, keyboard use. It's also SEO and it's law.
7. **A baseline.** Save the "before" screenshots. Without them you can't prove anything
   improved, and in six months nobody will remember what it looked like.
8. **Don't rewrite the good stuff.** The product copy is the strongest asset in this project.
   The audit's job is to find what's *missing or misplaced*, not to churn what already works.

---

## What only you can do

| | Why I can't |
|---|---|
| **Photograph the products** | I don't have hands or a camera |
| **Decide brand direction** where the audit finds a positioning choice | Your brand, your call |
| **Publish the theme** | Deliberately your click, always |
| **Anything needing Shopify Settings** (checkout config, shipping rates, apps) | Screens I'm locked out of |

Everything else — every rewrite, every fix, every test — is mine.

---

## Sign-off

**Decisions already made (override any of them if you disagree):**
- Competitor list — set, three tiers, named above
- Rubric — set: clarity, motivation, trust, friction, relevance, scored 1–5
- Scope — set: every page type, every PDP element, desktop + mobile
- Phase order — set, with Phase 0.5 (positioning) inserted before any auditing

**Phase 0.5 — DECIDED.** The primary position is the **3-3-3 timeline**, supported by the
sold-by-hand proof. Written up in `POSITIONING.md`. Every element scored in Phase 3 is
judged against that sentence, not only against a rival's version of the same element.

Approved. `START-HERE-NEXT-BUILDER.md` points here. Execution begins at Phase 1.
