"""Đo tỉ lệ số đầu của VRM: blender -b --python tools/vrm/heads.py -- <file.vrm>"""
import bpy, sys
src = sys.argv[sys.argv.index("--") + 1]
bpy.ops.wm.read_homefile(use_empty=True)
bpy.ops.import_scene.vrm(filepath=src)
face = bpy.data.objects["Face"]; me = face.data; mw = face.matrix_world
skin = {i for i, m in enumerate(me.materials) if m and "Face_00_SKIN" in m.name}
pts = [mw @ me.vertices[v].co for p in me.polygons if p.material_index in skin for v in p.vertices]
crown = max(q.z for q in pts)
cx = sum(q.x for q in pts)/len(pts)
front = [q for q in pts if abs(q.x - cx) < 0.012]
chin = min(q.z for q in front)
allz = [ (o.matrix_world @ v.co).z for o in bpy.data.objects if o.type=="MESH" and not o.name.startswith("Hair") for v in o.data.vertices]
foot = min(allz)
H = crown - foot; h = crown - chin
print("HEADS", src.split("/")[-2], "H=%.3f head=%.3f heads=%.2f" % (H, h, H / h))
