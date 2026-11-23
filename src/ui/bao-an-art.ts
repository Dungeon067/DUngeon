/** Ảnh Bảo Ấn (S31): render Blender toon trong public/bao-an/<bộ>-<ô>-<cỡ>.webp, thiếu ảnh thì dùng biểu tượng. */
import { icon } from "./icons/icons";

export type BaoAnArtSize = 128 | 256 | 512;
const base = () => (import.meta.env?.BASE_URL ?? "/") + "bao-an/";
export const baoAnArtUrl = (bo: string, o: string, size: BaoAnArtSize = 256) => `${base()}${bo}-${o}-${size}.webp`;

export function baoAnImg(bo: string, o: string, size: BaoAnArtSize = 256, alt = "") {
  const img = document.createElement("img");
  img.className = "tt-wimg tt-baimg";
  img.src = baoAnArtUrl(bo, o, size);
  img.alt = alt;
  img.decoding = "async";
  img.loading = "lazy";
  img.draggable = false;
  img.addEventListener("error", () => img.replaceWith(icon("bao-an", { size: Math.min(64, size / 2) })), {
    once: true,
  });
  return img;
}
