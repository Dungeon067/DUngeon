"""Thiết kế hình ảnh theo id vũ khí (S23: content/weapons.yaml). Id không có ở đây dùng mặc định theo loại.

Cảm hứng lấy từ truyện ngắn của từng vũ khí và docs/world: Đảo Lạc (trống đồng, chim Lạc, tre, đồng hun),
Shizukane (thép tôi, hoa lan băng, tuyết), Khokhtal (cung sừng, bờm ngựa giông), Golbaran (men xanh, nhà băng, hoa lựu),
Marevia (chuông đồng, lò lửa), Lũng Vân (nghiên đá, mây, trúc). 5★ cầu kỳ và phát sáng, 4★ vừa phải, 3★ đơn giản.
"""

ELEM_GLOW = {"fire": "#ff7a2a", "water": "#3fb4ff", "wind": "#4cf0c0", "bolt": "#b47bff", "earth": "#ffc04a",
             "ice": "#9be8ff"}
PLAIN = dict(glow="#ffffff", glow_strength=0)

DESIGNS = {
    # ---------------- 5★ giới hạn
    "thien-loi-pha-tran": dict(
        r=5, type="spear", steel="#5d5f6e", edge="#e6e2f4", glow="#b47bff", gold="#c9a35a", cavity="#1d1430",
        blade_motif="veins", motif_col="#d9c3ff", motif_glow=6.0, fuller_glow=5.0, shaft_col="#16121f",
        shaft_col2="#3b2f55", crack_glow=6.0, tassel="#2a1838", gem="#c99bff", glow_strength=7, wings=True),
    "tuyet-lac-vo-thanh": dict(
        r=5, type="sword", single_edge=True, steel="#6f7d8c", edge="#eef7ff", curve=0.05, length=1.05, width=0.05,
        hamon_glow=9.0, glow="#8fe1ff", gold="#c7d3df", cavity="#2a3440", guard="tsuba", wrap="#dce8f2",
        grip_core="#22313f", wrap_turns=9, ice_orchids=True, tassel="#8fc9e8", glow_strength=6),
    "doa-hong-ngu-trong-bang": dict(r=5, type="cat", form="iceflower", glow="#bfe8ff", gold="#d9a84a", flower="#d8243a",
                                    angle=0, yaw=25, roll=12),
    "phong-dinh-vo-cuc": dict(
        r=5, type="spear", head=0.42, head_w=0.07, steel="#8a93a6", edge="#f6f8ff", glow="#9fe8ff", gold="#d0d8e4",
        cavity="#2a3040", blade_motif="veins", motif_col="#e0f4ff", motif_glow=4.0, fuller_glow=4.0,
        shaft_col="#e8eef4", shaft_col2="#9aa8b8", crack_glow=2.5, tassel="#cfe4f2", gem="#bff0ff", glow_strength=6),
    "vo-sam-thao-nguyen": dict(r=5, type="bow", limb="#3a2a20", limb_dark="#120a06", glow="#b47bff", gold="#d8b060",
                               wrap="#5a2a1a", feathers="#2a2028", string="#e0c8ff", string_glow=2.5, glow_strength=7,
                               recurve=0.09),
    "chuong-lua-van-nien": dict(
        r=5, type="great", steel="#6e5f50", edge="#f4e2c0", glow="#ffb040", gold="#e0a040", cavity="#3a2010",
        blade_motif="veins", motif_col="#ffcf7a", motif_glow=6.0, fuller_glow=5.0, guard="bell", guard_span=0.17,
        gem="#ffb040", wrap="#4a2a14", glow_strength=7),
    "thuy-mac-van-thien": dict(r=5, type="cat", form="inkstone", stone="#2e4a44", glow="#7af0d8", gold="#c9a35a",
                               angle=20, yaw=40, roll=35),
    # ---------------- 5★ thường trú
    "hong-vu-truong-ca": dict(
        r=5, type="sword", steel="#5e626c", edge="#e9e4da", curve=0.02, length=1.0, width=0.07, blade_motif="feather",
        motif_col="#e3a446", motif_glow=7.0, fuller_glow=4.0, glow="#ff6a2a", gold="#e6a64a", cavity="#3a1a0c",
        guard="lac_bird", guard_span=0.27, wrap="#5c1212", pommel="drum", gem="#ff3b1f", tassel="#c8302a",
        glow_strength=8),
    "ban-thach-tran-son": dict(r=5, type="great", steel="#7a7466", edge="#e0dccc", glow="#ffd27a", gold="#b8a070",
                               cavity="#2a2a20", blade_motif="veins", motif_col="#d8d0a0", motif_glow=3.5,
                               guard="bar", guard_span=0.22, gem="#ffd27a", wrap="#3a3428", tassel="#8a7a50"),
    "kinh-thuy-luu-nguyet": dict(r=5, type="cat", form="bell", metal="#cdd6e0", glow="#9ad8ff", gold="#c0c8d0",
                                 angle=15),
    "ngu-phong-truy-van": dict(r=5, type="bow", limb="#a8b878", limb_dark="#4a5a2a", glow="#bfe8ff", gold="#e0e6f0",
                               wrap="#3a5a8a", string_glow=1.8, glow_strength=6),
    # ---------------- 4★ Lò Rèn
    "loi-the-bai-sao": dict(r=4, type="sword", steel="#4e5058", edge="#d8d6d0", glow="#ffcf7a", gold="#9a7a50",
                            fuller_glow=1.5, guard="bar", wrap="#3a2418"),
    "tieng-trong-dinh-lang": dict(r=4, type="great", steel="#7a5a3a", edge="#e0c8a0", glow="#ffb060", gold="#a86a30",
                                  guard="sun", guard_span=0.17, wrap="#2a1a10", glow_strength=2),
    "den-canh-hai-dang": dict(r=4, type="cat", form="lantern", paper="#ffd27a", paper_glow=3.0, glow="#ffd27a",
                              gold="#5a5a60", cavity="#1a1a1e", tassel="#3a5a7a", angle=10),
    "manh-trang-ben-cu": dict(r=4, type="bow", limb="#b8a868", limb_dark="#5a4a20", glow="#e8f0ff", gold="#9a8a60",
                              wrap="#3a4a5a", string_glow=0.6, recurve=0.0),
    "gio-bac-trai-bac": dict(r=4, type="spear", steel="#6a6c74", edge="#e0dccc", glow="#ffc070", gold="#a87a44",
                             shaft_col="#3a2414", shaft_col2="#5a3820", crack_glow=0.0, fuller_glow=0.8, tassel="#8a2a20",
                             glow_strength=1),
    # ---------------- 4★ Ước nguyện
    "suong-som-ben-song": dict(r=4, type="sword", steel="#8aa0b4", edge="#f0f8ff", glow="#b8e8ff", gold="#b8c4d0",
                               fuller_glow=2.0, guard="bar", wrap="#2a3a4a", width=0.045, length=1.0),
    "khuc-hat-nguoi-keo-luoi": dict(r=4, type="great", steel="#7a8a98", edge="#eef4f8", glow="#5ab4ff",
                                    gold="#8a7050", blade_motif="feather", motif_col="#bcd8f0", motif_glow=1.2,
                                    width=0.16, guard="bar", guard_span=0.17, wrap="#8a7a5a"),
    "bong-trang-ho-guong": dict(r=4, type="cat", form="pendant", jade="#cfe8e4", core=0.6, glow="#e0fff8",
                                gold="#d0b070", cord="#3a5a8a", angle=0),
    "tieng-sam-dau-mua": dict(r=4, type="bow", wood=False, steel="#2e3038", edge="#c8c0e0", glow="#b47bff",
                              gold="#6a6478", fuller_glow=1.2, wrap="#1e1a2a", string="#d8c8ff", string_glow=1.5),
    "mach-ngoc-long-chao": dict(r=4, type="spear", steel="#3a8a6a", edge="#cff4e4", glow="#6ae0b0", gold="#b0a070",
                                shaft_col="#3a2a1a", shaft_col2="#5a4024", crack_glow=0.0, fuller_glow=2.0,
                                tassel="#2a6a50"),
    # ---------------- 3★ (thép trơn, không phát sáng)
    "kiem-sat-lu-khach": dict(r=3, type="sword", steel="#7a7e84", edge="#d8d8d8", gold="#7a6a58", cavity="#2a2420",
                              guard="bar", wrap="#8a7a5a", width=0.065, **PLAIN),
    "dai-kiem-xom-mo": dict(r=3, type="great", steel="#6a6a68", edge="#c8c8c0", gold="#5a5048", guard="bar",
                            guard_span=0.15, wrap="#30281e", width=0.15, **PLAIN),
    "vo-chep-thay-do": dict(r=3, type="cat", form="book", cover="#b89a6a", gold="#6a5a40", points=4, angle=10,
                            glow="#ffe2a0", glow_strength=0.5),
    "cung-tre-dau-lang": dict(r=3, type="bow", limb="#c0a868", limb_dark="#6a5428", gold="#6a5a48", wrap="#8a7a5a",
                              string_glow=0.0, recurve=0.0, half=0.5, **PLAIN),
    "thuong-go-lim": dict(r=3, type="spear", steel="#767880", edge="#d0d0d0", gold="#6a6058", shaft_col="#3a2a1a",
                          shaft_col2="#4a3824", crack_glow=0.0, **PLAIN),
}

# Id trước S23 (content/economy.yaml cũ) → id S23 cùng vai trò, để pipeline chạy được trên cả hai.
ALIASES = {
    "thien-van-toa-nguyet": "doa-hong-ngu-trong-bang", "hoa-roi-tren-song": "phong-dinh-vo-cuc",
    "phong-tieu-du-ca": "vo-sam-thao-nguyen", "tram-sa-hoang-kim": "chuong-lua-van-nien",
    "nghien-mac-thu-lam": "thuy-mac-van-thien", "bang-lan-kiem": "tuyet-lac-vo-thanh",
    "dai-kiem-bia-co": "ban-thach-tran-son", "chuong-bac-ho-sau": "kinh-thuy-luu-nguyet",
    "cung-dinh-may": "ngu-phong-truy-van", "thuong-may-giong": "thien-loi-pha-tran",
    "kiem-thep-lang-ren": "loi-the-bai-sao", "dai-kiem-dong-hun": "tieng-trong-dinh-lang",
    "den-phap-pho-co": "den-canh-hai-dang", "cung-tre-ven-song": "manh-trang-ben-cu",
    "thuong-go-lim": "gio-bac-trai-bac", "kiem-suong-som": "suong-som-ben-song",
    "dai-kiem-song-bac": "khuc-hat-nguoi-keo-luoi", "ngoc-boi-ho-trang": "bong-trang-ho-guong",
    "cung-dem-set": "tieng-sam-dau-mua", "thuong-mo-ngoc": "mach-ngoc-long-chao",
    "kiem-sat-tuan-tra": "kiem-sat-lu-khach", "dai-kiem-tho-da": "dai-kiem-xom-mo", "sach-hoc-tro": "vo-chep-thay-do",
    "cung-san": "cung-tre-dau-lang", "thuong-linh-gac": "thuong-go-lim",
}


def design_for(w):
    d = DESIGNS.get(w["id"])
    if not d or d.get("r") != w["r"]:
        d = DESIGNS.get(ALIASES.get(w["id"], "")) or d
    if d:
        return dict(d)
    glow = ELEM_GLOW.get(w.get("el") or "", "#ffd27a")
    return dict(type=w["loai"], steel="#8c9098", glow=glow)
