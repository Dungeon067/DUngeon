# Định dạng dữ liệu bản đồ: độ cao, gờ, loại địa hình, vùng

Tài liệu cho S12 (địa hình nhiều tầng, địa hình khác nhau theo vùng). S09 tạo định dạng và dùng phần **độ cao, gờ**. Phần **loại địa hình, vùng, bộ hiệu ứng** mới chỉ là dữ liệu: game đọc và kiểm tra nhưng **chưa áp hiệu ứng nào**.

Mã: `src/world/map.ts` (`genWorld`, `computeLedges`), `src/world/collision.ts` (`groundAt`, `standable`, `blockedAt`, `moveC`), `src/combat/jump.ts`. Dữ liệu: `content/terrain.yaml`, mục `jump` trong `content/combat-feel.yaml`.

## 1. Các lớp của một bản đồ

`genWorld()` trả về một đối tượng. Mỗi lớp là mảng phẳng `MW × MH` (hiện 110 × 110), chỉ số ô `i = y * MW + x`, ô vuông `TS = 40` điểm ảnh thế giới.

| Trường    | Kiểu         | Ý nghĩa                                                                           | S09 dùng chưa   |
| --------- | ------------ | --------------------------------------------------------------------------------- | --------------- |
| `m`       | `Uint8Array` | Loại ô để vẽ và chặn đường: `TL.GRASS`, `TL.ROCK`, `TL.LEDGE`...                  | Có              |
| `h`       | `Uint8Array` | Độ cao mặt ô, đơn vị **bậc** (0 = mặt đất). Một bậc vẽ cao `jump.levelPx` = 22 px | Có              |
| `terrain` | `Uint8Array` | Loại địa hình: chỉ số trong `terrains` của `content/terrain.yaml`                 | Chỉ lưu         |
| `region`  | `Uint8Array` | Vùng: chỉ số trong `regions` của `content/terrain.yaml`                           | Chỉ lưu         |
| `ledges`  | `Ledge[]`    | Danh sách gờ, tính từ `h` bằng `computeLedges(h, m)`                              | Có (vẽ, bản đồ) |
| `mini`    | canvas       | Ảnh bản đồ nhỏ, gờ và bệ đá có màu riêng                                          | Có              |

`Ledge = { x, y, side: "n" | "s" | "e" | "w", drop }`: ô `(x, y)` cao hơn ô bên cạnh ở mép `side` đúng `drop` bậc. Gờ là dữ liệu suy ra, không lưu tay: sửa `h` rồi gọi lại `computeLedges`.

Ví dụ một ô bệ đá cạnh bãi cỏ ở Đảo Lạc:

```ts
m[i] = TL.LEDGE; // vẽ bệ đá
h[i] = 1; // cao một bậc
terrain[i] = 1; // "da" (thứ tự trong content/terrain.yaml)
region[i] = 0; // "dao-lac"
// computeLedges → { x, y, side: "s", drop: 1 } nếu ô phía nam là cỏ cao 0
```

## 2. Độ cao và va chạm (đã chạy ở S09)

Giá trị mặc định theo loại ô (`TILE_H` trong `map.ts`):

| Loại ô                             | `h` | Đi bộ                         | Nhảy                                  |
| ---------------------------------- | --- | ----------------------------- | ------------------------------------- |
| Cỏ, hoa, đường đất, cát, cầu       | 0   | Được                          | Được                                  |
| Đá nhỏ (`ROCK`)                    | 1   | Chặn                          | Nhảy lên đứng được hoặc nhảy qua      |
| Bệ đá (`LEDGE`)                    | 1–2 | Chặn từ dưới, đi được trên bệ | Lên được bệ cao hơn chân tối đa 1 bậc |
| Cây (`TREE`)                       | 4   | Chặn                          | Chặn                                  |
| Nước nông và sâu (`WATER`, `DEEP`) | 0   | Chặn                          | Bay qua được (khe), không đứng được   |

Quy tắc trong `blockedAt(x, y, r, W, foot, air)`:

- Cây luôn chặn.
- Nước là "khe": chặn khi đi bộ, không chặn khi đang trên không. Rơi xuống nước thì đẩy về chỗ đứng cuối.
- Ô cao hơn `foot + STEP` (bậc dưới chân cộng 0,2 bậc) thì chặn. Đỉnh nhảy là 1,25 bậc nên nhảy lên được bệ 1 bậc, không lên được bệ 2 bậc từ mặt đất (phải lên bậc 1 trước).
- Rời mép bệ xuống thấp hơn: rơi tự do. Rơi quá `fall.safeLevels` (1 bậc) mất `fall.dmgPerLevel` (8%) máu tối đa mỗi bậc vượt, không làm gục.
- Quái không có trục `zh` nên đứng ở mặt đất dưới chân, không leo lên bệ.

Bệ quanh điểm xuất phát: `START_LEDGES` (bốn bệ, một bệ 2 bậc) và `START_GAP` (khe nước dài 3 ô) trong `map.ts`. Vị trí tính theo điểm xuất phát, không dùng bộ số ngẫu nhiên của đảo nên trại quái, rương, đường đi giữ nguyên.

## 3. Loại địa hình và vùng (`content/terrain.yaml`)

```yaml
terrains: # thứ tự = chỉ số lưu trong map.terrain. KHÔNG đổi thứ tự, chỉ thêm vào cuối
  - id: co # id ngắn không dấu, dùng trong code và các file khác
    name: Cỏ # tên hiện cho người chơi
    effects: {} # hệ số mặc định của loại địa hình này (tuỳ chọn)
  - id: cat
    name: Cát
    effects: { moveSpeed: 0.95 }
  - id: nuoc-sau
    name: Nước sâu
    walkable: false # tuỳ chọn, mặc định true
regions: # thứ tự = chỉ số lưu trong map.region
  - id: dao-lac
    name: Đảo Lạc
    effects: {} # áp cho mọi ô trong vùng
    terrain: {} # ghi đè hệ số theo loại địa hình trong vùng này: { <terrainId>: { <key>: số } }
effectKeys: [moveSpeed, staminaRegen, dashStamina, jumpHeight, friction, elementDmg]
```

Hiện có 9 loại: `co` (cỏ), `da` (đá), `cat` (cát), `tuyet` (tuyết), `nuoc-nong` (nước nông), `bun` (bùn), `bang` (băng), `nuoc-sau` (nước sâu), `dat` (đường đất). Đảo Lạc hiện chỉ dùng cỏ, đá, cát, đất, nước sâu. Loại địa hình mặc định của mỗi loại ô nằm ở `TILE_TERRAIN` trong `map.ts`.

`src/data/schema.ts` kiểm tra file này khi build và khi chạy `pnpm content:check`: id không trùng, mọi khoá hiệu ứng phải có trong `effectKeys`, mọi id địa hình trong `regions[].terrain` phải tồn tại.

### Hệ số hiệu ứng

Mỗi hệ số là số nhân, `1` là không đổi. Chủ dự án muốn hiệu ứng **nhẹ**: nên giữ trong khoảng 0,85–1,15.

| Khoá           | Nhân vào                                                                       |
| -------------- | ------------------------------------------------------------------------------ |
| `moveSpeed`    | Tốc độ đi bộ                                                                   |
| `staminaRegen` | Tốc độ hồi thể lực                                                             |
| `dashStamina`  | Thể lực tốn khi Lướt                                                           |
| `jumpHeight`   | Độ cao đỉnh nhảy (cẩn thận: dưới 0,8 thì không lên được bệ 1 bậc)              |
| `friction`     | Độ bám mặt đất (nhỏ hơn 1 là trượt, dùng cho băng)                             |
| `elementDmg`   | Sát thương nguyên tố (S12 có thể tách theo nguyên tố, ví dụ `elementDmg.fire`) |

Công thức đề xuất cho S12, tại ô `i` có địa hình `t` thuộc vùng `r`:

```
hệ số(key) = terrains[t].effects[key] × regions[r].effects[key] × regions[r].terrain[t.id][key]
             (thiếu giá trị nào thì coi là 1)
```

Ví dụ một vùng núi tuyết phía bắc làm tuyết nặng hơn và băng trơn hơn bình thường:

```yaml
regions:
  - id: vung-tuyet-bac # tên thật do S01/S12 đặt theo docs/world/11-dat-ten.md
    name: ...
    effects: { staminaRegen: 0.95 }
    terrain:
      tuyet: { moveSpeed: 0.95 } # tuyết ở vùng này: 0,92 × 0,95 ≈ 0,87 tốc độ
      bang: { friction: 0.8 }
```

## 4. Việc cho S12

1. Thêm vùng mới vào `regions`, gán `region[i]` khi sinh bản đồ.
2. Thêm loại địa hình mới vào **cuối** `terrains` (thêm khoá mới thì khai báo trong `effectKeys` trước), gán `terrain[i]` theo loại ô hoặc theo nhiễu riêng của vùng.
3. Viết hàm `terrainFx(x, y)` trong `src/world/` theo công thức ở mục 3, gọi ở `moveC` (tốc độ, độ bám), vòng hồi thể lực trong `loop.ts`, `tryJump` (độ cao) và tính sát thương.
4. Địa hình nhiều tầng: tăng `h` lên nhiều bậc, dùng `ledges` để vẽ vách và đặt thang hoặc dốc. Hàm va chạm đã xét chênh lệch độ cao giữa chân và ô, không cần đổi.
5. Nếu cần lưu bản đồ dựng tay: lưu bốn lớp `m`, `h`, `terrain`, `region` (mỗi lớp một chuỗi base64 của `Uint8Array`), không lưu `ledges` vì tính lại được.
6. Hiện cho người chơi biết: tên địa hình dưới chân và biểu tượng hiệu ứng có thể đưa vào hàng biểu tượng hiệu ứng đang có của HUD (`#hudStatus`).
