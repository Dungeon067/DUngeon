"""Năm loại vũ khí, gắn vào xương `grip.R` (pháp khí lơ lửng cạnh tay trái).

Kích thước tính theo chiều dài thân L để bản đầu to vẫn cân đối.
Trục dọc vũ khí là +Y cục bộ của xương cầm (hướng ngón tay cái).
"""

import math

import bmesh
import bpy
from mathutils import Matrix, Vector

from .toon import emission_material, toon_material
from .util import link, shade, smooth


def _box(bm, cx, cy, cz, sx, sy, sz, taper=1.0):
    r = bmesh.ops.create_cube(bm, size=1.0)
    for vt in r["verts"]:
        k = taper if vt.co.y > 0 else 1.0
        vt.co = Vector((vt.co.x * sx * k + cx, vt.co.y * sy + cy, vt.co.z * sz * k + cz))
    return r["verts"]


def _cyl(bm, cy, length, r0, r1=None, seg=10, axis="Y"):
    r = bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r0, radius2=r1 if r1 is not None else r0,
                              depth=length)
    rot = Matrix.Rotation(-math.pi / 2, 4, "X")
    bmesh.ops.transform(bm, matrix=rot, verts=r["verts"])
    bmesh.ops.translate(bm, vec=(0, cy, 0), verts=r["verts"])
    return r["verts"]


def _obj(name, bm, mat):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = link(bpy.data.objects.new(name, me))
    for m in mat if isinstance(mat, list) else [mat]:
        me.materials.append(m)
    return ob


def _blade(bm, y0, length, width, thick, tip=0.18):
    """Lưỡi có sống giữa: mặt cắt hình thoi, đầu vát nhọn."""
    n = 6
    rows = []
    for k in range(n + 1):
        t = k / n
        y = y0 + length * t
        wk = width * (1 - max(0, (t - (1 - tip)) / tip) ** 1.2)
        row = [bm.verts.new((wk / 2, y, 0)), bm.verts.new((0, y, thick / 2)), bm.verts.new((-wk / 2, y, 0)),
               bm.verts.new((0, y, -thick / 2))]
        rows.append(row)
    for a, b in zip(rows, rows[1:]):
        for i in range(4):
            bm.faces.new((a[i], a[(i + 1) % 4], b[(i + 1) % 4], b[i]))
    bm.faces.new(list(reversed(rows[0])))
    bmesh.ops.remove_doubles(bm, verts=rows[-1], dist=1e-5)


def build_weapon(kind, L, look, el_color, style):
    steel = toon_material("thep", "#d9dee8", style, shadow="#8f98ad", shadow2="#5b6278")[0]
    gold = toon_material("dong", look["accent"], style)[0]
    wood = toon_material("go", "#5a3a26", style)[0]
    glow = emission_material("vu_khi_sang", el_color, 1.6)
    bm = bmesh.new()
    parts = []
    if kind == "sword":
        _cyl(bm, -0.03 * L, 0.1 * L, 0.012 * L, seg=8)
        a = _obj("kiem_chuoi", bm, wood)
        bm = bmesh.new()
        _box(bm, 0, 0.025 * L, 0, 0.075 * L, 0.014 * L, 0.02 * L)
        _box(bm, 0, -0.085 * L, 0, 0.022 * L, 0.02 * L, 0.022 * L)
        b = _obj("kiem_chan", bm, gold)
        bm = bmesh.new()
        _blade(bm, 0.03 * L, 0.48 * L, 0.04 * L, 0.012 * L)
        c = _obj("kiem_luoi", bm, steel)
        parts = [a, b, c]
    elif kind == "great":
        _cyl(bm, -0.06 * L, 0.18 * L, 0.014 * L, seg=8)
        a = _obj("daikiem_chuoi", bm, wood)
        bm = bmesh.new()
        _box(bm, 0, 0.04 * L, 0, 0.12 * L, 0.025 * L, 0.03 * L)
        b = _obj("daikiem_chan", bm, gold)
        bm = bmesh.new()
        _blade(bm, 0.05 * L, 0.62 * L, 0.11 * L, 0.02 * L, tip=0.12)
        c = _obj("daikiem_luoi", bm, steel)
        parts = [a, b, c]
    elif kind == "spear":
        _cyl(bm, 0.15 * L, 0.95 * L, 0.011 * L, seg=8)
        a = _obj("thuong_can", bm, wood)
        bm = bmesh.new()
        _cyl(bm, 0.64 * L, 0.04 * L, 0.02 * L, 0.014 * L, seg=8)
        b = _obj("thuong_dai", bm, gold)
        bm = bmesh.new()
        _blade(bm, 0.66 * L, 0.16 * L, 0.05 * L, 0.012 * L, tip=0.5)
        c = _obj("thuong_mui", bm, steel)
        parts = [a, b, c]
    elif kind == "bow":
        # Cung cong vẽ bằng đường cong có bề dày, dây cung phát sáng nhẹ.
        cu = bpy.data.curves.new("cung", "CURVE")
        cu.dimensions = "3D"
        cu.bevel_depth = 0.012 * L
        sp = cu.splines.new("BEZIER")
        sp.bezier_points.add(2)
        pts = [(0.0, 0.0, -0.38 * L), (0.0, -0.1 * L, 0.0), (0.0, 0.0, 0.38 * L)]
        for bp, p in zip(sp.bezier_points, pts):
            bp.co = p
            bp.handle_left_type = bp.handle_right_type = "AUTO"
        sp.bezier_points[0].radius = sp.bezier_points[2].radius = 0.5
        tmp = link(bpy.data.objects.new("tmp", cu))
        me = bpy.data.meshes.new_from_object(tmp.evaluated_get(bpy.context.evaluated_depsgraph_get()))
        bpy.data.objects.remove(tmp)
        a = link(bpy.data.objects.new("cung_than", me))
        me.materials.append(wood)
        bm = bmesh.new()
        _cyl(bm, 0, 0.012 * L, 0.004 * L, seg=6)
        r = bm.verts[:]
        bmesh.ops.transform(bm, matrix=Matrix.Rotation(math.pi / 2, 4, "X"), verts=r)
        bmesh.ops.scale(bm, vec=(1, 1, 0.76 * L / (0.012 * L)), verts=r)
        bmesh.ops.translate(bm, vec=(0, 0.02 * L, 0), verts=r)
        b = _obj("cung_day", bm, glow)
        b["tt_no_outline"] = True
        parts = [a, b]
    elif kind == "cat":
        # Pháp khí: chuông đồng nhỏ có vòng sáng, lơ lửng cạnh tay.
        bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=0.05 * L)
        for vt in bm.verts:
            if vt.co.z < 0:
                vt.co.x *= 1.25
                vt.co.y *= 1.25
        a = _obj("phapkhi_chuong", bm, gold)
        bm = bmesh.new()
        bmesh.ops.create_circle(bm, segments=24, radius=0.075 * L)
        r = bmesh.ops.extrude_edge_only(bm, edges=bm.edges[:])
        bmesh.ops.scale(bm, vec=(1.1, 1.1, 1), verts=[e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)])
        b = _obj("phapkhi_vong", bm, glow)
        b["tt_no_outline"] = True
        parts = [a, b]
    for p in parts:
        smooth(p)
        p["tt_outline_k"] = 0.6
    return parts
