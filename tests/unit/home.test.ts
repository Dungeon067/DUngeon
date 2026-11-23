import { describe, expect, it } from "vitest";
import { HOME, buy, comfort, fits, freshHome, move, normHome, place, remove, setsDone } from "../../src/home/home-core";

/* S21 Nhà Sao: đặt đồ, va chạm, Ấm Cúng, bộ sưu tập. */
describe("Nhà Sao", () => {
  it("mua trừ Xu, thiếu Xu thì báo lỗi", () => {
    const H = freshHome();
    expect(buy(H, "cay-truc", 5000)).toBe(2000);
    expect(() => buy(H, "den-dem-sao", 100)).toThrow();
  });
  it("không đặt chồng, không ra ngoài phòng; thảm nằm dưới đồ được", () => {
    const H = freshHome();
    place(H, { id: "ban-go", x: 0, y: 0, rot: 0 });
    expect(fits(H, { id: "ghe-dau", x: 1, y: 0, rot: 0 })).toBe(false);
    expect(fits(H, { id: "ghe-dau", x: HOME.phong.rong, y: 0, rot: 0 })).toBe(false);
    buy(H, "tham-coi", 1e9);
    expect(fits(H, { id: "tham-coi", x: 0, y: 0, rot: 0 })).toBe(true);
  });
  it("dời, xoay, cất", () => {
    const H = freshHome();
    const p = place(H, { id: "ban-go", x: 2, y: 2, rot: 0 });
    move(H, p.uid, 3, 3, 1);
    expect(H.dat[0]).toMatchObject({ x: 3, y: 3, rot: 1 });
    remove(H, p.uid);
    expect(H.dat).toHaveLength(0);
  });
  it("Ấm Cúng: món lặp tính nửa điểm, bộ đủ được cộng thêm", () => {
    const H = freshHome();
    buy(H, "den-long-do", 1e9);
    place(H, { id: "den-long-do", x: 0, y: 0, rot: 0 });
    place(H, { id: "den-long-do", x: 1, y: 0, rot: 0 });
    expect(comfort(H)).toBe(4 + 2);
    for (const id of ["den-long-sao", "trong-nho", "den-dem-sao"]) buy(H, id, 1e9);
    place(H, { id: "den-long-sao", x: 2, y: 0, rot: 0 });
    place(H, { id: "trong-nho", x: 3, y: 0, rot: 0 });
    place(H, { id: "den-dem-sao", x: 4, y: 0, rot: 0 });
    expect(setsDone(H).map((b) => b.id)).toContain("dem-hoi");
  });
  it("save hỏng vẫn đọc được", () => {
    expect(normHome({ kho: { "khong-co": 3 }, dat: [{ id: "x" }] })).toMatchObject({ kho: {}, dat: [] });
  });
});
