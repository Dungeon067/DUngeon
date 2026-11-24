"""Khối dựng trang sức cho Bảo Ấn (S31): vật liệu PBR, đá cắt giác, ngôi sao, dây xoắn, hoa văn cuộn, cánh hoa."""
import math

import bmesh
import bpy
from mathutils import Matrix, Vector

from lib import TAU, crystal, curve_obj, extrude_poly, hexc, lathe, mat_aged, mesh_obj, new_mat

# ---------------------------------------------------------------- vật liệu


def _set(p, key, v):
    if key in p.inputs:
        p.inputs[key].default_value = v


def metal(name, color, cavity, rough=0.16):
    """Kim loại đánh bóng, hốc chạm trổ sậm lại."""
    return mat_aged(name, hexc(color), hexc(cavity), rough, 9.0)


def enamel(name, c0, c1=None, lo=0.0, hi=1.0, mode="Z", rough=0.2, glow=0.0, sss=0.0):
    """Men màu phủ bóng; c0 -> c1 theo trục Z hoặc theo bán kính (mode="R") của tọa độ vật thể."""
    m, n = new_mat(name)
    col = hexc(c0)
    if c1:
        co = n.obj_co()
        if mode == "R":
            x = n.node("ShaderNodeVectorMath", co, operation="LENGTH").outputs["Value"]
        else:
            x = n.node("ShaderNodeSeparateXYZ", co).outputs[mode]
        col = n.mixc(n.smooth(lo, hi, x), hexc(c0), hexc(c1))
    p = n.principled(col, 0.0, rough, coat=1.0, emit=col if glow else None, emit_strength=glow)
    _set(p, "Coat Roughness", 0.03)
    _set(p, "Subsurface Weight", sss)
    _set(p, "Subsurface Radius", (0.02, 0.01, 0.005))
    return m


def gem(name, color, core=None, core_strength=2.0, ior=1.9, rough=0.0, film=0.0):
    m, n = new_mat(name)
    emit = None
    if core:
        lw = n.node("ShaderNodeLayerWeight", 0.4)
        emit = n.mixc(lw.outputs["Facing"], hexc(core), (0, 0, 0))
    p = n.principled(hexc(color), 0.0, rough, transmission=1.0, ior=ior, emit=emit, emit_strength=core_strength)
    if film:
        _set(p, "Thin Film Thickness", film)
        _set(p, "Thin Film IOR", 1.4)
    return m


def ice(name, color, frost="#ffffff"):
    """Pha lê băng: trong, mép mờ sương."""
    m, n = new_mat(name)
    co = n.obj_co()
    nz = n.noise(co, 60, 6, 0.6)
    lw = n.node("ShaderNodeLayerWeight", 0.25)
    col = n.mixc(lw.outputs["Fresnel"], hexc(color), hexc(frost))
    r = n.math("MULTIPLY", n.smooth(0.45, 0.75, nz), 0.25)
    p = n.principled(col, 0.0, r, transmission=1.0, ior=1.45, normal=n.bump(nz, 0.15, 0.002),
                     emit=n.mixc(lw.outputs["Facing"], hexc(color), (0, 0, 0)), emit_strength=0.35)
    _set(p, "Coat Weight", 0.6)
    return m


def pearl(name, color="#f4efe6"):
    m, n = new_mat(name)
    p = n.principled(hexc(color), 0.0, 0.22, coat=1.0, sheen=0.4)
    _set(p, "Subsurface Weight", 0.35)
    _set(p, "Subsurface Radius", (0.01, 0.008, 0.006))
    _set(p, "Thin Film Thickness", 420.0)
    _set(p, "Thin Film IOR", 1.5)
    _set(p, "Coat Roughness", 0.08)
    return m


def glass(name, color, rough=0.01, ior=1.45):
    m, n = new_mat(name)
    n.principled(hexc(color), 0.0, rough, transmission=1.0, ior=ior)
    return m


def glow(name, color, strength=8.0):
    m, n = new_mat(name)
    n.principled(hexc(color), 0.0, 0.3, emit=hexc(color), emit_strength=strength)
    return m


def paper(name, color, strength=1.2):
    """Giấy dó thắp sáng từ trong: thớ sợi đậm nhạt."""
    m, n = new_mat(name)
    co = n.obj_co()
    f = n.noise(n.node("ShaderNodeMapping", co, ins={"Scale": (90, 90, 18)}).outputs[0], 1.0, 6, 0.7)
    col = n.mixc(n.smooth(0.3, 0.8, f), tuple(c * 0.55 for c in hexc(color)), hexc(color))
    n.principled(col, 0.0, 0.8, emit=col, emit_strength=strength, normal=n.bump(f, 0.2, 0.002))
    return m


# ---------------------------------------------------------------- hình học cơ bản


def flat(name, verts, faces, mats, parent):
    o = mesh_obj(name, verts, faces, None, mats, smooth=False, parent=parent)
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(o.data)
    bm.free()
    return o


def orient(normal, up=None):
    """Ma trận xoay đưa trục Z cục bộ về hướng normal."""
    nrm = Vector(normal).normalized()
    if up is None:
        return nrm.to_track_quat("Z", "Y").to_matrix()
    x = Vector(up).cross(nrm).normalized()
    y = nrm.cross(x)
    return Matrix((x, y, nrm)).transposed()


def spheres(name, centers, r, mat, parent, seg=12, rings=8):
    """Gộp nhiều hạt cầu vào một mesh (hạt chuỗi, viền hạt kê)."""
    verts, faces = [], []
    rs = r if isinstance(r, (list, tuple)) else [r] * len(centers)
    for c, rr in zip(centers, rs):
        b = len(verts)
        verts.append((c[0], c[1], c[2] - rr))
        for i in range(1, rings):
            th = math.pi * i / rings - math.pi / 2
            for j in range(seg):
                a = TAU * j / seg
                verts.append((c[0] + rr * math.cos(th) * math.cos(a), c[1] + rr * math.cos(th) * math.sin(a),
                              c[2] + rr * math.sin(th)))
        top = len(verts)
        verts.append((c[0], c[1], c[2] + rr))
        for j in range(seg):
            j1 = (j + 1) % seg
            faces.append((b, b + 1 + j1, b + 1 + j))
            for i in range(rings - 2):
                a0 = b + 1 + i * seg
                faces.append((a0 + j, a0 + j1, a0 + seg + j1, a0 + seg + j))
            last = b + 1 + (rings - 2) * seg
            faces.append((last + j, last + j1, top))
    o = mesh_obj(name, verts, faces, None, [mat], smooth=True, sharp_deg=None, parent=parent)
    return o


def brilliant(name, loc, r, normal, mat, parent, n=8, crown=0.38, pav=0.8, sx=1.0, sy=1.0, up=None):
    """Đá cắt giác kiểu tròn: mặt bàn, vương miện, gờ, đáy nhọn. sx/sy kéo dài thành giọt, thoi."""
    R = orient(normal, up)
    L = Vector(loc)
    v = []

    def add(x, y, z):
        v.append(tuple(L + R @ Vector((x * sx, y * sy, z))))
        return len(v) - 1

    table = [add(0.55 * r * math.cos(TAU * i / n + math.pi / n), 0.55 * r * math.sin(TAU * i / n + math.pi / n),
                 crown * r) for i in range(n)]
    g = [add(r * math.cos(math.pi * i / n), r * math.sin(math.pi * i / n), 0.0) for i in range(2 * n)]
    gb = [add(r * math.cos(math.pi * i / n), r * math.sin(math.pi * i / n), -0.05 * r) for i in range(2 * n)]
    cul = add(0, 0, -pav * r)
    f = [tuple(table)]
    for i in range(n):
        t0, t1 = table[i - 1], table[i]
        g0, g1, g2 = g[2 * i - 1], g[2 * i], g[(2 * i + 1) % (2 * n)]
        f += [(t0, g0, g1), (t0, g1, t1), (t1, g1, g2)]
    for i in range(2 * n):
        j = (i + 1) % (2 * n)
        f.append((g[i], gb[i], gb[j], g[j]))
        f.append((gb[i], cul, gb[j]))
    return flat(name, v, f, [mat], parent)


def setting(name, loc, r, normal, mat, parent, prongs=6, sx=1.0, sy=1.0, up=None, bead_mat=None):
    """Ổ chấu: vòng ôm gờ đá và các chấu hạt."""
    R = orient(normal, up)
    L = Vector(loc)
    ring = [tuple(L + R @ Vector((1.06 * r * math.cos(TAU * i / 48) * sx, 1.06 * r * math.sin(TAU * i / 48) * sy,
                                  -0.12 * r))) for i in range(48)]
    curve_obj(name, [ring], 0.12 * r, mat, parent, cyclic=True, bevel_res=2)
    pts = [tuple(L + R @ Vector((1.02 * r * math.cos(TAU * i / prongs + 0.3) * sx,
                                 1.02 * r * math.sin(TAU * i / prongs + 0.3) * sy, 0.12 * r))) for i in range(prongs)]
    spheres(name + "_chau", pts, 0.13 * r, bead_mat or mat, parent, 10, 6)


def star_gem(name, loc, r, normal, shell, core, mount, parent, points=5, up=(0, 0, 1), depth=0.5, flare=None,
             flare_size=1.5):
    """Mảnh sao: sao giác pha lê, lõi sáng bên trong, viền kim loại và hạt ở mỗi đỉnh."""
    R = orient(normal, up)
    L = Vector(loc)

    def body(nm, s, mat, z0=0.0):
        v = [tuple(L + R @ Vector((0, 0, (depth * r + z0) * s)))]
        ring = []
        for i in range(points * 2):
            rr = r * s if i % 2 == 0 else r * s * 0.44
            a = math.pi / 2 + math.pi * i / points
            ring.append(len(v))
            v.append(tuple(L + R @ Vector((rr * math.cos(a), rr * math.sin(a), 0.0))))
        v.append(tuple(L + R @ Vector((0, 0, -0.35 * r * s))))
        k = len(ring)
        f = [(0, ring[i], ring[(i + 1) % k]) for i in range(k)] + [(len(v) - 1, ring[(i + 1) % k], ring[i])
                                                                     for i in range(k)]
        return flat(nm, v, f, [mat], parent)

    body(name, 1.0, shell)
    body(name + "_loi", 0.5, core)
    out = []
    for i in range(points * 2 + 1):
        rr = r * 1.12 if i % 2 == 0 else r * 0.54
        a = math.pi / 2 + math.pi * i / points
        out.append(tuple(L + R @ Vector((rr * math.cos(a), rr * math.sin(a), -0.08 * r))))
    curve_obj(name + "_vien", [out], 0.07 * r, mount, parent, bevel_res=2)
    tips = [tuple(L + R @ Vector((1.28 * r * math.cos(math.pi / 2 + TAU * i / points),
                                  1.28 * r * math.sin(math.pi / 2 + TAU * i / points), -0.05 * r)))
            for i in range(points)]
    spheres(name + "_hat", tips, 0.1 * r, mount, parent, 12, 8)
    if flare is not None:
        for k, (s, rot) in enumerate(((flare_size, 0.0), (flare_size * 0.55, math.pi / 4))):
            pts = []
            for i in range(8):
                rr = r * s if i % 2 == 0 else r * 0.035
                a = rot + math.pi * i / 4
                pts.append((rr * math.cos(a), rr * math.sin(a)))
            v = [tuple(L + R @ Vector((x, y, depth * r + 0.01))) for x, y in pts]
            o = mesh_obj(name + f"_lap{k}", v, [tuple(range(8))], None, [flare], smooth=False, parent=parent)
            o.visible_shadow = False
            o.visible_glossy = False


# ---------------------------------------------------------------- đường, dây xoắn, hoa văn cuộn


def frames(path, closed=False):
    P = [Vector(p) for p in path]
    k = len(P)
    T = []
    for i in range(k):
        a = P[(i - 1) % k] if (closed or i > 0) else P[i]
        b = P[(i + 1) % k] if (closed or i < k - 1) else P[i]
        T.append((b - a).normalized())
    up = Vector((0, 0, 1)) if abs(T[0].z) < 0.9 else Vector((1, 0, 0))
    Nn = [T[0].cross(up).normalized()]
    for i in range(1, k):
        nn = Nn[-1] - T[i] * Nn[-1].dot(T[i])
        Nn.append(nn.normalized() if nn.length > 1e-6 else Nn[-1])
    return P, T, Nn, [t.cross(nn) for t, nn in zip(T, Nn)]


def rope(name, path, rw, mat, parent, closed=False, twists=60.0, strands=3, taper=None):
    """Dây xoắn nhiều sợi bám theo đường path."""
    P, T, Nn, B = frames(path, closed)
    seg = [0.0]
    for i in range(1, len(P)):
        seg.append(seg[-1] + (P[i] - P[i - 1]).length)
    total = seg[-1] + ((P[0] - P[-1]).length if closed else 0)
    turns = max(1, round(total * twists)) if closed else total * twists
    sp, radii = [], []
    for s in range(strands):
        pts, rr = [], []
        for i, p in enumerate(P):
            k = 1.0 if taper is None else taper(i / (len(P) - 1))
            a = TAU * s / strands + TAU * turns * seg[i] / total
            pts.append(tuple(p + (Nn[i] * math.cos(a) + B[i] * math.sin(a)) * rw * 0.62 * k))
            rr.append(k)
        sp.append(pts)
        radii.append(rr)
    return curve_obj(name, sp, rw * 0.55, mat, parent, cyclic=closed, bevel_res=2, radii=radii)


def beads_on(name, path, r, mat, parent, step=None, closed=False):
    P = [Vector(p) for p in path]
    if closed:
        P = P + [P[0]]
    step = step or r * 2.3
    out, acc = [tuple(P[0])], 0.0
    for i in range(1, len(P)):
        a, b = P[i - 1], P[i]
        d = (b - a).length
        while acc + d >= step:
            t = (step - acc) / d
            a = a.lerp(b, t)
            out.append(tuple(a))
            d = (b - a).length
            acc = 0.0
        acc += d
    if closed and len(out) > 1 and (Vector(out[-1]) - Vector(out[0])).length < step * 0.6:
        out.pop()
    return spheres(name, out, r, mat, parent, 10, 6)


def circle(c, e1, e2, R, n=128, a0=0.0, a1=TAU):
    c, e1, e2 = Vector(c), Vector(e1), Vector(e2)
    full = abs(a1 - a0 - TAU) < 1e-6
    m = n if full else n + 1
    return [tuple(c + (e1 * math.cos(a0 + (a1 - a0) * i / n) + e2 * math.sin(a0 + (a1 - a0) * i / n)) * R)
            for i in range(m)]


def s_scroll(size, turns=1.15, n=36, c_only=False):
    """Hoa văn cuộn chữ S (hoặc chữ C) trong mặt phẳng 2D, dài khoảng size."""
    R = size * 0.28

    def spiral(cx, sign):
        pts = []
        for i in range(n):
            t = i / (n - 1)
            th = math.pi / 2 + turns * TAU * (1 - t)
            r = R * (0.12 + 0.88 * t)
            pts.append((sign * (cx + r * math.cos(th)), sign * r * math.sin(th)))
        return pts

    a = spiral(-size * 0.5 + R, 1)
    if c_only:
        return a
    return a + list(reversed(spiral(-size * 0.5 + R, -1)))


def place2d(pts, o, u, v):
    o, u, v = Vector(o), Vector(u), Vector(v)
    return [tuple(o + u * x + v * y) for x, y in pts]


def scroll_ring(name, c, e1, e2, R, count, size, mat, parent, wire=0.0025, lift=(0, 0, 0), c_only=False, tilt=0.0,
                vert=None):
    """Vòng hoa văn cuộn: count chữ S nối đuôi quanh vòng tròn bán kính R."""
    c, e1, e2, lift = Vector(c), Vector(e1), Vector(e2), Vector(lift)
    sp = []
    for k in range(count):
        a = TAU * (k + 0.5) / count
        rad = e1 * math.cos(a) + e2 * math.sin(a)
        tan = -e1 * math.sin(a) + e2 * math.cos(a)
        u = tan * math.cos(tilt) + rad * math.sin(tilt)
        v = rad * math.cos(tilt) - tan * math.sin(tilt) if vert is None else Vector(vert)
        sp.append(place2d(s_scroll(size, c_only=c_only), c + rad * R + lift, u, v))
    return curve_obj(name, sp, wire, mat, parent, bevel_res=2)


# ---------------------------------------------------------------- cánh hoa, ngọn lửa


def petal(name, center, rot, length, width, mats, parent, cup=0.5, curl=0.0, tilt=10.0, y0=0.0, pw=0.8, tipk=0.2,
          thick=0.004, rim=None, rim_w=0.0022, nu=12, nv=20, vein=None, ruffle=0.0):
    """Cánh hoa cong trong mặt XZ, quay quanh tâm theo góc rot, ngửa về máy quay (−Y) theo tilt."""
    c = Vector(center)
    d = Vector((math.cos(rot), 0, math.sin(rot)))
    p = Vector((-math.sin(rot), 0, math.cos(rot)))
    out = Vector((0, -1, 0))
    ct, st = math.cos(math.radians(tilt)), math.sin(math.radians(tilt))

    def P(u, v):
        w = width * math.sin(math.pi * min(1.0, v)) ** pw * (1 - tipk * v) + width * 0.06
        w *= 1 + ruffle * math.sin(v * 9 + u * 2) * v
        x, y = u * w, length * v
        z = cup * width * u * u + curl * length * v * v
        return c + d * (y * ct - z * st) + p * x + out * (y * st + z * ct + y0)

    verts, uvs, faces = [], [], []
    for j in range(nv + 1):
        for i in range(nu + 1):
            u, v = -1 + 2 * i / nu, j / nv
            verts.append(tuple(P(u, v)))
            uvs.append((i / nu, v))
    for j in range(nv):
        for i in range(nu):
            a = j * (nu + 1) + i
            faces.append((a, a + 1, a + nu + 2, a + nu + 1))
    o = mesh_obj(name, verts, faces, uvs, mats, smooth=True, sharp_deg=None, parent=parent)
    m = o.modifiers.new("day", "SOLIDIFY")
    m.thickness = thick
    m.offset = 0
    if rim is not None:
        edge = [tuple(P(1, j / nv)) for j in range(nv + 1)] + [tuple(P(-1, j / nv)) for j in range(nv, -1, -1)]
        curve_obj(name + "_vien", [edge], rim_w, rim, parent, bevel_res=2)
    if vein is not None:
        curve_obj(name + "_gan", [[tuple(P(0, j / nv) + out * thick * 0.6) for j in range(1, nv - 2)]], rim_w * 0.7,
                  vein, parent, bevel_res=1)
    return o


def flame_pts(h, w, lean=0.25, n=28, wiggle=0.22):
    right, left = [], []
    for i in range(n + 1):
        t = i / n
        x = w * math.sin(math.pi * t ** 0.85) ** 0.9 * (1 - t) ** 0.35
        s = lean * h * t * t
        right.append((s + x * (1 + wiggle * math.sin(3.2 * math.pi * t)), h * t))
        left.append((s - x * (1 - wiggle * math.sin(2.6 * math.pi * t + 0.6)), h * t))
    return right + list(reversed(left[1:-1]))


def flame(name, base, h, w, rot_z, fill, rim, inner, parent, lean=0.25, thick=0.01, rot_y=0.0):
    """Ngọn lửa men hai lớp, viền kim loại. Dựng trong mặt XZ, nghiêng rot_y quanh Y rồi xoay rot_z quanh Z."""
    pts = flame_pts(h, w, lean)
    objs = [extrude_poly(name, pts, thick, [fill], parent, smooth=True, bevel_w=thick * 0.35)]
    ins = flame_pts(h * 0.62, w * 0.5, lean * 1.2, wiggle=0.1)
    o2 = extrude_poly(name + "_trong", ins, thick * 0.6, [inner], parent, y=-thick * 0.55, smooth=True)
    o2.location = (0, 0, h * 0.04)
    objs.append(o2)
    loop = [(x, -thick * 0.5, z) for x, z in pts] + [(pts[0][0], -thick * 0.5, pts[0][1])]
    objs.append(curve_obj(name + "_vien", [loop], thick * 0.32, rim, parent, bevel_res=2))
    for ob in objs:
        ob.matrix_basis = (Matrix.Translation(base) @ Matrix.Rotation(rot_z, 4, "Z") @ Matrix.Rotation(rot_y, 4, "Y")
                         @ ob.matrix_basis)
    return objs


def ice_cluster(name, base, direction, length, mat, parent, n=5, seed=1, spread=0.5, radius=0.012):
    import random
    R = random.Random(seed)
    d = Vector(direction).normalized()
    up = Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((1, 0, 0))
    ax = d.cross(up).normalized()
    ay = d.cross(ax)
    for k in range(n):
        dd = (d + ax * R.uniform(-spread, spread) + ay * R.uniform(-spread, spread)).normalized()
        L = length * (1.0 if k == 0 else R.uniform(0.35, 0.75))
        crystal(f"{name}{k}", tuple(base), tuple(dd), L, radius * (1.0 if k == 0 else 0.7), 6, [mat], parent,
                twist=R.random())


def tassel_strands(name, top, length, n, mat, parent, seed=1, spread=0.2, rw=0.0016, sway=0.2):
    import random
    R = random.Random(seed)
    sp = []
    for _ in range(n):
        a = R.random() * TAU
        rr = R.random() * 0.008
        L = length * (0.8 + 0.2 * R.random())
        pts = []
        for k in range(8):
            t = k / 7
            sw = spread * t ** 1.3 * length
            pts.append((top[0] + math.cos(a) * (rr + sw * 0.5) + sway * length * t * t,
                        top[1] + math.sin(a) * (rr + sw * 0.3), top[2] - L * t))
        sp.append(pts)
    curve_obj(name, sp, rw, mat, parent, kind="BEZIER", bevel_res=1)


def knot(name, top, r, mat, parent, cap_mat=None):
    """Nút buộc tua: hạt tiện tròn nhiều nấc."""
    x, y, z = top
    lathe(name, [(0, z - 2.2 * r), (0.6 * r, z - 2.0 * r), (r, z - 1.4 * r), (1.1 * r, z - 0.8 * r), (0.7 * r, z - 0.4 * r),
                 (0.9 * r, z), (0.5 * r, z + 0.3 * r), (0, z + 0.4 * r)], 32, [cap_mat or mat], parent,
          offset=(x, y, 0))
