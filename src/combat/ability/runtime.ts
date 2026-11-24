/**
 * Ability / Modifier / Mixin khai báo bằng dữ liệu (hợp nhất E). Khung, chưa thay đường chạy kỹ năng cũ.
 * Kiến trúc theo 526077247/GenshinGamePlay (MIT, © 2023 大大的奥斯卡): kỹ năng = danh sách mixin dữ liệu
 * (khi bắt đầu, khi trúng đòn, mỗi chu kỳ); modifier = trạng thái có thời hạn gắn lên đối tượng, cũng gồm mixin.
 * Thế giới được tiêm qua `AbilityWorld` để chạy được cả trong test lẫn trong game.
 */
import raw from "../../../content/abilities.yaml";
import { AbilitiesSchema, type AbilityDef, type Mixin, type ModifierDef } from "../../data/hop-nhat-schema";

const parsed = AbilitiesSchema.parse(raw) as Record<string, unknown> & { modifier: Record<string, ModifierDef> };
export const MODIFIERS = parsed.modifier;
export const ABILITIES = Object.fromEntries(Object.entries(parsed).filter(([k]) => k !== "modifier")) as Record<
  string,
  AbilityDef
>;

export interface Target {
  id: string;
  x: number;
  y: number;
}
export interface AbilityWorld {
  targetsIn(x: number, y: number, r: number): Target[];
  damage(t: Target, mult: number, el: string, kb?: number): void;
}
interface Live {
  id: string;
  def: ModifierDef;
  on: Target;
  left: number;
  tick: number;
}

export class AbilityRuntime {
  live: Live[] = [];
  private cds = new Map<string, number>();
  constructor(private W: AbilityWorld) {}
  cd(id: string) {
    return this.cds.get(id) ?? 0;
  }
  /** Dùng kỹ năng `id` tại (x, y). Trả về false nếu đang hồi. */
  cast(id: string, x: number, y: number): boolean {
    const A = ABILITIES[id];
    if (!A) throw new Error(`không có ability ${id}`);
    if (this.cd(id) > 0) return false;
    this.cds.set(id, A.cd);
    const onHit = A.mixin.filter((m): m is Extract<Mixin, { loai: "khiTrungDon" }> => m.loai === "khiTrungDon");
    for (const m of A.mixin)
      if (m.loai === "khiBatDau")
        for (const t of this.W.targetsIn(x, y, m.vung.r)) {
          this.W.damage(t, m.satThuong, m.nguyenTo, m.day);
          for (const h of onHit) this.attach(h.gan, t);
        }
    return true;
  }
  attach(id: string, on: Target) {
    const def = MODIFIERS[id];
    const old = this.live.find((l) => l.id === id && l.on.id === on.id);
    if (old) old.left = def.thoiGian;
    else this.live.push({ id, def, on, left: def.thoiGian, tick: 0 });
  }
  update(dt: number) {
    for (const [k, v] of this.cds) this.cds.set(k, Math.max(0, v - dt));
    for (const l of this.live) {
      l.left -= dt;
      l.tick += dt;
      for (const m of l.def.mixin)
        if (m.loai === "moiGiay" && l.tick >= m.chuKy) {
          const ts = m.vung.r > 0 ? this.W.targetsIn(l.on.x, l.on.y, m.vung.r) : [l.on];
          for (const t of ts) this.W.damage(t, m.satThuong, m.nguyenTo);
        }
      if (l.def.mixin.some((m) => m.loai === "moiGiay" && l.tick >= m.chuKy)) l.tick = 0;
    }
    this.live = this.live.filter((l) => l.left > 0);
  }
}
