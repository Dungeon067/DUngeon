# Dòng tiền tệ và tài nguyên

Số liệu từ `content/economy.yaml` (mục `game.thuong`, `thietKe.linhLuc`, `thietKe.thuNhap`, `thietKe.khaiTinh`). Đổi số ở đó rồi chạy `pnpm economy:sim` để cập nhật [ket-qua/](ket-qua/).

## 1. Nguồn vào của người không nạp

| Tài nguyên                      | Mỗi ngày                                              | Mỗi tuần | Mỗi tháng (30 ngày)                                                        | Một lần                                                                                                                                  |
| ------------------------------- | ----------------------------------------------------- | -------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Đá Sao                          | Ủy thác 4 × 30 + thưởng đủ bốn 60 = **180**           | +120     | 5.400 + 514 (tuần) + 600 Tháp kỳ + 800 sự kiện + 200 bảo trì = **≈ 7.514** | **≈ 7.800**: 1.600 khởi đầu, rương (20–50 mỗi rương), Tháp (30 mỗi sao, 12 tầng × 3), Hắc Giao lần đầu, cốt truyện; chia đều 45 ngày đầu |
| Xu                              | Ủy thác 14.000 + Lòng Sao 9 lượt × 2.200 = **33.800** | +60.000  | **≈ 1.270.000**                                                            | 30.000 khởi đầu; rương 1.500–3.000; Tháp 2.000 + 400 × tầng; Hắc Giao 6.000 + 3.000 × cấp                                                |
| Sách Kinh Nghiệm                | Thưởng Ủy thác 5 + Lòng Sao 9 × 5 = **50**            | —        | **≈ 1.500**                                                                | 30 khởi đầu; rương 2–4; Tháp 2 + tầng/3; Hắc Giao 6 + 3 × cấp                                                                            |
| Lõi Sao (nguyên liệu Khai Tinh) | Lòng Sao 9 × 1,2 = **≈ 10,8**                         | —        | **≈ 324**                                                                  | —                                                                                                                                        |
| Bảo Ấn                          | Rơi trong Lòng Sao, chất lượng theo Thiên Tượng       | —        | —                                                                          | —                                                                                                                                        |
| Linh Lực                        | Hồi **180** mỗi ngày, tối đa tích 160                 | —        | 5.400                                                                      | Không bán                                                                                                                                |

**Câu đố, bí cảnh, quest mini (S23, một lần):** **325 Đá Sao**, cộng Xu và Sách từ rương:

- Rương thường: 5 Đá Sao, 800 Xu, 1 Sách.
- Rương quý: 10 Đá Sao, 1.500 Xu, 2 Sách.
- Rương tinh xảo: 20 Đá Sao, 3.000 Xu, 4 Sách.

Mô phỏng chia đều 325 Đá Sao trong 60 ngày đầu (`thietKe.thuNhap.cauDo`). `pnpm content:check` báo lỗi nếu tổng thưởng trong `content/puzzles.yaml` lệch con số này. Chi tiết: [docs/world/cau-do-bi-canh.md](../world/cau-do-bi-canh.md).

Lòng Sao tốn 20 Linh Lực mỗi lượt, nên một ngày có 9 lượt. Linh Lực tối đa 160 nên ai bỏ một ngày chỉ mất phần vượt trần, không tích được cả tuần để "cày bù".

Từ bản nguồn nguyên liệu vũ khí, mô phỏng cho F2P dành 2 lượt mỗi ngày (40 Linh Lực) cho Bí Cảnh Binh Khí, còn lại 7 lượt Lòng Sao. Lượt Bí Cảnh ngày đầu trả bằng 160 Linh Lực đầy sẵn lúc tạo hồ sơ. Mỗi lượt Bí Cảnh trả 2.500 Xu.

### Nguyên liệu vũ khí (`thietKe.vuKhi.nguon`)

| Nguồn                   | Lượng                                                                                     | Giới hạn                                    |
| ----------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------- |
| Khởi đầu (một lần)      | 30 Quặng Thô, 10 Quặng Tinh Luyện, 3 Quặng Sao, 8 Phôi Lồng Sao                           | —                                           |
| Bí Cảnh Binh Khí        | 3 Quặng Thô + 1 Quặng Tinh Luyện + 2.500 Xu mỗi lượt                                      | 20 Linh Lực mỗi lượt                        |
| Ủy thác (thưởng đủ bốn) | 2 Quặng Thô mỗi ngày                                                                      | 1 lần mỗi ngày                              |
| Cửa hàng quặng (đổi Xu) | Quặng Tinh Luyện 1.200 Xu; Quặng Sao 7.000 Xu                                             | 7 và 3 mỗi tuần, làm mới thứ Hai            |
| Thành tựu Binh Khí      | Phôi Lồng Sao: 10/30/60 lượt Bí Cảnh (4 mỗi mốc), lần đầu đột phá 2, lần đầu tinh luyện 2 | Một lần                                     |
| Cửa hàng sự kiện        | 12 Phôi Lồng Sao mỗi tháng                                                                | Chỉ trong mô phỏng, chờ hệ sự kiện vào game |

Kết quả mô phỏng (F2P, xem [ket-qua/tom-tat.md](ket-qua/tom-tat.md)): một vũ khí 4★ lên cấp tối đa ở **ngày 36**, Quặng Sao để đột phá là điểm nghẽn (cần 21, mỗi tuần mua được 3). Vũ khí 4★ Lò Rèn đủ R5 (5 bản, 40 Phôi) ở **ngày 40**, khớp `loRenR5Ngay` của S19. Cấp tối đa vũ khí hiện là 60 (thang S19), tương ứng mốc "cấp 90" trong yêu cầu.

**Xu chung cho nhân vật và vũ khí.** Mô phỏng trừ đủ Xu vũ khí (cửa hàng quặng, kinh nghiệm, đột phá, Lò Rèn) vào Xu nuôi nhân vật của mọi hồ sơ. Nhân vật được ưu tiên: vũ khí chỉ tiêu phần Xu dư của F2P mà các ngày sau vẫn còn dư, nên đội 4★ ngày 1–21 không chậm đi. Thứ tự tiêu cho vũ khí là cửa hàng quặng, đột phá, kinh nghiệm, rồi Lò Rèn. Để vũ khí vẫn kịp ngày 36 và 40, Xu được bù chủ yếu từ Bí Cảnh (1.200 → 2.500 mỗi lượt) và Ủy thác (3.000 → 3.500 mỗi việc), giá cửa hàng giảm nhẹ (Quặng Tinh Luyện 1.500 → 1.200, Quặng Sao 8.000 → 7.000). Giá đột phá và Lò Rèn giữ nguyên. Game chưa có Bí Cảnh Xu riêng.

## 2. Nguồn ra (chỗ tiêu)

| Tài nguyên       | Chỗ tiêu                         | Mức tiêu                                                      |
| ---------------- | -------------------------------- | ------------------------------------------------------------- |
| Đá Sao           | Ước nguyện                       | 160 mỗi lượt                                                  |
| Xu               | Lên cấp nhân vật                 | 300 + 120 × cấp mỗi lần; cấp 1 → 60: **230.100** mỗi nhân vật |
| Xu               | Khai Tinh                        | 20.000 → 120.000 mỗi bậc; 6 bậc: **420.000** mỗi nhân vật     |
| Xu               | Kỹ năng, tinh luyện, nâng Bảo Ấn | Sẽ thêm khi đưa hệ thống vào game (để trong `economy.yaml`)   |
| Sách Kinh Nghiệm | Lên cấp nhân vật                 | 1 + cấp/6 mỗi lần; cấp 1 → 60: **329** mỗi nhân vật           |
| Lõi Sao          | Khai Tinh                        | 3 → 32 mỗi bậc; 6 bậc: **91** mỗi nhân vật                    |
| Linh Lực         | Nhận thưởng Lòng Sao             | 20 mỗi lượt                                                   |

Ví dụ một tháng của F2P chơi kỹ: đủ Sách cho khoảng 4,5 nhân vật lên cấp 60, đủ Lõi Sao cho khoảng 3,5 nhân vật Khai Tinh đủ 6 bậc, còn Xu đủ cho khoảng 1,9 nhân vật (cấp + Khai Tinh = 650.100). **Xu là nút thắt** có chủ ý: người chơi phải chọn nuôi ai trước.

## 3. Ước nguyện miễn phí

|                                                                |                 F2P chơi kỹ | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) |
| -------------------------------------------------------------- | --------------------------: | ---------------------------------: |
| Đá Sao mỗi tháng (lặp lại, từ tháng thứ hai)                   | ≈ 7.500 (**≈ 47 lượt ước**) |               ≈ 11.000 (≈ 69 lượt) |
| Đá Sao trung bình mỗi tháng trong năm đầu (gồm Đá Sao một lần) |           8.132 (≈ 51 lượt) |                 11.656 (≈ 73 lượt) |
| Lượt ước sau 365 ngày (nhân vật + vũ khí)                      |                   325 + 165 |                            695 + 0 |
| Số nhân vật 5★ sau 365 ngày (trung bình)                       |                         5,0 |                               10,8 |

**Thời gian trung bình để người không nạp có một nhân vật 5★ giới hạn:**

- Theo kỳ vọng của Bảo Hộ Vận Sao (0,6%, tăng từ lượt 74, chắc chắn ở lượt 90, 50/50): khoảng 62 lượt cho một 5★ và **93 lượt cho một 5★ giới hạn**, tức **khoảng 2 tháng** Đá Sao miễn phí.
- Nếu chỉ ước khi nhân vật mình muốn có banner (như F2P chơi kỹ trong mô phỏng): trung vị ngày 128 mới có 5★ giới hạn đầu tiên, vì phải chờ banner quay lại (147 ngày một lần). Đổi lại, khi banner tới, người chơi đã tích đủ Đá Sao để gần như chắc chắn có nhân vật và vũ khí của họ.

Banner vũ khí (Binh Khí Tinh Tú) dùng chung Đá Sao: kỳ vọng khoảng 53 lượt cho một 5★, trung bình 87 lượt và tối đa 154 lượt cho đúng vũ khí đã chọn nhờ La Bàn Sao. Đây là chỗ tiêu Đá Sao lớn thứ hai, chủ yếu của người muốn nội dung đỉnh.

## 4. Lạm phát và giữ giá trị tài nguyên

- **Trần tích lũy.** Linh Lực tối đa 160, không bán: tài nguyên nuôi nhân vật không phình ra theo tiền.
- **Chỗ tiêu tăng dần.** Chi phí Xu và Sách tăng theo cấp; Khai Tinh bậc cao đắt gấp 6 lần bậc đầu. Mỗi nhân vật mới là một chỗ tiêu ≈ 650.000 Xu, nên Xu vẫn có giá trị khi người chơi có thêm nhân vật.
- **Trùng nhân vật không vô nghĩa.** Trùng khi đã N6 đổi thành Xu (5★: 20.000, 4★: 5.000), vật phẩm 3★ đổi 500 Xu. Đây là nguồn Xu nhỏ, không đủ phá nút thắt Xu.
- **Thiên Tượng là chỗ tiêu dài hạn.** Mỗi bậc thưởng +12% nhưng quái mạnh hơn và Bảo Ấn tốt hơn, nên người chơi lâu năm luôn có Bảo Ấn để nâng.
- **Đá Sao không trôi giá.** Giá một lượt ước cố định 160 Đá Sao; không có sự kiện tặng Đá Sao vô hạn. Đá Sao sự kiện mỗi tháng có trần (`thuNhap.thang`).
- **Theo dõi trong Admin.** Mục Kinh tế ghi Đá Sao vào và ra theo nguồn (rương, Tháp, Hắc Giao, Ủy thác, Ước nguyện). Khi có server thật, cần theo dõi thêm tỉ lệ Xu tồn kho trên Xu kiếm được mỗi tuần; vượt 3 tuần thu nhập là dấu hiệu cần thêm chỗ tiêu.
