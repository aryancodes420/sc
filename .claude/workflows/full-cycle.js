export const meta = {
  name: 'full-cycle',
  description: 'See the site → research the market → compare → fix → verify. Needs web access.',
  whenToUse: 'The complete audit-and-improve cycle. Run only in a WEB-ENABLED environment.',
  phases: [
    { title: 'Gate', detail: 'prove we can reach the site — refuse to run blind' },
    { title: 'See', detail: 'load and describe every page type as it actually renders' },
    { title: 'Research', detail: 'open real competitor pages, record real prices' },
    { title: 'Compare', detail: 'ours vs theirs, page by page' },
    { title: 'Verify', detail: 'attack every finding before it reaches the owner' },
    { title: 'Plan', detail: 'one sequenced fix list, not a dump' },
  ],
}

/* ==================================================================
 * LESSONS BAKED IN FROM RUN #1 (2026-08-05). Do not remove.
 *
 * 1. Run #1 ran BLIND — the environment could not load the storefront,
 *    so ~10 layout findings were guesses. This version refuses to run
 *    unless it can prove it can see the site.
 * 2. Run #1 declared the owner's REAL reviews fake, because it inferred
 *    from "zero Shopify orders" without knowing about offline sales.
 *    => Every finding now gets attacked before it reaches the owner,
 *       and any finding that accuses the owner of something must clear
 *       a higher bar: state what innocent explanation was ruled out.
 * 3. Run #1 dumped ~40 findings at once and overwhelmed the owner.
 *    => Output is sequenced. One thing at a time, in order.
 * 4. Run #1 researched pricing the owner could not act on yet.
 *    => Research is scoped to decisions that are actually live.
 * ================================================================== */

const PREVIEW = 'https://kkeqih-jm.myshopify.com/?preview_theme_id=193438056731'

const CONTEXT = `
PROJECT: "The Dog Nook" — UK Shopify store, calming/comfort gear for ANXIOUS and RESCUE dogs.
READ FIRST: STATUS.md (source of truth), then audit/findings/2026-08-05-recon-report.md
(what run #1 already found — DO NOT redo it, build on it).

Draft theme preview (unpublished, no password): ${PREVIEW}

STANDING RULES — these bind you:
 * NEVER publish a theme. Owner's click only.
 * Deploy target is theme 193438056731 ONLY. Never 193140818203 (live) or 193158119707 (dead).
 * Do NOT touch assets/dog-nook.js or assets/dog-nook-cro.css — three conflicting versions
   exist and nobody has decided which is canonical.
 * The reviews on 8 products are GENUINE (owner sold in person pre-Shopify). DO NOT delete.
 * No fake reviews/ratings/urgency/scarcity. No medical or cure claims. The ASA treats
   "anxiety" as a health condition — "reduces anxiety" is NOT allowed; "for dogs who find
   fireworks hard" is. Savings maths must be true vs real component prices. DMCC 2024 / CMA.

EVIDENCE STANDARD — the single most important rule:
 * State HOW you know each thing: "loaded the page", "read the file", "search snippet",
   "inference". If you did not load it, say so. Never imply you saw something render.
 * An inference about the OWNER (that they did something wrong) requires you to name the
   innocent explanations you ruled out and how. Run #1 failed exactly here.
`

const FINDING_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['findings'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['title', 'detail', 'howKnown', 'impact', 'effort', 'owner'],
        properties: {
          title: { type: 'string' },
          detail: { type: 'string' },
          howKnown: { type: 'string', enum: ['loaded-page', 'read-file', 'api-read', 'search-snippet', 'inference'] },
          evidence: { type: 'string', description: 'URL, file path, or exact observation' },
          impact: { type: 'string', enum: ['high', 'medium', 'low'] },
          effort: { type: 'string', enum: ['quick', 'medium', 'heavy'] },
          owner: { type: 'string', enum: ['claude', 'owner'] },
          blocker: {
            type: 'string',
            enum: ['none', 'physical-world', 'third-party', 'business-decision', 'admin-access', 'money'],
            description: 'REQUIRED when owner=owner. Why Claude cannot do it. "none" is only valid when owner=claude.',
          },
          blockerWhy: {
            type: 'string',
            description: 'REQUIRED when owner=owner. One sentence naming the exact capability that is missing.',
          },
        },
      },
    },
  },
}

/* The ONLY legitimate reasons a task is owner-only. Anything else => Claude does it. */
const OWNER_ONLY_TEST = `
CLASSIFY EVERY FINDING: can Claude do it, or must the owner?

**Default to CLAUDE.** Claude can read and write the catalogue, metafields, prices,
descriptions, theme files, templates, SEO fields, and can deploy to the draft theme.
Assume Claude does it unless one of these five barriers genuinely applies:

  1. physical-world  — needs hands, a camera, or a physical object.
                       (photographing products, measuring an item in the room)
  2. third-party     — needs a human at another company to reply.
                       (CJ transit times, a rescue charity agreeing to a partnership)
  3. business-decision — only the owner can decide; it's their money/brand/risk.
                       (what to source, whether to accept a margin, brand direction)
  4. admin-access    — needs a Shopify screen Claude is blocked from.
                       (publishing a theme, Settings > Shipping, installing an app,
                        uploading an image to the CDN)
  5. money           — requires spending.

If you cannot name one of those five, it is CLAUDE'S JOB. Do not offload work onto the
owner because it is tedious or long — they are one overwhelmed person and Claude is not.
"The owner should write better product copy" is WRONG: Claude writes it.
"The owner should photograph the products" is RIGHT: physical-world.
`

/* ---------------- PHASE 1 — GATE ---------------- */
phase('Gate')

const gate = await agent(
  `${CONTEXT}

Prove this environment can actually do the job. Run these and report the literal results:

  curl -sS -o /dev/null -w "%{http_code}" "${PREVIEW}"
  curl -sS -o /dev/null -w "%{http_code}" "https://www.google.com/"

Then try to fetch the preview page and report the first 200 characters of real HTML.
Return JSON only: {"canSeeSite": true|false, "canSeeWeb": true|false, "evidence": "..."}
Be strictly honest. A false "true" here poisons everything downstream.`,
  {
    label: 'gate:can-we-see',
    phase: 'Gate',
    schema: {
      type: 'object', additionalProperties: false,
      required: ['canSeeSite', 'canSeeWeb', 'evidence'],
      properties: {
        canSeeSite: { type: 'boolean' },
        canSeeWeb: { type: 'boolean' },
        evidence: { type: 'string' },
      },
    },
  }
)

log(`GATE — site: ${gate && gate.canSeeSite} · web: ${gate && gate.canSeeWeb}`)

if (!gate || !gate.canSeeSite) {
  log('BLIND. Refusing to guess at layout. Run this in a web-enabled environment.')
  return {
    aborted: true,
    reason: 'Cannot load the storefront. Run #1 already produced the blind-mode findings; ' +
            'repeating them adds nothing. Move to a web-enabled environment.',
    evidence: gate ? gate.evidence : 'gate agent failed',
  }
}

/* ---------------- PHASE 2 — SEE (the part run #1 could not do) ---------------- */
phase('See')

const PAGES = [
  { key: 'home', path: '/', checks: 'hero, category cards (do they link anywhere real?), quiz, bundles, newsletter, review block' },
  { key: 'pdp-single', path: '/products/calming-donut-bed-1', checks: 'gallery, size selector rendering, short description, specs block, size guide, trust badges, bundle upsell, reviews wording' },
  { key: 'pdp-bundle', path: '/products/the-settle-in-bundle', checks: 'contents listed, "separately" total, savings badge, description, FAQ, cross-sell — do the numbers match reality?' },
  { key: 'collection', path: '/collections/calming-essentials', checks: 'grid, filters, sort control, empty states' },
  { key: 'shop', path: '/pages/shop', checks: 'chips, product cards, imageless placeholders' },
  { key: 'cart', path: '/cart', checks: 'does a cart page exist at all, free-delivery progress bar, cross-sell' },
]

const seen = await parallel(
  PAGES.map((p) => () =>
    agent(
      `${CONTEXT}

Actually LOAD this page and report what renders: ${PREVIEW.split('?')[0]}${p.path}?preview_theme_id=193438056731

Look specifically at: ${p.checks}

Also check it at a MOBILE width (375px) — nothing has ever been checked on a phone and
that is where most traffic will land.

Report what you SEE. Quote real text and real numbers off the page. If an element is
missing, say it is missing. If you could not load it, say so and stop — do not infer.

${OWNER_ONLY_TEST}`,
      { label: `see:${p.key}`, phase: 'See', schema: FINDING_SCHEMA }
    ).then((r) => ({ source: `see:${p.key}`, findings: (r && r.findings) || [] }))
  )
)

/* ---------------- PHASE 3 — RESEARCH (real pages, real prices) ---------------- */
phase('Research')

const RESEARCH = [
  { key: 'prices', prompt:
    `OPEN real UK retail pages (do not rely on search snippets — run #1 did that and the
     numbers were only ±10%). Record price, URL and what's included for: cave/hooded dog
     beds (Collared Creatures, Snoozer, Charley Chau — run #1 got NOTHING here, this is
     the priority), anxiety/compression coats (Thundershirt UK), heartbeat comfort toys
     (Snuggle Puppy UK vs unbranded), snuffle mats priced by size, slow feeders, lick mats.
     Give a table of real observed prices with URLs.` },
  { key: 'competitor-pages', prompt:
    `OPEN the product pages of 3-4 direct UK competitors in the calming/anxious dog space.
     Describe their page structure concretely: what is above the fold, what proof they show,
     how they handle sizing, returns, delivery and "who are you". Compare against what The
     Dog Nook's PDP actually renders (the See phase covers ours). Be specific and copyable.` },
  { key: 'positioning', prompt:
    `Verify the biggest claim from run #1: that the "3-3-3 rule" (3 days decompress /
     3 weeks settle / 3 months at home) is taught by UK rescues but claimed by NO commercial
     brand. Search it properly and OPEN the ranking pages. Who ranks page 1? Are they all
     charities? Is any retailer already using it? Also check whether anyone owns the INDOOR
     anxious-dog problem (won't settle at night, won't eat, paces) as opposed to the outdoor
     on-lead problem that My Anxious Dog owns. Report the verdict plainly: open, or taken.` },
]

const researched = await parallel(
  RESEARCH.map((r) => () =>
    agent(`${CONTEXT}\n\nRESEARCH TASK (${r.key}):\n${r.prompt}\n\n${OWNER_ONLY_TEST}`, {
      label: `research:${r.key}`, phase: 'Research', schema: FINDING_SCHEMA,
    }).then((x) => ({ source: `research:${r.key}`, findings: (x && x.findings) || [] }))
  )
)

/* ---------------- PHASE 4 — VERIFY (attack every finding) ---------------- */
const pool = seen.concat(researched).filter(Boolean)
const flat = pool.flatMap((g) => g.findings.map((f) => Object.assign({}, f, { source: g.source })))
log(`${flat.length} raw findings — now attacking each one`)

phase('Verify')

const checked = await parallel(
  flat.map((f) => () =>
    agent(
      `${CONTEXT}

Try to REFUTE this finding. Default to "not proven" if you are unsure.

FINDING: ${JSON.stringify(f)}

Ask: is the evidence real? Was the page actually loaded, or is this dressed-up inference?
Is there an innocent explanation that was not ruled out? (Run #1 called the owner's genuine
reviews fake because it never considered offline sales — do not repeat that class of error.)
Does it contradict STATUS.md, and if so which one is right?

Return: {"holds": true|false, "why": "...", "corrected": "restated accurately, or empty"}`,
      {
        label: `verify:${(f.title || '').slice(0, 32)}`,
        phase: 'Verify',
        schema: {
          type: 'object', additionalProperties: false, required: ['holds', 'why'],
          properties: {
            holds: { type: 'boolean' },
            why: { type: 'string' },
            corrected: { type: 'string' },
          },
        },
      }
    ).then((v) => ({ finding: f, verdict: v }))
  )
)

const survivors = checked.filter(Boolean).filter((c) => c.verdict && c.verdict.holds)
const killed = checked.filter(Boolean).filter((c) => c.verdict && !c.verdict.holds)
log(`${survivors.length} findings survived · ${killed.length} killed in verification`)

/* ---------------- PHASE 5 — PLAN (sequenced, not a dump) ---------------- */
phase('Plan')

const plan = await agent(
  `${CONTEXT}

Write the owner's action plan. The owner is a solo founder, often on a phone, and was
OVERWHELMED by run #1's 40-item report. Sequencing is the deliverable. Density is failure.

SURVIVED VERIFICATION:
${JSON.stringify(survivors.map((s) => Object.assign({}, s.finding, { corrected: s.verdict.corrected })), null, 1)}

KILLED IN VERIFICATION (report these too — knowing what ISN'T wrong is valuable):
${JSON.stringify(killed.map((k) => ({ title: k.finding.title, why: k.verdict.why })), null, 1)}

${OWNER_ONLY_TEST}

Write markdown, in this order and nothing else:

## ✅ I'm doing these — you don't need to touch them
Everything classified claude. A plain table: what / how long. Then one sentence:
"Say go and I'll work through these in order."
This list should be LONG. Most things belong here.

## 🙋 Only you can do these — and here's exactly why
Everything classified owner. For EACH one give:
  - what to do, in one plain sentence
  - **why I can't**: name the barrier in plain English
    (e.g. "I can't hold a camera", "CJ has to reply to you", "Shopify won't let me
    publish a theme — that's deliberately your click")
  - how long it'll take you
Rank by what unblocks the most. If a task is only *partly* yours, split it:
say what you do and what I do after. (e.g. "You take the photos → I upload,
crop, write the alt text and wire them in.")

## ⏸️ Waiting on something else
Anything that can't start until one of the above finishes. Say what it's waiting for.

## 👍 Checked and actually fine
The killed findings. Knowing what ISN'T broken is worth as much as knowing what is.

## ❓ Still not certain
Anything unverified, and what it would take to be sure.

Rules: plain English, no jargon, no consultant filler. Never contradict the standing rules.
The owner is one person on a phone — if their list is long, you have classified lazily.
Go back and check each owner item genuinely fails one of the five barriers.`,
  { label: 'plan', phase: 'Plan' }
)

return {
  plan: plan,
  survived: survivors.length,
  killed: killed.length,
  sawSite: true,
}
