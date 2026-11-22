"""Effects driven per frame from Python: spark particles, meteor tail, shockwave ring, dome, light pillar.

Particles are simulated in "story time" so slow motion only needs a remapped dt; each frame the
particle state is written into a mesh of small stretched diamonds (streak = built-in motion blur).
"""
import math
import numpy as np
import bpy
from mathutils import Vector
from .common import node_tree_material, link_obj, srgb_to_linear


def additive_material(name, strength=1.0, soft=2.0):
    """Emission from attributes 'col'/'glow', additive (emission + transparent), soft edges by facing."""
    m, nt, out = node_tree_material(name)
    L = nt.links
    a_col = nt.nodes.new("ShaderNodeAttribute")
    a_col.attribute_name = "col"
    a_glow = nt.nodes.new("ShaderNodeAttribute")
    a_glow.attribute_name = "glow"
    lw = nt.nodes.new("ShaderNodeLayerWeight")
    lw.inputs["Blend"].default_value = 0.5
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    L.new(lw.outputs["Facing"], inv.inputs[1])
    pw = nt.nodes.new("ShaderNodeMath")
    pw.operation = "POWER"
    pw.inputs[1].default_value = soft
    L.new(inv.outputs[0], pw.inputs[0])
    m1 = nt.nodes.new("ShaderNodeMath")
    m1.operation = "MULTIPLY"
    L.new(a_glow.outputs["Fac"], m1.inputs[0])
    L.new(pw.outputs[0], m1.inputs[1])
    m2 = nt.nodes.new("ShaderNodeMath")
    m2.operation = "MULTIPLY"
    m2.inputs[1].default_value = strength
    L.new(m1.outputs[0], m2.inputs[0])
    em = nt.nodes.new("ShaderNodeEmission")
    L.new(a_col.outputs["Color"], em.inputs["Color"])
    L.new(m2.outputs[0], em.inputs["Strength"])
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    add = nt.nodes.new("ShaderNodeAddShader")
    L.new(em.outputs[0], add.inputs[0])
    L.new(tr.outputs[0], add.inputs[1])
    L.new(add.outputs[0], out.inputs["Surface"])
    return m


def _write_mesh(ob, verts, faces, col, glow):
    old = ob.data
    me = bpy.data.meshes.new(old.name)
    nv = len(verts)
    nf = len(faces)
    if nv and nf:
        me.vertices.add(nv)
        me.vertices.foreach_set("co", np.ascontiguousarray(verts, dtype=np.float32).ravel())
        k = faces.shape[1]
        me.loops.add(nf * k)
        me.loops.foreach_set("vertex_index", np.ascontiguousarray(faces, dtype=np.int32).ravel())
        me.polygons.add(nf)
        me.polygons.foreach_set("loop_start", np.arange(0, nf * k, k, dtype=np.int32))
        me.update(calc_edges=True)
        a = me.attributes.new("col", "FLOAT_COLOR", "POINT")
        c4 = np.ones((nv, 4), dtype=np.float32)
        c4[:, :3] = col
        a.data.foreach_set("color", c4.ravel())
        g = me.attributes.new("glow", "FLOAT", "POINT")
        g.data.foreach_set("value", np.ascontiguousarray(glow, dtype=np.float32))
    for mat in old.materials:
        me.materials.append(mat)
    ob.data = me
    bpy.data.meshes.remove(old)


def _empty_obj(name, mat):
    me = bpy.data.meshes.new(name)
    ob = bpy.data.objects.new(name, me)
    me.materials.append(mat)
    link_obj(ob)
    ob.visible_shadow = False
    ob.visible_diffuse = False
    ob.visible_glossy = True
    ob.cycles.use_motion_blur = False
    return ob


class Sparks:
    def __init__(self, name, strength=40.0, cap=6000, seed=1):
        self.rng = np.random.default_rng(seed)
        self.mat = additive_material(name + "Mat", strength, soft=1.0)
        self.ob = _empty_obj(name, self.mat)
        self.pos = np.zeros((0, 3))
        self.vel = np.zeros((0, 3))
        self.age = np.zeros(0)
        self.life = np.zeros(0)
        self.col = np.zeros((0, 3))
        self.size = np.zeros(0)
        self.bright = np.zeros(0)
        self.cap = cap

    def emit(self, n, origin, vel, spread, life, size, color, bright=1.0, jitter=0.0, color2=None):
        if n <= 0:
            return
        r = self.rng
        o = np.asarray(origin, dtype=float)[None, :] + r.normal(0, jitter, (n, 3)) * (jitter > 0)
        d = r.normal(0, 1, (n, 3))
        d /= np.linalg.norm(d, axis=1, keepdims=True) + 1e-9
        sp = r.uniform(spread[0], spread[1], (n, 1)) if isinstance(spread, tuple) else spread
        v = np.asarray(vel, dtype=float)[None, :] + d * sp
        c = np.tile(np.asarray(color, dtype=float), (n, 1))
        if color2 is not None:
            t = r.uniform(0, 1, (n, 1))
            c = c * (1 - t) + np.asarray(color2)[None, :] * t
        self.pos = np.vstack([self.pos, o])
        self.vel = np.vstack([self.vel, v])
        self.age = np.concatenate([self.age, np.zeros(n)])
        self.life = np.concatenate([self.life, r.uniform(life[0], life[1], n)])
        self.col = np.vstack([self.col, c])
        self.size = np.concatenate([self.size, r.uniform(size[0], size[1], n)])
        self.bright = np.concatenate([self.bright, r.uniform(0.6, 1.0, n) * bright])
        if len(self.age) > self.cap:
            k = len(self.age) - self.cap
            for a in ("pos", "vel", "age", "life", "col", "size", "bright"):
                setattr(self, a, getattr(self, a)[k:])

    def step(self, dt, drag=1.0, gravity=(0, 0, 0)):
        if dt <= 0 or not len(self.age):
            return
        self.vel *= math.exp(-drag * dt)
        self.vel += np.asarray(gravity)[None, :] * dt
        self.pos += self.vel * dt
        self.age += dt
        keep = self.age < self.life
        for a in ("pos", "vel", "age", "life", "col", "size", "bright"):
            setattr(self, a, getattr(self, a)[keep])

    def write(self, stretch=0.04, min_len=0.0):
        n = len(self.age)
        if n == 0:
            _write_mesh(self.ob, np.zeros((0, 3)), np.zeros((0, 3), int), np.zeros((0, 3)), np.zeros(0))
            return
        k = 1 - self.age / self.life
        p = self.pos
        v = self.vel
        sp = np.linalg.norm(v, axis=1, keepdims=True) + 1e-6
        d = v / sp
        length = np.maximum(sp[:, 0] * stretch, min_len + self.size * 2)
        up = np.where(np.abs(d[:, 2:3]) < 0.9, np.array([[0, 0, 1.0]]), np.array([[1.0, 0, 0]]))
        a1 = np.cross(d, up)
        a1 /= np.linalg.norm(a1, axis=1, keepdims=True) + 1e-9
        a2 = np.cross(d, a1)
        w = (self.size * np.sqrt(k))[:, None]
        front = p + d * (w * 1.5)
        back = p - d * length[:, None]
        mids = [p + a1 * w, p + a2 * w, p - a1 * w, p - a2 * w]
        verts = np.stack([front, back] + mids, axis=1).reshape(-1, 3)
        base = (np.arange(n) * 6)[:, None]
        tri = np.array([[0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 2],
                        [1, 3, 2], [1, 4, 3], [1, 5, 4], [1, 2, 5]])
        faces = (base[:, None, :] + tri[None, :, :]).reshape(-1, 3)
        glow = (self.bright * k * k)
        g6 = np.repeat(glow, 6)
        g6.reshape(n, 6)[:, 1] *= 0.0  # tail end fades to nothing
        c6 = np.repeat(self.col, 6, axis=0)
        _write_mesh(self.ob, verts, faces, c6, g6)


class Tail:
    """Tapered glowing tube following the recent path of a moving head."""

    def __init__(self, name, strength=12.0, sides=10, soft=2.5):
        self.mat = additive_material(name + "Mat", strength, soft=soft)
        self.ob = _empty_obj(name, self.mat)
        self.sides = sides

    def write(self, path, radius, color_head, color_tail, glow=1.0, wobble_t=0.0):
        path = np.asarray(path, dtype=float)
        m = len(path)
        if m < 2:
            _write_mesh(self.ob, np.zeros((0, 3)), np.zeros((0, 4), int), np.zeros((0, 3)), np.zeros(0))
            return
        s = self.sides
        verts, cols, glows = [], [], []
        ch = np.asarray(color_head)
        ct = np.asarray(color_tail)
        for i in range(m):
            t = i / (m - 1)                      # 0 head -> 1 end
            if i < m - 1:
                d = path[i] - path[i + 1]
            else:
                d = path[i - 1] - path[i]
            d = d / (np.linalg.norm(d) + 1e-9)
            up = np.array([0, 0, 1.0]) if abs(d[2]) < 0.9 else np.array([1.0, 0, 0])
            a1 = np.cross(d, up)
            a1 /= np.linalg.norm(a1) + 1e-9
            a2 = np.cross(d, a1)
            r = radius * (1 - t) ** 0.8 * (0.9 + 0.1 * math.sin(t * 40 + wobble_t * 30))
            for k in range(s):
                ang = 2 * math.pi * k / s
                verts.append(path[i] + (a1 * math.cos(ang) + a2 * math.sin(ang)) * r)
                cols.append(ch * (1 - t) + ct * t)
                glows.append(glow * (1 - t) ** 1.6)
        faces = []
        for i in range(m - 1):
            for k in range(s):
                a = i * s + k
                b = i * s + (k + 1) % s
                faces.append((a, b, b + s, a + s))
        _write_mesh(self.ob, np.array(verts), np.array(faces), np.array(cols), np.array(glows))


def glow_sphere(name, radius, color, strength, shell=True):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=radius)
    ob = bpy.context.active_object
    ob.name = name
    for p in ob.data.polygons:
        p.use_smooth = True
    m, nt, out = node_tree_material(name + "Mat")
    L = nt.links
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = color
    em.inputs["Strength"].default_value = strength
    em.name = "Em"
    if shell:
        lw = nt.nodes.new("ShaderNodeLayerWeight")
        lw.inputs["Blend"].default_value = 0.5
        inv = nt.nodes.new("ShaderNodeMath")
        inv.operation = "SUBTRACT"
        inv.inputs[0].default_value = 1.0
        L.new(lw.outputs["Facing"], inv.inputs[1])
        pw = nt.nodes.new("ShaderNodeMath")
        pw.operation = "POWER"
        pw.inputs[1].default_value = 3.0
        L.new(inv.outputs[0], pw.inputs[0])
        mul = nt.nodes.new("ShaderNodeMath")
        mul.operation = "MULTIPLY"
        mul.inputs[1].default_value = strength
        mul.name = "Str"
        L.new(pw.outputs[0], mul.inputs[0])
        L.new(mul.outputs[0], em.inputs["Strength"])
        tr = nt.nodes.new("ShaderNodeBsdfTransparent")
        add = nt.nodes.new("ShaderNodeAddShader")
        L.new(em.outputs[0], add.inputs[0])
        L.new(tr.outputs[0], add.inputs[1])
        L.new(add.outputs[0], out.inputs["Surface"])
    else:
        L.new(em.outputs[0], out.inputs["Surface"])
    ob.data.materials.append(m)
    ob.visible_shadow = False
    return ob, m


def set_mat_strength(mat, value, frame):
    nt = mat.node_tree
    node = nt.nodes.get("Str")
    sock = node.inputs[1] if node else nt.nodes["Em"].inputs["Strength"]
    sock.default_value = value
    sock.keyframe_insert("default_value", frame=frame)


def set_mat_color(mat, color, frame):
    sock = mat.node_tree.nodes["Em"].inputs["Color"]
    sock.default_value = color
    sock.keyframe_insert("default_value", frame=frame)


def ring_mesh(name, segs=256, inner=0.82, outer=1.0, mid=0.93, strength=20.0):
    """Flat annulus (radius 1) with glow peaking at `mid`; scale the object to expand."""
    verts, faces, glow = [], [], []
    rs = [inner, (inner + mid) / 2, mid, (mid + outer) / 2, outer]
    gs = [0.0, 0.5, 1.0, 0.35, 0.0]
    for r, g in zip(rs, gs):
        for k in range(segs):
            a = 2 * math.pi * k / segs
            verts.append((r * math.cos(a), r * math.sin(a), 0))
            glow.append(g)
    for i in range(len(rs) - 1):
        for k in range(segs):
            a = i * segs + k
            b = i * segs + (k + 1) % segs
            faces.append((a, b, b + segs, a + segs))
    mat = ring_material(name + "Mat", strength)
    ob = _empty_obj(name, mat)
    _write_mesh(ob, np.array(verts), np.array(faces), np.ones((len(verts), 3)), np.array(glow))
    ob.cycles.use_motion_blur = True
    return ob, mat


def ring_material(name, strength):
    m, nt, out = node_tree_material(name)
    L = nt.links
    a = nt.nodes.new("ShaderNodeAttribute")
    a.attribute_name = "glow"
    mul = nt.nodes.new("ShaderNodeMath")
    mul.operation = "MULTIPLY"
    mul.name = "Str"
    mul.inputs[1].default_value = strength
    L.new(a.outputs["Fac"], mul.inputs[0])
    em = nt.nodes.new("ShaderNodeEmission")
    em.name = "Em"
    L.new(mul.outputs[0], em.inputs["Strength"])
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    add = nt.nodes.new("ShaderNodeAddShader")
    L.new(em.outputs[0], add.inputs[0])
    L.new(tr.outputs[0], add.inputs[1])
    L.new(add.outputs[0], out.inputs["Surface"])
    return m


def pillar(name, height=420.0, radius=1.0, color=(1, 0.8, 0.3, 1), strength=30.0):
    """Vertical light column: soft-edged emissive cylinder fading upward."""
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=radius, depth=height, location=(0, 0, height / 2))
    ob = bpy.context.active_object
    ob.name = name
    for p in ob.data.polygons:
        p.use_smooth = True
    m, nt, out = node_tree_material(name + "Mat")
    L = nt.links
    tc = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    L.new(tc.outputs["Generated"], sep.inputs[0])
    fade = nt.nodes.new("ShaderNodeMapRange")
    fade.inputs["From Min"].default_value = 0.0
    fade.inputs["From Max"].default_value = 1.0
    fade.inputs["To Min"].default_value = 1.0
    fade.inputs["To Max"].default_value = 0.0
    L.new(sep.outputs["Z"], fade.inputs["Value"])
    fp = nt.nodes.new("ShaderNodeMath")
    fp.operation = "POWER"
    fp.inputs[1].default_value = 1.6
    L.new(fade.outputs["Result"], fp.inputs[0])
    lw = nt.nodes.new("ShaderNodeLayerWeight")
    lw.inputs["Blend"].default_value = 0.5
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    L.new(lw.outputs["Facing"], inv.inputs[1])
    pw = nt.nodes.new("ShaderNodeMath")
    pw.operation = "POWER"
    pw.inputs[1].default_value = 2.5
    L.new(inv.outputs[0], pw.inputs[0])
    m1 = nt.nodes.new("ShaderNodeMath")
    m1.operation = "MULTIPLY"
    L.new(pw.outputs[0], m1.inputs[0])
    L.new(fp.outputs[0], m1.inputs[1])
    m2 = nt.nodes.new("ShaderNodeMath")
    m2.operation = "MULTIPLY"
    m2.name = "Str"
    m2.inputs[1].default_value = strength
    L.new(m1.outputs[0], m2.inputs[0])
    em = nt.nodes.new("ShaderNodeEmission")
    em.name = "Em"
    em.inputs["Color"].default_value = color
    L.new(m2.outputs[0], em.inputs["Strength"])
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    add = nt.nodes.new("ShaderNodeAddShader")
    L.new(em.outputs[0], add.inputs[0])
    L.new(tr.outputs[0], add.inputs[1])
    L.new(add.outputs[0], out.inputs["Surface"])
    ob.data.materials.append(m)
    ob.visible_shadow = False
    ob.visible_diffuse = False
    return ob, m


def point_light(name, color, energy=1000.0, radius=0.5):
    ld = bpy.data.lights.new(name, "POINT")
    ld.color = color[:3]
    ld.energy = energy
    ld.shadow_soft_size = radius
    ob = bpy.data.objects.new(name, ld)
    link_obj(ob)
    return ob


def key_light(ob, energy, frame, color=None):
    ob.data.energy = energy
    ob.data.keyframe_insert("energy", frame=frame)
    if color is not None:
        ob.data.color = color[:3]
        ob.data.keyframe_insert("color", frame=frame)


def sea_shockwave_gn(sea_ob):
    """GN modifier after the Ocean: raises a travelling ring wave. Inputs: Radius, Amp, Width (keyframe on modifier)."""
    tree = bpy.data.node_groups.new("ShockwaveGN", "GeometryNodeTree")
    I = tree.interface
    I.new_socket("Geometry", in_out="INPUT", socket_type="NodeSocketGeometry")
    for nm, dv in (("Radius", 0.0), ("Amp", 0.0), ("Width", 6.0)):
        s = I.new_socket(nm, in_out="INPUT", socket_type="NodeSocketFloat")
        s.default_value = dv
    I.new_socket("Center", in_out="INPUT", socket_type="NodeSocketVector")
    I.new_socket("Geometry", in_out="OUTPUT", socket_type="NodeSocketGeometry")
    N, L = tree.nodes, tree.links
    gi = N.new("NodeGroupInput")
    go = N.new("NodeGroupOutput")
    pos = N.new("GeometryNodeInputPosition")
    sub = N.new("ShaderNodeVectorMath")
    sub.operation = "SUBTRACT"
    L.new(pos.outputs[0], sub.inputs[0])
    L.new(gi.outputs["Center"], sub.inputs[1])
    flat = N.new("ShaderNodeVectorMath")
    flat.operation = "MULTIPLY"
    flat.inputs[1].default_value = (1, 1, 0)
    L.new(sub.outputs[0], flat.inputs[0])
    ln = N.new("ShaderNodeVectorMath")
    ln.operation = "LENGTH"
    L.new(flat.outputs[0], ln.inputs[0])
    d = N.new("ShaderNodeMath")
    d.operation = "SUBTRACT"
    L.new(ln.outputs["Value"], d.inputs[0])
    L.new(gi.outputs["Radius"], d.inputs[1])
    q = N.new("ShaderNodeMath")
    q.operation = "DIVIDE"
    L.new(d.outputs[0], q.inputs[0])
    L.new(gi.outputs["Width"], q.inputs[1])
    sq = N.new("ShaderNodeMath")
    sq.operation = "MULTIPLY"
    L.new(q.outputs[0], sq.inputs[0])
    L.new(q.outputs[0], sq.inputs[1])
    neg = N.new("ShaderNodeMath")
    neg.operation = "MULTIPLY"
    neg.inputs[1].default_value = -1.0
    L.new(sq.outputs[0], neg.inputs[0])
    ex = N.new("ShaderNodeMath")
    ex.operation = "EXPONENT"
    L.new(neg.outputs[0], ex.inputs[0])
    amp = N.new("ShaderNodeMath")
    amp.operation = "MULTIPLY"
    L.new(ex.outputs[0], amp.inputs[0])
    L.new(gi.outputs["Amp"], amp.inputs[1])
    comb = N.new("ShaderNodeCombineXYZ")
    L.new(amp.outputs[0], comb.inputs["Z"])
    sp = N.new("GeometryNodeSetPosition")
    L.new(gi.outputs["Geometry"], sp.inputs["Geometry"])
    L.new(comb.outputs[0], sp.inputs["Offset"])
    L.new(sp.outputs[0], go.inputs[0])
    mod = sea_ob.modifiers.new("Shockwave", "NODES")
    mod.node_group = tree
    return mod


def key_mod_input(mod, name, value, frame):
    ident = next(it.identifier for it in mod.node_group.interface.items_tree
                 if getattr(it, "in_out", None) == "INPUT" and it.name == name)
    sock = getattr(mod.properties.inputs, ident)
    sock.value = value
    sock.keyframe_insert("value", frame=frame)
