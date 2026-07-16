# 10 — Legal & customer-expectation checklist

**Not legal advice.** This flags obvious UK ecommerce compliance *risks* to check
against current GOV.UK / CMA guidance (S14–S20). Several items also need live
verification of policy-page contents, which the firewall prevented.

## Priority risks
| # | Issue | Evidence | Why it matters | Action |
|---|---|---|---|---|
| L1 | **No real trader identity / geographic address** | `footer-group.json` `[YOUR NAME]/[YOUR ADDRESS]` | Distance-selling rules require the trader's identity + geographic address as pre-contract info (S14-16) | Insert real sole-trader/company name + business address; if home-based, use a permitted service address |
| L2 | **"Made in the UK"** | footer copyright | Origin claims must be accurate; CJ-sourced goods aren't UK-made — misleading action risk (S17) | Remove/replace with a true statement |
| L3 | **Delivery timing claims** ("same-day UK warehouse", "1–2 days") | FAQ, trust strip, PDP | Misleading delivery info is an unfair practice + drives disputes (S17, S5) | State honest dispatch + delivery windows and origin |
| L4 | **Cookie/consent banner gates nothing** while naming Meta/TikTok pixels | banner + `dog-nook.js` | PECR/consent expectation: non-essential trackers need prior consent that actually applies | Make consent functional (Shopify Customer Privacy API / consent app) and only name pixels that exist |
| L5 | **Inconsistent bundle savings** (Save £9.98 vs Save £15; compare-at £49.97) | homepage vs PDP | Savings/"was" prices must be genuine and consistent; drip/partitioned & misleading price rules (S19) | One true saving; genuine compare-at basis; consistent everywhere |
| L6 | **Fake/undisclosed reviews** (currently none — good) | real-only design | Fake/commissioned reviews & fabricated aggregate scores banned (S18) | Keep real-only; never seed fake — maintain the current stance |

## Standard disclosure checklist
| Requirement | Communicated clearly? | Note |
|---|---|---|
| Trader/business identity | **❌** | Placeholder (L1) |
| Contact information | ✅ | Email + contact form; add a postal contact for completeness |
| Total price incl. taxes | ✅ (GBP, Shopify tax handling) | [Verify] prices shown tax-inclusive to consumers |
| Delivery costs | ⚠️ | Free >£35 stated; sub-£35 cost "shown at checkout" — ensure it's not a late surprise (drip pricing risk S19) |
| Delivery expectations | **❌ inconsistent** | L3 |
| Cancellation rights (14-day) | ✅ stated in FAQ | Good; ensure the returns/refunds **policy page** repeats it (S14) |
| Returns process | ⚠️ | FAQ covers it; confirm policy page has address + who pays return postage |
| Refund process | ⚠️ | Confirm 14-day refund timeframe stated on policy page (S14) |
| Privacy practices | ⚠️ [Verify] | Native `/policies/privacy-policy` referenced; confirm it's real, not template |
| Cookie use | ⚠️ | Banner exists but non-functional (L4) |
| Subscription / recurring terms | ✅ n/a | No subscriptions found |
| Product limitations | ⚠️ | Add honest "not ideal for…" per PDP (also good UX) |
| Hygiene/personalised-goods exclusion | ✅ | FAQ states used mats/grooming items non-returnable unless faulty — good, and lawful (hygiene exemption) |

## Policy-page verification still required (firewall-blocked)
Open each and confirm it contains **real, store-specific content** (not an unedited
template) and is internally consistent with the FAQ:
`/policies/refund-policy` (or `refund-returns`), `/policies/privacy-policy`,
`/policies/terms-of-service`, `/policies/shipping-policy`, `cookie-policy`.
Contradictions between a template policy and the FAQ are themselves a trust/compliance risk.

## Bottom line
The **content/config** compliance gaps (L1–L5) are more serious than anything in
the code. L1 (identity) and L3/L4 (delivery honesty, functional consent) should be
treated as **must-fix before/at launch**.
