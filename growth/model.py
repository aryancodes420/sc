#!/usr/bin/env python3
"""The Dog Nook - unit economics + 12-month simulation to a GBP100k net profit goal.

Everything here is an explicit, changeable assumption. Nothing is invented data:
market benchmarks are cited in GROWTH-PLAN.md; product costs are flagged ESTIMATE
until the owner confirms real CJ landed costs.
"""
import json
from dataclasses import dataclass, field

# ---------------------------------------------------------------- catalogue
# cogs = ESTIMATED landed cost (product + shipping) per unit, GBP.
# Source: audit/15-product-expansion-action-plan.md CJ estimates where available,
# else category-typical. OWNER MUST VERIFY.
PRODUCTS = [
    # name,                    price,  cogs,  status,  kind
    ("The Calming Snood",        9.99,  1.50, "draft",  "single"),
    ("The Lick Mat",            11.99,  2.50, "active", "single"),
    ("The Grooming Glove",      11.99,  2.00, "active", "single"),
    ("The Wobble Feeder",       13.99,  3.50, "draft",  "single"),
    ("The Slow-Feeder Bowl",    14.99,  3.00, "active", "single"),
    ("The Snuffle Ball",        14.99,  3.00, "draft",  "single"),
    ("The Nail Grinder",        19.99,  5.50, "active", "single"),
    ("The Snuffle Mat",         22.99,  5.00, "active", "single"),
    ("The Heartbeat Companion", 24.99,  5.00, "draft",  "single"),
    ("The Calming Coat",        24.99,  5.50, "draft",  "single"),
    ("The Auto-Play Ball",      24.99,  7.00, "draft",  "single"),
    ("The Car Boot Liner",      29.99,  9.00, "active", "single"),
    ("Calming Donut Bed (S)",   29.99,  9.00, "active", "single"),
    ("Calming Donut Bed (M)",   37.99, 12.00, "active", "single"),
    ("Calming Donut Bed (L)",   44.99, 15.00, "active", "single"),
    ("The Weighted Blanket",    34.99, 11.00, "draft",  "single"),
    ("The Deep Nook (L)",       59.99, 20.00, "draft",  "single"),
    ("The Deep Nook (XL)",      79.99, 26.00, "draft",  "single"),
    ("The Deep Nook (XXL)",     89.99, 30.00, "draft",  "single"),
    # bundles: cogs = sum of component landed costs
    ("First Days Kit",          34.99, 10.50, "active", "bundle"),
    ("Settle-In Bundle",        64.99, 18.20, "active", "bundle"),   # 72% verified by prior session
    ("Home-Alone Kit",          69.99, 15.00, "draft",  "bundle"),
    ("Fireworks Survival Kit",  84.99, 17.50, "draft",  "bundle"),
    ("Complete Calm System",   139.99, 44.00, "draft",  "bundle"),
]

# Per-parcel CJ shipping if bundle components ship separately (THE BUNDLE TRAP).
EXTRA_PARCEL_COST = 2.75
BUNDLE_PARCELS = {  # components likely shipped as separate parcels
    "First Days Kit": 3, "Settle-In Bundle": 3, "Home-Alone Kit": 3,
    "Fireworks Survival Kit": 5, "Complete Calm System": 5,
}

# ---------------------------------------------------------------- costs
PAYMENT_PCT   = 0.02      # Shopify Payments UK online rate, Basic plan
PAYMENT_FIXED = 0.25
REFUND_RATE   = 0.05      # refunds/replacements/breakage as % of revenue
FIXED_MONTHLY = 95.0      # Shopify Basic ~25 + apps ~50 + domain/misc ~20


def unit_econ(price, cogs, name=None, parcels=1):
    landed = cogs + (parcels - 1) * EXTRA_PARCEL_COST
    gross = price - landed
    fees = price * PAYMENT_PCT + PAYMENT_FIXED
    refunds = price * REFUND_RATE
    contrib = gross - fees - refunds
    return {
        "name": name, "price": price, "landed": round(landed, 2),
        "gross": round(gross, 2), "gross_pct": round(gross / price * 100, 1),
        "fees": round(fees, 2), "refunds": round(refunds, 2),
        "contrib": round(contrib, 2), "contrib_pct": round(contrib / price * 100, 1),
    }


# ---------------------------------------------------------------- seasonality
# UK dog-anxiety demand. Oct/Nov = fireworks (Bonfire Night 5 Nov + Diwali + NYE).
# Jan = post-Christmas rescue adoptions. Index is relative to a flat 1.0 month.
SEASON = {  # month index 1..12 = Aug 2026 .. Jul 2027 (launch month = Aug)
    "Aug": 0.85, "Sep": 1.05, "Oct": 1.65, "Nov": 1.95, "Dec": 1.30,
    "Jan": 0.85, "Feb": 0.75, "Mar": 0.80, "Apr": 0.85, "May": 0.90,
    "Jun": 0.85, "Jul": 0.80,
}
MONTHS = list(SEASON.keys())


# --- ad-market realism -------------------------------------------------------
# 1) Diminishing returns. You cannot buy unlimited profitable reach in a UK niche
#    of ~4.1m firework-fearful dogs. ROAS decays as monthly spend rises.
SATURATION_SPEND = 3000.0   # GBP/mo where decay becomes material
DECAY_K = 0.22              # at 3k ~x0.82, at 6k ~x0.69, at 14k ~x0.51
# 2) Learning-phase limit. Tripling budget overnight resets Meta's optimisation
#    and torches performance. Real operators scale ~50% a month at most.
MAX_SPEND_GROWTH = 1.5


def saturation(spend):
    return 1.0 / (1.0 + (spend / SATURATION_SPEND) * DECAY_K)


@dataclass
class Scenario:
    name: str
    aov: list                 # AOV by month
    cr: list                  # conversion rate by month
    roas: list                # paid ROAS by month (revenue / ad spend), pre-saturation
    owned_share: list         # share of orders from email/SEO/organic (no ad cost)
    committed: float          # owner's own monthly ad budget (floor)
    reinvest: float           # fraction of contribution ploughed back on top
    budget_cap: float         # max monthly ad spend the owner will tolerate
    gm: float = 0.70          # blended gross margin


def simulate(s: Scenario):
    rows, spend = [], s.committed
    cum_profit = 0.0
    for i, m in enumerate(MONTHS):
        season = SEASON[m]
        aov, cr, roas, owned = s.aov[i], s.cr[i], s.roas[i], s.owned_share[i]

        # Q4 ad auction inflation: CPMs/CPCs rise 30-50% Oct-Dec
        eff_roas = roas * (0.75 if m in ("Oct", "Nov", "Dec") else 1.0)
        eff_roas *= saturation(spend)          # diminishing returns

        spend = min(spend, s.budget_cap)
        paid_rev = spend * eff_roas * season
        paid_orders = paid_rev / aov if aov else 0
        # owned traffic converts alongside paid; owned_share is share of TOTAL orders
        total_orders = paid_orders / (1 - owned) if owned < 1 else paid_orders
        owned_orders = total_orders - paid_orders
        revenue = total_orders * aov

        gross = revenue * s.gm
        fees = revenue * PAYMENT_PCT + total_orders * PAYMENT_FIXED
        refunds = revenue * REFUND_RATE
        contrib = gross - fees - refunds
        profit = contrib - spend - FIXED_MONTHLY
        cum_profit += profit

        sessions = total_orders / cr if cr else 0

        rows.append({
            "month": m, "season": season, "sessions": round(sessions),
            "orders": round(total_orders, 1), "paid_orders": round(paid_orders, 1),
            "owned_orders": round(owned_orders, 1), "aov": aov, "cr": cr,
            "revenue": round(revenue), "ad_spend": round(spend),
            "roas": round(eff_roas, 2), "gross": round(gross),
            "contrib": round(contrib), "profit": round(profit),
            "cum_profit": round(cum_profit),
        })

        # Next month's ads = owner's committed budget + reinvested contribution,
        # limited by the learning-phase growth cap and the owner's ceiling.
        want = s.committed + max(0.0, contrib) * s.reinvest
        spend = min(s.budget_cap, want, spend * MAX_SPEND_GROWTH)
    return rows


def ramp(a, b, n=12, hold=0):
    """Linear ramp from a to b across n months, holding `a` for `hold` months."""
    out = []
    for i in range(n):
        if i < hold:
            out.append(a)
        else:
            t = (i - hold) / max(1, (n - 1 - hold))
            out.append(round(a + (b - a) * t, 4))
    return out


SCENARIOS = [
    Scenario(
        name="BASE - modest execution",
        aov=ramp(52, 66), cr=ramp(0.010, 0.020, hold=1),
        roas=ramp(1.8, 2.8, hold=2), owned_share=ramp(0.10, 0.32),
        committed=450, reinvest=0.45, budget_cap=3000,
    ),
    Scenario(
        name="GOOD - strong execution",
        aov=ramp(58, 76), cr=ramp(0.012, 0.025, hold=1),
        roas=ramp(2.0, 3.4, hold=2), owned_share=ramp(0.12, 0.45),
        committed=600, reinvest=0.65, budget_cap=8000,
    ),
    Scenario(
        name="STRETCH - the GBP100k case",
        aov=ramp(62, 86), cr=ramp(0.014, 0.029, hold=1),
        roas=ramp(2.2, 4.0, hold=2), owned_share=ramp(0.15, 0.55),
        committed=600, reinvest=0.80, budget_cap=20000,
    ),
]

if __name__ == "__main__":
    out = {"unit_econ": [], "unit_econ_parcel_trap": [], "scenarios": {}}

    for name, price, cogs, status, kind in PRODUCTS:
        out["unit_econ"].append({**unit_econ(price, cogs, name), "status": status, "kind": kind})
        if kind == "bundle":
            p = BUNDLE_PARCELS.get(name, 1)
            out["unit_econ_parcel_trap"].append(
                {**unit_econ(price, cogs, name, parcels=p), "parcels": p})

    for s in SCENARIOS:
        rows = simulate(s)
        out["scenarios"][s.name] = {
            "rows": rows,
            "total_revenue": sum(r["revenue"] for r in rows),
            "total_orders": round(sum(r["orders"] for r in rows)),
            "total_ad_spend": sum(r["ad_spend"] for r in rows),
            "total_profit": sum(r["profit"] for r in rows),
            "peak_month": max(rows, key=lambda r: r["revenue"])["month"],
        }

    print(json.dumps(out, indent=1))
