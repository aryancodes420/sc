# AGENT 4 — READING AND INGESTION: THE READING OS

**Access caveat (read this first):** WebFetch to external domains was blocked by this session's egress proxy for every URL attempted (sagepub, PubMed, PMC, semanticscholar, stafforini, supermemo.guru, and others — all returned `EGRESS_BLOCKED`). All sources below were accessed via search-engine full-text extraction of the paper's abstract/summary content, not by opening the PDF. Citations are real and verified to exist with correct author/year/journal; direct quotation of body text was not possible. Where a number could not be sourced, it is labelled as a derived engineering estimate, not a finding.

---

## PART 1 — WHAT THE EVIDENCE ACTUALLY SUPPORTS

### 1.1 The baseline: what you must stop doing

**[ESTABLISHED] Highlighting/underlining and rereading are low-utility.** Dunlosky, Rawson, Marsh, Nathan & Willingham (2013), *Psychological Science in the Public Interest* 14(1), assessed ten techniques against four generalisability criteria (learning conditions, student characteristics, materials, criterion tasks). Practice testing and distributed practice received **high** utility; elaborative interrogation, self-explanation and interleaving received **moderate**; summarisation, highlighting/underlining, keyword mnemonic, imagery for text, and rereading received **low**. Their explicit finding: "Most students report rereading and highlighting, yet these techniques do not consistently boost students' performance, so other techniques should be used in their place (e.g., practice testing instead of rereading)." Summarisation "helps some students on some criterion tasks, yet the conditions under which [it] produce[s] benefits are limited."
→ **Practice implication:** Delete highlighting and rereading from the pipeline entirely; every minute they occupied is reallocated to recall attempts.

**[ESTABLISHED] Reading rate baseline.** Brysbaert (2019), *Journal of Memory and Language* 109, meta-analysed 190 studies / 18,573 participants: adult English silent reading = **238 wpm non-fiction**, 260 wpm fiction, 183 wpm oral. This is your unit of account: **1000 words ≈ 4.2 minutes of single-pass reading**.
→ **Practice implication:** Cost every pipeline step in multiples of 4.2 min/1000 words so you can see when a technique costs 3× the read itself.

### 1.2 Active-recall reading workflows

**[ESTABLISHED] Read–Recite–Review (3R) beats both rereading and note-taking.** McDaniel, Howard & Einstein (2009), *Psychological Science* 20(4), 516–522. Two experiments: read the passage → recite aloud everything recallable without looking → reread. 3R beat rereading and note-taking on immediate and 1-week-delayed free recall of fact passages; on longer, complex engineering passages it beat rereading on multiple-choice and problem-solving and **matched note-taking while taking less study time**.
→ **Practice implication:** 3R is the default reading loop — it is the cheapest technique in the corpus with high-utility-tier performance, so make recitation, not annotation, the reflex at the end of every section.

**[CONTESTED → effectively unsupported] SQ3R / PQ4R.** Search of the empirical literature returns the standing verdict that "support for SQ3R is based more on opinion than on empirical evidence" and that comparisons with other study methods have produced "inconclusive" results, with mixed outcomes attributed to inconsistent implementation (ERIC EJ227607, *Journal of Reading*, 1980, "The SQ3R Study Technique: A Forgotten Research Target"; subsequent comparative studies show SQ3R ≈ KWL with no statistical difference). SQ3R is a 1946 packaging of components that *are* separately supported (questioning, recitation, review) plus components that are not.
→ **Practice implication:** Do not adopt SQ3R as a named ritual; adopt only its two evidence-carrying atoms — pre-question and recite — and drop the "Survey/Review" ceremony unless it is doing concrete work.

**[PROBABLE, bounded] Prequestions.** Carpenter & Toftness (2017), *Journal of Applied Research in Memory and Cognition*, found a prequestion group beat control on an immediate post-test, strongly for prequestioned content and weakly but positively for non-prequestioned content — in *video*. The authors explicitly note this diverges from **reading**-based prequestion studies, where prequestions may fail to help and can **impair** learning of non-prequestioned material, because readers selectively process toward the questions. Carpenter et al. (2023), "The Prequestion Effect," reviews the boundary conditions. Hausman & Rhodes (2018), "When Pretesting Fails to Enhance Learning Concepts From Reading Texts," documents null results.
→ **Practice implication:** Use prequestions only when you have a defined extraction target and accept losing the rest of the text; for material you must learn comprehensively, ask the questions *after* the first pass, not before.

**[ESTABLISHED] Self-explanation.** Bisra, Liu, Nesbit, Salimi & Winne (2018), *Educational Psychology Review* 30(3), 703–725: 69 effect sizes from 64 reports, random-effects **g = 0.55**; prompting learners to generate their own explanations beat being given explanations.
→ **Practice implication:** After each dense paragraph, answer "how does this follow from what came before?" out loud before moving on — it is the single highest-yield comprehension add-on at ~0.5–1 min per 1000 words.

**[PROBABLE, moderated by prior knowledge] Elaborative interrogation.** "Why would that be true?" prompts produce substantial gains over read-only controls on factual learning, but the effect is moderated by prior knowledge: high-knowledge readers in a read-only control can still outperform low-knowledge readers doing elaborative interrogation, and low-knowledge readers can generate *wrong* explanations that get encoded. Rated moderate utility by Dunlosky et al. (2013).
→ **Practice implication:** Use "why?" prompts in domains where you already have scaffolding; in a brand-new domain, front-load 1–2 hours of orientation reading before switching elaborative interrogation on, or you will memorise your own errors.

**[ESTABLISHED] Explaining to a real audience (the defensible core of "the Feynman technique").** Kobayashi (2019), *Japanese Psychological Research*, meta-analysis of 28 studies: **g = 0.35 for preparing-to-teach**, **g = 0.56 for teaching-with-preparation**, effective for deep and surface learning and surviving delay; benefits larger for *interactive* teaching than non-interactive. Note: "the Feynman technique" as a branded four-step protocol is [ANECDOTE] — no study tests that specific packaging. What is tested is: prepare to teach, then explain.
→ **Practice implication:** Convert one concept per session into a 3-minute spoken explanation aimed at a real person or a recording, because expectancy alone (g=0.35) is worth roughly half of actually delivering it (g=0.56).

**[ESTABLISHED, borrowed] Retrieval practice and spacing.** Agent 1 owns the effect sizes; the only fact this lane needs is that free recall after reading (the "blank page") is an instance of practice testing, Dunlosky's highest-utility category, and that it works better than any encoding-side manipulation available here.
→ **Practice implication:** Blank-page free recall is not optional garnish — it is the load-bearing step of the entire Reading OS.

### 1.3 Note systems: encoding versus external storage

**[ESTABLISHED] Note-taking's *encoding* effect is small; its *storage* effect is where the value is.** Kobayashi (2005), *Contemporary Educational Psychology*, meta-analysis of 57 studies comparing note-taking vs no-note-taking: mean weighted **d = 0.22** (small–medium). Kiewra (1989), "A review of note-taking: the encoding-storage paradigm and beyond," and Kiewra, DuBois et al. (1991) establish that reviewing notes (external storage) contributes more to outcomes than the act of writing them.
→ **Practice implication:** A note you never retrieve from is worth d≈0.22 and nothing more — so the pipeline must terminate in scheduled retrieval, not in a filed document.

**This is the central trap of the whole lane.** Note systems fail when filing *feels* like remembering. The Kobayashi/Kiewra split is the diagnostic: transcription buys you d≈0.22; the compounding return is entirely downstream of review. Any system that expands the transcription step and does not force a retrieval step is a net loss of time.
→ **Practice implication:** Impose a hard rule — no note enters the system unless it has already been converted into at least one question you cannot answer by looking at the note.

**[CONTESTED] Cornell notes.** The empirical record is mixed: instruction in the Cornell method has improved reading comprehension and attitudes in several studies (e.g. Springer, *Asian-Pacific Journal of Second and Foreign Language Education*, 2025, Cornell strategy instruction for EFL readers), while other studies find no significant difference vs student-choice methods (high-school FCS class study). Its plausible mechanism is precisely the cue-column: it converts a page of notes into a cued-recall test.
→ **Practice implication:** Adopt the Cornell *cue column* and summary line, ignore the branding — the two-column geometry is the cheapest available way to make notes self-testing.

**[ANECDOTE] Zettelkasten / atomic notes / progressive summarisation / PARA.** There is essentially no controlled evidence. The method's reputation derives from inference off Luhmann's output (70 books, ~400 articles), which cannot separate the method from the man. A 2023 paper proposes and pilots a digital Zettelkasten + spaced-repetition model, which is a proposal, not a replication base. Progressive summarisation and PARA are practitioner frameworks with zero experimental literature.
→ **Practice implication:** Use atomic notes only as a *card factory* feeding spaced retrieval (Agent 3's system) and never let linking/tagging work displace recall minutes — the linking has no evidence behind it, the retrieval does.

**[ANECDOTE / low-confidence] Incremental reading (SuperMemo).** Wozniak's claims are 95–98% lifetime retention with "maximum comprehension," and vocabulary maintenance at ~20 min/day in early years. Independent empirical validation is essentially absent; the evidence base is SuperMemo's own user data and Wozniak's self-experiments. SuperMemo's own documentation concedes the steep learning curve. Costs: software lock-in, high setup overhead per article, and a workflow that fragments texts before you have built a global model of them.
→ **Practice implication:** For an adult with 60–90 min/day, do **not** adopt incremental reading — the learning-curve tax and tooling dependency consume the exact budget that retrieval practice needs; take its one transferable idea (extract → clozify → schedule) and implement it inside your existing spaced-repetition tool.

### 1.4 Word-perfect memorisation of passages

**[ESTABLISHED] Meaning-based rehearsal beats rote for verbatim text.** Noice & Noice (2006), *Current Directions in Psychological Science* 15(1), 14–18, and Noice (1992), *Applied Cognitive Psychology* 6(5): professional actors segment scripts into **beats** (units defined by the character's intention/goal), and at no point attempt to memorise words directly — they work out *why the character chose those words to express that thought*. Verbatim fidelity is a by-product. Mechanisms identified: extensive elaboration, perspective-taking, self-referencing, self-generation, mood congruency, and **motor enactment** (lines learned with an appropriate movement are recalled better than lines learned still). Some actors retained lines verbatim three years post-run; actors show no general memory superiority.
→ **Practice implication:** Chunk verbatim material by *intention* ("here the author concedes, here he pivots, here he lands the claim"), assign a physical gesture to each chunk, and never run a rote loop on words you have not first justified.

**[ESTABLISHED] Cue removal / cue-dependent recall.** Tulving & Pearlstone (1966) established that a minimal cue unlocks material otherwise unrecalled; the first-letter method is a direct application — it converts rereading into cued recall and lets you titrate cue strength downward.
→ **Practice implication:** Build a graduated cue ladder (full text → first-letter transcript → chunk-label only → blank) and treat the rung you can clear as your objective progress metric.

**[ESTABLISHED] Spacing applies to verbatim material specifically.** The song-learning study (Cognitive Research: Principles and Implications, 2021) trained students to 95% correct-word criterion and then spaced follow-up sessions massed vs 2 days vs 1 week, testing at 3 weeks: strong benefit of spacing for **lyrics** (verbatim words), weaker for melody. Cepeda et al. (2008), *Psychological Science*, gives the general spacing-interval function.
→ **Practice implication:** After first perfect recitation, the correct next action is to stop and return in 24–48 hours, not to keep drilling that day.

**Time cost per 100 words to word-perfect [derived engineering estimate, not a citation]:** From the structure above — ~7 chunks of 12–15 words, cumulative "snowball" assembly, cue ladder — expect **15–25 min for an untrained adult, falling to 8–12 min once the loop is practised**, to reach one clean recitation of 100 words of prose. Durable retention (recitable cold at 3 months) costs a further **~20–35 min spread over 6–8 spaced sessions of 2–4 min**. Verse and rhetorically structured prose sit at the fast end; dense technical prose with arbitrary lists sits at the slow end or worse. Treat these as planning figures to be replaced by your own logged data within two weeks.
→ **Practice implication:** Budget ~40 min total lifetime cost per 100 verbatim words and refuse any verbatim target you cannot justify at that price.

### 1.5 Speed reading — this lane's debunk (owns it for the whole operation)

**[ESTABLISHED] The core claim is false.** Rayner, Schotter, Masson, Potter & Treiman (2016), "So Much to Read, So Little Time: How Do We Read, and Can Speed Reading Help?", *Psychological Science in the Public Interest* 17(1): claims of super-fast reading with maintained comprehension "are overstated and not in line with what we know about the way language is visually and cognitively processed." There is a speed–accuracy trade-off; the route to more text per hour is becoming a **more skilled language user** (vocabulary, exposure, domain familiarity).
→ **Practice implication:** Spend zero money and zero training minutes on speed-reading products; spend them on vocabulary and domain background instead, which is the mechanism the review endorses.

**[ESTABLISHED] The hard ceiling and the tradeoff curve.** Beyond ~300 wpm comprehension declines approximately linearly (Carver 1982; Zacks & Treiman 2016, as cited in the reading-rate literature). College students skimming for main ideas run 450–600 wpm. Carver (1985), "How good are some of the world's best readers?", tested 16 elite readers (top students, trained speed readers, heavy-reading professionals, ultra-high-scorers) on 6,000-word passages at rates equivalent to 375 / 1,500 / 6,000 / 24,000 wpm: the trained speed readers were fastest at **444 wpm with only 71% comprehension**; nobody retained detail above roughly 300–600 wpm; above 600 wpm participants were **skimming, not reading**.
→ **Practice implication:** Set 250–350 wpm as your working comprehension rate and treat anything above ~600 wpm as an explicitly declared skim with detail loss accepted in advance.

**[ESTABLISHED] Why subvocalisation elimination fails.** Inner speech is part of the phonological route that supports comprehension and working-memory maintenance of the sentence being integrated; suppressing it does not free capacity, it removes a support. The Rayner et al. review treats subvocalisation-elimination as one of the mechanisms speed-reading programmes wrongly claim to exploit.
→ **Practice implication:** Do not train yourself to suppress inner speech; the only legitimate reduction is the automatic one that comes from higher word familiarity.

**[ESTABLISHED] Why eye-span / fixation claims fail.** Rayner's eye-movement programme shows the perceptual span in English is small and asymmetric (roughly 3–4 characters left, ~14–15 right of fixation), so "read whole lines at a glance" is anatomically unavailable; parafoveal preview gives only a modest identical-preview benefit, not word-parallel reading. Regressive saccades — which speed-reading training tries to eliminate — are mostly **comprehension repair**; suppressing them means carrying misinterpretations forward.
→ **Practice implication:** Stop training against regressions and finger-pacing; a regression is your comprehension monitor firing, and killing it degrades the product you are paying for.

**[ESTABLISHED] RSVP costs comprehension.** Rayner et al. (2016): RSVP technologies (Spritz-style) remove the ability to reread; since most backward eye movements exist to repair comprehension failures, RSVP readers retain misinterpretations and comprehend less well. RSVP also collapses under sentence-length working-memory demands.
→ **Practice implication:** Use RSVP only for scanning known material for a target string, never for first-pass acquisition.

**[ESTABLISHED] Evelyn Wood-style claims and photoreading.** Carver (1985) is the empirical answer to trained-speed-reader claims (444 wpm, 71% comprehension). Photoreading has no supporting evidence and is rejected on sight per the mission constraint; "unlock more of your brain" and subliminal learning likewise.
→ **Practice implication:** Any programme quoting >1000 wpm with comprehension is disqualified without further reading.

**[PROBABLE] What genuinely raises effective throughput.** Klimovich et al. (2023), *Journal of Research in Reading* 46(2), 123–142, RCT'd a commercial speed-reading app against a **minimal metacognitive training** (be taught only to set a clear reading goal before each session) and a control: both interventions raised reading speed with **no comprehension difference between the three groups**, and the eye-movement data showed the gain came from fewer and shorter fixations in *late*, not early, lexical processing — i.e. less dwelling, not faster perception. The metacognitive group matched the app. Duggan & Payne (2009), *JEP: Applied* 15(3), 228–242: under time pressure, skimming improves memory for **important** ideas relative to reading half the text, but does not improve memory for less-important details or inferences; skimmers over-allocate to paragraph-initial, page-top, document-early text ("satisficing").
→ **Practice implication:** Replace speed-reading training with (a) an explicit written goal before every session and (b) purpose-driven skimming that you deliberately steer away from the beginning-of-everything bias — that is the entire legitimate speed toolkit.

---

## PART 2 — THE READING OS (numbered pipeline)

Notation: **T** = time cost. **A** = artefact produced. **Skip rule** = when to omit.

**0. TRIAGE (30–90 s per source).** Answer three questions in writing: (i) What decision or output does this source serve? (ii) Do I need it in 6 months? (iii) Must any of it come back in the author's exact words? → Route: **No to (ii)** = Config A. **Yes to (ii), No to (iii)** = Config B. **Yes to (iii)** = Config C on the specific passages only; Config B on the rest. **T:** 1 min. **A:** one-line purpose statement at the top of the note. **Skip rule:** never skip — Klimovich et al. (2023) shows goal-setting alone produces the speed gain the industry sells.

**1. PRE-PASS / SURVEY (2 min per 10k words).** Read title, abstract, section headers, figures, first and last paragraph. Write a 3-line prediction of the argument. **A:** prediction lines (later a comprehension check). **T:** ~2 min/10k words. **Skip rule:** skip for material under 800 words and for fiction.

**2. PREQUESTIONS — conditional (1–2 min).** Write 3–5 questions you want answered. **Only for Config A** (extraction) — the reading literature shows prequestions can impair learning of non-prequestioned content. **Skip rule:** skip entirely for Config B and C; there, questions are generated *after* the first pass.

**3. FIRST PASS AT COMPREHENSION RATE (4.2 min/1000 words at 238 wpm; 5–7 min/1000 for dense technical).** No highlighter, no notes, no annotation beyond a bare dot in the margin marking "this is a chunk boundary" (Dunlosky et al. 2013 — highlighting is low utility). Inner speech left on. Regressions allowed and encouraged (Rayner et al. 2016 — they are repair). **A:** margin dots. **Skip rule:** replace with a purpose-driven skim (Duggan & Payne 2009) in Config A.

**4. SELF-EXPLANATION AT SECTION BOUNDARIES (+0.5–1 min/1000 words).** At each dot, say aloud: "This follows from X because Y; it would be false if Z." Bisra et al. (2018), g = 0.55. **A:** nothing written — this is pure encoding. **Skip rule:** skip in Config A; never skip in Config B.

**5. BLANK-PAGE FREE RECALL (3–5 min per 2000 words read).** Close the source. Write everything you can recall, structure included. This is the 3R "recite" step (McDaniel et al. 2009 — beat rereading and note-taking, in less time than note-taking). **A:** recall sheet. **Skip rule:** never skip in Config B or C. In Config A, replace with a 3-bullet verbal summary.

**6. GAP AUDIT AGAINST SOURCE (2–4 min per 2000 words).** Reopen, compare recall sheet to text in a different colour. Everything you missed or got wrong is flagged. This is the error-driven repair step and it is the only place rereading is licensed — targeted, not global. **A:** annotated recall sheet with a gap list. **Skip rule:** skip in Config A.

**7. NOTE COMMIT — CUE-COLUMN FORM (3–6 min per 2000 words).** Write notes **from the recall sheet, not from the source**, in Cornell geometry: cue/question column left, content right, one-sentence summary at the foot. Notes written from memory are notes that were encoded; notes copied from the page are transcription (Kobayashi 2005, d = 0.22). **A:** the permanent note. **Skip rule:** skip for Config A (a 3-bullet note in the source's own file is enough).

**8. CARD CANDIDATE EXTRACTION (2–4 min per 2000 words).** Every item on the gap list from step 6 becomes a candidate question; every cue-column entry that you could not answer cold becomes a candidate. **This is the correct moment in the workflow** — after failure has identified what you actually don't know, not during reading, when everything looks worth carding. Hand off to Agent 3's system for card syntax and scheduling. **A:** a flat list of question stems. **Skip rule:** Config A produces zero cards by default; if a Config A source produces cards, it was mis-triaged.

**9. EXPLAIN-TO-A-PERSON (3–5 min, once per session, not per source).** Pick the hardest concept from the session and explain it aloud to a person or a recording, interactively if possible. Kobayashi (2019): g = 0.35 preparing-to-teach, g = 0.56 teaching. **A:** an audio file or a blank stare from a family member. **Skip rule:** skip when the session contained no conceptual material.

**10. SCHEDULED RETRIEVAL (owned by Agent 3).** Cards enter spaced review. The Reading OS ends here; storage without retrieval is d = 0.22 and stops compounding.

### Verbatim sub-pipeline (Config C only) — inserted between steps 6 and 7

**C1. Beat segmentation (2–3 min per 100 words).** Break the passage into 6–8 chunks of 10–15 words at *intention* boundaries — where the author's rhetorical purpose shifts. Label each chunk with a verb ("concedes", "pivots", "lands"). Noice & Noice (2006). **A:** labelled chunk map.

**C2. Meaning justification (2–4 min per 100 words).** For each chunk, answer: why *these* words and not synonyms? Assign a physical gesture (motor enactment improved actors' recall). **A:** nothing written.

**C3. Cumulative snowball rehearsal (5–10 min per 100 words).** Recite chunk 1 → 1+2 → 1+2+3 … Each addition requires clean recall of everything prior. Errors trigger immediate re-justification of the failed chunk, not blind repetition.

**C4. Graduated cue removal (3–6 min per 100 words).** Full text → first-letter transcript → chunk-label-only card → blank page. Advance a rung only after two consecutive clean runs. Tulving & Pearlstone (1966) cue-dependence.

**C5. Stop at first perfect recitation.** Do not overdrill the same day. Return at ~24 h, ~3 d, ~1 w, ~3 w, ~2 mo, each a 2–4 min blank-page recitation with error-driven repair on failures only (song-learning spacing study, 2021; Cepeda et al. 2008).

**Total Config C cost:** ~15–25 min to first perfect recitation per 100 words (8–12 once practised), plus ~20–35 min of spaced maintenance to 3-month durability. [derived estimate]

---

## PART 3 — THE THREE CONFIGURATIONS

| | **A — Light/survey** | **B — Dense, to be understood and retained** | **C — Verbatim** |
|---|---|---|---|
| Steps run | 0,1,2,3(skim),5(verbal) | 0,1,3,4,5,6,7,8,9,10 | B + C1–C5 on target passages |
| Rate | 450–600 wpm skim | 180–240 wpm | n/a — chunk-timed |
| Cost per 1000 words | ~3–4 min | ~18–25 min | ~150–250 min per 1000 verbatim words |
| Multiplier over raw read | ~0.8× | ~4–6× | ~40–60× |
| Cards produced | 0 | 8–15 per 2000 words | 1 cloze ladder per chunk |
| Failure mode | over-triaging real material here | carding everything instead of gaps | choosing verbatim targets that didn't need to be verbatim |

**Triage rule (memorise this):** *Six months, exact words, decision.* If you will not need it in six months → A. If you need the ideas but not the wording → B. If a specific passage must come back in the author's words → C for that passage only, B for its surroundings. Default is **A**; B must be justified by the six-month test; C must be justified by a named occasion on which you will produce the words. Most people's error is running B on A-material (they feel productive) and never running C at all (so they have no verbatim capability). A realistic weekly mix inside a 60–90 min/day budget: ~60% of *sources* at A, ~35% at B, ~5% at C — but roughly 55% of *minutes* at B and 25% at C.

---

## BIBLIOGRAPHY (sources located and read via search-engine extraction; full-text fetch blocked by egress policy)

1. Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving Students' Learning With Effective Learning Techniques. *Psychological Science in the Public Interest*, 14(1). https://journals.sagepub.com/doi/abs/10.1177/1529100612453266 · https://pubmed.ncbi.nlm.nih.gov/26173288/
2. Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So Much to Read, So Little Time: How Do We Read, and Can Speed Reading Help? *Psychological Science in the Public Interest*, 17(1). https://journals.sagepub.com/doi/10.1177/1529100615623267 · https://pubmed.ncbi.nlm.nih.gov/26769745/ · summary: https://www.sciencedaily.com/releases/2016/01/160114163035.htm
3. Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. *Journal of Memory and Language*, 109. https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786 · https://gwern.net/doc/psychology/linguistics/2019-brysbaert.pdf
4. McDaniel, M. A., Howard, D. C., & Einstein, G. O. (2009). The Read-Recite-Review Study Strategy: Effective and Portable. *Psychological Science*, 20(4), 516–522. https://pubmed.ncbi.nlm.nih.gov/19320858/ · https://cpb-us-w2.wpmucdn.com/blogs.cofc.edu/dist/6/250/files/2021/06/McDaniel-Howard-Einstein-2009.pdf
5. Bisra, K., Liu, Q., Nesbit, J. C., Salimi, F., & Winne, P. H. (2018). Inducing Self-Explanation: a Meta-Analysis. *Educational Psychology Review*, 30(3), 703–725. https://link.springer.com/article/10.1007/s10648-018-9434-x
6. Kobayashi, K. (2005). What limits the encoding effect of note-taking? A meta-analytic examination. *Contemporary Educational Psychology*, 30(2). https://eric.ed.gov/?id=EJ697806
7. Kobayashi, K. (2019). Learning by Preparing-to-Teach and Teaching: A Meta-Analysis. *Japanese Psychological Research*. https://onlinelibrary.wiley.com/doi/10.1111/jpr.12221
8. Kiewra, K. A. (1989). A review of note-taking: The encoding-storage paradigm and beyond. *Educational Psychology Review*. https://scispace.com/papers/a-review-of-note-taking-the-encoding-storage-paradigm-and-2cf6nbsr7y
9. Noice, H., & Noice, T. (2006). What Studies of Actors and Acting Can Tell Us About Memory and Cognitive Functioning. *Current Directions in Psychological Science*, 15(1), 14–18. https://journals.sagepub.com/doi/10.1111/j.0963-7214.2006.00398.x · https://homepage.villanova.edu/diego.fernandezduque/Teaching/CognitivePsychology/Lectures_and_Labs/sssAppliedIssues/CurrDirActing.pdf
10. Noice, H. (1992). Elaborative memory strategies of professional actors. *Applied Cognitive Psychology*, 6(5). https://onlinelibrary.wiley.com/doi/10.1002/acp.2350060506
11. Duggan, G. B., & Payne, S. J. (2009). Text skimming: The process and effectiveness of foraging through text under time pressure. *JEP: Applied*, 15(3), 228–242. https://pubmed.ncbi.nlm.nih.gov/19751073/ · https://time.com/wp-content/uploads/2015/05/duggan_payne_jepa_2009.pdf
12. Klimovich, M., et al. (2023). Does speed-reading training work, and if so, why? *Journal of Research in Reading*, 46(2), 123–142. https://onlinelibrary.wiley.com/doi/full/10.1111/1467-9817.12417 · https://eric.ed.gov/?id=EJ1372398
13. Carver, R. P. (1985). How good are some of the world's best readers? *Reading Research Quarterly*. (Findings accessed via https://www.mempowered.com/study/speed-reading and http://www.schnell-leser.de/Schnelllesen_23.10.2007.pdf)
14. Carpenter, S. K., & Toftness, A. R. (2017). The Effect of Prequestions on Learning from Video Presentations. *JARMAC*. https://www.sciencedirect.com/science/article/abs/pii/S2211368116301103 ; and Carpenter et al. (2023), The Prequestion Effect. https://www.lrdc.pitt.edu/nokes/documents/Carpenter%20et%20al.,%202023.pdf ; Hausman & Rhodes (2018), When Pretesting Fails. https://bpb-us-e1.wpmucdn.com/sites.ucsc.edu/dist/4/1518/files/2023/02/Hausman.Rhodes.2018b-When-Pretesting-Fails-to-Enhance-Learning.pdf
15. Anonymous/ERIC (1980). The SQ3R Study Technique: A Forgotten Research Target. *Journal of Reading*. https://eric.ed.gov/?id=EJ227607 ; The Learning Scientists (2021), SQ3R or Read, Recite, Review. https://www.learningscientists.org/blog/2021/3/4-1 [practitioner/secondary]
16. Cornell note-taking evidence: Springer (2025), Cornell note-taking strategy instruction for Gen Z. https://link.springer.com/article/10.1186/s40862-025-00347-8 ; null-result study: https://www.academia.edu/12037972/
17. Spacing for verbatim material: Optimizing song retention through the spacing effect (2021), *Cognitive Research: Principles and Implications*. https://link.springer.com/article/10.1186/s41235-021-00345-7 ; Cepeda et al. (2008), Spacing Effects in Learning, *Psychological Science*. https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf
18. Incremental reading (claims + criticism): SuperMemo, Incremental Learning. https://super-memory.com/help/il.htm ; https://help.supermemo.org/wiki/Incremental_learning ; https://en.wikipedia.org/wiki/Incremental_reading ; https://grokipedia.com/page/Incremental_reading [ANECDOTE / vendor documentation]
19. Zettelkasten evidence status: https://arslan.io/2025/01/30/the-zettelkasten-note-taking-methodology/ ; proposed Zettelkasten + SRS model (2023) https://www.researchgate.net/publication/369364730_ [ANECDOTE]
20. Tulving, E., & Pearlstone, Z. (1966) cue-dependent recall — cited via secondary source https://biblememory.com/scripture-memory-techniques [primary not opened; treat as background principle]
