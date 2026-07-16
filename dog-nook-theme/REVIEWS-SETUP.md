# Reviews — how to turn the scaffolding on (owner action)

The theme is fully wired for reviews **without any fake data**. Star ratings,
the PDP reviews block, and product-card stars all read from standard review
metafields and render an honest "Be the first to review" empty state until real
reviews exist. Here's how to make real reviews flow in.

## 1. Install a reviews app (2 minutes, can't be done via API)
Install **Judge.me** (free plan is fine) from the Shopify App Store:
`Admin → Apps → search "Judge.me" → Install`.

Judge.me automatically populates the metafields this theme already reads:
- `product.metafields.reviews.rating` (average rating)
- `product.metafields.reviews.rating_count` (number of reviews)

As soon as real reviews are collected, the stars and counts appear on product
cards and PDPs with **zero further theme work**. The PDP has a
`data-tdn-review-widget` anchor where Judge.me's full review widget mounts.

## 2. Turn on automatic review-request emails
In Judge.me → Settings → Review Requests, enable post-purchase emails (it sends
a request a set number of days after delivery). This is what actually generates
reviews from real buyers. Suggested copy, in the brand voice:

> **Subject:** How's {{ dog_name | default: "your dog" }} settling in?
>
> Hi {{ first_name }},
>
> A little while ago you picked up **{{ product_title }}** from The Dog Nook.
> We build this shop around one thing — helping anxious and rescue dogs feel a
> bit calmer — so we'd genuinely love to know how it's going.
>
> If it's helped (or even if it hasn't), a quick honest review helps other
> worried owners decide. It takes about 30 seconds.
>
> **[ Leave a review ]**
>
> And if something's not right, just reply to this email — a real person reads
> every one, usually the same day. The 30-day guarantee still stands.
>
> Thank you,
> The Dog Nook

## 3. (Optional, fully legal) Seed launch reviews the right way
If you gift product to early customers in exchange for an **honest** review, that
is allowed **only if the incentive is disclosed** (UK DMCC 2024 / CMA rules).
Judge.me tags incentivised reviews automatically. Never write reviews yourself
and never post undisclosed incentivised ones — fake/undisclosed reviews are
illegal in the UK and are exactly what this brand is positioned against.

## 4. No-app alternative for a handful of real reviews
If you collect a few genuine reviews off-platform (e.g. by email) and don't want
an app yet, you can render them via metafields — no fabrication, real quotes only:

- Set `product.metafields.reviews.rating` (decimal, e.g. `4.9`)
- Set `product.metafields.reviews.rating_count` (integer)
- Set `product.metafields.reviews.featured` as a JSON list of real reviews:
  ```json
  [
    { "name": "Sarah T.", "rating": 5, "title": "Finally sleeps through fireworks",
      "body": "…real customer words…", "verified": true, "date": "May 2026" }
  ]
  ```
The PDP renders the aggregate + these cards automatically. Leave them empty and
the honest "Be the first to review" state shows instead.
