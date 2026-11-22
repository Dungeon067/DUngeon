# Hệ thống thiết kế giao diện

S08 viết tài liệu này. Nó là nguồn tham chiếu cho mọi màn hình làm lại từ S09 trở đi. HUD và menu hiện có chưa đổi. S09 (HUD, nút Nhảy) và S10 (menu, đổi đội trên đảo, trang `/admin/`) sẽ chuyển sang dùng hệ thống này.

| Phần                   | File                                                               |
| ---------------------- | ------------------------------------------------------------------ |
| Tokens CSS             | `src/ui/tokens.css`                                                |
| Tokens TS (cho Canvas) | `src/ui/tokens.ts`                                                 |
| Thành phần             | `src/ui/ds/index.ts`, `src/ui/ds/ds.css`                           |
| Khung trang trí        | `src/ui/ds/trang-tri.css`                                          |
| Biểu tượng             | `src/ui/icons/icons.ts`                                            |
| Trang mẫu              | `/styleguide/` (`styleguide/index.html`, `src/styleguide/`)        |
| Kiểm tra               | `tests/unit/design-system.test.ts`, `tests/e2e/styleguide.spec.ts` |
| Ảnh chụp               | `docs/ux/anh/styleguide-*.png`                                     |

## 1. Triết lý: "Đồng trên nền trời đêm"

Giao diện lấy chất liệu từ đồ vật Lạc Việt rồi giản lược cho màn hình nhỏ:

- **Trống đồng** cho nét nhấn: màu đồng `#c8962d`, vành chấm tròn xen vạch chéo, mặt trời nhiều tia ở giữa. Đồng chỉ dùng cho thứ quan trọng nhất trên màn: nút chính, tab đang mở, viền khoảnh khắc lớn.
- **Sơn mài** cho bề mặt: nền đen chàm và đen đỏ, sâu và bóng, giúp chữ sáng dễ đọc.
- **Giấy dó** cho chữ và trang đọc: chữ chính màu giấy `#f3e6c4` thay cho trắng tinh, đỡ chói khi chơi đêm. Thư, bia đá và trang truyện dùng nền giấy có vân sợi.
- **Sóng nước và mây** cho đường phân cách và hoa văn góc. Chúng chỉ xuất hiện ở mép khung, không bao giờ nằm sau chữ.

Bảng màu nền khớp bảng màu Đảo Lạc của S01 (`docs/world/03-dia-ly.md`): trời đêm `#0f1b3d`, đồng `#c8962d`, trúc `#2f7a5b`, đèn lồng `#d9433b`, giấy dó `#f3e6c4`.

Hệ thống không dùng lại biểu tượng, khung viền, phông hay hiệu ứng của game khác. Vị trí nút HUD theo thói quen thể loại (quyết định A.3); phần nhìn là của riêng dự án.

## 2. Nguyên tắc

1. **Đọc được trước, đẹp sau.** Mọi cặp chữ và nền đạt WCAG AA (4,5:1 với chữ thường, 3:1 với chữ lớn và viền thành phần). Hoa văn không nằm sau chữ.
2. **Một điểm nhấn đồng mỗi màn.** Mỗi màn chỉ có một nút chính. Các hành động khác dùng nút phụ hoặc nút chỉ có chữ.
3. **Không dùng màu làm tín hiệu duy nhất.** Nguyên tố có hình riêng, độ hiếm có số sao, trạng thái lỗi có biểu tượng và chữ.
4. **Vùng chạm tối thiểu 44×44 px**, kể cả khi đang bấm. Hiệu ứng bấm không thu nhỏ khung nút.
5. **Thiết kế cho màn ngang trước.** Tham chiếu 844×390. Cỡ chữ và cỡ nút HUD co theo chiều cao màn, luôn tôn trọng vùng an toàn hai bên.
6. **Chuyển động ngắn và có lý do.** Chuyển động chỉ dùng để báo phản hồi hoặc chỉ hướng. Khi hệ điều hành bật giảm chuyển động, mọi thời lượng về gần 0.
7. **Tiếng Việt đủ dấu.** Dòng cao tối thiểu 1,3 để dấu chồng (ặ, ẫ, ỡ) không chạm dòng trên. Không viết hoa toàn bộ câu dài.

## 3. Tokens

Tất cả có tiền tố `--tt-`. Code Canvas lấy giá trị từ `tokens.ts`. Test `design-system.test.ts` kiểm tra hai bản luôn khớp nhau và khớp màu nguyên tố trong `content/config.yaml`.

### 3.1. Màu

| Nhóm          | Token                                 | Giá trị                                    | Dùng cho                                              |
| ------------- | ------------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| Nền           | `bg`, `bg-deep`                       | `#0f1b3d`, `#0a1230`                       | Nền trang, ô nhập                                     |
| Bề mặt        | `surface-1/2/3`                       | `#16224a`, `#1d2b5a`, `#26366b`            | Thẻ, hàng danh sách, rãnh thanh trượt                 |
| Sơn mài       | `lacquer`                             | `#241018`                                  | Màn nhân vật, màn kết quả                             |
| Chữ           | `text`, `text-dim`, `text-faint`      | `#f3e6c4`, `#b8b2c9`, `#a9a6c4`            | Chữ chính, chữ phụ, chữ gợi ý và chữ ở trạng thái tắt |
| Viền          | `line`, `line-strong`                 | `#34457e`, `#7383c4`                       | Viền trang trí, viền thành phần (3:1)                 |
| Đồng          | `bronze`, `bronze-hi`, `bronze-lo`    | `#c8962d`, `#e2b453`, `#8c6418`            | Nhấn, nút chính                                       |
| Chữ trên đồng | `on-bronze`                           | `#1e1405`                                  | Chữ trên nút chính                                    |
| Trạng thái    | `ok`, `warn`, `bad`, `info`           | `#6fd39a`, `#f0b44c`, `#ff8a7a`, `#8cc4f0` | Thông báo, nhãn                                       |
| Nguy hiểm     | `danger`, `danger-hi`, `on-danger`    | `#9e2b26`, `#b8352e`, `#fff4e0`            | Nút xóa, nút hủy không hoàn tác                       |
| Báo mới       | `new`                                 | `#cc3a31`                                  | Chấm đỏ                                               |
| Giấy          | `paper`, `paper-ink`, `paper-ink-dim` | `#f3e6c4`, `#2b1d0e`, `#6a5030`            | Thư, bia đá                                           |

**Nguyên tố** (`--tt-el-<id>` và `--tt-el-<id>-2` cho màu sáng):

| Nguyên tố | id      | Màu       | Hình biểu tượng                                  |
| --------- | ------- | --------- | ------------------------------------------------ |
| Hỏa       | `fire`  | `#ff6a3d` | Đuốc ba lưỡi lửa trong khiên tròn đáy nhọn       |
| Thủy      | `water` | `#3aa6f5` | Giọt nước có vòng sóng trong hình tròn           |
| Phong     | `wind`  | `#45dfb1` | Ba nét gió cong như nét bút lông, không có khung |
| Lôi       | `bolt`  | `#b47bff` | Tia chớp hình vó ngựa trong hình thoi            |
| Thổ       | `earth` | `#e9b23a` | Khối vuông có mái vòm                            |
| Băng      | `ice`   | `#8fe1ff` | Bông tuyết sáu cánh khép trong lục giác          |
| Mộc       | `wood`  | `#7cc95a` | Chồi non mọc từ vòng gỗ                          |

Mộc chưa có trong `content/config.yaml`. Màu Mộc lấy theo đề xuất của S01 và đã được chủ dự án duyệt.

**Độ hiếm:** 3★ lam `#6fa8dc` trên nền `#172a4d`, 4★ tím `#ad8cf5` trên `#241c4d`, 5★ vàng `#f0c060` trên `#33240f`. Thẻ luôn hiện số sao, không chỉ dựa vào màu.

### 3.2. Chữ

- `--tt-font-display`: Cormorant Garamond 600/700. Chỉ dùng cho tiêu đề từ cỡ `lg` trở lên. Không dùng cho số hay chữ dưới 18 px.
- `--tt-font-body` và `--tt-font-num`: Be Vietnam Pro 400–800. Dùng cho nội dung, nút và số. Số liệu nên bật `font-variant-numeric: tabular-nums`.
- Thang cỡ chữ (`--tt-fs-xs` tới `--tt-fs-3xl`) dùng `clamp()` theo chiều cao màn. Ở 390 px cao, cỡ `md` khoảng 15 px; trên máy tính là 16 px.
- Dòng cao: `--tt-lh-tight` 1,3 cho tiêu đề và nút, `--tt-lh-body` 1,55 cho đoạn văn.

### 3.3. Khoảng cách, bo góc, đổ bóng

- Lưới 4 px: `--tt-sp-1` (4) tới `--tt-sp-12` (48).
- Vùng chạm: `--tt-touch` 44 px, `--tt-touch-lg` 52 px.
- Bo góc: `xs` 3, `sm` 6, `md` 10, `lg` 16, `pill`.
- Đổ bóng: `shadow-1/2/3` (đậm dần), `glow-bronze`, `glow-r4`, `glow-r5` (chỉ cho thẻ 5★ và nút đang chọn).

### 3.4. Vùng an toàn và cỡ HUD

- `--tt-safe-l/r/t/b` lấy `env(safe-area-inset-*)`, tối thiểu 12 px hai bên và 8 px trên dưới. Mọi lớp phủ toàn màn dùng các biến này làm padding.
- Cỡ nút HUD theo chiều cao màn, theo đề xuất trong `danh-gia-hien-trang.md`. Hàm `hudSize(vh)` trong `tokens.ts` cho Canvas:

| Token          | Công thức                   | Ở 390 px | Ở 900 px | Dùng cho                   |
| -------------- | --------------------------- | -------- | -------- | -------------------------- |
| `--tt-hud-xl`  | `clamp(64px, 18vh, 96px)`   | 70       | 96       | Nút Đánh                   |
| `--tt-hud-lg`  | `clamp(52px, 14.4vh, 76px)` | 56       | 76       | Kỹ năng, Nộ                |
| `--tt-hud-md`  | `clamp(44px, 11.8vh, 60px)` | 46       | 60       | Lướt, Nhảy, nút menu nhanh |
| `--tt-hud-gap` | `clamp(6px, 2vh, 14px)`     | 8        | 14       | Khoảng cách giữa các nút   |

### 3.5. Chuyển động

| Token              | Thời lượng | Dùng cho                        |
| ------------------ | ---------- | ------------------------------- |
| `--tt-dur-instant` | 80 ms      | Phản hồi khi bấm                |
| `--tt-dur-fast`    | 140 ms     | Rê chuột, đổi màu               |
| `--tt-dur-base`    | 220 ms     | Mở thông báo, chuyển tab        |
| `--tt-dur-slow`    | 360 ms     | Mở hộp thoại, đổi màn           |
| `--tt-dur-cine`    | 900 ms     | Khoảnh khắc ước nguyện, cảnh nộ |

Đường cong: `--tt-ease-out` cho hầu hết phản hồi, `--tt-ease-in` cho phần tử rời màn, `--tt-ease-inout` cho vòng lặp, `--tt-ease-settle` (vượt nhẹ rồi dừng, giống mặt trống rung) cho hộp thoại và công tắc.

## 4. Thành phần: khi nào dùng cái nào

Mỗi thành phần là một hàm TypeScript trả về phần tử DOM. Ví dụ:

```ts
import { button, openDialog } from "../ui/ds";
openDialog({
  title: "Dùng 160 Đá Sao?",
  body: "Bạn sẽ ước nguyện 1 lần.",
  ornate: true,
  actions: [button("Hủy"), button("Ước nguyện", { variant: "primary", icon: "uoc-nguyen" })],
});
```

Mọi thành phần có đủ các trạng thái: thường, rê chuột, đang bấm, tắt, đang tải và focus bàn phím (viền giấy dó 2 px, cách 2 px). Trang `/styleguide/` dùng các class `is-hover`, `is-active`, `is-focus` để ép từng trạng thái khi chụp ảnh. Code game không cần dùng các class này.

| Thành phần         | Hàm                                                 | Dùng khi                                                                                                | Không dùng khi                                       |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Nút chính          | `button(t, {variant:"primary"})`                    | Hành động chính của màn: Ước nguyện, Xác nhận, Bắt đầu                                                  | Có hai hành động ngang hàng; khi đó dùng hai nút phụ |
| Nút phụ            | `variant:"secondary"`                               | Hành động thay thế: Chi tiết, Hủy                                                                       |                                                      |
| Nút nguy hiểm      | `variant:"danger"`                                  | Hành động không hoàn tác: Xóa dữ liệu, Đặt lại                                                          | Chỉ để gây chú ý                                     |
| Nút chữ            | `variant:"ghost"`                                   | Thanh công cụ, hành động thứ ba                                                                         |                                                      |
| Nút biểu tượng     | `iconOnly:true`                                     | Đóng, quay lại, menu nhanh. Bắt buộc có nhãn để trình đọc màn hình đọc                                  | Hành động mà biểu tượng chưa đủ rõ nghĩa             |
| Đang tải           | `loading:true` / `setLoading()`                     | Chờ lưu hoặc chờ tải. Chữ giữ nguyên để nút không đổi cỡ                                                |                                                      |
| Chấm đỏ            | `badgeDot(el, n?)`                                  | Có mục chưa xem (thư, Ủy Thác xong, sự kiện mới)                                                        | Để quảng cáo. Mỗi màn tối đa 3 chấm                  |
| Khung tiền tệ      | `currency("da-sao"\|"xu", n, onAdd?)`               | Góc trên phải ở menu, màn ước nguyện, cửa hàng                                                          | Trên HUD khi đang đánh                               |
| Thanh tiến độ      | `progress(v, {kind, label, text})`                  | Máu (`hp`, tự đổi đỏ dưới 30%), kinh nghiệm, thể lực (`thin`), tải (`loading`)                          | Không có số đi kèm                                   |
| Tab                | `tabs(items, id, onChange)`                         | 2–5 mục cùng cấp trong một màn: Thuộc tính, Nét Sao, Bảo Ấn                                             | Điều hướng giữa các màn                              |
| Hộp thoại          | `openDialog()` / `dialogBox()`                      | Xác nhận, cảnh báo, phần thưởng. Esc hoặc bấm ra ngoài để đóng, focus trả về chỗ cũ                     | Nội dung dài; khi đó dùng màn riêng                  |
| Khung trống đồng   | `ornate:true`                                       | Khoảnh khắc lớn: xác nhận tiêu Đá Sao, nhận nhân vật, thắng boss                                        | Hộp thoại thường                                     |
| Thông báo nhanh    | `toast(msg, kind)`                                  | Phản hồi ngắn không cần trả lời: đã nhận, đã lưu, Bia Đá mở                                             | Lỗi cần người chơi xử lý; khi đó dùng hộp thoại      |
| Danh sách          | `list(items, onPick)`                               | Ủy Thác, thư, danh sách Lòng Sao, menu cài đặt                                                          | Lưới nhân vật hoặc vật phẩm                          |
| Ô nhập             | `field(label, {...})`                               | Đặt tên, nhập mã quà, cấu hình Admin. Nhãn luôn hiện                                                    |                                                      |
| Công tắc           | `toggle(label, on)`                                 | Bật/tắt có hiệu lực ngay (rung, hiện số sát thương)                                                     | Lựa chọn cần bấm Lưu                                 |
| Thanh trượt        | `slider(label, v)`                                  | Âm lượng, độ nhạy. Luôn hiện giá trị                                                                    | Giá trị cần chính xác; khi đó dùng ô nhập            |
| Huy hiệu nguyên tố | `elementBadge(id, {label})`                         | Ở mọi nơi hiện nguyên tố. Nếu không có chữ thì có `title` để trình đọc màn hình đọc                     |                                                      |
| Sao độ hiếm        | `stars(r)`                                          | Thẻ nhân vật, vật phẩm, kết quả ước nguyện                                                              |                                                      |
| Khung chân dung    | `portraitFrame(canvas, {...})`                      | Ô đội hình, danh sách bạn đồng hành, hộp thoại có người nói. `down:true` khi gục                        |                                                      |
| Thẻ nhân vật       | `charCard({...})`                                   | Lưới nhân vật, chọn đội. Thẻ hiện cấp và Nét Sao (N0–N6). Nhân vật chưa có hiện thành bóng đen kèm khóa |                                                      |
| Thẻ vật phẩm       | `itemCard({...})`                                   | Túi đồ, phần thưởng, nguyên liệu Khai Tinh                                                              |                                                      |
| Nhãn               | `tag(t, kind)`                                      | Trạng thái trong bảng Admin                                                                             |                                                      |
| Giấy dó            | class `tt-paper` + `tt-corners`                     | Thư, bia đá, nhật ký, trang truyện                                                                      | Màn có nhiều nút                                     |
| Sơn mài            | class `tt-lacquer`                                  | Nền màn nhân vật, màn kết quả                                                                           |                                                      |
| Phân cách          | `hr.tt-divider` (sóng), `.tt-divider-star` (có chữ) | Tách nhóm nội dung trong hộp thoại hoặc trang                                                           | Giữa từng hàng danh sách                             |

## 5. Ghi chú cho S09: HUD và nút Nhảy

- Dùng `actionButton(kind, opts)`. `kind` là `danh`, `ky-nang`, `no`, `luot` hoặc `nhay`.
- Cỡ nút: Đánh `xl`, Kỹ năng và Nộ `lg`, Lướt và Nhảy `md`. Khoảng cách giữa các nút dùng `--tt-hud-gap`. Ở 390 px cao, cụm nút gồm Đánh, Kỹ năng, Nộ, Lướt và Nhảy cần khoảng 200×200 px ở góc dưới phải. Hãy đặt Nhảy ngay trên hoặc bên phải nút Đánh, Lướt ở bên trái nút Nhảy, để ngón cái không phải duỗi qua nút Kỹ năng.
- Hồi chiêu: đặt `cooldown` (phần còn lại từ 1 về 0) và `seconds`. Code chỉ cần cập nhật `--cd` và chữ số mỗi khung hình, không phải tạo lại nút.
- Nộ: `energy` từ 0 đến 1 vẽ vòng ngoài; khi đầy, nút có class `is-ready` và phát sáng theo màu nguyên tố (`elColor`).
- Phím tắt (`key`) chỉ hiện trên thiết bị có chuột (`@media (hover: hover)`).
- Nút HUD có `touch-action: none`. Nhảy và Lướt cần bắt `pointerdown`, không bắt `click`, để phản hồi không bị trễ.
- Canvas (bản đồ nhỏ, số sát thương) lấy màu và cỡ chữ từ `tokens.ts`. `hudSize(innerHeight)` cho cỡ nút khi cần tính vùng chạm trong Canvas.
- Biểu tượng `nhay` là mũi tên thẳng đứng bật lên khỏi một vòng cung mặt đất. Hình này khác hẳn `luot` (các vạch nằm ngang lao về phía trước).

## 6. Ghi chú cho S10: đổi đội trên đảo và trang Admin

**Ô đội hình** `partySlot({...})` có bốn trạng thái:

| Trạng thái | Cách gọi        | Nhìn thấy                              |
| ---------- | --------------- | -------------------------------------- |
| Đang chọn  | `active:true`   | Viền đồng, nền đồng mờ, `aria-current` |
| Thường     |                 | Nền tối trong suốt, có số phím         |
| Gục        | `down:true`     | Chân dung xám, chữ "Gục" màu đỏ nhạt   |
| Trống      | không có `name` | Viền nét đứt, dấu cộng, chữ "Thêm"     |

Đổi đội trên đảo nên mở hộp thoại nhỏ (không phải màn riêng). Hộp thoại có lưới `charCard` và thẻ đang chọn có `aria-pressed`. Khi đổi xong, gọi `toast("Đã đổi đội", "ok")`.

**Trang `/admin/`** dùng các class `tt-admin`, `tt-admin-nav`, `tt-admin-main`, `tt-stats`/`tt-stat`, `tt-table`, `tt-kv` (bảng khóa và giá trị) và `tt-form-row` (nhóm ô nhập). Mẫu đầy đủ có ở mục "Bảng điều khiển" của `/styleguide/`. Trang Admin dày thông tin hơn giao diện game, chữ cỡ `sm`. Hàng bảng vẫn cao 44 px. Dưới 900 px, thanh bên thu lại chỉ còn biểu tượng.

## 7. Biểu tượng

66 biểu tượng tự vẽ trong `src/ui/icons/icons.ts`, chia thành 5 nhóm: nguyên tố, tiền tệ, menu, hành động, trạng thái. Danh sách đầy đủ và tên gọi có ở mục "Biểu tượng" của `/styleguide/`.

- Lưới 24×24, nét 1,75, đầu nét tròn. Biểu tượng chỉ dùng `currentColor`, không có màu cứng; test kiểm tra điều này.
- `icon(name, {size, title})` trả về phần tử SVG, còn `iconSvg()` trả về chuỗi. Khi không có `title`, biểu tượng có `aria-hidden` và được coi là hình trang trí. Biểu tượng đứng một mình phải có `title`, hoặc nằm trong nút có `aria-label`.
- Nguyên tố: mỗi nguyên tố khác nhau cả hình khung lẫn hình bên trong. Trong trang styleguide có hàng nguyên tố ở chế độ xám để kiểm tra khi không có màu.
- Thuật ngữ mới: biểu tượng `net-sao` (các sao nối thành nét chòm sao, dùng cho Nét Sao N0–N6) và `long-sao` (cửa vòm hai lớp như lối vào lòng đất, dùng cho Lòng Sao). Ủy Thác dùng `uy-thac`.
- Khi thêm biểu tượng: vẽ trên lưới 24×24, chừa lề 2 px, chỉ dùng `S()` (nét), `F()` (khối) và `Ci()` (tròn), đặt tên tiếng Việt không dấu nối bằng gạch ngang.

## 8. Khung trang trí

Toàn bộ là SVG nội tuyến trong CSS (`trang-tri.css`), không dùng ảnh bitmap, mỗi hoa văn dưới 1 KB:

- `tt-frame-drum`: viền đồng đôi, dải vành trống đồng ở mép trên và mặt trời ở đỉnh. Chỉ dùng cho khoảnh khắc quan trọng.
- `tt-corners` với 4 `span.tt-corner.tl/tr/bl/br`: hoa văn mây cuộn ở góc.
- `tt-divider`: đường sóng nước. `tt-divider-star`: đường đồng có chữ ở giữa.
- `tt-paper`: nền giấy dó có vân sợi (`feTurbulence`) và mép hơi ngả màu.
- `tt-lacquer`: nền sơn mài đen đỏ có vệt vàng mờ.

## 9. Trợ năng

- **Tương phản.** `PAIRS` trong `tokens.ts` liệt kê 124 cặp chữ và nền (chữ trên mọi nền tối, màu nguyên tố và màu độ hiếm trên nền, chữ trên nút, chữ trên giấy, viền thành phần). Unit test kiểm tra từng cặp. Trang styleguide hiện bảng tỉ lệ. Test e2e đo thêm màu chữ thật trên DOM ở hai cỡ màn.
- **Viền trang trí** (`--tt-line`, 1,85:1) chỉ dùng cho đường phân cách và khung không bấm được. Viền của ô nhập, công tắc và nút tắt dùng `--tt-line-strong` (≥ 3:1).
- **Trạng thái tắt** không làm mờ chữ dưới 4,5:1. Nút tắt có viền nét đứt, nền phẳng và con trỏ cấm.
- **Focus.** Mọi phần tử bấm được có viền focus `--tt-focus` 2 px. Tab chuyển bằng phím mũi tên. Hộp thoại đóng bằng Esc và trả focus về chỗ cũ.
- **Vùng chạm.** Tối thiểu 44 px. Nút "+" nhỏ trong khung tiền tệ cao 36 px nhưng có lớp đệm vô hình nới vùng chạm lên 44 px. Test e2e đo mọi nút, ô nhập, tab và công tắc.
- **Giảm chuyển động.** Khi người dùng bật `prefers-reduced-motion`, mọi thời lượng về 1 ms và vòng quay đang tải chạy chậm lại.
- **Màu.** Không dùng màu làm tín hiệu duy nhất (xem Nguyên tắc 3).

## 10. Trang `/styleguide/`

- Có sẵn khi chạy `pnpm dev`, mở `http://localhost:5173/styleguide/`.
- Khi build, trang chỉ có nếu đặt `STYLEGUIDE=1` (ví dụ `STYLEGUIDE=1 pnpm build`). `deploy.yml` bật biến này cho bản xem thử PR (`…/pr-preview/pr-<số>/styleguide/`). Bản `main` không có trang này.
- Thanh trên cùng có tab "Máy tính" và "Điện thoại 844×390". Tab điện thoại mở chính trang này trong khung 844×390 để xem bố cục màn ngang. Ngoài ra có nút mở hộp thoại thật và nút gửi thông báo thật.
- Ảnh chụp do test e2e tạo khi chạy `CHUP_ANH=1 pnpm test:e2e`: `docs/ux/anh/styleguide-may-tinh*.png`, `styleguide-dien-thoai*.png`, `styleguide-khung-dien-thoai.png`.
