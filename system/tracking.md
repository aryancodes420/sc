# tracking.md — The Daily Log

The log is **mandatory**. Deliberate practice requires immediate objective feedback; a solo learner
with no scored log has none. Foer kept a spreadsheet and reviewed it with a coach — with no coach,
the log plus the written error autopsies *are* the feedback channel. [research/agent-5 §7, §2]

It is also deliberately small. A log you skip is worth nothing, and compliance beats completeness.
**Target: under 2 minutes.**

---

## Daily entry (copy this block)

```
DATE:                          DAY #:
--------------------------------------------------
SLEEP h:          CAFFEINE mg / last time:
STRESS /10:       MISSED YESTERDAY? y/n

1. DELAYED RECALL (yesterday's set)     __ / __  = ___%
2. SPEED DRILL   [digits|cards|names]   score: ____  best: ____  timer set to: ____
3. ERROR AUTOPSY entries:  ___     (0 = you were not at the edge)
4. ENCODING  [concept|verbatim|detail]  items encoded: ____   minutes: ____
     source:                                   real material? y/n
5. ANKI      reviews: ____   new: ____   backlog: ____
6. LEXICON entries added: ____   running total: ____

7-DAY ROLLING ADHERENCE: __ / 7
--------------------------------------------------
```

## Weekly entry (Saturday, after the tracker)

```
WEEK #:
ML 60s:  names ___  words ___  images ___  numbers ___  cards ___
% of week's encoding volume on REAL target material: ___%     (rule: ≥50%)
Primary domain this week:
Gate for this week:                                    cleared? y/n
System changes made (Sunday slot only):
Two-week trial in progress on:
```

---

## The five numbers that actually matter

Everything else is diagnostic. These five decide whether the system is working:

1. **Line 1, delayed recall %** — the daily durability metric. Training gains show up in *durable*
   memories, and immediate recall cannot see them. [agent-2 §1.3]
2. **Line 3, autopsy entries** — a week of zeros means you were practising at comfortable pace,
   which is a program violation. Automaticity without difficulty is the OK plateau. [agent-5 §7.1]
3. **Line 4, real material y/n** — must be ≥50% of weekly encoding volume. This is the single
   countermeasure to transfer disappointment, and it is checkable only from this log.
   [agent-5 §7.4]
4. **Line 5, backlog** — the circuit-breaker input. Over 2× the daily cap → new cards to 0 until
   clear, drained in capped chunks. [agent-5 §7.2]
5. **7-day rolling adherence** — **not streaks**. Lally et al. 2010: median 66 days to automaticity,
   range 18–254, and missing a single opportunity did not materially affect habit formation. One
   missed day is a non-event; two consecutive misses drop you to the 15-minute floor session, never
   to zero. [agent-5 §7.5]

## What NOT to track

- **Streaks.** They convert one bad day into a quit event. The evidence says a single miss doesn't
  matter; a streak counter says it does.
- **Time-in-seat.** Time on task is not the active ingredient — the Dresler active control drilled
  for the same duration and gained a third as much. Log *scores*, not hours. [agent-5 §1]
- **Total card count.** It measures liability, not knowledge. Every card is a ~10-year review
  commitment. [agent-3 §4.7]
- **Subjective confidence.** Immediate-session performance systematically misleads — massed practice
  feels better and retains worse. Trust the delayed score, not the feeling. [agent-1 §2]

## Monthly review (15 min, first Sunday)

1. Read the last four weeks of error autopsies **in one sitting**. Recurring failure categories are
   your actual curriculum — patch the symbol lexicon or the palace layout, not your effort level.
2. Plot the five key numbers. Flat for 3+ weeks with autopsy entries near zero = OK plateau →
   ratchet the timer. Flat *with* high autopsy counts = the material or the encoding recipe is
   wrong, not the effort.
3. Quarterly only: run the palace sweep — filter `prop:s>180 tag:palace-image`, suspend, free the
   loci. [agent-3 §6.3]
