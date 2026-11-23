"""Bronze drum inspired by Dong Son drums: lathe body, tympanum relief (sun star, Lac bird ring, geometric bands)."""
import math
import os
import numpy as np
import bpy
from .common import srgb_to_linear, node_tree_material, new_mesh_obj, link_obj

R_TOP = 0.78     # tympanum radius (m)
H = 1.12         # drum height (m)


def _bird_mask(u, v, s):
    """Lac bird in flight; u along flight direction, v sideways. Union of ellipses/segments, returns 0..1."""
    def ell(cx, cy, rx, ry, ang=0.0):
        ca, sa = math.cos(ang), math.sin(ang)
        x = (u - cx * s) * ca + (v - cy * s) * sa
        y = -(u - cx * s) * sa + (v - cy * s) * ca
        return (x / (rx * s)) ** 2 + (y / (ry * s)) ** 2 < 1.0

    def seg(ax, ay, bx, by, w0, w1):
        ax, ay, bx, by = ax * s, ay * s, bx * s, by * s
        dx, dy = bx - ax, by - ay
        L2 = dx * dx + dy * dy
        t = np.clip(((u - ax) * dx + (v - ay) * dy) / L2, 0, 1)
        px, py = ax + t * dx, ay + t * dy
        w = (w0 + (w1 - w0) * t) * s
        return (u - px) ** 2 + (v - py) ** 2 < w * w

    m = ell(0.0, 0.0, 0.34, 0.10)                       # body
    m |= ell(0.40, 0.03, 0.08, 0.07)                     # head
    m |= seg(0.46, 0.03, 0.95, -0.02, 0.025, 0.004)      # long beak
    m |= seg(0.38, 0.08, 0.18, 0.26, 0.02, 0.006)        # crest plume
    m |= seg(0.36, 0.09, 0.30, 0.30, 0.016, 0.004)
    m |= seg(-0.05, 0.05, -0.30, 0.42, 0.09, 0.03)       # near wing swept back
    m |= seg(-0.05, -0.05, -0.30, -0.40, 0.09, 0.03)     # far wing
    m |= seg(-0.30, 0.0, -0.80, 0.10, 0.06, 0.02)        # long tail
    m |= seg(-0.30, 0.0, -0.78, -0.08, 0.05, 0.015)
    m |= seg(0.05, -0.08, -0.05, -0.20, 0.015, 0.008)    # legs tucked
    return m


def tympanum_heightmap(size=2048, n_rays=14, n_birds=10):
    lin = np.linspace(-1, 1, size, dtype=np.float32)
    X, Y = np.meshgrid(lin, -lin)
    R = np.sqrt(X * X + Y * Y)
    T = np.arctan2(Y, X)
    h = np.zeros_like(R)

    def ridge(r0, w=0.004, amp=1.0):
        return amp * np.clip(1 - np.abs(R - r0) / w, 0, 1)

    # central sun star with pointed rays
    core = R < 0.075
    seg = 2 * math.pi / n_rays
    a = np.abs(((T + seg / 2) % seg) - seg / 2)
    ray_w = (1 - np.clip(R / 0.20, 0, 1)) * seg * 0.42
    rays = (a < ray_w) & (R < 0.20)
    h = np.maximum(h, np.where(core | rays, 1.0, 0.0))
    # feathered motif between rays
    feather = (a > ray_w + 0.02) & (R > 0.08) & (R < 0.18) & (np.abs(((T * n_rays * 2 / (2 * math.pi)) % 1) - 0.5) < 0.12)
    h = np.maximum(h, np.where(feather, 0.55, 0))

    for r0 in (0.215, 0.225, 0.30, 0.31, 0.43, 0.44, 0.66, 0.67, 0.80, 0.81, 0.93, 0.94):
        h = np.maximum(h, ridge(r0, 0.0035, 0.8))
    # band: circles joined by tangents (0.235..0.29)
    n_c = 40
    segc = 2 * math.pi / n_c
    rc = 0.262
    tt = ((T + segc / 2) % segc) - segc / 2
    lx = R * np.cos(tt) - rc
    ly = R * np.sin(tt)
    d = np.sqrt(lx * lx + ly * ly)
    circ = (np.abs(d - 0.016) < 0.0035) | (d < 0.005)
    tang = (np.abs(lx - 0.016 * np.sign(ly)) < 0.003) & (np.abs(ly) > 0.012) & (R > 0.235) & (R < 0.29)
    h = np.maximum(h, np.where(circ | tang, 0.7, 0))
    # band: ladder / hatch (0.315..0.425)
    n_l = 140
    hatch = (np.abs(((T / (2 * math.pi) * n_l) % 1) - 0.5) < 0.16) & (R > 0.32) & (R < 0.335)
    hatch |= (np.abs(((T / (2 * math.pi) * n_l + 0.5) % 1) - 0.5) < 0.16) & (R > 0.415) & (R < 0.425)
    zz_phase = (T / (2 * math.pi) * 60) % 1
    zz_r = 0.345 + 0.06 * np.abs(zz_phase * 2 - 1)
    zig = np.abs(R - zz_r) < 0.0045
    h = np.maximum(h, np.where(hatch, 0.6, 0))
    h = np.maximum(h, np.where(zig & (R > 0.34) & (R < 0.41), 0.7, 0))
    # main band: ring of Lac birds flying counter-clockwise (0.45..0.65)
    rb = 0.55
    s = 0.105
    for i in range(n_birds):
        ang = i * 2 * math.pi / n_birds
        cx, cy = rb * math.cos(ang), rb * math.sin(ang)
        # flight direction = tangent (ccw)
        fx, fy = -math.sin(ang), math.cos(ang)
        x0 = int((cx - 0.13 + 1) / 2 * size)
        x1 = int((cx + 0.13 + 1) / 2 * size)
        y0 = int((1 - (cy + 0.13)) / 2 * size)
        y1 = int((1 - (cy - 0.13)) / 2 * size)
        x0, y0 = max(0, x0), max(0, y0)
        sx, sy = X[y0:y1, x0:x1] - cx, Y[y0:y1, x0:x1] - cy
        u = sx * fx + sy * fy
        v = -sx * fy + sy * fx
        m = _bird_mask(u, v, s)
        sub = h[y0:y1, x0:x1]
        h[y0:y1, x0:x1] = np.maximum(sub, np.where(m, 0.95, 0))
    # band: dotted circles (0.68..0.79)
    n_d = 72
    segd = 2 * math.pi / n_d
    td = ((T + segd / 2) % segd) - segd / 2
    lx = R * np.cos(td) - 0.735
    ly = R * np.sin(td)
    dd = np.sqrt(lx * lx + ly * ly)
    h = np.maximum(h, np.where((np.abs(dd - 0.022) < 0.004) | (dd < 0.007), 0.7, 0))
    # outer band: small birds (0.82..0.92)
    n_sb = 26
    for i in range(n_sb):
        ang = i * 2 * math.pi / n_sb + 0.06
        cx, cy = 0.87 * math.cos(ang), 0.87 * math.sin(ang)
        fx, fy = -math.sin(ang), math.cos(ang)
        x0 = max(0, int((cx - 0.07 + 1) / 2 * size))
        x1 = int((cx + 0.07 + 1) / 2 * size)
        y0 = max(0, int((1 - (cy + 0.07)) / 2 * size))
        y1 = int((1 - (cy - 0.07)) / 2 * size)
        sx, sy = X[y0:y1, x0:x1] - cx, Y[y0:y1, x0:x1] - cy
        u = sx * fx + sy * fy
        v = -sx * fy + sy * fx
        m = _bird_mask(u, v, 0.05)
        h[y0:y1, x0:x1] = np.maximum(h[y0:y1, x0:x1], np.where(m, 0.8, 0))
    h[R > 0.985] = 0.2
    # soften edges (box blur 3x)
    for _ in range(2):
        h = (h + np.roll(h, 1, 0) + np.roll(h, -1, 0) + np.roll(h, 1, 1) + np.roll(h, -1, 1)) / 5
    return h


def heightmap_image(path_cache):
    if os.path.exists(path_cache):
        return bpy.data.images.load(path_cache)
    h = tympanum_heightmap()
    size = h.shape[0]
    img = bpy.data.images.new("TympanumHeight", size, size, alpha=False, float_buffer=True)
    px = np.repeat(np.flipud(h)[:, :, None], 4, axis=2)
    px[:, :, 3] = 1.0
    img.pixels.foreach_set(px.ravel().astype(np.float32))
    img.filepath_raw = path_cache
    img.file_format = "OPEN_EXR"
    img.save()
    img.colorspace_settings.name = "Non-Color"
    return img


def bronze_material(img, glow_color=(1, 0.8, 0.35, 1)):
    m, nt, out = node_tree_material("Bronze")
    L = nt.links
    tc = nt.nodes.new("ShaderNodeTexCoord")
    p = nt.nodes.new("ShaderNodeBsdfPrincipled")
    p.inputs["Metallic"].default_value = 1.0
    # height mask (tympanum only; body samples flat 0)
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = img
    tex.image.colorspace_settings.name = "Non-Color"
    tex.extension = "CLIP"
    L.new(tc.outputs["UV"], tex.inputs["Vector"])
    nz = nt.nodes.new("ShaderNodeTexNoise")
    nz.inputs["Scale"].default_value = 9.0
    nz.inputs["Detail"].default_value = 10
    L.new(tc.outputs["Object"], nz.inputs["Vector"])
    # patina amount: cavities + noise
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    L.new(tex.outputs["Color"], inv.inputs[1])
    pat = nt.nodes.new("ShaderNodeMath")
    pat.operation = "MULTIPLY"
    L.new(inv.outputs[0], pat.inputs[0])
    L.new(nz.outputs["Fac"], pat.inputs[1])
    pr = nt.nodes.new("ShaderNodeMapRange")
    pr.inputs["From Min"].default_value = 0.32
    pr.inputs["From Max"].default_value = 0.62
    L.new(pat.outputs[0], pr.inputs["Value"])
    base = nt.nodes.new("ShaderNodeMix")
    base.data_type = "RGBA"
    base.inputs["A"].default_value = (*srgb_to_linear((0.72, 0.50, 0.28)), 1)
    base.inputs["B"].default_value = (*srgb_to_linear((0.22, 0.30, 0.25)), 1)
    L.new(pr.outputs["Result"], base.inputs["Factor"])
    L.new(base.outputs["Result"], p.inputs["Base Color"])
    rough = nt.nodes.new("ShaderNodeMapRange")
    rough.inputs["To Min"].default_value = 0.32
    rough.inputs["To Max"].default_value = 0.85
    L.new(pr.outputs["Result"], rough.inputs["Value"])
    L.new(rough.outputs["Result"], p.inputs["Roughness"])
    met = nt.nodes.new("ShaderNodeMapRange")
    met.inputs["To Min"].default_value = 1.0
    met.inputs["To Max"].default_value = 0.2
    L.new(pr.outputs["Result"], met.inputs["Value"])
    L.new(met.outputs["Result"], p.inputs["Metallic"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.25
    bump.inputs["Distance"].default_value = 0.002
    L.new(nz.outputs["Fac"], bump.inputs["Height"])
    L.new(bump.outputs[0], p.inputs["Normal"])
    # relief glow (animated by 'DrumGlow' value node)
    glow = nt.nodes.new("ShaderNodeValue")
    glow.name = "DrumGlow"
    glow.outputs[0].default_value = 0.0
    gm = nt.nodes.new("ShaderNodeMath")
    gm.operation = "MULTIPLY"
    pw = nt.nodes.new("ShaderNodeMath")
    pw.operation = "POWER"
    pw.inputs[1].default_value = 2.0
    L.new(tex.outputs["Color"], pw.inputs[0])
    L.new(pw.outputs[0], gm.inputs[0])
    L.new(glow.outputs[0], gm.inputs[1])
    gcol = nt.nodes.new("ShaderNodeRGB")
    gcol.name = "GlowColor"
    gcol.outputs[0].default_value = glow_color
    L.new(gcol.outputs[0], p.inputs["Emission Color"])
    L.new(gm.outputs[0], p.inputs["Emission Strength"])
    L.new(p.outputs[0], out.inputs["Surface"])
    return m


def _lathe(profile, segs=128):
    verts, faces = [], []
    for (r, z) in profile:
        for k in range(segs):
            a = 2 * math.pi * k / segs
            verts.append((r * math.cos(a), r * math.sin(a), z))
    for i in range(len(profile) - 1):
        for k in range(segs):
            a = i * segs + k
            b = i * segs + (k + 1) % segs
            faces.append((a, b, b + segs, a + segs))
    return verts, faces


def build_drum(location=(0, 0, 30.0), cache_dir="/tmp", rings=180, segs=540, glow_color=(1, 0.8, 0.35, 1), scale=1.0):
    img = heightmap_image(os.path.join(cache_dir, "tympanum_h.exr"))
    mat = bronze_material(img, glow_color)
    # body: tympanum overhang, bulging mantle, straight waist, flared foot
    prof = [(R_TOP * 0.985, H), (R_TOP * 1.0, H - 0.01), (R_TOP * 0.99, H - 0.05), (0.80, H - 0.16),
            (0.81, H - 0.27), (0.76, H - 0.42), (0.64, H - 0.58), (0.62, H - 0.72),
            (0.63, H - 0.86), (0.70, H - 1.02), (0.74, H - 1.09), (0.735, 0.0), (0.66, 0.0)]
    v, f = _lathe(prof, 192)
    body = new_mesh_obj("DrumBody", v, f)
    for p in body.data.polygons:
        p.use_smooth = True
    # band grooves on the mantle via a subtle bump — keep body simple but readable
    body.data.materials.append(mat)
    # tympanum disc (polar grid) with UVs in [0,1]
    verts = [(0.0, 0.0, 0.0)]
    faces = []
    for i in range(1, rings + 1):
        r = R_TOP * 0.985 * i / rings
        for k in range(segs):
            a = 2 * math.pi * k / segs
            verts.append((r * math.cos(a), r * math.sin(a), 0.0))
    for k in range(segs):
        faces.append((0, 1 + k, 1 + (k + 1) % segs))
    for i in range(1, rings):
        o0 = 1 + (i - 1) * segs
        o1 = 1 + i * segs
        for k in range(segs):
            k1 = (k + 1) % segs
            faces.append((o0 + k, o1 + k, o1 + k1, o0 + k1))
    top = new_mesh_obj("Tympanum", verts, faces)
    me = top.data
    uv = me.uv_layers.new(name="UVMap")
    for poly in me.polygons:
        poly.use_smooth = True
        for li in poly.loop_indices:
            x, y, _ = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = (x / (R_TOP * 0.985) * 0.5 + 0.5, y / (R_TOP * 0.985) * 0.5 + 0.5)
    tex = bpy.data.textures.new("TympH", "IMAGE")
    tex.image = img
    tex.extension = "CLIP"
    disp = top.modifiers.new("Relief", "DISPLACE")
    disp.texture = tex
    disp.texture_coords = "UV"
    disp.direction = "Z"
    disp.mid_level = 0.0
    disp.strength = 0.012
    top.location = (0, 0, H - 0.002)
    top.data.materials.append(mat)
    # four loop handles at the mantle/waist joint
    handles = []
    for k in range(4):
        a = k * math.pi / 2 + math.pi / 4
        bpy.ops.mesh.primitive_torus_add(major_radius=0.075, minor_radius=0.014,
                                         location=(0.73 * math.cos(a), 0.73 * math.sin(a), H - 0.48),
                                         rotation=(math.pi / 2, 0, a + math.pi / 2))
        hd = bpy.context.active_object
        hd.scale = (1, 1.6, 1)
        hd.data.materials.append(mat)
        handles.append(hd)
    root = bpy.data.objects.new("Drum", None)
    link_obj(root)
    for ob in [body, top] + handles:
        ob.parent = root
    root.location = location
    root.scale = (scale, scale, scale)
    # stone dais
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=1.5 * scale, depth=0.8, location=(location[0], location[1], location[2] - 0.38))
    dais = bpy.context.active_object
    dais.name = "Dais"
    from .env import rock_material
    dais.data.materials.append(rock_material("DaisStone", base=(0.10, 0.10, 0.11), moss=False))
    bev = dais.modifiers.new("Bevel", "BEVEL")
    bev.width = 0.06
    bev.segments = 3
    return root, mat
