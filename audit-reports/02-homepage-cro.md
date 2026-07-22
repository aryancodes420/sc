# The Dog Nook — Homepage CRO Audit (Cold Mobile Social Visitor)

**Scope/method note:** Static source audit only. Live storefront is firewalled — no rendering, screenshots, or Lighthouse were available, so anything about actual visual weight, load time, or on-screen fold position is marked **[hypothesis]**. Everything else below is drawn directly from the code at the cited paths. Header, footer and cart-drawer are Horizon-native and their JSON config files are not present in this local repo copy, so I could not directly inspect them — those items are marked accordingly.

Files read: `/home/user/sc/dog-nook-theme/templates/index.json`, `sections/dog-nook-hero.liquid`, `-category-bar.liquid`, `-trust-strip.liquid`, `-why.liquid`, `-rich-text.liquid`, `-featured-bundle.liquid`, `-collection-list.liquid`, `-reviews-placeholder.liquid`, `-newsletter.liquid`, `-announcement.liquid`, `snippets/dog-nook-email-popup.liquid`, `-product-card.liquid`.

---

## 1. Current homepage journey (as coded, in render order per `templates/index.json`)

1. **Category bar** (`sections/dog-nook-category-bar.liquid`) — a continuously auto-scrolling marquee of 6 pills ("Shop all", 4 collections, "The Rescue Bundle"), sits above the hero.
2. **Hero** (`sections/dog-nook-hero.liquid`) — eyebrow "Made for anxious & rescue dogs", H1 "Less anxious. More at home.", subhead, tick row (30-day guarantee | free delivery over £35), two CTAs: primary **"Shop the Rescue Bundle"** → `/products/the-new-rescue-bundle-1`, secondary "Shop all" → `/pages/shop`.
3. **Trust strip** (`sections/dog-nook-trust-strip.liquid`) — 4 emoji-icon cells: free delivery, 30-day guarantee, "for anxious & rescue dogs", dispatch time.
4. **Why us** (`sections/dog-nook-why.liquid`) — 3 cards: "chosen for anxious/rescue dogs", "30-day money-back guarantee" (again), "a real person replies".
5. **Bundle intro** (`sections/dog-nook-rich-text.liquid`, "Two ways to start") — one paragraph nudging visitors toward one of the two bundles.
6. **Featured bundle — Settle-In Bundle £64.99** (`sections/dog-nook-featured-bundle.liquid`) — image/gradient placeholder, price, "Add bundle to basket" button (real add-to-cart form), "What's inside?" link.
7. **Featured bundle — New Rescue Bundle £34.99** — identical component, same two CTAs.
8. **Collection grid "Shop by need"** (`sections/dog-nook-collection-list.liquid`) — 5 tiles (Settling a New Rescue, Calming Essentials, Grooming, Mealtime & Feeding, Travel & Outdoor), each a colour-tone tile (no photography), bundle collections get a "Bundle inside · Save £X" badge.
9. **Reviews wall** (`sections/dog-nook-reviews-placeholder.liquid`) — real 4.8/80 aggregate + genuine hardcoded owner quotes, CTA "Shop the range" → `/pages/shop`.
10. **Newsletter** (`sections/dog-nook-newsletter.liquid`) — "Get 10% off your first order", real Shopify customer form.
11. **Footer** — Horizon `footer-group` (not in local repo; per `HANDOFF.md`/architecture map it holds Explore/Help/Legal menus + real trader identity — **not independently verified this pass**).

Layered on top of this, independent of scroll position: an **email popup** (`snippets/dog-nook-email-popup.liquid`) firing at 12s dwell or 45% scroll, offering the same "10% off first order" (code `WELCOME10`) as the on-page newsletter section.

An **announcement bar section exists** (`sections/dog-nook-announcement.liquid`, default text "Free UK delivery over £35 · Fast dispatch · Made for anxious & rescue dogs") but it is **not referenced in any template or group JSON found in this repo** — its own comment says it's "optional… add to header group" — so whether it is actually live above the header is **unverified from source** [hypothesis: confirm in Shopify admin theme editor].

---

## 2. Main friction points

**A. The same three claims repeat 3–4 times before the first product is reached.**
- "Free UK delivery over £35": announcement bar copy (if live) → hero ticks (`dog-nook-hero.liquid` line 92 default) → trust-strip cell b1 (`dog-nook-trust-strip` block b1).
- "30-day money-back guarantee": hero ticks → trust-strip cell b2 → why-us card w2 (`dog-nook-why.liquid` block w2, "The risk is ours, not yours").
- "For anxious & rescue dogs / rescue dogs settling in": hero eyebrow → trust-strip cell b3 → why-us card w1 → bundle_intro heading → both bundle headings.
This is directly observed in `templates/index.json`. Repeating the same three facts across four consecutive sections uses scroll real estate that could instead differentiate products or teach the visitor how to choose, and it dilutes each individual claim's impact rather than reinforcing it.

**B. Premature and duplicated hard-sell before trust or browsing.**
The hero's primary CTA is "Shop the Rescue Bundle" (a specific £34.99 SKU) appearing before the trust-strip or why-us sections that are meant to build the credibility the hero itself doesn't yet supply. Then, two sections later, both bundles reappear back-to-back (sections 6–7) each with their own live "Add bundle to basket" form — meaning a cold visitor is offered **direct add-to-cart** on two different £30+ bundles before ever seeing the plain collection/product grid. This is a real, code-level sequencing choice, not a hypothesis, and it runs against the project's own stated priority: "Establish trust before asking for the sale" (`CLAUDE.md` §Conversion priorities #5).

**C. Competing CTAs with no clear hierarchy.**
Within the first four screens a mobile visitor is offered, in order: catbar "Shop all" pill, hero primary button (bundle PDP), hero secondary button ("Shop all"), Settle-In "Add bundle to basket" + "What's inside?", New Rescue "Add bundle to basket" + "What's inside?", collection-grid "View all", 5 collection tiles, reviews "Shop the range", newsletter email capture, and (independently) the popup email capture. That is roughly 10 distinct calls to action of varying intent (browse vs. buy vs. subscribe) with no visual or copy signal for which one the visitor should take. Nothing here is "wrong" individually, but stacked without hierarchy it is friction: a single clear next step is missing.

**D. Trust cues use emoji glyphs (🚚 🛡️ 🐾 📦, 🐕 🛡️ 💬), which is a recognisable generic-dropshipping visual pattern** — directly observed in `dog-nook-trust-strip.liquid` and `dog-nook-why.liquid` default block settings. This works against the brand principle "premium enough to be credible" and "remove signs of generic dropshipping" (`CLAUDE.md`). Combined with the fact there is currently no product photography anywhere on the homepage (confirmed by `dog-nook-featured-bundle.liquid`'s `image_placeholder_label` fallback and the architecture map's "no product photography" note), the two largest visual trust levers on the page (icons, photography) both currently read as placeholder/generic rather than specialist-retailer.

**E. Weak differentiation between the two bundles.**
`bundle_intro` (`dog-nook-rich-text.liquid`) gives one paragraph of guidance ("start small… or go all-in…") but the two bundle sections that follow use the *identical* component/layout (`dog-nook-featured-bundle.liquid`), so visually the £34.99 and £64.99 offers look like near-duplicates stacked vertically rather than a clearly guided decision ("which one is right for MY dog"). There's no comparison table, no situational triggers (e.g., "day 1 of a new rescue" vs. "settled but still anxious"), which is a **lack of customer guidance** against the project's own #2 conversion priority ("help visitors identify the right product for their dog's situation").

**F. Reviews section settings are stale/misleading in the template JSON.**
`templates/index.json`'s `reviews` block sets `heading: "Real reviews, coming soon"` and `body: "We only show reviews once they're real."` — but the section's schema (`dog-nook-reviews-placeholder.liquid`) was deliberately renamed to `title`/`subtitle` fields specifically so these stale `heading`/`body` values are ignored and the real 4.8/80 aggregate renders instead (comment at lines 1–10 of that file explains this intentionally). This is not a live defect (the real reviews do render), but it is a **maintenance trap**: anyone editing `heading`/`body` in the theme editor or JSON believing it drives the section will silently have no effect. Worth fixing for internal clarity, not a customer-facing issue.

**G. Continuously-animating marquee at the very top of the page.**
`dog-nook-category-bar.liquid` auto-scrolls pills via `requestAnimationFrame`, pausing only on hover/touch. Placing constant motion at the very top of the page, above the hero, competes for attention in the "explain purpose within 5 seconds" window (`CLAUDE.md` priority #1) [hypothesis: motion is a known attention-competing pattern, but actual on-device impact is unverified without rendering]. It also means a cold visitor's very first interactive element is a moving target rather than the value proposition.

**H. Two identical incentive offers running concurrently.**
The on-page newsletter section and the email popup both offer "10% off first order" / `WELCOME10` (`dog-nook-newsletter.liquid` vs `dog-nook-email-popup.liquid`). Functionally harmless (same code, same list), but it means a visitor can be interrupted by a modal asking for email mid-browse (12s or 45% scroll) while the identical offer already exists lower on the page — an unnecessary second ask of the same thing rather than two different value adds.

**I. Product discovery is 7th of 10 homepage sections.**
Before the collection grid (the first place a mobile visitor can browse the actual catalogue by need) they must scroll past hero, trust-strip, why-us, bundle intro, and two full bundle cards — five sections of trust/CTA content. For a cold social visitor who typically decides to stay or bounce very quickly, this delays the "help me find the right product" moment considerably.

---

## 3. Recommended homepage sequence

This reorders existing sections/components already in the codebase — it does not require new sections, per the instruction not to assume more sections improve conversion. Where a genuinely new lightweight element is suggested, it's flagged as such.

1. **Hero** — keep the current copy/positioning, but demote the primary CTA from a specific bundle purchase to something exploratory ("Find what your dog needs" → the collection grid, or a light "Take me to the shop" → `/pages/shop`). Keep one guarantee/delivery tick line here only (not repeated below).
2. **Category bar** — keep, but consider disabling the auto-scroll animation (static row, or scroll-on-touch only) so it doesn't compete with the hero for the first-five-seconds attention window. [Implementation-light: `dog-nook-category-bar.liquid` already has a `prefers-reduced-motion` static fallback path — could be made the default.]
3. **Why-us (trust) — merge trust-strip and why-us into one instance, not two.** Both currently repeat "30-day guarantee" and "for anxious/rescue dogs." Pick one component (why-us's 3-card version reads slightly more premium than trust-strip's emoji cells) and drop the other, or re-scope trust-strip to cover *different* facts (e.g., materials/UK-based/real specialist retailer facts) instead of restating the guarantee.
4. **Collection grid ("Shop by need")** — move this up, directly after the trust section, so cold visitors reach product-discovery/browsing sooner rather than after two hard bundle pitches.
5. **Bundle intro + one bundle at a time, or a side-by-side comparison** — if both bundles stay on the homepage, present them together with an explicit differentiator (e.g., "Day one with a new rescue → New Rescue Bundle. Already settled but still anxious → Settle-In Bundle.") rather than two identical stacked cards with duplicate CTA patterns.
6. **Reviews** — keep as-is; it's honest, real, and appropriately placed after some trust has been built and before a final ask.
7. **Newsletter** — keep once; do not also fire the identical popup on the same visit, or at minimum suppress the popup once the on-page newsletter form has been submitted/seen (it already suppresses after submit via `localStorage['tdn_popup']`, but currently there's no relationship between "saw the on-page section" and "shown the popup").
8. **Footer** — unchanged (Horizon-native, out of this theme's direct control).

---

## 4. Findings ranked by likely commercial impact

1. **Hero pushing a specific bundle purchase before trust is established, followed by two more bundle "add to basket" pitches before the shopper reaches the general catalogue.** (§2B) — directly conflicts with the project's own conversion priority #5. High potential impact on a cold, unfamiliar visitor who hasn't yet been told why this store is credible.
2. **Emoji-based trust icons + lack of differentiation between the two bundle sections** undermine the "trustworthy specialist retailer, not generic dropshipping" positioning that is explicitly the brand's core requirement. (§2D, §2E)
3. **Triple/quadruple repetition of the same 2–3 trust claims** (guarantee, free delivery, "for rescue dogs") across 4 consecutive sections — wasted scroll real estate that could instead build differentiation or guidance. (§2A)
4. **No clear customer guidance mechanism for "which bundle/product is right for my dog"** beyond one paragraph of prose — this is the store's #2 stated conversion priority and currently under-served. (§2E)
5. **Product discovery (the collection grid) sits 7th of 10 sections**, delaying the moment a cold visitor can start browsing by need. (§2I)
6. **Competing CTA count/no clear hierarchy** across ~10 distinct actions on one page. (§2C) — moderate impact, mostly a clarity/hierarchy issue rather than a broken flow.
7. **Duplicate identical email-capture offer (on-page + popup)** — low-to-moderate impact; mostly an efficiency/annoyance issue, not fundamentally broken since the popup already suppresses after submission.
8. **Stale `heading`/`body` values in `templates/index.json`'s reviews block** — no live customer impact (the section overrides them by design), but a real internal-maintenance risk. (§2F)
9. **Always-on marquee animation above the hero** — plausible but unverified attention-competition risk given no rendering access. (§2G) [hypothesis]
10. **Announcement bar's live status is unverified from source** — worth confirming directly in the theme editor before treating its copy as part of the "5-second value prop" budget, since it may be duplicating hero/trust-strip content a second or third time. (§1)

---

## 5. Specific implementation references

- `/home/user/sc/dog-nook-theme/templates/index.json` — full homepage section order and settings; lines 3–20 (hero), 65–100 (both bundle instances), 113–121 (reviews stale keys), 131 (`order` array).
- `/home/user/sc/dog-nook-theme/sections/dog-nook-hero.liquid` — lines 89–97 (eyebrow/heading/tick/button defaults driving the premature-bundle-CTA finding).
- `/home/user/sc/dog-nook-theme/sections/dog-nook-trust-strip.liquid` — lines 33–43 (emoji icon defaults; repeated guarantee/delivery claims).
- `/home/user/sc/dog-nook-theme/sections/dog-nook-why.liquid` — lines 30–39 (repeated guarantee + rescue-dog claims).
- `/home/user/sc/dog-nook-theme/sections/dog-nook-featured-bundle.liquid` — full file; identical component used twice consecutively for the two bundles (§2B, §2E).
- `/home/user/sc/dog-nook-theme/sections/dog-nook-rich-text.liquid` (as `bundle_intro`) — lines 55–63 of `index.json`, single paragraph of guidance between the two bundle pitches.
- `/home/user/sc/dog-nook-theme/sections/dog-nook-collection-list.liquid` — the actual product-discovery grid, currently positioned 7th.
- `/home/user/sc/dog-nook-theme/sections/dog-nook-reviews-placeholder.liquid` — lines 1–10 (comment explaining the intentional field-id mismatch with `index.json`).
- `/home/user/sc/dog-nook-theme/sections/dog-nook-category-bar.liquid` — lines 29–89 (auto-scroll JS; `prefers-reduced-motion` static fallback already exists at line 42).
- `/home/user/sc/dog-nook-theme/sections/dog-nook-newsletter.liquid` and `/home/user/sc/dog-nook-theme/snippets/dog-nook-email-popup.liquid` — duplicate WELCOME10 offer.
- `/home/user/sc/dog-nook-theme/sections/dog-nook-announcement.liquid` — exists but no reference to it found in any template/group JSON in this repo (grep confirmed only `dog-nook-theme/README.md` mentions it) — live status unverified.

---

## 6. Elements that should remain unchanged

- **The reviews wall's honesty posture** — real aggregate (4.8/80), genuine owner quotes, no fabricated content, honest fallback state when no reviews exist. This is a genuine trust asset and directly serves the brand's non-negotiable honesty constraints (`CLAUDE.md` — "Do not fabricate reviews").
- **The delivery/returns facts themselves** (1–2 day dispatch, ~4–7 day delivery, free over £35, 30-day guarantee) — accurate and appropriately reassuring content; the issue is repetition/placement, not the claims themselves.
- **The newsletter and popup's tasteful triggering logic** (12s/45% scroll delay, suppressed on cart/checkout, focus-trapped, dismissible, `localStorage` suppression after action) — this is a considered, non-manipulative implementation and should not be touched; if anything is changed it should be the *relationship* between the two instances, not their individual mechanics.
- **The "Why us" copy content itself** (small UK team, real-person replies, risk-reversal framing) — good, credible, non-medical-claim messaging that matches the brand voice; only its duplication with trust-strip needs addressing, not the copy.
- **The founder-story rich-text content** (`dog-nook-rich-text.liquid` default paragraphs) — well-written, honest, appropriately positioned as a small specialist retailer without fabricated credentials.
- **Cookie consent / Customer Privacy API wiring** and the **collection grid's honest "Bundle inside · Save £X" badge logic** (computed from real `compare_at_price`, not a static fabricated number) — both are functioning honestly and should be preserved as-is.