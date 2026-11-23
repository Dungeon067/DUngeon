import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { byId } from "../../src/data/content";
import { ECON } from "../../src/data/economy";
import { charStats, passiveAt, rollWeapon, weaponLvScale, weaponOf, type WeaponPity } from "../../src/economy/core";
import {
  addExp,
  expToNext,
  fodderExp,
  lvCapOf,
  newWeapon,
  passiveLevels,
  weaponStats,
} from "../../src/economy/weapons";
import { addWeapon, freshProfile, migrate, powerOf, Server, statsOf, wDef } from "../../src/server/server";
import { mockRandom } from "./helpers";

const VK = ECON.thietKe.vuKhi;

describe("Công thức chỉ số vũ khí", () => {
  it("cấp 1 bằng heSoCap1 lần chỉ số cấp tối đa, tăng đều", () => {
    expect(weaponLvScale(1, ECON)).toBeCloseTo(VK.cap.heSoCap1);
    expect(weaponLvScale(VK.cap.toiDa, ECON)).toBeCloseTo(1);
    expect(weaponLvScale(undefined, ECON)).toBe(1);
    const mid = weaponLvScale(30, ECON);
    expect(mid).toBeGreaterThan(VK.cap.heSoCap1);
    expect(mid).toBeLessThan(1);
  });
  it("chỉ số vũ khí cộng vào nhân vật, cấp cao mạnh hơn cấp thấp", () => {
    const b = byId.lachong!;
    const none = charStats(b, { lv: 60, cons: 0 }, ECON);
    const lv1 = charStats(b, { lv: 60, cons: 0, vuKhi: { id: "hong-vu-truong-ca", tinhLuyen: 1, lv: 1 } }, ECON);
    const lv60 = charStats(b, { lv: 60, cons: 0, vuKhi: { id: "hong-vu-truong-ca", tinhLuyen: 1, lv: 60 } }, ECON);
    const maxNoLv = charStats(b, { lv: 60, cons: 0, vuKhi: { id: "hong-vu-truong-ca", tinhLuyen: 1 } }, ECON);
    const w = weaponOf("hong-vu-truong-ca", ECON);
    expect(lv1.atk).toBeGreaterThan(none.atk);
    expect(lv60.atk).toBeGreaterThan(lv1.atk);
    expect(lv60).toEqual(maxNoLv);
    expect(lv60.atk).toBe(Math.round((none.atk * (1 + w.tanCong + (w.phu.loai === "tanCong" ? w.phu.giaTri : 0))) / 1));
  });
  it("bị động tăng theo bậc tinh luyện R1–R5, bậc hiện tại được đánh dấu", () => {
    const w = weaponOf("hong-vu-truong-ca", ECON);
    const lv = passiveLevels(w, ECON);
    expect(lv).toHaveLength(5);
    expect(lv[0]).toBeCloseTo(w.biDong.satThuong);
    expect(lv[4]).toBeCloseTo(w.biDong.satThuong * (1 + 4 * VK.buocTinhLuyen));
    lv.forEach((v, i) => expect(v).toBeCloseTo(passiveAt(w, i + 1, ECON)));
    const st = weaponStats({ id: w.id, lv: 60, tl: 3 }, ECON);
    expect(st.biDong.filter((x) => x.on).map((x) => x.r)).toEqual([3]);
  });
  it("kinh nghiệm dừng ở giới hạn cấp theo đột phá", () => {
    const w = newWeapon("w1", "kiem-sat-lu-khach");
    expect(lvCapOf(w, ECON)).toBe(VK.cap.gioiHan[0]);
    addExp(w, 10_000_000, ECON);
    expect(w.lv).toBe(VK.cap.gioiHan[0]);
    w.khai = 1;
    addExp(w, expToNext(w.lv, ECON) + 5, ECON);
    expect(w.lv).toBe(VK.cap.gioiHan[0]! + 1);
    expect(w.exp).toBe(5);
    expect(fodderExp(w, ECON)).toBeGreaterThan(VK.cap.kinhNghiemVuKhi[0]!);
  });
});

describe("Banner Binh Khí Tinh Tú", () => {
  afterEach(() => vi.restoreAllMocks());
  const st = (): WeaponPity => ({ pity5: 0, pity4: 0, guaranteed: false, laBan: 0 });

  it("chắc chắn 5★ ở lượt 77, tăng tỉ lệ từ lượt 63", () => {
    const s = st();
    let n = 0;
    for (; n < 200; n++) if (rollWeapon(s, ECON, () => 0.999).r === 5) break;
    expect(n + 1).toBe(VK.banner.cung);
    const s2 = { ...st(), pity5: VK.banner.mem - 2 };
    expect(rollWeapon(s2, ECON, () => VK.banner.tiLe5 / 100 + 0.01).r).not.toBe(5);
    const s3 = { ...st(), pity5: VK.banner.mem - 1 };
    expect(rollWeapon(s3, ECON, () => VK.banner.tiLe5 / 100 + 0.01).r).toBe(5);
  });
  it("lệch nổi bật thì lần sau chắc chắn nổi bật", () => {
    const s = { ...st(), pity5: VK.banner.cung - 1 };
    // lần 1: 5★, không trúng 75% → thường trú
    let seq = [0.5, 0.9];
    let i = 0;
    expect(rollWeapon(s, ECON, () => seq[i++]!).kind).toBe("thuong");
    expect(s.guaranteed).toBe(true);
    s.pity5 = VK.banner.cung - 1;
    seq = [0.5, 0.9];
    i = 0;
    expect(rollWeapon(s, ECON, () => seq[i++]!).kind).not.toBe("thuong");
  });
  it("La Bàn Sao: ra sai vũ khí đã chọn 1 lần thì lần 5★ sau chắc chắn đúng", () => {
    Server.P = freshProfile();
    const P = Server.P;
    const [a, b] = P.wcfg.featured;
    expect(Server.req("wPick", { id: a }).ok).toBe(true);
    expect(Server.req("wPick", { id: "kiem-sat-lu-khach" }).ok).toBe(false);
    P.wPity.pity5 = VK.banner.cung - 1;
    // 5★, nổi bật (0.1 < 0.75), 50/50 → "khac" (0.9)
    mockRandom([0.5, 0.1, 0.9]);
    expect(Server.rollWeaponOne()).toMatchObject({ r: 5, id: b });
    expect(P.wPity.laBan).toBe(1);
    vi.restoreAllMocks();
    P.wPity.pity5 = VK.banner.cung - 1;
    mockRandom([0.5, 0.9, 0.9]);
    expect(Server.rollWeaponOne()).toMatchObject({ r: 5, id: a });
    expect(P.wPity.laBan).toBe(0);
  });
  it("ước 10 lần trừ Đá Sao, ghi lịch sử riêng, không đụng Bảo Hộ của banner nhân vật", () => {
    Server.P = freshProfile();
    const P = Server.P;
    P.gems = P.wcfg.cost * 10;
    const before = Object.keys(P.weapons).length;
    const res = Server.req("wPull", { count: 10 });
    expect(res.ok).toBe(true);
    expect(res.data).toHaveLength(10);
    expect(P.gems).toBe(0);
    expect(P.wHistory).toHaveLength(10);
    expect(P.history).toHaveLength(0);
    expect(P.pity5).toBe(0);
    expect(Object.keys(P.weapons).length).toBe(before + 10);
    expect(Server.req("wPull", { count: 1 }).ok).toBe(false);
  });
  it("Admin đổi đôi nổi bật thì xóa La Bàn và Bảo Hộ", () => {
    Server.P = freshProfile();
    Server.req("wPick", { id: Server.P.wcfg.featured[0] });
    Server.P.wPity.laBan = 1;
    Server.P.wPity.guaranteed = true;
    const pair = ["vo-sam-thao-nguyen", "chuong-lua-van-nien"];
    expect(Server.req("setWConfig", { featured: pair, rate5: 1 }).ok).toBe(true);
    expect(Server.P.wcfg).toMatchObject({ featured: pair, rate5: 1 });
    expect(Server.P.wPick).toBeNull();
    expect(Server.P.wPity).toMatchObject({ laBan: 0, guaranteed: false });
    Server.P.wPity.guaranteed = true;
    expect(Server.req("setWConfig", { featured: [pair[1], pair[0]] }).ok).toBe(true);
    expect(Server.P.wPity.guaranteed).toBe(true);
    expect(Server.req("setWConfig", { featured: ["kiem-sat-lu-khach", "cung-tre-dau-lang"] }).ok).toBe(false);
    expect(Server.req("setWConfig", { soft: 90, hard: 77 }).ok).toBe(false);
  });
});

describe("Trang bị, nâng cấp, tinh luyện, Lò Rèn", () => {
  beforeEach(() => {
    Server.P = freshProfile();
  });
  it("nhân vật khởi đầu và nhân vật mới đều có vũ khí 3★ đúng loại", () => {
    const P = Server.P;
    Server.grant("lachong");
    for (const [cid, o] of Object.entries(P.owned)) {
      const w = P.weapons[o.vk!]!;
      expect(wDef(w.id)!.loai).toBe(byId[cid]!.w);
      expect(wDef(w.id)!.r).toBe(3);
    }
  });
  it("thay vũ khí: sai loại bị chặn, đang ở người khác cần xác nhận rồi đổi chéo", () => {
    const P = Server.P;
    Server.grant("lachong");
    Server.grant("tuyetlan");
    const sword = addWeapon(P, "hong-vu-truong-ca");
    const spear = addWeapon(P, "thuong-go-lim");
    expect(Server.req("equipWeapon", { char: "lachong", uid: spear.uid }).ok).toBe(false);
    const before = powerOf("lachong");
    expect(Server.req("equipWeapon", { char: "lachong", uid: sword.uid }).ok).toBe(true);
    expect(powerOf("lachong")).toBeGreaterThan(before);
    expect(statsOf("lachong").dmg).toBeGreaterThan(0);
    const tlOld = P.owned.tuyetlan!.vk;
    expect(Server.req("equipWeapon", { char: "tuyetlan", uid: sword.uid }).ok).toBe(false);
    const r = Server.req("equipWeapon", { char: "tuyetlan", uid: sword.uid, swap: true });
    expect(r.ok).toBe(true);
    expect(P.owned.tuyetlan!.vk).toBe(sword.uid);
    expect(P.owned.lachong!.vk).toBe(tlOld);
  });
  it("nâng cấp bằng quặng và vũ khí khác; khóa và 4★/5★ được bảo vệ", () => {
    const P = Server.P;
    const w = addWeapon(P, "suong-som-ben-song");
    const f3 = addWeapon(P, "cung-tre-dau-lang");
    const f5 = addWeapon(P, "ngu-phong-truy-van");
    const coin = P.coin;
    const ore = P.bag["quang-tinh-luyen"]!;
    const r = Server.req("upgradeWeapon", { uid: w.uid, ores: { "quang-tinh-luyen": 2 }, mats: [f3.uid] });
    expect(r.ok).toBe(true);
    expect(w.lv).toBeGreaterThan(1);
    expect(P.coin).toBeLessThan(coin);
    expect(P.bag["quang-tinh-luyen"]).toBe(ore - 2);
    expect(P.weapons[f3.uid]).toBeUndefined();
    expect(Server.req("upgradeWeapon", { uid: w.uid, mats: [f5.uid] }).ok).toBe(false);
    Server.req("lockWeapon", { uid: f5.uid, lock: true });
    expect(Server.req("upgradeWeapon", { uid: w.uid, mats: [f5.uid], confirm: true }).ok).toBe(false);
    Server.req("lockWeapon", { uid: f5.uid, lock: false });
    expect(Server.req("upgradeWeapon", { uid: w.uid, mats: [f5.uid], confirm: true }).ok).toBe(true);
    const eq = P.owned.suongmai!.vk!;
    expect(Server.req("upgradeWeapon", { uid: w.uid, mats: [eq] }).ok).toBe(false);
    expect(Server.req("upgradeWeapon", { uid: w.uid }).ok).toBe(false);
  });
  it("đột phá khi chạm giới hạn cấp", () => {
    const P = Server.P;
    const w = addWeapon(P, "kiem-sat-lu-khach");
    expect(Server.req("ascendWeapon", { uid: w.uid }).ok).toBe(false);
    w.lv = lvCapOf(w, ECON);
    expect(Server.req("upgradeWeapon", { uid: w.uid, ores: { "quang-tinh-luyen-tho": 1 } }).ok).toBe(false);
    expect(Server.req("ascendWeapon", { uid: w.uid }).ok).toBe(true);
    expect(w.khai).toBe(1);
    expect(lvCapOf(w, ECON)).toBe(VK.cap.gioiHan[1]);
  });
  it("tinh luyện bằng bản trùng, tối đa R5", () => {
    const P = Server.P;
    const w = addWeapon(P, "suong-som-ben-song");
    expect(Server.req("refineWeapon", { uid: w.uid, mat: addWeapon(P, "cung-tre-dau-lang").uid }).ok).toBe(false);
    for (let i = 0; i < 4; i++) {
      const d = addWeapon(P, "suong-som-ben-song");
      expect(Server.req("refineWeapon", { uid: w.uid, mat: d.uid }).ok).toBe(false);
      expect(Server.req("refineWeapon", { uid: w.uid, mat: d.uid, confirm: true }).ok).toBe(true);
    }
    expect(w.tl).toBe(5);
    expect(
      Server.req("refineWeapon", { uid: w.uid, mat: addWeapon(P, "suong-som-ben-song").uid, confirm: true }).ok,
    ).toBe(false);
  });
  it("Lò Rèn rèn vũ khí 4★ bằng Phôi Lòng Sao", () => {
    const P = Server.P;
    expect(Server.req("forgeWeapon", { id: "suong-som-ben-song" }).ok).toBe(false);
    const r = Server.req("forgeWeapon", { id: "loi-the-bai-sao" });
    expect(r.ok).toBe(true);
    expect(P.bag["phoi-long-sao"]).toBe(VK.khoiDau["phoi-long-sao"]! - VK.loRen.so);
    expect(Server.req("forgeWeapon", { id: "loi-the-bai-sao" }).ok).toBe(false);
  });
});

describe("Chuyển đổi save (S24)", () => {
  it("save v3 cũ không có kho vũ khí: tự trang bị 3★ mặc định, giữ dữ liệu cũ, chạy lại không đổi", () => {
    const old: any = migrate({
      v: 3,
      gems: 5,
      owned: { lachong: { lv: 30, cons: 1 }, loidinh: { lv: 1, cons: 0 } },
      bag: { "den-troi": 1 },
    });
    for (const k of ["weapons", "wSeq", "wPity", "wPick", "wHistory", "wcfg"]) delete old[k];
    for (const o of Object.values(old.owned) as any[]) delete o.vk;
    const P = migrate(old)!;
    expect(P.gems).toBe(5);
    expect(P.bag["den-troi"]).toBe(1);
    expect(P.weapons[P.owned.lachong!.vk!]!.id).toBe(VK.macDinh.sword);
    expect(P.weapons[P.owned.loidinh!.vk!]!.id).toBe(VK.macDinh.spear);
    expect(P.owned.lachong).toMatchObject({ lv: 30, cons: 1 });
    const again = migrate(JSON.parse(JSON.stringify(P)))!;
    expect(again.weapons).toEqual(P.weapons);
    expect(again.owned).toEqual(P.owned);
    expect(again.bag).toEqual(P.bag);
  });
  it("vũ khí sai loại hoặc bị hai người cùng cầm thì được sửa", () => {
    const P = freshProfile();
    const spear = addWeapon(P, "thuong-go-lim");
    P.owned.suongmai!.vk = spear.uid;
    P.owned.mailinh!.vk = P.owned.bachvu!.vk;
    const M = migrate(JSON.parse(JSON.stringify(P)))!;
    const ids = Object.values(M.owned).map((o) => o.vk);
    expect(new Set(ids).size).toBe(ids.length);
    for (const [cid, o] of Object.entries(M.owned)) expect(wDef(M.weapons[o.vk!]!.id)!.loai).toBe(byId[cid]!.w);
  });
});
