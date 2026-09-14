# Cat costumes store — launch pack

Decisions and starting content for the cat costume shop. This is a **separate business
from The Dog Nook** — nothing here shares its catalogue, theme, or positioning.

> **The shop is built and working: [`site/`](site/).** Open `site/index.html` in a browser,
> or `cd site && python3 -m http.server 8000`. See [`site/README.md`](site/README.md) for
> what's verified and what must be replaced before it takes an order.
>
> Brand: **Catwalk Club** — *"Seriously cute costumes for cats."*
>
> Competitor analysis (measured from their live catalogues): [`competitors.md`](competitors.md).

> Prices are in GBP on the assumption this trades in the UK like The Dog Nook.
> If the new store is set to another currency, re-point the ladder rather than
> converting these numbers literally.

---

## 1. Store preview inputs

These are the exact fields used to generate the storefront previews. Keep them —
regenerating with tweaked wording is the cheapest way to get a different look.

| Field | Value |
|---|---|
| **Sells** | cat costumes, holiday seasonal, cute everyday, novelty funny, bandanas, hats |
| **For** | young online cat owners, gift buyers, devoted cat parents, all ages |
| **Style** | playful, colourful, bright pastels, rounded bubbly type, fun, toy-like |

**A preview can only be claimed as a brand-new store.** It cannot be applied to an
existing one, and signing up through a preview link creates a real store.

---

## 2. Starter catalogue

Fourteen SKUs across the three categories chosen, priced as an impulse-friendly ladder
(most items £9–17) so a two-item order clears ~£25.

### Holiday & seasonal — the volume driver
| Product | Price | Sizes |
|---|---|---|
| Pumpkin Hat | £9.99 | One size |
| Bat Wings Harness | £12.99 | XS–L |
| Santa Hat & Cape Set | £14.99 | XS–L |
| Reindeer Antlers | £9.99 | One size |
| Birthday Hat + Bandana Set | £8.99 | One size |

### Cute & everyday — the year-round base
| Product | Price | Sizes |
|---|---|---|
| Knitted Jumper | £16.99 | XS–L |
| Reversible Bandana (2-pack) | £11.99 | S/M, L |
| Bow Tie Collar | £8.99 | Adjustable |
| Tiny Hoodie | £18.99 | XS–L |
| Flower Collar | £9.99 | Adjustable |

### Novelty & funny — the shareable stuff
| Product | Price | Sizes |
|---|---|---|
| Lion Mane | £11.99 | S/M, L |
| Dinosaur Hoodie | £16.99 | XS–L |
| Shark Costume | £15.99 | XS–L |
| Superhero Cape | £10.99 | One size |

### Bundles (raise average order value)
| Bundle | Contents | Price |
|---|---|---|
| Halloween Kit | Pumpkin hat + bat wings + bandana | £27.99 |
| First Costume Kit | Bandana 2-pack + bow tie collar | £17.99 |

> Only advertise a bundle as a saving if it genuinely undercuts buying the items
> separately. Check the arithmetic before publishing — a bundle that "saves" nothing
> is a live misleading-price problem.

---

## 3. Sizing chart

Cat costume returns are overwhelmingly a sizing problem. Put this on **every** product
page, not just a linked size guide, and ask for chest girth — it is the measurement
that actually decides fit.

| Size | Neck | Chest girth | Back length | Typical cat |
|---|---|---|---|---|
| **XS** | 18–22 cm | 28–33 cm | 20 cm | Kittens, small adults (2–3 kg) |
| **S** | 22–26 cm | 33–38 cm | 25 cm | Average adult (3–4 kg) |
| **M** | 26–30 cm | 38–43 cm | 30 cm | Large adult (4–5.5 kg) |
| **L** | 30–34 cm | 43–50 cm | 35 cm | Maine Coon, Ragdoll (5.5–7 kg) |

Measure the chest at its widest point, just behind the front legs, and add two fingers'
slack. **Size up when a cat falls between sizes** — a tight costume is the single most
common cause of a bad review.

---

## 4. Welfare copy — get this right before launch

Cats tolerate clothing far less readily than dogs. Handled honestly this builds trust;
handled carelessly it invites complaints.

**Do:**
- Sell on fit, fabric and photos — things you can actually show.
- State plainly that costumes are for **short, supervised wear**.
- Note that some cats simply will not wear anything, and keep returns easy on that basis.
- Use breakaway or adjustable fastenings and say so.

**Don't:**
- Claim a costume calms, comforts, soothes or reduces stress. Those are health claims and
  the ASA treats them as such — the same trap already flagged in The Dog Nook's `STATUS.md`.
- Show a costume covering the face, ears or restricting the legs.
- Imply all-day wear.

Nothing should have small detachable parts a cat can swallow.

---

## 5. Timing

Halloween is the peak by a wide margin, and pet-costume buying concentrates in the
**two weeks before 31 October**. Christmas is second. Both need stock landed and product
photography done well before the spike — ads into an unphotographed catalogue waste money.

Everyday lines (bandanas, collars, jumpers) are what keep revenue alive between spikes;
they are the reason not to build a Halloween-only shop.

---

## 6. Next steps

1. **Look at the site** — `cd site && python3 -m http.server 8000`.
   Tell me what to change: name, colours, copy, products, prices.
2. **Get real photography.** As with The Dog Nook, this is the blocker that decides the
   launch date. The site currently draws illustrated placeholder cats so nothing appears
   broken, but they are not sellable product images.
3. **Replace every price** with your real landed cost + margin.
4. **Connect payments and write the legal pages** before taking a single order.

### On the Shopify route

The store-preview tool was tried first and returned no viewable previews in this session —
it reports `pending` and delivers finished storefronts to the Shopify interface, which
didn't surface them here. The inputs in §1 are kept so it can be retried later.

The site in `site/` is deliberately portable: the catalogue lives in one file
(`site/assets/data.js`) and maps cleanly onto Shopify products, variants and collections
if you go that way. Nothing here is wasted by switching.
