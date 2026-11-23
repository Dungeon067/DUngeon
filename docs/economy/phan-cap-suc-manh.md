# Phân cấp sức mạnh và Chiến Lực

Số liệu lấy từ `content/economy.yaml`. Kết quả mô phỏng ở [ket-qua/tom-tat.md](ket-qua/tom-tat.md). Phần trăm trong bảng dưới tính trên một Hộ Tinh 4★ (Sương Mai) đã đầu tư đầy đủ ở cấp 60, trừ khi ghi khác.

## 1. Các nguồn sức mạnh

| Nguồn             | Phạm vi             | Tăng gì                                                                                   | Mức tăng                                              | Ảnh hưởng Chiến Lực                                          | Có trong game? | Mua bằng tiền?                                        |
| ----------------- | ------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ | -------------- | ----------------------------------------------------- |
| Cấp nhân vật      | 1–60                | Máu, Tấn công                                                                             | +7% chỉ số cấp 1 mỗi cấp (cấp 60: ×5,13)              | +414% từ cấp 1 lên 60                                        | Có             | Không (chỉ nhanh hơn nhờ Sách trong gói tiến trình)   |
| Khai Tinh         | 0–6                 | Máu, Tấn công; mở giới hạn cấp 20/30/40/45/50/55/60                                       | +3% mỗi bậc (tối đa +18%)                             | +18%                                                         | Chưa           | Không                                                 |
| Kỹ năng           | 1–10                | Sát thương đánh thường, kỹ năng, nộ                                                       | +3,5% mỗi cấp (tối đa +31,5%)                         | +31%                                                         | Chưa           | Không                                                 |
| Nét Sao           | N0–N6               | Máu, Tấn công                                                                             | +10% mỗi Nét (N6: +60%)                               | +60%                                                         | Có             | Gián tiếp qua Ước nguyện                              |
| Độ hiếm vũ khí    | 3★, 4★, 5★          | Tấn công %                                                                                | +20% / +30% / +36%                                    | 4★ R5 so với không vũ khí: +22%; 5★ so với 4★ cùng R5: +2,6% | Chưa           | Gián tiếp (vũ khí 4★ rèn miễn phí)                    |
| Tinh luyện vũ khí | R1–R5               | Sát thương                                                                                | +2% (3★) hoặc +3% (4★, 5★) mỗi bậc trên R1            | R1 lên R5: +7%                                               | Chưa           | Gián tiếp                                             |
| Bảo Ấn, Bộ Ấn     | 4 ô, chất lượng 0–1 | Tấn công, Máu, sát thương khi đủ bộ                                                       | Tối đa +32% Tấn công, +24% Máu, Bộ Ấn +12% sát thương | +33%                                                         | Chưa           | **Không bao giờ** (chỉ rơi từ Lòng Sao bằng Linh Lực) |
| Cấp Hộ Tinh       | 1–60                | Không tăng chỉ số; mở Khai Tinh, kỹ năng, Thiên Tượng                                     | 0% trực tiếp                                          | Gián tiếp (giới hạn mọi nguồn trên)                          | Chưa           | **Không bao giờ**                                     |
| Thiên Tượng       | 0–8                 | Quái mạnh hơn 1 cấp mỗi bậc; thưởng +12% mỗi bậc; Bảo Ấn rơi tốt hơn (chất lượng 0,3 → 1) | 0% trực tiếp                                          | Gián tiếp qua Bảo Ấn                                         | Chưa           | **Không bao giờ**                                     |
| Độ hiếm nhân vật  | 4★, 5★              | Chỉ số gốc và chí mạng (4★: 15%/60%, 5★: 25%/90%)                                         | —                                                     | 5★ ≈ ×1,55 so với 4★ cùng mức đầu tư                         | Có             | Gián tiếp qua Ước nguyện                              |

Cấp Hộ Tinh tăng theo kinh nghiệm hoạt động mỗi ngày (`capHoTinh.kinhNghiemMoiNgay`), không bán. Mốc dự kiến: ngày 1 cấp 3, ngày 7 cấp 11, ngày 30 cấp 25, ngày 60 cấp 37, ngày 90 cấp 47, ngày 180 cấp 60. Năm bậc danh vọng: Đom Đóm (1–15), Đèn Lồng (16–30), Ngọn Đuốc (31–40), Vầng Trăng (41–50), Sao Mai (51–60).

Vì Khai Tinh, kỹ năng và Thiên Tượng đều khóa theo cấp Hộ Tinh, **thời gian chơi là trần cứng của phần lớn sức mạnh**. Tiền chỉ tác động tới độ hiếm nhân vật, Nét Sao và vũ khí.

## 2. Công thức Chiến Lực

```text
Tấn công hiệu quả = Tấn công × (1 + tỉ lệ chí mạng × sát thương chí mạng) × (1 + tăng sát thương)
Chiến Lực         = round((Tấn công hiệu quả × 1 + Máu × 0,08) × (1 + thưởng kỹ năng))
Chiến Lực đội     = tổng Chiến Lực của 4 người mạnh nhất (màn Đội hình: tổng 4 người trong đội)
```

- Tấn công và Máu đã gồm cấp, Nét Sao, Khai Tinh, vũ khí và Bảo Ấn.
- Trọng số `chienLuc.trongSoTanCong` và `chienLuc.trongSoMau` trong `economy.yaml`.
- Trong game hiện tại chỉ có cấp và Nét Sao, nên Chiến Lực hiển thị chưa gồm các nguồn "Chưa có".
- Mã: `chienLuc()` trong `src/economy/core.ts`, dùng chung cho game, Admin và mô phỏng.

### Chiến Lực mẫu theo mức đầu tư

| Mức đầu tư                                               | Sương Mai (4★) | Lạc Hồng (5★) |
| -------------------------------------------------------- | -------------: | ------------: |
| Mới nhận: cấp 1, N0                                      |            166 |           246 |
| Cấp 20, Khai Tinh 0, kỹ năng 1                           |            386 |           573 |
| Cấp 40, Khai Tinh 2, kỹ năng 4, vũ khí 4★ R1             |            847 |         1.285 |
| Cấp 50, Khai Tinh 4, kỹ năng 7, vũ khí 4★ R3, Bảo Ấn 0,6 |          1.486 |         2.286 |
| Cấp 60, Khai Tinh 6, kỹ năng 10, vũ khí 4★ R5, Bảo Ấn 1  |          2.209 |         3.414 |
| Như trên, thêm N6                                        |          3.535 |         5.463 |
| Như trên, vũ khí 5★ R5, N6                               |          3.624 |         5.617 |

## 3. Ba hồ sơ người chơi

| Hồ sơ     | Nạp mỗi tháng                     | Mua gì                                                                                    |
| --------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| Không nạp | 0 đ                               | Không                                                                                     |
| Nạp ít    | 79.000 đ                          | Thẻ Trăng (thẻ tháng)                                                                     |
| Nạp nhiều | 10.000.000 đ (bằng hạn mức tháng) | Thẻ Trăng, Hành Trình Mùa, gói Đá Sao lớn nhất trước; vũ khí 5★ cho cả đội, R5 ở ngày 120 |

Cả ba hồ sơ có cùng thời gian chơi, nên cùng cấp Hộ Tinh, cùng cấp nhân vật, Khai Tinh, kỹ năng và Bảo Ấn. Mỗi người chơi ảo dùng hết Đá Sao vào banner giới hạn (đổi nhân vật 5★ nổi bật mỗi 21 ngày). Đội ban đầu: Sương Mai, Mai Linh, Bạch Vũ (có sẵn) và Minh Khải (nhận trong cốt truyện).

Kết quả 100.000 người chơi ảo mỗi hồ sơ (người chơi trung vị theo Chiến Lực đội, danh sách nhân vật và Nét Sao đầy đủ ở [ket-qua/tom-tat.md](ket-qua/tom-tat.md)):

| Hồ sơ     | Ngày | Lượt ước (TB) | Chiến Lực đội (trung vị) | Nhân vật 5★ của người trung vị |
| --------- | ---- | ------------: | -----------------------: | ------------------------------ |
| Không nạp | 30   |            79 |                    5.260 | 1 nhân vật, N0                 |
| Không nạp | 90   |           189 |                   10.609 | 3 nhân vật, N0                 |
| Không nạp | 180  |           330 |                   13.682 | 4 nhân vật, N0–N1              |
| Nạp ít    | 30   |            98 |                    5.416 | 1 nhân vật, N0                 |
| Nạp ít    | 90   |           245 |                   10.988 | 3 nhân vật, N0–N1              |
| Nạp ít    | 180  |           442 |                   14.149 | 4 nhân vật, N0–N2              |
| Nạp nhiều | 30   |           334 |                    6.812 | 4 nhân vật, N0–N1              |
| Nạp nhiều | 90   |           854 |                   13.171 | 8 nhân vật, N0–N4              |
| Nạp nhiều | 180  |         1.606 |                   17.462 | 11 nhân vật, N0–N4             |

Biểu đồ Chiến Lực theo thời gian, số lượt ước và phân phối số 5★: [ket-qua/bao-cao.html](ket-qua/bao-cao.html).

## 4. Nguyên tắc công bằng (bắt buộc)

1. **Toàn bộ cốt truyện, khám phá và Tháp Tinh Tú tới 3★ vượt được bằng đội 4★ miễn phí có đủ cấp.**
   - Đội kiểm tra: `congBang.doiMienPhi` (Sương Mai, Mai Linh, Bạch Vũ, Minh Khải), N0, vũ khí 4★ rèn miễn phí, đầu tư theo thời gian của người không nạp.
   - Cốt truyện: mỗi chương có mốc Chiến Lực yêu cầu và ngày dự kiến (`thietKe.cotTruyen`). Đội miễn phí vượt mốc ở mọi chương, dư từ 8% (chương 2, 3) tới 40% (chương 7).
   - Tháp: sát thương mỗi giây cần cho 3★ (xong trong 60 giây) tính từ đúng cách sinh quái của `src/modes/tower.ts` (số quái, cấp quái, Đá Quý). Đội miễn phí đạt 3★ tầng 1–9 trong 3 ngày đầu, tầng 10–12 từ ngày 19.
   - Khám phá: quái ngoài thế giới yếu hơn quái Tháp cùng giai đoạn, nên đạt Tháp 3★ là đủ cho khám phá.
2. **Nạp chỉ giúp đi nhanh hơn và đẹp hơn, không khóa nội dung.** Không chương, vùng, tầng Tháp hay Lòng Sao nào cần nhân vật 5★ hoặc vật phẩm mua. Cấp Hộ Tinh, Khai Tinh, kỹ năng, Thiên Tượng, Bảo Ấn và Linh Lực không bán.
3. **Trần chênh lệch: Chiến Lực đội của người nạp nhiều nhất ≤ 1,6 lần người không nạp (trung vị), cùng số ngày chơi.**
   - Lý do chọn 1,6: chỉ riêng độ hiếm, một đội 5★ đã mạnh ≈ 1,55 lần đội 4★ cùng đầu tư. Trần 1,6 cho phép người nạp có đội 5★ hoàn chỉnh và vài Nét Sao, nhưng không đủ để biến nội dung thành "chỉ người nạp mới qua". Ở mức này người không nạp vẫn thắng người nạp nhiều nếu chơi giỏi hơn (né đòn, phản ứng nguyên tố có thể chênh lệch sát thương lớn hơn 1,6 lần).
   - Cách giữ trần: (a) thời gian khóa cấp, Khai Tinh, kỹ năng, Bảo Ấn; (b) **hạn mức nạp 10.000.000 đ mỗi tài khoản mỗi tháng** (`goiNap.hanMucThang`), vừa bảo vệ người chơi vừa chặn việc mua N6 cả đội trong vài ngày; (c) Nét Sao tăng chỉ số có giới hạn (+60%).
   - Kết quả mô phỏng: tỉ lệ trung vị 1,24–1,30; phân vị 99 là 1,34–1,39; **người nạp nhiều may mắn nhất trong 100.000 người là 1,44–1,51 lần**, đều ≤ 1,6. ĐẠT ở cả ba mốc 30, 90, 180 ngày.
   - Tham khảo: nếu bỏ hạn mức (đội 4 nhân vật 5★ N6, vũ khí 5★ R5 ngay từ đầu) tỉ lệ là 2,12 / 1,77 / 1,64. Vì vậy **hạn mức tháng là điều kiện bắt buộc** khi mở nạp. Nếu muốn bỏ hạn mức thì phải giảm `netSao.tangMoiNet` (đang dùng trong game) hoặc dời phần lớn sức mạnh Nét Sao sang hiệu ứng đặc biệt không cộng chỉ số.

## 5. Những gì nạp mua được và không bao giờ bán

**Mua được:**

- Đá Sao để Ước nguyện (tỉ lệ công khai, Bảo Hộ Vận Sao giữ nguyên khi mua).
- Thẻ Trăng (thẻ tháng): Đá Sao nhận dần mỗi ngày đăng nhập.
- Hành Trình Mùa (gói tiến trình theo mùa): Đá Sao, Sách Kinh Nghiệm, Xu, một vũ khí 4★ chọn, một trang phục. Có nhánh miễn phí cho mọi người.
- Trang phục: chỉ đổi hình, không đổi chỉ số.

**Không bao giờ bán:**

- Chỉ số trực tiếp (Tấn công, Máu, chí mạng, "thuốc sức mạnh").
- Cấp Hộ Tinh, kinh nghiệm Hộ Tinh, mở Khai Tinh, cấp kỹ năng, Thiên Tượng.
- Bảo Ấn và Linh Lực (không có gói hồi Linh Lực bằng Đá Sao hay tiền).
- Vật phẩm bỏ qua cốt truyện, mở vùng, mở Tháp, bỏ qua Bia Đá hay câu đố.
- Thứ hạng, phần thưởng thi đấu, hay bất cứ thứ gì khiến người không nạp không thể có về lâu dài (trừ trang phục).
