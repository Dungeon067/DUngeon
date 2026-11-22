"""Shared helpers: scene reset, render settings, compositor, materials, easing."""
import math
import bpy

PALETTE = {
    "night": (0.004, 0.005, 0.016),
    "indigo": (0.012, 0.016, 0.060),
    "moon": (1.0, 0.93, 0.72),
    "bronze": (0.62, 0.40, 0.20),
    "gold": (1.0, 0.811, 0.353),   # #ffcf5a
    "violet": (0.725, 0.549, 1.0),  # #b98cff
    "sky": (0.435, 0.714, 1.0),     # #6fb6ff
}
RARITY_COLOR = {3: "sky", 4: "violet", 5: "gold"}


def srgb_to_linear(c):
    return tuple(((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4) for x in c)


def col(name, a=1.0):
    r, g, b = srgb_to_linear(PALETTE[name])
    return (r, g, b, a)


def lerp(a, b, t):
    return a + (b - a) * t


def lerp3(a, b, t):
    return tuple(lerp(x, y, t) for x, y in zip(a, b))


def clamp(v, a=0.0, b=1.0):
    return a if v < a else b if v > b else v


def smooth(t):
    t = clamp(t)
    return t * t * (3 - 2 * t)


def ease_in(t):
    t = clamp(t)
    return t * t * t


def ease_out(t):
    t = clamp(t)
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    t = clamp(t)
    return 4 * t * t * t if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = "cine"
    return scene


def setup_render(scene, res=(1920, 1080), pct=100, samples=128, fps=30,
                 motion_blur=True, shutter=0.5, exposure=0.0, threads=0):
    r = scene.render
    r.engine = "CYCLES"
    r.resolution_x, r.resolution_y = res
    r.resolution_percentage = pct
    r.fps = fps
    r.use_motion_blur = motion_blur
    r.motion_blur_shutter = shutter
    r.film_transparent = False
    r.image_settings.file_format = "PNG"
    r.image_settings.color_depth = "16"
    r.image_settings.color_mode = "RGB"
    r.use_persistent_data = True
    if threads:
        r.threads_mode = "FIXED"
        r.threads = threads
    c = scene.cycles
    c.device = "CPU"
    c.samples = samples
    c.use_adaptive_sampling = True
    c.adaptive_threshold = 0.02
    c.use_denoising = True
    c.denoiser = "OPENIMAGEDENOISE"
    c.denoising_input_passes = "RGB_ALBEDO_NORMAL"
    c.max_bounces = 6
    c.diffuse_bounces = 2
    c.glossy_bounces = 3
    c.transmission_bounces = 4
    c.volume_bounces = 1
    c.transparent_max_bounces = 16
    c.volume_step_rate = 2.0
    c.caustics_reflective = False
    c.caustics_refractive = False
    c.blur_glossy = 1.0
    c.sample_clamp_indirect = 8.0
    c.seed = 7
    c.use_animated_seed = True
    vs = scene.view_settings
    vs.view_transform = "AgX"
    try:
        vs.look = "AgX - Medium High Contrast"
    except TypeError:
        pass
    vs.exposure = exposure
    scene.display_settings.display_device = "sRGB"


def node_tree_material(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    return m, nt, out


def emission_material(name, color, strength, alpha_fresnel=False):
    m, nt, out = node_tree_material(name)
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = color
    em.inputs["Strength"].default_value = strength
    if alpha_fresnel:
        lw = nt.nodes.new("ShaderNodeLayerWeight")
        lw.inputs["Blend"].default_value = 0.35
        tr = nt.nodes.new("ShaderNodeBsdfTransparent")
        mix = nt.nodes.new("ShaderNodeMixShader")
        inv = nt.nodes.new("ShaderNodeMath")
        inv.operation = "SUBTRACT"
        inv.inputs[0].default_value = 1.0
        nt.links.new(lw.outputs["Facing"], inv.inputs[1])
        nt.links.new(inv.outputs[0], mix.inputs[0])
        nt.links.new(tr.outputs[0], mix.inputs[1])
        nt.links.new(em.outputs[0], mix.inputs[2])
        nt.links.new(mix.outputs[0], out.inputs["Surface"])
    else:
        nt.links.new(em.outputs[0], out.inputs["Surface"])
    return m


def attr_emission_material(name, strength_scale=1.0):
    """Emission driven by mesh attributes 'col' (color) and 'glow' (strength), additive via transparency."""
    m, nt, out = node_tree_material(name)
    a_col = nt.nodes.new("ShaderNodeAttribute")
    a_col.attribute_name = "col"
    a_glow = nt.nodes.new("ShaderNodeAttribute")
    a_glow.attribute_name = "glow"
    mul = nt.nodes.new("ShaderNodeMath")
    mul.operation = "MULTIPLY"
    mul.inputs[1].default_value = strength_scale
    nt.links.new(a_glow.outputs["Fac"], mul.inputs[0])
    em = nt.nodes.new("ShaderNodeEmission")
    nt.links.new(a_col.outputs["Color"], em.inputs["Color"])
    nt.links.new(mul.outputs[0], em.inputs["Strength"])
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    add = nt.nodes.new("ShaderNodeAddShader")
    nt.links.new(em.outputs[0], add.inputs[0])
    nt.links.new(tr.outputs[0], add.inputs[1])
    nt.links.new(add.outputs[0], out.inputs["Surface"])
    return m


def link_obj(obj, collection=None):
    (collection or bpy.context.scene.collection).objects.link(obj)
    return obj


def new_mesh_obj(name, verts, faces, collection=None):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    ob = bpy.data.objects.new(name, me)
    return link_obj(ob, collection)


def key_obj_path(ob, frames, fn, rot=False):
    """fn(frame) -> (loc, rot_euler or None). Keyframes every frame (linear)."""
    for f in frames:
        loc, r = fn(f)
        ob.location = loc
        ob.keyframe_insert("location", frame=f)
        if rot and r is not None:
            ob.rotation_euler = r
            ob.keyframe_insert("rotation_euler", frame=f)
    set_linear(ob)


def set_linear(idblock):
    ad = idblock.animation_data
    if not ad or not ad.action:
        return
    try:
        curves = ad.action.fcurves
    except AttributeError:
        curves = []
        for layer in ad.action.layers:
            for strip in layer.strips:
                for bag in strip.channelbags:
                    curves.extend(bag.fcurves)
    for fc in curves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"


def add_camera(name="Cam", lens=35.0, sensor=36.0):
    cd = bpy.data.cameras.new(name)
    cd.lens = lens
    cd.sensor_width = sensor
    cd.clip_start = 0.1
    cd.clip_end = 20000
    ob = bpy.data.objects.new(name, cd)
    link_obj(ob)
    bpy.context.scene.camera = ob
    return ob


def look_at_euler(src, dst, roll=0.0):
    from mathutils import Vector
    d = Vector(dst) - Vector(src)
    q = d.to_track_quat("-Z", "Y")
    e = q.to_euler()
    if roll:
        from mathutils import Matrix
        m = q.to_matrix() @ Matrix.Rotation(roll, 3, "Z")
        e = m.to_euler()
    return e


def handheld(t, amp=1.0, seed=0.0):
    """Smooth pseudo-random shake (radians) for a handheld feel."""
    def n(x):
        return (math.sin(x * 1.7 + seed) * 0.5 + math.sin(x * 3.1 + seed * 2.3) * 0.3
                + math.sin(x * 5.9 + seed * 4.1) * 0.2)
    return (n(t) * 0.004 * amp, n(t + 11.3) * 0.004 * amp, n(t + 23.7) * 0.002 * amp)


def setup_compositor(scene, glare=0.6, dispersion=0.012, vignette=0.35, bloom_size=0.6,
                     streaks=False, mist=None):
    """mist=(rgb, amount, start, depth): distance haze from the Mist pass (cheap aerial perspective)."""
    tree = bpy.data.node_groups.new("Post", "CompositorNodeTree")
    scene.compositing_node_group = tree
    tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    N = tree.nodes
    L = tree.links
    rl = N.new("CompositorNodeRLayers")
    gl = N.new("CompositorNodeGlare")
    gl.inputs["Type"].default_value = "Bloom"
    gl.inputs["Quality"].default_value = "High"
    gl.inputs["Threshold"].default_value = 0.9
    gl.inputs["Strength"].default_value = glare
    gl.inputs["Size"].default_value = bloom_size
    img = rl.outputs["Image"]
    if mist:
        mcol, amount, start, depth = mist
        bpy.context.view_layer.use_pass_mist = True
        w = scene.world
        w.mist_settings.start = start
        w.mist_settings.depth = depth
        w.mist_settings.falloff = "QUADRATIC"
        mul = N.new("ShaderNodeMath")
        mul.operation = "MULTIPLY"
        mul.inputs[1].default_value = amount
        L.new(rl.outputs["Mist"], mul.inputs[0])
        mm = N.new("ShaderNodeMix")
        mm.data_type = "RGBA"
        mm.blend_type = "MIX"
        mm.inputs["B"].default_value = (*srgb_to_linear(mcol), 1)
        L.new(mul.outputs[0], mm.inputs["Factor"])
        L.new(img, mm.inputs["A"])
        img = mm.outputs["Result"]
    L.new(img, gl.inputs["Image"])
    last = gl.outputs["Image"]
    if streaks:
        st = N.new("CompositorNodeGlare")
        st.inputs["Type"].default_value = "Streaks"
        st.inputs["Quality"].default_value = "High"
        st.inputs["Threshold"].default_value = 4.0
        st.inputs["Strength"].default_value = 0.25
        st.inputs["Streaks"].default_value = 4
        st.inputs["Streaks Angle"].default_value = math.radians(12)
        st.inputs["Fade"].default_value = 0.88
        L.new(last, st.inputs["Image"])
        last = st.outputs["Image"]
    ld = N.new("CompositorNodeLensdist")
    ld.inputs["Dispersion"].default_value = dispersion
    ld.inputs["Distortion"].default_value = 0.0
    ld.inputs["Jitter"].default_value = False
    L.new(last, ld.inputs["Image"])
    last = ld.outputs["Image"]
    em = N.new("CompositorNodeEllipseMask")
    em.inputs["Size"].default_value = (1.25, 1.25)
    blur = N.new("CompositorNodeBlur")
    try:
        blur.inputs["Size"].default_value = (400, 400)
    except Exception:
        pass
    L.new(em.outputs["Mask"], blur.inputs["Image"])
    mix = N.new("CompositorNodeMixRGB") if hasattr(bpy.types, "CompositorNodeMixRGB") else N.new("ShaderNodeMix")
    if mix.bl_idname == "ShaderNodeMix":
        mix.data_type = "RGBA"
        mix.blend_type = "MULTIPLY"
        mix.inputs["Factor"].default_value = vignette
        L.new(last, mix.inputs["A"])
        L.new(blur.outputs["Image"], mix.inputs["B"])
        out_sock = mix.outputs["Result"]
    else:
        mix.blend_type = "MULTIPLY"
        mix.inputs[0].default_value = vignette
        L.new(last, mix.inputs[1])
        L.new(blur.outputs[0], mix.inputs[2])
        out_sock = mix.outputs[0]
    go = N.new("NodeGroupOutput")
    L.new(out_sock, go.inputs[0])
    scene.render.use_compositing = True
    return tree
