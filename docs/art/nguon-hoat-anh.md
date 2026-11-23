# Nguồn mô hình, hoạt ảnh và giấy phép (S25)

Chỉ dùng nguồn miễn phí, không cần đăng nhập, giấy phép cho phép dùng thương mại. Không dùng Mixamo.

## Hoạt ảnh nhân vật

| Nguồn | Giấy phép | Dùng cho |
| --- | --- | --- |
| [Universal Animation Library (Standard)](https://quaternius.com/packs/universalanimationlibrary.html), Quaternius, bản 06/2026, tải tại [itch.io](https://quaternius.itch.io/universal-animation-library) (tự chọn giá, có thể 0 đ) | CC0 1.0 | Toàn bộ clip trong `public/media/anim/humanoid.json` |

Quy trình (tái tạo được):

1. Tải gói Standard, giải nén, lấy `Unreal-Godot/UAL1_Standard.glb` (không đưa file gốc vào repo).
2. `pnpm exec tsx tools/anim/extract.ts <đường dẫn UAL1_Standard.glb>`: đổi clip sang khung xương humanoid chuẩn hóa của VRM (lấy khung đầu của `A_TPose` làm tư thế chuẩn), lấy mẫu 30 khung/giây, ghi `public/media/anim/humanoid.json` (khoảng 190 KB gzip).
3. Clip game được tạo theo công thức trong `tools/anim/recipes.ts`. Các clip không có sẵn trong gói được ghép như sau:

| Clip game | Cách tạo |
| --- | --- |
| `sword1` | `Sword_Attack`, tăng tốc 1,2× |
| `sword2` | `Sword_Attack` lật trái phải (chém ngược tay), 1,2× |
| `sword3` | `Sword_Attack` + xoay hông một vòng (chém xoáy kết thúc) |
| `spear1..3` | `Punch_Jab`, `Punch_Cross`, `Punch_Jab` + thân dưới `Jump_Start` (đâm nhảy) |
| `bowAim`, `bow1` | `Pistol_Aim_Neutral`, `Pistol_Shoot` |
| `bow2` | `Pistol_Shoot` + thân dưới `Crouch_Idle_Loop` (quỳ bắn) |
| `bow3` | `Pistol_Shoot` + xoay hông và nhấc người (xoay người bắn trên không) |
| `bowBurst` | `Pistol_Aim_Up` + thân dưới `Idle_Loop`, nhấc nhẹ (giương cung lên trời) |
| `cat1..3`, `skill`, `cast` | `Spell_Simple_Shoot` (thường, lật, xoay), `Spell_Simple_Idle_Loop` |
| `burst` | `Spell_Simple_Enter`, nhấc người |
| `dash` | `Roll`, 1,4× |

Chưa có trong gói Standard (cần bổ sung bằng Blender + VRM Add-on for Blender, hoặc gói CC0 khác): đòn riêng cho đại kiếm (đang dùng clip kiếm chậm 0,75×), leo bậc, tụ lực cận chiến riêng, tư thế nộ riêng cho từng nhân vật.

## Mô hình nhân vật (VRM)

| File | Nguồn | Giấy phép | Phát hành |
| --- | --- | --- | --- |
| `public/media/models/_mau/model.vrm` | `VRM1_Constraint_Twist_Sample.vrm` trong repo [pixiv/three-vrm](https://github.com/pixiv/three-vrm) (© 2022 pixiv Inc.) | [VRM Public License 1.0](https://vrm.dev/licenses/1.0/) ghi trong meta: cho phép dùng thương mại (doanh nghiệp), chỉnh sửa và phân phối lại, không bắt buộc ghi công | Được, nhưng chỉ là mẫu tạm: thay bằng mô hình riêng của từng nhân vật |

Mẫu tạm có khoảng 36k tam giác, hơi vượt ngân sách 20–30k; mô hình riêng của nhân vật phải dưới 30k.

## Vũ khí

GLB trong `public/media/models/weapons/` xuất từ mô hình Blender của S24 (`tools/blender/weapons/`, tự dựng, thuộc dự án):

```
pnpm exec tsx tools/blender/weapons/xuat-danh-sach.ts > danh-sach.json
blender -b -P tools/blender/weapons/export_glb.py -- --list danh-sach.json --out public/media/models/weapons
```

Mỗi vũ khí giảm còn khoảng 3k tam giác; vật liệu thủ tục được thay bằng một màu theo thiết kế, game đổi sang vật liệu toon có viền.

## Thư viện

| Thư viện | Phiên bản | Giấy phép |
| --- | --- | --- |
| three | 0.170.0 | MIT |
| @pixiv/three-vrm | 3.5.5 | MIT |
| @pixiv/three-vrm-animation | 3.5.5 | MIT (đã cài, dành cho file .vrma về sau) |
| @gltf-transform/core, functions (chỉ dùng trong công cụ) | 4.1.1 | MIT |
| Blender (chỉ dùng trong công cụ) | 4.2 LTS | GPL (không phân phối cùng game) |
