import math

import bmesh
import bpy
from mathutils import Vector


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def lin(h, a=1.0):
    """Mã màu hex (sRGB) sang RGBA tuyến tính cho node Blender."""
    r, g, b = hex_to_rgb(h) if isinstance(h, str) else h
    return (srgb_to_linear(r), srgb_to_linear(g), srgb_to_linear(b), a)


def shade(h, k):
    """Giống shade() trong src/core/util.ts: k<0 tối đi, k>0 sáng lên."""
    r, g, b = hex_to_rgb(h)
    if k < 0:
        f = 1 + k
        r, g, b = r * f, g * f, b * f
    else:
        r, g, b = r + (1 - r) * k, g + (1 - g) * k, b + (1 - b) * k
    return "#%02x%02x%02x" % tuple(max(0, min(255, round(v * 255))) for v in (r, g, b))


def mix_hex(a, b, t):
    ra, rb = hex_to_rgb(a), hex_to_rgb(b)
    return "#%02x%02x%02x" % tuple(round((x + (y - x) * t) * 255) for x, y in zip(ra, rb))


def hue_shift_shadow(h, k, toward="#3b2a5a"):
    """Bóng kiểu anime: tối đi và ngả về tím than thay vì xám."""
    return mix_hex(shade(h, -k), toward, k * 0.45)


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def link(obj, coll=None):
    (coll or bpy.context.scene.collection).objects.link(obj)
    return obj


def mesh_from_bmesh(name, bm):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    return link(obj)


def apply_modifiers(obj):
    """Áp dụng toàn bộ modifier bằng mesh đã đánh giá (không cần bpy.ops)."""
    dg = bpy.context.evaluated_depsgraph_get()
    ev = obj.evaluated_get(dg)
    me = bpy.data.meshes.new_from_object(ev)
    old = obj.data
    obj.modifiers.clear()
    obj.data = me
    bpy.data.meshes.remove(old)
    return obj


def smooth(obj, on=True):
    for p in obj.data.polygons:
        p.use_smooth = on


def seg_dist(p, a, b):
    ab = b - a
    t = max(0.0, min(1.0, (p - a).dot(ab) / max(ab.length_squared, 1e-12)))
    return (p - (a + ab * t)).length, t


def v(*a):
    return Vector(a)


def rad(d):
    return math.radians(d)


def new_bm():
    return bmesh.new()
