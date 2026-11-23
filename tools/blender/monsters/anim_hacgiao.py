"""Hoạt ảnh Hắc Giao (đủ bộ ở mốc 2). Thân bơi uốn sóng, râu và vây lay động."""
import math

import mlib as M

NS = 20


def make(arm):
    a = M.Anim(arm)
    T = math.tau

    def swim(t, amp=0.14, freq=1.0):
        d = {}
        for i in range(NS):
            d[f"sp{i}"] = ((0, 0, 0), (0.03 * math.sin(t * T + i * 0.4), 0, amp * math.sin(t * T * freq - i * 0.55) * (0.5 + i / NS)), 1)
        d["head"] = ((0, 0, 0), (0.06 * math.sin(t * T), 0, -0.1 * math.sin(t * T)), 1)
        d["jaw"] = ((0, 0, 0), (-0.12 - 0.05 * math.sin(t * T), 0, 0), 1)
        for S, sd in (("L", 1), ("R", -1)):
            for i in range(3):
                d[f"wh{S}{i}"] = ((0, 0, 0), (0.15 * math.sin(t * T - i * 0.9), 0, sd * 0.12 * math.sin(t * T - i * 0.8)), 1)
            for j in (1, 2):
                d[f"fin{S}{j}"] = ((0, 0, 0), (0.25 * math.sin(t * T + j), 0, 0), 1)
        d["tailfin"] = ((0, 0, 0), (0, 0, 0.3 * math.sin(t * T - NS * 0.55)), 1)
        return d

    a.clip("idle", 3.0, swim)
