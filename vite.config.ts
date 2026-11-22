import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
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

export default defineConfig({
  base: process.env.BASE_PATH ?? "./",
  plugins: [yamlToJson()],
  build: { target: "es2020" },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.ts"],
    setupFiles: ["tests/unit/setup.ts"],
  },
});
