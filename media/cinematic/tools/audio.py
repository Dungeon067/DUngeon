#!/usr/bin/env python3
"""Synthesize the separate soundtrack for each wish video (numpy only, no external samples).

audio.py --timeline ../out/timeline.json --out ../out/audio
Writes <variant>.ogg (Opus) and <variant>.mp3, 48 kHz stereo, aligned to the cues in timeline.json,
plus 1.5 s of tail after the reveal cue so the in-game reveal can start over it.
"""
import argparse
import json
import os
import subprocess
import tempfile
import wave

import numpy as np

SR = 48000
TAIL = 1.5
rng = np.random.default_rng(7)
# pentatonic D-E-G-A-B, a nod to the folk scale of the starting region
D4, E4, G4, A4, B4 = 293.66, 329.63, 392.0, 440.0, 493.88
CHORD = {3: [G4], 4: [G4, B4 * 1.0], 5: [D4, G4, A4, B4 * 2 / 2, D4 * 2]}


def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)


def lp_fast(x, fc):
    """One-pole low-pass via FFT filtering (cheap for long buffers)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X / np.sqrt(1 + (f / fc) ** 4), len(x))


def bandsweep(n, f1, f2, q=3.0):
    """Noise through a band moving from f1 to f2 (STFT domain)."""
    x = rng.normal(0, 1, n)
    hop, win = 512, 2048
    out = np.zeros(n + win)
    w = np.hanning(win)
    freqs = np.fft.rfftfreq(win, 1 / SR)
    for k, s in enumerate(range(0, n - win, hop)):
        u = s / max(1, n - win)
        fc = f1 * (f2 / f1) ** u
        bw = fc / q
        g = np.exp(-0.5 * ((freqs - fc) / bw) ** 2)
        seg = np.fft.irfft(np.fft.rfft(x[s:s + win] * w) * g, win)
        out[s:s + win] += seg * w
    return out[:n] / (np.abs(out).max() + 1e-9)


def tone(f, dur, a=0.005, d=1.0, f2=None, partials=((1, 1),)):
    n = int(dur * SR)
    t = np.arange(n) / SR
    fr = np.full(n, f) if f2 is None else f * (f2 / f) ** (t / dur)
    ph = 2 * np.pi * np.cumsum(fr) / SR
    y = sum(g * np.sin(ph * m) for m, g in partials)
    return y * env(n, a, d)


def bell(f, dur=2.4):
    return tone(f, dur, 0.002, 0.9, partials=((1, 1), (2.01, 0.35), (3.0, 0.12), (4.2, 0.06)))


def bronze(f=92.0, dur=3.0):
    """Struck bronze drum: inharmonic membrane modes plus a short thump."""
    n = int(dur * SR)
    y = np.zeros(n)
    for m, g, d in ((1.0, 1.0, 1.1), (1.59, 0.5, 0.7), (2.14, 0.32, 0.5), (2.3, 0.25, 0.45), (2.65, 0.2, 0.35),
                    (3.16, 0.12, 0.25), (5.4, 0.05, 0.15)):
        y += g * tone(f * m, dur, 0.001, d)
    y += 0.6 * tone(f * 0.6, dur, 0.001, 0.18, f2=f * 0.35)
    return y


class Mix:
    def __init__(self, dur):
        self.buf = np.zeros((2, int(dur * SR)))

    def add(self, x, t, gain=1.0, pan=0.0):
        i = int(t * SR)
        if i >= self.buf.shape[1]:
            return
        x = x[: self.buf.shape[1] - i]
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        self.buf[0, i:i + len(x)] += x * gain * l * 1.414
        self.buf[1, i:i + len(x)] += x * gain * r * 1.414


def build(tl, variant):
    v = tl["variants"][variant]
    rarity, multi = v["rarity"], v["multi"]
    cue = tl["cues"]
    sh = {s["id"]: s for s in tl["shots"]}
    dur = tl["duration"] + TAIL
    m = Mix(dur)
    n = int(dur * SR)
    t = np.arange(n) / SR
    # sea and wind under shots 1-2 and again in shot 4
    sea = lp_fast(rng.normal(0, 1, n), 380) * (0.55 + 0.45 * np.sin(2 * np.pi * t / 3.7) ** 2)
    sea /= np.abs(sea).max()
    land = np.clip(1 - (t - sh["s2"]["start"]) / 0.8, 0, 1) + np.clip((t - sh["s4"]["start"]) / 0.3, 0, 1) * 0.6
    m.add(sea * land * 0.16, 0, pan=-0.15)
    m.add(np.roll(sea, 9000) * land * 0.12, 0, pan=0.2)
    wind = bandsweep(int(sh["s2"]["end"] * SR), 700, 1500, q=2.0)
    m.add(wind * 0.04 * np.minimum(1, np.arange(len(wind)) / SR / 1.0), 0)
    # lantern: a soft bell, then a rising breath through the clouds
    m.add(bell(A4) * 0.18, cue["lanternRelease"], pan=0.25)
    m.add(bell(E4 * 2) * 0.08, cue["lanternRelease"] + 0.12, pan=0.25)
    rise = sh["s2"]["start"] - 0.4
    w = bandsweep(int((cue["lanternBurst"] - rise) * SR), 300, 2400, q=1.5)
    m.add(w * np.linspace(0, 1, len(w)) ** 2 * 0.12, rise)
    # star dust: glitter grains
    for k in range(70):
        tt = cue["lanternBurst"] + rng.exponential(0.25)
        f = rng.choice([D4, E4, G4, A4, B4]) * rng.choice([4, 8])
        m.add(tone(f, 0.4, 0.001, 0.08) * rng.uniform(0.02, 0.05), tt, pan=rng.uniform(-0.8, 0.8))
    m.add(bell(D4 * 2) * 0.12, cue["lanternBurst"])
    # deep space: drone pad that swells as the meteor approaches
    s3, s4 = sh["s3"], sh["s4"]
    nd = int((s4["start"] + 0.4 - s3["start"]) * SR)
    td = np.arange(nd) / SR
    base = {3: 55.0, 4: 58.27, 5: 49.0}[rarity]
    drone = sum(g * np.sin(2 * np.pi * base * mlt * td + rng.uniform(0, 6)) for mlt, g in ((1, 1), (1.5, 0.5), (2, 0.4), (3.01, 0.15)))
    drone *= np.minimum(1, td / 0.4) * np.minimum(1, (nd / SR - td) / 0.4)
    m.add(drone * 0.1, s3["start"])
    whoosh = bandsweep(int((s4["start"] - s3["start"] + 0.3) * SR), 160, 3200, q=1.2)
    m.add(whoosh * np.linspace(0, 1, len(whoosh)) ** 3 * 0.32, s3["start"])
    if multi:
        for k in range(9):
            tt = s3["start"] + rng.uniform(0.3, 1.8)
            wh = bandsweep(int(0.7 * SR), rng.uniform(400, 900), rng.uniform(2500, 5000), q=2.0)
            m.add(wh * np.hanning(len(wh)) * 0.07, tt, pan=rng.uniform(-0.9, 0.9))
    if rarity == 5:
        f = cue["flare5"]
        rev = tone(B4, 0.9, 0.85, 10.0, partials=((1, 1), (2, 0.3)))
        m.add(rev * np.linspace(0, 1, len(rev)) ** 2 * 0.12, f - 0.9)
        m.add(bronze(70.0, 2.5) * 0.3, f)
        for k, fr in enumerate(CHORD[5]):
            m.add(tone(fr, 2.8, 0.25, 1.4, partials=((1, 1), (2, 0.2))) * 0.07, f + 0.03 * k, pan=-0.5 + 0.25 * k)
    # impact on the bronze drum, shockwave rumble, rarity chime
    imp = cue["impact"]
    m.add(bronze() * 0.55, imp)
    m.add(tone(70, 1.8, 0.002, 0.5, f2=28) * 0.55, imp)
    boom = lp_fast(rng.normal(0, 1, int(2.2 * SR)), 260) * env(int(2.2 * SR), 0.004, 0.45)
    m.add(boom / np.abs(boom).max() * 0.35, imp)
    crack = bandsweep(int(0.5 * SR), 5000, 800, q=1.0) * env(int(0.5 * SR), 0.001, 0.12)
    m.add(crack * 0.25, imp)
    if multi:
        for k in range(9):
            m.add(bronze(rng.uniform(150, 260), 1.2) * 0.07, imp - 0.45 + k * 0.1 + rng.uniform(0, 0.05),
                  pan=rng.uniform(-0.8, 0.8))
    for k, fr in enumerate(CHORD[rarity]):
        m.add(bell(fr * 2) * (0.1 if rarity == 5 else 0.12), imp + 0.25 + 0.12 * k, pan=-0.3 + 0.15 * k)
    if rarity >= 4:
        sh_n = int((tl["duration"] + TAIL - imp) * SR)
        ts = np.arange(sh_n) / SR
        shimmer = sum(np.sin(2 * np.pi * fr * 4 * ts + 3 * np.sin(2 * np.pi * 5 * ts)) for fr in CHORD[rarity])
        m.add(shimmer * np.exp(-ts / 1.2) * np.minimum(1, ts / 0.3) * 0.015, imp)
    y = m.buf
    y = np.tanh(y * 1.2) / np.tanh(1.2)
    y *= 10 ** (-1 / 20) / max(1e-9, np.abs(y).max())
    fade = np.minimum(1, (y.shape[1] - np.arange(y.shape[1])) / (0.5 * SR))
    return y * fade


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--timeline", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--variants", nargs="*")
    a = ap.parse_args()
    tl = json.load(open(a.timeline))
    os.makedirs(a.out, exist_ok=True)
    for vname in a.variants or tl["variants"]:
        y = build(tl, vname)
        with tempfile.TemporaryDirectory() as tmp:
            wav = os.path.join(tmp, "a.wav")
            with wave.open(wav, "wb") as w:
                w.setnchannels(2)
                w.setsampwidth(2)
                w.setframerate(SR)
                w.writeframes((y.T * 32767).astype("<i2").tobytes())
            base = os.path.join(a.out, vname)
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libopus", "-b:a", "96k",
                            base + ".ogg"], check=True)
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k",
                            base + ".mp3"], check=True)
        print(vname, os.path.getsize(base + ".ogg") // 1024, "KB ogg")


main()
