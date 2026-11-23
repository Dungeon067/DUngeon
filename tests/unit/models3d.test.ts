import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import modelsRaw from "../../content/models.yaml";
import { validateModels } from "../../src/data/models-schema";
import { CLIPS } from "../../tools/anim/recipes";

const A = JSON.parse(readFileSync("public/media/anim/humanoid.json", "utf8"));
const M = validateModels(modelsRaw);

describe("S25: cấu hình mô hình 3D và hoạt ảnh humanoid", () => {
  it("mọi clip trong công thức đã được dựng, 30 khung/giây", () => {
    expect(A.fps).toBe(30);
    for (const k of Object.keys(CLIPS)) expect(A.clips[k], k).toBeTruthy();
  });

  it("mỗi clip có xương chính của VRM, số khung khớp, quaternion chuẩn hóa", () => {
    for (const [k, c] of Object.entries<any>(A.clips)) {
      for (const b of ["hips", "spine", "head", "leftUpperArm", "rightUpperArm", "leftUpperLeg", "rightLowerLeg"])
        expect(c.bones[b]?.q.length, `${k}.${b}`).toBe(c.n);
      expect(c.hips.length).toBe(c.n);
      for (const q of c.bones.hips.q) expect(Math.hypot(...q)).toBeCloseTo(1, 2);
    }
  });

  it("đòn đánh của mọi loại vũ khí có clip và đủ 3 đòn", () => {
    for (const [t, a] of Object.entries(M.hoatAnh)) {
      expect(a.atk, t).toHaveLength(3);
      for (const k of [a.stand, ...a.atk, a.charge, a.skill, a.burst]) expect(A.clips[k], `${t}:${k}`).toBeTruthy();
    }
  });

  it("đòn kiếm thứ 2 là bản lật trái phải của đòn 1", () => {
    const a = A.clips.sword1,
      b = A.clips.sword2,
      i = Math.floor(a.n / 2);
    const [x, y, z, w] = a.bones.rightUpperArm.q[i],
      [x2, y2, z2, w2] = b.bones.leftUpperArm.q[i];
    expect([x2, y2, z2, w2].map((v) => +v.toFixed(3))).toEqual([x, -y, -z, w].map((v) => +v.toFixed(3)));
  });

  it("mẫu VRM tạm và vũ khí mặc định có file", () => {
    expect(existsSync(`public/media/models/${M.mau}/model.vrm`)).toBe(true);
    for (const id of Object.values(M.vuKhiMacDinh))
      expect(existsSync(`public/media/models/weapons/${id}.glb`), id).toBe(true);
  });
});
