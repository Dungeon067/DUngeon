"""Pháp Sư Mặt Nạ: người thật của Hội Mặt Nạ. Áo choàng xám nhiều lớp có mũ trùm, mặt nạ gốm trắng không lỗ mắt
khắc phù văn phát sáng theo nguyên tố, chuỗi hạt đen, trượng có ngọn lửa nguyên tố lơ lửng."""
import math

from mathutils import Vector as V

import build as B
import mlib as M
import sp_goblin as G

K = 1.3
X, Y = V((1, 0, 0)), V((0, 1, 0))


def joints(k):
    J = G.joints(1.0, 0.0)
    out = {}
    for n, p in J.items():
        z = p.z * 1.55 if p.z < 0.33 else p.z + 0.18
        x = p.x * (1.12 if p.z > 0.4 else 1.0)
        y = -0.02 if n.startswith("knee") else p.y * (0.4 if n.startswith(("neck", "head", "chest")) else 1.0)
        out[n] = V((x, y, z)) * k
    return out


def mat_robe(name, c1, c2, k):
    p = M.pm(name)
    co = p.co("Object")
    n = p.noise(p.vec("SCALE", co, None, 6 / k), 1.0, 4, 0.6)
    col = p.mix(n, c2, c1)
    folds = p.wave(p.vec("SCALE", co, None, 1 / k), 9.0, 3.0, 2.0, "BANDS", "X")
    col = p.mix(p.mul(folds, 0.25), col, tuple(x * 0.55 for x in c2))
    weave = p.wave(p.vec("SCALE", co, None, 1 / k), 260.0, 0.5, 0.0, "BANDS", "Z")
    dirt = p.sstep(0.55, 0.75, p.noise(p.vec("SCALE", co, None, 3 / k), 1.0, 3))
    col = p.mix(p.mul(dirt, 0.4), col, (0.2, 0.17, 0.14))
    h = p.add(p.mul(folds, 0.6), p.mul(weave, 0.15))
    return p.done(col, (0, 0, 0), p.bump(h, 0.45, 0.004 * k))


def mat_mask(name, k):
    p = M.pm(name)
    co = p.co("Object")
    n = p.noise(p.vec("SCALE", co, None, 30 / k), 1.0, 3)
    col = p.mix(p.mul(n, 0.3), (0.93, 0.91, 0.86), (0.72, 0.7, 0.68))
    crack = p.voronoi(p.vec("SCALE", co, None, 26 / k), 1.0, "DISTANCE_TO_EDGE")
    hair = p.math("SUBTRACT", 1.0, p.sstep(0.0, 0.025, crack))
    col = p.mix(p.mul(hair, 0.35), col, (0.45, 0.42, 0.42))
    band = p.wave(p.vec("SCALE", co, None, 1 / k), 14.0, 4.0, 1.0, "BANDS", "Z")
    vband = p.wave(p.vec("SCALE", co, None, 1 / k), 30.0, 2.0, 1.0, "BANDS", "X")
    rune = p.math("MAXIMUM", p.mul(p.sstep(0.88, 0.94, band), p.sstep(0.35, 0.5, p.noise(p.vec("SCALE", co, None, 22 / k), 1.0, 1))),
                  p.mul(p.sstep(0.93, 0.97, vband), p.sstep(0.5, 0.6, p.noise(p.vec("SCALE", co, None, 9 / k), 1.0, 1))))
    col = p.mix(rune, col, (0.25, 0.85, 1.0))
    h = p.add(p.mul(rune, -0.6), p.mul(hair, -0.3))
    return p.done(col, p.comb(rune, 0.55, rune), p.bump(h, 0.6, 0.002 * k), rough=0.3)


def mat_glow(name):
    p = M.pm(name)
    co = p.co("Object")
    n = p.noise(p.vec("SCALE", co, None, 40), 1.0, 2)
    col = p.mix(n, (1.0, 1.0, 1.0), (0.75, 0.9, 1.0))
    return p.done(col, (1.0, 0.0, 1.0), None, emit=(1, 1, 1), emit_strength=4)


def build(args):
    sid, k = "shaman", K
    M.reset()
    J = joints(k)
    bl = G.bones_of(J)
    hp = J["pelvis"]
    robe_dirs = {"robeF": V((0, -1, 0)), "robeB": V((0, 1, 0)), "robeL": V((1, 0, 0)), "robeR": V((-1, 0, 0))}
    for n, d in robe_dirs.items():
        a = hp + d * 0.08 * k
        bl.append((n, a, a + (d * 0.1 + V((0, 0, -1))).normalized() * 0.3 * k, "hips"))
    grip = J["wristR"] + V((0, -0.03 * k, 0))
    bl.append(("weapon", grip, grip + V((0, 0, 0.15 * k)), "handR"))
    so, sm, cords, sa, sb = G.staff(k, grip, top_z=1.12, bottom_z=0.02, mat_name=f"{sid}_wood", x_lean=0.02)
    orb_c = sb + V((0, 0, 0.1 * k))
    bl.append(("orb", orb_c, orb_c + V((0, 0, 0.08 * k)), "weapon"))
    bones = [b[0] for b in bl]

    skin = mat_robe(f"{sid}_under", (0.24, 0.23, 0.27), (0.12, 0.11, 0.14), k)
    robe = mat_robe(f"{sid}_robe", (0.56, 0.56, 0.58), (0.3, 0.3, 0.34), k)
    robe2 = mat_robe(f"{sid}_robe2", (0.4, 0.38, 0.44), (0.2, 0.18, 0.24), k)
    sash = G.mat_cloth(f"{sid}_sash", (0.32, 0.16, 0.34), (0.14, 0.06, 0.16))
    glove = G.mat_flat(f"{sid}_glove", (0.16, 0.15, 0.17), (0, 0.15, 0))
    bead = G.mat_flat(f"{sid}_bead", (0.05, 0.05, 0.07), (0, 0.8, 0), rough=0.15)
    rope = G.mat_flat(f"{sid}_rope", (0.55, 0.5, 0.42), (0, 0.05, 0))
    mask_m = mat_mask(f"{sid}_mask", k)
    glow = mat_glow(f"{sid}_flame")
    pieces = []

    lo, hi = G.body(J, k, thin=0.85)
    pieces.append(B.Piece(lo, skin, "cloth", hi))
    for S in "LR":
        pieces += G.hand(S, J, k * 0.85, glove, glove)
    # Thân áo: ống vải từ hông lên cổ, phồng ở ngực, vạt chéo.
    cs = [("pelvis", 0.1, 0.085), ("spine", 0.092, 0.075), ("chest", 0.11, 0.085), ("neck", 0.062, 0.058)]
    rings = [M.ring(J[n] + V((0, 0.004 * k, 0)), (X, Y), rx * k, ry * k, 18) for n, rx, ry in cs]
    torso = M.loft("torso", rings, closed_ends=False)
    pieces.append(B.Piece(torso, robe, "cloth"))
    # Tay áo loe rộng.
    for S in "LR":
        sh, el, wr = J[f"shoulder{S}"], J[f"elbow{S}"], J[f"wrist{S}"]
        pts = [sh + (el - sh) * f for f in (0.0, 0.5, 1.0)] + [el + (wr - el) * f for f in (0.5, 0.95)]
        rad = [0.05 * k, 0.045 * k, 0.05 * k, 0.065 * k, 0.085 * k]
        pieces.append(B.Piece(M.tube(f"sleeve{S}", pts, rad, 10, cap=False), robe, "cloth"))
    # Vạt áo dưới: tám vạt chồng lớp, mép rách, mỗi vạt theo một xương vạt để bay.
    for i in range(9):
        a = -math.pi / 2 + i / 9 * math.tau
        d = V((math.cos(a), math.sin(a), 0))
        top = hp + V((d.x * 0.095 * k, d.y * 0.08 * k, 0.04 * k))
        bone = max(robe_dirs, key=lambda n: robe_dirs[n].dot(d))
        lay = i % 2
        L = (hp.z + 0.02 * k) * (0.98 if lay else 0.9)
        st = G.cloth_strip(f"robe{i}", top + d * 0.008 * k * lay, d * 0.28 + V((0, 0, -1)), V((-d.y, d.x, 0)),
                           0.085 * k, L, jag=4, seg=4, thick=0.005 * k, flare=1.7)
        pieces.append(B.Piece(st, robe2 if lay else robe, "cloth", bone=bone))
    # Khăn quàng vai và dây thắt lưng tím có tua.
    for i in range(5):
        a = -math.pi / 2 + (i - 2) * 0.75
        d = V((math.cos(a), math.sin(a), 0))
        top = J["neck"] + V((d.x * 0.07 * k, d.y * 0.06 * k, -0.01 * k))
        cp = G.cloth_strip(f"cape{i}", top, d * 1.2 + V((0, 0, -1)), V((-d.y, d.x, 0)), 0.07 * k, 0.12 * k, jag=3,
                           seg=3, thick=0.004 * k, flare=1.4)
        pieces.append(B.Piece(cp, robe2, "cloth", bone="chest"))
    belt = [hp + V((math.cos(a) * 0.104 * k, math.sin(a) * 0.088 * k, 0.05 * k)) for a in
            [i / 22 * math.tau for i in range(23)]]
    pieces.append(B.Piece(M.tube("sash", belt, 0.014 * k, 6), sash, "cloth", bone="hips"))
    for sd in (-1, 1):
        t = G.cloth_strip(f"sasht{sd}", hp + V((0.04 * sd * k, -0.09 * k, 0.04 * k)), (0.1 * sd, -0.2, -1), X,
                          0.025 * k, 0.2 * k, jag=2, seg=3, thick=0.003 * k)
        pieces.append(B.Piece(t, sash, "cloth", bone="robeF"))
    # Đầu, mũ trùm, mặt nạ gốm.
    hc = J["head"]
    pieces.append(B.Piece(M.uv_sphere("headb", 0.07 * k, 14, 10, hc), skin, "cloth", bone="head"))
    hood = M.uv_sphere("hood", 0.092 * k, 18, 12, hc + V((0, 0.018 * k, 0.012 * k)), (1.0, 1.08, 1.1))
    M.noise_verts(hood, 0.006 * k, 9, 3)
    pieces.append(B.Piece(hood, robe, "cloth", bone="head"))
    tip = M.cone("hoodtip", 0.05 * k, 0.004 * k, 0.12 * k, 10, hc + V((0, 0.07 * k, 0.05 * k)), V((0, 0.8, -0.35)))
    pieces.append(B.Piece(tip, robe, "cloth", bone="head"))
    mk = M.uv_sphere("mask", 0.07 * k, 20, 14, hc + V((0, -0.058 * k, -0.004 * k)), (0.92, 0.45, 1.18))
    pieces.append(B.Piece(mk, mask_m, "skin", bone="head"))
    rim = [hc + V((math.cos(a) * 0.072 * k, -0.06 * k + 0.02 * k * math.sin(a) ** 2, math.sin(a) * 0.09 * k))
           for a in [i / 24 * math.tau for i in range(25)]]
    pieces.append(B.Piece(M.tube("hoodrim", rim, 0.012 * k, 5), robe2, "cloth", bone="head"))
    # Chuỗi hạt đen trên tay trái.
    w = J["wristL"]
    for i in range(9):
        a = i / 8 * math.pi
        c = w + V((0.012 * k * math.sin(a * 2), -0.02 * k, -0.025 * k - math.sin(a) * 0.12 * k))
        pieces.append(B.Piece(M.uv_sphere(f"bead{i}", 0.011 * k * (1.5 if i == 4 else 1), 7, 5, c), bead, "skin",
                              bone="handL"))
    # Trượng và ngọn lửa nguyên tố lơ lửng.
    pieces.append(B.Piece(so, sm, "cloth", bone="weapon"))
    for j, cp in enumerate(cords):
        pieces.append(B.Piece(M.tube(f"cord{j}", cp, 0.003 * k, 5), rope, "cloth", bone="weapon"))
    for i in range(3):
        a = i / 3 * math.tau
        prong = [sb, sb + V((math.cos(a) * 0.04 * k, math.sin(a) * 0.04 * k, 0.06 * k)),
                 sb + V((math.cos(a) * 0.028 * k, math.sin(a) * 0.028 * k, 0.13 * k))]
        pieces.append(B.Piece(M.tube(f"prong{i}", prong, [0.008 * k, 0.006 * k, 0.003 * k], 5), sm, "cloth",
                              bone="weapon"))
    pieces.append(B.Piece(M.ico("orb", 0.042 * k, 2, orb_c), glow, "glow", bone="orb"))
    for i in range(4):
        a = i / 4 * math.tau
        fl = M.leaf(f"flame{i}", 0.11 * k, 0.03 * k, orb_c + V((math.cos(a) * 0.02 * k, math.sin(a) * 0.02 * k, 0)),
                    V((math.cos(a) * 0.25, math.sin(a) * 0.25, 1)), up=(math.cos(a), math.sin(a), 0), curl=0.3, seg=3,
                    thick=0.003 * k)
        pieces.append(B.Piece(fl, glow, "glow", bone="orb"))

    low, highs, maps = B.assemble(sid, pieces, 1024, {"skin": 1.6}, extrusion=0.006 * k, ray=0.015 * k, ao=True,
                                  bones=bones)
    print(f"[s29] {sid} tris", M.tris(low))
    B.hide_highs(highs)
    arm = M.armature(f"{sid}_rig", bl)
    arm.data.bones["root"].use_deform = False
    battr = low.data.attributes["bone"]
    body_bones = [b for b in bones if b not in ("root", "weapon", "orb") and not b.startswith(("ear", "robe"))]

    def rigid(i, co):
        v = battr.data[i].value
        return bones[v - 1] if v else None

    M.weight_by_distance(low, arm, allow=lambda co, i: body_bones, rigid=rigid, power=5.0)
    M.split_materials(low, maps)
    l1 = B.lod(low, 0.35, f"{sid}_lod1")
    import anim_shaman
    anim_shaman.make(arm)
    B.save(sid, [arm, low, l1], highs)
