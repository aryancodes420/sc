# RED TEAM CRITIQUE — /system/ audit against /research/

Auditor stance: hostile. Egress-blocked abstract-only sourcing is **not** penalised where disclosed
(evidence.md §1 discloses it well). Everything else is fair game.

---

## SCORES

| # | Criterion | Score | One-line justification |
|---|---|---|---|
| 1 | Traceability | **4 / 10** | No fabricated *citations* — a real strength — but a dozen fabricated *numbers* sit under a sourcing note that explicitly claims nothing was invented, and two research gates were silently moved from "month 4–9" to "week 8–12". |
| 2 | Day-one executability | **3 / 10** | The Anki settings table exists only in `/research/`, and following it produces 60 new cards/day against a 15/day cap; the Major code is nowhere in `/system/`; the weeks-1–2 speed drill has no defined content; the "15-minute floor session" is 27 minutes by the system's own block times. |
| 3 | Sustainability at 60–90 min/day | **2 / 10** | The arithmetic does not close. Scheduled 67–82 min/day hides 48–58 min/day of mandated-but-unbudgeted work (card authoring, Reading OS, "30% unscheduled generation"), giving a true 117–130 min/day; benchmark days reach ~180 min; every load axis rises across 12 weeks while the budget stays flat. |
| 4 | Benchmark objectivity and repeatability | **4 / 10** | Practice-effect controls on the *word list* are genuinely good and week 0 is properly enforced — but the one test that measures the mission (test 8) is self-selected, self-written and self-scored with no rubric, the 5-min numbers test carries two incompatible scoring rules in one file, most targets are invented, and the week-0 battery cannot physically fit in 72 minutes. |
| 5 | Internal consistency | **4 / 10** | Seventeen located contradictions between files, including a gate threshold that appears at two different weeks, two different scoring systems for one test, two different world-record dates, and a drill (D6) that program.md schedules and drills.md declares unschedulable. |

---

## CRITERION 1 — TRACEABILITY (4/10): REQUIRED FIXES

**1.1 — `benchmarks.md` line 98–99 makes a false sourcing claim.**
Offending text: *"Absolute targets are drawn from documented amateur trajectories and competition
standards; anything that could not be sourced is marked and set from your own week-0 score instead
of invented."*
This is untrue of the table immediately below it. Of the 44 target cells, the following appear
**nowhere in `/research/`**: word list ≥40 (wk4) and ≥50 (wk8); 5-min numbers 50 (wk4) and 75 (wk8);
speed cards <5 min (wk4) and <4 min (wk8); ML Words 12 (wk4), 14 (wk8) and the "8–12 typical"
baseline; names & faces +50% / +100% / +150%; real-material probe ≥70% / ≥80% / ≥85%; lexicon ≥100
(wk8).
**Fix:** either delete the sourcing note, or rewrite it as: *"Only the Week-12 word-list row (≥55/72,
Dresler-anchored), the Week-12 cards row (<3 min, agent-2 §3.6) and the Week-12 digits row are
externally anchored. Every Week-4 and Week-8 cell, the names & faces rows and the real-material probe
rows are **linear interpolations invented by this synthesis with no evidential basis** — treat them
as provisional and replace with your own week-0-anchored trajectory after the week-4 battery."*
Mark each such cell `[INVENTED]` in the table itself.

**1.2 — `drills.md` line 83, ML Words baseline "8–12".**
`/research/` contains no untrained Memory League *words* figure. The only untrained ML datum is
agent-6 §B2: *"a forum claim that 'a novice untrained memory manages 4 ± 1 items' is `[ANECDOTE]`"*
— and that is for **cards**, not words.
**Fix:** replace the cell with `baseline — no published untrained figure exists; set from your own
week-0 score`.

**1.3 — `drills.md` lines 85–86, the Month 6 and Month 12 rows.**
`130–150` digits (mo 6), `<2 min` deck (mo 6) and `25–30` words (mo 12) appear nowhere in
`/research/`. Worse, `25–30` words at 60 s **contradicts** agent-2 §3.7, which states an intermediate
practitioner plateaus at 15–18 and finds ">20 hard", and that "20 words/60 s is a genuinely good
6-month amateur number; anything claiming faster progress than that is selling something."
**Fix:** delete the Month 6 row entirely (agent-2 gives only a 3-month and a 12-month card anchor).
Change Month 12 words to `~20–25, and note that agent-2 §3.7 calls >20 hard`. Add the sentence
already in agent-2: *"Anything faster than this on this timeline is being sold to you"* — which
`benchmarks.md` line 119 quotes but `drills.md` omits while printing faster numbers.

**1.4 — `drills.md` line 86, "Month 12 | 200 @ ≥95%".**
This is agent-2's **Stage 7 exit gate**, and agent-2 §Stage 7 makes it explicitly conditional on
building PAO or a 000–999 system. `drills.md`'s own final section ("What you are explicitly NOT
building") forbids exactly that in the first 12 months.
**Fix:** either delete the 200-digit Month 12 cell, or annotate it `— requires PAO/3-digit, which
this program forbids in year 1; unreachable on a 2-digit system, listed for orientation only`.

**1.5 — Two research gates were moved earlier without disclosure.**
(a) agent-2 Stage 5 places the *30-item conceptual set at ≥85% at 7 days* at **"core competence by
month 4–6"** with a stated cost of **40–80 h**. `program.md` line 211 and `drills.md` line 177 make it
the **Week 8** gate.
(b) agent-2 Stage 6 states the 30-line / 15-min / ≥60% USAMC gate is **"a realistic 6–9 month amateur
mark"** and places Stage 6 at **"month 4 onward"**. `program.md` line 217/226, `drills.md` line 241 and
`benchmarks.md` line 109 make it the **Week 12** gate — and `drills.md` line 244 then reprints
agent-2's sentence *"60% at Week 12 is a realistic amateur mark [agent-2 Stage 6]"*, attributing to
agent-2 a timeline agent-2 does not state.
**Fix:** `drills.md` line 244 must read: *"agent-2 §Stage 6 calls 60% a realistic **6–9 month**
amateur mark. Placing it at week 12 is this program's own compression and is **unsupported** — treat
week-12 verbatim as a stretch probe, not a gate, and treat month 6–9 as the honest target."* Apply
the same correction to the Stage 5 compression in `program.md` line 211.

**1.6 — `README.md` line 101 and `program.md` line 237: "turns a 60-minute day into a 130-minute day".**
agent-3 §2.5 states this and labels it explicitly: *"`[PROBABLE]` — this is a judgement call built on
2.1–2.4."* Both `/system/` files state it as flat fact, twice, and use it to justify the whole
three-preset architecture.
**Fix:** append `[PROBABLE — agent-3's own judgement call, not a measurement]` at both sites.

**1.7 — `drills.md` line 24–29 (D0) upgrades an `[ANECDOTE]` to a hard gate.**
agent-2 §5.5 is labelled `[ANECDOTE]` with the explicit rider *"(Abstract-level read only; treat as
[PROBABLE] pending full text.)"* `drills.md` converts it into a pass/fail rule — *"Static object
images do not count"* — and `README.md` line 131 into *"that rep did not count."*
**Fix:** keep the practice (it is cheap and plausible) but restate the gate as: *"Prefer animate,
interacting images — the supporting study is abstract-only and `[PROBABLE]`. Score a static image as
a warning, not a zero."*

**1.8 — `program.md` line 91: "~40%" sleep-deprivation figure carries no caveat, and is absent from
`evidence.md`.**
agent-6 Finding 2: *"`[ESTABLISHED]` (single well-cited study, not a meta-analysis — treat the exact
40% as one estimate, the direction as solid)."*
**Fix:** add the parenthetical to `program.md` recovery rule 2, and add a Yoo et al. 2007 row to
`evidence.md` Tier 1/2 carrying that caveat, since every other load-bearing number is tabulated there
and this one is not.

**1.9 — Practitioner-tier numbers are stated as hard gates in the operational files with no label.**
`5 loci per room`, `~4-day ghosting cooldown`, `an unindexed portfolio caps out around 10 palaces`,
`~150 reviews/day`, and the whole D2 progression table are all `[ANECDOTE]` in agent-2 §2.1/§2.2/§2.5,
agent-5 §3 and agent-2 §3.6–3.7. `evidence.md` Tier 5 discloses this correctly — but `drills.md` and
`program.md`, which are the files the learner actually executes from, never point at Tier 5.
**Fix:** add one line at the head of `drills.md`: *"Numbers marked ° are practitioner-sourced
`[ANECDOTE]` (see `evidence.md` Tier 5) — starting hypotheses to be replaced by your own logged data,
not evidence."* and mark those five items with °.

**1.10 — World-record date drift, unflagged.**
`drills.md` line 87: `12.74 s (WR 2018)`. `benchmarks.md` line 136: `12.74 s (2017)`. The lanes
themselves disagree — agent-2 §3.4 says 2018, agent-6 §B2 says 2017 — and `evidence.md` §3, which
flags the IMM-standard conflict as C4, does not flag this one.
**Fix:** harmonise both `/system/` files to `12.74 s (2017 or 2018 — lanes disagree, unverified)` and
add it to `evidence.md` §3 as conflict **C7**.

**1.11 — The top-line promise exceeds every number in the system.**
`README.md` line 42 and `program.md` line 23: *"**Promised:** near-perfect on-demand recall."*
Nothing in `/research/` supports "near-perfect". The best evidence in the corpus is Dresler's 62/72
(86%); Rawson & Dunlosky's successive relearning gives 83% at 30 days; and the system's own week-12
targets are 55/72 (76%) and ≥85% at 7 d. The promise is therefore louder than the program's own
success criteria — and `README.md` line 48 correctly names expectation failure as a quit cause.
**Fix:** replace "near-perfect" with the system's actual contract: *"**Promised:** 80–90% cued recall
at 7+ days on material you deliberately encode, and word-perfect reproduction of specific passages
you choose and maintain. These are the numbers the evidence and this program's own gates support;
'near-perfect' is not one of them."*

**What is correctly traceable (checked, not assumed):** every proper-noun citation in `/system/` was
machine-checked against `/research/` — **zero orphans**. The FSRS load multipliers (2.17× / 3.73× /
5.69×), the divided-attention asymmetry (22–46% / 1–13%), g = 0.44 sleep, g = 0.42/0.67/0.34/−0.39
interleaving, d ≈ 0.45 self-reference, g = 0.55 self-explanation, g = 0.50/0.61 retrieval practice,
66-day habit median, the Macnamara variance figures, the ≥55/72 and ≥150-lexicon composite, the
USAMC all-or-nothing rule and the 5-min-numbers row-scoring rule all match their sources exactly.
The verbatim cost model is correctly and prominently labelled as a derived estimate.

---

## CRITERION 2 — DAY-ONE EXECUTABILITY (3/10): REQUIRED FIXES

**2.1 — FATAL INDIRECTION. The Anki configuration exists only in `/research/`, and following it
breaks the program's own cap.**
`README.md` line 97: *"Create three presets with the settings in `research/agent-3 §3`."*
`program.md` line 144: *"Exact settings table in `research/agent-3 §3`."*
agent-3 §3.1–3.3 sets **New cards/day = 10 (ramping to 20) / 20 / 30** per preset. Anki applies the
new-card limit **per preset**. A learner who does exactly as instructed gets up to **60 new
cards/day** — four times `program.md` line 240's *"cap new cards at 15/day"* — and will be at a
1,000-card backlog inside three months, which is the exact `[ANECDOTE]` abandonment trigger the
system quotes at agent-5 §3.
This is not a style objection. It is a wrong configuration produced by following the instruction.
**Fix:** paste the full settings table into `program.md` as an appendix, with the new-card rows
changed to `Core-0.93: 5/day · Bulk-0.90: 10/day · Intake-0.85: 0/day (Inbox is filled by hand, not
by the scheduler)` — summing to the intended 15 — and add an explicit line: *"15/day is a **total
across all presets**. Anki enforces new-card limits per preset; you must set each preset
individually."*

**2.2 — No deck→preset assignment for the material that carries the program.**
`README.md` Block 3 creates three presets and exactly two decks (`00-Inbox`, `99-Palaces`). Bulk-0.90
is created and then never attached to anything. The learner has nowhere to put a concept card on day
1 and must invent a deck tree.
**Fix:** add to `README.md` Block 3: *"Create `01-<your primary domain>` (preset Bulk-0.90) with
sub-decks `01a-Concepts` (Bulk-0.90) and `01b-Verbatim` (Core-0.93). Maximum three levels. All
concept cards go to `01a`; all verbatim clozes to `01b`; anything captured mid-reading goes to
`00-Inbox` and is rewritten in the Sunday slot."*

**2.3 — The weeks-1–2 speed drill (Block 2, 10 min/day, 70 minutes/week) has no content.**
`program.md` Block 2 and `drills.md` D2 define the rotation as Digits (00–99 system) and Cards (52
images). The 00–99 system is not built until weeks 3–4; the card system not until weeks 5–6.
`drills.md` also instructs *"Set the timer to 90% of your current best time"* — on day 1 no best time
exists for any discipline.
**Fix:** add a `drills.md` clause: *"**Weeks 1–2, D2 is replaced by D1-timed:** 20-item concrete-noun
lists into a palace, 2-min encode, scored at 24 h — run against a stopwatch with the target set to
your previous session's time. D2 proper begins Week 3 (digits) and Week 5 (cards). Your first D2
timer target is your week-0 benchmark time × 0.9."*

**2.4 — Block 1 (delayed-recall check, 7 min) is undefined on Day 1.**
There is no "yesterday's encoded set" on the first training day.
**Fix:** `README.md` "Tomorrow — Day 1" must state: *"Day 1 has no Block 1. Your first delayed-recall
check is Day 2, scoring the 20-item list you encoded on Day 1."*

**2.5 — The Major system is required and never supplied.**
`program.md` line 163: *"Start the Major system: 10 images/day."* The Major consonant→digit code
appears nowhere in `/system/` — agent-2 §3.1 only names the system ("phonetic consonant→digit code")
and never prints the mapping. The learner cannot begin. The same is true of the 52-card mapping
method, the rhyming pegs 1–10 (`drills.md` D6: *"built in one sitting"*, no method given) and the
D5a cue-word selection procedure (*"the word that reinstates the whole clause"* — no criterion).
**Fix:** add an appendix to `drills.md` printing (a) the 0–9 Major consonant table, (b) the derivation
rule for 00–99, (c) the suit→consonant scheme for the 52 cards, (d) the ten rhyming pegs, and (e) a
three-example worked demonstration of cue-word selection on a statute sentence. Without (a) the whole
Week 3–4 block is inexecutable.

**2.6 — "15-minute floor session" is 27 minutes.**
`program.md` line 264: *"Two consecutive misses trigger an automatic drop to a **15-minute floor
session** — delayed-recall check plus Anki only."* Block 1 = 7 min and Block 5 = 20 min. 7 + 20 = 27.
The rescue protocol for a learner who is already failing is nearly twice its advertised size.
**Fix:** restate as: *"**15-minute floor session:** 5 min delayed-recall check (top 10 items only) +
10 min Anki, review-only, new cards forced to 0. Stop at 15 minutes even if the queue is not clear."*

**2.7 — No method is given for generating any drill or benchmark material.**
`README.md` Block 1: *"Generate 25 rows of 20 random digits"*, *"Write four different 15-word lists"*,
*"Find or generate a face–name set"*. `benchmarks.md` line 16: *"generate new ones the night before."*
`drills.md` D0: *"50 random concrete nouns."* No script, tool, source or word pool is named anywhere,
and the learner must not choose the words themselves (self-selection destroys the benchmark).
**Fix:** add a `README.md` "Materials" appendix with a copy-pasteable generator — three shell/Python
one-liners (digits, sampling N nouns without replacement from a named public concrete-noun list,
shuffling a face–name set) — and name a specific face image source. Every recurring material need
must have a stated command.

**2.8 — The face–name material is under-specified by a factor of eight.**
`README.md` Block 1 asks for *one* set of 20 faces. `benchmarks.md` test 6 requires **two** runs (60 s
ML format and 5-min long form) with fresh material, across **four** sessions = 8 distinct sets.
`benchmarks.md` also never states set sizes for either run.
**Fix:** *"Prepare 8 unseen face–name sets: 4 × 15 faces for the 60-s run, 4 × 30 faces for the 5-min
run. Never reuse a face across sessions."*

**2.9 — "Encoding volume" is a gate variable and is never defined.**
`README.md` rule 3, `program.md` line 219, `drills.md` line 178 and `tracking.md` line 37 all gate on
*"≥50% of encoding volume on real target material"*. Items? Minutes? Cards? The log line asks for a
percentage with no denominator.
**Fix:** define it once, in `drills.md`: *"**Encoding volume = minutes logged in Block 4**, taken from
tracking.md line 4. Nothing else counts — not reading minutes, not Anki minutes."* Change the
`tracking.md` weekly field to `Block-4 minutes on real material ___ / total Block-4 minutes ___`.

**2.10 — "One dense source per week" is never sized, and it is the largest hidden cost in the program.**
`program.md` line 178. agent-4 Part 3 prices Config B at **18–25 min per 1000 words**. A "dense
source" could be 800 words or 12,000; the difference is 15 min/week versus 300 min/week.
**Fix:** *"One dense source per week = **2,000–3,000 words**, i.e. 36–75 min of Reading OS, which you
must schedule **outside** the daily block. If your source is longer, run Config B on one section only
and Config A on the rest."*

**2.11 — The "protected 30-minute strategy core" is never mapped to blocks.**
The entire dose argument in `program.md` §1 rests on it, and the daily schedule's six blocks are never
labelled core vs surplus.
**Fix:** annotate the schedule table: *"Blocks 2 + 3 + 4 (38–43 min) are the protected core — this is
the Dresler-equivalent dose. Blocks 1, 5, 6 are storage and instrumentation and may be moved,
shortened or done in imperfect conditions."*

**2.12 — Two scoring rules are stated with no rubric, and both are gates.**
(a) The relationship standard (`drills.md` law 3): *"counts as recalled only if you reproduce the
relationship, not the label"* — no worked example, no adjudication rule for a partial relationship.
(b) `benchmarks.md` line 56: *"ignore any change smaller than ~1 SD"* — no SD value is supplied
anywhere, and agent-6 §B3 states the norm tables could not be opened, so the learner cannot obtain
one and cannot compute one from four self-administered timepoints.
**Fix:** (a) print three worked examples in `drills.md` — one clear pass, one clear fail, one
borderline with the adjudication stated. (b) Replace the SD rule with something executable: *"Treat
RAVLT sum changes under **8 points** as noise (≈1 SD in published young-adult samples, **unverified —
open Carstairs 2012 Table 2 and replace this number**). Until you have opened that table, do not act
on any RAVLT movement at all."*

**2.13 — Card authoring has no home in the day.** See fix 3.2 — it belongs here too: the learner is
told cards come from the gap list (`program.md` line 249) but no block, and no minute, is allocated to
writing them.

---

## CRITERION 3 — SUSTAINABILITY (2/10): THE ARITHMETIC, SHOWN

### 3.A The stated day

| Block | Min |
|---|---|
| 1 Delayed-recall check | 7 |
| 2 Speed drill | 10 |
| 3 Error autopsy | 3 |
| 4 Encoding | 25–30 |
| 5 Anki | 20 |
| 6 Log | 2 |
| **Stated subtotal** | **67–72** |
| Optional attention ritual | ≤10 |
| **Advertised range** | **67–82** |

Note first that the advertised **82-minute ceiling is only reachable by counting the mindfulness
ritual**, which `evidence.md` Tier 4 classifies as `[CONTESTED]` and explicitly *"not counted as a
memory intervention."* The real training day is **67–72 minutes**.

### 3.B What `/system/` mandates but does not budget

| Obligation | Where mandated | Cost |
|---|---|---|
| Authoring 15 new cards/day to Wozniak/agent-3 standard (atomic + a discrimination card + a relational card per concept) | `program.md` 240, 249; agent-3 §4.4–4.5 | **15–22 min/day** at 60–90 s/card |
| *"Reserve ~30% of daily time for unscheduled generation"* | `program.md` 251 | **21 min/day** (0.30 × 70) |
| Reading OS Config B, one dense source/week @ 18–25 min per 1000 words (3,000-word source) | `program.md` 178; agent-4 Part 3 | **8–11 min/day** |
| Weekly 15-min `00-Inbox` rewrite pass | agent-3 §3.4 — **omitted from `/system/` entirely** | **2 min/day** |
| D6 evening sweep, "2 min, inside the log" — but the log is budgeted at 2 min total | `drills.md` 269 vs `tracking.md` 8 | **2 min/day** |
| **Hidden subtotal** | | **48–58 min/day** |

### 3.C The true day

**67–72 + 48–58 = 115–130 min/day.**
Against a stated budget of 67–82 and a mission ceiling of 90, that is an overflow of **30–45 minutes
per day, i.e. 28–44% above the brief's maximum**, every day, before any benchmark.

### 3.D Benchmark days are not accounted for at all

Weeks 0, 4, 8 and 12 add: the 72-min battery + material generation and printing the night before
(`README.md` budgets 25 min for this at week 0 and never re-budgets it) + drawing and writing 30
cued-recall items for test 8 from four weeks of material (≥15 min, unbudgeted).
**Benchmark-day total: 72 + 25 + 15 + 67 = 179 minutes.** No file says the daily session is dropped or
reduced on benchmark days. The learner will simply skip — on the four days the whole measurement
architecture depends on.
**Fix:** add to `program.md`: *"On benchmark days the daily block is **cancelled**, not additional.
Prepare materials in the Sunday system slot of the preceding week (budget 25 min there). Draw the
test-8 items in the same slot, from your log, **before** you know your battery score."*

### 3.E The battery itself does not fit in 72 minutes at week 0

`benchmarks.md` test 7 allots **8 minutes for three speed-cards attempts**. `README.md` line 89 states
that *"over 6 minutes on a first deck attempt … is normal"* — for memorisation alone, before
reproduction with the second deck. Three untrained attempts ≈ 3 × (6–8 min memorise + 2–3 min
reproduce) = **24–33 min**. The week-0 battery is therefore ~90–100 minutes, not 72, and the learner
will improvise a truncation at exactly the session whose comparability matters most.
**Fix:** *"Week 0 only: **one** speed-cards attempt, untimed ceiling of 12 min, logged as the baseline.
Three attempts from week 4 onward. Week 0 battery ≈ 78 min."*

### 3.F The weekly tracker is priced at 10 min and costs ~25

`benchmarks.md` line 91 and `program.md` line 74: five Memory League 60-s disciplines, *"~10 min"*.
agent-2 §3.7 gives the ML words format as **60 s memorise / 4 min recall**. Five disciplines at
1 min + up to 4 min recall = **~25 min**.
**Fix:** either restate as *"~25 min, and it replaces Saturday's Blocks 2–4"*, or cut to three
disciplines and price it at 15 min.

### 3.G Volume creep: every axis rises, the budget never does

| Axis | Wk 1–2 | Wk 3–4 | Wk 5–6 | Wk 7–9 | Wk 10–12 |
|---|---|---|---|---|---|
| New cards/day | 10 | 15 | 15 | 15 | 15 |
| Cumulative cards | 140 | 350 | 560 | 875 | 1,190 |
| Conceptual set size | — | 15 @ 24 h | 15 | 30 @ 7 d | 30 @ 7 d |
| Verbatim | — | — | 12 lines | 30 lines | 30 unfamiliar in 15 min |
| Lexicon | 0 | 40 | 80 | ~120 | 150 |
| Domains in play | 1 | 1 | 1 | 2 (1 maint.) | 2 |
| Palace portfolio | 100 loci | + | + | + sweep | + |
| **Block-4 minutes** | **25–30** | **25–30** | **25–30** | **25–30** | **25–30** |

Nothing is ever retired to make room. D0 retires (10 min, week 2) and that is the only decrement in
the entire 12 weeks.
**Fix:** add explicit decrements — *"Week 5: the delayed-recall check drops from 7 to 5 min (score the
top 10 items only). Week 7: the second domain's maintenance reviews are capped at 20 cards/day and
come **out of** the 20-minute Anki block, not in addition. Week 9: verbatim maintenance replaces new
verbatim acquisition for two weeks."*

### 3.H The system demands roughly double the hours its own research allocates

agent-2 prices its own stages: Stage 3 **25–40 h**, Stage 4 **20–30 h**, Stage 5 **40–80 h** — a total
of **85–150 h** for the three stages the program gates on in weeks 3–12. Weeks 3–12 = 70 days. Total
*whole-session* minutes available: 70 × 70 = **82 h**; Block-4 (encoding) minutes available:
70 × 27.5 = **32 h**. The program therefore schedules 85–150 hours of skill acquisition into 32 hours
of encoding time, while that same time must also carry the Reading OS output and the real-material
requirement.
**Fix:** state this honestly in `program.md` §"The 12 weeks": *"agent-2 prices Stages 3–5 at 85–150 h.
This program supplies ~32 h of encoding time in weeks 3–12. **The 12-week gates are therefore set at
roughly a third of the research-implied readiness**, and the Week-8 and Week-12 conceptual and
verbatim gates should be read as 'on track for month 6', not 'complete'."* Alternatively, cut the
week-12 gate set to Stages 0–4 only, which is what agent-2's own 12-week composite specifies
(*"Stage 2, 3 and 4 gates cleared"* — **not** Stage 5 or 6).

### 3.I The Anki minute is the wrong shape, in both directions

`program.md` Block 5 fixes **20 min for ~150 reviews** as a *constant from day one*. Two errors:
(i) at week 12 with ~1,190 cards mostly under 60-day intervals, the actual daily due count is
~40–80, not 150 — so the block is over-budgeted early; (ii) 150 reviews in 20 min is 8 s/card, and
agent-5 §3 gives the anecdote-tier range as **15–25 min** for 100–150 — the system silently took the
optimistic end for the harder end of the range. For image-linked and cloze-ladder cards, 12 s/card is
realistic, i.e. **30 min**, not 20.
**Fix:** *"Block 5 = whatever your due queue actually is, capped at 25 minutes. Expect 40–80
reviews/day in weeks 1–12 and ~150/day only from month 9 onward. If the queue exceeds 25 min three
days running, the circuit-breaker fires (new cards to 0) — that is what it is for."*

---

## CRITERION 4 — BENCHMARK OBJECTIVITY (4/10): REQUIRED FIXES

**4.1 — Test 8 is the mission-critical test and the least objective thing in the document.**
`benchmarks.md` lines 80–87: *"30 cued-recall items drawn at random from material you encoded four
weeks earlier … Test 8 is the only test that measures the thing this project exists for."*
The learner chooses the material, writes the cue, samples the items, and scores the answers, against
a rising target (≥70 → ≥80 → ≥85%). There is no sampling frame, no rule on when the questions are
written, and no scoring rubric. Every one of those degrees of freedom pushes the score up. This is
not a measurement; it is a self-report with a number attached.
**Fix:** *"(a) The sampling frame is the enumerated item list in your log — every item encoded in
Block 4 gets a numbered log line at encoding time. (b) Draw 30 line numbers with a random number
generator, in the Sunday slot **before** the battery. (c) The cue is the one written **at encoding
time**, never composed at test time. (d) Score binary against what you wrote at encoding — no
credit for 'I knew that'. (e) Score from the audio recording, ≥12 h after the battery."*

**4.2 — One interference list and one recognition set are prepared for four sessions.**
`README.md` Block 1 item 2: *"four different 15-word lists, **plus one** 15-word interference list
(list B), **plus a** 30-item recognition list."* `benchmarks.md` lines 18–20 spends a paragraph
establishing that alternate forms are mandatory because same-list retest shows significant practice
effects at one and two months — then supplies one B list and one recognition set to be reused at
weeks 0/4/8/12. The recognition score (hits − false alarms) is therefore **uninterpretable at weeks
4, 8 and 12**, which is exactly the failure the section was written to prevent.
**Fix:** *"Prepare **four** A-lists, **four** B-lists and **four** recognition sets — one complete
matched triad per session."*

**4.3 — Two incompatible scoring systems for the same test, in the same file.**
`benchmarks.md` test 4 specifies competition scoring: *"20 points per fully correct row in order; any
error in a completed row scores zero for that row."* The targets table two pages later measures the
same test as *"5-min numbers (raw digits at ≥95%)"* with targets of 50 / 75 / 100. Under row scoring
there is no such quantity as "raw digits at ≥95%": 100 digits with one error in each of five rows
scores 0, and 80 digits perfect scores 80. `drills.md` line 84 uses a third phrasing (*"100 @ ≥95%
immediate, ≥85% at 24 h"*).
**Fix:** pick one. Recommended: *"Primary score = competition points (row rule). Secondary score =
digits in longest correct prefix. The target row reads: Wk12 = **≥100 competition points** (five
perfect rows). Delete '≥95%' everywhere — it is not expressible under row scoring."* Harmonise
`drills.md` line 84 to match.

**4.4 — Percentage-of-baseline targets reward sandbagging.**
`benchmarks.md` line 107: names & faces at *"+50% / +100% / +150% over wk 0."* The week-0 score is
self-administered, unwitnessed, and taken before the learner has any incentive to score well — and a
low week-0 makes every subsequent target trivially easier. A +150% improvement on a baseline of 2 is
5 names; on a baseline of 8 it is 20, which is near-competitive. The same target denotes two
completely different achievements. Additionally, if week-0 is 0, the target is undefined.
**Fix:** *"Absolute targets: Wk 4 ≥ wk0 + 3 names; Wk 8 ≥ wk0 + 6; Wk 12 ≥ wk0 + 9, floor of 10 names
in 60 s at week 12 regardless of baseline. `[INVENTED — no sourced trajectory exists for ML names]`"*

**4.5 — Digit span reports two scores and never says which is the score.**
`benchmarks.md` test 1: *"Score = longest length with ≥1 correct trial, plus total correct trials."*
Two quantities, no headline, no rule for the common case where they move in opposite directions.
**Fix:** *"Headline = total correct trials (it is the more reliable index). Longest length is
recorded but never compared across timepoints."*

**4.6 — The strategy-off column is acknowledged as unenforceable and then given a whole protocol.**
`benchmarks.md` lines 28–34 correctly relays agent-6 §B1.5's honesty note, then runs every span test
twice — roughly doubling the digit-span and Corsi time cost — for a measure the file itself says
should be *"interpreted conservatively"* and which the targets table marks *"not a target"*.
**Fix:** run strategy-off **at week 0 and week 12 only**. That recovers ~6 min from every intermediate
battery and loses nothing the file claims to value.

**4.7 — Test 5's stated delay does not match the running order.**
`benchmarks.md` test 5: *"~25 min after T6."* T6 ends at minute 24; test 5 starts at minute 45. That
is 21 minutes.
**Fix:** state *"21 min after T6 — hold this at exactly 21 min forever; the RAVLT delay interval is a
controlled variable, not an approximation."*

**4.8 — Second deck is optional in one file and mandatory in another.**
`README.md` Block 1 item 3: *"a deck of cards (two decks is better)."* `benchmarks.md` test 7:
*"reproduce with a second deck."*
**Fix:** *"Two identical decks. Required, not preferred."*

**4.9 — agent-6's ROCF recommendation was dropped without disclosure.**
agent-6 §B3 recommends the Rey–Osterrieth figure *"once at week 0 only"* as a visual-memory anchor.
It appears in no `/system/` file, and `evidence.md` §3 does not record the decision.
**Fix:** either add it as an optional week-0-only test, or record the omission in `evidence.md` §3
with the reason ("no norms openable, no repeatable form, low value at n=1").

**What is genuinely good here:** week 0 is enforced unambiguously in three files; fresh random
material, fixed conditions, audio-recorded delayed scoring, the stress-abort rule and the alternate
A-forms requirement are all correctly specified and correctly sourced; the refusal to quote unopened
norm tables is exactly right and is stated plainly rather than buried; and test 8's *existence*, with
the explicit warning that flat test 8 + rising tests 1–7 means the program is failing, is the single
best design decision in the whole system.

---

## CRITERION 5 — INTERNAL CONSISTENCY (4/10): REQUIRED FIXES

**5.1 — Speed-cards <5 min is a Week-4 target and a Week-6 gate.**
`benchmarks.md` line 105 sets `<5 min` as the **Week 4** target. `program.md` line 199 sets *"full deck
100% accurate under 5 min"* as the **Weeks 5–6** gate. Both cannot be true.
**Fix:** move the benchmark row to Wk4 `<6 min`, Wk8 `<4 min`, matching the program's gate ladder.

**5.2 — D6 is scheduled in `program.md` and declared unschedulable in `drills.md`.**
`program.md` Block 4: *"Concepts 45% / verbatim 30% / **detail 25%**"* — i.e. 6–8 min/day of Block 4.
`drills.md` D6 heading: *"25% — **always-on, not a scheduled block**."*
**Fix:** decide. Recommended: keep D6 always-on and change Block 4's split to *"Concepts 60% /
verbatim 40% of Block 4; detail capture (D6) is opportunistic and is logged, not scheduled."*
Then correct `README.md` line 29–30, which presents 45/30/25 as the *material* profile and is being
silently reused as a *time* allocation.

**5.3 — The evening sweep is inside a log that has no room for it and no field for it.**
`drills.md` D6: *"Evening sweep (2 min, inside the log): name three details from the day."*
`tracking.md` budgets the entire log at *"under 2 minutes"* and its daily block contains no such
field.
**Fix:** add `7. EVENING SWEEP — three details deliberately encoded today: ___ / ___ / ___` to the
tracking block and change the log budget to *"under 4 minutes."*

**5.4 — Three different new-card numbers.**
`README.md` line 104: *"Set new cards to 10/day, rising to 15 in week 3."*
`program.md` line 167: *"10 new cards/day maximum"* (weeks 1–2); line 182: *"15 new cards/day"* (weeks
3–4 — note this is week **3**, consistent); line 240: *"cap new cards at 15/day."*
agent-3 §3.1, which `README.md` line 97 orders the learner to copy: **10→20 / 20 / 30 per preset.**
**Fix:** see 2.1. One number, stated as a total, with per-preset values that sum to it.

**5.5 — Two world-record dates.** `drills.md` 87 = 2018; `benchmarks.md` 136 = 2017. See 1.10.

**5.6 — "USAMC format" is applied to a test that is not the USAMC format.**
`program.md` line 217 and `drills.md` line 241 specify *"15 min to memorise, recall **at 24 h**"* and
call it USAMC format. agent-2 §6.5: the USAMC poetry event is *"15 min to memorise, **20 min to
recall**"* — same session.
**Fix:** *"USAMC **material and scoring** (unpublished passage, per-line all-or-nothing), with a
24-hour delay substituted for the competition's 20-minute recall window. This is deliberately harder
than USAMC and is not comparable to competition scores."*

**5.7 — The week-12 verbatim gate contradicts the cost model printed 11 lines above it.**
`drills.md` line 229–231: *"~15–25 min per 100 words to first perfect recitation untrained, falling
to **8–12 min trained**."* `drills.md` line 241: *"Week 12 | 30-line unfamiliar passage, **15 min** to
memorise."* Thirty lines ≈ 240–300 words. At the trained rate that is **19–36 minutes**. The system's
own model says its own week-12 gate is unreachable, by roughly a factor of two, at the *upper* end of
trained fluency — which a week-12 learner does not have.
**Fix:** either move this to Month 6–9 (which is also what agent-2 says — see 1.5), or restate the
week-12 gate as *"a 12-line unfamiliar passage in 15 min, ≥60% of lines perfect at 24 h"*, which the
cost model actually supports.

**5.8 — Saturday is described three ways.**
`drills.md` D2 rotation: *"Sat | Weekly benchmark"* — i.e. inside the 10-min D2 block.
`program.md` weekly shape: Sat speed drill *"—"*, encoding *"Light"*, other *"**Weekly tracker**: 5
Memory League 60-s disciplines, ~10 min."*
`benchmarks.md` line 89: *"Weekly light tracker (**not part of** the 4-weekly battery)."*
Three names (benchmark / tracker / light tracker) and two placements (inside D2 / in addition to).
**Fix:** one name — "Saturday tracker" — one placement: *"replaces Blocks 2–4 on Saturday"* — one
duration (see 3.F).

**5.9 — The habit rule and the divided-attention rule contradict each other.**
`README.md` line 118: *"Pick the time and the physical place for your daily block, and do not move
either for 66 days."* `program.md` line 61–63: *"Blocks 2 and 5 tolerate imperfect conditions —
**deliberately put them there**."* One says the daily block is a single fixed time and place; the
other says to scatter a third of it elsewhere.
**Fix:** `README.md` should read: *"Fix one time and one place for **Block 4** (the encoding block)
and do not move it for 66 days. Blocks 2 and 5 are deliberately mobile — put them in the commute, the
queue, the noisy kitchen."*

**5.10 — Month-12 digits target requires a system the same file forbids.** See 1.4.

**5.11 — `program.md` line 251 mandates ~30% of daily time for unscheduled generation, and the daily
schedule has no such block and no spare minute.** The six blocks account for 100% of 67–72 min and
none of them is generation (Block 4 is encoding, Block 5 is cued review — agent-3 §4.6 explicitly
distinguishes generation from both).
**Fix:** either add it to the schedule (and accept a ~90-min day, which the brief permits — but then
delete the optional ritual and cut Block 1 to 5 min), or downgrade it to *"one 15-min generation
session per week, in the Sunday slot"* and say so in the schedule table.

**5.12 — D0's lifespan differs between files.** `drills.md` heading: *"(Week 1 only, then retired)"*.
`program.md` Weeks 1–2: *"D0 image fluency **until the gate clears** … then retire it"*, with
`drills.md` itself noting *"Typical: 3–6 sessions."*
**Fix:** *"Weeks 1–2, retired on gate clearance (typically 3–6 sessions)."*

**5.13 — `evidence.md` C3 says 150 reviews/day is *"an outcome to monitor, not a lever to pull"*;
`program.md` Block 5 hard-codes it as a daily budget line.** See 3.I.

**5.14 — The D1 gate in `drills.md` and the weeks-1–2 gate in `program.md` are different gates.**
`drills.md` D1: *"20-locus palace forwards and backwards without error, plus correct answer to 'what
is locus 13?' **in under 2 s**."*
`program.md`: *"20/20 concrete words, 2-min encode, 100% at 24 h; palace recited backwards without
error; portfolio index populated."*
The 2-second random-access requirement exists in one file only, and the 2-second threshold appears
nowhere in agent-2 (which specifies the *drill* — "walk from locus 13" — but no timing).
**Fix:** merge into one gate statement, present identically in both files, and either drop the
2-second threshold or mark it `[INVENTED]`.

**5.15 — agent-2's Stage 2 gate (40/40 words, 4-min encode, ≥90% at 24 h) was dropped silently** while
its deliverables (100 loci, index, hot/cold split, cooldown measurement) were kept.
**Fix:** reinstate it as the weeks-1–2 exit gate or record the omission in `evidence.md` §3.

**5.16 — agent-2's Stage 3 gate was split and half of it moved eight weeks.** agent-2 Stage 3 gate is
*"all 100 images bidirectional in ≤200 s **and** 100 digits in 5 min at ≥95% immediate, ≥85% at
24 h."* `program.md`'s week-4 gate keeps the first clause and relocates the second to week 12, while
still describing weeks 3–4 as completing the number system.
**Fix:** state the split explicitly: *"Week 4 clears the **image half** of agent-2's Stage 3 gate. The
throughput half (100 digits/5 min) is a week-12 target. Stage 3 is therefore **not complete** at week
4, contrary to the section heading."*

**5.17 — The ghosting experiment has no scoring rule and no decision rule**, yet `program.md` line 165
says *"that number … sizes your whole portfolio."* `drills.md` gives the procedure (1/3/5 days,
overwrite, measure) but never defines "ghosting rate", never states the threshold that selects 1 vs 3
vs 5 days, and never states how the resulting constant converts into a portfolio size.
**Fix:** *"Ghosting rate = intrusions from the previous occupant ÷ 20 loci. Your cooldown is the
shortest interval at which that rate is ≤5% (1 intrusion in 20). Portfolio size = loci used per
session × cooldown days × 1.5."*

---

## MOST DANGEROUS SINGLE FLAW

**The day does not close, and the overflow is invisible because it is distributed across four
different files.**

`program.md` presents a tidy six-row table summing to 67–82 minutes and the learner reasonably
believes that is the commitment. But `program.md` line 240 also requires 15 new Anki cards a day —
cards the learner must **write**, to agent-3's atomicity, discrimination and relational-pairing
standards, at 60–90 seconds each: 15–22 minutes that appear in no block. `program.md` line 251
separately reserves *"~30% of daily time"* — another 21 minutes — for unscheduled generation that also
appears in no block. `program.md` line 178 adds a weekly Reading OS pass whose own cited cost model
(agent-4: 18–25 min per 1,000 words) puts it at 8–11 minutes a day, in no block. **The true cost is
115–130 minutes a day against an advertised 67–82 and a mission ceiling of 90.**

This is the most dangerous flaw for three compounding reasons.

First, it is **invisible until week 3**, when new cards step to 15/day and the authoring load arrives
in full. The learner will not read it as "the plan was 40% over budget"; they will read it as "I am
falling behind," which is precisely the misattribution the program's own adherence section is built
to prevent.

Second, the overflow lands **on the two blocks the evidence says matter most**. Under time pressure a
learner protects the things with visible counters — the Anki queue and the speed-drill timer — and
sacrifices the encoding block, which has no counter and no external pressure. That inverts the single
largest effect in the entire corpus: divided or truncated attention *at encoding* costs 22–46% of
recall, while the review block the learner is protecting is the one that tolerates degradation at a
cost of 1–13%. The system will be optimised, day by day, in exactly the wrong direction, by a learner
who is following it faithfully.

Third, it detonates against **the review-debt spiral**, which `/system/` names as one of five
documented quit causes. Encoding is what stops, but card *intake* is what keeps running, because 15
new cards/day is a setting rather than a discipline. Cards accumulate, reviews compound, the encoding
that justified the cards stops happening, and the learner arrives at month 3 with an 800-card queue
attached to material they no longer remember encoding. The circuit-breaker (`backlog > 2× cap → new
cards to 0`) fires only on backlog, so it will not trigger until the damage is already done.

The fix is not more discipline. It is arithmetic honesty: publish the true 115–130 min figure, then
cut to fit — drop new cards to 8/day, move generation to a single weekly Sunday session, size the
Reading OS source at 2,000 words, cancel the daily block on benchmark days, and state that the
resulting program clears agent-2's Stages 0–4 in 12 weeks and *not* Stages 5–6, which is exactly what
agent-2's own 12-week composite target says.

---

## WHAT IS ACTUALLY GOOD

Four things, and no padding.

1. **Zero orphan citations.** Every proper-noun source in `/system/` was machine-checked against
   `/research/` and all 50+ resolve. Under an abstract-only research constraint, that is the failure
   mode most likely to occur and it did not occur.
2. **The refusal to invent norms is real where it counts.** `benchmarks.md` §1 states that the
   normative tables could not be opened, refuses to quote them, converts the battery to
   self-referenced scoring, and lists the exact tables to open later. It would have been trivially
   easy to print plausible WAIS-IV or RAVLT norms and nobody would have checked.
3. **Test 8, and the warning attached to it.** Building the battery around a real-material probe and
   stating in advance that flat-test-8-with-rising-tests-1–7 means the program is failing is a genuine
   falsifier aimed at the system's own most likely failure mode. The implementation is weak (fix 4.1)
   but the design instinct is correct.
4. **The conflict register in `evidence.md` §3.** C1 (dose: 30 min evidence vs 60–90 min brief),
   C2 (sleep vs the 4-hour exercise window) and C4 (contradictory IMM standards, left unresolved and
   flagged rather than papered over) are handled the way a synthesis should handle disagreement
   between its own sources. C4 in particular — declining to pick a winner and marking it
   `[CONTESTED]` — is the right call.

Note what is *not* on this list: the daily schedule, the target tables, the gate ladder, and the
day-one setup instructions. Those are where the work is.
