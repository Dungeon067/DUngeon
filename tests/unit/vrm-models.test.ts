import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import modelsRaw from "../../content/models.yaml";
import { validateModels } from "../../src/data/models-schema";

const M = validateModels(modelsRaw);
const DIR = "public/media/models";

function inspect(path: string) {
  const b = readFileSync(path);
  const len = b.readUInt32LE(12);
  const j = JSON.parse(b.subarray(20, 20 + len).toString("utf8"));
  const bin = b.subarray(20 + len + 8);
  let tris = 0;
  for (const m of j.meshes)
    for (const p of m.primitives) if (p.indices != null) tris += j.accessors[p.indices].count / 3;
  let maxTex = 0;
  for (const im of j.images ?? []) {
    const v = j.bufferViews[im.bufferView];
    const d = bin.subarray(v.byteOffset ?? 0, (v.byteOffset ?? 0) + v.byteLength);
    if (d.readUInt32BE(0) === 0x89504e47) maxTex = Math.max(maxTex, d.readUInt32BE(16), d.readUInt32BE(20));
  }
  const vrm = j.extensions?.VRMC_vrm;
  const springs: { joints: { node: number }[] }[] = j.extensions?.VRMC_springBone?.springs ?? [];
  const jointNames = springs.flatMap((s) => s.joints.map((jt) => String(j.nodes[jt.node].name)));
  return { vrm, tris, maxTex, jointNames };
}

// S26: mô hình nhân vật chính thức (trừ mẫu tạm) phải đạt chuẩn của chủ dự án.
const ids = readdirSync(DIR).filter((d) => d !== M.mau && existsSync(`${DIR}/${d}/model.vrm`));

describe("S26: chuẩn mô hình VRM nhân vật", () => {
  it.each(ids)("%s: VRM 1.0, < 30.000 tam giác, texture ≤ 2048, spring bone tóc + vạt, cho dùng thương mại", (id) => {
    const r = inspect(`${DIR}/${id}/model.vrm`);
    expect(r.vrm?.specVersion).toBe("1.0");
    expect(r.tris).toBeLessThan(30000);
    expect(r.maxTex).toBeLessThanOrEqual(2048);
    expect(
      r.jointNames.some((n) => /Hair/i.test(n)),
      "spring bone tóc",
    ).toBe(true);
    expect(
      r.jointNames.some((n) => /Skirt|Coat|Cape|Tail/i.test(n)),
      "spring bone vạt áo",
    ).toBe(true);
    expect(["corporation", "personalProfit"]).toContain(r.vrm?.meta?.commercialUsage);
  });

  it.each(ids)("%s: có file gốc trong art-src/models và dáng người trong models.yaml", (id) => {
    const src = existsSync(`art-src/models/${id}`) ? readdirSync(`art-src/models/${id}`) : [];
    expect(src.some((f) => /\.(vroid|blend)$/.test(f))).toBe(true);
    expect(M.nhanVat[id]?.dang, id).toBeTruthy();
  });

  it("vũ khí hiển thị riêng (nhanVat.vuKhi) có file GLB", () => {
    for (const [id, c] of Object.entries(M.nhanVat))
      if (c.vuKhi) expect(existsSync(`${DIR}/weapons/${c.vuKhi}.glb`), id).toBe(true);
  });

  it.each(Object.keys(M.npc))("npc %s: VRM 1.0 hợp lệ, không trùng id nhân vật chơi được", (id) => {
    const r = inspect(`${DIR}/npc/${id}/model.vrm`);
    expect(r.vrm?.specVersion).toBe("1.0");
    expect(existsSync(`content/characters/${id}.yaml`)).toBe(false);
  });
});
