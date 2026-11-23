import { describe, expect, it } from "vitest";
import { anchorAt, pickVariant, pickVideoFile, wantHeight } from "../../src/ui/wish/video";

describe("video ước nguyện (S20)", () => {
  it("chọn bản theo độ hiếm cao nhất, 5★ luân phiên 5a/5b, ước 10 lần dùng 10x4/10x5", () => {
    expect(pickVariant(3, false, 0)).toBe("3");
    expect(pickVariant(4, false, 0)).toBe("4");
    expect(pickVariant(5, false, 0)).toBe("5a");
    expect(pickVariant(5, false, 1)).toBe("5b");
    expect(pickVariant(4, true, 0)).toBe("10x4");
    expect(pickVariant(3, true, 0)).toBe("10x4");
    expect(pickVariant(5, true, 3)).toBe("10x5");
  });
  it("điện thoại màn ngang dùng 720p, máy tính bảng và máy tính dùng 1080p", () => {
    expect(wantHeight({ w: 844, h: 390, dpr: 3 })).toBe("720");
    expect(wantHeight({ w: 932, h: 430, dpr: 3 })).toBe("720");
    expect(wantHeight({ w: 1180, h: 820, dpr: 2 })).toBe("1080");
    expect(wantHeight({ w: 1920, h: 1080, dpr: 1 })).toBe("1080");
    expect(wantHeight({ w: 1920, h: 1080, dpr: 1, saveData: true })).toBe("720");
  });
  it("lấy file phát được, thiếu 1080p thì xuống 720p", () => {
    const v = { "720": ["video/x-720.webm", "video/x-720.mp4"] };
    expect(pickVideoFile(v, "1080", () => true)).toBe("video/x-720.webm");
    expect(pickVideoFile(v, "720", (e) => e === "mp4")).toBe("video/x-720.mp4");
    expect(pickVideoFile(v, "720", () => false)).toBeNull();
    const both = { "1080": ["video/x-1080.webm"], ...v };
    expect(pickVideoFile(both, "1080", () => true)).toBe("video/x-1080.webm");
    expect(pickVideoFile(both, "1080", (e) => e === "mp4")).toBe("video/x-720.mp4");
  });
  it("nội suy neo chòm sao theo thời gian", () => {
    const a: [number, number, number][] = [
      [2.5, 0.4, 0.5],
      [3.5, 0.6, 0.7],
    ];
    expect(anchorAt(a, 2)).toEqual([0.4, 0.5]);
    const [x, y] = anchorAt(a, 3);
    expect(x).toBeCloseTo(0.5);
    expect(y).toBeCloseTo(0.6);
    expect(anchorAt(a, 9)).toEqual([0.6, 0.7]);
  });
});
