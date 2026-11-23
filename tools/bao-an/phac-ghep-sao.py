"""Bản phác hiệu ứng "Sao sáng trọn" ở màn Nhân vật: 5 Mảnh Sao ghép thành chòm sao năm cánh.

Dùng: python3 tools/bao-an/phac-ghep-sao.py <thư mục ảnh media/bao-an> <thư mục ra>
Ra: phac-ghep-sao.png (bảng phác từng nhịp) và phac-ghep-sao.mp4 (cần ffmpeg).
"""
import math
import os
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC, OUT = sys.argv[1], sys.argv[2]
W, H, FPS = 1280, 720, 30
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONTB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SLOTS = ["hoa", "long", "den", "chen", "mien"]
TEN_O = {"hoa": "Hoa", "long": "Lông", "den": "Canh", "chen": "Chén", "mien": "Miện"}
# đỉnh sao theo vòng tròn: Hoa trên cùng, rồi Miện, Chén, Canh, Lông theo chiều kim đồng hồ;
# nét vẽ sao nối đỉnh cách một: Hoa → Chén → Lông → Miện → Canh → Hoa
VONG = ["hoa", "mien", "chen", "den", "long"]
NET = ["hoa", "chen", "long", "mien", "den", "hoa"]
BO = [
    ("dem-hoi-van-dang", "Đêm Hội Vạn Đăng", "Sao Vạn Đăng", (255, 176, 90), (255, 240, 190)),
    ("lan-tuyet-ranmori", "Lan Tuyết Rừng Ranmori", "Sao Lan Tuyết", (150, 215, 255), (240, 250, 255)),
]
CX, CY, R = 640, 380, 220
# vị trí ô lúc chưa ghép: 3 ô trái, 2 ô phải như thẻ Bảo Ấn
O_LO = {"hoa": (330, 190), "long": (300, 372), "den": (330, 520), "chen": (950, 260), "mien": (950, 484)}


def font(s, b=False):
    return ImageFont.truetype(FONTB if b else FONT, s)


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def dinh(slot):
    i = VONG.index(slot)
    a = -math.pi / 2 + i * 2 * math.pi / 5
    return CX + R * math.cos(a), CY + R * math.sin(a)


def nen():
    im = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(im)
    for y in range(H):
        k = y / H
        d.line([(0, y), (W, y)], fill=(int(14 + 10 * k), int(16 + 8 * k), int(34 + 14 * k)))
    # dáng nhân vật (phác)
    s = Image.new("RGBA", (W, H))
    g = ImageDraw.Draw(s)
    col = (58, 64, 98, 255)
    g.ellipse([CX - 34, 150, CX + 34, 226], fill=col)
    g.polygon([(CX - 46, 236), (CX + 46, 236), (CX + 74, 420), (CX + 40, 430), (CX + 30, 600), (CX - 30, 600),
               (CX - 40, 430), (CX - 74, 420)], fill=col)
    g.polygon([(CX - 46, 240), (CX - 96, 400), (CX - 80, 408), (CX - 40, 300)], fill=col)
    g.polygon([(CX + 46, 240), (CX + 96, 400), (CX + 80, 408), (CX + 40, 300)], fill=col)
    g.polygon([(CX - 30, 600), (CX - 6, 600), (CX - 12, 660), (CX - 36, 660)], fill=col)
    g.polygon([(CX + 30, 600), (CX + 6, 600), (CX + 12, 660), (CX + 36, 660)], fill=col)
    s = s.filter(ImageFilter.GaussianBlur(1.2))
    im.paste(s, (0, 0), s)
    d = ImageDraw.Draw(im)
    d.text((40, 30), "Nhân vật  ·  Bảo Ấn", font=font(26, True), fill=(230, 232, 245))
    d.text((40, 66), "Bản phác hiệu ứng Sao sáng trọn", font=font(17), fill=(150, 156, 190))
    return im


ICON = {}


def icon(bo, slot, size):
    k = (bo, slot, size)
    if k not in ICON:
        im = Image.open(os.path.join(SRC, f"{bo}-{slot}.png")).convert("RGBA")
        ICON[k] = im.resize((size, size), Image.LANCZOS)
    return ICON[k]


def o_vi_tri(slot, t_gom):
    x0, y0 = O_LO[slot]
    x1, y1 = dinh(slot)
    e = ease(t_gom)
    # đi theo cung nhẹ để nhìn như được hút về chòm sao
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    bx, by = mx + (CY - my) * 0.25, my + (mx - CX) * 0.25 * -1
    x = (1 - e) ** 2 * x0 + 2 * (1 - e) * e * bx + e * e * x1
    y = (1 - e) ** 2 * y0 + 2 * (1 - e) * e * by + e * e * y1
    return x, y


def khung(im, bo_cfg, x, y, sang, co=1.0):
    bo, _, _, mau, _ = bo_cfg
    r = int(62 * co)
    lop = Image.new("RGBA", (W, H))
    g = ImageDraw.Draw(lop)
    g.ellipse([x - r, y - r, x + r, y + r], fill=(22, 24, 44, 235), outline=(*mau, int(120 + 135 * sang)), width=3)
    if sang > 0:
        hao = Image.new("RGBA", (W, H))
        ImageDraw.Draw(hao).ellipse([x - r - 10, y - r - 10, x + r + 10, y + r + 10], outline=(*mau, int(200 * sang)),
                                    width=8)
        lop = Image.alpha_composite(hao.filter(ImageFilter.GaussianBlur(9)), lop)
    im.alpha_composite(lop)


def ve(bo_cfg, t, so_manh=5):
    """t tính bằng giây. 0–0.4 đứng yên, 0.4–1.0 các ô bay về đỉnh sao, 1.0–1.6 nối nét + lõi bùng, sau đó giữ sáng."""
    bo, ten_bo, ten_sao, mau, loi = bo_cfg
    im = nen().convert("RGBA")
    du = so_manh == 5
    t_gom = (t - 0.4) / 0.6 if du else 0.0
    t_net = (t - 1.0) / 0.5 if du else 0.0
    t_bung = (t - 1.35) / 0.35 if du else 0.0
    co = [s for s in SLOTS][:so_manh]
    glow = Image.new("RGBA", (W, H))
    gd = ImageDraw.Draw(glow)
    net = Image.new("RGBA", (W, H))
    nd = ImageDraw.Draw(net)
    # nét chòm sao
    if du and t_net > 0:
        tong = 5 * ease(t_net)
        for i in range(5):
            a, b = dinh(NET[i]), dinh(NET[i + 1])
            k = max(0.0, min(1.0, tong - i))
            if k <= 0:
                continue
            p = (a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k)
            gd.line([a, p], fill=(*mau, 255), width=16)
            nd.line([a, p], fill=(*loi, 255), width=3)
    # lõi sáng giữa
    if du and t_bung > 0:
        e = ease(t_bung)
        nhip = 1.0 + 0.06 * math.sin(max(0.0, t - 1.7) * 5)
        rr = (30 + 66 * e) * nhip
        gd.ellipse([CX - rr, CY - rr, CX + rr, CY + rr], fill=(*mau, int(120 * e)))
        r2 = (16 + 30 * e) * nhip
        sao = []
        for i in range(10):
            ang = -math.pi / 2 + i * math.pi / 5
            rad = r2 if i % 2 == 0 else r2 * 0.42
            sao.append((CX + rad * math.cos(ang), CY + rad * math.sin(ang)))
        nd.polygon(sao, fill=(*loi, int(255 * e)))
    if du and t_gom > 0.95:
        g2 = glow.filter(ImageFilter.GaussianBlur(22))
        im.alpha_composite(g2)
        im.alpha_composite(glow.filter(ImageFilter.GaussianBlur(6)))
    elif not du:
        # 4 mảnh: nét sao mờ, đường thiếu chấm chấm
        for i in range(5):
            a, b = dinh(NET[i]), dinh(NET[i + 1])
            thieu = "mien" in (NET[i], NET[i + 1])
            if thieu:
                for j in range(0, 20, 2):
                    p = (a[0] + (b[0] - a[0]) * j / 20, a[1] + (b[1] - a[1]) * j / 20)
                    q = (a[0] + (b[0] - a[0]) * (j + 1) / 20, a[1] + (b[1] - a[1]) * (j + 1) / 20)
                    nd.line([p, q], fill=(120, 126, 160, 160), width=2)
            else:
                gd.line([a, b], fill=(*mau, 140), width=12)
                nd.line([a, b], fill=(*mau, 220), width=2)
        im.alpha_composite(glow.filter(ImageFilter.GaussianBlur(10)))
    im.alpha_composite(net)
    # các ô
    for s in SLOTS:
        x, y = (o_vi_tri(s, t_gom) if du else dinh(s))
        trang = s in co
        sang = ease((t - 1.0 - NET.index(s) * 0.1) / 0.3) if du else (0.5 if trang else 0)
        khung(im, bo_cfg, x, y, sang, 1.0)
        if trang:
            ic = icon(bo, s, 118)
            im.alpha_composite(ic, (int(x - 59), int(y - 59)))
        else:
            ImageDraw.Draw(im).text((x, y), "+", font=font(40), fill=(110, 116, 150), anchor="mm")
        ImageDraw.Draw(im).text((x, y + 76), f"Mảnh {TEN_O[s]}", font=font(15), fill=(200, 204, 228), anchor="mm")
    # lấp lánh sau khi sáng trọn
    if du and t > 1.6:
        lap = Image.new("RGBA", (W, H))
        ld = ImageDraw.Draw(lap)
        for i in range(14):
            ang = i * 2.399 + t * 0.3
            rad = 60 + (i * 37) % 230
            x, y = CX + rad * math.cos(ang), CY + rad * math.sin(ang)
            a = 0.5 + 0.5 * math.sin(t * 6 + i * 1.7)
            sz = 3 + 5 * a
            ld.line([(x - sz, y), (x + sz, y)], fill=(*loi, int(230 * a)), width=2)
            ld.line([(x, y - sz), (x, y + sz)], fill=(*loi, int(230 * a)), width=2)
        im.alpha_composite(lap.filter(ImageFilter.GaussianBlur(0.6)))
        im.alpha_composite(lap)
    # thẻ hiệu ứng bộ
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([W - 470, 30, W - 40, 114], 14, fill=(24, 26, 48), outline=(*mau, 160), width=2)
    d.text((W - 452, 42), f"{ten_bo} · {ten_sao}", font=font(18, True), fill=(*loi,))
    d.text((W - 452, 72), f"{min(so_manh, 5)}/5 mảnh   ·   2 món ✓   ·   4 món ✓", font=font(16), fill=(190, 196, 224))
    if du and t > 1.5:
        e = ease((t - 1.5) / 0.4)
        d.text((CX, 680), f"{ten_sao} sáng trọn", font=font(34, True), fill=(*loi, int(255 * e)), anchor="mm")
    elif not du:
        d.text((CX, 680), "4/5 mảnh: chòm sao sáng mờ, đường thiếu chấm chấm", font=font(22), fill=(170, 176, 210),
               anchor="mm")
    return im.convert("RGB")


os.makedirs(OUT, exist_ok=True)
# bảng phác: mỗi vì sao một hàng, 4 nhịp
nhip = [(0.2, 5, "1. Đủ mảnh thứ 5"), (0.75, 5, "2. Mảnh bay về đỉnh sao"), (1.25, 5, "3. Nối nét, lõi bùng"),
        (2.4, 5, "4. Sáng trọn, lấp lánh")]
tw, th = 640, 360
bang = Image.new("RGB", (tw * 4 + 50, (th + 40) * 3 + 20), (10, 11, 22))
db = ImageDraw.Draw(bang)
for r, bo_cfg in enumerate(BO):
    for c, (t, n, nhan) in enumerate(nhip):
        bang.paste(ve(bo_cfg, t, n).resize((tw, th), Image.LANCZOS), (10 + c * (tw + 10), 40 + r * (th + 40)))
        db.text((14 + c * (tw + 10), 12 + r * (th + 40)), f"{bo_cfg[2]} · {nhan}", font=font(20), fill=(220, 222, 240))
bang.paste(ve(BO[0], 0, 4).resize((tw, th), Image.LANCZOS), (10, 40 + 2 * (th + 40)))
db.text((14, 12 + 2 * (th + 40)), "Trạng thái 4/5 mảnh", font=font(20), fill=(220, 222, 240))
bang.paste(ve(BO[1], 0, 4).resize((tw, th), Image.LANCZOS), (20 + tw, 40 + 2 * (th + 40)))
bang.save(os.path.join(OUT, "phac-ghep-sao.png"))
# video: mỗi vì sao 3,2 giây
with tempfile.TemporaryDirectory() as tmp:
    k = 0
    for bo_cfg in BO:
        for f in range(int(3.2 * FPS)):
            ve(bo_cfg, f / FPS).save(os.path.join(tmp, f"{k:04d}.png"))
            k += 1
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(tmp, "%04d.png"),
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", os.path.join(OUT, "phac-ghep-sao.mp4")],
                   check=True)
print("xong", OUT)
