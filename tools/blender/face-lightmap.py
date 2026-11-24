"""Sinh lightmap bóng mặt SDF cho một nhân vật (hợp nhất B1). Chạy: blender -b nv.blend -P face-lightmap.py -- <thư mục ra>

Cách làm (kỹ thuật SDF lightmap phổ biến, tự viết, không dùng texture của game khác):
1. Đặt đèn mặt trời quét từ chính diện (0°) sang ngang (90°) quanh đầu, mỗi bước render mặt nạ sáng/tối của
   vật liệu mặt ra UV (bake "Shadow" của Cycles) thành ảnh đen trắng.
2. Đổi mỗi mặt nạ thành trường khoảng cách có dấu (SDF).
3. Với mỗi điểm ảnh, tìm hai mặt nạ liền nhau mà dấu SDF đổi, nội suy vị trí đổi dấu -> giá trị ngưỡng 0..1.
Kết quả: ảnh xám, shader so ngưỡng 1 - (dot(F, L) * 0.5 + 0.5) với giá trị này (char-shader.ts faceShadow).
"""
import math
import os
import sys

import numpy as np

STEPS = 16
RES = 1024


def sdf(mask):
    """SDF hai lượt (chamfer 3-4) trên mặt nạ bool; dương trong vùng sáng."""
    big = 1e9
    def dist(inside):
        d = np.where(inside, 0.0, big)
        h, w = d.shape
        for y in range(h):
            for x in range(w):
                if d[y, x] == 0:
                    continue
                m = d[y, x]
                if x > 0: m = min(m, d[y, x - 1] + 3)
                if y > 0: m = min(m, d[y - 1, x] + 3)
                if x > 0 and y > 0: m = min(m, d[y - 1, x - 1] + 4)
                if x < w - 1 and y > 0: m = min(m, d[y - 1, x + 1] + 4)
                d[y, x] = m
        for y in range(h - 1, -1, -1):
            for x in range(w - 1, -1, -1):
                m = d[y, x]
                if x < w - 1: m = min(m, d[y, x + 1] + 3)
                if y < h - 1: m = min(m, d[y + 1, x] + 3)
                if x < w - 1 and y < h - 1: m = min(m, d[y + 1, x + 1] + 4)
                if x > 0 and y < h - 1: m = min(m, d[y + 1, x - 1] + 4)
                d[y, x] = m
        return d / 3.0
    return dist(~mask) - dist(mask)


def combine(masks):
    """masks[i]: vùng sáng khi đèn ở góc i/(n-1)*90°. Trả về ảnh ngưỡng 0..1."""
    n = len(masks)
    fields = [sdf(m) for m in masks]
    out = np.zeros(masks[0].shape, dtype=np.float32)
    for i in range(n - 1):
        a, b = fields[i], fields[i + 1]
        cross = (a > 0) & (b <= 0)
        t = np.where(cross, a / np.maximum(a - b, 1e-6), 0)
        out = np.where(cross, (i + t) / (n - 1), out)
    out = np.where(fields[-1] > 0, 1.0, out)
    return out


def bake_masks(out_dir):
    import bpy  # noqa: chỉ có trong Blender
    scn = bpy.context.scene
    scn.render.engine = "CYCLES"
    sun = bpy.data.objects.get("FaceSun") or bpy.data.objects.new("FaceSun", bpy.data.lights.new("FaceSun", "SUN"))
    if sun.name not in scn.collection.objects:
        scn.collection.objects.link(sun)
    face = next(o for o in scn.objects if o.type == "MESH" and "face" in o.name.lower())
    img = bpy.data.images.new("face_mask", RES, RES)
    masks = []
    for i in range(STEPS):
        ang = math.radians(90 * i / (STEPS - 1))
        sun.rotation_euler = (math.radians(90), 0, ang)
        for mat in face.data.materials:
            nodes = mat.node_tree.nodes
            tex = nodes.get("FaceMask") or nodes.new("ShaderNodeTexImage")
            tex.name = "FaceMask"
            tex.image = img
            nodes.active = tex
        bpy.context.view_layer.objects.active = face
        bpy.ops.object.bake(type="SHADOW")
        px = np.array(img.pixels[:], dtype=np.float32).reshape(RES, RES, 4)[..., 0]
        masks.append(px > 0.5)
    lm = combine(masks)
    out = bpy.data.images.new("face_lightmap", RES, RES)
    rgba = np.stack([lm, lm, lm, np.ones_like(lm)], -1).ravel()
    out.pixels[:] = rgba.tolist()
    out.filepath_raw = os.path.join(out_dir, "face_lightmap.png")
    out.file_format = "PNG"
    out.save()


if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else ["."]
    bake_masks(argv[0])
