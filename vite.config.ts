import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";
import { parse } from "yaml";

/** Đổi file YAML trong content/ thành JSON lúc build, game không phải đọc YAML khi chạy. */
function yamlToJson(): Plugin {
  return {
    name: "yaml-to-json",
    transform(code, id) {
      if (!/\.ya?ml$/.test(id)) return null;
      return { code: `export default ${JSON.stringify(parse(code))};`, map: null };
    },
  };
}

const APP_VERSION = (
  JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as { version: string }
).version;

export default defineConfig({
  base: process.env.BASE_PATH ?? "./",
  define: { __APP_VERSION__: JSON.stringify(APP_VERSION) },
  plugins: [
    yamlToJson(),
    {
      // vite-plugin-pwa gắn manifest vào mọi trang; Admin và Styleguide không phải ứng dụng cài được.
      name: "pwa-chi-trang-game",
      enforce: "post",
      generateBundle(_, bundle) {
        for (const [name, f] of Object.entries(bundle))
          if (f.type === "asset" && /^(admin|styleguide)\/.*\.html$/.test(name) && typeof f.source === "string")
            f.source = f.source.replace(/<link rel="manifest"[^>]*>/, "");
      },
    },
    /* S22: PWA cài được. Service worker precache toàn bộ asset build; âm thanh, video media/ và font chỉ cache khi cần. */
    VitePWA({
      registerType: "prompt",
      injectRegister: false,
      manifestFilename: "manifest.webmanifest",
      includeAssets: ["icons/*.png", "icons/icon.svg"],
      manifest: {
        id: "./",
        name: "Tinh Tú Ước Nguyện",
        short_name: "Tinh Tú",
        description: "Game nhập vai hành động 2D thế giới mở lấy cảm hứng từ thần thoại Việt Nam.",
        lang: "vi",
        start_url: "./",
        scope: "./",
        display: "fullscreen",
        display_override: ["fullscreen", "standalone"],
        orientation: "landscape",
        theme_color: "#0f1430",
        background_color: "#0f1430",
        categories: ["games"],
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"],
        globIgnores: ["styleguide/**", "**/media/**"],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/\/admin\//, /\/legacy\//, /\/styleguide\//, /\/pr-preview\//, /\/media\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Danh sách video ước nguyện đổi theo mỗi lần deploy: lấy bản mới, mất mạng mới dùng bản đã lưu.
            urlPattern: ({ url }) => url.pathname.endsWith("/media/cinematic/out/timeline.json"),
            handler: "NetworkFirst",
            options: { cacheName: "tinhtu-media-index", networkTimeoutSeconds: 3 },
          },
          {
            urlPattern: ({ url }) => /\/(audio|media)\//.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "tinhtu-media",
              expiration: { maxEntries: 200 },
              rangeRequests: true,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "tinhtu-fonts",
              expiration: { maxEntries: 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    target: "es2020",
    /* Trang /styleguide/ luôn có khi chạy `pnpm dev`; khi build chỉ có nếu STYLEGUIDE=1 (bản xem thử PR). */
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("index.html", import.meta.url)),
        admin: fileURLToPath(new URL("admin/index.html", import.meta.url)),
        ...(process.env.STYLEGUIDE === "1"
          ? { styleguide: fileURLToPath(new URL("styleguide/index.html", import.meta.url)) }
          : {}),
      },
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.ts"],
    setupFiles: ["tests/unit/setup.ts"],
  },
});
