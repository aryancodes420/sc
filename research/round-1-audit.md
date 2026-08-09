# Round-1 Audit — Completeness Critic's Close

Closes outer-loop round 1 per `/research-loop.md` §2 Stage F. Input: the round-1 adversarial and
sweep payload. Output: verdict table, required `/system/` changes, new material, corrected
practitioner numbers, round-2 work-list, convergence call.

---

## 0. Integrity note on the round-1 payload — read first

The round was specified as **12 verdicts (4 claims × 3 lenses) + 3 coverage sweeps**. What was
actually delivered to this critic was:

- **8 complete verdicts** (C-001 × 3, C-002 × 3, C-003 × 2)
- **1 partial verdict** — C-003 / EFFECT-INFLATION terminated mid-sentence inside its
  `instruction_impact` field ("...Restate as")
- **0 of 3 C-004 verdicts** — the claim's *identity* is not even recoverable from the payload
- **0 of 3 coverage sweeps** — including the provenance sweep that §4 of this report is supposed to
  summarise

This is reported as a finding, not a caveat. Nothing below invents a C-004 verdict or a sweep
result. Where a section has no input, it says so.

**Second integrity finding: Stage A was never executed.** `/research-loop.md` requires
`research/claim-register.tsv` before Stage B. It does not exist. Neither does
`research/seen-register.tsv` (Stage D), `research/verification-queue.md` (§5), or
`system/CHANGELOG.md` (Stage E). Consequence: claim IDs C-001..C-004 have **no on-disk definition**,
so C-004 cannot be resolved by lookup, dedup cannot run in round 2, and no patch made from this
report can be logged in the form the loop mandates. Creating those four files is a round-2
precondition, not an optional tidy-up.

---

## 1. VERDICT TABLE

Rule applied: **≥2 of 3 lenses returning REFUTED or WEAKENED ⇒ downgrade one label and re-derive
every dependent instruction.** Ladder: `[ESTABLISHED] → [PROBABLE] → [CONTESTED] → [ANECDOTE]`.

| Claim | REPLICATION | INFLATION | BOUNDARY / PROVENANCE | Majority | Old label | **Final label** | System must change? |
|---|---|---|---|---|---|---|---|
| **C-001** — DA at encoding costs 22–46%; at retrieval 1–13% (`evidence.md` Tier 1) | WEAKENED | WEAKENED | WEAKENED | **3/3 weakened → DOWNGRADE** | `[ESTABLISHED]` | **split, see below** | **YES — 5 edits, one of which reverses a live instruction** |
| ├ C-001a — *direction*: encoding DA cost ≫ retrieval DA cost | survives | survives | survives | — | `[ESTABLISHED]` | **`[PROBABLE]`** | Yes (label + provenance flag) |
| ├ C-001b — *the magnitudes* 46% / 22% / 1–13% | not found in any source | not found in any source | not found in any source | **3/3 unlocatable** | `[ESTABLISHED]` | **STRIKE — unsourced** | Yes — delete from 4 files |
| └ C-001c — *"retrieval is nearly free"* ⇒ review under degraded conditions | refuted by co-author | material-specific | material-specific | **3/3 against** | `[ESTABLISHED]` | **`[CONTESTED]`** | Yes — the dependent rule is reversed |
| **C-002** — Roediger 1980: MoL reliable for concrete nouns, null for abstract (`evidence.md` Tier 2, `drills.md` D4) | **REFUTED** | WEAKENED | **REFUTED** | **3/3, 2 refuted → DOWNGRADE** | `[ESTABLISHED]` | **claim as written: REJECTED (provenance failure). Restated-with-correct-source: `[CONTESTED]`, abstract-only** | **YES — citation is wrong; the symbol lexicon loses its warrant** |
| **C-003** — Dresler 2017: 26→62/72 in 6 wks at ≤30 min/day, held at 4 months, "only RCT-grade dose evidence" | WEAKENED | WEAKENED | *not delivered* | **2/2 delivered → DOWNGRADE (threshold met on 2 lenses)** | `[ESTABLISHED]` | **`[PROBABLE]`**; sub-claim "held at 4 months" → **`[CONTESTED]`**; "RCT-grade" → **factually false, strike** | **YES — 6 edits incl. the headline promise in `README.md`** |
| **C-004** — *identity unknown* | **NOT DELIVERED** | **NOT DELIVERED** | **NOT DELIVERED** | — | — | **unaudited** | **Unknown — carries to round 2 as item 1** |

**Note on C-001's split.** The mechanical rule gives one downgrade step (`[ESTABLISHED]` →
`[PROBABLE]`), but all three lenses independently recommended `[CONTESTED]`. The discrepancy is
because C-001 as written in `evidence.md` bundles three separable assertions with different
evidential standing. Splitting it is the only way to apply the rule honestly: the direction is the
best-supported thing in the corpus, the magnitudes could not be located by three independent
searchers, and the "retrieval is free" reading is contradicted by a co-author of the original paper.
Each component takes its own downgrade.

**Note on C-001's provenance, which is worse than any single verdict.** Every paper supporting the
asymmetry shares Craik and/or Naveh-Benjamin as an author (1996, 1998, 2000, 2006, 2018). Zero
preregistered replications, zero registered reports, zero multi-lab efforts were found. The most
invasive rule in the program rests on a single-lab corpus.

**Note on C-003's replication count.** `evidence.md` currently lists Dresler 2017 and Wagner 2021 as
two separate Tier-1/Tier-2 entries. They are **the same 50–51 participants**, as is the 2025
eLife/bioRxiv preprint. Counting them as independent inflates the perceived evidential weight of the
program's headline promise roughly threefold.

---

## 2. REQUIRED CHANGES TO `/system/`

Numbered, surgical. Each item: file, current text, replacement, forcing claim.

### C-001 — divided attention

**1. `system/program.md` lines 99–102 — REVERSE the review-block rule.**
Currently: *"Block 4 is single-tasked and interruption-proofed... Divided attention at encoding costs
22–46% of recall; at retrieval, 1–13%. Blocks 2 and 6 tolerate imperfect conditions — deliberately
put them in the commute, the queue, the noisy kitchen, and spend your protected quiet on Block 4."*
Must say: Block 4 single-tasked and interruption-proofed (unchanged, and the direction still supports
it). Delete the percentages. **Delete "deliberately put them in the commute, the queue, the noisy
kitchen."** Replace with: *"Blocks 2 and 6 run under full attention by default. Degraded conditions
are a permitted fallback when the alternative is skipping the rep — never for first-pass or shaky
items — and only under **non-verbal** load (walking, dishes, light exercise). **Hard ban on verbal
concurrent load during any retrieval: no podcasts, audiobooks, conversation, email/Slack triage, or
reading anything else.**"*
Forced by **C-001c** (Fernandes & Moscovitch 2000/2002: word-based distractors produce large
retrieval interference; the near-zero 1996 result used a non-verbal manual RT task) and **C-001b**.
This is the single most consequential change in the report: every domain in the learner's profile
(software/math, law, medicine, finance, verbatim passages) is verbal, so the rule as written
prescribes exactly the interference type that damages retrieval of exactly the material being
reviewed. Failure mode is invisible — today's recall score is preserved while the downstream trace
is degraded.

**2. `system/README.md` lines 198–200 — same rule, rule #1 of "the four rules that decide whether
this works".** Currently: *"Protect encoding, not review. Divided attention at encoding costs 22–46%
of recall; at retrieval, 1–13%. Single-task Block 4 to a degree that feels excessive; put reviews in
imperfect conditions on purpose."* Replace with the wording from item 1. Forced by **C-001b/c**.

**3. `system/drills.md` lines 297–298 — third restatement of the same rule.** Same replacement.
Forced by **C-001b/c**. (All three files carry it verbatim; all three must change together or the
system re-acquires the internal inconsistency the red-team pass removed.)

**4. `system/evidence.md` line 49 — Tier 1 row.** Currently: *"Divided attention at **encoding**
costs 22–46% of recall; at **retrieval**, 1–13% | largest single-manipulation effect in the corpus |
`[ESTABLISHED]` | Craik et al. 1996; Naveh-Benjamin et al. 2000"*. Replace with three rows per the
split in §1: direction `[PROBABLE]`; magnitudes struck as unlocatable; "retrieval is cheap"
`[CONTESTED]`, citing Fernandes & Moscovitch 2000/2002 and Guez & Naveh-Benjamin 2013 (PLoS ONE
8:e74447) against. Add the single-lab provenance flag: six supporting papers, all sharing Craik
and/or Naveh-Benjamin; no preregistered or multi-lab replication found. Forced by **C-001a/b/c**.

**5. NEW RULE — `system/benchmarks.md` and `system/program.md` §4: all latency-scored measures run
under full attention.** Craik, Eftekhari & Binns (2018) show DA at retrieval preserves accuracy by
lengthening decision latency. Every speed gate in this system is latency-scored: D2 speed drill,
speed cards <3 min, 5-min numbers, the five 60-second Memory League disciplines. Measuring any of
them in a "deliberately imperfect" condition produces false negatives and mis-schedules reviews.
Forced by **C-001c**.
**This also resolves a pre-existing internal contradiction:** `program.md` line 72 marks Block 2 as
**PROTECTED CORE** while line 100 lists Block 2 among the blocks that "tolerate imperfect
conditions", and line 299 calls Blocks 2 and 6 "deliberately mobile". Resolve to: Block 2 protected
and full-attention (it is latency-scored); Block 6 default full-attention, non-verbal fallback
permitted.

### C-002 — Roediger 1980 / the symbol lexicon

**6. `system/drills.md` lines 145–148 — STRIKE the citation.** Currently: *"naïve method of loci does
**not** work on abstract material. Roediger (1980) found a reliable loci advantage for concrete nouns
and **none** for abstract ones."* Roediger (1980) is an *ordering-recall* paper whose stimuli were
**exclusively concrete nouns** (Paivio–Yuille–Madigan imagery > 6.0); it contains no abstract-noun
condition and therefore cannot have produced an abstract-noun null. Two lenses independently traced
the real source to **Foth (1973), J. Verbal Learning & Verbal Behavior 12, 239–245**. Replace with:
*"Abstract material is harder to image, and the concreteness effect is `[ESTABLISHED]`. Whether the
method of loci **specifically** fails on abstract material is `[CONTESTED]` and abstract-only — the
source usually cited (Roediger 1980) does not test it; the probable real source (Foth 1973) has not
been read in full."* Forced by **C-002**. Leaving the current text in place is a fabricated-provenance
risk in learner-facing material.

**7. `system/evidence.md` line 63 — Tier 2 row.** Currently: *"**Naïve MoL fails on abstract nouns**
— reliable advantage for concrete, none for abstract | `[ESTABLISHED]` | Roediger 1980"*. Delete the
row as written. Replace with a `[CONTESTED]` row citing Foth (1973) as unread, and record the
**direct counter-evidence**: Kroneisen & Makerud (2017, QJEP 70:1824–1836) found MoL's advantage was
**larger** for low-imageability words than for high-imageability ones — the opposite direction.
Forced by **C-002**.

**8. `system/drills.md` line 156 + §"The symbol lexicon" (162–176) — demote the conversion step from
mandatory to instrumented.** Currently step 2 of D4 is *"Convert via the symbol lexicon"*,
unconditional, and the lexicon is the stated solution to a problem that has no verified source.
Replace with: conversion is the **default for genuinely low-imageability terms**, justified by the
concreteness/imageability literature (still standing) rather than by an MoL-specific null (struck).
Add a mandatory week-1–2 within-subject A/B on the learner's own material — matched dense technical
passages, half direct-to-loci, half lexicon-then-loci, scored at 24 h and 7 d — with the time split
set by the result. Forced by **C-002**.

**9. `system/program.md` line 223 and `system/benchmarks.md` line 129 — demote "lexicon ≥150" from
week-12 GATE to tracked metric.** `drills.md` line 188 currently reads *"lexicon = gate; set =
probe"*. The lexicon's entire evidential warrant was the struck claim. A gate is a pass/fail on the
learner's 12 weeks; it may not rest on a rejected citation. Make it a probe alongside the conceptual
set until item 8's A/B returns. Forced by **C-002**.

**10. `system/evidence.md` line 61 — carry the MoL inflation caveat.** Currently: *"Method of loci,
single-session RCT floor | g = 0.65 [0.45–0.85], but high risk of trial bias | `[ESTABLISHED]`"*.
Two lenses independently surfaced that Ondřej et al. (2025, *Br J Psychol* 116:930–986) report
d = 0.88 [0.47, 1.25] **and** "very strong evidence for publication bias", small-study effects
"suggesting potential inflation of effect sizes", and GRADE certainty **low to very low**. Restate as
a range (g = 0.65 to d = 0.88) with the bias caveat inline and the label held at `[PROBABLE]`, not
`[ESTABLISHED]`. Forced by **C-002** (surfaced in its INFLATION and REPLICATION lenses).

### C-003 — Dresler

**11. `system/README.md` lines 21–24 — correct the headline promise.** Currently: *"51 memory-naïve
adults, ≤30 min/day for six weeks, ~26 → ~62 of 72 words, **still holding four months later with no
further practice**."* The 26→62 figure is real and traceable. The durability claim is not: Wagner et
al. (2021, *Sci Adv* 7:eabc7606, **same cohort**) report the 4-month retest change as **+22.7 ± 18.8
words (n = 16)** against **+36** immediately post-training — i.e. **~37% of the gain was lost with no
maintenance, and SD 18.8 on a mean of 22.7 means retention was wildly heterogeneous**. Replace with:
*"~26 → ~62 of 72 words at six weeks; at four months with no further practice the group retained
about 60% of that gain (+22.7 ± 18.8 words, n = 16), with very large individual variation."* Forced
by **C-003**.

**12. `system/program.md` lines 12–15 — strike "RCT-grade".** Currently: *"The only RCT-grade dose
evidence is Dresler et al. 2017."* Wagner et al. (2021) methods state participants were
**pseudo-randomized**, n = 17 / 16 / 17, with 1–2 dropouts per arm at follow-up. Replace with: *"The
only dose evidence at this outcome magnitude is Dresler et al. 2017 — a single small
**quasi-experimental** training study (pseudo-randomized, n = 16–17 per arm), never independently
replicated."* Forced by **C-003**. Note this does **not** overturn the 30-min dose decision — that
decision is also supported by the documented elite-dose cluster in agent-5 §2, which is independent
of Dresler. The dose survives; its stated warrant must be corrected.

**13. `system/evidence.md` line 52 — Tier 1 row → `[PROBABLE]`**, with the corrected 4-month number
from item 11 and an explicit "never independently replicated; no dose-response curve exists" note.
Twomey & Kroneisen (2021) found the pooled MoL effect "remained at similar levels" when adjusting for
number of sessions — there is no meta-analytic dose-response behind 40 × 30 min. Forced by **C-003**.

**14. `system/evidence.md` line 65 — merge Wagner 2021 into the Dresler row.** It is currently a
separate Tier-2 entry, which reads as corroboration. It is a follow-up analysis of the same cohort,
as is the 2025 eLife reviewed preprint (whose own eLife assessment says the work is "incomplete with
respect to the major conclusions... the authors need to temper these claims"). One row, three
analyses, one cohort. Forced by **C-003**.

**15. `system/program.md` lines 198–199 — remove the persistence promise.** Currently: *"End of week
6 closes the **Dresler-equivalent window**... Expect a step change, and expect it to persist."*
Replace: *"Expect a step change. Expect to keep roughly 60% of it without maintenance, with high
individual variance."* Forced by **C-003**.

**16. NEW — add an explicit maintenance dose past week 12.** The program currently has no
post-program maintenance protocol because it inherited "the gain persisted at four months" as free.
It does not. Add periodic re-walks of cold-archive palaces and spaced retrieval on old material to
the Sunday slot, at a dose the inner loop calibrates. Forced by **C-003**.

**17. `system/benchmarks.md` line 121 — flag the ≥55/72 week-12 target as a single-lab ceiling.**
The row is currently marked "(anchored)", which is the strongest sourcing label in the table. Its
anchor is a single small quasi-experiment whose effect is a far outlier against every pooled estimate
(g = 0.65 to d = 0.88, on an evidence base graded low-to-very-low). Keep the target; relabel it
"anchored to one small study; treat as a stretch ceiling, not an expectation". Forced by **C-003**.

### Claims that survived — no change required

**C-001a (the direction of the encoding/retrieval asymmetry) survived all three lenses.** It was
replicated in 1996, 2000 and 2018, and Mulligan, Spataro & West (2023, *Cognition*) report a double
dissociation. **The encoding-protection rule stands and needs no re-derivation** beyond deleting its
percentages. Do not weaken Block 4's protection. Fernandes & Moscovitch (2000) — the strongest
independent test, and hostile to the retrieval half — found encoding DA costs **large regardless of
distractor type**, which is a material-general confirmation from outside the Craik/Naveh-Benjamin
lab. That is the one part of C-001 that got *stronger* in round 1.

Nothing else in `/system/` is touched by round 1. `evidence.md` Tiers 3 (scheduler), 4 (contested)
and 5 (anecdote), `tracking.md`, the Anki configuration, the recovery rules, and the rejected-methods
table received no verdicts and must not be edited on the strength of this report.

---

## 3. NEW MATERIAL — surfaced in round 1, absent from `/system/`

Filtered hard. Items whose only source is a press release or a secondary paraphrase are listed as
round-2 work in §5, not adopted here.

| # | Finding | Label | Why it must be in the system |
|---|---|---|---|
| N-1 | **Material-match interference at retrieval.** Word-based concurrent tasks produce large retrieval interference; digit- and picture-based tasks produce little (Fernandes & Moscovitch 2000, *JEP:Gen* 129:155–176, 5 experiments, n ≈ 24 each; 2002, *Mem Cogn* 30:731–744). | `[PROBABLE]` — independently surfaced by all three C-001 lenses; abstract-only | This is the moderator that converts the review-block rule from harmless to harmful. Becomes the hard verbal-load ban in change #1. |
| N-2 | **Presentation-modality moderator for MoL.** De Beni & Moè: loci mnemonics **interfere with reading** but not with listening (*Eur J Cogn Psychol* 9(4)). Moè & De Beni (2005, *Appl Cogn Psychol*): self-generated loci pathways beat experimenter-supplied ones on **expository passages**. | `[PROBABLE]` — abstract-only; surfaced independently by two C-002 lenses | A demonstrated **sign flip**, and the learner works entirely from written material (textbooks, PDFs, case law). Larger design consequence than the abstract/concrete split the system currently optimises for. Not present anywhere in `/system/`. Also supplies positive evidence that MoL *does* work on abstract expository material under the right delivery. |
| N-3 | **Pacing moderator for divided attention during reading.** Clinton-Lisell (2021, *J Res Reading* 44:787–816), 22 independent studies: multitasking during expository reading, overall g = −0.28 (p = .002); **experimenter-paced g = −0.54**; **self-paced g = −0.14, p = .10, not reliable** — the self-paced cost appears as longer reading time, not lost comprehension. | `[PROBABLE]` — meta-analytic, abstract-only | The only pooled, ecologically-matched estimate anywhere near this system's actual reading task. It says the encoding-protection rule is best justified on **throughput** for self-paced dense reading, and on **retention** for externally-paced material. Nothing in `/system/` distinguishes the two. |
| N-4 | **Training-similarity and randomisation bias in cognitive-training effect sizes.** *Psychon Bull Rev* (2024): SMD 0.18 overall vs **1.15 when outcomes resemble the trained task**; g = 0.07 randomized vs 0.27 non-randomized. | `[PROBABLE]` — abstract-only | Directly indicts this system's own scoreboard: 7 of the 8 benchmark tests measure trained tasks. Belongs in `benchmarks.md` as a reading instruction for the learner's own numbers, and it independently explains C-003's outlier magnitude. |
| N-5 | **MoL's mechanism is positional, not imaginal.** Aphantasic participants benefit from interactive-imagery instructions **as much as controls** (Thomas et al. 2022, *Mem Cogn*); navigation knowledge and ability are "not major determinants" of MoL success, and MoL "may be best viewed as a variant of peg methods" (Caplan, Legge, Cheng & Madan 2019, *QJEP* 72:2541–2553). | `[PROBABLE]` — abstract-only | `evidence.md` Tier 4 already has the aphantasia line for *picture superiority*; the Caplan finding and the reframe are new. If the benefit is structural/positional, low-imageability material is not automatically excluded — which is the second, independent reason the symbol lexicon loses its necessity (change #8). It also reframes the palace as an **ordering scaffold**, which is what verbatim-passage recall actually needs. |
| N-6 | **Live contradiction on downstream consolidation of distracted retrieval.** Guez & Naveh-Benjamin (2013, *PLoS ONE* 8:e74447): DA at retrieval strongly disrupts later memory for the retrieved episode. Against: Buchin & Mulligan (2019, *QJEP*) found retrieval-practice benefits robust under DA; Kessler et al. (2014, *PLoS ONE* 9:e91309) found DA at retrieval **improved** 24-h delayed performance. | `[CONTESTED]` | Must be **logged as an unresolved contradiction**, not converted into a rule in either direction. It is the reason change #1 is written as "full attention by default, degraded as fallback" rather than as a prohibition: in a spaced-retrieval program every review is also an encoding event, and the program cannot afford to bet a scarce daily block on the optimistic side of a live dispute. |
| N-7 | **Transfer ceiling on MoL training.** Li et al. (2021, *Sci Rep*, n = 50/50/48): MoL improved only the trained word task and lost to dual n-back on transfer. *eLife* 2025 (N = 75, randomized, navigation vs verbal memory training): large on-task gains, "some limited near transfer", **no brain-structural change**. | `[PROBABLE]` | `/system/` already disclaims far transfer, citing Melby-Lervåg 2016 and Ramon 2016. These two add **randomized, recent, MoL-specific** evidence for the same disclaimer, and the eLife study is a direct non-replication of the neural half of the Dresler/Wagner story that `evidence.md` Tier 2 currently presents as `[ESTABLISHED]`. Strengthens an existing rule rather than creating one. |

**Deliberately not adopted:** Middlebrooks et al. (2017, *Psych Science*) — "prioritisation of
high-value information immune to divided attention". One lens built an instruction on it (relax
attention protection during triage/skimming). The lens itself records that only the APS press
release was seen, not the primary text. A rule that *loosens* the system's most invasive protection
may not rest on a press release. Round-2 verification item.

---

## 4. CORRECTED PRACTITIONER NUMBERS

**The provenance sweep was not delivered.** No round-1 input bears on any of the four practitioner
gate families. All remain exactly where the red-team pass left them.

| Gate | Where it sets a standard | Round-1 status |
|---|---|---|
| Deck < 3 min at 3 months; < 90 s at 12 months | `benchmarks.md` L123 (week-12 **anchored** gate), `drills.md` L115–116, `program.md` L222 | **STILL UNVERIFIED** `[ANECDOTE]`. Sourced to Art of Memory forum / Mullen Memory / vendor blogs. Note the internal tension: `benchmarks.md` L113 calls the <3 min cell "externally anchored" to agent-2 §3.6, but §3.6's own source is practitioner-tier. Round-2 provenance item. |
| ~20 words / 60 s at 6 months | `drills.md` L115–116, `benchmarks.md` L124 (ML Words 15–18 at week 12) | **STILL UNVERIFIED** `[ANECDOTE]` |
| ~4-day ghosting cooldown | `evidence.md` L110, `drills.md` L60/L74–75, `program.md` L183 | **STILL UNVERIFIED** `[ANECDOTE]`. Already correctly specced for N=1 replacement (`drills.md` measures it directly; inner-loop variable #1). Lowest priority of the four — the system already treats it as a hypothesis. |
| ~150 reviews/day sustainable | `evidence.md` L110–113/L138–142, `program.md` L281 | **STILL UNVERIFIED** `[ANECDOTE]`, but **already correctly handled** — C3 in `evidence.md` converts it from a lever to a monitored outcome, and intake is capped instead. No change needed even if the number is wrong. |
| International Master of Memory standards (1,000 vs 1,400 digits/hr; deck ≤2:00 vs <40 s) | `evidence.md` C4, `benchmarks.md` L146–149 | **STILL UNRESOLVED**, correctly flagged `[CONTESTED]` in both files. Changes nothing in the 12-week scope. |

**Two numbers *were* corrected in round 1, and both bear on gate-setting:**

1. **Dresler 4-month durability**: "held at 4 months" → **+22.7 ± 18.8 words (n = 16)**, versus +36
   immediately post-training. Source: Wagner et al. 2021, *Sci Adv* 7:eabc7606. This is a corrected
   *value*, not a corrected gate, but it forces changes #11, #15 and #16.
2. **Dresler arm sizes**: "n = 51, 3 arms" (`evidence.md` L52) → **n = 17 / 16 / 17,
   pseudo-randomized**, with 1–2 dropouts per arm at 4 months. Forces change #12.

One caution on the 4-month figure that round 2 must settle: one lens reports (from Wagner's methods,
at `[PROBABLE]`, unable to open the paper) that the 4-month probe **re-encoded the baseline visit's
word list at a 15-minute delay**, against 20-minute and 24-hour delays at pre/post. If true, the
+22.7 is itself upward-biased — a previously-seen list at a shorter retention interval — and the real
retention is worse than 60% of peak. This also matters for `benchmarks.md`, which uses
"Dresler-format" lists as the system's own week-0/4/8/12 spine and correctly regenerates them each
time; if Wagner did not, the system's trajectory is not comparable to Dresler's. **Verification queue,
high priority.**

---

## 5. ROUND-2 WORK-LIST

Ordered by value of information. Items 1–3 are undone round-1 work, not new work.

**A. Complete round 1 (highest priority — this is not optional)**
1. **C-004: identify and audit.** Three lenses, never run. Its identity is not recoverable from the
   payload; resolve it by writing `research/claim-register.tsv` first (Stage A, skipped). From
   `/research-loop.md` §6 the unaudited round-1 targets are: spacing g = 0.74 / d = 0.71 (and
   specifically whether the two meta-analyses' convergence is shared-study overlap rather than
   independent corroboration), retrieval practice g = 0.50 / 0.61, sleep g = 0.44, and MoL g = 0.65.
   The **spacing convergence check is the highest-leverage of these** — it is the only claim in the
   system whose `[ESTABLISHED]` label rests explicitly on cross-corroboration, and round 1 has just
   demonstrated (via Dresler/Wagner) that this system does not currently distinguish independent
   corroboration from re-analysis of one dataset.
2. **All three coverage sweeps: never delivered.** Critic/null-result, practitioner-provenance, and
   whichever third was specified. Re-run.
3. **The four remaining modalities from `/research-loop.md` §2 Stage C were never confirmed run at
   all**: adjacent-field, recency (post-2023), practitioner-dissent, and **methods modality** ("what
   technique did all six lanes miss?"). The methods modality is the only one that can surface
   genuinely new material rather than re-grade old material, and it has not been run once.

**B. Claims still abstract-only at high leverage (verification queue, `/research-loop.md` §5)**
4. **Craik et al. 1996 full text** — to settle whether 46% / 22% / 1–13% exist anywhere in it. Three
   independent agents failed to locate them. Until this is discharged, the system must state the
   direction and no magnitudes.
5. **Foth (1973), JVLVB 12:239–245 full text** — and specifically *which* technique failed on
   concrete nouns. Two lenses report, from secondary paraphrase, that the method of loci was the one
   technique that did **not** beat control on concrete nouns. If true, C-002 is not merely
   misattributed but inverted, and the D4 rationale needs rewriting a second time. **Do not restate
   any version of C-002 before this is read.**
6. **Wagner et al. 2021 full text** — the 4-month probe protocol (see §4 caution). Determines whether
   the corrected +22.7 is itself inflated.
7. **Guez & Naveh-Benjamin 2013 full text** — the pivot on which change #1's strength depends.

**C. Unresolved contradictions carried forward**
8. **N-6**: does distracted retrieval practice still consolidate? Guez & Naveh-Benjamin 2013 (no) vs
   Buchin & Mulligan 2019 and Kessler et al. 2014 (yes / better). Unresolved. Currently handled by
   defaulting conservative.
9. **C-002 internal contradiction**: Kroneisen & Makerud (2017) report MoL's advantage *larger* for
   low-imageability words; Foth (per paraphrase) reports a flat abstract null. Both cannot be right.
10. **Middlebrooks et al. 2017** — verify the primary text before any rule loosens attention
    protection during triage.
11. **Pre-existing, untouched by round 1**: C7 (speed-cards record 2017 vs 2018) and C4 (IMM
    standards) remain flagged-unresolved. Both are trivial and correctly labelled; do not spend
    round-2 agents on them.

**D. Loop infrastructure (blocking round 2)**
12. Create `research/claim-register.tsv`, `research/seen-register.tsv`,
    `research/verification-queue.md`, `system/CHANGELOG.md`. Without the seen-register, round 2 will
    resurface every finding round 1 rejected — the specific failure mode `/research-loop.md` Stage D
    names as the most common way a loop like this never converges.

**E. Not worth a round-2 agent** — stated so nobody spends one: the ghosting cooldown and the
150/day ceiling. Both are already specced for N=1 measurement and neither has controlled literature
to find. `/research-loop.md` §4 replaces them with logged data; more searching cannot.

---

## 6. CONVERGENCE ASSESSMENT

**This round was emphatically not dry. It fails all three dryness conditions.**

| Dryness condition | Result |
|---|---|
| Zero label changes | **FAILED** — 3 of 3 delivered claims changed label. C-001 split and downgraded across all three components; C-002 rejected as written; C-003 downgraded with two factual corrections. That is a **100% label-change rate** on audited claims, against the loop's own **<10% resolution-floor stop threshold**. |
| Zero surviving new claims | **FAILED** — 7 new findings survive (N-1 … N-7), of which N-1, N-2 and N-3 are genuinely load-bearing and none is present in `/system/` in any form. |
| Zero un-run modalities | **FAILED, badly** — 3 of 3 coverage sweeps undelivered, 1 of 4 claims entirely unaudited, and 4 of 6 Stage-C modalities (adjacent-field, recency, practitioner-dissent, **methods**) never confirmed run. |

**The resolution floor has not been hit. It is not close.** Round 1 did not find that the literature
cannot discriminate between good techniques; it found that three of this system's load-bearing
claims were **misstated, misattributed, or built on numbers that do not appear in their cited
sources**. That is not the resolution floor — that is the correction of first-round errors, and it is
the highest-yield kind of finding a loop like this produces. Round 1 also, correctly, *left the
encoding-protection rule standing*, which is the shape a real audit takes: it does not demolish
everything.

**Run round 2. Yes, clearly.** With three qualifications, in priority order:

1. **Round 2's first job is finishing round 1.** Two-thirds of the specified round-1 work was never
   delivered. Calling this a completed round and moving to fresh claims would bank an audit that
   audited 3 of 4 claims and 0 of 3 sweeps.

2. **Discharging the full-text queue still dominates round 2, exactly as `/research-loop.md` §5
   predicted, and round 1 is the proof.** The single most consequential finding of this round —
   three independent agents, searching independently, could not locate "22–46%" or "1–13%" in any
   source — is not resolvable by a fourth search. Neither is Foth (1973), which decides whether the
   symbol lexicon keeps a rationale at all. Round 1 has converted §5's abstract argument into a
   concrete, four-item, high-leverage queue (§5B above). **Seven searchers over two rounds have now
   returned less than one PDF would.** If full text becomes available by any route, discharge that
   queue *before* running round 2's search agents.

3. **Apply the §2 patches before round 2 runs**, and log them in `system/CHANGELOG.md`. Change #1
   reverses a live instruction that, on current evidence, degrades exactly the material the learner
   most cares about, and does so invisibly — the learner's own daily recall score would not reveal
   it. It should not wait on round 2.

**Forecast, for the stopping rule's sake.** The system's remaining unaudited claims (spacing,
retrieval practice, sleep, self-explanation, generation, interleaving) are large, multi-lab, recent
meta-analyses — structurally unlike the three audited this round, all of which were single-paper,
single-lab, or 50 years old. Expect round 2's label-change rate to fall sharply. **The realistic
prediction is that round 2 is productive (it has 12 undelivered agent-slots of specified work plus a
never-run methods modality) and round 3 is at or near the floor.** The hard ceiling of 4 rounds
should not be needed. Plan to hand off to the inner loop after round 3 unless round 2 surfaces
something as structurally broken as C-002 was.
