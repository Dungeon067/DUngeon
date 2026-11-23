/**
 * Lưới pixel theo "vật liệu". Mỗi ô lưu mã vật liệu và tông (0 tối, 1 gốc, 2 sáng, 3 điểm sáng).
 * Khi xuất ra RGBA: tự đổ bóng theo ánh sáng từ trên trái và tự thêm viền tối 1 px
 * lấy từ màu tối của chính vùng đó (không dùng đen tuyền).
 */
export type RGB = [number, number, number];

export interface Material {
  /** 4 tông: tối, gốc, sáng, điểm sáng. */
  ramp: [RGB, RGB, RGB, RGB];
  /** Màu viền, mặc định là tông tối nhân 0,55. */
  line?: RGB;
  /** Không tự đổ bóng (mắt, cúc, chi tiết nhỏ). */
  flat?: boolean;
  /** Không có viền ngoài (hạt sáng, hiệu ứng). */
  noLine?: boolean;
  /** Độ trong suốt 0..255. */
  alpha?: number;
}

export function hex(h: string): RGB {
  const v = parseInt(h.replace("#", ""), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function toHsl([r, g, b]: RGB): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b),
    mn = Math.min(r, g, b),
    l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn,
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}

function fromHsl(h: number, s: number, l: number): RGB {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

/** Lệch sắc độ về phía lạnh khi tối và về phía ấm khi sáng (cách tô bóng thường gặp ở pixel art). */
function shift(c: RGB, dl: number, dh: number, ds = 0): RGB {
  const [h, s, l] = toHsl(c);
  const warm = h > 60 && h < 240 ? -1 : 1;
  return fromHsl(h + dh * (dl < 0 ? -warm : warm), Math.min(1, Math.max(0, s + ds)), Math.min(0.97, Math.max(0.03, l + dl)));
}

/** Sinh dải 4 tông từ một màu gốc. */
export function ramp(base: string | RGB, k = 1): [RGB, RGB, RGB, RGB] {
  const c = typeof base === "string" ? hex(base) : base;
  return [shift(c, -0.16 * k, 14, 0.05), c, shift(c, 0.1 * k, 8, -0.02), shift(c, 0.22 * k, 14, -0.08)];
}

export function mat(base: string, o: Partial<Material> & { k?: number } = {}): Material {
  return { ramp: ramp(base, o.k ?? 1), ...o };
}

export class Grid {
  readonly m: Uint8Array;
  readonly t: Int8Array;
  constructor(
    readonly w: number,
    readonly h: number,
  ) {
    this.m = new Uint8Array(w * h);
    this.t = new Int8Array(w * h).fill(-1);
  }
  inside(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.w && y < this.h;
  }
  get(x: number, y: number) {
    return this.inside(x, y) ? this.m[y * this.w + x] : 0;
  }
  /** Vẽ một pixel. tone = -1 nghĩa là để bộ tô bóng tự quyết. */
  set(x: number, y: number, m: number, tone = -1) {
    x = Math.round(x);
    y = Math.round(y);
    if (!this.inside(x, y)) return;
    const i = y * this.w + x;
    this.m[i] = m;
    this.t[i] = m ? tone : -1;
  }
  /** Chỉ đổi tông của pixel đã có vật liệu `only` (hoặc bất kỳ nếu không truyền). */
  tone(x: number, y: number, tone: number, only?: number) {
    x = Math.round(x);
    y = Math.round(y);
    if (!this.inside(x, y)) return;
    const i = y * this.w + x;
    if (this.m[i] && (only === undefined || this.m[i] === only)) this.t[i] = tone;
  }
  rect(x: number, y: number, w: number, h: number, m: number, tone = -1) {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, m, tone);
  }
  /** Hình chữ nhật bo góc, bán kính khác nhau ở trên và dưới. */
  rrect(x: number, y: number, w: number, h: number, rt: number, rb: number, m: number, tone = -1) {
    for (let j = 0; j < h; j++)
      for (let i = 0; i < w; i++) {
        const r = j < h / 2 ? rt : rb;
        const cy = j < h / 2 ? r - 0.5 : h - r - 0.5,
          cx = i < w / 2 ? r - 0.5 : w - r - 0.5;
        const inCorner = (i < r || i >= w - r) && (j < h / 2 ? j < r : j >= h - r);
        if (inCorner && (i - cx) ** 2 + (j - cy) ** 2 > r * r) continue;
        this.set(x + i, y + j, m, tone);
      }
  }
  ellipse(cx: number, cy: number, rx: number, ry: number, m: number, tone = -1) {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++)
        if (((x - cx) / (rx + 0.35)) ** 2 + ((y - cy) / (ry + 0.35)) ** 2 <= 1) this.set(x, y, m, tone);
  }
  /** Đa giác lồi hoặc lõm, tô theo quét dòng. */
  poly(pts: [number, number][], m: number, tone = -1) {
    let y0 = Infinity,
      y1 = -Infinity;
    for (const [, y] of pts) {
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
    for (let y = Math.floor(y0); y <= Math.ceil(y1); y++) {
      const xs: number[] = [];
      const sy = y + 0.5;
      for (let i = 0; i < pts.length; i++) {
        const [ax, ay] = pts[i],
          [bx, by] = pts[(i + 1) % pts.length];
        if ((ay <= sy && by > sy) || (by <= sy && ay > sy)) xs.push(ax + ((sy - ay) / (by - ay)) * (bx - ax));
      }
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2)
        for (let x = Math.round(xs[k]); x < Math.round(xs[k + 1]); x++) this.set(x, y, m, tone);
    }
  }
  /** Đường thẳng có độ dày (đóng dấu hình tròn dọc đường Bresenham). */
  line(x0: number, y0: number, x1: number, y1: number, m: number, w = 1, tone = -1) {
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0),
      dy = -Math.abs(y1 - y0),
      sx = x0 < x1 ? 1 : -1,
      sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      if (w <= 1) this.set(x0, y0, m, tone);
      else {
        const r = (w - 1) / 2;
        for (let j = -Math.ceil(r); j <= Math.ceil(r); j++)
          for (let i = -Math.ceil(r); i <= Math.ceil(r); i++) if (i * i + j * j <= r * r + 0.5) this.set(x0 + i, y0 + j, m, tone);
      }
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x0 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y0 += sy;
      }
    }
  }
  /** Vẽ mẫu ký tự; `key` ánh xạ ký tự sang [vật liệu, tông]. Dấu chấm và khoảng trắng là trong suốt. */
  stamp(x: number, y: number, rows: string[], key: Record<string, [number, number?]>, flip = false) {
    rows.forEach((r, j) => {
      for (let i = 0; i < r.length; i++) {
        const k = key[r[i]];
        if (k) this.set(flip ? x + r.length - 1 - i : x + i, y + j, k[0], k[1] ?? -1);
      }
    });
  }
  /** Xoay quanh điểm (cx, cy) theo góc độ, lấy mẫu láng giềng gần nhất. */
  rotate(deg: number, cx: number, cy: number): Grid {
    const g = new Grid(this.w, this.h),
      a = (-deg * Math.PI) / 180,
      c = Math.cos(a),
      s = Math.sin(a);
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        const dx = x + 0.5 - cx,
          dy = y + 0.5 - cy;
        const sx = Math.floor(cx + dx * c - dy * s),
          sy = Math.floor(cy + dx * s + dy * c);
        if (!this.inside(sx, sy)) continue;
        const i = sy * this.w + sx;
        g.m[y * this.w + x] = this.m[i];
        g.t[y * this.w + x] = this.t[i];
      }
    return g;
  }
  /** Lật ngang. */
  flip(): Grid {
    const g = new Grid(this.w, this.h);
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        const i = y * this.w + x,
          j = y * this.w + this.w - 1 - x;
        g.m[j] = this.m[i];
        g.t[j] = this.t[i];
      }
    return g;
  }
  /** Chép lưới khác lên lưới này (pixel trống bị bỏ qua). */
  draw(o: Grid, dx = 0, dy = 0) {
    for (let y = 0; y < o.h; y++)
      for (let x = 0; x < o.w; x++) {
        const i = y * o.w + x;
        if (o.m[i]) this.set(x + dx, y + dy, o.m[i], o.t[i]);
      }
  }
}

/** Xuất lưới thành RGBA: tô bóng tự động, rồi viền tối 1 px. */
export function shade(g: Grid, mats: Material[], out: Uint8Array, ow: number, ox: number, oy: number, flip = false) {
  const { w, h } = g;
  const col = (m: number, tn: number) => mats[m].ramp[tn];
  const put = (x: number, y: number, c: RGB, a = 255) => {
    const px = flip ? ox + w - 1 - x : ox + x;
    const i = ((oy + y) * ow + px) * 4;
    out[i] = c[0];
    out[i + 1] = c[1];
    out[i + 2] = c[2];
    out[i + 3] = a;
  };
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const m = g.m[y * w + x];
      if (!m) {
        // Viền: lấy vật liệu láng giềng tối nhất có viền.
        let best = 0,
          bl = 1e9;
        for (const [dx, dy] of [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ]) {
          const n = g.get(x + dx, y + dy);
          if (!n || mats[n].noLine) continue;
          const c = mats[n].ramp[0],
            l = c[0] + c[1] + c[2];
          if (l < bl) {
            bl = l;
            best = n;
          }
        }
        if (best) {
          const M = mats[best];
          const ln = M.line ?? (M.ramp[0].map((v) => Math.round(v * 0.55)) as RGB);
          put(x, y, ln, M.alpha ?? 255);
        }
        continue;
      }
      const M = mats[m];
      let tn = g.t[y * w + x];
      if (tn < 0) {
        if (M.flat) tn = 1;
        else {
          // Ánh sáng từ trên trái: mép dưới và mép phải tối, mép trên trái sáng.
          const diff = (dx: number, dy: number) => g.get(x + dx, y + dy) !== m;
          if (diff(1, 0) || diff(0, 1) || diff(1, 1)) tn = 0;
          else if (diff(-1, 0) && diff(0, -1)) tn = 3;
          else if (diff(0, -1) || diff(-1, -1)) tn = 2;
          else tn = 1;
        }
      }
      put(x, y, col(m, tn), M.alpha ?? 255);
    }
}

/**
 * Giới hạn số màu: gộp dần màu ít dùng nhất vào màu gần nó nhất cho tới khi còn `max` màu.
 * Có thể xác định trước (không ngẫu nhiên). Trả số màu còn lại.
 */
export function limitPalette(rgba: Uint8Array, max: number): number {
  const count = new Map<number, number>();
  for (let i = 0; i < rgba.length; i += 4) {
    if (!rgba[i + 3]) continue;
    const k = (rgba[i] << 16) | (rgba[i + 1] << 8) | rgba[i + 2];
    count.set(k, (count.get(k) ?? 0) + 1);
  }
  const map = new Map<number, number>();
  const live = new Map(count);
  const dist = (a: number, b: number) => {
    const dr = ((a >> 16) & 255) - ((b >> 16) & 255),
      dg = ((a >> 8) & 255) - ((b >> 8) & 255),
      db = (a & 255) - (b & 255);
    return dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
  };
  while (live.size > max) {
    let worst = -1,
      wc = Infinity;
    for (const [k, c] of live) if (c < wc || (c === wc && k < worst)) [worst, wc] = [k, c];
    let best = -1,
      bd = Infinity;
    for (const k of live.keys()) if (k !== worst && dist(k, worst) < bd) [best, bd] = [k, dist(k, worst)];
    live.delete(worst);
    live.set(best, (live.get(best) ?? 0) + wc);
    map.set(worst, best);
  }
  const resolve = (k: number) => {
    while (map.has(k)) k = map.get(k)!;
    return k;
  };
  for (let i = 0; i < rgba.length; i += 4) {
    if (!rgba[i + 3]) continue;
    const k = resolve((rgba[i] << 16) | (rgba[i + 1] << 8) | rgba[i + 2]);
    rgba[i] = (k >> 16) & 255;
    rgba[i + 1] = (k >> 8) & 255;
    rgba[i + 2] = k & 255;
  }
  return live.size;
}
