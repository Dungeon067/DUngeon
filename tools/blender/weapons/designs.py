"""Thiết kế hình ảnh theo id vũ khí (màu, hoa văn, chi tiết). Id không có ở đây dùng mặc định theo loại và độ hiếm.

Nguồn cảm hứng theo docs/world: Đảo Lạc (trống đồng, chim Lạc, sóng, mây), Shizukane (thép tôi, hoa lan băng),
Khokhtal (thảo nguyên, giông, tua lông ngựa), Golbaran (men xanh, mái vòm), Lũng Vân (mây, bút lông), Marevia (lò rèn, đá trắng).
"""

ELEM_GLOW = {"fire": "#ff7a2a", "water": "#3fb4ff", "wind": "#4cf0c0", "bolt": "#b47bff", "earth": "#ffc04a",
             "ice": "#9be8ff"}

DESIGNS = {
    # Lạc Hồng, Hỏa, Đảo Lạc: kiếm lưỡi cong nhẹ, chắn tay hai cánh chim Lạc, mặt trống đồng, vân lông vũ lửa.
    "hong-vu-truong-ca": dict(
        type="sword", steel="#5e626c", edge="#e9e4da", curve=0.02, length=1.0, width=0.07, blade_motif="feather",
        motif_col="#e3a446", motif_glow=7.0, fuller_glow=4.0, glow="#ff6a2a", gold="#e6a64a", cavity="#3a1a0c",
        guard="lac_bird", guard_span=0.27, wrap="#5c1212", pommel="drum", gem="#ff3b1f", tassel="#c8302a", glow_strength=8),
    # Lôi Đình, Lôi, Khokhtal: thương cán đá sét nứt sáng, họng khắc mây, tua lông ngựa sẫm.
    "thien-loi-pha-tran": dict(
        type="spear", steel="#5d5f6e", edge="#e6e2f4", glow="#b47bff", gold="#c9a35a", cavity="#1d1430",
        blade_motif="veins", motif_col="#d9c3ff", motif_glow=6.0, fuller_glow=5.0, shaft_col="#16121f",
        shaft_col2="#3b2f55", crack_glow=6.0, tassel="#2a1838", gem="#c99bff", glow_strength=7),
    # Tuyết Lan, Băng, Shizukane: lưỡi một cạnh cong, vân tôi sáng lạnh, hoa lan băng nở dọc sống kiếm.
    "tuyet-lac-vo-thanh": dict(
        type="sword", single_edge=True, steel="#6f7d8c", edge="#eef7ff", curve=0.05, length=1.05, width=0.05,
        hamon_glow=9.0, glow="#8fe1ff", gold="#c7d3df", cavity="#2a3440", guard="tsuba", wrap="#dce8f2",
        grip_core="#22313f", wrap_turns=9, ice_orchids=True, tassel="#8fc9e8", glow_strength=6),
}
# Tạm thời: id hiện có trong content trước khi S23 đổi tên.
ALIASES = {"thuong-may-giong": "thien-loi-pha-tran", "bang-lan-kiem": "tuyet-lac-vo-thanh"}


def design_for(w):
    d = DESIGNS.get(w["id"]) or DESIGNS.get(ALIASES.get(w["id"], ""))
    if d:
        return dict(d)
    glow = ELEM_GLOW.get(w.get("el") or "", "#ffd27a")
    return dict(type=w["loai"], steel="#8c9098", glow=glow)
