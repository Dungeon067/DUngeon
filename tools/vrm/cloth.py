"""Vải có trọng lượng cho VRM (S26): spring bone váy/vạt áo nặng và chậm, collider capsule ở hông/đùi/gối,
vải hai lớp (mặt trong cùng texture nhưng tối), quần bó tối màu dưới váy.
blender -b --python tools/vrm/cloth.py -- <vào.vrm> <ra.vrm> [--shorts "#272838"] [--blend out.blend]
Chuỗi spring nào không phải tóc/ngực đều coi là vải."""
import argparse
import re
import sys

import bmesh
import bpy
from mathutils import Vector

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("dst")
ap.add_argument("--shorts", default=None, help="màu quần bó tối dưới váy (bỏ trống: không thêm)")
ap.add_argument("--thick", type=float, default=0.005)
ap.add_argument("--blend", default=None)
a = ap.parse_args(sys.argv[sys.argv.index("--") + 1 :])

bpy.ops.wm.read_homefile(use_empty=True)
bpy.ops.import_scene.vrm(filepath=a.src)
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
ext = arm.data.vrm_addon_extension
sb = ext.spring_bone1
human = ext.vrm1.humanoid.human_bones
A = arm.matrix_world


def bn(n):
    return getattr(human, n).node.bone_name


def wpos(n, tail=False):
    b = arm.data.bones[bn(n)]
    return A @ (b.tail_local if tail else b.head_local)


def hex_rgb(h):
    h = h.lstrip("#")
    return [((int(h[i : i + 2], 16) / 255) ** 2.2) for i in (0, 2, 4)]


body = bpy.data.objects["Body"]
CLOTH = lambda m: m and "_CLOTH" in m.name and "Shoes" not in m.name  # noqa: E731
SKIN = lambda m: m and "Body_00_SKIN" in m.name  # noqa: E731

# ---- đo bán kính đùi/cẳng chân từ đỉnh da để collider ôm vừa chân
skin_idx = {i for i, m in enumerate(body.data.materials) if SKIN(m)}
skin_v = {v for p in body.data.polygons if p.material_index in skin_idx for v in p.vertices}
pts = [body.matrix_world @ body.data.vertices[i].co for i in skin_v]


def radius(c, z, side):
    ds = [Vector((p.x - c.x, p.y - c.y)).length for p in pts if abs(p.z - z) < 0.015 and (p.x - c.x) * side > -0.05]
    ds = sorted(d for d in ds if d < 0.12)
    return ds[len(ds) // 2] if ds else 0.05


# ---- collider capsule: hông, đùi trên, đùi dưới (qua gối), cẳng chân
caps = []
hipL, hipR = wpos("left_upper_leg"), wpos("right_upper_leg")
hips = wpos("hips")
rh = radius((hipL + hipR) / 2, hipL.z + 0.02, 0) * 0.85
caps.append(("hips", hipL + Vector((0, 0, 0.03)), hipR + Vector((0, 0, 0.03)), max(rh, 0.08)))
for s, sg in (("left", 1), ("right", -1)):
    h, k, an = wpos(f"{s}_upper_leg"), wpos(f"{s}_lower_leg"), wpos(f"{s}_foot")
    r1 = radius(h.lerp(k, 0.3), h.lerp(k, 0.3).z, sg) * 0.9
    r2 = radius(h.lerp(k, 0.75), h.lerp(k, 0.75).z, sg) * 0.9
    r3 = radius(k.lerp(an, 0.3), k.lerp(an, 0.3).z, sg) * 0.9
    caps.append((f"{s}_upper_leg", h, h.lerp(k, 0.55), r1))
    caps.append((f"{s}_upper_leg", h.lerp(k, 0.5), k, r2))
    caps.append((f"{s}_lower_leg", k, k.lerp(an, 0.6), r3))
bpy.ops.vrm.add_spring_bone1_collider_group(armature_object_name=arm.name)
grp = sb.collider_groups[-1]
grp.vrm_name = "LegsCapsule"
gi = len(sb.collider_groups) - 1
for b, p0, p1, r in caps:
    bone = arm.data.bones[bn(b)]
    inv = (A @ bone.matrix_local).inverted()
    bpy.ops.vrm.add_spring_bone1_collider(armature_object_name=arm.name)
    col = sb.colliders[-1]
    col.node.bone_name = bone.name
    col.shape_type = "Capsule"
    col.shape.capsule.radius = r
    col.shape.capsule.offset = inv @ p0
    col.shape.capsule.tail = inv @ p1
    bpy.ops.vrm.add_spring_bone1_collider_group_collider(armature_object_name=arm.name, collider_group_index=gi)
    grp.colliders[-1].collider_uuid = col.uuid
    print("CAP", b, round(r, 3))

# ---- spring vải: nặng, chậm, rủ xuống; tính theo Root nên chạy/xoay người không hất vạt lên
root = next(b.name for b in arm.data.bones if b.parent is None)
for si, s in enumerate(sb.springs):
    tag = s.vrm_name + " " + (s.joints[0].node.bone_name if len(s.joints) else "")
    if re.search(r"Hair|Bust", tag, re.I) or not len(s.joints):
        continue
    s.center.bone_name = root
    n = len(s.joints)
    for i, j in enumerate(s.joints):
        j.stiffness = 1.6 - 0.5 * i / max(1, n - 1)
        j.drag_force = 0.7
        j.gravity_power = 0.6
        j.gravity_dir = (0.0, 0.0, -1.0)
        j.hit_radius = max(j.hit_radius, 0.025)
    bpy.ops.vrm.add_spring_bone1_spring_collider_group(armature_object_name=arm.name, spring_index=si)
    s.collider_groups[-1].collider_group_uuid = grp.uuid
    print("SPRING", s.vrm_name, n)


# ---- vải hai lớp: tách phần áo/váy, solidify vào trong, mặt trong dùng bản tối của vật liệu
def dark_copy(m, k=0.28):
    d = m.copy()
    d.name = m.name.split(" (")[0] + "_Inner"
    mt = d.vrm_addon_extension.mtoon1
    for f, attr in ((mt.pbr_metallic_roughness, "base_color_factor"), (mt.extensions.vrmc_materials_mtoon, "shade_color_factor")):
        c = list(getattr(f, attr))
        setattr(f, attr, [x * k for x in c[:3]] + c[3:])
    mt.extensions.vrmc_materials_mtoon.outline_width_factor = 0.0
    mt.emissive_factor = (0, 0, 0)
    d.use_backface_culling = True
    return d


for ob in [body] + [o for o in bpy.data.objects if o.type == "MESH" and o is not body]:
    idx = [i for i, m in enumerate(ob.data.materials) if CLOTH(m)]
    if not idx or ob.data.shape_keys:
        continue
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    bm = bmesh.from_edit_mesh(ob.data)
    for f in bm.faces:
        f.select = f.material_index in idx
    bmesh.update_edit_mesh(ob.data)
    bpy.ops.mesh.separate(type="SELECTED")
    bpy.ops.object.mode_set(mode="OBJECT")
    cl = next(o for o in bpy.context.selected_objects if o is not ob)
    cl.name = ob.name + "_Cloth"
    # giữ nguyên thứ tự slot (vật liệu có thể gắn ở object), thêm bản tối cho mọi slot: slot i -> i + N
    mats = list(cl.data.materials)
    for m in mats:
        if CLOTH(m):
            m.use_backface_culling = True
    for m in mats:
        cl.data.materials.append(dark_copy(m) if CLOTH(m) else m)
    md = cl.modifiers.new("Thick", "SOLIDIFY")
    md.thickness, md.offset, md.use_rim = a.thick, -1.0, True
    md.material_offset = len(mats)
    md.use_even_offset = True
    bpy.context.view_layer.objects.active = cl
    for o in bpy.context.selected_objects:
        o.select_set(o is cl)
    while cl.modifiers[0].name != "Thick":
        bpy.ops.object.modifier_move_up(modifier="Thick")
    bpy.ops.object.modifier_apply(modifier="Thick")
    print("CLOTH", cl.name, len(cl.data.polygons), [m.name[:24] for m in mats])

# ---- quần bó tối dưới váy: lớp mỏng phủ vùng hông tới giữa đùi
if a.shorts:
    zt = hips.z + 0.06
    zb = min(wpos("left_upper_leg").lerp(wpos("left_lower_leg"), 0.45).z, wpos("right_upper_leg").lerp(wpos("right_lower_leg"), 0.45).z)
    bm = bmesh.new()
    bm.from_mesh(body.data)
    bm.transform(body.matrix_world)
    keep = [f for f in bm.faces if f.material_index in skin_idx and all(zb <= v.co.z <= zt for v in f.verts)]
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f not in set(keep)], context="FACES")
    bm.normal_update()
    for v in bm.verts:
        v.co += v.normal * 0.0035
    me = bpy.data.meshes.new("Shorts")
    bm.to_mesh(me)
    bm.free()
    sh = bpy.data.objects.new("Shorts", me)
    bpy.context.scene.collection.objects.link(sh)
    # sao chép trọng số xương từ thân
    dt = sh.modifiers.new("W", "DATA_TRANSFER")
    dt.object, dt.use_vert_data, dt.data_types_verts = body, True, {"VGROUP_WEIGHTS"}
    dt.vert_mapping = "NEAREST"
    bpy.context.view_layer.objects.active = sh
    bpy.ops.object.datalayout_transfer(modifier="W")
    bpy.ops.object.modifier_apply(modifier="W")
    m = bpy.data.materials.new("Shorts_MToon")
    m.use_nodes = True
    mt = m.vrm_addon_extension.mtoon1
    mt.enabled = True
    mt.pbr_metallic_roughness.base_color_factor = [*hex_rgb(a.shorts), 1]
    mt.extensions.vrmc_materials_mtoon.shade_color_factor = [x * 0.6 for x in hex_rgb(a.shorts)]
    mt.extensions.vrmc_materials_mtoon.shading_toony_factor = 0.85
    me.materials.clear()
    me.materials.append(m)
    for f in me.polygons:
        f.material_index = 0
        f.use_smooth = True
    sh.parent = arm
    sh.modifiers.new("Armature", "ARMATURE").object = arm
    print("SHORTS", len(me.polygons))

if a.blend:
    bpy.ops.wm.save_as_mainfile(filepath=a.blend)
bpy.ops.export_scene.vrm(filepath=a.dst)
print("CLOTH OK", a.dst)
