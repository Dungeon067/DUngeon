/** Mẫu chuyển động dùng chung: thở/đổi trọng tâm khi đứng, chồng tay cầm vũ khí lên clip di chuyển. */
import * as THREE from "three";
import { P, type ClipDef, type Spec, type Hand, type OverlayDef, type Rig, type Grip } from "../pose";

/** Đứng thả lỏng: dồn trọng tâm sang trái rồi phải thật nhẹ (contrapposto rất nhỏ, không nhấn dáng). */
export function idleLoop(s: Spec, dur = 4.8, amp = 1): ClipDef {
  const sh = (k: number): Spec =>
    P(s, {
      hp: [s.hp[0] + 0.014 * amp * k, s.hp[1] - 0.004 * amp * Math.abs(k), s.hp[2]],
      hr: [s.hr[0], s.hr[1] + 1.5 * k * amp, s.hr[2] + 1.6 * k * amp],
      b: {
        ...s.b,
        spine: add(s.b.spine, [0, 0, -0.9 * k * amp]),
        chest: add(s.b.chest, [0, -0.8 * k * amp, -0.8 * k * amp]),
        head: add(s.b.head, [0, 1.5 * k * amp, 0.6 * k * amp]),
      },
    });
  return {
    dur,
    loop: true,
    keys: [
      { t: 0, s: sh(0) },
      { t: 0.25, s: sh(1) },
      { t: 0.5, s: sh(0) },
      { t: 0.75, s: sh(-1) },
      { t: 1, s: sh(0) },
    ],
  };
}

/** Thế chờ: nhún nhẹ theo nhịp thở, giữ chân. */
export function readyLoop(s: Spec, dur = 2.4, amp = 1): ClipDef {
  const b = (k: number): Spec =>
    P(s, {
      hp: [s.hp[0], s.hp[1] - 0.008 * amp * k, s.hp[2]],
      b: { ...s.b, chest: add(s.b.chest, [1.2 * k * amp, 0, 0]), head: add(s.b.head, [-0.8 * k * amp, 0, 0]) },
    });
  return { dur, loop: true, keys: [{ t: 0, s: b(0) }, { t: 0.5, s: b(1) }, { t: 1, s: b(0) }] };
}

export const add = (a: [number, number, number] | undefined, d: [number, number, number]): [number, number, number] => [
  (a?.[0] ?? 0) + d[0],
  (a?.[1] ?? 0) + d[1],
  (a?.[2] ?? 0) + d[2],
];

/**
 * Chồng tay cầm vũ khí lên clip chạy/đi: vị trí tay lấy theo clip nền (giữ nhịp vung) kéo về phía hold,
 * hướng bàn tay cố định theo vũ khí.
 */
export function carry(
  from: string,
  opts: { l?: { hold: Hand; k: number; grip: Grip }; r?: { hold: Hand; k: number; grip: Grip }; fx?: (r: Rig, f: number) => void },
): OverlayDef {
  return {
    from,
    mod: (r, f) => {
      opts.fx?.(r, f);
      r.root.updateMatrixWorld(true);
      for (const k of ["l", "r"] as const) {
        const o = opts[k];
        if (!o) continue;
        const cur = r.pos(k === "l" ? "leftHand" : "rightHand");
        const tgt = new THREE.Vector3(...o.hold.p).lerp(cur, 1 - o.k);
        r.hand(k, { ...o.hold, p: tgt.toArray() as [number, number, number] });
        r.grip(k, o.grip);
      }
    },
  };
}
