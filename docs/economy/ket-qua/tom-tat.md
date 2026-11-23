# Kết quả mô phỏng

Tạo bằng `pnpm economy:sim --players 100000 --days 180 --seed 20261123`. Không sửa tay.

## Ba hồ sơ

| Hồ sơ              | Lượt ước 30 ngày | Lượt ước 90 ngày | Lượt ước 180 ngày | 5★ (180 ngày) | 5★ giới hạn | Ngày có 5★ giới hạn đầu | Đá Sao/tháng |
| ------------------ | ---------------- | ---------------- | ----------------- | ------------- | ----------- | ----------------------- | ------------ |
| Không nạp          | 79               | 189              | 330               | 4,92          | 3,17        | 40                      | 8.800        |
| Nạp ít (thẻ tháng) | 98               | 245              | 442               | 6,67          | 4,34        | 31                      | 11.800       |
| Nạp nhiều          | 334              | 854              | 1.606             | 25,38         | 16,81       | 1                       | 42.836       |

## Trần chênh lệch Chiến Lực (≤ 1,60×)

| Ngày | Không nạp | Thẻ tháng | Nạp nhiều | Nạp nhiều p99 | Nạp nhiều cao nhất | Tỉ lệ p50 | Tỉ lệ p99 | Tỉ lệ cao nhất | Kết quả | Tham khảo: không hạn mức |
| ---- | --------- | --------- | --------- | ------------- | ------------------ | --------- | --------- | -------------- | ------- | ------------------------ |
| 30   | 5.260     | 5.416     | 6.812     | 7.317         | 7.928              | 1,30×     | 1,39×     | 1,51×          | ĐẠT     | 11.163 (2,12×)           |
| 90   | 10.609    | 10.988    | 13.171    | 14.190        | 15.232             | 1,24×     | 1,34×     | 1,44×          | ĐẠT     | 18.817 (1,77×)           |
| 180  | 13.682    | 14.149    | 17.462    | 19.071        | 20.539             | 1,28×     | 1,39×     | 1,50×          | ĐẠT     | 22.492 (1,64×)           |

## Cốt truyện bằng đội 4★ miễn phí

| Chương | Ngày | Chiến Lực cần | Đội 4★ miễn phí | Kết quả |
| ------ | ---- | ------------- | --------------- | ------- |
| 1      | 1    | 900           | 1.309           | ĐẠT     |
| 2      | 4    | 1.800         | 1.969           | ĐẠT     |
| 3      | 10   | 2.600         | 2.820           | ĐẠT     |
| 4      | 20   | 3.300         | 4.036           | ĐẠT     |
| 5      | 35   | 4.000         | 5.285           | ĐẠT     |
| 6      | 55   | 4.600         | 6.310           | ĐẠT     |
| 7      | 80   | 5.200         | 7.315           | ĐẠT     |

## Tháp Tinh Tú 3★ bằng đội 4★ miễn phí

| Tầng | Sát thương/giây cần cho 3★ | Ngày đội 4★ miễn phí đạt | Kết quả |
| ---- | -------------------------- | ------------------------ | ------- |
| 1    | 88                         | 1                        | ĐẠT     |
| 2    | 144                        | 1                        | ĐẠT     |
| 3    | 144                        | 1                        | ĐẠT     |
| 4    | 374                        | 1                        | ĐẠT     |
| 5    | 439                        | 1                        | ĐẠT     |
| 6    | 556                        | 1                        | ĐẠT     |
| 7    | 556                        | 1                        | ĐẠT     |
| 8    | 688                        | 2                        | ĐẠT     |
| 9    | 767                        | 3                        | ĐẠT     |
| 10   | 1.480                      | 19                       | ĐẠT     |
| 11   | 1.480                      | 19                       | ĐẠT     |
| 12   | 1.700                      | 19                       | ĐẠT     |

## Người chơi trung vị

- Không nạp, ngày 30: Chiến Lực đội 5.260, 79 lượt ước; 5★: Golnar N0; 7 nhân vật 4★.
- Không nạp, ngày 90: Chiến Lực đội 10.609, 189 lượt ước; 5★: Lạc Hồng N0, Thủy Nguyệt N0, Thạch Sơn N0; 10 nhân vật 4★.
- Không nạp, ngày 180: Chiến Lực đội 13.682, 330 lượt ước; 5★: Phong Vân N1, Lôi Đình N0, Tuyết Lan N0, Takane N0; 12 nhân vật 4★.
- Nạp ít (thẻ tháng), ngày 30: Chiến Lực đội 5.416, 98 lượt ước; 5★: Thủy Nguyệt N0; 8 nhân vật 4★.
- Nạp ít (thẻ tháng), ngày 90: Chiến Lực đội 10.988, 245 lượt ước; 5★: Thủy Nguyệt N1, Nghiên Thu N0, Takane N0; 11 nhân vật 4★.
- Nạp ít (thẻ tháng), ngày 180: Chiến Lực đội 14.149, 442 lượt ước; 5★: Phong Vân N2, Lôi Đình N0, Tuyết Lan N0, Golnar N0; 13 nhân vật 4★.
- Nạp nhiều, ngày 30: Chiến Lực đội 6.812, 334 lượt ước; 5★: Lạc Hồng N1, Thủy Nguyệt N0, Golnar N0, Ardo N0; 13 nhân vật 4★.
- Nạp nhiều, ngày 90: Chiến Lực đội 13.171, 854 lượt ước; 5★: Lạc Hồng N1, Thủy Nguyệt N1, Phong Vân N4, Thạch Sơn N0, Tuyết Lan N0, Nghiên Thu N0, Golnar N0, Naraa N0; 13 nhân vật 4★.
- Nạp nhiều, ngày 180: Chiến Lực đội 17.462, 1606 lượt ước; 5★: Lạc Hồng N2, Thủy Nguyệt N3, Phong Vân N1, Lôi Đình N0, Thạch Sơn N4, Tuyết Lan N3, Nghiên Thu N0, Takane N2, Golnar N0, Ardo N1, Naraa N0; 13 nhân vật 4★.

Cấp Hộ Tinh ở mốc 30 ngày: 25 (Đèn Lồng); 90 ngày: 47 (Vầng Trăng); 180 ngày: 60 (Sao Mai). Cấp Hộ Tinh chỉ tăng theo thời gian chơi nên giống nhau ở cả ba hồ sơ.

Kết luận: **ĐẠT**
