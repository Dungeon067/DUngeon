"""Tóc dạng khối mảng: mũ tóc ôm sọ và các lọn bằng đường cong vát nhọn.

Mỗi kiểu tóc (`style` trong content/characters/*.yaml) là một danh sách lọn.
Lọn dài được gắn vào xương phụ `hair.*` để lay khi chạy.
"""

import math
import random

import bmesh
import bpy
from mathutils import Vector

from .toon import toon_material
from .util import link, smooth


def _dir(theta, phi):
    """theta: góc quanh đầu (0 = trước mặt, 90 = bên trái nhân vật), phi: độ cao."""
    t, p = math.radians(theta), math.radians(phi)
    return Vector((math.sin(t) * math.cos(p), -math.cos(t) * math.cos(p), math.sin(p)))


def strand_specs(style, seed=7):
    rnd = random.Random(seed)
    S = []

    def add(theta, phi, length, grav, out=0.0, back=0.0, up=0.0, thick=0.16, curl=0.0, group=None):
        S.append(dict(theta=theta, phi=phi, length=length, grav=grav, out=out, back=back, up=up,
                      thick=thick, curl=curl, group=group))

    # Mái trước chung cho mọi kiểu.
    bang_n = 7 if style != "bob" else 9
    for i in range(bang_n):
        th = -62 + 124 * i / (bang_n - 1) + rnd.uniform(-4, 4)
        add(th, 48 + rnd.uniform(-4, 4), 0.62 + 0.12 * (1 - abs(th) / 62) + rnd.uniform(-0.06, 0.06),
            grav=1.25, out=0.18, thick=0.2, curl=0.15 * (1 if th > 0 else -1))
    # Tóc mai hai bên.
    for s in (1, -1):
        add(s * 78, 28, 0.85, grav=1.4, out=0.12, thick=0.17)
        add(s * 100, 30, 0.8, grav=1.3, out=0.15, back=0.1, thick=0.18)
    if style == "spiky":
        for i in range(13):
            th = 70 + 220 * i / 12 + rnd.uniform(-6, 6)
            ph = rnd.uniform(25, 62)
            add(th, ph, rnd.uniform(0.7, 1.0), grav=-0.15, out=0.9, back=0.5, up=0.35, thick=0.22)
        for i in range(5):
            add(rnd.uniform(-40, 40), rnd.uniform(66, 80), rnd.uniform(0.55, 0.75), grav=-0.2, out=0.6,
                back=0.6, up=0.6, thick=0.22)
    elif style == "short":
        for i in range(14):
            th = 70 + 220 * i / 13 + rnd.uniform(-5, 5)
            add(th, rnd.uniform(5, 50), rnd.uniform(0.5, 0.7), grav=0.9, out=0.3, back=0.2, thick=0.2)
    elif style in ("long", "pony", "bob", "buns"):
        n = 16
        L = {"long": 2.6, "pony": 0.9, "bob": 1.05, "buns": 0.8}[style]
        for i in range(n):
            th = 72 + 216 * i / (n - 1) + rnd.uniform(-4, 4)
            add(th, rnd.uniform(5, 35), L * rnd.uniform(0.92, 1.05), grav=1.5, out=0.25, back=0.12,
                thick=0.22, group="hair.B" if style == "long" else None)
    return S


def build_hair(body, look, style_cfg, R, zc, style):
    color = look["hair"]
    mat, _ = toon_material("toc", color, style_cfg)
    objs = []
    # Mũ tóc.
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=36, v_segments=24, radius=1.0)
    kill = []
    for f in bm.faces:
        c = f.calc_center_median()
        front = c.y < -0.25
        if (front and c.z < 0.42) or c.z < -0.55 or (abs(c.x) > 0.7 and c.z < 0.05 and c.y < 0.3):
            kill.append(f)
    bmesh.ops.delete(bm, geom=kill, context="FACES")
    for vt in bm.verts:
        x, y, z = vt.co
        vt.co = Vector((x * 0.97, y * (0.95 if y < 0 else 1.1), z * 1.02)) * R * 1.08
    me = bpy.data.meshes.new("toc_mu")
    bm.to_mesh(me)
    bm.free()
    cap = link(bpy.data.objects.new("toc_mu", me))
    cap.location = (0, 0, zc + R * 0.04)
    me.materials.append(mat)
    sol = cap.modifiers.new("day", "SOLIDIFY")
    sol.thickness = R * 0.05
    smooth(cap)
    objs.append(cap)

    for i, s in enumerate(strand_specs(look.get("style", "short"))):
        objs.append(_strand(i, s, R, zc, mat))
    return objs


def _strand(i, s, R, zc, mat):
    c = Vector((0, 0, zc + R * 0.04))
    n = _dir(s["theta"], s["phi"])
    root = c + n * R * 1.02
    d = (n * s["out"] + Vector((0, 0, -1)) * s["grav"] + Vector((0, 1, 0)) * s["back"]
         + Vector((0, 0, 1)) * s["up"])
    if d.length < 1e-4:
        d = n
    d.normalize()
    pts = [root]
    steps = 5
    seg = s["length"] * R / steps
    tang = Vector((n.y, -n.x, 0)).normalized() if abs(n.z) < 0.99 else Vector((1, 0, 0))
    for k in range(steps):
        p = pts[-1] + d * seg
        # Lọn rủ xuống thì giữ khoảng cách với đầu.
        rel = p - c
        if rel.length < R * 1.06:
            p = c + rel.normalized() * R * 1.06
        pts.append(p)
        d = (d + Vector((0, 0, -0.35)) * max(0.0, s["grav"]) + tang * s["curl"]).normalized()
    cu = bpy.data.curves.new("lon", "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = s["thick"] * R * 0.55
    cu.bevel_resolution = 2
    cu.resolution_u = 6
    cu.use_fill_caps = True
    sp = cu.splines.new("BEZIER")
    sp.bezier_points.add(len(pts) - 1)
    for k, (bp, p) in enumerate(zip(sp.bezier_points, pts)):
        bp.co = p
        bp.handle_left_type = bp.handle_right_type = "AUTO"
        t = k / (len(pts) - 1)
        bp.radius = max(0.0, (1 - t) ** 0.9) * (0.75 + 0.25 * math.sin(math.pi * min(1, t * 2)))
    tmp = link(bpy.data.objects.new("lon_tmp", cu))
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(dg))
    bpy.data.objects.remove(tmp)
    bpy.data.curves.remove(cu)
    # Dẹt lọn theo hướng vuông góc mặt đầu cho ra dạng mảng.
    for vt in me.vertices:
        rel = vt.co - c
        rn = rel.normalized()
        rad_part = rel.dot(rn)
        vt.co = c + rel - rn * (rad_part - R * 1.04) * 0.45 if rad_part > R * 1.04 else vt.co
    me.name = "toc_lon_%02d" % i
    obj = link(bpy.data.objects.new(me.name, me))
    me.materials.append(mat)
    smooth(obj)
    obj["tt_group"] = s["group"] or ""
    obj["tt_outline_k"] = 0.7
    return obj
