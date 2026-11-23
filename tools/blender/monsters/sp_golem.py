"""Hộ Vệ Đá Cổ: tượng đá Tô Khuyết khắc canh miệng hang. Đá xám phủ rêu, khe nứt hổ phách phát sáng, phù văn cổ,
ngực khắc hoa văn trống đồng, mắt hai khe sáng xanh lục, nửa mặt vỡ, lõi sao lộ ở lưng. Các khối đá cứng theo xương."""
import math

from mathutils import Vector as V

import build as B
import mlib as M
import sp_goblin as G


def joints():
    J = {"pelvis": (0, 0.02, 0.8), "spine": (0, 0.0, 1.0), "chest": (0, -0.04, 1.24), "neck": (0, -0.1, 1.5),
         "head": (0, -0.14, 1.62)}
    for sd, S in ((1, "L"), (-1, "R")):
        J |= {f"clav{S}": (0.2 * sd, -0.03, 1.45), f"shoulder{S}": (0.44 * sd, -0.02, 1.42),
              f"elbow{S}": (0.56 * sd, 0.0, 1.06), f"wrist{S}": (0.6 * sd, -0.1, 0.7),
              f"hip{S}": (0.17 * sd, 0.02, 0.76), f"knee{S}": (0.22 * sd, -0.08, 0.44),
              f"ankle{S}": (0.23 * sd, 0.02, 0.12), f"toe{S}": (0.25 * sd, -0.2, 0.05)}
    return {n: V(p) for n, p in J.items()}


def mat_stone(name, moss=1.0):
    p = M.pm(name)
    co = p.co("Object")
    n = p.noise(p.vec("SCALE", co, None, 2.5), 1.0, 5, 0.6)
    col = p.ramp(n, [(0.3, (0.24, 0.25, 0.26)), (0.55, (0.42, 0.42, 0.4)), (0.8, (0.56, 0.54, 0.5))])
    strata = p.wave(co, 9.0, 4.0, 3.0, "BANDS", "Z")
    col = p.mix(p.mul(strata, 0.2), col, (0.2, 0.2, 0.22))
    chip = p.voronoi(p.vec("SCALE", co, None, 9.0), 1.0, "DISTANCE_TO_EDGE")
    edge = p.math("SUBTRACT", 1.0, p.sstep(0.0, 0.05, chip))
    vor = p.voronoi(p.vec("SCALE", co, None, 2.2), 1.0, "DISTANCE_TO_EDGE")
    gate = p.sstep(0.45, 0.6, p.noise(p.vec("SCALE", co, None, 1.6), 1.0, 2))
    crack = p.mul(p.math("SUBTRACT", 1.0, p.sstep(0.0, 0.022, vor)), gate)
    band = p.wave(co, 7.0, 0.0, 0.0, "BANDS", "Z")
    glyph = p.sstep(0.55, 0.62, p.noise(p.vec("SCALE", co, None, 14.0), 1.0, 1))
    rune = p.mul(p.mul(p.sstep(0.88, 0.93, band), glyph), p.sstep(0.5, 0.55, p.noise(p.vec("SCALE", co, None, 1.2), 1.0, 1)))
    glow = p.math("MAXIMUM", crack, rune)
    _, _, nz = p.xyz(p.co("Normal"))
    mossk = p.mul(p.mul(p.sstep(0.25, 0.65, nz), p.sstep(0.4, 0.55, p.noise(p.vec("SCALE", co, None, 5.0), 1.0, 4))), moss)
    mc = p.mix(p.noise(p.vec("SCALE", co, None, 40.0), 1.0, 2), (0.2, 0.32, 0.1), (0.42, 0.52, 0.18))
    col = p.mix(p.mul(edge, 0.3), col, (0.62, 0.6, 0.55))
    col = p.mix(mossk, col, mc)
    col = p.mix(glow, col, (1.0, 0.62, 0.22))
    h = p.add(p.add(p.mul(mossk, 0.5), p.mul(glow, -0.9)), p.add(p.mul(edge, -0.4), p.mul(n, 0.5)))
    return p.done(col, p.comb(glow, 0.05, 0.0), p.bump(h, 0.7, 0.02), rough=0.9)


def mat_drum(name, c):
    p = M.pm(name)
    co = p.vec("SUBTRACT", p.co("Object"), tuple(c))
    r = p.vec("LENGTH", co)
    rings = p.math("SINE", p.mul(r, 130.0))
    carve = p.sstep(0.4, 0.8, rings)
    n = p.noise(p.vec("SCALE", p.co("Object"), None, 3.0), 1.0, 4)
    col = p.mix(n, (0.3, 0.31, 0.3), (0.5, 0.49, 0.45))
    col = p.mix(p.mul(carve, 0.45), col, (0.16, 0.17, 0.18))
    star = p.math("SUBTRACT", 1.0, p.sstep(0.02, 0.045, r))
    col = p.mix(star, col, (1.0, 0.7, 0.3))
    return p.done(col, p.comb(star, 0.05, 0.0), p.bump(p.add(p.mul(carve, -1.0), p.mul(n, 0.3)), 0.8, 0.01), rough=0.85)


def mat_glow(name, c):
    p = M.pm(name)
    return p.done(c, (1.0, 0.0, 0.0), None, emit=c, emit_strength=4)


def rock(name, size, loc, seed, sub=3, amp=0.12):
    lo = M.ico(name, 1.0, sub, loc, size)
    hi = M.ico(name + "_hi", 1.0, 5, loc, size)
    m = min(size)
    L, S = V(loc), V(size)
    for o in (lo, hi):
        # Kéo hình cầu về khối hộp vát cạnh: đá đẽo, không tròn như bọt.
        for v in o.data.vertices:
            u = V(((v.co.x - L.x) / S.x, (v.co.y - L.y) / S.y, (v.co.z - L.z) / S.z))
            c = u / max(abs(u.x), abs(u.y), abs(u.z), 1e-6)
            u = u.lerp(c, 0.6)
            v.co = V((L.x + u.x * S.x, L.y + u.y * S.y, L.z + u.z * S.z))
        M.noise_verts(o, amp * m, 2.2, seed)
    M.noise_verts(hi, 0.05 * m, 9.0, seed + 11)
    return lo, hi


def build(args):
    sid = "golem"
    M.reset()
    J = joints()
    bl = [b for b in G.bones_of(J) if not b[0].startswith("ear")]
    bones = [b[0] for b in bl]
    st = mat_stone(f"{sid}_stone")
    st2 = mat_stone(f"{sid}_stone2", moss=0.3)
    leaf = G.mat_leaf(f"{sid}_moss", (0.3, 0.45, 0.16), (0.5, 0.5, 0.2))
    eye = mat_glow(f"{sid}_eye", (0.45, 1.0, 0.55))
    core = mat_glow(f"{sid}_core", (1.0, 0.85, 0.5))
    pieces = []

    def add(name, size, loc, bone, seed, mat=st, sub=3, amp=0.12):
        lo, hi = rock(name, size, loc, seed, sub, amp)
        pieces.append(B.Piece(lo, mat, "skin", hi, bone=bone))

    def between(a, b, f=0.5):
        return J[a] + (J[b] - J[a]) * f

    add("pelvis", (0.27, 0.2, 0.15), J["pelvis"], "hips", 1)
    add("abdomen", (0.24, 0.18, 0.15), J["spine"] + V((0, 0.01, 0)), "spine", 2, st2)
    add("torso", (0.44, 0.3, 0.3), J["chest"] + V((0, 0.04, 0.04)), "chest", 3)
    add("back", (0.3, 0.16, 0.22), J["chest"] + V((0, 0.24, 0.1)), "chest", 4)
    for i, (x, z) in enumerate(((-0.17, 0.1), (0.17, 0.12), (0.0, -0.08))):
        add(f"backr{i}", (0.11, 0.08, 0.1), J["chest"] + V((x, 0.33, z)), "chest", 30 + i, st2)
    pieces.append(B.Piece(M.ico("core", 0.075, 2, J["chest"] + V((0, 0.37, 0.07))), core, "glow", bone="chest"))
    dc = J["chest"] + V((0, -0.255, 0.05))
    drum = M.cone("drum", 0.21, 0.19, 0.06, 28, dc, V((0, -1, 0)))
    pieces.append(B.Piece(drum, mat_drum(f"{sid}_drum", dc), "skin", bone="chest"))
    add("neck", (0.13, 0.12, 0.08), J["neck"], "chest", 5, st2)
    hc = J["head"]
    add("head", (0.19, 0.17, 0.19), hc, "head", 6, amp=0.08)
    add("brow", (0.18, 0.06, 0.045), hc + V((0, -0.15, 0.06)), "head", 7, amp=0.06)
    add("nose", (0.035, 0.05, 0.07), hc + V((0, -0.185, -0.02)), "head", 8, amp=0.05)
    add("jaw", (0.14, 0.11, 0.07), hc + V((0, -0.1, -0.14)), "head", 9, amp=0.08)
    add("broken", (0.07, 0.08, 0.09), hc + V((-0.15, -0.09, 0.03)), "head", 10, st2, amp=0.25)
    for sd in (1, -1):
        e = M.box(f"eye{sd}", (0.07, 0.03, 0.018), hc + V((0.07 * sd, -0.175, 0.025)))
        e.rotation_euler = (0, 0.18 * sd, 0)
        M.apply_tf(e)
        pieces.append(B.Piece(e, eye, "glow", bone="head"))
    for S, sd in (("L", 1), ("R", -1)):
        add(f"pauld{S}", (0.21, 0.21, 0.17), J[f"shoulder{S}"] + V((0.02 * sd, 0.02, 0.07)), f"arm{S}", 12 + sd)
        add(f"uarm{S}", (0.13, 0.13, 0.2), between(f"shoulder{S}", f"elbow{S}", 0.55), f"arm{S}", 14 + sd, st2)
        add(f"farm{S}", (0.17, 0.16, 0.22), between(f"elbow{S}", f"wrist{S}", 0.45), f"fore{S}", 16 + sd)
        w = J[f"wrist{S}"] + V((0.01 * sd, -0.02, -0.09))
        add(f"fist{S}", (0.17, 0.17, 0.15), w, f"hand{S}", 18 + sd)
        for i in range(4):
            add(f"knk{S}{i}", (0.045, 0.05, 0.045), w + V(((i - 1.5) * 0.065 * sd, -0.13, 0.03)), f"hand{S}", 40 + i + sd * 5,
                st2, sub=2, amp=0.1)
        add(f"thigh{S}", (0.15, 0.15, 0.2), between(f"hip{S}", f"knee{S}"), f"thigh{S}", 20 + sd, st2)
        add(f"knee{S}", (0.1, 0.1, 0.08), J[f"knee{S}"] + V((0, -0.07, 0)), f"shin{S}", 22 + sd, sub=2)
        add(f"shin{S}", (0.14, 0.14, 0.2), between(f"knee{S}", f"ankle{S}", 0.55), f"shin{S}", 24 + sd)
        add(f"foot{S}", (0.15, 0.22, 0.08), J[f"ankle{S}"] + V((0, -0.07, -0.04)), f"foot{S}", 26 + sd, st2)
        # Dây leo và rêu rủ từ vai.
        top = J[f"shoulder{S}"] + V((0.06 * sd, -0.1, 0.12))
        vine = [top + V((0.02 * sd * math.sin(i), -0.05 - 0.01 * i, -0.08 * i)) for i in range(6)]
        pieces.append(B.Piece(M.tube(f"vine{S}", vine, 0.012, 5), leaf, "cloth", bone=f"arm{S}"))
        for i in range(5):
            lf = M.leaf(f"vl{S}{i}", 0.1, 0.035, vine[i] + V((0, -0.01, 0)), V((0.4 * sd, -0.6, -0.5)), curl=0.3, seg=3,
                        thick=0.004)
            pieces.append(B.Piece(lf, leaf, "cloth", bone=f"arm{S}"))
    for i in range(9):
        a = i / 9 * math.tau
        tuft = M.leaf(f"tuft{i}", 0.12, 0.04, J["chest"] + V((math.cos(a) * 0.3, 0.06 + math.sin(a) * 0.15, 0.3)),
                      V((math.cos(a), math.sin(a), 0.6)), curl=0.4, seg=3, thick=0.004)
        pieces.append(B.Piece(tuft, leaf, "cloth", bone="chest"))

    low, highs, maps = B.assemble(sid, pieces, 1024, {"skin": 1.2}, extrusion=0.03, ray=0.06, ao=True, bones=bones)
    print(f"[s29] {sid} tris", M.tris(low))
    B.hide_highs(highs)
    arm = M.armature(f"{sid}_rig", bl)
    arm.data.bones["root"].use_deform = False
    battr = low.data.attributes["bone"]
    body_bones = [b for b in bones if b != "root"]

    def rigid(i, co):
        v = battr.data[i].value
        return bones[v - 1] if v else None

    M.weight_by_distance(low, arm, allow=lambda co, i: body_bones, rigid=rigid, power=5.0)
    M.split_materials(low, maps)
    l1 = B.lod(low, 0.3, f"{sid}_lod1")
    import anim_golem
    anim_golem.make(arm)
    B.save(sid, [arm, low, l1], highs)
