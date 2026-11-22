import { GS } from "../core/state";

/* =========================================================
   SOUND (tiny synth, off by default)
   ========================================================= */

export function sfx(kind) {
  if (!GS.soundOn) return;
  try {
    if (!GS.AC) GS.AC = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    return;
  }
  const now = GS.AC.currentTime,
    o = GS.AC.createOscillator(),
    g = GS.AC.createGain();
  o.connect(g);
  g.connect(GS.AC.destination);
  const S = {
    hit: [220, 90, 0.06, "square", 0.04],
    swing: [500, 200, 0.07, "triangle", 0.03],
    skill: [300, 900, 0.25, "sawtooth", 0.05],
    burst: [120, 600, 0.6, "sawtooth", 0.08],
    hurt: [160, 60, 0.15, "square", 0.06],
    chest: [600, 1200, 0.3, "triangle", 0.06],
    star3: [700, 700, 0.2, "sine", 0.05],
    star4: [500, 900, 0.4, "sine", 0.07],
    star5: [400, 1300, 0.8, "sine", 0.09],
    react: [800, 300, 0.18, "triangle", 0.05],
    coin: [900, 1300, 0.08, "sine", 0.03],
  }[kind] || [440, 440, 0.1, "sine", 0.03];
  o.type = S[3];
  o.frequency.setValueAtTime(S[0], now);
  o.frequency.exponentialRampToValueAtTime(Math.max(30, S[1]), now + S[2]);
  g.gain.setValueAtTime(S[4], now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + S[2]);
  o.start(now);
  o.stop(now + S[2] + 0.02);
}
