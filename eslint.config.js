import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/", "legacy/", "coverage/", "playwright-report/", "test-results/", "android/", "ios/", "src-tauri/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // Mã chuyển từ bản JavaScript gốc còn nhiều chỗ dùng `any`; sẽ thu hẹp dần ở các session sau.
      "@typescript-eslint/no-explicit-any": "off",
      // Vài biến thừa có sẵn từ bản gốc được giữ nguyên để không đổi hành vi (xem docs/architecture.md).
      "@typescript-eslint/no-unused-vars": ["warn", { args: "none", caughtErrors: "none", varsIgnorePattern: "^_" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
);
