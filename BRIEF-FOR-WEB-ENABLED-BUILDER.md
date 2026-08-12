# Brief — for a builder in a WEB-ENABLED environment

> **Why you exist:** the 2026-08-05 recon ran in an environment with a locked-down network
> policy ("trusted network access"). Web *search* worked; opening web *pages* did not, and
> the storefront was unreachable (`CONNECT tunnel failed, 403`). So a set of questions
> could not be answered. **You are here to answer exactly those questions — nothing else.**
>
> **Before you start:** read `STATUS.md` (source of truth), then
> `audit/findings/2026-08-05-recon-report.md` (what was already found).
> **Do not redo work that is already done.** Duplicated research costs the owner money.

---

## 0. First — confirm you can actually do this job

Run these. If any fail, **stop and tell the owner** you're in the wrong environment.

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://kkeqih-jm.myshopify.com/
curl -sS -o /dev/null -w "%{http_code}\n" https://www.thundershirt.co.uk/
```

Expect `200`. If you get `000` / `403`, the environment is still restricted.

**Never claim you viewed a page you could not load.** The previous session's biggest
risk was exactly this — a prior handoff asserted "there is nothing wrong with the files"
when nothing had ever reached the validator. Assertion without observation is the failure
mode here.

---

## 1. Job one — actually look at the site (highest value)

The whole theme has been reasoned about from source, never seen rendered. Load the
**unpublished draft preview** and confirm or kill each item below.

**Preview:** `https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731`
(store has no password; the preview cookie sticks for the session)

Screenshot each and record pass/fail:

| # | Claim to verify | Where |
|---|---|---|
| 1 | Homepage "Find what your dog needs" cards link to `#` / nowhere | homepage |
| 2 | Bed size options render as 3 identical grey squares (not labelled) | `/products/calming-donut-bed-1` |
| 3 | Add to Cart redirects off-page instead of opening the drawer | any PDP |
| 4 | The free-delivery progress bar never appears | cart drawer |
| 5 | Email popup reloads the page and never shows the WELCOME10 code | homepage, wait 12s |
| 6 | Quiz submits but silently loses the email | homepage quiz, step 3 |
| 7 | Bundle pages omit description / FAQ / specs / cross-sell | `/products/the-settle-in-bundle` |
| 8 | Cookie banner appears at all (it's the one snippet not auto-rendered) | any page, fresh session |
| 9 | Bundle page shows "parts cost £49.97 / SAVE £15" (both wrong) | `/products/the-settle-in-bundle` |
| 10 | PDP says "verified reviews" while data says `verified: false` | any PDP with reviews |

Also do a **mobile viewport pass** (375px) — nothing has ever been checked on a phone,
and that's where most of the traffic will be.

---

## 2. Job two — verify the competitor prices

The recon's price bands came from **search snippets, not live pages**. Treat them as
±10% and unverified. Open the actual pages and record real prices + URLs + date.

Priority order (the two that a real decision rests on are first):

1. **UK cave / hooded dog beds** — Collared Creatures, Snoozer, Charley Chau.
   *No price was retrievable.* The report's "The Deep Nook could go to £99.99" is
   **inference, not evidence.** Verify before the owner changes anything.
2. **calmingdogbeds.co.uk Trustpilot** — the report cites four repeating complaint themes
   (ships from abroad, refund friction, wrong size, fabric shedding). Read the actual
   reviews. These are the basis of a proposed objection-handling block, so they must be real.
3. Anxiety/compression coats — Thundershirt UK current pricing.
4. Snuffle mats by size — Blitz and similar (size-based pricing ladder).
5. Heartbeat comfort toys — Snuggle Puppy UK vs unbranded.
6. Multi-item calming bundles — does anyone in the UK bundle like this, and at what price?

For each: **price, URL, date checked, and what's included.** Not a summary — the numbers.

---

## 3. Job three — the positioning bet

The recon's strongest idea is that **the "3-3-3 rule"** (3 days decompress / 3 weeks settle
/ 3 months at home) is taught by every UK rescue, ranked for only by charities, and
**claimed by no commercial brand** — and maps 1:1 onto the bundle ladder.

**Verify it's actually open:**
- Search it properly. Is any retailer using it commercially in the UK?
- Who ranks page 1, and are they all charities?
- Is there credible criticism of the rule? (There is some — the owner should know before
  building a brand around it.)

Same for the claimed gap: competitor **My Anxious Dog** owns "anxious dog" but sells
outdoor/on-lead products. Confirm nobody owns the **indoor** problem (won't settle at
night, won't eat, paces, shadows you).

---

## 4. Rules that bind you

- **NEVER publish a theme.** Owner's click, always.
- **NEVER deploy to `193140818203`** (live) or `193158119707` (abandoned).
  Deploy target is `193438056731` only.
- **Don't touch `dog-nook.js` or `dog-nook-cro.css`** — three conflicting versions exist
  across git and both drafts; nobody has decided which is canonical (`HANDOFF.md` §2).
- **The reviews on 8 products are GENUINE** (owner sold in person before the store opened).
  A previous audit wrongly flagged them as fake. **Do not delete them.**
- **No fake reviews, ratings, urgency or scarcity. No medical/cure claims.** Savings maths
  must be true against real component prices. UK DMCC 2024 / CMA.
- **One chat at a time on the catalogue** — git branches do not protect the Shopify store.
- Log everything to `audit/implementation-notes/live-catalog-changes.md` and update
  `STATUS.md` before you finish.

---

## 5. What NOT to do

Already done — don't repeat:
- ❌ Auditing the catalogue, prices, metafields, collections (read live 2026-08-05)
- ❌ Auditing theme source for structural gaps
- ❌ General competitor research on PDP anatomy, trust signals, AOV tactics
- ❌ The bundle-savings bug — already identified, fix is queued
- ❌ Re-flagging the reviews

**Don't build anything on this pass.** Verify and report. The owner is overwhelmed by
half-finished workstreams; the value you add is *certainty*, not more code.

---

## 6. Deliverable

One file: `audit/findings/<date>-web-verified.md`

Structure it as:
1. **Confirmed** — claims that are true, with screenshots/URLs
2. **Killed** — claims that turned out false (say so plainly; this is the most valuable part)
3. **Real competitor prices** — table with URLs and date
4. **The 3-3-3 verdict** — open, or already taken?
5. **New things you saw that nobody predicted**

Then update `STATUS.md` and commit.
