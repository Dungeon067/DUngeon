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
  return { vrm, tris, maxTex, jointNames, j };
}

// S26: váy và vạt áo không lật như giấy: spring nặng, collider capsule ở chân, có quần bó và mặt trong tối.
function clothCheck(path: string, id: string) {
  const { j } = inspect(path);
  const sb = j.extensions.VRMC_springBone;
  const over = M.nhanVat[id]?.vai ?? M.npc[id]?.vai ?? {};
  const rules = [...Object.entries(over), ...M.vai.xuong].map(([re, l]) => [new RegExp(re, "i"), l] as const);
  const loai = (n: string) => rules.find(([re]) => re.test(n))?.[1] ?? M.vai.macDinh;
  const capGroups = new Set(
    sb.colliderGroups
      .map((g: { colliders: number[] }, i: number) => (g.colliders.some((c) => sb.colliders[c].shape.capsule) ? i : -1))
      .filter((i: number) => i >= 0),
  );
  let risky = 0;
  for (const s of sb.springs) {
    const n = String(j.nodes[s.joints[0].node].name);
    if (!["vay", "vat"].includes(loai(n))) continue;
    risky++;
    const j0 = s.joints[0];
    expect(j0.stiffness, n).toBeGreaterThanOrEqual(1.2);
    expect(j0.dragForce, n).toBeGreaterThanOrEqual(0.6);
    expect(j0.gravityPower, n).toBeGreaterThanOrEqual(0.4);
    expect(j0.gravityDir[1], n).toBeLessThan(-0.9);
    expect(
      (s.colliderGroups ?? []).some((g: number) => capGroups.has(g)),
      `${n}: collider capsule chân`,
    ).toBe(true);
  }
  const mats: string[] = j.materials.map((m: { name: string }) => m.name);
  if (risky) {
    expect(
      mats.some((m) => /Shorts/.test(m)),
      "quần bó tối dưới váy/vạt",
    ).toBe(true);
    expect(
      mats.some((m) => /_Inner$/.test(m)),
      "mặt trong vải tối",
    ).toBe(true);
  }
}

// S26: mô hình nhân vật chính thức (trừ mẫu tạm) phải đạt chuẩn của chủ dự án.
const ids = readdirSync(DIR).filter((d) => d !== M.mau && existsSync(`${DIR}/${d}/model.vrm`));

describe("S26: chuẩn mô hình VRM nhân vật", () => {
  it.each(ids)("%s: VRM 1.0, ≤ 60.000 tam giác, texture ≤ 2048, spring bone tóc + vạt, cho dùng thương mại", (id) => {
    const r = inspect(`${DIR}/${id}/model.vrm`);
    expect(r.vrm?.specVersion).toBe("1.0");
    expect(r.tris).toBeLessThanOrEqual(60000);
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

  it.each(ids)("%s: váy, vạt áo có trọng lượng, collider chân, quần bó, mặt trong tối", (id) =>
    clothCheck(`${DIR}/${id}/model.vrm`, id),
  );
  it.each(Object.keys(M.npc))("npc %s: váy, vạt áo có trọng lượng, collider chân, quần bó, mặt trong tối", (id) =>
    clothCheck(`${DIR}/npc/${id}/model.vrm`, id),
  );

  it("giới hạn góc: váy, vạt trước sau 45–55°, áo choàng/dải vải/tóc bay mạnh hơn và nhận gió nhiều hơn váy", () => {
    const L = M.vai.loai;
    for (const k of ["vay", "vat"]) {
      expect(L[k]!.gocMax).toBeGreaterThanOrEqual(45);
      expect(L[k]!.gocMax).toBeLessThanOrEqual(55);
    }
    for (const k of ["aoChoang", "daiVai", "toc"]) {
      expect(L[k]!.gocMax).toBeGreaterThan(L.vay!.gocMax);
      expect(L[k]!.gio).toBeGreaterThan(L.vay!.gio);
    }
  });
});
