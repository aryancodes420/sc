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
