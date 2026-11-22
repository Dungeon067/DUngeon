import { beforeEach, describe, expect, it } from "vitest";
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
    expect(P).toMatchObject({ v: 2, gems: 1600, coin: 30000, books: 30, party: ["suongmai", "mailinh", "bachvu"] });
    expect(P.owned).toEqual({ suongmai: { lv: 1, cons: 0 }, mailinh: { lv: 1, cons: 0 }, bachvu: { lv: 1, cons: 0 } });
    expect(P.cfg).toEqual({ rate5: 0.6, rate4: 5.1, soft: 74, hard: 90, cost: 160, featured: "lachong" });
  });

  it("ghi và đọc lại khóa localStorage tinhtu-v2", () => {
    Server.P.gems = 1234;
    Server.save();
    expect(JSON.parse(localStorage.getItem("tinhtu-v2")!).gems).toBe(1234);
    Server.P = null as never;
    Server.load();
    expect(Server.P.gems).toBe(1234);
  });

  it("đọc được hồ sơ do bản cũ ghi", () => {
    const old = { ...freshProfile(), gems: 777, owned: { lachong: { lv: 40, cons: 2 } }, party: ["lachong"] };
    localStorage.setItem("tinhtu-v2", JSON.stringify(old));
    Server.load();
    expect(Server.P.gems).toBe(777);
    expect(Server.P.owned.lachong).toEqual({ lv: 40, cons: 2 });
  });
});
