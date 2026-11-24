"""Vật liệu hoạt hình cho Bảo Ấn (S31) trên Cycles: shading phân mảng 2–3 tông, highlight sắc, rim, viền Freestyle.

Mọi vật liệu tự tính sáng từ hướng nhìn (Incoming) nên không phụ thuộc đèn trong cảnh. Màu ra qua Emission,
cường độ nhân với nút "toon_gate": đặt 0 khi render mặt nạ phát sáng để chỉ còn phần thật sự phát sáng.
"""
import bpy

from lib import hexc, new_mat

UP = (0.0, 0.0, 1.0)


def lighten(c, k):
    return tuple(x + (1 - x) * k for x in c[:3])


def scale(c, k):
    return tuple(x * k for x in c[:3])


def lerp(a, b, t):
    return tuple(x + (y - x) * t for x, y in zip(a[:3], b[:3]))


class _T:
    def __init__(self, n):
        self.n = n
        g = n.nodes.new("ShaderNodeNewGeometry")
        self.N, self.I = g.outputs["Normal"], g.outputs["Incoming"]
        side = self.norm(self.vm("CROSS_PRODUCT", UP, self.I))
        upv = self.vm("CROSS_PRODUCT", self.I, side)
        self.L = self.norm(self.add3(self.add3(self.vsc(self.I, 0.55), self.vsc(upv, 0.8)), self.vsc(side, -0.5)))
        self.Lr = self.norm(self.add3(self.add3(self.vsc(side, 0.95), self.vsc(upv, 0.25)), self.vsc(self.I, -0.35)))
        self.H = self.norm(self.add3(self.L, self.I))
        self.ndl = self.dot(self.N, self.L)
        self.ndi = self.dot(self.N, self.I)

    def vm(self, op, a, b=None):
        nd = self.n.nodes.new("ShaderNodeVectorMath")
        nd.operation = op
        self.n._set(nd.inputs[0], a)
        if b is not None:
            self.n._set(nd.inputs[1], b)
        return nd.outputs["Value"] if op in ("DOT_PRODUCT", "LENGTH") else nd.outputs["Vector"]

    def norm(self, a):
        return self.vm("NORMALIZE", a)

    def add3(self, a, b):
        return self.vm("ADD", a, b)

    def vsc(self, a, k):
        nd = self.n.nodes.new("ShaderNodeVectorMath")
        nd.operation = "SCALE"
        self.n._set(nd.inputs[0], a)
        nd.inputs["Scale"].default_value = k
        return nd.outputs["Vector"]

    def dot(self, a, b):
        return self.vm("DOT_PRODUCT", a, b)

    def step(self, x, edge, soft=0.012):
        return self.n.smooth(edge - soft, edge + soft, x)

    def mix(self, fac, a, b, blend="MIX"):
        nd = self.n.nodes.new("ShaderNodeMix")
        nd.data_type = "RGBA"
        nd.blend_type = blend
        self.n._set(nd.inputs[0], fac)
        cols = [s for s in nd.inputs if s.type == "RGBA"]
        self.n._set(cols[0], a)
        self.n._set(cols[1], b)
        return [s for s in nd.outputs if s.type == "RGBA"][0]

    def ramp(self, x, stops):
        nd = self.n.nodes.new("ShaderNodeValToRGB")
        cr = nd.color_ramp
        cr.interpolation = "CONSTANT"
        while len(cr.elements) < len(stops):
            cr.elements.new(0.5)
        for el, (pos, col) in zip(cr.elements, stops):
            el.position = pos
            el.color = tuple(col[:3]) + (1.0,)
        self.n._set(nd.inputs[0], x)
        return nd.outputs["Color"]

    def finish(self, col, rim, spec_col, spec=0.965, rim_k=0.85, alpha=None, extra=0.0, tint=None):
        n = self.n
        if spec < 1.0:
            col = self.mix(self.step(self.dot(self.N, self.H), spec, 0.006), col, spec_col)
        f = n.math("SUBTRACT", 1.0, self.ndi)
        r = n.math("MULTIPLY", self.step(f, 0.68), self.step(self.dot(self.N, self.Lr), 0.15))
        col = self.mix(n.math("MULTIPLY", r, rim_k), col, rim)
        gate = n.nodes.new("ShaderNodeValue")
        gate.name = gate.label = "toon_gate"
        gate.outputs[0].default_value = 1.0
        em = n.nodes.new("ShaderNodeEmission")
        n._set(em.inputs["Color"], col)
        n._set(em.inputs["Strength"], n.math("ADD", gate.outputs[0], extra) if extra else gate.outputs[0])
        out = n.nodes.get("Material Output") or n.nodes.new("ShaderNodeOutputMaterial")
        for nd in list(n.nodes):
            if nd.type == "BSDF_PRINCIPLED":
                n.nodes.remove(nd)
        if alpha is None:
            n.links.new(em.outputs[0], out.inputs["Surface"])
        else:
            tr = n.nodes.new("ShaderNodeBsdfTransparent")
            tr.inputs["Color"].default_value = tuple(tint or (1, 1, 1)) + (1.0,)
            mx = n.nodes.new("ShaderNodeMixShader")
            n._set(mx.inputs[0], alpha)
            n.links.new(tr.outputs[0], mx.inputs[1])
            n.links.new(em.outputs[0], mx.inputs[2])
            n.links.new(mx.outputs[0], out.inputs["Surface"])

    def tones(self, base, shade, light, t1=-0.08, t2=0.5):
        c_sh = self.mix(1.0, base, shade, "MULTIPLY")
        c_li = self.mix(0.45, base, light, "SCREEN")
        col = self.mix(self.step(self.ndl, t1), c_sh, base)
        return self.mix(self.step(self.ndl, t2), col, c_li)


def _mat(name):
    m, n = new_mat(name)
    m["toon"] = 1
    return m, n, _T(n)


def metal(name, color, cavity, P):
    """Kim loại vẽ tay: dải phản chiếu cách điệu (tối giữa, sáng trên), đốm sáng sắc."""
    m, n, t = _mat(name)
    c, d = hexc(color), hexc(cavity)
    R = t.vm("REFLECT", t.vsc(t.I, -1.0), t.N)
    rz = n.math("MULTIPLY_ADD", t.dot(R, UP), 0.5, 0.5)
    col = t.ramp(rz, [(0.0, lerp(c, d, 0.5)), (0.28, scale(c, 0.85)), (0.42, lerp(c, d, 0.6)), (0.49, c),
                      (0.7, lighten(c, 0.6))])
    col = t.mix(n.math("SUBTRACT", 1.0, t.step(t.ndl, -0.2)), col, t.mix(1.0, col, P["bong"], "MULTIPLY"))
    t.finish(col, lighten(P["rim"], 0.3), (1, 1, 1), 0.955)
    return m


def enamel(name, c0, c1, lo, hi, mode, P, glow=0.0):
    m, n, t = _mat(name)
    base = hexc(c0)
    if c1:
        co = n.obj_co()
        x = (n.node("ShaderNodeVectorMath", co, operation="LENGTH").outputs["Value"] if mode == "R"
             else n.node("ShaderNodeSeparateXYZ", co).outputs[mode])
        base = t.mix(n.smooth(lo, hi, x), hexc(c0), hexc(c1))
    col = t.tones(base, P["bong"], (1.0, 0.97, 0.9))
    t.finish(col, P["rim"], lighten(hexc(c1 or c0), 0.8), 0.95, extra=glow)
    return m


def gem(name, color, P, light=None, extra=0.0, alpha=None):
    """Đá cắt giác kiểu anime: mỗi mặt cắt một tông rõ, mặt hướng sáng gần trắng, đốm lấp lánh."""
    m, n, t = _mat(name)
    c = hexc(color)
    deep = scale(c, 0.22)
    col = t.ramp(n.math("MULTIPLY_ADD", t.ndl, 0.5, 0.5),
                 [(0.0, deep), (0.36, scale(c, 0.6)), (0.55, c), (0.72, lighten(c, 0.45)),
                  (0.86, lighten(hexc(light) if light else c, 0.8))])
    core = t.step(t.ndi, 0.93, 0.02)
    col = t.mix(n.math("MULTIPLY", core, 0.6), col, lighten(c, 0.6))
    t.finish(col, lighten(P["rim"], 0.4), (1, 1, 1), 0.975, 0.7, alpha=alpha, extra=extra, tint=lighten(c, 0.5))
    return m


def ice(name, color, P):
    m, n, t = _mat(name)
    c = hexc(color)
    col = t.ramp(n.math("MULTIPLY_ADD", t.ndl, 0.5, 0.5),
                 [(0.0, scale(c, 0.5)), (0.4, scale(c, 0.8)), (0.6, c), (0.8, lighten(c, 0.75))])
    edge = t.step(n.math("SUBTRACT", 1.0, t.ndi), 0.5, 0.03)
    alpha = n.math("ADD", n.math("MULTIPLY", edge, 0.35), 0.55)
    t.finish(col, (1, 1, 1), (1, 1, 1), 0.96, alpha=alpha, tint=lighten(c, 0.4))
    return m


def crystal_glass(name, color, P):
    """Pha lê trong: giữa gần như trong suốt, mép và dải sáng vẽ sắc."""
    m, n, t = _mat(name)
    c = hexc(color)
    col = t.ramp(n.math("MULTIPLY_ADD", t.ndl, 0.5, 0.5), [(0.0, scale(c, 0.55)), (0.5, c), (0.78, lighten(c, 0.85))])
    f = n.math("SUBTRACT", 1.0, t.ndi)
    edge = t.step(f, 0.55, 0.03)
    band = n.math("MULTIPLY", t.step(t.dot(t.N, t.L), 0.62, 0.01), n.math("SUBTRACT", 1.0, t.step(t.ndl, 0.74, 0.01)))
    alpha = n.math("MINIMUM", n.math("ADD", n.math("ADD", n.math("MULTIPLY", edge, 0.7), n.math("MULTIPLY", band, 0.6)),
                                     0.1), 1.0)
    t.finish(col, (1, 1, 1), (1, 1, 1), 0.95, 1.0, alpha=alpha, tint=lighten(c, 0.75))
    return m


def pearl(name, P, color="#fbf4ee"):
    m, n, t = _mat(name)
    col = t.tones(hexc(color), hexc("#b8a8e0"), (1, 1, 1), -0.25, 0.45)
    t.finish(col, lighten(P["rim"], 0.5), (1, 1, 1), 0.95)
    return m


def cloth(name, color, P):
    m, n, t = _mat(name)
    t.finish(t.tones(hexc(color), P["bong"], (1, 0.95, 0.9)), P["rim"], (1, 1, 1), 2.0, 0.6)
    return m


def paper(name, color, P, glow=0.6):
    m, n, t = _mat(name)
    t.finish(t.tones(hexc(color), P["bong"], (1, 0.98, 0.85), -0.4, 0.3), P["rim"], (1, 1, 1), 2.0, extra=glow)
    return m


def gates(value):
    for m in bpy.data.materials:
        if m.get("toon") and m.node_tree:
            for nd in m.node_tree.nodes:
                if nd.name == "toon_gate":
                    nd.outputs[0].default_value = value


def setup(sc, line_color, thick_out, thick_in):
    """Màu tươi (Standard), viền tối mảnh quanh silhouette bằng Freestyle."""
    sc.view_settings.view_transform = "Standard"
    sc.view_settings.look = "None"
    sc.cycles.use_denoising = False
    sc.cycles.transparent_max_bounces = 24
    sc.render.use_freestyle = True
    sc.render.line_thickness_mode = "ABSOLUTE"
    sc.render.line_thickness = 1.0
    fs = sc.view_layers[0].freestyle_settings
    fs.crease_angle = 2.4
    while len(fs.linesets):
        fs.linesets.remove(fs.linesets[0])
    for nm, th, ext in (("vien_ngoai", thick_out, True), ("vien_trong", thick_in, False)):
        ls = fs.linesets.new(nm)
        ls.select_by_visibility = True
        ls.select_by_edge_types = True
        ls.select_silhouette = not ext
        ls.select_border = not ext
        ls.select_crease = False
        ls.select_external_contour = ext
        ls.linestyle.color = line_color[:3]
        ls.linestyle.thickness = th
        ls.linestyle.alpha = 1.0 if ext else 0.75
