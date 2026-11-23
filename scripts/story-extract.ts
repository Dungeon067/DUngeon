/**
 * Chuyển kịch bản Markdown (docs/story/mo-dau.md, chuong-1.md) thành dữ liệu game content/story.json.
 * Mỗi mục "## <mã>: <tên>" (md_xx, c1_xx) là một phân đoạn; các khối ```yaml trong mục nối thành danh sách bước.
 * Dùng: pnpm story:build (chạy lại mỗi khi sửa kịch bản).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parse } from "yaml";

const FILES = ["docs/story/mo-dau.md", "docs/story/chuong-1.md"];
const out: { id: string; ten: string; chuong: string; mucTieu: string; steps: unknown[] }[] = [];
for (const f of FILES) {
  const md = readFileSync(f, "utf8");
  const parts = md.split(/^## /m).slice(1);
  for (const p of parts) {
    const m = /^(md_\d+|c\d+_\d+):\s*(.+)$/m.exec(p.split("\n")[0]!);
    if (!m) continue;
    const muc = /\*\*Mục tiêu[^*]*:\*\*\s*"?([^"\n]+)"?/.exec(p);
    const steps: unknown[] = [];
    for (const b of p.matchAll(/```yaml\n([\s\S]*?)```/g)) {
      const y = parse(b[1]!);
      if (Array.isArray(y)) steps.push(...y);
    }
    out.push({
      id: m[1]!,
      ten: m[2]!.trim(),
      chuong: m[1]!.startsWith("md") ? "Mở đầu" : `Chương ${m[1]!.slice(1).split("_")[0]}`,
      mucTieu: muc ? muc[1]!.trim().replace(/[“”"]+$/, "") : "",
      steps,
    });
  }
}
// Tên NPC lấy từ bảng tóm tắt trong npc-dao-lac.md.
const ten: Record<string, string> = {
  nguoi_uoc_nguyen: "Cậu",
  ke_chuyen: "",
  he_thong: "",
  hacgiao: "Hắc Giao",
  npc_mat_na_khac: "Pháp Sư Mặt Nạ",
  npc_mat_na_go: "Mặt Nạ Gỗ",
};
for (const m of readFileSync("docs/story/npc-dao-lac.md", "utf8").matchAll(
  /^\|\s*\d+\s*\|\s*(npc_\w+)\s*\|\s*([^|]+?)\s*\|/gm,
))
  ten[m[1]!] = m[2]!;
writeFileSync("content/story.json", JSON.stringify({ ten, sections: out }) + "\n");
console.log(out.map((s) => `${s.id} ${s.steps.length} bước`).join("\n"));
