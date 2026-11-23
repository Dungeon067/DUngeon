"""Dựng lại hoạt ảnh từ file .blend có sẵn (không bake lại texture) rồi xuất GLB.
Chạy: blender -b -P tools/blender/monsters/anim_run.py -- slime goblin ..."""
import importlib
import os
import sys

import bpy

sys.path.insert(0, os.path.dirname(__file__))
import build as B  # noqa: E402

args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
for sid in args:
    bpy.ops.wm.open_mainfile(filepath=os.path.join(B.OUT_SRC, f"{sid}.blend"))
    arm = bpy.data.objects[f"{sid}_rig"]
    if arm.animation_data:
        for tr in list(arm.animation_data.nla_tracks):
            arm.animation_data.nla_tracks.remove(tr)
        arm.animation_data.action = None
    for a in list(bpy.data.actions):
        bpy.data.actions.remove(a)
    for pb in arm.pose.bones:
        pb.location = (0, 0, 0)
        pb.rotation_mode = "QUATERNION"
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.scale = (1, 1, 1)
    mod = importlib.import_module(f"anim_{sid}")
    mod.make(arm)
    objs = [arm, bpy.data.objects[sid], bpy.data.objects[f"{sid}_lod1"]]
    for o in objs:
        o.hide_set(False)
    B.save(sid, objs, [])
