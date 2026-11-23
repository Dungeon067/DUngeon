"""Điểm vào: blender -b -P tools/blender/monsters/run.py -- <id> [<id>...]"""
import importlib
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
for sid in [a for a in args if not a.startswith("--")]:
    import mlib

    mlib.ALL_PM.clear()
    mod = importlib.import_module(f"sp_{sid}")
    mod.build(args)
