import { GS } from "./state";
import { audioCtx, mixer } from "./audio";
import { FEEL } from "../combat/feel";
import { dist } from "./util";

/* =========================================================
   NHẠC NỀN tự tổng hợp, mỗi khu vực một chủ đề:
   - Đảo Lạc: thang ngũ cung, tiếng gảy kiểu đàn dây và trống trầm, nhịp thong thả.
   - Tháp Tinh Tú: thang thứ, tiếng chuông mảnh, không gian lạnh.
   - Hang Hắc Giao: nốt trầm kéo dài, trống dồn.
   Mỗi chủ đề có hai lớp: khám phá và chiến đấu, chuyển qua lại bằng crossfade.
   ========================================================= */

type Theme = { bpm: number; root: number; scale: number[]; lead: OscillatorType; drone: number };
const THEMES: Record<string, Theme> = {
  world: { bpm: 84, root: 220, scale: [0, 2, 4, 7, 9, 12, 14, 16], lead: "triangle", drone: 0.5 },
  tower: { bpm: 72, root: 196, scale: [0, 3, 5, 7, 10, 12, 15, 17], lead: "sine", drone: 0.5 },
  boss: { bpm: 96, root: 110, scale: [0, 1, 5, 7, 8, 12, 13, 17], lead: "sawtooth", drone: 1 },
};
const st = {
  theme: "" as string,
  explore: null as GainNode | null,
  combat: null as GainNode | null,
  out: null as GainNode | null,
  next: 0,
  step: 0,
  inCombat: false,
  linger: 0,
  paused: false,
  /** Lớp chiến đấu chỉ được lên lịch khi đang nghe được, đỡ tạo oscillator thừa. */
  combatAudible: 0,
};

function semis(root: number, s: number) {
  return root * Math.pow(2, s / 12);
}
function note(
  ac: AudioContext,
  bus: GainNode,
  type: OscillatorType,
  f: number,
  t: number,
  dur: number,
  vol: number,
  attack = 0.01,
) {
  const o = ac.createOscillator(),
    g = ac.createGain();
  o.type = type;
  o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(bus);
  o.start(t);
  o.stop(t + dur + 0.05);
}
function drum(ac: AudioContext, bus: GainNode, t: number, f: number, vol: number) {
  const o = ac.createOscillator(),
    g = ac.createGain();
  o.frequency.setValueAtTime(f, t);
  o.frequency.exponentialRampToValueAtTime(f * 0.4, t + 0.18);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(g).connect(bus);
  o.start(t);
  o.stop(t + 0.25);
}
/** Giai điệu lặp 32 bước, sinh từ hàm băm cố định nên mỗi khu vực luôn có cùng một câu nhạc. */
function pat(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
function schedule(ac: AudioContext, th: Theme, t: number, step: number) {
  const s = step % 32,
    beat = 60 / th.bpm / 2,
    E = st.explore!,
    C = st.combat!;
  // Lớp khám phá
  if (s % 8 === 0)
    note(ac, E, "sine", semis(th.root / 2, th.scale[(s / 8) % 2 ? 3 : 0]), t, beat * 8, 0.05 * th.drone, 0.4);
  if (pat(s, 1) > 0.45)
    note(ac, E, th.lead, semis(th.root, th.scale[(pat(s, 2) * th.scale.length) | 0]), t, beat * 1.8, 0.035);
  if (s % 16 === 8) drum(ac, E, t, 90, 0.08);
  // Lớp chiến đấu: trống dồn, bass ostinato, giai điệu nhanh hơn
  if (!st.inCombat && ac.currentTime > st.combatAudible) return;
  if (s % 4 === 0) drum(ac, C, t, 70, 0.22);
  if (s % 4 === 2) drum(ac, C, t, 140, 0.08);
  note(ac, C, "square", semis(th.root / 2, th.scale[[0, 0, 3, 0, 4, 0, 3, 1][s % 8]]), t, beat * 0.9, 0.025);
  if (pat(s, 3) > 0.35)
    note(ac, C, th.lead, semis(th.root * 2, th.scale[(pat(s, 4) * th.scale.length) | 0]), t, beat * 0.9, 0.025);
}
function ensure(ac: AudioContext) {
  if (st.out) return;
  st.out = ac.createGain();
  st.out.connect(mixer.music!);
  st.explore = ac.createGain();
  st.combat = ac.createGain();
  st.combat.gain.value = 0;
  st.explore.connect(st.out);
  st.combat.connect(st.out);
}
function fade(g: GainNode, v: number, dur: number) {
  const ac = GS.AC!;
  g.gain.cancelScheduledValues(ac.currentTime);
  g.gain.setTargetAtTime(v, ac.currentTime, Math.max(0.01, dur / 3));
}
/** Có quái đang đuổi hoặc chuẩn bị đánh trong tầm, hoặc boss còn sống. */
function combatNow() {
  const G = GS.G;
  if (G.boss && !G.boss.dead) return true;
  const R = FEEL.audio.combatRange;
  for (const e of G.enemies)
    if (!e.dead && (e.state === "chase" || e.tele) && dist(e.x, e.y, G.p.x, G.p.y) < R) return true;
  return false;
}

export function updateMusic(dt: number) {
  const playing = GS.scene === "play" && GS.G && !GS.G._ended;
  if (!GS.soundOn || !GS.AC) {
    if (!GS.soundOn && st.out) {
      st.out.disconnect();
      st.out = st.explore = st.combat = null;
      st.theme = "";
    }
    if (GS.soundOn && playing) audioCtx();
    return;
  }
  const ac = GS.AC;
  ensure(ac);
  const theme = playing ? (THEMES[GS.G.mode] ? GS.G.mode : "world") : "";
  const xf = FEEL.audio.crossfade;
  if (theme !== st.theme) {
    st.theme = theme;
    st.paused = GS.paused;
    fade(st.out!, theme && !GS.paused ? 1 : 0, xf);
    st.next = ac.currentTime + 0.1;
    st.step = 0;
  }
  if (!theme) return;
  if (GS.paused !== st.paused) {
    st.paused = GS.paused;
    fade(st.out!, GS.paused ? 0.35 : 1, 0.6);
  }
  const c = combatNow();
  if (c) st.linger = FEEL.audio.combatLinger;
  else st.linger -= dt;
  const want = c || st.linger > 0;
  if (want !== st.inCombat) {
    st.inCombat = want;
    if (!want) st.combatAudible = ac.currentTime + xf * 2;
    fade(st.combat!, want ? 1 : 0, xf);
    fade(st.explore!, want ? 0.35 : 1, xf);
  }
  const th = THEMES[theme],
    beat = 60 / th.bpm / 2;
  // Lên lịch trước 0,25 giây để nhịp không bị lệch khi khung hình chậm.
  if (st.next < ac.currentTime) st.next = ac.currentTime + 0.05;
  while (st.next < ac.currentTime + 0.25) {
    schedule(ac, th, st.next, st.step++);
    st.next += beat;
  }
}
export function musicState() {
  return { theme: st.theme, combat: st.inCombat };
}
