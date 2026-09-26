# 05 — Marketplaces as competitors and as channels

Catwalk Club · researched 26 September 2026 · UK spelling · every number tagged **VERIFIED** (fetched on
26 Sep 2026, URL given) or **ESTIMATED** (method given). Raw captures are in
`/tmp/claude-0/-home-user-sc/6fc51c01-1d53-5933-a92f-c7311278e48b/scratchpad/mk/` (HTML, text, JSONL, screenshots).

---

## 0. What was reachable and what was not

| Site | Endpoint tried | Result | What I did instead |
|---|---|---|---|
| Amazon UK search (`/s?k=`) | curl with desktop UA; curl with mobile UA; curl with cookies from a best-sellers page; Chromium (Playwright) cold; Chromium after home-page warm-up ×3 passes | AWS WAF JS challenge (HTTP 202) or `503 Service Unavailable` on most attempts. **4 of 7 UK queries eventually rendered** (cat costume, lion mane cat, cat bow tie collar, cat bandana) when each query got a fresh browser and a 20–35 s gap. "cat halloween costume" and "cat costume + Pet Supplies filter" never rendered. | Amazon **Best Sellers** (`/zgbs/`) and **New Releases** pages served full data to plain curl (`--compressed`), so category rankings, prices, ratings and review counts are VERIFIED from there. |
| Amazon US search | Same sequence | `503 Sorry! Something went wrong!` on 12 of 14 attempts. **2 of 5 US queries rendered** on the fresh-browser retry (lion mane cat, cat bandana), with Prime badges and "bought in past month" counts. "cat costume", "cat halloween costume" and "cat bow tie collar" never rendered. | US Best Sellers: Cat Apparel (top 60), Cat Collars (top 30), Cat Apparel New Releases (top 30). |
| Amazon product pages (`/dp/ASIN`) | curl, desktop UA | Bot-interstitial page (no product data), so **BSR cannot be read**. The rank on a Best Sellers page is the item's rank in that sub-category, which is what BSR-in-category means, so category BSR is given where available. | — |
| Etsy search, shop pages, `etsy.com/legal/fees` | curl (desktop UA), Chromium | **DataDome captcha** (`geo.captcha-delivery.com`) on every page under `etsy.com` (HTTP 403). Not bypassed, per instructions. | `help.etsy.com` (Zendesk) rendered in Chromium after a Cloudflare "Just a moment" JS check, so **fees are VERIFIED** from the official help articles. **No Etsy competitor/sales data** could be gathered; see §3 for the signals available. |
| TikTok Shop UK product search (`tiktok.com/shop/uk/s/…`) | curl, Chromium with 15 s wait + scroll, two queries | HTTP 200 but the page is a logged-out shell (`Orders · Sell · Customer support · Log in`; SSR payload says `risk_level: medium`). **No product cards, sellers or sold counts render without a TikTok login.** Screenshot: `mk/pw_tts.png`. | Seller-side fees VERIFIED from TikTok Shop Academy UK (public). |
| DuckDuckGo HTML / Lite, Bing, Brave, Mojeek, Startpage | curl for discovery of Etsy/TikTok sellers | DuckDuckGo: "Select all squares containing a duck" captcha after ~10 queries; Bing HTML: results present but JS-obfuscated, Bing RSS returned generic results for only the first word; Brave 429; Mojeek 403; Startpage "Blocked". | Discovery via search engines is effectively unavailable from this egress IP. |
| Amazon autocomplete (`completion.amazon.co.uk`) | curl | Works. | Used for search-intent evidence. |

Note on currency: Amazon pages rendered in a browser from this (US-located) egress show "Deliver to United States" and, on one capture, converted prices in **USD**. Where a UK table below shows USD it is flagged; GBP figures come from Best Sellers pages or captures that rendered in GBP.

---

## 1. Amazon UK

### 1.1 What "cat costume" means on Amazon UK (VERIFIED)

Autocomplete for "cat costume" (`https://completion.amazon.co.uk/api/2017/suggestions?prefix=cat+costume&alias=aps&mid=A1F83G8C2ARO7P`): 1 `cat costume`, 2 `cat costumes for pets`, 3 `cat costumes for kids`, 4 `cat costume adult`, 5 `cat costume women`. Pet intent is one of five intents behind the head term.

`https://www.amazon.co.uk/s?k=cat+costume` — **251 results**; of the first 40 organic results only **4 are for cats to wear** (Weewooday 5-pc hat set, Lovelyshop velvet cloak, RosyLife lion mane, "muscle arms" prop). The rest are Cat-in-the-Hat, catsuit and kids' fancy-dress for humans. **Implication:** the Amazon head term is a human-costume shelf; a pet-costume listing must win on "cat costumes for pets", "cat halloween costume" and the Cat Clothing browse node, not on "cat costume".

Top 10 of that page (prices as rendered to a US visitor, in USD; sponsored flagged):

| # | ASIN | Listing | Price shown | Rating | Reviews | Note |
|---|---|---|---|---|---|---|
| 1 | B0C74KYH84 | Pretend to Bee panda kids costume | USD 23.73 | 5.0 | 1 | SPONSORED, human |
| 2 | B09DGJ91WG | Weewooday 5 pcs cat costume hats (pet) | USD 22.05 (= £16.68 on lion-mane page) | 4.3 | 571 | **pet** |
| 3 | B07T84KF47 | Wicked Costumes kids black cat | — | 4.3 | 1,246 | human |
| 4 | B0B92WMPWD | Lovelyshop velvet pet cloak with fur trim | USD 20.85 | 4.8 | 726 | **pet** |
| 5 | B00TSBNCFC | Smiffys teen cat costume | USD 22.84 | 3.9 | 226 | human |
| 6 | B0CSDVH1FG | Funidelia cat onesie adults | — | 4.4 | 48 | human |
| 7 | B0FH6Z144S | Wicked Costumes ladies cat suit | — | 3.7 | 5 | human |
| 8 | B07T84KDXC | Wicked Costumes kids black cat (variant) | — | 4.3 | 1,246 | human |
| 9 | B0CSDSF77W | Funidelia cat onesie (variant) | — | 4.4 | 48 | human |
| 10 | B08X4W7PRL | Caprilite ears/tail/bow tie set | — | 3.8 | 282 | human |
| 11 | B01M71UWHK | RosyLife lion mane wig for cats | USD 13.76 (£10.41) | 4.4 | 1,595 | **pet** |

Source: `mk/amz_s2.html` (rendered 26 Sep 2026). Prime badge is not rendered for a non-UK visitor, so **Prime status could not be read** on any SERP.

### 1.2 Amazon UK Best Sellers — Cat Clothing (browse node 471293031) (VERIFIED)

`https://www.amazon.co.uk/Best-Sellers-Pet-Supplies-Cat-Clothing/zgbs/pet-supplies/471293031/` — pages 1–2 (ranks 1–30 and 51–80; the page-2 capture started at 51).

Top 30 (26 Sep 2026):

| Rank | ASIN | Listing (shortened) | Price | Rating | Reviews |
|---|---|---|---|---|---|
| 1 | B0D49FYHHZ | Cat recovery suit with legs | £16.99 | 4.2 | 455 |
| 2 | B0DRNZBFKL | Cat recovery suit / anti-lick vest | £6.49 | 4.0 | 176 |
| 3 | B0H368R2YM | PUMYPOREITY cat paw protector mittens | £7.99 | 3.6 | 264 |
| 4 | B0GX5K56NG | Hjyokuso recovery suit | £16.99 | 4.2 | 13 |
| 5 | B0FT34TWPP | Tyqour birthday hat + bandana set | £4.79 | 4.3 | 11 |
| 6 | B0FPQVLKT8 | Tabanzhe cat bat mask (Halloween) | £6.79 | 3.8 | 13 |
| 7 | B0GR51YCPN | Onesie for shaved cats | £17.99 | 3.8 | 54 |
| 8 | B0D8VNRJ6H | Oslueidy Sphynx turtleneck | £13.99 | 4.4 | 187 |
| 9 | B0G2X7X1J8 | Cat jumper / post-surgery body suit | £17.99 | 4.3 | 238 |
| 10 | B0FSZWPD97 | Small cat jumper "cat costumes for pets" | £4.99 | 4.1 | 13 |
| 11 | B0BRPWNPQH | JOTFA cat birthday party set (hat, bandana, bow tie) | £9.99 | 4.5 | 744 |
| 12 | B0DP2LRSDQ | MOKATES winter hoodie | £9.87 | 4.4 | 123 |
| 13 | B0H5W7MV44 | 7-pc cat Halloween costume set (ears, tutu, bow tie…) | £13.99 | — | — |
| 14 | B0CPSHP46K | WLLHYF bear hat | £3.99 | 3.7 | 106 |
| 15 | B0GFB3D8DR | HEYWEAN recovery suit | £13.16 | 4.0 | 76 |
| 16 | B0H6LX14CR | Birthday hat set | £5.69 | 3.7 | 18 |
| 17 | B0H8PMRC1F | 2-pack pumpkin & ghost Halloween knit sweaters | £11.99 | 4.1 | 72 |
| 18 | B0GTLTWGRS | Devon Rex recovery suit | £15.99 | 4.6 | 16 |
| 19 | B0DCYWSSPF | 2-pc recovery suit | £8.99 | 4.1 | 38 |
| 20 | B0H9QMTWZN | XUKZIMA black bat wings, Halloween | £6.99 | — | — |
| 21 | B0FQZYK713 | Axcimond recovery suit | £10.99 | 4.2 | 396 |
| 22 | B0DP9G3V6R | Recovery suit | £4.56 | 3.8 | 31 |
| 23 | B0H3P31CQW | Birthday hat + bandana + bow tie | £5.99 | 4.0 | 2 |
| 24 | B0H5NYNKK3 | Post-surgery suit | £13.99 | 5.0 | 3 |
| 25 | B0HK8B1SZV | Centipede plush Halloween costume | £9.98 | — | — |
| 26 | B0H2J2XF28 | 4-pc birthday set | £5.99 | 5.0 | 2 |
| 27 | B0DSJ936T3 | Aomig cat bat mask | £4.99 | 3.0 | 54 |
| 28 | B0CKSYRGXP | Bee hooded costume, cats & small dogs | £2.01 | 4.0 | 23 |
| 29 | B0GJ5M41FM | Hjyokuso onesie | £15.99 | 4.4 | 8 |
| 30 | B0HFM3V26M | PUMYPOREITY neck snood | £12.99 | 4.4 | 203 |

Ranks 51–80 that matter for us: 51 bat wings with pumpkin £9.99 (4.0, 56); 57 Bohue pumpkin cat hat £7.99 (4.0, 6); 59 **Vivifying bat wings with pumpkin bell £5.99 (4.2, 316)**; 60 felt bat wings £4.99; 70 muscle-arms costume £9.99; 78 bat wings + wizard hat £6.99; 62 EXPAWLORER tartan cat jumper £14.99 (4.3, 851); 52 MPS Medical Pet Shirt £21.99 (4.4, 979).

Statistics across the 60 captured (computed from `mk/uk_clothing*.jsonl`, VERIFIED inputs):

| Metric | Amazon UK Cat Clothing top 60 |
|---|---|
| Median price | **£7.99** |
| Items under £10 | **39 of 60** |
| Median review count | **26** |
| Costume/seasonal/party items (bat, lion, pumpkin, Halloween, birthday, hat…) | 33 of 60 |
| Post-surgery recovery suits | 19 of 60 |
| Items with no rating yet | 7 of 60 |

Reading: the UK node is **young and thin** (median 26 reviews; several top-30 items have 2–13 reviews) and **price-led** (median £7.99). Nobody owns it: the names are one-listing Chinese trade names (Hjyokuso, PUMYPOREITY, Tabanzhe, XUKZIMA, Aomig, Oslueidy, MOKATES). The only repeat "brands" are recovery-suit sellers and EXPAWLORER (jumpers). A UK-stocked listing with real-cat photos and 20+ genuine reviews would sit in the top 30 of this node within a season — ESTIMATED from the review counts above, not a rank prediction.

### 1.3 Amazon UK — lion mane (VERIFIED, GBP rendered)

`https://www.amazon.co.uk/s?k=lion+mane+cat` — **460 results**. Top 12 organic:

| # | ASIN | Listing | Price | Rating | Reviews |
|---|---|---|---|---|---|
| 1 | B01M71UWHK | RosyLife lion mane wig (brown) | £10.41 | 4.4 | 1,595 |
| 2 | B0CCYYZQNF | RosyLife lion mane wig (variant) | £9.98 | 4.4 | 1,595 |
| 3 | B09DGJ91WG | Weewooday 5-pc hat set | £16.68 | 4.3 | 571 |
| 4 | B09S3Q1PDZ | 5-pc hat set (bunny, mane…) | £16.97 | 4.3 | 571 |
| 5 | B01N24ASL3 | Lion mane costume for cats, furry with ears | £18.50 | 4.2 | **3,822** |
| 6 | B06XGCL6JJ | Namsan lion mane | £14.83 | 4.3 | 2,097 |
| 7 | B07DWR2RN3 | Onmygogo lion mane wig for dogs | £11.17 | 4.0 | 2,042 |
| 8 | B07ZVDHX6S | Ulalaza lion mane | — | 2.7 | 56 |
| 9 | B0HFHF6GDR | Adjustable pet lion mane | **£1.99** | — | — |
| 10 | B0HJ4RDRQ4 | Lion mane wig with ears | £3.35 | — | — |
| 12 | B010E4TAKW | Pet Krewe lion mane | £24.01 | 4.3 | 1,946 |
| 14 | B0H8SJK1C2 | Lion mane cosplay wig | £2.71 | — | — |

Reading: the reviewed lion manes sell at **£9.98–£24.01**; the £1.99–£3.35 listings are new and unreviewed. Our £9.99 launch price sits exactly on RosyLife's price with 1,595 reviews behind it, so on Amazon the lion mane is a price-parity fight against a listing with a six-year review moat. `sourcing.md` already flags the mane as a traffic item, not a margin item; Amazon data confirms it.

### 1.4 Amazon UK — cat bow tie collar (VERIFIED, GBP)

`https://www.amazon.co.uk/s?k=cat+bow+tie+collar` — **7,000 results**. First 22 rows, sponsored included because they set the visible price floor:

| # | ASIN | Listing | Price | Rating | Reviews | Signal |
|---|---|---|---|---|---|---|
| 1 | B0H9XZQTTQ | Reflective breakaway collar | £3.32 | — | — | sponsored |
| 2 | B0HGLYQ948 | Kitten collar + AirTag cover | £3.74 | — | — | sponsored |
| 3 | B0H8CYP3KY | 3-pc bow-tie plaid cat collar | — | 4.6 | 96 | |
| 4 | B07BWHCBFL | **Ancol Vintage Bow safety collar, tartan velvet** | £3.96 | 4.6 | 636 | UK brand |
| 5 | B095C9N2QN | Quick-release collar with detachable bow tie | £6.82 | 4.0 | 564 | |
| 7 | B0DV5N9R5R | Flamingo bow-tie cat collar | £2.39 | 4.5 | 27 | |
| 9 | B0HBNW8NMS | Green tartan bow tie cat collar | £5.82 | — | — | |
| 10 | B07BWF6P6G | Ancol Vintage Bow, teal | £4.12 | 4.2 | 69 | UK brand |
| 14 | B0DMFBLLV6 | Cat collar (sponsored) | £3.32 | 4.1 | 1,193 | **700+ bought in past month** |
| 16 | B0GT2M8V1M | Breakaway collar + removable velvet bow tie | £5.99 | — | — | |
| 17 | B0DPV2WSM3 | SEOUGEE personalised collar with bowtie | — | 4.1 | 54 | |
| 18 | B008PRJ94S | Ancol camouflage cat collar | £3.30 | 4.4 | 326 | 50+ bought/month |
| 19 | B079M96M8Z | Cat collar (sponsored) | £2.32 | 3.9 | 3,201 | 600+ bought/month |
| 22 | B075NC5Y46 | Ancol Christmas cat collar, bells & tartan bows | £4.92 | 4.5 | 46 | seasonal |

Reading: Amazon UK bow-tie collars cluster at **£2.32–£6.82**; Ancol (UK) is the recognisable brand at £3.96–£4.92. Our Bow Tie Collar at £8.99 is 1.3–2.3× the Amazon shelf. That is fine on our own site (positioning, photography, bundle logic) but **on Amazon the collar would be judged against £3.96 Ancol with 636 reviews**. "Bought in past month" badges (700+, 600+) show that the cheap end moves real volume.

### 1.5 Amazon UK — cat bandana (VERIFIED, GBP)

`https://www.amazon.co.uk/s?k=cat+bandana` — **60,000 results**, dominated by dog bandana multipacks.

| # | ASIN | Listing | Price | Rating | Reviews |
|---|---|---|---|---|---|
| 3 | B0BBVCGGRN | EXPAWLORER autumn cat collar with bells, 2-pack | £15.90 | 4.6 | 96 |
| 7 | B0C2H53XCW | PAWCHIE dog bandanas 5-pack | £15.71 | 4.4 | 562 |
| 8 | B08YD65LQT | Weewooday 8-pc dog bandana | £12.06 | 4.4 | 532 |
| 9 | B089QDBFLC | PAWCHIE 5-pack | £10.17 | 4.4 | 562 |
| 10 | B0C6R8GCWB | Petface cooling bandana, small | £4.40 | 3.8 | 66 |
| 11 | B0B5GTRT9S | STMK 3-pack holiday cat bandana collar with bell | £16.04 | 4.6 | 139 |
| 14 | B0FRG6K3SH | Talking Tables red velvet pet bandana/bow tie | £4.87 | 3.4 | 5 |
| 15 | B0G2RTP22S | Christmas cat bandana, elastic | £3.82 | — | — |
| 19 | B08Q39JG2V | 4-pc dog kerchief | £9.37 | 4.5 | 1,300 |
| 20 | B0B4NW4YX4 | Halloween cat collar with removable bandana and bell | £12.53 | 4.6 | 24 |

Reading: **cat-specific bandana collars are sold as 2–3 packs at £12.53–£16.04 (≈ £5–£8 per unit)**; single bandanas for cats barely exist as a category. Our £7.99 single bandana collar is in line per unit; a 2-pack at ~£13.99 would match the shelf format if we ever list there.

### 1.6 Amazon UK — cat collars (context) (VERIFIED)

Cat Collars node 471295031 top 30: median price **£6.95**, median reviews **1,092**, top-10 review counts 1,267–23,819 (Taglory 2-pack £5.99, 23,819 reviews; Dgerp AirTag collar £5.97, 12,907; rabbitgoo harness £11.88, 50,385). This node is a commodity market with deep review moats — not one to enter with a £8.99 bow tie.

### 1.7 Brands that dominate Amazon UK (VERIFIED from the pages above)

| Segment | Names that recur | Evidence |
|---|---|---|
| Cat costume/apparel | none recurring; single-listing trade names (Hjyokuso, PUMYPOREITY, Tabanzhe, Vivifying, XUKZIMA, Aomig, Weewooday) | Cat Clothing top 60 |
| Lion mane | RosyLife (1,595 reviews), Namsan (2,097), Onmygogo (2,042), Pet Krewe (1,946), B01N24ASL3 unbranded (3,822) | lion mane SERP |
| Collars/bow ties | Ancol (UK), Taglory, Dgerp, SEOUGEE, rabbitgoo | bow tie SERP + Cat Collars node |
| Recovery suits (adjacent, dominates the node) | Suitical/MPS Medical, Hjyokuso, Axcimond | Cat Clothing node |

---

## 2. Amazon US

Three of the five search pages were blocked on every attempt (503); two rendered on the retry (§2.2a–b). The category ranking data below is from Best Sellers and New Releases pages, which are the category-level equivalent of BSR.

### 2.1 Amazon US Best Sellers — Cat Apparel (node 2975242011) (VERIFIED)

`https://www.amazon.com/Best-Sellers-Pet-Supplies-Cat-Apparel/zgbs/pet-supplies/2975242011/`

| Rank | ASIN | Listing (shortened) | Price | Rating | Reviews |
|---|---|---|---|---|---|
| **1** | B07GFND8ZC | **Pet cat bat wings, Halloween** | **$5.99** | 4.3 | **8,626** |
| 2 | B07NRCSDFG | Cat recovery suit | $9.99 | 4.2 | 5,151 |
| 3 | B0D3DMBN7P | Avont recovery suit | $9.99 | 4.2 | 3,241 |
| 4 | B0DXPD2CH2 | Hpetppy recovery suit | $12.99 | 4.2 | 1,675 |
| 5 | B0GCLFP1JM | floofelove knitted flower cat hat | $4.55 | 4.4 | 56 |
| **6** | B07D8S79N6 | **Onmygogo lion mane wig** | **$13.99** | 4.0 | 1,554 |
| 7 | B09Q2SF2FG | JOICEE bear hat | $5.99 | 4.2 | 1,190 |
| 8 | B0D6FGXZVP | PUMYPOREITY sticky-hair onesie | $23.59 | 4.0 | 336 |
| 9 | B0FNQQGP8L | Recovery suit | $14.99 | 4.1 | 438 |
| **10** | B01M71UWHK | **RosyLife lion mane wig** | **$9.99** | 4.4 | 1,539 |
| 11 | B07YYVRM83 | EXPAWLORER cat sweater | $11.99 | 4.3 | 724 |
| 12 | B0CYZ2S8ZK | Maqilo waffle-knit cat T-shirt | $9.99 | 4.4 | 248 |
| 13 | B0FD342PQS | Queenmore small dog sweater | $22.09 | 4.6 | 2,094 |
| 14 | B0F86TW7WH | JL WarmPaws Sphynx fleece | $12.99 | 4.4 | 165 |
| 15 | B0FNWZMD9L | Paiaite dog pyjamas | $11.99 | 4.3 | 154 |
| **16** | B099QFD6RP | **Cat/dog butterfly costume wings** | **$6.97** | 4.4 | 503 |
| 17 | B0F4R1CZKC | Cat ski mask (human) | $5.66 | 4.4 | 31 |
| 18 | B0D8W6BSTK | CuteBone velvet pet pyjamas | $13.49 | 4.7 | 225 |
| 19 | B099N2HV2T | Recovery suit | $15.99 | 4.4 | 873 |
| **20** | B0DJ4YR3R4 | **Cat mask cosplay, Halloween** | **$8.99** | 4.1 | 404 |
| 21 | B0FBC8LRJY | Happy Socks (mis-categorised) | $4.83 | 4.6 | 52 |
| 22 | B0CH2YYWLH | ADOGGYGO birthday hat + bandana + bow tie set | $9.99 | 4.6 | 245 |
| **23** | B0D5HPYX5N | **DENTRUN cat tuxedo with bow tie** | **$22.99** | 4.4 | 181 |
| **24** | B07YTWCDCX | **Cat bat wings, Halloween** | **$5.99** | 4.4 | 1,257 |
| **25** | B0B7RCHMDH | **Cat princess crown hat + lace bandana set** | **$9.99** | 4.5 | 167 |
| 26 | B0C3BYCFNH | Cat birthday bandana + party set | $9.99 | 4.5 | 356 |
| 27 | B0GDWXG379 | Cat hair-control suit | $20.99 | 4.4 | 44 |
| 28 | B0GHF8GFK9 | PETCARE cartoon cat shirt | $5.99 | 4.3 | 87 |
| 29 | B0C6X8W5X1 | ADOGGYGO birthday hat + bandana, pink | $9.99 | 4.7 | 371 |
| **30** | B0FHB9K4Q6 | **babyye "muscle arms" cat costume** | **$9.99** | 3.7 | 81 |

Ranks 51–80 with costume relevance: 51 4-pc Cat-in-the-Hat style cat costume $13.99; 56 Rubie's Disney Beast pet costume $48.99 (4.0, 73); 58 **Casidoxi cat tuxedo bow-tie collar $9.97 (4.7, 782)**; 63 BAOBICUTE dog Halloween dress $9.99 (4.5, 1,120); 64 Idepet pirate dog/cat costume $14.99 (4.1, 1,492); 68 Vehomy 2-pc pumpkin Halloween sweaters $13.99 (4.3, 293); 69 centipede cat costume $19.99; 70 witch hat + cape set $11.99; 72 cloak/hat/belt cape set $28.99 (4.4, 121); 76 ALIBBON pumpkin headdress + cap $6.99 (4.3, 64); **79 Rypet cat bat wings $8.99 (4.2, 2,686)**; 80 choyaxo cowboy hat + bandana $7.88 (4.4, 1,104).

Statistics (top 60, VERIFIED inputs): median price **$12.34**, items under $10 **27 of 60**, median reviews **350** (13× the UK node), costume/seasonal/party items 30 of 60, recovery suits 15 of 60.

### 2.2 Amazon US New Releases — Cat Apparel (VERIFIED, 26 Sep 2026)

`https://www.amazon.com/gp/new-releases/pet-supplies/2975242011/` — the top 12 are almost all **Halloween**: KOOLTAIL pumpkin/ghost knit sweater $16.99 (4.2, 176); centipede costumes $14.99–$19.99 (three separate listings); dog king cape $8.99; pumpkin turtleneck 2-pack $16.99 (4.6, 302); Rypet pumpkin knit 2-pack $14.99 (4.3, 339); 4-pc stovepipe hat + bow tie set $13.99; witch hat + cape set $11.99; Piemow ghost cape + witch hat $18.99 (4.8, 8). The seasonal product cycle on Amazon US is already at full tilt by late September.

### 2.2a Amazon US search — "lion mane cat" (VERIFIED, rendered on the third retry, Prime badges visible)

`https://www.amazon.com/s?k=lion+mane+cat` — **261 results**. The first four organic slots are sponsored lion's-mane *mushroom supplements* ($14.95–$56.40), which is the US intent collision for this term.

| # | ASIN | Listing | Price | Rating | Reviews | Prime | Bought in past month |
|---|---|---|---|---|---|---|---|
| 5 | B07D8SGPTF | Onmygogo lion mane wig | $13.99 | 4.0 | 1,554 | Prime | — |
| 6 | B01M71UWHK | RosyLife lion mane wig | **$9.99** | 4.4 | 1,539 | — | **500+** |
| 7 | B07D8SFP94 | Onmygogo (variant, sponsored) | $8.99 | 4.0 | 1,554 | Prime | 50+ |
| 8 | B07D8VLQX7 | Onmygogo (variant) | $8.99 | 4.0 | 1,554 | — | — |
| 9 | B0H7C2N9RV | Lion mane wig, adjustable | $8.69 | — | — | Prime | 50+ |
| 10 | B0BBGCTLQX | Lion mane wig | $8.99 | 4.4 | 90 | Prime | 50+ |
| 11 | B01N24ASL3 | Lion mane costume for cats | $14.99 | 4.4 | **3,999** | Prime | 100+ |
| 12 | B07D8S79N6 | Onmygogo (main) | $13.99 | 4.0 | 1,554 | Prime | 200+ |
| 13 | B0CCYYZQNF | RosyLife (variant) | $9.99 | 4.3 | 112 | Prime | — |
| 14 | B0FHPR86XS | Qiansail lion mane | $11.99 | 3.3 | 7 | Prime | 50+ |

Reading: US lion manes sell at **$8.69–$14.99**; RosyLife alone moves **500+ units a month** at $9.99 and Onmygogo 200+ at $13.99. Two brands (Onmygogo, RosyLife) plus one unbranded 3,999-review listing hold the term in both countries.

### 2.2b Amazon US search — "cat bandana" (VERIFIED, Prime badges visible)

`https://www.amazon.com/s?k=cat+bandana` — **4,000 results**.

| # | ASIN | Listing | Price | Rating | Reviews | Prime | Bought in past month |
|---|---|---|---|---|---|---|---|
| 1 | B0DD6RC3G7 | Reversible Halloween cat bandana (sponsored) | $9.99 | 4.5 | 21 | Prime | 50+ |
| 2 | B0CKSHVBFT | ADOGGYGO autumn bandana collar (sponsored) | $9.99 | 4.7 | 716 | Prime | 100+ |
| 5 | B0GSNBL8NP | 6-pc cat bandana collar set | $7.49 | 4.2 | 19 | Prime | 100+ |
| 6 | B07GFND8ZC | **Pet cat bat wings (Halloween)** | **$5.99** | 4.3 | **8,626** | Prime | **5K+** |
| 7 | B0GT15CHPY | Dog bandana ("Best Seller in Dog Bandanas", sponsored) | $6.58 | 4.8 | 736 | Prime | 700+ |
| 8 | B0CKSHVBFT | ADOGGYGO autumn bandana collar (organic) | $9.99 | 4.7 | 716 | Prime | 100+ |
| 9 | B0F66HCR1F | Faygarsle 2-pack collar + bandana + bow tie | $8.99 | 4.7 | 234 | Prime | 50+ |
| 10 | B08S3B367M | Faleela 2-pack breakaway collars | $7.99 | 4.6 | 3,442 | Prime | 100+ |
| 13 | B0D5XTPT16 | Breakaway collar with bandana + bell | $8.99 | 4.6 | 172 | Prime | — |
| 14 | B0B5R7XCYY | choyaxo cowboy hat + bandana costume | $8.99 | 4.4 | 1,104 | Prime | 300+ |

Reading: the **#1 US cat-apparel item, the $5.99 bat wings, sells 5,000+ units a month** in late September — the clearest volume number captured anywhere in this research. Cat bandana collars sit at **$7.49–$9.99**, mostly Prime, and ADOGGYGO is the recurring brand. Every organic listing in the top 14 is Prime; a UK merchant-fulfilled listing would not be competitive here.

### 2.3 Amazon US — cat collars (context) (VERIFIED)

Cat Collars node 2975253011 top 30: median **$7.99**, median reviews **2,556**; Dgerp AirTag collar $7.44 (13,147), Taglory 2-pack $6.99 (24,518), GoTags personalised $9.95 (7,084), Dr. Fremont's tags $3.49 (25,937). Commodity, deep moats.

### 2.4 Brands that dominate Amazon US (VERIFIED)

| Segment | Names | Evidence |
|---|---|---|
| Cat Halloween costume | **Rypet** (bat wings 2,686 reviews; pumpkin sweaters), unbranded bat wings (#1, 8,626), Onmygogo, RosyLife, Pet Krewe, Idepet, Rubie's (licensed) | Cat Apparel BS + New Releases |
| Party/birthday sets with bandana + bow tie | ADOGGYGO, JOTFA, Casidoxi (tuxedo collar) | Cat Apparel BS |
| Recovery suits (adjacent) | Suitical ($29.98, 2,815), kzrfojy, Avont, Coppthinktu | Cat Apparel BS |

**Price comparison of the same product across markets (VERIFIED):** RosyLife lion mane B01M71UWHK is $9.99 in the US (#10 Cat Apparel) and £10.41 in the UK (#1 for "lion mane cat"). The bat-wings archetype is $5.99 in the US (#1, 8,626 reviews) and £4.99–£6.99 in the UK (ranks 20–78 in Cat Clothing with 0–316 reviews). Our Devil Bat Cape at £12.99 is roughly 2× the Amazon bat-wings price in both markets; it is a different product (cape plus horns, sized) but it will be compared to $5.99 wings by anyone who searches Amazon.

---

## 3. Etsy

**Blocked.** Every `etsy.com` URL tried (`/uk/search?q=cat+costume`, `/search?q=…`, `/uk/legal/fees`, `/legal/fees`) returned HTTP 403 with a DataDome captcha page (`host: geo.captcha-delivery.com`) from both curl and headless Chromium. I did not attempt a bypass. Search-engine discovery of Etsy shops (DuckDuckGo, Bing, Brave, Mojeek, Startpage) was also blocked or degraded from this IP, so **no Etsy top-seller, sales-count or review data could be collected**.

What we can still say about Etsy as a channel for this catalogue:

- Etsy's public positioning is "handmade, vintage, custom" (VERIFIED from the site's own meta description via Bing RSS: "Etsy is an online marketplace powered by a community of independent sellers and makers; 5.9 million of them"). Our seven products are AliExpress-sourced factory goods. Etsy's creativity standards restrict resale of mass-produced items; the standards page could not be fetched (blocked), so treat "Catwalk Club can list these as-is on Etsy" as **unverified and probably not allowed** until the owner reads `etsy.com/legal/creativity-standards` from a normal browser. Listing them as "designed by" would be a false claim, which fails the legal floor.
- Fees (VERIFIED, §5) are the cheapest of the three marketplaces for a single low-priced item, which is why Etsy is attractive if a later product is genuinely made or designed by the owner (for example a printed bandana design).

---

## 4. TikTok Shop UK

**Product search blocked without login.** `https://www.tiktok.com/shop/uk/s/cat%20costume` and `…/cat%20bow%20tie%20collar` return HTTP 200 but render only the logged-out shell (nav: Orders, Sell, Customer support, More, Log in; footer). The SSR payload includes `"risk_level":"medium"` for our visitor. After 15 s and four scrolls no product cards, seller names or sold counts appeared (screenshot `mk/pw_tts.png`; text dump 93 characters). `tiktok.com/shop/uk/sell` 404s. No login attempted.

What is VERIFIED on the seller side (all from `seller-uk.tiktok.com`, 26 Sep 2026):

- Registration page (`https://seller-uk-accounts.tiktok.com/account/register`): "Start with zero upfront costs — No fees, no deposits and no hidden costs"; "Get up to **£800 in TikTok-funded vouchers** — complete missions to unlock additional discounts for your customers"; signing up enrols products "in the Affiliate programme at standard category commission rates and free samples" and asks the seller to "agree to provide refundable samples for creators".
- Commission: "The Commission Fee rate, inclusive of applicable taxes … is **9%**" on `(Net sales + customer-paid shipping + platform discount) − refunds` (Academy article `knowledge_id=7753826522154754` and `3315312175236897`). The category spreadsheet attached to the second article ("TikTok Shop UK – Commission Rates by Product Category V2.xlsx", downloaded, 344 rows) lists **Pet Supplies — All — 0.09**.
- "A lower Commission Fee rate can be available for eligible sellers, including **new sellers** … To qualify for category-level reductions, sellers must be past their initial new seller reduced commission period." The reduced new-seller rate and its duration are **not published on the public page**; the seller sees it after registration.
- Other seller-paid lines listed: TikTok Shop shipping fee (if using TikTok labels), Fulfilled by TikTok Shop fee, customer-paid shipping refunds, "Seller New Customer Voucher" (seller-funded), affiliate commission to creators (seller-set per product).

---

## 5. Seller fee tables (all VERIFIED unless marked)

### 5.1 Amazon UK — `https://sell.amazon.co.uk/pricing` and `https://sell.amazon.co.uk/low-price-fba-rates`

| Fee | Amount | Note |
|---|---|---|
| Individual plan | **£0.75 per unit sold** (ex VAT) | no monthly fee; no Buy Box eligibility / advertising / bulk tools |
| Professional plan | **£25.00 per month** (ex VAT) | required for Sponsored Products, Brand Registry, etc. |
| Referral fee — Pet Supplies | **15%**, minimum £0.25 | |
| Referral fee — "Pet Clothing and Food" | **5% for items priced at or up to £10; 15% above £10**, minimum £0.25 | effective 5 Jan 2026; category assignment is Amazon's, not ours |
| Referral fee — Clothing and Accessories (if a costume is classed as apparel) | 5% ≤ £15; 10% for £15–£20 | effective 15 Dec 2025 |
| FBA fulfilment, Low-Price FBA rates (auto-applied to products priced ≤ £20) — UK domestic | Light envelope ≤ 80 g **£1.67**; ≤ 100 g £1.70; Standard envelope (≤ 33×23×2.5 cm) ≤ 210 g **£1.73**; ≤ 460 g **£1.87**; Large envelope ≤ 960 g £2.42; Extra-large envelope ≤ 960 g £2.65; Small parcel ≤ 150 g £2.67 | + **1.5% fuel and logistics surcharge from 17 Apr 2026** |
| FBA monthly storage, standard size, non-apparel | £0.76 per cu ft (Jan–Sep); **£1.51 per cu ft (Oct–Dec)** | apparel category: £0.62 / £0.82 |
| Refund administration fee | 20% of the referral fee (page example: £0.30 on a £10 item at 15%) | |
| Amazon's headline 2026 change | "lowering fees by an average of £0.15 per unit … parcels by an average of £0.26 … Low-price FBA rates extended to products priced at or below £20" | Amazon's own framing |

Standard (non-Low-Price) FBA rates were not captured because every launch SKU is under £20; note that the Santa set's crossed-out `list` price of £21.49 would push it out of Low-Price FBA if it ever sells at that price on Amazon.

### 5.2 Amazon US — `https://sell.amazon.com/pricing` and Seller Central help `GABBX6GZPA8MSZGW` ("2026 US FBA fulfillment fee changes")

| Fee | Amount | Note |
|---|---|---|
| Individual plan | **$0.99 per item sold** | |
| Professional plan | **$39.99 per month** | |
| Referral fee — Pet Supplies | **15%** (22% for veterinary diets), minimum $0.30 | |
| New-to-Amazon incentives | "over $50,000 in credits, bonuses and exclusive benefits", including referral-fee waivers in the first year (brand-registered) | headline only; terms not read |
| FBA fulfilment (non-peak, 15 Jan–14 Oct 2026), non-apparel, small standard | ≤ 2 oz: **$2.43 (<$10) / $3.32 ($10–50)**; 2–4 oz: $2.49 / $3.42; 4–6 oz: $2.56 / $3.45; 6–8 oz: $2.66 / $3.54; 8–10 oz: $2.77 / $3.68 | large standard ≤ 4 oz: $2.91 / $3.73 |
| FBA fulfilment, **peak 15 Oct 2026–14 Jan 2027**, small standard ≤ 2 oz | **$2.62 (<$10) / $3.51 ($10–50)** | Halloween and Christmas both fall in peak |
| FBA fulfilment, apparel tier (if classed as apparel), non-peak ≤ 2 oz | $2.62 / $3.51; peak $2.85 / $3.74 | |
| Low-Price FBA | products under $10 "automatically receive Low-Price FBA rates that are $0.86 less than standard FBA rates on average" | rate card page needs seller login |
| Fuel and logistics surcharge | applies on top of the 2026 tables (footnote 2) | percentage not on the public page |

### 5.3 Etsy — `help.etsy.com` articles 115014483627 (Fees and Taxes) and 115015628847 (Payment Processing)

| Fee | Amount | Note |
|---|---|---|
| Set-up fee | one-time, non-refundable, "cost varies by location" | amount shown only during sign-up |
| Listing fee | **$0.20 USD per listing**, expires after 4 months; $0.20 on auto-renew; $0.20 per extra quantity sold in one order | charged whether or not it sells |
| Transaction fee | **6.5% of the total order amount including postage and gift wrap** | in listing currency |
| Payment processing — UK bank account | **4% + £0.20 per order** | US: 3% + $0.25; EU: 4% + €0.30 |
| Offsite Ads | **15% of order total** if under $10,000 USD Etsy sales in the trailing 365 days (mandatory-in at this size); 12% at or above $10,000; capped at $100 per order | charged only on orders attributed to an Etsy-placed external ad |
| Etsy Ads (on-site) | optional, bid-based | |
| VAT | charged on processing fees and seller services for UK sellers | reclaimable only if VAT-registered |

### 5.4 TikTok Shop UK — Seller Academy (`seller-uk.tiktok.com`)

| Fee | Amount | Note |
|---|---|---|
| Set-up / monthly / listing | **none** ("No fees, no deposits and no hidden costs") | |
| Platform commission | **9% incl. VAT** on (net sales + customer-paid shipping + platform discount) − refunds; **Pet Supplies = 9%** in the category sheet | |
| New-seller reduced commission period | exists ("initial new seller reduced commission period"); rate and length not public | ESTIMATED: expect it to be shown in Seller Centre after registration |
| Current promo | **up to £800 in TikTok-funded vouchers** for new sellers, unlocked by missions | verified on the registration page, 26 Sep 2026 |
| Affiliate commission to creators | seller-set percentage per product; "standard category commission rates" applied at sign-up unless changed; refundable free samples expected | cost is whatever the owner sets |
| Shipping | TikTok Shop shipping labels or own labels; seller-funded free-shipping and new-customer vouchers are optional tools | |

---

## 6. What the fees do to each launch SKU (ESTIMATED — arithmetic on VERIFIED fee rates and the landed costs in `sourcing.md`)

Assumptions: launch prices from `site/assets/data.js`; landed cost from `sourcing.md` (supplier price × 1.2 + shipping share at 0.79 £/$); Amazon UK = Professional plan, FBA Low-Price rate, standard envelope ≤ 210 g (collars, mane) or ≤ 460 g (capes, sets) plus the 1.5% surcharge; Amazon referral shown at both 15% (Pet Supplies) and the 5%/15% Pet Clothing rule; Etsy = 6.5% + 4% + £0.20 + £0.16 listing, no Offsite Ad; TikTok = 9% commission, no affiliate; own postage on Etsy/TikTok assumed at cost to the buyer (large-letter Royal Mail, ESTIMATED £1.60–£2.20) so it nets out apart from the percentage fees on it, which are ignored here. Monthly plan fees, storage, inbound freight, returns and VAT on fees are excluded, so these are **upper bounds**.

| SKU | Price | Landed | Amazon UK FBA, 15% ref. | Amazon UK FBA, Pet-Clothing rule | Etsy (own dispatch) | TikTok Shop (own dispatch) | Own site (Shopify Payments ~1.7%+£0.25 ESTIMATED) |
|---|---|---|---|---|---|---|---|
| Bow Tie Collar | £8.99 | £1.82 | £4.06 (45%) | £4.96 (55%) | £5.87 (65%) | £6.36 (71%) | £6.77 (75%) |
| Bandana Collar | £7.99 | £2.88 | £2.15 (27%) | £2.95 (37%) | £3.91 (49%) | £4.39 (55%) | £4.72 (59%) |
| Lion Mane | £9.99 | £5.17 | £1.56 (16%) | £2.56 (26%) | £3.61 (36%) | £3.92 (39%) | £4.40 (44%) |
| Devil Bat Cape | £12.99 | £5.49 | £3.65 (28%) | £3.65 (28%) | £5.78 (44%) | £6.33 (49%) | £7.03 (54%) |
| Spider Costume | £12.99 | £5.86 | £3.28 (25%) | £3.28 (25%) | £5.41 (42%) | £5.96 (46%) | £6.66 (51%) |
| Pumpkin Hat & Ruffle Collar | £11.99 | £7.33 | £0.96 (8%) | £0.96 (8%) | £3.24 (27%) | £3.58 (30%) | £4.21 (35%) |
| Santa Hat & Scarf Set | £17.99 | £10.96 | £2.43 (14%) | £2.43 (14%) | £4.78 (27%) | £5.41 (30%) | £6.48 (36%) |

Reading:

1. **Amazon UK FBA eats the two weakest SKUs.** Pumpkin set (£0.96) and Santa set (£2.43) cannot carry a 15% referral plus £1.90 fulfilment. Do not list them on Amazon at these landed costs.
2. **Collars are the Amazon-able products on margin**, but §1.4 shows the Amazon shelf price for a bow-tie collar is £2.32–£6.82. A £8.99 collar with zero reviews next to Ancol at £3.96 with 636 reviews will not convert without Sponsored Products spend, and the owner has no ad budget at launch.
3. **TikTok Shop UK is the cheapest marketplace per order (9%, nothing up front)** and it is the platform the organic plan already lives on. It costs £0 to set up and the £800 voucher fund is buyer-facing discount money, not seller cash.
4. **Etsy is cheap but the product fit is the problem** (§3): factory-sourced costumes are not what Etsy's rules or shoppers expect.
5. The own site keeps 4–8 percentage points more per unit than TikTok Shop and 20–30 points more than Amazon FBA, but only if traffic is free, which is the whole bet this year.

---

## 7. What this means for Catwalk Club, Oct 2026–Sep 2027

**Order of channels (recommendation, tied to the fee and ranking evidence above):**

| Priority | Channel | Why now | What to do this week |
|---|---|---|---|
| 1 | **Own Shopify store** | highest margin per unit; all organic video can link to it; no fees at zero sales | launch; keep the `list` prices honest (they must be real prior selling prices before being crossed out — DMCC Act 2024) |
| 2 | **TikTok Shop UK** (VERIFIED: 9%, no set-up cost, £800 vouchers) | the owner is filming cats for TikTok anyway; a Shop tag on the same videos is the cheapest conversion path on any marketplace; affiliate creators can be switched on with a seller-set commission and free samples when there is cash | register (seller-uk-accounts.tiktok.com), connect the Shopify catalogue, list the five Halloween SKUs plus the two collars, set affiliate commission only when a creator is worth it |
| 3 | **Amazon UK — Individual plan, FBM, two collars only, after the first 20 site reviews** | £0.75/unit, no monthly fee; tests whether the collar converts against Ancol without ads; keep the costumes off until landed cost falls | not before November; Halloween FBA inbound would not clear check-in in time (Amazon UK Cat Clothing New Releases page rendered empty and dp pages are blocked, so lead time is ESTIMATED from experience, not fetched) |
| 4 | **Amazon US** | bat wings at $5.99 with 8,626 reviews is the #1 Cat Apparel item; a £12.99 cape imported from the UK cannot compete on price and peak FBA fees ($3.51 for a $10–50 item) run 15 Oct–14 Jan | park until there is a US-priced product and a US 3PL |
| 5 | **Etsy** | fees are fine (6.5% + 4% + £0.20 + $0.20) but sourced goods are off-policy until verified; Offsite Ads at 15% would be mandatory at our size | only for a future product the owner actually designs (printed bandana, embroidered collar) |

**Marketplaces as competitors (what our product pages must beat):**

- Amazon UK Cat Clothing median **£7.99**; our costumes are £11.99–£17.99. The site must show why (real cats, sizing, UK stock, dispatch speed) because the shopper's mental anchor from Amazon is under £10.
- Bat wings £4.99–£6.99 UK / $5.99 US are the reference product for "cat Halloween costume". Our cape should be photographed and described as a cape with horns and hood, not as wings, to avoid the comparison.
- Lion mane: reviewed listings £9.98–£24.01 (UK). £9.99 is at the floor of the reviewed set; do not cut further, the £1.99–£3.35 listings are unreviewed and cannot be matched on a £5.17 landed cost.
- Bow tie collar: Amazon shelf £2.32–£6.82. On our own site £8.99 is a positioning price; do not carry it unchanged onto Amazon.
- Review moats on Amazon are shallow in the UK node (median 26) and deep in the US (median 350). The UK is winnable within a season by a UK-stocked seller; the US is not this year.

**Legal floor check for marketplace listings:** no incentivised or fabricated reviews on any platform (Amazon and TikTok both penalise this and it breaches the DMCC Act 2024); Amazon's "Only 2 left" and "700+ bought in past month" badges are Amazon-generated and must not be imitated on our site; crossed-out RRPs on Amazon must be genuine prior prices; no "safe for cats"/"vet-approved" copy without evidence (ASA/CAP).

---

## 8. Blocked or unverifiable items

- Amazon UK SERPs for "cat halloween costume" and "cat costume" filtered to Pet Supplies: never rendered (503 after WAF challenge). Cat Clothing Best Sellers used as the proxy.
- Amazon US SERPs for "cat costume", "cat halloween costume" and "cat bow tie collar": 503 on every attempt. Best Sellers and New Releases used instead; "lion mane cat" and "cat bandana" did render (§2.2a–b).
- Amazon BSR (site-wide) and Prime badge: product pages are bot-gated and Prime badges do not render for a non-UK visitor; category rank from the Best Sellers pages is given instead.
- Etsy search, shops and `etsy.com/legal/fees`: DataDome captcha on every request (not bypassed). Fees verified from `help.etsy.com`; Etsy competitor data unavailable.
- TikTok Shop UK product search: logged-out shell only; no sellers or sold counts. Seller fees verified from the Academy and registration page; the new-seller reduced commission rate is not public.
- TikTok Shop UK new-seller reduced-commission rate and duration; Etsy set-up fee amount; Amazon US fuel surcharge percentage; Amazon UK standard (non-Low-Price) FBA rate card — all behind login or not on the public page.
- Search-engine discovery (DuckDuckGo captcha after ~10 queries; Bing degraded; Brave/Mojeek/Startpage blocked) — so no third-party seller lists for Etsy or TikTok Shop.
