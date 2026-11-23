"""Thư viện dựng và render vũ khí (Blender 5.x, Cycles CPU).

Quy ước: vũ khí dựng đứng theo trục +Z (chuôi ở dưới, mũi ở trên), bề rộng theo X, độ dày theo Y.
Máy quay nhìn theo +Y. Khi render, gốc được xoay để vũ khí nằm chéo 45° (chuôi dưới trái, mũi trên phải).
Mọi hoa văn là shader thủ tục đọc UV: U = vị trí ngang trên mặt cắt (0..1), V = vị trí dọc (0..1).
"""
import math
import random

import bpy
import bmesh
from mathutils import Vector, Matrix

TAU = math.tau


# ---------------------------------------------------------------- cảnh

def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.render.film_transparent = True
    sc.render.resolution_x = sc.render.resolution_y = 1024
    sc.render.resolution_percentage = 100
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA"
    sc.render.image_settings.color_depth = "8"
    sc.cycles.use_denoising = True
    try:
        sc.cycles.denoiser = "OPENIMAGEDENOISE"
    except Exception:
        pass
    sc.cycles.max_bounces = 8
    sc.cycles.glossy_bounces = 6
    sc.cycles.transmission_bounces = 8
    sc.cycles.transparent_max_bounces = 8
    sc.cycles.sample_clamp_indirect = 8
    sc.view_settings.view_transform = "AgX"
    for look in ("AgX - Medium High Contrast", "Medium High Contrast", "AgX - Punchy", "Punchy"):
        try:
            sc.view_settings.look = look
            break
        except Exception:
            continue
    w = bpy.data.worlds.new("world")
    sc.world = w
    w.use_nodes = True
    nt = w.node_tree
    bg = nt.nodes.get("Background")
    # Môi trường xám tối có dải sáng phía trên để kim loại có thứ phản chiếu.
    tc = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(tc.outputs["Generated"], sep.inputs[0])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.35
    ramp.color_ramp.elements[0].color = (0.015, 0.016, 0.02, 1)
    ramp.color_ramp.elements[1].position = 0.9
    ramp.color_ramp.elements[1].color = (0.32, 0.33, 0.36, 1)
    nt.links.new(sep.outputs["Z"], ramp.inputs[0])
    nt.links.new(ramp.outputs[0], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 0.35
    return sc


def link_obj(obj, parent=None):
    bpy.context.scene.collection.objects.link(obj)
    if parent is not None:
        obj.parent = parent
    return obj


def empty(name="root"):
    e = bpy.data.objects.new(name, None)
    return link_obj(e)


# ---------------------------------------------------------------- nút shader

class N:
    """Trình dựng node gọn: N(mat).node("ShaderNodeMath", 0.5, 2, operation="MULTIPLY")."""

    def __init__(self, mat):
        self.mat = mat
        self.nt = mat.node_tree
        self.nodes = self.nt.nodes
        self.links = self.nt.links

    def _set(self, sock, v):
        if isinstance(v, bpy.types.NodeSocket):
            self.links.new(v, sock)
        elif v is not None:
            try:
                sock.default_value = v
            except Exception:
                if isinstance(v, (int, float)):
                    sock.default_value = (v, v, v, 1) if len(sock.default_value) == 4 else (v, v, v)
                else:
                    sock.default_value = tuple(v) + ((1,) if len(sock.default_value) == 4 and len(v) == 3 else ())

    def node(self, typ, *args, ins=None, **props):
        n = self.nodes.new(typ)
        for k, v in props.items():
            setattr(n, k, v)
        enabled = [s for s in n.inputs if s.enabled]
        for s, v in zip(enabled, args):
            self._set(s, v)
        for k, v in (ins or {}).items():
            self._set(n.inputs[k], v)
        return n

    def math(self, op, a, b=0.0, c=None, clamp=False):
        n = self.nodes.new("ShaderNodeMath")
        n.operation = op
        n.use_clamp = clamp
        self._set(n.inputs[0], a)
        self._set(n.inputs[1], b)
        if c is not None:
            self._set(n.inputs[2], c)
        return n.outputs[0]

    def mixc(self, fac, a, b):
        n = self.nodes.new("ShaderNodeMix")
        n.data_type = "RGBA"
        self._set(n.inputs[0], fac)
        cols = [s for s in n.inputs if s.type == "RGBA"]
        self._set(cols[0], a)
        self._set(cols[1], b)
        return [s for s in n.outputs if s.type == "RGBA"][0]

    def smooth(self, e0, e1, x):
        n = self.nodes.new("ShaderNodeMapRange")
        n.interpolation_type = "SMOOTHSTEP"
        self._set(n.inputs["Value"], x)
        n.inputs["From Min"].default_value = e0
        n.inputs["From Max"].default_value = e1
        return n.outputs["Result"]

    def uv(self):
        tc = self.nodes.new("ShaderNodeTexCoord")
        sep = self.nodes.new("ShaderNodeSeparateXYZ")
        self.links.new(tc.outputs["UV"], sep.inputs[0])
        return sep.outputs["X"], sep.outputs["Y"]

    def obj_co(self):
        return self.nodes.new("ShaderNodeTexCoord").outputs["Object"]

    def noise(self, vec, scale=5.0, detail=4.0, rough=0.5, out="Fac"):
        n = self.nodes.new("ShaderNodeTexNoise")
        if vec is not None:
            self.links.new(vec, n.inputs["Vector"])
        n.inputs["Scale"].default_value = scale
        n.inputs["Detail"].default_value = detail
        n.inputs["Roughness"].default_value = rough
        return n.outputs[out]

    def voronoi(self, vec, scale=5.0, feature="DISTANCE_TO_EDGE"):
        n = self.nodes.new("ShaderNodeTexVoronoi")
        n.feature = feature
        if vec is not None:
            self.links.new(vec, n.inputs["Vector"])
        n.inputs["Scale"].default_value = scale
        return n.outputs["Distance"]

    def bump(self, height, strength=0.3, distance=0.02, normal=None):
        n = self.nodes.new("ShaderNodeBump")
        n.inputs["Strength"].default_value = strength
        n.inputs["Distance"].default_value = distance
        self._set(n.inputs["Height"], height)
        if normal is not None:
            self.links.new(normal, n.inputs["Normal"])
        return n.outputs["Normal"]

    def principled(self, base=(0.8, 0.8, 0.8), metal=0.0, rough=0.4, normal=None, emit=None, emit_strength=0.0,
                   transmission=0.0, ior=1.45, coat=0.0, aniso=0.0, alpha=1.0, sheen=0.0):
        out = self.nodes.get("Material Output") or self.nodes.new("ShaderNodeOutputMaterial")
        old = self.nodes.get("Principled BSDF")
        if old:
            self.nodes.remove(old)
        p = self.nodes.new("ShaderNodeBsdfPrincipled")
        self._set(p.inputs["Base Color"], base)
        self._set(p.inputs["Metallic"], metal)
        self._set(p.inputs["Roughness"], rough)
        self._set(p.inputs["IOR"], ior)
        self._set(p.inputs["Transmission Weight"], transmission)
        self._set(p.inputs["Coat Weight"], coat)
        self._set(p.inputs["Anisotropic"], aniso)
        self._set(p.inputs["Alpha"], alpha)
        self._set(p.inputs["Sheen Weight"], sheen)
        if normal is not None:
            self.links.new(normal, p.inputs["Normal"])
        if emit is not None:
            self._set(p.inputs["Emission Color"], emit)
            self._set(p.inputs["Emission Strength"], emit_strength)
        self.links.new(p.outputs[0], out.inputs["Surface"])
        return p


def new_mat(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    return m, N(m)


def hexc(h, a=None):
    """'#rrggbb' -> màu tuyến tính."""
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return tuple(lin) + ((a,) if a is not None else ())


# ---------------------------------------------------------------- vật liệu dùng chung

def mat_metal(name, color, rough=0.25, bump_scale=0.0, hammer=0.0, aniso=0.0):
    m, n = new_mat(name)
    co = n.obj_co()
    r = n.math("ADD", rough, n.math("MULTIPLY", n.noise(co, 18, 6, 0.6), 0.12))
    r = n.math("SUBTRACT", r, 0.06)
    normal = None
    if hammer > 0:
        normal = n.bump(n.voronoi(co, hammer, "F1"), 0.15, 0.01)
    n.principled(color, 1.0, r, normal=normal, aniso=aniso)
    return m


def mat_aged(name, color, cavity_color, rough=0.35, scale=6.0):
    """Đồng / vàng có lớp gỉ sậm ở hốc (dùng AO)."""
    m, n = new_mat(name)
    ao = n.node("ShaderNodeAmbientOcclusion", ins={"Distance": 0.03}, samples=8)
    cav = n.smooth(0.55, 0.95, ao.outputs["AO"])
    nz = n.noise(n.obj_co(), scale, 5, 0.55)
    col = n.mixc(n.math("MULTIPLY", cav, n.math("ADD", 0.75, n.math("MULTIPLY", nz, 0.4))), cavity_color, color)
    r = n.mixc(cav, (0.75, 0.75, 0.75), (rough, rough, rough))
    n.principled(col, n.math("ADD", 0.25, n.math("MULTIPLY", cav, 0.75)), r)
    return m


def mat_emit(name, color, strength=6.0):
    m, n = new_mat(name)
    n.principled(color, 0.0, 0.3, emit=color, emit_strength=strength)
    return m


def mat_gem(name, color, core=None, core_strength=3.0, rough=0.04):
    m, n = new_mat(name)
    lw = n.node("ShaderNodeLayerWeight", 0.35)
    emit = None
    if core is not None:
        emit = n.mixc(lw.outputs["Facing"], core, (0, 0, 0))
    n.principled(color, 0.0, rough, transmission=1.0, ior=1.62, emit=emit, emit_strength=core_strength, coat=0.5)
    return m


def mat_cloth(name, color, sheen=0.6, rough=0.75, weave=120.0):
    m, n = new_mat(name)
    u, v = n.uv()
    w = n.math("SINE", n.math("MULTIPLY", n.math("ADD", u, v), weave))
    normal = n.bump(w, 0.25, 0.005)
    n.principled(color, 0.0, rough, normal=normal, sheen=sheen)
    return m


def mat_wood(name, color, dark):
    m, n = new_mat(name)
    co = n.obj_co()
    mp = n.node("ShaderNodeMapping", co, ins={"Scale": (40, 40, 2)})
    wave = n.node("ShaderNodeTexWave", mp.outputs[0], ins={"Scale": 1.0, "Distortion": 6.0, "Detail": 4.0},
                  wave_type="RINGS")
    col = n.mixc(wave.outputs["Fac"], dark, color)
    n.principled(col, 0.0, 0.55, normal=n.bump(wave.outputs["Fac"], 0.1, 0.004), coat=0.3)
    return m


# ---------------------------------------------------------------- hình học

def mesh_obj(name, verts, faces, uvs=None, mats=None, smooth=True, sharp_deg=35.0, parent=None):
    me = bpy.data.meshes.new(name)
    me.from_pydata([tuple(v) for v in verts], [], faces)
    me.validate(clean_customdata=False)
    if uvs is not None:
        lay = me.uv_layers.new(name="UVMap")
        for poly in me.polygons:
            for li in poly.loop_indices:
                lay.data[li].uv = uvs[me.loops[li].vertex_index]
    if smooth:
        me.shade_smooth()
        if sharp_deg is not None:
            try:
                me.set_sharp_from_angle(angle=math.radians(sharp_deg))
            except Exception:
                pass
    else:
        me.shade_flat()
    obj = bpy.data.objects.new(name, me)
    for m in mats or []:
        me.materials.append(m)
    return link_obj(obj, parent)


def bevel(obj, width=0.004, segments=2, angle=30.0):
    md = obj.modifiers.new("bevel", "BEVEL")
    md.width = width
    md.segments = segments
    md.limit_method = "ANGLE"
    md.angle_limit = math.radians(angle)
    md.harden_normals = False
    return md


def subsurf(obj, levels=2):
    md = obj.modifiers.new("subsurf", "SUBSURF")
    md.levels = levels
    md.render_levels = levels
    return md


def blade(name, length, half_w, thick, section, curve=None, n=90, mats=None, parent=None, z0=0.0, smooth=True,
          sharp_deg=30.0):
    """Lưỡi dựng theo mặt cắt.

    half_w(t) -> (nửa rộng phía u<0, nửa rộng phía u>0); thick(t) -> độ dày; curve(t) -> lệch X.
    section: vòng điểm (u, v) với u, v trong [-1, 1]. Mũi lưỡi khép về một điểm ở t = 1.
    """
    verts, uvs, faces = [], [], []
    k = len(section)
    for i in range(n):
        t = i / n
        wl, wr = half_w(t)
        th = thick(t)
        off = curve(t) if curve else 0.0
        for (u, v) in section:
            x = u * (wl if u < 0 else wr) + off
            verts.append((x, v * th / 2, z0 + t * length))
            uvs.append(((u + 1) / 2, t))
    wl, wr = half_w(1.0)
    tip_u = 0.0 if abs(wl - wr) < 1e-6 else (1.0 if wr > wl else -1.0)
    tip = (tip_u * max(wl, wr) + (curve(1.0) if curve else 0.0), 0.0, z0 + length)
    ti = len(verts)
    verts.append(tip)
    uvs.append(((tip_u + 1) / 2, 1.0))
    for i in range(n - 1):
        for j in range(k):
            a = i * k + j
            b = i * k + (j + 1) % k
            faces.append((a, b, b + k, a + k))
    last = (n - 1) * k
    for j in range(k):
        faces.append((last + j, last + (j + 1) % k, ti))
    faces.append(tuple(reversed(range(k))))
    return mesh_obj(name, verts, faces, uvs, mats, smooth=smooth, sharp_deg=sharp_deg, parent=parent)


def lathe(name, profile, seg=48, mats=None, parent=None, axis="Z", sharp_deg=40.0, cap=True, offset=(0, 0, 0)):
    """Tiện tròn: profile = [(bán kính, z), ...] từ dưới lên. axis = trục quay (Z hoặc Y)."""
    verts, uvs, faces = [], [], []
    m = len(profile)
    for i, (r, z) in enumerate(profile):
        for j in range(seg):
            a = TAU * j / seg
            x, y = r * math.cos(a), r * math.sin(a)
            p = (x, y, z) if axis == "Z" else (x, z, y)
            verts.append(tuple(pi + oi for pi, oi in zip(p, offset)))
            uvs.append((j / seg, i / max(1, m - 1)))
    for i in range(m - 1):
        for j in range(seg):
            a = i * seg + j
            b = i * seg + (j + 1) % seg
            faces.append((a, a + seg, b + seg, b) if axis == "Z" else (a, b, b + seg, a + seg))
    if cap:
        if profile[0][0] > 1e-5:
            f = tuple(reversed(range(seg)))
            faces.append(f if axis == "Z" else tuple(reversed(f)))
        if profile[-1][0] > 1e-5:
            f = tuple(range((m - 1) * seg, m * seg))
            faces.append(f if axis == "Z" else tuple(reversed(f)))
    return mesh_obj(name, verts, faces, uvs, mats, sharp_deg=sharp_deg, parent=parent)


def extrude_poly(name, pts, thick, mats=None, parent=None, y=0.0, plane="XZ", bevel_w=0.0, smooth=False):
    """Đùn hình 2D (danh sách (x, z)) theo trục Y. UV = vị trí chuẩn hóa trong khung bao."""
    k = len(pts)
    xs = [p[0] for p in pts]
    zs = [p[1] for p in pts]
    x0, x1, z0, z1 = min(xs), max(xs), min(zs), max(zs)
    verts, uvs = [], []
    for side in (-1, 1):
        for (x, z) in pts:
            verts.append((x, y + side * thick / 2, z))
            uvs.append(((x - x0) / max(1e-6, x1 - x0), (z - z0) / max(1e-6, z1 - z0)))
    faces = [tuple(range(k)), tuple(reversed(range(k, 2 * k)))]
    for j in range(k):
        a, b = j, (j + 1) % k
        faces.append((a, b, b + k, a + k))
    # mặt trước (y âm) phải hướng về máy quay
    o = mesh_obj(name, verts, faces, uvs, mats, smooth=smooth, sharp_deg=30.0, parent=parent)
    me = o.data
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    if bevel_w > 0:
        bevel(o, bevel_w, 3, 30)
    return o


def curve_obj(name, splines, bevel_depth=0.004, mat=None, parent=None, bevel_res=3, cyclic=False, kind="POLY",
              radii=None, fill_caps=True):
    """splines: danh sách danh sách điểm 3D. radii: cùng cấu trúc, bán kính từng điểm."""
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = bevel_depth
    cu.bevel_resolution = bevel_res
    cu.use_fill_caps = fill_caps
    for si, pts in enumerate(splines):
        if kind == "BEZIER":
            sp = cu.splines.new("BEZIER")
            sp.bezier_points.add(len(pts) - 1)
            for i, p in enumerate(pts):
                bp = sp.bezier_points[i]
                bp.co = p
                bp.handle_left_type = bp.handle_right_type = "AUTO"
                if radii:
                    bp.radius = radii[si][i]
        else:
            sp = cu.splines.new("POLY")
            sp.points.add(len(pts) - 1)
            for i, p in enumerate(pts):
                sp.points[i].co = (p[0], p[1], p[2], 1)
                if radii:
                    sp.points[i].radius = radii[si][i]
        sp.use_cyclic_u = cyclic
    o = bpy.data.objects.new(name, cu)
    if mat:
        cu.materials.append(mat)
    return link_obj(o, parent)


def helix(r_of_z, z0, z1, turns, phase=0.0, steps=240, y_scale=1.0):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        z = z0 + (z1 - z0) * t
        a = phase + TAU * turns * t
        r = r_of_z(z)
        pts.append((r * math.cos(a), r * math.sin(a) * y_scale, z))
    return pts


def crystal(name, base, direction, length, radius, sides=6, mats=None, parent=None, tip=0.35, twist=0.0):
    """Tinh thể lục giác hai đầu nhọn."""
    d = Vector(direction).normalized()
    up = Vector((0, 0, 1)) if abs(d.z) < 0.95 else Vector((1, 0, 0))
    ax = d.cross(up).normalized()
    ay = d.cross(ax).normalized()
    b = Vector(base)
    verts = [tuple(b - d * length * 0.12)]
    rings = [(0.18, 0.75), (0.82, 1.0)]
    for (t, rs) in rings:
        for j in range(sides):
            a = TAU * j / sides + twist
            p = b + d * (length * t) + (ax * math.cos(a) + ay * math.sin(a)) * radius * rs
            verts.append(tuple(p))
    verts.append(tuple(b + d * length * (1 + tip * 0.3)))
    faces = []
    for j in range(sides):
        faces.append((0, 1 + (j + 1) % sides, 1 + j))
        a, bb = 1 + j, 1 + (j + 1) % sides
        faces.append((a, bb, bb + sides, a + sides))
        faces.append((a + sides, bb + sides, 2 * sides + 1))
    return mesh_obj(name, verts, faces, None, mats, smooth=False, parent=parent)


def star_poly(points, r_out, r_in, cx=0.0, cz=0.0, rot=0.0):
    pts = []
    for i in range(points * 2):
        r = r_out if i % 2 == 0 else r_in
        a = rot + math.pi * i / points + math.pi / 2
        pts.append((cx + r * math.cos(a), cz + r * math.sin(a)))
    return pts


def disk_rings(name, center, r_list, depth, mat, parent=None, tube=0.003):
    """Các vòng tròn đồng tâm nổi trên mặt phẳng XZ (hoa văn trống đồng)."""
    splines = []
    for r in r_list:
        splines.append([(center[0] + r * math.cos(TAU * i / 96), center[1] - depth,
                         center[2] + r * math.sin(TAU * i / 96)) for i in range(96)])
    return curve_obj(name, splines, tube, mat, parent, cyclic=True)


# ---------------------------------------------------------------- ánh sáng, máy quay, render

def studio(center, size, rim_color=(1, 1, 1), key_strength=1.0):
    cx, cz = center
    objs = []

    def area(name, loc, target, power, color=(1, 1, 1), s=2.0, shape="RECTANGLE", sy=None):
        ld = bpy.data.lights.new(name, "AREA")
        ld.energy = power
        ld.color = color
        ld.shape = shape
        ld.size = s
        if sy is not None:
            ld.size_y = sy
        o = bpy.data.objects.new(name, ld)
        o.location = loc
        d = Vector(target) - Vector(loc)
        o.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
        link_obj(o)
        objs.append(o)
        return o

    s = size
    area("key", (cx - 1.4 * s, -1.6 * s, cz + 1.4 * s), (cx, 0, cz), 320 * s * s * key_strength, (1.0, 0.96, 0.9), 1.2 * s)
    area("fill", (cx + 1.6 * s, -1.4 * s, cz - 0.6 * s), (cx, 0, cz), 70 * s * s, (0.85, 0.9, 1.0), 1.6 * s)
    area("rim", (cx + 1.0 * s, 1.5 * s, cz + 1.0 * s), (cx, 0, cz), 420 * s * s, rim_color, 0.8 * s)
    area("rim2", (cx - 1.2 * s, 1.4 * s, cz - 1.0 * s), (cx, 0, cz), 220 * s * s, rim_color, 0.8 * s)
    # Hộp sáng dài, máy quay không thấy, chỉ để kim loại có vệt phản chiếu.
    for i, (dx, dz, rot) in enumerate([(-0.9, 0.9, 20), (0.9, -0.9, 70)]):
        me = bpy.data.meshes.new("softbox")
        me.from_pydata([(-0.12 * s, 0, -1.4 * s), (0.12 * s, 0, -1.4 * s), (0.12 * s, 0, 1.4 * s),
                        (-0.12 * s, 0, 1.4 * s)], [], [(0, 1, 2, 3)])
        o = bpy.data.objects.new(f"softbox{i}", me)
        o.location = (cx + dx * s * 0.6, -1.3 * s, cz + dz * s * 0.6)
        o.rotation_euler = (0, math.radians(rot), 0)
        m, n = new_mat(f"softbox{i}")
        out = n.nodes.get("Material Output")
        for nd in list(n.nodes):
            if nd != out:
                n.nodes.remove(nd)
        em = n.node("ShaderNodeEmission", (1, 1, 1), 1.6)
        n.links.new(em.outputs[0], out.inputs["Surface"])
        me.materials.append(m)
        o.visible_camera = False
        o.visible_shadow = False
        o.visible_diffuse = False
        link_obj(o)
        objs.append(o)
    return objs


def world_bbox(objs):
    dg = bpy.context.evaluated_depsgraph_get()
    mn = Vector((1e9, 1e9, 1e9))
    mx = Vector((-1e9, -1e9, -1e9))
    for o in objs:
        if o.type not in {"MESH", "CURVE"}:
            continue
        if o.type == "CURVE":
            # bound_box của curve đã đánh giá không tin cậy: lấy trực tiếp điểm điều khiển cộng bán kính ống.
            r = o.data.bevel_depth
            pts = [Vector(pt.co[:3]) for sp in o.data.splines for pt in (sp.bezier_points or sp.points)]
            pad = Vector((r, r, r))
            for c in pts:
                w = o.matrix_world @ c
                mn = Vector(map(min, mn, w - pad))
                mx = Vector(map(max, mx, w + pad))
            continue
        ev = o.evaluated_get(dg)
        for c in ev.bound_box:
            w = ev.matrix_world @ Vector(c)
            mn = Vector(map(min, mn, w))
            mx = Vector(map(max, mx, w))
    return mn, mx


def frame(root, angle_deg=45.0, yaw_deg=18.0, roll_deg=0.0, margin=1.12):
    """Xoay gốc thành góc chéo rồi đặt máy quay trực giao ôm vừa vũ khí."""
    root.rotation_mode = "XYZ"
    root.rotation_euler = (math.radians(roll_deg), math.radians(angle_deg), 0)
    # Quay quanh trục dài của vũ khí trước (để thấy cạnh vát), rồi mới nghiêng chéo.
    root.matrix_world = (Matrix.Rotation(math.radians(angle_deg), 4, "Y")
                         @ Matrix.Rotation(math.radians(roll_deg), 4, "X")
                         @ Matrix.Rotation(math.radians(yaw_deg), 4, "Z"))
    bpy.context.view_layer.update()
    objs = [o for o in bpy.context.scene.objects if o.type in {"MESH", "CURVE"} and o.visible_camera]
    mn, mx = world_bbox(objs)
    cx, cz = (mn.x + mx.x) / 2, (mn.z + mx.z) / 2
    size = max(mx.x - mn.x, mx.z - mn.z) * margin
    cd = bpy.data.cameras.new("cam")
    cd.type = "ORTHO"
    cd.ortho_scale = size
    cd.clip_end = 100
    cam = bpy.data.objects.new("cam", cd)
    cam.location = (cx, -20, cz)
    cam.rotation_euler = (math.radians(90), 0, 0)
    link_obj(cam)
    bpy.context.scene.camera = cam
    return (cx, cz), size


def render(path, samples=160):
    sc = bpy.context.scene
    sc.cycles.samples = samples
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)


def render_glow_mask(path, samples=24):
    """Lần render thứ hai chỉ còn phần phát sáng: tắt đèn, môi trường, hộp sáng và nảy tia."""
    sc = bpy.context.scene
    hidden = []
    for o in sc.objects:
        if o.type == "LIGHT" or o.name.startswith("softbox"):
            if not o.hide_render:
                o.hide_render = True
                hidden.append(o)
    bg = sc.world.node_tree.nodes.get("Background")
    old = bg.inputs["Strength"].default_value
    bg.inputs["Strength"].default_value = 0.0
    old_b = sc.cycles.max_bounces
    sc.cycles.max_bounces = 0
    sc.cycles.use_denoising = False
    sc.render.film_transparent = True
    render(path, samples)
    for o in hidden:
        o.hide_render = False
    bg.inputs["Strength"].default_value = old
    sc.cycles.max_bounces = old_b
    sc.cycles.use_denoising = True


def rng(seed):
    return random.Random(seed)
