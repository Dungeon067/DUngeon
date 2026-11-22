"""Ánh sáng, máy quay, thiết lập render chung.

Quy ước: đèn chính chiếu từ trên bên trái màn hình, cố định theo máy quay.
Khi render nhiều hướng, xoay nhân vật chứ không xoay máy quay hay đèn.
"""

import math

import bpy
from mathutils import Vector

from .toon import set_view
from .util import hex_to_rgb


def setup_render(scene, w, h, samples=16, transparent=True):
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x, scene.render.resolution_y = w, h
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = transparent
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    ee = scene.eevee
    ee.taa_render_samples = samples
    if hasattr(ee, "use_shadows"):
        ee.use_shadows = True
    if scene.world is None:
        scene.world = bpy.data.worlds.new("the_gioi")
    scene.world.use_nodes = True
    bg = scene.world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs["Color"].default_value = (0, 0, 0, 1)
        bg.inputs["Strength"].default_value = 0.0


def _aim(obj, target):
    d = Vector(target) - obj.location
    obj.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


def key_light(cam, strength=3.2, color="#fff4e6"):
    """Đèn mặt trời từ trên trái màn hình (so với máy quay)."""
    li = bpy.data.lights.new("den_chinh", "SUN")
    li.energy = strength
    li.color = hex_to_rgb(color)
    li.angle = math.radians(2)
    ob = bpy.data.objects.new("den_chinh", li)
    bpy.context.scene.collection.objects.link(ob)
    m = cam.matrix_world.to_3x3()
    right, up, fwd = m.col[0], m.col[1], -m.col[2]
    d = (right * 0.85 - up * 1.0 + fwd * 0.9).normalized()
    ob.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    set_view(-d, right)
    return ob


def camera_portrait(target_z, height, aspect=0.75, lens=55, tilt=6):
    """Máy quay phối cảnh cho tranh toàn thân. height: chiều cao khung cần thấy (m)."""
    cd = bpy.data.cameras.new("may_quay")
    cd.lens = lens
    cd.sensor_fit = "VERTICAL"
    cd.sensor_height = 24
    dist = height / 2 / math.tan(math.atan(12 / lens))
    cam = bpy.data.objects.new("may_quay", cd)
    bpy.context.scene.collection.objects.link(cam)
    t = math.radians(tilt)
    cam.location = (0, -dist * math.cos(t), target_z + dist * math.sin(t))
    _aim(cam, (0, 0, target_z))
    bpy.context.scene.camera = cam
    bpy.context.view_layer.update()
    return cam


def camera_sprite(height, elev=40, target_z=None):
    """Máy quay trực giao nghiêng `elev` độ cho sprite trong game."""
    cd = bpy.data.cameras.new("may_quay_sprite")
    cd.type = "ORTHO"
    cd.ortho_scale = height
    cam = bpy.data.objects.new("may_quay_sprite", cd)
    bpy.context.scene.collection.objects.link(cam)
    e = math.radians(elev)
    tz = target_z if target_z is not None else height * 0.42
    cam.location = (0, -10 * math.cos(e), tz + 10 * math.sin(e))
    _aim(cam, (0, 0, tz))
    bpy.context.scene.camera = cam
    bpy.context.view_layer.update()
    return cam
