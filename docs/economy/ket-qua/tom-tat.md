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
| F2P chơi kỹ                        | 0 đ            | 8.132        | 45 + 3                     | 45 + 3                     | 180 + 89                    | 325 + 165                   | 4,95          | 3,23        | 110                     |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | 185.429 đ      | 11.656       | 91 + 0                     | 252 + 0                    | 403 + 0                     | 695 + 0                     | 10,84         | 7,14        | 29                      |
| Nạp khá                            | 2.185.429 đ    | 18.702       | 119 + 28                   | 371 + 28                   | 552 + 73                    | 898 + 222                   | 14,15         | 9,36        | 14                      |
| Whale                              | 20.185.429 đ   | 76.400       | 521 + 4                    | 1.414 + 4                  | 2.022 + 254                 | 2.054 + 432                 | 33,00         | 22,00       | 1                       |

## Chủ lực theo thời gian (trung vị Nét Sao và tinh luyện)

Chủ lực: Lạc Hồng (banner giới hạn đầu tiên), vũ khí đặc trưng: Hồng Vũ Trường Ca.

| Ngày | F2P chơi kỹ         | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá        | Whale          |
| ---- | ------------------- | ---------------------------------- | -------------- | -------------- |
| 30   | chưa có · vũ khí 4★ | chưa có · vũ khí 4★                | N0 · vũ khí 4★ | N4 · vũ khí 4★ |
| 90   | chưa có · vũ khí 4★ | chưa có · vũ khí 4★                | N0 · vũ khí 4★ | N4 · vũ khí 4★ |
| 180  | N0 · R1             | N0 · vũ khí 4★                     | N0 · R1        | N6 · R3        |
| 365  | N2 · R2             | N1 · vũ khí 4★                     | N3 · R2        | N6 · R5        |

## A. Nội dung thường

F2P chơi kỹ (trung vị) qua 100% nội dung thường từ ngày **120** (yêu cầu: trước ngày 120).

Độ dư = Chiến Lực đội (trung vị) ở ngày mở / Chiến Lực cần. Dưới 1,00×: chưa qua; tới 1,25×: qua được; tới 1,50×: vừa đủ; tới 1,80×: dễ; từ 1,80×: rất nhẹ nhàng.

| Nội dung                               | Ngày mở | Chiến Lực cần | Đội 4★ miễn phí | F2P chơi kỹ    | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá        | Whale               | F2P qua từ ngày |
| -------------------------------------- | ------- | ------------- | --------------- | -------------- | ---------------------------------- | -------------- | ------------------- | --------------- |
| Cốt truyện chương 1                    | 1       | 1.400         | 1.435 (1,02×)   | 1,57× dễ       | 1,59× dễ                           | 1,75× dễ       | 2,66× rất nhẹ nhàng | 5               |
| Cốt truyện chương 2                    | 4       | 2.000         | 2.157 (1,08×)   | 1,10× qua được | 1,11× qua được                     | 1,22× qua được | 1,86× rất nhẹ nhàng | 5               |
| Cốt truyện chương 3                    | 10      | 2.900         | 3.078 (1,06×)   | 1,10× qua được | 1,13× qua được                     | 1,32× vừa đủ   | 1,84× rất nhẹ nhàng | 10              |
| Cốt truyện chương 4                    | 20      | 4.200         | 4.389 (1,04×)   | 1,13× qua được | 1,17× qua được                     | 1,33× vừa đủ   | 1,84× rất nhẹ nhàng | 20              |
| Sự kiện thường                         | 21      | 4.200         | 4.403 (1,05×)   | 1,13× qua được | 1,17× qua được                     | 1,33× vừa đủ   | 1,84× rất nhẹ nhàng | 25              |
| Cốt truyện chương 5                    | 35      | 5.400         | 5.732 (1,06×)   | 1,15× qua được | 1,35× vừa đủ                       | 1,49× vừa đủ   | 1,92× rất nhẹ nhàng | 35              |
| Boss thế giới Hắc Giao (Thiên Tượng 3) | 45      | 5.500         | 5.810 (1,06×)   | 1,15× qua được | 1,44× vừa đủ                       | 1,57× dễ       | 1,94× rất nhẹ nhàng | 45              |
| Cốt truyện chương 6                    | 55      | 6.500         | 6.818 (1,05×)   | 1,14× qua được | 1,47× vừa đủ                       | 1,57× dễ       | 1,93× rất nhẹ nhàng | 55              |
| Khám phá vùng mới (Thiên Tượng 4)      | 60      | 6.500         | 6.818 (1,05×)   | 1,14× qua được | 1,49× vừa đủ                       | 1,58× dễ       | 1,94× rất nhẹ nhàng | 60              |
| Cốt truyện chương 7                    | 80      | 7.500         | 7.904 (1,05×)   | 1,15× qua được | 1,56× dễ                           | 1,65× dễ       | 2,02× rất nhẹ nhàng | 80              |
| Ủy thác và boss Thiên Tượng 6          | 90      | 7.600         | 8.032 (1,06×)   | 1,15× qua được | 1,60× dễ                           | 1,67× dễ       | 2,03× rất nhẹ nhàng | 90              |
| Boss thế giới Thiên Tượng 8            | 120     | 9.000         | 9.474 (1,05×)   | 1,14× qua được | 1,63× dễ                           | 1,71× dễ       | 2,06× rất nhẹ nhàng | 120             |

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
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | 1,11×           | 1,47×          | vừa đủ        |
| Nạp khá                            | 1,22×           | 1,57×          | dễ            |
| Whale                              | 1,84×           | 1,94×          | rất nhẹ nhàng |

## B. Nội dung đỉnh

Chạm Đỉnh: sao tối đa tầng 12 bản Đỉnh, cần 8.334 sát thương/giây. Điểm tối đa (bảng xếp hạng): 11.501 sát thương/giây.

| Ngày | F2P chơi kỹ: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao): sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Nạp khá: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa | Whale: sát thương/giây (trung vị) | chạm Đỉnh | điểm tối đa |
| ---- | --------------------------------------- | --------- | ----------- | -------------------------------------------------------------- | --------- | ----------- | ----------------------------------- | --------- | ----------- | --------------------------------- | --------- | ----------- |
| 30   | 2.518 (30%)                             | 0%        | 0%          | 3.045 (37%)                                                    | 0%        | 0%          | 3.331 (40%)                         | 0%        | 0%          | 4.523 (54%)                       | 0%        | 0%          |
| 90   | 4.335 (52%)                             | 0%        | 0%          | 6.357 (76%)                                                    | 0%        | 0%          | 6.585 (79%)                         | 0,00%     | 0%          | 8.482 (102%)                      | 64%       | 0%          |
| 180  | 7.993 (96%)                             | 24%       | 0%          | 7.851 (94%)                                                    | 7%        | 0%          | 8.517 (102%)                        | 70%       | 0%          | 12.512 (150%)                     | 100%      | 84%         |
| 365  | 9.346 (112%)                            | 100%      | 0,16%       | 8.421 (101%)                                                   | 55%       | 0%          | 10.572 (127%)                       | 100%      | 6%          | 13.372 (160%)                     | 100%      | 100%        |

| Hồ sơ                              | Ngày chạm Đỉnh (trung vị) | Ngày đạt điểm tối đa (trung vị) |
| ---------------------------------- | ------------------------- | ------------------------------- |
| F2P chơi kỹ                        | 255                       | > 365                           |
| Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | 270                       | > 365                           |
| Nạp khá                            | 135                       | > 365                           |
| Whale                              | 85                        | 130                             |

## Chiến Lực đội theo thời gian (trung vị)

| Ngày | F2P chơi kỹ | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) | Nạp khá | Whale  | Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao) / F2P | Nạp khá / F2P | Whale / F2P |
| ---- | ----------- | ---------------------------------- | ------- | ------ | ---------------------------------------- | ------------- | ----------- |
| 30   | 5.103       | 5.885                              | 6.242   | 8.283  | 1,15×                                    | 1,22×         | 1,62×       |
| 90   | 8.730       | 12.181                             | 12.705  | 15.419 | 1,40×                                    | 1,46×         | 1,77×       |
| 180  | 14.275      | 15.236                             | 16.109  | 20.951 | 1,07×                                    | 1,13×         | 1,47×       |
| 365  | 16.236      | 16.221                             | 18.184  | 21.726 | 1,00×                                    | 1,12×         | 1,34×       |

## Người chơi trung vị

- F2P chơi kỹ, ngày 30: Chiến Lực đội 5.103, sát thương/giây 2.488, 48 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng chưa có, vũ khí 4★ Lò Rèn; 5★: chưa có; 8 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 30: Chiến Lực đội 5.885, sát thương/giây 3.101, 102 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng chưa có, vũ khí 4★ Lò Rèn; 5★: Phong Vân N0; 10 nhân vật 4★.
- Nạp khá, ngày 30: Chiến Lực đội 6.242, sát thương/giây 3.305, 89 lượt ước nhân vật + 62 lượt ước vũ khí; chủ lực Lạc Hồng N0, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N0, Thủy Nguyệt N0; 9 nhân vật 4★.
- Whale, ngày 30: Chiến Lực đội 8.283, sát thương/giây 4.502, 525 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng N4, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N4, Thủy Nguyệt N0, Thạch Sơn N0; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 90: Chiến Lực đội 8.730, sát thương/giây 4.335, 48 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng chưa có, vũ khí 4★ Lò Rèn; 5★: chưa có; 8 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 90: Chiến Lực đội 12.181, sát thương/giây 6.354, 258 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng chưa có, vũ khí 4★ Lò Rèn; 5★: Tuyết Lan N0, Takane N0, Golnar N0; 12 nhân vật 4★.
- Nạp khá, ngày 90: Chiến Lực đội 12.705, sát thương/giây 6.639, 361 lượt ước nhân vật + 57 lượt ước vũ khí; chủ lực Lạc Hồng N0, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N0, Lôi Đình N0, Takane N0, Golnar N0, Naraa N0; 13 nhân vật 4★.
- Whale, ngày 90: Chiến Lực đội 15.419, sát thương/giây 8.349, 1431 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng N3, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N3, Phong Vân N0, Lôi Đình N1, Thạch Sơn N1, Tuyết Lan N3, Takane N2, Golnar N2, Naraa N1; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 180: Chiến Lực đội 14.275, sát thương/giây 8.250, 205 lượt ước nhân vật + 64 lượt ước vũ khí; chủ lực Lạc Hồng N1, Hồng Vũ Trường Ca R1; 5★: Lạc Hồng N1, Tuyết Lan N0; 13 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 180: Chiến Lực đội 15.236, sát thương/giây 7.899, 378 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng chưa có, vũ khí 4★ Lò Rèn; 5★: Lôi Đình N0, Nghiên Thu N0, Takane N0, Golnar N0; 12 nhân vật 4★.
- Nạp khá, ngày 180: Chiến Lực đội 16.109, sát thương/giây 8.617, 478 lượt ước nhân vật + 136 lượt ước vũ khí; chủ lực Lạc Hồng N1, Hồng Vũ Trường Ca R1; 5★: Lạc Hồng N1, Thủy Nguyệt N0, Takane N0, Golnar N0, Ardo N0, Naraa N0; 12 nhân vật 4★.
- Whale, ngày 180: Chiến Lực đội 20.951, sát thương/giây 12.390, 2074 lượt ước nhân vật + 228 lượt ước vũ khí; chủ lực Lạc Hồng N6, Hồng Vũ Trường Ca R2; 5★: Lạc Hồng N6, Thủy Nguyệt N1, Phong Vân N2, Lôi Đình N3, Thạch Sơn N1, Nghiên Thu N2, Takane N2, Golnar N2, Ardo N2, Naraa N2; 13 nhân vật 4★.
- F2P chơi kỹ, ngày 365: Chiến Lực đội 16.236, sát thương/giây 8.920, 339 lượt ước nhân vật + 136 lượt ước vũ khí; chủ lực Lạc Hồng N1, Hồng Vũ Trường Ca R1; 5★: Lạc Hồng N1, Phong Vân N0, Thạch Sơn N0, Tuyết Lan N0; 12 nhân vật 4★.
- Nạp nhẹ (thẻ tháng + Hộ Chiếu Sao), ngày 365: Chiến Lực đội 16.221, sát thương/giây 8.274, 825 lượt ước nhân vật + 0 lượt ước vũ khí; chủ lực Lạc Hồng N1, vũ khí 4★ Lò Rèn; 5★: Lạc Hồng N1, Thủy Nguyệt N1, Lôi Đình N0, Tuyết Lan N0, Nghiên Thu N0, Takane N0, Golnar N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Nạp khá, ngày 365: Chiến Lực đội 18.184, sát thương/giây 10.793, 953 lượt ước nhân vật + 147 lượt ước vũ khí; chủ lực Lạc Hồng N4, Hồng Vũ Trường Ca R3; 5★: Lạc Hồng N4, Thủy Nguyệt N0, Phong Vân N1, Tuyết Lan N0, Nghiên Thu N0, Takane N0, Golnar N0, Ardo N0, Naraa N0; 13 nhân vật 4★.
- Whale, ngày 365: Chiến Lực đội 21.726, sát thương/giây 13.434, 2115 lượt ước nhân vật + 472 lượt ước vũ khí; chủ lực Lạc Hồng N6, Hồng Vũ Trường Ca R5; 5★: Lạc Hồng N6, Thủy Nguyệt N2, Phong Vân N0, Lôi Đình N1, Thạch Sơn N1, Tuyết Lan N1, Nghiên Thu N2, Takane N2, Golnar N2, Ardo N2, Naraa N2; 13 nhân vật 4★.
