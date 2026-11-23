import { beforeEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { GS } from "../../src/core/state";
import { CHARS, byId } from "../../src/data/content";
import { KITS, STATUS, STATUS_TRAN } from "../../src/data/kits";
import { blocksOfKit, clipsOfKit } from "../../src/data/kit-schema";
import { makeEnemy } from "../../src/entities/enemy";
import { newSession } from "../../src/entities/party";
import { Server } from "../../src/server/server";
import { ICON_NAMES } from "../../src/ui/icons/icons";
import {
  addStatus,
  defMult,
  emAmp,
  hasStatus,
  infusionOf,
  resMult,
  stacksOf,
  statSum,
  takenMult,
  tickStatuses,
} from "../../src/combat/status";
import { castKitBurst, castKitSkill, updateKits } from "../../src/combat/kits/run";
import { runBlock } from "../../src/combat/kits/blocks";
import { hurtPlayer, hitEnemy } from "../../src/combat/damage";
import { charStats, chienLuc } from "../../src/economy/core";
import { ECON } from "../../src/data/economy";
import { mockRandom } from "./helpers";

const IDS = ["suongmai", "mailinh", "bachvu", "havy", "loidinh"];
const clips = JSON.parse(readFileSync("public/media/anim/kits.json", "utf8")).clips;

function session(party: string[]) {
  localStorage.clear();
  Server.P = null as never;
  Server.load();
  for (const id of party) Server.P.owned[id] ??= { ...Object.values(Server.P.owned)[0] };
  Server.P.party = [...party];
  GS.G = newSession("tower");
  GS.G.enemies = [];
  return GS.G;
}
const enemy = (x = 160, y = 100) => {
  const e: any = makeEnemy("slime", x, y, 1, "water");
  e.hp = e.maxHp = 1e7;
  GS.G.enemies.push(e);
  return e;
};
/** Chạy hàng chờ `later` (đòn trễ) tới khi hết. */
function flush(sec = 3) {
  for (let t = 0; t < sec; t += 0.05) {
    for (const l of GS.G.later) l.t -= 0.05;
    const due = GS.G.later.filter((l: any) => l.t <= 0);
    GS.G.later = GS.G.later.filter((l: any) => l.t > 0);
    due.forEach((l: any) => l.fn());
  }
}

describe("bộ chiêu riêng: đủ dữ liệu và khác nhau", () => {
  it("5 nhân vật đầu đã có bộ chiêu", () => {
    expect(Object.keys(KITS).sort()).toEqual([...IDS].sort());
  });
  it.each(IDS)(
    "%s: chuỗi 3–5 đòn, trọng kích, bấm và giữ, nộ 1–1,5 giây, 2 bị động, có buff/debuff đặc trưng",
    (id) => {
      const k = KITS[id]!;
      expect(k.thuong.length).toBeGreaterThanOrEqual(3);
      expect(k.thuong.length).toBeLessThanOrEqual(5);
      expect(k.trongKich.muc.length).toBeGreaterThanOrEqual(1);
      expect(k.kyNang.bam.khoi.length).toBeGreaterThan(0);
      expect(k.kyNang.giu.khoi.length).toBeGreaterThan(0);
      expect(k.no.cine).toBeGreaterThanOrEqual(1);
      expect(k.no.cine).toBeLessThanOrEqual(1.5);
      expect(k.no.cost).toBe(byId[id]!.burst.cost);
      expect(k.biDong).toHaveLength(2);
      expect(k.vaiTro.length).toBeGreaterThan(0);
      expect(k.dacTrung.length).toBeGreaterThan(0);
      for (const s of k.dacTrung) expect(STATUS[s]).toBeDefined();
    },
  );
  it("không có hai nhân vật trùng cấu hình (chuỗi đánh, kỹ năng bấm, giữ, nộ)", () => {
    const sig = (id: string) => {
      const k = KITS[id]!;
      return JSON.stringify([k.thuong.map((t) => t.m), k.kyNang.bam.khoi, k.kyNang.giu.khoi, k.no.khoi]);
    };
    expect(new Set(IDS.map(sig)).size).toBe(IDS.length);
    // Kỹ năng bấm của mỗi người dùng tổ hợp khối khác nhau.
    const kinds = (id: string) =>
      KITS[id]!.kyNang.bam.khoi.map((b) => b.k).join("+") + "|" + KITS[id]!.kyNang.giu.khoi.map((b) => b.k).join("+");
    expect(new Set(IDS.map(kinds)).size).toBe(IDS.length);
    // Buff/debuff đặc trưng không trùng nhau.
    const all = IDS.flatMap((id) => KITS[id]!.dacTrung);
    expect(new Set(all).size).toBe(all.length);
  });
  it("Sương Mai không còn hồi máu; Hạ Vy có khiên", () => {
    expect(blocksOfKit(KITS.suongmai!).some((b) => b.k === "dac" && /hoi/i.test((b as any).ham))).toBe(false);
    expect(blocksOfKit(KITS.havy!).some((b) => b.k === "khien")).toBe(true);
  });
  it.each(IDS)("%s: mọi clip chiêu có trong kits.json, đặt tên <id>.<chiêu>", (id) => {
    for (const c of clipsOfKit(KITS[id]!)) {
      expect(c.startsWith(`${id}.`)).toBe(true);
      expect(clips[c], c).toBeDefined();
      expect(clips[c].n).toBeGreaterThan(5);
    }
  });
  it("clip phụ gọi trong code cũng có (phản đòn, tay không)", () => {
    for (const c of ["suongmai.counter", "loidinh.unarmed1", "loidinh.unarmed2", "loidinh.unarmed3"])
      expect(clips[c]).toBeDefined();
  });
  it("mọi buff/debuff có biểu tượng HUD", () => {
    for (const s of Object.values(STATUS)) expect(ICON_NAMES).toContain(s.icon);
  });
  it("nhân vật chưa làm bộ chiêu vẫn dùng kiểu chiêu chung", () => {
    expect(CHARS.filter((c) => !KITS[c.id]).length).toBe(CHARS.length - IDS.length);
  });
});

describe("hệ buff/debuff", () => {
  beforeEach(() => session(["suongmai", "mailinh", "bachvu", "havy"]));
  it("lamMoi: áp lại chỉ làm mới thời gian, giữ giá trị lớn hơn", () => {
    const m = GS.G.party[0];
    addStatus(m, "denCanh", { v: 50, t: 5 });
    addStatus(m, "denCanh", { v: 30, t: 8 });
    expect(m.sts).toHaveLength(1);
    expect(m.sts[0]).toMatchObject({ v: 50, t: 8, n: 1 });
  });
  it("tang: cộng tầng tới tối đa", () => {
    const m = GS.G.party[0];
    for (let i = 0; i < 9; i++) addStatus(m, "giotSuong", { t: 10 });
    expect(stacksOf(m, "giotSuong")).toBe(STATUS.giotSuong!.toiDa);
  });
  it("cùng nhóm chỉ tính cái mạnh nhất, khác nhóm thì cộng, và có trần", () => {
    const e = enemy();
    addStatus(e, "uotSuong", { v: 0.15, t: 5, el: "water" });
    addStatus(e, "gioDocTen", { v: 0.2, t: 5, el: "water" });
    expect(statSum(e, "giamKhang", "water")).toBeCloseTo(0.2);
    expect(statSum(e, "giamKhang", "fire")).toBe(0);
    const m = GS.G.party[0];
    addStatus(m, "denCanh", { v: 9999, t: 5 });
    expect(statSum(m, "tanCong")).toBe(STATUS_TRAN.tanCong);
  });
  it("hết giờ thì mất", () => {
    const m = GS.G.party[0];
    addStatus(m, "songChe", { v: 0.15, t: 1 });
    tickStatuses(m, 0.6);
    expect(hasStatus(m, "songChe")).toBe(true);
    tickStatuses(m, 0.6);
    expect(hasStatus(m, "songChe")).toBe(false);
  });
  it("debuff làm quái nhận thêm sát thương; công thức kháng và phòng thủ", () => {
    const e = enemy();
    expect(takenMult(e, "water")).toBeCloseTo(1);
    addStatus(e, "uotSuong", { v: 0.15, t: 5, el: "water" });
    addStatus(e, "xeGiap", { v: 0.2, t: 5 });
    expect(takenMult(e, "water")).toBeGreaterThan(1.3);
    expect(resMult(-0.2)).toBeCloseTo(1.1);
    expect(defMult(0)).toBe(1);
    expect(emAmp(0)).toBe(0);
    expect(emAmp(200)).toBeGreaterThan(0.3);
  });
  it("buff tấn công và tăng sát thương nguyên tố đổi sát thương thật", () => {
    mockRandom([0.99]);
    const m = GS.G.party[0],
      e = enemy();
    const before = hitEnemy(e, m, 1, null, { noKb: true, noEnergy: true });
    addStatus(m, "denCanh", { v: 100, t: 5 });
    const after = hitEnemy(e, m, 1, null, { noKb: true, noEnergy: true });
    expect(after / before).toBeCloseTo((m.st.atk + 100) / m.st.atk, 1);
  });
  it("Sóng Bạc gán Thủy cho đòn thường", () => {
    const m = GS.G.party[0];
    addStatus(m, "songBac", { t: 10 });
    expect(infusionOf(m)).toBe("water");
  });
  it("Sông Che giảm sát thương nhận vào; Áo Buồm không bị ngắt", () => {
    const m = GS.G.party[0],
      p = GS.G.p;
    const hp0 = m.hp;
    hurtPlayer(100, null as any);
    const d0 = hp0 - m.hp;
    p.iframes = 0;
    m.hp = hp0;
    addStatus(m, "songChe", { v: 0.15, t: 5 });
    addStatus(m, "aoBuom", { t: 5 });
    p.hurt = 0;
    hurtPlayer(100, null as any);
    expect(hp0 - m.hp).toBeLessThan(d0);
    expect(p.hurt).toBe(0);
  });
});

describe("kỹ năng bấm / giữ, nộ, cơ chế riêng", () => {
  it("Sương Mai: bấm thì lướt để lại Vệt Sương, giữ thì vào thế thủ và phản đòn", () => {
    session(["suongmai", "mailinh", "bachvu", "havy"]);
    const m = GS.G.party[0];
    enemy(140, 100);
    expect(castKitSkill("bam")).toBe(true);
    expect(GS.G.p.act.clip).toBe("suongmai.skillTap");
    expect(GS.G.p.dashT).toBeGreaterThan(0);
    flush();
    m.skillCd = 0;
    expect(castKitSkill("giu")).toBe(true);
    expect(GS.G.p.guard).toBeTruthy();
    const e0 = m.energy;
    GS.G.p.iframes = 0;
    hurtPlayer(50, GS.G.enemies[0]);
    expect(GS.G.p.guard).toBeNull();
    expect(m.energy).toBeGreaterThan(e0);
  });
  it("giữ nút ≥ 0,35 giây thành biến thể giữ", () => {
    session(["mailinh", "suongmai", "bachvu", "havy"]);
    GS.skHold = { t: 0 };
    updateKits(0.4, false);
    expect(GS.G.p.act.clip).toBe("mailinh.skillHold");
    expect(GS.G.turrets.filter((t: any) => t.tag === "den")).toHaveLength(3);
  });
  it("Mai Linh: tối đa 3 đèn, đèn cho buff tấn công khi đứng gần, nộ nổ mọi đèn", () => {
    session(["mailinh", "suongmai", "bachvu", "havy"]);
    const m = GS.G.party[0];
    for (let i = 0; i < 3; i++) {
      m.skillCd = 0;
      castKitSkill(i ? "giu" : "bam");
    }
    expect(GS.G.turrets.filter((t: any) => t.tag === "den" && t.life > 0).length).toBeLessThanOrEqual(3);
    m.energy = m.c.burst.cost;
    const e = enemy(150, 100);
    expect(castKitBurst()).toBe(true);
    expect(GS.G.cine.max).toBe(KITS.mailinh!.no.cine);
    const hp = e.hp;
    GS.G.cine.fire();
    flush();
    expect(e.hp).toBeLessThan(hp);
  });
  it("Bạch Vũ: Khuếch Tán để lại Gió Đổi Hướng giảm kháng nguyên tố bị hút", () => {
    session(["bachvu", "suongmai", "mailinh", "havy"]);
    const m = GS.G.party[0],
      e = enemy(130, 100);
    e.aura = "fire";
    e.auraT = 7;
    hitEnemy(e, m, 1, "wind", { noKb: true });
    flush(0.5);
    expect(GS.G.enemies.some((o: any) => statSum(o, "giamKhang", "fire") > 0)).toBe(true);
  });
  it("Hạ Vy: bọc khiên cứu đồng đội máu dưới 30%, kèm Áo Buồm", () => {
    session(["suongmai", "havy", "mailinh", "bachvu"]);
    const a = GS.G.party[0];
    a.hp = a.maxHp * 0.2;
    updateKits(0.016, false);
    expect(GS.G.p.shield).toBeGreaterThan(0);
    expect(hasStatus(a, "aoBuom")).toBe(true);
  });
  it("Lôi Đình: Nhịp Vó tích tầng, trọng kích tiêu hết; bấm lại kỹ năng ra lao thứ hai", () => {
    session(["loidinh", "suongmai", "mailinh", "havy"]);
    const m = GS.G.party[0];
    for (let i = 0; i < 4; i++) addStatus(m, "nhipVo", { t: 15 });
    enemy(200, 100);
    runBlock({ k: "dac", ham: "phiThuong", r: 220, m: 2, sts: [], lap: 1, cach: 0 } as any, {
      m,
      x: GS.G.p.x,
      y: GS.G.p.y,
      ang: 0,
      cast: null,
    });
    expect(stacksOf(m, "nhipVo")).toBe(0);
    expect(castKitSkill("bam")).toBe(true);
    expect(m.recast).toBeTruthy();
    expect(castKitSkill("bam")).toBe(true);
    expect(m.recast).toBeNull();
  });
});

describe("Chiến Lực với chỉ số phụ", () => {
  it("giá trị hỗ trợ và hồi năng lượng tăng Chiến Lực, không đổi nhân vật chưa khai báo", () => {
    const inv = { lv: 50, cons: 0 };
    const base = { r: 4, hp: 900, atk: 86 };
    const a = chienLuc(charStats(base, inv, ECON), ECON);
    const b = chienLuc(charStats({ ...base, chiSoPhu: { tinhThong: 100, hoiNang: 0.2, hoTro: 0.1 } }, inv, ECON), ECON);
    expect(b).toBeGreaterThan(a);
    expect(b / a).toBeLessThan(1.25);
  });
});
