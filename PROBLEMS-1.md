# PROBLEMS 1 — the working defect list

> **Status: LOGGED, NOT STARTED.** Owner named this set "Problems 1" on 2026-08-12 and
> asked to tackle it soon. **P1-12 added 2026-08-12** (bundle false-savings, deferred by the
> owner to after the audit). Nothing here has been fixed yet. Nothing was changed in the
> theme, the store, or the catalogue when this list was made.
>
> Source: a full read of `dog-nook-theme/` (43 files), `audit/` (24 docs), `HANDOFF.md`
> and `BUILDER-COORDINATION.md` on 2026-08-12, branch `claude/dog-nook-theme-review-pbwho6`
> (identical to `main` — no divergence).
>
> **Tick items as they close. Log each fix in `HANDOFF.md` §10 as usual.**

---

## The problems

Ordered by what they'd cost if left alone, not by effort.

### P1-1 · Session B's live CSS exists nowhere in git ⚠️ LANDMINE
`BUILDER-COORDINATION.md:78-80` records that Session B added theme CSS as an inline
`<style>` inside `dog-nook-head` (full-width filter chips, shrunk sort control, denser
product cards, branded placeholder wordmark for imageless products, a card-split bug fix).
**`snippets/dog-nook-head.liquid` in this repo contains no `<style>` block.** Same for
`WELCOME10` and the Settle-In Bundle — they appear only in that coordination doc.

**Consequence:** anyone following the standard deploy recipe and pushing
`dog-nook-head.liquid` from git to the draft theme **silently wipes B's live CSS.**

**Fix:** read the live `dog-nook-head.liquid` off the theme and merge B's block into git
*before any further deploy of that file*. If the GraphQL read is blocked, the owner can
paste the live file instead.
- [ ] Resolved

### P1-2 · The theme merchandises the wrong bundle
The owner's HYBRID decision (`BUILDER-COORDINATION.md:15-31`) names B's **Settle-In
Bundle (£64.99, ACTIVE)** as the live bundle. But the hero button, the category-bar pill,
the featured-bundle section and `product.bundle.json` all still point at **The New Rescue
Bundle (£34.99)**. The storefront doesn't reflect the decision.
- Files: `templates/index.json:12, 29, 56-66`, `templates/product.bundle.json`
- **Needs an owner call first** — see "Decisions required" below.
- [ ] Resolved

### P1-3 · The bundle price fix is logged in three contradictory states
- `implementation-notes/applied-changes.md:62-66` — "Still open… blocked… awaiting the
  owner's choice" between raising the Lick Mat to £11.99 or dropping compare-at to £47.97
- `implementation-notes/live-catalog-changes.md:82-83` — option A already executed
- `data/live-store-facts.md:21` — still lists £9.99
- The theme (`templates/product.bundle.json:19`) shows £11.99

**Fix:** one live check, then make all four agree and delete the stale block.
- [ ] Resolved

### P1-4 · Phase 0 — the free wins — was skipped
`audit/15-product-expansion-action-plan.md:35-43` says do these **first**: un-archive the
**Wall-Mount Lick Pad** (`10311325942043`, £13.99) and **Travel Seatbelt Harness**
(`10311322468635`, £15.99). Zero sourcing cost, +25% range, and it un-strands the
1-product Travel & Outdoor collection.

`live-catalog-changes.md` logs Phases 1, 2 and 3 — **no Phase 0 entry anywhere.** The £0
work was skipped while the work that needs sourcing money got done.
⚠️ Harness is a safety product — confirm crash-test honesty before promoting it hard.
- [ ] Resolved

### P1-5 · Two GraphQL ops still pending
`implementation-notes/PENDING-graphql-ops.md` — Fireworks Kit `templateSuffix=bundle`
(without it, it renders on the default template, not the bundle layout) plus 4
`custom.faq` metafields (Snood, Wobble, First Nights, Fireworks Kit). One idempotent call;
the mutation is written out verbatim in that file. Delete the file once it runs.
- [ ] Resolved

### P1-6 · `BUILDER-COORDINATION.md` cites a file that doesn't exist
Line 20 references `audit/15-conversion-and-competitor-research.md`. It isn't in the repo.
The margin analysis it leans on to justify keeping B's bundle is therefore unverifiable
here. Actual file is `audit/15-product-expansion-action-plan.md`.
- [ ] Resolved

### P1-7 · `HANDOFF.md` is stale (stamped 2026-07-16)
- §6 lists 11 products; the store now has ~18 with the drafts
- §2 and §9 say develop on `claude/hello-erxv6t`; current branch is
  `claude/dog-nook-theme-review-pbwho6`
- §7 "Current state" predates both the audit deploys and the range expansion
- Its own §-9 protocol says to keep it current — that hasn't happened since

Also: `BUILDER-COORDINATION.md`'s open item "get this doc onto `main`" **is already done**
(this branch and `main` are identical and the doc is present) but is still unticked.
- [ ] Resolved

### P1-8 · "A small UK team" vs a sole trader
- `templates/index.json:49` and `templates/page.about.json:14` — "a small UK team"
- `sections/dog-nook-faq.liquid:39` preset — "run by one person"
- Footer — sole trader, Aryan Sarna

For a brand whose entire edge is honesty, and given the audit flagged exactly this class
of claim (`audit/07`, `audit/08` C2), "team" is the odd one out.
- [ ] Resolved

### P1-9 · Two surviving vague-delivery defaults
- `sections/dog-nook-announcement.liquid:20` defaults to "Fast dispatch".
  ⚠️ **Correction (2026-08-12):** I originally logged this as inert because the section
  isn't in `index.json`. **It is not inert — it renders on every page**, confirmed by
  screenshot on draft `193438056731`: the announcement bar reads
  *"Free UK delivery over £35 · Fast dispatch · Made for anxious & rescue dogs"*.
  It's in the header group, not the index template. Promote this: it's a live vague
  delivery claim on every page, not a dormant default.
- `templates/product.bundle.json:13` carries `ticks: "Dispatched fast · …"`, and
  `sections/dog-nook-bundle.liquid:108` defines that `ticks` setting but **never renders
  it** — dead setting, delete it

Everything else was correctly preset-aligned in the P0-3 pass so old claims can't come back.
- [ ] Resolved

### P1-10 · Open audit items nobody closed
- Category bar still above the hero — `templates/index.json:100` (audit `04`, one line)
- "Real reviews, coming soon" still in the prime social-proof slot — `index.json:86`.
  Replacement copy is **already written** at
  `audit/proposed-copy/positioning-and-homepage-copy.md:44-49` (P1-5)
- No Product/Offer JSON-LD anywhere (P2-4) — AggregateRating must stay out until real
- Gallery inline `onclick` swaps `src` only, not `srcset` —
  `sections/dog-nook-product.liquid:40` (P3-2)
- OG image declares 1100×1100 while requesting `width=1200` —
  `snippets/dog-nook-head.liquid:22-26` (P3-3)
- "Add to Cart" → "Add to basket" for UK consistency (P2-5)
- PDP structured spec block (P2-1) — scaffolding is safe to ship empty; values need real specs
- [ ] Resolved

### P1-11 · Three things found on this read, not in the audit
- **Fake sort control.** `sections/dog-nook-shop.liquid:27` renders "Sort: Best selling ▾"
  as a plain `<span>`. It looks interactive and does nothing. Wire it or remove it.
- **The popup promises a code the theme can't deliver.**
  `snippets/dog-nook-email-popup.liquid` promises "a code for your first order"; no code
  exists in the theme. Delivery depends entirely on a Shopify automation plus `WELCOME10`,
  which lives only in the live store. If that chain is broken, visitors hand over an email
  and get nothing.
- **Consent can be set once and never changed.** The banner shows on first visit only
  (`assets/dog-nook.js:83-99`) with no way to reopen it. A real consent implementation
  needs a persistent "Cookie settings" entry point.
- [ ] Resolved

### P1-12 · Bundle pages state a saving that isn't true 🔴 COMPLIANCE
**Added 2026-08-12. Deferred by the owner to after the audit.** This is TODO 1 from
`START-HERE-NEXT-BUILDER.md` — parked here so it isn't lost while the audit runs.

**Verified by loading the page**, not from source. Screenshots taken on draft
`193438056731` (Shopify's own preview bar visible in-shot). Both bundle pages render
pixel-identically apart from the price, which proves one hardcoded template serves both.

`templates/product.bundle.json` hardcodes **The First Days Kit's** contents and totals into
section settings, and **6 products share that template**. Every other bundle wears First
Days Kit's numbers.

**What `/products/the-settle-in-bundle` (£64.99) actually renders today:**

| On the page | Truth |
|---|---|
| "WHAT'S INSIDE — Lick Mat, Snuffle Mat, Slow-Feeder Bowl" | It's **Donut Bed + Lick Mat + Snuffle Mat**. No slow-feeder. |
| "Bought separately **£49.97**" | **£72.97** |
| Badge "BEST VALUE · **SAVE £15**" | **£7.98** |
| "You save £7.98" (price chip) | correct — so the page contradicts *itself* |

Read literally, the page says the bundle costs more than its parts. False savings claim +
misdescription of goods (DMCC 2024 / CMA). The 4 premium kits inherit the same panel — the
£139.99 Complete Calm System would also claim its parts cost £49.97.

**True figures, pulled live from the Admin API 2026-08-12:**
Donut Bed **S £29.99 · M £37.99 · L £44.99** · Lick Mat £11.99 · Snuffle Mat £22.99 ·
Slow-Feeder £14.99

| Bundle | Contents | Separately | Price | True saving |
|---|---|---|---|---|
| First Days Kit (`the-new-rescue-bundle-1`) | Lick + Snuffle + Slow-Feeder | £49.97 | £34.99 | **£14.98** |
| Settle-In (`the-settle-in-bundle`) | Bed (M £37.99) + Lick + Snuffle | £72.97 | £64.99 | **£7.98** |

⚠️ **`START-HERE-NEXT-BUILDER.md`'s own arithmetic is wrong** — it writes £72.97 as
"£44.99 + £11.99 + £22.99". £44.99 is the **Large** bed and that sums to **£79.97**. The
£72.97 total is right; it uses the **Medium** at £37.99. Fix that line too, or the next
builder publishes a fresh false number from it.

**Also:** the First Days Kit badge says "SAVE £15" while its own chip says "You save
£14.98" — same page, two numbers. The homepage already says £14.98. Rounded-up savings are
exactly what the CMA challenges.

**Fix options** (from START-HERE): blank `separately_total` + `badge` (~10 min, kills the
exposure immediately), or drive contents/totals from per-product metafields so all 6
bundles show their own real numbers (~1–2 h). Every total computed from real component
prices — never rounded.

**Blocked on:** Shopify MCP `graphql_query` + `graphql_mutation` approval. Theme files are
unreachable through the built-in tools; only the raw Admin API can read/write them.

**Verify after fixing:** `checksumMd5`, **then reload both pages** and confirm the numbers.
Don't break First Days Kit — its hardcoded numbers are the ones that are currently right.
- [ ] Resolved

---

## Who does what

### Claude can do unaided (git-only, certain)
P1-6, P1-7, P1-8, P1-9, P1-10, P1-11 — all theme-source and doc edits. Plus the doc half
of P1-3.

### Claude can probably do (needs the Shopify MCP; it disconnects constantly — just retry)
As of 2026-08-12 the Shopify server is reconnected and exposes `graphql_mutation`, so the
deploy path is likely open again — **untested**. Historically it has been approval-gated.
- P1-1 (read live theme file), P1-4 (un-archive + re-collection), P1-5 (the two ops)
- Deploying any of the above to the **draft** theme (`193158119707`, BASE64, verify
  `checksumMd5`, small files only)
- Loading the 8 per-product `custom.faq` metafields already drafted in
  `audit/proposed-copy/product-faqs-metafield.md`
- `custom.delivery_line` on the Car Boot Liner so its faster UK promise shows on its PDP
- Deliberate manual sort order per collection (all on BEST_SELLING with zero sales history
  → currently arbitrary)
- Donut Bed S/M/L variants — spec ready at `live-catalog-changes.md:99-103`

### Only the owner can do
- **Real product photography** — still the #1 conversion blocker; every product has zero
  images. Also the hero shot, one in-scale shot per product, collection images, and a real
  branded 1200×630 OG image
- **Publish the draft theme** (blocked for the MCP by design)
- **Install Judge.me** + turn on review-request emails (`dog-nook-theme/REVIEWS-SETUP.md`);
  real reviews then need real buyers and time
- Confirm CJ landed costs, fill every `{VERIFY}` spec, confirm **neutral packaging**,
  verify harness safety certification
- Confirm which pixels are actually installed (Settings → Customer events) — closes
  audit L4 properly
- Create the social profiles, or tell me to strip the placeholder links
  (`store-config/footer-group.json:331-335`)
- **Visual QA on the preview at 390 / 768 / 1440** + a Lighthouse run — this environment is
  firewalled from the storefront, so no session can do it
- Confirm each policy page is real content, not an unedited template
- Homepage social `og:description` (Online Store → Preferences); favicon upload
- Untick "track quantity" per product; add the CJ SKUs for order routing
- Decide home address vs a registered/virtual address **before publishing** — the current
  footer carries the owner's home address
- Samples order (~£61)

### Decisions required before Claude touches them
- **Which bundle is the hero** — Settle-In (£64.99, live, ~72% margin) or New Rescue
  (£34.99, theme-wired)? Drives P1-2.
- Setting any DRAFT product ACTIVE (gated on sourcing + `{VERIFY}` + photos)
- Any price change or bundle re-costing
- **First Nights Bundle** — relaunch as a premium night/separation tier once the Heartbeat
  Companion is sourced, or retire it
- Travel & Outdoor (1 product) — merge into "Out & About" or leave until Phase 0 lands

---

## Ground rules that still bind all of this
From `HANDOFF.md` §3 and §9, unchanged:
1. **Two-step deploy, always** — commit + push **and** `themeFilesUpsert` to the **draft**
   theme. Git and the live theme are not auto-synced.
2. **Deploy-size trap** — keep every deployed file ≤ ~7 KB raw. New CSS goes in
   `dog-nook-cro.css`, never the large `dog-nook.css`. Verify `checksumMd5` every time.
3. **Link trap** — any new `<a>`-based component must join the `:not()` exclusion list at
   `assets/dog-nook.css:50`, or its text renders sage-on-sage and disappears.
4. **Never fabricate** reviews, ratings, testimonials, urgency or brand claims.
5. **Never publish the theme** — owner's action.
6. Be honest in status reports: say what is unverified, skipped or unproven.
