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
