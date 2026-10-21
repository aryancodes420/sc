# Ads & funnel log

> The running record of every day of paid traffic: numbers, changes and what is being tested.
> Newest entry at the bottom. Format and rules are in `CLAUDE.md` §10.
> Shopify numbers come from the Shopify MCP. Google Ads numbers come from the owner's
> screenshots or exports (Claude has no Google Ads access).

---

## 2026-10-21 — day 0 (ads switched on today)

**Setup (from the owner):** Google Shopping, standard campaign, manual CPC £0.45, £30/day.
Feed via the Shopify Google & YouTube app. All 5 active products published to that channel
(verified via Admin API).

**Baseline before ads (Shopify, 11–20 Oct):** 280 sessions, of which 274 were "direct". That is
almost certainly the owner, previews and bots, not shoppers. 4 from Google search, 2 from
Facebook. 5 sessions with add to cart, 5 reached checkout, 1 completed (order #1001, a
refunded test). **Real orders: 0.**

**Found on the live store today (theme `197123768603`, "Dog Nook — Bed reviews — 20 Oct 2026"):**
these are Merchant Center misrepresentation / DMCC risks, listed in order of urgency:
1. **Evergreen countdown.** The announcement bar shows "10% OFF · ALREADY APPLIED" plus a
   timer. `dn-store.js` starts it at each visitor's first visit (localStorage
   `dn-demo-offer-start-v2`) and loops it every 4 days, so it never actually ends. The
   welcome code has no end date either.
2. **Invented "was" prices.** Product cards compute the struck-through price as
   `Math.round(sellingCents*1.1)`. The bed's compare-at prices (£65.99 etc.) are price × 1.1
   on a product created 12 Oct. The customer pays the shown selling price, so the "Save £X"
   is relative to a price nobody was ever charged.
   *Ruled out:* a real prior selling price. The products were created 12–17 Oct with zero
   orders. *Not ruled out:* the owner may have sold these exact items at the higher price
   elsewhere (ask).
3. **Review counts likely taken from a supplier/marketplace listing.** `dn-review-summary.json`
   shows bed 4.7★ (206), blanket 4.9★ (265), sofa steps 4.8★ (60), steps & ramp 4.8★ (48),
   car steps 4.9★ (37), with a field named `sourceRating`. Review dates (e.g. 28 Jul 2026)
   are earlier than the products were created on this store. The page does say "Purchase
   verification is unavailable for these entries."
   *Not ruled out:* these may be the owner's own customers from another channel, as with the
   earlier offline-sold range. **Ask before touching anything.**
4. Theme strings "Going out fast!" / "Low stock in this option" exist while inventory isn't
   tracked. Not confirmed whether they render. Check.

**Hypothesis being tested:** at £0.45 the products get enough impressions and clicks to show
whether people add to cart. **Judge on:** day 3 (does it work: impressions, clicks, Google
sessions in Shopify, test conversion recorded), then per product at 100–150 clicks.
