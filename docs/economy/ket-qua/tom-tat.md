# Kết quả mô phỏng kinh tế

100.000 người chơi ảo mỗi hồ sơ, 365 ngày, seed 20261123. Chạy lại: `pnpm economy:sim`. Cấu hình: `content/economy.yaml`.

## Kiểm tra mô hình phân tầng

- ĐẠT: Đội 4★ miễn phí đủ cấp qua mọi nội dung thường ở ngày mở và Tháp tầng 1–8 3★
- ĐẠT: F2P chơi kỹ (trung vị) qua 100% nội dung thường trước ngày 120
- ĐẠT: Độ dễ nội dung thường tăng dần theo mức nạp, F2P vẫn qua được
- ĐẠT: F2P chơi kỹ (trung vị) chạm Đỉnh trong khoảng ngày 180–365
- ĐẠT: Điểm tối đa chủ yếu dành cho Whale: ở ngày 365, dưới một nửa F2P và từ một nửa Whale trở lên đạt

Kết luận: **ĐẠT**

## Bốn hồ sơ

| Hồ sơ                              | Chi tiêu/tháng | Đá Sao/tháng | Lượt ước 30 ngày (NV + VK) | Lượt ước 90 ngày (NV + VK) | Lượt ước 180 ngày (NV + VK) | Lượt ước 365 ngày (NV + VK) | 5★ (365 ngày) | 5★ giới hạn | Ngày có 5★ giới hạn đầu |
| ---------------------------------- | -------------- | ------------ | -------------------------- | -------------------------- | --------------------------- | --------------------------- | ------------- | ----------- | ----------------------- |
| F2P chơi kỹ                        | 0 đ            | 8.132        | 45 + 3                     | 45 + 3                     | 209 + 96                    | 371 + 165                   | 5,64          | 3,68        | 128                     |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | 185.429 đ      | 11.656       | 91 + 0                     | 252 + 0                    | 437 + 0                     | 781 + 0                     | 12,19         | 8,03        | 29                      |
| Nạp khá                            | 2.185.429 đ    | 18.702       | 119 + 28                   | 371 + 28                   | 628 + 78                    | 1.016 + 215                 | 16,06         | 10,63       | 14                      |
| Whale                              | 20.185.429 đ   | 76.400       | 521 + 4                    | 1.414 + 4                  | 2.284 + 349                 | 2.334 + 432                 | 37,50         | 25,00       | 1                       |

## Chủ lực theo thời gian (trung vị Nét Sao và tinh luyện)

Chủ lực: Lôi Đình (banner giới hạn đầu tiên), vũ khí đặc trưng: Thiên Lôi Phá Trận.

| Ngày | F2P chơi kỹ         | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá        | Whale          |
| ---- | ------------------- | ---------------------------------- | -------------- | -------------- |
| 30   | chưa có · vũ khí 4★ | chưa có · vũ khí 4★                | N0 · vũ khí 4★ | N4 · vũ khí 4★ |
| 90   | chưa có · vũ khí 4★ | chưa có · vũ khí 4★                | N0 · vũ khí 4★ | N4 · vũ khí 4★ |
| 180  | N1 · R1             | N0 · vũ khí 4★                     | N1 · R1        | N6 · R4        |
| 365  | N2 · R2             | N1 · vũ khí 4★                     | N4 · R2        | N6 · R5        |

## A. Nội dung thường

F2P chơi kỹ (trung vị) qua 100% nội dung thường từ ngày **120** (yêu cầu: trước ngày 120).

Độ dư = Chiến Lực đội (trung vị) ở ngày mở / Chiến Lực cần. Dưới 1,00×: chưa qua; tới 1,25×: qua được; tới 1,50×: vừa đủ; tới 1,80×: dễ; từ 1,80×: rất nhẹ nhàng.

| Nội dung                               | Ngày mở | Chiến Lực cần | Đội 4★ miễn phí | F2P chơi kỹ    | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá        | Whale               | F2P qua từ ngày |
| -------------------------------------- | ------- | ------------- | --------------- | -------------- | ---------------------------------- | -------------- | ------------------- | --------------- |
| Cốt truyện chương 1                    | 1       | 1.400         | 1.435 (1,02×)   | 1,57× dễ       | 1,59× dễ                           | 1,75× dễ       | 2,68× rất nhẹ nhàng | 5               |
| Cốt truyện chương 2                    | 4       | 2.000         | 2.157 (1,08×)   | 1,10× qua được | 1,11× qua được                     | 1,22× qua được | 1,87× rất nhẹ nhàng | 5               |
| Cốt truyện chương 3                    | 10      | 2.900         | 3.078 (1,06×)   | 1,10× qua được | 1,13× qua được                     | 1,32× vừa đủ   | 1,85× rất nhẹ nhàng | 10              |
| Cốt truyện chương 4                    | 20      | 4.200         | 4.389 (1,04×)   | 1,13× qua được | 1,17× qua được                     | 1,33× vừa đủ   | 1,85× rất nhẹ nhàng | 20              |
| Sự kiện thường                         | 21      | 4.200         | 4.403 (1,05×)   | 1,13× qua được | 1,17× qua được                     | 1,33× vừa đủ   | 1,85× rất nhẹ nhàng | 25              |
| Cốt truyện chương 5                    | 35      | 5.400         | 5.732 (1,06×)   | 1,15× qua được | 1,36× vừa đủ                       | 1,52× dễ       | 1,98× rất nhẹ nhàng | 35              |
| Boss thế giới Hắc Giao (Thiên Tượng 3) | 45      | 5.500         | 5.810 (1,06×)   | 1,15× qua được | 1,46× vừa đủ                       | 1,60× dễ       | 2,00× rất nhẹ nhàng | 45              |
| Cốt truyện chương 6                    | 55      | 6.500         | 6.818 (1,05×)   | 1,14× qua được | 1,49× vừa đủ                       | 1,60× dễ       | 1,98× rất nhẹ nhàng | 55              |
| Khám phá vùng mới (Thiên Tượng 4)      | 60      | 6.500         | 6.818 (1,05×)   | 1,14× qua được | 1,51× dễ                           | 1,61× dễ       | 1,99× rất nhẹ nhàng | 60              |
| Cốt truyện chương 7                    | 80      | 7.500         | 7.904 (1,05×)   | 1,15× qua được | 1,58× dễ                           | 1,66× dễ       | 2,07× rất nhẹ nhàng | 80              |
| Ủy thác và boss Thiên Tượng 6          | 90      | 7.600         | 8.032 (1,06×)   | 1,15× qua được | 1,62× dễ                           | 1,68× dễ       | 2,07× rất nhẹ nhàng | 90              |
| Boss thế giới Thiên Tượng 8            | 120     | 9.000         | 9.474 (1,05×)   | 1,14× qua được | 1,64× dễ                           | 1,70× dễ       | 2,07× rất nhẹ nhàng | 120             |

### Tháp Tinh Tú tầng 1–8 (nội dung thường)

| Tầng | Sát thương/giây cần cho 3★ | Đội 4★ miễn phí đạt ngày | F2P đạt ngày |
| ---- | -------------------------- | ------------------------ | ------------ |
| 1    | 88                         | 1                        | 5            |
| 2    | 144                        | 1                        | 5            |
| 3    | 144                        | 1                        | 5            |
| 4    | 374                        | 1                        | 5            |
| 5    | 439                        | 1                        | 5            |
| 6    | 556                        | 1                        | 5            |
| 7    | 556                        | 1                        | 5            |
| 8    | 688                        | 1                        | 5            |

### Độ dễ theo hồ sơ

| Hồ sơ                              | Độ dư thấp nhất | Độ dư trung vị | Độ dễ         |
| ---------------------------------- | --------------- | -------------- | ------------- |
| F2P chơi kỹ                        | 1,10×           | 1,14×          | qua được      |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | 1,11×           | 1,49×          | vừa đủ        |
| Nạp khá                            | 1,22×           | 1,60×          | dễ            |
| Whale                              | 1,85×           | 1,99×          | rất nhẹ nhàng |

## B. Nội dung đỉnh

Chạm Đỉnh: sao tối đa tầng 12 bản Đỉnh, cần 8.797 sát thương/giây. Điểm tối đa (bảng xếp hạng): 12.139 sát thương/giây.

| Ngày | F2P chơi kỹ: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao): sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Nạp khá: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Whale: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa |
| ---- | --------------------------------------- | --------- | ----------- | -------------------------------------------------------------- | --------- | ----------- | ----------------------------------- | --------- | ----------- | --------------------------------- | --------- | ----------- |
| 30   | 2.518 (29%)                             | 0%        | 0%          | 3.204 (36%)                                                    | 0%        | 0%          | 3.400 (39%)                         | 0%        | 0%          | 4.618 (52%)                       | 0%        | 0%          |
| 90   | 4.335 (49%)                             | 0%        | 0%          | 6.414 (73%)                                                    | 0%        | 0%          | 6.633 (75%)                         | 0,00%     | 0%          | 8.705 (99%)                       | 30%       | 0%          |
| 180  | 8.779 (100%)                            | 48%       | 0%          | 7.895 (90%)                                                    | 0,84%     | 0%          | 9.252 (105%)                        | 75%       | 0,00%       | 14.132 (161%)                     | 100%      | 98%         |
| 365  | 10.088 (115%)                           | 100%      | 0,27%       | 8.577 (98%)                                                    | 39%       | 0%          | 11.413 (130%)                       | 100%      | 17%         | 14.502 (165%)                     | 100%      | 100%        |

| Hồ sơ                              | Ngày chạm Đỉnh (trung vị) | Ngày đạt điểm tối đa (trung vị) |
| ---------------------------------- | ------------------------- | ------------------------------- |
| F2P chơi kỹ                        | 295                       | > 365                           |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | > 365                     | > 365                           |
| Nạp khá                            | 150                       | > 365                           |
| Whale                              | 95                        | 155                             |

## Chiến Lực đội theo thời gian (trung vị)

| Ngày | F2P chơi kỹ | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá | Whale  | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) / F2P | Nạp khá / F2P | Whale / F2P |
| ---- | ----------- | ---------------------------------- | ------- | ------ | ---------------------------------------- | ------------- | ----------- |
| 30   | 5.103       | 5.928                              | 6.309   | 8.328  | 1,16×                                    | 1,24×         | 1,63×       |
| 90   | 8.730       | 12.318                             | 12.771  | 15.735 | 1,41×                                    | 1,46×         | 1,80×       |
| 180  | 15.032      | 15.368                             | 16.692  | 22.526 | 1,02×                                    | 1,11×         | 1,50×       |
| 365  | 16.993      | 16.394                             | 18.884  | 22.989 | 0,96×                                    | 1,11×         | 1,35×       |

## Người chơi trung vị

- F2P chơi kỹ, ngày 30: Chiến Lực đội 5.103, sát thương/giây 2.488, 48 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: chưa có; 8 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 30: Chiến Lực đội 5.928, sát thương/giây 2.935, 102 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: Thạch Sơn N0; 10 nhân vật 4★.
- Nạp khá, ngày 30: Chiến Lực đội 6.309, sát thương/giây 3.225, 151 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: Phong Vân N0; 12 nhân vật 4★.
- Whale, ngày 30: Chiến Lực đội 8.328, sát thương/giây 4.619, 525 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N4, vũ khí 4★ Lò Rèn; 5★: Thủy Nguyệt N0, Phong Vân N0, Lôi Đình N4; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 90: Chiến Lực đội 8.730, sát thương/giây 4.335, 48 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: chưa có; 8 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 90: Chiến Lực đội 12.318, sát thương/giây 6.269, 258 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: Thạch Sơn N0, Takane N0, Ardo N0; 12 nhân vật 4★.
- Nạp khá, ngày 90: Chiến Lực đội 12.771, sát thương/giây 6.595, 418 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N0, Phong Vân N1, Tuyết Lan N0, Takane N0, Ardo N0; 13 nhân vật 4★.
- Whale, ngày 90: Chiến Lực đội 15.735, sát thương/giây 8.705, 1431 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N4, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N1, Thủy Nguyệt N2, Lôi Đình N4, Thạch Sơn N1, Tuyết Lan N2, Takane N2, Ardo N2; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 180: Chiến Lực đội 15.032, sát thương/giây 8.755, 238 lượt ước nhân vật + 67 lượt ước vũ khí; chủ lực Lôi Đình N1, Thiên Lôi Phá Trận R1; 5★: Lạc Hồng N0, Lôi Đình N1; 11 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 180: Chiến Lực đội 15.368, sát thương/giây 7.863, 428 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N0, vũ khí 4★ Lò Rèn; 5★: Lôi Đình N0, Thạch Sơn N1, Tuyết Lan N0, Takane N0, Golnar N0, Ardo N0; 13 nhân vật 4★.
- Nạp khá, ngày 180: Chiến Lực đội 16.692, sát thương/giây 9.294, 613 lượt ước nhân vật + 88 lượt ước vũ khí; chủ lực Lôi Đình N1, Thiên Lôi Phá Trận R1; 5★: Thủy Nguyệt N0, Phong Vân N1, Lôi Đình N1, Tuyết Lan N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Whale, ngày 180: Chiến Lực đội 22.526, sát thương/giây 14.003, 2326 lượt ước nhân vật + 317 lượt ước vũ khí; chủ lực Lôi Đình N6, Thiên Lôi Phá Trận R5; 5★: Lạc Hồng N0, Thủy Nguyệt N4, Phong Vân N2, Lôi Đình N6, Thạch Sơn N4, Tuyết Lan N2, Nghiên Thu N2, Takane N2, Golnar N2, Ardo N2, Naraa N2; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 365: Chiến Lực đội 16.993, sát thương/giây 9.992, 338 lượt ước nhân vật + 198 lượt ước vũ khí; chủ lực Lôi Đình N2, Thiên Lôi Phá Trận R2; 5★: Thủy Nguyệt N1, Lôi Đình N2; 12 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 365: Chiến Lực đội 16.394, sát thương/giây 8.813, 768 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N2, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N0, Phong Vân N0, Lôi Đình N2, Tuyết Lan N0, Nghiên Thu N0, Takane N0, Golnar N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Nạp khá, ngày 365: Chiến Lực đội 18.884, sát thương/giây 11.708, 952 lượt ước nhân vật + 277 lượt ước vũ khí; chủ lực Lôi Đình N4, Thiên Lôi Phá Trận R3; 5★: Thủy Nguyệt N0, Phong Vân N0, Lôi Đình N4, Thạch Sơn N1, Tuyết Lan N0, Nghiên Thu N0, Takane N0, Golnar N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Whale, ngày 365: Chiến Lực đội 22.989, sát thương/giây 14.520, 2397 lượt ước nhân vật + 508 lượt ước vũ khí; chủ lực Lôi Đình N6, Thiên Lôi Phá Trận R5; 5★: Lạc Hồng N3, Thủy Nguyệt N4, Phong Vân N3, Lôi Đình N6, Thạch Sơn N3, Tuyết Lan N2, Nghiên Thu N2, Takane N2, Golnar N2, Ardo N2, Naraa N2; 13 nhân vật 4★.
