# 11 — Organic traffic playbook: TikTok, Instagram, Facebook, Reddit and TikTok Shop UK

Researched 26 September 2026 for Catwalk Club (UK Shopify store, seven launch products £7.99–£17.99 plus four bundles, goal £100,000 net profit in the 12 months to September 2027). Written for a first-time creator with a phone, two or three cats, unlimited hours, no ad budget, and the seven products: Bow Tie Collar ("Reginald"), Bandana Collar ("Roadie", UK-stocked dropship), Lion Mane ("Kingsley"), Devil Bat Cape ("Vlad"), Spider Costume ("Boris"), Pumpkin Hat & Ruffle Collar ("Pip"), Santa Hat & Scarf Set ("Nick"). Every figure is tagged **VERIFIED** (fetched today, URL or file given) or **ESTIMATED** (method stated). UK spelling. Day 1 of the 30-day calendar is Sunday 27 September 2026; the Halloween order-by date in `data.js` is 14 October (Day 18).

Working files: `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/org/` (`tag_*.json` and `tt_all_items.json` = 921 TikTok posts with stats, `tt_*.html`/`tt2_*.html` = profile JSON, `yt_*.html` and `yt_rows.json` = YouTube, `rr_*_rules.json` = subreddit rules, `ar_*.txt` = TikTok Shop UK Seller Academy articles, `pw_*.js` = the Playwright scripts).

## 0. The eight findings that matter

1. **The cat-costume feed on TikTok is already in its Halloween ramp and the owner is late but not too late.** Of 921 unique posts pulled from seven hashtag feeds (plus 115 more from #catcostume, captured separately), 268 were posted in the first 26 days of September 2026 against 101 in August and 36 in July; last year's peak month was October (80 of the sampled posts). Posting has to start this week, not when the stock lands. VERIFIED (§2.1).
2. **Short, original-sound, single-cat clips are the unit of currency.** Median post length in the eight feeds is 12–17 s; 621 of 921 posts use "original sound" (the phone mic) and those posts have a median of 27,100 plays against 7,400 for posts on a licensed track. Median plays across all 921 posts: 17,400; the top 10% clear 1.6 million; 35% clear 100,000. A phone, a cat and no editing is the format that wins. VERIFIED (§2.1).
3. **Accounts that sell pet costumes on TikTok are tiny and still get millions of plays — with one specific mechanic.** @hollowride0 (7,225 followers, 7 videos) has an 8.0M-play post captioned `Comment "HORSEMAN" if you want one 🔗 LINK IN BIO`; @petfrightt (5,207 followers, 110 videos, bio "Order by Oct 8 for Halloween delivery") has three posts over 1M in the last four weeks; @batwhiskers (635 followers, 4 videos) has a 182K post. The mechanic is the *comment-keyword CTA* (a keyword comment that triggers a DM with the link) plus a single-product link in bio. Seller-style captions do carry a cost: median plays 4,952 vs 18,700 for owner-style captions, and a 2.7% like rate vs 7.6%. VERIFIED (§2.2).
4. **The brands in 03/04/08 that post product-only content get nothing: Made By Cleo 3,984 followers from 104 videos, Cheshire & Wain 671 from 333, Pipkin and Bella 242 from 228, Kittyrama 171 from 253.** The pet accounts that do work are *character* accounts (a named cat with a personality: @sunkittencats 1.3M, @louieandtodd 795K, @malpluscats 501K, @winwinrescue 75.8K "a real cat that really likes to dress up and walk the Catwalk"). Catwalk Club's edge is that it can be both: a character account whose characters happen to wear the products, with the founder on camera. VERIFIED (§2.3).
5. **On YouTube Shorts the format that travels is the owner's honest try-on, not the catalogue.** "Dressing Up My ADORABLE Cat for Halloween?!" (Sticki Rolls, 31 Oct 2024) 5.68M views; "Uno picks out a Halloween costume at PetSmart" 3.77M; "my cat Uno tries on Halloween costumes" 1.09M; Chewy's paid creator Shorts on a sphynx cat 1.41M and 347K. Product-listing Shorts from sellers sit at 15–156K with 1–2K likes. VERIFIED (§2.4).
6. **Reddit is not a traffic channel for a seller; it is a photo-posting and listening channel.** r/cats bans "advertising, self-promotion, or fundraising of any kind"; r/CatAdvice removes "affiliate links, advertising products, or sales of any kind" but allows "recommending someone a specific product relevant to their question"; r/catpictures requires content you own; r/AskUK removes product-recommendation questions; r/CasualUK requires mod pre-approval for ads or referral links. The only lawful, ban-proof use is posting the owner's own cats as a member and answering fit and safety questions with no link. VERIFIED (§6).
7. **TikTok Shop UK costs 9% of the order (VAT-inclusive), nothing up front, pays out on an 8-day standard settlement (31 days for new "introductory" sellers), and requires Royal Mail Tracked 24/48 for seller-shipped orders — 2nd Class untracked is not accepted.** Free and refundable creator samples, open and targeted affiliate plans, a daily cap of 25 shoppable videos per account, and a 7-day reduced-visibility penalty for non-compliant videos are all documented. A sole trader registers with a UK-issued passport or driving licence, a selfie video, a bank account in the same name and proof of address under 3 months old. VERIFIED (§7).
8. **The maths of organic → own-site traffic is brutal, which is why TikTok Shop matters.** A bio-link click-through of 0.3–1% of views (ESTIMATED) at the 1.5% site conversion in 01-maths means 100 orders a month needs roughly 0.7–2.2 million views a month arriving on the site. In-app checkout removes the link click. List on TikTok Shop UK before the 14 October cutoff and treat the own site as the place for bundles, the Christmas set and repeat buyers. ESTIMATED from VERIFIED inputs (§8).

---

## 1. What was fetched, and what was not

| Source | Method | Result |
|---|---|---|
| TikTok hashtag feeds `#cathalloweencostume`, `#catcostumes`, `#catbowtie`, `#catcollar`, `#petcostume`, `#catsinclothes`, `#catoutfit` (pooled, 921 posts) and `#catcostume` (separate run, 115 posts) | Playwright Chromium on `https://www.tiktok.com/tag/<tag>`, capturing the page's own `/api/challenge/item_list` responses while scrolling (no login, no captcha bypass) | **921 unique posts** with caption, hashtags, create time, duration, sound, play/like/comment/share counts. VERIFIED. Region of creator is not in the response, so no UK split. Hashtag totals ("N posts") did not render. |
| TikTok profiles: madebycleo, sassywoof, pandaloon, cheshireandwain, furmilyuk, amyspetsupplies, pipkin_and_bella, supakitstore, petcostumecenter, sweetpicklesdesigns, petfrightt, hollowride0, batwhiskers, spookpaws.co, handyfindsstore, sunkittencats, withpyaari, cashs.dad3, tabbykatbros, malpluscats, caitlinfv, winwinrescue, louieandtodd | curl with a desktop UA; `__UNIVERSAL_DATA_FOR_REHYDRATION__` JSON | Follower, like and video counts, bio, bio link, `ttSeller` flag. VERIFIED. **Per-profile video lists are blocked** ("Something went wrong" without login) — the hashtag feeds were used instead. |
| TikTok search and Creative Center trend APIs | curl / Playwright | Search renders an empty shell without login; Creative Center hashtag/sound endpoints return `40101 no permission`. Blocked, not bypassed. |
| YouTube Shorts search for six terms; 14 watch pages | curl, `ytInitialData` and page metadata | Titles, view counts, dates, channel subscriber counts. VERIFIED. Six watch pages hit Google's bot check (302). |
| TikTok Shop UK Seller Academy (seller-uk.tiktok.com) | Playwright search → article click (login not required for articles) | 14 articles read: commission, commission by category, registration guide (25 Jun 2026), registration policy (8 Sep 2026), settlement (29 May 2026), free samples (8 Jun 2025), samples seller's guide, affiliate commission settings, open plan, find creators, shoppable videos (29 Apr 2026), story-driven shoppable video course, finance FAQs (affiliate invoices, free-sample invoices), shipping-label search results. VERIFIED. |
| Reddit rules for r/cats, r/CatAdvice, r/catpictures, r/AskUK, r/CasualUK, r/UKPets | Playwright: load the subreddit, then in-page `fetch('/r/<sub>/about/rules.json')` | Full rule text for five subs; r/UKPets has no rules set. VERIFIED. Direct curl and old.reddit return 302/403. |
| Instagram (madebycleo, sassywoof, cheshireandwain, furmilyuk, pandalooncom) | curl and Playwright | 302/429/`ERR_HTTP_RESPONSE_CODE_FAILURE`; one 636 KB login shell with no counts. **Blocked.** Instagram follower figures in this file are the ESTIMATED snippet figures carried from 03/04. |
| Facebook groups | curl | HTTP 400. **Blocked.** The Facebook-group approach in §6 is ESTIMATED from platform rules as generally published, and each group's own rules must be read by the owner before posting. |
| Search engines for discovery | DuckDuckGo HTML/lite (captcha), Bing RSS (generic results), Qwant (JS-only), Brave (429), Ecosia (403), Startpage (303) | Unusable from this egress. Discovery came from the TikTok feeds and YouTube search directly. |

---

## 2. What performs now — the evidence

### 2.1 The TikTok hashtag feeds (921 posts, VERIFIED)

| Feed | Posts captured | Median plays | 75th pct plays | Best post | Median length | ≤15 s | >60 s | Original sound | Posted Aug 2026 / Sep 2026 (to 26th) |
|---|---|---|---|---|---|---|---|---|---|
| #catcostume (captured in a separate run; not in the 921 pool) | 115 | 101,300 | 698,800 | 13.2M (@notnataliereynoldss, human Cat-in-the-Hat) | 13 s | 74 | 17 | 65 | 10 / 30 |
| #cathalloweencostume | 139 | 31,200 | 199,100 | 10.7M (@sunkittencats "bert in boots") | 13 s | 92 | 16 | 88 | 9 / 50 |
| #catcostumes | 133 | 63,100 | 596,700 | 13.2M (human costume) | 12 s | 96 | 16 | 85 | 17 / 63 |
| #catbowtie | 171 | 1,560 | 25,700 | 129.4M (@jayduran1989, siamese in a bow tie, 7 s) | 13 s | 108 | 9 | 103 | 18 / 60 |
| #catcollar | 178 | 11,800 | 167,600 | 13.2M (@caitlinfv, smart laser collar, seller) | 16 s | 85 | 32 | 115 | 22 / 33 |
| #petcostume | 173 | 48,500 | 728,800 | 33.1M (pug, Brazil) | 17 s | 86 | 36 | 122 | 21 / 42 |
| #catsinclothes | 180 | 64,800 | 793,000 | 58.1M (@withpyaari, cat in a sari) | 13 s | 101 | 29 | 137 | 23 / 40 |
| #catoutfit | 144 | 70,300 | 513,900 | 12.4M (@malpluscats, storytelling) | 13 s | 97 | 21 | 112 | 23 / 60 |
| **All 921 unique (seven feeds below #catcostume)** | 921 | **17,400** | — | — | — | **57%** | **15%** | **621 (67%)** | **101 / 268** |

Reading, all VERIFIED unless stated:

- **Length.** 0–10 s posts (n=306) have a median of 13,600 plays and 12% clear 1M; 16–20 s (n=79) median 23,600 and 19% clear 1M; 61 s+ (n=139) median 56,900 and 19% clear 1M. Two winning shapes: a 7–20 s single-gag clip, or a 60–120 s storytelling piece (the @malpluscats and @withpyaari posts). Nothing in between does better. The plan below uses 8–20 s for product clips and 60–90 s for the weekly "story" post.
- **Sound.** 67% of posts use the phone's own audio ("original sound"), with a 3.7× higher median than licensed tracks. Only two licensed sounds recur in the top 230: "Halloween ・ cute horror song — PeriTune" (4 posts) and "Somebody's Watching Me — Rockwell" (3, all one seller). There is no "sound to ride"; the owner's voice and the cat's noises are the sound.
- **Hashtags in the top 200:** #catsoftiktok 53, #cat 46, #fyp 43, #halloween 38, #cats 23, #costume 19, #catlover 15, #halloweencostume 15, #kitten 14, #cattok 11, #cutecat 11, #catcostume 10, #petcostume 9, #catmom 8, #blackcat 8. Five tags is the norm; #catsoftiktok + #cattok + one occasion tag + one product tag + #fyp is the pattern.
- **Captions in the top 200:** 148 are a plain statement in the cat's or owner's voice ("She definitely hated being a spider. Scared the life out of my roommate"), 23 are a question ("Which of my outfits do you like best?", "Be honest is it spooky?"), 14 are hashtags only, 3 open with a CTA. Questions get comments: @cashs.dad3's "Which of my outfits do you like best?" has 13,400 comments on 3.2M plays (0.42%, 6× the feed median of 0.07%).
- **Timing.** The seven feeds show 11 posts in Sep 2025, 80 in Oct 2025, 45 in Nov 2025, then 36 in Jul 2026, 101 in Aug 2026 and 268 in 1–26 Sep 2026. The ramp is running now; the next four weeks are the year's window for costume content (matches the review-date seasonality in 07 §4).
- **Species and pollution.** The #catcostume and #catcostumes feeds are led by *humans* in Cat-in-the-Hat costumes (Natalie Reynolds, 13.2M and 13.0M) and cat make-up ("scary black cat", 5.5M). This is 07's "cat costume is not a pet search term" finding in video form: tag with #catsoftiktok, #cathalloweencostume and #petcostume, and put "for cats" on screen, or the algorithm files the post with the human costumes.
- **Multi-cat and reaction beats recur in the biggest cat-only posts:** "bert in boots ‼️ can u guess the next costume ⁉️" (10.7M, 7 s), "Rawrrr did I scare you??" dinosaur (6.8M, 10 s), "She definitely hated being a spider" (2.5M, 12 s), "Spooder meow" Spider-Man (1.0M, 9 s), "Would you buy one for your cat?👀" (1.1M, 10 s, @creedpaws), "Maybe it shrank in the wash…?" (3.3M, 11 s), "i love how awkward they are" (5.4M, 8 s, dachshunds).

### 2.2 Accounts that sell pet costumes on TikTok — and how they move viewers to a store (VERIFIED)

| Account | Followers | Videos | Total likes | Best post in the feeds (plays · comments · date · length) | Caption / CTA pattern | Route to the store |
|---|---|---|---|---|---|---|
| @hollowride0 | 7,225 | 7 | 475,900 | 8.0M · 3,987 · 20 Aug 2026 · 14 s | `Comment "HORSEMAN" if you want one 🎃🐈‍⬛ 🔗 LINK IN BIO🔗` | Bio link goes straight to **one product page** (`hollowride.store/products/the-headless-horseman-rider…`) |
| @petfrightt | 5,207 | 110 | 355,800 | 1.5M · 1,945 · 10 Sep 2026 · 17 s; also 1.4M (3 Sep), 1.0M (11 Sep), 455K (8 Sep) | `Comment "CRAWL" if you need it or check the link in bio!`; `Cat parents more information in our 🔗bio` | Bio: "🎃 Halloween costumes for your fur baby · For cat moms who love spooky season · **📦 Order by Oct 8 for Halloween delivery** 👇" → Petfright.store |
| @batwhiskers | 635 | 4 | 14,000 | 182K · 253 · 9 Aug 2026 · 9 s | `Comment "Bat" if you want one! 😂` | Bio text URL (no clickable link) |
| @spookpaws.co | 664 | 39 | 25,600 | 9.8K · 2 · 12 Jul 2026 · 8 s | `Comment "cat" to get one…` | Bio text URL |
| @handyfindsstore | 324 | 6 | 6,198 | 121K · 145 · 27 Aug 2026 · 13 s | `Comment "spider" if you want one` | Bio text URL |
| @caitlinfv (NioPet) | 144,600 | 2,676 | 6.1M | 13.2M · 2,342 · 13 Nov 2025 · 17 s (laser collar) | Long benefit caption, "Products in videos · Link below" | Bio link niopetstore.com |
| @creedpaws | — | — | — | 1.1M · 10 s · 19 Aug 2026 | `Would you buy one for your cat?👀` | (question-only) |

What this says:

- **Nobody in this cohort is a TikTok Shop seller** (`ttSeller: false` on all five costume accounts). They sell off-platform through a link in bio and the comment-keyword DM automation. The one costume account that *is* a TikTok Shop seller is @pandaloon (`ttSeller: true`, 18,900 followers, 673,600 likes from 11 videos).
- **Follower count is irrelevant to reach; the clip is everything.** 635 followers → 182K plays; 7,225 → 8.0M. TikTok distributes on watch-through, not on followers. A brand-new account can get the same distribution in week one (ESTIMATED from the pattern; TikTok does not publish the rule).
- **The comment-keyword CTA works but is also the tell that lowers organic engagement.** Seller-style captions (44 of 921) have a median of 4,952 plays vs 18,700 for owner-style captions; like rate 2.71% vs 7.56%; share rate is higher (1.58% vs 0.80%) because the clip is designed to be sent to a friend. The plan below uses the keyword CTA on at most one post in three, and keeps the rest in the cat's voice.
- **The lawful version of urgency exists in this cohort:** @petfrightt's "Order by Oct 8 for Halloween delivery" is a real dispatch cut-off, the same device as `HALLOWEEN.cutoff` (14 Oct) on the site. Use that line; never a countdown without a real date.
- The creator videos on the Hanhanle TikTok Shop US listing (09-teardown-2: 16 tiles, 15 "Creator earns commission", top two at 22.0K and 8.2K) show what the affiliate route produces when it is switched on: many different cats in the same cape, on the product page itself.

### 2.3 The brand accounts from 03/04/08, re-fetched today (VERIFIED, `tiktok.com/@handle`)

| Handle | Followers | Videos | Likes | Likes per video | TikTok Shop seller flag | Bio link | Reading |
|---|---|---|---|---|---|---|---|
| @sassywoof (US, dog-first) | 71,600 | 840 | 3.0M | 3,571 | no | msha.ke link page | The only brand with real reach; 840 videos and a "swag fur you & your pup" lifestyle voice |
| @pandaloon (US) | 18,900 | 11 | 673,600 | 61,236 | **yes** | none | One viral format (pet walking upright in a costume) carried for years; a content lesson, not a store lesson |
| @amyspetsupplies (UK generalist) | 9,366 | 1,826 | 79,600 | 44 | no | linktr.ee | A person on screen, daily posting, tiny per-video return |
| @madebycleo (US, #1 in 08) | 3,984 | 104 | 8,772 | 84 | no | none (bio text) | The category's biggest store gets nothing from TikTok: product-only clips |
| @furmilyuk (UK) | 3,425 | 246 | 11,400 | 46 | **yes** | furmily.co.uk | Salon + outfits; best UK cat-wearables account and still under 4K |
| @petcostumecenter (US) | 1,661 | 8 | 131 | 16 | no | none | Dormant |
| @sweetpicklesdesigns (US) | 1,169 | 152 | 9,153 | 60 | **yes** | none | Product-only |
| @cheshireandwain (UK) | 671 | 333 | 23,200 | 70 | **yes** | cheshireandwain.com | 333 craft videos, 671 followers |
| @pipkin_and_bella (UK) | 242 | 228 | 5,012 | 22 | no | none | Product-only |
| @supakitstore (UK) | 217 | 41 | 805 | 20 | no | none | Product-only |

Against that, the character accounts in the same feeds: @sunkittencats 1.3M followers / 668 videos / 206.9M likes (bio: "4 berts of the apocalypse"); @louieandtodd 795,100 / 792 / 67.4M ("two trick-performing & world traveling BSH boys"); @malpluscats 500,700 / 2,270 / 57.6M ("cat daddy of 7 + fosters"); @withpyaari 998,500; @cashs.dad3 114,100 / 124 / 3.7M (a Devon Rex whose whole account is outfits, "Which of my outfits do you like best?"); @winwinrescue 75,800 / 1,022 / 5.7M ("a real cat that really likes to dress up and walk the Catwalk"); @tabbykatbros 32,100 followers but 4.5M likes and a 6.8M-play dinosaur costume post. Product-only brand accounts average 20–84 likes per video; character accounts average 5,000–140,000. **The account must be the cats, not the shop.**

### 2.4 YouTube Shorts (VERIFIED, `youtube.com/results` with the Shorts filter, and watch pages)

| Short | Channel (subscribers) | Views | Likes | Posted | Format |
|---|---|---|---|---|---|
| I Entered My Cat Into An Alien Costume Contest #sphynx | Lindsey Kuzmin (1.73M) | 28.6M | 717,553 | 20 May 2025 | Owner narrates; the cat's blank reaction is the joke |
| Catwalk by Fifi – cat in costumes | Happy cats Kiki et Fifi (74.3K) | 26.1M | 548,542 | 20 Mar 2020 | Cat walking towards camera in successive outfits, cut on the beat |
| Dressing Up My ADORABLE Cat for Halloween?! 🎃🐱 | Sticki Rolls (1.94M) | 5.68M | 86,666 | 31 Oct 2024 | Try-on with owner commentary |
| PnotKyes Dog and Cat Halloween Costumes 👻🎃 Part one | PnotKyes (3.38K) | 3.88M | 21,764 | 16 Oct 2024 | A 3K-subscriber channel; series "Part one" |
| Uno picks out a Halloween costume at PetSmart 😻 | (thekatcurtis collab) | 3.77M | 133,865 | 16 Sep 2025 | Cat "chooses" in the shop aisle |
| Marshall's new fits from @Chewy #chewypartner | Lindsey Kuzmin | 1.41M | 69,344 | 14 May 2025 | Paid partner haul, sphynx cat |
| my cat Uno tries on Halloween costumes 🎃 | — | 1.09M | 69,220 | 31 Oct 2023 | Try-on |
| I Got My Cats Halloween costumes from @Chewy #chewypartner | Lindsey Kuzmin | 346,670 | — | 12 Sep 2025 | Paid partner unboxing + try-on |
| The cat definitely needed this costume… 🤫 | ThePurrfectFlex (130K) | 163,352 | 1,230 | **25 Sep 2026** | Posted yesterday; the ramp is live on YouTube too |
| Cute Lion Cat Costume – Shop Now | YourCatGoodies™ (6.83K) | 155,895 | 1,618 | 24 Mar 2025 | Seller listing video; 1% like rate |
| Top 5 Halloween CAT COSTUMES! #halloween2025 | FOE (1.22M) | 117,398 | 3,397 | 13 Oct 2025 | List compilation |
| I DIY'ed my cat's Halloween costumes 😻 | — | 116,972 | 7,710 | 11 Oct 2024 | Craft angle |
| Adjustable Cat Belt, Strong Breakaway Buckle… | Wenodh (9.41K) | 123,615 | 878 | 14 Aug 2024 | Listing video; 0.7% like rate |

Reading: the owner-narrated try-on with an honest reaction is the format with a 1–28M ceiling; seller listing videos cap around 150K with a like rate under 1.5%. A 3,380-subscriber channel reached 3.88M with "Part one" of a dog-and-cat costume series — the series device works for small accounts. YouTube Shorts is the free second home for every TikTok clip (same vertical file), and, per 07 §5, the "cat christmas outfit" results are nearly empty of real cats, which is the November opening.

### 2.5 Instagram and Facebook — what can be said (ESTIMATED; both blocked today)

Instagram follower figures from 03/04 (search-snippet ESTIMATES): Sassy Woof ~364K, Pawsome Couture ~161K, Made By Cleo ~29K, Cheshire & Wain ~24–25K, Supakit ~19K, Sweet Pickles ~18K, Pet Costume Center ~12K, Pipkin and Bella ~9.4K, Furmily ~5.2K. Instagram is where the UK cat brands have their audience (Cheshire & Wain 25K on Instagram vs 671 on TikTok), and it is where a UK gift buyer already follows cat accounts. The plan treats Instagram Reels as a re-post of every TikTok clip (native upload, no TikTok watermark — Instagram down-ranks watermarked Reels, a widely reported but unverifiable platform behaviour) plus a carousel of stills for the grid and the Cat of the Month entries in Stories. Facebook: pages get no organic reach worth planning on; groups are covered in §6.

---
## 3. The content system

### 3.1 Positioning of the account (one line the owner can say to camera)

"Two [three] cats, one flat in [town], and a small shop that makes collars and costumes *for* cats — filmed honestly: five seconds, one photo, then treats." This is the community's own norm (07 §2: "it lasts for 5 seconds and then she gets a million treats"), it is the tone of the biggest cat-only posts in §2.1 ("She definitely hated being a spider"), it is UK-compatible ("your costume needs to be kinda crap otherwise you're trying too hard", 3,610 upvotes, 07 §2b), and it never makes a welfare claim (ASA/CAP). The handle should be the cats, with the shop in the bio — "@reginaldandkingsley" over "@catwalkclubuk" (ESTIMATED from §2.3: character accounts out-earn brand accounts 100× per video).

Rules that follow from the evidence and the legal floor:

| Rule | Why |
|---|---|
| The founder's voice is the sound; no licensed tracks by default | Original-sound posts: median 27,100 plays vs 7,400 (§2.1) |
| 8–20 s for product clips; 60–90 s for one "story" post a week | The two winning lengths (§2.1) |
| Every cat has a name, a trait and a catchphrase; every product has its alias (Reginald, Roadie, Kingsley, Vlad, Boris, Pip, Nick) | Character accounts win; the aliases already exist in `data.js` |
| Show the cat walking, sitting, jumping in the item, and show it coming off | 07 §6b objection 2; buyers ask "will he keep it on" |
| Never say the cat "loves it", "is calm", "is comfortable" | ASA/CAP health-and-welfare claims; the honest version out-performs anyway (07 §5) |
| Urgency only from real dates: "order by 14 October for Halloween", "Christmas last post [date]" | DMCC Act 2024; the only urgency line in the winning seller cohort is a real cut-off (§2.2) |
| No reviews, ratings or "X sold" unless they are Catwalk Club's own | DMCC Act 2024; 09-teardown-1 change 1 |
| "for cats" or "for cats & small dogs" on screen and in the caption of every product post | Species pollution in the feeds (§2.1) and in search (07 §1) |
| Cat of the Month has a free entry route stated in every post about it | Competition law (CAP 8) |

### 3.2 Five pillars (and the share of posts)

| Pillar | Share | What it is | Products it carries | Evidence it works |
|---|---|---|---|---|
| **A. The honest try-on** | 35% | The cat's reaction, the owner's deadpan commentary, the item going on and coming off | All seven | Top cat-only posts in every feed are reactions (§2.1); Shorts 1–28M (§2.4) |
| **B. Character and household** | 25% | Daily life of named cats; the costumes are incidental; multi-cat dynamics; the founder on camera packing orders | Whatever is on the cat that day | Character accounts vs brand accounts (§2.3) |
| **C. Fit, safety and how-to** | 15% | Measuring the neck, the breakaway pop, taking the bell off, "size down under 3 kg", kitten warning | Bow tie, bandana, mane, spider | Buyer questions and 1–3★ reasons (07 §3c); r/CatAdvice allows relevant product answers (§6) |
| **D. Ask the audience** | 15% | "Which outfit?", "Name this look", "Guess the next costume", polls, Cat of the Month | Pairs of products, bundles | Question captions get 6× the comment rate (§2.1); "can u guess the next costume" 10.7M |
| **E. Shop and story** | 10% | Order-by dates, what arrived, what sold out, a customer's cat (with permission), the 60–90 s story | Bundles, Christmas set | Seller cohort (§2.2); story posts at 60 s+ have the highest median (§2.1) |

### 3.3 The 12 formats

Each is doable with a phone on a table or in the hand, one to three cats, daylight from a window, and the seven products. Hooks are the first 1–2 seconds (on-screen text plus the first spoken words); the CTA is the last 2 seconds and the caption.

| # | Format | Length | Hook pattern | Shot list | CTA | Best for | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | **Rate the reaction** | 8–12 s | On-screen: "Rate his reaction 1–10". Cut straight to the item going on | (1) Item held up to camera 1 s (2) on the cat 3 s (3) hold on the face 3 s (4) item off, treat 2 s | "Full range in bio · for cats & small dogs" | Mane, spider, cape, pumpkin | "Be honest is it spooky?" 2.5M; "Rawrrr did I scare you??" 6.8M |
| 2 | **Guess the next one** (series) | 6–10 s | "Costume 3 of 7. Guess tomorrow's." | (1) cat in today's item, walks toward camera (2) freeze on the cat, text "tomorrow: ?" | "Comment your guess" | Runs the whole seven over a week | "can u guess the next costume ⁉️" 10.7M, 7 s |
| 3 | **Which one?** (A/B) | 10–15 s | "Which does he wear to the party: A or B?" | Split or back-to-back: cat in A 4 s, cat in B 4 s, side-by-side still 3 s | "A or B in the comments" | Bow tie colours; cape vs spider; hat vs collar | @cashs.dad3 "Which of my outfits" 4.7M and 3.2M, 13,400 comments |
| 4 | **The five-second rule** | 12–18 s | "Cat costumes are a five-second sport. Watch." | Phone timer on screen; item on; photo taken; item off; treats; end card "5 seconds · one photo · treats" | "This is the rule we sell by — bio" | All costumes; the brand's welfare stance | 07 §2 norm; keeps ASA-safe |
| 5 | **The breakaway pop** | 8–12 s | "Why the clip *should* come undone" | Close-up: bow tie collar on the cat; owner hooks a finger and pulls; clip pops; "that's the point"; refit | "Breakaway collar · £[price] · bio" | Bow tie, bandana | #1 supplier 5★ reason "peace of mind"; 3★ "clasp is fragile" needs the explanation (07 §3) |
| 6 | **Does it fit a [breed/size]?** | 12–20 s | "Everyone asks if it fits a [Maine Coon / 3 kg tabby]. Tape measure." | Tape on the neck (cm on screen), item on, the two-finger check, the walk | "Size guide in bio; DM your cat's neck cm" | Mane, spider, bandana S/M/L | "Too big" is the #1 complaint (07 §3c) |
| 7 | **Packing your order** (founder on camera) | 15–25 s | "Packing [name]'s order for [town]" (first name only, with consent, or "for Manchester") | Item, tissue, bag, the note, the postbox; cat sits on the parcels | "Order by 14 Oct for Halloween" | Every product; bundles | Seller-cohort real cut-off line (§2.2); UK small-business "packing orders" genre |
| 8 | **The catwalk** | 8–15 s | No words; the cat walks to camera in successive items, hard cuts | 4–6 cuts of the same walk in different items; last cut, nothing on, cat looks at camera | "All seven in bio" | Whole range | "Catwalk by Fifi" 26.1M; @winwinrescue "walk the Catwalk" |
| 9 | **Kitten and the collar** (safety explainer) | 20–30 s | "Please don't put a breakaway on a kitten under ~1.5 kg — here's why" | Owner to camera, collar in hand, pull test with a bag of sugar (1.5 kg) vs a 4 kg cat | "Full safety notes on every product page" | Bow tie, bandana | 07 §2b #16; r/CatAdvice-safe content |
| 10 | **Before Reginald / after Reginald** | 8–10 s | "He's the same cat. He is not the same cat." | Still of the cat plain 2 s; bow tie on 4 s; "compliments in the park: 3" | "Bow tie collar £[price]" | Bow tie, bandana | "looks like a gentleman", "compliments" (07 §3b) |
| 11 | **The story post** (60–90 s) | 60–90 s | "I started a cat-costume shop with £800 and two cats. Week 1." | Talking head 10 s; parcels; the cats; one honest number (orders this week); one problem; one thing learned | "Follow for week 2" | Brand; no product push | 61 s+ posts: median 56,900, 19% over 1M (§2.1); @malpluscats 12.4M story |
| 12 | **Reply to a comment** | 10–20 s | The comment on screen: "does it work on a black cat?" | Answer in one shot on the black cat | "Ask the next one below" | Whichever the question is about | TikTok's own "Reply to Comment" shoppable format (Seller Academy, "9 Types of Shoppable Videos") |

Every format is filmed once and published three times: TikTok (native), Instagram Reels (native upload, no watermark), YouTube Shorts (native). The story post also becomes a Facebook page post and, cut to stills, an Instagram carousel.

---

## 4. Thirty scripted posts for Days 1–30 (27 September – 26 October 2026)

Assumptions: the bandana ships from a UK warehouse (days), so it is on hand first; the six China-sourced samples arrive during week one (sourcing.md lead time 10–20 days from the order in LAUNCH-CHECKLIST §A — if they slip, swap the costume posts for formats 5, 7, 9, 10, 11 and 12 on the collars, which is the year-round business anyway). Two cats are enough; a third adds the "which cat wears it" angle. Cat names below are placeholders (Cat 1, Cat 2). Posting: TikTok every day; Reels and Shorts the same clip the same day. "Keyword CTA" means a caption line of the form `Comment "SPIDER" and I'll send the link` answered by hand or by a DM tool; use it on no more than one post in three (§2.2).

| Day | Date | Pillar / format | Product | Hook (on screen + first words) | Shot list (phone, window light) | CTA / caption |
|---|---|---|---|---|---|---|
| 1 | Sun 27 Sep | B / 11 story (60 s) | none | "I'm opening a cat-costume shop in four weeks with two cats and no ad budget. Day 1." | Talking head; the cats; the empty stock box; the site on a laptop; "the rule: five seconds, one photo, treats" | "Follow for the launch. Everything we sell is for cats & small dogs." |
| 2 | Mon 28 Sep | A / 1 rate | Bandana (Roadie) | "Rate his reaction to a bandana, 1–10" | Bandana held up; clip on; hold on face 3 s; he walks; off; treat | "Bandana collar for cats & small dogs · UK stock · link in bio" |
| 3 | Tue 29 Sep | C / 5 breakaway pop | Bow tie (Reginald) | "Why this clip is *meant* to come undone" | Close-up collar on Cat 1; finger pull; pop; refit; two-finger check | "Breakaway bow tie collar · bio" |
| 4 | Wed 30 Sep | D / 3 which one | Bow tie colours | "Which does he wear to Nan's: red or blue?" | Cat 1 in red 4 s, blue 4 s, split still | "A or B below" |
| 5 | Thu 1 Oct | E / 7 packing | First orders or samples | "Cat of the Month is open — free to enter, no purchase" | Owner to camera; the entry rule on screen; cat sits on the parcel box | "Post your cat with #catwalkclubcat or email — free entry, details in bio" |
| 6 | Fri 2 Oct | A / 1 rate | Lion Mane (Kingsley) | "He has no idea he's a lion" | Mane held up; velcro under chin; hold on face; he sits, then walks; off | "Lion mane for cats · sizes S/M/L · bio" |
| 7 | Sat 3 Oct | B / 8 catwalk | Bow tie, bandana, mane | No words; three walks, three items | Same walk to camera ×3, hard cuts, last cut bare | "Week 1 done. The mane won. Bio for all three." |
| 8 | Sun 4 Oct | C / 6 fit | Mane | "Does the lion mane fit a 3 kg cat? Tape measure." | Tape on neck, cm on screen; S vs M side by side; "between sizes take the smaller" | "Size guide in bio; DM me your cat's neck in cm" |
| 9 | Mon 5 Oct | A / 2 guess (series 1 of 5) | Spider (Boris) | "Halloween costume 1 of 5. Guess tomorrow's." | Spider legs going on; he walks; a leg wobbles; owner: "supervised, not for chewers" | "Guess tomorrow's in the comments" |
| 10 | Tue 6 Oct | A / 2 guess (2 of 5) | Devil Bat Cape (Vlad) | "2 of 5. You guessed bat. It's bat." | Cape on; hood; he looks betrayed; walks; off | Keyword CTA: `Comment "VLAD" for the link` |
| 11 | Wed 7 Oct | A / 2 guess (3 of 5) | Pumpkin hat & collar (Pip) | "3 of 5. The hat lasted 4 seconds. The collar's staying." | Hat on, off; ruffle collar stays; he sits normally | "Sold as a set — the collar's the bit they tolerate" |
| 12 | Thu 8 Oct | D / 3 which one | Spider vs Cape | "Halloween photo: spider or bat?" | Cat 1 spider 4 s, Cat 2 cape 4 s, split still | "Vote below · Halloween Pair bundle in bio" |
| 13 | Fri 9 Oct | A / 4 five-second rule | Any costume | "Cat costumes are a five-second sport" | Timer on screen; on; photo; off; treats | "Order by 14 Oct for Halloween delivery" |
| 14 | Sat 10 Oct | E / 11 story (60 s) | none | "Week 2 of the cat-costume shop: [N] orders, one problem, one thing I'd change" | Talking head; a real order count; the postage cost; the cats | "Week 3 next Saturday" |
| 15 | Sun 11 Oct | C / 9 kitten safety | Bow tie | "Don't put a breakaway on a kitten under 1.5 kg — here's the proof" | Bag of sugar test vs adult cat pull | "Safety notes on every product page" |
| 16 | Mon 12 Oct | A / 1 rate | Spider | "Rate the spider 1–10 (his rating: 0)" | Second cat this time; same beats | Keyword CTA: `Comment "BORIS"` · "order by Wed for Halloween" |
| 17 | Tue 13 Oct | E / 7 packing | Halloween orders | "Last-post-tomorrow packing day" | Packing montage; postbox; cat on parcels | "Order by 14 Oct — tomorrow — for Halloween delivery" |
| 18 | Wed 14 Oct | E / 12 reply | Whichever is asked | "You asked: does it show on a black cat?" | Answer on the black cat (or darkest cat) | "Today is the Halloween order-by date" |
| 19 | Thu 15 Oct | D / 3 which cat | Mane | "Which cat wears the mane better?" | Cat 1 vs Cat 2 in the same mane | "Vote. Loser gets the pumpkin hat." |
| 20 | Fri 16 Oct | B / 10 before-after | Bow tie | "Same cat. Not the same cat." | Plain still 2 s; bow tie 4 s; caption count of compliments | "Bow tie collar · bio" |
| 21 | Sat 17 Oct | E / 11 story (60 s) | none | "Week 3: what sold, what didn't, and the parcel that came back" | Honest numbers; the return; what changed on the site | "Week 4 next Saturday" |
| 22 | Sun 18 Oct | A / 8 catwalk (Halloween) | Spider, cape, mane, pumpkin | No words; four walks | Hard cuts; last cut bare with a treat | "Halloween range · bio · for cats & small dogs" |
| 23 | Mon 19 Oct | C / 12 reply | Spider | "You asked about the wire legs" | Show the wire core, bend, "supervised wear only, not for chewers" | "Every page says this too" |
| 24 | Tue 20 Oct | D / Cat of the Month | UGC | "Your cats, dressed — the first entries" | Screen-record the entries (with the entrants' permission); no ranking claims | "Free to enter until [date] · rules in bio" |
| 25 | Wed 21 Oct | A / 1 rate | Santa set (Nick) — first tease | "Too early? (It's not too early.)" | Scarf on, hat on and off; "the scarf is the bit they keep on" | "Christmas set lands 1 Nov · bio" |
| 26 | Thu 22 Oct | B / household | any | "Morning routine of a cat who owns four collars" | Feeding; collar swap; window; work | no CTA |
| 27 | Fri 23 Oct | A / 3 which one | Cape vs pumpkin | "Halloween weekend: cape or pumpkin?" | Two cats, two items | "Both in the Halloween Pair / Pumpkin Patch bundles · bio" |
| 28 | Sat 24 Oct | E / 11 story (60 s) | none | "Week 4: the honest numbers before Halloween" | Orders, sessions, best post, worst post, next month's plan (Christmas) | "Week 5 next Saturday" |
| 29 | Sun 25 Oct | A / 1 rate | Mane + bow tie together | "Lion in a bow tie. Rate it." | Both on; sit; walk; off | Keyword CTA: `Comment "KINGSLEY"` |
| 30 | Mon 26 Oct | C / 6 fit | Bandana S/M/L | "S, M or L? Here's all three on the same cat" | Three sizes, tape measure, the two-finger check | "Bandana collar · UK stock · arrives in days" |

Two rules for the calendar: (1) if a post passes 100,000 plays in 48 hours, post a follow-up on the same cat and product within 24 hours ("Part 2", "you asked…") — series posts and replies are the cheapest way to catch a wave (§2.1, §2.4 "Part one" 3.88M from a 3K channel); (2) if the stock has not landed by Day 9, Days 9–13 become collar and bandana posts (formats 3, 5, 6, 10) and the guess-series starts the day the box arrives.

---

## 5. Posting cadence per platform

| Platform | Cadence (first 30 days) | Cadence after | Format | Where the store link lives | Evidence / note |
|---|---|---|---|---|---|
| **TikTok** (main) | 1 post a day, 7 days a week; 2 on Days 13, 17 and 18 (cut-off week) | 5–7 a week through Christmas; 3–4 a week Jan–Aug, collars-led | 8–20 s clips; one 60–90 s story a week | Bio link (business account) to a landing page that lists the seven with prices; single-product link during a wave; TikTok Shop product tags once registered (§7) | Seller cohort posts daily in season (@petfrightt 110 videos); distribution is per-clip not per-follower (§2.2) |
| **Instagram Reels** | Same clip, same day, native upload | Same | Same | Bio link; product tags via Shopify's Instagram sales channel once approved | UK cat brands' audience is here (§2.5, ESTIMATED) |
| **Instagram grid + Stories** | 3 grid posts a week (a still from the best clip, a carousel of the range on the cats, the Cat of the Month entries); Stories daily (behind the scenes, polls) | Same | Stills, carousels, polls | Link sticker in Stories | Polls mirror format 3 |
| **YouTube Shorts** | Same clip, same day | Same | Same | Description link; the channel's "store" once eligible | "cat christmas outfit" Shorts are empty of real cats (07 §5) |
| **Facebook page** | The weekly story post + Cat of the Month; nothing else | Same | Video + text | Link in post | Page reach is negligible (ESTIMATED); the page exists so the Shopify Facebook/Instagram channel can be connected and so groups can see a real business |
| **Reddit** | 2–3 photo posts a month as a member (r/cats, r/catpictures) with OC flair; answers in r/CatAdvice when a fit/safety question appears; no links | Same | Photos; text answers | None — Reddit is not a link channel (§6) | Rules VERIFIED (§6) |
| **Pinterest** (optional, week 5+) | 5 pins a week from existing stills | Same | Stills with the product page as the pin link | Pin link | Not researched today; a low-effort search-traffic add for "cat bow tie" and "cat christmas outfit" (ESTIMATED) |
| **Email** (Shopify Email / Klaviyo free tier) | Welcome flow from the 10% pop-up; one email a week from Day 14 | Weekly; daily in the last week before the Halloween and Christmas cut-offs | Best clip of the week + one product | Direct | The only owned channel |

Filming batches: one 90-minute session on Saturday morning (best light; cats are calm after breakfast) yields the week's seven clips plus stills; the story post is filmed Saturday afternoon. Editing on the phone in CapCut or TikTok's editor: captions on, no music, no transitions. Total: 4–6 hours a week of filming and editing, plus an hour a day for comments and DMs (replying to every comment in the first hour is the one lever a small account controls; ESTIMATED).

---
## 6. Reddit and Facebook groups without getting banned

### 6.1 The rules, as fetched today (VERIFIED, `reddit.com/r/<sub>/about/rules.json` via an in-page fetch)

| Subreddit | Rule that bites a seller | Rule that leaves a door open |
|---|---|---|
| r/cats | "No Spam, Memes, Low-Effort Content, Ads or Fundraising — No advertising, self-promotion, or fundraising of any kind." "No False OC or Content Theft — permanent ban." Flair OC / Not OC required. | Photos of your own cats with OC flair are the sub's staple; the annual "Show me your cat's Halloween costumes!" thread had 1,369 upvotes and 94 comments on 27 Oct 2025 (07 §2a) |
| r/CatAdvice | "No Advertising — Any affiliate links, advertising products, or sales of any kind will be removed." "No Medical Advice." "No Non-Descriptive or Clickbait Titles." | "**Recommending someone a specific product relevant to their question is allowed.**" "Guides and PSA-like Posts — we allow and welcome informative and well-researched guides" (mod approval) |
| r/catpictures | "Do not submit content that isn't owned by you." "Do not promote YouTube channels or subreddits here." | Own photos welcome; bow-tie and bandana photo posts are "common and warmly received" (07 §2a) |
| r/AskUK | "Do your own research before posting … or for product/service recommendations." "No NSFW or similar solicitation-like accounts — your account should not be the intended or even the likely focus of discussion." | Answering others' questions in a genuine voice |
| r/CasualUK | "Survey / AMA / Charity / Beg Threads / PSA / Ads / Referral links … will need pre-approval from the mod team." "Not UK Content" removed. | Light-hearted UK-flavoured cat photos (the sub's own tone: 07 §2b #25) |
| r/UKPets | No rules set; near-dormant (07 §2a: one thread found) | Not worth the time |

### 6.2 The approach

1. **Reddit is for photos and answers, never links.** Post the owner's own cats (OC flair) in r/cats and r/catpictures two or three times a month: the bow tie, the "not impressed" mane photo, the Christmas card. Title in the community's register ("She has decided she is a lion. She is not a lion."). The product is never named in the title; if asked in comments, answer plainly ("it's ours — we're a small UK shop, DM me if you want the link" is acceptable in r/cats comments where the mods have not removed similar replies, but never post the link in the thread; ESTIMATED from the rule text). Expect a handful of DMs per post, not traffic.
2. **Answer fit and safety questions in r/CatAdvice** when they appear (search the sub weekly for "collar", "bell", "costume", "kitten collar", "lion mane"): the breakaway trade-off, the kitten-weight point, the two-finger fit rule, the "five seconds and treats" norm. Mention the product only when the question is "where do I buy a good one" — the rule explicitly allows it — and disclose the connection every time ("I sell these, so discount accordingly"). Undisclosed self-promotion is also an unfair commercial practice under the DMCC Act 2024.
3. **Join the late-October threads.** The "Show me your cat's Halloween costumes" and "Post your cat costumes" threads recur in the last week of October (07 §2a); post the honest photo, no link.
4. **Do not post in r/AskUK or r/CasualUK about the shop at all**; the first removes recommendation and solicitation accounts, the second requires mod pre-approval for anything commercial.
5. **Account hygiene:** the account posting must be a real person's account with history in unrelated subs; one link-less post a week is the ceiling; never reply to your own post from a second account; never ask friends to upvote (vote manipulation is a site-wide ban).

### 6.3 Facebook groups (ESTIMATED — Facebook returned HTTP 400 today; every group's own rules must be read first)

UK cat groups ("UK Cat Owners", breed groups, "Cats of [town]", local selling groups) are typically member-run with "no selling / no self-promotion / no links" rules and admin post approval. The lawful, ban-safe pattern, in order of value:

| Move | How | Why |
|---|---|---|
| Post as a member, from the personal profile, cats first | The same photo posts as Reddit; no link, no price, no shop name in the post; answer "where from?" in comments or by message | Group rules almost always ban promotion in posts; comments answering a direct question are tolerated in most groups (ESTIMATED) |
| Ask admins for a "small business Sunday"/"promo day" slot | Many groups run one; use it with a single post and the free Cat of the Month entry, not a discount | The only sanctioned promotional post |
| Local selling groups and Facebook Marketplace listings | List the bow tie and bandana at the site price with local collection; the listing links to the site | Marketplace is a sales surface, not a group; it is where a UK gift buyer looks in December |
| A group of your own ("Cats in bow ties UK") later | Only once there are 50+ customers to seed it | A brand-run group is the one place promotion is allowed, and it feeds Cat of the Month |

Facebook page posts and Reels get the weekly story and the Cat of the Month entries so the page is not empty when a group admin checks it.

---

## 7. TikTok Shop UK as a channel

All figures VERIFIED from the TikTok Shop UK Seller Academy (seller-uk.tiktok.com, articles dated 15 Sep 2025 – 8 Sep 2026) and the registration page (05-marketplaces §4) unless tagged.

### 7.1 Fees and cash

| Item | Value | Source |
|---|---|---|
| Set-up, monthly, listing fees | **None** ("No fees, no deposits and no hidden costs") | Registration page (05 §4) |
| Platform commission | **9% inclusive of VAT** on (net sales + customer-paid shipping + platform discount) − refunds; Pet Supplies = 9% in the category sheet | "Platform Commission Fee" (15 Sep 2025); "Commission Rate by Product Categories" (18 Sep 2025) |
| New-seller reduced commission | Exists ("sellers must be past their initial new seller reduced commission period"); rate and length shown only in Seller Centre after registration | same |
| Affiliate commission to creators | Set by the seller per product (seller-to-creator contract; TikTok "is not involved"); decreases apply to existing promoters only after 30 days; VAT invoices in GBP available for UK creators | "Affiliate Commission Settings" (25 Jun 2024); finance FAQs (11 Nov 2025) |
| Free samples | Seller pays product, shipping and tax; **the seller issues a tax invoice to the creator** for a free sample | finance FAQs |
| Payout timing | Settlement periods: **Introductory 31 days**, Standard 8 days, Accelerated 3 days, Express 1 day, Deferred 31 days (for risky sellers); then ~3 business days to the bank; TikTok charges no payout fee | "Settlement on TikTok Shop" (29 May 2026) |
| Reserve | 30 calendar days of settlement funds withheld if the Seller-Fault Cancellation Rate is missed | same |
| New-seller vouchers | "Up to **£800** in TikTok-funded vouchers" unlocked by missions (buyer-facing discounts, not seller cash) | Registration page (05 §4) |

ESTIMATED cash consequence: a new seller on the 31-day introductory settlement plus 3 bank days sees the money from a 10 October order around **13–14 November**. With £799 of launch stock (01 §9), TikTok Shop orders in October cannot fund the November reorder; own-site orders (Shopify Payments pays out in days) can. Put the Halloween SKUs on both, and treat TikTok Shop's October cash as December's stock money.

### 7.2 Setting up (sole trader)

| Step | Requirement | Source |
|---|---|---|
| Seller type | "Sole trader or individual seller — for individuals who are self-employed or running their own business"; cannot easily be changed later | "How to register as a TikTok Shop seller (UK)" (25 Jun 2026) |
| Identity | **UK-government-issued** passport or driving licence; selfie with ID and a short verification video via QR code | same |
| Contact | UK phone number or email; a TikTok account (use the one aligned with the brand — the cats' account) | same |
| Bank | Account holder name must match the ID name; proof of residential address (bank statement or utility bill dated within 3 months) | "UK TikTok Shop Seller Registration Policy" (8 Sep 2026) |
| Shop name | No "official"/"flagship", no special characters; reflects the brand | registration guide |
| Catalogue | Connect Shopify via the TikTok sales channel so products and stock sync (05 §7); titles "for cats & small dogs"; sizes in cm | 05, 07 |
| Shipping | "Shipped by Seller": **only Royal Mail Tracked 24/48 is acceptable; Royal Mail 1st/2nd Class and RM 24/48 are not considered traceable** — the site's Tracked 48 plan (01 §3) already complies; or buy TikTok's labels | "A Complete Guide to 'Shipped by Seller'" (7 Jan 2026) |
| "2-Day Shipping" label | Free label on listings once ≥80% of a product's orders are delivered within 2 calendar days over 60 days and the shop has shipped >5 orders in 60 days; excludes remote areas | "UK 2-Day Shipping Label" (14 Apr 2026) — Tracked 24 on collars would earn it |
| Video limits | From 11 May 2026: up to **25 shoppable videos and 50 shoppable photos per account per day**; non-compliant videos get "reduced visibility within the first 7 days" and a diagnostic in Seller Centre → Shoppable Videos → Content Data | "Shoppable Videos" (29 Apr 2026) |

### 7.3 Affiliates and the sample programme

| Mechanism | What it is | How Catwalk Club uses it |
|---|---|---|
| **Open Collaboration** ("Open Plan") | Products listed in the marketplace that any creator can add to their showcase at the commission the seller sets; the seller can require approval per product | Switch on from Day 1 of the Shop at a commission the maths allows (below); it costs nothing until a sale |
| **Target Collaboration** | Direct invitations to named creators with a commission and optional free sample; seller can filter creators by follower band (1–5K, 5–10K, 10–50K, 50–100K, 100K+), 30-day GMV, average views per video and "fulfilment rate" (samples received vs content posted) | Invite 10–20 UK cat accounts in the 1–10K band whose cats already wear things; TikTok's own guidance is ">10,000 followers for sales promotion", but the pet-costume evidence (§2.2) says the clip matters more than the following |
| **Free samples** | Seller sets quantity, request window and thresholds (category, followers, 30-day sales, average views); 7 days to review requests or they auto-cancel; "reliable creators" filter = top 20% by samples-received-to-posts ratio; **sample auto-approval** (16 Jun 2026) approves by predicted "T28 ROI" (GMV within 28 days ÷ sample cost) with a daily cap per product | Budget 10 units per Halloween SKU and 10 bow ties as samples (~£50–60 of stock at landed cost); set the threshold to average views ≥5,000 and category = pets; approve by hand for the first month, then auto-approve at a target T28 ROI of 3× |
| **Refundable samples** | Creator buys, gets refunded when they meet posting criteria set by the seller; becomes a normal purchase after 90 days if not | Use instead of free samples for anyone outside the pets category |
| **Creator videos on the PDP** | Affiliate clips appear under "Videos for this product" on the listing (Hanhanle: 16 tiles, 09-teardown-2) | The route to "many different cats in the same cape" without filming them |

Commission the maths allows (ESTIMATED from 01 §8 unit economics, £2.99 delivery charged, Tracked 48, 8% returns):

| Listing | Charged | 9% platform | Landed | Postage + packaging | Returns | Contribution, no affiliate | With a 10% affiliate | With a 15% affiliate |
|---|---|---|---|---|---|---|---|---|
| Bow Tie Collar £8.99 | £11.98 | £1.08 | £1.82 | £3.20 | £0.26 | **£5.62** | £4.42 | £3.83 |
| One costume £12.99 | £15.98 | £1.44 | £5.70 | £4.25 | £0.72 | **£3.48** (01 §8) | £1.88 | £1.08 |
| Halloween Pair £23.99 | £26.98 | £2.43 | £11.35 | £4.25 | £0.99 | **£7.96** | £5.27 | £3.92 |
| Santa Hat & Scarf £17.99 | £20.98 | £1.89 | £10.96 | £4.25 | £0.95 | **£2.95** | £0.85 | −£0.19 |

Reading: affiliates make sense on the collars and the bundles, not on single costumes or the Santa set; set Open Collaboration at 10% on collars and bundles, 5% on single costumes, and none on the Santa set until its price is the £21.49 regular price. Everything here assumes the seller is not yet VAT-registered (01 §5).

### 7.4 What to list and when

| When | What | Why |
|---|---|---|
| This week | Register; connect Shopify; list the two collars and the five Halloween/Christmas items at the same prices as the site (never lower — the site is the higher-margin channel, 05 §6) | Zero cost; the 14 October cut-off is Day 18 |
| Day 1 of the Shop | Tag products in every product post (formats 1, 2, 3, 6, 10); the "Rate his reaction" clip with a product tag is a shoppable video | In-app checkout removes the bio-link step (§8) |
| Day 7 of the Shop | Open Collaboration on collars and bundles; 10 free samples per Halloween SKU | Creator PDP videos before Halloween week |
| November | Santa set and bow tie in Christmas red as the pinned products; Target invitations to the creators whose October clips sold | 07 §4: Christmas is the larger UK peak; collars peak Nov–Dec |
| January onward | Collars and bandana only; costumes delisted to avoid the "reduced visibility" of dead listings (ESTIMATED) | 07 §4 seasonality |

---

## 8. What to measure weekly, and the thresholds that mean it is working

### 8.1 The funnel and the arithmetic (ESTIMATED from VERIFIED inputs)

| Stage | Metric | Where to read it | Planning value |
|---|---|---|---|
| Reach | Plays per post (median of the week), best post | TikTok Analytics → Content | Feed median 17,400; top 10% 1.6M (§2.1) |
| Hold | Average watch time; "watched full video" % | TikTok Analytics → Content | ≥50% full-watch on a 10 s clip (ESTIMATED norm) |
| Interest | Profile views per 1,000 plays; followers added | TikTok Analytics → Overview | 5–10 per 1,000 (ESTIMATED) |
| Click | Bio-link clicks (Shopify landing page with `?utm_source=tiktok&utm_medium=bio`); in-app product-tag clicks | Shopify Analytics → Sessions by referrer / UTM; TikTok Shop Analytics | 0.3–1% of plays reach the site by bio link (ESTIMATED); product tags convert in-app |
| Buy | Sessions → orders (CVR), AOV, orders by channel | Shopify Analytics; TikTok Shop → Analytics | CVR 1.5% base (01 §1); AOV £20.10 launch / £23.53 regular (01 §4) |
| Proof | Own reviews collected (Judge.me), Cat of the Month entries, creator sample posts | Judge.me; the hashtag; Affiliate Centre → Sample Analytics | First 20 photo reviews (08 §4) |

What the arithmetic says: at a 0.5% bio-link rate and 1.5% CVR, one order costs ~13,300 plays; 100 orders a month is ~1.3M plays a month on the site route. The feed data says one post in ten clears 1.6M — so the plan is either **one wave post a month plus ~25 posts at the median** (≈2M plays), or the TikTok Shop route where a tagged product converts from the video itself (TikTok publishes no rate; Hanhanle's listing shows 11.7K sold against ~33K creator-video plays on the PDP, 09-teardown-2, which is a ratio no bio link approaches — ESTIMATED reading).

### 8.2 Thresholds by week (ESTIMATED; tied to the 01-maths order bands)

| Period | Posting | Reach | Audience | Store (organic sessions, orders) | It is working if… | If not, change… |
|---|---|---|---|---|---|---|
| Days 1–7 | 7 TikToks + 7 Reels + 7 Shorts | Median ≥500 plays; ≥1 post ≥5,000 | 100+ followers; comments answered within the hour | ≥50 sessions; email list ≥25 | Every post is being distributed beyond followers (plays > followers × 3) | Hooks: text on screen in the first second; cut the first 2 s; film closer |
| Days 8–14 | 7 + 7 + 7; TikTok Shop live | Median ≥1,500; ≥1 post ≥25,000 | 300+; profile views ≥5 per 1,000 plays | ≥200 sessions/week; CVR ≥1%; ≥3 orders | One format is clearly outperforming the others 3× — double it | If plays are fine but no profile views: the CTA and the bio; if sessions but no orders: the PDP (price, delivery date, the empty video slots) |
| Days 15–21 (cut-off week) | 9 posts on TikTok (2 on Days 17–18) | Median ≥3,000; ≥1 post ≥100,000 | 1,000+ followers (LIVE unlocks at 1,000 — ESTIMATED) | ≥500 sessions; ≥15 orders/week; first TikTok Shop order; ≥3 sample requests | On track for the ~200-order October stock cap in 01 §9 | If a post over 100K produced <10 orders: the link path (single-product link, product tag) not the content |
| Days 22–30 | 7 + follow-ups | ≥1 post ≥250,000 in the month | 2,000+; first creator sample video live | ≥25 orders/week; 40–60 orders in the month from organic | Halloween stock sells out or nearly — reorder decision for Christmas made on Day 28 | If under 20 orders for the month: keep posting (the Christmas peak is bigger in the UK, 07 §6c) but move the money to collars |
| November–December | 5–7 a week; Christmas set from 1 Nov | ≥1 post ≥500,000/month | 5,000+ | 100–200 orders/month (= £8.5–26k net/year band, 01 §6) | Bow tie Christmas colours and the Santa set carry it; email doing ≥15% of orders | Under 100/month: Amazon UK for the collars (01 §8) in January |
| January–September 2027 | 3–4 a week, collars, bandana (spring, dogs), birthdays, weddings | ≥1 post ≥1M per quarter | 10,000+ by June | 60–120 orders/month; AOV rising toward £30 with a three-item bundle | The year lands in the 100–400 orders/month band (01 §6: £8–50k net) | Below 60/month by March: the range, not the content — add the small-dog and hairless-cat lines (01 §10) |

Weekly review, Sunday evening, 30 minutes, one sheet: posts published (per platform), median plays, best post and its format, profile views, followers, bio clicks, sessions by source, CVR, orders by channel, AOV, revenue, reviews collected, sample requests, creator posts, stock left per SKU. The comparison that matters is format-by-format median plays: after four weeks, drop the two weakest formats and double the two strongest.

---

## 9. The legal floor for content, in checklist form

| Do not | Instead | Law |
|---|---|---|
| Show or quote the AliExpress supplier reviews, stars or "5,000+ sold" as if they were Catwalk Club's | Collect own reviews from Day 1 (Judge.me); show UGC only with the entrant's permission | DMCC Act 2024 (fake/misattributed reviews); 09-teardown-1 change 1 |
| "Sale ends in 00:00:00", crossed-out prices with no real prior price, "only 3 left" that isn't true | "Order by 14 October for Halloween delivery"; "Christmas last post [date]"; real stock counts | DMCC Act 2024 (false urgency, fake reference prices); the site's expired ticker in 01 §2 must be gone before the first post links to it |
| "She loves it", "calming", "comfortable", "vet-approved", "safe for cats" | "Most cats tolerate a collar or cape for a photo; some never will"; "breakaway buckle — here's what that means" | ASA/CAP: unsubstantiated welfare and safety claims |
| A Cat of the Month post without the free entry route | "Free to enter, no purchase: post with #catwalkclubcat or email a photo" in every mention | CAP Code 8 (promotions) |
| Recommending your own product in a Reddit or Facebook thread without saying so | "I sell these — full disclosure" | DMCC Act 2024 (undisclosed commercial intent); platform rules (§6) |
| Paid creator posts without a label | Creators mark "Paid partnership"/"#ad"; TikTok Shop affiliate videos carry "Creator earns commission" automatically | CAP Code 2 / CMA influencer guidance |
| Using customers' or entrants' photos or first names without consent | Ask, keep the message | UK GDPR |
| Wire-legged spider on camera with a kitten or unsupervised | "Supervised wear, not for chewers" on screen | 07 §3c; product-liability exposure |

---

## 10. Blocked or not obtainable today

| Item | What happened | What was used instead |
|---|---|---|
| Per-account TikTok video lists (madebycleo, pandaloon, cheshireandwain, furmilyuk…) | Profile item list returns "Something went wrong" without login; not bypassed | Hashtag feeds (921 posts) and profile-level totals |
| TikTok search, Creative Center trending hashtags/sounds for the UK | Empty shell / `40101 no permission` | Sound and hashtag counts computed from the 921 posts |
| Creator region in the TikTok feeds | Not present in the API response | No UK/US split; UK-relevant reading from captions (#uk), bios and 03's UK account list |
| Hashtag post totals ("N posts") | Did not render | Sample sizes given instead |
| Instagram profiles and Reels | 302/429/response failure on every fetch, curl and Chromium | Snippet ESTIMATES from 03/04; Reels treated as a re-post channel |
| Facebook groups and pages | HTTP 400 | §6.3 is ESTIMATED from published platform norms; the owner must read each group's rules |
| Six YouTube watch pages | Google bot check (302 to /sorry) | Search-result view counts (VERIFIED) used; 14 watch pages read |
| TikTok Shop UK new-seller reduced commission rate; creator-side eligibility (follower minimum) for the affiliate programme | Not on public Academy pages; creator requirements page not reached | Rate: "exists, shown after registration"; creator minimum treated as ESTIMATED (commonly reported as 1,000 followers) |
| TikTok Shop UK product search / sold counts | Logged-out shell (05 §4) | Hanhanle US listing (09-teardown-2) as the affiliate-video reference |
| Search-engine discovery | DuckDuckGo captcha, Bing generic, Qwant JS-only, Brave 429, Ecosia 403 | Direct fetches only |
| Giant Paws' real traffic sources, CVR and AOV | Still awaited from the friend | 01-maths assumptions (1.5% CVR) used in §8 |
