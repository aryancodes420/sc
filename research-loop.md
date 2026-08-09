# The Convergence Loop — Research → Adversarial Scrutiny → Patch → Repeat

A specification for driving `/system/` toward the best methods actually identifiable, and for
knowing when to stop. Written after the first build, whose weaknesses it exists to fix.

---

## 0. What "absolute best" can and cannot mean

Two hard limits shape the whole design. Ignoring them produces a loop that spins forever and
converges on nothing.

**Limit 1 — the literature has a resolution floor.** Most effects in this field sit at d = 0.3–0.7
with between-study heterogeneity that swamps the gap between the 2nd- and 5th-best technique. Below
a certain granularity, "which method is best" is *not identifiable from the literature at all*, and
the question silently becomes "which method will actually get done." Past that floor, more research
rounds buy nothing and adherence dominates. The loop must detect that floor and stop.

**Limit 2 — population-best ≠ your-best.** Every effect size is an average over people who are not
you. The literature can tell you which levers exist and roughly how big they are; it cannot tell you
your ghosting cooldown, your verbatim cost per 100 words, or whether interleaving helps your case
discrimination. That is an N=1 question and only your own logged data can answer it.

**Therefore the loop is two nested cycles, not one:**

| | Outer loop | Inner loop |
|---|---|---|
| Question | What does the evidence support? | What works for *me*? |
| Evidence | Meta-analyses, primary studies | Your benchmark battery + daily log |
| Cadence | 3–4 rounds, then quarterly | Continuous, 2-week blocks |
| Converges? | Yes, fast — hits the resolution floor | Never — you change |
| Failure if skipped | Building on folklore | Population averages applied to a person they don't fit |

The first build ran the outer loop **once**, with no adversarial pass. That is the gap.

---

## 1. What is actually wrong with the current build

Ranked by how much damage each does. These are the loop's initial work-list.

1. **No claim was ever independently verified.** Each lane ran once and reported what it found.
   Nothing checked anything. Cross-lane corroboration happened by luck (spacing: g = 0.74 and
   d = 0.71 from two lanes) rather than by design.
2. **Single-source load-bearing numbers.** The 22–46% divided-attention-at-encoding cost drives the
   single most invasive rule in the program (protect the encoding block absolutely). It rests on one
   1996 paper, read as an abstract. If that number is inflated, a core rule is over-specified.
3. **The lanes were briefed to find what works.** Only lanes 1 and 5 were explicitly asked for
   counter-evidence. Nobody ran a dedicated "strongest case against" pass on the *recommended*
   techniques. Confirmation pressure was built into the brief.
4. **Practitioner numbers set the gates.** "Deck under 3 min at 3 months", "~20 words/60 s at
   6 months", "~4-day ghosting cooldown", "~150 reviews/day sustainable" are `[ANECDOTE]` — forum
   and vendor sourced. They are also the numbers you will judge yourself against. Wrong gates
   produce either coasting or false failure, and both end the program.
5. **Coverage is unknown.** Each lane stopped at 12–20 searches with no completeness check. Nobody
   asked "what search modality did we never run?"
6. **`tracking.md` collects data that nothing consumes.** The system asks for daily numbers and then
   never feeds them back into its own parameters. That is a dead sensor, and it is the inner loop's
   entire input.
7. **Full text was never read.** The binding constraint, and the one thing more rounds cannot fix
   (see §5).

---

## 2. The outer loop — one round

### Stage A — Build the claim register (do once; maintain forever)

Parse `/system/` into `research/claim-register.tsv`. One row per load-bearing claim:

| field | meaning |
|---|---|
| `id` | stable key, e.g. `C-017` |
| `claim` | the assertion, in one sentence |
| `label` | `[ESTABLISHED]` / `[PROBABLE]` / `[CONTESTED]` / `[ANECDOTE]` |
| `source` | citation + which `/research/` file carries it |
| `verified` | `abstract-only` / `full-text` / `refuted` / `independent-corroboration` |
| `instructions_depending` | which `/system/` instructions collapse or change if this is wrong |
| `leverage` | 1–5: how much of the design dies with it |
| `uncertainty` | 1–5: from the label, source count, and replication status |
| `audit_priority` | `leverage × uncertainty` |

**The value-of-information gate, and it is the most important rule in this document:**
*Never audit a claim whose refutation would not change an instruction.* If `instructions_depending`
is empty, the claim is decoration — delete it from `/system/` rather than researching it. This is
what keeps the loop from expanding without bound.

### Stage B — Adversarial verification (fan-out, per claim, top N by `audit_priority`)

For each claim, spawn **3 refuters with distinct lenses** — diversity beats redundancy, because a
claim can be wrong in more than one way. Each is prompted to *refute*, defaulting to refuted when
uncertain:

1. **Replication lens** — has this been replicated? failed replications? preregistered attempts?
2. **Inflation lens** — publication bias, small-study effects, funnel asymmetry, effect shrinkage in
   later/larger studies, whether the abstract's number is the headline or a subgroup.
3. **Boundary lens** — under what conditions does it reverse or vanish? (This is how the
   interleaving `g = −0.39 for words` result was caught the first time — a general rule with a
   sign flip inside it.)
4. *(Substitute for lens 3 on practitioner claims)* **Provenance lens** — is this a real measurement
   or one forum post that got quoted onward until it looked like consensus?

**Verdict rule:** ≥2 of 3 refute → the claim is **downgraded one label**, and every instruction in
`instructions_depending` is re-derived without it. Not deleted silently — downgraded and re-derived,
so the change is auditable.

### Stage C — Coverage sweep (fan-out, per modality)

The first build searched one way: "what works." Run the angles that were never run, in parallel,
each blind to the others:

- **Critic modality** — "criticism of X", "X does not work", "failure to replicate X"
- **Adjacent-field modality** — the same mechanism under a different name in another literature
  (e.g. expertise research, sports skill acquisition, second-language acquisition, clinical
  rehabilitation)
- **Recency modality** — post-2023 only; the corpus skews old and some of it has moved
- **Practitioner-dissent modality** — people who trained hard on these methods and reported them
  failing, and *why*
- **Null-result modality** — registered reports and preregistered replications specifically
- **Methods modality** — is there a *technique* nobody in the six lanes mentioned? (This is the one
  that finds genuinely new material rather than re-grading old material.)

### Stage D — Dedup against the seen-register

Every finding ever surfaced — surviving *or* rejected — is hashed into `research/seen-register.tsv`.

**Dedup against `seen`, never against `confirmed`.** Deduping against what survived means every
rejected finding resurfaces each round, and the loop never converges. This is the single most common
way a loop like this fails.

### Stage E — Patch and changelog

Apply surviving changes to `/system/`. Every change writes a row to `system/CHANGELOG.md`:
`date | file | what changed | claim id | why | who refuted it`. A change with no claim id is not
permitted — that is how folklore re-enters a system that has already excluded it.

### Stage F — Completeness critic

One agent, whose only job is: *what is missing?* — a modality not run, a claim still
`abstract-only` at high leverage, a `/system/` instruction with no claim id, an unread source, a
contradiction between two surviving claims. **Its output is the next round's work-list.** If it
returns nothing, that is one of the two convergence conditions.

---

## 3. The stopping rule

Loose stopping rules are why research loops run forever. Define "dry" numerically:

**A round is dry when all three hold:**
1. Stage B produced **zero label changes**, and
2. Stage C produced **zero new claims that survive verification**, and
3. Stage F names **zero un-run modalities**.

**Converged = 2 consecutive dry rounds.** One dry round is noise; two is a signal.

**Hard ceilings, whichever binds first:**
- 4 outer rounds. Round 5+ on this corpus is almost certainly re-reading the same abstracts.
- Any round where <10% of audited claims change label — the resolution floor from §0 has been hit.
  Stop and hand off to the inner loop.

**The anti-thrash rule:** a claim that has been downgraded and then re-upgraded once may not change
again without *new full-text evidence*. Otherwise two lenses with different priors will oscillate a
claim forever and the loop mistakes churn for progress.

---

## 4. The inner loop — N=1 calibration

This is where "best method" stops being a literature question. It starts the day training starts and
never stops. It consumes `tracking.md`, which currently feeds nothing.

**Design: alternating-treatment, one variable at a time, fresh material per block.**

- **Block length:** 2 weeks per arm, alternating A/B/A/B. Shorter blocks are swamped by day-to-day
  variance; longer ones cost too much of the 12 weeks.
- **Outcome:** the delayed-recall score from `tracking.md` line 1, plus the relevant benchmark
  discipline. Never immediate recall.
- **Decision rule:** adopt the change only if the difference exceeds your own measurement noise.
  Estimate that noise first — from the spread of your weekly Memory League tracker over the first
  four weeks. If your week-to-week SD on ML Words is 2.5, a 1-word "improvement" is nothing.
- **Pre-register each test** in one line before running it: variable, arms, outcome, decision
  threshold. Post-hoc interpretation of your own training data is how people talk themselves into
  their favourite method.
- **One variable at a time**, and it must survive the two-week trial before another change is
  permitted — which is the `system freeze` rule already in `program.md`, doing double duty.

**The queue, in priority order** (each replaces an `[ANECDOTE]` or derived number with your data):

| # | Variable | Currently set from | Replace with |
|---|---|---|---|
| 1 | Ghosting cooldown | practitioner ~4 days | your measured overwrite-interference curve (already specced in `drills.md`) |
| 2 | Verbatim cost per 100 words | derived estimate, 15–25 min | your logged time-to-first-perfect-recitation |
| 3 | Sustainable review load | vendor blogs, ~150/day | the load at which your 7-day adherence starts falling |
| 4 | Desired retention per preset | 0.93 / 0.90 / 0.85 from formula | measured lapse rate vs minutes on *your* material |
| 5 | Interleave vs block on your case-discrimination material | Brunmair moderators | A/B on your own domain material |
| 6 | Encoding-block placement | last 2–3 waking hours | A/B evening vs morning against 24 h recall |
| 7 | Optimal new-card rate | 15/day, derived | the rate holding reviews near your sustainable load |

Variables 1–3 should be running by week 4. They are the three numbers most likely to be wrong and
most likely to matter.

---

## 5. The binding constraint, stated plainly

**Full-text access dominates every other improvement available.** All six lanes were blocked at the
egress proxy and worked from search-surfaced abstracts. No number of additional rounds fixes that —
re-running searches over a corpus you cannot open just re-derives the same abstracts with more
confidence than they earned, which is *worse* than one honest round.

So the loop carries a **verification queue**: every `abstract-only` claim with `audit_priority ≥ 12`,
listed in `research/verification-queue.md`, discharged in a single batch the moment full text is
available by any route — unblocked egress, a university library, PDFs supplied directly, or an
interlibrary request. Discharging that queue is worth more than rounds 2, 3 and 4 combined.

**Priority order for improving this system, honestly ranked:**

1. Get full text for the ~12 highest-leverage claims. Dominates everything below.
2. Run outer-loop round 1 (adversarial verification + coverage sweep) on the current claim set.
3. Start the inner loop the day training starts — variables 1–3.
4. Outer-loop rounds 2–4, only while they keep changing labels.

---

## 6. Round-1 work-list (ready to execute)

Derived from §1. Roughly 12–16 agents.

**Verify adversarially (3 lenses each):**
- Divided attention at encoding, 22–46% (single source, maximum leverage)
- Spacing g = 0.74 / d = 0.71 (cross-corroborated — verify the *convergence* isn't shared-study overlap)
- Dresler 26 → 62 words and the 4-month durability (the program's headline promise)
- Retrieval practice g = 0.50 / 0.61
- Sleep benefit g = 0.44
- Method of loci g = 0.65, and its "high risk of trial bias" caveat
- Roediger 1980 abstract-noun null (drives the entire symbol-lexicon design)

**Provenance-check (practitioner numbers that set the gates):**
- Deck <3 min at 3 months; ~20 words/60 s at 6 months
- ~4-day ghosting cooldown
- ~150 reviews/day sustainable ceiling
- The Master-of-Memory standards conflict between lanes 2 and 6 (currently unresolved)

**Coverage sweep (modalities never run):**
- Critic + null-result modality on method of loci and on spaced repetition
- Post-2023 recency sweep across all six lanes
- Methods modality: what technique did all six lanes miss?
- Practitioner-dissent: people who trained hard and quit, and their stated reasons

**Completeness critic** closes the round and writes the round-2 work-list.
