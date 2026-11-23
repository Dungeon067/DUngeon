import type { CapacitorConfig } from "@capacitor/cli";

/* S22: bản Android/iOS bọc bản build web (dist/). Khoá ngang, ẩn thanh hệ thống: xem android/ và ios/. */
const config: CapacitorConfig = {
  appId: "vn.tinhtu.uocnguyen",
  appName: "Tinh Tú Ước Nguyện",
  webDir: "dist",
  backgroundColor: "#0f1430",
  ios: { contentInset: "never" },
};
export default config;
