#!/usr/bin/env python3
"""Responsive image build: writes a 400px copy of every product photo to site/assets/img/400/.
productImg() in site.js serves it through srcset, so a phone's two-up card grid loads ~30 KB, not ~100 KB.
Run after adding or replacing any photo:  python3 scripts/build-images.py
"""
import os, sys
from PIL import Image
ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "site", "assets", "img")
OUT = os.path.join(ROOT, "400"); os.makedirs(OUT, exist_ok=True)
made = 0; total_in = 0; total_out = 0
for f in sorted(os.listdir(ROOT)):
    if not f.endswith(".webp"): continue
    src = os.path.join(ROOT, f); dst = os.path.join(OUT, f)
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src): continue
    im = Image.open(src).convert("RGB"); im.thumbnail((400, 400), Image.LANCZOS)
    im.save(dst, "WEBP", quality=78, method=6); made += 1
    total_in += os.path.getsize(src); total_out += os.path.getsize(dst)
print(f"{made} images written to img/400 ({total_in//1024} KB → {total_out//1024} KB)")
