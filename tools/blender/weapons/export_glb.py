"""Xuất mô hình vũ khí S24 sang GLB nhẹ cho renderer 3D (vật liệu màu phẳng, game tự đổi sang toon).
blender -b -P tools/blender/weapons/export_glb.py -- --list danh-sach.json --out public/media/models/weapons [--ids a,b] [--tris 3000]
Vật liệu thủ tục (node) của bản render không xuất được sang glTF, nên mỗi vật liệu được thay bằng Principled
một màu lấy từ thiết kế (designs.py); phần phát sáng giữ màu glow làm emissive.
"""
import argparse
import json
import os
import sys

import bpy

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib  # noqa: E402

COLORS = {}


def _wrap(fn, idx=1, emit=False):
    def inner(*a, **k):
        m = fn(*a, **k)
        mat = m[0] if isinstance(m, tuple) else m
        try:
            COLORS[mat.name] = (a[idx] if len(a) > idx else k.get("color"), emit)
        except Exception:
            pass
        return m
    return inner


for name, emit in [("mat_metal", False), ("mat_aged", False), ("mat_emit", True), ("mat_gem", True), ("mat_cloth", False),
                   ("mat_wood", False)]:
    setattr(lib, name, _wrap(getattr(lib, name), 1, emit))

from designs import design_for  # noqa: E402
from models import BUILDERS  # noqa: E402
from ornate import BUILDERS_ORNATE  # noqa: E402

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--list", required=True)
ap.add_argument("--out", required=True)
ap.add_argument("--ids", default="")
ap.add_argument("--tris", type=int, default=3000)
a = ap.parse_args(argv)


def guess(mat_name, d):
    n = mat_name.lower()
    for key, field, emit in [("glow", "glow", True), ("emit", "glow", True), ("gold", "gold", False), ("blade", "steel", False),
                             ("edge", "edge", False), ("limb", "limb", False), ("string", "edge", False), ("wood", "limb", False)]:
        if key in n and d.get(field):
            return lib.hexc(d[field]), emit
    return lib.hexc(d.get("steel", "#8c9098")), False


weapons = json.load(open(a.list, encoding="utf8"))
ids = [x for x in a.ids.split(",") if x]
os.makedirs(a.out, exist_ok=True)
for w in weapons:
    if ids and w["id"] not in ids:
        continue
    d = design_for(w)
    # glb_ornate: xuất GLB bằng bộ dựng chi tiết (builder) thay cho bộ dựng đơn giản theo loại.
    build = BUILDERS_ORNATE.get(d["builder"]) if d.get("glb_ornate") else BUILDERS.get(d["type"])
    if not build:
        continue
    COLORS.clear()
    lib.reset_scene()
    build(d)
    # Đường cong, chữ... thành lưới; áp modifier.
    bpy.ops.object.select_all(action="DESELECT")
    for o in bpy.context.scene.objects:
        if o.type in ("CURVE", "FONT", "SURFACE", "META"):
            o.select_set(True)
            bpy.context.view_layer.objects.active = o
    if bpy.context.selected_objects:
        bpy.ops.object.convert(target="MESH")
    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    dg = bpy.context.evaluated_depsgraph_get()
    tris = sum(sum(len(p.vertices) - 2 for p in o.evaluated_get(dg).data.polygons) for o in meshes)
    ratio = min(1.0, a.tris / max(1, tris))
    for o in meshes:
        if ratio < 1.0:
            mod = o.modifiers.new("dec", "DECIMATE")
            mod.ratio = ratio
    for mat in bpy.data.materials:
        col, emit = COLORS.get(mat.name, (None, False))
        if isinstance(col, str):
            col = lib.hexc(col)
        if col is None:
            col, emit = guess(mat.name, d)
        nt = mat.node_tree
        nt.nodes.clear()
        bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
        out = nt.nodes.new("ShaderNodeOutputMaterial")
        nt.links.new(bsdf.outputs[0], out.inputs[0])
        bsdf.inputs["Base Color"].default_value = tuple(col[:3]) + (1,)
        bsdf.inputs["Roughness"].default_value = 0.6
        if emit:
            bsdf.inputs["Emission Color"].default_value = tuple(col[:3]) + (1,)
            bsdf.inputs["Emission Strength"].default_value = 1.0
        mat.name = ("glow_" if emit else "") + mat.name
    path = os.path.join(a.out, f"{w['id']}.glb")
    bpy.ops.export_scene.gltf(filepath=path, export_format="GLB", export_apply=True, export_yup=True,
                              export_cameras=False, export_lights=False, export_normals=True, export_texcoords=False)
    print(f"[xong] {w['id']} {d['type']} tris~{int(tris * ratio)}")
