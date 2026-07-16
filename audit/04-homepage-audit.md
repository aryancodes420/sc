# 04 — Homepage audit

Source: `templates/index.json` + the referenced sections. Current section order
(top→bottom): **catbar → hero → trust → why → bundle → collections → reviews →
newsletter.** (Note: `order` array places the category bar *above* the hero.)

Legend: **Keep / Improve / Move / Replace / Remove**.

## Section-by-section
| # | Section | Verdict | Why (evidence) |
|---|---|---|---|
| 1 | Category bar (marquee pills) above hero | **Move** | Pushing a scrolling pill bar above the hero delays the value proposition. Hero should be the first thing seen. [Judg] Move below hero (or into header nav). |
| 2 | Hero — "Less anxious. More at home." + 2 CTAs + ticks | **Improve** | Copy is strong; but background is a **gradient, no product/dog imagery** (API-verified no images). Baymard: shoppers lead with visuals (S1). Add a real hero image of a calm dog in a bed/nook. |
| 3 | Trust strip (free delivery / guarantee / for anxious dogs / fast dispatch) | **Improve** | Good placement. But "Fast UK dispatch — usually 1–2 days" conflicts with other pages and the dropshipping reality — make it true & consistent (S17). |
| 4 | Why The Dog Nook (3 cards) | **Keep** | Clear, on-message, honest ("risk is ours"). Strong. |
| 5 | Featured bundle | **Improve (P1)** | Contents/savings **contradict the PDP** (Grooming Glove/£9.98 vs slow-feeder/£15). Fix to one truth. No bundle image. |
| 6 | Collection list ("shop by need") | **Improve** | Good idea; but no collection images and Travel & Outdoor has 1 product. Add imagery; consider benefit-named collections. |
| 7 | Reviews placeholder — "Real reviews, coming soon" | **Replace** | Ethically honest, but it spends prime social-proof real estate advertising the *absence* of proof. Until real reviews exist, replace with credible non-review trust (guarantee explainer, "how we choose", founder note, press/where-featured if any). [Judg] |
| 8 | Newsletter ("10% off first order") | **Keep** | Fine. Ensure the popup and this section don't double up jarringly on mobile. |

## Missing sections a converting homepage usually needs
- **A real hero image / short hero video.** (S1) — highest impact.
- **A "how it helps" / problem→product row** for anxious moments (fireworks,
  separation, storms, car, grooming) linking to the right product. [Judg]
- **A concrete guarantee/returns explainer** ("How the 30-day guarantee works").
- **A short, honest founder / "who we are" strip** — cheap, powerful trust for an
  unknown brand, and reinforces "real UK team". [Judg]
- **Delivery & returns clarity block** (one honest promise) near the fold. (S5)

## Recommended ideal homepage order (top → bottom)
1. **Announcement bar** — one honest line (free UK delivery over £35 · 30-day guarantee).
2. **Hero** — real image, "Less anxious. More at home.", one primary CTA ("Shop the range") + secondary ("The Rescue Bundle").
3. **Trust strip** — 4 *true* proofs (guarantee · honest delivery · UK team · secure checkout).
4. **Shop by need** — collections with images (benefit-named where the range allows).
5. **Problem → product** — "For fireworks / For settling a rescue / For calmer mealtimes / For grooming" tiles.
6. **Featured bundle** — corrected, with image and a real saving.
7. **Why The Dog Nook** — the 3 cards (curation / guarantee / real people).
8. **Social proof** — real reviews once they exist; until then, a founder/why-we-choose strip (not "coming soon").
9. **Education teaser** — 2–3 honest guides (optional, SEO+trust).
10. **Newsletter** — 10% off first order.
11. **Footer** — with *real* company identity + populated/omitted socials.

## Per-recommended-section brief
> Full ready-to-paste copy is in `proposed-copy/positioning-and-homepage-copy.md`.

- **Hero** — *Objective:* state who/what/why + drive to shop. *Heading:* "Less
  anxious. More at home." *Copy:* curated calming kit for anxious & rescue dogs;
  30-day guarantee. *CTA:* "Shop the range". *Imagery:* real calm-dog-in-bed photo.
  *Evidence:* S1. *Component:* `dog-nook-hero`.
- **Problem→product row** — *Objective:* route by need. *Heading:* "What's your dog
  struggling with?" *Copy:* four short tiles. *CTA:* per tile. *Imagery:* 4 real
  photos. *Component:* new blocks in `dog-nook-collection-list` or a small new section.
- **Social-proof replacement** — *Objective:* credible reassurance without fake
  reviews. *Heading:* "Why owners trust us" / "How we choose". *Copy:* guarantee +
  curation + real-person support. *Evidence:* S5, S18. *Component:* repurpose
  `dog-nook-reviews-placeholder` or `dog-nook-rich-text`.

## Guardrail
Keep it a **shopping** homepage, not a brand essay. Every added section must either
move the visitor toward a product or remove a specific purchase objection.
