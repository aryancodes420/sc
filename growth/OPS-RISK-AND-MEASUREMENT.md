# Ops, risk and measurement

> Built 2026-07-25. The unglamorous half of hitting £100k. Most stores that fail
> in this niche fail here, not on the marketing.

---

## 1. ⚠️ The CJ sourcing checklist — do this first

Three questions to CJ decide whether your fireworks season works at all. Send this
email on day one.

> Hi,
>
> I'm preparing for a UK seasonal peak in late October and need to confirm three
> things about the following SKUs: [list].
>
> 1. Which of these are stocked in your **GB / UK warehouse**, and which ship from
>    China? Please confirm per SKU.
> 2. If a customer orders 3–5 of these items together, do they ship as **one
>    combined parcel** or as separate parcels — and what is the shipping cost in
>    each case?
> 3. What is your realistic **latest dispatch date** for UK delivery by 3 November,
>    for each shipping method?
>
> I also need to confirm the products arrive in **neutral, unbranded packaging**
> with no third-party branding or invoices inside.
>
> Thanks.

**Why each question matters:**
1. **GB vs China** is 3–7 working days vs 7–17 days. It decides your order-by date and
   whether the Fireworks Kit is sellable in late October at all.
2. **Parcel splitting** is worth **£14,000–28,000 a year** at target volume (see
   GROWTH-PLAN §2). A 5-item kit shipping as 5 parcels also has 5 chances to be late.
3. **Neutral packaging** — a parcel arriving with another brand's logo destroys the
   "small curated UK shop" positioning instantly, and it's the single most common way
   dropshipping stores get found out.

### Landed cost template — fill this in and update `growth/model.py`
| SKU | CJ unit cost | Shipping to UK | Landed total | Retail | Gross % | GB warehouse? |
|---|---|---|---|---|---|---|
| Lick Mat | | | | £11.99 | | |
| Snuffle Mat | | | | £22.99 | | |
| Calming Coat | | | | £24.99 | | |
| Calming Snood | | | | £9.99 | | |
| Heartbeat Companion | | | | £24.99 | | |
| Deep Nook (L/XL/XXL) | | | | £59.99–89.99 | | |
| Weighted Blanket | | | | £34.99 | | |
| *(every SKU)* | | | | | | |

**Until this table is filled in, every profit number in the model is an estimate.**

---

## 2. Bonfire Night order-by cut-offs

Bonfire Night is **Thursday 5 November 2026**. Delivery must land by **Tuesday 3
November** to give any buffer.

| Fulfilment route | Transit | Latest dispatch | Latest customer order date |
|---|---|---|---|
| GB warehouse | 3–7 working days | Mon 26 Oct | **Fri 24 Oct** |
| China direct | 7–17 days | Fri 16 Oct | **Wed 15 Oct** |
| *Recommended public deadline* | — | — | **Fri 24 Oct**, GB stock only |

**Rules for October:**
1. If a SKU ships from China, **stop advertising it for fireworks after 15 October.**
   Switch those ads to GB-stocked items or to the New Year's Eve angle.
2. Set the countdown section's `cutoff` to whichever date matches your actual stock.
   Don't set 24 Oct if the kit ships from China — that's the exact kind of promise
   that turns into refunds and chargebacks.
3. From 25 Oct, the countdown flips itself to the honest post-deadline message. Let it.
4. Consider **pre-buying 30–50 units of the fireworks components into your own
   house in September.** At ~£17.50 landed per kit that's £500–900, it removes the
   transit risk entirely from your single biggest sales window, and you can ship
   next-day. This is probably the highest-ROI £900 you will spend all year.

---

## 3. Customer service macros

Paste-ready, in the house voice. A real person replying quickly is one of the few
genuine advantages you have over Amazon.

**Where is my order?**
> Hi [name],
>
> Thanks for chasing — here's exactly where it is: [tracking link].
>
> It's due with you around [date]. If it hasn't turned up by [date + 3], email me
> again and I'll sort it out, either a replacement or a refund, your choice.
>
> Sorry for the wait.
> [Your name]

**It arrived damaged / faulty**
> Hi [name],
>
> That shouldn't have happened and I'm sorry. No need to send it back — if you can
> reply with a photo I'll get a replacement out to you today, or refund you in full
> if you'd rather.
>
> Faulty items are always covered, whatever the packaging says.
> [Your name]

**Can I return it? / It didn't help my dog**
> Hi [name],
>
> Of course — that's what the 30-day guarantee is for, and no hard feelings.
>
> [Return instructions.]
>
> If you don't mind me asking: what did your dog make of it? I'd genuinely like to
> know what didn't land — it's how the range gets better.
> [Your name]

**Which size do I need?**
> Hi [name],
>
> Happy to help. Measure them curled up, nose to tail, and add about 10cm — that's the
> length you want. If you're between sizes, size up; dogs settle better with room.
>
> If you tell me the breed and rough weight I'll just tell you which one to get.
> [Your name]

**Will this cure my dog's anxiety?**
> Hi [name],
>
> Honest answer: no, and I wouldn't trust anyone who says otherwise.
>
> These are comfort and enrichment tools. For a lot of dogs they take the edge off
> [fireworks / being left / settling in], and plenty of owners find them genuinely
> useful. But they're not a treatment, and if your dog's anxiety is severe your vet is
> the right first call.
>
> If you try it and it doesn't help, send it back within 30 days.
> [Your name]

**Why is delivery slower than Amazon?**
> Hi [name],
>
> Fair question. Some of our range is stocked here in the UK; the rest is made and
> shipped by our manufacturing partner overseas, which is why those take about [X]
> working days.
>
> We could promise next-day and miss it, but we'd rather tell you the real timing up
> front. Everything's covered by the 30-day guarantee either way.
> [Your name]

---

## 4. Risk register

| # | Risk | Likelihood | Impact | What to do about it |
|---|---|---|---|---|
| 1 | **Fireworks stock arrives late** | High | Severe | Pre-buy 30–50 kits in Sept. Hard-stop China ads on 15 Oct. Publish honest cut-offs. |
| 2 | **Bundle parcel-splitting destroys margin** | Medium | Severe | Confirm with CJ before scaling. Cap bundles at 3 items if unresolved. |
| 3 | **Meta ad account restricted** | Medium | Severe | Never make health claims in ad copy. No "cures anxiety". Set up a second Business Manager and a backup payment method *now*, before you need it. |
| 4 | **Chargebacks from late delivery** | Medium | High | Honest windows everywhere. Dispatch email with real dates. Reply to every "where is it" within 24h — most chargebacks start as an unanswered email. |
| 5 | **Over-dependence on one season** | High | Medium | Jan rescue wave, spring/summer travel and grooming, NYE. The evergreen articles exist for exactly this. |
| 6 | **No reviews by October** | High | High | Judge.me installed week 1. Review request 14 days post-delivery. Consider gifting to 10 early customers for honest, **disclosed** reviews (legal under DMCC only if the incentive is disclosed). |
| 7 | **Cash-flow squeeze in Oct/Nov** | Medium | High | Need ~£2,500 working capital going into October — ad spend and CJ orders land before revenue does. |
| 8 | **Single point of failure: you** | High | Medium | Document everything (this repo). If you're ill for a week in October, the macros and flows keep running. |
| 9 | **Competitor undercuts on price** | Medium | Low | Don't race. Your edge is honesty and curation. Discounting into a 70% margin is a losing game against Amazon. |
| 10 | **Google update / SEO doesn't land** | Medium | Medium | Content is a compounding bet, not a Q4 plan. Paid + email carry the first year. |

---

## 5. Analytics — what to install and what to track

### Install (week 1, in this order)
1. **Shopify Analytics** — already on. Baseline.
2. **GA4** — via Shopify's Google channel. Enable Enhanced Ecommerce.
3. **Microsoft Clarity** — free, and session recordings will teach you more in week
   one than any amount of theorising. Add via theme `<head>`.
4. **Meta Pixel + Conversions API** — CAPI matters now that browser tracking is
   degraded. Shopify's native Meta channel does both.
5. **Google Search Console** — submit the sitemap the day you publish.

⚠️ All of these are non-essential cookies. The consent banner already gates them via
Shopify's Customer Privacy API — **verify that declining actually blocks them** before
you drive paid traffic, or you have a PECR problem.

### The funnel to watch
| Step | Event | Healthy | Fix if low |
|---|---|---|---|
| Land | `page_view` | — | — |
| Engage | scroll 50% / quiz start | >45% | hero, page speed, ad-to-page match |
| View product | `view_item` | >35% | homepage merchandising |
| Add to cart | `add_to_cart` | >8% | images, price, specs, size doubt |
| Begin checkout | `begin_checkout` | >60% of ATC | shipping cost surprise |
| Purchase | `purchase` | >55% of checkout | payment options, trust at checkout |

**The two custom events worth adding:** `quiz_complete` and `size_guide_open`. If
size-guide opens are high and ATC is low, your size guide isn't answering the question.

### Weekly scorecard
The five numbers, in `growth/dog-nook-model.xlsx` sheet 5. Fill it in every Monday.
If AOV and owned-traffic share are on target, the rest looks after itself.

---

## 6. First-100-orders runbook

**Orders 1–10.** Hand-write a note in every parcel. Email each customer personally 3
days after delivery. Ask what nearly stopped them buying — the answers are worth more
than the orders.

**Orders 10–30.** Review requests running automatically. Photograph anything a
customer sends you (with permission) — that's your first real UGC. Fix whatever the
first three complaints have in common.

**Orders 30–60.** You now have enough data to see which product leads. Reallocate ad
spend to it. Write one article about the problem that product solves.

**Orders 60–100.** Retention starts here: post-purchase flow, the 21-day cross-sell,
and the first winback. Repeat customers are what makes the £100k arithmetic work —
they cost nothing to acquire.

Somewhere in here you'll get your first genuinely angry customer. Answer within an
hour, fix it beyond what's fair, and ask them to tell you what you should have done.
That's the cheapest consultancy you'll ever get.
