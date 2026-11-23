"""Hoạt ảnh Giọt Nhầy: nhún dẻo, nảy, bẹp khi trúng đòn, chảy tan khi chết.
Xương: body (gốc), top (chóp), core (lõi). Trục Y của xương dọc = lên."""
import math

import mlib as M
from anim_biped import P, damp, ease

T = math.tau


def make(arm, *_):
    a = M.Anim(arm)

    def jelly(p, sy, sx=None, lean=0.0):
        sx = sx if sx is not None else 1 / math.sqrt(max(sy, 0.2))
        p.sc("body", (sx, sy, sx)).rot("body", lean)
        return p

    def idle(t):
        s = math.sin(t * T)
        p = jelly(P(), 1 + 0.045 * s)
        p.rot("top", 0.04 * math.sin(t * T + 1), 0, 0.04 * math.cos(t * T + 1))
        return p.rot("core", 0, t * T).loc("core", 0, 0.01 * s, 0)

    def hop(t, hgt):
        if t < 0.25:
            k = ease(t / 0.25)
            p = jelly(P(), 1 - 0.18 * k)
            return p.loc("body", 0, 0, 0)
        if t < 0.8:
            u = (t - 0.25) / 0.55
            p = jelly(P(), 1.14 - 0.14 * u, lean=0.12)
            p.loc("body", 0, hgt * math.sin(u * math.pi), 0)
        else:
            k = (t - 0.8) / 0.2
            p = jelly(P(), 0.86 + 0.14 * ease(k))
        return p

    def patrol(t):
        return hop(t, 0.12).rot("core", 0, t * T * 2)

    def chase(t):
        return hop(t, 0.2).rot("core", 0, t * T * 3)

    def tele(t):
        # Cú nhảy của slime diễn ra trong lúc tele (logic dời e.x/e.y): nén, bật cao, rơi.
        if t < 0.3:
            k = ease(t / 0.3)
            p = jelly(P(), 1 - 0.3 * k)
            p.rot("top", 0.15 * k)
        elif t < 0.85:
            u = (t - 0.3) / 0.55
            p = jelly(P(), 1.3 - 0.4 * u, lean=0.25 * (1 - u))
            p.loc("body", 0, 0.55 * math.sin(u * math.pi), 0)
        else:
            k = (t - 0.85) / 0.15
            p = jelly(P(), 0.9 - 0.25 * math.sin(k * math.pi))
        return p.rot("core", 0, t * T * 4)

    def attack(t):
        j = damp(t, 2.0, 5.0)
        return jelly(P(), 0.7 + 0.3 * (1 - math.exp(-6 * t)) + 0.15 * j).rot("core", 0, t * T * 2)

    def hurt(t):
        j = damp(t, 2.5, 5.5)
        p = jelly(P(), 1 - 0.22 * j, lean=-0.3 * j)
        return p.rot("top", -0.3 * j).loc("core", 0, 0, 0.03 * j)

    def stun(t):
        u = t * T
        p = jelly(P(), 0.88 + 0.03 * math.sin(u * 2), lean=0.12)
        p.rot("body", 0, 0, 0.1 * math.sin(u)).rot("top", 0.2 * math.cos(u), 0, 0.2 * math.sin(u))
        return p.rot("core", 0, -u * 0.5)

    def dead(t):
        k = ease(t / 0.9)
        p = jelly(P(), 1 - 0.7 * k, 1 + 0.6 * k)
        return p.rot("top", 0.3 * k).loc("core", 0, -0.12 * k, 0).sc("core", 1 - 0.6 * k)

    a.clip("idle", 2.0, idle)
    a.clip("patrol", 0.8, patrol)
    a.clip("chase", 0.5, chase)
    a.clip("tele", 1.0, tele, loop=False)
    a.clip("attack", 0.45, attack, loop=False)
    a.clip("hurt", 0.45, hurt, loop=False)
    a.clip("stun", 1.2, stun)
    a.clip("dead", 1.0, dead, loop=False)
    return a
