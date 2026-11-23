# Chuẩn pixel cho nhân vật trên bản đồ (S25)

Game có hai lớp hình:

- **Trên bản đồ và khi chiến đấu:** chibi pixel art (tài liệu này).
- **Hội thoại, gacha, màn Nhân vật:** tranh anime chi tiết, đặt ở `public/media/portraits/<id>.png` (phiên khác làm). Chưa có ảnh thì dùng chân dung pixel phóng to tạm.

## 1. Khung và điểm neo

- Khung chuẩn **48×64 px**, đầu (tóc và mặt) khoảng 1/2 chiều cao.
- Điểm neo ở giữa chân: **(24, 62)**. `worldH` trong JSON là chiều cao nhìn thấy (px) để renderer đặt cỡ.
- Canvas 2D: vẽ phóng nguyên lần (×2, ×3) với `imageSmoothingEnabled = false`. 3D: texture lọc `NearestFilter`, không mipmap.

## 2. Màu và ánh sáng

- Viền tối 1 px, **không đen tuyền**: dùng tông tối nhất của từng vùng (tóc viền xanh đậm, da viền nâu hồng...).
- Mỗi vật liệu có 3 tông (sáng, gốc, tối). Ánh sáng từ **trên bên trái**.
- **16–24 màu mỗi nhân vật.** Script tự gộp màu hiếm vào màu gần nhất nếu vượt 24 (`limitPalette`).

## 3. Tám hướng

- Thứ tự: `s, se, e, ne, n, nw, w, sw`. Vẽ 5 hướng (`s, se, e, ne, n`), lật ngang ra 3 hướng còn lại.
- Khi lật, vũ khí cầm tay đổi tay (`swap`) để không sai tay. Nhân vật có chi tiết lệch dễ thấy thì vẽ đủ 8 hướng.

## 4. Bộ động tác (mọi động tác đủ 8 hướng)

| Động tác          | Khung | Ghi chú                          |
| ----------------- | ----- | -------------------------------- |
| `idle`            | 4     | Thở, lặp                         |
| `run`             | 8     | Lặp                              |
| `atk1`–`atk3`     | 5/5/6 | Khung `hit` nằm trong 100 ms đầu |
| `aim`, `shot`     | 4 + 4 | Ngắm (lặp) và nhả tụ lực         |
| `skill`           | 8     |                                  |
| `burst`           | 12    | Tư thế đặc trưng                 |
| `dash`            | 5     |                                  |
| `jumpUp/Air/Land` | 2/2/3 |                                  |
| `hurt`, `die`     | 3, 7  |                                  |

Nhịp chiến đấu giữ nguyên như bản cũ: logic bắn ngay khi bấm, nên khung "nhả dây" (`hit`) đặt sớm và các khung lấy đà được rút ngắn. Unit test kiểm tra điều này.

## 5. Định dạng file

- `public/media/sprites/<id>/sheet.png` + `sheet.json`: khung, thời lượng (`ms`), điểm neo, `hit`, `hurtbox`, vị trí từng khung theo hướng.
- `fx.png` + `fx.json`: hiệu ứng riêng (mũi tên, tuyết, vệt lướt, xoáy nộ).
- Tạo lại: `pnpm sprites` (đọc `content/characters/<id>.yaml`). Xem thử: `tools/sprites/preview.html`.

## 6. Nguồn dựng: búp bê pixel

- `tools/sprites/doll.ts` vẽ từng bộ phận (tóc sau, thân, áo, tay, chân, đầu, tóc trước, vũ khí) bằng lệnh hình học lên lưới màu, sau đó tự thêm viền và đổ bóng.
- `tools/sprites/poses.ts` định nghĩa tư thế từng khung (vị trí, góc của bộ phận). Chỉnh tư thế hay màu thì chạy lại `pnpm sprites`.
- Không dùng asset của game khác.

## 7. Định hướng phong cách: fantasy phi văn hóa

Nhân vật, NPC và quái mang phong cách fantasy chung như các game nhập vai thế giới mở lớn. Văn hóa vùng chỉ là **cảm hứng nhẹ** (họa tiết, màu, một chi tiết nhỏ), không mặc nguyên trang phục truyền thống.

| Nên                                                  | Không nên                                      |
| ---------------------------------------------------- | ---------------------------------------------- |
| Họa tiết sóng nhỏ ở viền áo, màu sơn mài đỏ đen      | Áo bà ba, khăn rằn, nón lá nguyên bản          |
| Áo khoác, áo choàng fantasy có một chi tiết gợi vùng | Áo dài, yếm, áo tứ thân đúng kiểu truyền thống |
| Phụ kiện kể chuyện (dây đếm người, ngọc nguyên tố)   | Đạo cụ lễ hội hay tôn giáo dùng y nguyên       |
| Bảng màu riêng mỗi nhân vật, đọc được ở cỡ 48×64     | Sao chép trang phục, họa tiết của game khác    |

Ví dụ: Hạ Vy theo mẫu của chủ dự án (áo khoác navy, viền vàng cam, cúc chữ X), giữ dây đếm ở cổ tay và ngọc Băng ở cổ áo.
