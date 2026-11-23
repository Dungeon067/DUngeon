/**
 * S27: lực gió ở runtime cho spring bone (tóc, vải), tọa độ thế giới (m, mặt đất XZ).
 * - gió nền theo vùng (+ thời tiết, + độ cao), có gió giật nhẹ (nhiễu lực và hướng);
 * - xung gió từ chiêu hệ Phong (kỹ năng, nộ, lốc xoáy, Khuếch Tán): tỏa ra từ tâm, có thành phần xoáy và đẩy lên,
 *   giảm theo khoảng cách và thời gian;
 * - miệng gió `luongGio` đã mở: đẩy lên.
 * Không cộng lực theo tốc độ chạy. Cấu hình: mục `gio` trong content/poses.yaml.
 */
import * as THREE from "three";
import type { GioCfg } from "../../data/poses-schema";

/** Nguồn gió có tâm: `k` là khóa trong gio.xung; `life` khi nguồn là field kéo dài (lốc xoáy, bão). */
export interface WindSrc {
  k: string;
  x: number;
  z: number;
  age: number;
  life?: number;
}
export interface WindEnv {
  vung?: string;
  /** Độ cao (m). */
  cao?: number;
  thoiTiet?: string;
  /** Ghi đè hướng gió nền (độ). */
  huong?: number;
  nguon?: WindSrc[];
  mieng?: { x: number; z: number }[];
}

const TAU = Math.PI * 2;

export class WindField {
  private pulses: WindSrc[] = [];
  constructor(public cfg: GioCfg) {}

  /** Xung gió tức thời (sự kiện chiêu) tại (x, z). */
  pulse(k: string, x: number, z: number) {
    if (this.cfg.xung[k]) this.pulses.push({ k, x, z, age: 0 });
  }

  tick(dt: number) {
    for (const p of this.pulses) p.age += dt;
    this.pulses = this.pulses.filter((p) => p.age < this.cfg.xung[p.k].song);
  }

  /** Gió nền của vùng (không gồm xung). */
  base(out: THREE.Vector3, t: number, env: WindEnv) {
    const c = this.cfg,
      V = c.vung[env.vung ?? ""] ?? c.vung["mac-dinh"];
    let luc =
      V.luc * (env.thoiTiet ? (c.thoiTiet[env.thoiTiet] ?? 1) : 1) +
      THREE.MathUtils.clamp(((env.cao ?? 0) - c.doCao.tu) * c.doCao.moiM, 0, c.doCao.toiDa);
    out.set(0, 0, 0);
    if (luc <= 0) return out;
    const w = c.nhieu.nhip * t * TAU;
    const n1 = 0.6 * Math.sin(w) + 0.4 * Math.sin(w * 2.37 + 1.3),
      n2 = Math.sin(w * 0.61 + 0.7);
    const a = THREE.MathUtils.degToRad((env.huong ?? V.huong) + c.nhieu.goc * n2);
    luc *= 1 + c.nhieu.bien * n1;
    return out.set(Math.cos(a) * luc, 0, Math.sin(a) * luc);
  }

  sample(out: THREE.Vector3, p: { x: number; z: number }, t: number, env: WindEnv = {}) {
    const c = this.cfg;
    this.base(out, t, env);
    for (const s of this.pulses) this.add(out, p, s);
    for (const s of env.nguon ?? []) this.add(out, p, s);
    for (const m of env.mieng ?? []) {
      const d = Math.hypot(p.x - m.x, p.z - m.z) / c.mieng.banKinh;
      if (d < 1) out.y += c.mieng.luc * (1 - d * d) * (0.85 + 0.15 * Math.sin(t * 7));
    }
    if (out.length() > c.lucToiDa) out.setLength(c.lucToiDa);
    return out;
  }

  private add(out: THREE.Vector3, p: { x: number; z: number }, s: WindSrc) {
    const X = this.cfg.xung[s.k];
    if (!X) return;
    const life = s.life ?? X.song;
    if (s.age >= life) return;
    const ft = Math.min(1, s.age / 0.12) * (s.life ? Math.min(1, (life - s.age) / 0.5) : (1 - s.age / life) ** 2);
    const dx = p.x - s.x,
      dz = p.z - s.z,
      d = Math.hypot(dx, dz);
    const fd = Math.max(0, 1 - d / X.banKinh);
    if (fd <= 0 || ft <= 0) return;
    const L = X.luc * ft * fd ** 1.5;
    const rx = d > 1e-3 ? dx / d : 0,
      rz = d > 1e-3 ? dz / d : 0;
    out.x += (rx - rz * X.xoay) * L;
    out.z += (rz + rx * X.xoay) * L;
    out.y += (X.len + Math.max(0, 1 - d) * 0.5) * L;
  }
}
