# Hậu kỳ texture Hạ Vy bản nhân vật chính, chạy sau reshape_face.py:
#   python paint_hero.py in.vrm out.vrm
# Thay texture tròng/điểm sáng mắt (paint_eyes_hero.py), thêm angel ring vào tóc,
# thêm viền vàng hoa văn + dải thêu bất đối xứng lên áo khoác.
import json, struct, sys, io, os, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__))
GOLD, GOLD_HI, GOLD_SH = (242, 162, 39), (255, 222, 140), (120, 70, 12)

def load(f):
    d = open(f, 'rb').read()
    jl = struct.unpack('<I', d[12:16])[0]
    j = json.loads(d[20:20 + jl])
    return j, d[28 + jl:]

def save(f, j, b):
    js = json.dumps(j, ensure_ascii=False, separators=(',', ':')).encode()
    js += b' ' * (-len(js) % 4)
    b += b'\0' * (-len(b) % 4)
    out = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(b))
    out += struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(b), 0x004E4942) + b
    open(f, 'wb').write(out)

def img_of(j, b, mat_name):
    for m in j['materials']:
        if mat_name in m['name']:
            t = m['pbrMetallicRoughness']['baseColorTexture']['index']
            s = j['textures'][t]['source']
            v = j['bufferViews'][j['images'][s]['bufferView']]
            o = v.get('byteOffset', 0)
            return s, Image.open(io.BytesIO(b[o:o + v['byteLength']])).convert('RGBA')
    raise KeyError(mat_name)

def rebuild(j, b, repl):
    views = j['bufferViews']
    img_view = {j['images'][s]['bufferView']: data for s, data in repl.items()}
    nb = bytearray()
    for i, v in enumerate(views):
        o = v.get('byteOffset', 0)
        data = img_view.get(i, b[o:o + v['byteLength']])
        nb += b'\0' * (-len(nb) % 4)
        v['byteOffset'] = len(nb)
        v['byteLength'] = len(data)
        nb += data
    j['buffers'][0]['byteLength'] = len(nb)
    return bytes(nb)

def png(im):
    f = io.BytesIO(); im.save(f, 'PNG', optimize=True); return f.getvalue()

def hair_ring(im):
    a = np.array(im).astype(np.float32)
    H, W = a.shape[:2]
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    v = yy / H
    c = 0.17 + 0.012 * np.sin(xx / W * 2 * math.pi * 9) + 0.006 * np.sin(xx / W * 2 * math.pi * 23)
    band = np.exp(-((v - c) / 0.028) ** 2)
    streak = 0.65 + 0.35 * np.sin(xx / W * 2 * math.pi * 31) ** 2
    k = (0.75 * band * streak)[..., None]
    a[..., :3] = a[..., :3] + (np.array([210, 236, 255]) - a[..., :3]) * k
    a[..., :3] *= (1 - 0.18 * np.clip((0.08 - v) / 0.08, 0, 1))[..., None]
    tip = np.clip((v - 0.8) / 0.2, 0, 1)[..., None]
    a[..., :3] = a[..., :3] + (np.array([120, 175, 255]) - a[..., :3]) * 0.35 * tip
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def filigree(d, x0, y0, x1, y1, step=46, vertical=False):
    # dải hoa văn cuộn: hai đường viền + dây cuộn chữ S + nụ hoa
    if vertical:
        w = x1 - x0
        d.rectangle((x0, y0, x0 + 5, y1), GOLD_SH); d.rectangle((x1 - 5, y0, x1, y1), GOLD_SH)
        d.rectangle((x0 + 1, y0, x0 + 3, y1), GOLD_HI); d.rectangle((x1 - 4, y0, x1 - 2, y1), GOLD_HI)
        cx = (x0 + x1) / 2
        pts = [(cx + (w * 0.28) * math.sin((y - y0) / step * math.pi), y) for y in range(y0, y1, 3)]
        d.line(pts, GOLD, 5)
        for k, y in enumerate(range(y0 + step // 2, y1, step)):
            s = 1 if k % 2 else -1
            bx = cx + s * w * 0.22
            d.ellipse((bx - 7, y - 7, bx + 7, y + 7), GOLD)
            d.ellipse((bx - 3, y - 5, bx + 2, y - 1), GOLD_HI)
            d.arc((bx - 16, y - 16, bx + 16, y + 16), 200 if s > 0 else -20, 340 if s > 0 else 120, GOLD, 3)
    else:
        h = y1 - y0
        d.rectangle((x0, y0, x1, y0 + 5), GOLD_SH); d.rectangle((x0, y1 - 5, x1, y1), GOLD_SH)
        d.rectangle((x0, y0 + 1, x1, y0 + 3), GOLD_HI); d.rectangle((x0, y1 - 4, x1, y1 - 2), GOLD_HI)
        cy = (y0 + y1) / 2
        pts = [(x, cy + (h * 0.26) * math.sin((x - x0) / step * math.pi)) for x in range(x0, x1, 3)]
        d.line(pts, GOLD, 4)
        for k, x in enumerate(range(x0 + step // 2, x1, step)):
            s = 1 if k % 2 else -1
            by = cy + s * h * 0.2
            d.ellipse((x - 6, by - 6, x + 6, by + 6), GOLD)
            d.ellipse((x - 3, by - 4, x + 1, by - 1), GOLD_HI)

def diamond(d, x, y, r):
    d.polygon([(x, y - r), (x + r * 0.7, y), (x, y + r), (x - r * 0.7, y)], GOLD_SH)
    d.polygon([(x, y - r + 3), (x + r * 0.7 - 3, y), (x, y + r - 3), (x - r * 0.7 + 3, y)], GOLD)
    d.polygon([(x, y - r + 6), (x + r * 0.3, y - 2), (x, y)], GOLD_HI)

def coat(im):
    S = im.size[0]; f = S / 2048
    lay = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    sc = lambda *v: [int(round(t * f)) for t in v]
    # viền nẹp vàng hai bên đường cài giữa (ngực -> gấu)
    for x in (990, 1046):
        x0, y0, x1, y1 = sc(x - 6, 600, x + 6, 1885)
        d.rectangle((x0, y0, x1, y1), GOLD_SH); d.rectangle((x0 + 2, y0, x1 - 2, y1), GOLD)
        d.rectangle((x0 + 3, y0, x0 + 5, y1), GOLD_HI)
    for y in range(1000, 1860, 110):
        diamond(d, *sc(1018, y), 14 * f)
    # bất đối xứng: dải thêu hoa văn dọc chỉ ở vạt trái, từ vai xuống gấu
    filigree(d, *sc(812, 440, 870, 1880), step=int(54 * f), vertical=True)
    # đường vàng ở eo + khóa thắt lưng lệch phải
    filigree(d, *sc(380, 918, 1670, 950), step=int(40 * f))
    bx, by = sc(1180, 934)
    d.rounded_rectangle((bx - 34 * f, by - 30 * f, bx + 34 * f, by + 30 * f), 8 * f, GOLD_SH)
    d.rounded_rectangle((bx - 28 * f, by - 24 * f, bx + 28 * f, by + 24 * f), 6 * f, GOLD)
    d.ellipse((bx - 13 * f, by - 13 * f, bx + 13 * f, by + 13 * f), (127, 224, 255, 255))
    d.ellipse((bx - 8 * f, by - 10 * f, bx - 1 * f, by - 4 * f), (240, 255, 255, 255))
    # hoa văn trên dải gấu vàng: thêm dải cuộn mảnh phía trên
    filigree(d, *sc(380, 1800, 1670, 1840), step=int(48 * f))
    # cổ tay áo: dải cuộn trên viền vàng
    filigree(d, *sc(112, 0, 196, 418), step=int(44 * f), vertical=True)
    filigree(d, *sc(1852, 0, 1936, 418), step=int(44 * f), vertical=True)
    sh = lay.split()[3].filter(ImageFilter.GaussianBlur(3 * f))
    shadow = Image.new('RGBA', im.size, (10, 12, 40, 0)); shadow.putalpha(sh.point(lambda a: a * 0.55))
    out = im.copy()
    out.alpha_composite(shadow, (int(2 * f), int(3 * f)))
    a = np.array(lay); a[..., 3] = np.where(np.array(im)[..., 3] > 0, a[..., 3], 0)
    out.alpha_composite(Image.fromarray(a))
    return out

if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    j, b = load(src)
    repl = {}
    s, _ = img_of(j, b, 'EyeIris'); repl[s] = png(Image.open(os.path.join(HERE, 'havy_hero_eye_iris.png')))
    s, _ = img_of(j, b, 'EyeHighlight'); repl[s] = png(Image.open(os.path.join(HERE, 'havy_hero_eye_highlight.png')))
    s, im = img_of(j, b, 'N00_000_Hair_00_HAIR'); repl[s] = png(hair_ring(im))
    s, im = img_of(j, b, 'Tops_01_CLOTH'); c = coat(im); repl[s] = png(c)
    if len(sys.argv) > 3:
        c.convert('RGB').resize((768, 768)).save(sys.argv[3])
    b = rebuild(j, b, repl)
    save(dst, j, b)
    print('ok', dst)
