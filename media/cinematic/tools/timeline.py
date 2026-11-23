#!/usr/bin/env python3
"""Write out/timeline.json: shot boundaries, cue times and the scene-2 constellation anchor for every variant.

timeline.py --anchor ../out/frames/common/s2/meta.json --out ../out/timeline.json
Times are seconds from the start of the video; frames are 0-based at 30 fps.
"""
import argparse
import json

FPS = 30
SHOTS = [("s1", 75), ("s2", 60), ("s3", 75), ("s4", 60)]   # keep in sync with blender/cine/shots.py
LANTERN_RELEASE = ("s1", 34)
LANTERN_BURST = ("s2", 41)
FLARE = ("s3", 42)       # 5-star only: purple turns gold, slow motion
IMPACT = ("s4", 31)
VARIANTS = {
    "3": {"rarity": 3, "multi": False},
    "4": {"rarity": 4, "multi": False},
    "5a": {"rarity": 5, "multi": False},
    "5b": {"rarity": 5, "multi": False},
    "10x4": {"rarity": 4, "multi": True},
    "10x5": {"rarity": 5, "multi": True},
}


def starts():
    out, acc = {}, 0
    for name, n in SHOTS:
        out[name] = (acc, n)
        acc += n
    return out, acc


def t_of(st, cue):
    shot, f = cue
    return round((st[shot][0] + f - 1) / FPS, 3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--anchor", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    st, total = starts()
    meta = json.load(open(a.anchor))
    s2_0 = st["s2"][0]
    anchor = [[round((s2_0 + f - 1) / FPS, 3), x, y] for f, x, y in meta["anchor"]]
    burst = t_of(st, LANTERN_BURST)
    tl = {
        "fps": FPS,
        "duration": round(total / FPS, 3),
        "aspect": "16:9",
        "shots": [{"id": k, "start": round(v[0] / FPS, 3), "end": round((v[0] + v[1]) / FPS, 3)} for k, v in st.items()],
        "cues": {
            "lanternRelease": t_of(st, LANTERN_RELEASE),
            "lanternBurst": burst,
            "flare5": t_of(st, FLARE),
            "impact": t_of(st, IMPACT),
            "reveal": round(total / FPS, 3),
        },
        "constellation": {
            "comment": "Draw the banner constellation centred on anchor (x, y in 0..1 of the video frame, origin top-left).",
            "drawFrom": burst,
            "fullAt": round(burst + 0.45, 3),
            "fadeOutFrom": round(st["s3"][0] / FPS - 0.15, 3),
            "hiddenAt": round(st["s3"][0] / FPS + 0.25, 3),
            "scale": 0.34,
            "anchor": anchor,
        },
        "fastForward": {"allowedFromWish": 2, "rate": 3.0, "until": t_of(st, IMPACT)},
        "skipTo": "reveal",
        "variants": {
            k: {
                **v,
                "video": {
                    "1080": [f"video/{k}-1080.webm", f"video/{k}-1080.mp4"],
                    "720": [f"video/{k}-720.webm", f"video/{k}-720.mp4"],
                },
                "audio": [f"audio/{k}.ogg", f"audio/{k}.mp3"],
            }
            for k, v in VARIANTS.items()
        },
    }
    with open(a.out, "w") as fh:
        json.dump(tl, fh, ensure_ascii=False, indent=2)
    print(a.out, tl["duration"], "s")


main()
