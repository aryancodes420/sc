# 07 — Demand and buyer voice

Researched 26 September 2026 for Catwalk Club (UK, seven launch products £7.99–£17.99, goal £100k net profit by September 2027). Every figure is tagged **VERIFIED** (fetched today, URL given) or **ESTIMATED** (method given). UK spelling throughout.

## The five findings that matter

1. **"Cat costume" is not a pet search term.** On DuckDuckGo, Amazon UK and Etsy, 7 of the top 8–11 autocomplete suggestions for "cat costume" are humans dressing as cats (kids, women, adult, masks). Amazon UK's own suggestion list even contains "cat outfits for cats only" — searchers are fighting the ambiguity. Every listing title, ad and hashtag needs the qualifier *for cats* / *for pets* or the traffic will be the wrong species. VERIFIED (§1).
2. **The only specific costume that appears in Amazon UK autocomplete is the spider — for both cats and dogs.** "cat halloween costume spider" and "dog costume spider" both auto-suggest. The Spider Costume is the right Halloween hero; the bat cape and pumpkin set have no autocomplete presence at all. VERIFIED (§1).
3. **The seasonal cliff is real and steep.** Review dates on the suppliers' own listings (a 2–5 week lag on orders) put 85% of lion-mane reviews and 71% of spider reviews in Oct–Jan; 80% of the Christmas-hat listing's reviews land in Nov–Dec. The bow-tie collar peaks Nov–Dec (36% of a year's reviews) but keeps selling in every month, and the bandana listing peaks Mar–Jul. Collars are the year-round business; costumes are a 14-week window. VERIFIED (§4).
4. **UK Halloween pet demand is a fraction of the US signal.** A CasualUK thread titled "TIL the UK doesn't dress up for Halloween like Americans do" has 8,647 upvotes; its top comment — "your costume needs to be kinda crap otherwise you're trying too hard" — has 3,610. Across r/AskUK, r/UKPets, r/CasualUK and r/britishproblems there is **not one** cat-costume thread; a 200-comment AskUK thread on "game-changing purchases for your cat" contains zero clothing or collar mentions. Every large cat-costume thread found is American. Christmas photos, birthdays and the "handsome collar" are the UK-compatible moments; Halloween is the export moment (US/EU). VERIFIED (§2).
5. **Buyers have already settled the welfare argument on their own terms: "five seconds, one photo, then treats."** The accepted norm in every Reddit thread is that a costume goes on for a photo and comes off; hats are the most hated item, collars, bandanas and loose capes the most tolerated; the bell is widely removed. The copy and the products that win are the ones built for that norm: light, quick on/off, breakaway, bell removable, and honest that the cat may not enjoy it. VERIFIED (§2, §3).

---

## 1. Search-intent signals (autocomplete)

Method: fetched the live autocomplete endpoints for DuckDuckGo (`kl=uk-en`), Amazon UK (`completion.amazon.co.uk`, marketplace A1F83G8C2ARO7P) and Etsy (`etsy.com/api/v3/ajax/public/search/suggestions`, locale en-GB) on 26 Sep 2026. Autocomplete is ranked by query volume on each platform, so the order is a demand signal, not a count. All VERIFIED. Google Trends was not reachable; Amazon/Etsy search-results pages were blocked (see Blocked).

### 1a. Seed terms — what each platform suggests

| Seed term | DuckDuckGo (uk-en) top suggestions | Amazon UK top suggestions | Etsy (en-GB) suggestions |
|---|---|---|---|
| cat costume | for halloween · **for kids** · **adult** · **for women** · accessories · **lion mane** · for girls | **for pets** (#2) · for kids · adult · women · halloween · for men · accessories · for girls · masks | kids · women · **for cats** (#4) · halloween · sewing pattern · children · toddler · mask · adult |
| cat halloween costume | for kids · for girls · ideas · for women · **for cat** (#6) · for adults · cheshire cat | kids · women · **spider** (#4) · girl · **pet** (#6) · adult · women white · toddler · teen | for kids only |
| cat christmas outfit | **pets at home** · cat christmas suit · christmas cat outfits | cat christmas outfits · **festive** | (single result) |
| cat bow tie | **bow tie collar** · bow tie collar dog · pattern · bow tie cat breed | **collars** · suit · **black** · attachment · **blue** · **red** · **yellow** · collar **orange** · collars black | **collar** · **wedding** |
| cat bandana | for pets · **collar** · pattern · sewing pattern · pattern free · crochet pattern · pfp | **collar** · collar **quick release** · collar red · blue · green · orange · pink · collar green · **birthday** | **with birthday cap** |
| lion mane for cat | cat lion mane costume · **lion mane cut** · lion mane cat **haircut** · lion mane hat for cats · lion mane costume for cats · lion mane for dog · what is lion mane | lion mane for cats · lion mane for cat | no results |
| dog costume | for humans · for kids · for halloween · for adults · ideas · **for large dogs** · contest | **for small dogs** (#2) · for adults · **for large dogs** · **for medium dogs** · for kids · halloween · for humans · **spider** · xl xxl large breeds | — |
| cat santa (extra) | santa hat · drawing · png · wearing santa hat · clipart · coloring page | **cat santa hat** · **cat santa costume** · cat santa | — |
| cat outfit (extra) | for women · **for pets** · dti · for kids · halloween · for girls · for humans | cat outfit · **for cats only** · women · for kids · halloween · adult · for human | — |

Sources: `https://duckduckgo.com/ac/?q=<term>&kl=uk-en`; `https://completion.amazon.co.uk/api/2017/suggestions?prefix=<term>&alias=aps&mid=A1F83G8C2ARO7P&lop=en_GB`; `https://www.etsy.com/api/v3/ajax/public/search/suggestions?query=<term>&locale=en-GB`.

### 1b. What the suggestions say

| Signal | Evidence | What to do with it |
|---|---|---|
| Species ambiguity is the #1 SEO/ads problem | "for pets" is #2 on Amazon UK but 7 of 10 suggestions are human costumes; Amazon has "cat outfits for cats only" | Always write *for cats*; never bid on or title with bare "cat costume". Use "cat halloween costume pet", "costume for cats", "halloween costume for cats" (Amazon's only suggestions for "costume for cats"). |
| Spider is the named costume | "cat halloween costume spider" (Amazon #4), "dog costume spider" (Amazon #9) | Lead Halloween with the Spider Costume; title it "Spider Costume for Cats & Small Dogs". |
| Colour-first collar search | Amazon: black, blue, red, yellow, orange for bow tie; red, blue, green, orange, pink for bandana | Colour must be in the variant name and in the listing title; photograph every colour on a cat. |
| Safety is a search term | "cat bandana collar quick release" | Put "quick release"/"breakaway" in titles, not just in body copy. |
| Wedding and birthday are moments | Etsy: "cat bow tie wedding", "cat bandana with birthday cap"; Amazon: "cat bandana birthday" | Add a birthday bandana/hat SKU (the UK-stocked birthday set already in sourcing.md) and a wedding-white/black bow tie story. |
| UK Christmas shoppers think "Pets at Home" | DDG: "cat christmas outfit pets at home" | Christmas is the UK moment; price and copy against Pets at Home, not Amazon. Amazon adds "festive" as the modifier. |
| "Lion mane" is polluted by the haircut | 4 of 8 DDG suggestions are the "lion cut" groom; YouTube returns haircut videos | Use "lion mane costume for cats" everywhere; expect low organic search volume for the mane itself. |
| Dog demand is size-segmented and larger | Amazon: small/medium/large/XL dogs all auto-suggest; dog Halloween YouTube videos have 10–100× the views (§5) | "Small dogs" is the natural extension: every collar/bandana listing should say "cats & small dogs". |
| Search volume for making, not buying | DDG: bow tie pattern, bandana sewing/crochet pattern | Content angle: "no-sew" tutorials draw the crafting audience to the shop. |

---

## 2. Reddit — what people ask, worry about and love

Method: Reddit's search and JSON endpoints refuse anonymous requests from this network (302 to login), but a real Chromium session (Playwright) passes Reddit's automatic JS check, so searches across r/cats, r/CatAdvice, r/catpictures, r/AskUK, r/UKPets (plus r/CasualUK, r/britishproblems for UK voice) were run in the browser and 41 threads pulled as JSON. 187 threads found for the first five subreddits across seven queries; scores and dates are VERIFIED from the JSON.

### 2a. Volume by subreddit — where the conversation is

| Subreddit | Cat-costume/collar threads found (7 queries) | Largest thread | Note |
|---|---|---|---|
| r/cats | 47 | "Show me your cat's Halloween costumes!" — 1,369 upvotes, 94 comments (27 Oct 2025) | Annual photo-dump threads every late October |
| r/catpictures | 49 | mostly photo posts | Bow tie and bandana photo posts are common and warmly received |
| r/CatAdvice | 44 | "People costuming their cats up makes me feel uncomfortable" — 428 upvotes, 327 comments (May 2024) | The welfare debate lives here; also collar-safety threads |
| r/AskUK | 43 results, **0 about cat costumes** | "game-changing purchase for your cat" — 38 upvotes, 200 comments (Nov 2025), no clothing mentioned | UK voice absent on the topic |
| r/UKPets | 1 (a dog DIY post) | — | Sub is near-dormant |
| r/CasualUK | 0 cat costume; Halloween threads are about *not* dressing up | "TIL the UK doesn't dress up for Halloween like Americans do" — 8,647 upvotes, 528 comments | UK tone: low-key, self-mocking |

### 2b. Real comments, with links (all VERIFIED)

**Buying triggers and love**

1. "Are they okay with it for 15 minutes while I get photos for Christmas cards? Yep! No problem. They aren't stressed, they aren't constricted. And they are well rewarded." — u/amillionforfeet, 103 upvotes, r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/1colb49/people_costuming_their_cats_up_makes_me_feel/l3evkn5/
2. "They can handle wearing the stupid dino costume so we can send photos to grandma." — u/Overall_Advantage109, r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/1colb49/people_costuming_their_cats_up_makes_me_feel/l3ghmoq/
3. "He also has his 'handsome collar' (it's a Velcro bow tie + collar) and he'll rub the side of his face on it when I pull it out. Then he sits still for me to put it on, perches, and waits the attention and appreciation." — u/Shreddedlikechedda, r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/1colb49/people_costuming_their_cats_up_makes_me_feel/l3euu3h/
4. "I got my cat a plaid set a while ago and everyone that has seen him compliments his look." — u/hbirdgirl, on "I just couldn't resist getting these bow tie collars for our kittens" (480 upvotes). https://www.reddit.com/r/cats/comments/m9n32j/i_just_couldnt_resist_getting_these_bow_tie/grotcd6/
5. "Keep me posted this is the second post referring to cat drip and I want a lil bowtie for my fancy man." — reply on a request for custom university bandanas, r/cats. https://www.reddit.com/r/cats/comments/1krn84t/looking_for_recommendations_for_custom_university/mtetdjv/
6. "I've bought 6 costumes for my cat so far this year 🤣" — u/Winter_Cricket_2603, r/cats, Oct 2025. https://www.reddit.com/r/cats/comments/1ohu71p/show_me_your_cats_halloween_costumes/nlqvnxp/
7. "Would love a serotonin boost and tis the season. This year my cat is going as a chipwich" — OP, "Can you guys post your kitties Halloween costumes PLEASE", 31 Oct 2024. https://www.reddit.com/r/cats/comments/1ggld2n/can_you_guys_post_your_kitties_halloween_costumes/
8. "Don't worry, it lasts for 5 seconds and then she gets a million treats as payment for her suffering!" — OP, "Every year I put my cat in a birthday hat. Every year she hates it." (248 upvotes, Mar 2026). https://www.reddit.com/r/cats/comments/1s6w4s4/every_year_i_put_my_cat_in_a_birthday_hat_every/
9. "My husband always jokes that my kitts' bday is the worst day of their lives lol. I get all excited, sing to them, try to get bday hat pics, light a bday candle" — u/chance0432 on "It's her 3rd birthday! She hates the hat" (2,024 upvotes). https://www.reddit.com/r/cats/comments/1jmryaa/its_her_3rd_birthday_she_hates_the_hat/mkex3j4/
10. "I have a number of hats and a few capes that I'll put on fosters, as cute pictures help get them adopted." — u/Tylikcat, r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/1rvsq1d/where_do_i_do_i_find_a_good_lions_main_costume/oav0yo6/
11. "My cat loves dressing up. He has a pirate costume, and a pumpkin and a dragon" — u/BloodRhymeswithFood, r/cats. https://www.reddit.com/r/cats/comments/1j0zvvz/am_i_the_only_one_who_doesnt_like_or_understand/mffl6w4/
12. "Althea wanted to be a lion" (33 upvotes) and "Bingo the bat cat!" (43) and "Devil costume for the naughtiest boy" (21) — photo captions in the 1,369-upvote thread; lion, bat and devil all appear organically. https://www.reddit.com/r/cats/comments/1ohu71p/show_me_your_cats_halloween_costumes/

**Objections and worries**

13. "99% of the time, yeah cats fucking hate being dressed up." — u/BadBudget87, 48 upvotes, r/cats. https://www.reddit.com/r/cats/comments/1j0zvvz/am_i_the_only_one_who_doesnt_like_or_understand/mffm5bj/
14. "The cats dislike: knit textures, sleeves, anything tight, they don't seem to like wings and they HATE hats… They don't mind the cat scarfs at all." — u/Super_Reading2048, r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/1colb49/people_costuming_their_cats_up_makes_me_feel/l3gw9q4/
15. "take at least the bell off, they don't like it 🥲🥲 id would always put a collar with bow tie on mine but with no bells on" — u/gabbypmt on "Not Liking the Bow Tie". https://www.reddit.com/r/cats/comments/1h8xxaj/not_liking_the_bow_tie/m0wlj24/
16. "If kittens are light enough breakaway collars won't let go. Which is why oftentimes it's not recommended for kittens to wear collars unsupervised until they're ~9 months old." — u/nonacrina, r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/s4rnvl/catrescue_lady_claiming_collars_are_dangerous/hsudnn8/
17. "my cat wore a collar with a quick, snap release and she used to get her lower jaw caught on it when she would lick her chest" (20 upvotes) — answered: "That happens if the collar is too lose or too big for the cat." (18). https://www.reddit.com/r/CatAdvice/comments/s4rnvl/catrescue_lady_claiming_collars_are_dangerous/hstnqoa/
18. "The 'bell' argument is a bit 50/50 in most groups I've seen but more often than not leaning towards 'ditch the bells'." — u/burst-beat, r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/s4rnvl/catrescue_lady_claiming_collars_are_dangerous/hst0b9i/
19. "Damn how are you getting your cats in costumes? I'd loose an eye" — u/k-boots; "My cat would claw my face so hard I'd look like Liam Neeson in Dark Man." — u/secondtaunting, both on "Post your cat costumes" (354 upvotes). https://www.reddit.com/r/cats/comments/1gav0lb/post_your_cat_costumes/ltijy3z/
20. "I bought 2 little dresses for my kittens cause I thought it'd be cute for a Christmas picture but I saw a video from Jackson galaxy about how awful it is to dress up your cats and now I feel super guilty… Do you think I'll still be able to return it?" — OP, r/CatAdvice, 23 Dec 2022. https://www.reddit.com/r/CatAdvice/comments/zt3w7v/ross_pet_clothing_return_advice/
21. "when I put the pajamas on him he walked funny and kinda stayed close to the ground… I don't wanna make him uncomfortable" — first-time cat owner, r/CatAdvice, 10 Sep 2026. https://www.reddit.com/r/CatAdvice/comments/1wcwct7/is_it_okay_to_put_clothes_on_my_cat/
22. "Cruel, cats are not dolls." — u/Significant_Agency71; against "the cat shouldn't look uncomfortable or hunched over in said attire. They should be able to walk, jump and sit normally" — u/rtw1982 (10 upvotes). https://www.reddit.com/r/CatAdvice/comments/1rmupn8/is_putting_clothes_on_cats_cute_or_cruel/o928537/
23. "I need a better costume because this one is awful" — OP looking for a good lion's mane after a bad one, r/CatAdvice, Mar 2026; the reply: "I tend to check Etsy, Petco, Amazon and Chewy. Etsy is most likely to have quality." https://www.reddit.com/r/CatAdvice/comments/1rvsq1d/where_do_i_do_i_find_a_good_lions_main_costume/
24. "Everything is either boring, gaudy (and not in a fun way), or not even a breakaway. There has to be some place that sells…" — OP, "Places that sell funny/unique/super cute breakaway collars?", r/CatAdvice. https://www.reddit.com/r/CatAdvice/comments/lk7kq4/places_that_sell_funnyuniquesuper_cute_breakaway/

**UK tone**

25. "You're not allowed to take things too seriously in the UK so your costume needs to be kinda crap otherwise you're trying too hard." — 3,610 upvotes, r/CasualUK. https://www.reddit.com/r/CasualUK/comments/17gvnv0/til_the_uk_doesnt_dress_up_for_halloween_like/k6jt6ay/
26. "UK Halloween is generally Halloween themed, the dress up is Halloween themed. The US just treat it as fancy dress" — 272 upvotes, same thread. https://www.reddit.com/r/CasualUK/comments/17gvnv0/til_the_uk_doesnt_dress_up_for_halloween_like/k6kgaj1/

### 2c. What Reddit tells us, condensed

| Theme | Frequency in threads read | Implication for Catwalk Club |
|---|---|---|
| "Depends on the cat" — some love it, most tolerate a photo, some will never | Dominant view in all three debate threads (428, 99 and 29-comment) | Copy should say exactly this. It is honest, it pre-empts the return, and it is what buyers already believe. |
| Photo-then-off is the norm | Repeated: "15 minutes for Christmas cards", "5 seconds then treats", "2 minutes around holidays" | Design and copy for a 5-minute wear: quick on/off, no legs/sleeves, no tight fit. |
| Hats are hated; scarves, bandanas, loose capes, collars tolerated | Explicit ranking from owners | Prioritise collars, bandanas, capes and mane (worn like a collar); expect the pumpkin hat and Santa hat to be the "hated hat" — sell them as sets with the collar/scarf, which is what gets worn. |
| Welfare shaming is loud but not the buyer | Anti-costume posts are upvoted (428) yet costume photo threads are bigger (1,369; 2,024 for a birthday hat) | Do not argue with critics; show cats walking and sitting normally, keep durations short, never claim the cat "loves it". |
| Breakaway/bell/kitten safety is a buying criterion and a return reason | Whole 37-comment thread; multiple "bell off" comments | Removable bell (or sell without), fit guide with the two-finger rule, kitten warning (<9 months, under ~1.5 kg may not trigger the breakaway). |
| Where they'd shop: Etsy for "quality", Amazon for cheap | Named repeatedly | A UK brand with real cat photography can sit between the two on price and above both on fit guidance. |
| Sizing/"too big" is the most common product complaint | Reddit and supplier reviews agree | Neck measurement guidance on every page, which the site already has; state the minimum cat weight for the mane and spider. |

---

## 3. Supplier reviews and Amazon — why 5 stars and why 1–3 stars

Amazon UK/US review pages were blocked (see Blocked). The supplier reviews in `/home/user/sc/cat-costumes/supplier-reviews.md` (AliExpress feedback on the makers' own listings, fetched 20 Sep 2026) were re-read and the same public endpoint re-fetched today to get dates. These are reviews of the supplier's listing, not of Catwalk Club, and must never be displayed as ours (DMCC Act 2024).

### 3a. Listing totals (VERIFIED, `feedback.aliexpress.com/pc/searchEvaluation.do`, 26 Sep 2026)

| Product | Listing | Reviews | Average | 5★ share | 1–3★ share | GB reviews in sample |
|---|---|---|---|---|---|---|
| Bow Tie Collar | 3256803258255247 | 585 | 4.8 | 88.2% | 2.9% | 2 |
| Bandana Collar | 3256809426900401 | 194 | 4.7 | 80.9% | 6.2% | 5 |
| Lion Mane | 3256805876802123 | 104 | 4.6 | 81.7% | 12.5% | 3 |
| Spider Costume | 3256805889809397 | 38 | 4.6 | 76.3% | 7.9% | 0 |
| Pumpkin Hat & Ruffle Collar | 3256807081347725 | 8 | 4.6 | 75.0% | 12.5% | 0 |
| Santa Hat & Scarf Set | 3256809759699003 | 15 | 4.7 | 80.0% | 6.7% | 1 |
| Devil Bat Cape | 3256812487071410 | 0 | — | — | — | 0 |

### 3b. Recurring reasons for 5 stars (counts are mentions in the 80-review samples; VERIFIED from the file)

| Reason | Bow tie | Bandana | Lion mane | Spider | Sets | Exact words |
|---|---|---|---|---|---|---|
| Fit / adjustable / fits several cats | 14 | 6 | 1 | 2 | 2 | "Fits both my skinny guy and chubby girl", "Fits my adult 5kg cat", "Cute and fits every size!", "scarf fits perfectly" |
| Breakaway / safety buckle | 6 | 0 | — | — | — | "quick release clip nice peace of mind", "glad I bought it because it has a safety buckle", "anti-strangle" |
| Looks smart / compliments | 9 | 3 | — | — | — | "looks like a gentleman", "cat looks smart", "they get alot of comments and compliments", "my dog looks very smart" |
| Funny / transformation | — | — | 5 | 2 | 1 | "if you have an orange cat, it will look like a miniature lion", "laughed for a good 5 minutes", "The cat and neighbors are shocked" |
| As pictured / quality for price | 10 | 8 | 3 | 2 | 2 | "just like the photo", "prettier than in the picture", "Cute little collar for the money", "Great for the price" |
| Repeat / multiple colours | 7 | 1 | — | — | — | "Second time i ordered these collars", "red at christmas, blue and yellow plaid for spring/easter, orange for halloween", "I have several colors for my kitten" |
| Fast delivery | 6 | 4 | 1 | — | — | "arrived ahead of schedule", "11 days delivery to aus" |
| Gift for someone else's cat | 3 | — | 1 | — | — | "Got it for my friend's cat", "for my boyfriend's cat" |
| Occasion | 4 | 1 | — | — | 3 | "Loved it on her for xmas!", "Good for christmas time", "She looked so pretty for her 1st birthday" (birthday set listing) |

### 3c. Recurring reasons for 1–3 stars (and 4★ caveats)

| Problem | Product(s) | Mentions | Exact words | Fix before launch |
|---|---|---|---|---|
| **Too big / comes off small cats; scares young cats** | Lion mane (4 of 5 low reviews), pumpkin collar, Santa hat, bandana | 8 | "too big for 1-year-old cats, they get very scared", "for small cats it comes off, it's big", "The collar around the neck is too big for the cat", "the head piece is a bit big" | Publish min/max neck cm and minimum weight; photograph on a 3.5 kg cat, not a Maine Coon; size-up warning already on site — add "size-down if under 3 kg". |
| **Wire legs broken on arrival / wire may hurt** | Spider | 3 of 4 low reviews | "It came with a broken leg", "The item has a wire finish that may hurt pets. very dangerous", "legs… slightly loose… often need to be adjusted" | Inspect every unit on arrival; state "wire-cored legs, supervise wear, not for chewers"; consider swapping to a soft-leg spider. |
| **Clasp: too stiff to open, or too easy to pull off** | Bow tie | 3 | "difficult to open so you have to slip it over your head", "clasp is very fragile and unsafe… works for calm cats", "clasp is a bit stiff" | Explain the breakaway trade-off on the page (it *should* pop under a snag); show the clasp opening in a 3-second clip. |
| **Bow spins round / heavy bow / fur hides it** | Bow tie | 3 | "Sometimes the bow tie turns around on their necks", "Bow is pretty heavy and the cat didn't like it", "It's already covered in fur" (black cat, 3★) | Tip: tag between the bow straps weighs it down; photograph on black and on white cats. |
| **Bell** | Bow tie | 1 explicit + Reddit | "I removed the bell because it should not be used by cats" | Make the bell removable and say so. |
| **Sized for dogs, "ridiculously tiny" or "does not match spec"** | Bandana | 2 (1★, 2★) + 1 "bit big for a toy poodle" | "They are ridiculously tiny. not suited even for a small dog", "The size does not match the stated specifications" | Measure the actual S/M/L on samples and publish real cm, not the supplier's. |
| **Thin strap / weak clasp for dogs** | Bandana | 2 | "The strap clasp is not very strong and the nylon strap very thin. Would not be recommended for stronger larger dogs", "I wouldn't put a leash on the collar" | Sell it as a cat/small-dog accessory, never a lead collar. |
| **Cheap material / "mockery"** | Lion mane (GB, 1★) | 1 | "Cheap synthetic material, and a mockery of a cat!" | Source the fuller mane (sourcing.md) and photograph the difference; the welfare-objector will still one-star it. |
| **Velcro hat won't hold** | Santa set | 1 | "The headband has Velcro, so it doesn't hold well. But the scarf is adorable." | Position the set as scarf-first; hat is the bonus. |
| **Cat won't stay still** | Spider (4★) | 1 | "Cat won't stay still for me to attach properly" | Make the on-body clip a 10-second video, with treats. |

### 3d. Amazon (blocked) — what can still be said

Amazon UK search, product and review pages return an empty anti-bot page (HTTP 202, 1–2 kB) with desktop, mobile and full-header requests, and Amazon US returns 503. No Amazon review text or dates were obtained; the seasonality substitute is §4. The one Amazon signal we do have is its autocomplete (§1) and the prior finding in `competitors.md` that a lion mane retails there from £3.61 (VERIFIED 14 Sep 2026 by the earlier research, not re-fetched today).

---

## 4. Seasonality from review dates (Amazon substitute)

Method: month of each review on the suppliers' listings, fetched today from the public feedback endpoint. The endpoint returns at most the 80 most recent reviews per listing; for the lion mane, bow tie and Christmas hat listings that window happens to cover the full 12 months Sep 2025–Sep 2026. Reviews lag orders by roughly 2–5 weeks (AliExpress asks after delivery; China→UK/EU shipping is 10–20 days per sourcing.md) — ESTIMATED — so a November review peak means October orders. All counts VERIFIED.

| Listing (n) | Sep 25 | Oct | Nov | Dec | Jan 26 | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep 26 | Share Oct–Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lion Mane (80) | 1 | 12 | **28** | 15 | 13 | 5 | 4 | 0 | 0 | 1 | 0 | 0 | 1 | **85%** |
| Spider Costume (38) | 0 | 6 | **11** | 8 | 2 | 2 | 2 | 2 | 0 | 1 | 0 | 1 | 3 | **71%** |
| Christmas mini hats & scarves, 3256807594807087 (81) | 0 | 1 | 22 | **43** | 9 | 1 | 2 | 0 | 0 | 0 | 3 | 0 | 0 | **93%** |
| Santa Hat & Scarf Set (15) | 0 | 0 | 4 | **9** | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **100%** |
| Pumpkin Hat & Ruffle Collar (8) | 1 | **4** | 2 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 75% |
| Bow Tie Collar (80 most recent) | — | 9 | **15** | 14 | 9 | 5 | 9 | 4 | 2 | 3 | 2 | 8 | — | 59% |
| Flower collar, 3256806810179121 (100) | — | 14 | 7 | 13 | 3 | 12 | 9 | 14 | 6 | 8 | 4 | 6 | 4 | 37% |
| Bandana Collar (194, listing live from ~Jan 2026) | 0 | 1 | 3 | 0 | 3 | 10 | 22 | **36** | 35 | 31 | 24 | 17 | 12 | 4% |

Reading:
- **Costumes are a 14-week business.** The mane and spider effectively stop selling after January; Christmas sets sell only Nov–Dec. Orders for Halloween land in October (November reviews); the Christmas peak is in November–early December orders. With today 26 Sep, the Halloween ordering window is the next 3–4 weeks.
- **Collars sell all year with a Christmas bump.** The bow tie's worst month (May, 2 reviews) is still ~15% of its best; the flower-collar listing is flat across the year. Collars are the base load; the bow tie's Christmas peak is bigger than its Halloween one.
- **The bandana is a spring/summer product and a dog product** (most reviewers are dog owners; peak Apr–Jun). That is the counter-seasonal item for Feb–Aug, and the bridge to the small-dog range.
- ESTIMATED share of the year's costume revenue that falls in Oct–Dec: 75–85%, from the review shares above. Plan cash and stock for a Q4 that is 4–5× any other quarter.

---

## 5. YouTube and TikTok

Method: YouTube search-results pages parsed from `ytInitialData` (view counts VERIFIED, 26 Sep 2026). TikTok search and tag pages (`/tag/catcostume`, `/tag/cathalloweencostume`) render an empty app shell with no counts unless logged in — blocked, no bypass attempted.

| Query | Top results (views · age · title · channel) |
|---|---|
| cat halloween costume | 513,401 · 1 yr · "Best HALLOWEEN Pet Costumes ULTIMATE Compilation" · The Pet Collective · https://youtu.be/xphiJoCzt78 — 111,197 · 5 yr · "The 15 Best HALLOWEEN COSTUMES For CATS" · Trend Max · https://youtu.be/IwUcW3-DE7M — 82,066 · 11 mo · "Kitten Halloween Party! Costume Chaos" · Cult of Kittens · https://youtu.be/MlPgcJGyrgs — 46,080 · 2 yr · "Hilarious Halloween Pet Costumes" · The Pet Collective — 10,856 · 11 mo · "3 BEST Cat Halloween Costumes" · Best For Our Pets |
| cat costume | 584,170 · 5 yr · "Real CatWalk. Episode 4 of 5" · CatPusic Team · https://youtu.be/tjX6H0iFDLQ — 164,017 · 7 yr · "funny CATS in COSTUMEs compilation" — the rest are human costumes |
| cat wearing halloween costume reaction | 8,577,663 · 9 yr · "Cat mask scare (original)" — 926,542 · 3 yr · "Halloween Mask Prank On Cats" — 814,795 · 4 yr · "Funny Cats and Dogs Scared Of Halloween" — 193 · 11 mo · "Dressing Up the Cat for Halloween – Funny Reactions!" |
| dog halloween costume | 18,736,758 · "TRICK OR TREAT! Topi the Corgi" — 13,502,613 · "FUNNY Dogs Scared of Halloween" — 7,100,333 · "My Dogs Try On Halloween Costumes" (JennaMarbles) — 7,033,301 · "10 Halloween costume ideas for you and your dog" (Rosanna Pansino) — 5,449,964 · Maymo compilation |
| lion mane cat | 99,199 · "Jasper the Cat's Epic Lion Cut Transformation" (haircut) — 4,525 · Maine Coon lion haircut — 573 · "Cute cat with lion mane link" — 277 · "Cat Lion Mane" (product) — results dominated by the haircut and by real lions |
| cat bow tie collar | 90,207 · 12 yr · "How to Make a Cat Bowtie" (Pudge) — 40,365 · DIY no-sew pet necktie — 13,620 · crochet bowtie collar tutorial — 720 · product review — 15 · product listing video |
| cat christmas outfit | 120,768 · AI story channel — 46,896 · AI cat family — 527 · "Crochet Santa Hat for Cats" (2 days old) — 121 · Christmas tree pet hat tutorial (4 days old) |

What this says (VERIFIED counts, ESTIMATED interpretation):
- **Dog costume content has 10–100× the audience of cat costume content** (18.7M vs 0.58M top result). The same is true of the owner's friend's category. Extending to small dogs multiplies the reachable audience for the same video.
- **The cat format that travels is the reaction, not the catwalk**: "scared/not impressed/grumpy cat" clips reach 0.8–8.6M; earnest "best costumes" lists reach 10–110k. Film the honest reaction (the strawberry that is "a grumpy strawberry"), never a fake "she loves it".
- **Bow-tie search on YouTube is a DIY/craft audience** (90k, 40k, 13k for making one; 720 and 15 for buying one). "No-sew bow tie in 60 seconds — or buy ours for £8.99" is a content angle with an existing audience.
- **Lion mane content is polluted by the haircut**; the mane product itself has three-digit views. Do not expect organic YouTube discovery for it; it works as a reaction clip inside a "trying on 5 costumes" video.
- **Christmas cat-outfit search on YouTube is nearly empty of real cats** (AI channels and two crochet tutorials under a week old). Easy to own with one real video in November.

---

## 6. Buying triggers, objections, moments and words — the summary

### 6a. Buying triggers (ranked by how often they appear across §1–§5)

| # | Trigger | Evidence | Product it sells |
|---|---|---|---|
| 1 | The photo: Christmas card, grandma, Instagram, "serotonin boost" thread | Reddit #1, #2, #7; 1,369-upvote photo thread; "photos" in 6 supplier reviews | Everything; sets for Christmas, spider/bat/mane for Halloween |
| 2 | Looking smart every day — "handsome collar", "dapper", "gentleman", compliments | Reddit #3, #4, #5; 9 bow-tie reviews | Bow Tie Collar (year-round base load) |
| 3 | Seasonal colour rotation — one buyer owns four collars for four seasons | Bow-tie review (US, Oct 2025); "second time I ordered" ×2 | Bow tie in Christmas red/tartan, Halloween orange, spring plaid |
| 4 | Birthday | 2,024- and 667-upvote r/cats threads; Etsy "bandana with birthday cap"; Amazon "cat bandana birthday" | Add the UK-stocked birthday bib + hat set from sourcing.md |
| 5 | Matching family/household costume ("our family costume this year is Fear and Loathing") | Reddit 1ohu71p, 56 upvotes; CatAdvice "matching costume for two cats" | Pairs/bundles; "for cats & small dogs" |
| 6 | Gift for a friend's or partner's cat | 4 supplier reviews | Gift note, gift wrap, Christmas cut-off date |
| 7 | Foster/adoption photos | Reddit #10; r/cats "holiday bow tie for an adoption event" | Rescue partnership: donate collars, get UGC |
| 8 | Wedding | Etsy "cat bow tie wedding" | Black/white bow tie, "cat of honour" angle |
| 9 | Safety upgrade — wants a breakaway that is also nice | Reddit #24; 6 reviews on the buckle; Amazon "quick release" | Breakaway in the title, clasp demo video |

### 6b. Objections (ranked) and the honest answer

| # | Objection | Honest answer that stays inside ASA/DMCC |
|---|---|---|
| 1 | "My cat will hate it / won't let me" | "Most cats tolerate a collar or cape for a photo; some never will. Quick on, quick off, treats. If it's not for your cat, return it within 30 days." Never say "cats love it". |
| 2 | "It's cruel / for internet points" | Show cats walking, sitting and jumping normally in the product; state wear-time guidance (a few minutes for a photo); no claims of comfort or calming (ASA). |
| 3 | "Too big / it fell off / scared my young cat" | Real neck-cm ranges from measured samples, minimum cat weight for mane and spider, size-down advice under 3 kg, the site's size finder. |
| 4 | "Is the breakaway safe? Kittens? The bell?" | Breakaway explained with the trade-off; kitten guidance (<9 months may not trigger it, supervised wear); bell removable; not for lead use. |
| 5 | "The wire legs" | Inspect each spider; describe the construction; "supervised wear only, not for chewers". |
| 6 | "Amazon has it for £3.61" | Fuller mane, UK dispatch, real photos, fit help and returns — say that, and price the mane as the traffic item (£7.99–9.99, as sourcing.md recommends). |
| 7 | "Cheap-looking / mockery" (the GB 1★) | Cannot be argued away; keep photography honest and let the welfare-objector pass. |

### 6c. Moments — when UK buyers actually buy

| Moment | UK strength | Window (orders) | Evidence |
|---|---|---|---|
| Christmas photo / gift | **Strongest in the UK** | 1 Nov – ~18 Dec | 93–100% of Christmas-set reviews Nov–Jan; bow-tie peak Nov–Dec; UK searchers ask for "cat christmas outfit pets at home" |
| Halloween | Strong in US/EU, muted in UK | now – ~20 Oct | 71–85% of costume reviews Oct–Jan; CasualUK 8,647-upvote thread on not dressing up; no UK sub has a cat-costume thread |
| Birthday | Year-round, small but steady | any | Two r/cats birthday-hat posts at 2,024 and 667 upvotes in 2025–26; Etsy/Amazon birthday suggestions |
| "Handsome collar" / everyday photo | Year-round | any | Bow-tie reviews in every month; r/catpictures bow-tie posts |
| Spring/summer bandana (dogs) | Feb–Aug counter-season | Mar–Jul | Bandana listing peak Apr–Jun, mostly dog buyers |
| Wedding | Niche, Apr–Sep | — | Etsy suggestion only |
| Adoption/foster photo | Year-round, rescue partnerships | — | Reddit #10 |

### 6d. The exact words buyers use (for titles, ads, hashtags and copy)

- **Positive:** "dapper", "handsome", "gentleman", "fancy man", "cat drip", "looks smart", "so cute on my calico", "prettier than in the picture", "just like the photo", "peace of mind", "quick release", "breakaway", "safety buckle", "fits my 5 kg cat", "looks like a miniature lion", "the cat and neighbours are shocked", "laughed for five minutes", "sassy pumpkin", "grumpy strawberry", "serotonin boost", "tis the season".
- **The honest middle (use these — they are the community's own framing):** "not impressed", "not amused", "she hates it but it lasts five seconds", "tolerates it for a photo", "a million treats as payment", "take it off immediately if they don't like it".
- **Negative (pre-empt them):** "too big", "comes off", "scared", "walked funny / stayed close to the ground", "flops over", "the bell", "broken leg", "wire", "ridiculously tiny", "doesn't match the stated size", "cheap synthetic", "mockery", "cats aren't dolls".
- **Search phrasing to mirror:** "halloween costume for cats", "cat costumes for pets", "cat bow tie collar [colour]", "cat bandana collar quick release", "cat christmas outfits festive", "cat santa hat", "lion mane costume for cats", "spider costume for cats", "cat outfits for cats only".

---

## 7. Implications for the £100k plan (ESTIMATED, from the evidence above)

1. **Q4 is the year.** With 75–85% of costume demand in Oct–Dec and the Halloween order window closing around 20 October, the launch must be live and stocked this week; Christmas (sets + red/tartan bow ties) is the larger and more UK-native peak and needs stock by 1 November.
2. **Collars carry January–September.** The bow tie sells in every month and has the margin; build the year-round catalogue around collars and bandanas (add birthday, wedding and more colours) and treat costumes as the seasonal spike, exactly as competitors.md concluded.
3. **Go where the audience is.** UK Halloween pet demand is thin; the Halloween audience and the big video numbers are American and dog-owning. Selling to the US/EU and adding "cats & small dogs" to collars, bandanas and the spider are the two cheapest multipliers of reachable demand.
4. **The content format is the reaction, the tone is British self-mockery.** "She hates it, it lasted five seconds" out-performs "she loves it" on every platform measured and keeps the copy honest under ASA/CAP.
5. **Fix the three product risks before they become reviews:** mane/collar sizing on small cats, spider wire legs, removable bell.

---

## Blocked / not obtainable

| Source | What happened | What was used instead |
|---|---|---|
| Google Trends | Not available in this environment | Autocomplete ranking (§1) and review-date seasonality (§4) |
| Amazon UK / US search, product and review pages | HTTP 202 empty anti-bot page (UK, desktop and mobile UA, full browser headers, real Chromium) and 503 (US); no captcha attempted | Amazon UK autocomplete API (works); supplier review text and dates (§3–4); the £3.61 mane price from competitors.md (14 Sep) |
| Etsy search and listing pages | HTTP 403 in curl and in Chromium | Etsy autocomplete API (works) |
| Reddit search/JSON via curl | 302 to login ("lor2") on old.reddit.com, 403 on www/api | Real Chromium session passes Reddit's own JS challenge; searches and 41 thread JSONs fetched |
| r/UKPets | Effectively dormant; no relevant threads | r/AskUK, r/CasualUK, r/britishproblems for UK voice |
| DuckDuckGo HTML search | Captcha ("select all squares containing a duck"); not bypassed | Autocomplete endpoint (works); Bing rendered an empty shell |
| TikTok search and tag pages | Render an empty shell without login; no view/post counts | YouTube search-result view counts (§5) |
| Pets at Home search | Page loads but results are client-rendered; "0 results" in HTML | Noted only as a search-intent signal ("cat christmas outfit pets at home") |
| AliExpress feedback pagination | Endpoint returns at most 80 reviews per listing | Full year covered for the mane, bow tie and Christmas-hat listings anyway |

Working files: `/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/demand/` (autocomplete JSON, `reddit_threads.json`, `reddit_threads_data*.json`, `reddit_comments.txt`, `ali_<listing>.json`, YouTube HTML).
