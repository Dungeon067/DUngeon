"""Render Mảnh Sao (Bảo Ấn, S31): trang sức kiểu hoạt hình (toon.py) trên Cycles, máy quay như ảnh vũ khí S24. Dùng:
blender -b -P tools/blender/bao-an/render.py -- --out out/ [--bo dem-hoi-van-dang] [--o hoa] [--samples 160] [--res 1024]
Mỗi món ra <bo>-<o>.png, <bo>-<o>-sm.png (bản icon, viền dày hơn) cùng mặt nạ -glow; hậu kỳ bằng tools/blender/weapons/hau-ky.sh.
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
import toon  # noqa: E402
from lib import TAU, crystal, curve_obj, empty, hexc, lathe, mat_cloth  # noqa: E402
from jewel import (beads_on, brilliant, circle, enamel, flame, gem, glass, glow, ice, ice_cluster, knot,  # noqa: E402
                   metal, paper, pearl, petal, place2d, rope, s_scroll, scroll_ring, setting, spheres, star_gem,
                   tassel_strands)
from sets import SETS  # noqa: E402
from motifs import badge as _badge  # noqa: E402

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--out", required=True)
ap.add_argument("--bo", default="")
ap.add_argument("--o", default="")
ap.add_argument("--samples", type=int, default=160)
ap.add_argument("--res", type=int, default=1024)
ap.add_argument("--sm", type=int, default=512, help="cỡ bản icon (viền dày hơn); 0 để bỏ")
ap.add_argument("--pbr", action="store_true", help="vật liệu PBR cũ thay cho toon")
a = ap.parse_args(argv)

if not a.pbr:
    _star_gem = star_gem

    def star_gem(name, loc, r, *args, **kw):
        return _star_gem(name, loc, r * 1.3, *args, **kw)

FRONT = (0, -1, 0)
X, Y, Z = (1, 0, 0), (0, 1, 0), (0, 0, 1)


def materials_toon(T):
    P = {"bong": hexc(T["bong"]), "rim": hexc(T["rim"])}
    M = {
        "K": toon.metal("kim", *T["kim"], P),
        "K2": toon.metal("kim2", *T["kim2"], P),
        "E": toon.enamel("men", T["men"][0], T["men"][1], 0.03, 0.22, "R", P),
        "EZ": toon.enamel("menZ", T["men"][0], T["men"][1], -0.15, 0.4, "Z", P),
        "E2": toon.enamel("men2", T["men2"][0], T["men2"][1], 0.0, 0.14, "R", P),
        "D": toon.gem("da", T["da"], P),
        "D2": toon.gem("da2", T["da2"], P),
        "S": toon.gem("sao", T["sao"], P, T["loi"], extra=1.6),
        "C": glow("loi", T["loi"], 30.0),
        "F": glow("lap", T["loi"], 14.0),
        "P": toon.pearl("ngoc", P),
        "G": toon.crystal_glass("thuy", T["thuy"], P),
        "cat": glow("cat", T["cat"], 3.0 if T["motif"] == "lua" else 1.2),
        "nuoc": glow("nuoc", T["nuoc"], 1.6 if T["motif"] == "lua" else 0.6),
        "tua": toon.cloth("tua", T["tua"], P),
    }
    if T["motif"] == "lua":
        M["giay"] = toon.paper("giay", T["giay"], P)
        M["EL"] = toon.enamel("men_ngon", "#c80a10", "#ff7a18", 0.0, 0.09, "Z", P)
        M["EC"] = toon.enamel("men_chen", "#b00814", "#ff4a14", 0.0, 0.24, "Z", P)
        M["Ei"] = toon.enamel("men_lua", "#ffb020", "#fff07a", 0.0, 0.1, "Z", P, glow=0.6)
        M["tan"] = glow("tan", "#ffc040", 10.0)
    elif T["motif"] == "bang":
        M["I"] = toon.ice("bang", T["bang"], P)
        M["IC"] = toon.crystal_glass("pha_le", T["thuy"], P)
    else:
        M["EL"] = toon.enamel("men_huy", T["men2"][0], T["men2"][1], 0.0, 0.12, "Z", P)
        M["EC"] = toon.enamel("men_chen", T["men"][1], T["men"][0], 0.0, 0.24, "Z", P)
        M["Ei"] = toon.enamel("men_loi", T["loi"], T["cat"], 0.0, 0.1, "Z", P, glow=0.5)
    return M


def materials(T):
    M = {
        "K": metal("kim", *T["kim"]),
        "K2": metal("kim2", *T["kim2"]),
        "E": enamel("men", T["men"][0], T["men"][1], 0.03, 0.22, "R"),
        "EZ": enamel("menZ", T["men"][0], T["men"][1], -0.15, 0.4, "Z"),
        "E2": enamel("men2", T["men2"][0], T["men2"][1], 0.0, 0.14, "R"),
        "D": gem("da", T["da"], T["da"], 0.4),
        "D2": gem("da2", T["da2"], T["da2"], 0.3, 1.76),
        "S": gem("sao", T["sao"], T["loi"], 2.5, 2.1, film=280.0),
        "C": glow("loi", T["loi"], 30.0),
        "F": glow("lap", T["loi"], 14.0),
        "P": pearl("ngoc"),
        "G": glass("thuy", T["thuy"]),
        "cat": glow("cat", T["cat"], 3.0 if T["motif"] == "lua" else 1.2),
        "nuoc": glow("nuoc", T["nuoc"], 1.6 if T["motif"] == "lua" else 0.6),
        "tua": mat_cloth("tua", hexc(T["tua"]), 0.9, 0.5, 300),
    }
    if T["motif"] == "lua":
        M["giay"] = paper("giay", T["giay"], 1.4)
        M["EL"] = enamel("men_ngon", "#7a0806", "#ff5a0c", 0.0, 0.09, "Z")
        M["EC"] = enamel("men_chen", "#5a0306", "#d8360a", 0.0, 0.24, "Z")
        M["Ei"] = enamel("men_lua", "#ff9a14", "#ffd860", 0.0, 0.1, "Z", glow=0.5)
        M["tan"] = glow("tan", "#ffb040", 10.0)
    else:
        M["I"] = ice("bang", T["bang"])
    return M


def fire(T):
    return T["motif"] == "lua"


def ice_(T):
    return T["motif"] == "bang"


def plain(T):
    return not fire(T) and not ice_(T)


def badge(name, base, h, w, rot_z, M, root, T, rot_y=0.0, thick=0.01):
    return _badge(name, T["motif"], base, h, w, rot_z, M["EL"], M["K"], M["Ei"], root, thick, rot_y)


def hang(T, M, root, top, length, seed):
    if T.get("treo", "tua" if fire(T) else "ngoc") == "tua":
        pendant_tassel(T, M, root, top, length, seed)
    else:
        pearl_strands(M, root, top, 3, length * 0.75, seed)


# lớp cánh hoa: (số cánh, lệch góc, dài, rộng, nghiêng, y0, vật liệu, độ nhọn)
HOA_LOP = {
    "muoi": [(6, 0.0, 0.2, 0.08, 8, 0.0, "E", 0.8), (6, math.pi / 6, 0.14, 0.06, 26, -0.014, "E2", 0.8),
             (6, 0.0, 0.08, 0.034, 48, -0.03, "K2", 0.8)],
    "tia": [(12, 0.0, 0.2, 0.042, 8, 0.0, "K", 1.2), (12, math.pi / 12, 0.15, 0.036, 24, -0.012, "E", 1.2),
            (6, 0.2, 0.08, 0.03, 48, -0.03, "E2", 0.8)],
    "dieu": [(4, math.pi / 4, 0.21, 0.11, 8, 0.0, "E", 0.6), (4, 0.0, 0.16, 0.08, 22, -0.014, "E2", 0.6),
             (4, math.pi / 4, 0.08, 0.04, 46, -0.03, "K2", 0.6)],
    "set": [(5, math.pi / 2, 0.21, 0.06, 8, 0.0, "E", 1.4), (5, math.pi / 2 + math.pi / 5, 0.15, 0.05, 24, -0.012,
                                                           "E2", 1.4), (5, math.pi / 2, 0.07, 0.03, 48, -0.03, "K", 1.0)],
    "vom": [(5, math.pi / 2, 0.2, 0.085, 8, 0.0, "E2", 0.6), (5, math.pi / 2 + math.pi / 5, 0.15, 0.065, 24, -0.014,
                                                            "E", 0.6), (5, math.pi / 2, 0.075, 0.034, 48, -0.03, "K", 0.7)],
    "trang": [(8, 0.0, 0.21, 0.06, 8, 0.0, "E2", 1.3), (8, math.pi / 8, 0.15, 0.05, 26, -0.012, "E", 1.3),
              (8, 0.0, 0.08, 0.03, 48, -0.03, "K", 1.0)],
}


def hoa_layers(T, M, root):
    for li, (n, off, ln, w, tilt, y0, mk, pw) in enumerate(HOA_LOP[T["motif"]]):
        m = M[mk]
        for i in range(n):
            petal(f"canh{li}_{i}", (0, 0, 0), TAU * i / n + off, ln, w, [m], root, cup=0.4, curl=0.06, tilt=tilt,
                  y0=y0, pw=pw, rim=M["K"] if mk not in ("K", "K2") else None)
    for i in range(6):
        ang = TAU * i / 6 + math.pi / 6
        loc = (0.17 * math.cos(ang), -0.014, 0.17 * math.sin(ang))
        brilliant(f"da{i}", loc, 0.019, FRONT, M["D2"], root, up=Z)
        setting(f"chau{i}", loc, 0.019, FRONT, M["K"], root, 4)


def pendant_tassel(T, M, root, top, length=0.16, seed=3):
    knot("nut", top, 0.016, M["K"], root)
    tassel_strands("tua", (top[0], top[1], top[2] - 0.035), length, 22, M["tua"], root, seed=seed, spread=0.1,
                   sway=0.05, rw=0.004)


def pearl_strands(M, root, top, n=3, length=0.12, seed=1):
    for k in range(n):
        dx = (k - (n - 1) / 2) * 0.03
        pts = [(top[0] + dx * t, top[1], top[2] - length * t - 0.01 * math.sin(t * 3)) for t in
               [i / 12 for i in range(13)]]
        beads_on(f"chuoi{k}", pts, 0.0095, M["P"], root, 0.02)
        end = pts[-1]
        brilliant(f"giot{k}", (end[0], end[1], end[2] - 0.022), 0.014, FRONT, M["I"] if "I" in M else M["D"], root,
                  sy=1.6, up=Z)


# ---------------------------------------------------------------- 1. Hoa


def build_hoa(T, M, root):
    yb = 0.035
    rope("vanh", circle((0, yb, 0), X, Z, 0.235, 180), 0.016, M["K"], root, closed=True, twists=24)
    curve_obj("vanh_trong", [circle((0, yb, 0), X, Z, 0.205, 160)], 0.007, M["K2"], root, cyclic=True)
    beads_on("hat_ke", circle((0, yb - 0.004, 0), X, Z, 0.254, 220), 0.009, M["K2"], root, closed=True)
    scroll_ring("cuon", (0, yb, 0), X, Z, 0.22, 10, 0.075, M["K"], root, wire=0.0042)
    if fire(T):
        for k in range(12):
            ang = TAU * k / 12 + TAU / 24
            r0 = 0.25
            flame(f"lua{k}", (r0 * math.cos(ang), yb, r0 * math.sin(ang)), 0.08 + 0.02 * (k % 2), 0.032, 0.0,
                  M["EL"], M["K"], M["Ei"], root, lean=0.18, thick=0.008, rot_y=math.pi / 2 - ang)
    elif plain(T):
        for k in range(12):
            ang = TAU * k / 12 + TAU / 24
            r0 = 0.25
            badge(f"huy{k}", (r0 * math.cos(ang), yb, r0 * math.sin(ang)), 0.075 + 0.02 * (k % 2), 0.032, 0.0, M,
                  root, T, rot_y=math.pi / 2 - ang, thick=0.008)
    else:
        for k in range(12):
            ang = TAU * k / 12 + TAU / 24
            b = (0.245 * math.cos(ang), yb, 0.245 * math.sin(ang))
            crystal(f"bang{k}", b, (math.cos(ang), 0, math.sin(ang)), 0.07 + 0.035 * (k % 2), 0.011, 6, [M["I"]],
                    root)
        spheres("ngoc_vanh", [(0.262 * math.cos(TAU * k / 12), yb - 0.01, 0.262 * math.sin(TAU * k / 12))
                              for k in range(12)], 0.009, M["P"], root)
    if fire(T):
        layers = [(8, 0.0, 0.2, 0.072, 8, 0.0, M["E"], 0.0), (8, math.pi / 8, 0.145, 0.056, 24, -0.014, M["E2"], 0.0),
                  (6, 0.2, 0.085, 0.034, 48, -0.03, M["K"], 0.0)]
        for li, (n, off, ln, w, tilt, y0, m, cu) in enumerate(layers):
            for i in range(n):
                petal(f"canh{li}_{i}", (0, 0, 0), TAU * i / n + off, ln, w, [m], root, cup=0.45, curl=0.08, tilt=tilt,
                      y0=y0, rim=M["K"] if m is not M["K"] else None, vein=M["K"] if li == 0 else None)
        for i in range(8):
            ang = TAU * i / 8 + math.pi / 8
            loc = (0.165 * math.cos(ang), -0.012, 0.165 * math.sin(ang))
            brilliant(f"da{i}", loc, 0.019, FRONT, M["D2"], root, up=Z)
            setting(f"chau{i}", loc, 0.019, FRONT, M["K"], root, 4)
    elif plain(T):
        hoa_layers(T, M, root)
    else:
        spec = [(math.pi / 2, 0.225, 0.048, 6, 0.0, M["E"], 0.0), (math.pi * 7 / 6, 0.225, 0.048, 6, 0.0, M["E"], 0.0),
                (-math.pi / 6, 0.225, 0.048, 6, 0.0, M["E"], 0.0), (math.pi / 6 + 0.05, 0.175, 0.085, 16, -0.012, M["E"], 0.1),
                (math.pi * 5 / 6 - 0.05, 0.175, 0.085, 16, -0.012, M["E"], 0.1),
                (-math.pi / 2, 0.13, 0.068, 34, -0.026, M["E2"], 0.06)]
        for i, (rot, ln, w, tilt, y0, m, ru) in enumerate(spec):
            petal(f"lan{i}", (0, 0, 0), rot, ln, w, [m], root, cup=0.55, curl=0.18 if i == 5 else 0.06, tilt=tilt,
                  y0=y0, rim=M["K"], vein=M["K2"] if i < 5 else None, ruffle=ru, pw=0.6 if i < 3 else 0.9)
        spheres("ngoc_nhuy", [(0.11 * math.cos(math.pi / 2 + TAU * k / 5), -0.03, 0.11 * math.sin(math.pi / 2 + TAU * k / 5))
                              for k in range(5)], 0.011, M["P"], root)
    star_gem("sao", (0, -0.05, 0), 0.055, FRONT, M["S"], M["C"], M["K"], root, flare=M["F"])
    beads_on("day_treo", [(0, yb, -0.262), (0, yb - 0.005, -0.33)], 0.007, M["K"], root, 0.017)
    brilliant("giot", (0, yb - 0.01, -0.37), 0.03, FRONT, M["D"], root, sy=1.55, up=Z)
    setting("chau_giot", (0, yb - 0.01, -0.37), 0.03, FRONT, M["K"], root, 6, sy=1.55, up=Z)
    hang(T, M, root, (0, yb, -0.42), 0.16, 3)


# ---------------------------------------------------------------- 2. Lông


def build_long(T, M, root):
    def rach(t):
        return (0.07 * math.sin(math.pi * t * 0.85) - 0.02 * t, 0.0, -0.32 + 0.8 * t)

    def tang(t):
        p0, p1 = rach(max(0, t - 0.01)), rach(min(1, t + 0.01))
        dx, dz = p1[0] - p0[0], p1[2] - p0[2]
        L = math.hypot(dx, dz)
        return dx / L, dz / L

    t0 = 0.2

    def V(u, v, lift=0.0):
        t = t0 + (1 - t0) * v
        px, _, pz = rach(t)
        tx, tz = tang(t)
        sx, sz = tz, -tx
        wr = 0.155 if u > 0 else 0.11
        w = wr * math.sin(math.pi * min(1, v * 0.98 + 0.02) ** 0.72) ** 0.75 * (1 - 0.25 * v)
        w *= 1 + 0.05 * math.sin(v * 61 + (3 if u > 0 else 0))
        sweep = abs(u) * 0.05 * (1 - v * 0.5)
        x = px + sx * u * w + tx * sweep
        z = pz + sz * u * w + tz * sweep
        ripple = 0.0022 * math.sin(TAU * (v * 38 - abs(u) * 2.4)) * abs(u)
        y = -(0.03 * u * u * w / wr) - ripple - lift + 0.01 * u
        return (x, y, z)

    nu, nv = 24, 160
    verts, faces = [], []
    for j in range(nv + 1):
        for i in range(nu + 1):
            verts.append(V(-1 + 2 * i / nu, j / nv))
    for j in range(nv):
        for i in range(nu):
            q = j * (nu + 1) + i
            faces.append((q, q + 1, q + nu + 2, q + nu + 1))
    o = lib.mesh_obj("phien", verts, faces, None, [M["EZ"]], smooth=True, sharp_deg=None, parent=root)
    o.modifiers.new("day", "SOLIDIFY").thickness = 0.004
    edge = [V(1, j / nv, 0.002) for j in range(nv + 1)] + [V(-1, j / nv, 0.002) for j in range(nv, -1, -1)]
    curve_obj("vien", [edge], 0.0038, M["K"], root, bevel_res=2)
    ribs = []
    for k in range(1, 9, 2):
        v = k / 9.5
        for side in (1, -1):
            ribs.append([V(side * i / 10, v, 0.0025) for i in range(1, 10)])
    curve_obj("gan", ribs, 0.0028, M["K"], root, bevel_res=1)
    scr = []
    for k in range(3):
        v = 0.15 + k * 0.25
        for side in (1, -1):
            c = V(side * 0.5, v, 0.004)
            tx, tz = tang(t0 + (1 - t0) * v)
            scr.append(place2d(s_scroll(0.05, c_only=True), c, (tx, 0, tz), (side * tz, 0, -side * tx)))
    curve_obj("cuon", scr, 0.003, M["K2"], root, bevel_res=1)
    path = [rach(i / 120) for i in range(121)]
    rope("can", path, 0.011, M["K"], root, twists=50, taper=lambda t: 1 - 0.75 * t)
    for k in range(4):
        t = 0.33 + k * 0.14
        p = rach(t)
        r = 0.02 - k * 0.002
        loc = (p[0], -0.012, p[2])
        brilliant(f"da{k}", loc, r, FRONT, M["D"] if k % 2 == 0 else M["D2"], root, up=Z)
        setting(f"chau{k}", loc, r, FRONT, M["K"], root, 4)
    sp = rach(t0 - 0.02)
    star_gem("sao", (sp[0], -0.03, sp[2]), 0.05, FRONT, M["S"], M["C"], M["K"], root, flare=M["F"])
    b = rach(0.0)
    lathe("ong", [(0.0, b[2] - 0.02), (0.012, b[2] - 0.018), (0.016, b[2]), (0.02, b[2] + 0.02), (0.014, b[2] + 0.035),
                  (0.022, b[2] + 0.05), (0.018, b[2] + 0.065), (0.011, b[2] + 0.09), (0.0, b[2] + 0.095)], 40,
          [M["K"]], root, offset=(b[0], 0, 0))
    beads_on("vong_ong", circle((b[0], 0, b[2] + 0.05), X, Y, 0.023, 48), 0.004, M["K2"], root, closed=True)
    if fire(T):
        rnd = lib.rng(11)
        tip = rach(1.0)
        for k in range(8):
            ang = rnd.uniform(-0.3, 1.7)
            base = (tip[0] + 0.04 * math.cos(ang), -0.005, tip[2] - 0.05 + 0.05 * math.sin(ang))
            crystal(f"tia{k}", base, (math.cos(ang), -0.2, math.sin(ang)), rnd.uniform(0.035, 0.06), 0.008, 4,
                    [M["tan"]], root)
        spheres("tan_hat", [(tip[0] + rnd.uniform(-0.08, 0.1), -0.01, tip[2] + rnd.uniform(-0.12, 0.08))
                            for _ in range(8)], [rnd.uniform(0.005, 0.008) for _ in range(8)], M["tan"], root)
        pendant_tassel(T, M, root, (b[0], 0, b[2] - 0.025), 0.1, 5)
    elif plain(T):
        tip = rach(1.0)
        for k, (da, sk) in enumerate(((0.0, 1.0), (-0.55, 0.7), (0.55, 0.7))):
            badge(f"huy{k}", (tip[0] - 0.01, -0.006, tip[2] - 0.04), 0.1 * sk, 0.036 * sk, 0.0, M, root, T, rot_y=da)
        hang(T, M, root, (b[0], 0, b[2] - 0.025), 0.1, 5)
    else:
        tip = rach(1.0)
        ice_cluster("bang_ngon", tip, (0.2, -0.1, 1), 0.09, M["I"], root, 6, 3, 0.6, 0.012)
        for k, v in enumerate((0.45, 0.62, 0.78)):
            p = V(1, v)
            ice_cluster(f"bang_mep{k}", p, (1, -0.1, 0.3), 0.05, M["I"], root, 3, 7 + k, 0.5, 0.007)
        pearl_strands(M, root, (b[0], 0, b[2] - 0.025), 3, 0.1, 2)


# ---------------------------------------------------------------- 3. Canh (đồng hồ cát)


def build_canh(T, M, root):
    H = 0.205
    for sgn in (-1, 1):
        prof = [(0.0, 0.25), (0.15, 0.25), (0.168, 0.242), (0.162, 0.229), (0.14, 0.222), (0.147, 0.213), (0.12, 0.205),
                (0.0, 0.205)]
        prof = [(r, sgn * z) for r, z in prof]
        if sgn < 0:
            prof = list(reversed(prof))
        lathe(f"de{sgn}", prof, 72, [M["K"]], root)
        beads_on(f"hat_de{sgn}", circle((0, 0, sgn * 0.247), X, Y, 0.158, 160), 0.0075, M["K2"], root, closed=True)
        rope(f"vanh_de{sgn}", circle((0, 0, sgn * 0.216), X, Y, 0.146, 160), 0.007, M["K2"], root, closed=True)
        for k in range(6):
            ang = TAU * k / 6 + TAU / 12
            loc = (0.168 * math.cos(ang), 0.168 * math.sin(ang), sgn * 0.235)
            brilliant(f"da_de{sgn}{k}", loc, 0.013, (math.cos(ang), math.sin(ang), 0), M["D2"] if k % 2 else M["D"],
                      root, up=Z)
    for k in range(4):
        ang = TAU * k / 4 + TAU / 8
        x, y = 0.128 * math.cos(ang), 0.128 * math.sin(ang)
        path = [(x, y, -H + 2 * H * i / 60) for i in range(61)]
        rope(f"cot{k}", path, 0.012, M["K"], root, twists=22)
        for z in (-0.12, 0.0, 0.12):
            if not ice_(T) or z != 0.0:
                lathe(f"dot{k}{z}", [(0, z - 0.016), (0.011, z - 0.012), (0.015, z), (0.011, z + 0.012), (0, z + 0.016)],
                      24, [M["K2"]], root, offset=(x, y, 0))
        if ice_(T):
            spheres(f"ngoc_cot{k}", [(x, y, 0.0)], 0.014, M["P"], root)
        a2 = ang + TAU / 8
        c = (0.13 * math.cos(a2), 0.13 * math.sin(a2), 0.0)
        tan = (-math.sin(a2), math.cos(a2), 0.0)
        sc = [place2d(s_scroll(0.2, 1.0), c, Z, tan)]
        sc += [place2d([(x2 * 0.45, y2 * 0.45) for x2, y2 in s_scroll(0.2, 1.0)], c, Z, (-tan[0], -tan[1], 0))]
        curve_obj(f"cuon{k}", sc, 0.0042, M["K2"], root, bevel_res=2)

    def rz(z):
        t = abs(z) / H
        return 0.012 + 0.092 * math.sin(math.pi * min(1.0, t) * 0.92 + 0.0) ** 0.75
    prof = [(rz(-H + 2 * H * i / 60), -H + 2 * H * i / 60) for i in range(61)]
    prof[0] = (0.04, -H)
    prof[-1] = (0.04, H)
    th = lathe("thuy", prof, 64, [M["G"]], root, cap=False)
    sol = th.modifiers.new("vo", "SOLIDIFY")
    sol.thickness = 0.004
    lathe("cat_duoi", [(0.0, -H + 0.01), (0.085, -H + 0.012), (0.06, -0.15), (0.025, -0.125), (0.0, -0.118)], 48,
          [M["cat"]], root)
    lathe("cat_tren", [(0.0, 0.03), (0.03, 0.035), (0.075, 0.07), (0.088, 0.09), (0.0, 0.09)], 48, [M["cat"]], root)
    curve_obj("dong_cat", [[(0, 0, 0.03), (0, 0, -0.118)]], 0.0022, M["cat"], root)
    rope("eo", circle((0, 0, 0), X, Y, 0.02, 48), 0.006, M["K"], root, closed=True, twists=80)
    star_gem("sao", (0, -0.03, 0.0), 0.036, FRONT, M["S"], M["C"], M["K"], root, flare=M["F"], flare_size=1.8)
    if fire(T):
        lathe("nom", [(0.0, 0.25), (0.03, 0.252), (0.022, 0.27), (0.03, 0.285), (0.0, 0.29)], 32, [M["K"]], root)
        flame("lua_nom", (0, 0, 0.285), 0.13, 0.045, 0.0, M["EL"], M["K"], M["Ei"], root, lean=0.12, thick=0.01)
        curve_obj("moc", [[(0.0, 0, 0.415), (0.03, 0, 0.44), (0.0, 0, 0.47), (-0.03, 0, 0.44), (-0.004, 0, 0.42)]],
                  0.005, M["K"], root, kind="BEZIER")
        lathe("nom_d", [(0.0, -0.29), (0.03, -0.285), (0.022, -0.27), (0.03, -0.252), (0.0, -0.25)], 32, [M["K"]],
              root)
        pendant_tassel(T, M, root, (0, 0, -0.3), 0.15, 2)
    elif plain(T):
        lathe("nom", [(0.0, 0.25), (0.03, 0.252), (0.022, 0.27), (0.03, 0.285), (0.0, 0.29)], 32, [M["K"]], root)
        badge("huy_nom", (0, 0, 0.285), 0.13, 0.055, 0.0, M, root, T)
        lathe("nom_d", [(0.0, -0.29), (0.03, -0.285), (0.022, -0.27), (0.03, -0.252), (0.0, -0.25)], 32, [M["K"]],
              root)
        hang(T, M, root, (0, 0, -0.3), 0.15, 2)
    else:
        lathe("nom", [(0.0, 0.25), (0.03, 0.252), (0.022, 0.27), (0.0, 0.275)], 32, [M["K"]], root)
        c = (0, -0.005, 0.33)
        for k in range(6):
            ang = TAU * k / 6 + math.pi / 2
            crystal(f"bong{k}", c, (math.cos(ang), 0, math.sin(ang)), 0.055, 0.009, 6, [M["I"]], root)
            for s2 in (-1, 1):
                b = (c[0] + 0.03 * math.cos(ang), c[1], c[2] + 0.03 * math.sin(ang))
                a2 = ang + s2 * 0.8
                crystal(f"nhanh{k}{s2}", b, (math.cos(a2), 0, math.sin(a2)), 0.022, 0.005, 6, [M["I"]], root)
        spheres("tam_bong", [c], 0.013, M["P"], root)
        for k in range(8):
            ang = TAU * k / 8
            r = 0.15 if k % 2 else 0.12
            ice_cluster(f"bang_duoi{k}", (r * math.cos(ang), r * math.sin(ang), -0.25), (0, 0, -1),
                        0.06 + 0.03 * (k % 3), M["I"], root, 2, k, 0.15, 0.008)


# ---------------------------------------------------------------- 4. Chén


def build_chen(T, M, root):
    outer = [(0.05, 0.0), (0.1, 0.02), (0.145, 0.065), (0.17, 0.12), (0.182, 0.18), (0.19, 0.225)]
    inner = [(0.182, 0.222), (0.175, 0.18), (0.162, 0.12), (0.135, 0.07), (0.09, 0.035), (0.0, 0.03)]
    prof = [(0.0, 0.0)] + outer + inner
    bat = lathe("bat", prof, 96, [M.get("IC", M["I"]) if ice_(T) else M["EC"]], root, cap=False)
    if ice_(T):
        bat.modifiers.new("day", "SOLIDIFY").thickness = 0.006

    def r_at(z):
        for (r0, z0), (r1, z1) in zip(outer, outer[1:]):
            if z0 <= z <= z1:
                return r0 + (r1 - r0) * (z - z0) / (z1 - z0)
        return outer[-1][0]
    for z, w in ((0.06, 0.007), (0.14, 0.007)):
        rope(f"dai{z}", circle((0, 0, z), X, Y, r_at(z) + 0.004, 160), w * 1.3, M["K"], root, closed=True, twists=30)
    scroll_ring("cuon_dai", (0, 0, 0.1), X, Y, r_at(0.1) + 0.003, 9, 0.085, M["K"], root, wire=0.0042, vert=Z)
    for k in range(7):
        ang = -math.pi / 2 + TAU * (k + 0.5) / 7
        if abs(math.sin(ang) + 1) < 0.3:
            continue
        rr = r_at(0.1) + 0.008
        loc = (rr * math.cos(ang), rr * math.sin(ang), 0.1)
        brilliant(f"da{k}", loc, 0.019, (math.cos(ang), math.sin(ang), -0.1), M["D2"] if k % 2 else M["D"], root,
                  up=Z)
        setting(f"chau{k}", loc, 0.019, (math.cos(ang), math.sin(ang), -0.1), M["K"], root, 6)
    rr = r_at(0.1) + 0.012
    lathe("dia_sao", [(0.0, 0.0), (0.055, 0.0), (0.058, 0.008), (0.0, 0.01)], 48, [M["K"]], root, axis="Y",
          offset=(0, -rr + 0.012, 0.1))
    beads_on("vien_dia", circle((0, -rr + 0.002, 0.1), X, Z, 0.056, 80), 0.0065, M["K2"], root, closed=True)
    star_gem("sao", (0, -rr - 0.006, 0.1), 0.045, (0, -1, -0.12), M["S"], M["C"], M["K"], root, flare=M["F"])
    rope("mieng", circle((0, 0, 0.226), X, Y, 0.187, 180), 0.011, M["K"], root, closed=True, twists=28)
    beads_on("hat_mieng", circle((0, 0, 0.212), X, Y, 0.191, 200), 0.0068, M["K2"], root, closed=True)
    lathe("nuoc", [(0.0, 0.19), (0.176, 0.19), (0.0, 0.1905)], 64, [M["nuoc"]], root)
    if fire(T):
        for k in range(12):
            ang = TAU * k / 12
            flame(f"lua{k}", (0.19 * math.cos(ang), 0.19 * math.sin(ang), 0.228), 0.06, 0.026, ang - math.pi / 2,
                  M["EL"], M["K"], M["Ei"], root, lean=0.15, thick=0.006)
        for s2 in (-1, 1):
            pts = [(s2 * 0.185, 0, 0.19), (s2 * 0.27, 0, 0.21), (s2 * 0.29, 0, 0.12), (s2 * 0.22, 0, 0.05),
                   (s2 * 0.15, 0, 0.045)]
            curve_obj(f"quai{s2}", [pts], 0.009, M["K"], root, kind="BEZIER")
            sc = place2d(s_scroll(0.08, c_only=True), (s2 * 0.25, 0, 0.13), (0, 0, 1), (s2, 0, 0))
            curve_obj(f"quai_cuon{s2}", [sc], 0.004, M["K2"], root)
            spheres(f"quai_hat{s2}", [(s2 * 0.275, 0, 0.2)], 0.012, M["K2"], root)
    elif plain(T):
        for k in range(12):
            ang = TAU * k / 12
            badge(f"huy{k}", (0.19 * math.cos(ang), 0.19 * math.sin(ang), 0.228), 0.06, 0.026, ang - math.pi / 2, M,
                  root, T, thick=0.007)
        if T.get("quai"):
            for s2 in (-1, 1):
                pts = [(s2 * 0.185, 0, 0.19), (s2 * 0.27, 0, 0.21), (s2 * 0.29, 0, 0.12), (s2 * 0.22, 0, 0.05),
                       (s2 * 0.15, 0, 0.045)]
                curve_obj(f"quai{s2}", [pts], 0.009, M["K"], root, kind="BEZIER")
                spheres(f"quai_hat{s2}", [(s2 * 0.275, 0, 0.2)], 0.012, M["K2"], root)
        else:
            spheres("ngoc_mieng", [(0.2 * math.cos(TAU * (k + 0.5) / 12), 0.2 * math.sin(TAU * (k + 0.5) / 12), 0.236)
                                   for k in range(12)], 0.011, M["P"], root)
    else:
        ribs = []
        for k in range(8):
            ang = TAU * k / 8
            ribs.append([((r + 0.005) * math.cos(ang), (r + 0.005) * math.sin(ang), z) for r, z in outer])
        curve_obj("long_bac", ribs, 0.0055, M["K"], root, kind="BEZIER")
        spheres("ngoc_mieng", [(0.192 * math.cos(TAU * k / 12), 0.192 * math.sin(TAU * k / 12), 0.236)
                               for k in range(12)], 0.011, M["P"], root)
    lathe("chan", [(0.05, 0.0), (0.03, -0.02), (0.022, -0.05), (0.04, -0.07), (0.047, -0.085), (0.04, -0.1),
                   (0.02, -0.12), (0.019, -0.16), (0.04, -0.185), (0.1, -0.21), (0.13, -0.225), (0.132, -0.238),
                   (0.0, -0.238)], 72, [M["K"]], root)
    for k in range(7):
        ang = TAU * k / 7
        loc = (0.048 * math.cos(ang), 0.048 * math.sin(ang), -0.085)
        if not ice_(T):
            brilliant(f"da_than{k}", loc, 0.012, (math.cos(ang), math.sin(ang), 0), M["D"], root, up=Z)
        else:
            spheres(f"ngoc_than{k}", [loc], 0.012, M["P"], root)
    beads_on("hat_chan", circle((0, 0, -0.232), X, Y, 0.133, 180), 0.007, M["K2"], root, closed=True)
    scroll_ring("cuon_chan", (0, 0, -0.205), X, Y, 0.085, 6, 0.065, M["K2"], root, wire=0.0038, lift=(0, 0, 0.004))
    if ice_(T):
        for k in range(4):
            ang = TAU * k / 4 + 0.3
            ice_cluster(f"bang_chan{k}", (0.12 * math.cos(ang), 0.12 * math.sin(ang), -0.215),
                        (math.cos(ang), math.sin(ang), 1.2), 0.05, M["I"], root, 3, k, 0.4, 0.007)


# ---------------------------------------------------------------- 5. Miện


def build_mien(T, M, root):
    R = 0.24
    lathe("dai", [(R - 0.003, -0.002), (R + 0.004, -0.002), (R + 0.006, 0.047), (R - 0.002, 0.047), (R - 0.003, -0.002)],
          160, [M["E"] if ice_(T) else M["EC"]], root, cap=False)
    for z in (-0.003, 0.048):
        rope(f"day{z}", circle((0, 0, z), X, Y, R + 0.005, 240), 0.0095, M["K"], root, closed=True, twists=35)
    beads_on("hat_dai", circle((0, 0, 0.06), X, Y, R + 0.004, 240), 0.0068, M["K2"], root, closed=True)
    for k in range(12):
        ang = TAU * k / 12
        loc = ((R + 0.009) * math.cos(ang), (R + 0.009) * math.sin(ang), 0.0225)
        nrm = (math.cos(ang), math.sin(ang), 0)
        brilliant(f"da{k}", loc, 0.015, nrm, M["D"] if k % 2 else M["D2"], root, up=Z)
        setting(f"chau{k}", loc, 0.015, nrm, M["K"], root, 4)
    n = 12
    for k in range(n):
        ang = -math.pi / 2 + TAU * k / n
        f = (1 - math.sin(ang)) / 2
        h = 0.06 + 0.11 * f ** 2
        base = (R * math.cos(ang), R * math.sin(ang), 0.055)
        if k == 0:
            continue
        if fire(T):
            flame(f"lua{k}", base, h, h * 0.36, ang - math.pi / 2, M["EL"], M["K"], M["Ei"], root, lean=0.12 * (1 if k % 2
                  else -1), thick=0.008)
        elif plain(T):
            badge(f"huy{k}", base, h, h * 0.42, ang - math.pi / 2, M, root, T)
        else:
            ice_cluster(f"bang{k}", base, (0.12 * math.cos(ang), 0.12 * math.sin(ang), 1), h, M["I"], root, 3, k, 0.25,
                        0.011)
        tip = (base[0], base[1], base[2] + h * 0.35)
        a2 = ang + math.pi / n
        p2 = ((R + 0.002) * math.cos(a2), (R + 0.002) * math.sin(a2), 0.075)
        spheres(f"ngoc{k}", [p2], 0.011, M["P"] if not fire(T) else M["K2"], root)
        del tip
    c = (0, -R - 0.012, 0.19)
    if fire(T):
        flame("lua_giua", (0, -R, 0.05), 0.3, 0.11, 0.0, M["EL"], M["K"], M["Ei"], root, lean=0.0, thick=0.01)
    elif plain(T):
        badge("huy_giua", (0, -R - 0.004, 0.05), 0.28, 0.11, 0.0, M, root, T, thick=0.012)
    else:
        ice_cluster("bang_giua", (0, -R, 0.05), (0, 0, 1), 0.28, M["I"], root, 5, 99, 0.3, 0.016)
        for s2 in (-1, 1):
            petal(f"lan_giua{s2}", (0, -R - 0.02, 0.11), math.pi / 2 + s2 * 0.9, 0.08, 0.034, [M["E"]], root, cup=0.5,
                  tilt=10, rim=M["K"], ruffle=0.06)
    rope("hao_quang", circle((c[0], c[1] + 0.006, c[2]), X, Z, 0.075, 120), 0.009, M["K"], root, closed=True,
         twists=30)
    beads_on("hao_hat", circle((c[0], c[1] + 0.008, c[2]), X, Z, 0.088, 140), 0.006, M["K2"], root, closed=True)
    star_gem("sao", c, 0.058, FRONT, M["S"], M["C"], M["K"], root, flare=M["F"], flare_size=1.7)
    for k, da in enumerate((-0.5, -0.25, 0.0, 0.25, 0.5)):
        ang = -math.pi / 2 + da
        top = ((R + 0.006) * math.cos(ang), (R + 0.006) * math.sin(ang), -0.01)
        L = 0.05 if k == 2 else 0.032
        beads_on(f"rui{k}", [top, (top[0], top[1], top[2] - L)], 0.004, M["K"], root, 0.009)
        loc = (top[0], top[1] - 0.004, top[2] - L - 0.02)
        nrm = (math.cos(ang), math.sin(ang), 0)
        brilliant(f"giot{k}", loc, 0.014 if k == 2 else 0.01, nrm, M["I"] if ice_(T) else M["D"], root, sy=1.6, up=Z)


BUILDERS = {"hoa": build_hoa, "long": build_long, "den": build_canh, "chen": build_chen, "mien": build_mien}
# (angle quanh Y, yaw quanh Z, roll quanh X) như lib.frame: góc 3/4 cho thấy chiều sâu.
POSE = {"hoa": (0, 26, 12), "long": (-18, 28, 10), "den": (0, 24, 14), "chen": (0, 18, 16), "mien": (0, 14, 24)}

if __name__ == "__main__":
    os.makedirs(a.out, exist_ok=True)
    for bo, T in SETS.items():
        if a.bo and bo != a.bo:
            continue
        for slot, build in BUILDERS.items():
            if a.o and slot != a.o:
                continue
            t0 = time.time()
            sc = lib.reset_scene()
            sc.render.resolution_x = sc.render.resolution_y = a.res
            root = empty()
            build(T, materials(T) if a.pbr else materials_toon(T), root)
            center, size = lib.frame(root, *POSE[slot], margin=1.14)
            lib.studio(center, size, hexc(T["rim"]))
            name = f"{bo}-{slot}"
            if a.pbr:
                lib.render(os.path.join(a.out, f"{name}.png"), a.samples)
                lib.render_glow_mask(os.path.join(a.out, f"{name}-glow.png"))
            else:
                for o in sc.objects:
                    if o.name.startswith("softbox"):
                        o.hide_render = True
                for res, out, th in ((a.res, name, 2.6 * a.res / 1024), (a.sm, f"{name}-sm", 2.2 * a.sm / 512)):
                    if not res:
                        continue
                    sc.render.resolution_x = sc.render.resolution_y = res
                    toon.setup(sc, hexc(T["vien"]), th * T.get("vien_k", 1.0), th * 0.45 * T.get("vien_k", 1.0))
                    toon.gates(1.0)
                    lib.render(os.path.join(a.out, f"{out}.png"), a.samples)
                    sc.render.use_freestyle = False
                    toon.gates(0.0)
                    lib.render_glow_mask(os.path.join(a.out, f"{out}-glow.png"))
            print(f"[xong] {name} {time.time() - t0:.0f}s", flush=True)
