"""Bộ dựng 3★ mộc: sắt, gỗ, da, đồng; không phát sáng, không ngọc. Mỗi món có một chi tiết nhận diện riêng
(chắn tay, dây quấn, vết sứt, khắc nhỏ). Chọn bằng `builder` trong designs.py.
"""
import math

from lib import TAU, blade, curve_obj, empty, extrude_poly, helix, hexc, lathe, mat_aged, mat_cloth, mat_metal, mat_wood
from models import SEC_DOUBLE, grip, mat_blade


def iron(d, name="iron"):
    return mat_metal(name, hexc(d.get("iron", "#5c5a58")), 0.5, hammer=d.get("hammer", 40.0))


def bronze(d, name="bronze"):
    return mat_aged(name, hexc(d.get("gold", "#8a6a44")), hexc(d.get("cavity", "#2a2018")), 0.45)


def leather(d, col_key="wrap", name="leather"):
    return mat_cloth(name, hexc(d.get(col_key, "#5a3a24")), 0.15, 0.85, 60.0)


def chipped(base, chips):
    """Nửa rộng lưỡi có vết sứt: chips = [(t, rộng, sâu, phía)] với phía -1 trái, 1 phải."""
    def hw(t):
        wl, wr = base(t)
        for (t0, w, k, side) in chips:
            x = abs(t - t0) / w
            if x < 1:
                f = 1 - k * (1 - x * x)
                if side < 0:
                    wl *= f
                else:
                    wr *= f
        return (wl, wr)
    return hw


def cord_ring(root, center, r, tube, mat, name="ring", axis="Y"):
    cx, cy, cz = center
    pts = []
    for i in range(48):
        a = TAU * i / 48
        pts.append((cx + r * math.cos(a), cy, cz + r * math.sin(a)) if axis == "Y" else
                   (cx + r * math.cos(a), cy + r * math.sin(a), cz))
    curve_obj(name, [pts], tube, mat, root, cyclic=True)


def binding(root, z0, z1, r, turns, mat, tube, name="binding", x=0.0):
    pts = [(x + px, py, pz) for (px, py, pz) in helix(lambda z: r, z0, z1, turns, steps=max(60, int(turns * 24)))]
    curve_obj(name, [pts], tube, mat, root, bevel_res=2)


# ---------------------------------------------------------------- kiếm 3★

def build_sword_rustic(d):
    """Kiếm sắt lữ khách: chắn tay sắt rèn uốn cong lệch, chuôi quấn dây gai, khoen đồng ở đốc,
    một vết sứt ở mép lưỡi và dấu khắc la bàn nhỏ ở chân lưỡi."""
    root = empty()
    L, bw = d.get("length", 0.92), d.get("width", 0.062)
    mb, mi, mz = mat_blade(d), iron(d), bronze(d)

    def base(t):
        s = 1 - 0.22 * t
        w = bw * s if t < 0.84 else bw * s * math.sqrt(max(0.0, 1 - ((t - 0.84) / 0.16) ** 1.2))
        return (w, w)

    hw = chipped(base, d.get("chips", [(0.56, 0.035, 0.32, 1), (0.31, 0.02, 0.18, -1)]))
    blade("blade", L, hw, lambda t: 0.02 * (1 - 0.5 * t), SEC_DOUBLE, None, mats=[mb], parent=root, smooth=False)
    # chắn tay: thanh sắt dẹt, hai đầu uốn cong ngược chiều nhau (kiểu móc), không đối xứng
    sp = d.get("guard_span", 0.13)
    top, bot = [], []
    for i in range(25):
        t = -1 + 2 * i / 24
        x = sp * t
        bend = 0.03 * (abs(t) ** 2.4) * (1 if t > 0 else -0.6)
        top.append((x, -0.004 + bend))
        bot.append((x, -0.026 + bend))
    extrude_poly("guard", top + bot[::-1], 0.022, [mi], root, bevel_w=0.003, smooth=True)
    lathe("guard_knot", [(0.0, -0.034), (0.018, -0.03), (0.022, -0.015), (0.018, 0.0), (0.0, 0.004)], 8, [mi], root,
          sharp_deg=20)
    # dấu khắc la bàn nhỏ ở chân lưỡi (khắc chìm, màu sẫm)
    mark = mat_metal("mark", hexc("#2a2826"), 0.7)
    y = -0.0102
    c, rr = (0.0, 0.07), 0.012
    curve_obj("mark_ring", [[(c[0] + rr * math.cos(TAU * i / 32), y, c[1] + rr * math.sin(TAU * i / 32))
                             for i in range(32)]], 0.0011, mark, root, cyclic=True)
    curve_obj("mark_needle", [[(0, y, c[1] - rr * 1.5), (0, y, c[1] + rr * 1.5)],
                              [(-rr * 0.9, y, c[1]), (rr * 0.9, y, c[1])]], 0.0011, mark, root)
    # chuôi quấn dây gai, đốc sắt có khoen đồng buộc dây
    gl = d.get("grip_len", 0.22)
    twine = mat_cloth("twine", hexc(d.get("wrap", "#8a7a5a")), 0.2, 0.9, 220.0)
    core = mat_wood("grip_wood", hexc("#4a3420"), hexc("#2a1a0e"))
    grip(root, -0.03 - gl, -0.03, 0.02, 0.022, d, twine, core, turns=11)
    pz = -0.03 - gl
    lathe("pommel", [(0.022, pz), (0.028, pz - 0.012), (0.026, pz - 0.03), (0.012, pz - 0.038), (0, pz - 0.04)], 10,
          [mi], root, sharp_deg=25)
    cord_ring(root, (0.0, 0.0, pz - 0.058), 0.018, 0.0035, mz, "pommel_ring")
    tail = [(0.0, 0.0, pz - 0.075), (0.012, -0.004, pz - 0.12), (0.006, 0.004, pz - 0.17)]
    curve_obj("cord_tail", [tail], 0.003, twine, root, kind="BEZIER")
    return root


# ---------------------------------------------------------------- cung 3★

def build_bow_rustic(d):
    """Cung tre: hai cánh tre có đốt, đầu cánh buộc dây gai, tay cầm quấn da, dây gai mộc,
    một mẩu vải đỏ buộc dưới tay cầm."""
    root = empty()
    H = d.get("half", 0.55)
    bamboo = mat_wood("bamboo", hexc(d.get("limb", "#c8b070")), hexc(d.get("limb_dark", "#7a6230")))
    node_m = mat_wood("bamboo_node", hexc(d.get("limb_dark", "#7a6230")), hexc("#4a3a18"))
    twine = mat_cloth("twine", hexc(d.get("string", "#b8a880")), 0.2, 0.9, 260.0)

    def curve(t):
        return -0.13 * math.sin(math.pi * min(1.0, t / 0.9) * 0.5)

    def hw(t):
        w = 0.024 * (1 - 0.5 * t)
        return (w, w)

    for sgn, nm in ((1, "up"), (-1, "lo")):
        o = blade(f"limb_{nm}", H, hw, lambda t: 0.017 * (1 - 0.45 * t), SEC_DOUBLE, curve, mats=[bamboo],
                  parent=root, z0=0.08, smooth=True, sharp_deg=60)
        if sgn < 0:
            o.rotation_euler = (math.pi, 0, 0)
        # đốt tre: vòng gờ nhỏ dọc cánh
        for k, t in enumerate((0.18, 0.42, 0.66, 0.86)):
            w = hw(t)[0]
            z = sgn * (0.08 + H * t)
            pts = [(curve(t) + w * 1.04 * math.cos(TAU * i / 24), 0.0105 * (1 - 0.45 * t) * math.sin(TAU * i / 24) * 1.1,
                    z) for i in range(24)]
            curve_obj(f"node_{nm}{k}", [pts], 0.0024, node_m, root, cyclic=True)
        # đầu cánh: dây gai quấn chặt và khấc dây
        tx, tz = curve(0.97), sgn * (0.08 + H * 0.97)
        binding(root, tz - 0.025, tz + 0.025, 0.011, 9, twine, 0.0017, f"tip_bind_{nm}", x=tx)
    lathe("riser", [(0.022, -0.1), (0.028, -0.085), (0.027, 0.085), (0.022, 0.1)], 24,
          [mat_wood("riser", hexc("#6a4a28"), hexc("#3a2614"))], root)
    lea = leather(d)
    grip(root, -0.065, 0.065, 0.029, 0.029, d, lea, lea, turns=5)
    tx = curve(0.97)
    curve_obj("string", [[(tx, 0, 0.08 + H * 0.97), (tx + 0.015, 0, 0), (tx, 0, -0.08 - H * 0.97)]], 0.0019, twine,
              root)
    # mẩu vải buộc dưới tay cầm (điểm nhận diện, màu trầm)
    cloth = mat_cloth("rag", hexc(d.get("rag", "#8a2a20")), 0.3, 0.85, 90.0)
    cord_ring(root, (0.0, 0.0, -0.075), 0.031, 0.0035, cloth, "rag_knot", axis="Z")
    for k, (dx, dz) in enumerate(((0.035, -0.09), (0.05, -0.06))):
        curve_obj(f"rag{k}", [[(0.03, -0.004, -0.075), (0.03 + dx * 0.6, -0.01, -0.075 + dz * 0.5),
                               (0.03 + dx, -0.006, -0.075 + dz)]], 0.0055, cloth, root, kind="BEZIER")
    return root


# ---------------------------------------------------------------- thương 3★

def build_spear_rustic(d):
    """Thương gỗ lim: cán gỗ sẫm vân rõ, mũi sắt rèn thô hình lá có vết sứt, họng sắt đóng hai đinh,
    da sống buộc chặt chân họng, khâu đồng ở đuôi; chỗ tay cầm quấn vải mòn."""
    root = empty()
    S, head = d.get("shaft", 1.3), d.get("head", 0.3)
    wood = mat_wood("lim", hexc(d.get("shaft_col", "#5a2e1a")), hexc(d.get("shaft_col2", "#2a140a")))
    mb, mi, mz = mat_blade(d), iron(d), bronze(d)
    lathe("shaft", [(0.019, -S), (0.021, -S * 0.5), (0.018, -0.12)], 24, [wood], root)
    lathe("socket", [(0.019, -0.15), (0.023, -0.14), (0.026, -0.06), (0.03, -0.01), (0.02, 0.02)], 12, [mi], root,
          sharp_deg=25)
    for k, zz in enumerate((-0.11, -0.07)):
        lathe(f"nail{k}", [(0.0, -0.0275), (0.0055, -0.027), (0.0055, -0.024), (0.0, -0.023)], 10, [mi], root,
              axis="Y", offset=(0, 0, zz))
    raw = mat_cloth("rawhide", hexc(d.get("wrap", "#a08a62")), 0.15, 0.9, 90.0)
    binding(root, -0.2, -0.15, 0.021, 6, raw, 0.0026, "socket_bind")

    def base(t):
        if t < 0.22:
            w = 0.02 + 0.04 * (t / 0.22) ** 0.7
        else:
            w = 0.06 * max(0.0, math.cos((t - 0.22) / 0.78 * math.pi / 2)) ** 0.9
        return (w, w)

    hw = chipped(base, [(0.48, 0.05, 0.28, -1)])
    blade("head", head, hw, lambda t: 0.024 * (1 - 0.7 * t), SEC_DOUBLE, None, mats=[mb], parent=root, z0=0.015,
          smooth=False)
    # vải quấn chỗ tay cầm, mòn sờn
    cloth = mat_cloth("grip_cloth", hexc(d.get("cloth", "#4a4238")), 0.2, 0.9, 140.0)
    lathe("grip_band", [(0.0205, -S * 0.62), (0.0225, -S * 0.61), (0.0225, -S * 0.43), (0.0205, -S * 0.42)], 24,
          [cloth], root)
    lathe("butt", [(0, -S - 0.06), (0.012, -S - 0.05), (0.022, -S - 0.01), (0.02, -S + 0.04)], 16, [mz], root,
          sharp_deg=30)
    return root


BUILDERS_RUSTIC = {"sword_rustic": build_sword_rustic, "bow_rustic": build_bow_rustic,
                   "spear_rustic": build_spear_rustic}
