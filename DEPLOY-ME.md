# DEPLOY BRIEF — CRO wave 2 → draft theme

> # ✅ DONE — 2026-07-25. Do not re-run the deploy.
> All 15 files are on the draft `193158119707` and checksum-verified. `dog-nook.js`
> and `dog-nook.css` untouched. Theme still UNPUBLISHED.
>
> **The diagnosis below was wrong.** The blocker was not a lost raw-GraphQL grant —
> two of the 15 files contained **real Liquid syntax errors** and Shopify's validator
> rejected them (`dog-nook-jsonld.liquid`: a literal `}` inside a `{{ … }}` output tag;
> `dog-nook-countdown.liquid`: `{% stylesheet %}` nested inside an `if`). Both are
> fixed and committed. Full write-up in
> `audit/implementation-notes/live-catalog-changes.md` and `HANDOFF.md` §10.
>
> **Still outstanding — owner action:** the 3 wiring steps in
> "After deploying" below. The features render nothing until those are set.
> The rest of this file is kept for that section and for the record.

> **For the next builder session.** Self-contained: you need nothing else to do this.
> Created 2026-07-25 by the overnight growth session on branch
> `claude/dog-nook-files-review-6w9kwr`.

---

## The job

15 theme files are written, committed and pushed but **not deployed**. Push them to
the **unpublished draft theme** and checksum-verify. That's the whole task.

- **Branch:** `claude/dog-nook-files-review-6w9kwr`
- **Target theme:** `gid://shopify/OnlineStoreTheme/193158119707` — "The Dog Nook — Design install" (**DRAFT**)
- **Do NOT deploy to** `193140818203` — that's the live/published theme.
- **Do NOT publish.** Publishing is the owner's click, always.

## Why it wasn't done — READ THIS, it saves you 20 minutes

The previous session hit `MCP error -32003: MCP tool call requires approval` on
`themeFilesUpsert`. **This is NOT an interactive prompt the owner can click.** It was
retried with the owner present at the keyboard and failed identically.

**Diagnosis:** the Shopify MCP server disconnected and reconnected mid-session, and
the raw-GraphQL grant did not survive the reconnect. This exact failure is already
documented in `BUILDER-COORDINATION.md`: *"raw-GraphQL grant lost on MCP reconnect;
a fresh session clears it in one call."*

**Fix:** run this from a **fresh session**, where the grant is issued cleanly. Do not
waste turns retrying in a session that has already thrown this error — it will fail
the same way every time. There is nothing wrong with the files.

---

## ⚠️ Deploy in THIS order

`snippets/dog-nook-head.liquid` renders the new snippets. If head lands before them,
every page 500s until the rest arrive. Snippets and assets first, head **last**.

### 1 — Snippets (any order among themselves)
```
snippets/dog-nook-jsonld.liquid
snippets/dog-nook-specs.liquid
snippets/dog-nook-bundle-upsell.liquid
snippets/dog-nook-pdp-gallery.liquid
snippets/dog-nook-quiz-steps.liquid
```
### 2 — Assets
```
assets/dog-nook-cro2.css
assets/dog-nook-cro3.css
assets/dog-nook-gallery.js
assets/dog-nook-quiz.js
```
### 3 — Sections
```
sections/dog-nook-product.liquid
sections/dog-nook-quiz.liquid
sections/dog-nook-countdown.liquid
sections/dog-nook-featured-bundle.liquid
sections/dog-nook-collections-index.liquid
```
### 4 — Head, LAST
```
snippets/dog-nook-head.liquid
```

### ⛔ Do NOT redeploy these — unchanged, and both are near the size limit
```
assets/dog-nook.js
assets/dog-nook.css
```

---

## Method

Per `HANDOFF.md` §3:
1. `base64 -w0 <file>` to get the payload
2. `themeFilesUpsert` with `body: { type: "BASE64", value: "<base64>" }` — **BASE64, never TEXT**
3. Verify: query `checksumMd5` back and compare against `md5sum <file>`

```graphql
mutation upsert($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
  themeFilesUpsert(themeId: $themeId, files: $files) {
    upsertedThemeFiles { filename }
    userErrors { filename code message }
  }
}
```

**Size check:** all 15 files were verified under the documented limit (largest is
`sections/dog-nook-product.liquid` at 9,148 bytes base64; the trap bites above
~10–12 KB). One or two files per call is fine. If you get
`FILE_VALIDATION_ERROR: Content contains invalid characters`, the base64 got
corrupted in transit — re-encode and retry that file alone, don't batch it.

**If a call returns "permission stream closed"** — that's the known transient MCP
hiccup. Retry the identical call.

---

## After deploying — tell the owner these three things

The features are inert until these are set:

1. **Add "TDN Calm-kit quiz"** to the homepage in the theme editor, and point each of
   the 5 answer blocks at a real product.
2. **Add "TDN Delivery countdown"** and set `cutoff` from **real CJ transit times** —
   the default `2026-10-24` assumes GB-warehouse stock. If the fireworks SKUs ship
   from China it must be ~15 Oct. Setting a date fulfilment can't meet is exactly the
   failure mode this section exists to prevent.
3. **Set `custom.bundle_handle`** on each single product to its bundle's handle
   (e.g. Lick Mat → `the-settle-in-bundle`). Without it the PDP bundle upsell — the
   main AOV lever — renders nothing.

Optional metafields that unlock the spec block: `custom.specs`, `custom.size_guide`,
`custom.suitable_for`, `custom.not_ideal_for`, `custom.care`. All degrade silently to
nothing when unset, so deploying without them is safe.

---

## What's in the deploy

**Four real bug fixes**
- PDP thumbnails never switched the main image — it renders with a `srcset`, so the
  old inline `onclick` setting only `.src` was ignored by the browser
- Collections index tested `.count` (not a Liquid property), so a curated
  `collection_list` was silently ignored and it always showed everything
- Featured bundle looked up `all_products[settings.product]`, but a `product` setting
  resolves to an object — the lookup returned nil and it silently fell back to
  hardcoded manual prices instead of live ones
- PDP short description was gated on the wrong field and could emit an empty `<p>`

**New conversion work** — bundle upsell (AOV), 3-step calm-kit quiz with email capture
(AOV + owned traffic), PDP spec block + size guide, Product/Offer/Article JSON-LD, and
a Bonfire Night countdown driven by a real dispatch cut-off that auto-flips to an
honest post-deadline message.

**Rationale for all of it:** `growth/GROWTH-PLAN.md`. Short version — £100k profit
needs ~2,600 orders at ~£80 AOV (~7/day), and AOV plus owned-traffic share decide it,
not ad budget.

---

## Verification checklist

- [ ] All 15 files upserted, `checksumMd5` matches `md5sum` for each
- [ ] `dog-nook.js` and `dog-nook.css` untouched
- [ ] Draft theme preview loads without a Liquid error:
      `https://kkeqih-jm.myshopify.com/?preview_theme_id=193158119707`
- [ ] A PDP renders (gallery, badges, trust panel)
- [ ] Homepage renders
- [ ] Live theme `193140818203` untouched
- [ ] Log it in `audit/implementation-notes/live-catalog-changes.md` and add a dated
      entry to `HANDOFF.md` §10

**The storefront is firewalled from the Claude environment** — you cannot load the
preview yourself. Verify by checksum and ask the owner to click through.
