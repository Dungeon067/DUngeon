/**
 * Chọn lớp vẽ thế giới (S25). File này không nhập three; renderer 3D chỉ tải khi cần.
 * - Cài đặt "renderer": auto | 3d | 2d. Trang /admin/ có thể ép 2D qua localStorage (cờ `tt_force2d`).
 * - Không có WebGL2, tải lỗi hoặc mất context: tự lùi về Canvas 2D cũ.
 */
import { settings } from "../core/settings";
import type { Quality } from "../core/settings";

export interface WorldRenderer {
  /** Vẽ một khung thế giới. Trả false nếu không vẽ được (lùi về 2D). */
  frame(t: number): boolean;
  /** Chiếu điểm thế giới (px logic, độ cao px) ra tọa độ màn hình CSS. */
  project(x: number, y: number, zPx?: number): { x: number; y: number; vis: boolean };
  /** Tia từ màn hình xuống mặt đất (cho ngắm chuột). */
  unproject(sx: number, sy: number): { x: number; y: number };
  setQuality(q: Quality): void;
  resize(): void;
  /** Ẩn canvas 3D khi đang vẽ bằng 2D (đấu trường, menu). */
  hide?(): void;
  debug?(): any;
  dispose(): void;
  stats(): { calls: number; tris: number; textures: number };
}

export const FORCE_2D_KEY = "tt_force2d";
let active: WorldRenderer | null = null;
let loading: Promise<void> | null = null;
let failed = false;

export function hasWebGL2(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

/** Máy đủ mạnh cho 3D: có WebGL2, GPU thật (không vẽ bằng CPU), đủ nhân và RAM. */
export function deviceStrong(): boolean {
  if (!hasWebGL2()) return false;
  const nav = navigator as any;
  if ((nav.hardwareConcurrency ?? 4) < 4 || (nav.deviceMemory ?? 4) < 3) return false;
  try {
    const g = document.createElement("canvas").getContext("webgl2")!,
      ext = g.getExtension("WEBGL_debug_renderer_info"),
      name = String(g.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : g.RENDERER));
    return !/swiftshader|llvmpipe|software|mali-4|adreno \(tm\) 3/i.test(name);
  } catch {
    return true;
  }
}

export function wants3D(): boolean {
  try {
    if (localStorage.getItem(FORCE_2D_KEY) === "1") return false;
  } catch {}
  const qs = new URLSearchParams(location.search),
    q = qs.get("renderer");
  if (q === "2d") return false;
  if (q === "3d") return hasWebGL2();
  // Test e2e chạy trên GPU giả lập: mặc định 2D, muốn thử 3D thì thêm ?renderer=3d.
  if (qs.has("e2e")) return false;
  if (settings.renderer === "2d") return false;
  if (settings.renderer === "3d") return hasWebGL2();
  return deviceStrong();
}

export function renderer3d(): WorldRenderer | null {
  return active;
}

/** Áp dụng cài đặt hiện tại: bật hoặc tắt renderer 3D. */
export function applyRenderer(): Promise<void> {
  if (!wants3D() || failed) {
    active?.dispose();
    active = null;
    document.documentElement.dataset.renderer = "2d";
    return Promise.resolve();
  }
  if (active) {
    active.setQuality(settings.quality);
    return Promise.resolve();
  }
  if (loading) return loading;
  loading = import("./renderer3d")
    .then((m) => {
      active = m.createRenderer3D(() => fail());
      document.documentElement.dataset.renderer = "3d";
    })
    .catch((e) => {
      console.warn("Không tải được renderer 3D, dùng 2D", e);
      fail();
    })
    .finally(() => (loading = null));
  return loading;
}

function fail() {
  failed = true;
  active?.dispose();
  active = null;
  document.documentElement.dataset.renderer = "2d";
}
