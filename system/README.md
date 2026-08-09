# Engineered High-Fidelity Memory — System Overview

## What this is

A 12-week training program that produces the *output* you asked for: see dense material once,
understand it, and still have it accurately months later — including word-perfect where you choose.

There is no verified case of passive photographic memory in an adult. That is not a ceiling on your
goal; it is a statement about the **mechanism**. The output is produced by a pipeline, not a faculty:

```
SELECT → ENCODE (deep + imagistic) → STORE (structured loci / schema)
       → SCHEDULE (spaced retrieval) → CONSOLIDATE (sleep) → RETRIEVE UNDER LOAD
```

The effort moves off re-reading and onto **encoding at the moment of first contact** — 30–120 seconds
of deliberate work per dense chunk, falling as fluency builds — plus a review load whose per-item
cost trends toward zero as intervals stretch. Trained, that reads as "I looked at it and I have it,"
because the work is compressed into the look.

Best evidence that this works on ordinary adults: **Dresler et al. 2017** — 51 memory-naïve adults,
≤30 min/day for six weeks, ~26 → ~62 of 72 words. At four months with no further practice the group
retained about **60% of that gain (+22.7 ± 18.8 words, n = 16)**, with very large individual
variation. The active control that drilled the same duration gained a third as much — strategy is the
active ingredient, not hours.

Two honest qualifications, added after the round-1 evidence audit: this is a single small
**quasi-experimental** study (pseudo-randomised, n = 17/16/17), **never independently replicated**;
and the widely-cited follow-up (Wagner et al. 2021) analyses **the same cohort**, so it is not
corroboration. The technique's pooled effect across 13 trials is smaller (g = 0.65 to d = 0.88) and
carries very strong evidence of publication bias.

## What is promised

**80–90% cued recall at 7+ days on material you deliberately encode**, plus word-perfect reproduction
of specific passages you choose and maintain. Those are the numbers the evidence supports: Dresler's
best is 62/72 (86%); successive relearning gives 83% at 30 days; this program's week-12 gates are
55/72 (76%) and ≥85% at 7 days.

**Not promised:** higher general intelligence, larger working memory, or improvement on material you
did not deliberately encode. World-record face–name memorisers were **as impaired as controls** on
face inversion and the other-race effect, with no hippocampal enlargement. Gains are strategy- and
material-specific. Stated up front because expectation failure is a documented quit cause.

## Your profile, as built

- **Material:** dense technical concepts, verbatim passages, general detail capture.
- **Domains:** software/math, law, medicine, finance. The core system is therefore **domain-general**;
  what is domain-specific is the **symbol lexicon**, namespaced `domain::term`, with palace estates
  segregated by domain — *capital*, *security*, *resolution* and *stress* mean four different things
  across your fields and will collide otherwise.
- **Verbatim, two kinds, two techniques** — technical/legal (precision-dominant, loci-per-clause) and
  prose/speeches (prosody-dominant, actor-method). Never merged.
- **Time:** 76 min/day weekdays, ~50 Sat, ~88 Sun. A 38-minute protected core inside that.

## Honest scope

agent-2 prices its Stages 3–5 at **85–150 hours**; weeks 3–12 here supply about **32 hours** of
encoding time. **This program completes Stages 0–4 in 12 weeks and does not complete Stages 5–6.**
Conceptual mastery is a month 4–6 outcome; the full verbatim standard is month 6–9. Week-8 and
week-12 conceptual and verbatim numbers are **probes**, not gates. See `program.md` §2.

## The files

| File | For |
|---|---|
| `program.md` | 12-week progression, daily schedule, recovery rules, **full Anki settings** |
| `drills.md` | Every drill with protocol, scoring rule, gate — **plus the Major/cards/pegs appendix** |
| `benchmarks.md` | The 8-test battery, weeks 0/4/8/12 |
| `tracking.md` | The daily log |
| `evidence.md` | Bibliography, confidence labels, lane conflicts and resolutions, what's rejected |

---

# WHAT TO DO TODAY

Today is **Day 0**. You do not train. You measure, then set up — in that order.

## Block 1 — Generate the materials (30 min)

Do this first; the benchmark needs them and you must not see them in advance. **You must not choose
any of this material yourself** — self-selection destroys the benchmark.

**One-time setup: get a concrete-noun pool.** Download the Brysbaert, Warriner & Kuperman (2014)
concreteness ratings (~40k English words, freely available), keep rows with concreteness ≥ 4.5 and
part-of-speech Noun, and save one word per line as `nouns.txt`.

```bash
# 25 rows x 20 random digits, for the 5-minute numbers test (one file per session)
python3 -c "
import random
print('\n'.join(''.join(str(random.randrange(10)) for _ in range(20)) for _ in range(25)))
" > wk0_digits.txt

# RAVLT triads: 4 sessions x (A-list 15, B-list 15, 15 unrelated distractors) — all disjoint
python3 -c "
import random
w=[l.strip() for l in open('nouns.txt') if l.strip()]
s=random.sample(w,180)
for i in range(4):
    b=i*45
    print(f'--- SESSION {i} A ---'); print('\n'.join(s[b:b+15]))
    print(f'--- SESSION {i} B ---'); print('\n'.join(s[b+15:b+30]))
    print(f'--- SESSION {i} DISTRACTORS ---'); print('\n'.join(s[b+30:b+45]))
" > ravlt_all_sessions.txt

# 50 random concrete nouns for the D0 drill (regenerate every session)
python3 -c "
import random
print('\n'.join(random.sample([l.strip() for l in open('nouns.txt') if l.strip()],50)))
" > d0_nouns.txt

# 72-word Dresler-format list (regenerate every benchmark)
python3 -c "
import random
print('\n'.join(random.sample([l.strip() for l in open('nouns.txt') if l.strip()],72)))
" > wk0_words72.txt
```

**Face–name sets — you need eight, not one.** Two runs × four sessions: **4 sets of 15 faces** (60-s
run) and **4 sets of 30 faces** (5-min run) = 180 faces, **never reused across sessions**. Source
faces from any generated-face service (StyleGAN-style "this person does not exist" generators produce
unlimited unseen faces) or any face dataset you have not looked through. Pair them with first names
drawn at random from a public census first-name list:

```bash
python3 -c "
import random
n=[l.strip() for l in open('firstnames.txt') if l.strip()]
print('\n'.join(random.sample(n,180)))
" > facenames_180.txt
```

**Cards: two identical decks. Required, not preferred** — one to memorise, one to reproduce.

Also: a timer, and a way to record audio.

## Block 2 — Run the week-0 benchmark (~80 min)

Follow `benchmarks.md` exactly, in order. Log conditions first. Record audio; score afterwards from
the recording, not live.

You will score badly. That is the point — these are your denominators. Untrained reference points:
~26/72 on the word list, 20–30 digits in 5 minutes, over 6 minutes on a first deck attempt (normal),
and quite possibly **no perfect card reproduction at all** inside the 15-minute box. Log that
honestly; it is a real baseline, not a failure.

## Block 3 — Set up Anki (25 min)

Full settings table is in **`program.md` §7** — do not go hunting in `/research/`.

1. **Install Anki.** Confirm FSRS is on (global toggle, top of Deck Options). Install no FSRS add-on.
2. **Create three presets** — `Core-0.93`, `Bulk-0.90`, `Intake-0.85` — copying `program.md` §7
   exactly.
3. **Critical:** Anki enforces new-card limits **per preset**. The program's cap is **8/day total**,
   set as **Core 3 · Bulk 5 · Intake 0**. Setting each preset to its own "sensible" number is how you
   end up at 60/day and a 1,000-card backlog by month three.
4. **Create this deck tree** (maximum three levels):
   ```
   00-Inbox              → Intake-0.85    (hand-filled while reading; drained Sundays)
   01-<primary domain>   → Bulk-0.90
     01a-Concepts        → Bulk-0.90
     01b-Verbatim        → Core-0.93
   99-Palaces            → Core-0.93      (max interval 180)
   ```
   Concept cards → `01a`. Verbatim clozes → `01b`. Anything captured mid-reading → `00-Inbox`,
   rewritten in the Sunday slot.
5. **Weeks 1–2 only:** set new cards to **5/day total** (Core 2 · Bulk 3). Step to 8 in week 3.

## Block 4 — Set up the system files (15 min)

- `symbol-lexicon.tsv` → `domain`, `term`, `image`, `date_added`
- `palace-index.tsv` → `palace`, `location`, `rooms`, `loci`, `occupant`, `written`, `free`
- **Pick your primary domain** for 12 weeks — one of your four. The others are maintenance only.
  Write it at the top of your log. This is the highest-leverage adherence decision in the program:
  four domains taking in new material at once fragments review load and is the documented route to
  the review-debt spiral.
- **Scout five buildings** you know cold — childhood home, current flat, an office, a gym, a
  relative's house. Enter them in `palace-index.tsv`. Do not build them yet.

## Block 5 — Fix the two constants (5 min)

1. **Pick one time and one physical place for Block 4** (the encoding block) and do not move either
   for 66 days. Median time to habit automaticity is 66 days (range 18–254). Put it in your last 2–3
   waking hours — you want to sleep on it. **Blocks 2 and 6 are deliberately mobile** — the commute,
   the queue, the noisy kitchen. Only Block 4 is fixed.
2. **Caffeine cut-off 8 hours before bed**, fixed daily dose. 400 mg six hours before bed cut
   objectively measured sleep by over an hour, and the people it happened to did not notice.

## Tomorrow — Day 1

Open `drills.md` and run **D0 (image fluency)**: 50 random concrete nouns from `d0_nouns.txt`, one
vivid image each, preferably a creature or person *doing something*. Timed. Gate: 50/50 in ≤150 s.

**Day 1 has no Block 1** — there is no "yesterday's set" yet. Your first delayed-recall check is
Day 2, scoring what you encoded on Day 1.

The failure that kills everything downstream is imagining the *word* rather than a *scene*. Letters
floating in space is not a rep.

---

## The four rules that decide whether this works

1. **Protect encoding — and protect review too.** Divided attention costs much more at encoding than
   at retrieval, so single-task Block 4 to a degree that feels excessive. But **do not degrade your
   reviews on purpose** — the first version of this file said to, and that was wrong. Blocks 2 and 6
   run under full attention by default; degraded conditions are a fallback against skipping, never a
   plan, and **never with verbal load** (no podcasts, conversation, or reading anything else while
   you review). All your material is verbal, and verbal concurrent load is precisely what damages
   verbal retrieval. See `evidence.md` §3b-R1.
2. **Score at 24 hours, never immediately.** Gains show up specifically in *durable* memories.
   Massed practice feels better and retains worse — trust the delayed score, never the feeling.
3. **≥50% of Block-4 minutes on real target material.** Synthetic drills alone produce someone good
   at memory sport and no better at their work. That disappointment is predictively correct, and it
   is a documented quit cause.
4. **System freeze Monday–Saturday.** Changes to systems, palaces, templates or tooling happen only
   in the Sunday slot, and each must survive a two-week logged trial before another. Endless
   retooling in place of reps is how people spend a year and gain nothing.

---

*A note on confidence: every effect size in this system comes from search-surfaced abstracts, because
this environment's egress policy blocked all full-text access. Directions and rank-ordering are safe;
decimal places are not. The Anki configuration is the exception — it rests on the manual source and
FSRS repository, which were read directly. See `evidence.md` §1.*
