"""Thân gốc và rig xương dùng chung.

Thân được dựng bằng Skin modifier trên một bộ khung đỉnh rồi chia mịn.
Mọi mốc (vai, hông, gối...) tính theo tỉ lệ đầu `heads`, nên cùng một
script cho ra cả bản 1:6 lẫn bản đầu to 1:4.
"""

import math

import bmesh
import bpy
from mathutils import Vector

from .util import apply_modifiers, link, seg_dist, smooth

# Tên xương thống nhất. Mọi hoạt ảnh chỉ dùng các tên này.
DEFORM = [
    "hips", "spine", "chest", "neck", "head",
    "shoulder.L", "upper_arm.L", "forearm.L", "hand.L",
    "shoulder.R", "upper_arm.R", "forearm.R", "hand.R",
    "thigh.L", "shin.L", "foot.L",
    "thigh.R", "shin.R", "foot.R",
]

# Dáng người: hệ số rộng vai, eo, hông, độ dày tay chân.
BUILDS = {
    "nam": {
        "manh": dict(sh=0.125, ch=0.092, wa=0.074, hi=0.088, limb=1.0, bust=0.0),
        "vua": dict(sh=0.138, ch=0.100, wa=0.080, hi=0.090, limb=1.08, bust=0.0),
        "khoe": dict(sh=0.158, ch=0.115, wa=0.092, hi=0.096, limb=1.25, bust=0.0),
    },
    "nu": {
        "manh": dict(sh=0.108, ch=0.082, wa=0.062, hi=0.094, limb=0.9, bust=0.022),
        "vua": dict(sh=0.115, ch=0.088, wa=0.066, hi=0.100, limb=0.96, bust=0.028),
        "khoe": dict(sh=0.128, ch=0.096, wa=0.074, hi=0.106, limb=1.08, bust=0.03),
    },
}


class Body:
    """Các mốc cơ thể (mét), mặt nhìn về -Y, chân chạm z=0."""

    def __init__(self, gioi_tinh="nam", dang="vua", heads=5.5, H=1.7):
        self.gender, self.build, self.heads, self.H = gioi_tinh, dang, heads, H
        b = dict(BUILDS[gioi_tinh][dang])
        self.h = H / heads
        L = self.L = H - self.h
        chibi = max(0.0, min(1.0, (5.5 - heads) / 1.5))
        self.chibi = chibi
        wk = 1.0 + 0.32 * chibi  # bản đầu to thì thân mập hơn cho dễ đọc
        z = lambda f: f * L  # noqa: E731
        leg = 1.0 - 0.10 * chibi
        self.z = dict(
            ankle=z(0.04), knee=z(0.29 * leg + 0.02), crotch=z(0.50 * leg + 0.03),
            hip=z(0.55 * leg + 0.035), waist=z(0.66 - 0.02 * chibi), chest=z(0.80),
            shoulder=z(0.905), neck=z(0.955), chin=L, top=H,
        )
        self.w = {k: b[k] * L * wk for k in ("sh", "ch", "wa", "hi")}
        self.limb = b["limb"] * wk
        self.bust = b["bust"] * L
        self.arm = dict(upper=0.205 * L, fore=0.18 * L, hand=0.085 * L)
        self.foot = 0.10 * L * (1 + 0.2 * chibi)
        # Tư thế nghỉ chữ A: tay xuôi 50 độ so với phương ngang.
        self.arm_angle = math.radians(50)

    # --- điểm khớp -------------------------------------------------------
    def torso_radius(self, z):
        """Bán kính (rx, ry) gần đúng của thân tại độ cao z, để đặt chi tiết sát bề mặt."""
        J, w, L = self.joints(), self.w, self.L
        prof = [(J["pelvis"].z, w["hi"], 0.07 * L), (J["waist"].z, w["wa"], 0.055 * L),
                (J["chest"].z, w["ch"], 0.062 * L + self.bust), (J["shoulder_c"].z, w["sh"] * 0.62, 0.055 * L),
                (J["neck"].z, 0.035 * L * self.limb, 0.034 * L * self.limb)]
        if z <= prof[0][0]:
            return prof[0][1], prof[0][2]
        for (z0, a0, b0), (z1, a1, b1) in zip(prof, prof[1:]):
            if z <= z1:
                t = (z - z0) / (z1 - z0)
                return a0 + (a1 - a0) * t, b0 + (b1 - b0) * t
        return prof[-1][1], prof[-1][2]

    def joints(self):
        zz, w, a = self.z, self.w, self.arm
        J = {}
        J["root"] = Vector((0, 0, 0))
        J["pelvis"] = Vector((0, 0, zz["hip"]))
        J["waist"] = Vector((0, 0, zz["waist"]))
        J["chest"] = Vector((0, 0, zz["chest"]))
        J["shoulder_c"] = Vector((0, 0, zz["shoulder"]))
        J["neck"] = Vector((0, 0, zz["neck"]))
        J["chin"] = Vector((0, 0, zz["chin"]))
        J["top"] = Vector((0, 0, zz["top"]))
        d = Vector((math.cos(self.arm_angle), 0, -math.sin(self.arm_angle)))
        for s, sx in (("L", 1), ("R", -1)):
            ds = Vector((d.x * sx, 0, d.z))
            sh = Vector((sx * w["sh"], 0, zz["shoulder"] - 0.012 * self.L))
            J["clav." + s] = Vector((sx * 0.02 * self.L, 0, zz["shoulder"]))
            J["shoulder." + s] = sh
            J["elbow." + s] = sh + ds * a["upper"] + Vector((0, 0.008, 0))
            J["wrist." + s] = J["elbow." + s] + ds * a["fore"] + Vector((0, -0.01, 0))
            J["fingers." + s] = J["wrist." + s] + ds * a["hand"]
            hx = sx * w["hi"] * 0.55
            J["hipj." + s] = Vector((hx, 0, zz["crotch"] + 0.03 * self.L))
            J["knee." + s] = Vector((hx * 0.92, -0.008, zz["knee"]))
            J["ankle." + s] = Vector((hx * 0.88, 0.01, zz["ankle"]))
            J["toe." + s] = Vector((hx * 0.88, 0.01 - self.foot, 0.012 * self.L))
        return J

    # --- lưới thân ---------------------------------------------------------
    def build_mesh(self, name="than"):
        J, w, L, k = self.joints(), self.w, self.L, self.limb
        bm = bmesh.new()
        verts, radii = [], []

        def add(p, rx, ry=None):
            verts.append(bm.verts.new(p))
            radii.append((rx, ry if ry is not None else rx))
            return len(verts) - 1

        edges = []
        zz = self.z
        ip = add(J["pelvis"], w["hi"], 0.07 * L)
        iw = add(J["waist"], w["wa"], 0.055 * L)
        ic = add(J["chest"] + Vector((0, -self.bust * 0.3, 0)), w["ch"], 0.062 * L + self.bust)
        iu = add(J["shoulder_c"] + Vector((0, 0, -0.01 * L)), w["sh"] * 0.62, 0.055 * L)
        ine = add(J["neck"], 0.035 * L * k, 0.034 * L * k)
        inc = add(J["chin"] + Vector((0, 0.012 * L, 0.05 * L)), 0.031 * L * k)
        edges += [(ip, iw), (iw, ic), (ic, iu), (iu, ine), (ine, inc)]
        for s in ("L", "R"):
            ish = add(J["shoulder." + s], 0.034 * L * k)
            iel = add(J["elbow." + s], 0.026 * L * k)
            iwr = add(J["wrist." + s], 0.02 * L * k, 0.017 * L * k)
            ifi = add(J["fingers." + s], 0.018 * L * k, 0.01 * L * k)
            edges += [(iu, ish), (ish, iel), (iel, iwr), (iwr, ifi)]
            ihj = add(J["hipj." + s], 0.06 * L * k)
            ikn = add(J["knee." + s], 0.035 * L * k)
            ian = add(J["ankle." + s], 0.024 * L * k)
            ito = add(J["toe." + s], 0.024 * L * k, 0.018 * L * k)
            edges += [(ip, ihj), (ihj, ikn), (ikn, ian), (ian, ito)]
        for a, b in edges:
            bm.edges.new((verts[a], verts[b]))
        me = bpy.data.meshes.new(name)
        bm.to_mesh(me)
        bm.free()
        obj = link(bpy.data.objects.new(name, me))
        sk = obj.modifiers.new("skin", "SKIN")
        sk.use_smooth_shade = True
        sk.branch_smoothing = 0.6
        for i, r in enumerate(radii):
            me.skin_vertices[0].data[i].radius = r
        me.skin_vertices[0].data[ip].use_root = True
        sub = obj.modifiers.new("sub", "SUBSURF")
        sub.levels = sub.render_levels = 3
        apply_modifiers(obj)
        smooth(obj)
        return obj

    # --- rig ---------------------------------------------------------------
    def build_armature(self, name="rig"):
        J = self.joints()
        arm = bpy.data.armatures.new(name)
        arm.display_type = "STICK"
        obj = link(bpy.data.objects.new(name, arm))
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.mode_set(mode="EDIT")
        eb = arm.edit_bones

        def bone(n, h, t, parent=None, connect=False, roll=0.0):
            b = eb.new(n)
            b.head, b.tail, b.roll = h, t, roll
            if parent:
                b.parent = eb[parent]
                b.use_connect = connect
            return b

        bone("root", J["root"], J["root"] + Vector((0, 0.25 * self.L, 0)))
        bone("hips", J["pelvis"], J["waist"], "root")
        bone("spine", J["waist"], J["chest"], "hips", True)
        bone("chest", J["chest"], J["shoulder_c"], "spine", True)
        bone("neck", J["neck"], J["chin"], "chest")
        bone("head", J["chin"], J["top"], "neck", True)
        for s in ("L", "R"):
            bone("shoulder." + s, J["clav." + s], J["shoulder." + s], "chest")
            bone("upper_arm." + s, J["shoulder." + s], J["elbow." + s], "shoulder." + s, True)
            bone("forearm." + s, J["elbow." + s], J["wrist." + s], "upper_arm." + s, True)
            bone("hand." + s, J["wrist." + s], J["fingers." + s], "forearm." + s, True)
            bone("thigh." + s, J["hipj." + s], J["knee." + s], "hips")
            bone("shin." + s, J["knee." + s], J["ankle." + s], "thigh." + s, True)
            bone("foot." + s, J["ankle." + s], J["toe." + s], "shin." + s, True)
            # Xương cầm vũ khí: không biến dạng lưới, con của bàn tay.
            wr, fi = J["wrist." + s], J["fingers." + s]
            g = bone("grip." + s, wr + (fi - wr) * 0.55, wr + (fi - wr) * 0.55 + Vector((0, -0.1, 0)), "hand." + s)
            g.use_deform = False
        eb["root"].use_deform = False
        bpy.ops.object.mode_set(mode="OBJECT")
        return obj


def bone_segments(rig, names=None):
    segs = {}
    for b in rig.data.bones:
        if not b.use_deform:
            continue
        if names and b.name not in names:
            continue
        segs[b.name] = (rig.matrix_world @ b.head_local, rig.matrix_world @ b.tail_local)
    return segs


def side_of(name):
    if name.endswith(".L"):
        return 1
    if name.endswith(".R"):
        return -1
    return 0


def auto_weights(obj, rig, names=None, power=6.0, keep=3, center_band=0.02, only=None):
    """Gán trọng số theo khoảng cách tới đoạn xương.

    Ổn định hơn Bone Heat khi chạy không giao diện và cho kết quả giống nhau
    mỗi lần dựng. `only` ép toàn bộ đỉnh theo một xương.
    """
    segs = bone_segments(rig, names)
    groups = {n: obj.vertex_groups.get(n) or obj.vertex_groups.new(name=n) for n in segs}
    mw = obj.matrix_world
    for vtx in obj.data.vertices:
        if only:
            groups[only].add([vtx.index], 1.0, "REPLACE")
            continue
        p = mw @ vtx.co
        cand = []
        for n, (a, b) in segs.items():
            sd = side_of(n)
            if sd and p.x * sd < -center_band:
                continue
            d, _ = seg_dist(p, a, b)
            cand.append((d, n))
        cand.sort()
        cand = cand[:keep]
        ws = [(1.0 / max(d, 1e-4) ** power, n) for d, n in cand]
        tot = sum(w for w, _ in ws)
        for w, n in ws:
            if w / tot > 0.01:
                groups[n].add([vtx.index], w / tot, "REPLACE")
    mod = obj.modifiers.new("rig", "ARMATURE")
    mod.object = rig
    obj.parent = rig
    return obj


def parent_to_bone(obj, rig, bone):
    bpy.context.view_layer.update()
    mw = obj.matrix_world.copy()
    obj.parent = rig
    obj.parent_type = "BONE"
    obj.parent_bone = bone
    bpy.context.view_layer.update()
    obj.matrix_world = mw
    return obj
