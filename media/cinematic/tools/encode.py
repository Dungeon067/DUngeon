#!/usr/bin/env python3
"""Join rendered PNG shots into one clip and encode MP4 (H.264) + WebM (VP9), no audio track.

encode.py --name 5a-s34 --shots ../out/frames/5a/s3 ../out/frames/5a/s4 --out ../out/video
Outputs <name>-1080.mp4/.webm and <name>-720.mp4/.webm. Film grain and the shared grade are applied here.
"""
import argparse
import os
import subprocess
import tempfile

GRADE = "eq=contrast=1.04:saturation=1.06:gamma=0.98,noise=alls={grain}:allf=t"
TARGETS = {  # height: (h264 crf, vp9 crf, grain)
    1080: (20, 32, 5),
    720: (23, 36, 4),
}


def run(cmd):
    print(" ".join(cmd), flush=True)
    subprocess.run(cmd, check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--name", required=True)
    ap.add_argument("--shots", nargs="+", required=True, help="frame folders in play order")
    ap.add_argument("--out", required=True)
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--heights", type=int, nargs="+", default=[1080, 720])
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        lst = os.path.join(tmp, "frames.txt")
        with open(lst, "w") as fh:
            for d in a.shots:
                for f in sorted(x for x in os.listdir(d) if x.endswith(".png")):
                    fh.write(f"file '{os.path.abspath(os.path.join(d, f))}'\nduration {1 / a.fps:.6f}\n")
        src = ["-f", "concat", "-safe", "0", "-r", str(a.fps), "-i", lst]
        for h in a.heights:
            crf264, crf9, grain = TARGETS[h]
            vf = f"scale=-2:{h}:flags=lanczos," + GRADE.format(grain=grain) + ",format=yuv420p"
            base = os.path.join(a.out, f"{a.name}-{h}")
            run(["ffmpeg", "-y", "-loglevel", "error", *src, "-vf", vf, "-r", str(a.fps), "-an",
                 "-c:v", "libx264", "-preset", "slow", "-crf", str(crf264), "-profile:v", "high",
                 "-movflags", "+faststart", base + ".mp4"])
            run(["ffmpeg", "-y", "-loglevel", "error", *src, "-vf", vf, "-r", str(a.fps), "-an",
                 "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", str(crf9), "-row-mt", "1", "-deadline", "good",
                 "-cpu-used", "2", base + ".webm"])
            for ext in ("mp4", "webm"):
                print(f"{base}.{ext}: {os.path.getsize(base + '.' + ext) / 1e6:.2f} MB")


main()
