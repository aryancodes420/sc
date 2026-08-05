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

_(nothing yet — first run pending)_
