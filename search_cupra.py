#!/usr/bin/env python3
"""
Cupra Leon 290/300 search tool
Searches multiple UK car listing sites for the best matches.
Criteria: Lux trim preferred, blue/black/nardo grey, £10k-£11k, max 90k miles
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import time
from urllib.parse import urlencode, quote_plus

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
}

PREFERRED_COLOURS = {"blue", "black", "grey", "nardo"}
TARGET_TRIMS = {"lux", "vz", "vzx", "cup", "sport"}
TARGET_ENGINES = {"290", "300"}


def score_listing(title: str, desc: str, colour: str, mileage: int, price: int) -> int:
    score = 0
    text = (title + " " + desc).lower()
    colour_lower = colour.lower()

    for eng in TARGET_ENGINES:
        if eng in text:
            score += 30
            break

    for trim in TARGET_TRIMS:
        if trim in text:
            score += 25 if trim == "lux" else (20 if trim in {"vz", "vzx"} else 10)
            break

    for col in PREFERRED_COLOURS:
        if col in colour_lower:
            score += 15 if col in {"blue", "black"} else 10
            break

    if 10000 <= price <= 11000:
        score += 20
    elif 9500 <= price < 10000 or 11000 < price <= 11500:
        score += 10

    if mileage < 40000:
        score += 15
    elif mileage < 60000:
        score += 10
    elif mileage < 80000:
        score += 5

    return score


def fetch(url: str, timeout: int = 15) -> BeautifulSoup | None:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=timeout)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "lxml")
    except Exception as e:
        print(f"    [error] {e}")
        return None


# ---------- Motors.co.uk ----------

def search_motors() -> list[dict]:
    results = []
    print("  Searching Motors.co.uk...")
    # Motors uses a different URL structure
    url = (
        "https://www.motors.co.uk/search/car/results/"
        "?make=Cupra&model=Leon&price_from=10000&price_to=11000"
        "&mileage_to=90000&keywords=290+300"
    )
    soup = fetch(url)
    if not soup:
        return results

    cards = soup.select(".product-listing__item") or soup.select("[data-vehicle-card]") or soup.select(".search-result")
    print(f"    Found {len(cards)} cards on Motors.co.uk")

    for card in cards:
        try:
            title_el = card.select_one("h2, h3, .vehicle-title, .listing-title")
            title = title_el.get_text(strip=True) if title_el else ""
            if not title or "leon" not in title.lower():
                continue

            price_el = card.select_one(".price, [data-price], .listing-price")
            price_text = price_el.get_text(strip=True) if price_el else "0"
            price = int(re.sub(r"[^\d]", "", price_text) or 0)

            miles_el = card.select_one(".mileage, [data-mileage]")
            miles_text = miles_el.get_text(strip=True) if miles_el else "0"
            mileage = int(re.sub(r"[^\d]", "", miles_text) or 0)

            colour_el = card.select_one(".colour, [data-colour]")
            colour = colour_el.get_text(strip=True) if colour_el else "Unknown"

            link_el = card.select_one("a[href]")
            link = link_el["href"] if link_el else ""
            if link and not link.startswith("http"):
                link = "https://www.motors.co.uk" + link

            results.append({
                "source": "Motors.co.uk",
                "title": title,
                "subtitle": "",
                "colour": colour,
                "mileage": mileage,
                "price": price,
                "url": link,
                "score": score_listing(title, "", colour, mileage, price),
            })
        except Exception:
            continue

    return results


# ---------- PistonHeads ----------

def search_pistonheads() -> list[dict]:
    results = []
    print("  Searching PistonHeads...")
    url = (
        "https://www.pistonheads.com/classifieds?make=Cupra&model=Leon"
        "&priceFrom=10000&priceTo=11000&mileageTo=90000"
    )
    soup = fetch(url)
    if not soup:
        return results

    # PistonHeads JSON data in script tags
    for script in soup.find_all("script"):
        text = script.string or ""
        if "listing" in text.lower() and "price" in text.lower():
            try:
                # Look for JSON array of listings
                match = re.search(r'"listings"\s*:\s*(\[.*?\])', text, re.S)
                if match:
                    data = json.loads(match.group(1))
                    for item in data[:20]:
                        title = item.get("title", "") or item.get("name", "")
                        price = int(item.get("price", 0) or 0)
                        mileage = int(item.get("mileage", 0) or 0)
                        colour = item.get("colour", "") or item.get("color", "Unknown")
                        url_path = item.get("url", "") or item.get("link", "")
                        full_url = url_path if url_path.startswith("http") else f"https://www.pistonheads.com{url_path}"

                        if price and mileage <= 90000 and "leon" in title.lower():
                            results.append({
                                "source": "PistonHeads",
                                "title": title,
                                "subtitle": "",
                                "colour": colour,
                                "mileage": mileage,
                                "price": price,
                                "url": full_url,
                                "score": score_listing(title, "", colour, mileage, price),
                            })
            except Exception:
                pass

    # Also try HTML cards
    cards = (
        soup.select(".classified-listing-card")
        or soup.select("[data-listing-id]")
        or soup.select(".listing-card")
    )
    print(f"    Found {len(cards)} HTML cards on PistonHeads")

    for card in cards:
        try:
            title_el = card.select_one("h2, h3, .title, [class*='title']")
            title = title_el.get_text(strip=True) if title_el else ""
            if not title or "leon" not in title.lower():
                continue

            price_el = card.select_one("[class*='price']")
            price_text = price_el.get_text(strip=True) if price_el else "0"
            price = int(re.sub(r"[^\d]", "", price_text) or 0)

            miles_el = card.select_one("[class*='mileage'], [class*='miles']")
            miles_text = miles_el.get_text(strip=True) if miles_el else "0"
            mileage = int(re.sub(r"[^\d]", "", miles_text) or 0)

            colour = "Unknown"
            spec_items = card.select("li, [class*='spec'], [class*='detail']")
            for item in spec_items:
                t = item.get_text(strip=True).lower()
                if any(c in t for c in ["blue", "black", "grey", "silver", "white", "red"]):
                    colour = item.get_text(strip=True)
                    break

            link_el = card.select_one("a[href]")
            link = link_el["href"] if link_el else ""
            if link and not link.startswith("http"):
                link = "https://www.pistonheads.com" + link

            if price:
                results.append({
                    "source": "PistonHeads",
                    "title": title,
                    "subtitle": "",
                    "colour": colour,
                    "mileage": mileage,
                    "price": price,
                    "url": link,
                    "score": score_listing(title, "", colour, mileage, price),
                })
        except Exception:
            continue

    return results


# ---------- CarGurus ----------

def search_cargurus() -> list[dict]:
    results = []
    print("  Searching CarGurus.co.uk...")
    url = (
        "https://www.cargurus.co.uk/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action"
        "?zip=SW1A+1AA&showNegotiable=true&sortDir=ASC&entitySelectingHelper.selectedEntity2=d2383"
        "&distance=100&trim=&minPrice=10000&maxPrice=11000&maxMileage=144841"
        "&startYear=2019&endYear=2024"
    )
    # CarGurus has a complex JS-rendered page, try the simpler listing endpoint
    url2 = "https://www.cargurus.co.uk/Cars/new/nl_CUPRA_Leon.html"
    soup = fetch(url2)
    if not soup:
        return results

    # Look for JSON data
    for script in soup.find_all("script"):
        text = script.string or ""
        if '"listings"' in text or '"inventory"' in text:
            try:
                match = re.search(r'"listings"\s*:\s*(\[.*?\])', text, re.S)
                if not match:
                    match = re.search(r'"inventory"\s*:\s*(\[.*?\])', text, re.S)
                if match:
                    data = json.loads(match.group(1))
                    for item in data[:20]:
                        title = item.get("heading", "") or item.get("name", "")
                        price = int(item.get("price", 0) or 0)
                        mileage = int(item.get("mileage", 0) or 0)
                        colour = item.get("exteriorColorName", "Unknown")
                        listing_id = item.get("id", "")
                        link = f"https://www.cargurus.co.uk/Cars/inventorylisting/vdp.action?listing={listing_id}" if listing_id else ""

                        if "leon" in title.lower() and 9500 <= price <= 11500 and mileage <= 90000:
                            results.append({
                                "source": "CarGurus",
                                "title": title,
                                "subtitle": "",
                                "colour": colour,
                                "mileage": mileage,
                                "price": price,
                                "url": link,
                                "score": score_listing(title, "", colour, mileage, price),
                            })
            except Exception:
                pass

    print(f"    Found {len(results)} listings on CarGurus")
    return results


# ---------- Main ----------

def print_results(all_results: list[dict]):
    if not all_results:
        print("\n[!] No structured listings retrieved — sites use heavy JavaScript rendering.")
        print("    Use the direct search links below in your browser.")
        return

    all_results.sort(key=lambda x: x["score"], reverse=True)

    print(f"\n{'='*72}")
    print(f"  TOP CUPRA LEON 290/300 MATCHES  ({len(all_results)} total found)")
    print(f"{'='*72}")

    for i, r in enumerate(all_results[:20], 1):
        price_str = f"£{r['price']:,}" if r["price"] else "POA"
        miles_str = f"{r['mileage']:,} mi" if r["mileage"] else "? mi"
        stars = "★" * min(5, r["score"] // 15)
        print(f"\n #{i:>2}  {stars}  [{r['source']}]")
        print(f"       {r['title']}")
        print(f"       {price_str}  |  {miles_str}  |  {r['colour']}")
        if r["url"]:
            print(f"       {r['url']}")


def main():
    print("=" * 72)
    print("  CUPRA LEON SEARCH  |  290/300ps  |  Lux/VZ preferred")
    print("  Budget: £10,000-£11,000  |  Max: 90,000 miles")
    print("  Colours: Blue / Black / Nardo Grey")
    print("=" * 72)
    print()

    all_results = []

    try:
        all_results += search_motors()
    except Exception as e:
        print(f"  Motors.co.uk failed: {e}")

    time.sleep(1)

    try:
        all_results += search_pistonheads()
    except Exception as e:
        print(f"  PistonHeads failed: {e}")

    time.sleep(1)

    try:
        all_results += search_cargurus()
    except Exception as e:
        print(f"  CarGurus failed: {e}")

    print_results(all_results)

    # Always show direct browser links
    print(f"\n{'='*72}")
    print("  DIRECT SEARCH LINKS — open these in your browser:")
    print(f"{'='*72}")

    links = [
        ("AutoTrader — Cupra Leon 290-300, £10k-£11k, <90k mi",
         "https://www.autotrader.co.uk/car-search?make=CUPRA&model=LEON"
         "&price-from=10000&price-to=11000&mileage-to=90000"),
        ("AutoTrader — filtered to blue/black/grey",
         "https://www.autotrader.co.uk/car-search?make=CUPRA&model=LEON"
         "&price-from=10000&price-to=11000&mileage-to=90000"
         "&colour=Blue&colour=Black&colour=Grey"),
        ("Motors.co.uk — Cupra Leon",
         "https://www.motors.co.uk/search/car/results/?make=Cupra&model=Leon"
         "&price_from=10000&price_to=11000&mileage_to=90000"),
        ("PistonHeads — Cupra Leon",
         "https://www.pistonheads.com/classifieds?make=Cupra&model=Leon"
         "&priceFrom=10000&priceTo=11000&mileageTo=90000"),
        ("CarGurus UK — Cupra Leon",
         "https://www.cargurus.co.uk/Cars/new/nl_CUPRA_Leon.html"),
        ("eBay Motors — Cupra Leon 290",
         "https://www.ebay.co.uk/sch/i.html?_nkw=cupra+leon+290&_sacat=9801"
         "&_udhi=11000&LH_BIN=1"),
    ]

    for name, link in links:
        print(f"\n  {name}")
        print(f"  {link}")

    print(f"\n{'='*72}")
    print("  WHAT TO LOOK FOR:")
    print("  - Engine: 2.0 TSI 290 PS (EA888 gen3b) or 300 PS VZ/VZx")
    print("  - Trim:   Lux (heated seats, JBL audio, sunroof, full leather)")
    print("            VZ (racier, Brembo brakes, sport suspension)")
    print("  - Avoid:  V1 2020 models with DSG oil change due (check service history)")
    print("  - Check:  Full service history | cambelt replaced | 4-wheel alignment")
    print("  - Bonus:  Cupra+ warranty if still active | winter tyre set included")
    print(f"{'='*72}\n")


if __name__ == "__main__":
    main()
