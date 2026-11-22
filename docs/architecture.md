# Kiến trúc

Mã nguồn được tách từ bản thử nghiệm một file (`legacy/index.html`) ở S00. Mục tiêu của lần tách là **giữ nguyên hành vi**: các hàm được chuyển gần như nguyên văn, chỉ thêm `import`/`export`, kiểu TypeScript và đọc số liệu từ `content/`.

## Luồng khởi động

`index.html` nạp `src/main.ts`. `main.ts` lần lượt:

1. Gắn sự kiện cho canvas, bàn phím, cảm ứng, modal, các màn hình, ước nguyện và trang admin (`init*`).
2. `Server.load()` đọc hồ sơ từ `localStorage["tinhtu-v2"]`, nếu không có thì tạo hồ sơ mới.
3. `go("hub")` mở sảnh, rồi `requestAnimationFrame(frame)` chạy vòng lặp.

Khi URL có `?e2e`, `window.__tinhtu = { S: GS, Server }` được gắn để Playwright điều khiển game. Chơi bình thường thì không có.

## Trạng thái

- `src/core/state.ts`: đối tượng `GS` thay cho các biến `let` cấp cao nhất của bản gốc (cảnh hiện tại, kích thước màn hình, phiên chơi `GS.G`, thế giới `GS.WORLD`...). Module nào cần thì đọc/ghi `GS.<tên>`.
- `src/server/server.ts`: `Server.P` là hồ sơ người chơi (Đá Sao, Xu, nhân vật, lịch sử ước nguyện, ủy thác). Giao diện chỉ đổi hồ sơ qua `Server.req(route, args)` để sau này thay bằng API thật mà không sửa UI.

## Module

| Thư mục     | Nội dung chính                                                                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `core/`     | `loop.ts` (`frame`, cập nhật theo cảnh), `render.ts` (vẽ khung hình), `canvas.ts`, `input.ts` (phím, joystick, nút giữ), `audio.ts` (`sfx`), `util.ts` (`hash2`, `fbm`, `shade`, `$`...), `state.ts`                |
| `data/`     | `schema.ts` (Zod và `validateContent`), `content.ts` (nạp YAML, xuất `CHARS`, `EL`, `WEAP`, `ENEMY`, `BOSS`, `DEFAULT_CFG`...)                                                                                      |
| `world/`    | `map.ts` (`genWorld` theo seed), `draw.ts` (vẽ ô, cây, đá), `collision.ts` (`blocked`, `moveC`)                                                                                                                     |
| `combat/`   | `actions.ts` (đánh thường, kỹ năng, nộ), `damage.ts` (`hitEnemy`, `hurtPlayer`), `elements.ts` (`applyElement`, 8 phản ứng, `swirl`)                                                                                |
| `entities/` | `party.ts` (đội 4 người, `newSession`), `enemy.ts`, `boss.ts`, `fx.ts` (hiệu ứng, chữ bay, `later`)                                                                                                                 |
| `art/`      | `chibi.ts` (nhân vật, chân dung), `enemy.ts` (quái, boss), `props.ts`                                                                                                                                               |
| `modes/`    | `world.ts` (Đảo Lạc), `tower.ts` (Tháp Tinh Tú), `boss.ts` (Hắc Giao), `session.ts` (kết thúc trận, thưởng)                                                                                                         |
| `ui/`       | `screens.ts` (`go`, sảnh), `hud.ts`, `wish.ts` (ước nguyện và hoạt ảnh sao băng), `chars.ts`, `tower.ts`, `boss.ts`, `daily.ts` (ủy thác), `admin.ts`, `cine.ts` (cảnh cắt nộ), `modal.ts`, `toast.ts`, `menuBg.ts` |
| `server/`   | `server.ts` (`Server`, `freshProfile`, `lvCost`, `statsOf`, gacha `rollOne`), `types.ts`                                                                                                                            |

## Dữ liệu

YAML trong `content/` được plugin `yaml-to-json` trong `vite.config.ts` chuyển thành JSON lúc build, nên game không tải file lúc chạy. `src/data/content.ts` kiểm tra dữ liệu bằng `validateContent` ngay khi nạp: dữ liệu sai thì game báo lỗi rõ ràng thay vì chạy sai. `pnpm content:check` dùng cùng hàm kiểm tra đó (đọc file qua `scripts/load-content.ts`).

## Kiểm thử

- `tests/unit/`: phản ứng nguyên tố, ước nguyện (bảo hiểm 90, 4★ mỗi 10 lần, 50/50 và đảm bảo), nâng cấp, lưu trữ, kiểm tra dữ liệu. `tests/unit/setup.ts` dựng DOM từ `index.html` và thay canvas bằng đối tượng rỗng.
- `tests/e2e/flow.spec.ts`: mở game → Đảo Lạc → đánh quái → ước 10 lần → Tháp → Boss, không có lỗi console. Chạy cả cấu hình máy tính và điện thoại.
- `tests/perf/fps.ts`: so FPS bản gốc và bản mới trong cùng kịch bản.

## Điều cần biết khi sửa

- Một số biến thừa hoặc cách viết lạ còn sót từ bản gốc được giữ nguyên ở S00 (ESLint báo cảnh báo, không báo lỗi). Các session sau có thể dọn khi đã có test bao phủ.
- Kiểu dữ liệu của trạng thái game (`GS.G`, quái, hiệu ứng) đang là `any`. Nên thêm interface dần khi sửa từng phần.
