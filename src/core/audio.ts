import { GS } from "../core/state";
import { FEEL } from "../combat/feel";

/* =========================================================
   ÂM THANH: bộ trộn gồm kênh hiệu ứng và kênh nhạc, qua bộ nén chung.
   Hiệu ứng đánh dùng mẫu CC0 của Kenney (public/audio/kenney, xem CREDITS.md);
   âm báo, tiếng chuông ước nguyện và nhạc nền tự tổng hợp bằng Web Audio.
   Mặc định tắt cho tới khi người chơi bật âm thanh.
   ========================================================= */

export const mixer = {
  sfx: null as GainNode | null,
  music: null as GainNode | null,
};

export function audioCtx(): AudioContext | null {
  if (!GS.soundOn) return null;
  if (!GS.AC) {
    try {
      const AC = new (window.AudioContext || (window as any).webkitAudioContext)();
      const comp = AC.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.ratio.value = 4;
      comp.connect(AC.destination);
      mixer.sfx = AC.createGain();
      mixer.music = AC.createGain();
      mixer.sfx.connect(comp);
      mixer.music.connect(comp);
      GS.AC = AC;
      applyVolumes();
    } catch {
      return null;
    }
  }
  if (GS.AC.state === "suspended") void GS.AC.resume();
  return GS.AC;
}
export function applyVolumes() {
  if (!GS.AC) return;
  mixer.sfx!.gain.value = FEEL.audio.sfx;
  mixer.music!.gain.value = FEEL.audio.music;
}

/* ---------- mẫu âm thanh ---------- */
const K = (n: string) => `${import.meta.env.BASE_URL}audio/kenney/${n}.ogg`;
const range = (base: string, n: number) => Array.from({ length: n }, (_, i) => `${base}_00${i}`);
type Sample = { files: string[]; vol: number; rate: [number, number]; synth?: string };
/** Mỗi loại âm: danh sách mẫu (chọn ngẫu nhiên), âm lượng, khoảng tốc độ phát (đổi cao độ) và lớp tổng hợp đi kèm. */
const SAMPLES: Record<string, Sample> = {
  hit_sword: { files: range("impactMetal_light", 3), vol: 0.55, rate: [1.05, 1.25] },
  hit_great: { files: range("impactPlate_heavy", 3), vol: 0.75, rate: [0.8, 0.95] },
  hit_spear: { files: range("impactPlank_medium", 3), vol: 0.65, rate: [1, 1.2] },
  hit_bow: { files: range("impactWood_light", 3), vol: 0.55, rate: [1.1, 1.3] },
  hit_cat: { files: range("impactGlass_light", 3), vol: 0.45, rate: [0.9, 1.15] },
  crit: { files: range("impactMetal_heavy", 2), vol: 0.5, rate: [1.1, 1.25] },
  swing: { files: ["cloth1", "cloth2", "cloth3", "cloth4"], vol: 0.35, rate: [1.3, 1.6] },
  swing_great: { files: ["cloth1", "cloth2"], vol: 0.5, rate: [0.7, 0.85] },
  shoot: { files: ["knifeSlice2"], vol: 0.3, rate: [1.3, 1.5] },
  cast: { files: ["impactGlass_medium_000"], vol: 0.2, rate: [1.6, 1.9] },
  dash: { files: ["cloth3", "cloth4"], vol: 0.45, rate: [0.9, 1.1] },
  skill: { files: range("impactBell_heavy", 2), vol: 0.35, rate: [1.3, 1.45], synth: "rise" },
  burst: { files: ["impactBell_heavy_001"], vol: 0.55, rate: [0.7, 0.75], synth: "boom" },
  break: { files: range("impactMining", 2), vol: 0.75, rate: [0.85, 1], synth: "crack" },
  kill: { files: range("impactSoft_heavy", 2), vol: 0.55, rate: [0.9, 1.1] },
  hurt: { files: range("impactPunch_heavy", 2), vol: 0.7, rate: [0.9, 1.05] },
  slam: { files: range("impactPlate_heavy", 3), vol: 0.8, rate: [0.55, 0.65], synth: "boom" },
  react: { files: ["impactGlass_medium_000"], vol: 0.45, rate: [0.95, 1.2] },
  chest: { files: ["metalLatch"], vol: 0.6, rate: [1, 1] },
  coin: { files: ["handleCoins", "handleCoins2"], vol: 0.45, rate: [1, 1.15] },
  roar: { files: [], vol: 0, rate: [1, 1], synth: "roar" },
  bossKill: { files: ["impactBell_heavy_000"], vol: 0.7, rate: [0.5, 0.5], synth: "boom" },
};
const buffers = new Map<string, AudioBuffer | null>();
function load(ac: AudioContext, name: string) {
  if (buffers.has(name)) return;
  buffers.set(name, null);
  fetch(K(name))
    .then((r) => r.arrayBuffer())
    .then((b) => ac.decodeAudioData(b))
    .then((buf) => buffers.set(name, buf))
    .catch(() => {
      /* thiếu file thì im lặng, không làm hỏng trận đánh */
    });
}
/** Tải trước toàn bộ mẫu khi người chơi bật âm thanh (~450 KB). */
export function preloadSfx() {
  const ac = audioCtx();
  if (!ac) return;
  for (const s of Object.values(SAMPLES)) for (const f of s.files) load(ac, f);
}

const lastPlay: Record<string, number> = {};
let voices = 0;
export function sfx(kind: string) {
  const ac = audioCtx();
  if (!ac) return;
  // Chống chồng tiếng: cùng loại cách nhau ít nhất 35 ms, tối đa 14 tiếng cùng lúc.
  const now = ac.currentTime;
  if (now - (lastPlay[kind] ?? -1) < 0.035 || voices > 14) return;
  lastPlay[kind] = now;
  const S = SAMPLES[kind];
  if (S) {
    if (S.files.length) {
      const name = S.files[(Math.random() * S.files.length) | 0];
      const buf = buffers.get(name);
      if (buf) playBuffer(ac, buf, S.vol, S.rate[0] + Math.random() * (S.rate[1] - S.rate[0]));
      else load(ac, name);
    }
    if (S.synth) synth(ac, S.synth);
    return;
  }
  synth(ac, kind);
}
function playBuffer(ac: AudioContext, buf: AudioBuffer, vol: number, rate: number) {
  const src = ac.createBufferSource(),
    g = ac.createGain();
  src.buffer = buf;
  src.playbackRate.value = rate;
  g.gain.value = vol;
  src.connect(g).connect(mixer.sfx!);
  voices++;
  src.onended = () => voices--;
  src.start();
}

/* ---------- âm tự tổng hợp ---------- */
function tone(
  ac: AudioContext,
  type: OscillatorType,
  f0: number,
  f1: number,
  dur: number,
  vol: number,
  delay = 0,
  attack = 0.005,
) {
  const t = ac.currentTime + delay,
    o = ac.createOscillator(),
    g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(mixer.sfx!);
  o.start(t);
  o.stop(t + dur + 0.02);
}
let noiseBuf: AudioBuffer | null = null;
function noise(ac: AudioContext, dur: number, vol: number, freq: number, q = 1, type: BiquadFilterType = "lowpass") {
  if (!noiseBuf) {
    noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const t = ac.currentTime,
    src = ac.createBufferSource(),
    f = ac.createBiquadFilter(),
    g = ac.createGain();
  src.buffer = noiseBuf;
  f.type = type;
  f.frequency.setValueAtTime(freq, t);
  f.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.25), t + dur);
  f.Q.value = q;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(mixer.sfx!);
  src.start(t);
  src.stop(t + dur);
}
function synth(ac: AudioContext, kind: string) {
  switch (kind) {
    // Âm báo đòn quái: hai nốt ngắn, nốt sau cao hơn để tai nhận ra "sắp đánh".
    case "warn":
      tone(ac, "triangle", 660, 660, 0.09, 0.09);
      break;
    case "warn2":
      tone(ac, "triangle", 990, 990, 0.08, 0.11);
      tone(ac, "sine", 1320, 1320, 0.1, 0.06, 0.02);
      break;
    case "warnBoss":
      tone(ac, "sawtooth", 220, 330, 0.25, 0.06);
      tone(ac, "triangle", 440, 660, 0.25, 0.08);
      break;
    case "rise":
      tone(ac, "triangle", 300, 900, 0.22, 0.05);
      break;
    case "boom":
      tone(ac, "sine", 120, 40, 0.5, 0.25);
      noise(ac, 0.45, 0.25, 1200);
      break;
    case "crack":
      noise(ac, 0.18, 0.35, 4000, 2, "bandpass");
      break;
    case "roar":
      tone(ac, "sawtooth", 90, 55, 0.9, 0.12, 0, 0.08);
      noise(ac, 0.9, 0.18, 700, 1);
      break;
    case "star3":
      tone(ac, "sine", 784, 784, 0.35, 0.06);
      break;
    case "star4":
      [659, 880, 1109].forEach((f, i) => tone(ac, "sine", f, f, 0.5, 0.06, i * 0.08));
      break;
    case "star5":
      [523, 784, 1047, 1319, 1568].forEach((f, i) => tone(ac, "sine", f, f, 0.9, 0.06, i * 0.09));
      break;
    default:
      tone(ac, "sine", 440, 440, 0.1, 0.03);
  }
}
