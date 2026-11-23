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

/**
 * Chủ dự án chốt: người chơi LUÔN chơi bản 3D, không còn lựa chọn 2D.
 * Lớp vẽ 2D chỉ còn cho kiểm thử tự động (?e2e hoặc ?renderer=2d), không có đường nào cho người chơi vào.
 */
export function wants3D(): boolean {
  const qs = new URLSearchParams(location.search),
    q = qs.get("renderer");
  if (q === "3d") return true;
  if (q === "2d" || qs.has("e2e")) return false;
  return true;
}
/** Máy không có WebGL2: hiện thông báo thay vì lùi về 2D. */
function showUnsupported(why: string) {
  if (document.getElementById("no3d")) return;
  const d = document.createElement("div");
  d.id = "no3d";
  d.className = "tt-root";
  d.setAttribute("role", "alert");
  d.style.cssText =
    "position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center;background:#070b1c;color:#f4ecd8;font:500 16px/1.5 'Be Vietnam Pro',sans-serif";
  d.innerHTML = `<b style="font-size:20px;color:#ffe27a">Thiết bị chưa chạy được đồ họa 3D</b><span>${why}</span><span style="opacity:.75">Hãy cập nhật trình duyệt hoặc hệ điều hành, bật tăng tốc phần cứng, rồi tải lại trang.</span><button type="button" style="min-height:44px;padding:8px 20px;border-radius:10px;border:0;background:#f0c060;font-weight:700" onclick="location.reload()">Tải lại</button>`;
  document.body.append(d);
}

export function renderer3d(): WorldRenderer | null {
  return active;
}

/** Áp dụng cài đặt hiện tại: bật hoặc tắt renderer 3D. */
export function applyRenderer(): Promise<void> {
  if (wants3D() && !hasWebGL2()) {
    showUnsupported("Trình duyệt này không hỗ trợ WebGL2.");
    return Promise.resolve();
  }
  if (wants3D() && failed) {
    showUnsupported("Không khởi tạo được đồ họa 3D.");
    return Promise.resolve();
  }
  if (!wants3D()) {
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

let retried = false;
/** Mất context hoặc lỗi khởi tạo: thử dựng lại một lần, vẫn lỗi thì báo, không lùi về 2D. */
function fail() {
  active?.dispose();
  active = null;
  if (!retried) {
    retried = true;
    setTimeout(() => void applyRenderer(), 500);
    return;
  }
  failed = true;
  showUnsupported("Đồ họa 3D bị lỗi khi chạy.");
}
