# program.md — The 12-Week Progressive Program

> **Revision note (post-red-team).** The first version of this file advertised 67–82 min/day while
> separately mandating card authoring, unscheduled generation and a weekly Reading OS pass that
> appeared in no block — a true cost of 115–130 min/day. That is fixed below by *cutting scope*, not
> by finding more minutes. What was cut and why is stated in §2. Read §2 before anything else.

---

## 1. The dose decision

The only dose evidence at this outcome magnitude is Dresler et al. 2017 — a single small
**quasi-experimental** training study (**pseudo-randomised, n = 17 / 16 / 17**, not an RCT), **never
independently replicated**. Method-of-loci arm went from ~26 to ~62 of 72 words at six weeks on
**≤30 min/day for ~40 days**; the active control (working-memory drilling) gained +11 — about a
third. Time-on-task is not the active ingredient; **strategy is**. [research/agent-5 §1;
round-1 audit C-003]

**On durability, corrected.** The first version of this file said the gain "persisted at four
months." It does not persist intact: Wagner et al. 2021 (*Sci Adv* 7:eabc7606 — **the same cohort**,
not a replication) report the four-month retest at **+22.7 ± 18.8 words (n = 16)** against **+36**
immediately post-training. So roughly **60% of the gain is retained with no maintenance, with very
large individual variation** — an SD of 18.8 on a mean of 22.7 means some people kept nearly all of
it and some kept almost none. This is why §6 now carries a maintenance dose, which the first version
omitted because it had inherited persistence as free.

Documented elite doses cluster at **~30 min/day**, not hours: Foer's own account is "just half an
hour every day" (the widely repeated "one hour" figure is unsourced); Mullen trained ~30 min/day
while a full-time medical student. Dellis (4–6 h/day) is the documented outlier. [agent-5 §2]

**Therefore:** a **38-minute protected strategy core** (Blocks 2+3+4) — the part with RCT support —
plus storage and instrumentation around it. This program does not ask for hours.

## 2. What this program actually costs, and what was cut to make it fit

**Honest arithmetic.** A full implementation of everything the research lanes recommend costs
115–130 min/day. The brief is 60–90. Four things were cut, and each cut is a real loss, stated:

| Cut | Was | Now | What is lost |
|---|---|---|---|
| New cards/day | 15 | **8** | Slower knowledge accumulation. 8/day ≈ 480 cards over 12 weeks and ~80 reviews/day at maturity, which fits a 20-min review block. 15/day did not. |
| "~30% of daily time for unscheduled generation" [agent-3 §4.6] | 21 min/day | **one 20-min Sunday session + the Reading OS teach-aloud step** | This is a real deviation from agent-3's recommendation. Generation is what SRS cannot do, and it is now under-dosed. Flagged as a known weakness, not solved. |
| Reading OS | additional, unbudgeted | **replaces Block 4 on Wed/Thu** | Nothing — this is the correct fix. The Reading OS *produces* the encoding, so it was never additional work; it was mis-modelled as such. |
| Week-8/12 conceptual and verbatim **gates** | gates | **probes** | See §3. |

**The load-bearing honesty statement.** agent-2 prices its own Stages 3–5 at **85–150 hours**. Weeks
3–12 of this program supply roughly **32 hours** of encoding time. **This program therefore clears
agent-2's Stages 0–4 in 12 weeks and does NOT complete Stages 5–6.** That is exactly what agent-2's
own 12-week composite specifies — "Stage 2, 3 and 4 gates cleared" — and the first version of this
file quietly promised more. Conceptual mastery is a **month 4–6** outcome; the USAMC-format verbatim
standard is a **month 6–9** outcome, per agent-2 §Stage 5 and §Stage 6. The week-8 and week-12
conceptual and verbatim numbers below are *probes* telling you whether you are on track for those
horizons — not gates you have failed if you miss.

## 3. What is promised, and what is not

**Promised:** **80–90% cued recall at 7+ days on material you deliberately encode**, and word-perfect
reproduction of specific passages you choose and maintain. Those are the numbers the evidence and
this program's own gates support: Dresler's best result is 62/72 (86%); Rawson & Dunlosky's
successive relearning gives 83% at 30 days; this program's week-12 targets are 55/72 (76%) and ≥85%
at 7 days. **"Near-perfect" is not one of those numbers** and the first version of this file should
not have used it.

**Explicitly not promised:** general intelligence gains, working-memory capacity gains, or
improvement on material you did not deliberately encode. Melby-Lervåg et al. 2016 (87 publications,
145 comparisons) found no convincing far transfer; Ramon et al. 2016 found world-record face–name
memorisers were **as impaired as controls** on face inversion and the other-race effect, with no
hippocampal enlargement. [agent-5 §5, agent-6 §A5]

This disclaimer is load-bearing: **transfer disappointment is one of five documented quit causes**,
and it only bites people who were promised something else.

---

## 4. The daily schedule

**Mon / Tue / Fri — 76 minutes**

| # | Block | Min | What | Core? |
|---|---|---|---|---|
| 1 | Delayed-recall check | 5 | Recall yesterday's set cold, top 10 items, before looking at anything. Score it. | instrumentation |
| 2 | Speed drill (D2) | 10 | Timer at 90% of current best. | **PROTECTED CORE** |
| 3 | Error autopsy (D3) | 3 | One written line per failure: *why the image or locus failed*. | **PROTECTED CORE** |
| 4 | Encoding (D4/D5) | 25 | Real target material only. | **PROTECTED CORE** |
| 5 | Card authoring | 10 | Write the day's 8 cards from the gap list. | storage |
| 6 | Anki review | 20 (cap 25) | Whatever the queue actually is. | storage |
| 7 | Log | 3 | `tracking.md`. | instrumentation |

**Wed / Thu — 76 minutes.** Blocks 4 + 5 (35 min) are replaced by the **Reading OS** on the week's
source. Steps 3–8 of the pipeline *are* the encoding block and they produce the cards, so this is a
substitution, not an addition. All other blocks unchanged.

**Sat — ~50 minutes.** Blocks 2–4 are replaced by the **Saturday tracker** (~25 min, see
`benchmarks.md`). Blocks 1, 6, 7 unchanged.

**Sun — ~88 minutes.** Blocks 1, 6, 7 (28 min) plus the week's overheads:
system slot (15) + generation session (20) + `00-Inbox` rewrite pass (15) + next week's material
prep (10).

**Benchmark days (weeks 0, 4, 8, 12): the daily block is CANCELLED, not additional.** Materials are
prepared in the preceding Sunday slot. Draw the test-8 items in that same slot, from your log,
**before** you know your battery score.

### Two placement rules that are not negotiable

**Block 4 goes in your last 2–3 waking hours.** Sleep benefit to episodic memory is g = 0.44.
Encode, then sleep on it. [agent-6 §A1]

**Block 4 is single-tasked and interruption-proofed to a degree that feels excessive.** Divided
attention at encoding costs substantially more than divided attention at retrieval — the *direction*
is well replicated, including by a lab hostile to the rest of the claim. *(The specific figures
"22–46%" and "1–13%" were struck in round-1 audit: three independent searchers could not locate them
in any source. Cite the direction, not magnitudes.)*

**Blocks 2 and 6 run under FULL attention by default.** *(This reverses the first version of this
file, which told you to put reviews in the commute and the noisy kitchen. That instruction was
wrong — see `evidence.md` §3b-R1.)* Degraded conditions are a permitted fallback only when the
alternative is skipping the rep, never for first-pass or shaky items, and only under **non-verbal**
load — walking, dishes, light exercise.

> **Hard ban on verbal concurrent load during any retrieval:** no podcasts, audiobooks,
> conversation, email or Slack triage, subtitled video, or reading anything else. Word-based
> concurrent tasks produce *large* retrieval interference while digit- and picture-based tasks
> produce little (Fernandes & Moscovitch 2000, 2002). Every domain in your profile — software/math,
> law, medicine, finance — and every verbatim passage is **verbal**, so the original rule prescribed
> precisely the interference type that damages retrieval of precisely the material being reviewed.
> The failure mode is invisible: today's recall score is preserved while the downstream trace decays.

**All latency-scored measures run under full attention, without exception:** the D2 speed drill,
speed cards, 5-minute numbers, and the five Memory League disciplines. Divided attention at retrieval
preserves accuracy by lengthening decision latency (Craik, Eftekhari & Binns 2018), so measuring any
timed gate under degraded conditions produces false negatives and mis-schedules reviews. **Block 2 is
protected core and full-attention. Block 6 is full-attention by default with a non-verbal fallback.**

### Weekly shape

| Day | Speed drill | Block 4 | Other |
|---|---|---|---|
| Mon | Digits° | Concepts (primary domain) | |
| Tue | Cards° | Concepts | |
| Wed | Digits° | **Reading OS** (Blocks 4+5) | |
| Thu | Cards° | **Reading OS** (Blocks 4+5) | |
| Fri | Names | Verbatim | |
| Sat | — | — | Saturday tracker (~25 min, replaces Blocks 2–4) |
| Sun | — | — | System slot · generation · Inbox pass · material prep |

° Digits begin week 3 and cards week 5 — see the weeks-1–2 substitution in `drills.md` D2.

**System freeze applies Mon–Sat.** No new encoding system, palace scheme, add-on or template change
outside the Sunday slot. Any change adopted on a Sunday must survive a **two-week trial with logged
scores** before another. [agent-5 §2, §7.3]

### Scheduled decrements (so load does not only ever rise)

- **Week 2:** D0 retires on gate clearance (typically 3–6 sessions).
- **Week 5:** delayed-recall check is already at 5 min (top 10 items only) — hold it there.
- **Week 7:** the second domain's maintenance reviews are capped at 20 cards/day and come **out of**
  the 20-minute review block, not in addition.
- **Week 9:** verbatim maintenance replaces new verbatim acquisition for two weeks.

---

## 5. Recovery rules (ranked by evidence, not popularity)

**High-yield — the entire serious set:**

1. **7–9 h sleep, every night.** g = 0.44 for episodic retention. Never trade sleep for review.
2. **Never encode new material sleep-deprived.** One night of deprivation cuts new-memory formation
   by ~40% *(single well-cited study, not a meta-analysis — treat the exact 40% as one estimate, the
   direction as solid — agent-6 Finding 2)*. After a bad night, convert Block 4 to retrieval practice
   of already-encoded material.
3. **Caffeine: fixed daily dose, hard cut-off 8 h before bed.** 400 mg taken *six* hours before bed
   cut objectively measured sleep by more than an hour — and participants did not notice.
4. **Never benchmark under acute stress.** Acute stress reliably impairs *retrieval*, which is
   exactly what a benchmark measures. Abort at stress ≥8/10.
5. **No alcohol on training days; none 24 h before a benchmark.**

**Marginal — do for health, do not expect score movement:** aerobic base 3×/week (meta-analytic
hippocampal effect g = 0.13, and it looks like preservation not growth); optional 20–30 min nap 1–3 h
after heavy encoding, before 15:00.

**Do NOT do — these exist to save you time and money:** n-back or commercial brain training (no
convincing far transfer, two independent meta-analyses); targeted memory reactivation at home
(g = 0.29 lab *with documented publication bias*, null in REM and wake, cannot stage-lock at home);
caffeine dosed for consolidation (replication titled "at best small", proposes withdrawal reversal;
a 2025 study found increased false alarms); supplements and nootropic stacks (no meta-analytic
evidence located). [agent-6 A7]

**Resolved conflict — sleep-proximate encoding vs the 4-hour exercise window.** van Dongen 2016 found
35 min of intervals 4 h after encoding improved 48-h retention. That cannot coexist with encoding in
your last 2–3 waking hours. **Sleep wins:** g = 0.44 meta-analytic `[ESTABLISHED]` beats a single
n = 72 `[PROBABLE]` study. Aerobic sessions go morning or early afternoon. On a weekend with a large
midday encoding block, take the 4-hour alignment as a free win.

---

## 6. The 12 weeks

Week 0 runs **before any training begins**. Without it you have no denominator.

### Week 0 — Baseline and setup (no training)
Full benchmark battery (~78 min at week 0 — see `benchmarks.md`). Anki configured per §7. Five
buildings scouted. Primary domain chosen. `symbol-lexicon.tsv` and `palace-index.tsv` created.
Full runbook in `README.md`.

### Weeks 1–2 — Image fluency and the first palaces
D0 until gate clears, then retire. Build 5 palaces × 20 loci, 5 loci per room°. Hot pool (2–4
journeys, overwritten daily) split from cold archive (write-once, domain-segregated). Run the
**ghosting experiment** with the scoring rule in `drills.md`. Start the Major system: 10 images/day.
Adopt the Reading OS triage rule on everything you read. New cards **5/day**.

**Gate (agent-2 Stage 1 + Stage 2):** 20/20 concrete words, 2-min encode, 100% at 24 h; palace
recited backwards without error; **40/40 words, 4-min encode, ≥90% at 24 h**; portfolio index
populated; personal cooldown measured and documented.

### Weeks 3–4 — The number system and first real material
Complete 00–99, **derived from Major phonetics** (appendix in `drills.md`) — a free-associated set
has no self-repair mechanism and decays permanently. Begin D4 concept encoding on real material.
Reading OS Config B on one **2,000–3,000 word** source per week (Wed/Thu blocks). New cards **8/day**.

**Week 4: benchmark battery.**

**Gate:** all 100 number images bidirectional in ≤200 s. This clears the **image half** of agent-2's
Stage 3 gate; the throughput half (100 digits/5 min) is a week-12 target, so Stage 3 is *not*
complete at week 4. Lexicon ≥40.

### Weeks 5–6 — Cards, and verbatim begins
52 card images. Quarter → half → full deck. **D5a verbatim (technical/legal)** starts: 12-line
passages, one locus per clause. End of week 6 closes the **Dresler-equivalent window** — the six
weeks × ≥30 min/day that study covers. **Expect a step change. Expect to keep roughly 60% of it
without maintenance, with high individual variance** — which is why maintenance is scheduled below,
not optional.

**Gate:** full deck 100% accurate under 6 min; 12-line passage 100% all-or-nothing at 24 h.

### Weeks 7–9 — Scale and the second verbatim technique
**D5b verbatim (prose/speeches)** starts — beat segmentation, meaning justification, motor enactment,
aloud at tempo. Do **not** merge with D5a. Second domain enters maintenance (capped 20 reviews/day,
out of the existing block). First quarterly palace sweep.

**Week 8: benchmark battery.**

**Gate:** full deck under 4 min at 100%.
**Probes (not gates — agent-2 places these at month 4–6):** 30-item conceptual set ≥85% at 7 d;
30-line passage ≥70% of lines perfect at 24 h.

### Weeks 10–12 — Consolidation and the week-12 gates
Steady state. No new systems, no new tooling. Lexicon to ≥150.
Verify **≥50% of Block-4 minutes are on real target material** — the countermeasure to transfer
disappointment, checkable from your log.

**Week 12: benchmark battery.**

**Week-12 gates (agent-2's own 12-week composite — Stages 0–4):**
100 digits in 5 min at ≥95% immediate and ≥85% at 24 h · full deck under 3 min at 100% · 100+ indexed
loci · **≥55/72 on a Dresler-format word list — treat as a stretch ceiling, not an expectation.**
That target is anchored to one small quasi-experiment whose effect is a far outlier against every
pooled estimate (g = 0.65 to d = 0.88, on an evidence base GRADE-rated low to very low).

**Demoted to probe:** lexicon ≥150. Its entire evidential warrant was the Roediger-1980 abstract-noun
null, which round 1 rejected as misattributed (see §6a). A gate is pass/fail on your 12 weeks and may
not rest on a struck citation. It stays tracked; it stops being a verdict.

## 6a. Post-program maintenance (weeks 13+) — added after round-1 audit

The first version had no maintenance protocol because it had inherited "the gain persisted at four
months" as free. It is not free: ~40% of the peak gain was lost over four months without practice.

**Minimum maintenance dose, in the Sunday slot:** one timed re-walk of each cold-archive palace on a
rotating schedule (so every palace is walked at least monthly), plus continued spaced retrieval on
old material via the existing Anki queue. **Dose is a calibration target, not a known quantity** —
no dose-response curve for mnemonic maintenance exists in the literature (Twomey & Kroneisen 2021
found the pooled MoL effect roughly flat across session counts). Set it from your own retention data
via the inner loop in `/research-loop.md` §4.

**Week-12 probes (on-track indicators for month 4–9, not pass/fail):**
30-item conceptual set ≥85% at 7 d · **12-line** unfamiliar passage, 15 min to memorise, ≥60% of
lines perfect at 24 h. *(The 30-line version at 15 min is arithmetically unreachable: the cost model
in `drills.md` prices 240–300 words at 19–36 min even at trained fluency. agent-2 calls the 30-line
standard a 6–9 month mark. Attempt it at month 6.)*

---

## 7. Anki configuration (full table — do not go to `/research/` for this)

**Critical:** Anki enforces new-card limits **per preset**. 8/day is a **total across all presets**.
You must set each preset individually to the values below, which sum to 8.

### Preset `Core-0.93` — verbatim, formulas, statute text, anything that must never fail

| Setting (as in Anki) | Value | Reason |
|---|---|---|
| FSRS | **On** (global toggle) | Default scheduler since 25.07. Do not install any FSRS add-on. |
| Desired Retention | **0.93** | ~1.4× the 0.90 load; worth it only on must-never-fail material. |
| Learning steps | **`10m 1h`** | Manual warns steps ≥1 day are not recommended with FSRS. |
| Relearning steps | **`10m`** | A lapse should cost minutes, not a full re-ladder. |
| Maximum interval | **`365`** | Forces an annual touch on material you promise to produce on demand. |
| **New cards/day** | **3** | Part of the 8/day total. |
| Maximum reviews/day | **`9999`** | Capping reviews hides debt; control intake instead. |
| Leech threshold | **4** | Surface broken cards fast. |
| Leech action | **Tag Only** | Suspending silently deletes knowledge; tagging forces a rewrite. |
| Bury new / review / interday siblings | **All On** | Stops clozes cueing each other. |
| Reschedule cards on change | **Off** | Manual: "not recommended". Never turn on. |
| Insertion order | **Sequential** | Manual guidance. |
| New/review order | **Mix with reviews** | Avoids a front-loaded new-card block. |
| Easy Days | Sat/Sun **Reduced** | Only mark genuinely low-capacity days. |

### Preset `Bulk-0.90` — concepts and general facts (where the volume lives)
As above except: Desired Retention **0.90** · Maximum interval **1825** · **New cards/day 5** ·
Leech threshold **6**.

### Preset `Intake-0.85` — fast capture during reading
As above except: Desired Retention **0.85** · Maximum interval **3650** · **New cards/day 0**
(the Inbox is filled by hand and drained in the Sunday rewrite pass, not fed by the scheduler) ·
Leech threshold **8**.

### Decks
```
00-Inbox              → Intake-0.85
01-<primary domain>   → Bulk-0.90
  01a-Concepts        → Bulk-0.90
  01b-Verbatim        → Core-0.93
99-Palaces            → Core-0.93   (max interval 180)
```
Maximum three levels. Deck sprawl is the most common cause of untouched decks.

### Operating rules
- **Never reset or rebuild the deck.** "Reschedule cards on change" stays off permanently. [agent-3 §1.7]
- **Grade honestly.** Again = could not produce it. Hard = produced it slowly. Using Hard as a soft
  Again is the single most common way to corrupt FSRS's fit. [agent-3 §3.4]
- **Block 6 = whatever your queue actually is, capped at 25 minutes.** Expect 40–80 reviews/day
  through week 12 and ~150/day only from month 9 onward. The "150/day" figure is an *outcome to
  monitor*, not a daily budget. If the queue exceeds 25 min three days running, the circuit-breaker
  fires. [agent-5 §3°, agent-3 §2]
- **Circuit-breaker:** backlog > 2× daily cap → **new cards to 0** until clear, drained in capped
  daily chunks, never in one heroic sitting. Backlog is a scheduling event, not a moral failure.
- **Cards come from the gap list**, after blank-page recall has identified what you don't know — not
  during reading, when everything looks worth carding. [agent-4 step 8]
- **Optimize FSRS** at ~1,000 reviews, then at each doubling, then monthly. 4–6 clicks in year one.

**Known under-dose, stated honestly:** agent-3 §4.6 recommends ~30% of daily time on unscheduled
generation, because SRS produces *cued* retrieval and does not produce transfer, integration or
fluent application. This program supplies a 20-min Sunday generation session plus the Reading OS
teach-aloud step — well under 30%. If you find spare capacity, put it here first.

## 8. Habit protection

Fix **one time and one physical place for Block 4** and do not move either for 66 days. Lally et al.
2010: median time to automaticity 66 days (range 18–254), and **missing a single opportunity did not
materially affect habit formation**. Blocks 2 and 6 are deliberately mobile.

- Adherence is scored on a **7-day rolling average, never on streaks**.
- One missed day is explicitly a non-event. Evidence-backed, not consolation.
- **Two consecutive misses → the 15-minute floor session:** 5 min delayed-recall check (top 10 items)
  + 10 min Anki, review-only, new cards forced to 0. **Stop at 15 minutes even if the queue is not
  clear.** The floor never goes to zero.

---

° Marked numbers are practitioner-sourced `[ANECDOTE]` — see `evidence.md` Tier 5. They are starting
hypotheses to be replaced by your own logged data, not evidence.
