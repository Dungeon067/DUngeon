"""Build and render one cinematic shot headless.

blender -b --factory-startup -P build.py -- --shot s4 --variant 5a --res 1920x1080 --samples 96 \
        --frames 1-60 --out ../out/frames/5a/s4
"""
import argparse
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy  # noqa: E402
from cine import common as C, shots as S  # noqa: E402

VARIANTS = {
    "3": {"rarity": 3}, "4": {"rarity": 4},
    "5a": {"rarity": 5, "style": "a"}, "5b": {"rarity": 5, "style": "b"},
    "10x4": {"rarity": 4, "multi": True}, "10x5": {"rarity": 5, "multi": True},
}


def parse_frames(spec, f0, f1):
    if not spec:
        return list(range(f0, f1 + 1))
    out = []
    for part in spec.split(","):
        if "-" in part:
            a, b = part.split("-")
            out += list(range(int(a), int(b) + 1))
        else:
            out.append(int(part))
    return sorted(set(x for x in out if f0 <= x <= f1))


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    ap = argparse.ArgumentParser()
    ap.add_argument("--shot", required=True, choices=sorted(S.SHOTS))
    ap.add_argument("--variant", default="5a", choices=sorted(VARIANTS))
    ap.add_argument("--res", default="1920x1080")
    ap.add_argument("--samples", type=int, default=96)
    ap.add_argument("--frames", default="")
    ap.add_argument("--out", required=True)
    ap.add_argument("--save-blend", action="store_true")
    ap.add_argument("--hide", default="", help="debug: comma list of object name prefixes to hide")
    a = ap.parse_args(argv)
    w, h = (int(x) for x in a.res.split("x"))
    os.makedirs(a.out, exist_ok=True)
    cache = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "build-cache")
    os.makedirs(cache, exist_ok=True)
    scene = C.reset_scene()
    C.setup_render(scene, res=(w, h), samples=a.samples)
    shot = S.SHOTS[a.shot](VARIANTS[a.variant], cache)
    scene.frame_start, scene.frame_end = shot.f0, shot.f1
    for pre in filter(None, a.hide.split(",")):
        for ob in bpy.data.objects:
            if ob.name.startswith(pre):
                ob.hide_render = True
    if a.save_blend:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(a.out, f"{a.shot}.blend"))
    todo = parse_frames(a.frames, shot.f0, shot.f1)
    last = max(todo)
    for f in range(shot.f0, last + 1):
        scene.frame_set(f)
        shot.update(f)
        if f in todo:
            t = time.time()
            scene.render.filepath = os.path.join(a.out, f"{f:04d}.png")
            bpy.ops.render.render(write_still=True)
            print(f"FRAME {f} {time.time() - t:.1f}s", flush=True)
    if shot.meta is not None:
        import json
        with open(os.path.join(a.out, "meta.json"), "w") as fh:
            json.dump(shot.meta, fh)


main()
