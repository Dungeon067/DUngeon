import { audioCtx, mixer } from "../../core/audio";
import { GS } from "../../core/state";
import { CINEMATIC } from "../../data/menu-content";
import { BIRD, BIRD_EDGES } from "./constellation";

/* Video ước nguyện dựng sẵn (S20): cảnh 1–4 là video Blender, âm thanh là file riêng đồng bộ theo video,
   chòm sao banner vẽ chồng lên cảnh 2. Chỉ tải khi có lượt ước cần đến (fetch cả file nên service worker
   cache được), thiếu file, lỗi hoặc tải quá videoTimeoutMs thì trả về false để chạy bản code. */

export interface CineTimeline {
  cues: { reveal: number };
  constellation: {
    drawFrom: number;
    fullAt: number;
    fadeOutFrom: number;
    hiddenAt: number;
    scale: number;
    anchor: [number, number, number][];
  };
  fastForward: { allowedFromWish: number; rate: number; until: number };
  variants: Record<string, { rarity: number; multi: boolean; video: Record<string, string[]>; audio: string[] }>;
}

export const MEDIA_ROOT = "media/cinematic/out/";

/** Bản video theo độ hiếm cao nhất; 5★ đơn luân phiên 5a/5b theo số lần ra 5★ trong phiên. */
export function pickVariant(best: number, multi: boolean, fiveCount: number): string {
  if (multi) return best >= 5 ? "10x5" : "10x4";
  if (best >= 5) return fiveCount % 2 ? "5b" : "5a";
  return best >= 4 ? "4" : "3";
}

export interface Screen {
  w: number;
  h: number;
  dpr: number;
  saveData?: boolean;
}
/** 1080p cho màn rộng (cạnh dài từ 1100px CSS và đủ điểm ảnh thật), còn lại 720p. */
export function wantHeight(s: Screen): "1080" | "720" {
  const long = Math.max(s.w, s.h);
  return !s.saveData && long >= 1100 && long * s.dpr >= 1500 ? "1080" : "720";
}

/** File video đầu tiên phát được, thử độ cao mong muốn trước rồi tới độ cao còn lại. */
export function pickVideoFile(
  video: Record<string, string[]>,
  want: "1080" | "720",
  canPlay: (ext: string) => boolean,
): string | null {
  for (const h of want === "1080" ? ["1080", "720"] : ["720", "1080"])
    for (const f of video[h] ?? []) if (canPlay(f.split(".").pop()!)) return f;
  return null;
}

/** Vị trí neo chòm sao (0..1 trong khung video) tại giây t, nội suy giữa các khung cảnh 2. */
export function anchorAt(a: [number, number, number][], t: number): [number, number] {
  if (!a.length) return [0.5, 0.5];
  if (t <= a[0][0]) return [a[0][1], a[0][2]];
  for (let i = 1; i < a.length; i++)
    if (a[i][0] >= t) {
      const k = (t - a[i - 1][0]) / (a[i][0] - a[i - 1][0]);
      return [a[i - 1][1] + (a[i][1] - a[i - 1][1]) * k, a[i - 1][2] + (a[i][2] - a[i - 1][2]) * k];
    }
  const l = a[a.length - 1];
  return [l[1], l[2]];
}

const url = (f: string) => `${import.meta.env.BASE_URL}${MEDIA_ROOT}${f}`;
let tlP: Promise<CineTimeline | null> | null = null;
export function loadTimeline(): Promise<CineTimeline | null> {
  return (tlP ??= fetch(url("timeline.json"))
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null));
}

const blobs = new Map<string, Promise<Blob | null>>();
/** Tải cả file một lần (không dùng Range) để service worker lưu vào bộ nhớ đệm; file con trỏ Git LFS coi như thiếu. */
function fetchBlob(f: string): Promise<Blob | null> {
  let p = blobs.get(f);
  if (!p) {
    p = fetch(url(f))
      .then((r) => (r.ok ? r.blob() : null))
      .then((b) => (b && b.size > 2048 ? b : null))
      .catch(() => null);
    p.then((b) => b || blobs.delete(f));
    blobs.set(f, p);
  }
  return p;
}
const timeout = <T>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))]);

/** Âm thanh cinematic qua kênh hiệu ứng của bộ trộn; vị trí tính theo đồng hồ AudioContext để so với video. */
class Track {
  private src: AudioBufferSourceNode | null = null;
  private t0 = 0;
  private off = 0;
  private rate = 1;
  constructor(
    private ac: AudioContext,
    private buf: AudioBuffer,
  ) {}
  pos() {
    return this.src ? this.off + (this.ac.currentTime - this.t0) * this.rate : this.off;
  }
  play(at: number) {
    this.stop();
    if (at >= this.buf.duration) return;
    const s = this.ac.createBufferSource();
    s.buffer = this.buf;
    s.playbackRate.value = this.rate;
    s.connect(mixer.sfx ?? this.ac.destination);
    s.start(0, Math.max(0, at));
    this.src = s;
    this.t0 = this.ac.currentTime;
    this.off = at;
  }
  setRate(r: number) {
    if (r === this.rate) return;
    this.off = this.pos();
    this.t0 = this.ac.currentTime;
    this.rate = r;
    if (this.src) this.src.playbackRate.value = r;
  }
  stop() {
    if (!this.src) return;
    this.off = this.pos();
    try {
      this.src.stop();
    } catch {
      /* đã dừng */
    }
    this.src.disconnect();
    this.src = null;
  }
}

async function loadAudio(v: CineTimeline["variants"][string]): Promise<Track | null> {
  const ac = audioCtx();
  if (!ac) return null;
  const ogg = !!document.createElement("audio").canPlayType('audio/ogg; codecs="opus"');
  const f = v.audio.find((a) => a.endsWith(ogg ? ".ogg" : ".mp3")) ?? v.audio[0];
  const b = f && (await fetchBlob(f));
  if (!b) return null;
  try {
    return new Track(ac, await ac.decodeAudioData(await b.arrayBuffer()));
  } catch {
    return null;
  }
}

export interface VideoEls {
  video: HTMLVideoElement;
  overlay: HTMLCanvasElement;
  skip: HTMLElement;
  ff: HTMLButtonElement;
}

/** Trạng thái lượt video đang phát, để phím tắt và nút điều khiển dùng chung; drift: âm thanh lệch video (giây). */
export const videoNow = {
  playing: false,
  variant: "",
  skip: () => {},
  toggleFast: () => {},
  drift: (): number | null => null,
};
let wishes = 0;
let fives = 0;
let track: Track | null = null;

/** Dừng âm thanh cinematic (khi đóng màn ước nguyện). */
export function stopVideoAudio() {
  track?.stop();
  track = null;
}

function weakDevice(v: HTMLVideoElement) {
  const mem = (navigator as any).deviceMemory as number | undefined;
  if (mem && mem < 2) return true;
  return !v.canPlayType('video/webm; codecs="vp9"') && !v.canPlayType('video/mp4; codecs="avc1.640028"');
}

/**
 * Phát video cảnh 1–4 cho lượt ước. Trả về true khi video chạy hết hoặc người chơi bỏ qua (gọi tiếp cảnh 5),
 * false khi phải dùng bản code (thiếu video, máy yếu, tải chậm, lỗi phát).
 */
export async function playWishVideo(best: number, multi: boolean, els: VideoEls): Promise<boolean> {
  wishes++;
  const variant = pickVariant(best, multi, fives);
  if (!multi && best >= 5) fives++;
  stopVideoAudio();
  const { video: v, overlay, skip, ff } = els;
  if (!CINEMATIC.video || weakDevice(v)) return false;
  const tl = await timeout(loadTimeline(), CINEMATIC.videoTimeoutMs);
  const vv = tl?.variants[variant];
  if (!tl || !vv) return false;
  const want = wantHeight({
    w: innerWidth,
    h: innerHeight,
    dpr: devicePixelRatio || 1,
    saveData: (navigator as any).connection?.saveData,
  });
  const file = pickVideoFile(vv.video, want, (ext) =>
    ext === "webm"
      ? !!v.canPlayType('video/webm; codecs="vp9"')
      : ext === "mp4"
        ? !!v.canPlayType('video/mp4; codecs="avc1.640028"')
        : false,
  );
  if (!file) return false;
  const [blob, tr] = await Promise.all([
    timeout(fetchBlob(file), CINEMATIC.videoTimeoutMs),
    GS.soundOn ? timeout(loadAudio(vv), CINEMATIC.videoTimeoutMs) : null,
  ]);
  if (!blob) return false;
  track = tr;
  const src = URL.createObjectURL(blob);
  const ffCfg = tl.fastForward;
  const ctx = overlay.getContext("2d");
  return new Promise<boolean>((res) => {
    let settled = false,
      started = false,
      fast = false,
      raf = 0;
    const end = (ok: boolean, toReveal = false) => {
      if (settled) return;
      settled = true;
      clearTimeout(to);
      cancelAnimationFrame(raf);
      v.onended = v.onerror = v.onplaying = null;
      v.pause();
      v.hidden = overlay.hidden = ff.hidden = true;
      v.removeAttribute("src");
      v.load();
      URL.revokeObjectURL(src);
      videoNow.playing = false;
      videoNow.drift = () => null;
      skip.onclick = null;
      ff.onclick = null;
      if (!ok) stopVideoAudio();
      else if (track) {
        track.setRate(1);
        if (toReveal) track.play(Math.max(track.pos(), tl.cues.reveal));
      }
      res(ok);
    };
    const to = setTimeout(() => !started && end(false), CINEMATIC.videoTimeoutMs);
    const doSkip = () => end(true, true);
    const toggleFast = () => {
      if (ff.hidden) return;
      fast = !fast;
      ff.setAttribute("aria-pressed", String(fast));
    };
    videoNow.playing = true;
    videoNow.variant = variant;
    videoNow.drift = () => (track && started && !v.paused ? track.pos() - v.currentTime : null);
    videoNow.skip = doSkip;
    videoNow.toggleFast = toggleFast;
    skip.onclick = (e) => {
      e.stopPropagation();
      doSkip();
    };
    ff.onclick = (e) => {
      e.stopPropagation();
      toggleFast();
    };
    ff.setAttribute("aria-pressed", "false");
    ff.hidden = wishes < ffCfg.allowedFromWish;
    skip.hidden = false;
    v.onended = () => end(true);
    v.onerror = () => end(false);
    v.onplaying = () => {
      if (started) return;
      started = true;
      track?.play(v.currentTime);
      raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      if (settled) return;
      const t = v.currentTime;
      const rate = fast && t < ffCfg.until ? ffCfg.rate : 1;
      if (v.playbackRate !== rate) v.playbackRate = rate;
      if (track) {
        track.setRate(rate);
        if (!v.paused && Math.abs(track.pos() - t) > 0.12) track.play(t);
      }
      if (ctx) drawConstellation(ctx, overlay, tl.constellation, t);
      raf = requestAnimationFrame(tick);
    };
    const d = Math.min(2, devicePixelRatio || 1);
    overlay.width = Math.round(innerWidth * d);
    overlay.height = Math.round(innerHeight * d);
    v.muted = true;
    v.playbackRate = 1;
    v.hidden = overlay.hidden = false;
    v.src = src;
    v.play().catch(() => end(false));
  });
}

/** Vẽ chòm sao banner lên lớp phủ, khớp phần video bị cắt khi phủ kín màn hình (object-fit: cover). */
function drawConstellation(
  ctx: CanvasRenderingContext2D,
  cv: HTMLCanvasElement,
  c: CineTimeline["constellation"],
  t: number,
) {
  const W = cv.width,
    H = cv.height;
  ctx.clearRect(0, 0, W, H);
  if (t < c.drawFrom || t > c.hiddenAt) return;
  const grow = Math.min(1, (t - c.drawFrom) / (c.fullAt - c.drawFrom));
  const fade = Math.max(0, t > c.fadeOutFrom ? 1 - (t - c.fadeOutFrom) / (c.hiddenAt - c.fadeOutFrom) : 1);
  const s = Math.max(W / 16, H / 9),
    vw = 16 * s,
    vh = 9 * s;
  const [ax, ay] = anchorAt(c.anchor, t);
  const cx = (W - vw) / 2 + ax * vw,
    cy = (H - vh) / 2 + ay * vh;
  const R = vh * c.scale * 1.6 * (0.85 + 0.15 * grow);
  const P = BIRD.map(([x, y]) => [cx + x * R, cy + y * R] as const);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = fade;
  ctx.strokeStyle = "rgba(255,214,140,.7)";
  ctx.lineWidth = Math.max(1, vh / 480);
  const nl = BIRD_EDGES.length;
  BIRD_EDGES.forEach(([i, j], k) => {
    const u = Math.min(1, Math.max(0, grow * nl - k));
    if (u <= 0) return;
    ctx.beginPath();
    ctx.moveTo(P[i][0], P[i][1]);
    ctx.lineTo(P[i][0] + (P[j][0] - P[i][0]) * u, P[i][1] + (P[j][1] - P[i][1]) * u);
    ctx.stroke();
  });
  P.forEach(([x, y], k) => {
    const on = Math.min(1, Math.max(0, grow * P.length - k * 0.8));
    if (on <= 0) return;
    const r = vh * 0.012 * (1 + 0.25 * Math.sin(t * 9 + k));
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    g.addColorStop(0, "rgba(255,250,235,1)");
    g.addColorStop(0.25, "rgba(255,214,130,.8)");
    g.addColorStop(1, "rgba(255,200,90,0)");
    ctx.globalAlpha = on * fade;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, 7);
    ctx.fill();
  });
  ctx.restore();
}
