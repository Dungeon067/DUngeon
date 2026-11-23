# Nguồn mô hình, hoạt ảnh và giấy phép (S25)

Chỉ dùng nguồn miễn phí, không cần đăng nhập, giấy phép cho phép dùng thương mại. Không dùng Mixamo.

## Hoạt ảnh nhân vật

| Nguồn                                                                                                                                                                                                                               | Giấy phép | Dùng cho                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------- |
| [Universal Animation Library (Standard)](https://quaternius.com/packs/universalanimationlibrary.html), Quaternius, bản 06/2026, tải tại [itch.io](https://quaternius.itch.io/universal-animation-library) (tự chọn giá, có thể 0 đ) | CC0 1.0   | Toàn bộ clip trong `public/media/anim/humanoid.json` |

Quy trình (tái tạo được):

1. Tải gói Standard, giải nén, lấy `Unreal-Godot/UAL1_Standard.glb` (không đưa file gốc vào repo).
2. `pnpm exec tsx tools/anim/extract.ts <đường dẫn UAL1_Standard.glb>`: đổi clip sang khung xương humanoid chuẩn hóa của VRM (lấy khung đầu của `A_TPose` làm tư thế chuẩn), lấy mẫu 30 khung/giây, ghi `public/media/anim/humanoid.json` (khoảng 190 KB gzip).
3. Clip game được tạo theo công thức trong `tools/anim/recipes.ts`. Các clip không có sẵn trong gói được ghép như sau:

| Clip game                  | Cách tạo                                                                    |
| -------------------------- | --------------------------------------------------------------------------- |
| `sword1`                   | `Sword_Attack`, tăng tốc 1,2×                                               |
| `sword2`                   | `Sword_Attack` lật trái phải (chém ngược tay), 1,2×                         |
| `sword3`                   | `Sword_Attack` + xoay hông một vòng (chém xoáy kết thúc)                    |
| `spear1..3`                | `Punch_Jab`, `Punch_Cross`, `Punch_Jab` + thân dưới `Jump_Start` (đâm nhảy) |
| `bowAim`, `bow1`           | `Pistol_Aim_Neutral`, `Pistol_Shoot`                                        |
| `bow2`                     | `Pistol_Shoot` + thân dưới `Crouch_Idle_Loop` (quỳ bắn)                     |
| `bow3`                     | `Pistol_Shoot` + xoay hông và nhấc người (xoay người bắn trên không)        |
| `bowBurst`                 | `Pistol_Aim_Up` + thân dưới `Idle_Loop`, nhấc nhẹ (giương cung lên trời)    |
| `cat1..3`, `skill`, `cast` | `Spell_Simple_Shoot` (thường, lật, xoay), `Spell_Simple_Idle_Loop`          |
| `burst`                    | `Spell_Simple_Enter`, nhấc người                                            |
| `dash`                     | `Roll`, 1,4×                                                                |

Chưa có trong gói Standard (cần bổ sung bằng Blender + VRM Add-on for Blender, hoặc gói CC0 khác): đòn riêng cho đại kiếm (đang dùng clip kiếm chậm 0,75×), leo bậc, tụ lực cận chiến riêng, tư thế nộ riêng cho từng nhân vật.

## Mô hình nhân vật (VRM)

| File                                 | Nguồn                                                                                                                   | Giấy phép                                                                                                                                                            | Phát hành                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
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

| Thư viện                                                 | Phiên bản | Giấy phép                                |
| -------------------------------------------------------- | --------- | ---------------------------------------- |
| three                                                    | 0.170.0   | MIT                                      |
| @pixiv/three-vrm                                         | 3.5.5     | MIT                                      |
| @pixiv/three-vrm-animation                               | 3.5.5     | MIT (đã cài, dành cho file .vrma về sau) |
| @gltf-transform/core, functions (chỉ dùng trong công cụ) | 4.1.1     | MIT                                      |
| Blender (chỉ dùng trong công cụ)                         | 4.2 LTS   | GPL (không phân phối cùng game)          |

## Clip khung hóa tay (không lấy từ thư viện)

Các đòn sau được khung hóa bằng code trên xương humanoid VRM (`tools/anim/authored.ts`, công cụ `tools/anim/author.ts`), thay cho bản lật/ghép clip UAL trước đây:

- Kiếm: `sword2` (chém ngang phải sang trái), `sword3` (nhảy bổ dọc). `sword1` vẫn là `Sword_Attack` của UAL.
- Đại kiếm: `great1` (bổ chéo qua vai), `great2` (xoay người quét ngang), `great3` (hất lên rồi đập xuống).

Chạy `pnpm anim:author` sau mỗi lần chạy `tools/anim/extract.ts` (extract ghi đè `humanoid.json`).
Xem trước: `pnpm dev` rồi mở `/tools/anim/preview.html?w=great&clip=great2`.

## S27: dáng tư thế và bộ clip theo vũ khí

Bộ clip S27 được khung hóa bằng code (IK hai khớp trên khung xương VRM chuẩn hóa), tự dựng, thuộc dự án:

- Công cụ: `tools/anim/pose.ts` (tư thế theo vị trí bàn tay / bàn chân, nội suy, IK, nướng clip, chồng lớp lên clip di chuyển).
- Clip: `tools/anim/s27/` — `unarmed.ts` (đứng tay không `relax`, cất vũ khí `stowBackR`, `stowBackL`, `stowHip`),
  `bow.ts` (cung), `melee.ts` (kiếm `sw*`, đại kiếm `gr*`, thương `sp*`, pháp khí `ct*`).
- Nướng vào `humanoid.json`: `pnpm anim:s27` (chạy sau `extract.ts` và `pnpm anim:author`).
- Lớp dáng (`content/poses.yaml`, `src/render3d/toon/pose-layer.ts`) cộng lên clip lúc chạy game: thở, dồn trọng tâm,
  độ rộng chân, nghiêng hông / vai, vị trí tay, dáng đầu, biên độ / nhịp / độ nảy bước chạy, độ nặng khi ra đòn,
  IK chân bám đất. Không có bộ clip riêng cho từng dáng.
- Dây cung: dịch đỉnh lưới `string` của GLB cung theo tay phải, mũi tên dựng lúc chạy (`src/render3d/toon/bow-rig.ts`),
  độ căng dây theo từng clip (`str` trong `tools/anim/s27/bow.ts`).

### Vũ khí ngoài trận (cấu hình `vuKhi` trong `content/poses.yaml`)

Thôi đánh và không còn quái gần quá `cho` giây (mặc định 2,5 giây): đứng yên thì chạy clip cất ngắn, vũ khí chuyển ra chỗ đeo,
giữ một nhịp rồi tan thành hạt sáng màu nguyên tố của nhân vật (`src/render3d/toon/weapon-fx.ts`). Sau đó tay không, đứng / chạy thả lỏng.
Đánh thường, kỹ năng hoặc nộ: vũ khí hiện lại trong tay ngay khung đầu, hạt sáng tụ nhanh, không làm chậm đòn.
Renderer 2D ẩn vũ khí theo cùng luật (`src/combat/weapon-state.ts`).

| Vũ khí   | Chỗ cất                 | Clip cất    |
| -------- | ----------------------- | ----------- |
| Kiếm     | bên hông trái           | `stowHip`   |
| Đại kiếm | sau lưng, chuôi qua vai | `stowBackR` |
| Thương   | sau lưng, chéo          | `stowBackR` |
| Cung     | sau lưng, chéo          | `stowBackL` |
| Pháp khí | tan ngay cạnh tay       | (không)     |

### Mẫu VRM nam dùng thử (không đưa vào repo)

Khi chưa có mô hình nam của S26, bảng so sánh và video dáng nam dùng tạm "Robert" trong bộ 100Avatars R1 của Polygonal Mind
(CC0, qua kho ToxSam/open-source-avatars), đặt cục bộ ở `public/media/models/_nam/` và không commit.

## S27 – vòng tinh chỉnh sau Mốc 2

Mọi khung hình đều tự dựng bằng code trong `tools/anim/s27/` (không dùng tệp hoạt ảnh tách từ game khác, không dựng lại động tác đặc trưng của nhân vật cụ thể nào). Video gameplay công khai chỉ dùng để tham khảo nhịp và cảm giác.

- **Đứng thả lỏng:** lớp dáng dồn trọng tâm về một chân (`dung.tru`), chân trụ đổi bên chậm, hông bên trụ nhô nhẹ, chân còn lại đặt lên trước (`chanTruoc`) và mở mũi chân (`xoay`). `tay.sau` chắp tay sau lưng (thiếu nữ).
- **Hoạt ảnh chờ ngẫu nhiên** (`nghi` trong `content/poses.yaml`): `idleStretch` (vươn vai), `idleLook` (nhìn quanh), `idleHair` (vén tóc), `idleHop` (nhún nhảy, dành cho dáng trẻ em). Chạy sau `nghi.sau` giây đứng yên tay không, không lặp lại clip vừa chạy.
- **Chạy:** đổ người theo tốc độ (`chay.nghieng`), nghiêng vào khúc cua theo tốc độ xoay hướng (`chay.lac`), chạy nhanh vung tay mạnh hơn; dừng có nhịp hãm `runStop` (có bản cầm vũ khí `swStop`, `grStop`, `spStop`, `bowStop`).
- **Lướt / nhảy:** lướt đổ người tới và tỏa hạt sáng theo nguyên tố; nhảy co chân ở đỉnh.
- **Đòn:** lấy đà ≈ 10% clip, chạm ≈ 17%, giữ tư thế kết tới ≈ 60%. Đòn 3: kiếm và thương xoay một vòng người rồi chém / quét kết bước dài; đại kiếm thân xoay trước, lưỡi trễ theo (nặng tay); pháp khí chắp ấn rồi đẩy hai tay, pháp khí bay vòng quanh người khi ra đòn. Vệt chém của đòn kết dài và rộng hơn; pháp khí có nét ấn theo đầu ngón trỏ (`src/render3d/toon/motion-fx.ts`).
- **Cung:** kỹ năng `bowSkill` bật lùi một nhịp rồi bắn chéo lên; nộ giương cung thẳng lên trời, ngửa người kéo đầy dây rồi thả.
