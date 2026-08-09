# Agent 3 — Spaced Repetition Engineering (Storage & Scheduling Layer)

Scope: the layer that converts a single good encoding into permanent, on-demand recall. Algorithm choice, scheduler configuration, review-load economics, card construction, failure modes, and how mnemonic material (Agent 2's output) gets scheduled.

**Access note (honesty):** `docs.ankiweb.net`, `faqs.ankiweb.net`, `supermemo.com`, `supermemo.guru`, `super-memory.com`, `expertium.github.io` and `pmc.ncbi.nlm.nih.gov` are all blocked by this environment's egress proxy. I worked from the **source repository of the official Anki manual** (`ankitects/anki-manual`, same text as docs.ankiweb.net), the **FSRS project repo and wiki**, and a GitHub mirror of Wozniak's article. Where I could not verify an exact default in the manual text, I say so and label it `[PROBABLE]` rather than asserting it.

---

## 1. FSRS: what it is and what version you are on

**Finding 1.1 — FSRS is now the default scheduler, not an add-on.** The Anki manual describes FSRS as "an alternative to Anki's legacy SuperMemo 2 (SM-2) algorithm" that can help you "remember more material in the same amount of time." FSRS-6 became the shipped/default algorithm from Anki 25.07 onward; new profiles get it automatically, existing profiles do **not** flip on their own. `[ESTABLISHED]` for the manual's framing; `[PROBABLE]` for the precise 25.07 version boundary (from release-note aggregators, not opened first-party).
→ Practice implication: open Deck Options, confirm FSRS is enabled at the top level (it is a global toggle), and do not install any FSRS add-on — the add-on era ended.

**Finding 1.2 — The DSR model.** FSRS models each card with three variables, defined in the FSRS algorithm wiki as: **Retrievability (R)** = "Probability of recall"; **Stability (S)** = "Interval when R=90%"; **Difficulty (D)**, constrained to [1, 10]. Scheduling is: predict R from time-since-review and S, and schedule the review at the moment R falls to your **desired retention**. `[ESTABLISHED]`
→ Practice implication: every knob you turn is really a knob on one of these three — desired retention sets the trigger point, ratings update D and S, and nothing else in the UI matters nearly as much.

**Finding 1.3 — The forgetting curve and interval formula (this is the load model).** FSRS-6 uses a power forgetting curve `R(t,S) = (1 + FACTOR · t/S)^(−w20)` where the decay exponent **w20 is a trainable parameter** (fixed at 0.5 in FSRS-4.5/5), and FACTOR is set so that R(S,S) = 90%. Inverting gives the scheduling interval: `I(r,S) = (S/FACTOR) · (r^(1/DECAY) − 1)`, which yields I = S exactly when r = 0.9. FSRS-6 has **21 parameters**. `[ESTABLISHED]`
→ Practice implication: because I(r,S) is closed-form, the review-load cost of raising desired retention can be computed exactly rather than guessed — see §2.

**Finding 1.4 — How FSRS differs from SM-2 in practice.** SM-2 adjusts a per-card "ease factor" multiplicatively and has no model of forgetting probability; FSRS fits coupled stability/difficulty equations to *your* review log, applies difficulty mean-reversion (which is what kills SM-2's "ease hell"), caps post-lapse stability rather than letting a long overdue gap inflate the interval, and gives longer, better-calibrated first intervals. `[ESTABLISHED]` (FSRS4Anki tutorial + algorithm wiki). The commonly circulated "20–30% fewer reviews than SM-2 at equal retention" figure comes from the FSRS team's benchmark on a very large review corpus — I did **not** open the benchmark repo, so `[PROBABLE]`.
→ Practice implication: expect FSRS to *lengthen* intervals on your easy cards and *shorten* them on your genuinely hard ones; do not "fix" this by manually rescheduling.

**Finding 1.5 — Optimizing parameters.** In Anki 24.06.3+ the **Optimize** button works with any number of reviews (earlier builds demanded 400, and before that 1000). Optimizing on a tiny history returns near-default parameters — harmless, not magic. The old **Evaluate** button was replaced by an optional **"Check health when optimizing (slow)"**; the manual lists the usual causes of a poor health result as too few reviews (under a few hundred), misuse of the Hard button, and failure to press Again when you actually forgot. `[ESTABLISHED]`
→ Practice implication: optimize once at ~1,000 reviews, then whenever your total review count roughly doubles, then monthly once you are past ~10k reviews; that is 4–6 clicks in year one, not a weekly ritual.

**Finding 1.6 — "Compute minimum recommended retention" is gone.** The manual marks it as a **Removed Feature** as of Anki 25.07. `[ESTABLISHED]`
→ Practice implication: any guide telling you to click that button is stale; ignore it and set desired retention deliberately from §2.

**Finding 1.7 — Do NOT rebuild or reset the deck.** "Reschedule cards on change" is **off by default and the manual explicitly states this option is not recommended.** By default, switching to FSRS or changing desired retention affects only *future* reviews, letting the collection migrate gradually. `[ESTABLISHED]`
→ Practice implication: the correct answer to "should I reset/rebuild my deck" is **never** — no forget-all, no reset-scheduling, no delete-and-redownload; leave Reschedule cards on change off permanently and let the next review of each card apply the new policy.

**Finding 1.8 — FSRS short-term scheduler.** The manual states that "(Re)learning steps of 1 day or greater are not recommended when using FSRS" and that you may "let FSRS control short-term scheduling by leaving the (re)learning steps field empty," describing this as **an experimental feature**. `[ESTABLISHED]` that it exists and is labelled experimental.
→ Practice implication: for a system you must trust for 12 months, keep short explicit steps rather than the experimental empty-steps mode; revisit in six months.

**Finding 1.9 — Historical retention.** For reviews that predate FSRS, "it will assume that when you did those old reviews, you remembered 90% of the material." `[ESTABLISHED]`
→ Practice implication: if you are starting a fresh collection this is irrelevant; if importing an old collection with known-bad habits, expect the first optimization to be mildly miscalibrated and re-optimize after a few hundred fresh reviews.

---

## 2. Retention target vs review load — the central economic decision

**Finding 2.1 — The exact interval penalty (derived from the verified formula).** Using `I(r,S) = (S/FACTOR)·(r^(1/DECAY) − 1)` with the FSRS-4.5/5 decay of 0.5 (FACTOR = 19/81 ≈ 0.2346), holding stability constant:

| Desired retention | Interval as fraction of the 90% interval | Reviews/day multiplier vs 90% |
|---|---|---|
| 0.80 | 2.40× | **0.42×** |
| 0.85 | 1.64× | **0.61×** |
| 0.90 | 1.00× | **1.00×** (baseline) |
| 0.92 | 0.77× | **1.29×** |
| 0.95 | 0.46× | **2.17×** |
| 0.97 | 0.27× | **3.73×** |
| 0.98 | 0.18× | **5.69×** |

With a flatter learned decay (w20 = 0.2) the same arithmetic gives 2.37× at 0.95 and **4.35×** at 0.97 — i.e. flatter curves make high retention *more* expensive, not less. `[ESTABLISHED]` as arithmetic on the published formula; the numbers are the instantaneous interval-frequency effect at fixed stability.

**Finding 2.2 — Real steady-state load is less extreme than 2.1 but still severe.** The table above overstates the true multiplier, because higher R means fewer lapses, and lapses are expensive (relearning steps plus stability damage). The FSRS wiki frames this as two opposing forces: "As desired retention increases, intervals become shorter, which increases the number of reviews per day. As desired retention decreases, we forget more and must re-learn more," producing a U-shaped total-workload curve. Real simulator output for 0.90 → 0.97 typically lands around **2–3× total time**, not 3.7×. `[PROBABLE]`
→ Practice implication: budget 0.97 as "roughly triple the daily minutes of 0.90 for a 7-point retention gain" — that is the honest exchange rate.

**Finding 2.3 — Anki's own optimization target changed, and it is not "maximize knowledge."** Per the FSRS wiki: "Before Anki 24.04, the goal was to maximize knowledge acquisition… but in Anki 24.04+, the goal is to minimize workload/knowledge (minutes of studying divided by the [number of items retained])." The value that minimizes minutes-per-retained-item is reported to typically fall in **0.85–0.90**. `[ESTABLISHED]` for the metric change; `[PROBABLE]` for the 0.85–0.90 range (search-surfaced, first-party page did not print numeric tables).
→ Practice implication: pure efficiency says 0.85–0.90; anything higher is you *buying* reliability with time, and you should know the price you are paying.

**Finding 2.4 — The manual's own warning.** "Higher retention leads to shorter intervals and more reviews per day," with an explicit caution against settings above 0.97 because workload increases dramatically. The permitted range is 0.70–0.99 in current builds. `[ESTABLISHED]`
→ Practice implication: 0.97 is the documented cliff edge, not a target; 0.99 is a trap that will produce a collection you abandon in month three.

**Finding 2.5 — The recommendation for this mission.** For a learner who must sustain 60–90 min/day for 12 months and needs *on-demand, high-confidence* recall:

- **Core / must-never-fail material (verbatim lines, statute text, formulas, named cases): 0.93.** Costs ~1.4–1.5× a 0.90 deck; buys a meaningful reduction in embarrassing blanks.
- **Bulk knowledge (concepts, general facts, background): 0.90.** The efficiency optimum, and the volume lives here.
- **Exploratory / low-stakes / large-volume intake: 0.85.** Cheap, and you will re-encounter this material in reading anyway (Agent 4's lane).

Do **not** run the whole collection at 0.95+; at typical mature-collection sizes that converts a 60-minute day into a 130+ minute day and the system fails by abandonment, which is a 0% retention outcome. `[PROBABLE]` — this is a judgement call built on 2.1–2.4.
→ Practice implication: three presets, three retention values; the retention dial is a *triage* tool, not a global quality slider.

---

## 3. Exact recommended settings (copy-pasteable)

Setting names below are ones I verified appear in the current Anki manual, except where flagged. Deck Options → the preset dropdown is at the top.

### 3.1 Preset: **Core-0.93** (verbatim, formulas, high-stakes)

| Setting (as in Anki) | Value | Reason |
|---|---|---|
| FSRS | **On** (global toggle) | Default algorithm since 25.07; strictly better calibrated than SM-2. |
| Desired Retention | **0.93** | ~1.4× the 0.90 load; the reliability premium is worth it only on the material that must never fail. |
| Learning steps | **`15m 1d`** — see note | Two steps, same-day-plus-next-day; manual warns steps ≥1 day are "not recommended" with FSRS, so prefer `10m 1h` if you want to stay strictly inside the guidance. |
| Relearning steps | **`10m`** | One short step; a lapse should cost minutes, not a re-run of the whole learning ladder. |
| Maximum interval | **`365`** days | Default is 100 years; capping at a year forces an annual touch on material you have promised yourself you can produce on demand. |
| New cards/day | **`10`** ramping to `20` | Manual: "If you are consistently learning 20 new cards a day, you can expect your daily reviews to be roughly about 200 cards/day." |
| Maximum reviews/day | **`9999`** (effectively uncapped) | Capping reviews hides debt rather than removing it; control intake at the new-card end instead. |
| Leech threshold | **`4`** lapses | Aggressive: surface broken cards fast. (Anki's own default is `[PROBABLE]` 8; I could not verify the number in the manual text.) |
| Leech action | **Tag Only** | Suspending silently deletes knowledge from your schedule; tagging forces you to *rewrite* the card. |
| Bury new siblings | **On** | Prevents a cloze's siblings from cueing each other in the same session. |
| Bury review siblings | **On** | Same reason, for mature cards. |
| Bury interday learning siblings | **On** | Same reason across the day boundary. |
| Reschedule cards on change | **Off** | Manual: "this option is not recommended." Never turn on. |
| Easy Days | Sat/Sun = **Reduced** | Manual: intervals get "adjusted by a small amount"; note that setting *all* days to Reduced equals all-Normal, so only mark real low-capacity days. |
| Load Balancer | **On** if present | Smooths day-to-day due spikes. `[PROBABLE]` — present in recent builds per community sources; I could not verify the section in the manual text. |
| Insertion order | **Sequential** | Manual: "you should leave this option set to Sequential, and adjust the display order instead." |
| New/review order | **Mix with reviews** | Interleaving; avoids a front-loaded block of new cards that you then abandon. |
| Check health when optimizing | **On** initially, off later | Slow, but catches Hard-button abuse and dishonest grading early. |
| Historical retention | leave default (0.9) | Only affects pre-FSRS review history. |

### 3.2 Preset: **Bulk-0.90** — identical to Core-0.93 except: Desired Retention `0.90`, Maximum interval `1825` (5y), New cards/day `20`, Leech threshold `6`.

### 3.3 Preset: **Intake-0.85** — identical except: Desired Retention `0.85`, Maximum interval `3650`, New cards/day `30`, Leech threshold `8`, Leech action Tag Only.

### 3.4 Deck and preset structure

- **One top-level deck per domain, maximum three sub-levels.** Deck sprawl is the most common cause of untouched decks.
- **Presets are orthogonal to decks.** Assign Core-0.93 to the sub-decks holding verbatim/formula material regardless of which domain they sit in.
- **One `00-Inbox` deck** with Intake-0.85 for cards written fast during reading; a weekly 15-minute pass rewrites and re-files them. This is the single highest-leverage structural habit — it decouples *capture* from *card quality*.
- **A `99-Palaces` deck** with Core-0.93 (see §6).
- **Grading discipline (not a setting, but it determines whether every setting above works):** Again = could not produce it; Hard = produced it slowly/incompletely; Good = produced it; Easy = instant and effortless. Using Hard as a soft Again is the single most common way to corrupt FSRS's fit — the manual names it as a top cause of a failed health check. `[ESTABLISHED]`
→ Practice implication: three presets, an Inbox, a Palaces deck, and honest grading — that is the entire configuration layer; stop tuning after this.

---

## 4. Card design

**Finding 4.1 — The 20 Rules are the canonical style guide.** Wozniak's *Effective learning: Twenty rules of formulating knowledge* (P. Wozniak, February 1999). The rules, verbatim: (1) Do not learn if you do not understand; (2) Learn before you memorize — build the picture of the whole before you dismember it into simple items; (3) Build upon the basics; (4) Stick to the minimum information principle; (5) Cloze deletion is easy and effective; (6) Use imagery; (7) Use mnemonic techniques; (8) Graphic deletion is as good as cloze deletion; (9) Avoid sets; (10) Avoid enumerations; (11) Combat interference; (12) Optimize wording; (13) Refer to other memories; (14) Personalize and provide examples; (15) Rely on emotional states; (16) Context cues simplify wording; (17) Redundancy does not contradict the minimum information principle; (18) Provide sources; (19) Provide date stamping; (20) Prioritize. `[ESTABLISHED]` (mirror opened; primary domain blocked).
→ Practice implication: rules 4, 9, 10, 11 and 12 do 80% of the work — atomicity, no sets, no lists, no cue collisions, tight wording.

**Finding 4.2 — Why enumerations and sets fail.** A card asking for N items has recall probability ≈ p^N under partial independence; at p = 0.93 per item, a 6-item list card retrieves cleanly ~65% of the time. It also fails *informatively-free*: you cannot tell which item broke, so the scheduler's D/S update is garbage for five items that were fine. `[ESTABLISHED]` as a direct consequence of Wozniak rules 9–10 and the DSR model.
→ Practice implication: convert every list into overlapping cloze cards plus one "how many" card, never a single "name all of them" card.

**Finding 4.3 — Cue overlap / interference.** Rule 11. Two cards whose fronts are near-identical but whose answers differ train you to retrieve *a* plausible answer rather than *the* answer, and the errors are systematic, not random.
→ Practice implication: every card front must contain enough disambiguating context that only one answer is correct — if you cannot write that front, the two facts should be one comparison card.

**Finding 4.4 — The orphan-fact problem.** A card that survives in isolation (rule 1 violated, or rule 13 unused) is retained as a token, not as knowledge; you can produce the answer to the card and still be unable to use the fact. This is the failure mode that makes people say "Anki doesn't work."
→ Practice implication: every atomic card should be created *alongside* at least one relational card (why / contrast / consequence) built from the same source paragraph.

**Finding 4.5 — Carding concepts and procedures, not just facts.** Facts take cloze and Q/A. **Concepts** take three card shapes: definition→term (production), term→discriminating feature vs its nearest neighbour, and a *classification* card (a novel instance → which concept). **Procedures** take "given this state, what is the next action" cards plus one "when does this procedure NOT apply" card. This is the only way SRS touches application at all.
→ Practice implication: for every concept, write the discrimination card before the definition card — discrimination is what fails under pressure.

**Finding 4.6 — Honest counter-evidence: what SRS does not do.** Flashcard SRS reliably produces cued retrieval of itemised knowledge; it does **not** reliably produce transfer to novel problems, integration across items, or fluent application, because the retrieval cue at test time in the real world is nothing like the card front. Medical-education literature shows Anki usage correlating with higher standardised-exam scores (a heavily itemised assessment), which is exactly the case where cue structure matches. `[PROBABLE]` — I could not open the primary studies (PMC blocked); Agent 1 owns the underlying science.
→ Practice implication: budget roughly 70% of daily time to SRS and 30% to unscheduled *generation* — writing summaries from memory, solving problems, explaining aloud — because no card configuration substitutes for that.

**Finding 4.7 — Classic deck-design mistakes.** Downloaded/shared decks (cards encoded by someone else fail rule 1 and produce the highest leech rates); cards you do not understand; wall-of-text fronts; ambiguous prompts; one-way recognition-only cards for material you must *produce*; over-clozing a sentence into six blanks that all cue each other; and card counts that outrun sustainable review time. The "Ankify everything" failure is the terminal one: intake is free, review is not, and every card is a ~10-year liability.
→ Practice implication: a hard cap — no more than 15 new cards/day per domain in month one, and never add a card you could not have written from memory five minutes after reading the source.

**Finding 4.8 — Incremental reading in Anki.** True SuperMemo-style incremental reading is not native to Anki; the closest implementations are third-party add-ons, which historically break across Anki releases. `[PROBABLE]`
→ Practice implication: do not attempt IR inside Anki — keep reading in Agent 4's workflow and let Anki receive only finished, atomic cards via the Inbox deck.

---

## 5. Card-writing style guide — 10 worked examples

Literal card text. `{{c1::...}}` is Anki cloze syntax.

---

**1. Fact — overloaded front**

*BAD* — Front: `Battle of Hastings` / Back: `1066, Normans under William the Conqueror defeat Harold Godwinson, near Hastings, Sussex; leads to Norman conquest of England`
*Why it fails:* rules 4 and 9 — one cue, five answers; grading is meaningless because you always get *some* of it.
*GOOD:*
- Front: `Year of the Battle of Hastings` / Back: `1066`
- Front: `Battle of Hastings (1066) — who won?` / Back: `The Normans, under William the Conqueror`
- Front: `Battle of Hastings (1066) — which English king was defeated and killed?` / Back: `Harold Godwinson`
- Front: `Battle of Hastings (1066) — its main political consequence?` / Back: `The Norman conquest of England`

---

**2. Enumeration — "name all of them"**

*BAD* — Front: `List the four elements of a negligence claim` / Back: `Duty, breach, causation, damages`
*Why it fails:* rule 10; ~p⁴ success, and one miss poisons the interval of three sound facts.
*GOOD:* one count card plus overlapping clozes on a single note:
- Front: `How many elements does a negligence claim have?` / Back: `Four`
- Cloze: `Negligence elements (1 of 4, alphabetical-by-sequence): {{c1::duty}} → {{c2::breach}} → {{c3::causation}} → {{c4::damages}}`
- Front: `Negligence: which element comes immediately after breach?` / Back: `Causation`

---

**3. Formula — one-way only**

*BAD* — Front: `Bayes' theorem` / Back: `P(A|B) = P(B|A)P(A)/P(B)`
*Why it fails:* recognition-only; you can recite it and not know what any term is or when to reach for it.
*GOOD:*
- Cloze: `Bayes' theorem: P(A|B) = {{c1::P(B|A)·P(A)}} / {{c2::P(B)}}`
- Front: `In Bayes' theorem, what does P(A) represent?` / Back: `The prior probability of A — before observing B`
- Front: `In Bayes' theorem, what does the denominator P(B) do?` / Back: `Normalises — it is the total probability of the evidence across all hypotheses`
- Front: `You know P(test positive | disease) and want P(disease | test positive). Which theorem?` / Back: `Bayes' theorem — it inverts a conditional probability`

---

**4. Verbatim line — whole-passage card**

*BAD* — Front: `Recite the opening of the Gettysburg Address` / Back: `Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.`
*Why it fails:* one cue, ~30 words; a single stumble marks the entire passage Again.
*GOOD* — sequential overlapping cloze, each blank cued by the preceding words:
- `Gettysburg Address: "{{c1::Four score and seven years ago}} our fathers brought forth on this continent, {{c2::a new nation}}, conceived in {{c3::Liberty}}, and dedicated to the proposition that {{c4::all men are created equal}}."`
- Plus one production card once the clozes are mature: Front: `Gettysburg Address — recite sentence 1 in full` / Back: `[full text]`

---

**5. Concept — definition without discrimination**

*BAD* — Front: `What is stare decisis?` / Back: `The doctrine that courts follow precedent`
*Why it fails:* rule 11 — it collides with res judicata, ratio decidendi, obiter dicta; you retrieve "something about precedent."
*GOOD:*
- Front: `Doctrine: courts are bound to follow the *reasoning* of prior decisions of higher courts` / Back: `Stare decisis`
- Front: `Stare decisis vs. res judicata — what is the distinction?` / Back: `Stare decisis binds *future cases* to a legal rule; res judicata bars *the same parties* from relitigating the same claim`
- Front: `A trial court declines to follow a directly-on-point Court of Appeal ruling. Which doctrine has it violated?` / Back: `Stare decisis (vertical)`

---

**6. Procedure — narrative blob**

*BAD* — Front: `How do you integrate by parts?` / Back: `Choose u and dv, differentiate u, integrate dv, then apply ∫u dv = uv − ∫v du, picking u by LIATE.`
*Why it fails:* a procedure stored as prose; you can recite the recipe and freeze on a real integral.
*GOOD:*
- Cloze: `Integration by parts: ∫u dv = {{c1::uv}} − {{c2::∫v du}}`
- Front: `Integration by parts — what does LIATE order?` / Back: `Priority for choosing u: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential`
- Front: `∫ x·eˣ dx — by LIATE, what is u?` / Back: `u = x (Algebraic beats Exponential)`
- Front: `When does integration by parts NOT help?` / Back: `When neither factor simplifies on differentiation and neither integrates cleanly — try substitution or partial fractions instead`

---

**7. Vocabulary — recognition-only**

*BAD* — Front: `ubicuo` / Back: `ubiquitous`
*Why it fails:* trains comprehension only; you will never produce the word.
*GOOD:*
- Front: `EN→ES: ubiquitous (adj.)` / Back: `ubicuo / ubicua`
- Front: `Complete: "El wifi es ___ en esta ciudad." (ubiquitous)` / Back: `ubicuo`
- Keep the recognition card too — but the production card is the one that matters. *(Bury siblings ON so the two do not appear together.)*

---

**8. Wall of text**

*BAD* — Front: `Explain the causes of the 1929 crash` / Back: `[220-word paragraph]`
*Why it fails:* ungradeable — there is no state of the world in which you either "got it" or "missed it."
*GOOD:*
- Front: `1929 crash — what margin requirement let retail buyers over-leverage?` / Back: `As little as 10% down; brokers' loans funded the rest`
- Front: `1929 crash — what did margin calls do to prices mechanically?` / Back: `Forced liquidation → falling prices → further margin calls (a reflexive spiral)`
- Front: `1929 crash — one *structural* cause distinct from leverage?` / Back: `A fragmented, unbranched banking system with no deposit insurance`
- Then one **free-recall prompt** kept OUT of Anki: "Write 150 words on the causes of the 1929 crash" — see 4.6.

---

**9. Cue overlap between near-identical cards**

*BAD* — two cards, Front: `Which case established the exclusionary rule?` and Front: `Which case established the right to counsel?`
*Why it fails:* both fronts read as "landmark criminal-procedure case"; you retrieve the most-recently-reviewed name.
*GOOD* — add a discriminating context cue to each front (rule 16), plus an explicit contrast card:
- Front: `4th Amendment, 1961, applied the exclusionary rule to the states — which case?` / Back: `Mapp v. Ohio`
- Front: `6th Amendment, 1963, right to appointed counsel in state felony trials — which case?` / Back: `Gideon v. Wainwright`
- Front: `Mapp vs. Gideon — which amendment does each turn on?` / Back: `Mapp = 4th (search/seizure, exclusionary rule); Gideon = 6th (right to counsel)`

---

**10. Mnemonic imagery — a palace image left un-carded**

*BAD* — no card at all; the image lives only in your head. Or worse — Front: `What's in locus 3 of the Cranial Nerve palace?` / Back: `A trigger-happy geminus by the fireplace`
*Why it fails:* the second version tests the image and never the target fact, so you retain a vivid picture attached to nothing.
*GOOD* — card the **link in both directions plus the plain fact**:
- Front: `Cranial Nerve Palace — locus 3 (fireplace): what image?` / Back: `A **trigger**-happy **gemin**us shooting at the fire → CN III, oculomotor`
- Front: `CN III — name and primary function?` / Back: `Oculomotor — most extraocular muscles, eyelid elevation, pupillary constriction`
- Front: `Which locus of the Cranial Nerve Palace holds the oculomotor nerve?` / Back: `Locus 3, the fireplace`
- Once the plain fact card has stability >180 days, **suspend the two image cards** — the scaffold has done its job.

---

## 6. Scheduling the memory palaces themselves

**Finding 6.1 — Palaces are two separable assets: the *route* (loci order) and the *contents* (images).** The route must become automatic and effectively permanent; the contents are disposable scaffolding once the target facts are independently stable. `[PROBABLE]` — inference from the DSR model and Wozniak rules 6–7 and 13, not a directly-cited empirical result; Agent 2 owns the technique itself.
→ Practice implication: schedule route and contents differently — never in the same deck.

**Finding 6.2 — Route cards.** Put them in `99-Palaces` under the Core-0.93 preset with **Maximum interval = 180 days**. Card shape: `Palace X — what is locus 7?` / `Palace X — which locus comes after the bookcase?` / `Palace X — how many loci total?` Once a route survives three consecutive correct reviews at >90-day intervals, drop it to Bulk-0.90.
→ Practice implication: a palace you cannot walk in order is not a palace; two review minutes a month keeps it.

**Finding 6.3 — Content cards decay by design.** Card the image→fact link (example 10) alongside the plain fact card. The plain fact card is the asset; the image cards are training wheels. Suspend image cards when the plain card reaches ~180-day stability, and *reuse the route* for new material. Keeping dead image cards alive forever is a silent tax that grows without bound.
→ Practice implication: schedule a quarterly sweep — filter `prop:s>180 tag:palace-image`, suspend, and free the loci for reuse.

**Finding 6.4 — Reviewing a palace as a *walk* beats reviewing it card-by-card.** A single free-recall walk through 20 loci is one retrieval event covering 20 items and costs ~60 seconds; twenty individual cards cost ~2 minutes and lose the sequence cue. `[PROBABLE]`
→ Practice implication: keep one Anki card per palace of the form `Palace X — walk it and state all 20 items, then check` with the full list on the back, and grade the whole walk; use individual cards only for the loci that keep breaking.

---

## Bibliography — sources actually opened

1. **Anki Manual — Deck Options** (source markdown, `ankitects/anki-manual`, `src/deck-options.md`, main branch). https://raw.githubusercontent.com/ankitects/anki-manual/main/src/deck-options.md — accessed 2026-08-09. *(Identical text to the blocked docs.ankiweb.net/deck-options.html.)* Source for: FSRS framing vs SM-2; desired retention default 90% and the >97% caution; permitted range; "Higher retention leads to shorter intervals and more reviews per day"; maximum interval default 100 years; the ~20 new → ~200 reviews/day heuristic; "(Re)learning steps of 1 day or greater are not recommended when using FSRS"; the experimental empty-steps short-term scheduler; "Reschedule cards on change… not recommended"; "Compute minimum recommended retention" removed in 25.07; "Check health when optimizing (slow)" and its failure causes; Easy Days behaviour; Insertion order = Sequential; Display Order option lists; Historical retention 90%.
2. **FSRS4Anki — Tutorial** (`open-spaced-repetition/fsrs4anki`, `docs/tutorial.md`). https://raw.githubusercontent.com/open-spaced-repetition/fsrs4anki/main/docs/tutorial.md — accessed 2026-08-09. Source for: stability/retrievability descriptions; ease-hell avoidance via difficulty mean reversion; post-lapse stability cap; optimizer review-count thresholds (no minimum in 24.06.3+, 400 in 24.04, 1000 earlier); 80–95% reasonable retention range; default no-reschedule migration behaviour. *(Note: this file still references FSRS-4.5 and is partially stale relative to Anki 25.07+.)*
3. **FSRS Algorithm wiki** — `open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm`. https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm — accessed 2026-08-09. Source for: R = "Probability of recall", S = "Interval when R=90%", D ∈ [1,10]; FSRS-6 power forgetting curve with trainable w20; `I(r,S) = (S/FACTOR)·(r^(1/DECAY) − 1)`; 21 parameters; SM-2 contrast.
4. **FSRS wiki — The Optimal Retention.** https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Optimal-Retention — accessed 2026-08-09. Source for: the two opposing forces / U-shaped workload curve (quoted); the Anki 24.04+ shift to minimising workload/knowledge; simulator design; Brent's method. Explicitly contains **no** numeric retention tables.
5. **Wozniak, P. (Feb 1999), *Effective learning: Twenty rules of formulating knowledge*** — full rule list read via GitHub mirror `ninja33/sm-20-rules-cn`. https://raw.githubusercontent.com/ninja33/sm-20-rules-cn/master/README.md — accessed 2026-08-09. *(Primary at supermemo.com and super-memory.com both blocked by this environment's egress proxy.)*
6. Web-search result summaries (no first-party page opened; treated as `[PROBABLE]` or `[ANECDOTE]` throughout): Anki 25.07 making FSRS-6 the default and adding w20; the "20–30% fewer reviews than SM-2" benchmark figure; the 0.85–0.90 typical output of optimal-retention computation; the existence of a Load Balancer control; Anki-usage/exam-score correlations in medical education.

**Attempted and blocked by egress proxy** (recorded so a later agent does not re-burn budget): docs.ankiweb.net, faqs.ankiweb.net, supermemo.com, supermemo.guru, super-memory.com, expertium.github.io, ncbi.nlm.nih.gov, pmc.ncbi.nlm.nih.gov.
