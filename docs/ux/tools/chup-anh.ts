/*
 * Chụp ảnh và đo UX cho docs/ux/danh-gia-hien-trang.md (S07).
 * Cách chạy: `pnpm dev` ở một cửa sổ, rồi `pnpm exec tsx docs/ux/tools/chup-anh.ts`.
 * Tham số môi trường: BASE (mặc định http://127.0.0.1:5173/), CHI (lọc thiết bị, ví dụ CHI=dt,pc).
 * Kết quả: ảnh JPEG trong docs/ux/anh/, số đo trong docs/ux/tools/so-lieu.json.
 * Script dùng ?e2e và import trực tiếp module qua máy chủ Vite để đưa game tới đúng trạng thái.
 * Chỉ truyền chuỗi biểu thức cho page.evaluate (tsx làm hỏng hàm truyền vào, lỗi __name).
 */
import { chromium, type Browser, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "anh");
const DATA = join(HERE, "so-lieu.json");
const BASE = process.env.BASE ?? "http://127.0.0.1:5173/";
const ONLY = process.env.CHI?.split(",");

interface Vp {
  key: string;
  name: string;
  width: number;
  height: number;
  touch: boolean;
  dpr: number;
  full: boolean;
}
const VPS: Vp[] = [
  { key: "dt", name: "Điện thoại ngang 844×390", width: 844, height: 390, touch: true, dpr: 3, full: true },
  { key: "pc", name: "Máy tính 1440×900", width: 1440, height: 900, touch: false, dpr: 1, full: true },
  { key: "mtb", name: "Máy tính bảng ngang 1180×820", width: 1180, height: 820, touch: true, dpr: 2, full: true },
  { key: "doc", name: "Điện thoại dọc 390×844", width: 390, height: 844, touch: true, dpr: 3, full: false },
];

const MODULES: [string, string][] = [
  ["session", "/src/modes/session.ts"],
  ["tower", "/src/modes/tower.ts"],
  ["boss", "/src/modes/boss.ts"],
  ["actions", "/src/combat/actions.ts"],
  ["party", "/src/entities/party.ts"],
  ["modal", "/src/ui/modal.ts"],
  ["screens", "/src/ui/screens.ts"],
  ["toast", "/src/ui/toast.ts"],
  ["world", "/src/modes/world.ts"],
];

/* Đo trong trang: vùng chạm nhỏ, tương phản, chữ tràn, chồng lấn HUD. Viết bằng chuỗi để chạy trong trình duyệt. */
const AUDIT = `(() => {
  const vw = innerWidth, vh = innerHeight;
  const vis = (el) => { if (el.closest('[hidden]')) return false; const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; const cs = getComputedStyle(el); return cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05; };
  const label = (el) => (el.id ? '#' + el.id : el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '')) + ' "' + (el.innerText || el.value || el.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim().slice(0, 40) + '"';
  const topScreen = [...document.querySelectorAll('.screen')].find((s) => !s.hidden);
  const modalOpen = !document.getElementById('modal').hidden;
  const roots = [];
  if (modalOpen) roots.push(document.getElementById('modal'));
  else if (!document.getElementById('wishFx').hidden) roots.push(document.getElementById('wishFx'));
  else { if (topScreen) roots.push(topScreen); if (!document.getElementById('hud').hidden) roots.push(document.getElementById('hud')); }
  const inRoots = (el) => roots.some((r) => r.contains(el));
  const targets = [...document.querySelectorAll('button, a, input, select, label.check, .ccard, .tslot, .floor, .pm')].filter((el) => inRoots(el) && vis(el));
  const small = [];
  for (const el of targets) { const r = el.getBoundingClientRect(); if (r.width < 44 || r.height < 44) small.push({ el: label(el), w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) }); }
  const parse = (s) => { const m = s.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const mix = (top, bot) => ({ r: top.r * top.a + bot.r * (1 - top.a), g: top.g * top.a + bot.g * (1 - top.a), b: top.b * top.a + bot.b * (1 - top.a), a: 1 });
  const bgOf = (el) => { const stack = []; let n = el, grad = false, canvas = false; while (n && n.nodeType === 1) { const cs = getComputedStyle(n); if (cs.backgroundImage && cs.backgroundImage !== 'none') { const g = parse(cs.backgroundImage); if (g) { stack.push(g); grad = true; } } const c = parse(cs.backgroundColor); if (c && c.a > 0) stack.push(c); if (c && c.a >= 1) break; if (n.id === 'hud' || n.classList.contains('clear')) canvas = true; n = n.parentElement; } let base = { r: 15, g: 20, b: 48, a: 1 }; for (let i = stack.length - 1; i >= 0; i--) base = mix(stack[i], base); return { c: base, grad, canvas: canvas && !stack.some((s) => s.a >= 0.7) }; };
  const low = [];
  const seen = new Set();
  const all = [...document.querySelectorAll('body *')].filter((el) => inRoots(el) && [...el.childNodes].some((t) => t.nodeType === 3 && t.textContent.trim()) && vis(el));
  for (const el of all) { const cs = getComputedStyle(el); let fg = parse(cs.color); if (!fg) continue; const { c: full, grad, canvas } = bgOf(el); let op = 1, dim = null, n = el; while (n && n.nodeType === 1) { const o = +getComputedStyle(n).opacity; if (o < 1) { op *= o; dim = n; } n = n.parentElement; } let bg = full; fg = mix(fg, full); if (dim) { const back = dim.parentElement ? bgOf(dim.parentElement).c : { r: 15, g: 20, b: 48, a: 1 }; bg = mix({ ...full, a: op }, back); fg = mix({ ...fg, a: op }, back); } const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); const px = parseFloat(cs.fontSize), w = +cs.fontWeight; const large = px >= 24 || (px >= 18.66 && w >= 700); const need = large ? 3 : 4.5; const key = label(el); if (ratio < need && !seen.has(key)) { seen.add(key); low.push({ el: key, ratio: +ratio.toFixed(2), need, px, canvas, grad }); } }
  const overflow = [];
  for (const el of all.concat(targets)) { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); if (el.scrollWidth > el.clientWidth + 1 && (cs.overflow.includes('hidden') || cs.textOverflow === 'ellipsis') && el.clientWidth > 0) overflow.push({ el: label(el), kind: 'cắt chữ', sw: el.scrollWidth, cw: el.clientWidth }); if (r.right > vw + 1 || r.left < -1) overflow.push({ el: label(el), kind: 'ra ngoài màn hình', l: Math.round(r.left), r: Math.round(r.right) }); }
  const hudSel = ['#mini', '#modeInfo', '#pauseBtn', '#bossBar', '.pm', '.hud-bl', '#bAtk', '#bSkill', '#bBurst', '#bDash', '#bInteract', '#keysHint'];
  const hudEls = document.getElementById('hud').hidden || modalOpen ? [] : hudSel.flatMap((s) => [...document.querySelectorAll(s)]).filter(vis);
  const overlap = [];
  for (let i = 0; i < hudEls.length; i++) for (let j = i + 1; j < hudEls.length; j++) { const a = hudEls[i].getBoundingClientRect(), b = hudEls[j].getBoundingClientRect(); const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left), iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ix > 2 && iy > 2 && !hudEls[i].contains(hudEls[j]) && !hudEls[j].contains(hudEls[i])) overlap.push({ a: label(hudEls[i]), b: label(hudEls[j]), w: Math.round(ix), h: Math.round(iy) }); }
  const rects = {};
  for (const s of hudSel) { const e = [...document.querySelectorAll(s)].filter(vis); if (e.length) rects[s] = e.map((x) => { const r = x.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; }); }
  const jz = document.getElementById('joyZone'); if (vis(jz)) { const r = jz.getBoundingClientRect(); rects['#joyZone'] = [[Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]]; }
  const scr = topScreen ? { scrollH: topScreen.scrollHeight, clientH: topScreen.clientHeight } : null;
  return { vw, vh, screen: topScreen ? topScreen.id : null, scr, small, low, overflow, overlap, rects };
})()`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function run(browser: Browser, vp: Vp, data: Record<string, unknown>) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dpr,
    isMobile: vp.touch,
    hasTouch: vp.touch,
    locale: "vi-VN",
  });
  const page: Page = await ctx.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const ev = <T = unknown>(s: string) => page.evaluate(s) as Promise<T>;
  const res: Record<string, unknown> = {};
  data[vp.key] = { name: vp.name, shots: res, errors };
  const shot = async (name: string, note = "") => {
    await page.screenshot({ path: join(OUT, `${vp.key}-${name}.jpg`), type: "jpeg", quality: 70, scale: "css" });
    res[name] = { note, ...(await ev<object>(AUDIT)) };
    console.log(`  ${vp.key}-${name}`);
  };
  const scrollScreen = (id: string, y: number | "end") =>
    ev(`(()=>{const s=document.getElementById('${id}');s.scrollTop=${y === "end" ? "s.scrollHeight" : y};})()`);

  await page.goto(BASE + "?e2e");
  await page.waitForSelector("#sHub:not([hidden])");
  await ev(`document.fonts.ready.then(()=>1)`);
  await ev(
    `(async()=>{const M={};for(const [k,u] of ${JSON.stringify(MODULES)}) M[k]=await import(u); window.__M=M; return 1})()`,
  );
  data[vp.key] = {
    ...(data[vp.key] as object),
    fonts: await ev(
      `({body: document.fonts.check('16px "Be Vietnam Pro"', 'Ước nguyện ặẫỡự'), display: document.fonts.check('700 30px "Cormorant Garamond"', 'Tinh Tú Ước Nguyện ặẫỡự')})`,
    ),
  };
  await sleep(400);
  await shot("sanh", "Lần đầu mở game (hồ sơ mới)");
  if (!vp.full) {
    await page.locator('[data-go="world"]').click();
    await sleep(2600);
    await shot("dao-lac", "Cầm dọc khi đang chơi");
    await ctx.close();
    return;
  }
  await scrollScreen("sHub", "end");
  await sleep(200);
  await shot("sanh-cuon", "Sảnh cuộn xuống cuối");
  await scrollScreen("sHub", 0);

  // Khám phá Đảo Lạc
  await page.locator('[data-go="world"]').click();
  await sleep(700);
  await shot("dao-lac-vao", "Vừa vào Đảo Lạc");
  await sleep(2200);
  await shot("dao-lac", "Đảo Lạc sau vài giây, chưa làm gì");
  if (vp.touch) {
    const cdp = await ctx.newCDPSession(page);
    const jx = Math.round(vp.width * 0.16),
      jy = Math.round(vp.height * 0.72);
    const box = await page.locator("#bAtk").boundingBox();
    const ax = Math.round(box!.x + box!.width / 2),
      ay = Math.round(box!.y + box!.height / 2);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: jx, y: jy, id: 1 }] });
    for (let i = 1; i <= 6; i++) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: jx + i * 8, y: jy - i * 4, id: 1 }],
      });
      await sleep(30);
    }
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [
        { x: jx + 48, y: jy - 24, id: 1 },
        { x: ax, y: ay, id: 2 },
      ],
    });
    await sleep(500);
    await shot("cham-hai-tay", "Giữ cần điều khiển và nút Đánh cùng lúc");
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await sleep(200);
  }
  // Bia Đá và rương
  await ev(`(()=>{const G=__tinhtu.S.G,s=G.map.statues[0];G.p.x=(s.x+0.5)*40;G.p.y=(s.y+0.9)*40+26;})()`);
  await sleep(500);
  await shot("bia-da", "Đứng cạnh Bia Đá: nút tương tác");
  await ev(
    `(async()=>{const G=__tinhtu.S.G,P=__tinhtu.Server.P;for(let i=0;i<G.map.chests.length;i++){if(P.chests.includes(i))continue;const c=G.map.chests[i];for(const [dx,dy] of [[0,24],[0,-24],[24,0],[-24,0]]){G.p.x=(c.x+0.5)*40+dx;G.p.y=(c.y+0.6)*40+dy;await new Promise(r=>setTimeout(r,120));if(G.interact&&G.interact.kind==='chest')return i;}}return -1;})()`,
  );
  await sleep(200);
  await shot("ruong", "Đứng cạnh rương");
  await ev(`__M.world.doInteract()`);
  await sleep(350);
  await shot("ruong-mo", "Vừa mở rương");
  // Chiến đấu
  await ev(
    `(()=>{const G=__tinhtu.S.G;const e=G.enemies.filter(x=>!x.dead).sort((a,b)=>Math.hypot(a.x-G.p.x,a.y-G.p.y)-Math.hypot(b.x-G.p.x,b.y-G.p.y))[0];G.p.x=e.x;G.p.y=e.y+e.r+22;})()`,
  );
  await sleep(300);
  await ev(`__tinhtu.S.holdAtk=true`);
  await sleep(900);
  await shot("danh", "Đang giữ nút Đánh cạnh trại quái");
  await ev(`__M.actions.castSkill()`);
  await sleep(450);
  await ev(`__tinhtu.S.holdAtk=false`);
  await shot("ky-nang", "Vừa dùng kỹ năng: vòng hồi chiêu");
  await ev(`__M.party.switchTo(1)`);
  await sleep(300);
  await ev(`__tinhtu.S.holdAtk=true`);
  await sleep(1300);
  await ev(`__tinhtu.S.holdAtk=false`);
  await shot("doi-nguoi", "Đổi sang người thứ 2 rồi đánh tiếp (phản ứng)");
  await ev(`(()=>{const m=__tinhtu.S.G.party[__tinhtu.S.G.act];m.energy=m.c.burst.cost;})()`);
  await sleep(200);
  await shot("no-day", "Nộ đầy: nút Nộ phát sáng");
  await ev(`__M.actions.castBurst()`);
  await sleep(500);
  await shot("no-canh-cat", "Cảnh cắt khi dùng nộ");
  await sleep(2500);
  await ev(
    `(()=>{const G=__tinhtu.S.G;G.party.forEach((m,i)=>{if(i!==G.act){m.alive=false;m.hp=0}});G.party[G.act].hp=Math.max(1,G.party[G.act].maxHp*0.12);})()`,
  );
  await sleep(300);
  await shot("mau-thap", "Máu thấp, 3 người đã gục");
  await ev(`__M.session.partyWipe()`);
  await sleep(500);
  await shot("ca-doi-guc", "Cả đội gục ở Đảo Lạc");
  await sleep(2600);
  // Tạm dừng
  await ev(`__M.modal.pause()`);
  await sleep(250);
  await shot("tam-dung", "Bảng tạm dừng ở Đảo Lạc");
  await page.locator('#modal [data-act="menu"]').click();
  await sleep(300);
  await shot("ve-sanh-toast", "Về sảnh: thông báo mang về");

  // Nhân vật & Đội hình
  await page.locator('[data-go="chars"]').click();
  await sleep(400);
  await shot("nhan-vat", "Màn Nhân vật & Đội hình");
  await scrollScreen("sChars", "end");
  await sleep(200);
  await shot("nhan-vat-cuon", "Cuộn xuống phần chi tiết");
  await scrollScreen("sChars", 0);
  await page.locator(".ccard.lock").first().click();
  await sleep(300);
  await shot("nhan-vat-chua-co", "Chọn nhân vật chưa sở hữu");
  await page.locator(".ccard:not(.lock)").first().click();
  await sleep(200);
  await page.locator("#lv10").click();
  await sleep(300);
  await scrollScreen("sChars", 0);
  await shot("nang-cap", "Sau khi bấm Lên 10 cấp");
  await page.locator(".tslot.f").first().click();
  await sleep(300);
  await shot("bo-khoi-doi", "Chạm một ô trong đội: bỏ ngay, không hỏi lại");
  await page.locator("#sChars .back").click();

  // Ước nguyện
  await page.locator('[data-go="wish"]').click();
  await sleep(400);
  await shot("uoc-nguyen", "Màn Ước nguyện");
  await scrollScreen("sWish", "end");
  await sleep(200);
  await shot("uoc-nguyen-cuon", "Cuộn xuống tỉ lệ và lịch sử");
  await scrollScreen("sWish", 0);
  await page.locator("#pull10").click();
  await sleep(900);
  await shot("uoc-sao-bang", "Hoạt ảnh sao băng");
  await page.mouse.click(vp.width / 2, vp.height / 2);
  await sleep(900);
  await shot("uoc-the", "Thẻ nhân vật đầu tiên");
  await page.locator("#wishSkip").click();
  await sleep(700);
  await shot("uoc-tong-ket", "Tổng kết 10 lần ước");
  await page.locator("#wishFx").click({ position: { x: 20, y: vp.height - 20 } });
  await sleep(400);
  await shot("uoc-het-da", "Hết Đá Sao: nút ước bị khóa");

  // Tháp
  await page.locator("#sWish .back").click();
  await page.locator('[data-go="tower"]').click();
  await sleep(300);
  await shot("thap", "Màn chọn tầng Tháp Tinh Tú");
  await page.locator("#floors button").first().click();
  await sleep(1800);
  await shot("thap-choi", "Đang đánh Tháp tầng 1");
  await ev(`__M.session.endRun(true,'',3)`);
  await sleep(700);
  await shot("thap-thang", "Thắng tầng Tháp");
  await page.locator('#modal [data-act="retry"]').click();
  await sleep(800);
  await ev(`__M.session.endRun(false,'Hết giờ')`);
  await sleep(1300);
  await shot("thap-thua", "Thua tầng Tháp");
  await page.locator('#modal [data-act="menu"]').click();

  // Boss
  await page.locator('[data-go="boss"]').click();
  await sleep(300);
  await shot("boss", "Màn chọn cấp độ Hắc Giao");
  await page.locator("#bossLv button").first().click();
  await sleep(1800);
  await shot("boss-choi", "Đang đánh Hắc Giao giai đoạn 1");
  await ev(`(()=>{const b=__tinhtu.S.G.boss;b.hp=b.maxHp*0.45;})()`);
  await sleep(2200);
  await shot("boss-gd2", "Hắc Giao giai đoạn 2");
  await ev(`__M.session.endRun(true)`);
  await sleep(700);
  await shot("boss-thang", "Thắng Hắc Giao");
  await page.locator('#modal [data-act="retry"]').click();
  await sleep(800);
  await ev(`__M.session.endRun(false,'Cả đội đã gục ngã')`);
  await sleep(1300);
  await shot("boss-thua", "Thua Hắc Giao");
  await page.locator('#modal [data-act="menu"]').click();

  // Ủy thác
  await page.locator('[data-go="daily"]').click();
  await sleep(300);
  await shot("uy-thac", "Màn Ủy thác hằng ngày");
  await ev(
    `(()=>{const t=__tinhtu.Server.P.daily.tasks;t[0].prog=t[0].goal;t[1].prog=t[1].goal;__tinhtu.Server.save();})()`,
  );
  await page.locator("#sDaily .back").click();
  await sleep(300);
  await shot("sanh-huy-hieu", "Sảnh khi có ủy thác chờ nhận");

  // Admin, Hướng dẫn
  await page.locator('[data-go="server"]').click();
  await sleep(300);
  await shot("admin", "Trang Server (Admin)");
  await scrollScreen("sServer", "end");
  await sleep(200);
  await shot("admin-cuon", "Admin cuộn xuống cuối");
  await page.locator("#sServer .back").click();
  await page.locator('[data-go="help"]').click();
  await sleep(300);
  await shot("huong-dan", "Màn Hướng dẫn");
  await scrollScreen("sHelp", "end");
  await sleep(200);
  await shot("huong-dan-cuon", "Hướng dẫn cuộn xuống cuối");
  await ctx.close();
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const data: Record<string, unknown> = existsSync(DATA) && ONLY ? JSON.parse(readFileSync(DATA, "utf8")) : {};
  const browser = await chromium.launch();
  for (const vp of VPS) {
    if (ONLY && !ONLY.includes(vp.key)) continue;
    console.log(vp.name);
    await run(browser, vp, data);
  }
  await browser.close();
  writeFileSync(DATA, JSON.stringify(data, null, 1));
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
