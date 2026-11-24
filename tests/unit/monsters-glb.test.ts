import { readdirSync, readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { EXTRA_CLIPS, MONSTER_CLIPS, MONSTER_IDS } from "../../src/render3d/toon/monsterGlb";

/** Đọc phần JSON của file GLB (chunk đầu). */
function glbJson(path: string): any {
  const b = readFileSync(path);
  expect(b.readUInt32LE(0)).toBe(0x46546c67);
  const n = b.readUInt32LE(12);
  return JSON.parse(b.subarray(20, 20 + n).toString("utf8"));
}
function tris(j: any, name: RegExp) {
  let t = 0;
  for (const node of j.nodes) {
    if (node.mesh == null || !name.test(node.name)) continue;
    for (const p of j.meshes[node.mesh].primitives) t += j.accessors[p.indices].count / 3;
  }
  return t;
}
const species = readdirSync("content/enemies")
  .filter((f) => f.endsWith(".yaml"))
  .map((f) => f.replace(/\.yaml$/, ""));

describe("S29: mô hình GLB và hoạt ảnh của mọi loài quái", () => {
  it("mọi loài trong content/enemies có trong danh sách tải", () => {
    for (const id of species) expect(MONSTER_IDS, id).toContain(id);
  });

  for (const id of species) {
    describe(id, () => {
      const path = `public/media/models/monsters/${id}.glb`;
      it("có file GLB và file gốc .blend", () => {
        expect(existsSync(path), path).toBe(true);
        expect(existsSync(`art-src/monsters/${id}.blend`)).toBe(true);
      });
      it("có rig, đủ clip theo trạng thái AI và clip riêng", () => {
        const j = glbJson(path);
        expect(j.skins?.length, "skin").toBeGreaterThan(0);
        const names = new Set(j.animations.map((a: any) => a.name));
        for (const c of [...MONSTER_CLIPS, ...(EXTRA_CLIPS[id] ?? [])]) expect(names.has(c), `${id}:${c}`).toBe(true);
      });
      it("đúng ngân sách tam giác, có LOD xa nhẹ hơn", () => {
        const j = glbJson(path);
        const t0 = tris(j, /^(?!.*_lod\d)/),
          t1 = tris(j, /_lod1/);
        const [lo, hi] = id === "hacgiao" ? [38000, 62000] : id === "golem" ? [8000, 13500] : [2500, 8200];
        expect(t0, `${id} tris`).toBeGreaterThanOrEqual(lo);
        expect(t0, `${id} tris`).toBeLessThanOrEqual(hi);
        expect(t1).toBeGreaterThan(0);
        expect(t1).toBeLessThan(t0 * 0.6);
      });
      it("texture không vượt giới hạn", () => {
        const j = glbJson(path);
        expect(j.images?.length ?? 0).toBeGreaterThan(0);
        const max = id === "hacgiao" ? 2048 : 1024;
        const b = readFileSync(path);
        const n = b.readUInt32LE(12),
          bin = b.subarray(20 + n + 8);
        for (const im of j.images) {
          const bv = j.bufferViews[im.bufferView];
          const d = bin.subarray(bv.byteOffset ?? 0, (bv.byteOffset ?? 0) + bv.byteLength);
          // WebP VP8/VP8L/VP8X: đọc kích thước ảnh.
          const fourcc = d.subarray(12, 16).toString("ascii");
          let w = 0,
            h = 0;
          if (fourcc === "VP8 ") {
            w = d.readUInt16LE(26) & 0x3fff;
            h = d.readUInt16LE(28) & 0x3fff;
          } else if (fourcc === "VP8L") {
            const v = d.readUInt32LE(21);
            w = (v & 0x3fff) + 1;
            h = ((v >> 14) & 0x3fff) + 1;
          } else if (fourcc === "VP8X") {
            w = 1 + d.readUIntLE(24, 3);
            h = 1 + d.readUIntLE(27, 3);
          }
          expect(w, `${id} ${im.name}`).toBeGreaterThan(0);
          expect(Math.max(w, h), `${id} ${im.name}`).toBeLessThanOrEqual(max);
        }
      });
    });
  }
});
