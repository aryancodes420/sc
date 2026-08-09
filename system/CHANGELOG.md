# CHANGELOG

Every change to `/system/` carries a claim id. A change with no claim id is not permitted — that is
how folklore re-enters a system that has already excluded it.

Format: `date | file | change | claim id | why`

## 2026-08-09 — Round-1 evidence audit (16 agents; `research/round-1-audit.md`)

| File | Change | Claim | Why |
|---|---|---|---|
| program.md, README.md, drills.md | **REVERSED** the "deliberately degrade review conditions" rule → full attention by default + **hard verbal-load ban** | C-001c, N-1 | Word-based concurrent load produces large retrieval interference; the 1996 near-zero result used a non-verbal task; all this learner's material is verbal. A co-author of the original found DA at retrieval disrupts memory for the retrieved episode. Failure mode invisible in daily scores. |
| program.md, README.md, drills.md, evidence.md | Struck the magnitudes 22–46% / 1–13% | C-001b | Three independent searchers could not locate them in any source. |
| program.md, benchmarks.md, drills.md | **NEW:** all latency-scored measures run under full attention | C-001c | DA at retrieval preserves accuracy by lengthening latency (Craik 2018) → false negatives on every timed gate. Also resolved the Block-2 protected/mobile contradiction. |
| drills.md, evidence.md | Struck Roediger 1980 as the source of the abstract-noun null; restated the D4 rationale on imageability instead | C-002 | Roediger 1980 is an ordering-recall study with exclusively concrete stimuli; it has no abstract-noun condition. Counter-evidence: Kroneisen & Makerud 2017. |
| drills.md | Symbol-lexicon conversion demoted from mandatory to **default-for-low-imageability**, plus a mandatory weeks-1–2 within-subject A/B | C-002, N-5 | Its warrant was the struck citation, and MoL's benefit may be positional rather than imaginal. |
| drills.md | **NEW:** delivery-modality A/B arm (read vs heard) | N-2 | Loci interfere with reading but not listening; learner works entirely from written material. |
| program.md, benchmarks.md, drills.md | Lexicon ≥150 demoted from week-12 **gate** to **probe** | C-002 | A gate may not rest on a rejected citation. |
| README.md, program.md, evidence.md | Dresler durability corrected: "held at 4 months" → **+22.7 ± 18.8 (n=16) vs +36 immediate, ~60% retained** | C-003 | Wagner et al. 2021, same cohort. |
| program.md, evidence.md | Struck "RCT-grade" → **pseudo-randomised quasi-experiment, n = 17/16/17, never independently replicated** | C-003 | Wagner 2021 methods. Dose decision survives — it is independently supported by the documented elite-dose cluster. |
| evidence.md | Merged Wagner 2021 into the Dresler row | C-003 | Same cohort; listing separately inflated perceived evidential weight ~3×. |
| program.md | **NEW §6a:** post-programme maintenance dose | C-003 | The old version had none, having inherited persistence as free. It is not free. |
| benchmarks.md | ≥55/72 relabelled "stretch ceiling, not expectation" | C-003, C-009 | Anchored to one small quasi-experiment; far outlier vs pooled estimates. |
| evidence.md | MoL pooled effect → `[PROBABLE]`, restated as g = 0.65–d = 0.88 with publication-bias and GRADE caveats | C-009 | Ondřej et al. 2025: very strong evidence of publication bias, GRADE low to very low. |
| benchmarks.md | **NEW:** "How to read your own numbers" — training-similarity bias warning | N-4 | 7 of 8 tests measure trained tasks; SMD 0.18 overall vs 1.15 when outcomes resemble training. |

## 2026-08-09 — Red-team document audit (`research/critique.md`; scored 4/3/2/4/4)

Summarised in `evidence.md` §3b. Headline changes: true daily cost published (115–130 min) and scope
cut to fit (new cards 15→8/day, generation → weekly, Reading OS replaces rather than adds, benchmark
days cancel the daily block); Anki table moved into `program.md` with per-preset values summing to 8;
Major system, card scheme, pegs, cue-word criterion and material generators added; invented targets
marked; conceptual and verbatim standards demoted from gates to probes with agent-2's real month-4–6
and month-6–9 horizons restored; "near-perfect recall" → 80–90% at 7+ days; test-8 protocol; four
matched RAVLT triads; single scoring system for numbers; 17 cross-file contradictions reconciled.

## 2026-08-09 — Round-1 recovery (`research/round-1-recovered.md`)

The round-1 critic's digest was truncated at 60,000 chars by an orchestrator bug. All 16 agents had
succeeded; ~40% of the payload was never seen. Recovered from the run journal, not re-run.

| File | Change | Claim | Why |
|---|---|---|---|
| evidence.md | Split the MoL meta-analysis row into **C-004a (Twomey & Kroneisen 2021)** and **C-004b (Ondřej 2025)**; C-004b → `[CONTESTED]` | C-004 | g=0.65/13 RCTs belongs to the 2021 paper, not the 2025 one it was attributed to. The 2025 paper is a **critique** of the 2021 pooling, not a confirmation — so the system had **one** data point where it believed it had two. Second instance of this error class (cf. Wagner/Dresler same cohort). |
| evidence.md, drills.md | Planning range for MoL restated as **d ≈ 0.2–0.9 with a lower bound including "no benefit vs active control"** | C-004b | Bias-adjusted delayed recall in young adults d = 0.42 CI [0.00, 0.80]; PET-adjusted 0.00–0.22; GRADE very low; 80–89% high risk of bias. |
| evidence.md | **NEW:** durability dependency stated explicitly | C-004b | MoL evidence is same-day serial recall of word lists vs rote rehearsal; delayed comparisons essentially absent. Durability must be carried by spaced retrieval + sleep, not loci. |
| drills.md | **NEW section:** cap palace-architecture time, reallocate to image/cue quality | C-004b | Caplan 2019 (navigation not a major determinant; peg-method variant), Bouffard 2018 (temporal scaffolds comparable), Caplan 2022 (body = loci). Spatial component probably not the active ingredient. |
| drills.md | **NEW section:** three retrieval-quality conditions — mandatory feedback, overt not covert, no-lookahead | sweep | Classroom nulls cluster on withheld feedback; a 2026 Prolific study found no retrieval benefit in unsupervised self-administration — structurally our learner's condition. |
| drills.md | **NEW:** element-interactivity caveat on dense conceptual material | sweep | van Gog & Sweller 2015 vs Karpicke & Aue / Rawson is a live dispute over exactly this learner's priority material. |
| benchmarks.md | **RESOLVED** IMM vs GMM as two different awards; flagged 2018 revision | provenance sweep | IMM ≈ 1000/10/2:00 + 3000 pts; GMM = 1400/14/<40 s. A research lane printed GMM numbers under an IMM heading. |
| benchmarks.md | Stripped "(anchored)" from Week-12 speed cards → `[INV]`; deleted "20 words at 6 months" | provenance sweep | Both were **invented by this synthesis** and cited back as externally anchored. New tracked defect class: **inference laundering**. |
| drills.md | Removed the "~4 days" ghosting reference number | provenance sweep | n=1, contradicted within its own lane, and supplying it destroyed the self-measurement it was attached to. |
| evidence.md | 150 reviews/day → time budget, not empirical threshold; review-cap contradiction reconciled | provenance sweep | Vendor-blog origin, no denominator. Anki manual's 20-new→200-review ratio is the primary-source alternative. Target 150 by capping NEW cards; leave max-reviews 9999. |
| evidence.md | **NEW:** missed-technique search queue (14 families, zero corpus mentions) | missed-methods sweep | Production effect, errorless learning/vanishing cues, contextual interference, JOL calibration, part-whole chaining, morphological decomposition, etc. **Search queue, not findings.** |
| evidence.md | Corrected the round-1 integrity diagnosis; recorded WebSearch budget exhaustion (200/200) | — | Round 2 cannot run as a search round in this session. |

## 2026-08-09 — Encoding layer re-specified around person-perception (`system/leverage.md`)

Operator reports high person-perception ability. Encoding layer re-specified to run on that channel.
Memory-science dependencies traced as usual; person-perception science is **unresearched** and marked
as such throughout, added to the round-2 queue.

| File | Change | Basis |
|---|---|---|
| leverage.md | **NEW.** Character-primitive lexicon, actor-method verbatim reorder, names/faces promotion, Dominic-style 00–99, cue-articulation read log, calibration metrics | Animacy effect (`agent-2 §5.5`); relationship-acceptance rule (§5.6); self-reference d≈0.45 (`agent-1 §7`); person-based elite number systems (§3.1); Noice & Noice actor method (§6.1) |
| drills.md D4 | Lexicon primitive: object → **character with a motive** | A character cannot be encoded without a relationship, so the label-only failure mode is structurally harder to commit |
| drills.md D5b | Verbatim reordered: author-as-person → rhetorical posture → beats → word justification | The actor method *is* intention-reading applied to text; adversarially-drafted material (statutes, contracts) suits it especially |
| drills.md D6 | Names & faces promoted from substrate drill to **primary track**; reads bound to conclusions, not just faces | Only memory-sport discipline running on the operator's native channel; feeds the person library |
| drills.md A2 | 00–99 built Dominic-style (person + action) on Major phonetics | Faster acquisition on this channel; upgrades to PAO without rework. Cost: marginally slower at elite speed — irrelevant, competition is not the goal |
| benchmarks.md | Test 8 gains a person-read component | Measures the asset the file exists to build |
