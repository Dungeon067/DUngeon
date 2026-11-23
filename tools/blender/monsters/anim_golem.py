"""Hoạt ảnh Hộ Vệ Đá Cổ: bộ chung kiểu nặng; attack là cú đập hai tay xuống đất rồi đứng nghỉ (khớp lore)."""
import anim_biped as AB


def make(arm, *_):
    def smash(t):
        up = AB.ease(t / 0.35)
        down = AB.ease((t - 0.35) / 0.15)
        rec = AB.ease((t - 0.75) / 0.25)
        k = up * (1 - down)
        hit = down * (1 - rec)
        p = AB.P()
        for S in "LR":
            p.rot(f"arm{S}", -2.6 * k - 0.9 * hit, 0, 0).rot(f"fore{S}", -0.6 * k)
        p.rot("spine", -0.2 * k + 0.45 * hit).rot("chest", -0.1 * k + 0.3 * hit).rot("head", 0.1 * k - 0.3 * hit)
        p.rot("thighL", -0.5 * hit).rot("thighR", -0.5 * hit).rot("shinL", 0.7 * hit).rot("shinR", 0.7 * hit)
        p.loc("hips", 0, 0, -0.14 * hit + 0.03 * k)
        return p

    a = AB.make(arm, h=0.8, heavy=1.0, arms_out=0.15)
    import bpy
    for tr in list(arm.animation_data.nla_tracks):
        if tr.name == "attack":
            arm.animation_data.nla_tracks.remove(tr)
    bpy.data.actions.remove(bpy.data.actions["attack"])
    a.clip("attack", 1.1, smash, loop=False)
    return a
