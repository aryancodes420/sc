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
   **Feed impact:** the Google & YouTube app sends Shopify compare-at as `price` and the
   real price as `sale_price`. The bed is therefore being advertised to Google as "on sale
   from £65.99–£142.99". UK rules need the higher price to have applied for 30 of the past
   200 days, so expect a disapproval or a misrepresentation flag. Clear the bed's
   compare-at prices.
3. **Review counts likely taken from a supplier/marketplace listing.** `dn-review-summary.json`
   shows bed 4.7★ (206), blanket 4.9★ (265), sofa steps 4.8★ (60), steps & ramp 4.8★ (48),
   car steps 4.9★ (37), with a field named `sourceRating`. Review dates (e.g. 28 Jul 2026)
   are earlier than the products were created on this store. The page does say "Purchase
   verification is unavailable for these entries."
   *Not ruled out:* these may be the owner's own customers from another channel, as with the
   earlier offline-sold range. **Ask before touching anything.**
4. Theme strings "Going out fast!" / "Low stock in this option" exist while inventory isn't
   tracked. Not confirmed whether they render. Check.

**Market check (PLAYBOOK-RESEARCH §J):** only the 2-in-1 is near market price. Bed 2–2.7×
Amazon, 3-step ~1.8×, car steps ~2.5×, blanket +20–75%. Recommended: put ~£20/day behind the
2-in-1 and ~£10/day behind bed XL/XXL. Hold the 3-step and car steps unless repriced (owner
decision).

**Hypothesis being tested:** at £0.45 the products get enough impressions and clicks to show
whether people add to cart. **Judge on:** day 3 (does it work: impressions, clicks, Google
sessions in Shopify, test conversion recorded), then per product at 100–150 clicks.

### 2026-10-21 (later): owner decision, bed only
- **Owner is advertising only the Orthopaedic Bolster Dog Bed** on Shopping. Other products
  are not in the ads.
- Shopify at 06:54 UTC: 0 sessions today so far, 0 real orders. Bed compare-at prices are
  still set (£65.99 / 87.99 / 109.99 / 142.99), so they are still being sent to Google as
  a "sale".
- **Claude's view:** one product is fine and the bed is a reasonable pick (highest order
  value, winter peak). It is also now the single point of failure.
  1. Clear the bed's compare-at prices first (awaiting owner yes).
  2. Bias bids to XL/XXL, which are priced at or below Scruffs/Silentnight. M/L are about
     2× Amazon.
  3. Watch impression share at £0.45.
  4. Line up the 2-in-1 as product #2.
- **Breakeven CVR, ESTIMATED at a 40% contribution margin** (replace with real landed
  costs): M 1.9% · L 1.4% · XL 1.1% · XXL 0.87%.
- **Judge on:** at about 66 clicks/day, all on the bed, ~150 clicks arrive by ~day 3.
  - 0 add to cart at 150 clicks → price vs Amazon. Move the hero to the 2-in-1.
  - Add to cart but no sale → checkout or trust.

### 2026-10-21 (later): bed supplier and costs received
- **Supplier: Temu**, brand **BOFNL** ("Raised Bolster Orthopedic Pet Sofa", Dark Gray
  Detachable). Owner screenshots at 07:56. The prices match the SKU prefix `TDN-BOFNL-BED`.
  Temu shows "Arrives in 2+ business days", free shipping.

  | Size | Our price | Temu cost | Keep/sale* | Breakeven CVR @ £0.45 | Max bid @ 1% CVR |
  |---|---|---|---|---|---|
  | M 73×58 | £59.99 | £18.21 | £37.33 | 1.21% | £0.37 |
  | L 93×71 | £79.99 | £27.78 | £46.36 | 0.97% | £0.46 |
  | XL 105×81 | £99.99 | £34.98 | £57.76 | 0.78% | £0.58 |
  | XXL 121×88 | £129.99 | £50.74 | £69.90 | 0.64% | £0.70 |

  \* Before ads. After the Shopify fee (~2% + 25p) and a 5% refund allowance. **Assumes
  the owner is not VAT-registered.** If registered, keep falls to £27 / £33 / £41 / £48.
- **Risks found:**
  1. **Temu UK Terms of Use (updated 11 Jan 2026):** "solely for personal (non-commercial)
     use" (§2.1); "for your own use, and not on behalf of or for the benefit of any third
     party" (§3.1). Temu may cancel purchases or terminate accounts (§7.5). This works for
     first orders, but it is not a base to scale on.
  2. ~~Temu-branded packaging reaches the customer~~ **CORRECTED 21 Oct: unverified.** This
     came from one general seller blog, not this item. The "2+ business days" listing
     suggests a UK local-warehouse seller, which may ship in its own box. **Check with a
     sample order (M, £18.21).** The sample also yields real photos and video for the PDP.
  3. The identical item is publicly listed at £18–£51. Check whether Temu appears beside us
     on Google Shopping.
- **Claude's recommendation:**
  - Bid by size: M ~£0.30 · L ~£0.40 · XL ~£0.55 · XXL ~£0.65.
  - Owner to look for a non-Temu source for the same bed (BOFNL direct, CJ, a UK
    wholesaler) before scaling.
  - Hold price until ~150 clicks of data. A genuine Black Friday sale from current prices
    is possible from ~11–16 Nov.

### 2026-10-21 (later): owner bids set
- **Owner bids: Medium £0.40, XL £0.50.** L and XXL are not mentioned (status to confirm).
- Breakeven CVR at these bids: **Medium 1.07%** (£0.40 ÷ £37.33), **XL 0.87%** (£0.50 ÷ £57.76).
- **Claude's view:**
  - XL at £0.50 is right: inside its ~£0.58 cap.
  - Medium at £0.40 is just above its ~£0.37 cap. It is also the size furthest above market
    (Amazon ~£28, Temu £18), so it is the likeliest to lose money per click. Owner may be
    right that the cheaper size converts better, and the data will show that.
  - If XXL is off, it has the best economics (cap ~£0.70, competitive vs Scruffs £149.99).
- **Judge on:** Medium at ~100 clicks. 0 add to carts → drop to £0.30 or pause, and move the
  spend to XL/XXL.
- Shopify 21 Oct so far: no sessions recorded yet today (early, and analytics may lag).
  Compare-at prices still set on all 4 sizes.

### 2026-10-21 ~08:15: first read via Supermetrics (Google Ads 8576250915)
- **Campaign "Never broke again 1"** (ID 24383153710):
  - Standard Shopping, manual CPC, £30/day.
  - Created 20 Oct 19:30 and enabled 19:46. Status ELIGIBLE, ad APPROVED.
  - Merchant Center 5875963192. An earlier PMax "CAMPAIGN 1" was created and removed 19 Oct.
- **Results so far: 0 impressions** since it went live (about 12h, mostly overnight).
  Campaign and ad are fine, so the likely cause is products still in Merchant Center review,
  or simply too early. Merchant Center is not yet connected in Supermetrics. Re-check later
  today.
- **Tracking ✅:** only "Google Shopping App Purchase" counts in Conversions. Add to cart,
  Begin checkout, Add payment info, Page view, View item and Search are all secondary.
  Correct.
- **Product groups** (ad group "Dog Bed", default £0.45). Only product type "dog beds" is
  included. Inside it:

  | Size | Item ID | Bid |
  |---|---|---|
  | Medium | shopify_zz_10519069524251_54209835893019 | **£0.40** |
  | **XXL** (not XL) | shopify_zz_10519069524251_54286943519003 | **£0.50** |
  | Large, XL ("everything else") | — | **excluded** |

  ⚠️ The owner said "XL at £0.50", but the item bid at £0.50 is the XXL variant
  (121×88, £129.99). XL (105×81, £99.99) is excluded. Asked the owner which they meant.
- **Settings to fix (awaiting owner yes):**
  - Location is "Presence or interest" → should be **Presence**.
  - **Search partners ON** → off.
- AI Max and final URL expansion show as enabled. They are not applicable to Shopping and
  should have no effect.

### 2026-10-21: settings changed (Claude via Supermetrics, owner said yes)
- Campaign 24383153710:
  - Location targeting: PRESENCE_OR_INTEREST → **PRESENCE**.
  - **Search partners: on → off.** Search stays on, Display stays off.
- Verified in the write response: `geo_target_type: PRESENCE`, `search_partners: false`, status
  ENABLED, ad groups and bids unchanged. `write_status: applied`.
- Supermetrics write access was turned on by the owner. Every change still needs the
  owner's yes first (`CLAUDE.md` §7).

### 2026-10-21: owner confirmed XXL
- The £0.50 bid on the **XXL (121×88, £129.99)** is intended. Running sizes: **Medium £0.40,
  XXL £0.50**. Large and XL are excluded. (Temu's size chart labels the 121cm bed "XL",
  hence the earlier wording.)
- Breakeven CVR at these bids: Medium 1.07% · XXL 0.72% (£0.50 ÷ £69.90).

### 2026-10-21: Merchant Center connected (GMC 5875963192 via Supermetrics)
- **Owner decision:** leave the bed's compare-at ("was") prices as they are. Claude will
  stop raising it. If Merchant Center flags it, tell the owner.
- **Why 0 impressions: every product is "Pending initial review"** for Shopping ads and free
  listings in GB. Created 17 Oct (XXL 18 Oct). Expect approval soon; Google usually takes up
  to ~3 business days. Nothing to fix. **Don't edit the bed while it is pending** (edits can
  restart review).
- **Feed issues to fix once approved** (owner yes needed):
  1. The bed has **no google_product_category**. Set 4434 Dog Beds. The other products
     already have 6973/500084.
  2. The bed title is "Orthopaedic Bolster Dog Bed | The Dog Nook Medium", with the shop
     name mid-title and the size last. Better: product type + benefit + size in cm + colour,
     no shop name.
  3. The bed's feed `price` is the compare-at (65.99/87.99/109.99/142.99), with the real
     price as the sale. This is the app's normal behaviour. Owner has accepted it.
- The Red Grey blanket variant is disapproved for **"Generic landing page"** (the link
  redirects to a generic page). It isn't in the ads, so fix it later.

### 2026-10-21: per-size bed titles prepared
- Method researched (PLAYBOOK §L): Shopify SEO title + category (Claude, needs owner yes),
  then a Merchant Center supplemental Google Sheet with per-size titles in cm (owner, after
  enabling the "Advanced data source management" add-on).
- Sheet: `growth/merchant-center/bed-titles-supplemental.csv` (all 4 sizes). Promoted:
  - Medium: "Orthopaedic Dog Bed Medium 73 x 58 cm – Bolster Sides, Removable Washable
    Cover, Dark Grey"
  - XXL: "Orthopaedic Dog Bed XXL 121 x 88 cm for Large Dogs – Bolster Sides, Removable
    Washable Cover, Dark Grey"
- Proposed SEO title (base): "Orthopaedic Dog Bed with Bolsters & Removable Washable Cover –
  Dark Grey". Category: Pet Beds › Orthopedic Beds (ap-2-9-8).

### 2026-10-21 ~09:05 BST: supplemental sheet linked (owner)
- Owner enabled the "Advanced data source management" add-on and linked the "Bed titles"
  Google Sheet (Medium + XXL rows) to the primary source **"Shopify App API"** (Merchant
  API, 15 products, feed label GBP_10440491036…). The source was already the new Shopify
  connection, so the migration risk (PLAYBOOK §L) doesn't apply.
- Check at 08:07 UTC (Supermetrics, cached): titles still the old ones. Expected, because
  supplemental processing takes time. Re-check next session.
- Shopify part (SEO title + category) is **still awaiting the owner's yes**.
- 09:08 BST, owner screenshot of "SUPPLEMENTAL SOURCE 1": **2 matched, 2 updated**, attribute
  names all recognised, no issues. The sheet is working. The Supermetrics product read
  (cached 08:08 UTC) still shows the old titles, so confirm the final title next session.

### 2026-10-21: bed category + SEO title set (Claude, owner yes)
- Category → Pet Beds › Orthopedic Beds (`ap-2-9-8`). SEO title → "Orthopaedic Dog Bed with Bolsters &
  Removable Washable Cover – Dark Grey". Verified in the productUpdate response, no userErrors.
- The Medium and XXL feed titles come from the supplemental sheet, which overrides this
  base. Large and XL (not advertised) use the base title plus the size name.
- Next check: final feed titles and google_product_category in Merchant Center, product
  approval, and first impressions.
- 09:10 BST check: all 4 bed sizes are still **"Pending initial review"** for Shopping ads and
  free listings in GB (Display already shows GB approved). Google Ads impressions: 0. Expect
  approval by ~Wed 22 to Fri 24 Oct (3–5 business days from Fri 17 Oct). Asked the owner to
  check Merchant Center for account-level "Needs attention" items, which can block review
  entirely.

### 2026-10-21: first-sale plan while Shopping is pending (proposed to owner)
- Shopping is spending £0 while the bed is pending review. Proposed a **Google Search campaign
  today**: ~£15/day, phrase/exact match on XXL- and large-dog intent keywords (PLAYBOOK §M),
  landing on the bed page with XXL preselected. Claude builds it **paused**; the owner
  approves the ads before enabling.
- Also proposed:
  - Owner orders one Medium sample (£18.21) for real photos/video, packaging and delivery
    truth. That unlocks Meta creative later.
  - Owner confirms Shopify abandoned-checkout emails are on.
  - No more store tweaks until traffic shows where people drop off.
- **Owner leaning Shopping-only.** Claude's view: fine. Search was only a stopgap while the bed
  is pending review. The cost is ~2–3 days without data. Revisit Search only if the bed is
  still pending after **Fri 24 Oct**.

### 2026-10-21 16:34 BST check (Supermetrics live read)
- **Still "Pending initial review"** for Shopping ads and free listings (GB) on all 15 items.
  Google Ads: 0 impressions, £0 spend. Shopify: 0 real orders.
- ✅ **Titles applied:**
  - Medium: "Orthopaedic Dog Bed Medium 73 x 58 cm – …"
  - XXL: "Orthopaedic Dog Bed XXL 121 x 88 cm for Large Dogs – …"
  - Large and XL use the new SEO base title.
- ⚠️ **google_product_category is now `2`** (Animals & Pet Supplies > Pet Supplies). Shopify's
  "Pet Beds > Orthopedic Beds" maps to that broad node. The precise node is **4434 Dog Beds**
  (confirmed in Google's en-GB taxonomy file). Fix: add a `google_product_category` column =
  4434 to the "Bed titles" supplemental sheet (owner, optional, 30 seconds).
- 18:20 BST (live read, not cached): bed `google_product_category` is **still 2** on all 4
  sizes. The owner says column C (`google_product_category` = 4434) has been added to the
  sheet. Likely cause: the supplemental source hasn't re-fetched since the edit (Sheets
  sources run on a schedule). Asked the owner to tap "Update"/"Fetch now" on SUPPLEMENTAL
  SOURCE 1 and confirm "Attribute names: All recognized". Re-check next session.
- 18:26 BST, after the owner's manual fetch: category is **still 2** (read cached at
  17:26:37 UTC, i.e. at that moment). The fetch may still be processing, or the header or
  values may not be recognised. Low impact: product_type "Dog Beds" and titles carry the
  meaning, and Google also auto-categorises. Re-check tomorrow; if still 2, get a screenshot
  of the supplemental source details and the sheet's header row.
- 21:56 BST: ✅ **category 4434 (Dog Beds) applied to Medium and XXL** via the sheet. Large
  and XL stay at 2 (not in the sheet, not advertised). Review: **still pending initial
  review** (all bed sizes). Google Ads: 0 impressions. Next check: Thu 22 Oct.

## 2026-10-28: day 8 of ads. Google-side blocker assessment
Spend £0 · Impressions 0 (last 14 days) · Sessions (Shopify) ~1/day since 21 Oct · ATC 1 (26 Oct) · Orders 0

**🔴 THE BLOCKER:** Merchant Center issue `account_site_functionality_parked_domain`, "No products
displayed: Ensure your domain offers unique, valuable content and is not expired". It is
DISAPPROVED for Shopping ads on **every** item. It is account-level and appeared after the
21 Oct checks, which only showed "pending initial review". The free-listings initial review
is also still pending.

**The site itself checks out today:**
- Googlebot and Storebot UAs get 200 on the homepage, the bed page, /pages/about, /pages/contact,
  /pages/faq and the policies.
- Apex A record is 23.227.38.65 (Shopify) and www is a CNAME to shops.myshopify.com. The NS
  is Cloudflare, DNS-only, not proxied.
- The domain is registered until **2027-07-09** (Nominet RDAP).
- No noindex. The "password" strings are only Shopify's login-form JS.

So this is very likely a stale judgement from when Google first looked. That is inference,
not proven. **Fix:** owner requests a review in Merchant Center. Appeals are limited, so
remove trust red flags first; the evergreen countdown is still live on the homepage.

**Secondary issues found:**
- `price_updated` on Large/XL: Google auto-changed their price to £59.99. The variant pages
  output `og:price:amount = 59.99` (the product's minimum) whatever size is selected. They
  aren't advertised, but they would show at the wrong price. Fix: theme sets og price from
  the selected variant.
- The Merchant Center product_link for M/L/XL is still the old handle
  `/products/the-everyday-bolster-bed?variant=…`, which 301s to the live page. A product
  edit should trigger a Shopify resync.

**Plan proposed:** owner hides the countdown, then requests review; Search campaign as a
parallel traffic source (owner's call).
- **Price mismatch root cause (Large/XL showing £59.99 on Google):** Merchant Center still
  holds the **old handle** link `/products/the-everyday-bolster-bed?variant=…` for M, L and
  XL. The page's structured data (ProductGroup → hasVariant) lists the correct per-size
  prices under the **new** handle URLs (M 59.99, L 79.99, XL 99.99, XXL 129.99, verified).
  Google can't match the old URL to a variant, so automatic item updates fall back to
  £59.99. XXL already has the new-handle link and wasn't flagged. **Fix:** add a `link`
  column with the new-handle variant URLs, plus rows for L and XL, to the supplemental sheet
  (`growth/merchant-center/bed-titles-supplemental.csv`). No theme change is needed unless
  the issue persists. The page's og:price is the product minimum, which is secondary.
- 18:57 GMT check (live product read): **the new 4-row sheet isn't applied yet.**
  - Large and XL: base titles, category 2, price £59.99, old-handle links.
  - Medium: still has the old link.
  - XXL: unchanged.
  - The parked-domain issue is still present.
  - The countdown is **still live** on the homepage (data-dn-countdown present).
  - The last sheet change took ~3h to show, so recheck later or tomorrow. Asked the owner to
    confirm "4 matched products" on the source page, and whether the review request was sent.
- 2026-10-28 ~19:10: **Shopify site "pointing" audit: all clean.**
  - Primary domain is https://thedognook.co.uk with SSL on. www, http and the myshopify domain
    all 301 to it. Apex is 23.227.38.65 and www is a CNAME to shops.myshopify.com.
  - Sitemap: 6 sub-sitemaps, 30 URLs, **all 200**. All 30 internal links from the homepage, bed
    page, collections, about, contact, FAQ and policies return **200**. **No 404s.**
  - Canonical tags are correct, and there's no robots noindex.
  - URL redirects exist for every old handle (the-everyday-bolster-bed → orthopaedic-bolster-dog-bed,
    etc.) and keep `?variant=`.
  - Shopify policies are present (contact, privacy, refund, shipping, terms).
  - The only wrong pointer is **inside Merchant Center**: the Google & YouTube app still sends the old
    handle for M/L/XL. That is fixed via the supplemental sheet `link` column. Not re-publishing
    the product to the Google channel, because that could restart the initial review.
- 19:18 GMT: still no change in Merchant Center (old links and prices on L/XL, parked domain
  present, countdown live). Researched other merchants' fixes (PLAYBOOK §N). Recommended
  closing the trust gaps before using a review request: phone, domain email, footer address,
  countdown off, review source labelled or hidden. Also check Shopify Settings → Domains for
  old connected domains.

## 2026-10-29: day 9. ✅ Merchant Center block lifted
- 12:37 GMT (Supermetrics GMC diagnostics, updated 07:00): **Shopping ads APPROVED in GB for
  all 4 bed sizes.** The `account_site_functionality_parked_domain` issue is **gone**. Only
  free listings are still "pending initial review".
- The `price_updated` issue is gone.
  - Feed prices now: M 65.99 · L 87.99 · XL 109.99 · XXL 142.99. These are the compare-at
    prices sent as `price`, with the real price as `sale_price`, matching the site.
  - Titles with cm are applied to all 4 sizes. Category is 4434 on all 4.
  - The product_link field still shows the old handle for M/L/XL (301 to the live page). It
    isn't blocking anything now.
- The owner pasted a Google Ads product report still showing "No products displayed" on all
  items. That's lag in Google Ads behind Merchant Center. Others show "Excluded product or
  listing group", which is expected (only Medium + XXL are bid). "$" is a display quirk;
  currency is GBP.
- Google Ads: 0 impressions so far. The countdown is still live on the homepage.
- **Next judgement points:**
  - First impressions within ~24h.
  - Day 3 after first impressions: Google sessions showing in Shopify, and the search terms.
  - Diagnose each size at 100–150 clicks.
