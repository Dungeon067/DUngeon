import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { MOVE, MoveFSM, missingClips, moveClip, turnK } from "../../src/combat/movement";
import { footOffset, groundNormal } from "../../src/render3d/toon/foot-ik";
import { CAMERA, CamCollide, CamStack, collideDistance } from "../../src/core/camera-rig";
import { CHAR_SHADER, applyCharShader, depthRim, faceShadow, rampV } from "../../src/render3d/toon/char-shader";
import { ABILITIES, AbilityRuntime, type Target } from "../../src/combat/ability/runtime";
import { ACTIONS, MELEE_TREE, decide, perceive } from "../../src/entities/ai/brain";
import { SCENE_GROUPS, SceneGroup } from "../../src/world/scene-group";

const run = (f: MoveFSM, t: number, inp: Parameters<MoveFSM["update"]>[1], dt = 1 / 60) => {
  let r = f.update(dt, inp);
  for (let s = dt; s < t; s += dt) r = f.update(dt, inp);
  return r;
};

describe("Hợp nhất A: máy trạng thái di chuyển", () => {
  it("tốc độ đi ×0,225, chạy ×1, chạy nhanh ×1,7", () => {
    const B = MOVE.toc.coSo;
    expect(run(new MoveFSM(), 1, { len: 0.3 })).toMatchObject({ st: "walk" });
    expect(run(new MoveFSM(), 1, { len: 0.3 }).v).toBeCloseTo(B * 0.225, 0);
    expect(run(new MoveFSM(), 1, { len: 1 }).v).toBeCloseTo(B, 0);
    expect(run(new MoveFSM(), 1, { len: 1, sprint: true }).v).toBeCloseTo(B * 1.7, 0);
  });
  it("nhả chạy nhanh quá 1 s mới về chạy", () => {
    const f = new MoveFSM();
    run(f, 1, { len: 1, sprint: true });
    expect(run(f, 0.9, { len: 1 }).st).toBe("sprint");
    expect(run(f, 0.2, { len: 1 }).st).toBe("run");
  });
  it("dừng nhẹ / vừa / mạnh theo trạng thái trước, trượt hãm rồi về đứng yên", () => {
    for (const [inp, st] of [
      [{ len: 0.3 }, "stopLight"],
      [{ len: 1 }, "stopMedium"],
      [{ len: 1, sprint: true }, "stopHard"],
    ] as const) {
      const f = new MoveFSM();
      run(f, 1, inp);
      const r = f.update(1 / 60, { len: 0 });
      expect(r.st).toBe(st);
      expect(r.v).toBeGreaterThan(0);
      expect(run(f, 1, { len: 0 }).st).toBe("idle");
    }
  });
  it("lướt tối đa 2 lần liên tiếp trong 1 s, rồi hồi 1,75 s", () => {
    const f = new MoveFSM();
    expect(f.tryDash()).toBe(true);
    run(f, 0.4, { len: 1 });
    expect(f.tryDash()).toBe(true);
    run(f, 0.4, { len: 1 });
    expect(f.tryDash()).toBe(false);
    run(f, 0.9, { len: 1 });
    expect(f.tryDash()).toBe(false);
    run(f, 0.5, { len: 1 });
    expect(f.tryDash()).toBe(true);
  });
  it("hết lướt: giữ hướng thì chạy nhanh, nhả thì dừng mạnh", () => {
    const f = new MoveFSM();
    f.tryDash();
    expect(run(f, 0.35, { len: 1 }).st).toBe("sprint");
    const g = new MoveFSM();
    g.tryDash();
    expect(run(g, 0.35, { len: 0 }).st).toBe("stopHard");
  });
  it("rơi giới hạn 10 m/s; tiếp đất nhẹ dưới 3 m, lăn khi đang chạy, nặng khi đứng", () => {
    const f = new MoveFSM();
    expect(f.limitFall(-50, 1)).toBe(-10);
    expect(f.land(1, true)).toBe("landLight");
    expect(f.land(5, true)).toBe("landRoll");
    expect(f.land(5, false)).toBe("landHard");
    expect(f.update(0.1, { len: 1 }).v).toBe(0);
  });
  it("xoay tới hướng đích ~95% trong 0,14 s", () => {
    let a = 0;
    for (let t = 0; t < MOVE.xoay - 1e-9; t += 1 / 60) a += (1 - a) * turnK(1 / 60);
    expect(a).toBeGreaterThan(0.93);
  });
  it("mọi trạng thái có clip; clip thiếu được liệt kê", () => {
    expect(moveClip("idle")).toBeNull();
    expect(moveClip("stopHard")?.k).toBe("runStop");
    expect(missingClips().map((c) => c.need)).toEqual(expect.arrayContaining(["walkStop", "landRoll", "landHard"]));
  });
});

describe("Hợp nhất D: IK chân", () => {
  it("kẹp độ lệch đất, bỏ qua hố sâu", () => {
    expect(footOffset(0.2, 0, 0.4)).toBeCloseTo(0.2);
    expect(footOffset(0.9, 0, 0.4)).toBeCloseTo(0.4);
    expect(footOffset(-0.9, 0, 0.4)).toBe(0);
    expect(footOffset(null, 0, 0.4)).toBe(0);
  });
  it("pháp tuyến nghiêng theo dốc", () => {
    const n = groundNormal((x) => x * 0.5, 0, 0);
    expect(n.x).toBeLessThan(-0.3);
    expect(n.y).toBeGreaterThan(0.8);
  });
});

describe("Hợp nhất C: camera (tắt mặc định)", () => {
  it("cờ tắt; va chạm kéo camera lại gần, không gần hơn mức tối thiểu", () => {
    expect(CAMERA.bat).toBe(false);
    expect(collideDistance(13, [6, -1, 9], 0.2, 2.5)).toBeCloseTo(5.8);
    expect(collideDistance(13, [1], 0.2, 2.5)).toBe(2.5);
    const c = new CamCollide();
    c.update(0.016, 13, []);
    expect(c.update(0.016, 13, [5])).toBeLessThanOrEqual(5);
  });
  it("ngăn xếp: ưu tiên cao thắng, pha trộn về khi gỡ", () => {
    const s = new CamStack();
    s.push("boss");
    s.push("no");
    expect(s.top()[0]).toBe("no");
    for (let i = 0; i < 120; i++) s.update(1 / 60);
    expect(s.update(1 / 60).xa).toBeCloseTo(CAMERA.trangThai.no.xa, 0);
    s.pop("no");
    expect(s.top()[0]).toBe("boss");
  });
});

describe("Hợp nhất B: shader nhân vật (tắt mặc định)", () => {
  it("cờ tắt thì không gắn gì", () => {
    expect(CHAR_SHADER.bat).toBe(false);
    const m = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
    expect(applyCharShader(m)).toBe(0);
  });
  it("bóng mặt SDF: sáng chính diện, tối khi sáng từ sau; lật UV theo bên", () => {
    const F = new THREE.Vector3(0, 0, 1),
      R = new THREE.Vector3(1, 0, 0),
      lm = (u: number) => u;
    expect(faceShadow(F, R, new THREE.Vector3(0, 0, 1), 0.5, () => 0.1)).toBe(1);
    expect(faceShadow(F, R, new THREE.Vector3(0, 0, -1), 0.5, () => 0.9)).toBe(0);
    const L = new THREE.Vector3(1, 0, 0);
    expect(faceShadow(F, R, L, 0.8, lm)).toBe(1);
    expect(faceShadow(F, R, L.clone().negate(), 0.8, lm)).toBe(0);
  });
  it("ramp 10 dòng và viền sáng theo chênh độ sâu", () => {
    expect(rampV("da", 0)).toBeCloseTo(0.05);
    expect(rampV("khac", 1)).toBeCloseTo(0.95);
    expect(depthRim(0.01, 1)).toBe(0);
    expect(depthRim(0.5, 1)).toBeGreaterThan(0);
  });
});

describe("Hợp nhất E: Ability, AI 3 tầng, SceneGroup", () => {
  it("kỹ năng mẫu Ardo: sát thương vùng, gắn trạng thái cháy, hồi chiêu", () => {
    const hits: string[] = [];
    const T: Target[] = [
      { id: "a", x: 50, y: 0 },
      { id: "b", x: 300, y: 0 },
    ];
    const R = new AbilityRuntime({
      targetsIn: (x, y, r) => T.filter((t) => Math.hypot(t.x - x, t.y - y) <= r),
      damage: (t, m) => hits.push(`${t.id}:${m}`),
    });
    expect(ABILITIES["ardo.skill"].cd).toBe(8);
    expect(R.cast("ardo.skill", 0, 0)).toBe(true);
    expect(hits).toEqual(["a:2.4"]);
    expect(R.cast("ardo.skill", 0, 0)).toBe(false);
    for (let i = 0; i < 4; i++) R.update(1);
    expect(hits.filter((h) => h === "a:0.2").length).toBe(3);
    expect(R.live.length).toBe(0);
  });
  it("AI: cảm nhận → quyết định → hành động", () => {
    const self = { x: 0, y: 0, hp: 100, maxHp: 100, cd: 0, tamNhin: 300 };
    expect(decide(MELEE_TREE, perceive(self, []))).toBe("tuanTra");
    expect(decide(MELEE_TREE, perceive(self, [{ x: 200, y: 0 }]))).toBe("tiepCan");
    expect(decide(MELEE_TREE, perceive(self, [{ x: 30, y: 0 }]))).toBe("dungChieu");
    expect(decide(MELEE_TREE, perceive({ ...self, hp: 10 }, [{ x: 30, y: 0 }]))).toBe("rutLui");
    expect(ACTIONS.danhThuong(self, null)).toEqual({ danh: true });
  });
  it("SceneGroup mẫu: vào vùng hiện đèn, thắp đủ 3 đèn thì mở rương", () => {
    const g = new SceneGroup(SCENE_GROUPS["den-tru-mau"]);
    g.move(500, 500);
    expect(g.stage).toBeNull();
    g.move(10, 0);
    expect(g.stage).toBe("cho");
    g.set("den1");
    g.set("den2");
    expect(g.stage).toBe("cho");
    g.set("den3");
    expect(g.stage).toBe("mo");
    expect(g.log).toEqual(["Rương đã mở"]);
  });
});
