# Kiến trúc

Mã nguồn được tách từ bản thử nghiệm một file (`legacy/index.html`) ở S00. Mục tiêu của lần tách là **giữ nguyên hành vi**: các hàm được chuyển gần như nguyên văn, chỉ thêm `import`/`export`, kiểu TypeScript và đọc số liệu từ `content/`.

## Luồng khởi động

`index.html` nạp `src/main.ts`. `main.ts` lần lượt:

1. Gắn sự kiện cho canvas, bàn phím, cảm ứng, modal, HUD và khung menu lớp phủ (`init*`, `initMenuShell`).
2. `Server.load()` đọc hồ sơ từ `localStorage["tinhtu-v3"]` (tự chuyển từ `tinhtu-v2` nếu có), nếu không có thì tạo hồ sơ mới.
3. Vào thẳng Đảo Lạc (không còn sảnh), rồi `requestAnimationFrame(frame)` chạy vòng lặp. Menu là lớp phủ mở trên thế giới đang tạm dừng (`docs/ux/menu.md`).
4. Nghe sự kiện `storage`: khi trang Admin (tab khác) đổi hồ sơ thì `Server.reload()` và vẽ lại menu đang mở.

Khi URL có `?e2e`, `window.__tinhtu = { S: GS, Server, menu }` được gắn để Playwright điều khiển game. Chơi bình thường thì không có.

Trang Admin là trang thứ hai của Vite (`admin/index.html` → `src/admin/main.ts`), dùng chung `Server` và `content/`, không được game nạp.

## Trạng thái

- `src/core/state.ts`: đối tượng `GS` thay cho các biến `let` cấp cao nhất của bản gốc (cảnh hiện tại, kích thước màn hình, phiên chơi `GS.G`, thế giới `GS.WORLD`...). Module nào cần thì đọc/ghi `GS.<tên>`.
- `src/server/server.ts`: `Server.P` là hồ sơ người chơi (Đá Sao, Xu, nhân vật, lịch sử ước nguyện, ủy thác). Giao diện chỉ đổi hồ sơ qua `Server.req(route, args)` để sau này thay bằng API thật mà không sửa UI.

## Module

| Thư mục     | Nội dung chính                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `core/`     | `loop.ts` (`frame`, cập nhật theo cảnh), `render.ts` (vẽ khung hình), `canvas.ts`, `input.ts` (phím, joystick, nút giữ), `settings.ts` (Cài đặt, `tinhtu-settings-v1`), `gamepad.ts` (tay cầm, điều hướng focus), `haptics.ts` (rung máy), `render-z.ts` (bóng đổ và độ cao khi vẽ), `audio.ts` (`sfx`), `util.ts` (`hash2`, `fbm`, `shade`, `$`...), `state.ts`                                                 |
| `data/`     | `schema.ts` (Zod và `validateContent`), `content.ts` (nạp YAML, xuất `CHARS`, `EL`, `WEAP`, `ENEMY`, `BOSS`, `DEFAULT_CFG`...)                                                                                                                                                                                                                                                                                   |
| `world/`    | `map.ts` (`genWorld` theo seed), `draw.ts` (vẽ ô, cây, đá), `collision.ts` (`blocked`, `moveC`, theo độ cao ô). Định dạng lớp độ cao, gờ, địa hình: `docs/world/dinh-dang-ban-do.md`                                                                                                                                                                                                                             |
| `combat/`   | `actions.ts` (đánh thường, kỹ năng, nộ), `damage.ts` (`hitEnemy`, `hurtPlayer`), `elements.ts` (`applyElement`, 8 phản ứng, `swirl`), `jump.ts` (nhảy, lướt trên không, lao xuống, rơi, sóng xung kích)                                                                                                                                                                                                          |
| `entities/` | `party.ts` (đội 4 người, `newSession`), `enemy.ts`, `boss.ts`, `fx.ts` (hiệu ứng, chữ bay, `later`)                                                                                                                                                                                                                                                                                                              |
| `art/`      | `chibi.ts` (nhân vật, chân dung), `enemy.ts` (quái, boss), `props.ts`                                                                                                                                                                                                                                                                                                                                            |
| `modes/`    | `world.ts` (Đảo Lạc), `tower.ts` (Tháp Tinh Tú), `boss.ts` (Hắc Giao), `session.ts` (kết thúc trận, thưởng)                                                                                                                                                                                                                                                                                                      |
| `ui/`       | `menu/` (khung lớp phủ `shell.ts`, logic thuần `logic.ts`, tiến trình khám phá `progress.ts`, các màn trong `menu/screens/`; xem `docs/ux/menu.md`), `wish/` (hoạt ảnh 5 cảnh `cinematic.ts`, chỗ phát video S20 `player.ts`), `screens.ts` (`go`), `hud.ts` và `hud/` (xem `docs/ux/hud-dieu-khien.md`), `settings.ts`, `boss.ts` (hình Hắc Giao), `cine.ts` (cảnh cắt nộ), `modal.ts`, `toast.ts`, `menuBg.ts` |
| `admin/`    | Trang Admin `/admin/`: `main.ts` (bảng điều khiển 8 mục), `auth.ts` (PBKDF2, phiên trong `sessionStorage`), `admin.css`                                                                                                                                                                                                                                                                                          |
| `server/`   | `server.ts` (`Server`, `freshProfile`, `lvCost`, `statsOf`, gacha `rollOne`), `types.ts`                                                                                                                                                                                                                                                                                                                         |

## Dữ liệu

YAML trong `content/` được plugin `yaml-to-json` trong `vite.config.ts` chuyển thành JSON lúc build, nên game không tải file lúc chạy. `src/data/content.ts` kiểm tra dữ liệu bằng `validateContent` ngay khi nạp: dữ liệu sai thì game báo lỗi rõ ràng thay vì chạy sai. `pnpm content:check` dùng cùng hàm kiểm tra đó (đọc file qua `scripts/load-content.ts`).

## Kiểm thử

- `tests/unit/`: phản ứng nguyên tố, ước nguyện (Bảo Hộ Vận Sao 90, 4★ mỗi 10 lần, 50/50 và đảm bảo), nâng cấp, lưu trữ, kiểm tra dữ liệu. `tests/unit/setup.ts` dựng DOM từ `index.html` và thay canvas bằng đối tượng rỗng.
- `tests/e2e/flow.spec.ts`: vào thẳng Đảo Lạc → menu lớp phủ (đổi đội, bị chặn khi đang đánh), ước 1 và 10 lần có bỏ qua, màn Nhân vật, dịch chuyển trên bản đồ, Tháp, Boss, trang Admin; chuyển màn dưới 250 ms, không có lỗi console. Chạy cả cấu hình máy tính và điện thoại.
- `tests/e2e/hud.spec.ts`: chế độ chỉnh bố cục, màn dọc, HUD ở ba cỡ màn, phím Space, Cài đặt.
- `tests/perf/fps.ts`: so FPS bản gốc và bản mới trong cùng kịch bản.

## Điều cần biết khi sửa

- Một số biến thừa hoặc cách viết lạ còn sót từ bản gốc được giữ nguyên ở S00 (ESLint báo cảnh báo, không báo lỗi). Các session sau có thể dọn khi đã có test bao phủ.
- Kiểu dữ liệu của trạng thái game (`GS.G`, quái, hiệu ứng) đang là `any`. Nên thêm interface dần khi sửa từng phần.
