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
| `pnpm fps`           | So sánh FPS bản gốc và bản mới (chạy `pnpm build` trước)           |

## Bản chơi thử

- Nhánh `main` được triển khai lên GitHub Pages: https://dungeon067.github.io/DUngeon/ (bản gốc ở `/legacy/`).
- Mỗi pull request có bản xem thử ở `https://dungeon067.github.io/DUngeon/pr-preview/pr-<số>/`, bot sẽ gắn link vào PR.

## Sơ đồ thư mục

```
content/              dữ liệu YAML (xem docs/content.md)
  characters/*.yaml   12 Hộ Tinh
  enemies/*.yaml      5 loại quái và boss Hắc Giao
  config.yaml         ước nguyện, hồ sơ khởi đầu, nguyên tố, vũ khí, ủy thác
  combat-feel.yaml    cảm giác đánh (xem docs/combat-feel.md)
docs/                 tài liệu (kiến trúc, dữ liệu)
  world/              kinh thánh thế giới: vũ trụ, lịch sử, vùng đất, phe phái...
legacy/index.html     bản thử nghiệm một file gốc
scripts/              lệnh content:check
src/
  core/               vòng lặp, canvas, input, âm thanh, trạng thái chung, tiện ích
  data/               đọc content/ và schema Zod
  world/              sinh bản đồ, vẽ ô, va chạm
  combat/             đánh thường, kỹ năng, nộ, sát thương, nguyên tố, phản ứng
  entities/           đội hình, quái, boss, hiệu ứng
  art/                vẽ chibi, chân dung, quái, boss, đồ vật
  modes/              thế giới, tháp, boss
  ui/                 HUD, màn hình menu, ước nguyện, admin
  server/             "server giả lập" lưu trên localStorage (khóa tinhtu-v2)
  styles/main.css     giao diện
tests/
  unit/               Vitest
  e2e/                Playwright
  perf/               đo FPS
```

Chi tiết các module: [docs/architecture.md](docs/architecture.md). Cách sửa dữ liệu: [docs/content.md](docs/content.md). Thế giới, cốt truyện và quy tắc đặt tên: [docs/world/](docs/world/README.md).
