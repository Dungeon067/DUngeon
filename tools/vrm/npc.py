"""Tạo NPC từ một VRM có sẵn: đổi màu tóc/áo/mắt (xoay sắc độ HSV) và tên trong meta.
blender -b --python tools/vrm/npc.py -- <vào.vrm> <ra.vrm> <tên> <tóc h,s,v> <áo h,s,v> <mắt h,s,v>
h = độ xoay sắc độ (độ), s/v = hệ số nhân độ bão hòa/độ sáng. Da giữ nguyên."""
import sys

import bpy
import numpy as np

src, dst, name, *cs = sys.argv[sys.argv.index("--") + 1 :]
P = {k: tuple(float(x) for x in v.split(",")) for k, v in zip(("hair", "cloth", "eye"), cs)}
bpy.ops.wm.read_homefile(use_empty=True)
bpy.ops.import_scene.vrm(filepath=src)
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")


def rgb2hsv(c):
    r, g, b = c[..., 0], c[..., 1], c[..., 2]
    mx, mn = c.max(-1), c.min(-1)
    d = mx - mn
    h = np.zeros_like(mx)
    m = d > 1e-6
    rm, gm = m & (mx == r), m & (mx == g) & (mx != r)
    bm = m & ~rm & ~gm
    h[rm] = ((g - b)[rm] / d[rm]) % 6
    h[gm] = (b - r)[gm] / d[gm] + 2
    h[bm] = (r - g)[bm] / d[bm] + 4
    return np.stack([h / 6, np.where(mx > 0, d / np.maximum(mx, 1e-6), 0), mx], -1)


def hsv2rgb(c):
    h, s, v = c[..., 0] * 6, c[..., 1], c[..., 2]
    i = np.floor(h).astype(int) % 6
    f = h - np.floor(h)
    p, q, t = v * (1 - s), v * (1 - s * f), v * (1 - s * (1 - f))
    tab = [(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)]
    out = np.zeros(c.shape)
    for k, (a, b, cc) in enumerate(tab):
        m = i == k
        out[..., 0][m], out[..., 1][m], out[..., 2][m] = a[m], b[m], cc[m]
    return out


def shift(rgb, prm, keep=None):
    hh, ss, vv = prm
    hsv = rgb2hsv(rgb)
    new = hsv.copy()
    new[..., 0] = (hsv[..., 0] + hh / 360) % 1
    new[..., 1] = np.clip(hsv[..., 1] * ss, 0, 1)
    new[..., 2] = np.clip(hsv[..., 2] * vv, 0, 1)
    out = hsv2rgb(new)
    if keep is not None:
        out[keep] = rgb[keep]
    return out


def skin_mask(rgb):
    hsv = rgb2hsv(rgb)
    return (hsv[..., 0] < 50 / 360) & (hsv[..., 1] > 0.04) & (hsv[..., 1] < 0.6) & (hsv[..., 2] > 0.5)


def kind(n):
    if "_HAIR" in n or n.startswith("HairPin"):
        return "hair"
    if "EyeIris" in n:
        return "eye"
    if "_CLOTH" in n or n.startswith("Acc_") or "Body_00_SKIN" in n:
        return "cloth"
    return None


done = set()
for m in bpy.data.materials:
    k = kind(m.name)
    if not k:
        continue
    mt = m.vrm_addon_extension.mtoon1
    for f, attr in ((mt.pbr_metallic_roughness, "base_color_factor"),
                    (mt.extensions.vrmc_materials_mtoon, "shade_color_factor")):
        c = np.array(getattr(f, attr)[:3], dtype=float) ** (1 / 2.2)
        if not (k == "cloth" and "SKIN" in m.name):
            setattr(f, attr, [*(shift(c[None], P[k])[0] ** 2.2), *getattr(f, attr)[3:]])
    for n in m.node_tree.nodes if m.node_tree else []:
        img = getattr(n, "image", None)
        if n.type != "TEX_IMAGE" or not img or img.name in done or min(img.size) < 64 or "nml" in img.name:
            continue
        done.add(img.name)
        W, H = img.size
        px = np.empty(W * H * 4, dtype=np.float32)
        img.pixels.foreach_get(px)
        px = px.reshape(-1, 4)
        rgb = px[:, :3].astype(float)
        px[:, :3] = shift(rgb, P[k], skin_mask(rgb) if "SKIN" in m.name else None)
        img.pixels.foreach_set(px.ravel())
        img.update()
        img.pack()
        print("TEX", m.name[:40], img.name, k)

arm.data.vrm_addon_extension.vrm1.meta.vrm_name = name
bpy.ops.export_scene.vrm(filepath=dst)
print("NPC OK", name, dst)
