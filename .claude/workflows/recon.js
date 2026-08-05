export const meta = {
  name: 'recon',
  description: 'Audit The Dog Nook + research competitors, then produce ONE ranked gap report',
  whenToUse: 'When you want to know what the shop is missing vs the market, and what to build next.',
  phases: [
    { title: 'Audit', detail: 'what exists in the repo/catalogue today' },
    { title: 'Research', detail: 'what competitors do, charge and say' },
    { title: 'Synthesise', detail: 'merge into one ranked, costed gap list' },
    { title: 'Critique', detail: 'adversarially attack the report for gaps + unverified claims' },
  ],
}

/* ------------------------------------------------------------------ *
 * Shared context every agent must respect.
 * ------------------------------------------------------------------ */
const CONTEXT = `
PROJECT: "The Dog Nook" — a UK Shopify store selling calming/comfort gear for ANXIOUS
and RESCUE dogs. Repo root has STATUS.md (source of truth), HANDOFF.md (detail),
growth/GROWTH-PLAN.md (the £100k model). Theme source is in dog-nook-theme/.

GOAL: £100k profit run-rate. The two levers that decide it are (1) AOV £60 -> £80 via a
bundle ladder, and (2) owned traffic 30% -> 65% via email + SEO. Ad budget is NOT a lever.

CURRENT CATALOGUE (live scan):
  SELLABLE NOW: Lick Mat £11.99 · Snuffle Mat £22.99 · Calming Donut Bed £29.99-44.99 ·
  Grooming Glove £11.99 · Nail Grinder £19.99 · Slow-Feeder Bowl £14.99 ·
  Car Boot Liner £29.99 · BUNDLE First Days Kit £34.99 · BUNDLE Settle-In £64.99
  BUILT BUT DRAFT (unsourced/no photos): Heartbeat Companion £24.99 · Calming Coat £24.99 ·
  Snuffle Ball £14.99 · Calming Snood £9.99 · Wobble Feeder £13.99 · Fireworks Ready Kit
  £39.99 · Deep Nook £59.99-89.99 · Auto-Play Ball £24.99 · Weighted Blanket £34.99 ·
  Complete Calm System £139.99 · Home-Alone Kit £69.99 · Fireworks Survival Kit £84.99
  Free UK delivery over £35. 30-day money-back guarantee. UK only.

HARD FACTS YOU MUST NOT CONTRADICT:
  * ZERO products have photographs. This is the launch blocker.
  * ZERO reviews exist. Judge.me not yet installed.
  * The new theme is UNPUBLISHED. The live site still runs an old theme.
  * The storefront is FIREWALLED from this environment. You CANNOT load, screenshot or
    visually verify any page. NEVER claim you saw a rendered page. If something can only
    be checked visually, say so and mark it owner-verifiable.

HONESTY RULES (non-negotiable, UK DMCC 2024 / CMA):
  * Never invent reviews, ratings, testimonials, urgency or scarcity.
  * Never propose medical/behavioural cure claims — these are comfort aids, not treatments.
  * Savings claims must be true against real component prices.
  * If you are unsure of a fact, label it an assumption. Do not present guesses as findings.
`

const FINDINGS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['findings'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'detail', 'impact', 'effort', 'evidence'],
        properties: {
          title: { type: 'string', description: 'Short label for the gap or opportunity' },
          detail: { type: 'string', description: 'What is missing/wrong and what to do instead' },
          impact: { type: 'string', enum: ['high', 'medium', 'low'] },
          effort: { type: 'string', enum: ['quick', 'medium', 'heavy'] },
          owner: { type: 'string', enum: ['claude', 'owner'], description: 'Who can actually do it' },
          evidence: { type: 'string', description: 'File path, URL or observation. Say "assumption" if unverified.' },
        },
      },
    },
  },
}

/* ------------------------------------------------------------------ *
 * PHASE 1+2 — audit and research run together (all independent).
 * A barrier here is correct: synthesis genuinely needs every result.
 * ------------------------------------------------------------------ */
const AUDITS = [
  {
    key: 'theme',
    prompt: `Audit the THEME source in dog-nook-theme/ (sections, snippets, templates).
Inventory what each page type actually renders, then identify what a high-converting
ecommerce store would have that this does NOT. Look hard for: missing trust/proof
elements, weak or absent calls-to-action, pages that render empty or near-empty without
data, accessibility problems, mobile-layout risks, and anything referencing data that
does not exist yet. Read real files — cite paths.`,
  },
  {
    key: 'catalogue',
    prompt: `Audit the CATALOGUE and product content. Read
audit/implementation-notes/live-catalog-changes.md and the theme's product templates.
Assess: are descriptions strong enough to sell without photos present? Are the bundle
ladders coherent? Are there obvious range gaps or duplicate/overlapping SKUs? Is the
pricing architecture (entry -> mid -> premium) sound and is each step believable?
Flag anything where copy promises something the data does not deliver.`,
  },
  {
    key: 'funnel',
    prompt: `Audit the BUYER JOURNEY end to end for a UK owner of an anxious rescue dog:
landing -> browse -> product page -> cart -> checkout -> post-purchase. Using the repo
(dog-nook-theme/, growth/, STATUS.md), identify every point where that person would
hesitate, get confused, or leave — and what specifically is missing at that moment.
Pay attention to the two levers: AOV and owned traffic (email capture).`,
  },
]

const RESEARCH = [
  {
    key: 'pdp-and-trust',
    prompt: `Use WebSearch. Research what leading UK/US pet-comfort and calming-dog
ecommerce brands put on their PRODUCT PAGES and how they build trust — page anatomy,
proof elements, guarantees, returns framing, delivery messaging, size guidance, and how
they handle being a small brand. Identify concrete, copyable patterns The Dog Nook is
missing. Name real brands and cite what you actually found.`,
  },
  {
    key: 'bundles-aov',
    prompt: `Use WebSearch. Research how successful ecommerce brands (especially pet and
comfort niches) increase AVERAGE ORDER VALUE: bundle construction, good/better/best
laddering, upsell placement, post-purchase upsells, free-shipping thresholds, and
"complete the set" mechanics. Focus on tactics that are honest and legal in the UK.
Give concrete mechanics The Dog Nook could adopt, with the reasoning.`,
  },
  {
    key: 'pricing',
    prompt: `Use WebSearch. Benchmark UK retail PRICING for: snuffle mats, lick mats,
calming/donut dog beds, cave/hooded dog beds, anxiety/compression coats, slow feeders,
grooming gloves, heartbeat comfort toys, weighted blankets for dogs, and multi-item
calming bundles. Report typical price bands and what the premium end charges plus what
justifies it. Then assess whether The Dog Nook's prices (listed in context) sit too low,
about right, or too high — and where there is room to raise price or differentiate.`,
  },
  {
    key: 'positioning',
    prompt: `Use WebSearch. Research the UK market specifically for ANXIOUS and RESCUE dog
products: who else targets this niche, how they position, what language and emotional
angles they use, what content/SEO they rank for, and how they acquire customers
(including any rescue-charity partnerships). Identify the positioning white space The
Dog Nook could own, and the specific channels most likely to work for a brand new
small UK brand with no audience.`,
  },
]

phase('Audit')

const gathered = await parallel(
  AUDITS.map((a) => () =>
    agent(`${CONTEXT}\n\nYOUR TASK (${a.key} audit):\n${a.prompt}\n\nReturn findings.`, {
      label: `audit:${a.key}`,
      phase: 'Audit',
      schema: FINDINGS_SCHEMA,
    }).then((r) => ({ source: `audit:${a.key}`, findings: (r && r.findings) || [] }))
  ).concat(
    RESEARCH.map((r) => () =>
      agent(`${CONTEXT}\n\nYOUR TASK (${r.key} research):\n${r.prompt}\n\nReturn findings.`, {
        label: `research:${r.key}`,
        phase: 'Research',
        schema: FINDINGS_SCHEMA,
      }).then((x) => ({ source: `research:${x ? r.key : r.key}`, findings: (x && x.findings) || [] }))
    )
  )
)

const all = gathered.filter(Boolean)
const flat = all.flatMap((g) => g.findings.map((f) => Object.assign({}, f, { source: g.source })))
log(`Gathered ${flat.length} raw findings from ${all.length} agents`)

/* ------------------------------------------------------------------ *
 * PHASE 3 — synthesise into one ranked report.
 * ------------------------------------------------------------------ */
phase('Synthesise')

const report = await agent(
  `${CONTEXT}

You are the SYNTHESISER. Below are raw findings from 7 independent agents (3 internal
audits, 4 market research). Merge them into ONE decision-ready report for the owner —
a non-technical small business owner who is overwhelmed and needs clarity.

RAW FINDINGS (JSON):
${JSON.stringify(flat, null, 1)}

Produce markdown with exactly these sections:
1. "## The 5 things that matter most" — ranked. For each: what, why it matters in money
   or conversion terms, who does it (Claude or owner), and rough effort.
2. "## Pricing verdict" — is the range priced right vs the UK market? Specific
   recommendations per product/bundle where there is a real case to change.
3. "## What competitors have that we don't" — concrete and copyable, no vagueness.
4. "## Quick wins Claude can do this week" — only things genuinely doable given the
   firewall and the no-photos reality.
5. "## Blocked on the owner" — honest list, photos first.
6. "## Assumptions and unknowns" — anything not actually verified.

Rules: deduplicate aggressively. Cut anything speculative or low-value. Be concrete and
plain-spoken — no consultant filler. Never contradict the HARD FACTS. If the findings
disagree with each other, say so explicitly rather than smoothing it over.`,
  { label: 'synthesise', phase: 'Synthesise' }
)

/* ------------------------------------------------------------------ *
 * PHASE 4 — adversarial critique. The report must survive attack.
 * ------------------------------------------------------------------ */
phase('Critique')

const critique = await agent(
  `${CONTEXT}

You are a hostile REVIEWER. Attack the report below. Your job is to find where it is
wrong, unsupported, or useless — not to praise it.

Specifically hunt for: (a) claims presented as fact that were never verified, especially
anything implying a page was actually viewed; (b) recommendations that violate the
honesty rules; (c) advice that ignores the no-photos/no-reviews reality; (d) anything
important that is MISSING entirely; (e) padding that should be cut.

REPORT:
${report}

Return markdown: "## What this report gets wrong", "## What it's missing",
"## What to cut". Be blunt and specific. If it is genuinely sound in a section, say so
briefly rather than manufacturing criticism.`,
  { label: 'critique', phase: 'Critique' }
)

return {
  report: report,
  critique: critique,
  rawCount: flat.length,
  agents: all.length,
}
