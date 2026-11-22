# Ghi công

## Phông chữ

Tải từ Google Fonts lúc chạy, không lưu trong repo.

| Phông                                                                      | Tác giả                              | Giấy phép                 |
| -------------------------------------------------------------------------- | ------------------------------------ | ------------------------- |
| [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro)         | Lâm Bảo, Tony Le, Viet Anh Nguyen    | SIL Open Font License 1.1 |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | Christian Thalmann (Catharsis Fonts) | SIL Open Font License 1.1 |

## Hình ảnh

Toàn bộ nhân vật, quái, bản đồ và hiệu ứng được vẽ bằng code Canvas 2D trong `src/art/` và `src/world/`. Chưa dùng ảnh bên ngoài hay ảnh do AI tạo.

## Âm thanh

Hiệu ứng đánh, trúng đòn, lướt, rương và xu dùng mẫu âm thanh của Kenney, lưu ở `public/audio/kenney/` (34 file `.ogg`, khoảng 410 KB). File giấy phép gốc nằm cùng thư mục.

| Gói                                                     | Tác giả                     | Giấy phép                                                     | File dùng                                                               |
| ------------------------------------------------------- | --------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Impact Sounds](https://kenney.nl/assets/impact-sounds) | Kenney Vleugels (Kenney.nl) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `impact*.ogg`                                                           |
| [RPG Audio](https://kenney.nl/assets/rpg-audio)         | Kenney Vleugels (Kenney.nl) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `cloth1-4.ogg`, `knifeSlice2.ogg`, `metalLatch.ogg`, `handleCoins*.ogg` |

Âm báo đòn quái, tiếng chuông ước nguyện và toàn bộ nhạc nền theo khu vực được tự tổng hợp bằng Web Audio trong `src/core/audio.ts` và `src/core/music.ts`.
