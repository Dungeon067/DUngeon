# Tổng hợp dàn nhân vật

> Bảng tổng hợp cho S05B. Nguồn dữ liệu chiến đấu: `content/characters/<id>.yaml`. Nguồn quê quán: `docs/characters/<id>/ho-so.md`.
> Trạng thái: **đủ 24/24 nhân vật** (12 cũ + 12 mới của S05B), tất cả đã có trong `content/config.yaml` `characterOrder`, chơi được và có trong Ước nguyện.

## 1. Bảng nhân vật

Vai trò ghi theo kiểu kỹ năng và nộ trong game: **sát thương chính** (đứng sân lâu, gây sát thương lớn), **sát thương phụ** (vào ra nhanh, để lại đòn đánh tự động hoặc áp nguyên tố), **hồi máu**, **bảo hộ** (khiên), **gom quái** (kéo quái lại một chỗ).

| #   | ID           | Tên         | Quê quán  | ★   | Nguyên tố | Vũ khí   | Kỹ năng | Nộ       | Vai trò                         |
| --- | ------------ | ----------- | --------- | --- | --------- | -------- | ------- | -------- | ------------------------------- |
| 1   | `lachong`    | Lạc Hồng    | Đảo Lạc   | 5   | Hỏa       | Kiếm đơn | dash    | inferno  | Sát thương chính                |
| 2   | `thuynguyet` | Thủy Nguyệt | Đảo Lạc   | 5   | Thủy      | Pháp khí | heal    | tide     | Hồi máu                         |
| 3   | `phongvan`   | Phong Vân   | Đảo Lạc   | 5   | Phong     | Cung     | turret  | storm    | Sát thương phụ từ xa            |
| 4   | `loidinh`    | Lôi Đình    | Đảo Lạc   | 5   | Lôi       | Thương   | dash    | storm    | Sát thương chính                |
| 5   | `thachson`   | Thạch Sơn   | Đảo Lạc   | 5   | Thổ       | Đại kiếm | shield  | meteor   | Bảo hộ                          |
| 6   | `tuyetlan`   | Tuyết Lan   | Shizukane | 5   | Băng      | Kiếm đơn | nova    | blizzard | Sát thương chính                |
| 7   | `mailinh`    | Mai Linh    | Đảo Lạc   | 4   | Hỏa       | Pháp khí | turret  | inferno  | Sát thương phụ                  |
| 8   | `suongmai`   | Sương Mai   | Đảo Lạc   | 4   | Thủy      | Kiếm đơn | dash    | tide     | Sát thương chính tầm gần        |
| 9   | `bachvu`     | Bạch Vũ     | Lũng Vân  | 4   | Phong     | Kiếm đơn | vortex  | blizzard | Gom quái, khuếch tán            |
| 10  | `minhkhai`   | Minh Khải   | Đảo Lạc   | 4   | Lôi       | Cung     | turret  | storm    | Sát thương phụ từ xa            |
| 11  | `ngocthach`  | Ngọc Thạch  | Đảo Lạc   | 4   | Thổ       | Thương   | nova    | meteor   | Sát thương phụ, phá giáp        |
| 12  | `havy`       | Hạ Vy       | Đảo Lạc   | 4   | Băng      | Cung     | nova    | blizzard | Sát thương phụ, áp Băng         |
| 13  | `nghienthu`  | Nghiên Thu  | Lũng Vân  | 5   | Thủy      | Pháp khí | vortex  | storm    | Gom quái, áp Thủy               |
| 14  | `khoiyen`    | Khởi Yên    | Lũng Vân  | 4   | Hỏa       | Cung     | turret  | storm    | Sát thương phụ từ xa, áp Hỏa    |
| 15  | `takane`     | Takane      | Shizukane | 5   | Phong     | Thương   | dash    | blizzard | Sát thương chính, khuếch tán    |
| 16  | `kumi`       | Kumi        | Shizukane | 4   | Thủy      | Kiếm đơn | nova    | tide     | Sát thương phụ tầm gần, áp Thủy |
| 17  | `golnar`     | Golnar      | Golbaran  | 5   | Băng      | Pháp khí | heal    | blizzard | Hồi máu, áp Băng                |
| 18  | `payam`      | Payam       | Golbaran  | 4   | Thổ       | Đại kiếm | dash    | meteor   | Sát thương chính, phá giáp      |
| 19  | `ardo`       | Ardo        | Marevia   | 5   | Hỏa       | Đại kiếm | nova    | inferno  | Sát thương chính, dọn đám đông  |
| 20  | `pruina`     | Pruina      | Marevia   | 4   | Băng      | Thương   | vortex  | tide     | Gom quái, áp Băng               |
| 21  | `naraa`      | Naraa       | Khokhtal  | 5   | Lôi       | Cung     | dash    | inferno  | Sát thương chính, cơ động       |
| 22  | `shonkhor`   | Shonkhor    | Khokhtal  | 4   | Phong     | Thương   | turret  | blizzard | Sát thương phụ, khuếch tán      |
| 23  | `duri`       | Duri        | Purunae   | 4   | Thổ       | Đại kiếm | shield  | inferno  | Bảo hộ, kết tinh                |
| 24  | `urae`       | Urae        | Purunae   | 4   | Lôi       | Kiếm đơn | nova    | blizzard | Sát thương phụ tầm gần, áp Lôi  |

Ghi chú: Bạch Vũ (Lũng Vân) và Tuyết Lan (Shizukane) là hai nhân vật cũ có quê ngoài Đảo Lạc, theo hồ sơ S03–S05.

## 2. Bảng đếm (24 nhân vật)

### 2.1. Theo nguyên tố

| Nguyên tố | 5★                      | 4★                      | Tổng |
| --------- | ----------------------- | ----------------------- | ---- |
| Hỏa       | Lạc Hồng, Ardo          | Mai Linh, Khởi Yên      | 4    |
| Thủy      | Thủy Nguyệt, Nghiên Thu | Sương Mai, Kumi         | 4    |
| Phong     | Phong Vân, Takane       | Bạch Vũ, Shonkhor       | 4    |
| Lôi       | Lôi Đình, Naraa         | Minh Khải, Urae         | 4    |
| Thổ       | Thạch Sơn               | Ngọc Thạch, Payam, Duri | 4    |
| Băng      | Tuyết Lan, Golnar       | Hạ Vy, Pruina           | 4    |

Mỗi nguyên tố có đúng 4 nhân vật. Thổ có một 5★ (các nguyên tố khác có hai) vì 5★ mới đã chia cho Thủy, Phong, Băng, Hỏa, Lôi; Thổ được bù bằng hai 4★ mới.

### 2.2. Theo vũ khí

| Vũ khí   | Nhân vật                                            | Cũ  | Mới | Tổng |
| -------- | --------------------------------------------------- | --- | --- | ---- |
| Kiếm đơn | Lạc Hồng, Tuyết Lan, Sương Mai, Bạch Vũ, Kumi, Urae | 4   | 2   | 6    |
| Đại kiếm | Thạch Sơn, Payam, Ardo, Duri                        | 1   | 3   | 4    |
| Thương   | Lôi Đình, Ngọc Thạch, Takane, Pruina, Shonkhor      | 2   | 3   | 5    |
| Cung     | Phong Vân, Minh Khải, Hạ Vy, Khởi Yên, Naraa        | 3   | 2   | 5    |
| Pháp khí | Thủy Nguyệt, Mai Linh, Nghiên Thu, Golnar           | 2   | 2   | 4    |

Không vũ khí nào dưới 4 hoặc trên 6. Đại kiếm (trước đây chỉ có 1) được bù nhiều nhất.

### 2.3. Theo vùng (quê quán)

| Vùng      | Nhân vật cũ | Nhân vật mới         | Tổng |
| --------- | ----------- | -------------------- | ---- |
| Đảo Lạc   | 10          | 0                    | 10   |
| Lũng Vân  | Bạch Vũ     | Nghiên Thu, Khởi Yên | 3    |
| Shizukane | Tuyết Lan   | Takane, Kumi         | 3    |
| Golbaran  | 0           | Golnar, Payam        | 2    |
| Marevia   | 0           | Ardo, Pruina         | 2    |
| Khokhtal  | 0           | Naraa, Shonkhor      | 2    |
| Purunae   | 0           | Duri, Urae           | 2    |

Mỗi vùng mới có 2 nhân vật mới (tính cả nhân vật cũ thì mỗi vùng ngoài Đảo Lạc có 2–3 người).

### 2.4. Theo độ hiếm

| Độ hiếm | Cũ  | Mới | Tổng |
| ------- | --- | --- | ---- |
| 5★      | 6   | 5   | 11   |
| 4★      | 6   | 7   | 13   |

5★ mới: Nghiên Thu, Takane, Golnar, Ardo, Naraa. 4★ mới: Khởi Yên, Kumi, Payam, Pruina, Shonkhor, Duri, Urae.

### 2.5. Theo vai trò (24 nhân vật)

| Vai trò chính    | Nhân vật                                                                          | Tổng |
| ---------------- | --------------------------------------------------------------------------------- | ---- |
| Sát thương chính | Lạc Hồng, Lôi Đình, Tuyết Lan, Sương Mai, Takane, Payam, Ardo, Naraa              | 8    |
| Sát thương phụ   | Phong Vân, Mai Linh, Minh Khải, Ngọc Thạch, Hạ Vy, Khởi Yên, Kumi, Shonkhor, Urae | 9    |
| Hồi máu          | Thủy Nguyệt, Golnar                                                               | 2    |
| Bảo hộ           | Thạch Sơn, Duri                                                                   | 2    |
| Gom quái         | Bạch Vũ, Nghiên Thu, Pruina                                                       | 3    |
