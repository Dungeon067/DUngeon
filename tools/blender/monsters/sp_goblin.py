"""Yêu Rừng (goblin): yêu tinh rừng nhỏ, đầu to tai dài, mặt nạ vỏ cây khắc phù văn, áo lá tre khô xếp lớp,
váy cỏ, khố vải rách, chuỗi hạt tre, gậy tre vót nhọn. Mặt hướng -Y, cao ~0.9 m.
Dùng chung cho archer (cfg khác)."""
import math

import bmesh
import bpy
from mathutils import Vector

import build as B
import mlib as M

V = Vector


def joints(k=1.0, hunch=0.0):
    J = {
        "pelvis": (0, 0.01, 0.33), "spine": (0, 0.0, 0.43), "chest": (0, -0.03 - hunch, 0.52),
        "neck": (0, -0.055 - hunch * 1.5, 0.585), "head": (0, -0.075 - hunch * 2, 0.685),
    }
    for sd, S in ((1, "L"), (-1, "R")):
        J |= {
            f"clav{S}": (0.055 * sd, -0.03 - hunch, 0.555), f"shoulder{S}": (0.105 * sd, -0.03 - hunch, 0.55),
            f"elbow{S}": (0.165 * sd, 0.0, 0.43), f"wrist{S}": (0.19 * sd, -0.06, 0.33),
            f"hip{S}": (0.065 * sd, 0.01, 0.31), f"knee{S}": (0.095 * sd, -0.07, 0.19),
            f"ankle{S}": (0.09 * sd, 0.02, 0.06), f"toe{S}": (0.1 * sd, -0.08, 0.022),
        }
    return {n: V(p) * k for n, p in J.items()}


def bones_of(J):
    b = [("root", (0, 0, 0), (0, 0, 0.1), None), ("hips", J["pelvis"], J["spine"], "root"),
         ("spine", J["spine"], J["chest"], "hips"), ("chest", J["chest"], J["neck"], "spine"),
         ("head", J["neck"], J["neck"] + V((0, 0, 0.2)), "chest")]
    for S in "LR":
        b += [(f"ear{S}", J["head"] + V((0.1 * (1 if S == "L" else -1), 0.0, 0.02)),
               J["head"] + V((0.26 * (1 if S == "L" else -1), 0.04, 0.06)), "head"),
              (f"arm{S}", J[f"shoulder{S}"], J[f"elbow{S}"], "chest"),
              (f"fore{S}", J[f"elbow{S}"], J[f"wrist{S}"], f"arm{S}"),
              (f"hand{S}", J[f"wrist{S}"], J[f"wrist{S}"] + (J[f"wrist{S}"] - J[f"elbow{S}"]).normalized() * 0.06, f"fore{S}"),
              (f"thigh{S}", J[f"hip{S}"], J[f"knee{S}"], "hips"),
              (f"shin{S}", J[f"knee{S}"], J[f"ankle{S}"], f"thigh{S}"),
              (f"foot{S}", J[f"ankle{S}"], J[f"toe{S}"], f"shin{S}")]
    return b


def body(J, k, thin=1.0):
    names = ["pelvis", "spine", "chest", "neck"] + [f"{n}{S}" for S in "LR" for n in
                                                     ("clav", "shoulder", "elbow", "wrist", "hip", "knee", "ankle", "toe")]
    idx = {n: i for i, n in enumerate(names)}
    edges = [("pelvis", "spine"), ("spine", "chest"), ("chest", "neck")]
    for S in "LR":
        edges += [("chest", f"clav{S}"), (f"clav{S}", f"shoulder{S}"), (f"shoulder{S}", f"elbow{S}"),
                  (f"elbow{S}", f"wrist{S}"), ("pelvis", f"hip{S}"), (f"hip{S}", f"knee{S}"),
                  (f"knee{S}", f"ankle{S}"), (f"ankle{S}", f"toe{S}")]
    R = {"pelvis": (0.078, 0.064), "spine": (0.07, 0.058), "chest": (0.082, 0.062), "neck": (0.034, 0.034),
         "clav": 0.038, "shoulder": 0.036, "elbow": 0.026, "wrist": 0.025, "hip": 0.046, "knee": 0.032,
         "ankle": 0.026, "toe": (0.036, 0.018)}
    radii = []
    for n in names:
        r = R.get(n.rstrip("LR") if n not in R else n)
        r = r if isinstance(r, tuple) else (r, r)
        radii.append((r[0] * k * thin, r[1] * k * thin))
    o = M.skin_body("gob_body", [J[n] for n in names], [(idx[a], idx[b]) for a, b in edges], radii, sub=0)
    M.apply_mods(o)
    hi = M.dup(o, "gob_body_hi")
    M.subsurf(o, 1)
    M.subsurf(hi, 3)
    M.noise_verts(hi, 0.0025 * k, 40 / k, 2)
    M.smooth(o)
    M.smooth(hi)
    return o, hi


def head(J, k, nose=1.0):
    c = J["head"]
    o = M.uv_sphere("gob_head", 1.0, 24, 16)
    for v in o.data.vertices:
        x, y, z = v.co
        jaw = max(0.0, -z)
        cheek = math.exp(-((z + 0.15) / 0.35) ** 2)
        x *= 0.118 * (1 + 0.16 * cheek - 0.45 * jaw ** 2)
        y = y * 0.112 - 0.045 * jaw ** 1.5 * (y < 0.3) + 0.03 * max(0, y) * max(0, z) + 0.01 * max(0, -y) * max(0, z)
        z = z * 0.108 * (1 - 0.12 * jaw) - 0.03 * jaw ** 2 + 0.01 * max(0, z) ** 2
        v.co = c + V((x, y, z)) * k
    hi = M.dup(o, "gob_head_hi")
    M.subsurf(hi, 2)
    M.noise_verts(hi, 0.002 * k, 50 / k, 4)
    return o, hi


EYE = (0.33, 0.1, 0.17)


def mask_zt(x):
    ax = abs(x)
    return 0.5 + 0.22 * math.cos(min(ax, 0.85) * 1.8) - 0.12 * math.exp(-(x / 0.09) ** 2) + 0.3 * math.exp(-((ax - 0.6) / 0.11) ** 2)


def mask_zb(x):
    return -0.3 + 0.5 * abs(x) ** 1.15


def mask(J, k, outline=0.0):
    """Mặt nạ vỏ cây: lưới bám mặt cầu phía trước đầu, viền hình lá có hai mấu, hốc mắt lõm."""
    c = J["head"]
    R = V((0.135, 0.13, 0.122)) * k
    nx, nz = 20, 12
    bm = bmesh.new()
    rows = []
    for j in range(nz + 1):
        row = []
        for i in range(nx + 1):
            x = -0.84 + 1.68 * i / nx
            zb, zt = mask_zb(x), mask_zt(x)
            z = zb + (zt - zb) * j / nz
            rr = min(0.97, x * x + z * z)
            y = -math.sqrt(1 - rr)
            d = math.hypot(abs(x) - EYE[0], (z - EYE[1]) * 1.3)
            y += 0.1 * max(0.0, 1 - (d / EYE[2]) ** 2) ** 1.5
            y -= 0.05 * math.exp(-(x / 0.08) ** 2) * max(0.0, 1 - abs(z - 0.25) / 0.5)
            row.append(bm.verts.new(c + V((x * R.x, y * R.y - 0.006 * k, z * R.z + 0.006 * k))))
        rows.append(row)
    for r0, r1 in zip(rows[:-1], rows[1:]):
        for i in range(nx):
            bm.faces.new((r0[i], r1[i], r1[i + 1], r0[i + 1]))
    o = M.from_bm(bm, "gob_mask")
    m = o.modifiers.new("sol", "SOLIDIFY")
    m.thickness = 0.008 * k
    m.offset = 1
    M.apply_mods(o)
    M.smooth(o)
    hi = M.dup(o, "gob_mask_hi")
    M.subsurf(hi, 2)
    M.noise_verts(hi, 0.0012 * k, 120 / k, 7, (8, 1, 1))
    beak = M.cone("gob_beak", 0.02 * k, 0.002 * k, 0.055 * k, 8, c + V((0, -0.128, -0.028)) * k, V((0, -0.75, -0.65)))
    pupils = []
    for sd in (-1, 1):
        x, z = EYE[0] * sd, EYE[1]
        y = -math.sqrt(1 - x * x - z * z) + 0.07
        pupils.append(M.uv_sphere(f"pupil{sd}", 1.0, 10, 8, c + V((x * R.x, y * R.y - 0.004 * k, z * R.z + 0.004 * k)),
                                  (0.014 * k, 0.008 * k, 0.017 * k)))
    return (o, hi), beak, pupils


def mat_bark(c, k=1.0):
    p = M.pm("gob_bark")
    co = p.vec("SUBTRACT", p.co("Object"), tuple(c))
    co = p.vec("MULTIPLY", co, (1 / (0.135 * k), 1 / (0.13 * k), 1 / (0.122 * k)))
    x, y, z = p.xyz(co)
    ax = p.math("ABSOLUTE", x)
    fib = p.noise(p.vec("MULTIPLY", co, (38, 38, 4)), 1.0, 5, 0.6, distort=0.4)
    grain = p.wave(p.vec("MULTIPLY", co, (1, 1, 0.15)), 9.0, 5.0, 3.0, "BANDS", "X", "SAW")
    t = p.add(p.mul(fib, 0.65), p.mul(grain, 0.35))
    col = p.ramp(t, [(0.0, (0.26, 0.16, 0.1)), (0.32, (0.48, 0.34, 0.22)), (0.6, (0.7, 0.58, 0.42)), (1.0, (0.86, 0.78, 0.62))])
    ed = p.vec("LENGTH", p.comb(p.math("SUBTRACT", ax, EYE[0]), 0.0, p.mul(p.math("SUBTRACT", z, EYE[1]), 1.3)))
    sock = p.sstep(EYE[2], EYE[2] * 0.55, ed)
    col = p.mix(p.mul(sock, 0.92), col, (0.06, 0.035, 0.05))
    lip = p.mul(p.sstep(EYE[2] * 1.35, EYE[2] * 1.05, ed), p.sstep(EYE[2] * 0.85, EYE[2] * 1.0, ed))
    col = p.mix(p.mul(lip, 0.6), col, (0.3, 0.19, 0.12))
    arc = p.mul(p.sstep(0.03, 0.012, p.math("ABSOLUTE", p.math("SUBTRACT", ed, EYE[2] * 1.55))),
                p.sstep(EYE[1] + 0.02, EYE[1] + 0.1, z))
    mid = p.mul(p.sstep(0.03, 0.012, ax), p.mul(p.sstep(0.22, 0.28, z), p.sstep(0.62, 0.55, z)))
    dots = p.sstep(0.045, 0.03, p.vec("LENGTH", p.comb(x, 0, p.math("SUBTRACT", z, 0.2))))
    rune = p.math("MAXIMUM", p.math("MAXIMUM", arc, mid), dots)
    paint = p.mul(p.sstep(0.035, 0.015, p.math("ABSOLUTE", p.math("SUBTRACT", z, p.add(p.mul(ax, -0.55), 0.02)))),
                  p.mul(p.sstep(0.45, 0.5, ax), p.sstep(0.82, 0.72, ax)))
    col = p.mix(p.mul(paint, 0.9), col, (0.9, 0.88, 0.8))
    col = p.mix(rune, col, (0.65, 1.0, 0.55))
    edge = p.sstep(0.6, 0.84, ax)
    col = p.mix(p.mul(edge, 0.35), col, (0.2, 0.12, 0.08))
    cr = p.voronoi(p.vec("MULTIPLY", co, (6, 6, 2)), 1.0, "DISTANCE_TO_EDGE")
    crack = p.sstep(0.025, 0.0, cr)
    col = p.mix(p.mul(crack, 0.7), col, (0.16, 0.09, 0.06))
    h = p.add(p.mul(t, 0.5), p.mul(p.math("SUBTRACT", 1, crack), 0.4))
    h = p.math("SUBTRACT", h, p.mul(rune, 0.35))
    return p.done(col, p.comb(p.mul(rune, 0.85), 0.05, rune), p.bump(h, 0.7, 0.0025 * k))


def mat_head(J, sid, skin_cfg, k):
    """Da đầu + miệng cười rộng vẽ tay."""
    p = mat_skin(f"{sid}_head", *skin_cfg, k=k, finish=False)
    co = p.vec("SUBTRACT", p.co("Object"), tuple(J["head"]))
    x, y, z = p.xyz(co)
    zm = p.add(-0.056 * k, p.mul(p.mul(x, x), 9.0 / k))
    d = p.math("ABSOLUTE", p.math("SUBTRACT", z, zm))
    w = p.mul(p.sstep(0.07 * k, 0.05 * k, p.math("ABSOLUTE", x)), p.sstep(-0.06 * k, -0.09 * k, y))
    mouth = p.mul(p.sstep(0.006 * k, 0.003 * k, d), w)
    col = p.mix(mouth, p.col, (0.12, 0.03, 0.05))
    p.col = col
    return p.done(col, (0, 0.12, 0), p.nrm)


def mat_skin(p_name="gob_skin", base=(0.36, 0.46, 0.22), dark=(0.17, 0.24, 0.15), belly=(0.62, 0.66, 0.38), k=1.0,
             finish=True):
    p = M.pm(p_name)
    co = p.co("Object")
    x, y, z = p.xyz(co)
    g = p.remap(z, 0.02 * k, 0.75 * k, 0.0, 1.0)
    col = p.mix(g, dark, base)
    bel = p.mul(p.sstep(-0.02 * k, -0.07 * k, y), p.mul(p.sstep(0.3 * k, 0.45 * k, z), p.sstep(0.62 * k, 0.5 * k, z)))
    col = p.mix(p.mul(bel, 0.6), col, belly)
    sp = p.voronoi(p.vec("SCALE", co, None, 26 / k), 1.0, "F1")
    spots = p.mul(p.sstep(0.28, 0.12, sp), p.noise(p.vec("SCALE", co, None, 9 / k), 1.0, 2))
    col = p.mix(p.mul(spots, 0.35), col, dark)
    mot = p.noise(p.vec("SCALE", co, None, 14 / k), 1.0, 4, 0.6)
    col = p.mix(p.mul(p.math("SUBTRACT", mot, 0.45), 0.3), col, (0.5, 0.42, 0.25))
    wr = p.voronoi(p.vec("SCALE", co, None, 70 / k), 1.0, "DISTANCE_TO_EDGE")
    h = p.add(p.mul(p.sstep(0.0, 0.08, wr), 0.4), p.mul(p.noise(p.vec("SCALE", co, None, 160 / k), 1.0, 2), 0.3))
    nrm = p.bump(h, 0.35, 0.002 * k)
    if not finish:
        p.col, p.nrm = col, nrm
        return p
    return p.done(col, (0.0, 0.12, 0.0), nrm)


def mat_leaf(name="gob_leaf", green=(0.45, 0.55, 0.2), dry=(0.78, 0.63, 0.3)):
    p = M.pm(name)
    uv = p.co("UV")
    u, v, _ = p.xyz(uv)
    rnd = p.node("ShaderNodeObjectInfo").outputs["Random"]
    du = p.math("ABSOLUTE", p.math("SUBTRACT", u, 0.5))
    dry_t = p.add(p.mul(v, 0.8), p.mul(rnd, 0.6))
    col = p.mix(p.sstep(0.35, 1.0, dry_t), green, dry)
    col = p.mix(p.mul(p.sstep(0.0, 1.0, p.mul(rnd, 1.0)), 0.25), col, (0.3, 0.42, 0.14))
    veins = p.math("ABSOLUTE", p.math("SINE", p.mul(du, 60.0)))
    col = p.mix(p.mul(p.sstep(0.85, 1.0, veins), 0.2), col, (0.2, 0.22, 0.08))
    mid = p.sstep(0.035, 0.012, du)
    col = p.mix(p.mul(mid, 0.7), col, (0.88, 0.85, 0.55))
    edge = p.sstep(0.36, 0.5, du)
    col = p.mix(p.mul(edge, 0.75), col, (0.42, 0.25, 0.1))
    tip = p.sstep(0.82, 1.0, v)
    col = p.mix(p.mul(tip, 0.6), col, (0.45, 0.3, 0.12))
    base = p.sstep(0.15, 0.0, v)
    col = p.mix(p.mul(base, 0.5), col, (0.22, 0.28, 0.1))
    h = p.add(p.mul(veins, 0.2), p.mul(p.math("SUBTRACT", 1, mid), 0.5))
    return p.done(col, (0, 0.05, 0), p.bump(h, 0.4, 0.002))


def mat_cloth(name="gob_cloth", c1=(0.55, 0.25, 0.17), c2=(0.3, 0.12, 0.1)):
    p = M.pm(name)
    co = p.co("Object")
    x, y, z = p.xyz(co)
    wx = p.wave(co, 260.0, 0.0, 0.0, "BANDS", "X", "SIN")
    wz = p.wave(co, 260.0, 0.0, 0.0, "BANDS", "Z", "SIN")
    weave = p.mul(wx, wz)
    n = p.noise(p.vec("SCALE", co, None, 18), 1.0, 4)
    col = p.mix(n, c2, c1)
    col = p.mix(p.mul(weave, 0.18), col, (0.9, 0.75, 0.6))
    dirt = p.sstep(0.36, 0.22, z)
    col = p.mix(p.mul(dirt, 0.5), col, (0.25, 0.18, 0.1))
    return p.done(col, (0, 0, 0), p.bump(p.add(weave, p.mul(n, 0.5)), 0.4, 0.0015))


def mat_bamboo(name="gob_bamboo", c=(0.66, 0.6, 0.3), nodes_z=()):
    p = M.pm(name)
    co = p.co("Object")
    x, y, z = p.xyz(co)
    fib = p.noise(p.vec("MULTIPLY", co, (300, 300, 6)), 1.0, 3)
    col = p.mix(fib, p.rgb(c[0] * 0.75, c[1] * 0.72, c[2] * 0.6), c)
    mott = p.noise(p.vec("SCALE", co, None, 12), 1.0, 2)
    col = p.mix(p.mul(p.sstep(0.55, 0.7, mott), 0.5), col, (0.45, 0.38, 0.18))
    nd = 0.0
    for nz in nodes_z:
        nd = p.math("MAXIMUM", nd, p.sstep(0.012, 0.0, p.math("ABSOLUTE", p.math("SUBTRACT", z, nz))))
    col = p.mix(p.mul(nd, 0.8), col, (0.3, 0.24, 0.1))
    tipc = p.sstep(0.86, 0.95, z)
    col = p.mix(tipc, col, (0.86, 0.8, 0.6))
    return p.done(col, (0, 0.25, 0), p.bump(p.add(fib, p.mul(nd, 2.0)), 0.3, 0.0015))


def mat_flat(name, col, mask=(0, 0, 0), rough=0.5):
    p = M.pm(name)
    co = p.co("Object")
    n = p.noise(p.vec("SCALE", co, None, 40), 1.0, 3)
    c = p.mix(p.mul(n, 0.25), col, p.rgb(*[x * 0.7 for x in col]))
    return p.done(c, mask, None, rough=rough)


def cloth_strip(name, top_c, down, side, width, length, jag=5, seg=4, thick=0.004, flare=1.25, bulge=V((0, 0, 0))):
    bm = bmesh.new()
    rows = []
    for i in range(seg + 1):
        t = i / seg
        w = width * (1 + (flare - 1) * t)
        c = V(top_c) + V(down) * (t * length) + bulge * math.sin(t * math.pi)
        row = []
        for j in range(jag * 2 + 1):
            u = j / (jag * 2) - 0.5
            jg = (0.12 * length * (j % 2)) * (i == seg)
            row.append(bm.verts.new(c + V(side) * (u * w) - V(down) * jg))
        rows.append(row)
    for a, b in zip(rows[:-1], rows[1:]):
        for j in range(len(a) - 1):
            bm.faces.new((a[j], a[j + 1], b[j + 1], b[j]))
    o = M.from_bm(bm, name)
    m = o.modifiers.new("sol", "SOLIDIFY")
    m.thickness = thick
    M.apply_mods(o)
    M.smooth(o)
    return o


def leaf_ring(prefix, center, rx, ry, n, length, width, down, out, phase=0.0, curl=0.2, skip_front=0.0, seed=1,
              notch=0.0, seg=3, thick=0.003):
    rng = M.rnd(seed)
    res = []
    for i in range(n):
        a = phase + math.tau * i / n
        if skip_front and abs(math.atan2(math.sin(a + math.pi / 2), math.cos(a + math.pi / 2))) < skip_front:
            continue
        dirv = V((math.cos(a) * out, math.sin(a) * out, -down)).normalized()
        loc = V(center) + V((math.cos(a) * rx, math.sin(a) * ry, 0))
        L = length * rng.uniform(0.85, 1.15)
        o = M.leaf(f"{prefix}{i}", L, width * rng.uniform(0.85, 1.15), loc, dirv,
                   up=(math.cos(a), math.sin(a), 0.0), curl=-curl * rng.uniform(0.6, 1.3), seg=seg, thick=thick,
                   notch=notch)
        res.append(o)
    return res


def hand(S, J, k, claw_mat, skin):
    k = k * 1.3
    sd = 1 if S == "L" else -1
    w = J[f"wrist{S}"]
    d = (w - J[f"elbow{S}"]).normalized()
    palm = M.uv_sphere(f"palm{S}", 1.0, 10, 7, w + d * 0.022 * k, (0.024 * k, 0.018 * k, 0.026 * k))
    parts = [B.Piece(palm, skin, "skin", bone=f"hand{S}")]
    side = V((1, 0, 0)) * sd
    fwd = V((0, -1, 0))
    for i, off in enumerate((-0.012, 0.0, 0.012)):
        base = w + d * 0.038 * k + fwd * off * k * 1.2 + side * 0.002
        pts = [base, base + d * 0.022 * k + fwd * 0.004 * k, base + d * 0.038 * k + fwd * -0.006 * k - side * 0.008 * k]
        f = M.tube(f"fing{S}{i}", pts, [0.0085 * k, 0.007 * k, 0.005 * k], 6)
        parts.append(B.Piece(f, skin, "skin", bone=f"hand{S}"))
        cl = M.cone(f"claw{S}{i}", 0.005 * k, 0.0005 * k, 0.014 * k, 5, pts[-1], (pts[-1] - pts[-2]).normalized())
        parts.append(B.Piece(cl, claw_mat, "skin", bone=f"hand{S}"))
    th = w + d * 0.02 * k - side * 0.016 * k - fwd * 0.004
    t = M.tube(f"thumb{S}", [th, th + d * 0.012 * k - side * 0.012 * k + fwd * 0.012 * k], [0.008 * k, 0.006 * k], 6)
    parts.append(B.Piece(t, skin, "skin", bone=f"hand{S}"))
    return parts


def feet_claws(S, J, k, claw_mat):
    sd = 1 if S == "L" else -1
    t = J[f"toe{S}"]
    out = []
    for i, dx in enumerate((-0.016, 0.0, 0.016)):
        p = t + V((dx * sd * k, -0.012 * k, -0.004 * k))
        out.append(B.Piece(M.cone(f"tclaw{S}{i}", 0.006 * k, 0.0005 * k, 0.018 * k, 5, p, V((dx * sd, -1, -0.25))),
                           claw_mat, "skin", bone=f"foot{S}"))
    return out


def staff(k, grip, top_z=0.98, bottom_z=0.02, mat_name="gob_bamboo", x_lean=0.0):
    nodes = [bottom_z + (top_z - bottom_z) * f for f in (0.18, 0.4, 0.62, 0.82)]
    a = V((grip.x + x_lean, grip.y - 0.01, bottom_z * k))
    b = V((grip.x - x_lean * 0.3, grip.y + 0.012, top_z * k))
    pts, rad = [], []
    for i in range(25):
        t = i / 24
        z = bottom_z + (top_z - bottom_z) * t
        pts.append(a.lerp(b, t))
        r = 0.0135 * k
        for nz in nodes:
            r += 0.0035 * k * max(0, 1 - abs(z - nz) / 0.012)
        rad.append(r * (1 - 0.85 * max(0, (t - 0.9) / 0.1)) if t < 1 else 0.0012 * k)
    o = M.tube("staff", pts, rad, 8)
    m = mat_bamboo(mat_name, nodes_z=[n * k for n in nodes])
    cord = []
    for j in range(3):
        cz = (top_z - 0.15 - j * 0.02) * k
        t0 = (cz / k - bottom_z) / (top_z - bottom_z)
        c = a.lerp(b, t0)
        cord.append([c + V((math.cos(q) * 0.0165 * k, math.sin(q) * 0.0165 * k, 0)) for q in
                     [i / 16 * math.tau for i in range(17)]])
    return o, m, cord, a, b


def necklace(J, k, rope_mat, bead_mat):
    c = J["neck"] + V((0, -0.006, -0.03)) * k
    pts = [c + V((math.cos(a) * 0.058 * k, math.sin(a) * 0.05 * k - 0.008 * k * max(0, -math.sin(a)),
                  -0.022 * k * max(0, -math.sin(a)))) for a in [i / 24 * math.tau for i in range(25)]]
    out = [B.Piece(M.tube("neck_rope", pts, 0.0035 * k, 5), rope_mat, "cloth", bone="chest")]
    for i in range(7):
        a = -math.pi / 2 + (i - 3) * 0.32
        p = c + V((math.cos(a) * 0.058 * k, math.sin(a) * 0.05 * k - 0.008 * k * max(0, -math.sin(a)),
                   -0.022 * k * max(0, -math.sin(a)) - 0.012 * k))
        L = (0.028 if i % 2 == 0 else 0.02) * k
        bd = M.cone(f"bead{i}", 0.0075 * k, 0.0075 * k, L, 8, p + V((0, 0, 0.006 * k)), V((0, -0.25, -1)))
        out.append(B.Piece(bd, bead_mat, "cloth", bone="chest"))
    return out


CFG = {
    "goblin": dict(k=1.0, hunch=0.0, leaf_green=(0.45, 0.55, 0.2), cloth=((0.55, 0.25, 0.17), (0.3, 0.12, 0.1)),
                   skin=((0.36, 0.46, 0.22), (0.17, 0.24, 0.15), (0.62, 0.66, 0.38))),
}


def build_common(sid, args, cfg, extra=None):
    M.reset()
    k = cfg["k"]
    J = joints(k, cfg["hunch"])
    bl = bones_of(J)
    bones = [b[0] for b in bl] + (cfg.get("extra_bones_names") or [])
    if extra and hasattr(extra, "bones"):
        bl += extra.bones(J, k)
        bones = [b[0] for b in bl]
    skin = mat_skin(f"{sid}_skin", *cfg["skin"], k=k)
    claw = mat_flat(f"{sid}_claw", (0.86, 0.8, 0.64), (0, 0.2, 0))
    pieces = []
    lo, hi = body(J, k)
    pieces.append(B.Piece(lo, skin, "skin", hi))
    ho, hh = head(J, k)
    pieces.append(B.Piece(ho, mat_head(J, sid, cfg["skin"], k), "skin", hh, bone="head"))
    (mo, mh), beak, pupils = mask(J, k)
    bark = mat_bark(J["head"], k)
    pieces.append(B.Piece(mo, bark, "skin", mh, bone="head"))
    pieces.append(B.Piece(beak, bark, "skin", bone="head"))
    pm_p = M.pm(f"{sid}_pupil")
    pm_p.done((1.0, 0.9, 0.55), (1.0, 0.0, 0.6), None, emit=(1, 0.9, 0.5), emit_strength=3)
    for pu in pupils:
        pieces.append(B.Piece(pu, pm_p, "glow", bone="head"))
    for S, sd in (("L", 1), ("R", -1)):
        c = J["head"]
        e = M.leaf(f"ear{S}", 0.21 * k, 0.055 * k, c + V((0.095 * sd, 0.015, 0.015)) * 1, V((sd, 0.35, 0.12)),
                   up=(0, -0.3, 1), curl=0.28, seg=4, thick=0.008 * k, notch=0.25)
        pieces.append(B.Piece(e, skin, "skin", bone=f"ear{S}"))
        pieces += hand(S, J, k, claw, skin)
        pieces += feet_claws(S, J, k, claw)
    for i, sd in enumerate((-1, 1)):
        tooth = M.cone(f"fang{i}", 0.007 * k, 0.0008 * k, 0.018 * k, 5,
                       J["head"] + V((0.03 * sd, -0.128, -0.052)) * k, V((0, -0.2, -1)))
        pieces.append(B.Piece(tooth, claw, "skin", bone="head"))
    leaf_m = mat_leaf(f"{sid}_leaf", cfg["leaf_green"])
    if cfg.get("crown", True):
        hc = J["head"]
        for i, (ang, up, L) in enumerate(((-0.5, 0.9, 0.17), (0.0, 1.0, 0.2), (0.5, 0.9, 0.17), (-0.9, 0.55, 0.13),
                                          (0.9, 0.55, 0.13), (0.0, 0.5, 0.15))):
            d = V((math.sin(ang) * 0.6, 0.55 + 0.3 * (i == 5), up))
            base = hc + V((math.sin(ang) * 0.05, 0.03 + 0.03 * (i == 5), 0.085)) * k
            o = M.leaf(f"crown{i}", L * k, 0.03 * k, base, d, up=(0, -1, 0.3), curl=0.35, seg=4, thick=0.004 * k)
            pieces.append(B.Piece(o, leaf_m, "cloth", bone="head"))
    lm = mat_leaf(f"{sid}_leaf2", tuple(x * 0.85 for x in cfg["leaf_green"]), (0.72, 0.56, 0.26))
    ch = J["chest"]
    mantle = leaf_ring("mant", ch + V((0, 0.0, 0.045)) * 1, 0.07 * k, 0.06 * k, 13, 0.16 * k, 0.034 * k, 0.8, 0.75,
                       phase=0.1, curl=0.25, seed=3, notch=0.2)
    mantle += leaf_ring("mant2", ch + V((0, 0.0, 0.0)), 0.082 * k, 0.07 * k, 11, 0.15 * k, 0.032 * k, 0.9, 0.62,
                        phase=0.4, curl=0.3, seed=4, skip_front=0.55)
    for o in mantle:
        pieces.append(B.Piece(o, leaf_m, "cloth", bone="chest"))
    pel = J["pelvis"]
    skirt = leaf_ring("skirt", pel + V((0, 0.005, 0.03 * k)), 0.075 * k, 0.062 * k, 18, 0.17 * k, 0.018 * k, 1.0, 0.32,
                      phase=0.05, curl=0.12, seed=7, skip_front=0.4, seg=3)
    for o in skirt:
        pieces.append(B.Piece(o, lm, "cloth"))
    clo = mat_cloth(f"{sid}_cloth", *cfg["cloth"])
    front = cloth_strip("loin_f", pel + V((0, -0.07, 0.03)) * 1, (0, -0.12, -1), (1, 0, 0), 0.07 * k, 0.17 * k,
                        bulge=V((0, -0.01, 0)))
    back = cloth_strip("loin_b", pel + V((0, 0.068, 0.03)) * 1, (0, 0.1, -1), (1, 0, 0), 0.08 * k, 0.15 * k)
    sash = cloth_strip("sash", ch + V((0.06, -0.06, 0.03)) * 1, (-0.7, -0.08, -0.7), (0.5, 0.0, -0.5), 0.03 * k,
                       0.16 * k, jag=2, flare=1.0)
    for o in (front, back, sash):
        pieces.append(B.Piece(o, clo, "cloth"))
    rope = mat_flat(f"{sid}_rope", (0.62, 0.5, 0.3), (0, 0.05, 0))
    belt = [pel + V((math.cos(a) * 0.08 * k, math.sin(a) * 0.066 * k, 0.03 * k + 0.004 * math.sin(3 * a)))
            for a in [i / 28 * math.tau for i in range(29)]]
    pieces.append(B.Piece(M.tube("belt", belt, 0.0075 * k, 6), rope, "cloth", bone="hips"))
    bead = mat_bamboo(f"{sid}_bead", (0.75, 0.65, 0.34))
    pieces += necklace(J, k, rope, bead)
    if extra:
        pieces += extra.pieces(J, k, sid, rope, bones)
    else:
        so, sm, cords, a, b = staff(k, J["wristR"] + V((0, -0.035, 0)))
        pieces.append(B.Piece(so, sm, "cloth", bone="weapon"))
        for j, cp in enumerate(cords):
            pieces.append(B.Piece(M.tube(f"cord{j}", cp, 0.0032 * k, 5), rope, "cloth", bone="weapon"))
        tas = M.leaf("tassel", 0.09 * k, 0.016 * k, b - V((0, 0, 0.14 * k)), V((0.3, 0.4, -1)), curl=0.2, seg=3)
        pieces.append(B.Piece(tas, leaf_m, "cloth", bone="weapon"))
    if "weapon" not in bones:
        hR = J["wristR"]
        bl.append(("weapon", hR + V((0, -0.035, 0)), hR + V((0, -0.035, 0.12)), "handR"))
        bones.append("weapon")
    low, highs, maps = B.assemble(sid, pieces, 1024, {"skin": 1.3}, extrusion=0.006 * k, ray=0.015 * k, ao=True,
                                  bones=bones)
    print(f"[s29] {sid} tris", M.tris(low))
    B.hide_highs(highs)
    arm = M.armature(f"{sid}_rig", bl)
    arm.data.bones["root"].use_deform = False
    battr = low.data.attributes["bone"]
    body_bones = [b for b in bones if b not in ("root", "weapon") and not b.startswith("ear")]

    def rigid(i, co):
        v = battr.data[i].value
        return bones[v - 1] if v else None

    M.weight_by_distance(low, arm, allow=lambda co, i: body_bones, rigid=rigid, power=5.0)
    M.split_materials(low, maps)
    l1 = B.lod(low, 0.35, f"{sid}_lod1")
    import importlib
    an = importlib.import_module(f"anim_{sid}") if importlib.util.find_spec(f"anim_{sid}") else importlib.import_module("anim_goblin")
    an.make(arm, J, k)
    B.save(sid, [arm, low, l1], highs)


def build(args):
    build_common("goblin", args, CFG["goblin"])
