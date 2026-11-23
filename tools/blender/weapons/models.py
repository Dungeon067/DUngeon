"""Bộ dựng hình theo loại vũ khí. Mỗi hàm nhận `d` (thiết kế, xem designs.py) và trả về gốc (Empty)."""
import math

from lib import (TAU, blade, bevel, crystal, curve_obj, empty, extrude_poly, helix, hexc, lathe, mat_aged, mat_cloth,
                 mat_emit, mat_gem, mat_metal, new_mat, rng, star_poly)

SEC_DOUBLE = [(-1, 0), (-0.72, 0.62), (-0.18, 1.0), (0.18, 1.0), (0.72, 0.62), (1, 0), (0.72, -0.62), (0.18, -1.0),
              (-0.18, -1.0), (-0.72, -0.62)]
# Lưỡi một cạnh (cạnh sắc ở u = -1, sống ở u = +1), có đường gờ chia mặt.
SEC_SINGLE = [(-1, 0), (0.25, 0.92), (0.82, 0.78), (1, 0.32), (1, -0.32), (0.82, -0.78), (0.25, -0.92)]


# ---------------------------------------------------------------- vật liệu lưỡi

def mat_blade(d, name="blade"):
    """Thép lưỡi: cạnh mài sáng, thân có hoa văn khắc, đường lửa/băng/sét phát sáng theo nguyên tố."""
    m, n = new_mat(name)
    u, v = n.uv()
    cu = n.math("ABSOLUTE", n.math("SUBTRACT", n.math("MULTIPLY", u, 2), 1))  # 0 giữa, 1 ở cạnh
    single = d.get("single_edge", False)
    edge_pos = n.math("SUBTRACT", 1, u) if single else cu
    base = hexc(d["steel"])
    edge_col = hexc(d.get("edge", "#e8edf2"))
    body = base
    rough = 0.22
    height = 0.0
    glow = 0.0
    motif = d.get("blade_motif")
    co = n.obj_co()
    if single:
        # đường vân tôi (hamon) dạng sóng
        wave = n.math("ADD", 0.42, n.math("MULTIPLY", n.math("SINE", n.math("MULTIPLY", v, 46)), 0.05))
        wave = n.math("ADD", wave, n.math("MULTIPLY", n.noise(co, 9, 3), 0.08))
        ham = n.smooth(0.0, 0.05, n.math("SUBTRACT", wave, n.math("MULTIPLY", u, 1.0)))
        body = n.mixc(ham, base, edge_col)
        if d.get("hamon_glow"):
            line = n.math("SUBTRACT", 1, n.smooth(0.0, 0.025, n.math("ABSOLUTE", n.math("SUBTRACT", wave, u))))
            glow = n.math("MULTIPLY", line, d["hamon_glow"])
    else:
        em = n.smooth(0.66, 0.74, edge_pos)
        body = n.mixc(em, base, edge_col)
    if motif == "feather":
        # lông chim xếp chữ V dọc thân lưỡi
        f = n.math("FRACT", n.math("ADD", n.math("MULTIPLY", v, 22), n.math("MULTIPLY", cu, 1.6)))
        lines = n.math("MULTIPLY", n.smooth(0.82, 0.9, f), n.math("SUBTRACT", 1, n.smooth(0.42, 0.55, cu)))
        lines = n.math("MULTIPLY", lines, n.smooth(0.05, 0.12, v))
        height = n.math("MULTIPLY", lines, -1)
        body = n.mixc(lines, body, hexc(d.get("motif_col", "#c9a24a")))
        if d.get("motif_glow"):
            glow = n.math("ADD", glow, n.math("MULTIPLY", lines, d["motif_glow"]))
    elif motif == "veins":
        vo = n.voronoi(n.node("ShaderNodeMapping", co, ins={"Scale": (6, 6, 1.4)}).outputs[0], 3.0)
        lines = n.math("SUBTRACT", 1, n.smooth(0.0, 0.05, vo))
        lines = n.math("MULTIPLY", lines, n.math("SUBTRACT", 1, n.smooth(0.3, 0.5, cu)))
        height = n.math("MULTIPLY", lines, -0.6)
        glow = n.math("ADD", glow, n.math("MULTIPLY", lines, d.get("motif_glow", 0)))
        body = n.mixc(lines, body, hexc(d.get("motif_col", "#c9a24a")))
    if d.get("fuller_glow"):
        line = n.math("SUBTRACT", 1, n.smooth(0.03, 0.09, cu))
        line = n.math("MULTIPLY", line, n.math("SUBTRACT", 1, n.smooth(0.55, 0.8, v)))
        glow = n.math("ADD", glow, n.math("MULTIPLY", line, d["fuller_glow"]))
    normal = n.bump(height, 0.6, 0.01) if not isinstance(height, float) else None
    gc = hexc(d["glow"])
    emit_strength = glow if not isinstance(glow, float) else 0.0
    n.principled(body, 1.0, rough, normal=normal, emit=gc, emit_strength=emit_strength, aniso=0.3)
    return m


def gold(d, name="gold"):
    return mat_aged(name, hexc(d.get("gold", "#e0a94a")), hexc(d.get("cavity", "#3a2412")), 0.28)


# ---------------------------------------------------------------- chi tiết

def grip(root, z0, z1, r0, r1, d, wrap_mat, core_mat, turns=7):
    rz = lambda z: r0 + (r1 - r0) * (z - z0) / (z1 - z0)
    lathe("grip", [(r0 * 0.96, z0), (r1 * 0.96, z1)], 32, [core_mat], root)
    w = []
    for k in range(2):
        w.append(helix(lambda z: rz(z) * 1.02, z0, z1, turns, phase=k * math.pi, steps=320, y_scale=1.0))
        w.append(helix(lambda z: rz(z) * 1.02, z0, z1, -turns, phase=k * math.pi, steps=320))
    curve_obj("wrap", w, (r0 + r1) * 0.13, wrap_mat, root, bevel_res=2)


def lac_bird_guard(root, z, span, d, mat_g, mat_emit_):
    """Chắn tay hình hai cánh chim Lạc dang ra, giữa là mặt trống đồng có ngôi sao 12 cánh."""
    feathers = 6
    half = []
    for i in range(feathers + 1):
        t = i / feathers
        x = 0.05 * span + t * span
        zc = z + 0.06 * span + 0.55 * span * t ** 1.6
        half.append((x, zc + 0.12 * span * (1 - t)))
    lower = []
    for i in range(feathers, -1, -1):
        t = i / feathers
        x = 0.05 * span + t * span
        zc = z + 0.06 * span + 0.55 * span * t ** 1.6
        lower.append((x, zc - 0.10 * span - 0.05 * span * (1 - t)))
        if i > 0:
            xm = 0.05 * span + (t - 0.5 / feathers) * span
            lower.append((xm + 0.03 * span, zc - 0.22 * span * (0.6 + 0.4 * t)))
    right = half + lower
    pts = [(-x, zz) for (x, zz) in reversed(right)] + right
    # ghép thành một hình: nửa trái đảo chiều nối nửa phải qua phần giữa
    left = [(-x, zz) for (x, zz) in right]
    poly = right + [(0.0, z - 0.14 * span)] + list(reversed(left))
    poly = list(reversed(right)) + [(0.0, z + 0.2 * span)] + left
    extrude_poly("guard_wing_r", right + [(0.0, z - 0.12 * span), (0.0, z + 0.16 * span)], 0.045 * span,
                 [mat_g], root, bevel_w=0.006 * span)
    extrude_poly("guard_wing_l", [(-x, zz) for (x, zz) in right] + [(0.0, z - 0.12 * span), (0.0, z + 0.16 * span)],
                 0.045 * span, [mat_g], root, bevel_w=0.006 * span)
    # gân lông vũ phát sáng trên mặt cánh
    sp = []
    for sgn in (-1, 1):
        for i in range(1, feathers + 1):
            t = i / feathers
            x = 0.05 * span + t * span
            zc = z + 0.06 * span + 0.55 * span * t ** 1.6
            sp.append([(sgn * x * 0.25, -0.03 * span, z + 0.02 * span), (sgn * (x - 0.02 * span), -0.03 * span, zc - 0.02 * span)])
    curve_obj("guard_vein", sp, 0.006 * span, mat_emit_, root)
    # mặt trống ở giữa
    r = 0.2 * span
    lathe("drum", [(0, -0.05 * span), (r, -0.05 * span), (r * 1.05, -0.02 * span), (r * 1.05, 0.03 * span),
                   (r, 0.05 * span), (0, 0.05 * span)], 64, [mat_g], root, axis="Y",
          offset=(0, 0, z))
    extrude_poly("drum_star", star_poly(12, r * 0.55, r * 0.25, 0, z), 0.012 * span, [mat_emit_], root,
                 y=-0.055 * span)
    rings = []
    for rr in (0.68, 0.82, 0.95):
        rings.append([(r * rr * math.cos(TAU * i / 96), -0.052 * span, z + r * rr * math.sin(TAU * i / 96))
                      for i in range(96)])
    curve_obj("drum_rings", rings, 0.004 * span, mat_g, root, cyclic=True)


def tassel(root, top, length, n, color, seed=1, spread=0.25, r_strand=0.0018, bead_mat=None):
    R = rng(seed)
    m = mat_cloth("tassel", hexc(color), 0.9, 0.55, 300)
    sp = []
    for i in range(n):
        a = R.random() * TAU
        rr = R.random() * 0.01
        pts = []
        L = length * (0.75 + 0.25 * R.random())
        for k in range(8):
            t = k / 7
            sw = spread * t ** 1.4 * length
            pts.append((top[0] + math.cos(a) * (rr + sw * 0.5) + 0.25 * length * t ** 2,
                        top[1] + math.sin(a) * (rr + sw * 0.3), top[2] - L * t))
        sp.append(pts)
    curve_obj("tassel", sp, r_strand, m, root, kind="BEZIER", bevel_res=1)
    if bead_mat:
        lathe("tassel_bead", [(0, top[2] - 0.03), (0.012, top[2] - 0.02), (0.014, top[2]), (0.012, top[2] + 0.02),
                              (0, top[2] + 0.03)], 24, [bead_mat], root)


# ---------------------------------------------------------------- kiếm đơn

def build_sword(d):
    root = empty()
    L = d.get("length", 1.0)
    bw = d.get("width", 0.075)
    curve_k = d.get("curve", 0.0)
    single = d.get("single_edge", False)
    mb = mat_blade(d)
    mg = gold(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 6))
    if single:
        def hw(t):
            tip = 0.86
            s = 1 - 0.18 * t
            e = bw * s if t < tip else bw * s * math.cos((t - tip) / (1 - tip) * math.pi / 2)
            return (e, bw * s * (0.35 if t < tip else 0.35 * (1 - (t - tip) / (1 - tip))))
        sec = SEC_SINGLE
    else:
        def hw(t):
            s = 1 - 0.25 * t
            w = bw * s if t < 0.82 else bw * s * math.sqrt(max(0.0, 1 - ((t - 0.82) / 0.18) ** 1.3))
            return (w, w)
        sec = SEC_DOUBLE
    blade("blade", L, hw, lambda t: 0.022 * (1 - 0.5 * t), sec, (lambda t: curve_k * t * t) if curve_k else None,
          mats=[mb], parent=root, z0=0.0, smooth=False)
    if d.get("guard") == "lac_bird":
        sp = d.get("guard_span", 0.17)
        lac_bird_guard(root, -0.02, sp, d, mg, me)
        gz = -0.02 - 0.24 * sp
    elif d.get("guard") == "tsuba":
        r = 0.085
        petals = []
        for i in range(120):
            a = TAU * i / 120
            rr = r * (0.86 + 0.14 * abs(math.cos(a * 3)))
            petals.append((rr * math.cos(a), -0.012 + rr * math.sin(a)))
        extrude_poly("tsuba", petals, 0.012, [mg], root, bevel_w=0.002)
        extrude_poly("tsuba_star", star_poly(6, r * 0.55, r * 0.18, 0, -0.012), 0.004, [me], root, y=-0.008)
        lathe("habaki", [(0.028, -0.006), (0.03, 0.05), (0.024, 0.06)], 32, [mg], root)
        gz = -0.02
    else:
        extrude_poly("guard", [(-0.16, -0.01), (0.16, -0.01), (0.12, -0.045), (-0.12, -0.045)], 0.04, [mg], root,
                     bevel_w=0.004)
        gz = -0.045
    gl = d.get("grip_len", 0.26)
    wrap = mat_cloth("wrap", hexc(d.get("wrap", "#7a1f22")), 0.5, 0.6)
    core = mat_metal("core", hexc(d.get("grip_core", "#1a1410")), 0.4)
    grip(root, gz - gl, gz, 0.022, 0.025, d, wrap, core, turns=d.get("wrap_turns", 7))
    lathe("collar", [(0.026, gz - 0.012), (0.034, gz - 0.006), (0.034, gz), (0.028, gz + 0.004)], 40, [mg], root)
    pz = gz - gl
    if d.get("pommel") == "drum":
        lathe("pommel", [(0.028, pz), (0.042, pz - 0.015), (0.046, pz - 0.035), (0.03, pz - 0.05), (0, pz - 0.055)],
              48, [mg], root)
        gem = mat_gem("gem", hexc(d.get("gem", "#ff3b1f")), hexc(d["glow"]), 6)
        lathe("pommel_gem", [(0, pz - 0.075), (0.016, pz - 0.062), (0.018, pz - 0.052), (0, pz - 0.045)], 24, [gem],
              root)
    else:
        lathe("pommel", [(0.026, pz), (0.032, pz - 0.01), (0.03, pz - 0.022), (0, pz - 0.026)], 40, [mg], root)
    if d.get("tassel"):
        tassel(root, (0.0, 0.0, pz - (0.06 if d.get("pommel") == "drum" else 0.024)), 0.22, 70, d["tassel"], seed=3, spread=0.35)
    if d.get("ice_orchids"):
        # chùm tinh thể băng mọc từ chắn tay, ôm sát sống lưỡi rồi thưa dần lên trên
        ice = mat_gem("ice", hexc("#d8f3ff"), hexc(d["glow"]), 5, 0.06)
        R = rng(7)
        for k in range(26):
            t = 0.01 + 0.32 * (k / 25) ** 1.7
            z = t * L
            sz = 1.0 - 0.75 * (k / 25)
            side = 1 if k % 3 else -1
            x = (bw * (1 - 0.18 * t) * (0.33 if side > 0 else -0.6)) + curve_k * t * t
            a = math.radians(R.uniform(35, 70)) * side
            dirv = (math.sin(a), R.uniform(-0.6, 0.6), math.cos(a))
            crystal(f"ice{k}", (x, R.uniform(-0.006, 0.006), z), dirv, 0.07 * sz * R.uniform(0.7, 1.25),
                    0.011 * sz, 6, [ice], root)
    return root


# ---------------------------------------------------------------- thương

def build_spear(d):
    root = empty()
    shaft_len = d.get("shaft", 1.35)
    head = d.get("head", 0.36)
    mb = mat_blade(d)
    mg = gold(d)
    me = mat_emit("glow", hexc(d["glow"]), d.get("glow_strength", 6))
    # cán: ống đá sét có vết nứt phát sáng
    m, n = new_mat("shaft")
    co = n.obj_co()
    vo = n.voronoi(n.node("ShaderNodeMapping", co, ins={"Scale": (30, 30, 4)}).outputs[0], 1.5)
    crack = n.math("SUBTRACT", 1, n.smooth(0.0, 0.04, vo))
    col = n.mixc(n.noise(co, 25, 6), hexc(d.get("shaft_col", "#1b1726")), hexc(d.get("shaft_col2", "#3a3150")))
    n.principled(col, 0.2, 0.45, normal=n.bump(n.math("MULTIPLY", crack, -1), 0.5, 0.01), emit=hexc(d["glow"]),
                 emit_strength=n.math("MULTIPLY", crack, d.get("crack_glow", 5)), coat=0.6)
    z_sock = 0.0
    lathe("shaft", [(0.02, -shaft_len), (0.021, -shaft_len * 0.5), (0.019, z_sock)], 32, [m], root)
    # đuôi và đai đồng
    lathe("butt", [(0, -shaft_len - 0.09), (0.016, -shaft_len - 0.07), (0.026, -shaft_len - 0.01),
                   (0.024, -shaft_len + 0.03)], 32, [mg], root)
    for zz in (-shaft_len * 0.55, -shaft_len * 0.3):
        lathe("band", [(0.022, zz - 0.02), (0.027, zz - 0.012), (0.027, zz + 0.012), (0.022, zz + 0.02)], 32, [mg],
              root)
    # họng thương khắc mây
    lathe("socket", [(0.021, -0.16), (0.026, -0.15), (0.03, -0.09), (0.034, -0.03), (0.045, -0.015), (0.03, 0.01),
                     (0.02, 0.03)], 48, [mg], root)
    clouds = []
    for k in range(3):
        a0 = TAU * k / 3
        pts = []
        for i in range(60):
            t = i / 59
            a = a0 + t * 2.4
            rr = 0.031 + 0.002 * math.sin(t * 9)
            zc = -0.13 + 0.09 * t + 0.012 * math.sin(t * 12)
            pts.append((rr * math.cos(a), rr * math.sin(a), zc))
        clouds.append(pts)
    curve_obj("socket_cloud", clouds, 0.0025, me, root)

    def hw(t):
        if t < 0.18:
            w = 0.05 + 0.06 * (t / 0.18) ** 0.6
        else:
            w = 0.11 * max(0.0, math.cos((t - 0.18) / 0.82 * math.pi / 2)) ** 0.8
        return (w, w)

    blade("head", head, hw, lambda t: 0.03 * (1 - 0.7 * t), SEC_DOUBLE, None, mats=[mb], parent=root, z0=0.02, smooth=False)
    # cánh sét hai bên chân mũi
    wing_pts = [(0.03, 0.03), (0.09, 0.0), (0.16, 0.05), (0.12, 0.06), (0.15, 0.1), (0.07, 0.07), (0.04, 0.08)]
    extrude_poly("bolt_r", wing_pts, 0.012, [mg], root, bevel_w=0.002)
    extrude_poly("bolt_l", [(-x, z) for x, z in wing_pts], 0.012, [mg], root, bevel_w=0.002)
    gem = mat_gem("gem", hexc(d.get("gem", "#b47bff")), hexc(d["glow"]), 8)
    lathe("socket_gem", [(0, -0.035), (0.014, -0.025), (0.016, -0.012), (0, 0.0)], 24, [gem], root, axis="Y",
          offset=(0, -0.04, -0.012))
    if d.get("tassel"):
        tassel(root, (0.0, 0.0, -0.16), 0.3, 110, d["tassel"], seed=5, spread=0.3, r_strand=0.002)
    return root


BUILDERS = {"sword": build_sword, "spear": build_spear}
