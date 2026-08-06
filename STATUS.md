# 🐾 THE DOG NOOK — STATUS

> **This file is the single source of truth.** Every Claude chat must read this FIRST
> and update it before finishing. If this file and your memory disagree, **this file wins.**
>
> **Last updated:** 2026-08-05

---

## 🚦 Can I launch today?

**No — blocked on ONE thing: product photography.**
Everything else is built, priced, wired and verified. Zero of the real products have images.

---

## ✅ DONE (verified, don't redo)

| Area | State |
|---|---|
| **Catalogue** | 9 products sellable now + 2 live bundles. All priced. All wired. |
| **Bundles** | First Days Kit £34.99 · Settle-In £64.99 (live) · 3 premium bundles built (draft) |
| **Bundle upsell (AOV)** | `custom.bundle_handle` set — mats/feeder → First Days, bed → Settle-In |
| **Calm-kit quiz** | On homepage, 5 answers → real active products |
| **Bonfire countdown** | Built, cutoff 15 Oct (China/CJ confirmed), **disabled** until fireworks SKUs live |
| **Legal pages** | Shipping, refunds, terms, cookie, privacy — real content, UK-compliant |
| **Footer / nav** | Correct links, real trader identity |
| **FAQs** | Set on 20+ products incl. all bundles |
| **Design/theme** | Full custom theme built on draft `193438056731` |

---

## ✅ REVIEWS — RESOLVED, DO NOT "FIX" (owner confirmed 2026-08-05)

**The reviews on 8 products are GENUINE.** The owner sold these products **in person /
by hand** under The Dog Nook before the Shopify store opened, and collected the reviews
from those real customers. More are coming from the same channel.

⚠️ **Do NOT delete them.** The 2026-08-05 recon workflow flagged them as fabricated
because the Shopify store shows zero orders — that inference was WRONG, because the
sales happened offline. Any future audit will likely re-raise this; the answer is
recorded here so nobody deletes real customer proof.

`verified: false` in the metafield is **correct and deliberate** — they are genuine but
not Shopify-verified purchases.

**Two real follow-ups remain (wording + evidence, not deletion):**
1. The PDP reportedly renders "Based on 10 **verified** reviews". The data says
   `verified: false`. Align the wording (e.g. "from 10 customers" / "collected in
   person") so the page doesn't overclaim. ← Claude can fix.
2. Keep a simple private record (who, when, where sold) so the reviews can be evidenced
   if ever challenged. Under DMCC 2024 the burden is on the trader to show reviews are
   genuine. ← owner, 10 minutes.

---

## 🚨 STILL OPEN — LIVE COMPLIANCE RISK (verified 2026-08-05)

**Bundle pages show wrong contents + a false saving.** `templates/product.bundle.json`
hardcodes First Days Kit's contents/totals; 6 products share it. The live Settle-In
£64.99 page claims contents cost £49.97 (truth: £72.97) and badges "SAVE £15"
(truth: £7.98) — i.e. it reads as costing *more* than its parts. This one is real and
unaffected by the reviews correction.

---

## ⛔ BLOCKED — owner action only (no agent can do these)

1. **PRODUCT PHOTOS** ← the launch gate. Everything waits on this.
2. **Source the draft range** (~12 products) — real CJ costs + specs before activating.
3. **Email CJ** — transit times + "do bundles ship as one parcel?" (worth £14–28k/yr).
4. **Install Judge.me** — reviews take weeks to accumulate; needed before October.
5. **Upload the new logo** — files prepared; upload via theme editor (Header + Favicon).
6. **Publish the theme** — LAST step, after 1–5 + a click-through.

---

## ⚠️ KNOWN TRAPS (read before touching anything)

- **The live site is NOT what we've been building.** Live = theme `193140818203` (old, 15 Jul).
  All new work is on UNPUBLISHED draft `193438056731`. Publishing is the owner's click.
- **Never deploy to `193140818203`** (live) or `193158119707` (abandoned).
- **The storefront is firewalled from Claude.** No agent can screenshot or visually verify.
  Anything claiming "it looks perfect" is guessing. Owner does visual QA.
- **Asset drift unresolved:** `dog-nook.js` + `dog-nook-cro.css` differ across git and both
  drafts; git matches neither. Don't "fix" without deciding which is canonical.
- **One chat at a time on the catalogue.** Git branches do NOT protect the Shopify store —
  there is one shared store. Two chats editing products = collisions (happened 2026-07-20).
- **Honesty rules bind everyone:** no fake reviews/ratings/urgency, no medical claims,
  savings maths must be true vs real component prices. UK DMCC 2024 / CMA.

---

## 🎯 THE GOAL

£100k profit run-rate. Two levers decide it (ad budget does not):
- **AOV £60 → £80** — hence the bundle ladder (First Days → Settle-In → Complete Calm)
- **Owned traffic 30% → 65%** — email capture + SEO

Bonfire Night 2026 = rehearsal. 2027 = payday.

---

## 📍 WHERE THINGS LIVE

- **Branch:** `claude/cro-wave-2-deploy-o7a1z1` (current) · `main` = project base
- **Deep detail:** `HANDOFF.md` (§2 themes, §3 deploy recipe, §10 changelog)
- **Change log:** `audit/implementation-notes/live-catalog-changes.md`
- **Growth model:** `growth/GROWTH-PLAN.md`
- **Multi-agent system:** `.claude/workflows/` — run with `/workflows` or ask Claude
- **Preview:** `https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731`

---

## 📋 FINDINGS QUEUE

Output from the recon workflow lands in `audit/findings/`. Newest first.

- **2026-08-05** — `audit/findings/2026-08-05-recon-report.md` (9-agent recon: compliance, pricing, competitors, ~25 unblocked fixes)
