/**
 * Chụp một khung hình game thật (Đảo Lạc, Lạc Hồng đứng giữa màn hình) làm nền ghép thử sprite.
 *   tsx tools/art/chup-game.ts <file.png>
 * Tự chạy `vite` ở cổng 4183 rồi tắt khi xong.
 */
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";

const out = process.argv[2] ?? "test-results/art/game.png";
const PORT = 4183;
const server = spawn("pnpm", ["exec", "vite", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 3000));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(`http://localhost:${PORT}/?e2e`);
  await page.waitForTimeout(1000);
  await page.evaluate(`(() => { const P = window.__tinhtu.Server.P; P.gm.god = true;
    for (const id of ["lachong","thuynguyet","loidinh","thachson"]) P.owned[id] = P.owned[id] || { lv: 40, cons: 0 };
    P.party = ["lachong","thuynguyet","loidinh","thachson"]; })()`);
  await page.locator('[data-go="world"]').click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: out });
  console.log(out);
} finally {
  await browser.close();
  server.kill();
}
