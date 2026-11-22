# Cinematic ước nguyện (S20)

Video dựng sẵn cho phần sao băng của màn ước nguyện (cảnh 1–4, 9 giây). Cảnh 5 (giới thiệu nhân vật) chạy trong game như bản mẫu, vì không thể làm video riêng cho từng kết quả. Video hoàn toàn không có chữ, logo hay ghi công; âm thanh là file riêng.

## Phân cảnh

| Cảnh | Thời gian | Nội dung                                                                                                       |
| ---- | --------- | -------------------------------------------------------------------------------------------------------------- |
| 1    | 0,0–2,5 s | Đêm trăng trên vách đá; Người Ước Nguyện đứng cạnh trống đồng, giơ tay thả đèn trời (khung 34)                 |
| 2    | 2,5–4,5 s | Máy quay bay theo đèn xuyên mây; đèn vỡ thành bụi sao ở 3,83 s, chỗ trống để vẽ chòm sao banner                |
| 3    | 4,5–7,0 s | Không gian sâu, sao kéo vệt, sao băng theo màu độ hiếm; 5★ đổi tím sang vàng ở 5,83 s và quay chậm             |
| 4    | 7,0–9,0 s | Vách đá đêm nhìn xuống biển; sao băng rơi vào trống đồng ở 8,0 s, sóng xung kích ra biển, cột sáng bằng số sao |
| 5    | từ 9,0 s  | Trong game: bóng đen viền sáng, màu tràn từ chân, tên và sao                                                   |

Ánh vàng trên vách đá ở cảnh 4 chỉ đến từ sao băng; trước đó cảnh chỉ có ánh trăng và ánh trời xanh lam.

## Các bản video

| Bản    | Nội dung                                                           |
| ------ | ------------------------------------------------------------------ |
| `3`    | sao băng xanh `#6fb6ff`, 3 cột sáng                                |
| `4`    | sao băng tím `#b98cff`, 4 cột sáng                                 |
| `5a`   | tím đổi vàng `#ffcf5a`, quay chậm, sao băng từ phải trên           |
| `5b`   | như 5a nhưng sao băng từ trái dưới, góc máy cảnh 4 từ phía bên kia |
| `10x4` | ước 10 lần, cao nhất 4★: 9 sao băng phụ rơi xuống biển             |
| `10x5` | ước 10 lần, cao nhất 5★: 9 sao băng phụ, sao chính đổi vàng        |

Cảnh 1–2 render một lần, dùng chung cho mọi bản. Mỗi bản có 4 file trong `media/cinematic/out/video/`: `<bản>-1080.webm`, `<bản>-1080.mp4`, `<bản>-720.webm`, `<bản>-720.mp4`. Âm thanh ở `out/audio/<bản>.ogg` (Opus) và `.mp3`, dài 10,5 giây (thêm 1,5 giây đuôi cho cảnh 5).

## Quy chuẩn

| Mục        | Giá trị                                           |
| ---------- | ------------------------------------------------- |
| Khung hình | 16:9, 1920×1080 (máy tính), 1280×720 (điện thoại) |
| Tốc độ     | 30 khung/giây                                     |
| Định dạng  | MP4 H.264 và WebM VP9, không có rãnh âm thanh     |
| Dung lượng | bản 720p dưới 6MB                                 |
| Lưu trữ    | Git LFS cho `media/cinematic/out/**`              |

## Thư mục

| Đường dẫn                             | Nội dung                                                              |
| ------------------------------------- | --------------------------------------------------------------------- |
| `media/cinematic/blender/build.py`    | Dựng và render một cảnh của một bản                                   |
| `media/cinematic/blender/cine/`       | Thư viện dựng cảnh: môi trường, trống đồng, hiệu ứng, các cảnh        |
| `media/cinematic/tools/render_all.sh` | Render toàn bộ 1080p, ghi timeline, âm thanh, mã hóa (chạy tiếp được) |
| `media/cinematic/tools/encode.py`     | Ghép khung PNG, chỉnh màu, hạt phim, xuất MP4 và WebM 1080p/720p      |
| `media/cinematic/tools/timeline.py`   | Sinh `out/timeline.json`                                              |
| `media/cinematic/tools/audio.py`      | Tổng hợp âm thanh từng bản bằng numpy                                 |
| `media/cinematic/preview/`            | Trang thử độc lập                                                     |
| `media/cinematic/fallback/`           | Bản mẫu của chủ dự án, dùng làm bản dự phòng chạy bằng code           |
| `media/cinematic/out/`                | Video, âm thanh, `timeline.json`, ảnh duyệt (Git LFS)                 |

## Chạy lại

Cần Blender 5.3 (bản Linux, chạy không giao diện), Python 3 có numpy, ffmpeg có `libx264`, `libvpx-vp9`, `libopus`, `libmp3lame`.

```bash
cd media/cinematic
BLENDER=/đường/dẫn/blender tools/render_all.sh          # mọi bản
BLENDER=/đường/dẫn/blender tools/render_all.sh 5a 4     # chỉ vài bản
```

Khung PNG nằm ở `media/cinematic/frames/` (không commit). Chạy lại sẽ bỏ qua khung đã có, nên muốn render lại một cảnh thì xóa thư mục khung của cảnh đó. Một cảnh riêng lẻ:

```bash
cd media/cinematic/blender
blender -b --factory-startup -P build.py -- --shot s4 --variant 5b --res 1280x720 --samples 16 \
  --frames 20,30,40 --out /tmp/thu
```

`--frames` chỉ render vài khung; hạt và vệt sao băng vẫn được mô phỏng từ khung đầu.

Thời gian trên máy 8 nhân CPU, không GPU, 1080p: cảnh 1 khoảng 85 giây/khung, cảnh 4 khoảng 110 giây/khung, cảnh 3 khoảng 20 giây/khung. Toàn bộ khoảng 12–16 giờ.

## `timeline.json`

Mọi mốc tính bằng giây từ đầu video.

| Khóa                   | Ý nghĩa                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `shots`                | đầu và cuối từng cảnh                                                                               |
| `cues`                 | `lanternRelease`, `lanternBurst`, `flare5` (chỉ 5★), `impact`, `reveal` (bắt đầu cảnh 5)            |
| `constellation.anchor` | mỗi khung cảnh 2 một bộ `[giây, x, y]`, `x, y` từ 0 đến 1 trong khung video, gốc trên trái          |
| `constellation.*`      | `drawFrom`, `fullAt`, `fadeOutFrom`, `hiddenAt`, `scale` (theo chiều cao khung)                     |
| `fastForward`          | cho tua nhanh từ lần ước thứ `allowedFromWish`, tốc độ `rate`, đến mốc `until` thì về tốc độ thường |
| `variants`             | độ hiếm, có phải ước 10 lần, danh sách file video theo độ cao và file âm thanh                      |

## Cách đưa vào game (việc của S10)

1. **Chọn bản.** Kết quả cao nhất 3★/4★ dùng `3`/`4`; 5★ luân phiên `5a`/`5b`; ước 10 lần dùng `10x4` hoặc `10x5`.
2. **Tải trước** khi người chơi mở màn ước nguyện: `<video preload="auto" muted playsinline>` với nguồn WebM trước, MP4 sau. Chọn 720p khi cạnh dài màn hình nhân `devicePixelRatio` không quá 1500 hoặc bật tiết kiệm dữ liệu.
3. **Âm thanh** phát riêng (Opus, Safari dùng MP3) theo âm lượng hiệu ứng của game, đồng bộ theo `video.currentTime`; lệch quá 0,12 giây thì đặt lại.
4. **Chòm sao banner:** vẽ bằng canvas chồng lên video theo `constellation`, tính đúng phần bị cắt khi video phủ kín màn hình (`object-fit: cover`).
5. **Bỏ qua:** nút luôn hiện trong lúc phát; bấm thì dừng video, đưa âm thanh tới `cues.reveal` và vào cảnh 5.
6. **Tua nhanh:** từ lần ước thứ 2 trong phiên, cho tăng tốc lên `fastForward.rate` (video và âm thanh) đến `fastForward.until`.
7. **Dự phòng:** video không tải được sau 4 giây, lỗi khi phát, máy dưới 2GB bộ nhớ hoặc không phát được VP9/H.264 thì chạy hoạt ảnh bằng code (bản mẫu).
8. **GitHub Pages** không phục vụ file LFS. Workflow deploy cần `actions/checkout` với `lfs: true` và chép `media/cinematic/out/` vào bản build.

`media/cinematic/preview/` làm đúng các bước trên, S10 có thể đọc để chép cách làm.

## Trang thử

```bash
npx serve media/cinematic        # hoặc: python3 -m http.server -d media/cinematic
# mở http://localhost:3000/preview/  (thêm ?fallback=1 để xem bản dự phòng, ?variant=5b, ?h=720)
```

## Kỹ thuật

- Cycles, khử nhiễu OpenImageDenoise, motion blur, độ sâu trường ảnh ở cảnh 1–2.
- Compositor: bloom, quang sai màu nhẹ, vignette, sương theo khoảng cách (Mist pass). Hạt phim và chỉnh màu chung thêm lúc mã hóa.
- Biển bằng Ocean modifier, núi xa sinh theo noise, vách đá, mép vực và cỏ bằng Geometry Nodes, đá tảng sinh bằng code.
- Mây ở cảnh 2 là khối volume noise được đèn trời chiếu sáng.
- Trống đồng: thân tiện, mặt trống có hoa văn nổi (mặt trời giữa, vòng chim Lạc, dải chấm) từ bản đồ độ cao sinh bằng code.
- Sao băng: lõi và quầng phát sáng, vệt dạng ống thon, tia lửa và bụi sao là hạt tự mô phỏng.
- Âm thanh: sóng biển, gió, chuông, tiếng trống đồng (các mode không điều hòa), âm trầm không gian, giai điệu ngũ cung theo độ hiếm; tổng hợp hoàn toàn bằng numpy.
