import raw from "../../content/bao-an.yaml";
import { CONTENT } from "./content";
import { ECON_BASE } from "./economy";
import { MC } from "./menu-content";
import { validateBaoAn, type BaoAnContent } from "./bao-an-schema";

/** Nội dung Bảo Ấn (content/bao-an.yaml) đã kiểm tra. */
function load(): BaoAnContent {
  const r = validateBaoAn(raw, {
    itemIds: MC.items.items.map((i) => i.id),
    enemyIds: Object.keys(CONTENT.enemies),
    thienTuong: ECON_BASE.thietKe.thienTuong.moTaiCapHoTinh.length,
  });
  if (!r.baoAn || r.errors.length) throw new Error(r.errors.join("\n"));
  return r.baoAn;
}
export const BA: BaoAnContent = load();
