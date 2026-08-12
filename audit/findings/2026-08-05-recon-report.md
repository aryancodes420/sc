## The 5 things that matter most

**1. Fake reviews are live on 8 of your 9 sellable products. Delete them today.**
I re-checked this against the live store while writing this report, because it contradicts your own STATUS.md. It is true: `reviews.rating = 4.8`, `reviews.rating_count = 10` and ten fully-written reviews with names and dates ("Scott B., July 2026", "Kirsty E., June 2026"…) are set as metafields on the Lick Mat, Snuffle Mat, Donut Bed, Grooming Glove, Nail Grinder, Slow-Feeder, Car Boot Liner and First Days Kit. The store has never had an order. The theme prints them in three places — "4.8 · 10 reviews" on every product card and PDP, "Based on 10 verified reviews" on the PDP, and `aggregateRating` in the JSON-LD that goes to Google.
Why it matters: this is a banned practice under the DMCC Act 2024, the CMA can now fine directly without going to court (up to 10% of global turnover), and it is a Google structured-data manual-action risk. It is also the exact thing your brand is positioned against. Commercially it is worth nothing anyway — nobody trusts a uniform 4.8/10-reviews on a store with no photos.
Who: **Claude**. Effort: **quick** (delete three metafields × 8 products; the honest "Be the first to review" state then renders automatically).
Note: your STATUS.md line "ZERO reviews exist" is wrong in a dangerous way. Zero *real* reviews exist; ten fake ones per product are live. Fix the doc too.

**2. Every bundle page except one displays the wrong contents and a false saving — including your live £64.99 page.**
There is one shared bundle template (`templates/product.bundle.json`) and it hardcodes the First Days Kit's contents into section settings. Six products use it. So the live **Settle-In Bundle £64.99** page tells shoppers it contains a Slow-Feeder Bowl (it doesn't — it's Donut Bed + Lick Mat + Snuffle Mat), that the contents cost **£49.97 bought separately** (the truth is £72.97), and shows a **"BEST VALUE · SAVE £15"** badge when the real saving is £7.98. Read literally, the page says the bundle is £15 *more* than its parts. The four draft kits would inherit the same panel — the £139.99 Complete Calm System would claim its contents cost £49.97.
Why it matters: this is your highest-value live page and the flagship of the AOV lever, and it is simultaneously a false savings claim and a misdescription of goods — the precise DMCC/CMA risk. Also, the bundle template never renders the product description, the FAQ, the specs, the cross-sell or the mobile sticky buy button, so your two most expensive pages are also your thinnest — the good copy exists and is invisible.
Who: **Claude**. Effort: **medium** (proper fix = drive contents and totals from per-product metafields; 10-minute safety valve = blank `separately_total` and `badge` so nothing false renders).

**3. Your product pages have no selling copy, no specs, no size guide, and sizes show as identical grey squares.**
Four separate audits landed on the same hole. `custom.short_description` is null on all 21 products, so the first screen of every PDP is breadcrumb → title → price → variant picker → button, with an empty grey image placeholder and not one sentence of persuasion. `custom.specs` and `custom.size_guide` are null on all 21, so the whole "The details" and "Which size?" block — 87 lines of built, working template — outputs nothing, while your FAQ tells shoppers "each product page lists sizes and measurements". And the Donut Bed's Size option is routed through the colour-swatch UI, so Small/Medium/Large render as three identical grey squares you have to click to read.
Why it matters: with zero photographs, words and specs *are* the conversion argument. The Donut Bed is your highest-value single SKU (£29.99–£44.99), size doubt is the main abandonment and return driver, and returns on unsourced dropship goods are the expensive kind. Separately, the bed's copy still says "Large, 80cm — suits most dogs up to Labrador size" even though Small and Medium are now live at £29.99/£37.99 — a customer buying Small is shown an 80cm claim.
Who: **Claude** for the code fix and for lifting the spec bullets that already exist in each description into the metafields; **owner** for the Small/Medium measurements from CJ. Effort: **medium**.

**4. The owned-traffic engine has not started and the window closes this month.**
Owned traffic 30% → 65% is half the £100k model. Right now: your blog has **zero articles**, while five publish-ready pieces sit in `growth/content/SEO-PLAN-AND-ARTICLES.md` targeting the fireworks and rescue-settling clusters. Your own SEO plan says these take 8–12 weeks to earn — publish in August, earn in October/November. Today is 5 August. There is also a complete, genuinely good six-step Bonfire Night prep guide already built in the theme (`dog-nook-prep-timeline.liquid`) that no template renders, no fireworks landing page, no FAQPage or BreadcrumbList schema despite 15 curated Q&As, and both bundles have `seo.title: null`.
Why it matters: none of this is blocked by photography. Every week of delay is a week of October traffic you don't get.
Who: **Claude** (publish articles, build the fireworks page, add schema, write bundle SEO titles). Effort: **medium**, and it is the highest-value unblocked work available.

**5. You are making delivery and returns promises the business has not verified.**
Three different delivery numbers are live at once: the Shipping Policy page says 2–7 working days, every product page and the FAQ say "about 4–7 working days", and your own growth docs put CJ China→UK at 7–17 days — which is why the Bonfire countdown cutoff was set to 15 Oct, not 24 Oct. At least two of those are wrong at the moment of purchase. On top of that, both live bundle FAQs promise "ships as one parcel", a question STATUS.md still lists as an unanswered CJ email. And the JSON-LD tells Google `returnFees: FreeReturn` on every product, while the returns policy page never says who pays return postage and gives no returns address.
Why it matters: delivery estimates are pre-contract statements under the Consumer Contracts Regulations, and if the real transit is 7–17 days you will hit November with WISMO emails, refunds and chargebacks — on a brand whose whole position is honesty about shipping. Also, under the CCRs, if you don't tell the customer they bear return costs *before* purchase, you pay them. Right now you're exposed either way.
Who: **owner** (one CJ email — already drafted in OPS-RISK §1 — plus one decision on return postage). Effort: **quick** once CJ replies; Claude can then align all four surfaces in one pass.

*Just outside the five:* the cart does no AOV work at all — Add to Cart is a plain form POST that redirects away from the page, so the free-delivery progress bar in the drawer is never seen; there is no cart template; there is no cart-stage cross-sell; and there is no post-purchase offer. Details in Pricing and Quick Wins below.

---

## Pricing verdict

**Overall: the individual prices are broadly defensible against the UK market. The *structure* is wrong.** Two structural faults do more damage than any single price.

**Fault 1 — the ladder discounts backwards.** Recomputed from live prices: First Days £34.99 vs £49.97 = **30% off**; Settle-In £64.99 vs £72.97 = **10.9% off**; Home-Alone 17.6%; Fireworks Survival 22.7%; Complete Calm 20%. The cheapest rung is by far the best deal, so the ladder pushes people *down*. Good/better/best only works when spending more buys a better rate. Fix the rates so they rise with price, and show three rungs side by side on one page (a "Choose your kit" comparison block) instead of in isolation. With zero orders you cannot label anything "most popular" — but "best value per item" and "most complete" are computable from real prices and are legitimate.

**Fault 2 — £80 AOV is arithmetically out of reach today.** The most expensive sellable item is £64.99. Everything above it is draft and unsourced. £80 AOV from a £64.99 ceiling requires most orders to be multi-item, which is a far harder behavioural ask than selling one higher rung — and the site currently asks for it nowhere (the bundle template has no upsell, the cart has no cross-sell, product cards have no quick-add). **Sourcing one premium rung is worth more than every repricing below combined.** Priority: Fireworks Survival Kit (~£61 contribution per unit, seasonal deadline) then Home-Alone Kit.

**Specific changes with a real case:**

| Item | Now | Recommendation |
|---|---|---|
| **First Days Kit** | £34.99 | **£35.99.** It is currently 1p below your own £35 free-delivery threshold — the flagship entry bundle fails the store's own headline promise by one penny, and the drawer says "you're £0.01 away". That reads as a trick. £35.99 clears it, adds ~£1 contribution, and the saving becomes a still-strong £13.98. Three agents flagged this independently; it's the clearest single fix in the report. Also change copy from "over £35" to "£35 or more" — the code fires at ≥£35. |
| **First Days Kit saving** | "You save £15" | **"You save £14.98."** True figure. It's 2p, but it appears rounded-up in three places while your homepage correctly says £14.98 — so the store contradicts itself, and rounded-up savings are exactly what the CMA picks apart. |
| **Settle-In Bundle** | £64.99, one size | **Add S/M/L variants** (e.g. £56.99 / £64.99 / £71.99, each a true £7.98 saving against £64.97 / £72.97 / £79.97). Today it's fixed to the Medium bed and the FAQ tells large-dog owners to *message you before ordering* — a conversation gate on your highest-value sellable SKU. The archived First Nights Bundle already solved this; the pattern was lost. |
| **Ladder gap** | £34.99 → £64.99 (86% jump) | **Build one ~£49.99–£54.99 rung from stock you already have** (First Days Kit + Donut Bed Small ≈ £54.99 against a genuine £79.96). No sourcing needed. |
| **Grooming Glove** | £11.99 | **£8.99, or delist standalone.** eBay UK's own filter buckets are <£6 / £6–£11 / >£11 — you're at the top of a commodity band, on the least on-brand product you sell. Landed cost £2.00. Better used as a bundle component where it isn't price-checked. |
| **Heartbeat Companion** (draft) | £24.99 | **Move to £19.99 or £29.99.** Genuine Snuggle Puppy is £34.99 UK; unbranded lookalikes ~£9.99. £24.99 is the one price that wins neither buyer. At £29.99 you must add real contents (spare heat pack, batteries, washable cover, settling plan) to justify it. |
| **Calming Coat** (draft) | £24.99 | **£27.99–£29.99.** Thundershirt is £26.99–£43.19. Undercutting the only recognised brand by 30% reads as "cheap copy" in a comfort category. 15–20% under is credible and adds £3–5 contribution. Do **not** mirror Thundershirt's "80% success rate" claim. |
| **Deep Nook** (draft) | £59.99–£89.99 | Possibly under-priced — UK cave/hooded beds are the one genuinely premium tier here (Collared Creatures, Snoozer; Charley Chau runs £100–£275). £64.99/£79.99/£99.99 is arguable. **But verify first** — no competitor cave-bed price could actually be read, and its size naming is broken (variants named L/XL/XXL while the copy says "not ideal for large breeds"). Fix the naming before touching the price. |
| **Slow-Feeder Bowl** | £14.99 | £5–£20 band, bulk at £6–£12. £14.99 only holds with a concrete spec story on the page. Either drop to £12.99 or commit to the specs (which are missing anyway — see item 3). |
| **Snuffle Mat** | £22.99 | Correctly placed. The opportunity is a **large variant at £29.99–£32.99** — UK snuffle mat specialists price purely by size (Blitz: £17/£24/£44), so it's an honest way to raise average selling price with no new product to source. |
| **Nail Grinder £19.99, Car Boot Liner £29.99** | — | Prices fine; category fit is the problem. Neither is a comfort product. Keep them only if you can honestly frame them through the anxiety lens (quiet grinding for dogs who panic at clippers; securing the car for a dog who finds travel stressful). |

**Free-delivery threshold — the agents disagree, and you should know that.** One argues to raise it (research convention is 20–30% *above* AOV; at £35 nearly every order clears it, so it does no work). One argues to drop it to £30 or £34.99. One argues to keep £35 and layer a **second reward at £75** — a free gift, e.g. the Calming Snood — because gift-with-purchase lifts AOV more cheaply than an equivalent discount. My read: **keep £35, add the £75 gift tier, and put add-to-close products in the cart drawer.** Raising £35 outright punishes the £11.99–£22.99 entry range your quiz funnels people into. Whatever you pick, note that **WELCOME10 can strip free delivery at checkout** — a £35.00–£38.87 basket is told "you've unlocked free UK delivery", then the 10% code drops it below £35. Check how the free-shipping rate is configured in Settings → Shipping.

**Sequencing rule that overrides all of the above:** do not raise any price before photos and real reviews exist. A premium price on a page with no image and no proof reads as a scam. Launch at current prices, accumulate reviews, then raise one SKU at a time. The £34.99 → £35.99 fix is the one exception — it improves the offer. And never show a "was £X" strikethrough after a rise; that's a false saving.

---

## What competitors have that we don't

**1. A named human on the product page.** Your trader identity is in the footer. The wary UK shopper's checklist — visible in your direct competitor's Trustpilot complaints — is "who am I actually buying from, will anyone reply". Put "chosen by Aryan, [town]" with a real photo and a reply-time promise you will honour on the PDP itself. Cheapest counter to the dropship read there is. (Also: your homepage says "Registered UK trader" while your footer correctly says sole trader. Sole traders aren't registered at Companies House. "A real UK sole trader — a real person replies" is honest and stronger.)

**2. A returns block, not a returns badge.** You show "🛡️ 30-day money-back". Baymard found 60% of shoppers look for return policy detail *on the product page*, and 15% have abandoned over an unsatisfactory policy. Competitors state: who pays return postage, condition required, the returns address, refund timing. Two things nobody does well and you could: state the statutory 14-day CCR cancellation right and your voluntary 30-day goodwill window as *two separate things*, and steal Chewy's donate-instead-of-return idea for low-value items — cheaper than reverse logistics on an £11.99 lick mat and perfectly on-brand for a rescue store.

**3. Precise sizing language.** Thundershirt says: measure girth at the widest point just behind the front legs, with a cloth tape, snug not tight — and "if between sizes, order the smaller, because this works through compression". Your theme hardcodes the opposite tip ("size up") on *every* product, which is right for a bed and wrong for your Calming Coat and Snood. Make the tie-break a per-product field and always give the reason. Thundershirt also publishes downloadable instruction sheets per product — that doubles as post-purchase reassurance and cuts "it didn't work" returns.

**4. Enrichment safety boilerplate.** Outward Hound / Nina Ottosson carry a consistent block: "no toy is indestructible", "do not leave with unsupervised pets", "always supervise, teach your dog how the game works", plus material declarations and a **difficulty level 1–4**. You have six products in this class and none of it. The difficulty number is quietly an AOV mechanic — it gives an honest reason to own more than one. Only state material claims (food-grade silicone, BPA-free, 40° washable) once CJ confirms them in writing.

**5. Store reviews from order one.** Judge.me and Trustpilot both support *store* reviews about service, delivery and communication — collectable from your first order, while product review counts are still zero. That turns your first 20 orders into usable proof months earlier than product reviews would. Two rules to build in now: under the DMCC you have a *positive* duty to prevent and remove fake reviews on your own site (write the moderation policy), and if you gift product to rescue contacts for reviews, **each review must disclose the incentive**.

**6. A preemptive objection block, written from the competitor's own complaints.** calmingdogbeds.co.uk (~47 Trustpilot reviews) fails in four repeating ways: "not shipped from the UK as claimed", refund friction (one refund refused over a missing tracking number, another five weeks of emails), beds "not the size ordered" and "don't settle into a circle", and fabric shedding after two weeks. Your buyers arrive having often just been burned by exactly this. Answer all four *before* they ask — where it ships from and how long it really takes, exactly how a refund works and who pays, the honest bed measurement including how much the padded rim eats into the sleeping area, and the actual fabric with a washing temperature. The incumbent cannot copy this without admitting its own weaknesses.

**7. A give-back mechanic.** Table stakes in UK dog retail: Barc London 10% of profits to Dogs Trust, Hownd 50p per sale to All Dogs Matter, Charley Chau 50% of profits from one named SKU to Forever Hounds Trust. The Charley Chau model — one hero product, high percentage, named charity — is most credible for a small brand. **Compliance:** promising money to a named charity makes you a commercial participator; you need a written agreement and a specific accurate statement. Nothing goes on the site before the agreement exists.

**8. Distribution nobody has claimed.** Dogs Trust and Battersea are closed to a pre-launch brand. The open channel is the many small UK charities rehoming Romanian, Cypriot and Greek street dogs (1 Dog At A Time, Amicii, RRAUK, Barking Mad, Saving Souls, Pawprints to Freedom) — the dogs with the hardest settling profile, i.e. your highest-need customer. They publish their own settling guides and put things in adopter packs. Pet Remedy has already built a "trusted national rescue map", so the motion is proven. Start with 3–5, not 30. Their foster carers are the cheapest credible beachhead: multiple anxious dogs a year, trusted by every new adopter, and the fastest honest route out of zero reviews.

**9. What nobody owns, that you could.** My Anxious Dog owns "the anxious dog" as an identity, but their entire product surface is the **outdoor, on-lead, other-people** problem. Nobody owns the **indoor** problem — the dog who won't settle at night, won't eat in the first 72 hours, paces, shadows you room to room. That is literally every SKU you sell. And the **3-3-3 rule** (3 days decompress, 3 weeks settle, 3 months feel at home) is taught by every UK rescue, is behavioural not medical, and **no commercial brand has claimed it** — only charities rank for it. It maps 1:1 onto your ladder: First Days = days 1–3, Settle-In = weeks 1–3, Complete Calm = months 1–3. Reframing three price points as three *phases* gives a reason to buy up the ladder that's about the dog's timeline, not about saving money — which is the cleanest AOV mechanism available with no urgency or scarcity claims. Present it as "what many rescues tell adopters" with a note that every dog differs; there is credible published pushback against treating it as a rule.

**10. Don't fight where you'll lose.** UK "calming" head terms are owned by ingestibles (Adaptil, Zylkene, YuMOVE, Pet Remedy) and a dense affiliate review layer (captaincalm.co.uk, dogbed360, smartbark, VioVet). A store with no reviews and no photos will not rank there. The winnable long tail sits *upstream*: "what do I need to buy for a rescue dog first week", "rescue dog won't sleep first night", "rescue dog not eating first 3 days", "snuffle mat vs lick mat for an anxious dog". Low competition, high empathy, each with an obvious bundle landing.

**One thing to copy from nobody:** competitor claim language in this niche is routinely unlawful — "Official Calming Donut Dog Bed UK", "15 minutes of sniffing = a 45 minute walk", essential-oil toys marketed for "emotional trauma". And note the ASA treats **anxiety itself** as a recognised health condition, not a wellbeing state: it has ruled against "reduces stress and anxiety", "less anxiety", "helps with anxiety". That is a stricter line than "no cure claims", and it touches your core vocabulary. Safe framing: "for dogs who find fireworks hard", "a place to burrow and settle", "gives them a nose-led job". Unsafe: "reduces anxiety", "calms your anxious dog", "relieves stress", "therapeutic", "clinically". Your own default FAQ answer already models this well ("comfort and enrichment tools, not medical treatments") — make it the enforced site-wide standard including titles, collection names and email subject lines, as a committed word list checked by a pre-publish grep.

---

## Quick wins Claude can do this week

None of these need photography, and none need the storefront.

**Compliance and truth (do first, all quick):**
1. Delete `reviews.rating`, `reviews.rating_count`, `reviews.featured` on all 8 products. The honest empty state renders automatically.
2. Blank `separately_total` and `badge` in `templates/product.bundle.json` so nothing false renders on the Settle-In page while the proper per-product fix is built.
3. Change "You save £15" → "£14.98" in the First Days Kit description, the bundle template and the badge.
4. Delete the orphan `agg_rating: "4.8"` / `agg_count: "from 80 real owner reviews"` keys from `templates/index.json`. They don't render today — they are one schema rename away from publishing an invented rating.
5. Soften the two bundle "ships as one parcel" FAQs to "we aim to ship the kit together; if anything follows separately we'll tell you", until CJ confirms.
6. Change "Registered UK trader" → "A real UK sole trader".
7. Blank the five footer social URLs (they all point at platform homepages — Instagram's logged-out page reads as a fake brand).
8. Add a privacy-policy link at all three email capture points (newsletter, popup, quiz step 3). One line of markup each; UK GDPR Art. 13.
9. Move the `{VERIFY …}` placeholders and "[Draft — pending sourcing + photos]" notes out of seven customer-facing descriptions into a private metafield — one status dropdown publishes them today.
10. Decide free returns yes/no, then make the JSON-LD and the policy page say the same thing. (If yes: say it loudly everywhere — it's a genuine weapon against the incumbent.)

**Conversion (quick to medium):**
11. Fix the size selector so non-colour options render labelled pill buttons instead of three grey squares.
12. Fix the homepage "Find what your dog needs" cards — they almost certainly all link to `#` (`collections[block.settings.collection]` indexed with an object returns nil). Your own codebase documents this exact bug and its fix in `dog-nook-featured-bundle.liquid`. **Owner-verifiable in one click.**
13. Write and set `custom.short_description` on all 21 products — the opening line of each description is already the right sentence.
14. Lift the spec bullets already written in each description into `custom.specs` so the built-and-empty details block starts rendering.
15. Make the email popup intercept its own submit, POST via fetch, and show the WELCOME10 code in place. Today it does a full page reload to `/contact`, shows nothing, and never reappears. The success-state CSS class exists in the stylesheet and appears in no markup — it was designed and never built.
16. Fix the quiz's silent email loss (`mode:'no-cors'` + multipart FormData to `/contact`, result never checked) and add an on-screen confirmation.
17. Repoint the quiz: four of its five answers currently route to a sub-£23 single product, despite the quiz's own header comment saying it exists to route people to bundles.
18. Give the Car Boot Liner a cross-sell — at £29.99 it sits £5.01 under free delivery with no upsell path at all.
19. Remove the fake "Sort: Best selling ▾" caret on the shop page; it's a decorative `<span>` that does nothing.
20. Replace the homepage review skeletons (three dashed cards with fifteen grey stars) with one honest active line — "We're new. Be one of the first to review."

**Owned traffic (medium, and the clock is running):**
21. Publish the five ready articles to the blog. Build `blog.json` / `article.json` templates so the Article schema you already emit has something to describe.
22. Give the Bonfire Night prep timeline a home — it's complete, genuinely good, and rendered by nothing.
23. Add FAQPage and BreadcrumbList schema; write SEO titles/descriptions for both bundles (currently null).
24. Fix the Open Graph card: declared 1100×1100 against a square logo requested at 1200, and `twitter:card` never set to `summary_large_image`, so every shared link previews as a thumbnail.
25. Noindex or unlink the two collections that are 100% draft products and currently render "No products in this collection yet" under a full-size banner.

**Before the photoshoot (do this week, it's cheap now and expensive later):** the PDP gallery hard-crops to a fixed 460px with no zoom or lightbox, caps at 6 thumbnails, and video thumbnails show a ▶ overlay but only swap a still image — clicking one plays nothing. Fix the crop to an aspect-ratio, raise the limit, branch video properly, and add `fetchpriority="high"` to the main image. Then brief the photographer to that ratio.

---

## Blocked on the owner

1. **Product photography.** Still the launch gate. Before you shoot, get a shot list written — there isn't one anywhere in the repo. Minimum per product: front-on packshot, a scale shot with a known-size anchor (sofa, door frame, mug, hand — scale is *the* conversion killer in pet products), in-use with a real dog, close-up of material and texture, dimension overlay, and packaging. Use ordinary, slightly scruffy dogs in ordinary UK homes; glossy studio pedigrees undercut the positioning. Photographed branded packaging materially lowers the dropship read. **Bundles need their own brief** — one flat-lay of the full set in a single frame per bundle, plus one in-context shot of a dog using two components at once. That's ~10 extra setups. Without it the bundles launch as five disconnected thumbnails and underperform for reasons nobody can diagnose later. Highest-value subject by a distance: the Calming Donut Bed.
2. **Email CJ.** Two questions, both worth real money: real transit time (your sitewide "4–7 working days" may be a default, not a measurement), and whether bundle SKUs ship as one parcel (£14–28k/yr per your own model, and a pricing input, not just an ops detail).
3. **Install Judge.me and configure the request flow *before* the first order ships.** Reviews accumulate slowly; a flow that starts in November is worthless for November. Turn on store reviews from order one.
4. **Choose an email platform and build the welcome automation.** Three places on your site promise a code. Nothing sends it. No ESP exists in the project; the flow copy is written and unshipped in LAUNCH-KIT §3. This is half of lever #2.
5. **Check how the free-shipping rate is configured** in Settings → Shipping — specifically whether it evaluates before or after discounts (the WELCOME10 collision).
6. **Verify the cookie banner is actually in `layout/theme.liquid`.** It is the one snippet the head does *not* auto-render, and the JS fails silently if it's absent — the site would run with no consent gate while looking completely correct. Five-second check in the theme editor, PECR/UK GDPR exposure if missed. `layout/` isn't in this repo, so no agent can check it.
7. **Source the draft range** — and prioritise **one** premium rung (Fireworks Survival Kit, then Home-Alone) over breadth. That single decision moves AOV more than every repricing in this report.
8. **Supply the Donut Bed Small and Medium measurements** from CJ, and decide the Deep Nook's size naming (currently L/XL/XXL at up to £89.99 on a product whose own copy says it's not for large breeds).
9. **Turn off the country and language selectors** in the header — two toggles, on a store whose FAQ says "we're UK-only".
10. **Do the click-through on the draft preview before publishing.** Nothing in this report was seen rendered.
11. **Facebook rescue communities.** ~305k, ~71k, ~49k, ~47k followers on individual rescue pages, and new adopters ask "what do I actually need to buy?" constantly. This is the biggest free traffic seed available and the one channel no agent can run — groups eject brand accounts. It only works as you, a named human who runs the shop, with admin permission before you ever link, sharing a genuinely useful settling guide rather than a product page.

---

## Assumptions and unknowns

**Verified, hard:** product prices, variants, statuses, descriptions, metafields, collection membership, discount codes and order count (zero) were read live from the Shopify Admin API. The fake-review metafields on 8 active products were re-confirmed while writing this report. Theme behaviour was read from source in `dog-nook-theme/`.

**Not verified — no agent could:** anything about how a page actually looks or behaves. The storefront is firewalled and the new theme is unpublished. Specifically owner-verifiable: whether the homepage collection cards really are dead links; whether Add to Cart really redirects away from the PDP; whether the drawer's free-delivery bar renders at all; whether the "£0.01 away from free delivery" message appears in practice; whether the popup's `/contact` post actually reaches anything; whether the cookie banner is in the layout. Treat every layout claim here as source-level reasoning, not observed behaviour.

**Competitor prices are search-snippet derived, not read off live pages.** Every retail domain returned 403 to direct fetch. Treat the price bands as ±10%. Two in particular need owner spot-checks before any decision rests on them: the **cave/hooded bed premium tier** (no Collared Creatures or Snoozer price was retrievable — the "raise Deep Nook to £99.99" recommendation is brand-tier inference, not a verified comparison), and the **Trustpilot complaints about calmingdogbeds.co.uk** — read that page yourself before quoting any specific from it.

**Third-party statistics used, and their status:** Baymard's 60%/15% return-policy figures came via search summaries, not the source pages. The "40% of UK dogs have a firework phobia" figure is a secondary-source claim — verify before it appears in any copy. Fit-quiz vendors' "40% apparel return rate" and "30% fewer returns" are vendor marketing, flagged as such; the direction is sound, the numbers aren't independent. Facebook follower counts are search-summary figures.

**Where the findings disagree with each other — you should decide, not me:**
- **First Days Kit price.** One line of reasoning says £35.99 (clear the free-delivery threshold). Another says £38–£40 (shallow the discount so the ladder rises properly). They pull the same direction; £35.99 is the safe minimum, £38–£40 is the aggressive version and needs the ladder rebuilt at the same time.
- **Settle-In price.** One argues *down* to ~£59.99 to fix the inverted discount ladder; another argues it's the destination you should be pushing bed-buyers toward at £64.99. Both agree it needs S/M/L variants first — do that before touching the price.
- **Free-delivery threshold.** Raise it / drop it / keep it and add a £75 gift tier. Three positions, laid out in the Pricing section.
- **Whether the fake homepage `agg_rating` currently renders.** Two audits agree it does *not* (the setting IDs don't exist in the section schema) — so it's a dormant landmine, not a live breach. Delete it anyway.

**Documentation drift you should know about, because it will mislead the next session:** STATUS.md says zero reviews exist (fake ones are live). `live-catalog-changes.md` says the Donut Bed is a single £44.99 variant (S/M/L are live). BUILDER-COORDINATION.md says the First Nights Bundle is parked as draft (it's archived). `PENDING-graphql-ops.md` lists ops that are already done. Your own notes say documents are the detail layer under STATUS.md — a fresh session reading them will re-do or mis-plan work, which is exactly what caused the 2026-07-20 collision.

**Last thing, said plainly because it will otherwise get lost under thirty fixes:** the product description writing is the best asset in this project and is close to good enough to sell without photographs. Every product opens on a scene an owner recognises, earns the claim, then gives specs, then a non-medical disclaimer. The compliance discipline in the copy is real. The problem is not writing quality — it's that this copy sits at the bottom of pages, or on a template that never renders it, and that the structured fields the theme was built to display are empty. Don't rewrite it. Move it.
---

## ⚠️ OWNER CORRECTION — 2026-08-05 (read this before acting on item 1)

**Finding #1 of this report ("fake reviews") is WRONG and is retracted.**

The owner confirmed the reviews are **genuine**, collected from real customers who bought
the products **in person / by hand** under The Dog Nook before the Shopify store opened.
More will arrive from the same offline channel.

The agent inferred fabrication from "Shopify order count = 0". That inference did not
account for offline sales. **Do not delete the review metafields.**
`verified: false` is correct and deliberate — genuine, but not Shopify-verified purchases.

Two narrow follow-ups survive: (a) align any on-page wording that says "verified reviews"
with the `verified: false` data, and (b) keep a private record evidencing the reviews.

Everything else in this report stands, including the bundle false-savings issue.
