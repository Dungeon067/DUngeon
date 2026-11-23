"""Bộ hoạt ảnh chung cho quái hai chân (Yêu Rừng, Cung Thủ, Pháp Sư, Hộ Vệ Đá).
Clip: idle, patrol, chase, tele, attack, hurt, stun, dead (+ clip riêng qua `extra`).
Quy ước: tele dài 1 giây, runtime co giãn theo `tele.dur`; dead không lặp, để lại tư thế nằm.
Hướng trục xương (Blender, mặt nhìn -Y): xoay X dương của xương dọc = cúi tới trước."""
import math

import mlib as M

T = math.tau


def ease(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


def damp(t, f=3.0, k=6.0):
    """Dao động tắt dần (giật rồi nảy)."""
    return math.exp(-k * t) * math.sin(t * f * T)


class P(dict):
    """Gom pose: rot(bone, x, y, z), loc(bone, ...), sc(bone, s)."""

    def rot(self, b, x=0.0, y=0.0, z=0.0):
        l, r, s = self.get(b, ((0, 0, 0), (0, 0, 0), 1))
        self[b] = (l, (r[0] + x, r[1] + y, r[2] + z), s)
        return self

    def loc(self, b, x=0.0, y=0.0, z=0.0):
        l, r, s = self.get(b, ((0, 0, 0), (0, 0, 0), 1))
        self[b] = ((l[0] + x, l[1] + y, l[2] + z), r, s)
        return self

    def sc(self, b, v):
        l, r, _ = self.get(b, ((0, 0, 0), (0, 0, 0), 1))
        self[b] = (l, r, v)
        return self


def make(arm, h=0.6, heavy=0.0, arms_out=0.0, extra=None, base=None):
    """h: chiều cao hông (m) để chỉnh biên độ nhún. heavy 0..1: dáng nặng nề (Hộ Vệ Đá).
    base(p, t): thêm vào mọi tư thế (vd. tay cầm trượng). extra: {tên: (dur, fn(t)->P, loop)}."""
    a = M.Anim(arm)
    bob = 0.03 * h
    LEG = 1.0  # dấu xoay đùi ra trước
    has = {b.name for b in arm.data.bones}

    def stand(t, breathe=1.0):
        s = math.sin(t * T)
        p = P()
        p.rot("spine", 0.04 + 0.02 * s * breathe).rot("chest", 0.02 * s * breathe)
        p.rot("head", -0.04 * s * breathe, 0.06 * math.sin(t * T * 0.5) * breathe)
        if "earL" in has:
            p.rot("earL", 0, 0, 0.1 * math.sin(t * T + 1)).rot("earR", 0, 0, -0.1 * math.sin(t * T + 1))
        p.rot("armL", 0, 0, -0.08 - arms_out).rot("armR", 0, 0, 0.08 + arms_out)
        p.rot("foreL", -0.15).rot("foreR", -0.15)
        p.loc("hips", 0, -0.006 * (1 - s) * h, 0)
        return p

    def legs(p, u, amp, knee, lift=1.0):
        for S, ph in (("L", 0.0), ("R", math.pi)):
            sw = math.sin(u + ph)
            p.rot(f"thigh{S}", -LEG * amp * sw - 0.05)
            p.rot(f"shin{S}", knee * max(0.0, math.sin(u + ph + 1.2)) * lift + 0.05)
            p.rot(f"foot{S}", 0.25 * amp * sw)
            p.rot(f"arm{S}", amp * 0.7 * sw * (1 - heavy * 0.5))
            p.rot(f"fore{S}", -0.25 - 0.25 * max(0.0, sw))

    def walk(t, amp=0.38, knee=0.7, lean=0.06, n=1):
        u = t * T * n
        p = stand(t, 0.3)
        legs(p, u, amp, knee)
        p.loc("hips", 0, bob * (abs(math.cos(u)) - 0.5) * (1 + heavy), 0)
        p.rot("hips", 0, 0.08 * math.sin(u) * (1 + heavy), 0.03 * math.cos(u) * (1 + 2 * heavy))
        p.rot("spine", lean).rot("chest", 0, -0.1 * math.sin(u))
        p.rot("head", -lean * 0.6, 0.05 * math.sin(u))
        return p

    def run(t):
        u = t * T
        p = walk(t, 0.75 - heavy * 0.25, 1.3, 0.28 - heavy * 0.1)
        p.loc("hips", 0, bob * 1.5 * abs(math.sin(u)), 0)
        p.rot("armL", -0.2).rot("armR", -0.2).rot("foreL", -0.6).rot("foreR", -0.6)
        return p

    def tele(t):
        k = ease(t / 0.75)
        sh = 0.02 * math.sin(t * 60) * ease((t - 0.6) / 0.4)
        p = stand(t, 0.2)
        p.rot("spine", -0.18 * k, 0.45 * k).rot("chest", -0.15 * k + sh, 0.25 * k)
        p.rot("head", 0.2 * k, -0.4 * k)
        p.rot("armR", -1.9 * k, 0, 0.35 * k).rot("foreR", -0.9 * k)
        p.rot("armL", 0.4 * k, 0, -0.4 * k)
        p.rot("thighL", -0.35 * k).rot("shinL", 0.3 * k).rot("thighR", 0.3 * k).rot("shinR", 0.5 * k)
        p.loc("hips", 0, -0.06 * h * k, 0)
        return p

    def attack(t):
        k = 1 - ease(t / 0.25)
        r = ease((t - 0.45) / 0.55)
        hit = 1 - k
        p = stand(t, 0.2)
        w = hit * (1 - r)
        p.rot("spine", -0.18 * k + 0.35 * w, 0.45 * k - 0.5 * w).rot("chest", -0.15 * k + 0.2 * w, 0.25 * k - 0.3 * w)
        p.rot("head", 0.2 * k - 0.1 * w, -0.4 * k + 0.3 * w)
        p.rot("armR", -1.9 * k + 0.9 * w, 0, 0.35 * k).rot("foreR", -0.9 * k - 0.2 * w)
        p.rot("armL", 0.4 * k - 0.3 * w, 0, -0.4 * k)
        p.rot("thighL", -0.35 * k - 0.45 * w).rot("shinL", 0.3 * k + 0.4 * w).rot("thighR", 0.3 * k + 0.3 * w)
        p.loc("hips", 0, -0.06 * h * (k + w), 0)
        return p

    def hurt(t):
        j = damp(t, 2.2, 5.0)
        p = stand(t, 0)
        p.rot("spine", -0.35 * j).rot("chest", -0.3 * j).rot("head", -0.45 * j, 0.2 * j)
        p.rot("armL", -0.5 * abs(j), 0, -0.5 * abs(j)).rot("armR", -0.5 * abs(j), 0, 0.5 * abs(j))
        p.loc("hips", 0, -0.05 * h * abs(j), 0.04 * h * j)
        p.sc("hips", (1 + 0.06 * j, 1 - 0.08 * j, 1 + 0.06 * j))
        return p

    def stun(t):
        u = t * T
        p = P()
        p.rot("spine", 0.3 + 0.05 * math.sin(u), 0, 0.12 * math.sin(u)).rot("chest", 0.15)
        p.rot("head", 0.35 + 0.12 * math.cos(u), 0, 0.3 * math.sin(u))
        p.rot("armL", 0.15, 0, -0.15 + 0.1 * math.sin(u)).rot("armR", 0.15, 0, 0.15 - 0.1 * math.sin(u))
        p.rot("foreL", -0.1).rot("foreR", -0.1)
        p.rot("thighL", 0.25).rot("shinL", 0.45).rot("thighR", 0.25).rot("shinR", 0.45)
        p.loc("hips", 0.02 * h * math.sin(u), -0.08 * h, 0)
        if "earL" in has:
            p.rot("earL", 0, 0, -0.5).rot("earR", 0, 0, 0.5)
        return p

    def dead(t):
        k = ease(t / 0.55)
        b = 0.06 * math.exp(-8 * max(0.0, t - 0.55)) * math.sin(max(0.0, t - 0.55) * 30)
        p = P()
        p.rot("hips", -1.35 * k + b, 0, 0.15 * k)
        p.loc("hips", 0, -0.75 * h * k, 0.35 * h * k)
        p.rot("spine", 0.15 * k).rot("chest", 0.1 * k).rot("head", -0.4 * k, 0.5 * k)
        p.rot("thighL", 1.2 * k).rot("shinL", 1.0 * k).rot("thighR", 0.6 * k).rot("shinR", 1.4 * k)
        p.rot("armL", -1.6 * k, 0, -0.6 * k).rot("armR", -1.2 * k, 0, 0.9 * k)
        if "earL" in has:
            p.rot("earL", 0, 0, -0.6 * k).rot("earR", 0, 0, 0.6 * k)
        return p

    def wrap(fn):
        if not base:
            return fn
        return lambda t: base(fn(t), t)

    a.clip("idle", 2.4, wrap(stand))
    a.clip("patrol", 1.1 + heavy * 0.5, wrap(walk))
    a.clip("chase", 0.62 + heavy * 0.35, wrap(run))
    a.clip("tele", 1.0, wrap(tele), loop=False)
    a.clip("attack", 0.5 + heavy * 0.25, wrap(attack), loop=False)
    a.clip("hurt", 0.45, wrap(hurt), loop=False)
    a.clip("stun", 1.2, wrap(stun))
    a.clip("dead", 1.2, wrap(dead), loop=False)
    for name, (dur, fn, loop) in (extra or {}).items():
        a.clip(name, dur, wrap(fn), loop=loop)
    return a
