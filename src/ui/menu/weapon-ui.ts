/** Thành phần giao diện vũ khí dùng chung (S24): ô lưới, thẻ chi tiết, so sánh chỉ số. */
import { fmt } from "../../core/util";
import { WEAP, byId } from "../../data/content";
import { ECON } from "../../data/economy";
import type { Weapon } from "../../data/economy-schema";
import { lvCapOf, passiveLevels, weaponStats, type WeaponInst } from "../../economy/weapons";
import { Server, holders, wDef } from "../../server/server";
import { h, lootCard, stars, tag, type LootRarity } from "../ds";
import { portrait } from "../../art/chibi";
import { icon } from "../icons/icons";
import { weaponImg } from "../weapon-art";
import "./weapons.css";

export const SUB_NAME: Record<Weapon["phu"]["loai"], string> = {
  chiMang: "Tỉ lệ chí mạng",
  satThuongChiMang: "Sát thương chí mạng",
  tanCong: "Tấn công",
};
export const TYPE_NAME = (t: string) => WEAP[t]?.vi ?? t;
export const pct = (v: number, d = 1) => `${(v * 100).toFixed(d).replace(/\.0$/, "")}%`;

export const defOf = (w: WeaponInst) => wDef(w.id)!;
export const holderOf = (uid: string) => holders(Server.P)[uid] ?? null;

/** Chân dung nhỏ tròn của nhân vật (góc thẻ đồ). */
export function miniPortrait(id: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 48;
  c.getContext("2d")!.drawImage(portrait(id, 48, 48, "head"), 0, 0);
  return c;
}

/** Thẻ vũ khí trong lưới (thẻ đồ S24b): ảnh trên nền độ hiếm, R góc trái, khóa và người đang cầm góc phải, dải "Cấp". */
export function weaponCell(w: WeaponInst, o: { selected?: boolean; picked?: boolean; disabled?: boolean } = {}) {
  const d = defOf(w),
    who = holderOf(w.uid);
  const b = lootCard({
    rarity: d.r as LootRarity,
    art: weaponImg(w.id, 128),
    label: `Cấp ${w.lv}`,
    refine: w.tl,
    locked: w.lock,
    holder: who ? miniPortrait(who) : null,
    selected: o.selected,
    picked: o.picked,
    disabled: o.disabled,
    ariaLabel: `${d.ten}, ${d.r} sao, cấp ${w.lv}, R${w.tl}${w.lock ? ", đã khóa" : ""}${who ? `, ${byId[who]?.name} đang dùng` : ""}`,
  });
  b.classList.add("tt-wcell");
  b.dataset.uid = w.uid;
  b.dataset.id = w.id;
  return b;
}

/** Các dòng chỉ số của một vũ khí ở cấp hiện tại. */
export function statRows(w: Pick<WeaponInst, "id" | "lv" | "tl">) {
  const d = wDef(w.id)!,
    s = weaponStats(w, ECON);
  const rows: [string, string][] = [["Tấn công", "+" + pct(s.tanCong)]];
  if (s.phu.giaTri > 0) rows.push([SUB_NAME[s.phu.loai], "+" + pct(s.phu.giaTri)]);
  return { d, s, rows };
}

/** Thẻ chi tiết vũ khí: ảnh lớn, tên, độ hiếm, cấp, R, chỉ số, bị động 5 bậc (bậc hiện tại sáng), truyện. */
export function weaponCard(w: WeaponInst, actions: HTMLElement[] = []) {
  const { d, rows } = statRows(w);
  const cap = lvCapOf(w, ECON);
  const who = holderOf(w.uid);
  const pv = passiveLevels(d, ECON);
  return h("article", { class: "tt-wcard", "data-r": d.r, "data-uid": w.uid, "data-id": w.id }, [
    h("div", { class: "hero tt-loot-hero", "data-r": d.r }, [weaponImg(w.id, 512, d.ten)]),
    h("div", { class: "body" }, [
      h("p", { class: "tt-eyebrow" }, [`${TYPE_NAME(d.loai)} · ${nguonName(d)}`]),
      h("h3", { class: "tt-h2 name" }, [d.ten]),
      h("div", { class: "tt-row meta" }, [
        stars(d.r, 15),
        h("b", { class: "lvl" }, [`Cấp ${w.lv}/${cap}`]),
        h("b", { class: "ref" }, [`Tinh luyện R${w.tl}`]),
        w.lock ? tag("Đã khóa", "warn") : null,
        who ? tag(`${byId[who]?.name} đang dùng`, "ok") : null,
      ]),
      h(
        "dl",
        { class: "tt-stats" },
        rows.flatMap(([k, v]) => [h("dt", {}, [k]), h("dd", {}, [v])]),
      ),
      h("div", { class: "passive" }, [
        h("h4", { class: "tt-h4" }, [d.biDong.ten]),
        h(
          "ol",
          { class: "tt-wpass", "aria-label": "Bị động theo bậc tinh luyện" },
          pv.map((v, i) =>
            h("li", { class: i + 1 === w.tl ? "is-on" : "", "aria-current": i + 1 === w.tl ? "true" : undefined }, [
              h("b", {}, [`R${i + 1}`]),
              ` Tăng ${pct(v)} sát thương gây ra`,
              stackNote(d, v),
            ]),
          ),
        ),
      ]),
      h("p", { class: "tt-story" }, [storyOf(d)]),
      actions.length ? h("div", { class: "tt-row actions" }, actions) : null,
    ]),
  ]);
}

/** Phần mô tả tầng của bị động tích tầng, theo giá trị bị động `v` ở cùng bậc R. */
export function stackNote(d: Weapon, v: number) {
  const c = d.biDong.coChe;
  if (!c) return "";
  const k = d.biDong.satThuong > 0 ? v / d.biDong.satThuong : 1;
  return `; cứ ${c.giay} giây không bị đánh thêm 1 tầng Lặng Gió (tối đa ${c.toiDa}), mỗi tầng +${pct(c.moiTang * k)}, bị đánh mất 1 tầng`;
}

export function nguonName(d: Weapon) {
  return {
    gioiHan: "Binh Khí Tinh Tú",
    thuongTru: "Ước nguyện thường trú",
    loRen: "Lò Rèn",
    uocNguyen: "Ước nguyện",
    cuaHangTuan: "Cửa hàng tuần",
    suKien: "Sự kiện",
  }[d.nguon];
}
/** Truyện ngắn: S23 sẽ bổ sung vào content; tạm dùng mô tả dựng từ dữ liệu sẵn có. */
export function storyOf(d: Weapon & { truyen?: string }) {
  if (d.truyen) return d.truyen;
  const owner = d.cua ? byId[d.cua] : null;
  if (owner)
    return `Binh khí gắn với ${owner.name}, ${owner.title.toLowerCase()}. Câu chuyện đầy đủ sẽ được ghi lại sau.`;
  return `Một ${TYPE_NAME(d.loai).toLowerCase()} lưu lạc qua nhiều đời Hộ Tinh. Câu chuyện đầy đủ sẽ được ghi lại sau.`;
}

/** Bảng so sánh: giá trị mới, chênh lệch xanh (tăng) hoặc đỏ (giảm). */
export function compareRows(rows: { k: string; a: number; b: number; f: (v: number) => string }[]) {
  return h(
    "dl",
    { class: "tt-stats tt-compare" },
    rows.flatMap(({ k, a, b, f }) => {
      const diff = b - a,
        cls = Math.abs(diff) < 1e-9 ? "" : diff > 0 ? "up" : "down";
      return [
        h("dt", {}, [k]),
        h("dd", {}, [
          f(b),
          cls ? h("span", { class: `d ${cls}` }, [`${diff > 0 ? "▲ +" : "▼ "}${f(diff).replace(/^\+/, "")}`]) : null,
        ]),
      ];
    }),
  );
}
export const fmtInt = (v: number) => fmt(Math.round(v));

export type WSort = "lv" | "r" | "tl";
export function sortWeapons(list: WeaponInst[], sort: WSort) {
  const key = (w: WeaponInst) => {
    const d = wDef(w.id)!;
    return sort === "lv" ? [w.lv, d.r, w.tl] : sort === "tl" ? [w.tl, d.r, w.lv] : [d.r, w.lv, w.tl];
  };
  return [...list].sort((a, b) => {
    const ka = key(a),
      kb = key(b);
    for (let i = 0; i < 3; i++) if (ka[i] !== kb[i]) return kb[i]! - ka[i]!;
    return a.id.localeCompare(b.id) || a.uid.localeCompare(b.uid);
  });
}
export function filterWeapons(list: WeaponInst[], f: { type: string; r: number; eq: "all" | "on" | "off" }) {
  return list.filter((w) => {
    const d = wDef(w.id)!,
      on = !!holderOf(w.uid);
    return (
      (f.type === "all" || d.loai === f.type) && (!f.r || d.r === f.r) && (f.eq === "all" || (f.eq === "on") === on)
    );
  });
}
