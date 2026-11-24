"""Hoạt ảnh Cung Thủ: bộ chung + kéo cung (draw, khớp tele "proj"), bắn (attack) là buông dây.
Tay trái giữ cung dựng đứng (xoay cổ tay bù góc nâng tay, giải số), dây cung (xương bstr) bám theo tay phải,
mũi tên (xương nock) chỉ hiện lúc kéo cung."""
import math

import bpy
from mathutils import Euler, Vector

import anim_biped as AB


def apply(arm, p):
    for pb in arm.pose.bones:
        loc, rot, sc = p.get(pb.name, ((0, 0, 0), (0, 0, 0), 1))
        pb.rotation_mode = "QUATERNION"
        pb.location = loc
        pb.rotation_quaternion = Euler(rot).to_quaternion()
        pb.scale = (sc, sc, sc) if isinstance(sc, (int, float)) else sc
    bpy.context.view_layer.update()


def make(arm, *_):
    def pose(t):
        k = AB.ease(t / 0.6)
        p = AB.P()
        p.rot("spine", 0.05, 0.5 * k).rot("chest", -0.05 * k, 0.3 * k).rot("head", 0.05, -0.75 * k)
        p.rot("armL", -1.45 * k, 0, 0.25 * k).rot("foreL", -0.05 * k)
        p.rot("armR", -1.3 * k, 0, -0.5 * k).rot("foreR", -1.9 * k)
        p.rot("thighL", -0.3 * k).rot("thighR", 0.25 * k).rot("shinR", 0.2 * k)
        p.loc("hips", 0, -0.02 * k, 0)
        return p, k

    # Giải góc cổ tay trái để cung đứng thẳng, dây quay về phía người bắn.
    pbs = arm.pose.bones
    best = (-9, 0, 0)
    p_end, _ = pose(1.0)
    for xi in range(-32, 33, 2):
        for yi in range(-8, 9, 2):
            for zi in range(-8, 9, 2):
                q = AB.P(dict(p_end))
                q.rot("handL", xi * 0.1, yi * 0.2, zi * 0.2)
                apply(arm, q)
                yb = pbs["bow"].matrix.col[1].to_3d().normalized()
                ys = pbs["bstr"].matrix.col[1].to_3d().normalized()
                to_hand = (pbs["handR"].tail - pbs["bstr"].head).normalized()
                sc = 2.0 * yb.z + 0.6 * ys.dot(to_hand)
                if sc > best[0]:
                    best = (sc, xi * 0.1, yi * 0.2, zi * 0.2)
    _, hx, hy, hz = best
    q = AB.P(dict(p_end))
    q.rot("handL", hx, hy, hz)
    apply(arm, q)
    tgt = pbs["handR"].tail.copy()
    pull = pbs["bstr"].matrix.inverted() @ tgt
    if pull.length > 0.3:
        pull = pull.normalized() * 0.3
    apply(arm, AB.P())
    print("[s29] archer handL", hx, hy, hz, "score", best[0], "pull", tuple(round(c, 3) for c in pull))

    def draw(t):
        p, k = pose(t)
        p.rot("handL", hx * k, hy * k, hz * k)
        kp = AB.ease((t - 0.2) / 0.5)
        p.loc("bstr", *(pull * kp))
        p.sc("nock", 1.0 if t > 0.12 else 0.001)
        p.rot("armR", 0.03 * math.sin(t * 50) * AB.ease((t - 0.7) / 0.3))
        return p

    def attack(t):
        r = AB.ease(t / 0.5)
        p = draw(1.0)
        rel = AB.damp(t, 1.5, 7.0)
        p.rot("armR", 0.5 * r, 0, -0.3 * abs(rel)).rot("foreR", 1.4 * AB.ease(t / 0.12) * (1 - 0.3 * r))
        p.rot("spine", -0.1 * rel).rot("armL", 0.15 * rel)
        snap = max(0.0, 1 - t / 0.05)
        _, r_, s_ = p["bstr"]
        p["bstr"] = (tuple(pull * snap + Vector((0, 0, 0.004 * math.sin(t * 90) * math.exp(-t * 10)))), r_, s_)
        p.sc("nock", 1.0 if t < 0.04 else 0.001)
        return p

    def base(p, t):
        if "nock" not in p:
            p.sc("nock", 0.001)
        return p

    a = AB.make(arm, h=0.34, base=base, extra={"draw": (1.0, draw, False)})
    for tr in list(arm.animation_data.nla_tracks):
        if tr.name == "attack":
            arm.animation_data.nla_tracks.remove(tr)
    bpy.data.actions.remove(bpy.data.actions["attack"])
    a.clip("attack", 0.5, attack, loop=False)
    return a
