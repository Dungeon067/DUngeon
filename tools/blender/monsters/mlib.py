"""Thư viện dựng quái S29 (Blender 5.x, chạy không giao diện).

Quy trình mỗi loài:
  1. Dựng bản chi tiết (high): lưới chia nhỏ + displace + bump thủ tục (vảy, nếp da, vân đá, rêu).
  2. Dựng bản game (low) theo ngân sách tam giác, trải UV một tấm atlas.
  3. Nướng (bake) từ high sang low: albedo vẽ tay (chuyển màu, vân, AO, mép sáng), normal map, mặt nạ RGB
     (R = phát sáng theo nguyên tố, G = phát sáng màu riêng của loài, B = vùng nhuộm màu nguyên tố).
  4. Gắn xương, đặt trọng số theo khoảng cách tới đoạn xương (ổn định hơn heat weight khi chạy nền), dựng hoạt ảnh.
  5. Xuất GLB: mỗi vùng vật liệu (skin, jelly, glow, fin) là một material dùng chung atlas.
Trục: Blender Z lên, quái nhìn theo -Y (glTF đổi thành +Z nhìn tới).
"""
import math
import os
import random

import bmesh
import bpy
import numpy as np
from mathutils import Matrix, Vector

TAU = math.tau
HERE = os.path.dirname(os.path.abspath(__file__))


# ---------------------------------------------------------------- cảnh

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = 1
    sc.render.fps = 30
    return sc


def link(obj, parent=None):
    bpy.context.scene.collection.objects.link(obj)
    if parent is not None:
        obj.parent = parent
    return obj


def select(objs, active=None):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = active or objs[0]


def apply_mods(obj):
    select([obj])
    for m in list(obj.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)


def apply_tf(obj):
    select([obj])
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)


def dup(obj, name):
    o = obj.copy()
    o.data = obj.data.copy()
    o.name = name
    link(o)
    return o


def join(objs, name):
    objs = [o for o in objs if o is not None]
    select(objs, objs[0])
    bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active
    o.name = name
    o.data.name = name
    return o


def tris(obj):
    me = obj.evaluated_get(bpy.context.evaluated_depsgraph_get()).to_mesh()
    n = sum(len(p.vertices) - 2 for p in me.polygons)
    return n


def from_bm(bm, name, parent=None):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    return link(o, parent)


def smooth(obj, on=True):
    for p in obj.data.polygons:
        p.use_smooth = on


def subsurf(obj, lv=2, apply=True):
    m = obj.modifiers.new("sub", "SUBSURF")
    m.levels = m.render_levels = lv
    if apply:
        apply_mods(obj)
    return obj


def decimate(obj, target_tris):
    t = tris(obj)
    if t <= target_tris:
        return obj
    m = obj.modifiers.new("dec", "DECIMATE")
    m.ratio = target_tris / t
    m.use_collapse_triangulate = True
    apply_mods(obj)
    return obj


def triangulate(obj):
    m = obj.modifiers.new("tri", "TRIANGULATE")
    m.keep_custom_normals = True
    apply_mods(obj)


def set_part(obj, part):
    """Ghi vùng vật liệu (skin/jelly/glow/fin/eye) làm thuộc tính mặt để tách material lúc xuất."""
    me = obj.data
    a = me.attributes.get("part") or me.attributes.new("part", "INT", "FACE")
    code = PARTS.index(part)
    a.data.foreach_set("value", [code] * len(me.polygons))
    return obj


PARTS = ["skin", "jelly", "glow", "fin", "eye", "cloth"]


def set_attr(obj, name, val):
    me = obj.data
    a = me.attributes.get(name) or me.attributes.new(name, "INT", "POINT")
    a.data.foreach_set("value", [val] * len(me.vertices))
    return obj


# ---------------------------------------------------------------- hình khối

def loft(name, rings, closed_ends=True, parent=None):
    """rings: danh sách vòng, mỗi vòng là list Vector cùng số điểm. Nối thành ống, bịt hai đầu bằng một đỉnh."""
    bm = bmesh.new()
    vs = [[bm.verts.new(p) for p in r] for r in rings]
    n = len(rings[0])
    for a, b in zip(vs[:-1], vs[1:]):
        for i in range(n):
            bm.faces.new((a[i], a[(i + 1) % n], b[(i + 1) % n], b[i]))
    if closed_ends:
        for r, rev in ((vs[0], True), (vs[-1], False)):
            c = sum((v.co for v in r), Vector()) / n
            cv = bm.verts.new(c)
            for i in range(n):
                f = (r[i], r[(i + 1) % n], cv)
                bm.faces.new(f[::-1] if rev else f)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return from_bm(bm, name, parent)


def ring(center, frame, rx, ry, n=16, shape=None, phase=0.0):
    """Vòng ellipse trong mặt phẳng (frame[0], frame[1]) quanh center. shape(a) -> hệ số bán kính."""
    u, v = frame
    pts = []
    for i in range(n):
        a = phase + TAU * i / n
        k = shape(a) if shape else 1.0
        pts.append(center + u * (math.cos(a) * rx * k) + v * (math.sin(a) * ry * k))
    return pts


def uv_sphere(name, r=1.0, seg=24, rings=16, loc=(0, 0, 0), scale=(1, 1, 1), parent=None):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=r)
    for v in bm.verts:
        v.co = Vector((v.co.x * scale[0], v.co.y * scale[1], v.co.z * scale[2])) + Vector(loc)
    o = from_bm(bm, name, parent)
    smooth(o)
    return o


def ico(name, r=1.0, sub=2, loc=(0, 0, 0), scale=(1, 1, 1), parent=None):
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    for v in bm.verts:
        v.co = Vector((v.co.x * scale[0], v.co.y * scale[1], v.co.z * scale[2])) + Vector(loc)
    o = from_bm(bm, name, parent)
    smooth(o)
    return o


def cone(name, r1, r2, depth, seg=8, loc=(0, 0, 0), rot=(0, 0, 0), parent=None, cap=True):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, segments=seg, radius1=r1, radius2=r2, depth=depth)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, depth / 2))
    m = Matrix.Translation(loc) @ Vector(rot).to_track_quat("Z", "Y").to_matrix().to_4x4() if isinstance(rot, Vector) \
        else Matrix.Translation(loc) @ __import__("mathutils").Euler(rot).to_matrix().to_4x4()
    bmesh.ops.transform(bm, matrix=m, verts=bm.verts)
    return from_bm(bm, name, parent)


def box(name, size, loc=(0, 0, 0), parent=None):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((v.co.x * size[0], v.co.y * size[1], v.co.z * size[2])) + Vector(loc)
    return from_bm(bm, name, parent)


def skin_body(name, verts, edges, radii, sub=2, parent=None):
    """Thân hữu cơ bằng Skin modifier: đồ thị đỉnh + bán kính -> lưới quad liền, chia mịn."""
    me = bpy.data.meshes.new(name)
    me.from_pydata([Vector(v) for v in verts], edges, [])
    o = link(bpy.data.objects.new(name, me), parent)
    m = o.modifiers.new("skin", "SKIN")
    m.use_smooth_shade = True
    m.branch_smoothing = 0.6
    for sv, r in zip(o.data.skin_vertices[0].data, radii):
        sv.radius = (r[0], r[1]) if isinstance(r, (tuple, list)) else (r, r)
    o.data.skin_vertices[0].data[0].use_root = True
    if sub:
        s = o.modifiers.new("sub", "SUBSURF")
        s.levels = s.render_levels = sub
    apply_mods(o)
    smooth(o)
    return o


def leaf(name, length, width, loc, direction, up=(0, 0, 1), curl=0.15, seg=4, parent=None, thick=0.004, notch=0.0):
    """Lá dẹt có gân giữa (gập nhẹ theo chiều dọc), có độ dày nhỏ để viền ngoài không vỡ."""
    d = Vector(direction).normalized()
    s = d.cross(Vector(up))
    if s.length < 1e-4:
        s = d.cross(Vector((1, 0, 0)))
    s.normalize()
    n = s.cross(d).normalized()
    bm = bmesh.new()
    rows = []
    for i in range(seg + 1):
        t = i / seg
        w = width * math.sin(math.pi * min(1, t * 1.05)) ** 0.8 * (1 - notch * (t > 0.85))
        bend = curl * t * t * length
        c = Vector(loc) + d * (t * length) - n * bend
        rows.append([bm.verts.new(c - s * w + n * (w * 0.25)), bm.verts.new(c + n * thick),
                     bm.verts.new(c + s * w + n * (w * 0.25))])
    uvl = bm.loops.layers.uv.new("UVMap")
    for i, (a, b) in enumerate(zip(rows[:-1], rows[1:])):
        for f, us in ((bm.faces.new((a[0], a[1], b[1], b[0])), (0, 0.5, 0.5, 0)),
                      (bm.faces.new((a[1], a[2], b[2], b[1])), (0.5, 1, 1, 0.5))):
            for lp, u, tt in zip(f.loops, us, (i, i, i + 1, i + 1)):
                lp[uvl].uv = (u, tt / seg)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    o = from_bm(bm, name, parent)
    m = o.modifiers.new("sol", "SOLIDIFY")
    m.thickness = thick
    m.offset = 0
    apply_mods(o)
    smooth(o)
    return o


def tube(name, pts, radii, n=8, parent=None, cap=True):
    """Ống dọc theo đường cong (râu, dây, cán gỗ). radii: một số hoặc list theo từng điểm."""
    pts = [Vector(p) for p in pts]
    if not isinstance(radii, (list, tuple)):
        radii = [radii] * len(pts)
    rings_ = []
    prev_u = None
    for i, p in enumerate(pts):
        t = (pts[min(i + 1, len(pts) - 1)] - pts[max(i - 1, 0)]).normalized()
        u = (prev_u - t * prev_u.dot(t)).normalized() if prev_u is not None else t.orthogonal().normalized()
        prev_u = u
        v = t.cross(u)
        rings_.append(ring(p, (u, v), max(radii[i], 1e-4), max(radii[i], 1e-4), n))
    o = loft(name, rings_, closed_ends=cap, parent=parent)
    smooth(o)
    return o


def displace(obj, tex_type="VORONOI", strength=0.05, scale=0.3, mid=0.5, coords="OBJECT", vgroup=None, **tex):
    t = bpy.data.textures.new(f"{obj.name}_{tex_type}", tex_type)
    for k, v in tex.items():
        setattr(t, k, v)
    if hasattr(t, "noise_scale"):
        t.noise_scale = scale
    m = obj.modifiers.new("disp", "DISPLACE")
    m.texture = t
    m.strength = strength
    m.mid_level = mid
    m.texture_coords = coords
    if vgroup:
        m.vertex_group = vgroup
    return m


def noise_verts(obj, amp, freq=3.0, seed=0, axis_scale=(1, 1, 1)):
    """Lệch đỉnh theo pháp tuyến bằng nhiễu mượt (không cần texture): bướu đá, gợn da."""
    from mathutils import noise
    me = obj.data
    me.update()
    off = Vector((seed * 7.1, seed * 3.3, seed * 1.7))
    for v in me.vertices:
        p = Vector((v.co.x * axis_scale[0], v.co.y * axis_scale[1], v.co.z * axis_scale[2])) * freq + off
        v.co += v.normal * (noise.noise(p) * amp)
    me.update()


def displace_noise(obj, amp, size):
    """Gợn da bằng modifier Displace (texture Clouds) — nhanh với lưới voxel dày."""
    tx = bpy.data.textures.new(obj.name + "_n", "CLOUDS")
    tx.noise_scale = size
    m = obj.modifiers.new("dn", "DISPLACE")
    m.texture = tx
    m.texture_coords = "GLOBAL"
    m.strength = amp * 2
    m.mid_level = 0.5
    apply_mods(obj)


# ---------------------------------------------------------------- UV và bake

def unwrap(obj, margin=0.004, angle=66.0):
    select([obj])
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(angle_limit=math.radians(angle), island_margin=margin, area_weight=0.0,
                             correct_aspect=True, scale_to_bounds=False)
    try:
        bpy.ops.uv.pack_islands(margin=margin, rotate=True)
    except Exception:
        pass
    bpy.ops.object.mode_set(mode="OBJECT")


def scale_uv_islands_by_part(obj, weights):
    """Cho vùng quan trọng (mặt, mắt) nhiều điểm ảnh hơn: phóng UV của mặt theo part rồi pack lại."""
    me = obj.data
    pa = me.attributes.get("part")
    if not pa:
        return
    uv = me.uv_layers.active.data
    for p in me.polygons:
        k = weights.get(PARTS[pa.data[p.index].value], 1.0)
        if k == 1.0:
            continue
        for li in p.loop_indices:
            uv[li].uv *= k
    select([obj])
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.select_all(action="SELECT")
    bpy.ops.uv.pack_islands(margin=0.004, rotate=True)
    bpy.ops.object.mode_set(mode="OBJECT")


class PM:
    """Vật liệu thủ tục cho bản high, có 3 đầu ra để nướng: albedo, mask, normal (bump)."""

    def __init__(self, name):
        self.mat = bpy.data.materials.new(name)
        try:
            self.mat.use_nodes = True
        except Exception:
            pass
        self.nt = self.mat.node_tree
        self.nodes = self.nt.nodes
        self.links = self.nt.links
        for n in list(self.nodes):
            if n.type != "OUTPUT_MATERIAL":
                self.nodes.remove(n)
        self.out = self.nodes.get("Material Output") or self.nodes.new("ShaderNodeOutputMaterial")
        self.emit = self.nodes.new("ShaderNodeEmission")
        self.diff = self.nodes.new("ShaderNodeBsdfDiffuse")
        self.view = self.nodes.new("ShaderNodeBsdfPrincipled")
        self.albedo = None
        self.mask = (0, 0, 0)
        self.normal = None
        self.pres = None  # màu xem trước (render Blender)

    # tiện ích node
    def s(self, sock, v):
        if isinstance(v, bpy.types.NodeSocket):
            self.links.new(v, sock)
        elif v is not None:
            for l in list(sock.links):
                self.links.remove(l)
            if isinstance(v, (int, float)):
                try:
                    sock.default_value = v
                except Exception:
                    sock.default_value = (v, v, v, 1)[: len(sock.default_value)]
            else:
                v = tuple(v)
                n = len(sock.default_value)
                sock.default_value = (v + (1,))[:n] if len(v) < n else v[:n]

    def node(self, typ, ins=None, **props):
        n = self.nodes.new(typ)
        for k, v in props.items():
            setattr(n, k, v)
        for k, v in (ins or {}).items():
            self.s(n.inputs[k], v)
        return n

    def co(self, kind="Object"):
        return self.node("ShaderNodeTexCoord").outputs[kind]

    def vec(self, op, a, b=None, scale=None):
        n = self.node("ShaderNodeVectorMath", operation=op)
        self.s(n.inputs[0], a)
        if b is not None:
            self.s(n.inputs[1], b)
        if scale is not None:
            self.s(n.inputs["Scale"], scale)
        return n.outputs["Vector"] if op not in ("LENGTH", "DOT_PRODUCT", "DISTANCE") else n.outputs["Value"]

    def xyz(self, v):
        n = self.node("ShaderNodeSeparateXYZ")
        self.s(n.inputs[0], v)
        return n.outputs["X"], n.outputs["Y"], n.outputs["Z"]

    def comb(self, x, y, z):
        n = self.node("ShaderNodeCombineXYZ")
        self.s(n.inputs[0], x)
        self.s(n.inputs[1], y)
        self.s(n.inputs[2], z)
        return n.outputs[0]

    def math(self, op, a, b=0.0, c=None, clamp=False):
        n = self.node("ShaderNodeMath", operation=op, use_clamp=clamp)
        self.s(n.inputs[0], a)
        self.s(n.inputs[1], b)
        if c is not None:
            self.s(n.inputs[2], c)
        return n.outputs[0]

    def add(self, a, b):
        return self.math("ADD", a, b)

    def mul(self, a, b):
        return self.math("MULTIPLY", a, b)

    def sstep(self, e0, e1, x):
        n = self.node("ShaderNodeMapRange", interpolation_type="SMOOTHSTEP")
        self.s(n.inputs["Value"], x)
        n.inputs["From Min"].default_value = e0
        n.inputs["From Max"].default_value = e1
        return n.outputs["Result"]

    def remap(self, x, a0, a1, b0=0.0, b1=1.0, clamp=True):
        n = self.node("ShaderNodeMapRange", clamp=clamp)
        self.s(n.inputs["Value"], x)
        n.inputs["From Min"].default_value = a0
        n.inputs["From Max"].default_value = a1
        n.inputs["To Min"].default_value = b0
        n.inputs["To Max"].default_value = b1
        return n.outputs["Result"]

    def mix(self, fac, a, b, blend="MIX"):
        n = self.node("ShaderNodeMix", data_type="RGBA", blend_type=blend)
        self.s(n.inputs[0], fac)
        cs = [x for x in n.inputs if x.type == "RGBA"]
        self.s(cs[0], a)
        self.s(cs[1], b)
        return [x for x in n.outputs if x.type == "RGBA"][0]

    def ramp(self, x, stops):
        n = self.node("ShaderNodeValToRGB")
        cr = n.color_ramp
        cr.interpolation = "EASE"
        while len(cr.elements) < len(stops):
            cr.elements.new(0.5)
        for e, (pos, col) in zip(cr.elements, stops):
            e.position = pos
            e.color = tuple(col) + ((1,) if len(col) == 3 else ())
        self.s(n.inputs[0], x)
        return n.outputs[0]

    def noise(self, vec=None, scale=5.0, detail=4.0, rough=0.55, dim="3D", out="Fac", w=0.0, distort=0.0):
        n = self.node("ShaderNodeTexNoise", noise_dimensions=dim)
        if vec is not None:
            self.s(n.inputs["Vector"], vec)
        n.inputs["Scale"].default_value = scale
        n.inputs["Detail"].default_value = detail
        n.inputs["Roughness"].default_value = rough
        n.inputs["Distortion"].default_value = distort
        if dim == "4D":
            n.inputs["W"].default_value = w
        return n.outputs[out]

    def voronoi(self, vec=None, scale=5.0, feature="F1", out="Distance", rand=1.0, metric="EUCLIDEAN"):
        n = self.node("ShaderNodeTexVoronoi", feature=feature, distance=metric)
        if vec is not None:
            self.s(n.inputs["Vector"], vec)
        n.inputs["Scale"].default_value = scale
        n.inputs["Randomness"].default_value = rand
        return n.outputs[out]

    def wave(self, vec=None, scale=5.0, distort=2.0, detail=2.0, kind="BANDS", axis="Z", profile="SIN"):
        n = self.node("ShaderNodeTexWave", wave_type=kind, wave_profile=profile)
        try:
            n.bands_direction = axis
        except Exception:
            pass
        if vec is not None:
            self.s(n.inputs["Vector"], vec)
        n.inputs["Scale"].default_value = scale
        n.inputs["Distortion"].default_value = distort
        n.inputs["Detail"].default_value = detail
        return n.outputs["Fac"]

    def attr(self, name, out="Fac"):
        return self.node("ShaderNodeAttribute", attribute_name=name).outputs[out]

    def geo(self, out):
        return self.node("ShaderNodeNewGeometry").outputs[out]

    def ao(self, dist=0.2, samples=16):
        n = self.node("ShaderNodeAmbientOcclusion", samples=samples)
        n.inputs["Distance"].default_value = dist
        return n.outputs["AO"]

    def bump(self, h, strength=0.4, dist=0.01, normal=None, invert=False):
        n = self.node("ShaderNodeBump", invert=invert)
        n.inputs["Strength"].default_value = strength
        n.inputs["Distance"].default_value = dist
        self.s(n.inputs["Height"], h)
        if normal is not None:
            self.s(n.inputs["Normal"], normal)
        return n.outputs["Normal"]

    def image(self, path, vec=None, ext="REPEAT", interp="Linear", out="Color"):
        img = bpy.data.images.load(path, check_existing=True)
        img.colorspace_settings.name = "Non-Color"
        n = self.node("ShaderNodeTexImage", extension=ext, interpolation=interp)
        n.image = img
        if vec is not None:
            self.s(n.inputs["Vector"], vec)
        return n.outputs[out]

    def rgb(self, r, g, b):
        return self.comb(r, g, b)

    def done(self, albedo, mask=(0, 0, 0), normal=None, rough=0.5, alpha=1.0, emit=None, emit_strength=0.0,
             transmission=0.0):
        self.albedo, self.mask, self.normal = albedo, mask, normal
        self.s(self.view.inputs["Base Color"], albedo)
        self.s(self.view.inputs["Roughness"], rough)
        self.s(self.view.inputs["Alpha"], alpha)
        self.s(self.view.inputs["Transmission Weight"], transmission)
        if emit is not None:
            self.s(self.view.inputs["Emission Color"], emit)
            self.view.inputs["Emission Strength"].default_value = emit_strength
        if normal is not None:
            self.s(self.view.inputs["Normal"], normal)
            self.s(self.diff.inputs["Normal"], normal)
        self.use("view")
        return self

    def use(self, what):
        surf = self.out.inputs["Surface"]
        for l in list(surf.links):
            self.links.remove(l)
        if what == "albedo":
            self.s(self.emit.inputs["Color"], self.albedo)
            self.emit.inputs["Strength"].default_value = 1.0
            self.links.new(self.emit.outputs[0], surf)
        elif what == "mask":
            self.s(self.emit.inputs["Color"], self.mask)
            self.emit.inputs["Strength"].default_value = 1.0
            self.links.new(self.emit.outputs[0], surf)
        elif what == "normal":
            self.links.new(self.diff.outputs[0], surf)
        else:
            self.links.new(self.view.outputs[0], surf)


ALL_PM = []


def pm(name):
    p = PM(name)
    ALL_PM.append(p)
    return p


def assign(obj, p):
    obj.data.materials.clear()
    obj.data.materials.append(p.mat)
    return obj


def new_image(name, size, alpha=False, data=False):
    img = bpy.data.images.new(name, size, size, alpha=alpha, float_buffer=False)
    if data:
        img.colorspace_settings.name = "Non-Color"
    return img


def bake(low, highs, size, out_dir, prefix, extrusion=0.03, ray=0.08, margin=8, ao=True, passes=("albedo", "mask", "normal")):
    """Nướng albedo/mask/normal từ highs sang low. Trả về dict tên -> đường dẫn PNG."""
    sc = bpy.context.scene
    sc.render.bake.margin = margin
    sc.render.bake.use_selected_to_active = True
    sc.render.bake.cage_extrusion = extrusion
    sc.render.bake.max_ray_distance = ray
    bm_ = bpy.data.materials.new(f"{prefix}_bake")
    try:
        bm_.use_nodes = True
    except Exception:
        pass
    tn = bm_.node_tree.nodes.new("ShaderNodeTexImage")
    bm_.node_tree.nodes.active = tn
    low.data.materials.clear()
    low.data.materials.append(bm_)
    res = {}
    os.makedirs(out_dir, exist_ok=True)
    for ps in passes:
        img = new_image(f"{prefix}_{ps}", size, data=ps != "albedo")
        tn.image = img
        for p in ALL_PM:
            p.use(ps)
        select(list(highs) + [low], low)
        if ps == "normal":
            sc.cycles.samples = 4
            bpy.ops.object.bake(type="NORMAL", normal_space="TANGENT", use_selected_to_active=True,
                                cage_extrusion=extrusion, max_ray_distance=ray, margin=margin)
        else:
            sc.cycles.samples = 1
            bpy.ops.object.bake(type="EMIT", use_selected_to_active=True, cage_extrusion=extrusion,
                                max_ray_distance=ray, margin=margin)
        path = os.path.join(out_dir, f"{prefix}_{ps}.png")
        img.filepath_raw = path
        img.file_format = "PNG"
        img.save()
        res[ps] = path
    if ao:
        img = new_image(f"{prefix}_ao", size, data=True)
        tn.image = img
        sc.cycles.samples = 48
        select(list(highs) + [low], low)
        bpy.ops.object.bake(type="AO", use_selected_to_active=True, cage_extrusion=extrusion, max_ray_distance=ray,
                            margin=margin)
        path = os.path.join(out_dir, f"{prefix}_ao.png")
        img.filepath_raw = path
        img.file_format = "PNG"
        img.save()
        res["ao"] = path
    for p in ALL_PM:
        p.use("view")
    return res


def img_np(path):
    img = bpy.data.images.load(path, check_existing=False)
    w, h = img.size
    a = np.array(img.pixels[:], dtype=np.float32).reshape(h, w, 4)
    bpy.data.images.remove(img)
    return a


def np_save(arr, path, srgb=True):
    h, w = arr.shape[:2]
    img = bpy.data.images.new(os.path.basename(path), w, h, alpha=True)
    if not srgb:
        img.colorspace_settings.name = "Non-Color"
    a = np.ones((h, w, 4), np.float32)
    a[..., : arr.shape[2]] = arr
    img.pixels.foreach_set(a.ravel())
    img.filepath_raw = path
    img.file_format = "PNG"
    img.save()
    return img


def finish_albedo(paths, ao_strength=0.55, ao_tint=(0.35, 0.3, 0.55)):
    """AO nướng nhân mềm vào albedo, vùng tối ngả tím lạnh kiểu tranh vẽ tay (không xám bẩn)."""
    a = img_np(paths["albedo"])
    if "ao" in paths:
        o = img_np(paths["ao"])[..., :1]
        o = np.clip(o, 0, 1) ** 0.8
        tint = np.array(ao_tint, np.float32)
        k = (1 - o) * ao_strength
        a[..., :3] = a[..., :3] * (1 - k) + a[..., :3] * tint * k
    np_save(a[..., :3], paths["albedo"])


# ---------------------------------------------------------------- xương và trọng số

def armature(name, bones):
    """bones: list (tên, đầu, đuôi, cha, roll). Trả về object armature."""
    arm = bpy.data.armatures.new(name)
    ob = link(bpy.data.objects.new(name, arm))
    select([ob])
    bpy.ops.object.mode_set(mode="EDIT")
    eb = arm.edit_bones
    for b in bones:
        n, h, t, par = b[:4]
        e = eb.new(n)
        e.head, e.tail = Vector(h), Vector(t)
        if len(b) > 4:
            e.roll = b[4]
        if par:
            e.parent = eb[par]
            e.use_connect = False
    bpy.ops.object.mode_set(mode="OBJECT")
    return ob


def seg_dist(p, a, b):
    ab = b - a
    t = max(0.0, min(1.0, (p - a).dot(ab) / max(ab.length_squared, 1e-9)))
    return (p - (a + ab * t)).length


def weight_by_distance(obj, arm, allow=None, rigid=None, power=4.0, max_inf=3, falloff=None):
    """Trọng số theo khoảng cách đỉnh tới đoạn xương (nghịch đảo lũy thừa), giữ max_inf xương mạnh nhất.
    allow: hàm (vertex co) -> list tên xương được phép. rigid: hàm (vertex index) -> tên xương cứng hoặc None."""
    bones = [(b.name, b.head_local.copy(), b.tail_local.copy()) for b in arm.data.bones if b.use_deform]
    names = [b[0] for b in bones]
    for n in names:
        if n not in obj.vertex_groups:
            obj.vertex_groups.new(name=n)
    vg = {n: obj.vertex_groups[n] for n in names}
    for v in obj.data.vertices:
        r = rigid(v.index, v.co) if rigid else None
        if r:
            vg[r].add([v.index], 1.0, "REPLACE")
            continue
        cand = allow(v.co, v.index) if allow else names
        ws = []
        for n, h, t in bones:
            if n not in cand:
                continue
            d = seg_dist(v.co, h, t) + 1e-4
            ws.append((1.0 / d ** power, n))
        ws.sort(reverse=True)
        ws = ws[:max_inf]
        s = sum(w for w, _ in ws)
        for w, n in ws:
            if w / s > 0.02:
                vg[n].add([v.index], w / s, "REPLACE")
    obj.parent = arm
    m = obj.modifiers.new("arm", "ARMATURE")
    m.object = arm


def face_rigid_map(obj, bone_of_part_attr="bone"):
    """Đọc thuộc tính đỉnh 'bone' (INT, chỉ số trong list tên) đã ghi lúc dựng chi tiết cứng."""
    return obj.data.attributes.get(bone_of_part_attr)


def tag_bone(obj, idx):
    me = obj.data
    a = me.attributes.get("bone") or me.attributes.new("bone", "INT", "POINT")
    a.data.foreach_set("value", [idx] * len(me.vertices))
    return obj


# ---------------------------------------------------------------- hoạt ảnh

class Anim:
    """Dựng clip bằng hàm pose(t) -> {bone: (loc, euler hoặc quat, scale)} rồi key theo từng khung."""

    def __init__(self, arm):
        self.arm = arm
        self.names = []

    def clip(self, name, dur, fn, fps=30, loop=True):
        arm = self.arm
        act = bpy.data.actions.new(name)
        act.use_fake_user = True
        arm.animation_data_create()
        arm.animation_data.action = act
        nf = max(2, int(round(dur * fps)))
        pbs = arm.pose.bones
        for f in range(nf + 1):
            t = f / nf
            pose = fn(t)
            for pb in pbs:
                loc, rot, sc = pose.get(pb.name, ((0, 0, 0), (0, 0, 0), (1, 1, 1)))
                pb.location = loc
                pb.rotation_mode = "QUATERNION"
                if len(rot) == 4:
                    pb.rotation_quaternion = rot
                else:
                    pb.rotation_quaternion = __import__("mathutils").Euler(rot).to_quaternion()
                pb.scale = sc if not isinstance(sc, (int, float)) else (sc, sc, sc)
                pb.keyframe_insert("location", frame=f + 1)
                pb.keyframe_insert("rotation_quaternion", frame=f + 1)
                pb.keyframe_insert("scale", frame=f + 1)
        tr = arm.animation_data.nla_tracks.new()
        tr.name = name
        st = tr.strips.new(name, 1, act)
        st.name = name
        arm.animation_data.action = None
        self.names.append(name)
        return act


def export_glb(path, objs):
    select(objs, objs[0])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=path, export_format="GLB", use_selection=True, export_apply=False,
        export_animations=True, export_animation_mode="NLA_TRACKS", export_force_sampling=True,
        export_frame_step=1, export_skins=True, export_all_influences=False, export_morph=False,
        export_tangents=True, export_image_format="WEBP", export_image_quality=88,
        export_yup=True, export_def_bones=True, export_optimize_animation_size=True,
        export_anim_slide_to_zero=True, export_bake_animation=False, export_reset_pose_bones=True,
    )


def game_material(name, maps, alpha=False):
    """Material Principled tham chiếu atlas (albedo, normal, mask ở kênh emissive) để glTF nhúng ảnh."""
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    nt = m.node_tree
    p = nt.nodes.get("Principled BSDF") or nt.nodes.new("ShaderNodeBsdfPrincipled")

    def tex(path, data):
        img = bpy.data.images.load(path, check_existing=True)
        if data:
            img.colorspace_settings.name = "Non-Color"
        n = nt.nodes.new("ShaderNodeTexImage")
        n.image = img
        return n

    a = tex(maps["albedo"], False)
    nt.links.new(a.outputs["Color"], p.inputs["Base Color"])
    if "normal" in maps:
        nn = nt.nodes.new("ShaderNodeNormalMap")
        t = tex(maps["normal"], True)
        nt.links.new(t.outputs["Color"], nn.inputs["Color"])
        nt.links.new(nn.outputs["Normal"], p.inputs["Normal"])
    if "mask" in maps:
        t = tex(maps["mask"], True)
        nt.links.new(t.outputs["Color"], p.inputs["Emission Color"])
        p.inputs["Emission Strength"].default_value = 1.0
    p.inputs["Roughness"].default_value = 0.5
    if alpha:
        p.inputs["Alpha"].default_value = 0.7
        try:
            m.surface_render_method = "BLENDED"
        except Exception:
            pass
    return m


def split_materials(obj, maps, alpha_parts=("jelly", "fin")):
    """Tạo material theo part (tên material = part) cùng atlas, gán material_index theo thuộc tính part."""
    me = obj.data
    pa = me.attributes.get("part")
    used = sorted({pa.data[i].value for i in range(len(me.polygons))}) if pa else [0]
    me.materials.clear()
    idx = {}
    for code in used:
        nm = PARTS[code]
        me.materials.append(game_material(nm, maps, alpha=nm in alpha_parts))
        idx[code] = len(me.materials) - 1
    if pa:
        for p in me.polygons:
            p.material_index = idx[pa.data[p.index].value]


def rnd(seed):
    return random.Random(seed)


# ---------------------------------------------------------------- hàn thân, bám bề mặt

def weld(objs, name, voxel, smooth_iter=6, factor=0.5):
    """Hàn nhiều khối (thân, đầu, tay) thành một lưới liền bằng voxel remesh, rồi làm mịn để mối nối bo tròn."""
    cp = [dup(o, o.name + "_w") for o in objs]
    for o in cp:
        apply_tf(o)
    o = join(cp, name)
    m = o.modifiers.new("rm", "REMESH")
    m.mode = "VOXEL"
    m.voxel_size = voxel
    m.adaptivity = 0.0
    m.use_smooth_shade = True
    s = o.modifiers.new("sm", "SMOOTH")
    s.iterations = smooth_iter
    s.factor = factor
    apply_mods(o)
    smooth(o)
    return o


class Hug:
    """Đặt phụ kiện sát bề mặt thân: điểm gần nhất trên lưới + pháp tuyến × khoảng hở."""

    def __init__(self, obj):
        from mathutils.bvhtree import BVHTree
        self.t = BVHTree.FromObject(obj, bpy.context.evaluated_depsgraph_get())

    def near(self, p):
        loc, n, _, _ = self.t.find_nearest(Vector(p))
        return loc, n

    def on(self, p, off=0.0):
        loc, n = self.near(p)
        return loc + n * off

    def path(self, pts, off=0.0):
        return [self.on(p, off) for p in pts]

    def pull(self, obj, off=0.0):
        """Kéo đỉnh nằm xa bề mặt vào sát (giữ hốc lõm vào trong)."""
        for v in obj.data.vertices:
            loc, n = self.near(v.co)
            d = (v.co - loc).dot(n)
            if d > off:
                v.co = v.co - n * (d - off)

    def ray(self, o, d):
        loc, *_ = self.t.ray_cast(Vector(o), Vector(d).normalized())
        return loc
