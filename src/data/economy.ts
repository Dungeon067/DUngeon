import rawEcon from "../../content/economy.yaml";
import rawWeapons from "../../content/weapons.yaml";
import { CHARS } from "./content";
import { validateEconomy, type Economy } from "./economy-schema";
import { validateWeapons, withWeapons } from "./weapons-schema";

/** Tên, bị động và truyện của 26 vũ khí (content/weapons.yaml). */
export const WEAPONS = validateWeapons(rawWeapons, CHARS);
const raw = withWeapons(rawEcon, WEAPONS);

/** Khóa localStorage lưu bản chỉnh của trang Admin (chỉ trên trình duyệt này). */
export const ECON_KEY = "tinhtu-econ";

export const ECON_BASE: Economy = validateEconomy(raw, CHARS);
const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));

function loadOverride(): Economy {
  try {
    const s = typeof localStorage !== "undefined" ? localStorage.getItem(ECON_KEY) : null;
    if (s) return validateEconomy(withWeapons(JSON.parse(s), WEAPONS), CHARS);
  } catch {
    /* bản chỉnh hỏng thì dùng file gốc */
  }
  return clone(ECON_BASE);
}

/** Cấu hình kinh tế đang dùng: economy.yaml, cộng bản chỉnh từ Admin nếu có. */
export const ECON: Economy = loadOverride();

/** Ghi đè cấu hình (đã kiểm tra hợp lệ) và lưu lại cho lần mở sau. */
export function setEcon(next: unknown) {
  const v = validateEconomy(withWeapons(next, WEAPONS), CHARS);
  Object.assign(ECON, v);
  localStorage.setItem(ECON_KEY, JSON.stringify(v));
}
export function resetEcon() {
  Object.assign(ECON, clone(ECON_BASE));
  localStorage.removeItem(ECON_KEY);
}
/** Tab khác (Admin) vừa đổi bản chỉnh: đọc lại để game dùng ngay. */
export function reloadEcon() {
  Object.assign(ECON, loadOverride());
}
export const econEdited = () => localStorage.getItem(ECON_KEY) !== null;
/** Cấu hình kinh tế để tải về dạng economy.yaml: bỏ danh sách vũ khí vì nó nằm ở weapons.yaml. */
export function econForYaml() {
  const e = clone(ECON) as any;
  delete e.thietKe.vuKhi.danhSach;
  return e;
}
