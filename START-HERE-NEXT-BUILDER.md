# 👉 START HERE — next builder

**Owner's ask:** do the full job properly — look at the site, research the market, compare
the two, fix what's wrong, verify the fixes. Better than the first attempt.

**This file tells you how to beat the first attempt.** Read it, then `STATUS.md`.

---

## Step 0 — you must be in a WEB-ENABLED environment

Run this before anything else:

```bash
curl -sS -o /dev/null -w "site:%{http_code}\n" "https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731"
curl -sS -o /dev/null -w "web: %{http_code}\n" "https://www.google.com/"
```

**Both must return `200`.**

If you get `000` or `403`, you are in the same blind environment the first run was in.
**Stop and tell the owner.** Do not proceed — a blind run produces confident guesses about
layout, which is exactly what went wrong last time. The owner needs to create an
environment with a permissive network policy (Claude Code on the web → Environments → new
environment → less restricted network policy).

---

## Step 1 — read, don't redo

| Read | For |
|---|---|
| `STATUS.md` | Source of truth. If it disagrees with your memory, it wins. |
| `audit/findings/2026-08-05-recon-report.md` | Everything run #1 found. **Build on it, don't repeat it.** |
| `HANDOFF.md` §2, §3 | Theme IDs and the deploy recipe (BASE64, verify checksums) |
| `BRIEF-FOR-WEB-ENABLED-BUILDER.md` | The specific unanswered questions |

Already done — **do not spend the owner's money redoing**: catalogue/price/metafield audit,
theme source audit, general competitor research on page anatomy and AOV tactics.

---

## Step 2 — DO THESE TWO FIXES FIRST (already diagnosed, just execute)

Don't research these. They're confirmed. Fix them before you run anything else — one is a
live false claim on the owner's most valuable page.

### 🔴 TODO 1 — Bundle pages state a saving that isn't true

**File:** `dog-nook-theme/templates/product.bundle.json` (deploy to theme `193438056731`)

**The bug:** the template hardcodes **The First Days Kit's** contents and totals into
section settings, and **6 products share that one template.** So every other bundle
displays First Days Kit's numbers.

**What the live Settle-In Bundle page currently claims vs the truth:**

| Shown on page | Reality |
|---|---|
| Contents include a Slow-Feeder Bowl | It's Donut Bed + Lick Mat + Snuffle Mat — **no slow-feeder** |
| "£49.97 bought separately" | **£72.97** (£44.99 + £11.99 + £22.99 at the bundle's Medium bed) |
| Badge: "BEST VALUE · SAVE £15" | Real saving is **£7.98** |

Read literally the page says the bundle costs **more** than its parts. It is a false
savings claim + a misdescription of goods (DMCC 2024 / CMA). The four premium kits inherit
the same panel — the £139.99 Complete Calm System would also claim its parts cost £49.97.

**Fix — two options, pick based on time:**
- **Safe, ~10 min:** blank `separately_total` and `badge` in the template so nothing false
  renders. Removes the legal exposure immediately; page just shows less.
- **Proper, ~1–2 h:** drive contents + totals from per-product metafields
  (e.g. `custom.bundle_contents`, `custom.bundle_separately_total`) so each bundle shows
  its own real numbers, then set those metafields on all 6 bundles. **Every total must be
  computed from the real component prices** — never rounded up, never invented.

**Verify:** re-deploy, confirm `checksumMd5`, then **load the page** and read the numbers
back. Also check the First Days Kit still reads correctly (its own numbers are the ones
currently hardcoded, so it's the one page that's right today — don't break it).

⚠️ Also fix the rounded saving: the First Days Kit says **"You save £15"** in several
places. The true figure is **£14.98**, and the homepage already says £14.98 — so the store
contradicts itself. Rounded-up savings are exactly what the CMA challenges.

### 🟠 TODO 2 — "Verified reviews" wording overclaims

The PDP reportedly renders **"Based on 10 verified reviews"**, but the review data
correctly carries `verified: false`.

**The reviews are genuine** — the owner sold these products in person before the Shopify
store opened. `verified: false` is right, because they aren't Shopify-verified *purchases*.
**Do not delete anything.** Just align the wording so the page doesn't overclaim —
e.g. *"from 10 customers"* or *"collected in person"*, which is truer and, given this
brand's positioning, actually reads stronger.

**Confirm the wording renders as described before changing it** — this was reported from
source-reading, not observation.

---

## Step 3 — run the workflow

```
Workflow({ scriptPath: ".claude/workflows/full-cycle.js" })
```

It gates on environment, loads every page type (including mobile), researches real
competitor pages, then **attacks every finding before it reaches the owner**, and outputs
a sequenced plan rather than a dump.

`.claude/workflows/recon.js` is the older blind-mode version. Only for reference.

---

## The five things that make this better than run #1

**1. It can actually see the site.**
Run #1 never loaded a single page. About ten findings were reasoning from Liquid source
dressed up as observation. Now: load the page, quote the real text, screenshot it. If you
didn't load it, say so.

**2. Every finding gets attacked before the owner sees it.**
Run #1's headline finding was **wrong**: it declared the owner's genuine reviews fake
because Shopify showed zero orders. It never considered that the owner had sold in person
before opening the store. That nearly destroyed real customer proof.
→ Rule: any finding that accuses the owner of something must name the innocent
explanations it ruled out, and how. Unsure = not proven.

**3. The output is sequenced, not dumped.**
Run #1 handed over ~40 findings at once. The owner's literal reply was *"you're confusing
me more than helping."* A correct report that can't be acted on has failed.
→ One "do this first". Then three. Then a table. That's it.

**4. Research is scoped to live decisions.**
Run #1 benchmarked competitor pricing the owner cannot act on — the shop is pre-launch with
no photos, so repricing is premature and the numbers will be stale by the time it matters.
→ Only research what changes a decision that's actually in front of them.

**5. It fixes and verifies, it doesn't just report.**
After the plan is agreed, fix in order, deploy to the draft, verify by checksum, **and
reload the page to confirm it renders**. Run #1 could never do that last part.

**6. It splits the work definitively: yours vs mine.**
The report is organised around one question — *can Claude do this, or must the owner?*
**Default is Claude.** A task is only the owner's if it fails one of exactly five tests:
`physical-world` (needs hands or a camera) · `third-party` (someone else must reply) ·
`business-decision` (their money, brand or risk) · `admin-access` (a Shopify screen Claude
is blocked from) · `money`.
If you can't name one of those five, **it's your job — do it.** Never push work onto the
owner because it's long or boring; they are one person on a phone and you are not.
And where a task is *partly* theirs, split it explicitly: *"you take the photos → I upload,
crop, write the alt text and wire them in."*

---

## Standing rules — non-negotiable

- **Never publish a theme.** Owner's click only.
- **Deploy only to `193438056731`.** Never `193140818203` (live) or `193158119707` (dead).
- **Don't touch `dog-nook.js` / `dog-nook-cro.css`** — three conflicting versions exist,
  git matches none, nobody has decided which is canonical.
- **The reviews on 8 products are GENUINE.** Owner sold in person pre-Shopify. Do not delete.
- **No fake reviews, ratings, urgency or scarcity. No medical/cure claims.**
  The ASA treats *anxiety* as a health condition — "reduces anxiety" is not allowed;
  "for dogs who find fireworks hard" is. Savings must be true vs real component prices.
- **One chat at a time on the catalogue.** Git branches do not protect the Shopify store.
- Log to `audit/implementation-notes/live-catalog-changes.md`; update `STATUS.md` before finishing.

---

## The one thing that actually matters

**The shop is blocked on product photography.** Nothing you find changes that.

If your report doesn't help the owner get to launch, it isn't helping. Fix what's genuinely
broken, tell them plainly what only they can do, and don't add to the pile.
