import { beforeEach, describe, expect, it } from "vitest";
import { CONTROLS } from "../../src/data/content";
import { ACTIONS, HUD_BUTTONS } from "../../src/data/schema";
import {
  SETTINGS_KEY,
  actionForKey,
  bindKey,
  defaultSettings,
  keyLabel,
  reloadSettings,
  resetKeys,
  resetLayout,
  sanitize,
  saveSettings,
  settings,
  unboundActions,
} from "../../src/core/settings";
import { joyVector } from "../../src/core/input";
import { PAD_LABEL, buttonActions, padBrand, padLabelFor, spatialPick, stick } from "../../src/core/gamepad";
import { PARTY_MIN_SLOT, centerZone, itemRect, layoutProblems, partyFit, toItem } from "../../src/ui/hud/geometry";

beforeEach(() => {
  localStorage.clear();
  reloadSettings();
});

describe("cài đặt (tinhtu-settings-v1)", () => {
  it("mặc định đọc từ content/controls.yaml", () => {
    const d = defaultSettings();
    expect(d.keys.jump).toEqual(["Space"]);
    expect(d.layout).toEqual(CONTROLS.layout);
    expect(d.joystick.mode).toBe(CONTROLS.joystick.mode);
    expect(d.joystick.deadzone).toBe(CONTROLS.joystick.deadzone);
  });
  it("lưu, nạp lại sau khi tải trang", () => {
    settings.master = 0.3;
    settings.colorMode = "deutan";
    settings.layout.atk.scale = 1.3;
    saveSettings();
    expect(JSON.parse(localStorage.getItem(SETTINGS_KEY)!).master).toBe(0.3);
    settings.master = 1;
    reloadSettings();
    expect(settings.master).toBe(0.3);
    expect(settings.colorMode).toBe("deutan");
    expect(settings.layout.atk.scale).toBe(1.3);
  });
  it("dữ liệu hỏng hoặc ngoài khoảng thì về giá trị an toàn", () => {
    const s = sanitize({
      master: 9,
      quality: "ultra",
      colorMode: "x",
      joystick: { mode: "bay", deadzone: -1, sensitivity: 50 },
      fontScale: 3,
      keys: { jump: [42, "KeyH"], skill: ["KeyR"] },
      layout: { atk: { anchor: "zz", dx: "a", scale: 99, opacity: 0 } },
    });
    expect(s.master).toBe(1);
    expect(s.quality).toBe(defaultSettings().quality);
    expect(s.colorMode).toBe("none");
    expect(s.joystick.mode).toBe(CONTROLS.joystick.mode);
    expect(s.joystick.deadzone).toBeGreaterThanOrEqual(0);
    expect(s.joystick.sensitivity).toBeLessThanOrEqual(3);
    expect(s.fontScale).toBeLessThanOrEqual(1.4);
    expect(s.keys.jump).toEqual(["Space"]);
    expect(s.keys.skill).toEqual(["KeyR"]);
    expect(s.layout.atk.scale).toBeLessThanOrEqual(1.6);
    expect(s.layout.atk.opacity).toBeGreaterThanOrEqual(0.2);
    expect(sanitize("rác")).toEqual(defaultSettings());
  });
  it("đọc cài đặt rung màn hình cũ của S14", () => {
    localStorage.setItem("tinhtu.feel.v1", JSON.stringify({ shake: false }));
    reloadSettings();
    expect(settings.shake).toBe(false);
  });
  it("về mặc định bố cục và phím", () => {
    settings.layout.atk.dx = 5;
    bindKey("jump", 0, "KeyH");
    resetLayout();
    resetKeys();
    expect(settings.layout).toEqual(CONTROLS.layout);
    expect(settings.keys).toEqual(CONTROLS.keys);
  });
});

describe("đổi phím", () => {
  it("gán phím mới cho thao tác", () => {
    bindKey("jump", 0, "KeyH");
    expect(actionForKey("KeyH")).toBe("jump");
    expect(actionForKey("Space")).toBe(null);
  });
  it("phím trùng thì hoán đổi, không có hai thao tác cùng một phím", () => {
    const oldSkill = settings.keys.skill[0]!;
    const swapped = bindKey("jump", 0, oldSkill);
    expect(swapped).toBe("skill");
    expect(actionForKey(oldSkill)).toBe("jump");
    expect(settings.keys.skill).toContain("Space");
    const all = ACTIONS.flatMap((a) => settings.keys[a]);
    expect(new Set(all).size).toBe(all.length);
  });
  it("lấy phím của thao tác khi ô mình trống thì thao tác kia mất phím và được báo", () => {
    const k = { ...defaultSettings().keys, dash: ["ShiftLeft"], jump: ["Space"] };
    bindKey("jump", 1, "ShiftLeft", k);
    expect(k.jump).toEqual(["Space", "ShiftLeft"]);
    expect(unboundActions(k)).toContain("dash");
  });
  it("nhãn phím dễ đọc", () => {
    expect(keyLabel("Space")).toBe("Space");
    expect(keyLabel("KeyE")).toBe("E");
    expect(keyLabel("Digit3")).toBe("3");
    expect(keyLabel("ShiftLeft")).toMatch(/Shift/);
  });
});

describe("cần điều khiển", () => {
  it("trong vùng chết thì đứng yên", () => {
    expect(joyVector(5, 0, 54, 0.15, 1)).toEqual([0, 0]);
    expect(joyVector(0, 0, 54, 0.15, 1)).toEqual([0, 0]);
  });
  it("ngoài vùng chết tăng dần tới 1, giữ hướng, độ nhạy nhân lên", () => {
    const [x1] = joyVector(27, 0, 54, 0.15, 1);
    expect(x1).toBeGreaterThan(0.3);
    expect(x1).toBeLessThan(0.5);
    const [x2, y2] = joyVector(200, 200, 54, 0.15, 1);
    expect(Math.hypot(x2, y2)).toBeCloseTo(1);
    expect(x2).toBeCloseTo(y2);
    const [x3] = joyVector(27, 0, 54, 0.15, 1.5);
    expect(x3).toBeGreaterThan(x1);
  });
});

describe("tay cầm", () => {
  it("bảng nút theo yêu cầu: nút dưới Nhảy, trái Đánh, phải Lướt, R1 Kỹ năng, R2 Nộ, trên Tương tác, Start Tạm dừng, D-pad đổi người", () => {
    const m = buttonActions();
    expect(m.get(0)).toBe("jump");
    expect(m.get(2)).toBe("attack");
    expect(m.get(1)).toBe("dash");
    expect(m.get(5)).toBe("skill");
    expect(m.get(7)).toBe("burst");
    expect(m.get(3)).toBe("interact");
    expect(m.get(9)).toBe("pause");
    expect([12, 13, 14, 15].map((b) => m.get(b)).sort()).toEqual(["p1", "p2", "p3", "p4"]);
    expect(new Set(Object.values(CONTROLS.gamepad.buttons)).size).toBe(Object.keys(CONTROLS.gamepad.buttons).length);
  });
  it("nhãn theo hãng", () => {
    expect(padBrand("Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e)")).toBe("xbox");
    expect(padBrand("DualSense Wireless Controller (Vendor: 054c Product: 0ce6)")).toBe("ps");
    expect(padLabelFor("jump", "xbox")).toBe("A");
    expect(padLabelFor("jump", "ps")).toBe("✕");
    expect(padLabelFor("skill", "ps")).toBe("R1");
    expect(PAD_LABEL.xbox.length).toBe(PAD_LABEL.ps.length);
  });
  it("vùng chết cần analog", () => {
    expect(stick(0.1, 0.1)).toEqual([0, 0]);
    const [x, y] = stick(1, 0);
    expect(x).toBeCloseTo(1);
    expect(y).toBe(0);
  });
  it("điều hướng menu theo không gian", () => {
    const r = (left: number, top: number) => ({ left, top, width: 40, height: 40 });
    const from = r(100, 100);
    const rects = [r(200, 100), r(100, 220), r(0, 100), r(100, 0), r(200, 300)];
    expect(spatialPick(from, rects, "right")).toBe(0);
    expect(spatialPick(from, rects, "down")).toBe(1);
    expect(spatialPick(from, rects, "left")).toBe(2);
    expect(spatialPick(from, rects, "up")).toBe(3);
    expect(spatialPick(from, [r(0, 0)], "right")).toBe(-1);
  });
});

describe("bố cục nút", () => {
  const safe = { l: 10, r: 10, t: 8, b: 8 };
  const rects = (vw: number, vh: number, layout = CONTROLS.layout) =>
    Object.fromEntries(HUD_BUTTONS.map((b) => [b, itemRect(b, layout[b], vw, vh, safe, CONTROLS.joystick.radius)]));
  for (const [vw, vh] of [
    [844, 390],
    [932, 430],
    [1180, 820],
    [1440, 900],
  ] as const)
    it(`mặc định hợp lệ ở ${vw}×${vh}: trong màn, ngoài vùng giữa, không chồng nhau, ≥44 px`, () => {
      const R = rects(vw, vh);
      expect(layoutProblems(R, vw, vh, safe, CONTROLS.centerSafe)).toEqual([]);
      for (const r of Object.values(R)) expect(Math.min(r.w, r.h)).toBeGreaterThanOrEqual(44);
    });
  it("bắt lỗi nút vào vùng giữa hoặc chồng nhau", () => {
    const vw = 844,
      vh = 390;
    const cz = centerZone(vw, vh, CONTROLS.centerSafe);
    const L = structuredClone(CONTROLS.layout);
    L.skill = toItem(L.skill, cz.x + cz.w / 2, cz.y + cz.h / 2, vw, vh, safe);
    expect(layoutProblems(rects(vw, vh, L), vw, vh, safe, CONTROLS.centerSafe).join()).toMatch(/skill: vào vùng giữa/);
    const L2 = structuredClone(CONTROLS.layout);
    L2.jump = { ...L2.atk };
    expect(layoutProblems(rects(vw, vh, L2), vw, vh, safe, CONTROLS.centerSafe).join()).toMatch(/chồng/);
  });
  it("đổi tâm px sang toạ độ bố cục rồi ngược lại giữ nguyên vị trí", () => {
    const it0 = CONTROLS.layout.skill;
    const r = itemRect("skill", it0, 932, 430, safe, 54);
    const back = toItem(it0, r.x + r.w / 2, r.y + r.h / 2, 932, 430, safe);
    expect(back.dx).toBeCloseTo(it0.dx, 1);
    expect(back.dy).toBeCloseTo(it0.dy, 1);
  });
});

describe("danh sách đội", () => {
  const safe = { t: 0, r: 62, b: 21, l: 62 };
  const dash = { x: 844 - 62 - 50, y: 390 - 21 - 150, w: 50, h: 50 };
  it("co ô để nằm trên nút Lướt, không chồng", () => {
    const f = partyFit(3, 132, 48, 4, 844, 390, safe, 60, [dash]);
    expect(f.fits).toBe(true);
    expect(f.y + f.h).toBeLessThanOrEqual(dash.y);
    expect(f.slotH).toBeGreaterThanOrEqual(PARTY_MIN_SLOT);
  });
  it("báo không vừa khi 4 ô cỡ tối thiểu vẫn chạm nút Lướt", () => {
    const f = partyFit(4, 132, 48, 4, 844, 390, safe, 60, [{ ...dash, y: 200 }]);
    expect(f.fits).toBe(false);
  });
});
