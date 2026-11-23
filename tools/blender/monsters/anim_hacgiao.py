"""Hoạt ảnh Hắc Giao: bơi uốn thân, quạt đuôi, mưa nước, lao, gầm chuyển giai đoạn, triệu hồi.
Runtime: 14 đốt đầu bám đường đi của logic (driveSpine); đầu, hàm, râu, vây, 6 đốt đuôi và vây đuôi theo clip.
Xương sp*: dọc +Y Blender (đầu → đuôi), xoay Z = uốn ngang, X = uốn dọc."""
import math

import mlib as M
from anim_biped import P, damp, ease

NS = 20
T = math.tau


def make(arm, *_):
    a = M.Anim(arm)

    def swim(t, amp=0.14, n=1, jaw=0.12, fin=0.25, wh=1.0):
        p = P()
        for i in range(NS):
            p.rot(f"sp{i}", 0.03 * math.sin(t * T * n + i * 0.4), 0, amp * math.sin(t * T * n - i * 0.55) * (0.5 + i / NS))
        p.rot("head", 0.06 * math.sin(t * T * n), 0, -0.1 * math.sin(t * T * n))
        p.rot("jaw", -jaw - 0.05 * math.sin(t * T * n))
        for S, sd in (("L", 1), ("R", -1)):
            for i in range(3):
                p.rot(f"wh{S}{i}", 0.15 * wh * math.sin(t * T * n - i * 0.9), 0, sd * 0.12 * wh * math.sin(t * T * n - i * 0.8))
            for j in (1, 2):
                p.rot(f"fin{S}{j}", fin * math.sin(t * T * n + j))
        p.rot("tailfin", 0, 0, 0.3 * math.sin(t * T * n - NS * 0.55))
        return p

    def roar_pose(p, k, jaw=0.75, up=0.5):
        p.rot("head", -up * k).rot("jaw", -jaw * k)
        for i in range(4):
            p.rot(f"sp{i}", -0.12 * k)
        for S in "LR":
            for j in (1, 2):
                p.rot(f"fin{S}{j}", -0.6 * k)
        return p

    def tele(t):
        k = ease(t / 0.8)
        p = swim(t * 0.5, 0.08)
        roar_pose(p, k, 0.45, 0.35)
        return p

    def attack(t):
        k = ease(t / 0.15) * (1 - ease((t - 0.45) / 0.55))
        p = swim(t, 0.08)
        p.rot("head", 0.35 * k).rot("jaw", -0.6 * (1 - k) * ease(t / 0.15))
        for i in range(5):
            p.rot(f"sp{i}", 0.08 * k)
        return p

    def hurt(t):
        j = damp(t, 2.0, 5.0)
        p = swim(t * 0.3, 0.05)
        p.rot("head", -0.5 * j, 0, 0.3 * j).rot("jaw", -0.4 * abs(j))
        for i in range(6):
            p.rot(f"sp{i}", -0.1 * j, 0, 0.12 * j)
        return p

    def stun(t):
        u = t * T
        p = swim(t, 0.04, jaw=0.25, fin=0.05, wh=0.3)
        p.rot("head", 0.35 + 0.1 * math.sin(u), 0, 0.35 * math.sin(u))
        for i in range(NS):
            p.rot(f"sp{i}", 0.02)
        return p

    def dead(t):
        k = ease(t / 1.2)
        p = swim(t * 0.4, 0.1 * (1 - k), fin=0.2 * (1 - k))
        p.rot("head", 0.5 * k, 0, 0.6 * k).rot("jaw", -0.5 * k)
        for i in range(NS):
            p.rot(f"sp{i}", 0.04 * k, 0, 0.12 * k * math.sin(i * 0.7))
        return p

    def fan(t):
        # Quạt đuôi: thu đuôi rồi quét mạnh sang ngang, vây đuôi xoè.
        k = math.sin(ease(t) * T)
        p = swim(t, 0.06)
        roar_pose(p, ease(t / 0.3) * (1 - ease((t - 0.7) / 0.3)), 0.35, 0.15)
        for i in range(10, NS):
            p.rot(f"sp{i}", 0, 0, 0.55 * k * (i - 9) / 10)
        p.rot("tailfin", 0, 0, 0.9 * k).sc("tailfin", 1.0 + 0.25 * abs(k))
        return p

    def rain(t):
        # Mưa nước: ngóc cao, há hàm phun lên trời, vây ngực dang rộng rung.
        k = ease(t / 0.35) * (1 - ease((t - 0.85) / 0.15))
        p = swim(t, 0.06)
        roar_pose(p, k, 0.9, 0.8)
        for S in "LR":
            for j in (1, 2):
                p.rot(f"fin{S}{j}", 0.15 * math.sin(t * 40) * k)
        return p

    def charge(t):
        p = swim(t, 0.2, n=2, jaw=0.5, fin=0.1, wh=2.0)
        p.rot("head", 0.25)
        for S in "LR":
            for j in (1, 2):
                p.rot(f"fin{S}{j}", 0.7)
        return p

    def roar(t):
        k = ease(t / 0.25) * (1 - ease((t - 0.8) / 0.2))
        p = swim(t, 0.1)
        roar_pose(p, k, 1.0, 0.7)
        p.rot("head", 0, 0, 0.35 * math.sin(t * 22) * k)
        for i in range(NS):
            p.rot(f"sp{i}", 0, 0, 0.06 * math.sin(t * 22 - i * 0.6) * k)
        return p

    def summon(t):
        k = ease(t / 0.3) * (1 - ease((t - 0.8) / 0.2))
        p = swim(t, 0.08)
        roar_pose(p, k, 0.55, 0.3)
        p.rot("head", 0, 0, 0.3 * math.sin(t * T) * k)
        return p

    a.clip("idle", 3.0, swim)
    a.clip("patrol", 2.0, lambda t: swim(t, 0.18))
    a.clip("chase", 1.2, lambda t: swim(t, 0.24, jaw=0.2))
    a.clip("tele", 1.0, tele, loop=False)
    a.clip("attack", 0.6, attack, loop=False)
    a.clip("hurt", 0.5, hurt, loop=False)
    a.clip("stun", 1.5, stun)
    a.clip("dead", 2.0, dead, loop=False)
    a.clip("fan", 1.0, fan, loop=False)
    a.clip("rain", 1.0, rain, loop=False)
    a.clip("charge", 0.6, charge)
    a.clip("roar", 1.1, roar, loop=False)
    a.clip("summon", 1.0, summon, loop=False)
    return a
