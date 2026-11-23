"""Phụ kiện nhân vật chính cho VRM: dải vải/tua có xương + spring bone riêng, huy hiệu nguyên tố phát sáng, giáp vai kim loại.
blender -b --python tools/vrm/hero_acc.py -- <vào.vrm> <ra.vrm> <cfg.json>
Tọa độ cấu hình theo [trái, trước, lên] của nhân vật, tính từ đầu xương (tên humanoid VRM 1.0, vd. hips, left_upper_arm)."""
import json
import math
import sys

import bmesh
import bpy
from mathutils import Vector

src, dst, cfgp = sys.argv[sys.argv.index("--") + 1 :][:3]
cfg = json.load(open(cfgp, encoding="utf-8"))
bpy.ops.wm.read_homefile(use_empty=True)
bpy.ops.import_scene.vrm(filepath=src)
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
ext = arm.data.vrm_addon_extension
A, Ai = arm.matrix_world, arm.matrix_world.inverted()
human = ext.vrm1.humanoid.human_bones


def hb(n):
    h = getattr(human, n, None)
    return h.node.bone_name if h is not None and h.node.bone_name else n


def head(n):
    return A @ arm.data.bones[hb(n)].head_local


ft = arm.data.bones[hb("left_foot")]
fy = 1.0 if (ft.tail_local - ft.head_local).y > 0 else -1.0
lx = 1.0 if head("left_upper_arm").x > 0 else -1.0


def sem(v):
    return Vector((lx * v[0], fy * v[1], v[2]))


def hex_rgb(h):
    h = h.lstrip("#")
    return [((int(h[i : i + 2], 16) / 255) ** 2.2) for i in (0, 2, 4)]


def mat(color, shade=None, emissive=0.0):
    key = f"Acc_{color}" + (f"_e{emissive}" if emissive else "")
    m = bpy.data.materials.get(key)
    if m:
        return m
    m = bpy.data.materials.new(key)
    m.use_nodes = True
    mt = m.vrm_addon_extension.mtoon1
    mt.enabled = True
    mt.pbr_metallic_roughness.base_color_factor = [*hex_rgb(color), 1]
    mt.extensions.vrmc_materials_mtoon.shade_color_factor = hex_rgb(shade or color)
    mt.extensions.vrmc_materials_mtoon.shading_toony_factor = 0.85
    mt.extensions.vrmc_materials_mtoon.parametric_rim_color_factor = hex_rgb("#fff2c8")
    mt.extensions.vrmc_materials_mtoon.parametric_rim_fresnel_power_factor = 3.0
    mt.extensions.vrmc_materials_mtoon.parametric_rim_lift_factor = 0.1
    mt.emissive_factor = [c * emissive for c in hex_rgb(color)] if emissive else [0, 0, 0]
    if emissive:
        mt.extensions.khr_materials_emissive_strength.emissive_strength = 1.0
    return m


def finish(name, bm, weights, m, thick=0.0, smooth=True):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    if thick:
        ob.modifiers.new("Solid", "SOLIDIFY").thickness = thick
        dg = bpy.context.evaluated_depsgraph_get()
        me2 = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
        bpy.data.objects.remove(ob)
        ob = bpy.data.objects.new(name, me2)
        bpy.context.scene.collection.objects.link(ob)
        me = me2
    for f in me.polygons:
        f.use_smooth = smooth
    me.materials.append(m)
    w = weights(ob) if callable(weights) else {weights: list(range(len(me.vertices)))}
    for bn, idx in w.items():
        ob.vertex_groups.new(name=bn).add(idx, 1.0, "REPLACE")
    ob.parent = arm
    ob.modifiers.new("Armature", "ARMATURE").object = arm
    return ob


sb = ext.spring_bone1
legs = next((g for g in sb.collider_groups if g.vrm_name == "Legs"), None)

# ---- dải vải / tua: chuỗi xương riêng + spring
chains = []
bpy.context.view_layer.objects.active = arm
bpy.ops.object.mode_set(mode="EDIT")
for c in cfg.get("chains", []):
    n, L = c.get("bones", 3), c["length"]
    d = sem(c["dir"]).normalized()
    p0 = head(c["bone"]) + sem(c["start"])
    names, par = [], arm.data.edit_bones[hb(c["bone"])]
    for i in range(n):
        eb = arm.data.edit_bones.new(f"J_Sec_Acc_{c['name']}_{i}")
        eb.head, eb.tail = Ai @ (p0 + d * L * i / n), Ai @ (p0 + d * L * (i + 1) / n)
        eb.parent, eb.use_connect = par, i > 0
        par = eb
        names.append(eb.name)
    chains.append((c, names, p0, d))
bpy.ops.object.mode_set(mode="OBJECT")

for c, names, p0, d in chains:
    n, L = len(names), c["length"]
    up = sem([0, 1, 0])
    side = d.cross(up).normalized() if abs(d.dot(up)) < 0.95 else sem([1, 0, 0])
    if c.get("side"):
        side = sem(c["side"]).normalized()
    seg = c.get("segs", n * 2)
    strips = c.get("strips", 1)
    bm = bmesh.new()
    for s in range(strips):
        off = side * c.get("gap", 0.0) * (s - (strips - 1) / 2)
        vs = []
        for i in range(seg + 1):
            t = i / seg
            w = c["width"] * (1 - c.get("taper", 0.4) * t) / 2
            pt = p0 + off + d * L * t + sem(c.get("bulge", [0, 0, 0])) * math.sin(math.pi * t)
            vs.append((bm.verts.new(pt - side * w), bm.verts.new(pt + side * w)))
        for i in range(seg):
            bm.faces.new((vs[i][0], vs[i][1], vs[i + 1][1], vs[i + 1][0]))
        if c.get("point"):
            tip = bm.verts.new(p0 + off + d * (L + c["width"] * 0.6))
            bm.faces.new((vs[-1][0], vs[-1][1], tip))

    def wts(ob, names=names, p0=p0, d=d, L=L, n=n):
        out = {}
        for v in ob.data.vertices:
            t = max(0.0, min(0.999, (v.co - p0).dot(d) / L))
            out.setdefault(names[int(t * n)], []).append(v.index)
        return out

    finish(f"Acc_{c['name']}", bm, wts, mat(c["color"], c.get("shade"), c.get("emissive", 0)), c.get("thick", 0.004), False)
    bpy.ops.vrm.add_spring_bone1_spring(armature_object_name=arm.name)
    si = len(sb.springs) - 1
    sp = sb.springs[si]
    sp.vrm_name = c["name"]
    for k, bn in enumerate(names):
        bpy.ops.vrm.add_spring_bone1_spring_joint(armature_object_name=arm.name, spring_index=si)
        j = sp.joints[-1]
        j.node.bone_name = bn
        j.stiffness = c.get("stiffness", 0.6)
        j.drag_force = c.get("drag", 0.4)
        j.gravity_power = c.get("gravity", 0.3)
        j.hit_radius = c.get("hit", 0.02)
    if legs and c.get("legs", True):
        bpy.ops.vrm.add_spring_bone1_spring_collider_group(armature_object_name=arm.name, spring_index=si)
        sp.collider_groups[-1].collider_group_uuid = legs.uuid
    print("CHAIN", c["name"], len(names))

# ---- huy hiệu nguyên tố: khung lục giác kim loại + ngọc sao phát sáng
for k, e in enumerate(cfg.get("emblems", [])):
    nrm = sem(e.get("normal", [0, 1, 0])).normalized()
    c0 = head(e["bone"]) + sem(e["pos"])
    q = Vector((0, 0, 1)).rotation_difference(nrm)
    r = e.get("size", 0.035)

    def ring(bm, rad, z, sides, rot=0.0, inner=None):
        return [bm.verts.new(c0 + q @ Vector(((inner if (inner and i % 2) else rad) * math.cos(rot + math.tau * i / sides),
                                              (inner if (inner and i % 2) else rad) * math.sin(rot + math.tau * i / sides), z)))
                for i in range(sides)]

    bm = bmesh.new()
    o1, o2, i1, i2 = ring(bm, r, 0, 6), ring(bm, r, r * 0.25, 6), ring(bm, r * 0.72, 0, 6), ring(bm, r * 0.72, r * 0.3, 6)
    for i in range(6):
        j = (i + 1) % 6
        for a, b in ((o1, o2), (o2, i2), (i2, i1)):
            bm.faces.new((a[i], a[j], b[j], b[i]))
    finish(f"Acc_Emblem{k}", bm, hb(e["bone"]), mat(e.get("frame", "#f2a227"), e.get("frameShade", "#a8661a")), 0, False)
    bm = bmesh.new()
    pts = e.get("points", 6)
    a, b = ring(bm, r * 0.68, r * 0.32, pts * 2, math.pi / 2, r * 0.3), ring(bm, r * 0.68, r * 0.1, pts * 2, math.pi / 2, r * 0.3)
    top, bot = bm.verts.new(c0 + q @ Vector((0, 0, r * 0.5))), bm.verts.new(c0 + q @ Vector((0, 0, r * 0.05)))
    for i in range(pts * 2):
        j = (i + 1) % (pts * 2)
        bm.faces.new((a[i], a[j], top))
        bm.faces.new((b[j], b[i], bot))
        bm.faces.new((a[j], a[i], b[i], b[j]))
    finish(f"Acc_EmblemGem{k}", bm, hb(e["bone"]), mat(e["gem"], e.get("gemShade"), e.get("glow", 2.0)), 0, False)

# ---- giáp vai / tấm kim loại: nửa elip
for k, p in enumerate(cfg.get("plates", [])):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=8, radius=1.0)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < -0.15], context="VERTS")
    s = sem(p["scale"])
    for v in bm.verts:
        v.co = head(p["bone"]) + sem(p["pos"]) + Vector((v.co.x * abs(s.x), v.co.y * abs(s.y), v.co.z * abs(s.z)))
    finish(f"Acc_Plate{k}", bm, hb(p["bone"]), mat(p["color"], p.get("shade")), p.get("thick", 0.004), True)

# ---- angel ring: matcap MToon (vòng sáng theo hướng nhìn, nằm ở phần tóc pháp tuyến hướng lên)
hr = cfg.get("hairRing")
if hr:
    N = 256
    img = bpy.data.images.new("HairRingMatcap", N, N)
    c, w, y0 = hex_rgb(hr.get("color", "#cfe8ff")), hr.get("width", 0.07), hr.get("ny", 0.5)
    px = []
    for r in range(N):
        for q in range(N):
            nx, ny = (q + 0.5) / N * 2 - 1, (r + 0.5) / N * 2 - 1
            k = max(0.0, 1 - nx * nx / 0.8) * math.exp(-(((ny - y0) / w) ** 2)) * (0.6 + 0.4 * math.sin(nx * 37) ** 2)
            k = k if nx * nx + ny * ny < 1 else 0.0
            px += [c[0] * k, c[1] * k, c[2] * k, 1.0]
    img.pixels.foreach_set(px)
    img.pack()
    for m in bpy.data.materials:
        if "_HAIR" not in m.name.upper():
            continue
        x = m.vrm_addon_extension.mtoon1.extensions.vrmc_materials_mtoon
        x.matcap_texture.index.source = img
        x.matcap_factor = [hr.get("strength", 0.6)] * 3
        print("RING", m.name)

ext.vrm1.meta.vrm_name = cfg.get("name", ext.vrm1.meta.vrm_name)
bpy.ops.export_scene.vrm(filepath=dst)
print("ACC OK", dst, [s.vrm_name for s in sb.springs][-6:])
