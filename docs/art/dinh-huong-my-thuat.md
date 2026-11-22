# Định hướng mỹ thuật nhân vật (bản nháp, chờ chủ dự án chọn)

Tài liệu này là "kinh thánh mỹ thuật" cho nhân vật của Tinh Tú Ước Nguyện. Nhân vật được dựng 3D bằng Blender, rồi render thành khung hình 2D cho mọi động tác. Tranh lớn, chân dung và biểu cảm hội thoại cũng render từ chính mô hình đó, nên một nhân vật chỉ có một nguồn hình duy nhất.

Ảnh mẫu nằm ở [`mau/`](mau/), dựng nhanh từ Lạc Hồng (`content/characters/lachong.yaml`). Chỗ nào ghi **[Chờ chọn]** là chỗ chủ dự án cần quyết.

## 1. Phong cách nhân vật

- **Anime tô màu phẳng (toon shading).** Mỗi vùng màu chỉ có 2 hoặc 3 mảng sáng tối, ranh giới sắc nét, không chuyển sắc mịn. Màu bóng ngả về tím chàm (`#3b2a5a`) thay vì chỉ tối đi, để hình không bị đục khi đặt lên nền cỏ xanh của bản đồ.
- **Mặt gần như không đổ bóng.** Da mặt dùng ngưỡng bóng thấp hơn thân, chỉ rìa xa đèn mới tối. Mắt, lông mày và miệng là texture vẽ bằng code (`tools/art/mat.ts`), không phải khối 3D, nên luôn giữ nét 2D.
- **Có viền tối** `#1c1222` (đen ngả tím, không dùng đen tuyền).
- **Hình khối rõ để đọc ở 128px:** đầu và tóc là khối lớn nhất, áo ngoài có màu đậm tương phản với áo trong sáng, vũ khí có lưỡi sáng.

### 1.1. Tỉ lệ cơ thể [Chờ chọn]

| Phương án | Tranh lớn, chân dung | Sprite trong game                       | Ưu điểm                                                            | Nhược điểm                                                          |
| --------- | -------------------- | --------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **A**     | 1:5,5                | Cùng mô hình 1:5,5                      | Một mô hình, một rig, ít việc nhất; hình trong game khớp tranh lớn | Ở 128px mặt nhỏ, khó đọc biểu cảm                                   |
| **B**     | 1:6                  | Bản đầu to 1:4 dựng lại từ cùng tham số | Tranh lớn thanh hơn; sprite đầu to đọc rõ mặt và tóc               | Mỗi nhân vật có 2 bản dựng (cùng script, cùng rig), phải kiểm 2 lần |

Ảnh: [`01-ti-le.png`](mau/01-ti-le.png), [`06-huong-a.png`](mau/06-huong-a.png), [`07-huong-b.png`](mau/07-huong-b.png), [`08-trong-game.png`](mau/08-trong-game.png).

Đề xuất của Devin: **B**. Hình chibi cũ đã quen mắt người chơi với đầu to; bản 1:4 giữ cảm giác đó mà vẫn có tranh lớn đẹp. Chi phí thêm chỉ là một tham số `heads` khi render.

### 1.2. Số tầng bóng [Chờ chọn]

- **2 tầng** (sáng, tối): sạch, giống tranh hoạt hình truyền hình, đọc tốt nhất ở cỡ nhỏ.
- **3 tầng** (sáng, tối, tối sâu ở hốc nách, dưới cằm, nếp áo): có chiều sâu hơn ở tranh lớn.

Ảnh: [`02-tang-bong.png`](mau/02-tang-bong.png). Đề xuất: 3 tầng cho tranh lớn và chân dung, 2 tầng cho sprite (một công tắc trong `STYLE`).

### 1.3. Kiểu viền [Chờ chọn]

- **Vỏ đảo ngược** (inverted hull): nhân bản lưới, phình ra, lật pháp tuyến, chỉ vẽ mặt sau. Nhanh, ổn định giữa các khung hình, độ dày theo không gian 3D.
- **Freestyle**: Blender vẽ nét theo đường bao và nếp gấp sau khi render. Nét đều như vẽ tay, có nét gấp bên trong (nếp áo, tóc), nhưng render chậm hơn và nét có thể nhấp nháy giữa các khung.

Ảnh: [`03-vien.png`](mau/03-vien.png). Đề xuất: vỏ đảo ngược cho sprite (ổn định khi chạy hoạt ảnh), Freestyle cho tranh lớn nếu chủ dự án thích nét vẽ tay.

## 2. Ánh sáng

- **Đèn chính chiếu từ trên bên trái**, hơi ra phía trước (hướng đã cố định trong shader, tính theo máy quay nên xoay nhân vật 4 hướng thì bóng vẫn đổ cùng phía trên màn hình). Màu kem ấm `#fff4e6`.
- **Đèn viền (rim light) theo nguyên tố:** một dải sáng mảnh ở mép bên phải và mép trên của hình, màu nguyên tố của nhân vật. Lạc Hồng là Hỏa nên viền cam `#ff6a3d`. Ảnh: [`04-den-vien.png`](mau/04-den-vien.png).
- **Tranh lớn** (giai đoạn 2): thêm nền chuyển sắc theo màu phụ của nguyên tố và đèn viền mạnh hơn.
- Tham số nằm trong `STYLE` ở `media/characters/base/ttart/toon.py`; khi S20 (video Blender) có bảng ánh sáng, hai bên sẽ dùng chung giá trị.

## 3. Màu và biểu tượng của 7 nguyên tố

Màu lấy từ `content/config.yaml`, ý nghĩa và biểu tượng từ [`docs/world/01-vu-tru-va-sao.md`](../world/01-vu-tru-va-sao.md). Màu chính dùng cho đèn viền và Tinh Văn, màu phụ cho lõi sáng của Tinh Văn và hiệu ứng.

| Nguyên tố | Màu chính           | Màu phụ             | Biểu tượng (dùng làm hình Tinh Văn) |
| --------- | ------------------- | ------------------- | ----------------------------------- |
| Hỏa       | `#ff6a3d`           | `#ffc08a`           | Ngọn đuốc ba lưỡi                   |
| Thủy      | `#3aa6f5`           | `#a6dcff`           | Giọt nước có vòng sóng              |
| Phong     | `#45dfb1`           | `#bdf6e4`           | Ba nét cong như nét bút lướt        |
| Lôi       | `#b47bff`           | `#e0c8ff`           | Vó ngựa hình tia chớp               |
| Thổ       | `#e9b23a`           | `#f8de98`           | Hình vuông có mái vòm               |
| Băng      | `#8fe1ff`           | `#e6f9ff`           | Bông tuyết sáu cánh khép kín        |
| Mộc       | `#7cc95a` (đề xuất) | `#d3f2b8` (đề xuất) | Chồi non mọc từ vòng gỗ             |

## 4. Tinh Văn trên mô hình

Theo `01-vu-tru-va-sao.md`, Tinh Văn là hoa văn sáng như một chòm sao nhỏ, thường ở cổ tay, vai hoặc sau gáy, và thêm một nét ở mỗi Nét Sao.

- **Hình:** các điểm sao nối bằng nét mảnh theo dáng biểu tượng nguyên tố (bảng mục 3). N0 có 3 điểm; mỗi Nét Sao thêm 1 điểm và 1 nét, N6 thành chòm hoàn chỉnh.
- **Vị trí:** ghi trong `media/characters/<id>/dung.yaml` (cổ tay, vai hoặc gáy). Lạc Hồng: mu bàn tay trái, cạnh tay cầm kiếm để thấy rõ khi vung.
- **Cách dựng:** mặt phẳng nhỏ bám da, vật liệu phát sáng (emission) màu chính, lõi màu phụ, không nhận bóng, không có viền. Khi tung kỹ năng hoặc nộ, độ sáng tăng (khung hiệu ứng ghi trong JSON hoạt ảnh).
- **Ảnh mẫu hiện tại** dùng ngôi sao bốn cánh làm chỗ giữ; hình chòm sao theo biểu tượng làm ở giai đoạn 2.

## 5. Bảng màu và hoa văn từng vùng

Bảng màu lấy từ [`docs/world/03-dia-ly.md`](../world/03-dia-ly.md). Quy tắc dùng cho trang phục:

- **Màu nền áo** lấy từ `look.outfit` của nhân vật; vùng quê chỉ quyết **màu viền, đai và hoa văn**, để nhân vật cùng vùng vẫn phân biệt được với nhau.
- Hoa văn là **họa tiết gợi cảm hứng**, vẽ lại bằng code (texture SVG), không chép mẫu hoa văn có bản quyền hoặc mang ý nghĩa tôn giáo đang thờ.
- Mỗi trang phục tối đa 1 hoa văn chính và 1 hoa văn phụ, để ở 128px không bị rối.

| Vùng (cảm hứng)                | Bảng màu                                          | Trang phục gợi ý                                       | Hoa văn chính                                                 |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| Đảo Lạc (Việt Nam)             | `#0f1b3d` `#c8962d` `#2f7a5b` `#d9433b` `#f3e6c4` | Áo tứ thân, áo dài cổ, khăn vấn, nón lá                | Vòng tròn đồng tâm và chim bay kiểu mặt trống đồng, sóng nước |
| Lũng Vân (Trung Hoa cổ)        | `#b8312f` `#1f3b4d` `#e8dcc0` `#6b8f71` `#d4a640` | Áo giao lĩnh tay rộng, áo bào lụa, đai vải dài         | Mây cuộn, khung cửa song, nét bút lông                        |
| Shizukane (Nhật Bản)           | `#f4f7fb` `#2e3a59` `#8aa9c1` `#b23a48` `#e6c6d6` | Áo nhiều lớp mùa đông, áo khoác bông, ủng rơm          | Bông tuyết sáu cánh hình học, vảy sóng lặp                    |
| Purunae (Hàn Quốc)             | `#2f5d50` `#9cc5b0` `#b5432a` `#f2ead3` `#e8b04a` | Áo ngắn và váy dài phồng, áo khoác ngắn                | Hoa văn men ngọc khảm, cành thông, mây tròn                   |
| Golbaran (Ba Tư, Trung Đông)   | `#1e6f8f` `#2aa198` `#d9a441` `#8e2c3a` `#f1e3c6` | Áo dài tay rộng, áo choàng mỏng chống cát, khăn đội    | Gạch men hình sao tám cánh, dây lá cuộn                       |
| Marevia (La Mã, Địa Trung Hải) | `#f2efe6` `#b5482c` `#6b2d5c` `#c9a227` `#2c5e8a` | Áo choàng quấn, áo tunic, trâm cài, dép buộc dây       | Viền gấp khúc (meander), lá nguyệt quế                        |
| Khokhtal (thảo nguyên)         | `#3f7cac` `#7aa95c` `#e7d8b1` `#a23e48` `#f5c04a` | Áo choàng vạt chéo thắt đai lụa, ủng mũi cong, mũ lông | Nút thắt vô tận, sừng cuộn, viền bạc                          |

Lạc Hồng (Đảo Lạc) trong ảnh mẫu: áo khoác đỏ son theo `look.outfit`, áo trong màu giấy dó `#f3e6c4`, viền và đai vàng đồng theo `look.accent` và `#c8962d`. Hoa văn trống đồng chưa có trong ảnh mẫu, sẽ thêm ở giai đoạn 2 dưới dạng texture viền áo.

## 6. Góc máy và kích thước

- Máy quay trực giao (orthographic), nghiêng **40°** từ mặt đất, khớp góc nhìn bản đồ.
- 4 hướng: xuống, phải, lên, trái (đảo hình hướng phải sang trái là không được, vì kiếm và Tinh Văn ở một bên tay). 4 hướng chéo làm sau nếu cần.
- Render khung 256×256 rồi thu về **128×128**; điểm neo ở giữa hai bàn chân.
- Trong game, nhân vật hiện cao khoảng 58px ở màn 1280×720. Ảnh [`08-trong-game.png`](mau/08-trong-game.png) đặt sprite mới cùng chiều cao cạnh chibi cũ.

## 7. Cách tạo lại ảnh mẫu

```bash
pnpm install
# Blender 5.3 tải về ~/tools (hoặc đặt biến BLENDER trỏ tới file chạy Blender)
pnpm art:mau lachong                      # dựng và render ảnh thô vào media/characters/build/lachong/mau/
pnpm exec tsx tools/art/chup-game.ts test-results/art/game.png   # chụp nền game
pnpm art:mau:ghep lachong                 # ghép bảng so sánh vào docs/art/mau/
```

Render bằng Eevee trên CPU, khoảng 4–5 phút cho cả bộ.
