import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { CLOTH, ClothGuard, loaiVai } from "../../src/render3d/toon/cloth";
import { WindField } from "../../src/render3d/toon/wind";
import { POSES } from "../../src/data/poses";
import { REGIONS } from "../../src/world/regions";

const G = POSES.gio;
const set = () => ({ gravityDir: new THREE.Vector3(0, -1, 0), gravityPower: 0.15 });

/** VRM giả: hông + chuỗi váy 3 khớp + 1 khớp tóc + 1 khớp ngực; spring bone giả lật váy 170° mỗi lần cập nhật. */
function fake() {
  const root = new THREE.Group(),
    hips = new THREE.Object3D(),
    sk = new THREE.Object3D(),
    sk2 = new THREE.Object3D(),
    sk3 = new THREE.Object3D(),
    hair = new THREE.Object3D(),
    bust = new THREE.Object3D();
  sk.name = "J_Sec_L_CoatSkirtFront_01";
  sk2.name = "J_Sec_L_CoatSkirtFront_02";
  sk3.name = "J_Sec_L_CoatSkirtFront_03";
  hair.name = "J_Sec_Hair1_01";
  bust.name = "J_Sec_L_Bust1";
  root.add(hips);
  hips.add(sk, hair, bust);
  sk.add(sk2);
  sk2.add(sk3);
  const dts: number[] = [],
    seenHips: number[] = [];
  const flip = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(170));
  const J = {
    sk3: { bone: sk3, settings: set() },
    sk2: { bone: sk2, settings: set() },
    sk: { bone: sk, settings: set() },
    hair: { bone: hair, settings: { gravityDir: new THREE.Vector3(0, -1, 0), gravityPower: 0 } },
    bust: { bone: bust, settings: { gravityDir: new THREE.Vector3(0, -1, 0), gravityPower: 0 } },
  };
  const vrm: any = {
    humanoid: { update() {}, getRawBoneNode: (n: string) => (n === "hips" ? hips : null) },
    springBoneManager: {
      joints: new Set(Object.values(J)),
      update(d: number) {
        dts.push(d);
        seenHips.push(hips.position.y);
        for (const b of [sk, sk2, sk3]) b.quaternion.copy(flip);
      },
    },
  };
  return { vrm, hips, sk, sk2, sk3, J, dts, seenHips };
}
const ang = (q: THREE.Quaternion) => THREE.MathUtils.radToDeg(2 * Math.acos(Math.min(1, Math.abs(q.w))));

describe("S27: vải spring bone", () => {
  it("kẹp dt tối đa 1/30 giây", () => {
    const f = fake(),
      c = new ClothGuard(f.vrm);
    c.update(0.2);
    c.update(1 / 60);
    expect(Math.max(...f.dts)).toBeLessThanOrEqual(CLOTH.dtMax + 1e-9);
    expect(f.dts[1]).toBeCloseTo(1 / 60);
  });
  it("chặn góc váy cả chuỗi (≤ 55°), kể cả khi gió mạnh nhất", () => {
    const f = fake(),
      c = new ClothGuard(f.vrm);
    c.wind.set(0, G.lucToiDa, G.lucToiDa);
    c.update(1 / 30);
    const L = G.gioiHan.vay;
    const a1 = ang(f.sk.quaternion),
      a2 = ang(f.sk2.quaternion),
      a3 = ang(f.sk3.quaternion);
    expect(a1).toBeLessThanOrEqual(L.goc + 0.5);
    expect(a2).toBeLessThanOrEqual(L.con + 0.5);
    expect(a1 + a2 + a3).toBeLessThanOrEqual(L.tong + 0.5);
    expect(L.tong).toBeLessThanOrEqual(55);
    expect(c.maxDev).toBeLessThanOrEqual(L.tong + 0.5);
  });
  it("spring bone thấy hông đã làm mượt; thân người vẫn giữ hông thật", () => {
    const f = fake(),
      c = new ClothGuard(f.vrm);
    c.update(1 / 30);
    f.hips.position.y = 0.3;
    c.jolt();
    c.update(1 / 30);
    expect(f.seenHips[1]).toBeGreaterThan(0);
    expect(f.seenHips[1]).toBeLessThan(0.15);
    expect(f.hips.position.y).toBe(0.3);
  });
  it("gió cộng vào trọng lực theo loại vải: tóc mạnh, váy nhẹ, ngực không nhận gió", () => {
    const f = fake(),
      c = new ClothGuard(f.vrm);
    c.wind.set(1, 0, 0);
    c.update(1 / 30);
    const h = f.J.hair.settings,
      s = f.J.sk.settings,
      b = f.J.bust.settings;
    expect(h.gravityDir.x).toBeGreaterThan(0.99);
    expect(h.gravityPower).toBeCloseTo(G.trongSo.toc);
    expect(s.gravityDir.x).toBeGreaterThan(0);
    expect(s.gravityDir.x * s.gravityPower).toBeCloseTo(G.trongSo.vay);
    expect(s.gravityDir.y * s.gravityPower).toBeCloseTo(-0.15);
    expect(b.gravityPower).toBe(0);
    expect(G.trongSo.vay).toBeLessThan(G.trongSo.toc);
    expect(G.trongSo.dai).toBeGreaterThanOrEqual(G.trongSo.toc);
  });
  it("phân loại xương VRoid", () => {
    expect(loaiVai("J_Sec_L_CoatSkirtBack_01")).toBe("vay");
    expect(loaiVai("J_Sec_Hair1_03")).toBe("toc");
    expect(loaiVai("J_Sec_L_HoodString2_01")).toBe("dai");
    expect(loaiVai("J_Sec_C_Hood_01")).toBe("choang");
    expect(loaiVai("J_Sec_R_TipSleeve_01")).toBe("tay");
    expect(loaiVai("J_Sec_L_Bust1")).toBe("nguc");
  });
});

describe("S27: gió runtime", () => {
  const W = new WindField(G),
    v = new THREE.Vector3();
  it("gió nền theo vùng và lên đỉnh núi mạnh hơn", () => {
    const at = (vung: string, cao = 0) => W.base(v, 0, { vung, cao }).length();
    expect(at("rung-truc-may")).toBeGreaterThan(at("pho-van-dang") * 3);
    expect(at("mo-ngoc")).toBe(0);
    expect(at("khong-co", 30)).toBeGreaterThan(at("khong-co", 0));
    for (const k of Object.keys(G.vung)) if (k !== "mac-dinh") expect(REGIONS.some((r: any) => r.id === k)).toBe(true);
  });
  it("xung gió tỏa ra từ tâm chiêu, giảm theo khoảng cách và thời gian", () => {
    const F = new WindField(G),
      e = { vung: "mo-ngoc" };
    F.pulse("burst", 0, 0);
    F.tick(0.15);
    const near = F.sample(new THREE.Vector3(), { x: 1, z: 0 }, 0, e).clone(),
      far = F.sample(new THREE.Vector3(), { x: 4, z: 0 }, 0, e).clone();
    expect(near.x).toBeGreaterThan(0);
    expect(near.length()).toBeGreaterThan(far.length());
    F.tick(0.6);
    expect(F.sample(new THREE.Vector3(), { x: 1, z: 0 }, 0, e).length()).toBeLessThan(near.length());
    F.tick(5);
    expect(F.sample(new THREE.Vector3(), { x: 1, z: 0 }, 0, e).length()).toBe(0);
  });
  it("lốc xoáy (field) có thành phần xoáy; miệng gió đẩy lên; lực bị chặn", () => {
    const e = { vung: "mo-ngoc", nguon: [{ k: "vortex", x: 0, z: 0, age: 1, life: 2.5 }] };
    const w = W.sample(v, { x: 1.5, z: 0 }, 0, e);
    expect(w.x).toBeGreaterThan(0);
    expect(Math.abs(w.z)).toBeGreaterThan(0.1);
    const up = W.sample(v, { x: 0, z: 0 }, 0, { vung: "mo-ngoc", mieng: [{ x: 0, z: 0 }] });
    expect(up.y).toBeGreaterThan(0.5);
    const big = W.sample(v, { x: 0.5, z: 0 }, 0, {
      vung: "rung-truc-may",
      cao: 99,
      mieng: [{ x: 0, z: 0 }],
      nguon: [{ k: "vortex", x: 0, z: 0, age: 1, life: 2.5 }],
    });
    expect(big.length()).toBeLessThanOrEqual(G.lucToiDa + 1e-6);
  });
});
