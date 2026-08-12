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

## Step 2 — run the workflow

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
