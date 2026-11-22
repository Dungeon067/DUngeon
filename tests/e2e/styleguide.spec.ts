import { expect, test, type Page } from "@playwright/test";

/* Trang /styleguide/ (S08): đo vùng chạm, tương phản chữ thật trên DOM và chụp ảnh cho docs/ux/anh/. */
/* Ảnh chỉ ghi vào docs/ux/anh/ khi chạy với CHUP_ANH=1, để test thường không làm bẩn repo. */
const SHOT_DIR = process.env.CHUP_ANH === "1" ? "docs/ux/anh" : "test-results/styleguide";
const SIZES = [
  { name: "dien-thoai", width: 844, height: 390 },
  { name: "may-tinh", width: 1440, height: 900 },
];

async function audit(page: Page) {
  return page.evaluate(() => {
    const parse = (s: string) => {
      const m = s.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = 1] = m[1]!
        .split(/[ ,/]+/)
        .filter(Boolean)
        .map(Number);
      return { r: r!, g: g!, b: b!, a };
    };
    const lum = ({ r, g, b }: { r: number; g: number; b: number }) => {
      const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    /* Nền đặc gần nhất; bỏ qua phần tử có ảnh nền hoặc gradient (đo riêng bằng tokens). */
    const bgOf = (el: Element | null): { r: number; g: number; b: number } | "skip" => {
      for (; el; el = el.parentElement) {
        const cs = getComputedStyle(el);
        if (cs.backgroundImage !== "none" && !el.classList.contains("tt-paper")) return "skip";
        const c = parse(cs.backgroundColor);
        if (c && c.a >= 0.99) return c;
        if (c && c.a > 0.05) return "skip";
      }
      return { r: 15, g: 27, b: 61 };
    };
    const small: string[] = [];
    const lowContrast: string[] = [];
    const visible = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
    };
    for (const el of document.querySelectorAll("button, a[href], input, [role=tab], [role=switch]")) {
      if (!visible(el)) continue;
      const r = el.getBoundingClientRect();
      /* Nút nhỏ trong khung tiền tệ có ::before nới vùng chạm thêm 4 px mỗi phía. */
      const pad = el.closest(".tt-currency") ? 8 : 0;
      if (r.width + pad < 44 - 0.5 || r.height + pad < 44 - 0.5)
        small.push(`${el.tagName}.${(el as HTMLElement).className} ${r.width.toFixed(0)}×${r.height.toFixed(0)}`);
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set<Element>();
    while (walker.nextNode()) {
      const t = walker.currentNode;
      const el = t.parentElement;
      if (!el || seen.has(el) || !t.textContent?.trim() || !visible(el)) continue;
      if (el.closest("[style*=grayscale], .sg-swatch, .sg-chip, .tt-btn:disabled, .tt-switch:disabled")) continue;
      seen.add(el);
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      const bg = bgOf(el);
      if (!fg || bg === "skip" || parseFloat(cs.opacity) < 1) continue;
      const a = lum(fg);
      const b = lum(bg);
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const large = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700);
      if (ratio < (large ? 3 : 4.5)) lowContrast.push(`"${t.textContent.trim().slice(0, 30)}" ${ratio.toFixed(2)}`);
    }
    return { small, lowContrast };
  });
}

for (const s of SIZES) {
  test(`styleguide ${s.name} ${s.width}×${s.height}`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "Kích thước khung được đặt trực tiếp trong test");
    await page.setViewportSize({ width: s.width, height: s.height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./styleguide/");
    await expect(page.getByRole("heading", { name: "Hệ thống thiết kế" })).toBeVisible();
    await expect(page.locator(".sg-icon")).toHaveCount(await page.locator(".sg-icon").count());
    expect(await page.locator(".sg-icon").count()).toBeGreaterThanOrEqual(40);
    await expect(page.locator("#tuong-phan p")).toContainText("Tất cả đạt");
    const r = await audit(page);
    expect(r.small, "vùng chạm dưới 44 px").toEqual([]);
    expect(r.lowContrast, "chữ dưới AA").toEqual([]);
    await page.screenshot({ path: `${SHOT_DIR}/styleguide-${s.name}.png`, fullPage: false });
    await page.locator("#hud").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SHOT_DIR}/styleguide-${s.name}-hud.png` });
    await page.locator("#admin").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${SHOT_DIR}/styleguide-${s.name}-admin.png` });
  });
}

test("styleguide: hộp thoại mở bằng nút, đóng bằng Esc và trả focus", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.goto("./styleguide/");
  const open = page.getByRole("button", { name: "Mở hộp thoại" });
  await open.click();
  await expect(page.getByRole("dialog", { name: "Hộp thoại mẫu" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Đã hiểu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Hộp thoại mẫu" })).toHaveCount(0);
  await expect(open).toBeFocused();
});

test("styleguide: khung điện thoại 844×390", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("./styleguide/");
  await page.getByRole("tab", { name: /Điện thoại/ }).click();
  const frame = page.locator("iframe");
  await expect(frame).toHaveAttribute("width", "844");
  await expect(frame.contentFrame().locator(".tt-act[data-kind=nhay]").first()).toBeAttached();
  await page.screenshot({ path: `${SHOT_DIR}/styleguide-khung-dien-thoai.png` });
});
