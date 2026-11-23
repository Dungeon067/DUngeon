"""Giọt Nhầy (slime): khối thạch trong mờ hình giọt mochi, lõi hạt nguyện phát sáng, bọt khí, mắt to bóng.
Toàn thân nhuộm theo nguyên tố (mặt nạ B), lõi phát sáng theo nguyên tố (mặt nạ R)."""
import math

from mathutils import Vector

import build as B
import mlib as M

H = 0.6
PROF = [(0.0, 0.25), (0.02, 0.33), (0.06, 0.375), (0.13, 0.395), (0.21, 0.39), (0.3, 0.36), (0.38, 0.3),
        (0.44, 0.225), (0.49, 0.15), (0.53, 0.09), (0.56, 0.048), (0.585, 0.02), (0.6, 0.004)]
SQ = 0.9  # độ dẹt trước sau


def r_at(z):
    for (z0, r0), (z1, r1) in zip(PROF[:-1], PROF[1:]):
        if z0 <= z <= z1:
            t = (z - z0) / (z1 - z0)
            return r0 + (r1 - r0) * t
    return 0.0


def body():
    rings = []
    for z, r in PROF:
        s = z / H
        c = Vector((0, -0.09 * s ** 4, z + 0.03 * s ** 6))
        lobes = lambda a, z=z: 1 + (0.055 * max(0.0, math.cos(5 * a + 0.7)) ** 2 if z < 0.08 else 0.0)
        pts = M.ring(c, (Vector((1, 0, 0)), Vector((0, SQ, 0))), r, r, 32, lobes)
        rings.append(pts)
    o = M.loft("slime_body", rings)
    M.smooth(o)
    hi = M.dup(o, "slime_body_hi")
    M.subsurf(hi, 3)
    M.noise_verts(hi, 0.006, 9, 3)
    M.subsurf(o, 1)
    return o, hi


def mat_body():
    p = M.pm("jelly")
    co = p.co("Object")
    x, y, z = p.xyz(co)
    h = p.math("DIVIDE", z, H)
    L = p.remap(h, 0.0, 1.0, 0.32, 0.86)
    sw = p.noise(p.vec("MULTIPLY", co, (5, 5, 3.5)), 1.0, 3, 0.5, distort=1.6)
    L = p.add(L, p.mul(p.math("SUBTRACT", sw, 0.5), 0.22))
    caust = p.voronoi(co, 9.0, "DISTANCE_TO_EDGE")
    L = p.add(L, p.mul(p.sstep(0.035, 0.0, caust), 0.12))
    hl = p.vec("DISTANCE", co, (-0.12, -0.2, 0.47))
    L = p.math("MAXIMUM", L, p.mul(p.sstep(0.115, 0.06, hl), 1.05))
    hl2 = p.vec("DISTANCE", co, (-0.21, -0.17, 0.36))
    L = p.math("MAXIMUM", L, p.mul(p.sstep(0.04, 0.022, hl2), 1.0))
    rim = p.sstep(0.06, 0.0, z)
    L = p.math("SUBTRACT", L, p.mul(rim, 0.18))
    col = p.comb(L, L, L)
    bl = p.math("MAXIMUM", p.sstep(0.075, 0.045, p.vec("DISTANCE", p.vec("MULTIPLY", co, (1, 1, 1.4)), (0.205, -0.31, 0.3))),
                p.sstep(0.075, 0.045, p.vec("DISTANCE", p.vec("MULTIPLY", co, (1, 1, 1.4)), (-0.205, -0.31, 0.3))))
    col = p.mix(p.mul(bl, 0.85), col, (1.0, 0.62, 0.7))
    tint = p.math("SUBTRACT", 1.0, bl)
    mask = p.comb(p.mul(tint, p.remap(z, 0.05, 0.4, 0.22, 0.05)), 0.9, tint)
    n = p.bump(p.noise(co, 14, 3), 0.15, 0.01)
    return p.done(col, mask, n, rough=0.1, alpha=0.6)


def mat_core():
    p = M.pm("core")
    co = p.co("Object")
    d = p.vec("LENGTH", co)
    L = p.remap(d, 0.0, 0.08, 1.0, 0.75)
    return p.done(p.comb(L, L, p.mul(L, 0.92)), p.comb(1.0, 0.0, 0.5), None, emit=(1, 1, 1), emit_strength=4)


def mat_bubble():
    p = M.pm("bubble")
    co = p.co("Object")
    _, _, z = p.xyz(co)
    L = p.remap(z, -0.02, 0.02, 0.7, 1.0)
    return p.done(p.comb(L, L, L), p.comb(0.3, 0.0, 0.35), None)


def mat_eye():
    p = M.pm("eye")
    co = p.co("Generated")
    x, y, z = p.xyz(co)
    c = p.vec("SUBTRACT", co, (0.5, 0.5, 0.5))
    cx, cy, cz = p.xyz(c)
    g = p.remap(z, 0.85, 0.15, 0.0, 1.0)
    base = p.mix(g, (0.02, 0.02, 0.07), (0.1, 0.13, 0.32))
    r2 = p.vec("LENGTH", p.comb(p.mul(cx, 1.0), 0.0, p.mul(p.math("ADD", cz, 0.12), 1.15)))
    iris = p.sstep(0.36, 0.3, r2)
    base = p.mix(p.mul(iris, p.sstep(0.0, -0.32, cz)), base, (0.42, 0.62, 0.95))
    h1 = p.sstep(0.15, 0.11, p.vec("DISTANCE", p.comb(cx, 0.0, cz), (-0.14, 0.0, 0.17)))
    h2 = p.sstep(0.075, 0.05, p.vec("DISTANCE", p.comb(cx, 0.0, cz), (0.16, 0.0, -0.14)))
    h3 = p.sstep(0.04, 0.025, p.vec("DISTANCE", p.comb(cx, 0.0, cz), (-0.02, 0.0, 0.25)))
    hs = p.math("MAXIMUM", p.math("MAXIMUM", h1, h2), h3)
    base = p.mix(hs, base, (1, 1, 1))
    lid = p.sstep(0.44, 0.48, p.vec("LENGTH", p.comb(cx, 0.0, cz)))
    base = p.mix(lid, base, (0.08, 0.05, 0.14))
    mask = p.comb(p.mul(iris, 0.25), 0.8, p.mul(iris, p.math("SUBTRACT", 1, hs)))
    return p.done(base, mask, None, rough=0.05)


def mat_mouth():
    p = M.pm("mouth")
    return p.done((0.18, 0.06, 0.12), (0, 0, 0), None)


def surface_y(x, z):
    r = r_at(z)
    return -math.sqrt(max(r * r - x * x, 0.0)) * SQ


def build(args):
    M.reset()
    bones = ["root", "body", "top", "core"]
    pieces = []
    lo, hi = body()
    pieces.append(B.Piece(lo, mat_body(), "jelly", hi))
    cc = Vector((0, -0.02, 0.23))
    core = M.uv_sphere("slime_core", 1.0, 8, 4, (0, 0, 0))
    for v in core.data.vertices:
        d = v.co.copy()
        lat = abs(d.z)
        k = 0.035 + 0.05 * (lat > 0.99)
        v.co = cc + Vector((d.x * k * (1.25 if lat < 0.01 else 1), d.y * k, d.z * (0.095 if lat > 0.99 else k)))
    pieces.append(B.Piece(core, mat_core(), "glow", bone="core"))
    for j, (tilt, rr) in enumerate(((0.5, 0.085), (-0.7, 0.1))):
        pts = [cc + Vector((math.cos(a) * rr, math.sin(a) * rr * math.cos(tilt), math.sin(a) * rr * math.sin(tilt)))
               for a in [i / 24 * math.tau for i in range(25)]]
        ring_o = M.tube(f"core_ring{j}", pts, 0.0045, 5)
        pieces.append(B.Piece(ring_o, M.ALL_PM[-1], "glow", bone="core"))
    rng = M.rnd(5)
    bm = mat_bubble()
    for i in range(9):
        z = rng.uniform(0.07, 0.4)
        a = rng.uniform(0, math.tau)
        rr = r_at(z) * rng.uniform(0.25, 0.7)
        s = rng.uniform(0.012, 0.03)
        b = M.uv_sphere(f"bub{i}", s, 10, 6, (math.cos(a) * rr, math.sin(a) * rr * SQ, z))
        pieces.append(B.Piece(b, bm, "glow", bone="body" if z < 0.3 else "top"))
    me = mat_eye()
    for sd in (-1, 1):
        x, z = 0.115 * sd, 0.3
        y = surface_y(x, z) + 0.012
        e = M.uv_sphere(f"eye{sd}", 1.0, 20, 14, (0, 0, 0), (0.078, 0.028, 0.1))
        e.rotation_euler = (0.1, 0, -sd * 0.3)
        e.location = (x, y, z)
        hi_e = M.dup(e, f"eye{sd}_hi")
        for o in (e, hi_e):
            o.data.transform(__import__("mathutils").Matrix.Identity(4))
        pieces.append(B.Piece(e, me, "eye", hi_e, bone="top"))
    pts = []
    for i in range(13):
        t = i / 12
        a = t * 2 * math.pi
        pts.append((-0.04 + 0.08 * t, surface_y(-0.04 + 0.08 * t, 0.2) + 0.004, 0.205 - 0.014 * abs(math.sin(a))))
    mo = M.tube("mouth", pts, 0.0065, 6)
    pieces.append(B.Piece(mo, mat_mouth(), "eye", bone="top"))
    size = 1024
    low, highs, maps = B.assemble("slime", pieces, size, {"eye": 2.2, "glow": 0.5}, ao=False, bones=bones)
    print("[s29] slime tris", M.tris(low))
    B.hide_highs(highs)
    arm = M.armature("slime_rig", [("root", (0, 0, 0), (0, 0, 0.08), None), ("body", (0, 0, 0.02), (0, 0, 0.3), "root"),
                                    ("top", (0, 0, 0.3), (0, 0, 0.58), "body"), ("core", (0, -0.02, 0.24), (0, -0.02, 0.32), "body")])
    arm.data.bones["root"].use_deform = False
    battr = low.data.attributes["bone"]
    M.weight_by_distance(low, arm, allow=lambda co, i: ["body", "top"],
                         rigid=lambda i, co: (bones[battr.data[i].value - 1] if battr.data[i].value else None))
    M.split_materials(low, maps)
    l1 = B.lod(low, 0.4, "slime_lod1")
    import anim_slime
    anim_slime.make(arm)
    B.save("slime", [arm, low, l1], highs)
