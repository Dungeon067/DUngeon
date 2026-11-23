"""Hoạt ảnh Cung Thủ: bộ chung + kéo cung (draw, khớp tele "proj"), bắn (attack) là buông dây."""
import anim_biped as AB


def make(arm, *_):
    def draw(t):
        k = AB.ease(t / 0.6)
        p = AB.P()
        p.rot("spine", 0.05, 0.5 * k).rot("chest", -0.05 * k, 0.3 * k).rot("head", 0.05, -0.75 * k)
        p.rot("armL", -1.45 * k, 0, 0.25 * k).rot("foreL", -0.05 * k)
        p.rot("armR", -1.3 * k, 0, -0.5 * k).rot("foreR", -1.9 * k)
        p.rot("thighL", -0.3 * k).rot("thighR", 0.25 * k).rot("shinR", 0.2 * k)
        p.loc("hips", 0, -0.02 * k, 0)
        # Run nhẹ khi giữ dây ở cuối.
        p.rot("armR", 0.03 * AB.math.sin(t * 50) * AB.ease((t - 0.7) / 0.3))
        return p

    def attack(t):
        r = AB.ease(t / 0.5)
        p = draw(1.0)
        rel = AB.damp(t, 1.5, 7.0)
        p.rot("armR", 0.6 * (1 - r) * 0 + 0.5 * r, 0, -0.3 * abs(rel)).rot("foreR", 1.4 * AB.ease(t / 0.12) * (1 - 0.3 * r))
        p.rot("spine", -0.1 * rel).rot("armL", 0.15 * rel)
        return AB.P({b: v for b, v in p.items()})

    a = AB.make(arm, h=0.34, extra={"draw": (1.0, draw, False)})
    # Thay clip attack chung bằng cú buông dây.
    import bpy
    for tr in list(arm.animation_data.nla_tracks):
        if tr.name == "attack":
            arm.animation_data.nla_tracks.remove(tr)
    bpy.data.actions.remove(bpy.data.actions["attack"])
    a.clip("attack", 0.5, attack, loop=False)
    return a
