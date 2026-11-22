"""Dựng một nhân vật từ spec JSON (do tools/art tạo từ YAML) và trả về các object.

Chạy độc lập: blender -b --factory-startup -P build.py -- spec.json out.blend
"""

import json
import os
import sys

import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from ttart import pose as P  # noqa: E402
from ttart.body import DEFORM, Body, auto_weights, parent_to_bone  # noqa: E402
from ttart.hair import build_hair  # noqa: E402
from ttart.head import build_head  # noqa: E402
from ttart.outfit import build_outfit  # noqa: E402
from ttart.toon import STYLE, add_hull_outline, emission_material, toon_material  # noqa: E402
from ttart.util import clear_scene, link, shade  # noqa: E402
from ttart.weapons import build_weapon  # noqa: E402


def attach_to_bone(obj, rig, bone):
    """Gắn object vào xương: trục Y cục bộ của object trùng hướng xương, gốc ở đầu xương."""
    pb = rig.pose.bones[bone]
    obj.parent = rig
    obj.parent_type = "BONE"
    obj.parent_bone = bone
    bpy.context.view_layer.update()
    obj.matrix_world = rig.matrix_world @ pb.matrix
    return obj


def tinh_van(body, rig, el_color, style):
    """Tinh Văn: ngôi sao bốn cánh phát sáng trên mu bàn tay trái."""
    import bmesh
    import math

    L = body.L
    bm = bmesh.new()
    r1, r2, n = 0.03 * L, 0.009 * L, 4
    center = bm.verts.new((0, 0, 0))
    ring = []
    for k in range(n * 2):
        a = math.pi * k / n
        r = r1 if k % 2 == 0 else r2
        ring.append(bm.verts.new((math.cos(a) * r, 0, math.sin(a) * r)))
    for k in range(n * 2):
        bm.faces.new((center, ring[k], ring[(k + 1) % (n * 2)]))
    me = bpy.data.meshes.new("tinh_van")
    bm.to_mesh(me)
    bm.free()
    ob = link(bpy.data.objects.new("tinh_van", me))
    me.materials.append(emission_material("tinh_van", shade(el_color, 0.35), 3.0))
    ob["tt_no_outline"] = True
    J = body.joints()
    wr, fi = J["wrist.L"], J["fingers.L"]
    p = wr + (fi - wr) * 0.35
    d = (fi - wr).normalized()
    # Mu bàn tay hướng ra ngoài (+X) và hơi lên.
    nrm = Vector((d.z, 0, -d.x)) * -1
    ob.location = p + nrm * 0.016 * L
    ob.rotation_euler = nrm.to_track_quat("-Y", "Z").to_euler()
    bpy.context.view_layer.update()
    mw = ob.matrix_world.copy()
    ob.parent = rig
    ob.parent_type = "BONE"
    ob.parent_bone = "hand.L"
    ob.matrix_world = mw
    return ob


def build_character(spec):
    clear_scene()
    look = spec["look"]
    dung = spec.get("dung", {})
    style = dict(STYLE, **spec.get("style", {}))
    style["rim_mau"] = spec.get("el_color", style["rim_mau"])
    th = dung.get("than", {})
    body = Body(th.get("gioi_tinh", "nam"), th.get("dang", "vua"), spec.get("heads", th.get("ti_le", 5.5)))
    body_obj = body.build_mesh()
    body_obj.data.materials.append(toon_material("da", look["skin"], style)[0])
    rig = body.build_armature()
    auto_weights(body_obj, rig, names=set(DEFORM))

    head, ears, (R, zc) = build_head(body, look, style, spec["face_tex"])
    for ob in [head] + ears:
        parent_to_bone(ob, rig, "head")
    hair = build_hair(body, look, style, R, zc, look.get("style", "short"))
    for ob in hair:
        parent_to_bone(ob, rig, "head")
    outfit = build_outfit(body, body_obj, rig, look, style, dung)
    weapon = build_weapon(spec.get("weapon", "sword"), body.L, look, spec.get("el_color", "#ff6a3d"), style)
    for ob in weapon:
        attach_to_bone(ob, rig, "grip.R")
    tv = tinh_van(body, rig, spec.get("el_color", "#ff6a3d"), style)

    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    if style["vien"] == "vo":
        k = body.L / 1.4
        for o in meshes:
            add_hull_outline(o, style["vien_day"] * k)
    P.apply(rig, P.POSES.get(spec.get("pose", "dung"), []))
    return dict(body=body, rig=rig, head=head, hair=hair, outfit=outfit, weapon=weapon, tinh_van=tv,
                meshes=meshes, R=R, zc=zc, style=style)


if __name__ == "__main__" and "--" in sys.argv:
    args = sys.argv[sys.argv.index("--") + 1:]
    with open(args[0], encoding="utf-8") as f:
        sp = json.load(f)
    build_character(sp)
    if len(args) > 1:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(args[1]))
