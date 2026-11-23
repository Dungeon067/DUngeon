import { beforeEach, describe, expect, it } from "vitest";
import { byId } from "../../src/data/content";
import { ECON } from "../../src/data/economy";
import { DOMAINS, MINI, OBJ, PUZZLES, PZ, WORLD_PUZZLES } from "../../src/data/puzzles";
import { BASIC, puzzleGems, solvableWith } from "../../src/data/puzzles-schema";
import { Server, freshProfile } from "../../src/server/server";
import {
  hitObj,
  makeState,
  objView,
  pulse,
  tickPuzzle,
  blocking,
  HIT_CD,
  type PState,
} from "../../src/world/puzzle-core";

const TS = 40;
/** Một câu đố giả chỉ có một vật thể loại `loai` để thử riêng từng loại. */
const single = (loai: string, giay?: number) =>
  makeState({ ...PUZZLES.cauDo[0]!, id: "t-" + loai, vatThe: [{ loai, dx: 0, dy: 0, giay }] }, OBJ, 0, 0, TS);
const hit = (st: PState, el: string) => {
  const ev = pulse([st], 0, 0, 10, el);
  tickPuzzle(st, HIT_CD + 0.01);
  return ev;
};

describe("Từng loại vật thể nguyên tố", () => {
  for (const [loai, def] of Object.entries(OBJ))
    it(`${loai} (${def.ten}): đúng nguyên tố từng bước thì xong, sai nguyên tố thì không đổi`, () => {
      const st = single(loai);
      const wrong = ["fire", "water", "earth", "wind", "ice", "bolt"].find(
        (e) => !def.buoc[0]!.includes(e as never) && !def.tat.includes(e as never),
      )!;
      expect(hit(st, wrong)).toEqual([]);
      expect(st.objs[0]!.step).toBe(0);
      def.buoc.forEach((s, i) => {
        expect(st.solved).toBe(false);
        const ev = hit(st, s[0]!);
        expect(ev[0]?.res).toBe(i === def.buoc.length - 1 ? "done" : "adv");
      });
      expect(st.solved).toBe(true);
      expect(st.objs[0]!.done).toBe(true);
      if (def.chan) expect(blocking(st.objs[0]!)).toBe(false);
    });

  it("vật thể chắn đường chặn cho tới khi giải", () => {
    for (const [loai, def] of Object.entries(OBJ)) {
      if (!def.chan) continue;
      expect(blocking(single(loai).objs[0]!)).toBe(true);
    }
  });

  it("đèn tự tắt sau N giây, đánh lại lửa thì giữ cháy thêm", () => {
    const st = makeState(
      {
        ...PZ["den-canh-ven-bien"]!,
        vatThe: [
          { loai: "den", dx: 0, dy: 0, giay: 5 },
          { loai: "den", dx: 20, dy: 0, giay: 5 },
        ],
      },
      OBJ,
      0,
      0,
      TS,
    );
    const [a, b] = st.objs as [any, any];
    expect(hitObj(a, "fire")).toBe("done");
    expect(tickPuzzle(st, 3)).toBe(false);
    expect(hitObj(a, "fire")).toBe("refresh");
    expect(tickPuzzle(st, 4)).toBe(false);
    expect(a.done).toBe(true);
    expect(tickPuzzle(st, 1.5)).toBe(true);
    expect(a.done).toBe(false);
    // Thắp cả hai cùng lúc thì câu đố giải xong và không tắt nữa.
    pulse([st], a.x, a.y, 10, "fire");
    pulse([st], b.x, b.y, 10, "fire");
    expect(st.solved).toBe(true);
    tickPuzzle(st, 99);
    expect(a.done && b.done).toBe(true);
  });

  it("nước dập đèn đang cháy (về trạng thái đầu)", () => {
    const st = single("den", 10);
    hit(st, "fire");
    st.solved = false;
    expect(hit(st, "water")[0]?.res).toBe("reset");
    expect(st.objs[0]!.done).toBe(false);
  });

  it("phản ứng: nước rồi lửa ra Bốc Hơi, lửa rồi gió ra Khuếch Tán, lửa phá băng ra Tan Chảy", () => {
    const hoi = single("bonHoi");
    hit(hoi, "water");
    expect(hit(hoi, "fire")[0]?.react).toBe("Bốc Hơi");
    const lan = single("denLan");
    hit(lan, "fire");
    expect(hit(lan, "wind")[0]?.react).toBe("Khuếch Tán");
    expect(hit(single("bangChan"), "fire")[0]?.react).toBe("Tan Chảy");
    expect(hit(single("bangMat"), "ice")[0]?.react).toBe("Đóng Băng");
    expect(hit(single("loiTru"), "bolt")[0]?.react).toBe("Quá Tải");
  });

  it("gió lan lửa qua dãy đèn lồng gần nhau", () => {
    const p = PZ["gio-lan-lua-dinh"]!;
    const st = makeState(p, OBJ, 0, 0, TS);
    const first = st.objs[0]!;
    for (const o of st.objs) pulse([st], o.x, o.y, 1, "fire");
    tickPuzzle(st, 1);
    const ev = pulse([st], first.x, first.y, 1, "wind");
    expect(ev.filter((e) => e.react === "Khuếch Tán").length).toBeGreaterThan(1);
    expect(st.solved).toBe(true);
  });

  it("một đòn kéo dài không đếm nhiều bước một lúc", () => {
    const st = single("bonHoi");
    pulse([st], 0, 0, 10, "water");
    expect(pulse([st], 0, 0, 10, "fire")).toEqual([]);
    tickPuzzle(st, HIT_CD + 0.01);
    expect(pulse([st], 0, 0, 10, "fire")[0]?.res).toBe("done");
  });

  it("đòn ngoài tầm không chạm vật thể", () => {
    const st = single("den");
    expect(pulse([st], 500, 500, 30, "fire")).toEqual([]);
  });
});

describe("Công bằng: đội miễn phí giải được", () => {
  const START = ["water", "fire", "wind"];
  const NGOC = MINI.find((m) => m.tang === "ngocthach")!;
  const HAVY = MINI.find((m) => m.tang === "havy")!;

  it("Thổ miễn phí: Ngọc Thạch (4★ Thổ) qua np_08 Đèn Mỏ Thứ Bảy, giải bằng đội khởi đầu", () => {
    expect(byId.ngocthach).toMatchObject({ r: 4, el: "earth" });
    expect(NGOC.id).toBe("np_08");
    for (const c of NGOC.cauDo) expect(solvableWith(PZ[c]!, OBJ, START)).toBe(true);
  });

  it("Băng miễn phí: Hạ Vy (4★ Băng) qua quest sớm ở Hồ Gương, giải bằng đội khởi đầu", () => {
    expect(byId.havy).toMatchObject({ r: 4, el: "ice" });
    expect(HAVY.vung).toMatch(/Hồ Gương/);
    for (const c of HAVY.cauDo) expect(solvableWith(PZ[c]!, OBJ, START)).toBe(true);
  });

  it("mọi câu đố bắt buộc giải được bằng 4 nguyên tố cơ bản của đội free, không cần Băng, Lôi hay 5★", () => {
    const req = PUZZLES.cauDo.filter((p) => p.batBuoc);
    expect(req.length).toBeGreaterThan(15);
    for (const p of req) expect(solvableWith(p, OBJ, [...BASIC]), p.id).toBe(true);
  });

  it("quest mini và cửa bí cảnh chỉ dùng câu đố bắt buộc; quest không cần Thổ thì giải được trước khi có Ngọc Thạch", () => {
    for (const m of MINI) for (const c of m.cauDo) expect(PZ[c]!.batBuoc, c).toBe(true);
    for (const d of DOMAINS) {
      expect(PZ[d.cua]!.batBuoc).toBe(true);
      for (const r of d.phong) expect(solvableWith(PZ[r]!, OBJ, [...BASIC]), r).toBe(true);
    }
    const preEarth = MINI.filter((m) => m.cauDo.every((c) => solvableWith(PZ[c]!, OBJ, START)));
    expect(preEarth.length).toBeGreaterThanOrEqual(8);
  });

  it("câu đố Băng, Lôi là tùy chọn, giải được bằng Hạ Vy và có cách thay bằng nguyên tố cơ bản", () => {
    const opt = PUZZLES.cauDo.filter((p) =>
      p.vatThe.some((v) => OBJ[v.loai]!.buoc.some((s) => s.some((e) => e === "ice" || e === "bolt"))),
    );
    expect(opt.length).toBeGreaterThanOrEqual(2);
    for (const p of opt) {
      expect(p.batBuoc).toBe(false);
      expect(p.thayThe).toBeTruthy();
      expect(solvableWith(p, OBJ, [...BASIC])).toBe(true);
    }
    const ice = opt.filter((p) => p.vatThe.some((v) => OBJ[v.loai]!.buoc.some((s) => s.includes("ice"))));
    for (const p of ice) expect(solvableWith(p, OBJ, ["ice"])).toBe(true);
  });

  it("đủ nội dung: 4 bí cảnh Hỏa/Thủy/Thổ/Phong, 2–3 phòng câu đố, ≥12 quest mini 3–8 dòng thoại, ≥3 câu đố kết hợp", () => {
    expect(new Set(DOMAINS.map((d) => d.nguyenTo))).toEqual(new Set(BASIC));
    for (const d of DOMAINS) expect(d.phong.length >= 2 && d.phong.length <= 3).toBe(true);
    expect(MINI.length).toBeGreaterThanOrEqual(12);
    for (const m of MINI) expect(m.thoai.length >= 3 && m.thoai.length <= 8, m.id).toBe(true);
    expect(PUZZLES.cauDo.filter((p) => p.kieu === "ket-hop").length).toBeGreaterThanOrEqual(3);
    for (const m of MINI) if (m.tang) expect(byId[m.tang]!.r).toBeLessThan(5);
  });
});

describe("Kinh tế câu đố", () => {
  it("tổng Đá Sao từ câu đố, bí cảnh, quest mini khớp economy.yaml (nguồn một lần cho mô phỏng)", () => {
    expect(puzzleGems(PUZZLES, ECON.game.thuong.ruongCauDo)).toBe(ECON.thietKe.thuNhap.cauDo.daSao);
  });
});

describe("Lưu trạng thái câu đố (server giả lập)", () => {
  beforeEach(() => {
    localStorage.clear();
    Server.P = null as never;
    Server.load();
  });

  it("hồ sơ mới có puz rỗng", () => {
    expect(freshProfile().puz).toEqual({ solved: [], talked: [], mini: [], domains: {} });
  });

  it("giải câu đố cộng thưởng rương một lần", () => {
    const p = WORLD_PUZZLES.find((x) => x.ruong)!;
    const R = ECON.game.thuong.ruongCauDo[p.ruong!];
    const g = Server.P.gems,
      c = Server.P.coin;
    expect(Server.req("solvePuzzle", { id: p.id }).ok).toBe(true);
    expect(Server.P.gems).toBe(g + R.daSao);
    expect(Server.P.coin).toBe(c + R.xu);
    expect(Server.req("solvePuzzle", { id: p.id }).ok).toBe(false);
    expect(Server.P.gems).toBe(g + R.daSao);
    expect(Server.req("solvePuzzle", { id: "khong-co" }).ok).toBe(false);
  });

  it("quest Hạ Vy: phải nói chuyện và giải câu đố mới xong, tặng Hạ Vy một lần", () => {
    const m = MINI.find((x) => x.tang === "havy")!;
    expect(Server.req("finishMini", { id: m.id }).ok).toBe(false);
    Server.req("talkMini", { id: m.id });
    expect(Server.req("finishMini", { id: m.id }).ok).toBe(false);
    for (const c of m.cauDo) Server.req("solvePuzzle", { id: c });
    const r = Server.req("finishMini", { id: m.id });
    expect(r.ok).toBe(true);
    expect(r.data.gift).toBe("havy");
    expect(Server.P.owned.havy).toBeTruthy();
    expect(Server.req("finishMini", { id: m.id }).ok).toBe(false);
  });

  it("bí cảnh lưu phòng đã qua, rương cuối nhận một lần, Admin đặt lại được", () => {
    const d = DOMAINS[0]!;
    Server.req("domainRoom", { id: d.id, room: 2 });
    Server.req("domainRoom", { id: d.id, room: 1 });
    expect(Server.P.puz.domains[d.id]).toEqual({ room: 2, done: false });
    expect(Server.req("domainClear", { id: d.id }).ok).toBe(true);
    expect(Server.req("domainClear", { id: d.id }).ok).toBe(false);
    Server.save();
    Server.P = null as never;
    Server.load();
    expect(Server.P.puz.domains[d.id]!.done).toBe(true);
    Server.req("solvePuzzle", { id: d.cua });
    Server.req("resetPuzzles", { id: d.id });
    expect(Server.P.puz.domains[d.id]).toBeUndefined();
    expect(Server.P.puz.solved).toContain(d.cua);
    Server.req("resetPuzzles", {});
    expect(Server.P.puz).toEqual({ solved: [], talked: [], mini: [], domains: {} });
  });

  it("save v3 cũ chưa có puz và save v2 đều được bổ sung, dữ liệu hỏng bị lọc", () => {
    const { puz: _p, ...old } = freshProfile();
    localStorage.setItem("tinhtu-v3", JSON.stringify({ ...old, gems: 4321 }));
    Server.P = null as never;
    Server.load();
    expect(Server.P.gems).toBe(4321);
    expect(Server.P.puz).toEqual({ solved: [], talked: [], mini: [], domains: {} });
    localStorage.setItem(
      "tinhtu-v3",
      JSON.stringify({
        ...old,
        puz: { solved: ["a", 3], mini: "x", domains: { [DOMAINS[0]!.id]: { room: 99, done: 1 } } },
      }),
    );
    Server.P = null as never;
    Server.load();
    expect(Server.P.puz.solved).toEqual(["a"]);
    expect(Server.P.puz.mini).toEqual([]);
    expect(Server.P.puz.domains[DOMAINS[0]!.id]!.room).toBeLessThanOrEqual(DOMAINS[0]!.phong.length + 2);
  });
});

describe("Dữ liệu vẽ tách khỏi logic (cho renderer 2D và 3D)", () => {
  it("objView khai báo loại, trạng thái, hướng, độ cao, nguyên tố cần dùng", () => {
    const p = PZ["hoi-nong-be-da"]!;
    const st = makeState(p, OBJ, 400, 400, 40, false, () => 2);
    const o = st.objs[0]!;
    let v = objView(o, 40);
    expect(v).toMatchObject({ loai: "bonHoi", trangThai: 0, soTrangThai: 3, xong: false, tang: 2, huong: "s" });
    expect(v.canNguyenTo).toEqual(["water"]);
    expect(v.o).toEqual({ x: Math.floor(o.x / 40), y: Math.floor(o.y / 40) });
    hitObj(o, "water");
    v = objView(o, 40);
    expect([v.trangThai, v.canNguyenTo]).toEqual([1, ["fire"]]);
    hitObj(o, "fire");
    v = objView(o, 40);
    expect([v.trangThai, v.xong, v.nhan]).toEqual([2, true, OBJ.bonHoi!.trangThai[1]]);
    expect(JSON.parse(JSON.stringify(v))).toEqual(v);
  });
});
