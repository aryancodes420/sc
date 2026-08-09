# tracking.md — The Daily Log

The log is **mandatory**. Deliberate practice requires immediate objective feedback; a solo learner
with no scored log has none. Foer kept a spreadsheet and reviewed it with a coach — with no coach,
the log plus the written error autopsies *are* the feedback channel. [research/agent-5 §7, §2]

It is also deliberately small: **under 4 minutes**, and Block 7 budgets 3 of them. A log you skip is
worth nothing.

---

## Daily entry (copy this block)

```
DATE:                          DAY #:            PRIMARY DOMAIN:
--------------------------------------------------
SLEEP h:          CAFFEINE mg / last time:
STRESS /10:       MISSED YESTERDAY? y/n

1. DELAYED RECALL (yesterday's set, top 10)   __ / 10  = ___%
2. SPEED DRILL  [d1-timed|digits|cards|names]  score: ____  best: ____  timer: ____
3. ERROR AUTOPSY entries: ___   (0 = you were not at the edge)
4. BLOCK 4       total min: ____   of which on REAL target material: ____ min
     mode: [concepts | verbatim | reading-OS]      source:
5. CARDS authored: ____ (cap 8)
6. ANKI  reviews: ____   new: ____   backlog: ____   minutes: ____ (cap 25)
7. EVENING SWEEP — three details deliberately encoded today:
     ___________________ / ___________________ / ___________________
8. LEXICON added: ____   running total: ____

ENCODED ITEMS (numbered — this is the test-8 sampling frame):
   [next#] ____  cue written NOW: _______________________  answer: _______________
   [next#] ____  cue written NOW: _______________________  answer: _______________
   ...

7-DAY ROLLING ADHERENCE: __ / 7
--------------------------------------------------
```

**The numbered item list is not optional bookkeeping.** It is the sampling frame for benchmark test 8,
and the cue must be written *at encoding time*. A cue composed at test time is a cue you wrote knowing
the answer, which is why test 8 would otherwise be a self-report with a number attached.

## Weekly entry (Saturday, after the tracker)

```
WEEK #:
SATURDAY TRACKER (ML 60s): names ___  words ___  images ___  numbers ___  cards ___
Block-4 minutes on real material ___ / total Block-4 minutes ___  = ___%   (rule: ≥50%)
Gate/probe for this week:                              cleared? y/n
System changes made (Sunday slot only):
Two-week trial in progress on:
```

**Definition, used identically in four files: encoding volume = minutes logged on line 4.** Not
reading minutes, not Anki minutes, not card-authoring minutes.

---

## The five numbers that actually matter

1. **Line 1, delayed recall %** — the daily durability metric. Gains show up in *durable* memories;
   immediate recall cannot see them. [agent-2 §1.3]
2. **Line 3, autopsy entries** — a week of zeros means you practised at comfortable pace. That is
   automaticity without difficulty: the OK plateau. [agent-5 §7.1]
3. **Line 4, % on real material** — must be ≥50% weekly. The single countermeasure to transfer
   disappointment, and checkable only here. [agent-5 §7.4]
4. **Line 6, backlog** — the circuit-breaker input. Over 2× the daily cap → new cards to 0 until
   clear, drained in capped chunks. [agent-5 §7.2]
5. **7-day rolling adherence** — **not streaks**. Lally et al. 2010: median 66 days to automaticity,
   range 18–254, and missing a single opportunity did not materially affect habit formation. One
   missed day is a non-event; two consecutive misses drop you to the 15-minute floor session (5 min
   delayed recall + 10 min review-only Anki, new cards 0, **stop at 15 minutes**), never to zero.

## What NOT to track

- **Streaks.** They convert one bad day into a quit event. The evidence says a single miss doesn't
  matter; a streak counter says it does.
- **Time-in-seat.** Time on task is not the active ingredient — Dresler's active control drilled the
  same duration and gained a third as much. Log *scores*, not hours. [agent-5 §1]
- **Total card count.** It measures liability, not knowledge. Every card is a ~10-year review
  commitment. [agent-3 §4.7]
- **Subjective confidence.** Immediate performance systematically misleads: massed practice feels
  better and retains worse. [agent-1 §2]

## Monthly review (15 min, first Sunday)

1. Read the last four weeks of error autopsies **in one sitting**. Recurring failure categories are
   your actual curriculum — patch the symbol lexicon or the palace layout, not your effort level.
2. Plot the five key numbers. Flat for 3+ weeks with autopsy entries near zero = OK plateau → ratchet
   the timer. Flat *with* high autopsy counts = the encoding recipe is wrong, not the effort.
3. Quarterly: palace sweep — filter `prop:s>180 tag:palace-image`, suspend, free the loci.
   [agent-3 §6.3]

## Feeding the inner loop

Lines 1, 4 and 6 are the inputs to the N=1 calibration queue in `/research-loop.md` §4 — the process
that replaces this system's `[ANECDOTE]`° and `[INVENTED]` numbers with your own measurements.
Variables 1–3 (ghosting cooldown, verbatim cost per 100 words, sustainable review load) should be
running by week 4. Without this log they cannot run at all.
