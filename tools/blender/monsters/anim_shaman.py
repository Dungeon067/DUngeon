"""Hoạt ảnh Pháp Sư: bộ chung, tay phải cầm trượng, vạt áo bay theo nhịp; thêm niệm phép (cast, khớp tele "orb")."""
import math

import anim_biped as AB

ROBE = ("robeF", "robeB", "robeL", "robeR")


def make(arm, *_):
    def base(p, t):
        s = math.sin(t * math.tau)
        p.loc("orb", 0, 0, 0.02 * math.sin(t * math.tau * 2)).rot("orb", 0, t * math.tau, 0)
        sp = p.get("thighL", ((0, 0, 0), (0, 0, 0), 1))[1][0] - p.get("thighR", ((0, 0, 0), (0, 0, 0), 1))[1][0]
        p.rot("robeF", -0.12 * abs(sp) - 0.04 * s).rot("robeB", 0.12 * abs(sp) + 0.05 * s)
        p.rot("robeL", 0, 0.05 * s, 0.08 * sp).rot("robeR", 0, -0.05 * s, 0.08 * sp)
        return p

    def cast(t):
        k = AB.ease(t / 0.45)
        w = math.sin(t * 24) * 0.04 * k
        p = AB.P()
        p.rot("spine", -0.12 * k).rot("chest", -0.1 * k).rot("head", -0.15 * k)
        p.rot("armR", -1.2 * k, 0, 0.2 * k).rot("foreR", 0.5 * k)
        p.rot("armL", -0.9 * k + w, 0, -0.5 * k).rot("foreL", -0.8 * k)
        p.loc("orb", 0, -0.02 * k, 0.06 * k + 0.02 * math.sin(t * 30))
        p.sc("orb", 1 + 0.5 * k)
        p.rot("robeF", 0.2 * k + w).rot("robeB", -0.15 * k).rot("robeL", 0, 0, -0.2 * k).rot("robeR", 0, 0, 0.2 * k)
        return p

    return AB.make(arm, h=0.5, base=base, extra={"cast": (1.0, cast, False)})
