const n=`# Bạch Vũ: Bộ chiêu

> Phong, kiếm đơn, 4★. Vai trò: **gom quái, Khuếch Tán, hồi năng lượng cho đội, cơ động khám phá**. Trạng thái: chờ duyệt (Mốc 1).
> Căn cứ: lữ khách áo choàng lông hạc, lớn lên trên thuyền mây, luôn cầm đoạn dây diều đỏ, "người mang thư", lời thật được gió đọc to (\`ho-so.md\`, \`ky-nang-truyen.md\`).

## Đánh thường: Kiếm Thuyền Mây

| Đòn        | Động tác                                                                            | Hệ số     | Ghi chú                                                                           |
| ---------- | ----------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------- |
| 1          | Chém như mái chèo khuấy ra trước                                                    | 0,78      | Vật lý                                                                            |
| 2          | Xoay nửa vòng, chém ngược                                                           | 0,82      | Vật lý                                                                            |
| 3          | Hai nhát chéo nhanh                                                                 | 2 × 0,48  | Vật lý                                                                            |
| 4          | Xoay trọn một vòng, áo choàng xòe, lông hạc bay ra                                  | 1,40      | Phong, đánh quanh người bán kính 90                                               |
| Trọng kích | **Nút Hai Vòng:** quăng dây diều đỏ quấn quái trước mặt (tầm 220), giật về rồi chém | 0,6 + 1,2 | 25 thể lực. Quái thường bị kéo về chân cậu; quái lớn và boss thì cậu được kéo tới |
| Trên không | Đang lượn bằng diều thì bấm đánh: chém gió chéo xuống                               | 1,0       | Phong, không tốn thể lực                                                          |

## Kỹ năng: Lốc Xoáy Lông Vũ

- **Bấm:** xoay một vòng tại chỗ, lông hạc rời áo choàng cuốn thành lốc nhỏ bán kính 130. Hút quái về giữa, hất nhẹ lên (hệ số 1,6, Phong). Hồi 6 giây, 2 năng lượng.
- **Giữ:** tụ lốc trước mặt, tối đa 1,5 giây (lốc to dần từ 100 lên 160). Thả ra thì lốc trôi chậm theo hướng ngắm trong 3 giây, cuốn quái theo (0,4 mỗi 0,5 giây). Lốc hút được nguyên tố trên quái thì đổi màu và gây thêm sát thương nguyên tố đó. Khi thả, gió hất Bạch Vũ lên cao một bậc. Hồi 9 giây, 4 năng lượng.

## Nộ: Bão Trắng

- **Cảnh camera (1,3 giây):** camera quay vòng quanh cậu từ dưới thấp. Cậu chống kiếm, đưa tay lên miệng hô một tiếng, gió quanh trận tụ về, lông hạc và sương mây trắng xóa. Tư thế: tay trái khum miệng, tay phải cầm kiếm chĩa xuống, áo choàng bung.
- **Đòn:** một cơn bão lớn bán kính 180, trôi chậm về trước 6 giây, hút mạnh, đánh mỗi 0,5 giây (0,55, Phong). Bão hút được nguyên tố thì đổi màu, đánh thêm nguyên tố đó (0,3).
- **Tiếng Chỉ Đường:** trong lúc bão còn, cả đội tăng 15% tốc chạy và 15% sát thương của nguyên tố bão đã hút.
- Tốn 50 năng lượng.

## Thiên phú

1. **Người Mang Thư:** mỗi lần Bạch Vũ gây Khuếch Tán, thành viên có ít năng lượng nhất trong đội được thêm 3 điểm (tối đa một lần mỗi giây).
2. **Thắt Nút:** quái bị dây diều quấn không thoát được khỏi lốc hoặc bão trong 2 giây, kể cả quái tinh nhuệ.
3. **Khám phá, Thuyền Mây Nhỏ:** nhảy cao hơn 20%. Đang rơi thì giữ nút nhảy để lượn bằng diều đỏ (tốn thể lực theo giây).

## Phối hợp

- Gom quái cho chiêu vùng của Mai Linh (pháo hoa) và Hạ Vy (Hầm Băng).
- **Khuếch Tán** Hỏa từ đèn của Mai Linh, Băng từ Hạ Vy, Thủy từ Sương Mai, Lôi từ Lôi Đình. Người Mang Thư giúp đội 4★ có nộ thường xuyên hơn.

## Hiệu ứng và hoạt ảnh

- Màu: trắng \`#f1f1f1\`, xanh ngọc \`#bdf6e4\`, dây đỏ. Motif: lông hạc, lốc gió, dây diều, mây.
- Lốc: lưới hình phễu xoắn, shader cuộn sọc gió, lông hạc dạng hạt xoay theo; đổi màu theo nguyên tố đã hút. Dây diều: đường cong mềm màu đỏ, có nút ở đầu. Bão: nhiều lớp lốc, sương mây trắng, **xung gió mạnh** làm bay tóc và vải của mọi nhân vật gần đó (hệ gió S27).
- Clip riêng: \`bachvu.charge\` (quăng dây, giật), \`bachvu.skillTap\` (xoay một vòng), \`bachvu.skillHold\` (tụ lốc), \`bachvu.burst\` (hô), \`bachvu.glide\` (lượn diều).
`;export{n as default};
