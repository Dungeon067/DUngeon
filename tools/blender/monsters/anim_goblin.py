"""Hoạt ảnh Yêu Rừng (đủ bộ ở mốc 2)."""
import math

import mlib as M


def make(arm, J, k):
    a = M.Anim(arm)
    T = math.tau

    def idle(t):
        s = math.sin(t * T)
        return {"spine": ((0, 0, 0), (0.04 + 0.02 * s, 0, 0), 1), "chest": ((0, 0, 0), (0.02 * s, 0, 0), 1),
                "head": ((0, 0, 0), (-0.05 * s, 0.05 * math.sin(t * T * 0.5), 0), 1),
                "earL": ((0, 0, 0), (0, 0, 0.08 * math.sin(t * T + 1)), 1),
                "earR": ((0, 0, 0), (0, 0, -0.08 * math.sin(t * T + 1)), 1),
                "hips": ((0, 0, -0.006 * (1 - s)), (0, 0, 0), 1)}
    a.clip("idle", 2.0, idle)
