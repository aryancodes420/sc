# PENDING — 3 GraphQL-only ops for another builder to run

> **For the next builder session.** Everything else in the Phase 1–3 product
> expansion is done (see `live-catalog-changes.md`). These 3 items are **GraphQL-only**
> — no built-in Shopify MCP tool exposes them — and got blocked mid-session when the
> Shopify MCP reconnected and its raw-GraphQL approval grant reset. **Run the single
> mutation below and you're done.** All targets are DRAFT products; nothing here is
> customer-facing yet, so it's safe.

## What needs doing
1. **The Fireworks Kit** (`gid://shopify/Product/10328016453915`) → set `templateSuffix = "bundle"` so it renders on the bundle template like The First Nights Bundle already does.
2. **Fireworks & Storms** collection (`gid://shopify/Collection/527313371419`) → change handle `fireworks-amp-storms` → `fireworks-storms` (cosmetic URL fix; title is already correct).
3. **`custom.faq` metafields** (namespace `custom`, key `faq`, type `json`) on the 4 products created after the disconnect: The Calming Snood, The Wobble Feeder, The First Nights Bundle, The Fireworks Kit. *(Heartbeat Companion, Calming Coat, Snuffle Ball already have theirs.)*

## How to run
Use `mcp__Shopify__graphql_mutation` (load via `ToolSearch select:...__graphql_mutation`;
the server hash changes between sessions — search `Shopify mutation` if the exact name
differs). Paste the mutation below **verbatim**. ⚠️ This tool prompts the owner TWICE
(harness approval + Shopify's own execute-confirmation) — **both must be approved** for
it to run; dismissing the second cancels the whole call. If it errors with
`permission stream closed`, that's the known transient hiccup — just retry the same call.

```graphql
mutation {
  tmpl: productUpdate(product: {id: "gid://shopify/Product/10328016453915", templateSuffix: "bundle"}) {
    product { id templateSuffix } userErrors { field message }
  }
  handle: collectionUpdate(input: {id: "gid://shopify/Collection/527313371419", handle: "fireworks-storms"}) {
    collection { id handle } userErrors { field message }
  }
  faq: metafieldsSet(metafields: [
    {ownerId: "gid://shopify/Product/10328015339803", namespace: "custom", key: "faq", type: "json", value: "[{\"q\":\"Will it stop my dog reacting to fireworks?\",\"a\":\"It takes the edge off the noise for many dogs, but it isn't ear protection to a measured rating and won't silence the world. Use it alongside a safe, quiet space — and for severe noise phobia, speak to your vet too. If it's not right, you're covered by our 30-day guarantee.\"},{\"q\":\"Can I use it for grooming and drying?\",\"a\":\"Yes — that's the second job it does. It holds flappy ears back and covered, which makes bath time and blow-drying calmer and less of a wrestle.\"},{\"q\":\"How do I introduce it?\",\"a\":\"Pop it on for a few minutes at a time on a calm day, with a treat or two, so it's familiar before you use it for a stressful event. Never leave it so tight it bothers them, and take it off between uses.\"}]"},
    {ownerId: "gid://shopify/Product/10328015536411", namespace: "custom", key: "faq", type: "json", value: "[{\"q\":\"What food works in it?\",\"a\":\"Dry kibble and firm, small treats work best — they roll out a few at a time as your dog nudges it. Wet or sticky food will clog it.\"},{\"q\":\"Is it noisy on hard floors?\",\"a\":\"It can rattle on tile or laminate as your dog rolls it. Many owners use it on a rug or mat to keep the noise down, which also slows it slightly for more of a challenge.\"},{\"q\":\"Is it safe to leave my dog alone with it?\",\"a\":\"Supervise the first few sessions to see how your dog treats it. It's a feeder, not a chew toy — take it away from a determined chewer and check it now and then for damage.\"}]"},
    {ownerId: "gid://shopify/Product/10328016290075", namespace: "custom", key: "faq", type: "json", value: "[{\"q\":\"What's included?\",\"a\":\"The Calming Donut Bed (in your chosen size), the Heartbeat Companion and the Lick Mat — three gentle things to help a nervous or newly-adopted dog settle through the night.\"},{\"q\":\"How much do I save?\",\"a\":\"From £66.97 bought separately (Small) down to £54.99 as a bundle — a saving of around £12. The Medium and Large options save a similar amount on the larger bed.\"},{\"q\":\"Which size should I choose?\",\"a\":\"The size sets the bed only. Measure your dog curled up and pick the bed that gives them room to turn — get in touch if you're between sizes and we'll help.\"},{\"q\":\"Is this right for a rescue dog?\",\"a\":\"Yes — it's built for exactly the first unsettled weeks. The bed gives them a den, the Heartbeat Companion gives them company at night, and the Lick Mat helps them wind down.\"}]"},
    {ownerId: "gid://shopify/Product/10328016453915", namespace: "custom", key: "faq", type: "json", value: "[{\"q\":\"What's included?\",\"a\":\"The Calming Coat (in your chosen size), the Calming Snood and the Snuffle Ball — three calming tools to set up before fireworks, a storm or any loud event.\"},{\"q\":\"How much do I save?\",\"a\":\"£49.97 bought separately, £39.99 as a kit — you save £9.98.\"},{\"q\":\"When should I use it?\",\"a\":\"Set it up before the noise starts, not once your dog is already panicking. Coat on, snood ready, Snuffle Ball loaded — ideally introduced on a calm day first so none of it is brand-new.\"},{\"q\":\"Will it fix my dog's noise phobia?\",\"a\":\"It helps many dogs cope with the edge of a loud night, but it's comfort kit, not a cure. For severe or worsening noise phobia, please involve your vet or a behaviourist.\"}]"}
  ]) { metafields { id ownerType } userErrors { field message } }
}
```

## Success check
Every `userErrors` array comes back empty, and:
- `tmpl.product.templateSuffix` == `"bundle"`
- `handle.collection.handle` == `"fireworks-storms"`
- `faq.metafields` lists 4 metafield ids

Optional read-back to confirm:
```graphql
{
  fk: product(id: "gid://shopify/Product/10328016453915") { templateSuffix faq: metafield(namespace:"custom", key:"faq"){ value } }
  fn: product(id: "gid://shopify/Product/10328016290075") { faq: metafield(namespace:"custom", key:"faq"){ value } }
  sn: product(id: "gid://shopify/Product/10328015339803") { faq: metafield(namespace:"custom", key:"faq"){ value } }
  wf: product(id: "gid://shopify/Product/10328015536411") { faq: metafield(namespace:"custom", key:"faq"){ value } }
  col: collection(id: "gid://shopify/Collection/527313371419") { handle }
}
```

## After running
Update `live-catalog-changes.md` (mark the "⏳ PENDING" block resolved) and delete this
file. Do **not** publish or set any product ACTIVE — the owner does that once each item
is sourced, its `{VERIFY}` specs are filled, and real photos are added.
