"""Render icon Bảo Ấn (S31), cùng đèn và máy quay với ảnh vũ khí S24. Dùng:
blender -b -P tools/blender/bao-an/render.py -- --out out/ [--bo dem-hoi-van-dang] [--samples 160] [--res 1024]
Mỗi món ra <bo>-<o>.png (nền trong suốt) và <bo>-<o>-glow.png; hậu kỳ bằng tools/blender/weapons/hau-ky.sh.
"""
import argparse
import math
import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "weapons"))
sys.path.insert(0, HERE)
import lib  # noqa: E402
from lib import (TAU, crystal, curve_obj, empty, extrude_poly, hexc, lathe, mat_aged, mat_cloth, mat_emit,  # noqa: E402
                 mat_gem, star_poly)
from models import tassel  # noqa: E402
from sets import SETS  # noqa: E402

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--out", required=True)
ap.add_argument("--bo", default="")
ap.add_argument("--o", default="")
ap.add_argument("--samples", type=int, default=160)
ap.add_argument("--res", type=int, default=1024)
a = ap.parse_args(argv)


def gold(d):
    return mat_aged("gold", hexc(d.get("gold", "#e0a94a")), hexc(d.get("cavity", "#3a2412")), 0.28)


def petal_pts(length, width, n=24, notch=0.0):
    pts = []
    for i in range(n + 1):
        t = i / n
        w = width * math.sin(math.pi * t) ** 0.8 * (1 - 0.25 * t)
        pts.append((w, length * t))
    tip = [(0.0, length * (1 + notch))] if notch else []
    right = pts
    left = [(-x, z) for x, z in reversed(pts[1:-1])]
    return right + tip + left


def rot2(pts, ang, dx=0.0, dz=0.0):
    c, s = math.cos(ang), math.sin(ang)
    return [(x * c - z * s + dx, x * s + z * c + dz) for x, z in pts]


def build_hoa(d, root):
    """Hoa cài áo: hai tầng cánh, nhụy là một hạt đèn."""
    p1 = mat_cloth("petal", hexc(d["petal"]), 0.05, 0.6, 220)
    p2 = mat_emit("petal_in", hexc(d["paper2"]), d.get("paper_glow", 0.5))
    mg = gold(d)
    for ring, (k, ln, w, y, off, m) in enumerate(((8, 0.2, 0.075, 0.0, 0.0, p1), (8, 0.13, 0.055, -0.012, 0.39, p2))):
        for i in range(k):
            ang = TAU * i / k + off
            o = extrude_poly(f"petal{ring}_{i}", rot2(petal_pts(ln, w, notch=0.04), ang), 0.006, [m], root, y=y,
                             smooth=True)
            o.rotation_euler = (math.radians(4 * math.sin(i * 1.7)), 0, 0)
    curve_obj("vien", [[(0.205 * math.cos(TAU * i / 96), 0.01, 0.205 * math.sin(TAU * i / 96)) for i in range(96)]],
              0.006, mg, root, cyclic=True)
    lathe("nhuy", [(0.0, -0.05), (0.04, -0.045), (0.055, 0.0), (0.04, 0.045), (0.0, 0.05)], 32,
          [mat_emit("bead", hexc(d["glow"]), 2.5)], root, axis="Y", offset=(0, -0.03, 0))
    for i in range(12):
        ang = TAU * i / 12
        lathe(f"hat{i}", [(0.0, -0.01), (0.009, 0.0), (0.0, 0.01)], 12, [mg], root, axis="Y",
              offset=(0.062 * math.cos(ang), -0.03, 0.062 * math.sin(ang)))
    tassel(root, (0.0, 0.0, -0.21), 0.14, 40, d["tassel"], seed=3, spread=0.1)


def build_long(d, root):
    """Lông chim cháy sém một mép, buộc dây đỏ, đầu lông còn tóe tia pháo."""
    vane = mat_cloth("vane", hexc(d["feather"]), 0.05, 0.55, 400)
    burn = mat_emit("burn", hexc(d["glow"]), 2.2)
    mg = gold(d)
    L = 0.62
    right, left = [], []
    for i in range(41):
        t = i / 40
        z = -0.12 + L * t
        w = 0.12 * math.sin(math.pi * min(1, t * 1.08)) ** 0.7
        right.append((w * 1.05 + 0.006 * math.sin(t * 40), z))
        left.append((-w * 0.8, z))
    extrude_poly("vane", right + list(reversed(left)), 0.004, [vane], root, smooth=True)
    edge = [(x + 0.004, -0.003, z) for x, z in right[8:]]
    curve_obj("mep_chay", [edge], 0.005, burn, root)
    curve_obj("can", [[(0.0, -0.004, -0.3), (0.0, -0.004, -0.12), (0.004, -0.004, 0.2), (0.0, -0.004, 0.5)]], 0.006, mg,
              root, kind="BEZIER")
    cord = mat_cloth("cord", hexc(d["tassel"]), 0.6, 0.6)
    for k in range(4):
        z = -0.2 + k * 0.014
        curve_obj(f"day{k}", [[(0.012 * math.cos(TAU * i / 24), 0.012 * math.sin(TAU * i / 24), z) for i in range(24)]],
                  0.004, cord, root, cyclic=True)
    lathe("hat", [(0.0, -0.26), (0.018, -0.25), (0.02, -0.235), (0.018, -0.22), (0.0, -0.21)], 24, [mg], root)
    tassel(root, (0.0, 0.0, -0.26), 0.12, 40, d["tassel"], seed=5, spread=0.12)
    rnd = lib.rng(11)
    for k in range(9):
        ang = rnd.uniform(-0.6, 1.4)
        base = (0.03 + 0.05 * math.cos(ang), -0.01, 0.47 + 0.05 * math.sin(ang))
        crystal(f"tia{k}", base, (math.cos(ang), 0, math.sin(ang)), rnd.uniform(0.03, 0.06), 0.006, 4, [burn], root)


def build_den(d, root):
    """Đèn canh: thân giấy có vạch chia canh, nóc và đáy đồng, móc treo."""
    paper = mat_emit("paper", hexc(d["paper"]), 0.8)
    mg = gold(d)
    prof = [(0.0, -0.2), (0.1, -0.19), (0.15, -0.1), (0.16, 0.0), (0.15, 0.1), (0.1, 0.19), (0.0, 0.2)]
    lathe("shade", prof, 48, [paper], root)
    ribs = []
    for k in range(10):
        ang = TAU * k / 10
        ribs.append([(r * 1.01 * math.cos(ang), r * 1.01 * math.sin(ang), z) for r, z in prof[1:-1]])
    curve_obj("ribs", ribs, 0.004, mg, root)
    for z, r in ((-0.1, 0.153), (0.0, 0.163), (0.1, 0.153)):
        curve_obj(f"canh{z}", [[(r * math.cos(TAU * i / 96), r * math.sin(TAU * i / 96), z) for i in range(96)]],
                  0.005, mat_aged("son", hexc(d["tassel"]), hexc("#2a0a08"), 0.5), root, cyclic=True)
    lathe("cap_t", [(0.0, 0.19), (0.08, 0.185), (0.1, 0.21), (0.05, 0.24), (0.02, 0.26), (0.0, 0.27)], 40, [mg], root)
    lathe("cap_b", [(0.0, -0.27), (0.03, -0.26), (0.08, -0.215), (0.07, -0.19), (0.0, -0.19)], 40, [mg], root)
    curve_obj("moc", [[(0, 0, 0.27), (0.05, 0, 0.34), (0.0, 0, 0.41), (-0.05, 0, 0.35), (-0.02, 0, 0.31)]], 0.007, mg,
              root, kind="BEZIER")
    tassel(root, (0.0, 0.0, -0.27), 0.15, 60, d["tassel"], seed=2, spread=0.14)


def build_chen(d, root):
    """Chén ngọc mỏng trên chân cao, đáy hiện một chấm sáng."""
    jade = mat_aged("jade", hexc(d["jade"]), hexc("#0e3a28"), 0.12, 3.0)
    mg = gold(d)
    prof = [(0.0, -0.02), (0.08, -0.015), (0.15, 0.04), (0.19, 0.12), (0.2, 0.16), (0.19, 0.16), (0.18, 0.12),
            (0.14, 0.05), (0.07, 0.005), (0.0, 0.0)]
    lathe("chen", prof, 72, [jade], root)
    curve_obj("mieng", [[(0.198 * math.cos(TAU * i / 128), 0.198 * math.sin(TAU * i / 128), 0.162) for i in range(128)]],
              0.007, mg, root, cyclic=True)
    lathe("chan", [(0.0, -0.2), (0.12, -0.195), (0.13, -0.18), (0.05, -0.15), (0.03, -0.08), (0.05, -0.03),
                   (0.08, -0.015), (0.0, -0.015)], 64, [mg], root)
    lathe("nuoc", [(0.0, 0.1), (0.165, 0.1), (0.0, 0.1005)], 64, [mat_emit("nuoc", hexc("#ff8a20"), 0.5)],
          root)
    lathe("cham", [(0.0, 0.098), (0.03, 0.1), (0.0, 0.104)], 32, [mat_emit("cham", hexc(d["glow"]), 4)], root)
    for k in range(6):
        ang = TAU * k / 6
        extrude_poly(f"van{k}", star_poly(4, 0.022, 0.008), 0.004, [mg], root).location = (
            0.172 * math.cos(ang), 0.172 * math.sin(ang) - 0.0, 0.08)


def build_mien(d, root):
    """Vành tóc vàng kết mười hai đèn hạt đậu, thêm một đèn lạ màu khác."""
    mg = gold(d)
    R = 0.26
    tilt = math.radians(30)

    def p(ang, r=R, dz=0.0):
        x, y = r * math.cos(ang), r * math.sin(ang)
        return (x, y * math.cos(tilt) - dz * math.sin(tilt), y * math.sin(tilt) + dz * math.cos(tilt))

    curve_obj("vanh", [[p(TAU * i / 160) for i in range(160)]], 0.012, mg, root, cyclic=True)
    curve_obj("vanh2", [[p(TAU * i / 160, R * 0.97, 0.03 + 0.012 * math.sin(TAU * i / 160 * 12)) for i in range(160)]],
              0.004, mg, root, cyclic=True)
    lam = mat_emit("den", hexc(d["paper"]), 0.9)
    odd = mat_emit("den13", hexc(d.get("odd", "#9fe8ff")), 2.2)
    for k in range(13):
        ang = TAU * k / 13 + 0.12
        x, y, z = p(ang, R, -0.035)
        m = odd if k == 12 else lam
        s = 0.8 if k == 12 else 1.0
        lathe(f"den{k}", [(0.0, -0.025 * s), (0.016 * s, -0.016 * s), (0.02 * s, 0.0), (0.016 * s, 0.016 * s),
                           (0.0, 0.025 * s)], 20, [m], root, offset=(x, y, z - 0.01))
        lathe(f"nap{k}", [(0.0, 0.024 * s), (0.008, 0.026 * s), (0.0, 0.03 * s)], 12, [mg], root,
              offset=(x, y, z - 0.01))
    extrude_poly("hoa", star_poly(6, 0.06, 0.025, 0.0, 0.0), 0.01, [mg], root).location = p(-math.pi / 2, R, 0.06)
    lathe("ngoc", [(0.0, -0.02), (0.022, 0.0), (0.0, 0.02)], 24, [mat_gem("ngoc", hexc(d["glow"]), hexc(d["glow"]), 3)],
          root, axis="Y", offset=tuple(c + o for c, o in zip(p(-math.pi / 2, R, 0.06), (0, -0.012, 0))))


BUILDERS = {"hoa": build_hoa, "long": build_long, "den": build_den, "chen": build_chen, "mien": build_mien}
# góc chụp từng ô: (angle, yaw, roll) như lib.frame
POSE = {"hoa": (8, 0, 14), "long": (-32, 0, 18), "den": (12, 25, 8), "chen": (4, 0, 32), "mien": (0, 0, 0)}

os.makedirs(a.out, exist_ok=True)
for bo, d in SETS.items():
    if a.bo and bo != a.bo:
        continue
    for slot, build in BUILDERS.items():
        if a.o and slot != a.o:
            continue
        t0 = time.time()
        sc = lib.reset_scene()
        sc.render.resolution_x = sc.render.resolution_y = a.res
        root = empty()
        build(d, root)
        center, size = lib.frame(root, *POSE[slot], margin=1.18)
        lib.studio(center, size, hexc(d["glow"]))
        name = f"{bo}-{slot}"
        lib.render(os.path.join(a.out, f"{name}.png"), a.samples)
        lib.render_glow_mask(os.path.join(a.out, f"{name}-glow.png"))
        print(f"[xong] {name} {time.time() - t0:.0f}s")
