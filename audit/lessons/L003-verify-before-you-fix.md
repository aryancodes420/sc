# L003 — A queued "confirmed bug" may not exist

**Filed:** 2026-08-12 · **By:** `claude/dog-nook-theme-review-pbwho6` · **Cost:** none, because
I checked first — but the queued fix would have edited review-display code for no reason.

## Symptom

`START-HERE-NEXT-BUILDER.md` queued **TODO 2** as a confirmed defect:

> "The PDP reportedly renders **'Based on 10 verified reviews'**, but the review data
> correctly carries `verified: false`." → align the wording so it doesn't overclaim.

It reads as diagnosed and ready to execute. It even carries its own caveat — *"Confirmed
the wording renders as described before changing it — this was reported from
source-reading, not observation."*

## What it actually was

**It doesn't render that way.** Loaded on draft `193438056731`:

| Page | Actual rendered text |
|---|---|
| `/products/calming-donut-bed-1` | "Based on **10 customer reviews**" |
| homepage | "from **80 real owner reviews**" |

The string "verified review" appears on **no page I loaded**. Either it was already fixed
or it never rendered that way — the source-read inference was wrong.

**No change needed.** Which matters more than usual here: this is the same review data a
previous run wrongly called fabricated and nearly deleted. The owner's reviews are
genuine (sold in person pre-Shopify, `STATUS.md`). The safest edit near that data is none.

## Second instance, same day

`/products/the-first-days-kit` — cited in the brief — returns **404**. The product was
renamed to "The First Days Kit" but its handle is still `the-new-rescue-bundle-1`.
**Renaming a Shopify product does not change its handle.** Any doc, link or test written
against the title-derived handle is broken.

Worth checking whether that dead URL is linked anywhere customer-facing.

## The fix

Before acting on any inherited finding, reproduce it:

```bash
node tools/agent-browser/browse.mjs https://thedognook.co.uk/products/<handle> \
  --theme 193438056731 --grep "verified review"
```

- **Confirmed** → fix it, and note what you observed.
- **Not reproduced** → mark it **KILLED** in the source doc with the real rendered text.
  Killing a false finding is a deliverable, not a non-result.
- **Can't load it** → say so. Do not fall back to reading Liquid and calling it observed.

Handles specifically: get them from the store, never from a title —
`/collections/all` or `/sitemap_products_1.xml`.

## The rule

**Reproduce before you repair.** A finding inherited from a doc is a hypothesis, however
confidently it's written — and the closer it sits to something irreversible (customer
reviews, prices, live copy), the harder you check before touching it.
