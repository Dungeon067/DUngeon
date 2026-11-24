import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { BookFloat } from "../../src/render3d/vfx/book-float";

const run = (b: BookFloat, a: THREE.Vector3, sec: number, yaw = 0, onStep?: () => void) => {
  for (let i = 0; i < sec * 60; i++) {
    b.update(1 / 60, a, yaw);
    onStep?.();
  }
};

describe("BookFloat", () => {
  it("trễ lại phía sau khi neo chạy, dừng thì về neo có quá đà nhẹ", () => {
    const b = new BookFloat(),
      a = new THREE.Vector3();
    b.reset(a);
    for (let i = 0; i < 60; i++) {
      a.x += 5 / 60;
      b.update(1 / 60, a, 0);
    }
    expect(a.x - b.pos.x).toBeGreaterThan(0.3);
    let over = 0;
    run(b, a, 2, 0, () => (over = Math.max(over, b.pos.x - a.x)));
    expect(over).toBeGreaterThan(0.005);
    expect(over).toBeLessThan(0.25);
    expect(Math.abs(b.pos.x - a.x)).toBeLessThan(0.02);
  });
  it("giật lùi ngược hướng bắn rồi trôi về chỗ cũ", () => {
    const b = new BookFloat(),
      a = new THREE.Vector3();
    b.reset(a);
    b.kick(new THREE.Vector3(0, 0, 1));
    run(b, a, 0.1);
    expect(b.pos.z).toBeLessThan(-0.05);
    run(b, a, 2);
    expect(b.pos.distanceTo(a)).toBeLessThan(0.08);
  });
  it("xoay mặt về hướng bắn và đặt lại khi neo dịch chuyển xa", () => {
    const b = new BookFloat(),
      a = new THREE.Vector3();
    b.reset(a, 0);
    run(b, a, 1.5, 2);
    expect(b.yaw).toBeCloseTo(2, 1);
    a.set(20, 0, 0);
    b.update(1 / 60, a, 2);
    expect(b.pos.distanceTo(a)).toBeLessThan(0.1);
  });
});
