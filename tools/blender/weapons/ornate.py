"""Bộ dựng vòng nâng cấp ảnh: 5★ chạm nhiều lớp, lõi năng lượng, hạt sáng; 4★ một điểm nhấn; pháp khí ra dáng vũ khí phép.
Chọn bằng `builder` trong designs.py. Hình khối và hoa văn tự sinh, không chép thiết kế có sẵn.
"""
import math

from lib import TAU, blade, crystal, curve_obj, empty, extrude_poly, hexc, lathe, mat_aged, mat_cloth, mat_emit, mat_gem
from lib import mat_metal, new_mat, rng
from models import SEC_DOUBLE, grip, mat_blade, tassel


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
    filigree_blade(root, head, hw, th, d, mt, me, z0=0.02, t0=0.08, t1=0.5, n=4)
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


BUILDERS_ORNATE = {"sword_ornate": build_sword_ornate, "spear_ornate": build_spear_ornate,
                   "orb_ornate": build_orb_ornate, "wind_compass": build_wind_compass}
