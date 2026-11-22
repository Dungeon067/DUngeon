"""Render ảnh mẫu phong cách (mốc duyệt 1).

blender -b --factory-startup -P mau.py -- jobs.json
jobs.json: [{"spec": {...}, "renders": [{"out": "...png", "cam": "full|half|sprite", "w": 768, "h": 1024,
            "huong": 0}]}]
`huong`: góc xoay nhân vật quanh trục đứng (0 = nhìn xuống máy quay).
"""

import json
import math
import os
import sys

import bpy

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from build import build_character  # noqa: E402
from ttart.scene import camera_portrait, camera_sprite, key_light, setup_render  # noqa: E402
from ttart.toon import setup_freestyle  # noqa: E402


def render_one(info, r):
    scene = bpy.context.scene
    for o in [o for o in bpy.data.objects if o.type in ("CAMERA", "LIGHT")]:
        bpy.data.objects.remove(o)
    body = info["body"]
    rig = info["rig"]
    rig.rotation_euler = (0, 0, math.radians(r.get("huong", 0)))
    bpy.context.view_layer.update()
    H = body.H
    setup_render(scene, r["w"], r["h"], samples=r.get("samples", 16))
    if r["cam"] == "full":
        cam = camera_portrait(H * 0.5, H * 1.12, lens=r.get("lens", 60), tilt=6)
    elif r["cam"] == "half":
        cam = camera_portrait(H - body.h * 1.6, body.h * 3.4, lens=r.get("lens", 70), tilt=4)
    else:
        cam = camera_sprite(H * 1.22, elev=r.get("elev", 40), target_z=H * 0.47)
    key_light(cam, strength=r.get("den", 3.2))
    if info["style"]["vien"] == "freestyle":
        setup_freestyle(scene, px=r.get("vien_px", 1.6 * r["h"] / 1024))
    else:
        scene.render.use_freestyle = False
    scene.render.filepath = os.path.abspath(r["out"])
    bpy.ops.render.render(write_still=True)


def main():
    args = sys.argv[sys.argv.index("--") + 1:]
    with open(args[0], encoding="utf-8") as f:
        jobs = json.load(f)
    for job in jobs:
        info = build_character(job["spec"])
        for r in job["renders"]:
            render_one(info, r)


if __name__ == "__main__":
    main()
