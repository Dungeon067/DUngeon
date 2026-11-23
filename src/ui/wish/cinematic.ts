/* Hoạt ảnh ước nguyện 5 cảnh (S10), chuyển từ bản mẫu uoc-nguyen-mau.html của chủ dự án.
   Giữ nguyên nhịp SHOT, khung điện ảnh và cảnh 5★ giả 4★ rồi quay chậm bùng vàng.
   Khác bản mẫu: kết quả lấy từ Server.req("pull") (không tự quay), nhân vật vẽ bằng drawChibi của game,
   nhịp và hệ số quay chậm đọc từ content/cinematic.yaml. Đây là bản dự phòng chạy bằng code cho video S20. */
import { drawChibi } from "../../art/chibi";
import { byId as GAME_BY_ID } from "../../data/content";
import { CINEMATIC } from "../../data/menu-content";
import { weaponBitmap } from "../weapon-art";
import { BIRD, BIRD_EDGES } from "./constellation";

export interface CineItem {
  kind: "char" | "item";
  id?: string;
  r: 3 | 4 | 5;
  name: string;
  k?: string;
  /** id vũ khí (S24): có ảnh thì vẽ ảnh thay cho biểu tượng. */
  wid?: string;
  feat?: boolean;
  isNew?: boolean;
}
export interface CineHooks {
  sound: () => boolean;
  done: () => void;
  featured: () => string;
  line: (id: string) => string;
  skipBtn: { hidden: boolean };
  hint: { hidden: boolean; textContent: string | null };
}

/** Nền thẻ đồ ở bảng kết quả: chuyển màu chéo theo độ hiếm như thẻ trong Tủ Đồ. */
const LOOT_BG: Record<number, [string, string]> = {
  3: ["#24406a", "#4c7cb0"],
  4: ["#2f2a6b", "#6b5cc0"],
  5: ["#5a3418", "#b8783a"],
};

export function createCinematic(cv: HTMLCanvasElement, hooks: CineHooks) {
  const ui = { classList: { add(_c: string) {}, remove(_c: string) {} } };
  const skipBtn = hooks.skipBtn,
    hint = hooks.hint;
  const updPity = () => {};
  const byId: Record<string, any> = new Proxy(
    {},
    {
      get: (_, id: string) => {
        const c: any = GAME_BY_ID[id];
        return c && { ...c, line: c.line ?? hooks.line(id) };
      },
    },
  );
  let FEATURED = hooks.featured();
  const artCache: Record<string, HTMLCanvasElement> = {},
    silCache: Record<string, HTMLCanvasElement> = {};
  function charArt(id: any, h: any, raw?: any) {
    const key = id + "_" + h + (raw ? "r" : "");
    if (artCache[key]) return artCache[key];
    const ch = byId[id],
      w = Math.round(h * 0.8),
      cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const c = cv.getContext("2d")!;
    const el = EL[ch.el] ?? EL.fire;
    if (!raw) {
      const g = c.createRadialGradient(w / 2, h * 0.46, 0, w / 2, h * 0.46, h * 0.5);
      g.addColorStop(0, rgba(el.c, 0.35));
      g.addColorStop(1, rgba(el.c, 0));
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
    }
    const s = h / 50;
    drawChibi(c, ch, w / 2, h * 0.93, s, { t: 0.6, noShadow: true });
    artCache[key] = cv;
    return cv;
  }
  const cardCache: Record<string, HTMLCanvasElement> = {};
  function cardArt(id: any, w: any, h: any) {
    const key = id + w + "x" + h;
    if (cardCache[key]) return cardCache[key];
    const ch = byId[id],
      el = EL[ch.el] ?? EL.fire,
      cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const c = cv.getContext("2d")!;
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, shade(el.c, -0.5));
    g.addColorStop(1, shade(el.c, -0.85));
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    c.save();
    c.translate(w / 2, h * 0.42);
    c.globalAlpha = 0.14;
    c.fillStyle = el.c2;
    for (let i = 0; i < 14; i++) {
      c.rotate(TAU / 14);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(h, -h * 0.06);
      c.lineTo(h, h * 0.06);
      c.closePath();
      c.fill();
    }
    c.restore();
    drawChibi(c, ch, w / 2, h * 0.8, h / 62, { t: 0.6, noShadow: true });
    cardCache[key] = cv;
    return cv;
  }

  /* ============================ helpers ============================ */
  const TAU = Math.PI * 2;
  const clamp = (v: any, a: any, b: any) => (v < a ? a : v > b ? b : v);
  const lerp = (a: any, b: any, t: any) => a + (b - a) * t;
  const rand = (a: any, b: any) => a + Math.random() * (b - a);
  const ease = {
    out: (t: any) => 1 - Math.pow(1 - t, 3),
    in: (t: any) => t * t * t,
    inOut: (t: any) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    back: (t: any) => {
      const c = 1.70158,
        d = c + 1;
      return 1 + d * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    },
  };
  function hash2(x: any, y: any, s = 0) {
    let h = (x * 374761393 + y * 668265263 + s * 1442695041) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function hex(h: any) {
    const c = h.replace("#", "");
    return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
  }
  function rgba(h: any, a: any) {
    const [r, g, b] = hex(h);
    return `rgba(${r},${g},${b},${a})`;
  }
  function mix(a: any, b: any, t: any) {
    const A = hex(a),
      B = hex(b);
    return (
      "#" +
      A.map((v, i) =>
        Math.round(lerp(v, B[i], t))
          .toString(16)
          .padStart(2, "0"),
      ).join("")
    );
  }
  function shade(h: any, amt: any) {
    return amt < 0 ? mix(h, "#000000", -amt) : mix(h, "#ffffff", amt);
  }
  function rr(c: any, x: any, y: any, w: any, h: any, r: any) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }
  const RC: Record<number, string> = { 3: "#6fb6ff", 4: "#b98cff", 5: "#ffcf5a" };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================ characters (same as the game) ============================ */
  const EL: Record<string, { vi: string; c: string; c2: string }> = {
    fire: { vi: "Hỏa", c: "#ff6a3d", c2: "#ffc08a" },
    water: { vi: "Thủy", c: "#3aa6f5", c2: "#a6dcff" },
    wind: { vi: "Phong", c: "#45dfb1", c2: "#bdf6e4" },
    bolt: { vi: "Lôi", c: "#b47bff", c2: "#e0c8ff" },
    earth: { vi: "Thổ", c: "#e9b23a", c2: "#f8de98" },
    ice: { vi: "Băng", c: "#8fe1ff", c2: "#e6f9ff" },
  };

  /* ============================ audio (synth, starts on a tap) ============================ */
  let AC: any = null,
    master: any = null;
  const soundOn = true;
  function audio() {
    if (!hooks.sound()) return null;
    if (!AC) {
      try {
        AC = new (window.AudioContext || (window as any).webkitAudioContext)();
        master = AC.createGain();
        master.gain.value = 0.55;
        const comp = AC.createDynamicsCompressor();
        master.connect(comp);
        comp.connect(AC.destination);
      } catch (e) {
        return null;
      }
    }
    if (AC.state === "suspended") AC.resume();
    return AC;
  }
  function tone(f: any, t0: any, dur: any, type: any, vol: any, f2?: any) {
    const a = audio();
    if (!a) return;
    const o = a.createOscillator(),
      g = a.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(f, a.currentTime + t0);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, a.currentTime + t0 + dur);
    g.gain.setValueAtTime(0.0001, a.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol, a.currentTime + t0 + Math.min(0.04, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + t0 + dur);
    o.connect(g);
    g.connect(master);
    o.start(a.currentTime + t0);
    o.stop(a.currentTime + t0 + dur + 0.05);
  }
  function noise(t0: any, dur: any, vol: any, f1: any, f2: any, q?: any) {
    const a = audio();
    if (!a) return;
    const n = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate),
      d = n.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = a.createBufferSource();
    s.buffer = n;
    const f = a.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = q || 1.2;
    f.frequency.setValueAtTime(f1, a.currentTime + t0);
    f.frequency.exponentialRampToValueAtTime(f2, a.currentTime + t0 + dur);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, a.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol, a.currentTime + t0 + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + t0 + dur);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(a.currentTime + t0);
  }
  function bell(f: any, t0: any, vol: any) {
    tone(f, t0, 1.8, "sine", vol);
    tone(f * 2.01, t0, 1.1, "sine", vol * 0.3);
    tone(f * 3.0, t0, 0.6, "triangle", vol * 0.12);
  }
  const PENTA = [392, 440, 523.25, 587.33, 659.25, 784, 880, 1046.5, 1174.7, 1318.5, 1568];
  const SFX = {
    charge() {
      tone(98, 0, 1.4, "triangle", 0.12, 262);
      tone(147, 0, 1.4, "sine", 0.08, 392);
      noise(0, 1.4, 0.05, 300, 2400, 0.8);
    },
    launch() {
      noise(0, 0.5, 0.12, 600, 5000, 0.7);
      tone(392, 0, 0.35, "sine", 0.08, 1568);
    },
    whoosh() {
      noise(0, 1.4, 0.09, 3000, 400, 0.6);
    },
    flare() {
      bell(1046.5, 0, 0.12);
      bell(1568, 0.06, 0.1);
      noise(0, 0.4, 0.06, 4000, 8000, 2);
    },
    impact(r: any) {
      tone(110, 0, 0.9, "sine", 0.35, 32);
      noise(0, 0.8, 0.2, 900, 120, 0.6);
      if (r >= 4) tone(55, 0, 1.4, "sine", 0.25, 28);
    },
    reveal(r: any) {
      const n = r === 5 ? 7 : r === 4 ? 4 : 2;
      for (let i = 0; i < n; i++) bell(PENTA[i + (r === 5 ? 3 : r === 4 ? 2 : 1)], i * 0.07, r === 5 ? 0.11 : 0.08);
      if (r === 5) {
        [523.25, 659.25, 784, 1046.5].forEach((f, i) => tone(f, 0.5, 2.2, "sine", 0.05));
      }
    },
    star(i: any, r: any) {
      bell(PENTA[4 + i], 0, r === 5 ? 0.07 : 0.05);
    },
    card() {
      tone(880, 0, 0.12, "triangle", 0.04, 1320);
    },
  };

  /* ============================ extra cinematic sounds ============================ */
  function pad(freqs: any, t0: any, dur: any, vol: any) {
    freqs.forEach((f: any, i: any) => {
      tone(f, t0, dur, "sine", vol);
      tone(f * 1.004, t0 + 0.02, dur, "sine", vol * 0.6);
    });
  }
  let ambSrc: any = null;
  function ambience(on: any) {
    const a = audio();
    if (!a) return;
    if (ambSrc) {
      try {
        ambSrc.stop();
      } catch (e) {}
      ambSrc = null;
    }
    if (!on) return;
    const len = a.sampleRate * 4,
      b = a.createBuffer(1, len, a.sampleRate),
      d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + (Math.random() * 2 - 1) * 0.02) / 1.02;
      d[i] = last * 3.5;
    }
    const s = a.createBufferSource();
    s.buffer = b;
    s.loop = true;
    const f = a.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 700;
    const g = a.createGain();
    g.gain.value = 0.0001;
    g.gain.exponentialRampToValueAtTime(0.35, a.currentTime + 0.6);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start();
    ambSrc = s;
    ambSrc._g = g;
  }
  function ambienceFade() {
    if (ambSrc && AC) {
      ambSrc._g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + 0.8);
      const s = ambSrc;
      setTimeout(() => {
        try {
          s.stop();
        } catch (e) {}
      }, 900);
      ambSrc = null;
    }
  }
  const CIN = {
    open() {
      ambience(true);
      pad([196, 293.66], 0.1, 2.4, 0.05);
    },
    lantern() {
      noise(0, 0.9, 0.06, 400, 1800, 0.8);
      bell(784, 0, 0.05);
    },
    rise() {
      ambienceFade();
      pad([261.63, 329.63, 392, 523.25], 0, 2, 0.045);
      noise(0, 1.8, 0.05, 800, 4000, 0.5);
    },
    line(i: any) {
      bell(PENTA[2 + (i % 8)], 0, 0.045);
    },
    burstStars() {
      bell(1046.5, 0, 0.09);
      bell(1568, 0.05, 0.07);
      noise(0, 0.5, 0.07, 3000, 9000, 1.5);
    },
    meteor() {
      noise(0, 2.2, 0.12, 200, 3000, 0.5);
      tone(70, 0, 2.2, "sine", 0.15, 140);
    },
    slowmo() {
      tone(60, 0, 1.6, "sine", 0.25, 30);
      bell(523.25, 0.1, 0.1);
      bell(784, 0.2, 0.1);
      bell(1046.5, 0.3, 0.1);
    },
    descend() {
      noise(0, 1.4, 0.12, 3500, 300, 0.6);
    },
  };

  /* ============================ canvas setup ============================ */
  const X = cv.getContext("2d")!;
  let W = 0,
    H = 0,
    DPR = 1,
    stars: any[] = [];
  const glowCache: Record<string, HTMLCanvasElement> = {};
  function glow(col: any) {
    if (glowCache[col]) return glowCache[col];
    const s = 64,
      c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d")!;
    const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.18, rgba(col, 0.95));
    gr.addColorStop(0.5, rgba(col, 0.25));
    gr.addColorStop(1, rgba(col, 0));
    g.fillStyle = gr;
    g.fillRect(0, 0, s, s);
    glowCache[col] = c;
    return c;
  }
  function blob(x: any, y: any, r: any, col: any, a: any) {
    if (a <= 0 || r <= 0) return;
    X.globalAlpha = Math.min(1, a);
    X.drawImage(glow(col), x - r, y - r, r * 2, r * 2);
    X.globalAlpha = 1;
  }
  function flareH(x: any, y: any, w: any, h: any, col: any, a: any) {
    if (a <= 0) return;
    X.globalAlpha = Math.min(1, a);
    X.drawImage(glow(col), x - w, y - h, w * 2, h * 2);
    X.globalAlpha = 1;
  }
  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth;
    H = innerHeight;
    cv.width = Math.round(W * DPR);
    cv.height = Math.round(H * DPR);
    stars = Array.from({ length: Math.round((W * H) / 2200) }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      p: Math.random() * 6,
      d: Math.random() * 0.8 + 0.2,
    }));
  }

  /* ============================ the cliff-and-sea set (virtual 1600×900) ============================ */
  const VW = 1600,
    VH = 900,
    HORIZON = 560,
    DRUM = { x: 420, y: 612, rx: 118, ry: 28 },
    FIG = { x: 540, y: 610 };
  function ridge(seed: any, base: any, amp: any, step: any) {
    const pts = [];
    for (let x = -400; x <= 2000; x += step) {
      const n =
        Math.sin(x * 0.004 + seed) * 0.5 + Math.sin(x * 0.011 + seed * 2) * 0.3 + Math.sin(x * 0.027 + seed * 3) * 0.2;
      pts.push([x, base - amp * (0.55 + 0.45 * n)]);
    }
    return pts;
  }
  const RIDGES = [ridge(1.3, HORIZON, 210, 40), ridge(4.1, HORIZON, 140, 30), ridge(7.7, HORIZON, 80, 24)];
  const CLIFF = [
    [-400, 900],
    [-400, 560],
    [-120, 520],
    [60, 560],
    [160, 600],
    [640, 600],
    [700, 640],
    [760, 760],
    [820, 900],
  ];
  let cam = { x: VW / 2, y: VH / 2, z: 1 };
  function applyCam() {
    const s = Math.max(W / VW, H / VH) * cam.z;
    X.translate(W / 2, H / 2);
    X.scale(s, s);
    X.translate(-cam.x, -cam.y);
  }
  function drawSet(t: any, o: any = {}) {
    // sky
    const g = X.createLinearGradient(0, -600, 0, HORIZON);
    g.addColorStop(0, "#03040c");
    g.addColorStop(0.6, "#141a46");
    g.addColorStop(1, "#2c3f6e");
    X.fillStyle = g;
    X.fillRect(-800, -900, VW + 1600, HORIZON + 900);
    for (const s of stars) {
      const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.7 * s.d + s.p));
      X.globalAlpha = tw * 0.9;
      X.fillStyle = "#e9ecff";
      X.fillRect(-400 + s.x * (VW + 800), -600 + s.y * (HORIZON + 500), s.r * 1.2, s.r * 1.2);
    }
    X.globalAlpha = 1;
    // moon
    X.globalCompositeOperation = "lighter";
    blob(1180, 230, 260, "#6a7fd0", 0.35);
    X.globalCompositeOperation = "source-over";
    X.fillStyle = "#f6efd8";
    X.beginPath();
    X.arc(1180, 230, 62, 0, TAU);
    X.fill();
    X.fillStyle = "rgba(200,190,160,.35)";
    X.beginPath();
    X.arc(1162, 214, 14, 0, TAU);
    X.arc(1200, 250, 10, 0, TAU);
    X.arc(1196, 206, 7, 0, TAU);
    X.fill();
    // mountains
    const mc = ["#1f2a55", "#18214a", "#10173a"];
    RIDGES.forEach((r, i) => {
      X.fillStyle = mc[i];
      X.beginPath();
      X.moveTo(r[0][0], HORIZON + 2);
      for (const p of r) X.lineTo(p[0], p[1] + i * 6);
      X.lineTo(r[r.length - 1][0], HORIZON + 2);
      X.closePath();
      X.fill();
    });
    // mist band
    const mg = X.createLinearGradient(0, HORIZON - 70, 0, HORIZON + 10);
    mg.addColorStop(0, "rgba(120,140,200,0)");
    mg.addColorStop(1, "rgba(120,140,200,.25)");
    X.fillStyle = mg;
    X.fillRect(-800, HORIZON - 70, VW + 1600, 80);
    // sea
    const sg = X.createLinearGradient(0, HORIZON, 0, VH + 200);
    sg.addColorStop(0, "#1c2c5a");
    sg.addColorStop(1, "#050816");
    X.fillStyle = sg;
    X.fillRect(-800, HORIZON, VW + 1600, VH - HORIZON + 400);
    X.globalCompositeOperation = "lighter";
    for (let i = 0; i < 70; i++) {
      const y = HORIZON + 6 + Math.pow(i / 70, 1.6) * 360,
        w = (10 + i * 2.2) * (0.6 + 0.4 * Math.sin(t * 1.3 + i * 1.7)),
        x = 1180 + Math.sin(i * 12.9 + t * 0.6) * (10 + i * 1.5);
      X.fillStyle = `rgba(246,239,216,${0.5 * (1 - i / 80)})`;
      X.fillRect(x - w / 2, y, w, 1.5 + i * 0.03);
    }
    for (let i = 0; i < 40; i++) {
      const x = ((hash2(i, 3) * 2400 - 400 + t * 12) % 2400) - 400,
        y = HORIZON + 20 + hash2(i, 4) * 320;
      X.fillStyle = "rgba(140,170,240,.12)";
      X.fillRect(x, y, 30 + hash2(i, 5) * 60, 1);
    }
    X.globalCompositeOperation = "source-over";
    if (o.ripples)
      for (const r of o.ripples) {
        X.strokeStyle = rgba(r.col, r.a);
        X.lineWidth = 2;
        X.beginPath();
        X.ellipse(DRUM.x, HORIZON + 40, r.r, r.r * 0.12, 0, 0, TAU);
        X.stroke();
      }
    // cliff
    X.fillStyle = "#0a0d1e";
    X.beginPath();
    X.moveTo(CLIFF[0][0], CLIFF[0][1]);
    for (const p of CLIFF) X.lineTo(p[0], p[1]);
    X.closePath();
    X.fill();
    X.strokeStyle = "rgba(120,140,220,.25)";
    X.lineWidth = 2;
    X.beginPath();
    X.moveTo(160, 600);
    X.lineTo(640, 600);
    X.stroke();
    // grass tufts on the plateau
    X.fillStyle = "#0d1226";
    for (let i = 0; i < 30; i++) {
      const x = 170 + i * 16,
        h = 6 + hash2(i, 9) * 10,
        sw = Math.sin(t * 1.5 + i) * 2;
      X.beginPath();
      X.moveTo(x, 600);
      X.lineTo(x + 3 + sw, 600 - h);
      X.lineTo(x + 6, 600);
      X.fill();
    }
    // bronze drum altar
    drawDrum(t, o.drumGlow || 0, o.drumCol || "#ffcf5a");
    // the wisher, a cloaked figure seen from behind
    drawWisher(t, o.arm || 0);
    if (o.lantern) drawLantern(o.lantern.x, o.lantern.y, o.lantern.s, t);
  }
  function drawDrum(t: any, ga: any, col: any) {
    const D = DRUM;
    X.save();
    X.translate(D.x, D.y);
    const bg = X.createLinearGradient(0, 0, 0, D.ry * 3);
    bg.addColorStop(0, "#6a4626");
    bg.addColorStop(1, "#1d1209");
    X.fillStyle = bg;
    X.beginPath();
    X.ellipse(0, 0, D.rx, D.ry, 0, Math.PI, 0, true);
    X.lineTo(D.rx * 0.9, D.ry * 2.2);
    X.ellipse(0, D.ry * 2.2, D.rx * 0.9, D.ry * 0.7, 0, 0, Math.PI);
    X.closePath();
    X.fill();
    const fg = X.createRadialGradient(0, 0, 0, 0, 0, D.rx);
    fg.addColorStop(0, "#c99654");
    fg.addColorStop(0.6, "#93653a");
    fg.addColorStop(1, "#5c3b1d");
    X.fillStyle = fg;
    X.beginPath();
    X.ellipse(0, 0, D.rx, D.ry, 0, 0, TAU);
    X.fill();
    X.strokeStyle = "rgba(255,226,170,.4)";
    X.lineWidth = 1;
    for (const k of [0.92, 0.74, 0.52, 0.3]) {
      X.beginPath();
      X.ellipse(0, 0, D.rx * k, D.ry * k, 0, 0, TAU);
      X.stroke();
    }
    X.save();
    X.scale(1, D.ry / D.rx);
    X.rotate(t * 0.1);
    X.fillStyle = "rgba(255,226,170,.65)";
    X.beginPath();
    for (let i = 0; i < 28; i++) {
      const r = i % 2 ? D.rx * 0.07 : D.rx * 0.2,
        a = (i / 28) * TAU;
      X.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    X.closePath();
    X.fill();
    X.restore();
    if (ga > 0) {
      X.globalCompositeOperation = "lighter";
      blob(0, 0, D.rx * 2.2, col, ga);
      X.globalCompositeOperation = "source-over";
    }
    X.restore();
  }
  function drawWisher(t: any, arm: any) {
    const F = FIG;
    X.save();
    X.translate(F.x, F.y);
    X.fillStyle = "#05070f";
    // cloak
    X.beginPath();
    X.moveTo(-16, -70);
    X.quadraticCurveTo(-30, -20, -34 + Math.sin(t * 2) * 3, 0);
    X.lineTo(30 + Math.sin(t * 2 + 1) * 3, 0);
    X.quadraticCurveTo(26, -30, 16, -70);
    X.closePath();
    X.fill();
    // hood
    X.beginPath();
    X.ellipse(0, -82, 15, 18, 0, 0, TAU);
    X.fill();
    X.beginPath();
    X.moveTo(-6, -98);
    X.lineTo(4, -112);
    X.lineTo(10, -96);
    X.fill();
    // raised arm toward the sky
    X.save();
    X.translate(-10, -66);
    X.rotate(lerp(0.5, -2.3, arm));
    X.fillRect(-4, 0, 8, 40);
    X.restore();
    // rim light from the moon
    X.strokeStyle = "rgba(170,190,255,.35)";
    X.lineWidth = 1.5;
    X.beginPath();
    X.moveTo(16, -70);
    X.quadraticCurveTo(26, -30, 30, 0);
    X.stroke();
    X.beginPath();
    X.arc(0, -82, 15, -1.2, 0.6);
    X.stroke();
    X.restore();
  }
  function drawLantern(x: any, y: any, s: any, t: any) {
    X.save();
    X.translate(x, y);
    X.scale(s, s);
    X.rotate(Math.sin(t * 2) * 0.06);
    X.globalCompositeOperation = "lighter";
    blob(0, 0, 70, "#ffb24a", 0.85);
    blob(0, 0, 26, "#ffe7b0", 1);
    X.globalCompositeOperation = "source-over";
    X.fillStyle = "#ffd58a";
    X.beginPath();
    X.moveTo(-11, -16);
    X.lineTo(11, -16);
    X.lineTo(14, 14);
    X.lineTo(-14, 14);
    X.closePath();
    X.fill();
    X.strokeStyle = "rgba(150,70,20,.5)";
    X.lineWidth = 1;
    for (let i = -1; i <= 1; i++) {
      X.beginPath();
      X.moveTo(i * 7, -16);
      X.lineTo(i * 9, 14);
      X.stroke();
    }
    X.fillStyle = "#fff6dc";
    X.fillRect(-4, 8, 8, 5);
    X.restore();
  }

  /* ============================ state ============================ */
  const S: any = {
    phase: "idle",
    t: 0,
    gt: 0,
    list: [],
    best: 3,
    idx: 0,
    parts: [],
    rings: [],
    shake: 0,
    flash: 0,
    flashCol: "#ffffff",
    bars: 0,
    slow: 1,
    flared: false,
    cues: {},
  };

  /* ---- particles ---- */
  function spark(x: any, y: any, col: any, o: any = {}) {
    if (S.parts.length > 1600) return;
    const a = o.a !== undefined ? o.a : rand(0, TAU),
      v = o.v !== undefined ? o.v : rand(40, 220);
    S.parts.push({
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      life: o.life || rand(0.4, 1),
      max: o.life || 1,
      size: o.size || rand(2, 5),
      col,
      drag: o.drag || 1.6,
      g: o.g || 0,
      kind: o.kind || "glow",
    });
  }
  function ring(x: any, y: any, r0: any, r1: any, col: any, life: any, w: any, flat: any) {
    S.rings.push({ x, y, r0, r1, col, life, max: life, w, flat: flat === undefined ? 0.3 : flat });
  }
  function updParts(dt: any) {
    for (const p of S.parts) {
      p.life -= dt;
      const d = Math.exp(-p.drag * dt);
      p.vx *= d;
      p.vy = p.vy * d + p.g * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    S.parts = S.parts.filter((p: any) => p.life > 0);
    for (const r of S.rings) r.life -= dt;
    S.rings = S.rings.filter((r: any) => r.life > 0);
  }
  function drawParts() {
    X.globalCompositeOperation = "lighter";
    for (const p of S.parts) {
      const k = clamp(p.life / p.max, 0, 1);
      if (p.kind === "streak") {
        X.strokeStyle = rgba(p.col, k);
        X.lineWidth = p.size * k;
        X.lineCap = "round";
        X.beginPath();
        X.moveTo(p.x, p.y);
        X.lineTo(p.x - p.vx * 0.06, p.y - p.vy * 0.06);
        X.stroke();
      } else blob(p.x, p.y, p.size * (1.5 + k * 2), p.col, k);
    }
    for (const r of S.rings) {
      const k = r.life / r.max,
        e = ease.out(1 - k),
        rad = lerp(r.r0, r.r1, e);
      X.strokeStyle = rgba(r.col, k * 0.9);
      X.lineWidth = r.w * k + 0.5;
      X.beginPath();
      X.ellipse(r.x, r.y, rad, rad * r.flat, 0, 0, TAU);
      X.stroke();
    }
    X.globalCompositeOperation = "source-over";
  }

  /* ============================ shot list ============================ */
  // Shot 1  "Vách đá"     the wisher on the cliff lifts a sky lantern
  // Shot 2  "Lên trời"    follow the lantern through clouds; it bursts into the featured constellation
  // Shot 3  "Sao băng"    a meteor rushes out of deep space (5★ disguises as 4★, then slow-motion flare)
  // Shot 4  "Hạ giới"     wide shot: the meteor falls onto the bronze drum; shockwave across the sea
  // Shot 5  "Hộ Tinh"     silhouette, rim light, colour floods in, name slams in
  const SHOT = { ...CINEMATIC.shots };
  function start(list: any, quiet = false) {
    S.list = list;
    S.best = Math.max(...list.map((x: any) => x.r));
    S.order = [...list].sort((a, b) => a.r - b.r);
    S.idx = 0;
    S.phase = "s1";
    S.t = 0;
    S.parts = [];
    S.rings = [];
    S.flared = false;
    S.cues = {};
    S.slow = 1;
    S.flash = 0;
    S.shake = 0;
    ui.classList.add("off");
    skipBtn.hidden = false;
    hint.hidden = true;
    if (!quiet) CIN.open();
    S.clouds = Array.from({ length: 26 }, (_, i) => ({
      x: rand(-0.2, 1.2),
      y: (i / 26) * 3.2,
      r: rand(0.18, 0.4),
      c: i % 3 ? "#5b6aa8" : "#7a6aa8",
    }));
    S.meteors = [];
    const n = list.length > 1 ? 6 : 1;
    for (let i = 0; i < n; i++)
      S.meteors.push({
        main: i === 0,
        r: i === 0 ? S.best : list[i].r,
        off: i === 0 ? 0 : rand(-0.25, 0.25),
        delay: i === 0 ? 0 : 0.1 + i * 0.07,
        trail: [],
      });
  }
  function cue(name: any, fn: any) {
    if (!S.cues[name]) {
      S.cues[name] = 1;
      fn();
    }
  }
  function go(ph: any) {
    S.phase = ph;
    S.t = 0;
  }
  function enterReveal() {
    S.phase = "reveal";
    S.t = 0;
    S.idx = 0;
    onItem();
  }
  function onItem() {
    const it = S.order[S.idx];
    S.t = 0;
    S.parts = [];
    S.rings = [];
    S.flash = it.r === 5 ? 0.6 : 0.35;
    S.flashCol = RC[it.r];
    S.starsShown = 0;
    S.revealCue = false;
  }
  function nextItem() {
    S.idx++;
    if (S.idx >= S.order.length) {
      if (S.list.length > 1) {
        go("summary");
        S.parts = [];
        hint.textContent = "Chạm để quay lại";
        hint.hidden = false;
        skipBtn.hidden = true;
        S.lastCard = -1;
      } else finish();
    } else onItem();
  }
  function finish() {
    hooks.done();
    ambienceFade();
    S.phase = "idle";
    S.t = 0;
    S.parts = [];
    S.rings = [];
    S.slow = 1;
    ui.classList.remove("off");
    skipBtn.hidden = true;
    hint.hidden = true;
    updPity();
  }
  function skip() {
    if (S.phase === "summary" || S.phase === "idle") return;
    ambienceFade();
    S.slow = 1;
    if (S.phase === "reveal") {
      if (S.list.length > 1) {
        go("summary");
        S.parts = [];
        skipBtn.hidden = true;
        hint.textContent = "Chạm để quay lại";
        hint.hidden = false;
        S.lastCard = -1;
      } else finish();
    } else enterReveal();
  }

  /* ============================ update ============================ */
  function update(rdt: any) {
    const dt = rdt * S.slow;
    S.t += dt;
    S.gt += rdt;
    S.shake = Math.max(0, S.shake - rdt * 36);
    S.flash = Math.max(0, S.flash - rdt * 1.4);
    const cin = ["s1", "s2", "s3", "s4"].includes(S.phase);
    S.bars = clamp(S.bars + (cin ? rdt : -rdt) * 3, 0, 1);
    if (S.phase === "idle") {
      if (Math.random() < rdt * 10)
        spark(rand(0, W), H + 10, "#ffd68c", {
          a: -Math.PI / 2 + rand(-0.3, 0.3),
          v: rand(20, 60),
          drag: 0.2,
          life: rand(3, 6),
          size: rand(1, 2.2),
        });
    } else if (S.phase === "s1") {
      const k = S.t / SHOT.s1;
      if (S.t > 1.0) cue("lantern", CIN.lantern);
      if (S.t >= SHOT.s1) {
        go("s2");
        CIN.rise();
      }
    } else if (S.phase === "s2") {
      const k = S.t / SHOT.s2;
      if (S.t > 0.9) {
        const ln = Math.floor((S.t - 0.9) / 0.08);
        if (ln >= 0 && ln < BIRD_EDGES.length) cue("l" + ln, () => CIN.line(ln));
      }
      if (S.t > 0.85)
        cue("burst", () => {
          CIN.burstStars();
          S.flash = 0.35;
          S.flashCol = "#ffe1a0";
          for (let i = 0; i < 90; i++)
            spark(W / 2, H * 0.55, i % 2 ? "#ffd68c" : "#ffffff", { v: rand(80, 520), life: rand(0.6, 1.4) });
        });
      if (S.t >= SHOT.s2) {
        go("s3");
        CIN.meteor();
      }
    } else if (S.phase === "s3") {
      const k = clamp(S.t / SHOT.s3, 0, 1);
      const m = S.meteors[0];
      if (S.best === 5 && k > 0.55 && !S.flared) {
        S.flared = true;
        S.slow = CINEMATIC.slowMo;
        S.flash = 0.7;
        S.flashCol = RC[5];
        CIN.slowmo();
        for (let i = 0; i < 120; i++)
          spark(m.x || W / 2, m.y || H / 2, i % 2 ? RC[5] : "#ffffff", {
            v: rand(150, 700),
            life: rand(0.6, 1.4),
            size: rand(2, 5),
          });
        ring(m.x || W / 2, m.y || H / 2, 10, Math.max(W, H) * 0.5, RC[5], 1.2, 10, 1);
      }
      if (S.flared && S.slow < 1 && k > 0.72) S.slow = Math.min(1, S.slow + rdt * 2.5);
      if (S.t >= SHOT.s3) {
        S.slow = 1;
        go("s4");
        CIN.descend();
      }
    } else if (S.phase === "s4") {
      if (S.t > 1.0)
        cue("impact", () => {
          SFX.impact(S.best);
          S.shake = reduce ? 0 : S.best === 5 ? 24 : S.best === 4 ? 15 : 9;
          S.flash = 1;
          S.flashCol = RC[S.best];
        });
      if (S.t >= SHOT.s4) enterReveal();
    } else if (S.phase === "reveal") {
      const it = S.order[S.idx],
        col = RC[it.r];
      if (S.t > 0.55 && !S.revealCue) {
        S.revealCue = true;
        SFX.reveal(it.r);
      }
      if (Math.random() < (it.r === 5 ? 0.9 : 0.45))
        spark(rand(0, W), H + 10, it.r === 5 ? (Math.random() < 0.5 ? RC[5] : "#fff2c8") : col, {
          a: -Math.PI / 2 + rand(-0.25, 0.25),
          v: rand(40, 160),
          drag: 0.3,
          life: rand(2, 4),
          size: rand(1.5, 3.5),
        });
      const want = Math.min(it.r, Math.floor(clamp((S.t - 1.15) / 0.15, 0, 9)));
      while (S.starsShown < want) {
        SFX.star(S.starsShown, it.r);
        S.starsShown++;
      }
    } else if (S.phase === "summary") {
      if (Math.random() < 0.5)
        spark(rand(0, W), H + 10, "#ffd68c", {
          a: -Math.PI / 2,
          v: rand(20, 60),
          drag: 0.2,
          life: 4,
          size: rand(1, 2),
        });
      const shown = Math.floor(S.t / 0.07);
      if (shown <= S.list.length && shown !== S.lastCard) {
        S.lastCard = shown;
        if (shown > 0) SFX.card();
      }
    }
    updParts(rdt);
  }

  /* ============================ shots ============================ */
  function shot1(t: any) {
    const k = S.t / SHOT.s1,
      e = ease.inOut(clamp(k, 0, 1));
    cam = { x: lerp(760, 520, e), y: lerp(470, 520, e), z: lerp(1, 1.55, e) };
    const arm = clamp((S.t - 0.5) / 0.6, 0, 1);
    const lt = clamp((S.t - 1.0) / 1.6, 0, 1);
    const lantern =
      S.t > 1.0
        ? { x: FIG.x - 30 + Math.sin(lt * 4) * 10, y: lerp(FIG.y - 150, FIG.y - 560, ease.in(lt)), s: lerp(1, 0.7, lt) }
        : null;
    X.save();
    applyCam();
    drawSet(t, { arm: ease.out(arm), lantern, drumGlow: 0.08 });
    X.restore();
  }
  function shot2(t: any) {
    const k = clamp(S.t / SHOT.s2, 0, 1);
    // the sky as the camera tilts up after the lantern
    const g = X.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, mix("#0b1030", "#02030a", k));
    g.addColorStop(1, mix("#24305e", "#0a0d24", k));
    X.fillStyle = g;
    X.fillRect(0, 0, W, H);
    const scroll = ease.out(k) * H * 2.6;
    for (const s of stars) {
      const y = ((s.y * H * 1.4 + scroll * s.d * 0.35) % (H * 1.4)) - H * 0.2;
      X.globalAlpha = (0.3 + 0.6 * Math.abs(Math.sin(t * 0.8 + s.p))) * (0.4 + k * 0.6);
      X.fillStyle = "#e9ecff";
      X.fillRect(s.x * W, y, s.r, s.r + scroll * 0.0008 * s.d * 40);
    }
    X.globalAlpha = 1;
    X.globalCompositeOperation = "lighter";
    for (const c of S.clouds) {
      const y = ((c.y * H - scroll * 1.2 + H * 3) % (H * 3.2)) - H * 0.4;
      blob(c.x * W, y, c.r * Math.max(W, H), c.c, 0.22 * (1 - k * 0.6));
    }
    X.globalCompositeOperation = "source-over";
    // lantern rises and bursts into the constellation
    const lx = W / 2 + Math.sin(S.t * 3) * 8,
      ly = lerp(H * 0.75, H * 0.55, ease.out(clamp(S.t / 0.85, 0, 1)));
    if (S.t < 0.85) {
      X.save();
      X.translate(0, 0);
      drawLanternScreen(lx, ly, lerp(1.4, 0.8, S.t / 0.85), t);
      X.restore();
    }
    const R = Math.min(W, H) * 0.42,
      cx = W / 2,
      cy = H * 0.5;
    if (S.t > 0.85) {
      const lk = clamp((S.t - 0.9) / (BIRD_EDGES.length * 0.08), 0, 1),
        edges = Math.floor(lk * BIRD_EDGES.length),
        part = lk * BIRD_EDGES.length - edges;
      X.save();
      X.translate(cx, cy);
      X.rotate(-0.08 + S.t * 0.03);
      X.globalCompositeOperation = "lighter";
      X.strokeStyle = "rgba(201,154,91,.35)";
      X.lineWidth = 1;
      for (const kk of [1.25, 1.05]) {
        X.beginPath();
        X.ellipse(0, 0, R * kk, R * kk * 0.92, 0, 0, TAU * Math.min(1, (S.t - 0.85) * 1.5));
        X.stroke();
      }
      X.strokeStyle = "rgba(255,214,140,.85)";
      X.lineWidth = 2.2;
      X.shadowColor = "#ffd68c";
      X.shadowBlur = 12;
      for (let i = 0; i < Math.min(BIRD_EDGES.length, edges + 1); i++) {
        const [a, b] = BIRD_EDGES[i];
        const f = i < edges ? 1 : part;
        const A = BIRD[a],
          B = BIRD[b];
        X.beginPath();
        X.moveTo(A[0] * R, A[1] * R);
        X.lineTo(lerp(A[0], B[0], f) * R, lerp(A[1], B[1], f) * R);
        X.stroke();
      }
      X.shadowBlur = 0;
      BIRD.forEach((p, i) =>
        blob(p[0] * R, p[1] * R, 10 + 4 * Math.sin(t * 3 + i), "#ffd68c", clamp((S.t - 0.85) * 3 - i * 0.1, 0, 1)),
      );
      X.restore();
      X.globalCompositeOperation = "source-over";
      X.textAlign = "center";
      X.globalAlpha = clamp((S.t - 1.3) / 0.4, 0, 1) * (1 - clamp((S.t - 2) / 0.2, 0, 1));
      X.font = `italic 600 ${Math.round(Math.min(W * 0.03, 30))}px "Cormorant Garamond",Georgia,serif`;
      X.fillStyle = "#ffe7b8";
      X.fillText("Chòm Hồng Điểu", cx, cy + R * 0.62);
      X.globalAlpha = 1;
    }
    drawParts();
  }
  function drawLanternScreen(x: any, y: any, s: any, t: any) {
    X.save();
    X.translate(x, y);
    X.scale(s, s);
    X.globalCompositeOperation = "lighter";
    blob(0, 0, 90, "#ffb24a", 0.9);
    blob(0, 0, 30, "#ffe7b0", 1);
    X.globalCompositeOperation = "source-over";
    X.fillStyle = "#ffd58a";
    X.beginPath();
    X.moveTo(-14, -20);
    X.lineTo(14, -20);
    X.lineTo(18, 18);
    X.lineTo(-18, 18);
    X.closePath();
    X.fill();
    X.fillStyle = "#fff6dc";
    X.fillRect(-5, 10, 10, 6);
    X.restore();
  }
  function shot3(t: any) {
    const k = clamp(S.t / SHOT.s3, 0, 1);
    X.fillStyle = "#02030a";
    X.fillRect(0, 0, W, H);
    const vx = W * 0.72,
      vy = H * 0.28;
    // warp starfield streaking away from the vanishing point
    const speed = 0.4 + ease.in(k) * 2.2;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const a = s.p * 10,
        d = (s.y + S.gt * 0.25 * s.d * speed) % 1;
      const r = Math.pow(d, 2) * Math.hypot(W, H);
      const x = vx + Math.cos(a) * r,
        y = vy + Math.sin(a) * r;
      const len = Math.max(1, r * 0.06 * speed);
      X.strokeStyle = `rgba(220,228,255,${0.15 + d * 0.7})`;
      X.lineWidth = s.r * (0.5 + d);
      X.beginPath();
      X.moveTo(x, y);
      X.lineTo(x - Math.cos(a) * len, y - Math.sin(a) * len);
      X.stroke();
    }
    X.globalCompositeOperation = "lighter";
    for (const m of S.meteors) {
      const tt = clamp((S.t - m.delay) / (SHOT.s3 * 0.95), 0, 1);
      if (tt <= 0) continue;
      const e = ease.in(tt);
      const x = lerp(vx, W * (-0.15 + m.off * 0.5), e) + Math.sin(e * 3) * W * 0.05,
        y = lerp(vy, H * (1.05 + m.off * 0.3), e);
      const size = lerp(2, m.main ? Math.min(W, H) * 0.06 : Math.min(W, H) * 0.02, e);
      let col = RC[m.r];
      if (m.main && S.best === 5) col = k < 0.55 ? RC[4] : mix(RC[4], RC[5], clamp((k - 0.55) / 0.06, 0, 1));
      m.x = x;
      m.y = y;
      m.col = col;
      m.trail.unshift({ x, y, s: size });
      if (m.trail.length > 40) m.trail.pop();
      for (let i = 0; i < m.trail.length - 1; i++) {
        const f = 1 - i / m.trail.length,
          p = m.trail[i],
          q = m.trail[i + 1];
        X.strokeStyle = rgba(col, f * 0.85);
        X.lineWidth = p.s * f * 1.2;
        X.lineCap = "round";
        X.beginPath();
        X.moveTo(p.x, p.y);
        X.lineTo(q.x, q.y);
        X.stroke();
      }
      blob(x, y, size * 4, col, 1);
      blob(x, y, size * 1.3, "#ffffff", 1);
      if (m.main) {
        flareH(x, y, size * 14, size * 0.9, col, 0.6);
        flareH(x, y, size * 0.9, size * 6, col, 0.25);
        if (Math.random() < 0.9) spark(x, y, col, { v: rand(30, 160), life: rand(0.3, 0.7), size: rand(2, 4) });
      }
    }
    X.globalCompositeOperation = "source-over";
    drawParts();
  }
  function shot4(t: any) {
    const k = clamp(S.t / SHOT.s4, 0, 1);
    const hit = clamp((S.t - 1.0) / 0.9, 0, 1);
    cam = {
      x: lerp(720, DRUM.x + 60, ease.inOut(clamp(S.t / 1.0, 0, 1))),
      y: lerp(380, 560, ease.inOut(clamp(S.t / 1.0, 0, 1))),
      z: lerp(0.95, 1.25, ease.inOut(clamp(S.t / 1.2, 0, 1))),
    };
    const col = RC[S.best];
    const ripples =
      hit > 0
        ? [0, 1, 2].map((i) => ({
            r: lerp(20, 900, clamp(hit * 1.2 - i * 0.15, 0, 1)),
            a: 0.6 * (1 - clamp(hit * 1.2 - i * 0.15, 0, 1)),
            col,
          }))
        : null;
    X.save();
    applyCam();
    drawSet(t, { arm: 1, drumGlow: hit > 0 ? (1 - hit) * 1.2 + 0.3 : 0.1, drumCol: col, ripples });
    // falling meteor in world space
    X.globalCompositeOperation = "lighter";
    if (S.t < 1.0) {
      const f = ease.in(S.t / 1.0);
      const sx = 1380,
        sy = -40,
        x = lerp(sx, DRUM.x, f),
        y = lerp(sy, DRUM.y, f);
      for (let i = 0; i < 24; i++) {
        const g = i / 24;
        const px = lerp(sx, DRUM.x, Math.max(0, f - g * 0.25)),
          py = lerp(sy, DRUM.y, Math.max(0, f - g * 0.25));
        blob(px, py, 40 * (1 - g), col, 0.5 * (1 - g));
      }
      blob(x, y, 90, col, 1);
      blob(x, y, 26, "#ffffff", 1);
    } else {
      // shockwave dome and light pillars
      const D = DRUM;
      X.strokeStyle = rgba(col, 0.8 * (1 - hit));
      X.lineWidth = 6 * (1 - hit) + 1;
      X.beginPath();
      X.ellipse(D.x, D.y, lerp(20, 1100, ease.out(hit)), lerp(8, 260, ease.out(hit)), 0, 0, TAU);
      X.stroke();
      X.beginPath();
      X.ellipse(D.x, D.y, lerp(10, 500, ease.out(hit)), lerp(10, 500, ease.out(hit)), 0, Math.PI, 0);
      X.stroke();
      for (let i = 0; i < S.best; i++) {
        const px = D.x + (i - (S.best - 1) / 2) * 48;
        const pg = X.createLinearGradient(0, D.y, 0, D.y - 900);
        pg.addColorStop(0, rgba(col, 0.85 * (1 - hit * 0.6)));
        pg.addColorStop(1, rgba(col, 0));
        X.fillStyle = pg;
        X.fillRect(px - 10 * (1 + hit), D.y - 900, 20 * (1 + hit), 900);
      }
      if (!S.cues.burst4) {
        S.cues.burst4 = 1;
        for (let i = 0; i < 160; i++)
          S.parts.push({
            x: D.x,
            y: D.y,
            vx: Math.cos(rand(Math.PI, TAU)) * rand(100, 700),
            vy: Math.sin(rand(Math.PI, TAU)) * rand(100, 700),
            life: rand(0.6, 1.4),
            max: 1.4,
            size: rand(2, 5),
            col: i % 3 ? col : "#ffffff",
            drag: 1.2,
            g: 500,
            kind: "glow",
          });
      }
    }
    X.globalCompositeOperation = "source-over";
    drawParts();
    X.restore();
  }
  /* ---- reveal: silhouette, rim light, colour flood ---- */
  function silhouette(id: any, h: any, col: any) {
    const key = id + h + col;
    if (silCache[key]) return silCache[key];
    const a = charArt(id, h, true),
      c = document.createElement("canvas");
    c.width = a.width;
    c.height = a.height;
    const g = c.getContext("2d")!;
    g.drawImage(a, 0, 0);
    g.globalCompositeOperation = "source-in";
    g.fillStyle = col;
    g.fillRect(0, 0, c.width, c.height);
    silCache[key] = c;
    return c;
  }
  function drawElementIcon(el: any, x: any, y: any, s: any) {
    const c = EL[el].c;
    X.save();
    X.translate(x, y);
    X.strokeStyle = c;
    X.fillStyle = rgba(c, 0.25);
    X.lineWidth = Math.max(1.5, s * 0.09);
    X.lineJoin = "round";
    X.beginPath();
    if (el === "fire") {
      X.moveTo(0, -s * 0.55);
      X.bezierCurveTo(s * 0.45, -s * 0.15, s * 0.4, s * 0.45, 0, s * 0.5);
      X.bezierCurveTo(-s * 0.4, s * 0.45, -s * 0.45, -s * 0.05, -s * 0.1, -s * 0.2);
      X.bezierCurveTo(-s * 0.05, 0, s * 0.05, -s * 0.2, 0, -s * 0.55);
    } else if (el === "water") {
      X.moveTo(0, -s * 0.55);
      X.bezierCurveTo(s * 0.5, 0, s * 0.4, s * 0.5, 0, s * 0.5);
      X.bezierCurveTo(-s * 0.4, s * 0.5, -s * 0.5, 0, 0, -s * 0.55);
    } else if (el === "wind") {
      for (let i = 0; i < 40; i++) {
        const a = (i / 40) * TAU * 1.6,
          r = s * 0.06 + (i / 40) * s * 0.45;
        X.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
    } else if (el === "bolt") {
      X.moveTo(s * 0.1, -s * 0.55);
      X.lineTo(-s * 0.25, s * 0.05);
      X.lineTo(s * 0.05, s * 0.05);
      X.lineTo(-s * 0.1, s * 0.55);
      X.lineTo(s * 0.3, -s * 0.1);
      X.lineTo(0, -s * 0.1);
      X.closePath();
    } else if (el === "earth") {
      X.moveTo(0, -s * 0.55);
      X.lineTo(s * 0.45, 0);
      X.lineTo(0, s * 0.55);
      X.lineTo(-s * 0.45, 0);
      X.closePath();
      X.moveTo(-s * 0.45, 0);
      X.lineTo(s * 0.45, 0);
    } else {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU;
        X.moveTo(0, 0);
        X.lineTo(Math.cos(a) * s * 0.5, Math.sin(a) * s * 0.5);
        X.moveTo(Math.cos(a) * s * 0.3, Math.sin(a) * s * 0.3);
        X.lineTo(Math.cos(a + 0.4) * s * 0.4, Math.sin(a + 0.4) * s * 0.4);
      }
    }
    if (el !== "wind" && el !== "ice") X.fill();
    X.stroke();
    X.restore();
  }
  function drawItemIcon(k: any, x: any, y: any, s: any, col: any, wid?: string) {
    const im = wid ? weaponBitmap(wid) : null;
    if (im) {
      X.save();
      X.translate(x, y);
      X.globalCompositeOperation = "lighter";
      blob(0, 0, s * 0.9, col, 0.5);
      X.globalCompositeOperation = "source-over";
      const d = s * 1.25;
      X.drawImage(im, -d / 2, -d / 2, d, d);
      X.restore();
      return;
    }
    X.save();
    X.translate(x, y);
    X.rotate(-0.6);
    X.globalCompositeOperation = "lighter";
    blob(0, 0, s * 0.9, col, 0.5);
    X.globalCompositeOperation = "source-over";
    X.fillStyle = "#cfd6e4";
    X.strokeStyle = col;
    X.lineWidth = 2;
    if (k === "sword") {
      rr(X, -s * 0.04, -s * 0.5, s * 0.08, s * 0.75, 3);
      X.fill();
      X.fillStyle = col;
      X.fillRect(-s * 0.16, s * 0.22, s * 0.32, s * 0.05);
    } else if (k === "great") {
      X.beginPath();
      X.moveTo(-s * 0.1, s * 0.25);
      X.lineTo(-s * 0.12, -s * 0.42);
      X.lineTo(0, -s * 0.55);
      X.lineTo(s * 0.12, -s * 0.42);
      X.lineTo(s * 0.1, s * 0.25);
      X.closePath();
      X.fill();
      X.fillStyle = col;
      X.fillRect(-s * 0.22, s * 0.25, s * 0.44, s * 0.06);
    } else if (k === "spear") {
      X.fillStyle = "#7a5534";
      X.fillRect(-s * 0.03, -s * 0.4, s * 0.06, s * 0.95);
      X.fillStyle = col;
      X.beginPath();
      X.moveTo(0, -s * 0.6);
      X.lineTo(-s * 0.1, -s * 0.38);
      X.lineTo(s * 0.1, -s * 0.38);
      X.closePath();
      X.fill();
    } else if (k === "bow") {
      X.beginPath();
      X.arc(0, 0, s * 0.45, -1.2, 1.2);
      X.stroke();
      X.strokeStyle = "#fff";
      X.lineWidth = 1;
      X.beginPath();
      X.moveTo(Math.cos(-1.2) * s * 0.45, Math.sin(-1.2) * s * 0.45);
      X.lineTo(Math.cos(1.2) * s * 0.45, Math.sin(1.2) * s * 0.45);
      X.stroke();
    } else {
      rr(X, -s * 0.3, -s * 0.38, s * 0.6, s * 0.76, 6);
      X.fill();
      X.fillStyle = col;
      X.fillRect(-s * 0.22, -s * 0.28, s * 0.44, s * 0.06);
      X.fillRect(-s * 0.22, -s * 0.12, s * 0.3, s * 0.04);
    }
    X.restore();
  }
  function drawRays(x: any, y: any, col: any, a: any, t: any, n: any) {
    X.save();
    X.translate(x, y);
    X.rotate(t * 0.12);
    X.globalCompositeOperation = "lighter";
    X.fillStyle = rgba(col, a);
    const L = Math.hypot(W, H);
    for (let i = 0; i < n; i++) {
      X.rotate(TAU / n);
      X.beginPath();
      X.moveTo(0, 0);
      X.lineTo(L, -L * 0.05);
      X.lineTo(L, L * 0.05);
      X.closePath();
      X.fill();
    }
    X.restore();
    X.globalCompositeOperation = "source-over";
  }
  function wrapText(txt: any, x: any, y: any, maxW: any, lh: any) {
    const words = txt.split(" ");
    let line = "",
      yy = y;
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (X.measureText(test).width > maxW && line) {
        X.fillText(line, x, yy);
        line = w;
        yy += lh;
      } else line = test;
    }
    if (line) X.fillText(line, x, yy);
  }
  function drawReveal(t: any) {
    const it = S.order[S.idx],
      col = RC[it.r],
      land = W >= H * 1.05;
    X.fillStyle = "#04050c";
    X.fillRect(0, 0, W, H);
    for (const s of stars) {
      X.globalAlpha = 0.25 + 0.4 * Math.abs(Math.sin(t * 0.7 * s.d + s.p));
      X.fillStyle = "#e9ecff";
      X.fillRect(s.x * W, s.y * H, s.r, s.r);
    }
    X.globalAlpha = 1;
    const cx = land ? W * 0.66 : W / 2,
      cy = land ? H * 0.5 : H * 0.36;
    const lit = clamp((S.t - 0.55) / 0.45, 0, 1);
    const g = X.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
    g.addColorStop(0, rgba(col, 0.15 + 0.3 * lit));
    g.addColorStop(0.5, rgba(col, 0.05 + 0.06 * lit));
    g.addColorStop(1, "rgba(0,0,0,0)");
    X.fillStyle = g;
    X.fillRect(0, 0, W, H);
    drawRays(cx, cy, col, (it.r === 5 ? 0.075 : 0.045) * (0.3 + 0.7 * lit), t, it.r === 5 ? 26 : 16);
    X.save();
    X.translate(cx, cy);
    X.rotate(t * 0.05);
    X.strokeStyle = rgba(col, 0.35 * lit);
    X.lineWidth = 1.2;
    const R0 = Math.min(W, H) * (land ? 0.4 : 0.31);
    for (const k of [1, 0.86, 0.7]) {
      X.beginPath();
      X.arc(0, 0, R0 * k, 0, TAU);
      X.stroke();
    }
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * TAU;
      X.beginPath();
      X.moveTo(Math.cos(a) * R0, Math.sin(a) * R0);
      X.lineTo(Math.cos(a) * R0 * (i % 4 ? 0.97 : 0.93), Math.sin(a) * R0 * (i % 4 ? 0.97 : 0.93));
      X.stroke();
    }
    X.restore();
    if (it.kind === "char") {
      const ch = byId[it.id],
        h = Math.round(Math.min(H * (land ? 0.96 : 0.64), W * (land ? 0.62 : 1.05))),
        art = charArt(it.id, h),
        w = art.width;
      const push = lerp(1.12, 1, ease.out(clamp(S.t / 1.1, 0, 1)));
      X.save();
      X.translate(cx, cy + h * 0.02);
      X.scale(push, push);
      const ax = -w / 2,
        ay = -h * 0.52;
      // rim light behind the silhouette
      X.globalCompositeOperation = "lighter";
      const rim = silhouette(it.id, h, col);
      X.globalAlpha = 0.55 * (1 - lit * 0.6);
      X.drawImage(rim, ax - 4, ay - 3);
      X.drawImage(rim, ax + 4, ay - 3);
      X.globalAlpha = 1;
      X.globalCompositeOperation = "source-over";
      X.drawImage(silhouette(it.id, h, "#06070f"), ax, ay);
      // colour floods in from the feet up
      if (lit > 0) {
        X.save();
        X.beginPath();
        X.rect(ax, ay + h * (1 - ease.out(lit)), w, h * ease.out(lit) + 2);
        X.clip();
        X.drawImage(charArt(it.id, h, true), ax, ay);
        X.restore();
        if (lit < 1) {
          X.globalCompositeOperation = "lighter";
          const yb = ay + h * (1 - ease.out(lit));
          const lg = X.createLinearGradient(0, yb - 20, 0, yb + 20);
          lg.addColorStop(0, rgba(col, 0));
          lg.addColorStop(0.5, rgba(col, 0.9));
          lg.addColorStop(1, rgba(col, 0));
          X.fillStyle = lg;
          X.fillRect(ax, yb - 20, w, 40);
          X.globalCompositeOperation = "source-over";
        }
      }
      X.restore();
      if (S.t > 0.55 && S.t < 0.62 && !S.cues["b" + S.idx]) {
        S.cues["b" + S.idx] = 1;
        for (let i = 0; i < (it.r === 5 ? 140 : 70); i++)
          spark(cx, cy, i % 2 ? EL[ch.el].c : col, { v: rand(100, 600), life: rand(0.6, 1.3), size: rand(2, 5) });
        ring(cx, cy, 20, Math.min(W, H) * 0.6, col, 0.9, 8, 1);
      }
      // text block
      const tx = land ? Math.max(28, W * 0.07) : W / 2,
        ty = land ? H * 0.52 : H * 0.74;
      X.textAlign = land ? "left" : "center";
      const nameSize = Math.round(Math.min(land ? W * 0.078 : W * 0.12, 100));
      const nk = clamp((S.t - 0.9) / 0.35, 0, 1),
        ns = lerp(1.5, 1, ease.out(nk));
      X.globalAlpha = clamp((S.t - 0.75) / 0.35, 0, 1);
      X.font = `600 ${Math.max(12, Math.round(nameSize * 0.2))}px "Be Vietnam Pro",sans-serif`;
      X.fillStyle = EL[ch.el].c2;
      const elLine = `${ch.title} · ${EL[ch.el].vi}`;
      if (land) {
        drawElementIcon(ch.el, tx + nameSize * 0.18, ty - nameSize * 1.02, nameSize * 0.32);
        X.fillText(elLine, tx + nameSize * 0.42, ty - nameSize * 0.95);
      } else X.fillText(elLine, tx, ty - nameSize * 0.95);
      X.save();
      X.translate(tx, ty);
      X.scale(ns, ns);
      X.globalAlpha = nk;
      X.font = `700 ${nameSize}px "Cormorant Garamond",Georgia,serif`;
      X.shadowColor = rgba(col, 0.8);
      X.shadowBlur = 26;
      X.fillStyle = "#fbf5e6";
      X.fillText(ch.name, 0, 0);
      X.shadowBlur = 0;
      X.restore();
      if (it.r === 5 && S.t > 1.3 && S.t < 2.6) {
        X.font = `700 ${nameSize}px "Cormorant Garamond",Georgia,serif`;
        const mw = X.measureText(ch.name).width,
          sx = land ? tx : tx - mw / 2,
          k = (S.t - 1.3) / 1.3;
        X.globalCompositeOperation = "lighter";
        const lx = sx + mw * k * 1.4 - mw * 0.2;
        const lg = X.createLinearGradient(lx - 40, 0, lx + 40, 0);
        lg.addColorStop(0, "rgba(255,230,160,0)");
        lg.addColorStop(0.5, "rgba(255,240,200,.55)");
        lg.addColorStop(1, "rgba(255,230,160,0)");
        X.fillStyle = lg;
        X.globalAlpha = 1;
        X.fillText(ch.name, tx, ty);
        X.globalCompositeOperation = "source-over";
      }
      const sy = ty + nameSize * 0.55,
        ss = Math.max(18, nameSize * 0.3);
      for (let i = 0; i < it.r; i++) {
        const st = clamp((S.t - 1.15 - i * 0.15) / 0.25, 0, 1);
        if (st <= 0) continue;
        const sc = ease.back(st);
        const sx2 = land ? tx + ss * 0.6 + i * ss * 1.15 : tx + (i - (it.r - 1) / 2) * ss * 1.15;
        X.save();
        X.translate(sx2, sy);
        X.scale(sc, sc);
        X.globalAlpha = 1;
        X.globalCompositeOperation = "lighter";
        blob(0, 0, ss * 0.9, col, 0.6 * st);
        X.globalCompositeOperation = "source-over";
        X.fillStyle = col;
        X.beginPath();
        for (let k = 0; k < 10; k++) {
          const r = k % 2 ? ss * 0.22 : ss * 0.5,
            a = (k / 10) * TAU - Math.PI / 2;
          X.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        X.closePath();
        X.fill();
        X.restore();
      }
      X.globalAlpha = clamp((S.t - 1.8) / 0.5, 0, 1);
      X.font = `italic 600 ${Math.max(14, Math.round(nameSize * 0.24))}px "Cormorant Garamond",Georgia,serif`;
      X.fillStyle = "rgba(243,236,219,.85)";
      wrapText(
        `“${ch.line}”`,
        tx,
        sy + ss * 1.5,
        land ? Math.min(W * 0.42, 520) : W * 0.86,
        Math.max(18, nameSize * 0.3),
      );
      X.font = `700 ${Math.max(11, Math.round(nameSize * 0.15))}px "Be Vietnam Pro",sans-serif`;
      X.fillStyle = col;
      X.fillText(
        (it.isNew ? "HỘ TINH MỚI" : "ĐÃ GẶP LẠI · +1 CUNG MỆNH") + (it.feat ? " · NHÂN VẬT GIỚI HẠN" : ""),
        tx,
        ty - nameSize * 1.45,
      );
      X.globalAlpha = 1;
    } else {
      const enter = ease.out(clamp(S.t / 0.5, 0, 1));
      const s = Math.min(W, H) * 0.42;
      drawItemIcon(it.k, cx + (1 - enter) * 80, cy, s, col, it.wid);
      X.textAlign = "center";
      const tx = land ? cx : W / 2,
        ty = land ? H * 0.86 : H * 0.74;
      X.font = `700 ${Math.round(Math.min(W * 0.07, 64))}px "Cormorant Garamond",Georgia,serif`;
      X.fillStyle = "#f3ecdb";
      X.globalAlpha = enter;
      X.fillText(it.name, tx, ty);
      X.font = `600 14px "Be Vietnam Pro",sans-serif`;
      X.fillStyle = col;
      X.fillText(
        it.wid
          ? `${"★".repeat(it.r)} · BINH KHÍ${it.feat ? " NỔI BẬT" : ""}${it.r === 3 ? " · +500 Xu" : ""}`
          : "★★★ · đổi thành 500 Xu",
        tx,
        ty + 30,
      );
      X.globalAlpha = 1;
    }
    drawParts();
    X.textAlign = "center";
    X.font = `500 12px "Be Vietnam Pro",sans-serif`;
    X.fillStyle = "rgba(243,236,219,.5)";
    X.fillText(`${S.idx + 1}/${S.order.length} · chạm để tiếp tục`, W / 2, H - 18);
  }
  function drawSummary(t: any) {
    X.fillStyle = "#04050c";
    X.fillRect(0, 0, W, H);
    for (const s of stars) {
      X.globalAlpha = 0.3 + 0.4 * Math.abs(Math.sin(S.gt * 0.7 * s.d + s.p));
      X.fillStyle = "#e9ecff";
      X.fillRect(s.x * W, s.y * H, s.r, s.r);
    }
    X.globalAlpha = 1;
    const items = [...S.list].sort((a, b) => b.r - a.r),
      n = items.length,
      cols = n > 5 ? 5 : n,
      rows = Math.ceil(n / cols);
    const gap = Math.max(6, W * 0.008),
      cw = Math.min((W - 32) / cols - gap, 200),
      ch = Math.min(cw * 1.55, (H - 130) / rows - gap),
      cwF = ch / 1.55;
    const totalW = cols * (cwF + gap) - gap,
      ox = (W - totalW) / 2,
      oy = (H - (rows * (ch + gap) - gap)) / 2 + 14;
    X.textAlign = "center";
    X.font = `700 ${Math.round(Math.min(40, W * 0.05))}px "Cormorant Garamond",Georgia,serif`;
    X.fillStyle = "#f3ecdb";
    X.fillText("Sao đã rơi", W / 2, Math.max(40, oy - 20));
    items.forEach((it, i) => {
      const p = clamp((t - i * 0.07) / 0.35, 0, 1);
      if (p <= 0) return;
      const x = ox + (i % cols) * (cwF + gap),
        y = oy + Math.floor(i / cols) * (ch + gap) + (1 - ease.out(p)) * 30;
      const sx = Math.abs(Math.cos(Math.PI * (1 - p)));
      const front = p > 0.5,
        col = RC[it.r];
      X.save();
      X.translate(x + cwF / 2, y + ch / 2);
      X.scale(Math.max(0.02, sx), 1);
      X.translate(-cwF / 2, -ch / 2);
      if (it.r === 5 && front) {
        X.globalCompositeOperation = "lighter";
        blob(cwF / 2, ch / 2, cwF * 1.1, col, 0.35 + 0.15 * Math.sin(S.gt * 3));
        X.globalCompositeOperation = "source-over";
      }
      rr(X, 0, 0, cwF, ch, 10);
      X.save();
      X.clip();
      if (!front) {
        X.fillStyle = "#1a1630";
        X.fillRect(0, 0, cwF, ch);
        X.strokeStyle = "rgba(201,154,91,.5)";
        for (let k = 1; k < 5; k++) {
          X.beginPath();
          X.arc(cwF / 2, ch / 2, cwF * 0.12 * k, 0, TAU);
          X.stroke();
        }
      } else if (it.kind === "char") X.drawImage(cardArt(it.id, 200, 310), 0, 0, cwF, ch);
      else {
        const [a, b] = LOOT_BG[it.r] ?? LOOT_BG[3]!;
        const lg = X.createLinearGradient(0, 0, cwF, ch);
        lg.addColorStop(0, a);
        lg.addColorStop(1, b);
        X.fillStyle = lg;
        X.fillRect(0, 0, cwF, ch);
        X.fillStyle = "rgba(255,255,255,.35)";
        for (let k = 0; k < 14; k++)
          X.fillRect((((k * 53) % 97) / 97) * cwF, (((k * 31) % 89) / 89) * ch * 0.8, 1.5, 1.5);
        drawItemIcon(it.k, cwF / 2, ch * 0.42, cwF * 0.8, col, it.wid);
      }
      if (front && it.kind !== "char") {
        const sh = ch * 0.17;
        X.fillStyle = "#ece5d6";
        X.fillRect(0, ch - sh, cwF, sh);
        X.fillStyle = "#3a3226";
        X.font = `700 ${Math.max(10, Math.round(cwF * 0.1))}px "Be Vietnam Pro",sans-serif`;
        X.textAlign = "center";
        X.fillText(it.name, cwF / 2, ch - sh * 0.32, cwF - 8);
        X.fillStyle = col;
        X.font = `${Math.max(10, Math.round(cwF * 0.11))}px sans-serif`;
        X.fillText("★".repeat(it.r), cwF / 2, ch - sh - 4);
      } else if (front) {
        const vg = X.createLinearGradient(0, ch * 0.55, 0, ch);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, "rgba(0,0,0,.75)");
        X.fillStyle = vg;
        X.fillRect(0, 0, cwF, ch);
        X.fillStyle = "#fff";
        X.font = `700 ${Math.max(10, Math.round(cwF * 0.11))}px "Be Vietnam Pro",sans-serif`;
        X.textAlign = "center";
        X.fillText(it.name, cwF / 2, ch - cwF * 0.2);
        X.fillStyle = col;
        X.font = `${Math.max(10, Math.round(cwF * 0.12))}px sans-serif`;
        X.fillText("★".repeat(it.r), cwF / 2, ch - cwF * 0.06);
      }
      X.restore();
      X.strokeStyle = front ? col : "rgba(201,154,91,.6)";
      X.lineWidth = 2;
      rr(X, 0, 0, cwF, ch, 10);
      X.stroke();
      X.restore();
    });
    drawParts();
  }
  function drawIdle(t: any) {
    cam = { x: 640 + Math.sin(t * 0.1) * 20, y: 500, z: 1.08 };
    X.save();
    applyCam();
    drawSet(t, { arm: 0, drumGlow: 0.12 + 0.06 * Math.sin(t * 2) });
    X.restore();
    // the featured constellation faintly in the sky
    X.save();
    X.globalCompositeOperation = "lighter";
    const R = Math.min(W, H) * 0.22,
      cx = W * 0.62,
      cy = H * 0.24;
    X.strokeStyle = "rgba(255,214,140,.35)";
    X.lineWidth = 1.2;
    for (const [a, b] of BIRD_EDGES) {
      X.beginPath();
      X.moveTo(cx + BIRD[a][0] * R, cy + BIRD[a][1] * R);
      X.lineTo(cx + BIRD[b][0] * R, cy + BIRD[b][1] * R);
      X.stroke();
    }
    BIRD.forEach((p, i) => blob(cx + p[0] * R, cy + p[1] * R, 5 + 2 * Math.sin(t * 2 + i), "#ffd68c", 0.8));
    X.restore();
    // featured portrait floating over the sea
    const h = Math.round(Math.min(H * 0.62, W * 0.42)),
      art = charArt(FEATURED, h);
    X.globalAlpha = 0.95;
    X.drawImage(art, W * 0.7 - art.width / 2, H * 0.47 - h * 0.5 + Math.sin(t * 1.2) * 6);
    X.globalAlpha = 1;
    drawParts();
  }
  function render(t: any) {
    X.setTransform(DPR, 0, 0, DPR, 0, 0);
    const sh = S.shake ? [rand(-S.shake, S.shake), rand(-S.shake, S.shake)] : [0, 0];
    X.save();
    X.translate(sh[0], sh[1]);
    if (S.phase === "idle") drawIdle(t);
    else if (S.phase === "s1") shot1(t);
    else if (S.phase === "s2") shot2(t);
    else if (S.phase === "s3") shot3(t);
    else if (S.phase === "s4") shot4(t);
    else if (S.phase === "reveal") drawReveal(t);
    else if (S.phase === "summary") drawSummary(S.t);
    X.restore();
    if (S.flash > 0) {
      X.fillStyle = rgba(S.flashCol, Math.min(1, S.flash) * 0.85);
      X.fillRect(0, 0, W, H);
    }
    // cinematic letterbox and a brief dip between shots
    if (S.bars > 0) {
      const bh = H * 0.1 * ease.out(S.bars);
      X.fillStyle = "#000";
      X.fillRect(0, 0, W, bh);
      X.fillRect(0, H - bh, W, bh);
    }
    if (["s1", "s2", "s3", "s4"].includes(S.phase) && S.t < 0.12) {
      X.fillStyle = `rgba(0,0,0,${1 - S.t / 0.12})`;
      X.fillRect(0, 0, W, H);
    }
  }

  let last = 0,
    raf = 0;
  function frame(now: any) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    try {
      update(dt);
      render(now / 1000);
    } catch (e) {
      console.error(e);
    }
    if (S.phase !== "idle") raf = requestAnimationFrame(frame);
    else raf = 0;
  }
  function tap() {
    if (S.phase === "reveal") {
      if (S.t < 2) {
        S.t = 2.2;
        S.starsShown = S.order[S.idx].r;
        if (!S.revealCue) {
          S.revealCue = true;
        }
      } else nextItem();
    } else if (S.phase === "summary") {
      if (S.t > 0.6) finish();
    }
  }
  return {
    S,
    resize,
    tap,
    skip,
    /** fromReveal: video S20 đã chiếu cảnh 1–4, vào thẳng cảnh 5 không phát âm mở màn. */
    play(list: any, fromReveal = false) {
      FEATURED = hooks.featured();
      resize();
      start(list, fromReveal);
      if (fromReveal) enterReveal();
      last = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    },
    stop() {
      S.phase = "idle";
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ambienceFade();
    },
    clearCache() {
      for (const k in artCache) delete artCache[k];
      for (const k in cardCache) delete cardCache[k];
      for (const k in silCache) delete silCache[k];
    },
  };
}
