import { beforeEach, describe, expect, it } from "vitest";
import { ECON } from "../../src/data/economy";
import { freshProfile, lvCost, Server } from "../../src/server/server";

beforeEach(() => {
  localStorage.clear();
  Server.P = null as never;
  Server.load();
});

describe("Nâng cấp", () => {
  it("lvCost theo công thức gốc", () => {
    expect(lvCost(1)).toEqual({ books: 1, coin: 420 });
    expect(lvCost(6)).toEqual({ books: 2, coin: 1020 });
    expect(lvCost(59)).toEqual({ books: 10, coin: 7380 });
  });

  it("levelUp trừ đúng Sách và Xu, tăng cấp", () => {
    const P = Server.P;
    const id = P.party[0]!;
    const { books, coin } = P;
    const res = Server.req("levelUp", { id, times: 5 });
    expect(res.ok).toBe(true);
    let b = 0,
      c = 0;
    for (let lv = 1; lv < 6; lv++) {
      b += lvCost(lv).books;
      c += lvCost(lv).coin;
    }
    expect(P.owned[id]!.lv).toBe(6);
    expect(P.books).toBe(books - b);
    expect(P.coin).toBe(coin - c);
  });

  it("levelUp báo lỗi khi thiếu nguyên liệu", () => {
    Server.P.books = 0;
    const res = Server.req("levelUp", { id: Server.P.party[0], times: 1 });
    expect(res.ok).toBe(false);
  });
});

describe("Lưu trữ", () => {
  it("hồ sơ khởi đầu giống bản cũ", () => {
    const P = freshProfile();
    expect(P).toMatchObject({ v: 3, gems: 1600, coin: 30000, books: 30, party: ["suongmai", "mailinh", "bachvu"] });
    expect(P.owned).toMatchObject({
      suongmai: { lv: 1, cons: 0 },
      mailinh: { lv: 1, cons: 0 },
      bachvu: { lv: 1, cons: 0 },
    });
    expect(P.cfg).toEqual({ rate5: 0.6, rate4: 5.1, soft: 74, hard: 90, cost: 160, featured: "loidinh" });
  });

  it("ghi và đọc lại khóa localStorage tinhtu-v3", () => {
    Server.P.gems = 1234;
    Server.save();
    expect(JSON.parse(localStorage.getItem("tinhtu-v3")!).gems).toBe(1234);
    Server.P = null as never;
    Server.load();
    expect(Server.P.gems).toBe(1234);
  });

  it("đọc được hồ sơ do bản cũ (v2) ghi và chuyển lên v3", () => {
    const {
      teams: _t,
      team: _i,
      bag: _b,
      quests: _q,
      fog: _f,
      marks: _m,
      codex: _c,
      affinity: _a,
      econ: _e,
      quits: _x,
      weapons: _w,
      wSeq: _ws,
      wPity: _wp,
      wPick: _wk,
      wHistory: _wh,
      wcfg: _wc,
      ...base
    } = freshProfile();
    const old = { ...base, v: 2, gems: 777, owned: { lachong: { lv: 40, cons: 2 } }, party: ["lachong"] };
    localStorage.removeItem("tinhtu-v3");
    localStorage.setItem("tinhtu-v2", JSON.stringify(old));
    Server.P = null as never;
    Server.load();
    expect(Server.P.v).toBe(3);
    expect(Server.P.gems).toBe(777);
    expect(Server.P.owned.lachong).toMatchObject({ lv: 40, cons: 2 });
    expect(Server.P.teams[0]).toEqual(["lachong"]);
    expect(Server.P.bag).toEqual(ECON.thietKe.vuKhi.khoiDau);
  });

  it("hồ sơ cũ có banner Lạc Hồng (nay là thường trú) chuyển sang banner giới hạn mặc định", () => {
    const old = { ...freshProfile(), cfg: { ...freshProfile().cfg, featured: "lachong", cost: 120 } };
    localStorage.setItem("tinhtu-v3", JSON.stringify(old));
    Server.P = null as never;
    Server.load();
    expect(Server.P.cfg.featured).toBe("loidinh");
    expect(Server.P.cfg.cost).toBe(120);
  });
});

describe("Đội lưu sẵn và dữ liệu menu (S10)", () => {
  beforeEach(() => {
    Server.P = freshProfile();
  });
  it("lưu 4 đội, đổi đội đang dùng", () => {
    Server.P.owned.lachong = { lv: 1, cons: 0 };
    expect(Server.req("setTeam", { idx: 1, party: ["lachong", "mailinh"] }).ok).toBe(true);
    expect(Server.P.party).toEqual(["suongmai", "mailinh", "bachvu"]);
    expect(Server.req("useTeam", { idx: 1 }).ok).toBe(true);
    expect(Server.P.party).toEqual(["lachong", "mailinh"]);
    expect(Server.req("useTeam", { idx: 2 }).ok).toBe(false);
    expect(Server.req("setTeam", { idx: 1, party: [] }).ok).toBe(false);
    expect(Server.req("setTeam", { idx: 0, party: ["havy"] }).ok).toBe(false);
  });
  it("túi đồ, sương bản đồ, đánh dấu, bách khoa", () => {
    Server.req("addItems", { items: { "den-troi": 2 } });
    Server.req("addItems", { items: { "den-troi": 1, x: -3 } });
    expect(Server.P.bag["den-troi"]).toBe(3);
    expect(Server.P.bag.x).toBeUndefined();
    expect(Server.P.codex).toContain("vat:den-troi");
    expect(Server.req("explore", { cells: [0, 5, 5] }).data).toBe(2);
    expect(Server.P.fog[5]).toBe("1");
    Server.req("addMark", { x: 3, y: 4, label: "Hang" });
    expect(Server.P.marks).toEqual([{ x: 3, y: 4, label: "Hang" }]);
    Server.req("delMark", { i: 0 });
    expect(Server.P.marks).toEqual([]);
    expect(Server.req("discover", { ids: ["quai:slime", "quai:slime"] }).data).toEqual(["quai:slime"]);
  });
  it("ghi Đá Sao ra khi ước nguyện", () => {
    Server.req("pull", { count: 1 });
    expect(Server.P.econ["ra:uoc"]).toBe(160);
  });
});
