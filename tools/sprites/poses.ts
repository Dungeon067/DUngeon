/**
 * Bảng động tác chung cho nhân vật cầm cung. Mỗi động tác là danh sách khung (tư thế + thời lượng ms).
 * `hit` là chỉ số khung ra đòn: khung này phải trùng lúc logic chiến đấu bắn mũi tên hay gây sát thương.
 * Logic hiện tại ra đòn ngay khi bấm, nên khung ra đòn luôn nằm trong 100 ms đầu (xem tests/sprites.test.ts).
 */
import type { Pose } from "./doll";

export interface AnimDef {
  loop: boolean;
  frames: { p: Pose; ms: number }[];
  hit?: number;
}

const f = (p: Pose, ms: number) => ({ p, ms });
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const run = range(8).map((i) => {
  const a = (i / 8) * Math.PI * 2,
    st = Math.sin(a);
  return f(
    {
      stride: st,
      liftA: Math.max(0, -Math.cos(a)) * 0.8,
      liftB: Math.max(0, Math.cos(a)) * 0.8,
      swing: -st,
      by: i % 4 === 0 ? 1 : i % 4 === 2 ? -1 : 0,
      lean: 1,
      flare: 1 + (i % 2),
      sway: 2 + (i % 4 === 1 ? 1 : 0),
    },
    75,
  );
});

const shot = (draw: number, extra: Pose = {}): Pose => ({
  bow: "aim",
  draw,
  arrow: draw > 0.05,
  eyes: "focus",
  ...extra,
});

export const BOW_ANIMS: Record<string, AnimDef> = {
  idle: {
    loop: true,
    frames: [f({}, 220), f({ sway: 0.5 }, 200), f({ by: 1, sway: 1 }, 220), f({ by: 1, sway: 0.5 }, 200)],
  },
  run: { loop: true, frames: run },
  atk1: {
    loop: false,
    hit: 1,
    frames: [
      f(shot(0.7), 40),
      f(shot(0, { lean: -1, flare: 1 }), 60),
      f(shot(0, { lean: -1 }), 70),
      f(shot(0, { eyes: "open" }), 70),
      f({ bow: "aim", draw: 0, eyes: "open", by: 1 }, 60),
    ],
  },
  atk2: {
    loop: false,
    hit: 1,
    frames: [
      f(shot(0.8, { stride: 0.5, aimAng: -6 }), 40),
      f(shot(0, { stride: 0.5, lean: -1, aimAng: -6, flare: 1 }), 60),
      f(shot(0, { stride: 0.3, lean: -1, aimAng: -4 }), 70),
      f(shot(0, { stride: 0.2, eyes: "open" }), 70),
      f({ bow: "aim", draw: 0, eyes: "open", by: 1 }, 60),
    ],
  },
  atk3: {
    loop: false,
    hit: 1,
    frames: [
      f(shot(1, { crouch: 2, lean: 1, flare: 2 }), 50),
      f(shot(0, { crouch: 1, lean: -2, flare: 3, sway: 3 }), 60),
      f(shot(0, { lean: -2, flare: 2, sway: 2, by: -1 }), 70),
      f(shot(0, { lean: -1, flare: 1, sway: 1 }), 70),
      f({ bow: "aim", draw: 0, eyes: "open" }, 70),
      f({ bow: "hang", by: 1 }, 60),
    ],
  },
  aim: {
    loop: true,
    frames: [f(shot(0.85), 110), f(shot(0.95), 110), f(shot(1, { by: 1 }), 110), f(shot(0.95, { by: 1 }), 110)],
  },
  shot: {
    loop: false,
    hit: 0,
    frames: [
      f(shot(0, { lean: -2, flare: 2, sway: 2 }), 60),
      f(shot(0, { lean: -1, flare: 1, sway: 1 }), 80),
      f({ bow: "aim", draw: 0, eyes: "open" }, 80),
      f({ bow: "hang", by: 1 }, 90),
    ],
  },
  skill: {
    loop: false,
    hit: 2,
    frames: [
      f({ crouch: 1, armsUp: 0.3, flare: 1 }, 40),
      f({ armsUp: 0.8, by: -1, flare: 2, sway: 1, eyes: "focus" }, 40),
      f({ armsUp: 1, by: -2, flare: 3, sway: 2, eyes: "focus" }, 70),
      f({ crouch: 3, armsUp: 0.2, flare: 4, sway: 3 }, 70),
      f({ crouch: 3, flare: 4, sway: 2 }, 70),
      f({ crouch: 2, flare: 3, sway: 1 }, 70),
      f({ crouch: 1, flare: 1 }, 70),
      f({ by: 1 }, 70),
    ],
  },
  // Tư thế nộ: giương cung lên trời, vạt áo bay, xoáy tuyết quanh chân (xoáy tuyết ở sheet hiệu ứng).
  burst: {
    loop: false,
    hit: 1,
    frames: [
      f({ crouch: 2, flare: 2, sway: 1, eyes: "focus" }, 40),
      f({ bow: "up", draw: 0.6, arrow: true, by: -1, flare: 3, sway: 2, eyes: "focus" }, 50),
      f({ bow: "up", draw: 1, arrow: true, by: -2, flare: 4, sway: 3, eyes: "focus" }, 80),
      f({ bow: "up", draw: 1, arrow: true, by: -2, flare: 5, sway: 4, eyes: "focus" }, 80),
      f({ bow: "up", draw: 1, arrow: true, by: -2, flare: 4, sway: 3, eyes: "focus" }, 80),
      f({ bow: "up", draw: 1, arrow: true, by: -2, flare: 5, sway: 4, eyes: "focus" }, 80),
      f({ bow: "up", draw: 0, by: -1, flare: 5, sway: 4 }, 70),
      f({ bow: "up", draw: 0, flare: 4, sway: 3 }, 70),
      f({ crouch: 1, flare: 3, sway: 2 }, 70),
      f({ crouch: 2, flare: 2, sway: 1 }, 70),
      f({ crouch: 1, flare: 1 }, 70),
      f({ by: 1 }, 70),
    ],
  },
  dash: {
    loop: false,
    frames: [
      f({ lean: 2, crouch: 1, stride: 0.6, flare: 2, sway: 3 }, 40),
      f({ lean: 3, crouch: 2, stride: 1, liftB: 1, flare: 4, sway: 5, swing: 1 }, 50),
      f({ lean: 3, crouch: 2, stride: 1, liftB: 1, flare: 5, sway: 5, swing: 1 }, 50),
      f({ lean: 2, crouch: 1, stride: 0.4, flare: 3, sway: 3 }, 60),
      f({ lean: 1, flare: 1, sway: 1 }, 60),
    ],
  },
  jumpUp: {
    loop: false,
    frames: [f({ crouch: 3, flare: 1 }, 60), f({ by: -2, liftA: 1, liftB: 1, flare: 2, sway: -2 }, 80)],
  },
  jumpAir: {
    loop: true,
    frames: [
      f({ by: -2, liftA: 1, liftB: 0.6, flare: 2, sway: -1, swing: 0.5 }, 120),
      f({ by: -2, liftA: 0.8, liftB: 1, flare: 3, sway: -2, swing: -0.5 }, 120),
    ],
  },
  jumpLand: {
    loop: false,
    frames: [
      f({ crouch: 3, flare: 3, sway: 2 }, 50),
      f({ crouch: 2, flare: 2, sway: 1 }, 60),
      f({ crouch: 1, flare: 1 }, 70),
    ],
  },
  hurt: {
    loop: false,
    frames: [
      f({ lean: -3, by: 1, eyes: "hurt", flare: 2, sway: 2 }, 60),
      f({ lean: -2, by: 1, eyes: "hurt", flare: 1, sway: 1 }, 80),
      f({ lean: -1, eyes: "closed" }, 100),
    ],
  },
  die: {
    loop: false,
    frames: [
      f({ lean: -3, by: 1, eyes: "hurt", flare: 2, sway: 2 }, 90),
      f({ crouch: 3, lean: -2, eyes: "hurt", bow: "none", flare: 2 }, 100),
      f({ crouch: 5, eyes: "closed", bow: "none", flare: 3, rot: -15 }, 100),
      f({ crouch: 5, eyes: "closed", bow: "none", flare: 3, rot: -40 }, 90),
      f({ crouch: 5, eyes: "closed", bow: "none", flare: 2, rot: -70 }, 90),
      f({ crouch: 5, eyes: "closed", bow: "none", flare: 1, rot: -88 }, 120),
      f({ crouch: 6, eyes: "closed", bow: "none", rot: -90 }, 400),
    ],
  },
};
