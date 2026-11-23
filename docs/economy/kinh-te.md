# Dòng tiền tệ và tài nguyên

Số liệu từ `content/economy.yaml` (mục `game.thuong`, `thietKe.linhLuc`, `thietKe.thuNhap`, `thietKe.khaiTinh`). Đổi số ở đó rồi chạy `pnpm economy:sim` để cập nhật [ket-qua/](ket-qua/).

## 1. Nguồn vào của người không nạp

| Tài nguyên                      | Mỗi ngày                                              | Mỗi tuần | Mỗi tháng (30 ngày)                                                        | Một lần                                                                                                                                  |
| ------------------------------- | ----------------------------------------------------- | -------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Đá Sao                          | Ủy thác 4 × 30 + thưởng đủ bốn 60 = **180**           | +120     | 5.400 + 514 (tuần) + 600 Tháp kỳ + 800 sự kiện + 200 bảo trì = **≈ 7.514** | **≈ 7.800**: 1.600 khởi đầu, rương (20–50 mỗi rương), Tháp (30 mỗi sao, 12 tầng × 3), Hắc Giao lần đầu, cốt truyện; chia đều 45 ngày đầu |
| Xu                              | Ủy thác 12.000 + Lòng Sao 9 lượt × 2.200 = **31.800** | +60.000  | **≈ 1.210.000**                                                            | 30.000 khởi đầu; rương 1.500–3.000; Tháp 2.000 + 400 × tầng; Hắc Giao 6.000 + 3.000 × cấp                                                |
| Sách Kinh Nghiệm                | Thưởng Ủy thác 5 + Lòng Sao 9 × 5 = **50**            | —        | **≈ 1.500**                                                                | 30 khởi đầu; rương 2–4; Tháp 2 + tầng/3; Hắc Giao 6 + 3 × cấp                                                                            |
| Lõi Sao (nguyên liệu Khai Tinh) | Lòng Sao 9 × 1,2 = **≈ 10,8**                         | —        | **≈ 324**                                                                  | —                                                                                                                                        |
| Bảo Ấn                          | Rơi trong Lòng Sao, chất lượng theo Thiên Tượng       | —        | —                                                                          | —                                                                                                                                        |
| Linh Lực                        | Hồi **180** mỗi ngày, tối đa tích 160                 | —        | 5.400                                                                      | Không bán                                                                                                                                |

Lòng Sao tốn 20 Linh Lực mỗi lượt, nên một ngày có 9 lượt. Linh Lực tối đa 160 nên ai bỏ một ngày chỉ mất phần vượt trần, không tích được cả tuần để "cày bù".

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

Ví dụ một tháng của người không nạp: đủ Sách cho khoảng 4,5 nhân vật lên cấp 60, đủ Lõi Sao cho khoảng 3,5 nhân vật Khai Tinh đủ 6 bậc, còn Xu đủ cho khoảng 1,9 nhân vật (cấp + Khai Tinh = 650.100). **Xu là nút thắt** có chủ ý: người chơi phải chọn nuôi ai trước.

## 3. Ước nguyện miễn phí

|                                                | Người không nạp | Thẻ tháng |
| ---------------------------------------------- | --------------: | --------: |
| Lượt ước mỗi tháng (lặp lại, từ tháng thứ hai) |        **≈ 47** |      ≈ 66 |
| Lượt ước tháng đầu (gồm Đá Sao một lần)        |            ≈ 79 |      ≈ 98 |
| Lượt ước sau 180 ngày                          |             330 |       442 |
| Số nhân vật 5★ sau 180 ngày (trung bình)       |             4,9 |       6,7 |
| Số 5★ giới hạn sau 180 ngày (trung bình)       |             3,2 |       4,3 |
| Ngày có 5★ giới hạn đầu tiên (trung bình)      |          **40** |        31 |

Thời gian trung bình để người không nạp có thêm một nhân vật 5★ giới hạn: **khoảng 57 ngày (≈ 104 lượt ước)** ở giai đoạn ổn định, nghĩa là cứ khoảng 3 banner (mỗi banner 21 ngày) thì chắc chắn có một nhân vật mình muốn nếu biết tích lũy. Kỳ vọng lý thuyết của Bảo Hộ Vận Sao (0,6%, tăng từ lượt 74, chắc chắn ở lượt 90, 50/50): khoảng 62 lượt cho một 5★ và 93 lượt cho một 5★ giới hạn.

## 4. Lạm phát và giữ giá trị tài nguyên

- **Trần tích lũy.** Linh Lực tối đa 160, không bán: tài nguyên nuôi nhân vật không phình ra theo tiền.
- **Chỗ tiêu tăng dần.** Chi phí Xu và Sách tăng theo cấp; Khai Tinh bậc cao đắt gấp 6 lần bậc đầu. Mỗi nhân vật mới là một chỗ tiêu ≈ 650.000 Xu, nên Xu vẫn có giá trị khi người chơi có thêm nhân vật.
- **Trùng nhân vật không vô nghĩa.** Trùng khi đã N6 đổi thành Xu (5★: 20.000, 4★: 5.000), vật phẩm 3★ đổi 500 Xu. Đây là nguồn Xu nhỏ, không đủ phá nút thắt Xu.
- **Thiên Tượng là chỗ tiêu dài hạn.** Mỗi bậc thưởng +12% nhưng quái mạnh hơn và Bảo Ấn tốt hơn, nên người chơi lâu năm luôn có Bảo Ấn để nâng.
- **Đá Sao không trôi giá.** Giá một lượt ước cố định 160 Đá Sao; không có sự kiện tặng Đá Sao vô hạn. Đá Sao sự kiện mỗi tháng có trần (`thuNhap.thang`).
- **Theo dõi trong Admin.** Mục Kinh tế ghi Đá Sao vào và ra theo nguồn (rương, Tháp, Hắc Giao, Ủy thác, Ước nguyện). Khi có server thật, cần theo dõi thêm tỉ lệ Xu tồn kho trên Xu kiếm được mỗi tuần; vượt 3 tuần thu nhập là dấu hiệu cần thêm chỗ tiêu.
