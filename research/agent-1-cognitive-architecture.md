# Agent 1 — Cognitive Architecture of Learning and Memory
## The 12 highest-leverage findings, ranked by effect size

**Scope:** the science that determines why anything else in the training system works. Owns: attention/encoding, working-memory limits and chunking theory, levels of processing, retrieval-practice effect sizes, desirable difficulties, the *science* of spacing, interleaving, forgetting curves.

---

### METHODOLOGICAL DISCLOSURE — read this before trusting any number below

The sandbox's network egress gateway blocked **every** direct full-text fetch attempted (laplab.ucsd.edu, lscp.net, files.eric.ed.gov, link.springer.com, pmc.ncbi.nlm.nih.gov, pubmed.ncbi.nlm.nih.gov, journals.plos.org, psychologie.uni-wuerzburg.de, pdf.retrievalpractice.org, mcdaniel97.github.io, digitalcommons.lib.uconn.edu — all returned `EGRESS_BLOCKED` / gateway 403 on CONNECT). Proxy status confirmed a blanket policy denial, not a per-site failure.

**Consequence:** every figure below comes from search-engine-surfaced abstract and summary text for the named paper, not from the full text I read myself. I have not fabricated any citation — every paper listed in the bibliography was returned by search with its title, authors, and a URL, and every number is one that appeared in the returned abstract/summary text. But I could not verify moderator tables, confidence intervals I did not see quoted, or replication caveats buried in full text. **Treat effect sizes as "as-reported-in-abstract" and have someone with journal access verify the six load-bearing ones (marked ⚠) before they drive design decisions.** This is a real limitation of this lane's output and should not be papered over.

---

## THE RANKING

Ranked by magnitude of the effect on retention. Where a study reports a percentage cost rather than a standardized effect size, that is flagged explicitly and the item is placed by inferred magnitude, not by pretending a *d* exists.

---

### 1. Attention at encoding is the hard gate — dividing it costs 22–46% of recall. Dividing attention at *retrieval* costs almost nothing.
**[ESTABLISHED]**

**Magnitude:** Craik, Govoni, Naveh-Benjamin & Anderson (1996): divided attention during encoding produced memory costs of **46% in free recall and 22% in recognition**. The same divided-attention load applied at *retrieval* cost only **1% (recognition) to 13% (free recall)**. ⚠ (Percentage costs, not Cohen's *d*; the encoding asymmetry is the largest single-manipulation effect in this entire list — a 46% recall reduction almost certainly exceeds *d* = 1.0.) Replicated and extended by Naveh-Benjamin, Craik, Perretta & Tonev (2000), who framed it as "the resiliency of retrieval processes."

**Evidence quality:** High. Multiple independent labs, multiple materials, consistent asymmetry across three decades.

**Boundary conditions:** Retrieval is not *free* — Craik et al. found retrieval consumes resources (it slowed the concurrent choice-RT task) but memory output was largely protected. And retrieval resilience does not extend to *self-initiated* strategic retrieval under heavy load. The asymmetry is about output, not about effort.

→ **Practice implication:** Encoding sessions must be single-tasked and interruption-proofed to a degree that feels excessive; retrieval sessions can tolerate mild environmental noise, so schedule review into imperfect conditions and protect only the encoding block.

---

### 2. Spacing retrieval practice across sessions rather than massing it: g = 0.74; distributed practice generally: d = 0.71
**[ESTABLISHED]**

**Magnitude:** Latimier, Peyre & Ramus (2021, *Educational Psychology Review* 33:959–987) — 29 studies, 39 effect sizes in the spaced-vs-massed subset, meta-regression with robust variance estimation: **g = 0.74** for spaced over massed retrieval practice. ⚠ Cepeda, Pashler, Vul, Wixted & Rohrer (2006, *Psychological Bulletin*) — 839 assessments across 317 experiments in 184 articles: **d = 0.71** for spaced over massed in verbal recall.

**Evidence quality:** Highest in this document. Two large meta-analyses, decades apart, different inclusion criteria, converging within 0.03. This is as close to settled as educational psychology gets.

**Boundary conditions:** The advantage is measured on *delayed* tests. On immediate tests massing often looks equal or better — this is the classic performance/learning dissociation and it is why learners systematically under-choose spacing. Spacing also cannot rescue material that was never encoded (see #1).

→ **Practice implication:** No material may be considered "learned" from a single session — every target item must be scheduled for retrieval across a minimum of three separate days, and immediate-session performance must never be used as the criterion for dropping an item.

---

### 3. Retrieval practice beats restudy: g = 0.50 vs restudy, g = 0.61 vs all comparison conditions
**[ESTABLISHED]**

**Magnitude:** Rowland (2014, *Psychological Bulletin*), testing vs restudy: **Hedges' g = 0.50**. Adesope, Trevisan & Sundararajan (2017, *Review of Educational Research*), practice testing vs all other comparison conditions: **g = 0.61, 95% CI [0.58, 0.65]**. ⚠

**Evidence quality:** Highest. Two independent meta-analyses; Adesope et al. found classroom experiments produced benefits comparable to laboratory ones — a rare and important generalization result.

**Boundary conditions and known moderators:**
- Rowland: the effect is **larger** when material is more complex, when retrieval is more **effortful**, and when **feedback** is given.
- The two meta-analyses **disagree on question format**: Adesope et al. found multiple-choice produced stronger testing effects than short-answer; Rowland found the opposite. **[CONTESTED]** Do not design around format alone.
- Van Gog & Sweller (2015) argued the testing effect *decreases or disappears* as element interactivity (material complexity) rises. Karpicke & Aue (2015) rebutted this on four grounds: element interactivity was never quantitatively defined, none of the cited experiments actually manipulated it, the review omitted studies showing retrieval effects with complex materials, and the null results involved isolated-word retrieval or immediate massed retrieval. **[CONTESTED — I judge the rebuttal stronger, and note Rowland's meta-analytic moderator points the opposite way from Van Gog & Sweller.]**
- The effect requires *successful* retrieval to be reliable; retrieval attempts that fail without feedback contribute little.

→ **Practice implication:** Every study block converts to a retrieval block with feedback attached, and retrieval difficulty is tuned upward to the highest level that still yields mostly-successful recall.

---

### 4. Chunking plus retrieval structures raises apparent working-memory capacity by an order of magnitude — 7 digits to 82
**[ESTABLISHED — no effect size available; ranked by magnitude of the behavioural change and by strength of evidence]**

**Magnitude:** Chase & Ericsson (1981, 1982): two young adults with otherwise normal memory reached digit spans of **82 and 68 digits**, from a baseline around 7, over **264 and 286 practice sessions**. Kliegl et al. (1987) replicated the acquisition of skilled digit memory through mnemonic training. Mechanism: subjects encoded groups of 3–5 digits into long-term memory (running times, dates), then built hierarchical **retrieval structures** — chaining plus hierarchical ranking — to index those groups. Elaborated theoretically as long-term working memory (Ericsson & Kintsch, 1995).

**Underlying capacity limit:** Cowan (2001, *BBS*) — the real focus-of-attention limit, once rehearsal and long-term-memory support are controlled, is about **4 chunks**, not Miller's 7. Miller's number was explicitly a rhetorical estimate. Capacity is fixed; **chunk size is not**. This is the single most important structural fact in the whole design.

**Evidence quality:** High for the mechanism, but the headline numbers come from intensive single-case studies (n=2), replicated in kind rather than in scale. Cowan's 4±1 remains debated at the margins (see Journal of Cognition, "Is the Magical Number Four, Seven, or Does it Depend on What You Are Counting?") — but nobody defends 7 as a raw capacity anymore.

**Boundary conditions:** The skill did **not** transfer — SF's expanded digit span did not generalize to letters. Skilled memory is domain-specific by construction. Roughly 250+ hour-scale sessions were required. Yoon et al. (2018) examined performance after 30 years of disuse, indicating the structures degrade without maintenance.

→ **Practice implication:** Training must invest explicitly in building *domain-specific encoding vocabularies and retrieval structures* rather than trying to expand raw capacity, and must budget hundreds of sessions before elite-level span is expected in any one domain.

---

### 5. Self-explanation prompts: g = 0.55
**[ESTABLISHED]**

**Magnitude:** Bisra, Liu, Nesbit, Salimi & Winne (2018, *Educational Psychology Review*) — 69 effect sizes from 64 reports (~6,000 participants), random-effects: **g = 0.55**. 20 moderators coded (task type, subject area, education level, inducement type, treatment duration).

**Evidence quality:** High — recent, large, pre-specified moderator analysis.

**Boundary conditions:** Dunlosky et al. (2013) rated self-explanation and elaborative interrogation only **moderate utility**, because the evidence base at that time was narrower in materials and durations than for testing and spacing. Bisra et al. materially strengthens the case. Self-explanation is expensive per unit of material — it does not scale to bulk content the way retrieval practice does. Effects depend on the learner actually generating an explanation rather than reading a provided one (see #10).

→ **Practice implication:** Reserve self-explanation for the conceptual spine of a domain — the 10–20% of material where "why is this true / how does this connect" is the whole payload — and let retrieval practice carry the bulk.

---

### 6. The optimal spacing gap is a fixed *proportion* of the target retention interval — and expanding schedules have no reliable advantage over uniform ones
**[PROBABLE for the gap ratio; CONTESTED-RESOLVED-AS-NULL for expanding vs uniform]**

**Magnitude — gap ratio:** Cepeda, Vul, Rohrer, Wixted & Pashler (2008, *Psychological Science* 19:1095–1102, "Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention"): the inter-study interval producing maximal retention **increases as retention interval increases**. The optimum gap was approximately **20% of the test delay for delays of a few weeks, falling to about 5% at a one-year delay**. ⚠ (I could not open the full text; these ratios come from the abstract/summary and the companion Cepeda et al. 2006 review.) The function is a broad ridge, not a sharp peak — being somewhat off-optimum is cheap; being *massed* is expensive.

**Magnitude — expanding vs uniform:** Latimier et al. (2021) subset 2 — 54 effect sizes specifically testing expanding vs uniform spacing schedules under retrieval practice. The literature it aggregates does not support a reliable expanding advantage. Landauer & Bjork (1978) originally argued for expanding; later work repeatedly failed to replicate. Karpicke & Roediger (2007, "Is Expanded Retrieval Practice a Superior Form of Spaced Retrieval?") found a large *spacing* effect but **no benefit of expanded over equal-interval**, and in places a reliable benefit of **equal-interval over expanded**. Logan & Balota (2008) found the expanded-condition advantage was **lost after a 24-hour delay** in both younger and older adults, and expanded items were at a significant *disadvantage* for younger adults. Karpicke & Bauernschmidt / Kang et al. (2014, *Psychonomic Bulletin & Review*): expanding produced recall **equivalent** to equal-interval on a final test 8 weeks after training with foreign vocabulary spread over 4 weeks.

**Evidence quality:** Good. The expanding-vs-uniform question has been directly and repeatedly tested, which is why the null is credible rather than merely unproven.

**Boundary conditions:** Expanding schedules do produce higher *success rates during practice*, which matters for motivation and for avoiding failed-retrieval waste, and may matter more in clinical/impaired populations. The gap-ratio finding was established mostly with verbal paired-associate material over fixed retention intervals; a learner who wants *permanent* retention has no fixed RI, which weakens the direct applicability.

→ **Practice implication:** Set intervals from the retention horizon (roughly 10–20% of the target delay), and stop treating "expanding" as a magic property — the win is *that* you spaced, not the shape of the ladder. (Implementation in scheduling software is Agent 3's lane.)

---

### 7. Self-referential encoding is the strongest single encoding orientation: d ≈ 0.45
**[ESTABLISHED]**

**Magnitude:** Symons & Johnson (1997, *Psychological Bulletin* 121:371–394) — meta-analysis of 129 published studies using the self-reference paradigm, mean effect size **≈ 0.45**. ⚠ Conclusion: self-referential encoding is the most effective level of encoding for promoting memory, and the effect is robust across a wide range of experimental variations.

**Evidence quality:** High for the phenomenon. This sits inside the levels-of-processing framework (Craik & Lockhart) — shallow/structural < phonemic < semantic < self-referential — where the *ordinal* claim is robust even though "depth" was never independently operationalized, a long-standing circularity critique.

**Boundary conditions:** The comparison condition matters enormously — self vs *structural* encoding gives a large effect, self vs *semantic* encoding a much smaller one. Much of the effect is attributable to elaboration plus organization, not to a special self-system. Material that resists personal connection (arbitrary symbol strings, formal notation) gets little from it.

→ **Practice implication:** For every new concept, force one link to the learner's own experience, existing projects, or prior knowledge before it enters the review queue — this is nearly free and buys roughly half a standard deviation over semantic-only encoding.

---

### 8. Interleaving: g = 0.42 overall, but it is NOT universal — g = −0.39 for word learning
**[ESTABLISHED, with a hard boundary]**

**Magnitude:** Brunmair & Richter (2019, *Psychological Bulletin*, "Similarity matters: A meta-analysis of interleaved learning and its moderators") — 59 studies, 238 effect sizes nested in 158 samples. Overall **g = 0.42**. By material:
- Paintings / inductive category learning from visual exemplars: **g = 0.67**
- Mathematical tasks: **g = 0.34**
- **Words: g = −0.39 — blocking WINS.** ⚠

**Evidence quality:** High. Large, well-moderated, and the negative result for words is exactly the kind of finding that makes a meta-analysis trustworthy.

**Boundary conditions — this is the whole point:** Interleaving works when the learner's task is **discrimination between confusable categories**. It fails, and reverses, when the task is **associating a cue with a single response** (vocabulary, definitions, facts) where blocking supports the formation of a coherent representation. Firth et al. (2021, *Review of Education*) systematic review reaches compatible conclusions about scope. Dunlosky et al. (2013) rated interleaving only **moderate utility** for exactly this reason. Individual differences also moderate it (fluid intelligence has been reported as a moderator for perceptual category learning).

→ **Practice implication:** Interleave problem types, diagnostic categories, and anything requiring "which kind is this?" discrimination; block vocabulary, terminology, and one-to-one fact learning — applying interleaving universally makes a large chunk of the curriculum measurably worse.

---

### 9. Retrieval practice transfers — but only under specifiable conditions: d = 0.40 overall, d = 0.58 across test formats
**[ESTABLISHED]**

**Magnitude:** Pan & Rickard (2018, *Psychological Bulletin* 144:710–756) — 192 transfer effect sizes from 122 experiments in 67 articles, N = 10,382, spanning 40+ years. Random-effects: **d = 0.40, 95% CI [0.31, 0.50]** for transfer relative to a non-testing re-exposure control. Transfer was **greatest across test formats (d = 0.58)**, and to **application and inference questions and to problems**. ⚠ The authors propose a three-factor framework for predicting transfer efficacy.

**Evidence quality:** Highest available on this question — it is the definitive synthesis.

**Boundary conditions:** Transfer is substantially weaker than the direct testing effect (0.40 vs 0.50–0.61), and weakest to *untested materials* and to rearranged stimulus-response pairs. Retrieval practice does not automatically generalize; what you practise retrieving is roughly what you will be able to retrieve. This is the encoding-specificity / transfer-appropriate-processing principle (Tulving & Thomson, 1973) showing up as a quantitative ceiling.

→ **Practice implication:** Practise retrieval in the *format and direction* the material will actually be used in — and vary formats deliberately, since cross-format practice is where transfer is largest.

---

### 10. Generation beats reading: d = 0.40
**[ESTABLISHED]**

**Magnitude:** Bertsch, Pesta, Wiscott & McDaniel (2007, *Memory & Cognition* 35:201–210) — **445 effect sizes over 86 studies**, mean **d = 0.40** ("almost half a standard deviation of generation over reading"), with 11 moderators examined. ⚠

**Evidence quality:** High — very large effect-size base.

**Boundary conditions:** The generation effect is sensitive to **generation constraint** (later meta-analytic work on theories of the generation effect finds constraint matters); it is weaker or absent when the generated item cannot be produced (generation *failure* without feedback is worse than reading), and there are known list-composition effects where within-subject designs inflate it relative to between-subject designs. It overlaps conceptually with the testing effect and is not fully additive with it.

→ **Practice implication:** Never let the learner passively read a definition they could produce — convert every definition, derivation, and worked example into a produce-it-first prompt, with the answer available immediately afterward.

---

### 11. Encoding rate is limited by prior knowledge, not by capacity — and the advantage vanishes when structure is removed
**[ESTABLISHED — no standardized effect size located; ranked by evidence strength and design leverage]**

**Magnitude:** Chase & Simon (1973): chess experts recalled briefly-presented *game* positions dramatically better than novices, but showed **no significant advantage for randomly arranged pieces**. The superiority came from recalling **larger chunks** (more pieces per chunk), not from greater memory capacity. Gobet & Simon (1996) revisited and refined the chunking hypothesis (template theory). A meta-analysis of experts' memory for **domain-specific random material** finds a small residual expert advantage that generalizes across fields — so the original "no advantage at all" claim is slightly too strong. Complementary neuroscience: prior-knowledge structure enhances expert memory by **reducing interference** (PNAS, 2022).

**Evidence quality:** High and replicated across many expertise domains (chess, music, sport, medicine, programming).

**Boundary conditions:** Knowledge helps only for *structured* material within the domain. It can also **distort** encoding — schemas induce false memory for schema-consistent details that were not present. And it is circular for a beginner: you need knowledge to encode fast, and you need to encode to build knowledge.

→ **Practice implication:** Front-load a coarse structural schema of any new domain (its categories, its recurring patterns) before bulk memorization begins, because encoding rate for everything afterward is a function of that schema.

---

### 12. Forgetting follows a power function, not exponential decay — and what changes the rate is retrieval strength vs storage strength
**[PROBABLE on the functional form; the storage/retrieval distinction is CONTESTED as formal theory but ESTABLISHED as a descriptive regularity]**

**Magnitude:** Wixted & Ebbesen (1991, 1997): forgetting functions across many procedures are well described by a power function *at^−b*. Anderson & Tweney (1997) argued the power law is an artifact of arithmetically averaging individual curves that are truly exponential; Wixted & Ebbesen (1997, "Genuine power curves in forgetting") analysed **individual subject** forgetting functions and found them fit much better by a power than an exponential. Recent work (2023, *J. Math. Psych.*-adjacent) re-examines how averaging transforms curve shape — **the debate is live, not closed**. Murre & Dros (2015, *PLOS ONE*) successfully replicated Ebbinghaus's original savings curve. Practically: the exponential sheds a fixed fraction and drives retention to zero; the power function **bends and flattens**, preserving a long-lived remnant. That flattening is the entire economic case for spaced review.

**The rate-modifier:** Bjork & Bjork's New Theory of Disuse distinguishes **storage strength** (durability, only ever increases) from **retrieval strength** (current accessibility, rises and falls). Two asymmetric interactions: (a) the *higher* current storage strength, the *larger* the gain in retrieval strength from a restudy/retrieval event; (b) the *higher* current retrieval strength, the *smaller* the gain in storage strength from that event. This is the formal statement of "desirable difficulty": a retrieval that is currently easy teaches you almost nothing.

**Evidence quality:** Functional form — good empirical support, ongoing methodological dispute about averaging. Storage/retrieval strength — the framework is a descriptive model with wide explanatory reach but limited direct quantitative testing; treat it as an organizing principle, not a measured parameter. Bjork & Bjork (2020, "Desirable difficulties in theory and practice") is the accessible statement.

**Boundary conditions:** "Difficult" is not the same as "desirable." A difficulty is desirable only when it (a) engages additional retrieval/encoding processing and (b) is *surmountable* by the learner. Difficulty that produces retrieval failure, or that taxes a resource unrelated to the target learning, is simply harm. Bjork's own framing: desirable difficulties become undesirable when the learner lacks the background knowledge to respond to them successfully.

→ **Practice implication:** Time every review to the point where recall is effortful but still succeeds — reviewing while retrieval strength is still high is nearly wasted, and reviewing after total loss is re-learning from scratch.

---

## Honourable mentions and explicit non-findings

- **Successive relearning** (retrieval practice to a criterion of correct recalls, repeated across spaced sessions) — Rawson & Dunlosky (2013, *Educational Psychology Review*; 2022, *Current Directions*). Reported: retention 30 days after last session of **56% after two relearning sessions and 83% after five**; classroom application improved exam performance by **more than a full letter grade**. Notably, raising the *within-session* criterion from 1 to 3 correct recalls improved 1-week retention but the advantage **disappeared after three successive relearning sessions** — sessions beat within-session repetitions. **[ESTABLISHED]** → **Practice implication:** Use one correct recall per session as the criterion and add sessions rather than piling repetitions into a single day.
- **Picture superiority / dual coding.** The phenomenon is robust; the *dual-coding explanation* is now contested — Higdon, Neath, Surprenant & Ensor (2025) argue distinctiveness, not dual coding, explains it, and picture superiority is **preserved in aphantasia** at nearly identical effect size, which is hard to reconcile with a visual-imagery account. **[CONTESTED mechanism, ESTABLISHED phenomenon]** → **Practice implication:** Use images because they work, not because of an imagery theory, and do not assume vividness of mental imagery predicts benefit.
- **Feedback timing.** No clean answer. A 2026 meta-analysis (51 studies, 160 effect sizes, 1988–2024) finds both immediate and delayed feedback beat no-feedback and restudy, with timing effects moderated by task difficulty in a non-monotonic way. Some sources report immediate feedback superior for long-term retention; others report short delays superior for medium-difficulty tasks. **[CONTESTED]** → **Practice implication:** Give feedback always, and do not spend design effort optimizing its delay.
- **Dunlosky, Rawson, Marsh, Nathan & Willingham (2013)** ranking, as the meta-frame: **high utility — practice testing, distributed practice**; **moderate — elaborative interrogation, self-explanation, interleaved practice**; **low — summarization, highlighting, keyword mnemonic, imagery for text, rereading**. The 2013 low ratings for elaborative interrogation/self-explanation should be revised upward given Bisra et al. (2018). The **low rating for rereading and highlighting has not been overturned by anything since.**

---

## Bibliography (sources surfaced and read via search returns; full texts blocked by egress policy — see disclosure)

- Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the Use of Tests: A Meta-Analysis of Practice Testing. *Review of Educational Research*. https://journals.sagepub.com/doi/abs/10.3102/0034654316689306
- Bertsch, S., Pesta, B. J., Wiscott, R., & McDaniel, M. A. (2007). The generation effect: A meta-analytic review. *Memory & Cognition*, 35, 201–210. https://link.springer.com/article/10.3758/BF03193441
- Bisra, K., Liu, Q., Nesbit, J. C., Salimi, F., & Winne, P. H. (2018). Inducing Self-Explanation: a Meta-Analysis. *Educational Psychology Review*. https://link.springer.com/article/10.1007/s10648-018-9434-x
- Bjork, R. A., & Bjork, E. L. (2020). Desirable difficulties in theory and practice. https://www.waddesdonschool.com/wp-content/uploads/2021/02/Desriable-Difficulties-in-theory-and-practice-Bjork-Bjork-2020.pdf
- Brunmair, M., & Richter, T. (2019). Similarity matters: A meta-analysis of interleaved learning and its moderators. *Psychological Bulletin*. https://www.semanticscholar.org/paper/bb5392e8eaf53a38cc0d147f301cce74cecb4436
- Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. *Psychological Bulletin*. https://www.yorku.ca/ncepeda/publications/CPVWR2006.html
- Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing effects in learning: A temporal ridgeline of optimal retention. *Psychological Science*, 19, 1095–1102. https://files.eric.ed.gov/fulltext/ED505660.pdf *(blocked; cited from abstract/summary)*
- Chase, W. G., & Ericsson, K. A. (1981/1982). Skilled memory / Skill and working memory. Summarized at http://www.jimdavies.org/summaries/chase1982.html
- Chase, W. G., & Simon, H. A. (1973). Perception in chess. Discussed in Gobet & Simon (1996), Expert chess memory: revisiting the chunking hypothesis. https://pubmed.ncbi.nlm.nih.gov/9709441/
- Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences*. https://www.cambridge.org/core/services/aop-cambridge-core/content/view/44023F1147D4A1D44BDC0AD226838496/S0140525X01003922a.pdf
- Craik, F. I. M., Govoni, R., Naveh-Benjamin, M., & Anderson, N. D. (1996). The effects of divided attention on encoding and retrieval processes in human memory. *JEP: General*. https://www.researchgate.net/publication/14518954
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving Students' Learning With Effective Learning Techniques. *Psychological Science in the Public Interest*. https://journals.sagepub.com/doi/abs/10.1177/1529100612453266 ; summary at https://www.aft.org/ae/fall2013/dunlosky
- Ericsson, K. A., & Staszewski, J. (1989). Skilled memory and expertise. https://apps.dtic.mil/sti/tr/pdf/ADA193829.pdf
- Firth, J., et al. (2021). A systematic review of interleaving as a concept learning strategy. *Review of Education*. https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/rev3.3266
- Higdon, K. F., Neath, I., Surprenant, A. M., & Ensor, T. M. (2025). Distinctiveness, not dual coding, explains the picture-superiority effect. *QJEP*. https://journals.sagepub.com/doi/10.1177/17470218241235520
- Kang, S. H. K., Lindsey, R. V., Mozer, M. C., & Pashler, H. (2014). Retrieval practice over the long term: Should spacing be expanding or equal-interval? *Psychonomic Bulletin & Review*. https://pubmed.ncbi.nlm.nih.gov/24744260/
- Karpicke, J. D., & Aue, W. R. (2015). The Testing Effect Is Alive and Well with Complex Materials. *Educational Psychology Review*. https://link.springer.com/article/10.1007/s10648-015-9309-3
- Karpicke, J. D., & Roediger, H. L. (2007). Is expanded retrieval practice a superior form of spaced retrieval? http://psychnet.wustl.edu/coglab/wp-content/uploads/2015/01/2007-Is-expanded.pdf
- Kliegl, R., et al. (1987). Mnemonic training for the acquisition of skilled digit memory. https://gwern.net/doc/psychology/neuroscience/memory/1987-kliegl.pdf
- Latimier, A., Peyre, H., & Ramus, F. (2021). A Meta-Analytic Review of the Benefit of Spacing out Retrieval Practice Episodes on Retention. *Educational Psychology Review*, 33(3), 959–987. https://link.springer.com/article/10.1007/s10648-020-09572-8
- Logan, J. M., & Balota, D. A. (2008). Expanded vs. equal interval spaced retrieval practice. *Aging, Neuropsychology, and Cognition*. https://pubmed.ncbi.nlm.nih.gov/18421627/
- Murre, J. M. J., & Dros, J. (2015). Replication and analysis of Ebbinghaus' forgetting curve. *PLOS ONE*. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644 *(blocked; cited from secondary summary)*
- Naveh-Benjamin, M., Craik, F. I. M., Perretta, J. G., & Tonev, S. T. (2000). The effects of divided attention on encoding and retrieval processes: the resiliency of retrieval processes. https://pubmed.ncbi.nlm.nih.gov/10994220/
- Pan, S. C., & Rickard, T. C. (2018). Transfer of test-enhanced learning: Meta-analytic review and synthesis. *Psychological Bulletin*, 144(7), 710–756. https://www.researchgate.net/publication/324995852
- Rawson, K. A., & Dunlosky, J. (2013). The power of successive relearning. *Educational Psychology Review*. https://link.springer.com/article/10.1007/s10648-013-9240-4 ; and (2022) *Current Directions in Psychological Science*. https://journals.sagepub.com/doi/full/10.1177/09637214221100484
- Rowland, C. A. (2014). The effect of testing versus restudy on retention: A meta-analytic review of the testing effect. *Psychological Bulletin*. https://www.researchgate.net/publication/264988491
- Symons, C. S., & Johnson, B. T. (1997). The self-reference effect in memory: A meta-analysis. *Psychological Bulletin*, 121, 371–394. https://pubmed.ncbi.nlm.nih.gov/9136641/
- Tulving, E., & Thomson, D. M. (1973). Encoding specificity and retrieval processes in episodic memory. https://en.wikipedia.org/wiki/Encoding_specificity_principle
- van Gog, T., & Sweller, J. (2015). Not new, but nearly forgotten: The testing effect decreases or even disappears as the complexity of learning materials increases. *Educational Psychology Review*, 27(2), 247–264.
- Wixted, J. T., & Ebbesen, E. B. (1997). Genuine power curves in forgetting. *Memory & Cognition*. http://wixtedlab.ucsd.edu/publications/wixted/Wixted_and_Ebbesen_(1997).pdf
- Yoon, J.-S., et al. (2018). Effects of 30 years of disuse on exceptional memory performance. *Cognitive Science*. https://onlinelibrary.wiley.com/doi/full/10.1111/cogs.12562
