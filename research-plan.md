# Research Plan — Engineered High-Fidelity Memory System

## 0. Design spec (non-negotiable)

No verified case of passive photographic/eidetic memory in adults exists. The target output —
near-perfect retention and on-demand recall of chosen material — is therefore produced by a
**pipeline**, not a faculty. The pipeline is:

```
SELECT → ENCODE (deep + imagistic) → STORE (structured loci / schema) → SCHEDULE (spaced retrieval) → CONSOLIDATE (sleep) → RETRIEVE UNDER LOAD (benchmarks)
```

Every recommendation in /system/ must attach to a stage of that pipeline. Anything that does not
is cut. Pseudoscience is rejected on sight: photoreading, subliminal learning, "10% of the brain",
unevidenced nootropic stacks, "whole-brain" / hemispheric-balance training, RSVP-based speed
reading marketed as comprehension-neutral.

## 1. Subject profile assumed for this build

- Adult, high motivation, 60–90 min/day dedicated training + integration into normal reading/study.
- **PRIORITY MATERIAL (operator-confirmed):**
  1. **Dense technical concepts** — understanding *and* durable retention, not recall of labels.
     PRIMARY. This is the hardest case in the literature (abstract, non-imageable, structure-heavy)
     and gets the largest share of program time.
  2. **Verbatim passages** — word-perfect reproduction. PRIMARY.
  3. **General detail capture** — names, numbers, dates, conversational and situational detail
     encountered without warning. SECONDARY but continuous: this is trained as an always-on
     capture habit rather than a scheduled block, because it has no advance notice.
  Retained as pluggable tracks but weighted ~45 / 30 / 25. Numbers and names are trained as
  *substrate skills* (they build the imagery fluency the other two depend on), not as ends.
- **Domains (operator-confirmed): all four — software/CS/math, law/regulation/policy,
  medicine/bio/chem, finance/economics/quant — "and more."** Design consequences, binding on synthesis:
  (a) The core system must be **domain-general**; no domain-specific mnemonic convention may be
      hard-coded into the program. What is domain-specific is the **symbol lexicon**, which the
      learner builds per domain from a fixed procedure the system supplies.
  (b) Worked examples (cards, encodings, palace layouts) must **span all four domains**, not one.
  (c) **Cross-domain interference becomes a first-class risk**: one symbol lexicon serving four
      fields will collide (e.g. "capital", "security", "resolution", "stress" mean different things
      per domain). Mitigation to design in: domain-namespaced symbols and domain-segregated palace
      estates, so a locus never hosts two domains.
  (d) Breadth raises volume risk. The program must enforce **one primary domain at a time** for new
      material intake, with the others in maintenance, or review load fragments and adherence fails.
- **Verbatim sub-types (operator-confirmed):** technical/legal text (precision-dominant → loci-per-
  clause, element-test encoding) AND prose/literature/speeches (prosody-dominant → Noice & Noice
  active-experiencing, meaning-first rehearsal). Both get drills; they are different techniques and
  must not be merged into one instruction.
- **Stated goal, in the operator's terms:** "see something and be able to perfectly understand and
  remember it." Design translation: single-exposure comprehension + deliberate encoding at first
  contact (target 30–120 s per dense chunk, falling with fluency) + a retrieval schedule that drives
  per-item maintenance cost toward zero. The system optimises for *time-to-permanent* per unit of
  material, not for passive absorption. No lane may respond to this goal by lowering it; lanes report
  what the evidence supports and the program closes the gap with training volume and technique.
- Timeline: measurable superiority at 12 weeks; elite trajectory over 12 months.

## 2. How the six lanes compose into one system

| Lane | Owns | Feeds |
|---|---|---|
| A1 Cognitive architecture | The *why*: effect sizes for retrieval practice, spacing, interleaving, chunking, levels of processing, forgetting functions | Sets the priority order of every other lane; vetoes any technique with weak effect size |
| A2 Mnemonic systems | The *encoding engine*: loci, PAO/Major/Dominic, pegs, abstraction→image, verbatim technique | Supplies the daily drill content (A3 schedules what A2 encodes) |
| A3 Spaced repetition engineering | The *storage & schedule layer*: FSRS config, retention targets, card atomicity | Turns A2's encodings and A4's extractions into permanent items |
| A4 Reading & ingestion | The *front end*: how source material becomes candidate items | Produces input for A2 (imagistic material) and A3 (cards) |
| A5 Elite practitioners & failure modes | The *dose and adherence model*: real schedules, plateau causes, countermeasures | Constrains the program to what is actually sustained at 60–90 min/day |
| A6 Consolidation & measurement | The *substrate and the scoreboard*: sleep, exercise, stress, caffeine, attention; benchmark protocols | Sets recovery rules and supplies benchmarks.md |

Composition logic: **A1 ranks, A2 encodes, A3 schedules, A4 feeds, A5 doses, A6 sustains and
measures.** Conflicts are resolved in that order of authority for mechanism claims (A1 wins on
"does this work"), and in A5's favour for dose/adherence claims (A5 wins on "will this be done").

## 3. What each lane must answer

- **A1**: 12 highest-leverage findings ranked by effect size, with the spacing/expanding-interval
  question resolved and the forgetting-curve shape stated quantitatively.
- **A2**: A novice→competition skill tree with drills and numeric progression standards per stage,
  including palace-portfolio management (how many, how reused, decay/interference handling) and the
  hard case: abstract conceptual material and word-perfect verbatim text.
- **A3**: Exact FSRS settings (desired retention, learning steps, max interval, burying, load
  modelling at 90/95/97%), plus a card style guide with 10 worked examples across facts, formulas,
  verbatim lines, concepts.
- **A4**: A complete reading OS with per-step time cost, and an honest evidence review of speed
  reading including debunks.
- **A5**: What the top 0.1% do daily, [DOCUMENTED] vs claimed, and 5 plateau/quit causes with
  countermeasures.
- **A6**: Evidence-graded recovery rules (sleep architecture, exercise, stress, caffeine) plus a
  validated, repeatable self-test battery with scoring standards.

## 4. Known overlap risks between lanes (and the boundary rule)

| Overlap | Risk | Boundary rule |
|---|---|---|
| A1 ↔ A3 (spacing) | Both will cover spacing effects; A3 may re-derive A1's science | A1 owns the *science* of spacing; A3 owns *implementation in Anki/FSRS only* |
| A1 ↔ A4 (testing effect) | Both cover retrieval practice | A1 owns effect sizes; A4 owns the *workflow* that forces retrieval while reading |
| A2 ↔ A4 (verbatim) | Both cover word-perfect memorisation | A2 owns the mnemonic mechanics; A4 owns the ingestion/rehearsal loop and time cost |
| A3 ↔ A4 (incremental reading) | Both touch SuperMemo-style IR | A4 owns IR as a reading workflow; A3 owns whether/how to implement it in Anki |
| A5 ↔ A6 (training load) | Both touch sustainability | A5 owns practice *structure*; A6 owns *physiological recovery* |
| A2 ↔ A5 (athlete methods) | Both cite memory athletes | A2 owns technique; A5 owns schedule/volume/adherence |
| All ↔ pseudoscience | Duplicate debunking | A4 owns the speed-reading debunk; others cite it, do not re-litigate |

Each subagent is told its boundaries explicitly so the six files compose rather than collide.

## 5. Synthesis rules (Phase 2)

1. Read all six files from disk before writing anything in /system/.
2. Where lanes conflict: state both positions, pick one, give the reason, record it in
   /system/evidence.md under "Resolved conflicts".
3. Every /system/ recommendation carries a traceable source: lane file + citation.
4. Confidence labels survive synthesis. A [CONTESTED] finding may not become an unhedged
   instruction.
5. Time budget must close: the daily schedule must sum to ≤90 min including review load projected
   from A3's FSRS model. If it does not close, cut from lowest effect size upward.
6. No motivational filler. Density only.

## 6. Definition of done

- [ ] `/research/agent-1..6-<lane>.md` exist, each with cited, confidence-labelled findings and a
      "→ Practice implication:" on every finding.
- [ ] `/system/README.md`, `program.md`, `drills.md`, `benchmarks.md`, `tracking.md`, `evidence.md` exist.
- [ ] Week-0 benchmark is explicitly scheduled BEFORE any training begins.
- [ ] Daily schedule sums to 60–90 min with review load modelled, not asserted.
- [ ] Red-team scores ≥8/10 on all five criteria; sub-8 items fixed and the changes stated.
- [ ] README answers "what do I do today" in executable steps with zero interpretation required.

## 7. Risks to the build itself

- **Citation fabrication** by subagents → mitigated by "cite only sources actually opened" and a
  red-team pass that spot-checks traceability.
- **Volume creep** → the 90-min ceiling is a hard constraint enforced in synthesis, not a target.
- **Technique maximalism** — loading every mnemonic system at once is the classic quit cause →
  program sequences one new system at a time with a competence gate before the next.
- **Benchmark drift** — week-4/8/12 tests must be *parallel forms* of week 0, not the same items,
  or scores measure item memory rather than capability.
