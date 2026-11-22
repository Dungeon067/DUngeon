import { vi } from "vitest";

/** Thay Math.random bằng dãy số cho trước (lặp lại số cuối khi hết). */
export function mockRandom(values: number[]) {
  let i = 0;
  return vi.spyOn(Math, "random").mockImplementation(() => values[Math.min(i++, values.length - 1)]!);
}
