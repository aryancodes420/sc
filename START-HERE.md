> # ⛔ SUPERSEDED — do not follow this file
>
> This is the **25 July 2026** brief. It is kept for history only.
>
> **Two things in here are now WRONG and will cause real damage:**
> * It tells you to deploy to theme **`193158119707`** — that theme is **ABANDONED**.
>   The live deploy target is **`193438056731`**.
> * It says the CRO wave 2 files are undeployed. **They were deployed on 2026-07-25** and
>   wired up on 2026-07-27.
>
> **👉 Go to `START-HERE-NEXT-BUILDER.md` instead.** Then `STATUS.md`.

---

# START HERE — morning of 25 July 2026

Everything from the overnight session. Read this page, then do the five things in §2.

---

## 1. The headline

**You were aiming at the wrong number, and the new number is much better.**

At your old ~£25 average order, £100k profit needed **45 orders a day**. At your new
bundle ladder it needs about **7 orders a day** — roughly **2,600 orders and £209k
revenue** across the year.

The model says two things decide whether you get there, and **ad budget is not one of
them**:

| Lever | Effect |
|---|---|
| **AOV £60 → £80** | removes ~900 orders/year from the target |
| **Owned traffic 30% → 65%** | removes another ~560 |
| **Doubling ad spend** | removes none — ROAS saturates around £6–8k/month |

Everything built last night points at those two levers.

**Honest verdict on the timing:** £100k *profit* inside 12 months is at the top edge
of what the model produces — the stretch case reaches ~£70k, because you launch in
August with no audience and only catch part of the 2026 fireworks spike. Realistic
year one is **£35–70k profit on £130–270k revenue**, hitting a **£100k+ run-rate by
month 12**, with year two clearing it comfortably. Bonfire Night 2026 is the
rehearsal; Bonfire Night 2027 is the payday. The full reasoning is in
`growth/GROWTH-PLAN.md` §4.

---

## 2. Do these five things today

1. **Email CJ.** The exact message is in `growth/OPS-RISK-AND-MEASUREMENT.md` §1.
   Three questions: which SKUs are in the GB warehouse, do bundles ship as one parcel
   or several, and what's the latest dispatch for 3 November delivery.
   **The parcel answer alone is worth £14–28k a year.**
2. **Pull the supplier photos.** Still the #1 blocker to publishing. Nothing else
   moves until products have images.
3. **Deploy the theme changes** — see §4 below. ~10 minutes.
4. **Install Judge.me.** Free plan. Reviews take weeks to accumulate and you need
   them before October.
5. **Put the four dates in your calendar:** 15 Aug publish · 29 Sep campaign starts ·
   **15 Oct China cut-off** · **24 Oct GB cut-off** · 5 Nov.

---

## 3. What was built last night

### `growth/` — the plan
| File | What it is |
|---|---|
| `GROWTH-PLAN.md` | The £100k model. Unit economics for all 24 SKUs, the £14–28k bundle parcel trap, three 12-month scenarios, the honest verdict, and the five numbers to check every Monday. |
| `dog-nook-model.xlsx` | Live spreadsheet. Yellow cells are inputs — change AOV, margin, ROAS and watch the orders/day target move. Sheet 3 is the £100k solver. |
| `model.py` | The simulation itself, if you ever want to re-run it. |
| `marketing/LAUNCH-KIT.md` | Meta + TikTok ad angles with full scripts, a 30-day content calendar, five complete email flows written out, and the week-by-week launch sequence. |
| `content/SEO-PLAN-AND-ARTICLES.md` | Keyword map plus **five complete, publish-ready articles** (~6,000 words). Publish in August — SEO takes 8–12 weeks and that's what makes them earn in October. |
| `OPS-RISK-AND-MEASUREMENT.md` | The CJ email, Bonfire Night cut-off maths, six customer-service macros in your voice, a ten-item risk register, the analytics install list, and the first-100-orders runbook. |

### `dog-nook-theme/` — the site

**Four real bugs fixed:**
- PDP thumbnails never actually changed the main image (it renders with a `srcset`,
  so the old code setting only `src` was ignored by the browser)
- The collections index silently ignored your curated list and always showed
  everything (`.count` isn't a Liquid property; it's `.size`)
- The featured bundle's price lookup returned nothing and quietly fell back to
  hardcoded prices instead of live ones
- The PDP short description was gated on the wrong field and could emit an empty tag

**New, aimed at the two levers:**
- **Bundle upsell on every single-product PDP** — "this is part of the Settle-In
  Bundle, here's what you'd save". Savings come from the bundle's real compare-at
  price, never invented. *(AOV)*
- **"Find your dog's calm kit" quiz** — three steps, recommends a kit, captures the
  email. Email step is skippable. *(AOV + owned traffic)*
- **PDP spec block, size guide and an honest "not ideal for"** — size doubt is a
  top cause of both abandoned carts and returns
- **Product/Offer/Article structured data** — free rich results in Google. Star
  ratings only ever emitted when real reviews exist.
- **Bonfire Night countdown** driven by a *real* dispatch cut-off, which flips itself
  to an honest "this will arrive after the 5th" message once the date passes

---

## 4. Deploying the theme changes

The code is committed on `claude/dog-nook-files-review-6w9kwr`. It is **not yet on the
draft theme** — I ran out of session capacity before finishing the upload, and a
half-finished upload would have broken the draft (the head snippet references the new
snippets, so they all have to land together).

**Easiest route — Shopify CLI, ~10 minutes:**
```bash
git checkout claude/dog-nook-files-review-6w9kwr
cd dog-nook-theme
# copy into your local Horizon theme checkout, then:
shopify theme push --theme 193158119707   # the DRAFT, not the live one
```

**Or ask the next Claude session:** "deploy the CRO wave 2 files to the draft theme."
The file list and the order they must go in is in `HANDOFF.md`. It's one pass.

**⚠️ Deploy order matters:** snippets first, then assets, then sections, then
`dog-nook-head.liquid` **last**. Head references the new snippets, so if it lands
first the theme errors until the rest arrive.

**After deploying**, in the theme editor:
- Add **TDN Calm-kit quiz** to the homepage, and point each answer at a product
- Add **TDN Delivery countdown** — and set the cut-off from CJ's real transit times,
  not the placeholder
- Set `custom.bundle_handle` on each single product to its bundle's handle, or the
  upsell won't render

---

## 5. Still open

- **Product photos** — you
- **Real CJ landed costs** — every profit figure is an estimate until these land
- **The theme deploy** — §4
- **Nothing is visually verified.** The storefront is firewalled from my environment,
  so I could not click through the preview. Check the PDP gallery, the quiz and the
  countdown on the draft before publishing.
- **The trader address in the footer is your home address.** Fine legally, your call
  whether to swap it for a virtual office before going live.

---

## 6. One thing I'd push back on

You said to use urgency, countdowns and discounts aggressively. I built all three —
but tied to real deadlines and real savings, not invented ones.

That isn't caution, it's the better play. You have a genuinely hard deadline (order by
24 October or it misses the 5th), genuine savings (the kits really are cheaper than
buying separately), and a genuinely scarce window. Fake versions of those would put
your Meta account and your CMA compliance at risk under DMCC 2024 — and losing the ad
account in October costs you the entire season.

The real deadline converts harder anyway. Nobody argues with a date the calendar sets.
