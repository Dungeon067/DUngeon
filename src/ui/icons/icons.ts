/* Bộ biểu tượng tự vẽ của Tinh Tú Ước Nguyện (S08). Lưới 24×24, nét 1,75, màu theo currentColor.
   Biểu tượng nguyên tố có hình viền riêng cho từng hệ để người mù màu vẫn phân biệt được. */

export type IconGroup = "nguyen-to" | "tien-te" | "menu" | "hanh-dong" | "trang-thai";
export interface IconDef {
  group: IconGroup;
  label: string;
  body: string;
}

const S = (d: string) => `<path d="${d}"/>`;
const F = (d: string) => `<path d="${d}" fill="currentColor" stroke="none"/>`;
const Ci = (cx: number, cy: number, r: number, fill = false) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}"${fill ? ' fill="currentColor" stroke="none"' : ""}/>`;
const n1 = (v: number) => +v.toFixed(2);

/** Ngôi sao n cánh: R bán kính ngoài, r bán kính trong. */
function star(cx: number, cy: number, R: number, r: number, n: number, rot = -Math.PI / 2): string {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = rot + (i * Math.PI) / n;
    const rad = i % 2 ? r : R;
    pts.push(`${n1(cx + Math.cos(a) * rad)} ${n1(cy + Math.sin(a) * rad)}`);
  }
  return `M${pts.join("L")}Z`;
}
function gear(cx: number, cy: number, R: number, r: number, n: number): string {
  const pts: string[] = [];
  const w = Math.PI / n / 2.2;
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n;
    for (const [ang, rad] of [
      [a - w, r],
      [a - w * 0.6, R],
      [a + w * 0.6, R],
      [a + w, r],
    ] as const)
      pts.push(`${n1(cx + Math.cos(ang) * rad)} ${n1(cy + Math.sin(ang) * rad)}`);
  }
  return `M${pts.join("L")}Z`;
}
const sparkle = (cx: number, cy: number, s: number) => F(star(cx, cy, s, s * 0.3, 4));

export const ICONS: Record<string, IconDef> = {
  /* ---------- Nguyên tố: viền khác nhau + hình bên trong theo biểu tượng ở docs/world/01 ---------- */
  hoa: {
    group: "nguyen-to",
    label: "Hỏa: tam giác, đuốc ba lưỡi",
    body:
      S("M12 2.6 22 20.4H2Z") +
      F("M12 8.2c1.7 2.1 2.6 3.5 2.6 5a2.6 2.6 0 0 1-5.2 0c0-1.5.9-2.9 2.6-5Z") +
      S("M8.4 16c-.7-1-.6-2.1.3-3.2M15.6 16c.7-1 .6-2.1-.3-3.2M10.6 18.4h2.8"),
  },
  thuy: {
    group: "nguyen-to",
    label: "Thủy: hình tròn, giọt nước có vòng sóng",
    body:
      Ci(12, 12, 9.8) +
      F("M12 5.6c2.2 2.8 3.3 4.5 3.3 6.2a3.3 3.3 0 0 1-6.6 0c0-1.7 1.1-3.4 3.3-6.2Z") +
      S("M6.6 17.6c1.2.9 2.4.9 3.6 0s2.4-.9 3.6 0 2.4.9 3.6 0"),
  },
  phong: {
    group: "nguyen-to",
    label: "Phong: hình thoi, ba nét gió",
    body:
      S("M12 1.8 22.2 12 12 22.2 1.8 12Z") +
      S("M6.6 9.6h7.6a1.9 1.9 0 1 0-1.9-1.9M5.6 12.4h10.6a1.9 1.9 0 1 1-1.9 1.9M7.6 15.4h3.6"),
  },
  loi: {
    group: "nguyen-to",
    label: "Lôi: hình vó ngựa, tia chớp",
    body:
      S("M4.6 3h4.2v9.2a3.2 3.2 0 0 0 6.4 0V3h4.2v9.2a7.4 7.4 0 0 1-14.8 0Z") +
      F("M13.3 3.4 10.1 9.4h2.2l-1.2 4.8 3.4-6.4h-2.2l1.3-4.4Z"),
  },
  tho: {
    group: "nguyen-to",
    label: "Thổ: hình vuông có mái vòm, cửa vòm",
    body: S("M3.4 21V10.2h2.4a6.2 6.2 0 0 1 12.4 0h2.4V21ZM3.4 14h17.2") + F("M9.9 21v-3.6a2.1 2.1 0 0 1 4.2 0V21Z"),
  },
  bang: {
    group: "nguyen-to",
    label: "Băng: lục giác, bông tuyết sáu cánh",
    body:
      S("M12 1.8 20.8 6.9v10.2L12 22.2l-8.8-5.1V6.9Z") +
      S("M12 6.2v11.6M7 9.1l10 5.8M7 14.9l10-5.8M10.5 7.1 12 8.4l1.5-1.3M10.5 16.9 12 15.6l1.5 1.3"),
  },
  moc: {
    group: "nguyen-to",
    label: "Mộc: hình lá dẹt, chồi non trên vòng gỗ",
    body:
      S("M1.8 12C6 5.2 18 5.2 22.2 12 18 18.8 6 18.8 1.8 12Z") +
      S("M12 14.6V9.4M8.4 14.8c1.6 1 5.6 1 7.2 0") +
      F("M12 11.4c-1.9 0-3.1-1-3.3-2.7 1.9 0 3.1 1 3.3 2.7ZM12 10.2c1.7 0 2.9-.9 3.1-2.5-1.7 0-2.9.9-3.1 2.5Z"),
  },

  /* ---------- Tiền tệ ---------- */
  "da-sao": {
    group: "tien-te",
    label: "Đá Sao",
    body:
      S("M12 3 18.6 8.4 12 21 5.4 8.4ZM5.4 8.4h13.2M9.2 8.4 12 21l2.8-12.6M9.2 8.4 12 3l2.8 5.4") +
      sparkle(19.4, 3.6, 2.4),
  },
  xu: {
    group: "tien-te",
    label: "Xu (đồng xu lỗ vuông)",
    body: Ci(12, 12, 9) + Ci(12, 12, 6.2) + S("M10 10h4v4h-4Z"),
  },

  /* ---------- Menu ---------- */
  "ban-do": {
    group: "menu",
    label: "Bản đồ",
    body: S("M3 6.2 9 4l6 2.2L21 4v13.8L15 20l-6-2.2L3 20ZM9 4v13.8M15 6.2V20"),
  },
  "doi-hinh": {
    group: "menu",
    label: "Đội hình",
    body: Ci(8, 8.4, 2.8) + Ci(16, 8.4, 2.8) + S("M3 19.5a5 5 0 0 1 10 0M11 19.5a5 5 0 0 1 10 0"),
  },
  "nhan-vat": { group: "menu", label: "Nhân vật", body: Ci(12, 8, 3.8) + S("M4.8 20.5a7.2 7.2 0 0 1 14.4 0") },
  "uoc-nguyen": {
    group: "menu",
    label: "Ước nguyện (sao băng)",
    body: F(star(15.5, 8.5, 5.2, 2.2, 5)) + S("M3 21l6.4-6.4M3.6 16.2l3.6-3.6M7.8 20.4l3.6-3.6"),
  },
  "tui-do": {
    group: "menu",
    label: "Túi đồ",
    body: S("M4.8 8.2h14.4l-1.3 12.3H6.1ZM9 8.2V6.6a3 3 0 0 1 6 0v1.6M9.5 12.5h5"),
  },
  "nhiem-vu": {
    group: "menu",
    label: "Nhiệm vụ (cuộn giấy)",
    body: S(
      "M6 4h11a2 2 0 0 1 2 2v12.5a2 2 0 0 1-2 2H8M6 4a2 2 0 0 0-2 2v1.6h4V6a2 2 0 0 0-2-2ZM8 7.6v12.9M11 9h5M11 12.5h5M11 16h3",
    ),
  },
  "uy-thac": {
    group: "menu",
    label: "Ủy Thác",
    body: S("M8.5 3.5h7v3h-7ZM8.5 5H5.5v15.5h13V5h-3M8.5 13l2.4 2.4 4.6-4.8"),
  },
  thap: {
    group: "menu",
    label: "Tháp Tinh Tú",
    body: S(
      "M12 2.4v2.1M6.6 8h10.8l-2.2-3.5H8.8ZM8 8v3.6h8V8M5.8 15h12.4l-2.2-3.4H8ZM7.4 15v5.6h9.2V15M11 20.6v-3h2v3",
    ),
  },
  thu: { group: "menu", label: "Thư", body: S("M3.5 6h17v12h-17ZM3.5 6.4l8.5 6.8 8.5-6.8") },
  "cai-dat": { group: "menu", label: "Cài đặt", body: S(gear(12, 12, 9.4, 6.8, 8)) + Ci(12, 12, 2.8) },
  "su-kien": {
    group: "menu",
    label: "Sự kiện (đèn lồng)",
    body: S(
      "M12 2.4v2M8.8 4.4h6.4M7 8c0-2 2.2-3.6 5-3.6S17 6 17 8v7.6c0 2-2.2 3.6-5 3.6S7 17.6 7 15.6ZM7 11.8h10M12 19.2v2.4M10.5 21.6h3",
    ),
  },
  "cua-hang": {
    group: "menu",
    label: "Cửa hàng",
    body: S(
      "M3.8 9 5.4 4h13.2l1.6 5M3.8 9a2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.6 0 2.7 2.7 0 0 0 5.4 0M5.4 11.2V20h13.2v-8.8M10 20v-5h4v5",
    ),
  },
  "lich-su": { group: "menu", label: "Lịch sử", body: S("M4.2 12a7.8 7.8 0 1 0 2.3-5.5M4.2 4v4h4M12 8v4.4l3 2") },
  "huong-dan": {
    group: "menu",
    label: "Hướng dẫn",
    body: S(
      "M12 6.6C10 5 7 4.6 3.6 5.1v13.2c3.4-.5 6.4 0 8.4 1.5 2-1.5 5-2 8.4-1.5V5.1C17 4.6 14 5 12 6.6ZM12 6.6v13.2",
    ),
  },
  "bang-dieu-khien": {
    group: "menu",
    label: "Bảng điều khiển (Admin)",
    body: S("M4 4h7v7H4ZM13 4h7v4h-7ZM13 10h7v10h-7ZM4 13h7v7H4Z"),
  },
  "am-thanh": {
    group: "menu",
    label: "Âm thanh bật",
    body: S("M3.8 9.4h3.6L12 5.4v13.2l-4.6-4H3.8ZM15.4 9a4.2 4.2 0 0 1 0 6M17.9 6.4a7.8 7.8 0 0 1 0 11.2"),
  },
  "tat-tieng": {
    group: "menu",
    label: "Âm thanh tắt",
    body: S("M3.8 9.4h3.6L12 5.4v13.2l-4.6-4H3.8ZM15.6 9.6l4.8 4.8M20.4 9.6l-4.8 4.8"),
  },
  menu: { group: "menu", label: "Menu", body: S("M4 7h16M4 12h16M4 17h16") },
  "net-sao": {
    group: "menu",
    label: "Nét Sao",
    body:
      S("M5 17.5 9 11l5.2 2.4L19 5.5") +
      Ci(5, 17.5, 1.9, true) +
      Ci(9, 11, 1.9, true) +
      Ci(14.2, 13.4, 1.9, true) +
      Ci(19, 5.5, 1.9, true),
  },
  "long-sao": {
    group: "menu",
    label: "Lòng Sao",
    body:
      S("M2.6 20.5c0-6.4 4.2-11 9.4-11s9.4 4.6 9.4 11M7.4 20.5c0-3.2 2.1-5.8 4.6-5.8s4.6 2.6 4.6 5.8M1.6 20.5h20.8") +
      sparkle(12, 4.6, 3),
  },

  /* ---------- Hành động ---------- */
  danh: {
    group: "hanh-dong",
    label: "Đánh",
    body: S("M20 4l-.9 4.4-9.4 9.4-3.5-3.5L15.6 4.9ZM7.6 16.4l-3.2 3.2M5 12.9l6.1 6.1"),
  },
  "ky-nang": {
    group: "hanh-dong",
    label: "Kỹ năng",
    body: Ci(12, 12, 9) + S("M12 6.6 17.4 12 12 17.4 6.6 12Z") + Ci(12, 12, 1.6, true),
  },
  no: {
    group: "hanh-dong",
    label: "Nộ (mặt trời trống đồng)",
    body: S(star(12, 12, 10, 5.4, 12)) + Ci(12, 12, 2.8, true),
  },
  luot: { group: "hanh-dong", label: "Lướt", body: S("M2.5 7.5h5M1.8 12h5M2.5 16.5h5M10.5 6l6 6-6 6M15 6l6 6-6 6") },
  nhay: {
    group: "hanh-dong",
    label: "Nhảy",
    body: S("M12 14.6V3.8M7.6 8.2 12 3.8l4.4 4.4M4.4 20.4c2.2-2.2 4.8-3.2 7.6-3.2s5.4 1 7.6 3.2"),
  },
  "tuong-tac": {
    group: "hanh-dong",
    label: "Tương tác",
    body: S(
      "M9 11.5V5.2a1.6 1.6 0 0 1 3.2 0v5.6M12.2 10V8.8a1.6 1.6 0 0 1 3.2 0v2M15.4 10.4a1.6 1.6 0 0 1 3.2 0v4.4a6 6 0 0 1-6 6h-.4a6 6 0 0 1-5-2.7l-2.6-4a1.6 1.6 0 0 1 2.6-1.8L9 14.2",
    ),
  },
  "doi-nguoi": {
    group: "hanh-dong",
    label: "Đổi người",
    body: S("M4 8h14M14.5 4.5 18 8l-3.5 3.5M20 16H6M9.5 12.5 6 16l3.5 3.5"),
  },
  dong: { group: "hanh-dong", label: "Đóng", body: S("M6 6l12 12M18 6 6 18") },
  "quay-lai": { group: "hanh-dong", label: "Quay lại", body: S("M15 5l-7 7 7 7") },
  tiep: { group: "hanh-dong", label: "Tiếp", body: S("M9 5l7 7-7 7") },
  "xac-nhan": { group: "hanh-dong", label: "Xác nhận", body: S("M4.8 12.6l4.6 4.6L19.2 7.2") },
  them: { group: "hanh-dong", label: "Thêm", body: S("M12 5v14M5 12h14") },
  bot: { group: "hanh-dong", label: "Bớt", body: S("M5 12h14") },
  "tim-kiem": { group: "hanh-dong", label: "Tìm kiếm", body: Ci(10.5, 10.5, 6.2) + S("M15.2 15.2 20 20") },
  loc: { group: "hanh-dong", label: "Lọc", body: S("M3.8 5h16.4l-6.3 7.6v6.2l-3.8 1.6v-7.8Z") },
  "sap-xep": {
    group: "hanh-dong",
    label: "Sắp xếp",
    body: S("M8 4v16M4.6 16.6 8 20l3.4-3.4M16 20V4M12.6 7.4 16 4l3.4 3.4"),
  },
  "tam-dung": { group: "hanh-dong", label: "Tạm dừng", body: S("M8.6 5v14M15.4 5v14") },
  choi: { group: "hanh-dong", label: "Chơi", body: S("M7.4 4.6v14.8L19.2 12Z") },
  "lam-moi": { group: "hanh-dong", label: "Làm mới", body: S("M19.8 12a7.8 7.8 0 1 1-2.3-5.5M19.8 4v4h-4") },

  /* ---------- Trạng thái ---------- */
  khoa: {
    group: "trang-thai",
    label: "Khóa",
    body: S("M5.8 11h12.4v9.5H5.8ZM8.6 11V8a3.4 3.4 0 0 1 6.8 0v3M12 14.6v2.4"),
  },
  "mo-khoa": {
    group: "trang-thai",
    label: "Đã mở",
    body: S("M5.8 11h12.4v9.5H5.8ZM8.6 11V8a3.4 3.4 0 0 1 6.6-1.2M12 14.6v2.4"),
  },
  mau: {
    group: "trang-thai",
    label: "Máu",
    body: S("M12 20s-7.6-4.6-7.6-10.2A4 4 0 0 1 12 7.6a4 4 0 0 1 7.6 2.2C19.6 15.4 12 20 12 20Z"),
  },
  guc: {
    group: "trang-thai",
    label: "Gục",
    body: S(
      "M12 20s-7.6-4.6-7.6-10.2A4 4 0 0 1 12 7.6a4 4 0 0 1 7.6 2.2C19.6 15.4 12 20 12 20ZM12 7.6l-1.6 4 3 2-1.4 3.6",
    ),
  },
  khien: {
    group: "trang-thai",
    label: "Khiên",
    body: S("M12 3l7.6 3v5.6c0 4.6-3.2 8-7.6 9.4-4.4-1.4-7.6-4.8-7.6-9.4V6Z"),
  },
  "the-luc": {
    group: "trang-thai",
    label: "Thể lực",
    body: S("M18.4 4C11.4 4 6 9 6 16v4M6 16c5.2 0 10.4-3 12.4-12M9.4 13.2l3-1M8 16.6l4-1"),
  },
  "canh-bao": {
    group: "trang-thai",
    label: "Cảnh báo",
    body: S("M12 3.6 21 19.6H3ZM12 9.6v4.4") + Ci(12, 16.8, 1.1, true),
  },
  "thong-tin": {
    group: "trang-thai",
    label: "Thông tin",
    body: Ci(12, 12, 9) + S("M12 11v5.6") + Ci(12, 7.8, 1.1, true),
  },
  "thanh-cong": { group: "trang-thai", label: "Thành công", body: Ci(12, 12, 9) + S("M7.8 12.4l2.8 2.8 5.6-5.8") },
  "bao-loi": { group: "trang-thai", label: "Lỗi", body: Ci(12, 12, 9) + S("M8.8 8.8l6.4 6.4M15.2 8.8l-6.4 6.4") },
  sao: { group: "trang-thai", label: "Sao (độ hiếm)", body: F(star(12, 12.6, 9.6, 4, 5)) },
  moi: { group: "trang-thai", label: "Mới", body: sparkle(12, 12, 9.6) + sparkle(19.2, 4.8, 2.6) },
  "hen-gio": {
    group: "trang-thai",
    label: "Hẹn giờ",
    body: S("M6.8 3.5h10.4M6.8 20.5h10.4M8 3.5c0 4.2 8 4.6 8 8.5s-8 4.3-8 8.5M16 3.5c0 4.2-8 4.6-8 8.5s8 4.3 8 8.5"),
  },
  ruong: {
    group: "trang-thai",
    label: "Rương",
    body: S("M3.8 10.2h16.4v9.8H3.8ZM3.8 10.2C3.8 7 7.4 4.6 12 4.6s8.2 2.4 8.2 5.6M10.4 12.4h3.2v3.2h-3.2Z"),
  },
  "bia-da": {
    group: "trang-thai",
    label: "Bia Đá",
    body: S("M7 20.5V8.4a5 5 0 0 1 10 0v12.1M4.8 20.5h14.4M10 10.4h4M10 13.8h4"),
  },
  "nang-cap": { group: "trang-thai", label: "Nâng cấp", body: S("M12 20.4V8.2M6.8 13.2 12 8l5.2 5.2M6.4 4h11.2") },
  "khai-tinh": {
    group: "trang-thai",
    label: "Khai Tinh",
    body: S("M6.6 20.4l5.4-4.2 5.4 4.2M6.6 15.4l5.4-4.2 5.4 4.2") + sparkle(12, 5.6, 3.6),
  },
  "bao-an": {
    group: "trang-thai",
    label: "Bảo Ấn",
    body: S("M8.2 3.6h7.6v3.8l-1.6 2.2H9.8L8.2 7.4ZM9.8 9.6V13M14.2 9.6V13M5.6 13h12.8v3.4H5.6ZM4.6 20h14.8"),
  },
  /* ---------- Kỹ năng riêng từng nhân vật (S09): gắn qua skill.icon trong content/characters ---------- */
  "kn-lachong": {
    group: "hanh-dong",
    label: "Kỹ năng Lạc Hồng: cánh chim lửa vút qua lưỡi kiếm",
    body:
      S("M3.6 18.6 18.8 3.4M15.6 3.6l4.8 4.8") +
      F("M5 11.6c3.4-.6 6.2.4 8 2.8-3.2-.2-5.4.8-6.8 3-0.2-2.4-.6-4.2-1.2-5.8Z") +
      S("M9.6 9c1.8-1.6 4-2.2 6.4-1.8"),
  },
  "kn-thuynguyet": {
    group: "hanh-dong",
    label: "Kỹ năng Thủy Nguyệt: chuông bạc trên sóng triều",
    body:
      S("M8 13.6V10a4 4 0 0 1 8 0v3.6l1.4 1.6H6.6ZM12 4.4V6") +
      Ci(12, 17.2, 1.2, true) +
      S("M3.4 20.4c1.4 1 2.8 1 4.2 0s2.8-1 4.2 0 2.8 1 4.2 0 2.8-1 4.2 0"),
  },
  "kn-phongvan": {
    group: "hanh-dong",
    label: "Kỹ năng Phong Vân: mũi tên cưỡi luồng gió",
    body: S("M4 20 19.4 4.6M14.4 4.4h5.2v5.2M3.6 9.6c2.4-1.6 4.6-1.6 6.4 0M9.8 18.6c1.6-2.2 1.8-4.4.4-6.6"),
  },
  "kn-loidinh": {
    group: "hanh-dong",
    label: "Kỹ năng Lôi Đình: ngọn thương gọi tia sấm",
    body: S("M4 20 16.6 7.4M15 3.6l5.4 0-0 5.4-3.8-1.6Z") + F("M8.4 3.4 5.2 9h2.8L6 14l5.2-6.6H8.4l2-4Z"),
  },
  "kn-thachson": {
    group: "hanh-dong",
    label: "Kỹ năng Thạch Sơn: khiên ngọc sáu cạnh",
    body:
      S("M12 2.8 19.8 7.4v9.2L12 21.2 4.2 16.6V7.4ZM12 7.2l4 2.4v4.8l-4 2.4-4-2.4V9.6Z") +
      F("M12 9.6l2 1.2v2.4L12 14.4 10 13.2v-2.4Z"),
  },
  "kn-tuyetlan": {
    group: "hanh-dong",
    label: "Kỹ năng Tuyết Lan: hoa lan nở từ tinh thể băng",
    body: S(
      "M12 21V12M12 12c-1.6-2.8-1.6-5.6 0-8.4 1.6 2.8 1.6 5.6 0 8.4ZM12 12c-3-.4-5.4-2-6.6-4.6 3 .2 5.2 1.8 6.6 4.6ZM12 12c3-.4 5.4-2 6.6-4.6-3 .2-5.2 1.8-6.6 4.6ZM8.6 17.4h6.8M9.6 15.2l4.8 4.4M14.4 15.2l-4.8 4.4",
    ),
  },
  "kn-mailinh": {
    group: "hanh-dong",
    label: "Kỹ năng Mai Linh: đèn lồng phun lửa",
    body:
      S(
        "M12 2.6v2.2M9 4.8h6M7.6 7.4c0-1.4 2-2.6 4.4-2.6s4.4 1.2 4.4 2.6v6.8c0 1.4-2 2.6-4.4 2.6s-4.4-1.2-4.4-2.6ZM7.6 10.8h8.8M10.4 16.8v2.6M13.6 16.8v2.6",
      ) + F("M12 8.6c.9 1 1.4 1.8 1.4 2.6a1.4 1.4 0 0 1-2.8 0c0-.8.5-1.6 1.4-2.6Z"),
  },
  "kn-suongmai": {
    group: "hanh-dong",
    label: "Kỹ năng Sương Mai: đường kiếm vẽ giọt sương",
    body:
      S("M4.2 19.8 17.4 6.6M15.8 4.2l4 4M3.4 9.2c3-3.6 7-5 11.4-4.4") +
      F(
        "M7.6 13c1 1.2 1.6 2.1 1.6 3a1.6 1.6 0 0 1-3.2 0c0-.9.6-1.8 1.6-3ZM17.4 13.6c.8 1 1.2 1.7 1.2 2.4a1.2 1.2 0 0 1-2.4 0c0-.7.4-1.4 1.2-2.4Z",
      ),
  },
  "kn-bachvu": {
    group: "hanh-dong",
    label: "Kỹ năng Bạch Vũ: lông vũ xoáy thành lốc",
    body:
      S(
        "M6 20.4 16.4 8.2M16.4 8.2c2.6-3 3.2-5 2.8-5.4-2.4.2-6.6 2.2-9 6.2-1.6 2.6-1.8 5-1.2 6.6 2.4-.2 5.4-2.2 7.4-7.4ZM12.4 12.6l-3.2-.6M14.4 10.2l-3-.6",
      ) + S("M3.6 14.6c-.6-2 .2-3.6 2-4.2"),
  },
  "kn-minhkhai": {
    group: "hanh-dong",
    label: "Kỹ năng Minh Khải: ngọn đèn sét của thợ săn",
    body:
      S("M9.2 3.6h5.6M10 3.6v2.6M14 3.6v2.6M7.4 8.2l1.4-2h6.4l1.4 2v8.4l-2 2.6H9.4l-2-2.6ZM12 19.2v2") +
      F("M12.8 9 10 13.2h2l-.8 3.6 2.8-4.4h-2Z"),
  },
  "kn-ngocthach": {
    group: "hanh-dong",
    label: "Kỹ năng Ngọc Thạch: thiên thạch rơi xuống mỏ ngọc",
    body: Ci(15.4, 15.4, 4.4) + S("M3.4 3.4l8 8M6.8 2.8l6 6M2.8 6.8l6 6M13.6 13.8l3.4 3.2M17.2 13.4l-3.4 3.6"),
  },
  "kn-havy": {
    group: "hanh-dong",
    label: "Kỹ năng Hạ Vy: mũi tên sương giá",
    body:
      S("M4 20 17.6 6.4M13.2 4.6l6.2-1-1 6.2M4.6 13.4l2.6 2.6M7.6 10.6l2.6 2.6") +
      S("M17.2 15.4v5.2M14.6 18h5.2M15.4 16.2l3.6 3.6M19 16.2l-3.6 3.6"),
  },
};

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS);

/** Chuỗi SVG để chèn vào innerHTML. Có `title` thì đọc được bằng trình đọc màn hình, không thì ẩn. */
export function iconSvg(name: string, opts: { size?: number; title?: string; cls?: string } = {}): string {
  const def = ICONS[name];
  if (!def) throw new Error(`Không có biểu tượng "${name}"`);
  const size = opts.size ?? 24;
  const a11y = opts.title ? `role="img" aria-label="${opts.title}"` : 'aria-hidden="true" focusable="false"';
  return (
    `<svg class="tt-icon${opts.cls ? " " + opts.cls : ""}" data-icon="${name}" viewBox="0 0 24 24" width="${size}" height="${size}" ` +
    `fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${a11y}>` +
    `${opts.title ? `<title>${opts.title}</title>` : ""}${def.body}</svg>`
  );
}

export function icon(name: string, opts: { size?: number; title?: string; cls?: string } = {}): SVGSVGElement {
  const t = document.createElement("template");
  t.innerHTML = iconSvg(name, opts);
  return t.content.firstElementChild as SVGSVGElement;
}

/** Biểu tượng của nguyên tố theo id trong content/config.yaml. */
export const ELEMENT_ICON: Record<string, string> = {
  fire: "hoa",
  water: "thuy",
  wind: "phong",
  bolt: "loi",
  earth: "tho",
  ice: "bang",
  wood: "moc",
};
