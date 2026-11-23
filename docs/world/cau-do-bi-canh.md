# Câu đố nguyên tố, bí cảnh và quest mini (S23)

Dữ liệu: `content/puzzles.yaml` (schema `src/data/puzzles-schema.ts`). Thưởng rương: `game.thuong.ruongCauDo` trong `content/economy.yaml`. Ảnh: [docs/ux/anh/s23/](../ux/anh/s23/).

## 1. Cách chơi

- Mọi đòn có nguyên tố của nhân vật đang ra sân đều gửi một **xung nguyên tố** lên vật thể ở gần: đánh thường, kỹ năng, nộ, đạn, vùng hiệu ứng, lướt.
- Mỗi vật thể có một chuỗi bước (`buoc`). Mỗi bước nhận một trong các nguyên tố ghi ở bước đó. `tat` là nguyên tố đưa vật thể về trạng thái đầu, ví dụ nước dập đèn.
- Vật thể có `giay` thì tự về trạng thái đầu sau N giây. Phải làm xong mọi vật thể cùng lúc mới giải được câu đố.
- Gió thổi lửa lan theo dây chuyền qua các đèn lồng kề nhau (`lan`, tính bằng px).
- Vật thể `chan` chặn đường cho tới khi giải xong. Vật thể `nang` (miệng gió) đẩy người chơi lên khi nhảy.
- **Gợi ý:** khi đến gần, ký hiệu nguyên tố trên vật thể phát sáng mờ. Đứng gần câu đố chưa giải quá `goiYSau` = 20 giây thì hiện gợi ý.
- **Khi giải xong:** có tiếng, vòng sáng và tên phản ứng: Bốc Hơi, Khuếch Tán, Tan Chảy, Đóng Băng, Quá Tải.

## 2. Loại vật thể

| Mã         | Tên            | Nguyên tố theo bước | Đặc tính                  | Trạng thái                 |
| ---------- | -------------- | ------------------- | ------------------------- | -------------------------- |
| `den`      | Đèn đá         | Hỏa                 | tắt bằng Thủy             | Tắt → Đang cháy            |
| `denLan`   | Đèn lồng gió   | Hỏa → Phong         | tắt bằng Thủy, lan 260 px | Tắt → Bùng sáng            |
| `gai`      | Bụi gai        | Hỏa                 | chặn đường                | Chắn đường → Đã cháy rụi   |
| `bangChan` | Tảng băng chắn | Hỏa                 | chặn đường                | Đóng băng → Đã tan         |
| `bon`      | Bồn đá cạn     | Thủy                | —                         | Cạn → Đầy nước             |
| `bonHoi`   | Bồn đá hơi     | Thủy → Hỏa          | —                         | Cạn → Bốc hơi nâng bệ      |
| `lua`      | Lửa chắn       | Thủy                | chặn đường                | Đang cháy → Đã dập         |
| `mam`      | Mầm cây khô    | Thủy                | —                         | Héo → Mọc cầu lá           |
| `cot`      | Bệ cột đá      | Thổ                 | —                         | Trống → Cột đá đè công tắc |
| `cau`      | Cầu gãy        | Thổ                 | —                         | Gãy → Đã vá                |
| `tuong`    | Tường đá nứt   | Thổ                 | chặn đường                | Nứt → Đã vỡ                |
| `coi`      | Cối gió        | Phong               | —                         | Đứng im → Đang quay        |
| `suong`    | Sương độc      | Phong               | chặn đường                | Che lối → Đã tan           |
| `luongGio` | Miệng gió      | Phong               | đẩy lên                   | Lặng → Gió đẩy lên         |
| `bangMat`  | Mặt nước sâu   | Băng/Thổ            | —                         | Sâu → Có lối qua           |
| `loiTru`   | Cột thu sấm    | Lôi/Hỏa             | —                         | Nguội → Lõi đồng rực sáng  |

## 3. Tách logic và phần vẽ (chuẩn bị cho renderer 3D ở S25)

- **Logic** nằm ở `src/world/puzzle-core.ts`. File này không phụ thuộc DOM hay canvas, và có unit test.
- **Cầu nối với game** là `src/world/puzzles.ts`: dựng câu đố, xử lý xung, lưu, thưởng.
- **Vẽ 2D** nằm ở `src/world/draw-puzzles.ts`. Renderer chỉ đọc dữ liệu vẽ:

- `objView(o, TS)` trả về `PObjView` cho từng vật thể:
  - Định danh: `id`, `cauDo`, `loai`.
  - Trạng thái: `trangThai` / `soTrangThai`, `nhan`, `xong`.
  - Vị trí: ô lưới `o`, tọa độ thế giới `x`, `y`, độ cao `tang` (bậc, lấy từ lớp `h`), hướng `huong` (`n`/`s`/`e`/`w`, khai báo trong `vatThe[].huong`, mặc định `s`).
  - Gợi ý: `bieuTuong`, `canNguyenTo`.
  - Đặc tính: `chan`, `nang`.
  - Hiệu ứng: `henGio` (0..1), `loe`.
- `puzzleViews(map)` trả về toàn bộ vật thể, NPC quest mini và cửa bí cảnh (kèm cờ `mo`) dưới dạng dữ liệu thuần, chuyển được sang JSON.

Renderer 3D chỉ cần đọc `puzzleViews()` mỗi khung hình. Không phải sửa logic.

## 4. Đặt trên bản đồ

`genWorld()` gọi `placePuzzles()` để đặt câu đố có `dat` (hướng `goc` tính bằng độ từ tâm đảo, khoảng cách `banKinh` tính bằng ô). Hàm tìm ô đất gần nhất mà người chơi đi tới được, cách các điểm mốc khác, rồi dọn một khoảnh nhỏ. Kết quả cố định theo seed, câu đố rải đều bốn góc đảo. Phòng câu đố trong bí cảnh thì không có `dat`.

## 5. Câu đố

| Mã                    | Tên                    | Vùng                   | Kiểu        | Bắt buộc | Rương  | Vật thể             | Cách thay thế                                                                                                                                       |
| --------------------- | ---------------------- | ---------------------- | ----------- | -------- | ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `den-canh-ven-bien`   | Bốn Đèn Canh Ven Biển  | Làng Vạn Lưới          | don         | Có       | Thường | 4× `den`            | —                                                                                                                                                   |
| `ruong-kho`           | Ruộng Khô Đầu Làng     | Làng Vạn Lưới          | don         | Có       | Thường | 3× `mam`            | —                                                                                                                                                   |
| `bac-da-vong-van`     | Bậc Đá Lên Đài Đếm Sao | Đỉnh Vọng Vân          | don         | Có       | Thường | 3× `cot`            | —                                                                                                                                                   |
| `coi-gio-bom-nuoc`    | Cối Gió Bơm Nước       | Bến Sông Sương         | don         | Có       | Thường | 2× `coi`            | —                                                                                                                                                   |
| `den-mo-thu-bay`      | Đèn Mỏ Thứ Bảy         | Mỏ Ngọc Lòng Chảo      | don         | Có       | Thường | 7× `den`            | —                                                                                                                                                   |
| `gai-truc-may`        | Lối Gai Rừng Trúc      | Rừng Trúc Mây          | don         | Có       | Thường | 3× `gai`            | —                                                                                                                                                   |
| `lua-hang-den`        | Lửa Chắn Hàng Đèn      | Phố Vạn Đăng           | don         | Có       | Thường | 3× `lua`            | —                                                                                                                                                   |
| `cau-gay-song-suong`  | Cầu Gãy Sông Sương     | Bến Sông Sương         | don         | Có       | Thường | 2× `cau`            | —                                                                                                                                                   |
| `suong-doc-vinh-khoi` | Sương Độc Vịnh Khơi    | Vịnh Khơi và Làng Chìm | don         | Có       | Thường | 3× `suong`          | —                                                                                                                                                   |
| `bang-bo-ho`          | Sương Giá Bờ Hồ        | Hồ Gương và Đền Trăng  | don         | Có       | Thường | 3× `bangChan`       | —                                                                                                                                                   |
| `hoi-nong-be-da`      | Hơi Nóng Nâng Bệ       | Hồ Gương và Đền Trăng  | ket-hop     | Có       | Quý    | 2× `bonHoi`         | —                                                                                                                                                   |
| `gio-lan-lua-dinh`    | Gió Lan Lửa Đình       | Đình Trống Đồng        | ket-hop     | Có       | Quý    | 5× `denLan`         | —                                                                                                                                                   |
| `may-chan-tuong-nut`  | Mây Chắn Tường Nứt     | Trại Bắc               | ket-hop     | Có       | Quý    | `suong`, 2× `tuong` | —                                                                                                                                                   |
| `mat-nuoc-dong`       | Mặt Nước Đông          | Hồ Gương và Đền Trăng  | don         | Tùy chọn | Quý    | 2× `bangMat`        | Hạ Vy (Băng, nhận miễn phí qua quest "Sương Giá Bờ Hồ") làm đông mặt nước. Không dùng Băng thì đòn Thổ của Ngọc Thạch dựng bậc đá qua chỗ nước sâu. |
| `cot-thu-sam`         | Cột Thu Sấm            | Đỉnh Vọng Vân          | don         | Tùy chọn | Quý    | 2× `loiTru`         | Không có nhân vật Lôi thì dùng đòn Hỏa (Mai Linh) nung đỏ lõi đồng.                                                                                 |
| `cua-lo-den`          | Cửa Lò Đèn             | Phố Vạn Đăng           | cua-bi-canh | Có       | —      | 2× `den`            | —                                                                                                                                                   |
| `cua-gieng-trang`     | Cửa Giếng Trăng        | Hồ Gương và Đền Trăng  | cua-bi-canh | Có       | —      | 2× `bon`            | —                                                                                                                                                   |
| `cua-ham-ngoc`        | Cửa Hầm Ngọc Cũ        | Mỏ Ngọc Lòng Chảo      | cua-bi-canh | Có       | —      | `tuong`             | —                                                                                                                                                   |
| `cua-hang-gio`        | Cửa Hang Gió           | Rừng Trúc Mây          | cua-bi-canh | Có       | —      | 2× `coi`            | —                                                                                                                                                   |
| `lo-den-bang`         | Gian Băng Đọng         | Lò Đèn Phố Cũ          | phong       | Có       | —      | 2× `bangChan`       | —                                                                                                                                                   |
| `lo-den-gai`          | Gian Dây Leo Khô       | Lò Đèn Phố Cũ          | phong       | Có       | —      | `gai`, 2× `den`     | —                                                                                                                                                   |
| `gieng-trang-lua`     | Gian Dầu Cháy          | Giếng Đền Trăng        | phong       | Có       | —      | 2× `lua`            | —                                                                                                                                                   |
| `gieng-trang-mam`     | Gian Cầu Lá            | Giếng Đền Trăng        | phong       | Có       | —      | 2× `mam`            | —                                                                                                                                                   |
| `ham-ngoc-cot`        | Gian Công Tắc Đá       | Hầm Ngọc Cũ            | phong       | Có       | —      | 2× `cot`            | —                                                                                                                                                   |
| `ham-ngoc-cau`        | Gian Vực Ngọc          | Hầm Ngọc Cũ            | phong       | Có       | —      | `cau`               | —                                                                                                                                                   |
| `hang-gio-suong`      | Gian Mây Đặc           | Hang Gió Trúc Mây      | phong       | Có       | —      | 2× `suong`          | —                                                                                                                                                   |
| `hang-gio-nang`       | Gian Gió Ngược         | Hang Gió Trúc Mây      | phong       | Có       | —      | `luongGio`, `coi`   | —                                                                                                                                                   |

## 6. Bí cảnh

Mỗi bí cảnh có cửa nằm trên Đảo Lạc, mở bằng một câu đố. Bên trong là bản đồ 110×110 ô dùng chung bộ vẽ và va chạm với đảo, gồm sảnh, 2–3 phòng câu đố, 1 phòng đánh và phòng rương. Giải xong phòng nào thì cửa phòng kế tiếp mới mở. Tiến độ phòng được lưu. Cả đội gục thì hồi sinh ở sảnh. Ra cửa thì về lại chỗ cửa bí cảnh trên đảo.

| Mã                  | Tên               | Vùng                  | Nguyên tố | Câu đố mở cửa     | Phòng câu đố                         | Rương cuối |
| ------------------- | ----------------- | --------------------- | --------- | ----------------- | ------------------------------------ | ---------- |
| `lo-den-pho-cu`     | Lò Đèn Phố Cũ     | Phố Vạn Đăng          | Hỏa       | `cua-lo-den`      | `lo-den-bang`, `lo-den-gai`          | Tinh xảo   |
| `gieng-den-trang`   | Giếng Đền Trăng   | Hồ Gương và Đền Trăng | Thủy      | `cua-gieng-trang` | `gieng-trang-lua`, `gieng-trang-mam` | Tinh xảo   |
| `ham-ngoc-cu`       | Hầm Ngọc Cũ       | Mỏ Ngọc Lòng Chảo     | Thổ       | `cua-ham-ngoc`    | `ham-ngoc-cot`, `ham-ngoc-cau`       | Tinh xảo   |
| `hang-gio-truc-may` | Hang Gió Trúc Mây | Rừng Trúc Mây         | Phong     | `cua-hang-gio`    | `hang-gio-suong`, `hang-gio-nang`    | Tinh xảo   |

## 7. Quest mini

- Nói chuyện với NPC để mở hộp thoại (3–8 dòng). Hộp thoại là lớp phủ riêng, không đụng bố cục HUD.
- Giải xong các câu đố của quest thì nhận thưởng một lần.
- Quest hiện trong menu Nhiệm vụ, có điểm đánh dấu trên bản đồ nhỏ và bản đồ lớn.

| Mã                | Tên                    | NPC            | Vùng                   | Câu đố                | Đá Sao | Xu   | Tặng      |
| ----------------- | ---------------------- | -------------- | ---------------------- | --------------------- | ------ | ---- | --------- |
| `mq-den-canh`     | Bốn Đèn Canh Ven Biển  | Bà Hạnh        | Làng Vạn Lưới          | `den-canh-ven-bien`   | 10     | 1000 | —         |
| `mq-ruong-kho`    | Ruộng Khô Đầu Làng     | Út Gạo         | Làng Vạn Lưới          | `ruong-kho`           | 10     | 1000 | —         |
| `mq-bac-da`       | Bậc Đá Lên Đài Đếm Sao | Đầu Sổ Kỳ Lam  | Đỉnh Vọng Vân          | `bac-da-vong-van`     | 10     | 1000 | —         |
| `mq-coi-gio`      | Cối Gió Bơm Nước       | Hai Khoác      | Bến Sông Sương         | `coi-gio-bom-nuoc`    | 10     | 1000 | —         |
| `np_08`           | Đèn Mỏ Thứ Bảy         | Ông Đinh Bảo   | Mỏ Ngọc Lòng Chảo      | `den-mo-thu-bay`      | 25     | 1500 | ngocthach |
| `mq-gai-truc`     | Lối Gai Rừng Trúc      | Bé Sen         | Rừng Trúc Mây          | `gai-truc-may`        | 10     | 1000 | —         |
| `mq-lua-hang-den` | Lửa Chắn Hàng Đèn      | Bà Ngoan       | Phố Vạn Đăng           | `lua-hang-den`        | 10     | 1000 | —         |
| `mq-cau-gay`      | Cầu Gãy Sông Sương     | Ông Sáo        | Bến Sông Sương         | `cau-gay-song-suong`  | 10     | 1000 | —         |
| `mq-suong-doc`    | Sương Độc Vịnh Khơi    | Lão Neo        | Vịnh Khơi và Làng Chìm | `suong-doc-vinh-khoi` | 10     | 1000 | —         |
| `mq-hoi-nong`     | Hơi Nóng Nâng Bệ       | Bà Cả Thu Vọng | Hồ Gương và Đền Trăng  | `hoi-nong-be-da`      | 10     | 1000 | —         |
| `mq-gio-lan`      | Gió Lan Lửa Đình       | Thầy Đồ Khiêm  | Đình Trống Đồng        | `gio-lan-lua-dinh`    | 10     | 1000 | —         |
| `mq-may-chan`     | Mây Chắn Tường Nứt     | Cai Tôn        | Trại Bắc               | `may-chan-tuong-nut`  | 10     | 1000 | —         |
| `mq-ha-vy`        | Sương Giá Bờ Hồ        | Bà Tám Lụa     | Hồ Gương và Đền Trăng  | `bang-bo-ho`          | 10     | 1000 | havy      |

## 8. Nguyên tắc công bằng (có kiểm tra tự động)

- **Đội khởi đầu đủ cho mọi câu đố bắt buộc trừ Thổ:** Sương Mai (Thủy), Mai Linh (Hỏa), Bạch Vũ (Phong). Câu đố bắt buộc gồm cửa bí cảnh, phòng bí cảnh và quest mini.
- **Thổ miễn phí:** Ngọc Thạch (4★ Thổ) nhận qua quest `np_08` "Đèn Mỏ Thứ Bảy". Quest này chỉ cần Hỏa để thắp bảy đèn. Trước khi có Ngọc Thạch, câu đố Thổ hiện "Cần sức mạnh của đất" và không chặn đường chính.
- **Băng miễn phí:** Hạ Vy (4★ Băng) nhận qua quest `mq-ha-vy` "Sương Giá Bờ Hồ" ở Hồ Gương, đặt sớm, chỉ cần Hỏa.
- **Băng và Lôi chỉ dùng cho câu đố tùy chọn,** và luôn có cách giải bằng nguyên tố cơ bản:
  - `mat-nuoc-dong`: Băng, hoặc Thổ.
  - `cot-thu-sam`: Lôi, hoặc Hỏa.
- **Không câu đố nào cần nhân vật 5★.**

`validatePuzzles` (dùng trong `pnpm content:check`) và `tests/unit/puzzles.test.ts` kiểm tra những điều trên bằng bộ giải `solvableWith`.

## 9. Lưu, thưởng, Admin

- **Save:** trường `puz`, gồm `solved`, `talked`, `mini` và `domains` (`room`, `done`). Save cũ chưa có trường này được bổ sung khi tải. Dữ liệu hỏng bị lọc. Số phòng bị kẹp theo số phòng thật của bí cảnh.
- **Thưởng:** rương câu đố và bí cảnh lấy số từ `ruongCauDo`. Quest mini lấy số từ `thuong`. Mỗi thứ chỉ nhận một lần. Tổng Đá Sao được ghi ở `thietKe.thuNhap.cauDo` và `pnpm content:check` đối chiếu với nội dung. Mô phỏng chia đều tổng này trong `trongSoNgay` ngày đầu.
- **Admin:** mục "Câu đố, bí cảnh" trong `/admin/` để xem trạng thái và reset từng câu đố, quest, bí cảnh hoặc reset toàn bộ. Reset không thu lại phần thưởng hay nhân vật đã nhận.

## 10. Ghi chú cho S25

S23 đã thêm quest nhận Hạ Vy (`mq-ha-vy`, Bà Tám Lụa, bờ đông Hồ Gương, câu đố `bang-bo-ho`). S25 không làm lại quest này. S23 không đổi màu hay ngoại hình Hạ Vy.
