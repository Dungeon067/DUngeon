"""Hoạt ảnh Giọt Nhầy (điền đủ ở mốc 2)."""
import math

import mlib as M


def make(arm):
    a = M.Anim(arm)
    a.clip("idle", 2.0, lambda t: {"body": ((0, 0, 0), (0, 0, 0), (1 + 0.04 * math.sin(t * math.tau), 1 + 0.04 * math.sin(t * math.tau), 1 - 0.05 * math.sin(t * math.tau)))})
