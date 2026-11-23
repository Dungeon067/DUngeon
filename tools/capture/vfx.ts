// Quay cận cảnh từng chiêu theo bước thời gian cố định (không phụ thuộc FPS máy quay).
// Chạy: pnpm capture:vfx <id> [url] [thư mục ra]. url mặc định là vite dev ở cổng 4183.
// Mỗi chiêu quay 2 lần: tốc độ thường (1/60 s mỗi khung) và chậm 0,5x (1/120 s mỗi khung), ghép 60 FPS 1280x720.
// Mã chạy trong trình duyệt truyền dạng chuỗi để tsx không chèn hàm trợ giúp.
import { chromium } from "@playwright/test";
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const who = process.argv[2] ?? "havy";
const PORT = 4183;
const url = process.argv[3] ?? `http://localhost:${PORT}/`;
const outDir = process.argv[4] ?? `test-results/capture/${who}`;
const only = process.env.SHOTS?.split(",");
const W = 1280,
  H = 720;
const server = process.argv[3]
  ? null
  : spawn("pnpm", ["exec", "vite", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });

/** Một cảnh quay: các bước [khung bắt đầu, mã JS], tổng số khung (ở tốc độ thường), góc máy. */
interface Shot {
  id: string;
  ten: string;
  frames: number;
  steps: [number, string][];
  cam?: { yaw?: number; pitch?: number; dist?: number };
  party?: string[];
}
const C = "window.__tinhtu.cap";
/** Vẽ trong requestAnimationFrame để khung WebGL được trình chiếu trước khi chụp. */
const step = (n: number, dt: number) =>
  `new Promise((r) => requestAnimationFrame(() => { window.__tinhtu.capStep(${n}, ${dt}); requestAnimationFrame(() => r(0)); }))`;
const atk = `${C}.press("atk")`;
const hold = (on: boolean) => `window.__tinhtu.S.holdAtk = ${on}`;
const full = `(() => { const G = window.__tinhtu.S.G; const m = G.party[G.act]; m.energy = m.c.burst.cost; m.skCd = 0; })()`;

const SHOTS: Shot[] = [
  {
    id: "thuong",
    ten: "Đánh thường",
    frames: 150,
    steps: [0, 22, 44, 66, 88].map((f) => [f, atk] as [number, string]),
  },
  {
    id: "trong",
    ten: "Trọng kích",
    frames: 150,
    steps: [
      [0, hold(true)],
      [70, hold(false)],
    ],
  },
  { id: "bam", ten: "Kỹ năng (bấm)", frames: 150, steps: [[0, `${C}.castKitSkill("bam")`]] },
  { id: "giu", ten: "Kỹ năng (giữ)", frames: 180, steps: [[0, `${C}.castKitSkill("giu")`]] },
  { id: "no", ten: "Nộ", frames: 240, steps: [[0, `${C}.castKitBurst()`]], cam: { dist: 9 } },
];

async function main() {
  if (server) await new Promise((r) => setTimeout(r, 4000));
  const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(url + "?e2e&renderer=3d");
  await page.evaluate(`(() => { localStorage.setItem("tinhtu-hints-v1", "1");
    localStorage.setItem("tinhtu-settings-v1", JSON.stringify({ quality: "high" })); })()`);
  await page.reload();
  await page.waitForFunction(`window.__tinhtu?.S?.scene === "play"`, null, { timeout: 120_000 });
  mkdirSync(outDir, { recursive: true });
  const clips: string[] = [];
  for (const s of SHOTS) {
    if (only && !only.includes(s.id)) continue;
    for (const slow of [false, true]) {
      await setup(page, s.party ?? [who], s);
      const dir = join(outDir, `${s.id}${slow ? "-cham" : ""}`);
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(dir, { recursive: true });
      const sub = slow ? 2 : 1,
        n = s.frames * sub;
      for (let f = 0; f < n; f++) {
        for (const [at, js] of s.steps) if (at * sub === f) await page.evaluate(js);
        await page.evaluate(step(1, 1 / 60 / sub));
        await page.screenshot({ path: join(dir, `${String(f).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
      }
      const mp4 = `${dir}.mp4`;
      const label = `${s.ten}${slow ? " - chậm 0,5x" : ""}`.replace(/:/g, "\\:");
      execFileSync("ffmpeg", [
        "-y",
        "-loglevel",
        "error",
        "-framerate",
        "60",
        "-i",
        join(dir, "%05d.jpg"),
        "-vf",
        `drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${label}':x=24:y=H-56:fontsize=30:fontcolor=white:borderw=3:bordercolor=black@0.7`,
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-crf",
        "17",
        "-r",
        "60",
        mp4,
      ]);
      clips.push(mp4);
      console.log("xong", mp4);
    }
  }
  if (clips.length > 1) {
    const list = join(outDir, "list.txt");
    writeFileSync(list, clips.map((c) => `file '${c.split("/").pop()}'`).join("\n"));
    execFileSync("ffmpeg", [
      "-y",
      "-loglevel",
      "error",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      list,
      "-c",
      "copy",
      join(outDir, `${who}.mp4`),
    ]);
    console.log("video:", join(outDir, `${who}.mp4`));
  }
  if (errors.length) console.log("LỖI TRANG:", errors.slice(0, 5));
  await browser.close();
}

/** Vào Tháp với đội chỉ định, xếp 3 quái đứng yên trước mặt, đặt góc máy cận cảnh, đóng băng đồng hồ. */
async function setup(page: any, party: string[], s: Shot) {
  await page.evaluate(`(() => { const T = window.__tinhtu; T.S.capT = null; const P = T.Server.P; P.gm.god = true;
    for (const id of ${JSON.stringify(party)}) P.owned[id] = P.owned[id] || { lv: 60, cons: 0 };
    P.party = ${JSON.stringify(party)}; T.menu.openMenu("main"); })()`);
  await page.locator('.tt-main-item[data-item="tower"]').click();
  await page.locator("#towerFloors button").first().click();
  await page.waitForFunction(`window.__tinhtu.r3?.()?.debug?.()?.arena?.kind === "tower"`, null, { timeout: 60_000 });
  await page.waitForTimeout(1500);
  const cam = { yaw: 0.9, pitch: 0.34, dist: 6.5, ...s.cam };
  await page.evaluate(`(() => { const T = window.__tinhtu, S = T.S, G = S.G; S.capT = 0;
    G.enemies.length = 0; G.later.length = 0; G.fx.length = 0; G.projs.length = 0;
    const p = G.p; p.x = G.bounds.w / 2; p.y = G.bounds.h / 2 + 60;
    for (const [dx, dy] of [[0, -130], [-70, -175], [70, -175]]) {
      const e = T.cap.makeEnemy("slime", p.x + dx, p.y + dy, 20, null);
      e.hp = e.maxHp = 1e8; e.spd = 0; e.speed = 0; e.atkCd = 1e9; G.enemies.push(e); }
    const m = G.party[G.act]; m.energy = m.c.burst.cost; m.skCd = 0; m.cd = 0;
    S.camYaw = ${cam.yaw}; S.camPitch = ${cam.pitch}; S.camDist = ${cam.dist}; S.holdAtk = false; })()`);
  await page.evaluate(step(30, 1 / 60));
}

main().finally(() => server?.kill());
