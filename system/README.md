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

Every instruction in this system attaches to a stage of that pipeline. The effort moves off
re-reading and onto **encoding at the moment of first contact** — 30–120 seconds of deliberate work
per dense chunk, falling as fluency builds — plus a review load whose per-item cost trends toward
zero as intervals stretch. Trained, that reads as "I looked at it and I have it," because the work
is compressed into the look.

The strongest evidence that this works on ordinary adults: **Dresler et al. 2017** — 51
memory-naïve adults, ≤30 min/day for six weeks, went from recalling ~26 of 72 words to ~62, **and
still had it four months later with no further practice.** The active control that drilled for the
same duration gained a third as much. Strategy is the active ingredient, not hours.

## Your profile, as built

- **Primary material:** dense technical concepts (45%), verbatim passages (30%), general detail
  capture — names, numbers, dates, situational detail (25%).
- **Domains:** software/math, law, medicine, finance — all four. The core system is therefore
  **domain-general**; what is domain-specific is the **symbol lexicon**, which you build from a
  fixed procedure. Symbols are namespaced `domain::term` and palace estates are domain-segregated,
  because *capital*, *security*, *resolution* and *stress* mean four different things across your
  four fields and will collide otherwise.
- **Verbatim, two kinds, two different techniques** — technical/legal text (precision-dominant,
  loci-per-clause) and prose/speeches (prosody-dominant, actor-method). Do not merge them.
- **Time:** 67–82 min/day. A protected 30-minute strategy core plus applied volume on real sources.

## What is promised, and what is not

**Promised:** near-perfect on-demand recall of material you deliberately encode; word-perfect
reproduction of passages you choose; large measurable gains on scored memory tasks.

**Not promised:** higher general intelligence, larger working memory, or improvement on material you
did not deliberately encode. World-record face–name memorisers were found to be **as impaired as
controls** on face inversion and the other-race effect, with no hippocampal enlargement. The gains
are strategy-specific and material-specific. This is stated up front because expectation failure is
one of the five documented reasons people quit.

## The files

| File | What it's for |
|---|---|
| `program.md` | The 12-week progression, daily schedule, weekly shape, recovery rules, Anki integration |
| `drills.md` | Every drill with protocol, scoring rule and numeric gate |
| `benchmarks.md` | The 8-test battery for weeks 0/4/8/12, with targets |
| `tracking.md` | The daily log — under 2 minutes |
| `evidence.md` | Bibliography, confidence labels, lane conflicts and how they were resolved, what's rejected |

Full research behind all of it: `/research/agent-1..6-*.md`.

---

# WHAT TO DO TODAY

Today is **Day 0**. You do not train today. You measure and you set up — in that order, because the
benchmark must happen before any technique touches your brain, or you will never know what changed.

## Block 1 — Prepare the materials (25 min)

Do this first; the benchmark needs them and you must not see them in advance.

1. Generate **25 rows of 20 random digits** (500 digits). Print it. Do not look at it.
2. Write **four different 15-word lists** of common concrete nouns, plus one 15-word interference
   list (list B), plus a 30-item recognition list (15 from list A + 15 distractors, half from B).
   You will use one A-list per benchmark — **the same list four times makes the data worthless**,
   because same-list retest shows large practice effects while alternate forms abolish them.
3. Get a **deck of cards** (two decks is better — one to memorise, one to reproduce).
4. Get a **timer** and a way to **record audio**.
5. Find or generate a **face–name set** (20 faces with first names) you have never seen.

## Block 2 — Run the week-0 benchmark (~72 min)

Follow `benchmarks.md` exactly, in the stated order. Log conditions first (sleep, caffeine, stress).
Record audio; score afterwards from the recording, not live.

You will score badly. That is the point — these are your denominators. Untrained reference points:
~26/72 on a Dresler-format word list, 20–30 digits in 5 minutes, over 6 minutes on a first deck
attempt (which is normal). Everything after this is measured against **your** numbers, not against
population norms, because the norm tables could not be opened in this session (see `evidence.md §1`).

## Block 3 — Set up the system (30 min)

1. **Install Anki.** Confirm FSRS is enabled (global toggle, top of Deck Options). Do not install
   any FSRS add-on — that era is over.
2. **Create three presets** with the settings in `research/agent-3 §3`:
   - `Core-0.93` — verbatim, formulas, statute text, anything that must never fail
   - `Bulk-0.90` — concepts and general facts; this is where the volume lives
   - `Intake-0.85` — fast capture during reading
   Do **not** run everything at 0.95+: it costs ~2.17× the reviews of 0.90 and turns a 60-minute day
   into a 130-minute day, and the system then fails by abandonment, which is 0% retention.
3. **Create two decks:** `00-Inbox` (Intake-0.85) and `99-Palaces` (Core-0.93).
4. **Set new cards to 10/day**, rising to 15 in week 3. Leave the review limit uncapped — you
   control intake, not reviews.
5. **Create two files:**
   - `symbol-lexicon.tsv` → columns `domain`, `term`, `image`, `date_added`
   - `palace-index.tsv` → columns `palace`, `location`, `rooms`, `loci`, `occupant`, `written`, `free`
6. **Pick your primary domain** for the next 12 weeks — one of your four. The other three are
   maintenance only. Write it at the top of your log. This is the highest-leverage adherence
   decision in the whole program: four domains taking in new material simultaneously fragments
   review load and is the documented route to the review-debt spiral.
7. **Scout five buildings** you know cold — childhood home, current flat, an office, a gym, a
   relative's house. Write them in `palace-index.tsv`. Do not build them yet.

## Block 4 — Fix the two constants (5 min)

1. **Pick the time and the physical place for your daily block, and do not move either for 66 days.**
   Median time to habit automaticity is 66 days (range 18–254). Put your encoding block in your last
   2–3 waking hours — you want to sleep on it.
2. **Set your caffeine cut-off at 8 hours before bed** and fix a daily dose. 400 mg six hours before
   bed cut objectively measured sleep by more than an hour, and the people it happened to did not
   notice.

## Tomorrow — Day 1

Open `drills.md` and run **D0 (image fluency)**: 50 random concrete nouns, one vivid image each,
every image containing a creature or person *doing something*. Timed. Gate is 50/50 in ≤150 seconds.

The failure that kills everything downstream is imagining the *word* rather than a *scene*. If you
catch yourself picturing letters floating in space, that rep did not count.

---

## The four rules that decide whether this works

1. **Protect encoding, not review.** Divided attention at encoding costs 22–46% of recall; at
   retrieval, 1–13%. Single-task your encoding block to a degree that feels excessive; put your
   Anki reviews in imperfect conditions deliberately.
2. **Score at 24 hours, never immediately.** Training gains show up specifically in *durable*
   memories, and immediate recall cannot distinguish them. Massed practice feels better and retains
   worse — trust the delayed score, never the feeling.
3. **≥50% of encoding volume on real target material.** Synthetic drills alone produce someone who
   is good at memory sport and no better at their actual work. That disappointment is predictively
   correct, and it is a documented quit cause.
4. **System freeze Monday–Saturday.** Changes to systems, palaces, templates or tooling happen only
   in the Sunday slot, and any change must survive a two-week logged trial before another. Endless
   retooling in place of reps is how people spend a year and gain nothing.
