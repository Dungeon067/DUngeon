import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BA } from "../../src/data/bao-an";
import { SLOT_IDS, type StatId } from "../../src/data/bao-an-schema";
import {
  activeSets,
  addExp,
  bonusOf,
  capOf,
  dismantleYield,
  expToNext,
  mainValue,
  rollBaoAn,
  starState,
  type BaRarity,
  type BaoAnInst,
} from "../../src/economy/bao-an";
import { freshProfile, migrate, powerOf, Server, statsOf } from "../../src/server/server";

/** Rng có hạt để test lặp lại được. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}
const RS: BaRarity[] = [3, 4, 5];
const rk = (r: BaRarity) => String(r) as "3";
const need = (r: BaRarity, from: number, to: number) => {
  let n = 0;
  for (let l = from; l < to; l++) n += expToNext(BA, r, l);
  return n;
};

describe("Tung chỉ số Bảo Ấn đúng bảng", () => {
  it("mọi bộ × ô × độ hiếm: chỉ số chính thuộc bảng ô, 3–4 dòng phụ, không trùng, đúng bậc giá trị", () => {
    const rng = seeded(7);
    for (const b of BA.bo)
      for (const o of SLOT_IDS)
        for (const r of RS)
          for (let i = 0; i < 20; i++) {
            const a = rollBaoAn(BA, "x", { bo: b.id, o, r }, rng);
            const slot = BA.o.find((x) => x.id === o)!;
            expect(Object.keys(slot.chinh)).toContain(a.chinh);
            expect(a.lv).toBe(0);
            const [lo, hi] = BA.doHiem[rk(r)].dongBanDau;
            expect(a.phu.length).toBeGreaterThanOrEqual(lo);
            expect(a.phu.length).toBeLessThanOrEqual(hi);
            const ks = a.phu.map((x) => x.k);
            expect(new Set(ks).size).toBe(ks.length);
            expect(ks).not.toContain(a.chinh);
            for (const x of a.phu) {
              const tiers = BA.phu.bac.map((t) => BA.phu.giaTriToiDa[x.k]! * BA.phu.heSoDoHiem[rk(r)] * t);
              expect(tiers.some((t) => Math.abs(t - x.v) < 1e-4)).toBe(true);
            }
          }
  });
  it("5★ có 3 hoặc 4 dòng ban đầu, cả hai đều xuất hiện", () => {
    const rng = seeded(3),
      seen = new Set<number>();
    for (let i = 0; i < 200; i++) seen.add(rollBaoAn(BA, "x", { bo: BA.bo[0]!.id, o: "chen", r: 5 }, rng).phu.length);
    expect([...seen].sort()).toEqual([3, 4]);
  });
  it("Mảnh Hoa luôn Máu, Mảnh Lông luôn Tấn công", () => {
    const rng = seeded(11);
    for (let i = 0; i < 30; i++) {
      expect(rollBaoAn(BA, "x", { bo: BA.bo[1]!.id, o: "hoa", r: 5 }, rng).chinh).toBe("hp");
      expect(rollBaoAn(BA, "x", { bo: BA.bo[1]!.id, o: "long", r: 5 }, rng).chinh).toBe("atk");
    }
  });
  it("chỉ số chính ép sai ô thì báo lỗi; admin ép dòng phụ bỏ dòng trùng chỉ số chính", () => {
    expect(() => rollBaoAn(BA, "x", { bo: BA.bo[0]!.id, o: "hoa", r: 5, chinh: "atk" }, seeded(1))).toThrow();
    const a = rollBaoAn(
      BA,
      "x",
      { bo: BA.bo[0]!.id, o: "mien", r: 5, chinh: "chiMang", phu: ["chiMang", "stcm", "atkPct"] as StatId[] },
      seeded(1),
    );
    expect(a.phu.map((x) => x.k).slice(0, 2)).toEqual(["stcm", "atkPct"]);
  });
});

describe("Nâng cấp Bảo Ấn", () => {
  it("giới hạn cấp: 3★ +12, 4★ +16, 5★ +20; thừa kinh nghiệm không vượt cấp tối đa", () => {
    expect(RS.map((r) => capOf(BA, r))).toEqual([12, 16, 20]);
    for (const r of RS) {
      const a = rollBaoAn(BA, "x", { bo: BA.bo[2]!.id, o: "den", r }, seeded(r));
      const { used } = addExp(BA, a, 1e9, seeded(5));
      expect(a.lv).toBe(capOf(BA, r));
      expect(used).toBe(need(r, 0, capOf(BA, r)));
    }
  });
  it("mỗi mốc +4: thêm dòng nếu dưới 4, đủ 4 thì tăng đúng 1 dòng có sẵn", () => {
    const rng = seeded(21);
    for (let t = 0; t < 40; t++) {
      const a = rollBaoAn(BA, "x", { bo: BA.bo[3]!.id, o: "chen", r: 5 }, rng);
      for (let moc = 1; moc <= 5; moc++) {
        const before = a.phu.map((x) => ({ ...x }));
        const { rolls } = addExp(BA, a, need(5, a.lv, moc * 4), rng);
        expect(a.lv).toBe(moc * 4);
        expect(rolls).toHaveLength(1);
        const r = rolls[0]!;
        expect(r.lv).toBe(moc * 4);
        if (before.length < 4) {
          expect(r.moi).toBe(true);
          expect(a.phu).toHaveLength(before.length + 1);
          expect(a.phu.at(-1)!.k).toBe(r.k);
        } else {
          expect(r.moi).toBe(false);
          expect(a.phu).toHaveLength(4);
          const changed = a.phu.filter((x, i) => x.v !== before[i]!.v);
          expect(changed).toHaveLength(1);
          expect(changed[0]!.k).toBe(r.k);
          expect(changed[0]!.n).toBe(before.find((x) => x.k === r.k)!.n + 1);
        }
        expect(new Set(a.phu.map((x) => x.k)).size).toBe(a.phu.length);
        expect(a.phu.map((x) => x.k)).not.toContain(a.chinh);
      }
      // 5★ +20: 5 mốc, tổng số lần tung dòng phụ = số dòng ban đầu + 5
      expect(a.phu.reduce((s, x) => s + x.n, 0)).toBeGreaterThanOrEqual(8);
    }
  });
  it("chỉ số chính tăng theo cấp, tới đúng bảng ở cấp tối đa", () => {
    const a = rollBaoAn(BA, "x", { bo: BA.bo[0]!.id, o: "hoa", r: 5 }, seeded(2));
    const v0 = mainValue(BA, a);
    addExp(BA, a, 1e9, seeded(2));
    expect(mainValue(BA, a)).toBeGreaterThan(v0);
    expect(mainValue(BA, a)).toBeCloseTo(BA.chinh.giaTri.hp! * BA.chinh.heSoDoHiem["5"]);
  });
});

describe("Hiệu ứng bộ và vì sao sáng trọn", () => {
  const set = (bo: string, n: number) => SLOT_IDS.slice(0, n).map((o) => ({ bo, o }));
  it("2 mảnh bật hiệu ứng 2, 4 mảnh bật cả 4; 5 mảnh cùng bộ là sáng trọn", () => {
    const bo = BA.bo[4]!.id;
    expect(activeSets(BA, set(bo, 1)).some((x) => x.hai)).toBe(false);
    const two = activeSets(BA, set(bo, 2))[0]!;
    expect([two.hai, two.bon, two.tron]).toEqual([true, false, false]);
    const four = activeSets(BA, set(bo, 4))[0]!;
    expect([four.hai, four.bon, four.tron]).toEqual([true, true, false]);
    const five = activeSets(BA, set(bo, 5))[0]!;
    expect([five.hai, five.bon, five.tron, five.n]).toEqual([true, true, true, 5]);
    expect([0, 1, 2, 3, 4, 5].map(starState)).toEqual([
      "Chưa sáng",
      "Chưa sáng",
      "Sao nhóm",
      "Sao nhóm",
      "Sao rạng",
      "Sao sáng trọn",
    ]);
  });
  it("2+2 hai bộ khác nhau bật hai hiệu ứng 2 mảnh", () => {
    const s = activeSets(BA, [...set(BA.bo[0]!.id, 2), ...set(BA.bo[1]!.id, 2)]);
    expect(s.map((x) => x.hai)).toEqual([true, true]);
  });
  it("mảnh thứ 5 không thêm chỉ số so với 4 mảnh (chỉ là hình ảnh)", () => {
    const bo = BA.bo[0]!.id,
      rng = seeded(9);
    const items = SLOT_IDS.map((o) => rollBaoAn(BA, o, { bo, o, r: 5 }, rng));
    const other = { ...items[4]!, bo: BA.bo[1]!.id };
    const a = bonusOf(BA, items),
      b = bonusOf(BA, [...items.slice(0, 4), other]);
    expect(a).toEqual(b);
  });
  it("mọi bộ có hiệu ứng 2 và 4 mảnh kèm phần quy Chiến Lực", () => {
    expect(BA.bo).toHaveLength(8);
    for (const b of BA.bo) {
      expect(b.hai.hieuUng.length).toBeGreaterThan(5);
      expect(b.bon.hieuUng.length).toBeGreaterThan(5);
    }
  });
});

describe("Phân rã", () => {
  it("Bụi Ấn theo độ hiếm và mốc; Sáp Ấn hoàn lại một phần kinh nghiệm", () => {
    const a = rollBaoAn(BA, "x", { bo: BA.bo[0]!.id, o: "hoa", r: 5 }, seeded(1));
    const y0 = dismantleYield(BA, a);
    expect(y0.bui).toBe(BA.phanRa.buiAn["5"]);
    addExp(BA, a, need(5, 0, 8), seeded(1));
    const y8 = dismantleYield(BA, a);
    expect(y8.bui).toBe(BA.phanRa.buiAn["5"] + 2 * BA.phanRa.buiMoiMoc["5"]);
    const expOf = (s: Record<string, number>) =>
      Object.entries(s).reduce((t, [k, n]) => t + n * BA.kinhNghiem.sap.find((x) => x.id === k)!.kinhNghiem, 0);
    expect(expOf(y8.sap)).toBeGreaterThan(expOf(y0.sap));
    expect(expOf(y8.sap) - expOf(y0.sap)).toBeLessThanOrEqual(need(5, 0, 8) * BA.phanRa.hoanKinhNghiem);
  });
});

describe("Server: kho, trang bị, migration", () => {
  beforeEach(() => {
    Server.P = freshProfile();
    vi.spyOn(Server, "save").mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it("save cũ không có Bảo Ấn: migration tạo kho, quà khởi đầu, không mặc gì", () => {
    const { baoAn: _b, baSeq: _s, baDoi: _d, ...old } = freshProfile();
    const P = migrate(old)!;
    expect(P).toBeTruthy();
    const n = BA.khoiDau.bao.length * 5;
    expect(Object.keys(P.baoAn)).toHaveLength(n);
    expect(P.baSeq).toBe(n);
    for (const o of Object.values(P.owned)) expect(Object.values(o.ba ?? {}).filter(Boolean)).toHaveLength(0);
    // chạy lại không nhân đôi quà
    expect(Object.keys(migrate(P)!.baoAn)).toHaveLength(n);
  });
  it("migration bỏ ô trỏ tới món không còn hoặc sai ô, bỏ món thuộc bộ lạ", () => {
    const P = freshProfile();
    const [u1, u2] = Object.keys(P.baoAn);
    const cid = Object.keys(P.owned)[0]!;
    const a1 = P.baoAn[u1!]!;
    P.owned[cid]!.ba = { [a1.o]: u1, chen: "khong-co", mien: u2 } as any;
    P.baoAn["b999"] = { ...a1, uid: "b999", bo: "bo-la" };
    const M = migrate(JSON.parse(JSON.stringify(P)))!;
    expect(M.baoAn.b999).toBeUndefined();
    expect(M.owned[cid]!.ba).toEqual(P.baoAn[u2!]!.o === "mien" ? { [a1.o]: u1, mien: u2 } : { [a1.o]: u1 });
  });
  it("trang bị, đổi giữa hai nhân vật, khóa chặn phân rã, Chiến Lực tăng", () => {
    const [c1, c2] = Server.P.party as string[];
    const g = Server.req("giveBaoAn", { bo: BA.bo[0]!.id, o: "long", r: 5, lv: 20 });
    expect(g.ok).toBe(true);
    const uid = g.data.uid as string;
    const p0 = powerOf(c1!);
    expect(Server.req("equipBaoAn", { char: c1, uid }).ok).toBe(true);
    expect(powerOf(c1!)).toBeGreaterThan(p0);
    expect(statsOf(c1!).atk).toBeGreaterThan(statsOf(c1!, undefined, { long: null }).atk);
    expect(Server.req("equipBaoAn", { char: c2, uid }).ok).toBe(false);
    expect(Server.req("equipBaoAn", { char: c2, uid, swap: true }).ok).toBe(true);
    expect(Server.P.owned[c2!]!.ba!.long).toBe(uid);
    expect(Server.P.owned[c1!]!.ba?.long).toBeUndefined();
    expect(Server.req("dismantleBaoAn", { uids: [uid] }).ok).toBe(false);
    expect(Server.req("unequipBaoAn", { char: c2, o: "long" }).ok).toBe(true);
    expect(Server.req("lockBaoAn", { uid, lock: true }).ok).toBe(true);
    expect(Server.req("dismantleBaoAn", { uids: [uid] }).ok).toBe(false);
    Server.req("lockBaoAn", { uid, lock: false });
    const bui = Server.P.bag["bui-an"] ?? 0;
    const d = Server.req("dismantleBaoAn", { uids: [uid] });
    expect(d.ok).toBe(true);
    expect(Server.P.bag["bui-an"]).toBeGreaterThan(bui);
    expect(Server.P.baoAn[uid]).toBeUndefined();
  });
  it("nâng cấp qua server tốn Sáp Ấn và Xu, trả về các mốc", () => {
    const uid = Server.req("giveBaoAn", { bo: BA.bo[0]!.id, o: "mien", r: 5 }).data.uid;
    Server.P.bag["sap-an-sao"] = 50;
    Server.P.coin = 1e9;
    const r = Server.req("upgradeBaoAn", { uid, sap: { "sap-an-sao": 50 } });
    expect(r.ok).toBe(true);
    expect(r.data.lv).toBe(20);
    expect(r.data.rolls).toHaveLength(5);
    expect(Server.P.bag["sap-an-sao"]).toBe(0);
    expect(Server.req("upgradeBaoAn", { uid, sap: {} }).ok).toBe(false);
  });
  it("đổi Bụi Ấn có giới hạn tuần, không có món nào bán bằng tiền thật", () => {
    const d = BA.doi[0]!;
    Server.P.bag["bui-an"] = d.buiAn * (d.moiTuan + 2);
    for (let i = 0; i < d.moiTuan; i++)
      expect(Server.req("exchangeBaoAn", { id: d.id, bo: BA.bo[0]!.id, o: "chen", chinh: "atkPct" }).ok).toBe(true);
    expect(Server.req("exchangeBaoAn", { id: d.id, bo: BA.bo[0]!.id, o: "chen", chinh: "atkPct" }).ok).toBe(false);
  });
});
