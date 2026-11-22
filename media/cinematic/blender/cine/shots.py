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


# ------------------------------------------------------------------ shot 4: aerial impact on the drum

def shot4(variant, cache_dir):
    rarity = variant["rarity"]
    f0, f1 = 1, 60
    fi = 31                                  # impact frame
    rc = rarity_rgb(rarity)
    scene = bpy.context.scene
    E.build_world()
    E.build_moon()
    sea, _ = E.build_sea(ocean_frames=(f0, f1, 20.0, 20.0 + (f1 - f0) / FPS), repeat=10, res=10, center=(0, 380))
    E.build_mountains()
    cliff = E.build_cliff()
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
    build_wisher((4.6, -2.6, ground_height(4.6, -2.6)), scale=1.0)
    C.setup_compositor(scene, glare=0.45, dispersion=0.01, vignette=0.4)

    # camera: high, behind the headland, slow push in; shake on impact
    cam = C.add_camera(lens=18)
    cam.data.dof.use_dof = False
    P0 = Vector((-9, -23, top + 13))
    P1 = Vector((-6.5, -16, top + 10))
    T0 = Vector((4, 40, top + 7))
    T1 = Vector((3, 40, top + 4.5))
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
    S = Vector((95, 120, top + 150))
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
    pil, pil_m = F.pillar("Pillar", height=700, radius=2.0, color=rgba(mix(rc, WHITE, 0.2)), strength=0.0)
    pil.location = (0, 0, top)
    beams = []
    for i in range(rarity):
        a = i * 2 * math.pi / rarity + 0.4
        b, bm = F.pillar(f"Beam{i}", height=420, radius=0.42, color=rgba(rc), strength=0.0)
        b.location = (2.6 * math.cos(a), 2.6 * math.sin(a), top)
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
        dr = 1 + 26 * C.ease_out(dt / 0.5) if on else 0.01
        dome.scale = (dr, dr, dr * 0.75)
        dome.keyframe_insert("scale", frame=f)
        F.set_mat_strength(dome_m, 1.2 * (1 - C.clamp(dt / 0.5)) ** 2 if on else 0.0, f)
        grow = C.ease_out(dt / 0.3) if on else 0.0
        w = 1 + 0.8 * math.exp(-dt * 6) if on else 1
        pil.scale = (w, w, max(grow, 0.001))
        pil.keyframe_insert("scale", frame=f)
        flick = 1 + 0.08 * math.sin(f * 1.7) + 0.05 * math.sin(f * 4.3)
        F.set_mat_strength(pil_m, (6.0 * math.exp(-dt * 4) + 2.0) * flick * grow if on else 0.0, f)
        for b, bm, i in beams:
            bd = dt - 0.12 - i * 0.06
            g = C.ease_out(bd / 0.35) if bd > 0 else 0.0
            b.scale = (1, 1, max(g, 0.001))
            b.keyframe_insert("scale", frame=f)
            F.set_mat_strength(bm, (12.0 * math.exp(-max(bd, 0) * 3) + 6.0) * g * flick, f)
        F.key_light(impact_light, (1.0e4 * math.exp(-dt * 5) + 4.0e3) if on else 0.0, f)
        gl = bronze.node_tree.nodes["DrumGlow"].outputs[0]
        gl.default_value = (50 * math.exp(-dt * 4) + 12) if on else 0.0
        gl.keyframe_insert("default_value", frame=f)
        vs.exposure = (0.15 * math.exp(-dt * 7)) if on else 0.0
        vs.keyframe_insert("exposure", frame=f)
    for idb in (ringA, ringB, dome, pil, impact_light.data, scene, sea) + tuple(b for b, _, _ in beams):
        C.set_linear(idb)

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
            sparks.emit(1800, drum_top, (0, 0, 12), (6, 28), (0.6, 1.7), (0.04, 0.12), tuple(rc),
                        bright=0.8, color2=tuple(WHITE), jitter=0.6)
        if f >= fi:
            dust.emit(26, drum_top, (0, 0, 5), (0.5, 3), (1.0, 2.2), (0.03, 0.08), tuple(rc),
                      bright=1.0, color2=tuple(WHITE), jitter=4.0)
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
    A = Vector((160, 520, 85))
    B = Vector((-30, 30, -14))

    def rel(tau):
        u = C.clamp(tau / tau_end)
        e = u ** 2.0
        r = A.lerp(B, e)
        r.x += math.sin(e * 3.0) * 14
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
