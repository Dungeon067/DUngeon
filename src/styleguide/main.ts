/* Trang /styleguide/ (S08): bày mọi thành phần và mọi trạng thái. Chỉ có ở bản phát triển hoặc khi build với STYLEGUIDE=1. */
import "../ui/ds/ds.css";
import "./styleguide.css";
import { portrait } from "../art/chibi";
import { CHARS } from "../data/content";
import { ICONS, ICON_NAMES, icon, type IconGroup } from "../ui/icons/icons";
import { COLOR, ELEMENTS, ELEMENT_IDS, PAIRS, PAIR_MIN, RARITY, contrast, type Rarity } from "../ui/tokens";
import {
  actionButton,
  badgeDot,
  button,
  charCard,
  currency,
  dialogBox,
  elementBadge,
  field,
  h,
  itemCard,
  list,
  openDialog,
  partySlot,
  portraitFrame,
  progress,
  slider,
  stars,
  tabs,
  tag,
  toast,
  toastEl,
  toggle,
} from "../ui/ds";

const q = new URLSearchParams(location.search);
const embed = q.has("embed");
document.body.classList.add("tt-root");
if (embed) document.body.classList.add("sg-embed");

const STATES = [
  ["Thường", ""],
  ["Rê chuột", "is-hover"],
  ["Đang bấm", "is-active"],
  ["Focus bàn phím", "is-focus"],
  ["Tắt", "disabled"],
  ["Đang tải", "loading"],
] as const;

const cell = (label: string, el: Node) => h("div", { class: "sg-cell" }, [el, h("small", {}, [label])]);
const grid = (kids: Node[], min = 150) => h("div", { class: "sg-grid", style: `--min:${min}px` }, kids);
function section(id: string, title: string, desc: string, ...body: Node[]) {
  return h("section", { class: "sg-sec", id, "aria-labelledby": id + "-h" }, [
    h("h2", { class: "tt-h2", id: id + "-h" }, [title]),
    h("p", {}, [desc]),
    ...body,
  ]);
}
function force<T extends HTMLElement>(el: T, st: string): T {
  if (st === "disabled") (el as unknown as HTMLButtonElement).disabled = true;
  else if (st && st !== "loading") el.classList.add(st);
  return el;
}
const art = (id: string, w: number, hh: number, kind = "card") => {
  const src = portrait(id, w, hh, kind) as HTMLCanvasElement;
  const c = h("canvas", { width: w, height: hh });
  c.getContext("2d")!.drawImage(src, 0, 0);
  return c;
};

/* ---------- Thanh công cụ ---------- */
const root = document.getElementById("sg")!;
const page = h("main", { class: "sg" });
root.append(page);

if (!embed) {
  const frameWrap = h("div", { class: "sg-frame", hidden: true });
  const views = tabs(
    [
      { id: "desk", label: "Máy tính", icon: "bang-dieu-khien" },
      { id: "phone", label: "Điện thoại 844×390", icon: "doi-nguoi" },
    ],
    "desk",
    (v) => {
      const phone = v === "phone";
      frameWrap.hidden = !phone;
      for (const s of page.querySelectorAll<HTMLElement>(".sg-sec")) s.hidden = phone;
      if (phone && !frameWrap.firstChild)
        frameWrap.append(
          h("iframe", { src: "?embed", width: 844, height: 390, title: "Xem trên khung điện thoại ngang 844×390" }),
        );
    },
  );
  page.append(
    h("header", { class: "sg-bar" }, [
      h("h1", { class: "tt-h2" }, ["Hệ thống thiết kế"]),
      views,
      button("Mở hộp thoại", {
        variant: "secondary",
        icon: "thong-tin",
        onClick: () =>
          openDialog({
            title: "Hộp thoại mẫu",
            body: "Nhấn Esc hoặc bấm ra ngoài để đóng.",
            ornate: true,
            actions: [button("Đã hiểu", { variant: "primary" })],
          }),
      }),
      button("Thông báo", { variant: "ghost", icon: "moi", onClick: () => toast("Đã nhận 60 Đá Sao", "ok") }),
    ]),
    frameWrap,
  );
}

/* ---------- Màu ---------- */
const swatch = (name: string, c: string) =>
  h("div", { class: "sg-swatch" }, [
    h("i", { style: `background:${c}` }),
    h("span", {}, [h("b", {}, [name]), h("br"), c]),
  ]);
page.append(
  section(
    "mau",
    "Màu",
    "Nền trời đêm và sơn mài, chữ màu giấy dó, nhấn màu đồng trống đồng. Màu nguyên tố và độ hiếm luôn đi kèm hình dạng hoặc số sao, không dùng màu làm tín hiệu duy nhất.",
    grid(
      Object.entries(COLOR).map(([k, v]) => swatch(k, v)),
      120,
    ),
    h("h3", { class: "tt-h3", style: "margin-top:24px" }, ["Nguyên tố"]),
    grid(
      ELEMENT_IDS.map((id) =>
        h("div", { class: "sg-swatch" }, [
          h("i", { style: `background:linear-gradient(90deg,${ELEMENTS[id].c} 60%,${ELEMENTS[id].c2} 0)` }),
          h("span", {}, [elementBadge(id, { label: true, name: ELEMENTS[id].vi }), h("br"), ELEMENTS[id].c]),
        ]),
      ),
      120,
    ),
    h("h3", { class: "tt-h3", style: "margin-top:24px" }, ["Độ hiếm"]),
    grid(
      ([3, 4, 5] as Rarity[]).map((r) =>
        h("div", { class: "sg-swatch" }, [
          h("i", { style: `background:linear-gradient(90deg,${RARITY[r].c} 50%,${RARITY[r].bg} 0)` }),
          h("span", {}, [stars(r), h("br"), `${RARITY[r].c} / ${RARITY[r].bg}`]),
        ]),
      ),
      140,
    ),
  ),
);

/* ---------- Chữ ---------- */
page.append(
  section(
    "chu",
    "Chữ",
    "Cormorant Garamond cho tiêu đề, Be Vietnam Pro cho nội dung và số. Dòng cao tối thiểu 1,25 để dấu chồng như ặ, ẫ, ỡ không chạm dòng trên.",
    h("div", { class: "sg-panel sg-type" }, [
      h("p", { class: "tt-h1" }, ["Vọng Tinh Giới · Đảo Lạc"]),
      h("p", { class: "tt-h2" }, ["Người Ước Nguyện thức dậy"]),
      h("p", { class: "tt-h3" }, ["Lòng Sao Rừng Trúc · Nét Sao N6"]),
      h("p", { style: "font-size:var(--tt-fs-lg)" }, ["Cỡ lớn: Hộ Tinh gánh lời ước cùng dân làng."]),
      h("p", {}, ["Cỡ thường: Ủy Thác hằng ngày, Tháp Tinh Tú, Bia Đá, Khai Tinh, Bảo Ấn, Bộ Ấn."]),
      h("p", { style: "font-size:var(--tt-fs-sm)" }, [
        "Cỡ nhỏ: Bốc Hơi, Tan Chảy, Quá Tải, Điện Cảm, Đóng Băng, Siêu Dẫn, Khuếch Tán, Kết Tinh.",
      ]),
      h("p", { style: "font-size:var(--tt-fs-xs)", class: "tt-dim" }, [
        "Cỡ rất nhỏ: Ỷ Ẫ Ặ Ỡ Ữ Ự Ỳ ỹ ẵ ẳ ẩ ể ổ ở ử — 0123456789",
      ]),
    ]),
  ),
);

/* ---------- Biểu tượng ---------- */
const GROUPS: [IconGroup, string][] = [
  ["nguyen-to", "Nguyên tố"],
  ["tien-te", "Tiền tệ"],
  ["menu", "Menu"],
  ["hanh-dong", "Hành động"],
  ["trang-thai", "Trạng thái"],
];
page.append(
  section(
    "bieu-tuong",
    `Biểu tượng (${ICON_NAMES.length})`,
    "Lưới 24×24, nét 1,75, tô bằng currentColor. Bảy nguyên tố khác nhau cả hình viền lẫn hình bên trong.",
    ...GROUPS.flatMap(([g, name]) => [
      h("h3", { class: "tt-h3", style: "margin:16px 0 8px" }, [name]),
      grid(
        ICON_NAMES.filter((n) => ICONS[n as keyof typeof ICONS].group === g).map((n) =>
          h("div", { class: "sg-icon" }, [
            icon(n, { size: 32 }),
            ICONS[n as keyof typeof ICONS].label,
            h("code", {}, [n]),
          ]),
        ),
        96,
      ),
    ]),
    h("h3", { class: "tt-h3", style: "margin:16px 0 8px" }, ["Nguyên tố không màu (kiểm tra mù màu)"]),
    h(
      "div",
      { class: "sg-row", style: "filter:grayscale(1)" },
      ELEMENT_IDS.map((id) => elementBadge(id, { label: true, size: 32, name: ELEMENTS[id].vi })),
    ),
  ),
);

/* ---------- Nút ---------- */
const btnRow = (variant: "primary" | "secondary" | "danger" | "ghost", label: string, ic?: string) =>
  grid(
    STATES.map(([name, st]) => cell(name, force(button(label, { variant, icon: ic, loading: st === "loading" }), st))),
    140,
  );
page.append(
  section(
    "nut",
    "Nút",
    "Chính: một hành động quan trọng nhất mỗi màn. Phụ: hành động thay thế. Nguy hiểm: không hoàn tác được. Biểu tượng: thanh công cụ, luôn có nhãn cho trình đọc màn hình. Nút tắt không làm mờ chữ dưới AA mà dùng viền nét đứt.",
    h("h3", { class: "tt-h3" }, ["Chính"]),
    btnRow("primary", "Ước nguyện ×10", "uoc-nguyen"),
    h("h3", { class: "tt-h3", style: "margin-top:16px" }, ["Phụ"]),
    btnRow("secondary", "Chi tiết"),
    h("h3", { class: "tt-h3", style: "margin-top:16px" }, ["Nguy hiểm"]),
    btnRow("danger", "Xóa dữ liệu", "canh-bao"),
    h("h3", { class: "tt-h3", style: "margin-top:16px" }, ["Biểu tượng"]),
    grid(
      STATES.map(([name, st]) =>
        cell(name, force(badgeDot(button("Thư", { iconOnly: true, icon: "thu", loading: st === "loading" }), 3), st)),
      ),
      100,
    ),
    h("h3", { class: "tt-h3", style: "margin-top:16px" }, ["Chấm đỏ báo mới và khung tiền tệ"]),
    h("div", { class: "sg-row" }, [
      badgeDot(button("Nhiệm vụ", { iconOnly: true, icon: "nhiem-vu" })),
      badgeDot(button("Sự kiện", { variant: "secondary", icon: "su-kien" }), 12),
      currency("da-sao", 1600, () => toast("Chưa mở nạp ở bản thử nghiệm", "info")),
      currency("xu", 248500),
      currency("xu", 3200, () => undefined),
    ]),
  ),
);

/* ---------- Ô nhập ---------- */
page.append(
  section(
    "nhap",
    "Ô nhập, công tắc, thanh trượt",
    "Dùng cho Cài đặt và trang Admin. Nhãn luôn hiện, không dùng chữ gợi ý thay nhãn.",
    grid(
      [
        cell("Thường", field("Tên Người Ước Nguyện", { placeholder: "Nhập tên" })),
        cell(
          "Rê chuột",
          (() => {
            const f = field("Mã quà", { value: "DAOLAC2026" });
            f.querySelector("input")!.classList.add("is-hover");
            return f;
          })(),
        ),
        cell(
          "Focus",
          (() => {
            const f = field("Seed bản đồ", { value: "110" });
            f.querySelector("input")!.classList.add("is-focus");
            return f;
          })(),
        ),
        cell("Lỗi", field("Số Đá Sao", { value: "-5", error: "Phải là số dương" })),
        cell("Tắt", field("Máy chủ", { value: "Trình duyệt", disabled: true, hint: "Chưa có máy chủ thật" })),
      ],
      220,
    ),
    h("div", { class: "sg-row", style: "margin-top:16px" }, [
      toggle("Rung khi trúng đòn", true),
      toggle("Hiện số sát thương", false),
      force(toggle("Rê chuột", false), "is-hover"),
      force(toggle("Focus", true), "is-focus"),
      toggle("Chơi chung (chưa có)", false, { disabled: true }),
    ]),
    grid(
      [
        slider("Âm nhạc", 70, { unit: "%" }),
        slider("Hiệu ứng", 40, { unit: "%" }),
        slider("Giọng nói (chưa có)", 0, { disabled: true, unit: "%" }),
      ],
      220,
    ),
  ),
);

/* ---------- Tab, danh sách, tiến độ ---------- */
const tabBox = tabs(
  [
    { id: "a", label: "Thuộc tính", icon: "nhan-vat" },
    { id: "b", label: "Nét Sao", icon: "net-sao" },
    { id: "c", label: "Bảo Ấn", icon: "bao-an" },
    { id: "d", label: "Trang phục", disabled: true },
  ],
  "a",
);
tabBox.children[2]!.classList.add("is-hover");
page.append(
  section(
    "tab",
    "Tab, danh sách, thanh tiến độ",
    "Tab chuyển bằng mũi tên trái/phải. Danh sách cho menu chính, Ủy Thác, thư. Thanh tiến độ luôn kèm số.",
    tabBox,
    grid(
      [
        list([
          { title: "Ủy Thác: Dọn trại quái", sub: "Còn 2/3 trại", icon: "uy-thac", end: "20", current: true },
          { title: "Lòng Sao Rừng Trúc", sub: "Nguyên liệu Khai Tinh", icon: "long-sao" },
          { title: "Tháp Tinh Tú", sub: "Tầng 4 / 12", icon: "thap" },
          { title: "Hang Hắc Giao", sub: "Cần cấp 30", icon: "guc", disabled: true },
        ]),
        h("div", { class: "sg-panel", style: "display:grid;gap:14px" }, [
          progress(0.72, { label: "Kinh nghiệm cấp 24", text: "7.200 / 10.000" }),
          progress(0.88, { kind: "hp", label: "Máu", text: "3.520 / 4.000" }),
          progress(0.22, { kind: "hp", label: "Máu thấp", text: "880 / 4.000" }),
          progress(0.4, { label: "Đang tải bản đồ", loading: true, text: "…" }),
          progress(0.6, { kind: "thin", label: "Thể lực", text: "60" }),
        ]),
      ],
      300,
    ),
  ),
);

/* ---------- Thẻ ---------- */
const sample = ["lachong", "suongmai", "minhkhai", "tuyetlan", "ngocthach"]
  .map((id) => CHARS.find((c) => c.id === id))
  .filter((c) => c !== undefined);
const charArgs = (c: (typeof sample)[number]) => ({
  name: c.name,
  rarity: c.r as Rarity,
  el: c.el,
  elName: ELEMENTS[c.el as keyof typeof ELEMENTS]?.vi ?? c.el,
});
page.append(
  section(
    "the",
    "Thẻ nhân vật, thẻ vật phẩm, khung chân dung",
    "Màu viền và nền theo độ hiếm, luôn kèm số sao. Nhân vật chưa có hiện thành bóng đen kèm khóa, chữ vẫn đọc được.",
    grid(
      [
        cell(
          "Thường · 5★",
          charCard({ ...charArgs(sample[0]!), level: 60, netSao: 1, art: art(sample[0]!.id, 150, 188) }),
        ),
        cell(
          "Rê chuột · 4★",
          force(
            charCard({ ...charArgs(sample[1]!), level: 40, netSao: 6, art: art(sample[1]!.id, 150, 188) }),
            "is-hover",
          ),
        ),
        cell(
          "Đang chọn",
          charCard({ ...charArgs(sample[2]!), level: 20, art: art(sample[2]!.id, 150, 188), selected: true }),
        ),
        cell(
          "Focus",
          force(charCard({ ...charArgs(sample[3]!), level: 1, art: art(sample[3]!.id, 150, 188) }), "is-focus"),
        ),
        cell("Chưa có", charCard({ ...charArgs(sample[4]!), art: art(sample[4]!.id, 150, 188), locked: true })),
      ],
      160,
    ),
    h("h3", { class: "tt-h3", style: "margin:16px 0 8px" }, ["Vật phẩm"]),
    grid(
      [
        cell("3★", itemCard({ name: "Lông Chim Lạc", rarity: 3, icon: "phong", qty: 24 })),
        cell("4★", itemCard({ name: "Ấn Sóng Bạc", rarity: 4, icon: "bao-an" })),
        cell("5★", itemCard({ name: "Mảnh Trống Đồng", rarity: 5, icon: "khai-tinh", qty: 2 })),
        cell("Rê chuột", force(itemCard({ name: "Xu", rarity: 3, icon: "xu", qty: 5000 }), "is-hover")),
        cell("Đang chọn", itemCard({ name: "Đá Sao", rarity: 5, icon: "da-sao", qty: 160, selected: true })),
        cell("Focus", force(itemCard({ name: "Bản Đồ Cổ", rarity: 4, icon: "ban-do" }), "is-focus")),
      ],
      100,
    ),
    h("h3", { class: "tt-h3", style: "margin:16px 0 8px" }, ["Khung chân dung"]),
    h(
      "div",
      { class: "sg-row" },
      sample.map((c, i) =>
        portraitFrame(art(c.id, 64, 64, "head"), {
          rarity: c.r as Rarity,
          el: c.el,
          elName: charArgs(c).elName,
          size: 64,
          down: i === 4,
        }),
      ),
    ),
  ),
);

/* ---------- HUD ---------- */
const party = h("div", { style: "display:grid;gap:8px" }, [
  partySlot({ ...charArgs(sample[0]!), key: "1", art: art(sample[0]!.id, 42, 42, "head"), hp: 0.9, active: true }),
  force(
    partySlot({ ...charArgs(sample[1]!), key: "2", art: art(sample[1]!.id, 42, 42, "head"), hp: 0.55 }),
    "is-hover",
  ),
  partySlot({ ...charArgs(sample[2]!), key: "3", art: art(sample[2]!.id, 42, 42, "head"), hp: 0, down: true }),
  partySlot({ key: "4" }),
]);
page.append(
  section(
    "hud",
    "Nút hành động HUD và ô đội hình",
    "Chỉ là phần nhìn. S09 đặt vị trí và gắn cơ chế (gồm Nhảy). S10 dùng ô đội hình cho đổi đội trên đảo. Cỡ nút lấy từ --tt-hud-xl/lg/md theo chiều cao màn, không bao giờ dưới 44 px.",
    h("div", { class: "sg-hud" }, [
      cell("Đánh · xl", actionButton("danh", { size: "xl", key: "J" })),
      cell("Kỹ năng · hồi chiêu", actionButton("ky-nang", { key: "E", cooldown: 0.6, seconds: 5 })),
      cell("Nộ · 70%", actionButton("no", { key: "Q", energy: 0.7, elColor: ELEMENTS.water.c })),
      cell("Nộ · sẵn sàng", actionButton("no", { key: "Q", energy: 1, elColor: ELEMENTS.fire.c })),
      cell("Lướt · md", actionButton("luot", { size: "md", key: "⇧" })),
      cell("Nhảy · md", actionButton("nhay", { size: "md", key: "␣" })),
      cell("Đang bấm", force(actionButton("nhay", { size: "md" }), "is-active")),
      cell("Focus", force(actionButton("danh", { size: "lg" }), "is-focus")),
      cell("Tắt", actionButton("luot", { size: "md", disabled: true })),
      cell("Ô đội hình: chọn, rê, gục, trống", party),
    ]),
  ),
);

/* ---------- Hộp thoại và thông báo ---------- */
page.append(
  section(
    "hop-thoai",
    "Hộp thoại, thông báo nhanh, khung trang trí",
    "Khung trống đồng chỉ dùng cho khoảnh khắc quan trọng. Hộp thoại thường dùng viền mảnh. Giấy dó cho thư, bia đá và trang truyện.",
    grid(
      [
        dialogBox({
          title: "Dùng 160 Đá Sao?",
          body: "Bạn sẽ ước nguyện 1 lần tại Vọng Sao Lạc Hồng. Đá Sao còn lại: 1.440.",
          ornate: true,
          actions: [button("Hủy"), button("Ước nguyện", { variant: "primary", icon: "uoc-nguyen" })],
        }),
        dialogBox({
          title: "Xóa dữ liệu lưu?",
          body: "Toàn bộ tiến độ trên trình duyệt này sẽ mất và không khôi phục được.",
          actions: [button("Giữ lại", { variant: "secondary" }), button("Xóa", { variant: "danger" })],
        }),
        h("div", { style: "display:grid;gap:8px" }, [
          toastEl("Đã nhận Lạc Hồng", "ok"),
          toastEl("Thể lực sắp hết", "warn"),
          toastEl("Không lưu được dữ liệu", "bad"),
          toastEl("Bia Đá đã được kích hoạt", "info"),
        ]),
      ],
      300,
    ),
    grid(
      [
        h("div", { class: "tt-paper tt-corners", style: "padding:28px;border-radius:var(--tt-radius-md)" }, [
          h("span", { class: "tt-corner tl" }),
          h("span", { class: "tt-corner tr" }),
          h("span", { class: "tt-corner bl" }),
          h("span", { class: "tt-corner br" }),
          h("h3", { class: "tt-h3", style: "color:var(--tt-paper-ink)" }, ["Thư từ trưởng làng"]),
          h("p", {}, ["Mùa nước lên, trống đồng đã gióng. Người Ước Nguyện hãy ghé đình làng."]),
          h("p", { class: "tt-dim" }, ["Giấy dó · hoa văn mây ở góc"]),
        ]),
        h(
          "div",
          {
            class: "tt-lacquer",
            style: "padding:20px;border-radius:var(--tt-radius-md);border:1px solid var(--tt-line)",
          },
          [
            h("div", { class: "tt-divider-star" }, ["Sơn mài"]),
            h("p", {}, ["Nền sơn mài cho màn nhân vật và màn kết quả."]),
            h("hr", { class: "tt-divider" }),
            h("p", { class: "tt-dim" }, ["Đường phân cách sóng nước"]),
          ],
        ),
      ],
      300,
    ),
  ),
);

/* ---------- Bảng điều khiển Admin ---------- */
const navItem = (ic: string, t: string, cur = false) =>
  h("button", { type: "button", class: "tt-list-item", "aria-current": cur ? "true" : undefined }, [
    icon(ic, { size: 20 }),
    h("span", { class: "main" }, [t]),
  ]);
const table = h("div", { class: "tt-table-wrap" }, [
  h("table", { class: "tt-table" }, [
    h("thead", {}, [
      h("tr", {}, [
        h("th", {}, ["Người chơi"]),
        h("th", { class: "num" }, ["Ước nguyện"]),
        h("th", { class: "num" }, ["Đá Sao"]),
        h("th", {}, ["Trạng thái"]),
      ]),
    ]),
    h(
      "tbody",
      {},
      [
        ["Khách 01", 182, 1600, tag("Hoạt động", "ok")],
        ["Khách 02", 90, 0, tag("Chạm Bảo Hộ Vận Sao", "warn")],
        ["Khách 03", 12, 3200, tag("Lỗi lưu", "bad")],
      ].map((r) =>
        h("tr", {}, [
          h("td", {}, [String(r[0])]),
          h("td", { class: "num" }, [String(r[1])]),
          h("td", { class: "num" }, [new Intl.NumberFormat("vi-VN").format(r[2] as number)]),
          h("td", {}, [r[3] as Node]),
        ]),
      ),
    ),
  ]),
]);
const stat = (k: string, v: string, d: string, up: boolean) =>
  h("div", { class: "tt-stat" }, [
    h("span", { class: "tt-dim" }, [k]),
    h("span", { class: "v" }, [v]),
    h("span", { class: `d ${up ? "up" : "down"}` }, [d]),
  ]);
page.append(
  section(
    "admin",
    "Bảng điều khiển (trang /admin/)",
    "Gọn và dày thông tin hơn giao diện game, vẫn giữ vùng chạm 44 px. S10 dựng trang thật.",
    h("div", { class: "tt-admin" }, [
      h("nav", { class: "tt-admin-nav", "aria-label": "Admin" }, [
        h("div", { class: "brand" }, [icon("bang-dieu-khien", { size: 22 }), h("span", {}, ["Quản trị"])]),
        navItem("bang-dieu-khien", "Tổng quan", true),
        navItem("uoc-nguyen", "Ước nguyện"),
        navItem("cua-hang", "Kinh tế"),
        navItem("su-kien", "Sự kiện"),
        navItem("cai-dat", "Cấu hình"),
      ]),
      h("div", { class: "tt-admin-main" }, [
        h("div", { class: "tt-admin-head" }, [
          h("h3", {}, ["Tổng quan hôm nay"]),
          h("div", { class: "sg-row" }, [
            button("Làm mới", { icon: "lam-moi", variant: "ghost" }),
            button("Xuất dữ liệu", { variant: "secondary" }),
          ]),
        ]),
        h("div", { class: "tt-stats" }, [
          stat("Lượt ước nguyện", "1.284", "▲ 12% so với hôm qua", true),
          stat("Tỉ lệ 5★", "1,6%", "▲ 0,2 điểm", true),
          stat("Đá Sao đã tiêu", "205.440", "▼ 4%", false),
        ]),
        table,
        h("dl", { class: "tt-kv" }, [
          h("dt", {}, ["Tỉ lệ 5★ gốc"]),
          h("dd", {}, ["0,6%"]),
          h("dt", {}, ["Bảo Hộ Vận Sao"]),
          h("dd", {}, ["90 lần"]),
        ]),
        h("div", { class: "tt-form-row" }, [
          field("Tỉ lệ 5★ (%)", { value: "0.6", type: "number" }),
          field("Bảo Hộ Vận Sao (mốc cứng)", { value: "90", type: "number" }),
          button("Lưu cấu hình", { variant: "primary", icon: "xac-nhan" }),
        ]),
      ]),
    ]),
  ),
);

/* ---------- Tương phản ---------- */
const rows = PAIRS.map((p) => {
  const c = contrast(p.fg, p.bg);
  const ok = c >= PAIR_MIN[p.kind];
  return h("tr", {}, [
    h("td", {}, [p.where]),
    h("td", {}, [
      h("span", { class: "sg-chip", style: `background:${p.fg}` }),
      " ",
      h("span", { class: "sg-chip", style: `background:${p.bg}` }),
    ]),
    h("td", {}, [p.kind === "ui" ? "Thành phần (3:1)" : "Chữ (4,5:1)"]),
    h("td", { class: `num ${ok ? "ok" : "bad"}` }, [`${c.toFixed(2)}:1 ${ok ? "Đạt" : "Trượt"}`]),
  ]);
});
const fails = PAIRS.filter((p) => contrast(p.fg, p.bg) < PAIR_MIN[p.kind]).length;
page.append(
  section(
    "tuong-phan",
    "Tương phản WCAG AA",
    `${PAIRS.length} cặp được tính trực tiếp từ tokens. ${fails === 0 ? "Tất cả đạt." : `${fails} cặp trượt.`}`,
    h("div", { class: "tt-table-wrap sg-contrast", style: "max-height:420px;overflow:auto" }, [
      h("table", { class: "tt-table" }, [
        h("thead", {}, [
          h("tr", {}, [
            h("th", {}, ["Cặp"]),
            h("th", {}, ["Màu"]),
            h("th", {}, ["Loại"]),
            h("th", { class: "num" }, ["Tỉ lệ"]),
          ]),
        ]),
        h("tbody", {}, rows),
      ]),
    ]),
  ),
);

/* ---------- Chuyển động ---------- */
const motion = h(
  "div",
  { class: "sg-motion" },
  (["instant", "fast", "base", "slow"] as const).map((d) => {
    const b = button(d, { variant: "secondary" });
    const dot = h("i", { style: `transition:transform var(--tt-dur-${d}) var(--tt-ease-settle)` });
    b.prepend(dot);
    b.addEventListener("click", () => b.classList.toggle("go"));
    return b;
  }),
);
page.append(
  section(
    "chuyen-dong",
    "Chuyển động",
    "Bấm để thử. Khi hệ điều hành bật giảm chuyển động, mọi thời lượng về gần 0.",
    motion,
  ),
);
