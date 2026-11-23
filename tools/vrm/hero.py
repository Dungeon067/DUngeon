"""Chỉnh tỉ lệ anime cho VRM (giữ xương humanoid): kéo chân, thu eo.
blender -b --python tools/vrm/hero.py -- <vào.vrm> <ra.vrm> [--leg 0.56] [--waist 0.9] [--blend out.blend]
--leg: tỉ lệ (khớp háng tới sàn) / (đỉnh đầu tới sàn) mong muốn. Chỉ kéo đoạn từ mắt cá tới háng, bàn chân giữ nguyên.
--waist: hệ số thu eo (nhân bề ngang/dày quanh xương spine, giảm dần ra ngoài), tóc không bị thu."""
import argparse
import math
import sys

import bpy
from mathutils import Vector

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("dst")
ap.add_argument("--leg", type=float, default=0)
ap.add_argument("--waist", type=float, default=1)
ap.add_argument("--blend", default="")
a = ap.parse_args(sys.argv[sys.argv.index("--") + 1 :])

bpy.ops.wm.read_homefile(use_empty=True)
bpy.ops.import_scene.vrm(filepath=a.src)
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
human = arm.data.vrm_addon_extension.vrm1.humanoid.human_bones


def bone(n):
    return getattr(human, n).node.bone_name


A = arm.matrix_world
meshes = [o for o in bpy.data.objects if o.type == "MESH"]
pb = arm.data.bones
hip = (A @ pb[bone("left_upper_leg")].head_local).z
ank = (A @ pb[bone("left_foot")].head_local).z
waist = (A @ pb[bone("spine")].head_local)
crown = max((o.matrix_world @ v.co).z for o in meshes if not o.name.startswith("Hair") for v in o.data.vertices)
foot = min((o.matrix_world @ v.co).z for o in meshes for v in o.data.vertices)
leg0 = (hip - foot) / (crown - foot)
k = 1.0
if a.leg:
    # (hip' - foot) / (crown' - foot) = leg, hip' = hip + d, crown' = crown + d
    d = (a.leg * (crown - foot) - (hip - foot)) / (1 - a.leg)
    k = 1 + d / (hip - ank)
d = (hip - ank) * (k - 1)


def zmap(z):
    if z <= ank:
        return z
    if z >= hip:
        return z + d
    return ank + (z - ank) * k


def wmap(p):
    if a.waist == 1:
        return p
    t = abs(p.z - waist.z) / 0.11
    if t >= 1:
        return p
    f = 1 - (1 - a.waist) * 0.5 * (1 + math.cos(math.pi * t))
    return Vector((waist.x + (p.x - waist.x) * f, waist.y + (p.y - waist.y) * f, p.z))


def move(p, hair=False):
    q = p if hair else wmap(p)
    return Vector((q.x, q.y, zmap(q.z)))


for o in meshes:
    hair = o.name.startswith("Hair")
    mw, inv = o.matrix_world, o.matrix_world.inverted()
    keys = o.data.shape_keys.key_blocks if o.data.shape_keys else []
    base = [v.co.copy() for v in (keys[0].data if keys else o.data.vertices)]
    new = [inv @ move(mw @ c, hair) for c in base]
    for kb in keys:
        for i, pt in enumerate(kb.data):
            pt.co = new[i] + (pt.co - base[i])
    for v, c in zip(o.data.vertices, new):
        v.co = c
    o.data.update()

bpy.context.view_layer.objects.active = arm
bpy.ops.object.mode_set(mode="EDIT")
Ai = A.inverted()
# Tính hết vị trí mới trước rồi mới gán: xương nối liền (connected) kéo theo đuôi xương cha.
pos = {eb.name: (Ai @ move(A @ eb.head, True), Ai @ move(A @ eb.tail, True)) for eb in arm.data.edit_bones}
for eb in arm.data.edit_bones:
    eb.head, eb.tail = pos[eb.name]
bpy.ops.object.mode_set(mode="OBJECT")
crown2 = crown + d
print("HERO leg %.3f -> %.3f  k=%.3f  H %.3f -> %.3f" % (leg0, (hip + d - foot) / (crown2 - foot), k, crown - foot, crown2 - foot))
if a.blend:
    bpy.ops.wm.save_as_mainfile(filepath=a.blend)
bpy.ops.export_scene.vrm(filepath=a.dst)
print("HERO OK", a.dst)
