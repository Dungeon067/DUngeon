"""Đặt tư thế bằng phép xoay quanh trục thế giới, không phụ thuộc roll của xương."""

import math

import bpy
from mathutils import Matrix, Vector

AXES = {"X": Vector((1, 0, 0)), "Y": Vector((0, 1, 0)), "Z": Vector((0, 0, 1))}


def rot(rig, bone, axis, deg):
    """Xoay xương `bone` quanh trục thế giới `axis` (X/Y/Z hoặc Vector) tại đầu xương."""
    pb = rig.pose.bones[bone]
    ax = AXES[axis] if isinstance(axis, str) else Vector(axis).normalized()
    head = pb.matrix.to_translation()
    R = Matrix.Translation(head) @ Matrix.Rotation(math.radians(deg), 4, ax) @ Matrix.Translation(-head)
    pb.matrix = R @ pb.matrix
    bpy.context.view_layer.update()


def reset(rig):
    for pb in rig.pose.bones:
        pb.matrix_basis = Matrix.Identity(4)
    bpy.context.view_layer.update()


def apply(rig, steps):
    """steps: [(xương, trục, độ)], áp theo thứ tự (cha trước con)."""
    for b, a, d in steps:
        if b in rig.pose.bones:
            rot(rig, b, a, d)


# Tư thế mẫu. Trục: +X bên trái nhân vật, -Y trước mặt, +Z lên.
POSES = {
    "dung": [
        ("upper_arm.L", "Y", 28), ("upper_arm.R", "Y", -28),
        ("forearm.L", "X", 12), ("forearm.R", "X", 12),
    ],
    # Tư thế tranh lớn: kiếm cầm thấp chéo xuống, vai hơi xoay, thân nghiêng nhẹ.
    "tranh": [
        ("hips", "Z", -8), ("chest", "Z", 10), ("head", "Z", -8), ("head", "X", 4),
        ("thigh.R", "Y", 6), ("thigh.L", "Y", -4), ("thigh.L", "X", -6),
        ("upper_arm.L", "Y", 26), ("forearm.L", "X", 18),
        ("upper_arm.R", "Y", -14), ("upper_arm.R", "X", 18), ("forearm.R", "X", 30),
        ("hand.R", "X", -30),
    ],
}
