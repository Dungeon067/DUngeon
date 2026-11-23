"""Hậu kỳ mô hình VRM xuất từ VRoid bằng Blender + VRM Add-on (S26).

blender -b --python tools/vrm/post.py -- <vào.vrm> <ra.vrm> <ra.blend> <cấu hình.json>
Cấu hình (JSON): {"pins": [{"side": 1|-1, "pos": [x, y, z], "rot": [rx, ry, rz], "size": 0.034,
                  "color": "#f2a227"}], "springRename": {"TopsUpperArm": "CoatSkirt"},
                  "skirtColliders": true}
pos: độ lệch (m) so với xương đầu, trục Blender (X sang trái nhân vật, Y ra sau, Z lên); side=-1 lật X.
"""

import json
import math
import sys

import bmesh
import bpy
from mathutils import Euler, Matrix, Vector

src, dst, blend, cfgp = sys.argv[sys.argv.index("--") + 1 :][:4]
cfg = json.load(open(cfgp, encoding="utf-8"))

bpy.ops.wm.read_homefile(use_empty=True)
bpy.ops.import_scene.vrm(filepath=src)
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
ext = arm.data.vrm_addon_extension


def hex_rgb(h):
    h = h.lstrip("#")
    return [((int(h[i : i + 2], 16) / 255) ** 2.2) for i in (0, 2, 4)]


def mtoon_solid(name, color, shade, emissive=(0, 0, 0)):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    mt = m.vrm_addon_extension.mtoon1
    mt.enabled = True
    mt.pbr_metallic_roughness.base_color_factor = [*hex_rgb(color), 1]
    mt.extensions.vrmc_materials_mtoon.shade_color_factor = hex_rgb(shade)
    mt.extensions.vrmc_materials_mtoon.shading_toony_factor = 0.85
    mt.extensions.vrmc_materials_mtoon.parametric_rim_color_factor = hex_rgb("#ffe7a8")
    mt.extensions.vrmc_materials_mtoon.parametric_rim_fresnel_power_factor = 3.0
    mt.emissive_factor = list(emissive)
    return m


def square_frame(size, inner, depth, bevel):
    bm = bmesh.new()
    o, i = size / 2, inner / 2
    # khung vuông rỗng: 4 thanh hộp
    for x0, x1, y0, y1 in ((-o, o, i, o), (-o, o, -o, -i), (-o, -i, -i, i), (i, o, -i, i)):
        bmesh.ops.create_cube(bm, size=1.0)
        v = bm.verts[-8:]
        for vv in v:
            vv.co.x = x0 if vv.co.x < 0 else x1
            vv.co.z = y0 if vv.co.z < 0 else y1
            vv.co.y = -depth / 2 if vv.co.y < 0 else depth / 2
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    me = bpy.data.meshes.new("HairPin")
    bm.to_mesh(me)
    bm.free()
    return me


# Nhập VRM xong các đối tượng vẫn được chọn; bỏ chọn để transform_apply chỉ áp lên kẹp tóc
# (nếu không, empty của collider bị đưa về gốc tọa độ).
for o in bpy.context.selected_objects:
    o.select_set(False)
head = arm.data.bones["J_Bip_C_Head"]
head_pos = arm.matrix_world @ head.head_local
eye = arm.matrix_world @ arm.data.bones["J_Adj_L_FaceEye"].head_local
fy = 1.0 if eye.y > head_pos.y else -1.0
print("AXES", tuple(round(v, 3) for v in eye), fy)
lx = 1.0 if (arm.matrix_world @ arm.data.bones["J_Bip_L_UpperArm"].head_local).x > 0 else -1.0
hair = [o for o in bpy.data.objects if o.type == "MESH" and o.name.startswith("Hair")]
for k, p in enumerate(cfg.get("pins", [])):
    side = p.get("side", 1)
    size = p.get("size", 0.034)
    me = square_frame(size, size * 0.6, size * 0.22, 0)
    ob = bpy.data.objects.new(f"HairPin_{'L' if side > 0 else 'R'}", me)
    bpy.context.scene.collection.objects.link(ob)
    if "ray" in p:
        # đặt kẹp lên bề mặt tóc: bắn tia từ ngoài vào tâm đầu theo góc phương vị/độ cao
        az, z = math.radians(p["ray"][0]) * side, p["ray"][1]
        d = Vector((lx * math.sin(az), fy * math.cos(az), 0))
        c = head_pos + Vector((0, 0, z))
        hit, nrm = None, None
        for h in hair:
            mw = h.matrix_world
            inv = mw.inverted()
            okh, loc, n, _ = h.ray_cast(inv @ (c + d * 0.5), (inv.to_3x3() @ -d).normalized())
            if okh:
                w = mw @ loc
                if hit is None or (w - c).length > (hit - c).length:
                    hit, nrm = w, (mw.to_3x3() @ n).normalized()
        assert hit is not None, "không bắn trúng tóc"
        print("PIN", side, tuple(round(v, 3) for v in hit), tuple(round(v, 2) for v in nrm), tuple(round(v, 3) for v in head_pos))
        if nrm.dot(d) < 0:
            nrm.negate()
        yv = (Matrix.Rotation(-side * lx * fy * math.radians(p.get("turn", 0)), 3, "Z") @ nrm).normalized()
        xv = Vector((0, 0, 1)).cross(yv).normalized()
        zv = yv.cross(xv)
        rot = Matrix((xv, yv, zv)).transposed().to_4x4() @ Euler(
            [math.radians(a) for a in p.get("rot", [0, 0, 0])]
        ).to_matrix().to_4x4()
        ob.matrix_world = Matrix.Translation(hit + nrm * size * p.get("lift", 0.15)) @ rot
    else:
        pos = Vector(p["pos"])
        pos.x *= side
        rx, ry, rz = (math.radians(a) for a in p.get("rot", [0, 0, 0]))
        ob.matrix_world = Matrix.Translation(head_pos + pos) @ Euler((rx, ry * side, rz * side)).to_matrix().to_4x4()
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    mod = ob.modifiers.new("Bevel", "BEVEL")
    mod.width = size * 0.05
    mod.segments = 1
    bpy.ops.object.modifier_apply(modifier="Bevel")
    for f in me.polygons:
        f.use_smooth = False
    mat = bpy.data.materials.get("HairPin_MToon") or mtoon_solid(
        "HairPin_MToon", p.get("color", "#f2a227"), p.get("shade", "#b8641a"), (0.12, 0.07, 0.0)
    )
    me.materials.append(mat)
    vg = ob.vertex_groups.new(name="J_Bip_C_Head")
    vg.add(list(range(len(me.vertices))), 1.0, "REPLACE")
    ob.parent = arm
    am = ob.modifiers.new("Armature", "ARMATURE")
    am.object = arm
    ob.select_set(False)


def sem(v):
    """[trái, trước, lên] của nhân vật -> trục Blender của mô hình đã nhập."""
    return Vector((lx * v[0], fy * v[1], v[2]))


def attach(ob, weights, color, shade, emissive=(0, 0, 0), flat=False):
    """Gắn khối phụ kiện vào xương: weights = {tên xương: [chỉ số đỉnh]} hoặc tên xương (tất cả đỉnh)."""
    me = ob.data
    for f in me.polygons:
        f.use_smooth = not flat
    key = f"Acc_{color}"
    me.materials.append(bpy.data.materials.get(key) or mtoon_solid(key, color, shade, emissive))
    if isinstance(weights, str):
        weights = {weights: list(range(len(me.vertices)))}
    for bn, idx in weights.items():
        ob.vertex_groups.new(name=bn).add(idx, 1.0, "REPLACE")
    ob.parent = arm
    ob.modifiers.new("Armature", "ARMATURE").object = arm


def bake(ob):
    """Áp mọi modifier/curve thành lưới tam giác thường."""
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    me.transform(ob.matrix_world)
    nob = bpy.data.objects.new(ob.name, me)
    bpy.context.scene.collection.objects.link(nob)
    bpy.data.objects.remove(ob)
    return nob


def bone_pos(name):
    return arm.matrix_world @ arm.data.bones[name].head_local


for k, r in enumerate(cfg.get("rings", [])):
    # vòng xuyến (dây buộc tóc, dây cổ): tâm = xương + pos, trục = "axis" theo [trái, trước, lên]
    bpy.ops.mesh.primitive_torus_add(
        major_radius=r["major"], minor_radius=r["minor"], major_segments=r.get("seg", 20), minor_segments=r.get("minSeg", 6)
    )
    ob = bpy.context.active_object
    ob.name = f"Ring_{k}"
    axis = sem(r.get("axis", [0, 0, 1])).normalized()
    ob.matrix_world = Matrix.Translation(bone_pos(r["bone"]) + sem(r["pos"])) @ Vector((0, 0, 1)).rotation_difference(axis).to_matrix().to_4x4()
    if r.get("scale"):
        ob.scale = r["scale"]
    ob.select_set(False)
    ob = bake(ob)
    attach(ob, r["bone"], r["color"], r.get("shade", r["color"]))

hair_bones = [b for b in arm.data.bones if b.name.startswith("J_Sec_Hair")]
for k, rb in enumerate(cfg.get("ribbons", [])):
    # dải vải từ "start" (so với xương "bone") thả theo "dir"; mỗi đỉnh bám xương tóc gần nhất để đung đưa cùng tóc
    n = rb.get("segs", 4)
    d = sem(rb["dir"]).normalized()
    p0 = bone_pos(rb["bone"]) + sem(rb["start"])
    pts = [p0 + d * rb["length"] * i / n for i in range(n + 1)]
    side = d.cross(sem([0, 1, 0])).normalized() if abs(d.dot(sem([0, 1, 0]).normalized())) < 0.95 else sem([1, 0, 0])
    w = side * rb.get("width", 0.02) / 2
    bm = bmesh.new()
    vs = []
    for i, pt in enumerate(pts):
        t = 1 - 0.45 * i / n
        vs.append((bm.verts.new(pt - w * t), bm.verts.new(pt + w * t)))
    for i in range(n):
        bm.faces.new((vs[i][0], vs[i][1], vs[i + 1][1], vs[i + 1][0]))
    me = bpy.data.meshes.new(f"Ribbon_{k}")
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(f"Ribbon_{k}", me)
    bpy.context.scene.collection.objects.link(ob)
    ob.modifiers.new("Solid", "SOLIDIFY").thickness = rb.get("thick", 0.003)
    ob = bake(ob)
    weights = {}
    for v in ob.data.vertices:
        hb = min(hair_bones, key=lambda q: ((arm.matrix_world @ q.head_local) - v.co).length)
        far = ((arm.matrix_world @ hb.head_local) - v.co).length > rb.get("reach", 0.06)
        weights.setdefault(rb["bone"] if far else hb.name, []).append(v.index)
    print("RIBBON", k, {kk: len(vv) for kk, vv in weights.items()})
    attach(ob, weights, rb["color"], rb.get("shade", rb["color"]), flat=True)

for k, hk in enumerate(cfg.get("hooks", [])):
    # móc câu nhỏ: thân thẳng + cung chữ J + ngạnh, uốn bằng đường cong có độ dày
    sz = hk.get("size", 0.02)
    cu = bpy.data.curves.new(f"Hook_{k}", "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = hk.get("wire", 0.0018)
    cu.bevel_resolution = 1
    cu.resolution_u = 4
    path = [(0, 0, 0.5), (0, 0, -0.25)] + [
        (0.22 * (1 - math.cos(a)), 0, -0.25 - 0.22 * math.sin(a)) for a in [math.radians(d) for d in (30, 60, 90, 120, 150, 180)]
    ] + [(0.44, 0, -0.05), (0.34, 0, -0.12)]
    sp = cu.splines.new("POLY")
    sp.points.add(len(path) - 1)
    for p_, (x, y, z) in zip(sp.points, path):
        p_.co = (x * sz, y * sz, z * sz, 1)
    cu.splines.new("POLY")
    eye_ring = cu.splines[-1]
    eye_ring.points.add(7)
    for i, p_ in enumerate(eye_ring.points):
        a = i / 8 * 2 * math.pi
        p_.co = (0.08 * sz * math.cos(a), 0, (0.58 + 0.08 * math.sin(a)) * sz, 1)
    eye_ring.use_cyclic_u = True
    ob = bpy.data.objects.new(f"Hook_{k}", cu)
    bpy.context.scene.collection.objects.link(ob)
    yaw = math.atan2(fy * 0, 1)
    face = Vector((0, -fy, 0)).rotation_difference(Vector((0, -1, 0)))
    ob.matrix_world = Matrix.Translation(bone_pos(hk["bone"]) + sem(hk["pos"])) @ face.to_matrix().to_4x4() @ Euler(
        [math.radians(a) for a in hk.get("rot", [0, 0, 0])]
    ).to_matrix().to_4x4()
    ob = bake(ob)
    attach(ob, hk["bone"], hk.get("color", "#c8813c"), hk.get("shade", "#7a4520"), (0.08, 0.04, 0.0))

sb = ext.spring_bone1
for s in sb.springs:
    new = cfg.get("springRename", {}).get(s.vrm_name)
    if new:
        s.vrm_name = new
if cfg.get("skirtColliders"):
    # cầu va chạm ở hông/đùi/gối để vạt áo không xuyên chân khi chạy
    spheres = cfg.get(
        "legSpheres",
        [["J_Bip_C_Hips", 0.11], ["J_Bip_L_UpperLeg", 0.075], ["J_Bip_R_UpperLeg", 0.075],
         ["J_Bip_L_LowerLeg", 0.06], ["J_Bip_R_LowerLeg", 0.06]],
    )
    bpy.ops.vrm.add_spring_bone1_collider_group(armature_object_name=arm.name)
    grp = sb.collider_groups[-1]
    grp.vrm_name = "Legs"
    for bone, r in spheres:
        bpy.ops.vrm.add_spring_bone1_collider(armature_object_name=arm.name)
        col = sb.colliders[-1]
        col.node.bone_name = bone
        col.shape_type = "Sphere"
        col.shape.sphere.radius = r
        col.shape.sphere.offset = (0.0, 0.0, 0.0)
        gi = list(sb.collider_groups).index(grp)
        bpy.ops.vrm.add_spring_bone1_collider_group_collider(armature_object_name=arm.name, collider_group_index=gi)
        grp.colliders[-1].collider_uuid = col.uuid
    for si, s in enumerate(sb.springs):
        if "Skirt" in s.vrm_name or "Skirt" in s.joints[0].node.bone_name:
            bpy.ops.vrm.add_spring_bone1_spring_collider_group(armature_object_name=arm.name, spring_index=si)
            s.collider_groups[-1].collider_group_uuid = grp.uuid
            for j in s.joints:
                j.drag_force = max(j.drag_force, cfg.get("skirtDrag", 0.35))
                j.gravity_power = max(j.gravity_power, cfg.get("skirtGravity", 0.15))

bpy.ops.wm.save_as_mainfile(filepath=blend)
bpy.ops.export_scene.vrm(filepath=dst)
print("POST OK", [g.vrm_name for g in sb.collider_groups], [(s.vrm_name, len(s.collider_groups)) for s in sb.springs][:9])
