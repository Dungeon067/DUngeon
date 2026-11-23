# Mắt Hạ Vy bản nhân vật chính (1024x512, bố cục mẫu VRoid): tròng đỏ nhiều lớp, vòng sáng, 3 điểm sáng.
import numpy as np, sys
from PIL import Image, ImageDraw, ImageFilter
src = sys.argv[1] if len(sys.argv) > 1 else 'eye_iris_src.png'
W, H = 1024, 512
eyes = [(262, 260), (762, 260)]
RX, RY = 112, 124

a = np.array(Image.open(src).convert('RGBA')).astype(np.float32)
lum = (a[..., :3] @ [0.3, 0.59, 0.11]) / 255.0
m0 = a[..., 3] > 20
lum = np.clip((lum - lum[m0].min()) / (np.percentile(lum[m0], 99) + 1e-6), 0, 1)
yy, xx = np.mgrid[0:H, 0:W]
r = np.full((H, W), 9.0)
dy = np.zeros((H, W))
for cx, cy in eyes:
    rr = np.sqrt(((xx - cx) / RX) ** 2 + ((yy - cy) / RY) ** 2)
    m = rr < r
    r[m] = rr[m]
    dy[m] = ((yy - cy) / RY)[m]
# Lớp 1: dải dọc đỏ thẫm (trên) -> đỏ #d9262e -> cam hồng (dưới)
stops = [(0.0, (60, 6, 16)), (0.35, (150, 16, 30)), (0.6, (217, 38, 46)), (1.0, (255, 150, 120))]
t = np.clip((dy + 0.8) / 1.6, 0, 1)
col = np.zeros((H, W, 3))
for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
    k = ((t >= t0) & (t <= t1))[..., None]
    f = ((t - t0) / (t1 - t0))[..., None]
    col = np.where(k, np.array(c0) + (np.array(c1) - np.array(c0)) * f, col)
# Lớp 2: vân tròng theo mẫu
col *= (0.75 + 0.4 * lum)[..., None]
# Lớp 3: viền tối ngoài + đồng tử thẫm
col *= np.clip(1 - np.clip((r - 0.82) / 0.18, 0, 1) * 0.6, 0, 1)[..., None]
pup = np.clip((0.32 - r) / 0.06, 0, 1)[..., None]
col = col * (1 - pup) + np.array([35, 2, 10]) * pup
# Lớp 4: vòng sáng (cam vàng) quanh đồng tử, đậm ở nửa dưới
ring = np.exp(-((r - 0.55) / 0.06) ** 2) * np.clip(0.35 + dy, 0, 1)
col = col + (np.array([255, 200, 140]) - col) * (0.8 * ring)[..., None]
# Lớp 5: bông tuyết nhỏ 6 cánh (xanh băng) quanh đồng tử, mỗi cánh có 2 nhánh
snow = np.zeros((H, W))
for cx, cy in eyes:
    u, v = (xx - cx) / RX, (yy - cy) / RY
    for k in range(6):
        ang = np.pi / 2 + k * np.pi / 3
        ax, ay = np.cos(ang), np.sin(ang)
        along, perp = u * ax + v * ay, np.abs(-u * ay + v * ax)
        on = (along > 0.34) & (along < 0.74)
        snow = np.maximum(snow, np.where(on, np.exp(-(perp / 0.022) ** 2), 0))
        for b0 in (0.5, 0.62):
            for sg in (-1, 1):
                bx, by = np.cos(ang + sg * 0.75), np.sin(ang + sg * 0.75)
                pu, pv = u - ax * b0, v - ay * b0
                ba, bp = pu * bx + pv * by, np.abs(-pu * by + pv * bx)
                snow = np.maximum(snow, np.where((ba > 0) & (ba < 0.12), np.exp(-(bp / 0.018) ** 2), 0))
col = col + (np.array([170, 235, 255]) - col) * (0.38 * snow)[..., None]
out = np.concatenate([col, a[..., 3:]], -1)
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save('havy_hero_eye_iris.png')

# Điểm sáng: lớn trên trái + nhỏ dưới phải + chấm phụ, viền sắc, quầng mờ
hl = Image.new('RGBA', (W, H), (255, 255, 255, 0))
glow = Image.new('L', (W, H), 0)
gd, d = ImageDraw.Draw(glow), ImageDraw.Draw(hl)
for cx, cy in eyes:
    big = (cx - 72, cy - 98, cx - 8, cy - 38)
    gd.ellipse((big[0] - 8, big[1] - 8, big[2] + 8, big[3] + 8), 90)
    d.ellipse(big, (255, 255, 255, 255))
    d.ellipse((cx + 26, cy + 40, cx + 54, cy + 68), (255, 255, 255, 255))
    d.ellipse((cx + 40, cy - 72, cx + 54, cy - 58), (255, 255, 255, 230))
g = glow.filter(ImageFilter.GaussianBlur(6))
arr = np.array(hl)
arr[..., 3] = np.maximum(arr[..., 3], np.array(g))
Image.fromarray(arr).save('havy_hero_eye_highlight.png')
print('ok')
