"""Đầu kiểu anime: hộp sọ tròn, cằm nhọn, mặt vẽ bằng texture chiếu từ phía trước.

Mắt, lông mày, miệng là hai tấm atlas PNG (vẽ bằng SVG trong tools/art).
Ô atlas được chọn bằng thuộc tính `tt_mat` và `tt_mieng` trên object đầu,
nên đổi biểu cảm hay chớp mắt chỉ là keyframe một con số.
"""

import math

import bmesh
import bpy
from mathutils import Vector

from .toon import toon_material
from .util import link, smooth

ATLAS_COLS, ATLAS_ROWS = 4, 2
# Ô trong atlas mắt: 0 bình thường, 1 vui, 2 giận, 3 buồn, 4 ngạc nhiên, 5 nhắm, 6 lim dim.
# Ô trong atlas miệng: 0 bình thường, 1 vui, 2 giận, 3 buồn, 4 ngạc nhiên, 5 hét (đánh).
EXPR = {"binh_thuong": (0, 0), "vui": (1, 1), "gian": (2, 2), "buon": (3, 3), "ngac_nhien": (4, 4)}


def face_style(style):
    """Mặt anime gần như không đổ bóng: hạ ngưỡng để chỉ rìa xa đèn mới tối."""
    return dict(style or {}, nguong=(0.22, 0.1))


def head_dims(body):
    h = body.h
    R = 0.43 * h
    zc = body.z["chin"] + 0.45 * h
    return R, zc


def build_head(body, look, style, face_tex):
    R, zc = head_dims(body)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=28, radius=1.0)
    for vt in bm.verts:
        x, y, z = vt.co
        front = max(0.0, -y)
        if z < 0:
            t = -z
            x *= 1 - 0.30 * t**1.4
            y *= 1 - 0.22 * t
            z *= 1 + 0.42 * front**1.5 * t
        # Mặt trước hơi phẳng, sau gáy tròn đầy.
        if y < 0:
            y *= 0.9
        else:
            y *= 1.04
        x *= 0.94
        vt.co = Vector((x, y, z)) * R
    me = bpy.data.meshes.new("dau")
    bm.to_mesh(me)
    bm.free()
    obj = link(bpy.data.objects.new("dau", me))
    obj.location = (0, 0, zc)
    smooth(obj)
    mat, gn = toon_material("da_mat", look["skin"], face_style(style), rim=True)
    _face_overlay(mat, R, face_tex)
    me.materials.append(mat)
    obj["tt_mat"] = 0.0
    obj["tt_mieng"] = 0.0
    # Tai nhỏ, phần lớn bị tóc che.
    ears = []
    for s in (1, -1):
        bm = bmesh.new()
        bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=8, radius=1.0)
        for vt in bm.verts:
            vt.co = Vector((vt.co.x * 0.035, vt.co.y * 0.09, vt.co.z * 0.13)) * R * 3
        me2 = bpy.data.meshes.new("tai")
        bm.to_mesh(me2)
        bm.free()
        e = link(bpy.data.objects.new("tai", me2))
        e.location = (s * R * 0.9, R * 0.05, zc - R * 0.08)
        me2.materials.append(toon_material("da_tai", look["skin"], face_style(style))[0])
        smooth(e)
        ears.append(e)
    return obj, ears, (R, zc)


def _face_overlay(mat, R, face_tex):
    nt = mat.node_tree
    N, Lk = nt.nodes, nt.links
    out = next(n for n in N if n.type == "OUTPUT_MATERIAL")
    toon = out.inputs["Surface"].links[0].from_node
    tc = N.new("ShaderNodeTexCoord")
    sep = N.new("ShaderNodeSeparateXYZ")
    Lk.new(tc.outputs["Object"], sep.inputs[0])

    def m(op, a, b=None, val=None):
        n = N.new("ShaderNodeMath")
        n.operation = op
        Lk.new(a, n.inputs[0]) if not isinstance(a, float) else None
        if isinstance(a, float):
            n.inputs[0].default_value = a
        if b is not None:
            Lk.new(b, n.inputs[1])
        elif val is not None:
            n.inputs[1].default_value = val
        return n.outputs[0]

    u = m("ADD", m("MULTIPLY", sep.outputs["X"], val=1 / (2 * R)), val=0.5)
    vv = m("ADD", m("MULTIPLY", sep.outputs["Z"], val=1 / (2 * R)), val=0.5)
    nsep = N.new("ShaderNodeSeparateXYZ")
    Lk.new(tc.outputs["Normal"], nsep.inputs[0])
    front = m("LESS_THAN", nsep.outputs["Y"], val=-0.12)

    shader = out.inputs["Surface"].links[0].from_socket
    for prop, key in (("tt_mat", "mat"), ("tt_mieng", "mieng")):
        at = N.new("ShaderNodeAttribute")
        at.attribute_type = "OBJECT"
        at.attribute_name = prop
        idx = at.outputs["Fac"]
        col = m("FLOORED_MODULO", m("ROUND", idx), val=ATLAS_COLS)
        row = m("FLOOR", m("DIVIDE", m("ROUND", idx), val=ATLAS_COLS))
        uu = m("DIVIDE", m("ADD", u, col), val=ATLAS_COLS)
        vr = m("SUBTRACT", float(ATLAS_ROWS - 1), row)
        vv2 = m("DIVIDE", m("ADD", vv, vr), val=ATLAS_ROWS)
        cmb = N.new("ShaderNodeCombineXYZ")
        Lk.new(uu, cmb.inputs["X"])
        Lk.new(vv2, cmb.inputs["Y"])
        img = N.new("ShaderNodeTexImage")
        img.image = bpy.data.images.load(face_tex[key], check_existing=True)
        img.image.alpha_mode = "STRAIGHT"
        img.extension = "CLIP"
        img.interpolation = "Cubic"
        Lk.new(cmb.outputs[0], img.inputs["Vector"])
        # Giữ trong một ô: u, v ngoài [0,1] thì bỏ.
        inu = m("MULTIPLY", m("GREATER_THAN", u, val=0.0), m("LESS_THAN", u, val=1.0))
        inv = m("MULTIPLY", m("GREATER_THAN", vv, val=0.0), m("LESS_THAN", vv, val=1.0))
        a = m("MULTIPLY", m("MULTIPLY", img.outputs["Alpha"], front), m("MULTIPLY", inu, inv))
        em = N.new("ShaderNodeEmission")
        Lk.new(img.outputs["Color"], em.inputs["Color"])
        mx = N.new("ShaderNodeMixShader")
        Lk.new(a, mx.inputs[0])
        Lk.new(shader, mx.inputs[1])
        Lk.new(em.outputs[0], mx.inputs[2])
        shader = mx.outputs[0]
    Lk.new(shader, out.inputs["Surface"])
    _ = toon
    return mat
