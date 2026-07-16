# 07 — Trust & dropshipping-risk audit

Framing: a cautious UK shopper actively checking "is this a legit UK shop or a
dropshipper?" The brand's *copy* argues it's a real curated UK shop; this section
scores whether the *evidence* on the page backs that up. Per the brief, the fix is
always **become more transparent**, never disguise delivery times, origin, product
limitations or business details.

## Warning-sign scan
| Signal | Present? | Evidence | Severity |
|---|---|---|---|
| Generic supplier images | N/A — **no images at all** | API-verified | Neutral-but-damning: absence is its own red flag |
| Inconsistent image styles | N/A | — | — |
| Poorly translated copy | **No** | Copy is native, well-written UK English | Good |
| Unclear/contradictory delivery windows | **Yes** | 1–2 day dispatch vs "same-day UK warehouse" vs bundle "4–7 days" | **High** |
| Missing business information | **Yes** | Footer `[YOUR NAME]/[YOUR ADDRESS]` placeholders | **High** |
| Contradictory policies | **Partial** | Bundle contents/savings differ homepage vs PDP | Medium |
| Generic product names | **No (rebranded)** | "The Lick Mat" etc., own vendor | Good — but verify delivered packaging matches |
| Excessive discounts / permanent sale | **No** | Restrained; sale framing only where real | Good |
| Fake countdown timers | **No** | None found | Good (and legally safer — S17) |
| Fake stock warnings | **No** | None found | Good |
| Unverifiable reviews | **No** | Reviews are real-only, honest empty state | Good (S18) |
| Unsupported claims | **Partial** | "Made in the UK" (footer) likely untrue for CJ goods; "same-day UK warehouse" | **High** |
| Mismatched branding/packaging | **[Verify]** | Can't inspect delivered goods | Unknown — check |
| Missing contact info | **No** | Contact form + email present | Good |
| Unclear returns address | **Partial** | Policy stated; physical returns address unverified | Medium |
| Supplier watermarks | N/A (no images) | — | — |
| Differing specs across sections | **Yes** | Bundle | Medium |
| Weak social presence | **Yes** | Links go to bare `facebook.com/`, `tiktok.com/` etc. | **High** |
| Empty policy templates | **[Verify]** | Legal pages exist per handoff; bodies unverified | Medium |
| Broken tracking links | **[Verify]** | Not testable (firewall) | Unknown |
| Suspicious pop-ups | **No** | Email popup is tasteful, delayed, dismissible, one-time | Good |
| Excessive trust badges | **No** | 3 restrained PDP badges | Good |
| Unprofessional grammar | **No** | — | Good |
| Currency inconsistency | **No** | GBP throughout | Good |
| US terminology on UK store | **Minor** | "Add to Cart" (US "cart" vs UK "basket"); homepage uses "basket" elsewhere | Low |

## Dropshipping-detection risk score: **58 / 100**
(0 = reads as a fully legit established UK shop; 100 = screams dropshipper.)
Mid-high. The store **avoids** the sleazy tells (no fake urgency/scarcity/reviews,
clean copy) — that pulls the score down. But it **fails the legitimacy basics** a
wary buyer checks first: no images, placeholder company identity, empty socials,
and contradictory/implausible delivery — which pushes it back up.

### Score contribution (what's adding points)
| Factor | +points | Fix |
|---|---:|---|
| Zero product images store-wide | **+16** | Real photography (P1) |
| Placeholder legal identity/address | **+12** | Fill real trader details (P0) |
| Contradictory / implausible delivery + "UK warehouse"/"Made in UK" | **+12** | One honest delivery promise + true origin (P0) |
| Empty/placeholder social links | **+8** | Populate or remove (P1) |
| No reviews / no social proof | **+6** | Judge.me + real reviews (P1) |
| Bundle contents/savings inconsistency | **+4** | Fix to one truth (P1) |
| **Credits (kept the score from being far worse):** no fake urgency, honest reviews policy, clean native copy, tasteful UX, restrained badges | −(baseline) | Keep doing this |

### Target
Filling identity, fixing delivery honesty, adding images and real reviews, and
populating socials would realistically move this to **~20–25/100** — "new but
clearly legitimate UK shop."

## The delivery/origin honesty problem (most important)
Business context says fulfilment is **CJdropshipping**. Claims of "same-day from our
UK warehouse" and "Made in the UK" are very likely **false** and are exactly the
kind of misleading statements the CMA's unfair-practices regime targets (S17). The
honest, and legally safer, move is to **state real dispatch and delivery windows**
(including if items ship from overseas), which the brief explicitly requires. Honest
longer delivery converts better than a promise that breaks — and broken delivery
promises are a top driver of disputes and chargebacks. **[Obs][Res S5][Judg]**

## Do-not-do (per brief and law)
No fake countdowns, no fake stock counters, no fabricated/AI reviews or star
aggregates (in scope under S18), no "Made in UK" unless true, no disguising origin.
