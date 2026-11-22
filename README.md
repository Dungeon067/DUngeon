# Tinh Tú Ước Nguyện

Game nhập vai hành động 2D thế giới mở, góc nhìn từ trên xuống, chạy trên trình duyệt (máy tính và điện thoại). Thế giới lấy cảm hứng từ thần thoại và văn hóa dân gian Việt Nam.

Dự án dùng Vite + TypeScript (`strict`). Dữ liệu nhân vật, quái và cấu hình nằm trong `content/` dưới dạng YAML. Bản thử nghiệm một file gốc được giữ ở `legacy/index.html` để so sánh.

## Cài đặt

Cần Node.js 20 trở lên và pnpm 9 (bật bằng `corepack enable`).

```bash
pnpm install
pnpm exec playwright install chromium   # chỉ cần khi chạy test đầu cuối
```

## Lệnh

| Lệnh                 | Việc làm                                                           |
| -------------------- | ------------------------------------------------------------------ |
| `pnpm dev`           | Chạy máy chủ phát triển tại http://localhost:5173                  |
| `/styleguide/`       | Trang hệ thống thiết kế (chỉ có ở `pnpm dev` hoặc `STYLEGUIDE=1`)  |
| `pnpm build`         | Kiểm tra kiểu rồi build ra `dist/` (kèm `dist/legacy/` là bản gốc) |
| `pnpm preview`       | Xem bản đã build                                                   |
| `pnpm typecheck`     | Kiểm tra kiểu TypeScript                                           |
| `pnpm lint`          | ESLint và kiểm tra định dạng Prettier                              |
| `pnpm format`        | Định dạng lại mã bằng Prettier                                     |
| `pnpm test`          | Unit test (Vitest)                                                 |
| `pnpm test:e2e`      | Test đầu cuối (Playwright, máy tính và điện thoại)                 |
| `pnpm content:check` | Kiểm tra dữ liệu `content/` theo schema                            |
| `pnpm admin:hash`    | Tạo salt và hash mới cho mật khẩu trang Admin                      |
| `pnpm fps`           | So sánh FPS bản gốc và bản mới (chạy `pnpm build` trước)           |

## Bản chơi thử

- Nhánh `main` được triển khai lên GitHub Pages: https://dungeon067.github.io/DUngeon/ (bản gốc ở `/legacy/`).
- Mỗi pull request có bản xem thử ở `https://dungeon067.github.io/DUngeon/pr-preview/pr-<số>/`, bot sẽ gắn link vào PR.

## Trang Admin

Trang quản trị riêng ở `/admin/` (ví dụ http://localhost:5173/admin/). Trong game không có đường dẫn tới trang này. Admin dùng chung dữ liệu với game qua "server giả lập" trên `localStorage`.

- Mật khẩu mặc định: `tinhtu-admin`.
- Đổi mật khẩu: chạy `pnpm admin:hash "mật-khẩu-mới"`, dán `salt` và `hash` in ra đè vào mục `login` của `content/admin.yaml`, rồi build lại. Repo chỉ giữ hash, không giữ mật khẩu gốc.
- **Đây chỉ là chặn tạm ở bản thử nghiệm**: mọi thứ chạy trên trình duyệt nên ai đọc mã cũng vượt được. Khi có server thật, xác thực phải chuyển lên server.

Chi tiết menu và Admin: [docs/ux/menu.md](docs/ux/menu.md).

## Sơ đồ thư mục

```
content/              dữ liệu YAML (xem docs/content.md)
  characters/*.yaml   Hộ Tinh (màn Nhân vật tự đọc danh sách)
  enemies/*.yaml      5 loại quái và boss Hắc Giao
  config.yaml         ước nguyện, hồ sơ khởi đầu, nguyên tố, vũ khí, ủy thác
  menu.yaml           menu lớp phủ, chặn đổi đội, độ thân thiết (S10)
  items.yaml, quests.yaml, codex.yaml   túi đồ, nhiệm vụ, bách khoa
  cinematic.yaml      nhịp hoạt ảnh ước nguyện, chỗ cắm video S20
  admin.yaml          hash mật khẩu Admin (chặn tạm)
  combat-feel.yaml    cảm giác đánh (xem docs/combat-feel.md)
docs/                 tài liệu (kiến trúc, dữ liệu)
  world/              kinh thánh thế giới: vũ trụ, lịch sử, vùng đất, phe phái...
admin/index.html      trang Admin /admin/
legacy/index.html     bản thử nghiệm một file gốc
scripts/              lệnh content:check, admin:hash
src/
  core/               vòng lặp, canvas, input, âm thanh, trạng thái chung, tiện ích
  data/               đọc content/ và schema Zod
  world/              sinh bản đồ, vẽ ô, va chạm
  combat/             đánh thường, kỹ năng, nộ, sát thương, nguyên tố, phản ứng
  entities/           đội hình, quái, boss, hiệu ứng
  art/                vẽ chibi, chân dung, quái, boss, đồ vật
  modes/              thế giới, tháp, boss
  ui/                 HUD, menu lớp phủ (ui/menu/), hoạt ảnh ước nguyện (ui/wish/)
  admin/              trang Admin
  server/             "server giả lập" lưu trên localStorage (khóa tinhtu-v3)
  styles/main.css     giao diện
tests/
  unit/               Vitest
  e2e/                Playwright
  perf/               đo FPS
```

Chi tiết các module: [docs/architecture.md](docs/architecture.md). Cách sửa dữ liệu: [docs/content.md](docs/content.md). Thế giới, cốt truyện và quy tắc đặt tên: [docs/world/](docs/world/README.md).
