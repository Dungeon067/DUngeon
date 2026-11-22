# Tổng hợp dàn nhân vật

> Bảng tổng hợp cho S05B. Nguồn dữ liệu chiến đấu: `content/characters/<id>.yaml`. Nguồn quê quán: `docs/characters/<id>/ho-so.md`.
> Trạng thái: **18/24 nhân vật đã có** (12 cũ + 6 mới của lần 1). Sáu nhân vật lần 2 (Marevia, Khokhtal, Purunae) ghi ở mục 3 dưới dạng dự kiến và sẽ được bổ sung đầy đủ ở PR lần 2.

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

Ghi chú: Bạch Vũ (Lũng Vân) và Tuyết Lan (Shizukane) là hai nhân vật cũ có quê ngoài Đảo Lạc, theo hồ sơ S03–S05.

## 2. Bảng đếm (18 nhân vật hiện có)

### 2.1. Theo nguyên tố

| Nguyên tố | 5★                      | 4★                 | Tổng |
| --------- | ----------------------- | ------------------ | ---- |
| Hỏa       | Lạc Hồng                | Mai Linh, Khởi Yên | 3    |
| Thủy      | Thủy Nguyệt, Nghiên Thu | Sương Mai, Kumi    | 4    |
| Phong     | Phong Vân, Takane       | Bạch Vũ            | 3    |
| Lôi       | Lôi Đình                | Minh Khải          | 2    |
| Thổ       | Thạch Sơn               | Ngọc Thạch, Payam  | 3    |
| Băng      | Tuyết Lan, Golnar       | Hạ Vy              | 3    |

### 2.2. Theo vũ khí

| Vũ khí   | Nhân vật                                      | Tổng |
| -------- | --------------------------------------------- | ---- |
| Kiếm đơn | Lạc Hồng, Tuyết Lan, Sương Mai, Bạch Vũ, Kumi | 5    |
| Đại kiếm | Thạch Sơn, Payam                              | 2    |
| Thương   | Lôi Đình, Ngọc Thạch, Takane                  | 3    |
| Cung     | Phong Vân, Minh Khải, Hạ Vy, Khởi Yên         | 4    |
| Pháp khí | Thủy Nguyệt, Mai Linh, Nghiên Thu, Golnar     | 4    |

### 2.3. Theo vùng (quê quán)

| Vùng      | Nhân vật cũ | Nhân vật mới         | Tổng |
| --------- | ----------- | -------------------- | ---- |
| Đảo Lạc   | 10          | 0                    | 10   |
| Lũng Vân  | Bạch Vũ     | Nghiên Thu, Khởi Yên | 3    |
| Shizukane | Tuyết Lan   | Takane, Kumi         | 3    |
| Golbaran  | 0           | Golnar, Payam        | 2    |

### 2.4. Theo độ hiếm

- 5★: 9 (6 cũ + 3 mới).
- 4★: 9 (6 cũ + 3 mới).

## 3. Dự kiến lần 2 (chưa có trong game)

| ID         | Tên dự kiến       | Vùng     | ★   | Nguyên tố | Vũ khí   |
| ---------- | ----------------- | -------- | --- | --------- | -------- |
| `ardo`     | Ardo Fusor        | Marevia  | 5   | Hỏa       | Đại kiếm |
| `pruina`   | Pruina Siphonaria | Marevia  | 4   | Băng      | Thương   |
| `naraa`    | Naraa Temuulen    | Khokhtal | 5   | Lôi       | Cung     |
| `shonkhor` | Shonkhor          | Khokhtal | 4   | Phong     | Thương   |
| `duri`     | Jang Duri         | Purunae  | 4   | Thổ       | Đại kiếm |
| `urae`     | Na Urae           | Purunae  | 4   | Lôi       | Kiếm đơn |

Sau lần 2, 12 nhân vật mới gồm 5 nhân vật 5★ và 7 nhân vật 4★, mỗi nguyên tố 2 người, mỗi vùng 2 người. Tổng 24 nhân vật: mỗi nguyên tố 4 người; kiếm đơn 6, đại kiếm 4, thương 5, cung 5, pháp khí 4.
