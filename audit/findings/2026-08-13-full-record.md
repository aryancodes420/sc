# 2026-08-13 — COMPLETE audit record (every finding, nothing omitted)

> Companion to `2026-08-13-web-verified.md`, which is the *sequenced* version.
> **This file is the raw complete set: all 123 finding records produced by the
> full-cycle run, verbatim.** 83 went through adversarial verification before the
> owner stopped the run; the rest are unverified and marked as such.
>
> Every record carries its own `howKnown` — `loaded-page` means a real browser hit
> the URL on draft theme `193438056731` with `Shopify.theme.id` asserted.


**Totals:** 123 findings · impact: 73 high, 42 medium, 8 low · owner split: 110 mine, 13 yours


**Blockers:** 110 none · 6 third-party · 6 physical-world (photography) · 1 business-decision


---


## Bundle pages  (38)


### 1. POSITIONING GAP: the bundle upsell is the best-built element on the page and the biggest miss — it names the stage bundle but never says what the stage is

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Mechanically this block is genuinely good and I want to be clear it is not broken: it renders "BETTER TOGETHER / The Calming Donut Bed is part of The Settle-In Bundle / £64.99 / £72.97 / Save £7.98 vs buying separately / See the bundle →", and the arithmetic is TRUE — £72.97 − £64.99 = £7.98 exactly, so the false-saving problem STATUS.md flags on the bundle's own page has not leaked into this cross-sell. But it is doing pure discount work. It says "Settle-In" and never explains that Settle-In means weeks 1–3, when the dog is learning the routine and the real personality appears. POSITIONING.md's whole thesis is that this ladder must ask "where is your dog right now?" rather than "how much do you want to spend?" — here it asks the money question. One sentence turns a £7.98 discount pitch into a diagnosis: name the stage, say what happens to the dog in it, and the upsell stops competing on price. Highest-leverage single edit on the page.


*Evidence:* Rendered upsell text and figures captured from theme 193438056731; £72.97 − £64.99 = £7.98 verified against the displayed numbers


### 2. The page lists the wrong contents: it shows a £14.99 Slow-Feeder Bowl instead of the £37.99 Donut Bed that is actually in the bundle

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


LOADED the page on draft theme 193438056731 (asserted window.Shopify.theme.id = 193438056731, role unpublished). The "WHAT'S INSIDE" panel renders exactly: "Lick Mat / Spread, freeze, soothe / £11.99", "Snuffle Mat / Nose-led foraging / £22.99", "Slow-Feeder Bowl / Calmer mealtimes / £14.99", then "Bought separately  £49.97" (struck through).

The real product record says otherwise. Fetched /products/the-settle-in-bundle.js in-page: price 6499, compare_at_price 7297, and the description reads "What's inside (worth £72.97 bought separately): The Calming Donut Bed (Medium) — a raised rim to curl against... The Lick Mat... The Snuffle Mat... Bundled together for £64.99 — you save £7.98." Catalogue prices from /collections/all/products.json: Donut Bed 29.99/37.99/44.99, Lick Mat 11.99, Snuffle Mat 22.99. 11.99 + 22.99 + 37.99 = £72.97 — the compare-at is arithmetically true and the Medium bed is £37.99.

So the page omits the single most valuable component (£37.99 bed), substitutes a £14.99 bowl that is not in the box, and understates the bought-separately total by £23.00. This is misdescription of goods plus an understated reference price, on the highest-value live page — the exact DMCC 2024 / CMA exposure STATUS.md already flags. Two additional things run #1 did not report: (a) the truth IS on the page in machine-readable form — the JSON-LD Product description and the meta description both carry "worth £72.97 bought separately" and name the Donut Bed, so Google is told the correct contents while the human is shown the wrong ones; (b) the same wrong panel renders on The First Days Kit page (/products/the-new-rescue-bundle-1), where it happens to be correct — confirming the shared template templates/product.bundle.json is hardcoded to First Days Kit and Settle-In inherits it.

Fix: the section already supports per-block items; drive the three blocks and separately_total from the real components (Calming Donut Bed (Medium) £37.99, Lick Mat £11.99, Snuffle Mat £22.99, total £72.97). Since 6 products share one template, the durable fix is per-product metafields; the 10-minute safety valve is to blank separately_total and badge so nothing false renders.


*Evidence:* https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle?preview_theme_id=193438056731 (rendered panel text quoted above) + /products/the-settle-in-bundle.js (price 6499, compare_at_price 7297) + /home/user/sc/dog-nook-theme/templates/product.bundle.json (blocks i1/i2/i3 hardcode Lick Mat/Snuffle Mat/Slow-Feeder Bowl; separately_total "£49.97")


### 3. Three contradictory savings numbers render inside one viewport — the page reads as if the bundle costs £15.02 MORE than its parts

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


All three are visible without scrolling on desktop (verified in a 1440x1000 screenshot) and within one screen on mobile:
  • image badge: "BEST VALUE · SAVE £15"
  • panel footer: "Bought separately" — "£49.97" with a line-through
  • price row: "£64.99" then a chip "You save £7.98"

A struck-through £49.97 sitting directly above a larger £64.99 is the universal "was / now" pattern, so it literally reads "was £49.97, now £64.99". Then a chip claims a £7.98 saving that cannot be derived from either number on screen, and a badge claims a third figure (£15) that matches neither.

Cause read from source: sections/dog-nook-bundle.liquid computes the chip dynamically — {%- if product.compare_at_price > product.price -%}You save {{ compare_at_price | minus: price }}{%- endif -%} — which correctly yields £72.97 − £64.99 = £7.98 from real data. The panel total and the badge are static text settings. So one honest number and two stale ones are printed side by side.

The same defect shows on The First Days Kit page in a milder form: badge "BEST VALUE · SAVE £15" above a computed chip "You save £14.98" — the page contradicts itself by 2p, which is the rounded-up saving STATUS.md already lists as a to-do. Confirmed rendered, not inferred.


*Evidence:* Desktop screenshot /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/settle-desktop.png; rendered .tdn-bundlep__prices innerText = "£64.99\nYou save £7.98"; .tdn-bundlep__sep = "Bought separately\n£49.97"; .tdn-bundlep__badge = "BEST VALUE · SAVE £15"


### 4. The Settle-In Bundle and The First Days Kit render the identical headline, eyebrow and badge — the product's own name never appears on its page

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


LOADED both bundle pages on the draft theme. They are the same page with a different price:

  Settle-In (£64.99): eyebrow "THE RESCUE BUNDLE", H1 "Three gentle essentials for a nervous dog settling in", badge "BEST VALUE · SAVE £15"
  First Days (£34.99): eyebrow "THE RESCUE BUNDLE", H1 "Three gentle essentials for a nervous dog settling in", badge "BEST VALUE · SAVE £15"

The string "The Settle-In Bundle" appears nowhere in the rendered body text — only in <title> and the JSON-LD. Someone who clicks "The Settle-In Bundle" from search, an ad or the collection lands on a page headed with a different name, carrying an eyebrow naming a third thing ("The Rescue Bundle"). Three names for one product.

Also: both pages carry "BEST VALUE". Two products cannot both be best value, and on the real numbers the claim is on the wrong one — First Days is £34.99 against £49.97 (30.0% off), Settle-In is £64.99 against £72.97 (10.9% off). The badge is a comparative claim that the store's own prices contradict.

Cause: sections/dog-nook-bundle.liquid does {{ s.heading | default: product.title }} and the shared template sets a heading, so the fallback to product.title never fires.


*Evidence:* /products/the-settle-in-bundle and /products/the-new-rescue-bundle-1 on theme 193438056731 — both return .tdn-bundlep__h1 = "Three gentle essentials for a nervous dog settling in", .tdn-eyebrow = "THE RESCUE BUNDLE", .tdn-bundlep__badge = "BEST VALUE · SAVE £15"


### 5. The bundle page renders no description, no FAQ, no specs, no cross-sell and no reviews — all of it exists and all of it renders on ordinary product pages

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


The entire rendered body of the Settle-In page, top to bottom, is: announcement bar, header, image placeholder, badge, eyebrow, H1, one intro paragraph, the What's-Inside panel, price, Add to basket, three trust lines, footer. Nothing else. templates/product.bundle.json has "order": ["main"] — one section — and sections/dog-nook-bundle.liquid contains no description output, no FAQ loop, no cross-sell and no reviews block.

I checked an ordinary PDP for contrast on the same theme: /products/calming-donut-bed-1 renders 3 FAQ accordions, the .tdn-pdp-alt cross-sell block and a #tdn-reviews block ("4.8 · 10 reviews · Based on 10 customer reviews" plus written reviews). All of that comes from snippets/dog-nook-pdp-extra.liquid, which is rendered only from sections/dog-nook-product.liquid — never from the bundle section.

So the two most expensive pages in the store are the two thinnest. The good product copy — which the recon report correctly calls the best asset in the project — is present in the product record and shown to Googlebot in the JSON-LD, and shown to no human. STATUS.md's "FAQs set on 20+ products incl. all bundles" is true as data and false as experience: the bundle FAQs render nowhere.

Separately worth recording as already-fixed: the reviews block now reads "Based on 10 customer reviews", not "verified reviews". Follow-up (a) in STATUS.md §REVIEWS looks done — do not re-raise it.


*Evidence:* Full rendered body text of /products/the-settle-in-bundle (no FAQ/specs/cross-sell/review text present); .tdn-accordion, .tdn-pdp-alt, #tdn-reviews all absent on the bundle page and all present on /products/calming-donut-bed-1; /home/user/sc/dog-nook-theme/snippets/dog-nook-pdp-extra.liquid line 1-6 comment: "Rendered from sections/dog-nook-product.liquid"


### 6. Add to Basket is a full-page form POST that throws the shopper onto /cart — the drawer, the free-delivery bar and every cross-sell are bypassed

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Verified by clicking it. Before: https://thedognook.co.uk/products/the-settle-in-bundle. After: https://thedognook.co.uk/cart. No cart drawer opened (no [open] dialog/cart-drawer in the DOM), and /cart.js confirmed the item landed: The Settle-In Bundle x1, total 6499.

The form markup is a plain {%- form 'product' -%} with action https://thedognook.co.uk/cart/add and method post, and nothing in the bundle section intercepts it. The theme does ship a cart drawer (shopify-section-cart-drawer-section is in the DOM, and SHOP-CART-SYNC / QUICK-ADD-DIALOG elements are present) — it is simply never invoked from this page.

Consequence for the AOV lever specifically: the free-delivery progress bar in the drawer is never seen, there is no post-add cross-sell moment, and the shopper is moved away from the page instead of being kept on it. This was listed in the recon report as source-level reasoning that no agent had confirmed — it is now confirmed behaviourally on the draft theme.


*Evidence:* Click on [data-tdn-atc] → URL changed to https://thedognook.co.uk/cart; /cart.js = {items:["The Settle-In Bundle x1"], total:6499}; drawerOpen false; form action https://thedognook.co.uk/cart/add method post


### 7. MOBILE: every page loses its side margin — body text and headings sit hard against both edges of a 375px screen

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Measured, not eyeballed. At 375px the bundle page's .tdn-wrap has computed padding-left 0px / padding-right 0px, x=0, width=375. The H1 and intro paragraph both measure x=0, width=375 — zero gutter on either side. Same measurement on /products/the-new-rescue-bundle-1 (0px) and on the ordinary PDP /products/calming-donut-bed-1 (0px), so this is not specific to the bundle page.

Root cause, and I ruled out the two innocent explanations before naming it:
  • Not asset drift. I fetched the CSS the draft theme actually serves — https://thedognook.co.uk/cdn/shop/t/12/assets/dog-nook.css?v=7586407119038453391784743960 — and read the rules out of the served file, not out of git.
  • Not a missing design token. The served CSS does define @media(max-width:760px){:root{--tdn-side-pad: 20px}}.
The served file contains, in this order: .tdn-wrap{max-width:var(--tdn-maxw);margin:0 auto;padding:0 var(--tdn-side-pad)} … .tdn-section{padding:64px 0} … @media(max-width:760px){.tdn-section{padding:44px 0}}. Ten sections put both classes on the same element (grep for class="tdn-section tdn-wrap" — bundle, product, shop, collection, collections-index, collection-list, featured-bundle, prep-timeline, why, reviews-placeholder). Equal specificity, .tdn-section declared later, and its `padding: Npx 0` shorthand resets left/right to 0. On desktop the 1180px max-width leaves 130px of slack each side so it is invisible; at 375px there is no slack and the text hits the glass.

Fix is one line and site-wide: either use padding-block on .tdn-section, or split the wrapper into a nested <div class="tdn-wrap"> inside <section class="tdn-section">. Do not touch dog-nook-cro.css — this rule is in dog-nook.css, which is not one of the three drifting files.


*Evidence:* Computed styles at 375px: .tdn-wrap padL/padR "0px", h1 {x:0,w:375}, intro {x:0,w:375}; served CSS text from https://thedognook.co.uk/cdn/shop/t/12/assets/dog-nook.css contains ".tdn-section{padding:64px 0}" and "@media(max-width:760px){.tdn-section{padding:44px 0}}" after ".tdn-wrap{...padding:0 var(--tdn-side-pad)}"; screenshot /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/settle-mobile.png


### 8. POSITIONING GAP: the bundle that IS stage two of the 3-3-3 timeline says nothing about a stage, a timeline, or where the dog is right now

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


I read the complete rendered body text of the page. The words "3-3-3", "three weeks", "decompress", "settle-in stage", "first three months", "rescue timeline" and "stage" do not appear anywhere. The only temporal cue on the whole page is one clause inside the intro: "The first few weeks with a newly-adopted dog are the hardest" — and it is generic scene-setting, not a stage marker. Nothing tells the shopper this product is for weeks 1–3, nothing tells them what stage their dog is at, and nothing distinguishes it from the £34.99 kit whose page carries word-for-word the same headline and intro.

Against POSITIONING.md's test — "Does this help someone work out which stage their dog is at, and get them the right thing for it?" — the answer for this page is no on both halves. It does not help them place their dog, and it does not tell them this is the thing for that placement. The store's own strategic differentiator is entirely absent from the page that is supposed to embody its middle rung.

The raw material is already there and unused: the product description (rendered nowhere, see the missing-content finding) opens "Everything a nervous or newly-adopted dog needs to feel safe and settle in", and the section schema already exposes an editable eyebrow field currently wasted on the generic "The Rescue Bundle". Changing that eyebrow to a stage marker — e.g. "Stage 2 · Weeks 1–3 · Settling" — plus one line of framing under the H1 is a small, entirely Claude-side edit that converts a generic bundle page into the position.

Language guard for whoever writes it: POSITIONING.md requires "what many rescues tell adopters", never "the rule", and the ASA line means the copy must stay behavioural ("for the weeks when they're still working out they live here") and never therapeutic.


*Evidence:* Full document.body.innerText of /products/the-settle-in-bundle on theme 193438056731 — no occurrence of "3-3-3", "stage", "three weeks", "decompress" or "three months"; rendered eyebrow is "THE RESCUE BUNDLE"


### 9. The page has zero images — the hero is a brown gradient reading "FLAT-LAY OF ALL THREE"

**impact** high · **effort** heavy · **owner** owner · **evidence** loaded-page · **blocker** physical-world


Confirmed rendered and confirmed in data. document.images returned an empty array on the page, and /products/the-settle-in-bundle.js reports images: 0. What occupies the primary image slot is the section's CSS-gradient placeholder with the caption "FLAT-LAY OF ALL THREE" — 566x460 on desktop, 375x300 on mobile.

Every one of the 9 published products returns images: 0 from /collections/all/products.json, so this is the known launch gate, not a bundle-specific fault. I record it here only because it is the single largest thing a shopper sees on this page and because it interacts with the findings above: with no photograph, the What's-Inside panel IS the product visual — which is precisely why it listing the wrong three items matters more here than it would on a page with pictures.

One small piece of the brief is Claude's and separable: the placeholder currently says "Flat-lay of all three", which will be wrong once the true contents are corrected — the bundle is a bed plus two mats, not three flat items. That string is a section setting and can be updated with the contents fix.


*Evidence:* document.images.length = 0 on /products/the-settle-in-bundle; /products/the-settle-in-bundle.js "images" length 0; all 9 products in /collections/all/products.json have images: []; rendered placeholder text "FLAT-LAY OF ALL THREE"


*Blocker:* Photographing the bundle and its components requires a camera, the physical products and a dog — Claude cannot produce the images, though it can update the placeholder text and write the shot brief.


### 10. Settle-In Bundle PDP renders wrong contents and an arithmetically impossible saving

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Loaded /products/the-settle-in-bundle with theme asserted. The page renders: badge 'BEST VALUE · SAVE £15'; eyebrow 'THE RESCUE BUNDLE'; heading 'Three gentle essentials for a nervous dog settling in'; WHAT'S INSIDE = Lick Mat £11.99, Snuffle Mat £22.99, Slow-Feeder Bowl £14.99; 'Bought separately £49.97'; then '£64.99' and 'You save £7.98'. Those are the First Days Kit's contents, not this bundle's (Donut Bed + Lick Mat + Snuffle Mat). Read literally the page says the parts cost £49.97 and the bundle costs £64.99 — £15.02 MORE — while badging 'SAVE £15' and simultaneously claiming 'You save £7.98'. Three mutually contradictory numbers on one screen. The homepage card for the same product correctly shows '£64.99 / £72.97 / You save £7.98', so the store contradicts itself between homepage and PDP. This is recon finding #2, still live on the draft theme, now observed rendering rather than inferred from source.


*Evidence:* https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle (theme assert 193438056731 passed); rendered text quoted verbatim above


### 11. POSITIONING: not one word of 3-3-3 renders anywhere on the homepage

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Grepped the fully rendered homepage text for '3 days|3 weeks|3 months|three months|decompress|stage|by hand|Complete Calm|first night|how long'. One hit, and it was the substring 'settle in' inside the Settle-In Bundle's own description. There is no 'Where's your dog right now?', no three doors, no stage labels, and the proof line 'Sold by hand before it was ever sold online' appears nowhere. The hero sells a mood ('Less anxious. More at home.'), the bundle section is headed 'TWO WAYS TO START / Pick the kit that fits where your dog is' and then frames the choice as mats-vs-bed and 'both save you money versus buying separately' — i.e. a discount ladder, which POSITIONING.md explicitly rejects. Judged against the position rather than against a competitor, the whole homepage is a miss: nothing on it helps a visitor work out which stage their dog is at.


*Evidence:* browse.mjs --grep on https://kkeqih-jm.myshopify.com/ returned 1 hit ('settle in'); bundle_intro section text 'TWO WAYS TO START / Pick the kit that fits where your dog is'


### 12. Quiz tells Large-dog owners the £64.99 bundle is 'Sized for a big dog' — the product has no size selector at all

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Choosing 'Just adopted' then 'Large' returns: 'YOUR MATCH / The Settle-In Bundle / A deep bed to burrow into, plus a lick mat and snuffle mat — the calm-down kit for the first unsettled weeks. Sized for a big dog. £64.99 / Have a look' linking to /products/the-settle-in-bundle. I then loaded that PDP: it renders no variant or size selector whatsoever, one price, one buy button. So the quiz makes a fit claim the product cannot honour on the store's most expensive sellable SKU. The same pattern applies to single-size items: 'Fireworks & storms' + 'Large' returns 'The Lick Mat … Sized for a big dog. £11.99'. This is a misdescription risk, not just a UX flaw.


*Evidence:* quiz result text captured verbatim; https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle rendered with no variant picker


### 13. Four of five quiz answers still route to a single sub-£23 product

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Confirmed live routing: Fireworks & storms → The Lick Mat £11.99; Just adopted → The Settle-In Bundle £64.99; Being left alone → The Snuffle Mat £22.99; Mealtimes & boredom → The Slow-Feeder Bowl £14.99; Grooming & handling → The Grooming Glove £11.99. Only one of five answers reaches a bundle. Recon item 17 is still open. Against the position, four of five answers also end the journey at a single object with no stage context — the quiz is the one place on the site that already asks a diagnostic question and it spends that on an £11.99 sale.


*Evidence:* six scripted quiz runs; result hrefs and prices as listed


### 14. Only two bundles render; the section headline hardcodes a two-rung ladder

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


The homepage renders exactly two bundle blocks — Settle-In £64.99 badged 'BEST FOR NEW RESCUES' / 'OUR MOST COMPLETE KIT', and First Days Kit £34.99 badged 'GREAT STARTER KIT' / 'START SMALL' — under the heading 'TWO WAYS TO START'. There is no third stage. The badging is also inverted against the position: the First Days Kit is literally the days-1-3 product but is framed as the cheap option, while the £64.99 bundle is called 'best for new rescues'. Rebuilding this as three stage doors is Claude's job; whether a third rung can actually be sold depends on sourcing, which is the owner's call.


*Evidence:* rendered sections bundle_intro / bundle_premium / bundle_entry on https://kkeqih-jm.myshopify.com/


### 15. MOBILE: the email popup fires directly on top of the bundle price and buy button

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


At 375px the popup trigger is 12s dwell OR 45% scroll (snippets/dog-nook-email-popup.liquid, lines 88-94). The mobile document is 7745px tall and the bundle sections start at y=3105, so 45% scroll lands the modal squarely over them. Screenshot at scroll y=3500 shows the 'Get 10% off your first order' modal covering the Settle-In Bundle's '£64.99 £72.97 You save £7.98' row and its 'Add bundle to basket' button. It then stays up over every subsequent section — collections, reviews, newsletter — for the rest of the page. The store's own primary offer is obscured by its own popup at the exact moment the shopper reaches it.


*Evidence:* mobile slices m-slice05.png (y=3500), m-slice07.png (y=4900), m-slice10.png (y=7000) at 375×812; trigger read from snippets/dog-nook-email-popup.liquid:88-94


### 16. 'Add bundle to basket' throws the shopper off the homepage onto /cart; the cart drawer is present but unused

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Clicked the Settle-In card's buy button on the homepage. The URL went from https://thedognook.co.uk/ to https://thedognook.co.uk/cart — a full navigation to a separate cart page. No drawer opened. There IS a cart-drawer-section in the DOM but it renders at height 0 and the bundle forms are plain <form action="/cart/add" method="post"> with no fetch interception. So the free-delivery progress bar built into the drawer is never seen by anyone, and every add-to-basket ends the homepage session. On the positive side the cart page itself showed correct figures: 'The Settle-In Bundle / Sale price £64.99 / Regular price £72.97 / Cart total £64.99'.


*Evidence:* click on form[action='/cart/add'] button on https://kkeqih-jm.myshopify.com/ → navigation log ['https://thedognook.co.uk/','https://thedognook.co.uk/cart']; cart page text quoted


### 17. Every image on the homepage is a coloured placeholder, and on mobile they eat the whole first screen of each offer

**impact** high · **effort** heavy · **owner** owner · **evidence** loaded-page · **blocker** physical-world


Confirming the known launch gate with what it actually looks like at 375px. The hero is a flat green-to-tan gradient with no photograph. The Settle-In card renders a 235px-tall olive block captioned 'SETTLE-IN BUNDLE FLAT-LAY'; the First Days card renders a terracotta block captioned 'BUNDLE FLAT-LAY'; all five category cards are flat colour swatches with only an uppercase label. On a phone each bundle's placeholder occupies the entire first screen of that section, so the visitor scrolls a full viewport of empty colour before reaching the price. The layout is ready and correctly proportioned — it is waiting on photographs, which need hands, products and a camera.


*Evidence:* m-bundlep.png, mc-06.png, d-hero.png, d-collections.png at 375px and 1440px


*Blocker:* Photographing physical products requires a camera and the goods in hand; no agent can produce them.


### 18. The shop page is nine identical olive rectangles — and none of them says which stage the dog is at

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


This is the positioning verdict on the page as a whole. I read the complete rendered body text. The page contains no 3-3-3 language of any kind: no "3 days", no "3 weeks", no "3 months", no "decompress", no "settle" except inside the product name "The Settle-In Bundle", no "how long have you had them". The H1 is "Comfort-first accessories" and the intro is "A small, considered range for dogs who find the world a bit much — calming beds and mats, gentle grooming tools and slow, settled mealtimes. Everything here is chosen for anxious and rescue dogs, backed by a 30-day money-back guarantee and honest delivery: free over £35, always shown in full at checkout." That is a well-written category page for a generic comfort shop. Judged against POSITIONING.md it advances nothing: a visitor cannot work out which stage their dog is at, and nothing on the page tells them which product belongs to which stage. The two bundles — which ARE the three stages — sit in the alphabetical grid between a grooming glove and a slow-feeder bowl with no visual or verbal distinction beyond a "Bundle" pill on one of them. Claude can fix this on the page itself: a stage strip above the grid ("Day 1-3 · Week 1-3 · Month 1-3"), a stage line on each card driven by a `custom.stage` metafield, and an intro rewritten to ask "where's your dog right now?". Notably the collection page one click away ALREADY does a version of this — /collections/calming-essentials renders a "Reach for these when: Fireworks & storms / Settling a new rescue / Home alone / Vet & travel days" block. The shop page, which is the front door, has nothing equivalent.


*Evidence:* Full rendered body text of https://kkeqih-jm.myshopify.com/pages/shop?preview_theme_id=193438056731 (theme 193438056731 asserted); contains zero stage vocabulary. Contrast: /collections/calming-essentials renders "Reach for these when:" with four situational links.


### 19. THE POSITION SURVIVES, NARROWED: 3-3-3 is taken as CONTENT and open as COMMERCE — no one has structured a store around it

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


The distinction that matters: every commercial use found is a single blog article. Nobody has built the retail architecture. Across every page I opened, none had: bundles named as stages, a homepage that asks which stage the dog is at, stage-based navigation or collections, a stage label on a product page, a quiz routing by time-since-adoption, or a timeline email sequence. PetBuds is the closest and it is still one article on a store whose navigation and bundles are organised conventionally. UKUSCAdoggie links five products inside an article but sells no stage kit. So the correct claim for POSITIONING.md is not "nobody has claimed 3-3-3" (false and easily disproved) but "3-3-3 is widely explained and nowhere merchandised — every brand that uses it writes an article and then sells from a normal shop." That is defensible, still differentiating, and it is what the three bundles actually deliver. It also sharpens the priority: the moat is the store STRUCTURE (stage bundles, stage doors, stage labels, timeline email), not the term itself. The term is commodity content and will not differentiate on its own.


*Evidence:* Opened petbuds.co.uk, gravitispetsupplies.co.uk, ukuscadoggie.com, animalfriends.co.uk, wagtails.co.uk, dogsnhomes.org.uk, shop.rspca.org.uk/collections/pet-essentials — none had stage-named bundles, stage navigation, or stage-labelled products


### 20. The bundle FORMAT is proven in UK retail and the RESCUE framing is unclaimed — every starter kit on the market is a PUPPY kit

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Searching UK starter-kit bundles returns an established, crowded, well-monetised format: Lords & Labradors (Puppy Starter Packs collection), Tuggs (Puppy Starter Kit, "vet-approved extras"), Pawfix (The Puppy Starter Pack), Pets Take Away (Puppy Starter Pack incl. "cosy calming anti-anxiety bed"), The Pet Express (three sizes of puppy starter kit), Natural Dog Food Company (Puppy Starter Pack). Not one rescue or adoption starter kit appeared. This is the strongest commercial argument for the position: retailers have already proved UK buyers will buy a curated kit at the moment a dog arrives — they have simply all aimed it at puppies, which is the easier and more obvious market. The adopted-dog buyer has the same trigger moment, a sharper emotional need, and no product built for them. It also means the three bundles do not need to invent a behaviour, only to redirect a proven one. Worth noting the charity-shop adjacency: RSPCA Shop has a "Pet Essentials" collection but I loaded it and it is a flat filterable product list (£4–£45) with no adoption framing, no stages and no 3-3-3.


*Evidence:* Search returned only puppy kits (Lords & Labradors, Tuggs, Pawfix, Pets Take Away, The Pet Express, Natural Dog Food Company); https://shop.rspca.org.uk/collections/pet-essentials loaded — flat list, no adoption/stage framing


### 21. Positioning gap: the three bundles are the ONLY element that expresses the position, so every other surface is currently a miss

**impact** high · **effort** medium · **owner** claude · **evidence** inference


Judging against the POSITIONING.md test ("does this help someone work out which stage their dog is at, and get the right thing for it?"), the research exposes where the position is and is not carried. The bundles carry it by name. Nothing else found in the project does: STATUS.md records the quiz as "5 answers → real active products" with no time-since-adoption question (POSITIONING.md line 66 identifies this as the one addition needed and it is not built), the blog has zero articles so none of the stage-mapped long-tail terms are covered, and the recon report records custom.short_description as null on all 21 products so no product declares its stage. Against competitors this is not a loss — PetBuds and Gravitis have no stage structure either. But against the position it means the store currently answers "how much do you want to spend?" everywhere except three product titles. The differentiator found in this research (structure, not vocabulary) is therefore ~90% unbuilt, and the cheapest high-value moves are the stage question in the quiz, a stage label per product, and the three stage doors on the homepage.


*Evidence:* POSITIONING.md lines 61-85 (surfaces to change) read against STATUS.md quiz description and audit/findings/2026-08-05-recon-report.md items 3 and 4 (null short_description on all 21 products; zero blog articles)


### 22. CONFIRMED RENDERING: the live Settle-In Bundle page shows the wrong contents and three contradictory savings figures on one screen

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Run #1 reasoned this from source. I have now watched it render on the draft theme.

https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle (theme 193438056731 asserted), in visual order from y=166:
  "BEST VALUE · SAVE £15" (badge)
  H1 "Three gentle essentials for a nervous dog settling in"
  WHAT'S INSIDE → Lick Mat £11.99 · Snuffle Mat £22.99 · Slow-Feeder Bowl £14.99
  "Bought separately £49.97"
  "£64.99  You save £7.98"

Every one of those contents lines is wrong — the Settle-In Bundle is Donut Bed + Lick Mat + Snuffle Mat, not the Slow-Feeder. The £49.97 is the First Days Kit's total. And the page simultaneously claims a £15 saving, implies a £49.97 comparator (which would make the bundle £15 MORE than its parts), and states £7.98. Three numbers, two false, all above the fold, on the highest-value page in the store.

The same template also mis-badges the First Days Kit: https://kkeqih-jm.myshopify.com/products/the-new-rescue-bundle-1 renders "BEST VALUE · SAVE £15" in the badge and "You save £14.98" in the price block — the two figures sit ~570px apart on the same page and disagree. Its contents and £49.97 comparator are correct.

FIX (Claude): drive `contents`, `separately_total` and `badge` from per-product metafields instead of the hardcoded section settings in templates/product.bundle.json; and change the First Days badge to the true £14.98. Ten-minute safety valve if the proper fix slips: blank `separately_total` and `badge`.

Why this is not just a compliance item: the Settle-In page is the destination of the AOV ladder. Right now the strongest argument on it is arithmetically self-refuting.


*Evidence:* Loaded https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle and https://kkeqih-jm.myshopify.com/products/the-new-rescue-bundle-1, both with --theme 193438056731 asserted; screenshot /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/dn-settle.png; source templates/product.bundle.json


### 23. Our bundle pages end at the trust badges — every competitor kit page keeps selling for another 2,000–6,000px

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


MEASURED PAGE DEPTH (rendered, full-page):
• The Settle-In Bundle — total page 1,731px. Order: badge → H1 → what's inside → price → Add bundle to basket → trust strip → footer. Nothing else. No description, no FAQ, no reviews, no cross-sell, no specs.
• Our own Calming Donut Bed PDP — 3,862px, with About this / The details / Pairs well with / Common questions / 10 reviews.
• petremedy.co.uk Puppy Calming Kit — ~3,340px. After the ATC: tabbed "Description | Delivery Information", H2 "Start their journey with calm and confidence", then "What's included in the Puppy Calming Kit?" as an itemised list where every line says what the item is FOR, not just what it is — "1 x 15ml calming spray – ideal for bedding, blankets, hands, and puppy carriers"; "3 x individually wrapped calming wipes – for crate training, travel, or handling"; "1 x plug-in diffuser with 40ml refill – provides up to 8 weeks". Then H3 "Welcome them home with peace of mind", then a product-specific FAQ block ("Will it help with crate training?", "Can I buy refills later? Yes – all products in the kit are available separately, so you can top up").
• adaptil.co.uk Calm Starter Kit — ~7,250px: "Perfect for:" bullet list of situations, six benefit bullets, "What's Inside (and Why It Works!)", a numbered five-step "How to Use", a 12-question FAQ, a proof strip, then named testimonials.

So the two pages that carry our whole AOV strategy are the thinnest pages in the store, while the good copy — which is genuinely the best asset in this project — is sitting unused.

FIX (Claude): make templates/product.bundle.json render the product description, the per-product `custom.faq` metafield (already set on both bundles per STATUS.md), the reviews block and the cross-sell — all four already exist as working snippets used by the standard PDP. Then rewrite "WHAT'S INSIDE" in Pet Remedy's grammar: not "Lick Mat · Spread, freeze, soothe · £11.99" but "Lick Mat — for the evenings they can't settle; spread it, freeze it, and it buys you twenty quiet minutes."

POSITION TEST: this is where the stage story has to live. Pet Remedy's kit page is organised as a journey ("From first day to first tail wag"); ours is organised as a receipt.


*Evidence:* Full-page renders of https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle (theme 193438056731 asserted), https://petremedy.co.uk/product/puppy-calming-kit/, https://www.adaptil.co.uk/products/adaptil-calm-starter-kit; y-coordinates taken from the rendered DOM


### 24. POSITIONING GAP: nothing on any product page says which stage the dog is at — and Adaptil is already one step from taking the ground

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


WHAT I CHECKED FOR ON EACH PAGE: any label, badge, eyebrow or sentence that tells the shopper which moment of the settling timeline this product is for.

OURS: none. The Donut Bed PDP's eyebrow is "CALMING ESSENTIALS" (the collection name). The Settle-In Bundle's eyebrow is "THE RESCUE BUNDLE" and its H1 is "Three gentle essentials for a nervous dog settling in" — which is stage-adjacent but says nothing a shopper can locate themselves on. The cross-sell heading is "Complete the calm-down kit". The bundle upsell says "The Calming Donut Bed is part of The Settle-In Bundle" — a container relationship, not a timeline one. Grep of the full rendered PDP text for "first days", "three months", "week", "stage", "3-3-3": zero hits outside the review bodies.

COMPETITORS: none of the four label products by stage either — the ground is genuinely unclaimed. BUT the nearest competitor is closer than run #1 implied:
• adaptil.co.uk's primary navigation is organised by MOMENT, not by product: "YOUR DOG HAS ISSUES WITH... Travel · Home Alone · Generally anxious · Stress related barking · Fireworks · Training Sessions · Visitors · Vet Visits · Adoption" and a second row "YOUR PUPPY HAS ISSUES WITH... Crying at Night · Adopting a Puppy".
• They already own a settling landing page (adaptil.co.uk/pages/help-settle-in-a-newly-adopted-dog) headed "I WANT TO COMFORT MY NEW DOG DURING ADOPTION", with sections "Prepare their new home", "Establish a routine", "Start building a bond with training", and an FAQ that answers "HOW LONG DOES IT TAKE FOR AN ADOPTED DOG TO SETTLE IN?" with "Dog trainers and behaviourists report it can often take 3 months for a rescue dog to fully adjust and settle in."

So the category leader has already said "three months" in print — but their whole page funnels to ONE SKU (the Calm Collar), they have no stage structure, and no bundle mapped to a phase. The position is still winnable; it is not unattended.

FIX (Claude): (a) a stage eyebrow on every PDP driven by a new `custom.stage` metafield — "DAYS 1–3 · DECOMPRESS" / "WEEKS 1–3 · SETTLE" / "MONTHS 1–3 · AT HOME"; (b) one line under it saying why this product belongs to that stage; (c) on each bundle page, a three-rung stage strip showing where this kit sits and what comes next, which is also the honest upsell; (d) phrase it as "what many rescues tell adopters", never "the rule".


*Evidence:* Rendered nav and body text of https://www.adaptil.co.uk/pages/help-settle-in-a-newly-adopted-dog and https://www.adaptil.co.uk/products/adaptil-calm-starter-kit; rendered text of https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 and /the-settle-in-bundle (theme 193438056731 asserted)


### 25. Placeholder art direction is rendering as customer-facing text: "PRODUCT ON CLEAN BACKGROUND" and "FLAT-LAY OF ALL THREE"

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


On the Donut Bed PDP the image area renders the literal words "PRODUCT ON CLEAN BACKGROUND". On the Settle-In Bundle page the hero renders "FLAT-LAY OF ALL THREE". At 375px, "PRODUCT ON CLEAN BACKGROUND" occupies most of the first screen — it is the first thing a mobile visitor reads, before the product name.

These are photography-brief notes that have leaked into the storefront. Every competitor page in this set opens on real product imagery (calmingdogbeds: a five-shot carousel of the bed in five colourways; MAD: product-on-dog shots; Pet Remedy: the kit contents laid out).

The photographs themselves are blocked on the owner. The placeholder is not. Two things Claude should do this week:
1. Replace the placeholder text with something that sells rather than embarrasses — e.g. "Photographs coming this month — we're shooting the real product, in real homes, with ordinary dogs." That is honest, on-brand, and reads as a small careful shop rather than a broken page.
2. Per run #1, fix the gallery mechanics BEFORE the shoot (aspect-ratio crop instead of the hardcoded 460px, raise the 6-thumbnail cap, real video branching, fetchpriority="high") and then brief the photographer to that ratio. Cheap now, expensive after.


*Evidence:* Screenshots /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/dn-donut-mobile.png and dn-settle.png, from https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 and /the-settle-in-bundle, theme 193438056731 asserted


### 26. Reviews eat 48% of the mobile page and the selling copy sits below the upsell instead of above it

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


Measured scroll positions on the live draft at 375px, total document height 6282px: eyebrow 514 → H1 546 → bundle upsell 1004 → "About this" (the actual product copy) 1430 → "PAIRS WELL WITH" 1999 → "GOOD TO KNOW / Common questions" 2871 → "REVIEWS" 3167 → footer ~6210. So the ten reviews occupy 3167–6210 = 3043px, 48% of the entire page, all ten expanded with no collapse or "show more", while the persuasion copy does not begin until 1430px — nearly two full phone screens down, and BELOW a cross-sell to a different product. The order asks a shopper to consider a £64.99 bundle before it has told them why the £29.99 bed is good. Note the reviews are genuine (owner sold in person pre-Shopify; STATUS.md is explicit, do not delete) and they are the most on-position content on the page — "He didn't touch it on day one. On day three I found him curled up in it" is 3-3-3 language written by a real customer. The fix is sequencing and density, not deletion: lift the copy above the upsell, cap the visible reviews at three with a "show all 10", and pull the day-one/day-three quotes up next to the stage label.


*Evidence:* Scripted getBoundingClientRect + scrollY for every heading on theme 193438056731 at 375px; documentElement.scrollHeight 6282


### 27. No SEO title and an auto-generated meta description that starts mid-sentence with a missing space

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Read off the rendered page. <title> is the Shopify default "The Settle-In Bundle – The Dog Nook" — no crafted seo.title, confirming STATUS.md's note that both bundles have seo.title null. The meta description is auto-derived from the product body and begins:

"Everything a nervous or newly-adopted dog needs to feel safe and settle in — a deep bed to burrow into, plus two gentle, nose-led ways to unwind.What's inside (worth £72.97 bought separately): The Calming Donut Bed (Medium) — a raised rim to curl against, so an anxious dog has a wall on every side. The Lick Mat — a cal"

Three problems visible in that string: "unwind.What's" has no space after the full stop (a missing block separator in the description HTML), the snippet is cut mid-word at "a cal", and the whole 155 characters Google will show are spent on a contents list rather than on the stage proposition. Canonical is correct (https://thedognook.co.uk/products/the-settle-in-bundle).

On the positioning test this is a miss twice over: the title and description are the store's cheapest chance to say "weeks 1–3" to someone searching "rescue dog settling in" — POSITIONING.md names that exact query cluster as winnable — and neither does.


*Evidence:* document.title = "The Settle-In Bundle – The Dog Nook"; meta[name=description] content quoted above; link[rel=canonical] = https://thedognook.co.uk/products/the-settle-in-bundle


### 28. 'BEST VALUE · SAVE £15' also renders on the First Days Kit, where the true saving is £14.98

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Loaded /products/the-new-rescue-bundle-1. Contents and totals are correct here (£11.99 + £22.99 + £14.99 = £49.97; price £34.99; 'You save £14.98'). But the same hardcoded badge 'BEST VALUE · SAVE £15' sits above it, rounding the saving up by 2p, and the homepage badge for the same product correctly says 'Save £14.98'. A rounded-up saving next to the true figure on the same site is exactly the pattern the CMA picks apart under DMCC 2024.


*Evidence:* https://kkeqih-jm.myshopify.com/products/the-new-rescue-bundle-1 — badge 'BEST VALUE · SAVE £15' vs on-page 'You save £14.98'


### 29. All three email-capture points render with no privacy-policy link

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Enumerated every form in the DOM. Newsletter form (action /contact#contact_form), quiz email step (action /contact#tdn-quiz) and the modal popup all have hasPrivacyLink = false, and the popup's full anchor list contains no privacy href — its only text is 'Calm-dog tips and early access to new bundles — plus a code for your first order. No spam, unsubscribe anytime.' UK GDPR Art. 13 requires the notice at the point of collection. Recon quick-win #8; still open. One line of markup each.


*Evidence:* DOM form audit on https://kkeqih-jm.myshopify.com/ — 3 email forms, all hasPrivacyLink:false; popup anchors [] contained no /policies/privacy-policy


### 30. MOBILE: four screens of scrolling before the first price

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


Measured section offsets at 375×812. Total document height 7745px. hero top=108 (h=440), catbar 548, trust 623 (h=374), why 997 (h=832), quiz 1828 (h=877), bundle_premium 3105, bundle_entry 3868, collections 4630, reviews 5521 (h=1679), newsletter 7200. The first price on the page appears at y≈3105 — 3.8 viewport heights down. Above it sit 374px of trust badges and 832px of 'Comfort you can return with confidence' cards that stack one per row on mobile. The reviews block alone is 1679px, about two full phone screens of six stacked testimonials. Most traffic lands here and has to scroll past ~2000px of reassurance before seeing anything to buy.


*Evidence:* section top/height map captured at 375×812 on https://kkeqih-jm.myshopify.com/


### 31. Stale product naming renders in three places: 'THE RESCUE BUNDLE' and 'The New Rescue Bundle'

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Both bundle PDPs render the eyebrow 'THE RESCUE BUNDLE' above their titles, and the homepage review block credits Lucy A.'s testimonial to 'The New Rescue Bundle'. Everywhere else the product is 'The First Days Kit' (hero button, category bar pill, footer link, bundle card). The handle is still /products/the-new-rescue-bundle-1. Three visible names for one product, on a store whose position depends on the name meaning 'days 1-3'.


*Evidence:* rendered eyebrow on /products/the-settle-in-bundle and /products/the-new-rescue-bundle-1; review attribution 'Lucy A. · The New Rescue Bundle' on the homepage


### 32. "Sort by: Featured" is actually alphabetical, so the two bundles — the entire AOV ladder — land at positions 3 and 7 by accident of the letter T

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


The default order rendered is: Calming Donut Bed, Car Boot Liner, First Days Kit, Grooming Glove, Lick Mat, Nail Grinder, Settle-In Bundle, Slow-Feeder Bowl, Snuffle Mat. That is strict A-Z on the word after "The", not a curated order. So the first thing a visitor sees is a £29.99 bed, and the £34.99 First Days Kit and £64.99 Settle-In Bundle are scattered mid-grid. Nothing merchandises the ladder that POSITIONING.md says the whole store is built on. Calling an alphabetical list "Featured" is also mildly misleading in its own right. Good news alongside this: the sort control is REAL and works. It is a `<select data-tdn-sort aria-label="Sort products">` with six live options, and selecting "Price, low to high" reordered the grid client-side to Grooming Glove, Lick Mat, Slow-Feeder Bowl, Nail Grinder, Snuffle Mat, Calming Donut Bed, Car Boot Liner, First Days Kit, Settle-In Bundle — correct for £11.99, £11.99, £14.99, £19.99, £22.99, £29.99, £29.99, £34.99, £64.99. Run #1's quick-win #19 ("remove the fake Sort: Best selling caret, it's a decorative span that does nothing") does not apply to this theme — do not action it.


*Evidence:* Default DOM order = A-Z; selectOption('price-asc') reordered correctly. Select attributes: data-tdn-sort, aria-label="Sort products", not inside a form.


### 33. On mobile the email popup fires on top of the un-dismissed cookie banner, so the consent choice is buried behind a marketing modal

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


At 375px, ~12.8 seconds after load and with no scrolling, `.tdn-emailpop` appears at 0,0 covering the full 375x812 viewport: "JOIN THE PACK / Get 10% off your first order / Calm-dog tips and early access to new bundles — plus a code for your first order. No spam, unsubscribe anytime." with an email field, a "Get my 10% code" button and "No thanks". Underneath it, still undismissed, sits `.tdn-cookie` (fixed, 343x183 at y=613). Both carry z-index 90; the popup is later in the DOM so it paints above. The result on a phone is that a first-time visitor is asked for their email address before they have been able to accept or decline cookies, and the consent banner is dimmed out behind the modal overlay. That is a poor consent sequence to ship on a store whose whole position is honesty, and the two stacked interruptions cover the entire product grid at 375px. Fix: gate the email popup until cookie consent has been answered, and give the cookie banner a higher z-index than the popup. NOTE — one thing I checked and am NOT reporting as a defect: Playwright could not click the cookie banner's Decline/Accept buttons at 375px, but elementFromPoint at those coordinates returns an IFRAME, which is the Shopify preview bar pinned to the bottom of the screen in preview mode only. A real shopper has no preview bar, so those buttons are not obstructed in production. That was a preview artefact, not a bug.


*Evidence:* Polled DOM: .tdn-emailpop visible after 12811ms at rect 0,0,375,812 z-index 90; .tdn-cookie at 16,613,343,183 z-index 90, still present


### 34. The Settle-In Bundle's savings badge breaks across two lines on mobile — "Save" on one line, "£7.98" orphaned on the next

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


At 375px the cards are 179px wide and the Settle-In Bundle's price line renders as "£64.99  £72.97  Save" then "£7.98" wrapping onto a second row, with the terracotta pill background split across both. It is the most expensive sellable SKU on the page and the flagship of the AOV lever, and its saving reads as broken text. The First Days Kit's longer line ("£34.99 £49.97 Save £14.98") happens to fit because it sits in a row where the sibling card is shorter, so this will move around unpredictably. `.tdn-product-card__save` (dog-nook-cro.css:18) needs `white-space: nowrap` and the price row needs to wrap as a unit. Separately and importantly: the savings arithmetic itself is CORRECT on both cards — £34.99 vs £49.97 = £14.98, and £64.99 vs £72.97 = £7.98. Those are the true figures from the recon report, not the old "SAVE £15" against a false £49.97. Whatever fixed the card-level maths worked; the false-savings problem STATUS.md still logs is on the bundle PDP template, not here.


*Evidence:* 375px screenshot of /pages/shop: Settle-In card price line renders "£64.99 £72.97 Save" / "£7.98" on two lines; card width measured 179px


### 35. Three size-ladder fixes and one add-on are gated on the supplier confirming what sizes actually exist

**impact** medium · **effort** quick · **owner** owner · **evidence** read-file · **blocker** third-party


Separating this out so the pricing findings above stay actionable and this one stays honest about the barrier.

Claude can and should do all the catalogue work: create the variants, set the prices, write the size guides, populate custom.specs, wire the bundle maths. What Claude cannot do is find out what CJ can actually ship. Four items depend on it:
1. Snuffle Mat Small and Large — market ladder is £10 / £20 / £30 (Ruffle Snuffle). Needs real mat dimensions per size before variants can be honest.
2. Slow-Feeder Bowl S/M/L — market ladder is £11.95 / £14.95 / £19.95 (LickiMat OH Bowl). Needs bowl diameters and capacities.
3. Lick Mat sizes — market has Mini £5.99, standard £6.99, XL £12.95. Needs to know whether a larger format is available at all.
4. Waterproof liner for the Deep Nook / Donut Bed — market charges £25–£50 for this (Charley Chau) or £24.99–£44.99 for a curtain (Collared Creatures). Needs to know if a liner exists in the right diameters.

This rides along with the CJ email already sitting in STATUS.md as blocked item 3 (transit times, single-parcel bundling). Adding these four questions costs the owner nothing extra — it is the same email — but unblocks roughly £20 of available AOV per the add-on finding.

One thing I explicitly did NOT conclude: that the owner has under-specified the catalogue. The single-size SKUs are equally well explained by CJ only listing one size, by the owner deliberately launching narrow to limit dropship risk, or by sizes existing but being undocumented in the CJ listing. I have no visibility into the supplier catalogue and did not assume fault.


*Evidence:* STATUS.md blocked item 3 (Email CJ); size ladders sourced from https://rufflesnufflemats.com/products.json and https://lickimat.co.uk/products.json


*Blocker:* Only CJ can say which sizes and liner options exist in their catalogue, and that answer has to come back from a human at the supplier before any variant can be created honestly.


### 36. The one PDP element that beats all four competitors — our bundle upsell — currently sells a container instead of a stage

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Credit where it is due, because it changes what to build next. Our Donut Bed PDP carries a "BETTER TOGETHER" block immediately under Add to Cart: "The Calming Donut Bed is part of The Settle-In Bundle · £64.99 · £72.97 · Save £7.98 vs buying separately · See the bundle →". The maths is correct (£29.99 + £11.99 + £22.99 = £64.97... the £72.97 comparator uses the Medium bed at £37.99, and £72.97 − £64.99 = £7.98 exactly). Not one of the four competitor product pages has a bundle upsell of any kind — Pet Remedy and Adaptil sell kits as separate SKUs with no route from a component page, calmingdogbeds sells a furniture protector and a spare cover with no bundling, MAD's only cross-sell is a plain "YOU MAY ALSO LIKE" row.

But it is doing container work, not diagnosis work. "X is part of Y" invites "do I want more stuff?" — the same question the discount ladder asks, which POSITIONING.md says always answers "less".

FIX (Claude): rewrite it in stage grammar and make it bidirectional.
  From: "The Calming Donut Bed is part of The Settle-In Bundle"
  To:   "Most people buy the bed in week one. If your dog is still in their first few days, the First Days Kit comes before this one — and if you're past that, the Settle-In Bundle is the bed plus the two things that help them switch off in the evenings."
That routes DOWN as well as up, which is what makes it a diagnosis rather than an upsell, and it is the one place on the site where a stage question can be asked at the exact moment of hesitation.

Also: the block is absent from the bundle pages themselves, so the ladder has a bottom rung and a middle rung but no rail between them.


*Evidence:* Rendered https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 at y≈694 (theme 193438056731 asserted); absence confirmed on rendered PDPs of calmingdogbeds.co.uk, myanxiousdog.co.uk, petremedy.co.uk and adaptil.co.uk


### 37. The First Days Kit card is the only one with no category pill, so the store's entry-stage bundle is the least labelled thing in the grid

**impact** low · **effort** quick · **owner** claude · **evidence** loaded-page


Eight cards render a `.tdn-product-card__tag`: Calming, Travel, Grooming, Calming, Grooming, Bundle, Feeding, Feeding. The First Days Kit renders none — tagText is null, tagRect is null, at both 1440px and 375px. The snippet sets the pill from `p.type` (snippets/dog-nook-product-card.liquid:15-18, falling back to the product's type when no tag_text override is passed), so the innocent and almost certainly correct explanation is simply that this product's product_type field is empty in the catalogue — not that anything is broken or that anyone did anything wrong. I could not confirm the admin value directly: the Shopify GraphQL call needed an approval this session did not have, so I am reporting the render, the mechanism and the likely cause, not a verified catalogue value. The consequence is worth fixing regardless: The Settle-In Bundle is labelled "Bundle" and The First Days Kit is labelled nothing, so the two halves of the same ladder look like different kinds of object. Under the position both should carry a stage label anyway ("Days 1-3" / "Weeks 1-3"), which supersedes the category pill entirely for these two products.


*Evidence:* Measured tagText:null / tagRect:null for /products/the-new-rescue-bundle-1 at 1440px and 375px; /home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid:15-18


### 38. Mobile: the compare-at price block breaks across two lines and the cookie banner covers the first row of products

**impact** low · **effort** quick · **owner** claude · **evidence** loaded-page


Two smaller things seen only at 375px.

1. The First Days Kit card price wraps. At a 179px card width the block '£34.99  £49.97  Save £14.98' breaks so that 'Save' ends one line and '£14.98' starts the next — the saving badge is split in half. This is the store's flagship entry bundle and the saving is its main argument. Visible in the mobile screenshot. Fix is a `white-space: nowrap` on the save badge or wrapping the sale/compare pair.

2. The cookie consent card ('We use cookies … Decline / Accept all') renders as a large panel over the middle of the viewport and covers the first row of product cards — on the mobile capture it obscures both the First Days Kit and Lick Mat prices. It also overlaps the bottom card row on desktop. It is dismissible so it is not a blocker, but the first thing a phone visitor sees on this page is a consent panel sitting on the products.

(Positive, worth recording: the cookie banner IS present and rendering. Run #1 listed 'verify the cookie banner is actually in layout/theme.liquid' as an unanswered owner check because layout/ is not in the repo. It renders. That item can be closed.)


*Evidence:* 375x812 capture of https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731, theme asserted. Screenshot: scratchpad/ce-mobile.png. Card price innerText '£34.99 £49.97 Save £14.98' in a 179px-wide card.


## Product pages  (19)


### 39. Mobile PDP renders 420px wide inside a 375px viewport — every line of copy is cut off mid-word and the lost 45px is unreachable

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Root cause is a CSS class-name collision between two of the three conflicting stylesheets, and I read it out of the DEPLOYED theme, not git. The size-guide TABLE rule and the size-SELECTOR pill row now share the class `.tdn-sizes`. Deployed `dog-nook-cro.css` has the intended `.tdn-sizes{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}`; deployed `dog-nook-cro2.css` loads AFTER it with equal specificity and wins: `.tdn-sizes{width:100%;border-collapse:collapse;font-size:13.5px;min-width:420px}`. That `min-width:420px` was written for `<table class="tdn-sizes">` in snippets/dog-nook-specs.liquid:55, but the deployed selector markup is `<div class="tdn-sizes" data-tdn-swatches role="radiogroup" aria-label="Size">`, so it matches too. Measured in the browser at 375px: `.tdn-sizes` computed min-width 420px and width 420; `.tdn-pdp` computed `grid-template-columns: 420px`; `document.body.clientWidth` 375 but `scrollWidth` 420; `window.scrollTo(500,0)` leaves `scrollX` at 0, so the overflowing 45px (12% of the screen) is clipped and CANNOT be scrolled to. Visible in my 375px screenshot: the description reads "They stood in the doo", "the two things a nervo", "Deep fi"; the trust panel reads "Delivered in 4–7 work"; the upsell headline "…is part of The Settle-In Bundle" loses "Settle-In Bundle"; the sticky Add to Cart button is clipped. Fix respects the standing rule: rename the size-guide table's class (e.g. `.tdn-sizeguide`) in snippets/dog-nook-specs.liquid + assets/dog-nook-cro2.css — neither is on the do-not-touch list (only dog-nook.js and dog-nook-cro.css are). Do NOT edit dog-nook-cro.css.


*Evidence:* https://thedognook.co.uk/products/calming-donut-bed-1 served by theme 193438056731 (asserted window.Shopify.theme.id, role unpublished). Deployed CSS fetched from /cdn/shop/t/12/assets/dog-nook-cro2.css. Screenshot /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/mm-01.png


### 40. Mobile has zero left/right gutter — breadcrumb, title, price and buttons sit flush against the screen edge

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Separate cause from the 420px bug, same visual damage. Deployed dog-nook.css defines, in this order: `.tdn-wrap{max-width:var(--tdn-maxw);margin:0 auto;padding:0 var(--tdn-side-pad)}` then `.tdn-section{padding:64px 0}` then `.tdn-section{padding:44px 0}`. The PDP element carries BOTH classes (`class="tdn-section tdn-wrap"`), `.tdn-section` is declared later at equal specificity, and its `padding` SHORTHAND resets padding-left/right to 0. Measured on the live draft at 375px: computed paddingLeft `0px`, paddingRight `0px`, width 375. The `--tdn-side-pad: 20px` mobile override at dog-nook.css:43 never gets a chance to apply. This is invisible on desktop only because `max-width:1180px` + `margin:0 auto` in a 1440px window produces a ~130px gutter by accident — my desktop screenshot shows content starting at x=130, my 375px screenshot shows "Shop / Calming Essentials", "CALMING ESSENTIALS" and the H1 all starting at x=0. Fix: give `.tdn-wrap` explicit `padding-left/padding-right` (longhand beats the shorthand ordering problem), or move the `.tdn-section` rules above `.tdn-wrap`. File is assets/dog-nook.css — allowed, not on the do-not-touch list.


*Evidence:* Computed style on `.tdn-section.tdn-wrap` = padL 0px / padR 0px at 375px viewport, theme 193438056731; deployed dog-nook.css rule order quoted above


### 41. custom.short_description is still null — the first screen is title, price, size buttons, nothing that sells

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


DOM check on the live draft: `.tdn-pdp__short` does not exist. The template is ready and waiting — sections/dog-nook-product.liquid line 42 does `{%- assign _short = s.short_text | default: product.metafields.custom.short_description.value -%}` and only prints the paragraph `{%- if _short != blank -%}`. So the rendered order above the fold is: breadcrumb → grey placeholder → "CALMING ESSENTIALS" → "The Calming Donut Bed" → "4.8 · 10 reviews" → "£29.99" → "SIZE: SMALL" → buttons. Not one sentence of persuasion before the ask. This matters more here than on a normal store because there is no photograph: words are the entire conversion argument. The good copy already exists lower down ("The first night, they didn't sleep. They stood in the doorway, watching you, waiting for something to go wrong.") — it starts 1430px down the mobile page. Claude writes the short description; POSITIONING.md is explicit that the copy "doesn't need rewriting — it needs labelling by stage and moving up the page."


*Evidence:* DOM shortDesc=false on theme 193438056731; template gate at sections/dog-nook-product.liquid:42


### 42. POSITIONING GAP: the product page contains zero stage signal — nothing tells you which of the 3-3-3 stages this bed is for

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


I counted occurrences in the rendered body text of the live draft: "stage" 0, "3-3-3" 0, "decompress" 0, "first three months" 0, "first days" 0. The eyebrow above the H1 says "CALMING ESSENTIALS" — a merchandising category, not a stage. Against POSITIONING.md's own test ("Does this help someone work out which stage their dog is at, and get them the right thing for it?") this page scores zero, and POSITIONING.md explicitly requires the opposite: "Every product declares its stage. A lick mat is a day-one product. A bed is a week-one product." The raw material is already on the page and merely unlabelled — the description opens with "The first night, they didn't sleep" (that IS day-1 language) and the reviews are full of it ("He didn't touch it on day one. On day three I found him curled up in it while I was making tea"). Claude's job: add a stage badge next to the eyebrow ("Weeks 1–3 · Settling in"), one line saying why a bed is a week-one rather than a day-one product, and a link through to the stage collection. This is the change that makes the page look like nobody else's.


*Evidence:* Scripted text-marker count over document.body.innerText on theme 193438056731: stage=0, 3-3-3=0, decompress=0, "first three months"=0


### 43. Zero product photographs — confirmed at the DOM level, still the launch gate

**impact** high · **effort** heavy · **owner** owner · **evidence** loaded-page · **blocker** physical-world


Not a new finding, but I can now state it as observed rather than assumed: on the rendered draft PDP there is not one product image element. `.tdn-pdp__gallery img` count 0, and the cross-sell cards for "The First Days Kit" and "The Lick Mat" under "PAIRS WELL WITH / Complete the calm-down kit" are also flat coloured blocks. Everything else in this report is worth doing before the photos exist — the copy, the size guide, the stage labelling and the mobile layout bugs all raise conversion on a page that will still need pictures — but no amount of it substitutes for the images.


*Evidence:* DOM image counts on theme 193438056731; only <img> on the page is the hCaptcha badge


*Blocker:* Photographing physical stock requires hands, the product in the room and a camera; Claude cannot produce an image of a real object it has never seen.


### 44. POSITIONING GAP: no route from this page to the other two stages — the ladder exists in the strategy and nowhere in the UI

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


I enumerated every <a href*="/products/"> on the rendered page. There are five, and all five are in the footer: The First Days Kit (x2), The Calming Donut Bed, The Car Boot Liner, The Grooming Glove. Inside the page body itself — hero, panel, price block, trust strip — there is not one link to another product, another bundle, or a stage chooser.

So a shopper who arrives at the £64.99 middle rung and concludes "my dog only came home on Friday, this is too much" has no offered path to the £34.99 First Days Kit except a footer link, and no path at all to the £139.99 Complete Calm System. Someone whose dog is at month two has no path upward. The three-rung ladder that POSITIONING.md calls "the whole shop in one screen" is invisible from the page that sits in its middle.

This is also the AOV lever failing at its most natural moment. The recon report recommended a "Choose your kit" three-up comparison; nothing like it renders here. The cross-sell machinery to build it already exists and works — snippets/dog-nook-pdp-extra.liquid renders a 3-up card grid, and it is live on /products/calming-donut-bed-1 — it is simply not wired into the bundle section.

Note for whoever builds it: only two bundles are currently published. /collections/all/products.json returns 9 products and the only bundles in it are The First Days Kit (handle the-new-rescue-bundle-1, £34.99 vs £49.97) and The Settle-In Bundle (£64.99 vs £72.97). the-complete-calm-system, the-home-alone-kit and the-fireworks-survival-kit all return HTTP 404 on the draft theme — they are still drafts. A stage chooser can be built honestly with two live rungs and a "stage 3 coming soon" that does not pretend to be buyable.


*Evidence:* All /products/ anchors on the page: /products/the-new-rescue-bundle-1 (x2), /products/calming-donut-bed-1, /products/car-boot-liner-1, /products/grooming-glove-1 — all in the footer; /products/the-complete-calm-system, /products/the-home-alone-kit, /products/the-fireworks-survival-kit each returned HTTP 404


### 45. Every imageless product card renders the product title as raw unstyled text under the category pill — the pill is drawn on top of the words

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


All 9 cards have no <img> at all (hasImg:false on every one). The media box is a flat `background: #8B9578` olive rectangle, 280x210 desktop / 177x132 mobile. Inside it the deployed theme emits `<span class="tdn-product-card__ph" aria-hidden="true">The Calming Donut Bed</span>`. There is NO CSS rule for `.tdn-product-card__ph` anywhere in the repo — I grepped assets/dog-nook.css, dog-nook-cro.css, cro2 and cro3; only the PDP sibling `.tdn-pdp__ph` is styled (dog-nook-cro.css:25: 12px, uppercase, letter-spaced, rgba(255,255,255,.8)). So the card placeholder inherits body defaults: computed color rgb(46,42,34), font-size 14px, display:inline, position:static — plain dark body copy flush in the top-left corner of the tile with no padding. Meanwhile `.tdn-product-card__tag` is position:absolute; top:10px; left:10px; background rgba(255,255,255,.9). The two collide: measured overlap 59px wide x 9px tall on desktop, 62x9 on mobile, on every card that has a pill. On screen you read "The Ca[Calming]ng Donut Bed" — the white pill sits over the middle of the word. The same title then repeats immediately below in bold as `.tdn-product-card__name`, so the product name appears twice per card, once broken. Note the git snippet snippets/dog-nook-product-card.liquid does NOT emit the `__ph` span at all — the deployed theme differs from git here, which is consistent with the known asset-drift trap in STATUS.md. Fix: style `.tdn-product-card__ph` (centre it, pale/uppercase like the PDP version, and give the tag pill breathing room) or drop the duplicate title. Contrast of #2E2A22 on #8B9578 computes to 4.53:1 — it scrapes AA, so legibility is not the issue; the collision and the duplication are.


*Evidence:* Rendered card HTML: <div class="tdn-product-card__media" style="background: #8B9578;"><span class="tdn-product-card__ph" aria-hidden="true">The Calming Donut Bed</span><span class="tdn-product-card__tag">Calming</span></div>. Grep: no `.tdn-product-card__ph` rule in /home/user/sc/dog-nook-theme/assets/*.css


### 46. Our PDP's first mobile screen contains zero words of selling copy — competitors put empathy copy above the buy button

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


COMPETITOR STRUCTURE (all loaded at 375px and 1440px):
• calmingdogbeds.co.uk/products/calming-donut-dog-bed — above the fold, in order: photo carousel (5 thumbnails, real product shots) → H1 "Official Calming Donut Dog Bed" → star row + "(1,193)" → H2 "OUR CALMING DONUT BED IS ALL YOU NEED..." → TWO paragraphs of empathy copy ("Do you feel sad when leaving your pooch alone while going to work?") → price → COLOR swatches → SIZE → quantity → Add to cart → "Size Chart" button. Copy sits ABOVE the price.
• myanxiousdog.co.uk/products/padded-yellow-anxious-harness — title → price → size → ATC, then immediately "Our award winning padded harness is adjustable with soft reflective trim" and four sized girth ranges.
• petremedy.co.uk/product/puppy-calming-kit/ — H1 → £28.00 → plug-size selector → ADD TO BASKET → tabbed "Description / Delivery Information" → H2 "Start their journey with calm and confidence."

OURS (kkeqih-jm.myshopify.com/products/calming-donut-bed-1, theme 193438056731 asserted): at 375px the entire first screen is announcement bar → header → breadcrumb → a full-width placeholder block reading "PRODUCT ON CLEAN BACKGROUND" → "CALMING ESSENTIALS" → H1 → "4.8 · 10 reviews". Price is only just visible. The first sentence of prose ("The first night, they didn't sleep...") does not appear until y≈1109px, under the heading "About this" — i.e. below the buy box, below the bundle upsell, below the trust badges.

FIX (Claude): the sentence already exists as the opening line of every product description. Set `custom.short_description` on all 21 products and render it between the H1 and the price in sections/dog-nook-product.liquid. No new writing needed — it is a move, exactly as the run #1 report concluded.

POSITION TEST: currently fails. The line that goes above the price should also carry the stage, e.g. "A week-one product — for the dog who still won't lie down properly." That is the single highest-leverage place to put the 3-3-3 frame, because it is the only copy a mobile shopper sees before deciding.


*Evidence:* Loaded https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 with --theme 193438056731 (asserted: 193438056731 "The Dog Nook — Design install (CRO working copy)" [unpublished]); mobile screenshot at /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/dn-donut-mobile.png. Competitor mobile shot at .../cdb-mobile.png


### 47. The PDP tells shoppers to "check the size guide" and there is no size guide on the page — all three sized competitors publish measurements plus breed examples

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


OURS: the FAQ answer (expanded in-browser) reads "Measure your dog curled up and check it against the size guide before ordering." There is no size guide anywhere on the page. The only dimension rendered on the entire PDP is one bullet in "The details": "Large, 80cm — suits most dogs up to Labrador size" — and it renders unchanged while SIZE: SMALL is selected (Small £29.99 / Medium £37.99 / Large £44.99 are all live). Grep of the full rendered body text returns exactly one "cm" outside the review text.

COMPETITOR HANDLING, copyable:
• calmingdogbeds — a "Size Chart" button directly under Add to cart opens a modal: five rows, each with cm + weight + named breeds ("Small 50cm (Up to 11 Lbs)"; "Medium 60cm (Up to 17 Lbs) — Jack Russell, Boston Terrier, Shih Tzu, Toy Poodle"; "Large 70cm (Up to 28 Lbs) — Poodle, Pug, French Bulldog"; "XL 80cm (Up to 44 Lbs)"; "XXL 100cm (Up to 77 Lbs)"), plus the rule "The perfect size for your pet is one that allows them to turn around but still leaves enough room for them to feel the sides of the bed when curled up" and "If you still have any confusion, contact us."
• My Anxious Dog — no modal; the measurements are plain body copy under the ATC, one line per size: "Medium Harness fits measurement 'A' girth 48cms to 65cms, maximum neck 'B' size Approx. 36cm. Suitable for Cocker Spaniel, Border Terrier, Whippet, Jack Russell Terrier, Mini Schnauzer." Then "Please reach out to us if you are unsure what size to order so we can advise."

SHARPEST POINT: one of our own genuine reviews on that page already supplies the missing information — Priya N., February 2026: "The outside measurement is a bit misleading because the big padded rim takes up some of it. I swapped ours for the next size and it's perfect now." A real customer is telling us the return driver, in public, on the page that causes it.

FIX (Claude): build the size-guide block (the template block already exists per run #1 and is empty), and populate it with the honest structure — external diameter, internal sleeping diameter (external minus rim), the "measure them curled, not stretched" rule, breed examples, and a per-product tie-break reason. Large/80cm is already known. Small and Medium exact cm need CJ (see separate owner finding) — ship the block now with Large populated and the two rows marked as being confirmed rather than leaving the whole block absent.

POSITION TEST: neutral on its own. Make it advance the position by tying size to stage — a dog in week one often sleeps pressed against a wall, which is an argument for the snugger size, not the bigger one.


*Evidence:* Loaded https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 (theme 193438056731 asserted), FAQ accordion force-expanded via Playwright; competitor size chart read from the rendered modal DOM of https://calmingdogbeds.co.uk/products/calming-donut-dog-bed; MAD sizing copy from https://myanxiousdog.co.uk/products/padded-yellow-anxious-harness


### 48. "Who are you" is invisible on our product page — all four competitors put a human or a legal identity on every page

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


OURS: the PDP footer collapses to two lines — "© 2026 The Dog Nook" and a "Terms and Policies" toggle. The trader identity block ("The Dog Nook is a trading name of Aryan Sarna, a sole trader based in the United Kingdom. Business address: 10 Old Farm Close, Hounslow, TW4 7AB · Email: hello@thedognook.co.uk") exists in the DOM but is inside that collapsed disclosure — it does not render until clicked. A shopper doing the standard wary-buyer check sees no name, no address, no phone, no reply promise, anywhere on the page.

COMPETITORS, all visible without a click:
• myanxiousdog.co.uk — a phone number and a personal email are in a contact block in the page furniture on every page: "07740723524 / sarahbeckleyjones@gmail.com". It is literally a named person's own email address, and it reads as more trustworthy than a support@ alias, not less.
• calmingdogbeds.co.uk — footer on every page: "CONTACT US — We are always here available for you! Address: Unit 2 Arenson Way, Dunstable LU5 4RZ, United Kingdom / +44 203 6174 965 / support@calmingdogbeds.co.uk".
• petremedy.co.uk — footer carries the registered address, "Company Number 13520256", "VAT Number GB391217109", patent numbers, and "Developed and made in the UK".
• adaptil.co.uk — "Recommended by veterinarians · Seen on TV · 25 clinical studies published · 20+ years of expertise" as a four-item strip on the PDP.

We cannot match vets or patents. We have something none of them have and are not using: the products were sold by hand before they were sold online.

FIX (Claude): a compact block under the buy box — "Chosen and packed by Aryan, Hounslow. Email hello@thedognook.co.uk and you get me, usually the same day." plus the sole-trader line uncollapsed in the footer. Also fix the homepage's "Registered UK trader" wording, which run #1 flagged: sole traders are not registered at Companies House, and "a real UK sole trader — a real person replies" is both true and stronger.

POSITION TEST: passes only if it carries the proof line. "Sold by hand before it was ever sold online" belongs here, next to the reviews it explains.


*Evidence:* Rendered body text of https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 (theme 193438056731 asserted) ends "© 2026 The Dog Nook / Terms and Policies"; identity strings read from the rendered footers of calmingdogbeds.co.uk, petremedy.co.uk and the header block of myanxiousdog.co.uk


### 49. We show a returns badge; competitors show a returns procedure — including the address and who pays

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


OURS, in full, on the PDP: "🛡️ 30-day money-back" in the badge strip, and "↩️ 30-day money-back guarantee" in the delivery block. That is every word the product page says about returns. No condition requirement, no returns address, no refund timing, no statement of who pays return postage.

COMPETITORS:
• myanxiousdog.co.uk/pages/info-returns — "If you wish to return your item within 30 days, please use our return form which you can download here"; "PLEASE NOTE OUR RETURNS ADDRESS IS 62 Horsham Road, Sandhurst, Berkshire, GU47 0YZ"; and an explicit condition rule: "If signs of use are present we will return the item back to you without a refund. Signs of use is that the item has been washed, excess hairs are inside the product or dirty or mud stains."
• calmingdogbeds.co.uk/policies/refund-policy — "We have a 14-day return policy... item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging"; "Important: Customers are responsible for the cost of return shipping"; then a numbered three-step RMA procedure and a photo requirement for damages.
• adaptil.co.uk — "Money back guarantee" shown inline next to the ATC alongside "In stock" and "Estimated delivery by: August 16".

Two openings nobody in this set takes: (1) separating the statutory 14-day CCR cancellation right from a voluntary 30-day goodwill window and saying so plainly — the incumbent's 14 days IS the statutory minimum dressed as a policy; (2) a donate-instead-of-return option on low-value items (an £11.99 lick mat costs more to reverse-ship than it's worth), which is both cheaper and exactly on-brand for a rescue store.

FIX (Claude): replace the badge with a four-line returns block on the PDP — the two windows stated separately, the condition rule, the returns address, and refund timing. Claude writes it and ships it; only the postage decision below is the owner's.


*Evidence:* Rendered PDP https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 (theme asserted); https://myanxiousdog.co.uk/pages/info-returns; https://calmingdogbeds.co.uk/policies/refund-policy


### 50. Decide who pays return postage — the page cannot legally stay silent, and the JSON-LD currently promises free returns

**impact** high · **effort** quick · **owner** owner · **evidence** loaded-page · **blocker** business-decision


This is the one part of the returns block Claude cannot write, because it is a margin decision on unsourced dropship goods.

The position today: the product page says only "30-day money-back"; the returns policy page says nothing about postage; and per run #1 the JSON-LD emits `returnFees: FreeReturn` on every product. Under the Consumer Contracts Regulations, if the trader does not tell the consumer before purchase that they bear the cost of returning goods, the trader pays. So the current state defaults to us paying, whether or not that was intended — and the structured data is separately telling Google we pay.

The comparator: calmingdogbeds states "Customers are responsible for the cost of return shipping" in plain words on the policy page. My Anxious Dog does not state it at all, which is the same exposure we have.

What's needed from the owner: one decision — customer pays, or we pay. Nothing else. The moment it is made, Claude aligns all four surfaces in one pass (PDP block, policy page, FAQ, JSON-LD).

Worth saying: if the answer is "we pay", it should be shouted, not buried. It is the single loudest available differentiator against an incumbent whose Trustpilot complaints are about refund friction, and it is the kind of promise the 3-3-3 position earns — a shop that expects some dogs won't take to a bed in week one.


*Evidence:* https://calmingdogbeds.co.uk/policies/refund-policy (competitor states it); our PDP rendered text contains no postage statement; JSON-LD returnFees claim carried over from audit/findings/2026-08-05-recon-report.md §5


*Blocker:* Only the owner can decide whether the business absorbs return postage on unsourced dropship goods — it is a margin and risk decision, not a content one.


### 51. Our 10 genuine reviews are our best asset and the page never says where they came from

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


GOOD NEWS FIRST, because it contradicts a queued TODO: the draft theme already renders "Based on 10 customer reviews" — NOT "verified reviews". The wording fix listed in STATUS.md as outstanding appears to be already deployed on 193438056731. Note the drift: snippets/dog-nook-pdp-extra.liquid in git still contains `Based on {{ rcount }} verified review{% if %}s{% endif %}`, so git and the draft theme disagree. Whoever closes that TODO should verify against the rendered page, not the repo.

WHAT'S MISSING: the reviews render as ten cards with a name, a month and strong specific bodies ("He didn't touch it on day one. On day three I found him curled up in it while I was making tea"). Nothing on the page explains that these were collected in person, before the shop existed. To a cold shopper, ten reviews with no purchase badge on a store with no photographs is the weakest possible reading of the strongest possible fact.

WHAT COMPETITORS DO WITH PROOF:
• calmingdogbeds — Loox, "(1,193)" beside the H1, photo reviews. We will never out-count that.
• adaptil — publishes "3.2 · 96 Reviews" openly on the PDP. A category leader displaying a 3.2 is a credibility move, not an accident; plus named story testimonials with the dog, the person and the situation ("HOME ALONE — Vinny doesn't like being left home alone" / "PUPPY — Suzanne wants to give Betty the best start in life").
• myanxiousdog — has Judge.me installed but the harness PDP rendered no rating widget at all. A direct competitor with zero visible reviews on its flagship product is worth knowing: the bar is lower than it looks.

FIX (Claude): one line above the review list — "These reviews were collected in person, from customers who bought from us by hand before The Dog Nook went online. They are real, and they are not Shopify-verified purchases — which is why we don't badge them as such." That converts the weakest-looking part of the page into the proof line from POSITIONING.md. Then adopt Adaptil's testimonial framing for the stage story: title each review by the moment it describes ("DAY THREE", "WEEK TWO").


*Evidence:* Rendered https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 (theme 193438056731 asserted) shows "4.8 · 10 reviews" and "Based on 10 customer reviews"; git file dog-nook-theme/snippets/dog-nook-pdp-extra.liquid line ~64 still says "verified review"; competitor proof read from rendered adaptil.co.uk and calmingdogbeds.co.uk PDPs


### 52. The gallery renders an internal art-direction note to customers: "PRODUCT ON CLEAN BACKGROUND"

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


The gallery is a single flat olive div, not an image — the deployed markup is `<div class="tdn-pdp__gallery"><div class="tdn-pdp__main" style="background: #8B9578;"><span class="tdn-pdp__ph">Product on clean background</span></div></div>`, one child, no thumbnails, no zoom. `document.querySelectorAll('.tdn-pdp__gallery img').length` is 0; in fact the ONLY `<img>` on the entire page is the hCaptcha logo in the footer. It occupies 300px of the mobile first screen and 460px of the desktop one. Two distinct problems: the missing photograph (owner, see next finding) and the placeholder STRING, which is a brief written for a photographer and is being shown to shoppers. Claude can change that string today so the empty state says something that holds trust while photos are pending — e.g. naming the stage the bed is for, or the honest "photographed at home, not in a studio — coming this week". Source: snippets/dog-nook-pdp-gallery.liquid:13.


*Evidence:* Deployed gallery innerHTML captured from theme 193438056731; galleryImgs=0, thumbs=0


### 53. The reviews no longer overclaim "verified" — but the page still never says where they came from

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Reporting the resolved half first because STATUS.md lists it as open: the PDP now renders "Based on 10 customer reviews", and the string "verified" does not appear anywhere in the rendered body text (checked with a case-insensitive test on document.body.innerText). Follow-up 1 in STATUS.md is DONE on this template — the wording no longer claims Shopify-verified purchases. What is still missing is the provenance, and it is both a trust asset and a DMCC evidence point. The page shows "4.8 · 10 reviews" on a store with no photographs and no visible order history, which invites exactly the doubt the recon run itself fell into. POSITIONING.md already supplies the answer as a headline proof line — "Sold by hand before it was ever sold online." Putting one honest sentence next to the rating ("collected in person from customers who bought from us before the shop went online — not Shopify-verified purchases") converts the store's weakest-looking signal into its strongest differentiator. Claude writes it. The separate private record of who/when/where sold remains the owner's 10-minute job, as already logged.


*Evidence:* Rendered text "Based on 10 customer reviews"; /verified/i test over document.body.innerText returned false on theme 193438056731


### 54. Selecting a size does not put ?variant= in the URL, so a refresh, a share or a back-button silently resets the shopper to Small

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


After clicking Medium (£37.99) and Large (£44.99) and confirming both the main price and the sticky bar updated, `location.href` was still `https://thedognook.co.uk/products/calming-donut-bed-1` with no query string in all three states. Consequences: a customer who shares the link to the size they chose sends the Small page; anyone returning via back-button or a refresh silently reverts to Small and may buy the wrong size; and analytics cannot attribute which variant a session was actually considering. Standard Shopify behaviour is to push `?variant=<id>` on selection. The variant ids are already in the deployed markup (`data-variant-id="52629887189275"` etc.) so this is a small addition to the selector's change handler. Note for whoever picks it up: the handler lives in the size-selector JS and the standing rule forbids touching assets/dog-nook.js — check which file actually binds `data-tdn-swatch` on the DRAFT theme before editing, and resolve the asset-drift question first if it turns out to be dog-nook.js.


*Evidence:* location.href captured after each of three scripted variant clicks on theme 193438056731; unchanged across Small/Medium/Large


### 55. Donut Bed shows an 80cm 'Large' claim while the Small variant is selected

**impact** medium · **effort** quick · **owner** owner · **evidence** loaded-page · **blocker** third-party


Loaded /products/calming-donut-bed-1. The page renders 'SIZE: SMALL' as the active variant while the description below still reads 'Large, 80cm — suits most dogs up to Labrador size', alongside a generic 'Size up if your dog likes space' tip. A customer choosing Small is shown an 80cm measurement. Claude can rewrite the copy so measurements are per-variant, but the actual Small and Medium dimensions have to come from CJ — nobody here can measure a product that only exists in a supplier's warehouse.


*Evidence:* https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 — grep 'Size' returned 'SIZE: SMALL' and 'Large, 80cm — suits most dogs up to Labrador size'


*Blocker:* The real Small and Medium dimensions exist only with CJ and require a supplier reply before any measurement can be published.


### 56. Eight of nine cards show an identical "4.8 · 10 reviews" with no word about where the reviews came from — the strongest proof line in the brand is invisible

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Rendered: The Calming Donut Bed, The Car Boot Liner, The First Days Kit, The Grooming Glove, The Lick Mat, The Nail Grinder, The Slow-Feeder Bowl and The Snuffle Mat each show five gold stars (computed rgb(224,184,76)) and the text "4.8 · 10 reviews", aria-label "4.8 out of 5 stars, 10 reviews". To be explicit, because run #1 got this wrong: I am NOT flagging these as fabricated. STATUS.md records the owner's confirmation that they are genuine, collected in person before the Shopify store opened, and I am treating that as settled. The finding is presentational. Eight products carrying the byte-identical figure 4.8/10 is the pattern a sceptical shopper reads as templated, and the store currently gives them nothing to reinterpret it with. POSITIONING.md hands you the answer — "sold by hand before it was ever sold online" — and it appears nowhere on this page. One line of microcopy next to the stars ("collected in person, before we opened online") turns the page's weakest-looking signal into its most distinctive one, and it is the honest description of the data, which also settles the separate "verified reviews" wording issue in the same stroke. Related good news: the empty state is honest. The Settle-In Bundle, which has no reviews, renders five PALE stars (computed rgb(216,205,185), class tdn-star--empty) with the word "New" and aria-label "No reviews yet" — no invented rating, and visually distinct from the gold. That mechanism is working correctly.


*Evidence:* Computed star colours per card: 8x rgb(224,184,76) with "4.8 · 10 reviews"; Settle-In 5x rgb(216,205,185) with "New", aria-label "No reviews yet"


### 57. RESOLVED since recon — do not re-raise: 'verified reviews' wording, cookie banner, footer social links

**impact** low · **effort** quick · **owner** claude · **evidence** loaded-page


Three items from the last run are already fixed on this draft theme and should be struck off so nobody redoes them. (1) The PDP 'verified reviews' overclaim is gone: /products/calming-donut-bed-1 greps zero hits for 'verified' and now renders 'Based on 10 customer reviews'. That closes STATUS.md follow-up (a). (2) The cookie banner IS present and renders on every page ('We use cookies … Privacy Policy. Decline / Accept all') — recon's owner-verifiable open question #6 is answered yes, though see the mobile z-index finding. (3) Footer social links are gone: grepping rendered text for Instagram|Facebook|TikTok|Pinterest returns zero hits, so recon quick-win #7 is done.


*Evidence:* browse.mjs --grep on /products/calming-donut-bed-1 ('verified' → 0 hits, 'Based on 10 customer reviews' → 1 hit) and on / (social names → 0 hits); cookie banner observed rendering at both widths


## Homepage  (6)


### 58. Hero headline 'Less anxious. More at home.' is the ASA-prohibited claim, in the largest type on the site

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


The hero renders eyebrow 'MADE FOR ANXIOUS & RESCUE DOGS' over an H1 'Less anxious. More at home.' and sub 'Calming beds, mats and grooming tools for dogs who need a little extra reassurance.' The brief's own rule is that the ASA treats anxiety as a health condition, so 'reduces anxiety' is not allowed but 'for dogs who find fireworks hard' is. 'Less anxious' is a direct outcome claim about a health condition, and it is the single biggest piece of text on the store. The product copy elsewhere observes the rule carefully; the hero does not.


*Evidence:* https://kkeqih-jm.myshopify.com/ hero section, rendered H1 at 1440px and 375px


### 59. The newsletter form gives the visitor no feedback at all — and has no success state in the markup

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Filled the homepage newsletter with a valid address and clicked 'Join the pack'. Instrumented the form: the click fires, the submit event fires and is NOT defaultPrevented, yet there was no document navigation within 15 seconds and the URL stayed at /. The section text is byte-identical before and after. The only network activity triggered was an hCaptcha challenge iframe (newassets.hcaptcha.com/captcha/.../hcaptcha.html) — Shopify spam protection intercepting the post. Honest caveat: an automated browser may fail an invisible captcha where a real human would pass, so I cannot claim the submission never reaches Shopify for a real visitor. What I can state independently of that: the theme has no success state to show even on the happy path. Scanning every stylesheet, the only success selectors present are Shopify's base '.contact-form__error, .contact-form__success', and querying the DOM for [class*=success], [class*=thanks], [class*=posted] returns an empty list. The form is a plain POST to /contact#contact_form with no JS handler. Recon item 15 called this 'designed and never built'; that is confirmed. Worth one check on a real phone to settle the captcha question.


*Evidence:* instrumented submit on https://kkeqih-jm.myshopify.com/ — log ['button click; defaultPrevented=false','submit fired; defaultPrevented=false']; waitForNavigation timeout at 15s; stylesheet scan and DOM query results as described


### 60. 'Reach for these when:' renders four filter-shaped chips that are inert <span>s — the one stage-selection affordance on the page does nothing

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


The page renders: 'Reach for these when:  Fireworks & storms  ·  Settling a new rescue  ·  Home alone  ·  Vet & travel days'. They are pill-shaped, tinted sage, sit directly above the grid in the exact position a filter row occupies, and are styled `border-radius: 999px; padding: 5px 12px; background: rgba(124,135,103,.1)`.

I queried the DOM for each one. All four are `<span class="tdn-coll-scenario">` with **no href, no role, no click handler**. They are decorative text. Confirmed in source: sections/dog-nook-collection.liquid renders `{%- for sc in scen -%}<span class="tdn-coll-scenario">{{ sc | strip }}</span>{%- endfor -%}` from a plain text setting split on '|'.

This is worse than having no filters. The chips advertise exactly the interaction the position needs — 'tell me your situation and I'll narrow this down' — and then refuse it. 'Settling a new rescue' is literally a stage door that is painted on.

Making these real links is the single cheapest positioning win on the page: /collections/settling-a-new-rescue already exists, so 'Settling a new rescue' can point at it today. The other three need either tag-filtered URLs (see the tags finding) or new collections.


*Evidence:* DOM query on https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731 returned 4 elements, all tag=SPAN, class='tdn-coll-scenario', href=null. Source: /home/user/sc/dog-nook-theme/sections/dog-nook-collection.liquid (scenarios block) and its schema default 'Fireworks & storms | Settling a new rescue | Home alone | Vet & travel days'


### 61. The cart offers the First Days Kit to a basket that already holds two of its three components — a duplicate purchase, while the obvious £14.99 add-on is never offered

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED + READ FILE. My cart contained The Snuffle Mat (£22.99) and The Lick Mat (£11.99), total £34.98. The cart's "You may also like" block offered The First Days Kit at £34.99 (strikethrough £49.97, "Sale" badge), as a plain product card with no explanatory text.

Per /home/user/sc/PROBLEMS-1.md:171, the First Days Kit IS "Lick + Snuffle + Slow-Feeder — £49.97 → £34.99, saving £14.98". So the cart is inviting a shopper to spend £34.99 on a kit of which they already have £34.98 worth in the basket. If they tap it, they buy a second Lick Mat and a second Snuffle Mat. Nothing on the page warns them.

Meanwhile the genuinely correct moves are offered nowhere:
  • Add The Slow-Feeder Bowl (£14.99) → £49.97, clears the £35 threshold, completes the kit.
  • Or swap the two loose mats for the First Days Kit at £34.99 and get all three for 1p more than they are already paying for two — a true, checkable, no-urgency £14.98 saving, and exactly the "three days decompress" story the store is built on.

This is the single clearest AOV opportunity I saw on the page, and it is also a consumer-fairness point: presenting a bundle to someone who already holds its parts, with no disclosure, is the kind of thing DMCC 2024 scrutiny lands on.

Ruled out: this is not a data problem. The component mapping already exists as custom.bundle_handle on the products (STATUS.md: "mats/feeder → First Days, bed → Settle-In"). It is simply that the cart block is a static hand-picked list (finding #3) with no logic behind it.


*Evidence:* Cart £34.98 (Snuffle Mat £22.99 + Lick Mat £11.99) on theme 193438056731; cross-sell card rendered "The First Days Kit  £34.99  £49.97  Sale". Contents per /home/user/sc/PROBLEMS-1.md:171 — "First Days Kit (the-new-rescue-bundle-1) | Lick + Snuffle + Slow-Feeder | £49.97 | £34.99 | £14.98"


### 62. POSITIONING GAP (observed on the draft theme): the 3-3-3 position is nowhere on the homepage

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


I loaded the draft preview with the theme ID asserted, so this is not a source-level guess — the browser confirmed 'theme : 193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]', status 200.

Text greps against the rendered homepage:
- '3-3-3' → 0 hits
- 'first three months' → 0 hits
- 'decompress' → 0 hits
- '3 days' → 0 hits
- '3 weeks' → 0 hits
- 'Where' → 2 hits, and the only relevant one is the section heading 'Pick the kit that fits where your dog is'
- 'First Days' → 5 hits, 'Settle-In' → 2 hits, '£34.99' → 1, '£64.99' → 1

So the bundles are named for the stages, and one heading gestures at the question, but the timeline that the whole position rests on is not stated anywhere a visitor can read it. A shopper cannot work out which stage their dog is at, because the page never tells them the stages exist. POSITIONING.md's own test — 'does this help someone work out which stage their dog is at' — currently fails on the single most important surface.

This also means the price ladder reads exactly as POSITIONING.md warned: three numbers (£34.99 / £64.99) with no reason to climb. Every pricing recommendation in this report is worth less until the ladder has the stage labels on it, because the ladder's job is to answer 'where is your dog', not 'how much do you want to spend'.

Claude's job: this is theme copy and section settings on the draft theme — writing the stage labels, the timeline strip and the three-door hero. No sourcing, no photo, no admin screen needed.


*Evidence:* node tools/agent-browser/browse.mjs https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731 --theme 193438056731 — theme assertion passed, greps as listed


### 63. Homepage says 'Registered UK trader' while the footer correctly says sole trader

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


The trust strip renders '🇬🇧 A real UK business / Registered UK trader — a real person replies'. The footer on product pages renders 'The Dog Nook is a trading name of Aryan Sarna, a sole trader based in the United Kingdom. Business address: 10 Old Farm Close, Hounslow, TW4 7AB'. Sole traders are not registered at Companies House, so the homepage overclaims against the site's own correct disclosure. Recon quick-win #6 flagged this; it has not been applied to the draft theme.


*Evidence:* grep of rendered homepage text returned 1 hit: 'Registered UK trader — a real person replies'; footer text read on /products/the-settle-in-bundle


## Homepage — quiz  (1)


### 64. POSITIONING: the quiz asks dog size instead of 'how long have you had them', and the size answer is decorative

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Drove the quiz to completion. It is three steps: Q1 'What's the hardest moment right now?' (5 answers), Q2 'How big is your dog?' (Small/Medium/Large), Q3 'Where shall we send your result?' (email, skippable via 'Just show me the result'). I ran six full paths. The recommendation is carried entirely on Q1's buttons as data attributes (data-rec-url / data-rec-title / data-rec-price). Q2 changes nothing but a trailing sentence: 'Just adopted + Large' and 'Just adopted + Small' both return The Settle-In Bundle, /products/the-settle-in-bundle, £64.99 — only the copy changes to 'Sized for a big dog' / 'Sized for a small dog'. POSITIONING.md names the fix precisely: replace Q2 with 'How long have you had them?', which 'alone routes people to the right stage'. As built, the quiz's second question does no work at all.


*Evidence:* six scripted runs on https://kkeqih-jm.myshopify.com/ quiz; Q1 button dataset e.g. {"recUrl":"/products/the-settle-in-bundle","recTitle":"The Settle-In Bundle"}


## Collection pages  (13)


### 65. The filter chips are category-only (Calming / Grooming / Feeding / Travel) — the one control on the page that could ask "which stage?" asks "what shelf?" instead

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Five chips render: All (/pages/shop, class `tdn-chip tdn-chip--on`), Calming (/collections/calming-essentials), Grooming (/collections/grooming), Feeding (/collections/mealtime-feeding), Travel (/collections/travel-outdoor). Each is 41px tall — comfortably tappable. They are a supply-side taxonomy: they describe what the product IS, not what the dog NEEDS. A new adopter three days in does not think "I need the Feeding category"; they think "he won't eat". Against POSITIONING.md's test this is a clean miss even though the chips work correctly and look fine. The chips are section blocks with `block.settings.label` / `block.settings.url` (sections/dog-nook-shop.liquid:20-23), so adding or replacing them is theme-settings work Claude can deploy to the draft: a first row of stage chips (Day 1-3 / Week 1-3 / Month 1-3) with category chips demoted to a second row, backed by three stage collections.


*Evidence:* Rendered chips with hrefs, measured 41px tall; /home/user/sc/dog-nook-theme/sections/dog-nook-shop.liquid:20-23


### 66. Mobile 375px: every element runs edge-to-edge — the collection page has zero horizontal padding on a phone

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Loaded https://kkeqih-jm.myshopify.com/collections/calming-essentials at a 375px viewport with the theme asserted as 193438056731. Measured computed style on <section class="tdn-section tdn-wrap">: padding = '44px 0px'. Left/right padding is literally 0. Every block measured x=0, width=375, right=375: the banner, the intro paragraph, the scenario chips, the product grid and the 'Good to know' accordions all touch both screen edges. Product card 1 spans x=0→179 and card 2 spans x=197→375, so both outer card edges are flush against the glass with no gutter.

CAUSE, proven from source: assets/dog-nook.css line 58 sets `.tdn-wrap { max-width: var(--tdn-maxw); margin: 0 auto; padding: 0 var(--tdn-side-pad); }`. Line 59 then sets `.tdn-section { padding: 64px 0; }` and line 60 `@media (max-width: 760px) { .tdn-section { padding: 44px 0; } }`. Both classes are on the same element, both are single-class selectors (equal specificity), and `.tdn-section` is declared LATER — so its shorthand wins outright and resets left/right padding to 0. The live computed value '44px 0px' matches line 60 exactly. `--tdn-side-pad` is defined and correct (40px, dropping to 20px at the narrow breakpoint, line 37/43) and is simply never applied. I also grepped dog-nook-cro.css, dog-nook-cro2.css and dog-nook-cro3.css: none of them define `.tdn-section`, `.tdn-wrap` or `--tdn-side-pad`, so nothing later restores it.

WHY IT WAS NEVER SPOTTED: on desktop `max-width` constrains the wrap to 1180px inside a 1440px viewport, so the 130px auto-margins produce a convincing gutter and the missing padding is invisible. At 375px max-width does not bind, so the bug is exposed. This is exactly the defect class that 'nothing has ever been checked on a phone' produces.

The page does NOT overflow horizontally (documentElement.scrollWidth 375 = window.innerWidth 375), so it is a cramped-layout defect, not a broken-scroll one.

Fix is one declaration: give `.tdn-section` `padding: 64px var(--tdn-side-pad)` (and 44px at the mobile breakpoint), or move the section's vertical padding onto a separate class. Applies site-wide, not just this page.


*Evidence:* Loaded https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731 at 375x812, Shopify.theme.id asserted 193438056731 (unpublished). Computed padding on .tdn-section.tdn-wrap = '44px 0px'; .tdn-wrap rect x=0 w=375. Source: /home/user/sc/dog-nook-theme/assets/dog-nook.css lines 58-60. Screenshot: /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/ce-mobile.png


### 67. The page says nothing about which stage the dog is at — the 3-3-3 position is absent from the collection surface entirely

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


POSITIONING GAP, and the largest one on this page. I read the full rendered body text of the collection page. The words 'three days', '3 days', 'three weeks', 'three months', 'decompress', 'settle in' and 'stage' do not appear anywhere. Nothing on the page helps a visitor work out where their dog is on the timeline, and nothing routes them to the stage that matches.

What renders instead: a banner ('COLLECTION / Calming Essentials'), a generic sentence, four inert chips, and three product cards sorted by nothing in particular. The First Days Kit (the Days 1-3 bundle, £34.99) sits in the grid as card #1 with no indication that it is the day-one answer — it is presented as just another tile beside a £11.99 lick mat and a £29.99 bed.

I also loaded /collections/settling-a-new-rescue — the collection POSITIONING.md names as 'the spine of the site, split into the three stages'. It renders as a flat, unsplit list of four products: The Snuffle Mat £22.99, The Lick Mat £11.99, The Calming Donut Bed £29.99, The Settle-In Bundle £64.99. There is no stage split, no stage labelling, and no ordering by stage. The spine of the position does not exist on the page yet.

Per POSITIONING.md's own test ('Does this help someone work out which stage their dog is at, and get them the right thing for it?') the collection template currently scores zero. It is a competent generic category grid — which is precisely the thing the positioning document says is not a pass.

The cheapest high-value version: the section already renders a per-collection banner and an intro slot, and the product card snippet already accepts a `tag_text` override for the pill. A stage label per product (a `custom.stage` metafield fed into the card pill) plus a three-door stage strip above the grid would put the position on the page without new design work.


*Evidence:* Full rendered body text of https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731 (theme asserted) contains no stage/timeline language. /collections/settling-a-new-rescue renders 4 unsegmented cards. Screenshots: scratchpad/ce-desktop.png, scratchpad/settle-desktop.png. Compared against /home/user/sc/POSITIONING.md


### 68. The same generic intro sentence and the same four chips render on all five collections, including where they are factually wrong

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


I loaded all five collections at 1440px with the theme asserted each time. Every one of them renders the identical sentence: 'Calm, considered kit for dogs who find the world a bit much — chosen to help them settle, sniff and unwind at their own pace.' And every one renders the identical chip row: 'Fireworks & storms / Settling a new rescue / Home alone / Vet & travel days'.

Verified on: calming-essentials, settling-a-new-rescue, mealtime-feeding, grooming, travel-outdoor.

CAUSE: templates/collection.json is a single shared template whose settings block contains only `banner_tone` and `show_filters`. `intro` and `scenarios` are not set, so every collection falls back to the schema defaults in sections/dog-nook-collection.liquid. This is the same structural fault as the bundle template that STATUS.md already flags as a live compliance risk — one hardcoded template serving many pages.

Two places where it actively misfires:
1. On /collections/grooming, a page containing a grooming glove and a nail grinder, the page tells the shopper to 'reach for these when: Fireworks & storms'. That is wrong.
2. On /collections/settling-a-new-rescue the generic sentence renders DIRECTLY BELOW a real, specific, well-written banner description ('The first few weeks with a rescue or newly-adopted dog can be unsettling — for both of you...'). Two intro paragraphs stack, and the generic one dilutes the specific one immediately after it lands.

Fix: move `intro` and `scenarios` out of shared defaults into per-collection values (metafields on the collection, or per-collection template overrides). This is also the enabler for the stage-labelling work.


*Evidence:* Loaded /collections/{calming-essentials,settling-a-new-rescue,mealtime-feeding,grooming,travel-outdoor} at 1440px, theme 193438056731 asserted on each; .tdn-coll-intro innerText and .tdn-coll-scenario list identical across all five. Source: /home/user/sc/dog-nook-theme/templates/collection.json (settings = banner_tone, show_filters only)


### 69. The Calming Donut Bed card shows a bare '£29.99' when the product runs £29.99–£44.99 — no 'From' prefix on any variant product

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


The card renders exactly '£29.99'. I fetched /products/calming-donut-bed-1.js: `price_varies: true`, `price_min: 2999`, `price_max: 4499`, variants Small=£29.99, Medium=£37.99, Large=£44.99.

So the collection page advertises £29.99 for a bed whose Large is £44.99 — 50% more. Per the run #1 report, the bed's own description still describes the Large ('80cm — suits most dogs up to Labrador size'), which is the variant most buyers of a donut bed will want. The shopper is shown the cheapest possible number, clicks, and finds the thing they were picturing costs half again as much.

CAUSE: snippets/dog-nook-product-card.liquid renders `{{ p.price | money }}` with no `price_varies` branch. There is no 'From' handling anywhere in the card.

This is the highest-value single SKU on the store and it is the one card where the price is misleading. Under DMCC 2024 a headline price that only the entry variant achieves is exactly the kind of price presentation the CMA looks at. Fix: `{%- if p.price_varies -%}From {{ p.price_min | money }}{%- else -%}{{ p.price | money }}{%- endif -%}`.

Note this needs care: the same card branch handles compare-at pricing for bundles (First Days Kit correctly renders '£34.99  £49.97  Save £14.98'), so the 'From' logic must not collide with the sale branch.


*Evidence:* Card innerText on /collections/calming-essentials = 'The Calming Donut Bed ... £29.99'. /products/calming-donut-bed-1.js returned price_varies=true, price_min=2999, price_max=4499, variants Small=2999/Medium=3799/Large=4499. Source: /home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid


### 70. Product photography — still the launch gate, and it is what the whole grid is waiting on

**impact** high · **effort** heavy · **owner** owner · **evidence** loaded-page · **blocker** physical-world


Included only because it is the dominant fact about how this page renders, not to re-litigate what STATUS.md and run #1 already cover.

Confirmed live rather than assumed: `document.querySelectorAll('img').length` on the collection page is **0**. Not one image element. I also confirmed `images: 0` on the three products I fetched via the storefront .js endpoint (calming-donut-bed-1, the-new-rescue-bundle-1, lick-mat-1). So the grid is three flat olive rectangles.

Everything else in this report is worth doing before the photos land — the padding bug, the 'From £X' price, the stage labelling, the placeholder treatment and the chips all improve the page as it stands today, and the placeholder work specifically stops mattering the moment photos exist, so do it cheaply.

One photography-brief note that follows from what I measured: `.tdn-product-card__media` is `aspect-ratio: 4 / 3` with `object-fit: cover`, and the rendered card media box is 177x132 at 375px and 282x211 at 1440px. Shoot to 4:3 with safe margins, or the crop will bite.


*Evidence:* https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731 — img element count = 0. /products/{calming-donut-bed-1,the-new-rescue-bundle-1,lick-mat-1}.js all report images: 0. Media box aspect-ratio 4/3 from /home/user/sc/dog-nook-theme/assets/dog-nook.css line 109; measured 177x132 at 375px.


*Blocker:* Photographing the products requires physically handling them and operating a camera, which no agent can do.


### 71. CORRECTION to recon: the category cards are real links, not dead '#' links — but they are sorted by product type, not stage

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


Recon quick-win #12 predicted the 'Find what your dog needs' cards 'almost certainly all link to #'. They do not. Every card resolves: /collections/settling-a-new-rescue, /collections/calming-essentials, /collections/grooming, /collections/mealtime-feeding, /collections/travel-outdoor, plus 'View all →' to /collections. That fix is done or was never broken. What is wrong is the taxonomy and the badge mapping: the cards are shop-by-product-type, which says nothing about stage, and the badges are crossed — 'Settling a New Rescue' carries 'Bundle inside · Save £7.98' (the £64.99 Settle-In) while 'Calming Essentials' carries 'Save £14.98' (the First Days Kit). The collection named for new rescues does not surface the first-days product.


*Evidence:* full anchor enumeration of the collections section on https://kkeqih-jm.myshopify.com/ — all five hrefs resolve to real collection paths


### 72. The chips are one-way doors: click one and you lose both the chip bar and the sort control

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


I clicked the "Calming" chip at 375px. It navigated to /collections/calming-essentials (theme still asserted 193438056731, title "Calming Essentials for Anxious Dogs – The Dog Nook", H1 "Calming Essentials", 3 cards: The First Days Kit, The Lick Mat, The Calming Donut Bed). On that page `document.querySelectorAll('.tdn-chip')` returns an EMPTY array and `[data-tdn-sort]` is absent. So a shopper who filters to Calming cannot then switch to Grooming or Feeding, and cannot sort — their only route is the "← Back to Shop all" link. Chips that look like an in-page filter but are actually one-way navigation into a template that drops the controls is a dead end at exactly the moment someone is browsing with intent. Claude can render the same chip block on the collection template with the current collection marked active.


*Evidence:* After clicking chip: url https://thedognook.co.uk/collections/calming-essentials, theme 193438056731, chips:[] and hasSort:false


### 73. No sort control exists on the collection page at all — but every card already carries dead data-price/data-title/data-date attributes

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


There is NO sort control on this page. Confirmed three ways: (1) zero `<select>` elements in the DOM; (2) no `.tdn-shop__sort` element; (3) sections/dog-nook-collection.liquid contains no sort markup of any kind.

To be precise about a run #1 item: the decorative 'Sort: Best selling ▾' that report flagged is a `sort_label` setting on sections/dog-nook-shop.liquid (schema label: 'Sort label (visual)'), which is used by templates/page.shop.json. It is on the Shop page, NOT on collection pages. On collection pages there is no sort affordance, real or fake.

The interesting part: every rendered card carries `data-price="3499" data-title="The First Days Kit" data-date="1783875689"` — exactly the three keys a client-side sort would need. I fetched all three deployed JS assets from the draft theme (dog-nook.js 4486 bytes, dog-nook-gallery.js, dog-nook-quiz.js) and searched them: **zero** references to data-price, dataset.price, sortBy or any sort function. The attributes are dead data. A sort was scaffolded into the markup and never built.

Positioning note: a plain price/date sort would be a generic-retailer answer. The sort this store actually wants is by stage — 'Day one first' — which the same data-attribute mechanism can drive off a stage metafield. Build the control once, order by stage by default.


*Evidence:* DOM on /collections/calming-essentials?preview_theme_id=193438056731: selects=[], .tdn-shop__sort absent. Live card markup: <a href="/products/the-new-rescue-bundle-1" class="tdn-product-card" data-price="3499" data-title="The First Days Kit" data-date="1783875689">. Fetched deployed dog-nook.js/dog-nook-gallery.js/dog-nook-quiz.js — 0 matches for sort logic. Source: /home/user/sc/dog-nook-theme/sections/dog-nook-shop.liquid (sort_label lives here, not on collections)


### 74. No filters render, and the built-in filter feature would render empty if switched on — every product has zero tags

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


No filter UI renders. Confirmed live: no `<form>` matching filter/facet selectors, no `<select>`, and `.tdn-coll-filters .tdn-chip` returns 0 elements.

CAUSE: templates/collection.json sets `"show_filters": false`. The feature exists in sections/dog-nook-collection.liquid — it renders an 'All' chip plus up to 6 tag chips from `collection.all_tags`, linking to `{{ collection.url }}/{{ tag | handleize }}`.

THE TRAP: flipping that toggle will not produce filters. I fetched three products via the storefront .js endpoint — calming-donut-bed-1, the-new-rescue-bundle-1, lick-mat-1 — and all three returned `tags: []`. With no tags, `collection.all_tags` is empty and the filter row would render a single lone 'All' chip. Anyone who 'fixes' this by setting show_filters=true will ship a filter bar with one useless button.

The work is therefore: write tags onto the catalogue FIRST, then enable. And per the position, the tags worth writing are stage tags (day-1 / week-1 / month-1) plus the four scenarios already promised in the chip row — which would simultaneously make the inert scenario chips real.

Related soft-404: I loaded /collections/calming-essentials/zzz-no-such-tag. It returned **status 200** and served the FULL unfiltered collection (all 3 cards) with the `<title>` unchanged ('Calming Essentials for Anxious Dogs – The Dog Nook'). So any mistyped or stale tag URL silently serves a duplicate of the collection rather than 404ing — worth a canonical or a redirect once tag URLs are actually in use.


*Evidence:* DOM on /collections/calming-essentials?preview_theme_id=193438056731: hasFilterForm=false, selects=[], .tdn-coll-filters .tdn-chip count=0. /products/{calming-donut-bed-1,the-new-rescue-bundle-1,lick-mat-1}.js all returned tags: []. /collections/calming-essentials/zzz-no-such-tag returned HTTP 200 with 3 cards. Source: /home/user/sc/dog-nook-theme/templates/collection.json (show_filters:false) and sections/dog-nook-collection.liquid


### 75. The grid is hardcoded to 4 columns and leaves visible empty cells — Travel & Outdoor renders one lone card beside three gaps

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Live computed grid on the collection page: `grid-template-columns: 281.5px 281.5px 281.5px 281.5px`, gap 18px, container 1180px. Source confirms `.tdn-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }` with `@media (max-width: 900px) { .tdn-grid-4 { grid-template-columns: repeat(2, 1fr); } }`.

Calming Essentials has exactly 3 products, so the fourth column renders empty — visible in the screenshot as a wide gap to the right of The Calming Donut Bed. At 375px the 2-column grid leaves the second cell of row 2 empty.

I loaded every collection to see how bad this gets. Product counts: settling-a-new-rescue 4 (fills the row), calming-essentials 3, mealtime-feeding 2, grooming 2, **travel-outdoor 1**. Travel & Outdoor renders a single card in a four-column grid — one product and three empty columns under a full-width banner.

A catalogue this small should not be forced into a fixed 4-up. `repeat(auto-fit, minmax(240px, 1fr))` with a max-width on the track, or a column count chosen from the product count, makes 1-3 products look intentional instead of broken. This costs nothing and materially changes how established the shop looks — which matters more than usual for a store with no photographs.


*Evidence:* Computed gridTemplateColumns on .tdn-grid-4 at 1440px = '281.5px 281.5px 281.5px 281.5px'. Card counts read live from .tdn-product-card on each collection: settling-a-new-rescue=4, calming-essentials=3, mealtime-feeding=2, grooming=2, travel-outdoor=1. Source: /home/user/sc/dog-nook-theme/assets/dog-nook.css lines 121, 124. Screenshot: scratchpad/ce-desktop.png


### 76. The collection banner is a large empty coloured slab on 4 of the 5 collections

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


The banner renders `COLLECTION` + the title + `collection.description` (truncated to 40 words). I checked `.tdn-coll-banner__desc` on every collection: it is **null** on calming-essentials, mealtime-feeding, grooming and travel-outdoor. Only settling-a-new-rescue has a description.

So on four of five collections the banner is a full-width olive block, 44px padding, containing nothing but an eyebrow and an H1 — roughly 230px of coloured space above the fold doing no selling. On the page I was asked to load, that is the first thing below the header.

And on the one collection that HAS a description, it is cut off mid-sentence: the banner renders '...as they learn that home is a…' — `truncatewords: 40` clipping a sentence that was clearly written to finish. Visible in the screenshot.

Both halves are Claude's to fix: write the four missing collection descriptions (and per the position, write them as stage-anchored — 'what your dog needs in the first 72 hours' rather than a category blurb), and either raise the truncation or truncate on a sentence boundary.


*Evidence:* .tdn-coll-banner__desc innerText read live on all five collections: null on calming-essentials, mealtime-feeding, grooming, travel-outdoor; on settling-a-new-rescue it ends '...as they learn that home is a...'. Source: sections/dog-nook-collection.liquid uses `{{ collection.description | strip_html | truncatewords: 40 }}`. Screenshots: scratchpad/ce-desktop.png, scratchpad/settle-desktop.png


### 77. EMPTY STATE: I could not make it render, so I am not reporting on how it looks — and run #1's claim about it does not reproduce

**impact** low · **effort** quick · **owner** claude · **evidence** loaded-page


Stating this plainly because the brief asks about empty states and I did not observe one.

I tried two ways to reach an empty state and both failed:
1. All five collections have at least one product (counts 4, 3, 2, 2, 1). None is empty.
2. I loaded /collections/calming-essentials/zzz-no-such-tag hoping an unmatched tag would empty the grid. Shopify returned **HTTP 200 and the full unfiltered collection** — all 3 cards rendered. The unknown tag was ignored.

So: **the empty state was NOT seen rendering. I am not describing its appearance.**

What I know from source only (read, not observed): sections/dog-nook-collection.liquid uses a `for...else` whose else branch emits `<p class="tdn-muted">No products in this collection yet.</p>` — and that `<p>` sits INSIDE the `.tdn-grid-4` container, so it would become a grid item constrained to one column (~281px desktop, ~179px mobile) rather than spanning the row. It has no CTA, no link back to Shop all, and no alternative suggestion. Those are source-level predictions and should be verified by whoever changes it.

CORRECTION TO RUN #1: that report's quick-win #25 says two collections are 100% draft products and 'currently render "No products in this collection yet" under a full-size banner'. That does not reproduce today — I loaded all five collections on the draft theme and every one rendered products. Either the catalogue changed since 5 August or the claim was inferred rather than observed. I make no accusation about which; I simply could not reproduce it and am flagging it so nobody schedules work against it.


*Evidence:* Loaded all 5 collections on theme 193438056731: card counts 4/3/2/2/1, zero empty. /collections/calming-essentials/zzz-no-such-tag returned HTTP 200 with 3 cards and unchanged <title>. Empty-state markup read (not observed) at /home/user/sc/dog-nook-theme/sections/dog-nook-collection.liquid. Screenshot of the attempt: scratchpad/empty-desktop.png


## Shop page  (1)


### 78. Sitewide: every `tdn-section tdn-wrap` block loses its side gutter — content sits flush against the screen edge on every phone

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


On /pages/shop at 375px the H1 "Comfort-first accessories", the intro paragraph, the chip row, the product grid and the footer all start at x=0 and the grid measures 375px wide in a 375px viewport. Zero gutter on both sides. I found the exact mechanism: the shop section's root element is `<section class="tdn-section tdn-wrap">` (sections/dog-nook-shop.liquid:14). In assets/dog-nook.css line 58 sets `.tdn-wrap { padding: 0 var(--tdn-side-pad) }` and line 59 sets `.tdn-section { padding: 64px 0 }`. Same specificity (0,1,0), `.tdn-section` declared second, and it is a SHORTHAND — so it resets left/right padding to 0. Line 60 (`@media (max-width:760px) { .tdn-section { padding: 44px 0 } }`) re-asserts it on mobile. Chrome DevTools protocol CSS.getMatchedStylesForNode confirms it: `.tdn-wrap`'s padding longhands resolve to empty (losing), `.tdn-section`'s resolve to padding-left:0px / padding-right:0px. The CSS variable is NOT the problem — it resolves correctly to 20px on the element. Proof by contrast on the same page: elements carrying ONLY `tdn-wrap` compute paddingLeft 20px; elements carrying `tdn-section tdn-wrap` compute 0px. Measured at 375/760/761/900/1440 — padding is 0px at ALL of them; the 130px gutter you see on a 1440px desktop is purely `max-width:1180px; margin:0 auto` centring, so the bug is invisible above 1180px and present on every viewport below it. Eleven sections combine the two classes, including the PDP (dog-nook-product.liquid:15), the quiz, the bundle page, both collection templates and the featured-bundle section. Verified live at 375px on / , /products/calming-donut-bed-1 and /collections/calming-essentials — all show 0px. The homepage is the worst case: `tdn-hero-b__inner` and `tdn-trust` have 20px gutters while the sections below them have 0px, so the page visibly jitters between indented and edge-to-edge as you scroll. Fix is one line: split `.tdn-section`'s shorthand into padding-top/padding-bottom longhands (both occurrences).


*Evidence:* https://kkeqih-jm.myshopify.com/pages/shop?preview_theme_id=193438056731 at 375px: .tdn-wrap computed paddingLeft/Right = 0px/0px, rect x=0 w=375. /home/user/sc/dog-nook-theme/assets/dog-nook.css:58-60. /home/user/sc/dog-nook-theme/sections/dog-nook-shop.liquid:14


## Cart & checkout  (10)


### 79. The cart page renders, but has NO free-delivery progress bar — the built one is architecturally excluded from /cart

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED. https://kkeqih-jm.myshopify.com//cart?preview_theme_id=193438056731 returns HTTP 200, title "Your Shopping Cart – The Dog Nook", and window.Shopify.theme asserted as 193438056731 ("The Dog Nook — Design install (CRO working copy)") [unpublished] on every run below. It redirects to https://thedognook.co.uk/cart. So yes, a cart page exists and works.

I built three real carts by permalink and loaded /cart for each:
  • EMPTY — renders "Your cart is empty" / "Have an account? Log in to check out faster." / "Continue shopping".
  • £34.98 (Snuffle Mat £22.99 + Lick Mat £11.99) — renders "Cart total £34.98 GBP", "Estimated total £34.98 GBP", "Taxes and shipping calculated at checkout.", "Check out", Shop Pay and G Pay buttons.
  • £64.97 (+ Car Boot Liner £29.99) — renders "Cart total £64.97 GBP".

In ALL THREE states there is no progress bar and no threshold message. A DOM query for progress, [class*="progress"], [class*="shipping-bar"], [class*="free-ship"], [class*="free-delivery"], [class*="threshold"] returned ZERO elements. A regex over the full 306KB of rendered HTML for "away from free" / "free delivery" / "free shipping" / "spend … more" returned ZERO hits. The only mention of the threshold anywhere on the page is the announcement bar at the very top: "Free UK delivery over £35 · Fast dispatch · Made for anxious & rescue dogs".

The £34.98 cart is the damning case: the shopper is TWO PENCE from free delivery and the page says nothing. The £64.97 cart is equally silent — no "you've unlocked free UK delivery" either. The mechanic does zero work in both directions.

WHY (I ruled out the obvious innocent explanations before blaming anyone):
1. "It was never built." FALSE. Two working implementations exist: snippets/dog-nook-cart-progress.liquid (Liquid-computed, threshold_cents = 3500) and snippets/dog-nook-freeship-bar.liquid (JS-driven).
2. "It was built but never deployed." FALSE. I forced the drawer open with dialog.showModal() on /collections/all with an £11.99 cart and it rendered correctly: "You're £23.01 away from free delivery" with .tdn-freeship__fill at style="width: 34%". The maths is right (35.00 − 11.99 = 23.01; 11.99/35 = 34%). Screenshot saved. It is deployed and it works.
3. The actual cause, read from the file: store-config/cart-drawer.liquid line 11 reads {%- if settings.cart_type == 'drawer' and template.name != 'cart' -%}, and the bar is rendered at line 114 inside that guard. So the drawer — and with it the progress bar — is deliberately NOT rendered on the cart template. That is Horizon's own convention (drawer replaces the cart page), and the README notes the bar was designed "for the cart drawer". Nobody did anything wrong; the bar simply lives in a container that the cart page excludes, and no one has put it on the cart page.

So the bar is reachable ONLY by tapping the header cart icon from a non-cart page. Confirmed: on /collections/all the header control is <button aria-label="Cart" class="header-actions__action button-unstyled"> and tapping it opened the drawer showing "You're £23.01 away from free delivery". But on /cart itself the same header control is <a href="/cart"> and no drawer exists.

FIX: create templates/cart.json with a section that renders the existing snippet (or add it to the cart section), so the bar shows on the page every add-to-cart lands on. Do not touch assets/dog-nook.js — dog-nook-cart-progress.liquid is pure Liquid and needs no JS.

Compounding: the First Days Kit is £34.99 — 1p under the threshold — and it is one of the four products the cart cross-sells. A shopper who buys only it lands on a cart page that tells them nothing about being 1p short.


*Evidence:* https://thedognook.co.uk/cart on theme 193438056731 — cart £34.98: "Estimated total £34.98 GBP"; DOM query for progress/shipping-bar/free-delivery classes = 0 elements; HTML regex for "away from free|free delivery|free shipping" = 0 hits. Forced drawer on /collections/all: "You're £23.01 away from free delivery", .tdn-freeship__fill width:34%. Guard: /home/user/sc/dog-nook-theme/store-config/cart-drawer.liquid:11 `{%- if settings.cart_type == 'drawer' and template.name != 'cart' -%}`, bar rendered at :114


### 80. Add to Cart is a plain form POST that navigates to /cart — it dumps every shopper on the one page the progress bar cannot render on

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED, theme-asserted 193438056731. On https://thedognook.co.uk/products/lick-mat-1 at 375px I found two "Add to Cart" buttons, both reporting form action=/cart/add method=post. I clicked one. Result: the browser NAVIGATED AWAY to https://thedognook.co.uk/cart, and a post-click query for open dialogs / cart-drawer elements returned an empty array. No drawer opened.

Read-file confirmation of the mechanism: sections/dog-nook-product.liquid:84 and snippets/dog-nook-pdp-form.liquid:50 both emit <button type="submit" ... data-tdn-atc>, and the only handler for data-tdn-atc in assets/dog-nook.js (line 47) sets btn.disabled and swaps the label on variant change. Nothing intercepts submit. So it is a genuine full-page form POST.

This is what makes finding #1 fatal rather than cosmetic. The theme's cart_type IS set to 'drawer' — the header cart button opens the drawer on non-cart pages, and I saw the progress bar inside it. But the default add-to-cart journey never opens the drawer; it navigates the shopper to /cart, which is precisely the template where the drawer (and the bar) is suppressed. Net effect: at the single highest-intent moment in the whole funnel — item just added — the customer sees no progress bar, no threshold message, and no reason to add anything else.

Ruled out: this is not a Horizon default. Horizon's native ATC is AJAX and opens the drawer when cart_type is 'drawer'. The custom TDN PDP section replaced it with a submit button and no fetch handler, so the two halves of the design are inconsistent with each other.

FIX WITHOUT TOUCHING FORBIDDEN FILES: add a new asset (e.g. assets/dog-nook-cart-ajax.js) loaded from snippets/dog-nook-head.liquid that intercepts submit on the PDP form, POSTs to /cart/add.js, and opens the existing drawer. assets/dog-nook.js and assets/dog-nook-cro.css stay untouched. Either that, or put the bar on /cart (finding #1) — doing both is best.


*Evidence:* PDP theme-asserted 193438056731; ATC buttons: [{"text":"Add to Cart","form":"/cart/add post"},{"text":"Add to Cart","form":"/cart/add post"}]; after click → https://thedognook.co.uk/cart (NAVIGATED AWAY), post-ATC visible drawers: []. Code: /home/user/sc/dog-nook-theme/sections/dog-nook-product.liquid:84, /home/user/sc/dog-nook-theme/assets/dog-nook.js:47


### 81. The cart cross-sell is a hardcoded 4-product list — byte-identical for an empty cart, a £34.98 cart and a £64.97 cart

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED. A cross-sell block DOES exist on /cart, headed "You may also like" with a "View all" link. It is section id shopify-section-template--28588268093723__product_list_NNFgcy — a manually-curated Product List section, not Shopify's recommendation engine. A DOM query for product-recommendations, [class*="recommend"], [class*="cross-sell"], [class*="upsell"] returned ZERO elements, so nothing on the page is cart-aware.

I loaded it in four different cart states and got the same four products in the same order every time:
  • The Calming Donut Bed £29.99
  • The Car Boot Liner £29.99
  • The First Days Kit £34.99 (was £49.97, "Sale")
  • The Grooming Glove £11.99

States tested: empty cart (desktop); £34.98 Snuffle+Lick (desktop 1440px); £34.98 (mobile 375px); £64.97 Snuffle+Lick+Boot Liner (mobile 375px). Identical in all four — including still recommending the Car Boot Liner to a cart that already contained the Car Boot Liner.

This is not "the cross-sell is missing" — it is present and it is inert. It cannot close the free-delivery gap (the two cheapest options are £11.99 and £29.99; from £34.98 you need 2p), it cannot respond to what is in the basket, and it cannot respond to who the shopper is.

FIX: swap the static Product List for cart-aware recommendations. The catalogue already has the wiring — custom.bundle_handle maps mats/feeder → First Days Kit and bed → Settle-In Bundle (per STATUS.md). A cart-aware block driven off that metafield plus the remaining-to-threshold figure is buildable entirely in Liquid.


*Evidence:* Section id shopify-section-template--28588268093723__product_list_NNFgcy identical across 4 cart states; DOM query for product-recommendations/[class*=recommend]/[class*=cross-sell]/[class*=upsell] = 0 elements; same 4 products (Donut Bed £29.99, Car Boot Liner £29.99, First Days Kit £34.99/£49.97, Grooming Glove £11.99) in every state


### 82. POSITIONING GAP: the cart page contains not one word about which stage the dog is at — the 3-3-3 spine stops dead at the basket

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED. I dumped the complete rendered body text of /cart at both widths, in three cart states. Across all of it there is no occurrence of "3-3-3", "first days", "decompress", "settle", "three days", "three weeks", "three months", "rescue", or any stage language. The only brand sentence on the entire page is the announcement bar: "Free UK delivery over £35 · Fast dispatch · Made for anxious & rescue dogs". Everything else is Shopify-generic: "Cart", "Discount", "Estimated total", "Taxes and shipping calculated at checkout.", "Check out", "You may also like".

Measured against POSITIONING.md's test — "does this help someone work out which stage their dog is at, and get them the right thing for it?" — the cart page scores zero, and it does so at the moment the answer is most knowable. A basket holding a Lick Mat and a Snuffle Mat is an unambiguous Days 1–3 signal; the store already knows the stage and says nothing.

What the page could say, using only true, ASA-safe, non-urgency copy the project already owns:
  • Name the stage back to them: "These are first-days items — what many rescues tell adopters is that the first 72 hours are about decompression."
  • Then the honest next step, which is also the upsell: the Slow-Feeder that completes the First Days Kit, or the Settle-In Bundle for weeks 1–3.
  • Carry the proof line — "Sold by hand before it was ever sold online" — into the one place a nervous buyer is deciding whether to trust a shop with no photos.

Note this is NOT "the cart is worse than a competitor's". Structurally it is a perfectly competent Horizon cart. It is a positioning miss precisely because it is generic: it is the same cart any of 200,000 Shopify stores has, on the store whose entire claim is that it is organised around a timeline nobody else has claimed.

Also absent and worth adding at the same time: no reassurance block at all on the cart (who ships it, from where, how long, who pays return postage). The recon report's competitor analysis showed the incumbent's Trustpilot complaints cluster on exactly those four points, and the cart is where a burned buyer hesitates.


*Evidence:* Full body innerText of https://thedognook.co.uk/cart on theme 193438056731, 3 cart states × 2 viewports — zero occurrences of 3-3-3 / first days / decompress / settle / rescue outside the announcement bar; page text is "Cart / Discount / Estimated total / Taxes and shipping calculated at checkout. / Check out / You may also like"


### 83. Cart line items and every cross-sell card render as blank grey rectangles — no product photography

**impact** high · **effort** medium · **owner** owner · **evidence** loaded-page · **blocker** physical-world


CONFIRMED LOADED at both 1440px and 375px, theme-asserted 193438056731. Screenshots read.

On the cart line items the image column renders but is empty — The Snuffle Mat and The Lick Mat rows have a reserved image area with nothing in it, and the accessible label "Product image" appears in the text dump with no image behind it. In the "You may also like" grid all four cards are large pale-grey blocks with the product name overlaid as text, roughly 168×216 each on mobile and 340×340 on desktop — they are placeholders, not products.

This is already logged as the launch gate in STATUS.md ("BLOCKED — PRODUCT PHOTOS ← the launch gate"). I am recording it here because the cart is where its cost is highest and it had not been checked: the cart is the page where a shopper decides whether this shop is real, and every visual on it is currently a grey box. On a phone the cross-sell grid is roughly 40% of the page height and is entirely empty rectangles.

Why this is the owner's and not Claude's: it needs a camera and the physical products in the room. Claude can write every word around the images, and should — but cannot create them.

One thing Claude CAN do in the meantime and should be asked to: the cart image slot currently renders as an undifferentiated grey void. A branded placeholder carrying the product's stage ("Days 1–3") would at least make the empty state say something true and on-position rather than reading as a broken image.


*Blocker:* Producing product photographs requires a camera and the physical products in hand; no agent can generate genuine images of goods it cannot see.


### 84. MOBILE 375px: the "Sale" badge sits on top of the product title on the cross-sell card — it reads "The First Day[Sale] Kit"

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED at 375×812, iPhone UA, theme-asserted 193438056731. Screenshot saved and read.

In the cart's "You may also like" grid the cards go two-up at 375px, so titles wrap to two lines. On The First Days Kit card the title wraps to "The First Days / Kit" and the terracotta "Sale" pill is absolutely positioned over the end of line one, covering the word "Days". The card visually reads "The First Day⬤ Kit". Measured rects: badge [137,654 → 176,677], title box [16,646 → 184,814] — a genuine geometric intersection, not a false positive from an overlay wrapper (I checked; the badge rect sits inside the title's text line).

This does not happen at 1440px, where the title fits on one line and the badge clears it. It has never been seen because, per the brief, nothing has ever been checked on a phone — and mobile is where most traffic will land.

It is also the worst possible card to break: the First Days Kit is the entry rung of the whole stage ladder, and the damaged word is "Days", the one word that carries the 3-3-3 position.

FIX: give the card title a top padding equal to the badge height, or move the badge to the image's bottom-left, or reserve a badge row above the title. A few lines of CSS — but NOT in assets/dog-nook-cro.css (forbidden); use the section's own stylesheet or a new asset.


*Evidence:* 375×812 screenshot of https://thedognook.co.uk/cart, theme 193438056731 — badge rect [137,654,176,677] intersects title rect [16,646,184,814]; badge text "Sale", title "The First Days Kit"; renders as "The First Day(Sale) Kit"


### 85. MOBILE 375px: the cross-sell's quick-add buttons are display:none — a phone shopper cannot add anything from the cart without leaving it

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED at 375×812, theme-asserted 193438056731. I enumerated every control inside the cross-sell section and read its computed style. Every quick-add button is switched off:
  BUTTON "Add" 0x0 vis=0 disp=none  (×3)
  BUTTON "Choose" 0x0 vis=0 disp=none
Only the product-title anchors are live (168×216 tap areas).

At 1440px the same buttons ARE rendered and readable — the desktop text dump contains "Choose" under The Calming Donut Bed and "Add" under the Car Boot Liner, First Days Kit and Grooming Glove. So the buttons are desktop-hover-reveal controls with no touch equivalent.

Consequence on a phone: the only way to act on a cross-sell is to tap through to the PDP, which (per finding #2) then does a form POST back to /cart. That is a full page load out, a page load back, and a lost scroll position, for what should be one tap. On the store's dominant device, the cart's only AOV mechanism costs two navigations.

Ruled out: this is not the buttons failing to load. They are present in the DOM with correct labels and are explicitly display:none at this breakpoint — a deliberate hover-only pattern that simply has no mobile fallback.


*Evidence:* 375px probe of cross-sell section shopify-section-template--28588268093723__product_list_NNFgcy: BUTTON "Add" 0x0 vis=0 disp=none ×3, BUTTON "Choose" 0x0 vis=0 disp=none; same buttons render at 1440px (desktop text dump contains "Choose" and "Add")


### 86. MOBILE 375px: quantity stepper and remove controls are below the 44px touch minimum

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


CONFIRMED LOADED at 375×812 with isMobile/hasTouch, theme-asserted 193438056731. I measured every a/button/input on the page. Undersized interactive controls on the cart line items:
  INPUT "Quantity" 36×28  (×2, one per line item)
  A "The Snuffle Mat" 124×26, A "The Lick Mat" 99×26 (product links, 26px tall)
  A "View all" 51×22
  Footer links throughout at 17px tall (Shop all, Collections, Shipping Policy, Refund & Returns, etc.)
At desktop the steppers measure 36×36 and the quantity input 33×24 — also under, but far less consequential with a mouse.

Apple's and Google's guidance are 44pt and 48dp respectively. A 28px-tall quantity field between two steppers on the checkout path is the classic mis-tap: the shopper aims for "+" and hits the input, or aims for the input and hits "remove". On the cart page a mis-tap costs the line item.

The good news, stated plainly because I checked for it: the page does NOT overflow horizontally at 375px. document.documentElement.scrollWidth = 375 and window.innerWidth = 375 — an exact match, no runaway element. The layout stacks correctly, the summary block moves below the line items, the cross-sell goes two-up, and the footer reflows cleanly. Structurally the mobile cart is sound; it is the touch ergonomics and the missing content that are wrong.


*Evidence:* 375×812 measurement on https://thedognook.co.uk/cart theme 193438056731: INPUT "Quantity" 36x28 ×2; A "The Snuffle Mat" 124x26; A "View all" 51x22; footer links 17px tall. scrollWidth 375 = innerWidth 375 (no horizontal overflow)


### 87. PetBuds is the live precedent to watch — a UK Shopify pet retailer already doing stage-to-product mapping, published Jan 2026

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Of everything found, petbuds.co.uk is the only UK retailer that has already connected 3-3-3 stages to purchasable products. Its article maps a chew-proof bed to the 3-day decompression stage, chew-proof toys to the 3-week stage and a licking mat to the 3-month stage, with Add to Cart and Quick Add controls rendered inline. It was published 08 Jan 2026 — seven months before this audit — which means it has had time to accumulate the SEO age that The Dog Nook's blog (still zero articles per STATUS.md) has not. Two implications. First, the content play is no longer a blank field: any Dog Nook 3-3-3 article is now entering a market with an incumbent that has a seven-month head start and an established domain. Second, PetBuds has demonstrated the intent but not the architecture — it has no stage bundles and no stage navigation — so the structural play is still open, but the window is narrower than run #1 implied and this is an argument for building the stage structure before writing the stage articles.


*Evidence:* https://petbuds.co.uk/blogs/news/3-3-3-rule-dogs-adjust-new-home — UK retailer (Bradford WF17 5LG), pub. 08 Jan 2026, bed/toys/lick mat mapped to the three stages with Add to Cart inline


### 88. Our delivery promise is a range; Adaptil shows a date. And ours still asserts a transit time nobody has measured

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


OURS, on the PDP: "🚚 Dispatched within 1–2 days · Delivered in 4–7 working days · Free UK delivery over £35", repeated as "Dispatched within 1–2 days · Delivered in 4–7 days" at the foot of the description.

COMPETITORS:
• adaptil.co.uk PDP — "In stock" · "You got free shipping" · ADD TO CART · "Estimated delivery by: August 16" · "Money back guarantee". A calendar date beats a range at the moment of decision, and it is generated, not written.
• calmingdogbeds — splits the two numbers explicitly: "Handling Time: 1-3 Working Days. Delivery Time: 2-7 Working Days", and states origin: "proudly shipped from our United Kingdom-based warehouse". (Worth noting for the objection block: their product JSON-LD SKUs are of the form "1005003070031111-Dark Grey-S-50CM-CDBUK" — a 16-digit ID in AliExpress's format. I am flagging the pattern, not asserting their fulfilment model; their Trustpilot complaints about "not shipped from the UK as claimed" are the thing to verify, and run #1 already said to read that page directly before quoting it.)
• petremedy — "UK Standard delivery – FREE delivery for orders £10 and over... Standard delivery orders are sent by Royal Mail 1st Class. Please allow up to 5 days", plus a "Delivery Information" TAB on the product page itself, next to Description.

The honest problem: our "4–7 working days" is, per run #1, unverified against CJ's real China→UK transit of 7–17 days, and the Bonfire cutoff was set to 15 Oct precisely because of that. Under the Consumer Contracts Regulations the delivery estimate is a pre-contract statement.

FIX (Claude, now): add a Pet Remedy-style delivery tab/accordion to the PDP that separates dispatch from transit, and switch the range to a computed "Order today, estimated arrival by [date]" so it degrades gracefully when the real number lands. FIX (owner, one email): the actual CJ transit figure and whether bundles ship as one parcel — after which Claude aligns the PDP, FAQ, shipping policy and bundle FAQs in one pass.


*Evidence:* Rendered PDP https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 (theme asserted); https://www.adaptil.co.uk/products/adaptil-calm-starter-kit; https://calmingdogbeds.co.uk/policies/shipping-policy; https://petremedy.co.uk/product/puppy-calming-kit/ footer delivery block and product tabs; JSON-LD SKU strings from the calmingdogbeds product page source


## Email capture  (3)


### 89. On mobile a 10%-off popup covers the entire product 12.7 seconds after load, on top of the cookie banner that is already there

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Timed on the live draft at 375px: `.tdn-emailpop` becomes visible 12,710ms after navigation. It is `position: fixed` with a full-screen scrim and does not move when you scroll — I captured it still covering the product at scroll offset 812. It reads "JOIN THE PACK / Get 10% off your first order / Calm-dog tips and early access to new bundles — plus a code for your first order. No spam, unsubscribe anytime." with an email field, a "Get my 10% code" button and "No thanks". Underneath it, still unactioned, sits the cookie banner ("We use cookies… Decline / Accept all"). So the phone user gets two stacked interruptions, and the cookie choice — the one that is legally required and blocking — is buried UNDER the marketing popup; my automation could not click "Accept all" while the promo was up, which is exactly what a thumb will experience. On a 812px-tall screen this covers the price, the size selector and both buy buttons. Claude can fix: gate the popup on cookie consent being answered first, raise the delay or switch it to exit/scroll intent, and suppress it entirely on the PDP where the user is already converting.


*Evidence:* waitForSelector('.tdn-emailpop') resolved at 12710ms; screenshots m-00.png and m-01.png at 375px show the popup covering the product at scroll 0 and scroll 812; theme 193438056731


### 90. MOBILE: an email popup takes over the whole screen ~13s in and makes Add to Basket untappable until it is dismissed

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


At 375x812 the .tdn-emailpop modal appears about 13 seconds after load: position fixed, z-index 90, bounding box exactly 0,0,375,812 — the full viewport — with role="dialog" aria-modal="true" and a dimming backdrop. Content: "JOIN THE PACK / Get 10% off your first order / Calm-dog tips and early access to new bundles — plus a code for your first order. No spam, unsubscribe anytime. / [you@email.com] / Get my 10% code / No thanks".

I hit-tested the Add to Basket button while it was up: document.elementFromPoint() at the button's centre returned P.tdn-emailpop__p — the popup's paragraph, not the button. Two scripted click attempts on [data-tdn-atc] timed out (30s and 15s) and /cart.js stayed empty. After dismissing the popup, the same click succeeded immediately and /cart.js returned {"The Settle-In Bundle x1", total 6499}. So the popup, not the button, is the blocker — isolated by experiment, not inferred.

Compounding it: the cookie banner is still on screen underneath (visible in the screenshot behind the dim), so a phone shopper gets a consent bar AND a full-screen email modal stacked at z-index 90 before reading a word about the product. 13 seconds is roughly when someone finishes the intro paragraph and reaches the price.

This is dismissible, so it is not a dead end — but on the store's highest-value page, on the traffic source that dominates, the primary conversion control is covered by a discount modal at the moment of decision.


*Evidence:* Screenshot /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/popup-mobile.png; elementFromPoint over [data-tdn-atc] returned P.tdn-emailpop__p; cart empty before dismiss, "The Settle-In Bundle x1 / 6499" after


### 91. MOBILE: the popup renders over the cookie banner, making Accept/Decline unreachable

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


At 375px both overlays are up at once. The cookie banner ('We use cookies … Privacy Policy. Decline / Accept all') sits at the bottom of the viewport and the 10%-off modal renders on top of it, covering its buttons. Observed in the mobile slices, and confirmed programmatically: a Playwright click on the 'Accept all' button times out on mobile while succeeding on desktop, because the modal intercepts the pointer. A visitor on a phone therefore cannot give or refuse cookie consent until they dismiss a marketing popup — a bad look for a PECR consent gate and a dead end for anyone who taps the banner and sees nothing happen.


*Evidence:* m-slice04.png through m-slice10.png at 375×812; 'Accept all' click timeout on mobile context vs success on 1440px context


## Mobile  (2)


### 92. MOBILE: the category bar is an unstoppable marquee the user cannot scroll and must tap while it moves

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Measured the .tdn-catbar__track transform once per second at 375px: -110.8px, -146.4px, -181.4px, -216.4px, -251.4px — a steady ~35px/second JS-driven translate (computed animationName is 'none', so it is scripted, not CSS). The container .tdn-catbar has overflow-x: hidden with clientWidth 375 and scrollWidth 1784, so the visitor cannot swipe it manually. There are 12 pills (6 unique, duplicated: Shop all, Calming Essentials, Grooming, Mealtime & Feeding, Travel & Outdoor, The First Days Kit) and roughly 2.5 fit on screen at once, clipped at both edges. Every one is a real link. So the primary category nav on a phone is a moving target with no pause control — a genuine tap-accuracy failure and a WCAG 2.2.2 (Pause, Stop, Hide) problem for content that auto-moves for more than five seconds.


*Evidence:* transform sampled over 5s at 375px; computed overflowX 'hidden', clientWidth 375 vs scrollWidth 1784; m-catbar.png shows 2.5 pills clipped at both edges


### 93. MOBILE: the category grid has zero side padding — text sits flush against both screen edges

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Measured card geometry at 375px. Card 1 spans x=0 → 179, card 2 spans x=197 → 375. Titles start at left=0 and CTAs end at right=375, so the words touch both edges of the phone with no gutter, unlike every other section on the page. Inside each 179px card the title and CTA share a row and both wrap: 'Settling a New Rescue' renders 103px wide × 48px tall next to 'See the bundle →' at 103→179 × 45px tall. The 'Bundle inside · Save £7.98' badge wraps to three lines inside its pill and its right edge hits the card edge at 179. Visible in the screenshot as two lines of title jammed against two lines of link. This is the worst-looking element on the phone and it is pure CSS.


*Evidence:* getBoundingClientRect audit of the collections section at 375px (values quoted); mc-06.png


## Theme / CSS  (2)


### 94. The git theme is NOT the deployed draft theme — the recon report's review-block conclusion is contradicted by what renders

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


dog-nook-theme/sections/dog-nook-reviews-placeholder.liquid in the repo is the old skeleton: three dashed cards, heading default 'Real reviews, coming soon', card note 'Awaiting verified review', and a schema with only four settings (eyebrow, heading, body, placeholder_note) — no rating fields. The deployed draft theme renders something entirely different: 'KIND WORDS / Loved by dog owners / 4.8 ★★★★★ from 80 real owner reviews / Collected from real owners in person and online. We never write our own.' plus six named testimonial cards. The recon report concluded from source that agg_rating/agg_count 'don't render today — a dormant landmine'. They render. STATUS.md's asset-drift warning is scoped to dog-nook.js and dog-nook-cro.css; it is in fact broader and covers sections, which means any audit written from the repo is unreliable about what customers see. Pull the deployed theme down and reconcile before any further source-based reasoning.


*Evidence:* read /home/user/sc/dog-nook-theme/sections/dog-nook-reviews-placeholder.liquid vs rendered reviews section on https://kkeqih-jm.myshopify.com/


### 95. Size pills are 39px tall, below the 44px minimum tap target, on the one control that decides whether the order is returned

**impact** low · **effort** quick · **owner** claude · **evidence** loaded-page


Measured on the live draft at 375px: the Small / Medium / Large buttons render 72×39, 90×39 and 73×39 CSS px. Apple's HIG and WCAG 2.5.8 both put the floor at 44px. They are also the single most consequential control on the page — getting the size wrong is the expensive return on a dropshipped bed. Everything else on the page clears the bar (Buy it now 46px, Add to Cart 51px, quantity input 52px, FAQ rows 58px), so this is a one-line padding change and not a systemic problem. Worth doing in the same pass as the `.tdn-sizes` class rename, since both touch the same component. Credit where due: the selector itself is now correctly built — the deployed markup is a proper `role="radiogroup"` with `role="radio"` / `aria-checked` buttons showing real text labels, so the recon run's "three identical grey squares" defect is FIXED and should not be re-raised.


*Evidence:* getBoundingClientRect on each size button at 375px, theme 193438056731: 72×39 / 90×39 / 73×39; deployed markup <div class="tdn-sizes" role="radiogroup"> with <button class="tdn-sizebtn" role="radio">


## SEO & meta  (1)


### 96. Snoozer UK could not be read directly — genuine WAF block, confirmed with a real browser, not an environment failure

**impact** low · **effort** quick · **owner** owner · **evidence** loaded-page · **blocker** third-party


Recording this honestly because run #1's headline weakness was implying it had seen things it hadn't.

What I did: curl to https://www.snoozerpetproducts.co.uk/ returns HTTP 202 with a Sucuri challenge stub ('meta http-equiv=refresh' to /.well-known/sgcaptcha/'). The Shopify .json endpoints for both the product and the collection return the same stub. I then drove a real headless Chromium at it via tools/agent-browser — it loaded a page titled 'Robot Challenge Screen'. So this is the retailer's own bot protection, not the container's networking, and no amount of retrying from here will get past it.

What I got instead: UK stockist Lola & Nell lists 'Snoozer Cozy Cave Rectangle Dog Bed — From £122.00 Sale Price'. Four sizes (Small/Medium/Large/XL) are described with dimensions, but the page does not publish a price per size — only the 'from' figure. So the single Snoozer number in this report is one stockist's entry price, on sale, not the brand's own RRP ladder.

Treat it accordingly: Snoozer is confirmed to sit in the same £100+ premium band as Charley Chau, which is enough to bracket the Deep Nook, but do not quote a Snoozer per-size price anywhere. If a decision ever needs to rest on Snoozer's actual RRP, that needs a human to open snoozerpetproducts.co.uk in a normal browser and pass the challenge — hence the owner classification.


*Evidence:* https://www.snoozerpetproducts.co.uk/ → HTTP 202 sgcaptcha stub; headless Chromium title 'Robot Challenge Screen' ; https://www.lolaandnell.co.uk/product-page/snoozer-cozy-cave-rectangle-dog-bed


*Blocker:* Snoozer's own site sits behind a Sucuri bot challenge that blocks automated clients entirely, so only a human in a normal browser can read its per-size RRP.


## Positioning  (5)


### 97. POSITIONING GAP: every rival ladders on DOG SIZE. Bundling-by-problem already exists. Only the adoption timeline is unclaimed — and that is narrower than the project has assumed.

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Scored against POSITIONING.md rather than against any single rival, because the position claims 'no retailer has claimed it commercially'. Half of that is confirmed and half needs qualifying.

CONFIRMED — nobody ladders on time-since-adoption. Collared Creatures ladders on dog size (XS→XXL, six rungs). Charley Chau ladders on dog size (S/M/L) plus a materials tier. Ruffle Snuffle ladders on mat size (S/M/L). LickiMat ladders on mat size and toughness. Not one of them organises anything around how long the dog has been home. The 3-3-3 framing is genuinely open.

QUALIFIED — 'bundle by need' is NOT open, and the project should stop assuming it is. LickiMat's own UK store already sells, at real prices read live today:
- 'Anxious Bundle – S/M Dogs' £26.17 and 'Anxious Bundle – L/M Dogs' £31.39
- 'Puppy Bundle' £26.17, 'Puppy Bundle with Keeper' £37.38, 'Puppy Deluxe Bundle' £50.81
- 'Starter Bundle – S/M Dogs' £29.91, 'Training Bundle' £45.66, 'Boredom Buster Bundle' £48.63
- 'Bathtime and Grooming Bundle' £35.88, 'Slow Feeding Bundle' £23.95–£40.42
A brand with a bigger catalogue, real photos and real reviews is already selling an 'Anxious Bundle' at £26.17 — undercutting the First Days Kit at £34.99.

What this means: the defensible ground is specifically the RESCUE ADOPTION TIMELINE, not 'kits for anxious dogs'. 'Anxious dog bundle' is a fight against a branded incumbent on price. 'What your rescue needs in their first three days' is a category of one. Every piece of copy should lean on the adoption moment, not the anxiety label — which happens to also be the ASA-safe direction.


*Evidence:* https://lickimat.co.uk/products.json?limit=250 (bundle titles and prices) ; https://www.collaredcreatures.com/collections/dog-snuggle-bed/products.json ; https://www.charleychau.com/products.json ; https://rufflesnufflemats.com/products.json


### 98. VERDICT: "No commercial brand has claimed 3-3-3" is FALSE — at least 8 UK commercial sites already publish it, one is a Shopify pet retailer mapping products to stages

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Run #1's claim is wrong as stated. UK commercial entities publishing 3-3-3 content today: PetBuds (petbuds.co.uk, Shopify pet retailer, Bradford WF17 5LG — article 08 Jan 2026 that maps products to each stage: chew-proof bed for the 3 days, chew-proof toys for the 3 weeks, lick mat for the 3 months, with inline Add to Cart / Quick Add buttons); Gravitis Pet Supplies (UK retailer, article dated 16 Jun 2022, content only, no product tie-in); Animal Friends (UK pet insurer, FCA-regulated, uses the term "3-3-3 rule" explicitly); plus Wagtails (Essex daycare/dog parks), Chase Canines, BarkSmart, Welly and Tails, Pound on Pastures (Bicester dog field). Non-UK commercial: UKUSCAdoggie (e-commerce, ties a snuffle mat and a licking mat — the same categories The Dog Nook sells — to the stages under "Must Haves for the New Kid on the Block!"), Woofz (training app), Sniffspot, Cuddly. The innocent explanation for run #1 getting this wrong is documented in its own report: it stated "every retail domain returned 403 to direct fetch" and that competitor data was "search-snippet derived, not read off live pages". So it inferred non-use from an inability to open retail sites, rather than from evidence of absence. This was checkable — Gravitis has been live since 2022. The owner then carried the claim into POSITIONING.md in good faith.


*Evidence:* https://petbuds.co.uk/blogs/news/3-3-3-rule-dogs-adjust-new-home (loaded, pub. 08 Jan 2026, products mapped to stages); https://www.gravitispetsupplies.co.uk/blogs/blog/what-is-the-3-3-3-rule-for-rescue-dogs (loaded, 16 Jun 2022); https://www.animalfriends.co.uk/dog/dog-advice/dog-maintenance-and-safety/how-to-settle-a-rescue-dog-into-your-home/ (loaded, uses term verbatim); https://www.ukuscadoggie.com/blogs/ukuscadoggie-articles/333-rule-of-adopting-a-dog (loaded, products per stage)


### 99. "Every UK rescue teaches it" is NOT supported — Dogs Trust and Battersea both avoid 3-3-3 deliberately. Do not publish this claim.

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


POSITIONING.md line 30 states "every rescue teaches it, only charities rank for it, and no retailer has claimed it commercially" as the justification for the entire store. I loaded the settling pages of the two largest UK rescue charities. Dogs Trust ('How to help a rescue dog get settled into your home'): no 3-3-3, no rule-of-three, no 3 days/3 weeks/3 months framework. It uses pre-arrival / first few days / first night, and its only three-month reference is an optional "settling-in diary". Battersea ('How to settle in your new puppy or dog'): no numbered framework at all, and states "The important thing is to allow them to settle into their new environment at their own speed." Both appear to deliberately avoid prescriptive timelines. 3-3-3 IS used by smaller UK rescues — Dogs N Homes (registered charity 1183775, Fleet, Hampshire) publishes "The 3x3x3 Rule" with exactly the three stages — and Welly and Tails states "333 guidance is given out by many foreign rescues", which matches the pattern: it's a small-rescue and overseas-rescue (Romanian/Cypriot/Greek) convention, plus a heavy US shelter presence. The risk is twofold: the claim is factually wrong, and putting "every UK rescue teaches this" on the site is an unsubstantiated objective claim under CAP rules, on a store that has staked its brand on honesty. Safe and still true: "the timeline many rescues give new adopters" — which is what POSITIONING.md line 34 already correctly instructs.


*Evidence:* https://www.dogstrust.org.uk/dog-advice/life-with-your-dog/at-home/settle-rescue-dog (loaded — no 3-3-3); https://www.battersea.org.uk/pet-advice/dog-advice/search-dog-advice/how-settle-your-new-puppy-or-dog (loaded — no 3-3-3, "at their own speed"); https://dogsnhomes.org.uk/the-3x3x3-rule/ (loaded — charity 1183775, uses it)


### 100. MOBILE: the cookie banner's Decline / Accept all buttons are cut off by the bottom of a 375x812 screen

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Measured at 375x812 with window.innerHeight = 812. The .tdn-cookie element is position:fixed with computed bottom:16px, but its bounding rect is y=670, height=183, bottom=853 — 41px below the viewport floor. The two controls sit at y=796 with bottom=834, so roughly the lower 22px of both "Decline" and "Accept all" is off-screen. They are still partially tappable at the top, but they are clipped, and the banner is 183px tall on an 812px screen — 22% of the phone covered by a consent bar that cannot fully show its own buttons.

I flag one thing I could not fully resolve and am not going to paper over: computed bottom:16px and a measured rect bottom of 853 are inconsistent with a viewport-anchored fixed element, which suggests an ancestor is creating a containing block (a transform or filter somewhere up the tree). I did not chase it to the exact rule. What I can state is what I measured and what the screenshot shows: on a 375x812 viewport the banner overruns the bottom edge and its buttons are clipped.

Worth pairing with the popup finding — cookie banner and email modal are both z-index 90 and both on screen together, so the consent decision and the discount modal compete at the same depth.


*Evidence:* Computed at 375x812: .tdn-cookie {position:fixed, bottom:"16px", z-index:90, rect y=670 h=183 bottom=853}, window.innerHeight=812; buttons "Decline" and "Accept all" at y=796 bottom=834; screenshot /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/settle-mobile.png


### 101. The credible pushback is stronger than POSITIONING.md assumes — and answering it is a trust asset, not just a hedge

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


POSITIONING.md line 34 correctly says to hedge, but understates the objection. I loaded the main critique (Rescued By Training). Its argument is not merely "every dog differs": it says the rule is "completely arbitrary" with "no evidence that this rule is based on any science or research", and that it "does more harm than good" — specifically that it sets expectations which push owners to force dogs past readiness, and that it delays professional help, asking "what if the guardian wait[s] until this timeline is over before they recognize that their dog needs professional help". The only evidence it cites is the ~72-hour stress-hormone recovery window, used to explain the rule's origin rather than validate it. Two consequences. First, the hedge must be prominent, not a footnote — a store built on a framework a chunk of the training profession calls arbitrary needs to say so first, before a critic does. Second, and more valuable: the harm alleged is "people wait instead of getting help", so building explicit when-to-get-help signposting into each stage (e.g. "if they still aren't eating after 48 hours, call your vet — don't wait for day three") turns the single strongest criticism into the single most trustworthy thing on the site. It also reduces liability, since it steers away from any implication that a product substitutes for professional help — which is the same line the ASA rules police.


*Evidence:* https://rescuedbytraining.substack.com/p/debunking-the-3-3-3-rule — "completely arbitrary", "no evidence that this rule is based on any science or research", delayed-intervention harm argument


## Market research  (9)


### 102. The specs bullets never change with the size variant — pick Small at £29.99 and the page still says "Large, 80cm — suits most dogs up to Labrador size"

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


I clicked each size pill and captured the page state after every click. Price and the sticky bar update correctly (Small £29.99 → Medium £37.99 → Large £44.99, and `SIZE: SMALL/MEDIUM/LARGE` updates). But the "The details" bullet list is byte-identical in all three states, always ending: "Large, 80cm — suits most dogs up to Labrador size". So a customer selecting Small for £29.99 is told in writing that the bed is 80cm and suits dogs up to Labrador size. That is a misdescription of the goods at the moment of purchase (DMCC 2024 / CPRs), and size doubt is the number-one returns driver on what is the store's highest-value single SKU. Cause: those bullets are the product's own descriptionHtml body, which is static, not a variant-aware field — the DOM confirms `.tdn-specs` and `.tdn-specs__row` do not exist at all (see separate finding), so nothing variant-aware is rendering. Immediate safe fix (no supplier input needed): delete the hardcoded "Large, 80cm…" line from the description so the page stops asserting a false measurement. Full fix is the per-variant size guide below.


*Evidence:* Scripted variant clicks on theme 193438056731; captured details text identical across Small/Medium/Large while price changed £29.99/£37.99/£44.99


### 103. Cave/hooded bed tier now priced for real — and it contradicts run #1's 'raise the Deep Nook to £99.99'

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


This was run #1's total blank. Every price below was read off the live retailer's own product data, not a snippet.

UK CAVE / HOODED / BURROW BED MARKET (observed 2026-08-12, GBP inc VAT):

MASS-MARKET FLOOR
- Zooplus 'Igloo Dog Den – Grey', 71x54x57cm — £42.99 (one size)

UK HANDMADE MID-PREMIUM — Collared Creatures (collaredcreatures.com)
- Luxury Dog Cave Bed w/ Removable Firm Hood (Beige/Grey): Small 65cm £87.98 · Medium 80cm £109.98 · Large 98cm £129.99 · XL 114cm £149.99. (Green Tweed Medium is £110.98 — a 1p-level inconsistency in their own catalogue.)
- Luxury Snuggle Sack: XS 60x50 £63.79 · S £74.99 · M £93.49 · L £114.79 · XL £135.99 · XXL £178.49 (Braga/Monaco/Marseille prints). Tweed/Grey/Beige version runs higher: XS £74.98 → XXL £209.98.
- Classic Comfort Cocoon (cushion base): S 65cm £84.98 · M £104.98 · L £119.99 · XL £139.99
- Deluxe Comfort Cocoon: S £99.98 · M £135.98 · L £154.98 · XL £189.98 — and 'With Curtain' adds £24.99–£44.99
- Bolster Hooded Bed, removable hood: M £99.98 · L £129.98 · XL £148.98

TOP TIER — Charley Chau (charleychau.com)
- Burrow Bag in Cotton: S £100 · M £120 · L £180 (waterproof liner version £125/£150/£230)
- Snuggle Bed in Cotton: S £110 · M £130 · L £200 (liner version £135/£160/£250)
- Burrow Bag in Velour £110–£310 · Luxe Snuggle Bed in Faroe £130–£350

SNOOZER (UK) — see separate finding, brand site is WAF-blocked; UK stockist Lola & Nell lists Cozy Cave Rectangle 'From £122.00 Sale Price'.

WHAT THIS MEANS FOR THE DEEP NOOK (currently draft, £59.99 L / £79.99 XL / £89.99 XXL):
Run #1 recommended raising it to £64.99/£79.99/£99.99 on 'brand-tier inference' with zero read prices. That recommendation is now unsafe. At £99.99 the top variant would sit £12 ABOVE Collared Creatures' Small cave bed (£87.98) — which is UK-handmade, has a removable rigid hood, machine-washable covers and an optional waterproof liner. An unphotographed dropship cave bed cannot hold a price above that.
The honest read: £59.99–£89.99 is already correctly bracketed — comfortably above the £42.99 mass-market igloo, comfortably below the £87.98 UK-handmade entry. Leave the prices alone. The defect is the SIZE NAMING (variants are L/XL/XXL while the copy says it isn't ideal for large breeds), which is what actually loses the sale.


*Evidence:* https://www.collaredcreatures.com/collections/dog-cave-beds/products.json ; https://www.collaredcreatures.com/collections/cocoon-dog-beds/products.json ; https://www.charleychau.com/products/snuggle-beds-for-dogs.json ; https://www.zooplus.co.uk/shop/dogs/dog_beds_baskets/dog_cave


### 104. The Lick Mat at £11.99 is priced ABOVE the branded category original (£6.99)

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Sharpest single price fault found. LickiMat is the brand that defines this category in the UK, and its official UK store's own variant prices are:
- Mini Classic Soother / Buddy / Playdate — £5.99
- Classic Soother / Buddy / Playdate — £6.99 (some colourways £7.99)
- Classic Soother XL / Classic Buddy XL — £12.95
- Mini Tuff (Soother/Buddy/Playdate) — £9.99
- Tuff Soother / Tuff Buddy / Tuff Playdate — £11.95
- Tuff Pro Soother — £12.95
- Splash (suction, for bath) — £13.95 · Wobble — £13.95 · UFO — £15.95
- Keeper (holder) — £14.95 · Mini Keeper — £9.99 · Outdoor Keeper — £12.95

The Dog Nook 'The Lick Mat' is £11.99, unbranded, single size, no dimensions on the page (custom.specs is null per run #1). That is £5.00 ABOVE the branded Classic Soother and 4p above the branded Tuff — i.e. a shopper who price-checks lands on a real LickiMat for less. With no photo and no spec, there is nothing on the page defending the gap.

Two honest options, both Claude's to execute: (a) drop to £7.99–£8.99 and keep it as the day-one impulse/bundle filler, or (b) hold £11.99 but only once the page carries real dimensions, material and dishwasher/freezer claims — which is the same missing custom.specs field run #1 already flagged. Option (a) is the safer pre-launch move because it also widens the First Days Kit saving.


*Evidence:* https://lickimat.co.uk/products.json?limit=250 (live variant prices) ; Dog Nook price via Shopify Admin API, product 10311314768155


### 105. Thundershirt's real UK price is £31.50–£35.00 — a much tighter band than run #1's ±10% guess, and it steps by size

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


thundershirt.co.uk 301-redirects to adaptil.co.uk — both are Ceva, so this IS the brand owner's UK price, not a reseller's. Exact live variant prices for 'ThunderShirt Calming Wrap':
- XS £31.50 · S £32.35 · M £33.25 · L £34.10 · XL £35.00

Run #1 reported '£26.99–£43.19' from snippets. The true spread is £3.50 across the whole size range, not £16.20. That materially changes the recommendation.

The Dog Nook 'The Calming Coat' (draft) is £24.99 FLAT across Small/Medium/Large. Two findings fall out:
1. £24.99 is 21% under the XS and 29% under the XL. Run #1's '£27.99–£29.99' still lands as a band, but the sharper move is to mirror the category convention: Thundershirt steps price by size and The Dog Nook doesn't. Stepped pricing (e.g. S £26.99 / M £28.99 / L £30.99) is credible, adds £2–6 contribution on the larger sizes where the fabric cost genuinely is higher, and reads as a considered product rather than a flat dropship price.
2. Do NOT copy Thundershirt's efficacy claim. Ceva's own page runs 'The n°1 calming vest in the USA' — a sales-volume claim, not a health claim, which is exactly why it's safe for them and why an efficacy version would not be safe for us under ASA rules on anxiety as a health condition.

Also on that same catalogue for context on what UK 'calm' pricing tolerates: ADAPTIL Calm Diffuser £25.90, Calm Collar S £23.70 / M-L £24.60, Calm Refill £21.50 (3-pack £52.50), Transport spray 20ml £14.50 / 60ml £23.25, ADAPTIL Chew 30ct £27.10.


*Evidence:* https://www.adaptil.co.uk/products.json?limit=250 — product handle /products/thundershirt ; redirect observed: https://www.thundershirt.co.uk/ → 301 → https://www.adaptil.co.uk/


### 106. Snuffle mats: the entire UK specialist category prices by size in clean steps. The Dog Nook sells one size at the top of a ladder it doesn't have.

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Ruffle Snuffle (rufflesnufflemats.com) is the UK's snuffle-mat specialist — handmade to order, published dimensions. Live variant prices:
- Ruffle Snuffle mat (Confetti / choose-your-colours / Magic): Small £10.00 · Medium £20.00 · Large £30.00
- Personalisation add-on: +£5.00 at every size (S £15 / M £25 / L £35)
- Original Snuffle Cube: Medium 4" £15 · Large 5" £19 · XL 6" £23
- Challenger Cube: Small 3" £10 · Medium £17 · Large £22 · XL £27 (+£4.50 personalised)
- Snuffle Snozzler: Mini 4x6" £19 · Maxi 5x8" £25
- Travel bag accessory £5.00 · Snuffle 'cake' £30
Published sizes: Small approx 10x8.5" · Medium 12x10" ('our best selling size') · Large 14x14".

CORRECTION TO RUN #1: it cited 'Blitz: £17/£24/£44'. I could not reproduce that source. The verified UK specialist ladder is £10/£20/£30 — a clean 3x span, not 2.6x, and starting a third lower.

The Dog Nook 'The Snuffle Mat' is £22.99, ONE size, no dimensions published. That is above Ruffle Snuffle's Medium (£20 — handmade in the UK, made to order, personalisable) and below their Large. It is the worst spot on the ladder: too expensive to be the entry, not large enough to be the premium, and the shopper cannot tell which they're buying.

Run #1's 'add a large at £29.99–£32.99' is directionally right and now has real numbers behind it: £30 is exactly where the UK specialist tops out, so £29.99 is defensible and £32.99 is not. The bigger win is adding a SMALL — Ruffle Snuffle's £10 entry is the volume rung and The Dog Nook has no answer to it at all.


*Evidence:* https://rufflesnufflemats.com/products.json?limit=250 ; https://rufflesnufflemats.com/products/ruffle-snuffle-snufflemat-custom-colours.json (size dimensions)


### 107. Paid add-ons attached to the hero SKU are a UK convention the range doesn't use — and it's the cheapest route to AOV £60→£80

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Observed the same mechanic at all three premium players and at the heartbeat-toy seller:
- Collared Creatures, Deluxe Comfort Cocoon: 'With Curtain' variant adds £24.99 (S) / £32.99 (M) / £39.99 (L) / £44.99 (XL) over the base. Curtains also sold standalone at those prices.
- Collared Creatures cave beds: optional waterproof liner offered as an extra.
- Charley Chau, every snuggle bed and burrow bag: 'Liner required' variant adds £25 (S) / £30 (M) / £50 (L). On the Large Snuggle Bed that is £200 → £250, a 25% uplift on a single checkbox.
- Treat Your Dog: Snuggle Puppy heat packs, 3-pack £9.99.
- Ruffle Snuffle: personalisation +£5.00 at every size; travel bag £5.00.

The Dog Nook has zero paid add-ons anywhere in the catalogue — no liner, no spare cover, no refill, no personalisation. The AOV goal is £60→£80, i.e. +£20 per order, and the market is showing that £25–£45 of that is available from a variant checkbox on a bed rather than from persuading someone up a bundle rung. A waterproof liner option on the Deep Nook and the Donut Bed is the closest analogue and the most obviously on-brand: a newly-adopted, unsettled dog having accidents in the first fortnight is exactly the 3-day/3-week problem the store exists for, so the liner sells itself through the position rather than against it.

Claude can build the variant structure, pricing and copy. What Claude cannot do is confirm a liner is actually available from the supplier at the right size — see the sourcing finding.


*Evidence:* https://www.collaredcreatures.com/collections/cocoon-dog-beds/products.json ; https://www.charleychau.com/products/snuggle-beds-for-dogs.json ; https://www.treatyourdog.co.uk/search/suggest.json?q=snuggle+puppy ; https://rufflesnufflemats.com/products.json


### 108. The deployed product-card snippet on the draft theme is NOT the one in git — do not deploy the repo copy over it

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


A trap for whoever picks up the card fixes above. STATUS.md records asset drift for dog-nook.js and dog-nook-cro.css. The drift is wider than that: it includes Liquid snippets.

The LIVE card markup on theme 193438056731 is:
`<a href="..." class="tdn-product-card" data-price="3499" data-title="The First Days Kit" data-date="1783875689"> <div class="tdn-product-card__media" style="background: #8B9578;"><span class="tdn-product-card__ph" aria-hidden="true">The First Days Kit</span></div> ...`

The git copy at /home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid has **neither** the three data-* attributes **nor** the `__ph` placeholder span. I also grepped every .liquid file in the repo for 'data-price' — zero hits. So the deployed snippet is a newer version that was never committed.

Consequence: pushing the repo's snippet to the draft theme would silently delete the placeholder span and the sort data-attributes that are currently live. Anyone fixing the badge collision or adding 'From £X' must pull the deployed snippet down first and edit that, not the repo copy.

Corroborating drift on JS: the deployed dog-nook.js is 4486 bytes; the git copy is 6378 bytes. Different files.

One correction to my own earlier assumption, for the record: dog-nook-cro2.css and dog-nook-cro3.css DO exist in git and are tracked — I initially thought they were deployed-only and that was wrong. The standing rule not to touch dog-nook.js or dog-nook-cro.css still applies and I have not modified anything.


*Evidence:* Live outerHTML captured from https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731 (theme asserted 193438056731) vs /home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid. `grep -rn 'data-price' --include=*.liquid` in the repo returns 0 hits. Deployed dog-nook.js 4486 bytes vs git 6378 bytes. git ls-files confirms cro2/cro3 are tracked.


### 109. Slow feeders: £14.99 sits fractionally above the branded equivalents, and again the category ladders by size while The Dog Nook doesn't

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


LickiMat UK official store, live variant prices for its feeding range:
- Slodog Small — £10.95 · Slodog — £13.95
- OH Bowl: Small £11.95 · Medium £14.95 · Large £19.95
- Slomo — £12.95 · Slomo XL — £19.99
- Yoggie Pot — £17.95 · Classic Riser — £28.99
- Wooden Keeper range — Mini £15.95 · Eco £19.95 · XL Eco £24.99

The Dog Nook 'The Slow-Feeder Bowl' is £14.99, one size. That is 4p above the branded OH Bowl MEDIUM and £1.04 above the branded Slodog. Same shape of problem as the lick mat: an unbranded, unphotographed, spec-less product priced at or above the brand.

Run #1 said '£5–£20 band, bulk £6–£12, either drop to £12.99 or commit to the specs'. That still holds and is now anchored: £12.99 would place it between Slodog (£13.95) and OH Bowl Small (£11.95), which is a defensible spot. £14.99 is not, while the page is empty.

The size ladder is the bigger miss. OH Bowl runs £11.95 / £14.95 / £19.95 across S/M/L — a 67% spread on the same product. That is the honest way to lift average selling price, and it is the same fix as the snuffle mat and the Settle-In Bundle. Three separate SKUs in this catalogue are single-size in categories that the whole UK market sells by size.


*Evidence:* https://lickimat.co.uk/products.json?limit=250 ; Dog Nook price via Shopify Admin API, product 10311321518363


### 110. Competitors carry safety and honesty boilerplate on enrichment and wearable products; our six enrichment SKUs carry none

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


myanxiousdog.co.uk puts two disclaimers directly under the product copy, before the cross-sell:
  "Disclaimer - NO ACCESSORY is indestructible, please remember to always check your dogs accessories for wear and tear. It is the customers responsibility to determine the suitability of the product for their pet."
  "NO harness is escape-proof, if your dog tries to wriggle out, you can use a double ended lead and attach to the collar as well as the harness."

adaptil.co.uk goes further and publishes a "When shouldn't I use this?" FAQ that actively disqualifies its own product — "If your dog's issues are due to boredom, ADAPTIL Calm will not help"; "ADAPTIL Calm will not help and should never be used in cases of aggression towards humans or other dogs." Telling people when not to buy is the most credible thing on that entire page.

OURS: the Donut Bed's FAQ already models this well — "It's a comfort tool, not a treatment... It isn't a substitute for vet advice if your dog has severe or ongoing anxiety" — which is both ASA-safe and genuinely disarming. But there is no supervision or suitability line on the Lick Mat, Snuffle Mat, Slow-Feeder or Grooming Glove pages, and no material declaration anywhere.

FIX (Claude): a standard block on the six enrichment/contact SKUs — always supervise, no toy is indestructible, check for wear, teach the game first, and an honest "this won't help if..." line per product. Only state material claims (food-grade silicone, BPA-free, wash temperature) once CJ confirms them in writing.

POSITION TEST: strong pass. A "when this won't help" line is the clearest possible signal that we are matching product to stage rather than selling everything to everyone — and it costs nothing to write.


*Evidence:* Rendered https://myanxiousdog.co.uk/products/padded-yellow-anxious-harness (disclaimers at y≈1660 and y≈1795); FAQ text "When shouldn't I use an ADAPTIL Calm Diffuser?" from https://www.adaptil.co.uk/products/adaptil-calm-starter-kit; our FAQ text force-expanded on https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1


## Other  (13)


### 111. Size guide is completely absent, yet this product's own FAQ tells shoppers to "check it against the size guide before ordering"

**impact** high · **effort** medium · **owner** claude · **evidence** loaded-page


Verified by DOM query on the live draft: `document.querySelector('table.tdn-sizes')` → null, `.tdn-specs__h` → null, and the string "Which size" appears 0 times in the rendered body text (also 0 hits for "Size guide", "girth"; the only "cm" on the whole page is inside the false "80cm" bullet). The template is built and working — snippets/dog-nook-specs.liquid lines 49-67 render a "Which size?" heading, a measuring tip ("Measure your dog curled up, nose to tail, then add 10 cm…") and a Size/Measurement/Suits table — but it is gated on `product.metafields.custom.size_guide`, which is empty, so 87 lines of finished template output nothing. Meanwhile I expanded the FAQ accordion and the answer to "What size is this bed?" reads: "Available in Small, Medium and Large. Measure your dog curled up and check it against the size guide before ordering — if you're between sizes or unsure, email us and we'll help you choose." The page points at a size guide that does not exist and then falls back to "email us" — a conversation gate on a £29.99–£44.99 purchase. Claude can build and populate the block now: the Large 80cm figure is already known, and the review copy even supplies the honest caveat ("The outside measurement is a bit misleading because the big padded rim takes up some of it"). Only the exact Small/Medium centimetre figures need the supplier.


*Evidence:* DOM: sizeGuideTable=false, whichSize=false, specsBlock=false on theme 193438056731; FAQ answer text captured after expanding the accordion


### 112. Zero product photography — all 9 cards render as the same flat olive block, so the grid gives a shopper nothing to choose between

**impact** high · **effort** heavy · **owner** owner · **evidence** loaded-page · **blocker** physical-world


Confirmed by rendering, not inferred: I queried every `.tdn-product-card` on the page and `hasImg` is false on all nine, with `style="background: #8B9578"` on all nine media boxes. On a 1440px screen you see a wall of four identical green rectangles above the fold; on a 375px phone you see two. The only differentiators are the title, the pill and the price. This is the known launch gate in STATUS.md and I am confirming it now renders exactly as feared. I am flagging it as owner-blocked ONLY for the photographs themselves. The consolation prize is Claude's and is listed separately: a designed placeholder that carries the stage instead of a broken duplicate title.


*Evidence:* All 9 .tdn-product-card elements on https://kkeqih-jm.myshopify.com/pages/shop?preview_theme_id=193438056731 return hasImg:false; media div style="background: #8B9578;"


*Blocker:* Producing genuine photographs of the real products requires a camera and the physical goods in hand, which no agent can do.


### 113. INDOOR anxious-dog problem is GENUINELY OPEN — My Anxious Dog's catalogue is 100% outdoor, confirmed from their live navigation

**impact** high · **effort** quick · **owner** claude · **evidence** loaded-page


Run #1's claim #9 holds and I can now evidence it rather than infer it. I loaded myanxiousdog.co.uk and read the main navigation: Harnesses, Leads, Lead Slip Covers, Collars, Rain Coats, Dog Jumpers, Enrichment for nervous dogs, Accessories, Clothes for Humans, Awareness Campaign Packs. Every category is wearable or walk-related. There are no beds, no snuffle mats, no lick mats, no crate covers, no home or night-time products. Their entire proposition is the yellow space-awareness signal — a communication device for other people in public, which by definition cannot address a dog that won't settle at 2am in the living room. The indoor problem (won't settle at night, won't eat in the first 72 hours, paces, shadows you room to room) maps onto essentially the whole Dog Nook catalogue and is unclaimed by any brand identity. Note the one adjacency: their "Enrichment for nervous dogs" category is the direction they would move if they expanded indoors — worth watching, but they have not.


*Evidence:* https://myanxiousdog.co.uk/ — main nav read live: Harnesses, Leads, Lead Slip Covers, Collars, Rain Coats, Dog Jumpers, Enrichment for nervous dogs, Accessories, Clothes for Humans, Awareness Campaign Packs


### 114. Exact Small and Medium measurements have to come from CJ before the size guide can state them

**impact** medium · **effort** quick · **owner** owner · **evidence** loaded-page · **blocker** third-party


The size-guide block itself is Claude's job and should be built now with the Large 80cm figure and the honest rim caveat. But the Small and Medium internal/external measurements are not in the catalogue, not in the description, and not derivable — they are the supplier's spec sheet. Publishing invented centimetres on a page whose whole purpose is to stop size-driven returns would be worse than the current gap. This is the same unanswered CJ email already logged in STATUS.md (transit times, "do bundles ship as one parcel?"), so it is one message, not a new task.


*Evidence:* No S/M measurements present anywhere in the rendered page or the description body on theme 193438056731


*Blocker:* Only CJ can supply the true Small/Medium dimensions of the product they manufacture, and Claude cannot make a supplier reply.


### 115. custom.specs is null so the entire built specs template outputs nothing — the "The details" bullets you see are just the description body

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Worth separating from the size guide because it is easy to look at the page, see a heading called "The details" with four bullets, and conclude the specs block works. It does not. DOM: `.tdn-specs` → false, `.tdn-specs__row` count → 0, `.tdn-specs__h` → null. The four bullets rendered under the "About this" heading ("Plush faux-fur exterior with soft, supportive filling", "Removable, machine-washable cover", "Non-slip base — no sliding across the kitchen floor at 3am", "Large, 80cm — suits most dogs up to Labrador size") are prose inside the product's descriptionHtml. The real specs component — a definition list of label/value rows from `custom.specs` — renders zero rows. Consequence: no structured material, no wash temperature, no dimensions, nothing a shopper can scan or compare, and nothing that can be made variant-aware. Claude can lift the spec values straight out of the existing description prose into the metafield; only material claims that need supplier confirmation (food-grade, BPA-free, wash temperature) should wait for CJ.


*Evidence:* DOM specsBlock=false, specsRows=0, detailsHeading=null on theme 193438056731


### 116. Review block says reviews were collected 'in person and online' — one word that may overclaim

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


The reviews block renders '4.8 ★★★★★ from 80 real owner reviews' and 'Collected from real owners in person and online. We never write our own.' The 80 is arithmetically consistent with the genuine data (10 reviews × 8 products) and I am NOT re-raising the retracted fake-review finding. Two narrower points. (1) 'and online': STATUS.md records the sales as 'in person / by hand' before the Shopify store opened, and the Shopify store has zero orders. I explicitly did NOT conclude the owner did anything wrong — the innocent explanation I could not rule out is that they sold online elsewhere (eBay, Etsy, Facebook Marketplace) pre-Shopify, which would make the wording true. I could not check that from here. If online sales did happen, leave it; if not, 'in person' alone is provably true and stronger. (2) I could not verify that 4.8 is the true mean of the 80 — the Shopify MCP call needed approval I do not have, so I did not read the metafields. Stated as unverified, not as a defect.


*Evidence:* rendered reviews section on https://kkeqih-jm.myshopify.com/; STATUS.md lines 51-63; mcp graphql_query returned 'requires approval'


### 117. The image placeholder prints the product name as unstyled dark text jammed in the corner, and the category badge lands on top of it

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


There are **zero `<img>` elements on the entire page** — no product has a photo (the known launch gate). What renders in each card's media area is a flat olive block, `<div class="tdn-product-card__media" style="background: #8B9578;">`, containing `<span class="tdn-product-card__ph" aria-hidden="true">The First Days Kit</span>`.

That span has NO CSS rule anywhere. Live computed style: `position: static, padding: 0px, display: inline, font-size: 14px, color: rgb(46, 42, 34)`. I grepped all four stylesheets in the repo (dog-nook.css, dog-nook-cro.css, dog-nook-cro2.css, dog-nook-cro3.css) — no `.tdn-product-card__ph` selector exists in any of them, which matches the computed result. So it inherits the body ink colour and sits inline at the very top-left of the media box with zero padding, against a mid-olive background. In both screenshots the first character is visibly clipped by the card's rounded corner and `overflow: hidden`.

WORSE — it collides with the badge. `.tdn-product-card__tag` is `position: absolute`, inset roughly 10px. Measured on the Lick Mat card at 375px: placeholder text starts at x=198, y=577; the 'Calming' badge sits at x=208, y=585. They overlap. This happens on every card that has a product type set: 'Calming' over 'The Lick Mat', 'Calming' over 'The Calming Donut Bed', 'Feeding' over 'The Snuffle Mat', 'Bundle' over 'The Settle-In Bundle'. Only the First Days Kit escapes, because its `type` is empty (verified: `type: ""` in the product JSON) so it renders no badge at all.

The result is that each card shows the product name TWICE — once as clipped dark text colliding with a badge, once correctly below the image — which reads as a rendering fault rather than a placeholder.

Until photography exists this placeholder IS the product image on every card in the store, so it is worth making deliberate: centre it, pad it, drop it to a low-contrast tone, and make it say something useful. Per the position, a placeholder that reads 'Days 1–3' does more work than one that repeats the title.


*Evidence:* https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731 — document.querySelectorAll('img').length = 0. Live outerHTML of card media div and computed style of .tdn-product-card__ph (position:static, padding:0px, display:inline, color:rgb(46,42,34)). Measured rects at 375px: ph x=198,y=577 vs badge x=208,y=585. Screenshots: scratchpad/ce-desktop.png, scratchpad/ce-mobile.png, scratchpad/settle-desktop.png


### 118. Genuine Snuggle Puppy is £34.99–£39.99 in the UK — and the £9.99 heat-pack refill is a repeat-revenue line nobody in the range has

**impact** medium · **effort** quick · **owner** claude · **evidence** loaded-page


Verified across two live UK sellers rather than one snippet:
- Treat Your Dog (treatyourdog.co.uk): 'Snuggle Puppy Dog Comforter w/ Heartbeat' in Biscuit and in Brown Mutt — £34.99 each
- Same store: 'Heat Packs for Snuggle Puppies – Pack of 3' — £9.99
- PetTech (pettech.co.uk): Snuggle Puppy Heartbeat Dog Toy Brown, brand Smart Pet Love, 25cm — £39.99 (marked down from £41.99), currently out of stock

Unbranded end: run #1's '~£9.99' is consistent with the PetTech £6.99–£9.99 range that appears in search listings, but I could not open a live unbranded product page to confirm a specific variant price, so treat the unbranded floor as approximate — it is the one number in this report I did not read off a page.

This confirms run #1's diagnosis of The Heartbeat Companion at £24.99: it wins neither buyer. But the more valuable observation is the £9.99 three-pack of heat packs. That is a consumable attached to a hero SKU, and it is the mechanism that turns a one-off comfort toy into a repeat purchase. The Dog Nook range has no consumable at all. If the Heartbeat Companion goes to £29.99, the way to justify it honestly is to include spare heat packs and a settling plan in the box — which is precisely the £9.99 of value the market already prices.


*Evidence:* https://www.treatyourdog.co.uk/products/snuggle-puppy-biscuit-dog.json ; https://www.treatyourdog.co.uk/search/suggest.json?q=snuggle+puppy ; https://pettech.co.uk/shop/snuggle-puppy-heartbeat-dog-toy-brown


### 119. The indoor space is contested at the CONTENT layer by an Amazon affiliate site — and its gaps are the exact wedge

**impact** medium · **effort** medium · **owner** claude · **evidence** loaded-page


captaincalm.co.uk (flagged in run #1 as part of the affiliate layer) is the nearest thing to an owner of indoor calming in UK search. I loaded its product directory: it is an Amazon Associates affiliate/review directory, not a retailer, with 19 products in two buckets — Calming Treats & Supplements (9) and Anxiety Vests, Diffusers & Sprays (10) — all home-use, and it markets itself on being "Evidence-Based" with "Real Reviews". Three gaps are decisive: it does not mention rescue dogs anywhere, it does not mention the 3-3-3 timeline anywhere, and it does not address night-time settling, pacing or not eating — it covers only situational triggers (fireworks, vet visits, travel, separation). It is also ingestible-weighted, so it competes with Adaptil/Pet Remedy/YuMOVE/Pooch & Mutt/Pupps, not with beds, mats and enrichment. So the indoor territory is occupied by an affiliate reviewing supplements, leaving the indoor rescue-dog-settling problem and the physical comfort/enrichment gear for it genuinely open. This is the single clearest content opportunity in the report.


*Evidence:* https://captaincalm.co.uk/products — affiliate directory, 19 products, two categories, no rescue/3-3-3/night-settling coverage


### 120. NOT VERIFIED: who actually ranks page 1 in the UK — every search engine blocked automated access

**impact** medium · **effort** quick · **owner** owner · **evidence** loaded-page · **blocker** third-party


I could not answer the ranking half of the question and am not going to imply otherwise. What I tried, and what happened: DuckDuckGo html endpoint returned 503 through the tunnel and lite.duckduckgo.com returned a 202 CAPTCHA ("Select all squares containing a duck"); Google.co.uk returned "Our systems have detected unusual traffic from your computer network"; Brave Search returned 429 with a slider challenge; Mojeek returned 403 "your network appears to be sending automated queries"; Bing returned HTTP 200 but served identical results about the Three mobile network for two different queries, i.e. it ignored the query entirely. The WebSearch tool works but is documented US-geo, so it cannot establish UK page-1 order. Therefore: every statement in this report about WHO USES 3-3-3 is evidenced by pages I actually loaded, but no statement about RANK or POSITION is made, and run #1's "only charities rank for it" remains formally unverified in both directions. What I can say from the population of pages returned is that it is not charity-dominated — it is heavily US shelters and US vet practices, plus affiliate sites, insurers, trainers and retailers. The fastest resolution is 60 seconds of the owner's time on a UK phone.


*Evidence:* Tunnel + Chromium runs: lite.duckduckgo.com HTTP 202 CAPTCHA; google.co.uk unusual-traffic block at 2026-08-12T13:34:25Z; search.brave.com HTTP 429; mojeek.com HTTP 403; bing.com HTTP 200 but returned Three-mobile results for both test queries


*Blocker:* Google, DuckDuckGo, Brave and Mojeek all gate automated access behind CAPTCHA/bot detection that Claude cannot pass, and Bing silently ignores the query, so a human must run the search in a UK browser (or a paid rank tracker must be bought) to see real UK page-1 results.


### 121. Supply the Small and Medium bed measurements from CJ so the size guide can ship complete

**impact** medium · **effort** quick · **owner** owner · **evidence** loaded-page · **blocker** third-party


The size-guide block is Claude's to build (separate finding), and it can ship with Large populated — the description already carries "Large, 80cm". What Claude cannot produce is the true external and internal diameter of the Small (£29.99) and Medium (£37.99) variants, both of which are live and selling today with no dimension shown anywhere on the page.

This is not a nice-to-have. calmingdogbeds publishes five sizes with cm AND weight AND named breeds; My Anxious Dog publishes girth ranges in cm plus breeds for all four sizes. We publish one number, for the size most people won't buy, and it stays on screen when a different size is selected.

What's needed: from CJ, per variant — external diameter, internal sleeping diameter (or rim width), and fill depth. Three numbers each, one email, and it is the difference between a size guide and an apology. The same email should carry the two questions already queued in STATUS.md (real transit time; do bundles ship as one parcel).

One of our own genuine reviews is already asking for this in public — "The outside measurement is a bit misleading because the big padded rim takes up some of it. I swapped ours for the next size." Publishing the internal measurement is the single cheapest returns reduction available on our highest-value SKU.


*Evidence:* Rendered https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 (theme 193438056731 asserted) — only "Large, 80cm" appears; variants Small £29.99 / Medium £37.99 / Large £44.99 confirmed live via Shopify Admin API search_products


*Blocker:* The measurements exist only with the supplier — it needs a human at CJ to reply, and no agent can obtain or verify them.


### 122. Desktop: the page header uses about 40% of its width and leaves ~690px of empty beige beside the intro copy

**impact** low · **effort** medium · **owner** claude · **evidence** loaded-page


At 1440px the container is 1180px wide starting at x=130. The eyebrow "SHOP ALL", the H1 and the intro paragraph are all constrained to roughly 490px on the left, ending around x=620, with nothing at all to the right of them out to x=1310 — roughly 690px of empty background above the fold, before a single product is visible. The grid below is 4 columns at 281.5px with an 18px gap and no horizontal overflow. This is lower priority than everything above it because the brief is right that most traffic lands on a phone, where the copy fills the width. But it is the natural home for the stage question the page is missing: a three-door "where's your dog right now?" block would occupy that space and do the positioning work at the same time, rather than the space being fixed for its own sake.


*Evidence:* 1440px screenshot of /pages/shop: intro copy ends ~x=620, container right edge x=1310; grid measured gridTemplateColumns 281.5px x4, gap 18px, no overflow


### 123. Star ratings on the cards are honest — no fake-rating issue here, do not 'fix' it

**impact** low · **effort** quick · **owner** claude · **evidence** loaded-page


Recording this as a clear pass so a future audit does not re-raise it, in the same spirit as the STATUS.md reviews correction.

On the cards, rated products render five GOLD stars, computed colour `rgb(224, 184, 76)`, with the label '4.8 · 10 reviews'. These are the eight products with genuine hand-sold reviews and they are correctly attributed.

The Settle-In Bundle, which has no reviews, renders five stars in class `tdn-star--empty`, computed colour `rgb(216, 205, 185)` — a pale beige clearly distinct from the gold — with the label 'New' rather than a number. Source (snippets/dog-nook-stars.liquid) confirms the logic: a rating only renders when `count_num > 0 and rating > 0`, otherwise the empty state renders. The file's own comment says 'NO invented ratings' and the implementation honours it.

So the collection grid does not invent a rating for any product. The only refinement worth considering is that five star glyphs beside the word 'New' can still read as a rating at a glance on a 179px mobile card — but the colour separation is real and the label is accurate, so this is a judgement call, not a defect. I would leave it.

Separately, and consistent with STATUS.md's open item: the wording on these cards is '4.8 · 10 reviews', which does NOT overclaim (it does not say 'verified'). The 'verified reviews' wording problem STATUS.md tracks is on the PDP, not on the collection cards.


*Evidence:* Computed colours read live on /collections/settling-a-new-rescue (theme 193438056731): rated cards .tdn-star--full = rgb(224,184,76) with '4.8 · 10 reviews'; The Settle-In Bundle .tdn-star--empty = rgb(216,205,185) with 'New'. Source: /home/user/sc/dog-nook-theme/snippets/dog-nook-stars.liquid. Screenshot: scratchpad/settle-desktop.png


---

## Verification verdicts (83)


**61 held · 22 killed.** Each verdict below is an independent agent that tried to
*refute* the finding — reproducing it first-hand rather than trusting the report.


**[V1] HELD** — I tried to break it and could not. Independently reproduced: ran `node tools/agent-browser/browse.mjs https://kkeqih-jm.myshopify.com/products/the-new-rescue-bundle-1 --theme 193438056731 --text` (exit 0, theme asserted as 193438056731 "CRO working copy", unpublished — so this is NOT a wrong-theme read, the L002 trap). Rendered text contains, in this order: "BEST VALUE · SAVE £15" ... "Lick Mat £11.99 / Snuffle Mat £22.99 / Slow-Feeder Bowl £14.99" ... "Bought separately £49.97" ... "£34.99" ... "You save £14.98". Both numbers are on the same screen, exactly as claimed.

Refutation attempts, each ruled out:
1. "The badge is an *image* badge and no product has photos (STATUS.md: zero images), so it never renders." Refuted twice: dog-nook-bundle.liquid:18 renders the badge unconditionally on `s.badge != blank`, independent of `product.featured_media`; and the rendered text shows both the badge and the "FLAT-LAY OF ALL THREE" placeholder, i.e. no image yet the badge is there.
2. "The reporter's URL has no `?preview_theme_id=`, so they saw the live theme and dressed it up." Their evidence URL is indeed bare, which is a real weakness in their citation — but I asserted the draft theme myself and the discrepancy is present there, so the conclusion survives regardless of what they loaded.
3. "It's dressed-up inference from the template file." Unlikely, and in the reporter's favour: templates/product.bundle.json hardcodes `save_label: "You save £15"`, not £14.98. The £14.98 only appears at runtime, because compare_at_price (£49.97) > price and the liquid computes the chip (dog-nook-bundle.liquid:49-53). You cannot get "£14.98" by reading the template — it comes from rendering. That is positive evidence the page was actually loaded.
4. "£49.97 is a made-up comparator, so £14.98 isn't the true saving either." Refuted: £11.99 + £22.99 + £14.99 = £49.97, the three components' real standalone prices, pulled from the Admin API on 2026-08-12 and recorded in PROBLEMS-1.md P1-12; the same three prices render on the page. £49.97 − £34.99 = £14.98. So "SAVE £15" is a genuine 2p overstatement.
5. Owner-blame check (the run #1 failure mode): none needed — the finding blames no one, and the £15 string is the section schema's own default (dog-nook-bundle.liquid:109, dog-nook-featured-bundle.liquid:87) carried into the shared template. That is a template default surviving, not a decision anyone made.
6. STATUS.md: does not contradict it — it corroborates it (lines 84-85 queue "the First Days Kit says 'save £15' in several places when the true figure is £14.98").

Two accuracy corrections, and one thing the finding gets materially wrong about the fix:
- "the homepage badge for the same product correctly says 'Save £14.98'" is imprecise. Loaded the homepage on the same asserted theme: the First Days Kit block's *badge* is "GREAT STARTER KIT"; it is the *save chip* that reads "You save £14.98" (index.json:302). The substance — the site states £14.98 elsewhere — holds.
- Novelty: this is not new. It is already logged verbatim as PROBLEMS-1.md P1-12 ("the First Days Kit badge says 'SAVE £15' while its own chip says 'You save £14.98' — same page, two numbers"), and as TODO 1 in START-HERE-NEXT-BUILDER.md. The owner has deferred it until after the audit. It should be filed as a duplicate, not a new item.
- effort:"quick" is a trap as written. That badge lives in the shared templates/product.bundle.json, which six products use. Editing "SAVE £15" → "SAVE £14.98" would be true for the First Days Kit and would create a *fresh* false claim on the Settle-In Bundle (true saving £7.98) and the four draft kits. Blanking the badge, or driving it per-product, is the only safe quick fix.

Impact: I'd downgrade medium → low-medium. It is 2p, on one product, on an unpublished draft. The severe exposure from the same hardcoded badge is the Settle-In page (£15 badge vs £7.98 real, and a "bought separately £49.97" that is really £72.97) — already logged as P1-12 and rated red there.

Positioning note (POSITIONING.md test): the badge slot is doing discount-ladder work — "BEST VALUE" invites "how much do you want to spend?" The position says the bundles are stages, not tiers. The right replacement is not a corrected number but the stage itself ("Days 1–3 · decompress"), which removes the compliance surface and advances the position at the same time.


**[V2] HELD** — HOLDS — I independently reproduced it rather than trusting the report. Method: started tools/agent-browser tunnel, ran `node tools/agent-browser/browse.mjs https://thedognook.co.uk/products/the-settle-in-bundle --theme 193438056731 --text --shot`. Exit 0, theme assertion PASSED (banner: "The Dog Nook — Design Install (CRO working copy) [unpublished]", id 193438056731), so L002 (wrong-theme-served) is ruled out. The rendered text I got back matches the finding word for word: "BEST VALUE · SAVE £15" / "THE RESCUE BUNDLE" / "Three gentle essentials for a nervous dog settling in" / WHAT'S INSIDE = Lick Mat £11.99, Snuffle Mat £22.99, Slow-Feeder Bowl £14.99 / "Bought separately £49.97" / "£64.99" / "You save £7.98". I also read the screenshot: £49.97 is rendered STRUCK THROUGH directly against £64.99, so it reads visually as a "was" price lower than the price being asked — worse than the text dump suggests. Not dressed-up inference; this is a loaded page.

Corroboration on the substance (three independent sources, so the "innocent explanation" routes are closed):
1. Contents ARE wrong. £11.99+£22.99+£14.99 = £49.97 exactly = the First Days Kit's line-up. Admin API (search_products): The Settle-In Bundle's own description is "a deep bed to burrow into, plus two gentle, nose-led ways to unwind"; the homepage card (loaded, same theme assert) says "A deep calming bed to burrow into, plus a lick mat and snuffle mat". So the bundle does NOT contain a Slow-Feeder Bowl — the "maybe it really does contain one" escape is ruled out by the store's own product record and its own homepage copy.
2. The maths is right. Calming Donut Bed Medium £37.99 + Lick Mat £11.99 + Snuffle Mat £22.99 = £72.97, which is exactly the compare-at the homepage shows, giving the true £7.98. Read literally the PDP asks £64.99 for parts it says cost £49.97 — £15.02 MORE — while badging "SAVE £15".
3. Homepage/PDP contradiction is real: I loaded the homepage under the same theme assert and it shows "£64.99 / £72.97 / You save £7.98" for the same SKU.

Mechanism confirmed in source, not guessed: templates/product.bundle.json hardcodes eyebrow/heading/items/separately_total "£49.97"/save_label "You save £15"/badge "BEST VALUE · SAVE £15"; sections/dog-nook-bundle.liquid L49-52 renders the compare-at-derived chip when compare_at > price and falls back to save_label otherwise. That also explains why "£7.98" and "SAVE £15" coexist — the true chip comes from the product, the false badge from the shared template.

No owner-blame inference is being made here, correctly: this is a shared-template default left in place by theme work (owner: claude), not an owner action, so the run-#1 class of error (accusing the owner without ruling out innocent causes — e.g. the genuine offline-collected reviews) is not repeated.

No contradiction with STATUS.md — it agrees. STATUS.md "STILL OPEN — LIVE COMPLIANCE RISK" describes the identical defect and queues it as TODO 1 in START-HERE-NEXT-BUILDER.md. The finding adds what STATUS.md does not record: the third number ("You save £7.98") actually rendering alongside the other two, and the strikethrough presentation.

Only precision issues, not defeaters: (a) "arithmetically impossible saving" is loose — £7.98 is the one TRUE number on the screen; the false ones are the £49.97 total and the £15 badge. (b) Against the position: the page fails the POSITIONING.md test outright — it labels the Weeks 1–3 "settle" stage product with the Days 1–3 kit's contents, so the one element that should tell a shopper which stage they are buying tells them the wrong one. That is a bigger problem than the pricing.


**[V3] HELD** — The evidence is real and I reproduced it independently. Fetching the preview URL with a cookie jar, the documented L002 trap fired (301 kkeqih-jm.myshopify.com -> thedognook.co.uk with the param, then 302 stripping it), but the preview cookie carried and the returned HTML asserts Shopify.theme = {"name":"The Dog Nook - Design install (CRO working copy)","id":193438056731,"role":"unpublished"} - the correct draft. The hero renders verbatim as reported: <div class="tdn-eyebrow tdn-eyebrow--light">Made for anxious & rescue dogs</div><h1 class="tdn-h1 tdn-hero__h1">Less anxious.<br>More at home.</h1> plus the stated sub. Uppercase eyebrow is genuine (text-transform: uppercase on .tdn-eyebrow, /home/user/sc/dog-nook-theme/assets/dog-nook.css:63). "Largest type" is genuine: the fullbleed variant sets .tdn-hero-b .tdn-hero__h1 to 64px desktop / 42px under 760px, versus 34px for the next-largest H1 on the page. Backed in source at /home/user/sc/dog-nook-theme/sections/dog-nook-hero.liquid:89-91 (schema defaults) and /home/user/sc/dog-nook-theme/templates/index.json:16-18. This is a loaded page, not dressed-up inference, and the auditor got the draft theme rather than the live one - the live theme has no such hero, so they could not have produced these strings from the wrong theme.

Substance survives too. The brief's own binding contrast is "reduces anxiety" prohibited / "for dogs who find fireworks hard" permitted, and STATUS.md:24 repeats it. "Less anxious." is an outcome claim on the state the ASA treats as a health condition, and the sub beneath it names the products ("Calming beds, mats and grooming tools"), so overall impression ties the outcome to the goods. The eyebrow "Made for anxious & rescue dogs" is an audience descriptor and is fine - the finding correctly targets the H1 only.

Innocent explanations I checked and ruled out: (1) wrong theme - refuted by the asserted theme id; (2) owner-authored copy the owner defended - refuted, this is an agent-written theme schema default committed in the repo, and the finding makes no owner-blame inference, so it is not the run #1 error class; (3) already flagged and knowingly accepted - the 2026-08-05 recon report never mentions the hero or this line (grepped); START-HERE-NEXT-BUILDER.md:126-127 does queue replacing the hero, but purely on positioning grounds ("Where's your dog right now?"), with no note that the current line is a compliance problem; (4) contradicts STATUS.md - it does not. STATUS.md lists only the bundle savings maths as open compliance risk, so this is an omission from STATUS, not a conflict, and STATUS.md:24 states the very rule being broken.

Three corrections that narrow or widen the finding without killing it. First, scope: I loaded https://thedognook.co.uk/ bare and asserted id 193140818203, role "main" - the live theme has no hero section and zero occurrences of "anxious". So this is a pre-publish blocker on an unpublished draft, not a live ASA breach; "on the site"/"on the store" overstates current exposure. Second, the hero is not the only instance on that page - the draft homepage meta description reads "Calming beds, lick mats and grooming tools chosen to soothe anxious and rescue dogs", the same class of outcome claim, so a fix confined to the H1 leaves the page non-compliant. The finding's line "the product copy elsewhere observes the rule carefully" is unverified by me (I only audited the homepage, not PDPs) and is contradicted at least for the homepage meta. Third, "effort: quick" is true only for a patch. Against POSITIONING.md the line also fails the test on its own merits - it tells nobody which of the 3-3-3 stages their dog is at - and the proper fix is the already-specified stage hero, which is not quick.


**[V4] HELD** — The evidence is real and I reproduced it independently, on the correct theme with Shopify.theme.id asserted. Homepage on draft 193438056731 renders "Registered UK trader — a real person replies" (1 grep hit, under the cell title "A real UK business"); /products/the-settle-in-bundle on the same asserted theme renders "The Dog Nook is a trading name of Aryan Sarna, a sole trader based in the United Kingdom. Business address: 10 Old Farm Close, Hounslow, TW4 7AB". Source lines confirm it: templates/index.json:116 (section dog-nook-trust-strip, block b1) and store-config/footer-group.json:266. Not applied to the draft — confirmed by the render, not just the repo. This is a loaded page, not dressed-up inference; note that a plain curl of the myshopify preview URL 301s to thedognook.co.uk and silently serves the LIVE theme, so the assertion was load-bearing. TWO THINGS ARE WRONG WITH THE FINDING AS WRITTEN. (1) The stated reason is unsound. "Registered UK trader" does not assert Companies House registration, and UK sole traders ARE registered — with HMRC for Self Assessment (legally required), and possibly for VAT. I could not rule out VAT registration from the repo or the site, so the phrase is not provably false. The real defect is an unsubstantiated, ambiguous legitimacy claim in a trust strip, not a false one — and that distinction matters, because "overclaim/false" invites a compliance framing the facts do not support. (2) The "while the footer correctly says" framing is inaccurate for the homepage. I dumped full document.body.innerText: the homepage has no trader identity block at all — "trading name", "Aryan Sarna", "Old Farm Close" and "hello@thedognook" all return 0 hits, and its footer ends at "© 2026 The Dog Nook / Terms and Policies". The correct disclosure renders on product and about pages only. So the two texts never appear together, and a homepage visitor sees the ambiguous claim with no correction in context. NO CONTRADICTION WITH STATUS.md: its "Footer / nav — real trader identity" line concerns the footer and is true; it never claims the trust strip was fixed. INNOCENT EXPLANATIONS RULED OUT: not an owner assertion about registration status — git log -S shows the phrase entered in commit 8f83371, a Claude-authored index.json rewrite; not owner negligence — the recon quick-win list is documented as unstarted, so non-application is scheduling. Innocent explanation NOT ruled out: the owner may be VAT-registered, which would make the phrase defensible though still ambiguous in this placement. Impact "medium" is overstated: this is a two-word text edit with honesty value but no direct conversion effect, and by POSITIONING.md's own test it does nothing to help someone identify their dog's stage.


**[V5] HELD** — The core factual claim survives independent re-verification, but the finding overstates the legal position and its stated evidence method could not have produced what it reports.

HOW I CHECKED (all "loaded-page", not inference): started tools/agent-browser/tunnel.py, then loaded https://kkeqih-jm.myshopify.com/ through it with an asserted theme (L002 trap avoided) — served theme was 193438056731 "The Dog Nook — Design install (CRO working copy)", role unpublished, status 200. I enumerated document.querySelectorAll('form') on load, again after a real wheel-scroll past 45%, and again after a further 14s dwell, and dumped each form's action, anchors, ancestor anchors and the raw innerHTML of the newsletter section, the quiz email step and the popup card. I also read snippets/dog-nook-email-popup.liquid, snippets/dog-nook-quiz-steps.liquid and sections/dog-nook-newsletter.liquid in the repo.

CONFIRMED: three email-collecting forms exist — /contact#contact_form (.tdn-newsletter__form), /contact#tdn-quiz (.tdn-quiz__form), /contact#tdn-emailpop (.tdn-emailpop__form). Rendered innerHTML of all three blocks contains zero <a> elements of any kind, so no privacy link at any of the three points of collection. The popup card's anchor list really is []. The newsletter section's Liquid schema has no privacy-link setting, so this is not a switch someone turned off.

WHERE THE FINDING IS WRONG OR INCOMPLETE — the innocent explanation it did not rule out: the page is NOT privacy-notice-free. The same rendered page carries three /policies/privacy-policy links — footer nav "Privacy Policy" (visible), the footer policy popover "Privacy policy" (present, hidden until opened), and the cookie banner "We use cookies … Privacy Policy" (visible). The newsletter band sits directly above that footer link. UK GDPR Art. 13 permits layered notices, and a footer privacy link is the ordinary minimum; the ICO recommends, rather than mandates, a link beside the form. So for the newsletter band and the quiz step this is a best-practice gap, not a demonstrated breach, and the finding's "UK GDPR Art. 13 requires the notice at the point of collection" reads harder than the facts support. The one place the argument is genuinely strong is the modal popup: I confirmed in source and in the DOM that it is a focus-trapping role="dialog" with a full-screen backdrop, so while it is open the footer link is neither visible nor tabbable — there the visitor really does have no route to the notice.

EVIDENCE-METHOD DEFECT (not fatal, but it should not be repeated): the popup is not in the DOM on load. It lives in a <template id="tdn-email-popup-tpl"> and is cloned into <body> only after 12s dwell or 45% scroll. querySelectorAll('form') does not descend into template content — my own initial-load pass found 5 forms and only 2 email forms; the third appeared only after I scrolled. So a single "enumerated every form in the DOM" pass on a fresh load cannot have returned three email forms with a popup anchor list. The finding's popup text is nevertheless verbatim correct against what renders, and I have now confirmed the substance first-hand, so the conclusion stands even though the described method does not.

STATUS.md: no contradiction. STATUS's "Legal pages … real content, UK-compliant" is about the policy pages themselves, not about links at capture points, and recon quick-win #8 is listed as open. Consistent.

Scope/effort: correct — the fix is one line each in sections/dog-nook-newsletter.liquid, snippets/dog-nook-quiz-steps.liquid and snippets/dog-nook-email-popup.liquid. None is dog-nook.js or dog-nook-cro.css, so the do-not-touch rule does not block it. Impact should be trimmed from medium to low-medium: it is compliance hygiene with no 3-3-3 positioning value and no conversion gain — under POSITIONING.md's test it does not help anyone work out which stage their dog is at.


**[V6] KILLED** — The evidence is real — I reproduced it, so this is not dressed-up inference. Loading https://thedognook.co.uk/ with theme asserted as 193438056731 renders both strings verbatim ("4.8 / ★★★★★ / from 80 real owner reviews" and "Collected from real owners in person and online. We never write our own."). The MCP approval block is also real; graphql_query returned "requires approval" for me too. But both defect claims fail.

(1) "and online" — NOT PROVEN, and the innocent explanation named is the wrong one. The sentence's verb is "Collected", which describes how the REVIEWS were gathered, not where the PRODUCTS were sold. A customer who bought by hand can send their review by email, Facebook message or a form — that is collecting a review online, and it makes the wording literally true with zero online sales. The project's own doc anticipates exactly this: /home/user/sc/dog-nook-theme/REVIEWS-SETUP.md §4 — "If you collect a few genuine reviews off-platform (e.g. by email)". The finding only ruled out "sold online elsewhere (eBay/Etsy/Facebook Marketplace)" and never considered the collection-channel reading, so its ruling-out is incomplete. This matters because it is the same shape of error as run #1: reasoning from a sales-channel fact to a conclusion about the review record. Worse, the proposed remedy could reduce accuracy — if any of the 80 arrived by email, cutting to "in person" alone would itself be the overclaim. There is no contradiction with STATUS.md: STATUS lines 51-63 state where the products were sold and that the owner "collected the reviews from those real customers", but say nothing about the collection channel. Nothing to adjudicate.

(2) "4.8 unverified" — the stated obstacle was real but was not the only route, and the storefront answers it. All 8 review-carrying products render "4.8 · 10 reviews" on /collections/all. Eight equal-sized groups each with mean 4.8 pool to exactly 4.8 across 80, so the homepage aggregate is arithmetically exact given the per-product data. I also checked distinctness: the donut bed's 10 reviewers (Jamie K., Rachel D., Sophie M., Callum R., Daniel W., Hannah P., Ben T., Amy L., Priya N., Olivia S.) and the grooming glove's 10 (Rebecca D., Yasmin G., Melissa P., Craig W., Dean M., Frances O., Nicole A., Simon T., Luke S., Andrew K.) do not overlap, so 8 × 10 = 80 is supported, not merely "arithmetically consistent". What stays unaudited is whether each per-product 4.8 is the true mean of its own 10 — but that is the pre-existing per-product figure STATUS has already ruled genuine, not something the homepage introduces. So this is not a homepage finding.

Against POSITIONING.md the block also does no stage work at all, which the finding never tested.

What DOES survive is something the finding treated as settled background: this section is not a defect but the recon report is wrong about it. The report's quick-win #4 and its "audits disagree" note both say agg_rating/agg_count "don't render today" and are a dormant landmine. On the deploy target they render. Git's dog-nook-reviews-placeholder.liquid has no such schema ids, so the draft carries a newer section — one more instance of the known asset drift. And the rendered values match templates/index.json lines 374-376 character-for-character, so the aggregate is hardcoded copy, not computed from the metafields (inference from the exact string match, not observed in the deployed Liquid, which I could not read). That is the real, provable risk: STATUS says more reviews are coming from the same channel, and when they arrive "4.8" and "80" will silently go stale. Today they are accurate.


**[V7] HELD** — HOLDS — I reproduced it independently and the obvious innocent explanation is ruled out.

WHAT I DID (evidence standard):
1. Read /home/user/sc/dog-nook-theme/sections/dog-nook-reviews-placeholder.liquid. The finding describes it accurately: three dashed cards in a (1..3) loop, schema with exactly four settings (eyebrow, heading, body, placeholder_note), heading default "Real reviews, coming soon", placeholder_note default "Awaiting verified review", no rating fields. Classes are tdn-review, tdn-review__stars, tdn-review__line, tdn-review__note.
2. Read /home/user/sc/dog-nook-theme/templates/index.json lines 369-378. The "reviews" section sets eyebrow/title/agg_rating/agg_count/subtitle, and has no block_order.
3. LOADED THE PAGE, with the L002 guard applied. curl with a shared cookie jar against the primary domain: `curl -sSL -c cj -b cj "https://thedognook.co.uk/?preview_theme_id=193438056731"`. Asserted the theme on the response: Shopify.theme = {"name":"The Dog Nook — Design install (CRO working copy)","id":193438056731,"role":"unpublished"}. This is the correct target theme.
4. The draft renders: eyebrow "Kind words", h2 "Loved by dog owners", "4.8", "★★★★★", "from 80 real owner reviews", subtitle "Collected from real owners in person and online. We never write our own.", then six named testimonial cards (Hannah P./Donut Bed, Nicole A./Grooming Glove, Emma C./Slow-Feeder Bowl, Bethany R./Snuffle Mat, Sarah N./Nail Grinder, Lucy A./New Rescue Bundle) and a "Shop the range" CTA. Zero occurrences of "Awaiting verified review" or "Real reviews, coming soon". Rendered class names are tdn-revwall__agg/__num/__stars/__count/__sub/__grid/__cta and tdn-reviewcard__* — none of which exist anywhere in the repo file. Section id is shopify-section-template--28588268192027__reviews, i.e. the same section key, a different implementation.

INNOCENT EXPLANATIONS I CHECKED AND RULED OUT:
- Wrong theme (the L002 trap, and the one the finding's own sloppy evidence URL invites). I loaded the bare https://kkeqih-jm.myshopify.com/ separately: it 301s to thedognook.co.uk and serves Shopify.theme id 193140818203, role "main". That live theme contains ZERO "tdn-" classes and zero occurrences of "Loved by dog owners" or "80 real owner reviews". So the strings the finding reports cannot have come from the live theme — they only exist on the draft. The observation is a real load, not dressed-up inference, despite the citation being wrong.
- Wrong file in the repo. I grepped the whole of dog-nook-theme/ for the rendered strings and for tdn-revwall/tdn-reviewcard: the only hits are in templates/index.json. No other section file produces this.
- Fabricated reviews (the run #1 error class). The finding does NOT make that claim and I am not making it either. "4.8 / 80" is arithmetically consistent with the genuine offline-collected reviews STATUS.md records (8 products x rating_count 10 at rating 4.8 = 80), and the on-page subtitle "Collected from real owners in person and online. We never write our own." is exactly the honest framing. Nothing here should be deleted.

CONTRADICTION WITH THE DOCS — WHO IS RIGHT:
- The recon report is WRONG on this point and the finding is right. Report line 97 ("delete the orphan agg_rating/agg_count keys from templates/index.json... They don't render today") and line 158 ("Two audits agree it does not [render] — so it's a dormant landmine") are refuted by the rendered page. Both audits reasoned from the git section schema and never loaded the page — the report itself admits this at line 139 ("Nothing in this report was seen rendered").
- STATUS.md is right in spirit and too narrow in letter. Its asset-drift bullet names only dog-nook.js and dog-nook-cro.css; a section .liquid is also drifted.
- Diagnostic refinement the finding missed, and it inverts the recon report's remedy: the repo's index.json settings (title/agg_rating/agg_count/subtitle) MATCH the deployed section's schema. So index.json is the current file and the section .liquid in git is the stale one — the settings are not orphans at all. Deleting them, as the recon report advises, would be fixing the wrong half and would strip a line about genuine owner reviews.

WHERE THE FINDING OVERSTATES (see corrected):
- "what customers see" is wrong. Theme 193438056731 is unpublished. Customers today get 193140818203, a wholly different non-TDN theme. This is a reliability problem for the audit of the thing about to be published, not a live customer-facing breach — it does not carry live-compliance urgency.
- "covers sections" (plural) is extrapolated from n=1. I diffed every string setting in the repo's index.json against the rendered draft: only the reviews section is materially drifted. hero.ticks, countdown.heading and newsletter.success_text did not appear, but those are benignly explained (list rendering, countdown disabled, JS-only success state). One section is proven drifted; the scope of the rest is unknown, which is precisely why the recommended remedy is right.
- Unresolved and worth stating: the six testimonial cards are not in the repo's index.json (no block_order), so either the deployed section hardcodes them or the deployed index.json also carries blocks. I could not distinguish without pulling the theme. I did not read the review metafields (the Shopify MCP call needed approval), so I have NOT independently verified that 80 is the true total.


**[V8] KILLED** — The underlying observation is TRUE and I verified it independently — but the finding as written fails on evidence accuracy and on the innocent-explanation rule, so it does not hold in this form.

HOW I CHECKED (all loaded-page unless stated): started tools/agent-browser/tunnel.py (already listening), then ran `node tools/agent-browser/browse.mjs https://kkeqih-jm.myshopify.com/ --theme 193438056731 --text`. It returned status 200, theme 193438056731 ("The Dog Nook — Design install (CRO working copy)") [unpublished] — so unlike the L002 trap, I confirmed I was on the DRAFT theme, not live 193140818203. I have the full rendered body text.

WHAT IS CONFIRMED. No "3 days", "3 weeks", "3 months", "decompress", "Where's your dog right now?", or "Sold by hand before it was ever sold online" appears anywhere in the rendered homepage. The hero is "MADE FOR ANXIOUS & RESCUE DOGS / Less anxious. More at home." The bundle section eyebrow/heading are exactly "TWO WAYS TO START" / "Pick the kit that fits where your dog is", and the body is verbatim "Just settling a new rescue, or want the full nose-to-tail set-up? Start small with the mats, or go all-in with the calming bed included — both save you money versus buying separately…" (rendered, and matches dog-nook-theme/templates/index.json §bundle_intro, read from file). So the quoted strings are real.

WHY IT STILL FAILS:

1. THE EVIDENCE STRING DOES NOT REPRODUCE. I ran the finding's exact grep. It returns **0 hits, not 1** — and "settle in" cannot match any alternative in that pattern (there is no "settle" term in it). Grepping "settle" separately returns 5 hits. So the sentence "One hit, and it was the substring 'settle in'" was not produced by the run described; it is two different greps conflated into one reported result. The direction is unaffected (0 is stronger than 1), but a finding whose stated evidence does not reproduce cannot be passed through under the evidence standard — this is exactly the dressed-up-inference pattern the rule exists to catch.

2. NO INNOCENT EXPLANATION WAS NAMED, AND THERE IS AN OBVIOUS ONE. POSITIONING.md is dated "Decided by the owner, 2026-08-05" — the same day as the recon report. START-HERE-NEXT-BUILDER.md TODO 3 item 2 says verbatim: "Homepage hero asks the question — 'Where's your dog right now?' — with three doors, one per stage." It is filed as "the main body of work", with a numbered seven-step build order. So the homepage predates the position, and its absence is a documented, queued, not-yet-started work item — not something the owner got wrong and not a discovery. Presenting it as "the whole homepage is a miss" implies a defect that was shipped. This is run #1's error class in a new key: an accusatory frame on something the repo already explains.

3. IT TESTS FOR SOMETHING THAT CANNOT LEGITIMATELY RENDER. The grep list includes "Complete Calm" and the finding faults the page for "no three doors". I checked product status via the Shopify Admin API: only TWO bundles are ACTIVE — The First Days Kit £34.99 and The Settle-In Bundle £64.99. The Complete Calm System £139.99 is **DRAFT**, as are Home-Alone, Fireworks Survival and Fireworks Ready; First Nights is ARCHIVED. Per STATUS.md the draft range is blocked on owner-only work (sourcing + photography). So "TWO WAYS TO START" is literally accurate and honest given two sellable bundles, and a third door to a stage-3 product does not exist to link to. Faulting the page for not naming a draft product is an unfair test.

4. ONE OVERSTATEMENT IN THE HEADLINE. "Not one word" is right about the 3-3-3 *vocabulary*, but wrong as a description of the section's framing: the heading is literally "Pick the kit that fits where your dog is" — the positioning question in weaker, uncalibrated form — and the cards carry "BEST FOR NEW RESCUES" / "START SMALL" / "OUR MOST COMPLETE KIT", an implicit progression. The gap is that the progression is uncalibrated and unnamed, not that it is absent.

5. THE "DISCOUNT LADDER" READ SLIGHTLY OVERREADS POSITIONING.md. That file rejects savings as the *reason* to move up the ladder ("the upsell stops being a discount and becomes a diagnosis"), and START-HERE TODO 3.1 explicitly says "Keep the real savings maths — the stage is the *reason*, the saving stays true." So stating a true saving is not the violation; the violation is that the saving is the ONLY reason offered.

CONTRADICTS STATUS.md? No. STATUS.md records the position as newly decided 2026-08-05 and nowhere claims the homepage implements it. STATUS.md is right; the finding is not in conflict with it, it is just not news relative to START-HERE-NEXT-BUILDER.md TODO 3.

SEPARATE, GENUINELY NEW ITEM FOUND IN THE SAME PAGE LOAD (flagging because it is higher urgency than the finding under review and corrects a stated belief): the homepage RENDERS "4.8 ★★★★★ from 80 real owner reviews" plus "Collected from real owners in person and online. We never write our own." The 2026-08-05 recon report, quick win #4, asserts these agg_rating/agg_count keys "don't render today — they are one schema rename away". That is FALSE as deployed: I saw them render on 193438056731. The repo's sections/dog-nook-reviews-placeholder.liquid contains no rating/count reference (grepped the file), so the deployed section differs from the repo — the known asset drift. This is a store-wide 4.8 aggregate over "80 real owner reviews" on the theme queued for publishing; unlike the per-product reviews (genuine, owner sold in person, do not touch) this is a homepage-level aggregate figure that would need the same offline evidence to stand up under DMCC 2024. Worth its own finding, evidenced by page load.


**[V9] HELD** — SUBSTANCE CONFIRMED — I reproduced it independently rather than trusting the report. Method: started tools/agent-browser/tunnel.py, primed the preview cookie, and drove the quiz with Playwright against a page where I asserted window.Shopify.theme.id === 193438056731 (served: "The Dog Nook — Design install (CRO working copy)" [unpublished]). Six paths, same shape as claimed. Results verbatim: Just adopted + Small → The Settle-In Bundle / /products/the-settle-in-bundle / £64.99 / "...Sized for a small dog."; Just adopted + Large → identical except "Sized for a big dog."; Just adopted + Medium → identical except "Sized for a medium dog."; Fireworks + Small and Fireworks + Large → The Lick Mat £11.99 both times; Mealtimes + Large → The Slow-Feeder Bowl £14.99. Source agrees: sections/dog-nook-quiz.liquid puts the whole recommendation on Q1 blocks as data-rec-url / data-rec-title / data-rec-price, and assets/dog-nook-quiz.js line 41-44 uses state.size for exactly one thing — appending "Sized for " + size + "." to the why copy. Nothing else reads state.size; the step-3 form posts only contact[email] and contact[tags], so the size answer is not captured either. Q1 targets read from templates/index.json match what rendered (lick-mat-1, the-settle-in-bundle, snuffle-mat-medium-1, slow-feeder-bowl-1, grooming-glove-1). So this is a loaded page, not dressed-up inference.

THREE CORRECTIONS, none fatal to the finding:

1. Misquote of POSITIONING.md. It does not say "replace Q2". POSITIONING.md ("The quiz") says: "Already asks what's hardest right now. Add one question: 'How long have you had them?'" — and START-HERE-NEXT-BUILDER.md item 4 repeats "Add one question to the quiz". Whether size survives is an open design call, not something the position prescribes. The finding puts words in the position document.

2. "Does no work at all" is overstated. Q2 does one thing by design: snippets/dog-nook-quiz-steps.liquid carries the comment "STEP 2 — size. Personalises the result copy." It is inert for routing, not literally inert.

3. Innocent explanations the finding did not rule out — and I checked each. (a) Intent: the code comment shows size was built as copy personalisation, never as a router; it is not a broken router. (b) Chronology: the quiz shipped 2026-07-25 (commit 8d25f73); 3-3-3 was adopted 2026-08-05 (commit fd49eff). The quiz cannot have "asked size instead of" a question that did not exist when it was written — this is pre-positioning work, not an owner mistake. Run #1's error class (inferring fault without checking the innocent timeline) is exactly what the finding's title repeats. (c) Already queued: this is TODO 4 in START-HERE-NEXT-BUILDER.md, with the same wording. It is a known scheduled gap re-reported as a discovery, so "high impact / new finding" should read "high impact / already scheduled".

EVIDENCE-CITATION FAULT worth flagging. The evidence line reads "six scripted runs on https://kkeqih-jm.myshopify.com/ quiz" with no preview_theme_id and no statement that the theme was asserted. I loaded that exact URL with no cookie: it serves the LIVE theme 193140818203, and greps for "hardest moment" and "Find your dog" return 0 hits — the live theme has no quiz. So the URL as cited could not have produced these runs; the author must have primed the preview cookie but did not say so, and did not assert Shopify.theme.id. That is the L002 trap STATUS.md makes mandatory. The numbers happen to be right (I re-checked on the asserted draft), but the citation as written does not meet the evidence standard.

NO CONTRADICTION WITH STATUS.md. STATUS says only "Calm-kit quiz | On homepage, 5 answers → real active products" — true, and silent on Q2. It is also consistent with recon item 17 (four of five answers route to a sub-£23 single product): I measured £11.99, £22.99, £14.99, £11.99.

ONE THING THE FINDING MISSED that makes it worse, not weaker. I fetched /products/the-settle-in-bundle.js: one variant, "Default Title", £64.99, single option "Title". The bundle has no size choice at all. So "Sized for a big dog." is not merely decorative — it is an unsupported fit assurance printed over a fixed-size product, on the one recommendation in the quiz that is a bundle. That is a small truthfulness problem in its own right, not just a wasted question.


**[V10] HELD** — HOLDS — independently reproduced, and the evidence is real. But the finding is mis-framed in three ways and overstates live exposure, so the restatement below should replace it.

WHAT I DID (how I know each thing)
1. Read files: POSITIONING.md, STATUS.md, dog-nook-theme/assets/dog-nook-quiz.js, snippets/dog-nook-quiz-steps.liquid, templates/index.json, assets/dog-nook.css.
2. Loaded the preview homepage with a cookie jar through the myshopify->thedognook.co.uk 301 and asserted Shopify.theme = {"id":193438056731,"role":"unpublished"} (L002 trap cleared — I was not reading the live theme).
3. Loaded the PDP the same way and re-asserted the theme id on that page too.
4. Fetched the DEPLOYED minified asset from the draft theme's own CDN path /cdn/shop/t/12/assets/dog-nook-quiz.js — it contains why+="Sized for "+state.size+"." So this is the deployed behaviour, not just repo source (rules out the known asset-drift trap).
5. Fetched theme-independent store data via products.json and per-product .json endpoints.

THE TWO PILLARS BOTH HOLD
- The string is real: assets/dog-nook-quiz.js lines 41-44 append 'Sized for ' + state.size + '.' to the result copy; dog-nook-quiz-steps.liquid lines 12-20 set data-tdn-size to "a small dog" / "a medium dog" / "a big dog". Confirmed in the deployed minified asset.
- The Settle-In Bundle genuinely has no variants: products/the-settle-in-bundle.json returns a single variant, option "Title"/"Default Title", £64.99. On the rendered PDP the add-to-cart form carries one hidden <input name="id" value="52631608492315">, and all 12 occurrences of "variant-picker" in the HTML are CSS custom properties or script/import-map URLs — no picker element renders. Nothing was dressed up.
- Verbatim quotes check out: the rendered buttons carry data-rec-price="£64.99" and "£11.99" (money values that exist only at render time, not in the repo), and .tdn-eyebrow has text-transform:uppercase, which is why the eyebrow was transcribed as "YOUR MATCH". Consistent with a genuine page load.

INNOCENT EXPLANATIONS I RULED OUT
- Picker rendered by JS and missed? No — the store data itself has one variant, so there is nothing to render.
- Repo differs from deployed theme? No — I pulled the deployed asset.
- Read the wrong (live) theme? No — theme id asserted on both pages.
- Bed might fit big dogs anyway? The store itself sells a separate Large bed, so the store's own position is that Medium is not the big-dog size.
- OWNER BAD FAITH: explicitly NOT inferred, and the finding was right not to. The source comment reads "STEP 2 — size. Personalises the result copy." The intent was personalisation; a personalisation token got written as a fit assertion. This is a one-line copy/logic bug, not dishonesty. (dog-nook-quiz.js is not on the do-not-touch list, which covers only dog-nook.js and dog-nook-cro.css, so it is fixable.)

WHERE THE FINDING IS WRONG OR WEAKER THAN IT SHOULD BE
a) It rests on ABSENCE (no picker), when there is a positive CONTRADICTION available. The bundle's own description states its contents are "The Calming Donut Bed (Medium) ... worth £72.97 bought separately". 11.99 + 22.99 + 37.99 = 72.97 exactly, which independently confirms the Medium bed. So the quiz does not merely make an unverifiable claim — it makes one the seller's own product copy contradicts.
b) It is not a Large-dog problem, it is a three-way problem. The bed inside is Medium, so "Sized for a small dog" is equally false; only "Sized for a medium dog" is true, by accident. Framing it as the Large case understates scope.
c) Lick mat is a much weaker case than the bundle and should not be presented as "the same pattern". A lick mat is genuinely size-agnostic; no consumer relies on its fit to their detriment. The high-impact case is the bundle alone.
d) Live exposure is overstated. I loaded https://thedognook.co.uk/ — live theme 193140818203, role "main", and it contains zero occurrences of data-tdn-quiz. The quiz exists only on the unpublished draft. This is a fix-before-publish defect, not a live DMCC breach.
e) It missed the real positioning failure, which is bigger than the legal one: the store DOES sell Small/Medium/Large (Calming Donut Bed, £29.99/£37.99/£44.99), and the quiz never recommends it. So the quiz collects the one answer that could legitimately change the recommendation, discards it, and reflects it back as a false claim. Against POSITIONING.md's test — "does this help someone work out which stage their dog is at, and get the right thing for it?" — it fails twice.
f) The suggested shape of the fix is misleading. Adding a size picker to the bundle would solve the wrong problem: the bundle is deliberately single-spec. The fix is to stop asserting fit (or to route size to the bed).

STATUS.md: no contradiction. It records the quiz as "On homepage, 5 answers -> real active products", which is true — all five targets are real, active, published products. STATUS.md is simply silent on the size step, so its "DONE (verified, don't redo)" row should not be read as covering it. STATUS.md is right; it is incomplete, not wrong.

ADJACENT, ALREADY-KNOWN (not a new finding): the Settle-In PDP renders headline "The Rescue Bundle" with contents Lick Mat + Snuffle Mat + Slow-Feeder Bowl and NO bed, plus a "SAVE £15" badge sitting above "You save £7.98" on the same page. That is the hardcoded templates/product.bundle.json issue already logged in STATUS.md. It compounds this finding: the quiz promises a bed, the PDP it links to shows none.


**[V11] HELD** — The evidence is real and the core claim survives — but two sub-claims are wrong and one innocent explanation was not ruled out.

WHAT I DID (all on the asserted draft theme, L002 guard on every load): started tools/agent-browser/tunnel.py, then drove the real quiz with Playwright — clicked each of the five answer buttons, a size, then Skip, and read the rendered result card. window.Shopify.theme asserted 193438056731 ("Design install (CRO working copy)", unpublished) on every page. Script: /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/quizrun.mjs

CONFIRMED, byte-for-byte: Fireworks & storms -> /products/lick-mat-1 £11.99; Just adopted -> /products/the-settle-in-bundle £64.99; Being left alone -> /products/snuffle-mat-medium-1 £22.99; Mealtimes & boredom -> /products/slow-feeder-bowl-1 £14.99; Grooming & handling -> /products/grooming-glove-1 £11.99. Prices cross-checked against the Shopify Admin API: 11.99 / 64.99 / 22.99 / 14.99 / 11.99 GBP, all ACTIVE. Source matches: /home/user/sc/dog-nook-theme/templates/index.json lines 190-250 hold exactly those five handles. Step 2 (size) only appends "Sized for a small dog." to the why-text and cannot change the recommendation (assets/dog-nook-quiz.js sets state.rec at step 1 only), so five runs exhaust the routing space and the claimed six runs are sufficient. This is not dressed-up inference — the pages were loaded and the buttons actually clicked.

ERROR 1 — "Confirmed live routing" is wrong wording. I loaded published live theme 193140818203 with the theme asserted: the quiz is not there at all (0 hits for "Find your dog's calm kit" and "What's the hardest moment right now?"). The routing exists only on the unpublished draft, so nothing described reaches a customer today.

ERROR 2 — "four of five answers end the journey at a single object" is false for three of the four. I loaded each destination PDP on the draft: lick-mat-1, snuffle-mat-medium-1 and slow-feeder-bowl-1 all render a live bundle upsell — "The Lick Mat is part of The First Days Kit" / "See the bundle ->". That is STATUS.md's custom.bundle_handle wiring working as documented. Only grooming-glove-1 has none (0 hits for "part of" and "See the bundle"). A bundle path exists one click on for 3 of the 4.

CONFIRMED — the half that matters against POSITIONING.md: zero stage context anywhere. "stage", "3 days", "first three months" returned 0 hits on all four PDPs, and the quiz result card renders only title + why + price + "Have a look".

INNOCENT EXPLANATION NOT RULED OUT: the quiz's rendered subheading says "Three questions. We'll point you at the one thing most likely to help — not the most expensive one." (grepped from rendered text on the draft). The cheap routing is a promise the page makes on screen, not an oversight — the section's internal comment ("routes shoppers to a bundle rather than a single £12 product") contradicts its own customer-facing copy. Blanket-repointing answers at bundles, which recon item 17 implies, would break that promise and read as the discount-ladder thinking POSITIONING.md rejects. The approved plan already has the better fix: START-HERE-NEXT-BUILDER.md TODO 3.4 — add "How long have you had them?" so the answer routes to a stage. The routing was set by a builder in templates/index.json, so no owner inference is involved and no run-#1-class error arises.

STATUS.md: no contradiction. Its DONE row reads "5 answers -> real active products" — true, and it never claims bundle routing. Recon item 17 is genuinely still open.

ADJACENT BUG FOUND, NOT IN THE FINDING: data-rec-img on all five answers is the literal string "Liquid error (sections/dog-nook-quiz line 37): invalid url input" (products have no featured_media). dog-nook-quiz.js treats it as truthy and sets it as img.src, so every result card renders a broken image instead of hiding it.


**[V12] HELD** — SUBSTANCE CONFIRMED — I reproduced it independently rather than taking it on trust. How I know: I started tools/agent-browser/tunnel.py and loaded https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731 with an asserted window.Shopify.theme.id, which returned 193438056731 "The Dog Nook — Design install (CRO working copy)" [unpublished], and dumped the innerText of every [id^="shopify-section-"]. The homepage renders, in this order: bundle_intro = "TWO WAYS TO START / Pick the kit that fits where your dog is / ..."; bundle_premium = "BEST FOR NEW RESCUES ... OUR MOST COMPLETE KIT / The Settle-In Bundle / £64.99 £72.97 You save £7.98"; bundle_entry = "GREAT STARTER KIT ... START SMALL / The First Days Kit / £34.99 £49.97 You save £14.98". Exactly two dog-nook-featured-bundle sections, no third. I also read dog-nook-theme/templates/index.json (order = hero, countdown, catbar, trust, why, quiz, bundle_intro, bundle_premium, bundle_entry, collections, reviews, newsletter) and dog-nook-theme/sections/dog-nook-featured-bundle.liquid + assets/dog-nook.css (.tdn-eyebrow has text-transform: uppercase, which is why the eyebrows render in caps). Source and render agree.

THREE DEFECTS IN THE FINDING, none fatal to the substance:

1. The evidence citation is wrong and, taken literally, would have been the live theme. The finding cites "https://kkeqih-jm.myshopify.com/" with no preview_theme_id. I loaded that bare URL: it serves theme 193140818203 (role: main) — the live theme — whose homepage contains NO bundle_intro/bundle_premium/bundle_entry at all. It has one "Featured Bundle / The New Rescue Bundle" media_with_content block and entirely different section IDs. This is exactly the L002 trap STATUS.md warns about. So the URL as written does not support the claim; the claim is only true on draft 193438056731. I cannot vouch for "howKnown: loaded-page" — the caps in the finding match the rendered CSS but could equally be stylisation of the sentence-case strings in index.json, and it quotes the index.json section keys rather than the rendered DOM ids (which are prefixed template--28588268192027__). The finding survives only because I loaded it myself.

2. "the section headline hardcodes a two-rung ladder" is inaccurate. "Two ways to start" is the EYEBROW field. The HEADLINE is "Pick the kit that fits where your dog is" — which is already stage-shaped language and hardcodes nothing about two. That makes the fix smaller than implied: one eyebrow string, not a headline rewrite. (Similarly, "BEST FOR NEW RESCUES" is the image badge and "OUR MOST COMPLETE KIT" is the eyebrow — the finding presents both as badges. Cosmetic, both render.)

3. blocker: "none" contradicts the finding's own detail text and STATUS.md. STATUS.md lists the premium bundles as draft and "Source the draft range (~12 products)" as ⛔ owner-only. The Complete Calm System £139.99 (POSITIONING.md, months 1–3) is not a sellable product today, so a third purchasable door cannot be rendered. Relabelling the two existing rungs by stage is unblocked; the third rung is blocked on the owner.

INNOCENT EXPLANATIONS THE FINDING DID NOT NAME (the run #1 failure mode). (a) Only two bundle blocks render because only two bundles are sellable — that is the honest state, not an oversight; the finding half-acknowledges the sourcing constraint but then stamps blocker: none and impact: high, which reads as a defect where the real story is "correct today, incomplete against a position adopted later". (b) POSITIONING.md is dated 2026-08-05, and this homepage predates it — so the "inversion" is pre-position work not yet migrated, not a decision made badly against the position. Framing it as inverted-against-the-position without that date is the same shape of unfair inference run #1 made. (c) "BEST FOR NEW RESCUES" is a recommendation/opinion, not an unevidenced popularity or social-proof claim, so unlike "most popular" it carries no DMCC exposure — this is a positioning issue only.

NO CONTRADICTION WITH STATUS.md. STATUS.md nowhere claims three homepage doors; "3 premium bundles built (draft)" is consistent with what renders.

The "inversion" itself is a judgement, not a fact — but it has a hard, checkable core the finding missed: the store's own product handle for the £34.99 day-1 kit is the-new-rescue-bundle-1, while the badge "BEST FOR NEW RESCUES" sits on the £64.99 kit. The phrase "new rescue" is attached to both, on the same page. That inconsistency is objective and is the stronger version of the claim. Also missed and reinforcing it: bundle_premium renders ABOVE bundle_entry, so £64.99 is the first rung a visitor meets.

SIDE OBSERVATION, out of scope but I saw it on the same load and it contradicts the recon report: the reviews section renders "4.8 ★★★★★ from 80 real owner reviews". The 2026-08-05 recon report states in two places that the homepage agg_rating/agg_count in templates/index.json do NOT render and are a "dormant landmine". On draft 193438056731 they DO render. "80 real owner reviews" is a different, larger number than the 10-per-product genuine offline set STATUS.md documents, so this needs its own check — worth raising separately.


**[V13] KILLED** — REFUTED on its central mechanism. How I checked: started tools/agent-browser/tunnel.py and loaded https://kkeqih-jm.myshopify.com/ at 375x812 in three separate instrumented Playwright runs, each asserting window.Shopify.theme.id — all returned 193438056731 "The Dog Nook — Design install (CRO working copy)" [role: unpublished], so this is the right theme, not the live one. Scripts: /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/{measure,trigger2,trigger3}.mjs.

WHAT THE FINDING GOT RIGHT (independently reproduced, not taken on trust): document height is exactly 7745px; viewport 812px; the Settle-In section (shopify-section-...__bundle_premium) does start at y=3105; and the served popup script does trigger on 12s dwell OR (scrollTop+innerHeight)/scrollHeight > 0.45. Those four numbers are all correct.

WHAT IT GOT WRONG — the trigger does not land where the finding says. Solving the theme's own inequality: (scrollTop + 812) / 7745 > 0.45 → fires at scrollTop > 2673. Measured fire point across three runs: 2697, 2700, 2709. So the viewport at fire is y=2700–3512. I measured the real element positions on the loaded page: £64.99 is at y=3648, "You save £7.98" at y=3662, "Add bundle to basket" at y=3711. Every one of them is BELOW the fold at the moment the popup fires — the buy button by ~199px. Captured at the exact fire point with zero scroll drift (trigger3.mjs): card occupies viewport 214–598; "The Settle-In Bundle" heading vpTop=750 (on screen, NOT behind the card); £64.99 vpTop=948, "You save £7.98" vpTop=962, "Add bundle to basket" vpTop=1011 — all off-screen, all behindCard=false. The screenshot /tmp/.../scratchpad/vt-clean.png shows what is actually behind the modal at fire: the bundle_intro headline "Pick the kit that fits where your dog is". Not a price, not a button.

THE INNOCENT EXPLANATION THAT WAS NOT RULED OUT — and it is the whole finding. The popup is position:fixed; inset:0 (line 29 of the snippet). Once opened it rides the viewport to wherever it is scrolled next. The finding's evidence is a screenshot taken at y=3500 — 800px PAST the trigger — so the modal is at y=3500 only because the capture harness scrolled there with the modal still open. That is a property of the capture method, not of the site. The same artifact fully explains "it then stays up over every subsequent section — collections, reviews, newsletter": slices 05/07/10 all show the modal because nothing in the harness ever dismissed it. I tested dismissal: one tap on the X removes it (verified true), and localStorage['tdn_popup'] keeps it gone after scrolling on to y=3500 (verified true) and on every future visit. A real shopper closes it once, in one tap, and never sees it again. This is exactly the run-#1 class of error: an artifact of how the agent drove the page was reported as something the owner built wrong.

The finding is also internally inconsistent with its own exhibit. In m-slice05.png (which I opened) the "£64.99 £72.97 You save £7.98" row is plainly visible ABOVE the modal card, dimmed by the backdrop blur — it is not "covered" by the modal even in the screenshot being cited as proof that it is.

CITATION DRIFT (minor, does not change the numbers): the deployed popup is NOT the file cited. The served script adds inert/aria-hidden background handling and an inline WELCOME10 reveal, and its button reads "Get my 10% code" where the git file at snippets/dog-nook-email-popup.liquid:21 reads "Send my code". The 12000ms/0.45 trigger values are identical in both, so the arithmetic stands — but line numbers 88–94 were read from git while howKnown claimed "loaded-page". (Incidentally this shows PROBLEMS-1.md P1-11 "the popup promises a code the theme can't deliver" is already fixed in the deployed theme.)

Does it contradict STATUS.md? No — STATUS.md is silent on the popup, so there is no conflict to adjudicate.

There is a smaller, differently-shaped real issue underneath, restated below; it is not "high impact" and it does not involve the buy button.


**[V14] KILLED** — The observation is real but the diagnosis, the scope and the offered proof are all wrong.

(1) MECHANISM WRONG. The popup does not render over the banner or cover its buttons. Measured on the draft at 375x812: modal card = y 209-603, cookie banner = y 613-796, buttons = y 739-777. The card sits entirely ABOVE the banner and the banner is plainly readable in the cited slices. What actually swallows the tap is the popup's full-viewport backdrop (.tdn-emailpop { position:fixed; inset:0; z-index:90 } with .tdn-emailpop__backdrop { position:absolute; inset:0 }) colliding with .tdn-cookie's z-index:90 (assets/dog-nook.css:152). Equal z-index, popup appended to <body> last, so it wins on DOM order. elementFromPoint at both button centres returns DIV.tdn-emailpop__backdrop.

(2) NOT MOBILE-SPECIFIC. I reproduced it at 1440x900 by waiting out the popup's 12s dwell timer: hit-test returns DIV.tdn-emailpop__backdrop (rect y=0 h=900) and BOTH click attempts fail. Nothing in the popup CSS is width-conditional. The "MOBILE:" framing is false.

(3) THE INNOCENT EXPLANATION THAT WAS NOT RULED OUT — and it is the one that generated the finding's headline proof. The mobile-fails / desktop-succeeds asymmetry is caused by the SHOPIFY UNPUBLISHED-THEME PREVIEW BAR, not by the store. #PBarNextFrameWrapper is position:fixed and 68px tall. At 812px tall it occupies y 744-812 and overlaps the banner's buttons (739-777); at 900px it occupies y 832-900 and the button centre at y=830 clears it by 2px. Proof: with NO popup on screen at all, the mobile hit-test still returns IFRAME#PBarNextFrame and the click still times out; and after I removed #PBarNextFrameWrapper (approximating a published theme), the same mobile 375px click hit the button directly and succeeded. That bar exists only because we view the draft via ?preview_theme_id= — no real visitor sees it. Attributing it to the owner's build is the run-#1 class of error.

(4) "DEAD END" IS FALSE. The backdrop carries data-tdn-emailpop-close, so the tap that appears to do nothing actually dismisses the popup. Verified on mobile with the preview bar removed: tap 1 closes the popup, tap 2 lands on Accept all, localStorage['tdn_consent'] = 'all', banner gone. One wasted tap, self-healing, not an unreachable consent gate.

(5) The popup only fires after 12s dwell or 45% scroll, so a visitor has a clear window to answer the banner first. Impact is not high.

No contradiction with STATUS.md — it is silent on this. It does vindicate STATUS.md's standing trap about not trusting a preview-rendered layout claim, and audit/lessons/L002.

HOW KNOWN: read /home/user/sc/dog-nook-theme/assets/dog-nook.css and /home/user/sc/dog-nook-theme/snippets/dog-nook-email-popup.liquid; read m-slice04.png, m-slice07.png, popup-mobile.png; ran four live Playwright probes against the draft with window.Shopify.theme.id asserted = 193438056731 (refute-cookie.mjs, refute2.mjs, refute3.mjs, refute4.mjs in the session scratchpad). Not inferred.


**[V15] KILLED** — The measurements are genuine and I reproduced every one on the correct theme (193438056731, Shopify.theme.id asserted, 375x812 with touch): overflowX hidden, clientWidth 375 / scrollWidth 1784, 12 pills with the exact labels quoted, animationName 'none', transform stepping ~35px/s (-234.5, -269.5, -304.5, -340.1, -375.1 at 1s intervals). So this was a real page load, not dressed-up inference. But the conclusions drawn from those numbers are refuted by the one test the finding never ran: touching the bar. (1) Holding a CDP touchStart at the bar centre froze the transform at -231.6 across four samples over 1.6s, with the element under the finger staying 'Mealtime & Feeding' throughout; a 120ms tap then navigated to /collections/grooming, the pill under the finger at touchdown. The marquee stops at touchdown, before activation, so it is neither unstoppable nor a tap-accuracy failure. The section source (/home/user/sc/dog-nook-theme/sections/dog-nook-category-bar.liquid:80-81) does this deliberately and its own comment says 'Pauses on hover/touch so pills stay clickable' — that is the innocent explanation the finding failed to rule out; it observed only the untouched state. (2) With prefers-reduced-motion: reduce the marquee is disabled entirely — verified overflowX 'auto', 6 pills, transform 0 across 5 samples — so motion-sensitive users get a static, manually swipeable strip. (3) It is not 'the primary category nav': the mobile header carries Shop / Collections / About / Contact / FAQ plus a menu toggle, and the catbar renders only on the homepage (absent on /collections/calming-essentials and /products/the-new-rescue-bundle-1, theme asserted on both) at y=548 of an 812px viewport, below the hero. (4) The 12 pills are 6 real links plus 6 clones carrying aria-hidden='true' and tabindex='-1', so keyboard and AT see 6; 'every one is a real link' misdescribes it. (5) A vertical swipe starting on the bar still scrolled the page (scrollY 1704) — passive listeners, no scroll trap. What survives is a much weaker WCAG 2.2.2 point: touch-hold pause is undiscoverable and there is no visible pause control. Severity should fall from high to low-moderate. No contradiction with STATUS.md (it does not mention the marquee), though STATUS.md's mandatory Shopify.theme.id assertion is not claimed anywhere in the finding's evidence string — a reporting gap, even though the numbers do turn out to be from the right theme. Against POSITIONING.md the real defect here is not motion: 5 of 6 pills are category-shaped (Grooming, Mealtime & Feeding, Travel & Outdoor) and answer 'what type of thing?' rather than 'which stage is my dog at?'; the one stage-shaped pill, 'The First Days Kit', points at /products/the-new-rescue-bundle-1 — the already-logged mis-merchandising defect PROBLEMS-1.md P1-2.


**[V16] KILLED** — The observation is real but the finding as written is wrong on three checkable claims and misdiagnoses the defect, so it fails as stated.

HOW I KNOW: loaded https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731 in Playwright/Chromium via the tools/agent-browser proxy at 375/390/768/1280px, asserting Shopify.theme.id === 193438056731 (name "The Dog Nook — Design install (CRO working copy)") on every load per the L002 trap. Ran getBoundingClientRect, getComputedStyle, Range-based text-ink measurement, and CDP CSS.getMatchedStylesForNode. Read dog-nook-theme/assets/dog-nook.css and sections/dog-nook-collection-list.liquid. Re-read the prior run's mc-06.png.

WHAT SURVIVES (independently reproduced, numbers match to 0.5px): card 1 = 0 → 178.5, card 2 = 196.5 → 375, gap 18px, grid-template-columns "178.5px 178.5px". .tdn-coll-card__name left = 0, height 48px (2 lines); .tdn-coll-card__cta right = 375, height 44.8px (2 lines), sitting in a flex row beside it. Section wrapper computes padding-left/right = 0px. That part of the finding is honest and correctly measured — the page really was loaded.

WHAT BREAKS IT:

1. "unlike every other section on the page" — FALSE, and it hides the actual bug. CDP matched-styles on the wrapper shows the element carries BOTH classes, and dog-nook.css:58 `.tdn-wrap { padding: 0 var(--tdn-side-pad) }` is immediately overridden by dog-nook.css:59 `.tdn-section { padding: 64px 0 }` — equal specificity (one class each), later declaration wins, and the shorthand zeroes padding-left/right. --tdn-side-pad resolves correctly to 20px; it is simply never applied. This zeroes the gutter on EVERY `.tdn-section.tdn-wrap` element site-wide and at every viewport (verified 0px at 375, 390, 768 and 1280). Text-ink measurement at 375px: `reviews` runs ink 0 → 375, i.e. it touches BOTH edges, which the category grid does not; the footer EXPLORE column starts at ink 0 too. So the grid is not unique and is not even the worst case.

2. "CTAs end at right=375, so the words touch both edges of the phone" — HALF FALSE. 375 is the element box, not the glyphs. Range-measured visible ink for that section is 0 → 355.9. The left edge is genuinely flush; the right has ~19px of air. The finding quotes a box number as if it were rendered text.

3. "the badge wraps to three lines" — FALSE. At 375px it is exactly two lines: height 45.19px, line-height 17.6px, padding 5px top + 5px bottom → (45.19−10)/17.6 = 2.00. At 390px it is one line. mc-06.png, the finding's own cited evidence, plainly shows two lines. This is the finding contradicting its own screenshot.

4. "pure CSS / effort: quick / worst-looking element" — UNPROVEN and actively misleading. I injected the padding fix in-browser and re-measured: card width drops 178.5 → 158.5px and the title/CTA collision gets WORSE, not better — "New Rescue" and "bundle →" then render with zero space between them, and the third card reads "GroomingShop now →" as one word (screenshot: ref-fix-paddingonly.png). Padding alone does not fix this section; the flex row needs to become a column, or the CTA needs to go.

INNOCENT EXPLANATIONS I RULED OUT (not just listed):
- Deliberate edge-to-edge / peeking carousel: ruled out — display:grid with two fixed 178.5px columns, no overflow-x scroller, and document.scrollWidth === window.innerWidth === 375. Decisively, the section's own rule declares `padding: 0 var(--tdn-side-pad)` and the variable resolves to 20px, so a gutter was intended and is being clobbered. Unintentional, confirmed.
- Wrong theme (the L002 trap that invalidated an earlier analysis): ruled out by asserting Shopify.theme.id on every navigation.
- Popup/overlay distorting geometry: measured at scroll 0 pre-popup and again after a 5s dwell; identical numbers.
- OWNER FAULT: none, and the finding correctly does not allege any. For the record I checked before attributing: this is a CSS authoring collision inside assets/dog-nook.css, present identically in git (lines 58–59) and in the deployed draft, written by prior builder runs. No owner action, setting or theme-editor choice produces it. dog-nook.css is NOT on the do-not-touch list (only dog-nook.js and dog-nook-cro.css are), so it is fixable.

STATUS.md: no contradiction. STATUS lists the theme as built but never claims the mobile layout was visually verified, and its own trap note says unverified layout claims are guesses. Not logged in PROBLEMS-1.md nor in the 2026-08-05 recon report — genuinely new, not a redo.

AGAINST POSITIONING.md: the finding calls this "the worst-looking element on the phone", which is a beauty judgement, not the test the position sets. Judged against "does this help someone work out which stage their dog is at" the section fails far harder for a reason the finding never mentions: it is titled "Shop by need" with need tiles (Calming Essentials, Grooming, Mealtime & Feeding, Travel & Outdoor) — not the three 3-3-3 stages — and the two lead cards carry "Bundle inside · Save £7.98" / "Save £14.98" discount badges. POSITIONING.md explicitly rejects presenting the bundles as discount tiers ("the upsell stops being a discount and becomes a diagnosis"). A gutter fix leaves that intact. Ranking this medium-impact on looks while the same section sells on price is the wrong priority.

Verdict: the measurement is real, the defect is real, but the title, the scope, the three-line claim, the "touches both edges" claim and the effort estimate are all wrong. Restated below.


**[V17] HELD** — Real, and I reproduced it independently. I ran Playwright through tools/agent-browser at 375x812 against https://kkeqih-jm.myshopify.com/ with window.Shopify.theme.id asserted as 193438056731 (unpublished "Design install (CRO working copy)"), and got the identical map to the pixel: docHeight 7745, hero 108/440, catbar 548, trust 623/374, why 997/832, quiz 1828/877, bundle_premium 3105, bundle_entry 3868, collections 4630, reviews 5521/1679, newsletter 7200. This is a loaded page on the correct theme, not dressed-up inference. Three corrections, none fatal. (1) The key number is wrong in the finding's own favour: 3105 is the TOP OF THE SECTION, not a price. The first product price paints at y=3648 (span.tdn-price "£64.99", h=45), 543px lower — 4.5 viewport heights, not 3.8. The headline "four screens" is if anything conservative. (2) Innocent explanation not ruled out: scrolling is not the only route to a price. Enumerating every a/button above y=3700 from the live DOM, the hero CTA "Shop the First Days Kit" -> /products/the-new-rescue-bundle-1 sits at y=390 (first screen) and a 6-link category bar at y=562. Nothing PRICED renders inline above 3648, but a shopper is one tap from a priced page within the first screen. (3) Second innocent explanation, and the one that matters against POSITIONING.md: the 877px quiz is not reassurance, it is the stage-routing instrument the position is built on, and I walked it to completion — it terminates in "YOUR MATCH · The Settle-In Bundle · £64.99 · Have a look". So "~2000px of reassurance" miscounts; true stage-agnostic reassurance before the stage question is trust 374 + why 832 = 1206px. Also unevidenced: "most traffic lands here" — the theme is unpublished and the store has zero orders, so no traffic data exists for this page. The map also silently drops countdown (548, h=0, disabled) and bundle_intro (2705, h=400), the latter being on-position copy rather than padding. Confirmed exactly as stated: trust 374px as a 2x2 badge grid; why 832px with three full-width cards one per row (y=1160/1366/1598); reviews 1679px with exactly six testimonials one per row. No contradiction with STATUS.md — it says nothing about scroll depth, and this finding satisfies its rule that layout claims must be made against an asserted draft theme. No owner-blame inference is made, so the run-#1 error class is not repeated. Two out-of-scope observations worth escalating: the reviews block renders "4.8 ★★★★★ from 80 real owner reviews" live at y=5653, contradicting the recon report's claim (quick win #4) that the homepage aggregate rating is a dormant non-rendering landmine; and the quiz result's only CTA, "Have a look", has href="#" — the quiz's path to the priced page is dead.


**[V18] KILLED** — Half true, and the load-bearing new claim is refuted. HOW I CHECKED: curl with a persistent cookie jar to https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731 — the jar survives the 301 to thedognook.co.uk, and the rendered HTML asserts "theme":{"id":193438056731,"isDraft":true} (so this is the draft, not the live theme — the L002 trap). Same method for all five collection pages, each also asserting 193438056731. (1) LINKS — CONFIRMED. The rendered section contains exactly: /collections/settling-a-new-rescue, /collections/calming-essentials, /collections/grooming, /collections/mealtime-feeding, /collections/travel-outdoor, and "View all →" to /collections. No "#". Recon #12's predicted nil-lookup bug is wrong: the collection setting serialises to a handle STRING in templates/index.json (e.g. "collection": "settling-a-new-rescue"), so collections[handle] resolves. The finding really did load the page — I reproduced its anchor list character for character. (2) "BADGES ARE CROSSED" — REFUTED. The badges exist ("Bundle inside · Save £7.98" on Settling a New Rescue, "Bundle inside · Save £14.98" on Calming Essentials), but they are not crossed; each states the truth about the collection it sits on. I loaded both collection grids: /collections/settling-a-new-rescue contains Snuffle Mat, Lick Mat, Calming Donut Bed and The Settle-In Bundle (£64.99, card shows "Save £7.98") — 4 products, no pagination. /collections/calming-essentials contains The First Days Kit (£34.99, card shows "Save £14.98"), Lick Mat, Calming Donut Bed. So each badge names the bundle actually inside that collection. The finding inferred a mapping bug from homepage anchors alone — its cited evidence ("full anchor enumeration of the collections section") cannot support a claim about collection membership. INNOCENT EXPLANATIONS IT DID NOT RULE OUT, which I checked: (a) the badge is generated from the collection's real contents, not hand-assigned — verified true, so there is nothing to "uncross"; (b) the pairing is a deliberate merchandising decision, not a slip — the collection's own banner copy reads "The first FEW WEEKS with a rescue or newly-adopted dog can be unsettling", i.e. it is authored as the weeks-1-3 collection, which is exactly where the Settle-In Bundle belongs under POSITIONING.md; (c) the First Days Kit being absent is not a broken filter — it is present and correctly badged one card over. This is the same error class as run #1's fake-reviews call: an owner decision read as a defect without checking the decision. (3) "FIRST DAYS KIT NOT IN THE NEW-RESCUE COLLECTION" — true as a fact (I verified it; the finding did not), but it is a merchandising/positioning issue, not a bug. (4) "CARDS ARE SHOP-BY-PRODUCT-TYPE" — overstated: two of five (Settling a New Rescue, Calming Essentials) are need/situation labels under the eyebrow "Shop by need". The valid version of the criticism is narrower: none of the five is a 3-3-3 STAGE. No contradiction with STATUS.md — STATUS is silent on these cards. The savings figures are the true ones (£7.98 real for Settle-In, £14.98 real for First Days), so the badges are DMCC-clean; they are not the false "SAVE £15" STATUS flags on the bundle PDP template. ONE THING NOBODY HAS LOGGED, which matters more than the finding: the deployed section is AHEAD of git. /home/user/sc/dog-nook-theme/sections/dog-nook-collection-list.liquid has no badge markup at all and a fixed "Shop now →" CTA; the draft theme renders tdn-coll-card__badge and a conditional "See the bundle →". Anyone who "fixes" the badges by editing that repo file and deploying will silently delete the badges and the CTA — the same asset-drift trap STATUS records for dog-nook.js / dog-nook-cro.css, now extending to a section file.


**[V19] KILLED** — The evidence is real — I reproduced it three times on the correct theme — but the finding's headline and its stated impact are both wrong, and the error is the same class run #1 made: asserting a consequence it never observed.

WHAT I DID (all 'loaded-page', via tools/agent-browser + a Playwright script; theme asserted via window.Shopify.theme on every load): loaded https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731, clicked the Settle-In 'Add bundle to basket' button, and separately probed the drawer with an empty cart and with a non-empty cart.

CONFIRMED (the finding got these right):
1. Theme was genuinely the draft. I expected the L002 trap here — the evidence log starts at thedognook.co.uk and records no Shopify.theme.id assertion — but I checked rather than assumed: window.Shopify.theme = {id:193438056731, name:'The Dog Nook — Design install (CRO working copy)', role:'unpublished'}, 263 tdn- classed elements. The preview cookie does survive the 301 in a cookie-carrying browser context. So the finding is NOT invalidated by L002, even though it failed to state the assertion.
2. The navigation is exactly as claimed. Nav log, reproduced twice: ['https://thedognook.co.uk/','https://thedognook.co.uk/cart']. Ends on /cart.
3. Mechanism is right. Homepage has exactly 2 form[action='/cart/add'], both with hasPFC:false and 0 product-form-component elements on the page — so nothing intercepts the submit. Source confirms: sections/dog-nook-featured-bundle.liquid:49 and sections/dog-nook-bundle.liquid:56 use bare {%- form 'product', prod -%}, outside Horizon's component system.
4. Cart-page figures quoted verbatim are correct: 'The Settle-In Bundle / Sale price £64.99 / Regular price £72.97 / Cart total £64.99'.

REFUTED (why it does not hold as written):
A. 'the cart drawer is present but unused' — FALSE. The header carries <button on:click="#cart-drawer/toggle" class="header-actions__action">, visible on the homepage. I clicked it: the drawer's <dialog> opens (dialogOpen:true, 480x1000px) and renders the cart. The drawer is installed, wired and reachable.
B. 'it renders at height 0' — a measurement artifact, not a defect. The 0-height element is the #shopify-section-cart-drawer-section wrapper / <theme-drawer> custom element. That is the normal closed state of a <dialog>-based drawer; #cart-drawer measures 0x0 even while its dialog child is open at 480x1000. Height 0 is evidence of nothing. This is the innocent explanation the finding did not rule out.
C. 'the free-delivery progress bar built into the drawer is never seen by anyone' — FALSE, and it is the load-bearing claim behind impact:high. With an EMPTY cart the drawer markup contains zero tdn- markers, which is exactly what would lead you to this conclusion. With a NON-EMPTY cart the same section is 23,357 chars and contains tdn-cartbar:true, tdn-freeship:true, a real .tdn-freeship__bar element, and the opened drawer reads: 'Cart 1 ... 🎉 You've unlocked free UK delivery! ... The Settle-In Bundle Sale price £64.99'. Horizon only renders the non-empty branch, where {% render 'dog-nook-cart-progress' %} lives (store-config/cart-drawer.liquid:114). The bar is deployed and it is seen — by anyone who opens the drawer from the header.
D. 'every add-to-basket ends the homepage session' — overreach. Only the two custom bundle sections do. Horizon's own product-form-component forms (I found 4 on a recommendations grid, all hasPFC:true) are AJAX and open the drawer. Worth noting separately: /collections/all has ZERO add-to-cart forms — no quick-add at all — which is a different gap.
E. The impact reasoning does not survive its own numbers. A £64.99 bundle is already £30 clear of the £35 threshold, so on this exact journey the progress bar has no AOV work to do — it would say 'unlocked', not 'you're £X away'. The AOV argument for this fix is close to nil.

Against STATUS.md: no contradiction — STATUS.md makes no claim here. But the finding substantially re-states run #1's own aside (recon report line 29: 'Add to Cart is a plain form POST that redirects away from the page, so the free-delivery progress bar in the drawer is never seen') and line 148 explicitly listed 'whether the drawer's free-delivery bar renders at all' as UNVERIFIED and owner-checkable. The finding's genuine contribution was to load the page — it then verified the navigation half, inherited run #1's unverified conclusion for the drawer half, and reported both at the same confidence. That is the run #1 failure mode repeating.

Against POSITIONING.md: the part that genuinely matters was not the part argued. The homepage is the 3-3-3 stage chooser — the one screen where someone works out which stage their dog is at. Ejecting them to /cart the instant they touch one stage card, before they can compare it against the other two, is a real positioning harm. That is the case for fixing it, not the progress bar.


**[V20] HELD** — Every rendered claim checks out, but two details in the finding are wrong and one is double-counted, so it needs restating rather than dismissing.

VERIFIED BY LOADING (tools/agent-browser, theme asserted 193438056731 on every load, exit 0):
- /products/the-new-rescue-bundle-1 → 200, <title> "The First Days Kit – The Dog Nook", rendered body contains "THE RESCUE BUNDLE".
- /products/the-settle-in-bundle → 200, <title> "The Settle-In Bundle", rendered body also contains "THE RESCUE BUNDLE".
- / → 200, rendered body contains "Lucy A. · The New Rescue Bundle", and "The First Days Kit" in the hero button ("Shop the First Days Kit"), the category-bar pill, the entry bundle card, and the footer link.
So the evidence is real, was loaded, not inferred, and not the wrong-theme trap of L002.

CORRECTION 1 — "above their titles" is wrong. Read /home/user/sc/dog-nook-theme/sections/dog-nook-bundle.liquid:22-23: the h1 is `{{ s.heading | default: product.title }}`, and /home/user/sc/dog-nook-theme/templates/product.bundle.json sets heading to "Three gentle essentials for a nervous dog settling in". The product name is never rendered on either bundle PDP. The eyebrow is not a label above the title — it is the ONLY name on the page. That makes the defect worse than described, not lighter.

CORRECTION 2 — the Settle-In instance is double-counting a known bug. The full rendered Settle-In page is First Days Kit's content: same eyebrow, same h1, contents Lick £11.99 / Snuffle £22.99 / Slow-Feeder £14.99, "Bought separately £49.97", badge "BEST VALUE · SAVE £15", against a £64.99 price. That is exactly the open compliance risk already logged in STATUS.md (product.bundle.json hardcoded, 6 products share it). Editing the eyebrow string does not fix that page, and fixing the template removes that eyebrow as a side effect. Distinct naming surfaces are therefore two, not three, plus the handle.

CORRECTION 3 — "quick" is only half true, and the next builder will be misled. The eyebrow is one line in a repo file. The review attribution is NOT in the repo: git's dog-nook-reviews-placeholder.liquid renders only dashed skeleton cards with no names, and index.json passes it no quote blocks, yet the deployed draft renders six real attributed quotes. Grepping the repo for "Lucy" returns nothing (I ran it). The deployed draft theme has a newer version of that section than git — section drift beyond the js/css drift STATUS.md warns about. The fix must be made on the theme, and someone should reconcile that section.

INNOCENT EXPLANATIONS I CHECKED AND RULED OUT / KEPT:
- "The Rescue Bundle" as a deliberate category eyebrow rather than a name: ruled out, because with the h1 carrying a tagline there is no other name on the page, so it reads as the product's name.
- Wrong theme / stale cache: ruled out, theme id asserted on all three loads.
- Deliberate alternate name: ruled out, POSITIONING.md:51 and STATUS.md both name the £34.99 product "The First Days Kit".
- "The New Rescue Bundle" in Lucy A.'s attribution is most likely the name the product was ACTUALLY sold under by hand, before the rename — the same offline-sales history STATUS.md records. That is an honest reason for the string, NOT owner error, and it is not a DMCC problem. Reframe as: keep the reviewer's words untouched, update the product label so a shopper can find the product. Nothing about the review's genuineness is in question.
- The handle staying /products/the-new-rescue-bundle-1 is not itself a defect (Shopify keeps old handles working); it is only a weak SEO/consistency point and should not be a reason to change it and risk links.

Does not contradict STATUS.md; it adds to it, except that the Settle-In half is already covered there.

POSITION TEST: passes. "The Rescue Bundle" carries no stage meaning, and it is the only name shown on the day-1-3 product's own page. A visitor arriving at the stage entry point sees a name that does not say "days 1-3", which is precisely what the 3-3-3 ladder depends on.

SUPPORTING DETAIL I FOUND (read the files, did not render): the old names survive as schema defaults — dog-nook-hero.liquid:94 "Shop the Rescue Bundle", dog-nook-category-bar.liquid:110 "The Rescue Bundle", dog-nook-featured-bundle.liquid:85 "The New Rescue Bundle". These do not render today because index.json overrides them, but any new instance of those sections added in the theme editor would silently reintroduce the old name.


**[V21] KILLED** — REFUTED by direct observation on the same URL and asserted theme. The finding's own honest caveat neutralises its captcha half, so its weight rests entirely on the claim it says is "independent of that": "the theme has no success state to show even on the happy path." That claim is false.

HOW I KNOW (all loaded/executed, not inferred):
1. Read `dog-nook-theme/sections/dog-nook-newsletter.liquid`. Line 11-16 is `{%- if form.posted_successfully? -%}<p class="tdn-newsletter__ok">{{ s.success_text }}</p>{%- else -%}` input+button `{%- endif -%}`. A server-rendered success state exists in the markup. Line 31 styles it.
2. `templates/index.json` sets this section's `success_text` to the full configured string incl. the code.
3. Loaded https://kkeqih-jm.myshopify.com/ through tools/agent-browser with `--theme 193438056731` asserted (browse.mjs printed `theme : 193438056731 ... [unpublished]`, exit 0), then drove Playwright to three URLs on that same primed session and read `document.querySelector('.tdn-newsletter__ok').textContent`:
   - `/` → null (expected: it is the else-branch)
   - `/?contact_posted=true` → null  ← control
   - `/?customer_posted=true` → **"Thanks — you're on the list! Here's 10% off your first order: use code WELCOME10 at checkout."**
   `customer_posted=true` is the param Shopify redirects to after a successful `{% form 'customer' %}` post; `contact_posted` (which the finding names, via the form's `action="/contact#contact_form"`) is the *contact* form's param and correctly does nothing. The success state is built, styled, configured, and renders.
4. Enumerated `document.styleSheets` on the live draft page: sheet #9, `cdn/shop/t/12/compiled_assets/styles.css` (2464 rules), contains `.tdn-newsletter__ok { color: var(--tdn-cream); font-size: 15px; }`. So "scanning every stylesheet, the only success selectors present are Shopify's base ones" is false as stated.

INNOCENT EXPLANATIONS THE FINDING DID NOT RULE OUT (and I did):
- **Wrong search vocabulary.** This theme's BEM suffix for success is `__ok`. `.tdn-newsletter__ok` contains none of `success`, `thanks`, or `posted`, so the DOM query `[class*=success],[class*=thanks],[class*=posted]` and a CSS grep for "success" were both guaranteed to miss it whether or not a success state existed. I re-ran the finding's exact DOM query on the loaded page and also got 0 — the observation reproduces; the inference drawn from it does not follow.
- **Absence-before-submit is by construction.** The success node lives in a Liquid `{% if %}`/`{% else %}`. It cannot be in the pre-submit DOM. Its absence is the template working, not a missing feature.
- **A cross-origin sheet can silently kill a naive scan.** Sheet #10 (Google Fonts) is CORS-blocked; an unguarded `for (const ss of document.styleSheets) ss.cssRules` throws `SecurityError` — I reproduced the throw. Any accumulated results are lost with the exception.
- **"No JS handler" is the design, not a defect.** `{% form 'customer' %}` is the standard Shopify full-reload pattern; feedback arrives on the redirect. Absence of JS is not absence of feedback.

MISCITED SUPPORT: recon item 15 is about the **email popup** ("Make the email popup intercept its own submit… the success-state CSS class exists in the stylesheet and appears in no markup"). `grep -rn` over the theme: `emailpop__ok` → **1 hit, in the stylesheet block only**; `newsletter__ok` → **2 hits, markup AND stylesheet**. Item 15 is accurate about the popup and was transplanted onto a different, working form. It does not "confirm" this.

vs STATUS.md: no contradiction — STATUS.md is silent on the newsletter form. The conflict is with the theme source and the rendered page, and those win.

This is the run-#1 error class repeated in miniature: a real, reproducible negative observation (empty query result) read as proof of owner/builder omission, without ruling out the benign reading (the searched-for names were never the names used).


**[V22] HELD** — The three factual observations are real and I reproduced every one of them myself, so I could not refute the substance. But the finding's prescription ("strike off so nobody redoes them") is refuted, and its evidence for item 3 does not actually support item 3.

HOW I CHECKED. Started tools/agent-browser/tunnel.py and loaded 12 pages with browse.mjs --theme 193438056731 on every single call. Every load printed theme 193438056731 "The Dog Nook - Design install (CRO working copy)" [unpublished], so the L002 preview-cookie trap is ruled out, not assumed. I also wrote two extra Playwright scripts (DOM-level, not text-level) because --grep was insufficient.

(1) VERIFIED, and broader than claimed. /products/calming-donut-bed-1: "verified" 0 hits, "Based on 10 customer reviews" 1 hit. I then loaded the other review products: lick-mat-1, snuffle-mat-medium-1, grooming-glove-1, nail-grinder-1, slow-feeder-bowl-1, car-boot-liner-1 all render "Based on 10 customer reviews" with 0 "verified" hits. Homepage also 0 hits for "verified"/"Awaiting". Caveat the finding missed: the 8th review product, /products/the-new-rescue-bundle-1 (First Days Kit), renders NO review block at all — it uses the bundle template that never renders dog-nook-pdp-extra. It is clean for an unrelated reason, not because it was fixed.

(2) VERIFIED. Banner renders on / , /products/calming-donut-bed-1, /collections/all, a 404 page, and at 375px mobile — "We use cookies / We use essential cookies to run the shop... Privacy Policy. / Decline / Accept all". That text matches dog-nook-theme/snippets/dog-nook-cookie-banner.liquid verbatim, so it is the theme's own snippet firing from layout/theme.liquid, not a Shopify or app banner. Recon open question #6 is genuinely answered yes for this theme. (Presence only — I did not test that Decline actually persists or gates pixels.)

(3) CONCLUSION TRUE, EVIDENCE INVALID. This is the part that should have failed. browse.mjs --grep matches document.body.innerText, and the footer social block is a Horizon `social-links` block rendering icon-only anchors (settings are icon_color + *_url, no text label) — so a rendered-text grep returns 0 hits whether or not the links exist. The stated method cannot distinguish "removed" from "icon-only". The grep terms were wrong too: dog-nook-theme/store-config/footer-group.json:327-345 sets facebook, instagram, youtube, tiktok and x.com; pinterest_url was ALWAYS empty, so grepping "Pinterest" tested nothing, and YouTube and X were never tested. I settled it properly by enumerating every <a href> in the rendered footer: 15 anchors, all internal (/pages/*, /collections, /policies/privacy-policy), zero matches against facebook|instagram|tiktok|pinterest|youtube|x.com|twitter|threads|linkedin|snapchat. Footer definitely rendered (copyright, policy list, 11 payment icons). So the links really are gone — but the finding was right by luck, which is the exact class of error this project keeps making.

THE REAL PROBLEM — why "strike off" is wrong. All three fixes exist ONLY in the deployed draft theme. Git is behind on two of them, working tree clean, theme files last touched 2026-07-19:
 - /home/user/sc/dog-nook-theme/snippets/dog-nook-pdp-extra.liquid:62 still reads: `<span class="tdn-muted">Based on {{ rcount }} verified review{% if rcount != 1 %}s{% endif %}</span>`
 - /home/user/sc/dog-nook-theme/store-config/footer-group.json:331-336 still has facebook_url, instagram_url, youtube_url, tiktok_url and twitter_url populated with platform homepages.
So the fixes are unbacked by source control. Any redeploy from this repo silently re-introduces the "verified reviews" overclaim (a DMCC wording risk against verified:false data) and the five dead social links. Closing these items is precisely what would let that happen unnoticed. This widens STATUS.md's "Asset drift unresolved" trap, which currently names only dog-nook.js and dog-nook-cro.css — the drift is theme-wide and, unlike those two, here the deployed version is the CORRECT one and git is the stale one.

CONTRADICTION WITH STATUS.md: yes, and the site wins. STATUS.md follow-up (a) and recon quick-win #7 / open question #6 are stale as descriptions of the draft theme. But STATUS.md is right that they are not closed — they are undone in git.

INNOCENT EXPLANATIONS I RULED OUT: wrong theme served (theme id asserted on all 12 loads); footer failing to render at all (payment icons and policy links present); an app/Shopify banner masquerading as the theme's (copy matches the snippet verbatim); consent already stored suppressing the banner (fresh browser context per run, so first-visit state); and for the reviews, a per-product rather than snippet-level fix (checked 7 products, all consistent).

POSITIONING: none of these three advance "which stage is my dog at" — impact:low is right. But effort:quick now applies to the git backport, not to the fix.


**[V23] KILLED** — The evidence is real and the page was genuinely loaded on the correct theme — but the one claim that makes this finding worth filing is false, and is refuted by the author's own screenshots.

WHAT SURVIVES (verified by me, opening the images): d-hero.png at 1440px shows the hero as a flat green-to-tan gradient with no photograph. m-bundlep.png shows the olive "SETTLE-IN BUNDLE FLAT-LAY" block. d-collections.png shows exactly five category cards as flat colour swatches. A terracotta "BUNDLE FLAT-LAY" block does exist. Blocker/effort/owner are right.

PROVENANCE IS SOUND — I tried to break it and could not. All four PNGs exist (12 Aug, 12:04–12:21) at 750px wide (375 CSS @2x) and 1440px. Every mobile shot carries the Shopify preview bar reading "The Dog Nook — Design install (CRO working copy) · Draft", which HANDOFF.md:77 maps to 193438056731 and which audit/lessons/L002 names as the exact check against the silent wrong-theme trap. This is loaded-page evidence, not dressed-up inference.

WHY IT FAILS — the mobile severity claim is measurably wrong. I pixel-scanned the cited images rather than eyeballing them. In m-bundlep.png (375x763 CSS) the olive block spans y=48 to y=285 = 237 CSS px, and £64.99 renders at y≈571 with "Add bundle to basket" at y≈628 — both on the SAME screen, requiring zero scrolling. In mc-05.png (375x812 CSS) the terracotta block spans y=316 to y=553 = 237 CSS px, ~29% of the viewport. So the placeholder occupies roughly 29–31% of one screen, not "the entire first screen", and no one scrolls "a full viewport of empty colour before reaching the price". The finding also self-contradicts: "a 235px-tall olive block" and "occupies the entire first screen" cannot both be true. The 235px figure is the accurate half; the impact sentence built on top of it is not.

CITATION ERROR: the terracotta "BUNDLE FLAT-LAY" block is in mc-05.png, which is not among the four cited files. mc-06.png is cropped above it and does not show it.

INNOCENT EXPLANATIONS CHECKED: (a) Are the flat blocks a deliberate flat-colour design style rather than missing photos? Ruled out — the captions are literally shot briefs ("SETTLE-IN BUNDLE FLAT-LAY"), and STATUS.md:31 independently states zero real products have images. (b) Wrong theme? Ruled out via the preview bar, above. Note the finding does NOT commit the run-#1 error: it assigns the gap to a physical-world blocker, not to owner fault, which is correct.

NO CONTRADICTION WITH STATUS.md — it corroborates it (line 30-31, "blocked on ONE thing: product photography"). That is also the problem with impact:high: as filed this is a restatement of the already-known #1 launch gate, and the only genuinely new content — the 375px mobile severity — is the part that is wrong. Downgrade to medium.

ONE SUBSTANTIVE ADDITION, against POSITIONING.md rather than against a competitor: "the layout is ready and correctly proportioned — it is waiting on photographs" is too generous and would mislead the owner into thinking photos alone unblock the homepage. As rendered, the hero reads "Less anxious. More at home." rather than asking "Where's your dog right now?" (POSITIONING.md line 61), and the five category cards are product-type buckets — Settling a New Rescue, Calming Essentials, Grooming, Mealtime & Feeding, Travel & Outdoor — not the three 3-3-3 stages. Photographs will not fix either. Separately, "Less anxious" as a headline sits close to the ASA line the standing rules draw (anxiety treated as a health condition); that deserves its own finding.


**[V24] KILLED** — The underlying defect is real and I reproduced it, but the finding as written should not be actioned: three of its evidentiary claims are wrong, one in the class the brief forbids.\n\n(1) EVIDENCE URL FAILS REPRODUCTION. I loaded the exact cited URL (https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1, no preview param) via tools/agent-browser/browse.mjs. It served theme 193140818203 — the LIVE theme. grep 'Size' returned 2 hits and 'SIZE: SMALL' was NOT among them; grep 'size up' returned 0 hits. The quoted strings appear only when I forced ?preview_theme_id=193438056731 with --theme asserted (Shopify.theme.id confirmed 193438056731). This is exactly the L002 trap STATUS.md:114 warns about. The page WAS genuinely loaded — the strings are draft-only so they cannot have been invented — but the finding never states which theme it saw and cites a URL that reproduces nothing.\n\n(2) RUN #1 ERROR CLASS REPEATED — a genuine protected review misread as store copy. 'Size up if your dog likes space' is not a generic sizing tip. It is the HEADLINE OF A CUSTOMER REVIEW (Priya N., February 2026), one of the reviews STATUS.md:51 records as genuine and orders nobody to touch. Its body reads 'The outside measurement is a bit misleading because the big padded rim takes up some of it. I swapped ours for the next size and it's perfect now.' That is a real customer being helpful, not a store defect. The theme does hardcode a size-up tip (dog-nook-specs.liquid:52, 'If they're between sizes, size up — dogs settle better with room to stretch out'), but it does NOT render on this page: it is gated on custom.size_guide, which is null. I confirmed no size table appears anywhere in the DOM. The finding appears to have conflated run #1's 'theme hardcodes size up on every product' claim with a review headline it saw on screen.\n\n(3) WRONG FIELD. The 80cm line is not in the description. The rendered description ('About this') is two paragraphs with no measurement. 'Large, 80cm — suits most dogs up to Labrador size' is a bullet in 'The details' — the custom.specs metafield (corroborated by audit/implementation-notes/live-catalog-changes.md:120). Anyone told to 'rewrite the copy so measurements are per-variant' would edit the wrong field.\n\n(4) OVERSTATED. 'A customer choosing Small is shown an 80cm measurement' is not literally true — the figure is explicitly labelled 'Large'. The accurate and still-serious problem is the inverse: it is the ONLY dimension published for a three-variant sized product, so Small and Medium buyers get no measurement at all.\n\n(5) DUPLICATE. This re-reports recon report line 16 almost verbatim ('the bed's copy still says Large, 80cm... a customer buying Small is shown an 80cm claim'), and its CJ blocker is recon line 137, item 8. The brief said do not redo run #1; source:'see:home' presents it as fresh.\n\nWHAT VERIFIES TRUE: the product (gid://shopify/Product/10311318274331, handle calming-donut-bed-1) has three live variants Small £29.99 / Medium £37.99 / Large £44.99, Small is first and renders as the default selection ('SIZE: SMALL', price £29.99), and 'Large, 80cm — suits most dogs up to Labrador size' renders below it. Does not contradict STATUS.md.\n\nINNOCENT EXPLANATIONS RULED OUT: not a per-size table row (no size guide renders at all); the FAQ does not supply the missing figures — it reads 'Available in Small, Medium and Large. Measure your dog curled up and check it against the size guide before ordering', pointing at a size guide that renders nothing; and scanning every 'cm' occurrence in the DOM found exactly one product-copy hit. I also searched the repo — no Small/Medium dimensions exist anywhere. So the CJ blocker is fair, though narrower than stated: only the numbers are blocked, the mislabelling and the dangling size-guide pointer are fixable today.


**[V25] HELD** — HOLDS on mechanism — I reproduced it independently and could not refute it — but the SCOPE is wrong and two sub-claims are false.

WHAT I DID (not the original agent's evidence — my own): started tools/agent-browser/tunnel.py, ran browse.mjs and two scripts of my own (/tmp/.../scratchpad/measure.mjs, causal.mjs, scope.mjs) against https://thedognook.co.uk/products/calming-donut-bed-1 at a 375x812 viewport, asserting window.Shopify.theme each time. Served theme confirmed: id 193438056731, "The Dog Nook — Design install (CRO working copy)", role unpublished. I also fetched the deployed stylesheets from /cdn/shop/t/12/assets/ with curl.

CONFIRMED, VERBATIM:
* Deployed dog-nook-cro.css really does end with `.tdn-sizes{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}` plus a `.tdn-sizebtn` block. I initially suspected fabrication because git's assets/dog-nook-cro.css has no such rule (it has `.tdn-swatches{display:flex;gap:10px;...}` and no `.tdn-sizebtn` at all) — but the deployed file is the documented asset drift, and the quote is exact.
* Deployed dog-nook-cro2.css loads after it and contains `.tdn-sizes{width:100%;border-collapse:collapse;font-size:13.5px;min-width:420px}`. Equal specificity, later sheet, so min-width:420px wins. cro3.css loads last and contains no .tdn-sizes rule.
* The element carrying the class is a DIV, not a table: `<div class="tdn-sizes" data-tdn-swatches role="radiogroup" aria-label="Size">` wrapping `<button class="tdn-sizebtn">`. Computed min-width 420px, getBoundingClientRect().width 420. Only one .tdn-sizes element on the page; zero table.tdn-sizes.
* body.clientWidth 375, body.scrollWidth 420, documentElement.scrollWidth 420. `.tdn-pdp` computed grid-template-columns: 420px. window.scrollTo(500,0) leaves scrollX 0 — the 45px is genuinely unreachable, not just off-screen.
* CAUSAL TEST (the original agent did not do this): injecting only `.tdn-sizes{min-width:0!important}` collapsed scrollWidth 420→375, grid-template-columns 420px→375px, and the count of elements wider than the viewport went 36→0. Nothing else on the page contributes. Root cause is exactly as stated.
* The cited screenshot mm-01.png exists and is real; I opened it. The clipping it shows ("They stood in the doo", "the two things a nervo", "Delivered in 4–7 work", sticky Add to Cart running off the right edge) matches my own measurements.

WHERE IT IS WRONG:
1. SCOPE — the title says "Mobile PDP", implying all of them. I loaded all 7 other live PDPs at 375px (lick-mat-1, snuffle-mat-medium-1, slow-feeder-bowl-1, car-boot-liner-1, the-settle-in-bundle, plus the two that first timed out, retested). Every one: scrollWidth 375 = clientWidth 375, zero .tdn-sizes elements. The swatch row only renders for multi-variant products, and calming-donut-bed-1 is the ONLY live product with a real option (products.json: every other product's option is "Title"). So this is one PDP out of nine, not the PDP template.
2. "every line of copy is cut off mid-word" — false as written. Only lines long enough to reach past 375px are clipped; short lines render fine.
3. "the upsell headline loses 'Settle-In Bundle'" — false. In the cited screenshot it wraps to two lines and "Settle-In Bundle" is fully visible on line two.

INNOCENT EXPLANATIONS I CHECKED AND RULED OUT:
* Wrong theme (the L002 trap): ruled out — asserted Shopify.theme.id on every load, twice, in separate scripts. Worth noting my curl with a preview_theme_id cookie DID silently return the live theme (0 occurrences of tdn-sizes), which is the trap firing; only the browser runs are load-bearing here.
* The `.tdn-specs__scroll{overflow-x:auto}` wrapper: this is the innocent design that makes min-width:420px correct for the table. But the size-pill DIV is not inside that wrapper, so the wrapper does not protect it. Confirmed by DOM inspection.
* Stale cache: ruled out — assets fetched fresh with their version hashes, and every number is a computed style measured live in the browser.
* NOT an owner error, and the finding does not claim it is. The likeliest innocent history: the size-pill UI (radiogroup, 44px targets, `.tdn-sizebtn`) was appended to cro.css later as an a11y/CRO improvement and reused the `tdn-sizes` name without knowing cro2.css already owned it for the size-guide table. Neither author was wrong in isolation. Note this bug is INVISIBLE to anyone reviewing git — neither the colliding rule nor the `class="tdn-sizes"` markup exists in the repo.

STATUS.md: no contradiction. It makes no verified claim about mobile PDP layout; it explicitly warns that any layout claim without loading the page is a guess. Not in PROBLEMS-1.md and not in the 2026-08-05 recon report, so this is new.

FIX CAVEAT the finding misses: the proposed edit is safe in itself, but deploying it is not trivial. Deployed dog-nook-cro.css and deployed snippets/dog-nook-pdp-form.liquid BOTH differ from git — git still has the old `.tdn-swatches` colour-chip UI. Pushing the git theme wholesale would revert the size-pill work and silently "fix" the bug by deleting the feature. Only the two changed files may be deployed.


**[V26] HELD** — The substance is real and I verified it independently, but the framing, the novelty and the location of the risk are all wrong. VERIFIED: I loaded https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1?preview_theme_id=193438056731 with a cookie jar (the cookie survived the 301) and the served HTML asserts Shopify.theme.id 193438056731, role unpublished — so the L002 wrong-theme trap was avoided. In that HTML the description renders at .tdn-pdp__desc and contains <li>Large, 80cm — suits most dogs up to Labrador size</li>; Admin API confirms three live variants Small/Medium/Large at 29.99/37.99/44.99; each pill carries data-variant-price and assets/dog-nook.js lines 42-45 rewrites only [data-tdn-swatch-label] and [data-tdn-price], nothing else; "tdn-specs" appears 0 times in the served HTML because custom.specs and custom.size_guide do not exist as metafields on this product (only global.title_tag, global.description_tag, custom.faq, custom.delivery_line, reviews.*, custom.bundle_handle). No size table, no measurements and no "Which size?" block appear anywhere on the page. So the false 80cm assertion sitting next to a £29.99 Small is real. FOUR CORRECTIONS. (1) It is STRONGER and simpler than described: the page's DEFAULT state is already Small at £29.99 with the 80cm line — no clicking is needed to reach the misdescription, so the scripted-click evidence, while consistent with the markup, was not needed and slightly overstates the discovery. (2) The framing "never change with the size variant" is wrong and misdiagnoses the cause. descriptionHtml is a product-level field in Shopify; no theme anywhere makes it variant-reactive, so "never changes" is trivially true and is not a defect. The defect is stale copy: live-catalog-changes.md line 120 records the spec block was written when the bed was "still a single £44.99 variant", and the S/M/L variants were added later (product updatedAt 2026-07-27). That is documented drift from an earlier build session, NOT the owner asserting a false measurement — an innocent explanation the finding never named. (3) The proposed "full fix is the per-variant size guide" misreads the built code: snippets/dog-nook-specs.liquid renders a static table of ALL sizes (Size/Measurement/Suits) from custom.size_guide. It is not variant-aware either, and correctly so. The sentence "nothing variant-aware is rendering" is therefore a confused causal story — a fully populated specs block would still not change per variant. (4) The DMCC/CPR exposure is misplaced. Theme 193438056731 is unpublished and no customer can reach it. I also loaded the live page (theme 193140818203 asserted) and the same "Large, 80cm" line is served there, with a working Small/Medium/Large variant picker — so the consumer-law risk is real but lives on the LIVE store, not on the draft that was tested. Mitigating the urgency slightly: all three variants show inventoryQuantity 0 and the store has never taken an order, so nobody has yet been misdescribed at an actual moment of purchase; this is a pre-launch fix, not a live incident. Finally, this is NOT a new finding. The 2026-08-05 recon report already states it in item 3, almost word for word ("the bed's copy still says 'Large, 80cm — suits most dogs up to Labrador size' even though Small and Medium are now live at £29.99/£37.99 — a customer buying Small is shown an 80cm claim"). The brief said do not redo run #1. It adds one genuinely new fact — that it is the default state, not a click-dependent one. It does not contradict STATUS.md, which is silent on this and consistent with it.


**[V27] HELD** — CORE CLAIM CONFIRMED — and the evidence is real, not dressed-up inference. I verified it independently rather than taking the report's word for it.

WHAT I DID (how I know):
1. Read /home/user/sc/dog-nook-theme/assets/dog-nook.css lines 58-60 — rule order is exactly as quoted.
2. Fetched the DEPLOYED asset over the network (curl, HTTP 200, 9244 bytes) from //thedognook.co.uk/cdn/shop/t/12/assets/dog-nook.css?v=7586407119038453391784743960, reached via the preview URL for theme 193438056731. The minified deployed text contains verbatim: `.tdn-wrap{max-width:var(--tdn-maxw);margin:0 auto;padding:0 var(--tdn-side-pad)}.tdn-section{padding:64px 0}@media(max-width:760px){.tdn-section{padding:44px 0}}`. Deployed == repo.
3. Loaded a real PDP on the preview theme (HTTP 200, 243KB, /products/snuffle-mat-medium-1?preview_theme_id=193438056731) and confirmed the rendered markup is `<section class="tdn-section tdn-wrap">` inside `<div class="tdn tdn-fade" data-tdn-product>`.
4. Playwright could not reach the site through the agent proxy (ERR_CONNECTION_RESET), so I rebuilt the page locally from the ACTUAL deployed HTML with all five deployed stylesheets downloaded and relinked, then measured. At 375px: paddingLeft 0px, paddingRight 0px, element x=0, width=375; breadcrumb, eyebrow, h1, price and the add-to-cart button ALL at x=0, width 375. At 1440px: padL/padR still 0px, element x=130, width 1180. Every figure in the finding — including the oddly specific x=130 — reproduces exactly. The report measured a real page.

INNOCENT EXPLANATIONS I RULED OUT (this is where run #1 failed):
- A later stylesheet restoring the gutter: the PDP loads base.css, dog-nook.css, dog-nook-cro.css, dog-nook-cro2.css, dog-nook-cro3.css, overflow-list.css. I downloaded all of them and grepped each for `.tdn-wrap`, `.tdn-section`, `side-pad`, `padding-left/right/inline` — ZERO matches in any of the three cro files. Nothing rescues it. (Note the three cro files are the "three conflicting versions" the standing rules protect; none of them is relevant here, and the fix does not require touching them.)
- A parent wrapper supplying the gutter: chain is main.content-for-layout > section.shopify-section > .tdn > section.tdn-section.tdn-wrap. base.css gives `.content-for-layout` only flex properties and `.shopify-section` no horizontal padding. Verified.
- Inline <style> overrides: 21 inline style blocks on the page, 0 referencing tdn-wrap or tdn-section.
- Deliberate edge-to-edge mobile design: ruled out by the author's own `@media (max-width:760px){:root{--tdn-side-pad:20px}}` at line 43. That override computes to 20px (I measured `--tdn-side-pad` = "20px" at 375px) and is then never consumed. A dead 20px mobile-gutter override only exists if a gutter was intended.
- No owner-blame inference is made, so the run #1 failure class does not arise. `owner:"claude"` is a fix assignee, not an accusation.

STATUS.md: no contradiction. I grepped STATUS.md, PROBLEMS-1.md and audit/ for "gutter", "tdn-wrap", "side-pad", "flush", "padding" — zero hits. STATUS.md only says "Design/theme | Full custom theme built on draft 193438056731"; it never claims mobile layout was verified. This is genuinely new, not a re-raise.

TWO SUB-CLAIMS I DID REFUTE — both must be corrected before anyone acts:

(a) THE PRESCRIBED FIX IS WRONG, BOTH OPTIONS. I tested all candidates in a browser against the exact deployed cascade.
 - "give .tdn-wrap explicit padding-left/padding-right (longhand beats the shorthand ordering problem)" — the parenthetical is FALSE. Longhand does not beat a later shorthand; specificity is equal (0,1,0) and source order still decides. Applied in place at line 58 where .tdn-wrap lives, I measured padL:0px padR:0px at BOTH 375px and 1440px — a complete no-op. It only works if the longhand is also moved BELOW .tdn-section, which the finding never says.
 - "move the .tdn-section rules above .tdn-wrap" — this actively BREAKS the page. .tdn-wrap's own shorthand `padding: 0 var(--tdn-side-pad)` then zeroes the vertical axis. Measured: padL:20px padR:20px but padT:0px padB:0px at 375px, and padT:0px padB:0px at 1440px. All vertical section rhythm sitewide collapses.
 - The fix that actually works (measured correct at both widths): split the axes into non-colliding longhands so order stops mattering — `.tdn-wrap{padding-inline:var(--tdn-side-pad)}` and `.tdn-section{padding-block:64px}` / `44px` in the media query.

(b) IT IS NOT A MOBILE BUG, AND THE 44px MEDIA-QUERY RULE IS NOT THE CULPRIT. The damage is done by `.tdn-section{padding:64px 0}` at line 59, which sits in NO media query and zeroes horizontal padding at every viewport. I swept widths: flush to x=0 at 375, 600, 768, 900, 1024 AND 1180px. The gutter only appears at 1280px (x=50) and 1440px (x=130), purely as leftover auto-margin. So tablets and any browser window under ~1180px are also edge-to-edge — a materially larger blast radius than "mobile".

Also wider than stated: 11 sections carry both classes, not just the PDP — dog-nook-quiz, -product, -collections-index, -collection-list, -shop, -featured-bundle, -prep-timeline, -collection, -why, -bundle, -reviews-placeholder. Against POSITIONING.md that matters: prep-timeline, bundle and quiz are the sections that carry the 3-3-3 stage-matching, so the exact content meant to help someone work out which stage their dog is at is the content rendering jammed against the screen edge.

File is assets/dog-nook.css — correctly identified as NOT on the do-not-touch list (that list covers dog-nook.js and dog-nook-cro.css only). Effort "quick" and impact "high" both stand; impact is arguably understated.


**[V28] KILLED** — The EVIDENCE holds; the BLOCKER does not, and the STATUS.md attribution is false.

WHAT I DID (so you can weigh this): I started tools/agent-browser/tunnel.py and loaded https://thedognook.co.uk/products/calming-donut-bed-1 three times with `--theme 193438056731` asserted (exit 0 each time; the tool printed `theme: 193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]`, so this is the draft, not the live theme). A plain curl of the myshopify URL 301s to thedognook.co.uk and silently serves the LIVE theme — the L002 trap — so anyone who "loaded the page" with curl did not see the draft. I also grepped the repo.

1. EVIDENCE — CONFIRMED, and it is genuinely a loaded page. On the draft PDP, grep /cm/ returns exactly one hit sitewide on that page: "Large, 80cm — suits most dogs up to Labrador size". "Small" and "Medium" appear only as bare variant names. No S/M measurement exists anywhere in the repo either (only audit/implementation-notes/live-catalog-changes.md:120 and audit/proposed-copy/product-faqs-metafield.md:50, both Large-80cm-only). So "not in the catalogue, not in the description, not derivable" is true, and the instruction not to invent centimetres is right.

2. BLOCKER "third-party" — NOT PROVEN. Two innocent explanations were not ruled out, and one of them is refuted by the very page the finding cites:
   (a) The owner sold this bed BY HAND before Shopify existed (STATUS.md lines 51-63; the Donut Bed is one of the 8 genuine-review products). Rendered in the reviews on that same PDP: "the big padded rim takes up some of it. I swapped ours for the next size and it's perfect now." A customer swapping to the next size is direct evidence that more than one size of this bed physically passed through the owner's hands. A tape measure answers this; no supplier reply is required. This is the run-#1 error class exactly — inferring an external dependency while ignoring the documented offline channel.
   (b) The owner has a CJ account (fulfilment is CJdropshipping per audit/data/live-store-facts.md:67). CJ listings publish per-variant dimensions. Reading their own supplier listing is a lookup they can do now, not an email with an unbounded wait. No CJ product URL/SKU is logged in the repo (SKUs are null — live-catalog-changes.md:154), so Claude cannot do the lookup, but that makes it "owner, minutes, self-serve", not "blocked on a third party replying".

3. STATUS.md — CONTRADICTED. "This is the same unanswered CJ email already logged in STATUS.md" is false. STATUS.md has no occurrence of measure/dimension/donut anywhere; its blocked item 3 is transit times + "do bundles ship as one parcel?" only. The measurements ask lives in the recon report's blocked list (#8), as a SEPARATE owner item. It can be appended to that email — but claiming it is already logged there lets it inherit that item's stalled status, which is how a five-minute job becomes permanently parked. STATUS.md is right; the finding is wrong.

4. MISSED, AND SHARPER THAN THE GAP ITSELF: the draft PDP defaults to `SIZE: SMALL` at £29.99 while the only measurement rendered is "Large, 80cm". The default-selected variant is the one the spec does not describe. Against the position ("get the right thing for the stage"), that is a live misdescription pointing at a return, not merely a missing block — and it is fixable today with zero CJ input.


**[V29] HELD** — EVIDENCE IS REAL — I reproduced it independently rather than taking it on trust. Started tools/agent-browser/tunnel.py and ran my own Playwright probe (/tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/probe.mjs) against https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 with Shopify.theme.id asserted = 193438056731 ("The Dog Nook — Design install (CRO working copy)", role unpublished), so L002 is not in play. Every stated DOM value came back exactly as claimed: table.tdn-sizes false, .tdn-specs__h false, .tdn-specs false, .tdn-suit false, "which size" 0 hits in body text AND 0 in raw HTML, "size guide" 0 in visible body / 1 in HTML, "girth" 0, "cm" 1. I then forced the accordion open and got the FAQ answer verbatim, including the smart apostrophes: "Available in Small, Medium and Large. Measure your dog curled up and check it against the size guide before ordering — if you're between sizes or unsure, email us and we'll help you choose." This is a loaded page, not dressed-up inference. I also read snippets/dog-nook-specs.liquid — lines 49-67 are as described, gated on product.metafields.custom.size_guide — and confirmed sections/dog-nook-product.liquid:67 does render the snippet, so the gate is the only thing suppressing it. SIX CORRECTIONS, none fatal but three material. (1) NOT NEW — this is run #1's finding #3, near-verbatim: "custom.specs and custom.size_guide are null on all 21, so the whole 'The details' and 'Which size?' block — 87 lines of built, working template — outputs nothing". The brief said do not redo run #1. What is genuinely new is the rendered-page confirmation (run #1 explicitly said "Nothing in this report was seen rendered") and the per-product FAQ wording — run #1 quoted the site FAQ line "each product page lists sizes and measurements", not this PDP's "check it against the size guide before ordering". So this should ship as verification of an open item, not as a discovery. (2) BLOCKER IS NOT "none". The finding contradicts itself — "Claude can build and populate the block now" then "Only the exact Small/Medium centimetre figures need the supplier". Recon's Blocked-on-owner #8 is precisely "Supply the Donut Bed Small and Medium measurements from CJ", and STATUS.md lists sourcing as owner-only. Claude can populate at most one of three rows. Blocker = owner (partial). (3) "the false '80cm' bullet" is NOT false. The rendered description bullet reads "Large, 80cm — suits most dogs up to Labrador size" — correctly labelled as the Large figure. It is incomplete, not untrue. Calling it false is the kind of overstatement that got run #1 into trouble. The real sharp point, which I found and the finding missed: the PDP loads with SIZE: SMALL preselected at £29.99, and the only centimetre figure anywhere on the page belongs to Large. (4) INNOCENT EXPLANATIONS NOT RULED OUT — the finding implies a broken/neglected build. The snippet's own header comment says: "All metafield-driven; nothing renders until real data exists, so no placeholder or invented specifications ever reach a customer." The empty block is a safety valve working as designed, not a bug. Second innocent explanation: the bed was a single Large-only SKU (audit/implementation-notes/live-catalog-changes.md still describes it as one £44.99 variant); S/M were added later, so the FAQ/description are variant-expansion drift, not carelessness. Third: the store is pre-launch, gated on photography, so no shopper has hit this. To the finding's credit it does not accuse the owner of anything, so it does not repeat the run-#1 error class — but it should name these. (5) "a conversation gate" overstates it. The FAQ falls back to email only "if you're between sizes or unsure" — a reasonable honest fallback. The real conversation gate run #1 identified was the Settle-In Bundle telling large-dog owners to message before ordering. (6) "87 lines of finished template output nothing" — 87 is the whole snippet; the size-guide portion is 19 lines (49-67), and the rest is specs/suitability. NO CONTRADICTION WITH STATUS.md — it neither claims a size guide exists nor lists this as closed; it is consistent with recon item #3, which STATUS says still stands. INCIDENTAL, worth passing on: recon quick-win #11 ("sizes render as three identical grey squares") appears already fixed on this theme — the picker renders a "SIZE: SMALL" label with readable Small/Medium/Large controls. POSITIONING CHECK: against POSITIONING.md's test this is hygiene, not spine — sizing answers "will it fit", not "which stage is my dog at". Impact high is defensible for the highest-value single SKU; it is not a positioning-advancing fix and should not outrank the 3-3-3 work.


**[V30] HELD** — The physical claim survives — I reproduced it independently rather than trusting it. Loaded https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 through tools/agent-browser with the theme assertion on: served theme 193438056731 "The Dog Nook — Design install (CRO working copy)" [unpublished], status 200. DOM: `.tdn-pdp__short` does not exist, `document.querySelectorAll('[class*="short"]')` returns zero nodes. Same result on lick-mat-1 and snuffle-mat-medium-1, so it is not one-product-specific. Rendered order on the 375px viewport is exactly as the finding states: breadcrumb (y=152) → placeholder (190) → CALMING ESSENTIALS (514) → The Calming Donut Bed (546) → 4.8 · 10 reviews (593) → £29.99 (629) → SIZE: SMALL → Add to Cart (922). No selling sentence anywhere in that run. The template gate is real and I read it: /home/user/sc/dog-nook-theme/sections/dog-nook-product.liquid:42-43. The other half of the fallback is also blank — /home/user/sc/dog-nook-theme/templates/product.json sets add_label, guarantee_text, delivery_text, about_heading and no short_text — so nothing fills the slot from either side. Zero product images confirmed via products.json (`"images":[]` on all), so "words are the whole argument" is true. The quoted copy is verbatim the first paragraph of the Donut Bed description, and the POSITIONING.md quote is verbatim at line 97. This was a real page load, not dressed-up inference. SIX CORRECTIONS, two of them material. (1) NOT NEW — this is run #1's top-five item 3 verbatim ("`custom.short_description` is null on all 21 products, so the first screen of every PDP is breadcrumb → title → price → variant picker → button... not one sentence of persuasion") plus its quick-win #13, and it is already queued as START-HERE-NEXT-BUILDER TODO 3 item 3. The brief said do not redo run #1; this reports a known, tracked item as a discovery and cites no prior art. (2) THE PRESCRIPTION CONTRADICTS TWO STANDING INSTRUCTIONS. "Claude writes the short description" is wrong: START-HERE-NEXT-BUILDER says "Do not rewrite the product descriptions... Label them by stage and move them up the page", and run #1 says "the opening line of each description is already the right sentence". The job is to LIFT, not to author. The finding even quotes POSITIONING's "doesn't need rewriting" line and then proposes writing. (3) IT MISSES THE POSITION. It never mentions the stage — the one thing the brief says every element is judged on. A generic persuasion sentence above the price does not help anyone work out whether their dog is at day 3 or month 3; the slot's job per TODO 3 item 3 is to surface the stage. Scoring this as "nothing that sells" is the normal-store test, not the 3-3-3 test. (4) The 1430px figure does not reproduce for this page: on the Donut Bed the description's first paragraph sits at y=1540 (the "About this" heading at 1509). 1448 is what the single-variant PDPs measure — so 1430 looks carried over from a different product. Directionally right, wrong page. (5) "Grey placeholder" is wrong on both counts: computed background is rgb(139,149,120) = #8B9578 sage, and it is not empty — it renders the photo-brief text "Product on clean background". (6) EVIDENCE OVERSTATED BY ONE STEP: I could not read the metafield itself (the Shopify GraphQL call needed an approval I do not have), so "custom.short_description is still null" is an inference from the render, not a metafield read. It is a safe inference — the gate resolves blank whichever input is empty — but the finding states it as observed fact. NO OWNER-BLAME ERROR: unlike run #1's reviews call, this assigns the work to Claude and blames nobody, so the innocent explanation matters less. For completeness, the one that would have mattered is ruled out: the section setting could have filled the slot independently of the metafield, and it does not. The remaining innocent context is that this is undone queued work on an UNPUBLISHED draft that STATUS.md says is launch-blocked on photography — nothing here is customer-facing, so "high impact" is defensible as pre-launch prep but should not read as a live problem. No contradiction with STATUS.md: its DONE table never claims short descriptions are set.


**[V31] HELD** — HOLDS — I reproduced the evidence independently rather than taking it on trust. HOW I KNOW: ran tools/agent-browser (tunnel.py + my own Playwright script) against https://thedognook.co.uk/products/calming-donut-bed-1 with the theme assertion on. Got status 200, Shopify.theme.id = 193438056731, role "unpublished", name "The Dog Nook — Design install (CRO working copy)" — the right theme, not live (L002 trap avoided). DOM on that page: `.tdn-specs` -> false, `.tdn-specs__row` -> 0, `.tdn-specs__h` -> null, `.tdn-suit` -> false. I then dumped `.tdn-pdp__desc` innerHTML: the four bullets are literally `<p><strong>The details</strong></p><ul><li>Plush faux-fur…</li>…</ul>` INSIDE the description body, and the only "The details" node on the page returns inDesc:true. The section heading above it is "About this" (sections/dog-nook-product.liquid line 61). So the central claim — the visible "The details" bullets are description prose and the built specs component renders zero rows — is OBSERVED, not inferred. Repeated the same DOM check on lick-mat-1, snuffle-mat-medium-1, slow-feeder-bowl-1: identical, `.tdn-specs` false and 0 rows on all. SOURCE CORROBORATION: snippets/dog-nook-specs.liquid reads product.metafields.custom.specs.value, wraps everything in `.tdn-specs`, and only emits `<h3 class="tdn-specs__h">The details</h3>` plus `<dl>` label/value rows. The whole wrapper is gated on has_any, so `.tdn-specs` being absent proves ALL FIVE fields are blank (specs, size_guide, suitable_for, not_ideal_for, care) — a stronger statement than the finding made. INNOCENT EXPLANATIONS CHECKED AND RULED OUT: (1) Wrong class names — no; grep'd, the classes are real and unique to that snippet. (2) Wrong theme served — no; Shopify.theme.id asserted on every load. (3) A second working specs implementation elsewhere — I chased this because `.tdn-sizes` DID return true, which looked like the size table rendering. False positive: the deployed `.tdn-sizes` is a variant radiogroup of pill buttons (div.tdn-sizes[data-tdn-swatches] > button.tdn-sizebtn Small/Medium/Large) inside form.tdn-pdp__form — a NEWER deployed version of the size selector than git has, unrelated to the specs table. (Incidental: that also means run #1's "three identical grey squares" bug is already fixed on this theme.) (4) Owner fault — none alleged and none exists. The empty state is DELIBERATE: the snippet's own header comment says "All metafield-driven; nothing renders until real data exists, so no placeholder or invented specifications ever reach a customer", and DEPLOY-ME.md lines 174-176 call these metafields "Optional… All degrade silently to nothing when unset, so deploying without them is safe." The block is unfed, not broken. The finding blames no one, so it does not repeat run #1's error class. WHAT I COULD NOT VERIFY: the literal sub-claim "custom.specs is null". The Shopify Admin MCP graphql_query was refused (approval required), so I never read the metafield — I proved the render outcome only. The null explanation is corroborated by run #1, which did read metafields live via the Admin API. One residual alternative I cannot close: the deployed dog-nook-specs.liquid may differ from git (asset drift is real here, proven by the size-button markup above). Shopper-facing consequence is identical either way. STATUS.md: no contradiction — it never claims specs are populated. NOT NEW: this is run #1's headline item 3 ("custom.specs and custom.size_guide are null on all 21… the whole 'The details' and 'Which size?' block — 87 lines of built, working template — outputs nothing") and its quick win #14. The brief said do not redo run #1. What it legitimately adds is evidence grade, not fact: run #1 said explicitly "treat every layout claim here as source-level reasoning, not observed behaviour", and this is now observed on the correct theme. Log as a verification, not a new defect. TWO OVERSTATEMENTS TO CORRECT: (a) "no structured material, no wash temperature, no dimensions" — material ("plush faux-fur"), washability ("removable, machine-washable") and a dimension ("80cm") ARE present, just as unscannable prose; only wash TEMPERATURE is genuinely absent. The real loss is structure and comparability, not information. (b) "nothing that can be made variant-aware" — custom.specs is a PRODUCT-level metafield, so filling it does not make anything variant-aware either. The Donut Bed showing "Large, 80cm" while Small (£29.99) is selected is a size_guide / per-variant-copy defect and is NOT fixed by populating custom.specs. POSITIONING: a spec list does not help anyone work out which 3-3-3 stage their dog is at, so "medium" is the ceiling on impact, not the floor.


**[V32] HELD** — The core claim survives, and I confirmed it independently rather than taking it on trust — but two of its supporting statements are wrong and the headline overstates.

WHAT I VERIFIED (loaded the page, correct theme asserted). I loaded https://thedognook.co.uk/products/calming-donut-bed-1 twice — once with `curl -sSL -c cj -b cj`, once with `tools/agent-browser/browse.mjs --theme 193438056731` — and asserted `Shopify.theme = {"id":193438056731,"name":"The Dog Nook — Design install (CRO working copy)","role":"unpublished"}` on both, per L002. The screenshot shows the Shopify draft bar. So this finding is NOT dressed-up inference: the page was genuinely loaded, on the right theme. Reproduced exactly, in real `document.body.innerText`: stage=0, 3-3-3=0, decompress=0, "first three months"=0. The eyebrow above the H1 does read "CALMING ESSENTIALS". Theme-wide grep for `custom.stage|3-3-3|decompress|stage_label` across dog-nook-theme/ returns zero hits — there is no stage plumbing anywhere. So: no 3-3-3 vocabulary on the PDP is a real, confirmed fact.

ERROR 1 — one evidence line is false. The finding lists `"first days" 0`. It is 2 in innerText: the "Pairs well with" cross-sell card ("The First Days Kit") and the footer link. Innocent explanation I checked and accept: their count was almost certainly case-sensitive, and the page renders "First Days", not "first days". So this is sloppy method, not fabrication — but it is the one marker that actually appears, and it was reported as absent.

ERROR 2 — "zero stage signal" / "nothing tells you which stage this bed is for" is overstated. Above the fold, directly under Add to Cart, a "BETTER TOGETHER" block reads "The Calming Donut Bed is part of The Settle-In Bundle · £64.99 · Save £7.98 vs buying separately · See the bundle →". Settle-In IS the Weeks 1–3 stage per POSITIONING.md, and the bed is correctly attached to it. So the page already routes this bed to its right stage and already has the link-through the finding asks to add. What is missing is that "Settle-In" is never *named* as a stage, never given its timeline, and never explained. That is a labelling gap, not a void — a materially smaller and cheaper fix than "the page scores zero".

INNOCENT EXPLANATION NOT RULED OUT — and it is the important one. This is not a discovery. START-HERE-NEXT-BUILDER.md TODO 3 item 3 already says, in almost identical words: "Tag every product with its stage (a `custom.stage` metafield is the obvious route), and surface it on the PDP. A lick mat is a day-one product; a bed is a week-one product." POSITIONING.md was decided 2026-08-05; the theme predates it. So the absence is unstarted planned work that is already queued and accepted — not a defect anyone introduced and not something the audit uncovered. The finding never says this, and its claim "This is the change that makes the page look like nobody else's" reads as novelty it does not have. It does not repeat run #1's exact error (it accuses nobody; it assigns owner:"claude"), but it does inflate an existing backlog item into a discovery.

ONE MORE CORRECTION. Calling the eyebrow "a merchandising category" implies an authored choice. sections/dog-nook-product.liquid line 30 renders `product.collections.first.title` — whichever collection happens to be first, incidental rather than chosen. This makes the fix cheaper than proposed: putting products into stage collections populates the eyebrow automatically, no new badge component needed.

NO CONTRADICTION WITH STATUS.md. STATUS.md's DONE row covers the theme build; it lists the 3-3-3 rebuild as the queued job and points at START-HERE-NEXT-BUILDER.md. Both agree.

Net: the underlying gap is real and I confirmed it on the correct theme, so it holds — but it should be restated as execution of queued TODO 3 item 3, sized against the Settle-In link that already exists.


**[V33] HELD** — EVIDENCE IS REAL — I reproduced it independently, I did not take it on trust. I loaded https://kkeqih-jm.myshopify.com/products/calming-donut-bed-1 through tools/agent-browser (tunnel + browse.mjs) with --theme 193438056731 asserted against window.Shopify.theme.id, which returned "193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]" — so the L002 trap (preview cookie dropped, live theme silently served) is ruled out, not assumed. Every quoted string renders verbatim: "BETTER TOGETHER" / "The Calming Donut Bed is part of The Settle-In Bundle" / "£64.99" / "£72.97" / "Save £7.98 vs buying separately" / "See the bundle →". £72.97 − £64.99 = £7.98 exactly. The howKnown of "loaded-page" is honest.

CORE POSITIONING CLAIM HOLDS, AND IS STRONGER THAN STATED. I grepped the entire theme for 3-3-3 / decompress / "weeks 1" / "Days 1" / stage language: zero hits in any .liquid or .json. So the block naming "Settle-In" without ever saying it means weeks 1–3 is not a local omission — no stage language exists anywhere on the site. POSITIONING.md's test ("does this help someone work out which stage their dog is at") is failed here, and the finding is right that this block asks the money question.

OWNER-BLAME CHECK — the innocent explanation is the sufficient one, and the finding's "biggest miss" framing edges past it. dog-nook-bundle-upsell.liquid was committed 2026-07-25; POSITIONING.md was decided 2026-08-05. The block was built correctly to the AOV brief that existed at the time (its own header comment states the £60→£80 AOV purpose), and POSITIONING.md itself queues the stage reframe as pending work. This is unbuilt roadmap, not an owner error. Ruled out: (a) that stage copy exists but fails to render — grepped the whole theme, it does not exist; (b) that it is set as data and merely blank — the snippet's own bundle_contents slot renders nothing today, so no stage sentence exists in code or content.

WHAT I DID REFUTE — two confident sub-claims are wrong:

1. "The false-saving problem has NOT leaked into this cross-sell" is overstated. The £72.97 compare-at is the MEDIUM-bed configuration (£72.97 − £11.99 Lick − £22.99 Snuffle = £37.99). The PDP as rendered defaults to "SIZE: SMALL / £29.99". For the shopper actually looking at that page, Small + Lick + Snuffle = £64.97, so the bundle at £64.99 is 2p MORE than its parts — while the block tells them they save £7.98. The upsell never states which bed size is in the bundle. (Lick £11.99 and Snuffle £22.99 observed rendered on the bundle page; £37.99 Medium is derived arithmetic, independently corroborated by the recon report's S/M/L figures — I did not see the variant prices render, they are JS-swapped.)

2. "Mechanically genuinely good... not broken" understates what one click does. I loaded the destination: "See the bundle →" lands on a page badging "BEST VALUE · SAVE £15" and stating "Bought separately £49.97" alongside "You save £7.98". So the cross-sell's honest £72.97 becomes £49.97 in one click, and the destination contradicts itself. The block is the entry ramp to the live compliance defect, not insulated from it.

3. "Highest-leverage single edit on the page" is an overclaim. The same page renders "Large, 80cm — suits most dogs up to Labrador size" under "The details" while defaulted to Small at £29.99 — a live misdescription with DMCC exposure, which outranks a positioning improvement. (Separately: STATUS.md's "verified reviews" follow-up is already DONE — the page now reads "Based on 10 customer reviews", no "verified" anywhere. STATUS.md is stale on that point.)

NO STATUS.md CONTRADICTION. STATUS.md's false-saving flag concerns templates/product.bundle.json hardcoding; the upsell derives from bundle.compare_at_price. Different code paths, both true at once — I saw £72.97 on one page and £49.97 on the other. Both documents are right.

DETAIL THE FINDING MISSED THAT MAKES THE FIX CHEAPER: the snippet already has an unused render slot in exactly the right position — lines 40–42 output bundle.metafields.custom.bundle_contents.value between the title and the price, and it renders blank today. The one-sentence fix can therefore be content-only (set that metafield on the bundle product), with no Liquid edit — which matters given the unresolved asset drift.


**[V34] HELD** — CORE EVIDENCE IS REAL — I reproduced it independently, I did not take it on trust. Method: started tools/agent-browser/tunnel.py, wrote my own Playwright probe (scratchpad/probe.mjs) that asserts window.Shopify.theme.id before returning any data (L002 trap), and loaded https://thedognook.co.uk/products/calming-donut-bed-1 twice — once with theme cookie 193438056731, once with 193140818203.

On 193438056731 (theme reported: "The Dog Nook — Design install (CRO working copy)", role "unpublished") the returned outerHTML is character-for-character what the finding quotes: <div class="tdn-pdp__gallery"><div class="tdn-pdp__main" style="background: #8B9578;"><span class="tdn-pdp__ph">Product on clean background</span></div></div>. galleryChildren=1, galleryImgs=0, .tdn-pdp__thumb count=0. getBoundingClientRect().height on .tdn-pdp__main = 460 at 1440px and 300 at 375px, with top=190 in an 812-high mobile viewport — so it genuinely does own the first screen. getComputedStyle textTransform = "uppercase" and innerText renders "PRODUCT ON CLEAN BACKGROUND", so the title's capitalisation is real, not stylistic licence. Source corroborates: snippets/dog-nook-pdp-gallery.liquid:13 is the string, assets/dog-nook-cro.css:23,25,65 are the 460px/uppercase/300px rules. Admin API confirms featuredMedia is null on all 9 active products, so the else-branch is what every PDP hits. Even the incidental hCaptcha detail checks out — my first capture (waitUntil networkidle) showed allImgCount=0, but adding a 6s wait surfaced exactly one img, alt="Protected by hCaptcha", a data: SVG. That is a detail nobody reconstructs from source; the page was loaded.

THREE THINGS I CAN REFUTE.

1. "is being shown to shoppers" is FALSE in the present tense. I loaded the same URL against the published theme 193140818203 (role "main"): document.querySelector('.tdn-pdp__gallery') returns null — the element does not exist on the live theme at all. The string lives only on an unpublished draft nobody can reach. No shopper has seen it. It would only reach shoppers if the theme were published before photos land, and STATUS.md sequences publishing as blocked-item 6, explicitly after photography (item 1). So this is cheap pre-emptive insurance, not live exposure.

2. "an internal art-direction note … a brief written for a photographer" is NOT PROVEN — this is the finding's own inference dressed as observation, and the innocent explanation was not ruled out. sections/dog-nook-product.liquid:103 defines a merchant-facing schema setting {"id":"placeholder_tone","label":"Image placeholder colour","default":"#8B9578"}, and line 26 passes it into the snippet. That is a deliberately designed empty state for a pre-photography store, not a leaked internal note. "Product on clean background" is generic placeholder copy of the same class as "Product image"; an actual photographer's brief carries angle, lighting, props, scale anchor (see the real one in the recon report's shot-list). The actionable point — the string is weak and should hold trust — survives; the accusatory framing does not, and I would not ship the word "internal note".

3. "no thumbnails, no zoom" is misleading as a defect list. The template DOES build thumbnails (lines 20-38, limit 6) gated on product.media.size > 1; thumbs=0 is a consequence of zero media, not a missing feature. Zoom genuinely is absent — but run #1 already logged exactly that ("the PDP gallery hard-crops to a fixed 460px with no zoom or lightbox, caps at 6 thumbnails", recon report line 124), so the 460px/no-zoom half of this finding is a redo, against the standing instruction not to redo run #1. Only the placeholder STRING is new.

No contradiction with STATUS.md — line 31 already states zero products have images, which the Admin API confirms. No run-#1-class error against the owner: the finding correctly splits the missing photograph (owner, already the acknowledged launch gate) from the string (Claude), and does not impute fault beyond what STATUS.md concedes.

Net: the observation is sound and the proposed remedy is positioning-aligned (naming the stage the product serves is a direct answer to POSITIONING.md's test). The impact framing needs to change from "customers are seeing an internal note" to "the single largest element of the first screen is dead olive carrying none of the 3-3-3 position, on every PDP, and will stay that way until photos land". Effort "quick" and owner "claude" are right; do NOT touch dog-nook-cro.css while fixing it (asset drift unresolved) — the string change is in the snippet alone.


**[V35] HELD** — REPRODUCED, not refuted. I loaded the pages myself through tools/agent-browser (tunnel.py + Playwright, Shopify.theme.id asserted = 193438056731 on every load) at 375x812, isMobile, fresh profile.

What reproduced exactly:
- .tdn-emailpop became visible 12,589 ms (/products/calming-donut-bed-1) and 12,699 / 12,711 ms (/products/the-settle-in-bundle) after navigation. Reporter said 12,710 ms.
- Computed style position: fixed, z-index 90, getBoundingClientRect 0,0,375x812; backdrop rgba(46,42,34,0.5) filling the same 375x812. Still 0,0,375x812 after window.scrollTo(0,812).
- Rendered innerText verbatim: "x JOIN THE PACK Get 10% off your first order Calm-dog tips and early access to new bundles - plus a code for your first order. No spam, unsubscribe anytime. Get my 10% code No thanks".
- The cookie banner IS installed and IS already on screen at DOMContentLoaded ([data-tdn-cookie], hidden=false, position fixed, z-index 90, "We use cookies ... Decline / Accept all").
- The burial is real and I can state the mechanism: both overlays are z-index 90, so the tie is broken by DOM order, and the popup is appended to <body> by JS at trigger time, i.e. after the banner. document.elementFromPoint at the centre of "Accept all" returns tdn-emailpop__backdrop, and page.click('[data-tdn-cookie-action="all"]') times out. My screenshot at scroll 812 shows both buy buttons and the cookie banner dimmed under the scrim.

The reporter did load the page. Proof independent of my own run: the deployed submit button reads "Get my 10% code", but /home/user/sc/dog-nook-theme/snippets/dog-nook-email-popup.liquid line 21 says "Send my code". Anyone dressing up a file read would have written "Send my code". (That drift is itself worth logging - the deployed theme is ahead of git, consistent with the known asset-drift trap.)

Innocent explanations I checked and what happened to each:
1. "It only shows to bots / fresh automation profiles." Partly true, and it bounds the blast radius rather than the finding. The gate is localStorage['tdn_popup'] - once per browser, ever - and it is suppressed on /cart and /checkout (snippet lines 46-49). So this is the first-time-visitor experience, exactly the paid/search landing cohort, on every page except cart. Not a per-pageview nag. The finding should have said so; it does not change the verdict.
2. "The owner deliberately put marketing over consent." Ruled out. The banner is rendered from layout/theme.liquid (not in this repo) and the popup injects itself from dog-nook-head; the two were built independently and both authors picked z-index 90. The snippet's own header comment says "only after the visitor has engaged (delay + scroll)", i.e. the intent was politeness. This is an untested interaction between two overlays, not a decision. No owner fault to allege.
3. "Maybe the cookie banner isn't installed, so there is nothing to bury." Checked - it IS installed on 193438056731. This actually closes recon item 6 ("verify the cookie banner is actually in layout/theme.liquid"), which run #1 could only leave as owner-verifiable.
4. "Contradicts STATUS.md." No. STATUS.md is silent on the popup; the recon report touches the popup only at items 8 (privacy link) and 15 (the /contact reload), never this collision. Nothing to reconcile.

Two things in the finding are wrong and one is over-stated, hence the corrected text:
- WRONG FIX: "raise the delay or switch it to exit/scroll intent". Scroll intent already exists and is the dominant trigger - snippet line 92 fires at 45% scroll depth, and I measured the popup appearing ~305 ms after a scroll to 50%. On a mobile PDP a thumb reaches 45% in a few flicks, so most users get this well before 12.7s. Both suggested changes make it worse; 12.7s is the slow path, not the typical one.
- OVER-STATED: "covers the entire product". The card is 335x384 (about the middle 47% of the screen); the rest is a 50%-opacity blurred scrim. The product is dimmed and 100% un-tappable, not hidden. At scroll 0 on the donut-bed PDP the buy buttons sit at y 878-975, below the fold and not yet on screen; they are covered once the user scrolls (verified at scroll 812: Buy it now 68-114, Add to Cart 114-165, both behind the scrim).
- AGAINST THE POSITION: "suppress it entirely on the PDP" should not ship as written. Owned traffic 30% -> 65% is one of the two levers in STATUS.md's goal and POSITIONING.md calls the timeline email flow the strongest play. Killing capture on the highest-intent page to fix a stacking bug is the wrong trade; fix the stacking and the consent ordering instead.


**[V36] HELD** — I tried to break this and could not. I reproduced it independently rather than taking it on trust.

WHAT I DID (all observation, stated as required):
1. Loaded https://thedognook.co.uk/products/calming-donut-bed-1 in Chromium via tools/agent-browser (tunnel.py was already listening on 8899), asserting the theme. Served theme confirmed as 193438056731 "The Dog Nook — Design install (CRO working copy)" [unpublished] — so the L002 trap (preview cookie dropped, live theme silently served) did NOT occur. Status 200.
2. Ran a DOM probe (my own variant of browse.mjs, at /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/imgprobe.mjs). Result: document.querySelectorAll('img').length = 0; '.tdn-pdp__gallery img' = 0; picture/source = 0; zero elements with a computed background-image; zero [data-src]/[data-srcset] lazy placeholders; JSON-LD 'image' absent. Gallery outerHTML is literally <div class="tdn-pdp__main" style="background: #8B9578;"><span class="tdn-pdp__ph">Product on clean background</span></div>.
3. Confirmed the finding's specific page details rather than assuming: greps returned 1 hit each for "PAIRS WELL WITH" and "Complete the calm-down kit", and the rendered text under that heading is exactly "The First Days Kit" and "The Lick Mat". So the finding is describing this real page, not a remembered one.

INNOCENT EXPLANATIONS I RULED OUT (this is where run #1 failed, so I did it explicitly):
- "Wrong theme was loaded." Ruled out: Shopify.theme.id asserted at 193438056731 on every load; browse.mjs exits 2 on mismatch and returned 0.
- "Only this one product lacks photos." Ruled out: same probe on /collections/all (theme asserted) returns img count 0 across all 9 listed products.
- "Images are lazy-loaded / injected by JS / are CSS backgrounds, so a DOM count undercounts them." Ruled out: page loaded to networkidle; backgroundImage url() count 0, lazy-attribute count 0, picture/source 0.
- "The photos exist in Shopify and the THEME is failing to render them" — the important one, because if true the blocker would be a code fix by Claude, not a photoshoot, and the finding never addressed it. Ruled out three ways: (a) Admin API search_products, status:active, 9 products — featuredMedia is null on every one (Lick Mat, Snuffle Mat, Donut Bed, Grooming Glove, Nail Grinder, Slow-Feeder, Car Boot Liner, First Days Kit, Settle-In Bundle); (b) two independent Liquid paths key off product.featured_media — snippets/dog-nook-pdp-gallery.liquid:9 and snippets/dog-nook-jsonld.liquid:32 — and both took their empty branch, which only happens if the product object genuinely has no media; (c) snippets/dog-nook-product-card.liquid:25 does the same on the collection page. The theme is not at fault; the catalogue is empty of media.
- "There are images on the store, they're just not attached." Partially true and worth knowing: the only Shopify CDN asset referenced anywhere in the HTML is files/dn-main.png, 17,847 bytes, image/png (checked via HEAD through the proxy) — a social/OG-card asset, not a product photograph, rendering as no <img> on the page.

CONTRADICTS STATUS.md? No. STATUS.md agrees ("Zero of the real products have images"; "PRODUCT PHOTOS — the launch gate"). Nothing to reconcile.

ONE INACCURACY, non-material: the evidence line says "the only <img> on the page is the hCaptcha badge". I measured zero <img> elements at networkidle on desktop 1440x1000. Either the earlier run used a different page/viewport or a third-party badge loaded after its measurement. This makes the page marginally worse than described, not better, and does not touch the claim.

ONE OVERSTATEMENT worth trimming, and the only reason the wording needs correcting at all: blockerWhy says "Claude cannot produce an image of a real object it has never seen." True but not the whole reason. These are CJ dropship goods, so supplier stock imagery almost certainly exists and could technically be attached today. The real reason this stays with the owner is a POSITIONING decision, not a physical impossibility: the recon report's own shot list calls for scale shots, in-use shots with ordinary scruffy dogs in ordinary UK homes and photographed branded packaging, precisely because generic supplier images produce the dropship read the brand is positioned against. State it as a decision already effectively taken, so a later session does not "solve" this by pasting CJ catalogue images in.

Against the POSITIONING.md test — does this help someone work out which stage their dog is at and get the right thing? Only indirectly, and the finding is honest that it is not new. Its value is that it upgrades a long-standing assumption to an observed fact and gives the owner a shot-count they can act on.


**[V37] KILLED** — Partial refutation. The evidence is genuine — I independently reproduced it on theme 193438056731 (asserted via Shopify.theme.id, role unpublished) at 375px and my landmark deltas match theirs to the pixel (About→PAIRS 569, PAIRS→GOOD TO KNOW 872, GOOD TO KNOW→REVIEWS 296, upsell 1004, eyebrow 514, H1 546); their whole page ran a constant 79px shorter below the badge row, ordinary render variance. The page was really loaded. But the finding as written is not accurate enough to act on. (1) The headline 48% is inflated: #tdn-reviews measures top 3246, height 2808px in a 6361px document = ~44%. Their 3043px came from "footer ~6210", a number that reconciles with nothing — my footer top is 6098 and is 263px tall, not the ~72px their arithmetic implies. (2) They missed the cheap fix and misdiagnosed the cause: dog-nook-product.liquid:42-43 ALREADY renders a blurb from custom.short_description above the form and above the upsell; it rendered empty because the metafield is unset on this product. (3) An innocent explanation was not ruled out — the upsell placement is deliberate and self-documented in source ("AOV lever — routes single-product buyers to the bundle"; "Cross-sell first — highest-AOV placement"), it sits inside the buy box right after add-to-cart, and a long description below the buy box is standard PDP convention; moving it up pushes the buy button down. "Wrong order" is an opinion presented as a defect. (4) "Eat" implies displacement that does not occur — reviews are the last block before the footer, so their length pushes nothing down; the cost is scroll depth, not crowding-out. (5) The proposed fix references a "stage label" that does not exist: grep for stage/3-3-3/decompress across sections/, snippets/, templates/ returns zero hits; the eyebrow is the collection name. (6) The ratio is provisional — featuredMedia is null on all 9 products, so the gallery is a ~342px placeholder and real photos will lower the reviews share. No contradiction with STATUS.md; the finding correctly protects the genuine reviews and does not repeat run #1's error. Incidentally the STATUS.md "verified reviews" follow-up is already done on this theme — it renders "Based on 10 customer reviews".


**[V38] HELD** — The evidence is real and I reproduced it independently — I did not take it on trust. I started the tunnel (already running on 8899) and ran `node tools/agent-browser/browse.mjs https://thedognook.co.uk/products/calming-donut-bed-1 --theme 193438056731`, which asserted `Shopify.theme.id = 193438056731` ("The Dog Nook — Design install (CRO working copy)") so the L002 wrong-theme trap is ruled out. Result: `grep /verified/ → 0 hits`, `grep /customer review/ → 1 hit: "Based on 10 customer reviews"`. Both halves of the claim are observed, not inferred. This is NOT dressed-up inference — and notably, source-reading would have given the OPPOSITE answer: git `snippets/dog-nook-pdp-extra.liquid:62` still says `Based on {{ rcount }} verified review`, and no commit changes it. The deployed draft has drifted from git. Anyone who "verified" this from the repo would have reported the bug as live. I also ran the provenance half: on that PDP, `collected` → 0 hits, `by hand` → 0 hits, and the single `in person` hit is inside a customer's review body ("look much nicer in person"), not a provenance statement. So the PDP genuinely shows "4.8 · 10 reviews" and "Based on 10 customer reviews" with no statement of where they came from. That part stands. Three material corrections, none fatal. (1) NOT NEW. `audit/lessons/L003-verify-before-you-fix.md`, filed 2026-08-12 by `claude/dog-nook-theme-review-pbwho6`, already recorded exactly this — same URL, same rendered string "Based on 10 customer reviews" — and already marked TODO 2 KILLED. STATUS.md (last updated 2026-08-05) is simply stale, not in dispute with anything. The finding cites STATUS.md as if the question were open; the current source of truth on this point is L003. (2) THE PROVENANCE SENTENCE ALREADY EXISTS, IN THE OWNER'S OWN WORDS. I loaded the homepage on the same asserted theme: it renders "Collected from real owners in person and online. We never write our own." (from `templates/index.json` `reviews.subtitle`). So the store does say where the reviews came from — just not on the PDP. The finding's framing ("Claude writes it", positioning supplies the answer) treats this as unwritten copy; it is actually existing owner-authored copy that needs repeating next to the PDP rating. That makes the job smaller, safer and lower-risk than described. (3) THE PROPOSED WORDING IS NOT CLAUDE'S TO WRITE, AND CONTRADICTS THE OWNER. The finding's draft — "collected in person from customers who bought from us before the shop went online — not Shopify-verified purchases" — says *in person only*, while the owner's own homepage line says "in person **and online**". Claude narrowing the owner's provenance claim is exactly the wrong direction under DMCC 2024, where the burden is on the trader to evidence the specific claim made, and STATUS.md follow-up 2 (the private who/when/where record) is still NOT done. Writing a more specific public claim before the evidence record exists inverts the order. So `owner: claude` / `blocker: none` is wrong: the wording needs one owner confirmation first. On the run-#1 error class: this finding does NOT repeat it — it explicitly treats the reviews as genuine and proposes no deletion. The innocent explanation it missed is not about the owner's conduct but about the store's own copy: it assumed the provenance was absent store-wide when it is present on the homepage. ONE ADJACENT ITEM IT MISSED, larger than the finding itself: the homepage on this same draft theme renders "4.8" and "from 80 real owner reviews" (grep confirmed) — a store-wide aggregate rating. The recon report's quick-win #4 called those keys a dormant landmine that does not render, on the grounds that `agg_rating`/`agg_count` are absent from `sections/dog-nook-reviews-placeholder.liquid`'s schema in git. They render on the deployed theme. That conclusion is wrong and is a bigger DMCC-adjacent item near reviews than the missing PDP sentence. Scope honesty: I confirmed the rendered wording on one PDP (`calming-donut-bed-1`). Two other handles I tried 404'd (the L003 handle trap again — titles are not handles). The review block is a single shared snippet rendered from `sections/dog-nook-product.liquid:74`, so it generalises across PDPs by source-reading, not by observation, and I flag it as such.


**[V39] HELD** — Reproduced independently on the asserted draft theme, so this is real evidence, not dressed-up inference. Loaded https://thedognook.co.uk/products/calming-donut-bed-1 via tools/agent-browser with the preview cookie primed and asserted window.Shopify.theme = 193438056731 (The Dog Nook - Design install (CRO working copy)) [unpublished] on every snapshot. Scripted clicks on all three swatches: location.href stayed https://thedognook.co.uk/products/calming-donut-bed-1 with no query string in all three states, while input[name="id"] moved 52629887189275 -> 52629887222043 -> 52629887254811 and both [data-tdn-price] nodes moved GBP29.99 -> GBP37.99 -> GBP44.99. The variant ids and prices quoted in the finding match the deployed markup exactly.

The L002 trap was considered and ruled out: the bare thedognook.co.uk URL with no query string is the EXPECTED end state, because ?preview_theme_id= is consumed into a cookie and redirected away - it is not evidence the finder was on the live theme. Theme id was asserted, not assumed.

Consequences tested rather than assumed. Navigating to / and back returned selected=Small, input=52629887189275, price=GBP29.99; a reload did the same. So the revert is genuine. Additionally, ?variant=52629887254811 loads with Large selected, correct hidden input and GBP44.99 in both the main and sticky price - the server-side Liquid already honours the parameter, so the proposed fix (push the param on selection) is genuinely sufficient with no on-load parsing needed.

Three corrections. (1) The blocker is wrong. blocker:"none" is not right: I fetched the deployed asset cdn/shop/t/12/assets/dog-nook.js (4,486 bytes minified vs 6,378 bytes unminified in git - drift confirmed, git is NOT the deployed source) and it contains initSwatches binding [data-tdn-swatches] and zero pushState/replaceState occurrences. The binder IS assets/dog-nook.js, the file the standing rules forbid touching. The asset-drift decision blocks this fix; it does not merely accompany it. (2) "silently" is overstated - the visible price and the selected pill both revert, in the main block and the sticky bar, so a shopper has a visible cue. (3) history.length stayed at 3 across all three clicks, so no history entries are created; "back-button" means returning to the PDP from elsewhere, not stepping back through sizes.

No owner-blame inference is involved, so the run #1 error class does not apply: this is a bespoke tdn- size control sitting alongside Horizon's own variant-picker.js, and the omission is a build gap in a custom component, not something the owner did wrong. No contradiction with STATUS.md, which does not cover this. Not a duplicate of recon report item 11 (three identical grey squares) - that appears already fixed; the deployed markup renders labelled tdn-sizebtn pills.


**[V40] KILLED** — The measurement is real and reproducible — I loaded the page, did not infer it. But three load-bearing claims around it are wrong, and one points the fix at the wrong thing.

WHAT I DID: started tools/agent-browser/tunnel.py, drove Playwright at 375x812 (isMobile, hasTouch, iOS UA) to https://thedognook.co.uk/products/calming-donut-bed-1, asserting window.Shopify.theme.id === 193438056731 (served "The Dog Nook — Design install (CRO working copy)", role unpublished). Ran getBoundingClientRect over every button/a/select/input/label/summary, plus a CSSOM walk of every rule matching /tdn-size/.

CONFIRMED: pills are 73x39 / 90x39 / 75x39 (finding said 72/90/73 — font-rendering noise). Deployed markup is exactly as quoted: <div class="tdn-sizes" data-tdn-swatches role="radiogroup" aria-label="Size"> with three <button class="tdn-sizebtn" role="radio" aria-checked> carrying real text labels and per-variant prices. Computed style: padding 10px 16px, font-size 14px, min-height auto, 1px border = 39px. The recon run's "three identical grey squares" defect IS fixed on the deployed draft — that credit is correct and should not be re-raised. Its other four numbers check out exactly: Buy it now 46, Add to Cart 51, quantity 52, FAQ rows 58.

WRONG #1 — the standard. WCAG 2.5.8 Target Size (Minimum), Level AA, is 24x24 CSS px, not 44. 39x73 passes it comfortably. The 44x44 floor is WCAG 2.5.5 Target Size (Enhanced), Level AAA, plus Apple HIG 44pt and Material 48dp. There is no WCAG AA failure here; the headline citation is misattributed.

WRONG #2 — "Everything else on the page clears the bar." It does not. Same sweep: cookie-banner Decline 87x38 and Accept all 101x38 (real buttons, the first thing a new visitor touches); footer accordion summaries 375x39.2; footer nav links 17px; breadcrumbs 15px; stars link 20px. So "not a systemic problem" is contradicted by the finding's own evidence-gathering.

WRONG #3 — the one that matters. The `.tdn-sizes` collision is NOT a cosmetic rename to bundle in. dog-nook-cro2.css defines `.tdn-sizes { width:100%; border-collapse:collapse; font-size:13.5px; min-width:420px; }` for the size-guide TABLE (snippets/dog-nook-specs.liquid:55). That rule is landing on the variant radiogroup, and min-width:420px blows the PDP out to 420px inside a 375px viewport. I proved causation, not correlation: on load window.innerWidth and documentElement.scrollWidth both report 420; injecting `.tdn-sizes{min-width:0!important;width:auto!important}` snaps both back to 375. The homepage on the same theme measures 375, so it is PDP-specific. On a real phone the whole product page scales down ~11% to fit, making the pill's physical target ~34.8px — worse than reported. The rename is the fix for a horizontal-overflow bug; the padding is the footnote. The finding has the priority inverted. Corollary: its own numbers were measured inside the blown-out 420px layout, so "at 375px" is mislabelled.

INNOCENT EXPLANATIONS RULED OUT (and one not): (a) 39px is not sloppiness — it is a deliberate compact pill row and legal under WCAG AA, so this is not an owner error; I am not repeating run #1's move of reading a design choice as a defect. (b) The collision is two independently-authored stylesheets clashing on a generic name, not carelessness; STATUS.md already flags unresolved asset drift. dog-nook-cro2.css is NOT on the do-not-touch list (only dog-nook.js and dog-nook-cro.css are), so the fix is available. (c) I could NOT rule out that 39px is intentional to keep three pills on one row — but at 375px they occupy only ~254px of 375, so heightening them costs no layout.

CONTRADICTS STATUS.md: no. Neither the tap target nor the collision is logged in STATUS.md or PROBLEMS-1.md. But it exposes a trap: the size-pill markup exists ONLY on the deployed draft. Repo snippets/dog-nook-pdp-form.liquid (last touched e915b20) still renders the old `.tdn-swatches`/`.tdn-swatch` colour circles with no text. Anyone fixing against the repo file edits markup the draft does not use, and a git deploy would REVERT the size-pill fix the finding just credited.

POSITIONING: "the single most consequential control on the page" is asserted, not evidenced. Against POSITIONING.md the test is whether an element helps someone place their dog on the 3-3-3 timeline — a size pill answers fit, not stage. It earns weight from a direction the finding missed: custom.size_guide is null, so the "Which size?" block renders nothing (I found no table.tdn-sizes on the page at all — only the radiogroup carries that class). The pills are the ONLY size information on the PDP.


**[V41] HELD** — The core defect is REAL and I reproduced it, but the finding is wrong on one load-bearing word ("live") and mischaracterises the legal exposure. Not refuted; corrected.

WHAT I DID (all first-hand, via tools/agent-browser with --theme assertion, which primes the preview cookie on the primary origin and refuses data on theme mismatch):
1. LOADED https://thedognook.co.uk/products/the-settle-in-bundle with theme asserted 193438056731 (printed: "193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]"). Dumped full rendered innerText. The panel renders exactly as the finding quotes: "WHAT'S INSIDE / Lick Mat / Spread, freeze, soothe / £11.99 / Snuffle Mat / Nose-led foraging / £22.99 / Slow-Feeder Bowl / Calmer mealtimes / £14.99 / Bought separately / £49.97 / £64.99 / You save £7.98", plus a "BEST VALUE · SAVE £15" badge. "Donut" appears 0 times in visible text. Quoted strings match byte-for-byte — this was genuinely loaded, not inferred.
2. FETCHED https://thedognook.co.uk/products/the-settle-in-bundle.js — price 6499, compare_at_price 7297. FETCHED /collections/all/products.json — Donut Bed 29.99/37.99/44.99, Lick Mat 11.99, Snuffle Mat 22.99, Slow-Feeder 14.99, First Days Kit handle the-new-rescue-bundle-1 £34.99. 11.99+22.99+37.99 = 72.97 exactly. Arithmetic confirmed.
3. READ /home/user/sc/dog-nook-theme/templates/product.bundle.json — blocks i1/i2/i3 hardcode Lick Mat/Snuffle Mat/Slow-Feeder Bowl, separately_total "£49.97", badge "BEST VALUE · SAVE £15". Confirmed.
4. DUMPED raw outerHTML on the draft theme: the meta description and JSON-LD both carry "What's inside (worth £72.97 bought separately): The Calming Donut Bed (Medium)…". Sub-claim (a) VERIFIED — it is genuinely new vs run #1.
5. LOADED /products/the-new-rescue-bundle-1 on 193438056731 — same panel, and there £49.97 is true (11.99+22.99+14.99) against £34.99. Sub-claim (b) VERIFIED.

CORRECTION 1 — "live" is FALSE, and this is the finding's main error. I LOADED the same URL with theme asserted 193140818203 (printed: "[main]", i.e. published). It renders CORRECTLY: "Sale price £64.99 / Regular price £72.97", then the real description naming "The Calming Donut Bed (Medium)", "The Lick Mat", "The Snuffle Mat", "worth £72.97 bought separately", "Bundled together for £64.99 — you save £7.98". No Slow-Feeder Bowl, no £49.97, no SAVE £15 badge. The defect exists ONLY on the unpublished draft. It is a pre-publish blocker, not a consumer-law breach facing shoppers today. This also resolves the STATUS.md question: STATUS.md §"STILL OPEN — LIVE COMPLIANCE RISK" ("The live Settle-In £64.99 page claims contents cost £49.97") is WRONG, contradicts its own KNOWN TRAPS line ("Live = theme 193140818203… all new work is on UNPUBLISHED draft"), and inherited the error from recon report line 10. The rendered pages are right; both documents need amending.

CORRECTION 2 — the legal characterisation is off. An UNDERSTATED reference price is not the misleading-price offence; it makes the offer look worse, not better. The actually false claims are (i) the badge "SAVE £15" against a true £7.98 and (ii) the misdescription of contents. And the finding missed that the page simultaneously renders a TRUTHFUL "You save £7.98" chip — /home/user/sc/dog-nook-theme/sections/dog-nook-bundle.liquid:49-52 computes it from product.compare_at_price minus product.price and only falls back to the hardcoded save_label when there is no compare-at. So three mutually contradictory numbers render together (£49.97 bought-separately, £64.99 price, save £7.98, badge SAVE £15).

CORRECTION 3 — the misdescription is wider than the item list. The eyebrow, heading and intro on the Settle-In draft page are also First Days Kit's ("THE RESCUE BUNDLE", "Three gentle essentials for a nervous dog settling in"), and the true description is not rendered anywhere in the draft bundle template — it survives only in <meta> and JSON-LD.

CORRECTION 4 — "First Days Kit… happens to be correct" is not fully correct: its items and £49.97 are true, but the hardcoded badge still reads "SAVE £15" against a true £14.98 (2p overstated), which STATUS.md already queues.

INNOCENT EXPLANATIONS RULED OUT (the run-#1 failure mode):
· "The template is right and the description is stale — the bundle really does contain a Slow-Feeder Bowl." Ruled out: the owner-set compare_at_price on the product record is 7297, which equals the Donut-Bed composition to the penny and cannot be reached with the bowl (that gives 49.97). The description, the compare-at, the published theme's rendering and the 3-3-3 stage logic (a bed is the weeks-1-3 item, per POSITIONING.md) all agree; only one theme setting dissents.
· "This is the owner's error." Ruled out — and no owner fault should be asserted here. Everything the owner authored (product record, price, compare-at, description) is correct, and the published storefront is correct. The wrong panel is an agent-built draft-theme artefact: the section was hardcoded when only First Days Kit used it, and Settle-In was later routed to the shared template.
· "Wrong theme was read." Ruled out by asserting window.Shopify.theme.id on every load, in both directions.

CITATION DEFECT (not fabrication): the finding cites https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle?preview_theme_id=193438056731. I confirmed by curl that this 301s to thedognook.co.uk with x-redirect-reason: primary_domain_redirection, dropping the query string — the exact audit/lessons/L002 trap. As written that URL serves the LIVE theme, which renders the correct page. The finding's content is nonetheless right, so it must have primed the cookie separately and reported the URL it typed rather than the one it landed on. Anyone re-verifying should use the primary domain with the cookie primed.

NOVELTY: the core defect is NOT new — recon report line 10 and STATUS.md lines 75-86 already report it, and the proposed "blank separately_total and badge" safety valve is recon report line 95 verbatim. Only sub-claim (a) (meta/JSON-LD carry the truth while the human is shown the wrong contents) is new. Judged against POSITIONING.md this still matters: the Settle-In page is the weeks-1-3 door, and it currently shows a day-one feeding item instead of the bed that IS the settle stage — so the panel actively defeats stage-matching, not just the maths.


**[V42] HELD** — Independently reproduced, not dressed-up inference. I started tools/agent-browser/tunnel.py and loaded both pages with --theme 193438056731 asserted (exit 0; banner confirmed the unpublished draft, so not the L002 wrong-theme trap). Rendered body text on BOTH /products/the-settle-in-bundle and /products/the-new-rescue-bundle-1 is verbatim identical: eyebrow "THE RESCUE BUNDLE", H1 "Three gentle essentials for a nervous dog settling in", badge "BEST VALUE · SAVE £15", same intro, same three items, same "Bought separately £49.97". Neither product name appears in body text; only in <title> and, per snippets/dog-nook-jsonld.liquid:30 ("name": product.title), in JSON-LD. Cause confirmed: sections/dog-nook-bundle.liquid:24 is {{ s.heading | default: product.title }} and templates/product.bundle.json sets heading, so the fallback never fires. Percentages verified (14.98/49.97 = 30.0%; 7.98/72.97 = 10.9%).

Innocent explanations ruled out: (a) fabricated page-load - refuted, I loaded them myself; (b) per-product theme-editor overrides absent from git - refuted, the rendered draft theme shows both identical; (c) "THE RESCUE BUNDLE" as a deliberate range/family eyebrow rather than a third name - this is the strongest charitable reading and the finding never addresses it, but First Days' handle is the-new-rescue-bundle-1, i.e. "The New Rescue Bundle" was its pre-3-3-3 name, so the eyebrow is rename drift, and POSITIONING.md names no such family.

Three faults, none fatal: (1) "the same page with a different price" is overstated - the save chip also differs and is TRUTHFUL (£7.98 vs £14.98), because liquid:49 prefers real compare_at_price over the hardcoded save_label; (2) the finding presents its "Cause" as new when STATUS.md's STILL OPEN section already queues the shared template, the £49.97-vs-£72.97 error and SAVE £15 vs £7.98 as TODO 1, with the same badge figure at PROBLEMS-1.md:158 and START-HERE-NEXT-BUILDER.md:79 - only the NAME/identity consequence is genuinely unlogged; (3) it understates the worse co-located defect, that Settle-In's contents are misdescribed (Slow-Feeder Bowl; actually Donut Bed + Lick Mat + Snuffle Mat) - misdescription of goods, not just naming. No contradiction with STATUS.md; this extends a known root cause rather than disputing it.


**[V43] HELD** — SUBSTANCE CONFIRMED, but the finding's own evidence citation is wrong, one rendered claim is false, and it is not new.

WHAT I DID (not the original author's work — my own): started tools/agent-browser/tunnel.py, then loaded https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle and /products/the-new-rescue-bundle-1 with --theme 193438056731 asserted. browse.mjs reported `theme : 193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]`, so the L002 wrong-theme trap is excluded. I then read innerText and getBoundingClientRect from the live DOM and screenshotted at 1440x1000 and 375x812.

CONFIRMED (draft theme 193438056731, Settle-In, viewport 1440x1000, innerHeight 1000):
  .tdn-bundlep__badge  = "BEST VALUE · SAVE £15"        top 182  bottom 214
  .tdn-bundlep__sep    = "Bought separately | £49.97"   top 660  bottom 695
  .tdn-bundlep__prices = "£64.99 | You save £7.98"      top 736  bottom 787
All three are inside the first 1000px, so the "one desktop viewport" claim is true. Panel rows render "Lick Mat £11.99 / Snuffle Mat £22.99 / Slow-Feeder Bowl £14.99", which sum to exactly £49.97 — so the page does state, internally consistently, that the parts cost £49.97 and then charges £64.99, i.e. £15.02 more. The cause read from source is also correct: dog-nook-theme/templates/product.bundle.json hardcodes separately_total "£49.97", badge "BEST VALUE · SAVE £15" and save_label "You save £15" as static settings, while dog-nook-theme/sections/dog-nook-bundle.liquid line 49-50 computes the chip from product.compare_at_price minus product.price. The chip is the honest number: Calming Donut Bed Medium £37.99 + Snuffle Mat £22.99 + Lick Mat £11.99 = £72.97 (Admin API prices), £72.97 − £64.99 = £7.98.

FOUR CORRECTIONS:

1. THE CITED EVIDENCE FILE IS THE WRONG PAGE. I opened /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/settle-desktop.png. It is NOT the Settle-In PDP — it is the /collections/settling-a-new-rescue COLLECTION page (hero "Settling a New Rescue", four product cards). It contains none of the three elements described. What it does show is the Settle-In card rendering "£64.99  £72.97  Save £7.98" — internally consistent and correct. The PDP screenshot that actually supports the finding is settle.png (and fdk.png) in the same directory. So the finding attached a screenshot that shows a different page and asserted it as verification. The claim survives only because I re-verified it myself; as filed, the evidence line was not checkable.

2. THE MOBILE CLAIM IS FALSE. At 375x812 the badge sits at top 168–200 and the "Bought separately £49.97" row at top 1020–1056 — 820px apart against an 812px viewport. The badge and the price block cannot be on screen together on mobile. Only the sep (1020) and the price/chip (1097) share a screen. "within one screen on mobile" is refuted.

3. IT IS DRAFT-ONLY, NOT A LIVE BREACH. I loaded the same product with --theme 193140818203 (the published theme, reported `[main]`). It renders "What's inside (worth £72.97 bought separately):" and "Bundled together for £64.99 — you save £7.98." — correct, consistent, no £15 badge, no £49.97. So no customer is currently seeing this. It is a regression introduced by the new custom theme's shared bundle template and is a publish blocker, not a live compliance breach. STATUS.md's heading "STILL OPEN — LIVE COMPLIANCE RISK ... The live Settle-In £64.99 page claims contents cost £49.97" is misleading on this point (charitably, "live" there means the live/active PRODUCT, since STATUS lists Settle-In as one of the "2 live bundles" — not the live theme). Worth fixing in STATUS.md either way.

4. IT IS NOT NEW. STATUS.md already records the identical numbers ("claims contents cost £49.97 (truth: £72.97) and badges 'SAVE £15' (truth: £7.98) — i.e. it reads as costing more than its parts") and queues it as TODO 1 in START-HERE-NEXT-BUILDER.md, along with the First Days Kit £15-vs-£14.98 rounding. The finding does not contradict STATUS.md; it duplicates it while presenting it as a discovery. It adds one genuinely new detail — that all three numbers are co-visible on one desktop screen — and that detail is correct.

TWO SMALLER OVERSTATEMENTS: (a) "the universal was/now pattern, so it literally reads 'was £49.97, now £64.99'" is inflated — the strikethrough is labelled "Bought separately", is the bottom row of a bordered panel, and is 41px above the price with a panel edge between. The real defect is stronger and simpler than the was/now misreading: the page explicitly prices the parts below the bundle. (b) "Three contradictory savings numbers" is loose — there are two savings claims (£15, £7.98) plus one components total that implies a third, negative saving.

ONE THING THE FINDING UNDER-REPORTS, and it is the worse half: the panel lists the wrong PRODUCTS, not just a stale total. The Settle-In Bundle's own description is "a deep bed to burrow into, plus two gentle, nose-led ways to unwind" (bed + Snuffle + Lick), but the panel shows Slow-Feeder Bowl and no bed. That is a misdescription of what the buyer receives — a bigger DMCC 2024 problem than the arithmetic, and it directly defeats the 3-3-3 position, because the "What's inside" panel is precisely where a weeks-1-3 buyer should see the stage-appropriate kit they are getting.

OWNER-BLAME CHECK (the run-#1 class of error): the finding correctly attributes the cause to a shared hardcoded theme template, not to the owner, so it does not repeat that mistake. I additionally ruled out (i) wrong theme — asserted Shopify.theme.id on every load; (ii) "the £49.97 is actually right and the £72.97 is wrong" — Admin API component prices sum to £72.97, and £49.97 is exactly First Days Kit's three items; (iii) "the owner deliberately priced the bundle above its parts" — the published theme states the correct £72.97/£7.98, so the intended maths is honest and the draft is a regression; (iv) FDK is not a second instance of the same bug — there the panel £49.97 and the chip £14.98 are mutually consistent with the £34.99 price, and only the rounded badge is off by 2p.


**[V44] HELD** — The core claim survives a hostile check, but two sub-claims do not and one of them is a factual error.

HOW I CHECKED. First trap: fetching https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle?preview_theme_id=193438056731 does NOT show the draft. It 301s to thedognook.co.uk and the preview is dropped; the raw HTML then carries Shopify.theme = {"name":"Dog Nook PDP — working (Claude)","id":193140818203,"role":"main"} — the LIVE theme, Horizon 4.1.1. I re-fetched with a cookie jar (hit the .myshopify.com root with preview_theme_id first, then the product URLs) and got "The Dog Nook — Design install (CRO working copy)","id":193438056731. All results below are from that draft. Files read in full: /home/user/sc/dog-nook-theme/sections/dog-nook-bundle.liquid (all 128 lines), /home/user/sc/dog-nook-theme/templates/product.bundle.json, /home/user/sc/dog-nook-theme/snippets/dog-nook-pdp-extra.liquid, /home/user/sc/dog-nook-theme/snippets/dog-nook-specs.liquid.

WAS THE PAGE ACTUALLY LOADED? Yes — this is not dressed-up inference. The finding's rendered-body list matches the draft byte-for-byte in the details only the draft has: badge "BEST VALUE · SAVE £15", placeholder "Flat-lay of all three", eyebrow "The Rescue Bundle", the three trust lines. The live theme renders none of those (it renders the real description and a £72.97 compare-at). The reviewer got past the redirect trap.

CONFIRMED. On /products/the-settle-in-bundle (draft): tdn-pdp__desc 0, tdn-accordion 0, tdn-pdp-alt 0, tdn-reviews 0. On /products/calming-donut-bed-1 (draft): tdn-pdp__desc 1, tdn-accordion 12, tdn-pdp-alt 1, tdn-reviews 4, rendering 3 FAQ accordions, "Pairs well with / Complete the calm-down kit" and "4.8 · 10 reviews — Based on 10 customer reviews" plus 6+ written reviews. templates/product.bundle.json is "order": ["main"]. dog-nook-bundle.liquid outputs only section settings and blocks — its only render call is dog-nook-trust-panel. dog-nook-pdp-extra.liquid has exactly one caller, sections/dog-nook-product.liquid:74. The description is real and is served to crawlers only: "deep bed to burrow into" appears 4x in the bundle page's HTML (JSON-LD + meta) and 0x in the extracted visible body. The reviews-wording follow-up is indeed done. I also generalised it: /products/the-new-rescue-bundle-1 (First Days Kit, £34.99) is identical — tdn-bundlep 30, everything else 0. So both bundle pages, and the store's two highest-priced pages, are the thin ones.

ERROR 1 — "no specs ... all of it renders on ordinary product pages" is FALSE. tdn-specs is 0 on the ordinary PDP as well. The "The details" bullet list the reviewer read as specs is inside tdn-pdp__desc — it is part of the product description HTML, not snippets/dog-nook-specs.liquid. That snippet is called at sections/dog-nook-product.liquid:67 and emits nothing on the live draft (its size/care metafields are presumably empty). Specs are therefore not a bundle-vs-PDP gap; they are a separate, previously unraised dead-snippet issue. Under this project's evidence standard that matters: the finding implies it saw specs render, and they don't.

ERROR 2 — the STATUS.md contradiction is asserted beyond the evidence. "The bundle FAQs render nowhere" is proven. "STATUS.md's FAQs-set-on-all-bundles is true as data" is NOT — I could not read metafields (the admin GraphQL call required approval I don't have). The repo record is partial: audit/implementation-notes/live-catalog-changes.md:28 logs custom.faq set on the 3 flagship DRAFT bundles only, and audit/proposed-copy/product-faqs-metafield.md:99 drafts FAQ for The New Rescue Bundle. Neither names the Settle-In Bundle. So the data half is unverified, not confirmed. Downgrade to "not proven" per the default rule. This does not weaken the finding — the render path does not exist either way — but the title's "all of it exists" is one claim too strong.

NO OWNER FAULT IS IMPLIED, correctly — owner is "claude", this is a theme-build gap. The one innocent explanation worth ruling out is deliberate design: a bundle landing page kept to a single decision panel on purpose. It doesn't hold, because the withheld copy is exactly the copy that tells a buyer which of the 3-3-3 stages this bundle is for, and it is being served to Googlebot while withheld from the buyer.

INCIDENTAL, and it reinforces the point: STATUS.md's open compliance risk is still live on the draft. The What's-Inside panel lists Lick Mat / Snuffle Mat / Slow-Feeder (First Days Kit contents) against a £64.99 price, "Bought separately £49.97", and a badge reading "SAVE £15" directly above a computed chip reading "You save £7.98". The product record has the correct contents and the correct £72.97 / £7.98. Same root cause: the section reads hardcoded settings instead of the product.


**[V45] HELD** — The core behavioural claim is real and I reproduced it independently — but one of its three stated consequences is a mis-attribution, and its scope is understated.

HOW I CHECKED (all first-hand, nothing inferred from the original report):
1. tools/agent-browser/tunnel.py was already running; drove Playwright through it and asserted the theme on every load. https://thedognook.co.uk/products/the-settle-in-bundle with the preview cookie primed returned Shopify.theme = {id:193438056731, name:"The Dog Nook — Design install (CRO working copy)", role:"unpublished", schema_name:"Horizon 4.1.1"}.
2. On that asserted draft page: [data-tdn-atc] present; its enclosing form is <form method="post" action="/cart/add" enctype="multipart/form-data"> with a bare <button type="submit">; product-form-component occurs 0 times on the page (Horizon's ajax form wrapper is absent).
3. Clicked [data-tdn-atc] in the real browser → full page navigation off the PDP; zero [open] dialogs afterwards. (My headless run then hit a Cloudflare "Just a moment…" interstitial at /cart/add — an artifact of this environment, not the site.)
4. Removed that artifact with curl: POST /cart/add (form_type=product, id=52631608492315) with the draft cookie jar → final_url=https://thedognook.co.uk/cart, http=200, and /cart.js = [('The Settle-In Bundle', 1)] 6499. That is the original evidence string, byte for byte.

THE ONE PROCESS FAULT, AND WHY IT ISN'T FATAL: the finding's evidence never states Shopify.theme.id, and its URLs carry no preview param — exactly the L002 trap STATUS.md warns about, which would normally mean the work was done against live theme 193140818203. I tested that escape hatch rather than assuming: curl to the same URL with a clean cookie jar serves id:193140818203 ("Dog Nook PDP — working (Claude)", role:main) and contains 0 occurrences of data-tdn-atc and 0 tdn- strings; the draft contains them. So clicking [data-tdn-atc] is itself a theme fingerprint — the observation could only have come from the draft. The claim survives, but the agent got there by luck, not by asserting the theme.

INNOCENT EXPLANATIONS I RULED OUT (rather than assumed away):
- Asset drift. STATUS.md says three conflicting dog-nook.js versions exist and git matches none, so reasoning from the repo copy would have been unsafe — the finding's "nothing in the bundle section intercepts it" is source-level and does not by itself hold. I fetched the deployed file the draft actually serves (/cdn/shop/t/12/assets/dog-nook.js?v=6769793461…, confirmed t/12 is the draft): it contains no addEventListener('submit'), no preventDefault, no /cart/add.js. It also DIFFERS from the git copy — so the empirical check was necessary, and it lands the same way.
- Headless JS not running. Ruled out: 58 tdn- elements rendered and custom elements had hydrated (CART-DRAWER-COMPONENT, SHOP-CART-SYNC, QUICK-ADD-DIALOG, THEME-DRAWER). JS ran; the navigation still happened.
- Owner-fault inference. None is made here — this is a theme-code gap, not a claim the owner did something wrong. No repeat of the run-#1 error class.

WHAT IS WRONG IN IT:
- The free-delivery bar consequence is mis-attributed — this is the substantive correction. tdn-freeship occurs 0 times in the deployed draft PDP HTML, and that HTML contains the entire shopify-section-cart-drawer-section (23,993 chars of it). snippets/dog-nook-freeship-bar.liquid exists in the repo but is rendered by nothing. The only two "Free UK delivery" strings on the page are the announcement bar and the trust panel. So the bar is not "never seen because the drawer is bypassed" — it would not be seen even if the drawer opened. Making Add to Basket ajax would NOT restore it. The recon report listed "whether the drawer's free-delivery bar renders at all" as an open unknown; the answer is no, and for an unrelated reason.
- auto-open is absent from cart-drawer-component in the served HTML, i.e. settings.auto_open_cart_drawer is off. Even a correctly ajax'd add would not pop the drawer without also flipping that setting. The fix is three things, not one.
- Scope is understated, not overstated. This is not specific to the bundle page. lick-mat-1, calming-donut-bed-1 and the-new-rescue-bundle-1 all serve data-tdn-atc with product-form-component: 0 on the asserted draft, and source confirms the same bare {%- form 'product' -%} in /home/user/sc/dog-nook-theme/snippets/dog-nook-pdp-form.liquid:6 and the mobile sticky bar at /home/user/sc/dog-nook-theme/sections/dog-nook-product.liquid:82. Every PDP on the draft theme does a full-page POST.
- blocker: "none" is wrong. The natural home for a submit interceptor is assets/dog-nook.js, which the standing rules forbid touching until someone decides which of the three versions is canonical. Either that decision is a prerequisite, or the handler ships in a new asset file.

CONTRADICTION WITH STATUS.md: none. STATUS.md and the recon report (line 148) both list "whether Add to Cart really redirects away from the PDP" as source-level reasoning no agent had confirmed. This confirms it. Where the finding and the docs part company is the drawer bar, and there the docs' caution was right and the finding's assumption was wrong.

POSITION TEST: it does earn its keep against POSITIONING.md, but not for the reason given. The loss is the post-add moment where a Settle-In buyer could be told what the 3-month stage adds — the stage ladder's only natural upsell beat. That, not the delivery bar, is the AOV argument.


**[V46] HELD** — CORE MECHANIC: VERIFIED INDEPENDENTLY — but four claims around it are overstated, and one is unsupported.

HOW I CHECKED. Read /home/user/sc/POSITIONING.md, /home/user/sc/STATUS.md, and the source at /home/user/sc/dog-nook-theme/snippets/dog-nook-email-popup.liquid. Then wrote and ran my own Playwright probe (/tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/verify-popup2.mjs) at 375x812 against the Settle-In Bundle PDP, hard-asserting the theme before measuring. Theme served: {"name":"The Dog Nook — Design install (CRO working copy)","id":193438056731,"role":"unpublished"} — the correct deploy target, matching HANDOFF.md:77. I did not take the original run's word for anything.

WHAT REPRODUCED EXACTLY (so the finding is not dressed-up inference):
- Popup fired at ~12.4s with ZERO scrolling. Source confirms: setTimeout(show, 12000) OR 45% scroll, whichever first (line 89-94). "~13s" is accurate.
- position:fixed, z-index 90, modal rect [0,0,375,812]. Card is a centred 335x384 panel over a dimmed/blurred backdrop.
- Copy matches verbatim, including "Get my 10% code". (Note: the git snippet says "Send my code" — the deployed draft is AHEAD of git. Known asset-drift class; any fix must be made against theme 193438056731, not assumed from the repo.)
- page.click('[data-tdn-atc]') with the popup up -> TIMEOUT. Same click immediately after dismissing -> CLICKED. The controlled before/after isolation is real and I got the same result.
- Owner's screenshot popup-mobile.png is genuine: it shows the draft preview bar ("Design install (CRO...) Draft"), and probe4.mjs hard-exits on theme mismatch before screenshotting.

CORRECTION 1 — the elementFromPoint evidence does not reproduce in the state implied. There is exactly ONE [data-tdn-atc] on the page, position:static, at document y=1166. When the popup fires on the 12s timer at scrollY=0, the ATC is ~1166px below an 812px fold — not on screen at all, and elementFromPoint at its centre returns null, not P.tdn-emailpop__p. I only got "P.tdn-emailpop__p" after scrolling the ATC into view (scrollY=782) while holding the modal open. The conclusion still stands — it is a modal, it blocks the whole page — but "the primary conversion control is covered at the moment of decision" is not what the timer scenario shows. At the moment it fires, the shopper is at the top of the page, a full screen-and-a-half above the button.

CORRECTION 2 — once per browser, forever. localStorage['tdn_popup'] is set on any close/decline/submit (line 52). I dismissed, reloaded the PDP, waited 18s: popup did NOT return. It is one interruption per device ever, not a per-visit tax. The finding omits this and it materially changes impact. Downgrading high -> medium.

CORRECTION 3 — it is not live. The popup exists only on unpublished draft 193438056731. A saved live-theme PDP capture (bundle.html, Shopify.theme.id 193140818203) contains ZERO occurrences of "emailpop" or "tdn_popup". The finding's present tense ("on the store's highest-value page, on the traffic source that dominates") reads as revenue being lost now. It is a pre-publish defect.

CORRECTION 4 — "the traffic source that dominates" is unsupported. No analytics were cited, and STATUS.md records the Shopify store has zero orders. There is no measured mobile share for this store. That is general-ecommerce inference presented as a store fact — the same move that sank run #1.

NOT-RULED-OUT (cookie banner): the banner is on screen only because the scripted run never tapped Accept. A real visitor usually clears consent well inside 12 seconds. The "consent bar AND full-screen modal stacked" claim is true only for someone who ignores the banner for 12s. Plausible, not proven.

INNOCENT EXPLANATION FOR THE BUILDER — ruled in, not out. This is not carelessness. The snippet is deliberately engineered: engagement-gated (12s dwell OR 45% scroll), once-only via localStorage, suppressed on /cart and /checkout, focus-trapped, Esc-closable, focus restored to the previously-focused element on close. Ruled out: (a) accidental inclusion — no, it is a purpose-built snippet with a comment block stating the gating rationale; (b) a third-party app dropping it in — no, it is first-party theme code committed in git (f237aac). And email capture is an explicitly stated lever in STATUS ("Owned traffic 30% -> 65% — email capture"); POSITIONING calls the email flow "the strongest play". So "remove it" would work against a stated goal.

CONTRADICTS STATUS.md? No. STATUS does not mention the popup. No conflict to adjudicate.

AGAINST THE POSITION — the finding under-aims. The real charge is not "a modal covers a button". It is that at the exact point the store is supposed to ask "where is your dog right now?", it instead asks "want 10% off?" — the discount-ladder question POSITIONING explicitly rejects. POSITIONING wants the email flow to BE the 3-3-3 timeline. A capture that asked "how long have you had them?" would route the shopper to a stage and serve the position; a generic 10%-off modal does not, and it fires on a PDP rather than on browse or exit.


**[V47] HELD** — HOLDS — I could not refute it, and I reproduced it independently rather than taking the finding's word.

WHAT I DID (evidence standard):
1. Read the files. `/home/user/sc/dog-nook-theme/assets/dog-nook.css` lines 58-60 are exactly as claimed: `.tdn-wrap{...padding:0 var(--tdn-side-pad)}` then `.tdn-section{padding:64px 0}` then `@media(max-width:760px){.tdn-section{padding:44px 0}}`. Line 43 does define `--tdn-side-pad: 20px` under 760px.
2. Fetched the served asset myself through the tunnel: `https://thedognook.co.uk/cdn/shop/t/12/assets/dog-nook.css?v=7586407119038453391784743960` → HTTP 200, 9244 bytes. The minified text contains the three rules in exactly that order and exactly those strings. The finding quoted the served file accurately.
3. Loaded pages at 375px with the theme ASSERTED (`window.Shopify.theme.id`), which the finding did not claim to do. Script: `/tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/VERIFY2.mjs` and `VERIFY3.mjs`. All served `193438056731 (unpublished)` — the correct draft. Measured: `.tdn-section.tdn-wrap` padL/padR `0px`, x=0, w=375 on `/products/the-settle-in-bundle`, `/products/the-new-rescue-bundle-1` and `/products/calming-donut-bed-1`; H1 and intro `<p>` both x=0, w=375 on the bundle pages. Reproduces exactly.
4. Screenshot taken fresh by me: `/tmp/claude-0/.../scratchpad/V3-settle.png`. The eyebrow "THE RESCUE BUNDLE", the H1 and the intro paragraph visibly touch the left glass, while the header and the hero image above them are correctly inset — the contrast is visible in one frame. Understated if anything.

INNOCENT EXPLANATIONS I TESTED AND RULED OUT:
- **L002 wrong-theme trap** (STATUS.md's flagship warning, and the finding's biggest exposure since it never asserted the theme id). Ruled out two ways: `cdn/shop/t/12/` is provably the DRAFT's asset path — `d_bundle.html`, `d_pdp.html`, `home.html`, `draft.html` in the scratchpad all carry `Shopify.theme = {"id":193438056731,...,"role":"unpublished"}` alongside `t/12` hrefs, while `live.html` (`id 193140818203`, role main) loads **no dog-nook CSS at all** and contains zero `tdn-wrap`/`tdn-section` occurrences. And my own runs asserted the id per page. Worth flagging: my first attempt on `https://thedognook.co.uk` WAS silently served the live theme (193140818203) despite priming the preview cookie, so the trap is live and active — the finding got the right theme, but not by having guarded against it.
- **Asset drift.** The standing rule protects `dog-nook.js` and `dog-nook-cro.css`; `dog-nook.css` is not one of them. I verified there is no drift anyway: selector-set diff of served vs git shows only minification artifacts (`::before`→`:before`, rule coalescing, `from`→`0%`), no semantic difference. The fix advice is safe.
- **Missing design token.** Ruled out — the token is present and correct in the served file.
- **A parent or child supplying the inset instead.** `.tdn-pdp` (in dog-nook-cro.css) has no horizontal padding, and the measured H1/`<p>` bounding boxes are x=0, so nothing else is providing a gutter.
- **Deliberate full-bleed design.** Not credible: `.tdn-wrap` exists solely to apply `--tdn-side-pad`, and the sibling non-combined wraps (hero, trust strip, newsletter) do get 20px — the inconsistency within one page is the tell. Note this attributes a CSS cascade accident to the stylesheet, not a judgement about the owner, so the run-#1 class of error does not arise here.

CONTRADICTS STATUS.md? No. Neither STATUS.md, PROBLEMS-1.md, START-HERE-NEXT-BUILDER.md nor the 2026-08-05 recon report mentions side padding or `tdn-section` — grep returns nothing. This is genuinely new and does not redo run #1. (A prior 2026-08-12 session was clearly circling it — `scratchpad/ref-fix.mjs` injects `.tdn-section{padding-left:var(--tdn-side-pad)...}` as a test — but it was never written up.)

CORRECTIONS I WOULD MAKE — three narrow the claim, one widens it:
a) **"MOBILE:" in the title is wrong, and too kind.** I measured at 900px: `.tdn-section.tdn-wrap` is still padL `0px`, x=0, w=900, with the PDP's right column ending at exactly x=900 and its image starting at x=0 — flush on both edges on tablet too. The `padding:64px 0` base rule resets left/right at every width; the 760px media query is a red herring. The bug is invisible only above ~1220px viewport, where the 1180px `max-width` finally leaves slack. So it is every viewport under ~1220px, not mobile.
b) **"every page loses its side margin" is over-broad.** It is every element carrying BOTH classes. On the homepage I measured 6 combined sections at 0px and 3 non-combined `.tdn-wrap` at 20px — `dog-nook-hero`, `dog-nook-trust-strip`, `dog-nook-newsletter` (and `dog-nook-countdown`, `dog-nook-pdp-extra`) put `.tdn-wrap` on a nested div and are unaffected.
c) **"body text and headings" is over-broad.** Headings and intro copy confirmed flush; but homepage `why` paragraphs measured x=27 because inner children carry their own inset. Not all text is flush.
d) **Count is 11, not 10** — the finding's list omits `sections/dog-nook-quiz.liquid`, which I measured at padL 0px.

ONE EVIDENCE-HYGIENE FAULT: the cited screenshot `/tmp/claude-0/.../scratchpad/settle-mobile.png` is timestamped Aug 12 12:14, hours before the finding's own 01:30 measurement run — it is a pre-existing artifact from an earlier session that was re-cited, not produced by this measurement. The measurement itself is sound, but that citation should not be trusted as this run's output.

BONUS DEFECT FOUND WHILE VERIFYING (separate, do not fold in): `/products/calming-donut-bed-1` at 375px has horizontal overflow — `documentElement.scrollWidth` 420 vs a 375 viewport. Fixing the padding will not fix that; it needs its own investigation.


**[V48] HELD** — The load is real, not dressed-up inference. I reproduced it independently: fetched the Settle-In PDP through the myshopify->thedognook.co.uk 301 carrying cookies, and asserted the served theme was the draft (Shopify.theme = {"id":193438056731, "role":"unpublished"}) rather than live 193140818203 — the L002 trap the finding does not mention passing, but which its numbers survive. On that page there are exactly five /products/ anchors, matching the finding's count, and zero of them fall between <main> (offset 132514) and <footer> (159017). The header nav carries none either. Source corroborates: templates/product.bundle.json declares only the "main" section (dog-nook-bundle), and sections/dog-nook-bundle.liquid contains no cross-sell render, while sections/dog-nook-product.liquid line 74 renders dog-nook-pdp-extra — and I confirmed on the rendered /products/calming-donut-bed-1 draft page that this produces both the tdn-upsell block (linking to /products/the-settle-in-bundle) and the tdn-grid-3 "Pairs well with / Complete the calm-down kit" grid. So the cross-sell machinery genuinely exists, works, and is genuinely absent from the bundle template. The catalogue facts hold too: /collections/all/products.json returns 9 products, the only bundles among them being the-new-rescue-bundle-1 (£34.99) and the-settle-in-bundle (£64.99); the-complete-calm-system, the-home-alone-kit and the-fireworks-survival-kit each return 404. Two defects, neither fatal. (1) The evidence line "all five are in the footer" is factually wrong. Only ONE product anchor is in the footer (First Days Kit, in the footer menu at offset 165839). The other four sit past </footer> at offsets 222k+ inside <dialog id="search-modal"> / predictive-search-component — the hidden predictive-search default results list, invisible until a shopper opens search. This makes the escape route from the page worse than the finding claims, not better, so the conclusion strengthens rather than breaks; but the characterisation must be corrected or the next builder will look for footer links that are not there. The "The First Days Kit (x2)" count is likewise one footer link plus one search-modal card. (2) The title's "nowhere in the UI" overreaches. The homepage body does link to both live bundles (three anchors to the-new-rescue-bundle-1, one to the-settle-in-bundle). What is absent from the homepage body is the stage framing: zero occurrences of "3-3-3", "decompress", "stage", or "timeline". So "no stage ladder anywhere in the UI" is supported; "no route between bundles anywhere" is not. Innocent explanations checked. This is not owner error and the finding should not be read as one: START-HERE-NEXT-BUILDER.md TODO 3 already queues "bundles become stages" and the "Where's your dog right now?" three-door hero as the main body of work, so the absence is unbuilt-yet, not broken. The three missing rungs are deliberately draft pending sourcing and photography, which STATUS.md names as the launch gate. And a focused bundle PDP with no exits is a defensible CRO choice in general — it is only wrong here because POSITIONING.md makes the stage ladder the point. The finding is adjacent to TODO 3 rather than a duplicate: TODO 3 item 1 says label each bundle page with its stage, which is copy, not navigation; the PDP-level route between rungs is a distinct gap. No contradiction with STATUS.md. One bookkeeping mismatch worth noting but not affecting the finding: STATUS.md says "9 products sellable now + 2 live bundles", which reads as 11; products.json returns 9 total, of which 2 are the bundles.


**[V49] KILLED** — The evidence is REAL — the page was genuinely loaded and the numbers reproduce to the pixel — but the conclusion drawn from them is wrong on both counts, for two separate reasons the author did not rule out.

HOW I CHECKED: started tools/agent-browser/tunnel.py, loaded https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle at 375x812 / 375x667 / 360x640 with isMobile+hasTouch, asserted Shopify.theme.id === 193438056731 on every load (it matched), and sampled getComputedStyle + getBoundingClientRect + elementFromPoint on .tdn-cookie at t = 0/60/120/200/300/600/1500/3000ms. Also read dog-nook-theme/snippets/dog-nook-cookie-banner.liquid, the .tdn-cookie block at dog-nook-theme/assets/dog-nook.css:152-163, and the initCookie() unhide at dog-nook-theme/assets/dog-nook.js:83-99 (read only — not modified). Scripts and screenshots in /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/: REFUTE-cookie-clip.mjs, REFUTE-cookie-final.mjs, REFUTE-cookie-viewport.png, REFUTE-nopbar-375x812.png.

(1) THE CLIPPING IS A MID-ANIMATION FRAME, NOT A LAYOUT STATE. The finding's numbers reproduce exactly — but only at t≈60ms. My t~60ms sample: rect y=670 h=183 bottom=853, buttons y=796 bottom=834, clippedPx=22. Identical to the finding. At that instant computed transform is matrix(1,0,0,1,0,56.998). By t≈200ms transform is 'none' and rect bottom = 796 — exactly innerHeight 812 minus the CSS bottom:16px — with belowVp=false for both buttons. dog-nook.css:157 gives .tdn-cookie `animation: tdnSlideUp .3s ease`, and css:162 defines `@keyframes tdnSlideUp { from { transform: translateY(120%) } }`; dog-nook.js:88 unhides the banner immediately. The measurement was taken ~60ms into a 300ms entrance slide. Same at 375x667 (bottom 651 of 667) and 360x640 (bottom 624 of 640): the element is bottom-anchored, so at rest it cannot be clipped by the viewport floor at any height.

The finding flagged the bottom:16px-vs-853 inconsistency honestly and hypothesised 'an ancestor is creating a containing block (a transform or filter somewhere up the tree)'. I walked every ancestor checking transform/filter/perspective/will-change/contain: the list is EMPTY. There is no such ancestor. The transform was on .tdn-cookie itself, from its own keyframe. The one thing the author chose not to chase is precisely the thing that invalidates the conclusion.

(2) THE VISIBLE CUT-OFF IN THE SCREENSHOT IS THE SHOPIFY PREVIEW BAR, NOT THE SCREEN EDGE. This is the innocent explanation that was not ruled out, and it is the run #1 class of error. I opened settle-mobile.png: it is a FULL-PAGE capture (375x2590), and the black bar clipping the buttons carries the Shopify logo, the text 'The Dog Nook — Design install (CRO...' and a blue 'Draft' badge. My probe names it: body > IFRAME#PBarNextFrame inside div#PBarNextFrameWrapper, position:fixed, y=744, h=68 — occupying 744-812, the bottom 68px of the viewport. At rest the buttons sit at y=739-777, so the bar covers them, and elementFromPoint on both button centres returns IFRAME#PBarNextFrame. Playwright's click() correctly times out. Remove #PBarNextFrameWrapper and both buttons immediately hit-test to themselves (hitOk:true) and 'Accept all' clicks successfully, dismissing the banner — verified at all three viewports. That bar is injected ONLY because theme 193438056731 is unpublished and being viewed via ?preview_theme_id=. No customer on a published theme ever receives it. There is no customer-facing obstruction and nothing in the theme to fix.

So: the banner is not clipped, the buttons are not clipped, and they are fully tappable. Neither claim survives.

WHAT DOES SURVIVE, and I am keeping it rather than discarding the whole finding: the height is real at rest, not just mid-animation. 183px on 812 = 22.5%, and 204px on 640 = 31.9% at 360x640. That is measured, and it is a fair (minor) observation about a consent bar eating up to a third of a small phone on the PDP. It is friction, not a defect, and it is normal for consent bars.

AGAINST POSITIONING.md: even the surviving fragment barely registers. The test is 'does this help someone work out which stage their dog is at, and get them the right thing for it?' A consent bar's height does not, either way. This should not have been medium impact.

NO CONTRADICTION WITH STATUS.md — it says nothing about the cookie banner. But the finding walked straight past STATUS.md's own KNOWN TRAPS warning about trusting preview-environment rendering. The preview bar is a NEW trap of exactly that family and deserves recording next to the Shopify.theme.id one: on a phone viewport the preview bar covers the bottom ~68px, so any bottom-anchored element (cookie banner, sticky add-to-basket, sticky cart) will look obstructed in preview and is not.

ONE FAIRNESS POINT: the paired claim that the cookie banner and email popup are both z-index 90 and on screen together is not tested here and is not affected by this refutation — judge it on its own finding.


**[V50] HELD** — EVIDENCE IS REAL — I reproduced it rather than trusting it. Loaded https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle via tools/agent-browser with --theme 193438056731; the tool asserted window.Shopify.theme.id = 193438056731 ("The Dog Nook — Design install (CRO working copy)") [unpublished], status 200, so the L002 wrong-theme trap is ruled out. Grepped the dumped document.body.innerText for "3-3-3", "stage", "three weeks", "3 weeks", "decompress", "three months", "timeline", "weeks 1", "first three": ALL ZERO. Rendered eyebrow is "THE RESCUE BUNDLE". Every absence claim in the finding is confirmed at first hand. This is a loaded page, not dressed-up inference.

THE COMPARISON CLAIM IS ALSO TRUE, AND UNDERSTATED. The First Days Kit is at handle /products/the-new-rescue-bundle-1 (not the-first-days-kit, which 404s). Loaded it on the same asserted theme. diff of the eyebrow+H1+intro block against the Settle-In page returns IDENTICAL. It is worse than "same headline and intro": the WHAT'S INSIDE list is identical too (Lick Mat £11.99 / Snuffle Mat £22.99 / Slow-Feeder £14.99, "Bought separately £49.97"), so on the £64.99 page literally nothing but the price and computed saving differs. That is the STATUS.md-documented shared-template compliance bug, not this finding's scope, but it means "nothing distinguishes it" is literally true.

SUPPORTING CLAIMS CHECKED. (a) The Settle-In product description does begin "Everything a nervous or newly-adopted dog needs to feel safe and settle in — a deep bed to burrow into, plus two gentle, nose-led ways to unwind" (Shopify search_products, live Admin API). (b) sections/dog-nook-bundle.liquid line 101 does expose { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "The Rescue Bundle" }, and grep finds NO product.description render anywhere in that section — so the sibling missing-content finding is corroborated too.

INNOCENT EXPLANATIONS I TESTED. (1) "The stage framing is delivered elsewhere in the funnel, so the PDP need not repeat it." Ruled out: I loaded the homepage on the same asserted draft theme and grepped it — "3-3-3", "stage", "3 days", "three days", "decompress", "three months", "first three", "how long" all return ZERO. Nothing upstream places the dog either. (2) "The owner did something wrong." Not alleged, correctly — POSITIONING.md is dated 2026-08-05 and the theme predates it; the absence is undone work, not a mistake. The finding does not blame the owner, so it does not repeat run #1's error class. (3) Does it contradict STATUS.md? No — it is consistent with it and with POSITIONING.md, which already prescribes "Product pages. Every product declares its stage" and "labelling by stage".

TWO CORRECTIONS THAT MATTER, WHICH IS WHY THE RESTATEMENT BELOW IS NOT EMPTY. (i) NOVELTY: this is not a discovered insight — POSITIONING.md already mandates stage labels on product pages. The finding's value is verification that the work is undone on the deployed draft, and it should be filed as such, not as strategy. (ii) THE PROPOSED FIX IS UNSAFE AS WRITTEN AND ITS EFFORT IS UNDERSTATED. templates/product.bundle.json is a SINGLE shared template (STATUS.md: 6 products share it; I proved the sharing by rendering — both pages emit byte-identical eyebrow/H1/intro/contents). Editing the eyebrow to "Stage 2 · Weeks 1–3 · Settling" would therefore stamp Stage 2 onto the First Days Kit, which is Stage 1 — actively worse than the status quo. Per-product stage labelling REQUIRES splitting the shared template first, which is the same de-sharing work TODO 1 (false savings) needs. Effort is not "medium" standing alone; it is blocked-behind/coupled-to TODO 1.


**[V51] HELD** — The core claim survives and I could not refute it. I loaded /products/the-settle-in-bundle with the theme asserted (served 193438056731 [unpublished], so not the L002 wrong-theme trap) and independently confirmed every load-bearing fact: the rendered main section emits 58 tdn-* elements and zero anchors; sections/dog-nook-bundle.liquid contains no <a> tag anywhere (the "What's inside" rows are plain divs); all three premium bundles 404; /collections/all/products.json returns 9 products with only two bundles; and dog-nook-pdp-extra.liquid's cross-sell plus a "BETTER TOGETHER" upsell genuinely render on /products/calming-donut-bed-1, so the machinery exists and is simply not wired into the bundle template. I also tested the finding's implicit global claim by loading the homepage and /pages/shop: neither presents a 3-3-3 stage chooser (homepage tiles and shop filters are category-based — Calming/Grooming/Feeding/Travel), so "the ladder exists in the strategy and nowhere in the UI" is accurate.

However one evidence line is materially wrong. "There are five, and all five are in the footer" is false: only ONE product anchor is in the footer (The First Days Kit, in the EXPLORE menu). The other four came from a hidden <dialog-component id="search-modal"> — Shopify Horizon's predictive-search overlay, display:none until a shopper opens search, listing default/recently-viewed products rather than anything curated. The finding evidently ran a raw querySelectorAll('a[href*="/products/"]') without checking visibility or container and assumed footer. I found six anchors, not five, the extra being a recently-viewed self-link (session-dependent, so not a fault). This misattribution does not rescue the page — it makes the gap worse: visible routes off this page to any other product number exactly one, not five.

Two smaller over-reaches: header nav Shop (/pages/shop) and Collections are real generic catalogue routes, so "no offered path except a footer link" is too absolute (they are simply not stage-aware); and pdp-extra renders 2 cards on the donut bed, not 3 (class is tdn-grid-3, loop caps at 3).

No owner-blame inference is involved, so the run-#1 class of error is not engaged. No contradiction with STATUS.md: its "Bundle upsell (AOV) — DONE" covers single-product → bundle via custom.bundle_handle, which I confirmed working, and never claimed bundle → bundle. Separate minor doc drift worth logging: STATUS says "9 products sellable now + 2 live bundles" (reads as 11); live count is 9 total = 7 singles + 2 bundles.


**[V52] KILLED** — REFUTED. The page was genuinely loaded — this is not dressed-up inference, and the height figure is real — but the headline claim is an artifact of the observation environment, and BOTH innocent explanations were missed.

HOW I KNOW: loaded https://kkeqih-jm.myshopify.com/products/the-settle-in-bundle via tools/agent-browser (tunnel + SPKI pins), asserted Shopify.theme.id === 193438056731 on every page, at 375x812, 390x844 and 360x640. Script: /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/R2-cookie.mjs. Also read dog-nook-theme/assets/dog-nook.css and dog-nook-theme/snippets/dog-nook-cookie-banner.liquid.

1. NOT REPRODUCIBLE AT REST. At 375x812 the at-rest rect is y=613, h=183, bottom=796 — exactly innerHeight-16, i.e. the CSS doing precisely what it says. Buttons sit at y=739, bottom=777: 35px CLEAR of the viewport floor, with belowViewportFloor:false on both. Nothing is clipped. The finding's y=670 / bottom=853 does not occur once the page settles.

2. THE UNRESOLVED PUZZLE HAS A MUNDANE CAUSE — AND IT IS NOT AN ANCESTOR CONTAINING BLOCK. The finding honourably flagged that computed bottom:16px and rect bottom 853 are inconsistent, and guessed "an ancestor is creating a containing block (a transform or filter up the tree)". I walked the entire ancestor chain for transform/filter/perspective/will-change/contain: ZERO matches. The real cause is the element's OWN animation — .tdn-cookie carries `animation: tdnSlideUp .3s ease` with `@keyframes tdnSlideUp { from { transform: translateY(120%) } }`. 120% of 183px is ~220px of downward offset decaying to zero over 300ms. Sample mid-flight and you get exactly this signature: correct computed bottom:16px, correct height 183, rect pushed down. The finding's +57px is 26% of that 220px slide. I caught the same artifact in flight and logged it: at 375x812, transform matrix(1,0,0,1,0,0.37) with animation playState "running"; at 390x844 the early sample read bottom=835 vs at-rest 828 — 7px low, with a residual translateY of 6.74 matching the rect discrepancy exactly. Mechanism reproduced at a second viewport. This is a measurement taken before the reveal animation finished, not a layout defect.

3. THE CITED SCREENSHOT CANNOT SUPPORT THE CLAIM. settle-mobile.png is 375x2590 — a FULL-PAGE capture, not a viewport capture. A full-page screenshot has no viewport floor, so "cut off by the bottom of a 375x812 screen" is unreadable from it. The finding says "what the screenshot shows"; the screenshot cannot show that.

4. WHAT THE SCREENSHOT ACTUALLY SHOWS IS THE INNOCENT EXPLANATION. Directly across the banner's button row sits the dark Shopify THEME PREVIEW BAR — Shopify glyph, "The Dog Nook — Design Install (CRO… [Draft]". That is Shopify's preview-only chrome, injected because the URL carries preview_theme_id. Hit-testing confirms it is the real occluder: elementFromPoint at both button centres returns IFRAME; remove #PBarNextFrameWrapper and it returns BUTTON.tdn-btn--outline and BUTTON.tdn-btn--primary with hitIsSelf:true — identical at all three viewports. My two viewport screenshots at the same moment prove it visually: R2-375x812-withPbar.png (buttons covered) vs R2-375x812-noPbar.png (both buttons fully rendered, clear of the floor). A real click on "Accept all" succeeded and dismissed the banner at all three sizes.

5. THIS IS THE RUN-#1 ERROR CLASS. The finding infers a defect in the owner's theme from an artifact of the harness used to observe it — structurally identical to run #1 concluding the reviews were fake because the Shopify store showed zero orders, having never considered offline sales. Here: zero real customers will ever see the preview bar, because it exists only under preview_theme_id and vanishes on a published theme.

RESIDUAL INFERENCE I AM NOT HIDING: I cannot load a published version of this theme (publishing is the owner's click, and the live theme is a different theme), so "absent on the published theme" is inference — grounded on the fact that removing the preview-bar element made the occlusion disappear entirely, and that the at-rest geometry is already correct without it.

WHAT SURVIVES: the size measurement. 183px at 375x812 (22.5%) and 390x844, and 204px at 360x640 — 31.9%, nearly a third of the screen on a common budget-Android size. Real, measured, worth logging as low-priority cosmetic.

UNVERIFIED SIDE CLAIM: the paired "cookie banner and email modal are both z-index 90". z-index:90 appears exactly ONCE in the served CSS (the cookie banner); the PDP sticky bar is z-index:50; no z-index appears in dog-nook.js or in the captured PDP HTML. I could not substantiate the popup half — not disproven, just unsupported.

STATUS.md: no contradiction on geometry (it says nothing about the banner's layout). But STATUS.md's KNOWN TRAPS warn about exactly this class of error, and one genuine positive falls out: recon-report line 135 listed "verify the cookie banner is actually in layout/theme.liquid" as unverifiable by any agent. It IS present and renders on draft 193438056731 — that open PECR/UK GDPR question is now closed.

POSITIONING: a consent bar is neutral to the 3-3-3 test. At 360x640 it covers ~32% of the screen, briefly sitting over the stage/bundle content on the PDP. That is the only angle on which the residual item earns any priority, and it is a low one.


**[V53] HELD** — CORE HOLDS — evidence is real, not dressed-up inference. I independently loaded https://thedognook.co.uk/products/the-settle-in-bundle via tools/agent-browser with --theme 193438056731 asserted (window.Shopify.theme.id = 193438056731, "CRO working copy", role unpublished — so the L002 wrong-theme trap is ruled out, which the finding itself never asserted). document.title = "The Settle-In Bundle – The Dog Nook"; meta[name=description] is character-for-character the 320-char string quoted, ending "— a cal"; link[rel=canonical] = https://thedognook.co.uk/products/the-settle-in-bundle. All three reproduce exactly. og:description carries the identical broken string (the finding missed this).

BUT THREE MATERIAL ERRORS, one of them the exact class run #1 committed:

1. WRONG CAUSE, BLAMES THE OWNER'S HTML. The finding says "unwind.What's" is caused by "a missing block separator in the description HTML". FALSE. I fetched /products/the-settle-in-bundle.json: body_html is well-formed — "...ways to unwind.</p><p><strong>What's inside</strong>...". There IS a block separator. The run-together is Shopify's own strip_html when it derives page_description from product.description: it removes tags without substituting whitespace. Same mechanism explains why the list items DO have spaces (their source has "<ul>\n<li>" newlines). The owner's copy is correct and renders correctly on the page. Acting on the finding as written — editing good body HTML — would fix nothing and risk damaging the strongest asset in the project (POSITIONING.md: "What it does NOT change: the product copy").

2. A FALSE QUANTITATIVE CLAIM. "The whole 155 characters Google will show are spent on a contents list rather than on the stage proposition." Measured: the lead proposition sentence is 145 chars. The first 155 chars are 145 chars of proposition plus "What's ins". The contents list does not begin until char 145. The real defect in the visible window is the run-together and the absence of stage language, not a contents list crowding it out.

3. MISATTRIBUTED SOURCE. "confirming STATUS.md's note that both bundles have seo.title null" — STATUS.md contains no such note. The claim is in audit/findings/2026-08-05-recon-report.md lines 20 and 120. No contradiction with STATUS.md either way.

INNOCENT EXPLANATION NOT RULED OUT (and it is a real one). I checked sibling products on the same theme. lick-mat-1 renders "Lick Mat for Anxious Dogs – The Dog Nook" — a crafted seo.title. calming-donut-bed-1 and the-new-rescue-bundle-1 (The First Days Kit) both carry hand-written, non-derived meta descriptions ("...Save £14.98 vs separately." — 158 chars, no run-together). So the SEO metafield pass was done and done well. /products.json shows every other product created 2026-07-12; the-settle-in-bundle was created 2026-07-20 — four days AFTER the 2026-07-16 SEO pass logged in HANDOFF.md §191/§366. This is one product created after a completed pass, not neglect, and the finding presents it as a general failure ("both bundles", "the store's cheapest chance") when the other bundle actually has a good description.

NOT NEW. Recon item #23 already reads "write SEO titles/descriptions for both bundles (currently null)". The genuinely new contribution is the rendered run-together and mid-word truncation, which run #1 did not have.

POSITIONING JUDGEMENT SURVIVES. Neither title nor description names the stage, and POSITIONING.md line 78 does name "rescue dog settling in" as a winnable cluster. That criticism stands.

Verdict: the defect and the fix are real, so it holds — but the diagnosis, the 155-char claim, the source attribution and the scope all need correcting before anyone acts on it.


**[V54] HELD** — I tried to refute this and could not. I re-ran it myself rather than trusting the write-up: started tools/agent-browser/tunnel.py, wrote my own probe (/tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/REF-PAD.mjs), loaded https://kkeqih-jm.myshopify.com/collections/calming-essentials at 375x812 with Shopify.theme.id asserted, and got the reported numbers to the pixel: themeId 193438056731 (after the 301 to thedognook.co.uk), computed padding on section.tdn-section.tdn-wrap = "44px 0px", paddingLeft/Right = "0px", rect x=0 w=375 right=375, card 0 at x=0-179 and card 1 at x=197-375, scrollWidth 375 = innerWidth 375. My own screenshot (REF3-ce-375.png) shows the back-link, the intro paragraph, the scenario chips and the product cards all flush to both edges, with the rounded card corners running off the glass. So the page was genuinely loaded, by me, twice over — this is not dressed-up inference.

The stated cause is right and I found a stronger proof of it than the report gives. I checked the DEPLOYED asset, not just the repo: the served minified CSS captured in the scratchpad (dn.css / served-dn.css / deployed.css, all identical md5 5c1b03f9) carries the same three rules the report cites from /home/user/sc/dog-nook-theme/assets/dog-nook.css lines 58-60, so local source and deployed theme agree here. Better still, the homepage at 375px separates the variables cleanly: elements carrying ONLY .tdn-wrap (div.tdn-wrap.tdn-hero-b__inner, section.tdn-wrap.tdn-trust) compute padding "0px 20px" and are correctly inset, while every element carrying BOTH classes computes "44px 0px". Same page, same stylesheet, same breakpoint — that is a controlled experiment, and it rules out any later-sheet override or a Horizon container effect. Grepping the local cro/cro2/cro3 files confirms none define .tdn-section, .tdn-wrap or --tdn-side-pad, and the live computed value confirms nothing else restores it.

Innocent explanations I actively tried and ruled out: (1) deliberate full-bleed mobile styling — ruled out because the theme defines --tdn-side-pad: 20px specifically at the <=760px breakpoint and applies it via .tdn-wrap, and sibling wraps on the SAME page do render at 20px; nobody chooses to inset the trust strip and the hero but not the product grid. (2) Wrong theme served (the L002 trap) — ruled out by asserting Shopify.theme.id = 193438056731 after the redirect. (3) Repo drifting from the deployed asset — ruled out by diffing against the served CSS. (4) A later stylesheet fixing it — ruled out by live computed style, not just by grep.

Two corrections. FIRST, the scope is understated twice over. It is not a 375px problem: I re-measured at a 1000x900 viewport and got padding "64px 0px", wrap x=0 w=1000, cards flush at 0 and 1000. max-width:1180px only starts creating a fake gutter above ~1180px, so the defect is live on every viewport narrower than that — small laptops and tablets included. And it is not one page: on the homepage six separate sections with the combined classes all measured x=0 w=375. SECOND, and this is the part a builder would get burned by, the proposed one-line fix is wrong. `.tdn-section` also appears WITHOUT `.tdn-wrap` on an element that CONTAINS a correctly-padded wrap: sections/dog-nook-hero.liquid line 26 is `<section class="tdn-section tdn-hero-a">` around `<div class="tdn-wrap tdn-hero-a__grid">`. Putting `padding: 64px var(--tdn-side-pad)` on `.tdn-section` would double-pad that hero to 80px a side on desktop. The safe fix is to stop `.tdn-section` using the shorthand at all — `padding-block: 64px` (and 44px at the breakpoint) — which leaves `.tdn-wrap`'s horizontal padding untouched everywhere.

Minor provenance nit, flagged rather than held against it: the screenshot cited in the evidence field, ce-mobile.png, is dated 2026-08-12 12:48 — an earlier session's file, not one taken for this finding. The scratchpad also contains pad.mjs through pad4.mjs and ref-fix-paddingonly.png from that same session, i.e. this ground was walked before. That undercuts the report's "WHY IT WAS NEVER SPOTTED / nothing has ever been checked on a phone" narrative, which is an unproven inference about how the work was done — and since STATUS.md records the theme as agent-built, it is not the owner's oversight in any case. I have dropped that sentence in the restatement, per the run-#1 lesson. It does not touch the defect itself, which I verified from scratch.

Against POSITIONING.md this earns its priority rather than being cosmetic: the collection page's stage-routing furniture — the "Reach for these when:" scenario chips that let someone self-identify their dog's stage — is exactly what is running off both edges, so the element that does the stage-matching work is the one rendered hardest to read. No conflict with STATUS.md; it is absent from PROBLEMS-1.md and from the 2026-08-05 recon report (grepped both), so this is genuinely new, not a redo.


**[V55] HELD** — I could not refute it — I re-verified every factual claim independently, in a real browser against the asserted draft theme, and each one came back exact.

HOW I CHECKED (all first-hand):
1. Rendered the page in Chromium via tools/agent-browser (tunnel.py + a measuring script I wrote at /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/measure.mjs), priming the preview cookie on the custom domain first and asserting window.Shopify.theme.id — served 193438056731 "The Dog Nook — Design install (CRO working copy)" [unpublished], so the L002 wrong-theme trap did not fire.
2. document.images.length = 0 at 1440x1000 AND at 375x812. Also querySelectorAll('picture') = 0, and 0 elements with any CSS background-image url(). So it is not merely "no <img>" — there is no raster imagery of any kind on the page.
3. getBoundingClientRect on .tdn-bundlep__img returned exactly 566x460 desktop and 375x300 mobile. This is the strongest anti-fabrication signal: I predicted 526 and 335 by reading the CSS (max-width 1180, side-pad 40/20, gap 48, box-sizing border-box) and my prediction was WRONG. The finding's numbers match the live layout, not the file — they could only have come from an actual measurement, not from reading source.
4. Computed background on that box = linear-gradient(140deg, rgb(199,144,121), rgb(168,107,79)) — the CSS gradient placeholder, as claimed.
5. .tdn-bundlep__ph textContent = "Flat-lay of all three" with computed text-transform: uppercase — so "FLAT-LAY OF ALL THREE" is the correct rendered form, and the finding correctly distinguishes the stored setting from the rendered string.
6. /collections/all/products.json returns 9 products, every one with images: []. Cross-checked against a second independent source: sitemap_products_1.xml lists the same 9 product URLs (plus the homepage) and contains zero <image:loc> entries — Shopify emits one per product featured image, so zero confirms it store-wide.
7. The placeholder label is genuinely a section setting: dog-nook-theme/sections/dog-nook-bundle.liquid line 111 (schema default) and dog-nook-theme/templates/product.bundle.json line 16.

OWNER-BLAME TEST (the run #1 failure mode): the finding does not commit it. It attributes the zero images to the known launch gate rather than to a bundle-specific mistake or owner error, and STATUS.md independently says the same ("Can I launch today? No — blocked on ONE thing: product photography… Zero of the real products have images", plus BLOCKED item 1). No innocent explanation is left unruled-out because no accusation is made.

CONTRADICTION WITH STATUS.md: none. It corroborates it.

Refinements I would make — none of them refutations, but (c) is a real trap for whoever implements the fix:
(a) "Zero images" is exact for raster imagery, but the page renders 34 inline <svg> icons, so it is not visually blank. Worth stating so a reviewer doesn't push back with "I can see icons".
(b) The blocker slightly overstates the physical dependency: a flat-lay of the bundle and its components needs only a camera and the products. A dog is required only for lifestyle/scale shots.
(c) Most important: the finding calls the placeholder string "separable" and Claude-fixable, which is true but incomplete. templates/product.bundle.json is a SHARED template. I loaded /products/the-new-rescue-bundle-1 (First Days Kit) on the same asserted draft theme: it renders the identical "Flat-lay of all three", the identical rows (Lick Mat / Snuffle Mat / Slow-Feeder Bowl), the identical "£49.97" strike and "BEST VALUE · SAVE £15" badge. For the First Days Kit that caption is CORRECT — its three items really are three flat items. So editing image_placeholder_label in product.bundle.json fixes Settle-In by breaking First Days Kit. It can only be corrected per-product, which is the same per-product template split the contents/savings fix already requires — as the finding implies but does not spell out.
(d) Minor: the 9 in products.json already includes the two bundles; STATUS.md's "9 products + 2 bundles" phrasing could read as 11. The finding's "9 published products" is the accurate figure.


**[V56] HELD** — I tried to refute this and could not break the core claim — but three secondary claims are wrong or overstated.

EVIDENCE IS REAL, NOT DRESSED-UP INFERENCE. I reproduced it independently. Loaded https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731 via tools/agent-browser (status 200, Shopify.theme.id asserted = 193438056731, "The Dog Nook — Design install (CRO working copy)" [unpublished] — the correct draft). My own DOM query returned exactly 4 elements: all tagName=SPAN, class="tdn-coll-scenario", href=null, role=null, onclick=false, empty dataset, computed cursor:auto, border-radius:999px, background:rgba(124,135,103,0.1). No :hover, :focus or aria-* anywhere in the section, and no theme JS references "scenario". Source at /home/user/sc/dog-nook-theme/sections/dog-nook-collection.liquid:23 and the schema default at :90 match the quoted strings verbatim. Notably the finding survived the L002 trap: my first naive attempt (no cookie priming) returned theme: undefined and zero elements — the auditor's numbers only reproduce if they actually primed the preview cookie, so they really did load it.

The narrow claim "the one interactive-looking narrowing affordance on the page" also checks out empirically: .tdn-coll-filters=0, .tdn-chip=0, facet elements=0, sort select=0. Nothing else on the page narrows anything.

WHAT IS WRONG — the remediation, and it is wrong in the store's favour. The finding says "The other three need either tag-filtered URLs (see the tags finding) or new collections." False. I listed all 8 collections via the Admin API: fireworks-storms (5 products), settling-a-new-rescue (4), home-alone-separation (5), travel-outdoor (1). Three of four chip labels are near-verbatim existing collection titles and can be wired today with no tag work and no new collections. Only "Vet & travel days" is genuinely unbacked — travel-outdoor holds 1 product and its scope does not cover "vet days". That label-to-title correspondence is itself the best evidence for the finding's underlying thesis: the chips read as shorthand authored for those collections and never wired up.

WHAT IS OVERSTATED — the positioning framing. POSITIONING.md and STATUS.md put the position on the 3-3-3 STAGE timeline (3 days decompress, 3 weeks settle, 3 months at home). Three of the four chips are scenario/occasion axes, not stages. Only "Settling a new rescue" is stage-adjacent, so "the one stage-selection affordance" and "a stage door that is painted on" oversell. Wiring these advances a scenario axis running orthogonal to the stage axis; the stage axis is carried by the three bundles. It is a real navigation win, not "the single cheapest positioning win on the page".

INNOCENT EXPLANATION THE FINDING DID NOT RULE OUT (partly defeats its severity). "Reach for these when:" is a descriptive label, and the row reads as ordinary prose — "reach for these when: fireworks and storms, settling a new rescue, home alone, vet and travel days." Under that reading the pills are badges describing what the collection is for, and nothing is broken. The theme's own real filter chip .tdn-chip (dog-nook.css:128) is visually distinct: 9px/16px padding, white fill, 1px border, cursor:pointer. The scenario span is smaller (5px/12px), borderless, tinted, cursor:auto, no hover. So on desktop the affordance signal is genuinely weaker than "filter-shaped" implies, and "worse than having no filters" / "refuses it" is overcooked. The residual real risk is mobile, where cursor and hover convey nothing and a tinted pill row above a grid is a plausible tap target.

MATERIAL CONTEXT THE FINDING MISSED. The same section already contains a REAL filter row — .tdn-coll-filters rendering <a class="tdn-chip"> tag links (lines 27-37) — and templates/collection.json explicitly sets "show_filters": false. Someone deliberately turned working filters off, plausibly because collection.all_tags yields junk (consistent with the tags finding this report references). That reframes the chips as copy written before navigation was settled, not negligence. No owner-blame is warranted here, and to its credit the finding does not make any — it does not repeat run #1's error class.

SCOPE UNDERSTATED. templates/collection.json is the DEFAULT collection template, so these four chips render on EVERY collection page, not just calming-essentials. I confirmed on /collections/settling-a-new-rescue, where the chip duplicates the page's own title — so the fix needs a current-page guard, slightly more than "add hrefs" though still quick.

MINOR. The quoted rendering inserts "·" separators between chips; there are none in the DOM or CSS (gap:8px only). Transcription artifact.

NO CONTRADICTION WITH STATUS.md, and no overlap with the 2026-08-05 recon report (180 lines, zero mentions of scenarios or chips) — this is new, not a redo.

IMPACT should come down from "high". Calming Essentials renders only 3 products (Shopify reports 6; the rest are not rendering), the theme is unpublished, and the store is pre-launch blocked on photography — so there is no traffic to lose today. As a site-wide navigation improvement across all collection pages it is still worth doing. Medium.


**[V57] HELD** — Substance confirmed independently, not taken on trust. I re-fetched both collection pages today with the preview cookie and asserted Shopify.theme.id = 193438056731 in the returned HTML (note: fetching via kkeqih-jm.myshopify.com served the LIVE theme 193140818203 — the L002 trap — so I fetched the preview on thedognook.co.uk instead). Rendered body text on /collections/calming-essentials is: banner, one generic intro line, four scenario chips rendered as inert <span class="tdn-coll-scenario"> (not links), three cards, FAQ. /collections/settling-a-new-rescue renders four unsegmented cards exactly as described. grep -ri "stage|3-3-3|decompress" over dog-nook-theme/ returns nothing outside three "The First Days Kit" strings in templates/index.json. I also loaded /collections: five need-based collections only, no stage collections exist. Remedy claims check out: dog-nook-product-card.liquid lines 6-30 accept a tag_text pill override falling back to p.type, and dog-nook-collection.liquid lines 8-17 render a banner plus an intro setting slot. The First Days Kit card in fact renders no pill at all (blank p.type) while neighbours show "Calming"/"Feeding" — the labelling slot is empty on the product that most needs it. Four corrections. (1) The absent-words claim is overstated: "The First Days Kit" appears as a product name on Calming Essentials, and Settling a New Rescue's description opens "The first few weeks with a rescue..." and lists "The Settle-In Bundle" — stage-adjacent language exists in product names; what is absent is labelling, ordering and routing by stage. (2) "sorted by nothing in particular" is not proven and I could not prove it — reading collection.sortOrder needs a Shopify admin call I cannot get approved here, and the First Days Kit sitting at card #1 is equally consistent with deliberate manual ordering by the owner. That inference should be dropped (it is exactly the run-#1 class of error: an unfalsified assumption about the owner's setup). (3) It is not a discovery and does not contradict STATUS.md — it corroborates it. START-HERE-NEXT-BUILDER.md TODO 3 already queues item 3 ("Tag every product with its stage — a custom.stage metafield is the obvious route") and item 5 ("Restructure settling-a-new-rescue into the three stages, and make it the spine of the navigation"), i.e. the same fix by the same route. POSITIONING.md's spine line is future tense ("it becomes the spine"), so this is unbuilt planned work, not a regression or owner failure. (4) Effort medium is optimistic for the three-door strip: no stage collections exist, so the doors have no destinations and would have to point at the three bundle PDPs or require new collections first; the per-card stage pill alone is genuinely cheap. Evidence hygiene: the two cited screenshots (ce-desktop.png 2026-08-12 12:26, settle-desktop.png 12:52) carry nothing that proves which theme they rendered, but the accompanying browser-saved col-*.html (19:02) do assert 193438056731, and my own fresh fetch re-confirms, so the "theme asserted" claim survives.


**[V58] HELD** — The evidence is real and I reproduced it end to end rather than taking it on trust. Using tools/agent-browser/browse.mjs with --theme 193438056731 asserted on every request (window.Shopify.theme reported "193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]" on all six loads, so the L002 wrong-theme trap is ruled out), I loaded /collections/grooming, /collections/settling-a-new-rescue, /collections/calming-essentials, /collections/mealtime-feeding and /collections/travel-outdoor. All five render the identical sentence "Calm, considered kit for dogs who find the world a bit much — chosen to help them settle, sniff and unwind at their own pace." and the identical chip row "Reach for these when: Fireworks & storms / Settling a new rescue / Home alone / Vet & travel days". I also loaded /collections and confirmed five is the complete customer-facing set, so "all five" is accurate, not a sample.

The stated cause checks out in source. /home/user/sc/dog-nook-theme/templates/collection.json has settings {banner_tone, show_filters} only, and /home/user/sc/dog-nook-theme/sections/dog-nook-collection.liquid lines 89-90 carry those exact two strings as schema defaults, printed at lines 16-25 via {%- if s.intro != blank -%}. Both misfires are real: I saw the fireworks chip row above a Grooming Glove and a Nail Grinder, and on settling-a-new-rescue I saw the specific banner copy ("The first few weeks with a rescue or newly-adopted dog can be unsettling — for both of you...") with the generic sentence stacked directly beneath it.

Innocent explanations I actively ruled out rather than assumed away:
1. Asset drift / theme-editor overrides. STATUS.md warns git does not match the drafts. This is the explanation that would have killed the finding, since an owner could have set per-collection intros in the theme editor without git knowing. Ruled out empirically: the deployed draft renders the schema defaults, so no editor override exists on any of the five.
2. Per-collection template overrides. Git has only templates/collection.json, and the rendered pages prove no override is in effect regardless of what git holds.
3. Owner blame. There is none to make, and the finding does not make any. STATUS.md credits the custom theme to the build work on draft 193438056731; this is a theme-authoring gap, not an owner decision, and nothing here resembles the run #1 error of inferring bad faith from an incomplete picture.
4. Prior coverage. I grepped audit/findings/2026-08-05-recon-report.md, PROBLEMS-1.md and START-HERE-NEXT-BUILDER.md for "scenario", "Reach for these", "Calm, considered" and "collection.json" — zero hits. This is new work, not a redo of run #1.

It does not contradict STATUS.md. It is consistent with the documented "one hardcoded template serving many pages" pattern.

Three corrections, none fatal. (a) Severity framing: the finding leans on the bundle-template comparison, and STATUS.md flags that one as a LIVE COMPLIANCE RISK. This one is not. There is no false saving, no misdescription and no ASA exposure — the generic sentence is correctly hedged comfort language. It should be triaged as positioning damage, not legal. (b) The grooming claim is slightly over-broad. "Fireworks & storms" and "Home alone" are genuinely wrong over a nail grinder; but the recon report itself argues the grinder has an honest anxiety framing (quiet grinding for dogs who panic at clippers), so the defect is the wrong chips, not the presence of chips. (c) Evidence phrasing overstates method: browse.mjs prints document.body.innerText, not per-selector queries, so ".tdn-coll-intro innerText and .tdn-coll-scenario list" describes a DOM extraction the standard tool does not do. The strings are identical either way — I checked — but the write-up should describe what was actually run.

One thing the finding missed, in the same section and fixable in the same pass: line 12 truncates the banner description with truncatewords: 40, so the good settling-a-new-rescue copy renders cut off mid-sentence as "...as they learn that home is a..." on the collection POSITIONING.md names as the spine of the site.


**[V59] HELD** — I could not refute it — I reproduced every load-bearing fact myself, first-hand. VERIFIED: (1) Product data — GET /products/calming-donut-bed-1.js returns price_varies:true, price_min:2999, price_max:4499, variants Small 2999 / Medium 3799 / Large 4499, all available:true. Exactly as claimed. (2) Render — I loaded the DRAFT theme properly. Note a trap the finding may have fallen into: a plain fetch of the preview URL 301s to thedognook.co.uk and DROPS preview_theme_id, serving the live stock Horizon theme (I got back `price-facet`/`facets-toggle` classes, zero `tdn-` classes). I set the preview cookie via a jar on /?preview_theme_id=193438056731, confirmed `tdn-` classes, and pulled the real draft card: `<a href="/products/calming-donut-bed-1" class="tdn-product-card" data-price="2999"...><span class="tdn-product-card__price tdn-price">£29.99`. Bare £29.99 confirmed. The live theme independently renders the same bare £29.99, so the defect exists on both. (3) The First Days Kit card on the same draft page renders £34.99 / £49.97 / Save £14.98 — the compare-at branch works and the collision caveat is real. (4) Cause — no `price_varies`, `price_min` or `price_max` token exists anywhere in dog-nook-theme; nothing injects the word From at runtime either (checked all four deployed CSS files for content:"From" and both dog-nook.js and dog-nook-gallery.js). (5) I re-fetched the description rather than trusting run #1: the only spec line is still "Large, 80cm — suits most dogs up to Labrador size" with S/M/L all live. (6) Across all 9 active products the Donut Bed at £44.99 is the only multi-variant SKU and the highest-priced non-bundle item — both claims true. FIVE CORRECTIONS. (a) Scope is four surfaces, not one: /collections/calming-essentials, /pages/shop, the PDP cross-sell rail on other products, AND the PDP headline itself, which opens at £29.99 — that last one is a different element (`tdn-pdp__price` in sections/dog-nook-product.liquid), NOT the card snippet, so the stated one-line fix does not cover it. (b) The title's "no From prefix on any variant product" overstates breadth: exactly one active product varies in price. (c) The cited repo file is STALE vs deployed — the deployed card carries data-price/data-title/data-date and a `tdn-product-card__ph` placeholder span that snippets/dog-nook-product-card.liquid does not have (git tree is clean, so the deploy came from elsewhere). Editing the repo file and pushing would silently regress those attributes. (d) "the variant most buyers of a donut bed will want" is unproven — the store has zero online orders and no data supports it. (e) INNOCENT EXPLANATION THE FINDING FAILED TO NAME AND I RULED IN, not out: audit/06-product-page-audit.md:56 prices the bed at a flat £44.99 and PROBLEMS-1.md:214 lists S/M/L variants as a later spec'd change — the card was written when every product was single-variant, so a missing price_varies branch was correct code at the time. This is catalogue drift, not a price presentation anyone chose; the DMCC framing should describe an unqualified from-price, which is a fixable presentation defect, not a deceptive act. No contradiction with STATUS.md, which is silent on card price rendering; run #1 noted the £29.99–£44.99 range and the stale copy but never the missing From, so this is new work, not a redo.


**[V60] KILLED** — The evidence is real but the conclusion is wrong. I reproduced the DOM myself (curl of https://kkeqih-jm.myshopify.com/collections/calming-essentials?preview_theme_id=193438056731, followed the 301 to thedognook.co.uk with a cookie jar, and asserted Shopify.theme = {"id":193438056731,"role":"unpublished"} in the response body — so this is the correct draft theme, not the live-theme trap). Confirmed true: 0 <select> on the collection page, no [data-tdn-sort], no [data-tdn-shop-grid], and cards do carry data-price="3499" data-title="The First Days Kit" data-date="1783875689". I also fetched the deployed dog-nook.js (4486 bytes, byte-size matches the finding) and found 0 sort references.

The finding is refuted on its central claim — "the attributes are dead data. A sort was scaffolded into the markup and never built." A complete, working sort IS built. I loaded https://thedognook.co.uk/pages/shop (same asserted theme id 193438056731) and it renders a real control: <label class="tdn-shop__sort"><span>Sort by</span><select data-tdn-sort aria-label="Sort products"> with six options (Featured, price-asc, price-desc, title-asc, title-desc, date-desc), a <div class="tdn-grid-4" data-tdn-shop-grid> container, and an inline <script> at the end of the section defining initShopSort(), which does exactly: parseFloat(el.getAttribute('data-price')), getAttribute('data-title').localeCompare(...), getAttribute('data-date') — then re-appends the cards. The attributes are the live input to a shipped feature.

The finding missed it because its search was scoped wrongly: it grepped only the three dog-nook-*.js assets. The consumer is an inline section script, not an asset file. For completeness I downloaded all 44 theme JS assets referenced by the page and grepped them — no sort logic in any, and only dog-nook.js mentions .tdn-product-card (in an unrelated fade-in selector list). So "0 matches in the JS assets" was accurate and still led to the wrong conclusion.

The innocent explanation that was not ruled out: snippets/dog-nook-product-card.liquid is a SHARED partial rendered by both the shop section and the collection section. The data-* attributes appear on collection cards as an ordinary by-product of code reuse, not as abandoned scaffolding. No inference of owner sloppiness is warranted — this is the same class of error as run #1's fake-reviews call.

Second problem: the finding blends deployed-DOM evidence with git-source evidence and does not notice the two disagree. It cites /home/user/sc/dog-nook-theme/sections/dog-nook-shop.liquid to characterise the "decorative Sort: Best selling ▾" as still present. In git that is true (a sort_label text setting rendering a bare <span>, with no <script> and no <select> anywhere in the file, and no data-price in the git card snippet). On the DEPLOYED draft none of that holds: the span has been replaced by the real labelled select, and the string "Sort" appears nowhere on the shop page except that control. Run #1's item 19 ("remove the fake Sort: Best selling caret", recon report line 114) is already fixed on the draft theme. This is exactly the drift STATUS.md warns about ("Asset drift unresolved... git matches neither"); the finding treated git as current for one claim and the storefront as current for another.

No contradiction with STATUS.md on the sort itself — STATUS is silent on it. Where they touch (the drift warning), STATUS is right and the finding tripped over it.

What survives: there genuinely is no sort on collection pages, and the positioning point about a stage-ordered sort is sound and worth keeping. But the framing ("never built", medium effort) is wrong — the mechanism exists and works; this is a small carry-over job, not a build.


**[V61] KILLED** — The core observation survives; two of the three load-bearing claims do not, and both fail on evidence I could reproduce.

WHAT I DID (all first-hand, not inference). Read /home/user/sc/dog-nook-theme/templates/collection.json and sections/dog-nook-collection.liquid in full. Loaded the collection pages through a cookie jar and asserted Shopify.theme.id on every one — all returned id 193438056731, "role":"unpublished", so the L002 preview-cookie trap did not bite (worth recording: the cookie DOES survive the myshopify→thedognook.co.uk 301 if you use `curl -c/-b`). Pulled the full published catalogue via /products.json and every collection via /collections/{h}/products.json. The Shopify Admin MCP required an approval I do not have, so everything below is storefront-sourced.

CONFIRMED. No filter UI renders on the draft theme: on /collections/calming-essentials the string `tdn-coll-filters` occurs 0 times, `tdn-chip` 0 times, `<select>` 0, no facet form. Cause is exactly as stated — collection.json line 5 sets "show_filters": false, and the section (lines 27-38) renders an All chip plus up to 6 `collection.all_tags` chips linking to {{ collection.url }}/{{ tag | handleize }}. The three calming-essentials products really are untagged, and that grid really does render 3 cards. Scenario chips render (4 of them) and really are inert spans, not links.

REFUTATION 1 — "every product has zero tags" is false. The finding sampled three products, all from one collection, and generalised to the catalogue. /products.json returns 9 published products and one of them, `the-settle-in-bundle`, carries tags ['bundle','calming'].

REFUTATION 2 — the stated TRAP is wrong on the collection that matters most, so the warning misdirects. `the-settle-in-bundle` sits in `settling-a-new-rescue` — the collection POSITIONING.md names "the spine of the site". So collection.all_tags there is NOT empty, and flipping show_filters would render All + "bundle" + "calming", not "a single lone All chip". I proved those tag URLs are already live rather than inferring it: /collections/settling-a-new-rescue/calming returns 200 on theme 193438056731 with one card (the bundle), title 'tagged "calming"'. The real risk is different from the one described, and by the position's test it is worse: a filter row that offers a customer two internal warehouse words, where "calming" narrows a 4-product rescue-settling collection to 1 product and "bundle" is a merchandising label, not a stage. It answers "what did we file this under", never "where is my dog right now".

REFUTATION 3 — the soft-404 sub-finding is an artefact of following redirects. Unfollowed, /collections/calming-essentials/zzz-no-such-tag returns **HTTP/2 301** with `location: https://thedognook.co.uk/collections/calming-essentials`. It does not serve a duplicate at the bad URL; the "200, full collection, unchanged title" the finding describes IS the redirect target, read as if it were the tag URL's own response. Shopify already performs precisely the redirect the finding recommends building, so that remedy is redundant work. This is the one place the evidence is dressed-up: `-L` was used and only the final hop's status recorded.

WHAT IS ACTUALLY THERE INSTEAD (found while testing 3). A tag that exists in the shop but not in that collection is a genuine 200 with an empty grid: /collections/calming-essentials/calming returns 200 on the draft theme, renders "No products in this collection yet", and the page carries no <link rel="canonical"> at all (nor does any collection page I loaded). That is the real indexable-thin-page case, and it multiplies once stage tags exist across a partially-tagged catalogue.

INNOCENT EXPLANATIONS RULED IN, not out. show_filters:false is the schema's own default (line 91, "default": false) — the toggle was never switched off, it was never switched on, so there is no owner error to allege and I make no such inference. The two stray tags on the Settle-In Bundle are equally consistent with ordinary Shopify housekeeping as with anything wrong.

SCOPE LIMIT I CANNOT CLOSE. /products.json only returns products published to the online store. collections.json reports products_count 6 for calming-essentials while 3 render, so a draft range exists that I could not inspect without Admin API access. "8 of 9 published products untagged" is what I can prove; the draft catalogue's tag state is unverified.

No contradiction with STATUS.md — it is silent on filters and tags, so nothing to adjudicate.

Verdict: not proven as written. Downgrading rather than discarding — the actionable core (tags must be written before the toggle is flipped) is correct and worth keeping, but shipped as-is this finding would send a builder to fix a duplicate-content problem that does not exist and leave the empty-tag-page one that does.


**[V62] HELD** — I could not refute it. I loaded the pages myself (curl, full HTML) and reproduced every load-bearing claim.

THEME IDENTITY (the STATUS.md trap that voids most layout claims): passed. Both pages returned `Shopify.theme = {"name":"The Dog Nook — Design install (CRO working copy)","id":193438056731,...,"role":"unpublished"}`. The myshopify→thedognook.co.uk 301 did not drop the preview cookie. So this was measured against the right theme, not the live one.

CLAIMS CONFIRMED VERBATIM:
- 0 `<img>` in the served HTML of /collections/calming-essentials.
- The exact markup: `<div class="tdn-product-card__media" style="background: #8B9578;"><span class="tdn-product-card__ph" aria-hidden="true">The Lick Mat</span><span class="tdn-product-card__tag">Calming</span></div>`.
- All four badge/title pairs, on /collections/settling-a-new-rescue: Feeding/Snuffle Mat, Calming/Lick Mat, Calming/Donut Bed, Bundle/Settle-In Bundle. First Days Kit renders no `__tag` span at all (the section passes no `tag_text`, so `pill = p.type`, which is blank) — so the "only First Days Kit escapes" claim is right and for the right reason.
- No `.tdn-product-card__ph` rule exists in the DEPLOYED theme: I fetched all six linked stylesheets (dog-nook.css, cro, cro2, cro3, base.css, compiled_assets/styles.css) plus parsed all 21 inline `<style>` blocks (49KB) — zero matches, and zero `tdn-product-card` rules of any kind in the inline blocks. So the span inherits `.tdn{color:var(--tdn-charcoal)}` where `--tdn-charcoal: #2E2A22` = rgb(46,42,34) — the exact value the finding reports as computed. That is not a value you arrive at by guessing; it corroborates a real computed-style read.
- Geometry: `.tdn-product-card__tag` is `position:absolute; top:10px; left:10px`; the `__ph` is unstyled inline/static at the media box origin. The reported 10px x-offset and ~8px y-offset are exactly what that produces. No CRO stylesheet overrides `__media` (I checked), so nothing re-lays-out the span.
- Visual: I opened scratchpad/ce-desktop.png and ce-mobile.png. The dark title text is plainly there in each olive block, the leading "T" of "The First Days Kit" is clipped by the 16px radius + overflow:hidden, and the white "Calming" pill sits on top of the title text. The name genuinely appears twice per card.

INNOCENT EXPLANATIONS I TESTED AND RULED OUT:
1. Deliberate design. Ruled out: every sibling placeholder IS styled — `tdn-hero-a__ph`, `tdn-bundle__ph`, `tdn-bundlep__ph`, `tdn-rt__ph`, `tdn-pdp__ph` all get uppercase/letter-spaced/translucent-white rules. This one alone has none. It is a builder's omission, not a choice.
2. The fix exists in git but was never deployed. Ruled out: `git log -S 'tdn-product-card__ph' --all` returns five commits containing the span (incl. 1a4c372 "fix card pill overlap"); I diffed the four stylesheets at every one of them and none ever contained a `__ph` rule on any branch.
3. PROBLEMS-1.md P1-1 — the strongest candidate. It records that Session B added inline `<style>` in `dog-nook-head` including "branded placeholder wordmark for imageless products", CSS that exists on the theme but nowhere in git. If true, the rule would exist and my repo grep would miss it. Ruled out by direct evidence: no `tdn-product-card` rule in any of the 21 inline style blocks on the live draft page.
4. Runtime JS injection. Ruled out: fetched all three deployed JS assets — no `__ph`, no style injection.
5. Owner blame. Not applicable and not made. The finding treats the missing photos as context, and STATUS.md already records photography as the owner-blocked launch gate. No repeat of run #1's error class.

NO CONTRADICTION with STATUS.md (which confirms zero product images), and this is not a redo of the 2026-08-05 recon report — that flagged the empty grey placeholder on the PDP alongside null `short_description`, a different element on a different template.

ONE REAL DEFECT IN THE FINDING'S METHOD (doesn't change the verdict, does change the fix): its stated proof — "I grepped all four stylesheets in the repo, which matches the computed result" — is the wrong evidence, and only coincidentally agrees. The repo does not match the deployed theme: the checked-out branch's `dog-nook-product-card.liquid` emits no `__ph` span at all (its `{%- if p.featured_media -%}` has no `{%- else -%}`). The deployed theme matches the `origin/claude/dog-nook-file-review-gl61uw` lineage instead. The conclusion survives only because I re-verified against the deployed assets.


**[V63] HELD** — I tried to refute this and could not — the factual core is real and independently reproducible. What I did: (1) Read /home/user/sc/dog-nook-theme/assets/dog-nook.css — lines 121 and 124 are verbatim as quoted. (2) Compared against the SERVED css saved from the storefront (served-dn.css, dn.css, deployed.css) — identical minified rule `.tdn-grid-4{grid-template-columns:repeat(4,1fr)}` plus the 900px 2-col override, so local source is not drifting from what ships. (3) Grepped all three CRO stylesheets (the ones actually loaded via snippets/dog-nook-head.liquid) for any `.tdn-grid` override — none exist; `auto-fit`/`auto-fill` appear nowhere in the theme. (4) Re-measured live myself with playwright through the local CONNECT tunnel, asserting Shopify.theme.id on every page (the L002 wrong-theme trap) — every page returned 193438056731. Computed gridTemplateColumns = '281.5px 281.5px 281.5px 281.5px', columnGap 18px, container 1180px, on all five collections. Card counts came back settling-a-new-rescue=4, calming-essentials=3, mealtime-feeding=2, grooming=2, travel-outdoor=1 — exactly the claimed figures. At 375px: '178.5px 178.5px', and Calming Essentials' third card sits alone on row 2. So 'howKnown: loaded-page' is honest; this is not dressed-up inference.

I also checked the specific detail that could have been invented: the finding says the gap sits to the right of The Calming Donut Bed. Reading the saved collection HTML, the card order is First Days Kit, Lick Mat, Calming Donut Bed — the Donut Bed is genuinely last. That detail is real.

Innocent explanations I tested and ruled out: (a) 'nobody can reach Travel & Outdoor' — no, /pages/shop links all four category collections including travel-outdoor. (b) 'a CRO file already fixes it' — no such rule exists. (c) 'run #1 already covered it' — the recon report only mentions the Car Boot Liner for category fit, never the grid. (d) 'STATUS.md contradicts it' — it does not; STATUS.md says nothing about grids or columns.

I resolved one apparent arithmetic problem in the finding's favour. `.tdn-wrap` is max-width 1180px with `padding: 0 40px`, and base.css sets `*{box-sizing:border-box}`, so columns should be (1100-54)/4 = 261.5px, not 281.5px. Live computed padding is 0px, and the cause is a real CSS bug: the collection section is `<section class="tdn-section tdn-wrap">`, and `.tdn-section { padding: 64px 0; }` sits at line 59 — AFTER `.tdn-wrap`'s `padding: 0 var(--tdn-side-pad)` at line 58, same specificity. The later shorthand resets horizontal padding to zero. So the 281.5px figure is measured, correct, and a symptom of a second defect the finding did not notice.

What I would correct, none of it fatal: the finding missed the worst instance (the /pages/shop page puts 9 products through the same single .tdn-grid-4, so 4+4+1 leaves one lone card and three gaps on the store's main browse page); it understates fix scope (.tdn-grid-4 is shared by dog-nook-collection.liquid, dog-nook-shop.liquid and dog-nook-collection-list.liquid); its primary proposed remedy is technically wrong as written, since `repeat(auto-fit, minmax(240px,1fr))` COLLAPSES empty tracks, which would stretch Travel & Outdoor's single card to the full 1180px — worse, not better; and it does not mention that PROBLEMS-1.md P1-4 already logs the 1-product Travel & Outdoor collection, with a queued zero-cost remedy (un-archive the Travel Seatbelt Harness) and an owner-gated merge decision, so the headline example is a transient catalogue state rather than permanent proof. Against POSITIONING.md this is credibility polish — it does not help anyone identify their dog's 3-3-3 stage — so 'medium' impact is generous but defensible.


**[V64] KILLED** — Refuted on its central claim. The evidence is real and honestly gathered — the zzz-no-such-tag probe reproduces for me exactly (HTTP 200, 3 cards, unchanged title), the source reading of dog-nook-collection.liquid is accurate, and the geometry predictions are correct (I measured 282x26 desktop in a 281.5px x4 grid, 179x51 mobile). It is not dressed-up inference. But the conclusion is wrong because of an unruled-out innocent explanation in the agent's own instrument: it enumerated collections from the /collections index page and found five, and sections/dog-nook-collections-index.liquid line 18 reads {%- if coll.handle == 'frontpage' or coll.products_count == 0 -%}{%- continue -%}{%- endif -%} — that page structurally HIDES every collection with zero visible products, i.e. precisely the ones being looked for. The enumeration is circular. The live sitemap_collections_1.xml lists EIGHT published collections, not five: calming-essentials, fireworks-storms, frontpage, grooming, home-alone-separation, mealtime-feeding, settling-a-new-rescue, travel-outdoor. I loaded the two missing ones through tools/agent-browser/browse.mjs with --theme 193438056731 asserted (reported "193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]"), both HTTP 200, both cards:0, both rendering "No products in this collection yet." So the empty state IS observable, I observed it, and run #1's quick-win #25 reproduces exactly as written — including "under a full-size banner": the screenshot shows the full sage banner, the intro line and four scenario chips above one grey sentence. The finding's correction to run #1 must be withdrawn, and its floated suspicion that run #1 "inferred rather than observed" is the same class of error the brief warns about, aimed at the previous run instead of the owner. Two lesser defects: the page does carry a "← Back to Shop all" link above the banner (absent from the empty state itself, but the route exists), and the cited screenshot scratchpad/empty-desktop.png is timestamped 2026-08-12 12:52 from a prior session's empty.mjs, presented as "screenshot of the attempt" in a run dated 2026-08-13. No contradiction with STATUS.md, which is silent on empty collections.


**[V65] HELD** — Independently reproduced, not dressed-up inference. I loaded all five collections in Playwright through the CONNECT tunnel with window.Shopify.theme.id asserted as 193438056731 on every navigation, at 1440x900 and 375x812, and re-shot both cited screenshots (which do exist and do match). .tdn-coll-banner__desc is absent on calming-essentials, mealtime-feeding, grooming and travel-outdoor, and present-but-clipped on settling-a-new-rescue ending 'home is a...'. Because sections/dog-nook-collection.liquid guards the paragraph with {%- if collection.description != blank -%}, the missing node proves the field is genuinely blank; the published theme's render of /collections/calming-essentials shows the H1 with no prose block at all, confirming the emptiness is in the Shopify data, not a draft-theme artefact. The core claim stands, but four things need correcting. (1) The 230px is the wrong banner's measurement: the four empty banners are 1180x161px at 1440 and 375x137px at 375; 233px is the height of the settling banner, the one that HAS a description. (2) The banner is not the first thing below the header - a 22px 'Back to Shop all' link sits between them at y=167. (3) The region is not content-free: an intro paragraph (y=384) and four scenario chips (y=453) render immediately beneath the banner on every collection, which the finding omits. (4) The truncation loss is understated - truncatewords:40 drops the description's entire second paragraph, which carries the ASA-safe line 'Comfort and enrichment tools, not medical treatments' plus the 30-day guarantee, verified against the published theme's full render. The innocent explanation not ruled out: the section has an 'intro' setting built for exactly this copy, so a title-only banner may be deliberate design rather than neglect. Following that thread exposes a worse defect the finding missed - templates/collection.json sets only banner_tone and show_filters, so the schema DEFAULTS for intro and scenarios render identically on all five collections, meaning Grooming, Mealtime and Travel all read 'Calm, considered kit for dogs who find the world a bit much' and all list 'Fireworks & storms | Settling a new rescue | Home alone | Vet & travel days'. No contradiction with STATUS.md, which makes no claim about collection copy; recon #1 item 25 touched the same banner from a different angle (empty collections) and is not duplicated.


**[V66] HELD** — Core claim verified independently by loading the page, not inferred. I confirmed the render really is theme 193438056731 (Shopify's inline JSON: {"id":193438056731,"isDraft":true,"name":"The Dog Nook — Design install (CRO working copy)"}) — the finding only "asserted" this, and the myshopify preview URL does 302 to thedognook.co.uk dropping the query param, so the check was needed. Deployed card markup carries data-price/data-title/data-date and the __ph span; the repo copy at /home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid carries neither. The warning is correct and the stakes are HIGHER than stated: /pages/shop on the draft theme has a working <select data-tdn-sort> that consumes those attributes (the collection page the finding inspected has no sort UI), and the repo's sections/dog-nook-shop.liquid has only a decorative sort_label string with no select and no JS — so the section drifted too. TWO SUPPORTING CLAIMS REFUTED. (1) "never committed" is false: git rev-list --all + git grep finds data-price in .liquid on origin/claude/dog-nook-file-review-gl61uw (b4d9516, 64d9fa0, 2026-07-24); git show 64d9fa0:dog-nook-theme/snippets/dog-nook-product-card.liquid IS the deployed version verbatim. The finding grepped only the current branch's working tree. That branch forked at 261e3de (2026-07-21), after this branch's 597c53f "reconcile git with deployed" (2026-07-22), so this branch simply never received the work. This changes the fix: you do NOT need to scrape the deployed snippet, you can git show it. (2) The byte-size JS corroboration is invalid reasoning: I downloaded all seven deployed assets and every one is smaller than git (cro2 2979/4180, gallery 1123/1834, quiz 2596/4046, dog-nook.css 9244/11588) because deployed assets are MINIFIED — git dog-nook.js opens with a comment block, deployed with (function(){"use strict";. By selector-set comparison, deployed dog-nook.css and dog-nook-cro3.css are content-identical to git. Drift in dog-nook.js is real but only provable functionally (deployed has initReveal/initStickyQty; git has initFreeShip/renderFreeShip). Innocent explanations considered and ruled out: not a different section rendering its own card markup (git's collection.liquid and shop.liquid both {% render %} the snippet, and no other file references tdn-product-card); not a build step injecting attributes (no deploy/minify tooling in the repo — /home/user/sc/tools holds only agent-browser); not owner error at all — this is ordinary unmerged branch divergence, and the finding names no owner fault, so no owner-blame inference is at issue. Does not contradict STATUS.md lines 118-119; it extends them. I modified nothing; downloads went to scratchpad only.


**[V67] KILLED** — Compound finding: part 1 is real and I reproduced it; part 2 is a misread of a full-page screenshot and does not survive. So it cannot be accepted as filed.

HOW I CHECKED — I loaded the page myself (Playwright via tools/agent-browser proxy) at 320/360/375/390/414 x 812, isMobile, on /collections/calming-essentials, asserting Shopify.theme.id === 193438056731 on every load. Scripts: scratchpad/REFUTE-PW2.mjs, REFUTE-PW4.mjs, PW5.mjs. New captures: PW3-A-fold-with-banner.png, PW5-375-card.png, PW5-320-card.png.

PART 1 — PRICE WRAP: CONFIRMED, but the scope is wrong. .tdn-product-card__save returns TWO client rects at 375: {top:386,left:118,w:31} and {top:410,left:15,w:39} — "Save" at the end of line 1, "£14.98" at the start of line 2. PW5-375-card.png shows it visually, and it is worse than described: the badge has border-radius:999px, so the pill background splits into two half-pills (rounded-left "Save", rounded-right "£14.98"). Two independent corrections: (a) it is NOT "only at 375px" — it wraps at 360, 375, 390 AND 414; 320 is the single width where it stays intact (one rect, w=73). The finding understates reach. (b) The proposed fix breaks a standing rule: .tdn-product-card__save is defined in assets/dog-nook-cro.css:18, which is on the DO-NOT-TOUCH list (three conflicting versions, canonical undecided). So "effort: quick / owner: claude" is not right as filed. Card width 148.5px content + 15px padding each side ≈ 179px — the finding's measurement checks out.

PART 2 — COOKIE BANNER: DOES NOT HOLD. Measured div.tdn-cookie: position:fixed, z-index:90, at 375x812 it occupies y=613→796 with gapFromViewportBottom:16 — a bottom-anchored card over 22.6% of the viewport, not "a large panel over the middle of the viewport". The "middle" reading is a full-page-screenshot artifact: the cited ce-mobile.png is 375x2719, i.e. a fullPage capture, not the "375x812 capture" the evidence field claims. Playwright composites position:fixed elements at their scroll-0 position, so a bottom-anchored banner lands ~23% down a 2719px image and appears to float over the product grid. The tell is that the Shopify preview bar in the same image is displaced identically.

The specific evidentiary claim is false at the cited width: banner bottom = 796, FDK price block top = 801 → cookieOverlapsPriceBlock: FALSE at 375. The prices are not obscured — they sit below the fold (801–851 vs fold at 812). The banner covers the first row's IMAGES. The finding's own screenshot shows £34.99/£49.97/Save £14.98 and £11.99 fully legible, contradicting "obscures both the First Days Kit and Lick Mat prices".

INNOCENT EXPLANATIONS NOT RULED OUT: (i) a bottom-anchored dismissible consent card is the standard intended pattern, and a UK store is legally required to gate non-essential cookies — the owner did nothing wrong here; (ii) "It also overlaps the bottom card row on desktop" is simply what position:fixed does — an element pinned to the viewport bottom overlaps whatever is at the viewport bottom. That is the design, not a defect. Neither was named or excluded. (iii) Unflagged confound: the dark Shopify preview bar in the screenshot is admin-only (it renders because preview_theme_id is set) and covers the banner's own Decline/Accept buttons; a real shopper never sees it, so no "first thing a phone visitor sees" claim can be built on that image. Prior captures R2-375x812-withPbar.png / -noPbar.png already isolate this.

PART 3 — THE POSITIVE: HOLDS. Independently confirmed div.tdn-cookie renders with working Decline / Accept all on theme 193438056731. layout/theme.liquid is genuinely absent from the repo (I checked — only snippets/dog-nook-cookie-banner.liquid exists), so run #1 was right that it could not be checked from source; the live render settles it. Recon item #6 (report line 135) can be closed.

STATUS.md: no contradiction. It lists the cookie page/banner as done and UK-compliant; consistent. Incidental positive worth recording: the card renders "Save £14.98" and 49.97 − 34.99 = 14.98 exactly, so the collection card is NOT affected by the "says save £15, truth £14.98" defect STATUS.md flags elsewhere.


**[V68] HELD** — Substantively verified, with two small measurement corrections. I loaded the collection page in a real browser through tools/agent-browser, asserted Shopify.theme.id = 193438056731 (role: unpublished) so this is not the L002 wrong-theme trap, and reproduced the core claims: 3 product cards (The First Days Kit, The Lick Mat, The Calming Donut Bed), zero <img> inside any card, computed aspect-ratio 4/3, computed media background rgb(139,149,120) = #8B9578. The three .js endpoints all return images: 0, media: 0, featured_image: null. `the-new-rescue-bundle-1` returns the title "The First Days Kit" — a stale handle from a rename, a non-obvious detail that only comes from actually fetching, which corroborates howKnown: loaded-page. CSS line 109 is exactly as quoted. Two errors, both immaterial to the conclusion: (1) page-wide img count is not stably 0 — one of my three runs returned 1, a 150x150 data:image/svg+xml placeholder, so "Not one image element" overstates a flaky number; (2) the desktop media box measures 279.5x209.63 at 1440px, not 282x211 (mobile 176.5x132.38 does round to the stated 177x132). One framing caveat: the page-wide zero is partly caused by the un-uploaded logo (STATUS.md blocked item 5), not only by product photos, so the per-card and .js evidence is what actually carries the claim. No owner-blame inference is made, so there is no repeat of run #1's error class; I separately considered whether an agent could partially unblock by uploading CJ supplier images via the Shopify MCP and found no supplier image source in the repo, plus run #1's own brief argues against stock shots, so blocker: physical-world stands. It agrees with STATUS.md rather than contradicting it. The 4:3 collection-card ratio is a real increment over run #1, whose ratio note concerned the PDP gallery's 460px crop.


**[V69] KILLED** — The evidence is real, not dressed-up inference — the page was genuinely loaded. settle-desktop.png shows the exact described render (three gold-star cards, Settle-In Bundle pale + 'New', Shopify draft bar), settle.html carries "theme":{"id":193438056731,"isDraft":true} so it is the correct theme (not the L002 wrong-theme trap), and the reported computed colours match dog-nook-cro.css exactly (.tdn-star #E0B84C = rgb(224,184,76); .tdn-star--empty #d8cdb9 = rgb(216,205,185)). The snippet gate (count_num > 0 and rating > 0) is as described, and the scoping claim is correct: settle.html contains no "verified" string and no aggregateRating — both are PDP-only (dog-nook-pdp-extra.liquid emits "Based on {{ rcount }} verified reviews").

The finding fails on its purpose. It is written as a closure ("record as a clear pass so a future audit does not re-raise it") and asserts the ratings are "correctly attributed", but it checked only colour and empty-state logic — it never checked a single value. Checking them: across every saved page there are 64 rendered star instances and all 64 read "4.8 · 10 reviews" — zero variance. Run #1 recorded the same at the data layer (rating=4.8, rating_count=10 on all eight products). Reconstructing individual review scores, the Donut Bed and Snuffle Mat each have exactly ten reviews, exactly eight 5s and two 4s, sum 48, avg 4.8 — identically shaped distributions.

This is NOT run #1's error repeated: I am not calling them fake. Review content is genuinely per-product and distinct (Donut Bed: Jamie K., Rachel D., Sophie M.; Snuffle Mat: Bethany R., Imogen S., Claire W.), and each aggregate is correctly computed from the reviews actually listed. Innocent explanations I could not rule out: the owner may have canvassed one cohort (single stall/local group) about each item, naturally yielding equal counts; 4.8 is an ordinary real average; aggregates may have been hand-entered from a real spreadsheet per dog-nook-theme/REVIEWS-SETUP.md, which documents setting these by hand. Distinguishing these requires the owner's private sales record — which is STATUS.md's open follow-up #2 and does not exist yet. So the state is "not proven", which is exactly why it must not be stamped closed.

It also overreads STATUS.md. STATUS's correction was narrowly that the reviews are genuine and must NOT be deleted; it never cleared the aggregates, and it explicitly leaves open that under DMCC 2024 the burden is on the trader to evidence them. "Do not re-raise" would suppress the very check follow-up #2 enables. STATUS.md is right; the finding's closure is the part that is wrong.

Minor additional correction: with rating 4.8 the snippet's frac >= 0.75 branch rounds UP, so 4.8 renders as five full gold stars (a visually perfect score) with the half-star branch dead. The numeral sits beside it so it is mitigated, but calling that unambiguously honest is a stretch in the one direction that flatters.


**[V70] HELD** — HOLDS — the mechanism is real and I reproduced it independently, but two claims need correcting and one innocent explanation the finding never considered caps its impact.

WHAT I DID (provenance): started tools/agent-browser/tunnel.py, wrote my own Playwright script (/tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/measure.mjs) using the same SPKI-pinning method as browse.mjs, loaded https://thedognook.co.uk/collections/all at 1440x1000 and 375x812, and asserted window.Shopify.theme on both runs: id 193438056731, "The Dog Nook — Design install (CRO working copy)", role unpublished — the correct draft, so L002 is not in play. I also curl'd the same page (theme id 193438056731 confirmed in the page JSON) and fetched every stylesheet the page actually links from the CDN.

THE EVIDENCE IS REAL, NOT DRESSED-UP INFERENCE. Every number in the finding is within rounding of mine:
- 9 product cards on /collections/all, hasImg:false on all 9 (verified by DOM query, not by assumption).
- The deployed markup is verbatim what was quoted: <div class="tdn-product-card__media" style="background: #8B9578;"><span class="tdn-product-card__ph" aria-hidden="true">The Calming Donut Bed</span><span class="tdn-product-card__tag">Calming</span></div>.
- Computed style on .tdn-product-card__ph: color rgb(46,42,34), font-size 14px, display inline, position static, visibility visible, opacity 1 — exactly as reported. Those values can only come from getComputedStyle in a real browser, so the page was loaded.
- Media box 279.5x209.6 desktop / 176.5x132.4 mobile (reported 280x210 / 177x132).
- Vertical overlap between __ph and __tag is exactly 9px on all 8 cards that have a pill, both viewports.
- Contrast #2E2A22 on #8B9578 recomputes to 4.535:1 — their 4.53 is right, and their conclusion that legibility is not the issue is right.
- Screenshot inspected (cropped and zoomed): the raw title straddles the media box's top edge with its glyph tops shaved by the rounded overflow:hidden corner, and the opaque white pill cuts through the lower half of the letters it crosses. Visibly broken.

THE CSS GAP IS REAL AND I CHECKED IT FURTHER THAN THEY DID. Their grep covered only the repo, which is a logical hole given they themselves argue the deployed theme differs from git. I closed it: I fetched the four deployed stylesheets plus base.css and compiled_assets/styles.css from /cdn/shop/t/12/assets/ and grepped all six, and I parsed all 21 inline <style> blocks in the rendered page. Zero occurrences of product-card__ph anywhere. Only the PDP sibling .tdn-pdp__ph is styled. So the conclusion is right even though the route to it was under-evidenced.

THE DRIFT CLAIM IS ALSO CONFIRMED. /home/user/sc/dog-nook-theme/snippets/dog-nook-product-card.liquid emits no placeholder at all — it renders the img only when p.featured_media exists and nothing otherwise. The deployed theme demonstrably emits a span git cannot produce, so snippet-level drift is real. That extends STATUS.md's asset-drift trap (which names only dog-nook.js and dog-nook-cro.css) rather than contradicting it. No STATUS.md contradiction to adjudicate.

INNOCENT EXPLANATIONS — one they missed, and I could not rule it out either:
1. Considered and rejected as exculpatory: the placeholder existing at all is deliberate, not owner error. Five sibling placeholders (__hero-a__ph, __bundle__ph, __bundlep__ph, __rt__ph, __pdp__ph) all exist and all take an editor-set label, and STATUS.md records photography as the launch gate with zero products imaged. So olive tiles with labels are the intended design-phase state. But the card placeholder is the one member of that family with no CSS rule, so the unstyled render is an oversight, not a decision. The defect survives this explanation.
2. NOT RULED OUT, and it matters: the deployed snippet almost certainly emits __ph only when p.featured_media is blank — that is the pattern in all five siblings and the git version of this very snippet already gates the img on p.featured_media. If so, the whole defect disappears the moment product photos are uploaded, which is the next owner action and the launch gate. I could not prove it: reading the deployed snippet needs the Shopify Admin themeFiles query and the MCP call required an approval I do not have, and every product currently lacks an image so there is no natural test case. This is inference, not observation.

WHY THE FINDING IS OVERSTATED:
- impact "high" is not supported. This is on an unpublished draft nobody but the owner can see, and it is plausibly self-clearing at launch (point 2). Medium at most.
- "measured overlap 59px wide x 9px tall on desktop, 62x9 on mobile... on every card" is wrong on the width. The overlap width equals the pill width and varies per card: 50.2, 53.2, 58.4, 58.4, 59.4, 59.4, 67.6, 67.6. The height is a constant 9px. I could not reproduce 62 at any card on either viewport — harmless imprecision, but it is not "measured on every card".
- "every imageless product card... the pill is drawn on top of the words" overreaches by one card. 9 of 9 show the raw title; only 8 of 9 collide. The First Days Kit has a blank product.type so no pill renders — its raw title just sits there alone.
- "you read 'The Ca[Calming]ng Donut Bed'" is dramatized. The pill occludes the bottom ~9px of a 17px line box, so the title stays largely readable; the damage is glyph tops clipped by the tile edge plus bottoms cut by the pill, not a word swallowed whole.
- The a11y side is better than implied: the span is aria-hidden="true", so screen readers get the title once, not twice. The duplication is purely visual.

POSITIONING NOTE (unprompted but load-bearing per POSITIONING.md): fixing this buys hygiene, nothing more. The pill currently reads "Calming" / "Travel" / "Grooming" — product taxonomy, not a 3-3-3 stage. Under "does this help someone work out which stage their dog is at", the higher-value change to this exact element is making the pill say the stage (Days 1-3 / Weeks 1-3 / Months 1-3). Whoever fixes the collision should fix the label at the same time, in one pass.


**[V71] HELD** — I tried to break this and could not. Every mechanical claim reproduces independently.

HOW I CHECKED (not the original author's method — I rebuilt it from scratch):
1. Read /home/user/sc/dog-nook-theme/assets/dog-nook.css. Lines 58/59/60 are exactly as quoted: `.tdn-wrap { max-width: var(--tdn-maxw); margin: 0 auto; padding: 0 var(--tdn-side-pad); }` / `.tdn-section { padding: 64px 0; }` / `@media (max-width:760px) { .tdn-section { padding: 44px 0; } }`. Equal specificity (0,1,0), `.tdn-section` second, shorthand → left/right reset to 0. Line numbers are accurate.
2. Grepped all sections/snippets/templates/layout: exactly 11 files combine the classes (quiz, product, collections-index, collection-list, shop, featured-bundle, prep-timeline, collection, why, bundle, reviews-placeholder). "Eleven" is correct, and dog-nook-shop.liquid:14 / dog-nook-product.liquid:15 are the right lines.
3. Ruled out an override: fetched the DEPLOYED minified dog-nook.css, dog-nook-cro.css, cro2, cro3, base.css, compiled_assets/styles.css and overflow-list.css from the CDN. `tdn-section`/`tdn-wrap` appear in dog-nook.css ONLY — 0 occurrences in all six others, and no inline <style> block redefines them. So nothing later re-adds side padding.
4. Chromium cannot reach the network in my sandbox, so I mirrored the real rendered HTML (curl, with a cookie jar so the preview cookie sticks) plus every stylesheet, served it on localhost and measured with Playwright. Confirmed the pages I measured are the DRAFT: `"themeId":"193438056731","themePublished":"false"`.
5. Measured /pages/shop at 375/760/761/900/1180/1440: `.tdn-section.tdn-wrap` computes paddingLeft/Right 0px at ALL of them. At 375: x=0, width=375. At 1440: x=130, width=1180 — i.e. the desktop gutter is purely `max-width + margin:0 auto` centring, exactly as claimed.
6. The CSS variable is exonerated correctly: `--tdn-side-pad` resolves to 20px at ≤760 and 40px at ≥761 on the very elements that show 0px padding.
7. Proof by contrast reproduced on the homepage at 375px: `tdn-wrap tdn-hero-b__inner` = 20px, `tdn-wrap tdn-trust` = 20px, `tdn-wrap tdn-newsletter__inner` = 20px, while all six `tdn-section tdn-wrap` blocks between them = 0px. The described scroll jitter is real. PDP: combined element 0px, plain `tdn-wrap` 20px. Collection: 0px.

INNOCENT EXPLANATIONS I RULED OUT:
- Parent supplies the gutter: no. Measured `.tdn` (paddingLeft 0px) and `.shopify-section` (0px) on every combined element.
- A CRO stylesheet patches it later: no (check 3).
- Deliberate edge-to-edge design: no — the same page gives 20px to sibling `tdn-wrap`-only blocks, and the H1/intro/chips (not just the grid) sit at x=0. This is a cascade accident, not a choice. No owner-blame inference is involved either way — it's a shorthand-vs-longhand collision, the single most common CSS footgun.
- Fix doesn't work: no. I applied the proposed longhand split to my mirrored copy and re-measured: 375px → paddingLeft 20px, paddingTop 44px; 900px → paddingLeft 40px, paddingTop 64px. Gutters restored, vertical rhythm preserved.

NO CONTRADICTION WITH STATUS.md — it never mentions gutters, side padding or mobile layout, and the run #1 recon report doesn't either. Nothing to reconcile.

TWO CORRECTIONS (neither undermines the finding):
- "the footer" does not belong in this bug. I measured it: the footer is the base theme's own `section section--full-width color-custom` / `footer-content` block, not a `tdn-section tdn-wrap`. Whatever its padding is, it is a different mechanism and must not be swept into this fix.
- Scope wording: this is sitewide on the DRAFT theme 193438056731 only. The published theme 193140818203 contains zero `tdn-*` markup, so nothing is broken for live shoppers today — it breaks the moment the owner publishes. Also a verification trap for the next run: `kkeqih-jm.myshopify.com/...?preview_theme_id=...` 301s to thedognook.co.uk and, without a preview cookie, silently serves the LIVE theme. I got the live theme on my first attempts at /, /products/... and /collections/... and had to re-fetch with a cookie jar. Anyone checking this with a plain fetch will see no `tdn-wrap` at all and may wrongly conclude the finding is fabricated.

POSITIONING: this is worth fixing above cosmetic priority because the worst-hit sections are the stage-matching ones — dog-nook-quiz.liquid (the 3-3-3 stage quiz), dog-nook-bundle.liquid and dog-nook-prep-timeline.liquid all render edge-to-edge on mobile. The tool that helps someone work out which stage their dog is at is the one that looks broken on a phone.


**[V72] HELD** — The central claim is PROVEN and I reproduced it independently. The page was genuinely loaded, not inferred. Critically, the theme assertion survives the L002 trap: the myshopify URL 301-redirected to thedognook.co.uk (exactly the silent-cookie-drop STATUS.md warns about), but the rendered HTML carries "theme":{"id":193438056731,"isDraft":true,"name":"The Dog Nook — Design install (CRO working copy)"} — the correct draft theme. The H1 "Comfort-first accessories" and the full intro paragraph are verbatim exact. A grep for stage vocabulary over the complete rendered body text returns zero hits beyond "settled mealtimes" and the product names "The First Days Kit"/"The Settle-In Bundle". The contrast is verbatim exact too: /collections/calming-essentials renders "Reach for these when: Fireworks & storms / Settling a new rescue / Home alone / Vet & travel days" on the same correct theme. It does not contradict STATUS.md; it is consistent with it. THREE CORRECTIONS. (1) The headline commits the run #1 error class — an owner-blaming inference with the innocent explanation unruled-out. The nine cards are #8B9578 because NO PRODUCT HAS PHOTOGRAPHY: STATUS.md launch blocker #1, explicitly owner-only and the stated reason the store cannot launch. Each placeholder renders the product's own name — a deliberate, competent stand-in, not a design failure, and not Claude's to fix. It must be dropped from the headline. (2) "identical" is factually wrong: 8 of 9 cards carry a category pill (Calming x2, Feeding x2, Grooming x2, Travel, Bundle). They share a background colour, not content. (3) It presents queued work as a discovery: START-HERE-NEXT-BUILDER.md TODO 3 item 1 already requires stages be said "everywhere they're listed" and item 3 already names custom.stage as the route. THREE THINGS IT UNDER-CALLED, all verified: The First Days Kit is the ONLY card of nine with no pill at all, so the two bundles are inconsistently tagged; custom.stage exists nowhere in repo or theme, so the per-card stage line needs the metafield created and populated first (more than "medium" effort); only two of three bundles are live (Complete Calm System is draft), so a three-door strip cannot link to three live products today; and the rendered section does not match git — dog-nook-shop.liquid is 78 lines with no card-tag markup and no sort dropdown, so the deployed section must be pulled from theme 193438056731 rather than edited in git (the documented asset-drift trap).


**[V73] HELD** — The evidence is real and I reproduced it independently — this is not dressed-up inference. I loaded https://kkeqih-jm.myshopify.com/pages/shop through tools/agent-browser with --theme 193438056731 and Shopify.theme.id asserted as 193438056731 "The Dog Nook — Design install (CRO working copy)" [unpublished] (so the L002 wrong-theme trap is ruled out), then read the DOM via getBoundingClientRect. Exactly five chips render inside .tdn-shop__chips, with exactly the hrefs claimed: All → /pages/shop (class "tdn-chip tdn-chip--on"), Calming → /collections/calming-essentials, Grooming → /collections/grooming, Feeding → /collections/mealtime-feeding, Travel → /collections/travel-outdoor. Measured height 40.8px each (the finding's "41px" is correct to rounding; it also reconciles with .tdn-chip in assets/dog-nook.css:128, padding 9px 16px + 1px border + a 13px/1.6 line box). The judgement against POSITIONING.md also survives: the chips are a supply-side taxonomy and nothing else on that page asks about stage — the rendered page text contains no 3-3-3 or stage language at all, the h1 is "Comfort-first accessories", and the homepage does not compensate (templates/index.json hero is "Less anxious. More at home." with product-led CTAs, not three stage doors). I could not find an innocent explanation that rescues the chips: it is not that stage routing lives elsewhere, and it is not owner error either — the section and template arrived in a single pre-positioning commit (ecaccab "Add dedicated Shop-all section + page template"), and the 3-3-3 restructure is explicitly still unstarted work. It does not contradict STATUS.md. Three corrections are needed, none fatal. (1) "The one control on the page" is false on the deployed draft: there is a second, working control — a real <label>Sort by</label> + <select data-tdn-sort data-tdn-bound="1"> with six options. The chips are the only *navigational/filtering* control, which is what the argument actually needs. (2) The cited file has drifted from what is deployed: git's sections/dog-nook-shop.liquid renders sort as a static <span>{{ s.sort_label }}</span>, the draft renders a JS-bound select (bound by dog-nook.js, the file nobody may touch). The chip loop at lines 20-23 is byte-identical to what renders (including the telltale class="tdn-chip " from the empty active branch), so the structural claim stands — but the citation should be to the deployed theme, not assumed identical to git. (3) The effort/ownership claim is understated. I queried the Admin API: the store has 8 collections — calming-essentials (6), fireworks-storms (5), grooming (3), home-alone-separation (5), frontpage (0), mealtime-feeding (4), settling-a-new-rescue (4), travel-outdoor (1). The four category targets all exist, but no stage collection exists. Shipping stage chips is therefore not "theme-settings work" alone; it needs three collections created and every product assigned a stage first — catalogue work under STATUS.md's "one chat at a time on the catalogue" rule — and chips deployed without them would be dead links. Finally, this is a page-level instance of already-queued work, not a new discovery: START-HERE-NEXT-BUILDER.md TODO 3 item 5 already says restructure settling-a-new-rescue into the three stages and make it the spine of navigation. "Impact: high" is generous for the shop page specifically, since POSITIONING.md names the homepage hero as the single biggest visible change; medium is fairer.


**[V74] HELD** — The load-bearing claim is real and I reproduced it independently rather than trusting the finding. Loaded /pages/shop with the theme asserted (browse.mjs --theme 193438056731 returned theme 193438056731, role unpublished, so the L002 preview-cookie trap did not fire), screenshotted at 1440x1000 and 375x812, and queried the DOM: all 9 .tdn-product-card elements return hasImg:false, every .tdn-product-card__media carries style="background: #8B9578;", and document.querySelectorAll('img').length is 0 for the whole page. I then tested the one innocent explanation that would have killed the finding — images existing in Shopify but not rendering in this theme — via the theme-independent storefront endpoint /products.json, which returns 9 published products with images:0 and featured image null on every one. So it is a real catalogue gap, not a theme bug and not dressed-up inference. It confirms STATUS.md rather than contradicting it (Blocked #1: photos are the launch gate, "zero of the real products have images"), and it does not repeat run #1's error class — the genuine offline-sold reviews are left alone. Three corrections are needed, none fatal. (1) The media box is not an undifferentiated block: the DEPLOYED snippet emits <span class="tdn-product-card__ph" aria-hidden="true">{title}</span>, which the screenshot shows rendering as unstyled dark body text clipped at the tile's top-left edge and colliding with the pill. That span is absent from git's snippets/dog-nook-product-card.liquid and no .tdn-product-card__ph rule exists in git's dog-nook-cro.css (only .tdn-pdp__ph) — the documented asset drift, and the mechanism behind the broken look. The finding buries this in an aside while its headline asserts a flat block. (2) "The only differentiators are the title, the pill and the price" is wrong twice over: the star line also differs (8 cards read "4.8 · 10 reviews", The Settle-In Bundle reads "New"), and The First Days Kit renders with NO pill at all because product.type is blank — the flagship stage-one bundle is the least-labelled tile on the grid, a positioning defect the finding missed and an agent can fix today. (3) The blocker rationale overreaches: "requires a camera and the physical goods in hand, which no agent can do" is true only of taking new original photographs. Not ruled out — the owner sold these by hand before the store existed, so the goods and possibly usable photos are already theirs, and supplier imagery is the ordinary route for this catalogue. Correct classification is owner-supplies-or-approves-source-images, after which upload is agent work. Minor: at 1440x1000 row 1 sits at y=464 and row 2 at y=807, so 8 cards begin above a 1000px fold — four full tiles plus the tops of four more, not a clean "four". Mobile is 2-up as stated (2-column grid, first row top y=601 of an 812px viewport). Caveat on value, not truth: this re-verifies an already-documented gate (STATUS.md Blocked #1, recon-report item 130, which already carries a shot-list brief), so it should be logged as confirmation plus the two new card-level defects, not as a new finding.


**[V75] HELD** — The evidence is real and I reproduced it independently — this is not dressed-up inference. Method: started tools/agent-browser/tunnel.py, then ran a modified copy of browse.mjs (at /tmp/claude-0/-home-user-sc/4168f571-4346-5e96-8c39-21b2f2c91a21/scratchpad/probe.mjs) with --theme 193438056731 --mobile, which asserts window.Shopify.theme.id and refuses data on mismatch. https://thedognook.co.uk/collections/calming-essentials returned 200, theme 193438056731 "The Dog Nook — Design install (CRO working copy)" [unpublished], title "Calming Essentials for Anxious Dogs – The Dog Nook", H1 "Calming Essentials", exactly 3 cards (The First Days Kit, The Lick Mat, The Calming Donut Bed), document.querySelectorAll('.tdn-chip') = [], '[data-tdn-sort]' count 0, '.tdn-shop__chips' absent. Every literal in the finding's evidence string checks out.

I also verified the other half of the comparison, which the finding asserted but did not evidence: on /pages/shop (same theme, same viewport) there ARE 5 chips (All → /pages/shop active, Calming → /collections/calming-essentials, Grooming → /collections/grooming, Feeding → /collections/mealtime-feeding, Travel → /collections/travel-outdoor) and there IS a REAL sort control — `<label class="tdn-shop__sort"><span>Sort by</span><select data-tdn-sort aria-label="Sort products" data-tdn-bound="1">` with 6 options. So the "you lose a working control" premise is sound.

Important trap I nearly fell into and you should not: git is STALE here. /home/user/sc/dog-nook-theme/sections/dog-nook-shop.liquid renders only a decorative `<span class="tdn-shop__sort">{{ s.sort_label }}</span>` ("Sort label (visual)" in the schema) and contains no data-tdn-sort anywhere in the repo. Working from git would have produced a confident refutation ("the sort is fake, nothing is lost") that the loaded page disproves. This is section-level drift beyond the dog-nook.js / dog-nook-cro.css drift STATUS.md already logs.

Three corrections to the finding, all from the loaded pages:

1. "their only route is the ← Back to Shop all link" is FALSE. At 375px I enumerated links with a non-zero box in the top 200px of the collection page: ['Skip to content', 'Shop -> /pages/shop', 'The Dog Nook -> /', '← Back to Shop all -> /pages/shop']. The header "Shop" link is visible without opening any menu and lands on the same chip bar. So it is a one-click return via two visible routes, not a dead end. "One-way door" and "dead end" overstate it; the accurate word is that lateral movement costs a detour.

2. impact:medium is too high. The sort control on this collection would govern 3 cards (I counted them), and 9 across the entire shop page. Sorting 3 products is worth almost nothing today. This becomes medium only after the ~12 draft SKUs are sourced and activated (STATUS.md, BLOCKED item 2).

3. The proposed remedy fails the POSITIONING.md test and should not ship as written. The chip axis is Calming / Grooming / Feeding / Travel — a product-category taxonomy answering "what kind of thing is this?", not "which stage is my dog at?". Cloning that bar onto collection pages would faithfully propagate the wrong axis onto more surfaces. POSITIONING.md's stated test ("does this help someone work out which stage their dog is at, and get them the right thing for it?") is failed by the chip bar itself, on either page. The mixed taxonomy is visible in the data: the top card inside the category collection "Calming" is the stage bundle "The First Days Kit".

Innocent explanations for the owner, per the run-#1 rule. I found one and it is real, so the finding must not be written as owner oversight: git commit 73a7cd0 ("Fix chip/card text colour and drop tag chips on collection pages", 15 Jul) DELIBERATELY flipped show_filters from true to false in both dog-nook-collection.liquid and templates/collection.json, with the reason "Default single collection pages to no tag-filter chips (not in the spec) — removes the confusing empty 'All' chip." That is a different control (tag chips within one collection, not cross-collection nav), so it does not fully explain the absence — but it proves chips on collection pages were considered and rejected once on purpose. Second innocent explanation: the "← Back to Shop all" link exists on the live draft and is NOT in git, meaning someone already noticed this navigation gap and purpose-built an affordance for it. Whoever built it made a considered call; the correct framing is "the shipped affordance is weaker than the chip bar it replaces", not "nobody noticed".

Contradiction with STATUS.md: none. STATUS.md does not mention chips or sort. It is consistent with the drift warning and with the "always assert Shopify.theme.id" rule, both of which I followed.

blocker:none is CONFIRMED, and I checked the specific risk: the sort logic is an inline `<script>` inside the shop section (1780 chars, matched /tdn-sort/), not in assets/dog-nook.js. Porting it therefore does not require touching the forbidden dog-nook.js / dog-nook-cro.css files.


**[V76] HELD** — The evidence is real, not dressed-up inference. I reloaded /pages/shop with the theme asserted as 193438056731 (unpublished draft) and reproduced every DOM detail the finding claims, down to the exact attribute set (data-tdn-sort, aria-label="Sort products", no enclosing form), all six option values (featured, price-asc, price-desc, title-asc, title-desc, date-desc), the nine-card default order, and the price-asc order. Nothing in it reads as guessed.

The causal claim survives too, and I proved it from code rather than inferring it: the inline script on the page has NO branch for "featured" (it does items = original.slice() then re-appends), so "Featured" is only whatever Liquid rendered; and page.shop.json sets no collection, so the section falls back to collections['all'] — a system pseudo-collection that cannot carry a manual/curated order at all. Innocent explanations I considered and ruled out: (a) "the owner curated this order and it happens to be A-Z" — impossible, there is no setting where an order could be stored; (b) "a collection with sort_order ALPHA_ASC was deliberately chosen" — no collection is set; (c) "Featured is Shopify's standard label so it is not the theme's fault" — true as context, but here it labels an order nobody chose. The observed order is identical to what the title-asc option produces, which is the tell.

Where it overstates: "scattered mid-grid" is wrong at desktop. The grid computes to grid-template-columns of four 281.5px tracks, and the Calming Donut Bed, Car Boot Liner, First Days Kit and Grooming Glove all render at top: 464px — the £34.99 First Days Kit is in the FIRST row, not buried. At 375px the grid is two columns and it falls to row 2 (top 908 vs 601); the Settle-In Bundle is row 2 desktop / row 4 mobile. "Nothing merchandises the ladder" is also too absolute: the Settle-In card carries a "Bundle" tag and both bundles show true savings badges (Save £14.98 / Save £7.98), and the footer links The First Days Kit directly. What is genuinely absent is any stage framing — the filter chips are All / Calming / Grooming / Feeding / Travel, i.e. categories, where POSITIONING.md says the three stages should be the spine. That is the sharper and more defensible version of the point.

The claim about run #1's quick-win #19 is right but dangerously incomplete, and it is where I would have failed the owner the way run #1 did. The decorative span is NOT a fabrication by run #1: the working tree at /home/user/sc/dog-nook-theme/sections/dog-nook-shop.liquid line 27 still renders <span class="tdn-shop__sort">{{ s.sort_label }}</span>, and /home/user/sc/dog-nook-theme/templates/page.shop.json line 9 still sets "sort_label": "Sort: Best selling ▾". Run #1 read the repo and was correct about the repo. The deployed draft matches a different branch — the real select exists at git 64d9fa0d (reachable only from origin/claude/dog-nook-file-review-gl61uw), which also paginates by 48 rather than 24 and adds data-tdn-shop-grid. So the deployed draft is AHEAD of the checked-out branch, and deploying the current working tree to 193438056731 would replace the working select with the fake caret. "Do not action #19" is right; "there is nothing to fix" is not. I also loaded the published theme 193140818203 for contrast: /pages/shop there has no sort control and no .tdn-grid-4 at all (zero selects, zero data-tdn-sort), so this is a draft-only element.

No contradiction with STATUS.md. STATUS.md says nothing about sorting. It does document asset drift for dog-nook.js and dog-nook-cro.css only; this finding incidentally proves the drift extends to SECTION liquid too, which STATUS.md does not yet record. Impact "medium" and effort "quick" are fair — but the fix is a merchandising decision (order the grid by stage), not a code change to the select, which works correctly.

One caveat neither the finding nor STATUS.md mentions: the sort is purely client-side over cards already in the DOM, does not change the URL, does not persist across navigation, and would silently mis-sort if the catalogue ever exceeded the 48-per-page paginate.


**[V77] HELD** — HOLDS — I reproduced it myself rather than taking it on trust. Method: started tools/agent-browser/tunnel.py, drove Playwright/Chromium to https://kkeqih-jm.myshopify.com/ with the preview cookie primed, and asserted window.Shopify.theme.id === 193438056731 before reading anything (the L002 trap). At 375x812 the numbers land almost exactly on the reported ones: .tdn-emailpop appears at 12070ms with zero scrolling at rect 0,0,375,812, computed z-index 90, position fixed; .tdn-cookie is still present, hidden=false, rect 16,613,343,183, z-index 90; compareDocumentPosition confirms the popup is inserted after the banner, so it paints above at equal z-index. elementFromPoint at both cookie buttons returns DIV.tdn-emailpop__backdrop (rgba(46,42,34,.5), full viewport). A screenshot shows the banner dimmed behind the modal. Source agrees: assets/dog-nook.css:153 gives .tdn-cookie z-index 90 and snippets/dog-nook-email-popup.liquid:29 gives .tdn-emailpop z-index 90; the popup script appends to document.body on a 12s timer with no consent check. The evidence is real, the page was genuinely loaded, and this is not dressed-up inference.

The reporter's own exculpatory note is correct and I verified it independently: before the popup exists (t~2.5s) elementFromPoint at the cookie buttons returns an IFRAME whose id is PBarNextFrame, src https://cdn.shopify.com/shopifycloud/preview-bar/index.html, sized 375x812 at 0,0 — the Shopify preview bar, present only in preview mode. A real page.click() on Decline at t~3s does time out, and that is the preview bar's doing, not a production bug. Ruling that out and saying so was the right call.

Six corrections matter for scope, severity and the fix.

1. NOT a mobile issue. Same probe at 1440x1000: popup 0,0,1440,1000 at 12085ms, cookie banner 360,877,720,107, same z-index 90, same stacking. The overlap is viewport-independent; only the proportion of screen covered changes. Titling it "on mobile" understates it.

2. 12.8s is the SLOWEST path. The script also fires at >45% scroll depth. On a clean third context I scrolled to 60% and the popup was in the DOM 874ms after load. A shopper who actually browses gets it in about a second.

3. "Asked for their email before they have been able to accept or decline cookies" overstates the harm. The banner renders at load and is answerable for the full 12s (in production, where there is no preview bar). Dismissal is one tap: after clicking "No thanks" I confirmed the popup is gone, .tdn-cookie is still present with hidden=false, and tdn_consent is still null — the banner survives intact and is answerable. The consequence is that consent gets obscured and deprioritised, not blocked.

4. No PECR / UK GDPR breach, and the write-up should not read as claiming one. applyConsent() in dog-nook.js runs only from a button click handler, so nothing non-essential is granted while the popup is up. This is a tone-and-sequencing defect against the store's honesty position, not legal exposure — worth stating so it is not triaged as a compliance emergency.

5. Half the proposed fix is actively wrong. Giving .tdn-cookie a higher z-index than the popup would leave the banner mouse-clickable but not keyboard-reachable, because the popup installs a Tab focus trap confined to .tdn-emailpop__card (dog-nook-email-popup.liquid:66-74). That trades a UX annoyance for an accessibility regression. Gating the popup on consent is the whole fix.

6. Deploy hazard the finding did not flag. The deployed snippet has drifted from git: the live draft's button reads "Get my 10% code", while snippets/dog-nook-email-popup.liquid:21 in this repo reads "Send my code". STATUS.md documents asset drift only for dog-nook.js and dog-nook-cro.css — it extends to this snippet too. Anyone fixing this by pushing the repo file will silently revert deployed copy. Incidentally this is further proof the reporter loaded the page: that button string exists nowhere in the repo.

STATUS.md: no contradiction — the opposite. It closes an open question. Run #1's item 6 said the cookie banner's presence in layout/theme.liquid could not be checked and the site might be running with no consent gate. It is present and rendering on draft 193438056731.

No owner-blame inference is involved, so the run-#1 failure mode does not apply — this is a sequencing defect in two agent-built snippets.

Severity: drop medium to low-medium. It hits every visitor on every non-cart page, which argues up; consent is never actually prevented, no cookies are mis-set, and one tap clears it, which argues down. Effort "quick" is right — a two-line guard.

One incidental observation, outside this finding but seen on the same loads: the homepage hero on draft 193438056731 reads "Less anxious. More at home." Given the standing rule that the ASA treats anxiety as a health condition and "reduces anxiety" is not allowed, a hero promising "less anxious" looks like the same claim in shorter words. Flagging, not adjudicating.


**[V78] HELD** — The core defect is REAL and I reproduced it independently — this is not dressed-up inference. HOW I KNOW: started tools/agent-browser/tunnel.py, loaded https://kkeqih-jm.myshopify.com/pages/shop with --theme 193438056731 asserted (browse.mjs reported "theme : 193438056731 (The Dog Nook — Design install (CRO working copy)) [unpublished]" — so L002 is not in play), then ran my own Playwright script measuring getClientRects() on every .tdn-product-card__save, plus clipped screenshots with the menu-drawer overlay removed. RESULTS: at 375px every card is 178.5px wide (the finding's "179px" is right, and the fact it matches to 0.5px is itself evidence the author really measured a rendered page rather than guessing). The Settle-In badge has getClientRects().length === 2 — box1 {x:116, w:31} = "Save" on line one, box2 {x:15, w:34} = "£7.98" on line two — and the clipped screenshot shows the terracotta pill visibly cut flat on its right edge at the end of line one with a second pill fragment below. computed white-space is "normal". Price element height 49.59px vs 24.8px line-height, i.e. two lines. So the described breakage is exactly as claimed.

BUT the finding contains one FALSE claim, and it is the one sentence that was inference rather than observation: "The First Days Kit's longer line ... happens to fit because it sits in a row where the sibling card is shorter." It does not fit. The First Days Kit badge splits identically — getClientRects().length === 2, {x:118,w:31} "Save" / {x:15,w:39} "£14.98" — and I have the screenshot showing "£34.99 £49.97 Save" / "£14.98" with the same split pill. The stated cause is also mechanically impossible: the grid is `.tdn-grid-4` → `repeat(2, 1fr)` below 900px, so every card is exactly 178.5px regardless of sibling content; sibling height/content cannot change a card's width. That sentence is the finding's own run-#1-class error — a plausible-sounding causal story attached to a real observation.

Viewport sweep on the live draft: 320px → 1 rect (badge wraps whole onto line 2, which looks correct and is exactly what the proposed fix would produce); 360/375/390/414 → 2 rects (broken); 430px and above → 1 rect. So the break window is roughly 355–425px, i.e. Android 360, iPhone SE/8 375, iPhone 12–15 390, Pro Max 414 — essentially every common phone, not an edge case.

Innocent explanations I ruled out, and how: (a) "the author never loaded it and reverse-engineered from CSS" — ruled out, the 178.5px width contradicts what the git CSS predicts (git says --tdn-side-pad 20px → (335−18)/2 = 158.5px), so 179px could only have come from the rendered page; (b) "wrong theme" — ruled out by the asserted Shopify.theme.id; (c) "the popup/overlay caused it" — ruled out, I removed the fixed-position drawer and re-measured, same result; (d) "the owner shipped broken savings maths" — explicitly NOT claimed here and correctly so: rendered text is "£34.99 £49.97 Save £14.98" and "£64.99 £72.97 Save £7.98", both true against the recon report's component totals. This is a wrapping defect in a generic shared card snippet, not owner carelessness.

No contradiction with STATUS.md. I checked the finding's supporting claim about the PDP: /products/the-settle-in-bundle on the same draft still renders "£49.97" / "Bought separately" / "BEST VALUE · SAVE £15" alongside "You save £7.98" — so STATUS.md's open compliance risk is intact and lives on templates/product.bundle.json, exactly as the finding says. Both are right; they are different surfaces.

Two corrections to the remediation, which as written would break a standing rule. The finding says to fix `.tdn-product-card__save` at dog-nook-cro.css:18. (1) That file is on the do-not-touch list (three conflicting versions, canonical undecided). (2) I fetched the asset actually served by theme 193438056731 — it is minified to one line and contains rules absent from git entirely (.tdn-sizebtn, .tdn-specs, .tdn-catbar__pill target-size rules), confirming STATUS.md's asset-drift warning: the git copy is NOT what is deployed, so "line 18" points at a file that would not be the thing shipped. The fix belongs in the section's own {% stylesheet %} block or dog-nook.css instead.

Positioning note: fixing the pill makes a discount badge legible. Under POSITIONING.md the sharper miss on this card is that "The Settle-In Bundle" carries no stage label at all — nothing on it says "Weeks 1–3 · settle" — so it still reads as a price tier rather than a stage. Worth fixing the wrap (it is quick), but it is cosmetic relative to that.


**[V79] HELD** — Tried to refute it; every checkable claim reproduced exactly, and the one unverified claim is now confirmed true.

EVIDENCE IS REAL, NOT DRESSED-UP INFERENCE. I independently loaded https://kkeqih-jm.myshopify.com/pages/shop through tools/agent-browser with the theme assertion passing (Shopify.theme.id = 193438056731, unpublished — so this is the draft, not the live theme). Nine cards render. The eight pills come back in exactly the order the finding reported: Calming, Travel, Grooming, Calming, Grooming, Bundle, Feeding, Feeding. The First Days Kit card (/products/the-new-rescue-bundle-1) returns tagText null and tagRect null. Identical at 1440px and 375px. This is not something an inference-only agent could have fabricated: no product_type value appears anywhere in the theme repo (grep for p.type / product_type hits only the card snippet itself), so the per-product pill text exists only in the live catalogue. Reproducing that exact eight-item sequence, including which single product is blank, requires having actually rendered the page.

THE UNCONFIRMED CLAIM IS NOW CONFIRMED. The finding honestly flagged that it could not read the admin value because the Shopify GraphQL call needed an approval. That limitation is genuine — graphql_query did return "requires approval" for me too. But search_products did not, and it returns productType: "" for The First Days Kit (gid://shopify/Product/10311327023387, handle the-new-rescue-bundle-1). The inferred cause was correct. The finding under-tried one tool but disclosed the gap accurately rather than dressing the inference up as verified, which is the right behaviour.

THE INNOCENT EXPLANATION WAS NAMED, AND IT IS THE TRUE ONE. This is the opposite of the run #1 failure mode. The finding does not accuse the owner of anything — it explicitly says "not that anything is broken or that anyone did anything wrong" and names the empty product_type as the likely and blameless cause. The catalogue history supports that reading: the seven category products and The First Days Kit were all created within six minutes on 2026-07-12 (an import), while The Settle-In Bundle was hand-created on 2026-07-20 with productType "Bundle" and tags ["bundle","calming"]. Ordinary drift between an import and a later manual entry, not negligence. I considered whether the blank is deliberate — the shop filter chips are only Calming/Grooming/Feeding/Travel, so a "kit" arguably has no category — but that defence fails, because The First Days Kit IS a member of the Calming Essentials collection and still renders no pill there.

NO CONTRADICTION WITH STATUS.md. STATUS.md says nothing about card pills or product_type; nothing there is inconsistent with this. (Unrelated aside for whoever maintains it: STATUS.md line 39 says "9 products sellable now + 2 live bundles", but the catalogue has 9 active products TOTAL, of which 2 are the bundles — 7 + 2, not 9 + 2. Separate issue, not this finding's problem.)

WHAT I CORRECTED. Four refinements, none fatal: (1) the caveat can be dropped, the value is confirmed; (2) scope is wider than reported — it also reproduces on /collections/calming-essentials, where First Days Kit is the FIRST card and the only unlabelled one of three, which is worse than the shop grid; (3) "two halves of the same ladder" understates it — POSITIONING.md defines a three-rung ladder, and the third rung (Complete Calm System £139.99) is still draft; (4) the effort rating needs splitting — setting a product_type in admin is genuinely quick, but the stage-label fix the finding actually recommends is NOT admin-only, because both dog-nook-shop.liquid:33 and dog-nook-collection.liquid:43 render the card with show_tag: true and no tag_text, so real stage pills need a metafield or tag_text path through the snippet. I also softened "least labelled thing in the grid" to the precise claim, and added that the taxonomy is inconsistent in both directions — "Bundle" is itself off-taxonomy against the chips.

Impact "low" is right. Every card is currently imageless (zero products have featuredMedia), the store is pre-launch and gated on photography, so this is a tidy-up, not a blocker.


**[V80] HELD** — The core observation survives an independent check. I loaded https://kkeqih-jm.myshopify.com/pages/shop with the draft theme asserted (window.Shopify.theme.id = 193438056731, role unpublished) using my own Playwright probe, and every rendered detail reproduces exactly: 9 cards; The Calming Donut Bed, Car Boot Liner, First Days Kit, Grooming Glove, Lick Mat, Nail Grinder, Slow-Feeder Bowl and Snuffle Mat each render "4.8 · 10 reviews" with five stars computed rgb(224,184,76), class tdn-star--full, aria-label "4.8 out of 5 stars, 10 reviews"; The Settle-In Bundle renders "New" with five stars computed rgb(216,205,185), class tdn-star--empty, aria-label "No reviews yet". This matches the code path in dog-nook-theme/snippets/dog-nook-stars.liquid. So the evidence is real page evidence, not inference, and the honest-empty-state praise is correct too. The finding also correctly declines to repeat run #1's error: it treats the reviews as genuine per STATUS.md and stays presentational, so it does not contradict STATUS.md on that point. TWO SUPPORTING CLAIMS ARE WRONG, both refuted by loading pages. (1) "the strongest proof line in the brand is invisible" and "the store currently gives them nothing to reinterpret it with" is overstated store-wide. I loaded the homepage: the "Kind words" section renders "from 80 real owner reviews" and, directly beneath it, "Collected from real owners in person and online. We never write our own." (source: dog-nook-theme/templates/index.json, section "reviews"). The provenance idea is already written and already rendering — it is absent from /pages/shop, from collection pages (I loaded /collections/calming-essentials: 3 cards with "4.8 · 10 reviews", no provenance copy) and from the PDP star line, but not from the store. That is an innocent explanation the finding did not rule out: the owner did not omit the proof line, they placed it once and it does not travel with the cards. (2) "which also settles the separate 'verified reviews' wording issue in the same stroke" is stale. I loaded https://kkeqih-jm.myshopify.com/products/lick-mat-1 on the draft theme: it renders "Based on 10 customer reviews", not "Based on 10 verified reviews". STATUS.md follow-up #1 is already fixed on the deploy target. The old string still exists in git at dog-nook-theme/snippets/dog-nook-pdp-extra.liquid:62 ("Based on {{ rcount }} verified review{% if rcount != 1 %}s{% endif %}"), which is the known git-vs-draft asset drift, not a live overclaim. A card microcopy line would not have touched the PDP wording anyway. Two smaller notes. The finding never names the URL it loaded — "see:shop" and the nine named cards let me identify /pages/shop and confirm it, but a reader could not have. And against the POSITIONING test ("does this help someone work out which stage their dog is at"), this is a credibility fix rather than a stage-matching one, so "medium" impact is generous; it is real but it is not a priority-tier item by the store's own stated test.


**[V81] KILLED** — The evidence is real — I independently reloaded /pages/shop at 1440x1000 with theme 193438056731 asserted (window.Shopify.theme.id confirmed, role unpublished) and reproduced the numbers exactly: .tdn-wrap x=130 w=1180 right=1310, gridTemplateColumns 281.5px x4, gap 18px, no overflow (scrollWidth 1440 = clientWidth 1440), intro copy's longest line ending at x=619. Those are not guessable; the page was genuinely loaded and howKnown "loaded-page" is honest. But three characterisations are wrong. (1) "eyebrow, H1 and intro paragraph are all constrained to roughly 490px" — only the paragraph is constrained. .tdn-eyebrow and .tdn-shop__h1 both measure width 1180px with max-width: none; their text ink stops at x=195.8 and x=494.5 only because the strings are short. The one real constraint is max-width: 520px (box width 520, right edge 650), not 490. (2) "nothing at all to the right of them out to x=1310" — the header's right side is occupied: label.tdn-shop__sort sits at x=1106-1310, y=399, holding a span "Sort by" and a working select[data-tdn-sort], and .tdn-shop__bar spans the full 1180px. So "the header uses about 40% of its width" is false for the header as a whole. (3) The significant error: "~690px of empty background above the fold, before a single product is visible" — the first card row measures y=464.5 to 788.8, fully inside the 1000px viewport, with a second row starting at y=806. The screenshot shows eight cards above the fold. No emptiness is scrolled past to reach a product. Innocent explanation not ruled out: the 520px cap is a deliberate authored readable-measure rule in the section's own stylesheet (dog-nook-theme/sections/dog-nook-shop.liquid:45), so the whitespace is the correct consequence of a normal typographic decision, not a layout defect — the finding never names this. It does NOT repeat run #1's error class (it makes no accusation about the owner), and it does not contradict STATUS.md, which is silent here. The positioning half of the finding survives and is correct.


**[V82] HELD** — Core claim independently re-verified against the deployed draft theme, not accepted on the finding's own evidence. Theme asserted on every load: Shopify.theme.id 193438056731, schema_name Horizon 4.1.1, role unpublished. On /products/lick-mat-1 the served HTML contains two <form method="post" action="/cart/add"> and zero product-form-component elements (Horizon's AJAX add-to-cart custom element), so Horizon's native handler never binds. I fetched the DEPLOYED assets/dog-nook.js from the CDN: it contains no addEventListener('submit'), no preventDefault and no /cart/add.js; data-tdn-atc appears only in the swatch handler that sets btn.disabled and btn.textContent. I then executed the POST myself rather than inferring: POST /cart/add with form_type=product&id=52507091960091 returned HTTP/2 302, location: https://thedognook.co.uk/cart. Full-page navigation confirmed. I fetched /cart with that item in the cart (theme asserted): cart-drawer-component 0, tdn-cartbar 0, "away from free" 0, "free delivery" 0 - no threshold messaging of any kind. I re-fetched the PDP with the non-empty cart and the drawer did render the bar ("You're £23.01 away from free delivery", 34% fill), proving the bar works and is simply absent from the page ATC sends shoppers to. This is consistent with store-config/cart-drawer.liquid line 11, {%- if settings.cart_type == 'drawer' and template.name != 'cart' -%}.

TWO CORRECTIONS. (1) The stated read-file confirmation is invalid. It cites snippets/dog-nook-pdp-form.liquid:50 and assets/dog-nook.js:47 from the git working copy, but the deployed theme does not match those files - the asset drift STATUS.md explicitly warns about. Deployed dog-nook.js is a different minified build with initStickyQty and initReveal and no initFreeShip; the deployed PDP form contains a stock line, quantity selector, a data-tdn-buynow button and an inline script, none present in git. The conclusion survives only because I re-verified against the deployed asset. (2) "Dumps every shopper" is overstated. In the deployed markup the first, filled CTA is <button type="button" data-tdn-buynow>Buy it now - Secure checkout</button>, backed by an inline script that already does fetch('/cart/add.js').then(() => window.location.href = '/checkout'). Add to Cart is the second, outline button. Desktop's primary path skips /cart entirely and goes to checkout; ATC is the secondary path, and the only button in the mobile sticky bar.

Innocent explanations ruled out: standard-actions-override.js (566 bytes) only reconfigures Shopify.actions.openCart/updateCart to target theme-drawer#cart-drawer and binds nothing to submit; Horizon's sticky-add-to-cart.js, quick-add.js and product-form.js all key off product-form-component, which is absent; auto_open_cart_drawer is off (auto-open count 0); no app script intercepts. Does not contradict STATUS.md.

Fix correction: a new asset is not required. The theme already proves the pattern inline - the buy-now AJAX handler is emitted from Liquid inside the section, not from a forbidden asset. An equivalent [data-tdn-atc] intercept can go in the same place, and Shopify.actions.openCart is already wired to the drawer. Neither dog-nook.js nor dog-nook-cro.css needs touching.


**[V83] HELD** — Holds, and I reproduced it first-hand rather than taking it on trust. Three things I tried to break, and could not:

(1) THE SUSPICIOUS URL. The finding cites https://thedognook.co.uk/products/lick-mat-1 — the live domain — while asserting theme 193438056731. That looks impossible, and it was my main refutation candidate: a bare curl of that URL returns Shopify.theme id 193140818203 ("Dog Nook PDP — working (Claude)", role main), with ZERO data-tdn-atc on the page. But curling the preview link WITH a cookie jar and following redirects reproduces the finding exactly: kkeqih-jm.myshopify.com/...?preview_theme_id=193438056731 returns 301 to https://thedognook.co.uk/products/lick-mat-1 (param dropped from the final URL) while the preview session persists, and the rendered page reports Shopify.theme id 193438056731, name "The Dog Nook — Design install (CRO working copy)", role unpublished. The URL/theme pairing is honest, not dressed-up inference. Method: curl -sL -c jar -b jar, then grep Shopify.theme.

(2) THE MECHANISM. On that draft render I counted 2 data-tdn-atc type="submit" buttons, 2 forms with action="/cart/add", and ZERO product-form-component wrappers. The live theme's PDP is the mirror image: 2 product-form-component wrappers, 0 data-tdn-atc. Both themes are Horizon 4.1.1, so the "not a Horizon default" claim is confirmed by direct comparison, not by memory of what Horizon does. Read-file side confirmed: sections/dog-nook-product.liquid:84 and snippets/dog-nook-pdp-form.liquid:49-53 emit raw {% form 'product' %} + submit button with no custom-element wrapper, and assets/dog-nook.js:47 only sets btn.disabled and swaps textContent on swatch change. The only fetch in the theme's JS is /cart.js at dog-nook.js:124 (read, not write). No /cart/add.js anywhere.

(3) THE CONSEQUENCE. I did not need to trust the click: POST id=52507091960091&quantity=1 to https://thedognook.co.uk/cart/add with no XHR headers returns 302 with redirect_url https://thedognook.co.uk/cart. And on the draft theme, /cart contains cart-drawer-component 0 times, tdn-cartbar 0, tdn-freeship 0 — while the PDP with a non-empty cart contains tdn-cartbar 4 times and literally renders "You're £23.01 away from free delivery". Cause is visible in store-config/cart-drawer.liquid:11, `settings.cart_type == 'drawer' and template.name != 'cart'`, with {% render 'dog-nook-cart-progress' %} at line 114 inside that guard. So the bar genuinely exists everywhere except the page the ATC sends you to.

INNOCENT EXPLANATIONS I CONSIDERED AND RULED OUT: (a) "the test browser had JS blocked, so an AJAX form fell back to a native POST" — ruled out by the absent product-form-component wrapper and by the server-side 302, neither of which depends on the client; (b) "Horizon binds a global delegated submit handler" — ruled out by the live-vs-draft wrapper comparison: Horizon attaches via the wrapper element, which the TDN section does not emit; (c) "the owner deliberately chose a cart-page journey and built AOV there" — ruled out by inspection: templates/ contains no cart.json, so /cart is stock Horizon, and the drawer is explicitly suppressed on it. There was nowhere for that intent to have landed. This is a wiring gap in an unpublished work-in-progress theme, not an owner error of judgement — no owner-blame inference is required and I make none.

WHAT IS WRONG WITH THE FINDING AS WRITTEN (why it needs restating, not rejecting):
- It is NOT a new discovery. audit/findings/2026-08-05-recon-report.md line 29 already states "Add to Cart is a plain form POST that redirects away from the page, so the free-delivery progress bar in the drawer is never seen", and line 148 lists "whether Add to Cart really redirects away from the PDP" among the things no agent could verify. The brief says do not redo run #1. The legitimate contribution here is the VERIFICATION run #1 asked for, so it should be filed as "recon #1 item now confirmed", not as a fresh find. Presenting it as new inflates the run's apparent yield.
- It under-scopes. sections/dog-nook-bundle.liquid:58 carries the same data-tdn-atc submit button, so the three bundle PDPs — the pages that ARE the 3-3-3 position — have the identical break. The finding only names the product PDP.
- Two small overstatements: "dumps every shopper on the one page" is true of the add-to-cart moment but the header cart button still opens the drawer on every other template; and "I saw the progress bar inside it" is only true with a non-empty cart (with an empty cart the drawer renders the empty branch and no bar).
- "Horizon's native ATC is AJAX and opens the drawer" — the AJAX wrapper I verified by markup; I did not execute JS to watch a drawer open on the live theme, and neither, on the stated evidence, did the finding. Immaterial to the conclusion.

NO CONTRADICTION WITH STATUS.md. STATUS.md says nothing about ATC or the drawer; it lists the theme as built on draft 193438056731, which is consistent. Nothing here touches the reviews question.

POSITION TEST: this earns its "high" rating on the position, not just on generic CRO. The 3-3-3 story only works if someone at "3 days" can be shown what "3 weeks" needs. The drawer is the single place the store does that work, and the default add-to-cart path is the one path that guarantees the shopper never sees it.

Fix as proposed is sound and respects the standing rules: a NEW asset loaded from snippets/dog-nook-head.liquid (which already loads dog-nook.js, dog-nook-gallery.js, dog-nook-quiz.js at lines 15-17) leaves assets/dog-nook.js and assets/dog-nook-cro.css untouched.
