// Đo FPS bản cũ (legacy/index.html) và bản mới (dist/) trong cùng kịch bản:
// mở game, vào Đảo Lạc, giữ phím đi sang phải 10 giây. Chạy: pnpm build && pnpm fps
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";

const PORT = 4180;
const server = spawn("pnpm", ["exec", "vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 2000));

async function measure(url: string, seconds = 10) {
  // FPS_UNCAPPED=1 bỏ giới hạn 60 khung hình/giây để thấy chênh lệch thời gian xử lý.
  const browser = await chromium.launch({
    args: process.env.FPS_UNCAPPED ? ["--disable-frame-rate-limit", "--disable-gpu-vsync"] : [],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(url);
  await page.waitForTimeout(1000);
  await page.locator('[data-go="world"]').click();
  await page.waitForTimeout(1500);
  await page.keyboard.down("d");
  // Truyền chuỗi để tsx không chèn hàm trợ giúp vào mã chạy trong trình duyệt.
  const r: { frames: number; avg: number; p95: number; slow: number } = await page.evaluate(`new Promise((resolve) => {
    const ts = [], t0 = performance.now();
    const tick = (t) => {
      ts.push(t);
      if (t - t0 < ${seconds * 1000}) return requestAnimationFrame(tick);
      const d = ts.slice(1).map((x, i) => x - ts[i]);
      const s = [...d].sort((a, b) => a - b);
      resolve({ frames: d.length, avg: d.reduce((a, b) => a + b, 0) / d.length, p95: s[Math.floor(s.length * 0.95)], slow: d.filter((x) => x > 20).length });
    };
    requestAnimationFrame(tick);
  })`);
  await browser.close();
  return { fps: +(1000 / r.avg).toFixed(1), p95ms: +r.p95.toFixed(1), slowFrames: r.slow, frames: r.frames };
}

try {
  const rows = [];
  for (let i = 0; i < Number(process.env.FPS_RUNS ?? 3); i++) {
    rows.push({ bản: "cũ", lần: i + 1, ...(await measure(`http://localhost:${PORT}/legacy/index.html`)) });
    rows.push({ bản: "mới", lần: i + 1, ...(await measure(`http://localhost:${PORT}/`)) });
  }
  console.table(rows);
} finally {
  server.kill();
}
