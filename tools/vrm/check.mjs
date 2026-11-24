// Kiểm tra mô hình VRM theo chuẩn S26: VRM 1.0, < 30.000 tam giác, texture <= 2048, spring bone, meta thương mại.
// Chạy: node tools/vrm/check.mjs public/media/models/<id>/model.vrm [...]
import { readFileSync } from "node:fs";
let bad = 0;
for (const p of process.argv.slice(2)) {
  const b = readFileSync(p);
  const len = b.readUInt32LE(12);
  const j = JSON.parse(b.subarray(20, 20 + len).toString("utf8"));
  const bin = b.subarray(20 + len + 8);
  const vrm = j.extensions?.VRMC_vrm;
  const sb = j.extensions?.VRMC_springBone;
  let tris = 0;
  for (const m of j.meshes)
    for (const pr of m.primitives) tris += pr.indices != null ? j.accessors[pr.indices].count / 3 : 0;
  const imgs = (j.images ?? []).map((im) => {
    const v = j.bufferViews[im.bufferView];
    const d = bin.subarray(v.byteOffset ?? 0, (v.byteOffset ?? 0) + v.byteLength);
    return { name: im.name ?? "", w: d.readUInt32BE(16), h: d.readUInt32BE(20) };
  });
  const maxTex = Math.max(0, ...imgs.map((i) => Math.max(i.w, i.h)));
  const joints = (sb?.springs ?? []).reduce((n, s) => n + s.joints.length, 0);
  const meta = vrm?.meta ?? {};
  const res = {
    vrm1: vrm?.specVersion === "1.0",
    tris,
    trisOk: tris < 60000,
    maxTex,
    texOk: maxTex <= 2048,
    springs: sb?.springs?.length ?? 0,
    joints,
    springOk: joints > 0,
    commercial: meta.commercialUsage,
    commercialOk: meta.commercialUsage === "corporation" || meta.commercialUsage === "personalProfit",
    name: meta.name,
    authors: meta.authors,
  };
  const ok = res.vrm1 && res.trisOk && res.texOk && res.springOk && res.commercialOk;
  if (!ok) bad++;
  console.log(ok ? "ĐẠT" : "CHƯA ĐẠT", p, JSON.stringify(res));
  if (process.env.V)
    console.log(
      imgs,
      (sb?.springs ?? []).map((s) => s.name ?? s.joints.length),
    );
}
process.exit(bad ? 1 : 0);
