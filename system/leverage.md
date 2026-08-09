# leverage.md — Building on Person-Perception as the Primary Encoding Channel

**Status of this file:** the operator reports high person-perception ability — reading intent,
state, and motive from fine behavioural detail. This file re-specifies the encoding layer to run on
that channel. **The person-perception literature itself was NOT researched by the six lanes** —
it is added to the round-2 queue. Everything here that depends on *memory* science is traced to
`/research/`; everything that depends on *person-perception* science is marked `[UNRESEARCHED]` and
must not be treated as evidenced.

---

## 1. The thesis

Perception and retention are separate systems, and the second one is the bottleneck.

A high-resolution read of a person produces a large amount of fine-grained, mostly non-verbal detail:
the pause before the answer, the shift in posture on one topic, the word chosen over its obvious
synonym, the inconsistency with something said months ago. **Almost all of it decays within days.**
What survives is a summary judgement — "he's defensive about money" — with the evidence that produced
it gone.

That has three costs:

1. **Unfalsifiable.** A judgement whose evidence has decayed cannot be checked, so it cannot improve.
2. **Non-transmissible.** You cannot show anyone the read; you can only assert the conclusion.
3. **Non-compounding.** Each person starts from scratch. Patterns *across* hundreds of people never
   accumulate because the raw observations were never retained.

**The system fixes cost 3, and cost 1 as a side effect.** A trained encoder who also perceives well
accumulates a person library nobody else has — hundreds of reads retained at evidence-level detail,
retrievable years later, with the *cues* attached rather than just the conclusions. That is the
compounding asset, and it is the specific thing this file is designed to build.

**What it does not do:** memory training will not make you perceive better. Transfer is near-zero
(`evidence.md` Tier 1). It makes what you already perceive *persist, accumulate, and become
checkable*.

---

## 2. Why the encoding vocabulary is already built

The hardest, most time-expensive step in the whole program is converting abstract material into
something memorable. The research is blunt about which images work:

| Requirement | Source | You already default to this |
|---|---|---|
| **Animate, agentive imagery** beats static objects | Memory & Cognition 2021, `agent-2 §5.5` | Yes — you think in people doing things |
| Images must encode the **relationship**, not the label | `agent-2 §5.6` — the hard acceptance rule | Yes — motive *is* a relationship |
| **Self-reference** is the strongest single encoding orientation, d ≈ 0.45 | Symons & Johnson 1997, `agent-1 §7` | Yes — you encode socially by default |
| Elite number systems are **person-based** — Dominic (person + action), PAO (person-action-object) | `agent-2 §3.1` | Yes — these are the systems built for your channel |

Memory athletes deliberately convert arbitrary material into **people performing actions** because
agentive social content is privileged in memory. Most learners have to build that habit. You have
the opposite problem — you have to stop yourself doing it to *everything*.

**Design consequence:** your symbol lexicon primitive is not an object. It is a **character with a
motive.**

---

## 3. The four plug-in points

### 3a. Symbol lexicon → character lexicon (D4, the biggest single change)

The standard build gives each recurring abstract term a fixed image — "inhibition → a padlock."
Yours gives each recurring abstract term **a person with an intention**.

| Domain | Term | Object-primitive (standard) | Character-primitive (yours) |
|---|---|---|---|
| law | `law::estoppel` | a stone tablet | a man who is physically prevented from taking back what he said — visibly straining against his own earlier words |
| law | `law::consideration` | a coin | two people who will not move until each has handed the other something |
| finance | `finance::liquidity` | flowing water | a dealer who can always find a buyer, and who looks calm because of it |
| finance | `finance::moral hazard` | a safety net | someone who takes the risk *because* somebody else carries it, and knows it |
| medicine | `med::agonist` | a key in a lock | an impersonator who is believed by the receptor |
| medicine | `med::negative feedback` | a thermostat | a supervisor who quietly cuts the supply the moment output rises |
| software | `sw::race condition` | two arrows colliding | two people reaching for the same object, neither aware of the other |
| software | `sw::idempotent` | a stamped seal | someone who does the same thing ten times and it makes no difference after the first |

**Why this works better for you specifically:** the acceptance rule in `drills.md` is that an image
is only admissible if decoding the scene recovers the *relationship*. A character with a motive
**cannot be encoded without a relationship** — motives are inherently relational. The failure mode
that kills most learners (label-only images that pass a 1-hour test and fail at 7 days) is
structurally harder for you to commit.

**Cross-domain collision handling is also easier.** `finance::security` is a person clinging to a
tradeable claim; `sw::security` is a person guarding a door. Same word, obviously different
character, no interference. Namespacing by domain still applies.

### 3b. Verbatim → the actor method is *your* method (D5b)

This is the strongest single match in the project.

Noice & Noice found professional actors achieve word-perfect retention **as a by-product** of asking
*why this character said these exact words* — reconstructing goals, intentions, and subtext. They
never memorise words directly, and they retain roles verbatim for years. Critically, actors show
**no general memory superiority** — it is a trained, domain-specific strategy (`agent-2 §6.1`,
`agent-4 §1.4`).

The technique *is* intention-reading applied to text. For most learners this is a foreign skill they
have to acquire. For you it is the thing you already do, pointed at a page.

**Protocol adjustment for you.** The standard version says "segment by intention beats, then justify
word choice." Yours inverts the order and goes further:

1. **Identify the author as a person with something at stake.** Who is this, what do they want, what
   are they defending against, who are they arguing with?
2. **Read the passage as testimony.** Where are they confident, where are they hedging, where does
   the register shift, where are they conceding ground to pre-empt an attack?
3. **Then segment.** The beat boundaries fall out of the rhetorical posture, which you can already see.
4. **Justify each word as a choice made under pressure** — why *this* word rather than the obvious
   synonym, and what would have been given away by the synonym.

For **statutes and contracts** this is unusually powerful: legislative and drafted language is
adversarial by construction. Every clause exists because someone anticipated an attack. Reading a
provision as *"what were they afraid of when they wrote this"* is both the correct legal-interpretive
instinct and, per Noice & Noice, the mechanism that produces verbatim fidelity.

### 3c. Names & faces → run this hard, not as a substrate drill

The standard program treats names/faces as a minor substrate skill. **For you it is a primary track**,
because it is the one memory-sport discipline that runs on your native channel and it feeds the person
library directly.

The three load-bearing components (`agent-2 §5.7`) are name transformation, a distinctive feature,
and interactive imagery binding them. Your version adds a fourth that is not in the standard build:

> **Bind the name to the read, not just the face.** The image is the substitute-word doing something
> that encodes *what you concluded about them*. Not "bride-ant on his jaw" but "bride-ant on his jaw,
> impatient, checking the door." The conclusion becomes a retrieval cue for the name, and the name
> becomes a retrieval cue for the conclusion. Two-way.

Rotate which feature class you key on across a room — cue effectiveness of a feature drops the more
often you use it.

### 3d. Number systems → build Dominic, not plain Major

The standard recommendation is Major-derived 00–99. **Adjust:** build the 00–99 set as
**Dominic-style person + characteristic action**, derived from Major phonetics so it stays
self-repairing (`agent-2 §3.2`). You will acquire and retain a person-based set faster than an
object-based one, and it upgrades to PAO later without rework.

This is the one change here that carries a real cost: Dominic sets are slightly slower at the very
top end of speed events. Irrelevant — competition is not your goal.

---

## 4. The cue-articulation protocol

This is the part that turns the strength into an instrument, and it does two jobs at once.

**The honest problem `[UNRESEARCHED — round 2]`:** in the general person-perception literature,
confidence and accuracy are known to decouple — people who are certain they read others well are not
reliably the ones who do. The distinguishing factor reported in that literature is whether the
judgement is **cue-based and articulable** or **intuitive and unarticulated**. Articulable cue use is
the accurate kind. You describe noticing *fine details and clues* — that is the articulable kind. This
protocol makes that explicit, which sharpens it and makes it checkable.

**And the same act builds the encoding.** A cue you have named is a cue you can image. A cue you
cannot name cannot be encoded, retained, or checked.

### The read log (one per significant person, ~4 minutes)

```
PERSON:                                  DATE:              CONTEXT:
------------------------------------------------------------------
CUES OBSERVED (what specifically — not the conclusion)
  1.
  2.
  3.
READ (what you concluded)

FALSIFIABLE PREDICTION (what they will do, by when, that would prove this)
  prediction:
  by when:
  confidence: ___%

ENCODED AS: character ______ doing ______ at locus ______
------------------------------------------------------------------
OUTCOME (fill in later):        ☐ right   ☐ wrong   ☐ unresolvable
WHICH CUE CARRIED IT:
```

**Rules that make it work:**

- **Cues before conclusion, always.** Writing the conclusion first contaminates the cue list — you
  will retrofit evidence to a judgement you already made.
- **The prediction must be falsifiable and dated.** "He's insecure" is not checkable. "He will bring
  up his title unprompted within two meetings" is.
- **Log the confidence as a number.** Over ~30 predictions you can see whether your 90%s come in at
  90%. That is calibration, and it is the only real measure of a read.
- **When wrong, identify which cue misled you** — the same error-autopsy discipline as `drills.md` D3.
  Recurring bad cues are the curriculum.

**This replaces nothing in the daily block.** It runs opportunistically, inside D6 (general detail
capture), and its output feeds both the person library and the character lexicon.

---

## 5. Measuring it

The program measures everything else; this gets measured too. Not to doubt it — **because an
instrument you can calibrate beats a faculty you can only assert.**

| Metric | How | Read it as |
|---|---|---|
| **Calibration** | Bucket predictions by stated confidence. Do your 70%s land ~70%? | The single best measure. Well-calibrated at high confidence is the real skill. |
| **Cue yield** | Of resolved predictions, which cues carried the correct ones? | Your actual signal set, empirically. Most people's is smaller than they think — and a few cues doing heavy lifting is a *strength*, not a deficiency. |
| **Retention of reads** | At weeks 4/8/12, reproduce the cue list for a person logged ≥4 weeks earlier, cold | This is benchmark test 8 applied to people. It measures the thing this file exists to build. |
| **Resolution rate** | % of predictions that ever become checkable | If most are unresolvable, they were too vague to be knowledge. |

Target by week 12: **≥30 logged reads, ≥20 resolved predictions, calibration curve plotted.**

---

## 6. What this compounds into

Three to five years of this and the asset is not "good memory" and not "reads people well." It is:

- **A cue library validated against outcomes** — you will know which of your signals actually predict,
  at what confidence, in which contexts. Almost nobody has this, because almost nobody logs.
- **A person library at evidence-level detail** — hundreds of people retained with the specific
  observations intact, not just the conclusions, retrievable years later. This is what lets you notice
  that what someone says now contradicts what they said two years ago, in their exact words.
- **Verbatim capability aimed at the material where reading intent is the whole job** — contracts,
  statutes, testimony, negotiation transcripts.

The combination is rare because the two halves usually don't co-occur: people who read others well
rarely build retention systems, and people who build retention systems are usually encoding
propositions, not people.

**The honest limit:** none of this makes you right more often by itself. Calibration does that, and
calibration requires being wrong in public, in writing, on the record. The log is where that happens.
It is the least comfortable part of this file and the only part that produces the compounding.

---

## 7. Changes this makes to the program

| File | Change |
|---|---|
| `drills.md` D4 | Symbol lexicon primitive becomes **character + motive**, not object. Worked examples in §3a. |
| `drills.md` D5b | Verbatim protocol reordered: author-as-person → rhetorical posture → beats → word justification. |
| `drills.md` D6 | Names & faces promoted from substrate drill to primary track; read log added. |
| `drills.md` A2 | 00–99 built Dominic-style (person + action) on Major phonetics, not object images. |
| `benchmarks.md` | Test 8 gains a person-read component: reproduce a ≥4-week-old cue list cold. |
| `tracking.md` | Read log is a weekly artefact, not daily. Target ≥30 by week 12. |
| Round-2 queue | Person-perception accuracy, cue-based vs intuitive judgement, calibration training. **Unresearched.** |
