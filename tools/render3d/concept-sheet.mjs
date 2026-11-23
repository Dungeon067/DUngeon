// S29: bảng concept cho từng loài quái: phác hoạ nét (từ mô hình), 4 góc, biến thể nguyên tố/giai đoạn, atlas, ghi chú.
// Cần dev server (pnpm dev --port 5173). Dùng: node tools/render3d/concept-sheet.mjs <id> [outDir]
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { chromium } from "@playwright/test";

const SHEETS = {
  slime: {
    name: "Giọt Nhầy",
    grid: "fire,water,wind,bolt,earth,ice",
    close: "zoom=1.5&ty=-0.02",
    vq: "zoom=1.4",
    notes: [
      "Khối thạch cuộn giọt nước, kết từ ước nguyện vụn.",
      "Lõi tinh thể nguyên tố phát sáng, vòng sáng quanh lõi.",
      "Bọt khí lơ lửng, mắt to ướt, miệng nhỏ.",
      "Một mô hình; màu và độ sáng theo e.el qua uniform.",
      "Chết: tan thành bụi sao (shader uDust).",
    ],
  },
  goblin: {
    name: "Yêu Rừng",
    grid: "wind,earth,fire,ice",
    close: "zoom=3.2&ty=0.28",
    vq: "zoom=1.3",
    notes: [
      "Sinh vật rừng nhỏ, lưng hơi gù, tay chân dài.",
      "Mặt nạ vỏ cây khắc vân, hốc mắt phát sáng, mỏ gỗ.",
      "Vương miện lá tre, áo khoác lá, khố vải rách, chuỗi hạt.",
      "Gậy tre có đốt và dây quấn.",
      "Vùng nhuộm nguyên tố: phù văn mặt nạ và mắt.",
    ],
  },
  hacgiao: {
    name: "Hắc Giao",
    grid: "water@1,bolt@2",
    turn: "zoom=1.25",
    close: "mode=hero&yaw=-0.7&pitch=0.12&zoom=1.55",
    vq: "mode=hero&yaw=-0.7&pitch=0.12&zoom=1.7",
    crop: "760x760+820+0",
    notes: [
      "Rồng nước thân dài kết từ Nguyện Cặn.",
      "Vảy cá đen ánh lam, bóng ướt; bụng tấm bạc xám.",
      "Vây lưng, vây ngực, đuôi quạt lam lân tinh trong mờ.",
      "Sừng cong ngả sau, râu dài có xương, mắt bạc phát sáng.",
      "Đốm lân quang dọc thân. Giai đoạn 2: nứt tím phát sáng.",
      "Xương sống 20 đốt bám theo vệt đường của boss.ts.",
    ],
  },
};

const id = process.argv[2];
const outDir = process.argv[3] ?? "docs/art/s29";
const S = SHEETS[id];
if (!S) throw new Error(`không có bảng cho ${id}`);
const tmp = `${homedir()}/s29-build/sheet-${id}`;
mkdirSync(tmp, { recursive: true });
mkdirSync(outDir, { recursive: true });
const base = "http://localhost:5173/tools/render3d/monster-view.html";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
async function shot(q, out, w, h) {
  if (process.env.REUSE && existsSync(out)) return;
  const pg = await b.newPage({ viewport: { width: w, height: h } });
  pg.on("pageerror", (e) => console.log("pageerror:", e.message));
  await pg.goto(`${base}?id=${id}&w=${w}&h=${h}&${q}`);
  await pg.waitForFunction(() => window.__ready, null, { timeout: 90000 });
  await pg.waitForTimeout(1500);
  await pg.screenshot({ path: out });
  await pg.close();
}
const grid = S.grid.split(",");
await shot(`${S.turn ?? ""}&mode=turn&el=` + grid[0].split("@")[0], `${tmp}/turn.png`, 2400, 760);
await shot(`${S.close}&mode=turn&el=${grid[0].split("@")[0]}`, `${tmp}/close.png`, 2400, 760);
await shot(`${S.close}&mode=turn&el=${grid[0].split("@")[0]}&ol=0&bg=fff`, `${tmp}/sketchsrc.png`, 2400, 760);
for (const [i, g] of grid.entries()) {
  const [el, ph] = g.split("@");
  await shot(
    `mode=grid&el=${el}${ph === "2" ? "&phase=2" : ""}&${S.vq ?? ""}`,
    `${tmp}/v${i}.png`,
    Math.round(1680 / grid.length),
    760,
  );
}
await b.close();

const im = (...a) => execFileSync("convert", a.flat(Infinity).map(String));
im(
  `${tmp}/sketchsrc.png`,
  "-crop",
  S.crop ?? "600x760+0+0",
  "+repage",
  "-colorspace",
  "Gray",
  "-edge",
  "1.2",
  "-negate",
  "-level",
  "35%,95%",
  "-blur",
  "0x0.4",
  "(",
  "+clone",
  "-fill",
  "#f3ecdf",
  "-colorize",
  "100",
  ")",
  "+swap",
  "-compose",
  "multiply",
  "-composite",
  `${tmp}/sketch.png`,
);
im(
  grid.map((_, i) => `${tmp}/v${i}.png`),
  "+append",
  `${tmp}/variants.png`,
);
const atlas = `${homedir()}/s29-build/${id}`;
const maps = ["albedo", "normal", "mask"].filter((m) => existsSync(`${atlas}/${id}_${m}.png`));
im(
  maps.map((m) => [`${atlas}/${id}_${m}.png`, "-resize", "280x280"]),
  "+append",
  `${tmp}/atlas.png`,
);
const glb = readFileSync(`public/media/models/monsters/${id}.glb`);
const n = glb.readUInt32LE(12);
const j = JSON.parse(glb.subarray(20, 20 + n).toString());
let tris = 0;
for (const p of j.meshes[0].primitives) tris += j.accessors[p.indices].count / 3;
const tex = j.images?.length ?? 0;
const stats = `${Math.round(tris)} tam giác · ${j.skins?.[0]?.joints.length ?? 0} xương · ${tex} ảnh · LOD ${j.meshes.length - 1} · clip: ${(j.animations ?? []).map((a) => a.name).join(", ")}`;
const font = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf";
const bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";
const notes = S.notes.map((s) => "• " + s).join("\n");
writeFileSync(`${tmp}/notes.txt`, notes);
im(
  "-size",
  "2400x2000",
  "xc:#1b1826",
  "-font",
  bold,
  "-fill",
  "#f1e6c8",
  "-pointsize",
  "56",
  "-annotate",
  "+60+90",
  `${S.name}`,
  "-font",
  font,
  "-fill",
  "#a99fc4",
  "-pointsize",
  "26",
  "-annotate",
  "+60+135",
  `${id} · Tinh Tú S29 · bảng concept (mốc 1)`,
  `${tmp}/turn.png`,
  "-geometry",
  "+0+160",
  "-composite",
  `${tmp}/close.png`,
  "-geometry",
  "+0+930",
  "-composite",
  "-fill",
  "#1b1826",
  "-draw",
  "rectangle 0 1700 2400 2000",
  "(",
  `${tmp}/sketch.png`,
  "-resize",
  "236x300",
  ")",
  "-geometry",
  "+40+1690",
  "-composite",
  `${tmp}/atlas.png`,
  "-geometry",
  "+300+1700",
  "-composite",
  "-fill",
  "#e9e1cf",
  "-pointsize",
  "24",
  "-interline-spacing",
  "6",
  "-annotate",
  `+${300 + maps.length * 280 + 40}+1730`,
  notes,
  "-fill",
  "#8f86ad",
  "-pointsize",
  "20",
  "-annotate",
  `+${300 + maps.length * 280 + 40}+1975`,
  stats,
  `${tmp}/sheet-a.png`,
);
im(
  "-size",
  "2400x1000",
  "xc:#1b1826",
  "-font",
  bold,
  "-fill",
  "#f1e6c8",
  "-pointsize",
  "40",
  "-annotate",
  "+60+70",
  `${S.name} · phác hoạ nét và biến thể`,
  "(",
  `${tmp}/sketch.png`,
  "-resize",
  "620x860",
  ")",
  "-geometry",
  "+40+110",
  "-composite",
  `${tmp}/variants.png`,
  "-geometry",
  "+680+130",
  "-composite",
  "-font",
  font,
  "-fill",
  "#a99fc4",
  "-pointsize",
  "24",
  "-annotate",
  "+690+930",
  id === "hacgiao"
    ? "Trái: giai đoạn 1 (Thủy). Phải: giai đoạn 2 (Lôi, nứt tím)."
    : `Nguyên tố: ${grid.join(", ")} (cùng một mô hình, đổi uniform)`,
  `${tmp}/sheet-b.png`,
);
im(`${tmp}/sheet-a.png`, `${tmp}/sheet-b.png`, "-append", "-quality", "88", `${outDir}/${id}-concept.jpg`);
console.log(`${outDir}/${id}-concept.jpg`);
