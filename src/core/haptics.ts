import { settings } from "./settings";

/* Rung máy nhẹ qua Vibration API (Android, một số trình duyệt máy tính bảng). Tắt được trong Cài đặt. */
const PATTERN: Record<string, number | number[]> = {
  hurt: 35,
  heavy: 18,
  burst: [20, 40, 30],
};
let last = 0;
export function buzz(kind: keyof typeof PATTERN | string) {
  if (!settings.vibrate || typeof navigator === "undefined" || !("vibrate" in navigator)) return false;
  const now = performance.now();
  if (now - last < 120) return false;
  last = now;
  try {
    return navigator.vibrate(PATTERN[kind] ?? 20);
  } catch {
    return false;
  }
}
