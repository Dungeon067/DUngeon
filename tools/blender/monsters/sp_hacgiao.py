"""Hắc Giao (boss): rồng nước thân dài kết từ Nguyện Cặn. Vảy cá đen ánh lam ướt, bụng tấm bạc xám,
vây lưng và đuôi quạt lam lân tinh trong mờ, sừng cong ngả sau, râu dài, mắt bạc đục phát sáng,
đốm lân quang dọc thân. Mặt nạ B = vết nứt tím giai đoạn 2. Đầu hướng -Y, thân kéo về +Y."""
import math

import bmesh
from mathutils import Vector

import build as B
import mlib as M

V = Vector
L = 6.0
ZC = 0.75
NS = 20
NA, NL = 52, 264
SCALES_AROUND = 22
HS = 1.35
PIV = V((0, 0.32, ZC))


def hs(v):
    return PIV + (V(v) - PIV) * HS


def r_at(t):
    return (0.28 + 0.2 * M_s(0.0, 0.16, t)) * (1 - 0.9 * t ** 1.4) + 0.012


def M_s(a, b, x):
    x = min(1.0, max(0.0, (x - a) / (b - a)))
    return x * x * (3 - 2 * x)


def sect(t, a):
    r = r_at(t)
    s, c = math.sin(a), math.cos(a)
    z = s * r * (0.74 if s < 0 else 1.0) + r * 0.14 * math.exp(-((a - math.pi / 2) / 0.3) ** 2)
    return V((c * r * 1.04, 0.3 + t * L, ZC + z))


def body():
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    S = [0.0]
    for i in range(1, NL + 1):
        t = i / NL
        S.append(S[-1] + (L / NL) / (math.tau * r_at(t) / SCALES_AROUND))
    rows = []
    for i in range(NL + 1):
        t = i / NL
        rows.append([bm.verts.new(sect(t, -math.pi / 2 + math.tau * j / NA)) for j in range(NA)])
    for i in range(NL):
        for j in range(NA):
            j2 = (j + 1) % NA
            f = bm.faces.new((rows[i][j], rows[i][j2], rows[i + 1][j2], rows[i + 1][j]))
            for lp, (uu, vv) in zip(f.loops, ((j, i), (j + 1, i), (j + 1, i + 1), (j, i + 1))):
                lp[uvl].uv = (uu / NA, S[vv])
    for r_, rev in ((rows[0], True), (rows[-1], False)):
        c = sum((v.co for v in r_), V()) / NA + V((0, -0.05 if rev else 0.03, 0))
        cv = bm.verts.new(c)
        for j in range(NA):
            q = (r_[j], r_[(j + 1) % NA], cv)
            f = bm.faces.new(q[::-1] if rev else q)
            for lp in f.loops:
                lp[uvl].uv = (0.0, 0.0 if rev else S[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = M.from_bm(bm, "gi_body")
    M.smooth(o)
    hi = M.dup(o, "gi_body_hi")
    M.subsurf(hi, 1)
    return o, hi


def mat_body():
    p = M.pm("gi_body")
    uv = p.co("UV")
    u, v, _ = p.xyz(uv)
    co = p.co("Object")
    x, y, z = p.xyz(co)
    t = p.remap(y, 0.3, 0.3 + L, 0.0, 1.0)
    sx = p.mul(u, float(SCALES_AROUND))
    row = p.math("FLOOR", v)
    off = p.mul(p.math("MODULO", row, 2.0), 0.5)
    lx = p.math("SUBTRACT", p.math("FRACT", p.add(sx, off)), 0.5)
    fy = p.math("FRACT", v)
    d = p.vec("LENGTH", p.comb(lx, p.mul(fy, 0.95), 0.0))
    d2 = p.vec("LENGTH", p.comb(p.math("SUBTRACT", p.math("FRACT", p.add(sx, p.math("SUBTRACT", 0.5, off))), 0.5),
                                p.math("SUBTRACT", fy, 1.0), 0.0))
    dd = p.math("MINIMUM", d, p.math("MAXIMUM", d2, 0.0))
    own = p.math("LESS_THAN", d, d2)
    dm = p.mix(own, d2, d)
    dome = p.sstep(0.72, 0.1, dm)
    rim = p.mul(p.sstep(0.6, 0.7, dm), p.sstep(0.78, 0.7, dm))
    bu = p.math("MINIMUM", u, p.math("SUBTRACT", 1.0, u))
    belly = p.sstep(0.15, 0.11, bu)
    side = p.sstep(0.12, 0.35, bu)
    top = p.sstep(0.32, 0.5, bu)
    c_top = p.mix(p.noise(p.vec("SCALE", co, None, 1.5), 1.0, 2), (0.02, 0.04, 0.075), (0.045, 0.08, 0.13))
    col = p.mix(p.math("SUBTRACT", 1, top), c_top, (0.05, 0.15, 0.21))
    col = p.mix(p.mul(dome, 0.55), p.mul(col, 0.7), col)
    col = p.mix(p.mul(rim, 0.8), col, (0.14, 0.42, 0.52))
    sheen = p.mul(p.sstep(0.35, 0.95, dome), p.mul(p.noise(p.vec("SCALE", co, None, 3.0), 1.0, 2), side))
    col = p.mix(p.mul(sheen, 0.35), col, (0.15, 0.4, 0.5))
    plate = p.math("FRACT", p.mul(v, 0.55))
    pe = p.mul(p.sstep(0.0, 0.08, plate), p.sstep(1.0, 0.82, plate))
    bc = p.mix(pe, (0.22, 0.27, 0.32), p.mix(p.remap(bu, 0.0, 0.11, 0.0, 1.0), (0.62, 0.68, 0.7), (0.42, 0.5, 0.55)))
    scr = p.noise(p.vec("MULTIPLY", co, (40, 3, 40)), 1.0, 3)
    bc = p.mix(p.mul(p.sstep(0.62, 0.7, scr), 0.4), bc, (0.3, 0.33, 0.36))
    col = p.mix(belly, col, bc)
    lat = p.math("ABSOLUTE", p.math("SUBTRACT", bu, 0.27))
    spot = p.vec("LENGTH", p.comb(p.mul(lat, 18.0), p.mul(p.math("SUBTRACT", p.math("FRACT", p.mul(v, 0.25)), 0.5), 1.2), 0))
    glow = p.mul(p.sstep(0.45, 0.25, spot), p.sstep(0.97, 0.9, t))
    col = p.mix(glow, col, (0.55, 0.95, 1.0))
    cr = p.voronoi(p.vec("MULTIPLY", co, (2.2, 0.9, 2.2)), 1.0, "DISTANCE_TO_EDGE")
    crn = p.noise(p.vec("SCALE", co, None, 0.9), 1.0, 2)
    crack = p.mul(p.mul(p.sstep(0.05, 0.0, cr), p.sstep(0.42, 0.55, crn)), p.math("SUBTRACT", 1, belly))
    col = p.mix(p.mul(crack, 0.5), col, (0.08, 0.03, 0.12))
    h = p.add(p.mul(dome, p.math("SUBTRACT", 1, belly)), p.mul(pe, belly))
    h = p.math("SUBTRACT", h, p.mul(crack, 0.6))
    gl = p.add(p.mul(dome, 0.6), 0.3)
    return p.done(col, p.comb(glow, gl, crack), p.bump(h, 0.7, 0.01))


def head():
    rings = []
    n = 28
    HL = 1.45
    for i in range(23):
        t = i / 22
        y = 0.4 - HL * t
        w = 0.31 * (1 - t) + 0.13 * t + 0.07 * math.exp(-((t - 0.22) / 0.13) ** 2)
        top = 0.25 - 0.13 * t + 0.07 * math.exp(-((t - 0.42) / 0.09) ** 2)
        bot = 0.1 - 0.03 * t
        if t > 0.96:
            k = (t - 0.96) / 0.04
            w, top, bot = w * (1 - 0.6 * k), top * (1 - 0.5 * k), bot * (1 - 0.4 * k)
        pts = []
        for j in range(n):
            a = -math.pi / 2 + math.tau * j / n
            c, s = math.cos(a), math.sin(a)
            xx = w * math.copysign(abs(c) ** 0.75, c)
            zz = (top if s > 0 else bot) * math.copysign(abs(s) ** (0.8 if s > 0 else 0.5), s)
            brow = 0.05 * math.exp(-((t - 0.45) / 0.1) ** 2) * math.exp(-((abs(c) - 0.55) / 0.2) ** 2) * (s > 0.2)
            pts.append(V((xx * (1 + 0.1 * brow / 0.05 * 0), y, ZC + 0.08 + zz + brow)))
        rings.append(pts)
    o = M.loft("gi_head", rings)
    M.subsurf(o, 1)
    M.smooth(o)
    hi = M.dup(o, "gi_head_hi")
    M.subsurf(hi, 1)
    M.noise_verts(hi, 0.004, 9, 3)
    return o, hi, HL


def jaw():
    rings = []
    n = 20
    for i in range(17):
        t = i / 16
        y = 0.25 - 1.22 * t
        w = 0.25 * (1 - t) + 0.11 * t
        dep = 0.17 * (1 - t) + 0.06 * t
        pts = []
        for j in range(n):
            a = -math.pi / 2 + math.tau * j / n
            c, s = math.cos(a), math.sin(a)
            zz = (0.015 if s > 0 else dep) * math.copysign(abs(s) ** 0.6, s)
            pts.append(V((w * math.copysign(abs(c) ** 0.8, c), y, ZC - 0.04 + zz)))
        rings.append(pts)
    o = M.loft("gi_jaw", rings)
    M.subsurf(o, 1)
    M.smooth(o)
    hi = M.dup(o, "gi_jaw_hi")
    M.subsurf(hi, 1)
    return o, hi


def mat_head(name):
    p = M.pm(name)
    co = p.co("Object")
    x, y, z = p.xyz(co)
    nz = p.geo("Normal")
    _, _, nzz = p.xyz(nz)
    vor = p.voronoi(p.vec("MULTIPLY", co, (26, 14, 26)), 1.0, "F1")
    edge = p.voronoi(p.vec("MULTIPLY", co, (26, 14, 26)), 1.0, "DISTANCE_TO_EDGE")
    dome = p.sstep(0.55, 0.05, vor)
    col = p.mix(p.sstep(0.0, 0.6, nzz), (0.05, 0.14, 0.2), (0.02, 0.04, 0.075))
    col = p.mix(p.mul(dome, 0.5), p.mul(col, 0.65), col)
    col = p.mix(p.mul(p.sstep(0.06, 0.0, edge), 0.6), col, (0.1, 0.3, 0.38))
    under = p.sstep(-0.3, -0.7, nzz)
    col = p.mix(under, col, (0.5, 0.57, 0.6))
    mouth = p.mul(p.sstep(0.45, 0.8, p.math("ABSOLUTE", nzz)), p.sstep(ZC + 0.02, ZC - 0.01, z))
    mouth = p.mul(mouth, p.sstep(ZC - 0.07, ZC - 0.04, z))
    col = p.mix(mouth, col, (0.22, 0.04, 0.08))
    cr = p.voronoi(p.vec("MULTIPLY", co, (3, 2, 3)), 1.0, "DISTANCE_TO_EDGE")
    crack = p.mul(p.sstep(0.04, 0.0, cr), p.sstep(0.6, 0.0, under))
    h = p.add(dome, p.mul(p.sstep(0.0, 0.06, edge), 0.5))
    return p.done(col, p.comb(0.0, p.add(p.mul(dome, 0.6), 0.3), crack), p.bump(h, 0.6, 0.006))


def mat_fin(name, base=(0.12, 0.55, 0.75), edge=(0.6, 1.0, 1.0)):
    p = M.pm(name)
    uv = p.co("UV")
    u, v, _ = p.xyz(uv)
    ray = p.math("ABSOLUTE", p.math("SINE", p.mul(u, math.pi)))
    rays = p.sstep(0.88, 0.98, ray)
    col = p.mix(v, (0.03, 0.14, 0.24), base)
    col = p.mix(p.mul(rays, 0.7), col, (0.05, 0.2, 0.3))
    ed = p.sstep(0.75, 1.0, v)
    col = p.mix(ed, col, edge)
    vein = p.noise(p.vec("MULTIPLY", p.comb(u, v, 0), (4, 30, 1)), 1.0, 3)
    col = p.mix(p.mul(p.sstep(0.6, 0.7, vein), 0.25), col, edge)
    glow = p.math("MAXIMUM", p.mul(ed, 0.9), p.mul(p.math("SUBTRACT", 1, rays), p.mul(v, 0.45)))
    return p.done(col, p.comb(glow, 0.6, 0.0), p.bump(rays, 0.4, 0.004), alpha=0.6)


def mat_simple(name, col, mask=(0, 0.3, 0), noise=0.25):
    p = M.pm(name)
    co = p.co("Object")
    n = p.noise(p.vec("SCALE", co, None, 30), 1.0, 3)
    c = p.mix(p.mul(n, noise), col, tuple(x * 0.6 for x in col))
    return p.done(c, mask, None)


def mat_horn():
    p = M.pm("gi_horn")
    uv = p.co("UV")
    co = p.co("Object")
    _, v, _ = p.xyz(uv)
    ridge = p.math("ABSOLUTE", p.math("SINE", p.mul(v, 60.0)))
    col = p.mix(v, (0.12, 0.14, 0.18), (0.78, 0.82, 0.8))
    col = p.mix(p.mul(p.sstep(0.9, 1.0, ridge), 0.4), col, (0.05, 0.06, 0.08))
    n = p.noise(p.vec("SCALE", co, None, 50), 1.0, 3)
    col = p.mix(p.mul(n, 0.2), col, (0.3, 0.32, 0.35))
    return p.done(col, (0, 0.5, 0), p.bump(ridge, 0.5, 0.004))


def fin_strip(name, base_pts, tip_pts, thick=0.012):
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    rows = [[bm.verts.new(b.lerp(t, f)) for b, t in zip(base_pts, tip_pts)] for f in (0.0, 0.5, 1.0)]
    n = len(base_pts)
    for r in range(2):
        for i in range(n - 1):
            f = bm.faces.new((rows[r][i], rows[r][i + 1], rows[r + 1][i + 1], rows[r + 1][i]))
            for lp, (a, b) in zip(f.loops, ((i, r), (i + 1, r), (i + 1, r + 1), (i, r + 1))):
                lp[uvl].uv = (a / (n - 1) * (n - 1) / 6.0, b / 2)
    o = M.from_bm(bm, name)
    m = o.modifiers.new("sol", "SOLIDIFY")
    m.thickness = thick
    m.offset = 0
    M.apply_mods(o)
    M.smooth(o)
    return o


def fan(name, origin, axis, up, radius, a0, a1, n=24, rays=9, scallop=0.12):
    axis, up = V(axis).normalized(), V(up).normalized()
    base, tip = [], []
    for i in range(n + 1):
        a = a0 + (a1 - a0) * i / n
        d = axis * math.cos(a) + up * math.sin(a)
        ph = i / n * rays
        r = radius * (1 - scallop * (1 - abs(math.cos(math.pi * ph))) ** 2)
        base.append(V(origin) + d * radius * 0.08)
        tip.append(V(origin) + d * r)
    return fin_strip(name, base, tip, 0.01)


def build(args):
    M.reset()
    bones = ["root"] + [f"sp{i}" for i in range(NS)] + ["head", "jaw"] + \
            [f"wh{S}{i}" for S in "LR" for i in range(3)] + ["finL1", "finR1", "finL2", "finR2", "tailfin"]
    pieces = []
    bo, bh = body()
    pieces.append(B.Piece(bo, mat_body(), "skin", bh))
    ho, hh, HL = head()
    mh = mat_head("gi_head")
    pieces.append(B.Piece(ho, mh, "skin", hh, bone="head"))
    jo, jh = jaw()
    pieces.append(B.Piece(jo, mat_head("gi_jaw"), "skin", jh, bone="jaw"))
    tooth = mat_simple("gi_tooth", (0.85, 0.86, 0.8), (0, 0.4, 0), 0.15)
    for S, sd in (("L", 1), ("R", -1)):
        for i in range(10):
            t = 0.3 + 0.068 * i
            y = 0.4 - HL * t
            w = (0.31 * (1 - t) + 0.13 * t) * 0.86
            Lt = 0.05 + 0.04 * (i in (7, 8))
            pieces.append(B.Piece(M.cone(f"tu{S}{i}", 0.018, 0.001, Lt, 6, (sd * w, y, ZC + 0.03), V((0, 0, -1))),
                                  tooth, "skin", bone="head"))
            tj = (0.25 - y) / 1.22
            if 0.05 < tj < 0.95:
                wj = (0.25 * (1 - tj) + 0.11 * tj) * 0.8
                pieces.append(B.Piece(M.cone(f"tl{S}{i}", 0.015, 0.001, 0.045, 6, (sd * wj, y + 0.03, ZC - 0.03),
                                             V((0, 0, 1))), tooth, "skin", bone="jaw"))
    eye_m = M.pm("gi_eye")
    eye_m.done((0.85, 0.95, 1.0), (1.0, 0.9, 0.0), None, emit=(0.8, 0.95, 1), emit_strength=4)
    horn = mat_horn()
    for S, sd in (("L", 1), ("R", -1)):
        t = 0.47
        y = 0.4 - HL * t
        w = 0.31 * (1 - t) + 0.13 * t + 0.07 * math.exp(-((t - 0.22) / 0.13) ** 2)
        e = M.uv_sphere(f"eye{S}", 1.0, 14, 10, (sd * w * 0.9, y, ZC + 0.08 + 0.12), (0.05, 0.095, 0.04))
        e.rotation_euler = (0, 0, sd * -0.35)
        pieces.append(B.Piece(e, eye_m, "glow", bone="head"))
        pts = []
        for i in range(12):
            q = i / 11
            pts.append(V((sd * (0.13 + 0.22 * q + 0.05 * math.sin(q * 3)), 0.12 + 0.95 * q, ZC + 0.36 + 0.35 * math.sin(q * 2.2) - 0.25 * q * q)))
        h = M.tube(f"horn{S}", pts, [0.065 * (1 - q / 12) ** 1.2 + 0.004 for q in range(12)], 10)
        uvl = h.data.uv_layers.new(name="UVMap")
        for poly in h.data.polygons:
            for li in poly.loop_indices:
                vi = h.data.loops[li].vertex_index
                uvl.data[li].uv = (0.0, (vi // 10) / 11.0)
        pieces.append(B.Piece(h, horn, "skin", bone="head"))
        wp = []
        for i in range(14):
            q = i / 13
            wp.append(V((sd * (0.15 + 0.35 * q + 0.1 * math.sin(q * 5)), -0.85 + 1.9 * q, ZC + 0.02 - 0.25 * q + 0.08 * math.sin(q * 7))))
        wh = M.tube(f"wh{S}", wp, [0.024 * (1 - q / 14) + 0.004 for q in range(14)], 7)
        M.set_attr(wh, "grp", 1 if S == "L" else 2)
        pieces.append(B.Piece(wh, horn, "skin"))
        fr = fan(f"frill{S}", (sd * 0.25, 0.25, ZC + 0.1), (sd * 0.55, 1, 0.1), (0, 0, 1), 0.55, -0.6, 0.9, 18, 6)
        pieces.append(B.Piece(fr, mat_fin("gi_frill"), "fin", bone="head"))
        for j, (tt, rad) in enumerate(((0.1, 0.75), (0.34, 0.55))):
            o = sect(tt, 0.0 if sd > 0 else math.pi)
            fn = fan(f"pfin{S}{j}", o, (sd * 0.7, 0.8, -0.6), (0, 1, 0.15), rad, -0.35, 0.95, 18, 6, 0.18)
            pieces.append(B.Piece(fn, M.ALL_PM[-1], "fin", bone=f"fin{S}{j + 1}"))
    for sd in (-1, 1):
        nst = M.uv_sphere(f"nost{sd}", 0.035, 8, 6, (sd * 0.08, -0.98, ZC + 0.18), (1, 1.4, 0.7))
        pieces.append(B.Piece(nst, mh, "skin", bone="head"))
    base, tip = [], []
    for i in range(121):
        t = 0.02 + 0.93 * i / 120
        b = sect(t, math.pi / 2)
        b.z -= 0.02
        H = (0.42 * M_s(0.0, 0.08, t) * (1 - 0.6 * t)) + 0.05
        ph = i / 120 * 34
        hh_ = H * (0.72 + 0.28 * abs(math.cos(math.pi * ph)) ** 3)
        base.append(b)
        tip.append(b + V((0, 0.35 * hh_, hh_)))
    dfin = fin_strip("dfin", base, tip)
    M.set_attr(dfin, "grp", 3)
    pieces.append(B.Piece(dfin, mat_fin("gi_dfin"), "fin"))
    tail_o = sect(1.0, 0) * 0 + V((0, 0.3 + L - 0.02, ZC))
    tf = fan("tailfan", tail_o, (0, 1, 0), (0, 0, 1), 1.0, -1.2, 1.2, 28, 11, 0.16)
    pieces.append(B.Piece(tf, mat_fin("gi_tail"), "fin", bone="tailfin"))
    import bpy
    from mathutils import Matrix
    bpy.context.view_layer.update()
    mt = Matrix.Translation(PIV) @ Matrix.Scale(HS, 4) @ Matrix.Translation(-PIV)
    seen = set()
    for pc in pieces:
        if pc.bone in ("head", "jaw") or pc.low.name.startswith("wh"):
            for ob in (pc.low, pc.high):
                if ob is not None and ob.data.name not in seen:
                    seen.add(ob.data.name)
                    ob.data.transform(ob.matrix_world.inverted() @ mt @ ob.matrix_world)
    low, highs, maps = B.assemble("hacgiao", pieces, 2048, {"glow": 1.5}, extrusion=0.02, ray=0.05, ao=True,
                                  bones=bones, ao_strength=0.35)
    print("[s29] hacgiao tris", M.tris(low))
    B.hide_highs(highs)
    bl = [("root", (0, 0, 0), (0, 0, 0.3), None)]
    prev = "root"
    for i in range(NS):
        y0 = 0.3 + L * i / NS
        bl.append((f"sp{i}", (0, y0, ZC), (0, y0 + L / NS, ZC), prev))
        prev = f"sp{i}"
    bl += [("head", hs((0, 0.3, ZC + 0.05)), hs((0, -0.6, ZC + 0.05)), "sp0"),
           ("jaw", hs((0, 0.2, ZC - 0.04)), hs((0, -0.8, ZC - 0.04)), "head")]
    for S, sd in (("L", 1), ("R", -1)):
        par = "head"
        for i in range(3):
            q0, q1 = i / 3, (i + 1) / 3
            p0 = V((sd * (0.15 + 0.35 * q0), -0.85 + 1.9 * q0, ZC + 0.02 - 0.25 * q0))
            p1 = V((sd * (0.15 + 0.35 * q1), -0.85 + 1.9 * q1, ZC + 0.02 - 0.25 * q1))
            bl.append((f"wh{S}{i}", hs(p0), hs(p1), par))
            par = f"wh{S}{i}"
        for j, tt in enumerate((0.1, 0.34)):
            o = sect(tt, 0.0 if sd > 0 else math.pi)
            bl.append((f"fin{S}{j + 1}", o, o + V((sd * 0.4, 0.3, -0.2)), f"sp{int(tt * NS)}"))
    bl.append(("tailfin", (0, 0.3 + L - 0.25, ZC), (0, 0.3 + L + 0.5, ZC), f"sp{NS - 1}"))
    arm = M.armature("hacgiao_rig", bl)
    arm.data.bones["root"].use_deform = False
    battr = low.data.attributes["bone"]
    gattr = low.data.attributes.get("grp")
    spine = [f"sp{i}" for i in range(NS)]

    def allow(co, i):
        g = gattr.data[i].value if gattr else 0
        if g == 1:
            return ["head", "whL0", "whL1", "whL2"]
        if g == 2:
            return ["head", "whR0", "whR1", "whR2"]
        return spine

    def rigid(i, co):
        v = battr.data[i].value
        return bones[v - 1] if v else None

    M.weight_by_distance(low, arm, allow=allow, rigid=rigid, power=3.0, max_inf=3)
    M.split_materials(low, maps)
    l1 = B.lod(low, 0.3, "hacgiao_lod1")
    import anim_hacgiao
    anim_hacgiao.make(arm)
    B.save("hacgiao", [arm, low, l1], highs)
