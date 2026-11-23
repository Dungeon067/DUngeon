"""Bộ dựng vòng nâng cấp ảnh: 5★ chạm nhiều lớp, lõi năng lượng, hạt sáng; 4★ một điểm nhấn; pháp khí ra dáng vũ khí phép.
Chọn bằng `builder` trong designs.py. Hình khối và hoa văn tự sinh, không chép thiết kế có sẵn.
"""
import math

from lib import TAU, blade, crystal, curve_obj, empty, extrude_poly, hexc, lathe, mat_aged, mat_cloth, mat_emit, mat_gem
from lib import mat_metal, new_mat, rng, star_poly
from models import SEC_DOUBLE, build_bow, build_sword, grip, mat_blade, tassel


def trim(d):
    """Viền kim loại quý (vàng hoặc bạc) hơi phát sáng."""
    m, n = new_mat("trim")
    ao = n.node("ShaderNodeAmbientOcclusion", ins={"Distance": 0.02}, samples=8)
    cav = n.smooth(0.5, 0.95, ao.outputs["AO"])
    col = n.mixc(cav, hexc(d.get("cavity", "#2a1a0a")), hexc(d.get("gold", "#e6b45a")))
    n.principled(col, 1.0, 0.2, emit=hexc(d["glow"]), emit_strength=d.get("trim_glow", 0.25))
    return m


def sphere(name, loc, r, mats, parent, seg=20):
    prof = [(r * math.sin(a), -r * math.cos(a)) for a in [math.pi * i / 12 for i in range(13)]]
    return lathe(name, prof, seg, mats, parent, offset=loc)


def motes(root, path, n, d, seed=11, r=(0.004, 0.011), spread=0.06):
    """Hạt sáng theo nguyên tố bay quanh đường `path(t)` (t trong 0..1)."""
    if d.get("icon"):
        n = n // 6
    R = rng(seed)
    me = mat_emit("mote", hexc(d["glow"]), d.get("mote_glow", 6))
    for i in range(n):
        t = R.random()
        x, y, z = path(t)
        a = R.random() * TAU
        s = spread * (0.4 + R.random())
        sphere(f"mote{i}", (x + s * math.cos(a), y + s * math.sin(a) * 0.5, z + R.uniform(-0.02, 0.02)),
               R.uniform(*r), [me], root, 10)


def core_gem(root, loc, r, d, mt, axis="Y", facets=8):
    """Lõi năng lượng: đá giác cắt phát sáng trong ổ viền kim loại có chấu giữ."""
    gem = mat_gem("core", hexc(d.get("gem", d["glow"])), hexc(d["glow"]), d.get("core_glow", 9), 0.02)
    x, y, z = loc
    if axis == "Y":
        prof = [(0, -r * 0.75), (r * 0.62, -r * 0.42), (r, 0.0), (r * 0.62, r * 0.38), (0, r * 0.52)]
        lathe("core_gem", [(a, b) for a, b in prof], facets, [gem], root, axis="Y", sharp_deg=10, offset=(x, y, z))
        ring = [(x + r * 1.08 * math.cos(TAU * i / 64), y + r * 0.1, z + r * 1.08 * math.sin(TAU * i / 64)) for i in range(64)]
        curve_obj("core_bezel", [ring], r * 0.14, mt, root, cyclic=True)
        for k in range(6):
            a = TAU * k / 6 + 0.26
            crystal(f"core_prong{k}", (x + r * 1.18 * math.cos(a), y + r * 0.12, z + r * 1.18 * math.sin(a)),
                    (-math.cos(a) * 0.5, -0.86, -math.sin(a) * 0.5), r * 0.55, r * 0.12, 4, [mt], root)
    else:
        prof = [(0, -r * 1.3), (r * 0.7, -r * 0.5), (r, 0.0), (r * 0.7, r * 0.5), (0, r * 1.3)]
        lathe("core_gem", prof, facets, [gem], root, sharp_deg=10, offset=loc)


def scroll(cx, cz, s, flip, y, turns=1.4, steps=40):
    """Một nét cuộn xoắn (hoa văn chạm) quanh (cx, cz)."""
    pts = []
    for i in range(steps):
        t = i / (steps - 1)
        a = flip * (t * turns * TAU)
        rr = s * (1 - 0.8 * t)
        pts.append((cx + rr * math.cos(a) * flip, y, cz + rr * math.sin(a)))
    return pts


def filigree_blade(root, L, hw, th, d, mt, me, z0=0.0, t0=0.04, t1=0.55, n=7):
    """Hai lớp chạm trên mặt lưỡi: viền kim loại theo mép và chuỗi nét cuộn dọc rãnh máu, lõi rãnh phát sáng."""
    for side in (-1, 1):
        y = side * 0.62 * th(0.0)
        edges = []
        for sx in (-1, 1):
            edges.append([(sx * 0.74 * hw(t)[0], side * 0.62 * th(t) * 1.03, z0 + t * L) for t in
                          [0.01 + 0.9 * i / 80 for i in range(81)]])
        curve_obj(f"trim_edge{side}", edges, 0.0022, mt, root)
        sc = []
        for k in range(n):
            t = t0 + (t1 - t0) * k / max(1, n - 1)
            w = hw(t)[0]
            for sx in (-1, 1):
                sc.append(scroll(sx * w * 0.32, z0 + t * L, w * 0.26, sx, y * 1.08 * (1 - 0.5 * t)))
        curve_obj(f"filigree{side}", sc, 0.0016, mt, root, kind="BEZIER")
        fz = [(0.0, side * 0.5 * th(t), z0 + t * L) for t in [0.03 + 0.62 * i / 60 for i in range(61)]]
        curve_obj(f"fuller_core{side}", [fz], 0.0028, me, root)


def rune_ring(root, center, r, d, me, tilt=(0.0, 0.0), n=18, seed=5, name="rune"):
    """Vòng ma pháp: hai vòng tròn và các ký hiệu tự sinh (không phải chữ có thật) phát sáng."""
    R = rng(seed)
    me = mat_emit(f"{name}_glow", hexc(d["glow"]), d.get("rune_glow", 3.0) * (0.35 if d.get("icon") else 1.0))
    cx, cy, cz = center
    ax, ay = tilt

    def P(x, y):  # (x, y) trên mặt phẳng vòng -> 3D, nghiêng quanh trục X rồi Y
        y2, z2 = y * math.cos(ax), y * math.sin(ax)
        x3, z3 = x * math.cos(ay) + z2 * math.sin(ay), -x * math.sin(ay) + z2 * math.cos(ay)
        return (cx + x3, cy + y2, cz + z3)

    rings = [[P(rr * math.cos(TAU * i / 128), rr * math.sin(TAU * i / 128)) for i in range(128)] for rr in (r, r * 0.84)]
    curve_obj(f"{name}_rings", rings, r * 0.012, me, root, cyclic=True)
    glyphs = []
    for k in range(n):
        a = TAU * k / n
        rm = r * 0.92
        ca, sa = math.cos(a), math.sin(a)
        g = r * 0.05
        for _ in range(R.randint(2, 3)):
            u0, v0, u1, v1 = (R.uniform(-1, 1) for _ in range(4))
            p0 = (rm * ca + g * (u0 * -sa + v0 * ca), rm * sa + g * (u0 * ca + v0 * sa))
            p1 = (rm * ca + g * (u1 * -sa + v1 * ca), rm * sa + g * (u1 * ca + v1 * sa))
            glyphs.append([P(*p0), P(*p1)])
    if not d.get("icon"):
        curve_obj(f"{name}_glyphs", glyphs, r * 0.008, me, root)


# ---------------------------------------------------------------- kiếm

def build_sword_ornate(d):
    root = empty()
    r5 = d["r"] >= 5
    L, bw = d.get("length", 1.0), d.get("width", 0.07)
    mb, mt = mat_blade(d), trim(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 7))

    def hw(t):
        s = 1 - 0.22 * t
        if r5 and t < 0.1:  # chân lưỡi loe nhẹ, tạo dáng riêng
            s *= 1 + 0.35 * (1 - t / 0.1) ** 2
        w = bw * s if t < 0.8 else bw * s * math.sqrt(max(0.0, 1 - ((t - 0.8) / 0.2) ** 1.3))
        return (w, w)

    th = lambda t: 0.022 * (1 - 0.5 * t)
    blade("blade", L, hw, th, SEC_DOUBLE, None, mats=[mb], parent=root, smooth=False)
    if r5:
        filigree_blade(root, L, hw, th, d, mt, me)
    sp = d.get("guard_span", 0.2)
    if d.get("guard") == "flame":
        # ba lớp lông lửa vuốt ngược lên hai bên, lớp trong phát sáng
        for layer, (k, col) in enumerate(((1.0, mt), (0.78, mt), (0.55, me))):
            for sx in (-1, 1):
                pts = [(sx * 0.03, -0.02), (sx * sp * k * 0.6, -0.05 + 0.02 * layer),
                       (sx * sp * k, 0.05 + 0.06 * k), (sx * sp * k * 0.82, 0.02 + 0.03 * k),
                       (sx * sp * k * 0.5, 0.012), (sx * 0.035, 0.015)]
                if sx < 0:
                    pts = list(reversed(pts))
                extrude_poly(f"flame{layer}{sx}", pts, 0.03 - 0.008 * layer, [col], root, y=-0.002 * layer,
                             bevel_w=0.003, smooth=True)
        gz = -0.06
    else:
        # chắn tay góc cạnh, hai mũi chúc xuống
        pts = [(-sp, 0.0), (-sp * 0.5, 0.012), (-0.035, 0.0), (0.035, 0.0), (sp * 0.5, 0.012), (sp, 0.0),
               (sp * 0.82, -0.045), (sp * 0.45, -0.025), (0.04, -0.05), (-0.04, -0.05), (-sp * 0.45, -0.025),
               (-sp * 0.82, -0.045)]
        extrude_poly("guard", pts, 0.034, [mt if r5 else mat_metal("guard", hexc(d.get("gold", "#c8ccd4")), 0.25)],
                     root, bevel_w=0.004, smooth=True)
        gz = -0.05
    core_gem(root, (0.0, -0.02 if r5 else -0.018, -0.022), 0.03 if r5 else 0.022, d, mt)
    gl = d.get("grip_len", 0.25)
    wrap = mat_cloth("wrap", hexc(d.get("wrap", "#5c1212")), 0.5, 0.6)
    grip(root, gz - gl, gz, 0.021, 0.024, d, wrap, mat_metal("core", hexc("#1a1410"), 0.4), turns=7)
    lathe("collar", [(0.025, gz - 0.012), (0.033, gz - 0.006), (0.033, gz), (0.027, gz + 0.004)], 40, [mt], root)
    pz = gz - gl
    lathe("pommel", [(0.024, pz), (0.034, pz - 0.014), (0.036, pz - 0.03), (0.024, pz - 0.044), (0, pz - 0.048)], 48,
          [mt], root)
    if r5:
        if d.get("pommel") == "drum":  # motif nhỏ cách điệu: một vòng sao trên mặt đốc
            curve_obj("pommel_ring", [[(0.026 * math.cos(TAU * i / 48), -0.034, pz - 0.03 + 0.012 * math.sin(TAU * i / 48))
                                       for i in range(48)]], 0.0016, me, root, cyclic=True)
        crystal("pommel_flame", (0, 0, pz - 0.045), (0, 0, -1), 0.06, 0.014, 6, [mat_gem("pg", hexc(d["glow"]),
                hexc(d["glow"]), 8)], root)
        motes(root, lambda t: (0.0, 0.0, -0.05 + 1.05 * t * L), d.get("motes", 46), d, spread=0.09)
    if d.get("tassel"):
        tassel(root, (0.0, 0.0, pz - 0.05), 0.16, 50, d["tassel"], seed=3, spread=0.3)
    return root


# ---------------------------------------------------------------- thương

def build_spear_ornate(d):
    root = empty()
    shaft_len, head = d.get("shaft", 1.35), d.get("head", 0.4)
    mb, mt = mat_blade(d), trim(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 8))
    m, n = new_mat("shaft")
    co = n.obj_co()
    vo = n.voronoi(n.node("ShaderNodeMapping", co, ins={"Scale": (30, 30, 4)}).outputs[0], 1.5)
    crack = n.math("SUBTRACT", 1, n.smooth(0.0, 0.035, vo))
    col = n.mixc(n.noise(co, 25, 6), hexc(d.get("shaft_col", "#16121f")), hexc(d.get("shaft_col2", "#3b2f55")))
    n.principled(col, 0.3, 0.35, normal=n.bump(n.math("MULTIPLY", crack, -1), 0.5, 0.01), emit=hexc(d["glow"]),
                 emit_strength=n.math("MULTIPLY", crack, d.get("crack_glow", 4)), coat=0.8)
    lathe("shaft", [(0.019, -shaft_len), (0.021, -shaft_len * 0.5), (0.019, 0.0)], 32, [m], root)
    # dây kim loại quấn xoắn quanh cán và các đai chạm
    sp = [[(0.0215 * math.cos(a + ph), 0.0215 * math.sin(a + ph), -shaft_len * 0.95 + 0.88 * shaft_len * i / 300)
           for i, a in [(i, 26 * TAU * i / 300) for i in range(301)]] for ph in (0, math.pi)]
    curve_obj("shaft_inlay", sp, 0.0018, mt, root)
    for zz in (-shaft_len * 0.96, -shaft_len * 0.6, -shaft_len * 0.3):
        lathe("band", [(0.021, zz - 0.026), (0.028, zz - 0.016), (0.03, zz), (0.028, zz + 0.016), (0.021, zz + 0.026)],
              32, [mt], root)
    lathe("butt", [(0, -shaft_len - 0.11), (0.012, -shaft_len - 0.09), (0.026, -shaft_len - 0.02),
                   (0.022, -shaft_len + 0.01)], 32, [mt], root)
    lathe("socket", [(0.02, -0.17), (0.027, -0.16), (0.032, -0.1), (0.04, -0.04), (0.052, -0.02), (0.034, 0.012),
                     (0.02, 0.03)], 48, [mt], root)
    hwmax = d.get("head_w", 0.085)

    def hw(t):
        w = hwmax * (0.45 + 0.55 * (t / 0.2) ** 0.6) if t < 0.2 else hwmax * max(0.0, math.cos((t - 0.2) / 0.8 * math.pi / 2)) ** 0.75
        return (w, w)

    th = lambda t: 0.028 * (1 - 0.7 * t)
    blade("head", head, hw, th, SEC_DOUBLE, None, mats=[mb], parent=root, z0=0.02, smooth=False)
    r5 = d["r"] >= 5
    if not r5:
        # 4★: một rãnh sáng màu nguyên tố giữa mũi, một viên đá ở họng, không chạm nhiều lớp
        for side in (-1, 1):
            fz = [(0.0, side * 0.5 * th(t), 0.02 + t * head) for t in [0.05 + 0.55 * i / 40 for i in range(41)]]
            curve_obj(f"fuller_core{side}", [fz], 0.0024, me, root)
        if d.get("prongs") == "torch":  # chén đồng giữ lửa dưới mũi, lưỡi lửa nhỏ phát sáng
            lathe("torch_cup", [(0.034, -0.02), (0.05, 0.0), (0.06, 0.035), (0.054, 0.04), (0.04, 0.012)], 32, [mt], root)
            for k in range(5):
                a = TAU * k / 5
                crystal(f"flame{k}", (0.03 * math.cos(a), 0.03 * math.sin(a), 0.03), (0.35 * math.cos(a), 0.35 * math.sin(a), 1),
                        0.06 + 0.02 * (k % 2), 0.012, 5, [me], root, twist=0.6)
        core_gem(root, (0.0, -0.034, -0.06), 0.02, d, mt)
        if d.get("tassel"):
            tassel(root, (0.0, 0.0, -0.17), 0.24, 80, d["tassel"], seed=5, spread=0.3, r_strand=0.002)
        return root
    filigree_blade(root, head, hw, th, d, mt, me, z0=0.02, t0=0.08, t1=0.5, n=4)
    if d.get("prongs") == "wing":
        # hai cánh gió lưỡi liềm hất ngược, viền kim loại, lõi phát sáng
        for sx in (-1, 1):
            outer = [(sx * (0.04 + 0.2 * math.sin(math.pi * u * 0.5)), -0.02 + 0.22 * u ** 1.6) for u in [i / 20 for i in range(21)]]
            inner = [(sx * (0.04 + 0.12 * math.sin(math.pi * u * 0.5)), 0.01 + 0.17 * u ** 1.3) for u in [i / 20 for i in range(20, -1, -1)]]
            pts = outer + inner
            if sx < 0:
                pts = list(reversed(pts))
            extrude_poly(f"wing{sx}", pts, 0.014, [mt], root, bevel_w=0.002, smooth=True)
            core = [(x * 0.92, z) for x, z in [(sx * (0.05 + 0.15 * math.sin(math.pi * u * 0.5)), 0.0 + 0.19 * u ** 1.45)
                                                for u in [i / 20 for i in range(1, 20)]]]
            curve_obj(f"wing_core{sx}", [[(x, 0.0, z) for x, z in core]], 0.004, me, root)
        core_gem(root, (0.0, -0.04, -0.03), 0.026, d, mt)
        rune_ring(root, (0.0, 0.0, -0.08), 0.1, d, me, tilt=(math.radians(78), math.radians(8)), n=16)
        motes(root, lambda t: (0.0, 0.0, -0.25 + 0.7 * t), d.get("motes", 40), d, spread=0.12)
        if d.get("tassel"):
            tassel(root, (0.0, 0.0, -0.17), 0.26, 90, d["tassel"], seed=5, spread=0.3, r_strand=0.002)
        return root
    # chạc sét: hai nhánh zíc zắc hất lên, viền kim loại, lõi phát sáng
    k = d.get("bolt_scale", 1.35)
    bolt = [(k * x, k * z) for x, z in ((0.03, 0.0), (0.1, -0.02), (0.085, 0.03), (0.17, 0.02), (0.13, 0.08),
                                         (0.2, 0.13), (0.1, 0.1), (0.115, 0.06), (0.05, 0.07), (0.035, 0.04))]
    inner = [(k * x, k * z) for x, z in ((0.05, 0.012), (0.095, 0.0), (0.085, 0.04), (0.14, 0.04), (0.12, 0.075),
                                          (0.15, 0.1), (0.09, 0.08), (0.1, 0.05), (0.05, 0.05))]
    for sx in (-1, 1):
        b = [(sx * x, z) for x, z in bolt]
        i = [(sx * x, z) for x, z in inner]
        if sx < 0:
            b, i = list(reversed(b)), list(reversed(i))
        extrude_poly(f"bolt{sx}", b, 0.014, [mt], root, bevel_w=0.002)
        extrude_poly(f"bolt_core{sx}", i, 0.018, [me], root)
    core_gem(root, (0.0, -0.04, -0.03), 0.026, d, mt)
    rune_ring(root, (0.0, 0.0, -0.08), 0.1, d, me, tilt=(math.radians(78), math.radians(8)), n=16)
    motes(root, lambda t: (0.0, 0.0, -0.25 + 0.7 * t), d.get("motes", 40), d, spread=0.12)
    if d.get("tassel"):
        tassel(root, (0.0, 0.0, -0.17), 0.26, 90, d["tassel"], seed=5, spread=0.3, r_strand=0.002)
    return root


# ---------------------------------------------------------------- pháp khí: quả cầu lơ lửng

def build_orb_ornate(d):
    root = empty()
    mt = trim(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 7))
    # lõi mực xoáy phát sáng trong vỏ pha lê
    m, n = new_mat("ink")
    co = n.obj_co()
    swirl = n.noise(n.node("ShaderNodeMapping", co, ins={"Scale": (7, 7, 3)}).outputs[0], 3.0, 6, 0.6)
    band = n.math("SUBTRACT", 1, n.smooth(0.0, 0.06, n.math("ABSOLUTE", n.math("SUBTRACT", swirl, 0.5))))
    n.principled(n.mixc(band, hexc(d.get("orb", "#0e2a28")), hexc(d["glow"])), 0.0, 0.2, emit=hexc(d["glow"]),
                 emit_strength=n.math("MULTIPLY", band, d.get("core", 5)))
    R0 = 0.12
    sphere("ink_core", (0, 0, 0), R0 * 0.8, [m], root, 48)
    sphere("shell", (0, 0, 0), R0, [mat_gem("shell", hexc("#e8fffb"), None, 0, 0.01)], root, 64)
    # lồng kim loại: bốn kinh tuyến, chóp và đáy có ngọc
    for k in range(4):
        a = TAU * k / 8
        mer = [(R0 * 1.06 * math.sin(b) * math.cos(a), R0 * 1.06 * math.sin(b) * math.sin(a), R0 * 1.06 * math.cos(b))
               for b in [math.pi * i / 48 for i in range(49)]]
        curve_obj(f"cage{k}", [mer], 0.004, mt, root)
    lathe("crown", [(0.0, R0 * 1.02), (0.035, R0 * 1.02), (0.03, R0 * 1.14), (0.012, R0 * 1.28), (0.0, R0 * 1.3)], 8,
          [mt], root, sharp_deg=20)
    lathe("heel", [(0.0, -R0 * 1.34), (0.012, -R0 * 1.3), (0.03, -R0 * 1.12), (0.035, -R0 * 1.02), (0.0, -R0 * 1.02)],
          8, [mt], root, sharp_deg=20)
    core_gem(root, (0, 0, R0 * 1.42), 0.018, d, mt, axis="Z", facets=6)
    core_gem(root, (0, 0, -R0 * 1.48), 0.016, d, mt, axis="Z", facets=6)
    # hai vòng thiên văn chạm vạch, nghiêng chéo nhau
    for k, (rr, ax, ay) in enumerate(((0.2, 1.15, 0.3), (0.235, 0.35, -0.9))):
        pts, ticks = [], []
        for i in range(144):
            a = TAU * i / 144
            x, y = rr * math.cos(a), rr * math.sin(a)
            y2, z2 = y * math.cos(ax), y * math.sin(ax)
            pts.append((x * math.cos(ay) + z2 * math.sin(ay), y2, -x * math.sin(ay) + z2 * math.cos(ay)))
            if i % 6 == 0:
                x, y = (rr + 0.012) * math.cos(a), (rr + 0.012) * math.sin(a)
                y2, z2 = y * math.cos(ax), y * math.sin(ax)
                ticks.append([pts[-1], (x * math.cos(ay) + z2 * math.sin(ay), y2, -x * math.sin(ay) + z2 * math.cos(ay))])
        curve_obj(f"armil{k}", [pts], 0.0055, mt, root, cyclic=True)
        curve_obj(f"armil_tick{k}", ticks, 0.0018, me, root)
    # vòng ma pháp phẳng bên dưới và mảnh tinh thể bay quanh
    rune_ring(root, (0, 0, -0.165), 0.12, d, me, tilt=(math.radians(82), 0.0), n=20, seed=9)
    shard = mat_gem("shard", hexc(d.get("gem", "#bffff0")), hexc(d["glow"]), 5, 0.03)
    for k in range(5):
        a = TAU * k / 5 + 0.4
        crystal(f"shard{k}", (0.3 * math.cos(a), 0.3 * math.sin(a) * 0.4, 0.06 * math.sin(3 * a)),
                (0.25 * math.cos(a), 0.2, 1.0), 0.07, 0.012, 5, [shard], root)
    motes(root, lambda t: (0.28 * math.cos(TAU * t), 0.12 * math.sin(TAU * t), -0.12 + 0.3 * t), d.get("motes", 50), d,
          spread=0.06)
    return root


def _rot(pts, a):
    c, s = math.cos(a), math.sin(a)
    return [(x * c - z * s, x * s + z * c) for x, z in pts]


def build_wind_compass(d):
    """La bàn gió bạc: bốn cánh cong xoay quanh viên ngọc lục nhỏ, vành la bàn khắc vạch. Không có vòng thiên văn."""
    root = empty()
    silver = mat_metal("silver", hexc(d.get("gold", "#c4ccd4")), 0.22)
    dark = mat_metal("silver_dark", hexc(d.get("cavity", "#3a444c")), 0.4)
    mt = trim(d)
    me = mat_emit("wind", hexc(d["glow"]), d.get("glow_strength", 2.5))
    R = 0.2
    # vành la bàn: hai vòng bạc lồng nhau, vạch khắc 32 hướng
    for k, (rr, th, m) in enumerate(((R, 0.009, mt), (R * 0.9, 0.005, dark))):
        curve_obj(f"rim{k}", [[(rr * math.cos(TAU * i / 96), 0.0, rr * math.sin(TAU * i / 96)) for i in range(96)]],
                  th, m, root, cyclic=True)
    ticks = []
    for i in range(32):
        a = TAU * i / 32
        r0 = R * (0.84 if i % 4 else 0.8)
        ticks.append([(r0 * math.cos(a), 0.004, r0 * math.sin(a)), (R * 0.88 * math.cos(a), 0.004, R * 0.88 * math.sin(a))])
    curve_obj("ticks", ticks, 0.0016, silver, root)
    # bốn mũi hướng chính nhô ra khỏi vành, mũi bắc dài hơn
    for k in range(4):
        L = 0.09 if k == 1 else 0.06
        tri = _rot([(R * 0.98, -0.018), (R + L, 0.0), (R * 0.98, 0.018)], TAU * k / 4)
        extrude_poly(f"point{k}", tri, 0.008, [mt], root, bevel_w=0.002)
    # bốn cánh chong chóng cong, mỗi cánh có đường gân phát sáng nhẹ
    vane = [(0.035, -0.012), (0.08, -0.03), (0.13, -0.03), (0.165, -0.006), (0.15, 0.022), (0.1, 0.03), (0.045, 0.014)]
    for k in range(4):
        a = TAU * k / 4 + math.radians(d.get("spin", 20))
        extrude_poly(f"vane{k}", _rot(vane, a), 0.006, [silver], root, y=0.012 * (k % 2), bevel_w=0.0015)
        vein = [(x * math.cos(a) - z * math.sin(a), 0.016 + 0.012 * (k % 2), x * math.sin(a) + z * math.cos(a))
                for x, z in [(0.045, 0.0), (0.09, -0.004), (0.14, 0.004)]]
        curve_obj(f"vein{k}", [vein], 0.0022, me, root)
    # trục giữa và viên ngọc lục nhỏ
    curve_obj("hub", [[(0.04 * math.cos(TAU * i / 32), 0.0, 0.04 * math.sin(TAU * i / 32)) for i in range(32)]], 0.008,
              mt, root, cyclic=True)
    core_gem(root, (0, 0.012, 0), 0.026, d, mt, axis="Y", facets=8)
    # quai treo và ngọc rủ phía dưới
    lathe("stem", [(0.0, -R - 0.075), (0.008, -R - 0.07), (0.006, -R - 0.03), (0.01, -R - 0.005), (0.0, -R)], 8,
          [mt], root, sharp_deg=25)
    crystal("drop", (0, 0, -R - 0.075), (0, 0, -1), 0.05, 0.012, 6,
            [mat_gem("drop", hexc(d.get("gem", "#c8ffe0")), hexc(d["glow"]), 2, 0.03)], root)
    # vệt gió mảnh quấn quanh vành
    if not d.get("icon"):
        for k in range(3):
            a0 = TAU * k / 3
            pts = [((R + 0.03 + 0.03 * t) * math.cos(a0 + 1.6 * t), 0.02 - 0.04 * t,
                    (R + 0.03 + 0.03 * t) * math.sin(a0 + 1.6 * t)) for t in [i / 24 for i in range(25)]]
            curve_obj(f"gust{k}", [pts], 0.0018, me, root)
    motes(root, lambda t: ((R + 0.05) * math.cos(TAU * t), 0.02, (R + 0.05) * math.sin(TAU * t)), d.get("motes", 10), d,
          spread=0.03)
    return root


# ---------------------------------------------------------------- đại kiếm

def build_great_ornate(d):
    root = empty()
    r5 = d["r"] >= 5
    L, bw = d.get("length", 1.15), d.get("width", 0.13)
    mb, mt = mat_blade(d), trim(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 6 if r5 else 3))

    def hw(t):
        s = 1 - 0.12 * t
        if r5 and t < 0.12:
            s *= 1 + 0.25 * (1 - t / 0.12) ** 2
        w = bw * s if t < 0.86 else bw * s * max(0.0, 1 - ((t - 0.86) / 0.14) ** 1.6) ** 0.7
        return (w, w)

    th = lambda t: 0.04 * (1 - 0.5 * t)
    blade("blade", L, hw, th, SEC_DOUBLE, None, mats=[mb], parent=root, smooth=False)
    if r5:
        filigree_blade(root, L, hw, th, d, mt, me, t1=0.6, n=8)
    else:
        for side in (-1, 1):
            fz = [(0.0, side * 0.52 * th(t), t * L) for t in [0.04 + 0.6 * i / 60 for i in range(61)]]
            curve_obj(f"fuller_core{side}", [fz], 0.003, me, root)
    span, gs = d.get("guard_span", 0.2), d.get("guard", "bar")
    mg = mt if r5 else mat_metal("guard", hexc(d.get("gold", "#a88a60")), 0.3)
    if gs == "bell":
        lathe("guard", [(0.03, -0.09), (0.06, -0.07), (span * 0.75, -0.02), (span * 0.8, 0.0), (0.05, 0.02)], 64, [mg], root)
        curve_obj("guard_band", [[(span * 0.7 * math.cos(TAU * i / 96), span * 0.7 * math.sin(TAU * i / 96), -0.03)
                                  for i in range(96)]], 0.003, me, root, cyclic=True)
    elif gs == "sun":
        extrude_poly("guard", star_poly(16, span * 0.75, span * 0.5, 0, -0.02), 0.05, [mg], root, bevel_w=0.004)
        extrude_poly("guard_core", star_poly(8, span * 0.32, span * 0.16, 0, -0.02), 0.012, [me], root, y=-0.028)
    else:
        # thanh ngang có hai móc vuốt lên ôm chân lưỡi
        pts = [(-span, 0.03), (-span * 0.9, 0.0), (-0.06, 0.0), (0.06, 0.0), (span * 0.9, 0.0), (span, 0.03),
               (span * 0.96, -0.02), (span * 0.6, -0.06), (-span * 0.6, -0.06), (-span * 0.96, -0.02)]
        extrude_poly("guard", pts, 0.062, [mg], root, bevel_w=0.006, smooth=True)
    core_gem(root, (0.0, -0.034, -0.03), 0.034 if r5 else 0.024, d, mt)
    gl = d.get("grip_len", 0.36)
    wrap = mat_cloth("wrap", hexc(d.get("wrap", "#3d2a1c")), 0.4, 0.7)
    grip(root, -0.06 - gl, -0.06, 0.028, 0.03, d, wrap, mat_metal("core", hexc("#1a1410"), 0.4), turns=9)
    pz = -0.06 - gl
    lathe("pommel", [(0.03, pz), (0.048, pz - 0.02), (0.05, pz - 0.045), (0.03, pz - 0.065), (0, pz - 0.07)], 48, [mt], root)
    if r5:
        crystal("pommel_gem", (0, 0, pz - 0.066), (0, 0, -1), 0.07, 0.018, 6, [mat_gem("pg", hexc(d.get("gem", d["glow"])),
                hexc(d["glow"]), 6)], root)
        motes(root, lambda t: (0.0, 0.0, -0.05 + 1.1 * t * L), d.get("motes", 46), d, spread=0.14)
    if d.get("tassel"):
        tassel(root, (0.0, 0.0, pz - 0.07), 0.24, 80, d["tassel"], seed=9, spread=0.3)
    return root


# ---------------------------------------------------------------- cung

def build_bow_ornate(d):
    """Cung cơ bản (models) cộng viền kim loại dọc cánh, lõi đá ở tay cầm; 5★ thêm vây tinh thể, hạt sáng."""
    root = build_bow(d)
    r5 = d["r"] >= 5
    mt = trim(d)
    me = mat_emit("accent", hexc(d["glow"]), d.get("glow_strength", 5))
    H, rec = d.get("half", 0.62), d.get("recurve", 0.06)
    curve = lambda t: -0.16 * math.sin(math.pi * min(1.0, t / 0.85) * 0.5) + rec * max(0.0, (t - 0.8) / 0.2) ** 2
    for sgn in (1, -1):
        for sx in ((-1, 1) if r5 else (1,)):
            pts = [(curve(t) + sx * 0.02 * (1 - 0.55 * t), -0.012, sgn * (0.08 + H * t)) for t in [0.06 + 0.86 * i / 50 for i in range(51)]]
            curve_obj(f"limb_trim{sgn}{sx}", [pts], 0.0024, mt, root)
        lathe(f"limb_band{sgn}", [(0.03, sgn * 0.1 - 0.012), (0.036, sgn * 0.1), (0.03, sgn * 0.1 + 0.012)], 24, [mt], root)
    core_gem(root, (0.0, -0.034, 0.0), 0.03 if r5 else 0.022, d, mt)
    if r5:
        for sgn in (1, -1):  # vây tinh thể hất ra từ hai đầu tay cầm
            for k in range(3):
                crystal(f"fin{sgn}{k}", (-0.02, 0.0, sgn * (0.1 + 0.02 * k)), (-0.8, 0.0, sgn * (0.6 + 0.3 * k)),
                        0.1 - 0.02 * k, 0.012, 5, [mat_gem(f"fin{sgn}{k}", hexc(d.get("gem", d["glow"])), hexc(d["glow"]), 5)], root)
            tip = (curve(1.0), 0.0, sgn * (0.08 + H))
            crystal(f"tip_gem{sgn}", tip, (0.2, 0.0, sgn), 0.06, 0.014, 6, [me], root)
        motes(root, lambda t: (curve(abs(2 * t - 1)) - 0.02, 0.0, (2 * t - 1) * (0.08 + H)), d.get("motes", 46), d, spread=0.1)
    return root


def build_sword_crystal(d):
    """Kiếm một lưỡi chắn tay tinh thể (models) cộng lõi đá ở chắn tay, tinh thể đốc và hạt sáng cho 5★."""
    root = build_sword(d)
    mt = trim(d)
    core_gem(root, (0.0, -0.02, -0.02), 0.026, d, mt)
    L = d.get("length", 1.0)
    crystal("pommel_ice", (0, 0, -0.34), (0, 0, -1), 0.07, 0.016, 6, [mat_gem("pi", hexc(d.get("gem", d["glow"])),
            hexc(d["glow"]), 7)], root)
    motes(root, lambda t: (0.0, 0.0, 0.02 + 1.0 * t * L), d.get("motes", 46), d, spread=0.1)
    return root


# ---------------------------------------------------------------- pháp khí khác

def build_crystal_bloom(d):
    """Tinh thể băng dài lơ lửng, trong lòng là đóa hoa đỏ phát sáng; nôi kim loại chạm ôm hai đầu, mảnh băng bay quanh."""
    root = empty()
    mt = trim(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 5))
    ice = mat_gem("ice", hexc(d.get("ice", "#cdeeff")), hexc(d["glow"]), d.get("core", 0.3), 0.015)
    lathe("crystal", [(0.0, -0.26), (0.1, -0.1), (0.12, 0.0), (0.1, 0.12), (0.0, 0.3)], 6, [ice], root, sharp_deg=10)
    petal = mat_cloth("petal", hexc(d.get("flower", "#d8243a")), 0.9, 0.45, 80)
    petal_e = mat_emit("petal_glow", hexc(d.get("flower", "#ff3050")), 4.0)
    for ring_i, (n_p, r0, sz, z) in enumerate(((6, 0.0, 0.075, 0.0), (5, 0.018, 0.058, 0.02), (4, 0.0, 0.038, 0.04))):
        for k in range(n_p):
            a = TAU * k / n_p + ring_i * 0.6
            pts = [(0.0, 0.0), (sz * 0.45, sz * 0.5), (sz * 0.2, sz), (-sz * 0.2, sz), (-sz * 0.45, sz * 0.5)]
            o = extrude_poly(f"petal{ring_i}_{k}", pts, 0.003, [petal if ring_i < 2 else petal_e], root, smooth=True)
            o.rotation_euler = (math.radians(70 - ring_i * 20), 0, a)
            o.location = (r0 * math.cos(a), r0 * math.sin(a), z - 0.02)
    lathe("stem", [(0.003, -0.16), (0.003, -0.02)], 10, [mat_cloth("stem", hexc("#2a5a2a"), 0.2, 0.6)], root)
    # nôi kim loại: vành chạm ở eo dưới và chóp trên, bốn nhánh cong ôm thân tinh thể
    for zz, rr in ((-0.12, 0.1), (0.16, 0.085)):
        curve_obj(f"cradle_ring{zz}", [[(rr * math.cos(TAU * i / 64), rr * math.sin(TAU * i / 64), zz) for i in range(64)]],
                  0.006, mt, root, cyclic=True)
    for k in range(4):
        a = TAU * k / 4 + 0.4
        arm = [(0.1 * math.cos(a) * (1 + 0.25 * math.sin(math.pi * u)), 0.1 * math.sin(a) * (1 + 0.25 * math.sin(math.pi * u)),
                -0.12 + 0.28 * u) for u in [i / 24 for i in range(25)]]
        curve_obj(f"cradle_arm{k}", [arm], 0.004, mt, root)
        crystal(f"cradle_tip{k}", (0.1 * math.cos(a), 0.1 * math.sin(a), -0.12), (math.cos(a) * 0.4, math.sin(a) * 0.4, -1),
                0.08, 0.008, 4, [mt], root)
    core_gem(root, (0, 0, -0.31), 0.02, d, mt, axis="Z", facets=6)
    rune_ring(root, (0, 0, -0.36), 0.1, d, me, tilt=(math.radians(82), 0.0), n=16, seed=4)
    shard = mat_gem("shard", hexc("#e8f8ff"), hexc(d["glow"]), 2, 0.02)
    for k in range(6):
        a = TAU * k / 6 + 0.3
        crystal(f"shard{k}", (0.22 * math.cos(a), 0.22 * math.sin(a) * 0.4, 0.05 * math.sin(2 * a)), (0.2 * math.cos(a), 0.2, 1),
                0.06, 0.012, 6, [shard], root)
    motes(root, lambda t: (0.22 * math.cos(TAU * t), 0.1 * math.sin(TAU * t), -0.2 + 0.4 * t), d.get("motes", 40), d)
    return root


def build_bell_ornate(d):
    """Chuông phép: thân bạc có ba dải ký tự phát sáng, quai có ngọc, quả lắc tinh thể, vòng gợn nước bên dưới."""
    root = empty()
    mt = trim(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 5))
    body = mat_aged("silver", hexc(d.get("metal", "#cfd6de")), hexc("#2a3038"), 0.2)
    prof = [(0.0, 0.2), (0.05, 0.2), (0.09, 0.17), (0.11, 0.08), (0.13, -0.04), (0.17, -0.14), (0.175, -0.16),
            (0.15, -0.16), (0.12, -0.1), (0.0, -0.1)]
    lathe("bell", prof, 64, [body], root)
    lathe("lip", [(0.168, -0.15), (0.186, -0.158), (0.18, -0.172), (0.162, -0.166)], 64, [mt], root)
    lathe("shoulder", [(0.07, 0.19), (0.098, 0.165), (0.104, 0.15), (0.092, 0.16)], 64, [mt], root)
    R = rng(7)
    for z, r in ((0.1, 0.108), (0.0, 0.122), (-0.1, 0.152)):
        glyphs = []
        for k in range(14):
            a = TAU * k / 14
            for _ in range(R.randint(2, 3)):
                a0, a1 = a + R.uniform(-0.08, 0.08), a + R.uniform(-0.08, 0.08)
                z0, z1 = z + R.uniform(-0.018, 0.018), z + R.uniform(-0.018, 0.018)
                glyphs.append([((r + 0.003) * math.cos(a0), (r + 0.003) * math.sin(a0), z0),
                               ((r + 0.003) * math.cos(a1), (r + 0.003) * math.sin(a1), z1)])
        if not d.get("icon") or z == 0.0:
            curve_obj(f"glyph{z}", glyphs, 0.0022, me, root)
        for dz in (-0.028, 0.028):
            rz = r + (0.012 if dz < 0 else -0.006) * (1 if z < 0.05 else 0.4)
            curve_obj(f"band{z}{dz}", [[(rz * math.cos(TAU * i / 96), rz * math.sin(TAU * i / 96), z + dz) for i in range(96)]],
                      0.003, mt, root, cyclic=True)
    curve_obj("loop", [[(0, 0, 0.2), (0.06, 0, 0.27), (0, 0, 0.33), (-0.06, 0, 0.27), (0, 0, 0.2)]], 0.009, mt, root, kind="BEZIER")
    core_gem(root, (0, -0.012, 0.27), 0.022, d, mt)
    crystal("clapper", (0, 0, -0.1), (0, 0, -1), 0.11, 0.024, 8, [mat_gem("clap", hexc(d.get("gem", d["glow"])), hexc(d["glow"]), 7)], root)
    for k, rr in enumerate((0.14, 0.2)):
        curve_obj(f"ripple{k}", [[(rr * math.cos(TAU * i / 96), rr * math.sin(TAU * i / 96), -0.24 - 0.01 * k) for i in range(96)]],
                  0.003, me, root, cyclic=True)
    motes(root, lambda t: (0.2 * math.cos(TAU * t), 0.1 * math.sin(TAU * t), -0.2 + 0.4 * t), d.get("motes", 40), d)
    return root


def build_lantern_ornate(d):
    """Đèn phép 4★: lồng kim loại sáu cạnh, kính mờ, lõi lửa tinh thể bên trong, mái chóp và quai."""
    root = empty()
    mt = mat_metal("cage", hexc(d.get("gold", "#5a5a60")), 0.3)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 4))
    glass = mat_gem("glass", hexc("#fff4dc"), None, 0, 0.12)
    lathe("glass", [(0.0, -0.15), (0.1, -0.15), (0.12, 0.0), (0.1, 0.15), (0.0, 0.15)], 6, [glass], root, sharp_deg=10)
    for k in range(6):
        a = TAU * k / 6
        rib = [(r * 1.04 * math.cos(a), r * 1.04 * math.sin(a), z) for r, z in ((0.1, -0.16), (0.12, 0.0), (0.1, 0.16))]
        curve_obj(f"rib{k}", [rib], 0.006, mt, root, kind="BEZIER")
    lathe("base", [(0.0, -0.22), (0.07, -0.21), (0.12, -0.17), (0.11, -0.15), (0.0, -0.15)], 6, [mt], root, sharp_deg=20)
    lathe("roof", [(0.0, 0.15), (0.13, 0.16), (0.14, 0.18), (0.06, 0.24), (0.02, 0.29), (0.0, 0.3)], 6, [mt], root, sharp_deg=20)
    curve_obj("handle", [[(0, 0, 0.3), (0.07, 0, 0.38), (0, 0, 0.45), (-0.07, 0, 0.38), (0, 0, 0.3)]], 0.007, mt, root, kind="BEZIER")
    fire = mat_gem("fire", hexc(d.get("gem", d["glow"])), hexc(d["glow"]), d.get("core_glow", 6), 0.03)
    crystal("flame", (0, 0, -0.08), (0, 0, 1), 0.2, 0.045, 6, [fire], root, twist=0.5)
    for k in range(3):
        a = TAU * k / 3
        crystal(f"flame_s{k}", (0.03 * math.cos(a), 0.03 * math.sin(a), -0.08), (0.3 * math.cos(a), 0.3 * math.sin(a), 1),
                0.11, 0.022, 5, [me], root, twist=0.4)
    if d.get("tassel"):
        tassel(root, (0.0, 0.0, -0.22), 0.14, 50, d["tassel"], seed=2, spread=0.15)
    return root


def build_moon_mirror(d):
    """Gương trăng 4★: khung bạc tám mũi, mặt gương sáng, trăng khuyết bằng ngọc phát sáng, dây treo và tua."""
    root = empty()
    mt = mat_metal("frame", hexc(d.get("gold", "#d0b070")), 0.22)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 3))
    extrude_poly("frame", star_poly(8, 0.2, 0.165, 0, 0, rot=math.pi / 8), 0.03, [mt], root, bevel_w=0.004)
    circ = lambda r, cx=0.0, cz=0.0, n=64: [(cx + r * math.cos(TAU * i / n), cz + r * math.sin(TAU * i / n)) for i in range(n)]
    extrude_poly("mirror", circ(0.15), 0.036, [mat_metal("mirror", hexc("#e8f0f4"), 0.04)], root)
    jade = mat_gem("jade", hexc(d.get("jade", "#cfe8e4")), hexc(d["glow"]), d.get("core", 2.5), 0.08)
    moon = circ(0.1)
    cut = circ(0.085, 0.045, 0.03)
    crescent = [p for p in moon if (p[0] - 0.045) ** 2 + (p[1] - 0.03) ** 2 > 0.085 ** 2]
    crescent += [p for p in reversed(cut) if p[0] ** 2 + p[1] ** 2 < 0.1 ** 2]
    extrude_poly("crescent", crescent, 0.01, [jade], root, y=-0.022, smooth=True)
    curve_obj("mirror_ring", [[(0.152 * math.cos(TAU * i / 96), -0.019, 0.152 * math.sin(TAU * i / 96)) for i in range(96)]],
              0.003, me, root, cyclic=True)
    lathe("bail", [(0, 0.2), (0.02, 0.21), (0.022, 0.23), (0.018, 0.25), (0, 0.26)], 24, [mt], root)
    cord = mat_cloth("cord", hexc(d.get("cord", "#3a5a8a")), 0.6, 0.6)
    curve_obj("cord", [[(0, 0, 0.26), (0.0, 0, 0.36), (0.03, 0, 0.44)]], 0.006, cord, root, kind="BEZIER")
    tassel(root, (0.0, 0.0, -0.2), 0.2, 60, d.get("cord", "#3a5a8a"), seed=6, spread=0.12)
    return root


BUILDERS_ORNATE = {"sword_ornate": build_sword_ornate, "spear_ornate": build_spear_ornate,
                   "orb_ornate": build_orb_ornate, "wind_compass": build_wind_compass,
                   "great_ornate": build_great_ornate, "bow_ornate": build_bow_ornate,
                   "sword_crystal": build_sword_crystal, "crystal_bloom": build_crystal_bloom,
                   "bell_ornate": build_bell_ornate, "lantern_ornate": build_lantern_ornate,
                   "moon_mirror": build_moon_mirror}
