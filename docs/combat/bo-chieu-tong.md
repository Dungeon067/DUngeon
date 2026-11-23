# Bộ chiêu riêng của từng nhân vật (S30)

Trạng thái: **Mốc 1, chờ chủ dự án duyệt.** Mới có thiết kế của đội khởi đầu (Sương Mai, Mai Linh, Bạch Vũ, Hạ Vy) và Lôi Đình. 19 nhân vật còn lại làm sau khi duyệt.

Chi tiết từng người ở `docs/characters/<id>/bo-chieu.md`. Số liệu ở đây là số thiết kế; khi cài sẽ nằm trong `content/characters/<id>.yaml` (mục `kit`) và có thể chỉnh lại sau khi chạy thử.

## 1. Quy ước chung

| Thao tác                 | Cách bấm                         | Ghi chú                                                                   |
| ------------------------ | -------------------------------- | ------------------------------------------------------------------------- |
| Đánh thường              | Bấm nút đánh                     | Chuỗi 3–5 đòn, ngừng 1,1 giây thì về đòn đầu                              |
| Trọng kích               | Giữ nút đánh ≥ 0,35 giây rồi thả | Tốn thể lực. Cung: giữ để ngắm, có hai mức tụ lực                         |
| Đòn trên không / đáp đất | Bấm đánh khi đang nhảy           | Thay đòn lao xuống chung bằng biến thể riêng                              |
| Kỹ năng bấm / giữ        | Bấm, hoặc giữ ≥ 0,35 giây        | Hai biến thể chung một thời gian hồi, trừ khi ghi khác                    |
| Nộ                       | Bấm khi đủ năng lượng            | Cảnh camera 1–1,5 giây, chạm màn hình hoặc bấm lại để bỏ qua (vẫn ra đòn) |
| Thiên phú bị động 1, 2   | Mở ở Khai Tinh 1 và Khai Tinh 4  | Khi chưa có Khai Tinh trong game thì mở sẵn                               |
| Thiên phú khám phá       | Luôn có                          | Chỉ tác dụng ngoài trận                                                   |

## 2. Cân bằng

- **Ngân sách sát thương:** tổng hệ số trong một vòng 20 giây (đánh thường, 2–3 lần kỹ năng, 1 lần nộ) giữ trong ±10% so với bộ chiêu cũ cùng nhân vật. Chiến Lực S19 không tính bộ chiêu nên `pnpm economy:sim` không đổi, nhưng Tháp Tinh Tú và boss dùng sát thương thật nên phải giữ ngân sách.
- **5★ và 4★:** 5★ có chỉ số gốc cao hơn khoảng 1,6 lần, chuỗi đòn dài hơn một nhịp và thêm một trạng thái cường hóa sau nộ. 4★ mạnh ở chỗ khác: hỗ trợ đội, áp nguyên tố ngoài sân, hồi năng lượng. Đội 4★ miễn phí vẫn qua được nội dung thường.
- **Năng lượng nộ:** 4★ tốn 50, 5★ tốn 60 như hiện tại. Kỹ năng bấm cho 2–3 điểm, giữ cho 3–4 điểm.

## 3. Khối chiêu dùng chung

Không viết lại 24 lần cùng một thứ. Mỗi chiêu là một danh sách khối có tham số trong YAML. `src/combat/kits/<id>.ts` chỉ chứa phần riêng không tả được bằng khối (ví dụ: dây diều của Bạch Vũ, chỉ băng của Hạ Vy).

| Khối      | Làm gì                                                                    | Tham số chính                                    |
| --------- | ------------------------------------------------------------------------- | ------------------------------------------------ |
| `chem`    | Đòn cận chiến hình quạt hoặc vòng tròn                                    | hệ số, tầm, góc, đẩy lùi, nguyên tố, chịu đòn    |
| `ban`     | Đạn bay (tên, đốm lửa, tia), có xuyên, nảy, đuổi                          | hệ số, tốc độ, số viên, góc tỏa, xuyên, nảy      |
| `lao`     | Lướt tới và gây sát thương trên đường                                     | quãng, tốc độ, bất tử, hệ số                     |
| `vung`    | Vùng tồn tại một lúc, gây sát thương theo nhịp, hút, làm chậm, theo người | bán kính, thời gian, nhịp, hút, chậm, theo người |
| `trieu`   | Vật triệu hồi đứng yên tự đánh (đèn, cọc)                                 | số lượng tối đa, thời gian, nhịp bắn, hệ số      |
| `buff`    | Tăng chỉ số cho bản thân hoặc cả đội, gán nguyên tố cho đòn đánh          | chỉ số, lượng, thời gian, đối tượng              |
| `khien`   | Khiên theo % máu                                                          | lượng, thời gian, hấp thụ thêm theo nguyên tố    |
| `hoi`     | Hồi máu tức thì hoặc theo nhịp                                            | lượng, nhịp, đối tượng                           |
| `dau`     | Gắn dấu lên quái (tầng, liên kết, đánh dấu chờ nổ)                        | số tầng, thời gian, hiệu ứng khi đủ tầng         |
| `phanDon` | Thế đỡ: trúng đòn trong khung giờ thì phản công                           | khung giờ, hệ số phản công, bất tử               |

Mỗi khối có thêm `fx` (họa tiết hiệu ứng) và `anim` (clip hoạt ảnh). Test kiểm tra không có hai nhân vật trùng cấu hình chiêu.

## 4. Bảng tổng (5 nhân vật Mốc 1)

| Nhân vật  | ★   | Nguyên tố, vũ khí | Vai trò                                   | Đánh thường, trọng kích                                           | Kỹ năng bấm / giữ                                           | Nộ                                                                            | Màu, motif                                         |
| --------- | --- | ----------------- | ----------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| Sương Mai | 4   | Thủy, kiếm đơn    | Sát thương chính tầm gần, áp Thủy, đỡ đòn | 4 nhát; trọng kích rút kiếm tiêu Giọt Sương                       | Lướt chém để lại Vệt Sương / Thế Đứng Gác phản đòn          | Sóng Bạc: sóng quét trước mặt, sau đó đòn đánh mang Thủy, đội giảm sát thương | Bạc, xanh sông; giọt sương, mặt sông lúc rạng đông |
| Mai Linh  | 4   | Hỏa, pháp khí     | Sát thương phụ ngoài sân, áp Hỏa          | 3 đốm lửa, đòn 3 nảy; trọng kích thả đèn trời, nạp dầu cho đèn    | Một đèn hoa mai mạnh / dây ba đèn nhỏ chắn đường            | Pháo Hoa Đêm Hội: năm quả pháo hoa, mọi đèn đang treo nổ theo                 | Đỏ son, vàng mai; đèn lồng, pháo hoa               |
| Bạch Vũ   | 4   | Phong, kiếm đơn   | Gom quái, Khuếch Tán, hồi năng lượng đội  | 4 nhát xoay như mái chèo; trọng kích quăng dây diều kéo quái      | Lốc nhỏ quanh người / tụ lốc rồi phóng đi, hất mình lên cao | Bão Trắng: bão lông hạc trôi chậm, hút quái, đội tăng nguyên tố đã hút        | Trắng, xanh ngọc, dây đỏ; lông hạc, diều           |
| Hạ Vy     | 4   | Băng, cung        | Áp Băng từ xa, khống chế, khiên cứu người | 4 phát; ngắm 2 mức, mức 2 nở hoa tuyết và khâu quái bằng chỉ băng | Vòng hoa băng + nhảy lùi / Hầm Băng làm chậm, áp Băng       | Gió Lạnh Đầu Mùa: tên bắn lên trời, mưa hoa tuyết, kéo quái vào giữa          | Xanh băng, cam buồm; hoa tuyết, chỉ vá buồm        |
| Lôi Đình  | 5   | Lôi, thương       | Sát thương chính, phá giáp                | 5 nhát; trọng kích xoay thương rồi phi tới, tiêu Nhịp Vó          | Lao xuyên hàng, lao lại lần hai / ném thương thành Cọc Sấm  | Thiên Lôi Giáng Thế: ba loạt sét theo nhịp vó, sau đó cường hóa 10 giây       | Tím sét, vàng; vó ngựa, mây giông                  |

## 5. Phối hợp đội

| Đội gợi ý                              | Ý đồ                                                                                                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sương Mai + Hạ Vy + Bạch Vũ + Mai Linh | Đội khởi đầu. Hầm Băng của Hạ Vy và Vệt Sương của Sương Mai giữ quái **Đóng Băng**; Bạch Vũ gom lại; đèn của Mai Linh làm **Tan Chảy** quái vừa tan băng |
| Mai Linh + Sương Mai                   | **Bốc Hơi**: đèn áp Hỏa ngoài sân, Sương Mai đánh Thủy trên sân (Thủy vào Hỏa nhân 2)                                                                    |
| Bạch Vũ + Mai Linh                     | **Khuếch Tán** Hỏa: Bão Trắng hút lửa từ đèn, cả đội được tăng sát thương Hỏa                                                                            |
| Lôi Đình + Sương Mai                   | **Điện Cảm**: Sương Mai giữ Thủy, Lôi Đình đánh nhanh; Nhịp Vó đầy nhanh vì mỗi tia Điện Cảm tính một nhịp                                               |
| Lôi Đình + Hạ Vy                       | **Siêu Dẫn**: Hạ Vy áp Băng, Lôi Đình phá giáp; trọng kích của Lôi Đình vào quái đang dễ tổn thương                                                      |
| Lôi Đình + Mai Linh                    | **Quá Tải** không đẩy quái văng (thiên phú của Mai Linh), quái đứng yên cho Lôi Đình đánh tiếp                                                           |

## 6. Hiệu ứng và hoạt ảnh

- Hiệu ứng 3D: hạt, lưới, shader toon, đèn điểm, xung gió cho tóc và vải (gọi hàm gió của S27). Mỗi nhân vật một bảng màu và motif riêng (cột cuối bảng 4).
- Hoạt ảnh: mỗi kỹ năng, nộ và trọng kích có clip riêng theo nhân vật, dựng bằng `tools/anim/author.ts` trên bộ clip dáng × vũ khí của S27. Tên clip: `<id>.<chiêu>`, ví dụ `havy.charge2`, `loidinh.burst`. Chỉ thêm clip mới; sửa file chung của S27 (`humanoid.json`, `content/poses.yaml`) thì báo S27 trước.
