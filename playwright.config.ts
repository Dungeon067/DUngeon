import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 90_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } } },
    // Game chỉ chơi màn ngang (A.3); màn dọc kiểm tra riêng trong hud.spec.ts.
    { name: "mobile", use: { ...devices["Pixel 7 landscape"] } },
  ],
  webServer: {
    command: `STYLEGUIDE=1 pnpm build && pnpm exec vite preview --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
