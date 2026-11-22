"""Trang phục dựng theo lớp: quần, áo trong, giày, bao tay, áo ngoài, vạt, đai.

Lớp ôm thân được tách từ lưới thân (giữ nguyên trọng số xương) rồi đẩy ra
theo pháp tuyến. Vạt áo và đuôi áo choàng là lưới tròn xoay, gắn xương phụ.
"""

import math

import bmesh
import bpy
from mathutils import Vector

from .body import auto_weights
from .toon import toon_material
from .util import link, smooth


def dominant(obj, vtx):
    best, bw = None, 0.0
    for g in vtx.groups:
        if g.weight > bw:
            best, bw = obj.vertex_groups[g.group].name, g.weight
    return best


def _faces_where(obj, pred):
    me = obj.data
    dom = [dominant(obj, vt) for vt in me.vertices]
    bm = bmesh.new()
    bm.from_mesh(me)
    hit = []
    for f in bm.faces:
        c = f.calc_center_median()
        bones = [dom[vt.index] for vt in f.verts]
        b = max(set(bones), key=bones.count)
        if pred(b, c, f.normal):
            hit.append(f)
    return bm, hit


def shell(src, name, pred, offset, mat, kill=None):
    """Sao lưới thân gốc `src`, giữ các mặt thỏa `pred(bone, center, normal)`, đẩy ra `offset` mét.

    `kill`: object thân đang dùng, xóa các mặt bị lớp áo che kín để không xuyên.
    """
    ob = src.copy()
    ob.data = src.data.copy()
    ob.name = ob.data.name = name
    link(ob)
    me = ob.data
    bm, keep = _faces_where(ob, pred)
    keep = set(keep)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f not in keep], context="FACES")
    bm.normal_update()
    for vt in bm.verts:
        vt.co += vt.normal * offset
    bm.to_mesh(me)
    bm.free()
    me.materials.clear()
    me.materials.append(mat)
    smooth(ob)
    if kill is not None:
        bm, dead = _faces_where(kill, pred)
        bmesh.ops.delete(bm, geom=dead, context="FACES")
        bm.to_mesh(kill.data)
        bm.free()
    return ob


def lathe(name, rings, a0, a1, seg, mat):
    """Lưới tròn xoay hở. rings: [(z, rx, ry, dy)], góc 0 = phía trước (-Y), tăng về bên trái."""
    bm = bmesh.new()
    rows = []
    for z, rx, ry, dy in rings:
        row = []
        for k in range(seg + 1):
            a = math.radians(a0 + (a1 - a0) * k / seg)
            row.append(bm.verts.new((math.sin(a) * rx, -math.cos(a) * ry + dy, z)))
        rows.append(row)
    for r in range(len(rows) - 1):
        for k in range(seg):
            bm.faces.new((rows[r][k], rows[r][k + 1], rows[r + 1][k + 1], rows[r + 1][k]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = link(bpy.data.objects.new(name, me))
    me.materials.append(mat)
    sol = ob.modifiers.new("day", "SOLIDIFY")
    sol.thickness = 0.008
    sol.offset = 0
    sub = ob.modifiers.new("sub", "SUBSURF")
    sub.levels = sub.render_levels = 1
    smooth(ob)
    # Pháp tuyến hướng ra ngoài.
    cx = sum(vt.co.x for vt in me.vertices) / len(me.vertices)
    out = sum((vt.co - Vector((0, 0, vt.co.z))).dot(me.polygons[0].normal) for vt in me.vertices[:1])
    if out < 0:
        me.flip_normals()
    _ = cx
    return ob


def build_outfit(body, body_obj, rig, look, style, dung):
    """Trang phục theo `dung` (media/characters/<id>/dung.yaml)."""
    zz, w, L = body.z, body.w, body.L
    # Bản sao thân nguyên vẹn làm khuôn cho mọi lớp áo (thân thật sẽ bị khoét dần).
    src = body_obj.copy()
    src.data = body_obj.data.copy()
    o = dung.get("trang_phuc", {})
    pal = dung.get("bang_mau", {})
    outfit = look["outfit"]
    accent = look["accent"]
    c_ao = pal.get("ao_trong", outfit)
    c_quan = pal.get("quan", "#2a1a1e")
    c_giay = pal.get("giay", "#3a2418")
    c_ngoai = pal.get("ao_ngoai", outfit)
    c_vien = pal.get("vien_ao", accent)
    c_dai = pal.get("dai", accent)
    m_ao = toon_material("ao_trong", c_ao, style)[0]
    m_quan = toon_material("quan", c_quan, style)[0]
    m_giay = toon_material("giay", c_giay, style)[0]
    m_ngoai = toon_material("ao_ngoai", c_ngoai, style)[0]
    m_vien = toon_material("vien_ao", c_vien, style)[0]
    m_dai = toon_material("dai", c_dai, style)[0]
    objs = []

    legs = {"thigh.L", "thigh.R", "shin.L", "shin.R", "hips"}
    objs.append(shell(src, "quan", lambda b, c, n: (b in legs and c.z < zz["waist"] + 0.01) or
                      (b in ("foot.L", "foot.R") and c.z > zz["ankle"] * 1.6), 0.004, m_quan, kill=body_obj))
    sleeve = o.get("tay_ao", 0.85)  # 0 cụt, 1 tới cổ tay
    wrist_z = body.joints()["wrist.L"].z
    elbow_z = body.joints()["elbow.L"].z
    sh_z = body.joints()["shoulder.L"].z
    sleeve_z = sh_z + (wrist_z - sh_z) * sleeve

    def is_shirt(b, c, n):
        if b in ("chest", "spine", "shoulder.L", "shoulder.R"):
            return True
        if b == "hips":
            return c.z > zz["crotch"] + 0.04 * L
        if b == "neck":
            return c.z < zz["neck"] + 0.008
        if b in ("upper_arm.L", "upper_arm.R", "forearm.L", "forearm.R"):
            return c.z > sleeve_z
        return False

    objs.append(shell(src, "ao_trong", is_shirt, 0.008, m_ao, kill=body_obj))
    boot_z = zz["ankle"] + (zz["knee"] - zz["ankle"]) * o.get("co_giay", 0.55)
    objs.append(shell(src, "giay", lambda b, c, n: b in ("foot.L", "foot.R") or
                      (b in ("shin.L", "shin.R") and c.z < boot_z), 0.012, m_giay, kill=body_obj))
    if o.get("bao_tay", True):
        bz0 = wrist_z + (elbow_z - wrist_z) * 0.05
        bz1 = wrist_z + (elbow_z - wrist_z) * 0.6
        objs.append(shell(src, "bao_tay", lambda b, c, n: b in ("forearm.L", "forearm.R") and bz0 < c.z < bz1,
                          0.014, m_vien))

    # Cổ áo giao lĩnh (vạt trái đè vạt phải): dải viền chéo trơn đặt sát ngực.
    t0z, t1z = zz["neck"] - 0.01 * L, zz["waist"] + 0.02 * L
    x0, x1 = 0.035 * L, -w["wa"] * 0.75
    objs.append(ribbon(body, "co_ao", [(x0 + (x1 - x0) * t ** 0.8, t0z + (t1z - t0z) * t) for t in
                                       [k / 14 for k in range(15)]], 0.03 * L, 0.016, m_vien, rig))
    nz = zz["neck"] - 0.004 * L
    nrx, nry = body.torso_radius(nz)
    neck = lathe("co_ao_tron", [(nz - 0.012 * L, nrx * 1.25 + 0.01, nry * 1.25 + 0.01, 0),
                                (nz + 0.022 * L, nrx * 1.1 + 0.008, nry * 1.1 + 0.008, 0)], 0, 360, 24, m_vien)
    auto_weights(neck, rig, names={"neck", "chest"}, power=2.0, keep=2)
    objs.append(neck)

    # Vạt áo trước và sau (cảm hứng áo tứ thân, áo dài), xẻ hai bên hông.
    vz0, vz1 = zz["waist"], zz["knee"] + (zz["crotch"] - zz["knee"]) * o.get("vat_dai", 0.15)
    rings = []
    for k in range(6):
        t = k / 5
        z = vz0 + (vz1 - vz0) * t
        rx = w["wa"] * (1.05 + 0.5 * t) + 0.01
        ry = 0.06 * L * (1 + 0.6 * t) + 0.012
        rings.append((z, rx, ry, 0.0))
    for nm, a0, a1 in (("vat_truoc", -38, 38), ("vat_sau", 142, 218)):
        ob = lathe(nm, rings, a0, a1, 8, m_ao)
        auto_weights(ob, rig, names={"hips", "thigh.L", "thigh.R"}, power=2.0, keep=3, center_band=1)
        objs.append(ob)
        if o.get("vien_vat", True):
            hem = [(z, rx + 0.002, ry + 0.002, dy) for z, rx, ry, dy in rings[-2:]]
            hem[0] = (rings[-1][0] + 0.045 * L, hem[0][1] - 0.006, hem[0][2] - 0.004, 0)
            ob2 = lathe(nm + "_vien", hem, a0 - 1, a1 + 1, 8, m_vien)
            auto_weights(ob2, rig, names={"hips", "thigh.L", "thigh.R"}, power=2.0, keep=3, center_band=1)
            objs.append(ob2)

    # Đai lưng và hai dải đai buông trước bụng.
    dz = zz["waist"] + 0.01
    belt = lathe("dai", [(dz - 0.03 * L, w["wa"] + 0.016, 0.055 * L + 0.016, 0),
                         (dz + 0.03 * L, w["wa"] + 0.016, 0.055 * L + 0.016, 0)], 0, 360, 24, m_dai)
    auto_weights(belt, rig, names={"hips", "spine"}, power=2.0, keep=2)
    objs.append(belt)
    for k, xo in enumerate((0.25, 0.55)):
        dx = -w["wa"] * xo
        strip = lathe("dai_buong_%d" % k, [(dz - 0.02 * L, 0.018 * L, 0.004, -0.06 * L - 0.02),
                                             (dz - 0.22 * L, 0.024 * L, 0.004, -0.075 * L - 0.02)], -60, 60, 4, m_dai)
        strip.location.x = dx
        auto_weights(strip, rig, names={"hips"}, only="hips")
        objs.append(strip)

    if look.get("coat"):
        objs += _coat(body, src, rig, m_ngoai, m_vien, o)
    return objs


def _coat(body, src, rig, m_ngoai, m_vien, o):
    zz, w, L = body.z, body.w, body.L
    sh_z = body.joints()["shoulder.L"].z
    elbow_z = body.joints()["elbow.L"].z
    sleeve_end = sh_z + (elbow_z - sh_z) * o.get("tay_ao_ngoai", 1.0)
    open_w = w["ch"] * 0.42

    def pred(b, c, n):
        if b in ("upper_arm.L", "upper_arm.R"):
            return c.z > sleeve_end
        if b in ("chest", "spine", "shoulder.L", "shoulder.R"):
            return not (c.y < 0 and abs(c.x) < open_w)
        if b == "hips":
            return c.z > zz["waist"] - 0.02 and not (c.y < 0 and abs(c.x) < open_w)
        return False

    objs = [shell(src, "ao_ngoai", pred, 0.02, m_ngoai)]
    # Đuôi áo choàng sau lưng, xương phụ coat.1-3 để bay khi chạy.
    z0 = zz["waist"]
    z1 = zz["knee"] - (zz["knee"] - zz["ankle"]) * o.get("duoi_ao", 0.35)
    rings = []
    for k in range(7):
        t = k / 6
        z = z0 + (z1 - z0) * t
        rings.append((z, w["wa"] * (1.25 + 0.75 * t) + 0.03, 0.065 * L * (1.1 + 0.8 * t) + 0.03, 0.01 * t))
    tail = lathe("duoi_ao", rings, 62, 298, 14, m_ngoai)
    objs.append(tail)
    hem = [(rings[-1][0] + 0.05 * L, rings[-1][1] + 0.003, rings[-1][2] + 0.003, rings[-1][3]),
           (rings[-1][0], rings[-1][1] + 0.004, rings[-1][2] + 0.004, rings[-1][3])]
    trim = lathe("duoi_ao_vien", hem, 61, 299, 14, m_vien)
    objs.append(trim)
    add_chain(rig, "coat", (0, 0.07 * L, z0), (0, 0.11 * L, z1), 3, "hips")
    for ob in (tail, trim):
        auto_weights(ob, rig, names={"hips", "coat.1", "coat.2", "coat.3"}, power=3.0, keep=2, center_band=1)
    return objs


def add_chain(rig, prefix, head, tail, n, parent):
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.mode_set(mode="EDIT")
    eb = rig.data.edit_bones
    h, t = Vector(head), Vector(tail)
    prev = parent
    for i in range(n):
        b = eb.new("%s.%d" % (prefix, i + 1))
        b.head = h + (t - h) * (i / n)
        b.tail = h + (t - h) * ((i + 1) / n)
        b.parent = eb[prev]
        b.use_connect = i > 0
        prev = b.name
    bpy.ops.object.mode_set(mode="OBJECT")


def ribbon(body, name, pts, width, offset, mat, rig):
    """Dải phẳng bám mặt trước thân. pts: [(x, z)] theo đường giữa dải."""
    def surf(x, z):
        rx, ry = body.torso_radius(z)
        rx, ry = rx + offset, ry + offset
        q = max(0.0, 1 - (x / rx) ** 2)
        return Vector((x, -ry * math.sqrt(q), z))

    bm = bmesh.new()
    rows = []
    for i, (x, z) in enumerate(pts):
        a = pts[max(0, i - 1)]
        b = pts[min(len(pts) - 1, i + 1)]
        d = Vector((b[0] - a[0], b[1] - a[1])).normalized()
        nx, nz = -d.y, d.x
        rows.append([bm.verts.new(surf(x + nx * width / 2 * sgn, z + nz * width / 2 * sgn)) for sgn in (-1, 1)])
    for r0, r1 in zip(rows, rows[1:]):
        bm.faces.new((r0[0], r0[1], r1[1], r1[0]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = link(bpy.data.objects.new(name, me))
    me.materials.append(mat)
    if sum(p.normal.y for p in me.polygons) > 0:
        me.flip_normals()
    sol = ob.modifiers.new("day", "SOLIDIFY")
    sol.thickness = 0.006
    smooth(ob)
    auto_weights(ob, rig, names={"chest", "spine", "hips", "neck"}, power=2.0, keep=2)
    return ob
