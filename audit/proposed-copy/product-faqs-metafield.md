# Per-product FAQs — metafield spec + ready values (option B)

The PDP (`snippets/dog-nook-pdp-extra.liquid`) now reads a per-product FAQ metafield
and renders each Q/A as an accordion, falling back to the shared section questions
when the metafield is empty. This file is the data to load.

## 1. Create the metafield definition (one-time)
**Settings → Custom data → Products → Add definition**
- **Namespace and key:** `custom.faq`
- **Type:** **JSON**
- (Name it "Product FAQ" — anything; the key is what matters.)

The theme reads `product.metafields.custom.faq.value` as a JSON **array of objects**,
each `{ "q": "…", "a": "…" }`.

## 2. How to load the values
Metafield writes are gated in the audit session, so apply these one of these ways:
- **Admin:** open each product → Metafields → Product FAQ → paste the JSON array.
- **Shopify CLI / an approved session:** `metafieldsSet` mutation (snippet at the bottom).

## 3. Ready values (verified answers only)
> Only answers that are behavioural/usage/returns **or** specs confirmed in the
> Product Build Handoff are included. Genuinely unverified `[VERIFY]` items
> (e.g. Nail Grinder head/port design) are deliberately **omitted** — add them once
> confirmed on CJ or from a sample. Never paste a guessed answer.

### The Lick Mat — `gid://shopify/Product/10311314768155`
```json
[
  {"q":"What can I put on it?","a":"Anything spreadable your dog enjoys and tolerates well — plain yoghurt, mashed pumpkin, a little peanut butter (check it's xylitol-free). Introduce anything new in small amounts first."},
  {"q":"Does it stay in place while my dog licks it?","a":"It has suction cups on the base designed to grip smooth, clean surfaces like a floor or the side of a bath. Grip is reduced on carpet or textured surfaces."},
  {"q":"Is it dishwasher safe?","a":"Yes — it's food-grade silicone and dishwasher safe."},
  {"q":"Is the material food-safe?","a":"Yes — food-grade, non-toxic silicone."}
]
```

### The Snuffle Mat — `gid://shopify/Product/10311317258523`
```json
[
  {"q":"What size is it, and what dog does it suit?","a":"It's 56 × 38 cm, which suits most dogs. Start them on it supervised and adjust how much you hide as they get the hang of it."},
  {"q":"Will small pieces come loose and be a choking risk?","a":"Always supervise your dog the first few times they use a snuffle mat, especially if they're a determined chewer, and check regularly for loose threads or fraying."},
  {"q":"Is it machine washable?","a":"Yes — machine washable. Air dry rather than tumble dry, as heat can damage the fleece strips."},
  {"q":"How do I introduce it to my dog?","a":"Start with a few treats scattered on top rather than buried deep, so your dog gets the idea before the challenge increases. Most dogs pick it up within a session or two."}
]
```

### The Calming Donut Bed — `gid://shopify/Product/10311318274331`
```json
[
  {"q":"What size dog does this fit?","a":"It's currently available in Large (80cm), which suits most dogs up to Labrador size. If you've got a much smaller or larger dog, message us before ordering and we'll help — we'd rather you ask than guess."},
  {"q":"Is the cover removable and washable?","a":"Yes — it has a removable, machine-washable cover."},
  {"q":"Is the filling safe if my dog chews it?","a":"This bed is designed for resting, not chewing. As with any soft furnishing, supervise heavy chewers and remove it if your dog starts pulling at the seams or filling."},
  {"q":"Do you offer other sizes or colours?","a":"Large is our confirmed launch option right now. Get in touch if you'd like to be notified when more sizes are added."}
]
```

### The Grooming Glove — `gid://shopify/Product/10311319257371`
```json
[
  {"q":"What coat types is it suited to?","a":"Works well on most short-to-medium coats. For heavy double coats or long-haired breeds, it's better as a finishing tool after a proper brush-out than a replacement for one."},
  {"q":"Is it suitable for left-handed use?","a":"It's a right-hand design. The strap adjusts to fit most hands, but if you groom left-handed it's worth knowing before you order."},
  {"q":"Is it suitable for sensitive skin?","a":"The rubber tips are soft and rounded, but as with any grooming tool, go gently on the first use and stop if your dog seems uncomfortable."},
  {"q":"How do I clean the glove?","a":"Rinse under water and pick out loose hair, then leave it to air dry."},
  {"q":"Will it help with shedding?","a":"It lifts loose, dead hair during petting or a light groom — useful between full brush sessions, not a substitute for one during heavy shedding periods."}
]
```

### The Nail Grinder — `gid://shopify/Product/10311320437019`
> Omitted: any "multiple grinding ports/sizes" answer (handoff says do not publish
> until confirmed from a sample). Noise answer is a comparative design statement, not
> a measured dB claim.
```json
[
  {"q":"Is it battery or USB rechargeable?","a":"It's USB rechargeable, with a digital display so you can see the charge level."},
  {"q":"Is it quiet compared to clippers?","a":"It's designed with a quieter motor and lower vibration than nail clippers, which many dogs find easier to tolerate. Every dog is different, so introduce it gradually."},
  {"q":"How do I introduce my dog to it safely?","a":"Let your dog sniff and hear it switched on before you touch a paw. Start with short sessions and one or two nails, building up gradually rather than doing a full trim first time."}
]
```

### The Slow-Feeder Bowl — `gid://shopify/Product/10311321518363`
```json
[
  {"q":"What size dog is this suited to?","a":"It's 22.5 cm across and works best for small and medium dogs. Very large breeds may need a mid-meal refill, as it's a shallow bowl."},
  {"q":"Is it dishwasher safe?","a":"Yes — it's made from high-temperature-resistant, food-safe plastic and is dishwasher safe."},
  {"q":"Does it help slow down fast eating?","a":"The raised maze ridges make food harder to gulp in large mouthfuls, encouraging a slower pace at mealtimes."}
]
```

### The Car Boot Liner — `gid://shopify/Product/10311323484443`
```json
[
  {"q":"What size car boot does this fit?","a":"It's roughly 185 × 105 cm with side wing panels and headrest cut-outs, and fits most estates, hatchbacks and SUVs. If you've got an unusual boot, measure it against those dimensions or message us first."},
  {"q":"Is it waterproof and easy to clean?","a":"Yes — waterproof quilted fabric with a non-slip PVC underside. Wipe it clean, or machine wash when it needs more than that."},
  {"q":"Will it stay in place while driving?","a":"It's held with adjustable double-velcro straps and has a non-slip underside, so it stays put rather than sliding around on corners."},
  {"q":"How quickly will it arrive?","a":"This one ships from our UK warehouse, so it's quicker than the rest of the range — dispatched same-day and delivered in about 2–5 working days."}
]
```

### The New Rescue Bundle — `gid://shopify/Product/10311327023387`
```json
[
  {"q":"What's included?","a":"One Lick Mat, one Snuffle Mat and one Slow-Feeder Bowl — three calming essentials picked for settling a newly-adopted or anxious dog."},
  {"q":"How much do I save vs buying separately?","a":"£49.97 bought separately, £34.99 as a bundle — you save £15."},
  {"q":"Can I swap an item in the bundle?","a":"Not currently — it's sold as a fixed set. Each item is also available individually if you'd rather build your own combination."},
  {"q":"Is this suitable for a newly-adopted or rescue dog?","a":"Yes — that's exactly who it's designed for. All three items are gentle, low-pressure ways to help a dog settle into a new home through licking, sniffing and slower mealtimes."}
]
```

## 4. Optional: apply via GraphQL (where writes are approved)
For each product, run `metafieldsSet` with the JSON above as the `value` (type `json`):
```graphql
mutation setFaq($mf: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $mf) {
    metafields { id namespace key }
    userErrors { field message }
  }
}
```
Variables (repeat per product):
```json
{ "mf": [ { "ownerId": "gid://shopify/Product/10311314768155", "namespace": "custom", "key": "faq", "type": "json", "value": "<the JSON array as a STRING>" } ] }
```
Note the `value` must be the JSON array **serialised as a string**.

## Still `[VERIFY]` — add later, don't guess now
- Nail Grinder: head/port design, measured noise level.
- Anything else you haven't personally confirmed on the CJ listing or a sample.
