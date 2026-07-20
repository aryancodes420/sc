# 🚧 Builder Coordination — READ BEFORE TOUCHING THE CATALOGUE

> **Why this exists:** on 2026-07-20 **two builder sessions worked The Dog Nook at the
> same time** and created **overlapping bundles and collections** in the one shared
> Shopify store. Git branches do **not** protect the catalogue — there is a single live
> store, so catalogue/theme edits from any session collide. This doc is the single place
> to see who's doing what and what the owner has decided. **Check it before creating or
> editing any product, collection, discount, or theme file.**
>
> **Last updated:** 2026-07-20 (hybrid decision) · by session on branch
> `claude/dog-book-product-analysis-ervhl9`

---

## ✅ Owner decision (2026-07-20) — HYBRID (supersedes the earlier "go with A" note)
After comparing both sessions' work, the owner chose a **hybrid**: keep each session's
work where it is genuinely stronger. Not "one builder wins."

- **Settle-in bundle → keep Session B's `The Settle-In Bundle` (LIVE).** B did the proper
  profit-per-order margin analysis (see `audit/15-conversion-and-competitor-research.md`)
  and B's bundle is built entirely from **in-stock** products, so it ships today at a
  known ~72% margin. **Do not rebuild it.**
- **Range expansion → keep Session A's new products + Fireworks Kit + Fireworks & Storms
  collection.** These open **new triggers B never covered** (fireworks/storms, separation/
  night, enrichment) and come with house-voice copy + per-product FAQs. Additive, no conflict.
- **Session A's `The First Nights Bundle` → PARKED (stays DRAFT).** It is essentially B's
  Settle-In with the Snuffle Mat swapped for the **unsourced** Heartbeat Companion, so it
  can't be published or costed yet. Relaunch later as a **premium night/separation tier**
  above Settle-In once the Heartbeat is sourced — or retire it.
- **Rescue collection → consolidate to ONE.** Keep B's live `Settling a New Rescue`;
  **retire A's duplicate `Rescue Essentials`** (see cleanup below).

**One-line rationale:** B = depth on the money (bundle economics, ships now); A = breadth
of range (new problems, copy/FAQ system). The only real mistake was doing them blind to
each other — hence this doc.

---

## 📋 Open items (single source of truth — update as these close)
- [ ] **Retire A's `Rescue Essentials` collection** (`527313404187`) — duplicate of B's
  live rescue collection. Owner (Admin → Collections → delete) or next builder
  (`collectionDelete`, see `PENDING-graphql-ops.md` Op 4). *Blocked for this session: no
  built-in delete tool; GraphQL route is approval-gated and failing.*
- [ ] **3 GraphQL polish ops** on A's drafts — Fireworks Kit `templateSuffix=bundle`,
  collection handle tidy, 4 `custom.faq` metafields. Ready in `PENDING-graphql-ops.md`
  (Ops 1–3). *Same approval-gate blocker.*
- [ ] **Get this doc onto `main`** so other sessions actually see it (see visibility note
  at the bottom). Needs a merge/PR — **owner's call**; not yet done.
- [ ] **Owner sourcing** before any A product goes ACTIVE: real CJ costs, fill `{VERIFY}`
  specs, add real photos. Also send real Lick/Snuffle mat landed costs so B can lock the
  bundle margin figures exactly.
- [ ] **First Nights Bundle** stays parked (DRAFT) until the Heartbeat Companion is
  sourced — then relaunch as a premium tier, or retire.

---

## Who built what (2026-07-20 catalogue snapshot)

### Session A — `claude/dog-book-product-analysis-ervhl9` (product expansion, Phases 1–3)
All created **DRAFT** on purpose (unsourced products; owner activates after sourcing +
`{VERIFY}` specs + real photos). See `audit/15-product-expansion-action-plan.md` and
`audit/implementation-notes/live-catalog-changes.md`.
- **Products (DRAFT) — KEEP:** Heartbeat Companion `10328011571483`, Calming Coat
  `10328011702555`, Snuffle Ball `10328011833627`, Calming Snood `10328015339803`,
  Wobble Feeder `10328015536411`.
- **Bundles (DRAFT):** The Fireworks Kit `10328016453915` (£39.99) — **KEEP**;
  The First Nights Bundle `10328016290075` (£54.99–67.99, S/M/L) — **PARKED**.
- **Collections:** Fireworks & Storms `527313371419` — **KEEP** (unique, no conflict);
  Rescue Essentials `527313404187` — **RETIRE** (duplicate of B's).

### Session B — the other builder (AOV / theme / promo)
- **The Settle-In Bundle** `10328065114395` — £64.99 (compare £72.97), **ACTIVE**,
  Bed(M)+Lick+Snuffle, ~72% margin / ~£46.55 profit per order. **KEEP as the live bundle.**
- **"Settling a New Rescue"** collection `527315861787` — **PUBLISHED**, 5 products.
  **KEEP as the single rescue collection.**
- **`WELCOME10`** discount (10% off) — live, wired into the email popup; their duplicate
  `SETTLE10` was deleted. **KEEP, no conflict.**
- **Theme CSS** (`dog-nook-head` inline `<style>`): full-width filter chips, shrunk sort
  control, denser product cards, branded placeholder wordmark for imageless products,
  card-split bug fix. **KEEP, no conflict.**

---

## Reconciliation — final state
| Area | Winner (keep) | Retire / park | Status |
|---|---|---|---|
| Settle-in bundle | **B — Settle-In Bundle** (live) | A — First Nights → **PARK as draft** | First Nights left DRAFT; no action needed now |
| Rescue collection | **B — Settling a New Rescue** (live) | A — Rescue Essentials → **RETIRE** | ⏳ cleanup below |
| Fireworks/separation/enrichment | **A — Fireworks Kit + new products + Fireworks & Storms** | — | Drafts, owner sources later |

### ⏳ Cleanup still to do
1. **Retire A's `Rescue Essentials` collection** (`gid://shopify/Collection/527313404187`)
   so there aren't two rescue collections. No built-in tool deletes/unpublishes a
   collection, so either:
   - **Owner (30 sec):** Admin → Products → Collections → *Rescue Essentials* → Delete; or
   - **Next builder:** run `collectionDelete(input:{id:"gid://shopify/Collection/527313404187"})`
     via `graphql_mutation` (see `audit/implementation-notes/PENDING-graphql-ops.md`).
   A's new draft products stay discoverable via *Calming Essentials* / *Mealtime & Feeding*
   / *Fireworks & Storms*, so retiring this collection orphans nothing that matters.
2. The 3 GraphQL polish ops from earlier (Fireworks Kit bundle template, its handle, 4 FAQ
   metafields) are still pending in `PENDING-graphql-ops.md`.

---

## Coordination protocol (going forward)
1. **One catalogue owner at a time.** Only one session should create/edit products,
   collections, discounts, or metafields in a given window. Claim it on the board below.
2. **Check before you create.** Search the store (`search_products` / `search_collections`)
   for an existing equivalent before adding a bundle/collection. We already have several
   bundles and collections for a ~13-SKU store — do not add more without a reason.
3. **Draft-first for anything unsourced.** Never set a product ACTIVE that depends on a
   product with unfilled `{VERIFY}` specs or no real photo.
4. **Theme vs catalogue split is safe to parallelise.** Theme-file work (CSS/sections) and
   catalogue work rarely collide — prefer to divide along that line if two sessions run.
5. **Log every live change** in `audit/implementation-notes/live-catalog-changes.md` with
   GID + timestamp, and update this doc's snapshot.
6. **Honesty rules still bind everyone** (HANDOFF §9): no fake reviews/urgency, no
   medical claims, truthful delivery + savings maths.

### Claim board (edit to claim; clear when done)
| Session / branch | Working on | Since | Status |
|---|---|---|---|
| `claude/dog-book-product-analysis-ervhl9` | Range expansion (drafts) + coordination doc | 2026-07-20 | done, awaiting owner sourcing |
| _(other builder — please add yourself + your branch here)_ | Settle-In bundle, WELCOME10, theme CSS | 2026-07-20 | live |

---

## ‼️ Visibility note (important)
This doc is on branch **`claude/dog-book-product-analysis-ervhl9`**. A builder session on
a **different branch (or a fresh session on `main`) will NOT see it** until it's merged to
`main` (per HANDOFF §2, fresh sessions land on `main`). **To actually reach the other
builder, this file needs to land on `main`** — via a merge/PR (owner's call) or by the
owner telling the other builder to read it on this branch. Until then, treat coordination
as owner-mediated.
