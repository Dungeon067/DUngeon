import { GS } from "../../core/state";
import { TAU, dist } from "../../core/util";
import { EL } from "../../data/content";
import { KITS, STATUS } from "../../data/kits";
import type { Block, StsRef } from "../../data/kit-schema";
import { fxBurst, fxParticles, fxRing, fxSlash, fxText, later } from "../../entities/fx";
import { cur } from "../../entities/party";
import { charFx, shake } from "../feel";
import { hitEnemy } from "../damage";
import { jumpPhysics } from "../jump";
import { addStatus, hnOf, ttOf } from "../status";
import { moveC } from "../../world/collision";
import { pulseElement } from "../../world/puzzles";
import { hooksOf, type Ctx } from "./hooks";

/* Khối chiêu dùng chung (S30): mỗi khối nhận tham số từ content/kits/<id>.yaml. */

export const elOf = (b: { el?: string }, m: any): string | null => (b.el === "vatLy" ? null : (b.el ?? m.c.el));
const EL_STATS = new Set(["giamKhang", "satThuongNguyenTo"]);
const valOf = (r: StsRef, m: any) =>
  r.theo ? r.v * (r.theo === "atk" ? m.st.atk : r.theo === "hp" ? m.maxHp : ttOf(m)) : r.v;
const stsEl = (r: StsRef, b: { el?: string }, c: Ctx) => {
  if (r.el === "hut") return c.hut ?? null;
  if (r.el) return r.el;
  return EL_STATS.has(STATUS[r.id]!.chiSo) ? (elOf(b, c.m) ?? "vatLy") : null;
};

export function applyDebuffs(e: any, b: { sts: StsRef[]; el?: string }, c: Ctx) {
  for (const r of b.sts) {
    if (STATUS[r.id]!.loai !== "debuff" || e.dead) continue;
    if (r.el === "hut" && !c.hut) continue;
    addStatus(e, r.id, { v: valOf(r, c.m), t: r.t, el: stsEl(r, b, c) });
  }
}
export function applyBuffs(sts: StsRef[], b: { el?: string }, c: Ctx) {
  for (const r of sts) {
    if (STATUS[r.id]!.loai !== "buff") continue;
    if (r.el === "hut" && !c.hut) continue;
    const party = GS.G.party.filter((pm: any) => pm.alive);
    const to =
      r.doi === "doi"
        ? party
        : r.doi === "dongDoi"
          ? party.filter((pm: any) => pm !== c.m)
          : r.doi === "dangDanh"
            ? [cur()]
            : [c.m];
    const v = valOf(r, c.m),
      el = stsEl(r, b, c);
    for (const pm of to) if (pm) addStatus(pm, r.id, { v, t: r.t, el });
  }
}
export function hitB(e: any, b: any, c: Ctx, mult = b.m, o: any = {}) {
  const d = hitEnemy(e, c.m, mult, elOf(b, c.m), { cast: c.cast, kb: b.kb, normal: c.normal, ...o });
  applyDebuffs(e, b, c);
  return d;
}
/** Hiệu ứng 3D riêng của chiêu (vẽ ở src/render3d/kit-fx.ts). */
/** Thời lượng hiển thị riêng của một số hiệu ứng (chỉ phần vẽ). */
const FX_LIFE: Record<string, number> = { songBac: 1.4 };
export function kfx(id: string | undefined, c: Ctx, x: number, y: number, r: number, life = 0.6, extra: any = {}) {
  if (!id) return;
  life = FX_LIFE[id] ?? life;
  const K = KITS[c.m.c.id];
  GS.G.fx.push({
    k: "kfx",
    id,
    who: c.m.c.id,
    x,
    y,
    r,
    ang: c.ang,
    col: K?.mau.c ?? "#fff",
    c2: K?.mau.c2 ?? "#fff",
    life,
    max: life,
    ...extra,
  });
}

export function runBlocks(bs: Block[] | undefined, c: Ctx) {
  for (const b of bs ?? []) {
    const go = () => {
      for (let i = 0; i < b.lap; i++) {
        if (i === 0) runBlock(b, c);
        else later(i * b.cach, () => runBlock(b, c));
      }
    };
    if (b.tre) later(b.tre, go);
    else go();
  }
}

export function runBlock(b: Block, c: Ctx) {
  const p = GS.G.p,
    m = c.m,
    el = elOf(b, m),
    F = charFx(m.c.id),
    col = el ? EL[el]!.c : F.c2;
  switch (b.k) {
    case "chem": {
      const cx = c.x + Math.cos(c.ang) * b.xa,
        cy = c.y + Math.sin(c.ang) * b.xa,
        half = (b.goc / 360) * Math.PI;
      if (b.goc >= 300) fxRing(cx, cy - 12, b.r, col, 0.4, 8);
      else fxSlash(cx, cy - 16, c.ang, b.r, col, m.c.w, F.trail, F.c2);
      fxParticles(cx, cy - 12, F, 10, 200);
      kfx(b.fx, c, cx, cy, b.r);
      pulseElement(cx, cy, b.r, el);
      for (const e of GS.G.enemies) {
        if (e.dead) continue;
        const d = dist(cx, cy, e.x, e.y);
        if (d > b.r + e.r) continue;
        if (half < Math.PI && d > e.r + 10) {
          let da = Math.atan2(e.y - cy, e.x - cx) - c.ang;
          while (da > Math.PI) da -= TAU;
          while (da < -Math.PI) da += TAU;
          if (Math.abs(da) > half) continue;
        }
        if (b.m > 0) hitB(e, b, c, b.m, { ang: Math.atan2(e.y - cy, e.x - cx), kb: b.kb ?? 90 });
        else applyDebuffs(e, b, c);
      }
      if (b.m >= 1.5) shake("skill");
      return;
    }
    case "ban": {
      for (let i = 0; i < b.n; i++) {
        const off = b.n > 1 ? ((i / (b.n - 1) - 0.5) * b.toa * Math.PI) / 180 : 0,
          a = c.ang + off;
        if (b.cao) {
          let tx = c.x + Math.cos(a) * 160,
            ty = c.y + Math.sin(a) * 160;
          const near = GS.G.enemies
            .filter((e: any) => !e.dead && dist(tx, ty, e.x, e.y) < 260)
            .sort((u: any, v: any) => dist(tx, ty, u.x, u.y) - dist(tx, ty, v.x, v.y));
          const tg = near[i % Math.max(1, near.length)];
          if (tg) {
            tx = tg.x + (b.n > 1 ? Math.cos(a * 7) * 30 : 0);
            ty = tg.y + (b.n > 1 ? Math.sin(a * 7) * 20 : 0);
          }
          kfx("roiCao", c, tx, ty, b.r * 4, b.song, { sx: c.x, sy: c.y, skin: b.kind });
          later(b.song + i * 0.08, () => {
            const cc = { ...c, x: tx, y: ty };
            if (b.m > 0)
              for (const e of GS.G.enemies) if (!e.dead && dist(tx, ty, e.x, e.y) < b.r * 4 + e.r) hitB(e, b, cc);
            runBlocks(b.no as Block[] | undefined, cc);
          });
          continue;
        }
        GS.G.projs.push({
          own: "p",
          x: c.x + Math.cos(a) * 14,
          y: c.y - 16 + Math.sin(a) * 14,
          vx: Math.cos(a) * b.toc,
          vy: Math.sin(a) * b.toc,
          r: b.r,
          life: b.song,
          m,
          mult: b.m,
          el,
          kind: b.kind === "arrow" || b.kind === "flower" || b.kind === "spear" ? "arrow" : "orb",
          skin: b.kind,
          home: b.duoi,
          xuyen: b.xuyen ? new Set() : null,
          nay: b.nay,
          cast: c.cast,
          onHit: (e: any, x: number, y: number) => {
            applyDebuffs(e, b, c);
            runBlocks(b.no as Block[] | undefined, { ...c, x, y: y + 16 });
          },
          onMiss: b.cam
            ? (x: number, y: number) => runBlocks(b.no as Block[] | undefined, { ...c, x, y: y + 16 })
            : null,
        });
      }
      return;
    }
    case "lao": {
      const dir = b.lui ? -1 : 1;
      p.dashT = b.t;
      p.dvx = Math.cos(c.ang) * (b.quang / b.t) * dir;
      p.dvy = Math.sin(c.ang) * (b.quang / b.t) * dir;
      p.iframes = Math.max(p.iframes, b.t + 0.15);
      if (b.m > 0) {
        p.dashHit = {
          set: new Set(),
          m,
          mult: b.m,
          el,
          cast: c.cast,
          r: b.r,
          onHit: (e: any) => applyDebuffs(e, b, c),
        };
        fxSlash(p.x, p.y - 16, c.ang, 90, col, "great", F.trail, F.c2);
      }
      kfx(b.fx ?? (b.m > 0 ? "laoVet" : undefined), c, c.x, c.y, b.quang, 0.4);
      return;
    }
    case "vung": {
      const x = c.x + Math.cos(c.ang) * b.xa,
        y = c.y + Math.sin(c.ang) * b.xa;
      GS.G.fields.push({
        k: "kvung",
        fxId: b.fx,
        col,
        c2: KITS[m.c.id]?.mau.c2,
        x,
        y,
        r: b.r,
        el,
        m,
        life: b.t,
        max: b.t,
        tick: 0,
        ti: b.ti,
        mult: b.m,
        cast: c.cast,
        pull: b.keo,
        follow: b.theo,
        vx: Math.cos(c.ang) * b.troi,
        vy: Math.sin(c.ang) * b.troi,
        hut: b.hut,
        hutEl: null,
        onHit: (f: any, e: any, au: string | null = e.aura) => {
          if (f.hut && !f.hutEl && au && au !== "wind" && au !== "earth") {
            f.hutEl = au;
            f.col = EL[au]!.c;
            fxText(f.x, f.y - 60, `Hút ${EL[au]!.vi ?? ""}`.trim(), EL[au]!.c, 14);
            applyBuffs(b.sts, b, { ...c, hut: au });
          }
          applyDebuffs(e, b, { ...c, hut: f.hutEl });
          hooksOf(m).onVungHit?.(f, e);
          if (f.hutEl) hitEnemy(e, m, b.m * 0.5, f.hutEl, { cast: c.cast, noKb: true, noEnergy: true });
        },
      });
      if (!b.hut) applyBuffs(b.sts, b, c);
      return;
    }
    case "trieu": {
      const mine = GS.G.turrets.filter((t: any) => t.m === m && t.tag === b.tag);
      const drop = mine.length + b.soLuong - b.toiDa;
      for (let i = 0; i < drop; i++) mine[i]!.life = 0;
      const nx = -Math.sin(c.ang),
        ny = Math.cos(c.ang);
      for (let i = 0; i < b.soLuong; i++) {
        const o = b.soLuong > 1 ? (i - (b.soLuong - 1) / 2) * b.xa : 0;
        const x = c.x + Math.cos(c.ang) * (b.soLuong > 1 ? 50 : b.xa) + nx * o,
          y = c.y + Math.sin(c.ang) * (b.soLuong > 1 ? 50 : b.xa) + ny * o;
        GS.G.turrets.push({
          x,
          y,
          el,
          m,
          life: b.t,
          max: b.t,
          cd: 0.3,
          rate: b.cd,
          tam: b.tam,
          mult: b.m,
          cast: c.cast,
          t: 0,
          tag: b.tag,
          hao: b.hao,
          fxId: b.fx,
          oil: 0,
        });
        fxRing(x, y, 40, col, 0.3, 5);
      }
      return;
    }
    case "buff":
      applyBuffs(b.sts, b, c);
      return;
    case "khien": {
      const amt = m.maxHp * b.hp;
      p.shield = Math.max(p.shield, amt);
      p.shieldMax = p.shield;
      p.shieldT = b.t;
      fxRing(p.x, p.y - 18, 36, col, 0.4, 5);
      applyBuffs(b.sts, b, c);
      return;
    }
    case "hoiNang": {
      for (const pm of GS.G.party) {
        if (!pm.alive || (b.doi === "dongDoi" && pm === m)) continue;
        pm.energy = Math.min(pm.c.burst.cost, pm.energy + b.n * hnOf(pm));
      }
      return;
    }
    case "keo": {
      const cx = c.x + Math.cos(c.ang) * b.xa,
        cy = c.y + Math.sin(c.ang) * b.xa;
      kfx(b.fx, c, cx, cy, b.r, 0.45, { sx: c.x, sy: c.y });
      for (const e of GS.G.enemies) {
        if (e.dead || dist(cx, cy, e.x, e.y) > b.r + e.r) continue;
        applyDebuffs(e, b, c);
        if (e.isBoss) continue;
        const d = dist(c.x, c.y, e.x, e.y),
          k = Math.min(b.luc, Math.max(0, d - 40)),
          a = Math.atan2(c.y - e.y, c.x - e.x);
        moveC(e, Math.cos(a) * k, Math.sin(a) * k, e.r * 0.6);
      }
      return;
    }
    case "phanDon": {
      p.guard = { t: b.t, b, c };
      fxRing(p.x, p.y - 14, 34, col, b.t, 3);
      kfx(b.fx ?? "theGac", c, p.x, p.y, 40, b.t);
      return;
    }
    case "nhay": {
      Object.assign(p, {
        air: true,
        vz: jumpPhysics().v0 * Math.sqrt(b.cao),
        jvx: 0,
        jvy: 0,
        peak: p.zh,
        airDash: false,
        plunge: false,
        long: false,
      });
      fxBurst(p.x, p.y, F.c2, 10, 120, 2);
      return;
    }
    case "dac":
      hooksOf(m).dac?.[b.ham]?.(b, c);
      return;
  }
}

/** Phản đòn: gọi từ hurtPlayer khi đang trong thế thủ. */
export function counter(p: any) {
  const g = p.guard;
  p.guard = null;
  const m = g.c.m;
  p.iframes = 0.6;
  p.act = { k: "skill", clip: `${m.c.id}.counter`, t0: GS.G.time };
  fxText(p.x, p.y - 56, "Phản đòn", charFx(m.c.id).c, 16, true);
  runBlock({ ...g.b, k: "chem", goc: 360, xa: 0 }, { ...g.c, x: p.x, y: p.y });
  hooksOf(m).onCounter?.(m);
}
