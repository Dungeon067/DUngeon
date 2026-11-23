/** Ảnh vũ khí (S24): render Blender trong public/weapons/, thiếu ảnh thì dùng biểu tượng loại vũ khí. */
import { icon } from "./icons/icons";

export type WeaponArtSize = 128 | 256 | 512;
const base = () => (import.meta.env?.BASE_URL ?? "/") + "weapons/";
export const weaponArtUrl = (id: string, size: WeaponArtSize = 256) => `${base()}${id}-${size}.webp`;

/** Thẻ <img> nền trong suốt; lỗi tải thì thay bằng biểu tượng. */
export function weaponImg(id: string, size: WeaponArtSize = 256, alt = "") {
  const img = document.createElement("img");
  img.className = "tt-wimg";
  img.src = weaponArtUrl(id, size);
  img.alt = alt;
  img.decoding = "async";
  img.loading = "lazy";
  img.draggable = false;
  img.addEventListener("error", () => img.replaceWith(icon("danh", { size: Math.min(64, size / 2) })), { once: true });
  return img;
}

const cache = new Map<string, HTMLImageElement>();
/** Ảnh đã tải xong để vẽ lên canvas (cảnh ước nguyện), null nếu chưa có. */
export function weaponBitmap(id: string): HTMLImageElement | null {
  const im = cache.get(id);
  return im && im.complete && im.naturalWidth ? im : null;
}
export function preloadWeaponArt(ids: string[], size: WeaponArtSize = 512) {
  return Promise.all(
    ids.map(
      (id) =>
        new Promise<void>((res) => {
          if (cache.has(id)) return res();
          const im = new Image();
          im.onload = im.onerror = () => res();
          im.src = weaponArtUrl(id, size);
          cache.set(id, im);
        }),
    ),
  );
}
