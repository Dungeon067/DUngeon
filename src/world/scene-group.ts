/**
 * SceneGroup: cơ quan giải đố kiểu "sân khấu – diễn viên – kịch bản" (hợp nhất E). Khung, chưa gắn vào bản đồ.
 * Kiến trúc theo 526077247/GenshinGamePlay (MIT, © 2023 大大的奥斯卡): vùng kích hoạt, giai đoạn (suite), sự kiện.
 */
import raw from "../../content/scene-groups.yaml";
import { SceneGroupSchema, type SceneGroupDef } from "../data/hop-nhat-schema";

export const SCENE_GROUPS = SceneGroupSchema.parse(raw);

export class SceneGroup {
  inside = false;
  stage: string | null = null;
  /** Diễn viên đang có mặt và trạng thái bật (đèn đã thắp, công tắc đã bấm). */
  actors = new Map<string, boolean>();
  log: string[] = [];
  private done = new Set<number>();
  constructor(public def: SceneGroupDef) {}
  private run(i: number) {
    if (this.done.has(i)) return;
    this.done.add(i);
    for (const a of this.def.kichBan[i].lam) {
      if ("giaiDoan" in a) {
        this.stage = a.giaiDoan;
        const g = this.def.giaiDoan.find((x) => x.id === a.giaiDoan);
        for (const d of g?.dienVien ?? []) if (!this.actors.has(d.id)) this.actors.set(d.id, false);
      } else this.log.push(a.thongBao);
    }
  }
  private check() {
    this.def.kichBan.forEach((k, i) => {
      if (typeof k.khi === "object" && k.khi.tatCa.every((id) => this.actors.get(id))) this.run(i);
    });
  }
  /** Người chơi ở (x, y). */
  move(x: number, y: number) {
    const V = this.def.vung,
      now = Math.hypot(x - V.x, y - V.y) <= V.r;
    if (now !== this.inside) {
      this.inside = now;
      this.def.kichBan.forEach((k, i) => k.khi === (now ? "vaoVung" : "raVung") && this.run(i));
    }
  }
  /** Bật một diễn viên (ví dụ thắp đèn). */
  set(id: string, on = true) {
    if (!this.actors.has(id)) return;
    this.actors.set(id, on);
    this.check();
  }
}
