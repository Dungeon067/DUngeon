"""Render vũ khí. Dùng:
blender -b -P tools/blender/weapons/render.py -- --list danh-sach.json --out out/ [--ids a,b] [--samples 160]
Mỗi vũ khí ra <id>.png (1024², nền trong suốt) và <id>-glow.png (chỉ phần phát sáng, cho bước hậu kỳ).
"""
import argparse
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib  # noqa: E402
from designs import design_for  # noqa: E402
from models import BUILDERS  # noqa: E402

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--list", required=True)
ap.add_argument("--out", required=True)
ap.add_argument("--ids", default="")
ap.add_argument("--samples", type=int, default=160)
ap.add_argument("--res", type=int, default=1024)
a = ap.parse_args(argv)

weapons = json.load(open(a.list, encoding="utf8"))
ids = [x for x in a.ids.split(",") if x]
os.makedirs(a.out, exist_ok=True)
for w in weapons:
    if ids and w["id"] not in ids:
        continue
    d = design_for(w)
    if d["type"] not in BUILDERS:
        print(f"[bo qua] {w['id']}: chua co bo dung cho loai {d['type']}")
        continue
    t0 = time.time()
    sc = lib.reset_scene()
    sc.render.resolution_x = sc.render.resolution_y = a.res
    root = BUILDERS[d["type"]](d)
    center, size = lib.frame(root, d.get("angle", 45), d.get("yaw", 18), d.get("roll", 8))
    lib.studio(center, size, lib.hexc(d["glow"]))
    lib.render(os.path.join(a.out, f"{w['id']}.png"), a.samples)
    lib.render_glow_mask(os.path.join(a.out, f"{w['id']}-glow.png"))
    print(f"[xong] {w['id']} {time.time() - t0:.0f}s")
