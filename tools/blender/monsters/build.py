"""Lắp ráp chung: ghép các mảnh (low/high), trải UV, nướng atlas, gắn xương, xuất GLB và file .blend gốc.
blender -b -P tools/blender/monsters/run.py -- <id> [--size 1024] [--no-bake] [--preview]
"""
import os

import bpy

import mlib as M

ROOT = os.path.abspath(os.path.join(M.HERE, "..", "..", ".."))
OUT_GLB = os.path.join(ROOT, "public", "media", "models", "monsters")
OUT_SRC = os.path.join(ROOT, "art-src", "monsters")
TMP = os.path.join(os.path.expanduser("~"), "s29-build")


class Piece:
    def __init__(self, low, pmat, part="skin", high=None, bone=None, high_extra=None):
        self.low, self.pm, self.part, self.bone = low, pmat, part, bone
        self.high = high if high is not None else M.dup(low, low.name + "_hi")
        self.high_extra = high_extra or []
        M.assign(self.high, pmat)
        for h in self.high_extra:
            M.assign(h, pmat)


def assemble(sid, pieces, size=1024, uv_weights=None, bake=True, extrusion=0.02, ray=0.05, ao=True,
             ao_strength=0.5, ao_tint=(0.38, 0.32, 0.58), bones=None):
    """Ghép low thành một lưới, nướng atlas. bones: danh sách tên xương để ghi thuộc tính 'bone' (mảnh cứng)."""
    lows = []
    for p in pieces:
        M.apply_tf(p.low)
        M.set_part(p.low, p.part)
        if bones is not None:
            M.tag_bone(p.low, bones.index(p.bone) + 1 if p.bone else 0)
        lows.append(p.low)
    for p in pieces:
        for h in [p.high] + p.high_extra:
            M.apply_tf(h)
    low = M.join(lows, sid)
    M.triangulate(low)
    M.unwrap(low)
    if uv_weights:
        M.scale_uv_islands_by_part(low, uv_weights)
    highs = [h for p in pieces for h in [p.high] + p.high_extra]
    tex_dir = os.path.join(TMP, sid)
    maps = {}
    if bake:
        maps = M.bake(low, highs, size, tex_dir, sid, extrusion=extrusion, ray=ray, ao=ao)
        M.finish_albedo(maps, ao_strength=ao_strength, ao_tint=ao_tint)
        maps.pop("ao", None)
    return low, highs, maps


def hide_highs(highs):
    for h in highs:
        h.hide_render = True
        h.hide_set(True)


def lod(low, ratio, name):
    o = M.dup(low, name)
    for m in list(o.modifiers):
        o.modifiers.remove(m)
    M.decimate(o, int(M.tris(o) * ratio))
    arm = low.parent
    if arm is not None:
        mw = o.matrix_world.copy()
        o.parent = arm
        o.matrix_world = mw
        m = o.modifiers.new("arm", "ARMATURE")
        m.object = arm
    return o


def save(sid, objs, highs):
    os.makedirs(OUT_SRC, exist_ok=True)
    glb = os.path.join(OUT_GLB, f"{sid}.glb")
    M.export_glb(glb, objs)
    bpy.ops.file.pack_all()
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT_SRC, f"{sid}.blend"), compress=True)
    print(f"[s29] {sid}: {glb} ({os.path.getsize(glb) / 1024:.0f} KB)")
    return glb
