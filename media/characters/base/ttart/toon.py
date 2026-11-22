"""Vật liệu tô màu phẳng dùng chung (Eevee, half-Lambert theo hướng đèn cố định) và viền."""

import bpy

from .util import hue_shift_shadow, lin, shade

STYLE = {
    "tang_bong": 3,  # 2 hoặc 3 tầng bóng
    "nguong": (0.5, 0.28),  # ngưỡng half-Lambert: sáng/bóng 1 và bóng 1/bóng 2
    "rim": True,
    "rim_manh": 0.85,
    "rim_mau": "#ff6a3d",
    "vien": "vo",  # "vo" (vỏ đảo ngược), "freestyle", "khong"
    "vien_day": 0.006,  # mét, cho viền vỏ
}


def _group():
    g = bpy.data.node_groups.get("TT_Toon")
    if g:
        return g
    g = bpy.data.node_groups.new("TT_Toon", "ShaderNodeTree")
    it = g.interface
    for n, t in (("Mau", "NodeSocketColor"), ("Bong1", "NodeSocketColor"), ("Bong2", "NodeSocketColor"),
                 ("RimMau", "NodeSocketColor"), ("RimManh", "NodeSocketFloat"), ("BaTang", "NodeSocketFloat"),
                 ("Nguong1", "NodeSocketFloat"), ("Nguong2", "NodeSocketFloat"), ("PhatSang", "NodeSocketColor"),
                 ("Alpha", "NodeSocketFloat")):
        it.new_socket(n, in_out="INPUT", socket_type=t)
    it.new_socket("Shader", in_out="OUTPUT", socket_type="NodeSocketShader")
    N, Lk = g.nodes, g.links
    gi, go = N.new("NodeGroupInput"), N.new("NodeGroupOutput")
    geo = N.new("ShaderNodeNewGeometry")
    # Hướng đèn và trục ngang máy quay (hệ thế giới), dùng chung cho mọi vật liệu.
    # scene.set_view() cập nhật hai nút này theo máy quay nên bóng không phụ thuộc shadow map.
    ld = N.new("ShaderNodeCombineXYZ")
    ld.name = "TT_LightDir"
    cr = N.new("ShaderNodeCombineXYZ")
    cr.name = "TT_CamRight"
    for nd, val in ((ld, (-0.45, -0.55, 0.7)), (cr, (1.0, 0.0, 0.0))):
        for i, x in enumerate(val):
            nd.inputs[i].default_value = x

    def dot(a, b):
        m = N.new("ShaderNodeVectorMath")
        m.operation = "DOT_PRODUCT"
        Lk.new(a, m.inputs[0])
        Lk.new(b, m.inputs[1])
        return m.outputs["Value"]

    def gt(a, b):
        m = N.new("ShaderNodeMath")
        m.operation = "GREATER_THAN"
        Lk.new(a, m.inputs[0])
        Lk.new(b, m.inputs[1])
        return m.outputs[0]

    def mix(fac, a, b):
        m = N.new("ShaderNodeMix")
        m.data_type = "RGBA"
        Lk.new(fac, m.inputs["Factor"])
        Lk.new(a, m.inputs["A"])
        Lk.new(b, m.inputs["B"])
        return m.outputs["Result"]

    def math(op, a, b=None, val=None):
        m = N.new("ShaderNodeMath")
        m.operation = op
        Lk.new(a, m.inputs[0])
        if b is not None:
            Lk.new(b, m.inputs[1])
        elif val is not None:
            m.inputs[1].default_value = val
        return m.outputs[0]

    # Half-Lambert: 1 = hướng thẳng vào đèn, 0.5 = đường phân sáng tối, 0 = quay lưng.
    lam = math("MULTIPLY_ADD", dot(geo.outputs["Normal"], ld.outputs[0]), val=0.5)
    lam.node.inputs[2].default_value = 0.5
    s1 = gt(lam, gi.outputs["Nguong1"])
    s2 = gt(lam, gi.outputs["Nguong2"])
    # Hai tầng: chỉ dùng s1. Ba tầng: vùng tối nhất dùng Bong2.
    dark = mix(s2, gi.outputs["Bong2"], gi.outputs["Bong1"])
    dark = mix(gi.outputs["BaTang"], gi.outputs["Bong1"], dark)
    col = mix(s1, dark, gi.outputs["Mau"])

    # Đèn viền: mép vật thể ở nửa phải màn hình (phía ngược đèn chính).
    facing = dot(geo.outputs["Normal"], geo.outputs["Incoming"])
    edge = math("LESS_THAN", facing, val=0.42)
    side = math("GREATER_THAN", dot(geo.outputs["Normal"], cr.outputs[0]), val=0.3)
    rim = math("MULTIPLY", edge, side)
    rim = math("MULTIPLY", rim, gi.outputs["RimManh"])
    col = mix(rim, col, gi.outputs["RimMau"])

    add = N.new("ShaderNodeMix")
    add.data_type = "RGBA"
    add.blend_type = "ADD"
    add.inputs["Factor"].default_value = 1.0
    Lk.new(col, add.inputs["A"])
    Lk.new(gi.outputs["PhatSang"], add.inputs["B"])
    em = N.new("ShaderNodeEmission")
    Lk.new(add.outputs["Result"], em.inputs["Color"])
    tr = N.new("ShaderNodeBsdfTransparent")
    mx = N.new("ShaderNodeMixShader")
    Lk.new(gi.outputs["Alpha"], mx.inputs[0])
    Lk.new(tr.outputs[0], mx.inputs[1])
    Lk.new(em.outputs[0], mx.inputs[2])
    Lk.new(mx.outputs[0], go.inputs[0])
    return g


def toon_material(name, color, style=None, shadow=None, shadow2=None, emit=None, rim=True):
    """Tạo vật liệu toon. Trả về (material, node nhóm) để nối thêm texture nếu cần."""
    st = dict(STYLE, **(style or {}))
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    gn = nt.nodes.new("ShaderNodeGroup")
    gn.node_tree = _group()
    sh1 = shadow or hue_shift_shadow(color, 0.28)
    sh2 = shadow2 or hue_shift_shadow(color, 0.5)
    gn.inputs["Mau"].default_value = lin(color)
    gn.inputs["Bong1"].default_value = lin(sh1)
    gn.inputs["Bong2"].default_value = lin(sh2)
    gn.inputs["RimMau"].default_value = lin(shade(st["rim_mau"], 0.25))
    gn.inputs["RimManh"].default_value = st["rim_manh"] if (st["rim"] and rim) else 0.0
    gn.inputs["BaTang"].default_value = 1.0 if st["tang_bong"] >= 3 else 0.0
    gn.inputs["Nguong1"].default_value = st["nguong"][0]
    gn.inputs["Nguong2"].default_value = st["nguong"][1]
    gn.inputs["PhatSang"].default_value = lin(emit) if emit else (0, 0, 0, 1)
    gn.inputs["Alpha"].default_value = 1.0
    nt.links.new(gn.outputs[0], out.inputs["Surface"])
    m["tt_color"] = color
    return m, gn


def emission_material(name, color, strength=1.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = lin(color)
    em.inputs["Strength"].default_value = strength
    nt.links.new(em.outputs[0], out.inputs["Surface"])
    return m


def outline_material(color="#1c1222"):
    m = bpy.data.materials.get("TT_Vien")
    if m:
        return m
    m = emission_material("TT_Vien", color)
    m.use_backface_culling = True
    return m


def add_hull_outline(obj, thickness):
    """Viền bằng vỏ đảo ngược: Solidify lật pháp tuyến, chỉ thấy mặt sau."""
    if obj.type != "MESH" or obj.get("tt_no_outline"):
        return
    n = max(1, len(obj.data.materials))
    if not obj.data.materials:
        obj.data.materials.append(outline_material())
    ol = outline_material()
    for _ in range(n):
        obj.data.materials.append(ol)
    sm = obj.modifiers.new("vien", "SOLIDIFY")
    sm.thickness = thickness * obj.get("tt_outline_k", 1.0)
    sm.offset = 1.0
    sm.use_flip_normals = True
    sm.use_rim = False
    sm.material_offset = n
    sm.use_quality_normals = True


def setup_freestyle(scene, px=1.4, color="#1c1222"):
    from .util import hex_to_rgb

    scene.render.use_freestyle = True
    scene.render.line_thickness_mode = "ABSOLUTE"
    scene.render.line_thickness = px
    vl = scene.view_layers[0]
    fs = vl.freestyle_settings
    ls = fs.linesets[0] if fs.linesets else fs.linesets.new("vien")
    ls.select_by_visibility = True
    ls.select_by_edge_types = True
    ls.select_silhouette = True
    ls.select_border = True
    ls.select_crease = True
    ls.select_contour = True
    fs.crease_angle = 1.95
    if ls.linestyle is None:
        import bpy

        ls.linestyle = bpy.data.linestyles.new("vien")
    ls.linestyle.color = hex_to_rgb(color)
    ls.linestyle.thickness = px


def set_view(light_dir, cam_right):
    """Cập nhật hướng đèn (vector chỉ về phía đèn) và trục ngang máy quay cho mọi vật liệu toon."""
    g = _group()
    for name, v in (("TT_LightDir", light_dir), ("TT_CamRight", cam_right)):
        nd = g.nodes[name]
        for i in range(3):
            nd.inputs[i].default_value = v[i]
