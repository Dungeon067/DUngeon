# Vũ khí: hình ảnh, trang bị, banner Binh Khí Tinh Tú (S24)

Số liệu theo S19 (`docs/economy/`, `content/economy.yaml: thietKe.vuKhi`). Tên, bị động và truyện ngắn lấy từ content.

## 1. Hình ảnh

| Bước         | Lệnh / tệp                                                                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Danh sách    | `pnpm exec tsx tools/blender/weapons/xuat-danh-sach.ts > danh-sach.json` (đọc `content/weapons.yaml`, nếu chưa có thì `content/economy.yaml`)            |
| Dựng, render | `blender -b -P tools/blender/weapons/render.py -- --list danh-sach.json --out raw/ --samples 128` (Blender 5.x, Cycles CPU, ~15 giây mỗi vũ khí ở 1024²) |
| Hậu kỳ       | `tools/blender/weapons/hau-ky.sh raw/ media/weapons danh-sach.json public/weapons` (ImageMagick, có WebP)                                                |

- `lib.py`: cảnh, vật liệu PBR thủ tục (thép có vân tôi và cạnh mài, đồng cũ, đá quý, vải, gỗ), đèn studio, máy quay trực giao góc chéo 45°, nền trong suốt, lần render thứ hai chỉ lấy phần phát sáng.
- `models.py`: bộ dựng theo loại (kiếm, đại kiếm, thương, cung, pháp khí dạng sách, đèn, ngọc bội, chuông, nghiên, thiên cầu, hoa trong băng). `designs.py`: màu, hoa văn, chi tiết theo từng id, lấy ý từ truyện của vũ khí và vùng đất trong `docs/world`.
- 5★ cầu kỳ, có phát sáng; 4★ vừa phải; 3★ thép trơn, không phát sáng. Cả 26 vũ khí đều render 3D, không dùng SVG.
- Ảnh không có chữ, không có watermark. Khung độ hiếm (3★ xanh, 4★ tím, 5★ vàng) vẽ bằng CSS trong game; bản icon có khung ở `media/weapons/<id>-icon*.png`.
- `media/weapons/` (Git LFS): `<id>.png` 1024² nền trong suốt, `<id>-icon.png` có khung, bản 256/128 PNG và WebP. `public/weapons/`: WebP 512/256/128 game tải; thiếu ảnh thì hiện biểu tượng loại vũ khí.

![Bảng ghép icon](../../media/weapons/bang-ghep.png)

## 2. Hệ trang bị

| Phần       | Quy tắc                                                                                                                                       | Mã                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Kho        | `Profile.weapons` theo uid (`id`, `lv`, `exp`, `khai`, `tl`, `lock`); mỗi nhân vật giữ `vk` (uid đang cầm)                                    | `src/server/types.ts`                |
| Trang bị   | Đúng loại vũ khí của nhân vật, mỗi bản chỉ một người cầm. Vũ khí đang ở người khác thì hỏi xác nhận rồi đổi chéo                              | `equipWeapon`                        |
| Cấp        | 1–60, giới hạn theo đột phá 20/30/40/45/50/55/60 (khớp Khai Tinh nhân vật để giữ cân bằng S19). Chỉ số ở cấp 1 bằng 20% cấp tối đa, tăng đều  | `thietKe.vuKhi.cap`, `weaponLvScale` |
| Nâng cấp   | Quặng Tinh Luyện 3 bậc và vũ khí khác; tốn Xu theo kinh nghiệm thực nhận. Vũ khí khóa hoặc đang trang bị không dùng được; 4★/5★ phải xác nhận | `upgradeWeapon`, `ascendWeapon`      |
| Tinh luyện | R1–R5 bằng bản trùng; bị động tăng `buocTinhLuyen` mỗi bậc                                                                                    | `refineWeapon`                       |
| Lò Rèn     | Vũ khí 4★ nguồn `loRen`: 8 Phôi Lòng Sao + 20.000 Xu một bản                                                                                  | `forgeWeapon`, `thietKe.vuKhi.loRen` |
| Chỉ số     | Tấn công %, chỉ số phụ và bị động cộng qua `charStats`, nên Chiến Lực và chiến đấu tự cập nhật                                                | `src/economy/core.ts`, `investOf`    |
| Save       | `ensureWeapons` chạy sau mọi bước chuyển phiên bản: thiếu kho thì tạo kèm nguyên liệu khởi đầu, nhân vật thiếu vũ khí hợp lệ nhận 3★ mặc định | `src/server/server.ts`               |

Banner nhân vật: lượt 3★ giờ cho một vũ khí 3★ ngẫu nhiên (vẫn +500 Xu); lượt 4★ không đổi nên `economy:sim` không đổi.

## 3. Màn hình

| Màn         | Nội dung                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nhân vật    | Thanh chọn nhanh bên trái, nhân vật lớn ở giữa (vuốt hoặc ←/→ đổi người), cột thẻ dọc bên phải: Thuộc Tính, Vũ Khí, Bảo Ấn (Sắp có), Nét Sao, Kỹ Năng, Hồ Sơ |
| Thẻ Vũ Khí  | Ảnh lớn, tên, độ hiếm, cấp/giới hạn, R, chỉ số, bị động 5 bậc (bậc hiện tại sáng), truyện; nút Thay, Nâng Cấp, Tinh Luyện                                    |
| Thay vũ khí | Danh sách cùng loại bên trái, so sánh Chiến Lực và chỉ số (xanh tăng, đỏ giảm), nút Trang Bị                                                                 |
| Kho vũ khí  | Lưới icon, lọc theo loại / độ hiếm / đang dùng, sắp xếp theo độ hiếm, cấp, tinh luyện; khóa; vào Lò Rèn                                                      |
| Ước nguyện  | Chọn banner Tinh Tú Giáng Thế hoặc Binh Khí Tinh Tú; La Bàn Sao chọn 1 trong 2 vũ khí nổi bật; Bảo Hộ Vận Sao và lịch sử riêng; nút "Mua Đá Sao · chưa mở"   |
| Admin       | Ước nguyện: chọn đôi vũ khí nổi bật, tỉ lệ 5★/4★, lượt tăng tỉ lệ, lượt chắc chắn, giá. Đổi đôi nổi bật thì xóa La Bàn Sao và bảo đảm 75/25                  |

Điều khiển giữ như S10: Q/E đổi thẻ, ←/→ đổi nhân vật, tay cầm dùng D-pad + A, cảm ứng chạm. Chuyển thẻ có hiệu ứng trượt mờ và tiếng bấm (khi bật âm thanh). Kết quả ước dùng ảnh vũ khí trong hoạt ảnh dự phòng S10.

Ảnh chụp ở `anh/s24/` (844×390, 1180×820, 1920×1080).
