# drills.md — Daily Drills and Progression Standards

Every drill below has: a purpose, a protocol, a scoring rule, and a numeric gate that must be
cleared before the next level opens. Sources are traced to `/research/` files in `evidence.md`.

## Three scoring laws (these override any instinct you have)

1. **Score on 24-hour delayed recall, never on immediate recall.** Wagner et al. 2021 found
   mnemonic training specifically increases the proportion of *durable* memories; immediate recall
   does not distinguish the memories that survive from the ones that don't. [research/agent-2 §1.3]
   Immediate scores are permitted only inside speed drills, where the point is throughput.
2. **All-or-nothing scoring on anything verbatim.** USA Memory Championship poetry scoring is
   per-line all-or-nothing: one error in a line scores zero for that line. Partial-credit habits
   produce approximate recall, which is worth nothing for verbatim. [research/agent-2 §6.5]
3. **A relationship-recall standard for concepts.** A concept item counts as recalled only if you
   reproduce the *relationship*, not the label. Statistics students recalled mnemonics without
   corresponding conceptual performance — label-recall is the documented failure mode.
   [research/agent-2 §5.6]

---

## D0 — Image fluency (Week 1 only, then retired)

**Purpose:** generate a vivid, *animate, interacting* image for an arbitrary noun in under 3 s.
Animate imagery improved retention among novice method-of-loci users. [agent-2 §5.5]

**Protocol:** 50 random concrete nouns, timed. For each, one image containing a creature or person
performing an action. Static object images do not count.

**Gate to exit:** 50/50 imaged in ≤150 s, self-rated vivid. Typical: 3–6 sessions.

**Failure mode:** images that are *labels* — "the word DOG floating in the air." This kills
everything downstream and is the single most common Week-1 defect. [agent-2 Stage 0]

---

## D1 — Palace route drill (Weeks 1–2 build, then maintenance only)

**Purpose:** the route must be automatic before it can carry content. A palace you cannot walk in
order is not a palace. [agent-3 §6.2]

**Protocol:** build from a real, over-learned building. **5 loci per room**, one item per locus,
fixed non-branching order, no two loci visually confusable (two identical chairs = collision).
[agent-2 §2.1] Walk it forwards, backwards, and from an arbitrary locus, *with no content in it*.

**Gate:** 20-locus palace recited forwards and backwards without error, plus correct answer to
"what is locus 13?" in under 2 s.

**Maintenance:** route cards live in the `99-Palaces` Anki deck at max interval 180 days. Two
review minutes a month keeps a route. [agent-3 §6.2]

**Failure mode:** loci in an order you have to *think* about. Rebuild rather than patch.

---

## D2 — Substrate speed drill (10 min daily, permanent)

**Purpose:** imagery throughput. Numbers, cards and names are **not ends** in this program — they
are the fluency substrate that concept and verbatim encoding run on. They are also the only cleanly
scoreable tasks you have, which is what makes them the feedback channel.

**Protocol — the Foer forcing function.** Set the timer to **90% of your current best time**
(i.e. 10–20% faster than current pace) and run at that pace with accuracy allowed to degrade.
When accuracy holds ≥90% at that pace for two consecutive sessions, the target ratchets down
again automatically. Never practise at comfortable pace outside the warm-up. [agent-5 §7.1]

Mullen's split: ~25% of training time on speed drills, ~75% on full application. [agent-5 §2]

**Rotation** (one per day, Dellis-style discipline pairing across the week — [agent-5 §2]):

| Day | Drill |
|---|---|
| Mon / Wed | Digits (00–99 system) |
| Tue / Thu | Cards |
| Fri | Names & faces |
| Sat | Weekly benchmark (see `benchmarks.md`) |
| Sun | System slot — the only day you may change anything (see below) |

**Progression standards** (calibrated to documented amateur trajectories, [agent-2 §3.6, §3.7]):

| Milestone | Digits (5 min) | Full deck | Words (60 s) |
|---|---|---|---|
| Baseline (untrained) | ~20–30 | >6 min (normal) | 8–12 |
| Week 12 | 100 @ ≥95% immediate, ≥85% at 24 h | <3 min at 100% | 15–18 |
| Month 6 | 130–150 | <2 min | ~20 |
| Month 12 | 200 @ ≥95% | <90 s at 100% | 25–30 |
| Elite reference (not a target) | 100 digits in <15 s | 12.74 s (WR 2018) | 50 in 32.41 s |

**Accuracy rule:** chasing speed before accuracy is 100% is worthless — sub-3-minute with errors
scores zero under competition rules. Accuracy is the gate; speed is the dial. [agent-2 Stage 4]

**Failure mode:** treating this block as the program. It is 25%. If your concept and verbatim
blocks are slipping while your card times fall, you have drifted into the hobby and away from the
objective.

---

## D3 — Error autopsy (3 min daily, permanent, non-negotiable)

**Purpose:** this is the documented mechanism by which Foer broke his plateau, and it is the
feedback half of deliberate practice. Without it you are doing repetition, not practice.
[agent-5 §2, §4]

**Protocol:** for every item that failed in D2 or D4, write one line: *what* failed and *why the
image or locus failed*. Fix the image, not the effort. Categories that recur:

- image was a label, not a scene
- locus was confusable with a neighbour
- image was static (no agent, no verb)
- the image encoded the term but not the relationship
- ghosting: a previous occupant of that locus resurfaced

**Gate:** none — but a week with zero autopsy entries means you were not working at the edge of
ability, which is a program violation, not an achievement.

---

## D4 — Concept encoding drill (PRIMARY — 45% of encoding volume)

**Purpose:** the mission's actual objective. This is the largest single investment in the whole
program and the one that delivers the brief. [agent-2 Stage 5]

**The hard fact this drill exists to solve:** naïve method of loci does **not** work on abstract
material. Roediger (1980) found a reliable loci advantage for concrete nouns and *none* for abstract
nouns. The mnemonic is not "put it in a palace" — it is the **conversion step that precedes** the
palace. [agent-2 §5.1]

### Protocol (30 min, on real target material — never synthetic)

1. **Classify the structure** of the page: list / tree / process / matrix. Choose the spatial
   grammar to match — hierarchy → containment or vertical position; sequence/process → direction of
   travel; causation → one image physically acting on the next; contrast → opposing rooms;
   magnitude → image size. **The palace layout must be isomorphic to the content structure.**
   [agent-2 §5.4]
2. **Convert via the symbol lexicon** (below). Assemble new facts from symbols you already own.
3. **Encode into a cold-archive palace** (never a hot-pool speed-drill palace — see palace hygiene).
4. **Self-reference pass:** force one link to your own experience, projects or prior knowledge.
   Self-referential encoding is the strongest single encoding orientation, d ≈ 0.45, and it is
   nearly free. [agent-1 §7]
5. **Self-explain:** "this follows from X because Y; it would be false if Z." g = 0.55.
   [agent-1 §5, agent-4 §1.2]
6. **Test at 24 h and at 7 d**, scored on the relationship standard.

### The symbol lexicon — the highest-leverage artefact in this program

A written, permanent file: **one fixed image per recurring abstract term**, reused forever, so a
new fact assembles from known parts rather than requiring fresh invention. Invention cost is the
real bottleneck at scale; the lexicon amortises it. [agent-2 §5.3]

**The acceptance rule (hard):** an image is admissible only if a naïve observer decoding the scene
would recover the **relationship**, not merely the word. A padlock jamming a keyhole encodes
inhibition-at-receptor; the acronym "SOAP" encodes nothing. Label-only images go to flashcards
instead. [agent-2 §5.6]

**Domain namespacing (required for your profile).** You are running four domains — software/math,
law, medicine, finance. Collisions are guaranteed: *capital*, *security*, *resolution*, *stress*,
*discount*, *derivative* all mean different things per domain. Two rules:

- Every lexicon entry is written `domain::term → image`. A symbol is scoped to its domain.
- **Palace estates are domain-segregated.** A locus never hosts two domains. This is the
  interference rule (Wozniak rule 11) applied at the spatial level. [agent-3 §4.1]

**Growth rate:** ~5 permanent symbols per session. **Gate at Week 12: ≥150 entries.**
[agent-2 Stage 5]

### Intake discipline (protects against the fragmentation risk of four domains)

**One primary domain at a time for new material.** The others go to maintenance. Four domains
ingesting simultaneously fragments review load and is the documented route to the review-debt
spiral. [agent-5 §7.2]

### Progression standard

| Checkpoint | Standard |
|---|---|
| Week 4 | 15-item conceptual set, ≥80% at 24 h, relationship scoring |
| Week 8 | 30-item set, ≥85% at 7 d |
| Week 12 | 30-item set, ≥85% at 7 d **and** lexicon ≥150 entries **and** ≥50% of encoding volume on real target material |
| Month 6 | 50-item set from a live source (paper/chapter you had not seen), ≥85% at 7 d |

**Failure mode:** label-only images that pass a 1-hour test and fail a 1-week transfer test; and
re-inventing a symbol for a term already in the lexicon. Both are caught by the 7-day test, which is
why the 7-day test is not optional.

---

## D5 — Verbatim drill (30% of encoding volume) — TWO SEPARATE TECHNIQUES

Your two verbatim sub-types need different methods. Do not merge them.

### D5a — Technical / legal text (precision-dominant)

Statute language, definitions, spec text, theorem statements, doctrinal element-tests.

1. **One locus per clause**, one well-chosen **cue word** per clause — the word that reinstates the
   whole clause. Function words and syntax ride on grammatical constraint. [agent-2 §6.3]
2. Element-tests (e.g. the four elements of negligence) encode as a **fixed ordered locus
   sequence**, which is what makes order recoverable under pressure.
3. Spoken pass at full speed. **If a line stalls, the cue word was wrong — fix the cue, do not add
   repetitions.** [agent-2 §6.3]

### D5b — Prose, literature, speeches (prosody-dominant)

1. **Beat segmentation:** break into 6–8 chunks of 10–15 words at *intention* boundaries — where
   the author's rhetorical purpose shifts. Label each with a verb: "concedes", "pivots", "lands."
   [agent-4 §C1]
2. **Meaning justification:** for each chunk answer *why these words and not synonyms*. This is the
   actor mechanism — Noice & Noice found professional actors achieve word-perfect retention as a
   **by-product** of interrogating word choice, never by rote, and retain roles verbatim for years.
   Critically, actors show **no general memory superiority** — this is a trained, domain-specific
   strategy, which is the mission thesis in miniature. [agent-2 §6.1, agent-4 §1.4]
3. **Motor enactment:** assign a physical gesture per chunk; rehearse standing and moving. Gesture
   becomes a retrieval cue independent of the semantic one. [agent-2 §6.2]
4. **Rehearse aloud at performance tempo.** Silent rehearsal strips the prosodic cue channel that is
   doing much of the work. [agent-2 §6.4]

### Shared back half (both sub-types)

5. **Cumulative snowball:** recite chunk 1 → 1+2 → 1+2+3. Each addition requires clean recall of
   everything prior. Errors trigger re-justification of the failed chunk, not blind repetition.
6. **Graduated cue removal:** full text → first-letter transcript → chunk-label only → blank.
   Advance a rung only after two consecutive clean runs. First-letter skeletons are a **self-test
   scaffold only, never the primary encoding** — evidence for first-letter mnemonics as an encoding
   method is mixed. [agent-2 §6.6, agent-4 §C4]
7. **Stop at first perfect recitation. Do not overdrill the same day.** Return at ~24 h, ~3 d, ~1 w,
   ~3 w, ~2 mo, each a 2–4 min blank-page recitation with error-driven repair on failures only.
   [agent-4 §C5]

**Cost model — refuse targets you cannot afford.** ~15–25 min per 100 words to first perfect
recitation untrained, falling to 8–12 min trained; plus ~20–35 min of spaced maintenance for
3-month durability. Budget **~40 min lifetime per 100 verbatim words** and require a named occasion
on which you will produce those words. [agent-4 §1.4] *(This is a derived engineering estimate, not
a cited measurement — replace it with your own logged figures within two weeks.)*

**Progression standard**

| Checkpoint | Standard |
|---|---|
| Week 4 | 12-line passage, 100% all-or-nothing at 24 h |
| Week 8 | 30-line passage, ≥70% of lines perfect at 24 h |
| Week 12 | 30-line unfamiliar passage, 15 min to memorise, ≥60% of lines perfect at 24 h (USAMC format) |
| Month 9 | 60-line passage, ≥80% of lines perfect at 7 d |

60% at Week 12 is a realistic amateur mark; elite competitors score far higher. [agent-2 Stage 6]

---

## D6 — General detail capture (25% — always-on, not a scheduled block)

Names, numbers, dates, and conversational or situational detail arrive without warning, so this is
trained as a habit, not a session.

**Names & faces — all three components are load-bearing** [agent-2 §5.7]:
(a) name transformation to a concrete substitute ("Bryant" → "bride ant"),
(b) a prominent **distinctive** facial feature,
(c) interactive imagery binding them.
**Rotate the feature class** (eyes / jaw / hairline / brow) across a room of people — cue
effectiveness of a feature *decreases* the more often you use it and increases with its
distinctiveness across the set.

**Numbers in the wild:** run through the 00–99 system on sight. This is what the substrate drill is
for.

**Small ordered lists:** use rhyming pegs 1–10 (built in one sitting) as a scratch register, so you
never burn a palace on a six-item list. Link/story method is for **intra-locus glue and throwaway
capture only** — never the primary architecture for anything you intend to keep, because chains fail
catastrophically while loci contain errors. [agent-2 §4.1, §4.2]

**Evening sweep (2 min, inside the log):** name three details from the day you deliberately encoded.
This is a retrieval rep and an adherence check in one.

---

## Palace hygiene (governs D2, D4, D5)

**Two pools, never mixed** [agent-2 §2.3, §2.4]:

- **Hot pool** — 2–4 journeys, deliberately overwritten daily for speed drills. Interference is
  acceptable because the content is disposable.
- **Cold archive** — write-once-per-topic journeys for material you intend to keep, domain-
  segregated, retrieval-practised rather than overwritten.

**Never store real target material in a journey that is in your speed-drill rotation.**

**Ghosting cooldown:** measure your own. Write a list into palace A, wait 1 / 3 / 5 days, overwrite,
measure the ghosting rate. That measurement *is* your personal cooldown constant. Practitioner
reference point is ~4 days. Size the portfolio off training consumption (loci used per session ×
cooldown days), not off the size of one event. [agent-2 §2.2]

**Index or die.** A spreadsheet with one row per palace: name, source location, room count, locus
count, current occupant/topic, date last written, date free. An unindexed portfolio caps out around
10 palaces. Global locus numbering (`03-2-4` = palace 3, room 2, locus 4) gives random access.
[agent-2 §2.5]

**Retire the scaffolding.** Once the plain fact card reaches ~180-day stability, suspend the image
cards and free the loci. Keeping dead image cards alive forever is a silent tax that grows without
bound. Quarterly sweep: filter `prop:s>180 tag:palace-image`, suspend. [agent-3 §6.3]

---

## Two rules that decide whether any of this compounds

**Interleave discrimination; block vocabulary.** Interleaving is *not* universal: g = 0.42 overall,
g = 0.67 for visual/inductive category learning, g = 0.34 for maths — but **g = −0.39 for words,
where blocking wins**. Interleave problem types, diagnostic categories, case discrimination —
anything answering "which kind is this?" Block terminology, definitions and one-to-one fact
learning. Applying interleaving universally makes a large chunk of your curriculum measurably worse.
[agent-1 §8]

**Protect encoding, not review.** Dividing attention at encoding costs 22–46% of recall; dividing it
at retrieval costs 1–13%. So: D4 and D5 are single-tasked and interruption-proofed to a degree that
feels excessive. D2 and Anki review can tolerate imperfect conditions — deliberately schedule them
into imperfect conditions and spend your protected quiet on encoding. [agent-1 §1]

---

## System freeze

Changes to encoding systems, palace inventories, card templates or tooling are permitted **only in
the Sunday system slot**. Any adopted change must survive a **2-week trial with logged scores**
before a further change is allowed. System churn — endless retooling in place of reps — is one of
the five documented quit causes, and Dellis's documented week quarantines system work to one day.
[agent-5 §7.3]

## What you are explicitly NOT building

Do not build a 3-digit (000–999) system or PAO in the first 12 months unless competition becomes a
real goal. It is roughly 10× the image-learning cost for ~1.5× the digit rate — for a learner whose
priority material is concepts and text, close to pure waste. Gate: Stage 3 and 4 standards held for
30 consecutive days before this is even discussable. Building 1000 images for a use case that never
materialises is the single most common wasted year in this hobby. [agent-2 §3.3, Stage 7]
