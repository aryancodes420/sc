# Agent 6 — Consolidation (Substrate) and Measurement (Scoreboard)

**Method note / limitation, stated up front:** this environment's egress proxy blocked *every* direct page fetch (403 on CONNECT for wikipedia, pmc.ncbi.nlm.nih.gov, artofmemory.com, memoryleague.com, iam-memory.org, sciencedirect, tandfonline, nature.com, etc.). All evidence below came through the search tool's retrieval-and-summarise layer over those same sources. Consequence: **I could verify study designs, effect sizes and rule structures, but I could NOT open normative tables.** Wherever a specific mean/SD would normally be quoted, I say so explicitly and name the source to pull it from, rather than inventing a number. No normative value in this document is fabricated. Any tier boundary I could not source is labelled `[UNSOURCED — set locally]`.

---

# HALF A — THE SUBSTRATE (recovery rules)

## A1. Sleep — the only large-effect lever in this lane

**Finding 1 — Sleep produces a moderate, robust benefit to episodic memory retention.** Berres & Erdfelder's integrative review and meta-analysis (Psychological Bulletin, 2021) reports an overall sleep benefit of **g = 0.44** for episodic memory, with the effect largest in delayed-wake/no-sleep designs, then nap designs, then total-sleep-deprivation designs without recovery nights. The benefit was larger when stimuli were studied multiple times rather than once. `[ESTABLISHED]`
→ Practice implication: schedule the heaviest new-encoding block in the last waking 2–3 hours, and never trade sleep for extra review — the review is worth less than the sleep that consolidates it.

**Finding 2 — Sleep deprivation degrades *encoding*, not just consolidation.** Yoo, Hu, Gujar, Jolesz & Walker (Nature Neuroscience, 2007) found one night of deprivation produced a **~40% reduction in the ability to form new memories** relative to rested controls, with reduced hippocampal encoding activity and altered brainstem/thalamic alerting connectivity. `[ESTABLISHED]` (single well-cited study, not a meta-analysis — treat the exact 40% as one estimate, the direction as solid).
→ Practice implication: after a bad night, convert the session from new-material encoding to retrieval practice of already-encoded material; do not burn fresh material on a deprived brain.

**Finding 3 — Sleep spindles correlate with consolidation, but the association is small-to-moderate and stronger for procedural than declarative memory.** A meta-analysis of spindle-dependent consolidation in healthy adults (53 studies, 1,427 effect sizes; Neuropsychologia 2023 / bioRxiv 2022) found a small-to-moderate average spindle–memory association, significantly stronger for procedural memory, with spindle *power* the strongest-moderating characteristic; spindle type and scalp topography did not moderate. `[PROBABLE]` — correlational, and popular claims that "more spindles = more declarative memory" overstate it.
→ Practice implication: treat spindle talk as mechanism, not as an actionable dial — there is no home intervention that reliably raises spindle density.

**Finding 4 — Targeted Memory Reactivation (TMR) works, but small, and is not a home tool yet.** Hu, Cheng, Chiu & Paller's meta-analysis (Psychological Bulletin, 2020; 91 experiments, 212 effect sizes, N = 2,004) found overall **Hedges' g = 0.29** [0.21, 0.38]; **SWS g = 0.27** [0.20, 0.35]; **N2 g = 0.32** [0.04, 0.60]; **no effect during REM and no effect during wakefulness**. The authors report **publication bias** (positive studies over-represented) and substantial heterogeneity, and call for multi-lab replication. A later vocabulary-task study found no significant SWS-vs-N2 difference. `[CONTESTED]` — real but small, and dependent on lab cueing precision (sleep-staged, phase-locked audio at sub-waking volume).
→ Practice implication: exclude TMR from the 12-week build — home cueing cannot stage-lock to SWS, and a g = 0.29 lab effect with publication bias does not survive that degradation; revisit only if consumer closed-loop EEG audio is independently validated.

**Finding 5 — Naps carry a real consolidation benefit.** Berres & Erdfelder's nap designs showed a positive sleep benefit; the search-returned literature further notes very short naps (~6–10 min) producing declarative benefits comparable to longer sleep in some studies. `[PROBABLE]` — the "6–10 min is as good as a night" framing is a strong claim from a narrow literature; direction is safe, magnitude is not.
→ Practice implication: a 20–30 min nap 1–3 h after a heavy encoding block is a cheap add-on; do not use it as a substitute for night sleep, and cap it to protect sleep pressure.

**Contested-claims flag.** Popular sleep writing (Walker's trade book in particular) states some of the above at higher confidence than the primary literature supports — notably REM's role in declarative consolidation, and the sharp SWS-declarative / REM-procedural dichotomy. The TMR meta-analysis's own null for REM, and the spindle meta-analysis's procedural-over-declarative result, both cut against the tidy version. `[CONTESTED]`
→ Practice implication: build rules on total sleep duration and learn-before-sleep timing (well-supported), not on engineering specific sleep stages (not actionable, partly contested).

## A2. Exercise

**Finding 6 — Acute exercise ~4 h *after* learning improved retention; immediately after did not.** van Dongen, Kersten, Wagner, Morris & Fernández (Current Biology, 2016): n = 72, 90 picture–location associations learned over ~40 min, randomised to exercise immediately, exercise at 4 h, or no exercise. Exercise = **35 min interval cycling up to 80% HRmax**. The 4-hour group showed better 48-h retention than no-exercise, plus increased hippocampal pattern similarity during retrieval; the immediate group did not differ. `[PROBABLE]` — one well-designed study, widely cited, replication status not established in what I could open.
→ Practice implication: park a 35-min hard interval session roughly 4 h after the day's main encoding block; it is a free scheduling choice, so take it even though the evidence is one study.

**Finding 7 — Chronic aerobic exercise effects on hippocampal volume are small and mostly preservation, not growth.** Firth et al. (NeuroImage, 2018) meta-analysis: **no significant effect on total hippocampal volume** across 737 participants; a significant positive effect on **left** hippocampal volume; post-hoc analyses indicated the mechanism was *preventing* age-related volume loss rather than adding volume. Overall pooled effect reported as **Hedges' g = 0.13** [0.02, 0.24], p = .026. Erickson et al. (2011)'s widely-cited ~2% one-year hippocampal volume increase with associated serum BDNF rise is the strongest single positive study but sits above the meta-analytic mean. `[ESTABLISHED]` that the meta-analytic effect is small; `[CONTESTED]` that aerobic training meaningfully grows an adult hippocampus.
→ Practice implication: train aerobically for the acute-consolidation and sleep-quality effects and for general health; do not expect structural brain change to drive your memory scores over 12 weeks.

## A3. Stress and cortisol

**Finding 8 — Acute stress reliably impairs *retrieval*; its effect on encoding is mixed and sometimes positive.** Shields, Sazma, McCullough & Yonelinas (2017) and the surrounding systematic reviews converge: stress shortly before retrieval significantly impairs recall, with larger impairment for emotionally-valenced than neutral material; exogenous cortisol given before retrieval decreases performance; encoding effects are inconsistent and context-dependent. Acute stress also impairs core executive functions (Shields, Sazma & Yonelinas, Neurosci Biobehav Rev 2016 meta-analysis). `[ESTABLISHED]` for retrieval impairment; `[CONTESTED]` for encoding.
→ Practice implication: never benchmark, and never sit the real exam-equivalent, in a high-cortisol state — but do not fear stress during *learning*, and note that retrieval practice is the standard countermeasure (a "retrieval practice protects memory against acute stress" line exists in this literature, contested by a published commentary — treat as `[CONTESTED]`).

**Finding 9 — Chronic stress and hippocampal function.** The reviews consistently frame chronic elevation as harmful to hippocampus-dependent memory, but I did not open a quantitative meta-analysis in adults during this lane. `[PROBABLE — under-evidenced in this lane]`
→ Practice implication: treat chronic-stress management as a floor-protecting hygiene item (sleep, load management), not as a scored training variable.

## A4. Caffeine

**Finding 10 — The post-learning caffeine consolidation effect is weak and confounded.** Borota et al. (Nature Neuroscience, 2014) gave **200 mg caffeine after study** and reported improved discrimination of similar-vs-repeated objects (mnemonic discrimination) at 24 h in non-habitual consumers. Aust & Stahl (Memory, 2020) titled their replication "**The enhancing effect of 200 mg caffeine on mnemonic discrimination is at best small**," and proposed the effect may reflect **reversal of withdrawal** rather than genuine enhancement. A 2025 Scientific Reports study found 200 mg post-learning caffeine **did not improve** face-recognition consolidation and **increased false alarms**. `[CONTESTED]` — the original is a single positive study; the replication record is negative-to-null.
→ Practice implication: do not dose caffeine *for consolidation*; use it only as an alertness tool at a stable daily dose, because dose variation is a measurement confound and a withdrawal artefact generator.

**Finding 11 — Caffeine 6 h before bed measurably destroys sleep.** Drake, Roehrs, Shambroom & Roth (J Clin Sleep Med, 2013): 12 healthy sleepers, **400 mg** at 0, 3 and 6 h before bed; even the 6-h-before dose reduced objectively measured total sleep time by **more than one hour**, and participants were **subjectively unaware** of the disruption. `[ESTABLISHED]` (small n, but objective in-home measurement and a large effect).
→ Practice implication: hard cut-off — no caffeine within 8 h of bedtime, at a fixed daily dose, because the sleep cost (a g≈0.44 lever) dwarfs any direct caffeine memory benefit (which may be zero).

## A5. Attention training — what to skip

**Finding 12 — Working-memory / n-back training does not far-transfer. Do not spend hours on it.** Melby-Lervåg, Redick & Hulme (Perspectives on Psychological Science, 2016; 87 publications, 145 experimental comparisons): reliable gains on trained and intermediate WM measures, **no convincing evidence of far transfer** to nonverbal ability, verbal ability, word decoding, reading comprehension or arithmetic when compared against *treated* controls. Soveri et al. (2017) on n-back specifically: robust improvement on n-back itself, **no appreciable far transfer** to cognitive control or fluid intelligence, especially with active controls. Sala & Gobet (2017) concur. `[ESTABLISHED]`
→ Practice implication: allocate **zero** minutes to n-back or commercial brain-training; the same minutes spent on mnemonic encoding drills produce measurable, task-specific gains that are exactly what the goal requires.

**Finding 13 — Mindfulness/focused-attention meditation: small attention and executive-control effects, no working-memory effect against active controls.** Meta-analyses of RCTs in healthy adults report overall **g ≈ 0.18–0.20**, with attention **g ≈ 0.18** and executive control **g ≈ 0.18**, but **no significant working-memory effect**; a 2025 systematic review/meta-analysis found no MBI effect on working memory versus control conditions. One large meta-analysis found no publication bias but many methodological flaws; another reported that once placebo effects and publication bias were controlled, **overall effect size and true variance approached zero**. `[CONTESTED]`
→ Practice implication: include at most 10 min/day of focused-attention practice as a session-entry ritual for on-task stability, and do not count it as a memory intervention or let it displace encoding practice.

## A6. Alcohol, nutrition, hydration

**Finding 14 — Alcohol's "retrograde facilitation" is not a usable effect and the acute costs are real.** A **preregistered replication with encoding–maintenance–retrieval multinomial modelling** (Experimental Psychology, 2022/2023) found **no evidence for retrograde facilitation** in overall cued or free recall of word pairs and no reliable maintenance difference, though MPT analysis showed an alcohol advantage in a retrieval parameter. Prior demonstrations are described in that literature as having serious methodological problems. Alcohol's anterograde encoding impairment is not in dispute. `[CONTESTED]` for facilitation, `[ESTABLISHED]` for anterograde impairment.
→ Practice implication: no alcohol on training days and none in the 24 h before a benchmark session — the encoding cost is certain and the "protective" effect is not.

**Finding 15 — Nutrition/hydration.** I found no meta-analytic evidence in this lane supporting any supplement, nootropic stack, or specific macronutrient timing for adult declarative memory. Do not include any. `[ESTABLISHED — by absence of evidence, and by the mission's hard-reject rule]`
→ Practice implication: eat and hydrate normally, hold both constant across benchmark days as measurement controls, and buy nothing.

## A7. RECOVERY RULES TABLE (ranked by effect size)

| # | Rule | Dose / timing | Evidence grade | Effect size | Source |
|---|---|---|---|---|---|
| 1 | Protect full night sleep after encoding | 7–9 h, every night; heaviest new encoding in final 2–3 waking h | `[ESTABLISHED]` | g = 0.44 (episodic retention) | Berres & Erdfelder 2021 |
| 2 | Never encode new material sleep-deprived | ≥1 full night before any new-material block | `[ESTABLISHED]` | ~40% encoding deficit | Yoo et al. 2007 |
| 3 | Caffeine cut-off 8 h before bed, fixed daily dose | 0 mg after cut-off; no dose variation on test days | `[ESTABLISHED]` | >1 h objective sleep loss at 6 h pre-bed, 400 mg | Drake et al. 2013 |
| 4 | Never benchmark or perform under acute stress | no stressor in the 30–60 min before retrieval | `[ESTABLISHED]` (retrieval) | reliable retrieval impairment | Shields et al. 2016/2017 |
| 5 | No alcohol 24 h pre-benchmark; none on training days | 0 units | `[ESTABLISHED]` (anterograde) | — | Exp. Psych. preregistered replication 2022 |
| 6 | Hard aerobic interval session ~4 h post-encoding | 35 min intervals up to 80% HRmax | `[PROBABLE]` | retention benefit vs no-exercise; immediate exercise = no benefit | van Dongen et al. 2016 |
| 7 | Optional 20–30 min nap 1–3 h post-encoding | ≤30 min, before 15:00 | `[PROBABLE]` | positive in nap designs | Berres & Erdfelder 2021 |
| 8 | Chronic aerobic base | 3×/wk moderate–vigorous | `[ESTABLISHED, small]` | g = 0.13 hippocampal volume; preservation not growth | Firth et al. 2018 |
| 9 | ≤10 min/day focused-attention practice, as ritual only | 10 min pre-session | `[CONTESTED]` | g ≈ 0.18 attention; **no** WM effect | mindfulness RCT meta-analyses 2020/2025 |
| 10 | **Do not do** n-back / brain training | 0 min | `[ESTABLISHED null]` | no far transfer | Melby-Lervåg et al. 2016; Soveri et al. 2017 |
| 11 | **Do not do** TMR at home | 0 min | `[CONTESTED]` | g = 0.29 lab, publication bias, REM/wake null | Hu et al. 2020 |
| 12 | **Do not** dose caffeine for consolidation | — | `[CONTESTED]` | replication "at best small"; withdrawal confound | Borota 2014 vs Aust & Stahl 2020 |

**Honest ranking:** rule 1–3 are the entire high-yield set. Rules 6–8 are marginal. Rules 10–12 exist to *save the learner time and money*, which in a 60–90 min/day budget is itself a large effect.

---

# HALF B — THE SCOREBOARD

## B1. Design principles for a repeatable home battery

1. **Fresh random material every administration.** For every test where the stimulus can be generated (digits, cards, words, names, images), generate new material at each retest. This is what makes memory-sport disciplines superior instruments for longitudinal self-tracking than clinical tests.
2. **Alternate forms where material cannot be random.** Benedict & Zgaljardic's review of memory-test practice effects found that **re-administering the same list produced substantial practice effects, while alternate forms abolished or greatly reduced them**; re-administration of the same RAVLT list at one or even two months still showed significant practice effects, whereas alternate forms at one month showed no significant difference across forms. `[ESTABLISHED]`
→ Practice implication: RAVLT-type list learning at weeks 0/4/8/12 **must** use four different word lists, or the retest data is uninterpretable.
3. **Fixed administration conditions.** Same time of day ±1 h, same room, same caffeine state and dose, ≥7 h sleep logged the prior night, no alcohol 24 h, no hard exercise 2 h before, script read verbatim (record yourself reading it, or use TTS), all responses audio-recorded and scored afterwards.
4. **Reliability ceiling.** RAVLT test–retest reliabilities are reported in the range **0.41–0.79**, marginal (.6–.7) over 1-year intervals, with Trial 5 and delayed recall among the more reliable indices. `[ESTABLISHED]`
→ Practice implication: score changes smaller than roughly one SD of the measure are noise; use Trial 5 and delayed recall as the headline RAVLT indices and ignore trial-by-trial wobble.
5. **Trained-strategy vs untrained-capacity — keep them in separate columns.** Once the learner has a PAO/Major system, span tasks stop measuring raw capacity and start measuring encoding-system throughput. Design response: run each span-type test **twice** — once "strategy-on" (use everything you know) and once "strategy-off" (rehearsal only, no images). Report both. Be explicit that strategy-off is not a clean capacity measure after training begins — it is an *honest-effort* measure, unenforceable, and its drift over 12 weeks should be interpreted conservatively. `[PROBABLE — design assumption, not verified in this lane]`
→ Practice implication: the headline progress metrics must be strategy-on competition disciplines plus the real-material retention probe; span tests are context, not the scoreboard.

## B2. Competition rules and scoring actually verified

- **5-minute numbers (speed numbers):** 5 min to memorise a page of computer-generated digits presented in **rows of 20 digits, 25 rows per page**. Scoring: **20 points per fully correct row in order; any mistake in a completed row scores zero for that row.** For the **final incomplete row**: 1 point per correct digit; **half points if one mistake**; **zero if two or more mistakes**. `[ESTABLISHED — competition rules]`
- **Words:** **300 seconds to memorise 50 words in order**; 1 point per correct word in sequence, with deductions for intrusions/omissions. `[PROBABLE — rule text partially retrieved; confirm against IAM rulebook]`
- **Championship points normalisation:** `Championship points = (Raw Score / Millennium Standard) × 1000`. Millennium Standards are set above the world record, reviewed annually on 1 January, and raised to (mean of top three scores + 10%) if three competitors break them. `[ESTABLISHED — WMSC/World Memory Statistics]`
→ Practice implication: convert every discipline score to championship points so a single number tracks across disciplines and across the 12 weeks.
- **International Master of Memory (IMM) standards:** **1,000 digits in one hour**, **10 decks of cards in one hour**, and **one deck in ≤2 minutes** — all three required, plus competing in all 10 disciplines at a sanctioned championship and accumulating **≥3,000 championship points**. **Grandmaster of Memory (GMM)** requires **≥5,000** cumulative points. `[ESTABLISHED]`
- **Elite anchors:** speed-cards world record **12.74 s** (Shijir-Erdene Bat-Enkh, 2017); Alex Mullen **18.65 s** (2016); IAM 5-minute images record **775 points** (Enrico Marraffa, IAM French Open 2025). `[ESTABLISHED]`
- **Memory League:** digital, head-to-head, **five disciplines at 60 s memorisation each — names, words, images, numbers, cards**; top competitors memorise a full deck in under 15 s within the 60 s window. `[ESTABLISHED]` A forum claim that "a novice untrained memory manages 4 ± 1 items" is `[ANECDOTE]`.
→ Practice implication: use Memory League's five 60-s disciplines as the weekly high-frequency tracker and the IAM/WMSC-format disciplines as the 4-weekly formal benchmark.

## B3. Clinical instruments — protocol sources and the norms honesty note

| Test | Protocol facts verified | Norms source to pull actual mean/SD from | Repeatability |
|---|---|---|---|
| **RAVLT** | 15 nouns read aloud over **5 trials**; interference list B; immediate post-B recall; delayed recall; recognition. Total (T1–T5) range **0–75**. | Carstairs et al. 2012 (Australian norms + **retest** data, n = 390, ages 18–34 — the right band for a young adult, and it explicitly includes retest data); Mayo Normative Studies regression-based AVLT norms (n = 4,428, ages 30–91, sex-adjusted); Van der Elst et al. (n = 1,855, ages 24–81). **I could not open these tables — do not quote numbers until you do.** | Reliability .41–.79; **alternate forms required** (Benedict & Zgaljardic) |
| **Digit span (WAIS-IV structure)** | Forward, Backward, and Sequencing; WAIS-IV Digit Sequencing reported as the superior span index of working memory (Tandfonline 2024/2025). | WAIS-IV technical manual (not open-access). A low-quality secondary source states forward span 5–9 and backward 1–2 digits shorter — `[PROBABLE, weak source]`. | Fresh random digit strings each time = near-zero item practice effect; procedural practice effect remains |
| **Corsi block-tapping** | Standardised administration and scoring published with percentile distribution and cutoffs; healthy control n = 70. | Kessels, van Zandvoort, Postma, Kappelle & de Haan (2000), *Applied Neuropsychology* 7, 252–258. **Table not opened.** | Fresh random sequences; strategy contamination once visual mnemonics are trained |
| **Rey–Osterrieth Complex Figure** | Figure decomposed into **18 elements**, scored for presence, completeness and placement (standard 36-point maximum under the classic system). | Boston Qualitative Scoring System normative sample n = 433, ages 18–94, 10 age×gender groups with T-scores/percentiles; Rivera et al. 2015 Latin-American norms; NEURONORMA young adults. **Tables not opened.** | **Very poor** — one figure, massive item memory. Use ROCF **once** at week 0 only, or substitute a novel complex figure each retest and abandon norms |

→ Practice implication: use clinical tests for a week-0 anchor against population norms (after you buy or find the actual norm tables), and use competition disciplines for the 4-weekly progress curve — clinical tests are too norm-scarce and too practice-contaminated to carry longitudinal signal.

## B4. THE BATTERY — 8 tests, ~72 minutes, repeatable at weeks 0/4/8/12

Run in this exact order; the ordering nests the delay intervals so no dead time is needed. Record audio throughout; score afterwards from the recording. Generate all random material the night before with a script, print it, and do not look at it.

**T0 (0–3 min) — Conditions log.** Time of day, hours slept, caffeine mg and time, alcohol in last 24 h, hard exercise in last 2 h, subjective stress 1–10. Any deviation invalidates comparison.

**1. Digit span, strategy-off then strategy-on (3–11 min).** Materials: TTS reading random digits at 1/s, sequences from 3 up, two trials per length. Forward, then backward. Stop after two failures at a length. Score = longest length with ≥1 correct trial, plus total-correct-trials score (WAIS-IV style). Run the whole thing twice: pass 1 "rehearsal only", pass 2 "use your system". Protocol source: WAIS-IV Digit Span subtest structure (Forward/Backward/Sequencing). Tiers: `[UNSOURCED — set locally]` except the weak-source population expectation of forward 5–9.

**2. RAVLT, learning phase (11–24 min).** Alternate word list per session (four lists prepared in advance; alternate forms are mandatory per Benedict & Zgaljardic). Read 15 nouns at 1/s, free recall, ×5 trials (record T1…T5). Then interference list B once, recall B. Then immediate recall of list A without re-reading (T6). Scoring: T1, T5, sum T1–T5 (max 75), T6.

**3. Corsi block span (24–30 min).** Nine blocks or an offline digital equivalent; sequences of increasing length, two trials each, stop at two failures. Score = block span + total correct. Protocol source: Kessels et al. 2000 standardised procedure.

**4. 5-minute numbers, competition rules (30–45 min).** 5 min memorisation of freshly generated digits in **rows of 20, 25 rows per page**; then 10 min written recall (competition allows longer; hold your own recall window fixed forever). Scoring exactly per rules: 20 pts/correct full row, 0 for a row with any error, final incomplete row 1 pt/digit, half if one error, zero if two+.

**5. RAVLT delayed recall + recognition (45–50 min).** ~25 min after T6. Free recall of list A, then a recognition list of 30 items (15 targets + 15 distractors, half from list B, half unrelated). Score delayed recall (0–15) and recognition discrimination (hits − false alarms).

**6. Names & faces (50–58 min).** Freshly generated face–name set. Two runs: (a) Memory League format — **60 s memorisation**, then recall; (b) longer-form 5-min memorisation set. Score = correctly recalled first names in the correct pairing (spelling-tolerant, decided in advance and held constant).

**7. Speed cards, 3 attempts (58–66 min).** Shuffled deck, timer, memorise as fast as possible, then reproduce with a second deck. Recorded score = **fastest time with a perfect reproduction**; failed attempts logged but not scored. Elite anchors: WR 12.74 s (2017); IMM standard **≤2:00**.

**8. Real-material retention probe (66–72 min).** 30 cued-recall items drawn at random from material the learner encoded **4 weeks earlier** (i.e. between the previous benchmark and this one). Score = % correct. This is the only test that measures the thing the whole project exists for; everything else is a proxy.

**Weekly light tracker (not part of the 4-weekly battery):** the five Memory League 60-s disciplines, one attempt each, ~10 min total.

## B5. Tier table — what is sourced and what is not

| Discipline | Untrained adult | Competent | Advanced | Elite | Source status |
|---|---|---|---|---|---|
| Speed cards | cannot complete a deck | `[UNSOURCED]` | **≤2:00** (IMM standard) | **12.74 s** WR; 18.65 s Mullen 2016 | Advanced/elite `[ESTABLISHED]`; lower tiers `[UNSOURCED — set from your own week-0 score]` |
| 1-hour numbers | — | — | **1,000 digits** (IMM standard) | > WR-adjacent | `[ESTABLISHED]` |
| 1-hour cards | — | — | **10 decks** (IMM standard) | — | `[ESTABLISHED]` |
| Overall championship points | — | — | **3,000** (IMM) | **5,000** (GMM) | `[ESTABLISHED]` |
| 5-min images (IAM) | — | — | — | **775** (Marraffa 2025) | `[ESTABLISHED]` |
| Memory League cards | ~4 ± 1 items `[ANECDOTE]` | — | — | full deck **<15 s** within 60 s window | elite `[ESTABLISHED]`, untrained `[ANECDOTE]` |
| RAVLT sum T1–T5 | population norms | — | — | — | **norms exist but not opened — pull from Carstairs 2012 / Mayo Normative Studies before quoting** |

→ Practice implication: your week-0 scores define your own beginner/intermediate boundaries; the only externally-valid tiers are the WMSC/IAM standards and records, so anchor the 12-month trajectory to IMM (2-min deck, 1,000 digits/hour, 10 decks/hour) and treat everything below as self-referenced.

## B6. Practice-effect control checklist (apply at every retest)

- New random material for digits, cards, names, images, Corsi and words. **Different RAVLT list each of the four sessions.**
- Same time of day ±1 h; same caffeine dose and timing; ≥7 h sleep logged; no alcohol 24 h; no hard exercise 2 h prior; stress rating logged and session aborted if stress ≥8/10 (acute stress reliably impairs *retrieval*, i.e. it corrupts exactly what you are measuring).
- Verbatim/TTS instructions; fixed recall windows; audio recording; blind-ish scoring (score from the recording later, not live).
- Report **strategy-on and strategy-off** columns separately, and never mix them across timepoints.
- Ignore changes smaller than ~1 SD on RAVLT-type measures (reliability .41–.79); trust competition disciplines more because the stimulus is fresh and the scoring is objective.

---

## Bibliography — sources actually retrieved (via search-tool retrieval; direct fetch was blocked by the egress proxy)

**Sleep**
- Berres, S. & Erdfelder, E. (2021). The sleep benefit in episodic memory: An integrative review and a meta-analysis. *Psychological Bulletin* 147(12), 1309–1353. https://www.semanticscholar.org/paper/53a678d237a397ff6a46876285423bfff550718c
- Yoo, S.-S., Hu, P.T., Gujar, N., Jolesz, F.A. & Walker, M.P. (2007). A deficit in the ability to form new human memories without sleep. *Nature Neuroscience*. https://www.nature.com/articles/nn1851
- Hu, X., Cheng, L.Y., Chiu, M.H. & Paller, K.A. (2020). Promoting memory consolidation during sleep: A meta-analysis of targeted memory reactivation. *Psychological Bulletin*. https://pubmed.ncbi.nlm.nih.gov/32027149/ (preprint: https://www.biorxiv.org/content/10.1101/796458v1.full)
- TMR SWS vs N2 vocabulary study. *Learning & Memory* 30(9), 192. https://learnmem.cshlp.org/content/30/9/192.full
- Spindle-dependent memory consolidation in healthy adults: A meta-analysis. *Neuropsychologia* (2023). https://pubmed.ncbi.nlm.nih.gov/37597610/ (preprint: https://www.biorxiv.org/content/10.1101/2022.07.18.500433v1.full)

**Exercise**
- van Dongen, E.V., Kersten, I.H.P., Wagner, I.C., Morris, R.G.M. & Fernández, G. (2016). Physical exercise performed four hours after learning improves memory retention and increases hippocampal pattern similarity during retrieval. *Current Biology*. https://www.cell.com/current-biology/fulltext/S0960-9822(16)30465-1
- Firth, J. et al. (2018). Effect of aerobic exercise on hippocampal volume in humans: A systematic review and meta-analysis. *NeuroImage*. https://pubmed.ncbi.nlm.nih.gov/29113943/

**Stress**
- Shields, G.S., Sazma, M.A., McCullough, A.M. & Yonelinas, A.P. (2017). Stress and long-term memory retrieval / Reducing the consequences of acute stress on memory retrieval. https://www.sciencedirect.com/science/article/abs/pii/S2211368117301274 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC7879075/
- Shields, G.S., Sazma, M.A. & Yonelinas, A.P. (2016). The effects of acute stress on core executive functions: A meta-analysis and comparison with cortisol. *Neurosci Biobehav Rev*. https://www.sciencedirect.com/science/article/abs/pii/S0149763416302755

**Caffeine**
- Borota, D. et al. (2014). Post-study caffeine administration enhances memory consolidation in humans. *Nature Neuroscience*. https://pure.johnshopkins.edu/en/publications/post-study-caffeine-administration-enhances-memory-consolidation-/
- Aust, F. & Stahl, C. (2020). The enhancing effect of 200 mg caffeine on mnemonic discrimination is at best small. *Memory* 28(7). https://pubmed.ncbi.nlm.nih.gov/32804056/
- Caffeine reduces accuracy in face recognition memory consolidation (2025). *Scientific Reports*. https://www.nature.com/articles/s41598-025-11737-w
- Drake, C., Roehrs, T., Shambroom, J. & Roth, T. (2013). Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed. *J Clin Sleep Med*. https://pubmed.ncbi.nlm.nih.gov/24235903/

**Training-transfer nulls**
- Melby-Lervåg, M., Redick, T.S. & Hulme, C. (2016). Working memory training does not improve performance on measures of intelligence or other measures of "far transfer". *Perspectives on Psychological Science*. https://journals.sagepub.com/doi/10.1177/1745691616635612
- Sala, G. & Gobet, F. (2017). Working memory training in typically developing children. https://livrepository.liverpool.ac.uk/3006842/1/WM%20Training%20-%20FINAL.pdf
- Mindfulness meditation on attention, executive control and working memory in healthy adults: meta-analysis of RCTs. *Cognitive Therapy and Research* (2020). https://link.springer.com/article/10.1007/s10608-020-10177-2
- The effects of mindfulness on working memory: a systematic review and meta-analysis (2025). https://www.biorxiv.org/content/10.1101/2025.03.21.644687v1.full

**Alcohol**
- Alcohol-induced retrograde facilitation? Mixed evidence in a preregistered replication and encoding–maintenance–retrieval analysis. *Experimental Psychology* 69(6). https://pubmed.ncbi.nlm.nih.gov/36809161/

**Measurement instruments**
- Carstairs, J.R. et al. (2012). Australian norms and retest data for the Rey Auditory and Verbal Learning Test. *Australian Psychologist* 47(4). https://aps.onlinelibrary.wiley.com/doi/full/10.1111/j.1742-9544.2012.00086.x
- Mayo Normative Studies: Regression-based normative data for the AVLT, ages 30–91. https://pmc.ncbi.nlm.nih.gov/articles/PMC7895855/
- RAVLT test–retest reliability and alternate-form practice effects (Benedict & Zgaljardic, as reviewed). https://drkyriaki.com/pdfs/test-retest-reliability.pdf
- Kessels, R.P.C., van Zandvoort, M.J.E., Postma, A., Kappelle, L.J. & de Haan, E.H.F. (2000). The Corsi Block-Tapping Task: Standardization and normative data. *Applied Neuropsychology* 7, 252–258. https://pubmed.ncbi.nlm.nih.gov/11296689/
- Measuring working memory span with WAIS-IV: Digit sequence is the superior span test. https://www.tandfonline.com/doi/full/10.1080/23279095.2024.2330998
- Boston Qualitative Scoring System for the Rey–Osterrieth Complex Figure (normative sample n = 433, ages 18–94). https://www.parinc.com/products/BQSS
- Rivera, D. et al. (2015). ROCF copy and immediate recall: normative data, Latin American Spanish-speaking adults. https://content.iospress.com/articles/neurorehabilitation/nre151285

**Memory sport rules and standards**
- World Memory Statistics — Standards / Grandmasters / Records. http://www.world-memory-statistics.com/standards.php ; http://www.world-memory-statistics.com/grandmasters.php ; http://www.world-memory-statistics.com/disciplines.php
- The World Memory Championships — Certification; 2021 Millennium Standards; Memory Achievements. https://www.worldmemorychampionships.com/certification/ ; https://www.worldmemorychampionships.com/2021-millennium-standards/ ; https://www.worldmemorychampionships.com/memory-achievements/
- Art of Memory wiki — Memory Competition; Random Number Memorization Events; International Master of Memory; Grand Master of Memory. https://artofmemory.com/wiki/Memory_Competition/ ; https://artofmemory.com/wiki/Random_Number_Memorization_Events/ ; https://artofmemory.com/wiki/International_Master_of_Memory/
- IAM Rulebook (Nov 2019) — https://www.iam-memory.org/wp-content/uploads/2019/11/IAM_Rulebook_Nov2019.pdf (**fetch blocked — open this before finalising the words / names & faces / spoken numbers scoring details**)
- Memory League. https://memoryleague.com/
- Canadian Memory Championships — Memory Disciplines / Scoring. https://canadianmemorychampionships.ca/memory-disciplines/
- Art of Memory Forum — "Novice, beginner, intermediate, advanced, elite?" `[ANECDOTE]`. https://forum.artofmemory.com/t/novice-beginner-intermediate-advanced-elite/52626

**Open items for whoever finalises this** (all blocked by the proxy, all needed before any normative number is printed in the final system): the IAM Rulebook PDF; Carstairs 2012 Tables 2–3; Kessels 2000 percentile table; WAIS-IV Digit Span norms; BQSS/Meyers ROCF norm tables.
