/*
 * Cụm băng (S30, theo bản mẫu tham khảo): khi đạn pháp khí Băng trúng, 9 gai băng mọc từ đất (gai giữa cao,
 * 8 gai quanh nghiêng ra ngoài), đứng ngắn rồi vỡ ở khung 20 thành mảnh văng, tia lấp lánh và khói băng.
 * Trạng thái giữ riêng (không theo tuổi của hiệu ứng logic 0,28 s), tối đa 6 cụm cùng lúc.
 */
import type { Vfx } from "./system";

const ICE: [string, string, string] = ["#f2fbff", "#9fdcff", "#3f7fd0"];
const FPS = 60;
interface Shard {
  dx: number;
  dz: number;
  h: number;
  w: number;
  yaw: number;
  tilt: number;
}
interface Frag {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  s: number;
  r: number;
}
interface Cl {
  x: number;
  y: number;
  z: number;
  age: number;
  sh: Shard[];
  fr: Frag[];
}

export class IceClusters {
  private list: Cl[] = [];
  spawn(x: number, y: number, z: number, size = 1) {
    if (this.list.length >= 6) this.list.shift();
    const sh: Shard[] = [{ dx: 0, dz: 0, h: 0.95 * size, w: 0.2 * size, yaw: Math.random() * 6.28, tilt: 0 }];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
        r = (0.2 + Math.random() * 0.14) * size;
      sh.push({
        dx: Math.cos(a) * r,
        dz: Math.sin(a) * r,
        h: (0.4 + Math.random() * 0.28) * size,
        w: 0.13 * size,
        yaw: -a + Math.PI / 2,
        tilt: 0.35 + Math.random() * 0.3,
      });
    }
    this.list.push({ x, y, z, age: 0, sh, fr: [] });
  }
  update(X: Vfx, dt: number) {
    for (const c of this.list) {
      c.age += dt;
      const f = c.age * FPS;
      if (f < 20) {
        for (let i = 0; i < c.sh.length; i++) {
          const s = c.sh[i],
            g = Math.min(1, Math.max(0, (f - i * 0.5) / 8));
          X.crystal("crystal", c.x + s.dx, c.y, c.z + s.dz, s.h, s.w, s.yaw, s.tilt, g, 0, ICE);
        }
        X.V.glow(c.x, c.y + 0.5, c.z, ICE[1], 0.6);
        continue;
      }
      if (!c.fr.length) {
        for (const s of c.sh)
          for (let k = 0; k < (X.V.q >= 1 ? 2 : 1); k++) {
            const a = Math.atan2(s.dz, s.dx) + (Math.random() - 0.5) * 1.2,
              sp = 1.6 + Math.random() * 1.4;
            c.fr.push({
              x: c.x + s.dx,
              y: c.y + s.h * (0.3 + k * 0.4),
              z: c.z + s.dz,
              vx: Math.cos(a) * sp,
              vy: 1.5 + Math.random() * 1.5,
              vz: Math.sin(a) * sp,
              s: s.w * 0.7,
              r: Math.random() * 6,
            });
          }
        X.flash(c.x, c.y + 0.4, c.z, ICE[1], 1.6, 1.2);
        X.emit(Math.round(18 * X.V.q), () => {
          const a = Math.random() * Math.PI * 2,
            sp = 2 + Math.random() * 2;
          return {
            cell: "sao4",
            x: c.x,
            y: c.y + 0.4,
            z: c.z,
            vx: Math.cos(a) * sp,
            vy: 1 + Math.random() * 2,
            vz: Math.sin(a) * sp,
            grav: 5,
            drag: 2,
            life: 0.45,
            size: 0.12,
            size1: 0.02,
            col: "#ffffff",
            col1: ICE[1],
            stretch: 1.5,
          };
        });
        X.puffs.spawn(c.x, c.y + 0.25, c.z, "ice", 0.32, 36, 0.3, 0);
      }
      const k = Math.min(1, (f - 20) / 37);
      for (const p of c.fr) {
        p.vy -= 9 * dt;
        p.x += p.vx * dt;
        p.y = Math.max(c.y, p.y + p.vy * dt);
        p.z += p.vz * dt;
        p.r += dt * 8;
        X.crystal("crystal", p.x, p.y, p.z, p.s * 1.6, p.s, p.r, p.r * 0.7, 1, k * 0.9, ICE);
      }
    }
    this.list = this.list.filter((c) => c.age * FPS < 57);
  }
}
