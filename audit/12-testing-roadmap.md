# 12 — Testing roadmap

## Reality check first
A new store with little/no traffic **cannot run valid A/B tests**. To detect, say, a
lift from 2.0%→2.6% conversion (a large +30% relative effect) at 95% confidence /
80% power, you need very roughly **~4,000–5,000 sessions per variant** — order-of-
magnitude, not exact; compute per test with an online calculator using your real
baseline. Smaller true effects need far more. Running underpowered split tests
produces noise that will mislead you. **Do not A/B test yet.**

So this roadmap has two tracks:
- **Track A (now, low traffic): qualitative + sequential before/after.**
- **Track B (later, once ~≥1,000 add-to-carts/month): classic A/B.**

## Track A — do these first (no statistics required)
| Method | What it answers | Effort | Output |
|---|---|---|---|
| **5-user moderated usability tests** (friends-of-friends who own dogs; think-aloud on the preview) | Where do real people get confused / distrust? | S | Ranked friction list |
| **Microsoft Clarity** session recordings + heatmaps | Where do they hesitate, rage-click, hunt for images? | S | Behavioural evidence |
| **PDP objection micro-survey** ("What's stopping you today?") | Top purchase blockers in customers' words | S | Copy/PDP priorities |
| **Post-purchase survey** ("What nearly stopped you?") | Trust/delivery/price friction from actual buyers | S | Trust priorities |
| **Support-inbox tagging** | Most common pre-sale questions (size/delivery/safety) | S | PDP spec + FAQ content |
| **Before/after funnel monitoring** | Did a shipped fix move the funnel step it targeted? | M | Directional read (watch for seasonality/traffic-mix confounds) |

Use Track A to validate the P0/P1 fixes (identity, delivery honesty, images,
reviews, bundle) — these are **not** things you should A/B test anyway; several are
correctness/compliance fixes that must ship regardless.

## Track B — A/B backlog (once traffic supports it)
For each: **hypothesis · problem · variation · primary metric · guardrail · sample
note · expected direction · effort · duration method · risks.** No test is promised
to win.

### T1 — Real product imagery vs placeholders
- **Hypothesis:** real photos + one in-scale shot raise PDP→ATC.
- **Problem:** zero images (S1).
- **Variation:** photographed PDP vs current.
- **Primary:** `add_to_cart` rate (PDP). **Guardrail:** return rate, page LCP.
- **Sample:** size to your PDP baseline; likely a large effect but still needs volume.
- **Direction:** ↑. **Effort:** M (shoot) / S (deploy). **Duration:** ≥2 full weeks, whole weeks only.
- **Risks:** none material; this is close to a must-do — consider shipping to 100%, not testing.

### T2 — Honest delivery messaging vs vague
- **Hypothesis:** a clear, honest delivery window reduces checkout abandonment (S5).
- **Primary:** `begin_checkout`→`purchase`. **Guardrail:** support tickets, chargebacks.
- **Direction:** ↑ completion / ↓ disputes. **Effort:** S. **Risks:** if honest window is long, ATC may dip but disputes fall — watch both.

### T3 — Social-proof block (real reviews) vs none
- **Hypothesis:** real reviews on PDP lift ATC. **Primary:** PDP→ATC. **Guardrail:** none.
- **Direction:** ↑. **Effort:** S (after reviews exist). **Risk:** needs genuine review volume first (S18).

### T4 — Homepage hero: image + single CTA vs current two-CTA gradient
- **Primary:** home→PDP rate. **Guardrail:** bounce. **Effort:** S. **Direction:** ↑.

### T5 — Bundle framing (fixed, honest saving) vs individual-first merchandising
- **Primary:** AOV + bundle CVR. **Guardrail:** overall CVR. **Effort:** S. **Risk:** must fix bundle facts first (L5).

### T6 — PDP spec block (dimensions/material/care) vs prose-only
- **Primary:** PDP→ATC; **Guardrail:** return rate (expect ↓). **Effort:** M.

## Method rules
- One change per test; whole-week durations (≥2 weeks) to cover weekly cycles.
- Pre-register hypothesis + primary metric; don't peek-and-stop.
- Prefer **sequential/Bayesian** or simple before/after at low volume; graduate to
  fixed-horizon A/B only when powered.
- Never claim a change "will" convert — measure it.
