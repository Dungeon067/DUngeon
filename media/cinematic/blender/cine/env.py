"""Night environment: sky, moon, Ocean-modifier sea, noise mountains, Geometry-Nodes cliff and grass, fog."""
import math
import random
import bpy
from mathutils import Vector, noise
from .common import col, srgb_to_linear, node_tree_material, link_obj, new_mesh_obj

MOON_DIR = Vector((0.18, 0.97, 0.17)).normalized()   # over the sea, low in the sky
CLIFF_TOP = 30.0


def _nodes(nt, *types):
    return [nt.nodes.new(t) for t in types]


def build_world(star_scale=1.0, moon_dir=MOON_DIR, strength=1.0, nebula=0.0, halo_gain=1.0):
    w = bpy.data.worlds.new("Night")
    bpy.context.scene.world = w
    w.use_nodes = True
    nt = w.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    L = nt.links
    out = nt.nodes.new("ShaderNodeOutputWorld")
    tc = nt.nodes.new("ShaderNodeTexCoord")
    norm = nt.nodes.new("ShaderNodeVectorMath")
    norm.operation = "NORMALIZE"
    L.new(tc.outputs["Generated"], norm.inputs[0])
    # sky gradient on z
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    L.new(norm.outputs[0], sep.inputs[0])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    cr = ramp.color_ramp
    cr.elements[0].position = 0.0
    cr.elements[0].color = (*srgb_to_linear((0.05, 0.07, 0.16)), 1)
    cr.elements[1].position = 0.45
    cr.elements[1].color = (*srgb_to_linear((0.006, 0.008, 0.03)), 1)
    e = cr.elements.new(0.08)
    e.color = (*srgb_to_linear((0.025, 0.035, 0.10)), 1)
    L.new(sep.outputs["Z"], ramp.inputs["Fac"])
    # moon halo
    dot = nt.nodes.new("ShaderNodeVectorMath")
    dot.operation = "DOT_PRODUCT"
    dot.inputs[1].default_value = tuple(moon_dir)
    L.new(norm.outputs[0], dot.inputs[0])
    pw = nt.nodes.new("ShaderNodeMath")
    pw.operation = "POWER"
    pw.use_clamp = True
    pw.inputs[1].default_value = 60.0
    clampd = nt.nodes.new("ShaderNodeMath")
    clampd.operation = "MAXIMUM"
    clampd.inputs[1].default_value = 0.0
    L.new(dot.outputs["Value"], clampd.inputs[0])
    L.new(clampd.outputs[0], pw.inputs[0])
    halo = nt.nodes.new("ShaderNodeMix")
    halo.data_type = "RGBA"
    halo.blend_type = "ADD"
    L.new(pw.outputs[0], halo.inputs["Factor"])
    L.new(ramp.outputs["Color"], halo.inputs["A"])
    halo.inputs["B"].default_value = (*(c * halo_gain for c in srgb_to_linear((0.45, 0.40, 0.28))), 1)
    # stars: two voronoi layers
    star_sum = None
    for scale, thr, bright in ((380 * star_scale, 0.045, 6.0), (900 * star_scale, 0.035, 2.5)):
        vo = nt.nodes.new("ShaderNodeTexVoronoi")
        vo.voronoi_dimensions = "3D"
        vo.inputs["Scale"].default_value = scale
        vo.inputs["Randomness"].default_value = 1.0
        L.new(norm.outputs[0], vo.inputs["Vector"])
        mr = nt.nodes.new("ShaderNodeMapRange")
        mr.inputs["From Min"].default_value = thr
        mr.inputs["From Max"].default_value = 0.0
        mr.inputs["To Min"].default_value = 0.0
        mr.inputs["To Max"].default_value = 1.0
        L.new(vo.outputs["Distance"], mr.inputs["Value"])
        sq = nt.nodes.new("ShaderNodeMath")
        sq.operation = "POWER"
        sq.inputs[1].default_value = 3.0
        L.new(mr.outputs["Result"], sq.inputs[0])
        # random brightness per cell (only a fraction of cells lit)
        sepc = nt.nodes.new("ShaderNodeSeparateColor")
        L.new(vo.outputs["Color"], sepc.inputs[0])
        gate = nt.nodes.new("ShaderNodeMapRange")
        gate.inputs["From Min"].default_value = 0.55
        gate.inputs["From Max"].default_value = 1.0
        L.new(sepc.outputs[0], gate.inputs["Value"])
        m1 = nt.nodes.new("ShaderNodeMath")
        m1.operation = "MULTIPLY"
        L.new(sq.outputs[0], m1.inputs[0])
        L.new(gate.outputs["Result"], m1.inputs[1])
        m2 = nt.nodes.new("ShaderNodeMath")
        m2.operation = "MULTIPLY"
        m2.inputs[1].default_value = bright
        L.new(m1.outputs[0], m2.inputs[0])
        if star_sum is None:
            star_sum = m2
        else:
            a = nt.nodes.new("ShaderNodeMath")
            a.operation = "ADD"
            L.new(star_sum.outputs[0], a.inputs[0])
            L.new(m2.outputs[0], a.inputs[1])
            star_sum = a
    # fade stars near horizon
    hz = nt.nodes.new("ShaderNodeMapRange")
    hz.inputs["From Min"].default_value = 0.02
    hz.inputs["From Max"].default_value = 0.25
    L.new(sep.outputs["Z"], hz.inputs["Value"])
    sm = nt.nodes.new("ShaderNodeMath")
    sm.operation = "MULTIPLY"
    L.new(star_sum.outputs[0], sm.inputs[0])
    L.new(hz.outputs["Result"], sm.inputs[1])
    starc = nt.nodes.new("ShaderNodeMix")
    starc.data_type = "RGBA"
    starc.blend_type = "ADD"
    starc.inputs["B"].default_value = (*srgb_to_linear((0.85, 0.88, 1.0)), 1)
    L.new(sm.outputs[0], starc.inputs["Factor"])
    L.new(halo.outputs["Result"], starc.inputs["A"])
    last = starc.outputs["Result"]
    if nebula > 0:
        nz = nt.nodes.new("ShaderNodeTexNoise")
        nz.inputs["Scale"].default_value = 2.2
        nz.inputs["Detail"].default_value = 8
        nz.inputs["Roughness"].default_value = 0.62
        L.new(norm.outputs[0], nz.inputs["Vector"])
        nr = nt.nodes.new("ShaderNodeValToRGB")
        nr.color_ramp.elements[0].position = 0.45
        nr.color_ramp.elements[0].color = (0, 0, 0, 1)
        nr.color_ramp.elements[1].position = 0.85
        nr.color_ramp.elements[1].color = (*srgb_to_linear((0.10, 0.06, 0.22)), 1)
        mid = nr.color_ramp.elements.new(0.65)
        mid.color = (*srgb_to_linear((0.02, 0.03, 0.09)), 1)
        L.new(nz.outputs["Fac"], nr.inputs["Fac"])
        nm = nt.nodes.new("ShaderNodeMix")
        nm.data_type = "RGBA"
        nm.blend_type = "ADD"
        nm.inputs["Factor"].default_value = nebula
        L.new(last, nm.inputs["A"])
        L.new(nr.outputs["Color"], nm.inputs["B"])
        last = nm.outputs["Result"]
    bg = nt.nodes.new("ShaderNodeBackground")
    bg.inputs["Strength"].default_value = strength
    L.new(last, bg.inputs["Color"])
    L.new(bg.outputs[0], out.inputs["Surface"])
    return w


def build_moon(dist=9000.0, radius=95.0, moon_dir=MOON_DIR, light=0.35):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=radius,
                                         location=tuple(moon_dir * dist))
    moon = bpy.context.active_object
    moon.name = "Moon"
    m, nt, out = node_tree_material("MoonMat")
    nz = nt.nodes.new("ShaderNodeTexNoise")
    nz.inputs["Scale"].default_value = 3.0
    nz.inputs["Detail"].default_value = 6
    mr = nt.nodes.new("ShaderNodeMapRange")
    mr.inputs["To Min"].default_value = 0.72
    mr.inputs["To Max"].default_value = 1.0
    nt.links.new(nz.outputs["Fac"], mr.inputs["Value"])
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = col("moon")
    nt.links.new(mr.outputs["Result"], em.inputs["Strength"])
    mul = nt.nodes.new("ShaderNodeMath")
    mul.operation = "MULTIPLY"
    mul.inputs[1].default_value = 14.0
    nt.links.new(mr.outputs["Result"], mul.inputs[0])
    nt.links.new(mul.outputs[0], em.inputs["Strength"])
    nt.links.new(em.outputs[0], out.inputs["Surface"])
    moon.data.materials.append(m)
    moon.visible_shadow = False
    sun = bpy.data.lights.new("MoonLight", "SUN")
    sun.energy = light
    sun.angle = math.radians(1.2)
    sun.color = srgb_to_linear((0.85, 0.86, 1.0))
    so = bpy.data.objects.new("MoonLight", sun)
    so.rotation_euler = moon_dir.to_track_quat("Z", "Y").to_euler()
    link_obj(so)
    return moon, so


def build_sea(ocean_frames=None, size=110.0, repeat=7, res=11, center=(0, 160)):
    bpy.ops.mesh.primitive_plane_add(size=2)
    sea = bpy.context.active_object
    sea.name = "Sea"
    mod = sea.modifiers.new("Ocean", "OCEAN")
    mod.geometry_mode = "GENERATE"
    mod.resolution = res
    mod.spatial_size = int(size)
    mod.size = 1.0
    mod.repeat_x = repeat
    mod.repeat_y = repeat
    mod.wave_scale = 1.1
    mod.choppiness = 1.15
    mod.wind_velocity = 9.0
    mod.wave_alignment = 0.35
    mod.wave_direction = math.radians(-100)
    mod.damping = 0.5
    mod.use_normals = True
    mod.use_foam = True
    mod.foam_layer_name = "foam"
    mod.foam_coverage = 0.15
    mod.random_seed = 3
    half = size * repeat / 2
    sea.location = (center[0] - half + size / 2 * 0, center[1] - half + 0, 0)
    sea.location = (center[0], center[1], 0)
    if ocean_frames:
        f0, f1, t0, t1 = ocean_frames
        mod.time = t0
        mod.keyframe_insert("time", frame=f0)
        mod.time = t1
        mod.keyframe_insert("time", frame=f1)
        from .common import set_linear
        set_linear(sea)
    mat = water_material()
    sea.data.materials.append(mat)
    # far sea plane to the horizon
    bpy.ops.mesh.primitive_plane_add(size=40000, location=(0, 0, -0.35))
    far = bpy.context.active_object
    far.name = "FarSea"
    far.data.materials.append(water_material(far=True))
    return sea, far


HORIZON = (0.05, 0.07, 0.16)


def add_distance_fog(mat, dist, color=HORIZON, strength=1.0):
    """Blend a surface into the horizon haze by camera distance (keeps the sky untouched)."""
    nt = mat.node_tree
    L = nt.links
    out = next(n for n in nt.nodes if n.type == "OUTPUT_MATERIAL")
    src = out.inputs["Surface"].links[0].from_socket
    cd = nt.nodes.new("ShaderNodeCameraData")
    dv = nt.nodes.new("ShaderNodeMath")
    dv.operation = "DIVIDE"
    dv.inputs[1].default_value = -dist
    L.new(cd.outputs["View Distance"], dv.inputs[0])
    ex = nt.nodes.new("ShaderNodeMath")
    ex.operation = "EXPONENT"
    L.new(dv.outputs[0], ex.inputs[0])
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    L.new(ex.outputs[0], inv.inputs[1])
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = (*srgb_to_linear(color), 1)
    em.inputs["Strength"].default_value = strength
    mx = nt.nodes.new("ShaderNodeMixShader")
    L.new(inv.outputs[0], mx.inputs[0])
    L.new(src, mx.inputs[1])
    L.new(em.outputs[0], mx.inputs[2])
    L.new(mx.outputs[0], out.inputs["Surface"])
    return mat


def water_material(far=False):
    m, nt, out = node_tree_material("WaterFar" if far else "Water")
    L = nt.links
    p = nt.nodes.new("ShaderNodeBsdfPrincipled")
    p.inputs["Base Color"].default_value = (*srgb_to_linear((0.004, 0.010, 0.020)), 1)
    p.inputs["Roughness"].default_value = 0.09 if not far else 0.1
    p.inputs["IOR"].default_value = 1.33
    p.inputs["Specular IOR Level"].default_value = 0.6
    if far:
        tc = nt.nodes.new("ShaderNodeTexCoord")
        nz = nt.nodes.new("ShaderNodeTexNoise")
        nz.inputs["Scale"].default_value = 0.08
        nz.inputs["Detail"].default_value = 12
        mp = nt.nodes.new("ShaderNodeMapping")
        mp.inputs["Scale"].default_value = (1, 2.2, 1)
        L.new(tc.outputs["Object"], mp.inputs["Vector"])
        L.new(mp.outputs[0], nz.inputs["Vector"])
        bump = nt.nodes.new("ShaderNodeBump")
        bump.inputs["Strength"].default_value = 0.35
        bump.inputs["Distance"].default_value = 0.5
        L.new(nz.outputs["Fac"], bump.inputs["Height"])
        L.new(bump.outputs[0], p.inputs["Normal"])
        L.new(p.outputs[0], out.inputs["Surface"])
        return m
    # foam from the Ocean modifier
    at = nt.nodes.new("ShaderNodeAttribute")
    at.attribute_name = "foam"
    mr = nt.nodes.new("ShaderNodeMapRange")
    mr.inputs["From Min"].default_value = 0.35
    mr.inputs["From Max"].default_value = 1.0
    mr.inputs["To Max"].default_value = 0.6
    L.new(at.outputs["Fac"], mr.inputs["Value"])
    foam = nt.nodes.new("ShaderNodeBsdfDiffuse")
    foam.inputs["Color"].default_value = (0.55, 0.6, 0.7, 1)
    mix = nt.nodes.new("ShaderNodeMixShader")
    L.new(mr.outputs["Result"], mix.inputs[0])
    L.new(p.outputs[0], mix.inputs[1])
    L.new(foam.outputs[0], mix.inputs[2])
    # fine ripples
    nz = nt.nodes.new("ShaderNodeTexNoise")
    nz.inputs["Scale"].default_value = 1.4
    nz.inputs["Detail"].default_value = 6
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.12
    L.new(nz.outputs["Fac"], bump.inputs["Height"])
    L.new(bump.outputs[0], p.inputs["Normal"])
    L.new(mix.outputs[0], out.inputs["Surface"])
    return m


def rock_material(name="Rock", base=(0.05, 0.05, 0.06), moss=True):
    m, nt, out = node_tree_material(name)
    L = nt.links
    tc = nt.nodes.new("ShaderNodeTexCoord")
    p = nt.nodes.new("ShaderNodeBsdfPrincipled")
    p.inputs["Roughness"].default_value = 0.85
    nz = nt.nodes.new("ShaderNodeTexNoise")
    nz.noise_type = "RIDGED_MULTIFRACTAL"
    nz.inputs["Scale"].default_value = 0.35
    nz.inputs["Detail"].default_value = 10
    L.new(tc.outputs["Object"], nz.inputs["Vector"])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (*srgb_to_linear(base), 1)
    ramp.color_ramp.elements[1].color = (*srgb_to_linear(tuple(min(1, c * 2.6) for c in base)), 1)
    L.new(nz.outputs["Fac"], ramp.inputs["Fac"])
    color_out = ramp.outputs["Color"]
    if moss:
        geo = nt.nodes.new("ShaderNodeNewGeometry")
        sepn = nt.nodes.new("ShaderNodeSeparateXYZ")
        L.new(geo.outputs["Normal"], sepn.inputs[0])
        mr = nt.nodes.new("ShaderNodeMapRange")
        mr.inputs["From Min"].default_value = 0.72
        mr.inputs["From Max"].default_value = 0.9
        L.new(sepn.outputs["Z"], mr.inputs["Value"])
        mx = nt.nodes.new("ShaderNodeMix")
        mx.data_type = "RGBA"
        mx.inputs["B"].default_value = (*srgb_to_linear((0.03, 0.06, 0.035)), 1)
        L.new(mr.outputs["Result"], mx.inputs["Factor"])
        L.new(color_out, mx.inputs["A"])
        color_out = mx.outputs["Result"]
    L.new(color_out, p.inputs["Base Color"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.7
    bump.inputs["Distance"].default_value = 0.4
    nz2 = nt.nodes.new("ShaderNodeTexNoise")
    nz2.inputs["Scale"].default_value = 2.5
    nz2.inputs["Detail"].default_value = 12
    L.new(tc.outputs["Object"], nz2.inputs["Vector"])
    add = nt.nodes.new("ShaderNodeMath")
    L.new(nz.outputs["Fac"], add.inputs[0])
    L.new(nz2.outputs["Fac"], add.inputs[1])
    L.new(add.outputs[0], bump.inputs["Height"])
    L.new(bump.outputs[0], p.inputs["Normal"])
    L.new(p.outputs[0], out.inputs["Surface"])
    return m


def build_mountains(seed=4):
    """Far ranges across the sea, from noise heightfields (generated mesh)."""
    obs = []
    mat = rock_material("FarRock", base=(0.018, 0.022, 0.035), moss=False)
    ranges = [
        # (center x, center y, width, depth, height, rot z)
        (-1900, 3600, 4200, 900, 520, math.radians(8)),
        (2300, 4300, 4600, 1100, 680, math.radians(-12)),
        (-3200, 1600, 900, 2600, 380, math.radians(0)),
        (400, 6200, 6000, 1400, 900, 0.0),
    ]
    for i, (cx, cy, w, d, h, rz) in enumerate(ranges):
        nx, ny = 140, 40
        verts, faces = [], []
        for j in range(ny + 1):
            v = j / ny
            for k in range(nx + 1):
                u = k / nx
                x = (u - 0.5) * w
                y = (v - 0.5) * d
                p = Vector((x * 0.0011 + seed + i * 7.3, y * 0.0011 + i * 3.1, 0.0))
                n = noise.ridged_multi_fractal(p, 0.95, 2.1, 7, 1.0, 2.2, noise_basis="PERLIN_ORIGINAL")
                edge = math.sin(math.pi * u) ** 0.6 * math.sin(math.pi * v) ** 1.2
                z = max(-30.0, h * 0.42 * n * edge - 40)
                verts.append((x, y, z))
        for j in range(ny):
            for k in range(nx):
                a = j * (nx + 1) + k
                faces.append((a, a + 1, a + nx + 2, a + nx + 1))
        ob = new_mesh_obj(f"Range{i}", verts, faces)
        ob.location = (cx, cy, 0)
        ob.rotation_euler = (0, 0, rz)
        for poly in ob.data.polygons:
            poly.use_smooth = True
        ob.data.materials.append(mat)
        obs.append(ob)
    return obs


# ------------------------------------------------------------ Geometry Nodes cliff + grass

class GN:
    """Tiny builder to keep Geometry Nodes wiring readable."""

    def __init__(self, name):
        self.tree = bpy.data.node_groups.new(name, "GeometryNodeTree")
        self.tree.interface.new_socket("Geometry", in_out="INPUT", socket_type="NodeSocketGeometry")
        self.tree.interface.new_socket("Geometry", in_out="OUTPUT", socket_type="NodeSocketGeometry")
        self.inp = self.tree.nodes.new("NodeGroupInput")
        self.out = self.tree.nodes.new("NodeGroupOutput")

    def n(self, t, **props):
        node = self.tree.nodes.new(t)
        for k, v in props.items():
            setattr(node, k, v)
        return node

    def link(self, a, b):
        self.tree.links.new(a, b)

    def math(self, op, a, b=None, c=None):
        m = self.n("ShaderNodeMath", operation=op)
        for i, v in enumerate((a, b, c)):
            if v is None:
                continue
            if isinstance(v, (int, float)):
                m.inputs[i].default_value = v
            else:
                self.link(v, m.inputs[i])
        return m.outputs[0]

    def vmath(self, op, a, b=None, scale=None):
        m = self.n("ShaderNodeVectorMath", operation=op)
        for i, v in enumerate((a, b)):
            if v is None:
                continue
            if isinstance(v, tuple):
                m.inputs[i].default_value = v
            else:
                self.link(v, m.inputs[i])
        if scale is not None:
            if isinstance(scale, (int, float)):
                m.inputs["Scale"].default_value = scale
            else:
                self.link(scale, m.inputs["Scale"])
        return m.outputs[0] if op not in ("DOT_PRODUCT", "LENGTH", "DISTANCE") else m.outputs["Value"]

    def noise(self, vec, scale, detail=4, rough=0.5, ntype="FBM", out="Fac"):
        nz = self.n("ShaderNodeTexNoise")
        nz.noise_type = ntype
        nz.inputs["Scale"].default_value = scale
        nz.inputs["Detail"].default_value = detail
        nz.inputs["Roughness"].default_value = rough
        self.link(vec, nz.inputs["Vector"])
        return nz.outputs[out]

    def smoothstep(self, lo, hi, v):
        mr = self.n("ShaderNodeMapRange", interpolation_type="SMOOTHSTEP")
        mr.inputs["From Min"].default_value = lo
        mr.inputs["From Max"].default_value = hi
        self.link(v, mr.inputs["Value"])
        return mr.outputs["Result"]


def sock(coll, name, typ):
    return next(x for x in coll if x.name == name and x.type == typ)


def grass_blade_mesh():
    verts, faces = [], []
    segs = 4
    for i in range(segs + 1):
        t = i / segs
        w = 0.035 * (1 - t) + 0.002
        bend = 0.12 * t * t
        verts += [(-w, bend, t), (w, bend, t)]
    for i in range(segs):
        a = i * 2
        faces.append((a, a + 1, a + 3, a + 2))
    me = bpy.data.meshes.new("Blade")
    me.from_pydata(verts, [], faces)
    ob = bpy.data.objects.new("Blade", me)
    m, nt, out = node_tree_material("Grass")
    p = nt.nodes.new("ShaderNodeBsdfPrincipled")
    p.inputs["Base Color"].default_value = (*srgb_to_linear((0.035, 0.07, 0.04)), 1)
    p.inputs["Roughness"].default_value = 0.6
    p.inputs["Subsurface Weight"].default_value = 0.0
    tr = nt.nodes.new("ShaderNodeBsdfTranslucent")
    tr.inputs["Color"].default_value = (*srgb_to_linear((0.06, 0.12, 0.05)), 1)
    mix = nt.nodes.new("ShaderNodeMixShader")
    mix.inputs[0].default_value = 0.3
    nt.links.new(p.outputs[0], mix.inputs[1])
    nt.links.new(tr.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs["Surface"])
    me.materials.append(m)
    return ob


def build_cliff(size=(420, 300), res=1.0, center=(0, -60), grass_density=22.0,
                grass_radius=55.0, wind_frames=None, clear_radius=3.2):
    """Headland whose tip faces +Y (the sea). Top plateau at CLIFF_TOP, drum stands at the origin."""
    g = GN("CliffGN")
    grid = g.n("GeometryNodeMeshGrid")
    grid.inputs["Size X"].default_value = size[0]
    grid.inputs["Size Y"].default_value = size[1]
    grid.inputs["Vertices X"].default_value = int(size[0] / res)
    grid.inputs["Vertices Y"].default_value = int(size[1] / res)
    tr = g.n("GeometryNodeTransform")
    tr.inputs["Translation"].default_value = (center[0], center[1], 0)
    g.link(grid.outputs["Mesh"], tr.inputs["Geometry"])
    pos = g.n("GeometryNodeInputPosition").outputs[0]
    sep = g.n("ShaderNodeSeparateXYZ")
    g.link(pos, sep.inputs[0])
    x, y = sep.outputs["X"], sep.outputs["Y"]
    # coastline y_c(x) = 22 - 0.0035 x^2 + 10*(noise-0.5)
    nvec = g.vmath("SCALE", pos, scale=1.0)
    coast_n = g.noise(nvec, 0.012, detail=3)
    x2 = g.math("MULTIPLY", x, x)
    yc = g.math("ADD", g.math("MULTIPLY", x2, -0.0035), 22.0)
    yc = g.math("ADD", yc, g.math("MULTIPLY", g.math("SUBTRACT", coast_n, 0.5), 22.0))
    s = g.math("SUBTRACT", y, yc)  # >0 means seaward
    # plateau / face / seabed
    face_lo = -5.0
    jag = g.noise(g.vmath("MULTIPLY", pos, (1.0, 1.0, 0.3)), 0.09, detail=6, ntype="RIDGED_MULTIFRACTAL")
    s_j = g.math("ADD", s, g.math("MULTIPLY", g.math("SUBTRACT", jag, 0.5), 9.0))
    top_mask = g.math("SUBTRACT", 1.0, g.smoothstep(face_lo, 5.0, s_j))
    h_top = g.math("MULTIPLY", top_mask, CLIFF_TOP)
    roll = g.noise(pos, 0.02, detail=4)
    h_top = g.math("ADD", h_top, g.math("MULTIPLY", top_mask, g.math("MULTIPLY", g.math("SUBTRACT", roll, 0.5), 6.0)))
    # gentle rise inland so the plateau is not flat
    inland = g.smoothstep(-20.0, -180.0, s)
    h_top = g.math("ADD", h_top, g.math("MULTIPLY", inland, 16.0))
    seabed = g.math("MULTIPLY", g.smoothstep(4.0, 40.0, s), -14.0)
    # rock detail strongest on the face
    face_mask = g.math("MULTIPLY", g.smoothstep(-8.0, 0.0, s_j), g.math("SUBTRACT", 1.0, g.smoothstep(4.0, 14.0, s_j)))
    rock = g.noise(pos, 0.18, detail=8, ntype="RIDGED_MULTIFRACTAL")
    h = g.math("ADD", h_top, seabed)
    h = g.math("ADD", h, g.math("MULTIPLY", face_mask, g.math("MULTIPLY", g.math("SUBTRACT", rock, 0.4), 6.0)))
    comb = g.n("ShaderNodeCombineXYZ")
    g.link(h, comb.inputs["Z"])
    # horizontal jitter on the face
    jv = g.noise(pos, 0.12, detail=5, out="Color")
    jv = g.vmath("SUBTRACT", jv, (0.5, 0.5, 0.5))
    jv = g.vmath("MULTIPLY", jv, (4.0, 4.0, 0.0))
    jv = g.vmath("SCALE", jv, scale=face_mask)
    off = g.vmath("ADD", comb.outputs[0], jv)
    sp = g.n("GeometryNodeSetPosition")
    g.link(tr.outputs["Geometry"], sp.inputs["Geometry"])
    g.link(off, sp.inputs["Offset"])
    shade = g.n("GeometryNodeSetShadeSmooth")
    g.link(sp.outputs["Geometry"], shade.inputs["Geometry"])
    mesh_out = shade.outputs["Geometry"]
    # grass on gentle, high ground near the drum
    blade = grass_blade_mesh()
    dist = g.n("GeometryNodeDistributePointsOnFaces")
    dist.distribute_method = "RANDOM"
    dist.inputs["Density"].default_value = grass_density
    g.link(mesh_out, dist.inputs["Mesh"])
    npos = g.n("GeometryNodeInputPosition").outputs[0]
    nrm = g.n("GeometryNodeInputNormal").outputs[0]
    nsep = g.n("ShaderNodeSeparateXYZ")
    g.link(nrm, nsep.inputs[0])
    psep = g.n("ShaderNodeSeparateXYZ")
    g.link(npos, psep.inputs[0])
    flat = g.math("GREATER_THAN", nsep.outputs["Z"], 0.82)
    high = g.math("GREATER_THAN", psep.outputs["Z"], CLIFF_TOP - 6.0)
    r = g.vmath("LENGTH", g.vmath("MULTIPLY", npos, (1.0, 1.0, 0.0)))
    near = g.math("LESS_THAN", r, grass_radius)
    clear = g.math("GREATER_THAN", r, clear_radius)
    patch = g.math("GREATER_THAN", g.noise(npos, 0.15, detail=2), 0.38)
    sel = g.math("MULTIPLY", g.math("MULTIPLY", flat, high), g.math("MULTIPLY", g.math("MULTIPLY", near, clear), patch))
    g.link(sel, dist.inputs["Selection"])
    ob_info = g.n("GeometryNodeObjectInfo")
    ob_info.inputs["Object"].default_value = blade
    inst = g.n("GeometryNodeInstanceOnPoints")
    g.link(dist.outputs["Points"], inst.inputs["Points"])
    g.link(ob_info.outputs["Geometry"], inst.inputs["Instance"])
    rnd_rot = g.n("FunctionNodeRandomValue", data_type="FLOAT_VECTOR")
    sock(rnd_rot.inputs, "Min", "VECTOR").default_value = (-0.25, -0.25, 0.0)
    sock(rnd_rot.inputs, "Max", "VECTOR").default_value = (0.25, 0.25, 6.283)
    g.link(sock(rnd_rot.outputs, "Value", "VECTOR"), inst.inputs["Rotation"])
    rnd_s = g.n("FunctionNodeRandomValue", data_type="FLOAT")
    sock(rnd_s.inputs, "Min", "VALUE").default_value = 0.25
    sock(rnd_s.inputs, "Max", "VALUE").default_value = 0.75
    rv = sock(rnd_s.outputs, "Value", "VALUE")
    sc = g.n("ShaderNodeCombineXYZ")
    g.link(rv, sc.inputs["X"])
    g.link(rv, sc.inputs["Y"])
    g.link(rv, sc.inputs["Z"])
    g.link(sc.outputs[0], inst.inputs["Scale"])
    join = g.n("GeometryNodeJoinGeometry")
    g.link(inst.outputs["Instances"], join.inputs["Geometry"])
    g.link(mesh_out, join.inputs["Geometry"])
    g.link(join.outputs["Geometry"], g.out.inputs[0])

    me = bpy.data.meshes.new("CliffBase")
    ob = bpy.data.objects.new("Cliff", me)
    link_obj(ob)
    mod = ob.modifiers.new("Cliff", "NODES")
    mod.node_group = g.tree
    ob.data.materials.append(rock_material())
    return ob


def build_fog(density=0.00045, extent=12000.0, mist=0.004, mist_box=(900, 900, 26), mist_center=(0, 200)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, extent * 0.25 - 50))
    dom = bpy.context.active_object
    dom.name = "Atmosphere"
    dom.scale = (extent, extent, extent * 0.5)
    m, nt, out = node_tree_material("AtmosphereMat")
    v = nt.nodes.new("ShaderNodeVolumePrincipled")
    v.inputs["Color"].default_value = (*srgb_to_linear((0.55, 0.62, 0.85)), 1)
    v.inputs["Density"].default_value = density
    v.inputs["Anisotropy"].default_value = 0.55
    nt.links.new(v.outputs[0], out.inputs["Volume"])
    dom.data.materials.append(m)
    dom.visible_shadow = False
    mist_ob = None
    if mist > 0:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(mist_center[0], mist_center[1], mist_box[2] / 2 - 2))
        mist_ob = bpy.context.active_object
        mist_ob.name = "SeaMist"
        mist_ob.scale = mist_box
        m2, nt2, out2 = node_tree_material("MistMat")
        L = nt2.links
        tc = nt2.nodes.new("ShaderNodeTexCoord")
        sep = nt2.nodes.new("ShaderNodeSeparateXYZ")
        L.new(tc.outputs["Generated"], sep.inputs[0])
        fall = nt2.nodes.new("ShaderNodeMapRange")
        fall.inputs["From Min"].default_value = 0.0
        fall.inputs["From Max"].default_value = 1.0
        fall.inputs["To Min"].default_value = 1.0
        fall.inputs["To Max"].default_value = 0.0
        L.new(sep.outputs["Z"], fall.inputs["Value"])
        nz = nt2.nodes.new("ShaderNodeTexNoise")
        nz.inputs["Scale"].default_value = 6.0
        nz.inputs["Detail"].default_value = 3
        L.new(tc.outputs["Generated"], nz.inputs["Vector"])
        nm = nt2.nodes.new("ShaderNodeMapRange")
        nm.inputs["From Min"].default_value = 0.45
        nm.inputs["From Max"].default_value = 0.75
        L.new(nz.outputs["Fac"], nm.inputs["Value"])
        mul = nt2.nodes.new("ShaderNodeMath")
        mul.operation = "MULTIPLY"
        L.new(fall.outputs["Result"], mul.inputs[0])
        L.new(nm.outputs["Result"], mul.inputs[1])
        mul2 = nt2.nodes.new("ShaderNodeMath")
        mul2.operation = "MULTIPLY"
        mul2.inputs[1].default_value = mist
        L.new(mul.outputs[0], mul2.inputs[0])
        v2 = nt2.nodes.new("ShaderNodeVolumePrincipled")
        v2.inputs["Color"].default_value = (*srgb_to_linear((0.6, 0.66, 0.85)), 1)
        v2.inputs["Anisotropy"].default_value = 0.4
        L.new(mul2.outputs[0], v2.inputs["Density"])
        L.new(v2.outputs[0], out2.inputs["Volume"])
        mist_ob.data.materials.append(m2)
        mist_ob.visible_shadow = False
    return dom, mist_ob
