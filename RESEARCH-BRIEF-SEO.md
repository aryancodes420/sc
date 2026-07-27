# RESEARCH BRIEF — SEO, competitors and AI search

> **For the next builder session.** Self-contained. Commissioned by the owner
> (Aryan Sarna) on 2026-07-27, written by the session that could not do this work
> itself because its network policy blocked every competitor host.
>
> **Branch:** `claude/dog-nook-files-review-6w9kwr` — commit everything here.

---

## 0. Do this before anything else

**Test whether you can actually reach the open web.** The previous two research
passes on this project both produced *blind* competitor analysis because the
environment blocked outbound requests, and neither said so loudly enough up front.

Run this first:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" -L --max-time 20 https://myanxiousdog.co.uk/
curl -sS -o /dev/null -w "%{http_code}\n" -L --max-time 20 https://www.poochandmutt.co.uk/
```

- **`200` on both** → you can do the real job. Proceed to §2.
- **`403` / `CONNECT tunnel failed`** → you are as blocked as I was.
  **Stop and tell the owner immediately.** Do not produce another blind teardown
  and present it as competitor analysis. Say plainly: *"I can't reach competitor
  sites either; here is what I can and can't do."* Then do §3 and §6 only, which
  work from search results alone, and mark everything accordingly.

This one check is the difference between the brief being worth doing and it being
the third round of guesswork.

---

## 1. Context — what this business is

The Dog Nook (`thedognook.co.uk`) — a UK Shopify store selling comfort and
enrichment products for anxious dogs: calming beds, dens, coats, snoods, lick mats,
snuffle mats, plus bundled "kits". Dropshipped via CJdropshipping. One person.

**State:** not published. Every product has zero images. Draft theme
`193158119707` holds unreleased CRO work.

**Goal:** £100,000 net profit in twelve months. The model
(`growth/GROWTH-PLAN.md`) says that needs ~2,600 orders at ~£80 average, and that
**two levers decide it: average basket size and the share of traffic the business
owns rather than rents.** SEO is the main engine of the second lever. That is why
this research matters — it is not a nice-to-have, it is one of the two things the
whole plan rests on.

**The anchor date:** Bonfire Night, **Thursday 5 November 2026**. 41% of UK dogs
show firework fear — about 4.1 million dogs (PDSA PAW Report). Content published in
August can rank by mid-October. Content published in October cannot. **Speed on the
fireworks portion of this brief matters more than completeness.**

---

## 2. What is already known — and what "deeper" means

The owner has explicitly asked that you find the existing work and then **go
considerably deeper than it.** Read these first:

| File | What it gives you |
|---|---|
| `audit/03-competitor-benchmark.md` | The named competitor set. **Read the constraint note at the top** — these sites were never actually opened. |
| `audit/14-source-register.md` | The sources behind that benchmark |
| `growth/content/SEO-PLAN-AND-ARTICLES.md` | Keyword map + the five draft articles you will be rewriting |
| `growth/content/SEO-STRATEGY-AND-COMPETITOR-TEARDOWN.md` | My SERP-level analysis and the article template. Everything marked `[SERP]` is inference from search results, not from reading pages. **Verify it; overturn it where it's wrong.** |
| `growth/GROWTH-PLAN.md` | Why traffic you own matters more than traffic you buy |

**The competitor set already named** (none of them actually opened):

| Site | Why it was chosen |
|---|---|
| **My Anxious Dog** — myanxiousdog.co.uk | Closest direct comparable; an entire UK brand built around nervous dogs |
| **Lords & Labradors** — lordsandlabradors.co.uk | Runs an "Anxious Pet" problem-based collection |
| **FunnyFuzzy** — funnyfuzzy.co.uk | DTC pet brand with a real education blog |
| **Pets at Home** — petsathome.com | The trusted incumbent a buyer compares against |
| **Millbry Hill / DryDogs / ZOOMADOG** | Price and feature reference points |

**Plus the ones I found ranking** (also never opened): Dorwest, Adaptil, Beaphar,
Pooch & Mutt, ThunderShirt, Canine Natural Cures, SupplementsWise, VioVet — and the
informational incumbents Dogs Trust, PDSA, RSPCA, The Kennel Club.

### What "deeper" specifically means
1. **Actually open every one of them.** That alone exceeds both prior passes.
2. **Find the ones nobody has named yet.** The owner explicitly wants this. Small UK
   shops that don't rank yet still teach you positioning, pricing and photography.
   Hunt them in: Reddit (r/dogs, r/DogAdvice, r/DogsUK, r/RescueDogs), Instagram and
   TikTok hashtags (#anxiousdog #rescuedoguk #dogenrichmentuk), Etsy UK, Not On The
   High Street, Trustpilot's pet-supplies category, and Google Shopping for the
   product terms in §3.
3. **Go past the homepage.** The blog index, the top-traffic articles, the collection
   architecture, the PDP structure, the email capture, the schema in the page source.

---

## 3. The research jobs

Do them in this order. **Job A is the time-critical one** — if you only finish one,
finish A.

### JOB A — Fireworks keyword and SERP map ⏱ do first

For each of these seed terms, record who ranks in the **UK top 10**, what page *type*
ranks (article / collection / product / charity guide / forum), and which SERP
features appear (AI Overview, People Also Ask, shopping carousel, video):

```
dog scared of fireworks
how to calm a dog during fireworks
best products for dogs scared of fireworks uk
fireworks kit for dogs
what to buy for a dog scared of fireworks
dog anxiety coat uk
dog snood for fireworks
calming bed for anxious dog uk
how to prepare a dog for bonfire night
dog firework anxiety without medication
```

**Deliver:** a table of `keyword | est. volume | difficulty | who ranks 1–3 | page type | SERP features | winnable Y/N | our target page`.

**The specific hypothesis to test.** My SERP-level read was that informational terms
are owned by charities (Dogs Trust, PDSA, RSPCA, Kennel Club) and are unwinnable in
year one, while commercial terms have a completely different ranking set with no
charities in it and are winnable. **Confirm or kill this.** If I'm wrong, the entire
content strategy changes and you should say so bluntly.

**Also capture:** every People Also Ask question for these terms. Those become the
FAQ blocks, and FAQ blocks are what AI engines quote.

### JOB B — Deep competitor teardown

For each competitor (the named set plus everything new you find), record:

- **Blog:** how many posts, publishing frequency, which posts get the most engagement
- **Their best-performing pages** (if you have a tool that shows this)
- **Article anatomy on their top 2 posts:** word count, exact heading structure, where
  the first product link falls, FAQ present?, author byline?, dates shown?, schema
  types in the source
- **Site architecture:** how collections are organised — by product type or by problem
- **PDP structure:** how many images, video?, reviews and count, size guide?, spec
  table?, delivery promise wording
- **Email capture:** popup? quiz? discount offered? what %?
- **Pricing** on directly comparable items — calming bed, coat, snood, lick mat,
  snuffle mat — and whether anyone else sells *kits* and at what price
- **Trust layer:** Trustpilot score and volume, review app used, guarantee wording
- **Schema:** view source, list every JSON-LD type present

**Deliver:** one row per competitor in a comparison table, plus a short written
teardown of the three closest comparables.

**Then answer the two questions that actually matter:**
1. **What is everyone doing that we are not?** — the table of stakes.
2. **What is nobody doing?** — the opening. My hypothesis is that every commercially
   ranking brand sells supplements or pheromones, and nobody sells a curated kit of
   *physical comfort* items from a small UK brand that refuses to make health claims.
   Verify it properly.

### JOB C — Evergreen keyword map

Same treatment as Job A for: rescue-dog settling, separation anxiety, enrichment
(snuffle/lick mats), sizing and buying guides.

```
how long does it take a rescue dog to settle
rescue dog won't sleep / won't lie down
first night with a rescue dog
dog pacing when left alone
separation anxiety dog uk
what is a snuffle mat for
lick mat benefits for dogs
how to measure a dog for a bed
do calming coats actually work
best enrichment toys for anxious dogs uk
```

**Deliver:** same table format, plus a **topic-cluster map** — which pillar page each
article supports and how they link to each other. Topical authority comes from the
cluster, not from individual posts.

### JOB D — AI search / GEO audit

The store starts with zero domain authority, and AI answer engines weight authority
far less than Google does. This is realistically the **fastest** route to visibility.

1. **Ask each engine directly** — ChatGPT, Claude, Perplexity, Google AI Overviews,
   Gemini — these questions, and record verbatim which brands and sources get named:
   ```
   What should I buy for a dog scared of fireworks in the UK?
   Best calming bed for an anxious dog UK
   How do I help a rescue dog settle in?
   Do calming coats work for dogs?
   ```
2. **Work out where those citations come from.** Reddit threads? Brand blogs?
   Charity pages? YouTube? This tells you where to actually spend effort.
3. **Verify the Reddit finding.** My research says ~97% of discussion sources in AI
   shopping results come from Reddit, and that domains with genuine community
   presence are ~4× more likely to be cited. Sanity-check it against what you observe.
4. **Audit our technical readiness:** does `robots.txt` allow `GPTBot`,
   `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`? Is there an
   `llms.txt`? What schema does the theme emit today?

**Deliver:** a GEO action list, ordered by impact-per-hour.

### JOB E — Platform and distribution research

Where should this content live besides the Shopify blog? Establish with evidence,
not assumption:
- Which subreddits allow disclosed brand participation, and what their self-promotion
  rules actually say
- Whether UK dog-anxiety content performs on Pinterest (seasonal checklists) and
  YouTube
- Which UK pet blogs accept guest posts — a backlink list with contact routes
- Whether Google Business Profile is available to an online-only trader

---

## 4. Should the owner buy an SEO tool?

He asked. **My recommendation: yes, but only for one month, and only when you are
ready to actually use it.**

The reasoning: he needs this data **once**, to build the plan. He does not need
continuous rank tracking for a store that isn't live. Paying £80–£100 a month
indefinitely at this stage is money that competes directly with ad spend and with
the working capital the model says he needs in October.

**So:** take one month of a mid-tier plan on Ahrefs or Semrush at the point you
start Job A, use it hard for that month, **export everything to CSV into
`growth/content/data/`**, then cancel. Afterwards Google Search Console is free and
does the ongoing job — once the site is live and has traffic, GSC is better than any
paid tool for telling you what *you* actually rank for.

**Check current pricing yourself before recommending a specific plan** — I have not
verified 2026 prices and should not guess at them. Report the actual cost and the
cheapest tier that includes keyword difficulty scores and competitor top-pages.

**If he'd rather spend nothing:** Google autocomplete, People Also Ask, Google Trends
(good for confirming the October seasonality curve), Reddit and forum mining, and the
free tiers of Ubersuggest / Keywords Everywhere will get you perhaps 70% of the way.
The ranking *decisions* barely change — what you lose is precision on volume, which
mostly affects sequencing, not selection. Say so honestly rather than insisting on
the tool.

---

## 5. What to build after the research

The owner wants publish-ready output, not a report he then has to act on.

1. **Rewrite the five articles** in `growth/content/SEO-PLAN-AND-ARTICLES.md` to
   whatever structure the research shows actually wins. My proposed template is in
   `SEO-STRATEGY-AND-COMPETITOR-TEARDOWN.md` §5 — TL;DR block under the H1, visible
   author and dates, question-shaped headings, one product link ~60% down, an FAQ
   block, a "what doesn't help" section. **Treat it as a hypothesis, not an
   instruction.** If the teardown shows something different wins, do that and explain
   why.
2. **Write 3 more articles** targeting the highest-value winnable terms Job A finds.
3. **Add FAQPage JSON-LD** to `dog-nook-theme/snippets/dog-nook-jsonld.liquid`. It
   already emits Product, Offer, Organization, WebSite and Article. FAQPage is the
   gap, and it is the highest-impact schema type for AI citation.
4. **Create `llms.txt`** and confirm `robots.txt` permits the AI crawlers.
5. **A dated publishing calendar** running to 5 November, built backwards from the
   8–12 week ranking lag.

⚠️ **Read `HANDOFF.md` §3 and §5 before touching any theme file.** There is a
deploy-size trap (hand-emitted base64 over ~10KB corrupts) and a CSS link-colour trap
that will silently make new components invisible. Both have bitten previous sessions.

---

## 6. Rules that are not negotiable

These come from the owner's own working agreements and from UK law. They have held
across every session on this project.

1. **Never fabricate a review, rating, testimonial, statistic or competitor figure.**
   If you could not verify it, say you could not verify it. The previous two research
   passes produced blind analysis; the failure was not the blindness, it was how
   quietly it was disclosed.
2. **Never make a health or medical claim.** "Many owners find this helps" — never
   "clinically proven", never "cures anxiety". This is the ASA/CMA line, the brand
   line, and the Meta-ad-account line all at once.
3. **Urgency must be real.** The owner has asked for aggressive use of urgency and
   countdowns, and that is fine — tied to the genuine Bonfire Night dispatch
   cut-offs (GB warehouse **Fri 24 Oct**, China direct **Wed 15 Oct**). No invented
   stock counters, no resetting timers, no "was" prices that were never charged.
   DMCC 2024 and CMA enforcement make the fake versions a real liability.
4. **No astroturfing.** If community participation is part of the plan — and the AI
   research suggests it should be — it is the owner posting as himself with the shop
   disclosed. Buying or faking community presence contradicts the entire brand
   position and is the fastest way to destroy it.
5. **Mark your evidence.** `[Src]` cited, `[Obs]` directly observed, `[Judg]` your
   reasoning. Use them inline. It is what lets the owner tell fact from inference.
6. **Never publish the theme.** That is the owner's click, always.

---

## 7. Deliverables

Commit to `claude/dog-nook-files-review-6w9kwr`:

```
growth/content/
  KEYWORD-RESEARCH.md          Jobs A + C — the full keyword tables and cluster map
  COMPETITOR-TEARDOWN.md       Job B — per-competitor detail and the two answers
  AI-SEARCH-GEO-PLAN.md        Job D — verbatim AI answers + the action list
  DISTRIBUTION-PLAN.md         Job E — platforms, subreddits, guest-post targets
  SEO-PLAN-AND-ARTICLES.md     rewritten: 5 articles restructured + 3 new
  CONTENT-CALENDAR.md          dated to 5 November
  data/                        raw CSV exports from any tool used
dog-nook-theme/snippets/
  dog-nook-jsonld.liquid       + FAQPage schema
```

Then add a dated entry to `HANDOFF.md` §10 recording what you did and what you found.

**Open with a one-page summary for the owner** at the top of `KEYWORD-RESEARCH.md`:
the five things he should do first, in plain English, no jargon. He has told us
directly that he doesn't know the vocabulary yet and wants to be taught rather than
handed a spreadsheet. Write for that.

---

## 8. What success looks like

A person who has never done SEO can read your summary and know:
- **which ten phrases** to aim at, and which to give up on
- **why** each one is winnable, in a sentence
- **what shape** an article has to be to win
- **where to post** besides his own site
- **what to do this week** to start showing up in ChatGPT

If your output doesn't do those five things in plain English, it isn't finished —
however good the underlying research is.
