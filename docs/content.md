# Dữ liệu nội dung (`content/`)

Mọi số liệu và chữ của nhân vật, quái, boss và ước nguyện nằm ở đây. Code không viết cứng các giá trị này. Sau khi sửa, chạy:

```bash
pnpm content:check
```

Lệnh báo từng lỗi kèm tên file và trường, ví dụ `content/characters/havy.yaml: skill.type: Invalid enum value`.

## Nhân vật: `content/characters/<id>.yaml`

Tên file phải trùng `id`. Thứ tự hiển thị lấy từ `characterOrder` trong `config.yaml`.

| Trường                        | Ý nghĩa                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `id`, `name`, `title`, `desc` | Mã, tên, danh hiệu, mô tả                                                                           |
| `r`                           | Độ hiếm: `4` hoặc `5`                                                                               |
| `el`                          | Nguyên tố: `fire` (Hỏa), `water` (Thủy), `wind` (Phong), `bolt` (Lôi), `earth` (Thổ), `ice` (Băng)  |
| `w`                           | Vũ khí: `sword`, `great`, `spear`, `bow`, `cat` (pháp khí)                                          |
| `hp`, `atk`                   | Chỉ số ở cấp 1                                                                                      |
| `skill`                       | `name`, `type` (`dash`, `nova`, `turret`, `heal`, `vortex`, `shield`), `cd` (giây), `m` (hệ số)     |
| `burst`                       | `name`, `type` (`inferno`, `storm`, `tide`, `meteor`, `blizzard`), `cost` (năng lượng), `m` (hệ số) |
| `look`                        | Màu tóc, kiểu tóc, trang phục... dùng để vẽ chibi                                                   |

Không đổi tên, nguyên tố, vũ khí, độ hiếm của 12 nhân vật hiện có (xem bối cảnh dự án).

## Quái: `content/enemies/<type>.yaml`

`hp`, `atk`, `spd` (tốc độ), `r` (bán kính), `aggro` (tầm phát hiện), `cd` (giây giữa hai đòn), và các trường riêng từng loại. Thứ tự lấy từ `enemyOrder`.

`hacgiao.yaml` là boss: `hp`, `atk` và hệ số tăng theo cấp `hpPerLv`, `atkPerLv` (giá trị × (1 + hệ số × (cấp − 1))), `phase2.at` (tỷ lệ máu bắt đầu giai đoạn 2) cùng nguyên tố và tốc độ giai đoạn 2.

## Cảm giác chiến đấu: `content/combat-feel.yaml`

Dừng hình, rung, camera, đệm lệnh, chịu đòn và cân nặng của quái, báo trước đòn, âm lượng, hiệu ứng riêng từng nhân vật. Mọi nhân vật trong `characters/` và mọi quái (kể cả `hacgiao`) phải có mục tương ứng. Giải thích từng thông số ở [combat-feel.md](combat-feel.md).

## Cấu hình: `content/config.yaml`

| Mục                      | Ý nghĩa                                                                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gacha`                  | `rate5`, `rate4` (% gốc), `soft` (lần bắt đầu tăng tỷ lệ 5★), `hard` (lần chắc chắn 5★), `cost` (Đá Sao mỗi lần), `featured` (nhân vật nổi bật, phải là 5★) |
| `startProfile`           | Đá Sao, Xu, Sách và đội hình khởi đầu                                                                                                                       |
| `elements`, `weapons`    | Tên tiếng Việt, màu, thông số vũ khí                                                                                                                        |
| `skillDesc`, `burstDesc` | Mẫu mô tả, chỗ `{pct}`, `{cd}`... được điền số tự động                                                                                                      |
| `items3`                 | Vật phẩm 3★ khi ước nguyện                                                                                                                                  |
| `dailyPool`              | Danh sách ủy thác hằng ngày                                                                                                                                 |

Admin trong game có thể đổi tạm cấu hình ước nguyện cho hồ sơ hiện tại. Giá trị trong `config.yaml` là mặc định cho hồ sơ mới.

`content:check` còn kiểm tra: ID trùng, `featured` là 5★, `soft ≤ hard`, đội hình khởi đầu và ủy thác trỏ tới ID có thật, có đủ 4★ và 5★ ngoài nhân vật nổi bật.
