# benchmarks.md — Objective Tests at Weeks 0 / 4 / 8 / 12

## Week 0 runs BEFORE training begins. This is not optional.

Most tier boundaries below the elite level **do not exist in the literature**. Agent 6 could not open
the normative tables (RAVLT, Corsi, WAIS-IV, ROCF) because this session's egress policy blocked the
publishers, and it refused to invent numbers. That refusal is correct, and it has a consequence:
**your week-0 scores define your own tier boundaries.** Without week 0 you have no denominator.

## The five conditions that make a retest interpretable

Violate any and the comparison is void, not merely noisy.

1. **Fresh random material every time** — digits, cards, names, Corsi sequences and words are all
   generatable. Generate the night before (commands in `README.md` appendix), print, do not look.
2. **Alternate forms where material cannot be random.** Same-list RAVLT retest shows significant
   practice effects at one and even two months; **alternate forms abolish them**. You need **four
   complete matched triads** — four A-lists, **four B-lists, four recognition sets**. One B-list
   reused across four sessions makes the recognition score uninterpretable at weeks 4, 8 and 12,
   which is the exact failure this rule exists to prevent. [agent-6 §B1]
3. **Fixed conditions** — same time of day ±1 h, same room, same caffeine dose and timing, ≥7 h sleep
   logged, no alcohol 24 h, no hard exercise 2 h prior.
4. **Abort at stress ≥8/10.** Acute stress reliably impairs *retrieval* — it corrupts precisely what
   you are measuring. [agent-6 §A3]
5. **Record audio; score afterwards from the recording**, not live. Instructions read from a script or
   TTS, verbatim, every time.
6. **Full attention, no exceptions** — every test here is latency- or accuracy-scored, and divided
   attention at retrieval preserves accuracy by lengthening latency (Craik, Eftekhari & Binns 2018).
   A benchmark run under any concurrent load is void, not noisy.

### How to read your own numbers (added after round-1 audit)

**Seven of these eight tests measure trained tasks.** A 2024 *Psychonomic Bulletin & Review*
meta-analysis of cognitive training reports SMD **0.18 overall versus 1.15 when outcomes resemble the
trained task**, and g = 0.07 for randomised versus 0.27 for non-randomised designs. Your scores on
tests 1–7 will rise partly because you are practising the tests. That is not fraud — near-transfer is
real and is what this system claims — but it means **tests 1–7 measure the system working, not you
getting generally better**, and **test 8 is the only one insulated from this**. Weight it accordingly.
`[PROBABLE]`, abstract-only.

**Strategy-on vs strategy-off:** run span tests twice — rehearsal only, then using your system — at
**week 0 and week 12 only**. The file itself says strategy-off is an unenforceable honest-effort
measure to be interpreted conservatively, and the targets table marks it "not a target"; running it
four times spends ~6 min per battery for nothing. [agent-6 §B1.5]

---

## The battery — 8 tests, ~80 minutes

**On benchmark days the daily training block is cancelled, not additional.** Materials are prepared
in the preceding Sunday slot.

**T0 (0–3) — Conditions log.** Time, hours slept, caffeine mg + time, alcohol 24 h, exercise 2 h,
stress 1–10.

**1. Digit span (3–11).** TTS reads random digits at 1/s. Lengths from 3 up, two trials each, stop
after two failures at a length. Forward, then backward. **Headline score = total correct trials** —
it is the more reliable index. Longest length is recorded but never compared across timepoints.
*Population norms live in the WAIS-IV technical manual, which is not open-access and was not opened.*

**2. RAVLT learning phase (11–24).** **Session-specific A-list.** 15 nouns at 1/s → free recall, ×5
(record T1…T5). Then B-list once, recall B. Then recall A without re-reading (T6). Score T1, T5, sum
T1–T5 (max 75), T6.

**3. Corsi block span (24–30).** Nine blocks or offline digital equivalent, increasing lengths, two
trials each, stop at two failures. Score = block span + total correct. [Kessels et al. 2000]

**4. 5-minute numbers (30–45).** 5 min memorising freshly generated digits in **rows of 20, 25 rows
per page**; then a **fixed 10-minute recall window, never changed**.

> **One scoring system only — competition row scoring.** 20 points per fully correct row in order;
> **any error in a completed row scores zero for that row**; final incomplete row scores 1 point per
> correct digit, **half if one mistake, zero if two or more**. "Raw digits at ≥95%" is **not
> expressible** under row scoring (100 digits with one error per row scores 0; 80 perfect digits
> scores 80) and has been deleted everywhere. Secondary score, recorded but not targeted: digits in
> the longest correct prefix. [agent-6 §B2]

**5. RAVLT delayed recall + recognition (45–50).** **Exactly 21 minutes after T6** — the delay
interval is a controlled variable, not an approximation; hold it at 21 min forever. Free recall of A,
then recognition across 30 items (15 targets + 15 distractors, half from that session's B-list).
Score delayed recall (0–15) and recognition discrimination (hits − false alarms).

**6. Names & faces (50–58).** Two runs on fresh sets: (a) Memory League format, **60 s memorisation,
15 faces**; (b) long form, **5 min memorisation, 30 faces**. Score = correct first names in correct
pairing. Fix your spelling tolerance in advance and hold it forever.

**7. Speed cards — a 15-minute box (58–73).** Shuffled deck, memorise, reproduce with a **second
identical deck** (two decks are required, not preferred). **Up to three attempts, stopping when the
box expires or you achieve a perfect reproduction.** Score = **fastest time with a perfect
reproduction**; failed attempts logged, scoring nothing. At week 0 you will likely get one attempt
and no perfect reproduction — log "no perfect reproduction within box" as the honest baseline. By
week 12 three attempts fit comfortably. This box replaces the original 8-minute allocation, which
could not physically contain three untrained attempts.

**8. Real-material retention probe (73–81).** 30 cued-recall items from material encoded **four weeks
earlier**. Score = % correct.

> **Test 8 is the only test that measures the thing this project exists for. Everything else is a
> proxy.** It is also the easiest test in the battery to fool yourself on, so it has a protocol:
>
> (a) **Sampling frame** — every item encoded in Block 4 gets a numbered line in your log *at
> encoding time*. That numbered list is the frame.
> (b) **Draw 30 line numbers with a random number generator in the Sunday slot, before the battery**
> and before you know any of your other scores.
> (c) **The cue is the one written at encoding time.** Never compose a cue at test time.
> (d) **Binary scoring** against what you wrote at encoding. No credit for "I knew that."
> (e) **Score from the audio ≥12 h after the battery.**
>
> If test 8 is flat while tests 1–7 climb, you are getting better at memory sport and no better at
> your material. That is the transfer-disappointment failure mode arriving early enough to fix — and
> the fix is the ≥50%-real-material rule, not more drilling.

### Saturday tracker (weekly, ~25 min — replaces Blocks 2–4 on Saturday)

The five **Memory League** 60-second disciplines: names, words, images, numbers, cards. One attempt
each. Priced at ~25 min, not 10: agent-2 §3.7 gives the ML words format as 60 s memorise **plus 4 min
recall**, so five disciplines run 1 + up to 4 min each. If that is too long, cut to three disciplines
and price it at 15 min. One name, one placement, one duration — used identically in `program.md` and
`drills.md`.

---

## Targets by week

**Sourcing, stated honestly.** Only three cells are externally anchored: the Week-12 word-list row
(≥55/72, Dresler-anchored), the Week-12 cards row (<3 min, agent-2 §3.6) and the Week-12 digits row
(agent-2 Stage 3). **Every Week-4 and Week-8 cell, every names & faces cell and every real-material
probe cell is a linear interpolation invented by this synthesis with no evidential basis.** They are
marked `[INV]` and should be replaced with your own week-0-anchored trajectory after the week-4
battery.

| Measure | Week 0 | Week 4 | Week 8 | Week 12 |
|---|---|---|---|---|
| **Word list, Dresler format** (72 words, 20-min delay) | baseline (untrained ≈ 26/72) | ≥40 `[INV]` | ≥50 `[INV]` | **≥55** — *anchored to one small quasi-experiment; treat as a stretch ceiling, not an expectation* |
| **5-min numbers** (competition points, row rule) | baseline | 40 `[INV]` | 70 `[INV]` | **≥100 pts** (5 perfect rows) |
| **Speed cards** (fastest perfect in box) | baseline (often none) | <6 min `[INV]` | <4 min `[INV]` | **<3 min** (anchored°) |
| **ML Words** (60 s) | baseline | 12 `[INV]` | 14 `[INV]` | **15–18**° |
| **Names & faces** (60 s, 15 faces) | baseline | ≥ wk0 + 3 `[INV]` | ≥ wk0 + 6 `[INV]` | **≥ wk0 + 9, floor 10 names** `[INV]` |
| **Conceptual set** (relationship-scored) | n/a | 15 items ≥80% @24 h `[INV]` | 30 items ≥85% @7 d — **probe** | 30 items ≥85% @7 d — **probe** |
| **Verbatim** (all-or-nothing lines) | n/a | — | 30 lines ≥70% @24 h — **probe** | **12 lines** unfamiliar, 15 min, ≥60% @24 h — **probe** |
| **Real-material probe** (test 8) | n/a | ≥70% `[INV]` | ≥80% `[INV]` | ≥85% `[INV]` |
| **Symbol lexicon** | 0 | ≥40 `[INV]` | ≥100 `[INV]` | ≥150 — **probe, not a gate** (demoted in round-1 audit; its warrant was a struck citation) |
| **Digit span, strategy-off** | baseline | not run | not run | context only — **not a target** |
| **RAVLT sum T1–T5** | baseline | see noise rule | see noise rule | see noise rule |

**Absolute names targets, not percentages.** "+150% over week 0" is 5 names on a baseline of 2 and 20
on a baseline of 8 — the same target denoting completely different achievements, undefined if week 0
is zero, and rewarding a sandbagged baseline. Absolute increments with a floor remove the incentive.

**RAVLT noise rule.** Treat sum changes under **8 points** as noise (≈1 SD in published young-adult
samples — **unverified; open Carstairs et al. 2012 Table 2 and replace this number**). Until you have
opened that table, do not act on any RAVLT movement at all. Reliability is 0.41–0.79.

**Why the probes are probes.** agent-2 places conceptual competence at **month 4–6** and the 30-line
verbatim standard at **month 6–9**. This program supplies ~32 h of encoding time in weeks 3–12
against agent-2's own 85–150 h pricing for Stages 3–5. Week-8 and week-12 conceptual and verbatim
numbers indicate whether you are on track for those horizons; they are not pass/fail.

## Long-horizon anchors (year 2+, and a flagged conflict)

**Two lanes returned different International Master of Memory standards**, citing the same source
family, neither able to open the primary rulebook:

- Agent 6: 1,000 digits/hour · 10 decks/hour · deck ≤2:00 · ≥3,000 championship points (GMM ≥5,000)
- Agent 2: 1,400 digits/hour · 14 decks/hour · deck <40 s

Almost certainly different eras of a standard revised upward, or two different awards conflated.
**`[CONTESTED]` — verify against the current WMSC rulebook.** Changes nothing here: both sit far
beyond 12 weeks. Firmly sourced elite anchors: speed-cards world record **12.74 s** (**2017 or
2018 — lanes disagree, unverified**); Mullen 18.65 s (2016).

## Open items before any normative number is printed

All blocked by egress policy: IAM Rulebook PDF · Carstairs et al. 2012 RAVLT tables 2–3 (Australian
norms **with retest data**, n = 390, ages 18–34) · Kessels et al. 2000 Corsi percentile table ·
WAIS-IV Digit Span norms. Until opened, every clinical-test comparison here is **self-referenced only**.

*(The Rey–Osterrieth Complex Figure, which agent-6 §B3 suggested as an optional week-0-only anchor,
is omitted: no openable norms, no repeatable parallel form, low value at n=1. Recorded in
`evidence.md` §3 as C8.)*
