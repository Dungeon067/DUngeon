"""Shot builders. Each returns a Shot with frame range and a per-frame update(frame) callback."""
import math
import numpy as np
import bpy
from mathutils import Vector
from . import common as C, env as E, drum as D, fx as F

FPS = 30


class Shot:
    def __init__(self, name, f0, f1, update):
        self.name, self.f0, self.f1, self.update = name, f0, f1, update
        self.meta = None


def rarity_rgb(r):
    return np.array(C.col(C.RARITY_COLOR[r])[:3])


WHITE = np.array([1.0, 0.97, 0.9])


def mix(a, b, t):
    return np.asarray(a) * (1 - t) + np.asarray(b) * t


def rgba(c):
    return (float(c[0]), float(c[1]), float(c[2]), 1.0)


def ground_height(x, y):
    dg = bpy.context.evaluated_depsgraph_get()
    hit, loc, *_ = bpy.context.scene.ray_cast(dg, (x, y, 500.0), (0, 0, -1))
    return loc.z if hit else E.CLIFF_TOP


def build_wisher(loc, scale=1.0):
    """Hooded cloak silhouette (lathe) with a raised arm; dark cloth with a thin rim of moonlight."""
    prof = [(0.0, 1.72), (0.11, 1.70), (0.16, 1.60), (0.15, 1.48), (0.22, 1.40), (0.30, 1.20),
            (0.34, 0.80), (0.40, 0.30), (0.46, 0.02), (0.0, 0.02)]
    v, f = D._lathe(prof, 48)
    ob = C.new_mesh_obj("Wisher", v, f)
    for p in ob.data.polygons:
        p.use_smooth = True
    m, nt, out = C.node_tree_material("Cloak")
    pb = nt.nodes.new("ShaderNodeBsdfPrincipled")
    pb.inputs["Base Color"].default_value = (*C.srgb_to_linear((0.05, 0.05, 0.08)), 1)
    pb.inputs["Roughness"].default_value = 0.7
    pb.inputs["Sheen Weight"].default_value = 0.6
    nt.links.new(pb.outputs[0], out.inputs["Surface"])
    ob.data.materials.append(m)
    ob.location = loc
    ob.scale = (scale, scale * 0.8, scale)
    return ob


def build_headland(f0, f1, cache_dir, rc, wisher_xy=(3.4, 0.6), extra_keep=()):
    """Night headland shared by shots 1 and 4: sea, mountains, rocky cliff, grass, boulders, drum, wisher."""
    E.build_world()
    E.build_moon()
    fill = bpy.data.lights.new("NightFill", "SUN")
    fill.energy = 1.4
    fill.angle = math.radians(40)
    fill.color = (0.45, 0.6, 1.0)
    fob = bpy.data.objects.new("NightFill", fill)
    fob.rotation_euler = (math.radians(25), 0, math.radians(200))
    fob.visible_glossy = False
    bpy.context.scene.collection.objects.link(fob)
    sea, _ = E.build_sea(ocean_frames=(f0, f1, 20.0, 20.0 + (f1 - f0) / FPS), repeat=10, res=10, center=(0, 380))
    E.build_mountains()
    E.build_cliff(edge=13.0, patch=0.5)
    E.build_fog(density=0.0, mist=0.006, mist_box=(1400, 1200, 22), mist_center=(0, 420))
    bpy.data.objects.remove(bpy.data.objects["Atmosphere"])
    for mn in ("Water", "WaterFar"):
        E.add_distance_fog(bpy.data.materials[mn], 650.0)
    E.add_distance_fog(bpy.data.materials["FarRock"], 2600.0)
    top = ground_height(0, 0)
    drum_scale = 2.4
    drum, bronze = D.build_drum(location=(0, 0, top + 0.05), cache_dir=cache_dir, scale=drum_scale,
                                glow_color=rgba(rc))
    drum_top = Vector((0, 0, top + D.H * drum_scale))
    wx, wy = wisher_xy
    wisher = build_wisher((wx, wy, ground_height(wx, wy)), scale=1.0)
    keep = ((0, 0, 4.2), (wx, wy, 1.2)) + tuple(extra_keep)
    E.scatter_rocks(n=70, radius=34.0, keep_out=keep, ground=ground_height)
    return sea, top, drum_top, bronze, wisher


# ------------------------------------------------------------------ shot 4: aerial impact on the drum

W_XY = {"a": (3.4, 0.6), "b": (-3.4, 0.6)}
CAM4 = {   # camera start/end and target start/end, z relative to the plateau
    "a": (Vector((-3.0, -8.2, 8.0)), Vector((-2.3, -6.4, 6.6)), Vector((0.9, 14, 2.5)), Vector((0.7, 14, 1.5))),
    "b": (Vector((7.4, -6.6, 6.6)), Vector((5.8, -5.1, 5.6)), Vector((-3.4, 14, 2.2)), Vector((-3.0, 14, 1.3))),
}
METEOR4 = {"a": Vector((95, 120, 150)), "b": Vector((-120, 150, 165))}


def multi_rarities(top_rarity, n=9):
    """Rarities of the extra meteors in a 10-wish (the main meteor carries top_rarity)."""
    extra = [4] + [3] * (n - 1) if top_rarity == 4 else [4, 4] + [3] * (n - 2)
    return extra


def shot4(variant, cache_dir):
    rarity = variant["rarity"]
    style = variant.get("style", "a")
    multi = variant.get("multi", False)
    f0, f1 = 1, 60
    fi = 31                                  # impact frame
    rc = rarity_rgb(rarity)
    scene = bpy.context.scene
    sea, top, drum_top, bronze, wisher = build_headland(
        f0, f1, cache_dir, rc, wisher_xy=W_XY[style], extra_keep=((CAM4[style][0].x, CAM4[style][0].y, 2.5),))
    C.setup_compositor(scene, glare=0.45, dispersion=0.01, vignette=0.4)

    # camera: high, behind the headland, slow push in; shake on impact
    cam = C.add_camera(lens=20)
    cam.data.dof.use_dof = False
    up = Vector((0, 0, top))
    P0, P1, T0, T1 = (v + up for v in CAM4[style])
    rng = np.random.default_rng(5)
    shake_seq = rng.normal(0, 1, (f1 + 2, 3))
    for f in range(f0, f1 + 1):
        t = (f - f0) / (f1 - f0)
        e = C.ease_in_out(t)
        p = P0.lerp(P1, e)
        tgt = T0.lerp(T1, e)
        hh = C.handheld(f / FPS * 2.0, amp=1.0, seed=1.3)
        if f >= fi:
            k = math.exp(-(f - fi) / 5.0)
            p += Vector(shake_seq[f]) * 0.35 * k
        cam.location = p
        r = C.look_at_euler(p, tgt)
        cam.rotation_euler = (r.x + hh[0], r.y + hh[2], r.z + hh[1])
        cam.keyframe_insert("location", frame=f)
        cam.keyframe_insert("rotation_euler", frame=f)
    C.set_linear(cam)

    # meteor head
    S = METEOR4[style] + up
    ti = (fi - f0) / FPS

    def head(tt):
        u = C.clamp(tt / ti)
        return S.lerp(drum_top, u ** 1.25)

    core, core_m = F.glow_sphere("MeteorCore", 1.1, rgba(mix(WHITE, rc, 0.15)), 60.0, shell=False)
    halo, halo_m = F.glow_sphere("MeteorHalo", 5.0, rgba(rc), 25.0, shell=True)
    mlight = F.point_light("MeteorLight", rgba(rc), 0.0, radius=2.0)
    for f in range(f0, f1 + 1):
        tt = (f - f0) / FPS
        p = head(tt)
        alive = f < fi
        for ob in (core, halo, mlight):
            ob.location = p
            ob.keyframe_insert("location", frame=f)
        s = 1.0 if alive else 0.0
        for ob in (core, halo):
            ob.scale = (s, s, s)
            ob.keyframe_insert("scale", frame=f)
        F.key_light(mlight, 1.2e4 if alive else 0.0, f)
    for ob in (core, halo, mlight):
        C.set_linear(ob)
    tail = F.Tail("MeteorTail", strength=14.0)
    sparks = F.Sparks("Sparks", strength=30.0, seed=11)
    dust = F.Sparks("Dust", strength=18.0, seed=12)

    # impact effects
    impact_light = F.point_light("ImpactLight", rgba(rc), 0.0, radius=3.0)
    impact_light.location = drum_top + Vector((0, 0, 3))
    ringA, ringA_m = F.ring_mesh("RingCliff", strength=30.0)
    ringA.location = (0, 0, top + 0.4)
    ringB, ringB_m = F.ring_mesh("RingSea", strength=22.0, inner=0.9, mid=0.96)
    ringB.location = (0, 0, 0.8)
    for m in (ringA_m, ringB_m):
        m.node_tree.nodes["Em"].inputs["Color"].default_value = rgba(mix(rc, WHITE, 0.25))
    dome, dome_m = F.glow_sphere("Dome", 1.0, rgba(mix(rc, WHITE, 0.3)), 0.0, shell=True)
    dome.location = drum_top
    pil, pil_m = F.pillar("Pillar", height=700, radius=1.3, color=rgba(mix(rc, WHITE, 0.2)), strength=0.0)
    pil.location = (0, 0, top)
    beams = []
    for i in range(rarity):
        a = i * 2 * math.pi / rarity + 0.4
        b, bm = F.pillar(f"Beam{i}", height=420, radius=0.42, color=rgba(rc), strength=0.0)
        b.location = (2.9 * math.cos(a), 2.9 * math.sin(a), top)
        beams.append((b, bm, i))
    shock = F.sea_shockwave_gn(sea)
    vs = scene.view_settings
    for f in range(f0, f1 + 1):
        dt = (f - fi) / FPS
        on = f >= fi
        ra = 2 + 16 * C.ease_out(dt / 0.8) if on else 0.01
        ringA.scale = (ra, ra, 1)
        ringA.keyframe_insert("scale", frame=f)
        F.set_mat_strength(ringA_m, 10.0 * (1 - C.clamp(dt / 0.9)) ** 1.5 if on else 0.0, f)
        rb = 12 + 520 * C.ease_out(dt / 1.4) if on else 0.01
        ringB.scale = (rb, rb, 1)
        ringB.keyframe_insert("scale", frame=f)
        F.set_mat_strength(ringB_m, 14.0 * (1 - C.clamp(dt / 1.3)) ** 1.2 if on else 0.0, f)
        F.key_mod_input(shock, "Radius", rb, f)
        F.key_mod_input(shock, "Amp", 2.6 * (1 - C.clamp(dt / 1.2)) if on else 0.0, f)
        dr = 1 + 18 * C.ease_out(dt / 0.3) if on else 0.01
        dome.scale = (dr, dr, dr * 0.75)
        dome.keyframe_insert("scale", frame=f)
        F.set_mat_strength(dome_m, 0.6 * (1 - C.clamp(dt / 0.28)) ** 2 if on else 0.0, f)
        grow = C.ease_out(dt / 0.3) if on else 0.0
        w = 1 + 0.8 * math.exp(-dt * 6) if on else 1
        pil.scale = (w, w, max(grow, 0.001))
        pil.keyframe_insert("scale", frame=f)
        flick = 1 + 0.08 * math.sin(f * 1.7) + 0.05 * math.sin(f * 4.3)
        F.set_mat_strength(pil_m, (3.0 * math.exp(-dt * 6) + 1.3) * flick * grow if on else 0.0, f)
        for b, bm, i in beams:
            bd = dt - 0.12 - i * 0.06
            g = C.ease_out(bd / 0.35) if bd > 0 else 0.0
            b.scale = (1, 1, max(g, 0.001))
            b.keyframe_insert("scale", frame=f)
            F.set_mat_strength(bm, (7.0 * math.exp(-max(bd, 0) * 3) + 3.5) * g * flick, f)
        F.key_light(impact_light, (5.0e3 * math.exp(-dt * 9) + 1.6e3) if on else 0.0, f)
        gl = bronze.node_tree.nodes["DrumGlow"].outputs[0]
        gl.default_value = (40 * math.exp(-dt * 6) + 8) if on else 0.0
        gl.keyframe_insert("default_value", frame=f)
        vs.exposure = (0.08 * math.exp(-dt * 12)) if on else 0.0
        vs.keyframe_insert("exposure", frame=f)
    for idb in (ringA, ringB, dome, pil, impact_light.data, scene, sea) + tuple(b for b, _, _ in beams):
        C.set_linear(idb)

    extras = []
    if multi:
        rng4 = np.random.default_rng(41 if style == "a" else 42)
        for k, r in enumerate(multi_rarities(rarity)):
            land = Vector((rng4.uniform(-70, 70), rng4.uniform(45, 170), 0.6))
            fa = int(fi - 14 + k * 3 + rng4.integers(0, 3))
            start = land + Vector((rng4.uniform(-60, 60) + S.x * 0.4, rng4.uniform(40, 90), rng4.uniform(150, 210)))
            c = rarity_rgb(r)
            core_k, _ = F.glow_sphere(f"XCore{k}", 0.55, rgba(mix(WHITE, c, 0.2)), 40.0, shell=False)
            halo_k, _ = F.glow_sphere(f"XHalo{k}", 2.4, rgba(c), 18.0, shell=True)
            ring_k, ring_km = F.ring_mesh(f"XRing{k}", strength=14.0, inner=0.86, mid=0.95)
            ring_km.node_tree.nodes["Em"].inputs["Color"].default_value = rgba(mix(c, WHITE, 0.2))
            ring_k.location = land
            ta = (fa - f0) / FPS
            for f in range(f0, f1 + 1):
                tt = (f - f0) / FPS
                u = C.clamp(tt / ta)
                pos = start.lerp(land, u ** 1.3)
                alive = f < fa
                for ob in (core_k, halo_k):
                    ob.location = pos
                    ob.keyframe_insert("location", frame=f)
                    sc = 1.0 if alive else 0.0
                    ob.scale = (sc, sc, sc)
                    ob.keyframe_insert("scale", frame=f)
                dtk = (f - fa) / FPS
                rr = 1 + 60 * C.ease_out(dtk / 1.0) if f >= fa else 0.01
                ring_k.scale = (rr, rr, 1)
                ring_k.keyframe_insert("scale", frame=f)
                F.set_mat_strength(ring_km, 10.0 * (1 - C.clamp(dtk / 1.0)) ** 1.4 if f >= fa else 0.0, f)
            for idb in (core_k, halo_k, ring_k):
                C.set_linear(idb)
            extras.append(dict(start=start, land=land, fa=fa, ta=ta, c=c, tail=F.Tail(f"XTail{k}", strength=10.0)))

    def xhead(x, tt):
        return x["start"].lerp(x["land"], C.clamp(tt / x["ta"]) ** 1.3)

    dtf = 1 / FPS

    def update(f):
        tt = (f - f0) / FPS
        if f < fi:
            path = [head(max(0.0, tt - k * 0.02)) for k in range(30)]
            tail.write(path, 3.0, mix(WHITE, rc, 0.3), rc, glow=1.0, wobble_t=tt)
            p = head(tt)
            v = (head(tt + 0.01) - p) / 0.01
            for j in range(6):
                q = head(max(0.0, tt - j * dtf / 6))
                sparks.emit(10, q, tuple(-v * 0.12), (4, 18), (0.15, 0.4), (0.08, 0.25),
                            tuple(rc), bright=1.0, color2=tuple(WHITE))
        else:
            tail.write([], 0, rc, rc)
        if f == fi:
            sparks.emit(800, drum_top, (0, 0, 10), (5, 24), (0.5, 1.5), (0.03, 0.08), tuple(rc),
                        bright=0.45, color2=tuple(WHITE), jitter=0.6)
        if f >= fi:
            dust.emit(26, drum_top, (0, 0, 5), (0.5, 3), (1.0, 2.2), (0.03, 0.08), tuple(rc),
                      bright=1.0, color2=tuple(WHITE), jitter=4.0)
        for x in extras:
            if f < x["fa"]:
                x["tail"].write([xhead(x, max(0.0, tt - k * 0.02)) for k in range(24)], 1.4,
                                mix(WHITE, x["c"], 0.3), x["c"], glow=1.0, wobble_t=tt)
            else:
                x["tail"].write([], 0, x["c"], x["c"])
            if f == x["fa"]:
                sparks.emit(220, x["land"], (0, 0, 9), (3, 12), (0.5, 1.3), (0.05, 0.14), tuple(x["c"]),
                            bright=0.5, color2=tuple(WHITE))
        sparks.step(dtf, drag=0.9, gravity=(0, 0, -14))
        dust.step(dtf, drag=0.3, gravity=(0, 0, 1.5))
        sparks.write(stretch=0.02)
        dust.write(stretch=0.05)

    return Shot("s4", f0, f1, update)


# ------------------------------------------------------------------ shot 3: deep space meteor

def time_warp(n_frames, rarity, flare_k=0.55, slow=0.28, recover_k=0.8):
    """Story time per frame (seconds); 5-star gets slow motion from flare_k to recover_k."""
    taus = [0.0]
    for i in range(1, n_frames):
        k = i / (n_frames - 1)
        s = 1.0
        if rarity == 5 and k >= flare_k:
            s = slow + (1 - slow) * C.smooth((k - flare_k - 0.06) / (recover_k - flare_k - 0.06)) if k > flare_k + 0.06 else slow
        taus.append(taus[-1] + s / FPS)
    return taus


def shot3(variant, cache_dir):
    rarity = variant["rarity"]
    style = variant.get("style", "a")
    multi = variant.get("multi", False)
    f0, f1 = 1, 75
    n = f1 - f0 + 1
    taus = time_warp(n, rarity)
    tau_end = taus[-1]
    flare_f = f0 + int(round(0.55 * (n - 1))) if rarity == 5 else None
    scene = bpy.context.scene
    E.build_world(star_scale=1.6, nebula=0.9, moon_dir=Vector((0, 1, 0)), strength=1.0, halo_gain=0.0)
    C.setup_compositor(scene, glare=0.8, dispersion=0.018, vignette=0.45, streaks=True)
    rc = rarity_rgb(rarity)
    c_start = rarity_rgb(4) if rarity == 5 else rc

    def color_at(f):
        if rarity != 5 or f < flare_f:
            return c_start
        return mix(c_start, rc, C.clamp((f - flare_f) / 3.0))

    # camera flies +Y, accelerating
    def cam_y(tau):
        return 60 * tau + 140 * tau * tau
    cam = C.add_camera(lens=30)
    for i, f in enumerate(range(f0, f1 + 1)):
        tau = taus[i]
        hh = C.handheld(tau * 3, amp=1.6, seed=0.4)
        cam.location = (0, cam_y(tau), 0)
        cam.rotation_euler = (math.pi / 2 + hh[0], hh[2] + 0.06 * tau, hh[1] - 0.05 * tau)
        cam.keyframe_insert("location", frame=f)
        cam.keyframe_insert("rotation_euler", frame=f)
    C.set_linear(cam)

    # star field: tiny emissive diamonds along the corridor
    rng = np.random.default_rng(3)
    ns = 9000
    span = cam_y(tau_end) + 900
    pos = np.column_stack([rng.uniform(-260, 260, ns), rng.uniform(-50, span, ns), rng.uniform(-150, 150, ns)])
    keep = np.hypot(pos[:, 0], pos[:, 2]) > 6
    pos = pos[keep]
    stars = F.Sparks("StarField", strength=10.0, cap=ns, seed=4)
    stars.pos = pos
    stars.vel = np.tile([0, 1e-3, 0], (len(pos), 1))
    stars.age = np.zeros(len(pos))
    stars.life = np.full(len(pos), 1e9)
    tint = rng.uniform(0, 1, (len(pos), 1))
    stars.col = mix(np.array([[0.75, 0.82, 1.0]]), np.array([[1.0, 0.9, 0.75]]), tint)
    stars.size = rng.uniform(0.05, 0.22, len(pos))
    stars.bright = rng.uniform(0.3, 1.0, len(pos)) ** 2
    stars.write(stretch=0.0)
    stars.ob.cycles.use_motion_blur = True

    # meteor relative to the camera: from deep ahead (upper right) to just past the lens (lower left)
    A, B = (Vector((160, 520, 85)), Vector((-30, 30, -14))) if style == "a" else \
        (Vector((-175, 520, -55)), Vector((34, 30, 12)))

    def rel(tau):
        u = C.clamp(tau / tau_end)
        e = u ** 2.0
        r = A.lerp(B, e)
        if style == "a":
            r.x += math.sin(e * 3.0) * 14
        else:
            r.z += math.sin(e * 2.6) * 12
        return r

    def head(tau, cam_tau=None):
        return Vector((0, cam_y(tau if cam_tau is None else cam_tau), 0)) + rel(tau)

    core, core_m = F.glow_sphere("MeteorCore", 0.9, rgba(WHITE), 70.0, shell=False)
    halo, halo_m = F.glow_sphere("MeteorHalo", 4.5, rgba(c_start), 22.0, shell=True)
    for i, f in enumerate(range(f0, f1 + 1)):
        p = head(taus[i])
        for ob in (core, halo):
            ob.location = p
            ob.keyframe_insert("location", frame=f)
        F.set_mat_color(halo_m, rgba(color_at(f)), f)
        boost = 1.0
        if flare_f and f >= flare_f:
            boost = 1 + 1.5 * math.exp(-(f - flare_f) / 8)
        F.set_mat_strength(halo_m, 22.0 * boost, f)
    for ob in (core, halo):
        C.set_linear(ob)
    tail = F.Tail("MeteorTail", strength=30.0)
    extras = []
    if multi:
        rng3 = np.random.default_rng(13)
        for k, r in enumerate(multi_rarities(rarity)):
            off_a = Vector((rng3.uniform(-160, 160), rng3.uniform(-60, 120), rng3.uniform(-90, 90)))
            ang = rng3.uniform(0, 2 * math.pi)
            off_b = Vector((math.cos(ang) * rng3.uniform(28, 55), rng3.uniform(0, 60), math.sin(ang) * rng3.uniform(18, 34)))
            c = rarity_rgb(r)
            h, _ = F.glow_sphere(f"XHalo{k}", 2.2, rgba(c), 18.0, shell=True)
            extras.append(dict(A=A + off_a, B=B + off_b, c=c, lag=rng3.uniform(0.0, 0.12), halo=h,
                               tail=F.Tail(f"XTail{k}", strength=16.0)))

    def xhead(x, tau, cam_tau=None):
        u = C.clamp((tau - x["lag"]) / (tau_end - x["lag"]))
        return Vector((0, cam_y(tau if cam_tau is None else cam_tau), 0)) + x["A"].lerp(x["B"], u ** 2.0)

    for x in extras:
        for i, f in enumerate(range(f0, f1 + 1)):
            x["halo"].location = xhead(x, taus[i])
            x["halo"].keyframe_insert("location", frame=f)
        C.set_linear(x["halo"])
    sparks = F.Sparks("Sparks", strength=30.0, seed=21)
    vs = scene.view_settings
    ring = ring_m = None
    if flare_f:
        ring, ring_m = F.ring_mesh("FlareRing", strength=40.0, inner=0.95, mid=0.985)
        ring.rotation_euler = (math.pi / 2, 0, 0)
        ring_m.node_tree.nodes["Em"].inputs["Color"].default_value = rgba(mix(rc, WHITE, 0.2))
        ring2, ring2_m = F.ring_mesh("FlareRing2", strength=30.0, inner=0.75, mid=0.97)
        ring2.rotation_euler = (math.pi / 2, 0, 0.3)
        ring2_m.node_tree.nodes["Em"].inputs["Color"].default_value = rgba(rc)
        for i, f in enumerate(range(f0, f1 + 1)):
            on = f >= flare_f
            st = taus[i] - taus[flare_f - f0] if on else 0
            for rob, rm, spd, s0 in ((ring, ring_m, 110.0, 30.0), (ring2, ring2_m, 55.0, 14.0)):
                p = head(taus[flare_f - f0]) if on else Vector((0, -1000, 0))
                rob.location = p
                rob.keyframe_insert("location", frame=f)
                r = 0.5 + spd * C.ease_out(st / 0.5) if on else 0.01
                rob.scale = (r, r, 1)
                rob.keyframe_insert("scale", frame=f)
                F.set_mat_strength(rm, s0 * (1 - C.clamp(st / 0.45)) ** 1.5 if on else 0.0, f)
            vs.exposure = 1.6 * math.exp(-(f - flare_f) / 6) if on else 0.0
            vs.keyframe_insert("exposure", frame=f)
        for idb in (ring, ring2, scene):
            C.set_linear(idb)

    def update(f):
        i = f - f0
        tau = taus[i]
        dt = taus[i] - taus[i - 1] if i > 0 else 1 / FPS
        c = color_at(f)
        path = [head(max(0.0, tau - k * 0.02), tau) for k in range(90)]
        tail.write(path, 4.0, mix(WHITE, c, 0.35), c, glow=1.0, wobble_t=tau)
        for x in extras:
            x["tail"].write([xhead(x, max(0.0, tau - k * 0.02), tau) for k in range(60)], 1.8,
                            mix(WHITE, x["c"], 0.3), x["c"], glow=1.0, wobble_t=tau)
        p = head(tau)
        v = (head(tau + 0.01) - p) / 0.01
        for j in range(8):
            q = head(max(0.0, tau - j * dt / 8))
            sparks.emit(max(1, int(10 * dt * FPS)), q, tuple(-v * 0.05), (2, 14), (0.3, 0.9), (0.06, 0.2),
                        tuple(c), color2=tuple(WHITE))
        if flare_f and f == flare_f:
            sparks.emit(2600, p, tuple(-v * 0.02), (15, 110), (0.6, 1.5), (0.08, 0.3), tuple(rc),
                        bright=1.5, color2=tuple(WHITE))
        sparks.step(dt, drag=1.6)
        sparks.write(stretch=0.03)

    return Shot("s3", f0, f1, update)


SHOTS = {"s3": shot3, "s4": shot4}


# ------------------------------------------------------------------ shot 1: the wisher releases a sky lantern

def build_arm(wisher, side=1.0):
    """Right arm (cloaked capsule) pivoting at the shoulder; rotation_euler.x = 0 hangs, ~2.6 points up-forward."""
    gz = wisher.location.z
    shoulder = Vector((wisher.location.x + 0.21 * side, wisher.location.y + 0.02, gz + 1.42))
    prof = [(0.0, 0.0), (0.05, 0.02), (0.06, 0.12), (0.055, 0.55), (0.045, 0.62), (0.0, 0.64)]
    v, f = D._lathe(prof, 16)
    v = [(x, y, -z) for x, y, z in v]
    arm = C.new_mesh_obj("WisherArm", v, f)
    for p in arm.data.polygons:
        p.use_smooth = True
    arm.data.materials.append(bpy.data.materials["Cloak"])
    arm.location = shoulder
    return arm, shoulder


def build_lantern(name="Lantern"):
    prof = [(0.0, 0.0), (0.15, 0.0), (0.2, 0.12), (0.25, 0.36), (0.26, 0.46), (0.22, 0.52), (0.0, 0.53)]
    v, f = D._lathe(prof, 32)
    ob = C.new_mesh_obj(name, v, f)
    for p in ob.data.polygons:
        p.use_smooth = True
    m, nt, out = C.node_tree_material(name + "Paper")
    L = nt.links
    tc = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    L.new(tc.outputs["Object"], sep.inputs[0])
    grad = nt.nodes.new("ShaderNodeMapRange")
    grad.inputs["From Min"].default_value = 0.0
    grad.inputs["From Max"].default_value = 0.53
    grad.inputs["To Min"].default_value = 1.0
    grad.inputs["To Max"].default_value = 0.35
    L.new(sep.outputs["Z"], grad.inputs["Value"])
    mul = nt.nodes.new("ShaderNodeMath")
    mul.operation = "MULTIPLY"
    mul.inputs[1].default_value = 9.0
    mul.name = "Str"
    L.new(grad.outputs["Result"], mul.inputs[0])
    em = nt.nodes.new("ShaderNodeEmission")
    em.name = "Em"
    em.inputs["Color"].default_value = (*C.srgb_to_linear((1.0, 0.62, 0.3)), 1)
    L.new(mul.outputs[0], em.inputs["Strength"])
    tr = nt.nodes.new("ShaderNodeBsdfTranslucent")
    tr.inputs["Color"].default_value = (*C.srgb_to_linear((1.0, 0.7, 0.4)), 1)
    add = nt.nodes.new("ShaderNodeAddShader")
    L.new(em.outputs[0], add.inputs[0])
    L.new(tr.outputs[0], add.inputs[1])
    L.new(add.outputs[0], out.inputs["Surface"])
    ob.data.materials.append(m)
    ob.visible_shadow = False
    light = F.point_light(name + "Light", (1.0, 0.6, 0.3, 1), 30.0, radius=0.12)
    return ob, m, light


def lantern_flicker(f):
    return 1 + 0.07 * math.sin(f * 1.3) + 0.05 * math.sin(f * 3.7 + 1.1)


def shot1(variant, cache_dir):
    f0, f1 = 1, 75
    fr = 34                                   # release frame
    scene = bpy.context.scene
    wx, wy = W_XY["a"]
    cam_xy = (7.6, -9.8)
    sea, top, drum_top, bronze, wisher = build_headland(
        f0, f1, cache_dir, rarity_rgb(5), wisher_xy=(wx, wy), extra_keep=((cam_xy[0], cam_xy[1], 2.0),))
    C.setup_compositor(scene, glare=0.5, dispersion=0.01, vignette=0.42)
    arm, shoulder = build_arm(wisher)
    lan, lan_m, lan_l = build_lantern()
    gz = wisher.location.z

    def arm_angle(f):
        return 2.55 * C.ease_in_out((f - 6) / 24.0)

    def hand(f):
        a = arm_angle(f)
        return shoulder + Vector((0, math.sin(a), -math.cos(a))) * 0.62

    def lantern_pos(f):
        if f <= fr:
            return hand(f) + Vector((0, 0.04, 0.02))
        t = (f - fr) / FPS
        return hand(fr) + Vector((0.35 * t, 0.9 * t, 0.02 + 1.3 * t + 2.6 * t * t))

    for f in range(f0, f1 + 1):
        arm.rotation_euler = (arm_angle(f), 0, 0)
        arm.keyframe_insert("rotation_euler", frame=f)
        p = lantern_pos(f)
        lan.location = p
        lan.rotation_euler = (0.04 * math.sin(f * 0.21), 0.05 * math.sin(f * 0.17 + 1), f * 0.01)
        lan.keyframe_insert("location", frame=f)
        lan.keyframe_insert("rotation_euler", frame=f)
        lan_l.location = p + Vector((0, 0, 0.2))
        lan_l.keyframe_insert("location", frame=f)
        F.key_light(lan_l, 30.0 * lantern_flicker(f), f)
    for ob in (arm, lan, lan_l):
        C.set_linear(ob)

    cam = C.add_camera(lens=30)
    cam.data.dof.use_dof = True
    cam.data.dof.aperture_fstop = 2.2
    P0 = Vector((cam_xy[0], cam_xy[1], top + 1.55))
    P1 = Vector((6.4, -7.2, top + 1.8))
    chest = Vector((wx, wy, gz + 1.25))
    for f in range(f0, f1 + 1):
        t = (f - f0) / (f1 - f0)
        p = P0.lerp(P1, C.ease_in_out(t))
        follow = C.smooth((f - 26) / 46.0) * 0.62
        tgt = (chest + Vector((0, 6, 0))).lerp(lantern_pos(f) + Vector((0, 0, 0.3)), follow)
        hh = C.handheld(f / FPS * 1.6, amp=1.2, seed=2.1)
        cam.location = p
        r = C.look_at_euler(p, tgt)
        cam.rotation_euler = (r.x + hh[0], r.y + hh[2], r.z + hh[1])
        cam.keyframe_insert("location", frame=f)
        cam.keyframe_insert("rotation_euler", frame=f)
        cam.data.dof.focus_distance = (lantern_pos(f) - p).length if f > fr else (chest - p).length
        cam.data.dof.keyframe_insert("focus_distance", frame=f)
    C.set_linear(cam)
    return Shot("s1", f0, f1, lambda f: None)


# ------------------------------------------------------------------ shot 2: through the clouds, the lantern bursts

def build_clouds(z0=46.0, z1=64.0, size=700.0, density=1.6, seed=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 60, (z0 + z1) / 2))
    ob = bpy.context.active_object
    ob.name = "Clouds"
    ob.scale = (size, size, z1 - z0)
    m, nt, out = C.node_tree_material("CloudMat")
    L = nt.links
    tc = nt.nodes.new("ShaderNodeTexCoord")
    nz = nt.nodes.new("ShaderNodeTexNoise")
    nz.inputs["Scale"].default_value = 0.045
    nz.inputs["Detail"].default_value = 6
    nz.inputs["Roughness"].default_value = 0.6
    nz.noise_dimensions = "4D"
    nz.inputs["W"].default_value = seed
    L.new(tc.outputs["Object"], nz.inputs["Vector"])
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    L.new(tc.outputs["Generated"], sep.inputs[0])
    # soft top/bottom: 4z(1-z)
    om = nt.nodes.new("ShaderNodeMath")
    om.operation = "SUBTRACT"
    om.inputs[0].default_value = 1.0
    L.new(sep.outputs["Z"], om.inputs[1])
    prof = nt.nodes.new("ShaderNodeMath")
    prof.operation = "MULTIPLY"
    L.new(sep.outputs["Z"], prof.inputs[0])
    L.new(om.outputs[0], prof.inputs[1])
    pr4 = nt.nodes.new("ShaderNodeMath")
    pr4.operation = "MULTIPLY"
    pr4.inputs[1].default_value = 4.0
    L.new(prof.outputs[0], pr4.inputs[0])
    sub = nt.nodes.new("ShaderNodeMath")
    sub.operation = "SUBTRACT"
    L.new(nz.outputs["Fac"], sub.inputs[0])
    sub.inputs[1].default_value = 0.0
    shp = nt.nodes.new("ShaderNodeMath")
    shp.operation = "MULTIPLY"
    L.new(nz.outputs["Fac"], shp.inputs[0])
    L.new(pr4.outputs[0], shp.inputs[1])
    mr = nt.nodes.new("ShaderNodeMapRange")
    mr.inputs["From Min"].default_value = 0.47
    mr.inputs["From Max"].default_value = 0.62
    mr.inputs["To Max"].default_value = density
    L.new(shp.outputs[0], mr.inputs["Value"])
    v = nt.nodes.new("ShaderNodeVolumePrincipled")
    v.inputs["Color"].default_value = (*C.srgb_to_linear((0.8, 0.84, 0.95)), 1)
    v.inputs["Anisotropy"].default_value = 0.4
    L.new(mr.outputs["Result"], v.inputs["Density"])
    L.new(v.outputs[0], out.inputs["Volume"])
    ob.data.materials.append(m)
    return ob


def shot2(variant, cache_dir):
    from bpy_extras.object_utils import world_to_camera_view
    f0, f1 = 1, 60
    fb = 41                                   # lantern bursts into star dust
    scene = bpy.context.scene
    E.build_world(star_scale=1.2, strength=1.4)
    E.build_moon(light=0.9)
    build_clouds()
    C.setup_compositor(scene, glare=0.4, dispersion=0.014, vignette=0.42, bloom_size=0.3)
    lan, lan_m, lan_l = build_lantern()
    lan.scale = (1.6, 1.6, 1.6)
    rng = np.random.default_rng(23)
    ns = 4000
    d = rng.normal(0, 1, (ns, 3))
    d[:, 2] = np.abs(d[:, 2]) + 0.15
    d /= np.linalg.norm(d, axis=1)[:, None]
    stars = F.Sparks("SkyStars", strength=10.0, cap=ns, seed=4)
    stars.pos = d * 520 + np.array([0, 0, 60])
    stars.vel = np.tile([0, 1e-3, 0], (ns, 1))
    stars.age = np.zeros(ns)
    stars.life = np.full(ns, 1e9)
    stars.col = mix(np.array([[0.75, 0.82, 1.0]]), np.array([[1.0, 0.9, 0.75]]), rng.uniform(0, 1, (ns, 1)))
    stars.size = rng.uniform(0.12, 0.5, ns)
    stars.bright = rng.uniform(0.2, 1.0, ns) ** 2
    stars.write(stretch=0.0)

    def lpos(t):
        return Vector((0.4 * t, 2.2 * t, 40 + 16 * t + 7 * t * t))

    tb = (fb - f0) / FPS
    burst = lpos(tb)
    for f in range(f0, f1 + 1):
        t = (f - f0) / FPS
        p = lpos(min(t, tb))
        lan.location = p
        lan.rotation_euler = (0.05 * math.sin(f * 0.2), 0.05 * math.sin(f * 0.15 + 1), f * 0.012)
        sc = 1.6 * (1 + 0.6 * C.clamp((f - fb + 4) / 4.0)) if f < fb else 0.0
        lan.scale = (sc, sc, sc)
        lan.keyframe_insert("location", frame=f)
        lan.keyframe_insert("rotation_euler", frame=f)
        lan.keyframe_insert("scale", frame=f)
        F.set_mat_strength(lan_m, 2.5 * (1 + 2 * C.clamp((f - fb + 5) / 5.0)) if f < fb else 0.0, f)
        lan_l.location = p + Vector((0, 0, 0.3))
        lan_l.keyframe_insert("location", frame=f)
        dt = (f - fb) / FPS
        e = 900.0 * lantern_flicker(f) if f < fb else 3000.0 * math.exp(-dt * 6)
        F.key_light(lan_l, e, f)
    for ob in (lan, lan_l):
        C.set_linear(ob)

    cam = C.add_camera(lens=28)
    cam.data.dof.use_dof = True
    cam.data.dof.aperture_fstop = 4.0
    for f in range(f0, f1 + 1):
        t = (f - f0) / FPS
        tc = min(t, tb + (t - tb) * 0.35) if t > tb else t
        lp = lpos(tc)
        back = Vector((-2.0, -7.5, -6.0)).lerp(Vector((-1.0, -12.0, -9.0)), C.smooth(t / 2.0))
        p = lp + back
        tgt = lpos(min(t, tb)).lerp(burst + Vector((0, 4, 9)), C.smooth((f - fb) / 18.0))
        hh = C.handheld(t * 2.2, amp=1.4, seed=3.3)
        cam.location = p
        r = C.look_at_euler(p, tgt)
        cam.rotation_euler = (r.x + hh[0], r.y + hh[2], r.z + hh[1])
        cam.keyframe_insert("location", frame=f)
        cam.keyframe_insert("rotation_euler", frame=f)
        cam.data.dof.focus_distance = (lpos(min(t, tb)) - p).length
        cam.data.dof.keyframe_insert("focus_distance", frame=f)
    C.set_linear(cam)

    dust = F.Sparks("StarDust", strength=24.0, cap=5000, seed=31)
    glint = F.Sparks("Glint", strength=30.0, cap=600, seed=32)
    gold = np.array([1.0, 0.86, 0.55])
    anchors = []
    shot = Shot("s2", f0, f1, None)
    shot.meta = {"burst_frame": fb, "anchor": anchors}

    def update(f):
        t = (f - f0) / FPS
        if f == fb:
            dust.emit(2200, burst, (0, 0, 1.0), (4.0, 12.0), (1.0, 2.6), (0.02, 0.06), tuple(gold),
                      bright=0.3, color2=tuple(mix(gold, WHITE, 0.5)))
            glint.emit(160, burst, (0, 0, 0.5), (0.5, 4.0), (1.2, 2.4), (0.06, 0.14), tuple(mix(gold, WHITE, 0.6)), bright=0.6)
        if f > fb:
            dust.emit(30, burst, (0, 0, 0.6), (0.3, 3.0), (0.6, 1.4), (0.015, 0.04), tuple(gold), bright=0.5,
                      jitter=1.5, color2=tuple(mix(gold, WHITE, 0.5)))
        dust.step(1 / FPS, drag=2.4, gravity=(0, 0, 0.6))
        glint.step(1 / FPS, drag=2.0)
        dust.write(stretch=0.03)
        glint.write(stretch=0.02)
        pt = burst if f >= fb else lan.matrix_world.translation
        v = world_to_camera_view(scene, scene.camera, pt)
        anchors.append([f, round(v.x, 4), round(1 - v.y, 4)])

    shot.update = update
    return shot


SHOTS.update({"s1": shot1, "s2": shot2})
