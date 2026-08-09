# evidence.md — Consolidated Evidence Base, Conflicts, and Verification Status

Full per-lane bibliographies live in `/research/agent-1..6-*.md`. This file carries (a) the
verification caveat that applies to everything, (b) the load-bearing claims with confidence labels,
(c) the conflicts between lanes and how each was resolved, and (d) what this system deliberately
rejects.

---

## 1. Verification status — read before trusting any number

**This session's egress policy blocked every full-text fetch.** All six lanes independently hit
403-on-CONNECT at the proxy for: pubmed.ncbi.nlm.nih.gov, pmc.ncbi.nlm.nih.gov, nature.com,
sciencedirect.com, cell.com, journals.sagepub.com, link.springer.com, frontiersin.org,
onlinelibrary.wiley.com, en.wikipedia.org, forum.artofmemory.com, mullenmemory.com,
docs.ankiweb.net, supermemo.com, memoryleague.com, iam-memory.org, and others. The proxy status
endpoint confirmed a **blanket organizational policy denial**, not transient failures. Per the
environment's own guidance, no attempt was made to route around it.

**Consequence, stated plainly:** every effect size in this system comes from search-surfaced
abstract or summary text for a paper that was located and confirmed to exist — **not from full text
that an agent read**. No citation is fabricated; every paper listed was returned by search with
title, authors and URL. But moderator tables, confidence intervals not quoted in abstracts, and
replication caveats buried in full text could not be checked.

**What this means for you:** the *direction* and *rank ordering* of the findings below are safe —
they are drawn from large meta-analyses whose headline results are widely reported and mutually
corroborating. **Individual decimal places are not.** Before any number here drives an irreversible
decision, open the primary. The specific items flagged for verification:

- Agent 1 flagged six load-bearing effect sizes (⚠ in `agent-1`).
- Agent 3 could not verify Anki's default leech threshold or the Load Balancer control in the manual
  text — both marked `[PROBABLE]`.
- Agent 6 could not open **any** normative table (RAVLT, Corsi, WAIS-IV, ROCF) and therefore quoted
  **no** norm values. This is why `benchmarks.md` is self-referenced rather than norm-referenced.

Two exceptions where first-party sources *were* opened: the **Anki manual source markdown**
(`ankitects/anki-manual` on GitHub) and the **FSRS repo and algorithm wiki**. The scheduler
configuration in this system therefore rests on directly-read documentation.

---

## 2. Load-bearing claims, ranked by leverage

### Tier 1 — the findings the whole system is built on

| Claim | Magnitude | Label | Source |
|---|---|---|---|
| Divided attention at **encoding** costs 22–46% of recall; at **retrieval**, 1–13% | largest single-manipulation effect in the corpus | `[ESTABLISHED]` | Craik et al. 1996; Naveh-Benjamin et al. 2000 |
| Spacing beats massing | g = 0.74 (retrieval practice); d = 0.71 (distributed practice) | `[ESTABLISHED]` | Latimier et al. 2021; Cepeda et al. 2006 — two meta-analyses converging within 0.03 |
| Retrieval practice beats restudy | g = 0.50 vs restudy; g = 0.61 vs all controls | `[ESTABLISHED]` | Rowland 2014; Adesope et al. 2017 |
| Mnemonic training works on ordinary adults, and the gain is durable | ~26 → ~62 of 72 words in 6 weeks at ≤30 min/day; **held at 4 months with no further practice** | `[ESTABLISHED]` | Dresler et al. 2017 (*Neuron*), n = 51, 3 arms |
| Sleep benefit to episodic memory | g = 0.44 | `[ESTABLISHED]` | Berres & Erdfelder 2021 |
| Capacity is ~4 chunks, but **chunk size is unbounded** | digit span 7 → 82 over ~264 sessions | `[ESTABLISHED]` | Cowan 2001; Chase & Ericsson 1981/82 |

### Tier 2 — technique-level findings that shape the drills

| Claim | Magnitude | Label | Source |
|---|---|---|---|
| Method of loci, single-session RCT floor | g = 0.65 [0.45–0.85], but high risk of trial bias | `[ESTABLISHED]` | MoL meta-analysis, *BJP* 2025, 13 RCTs |
| Training increases specifically **durable** memories; encoding becomes *more efficient*, not harder-working | activation decreases in lateral PFC, parahippocampal, retrosplenial cortex | `[ESTABLISHED]` | Wagner et al. 2021 (*Sci Adv*) |
| **Naïve MoL fails on abstract nouns** — reliable advantage for concrete, none for abstract | — | `[ESTABLISHED]` | Roediger 1980 |
| Interleaving is **not universal**: g = 0.42 overall, g = 0.67 visual/inductive, g = 0.34 maths, **g = −0.39 for words (blocking wins)** | — | `[ESTABLISHED]` | Brunmair & Richter 2019 |
| Self-explanation | g = 0.55 | `[ESTABLISHED]` | Bisra et al. 2018 |
| Self-reference effect | d ≈ 0.45 | `[ESTABLISHED]` | Symons & Johnson 1997 |
| Generation beats reading | d = 0.40 | `[ESTABLISHED]` | Bertsch et al. 2007 |
| Transfer of retrieval practice | d = 0.40 overall; d = 0.58 across formats — weaker than the direct effect | `[ESTABLISHED]` | Pan & Rickard 2018 |
| Read–Recite–Review beats rereading **and** note-taking, in less time than note-taking | — | `[ESTABLISHED]` | McDaniel, Howard & Einstein 2009 |
| Note-taking's **encoding** effect is small; value is in review | d = 0.22 | `[ESTABLISHED]` | Kobayashi 2005; Kiewra 1989 |
| Teaching / preparing to teach | g = 0.56 / g = 0.35 | `[ESTABLISHED]` | Kobayashi 2019 |
| Actors get verbatim retention as a **by-product** of interrogating word choice — and show **no general memory superiority** | roles retained verbatim for years | `[ESTABLISHED]` | Noice & Noice 1992, 2006 |
| Successive relearning: 1 correct recall/session × 5 spaced sessions | 83% retention at 30 days | `[ESTABLISHED]` | Rawson & Dunlosky 2013 |

### Tier 3 — the scheduler layer (first-party documentation, directly read)

- FSRS-6 is Anki's **default** scheduler; models each card as Difficulty / Stability / Retrievability;
  21 parameters. `[ESTABLISHED]`
- Interval formula `I(r,S) = (S/FACTOR)(r^(1/DECAY) − 1)`, so review load at a given retention is
  **computable, not guessable**: vs 0.90 baseline, **0.95 = 2.17×, 0.97 = 3.73×, 0.98 = 5.69×**
  reviews at fixed stability (~2–3× at 0.97 in realistic steady state, since higher R means fewer
  lapses). `[ESTABLISHED]` as arithmetic on the published formula.
- Anki's optimizer since 24.04 minimises **workload/knowledge**, not knowledge; the efficiency
  optimum lands at **0.85–0.90**. The manual explicitly cautions above 0.97. `[ESTABLISHED]` /
  `[PROBABLE]` for the exact range.
- "Compute minimum recommended retention" was **removed** in 25.07 — guides citing it are stale.
- "Reschedule cards on change" is off by default and **not recommended**. The correct answer to
  "should I rebuild my deck" is **never**. `[ESTABLISHED]`
- Wozniak's *Twenty Rules of Formulating Knowledge* (1999) — full list verified via mirror. Rules 4,
  9, 10, 11, 12 (atomicity, no sets, no enumerations, combat interference, optimise wording) do most
  of the work. `[ESTABLISHED]`

### Tier 4 — contested, and treated as contested in the system

| Claim | Status | How the system handles it |
|---|---|---|
| Do mnemonics support **understanding**, or only recall? | `[CONTESTED]` — statistics students recalled mnemonics without conceptual performance; first-letter mnemonics have mixed evidence | Hard rule: an image is admissible only if decoding the scene recovers the **relationship**. Label-only images go to flashcards. Concept sets are scored on relationship reproduction. |
| Expanding vs uniform intervals | `[CONTESTED — resolved as NULL]`. Karpicke & Roediger 2007, Logan & Balota 2008, Kang et al. 2014 all find no expanding advantage, sometimes a disadvantage | The system does not chase interval *shape*. FSRS schedules by predicted retrievability, which is a different mechanism, not "expanding retrieval." |
| Picture superiority **mechanism** | Phenomenon `[ESTABLISHED]`; dual-coding explanation `[CONTESTED]` — preserved in aphantasia at near-identical effect size | Images are used because they work. The system never claims image *vividness* predicts benefit, and never gates progress on subjective vividness after week 1. |
| Forgetting curve functional form | Power law `[PROBABLE]`; averaging-artifact debate is live | Used only qualitatively: forgetting **flattens** and leaves a remnant, which is the economic case for spaced review. |
| Post-learning caffeine for consolidation | `[CONTESTED]` — Borota 2014 positive; Aust & Stahl 2020 "at best small" and possibly withdrawal reversal; 2025 null with increased false alarms | Rejected. Caffeine is an alertness tool at a fixed dose, with an 8-h pre-bed cut-off. |
| Targeted memory reactivation | `[CONTESTED]` — g = 0.29 with documented publication bias, null in REM and wake | Excluded. Home audio cannot stage-lock to slow-wave sleep. |
| Mindfulness for memory | `[CONTESTED]` — g ≈ 0.18 attention, **no** working-memory effect vs active controls | Permitted as a ≤10-min session-entry ritual. Not counted as a memory intervention. |
| Alcohol "retrograde facilitation" | `[CONTESTED]` — failed a preregistered replication. Anterograde impairment is `[ESTABLISHED]` | No alcohol on training days, none 24 h pre-benchmark. |
| Cornell notes | `[CONTESTED]` — mixed empirical record | The **cue column** geometry is adopted; the branding is not. |
| Deliberate practice's explanatory power | `[ESTABLISHED]` and bounded: 26% of variance in games, 21% music, 18% sports, **4% education, <1% professions** | Elite results are promised only on scored memory tasks. Professional outcomes are not promised. |

### Tier 5 — anecdote, used as anecdote

Palace-portfolio management, ghosting cooldowns (~4 days), hot/cold pool splits, locus density
(~5/room), indexing schemes, amateur progression trajectories (first deck >6 min; ~20 words/60 s at
6 months; deck <3 min at 3 months, <90 s at 12), and review-volume sustainability curves
(~150/day steady state) are **practitioner-sourced**, from Art of Memory forum, Mullen Memory,
Magnetic Memory Method and vendor blogs. They are labelled `[ANECDOTE]` in the research files and
are used because no controlled literature exists on them — not because the evidence is strong. Treat
every such number as a starting hypothesis to be replaced by your own logged data.

---

## 3. Conflicts between lanes, and how each was resolved

**C1. Daily dose: 30 min (evidence) vs 60–90 min (mission spec).**
Agent 5 established that the only RCT-grade dose is ≤30 min/day, and that documented elite doses
cluster there too — the 60–90 min brief is an *extrapolation beyond the evidence base*.
**Resolved in Agent 5's favour on dose, without cutting the brief:** the program protects a 30-minute
strategy core (the evidence-backed part) and allocates the surplus to real target material rather
than more drilling. Authority rule from the plan: A5 wins on "will this be done", A1 on "does this
work." Both are satisfied.

**C2. Sleep-proximate encoding vs the 4-hour post-encoding exercise window.**
Agent 6 recommends the heaviest encoding in the last 2–3 waking hours (g = 0.44, meta-analytic) *and*
35 min of intervals ~4 h after encoding (van Dongen 2016, n = 72, single study). These are
physically incompatible on a weekday. **Resolved for sleep**, on evidence grade and effect size.
Aerobic sessions go in the morning or early afternoon; the 4-hour alignment is taken only on
weekends when a large midday encoding block makes it free.

**C3. Cap reviews (Agent 5) vs never cap reviews (Agent 3).**
Agent 5 recommends ~150 reviews/day as the sustainable ceiling; Agent 3 argues capping reviews
*hides* debt rather than removing it and intake should be controlled instead. **Both are right about
different things and the resolution is arithmetic:** leave the review limit effectively uncapped, cap
**new cards at 15/day**, which by Anki's own documented heuristic (~20 new → ~200 reviews) produces
~150 reviews/day at maturity. The 150 figure becomes an *outcome* to monitor, not a lever to pull.
This is also why the one-primary-domain-at-a-time rule exists: 15/day is a **total**, not per domain.

**C4. International Master of Memory standards — two different numbers.**
Agent 6 returned 1,000 digits/hour, 10 decks/hour, deck ≤2:00, ≥3,000 championship points.
Agent 2 returned 1,400 digits/hour, 14 decks/hour, deck <40 s. Both cite the same family of sources;
neither could open the primary rulebook. Almost certainly **different eras of a standard that has
been revised upward**. **Unresolved — flagged `[CONTESTED]` in `benchmarks.md`.** It changes nothing
in this program: both sets are year-2+ terminal gates far beyond the 12-week scope.

**C5. Self-explanation / elaborative interrogation: "moderate utility" (Dunlosky 2013) vs g = 0.55
(Bisra 2018).** Dunlosky's moderate rating predates the larger meta-analysis and was based on a
narrower materials-and-durations base. **Resolved for Bisra**, with the caveat Agent 1 attached:
self-explanation is expensive per unit of material and does not scale to bulk content. The system
therefore reserves it for the conceptual spine (~10–20% of material) and lets retrieval practice
carry volume.

**C6. Interleaving as a general principle vs Anki's "mix new with reviews".**
Not a real conflict, but easily confused. Anki's display-order setting is about avoiding a
front-loaded block of new cards; it is not the interleaving-vs-blocking manipulation from the
learning literature. The blocking rule (**block vocabulary and terminology, interleave
discrimination**) is applied at the level of *what you study*, not the review queue.

---

## 4. Explicitly rejected

Rejected on evidence, not on taste. Each of these costs time the program needs elsewhere.

| Rejected | Why |
|---|---|
| **Photoreading, subliminal learning, "unlock more of your brain"** | No evidence. Mission constraint; not re-litigated. |
| **Speed reading** | Rayner et al. 2016: claims "overstated and not in line with what we know." Carver 1985: trained speed readers peaked at **444 wpm with 71% comprehension**; above ~600 wpm participants were skimming, not reading. Subvocalisation supports comprehension; the perceptual span is ~15 characters right of fixation; regressions are **comprehension repair**, not waste. |
| **RSVP for first-pass acquisition** | Removes the ability to reread, so misinterpretations are carried forward. Scanning only. |
| **n-back / commercial brain training** | No convincing far transfer (Melby-Lervåg 2016, 87 pubs; Soveri 2017 on n-back specifically). Allocate zero minutes. |
| **SQ3R as a named ritual** | "Support is based more on opinion than empirical evidence." Only its two working atoms — pre-question and recite — are kept. |
| **Incremental reading (SuperMemo)** | Independent validation essentially absent; steep learning curve and tool lock-in consume exactly the budget retrieval practice needs. Only `extract → clozify → schedule` is stolen. |
| **Zettelkasten / PARA / progressive summarisation as memory methods** | `[ANECDOTE]` — no controlled evidence. Reputation is inferred from Luhmann's output, which cannot separate the method from the man. Permitted only as a card factory. |
| **Highlighting and rereading** | Rated **low utility** by Dunlosky et al. 2013, and nothing since has overturned it. |
| **3-digit (000–999) systems and PAO in year 1** | ~10× the image-learning cost for ~1.5× the digit rate. For a learner whose priority is concepts and text, close to pure waste. |
| **Supplements / nootropic stacks** | No meta-analytic evidence located for adult declarative memory. |
| **Streak counters** | Contradicted by Lally et al. 2010 — a single missed opportunity does not materially affect habit formation. |

---

## 5. Per-lane research files

| File | Lane | Deliverable |
|---|---|---|
| `research/agent-1-cognitive-architecture.md` | Learning science | 12 findings ranked by effect size |
| `research/agent-2-mnemonic-systems.md` | Encoding engine | Skill tree, Stages 0–8, with gates |
| `research/agent-3-spaced-repetition.md` | Storage layer | Settings tables + 10 worked card examples |
| `research/agent-4-reading-ingestion.md` | Front end | 10-step Reading OS, 3 configurations |
| `research/agent-5-elite-practice.md` | Dose & adherence | Top-0.1% template, `[DOCUMENTED]` vs `[CLAIMED]`; 5 quit causes |
| `research/agent-6-consolidation-measurement.md` | Substrate & scoreboard | Recovery rules table; 8-test battery |
