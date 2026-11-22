# Cảm giác chiến đấu (S14)

Mọi thông số nằm trong `content/combat-feel.yaml`, được kiểm tra bằng Zod (`FeelSchema` trong `src/data/schema.ts`) khi nạp game và khi chạy `pnpm content:check`. Đơn vị thời gian là giây.

## Các phần và file liên quan

| Phần                             | Làm gì                                                                                                                                                                                                                                                                                             | File                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Dừng hình (`hitstop`)            | Đòn nặng (đòn 3 của combo, đại kiếm), chí mạng, phản ứng, nộ, vỡ chịu đòn dừng game 50–80 ms. Nhiều đòn cùng lúc chỉ lấy lần dài nhất, trần `max`.                                                                                                                                                 | `src/combat/feel.ts`                            |
| Chậm hình (`slowmo.bossKill`)    | Hạ Hắc Giao: game chạy 0,25× trong 1,2 giây, 0,3 giây cuối trả dần về tốc độ thường.                                                                                                                                                                                                               | `src/combat/feel.ts`, `src/entities/boss.ts`    |
| Rung (`shake`)                   | Mỗi loại đòn một mức rung, nhân `scale`. Người chơi tắt được (lưu `localStorage` khóa `tinhtu.feel.v1`). Rung giảm theo thời gian thật nên vẫn tắt khi đang dừng hình.                                                                                                                             | `src/combat/feel.ts`                            |
| Camera (`camera`)                | Nhìn trước `lead` px theo hướng chạy; thu nhỏ còn `bossZoom` khi có boss; phóng to `burstZoom` trong `burstHold` giây khi dùng nộ. Vẫn giữ giới hạn bản đồ.                                                                                                                                        | `src/core/camera.ts`                            |
| Đệm lệnh, hủy đòn (`input`)      | Bấm đánh, kỹ năng, nộ, lướt sớm tối đa `buffer` giây vẫn được nhận khi hết thời gian chờ. Lướt né hủy hoạt ảnh và thời gian chờ đòn đánh (`dashCancel`).                                                                                                                                           | `src/combat/actions.ts`                         |
| Trúng đòn (`hit`)                | Nháy trắng `flash` giây, co giãn thân quái `squash` giây.                                                                                                                                                                                                                                          | `src/combat/damage.ts`, `src/art/enemy.ts`      |
| Chịu đòn (`poise`, `enemies`)    | Mỗi đòn trừ `weapon[loại vũ khí] × hệ số đòn`. Hết thanh: choáng `stun` giây (boss dùng `enemies.hacgiao.stun`), ngắt đòn đang chuẩn bị, nhận thêm `stunVuln` lần sát thương. Không bị đánh `regenDelay` giây thì hồi `regen` thanh mỗi giây. Giật lùi chia cho `mass`; `mass: 0` là không bị đẩy. | `src/combat/damage.ts`, `src/entities/enemy.ts` |
| Báo trước đòn (`telegraph`)      | Vùng đánh tô đầy dần, viền sáng dần, từ mốc `flashAt` viền nháy trắng; dấu "!" trên đầu quái. Độ dày viền tính theo điểm ảnh màn hình, nhân `touchScale` trên thiết bị cảm ứng. Âm báo: một nốt khi bắt đầu, nốt cao hơn ở `flashAt`, chỉ khi quái trong `warnRange`.                              | `src/art/props.ts`, `src/entities/telegraph.ts` |
| Âm thanh (`audio`)               | Âm lượng kênh hiệu ứng và kênh nhạc; nhạc chiến đấu bật khi có quái đuổi trong `combatRange` hoặc boss còn sống, giữ thêm `combatLinger` giây, chuyển mượt trong `crossfade` giây.                                                                                                                 | `src/core/audio.ts`, `src/core/music.ts`        |
| Hiệu ứng nhân vật (`characters`) | Màu chính `c`, màu lõi `c2`, kiểu hạt `particle` và hình vệt chém `trail` cho từng Hộ Tinh.                                                                                                                                                                                                        | `src/entities/fx.ts`, `src/art/fx.ts`           |

## Âm thanh

- Trúng đòn theo vũ khí: kiếm đơn tiếng kim loại nhẹ, đại kiếm tiếng tấm kim loại nặng, thương tiếng gỗ dày, cung tiếng gỗ mảnh, pháp khí tiếng thủy tinh. Mẫu lấy từ gói CC0 của Kenney (xem `CREDITS.md`), mỗi lần phát đổi cao độ ngẫu nhiên một chút để không lặp.
- Âm báo đòn, tiếng chuông ước nguyện và nhạc nền tự tổng hợp bằng Web Audio. Ba chủ đề: Đảo Lạc (ngũ cung, nhịp thong thả), Tháp Tinh Tú (thang thứ, chuông mảnh), hang Hắc Giao (nốt trầm, trống dồn). Mỗi chủ đề có lớp khám phá và lớp chiến đấu.
- Âm thanh vẫn tắt mặc định như trước; bật bằng nút "Âm thanh" ở sảnh.

## Bảng chỉnh nhanh

- Chỉ nạp khi chạy `pnpm dev` hoặc khi URL có `?dev`; bản phát hành bình thường không tải mã này.
- Phím **F9** bật/tắt bảng. Kéo thanh để đổi thông số ngay trong trận; giá trị được lưu trong `localStorage` (khóa `tinhtu.feel.dev`).
- **Xuất YAML** in các mục đã đổi (và chép vào bộ nhớ tạm) để dán vào `content/combat-feel.yaml`. **Mặc định** trả mọi thông số về giá trị trong file.
- Công tắc rung tạm thời có ở bảng này và một dòng trong cửa sổ Tạm dừng; S10 sẽ đưa vào phần cài đặt chính thức.

## Đo đạc

- `pnpm build && pnpm record [url] [file.webm]` quay 60 giây cùng một kịch bản: đánh quái ở Đảo Lạc (combo, kỹ năng, lướt, nộ, đổi nhân vật) rồi đánh và hạ Hắc Giao. In ra FPS trung bình, p95 và số khung hình chậm hơn 20 ms. `NOVIDEO=1` chỉ đo, không quay.
- `pnpm test` có `tests/unit/feel.test.ts` kiểm tra dừng hình, chậm hình, rung, đệm lệnh, hủy đòn, chịu đòn, giật lùi theo cân nặng và lỗi dữ liệu.
