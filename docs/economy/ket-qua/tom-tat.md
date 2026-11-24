# Kết quả mô phỏng kinh tế

100.000 người chơi ảo mỗi hồ sơ, 365 ngày, seed 20261123. Chạy lại: `pnpm economy:sim`. Cấu hình: `content/economy.yaml`.

## Kiểm tra mô hình phân tầng

- ĐẠT: Đội 4★ miễn phí đủ cấp qua mọi nội dung thường ở ngày mở và Tháp tầng 1–8 3★
- ĐẠT: F2P chơi kỹ (trung vị) qua 100% nội dung thường trước ngày 120
- ĐẠT: Độ dễ nội dung thường tăng dần theo mức nạp, F2P vẫn qua được
- ĐẠT: F2P chơi kỹ (trung vị) chạm Đỉnh trong khoảng ngày 180–365
- ĐẠT: Điểm tối đa chủ yếu dành cho Whale: ở ngày 365, dưới một nửa F2P và từ một nửa Whale trở lên đạt

Kết luận: **ĐẠT**

## Nguyên liệu vũ khí (người không nạp)

- Một vũ khí 4★ lên cấp 60: ngày 36 (mục tiêu 30–45).
- Vũ khí 4★ Lò Rèn R5: ngày 40 (mục tiêu khoảng 40).
- Xu cho vũ khí (cửa hàng quặng, kinh nghiệm, đột phá, Lò Rèn) tới ngày 40: 357.436, đã trừ vào Xu nuôi nhân vật (nhân vật ưu tiên).

## Bốn hồ sơ

| Hồ sơ                              | Chi tiêu/tháng | Đá Sao/tháng | Lượt ước 30 ngày (NV + VK) | Lượt ước 90 ngày (NV + VK) | Lượt ước 180 ngày (NV + VK) | Lượt ước 365 ngày (NV + VK) | 5★ (365 ngày) | 5★ giới hạn | Ngày có 5★ giới hạn đầu |
| ---------------------------------- | -------------- | ------------ | -------------------------- | -------------------------- | --------------------------- | --------------------------- | ------------- | ----------- | ----------------------- |
| F2P chơi kỹ                        | 0 đ            | 8.159        | 46 + 3                     | 46 + 3                     | 211 + 96                    | 373 + 165                   | 5,67          | 3,69        | 128                     |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | 185.429 đ      | 11.682       | 92 + 0                     | 254 + 0                    | 439 + 0                     | 782 + 0                     | 12,21         | 8,04        | 29                      |
| Nạp khá                            | 2.185.429 đ    | 18.728       | 120 + 29                   | 372 + 29                   | 630 + 79                    | 1.018 + 215                 | 16,08         | 10,65       | 14                      |
| Whale                              | 20.185.429 đ   | 76.427       | 522 + 4                    | 1.416 + 4                  | 2.284 + 350                 | 2.334 + 432                 | 37,50         | 25,00       | 1                       |

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

| Nội dung                               | Ngày mở | Chiến Lực cần | Đội 4★ miễn phí | F2P chơi kỹ    | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá             | Whale               | F2P qua từ ngày |
| -------------------------------------- | ------- | ------------- | --------------- | -------------- | ---------------------------------- | ------------------- | ------------------- | --------------- |
| Cốt truyện chương 1                    | 1       | 1.400         | 1.562 (1,12×)   | 1,64× dễ       | 1,67× dễ                           | 1,82× rất nhẹ nhàng | 2,72× rất nhẹ nhàng | 5               |
| Cốt truyện chương 2                    | 4       | 2.000         | 2.197 (1,10×)   | 1,15× qua được | 1,17× qua được                     | 1,27× vừa đủ        | 1,90× rất nhẹ nhàng | 5               |
| Cốt truyện chương 3                    | 10      | 2.900         | 3.077 (1,06×)   | 1,10× qua được | 1,12× qua được                     | 1,31× vừa đủ        | 1,81× rất nhẹ nhàng | 10              |
| Cốt truyện chương 4                    | 20      | 4.200         | 4.274 (1,02×)   | 1,10× qua được | 1,14× qua được                     | 1,28× vừa đủ        | 1,76× dễ            | 20              |
| Sự kiện thường                         | 21      | 4.200         | 4.401 (1,05×)   | 1,10× qua được | 1,14× qua được                     | 1,28× vừa đủ        | 1,76× dễ            | 25              |
| Cốt truyện chương 5                    | 35      | 5.400         | 5.517 (1,02×)   | 1,11× qua được | 1,29× vừa đủ                       | 1,44× vừa đủ        | 1,84× rất nhẹ nhàng | 35              |
| Boss thế giới Hắc Giao (Thiên Tượng 3) | 45      | 5.500         | 5.776 (1,05×)   | 1,14× qua được | 1,42× vừa đủ                       | 1,54× dễ            | 1,90× rất nhẹ nhàng | 45              |
| Cốt truyện chương 6                    | 55      | 6.500         | 6.698 (1,03×)   | 1,11× qua được | 1,44× vừa đủ                       | 1,54× dễ            | 1,89× rất nhẹ nhàng | 55              |
| Khám phá vùng mới (Thiên Tượng 4)      | 60      | 6.500         | 6.690 (1,03×)   | 1,12× qua được | 1,47× vừa đủ                       | 1,57× dễ            | 1,91× rất nhẹ nhàng | 60              |
| Cốt truyện chương 7                    | 80      | 7.500         | 7.974 (1,06×)   | 1,15× qua được | 1,57× dễ                           | 1,64× dễ            | 2,02× rất nhẹ nhàng | 80              |
| Ủy thác và boss Thiên Tượng 6          | 90      | 7.600         | 8.043 (1,06×)   | 1,14× qua được | 1,59× dễ                           | 1,64× dễ            | 2,01× rất nhẹ nhàng | 90              |
| Boss thế giới Thiên Tượng 8            | 120     | 9.000         | 9.296 (1,03×)   | 1,12× qua được | 1,58× dễ                           | 1,63× dễ            | 1,99× rất nhẹ nhàng | 120             |

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
| F2P chơi kỹ                        | 1,10×           | 1,12×          | qua được      |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | 1,12×           | 1,44×          | vừa đủ        |
| Nạp khá                            | 1,27×           | 1,54×          | dễ            |
| Whale                              | 1,76×           | 1,90×          | rất nhẹ nhàng |

## B. Nội dung đỉnh

Chạm Đỉnh: sao tối đa tầng 12 bản Đỉnh, cần 8.797 sát thương/giây. Điểm tối đa (bảng xếp hạng): 12.139 sát thương/giây.

| Ngày | F2P chơi kỹ: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao): sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Nạp khá: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Whale: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa |
| ---- | --------------------------------------- | --------- | ----------- | -------------------------------------------------------------- | --------- | ----------- | ----------------------------------- | --------- | ----------- | --------------------------------- | --------- | ----------- |
| 30   | 2.359 (27%)                             | 0%        | 0%          | 2.989 (34%)                                                    | 0%        | 0%          | 3.177 (36%)                         | 0%        | 0%          | 4.270 (49%)                       | 0%        | 0%          |
| 90   | 4.219 (48%)                             | 0%        | 0%          | 6.240 (71%)                                                    | 0%        | 0%          | 6.460 (73%)                         | 0,00%     | 0%          | 8.409 (96%)                       | 10%       | 0%          |
| 180  | 8.359 (95%)                             | 25%       | 0%          | 7.487 (85%)                                                    | 0,14%     | 0%          | 8.759 (100%)                        | 61%       | 0,00%       | 13.388 (152%)                     | 100%      | 98%         |
| 365  | 9.693 (110%)                            | 100%      | 0,01%       | 8.189 (93%)                                                    | 9%        | 0%          | 10.962 (125%)                       | 100%      | 7%          | 13.849 (157%)                     | 100%      | 100%        |

| Hồ sơ                              | Ngày chạm Đỉnh (trung vị) | Ngày đạt điểm tối đa (trung vị) |
| ---------------------------------- | ------------------------- | ------------------------------- |
| F2P chơi kỹ                        | 295                       | > 365                           |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | > 365                     | > 365                           |
| Nạp khá                            | 160                       | > 365                           |
| Whale                              | 95                        | 155                             |

## Chiến Lực đội theo thời gian (trung vị)

| Ngày | F2P chơi kỹ | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá | Whale  | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) / F2P | Nạp khá / F2P | Whale / F2P |
| ---- | ----------- | ---------------------------------- | ------- | ------ | ---------------------------------------- | ------------- | ----------- |
| 30   | 4.942       | 5.698                              | 6.063   | 7.873  | 1,15×                                    | 1,23×         | 1,59×       |
| 90   | 8.689       | 12.109                             | 12.494  | 15.307 | 1,39×                                    | 1,44×         | 1,76×       |
| 180  | 14.430      | 14.634                             | 15.877  | 21.434 | 1,01×                                    | 1,10×         | 1,49×       |
| 365  | 16.156      | 15.486                             | 17.968  | 21.789 | 0,96×                                    | 1,11×         | 1,35×       |

## Người chơi trung vị

- F2P chơi kỹ, ngày 30: Chiến Lực đội 4.942, sát thương/giây 2.337, 49 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: chưa có; 7 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 30: Chiến Lực đội 5.698, sát thương/giây 2.929, 103 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: Phong Vân N0; 11 nhân vật 4★.
- Nạp khá, ngày 30: Chiến Lực đội 6.063, sát thương/giây 3.138, 124 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: Thủy Nguyệt N0, Tuyết Lan N0; 10 nhân vật 4★.
- Whale, ngày 30: Chiến Lực đội 7.873, sát thương/giây 4.172, 526 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N3, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N1, Lôi Đình N3, Tuyết Lan N0; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 90: Chiến Lực đội 8.689, sát thương/giây 4.179, 49 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: chưa có; 7 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 90: Chiến Lực đội 12.109, sát thương/giây 6.196, 260 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình chưa có, vũ khí 4★ Lò Rèn; 5★: Thạch Sơn N0, Tuyết Lan N0, Takane N0, Ardo N0; 12 nhân vật 4★.
- Nạp khá, ngày 90: Chiến Lực đội 12.494, sát thương/giây 6.347, 419 lượt ước nhân vật + 1 lượt ước vũ khí; chủ lực Lôi Đình N0, vũ khí 4★ Lò Rèn; 5★: Thủy Nguyệt N0, Lôi Đình N0, Thạch Sơn N1, Ardo N0; 12 nhân vật 4★.
- Whale, ngày 90: Chiến Lực đội 15.307, sát thương/giây 8.409, 1384 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N4, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N0, Thủy Nguyệt N0, Phong Vân N0, Lôi Đình N4, Thạch Sơn N1, Tuyết Lan N2, Takane N2, Ardo N2, Naraa N2; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 180: Chiến Lực đội 14.430, sát thương/giây 8.354, 207 lượt ước nhân vật + 100 lượt ước vũ khí; chủ lực Lôi Đình N1, Thiên Lôi Phá Trận R1; 5★: Thủy Nguyệt N0, Lôi Đình N1; 12 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 180: Chiến Lực đội 14.634, sát thương/giây 7.563, 465 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N0, vũ khí 4★ Lò Rèn; 5★: Phong Vân N1, Lôi Đình N0, Thạch Sơn N0, Nghiên Thu N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Nạp khá, ngày 180: Chiến Lực đội 15.877, sát thương/giây 8.752, 638 lượt ước nhân vật + 65 lượt ước vũ khí; chủ lực Lôi Đình N1, Thiên Lôi Phá Trận R1; 5★: Lạc Hồng N0, Thủy Nguyệt N0, Phong Vân N0, Lôi Đình N1, Tuyết Lan N0, Takane N0, Golnar N0, Ardo N0; 13 nhân vật 4★.
- Whale, ngày 180: Chiến Lực đội 21.434, sát thương/giây 12.598, 2583 lượt ước nhân vật + 145 lượt ước vũ khí; chủ lực Lôi Đình N6, Thiên Lôi Phá Trận R1; 5★: Lạc Hồng N6, Thủy Nguyệt N0, Phong Vân N4, Lôi Đình N6, Thạch Sơn N2, Tuyết Lan N2, Nghiên Thu N1, Takane N0, Golnar N2, Ardo N2, Naraa N1; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 365: Chiến Lực đội 16.156, sát thương/giây 9.747, 405 lượt ước nhân vật + 133 lượt ước vũ khí; chủ lực Lôi Đình N3, Thiên Lôi Phá Trận R2; 5★: Lôi Đình N3, Thạch Sơn N0; 13 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 365: Chiến Lực đội 15.486, sát thương/giây 8.382, 770 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lôi Đình N2, vũ khí 4★ Lò Rèn; 5★: Thủy Nguyệt N0, Lôi Đình N2, Thạch Sơn N0, Tuyết Lan N0, Nghiên Thu N0, Takane N0, Golnar N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Nạp khá, ngày 365: Chiến Lực đội 17.968, sát thương/giây 10.571, 1182 lượt ước nhân vật + 49 lượt ước vũ khí; chủ lực Lôi Đình N3, Thiên Lôi Phá Trận R2; 5★: Lạc Hồng N0, Thủy Nguyệt N1, Lôi Đình N3, Thạch Sơn N3, Tuyết Lan N0, Nghiên Thu N0, Takane N0, Golnar N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Whale, ngày 365: Chiến Lực đội 21.789, sát thương/giây 13.767, 2215 lượt ước nhân vật + 337 lượt ước vũ khí; chủ lực Lôi Đình N6, Thiên Lôi Phá Trận R5; 5★: Phong Vân N4, Lôi Đình N6, Thạch Sơn N4, Tuyết Lan N2, Nghiên Thu N2, Takane N2, Golnar N2, Ardo N2, Naraa N2; 13 nhân vật 4★.
