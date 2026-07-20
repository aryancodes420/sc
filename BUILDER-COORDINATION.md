# 🚧 Builder Coordination — READ BEFORE TOUCHING THE CATALOGUE

> **Why this exists:** on 2026-07-20 **two builder sessions worked The Dog Nook at the
> same time** and created **overlapping bundles and collections** in the one shared
> Shopify store. Git branches do **not** protect the catalogue — there is a single live
> store, so catalogue/theme edits from any session collide. This doc is the single place
> to see who's doing what and what the owner has decided. **Check it before creating or
> editing any product, collection, discount, or theme file.**
>
> **Last updated:** 2026-07-20 · by session on branch `claude/dog-book-product-analysis-ervhl9`

---

## ✅ Owner decision (2026-07-20)
The owner has chosen to **go with the `claude/dog-book-product-analysis-ervhl9`
(Phase 1–3 product-expansion) versions** of the overlapping bundles and collections.
The parallel builder's overlapping items are to be **retired/consolidated** (see table).
Non-overlapping work by the other builder (discount, theme CSS) **stays**.

---

## Who built what (2026-07-20 catalogue snapshot)

### Session A — `claude/dog-book-product-analysis-ervhl9` (product expansion, Phases 1–3)
All created **DRAFT** on purpose (unsourced products; owner activates after sourcing +
`{VERIFY}` specs + real photos). See `audit/15-product-expansion-action-plan.md` and
`audit/implementation-notes/live-catalog-changes.md`.
- **Products (DRAFT):** Heartbeat Companion `10328011571483`, Calming Coat `10328011702555`,
  Snuffle Ball `10328011833627`, Calming Snood `10328015339803`, Wobble Feeder `10328015536411`.
- **Bundles (DRAFT):** The First Nights Bundle `10328016290075` (£54.99–67.99, S/M/L),
  The Fireworks Kit `10328016453915` (£39.99).
- **Collections:** Rescue Essentials `527313404187`, Fireworks & Storms `527313371419`.

### Session B — the other builder (AOV / theme / promo)
- **The Settle-In Bundle** `10328065114395` — £64.99 (compare £72.97), **ACTIVE**,
  productType `Bundle`, single variant. Built from existing in-stock products.
- **"Settling a New Rescue"** collection `527315861787` — **PUBLISHED**, 5 products.
- **`WELCOME10`** discount (10% off) — live, wired into the email popup; their duplicate
  `SETTLE10` was deleted. **← keep, no conflict.**
- **Theme CSS** (`dog-nook-head` inline `<style>`): full-width filter chips, shrunk sort
  control, denser product cards, branded placeholder wordmark for imageless products,
  card-split bug fix. **← keep, no conflict.**

---

## Overlap → reconciliation plan
| Overlap | Session A (keep) | Session B (retire) | Action |
|---|---|---|---|
| "Settle a nervous/rescue dog" bundle | **The First Nights Bundle** (draft) | The Settle-In Bundle `10328065114395` (active) | Archive B's bundle **once A's is ready to publish** — see blocker below. |
| Rescue benefit collection | **Rescue Essentials** `527313404187` | "Settling a New Rescue" `527315861787` | Consolidate to A's; archive/merge B's; make sure no nav menu still points at B's handle. |

### ⚠️ Blocker on fully switching to A's bundle
Session A's **First Nights Bundle includes the Heartbeat Companion, which is not sourced
yet** (draft, `{VERIFY}` specs unfilled). Session B's Settle-In Bundle is live because it
uses only in-stock products. **Do not archive the live Settle-In Bundle until A's
replacement can actually be published**, i.e. until the Heartbeat Companion is sourced —
OR until A's bundle is re-specced to use only in-stock items. Retiring B's live bundle
first would leave the store with **no** active settle-in bundle. Owner to confirm timing.

---

## Coordination protocol (going forward)
1. **One catalogue owner at a time.** Only one session should create/edit products,
   collections, discounts, or metafields in a given window. Claim it on the board below.
2. **Check before you create.** Search the store (`search_products` / `search_collections`)
   for an existing equivalent before adding a bundle/collection. We now have 4 bundles and
   6 collections for a ~13-SKU store — do not add more without a reason.
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
| `claude/dog-book-product-analysis-ervhl9` | Phase 1–3 product expansion (drafts) + this doc | 2026-07-20 | done, awaiting owner sourcing |
| _(other builder — please add yourself here)_ | | | |

---

## ‼️ Visibility note (important)
This doc is on branch **`claude/dog-book-product-analysis-ervhl9`**. A builder session on
a **different branch (or a fresh session on `main`) will NOT see it** until it's merged to
`main` (per HANDOFF §2, fresh sessions land on `main`). **To actually reach the other
builder, this file needs to land on `main`** — via a merge/PR (owner's call) or by the
owner telling the other builder to read it on this branch. Until then, treat coordination
as owner-mediated.
