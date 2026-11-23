import { HOME, buy, comfort, move, normHome, place, remove, setsDone } from "../home/home-core";
import type { LogEntry, Profile, PuzzleSave, WeaponBannerCfg } from "./types";
import { DOMAINS, MINI, PZ } from "../data/puzzles";
import { fmt, pick, todayKey } from "../core/util";
import { CHARS, DAILY_POOL, DEFAULT_CFG, START_PROFILE, byId } from "../data/content";
import { toast } from "../ui/toast";
import { ECON } from "../data/economy";
import { caps, charStats, chienLuc, lvCost as lvCostOf, rollRarity, rollWeapon, type Invest } from "../economy/core";
import type { Economy, Weapon } from "../data/economy-schema";
import {
  addExp,
  ascendCost,
  defaultWeaponFor,
  fodderExp,
  lvCapOf,
  newWeapon,
  previewExp,
  type WeaponInst,
} from "../economy/weapons";
import { BA } from "../data/bao-an";
import { SLOT_IDS, type SlotId, type StatId } from "../data/bao-an-schema";
import {
  addExp as baAddExp,
  bonusOf,
  capOf as baCapOf,
  dismantleYield,
  expToNext,
  fodderExp as baFodderExp,
  rollBaoAn,
  type BaRarity,
  type BaoAnInst,
  type MilestoneRoll,
  type RollSpec,
} from "../economy/bao-an";

export const SAVE_KEY = "tinhtu-v3";
export const OLD_SAVE_KEY = "tinhtu-v2";
/** Nhật ký request dùng chung giữa game và trang Admin (cùng localStorage). */
export const LOG_KEY = "tinhtu-log";
/** Cỡ một khối sương bản đồ (ô). Bản đồ 110×110 ô thành 22×22 khối. */
export const FOG = 5;
export const FOG_N = 22;

/** Đọc qua hàm để bản chỉnh Admin (setEcon/reloadEcon) có hiệu lực ngay. */
export const vk = () => ECON.thietKe.vuKhi;
export const weaponList = () => vk().danhSach;
export const wDef = (id: string): Weapon | undefined => vk().danhSach.find((w) => w.id === id);

export function defaultWcfg(): WeaponBannerCfg {
  const b = vk().banner;
  return { rate5: b.tiLe5, rate4: b.tiLe4, soft: b.mem, hard: b.cung, cost: b.gia, featured: [...b.noiBat] };
}

/** Thêm một bản vũ khí vào kho, trả về bản vừa thêm. */
export function addWeapon(P: Profile, id: string): WeaponInst {
  if (!wDef(id)) throw new Error(`Không có vũ khí "${id}"`);
  const uid = "w" + ++P.wSeq;
  return (P.weapons[uid] = newWeapon(uid, id));
}

/** uid → id nhân vật đang cầm. */
export function holders(P: Profile) {
  const m: Record<string, string> = {};
  for (const [cid, o] of Object.entries(P.owned)) if (o.vk) m[o.vk] = cid;
  return m;
}

/**
 * Bước chuyển đổi S24 (kho vũ khí). Idempotent và không phụ thuộc số phiên bản, nên chạy sau mọi bước chuyển
 * phiên bản khác (kể cả của S23): thiếu kho thì tạo kèm nguyên liệu khởi đầu, nhân vật thiếu vũ khí hợp lệ thì
 * trang bị vũ khí 3★ mặc định theo loại.
 */
/** Trần tài nguyên: cộng dồn vẫn xa Number.MAX_SAFE_INTEGER (khoảng 9×10^15), mọi phép tính giữ chính xác. */
export const RES_CAP = 999_999_999_999;
/** Mức "Cấp tối đa để thử" của Admin. */
export const TEST_MAX = 9_000_000_000;
export const capRes = (n: number) => (Number.isFinite(n) ? Math.min(RES_CAP, Math.max(0, Math.floor(n))) : 0);
/** Vật phẩm Admin cấp được: Quặng Tinh Luyện và Phôi Lồng Sao. Chưa có vé ước trong game. */
export const grantItems = () => [...vk().quang.map((q) => q.id), vk().loRen.nguyenLieu];

const DAY_MS = 86_400_000;
/** Linh Lực hiện có: hồi hoiMoiNgay mỗi ngày tới toiDa. */
export function linhLucNow(P: Profile, now = Date.now()) {
  const L = ECON.thietKe.linhLuc;
  if (P.ll.v >= L.toiDa) return L.toiDa;
  return Math.min(L.toiDa, P.ll.v + (Math.max(0, now - P.ll.t) * L.hoiMoiNgay) / DAY_MS);
}
/** Khóa tuần theo ngày thứ Hai đầu tuần (giờ máy). */
export function weekKey(d = new Date()) {
  const m = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
  return `${m.getFullYear()}-${m.getMonth() + 1}-${m.getDate()}`;
}
export function shopLeft(P: Profile, id: string) {
  const it = [...vk().nguon.cuaHang, ...vk().nguon.cuaHangVuKhi].find((x) => x.id === id);
  if (!it) return 0;
  const used = P.wShop.week === weekKey() ? (P.wShop.bought[id] ?? 0) : 0;
  return Math.max(0, it.moiTuan - used);
}
export function achState(P: Profile, a: { id: string; loai: string; can: number }) {
  const have = P.wStat[a.loai] ?? 0;
  return { have, done: have >= a.can, claimed: P.wAch.includes(a.id) };
}
const bump = (P: Profile, k: string) => (P.wStat[k] = (P.wStat[k] ?? 0) + 1);

export function ensureWeapons(P: Profile): Profile {
  if (!P.weapons || typeof P.weapons !== "object") {
    P.weapons = {};
    P.bag = P.bag ?? {};
    for (const [k, n] of Object.entries(vk().khoiDau)) P.bag[k] = (P.bag[k] ?? 0) + n;
  }
  P.wSeq = Math.max(P.wSeq ?? 0, ...Object.keys(P.weapons).map((u) => Number(u.slice(1)) || 0));
  P.wPity = Object.assign({ pity5: 0, pity4: 0, guaranteed: false, laBan: 0 }, P.wPity);
  P.wPick = P.wPick ?? null;
  P.wHistory = Array.isArray(P.wHistory) ? P.wHistory : [];
  P.wcfg = { ...defaultWcfg(), ...P.wcfg };
  P.ll = typeof P.ll?.v === "number" ? P.ll : { v: ECON.thietKe.linhLuc.toiDa, t: Date.now() };
  P.wStat = { ...P.wStat };
  P.wAch = Array.isArray(P.wAch) ? P.wAch : [];
  P.wShop = P.wShop?.bought ? P.wShop : { week: "", bought: {} };
  for (const k of ["gems", "coin", "books"] as const) P[k] = capRes(P[k]);
  for (const k of Object.keys(P.bag)) P.bag[k] = capRes(P.bag[k]!);
  const used = new Set<string>();
  for (const [cid, o] of Object.entries(P.owned)) {
    const c = byId[cid];
    if (!c) continue;
    const w = o.vk ? P.weapons[o.vk] : undefined;
    if (!w || !wDef(w.id) || wDef(w.id)!.loai !== c.w || used.has(o.vk!))
      o.vk = addWeapon(P, defaultWeaponFor(c.w, ECON)).uid;
    used.add(o.vk!);
  }
  return P;
}

// ---------------------------------------------------------------- Bảo Ấn (S31)

/** Thêm một Bảo Ấn mới tung theo content/bao-an.yaml. */
export function addBaoAn(P: Profile, spec: RollSpec, rng: () => number = Math.random): BaoAnInst {
  const uid = "b" + ++P.baSeq;
  return (P.baoAn[uid] = rollBaoAn(BA, uid, spec, rng));
}
/** uid Bảo Ấn → id nhân vật đang mặc. */
export function baHolders(P: Profile) {
  const m: Record<string, string> = {};
  for (const [cid, o] of Object.entries(P.owned)) for (const u of Object.values(o.ba ?? {})) if (u) m[u] = cid;
  return m;
}
/** Bảo Ấn một nhân vật đang mặc, theo thứ tự ô. */
export function worn(P: Profile, cid: string, over?: Partial<Record<SlotId, string | null>>) {
  const ba = { ...P.owned[cid]?.ba, ...over };
  return SLOT_IDS.map((o) => (ba[o] ? P.baoAn?.[ba[o]!] : undefined)).filter((a): a is BaoAnInst => !!a);
}
/** Cấp Hộ Tinh của hồ sơ (game chưa có cấp tài khoản riêng: lấy cấp cao nhất trong các nhân vật đã có). */
export const hoTinhOf = (P: Profile) => Math.max(1, ...Object.values(P.owned).map((o) => o.lv || 1));
/** Mức Thiên Tượng cao nhất đã mở cho Bí Cảnh Bảo Ấn. */
export const ttMaxOf = (P: Profile) => caps(hoTinhOf(P), ECON).thienTuong;
export function baDoiLeft(P: Profile, id: string) {
  const d = BA.doi.find((x) => x.id === id);
  if (!d) return 0;
  return Math.max(0, d.moiTuan - (P.baDoi.week === weekKey() ? (P.baDoi.used[id] ?? 0) : 0));
}
/** Sáp Ấn kèm mỗi lượt Bí Cảnh Bảo Ấn ở mức Thiên Tượng tt. */
export function domainSap(tt: number) {
  const k = 1 + BA.biCanh.sapMoiTT * tt;
  return Object.fromEntries(Object.entries(BA.biCanh.sap).map(([id, n]) => [id, Math.round(n * k)]));
}

/** Bước chuyển đổi S31 (kho Bảo Ấn). Idempotent: thiếu kho thì tạo kèm quà khởi đầu; bỏ ô trỏ tới món không còn. */
export function ensureBaoAn(P: Profile): Profile {
  if (!P.baoAn || typeof P.baoAn !== "object") {
    P.baoAn = {};
    P.baSeq = 0;
    const K = BA.khoiDau;
    for (const [k, n] of Object.entries(K.sap)) P.bag[k] = capRes((P.bag[k] ?? 0) + n);
    if (K.buiAn) P.bag["bui-an"] = capRes((P.bag["bui-an"] ?? 0) + K.buiAn);
    for (const x of K.bao) for (const o of SLOT_IDS) addBaoAn(P, { bo: x.bo, o, r: x.r as BaRarity });
  }
  for (const [u, a] of Object.entries(P.baoAn))
    if (!a || !BA.bo.some((b) => b.id === a.bo) || !SLOT_IDS.includes(a.o)) delete P.baoAn[u];
  P.baSeq = Math.max(P.baSeq ?? 0, ...Object.keys(P.baoAn).map((u) => Number(u.slice(1)) || 0));
  P.baDoi = P.baDoi?.used ? P.baDoi : { week: "", used: {} };
  const used = new Set<string>();
  for (const o of Object.values(P.owned)) {
    if (!o.ba) continue;
    for (const k of Object.keys(o.ba) as SlotId[]) {
      const u = o.ba[k],
        a = u ? P.baoAn[u] : undefined;
      if (!u || !a || a.o !== k || used.has(u)) delete o.ba[k];
      else used.add(u);
    }
  }
  return P;
}

/** Hồ sơ gốc chưa có phần vũ khí (S24 bổ sung qua ensureWeapons). */
function baseProfile(): Profile {
  const party = [...START_PROFILE.party];
  return {
    v: 3,
    gems: START_PROFILE.gems,
    coin: START_PROFILE.coin,
    books: START_PROFILE.books,
    owned: Object.fromEntries(START_PROFILE.party.map((id) => [id, { lv: 1, cons: 0 }])),
    party: [...START_PROFILE.party],
    pity5: 0,
    pity4: 0,
    guaranteed: false,
    history: [],
    chests: [],
    tower: {},
    boss: {},
    daily: null,
    cfg: { ...DEFAULT_CFG },
    gm: { god: false, one: false, nocd: false },
    stats: { kills: 0, reacts: 0 },
    teams: [party, [], [], []],
    team: 0,
    bag: {},
    quests: { tracked: null, done: [] },
    fog: "0".repeat(FOG_N * FOG_N),
    marks: [],
    codex: [],
    affinity: {},
    econ: {},
    quits: [],
    puz: freshPuz(),
  } as unknown as Profile;
}
export const freshPuz = (): PuzzleSave => ({ solved: [], talked: [], mini: [], domains: {} });
const arr = (v: any) => (Array.isArray(v) ? v.filter((x) => typeof x === "string") : []);
/** Save trước S23 chưa có `puz`; save hỏng một phần thì giữ phần dùng được. */
function withPuz(p: Profile): Profile {
  const o: any = p.puz && typeof p.puz === "object" ? p.puz : {};
  const domains: PuzzleSave["domains"] = {};
  if (o.domains && typeof o.domains === "object")
    for (const [k, v] of Object.entries<any>(o.domains)) {
      const d = DOMAINS.find((x) => x.id === k);
      if (d && v && typeof v === "object")
        domains[k] = { room: Math.min(d.phong.length + 2, Math.max(0, Number(v.room) | 0)), done: !!v.done };
    }
  p.puz = { solved: arr(o.solved), talked: arr(o.talked), mini: arr(o.mini), domains };
  return p;
}
export function freshProfile(): Profile {
  return ensureBaoAn(ensureWeapons(baseProfile()));
}
/** Chuyển hồ sơ cũ (v2) lên v3, giữ toàn bộ dữ liệu đã có; cuối cùng bổ sung kho vũ khí (S24). */
export function migrate(old: any): Profile | null {
  if (!old || typeof old !== "object") return null;
  if (old.v === 3) return ensureBaoAn(ensureWeapons(withPuz(withLimitedBanner({ ...baseProfile(), ...old }))));
  if (old.v !== 2) return null;
  const base = baseProfile();
  const party = Array.isArray(old.party) && old.party.length ? old.party : base.party;
  return ensureBaoAn(
    ensureWeapons(
      withPuz(withLimitedBanner({ ...base, ...old, v: 3, party, teams: [[...party], [], [], []], team: 0 })),
    ),
  );
}
/** Hồ sơ cũ có banner nổi bật không còn là 5★ giới hạn (ví dụ Lạc Hồng trước S23): chuyển về banner mặc định. */
function withLimitedBanner(p: Profile): Profile {
  if (!ECON.game.nhanVat5Sao.gioiHan.includes(p.cfg?.featured))
    p.cfg = { ...DEFAULT_CFG, ...p.cfg, featured: DEFAULT_CFG.featured };
  return p;
}
/** Số liệu banner vũ khí sau khi áp cấu hình Admin. */
function wEcon(c: WeaponBannerCfg): Economy {
  const banner = {
    ...vk().banner,
    tiLe5: c.rate5,
    tiLe4: c.rate4,
    mem: c.soft,
    cung: c.hard,
    gia: c.cost,
    noiBat: c.featured,
  };
  return { ...ECON, thietKe: { ...ECON.thietKe, vuKhi: { ...vk(), banner } } };
}
export function genDaily(seedKey: string) {
  const pool = DAILY_POOL;
  let s = 0;
  for (const ch of seedKey) s = (s * 31 + ch.charCodeAt(0)) | 0;
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) | 0;
    const j = Math.abs(s) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return { date: seedKey, tasks: arr.slice(0, 4).map((t) => ({ ...t, prog: 0, claimed: false })), bonus: false };
}
export const Server = {
  P: null as unknown as Profile,
  log: [] as LogEntry[],
  load() {
    try {
      const l = JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]");
      if (Array.isArray(l)) this.log = l;
    } catch (e) {}
    if (!this.P) {
      try {
        const s = localStorage.getItem(SAVE_KEY) ?? localStorage.getItem(OLD_SAVE_KEY);
        if (s) this.P = migrate(JSON.parse(s)) as Profile;
      } catch (e) {}
    }
    if (!this.P || this.P.v !== 3) this.P = migrate(this.P) ?? freshProfile();
    this.ensureDaily();
  },
  /** Đọc lại hồ sơ từ localStorage (khi trang khác, ví dụ Admin, vừa ghi). */
  reload() {
    this.P = null as unknown as Profile;
    this.load();
  },
  save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.P));
    } catch (e) {}
  },
  ensureDaily() {
    const k = todayKey();
    if (!this.P.daily || this.P.daily.date !== k) this.P.daily = genDaily(k);
  },
  req(action: string, payload = {}) {
    const fn = (this.routes as Record<string, (p: any) => any>)[action];
    let res;
    if (!fn) res = { ok: false, error: "Không có lệnh này" };
    else {
      try {
        res = { ok: true, data: fn.call(this, payload) };
        this.save();
      } catch (e: any) {
        res = { ok: false, error: e.message };
      }
    }
    if (action !== "progress") {
      this.log.unshift({ a: action, p: payload, ok: res.ok, msg: res.ok ? "200 OK" : res.error, t: Date.now() });
      if (this.log.length > 80) this.log.pop();
      try {
        localStorage.setItem(LOG_KEY, JSON.stringify(this.log));
      } catch (e) {}
    }
    if (!res.ok) toast(res.error);
    return res;
  },
  grant(id: string) {
    const P = this.P,
      c = byId[id];
    if (P.owned[id]) {
      if (P.owned[id].cons < 6) {
        P.owned[id].cons++;
        return { dup: true, cons: P.owned[id].cons };
      }
      P.coin += ECON.game.netSao.xuKhiDayN6[c.r === 5 ? "5" : "4"];
      return { dup: true, cons: 6, max: true };
    }
    P.owned[id] = { lv: 1, cons: 0, vk: addWeapon(P, defaultWeaponFor(c.w, ECON)).uid };
    return { dup: false, cons: 0 };
  },
  rollOne() {
    const P = this.P,
      cfg = P.cfg;
    const roll = rollRarity(P, cfg, ECON, Math.random);
    let out;
    if (roll.r === 5) {
      let c;
      if (roll.feat) c = byId[cfg.featured];
      else {
        const std = ECON.game.nhanVat5Sao.thuongTru.filter((id) => id !== cfg.featured && byId[id]);
        c = std.length ? byId[pick(std)] : pick(CHARS.filter((x) => x.r === 5 && x.id !== cfg.featured));
      }
      out = { kind: "char", id: c.id, r: 5, name: c.name, feat: roll.feat, ...this.grant(c.id) };
    } else if (roll.r === 4) {
      const c = pick(CHARS.filter((x) => x.r === 4));
      out = { kind: "char", id: c.id, r: 4, name: c.name, ...this.grant(c.id) };
    } else {
      P.coin += ECON.game.xuVatPham3;
      const w = addWeapon(P, pick(weaponList().filter((x) => x.r === 3)).id);
      out = { kind: "weapon", r: 3, id: w.id, uid: w.uid, name: wDef(w.id)!.ten };
    }
    P.history.unshift({ n: out.name, r: out.r, t: Date.now() });
    if (P.history.length > 100) P.history.pop();
    return out;
  },
  /** Một lượt banner Binh Khí Tinh Tú. */
  rollWeaponOne() {
    const P = this.P,
      c = P.wcfg;
    const res = rollWeapon(P.wPity, wEcon(c), Math.random);
    let id: string;
    if (res.r === 5) {
      if (res.kind === "thuong") id = pick(weaponList().filter((w) => w.r === 5 && w.nguon === "thuongTru")).id;
      else if (P.wPick && c.featured.includes(P.wPick))
        id = res.kind === "chon" ? P.wPick : c.featured.find((x) => x !== P.wPick)!;
      else {
        id = pick(c.featured);
        P.wPity.laBan = 0;
      }
    } else if (res.r === 4) id = pick(weaponList().filter((w) => w.r === 4 && w.nguon === "uocNguyen")).id;
    else id = pick(weaponList().filter((w) => w.r === 3)).id;
    const w = addWeapon(P, id),
      def = wDef(id)!;
    const out = { kind: "weapon", r: def.r, id, uid: w.uid, name: def.ten, feat: res.r === 5 && res.kind !== "thuong" };
    P.wHistory.unshift({ n: def.ten, r: def.r, t: Date.now(), id });
    if (P.wHistory.length > 100) P.wHistory.pop();
    return out;
  },
  /** Vũ khí theo uid, báo lỗi nếu không có. */
  wget(uid: string): WeaponInst {
    const w = this.P.weapons[uid];
    if (!w) throw new Error("Không có vũ khí này");
    return w;
  },
  /** Kiểm tra một vũ khí có dùng làm nguyên liệu được không. */
  fodder(uid: string, target: string, confirm: boolean) {
    if (uid === target) throw new Error("Không dùng chính vũ khí đang nâng cấp làm nguyên liệu");
    const m = this.wget(uid);
    if (m.lock) throw new Error("Vũ khí đã khóa, mở khóa trước khi dùng làm nguyên liệu");
    const h = holders(this.P)[uid];
    if (h) throw new Error(`Vũ khí đang được ${byId[h]?.name ?? h} trang bị`);
    if (wDef(m.id)!.r >= 4 && !confirm) throw new Error("Cần xác nhận khi dùng vũ khí 4★/5★ làm nguyên liệu");
    return m;
  },
  /** Ghi Đá Sao vào/ra theo nguồn để trang Admin thống kê kinh tế. */
  econ(key: string, n: number) {
    if (!n) return;
    this.P.econ[key] = (this.P.econ[key] ?? 0) + n;
  },
  chestTier(t: "thuong" | "quy" | "tinhXao", key: string) {
    const R = ECON.game.thuong.ruongCauDo[t],
      P = this.P;
    P.gems += R.daSao;
    P.coin += R.xu;
    P.books += R.sach;
    this.econ(key, R.daSao);
    return { gems: R.daSao, coin: R.xu, books: R.sach, tier: t };
  },
  bumpDaily(id: string, n = 1) {
    const d = this.P.daily;
    if (!d) return;
    for (const t of d.tasks) if (t.id === id && !t.claimed) t.prog = Math.min(t.goal, t.prog + n);
  },
  routes: {
    pull(this: any, { count }: any) {
      const n = count === 10 ? 10 : 1,
        P = this.P,
        cost = P.cfg.cost * n;
      if (P.gems < cost) throw new Error(`Không đủ Đá Sao: cần ${fmt(cost)}, đang có ${fmt(P.gems)}`);
      P.gems -= cost;
      this.econ("ra:uoc", cost);
      const out = [];
      for (let i = 0; i < n; i++) out.push(this.rollOne());
      this.bumpDaily("wish", n);
      return out;
    },
    // ---- vũ khí (S24) ----
    wPull(this: any, { count }: any) {
      const n = count === 10 ? 10 : 1,
        P = this.P,
        cost = P.wcfg.cost * n;
      if (P.gems < cost) throw new Error(`Không đủ Đá Sao: cần ${fmt(cost)}, đang có ${fmt(P.gems)}`);
      P.gems -= cost;
      this.econ("ra:uoc-vu-khi", cost);
      const out = [];
      for (let i = 0; i < n; i++) out.push(this.rollWeaponOne());
      this.bumpDaily("wish", n);
      return out;
    },
    /** La Bàn Sao: chọn trước một trong hai vũ khí nổi bật. Đổi lựa chọn thì điểm La Bàn về 0. */
    wPick(this: any, { id }: any) {
      const P = this.P;
      if (id !== null && !P.wcfg.featured.includes(id)) throw new Error("Chỉ chọn được vũ khí nổi bật của đợt này");
      if (P.wPick !== id) P.wPity.laBan = 0;
      P.wPick = id;
      return { pick: id, laBan: P.wPity.laBan };
    },
    equipWeapon(this: any, { char, uid, swap }: any) {
      const P = this.P,
        o = P.owned[char],
        c = byId[char];
      if (!o || !c) throw new Error("Bạn chưa có nhân vật này");
      const w = this.wget(uid);
      if (wDef(w.id)!.loai !== c.w) throw new Error("Vũ khí không đúng loại của nhân vật");
      if (o.vk === uid) return { char, uid, from: null };
      const from = holders(P)[uid] ?? null;
      if (from && !swap) throw new Error(`Vũ khí đang ở ${byId[from]?.name ?? from}, cần xác nhận đổi`);
      if (from) {
        P.owned[from].vk = o.vk;
        if (!P.owned[from].vk) P.owned[from].vk = addWeapon(P, defaultWeaponFor(byId[from].w, ECON)).uid;
      }
      o.vk = uid;
      return { char, uid, from };
    },
    lockWeapon(this: any, { uid, lock }: any) {
      const w = this.wget(uid);
      w.lock = !!lock;
      return w.lock;
    },
    /** Nâng cấp bằng Quặng Tinh Luyện và vũ khí khác. Tốn Xu theo kinh nghiệm thực nhận. */
    upgradeWeapon(this: any, { uid, ores = {}, mats = [], confirm = false }: any) {
      const P = this.P,
        w = this.wget(uid);
      if (w.lv >= lvCapOf(w, ECON)) throw new Error("Đã chạm giới hạn cấp, cần đột phá");
      let exp = 0;
      const oreUse: [string, number][] = [];
      for (const [id, raw] of Object.entries(ores)) {
        const k = Math.floor(Number(raw));
        if (!k) continue;
        const q = vk().quang.find((x) => x.id === id);
        if (!q || k < 0) throw new Error("Nguyên liệu không hợp lệ");
        if ((P.bag[id] ?? 0) < k) throw new Error("Không đủ quặng");
        exp += k * q.kinhNghiem;
        oreUse.push([id, k]);
      }
      const list: string[] = [...new Set<string>(Array.isArray(mats) ? mats : [])];
      for (const m of list) exp += fodderExp(this.fodder(m, uid, confirm), ECON);
      if (!exp) throw new Error("Chưa chọn nguyên liệu");
      const pv = previewExp(w, exp, ECON),
        cost = Math.ceil(pv.used * vk().cap.xuMoiKinhNghiem);
      if (P.coin < cost) throw new Error(`Không đủ Xu: cần ${fmt(cost)}`);
      P.coin -= cost;
      for (const [id, k] of oreUse) P.bag[id] -= k;
      for (const m of list) delete P.weapons[m];
      addExp(w, exp, ECON);
      return { lv: w.lv, exp: w.exp, used: pv.used, coin: cost };
    },
    ascendWeapon(this: any, { uid }: any) {
      const P = this.P,
        w = this.wget(uid),
        c = ascendCost(w, ECON);
      if (!c) throw new Error("Đã đột phá tối đa");
      if (w.lv < lvCapOf(w, ECON)) throw new Error(`Cần đạt cấp ${lvCapOf(w, ECON)} trước khi đột phá`);
      if ((P.bag[c.quangId] ?? 0) < c.quang) throw new Error("Không đủ Quặng Tinh Luyện Sao");
      if (P.coin < c.xu) throw new Error(`Không đủ Xu: cần ${fmt(c.xu)}`);
      P.bag[c.quangId] -= c.quang;
      P.coin -= c.xu;
      w.khai++;
      bump(this.P, "dotPha");
      return { khai: w.khai, cap: lvCapOf(w, ECON) };
    },
    /** Tinh luyện bằng một bản trùng của cùng vũ khí. */
    refineWeapon(this: any, { uid, mat, confirm = false }: any) {
      const w = this.wget(uid);
      if (w.tl >= 5) throw new Error("Đã tinh luyện tối đa R5");
      const m = this.fodder(mat, uid, confirm);
      if (m.id !== w.id) throw new Error("Cần bản trùng của cùng vũ khí");
      delete this.P.weapons[mat];
      w.tl = Math.min(5, w.tl + m.tl);
      bump(this.P, "tinhLuyen");
      return { tl: w.tl };
    },
    forgeWeapon(this: any, { id }: any) {
      const P = this.P,
        def = wDef(id),
        F = vk().loRen;
      if (!def || def.nguon !== "loRen") throw new Error("Lò Rèn chỉ rèn vũ khí 4★ của Lò Rèn");
      if ((P.bag[F.nguyenLieu] ?? 0) < F.so) throw new Error("Không đủ Phôi Lòng Sao");
      if (P.coin < F.xu) throw new Error(`Không đủ Xu: cần ${fmt(F.xu)}`);
      P.bag[F.nguyenLieu] -= F.so;
      P.coin -= F.xu;
      bump(P, "ren");
      return addWeapon(P, id);
    },
    setParty(this: any, { party }: any) {
      if (!Array.isArray(party) || party.length < 1 || party.length > 4) throw new Error("Đội cần từ 1 đến 4 người");
      if (party.some((id) => !this.P.owned[id])) throw new Error("Bạn chưa có nhân vật này");
      if (new Set(party).size !== party.length) throw new Error("Nhân vật bị trùng");
      this.P.party = party;
      this.P.teams[this.P.team] = [...party];
      return party;
    },
    /** Lưu một trong 4 đội; nếu là đội đang dùng thì đổi luôn đội ra trận. */
    setTeam(this: any, { idx, party }: any) {
      const P = this.P;
      if (!(idx >= 0 && idx < 4)) throw new Error("Không có đội này");
      if (!Array.isArray(party) || party.length > 4) throw new Error("Đội có tối đa 4 người");
      if (party.some((id: string) => !P.owned[id])) throw new Error("Bạn chưa có nhân vật này");
      if (new Set(party).size !== party.length) throw new Error("Nhân vật bị trùng");
      if (idx === P.team && !party.length) throw new Error("Đội đang dùng cần ít nhất 1 người");
      P.teams[idx] = [...party];
      if (idx === P.team) P.party = [...party];
      return P.teams;
    },
    useTeam(this: any, { idx }: any) {
      const P = this.P,
        t = P.teams[idx];
      if (!t) throw new Error("Không có đội này");
      if (!t.length) throw new Error("Đội này chưa có ai");
      P.team = idx;
      P.party = [...t];
      return P.party;
    },
    addItems(this: any, { items }: any) {
      for (const [id, n] of Object.entries(items ?? {})) {
        const k = Math.floor(Number(n));
        if (!isFinite(k) || k <= 0) continue;
        this.P.bag[id] = (this.P.bag[id] ?? 0) + k;
        if (!this.P.codex.includes("vat:" + id)) this.P.codex.push("vat:" + id);
      }
      return this.P.bag;
    },
    trackQuest(this: any, { id }: any) {
      this.P.quests.tracked = id || null;
      return this.P.quests.tracked;
    },
    completeQuest(this: any, { id }: any) {
      if (!this.P.quests.done.includes(id)) this.P.quests.done.push(id);
      if (this.P.quests.tracked === id) this.P.quests.tracked = null;
      return this.P.quests.done;
    },
    explore(this: any, { cells }: any) {
      const f = this.P.fog.split("");
      let n = 0;
      for (const i of cells ?? [])
        if (i >= 0 && i < f.length && f[i] !== "1") {
          f[i] = "1";
          n++;
        }
      this.P.fog = f.join("");
      return n;
    },
    addMark(this: any, { x, y, label }: any) {
      if (!isFinite(x) || !isFinite(y)) throw new Error("Vị trí không hợp lệ");
      if (this.P.marks.length >= 30) throw new Error("Tối đa 30 điểm đánh dấu");
      this.P.marks.push({ x: +x, y: +y, label: String(label || "Điểm đánh dấu").slice(0, 40) });
      return this.P.marks;
    },
    delMark(this: any, { i }: any) {
      if (!this.P.marks[i]) throw new Error("Không có điểm này");
      this.P.marks.splice(i, 1);
      return this.P.marks;
    },
    discover(this: any, { ids }: any) {
      const add = [...new Set<string>(ids ?? [])].filter((id) => !this.P.codex.includes(id));
      this.P.codex.push(...add);
      return add;
    },
    /** S21 Nhà Sao: mua, đặt, dời, gỡ đồ; nhận thưởng mốc Ấm Cúng và bộ sưu tập; mời và trò chuyện với Hộ Tinh. */
    homeBuy(this: any, { id }: any) {
      const H = (this.P.home = normHome(this.P.home));
      this.P.coin -= buy(H, id, this.P.coin);
      return H;
    },
    homePlace(this: any, { id, x, y, rot }: any) {
      const H = (this.P.home = normHome(this.P.home));
      return place(H, { id, x: x | 0, y: y | 0, rot: rot ? 1 : 0 });
    },
    homeMove(this: any, { uid, x, y, rot }: any) {
      const H = (this.P.home = normHome(this.P.home));
      return move(H, uid, x | 0, y | 0, rot ? 1 : 0);
    },
    homeRemove(this: any, { uid }: any) {
      const H = (this.P.home = normHome(this.P.home));
      remove(H, uid);
      return H;
    },
    homeClaim(this: any, { kind, id }: any) {
      const H = (this.P.home = normHome(this.P.home));
      let r: { daSao: number; xu: number };
      if (kind === "moc") {
        const m = HOME.moc.find((x) => x.can === id);
        if (!m) throw new Error("Không có mốc này");
        if (H.moc.includes(m.can)) throw new Error("Đã nhận");
        if (comfort(H) < m.can) throw new Error("Chưa đủ Ấm Cúng");
        H.moc.push(m.can);
        r = m.thuong;
      } else {
        const b = HOME.bo.find((x) => x.id === id);
        if (!b) throw new Error("Không có bộ này");
        if (H.bo.includes(b.id)) throw new Error("Đã nhận");
        if (!setsDone(H).includes(b)) throw new Error("Chưa đủ bộ");
        H.bo.push(b.id);
        r = b.thuong;
      }
      this.P.gems = capRes(this.P.gems + r.daSao);
      this.econ("vao:nha", r.daSao);
      this.P.coin = capRes(this.P.coin + r.xu);
      return r;
    },
    homeGuests(this: any, { ids }: any) {
      const H = (this.P.home = normHome(this.P.home));
      H.khach = (Array.isArray(ids) ? ids : []).filter((x: string) => this.P.owned[x]).slice(0, HOME.khach.toiDa);
      return H.khach;
    },
    homeTalk(this: any, { id }: any) {
      const H = (this.P.home = normHome(this.P.home));
      if (!H.khach.includes(id)) throw new Error("Người này không ở nhà");
      const k = todayKey();
      const line =
        HOME.loiKhach[
          Math.abs([...id].reduce((s, c) => s * 31 + c.charCodeAt(0), 7) + k.length) % HOME.loiKhach.length
        ]!;
      if (H.noiNgay[id] === k) return { line, n: 0 };
      H.noiNgay[id] = k;
      this.P.affinity[id] = (this.P.affinity[id] ?? 0) + HOME.khach.thanThiet;
      return { line, n: HOME.khach.thanThiet };
    },
    affinity(this: any, { id, n }: any) {
      if (!byId[id]) throw new Error("Không có nhân vật này");
      this.P.affinity[id] = Math.max(0, (this.P.affinity[id] ?? 0) + (Number(n) || 0));
      return this.P.affinity[id];
    },
    logQuit(this: any, { mode, at }: any) {
      this.P.quits.unshift({ mode: String(mode), at: String(at ?? ""), t: Date.now() });
      if (this.P.quits.length > 200) this.P.quits.pop();
      return true;
    },
    levelUp(this: any, { id, times }: any) {
      const P = this.P,
        o = P.owned[id];
      if (!o) throw new Error("Bạn chưa có nhân vật này");
      let n = 0;
      for (let i = 0; i < (times || 1); i++) {
        if (o.lv >= ECON.game.capNhanVat.toiDa) break;
        const c = lvCost(o.lv);
        if (P.books < c.books || P.coin < c.coin) break;
        P.books -= c.books;
        P.coin -= c.coin;
        o.lv++;
        n++;
      }
      if (!n)
        throw new Error(o.lv >= ECON.game.capNhanVat.toiDa ? "Đã đạt cấp tối đa" : "Không đủ Sách Kinh Nghiệm hoặc Xu");
      return o.lv;
    },
    reward(this: any, { gems = 0, coin = 0, books = 0 }) {
      const P = this.P;
      P.gems += Math.max(0, gems | 0);
      this.econ("vao:thuong", Math.max(0, gems | 0));
      P.coin += Math.max(0, coin | 0);
      P.books += Math.max(0, books | 0);
      return true;
    },
    openChest(this: any, { idx }: any) {
      const P = this.P;
      if (P.chests.includes(idx)) throw new Error("Rương này đã mở");
      P.chests.push(idx);
      const R = ECON.game.thuong.ruong,
        g = R.daSao.goc + Math.floor(Math.random() * R.daSao.soBuoc) * R.daSao.buoc,
        c = R.xu.goc + Math.floor(Math.random() * R.xu.ngauNhien),
        b = R.sach.goc + Math.floor(Math.random() * R.sach.ngauNhien);
      P.gems += g;
      this.econ("vao:ruong", g);
      P.coin += c;
      P.books += b;
      this.bumpDaily("chest");
      return { gems: g, coin: c, books: b };
    },
    /** S23: giải câu đố nguyên tố (một lần), thưởng rương theo bậc. */
    solvePuzzle(this: any, { id }: any) {
      const P = this.P,
        p = PZ[id];
      if (!p) throw new Error("Không có câu đố này");
      if (P.puz.solved.includes(id)) throw new Error("Câu đố đã giải");
      P.puz.solved.push(id);
      return p.ruong ? this.chestTier(p.ruong, "vao:cau-do") : { gems: 0, coin: 0, books: 0 };
    },
    talkMini(this: any, { id }: any) {
      if (!MINI.some((m) => m.id === id)) throw new Error("Không có quest này");
      if (!this.P.puz.talked.includes(id)) this.P.puz.talked.push(id);
      return this.P.puz.talked;
    },
    /** Xong quest mini khi đã nhận quest và giải hết câu đố của nó. */
    finishMini(this: any, { id }: any) {
      const P = this.P,
        m = MINI.find((x) => x.id === id);
      if (!m) throw new Error("Không có quest này");
      if (P.puz.mini.includes(id)) throw new Error("Quest đã xong");
      if (!P.puz.talked.includes(id) || !m.cauDo.every((c) => P.puz.solved.includes(c)))
        throw new Error("Quest chưa xong");
      P.puz.mini.push(id);
      P.gems += m.thuong.daSao;
      this.econ("vao:quest-mini", m.thuong.daSao);
      P.coin += m.thuong.xu;
      const gift = m.tang && !P.owned[m.tang] ? (this.grant(m.tang), m.tang) : null;
      return { gems: m.thuong.daSao, coin: m.thuong.xu, gift };
    },
    domainRoom(this: any, { id, room }: any) {
      if (!DOMAINS.some((d) => d.id === id)) throw new Error("Không có bí cảnh này");
      const D = (this.P.puz.domains[id] ??= { room: 0, done: false });
      D.room = Math.max(D.room, room | 0);
      return D;
    },
    domainClear(this: any, { id }: any) {
      const d = DOMAINS.find((x) => x.id === id);
      if (!d) throw new Error("Không có bí cảnh này");
      const D = (this.P.puz.domains[id] ??= { room: 0, done: false });
      if (D.done) throw new Error("Đã nhận rương bí cảnh");
      D.done = true;
      D.room = d.phong.length + 1;
      return this.chestTier(d.ruong, "vao:bi-canh");
    },
    /** Admin: đặt lại câu đố, quest mini, bí cảnh (tất cả hoặc theo id). Không thu hồi thưởng hay nhân vật đã nhận. */
    resetPuzzles(this: any, { id }: any = {}) {
      const P = this.P;
      if (!id) P.puz = freshPuz();
      else {
        const rm = (a: string[]) => a.filter((x) => x !== id);
        P.puz.solved = rm(P.puz.solved);
        P.puz.talked = rm(P.puz.talked);
        P.puz.mini = rm(P.puz.mini);
        delete P.puz.domains[id];
      }
      return P.puz;
    },
    towerClear(this: any, { floor, stars }: any) {
      const P = this.P,
        old = P.tower[floor] || 0,
        gain = Math.max(0, stars - old);
      P.tower[floor] = Math.max(old, stars);
      const T = ECON.game.thuong.thap,
        gems = gain * T.daSaoMoiSao,
        coin = T.xuGoc + floor * T.xuMoiTang,
        books = T.sachGoc + Math.floor(floor / T.sachChiaTang);
      P.gems += gems;
      this.econ("vao:thap", gems);
      P.coin += coin;
      P.books += books;
      this.bumpDaily("tower");
      return { gems, coin, books, newStars: gain };
    },
    bossClear(this: any, { lv }: any) {
      const P = this.P,
        first = !P.boss[lv];
      P.boss[lv] = true;
      const B = ECON.game.thuong.hacGiao,
        gems = first ? B.daSaoLanDauGoc + lv * B.daSaoLanDauMoiCap : B.daSaoLapLai,
        coin = B.xuGoc + lv * B.xuMoiCap,
        books = B.sachGoc + lv * B.sachMoiCap;
      P.gems += gems;
      this.econ("vao:boss", gems);
      P.coin += coin;
      P.books += books;
      this.bumpDaily("boss");
      return { gems, coin, books, first };
    },
    progress(this: any, { id, n }: any) {
      this.bumpDaily(id, n);
      if (id === "kill") this.P.stats.kills += n;
      if (id === "react") this.P.stats.reacts += n;
      return true;
    },
    claimTask(this: any, { i }: any) {
      const d = this.P.daily,
        t = d.tasks[i];
      if (!t) throw new Error("Không có nhiệm vụ này");
      if (t.claimed) throw new Error("Đã nhận thưởng");
      if (t.prog < t.goal) throw new Error("Chưa hoàn thành");
      t.claimed = true;
      const { daSao, xu } = ECON.game.thuong.uyThac.moiViec;
      this.P.gems += daSao;
      this.econ("vao:uy-thac", daSao);
      this.P.coin += xu;
      return { gems: daSao, coin: xu };
    },
    claimBonus(this: any) {
      const d = this.P.daily;
      if (d.bonus) throw new Error("Đã nhận thưởng");
      if (!d.tasks.every((t: any) => t.claimed)) throw new Error("Nhận đủ 4 nhiệm vụ trước");
      d.bonus = true;
      const { daSao, sach } = ECON.game.thuong.uyThac.duBon;
      this.P.gems += daSao;
      this.econ("vao:uy-thac", daSao);
      this.P.books += sach;
      const ores = vk().nguon.uyThac;
      for (const [k, n] of Object.entries(ores)) this.P.bag[k] = (this.P.bag[k] ?? 0) + n;
      return { gems: daSao, books: sach, ores };
    },
    // ---- nguồn nguyên liệu vũ khí ----
    biCanh(this: any) {
      const P: Profile = this.P,
        B = vk().nguon.biCanh,
        now = Date.now(),
        cur = linhLucNow(P, now);
      if (cur < B.linhLuc) throw new Error(`Cần ${B.linhLuc} Linh Lực`);
      P.ll = { v: cur - B.linhLuc, t: now };
      for (const [k, n] of Object.entries(B.roi)) P.bag[k] = (P.bag[k] ?? 0) + n;
      P.coin += B.xu;
      bump(P, "biCanh");
      return { roi: B.roi, coin: B.xu, ll: Math.floor(P.ll.v) };
    },
    buyOre(this: any, { id, n = 1 }: any) {
      const P: Profile = this.P,
        it = vk().nguon.cuaHang.find((x) => x.id === id);
      if (!it) throw new Error("Cửa hàng không đổi vật phẩm này");
      const k = Math.floor(Number(n));
      if (!(k >= 1)) throw new Error("Số lượng không hợp lệ");
      if (shopLeft(P, id) < k) throw new Error("Đã hết lượt đổi tuần này");
      if (P.coin < it.xu * k) throw new Error("Không đủ Xu");
      if ((P.bag[id] ?? 0) + k > RES_CAP) throw new Error("Kho đã đầy");
      const wk = weekKey();
      if (P.wShop.week !== wk) P.wShop = { week: wk, bought: {} };
      P.wShop.bought[id] = (P.wShop.bought[id] ?? 0) + k;
      P.coin -= it.xu * k;
      P.bag[id] = (P.bag[id] ?? 0) + k;
      return { left: shopLeft(P, id) };
    },
    buyWeaponShop(this: any, { id }: any) {
      const P: Profile = this.P,
        it = vk().nguon.cuaHangVuKhi.find((x) => x.id === id);
      if (!it) throw new Error("Cửa hàng không bán vũ khí này");
      if (shopLeft(P, id) < 1) throw new Error("Đã hết lượt đổi tuần này");
      if (P.coin < it.xu) throw new Error("Không đủ Xu");
      const wk = weekKey();
      if (P.wShop.week !== wk) P.wShop = { week: wk, bought: {} };
      P.wShop.bought[id] = (P.wShop.bought[id] ?? 0) + 1;
      P.coin -= it.xu;
      const w = addWeapon(P, id);
      return { uid: w.uid, left: shopLeft(P, id) };
    },
    claimWAch(this: any, { id }: any) {
      const P: Profile = this.P,
        a = vk().nguon.phoi.thanhTuu.find((x) => x.id === id);
      if (!a) throw new Error("Không có thành tựu này");
      const s = achState(P, a);
      if (s.claimed) throw new Error("Đã nhận thưởng");
      if (!s.done) throw new Error("Chưa hoàn thành");
      P.wAch.push(a.id);
      const k = vk().loRen.nguyenLieu;
      P.bag[k] = (P.bag[k] ?? 0) + a.phoi;
      return { phoi: a.phoi };
    },
    // ---- admin ----
    setConfig(this: any, c: any) {
      const cfg = this.P.cfg;
      for (const k of ["rate5", "rate4", "soft", "hard", "cost"]) {
        const v = Number(c[k]);
        if (!isFinite(v) || v < 0) throw new Error(`Giá trị "${k}" không hợp lệ`);
        cfg[k] = v;
      }
      if (cfg.rate5 > 100 || cfg.rate4 > 100) throw new Error("Tỉ lệ tối đa 100%");
      if (c.featured) {
        if (!byId[c.featured] || byId[c.featured].r !== 5) throw new Error("Banner chỉ nhận nhân vật 5★");
        if (!ECON.game.nhanVat5Sao.gioiHan.includes(c.featured))
          throw new Error("Banner chỉ nhận nhân vật 5★ giới hạn");
        if (cfg.featured !== c.featured) this.P.guaranteed = false;
        cfg.featured = c.featured;
      }
      return cfg;
    },
    give(this: any, { kind, amount }: any) {
      const a = Math.floor(Number(amount));
      if (!isFinite(a)) throw new Error("Số lượng không hợp lệ");
      const k = ({ gem: "gems", coin: "coin", book: "books" } as Record<string, string>)[kind];
      if (!k) throw new Error("Loại không hợp lệ");
      const before = this.P[k];
      this.P[k] = capRes(before + a);
      if (k === "gems") this.econ("vao:admin", this.P[k] - before);
      return this.P[k];
    },
    giveItem(this: any, { id, amount }: any) {
      const P: Profile = this.P,
        a = Math.floor(Number(amount));
      if (!isFinite(a)) throw new Error("Số lượng không hợp lệ");
      if (!grantItems().includes(id)) throw new Error("Vật phẩm không cấp được");
      P.bag[id] = capRes((P.bag[id] ?? 0) + a);
      return P.bag[id];
    },
    giveMax(this: any) {
      const P: Profile = this.P,
        before = P.gems;
      for (const k of ["gems", "coin", "books"] as const) P[k] = Math.max(P[k], TEST_MAX);
      for (const id of grantItems()) P.bag[id] = Math.max(P.bag[id] ?? 0, TEST_MAX);
      this.econ("vao:admin", P.gems - before);
      return { gems: P.gems, coin: P.coin };
    },
    setWConfig(this: any, c: any) {
      const P = this.P,
        cfg = { ...P.wcfg };
      for (const k of ["rate5", "rate4", "soft", "hard", "cost"] as const) {
        const v = Number(c[k] ?? cfg[k]);
        if (!isFinite(v) || v < 0) throw new Error(`Giá trị "${k}" không hợp lệ`);
        cfg[k] = v;
      }
      if (cfg.rate5 > 100 || cfg.rate4 > 100) throw new Error("Tỉ lệ tối đa 100%");
      if (cfg.soft > cfg.hard || cfg.hard < 1) throw new Error("Lượt tăng tỉ lệ phải ≤ lượt chắc chắn");
      if (c.featured) {
        const f = c.featured;
        if (!Array.isArray(f) || f.length !== 2 || f[0] === f[1])
          throw new Error("Cần đúng 2 vũ khí nổi bật khác nhau");
        for (const id of f)
          if (wDef(id)?.r !== 5 || wDef(id)?.nguon !== "gioiHan") throw new Error("Vũ khí nổi bật phải là 5★ giới hạn");
        if ([...f].sort().join() !== [...cfg.featured].sort().join()) {
          P.wPick = null;
          P.wPity.laBan = 0;
          P.wPity.guaranteed = false;
        }
        cfg.featured = [f[0], f[1]];
      }
      P.wcfg = cfg;
      return cfg;
    },
    // ---- Bảo Ấn (S31) ----
    baget(this: any, uid: string): BaoAnInst {
      const a = this.P.baoAn[uid];
      if (!a) throw new Error("Không có Bảo Ấn này");
      return a;
    },
    equipBaoAn(this: any, { char, uid, swap = false }: any) {
      const P: Profile = this.P,
        o = P.owned[char];
      if (!o) throw new Error("Bạn chưa có nhân vật này");
      const a: BaoAnInst = this.routes.baget.call(this, uid);
      o.ba = o.ba ?? {};
      if (o.ba[a.o] === uid) return { char, uid, from: null };
      const from = baHolders(P)[uid] ?? null;
      if (from && !swap) throw new Error(`Bảo Ấn đang ở ${byId[from]?.name ?? from}, cần xác nhận đổi`);
      const mine = o.ba[a.o];
      if (from) {
        const fo = P.owned[from]!.ba!;
        if (mine) fo[a.o] = mine;
        else delete fo[a.o];
      }
      o.ba[a.o] = uid;
      return { char, uid, from };
    },
    unequipBaoAn(this: any, { char, o }: any) {
      const w = this.P.owned[char];
      if (!w) throw new Error("Bạn chưa có nhân vật này");
      if (w.ba) delete w.ba[o as SlotId];
      return true;
    },
    lockBaoAn(this: any, { uid, lock }: any) {
      const a: BaoAnInst = this.routes.baget.call(this, uid);
      a.lock = !!lock;
      return a.lock;
    },
    /** Nâng cấp bằng Sáp Ấn và Bảo Ấn khác. Tốn Xu theo kinh nghiệm thực nhận; trả về các mốc +4 vừa tung. */
    upgradeBaoAn(this: any, { uid, sap = {}, mats = [] }: any) {
      const P: Profile = this.P,
        a: BaoAnInst = this.routes.baget.call(this, uid);
      if (a.lv >= baCapOf(BA, a.r)) throw new Error("Đã đạt cấp tối đa");
      const hold = baHolders(P);
      let exp = 0;
      const sapUse: [string, number][] = [];
      for (const [id, raw] of Object.entries(sap)) {
        const k = Math.floor(Number(raw));
        if (!k) continue;
        const s = BA.kinhNghiem.sap.find((x) => x.id === id);
        if (!s || k < 0) throw new Error("Nguyên liệu không hợp lệ");
        if ((P.bag[id] ?? 0) < k) throw new Error("Không đủ Sáp Ấn");
        exp += k * s.kinhNghiem;
        sapUse.push([id, k]);
      }
      const list: string[] = [...new Set<string>(Array.isArray(mats) ? mats : [])];
      for (const m of list) {
        const f: BaoAnInst = this.routes.baget.call(this, m);
        if (m === uid) throw new Error("Không dùng chính món đang nâng");
        if (f.lock) throw new Error("Bảo Ấn đã khóa");
        if (hold[m]) throw new Error("Bảo Ấn đang được mặc");
        exp += baFodderExp(BA, f);
      }
      if (!exp) throw new Error("Chưa chọn nguyên liệu");
      const probe = { ...a, phu: a.phu.map((x) => ({ ...x })) };
      const used = baAddExp(BA, probe, exp, () => 0).used,
        cost = Math.ceil(used * BA.kinhNghiem.xuMoiKinhNghiem);
      if (P.coin < cost) throw new Error(`Không đủ Xu: cần ${fmt(cost)}`);
      P.coin -= cost;
      for (const [id, k] of sapUse) P.bag[id] -= k;
      for (const m of list) delete P.baoAn[m];
      const from = a.lv;
      const { rolls } = baAddExp(BA, a, exp, Math.random);
      return { from, lv: a.lv, exp: a.exp, used, coin: cost, rolls: rolls as MilestoneRoll[] };
    },
    /** Phân rã nhiều món cùng lúc (bỏ qua món khóa hoặc đang mặc thì báo lỗi). */
    dismantleBaoAn(this: any, { uids = [] }: any) {
      const P: Profile = this.P,
        hold = baHolders(P);
      const list: string[] = [...new Set<string>(Array.isArray(uids) ? uids : [])];
      if (!list.length) throw new Error("Chưa chọn Bảo Ấn");
      const items = list.map((u) => this.routes.baget.call(this, u) as BaoAnInst);
      if (items.some((a) => a.lock)) throw new Error("Có món đã khóa");
      if (items.some((a) => hold[a.uid])) throw new Error("Có món đang được mặc");
      const got: Record<string, number> = {};
      for (const a of items) {
        const y = dismantleYield(BA, a);
        got["bui-an"] = (got["bui-an"] ?? 0) + y.bui;
        for (const [k, n] of Object.entries(y.sap)) got[k] = (got[k] ?? 0) + n;
        delete P.baoAn[a.uid];
      }
      for (const [k, n] of Object.entries(got)) P.bag[k] = capRes((P.bag[k] ?? 0) + n);
      return { n: items.length, got };
    },
    /** Đổi Bụi Ấn lấy Bảo Ấn 5★ cấp 0, chọn bộ, ô (và chỉ số chính nếu là Ấn Chọn Chính), có giới hạn tuần. */
    exchangeBaoAn(this: any, { id, bo, o, chinh }: any) {
      const P: Profile = this.P,
        d = BA.doi.find((x) => x.id === id);
      if (!d) throw new Error("Không có lựa chọn đổi này");
      if (!BA.bo.some((b) => b.id === bo) || !SLOT_IDS.includes(o)) throw new Error("Bộ hoặc ô không hợp lệ");
      if (baDoiLeft(P, id) < 1) throw new Error("Đã hết lượt đổi tuần này");
      if ((P.bag["bui-an"] ?? 0) < d.buiAn) throw new Error(`Cần ${d.buiAn} Bụi Ấn`);
      const a = addBaoAn(P, { bo, o, r: 5, chinh: d.chon.includes("chinh") ? chinh : undefined });
      const wk = weekKey();
      if (P.baDoi.week !== wk) P.baDoi = { week: wk, used: {} };
      P.baDoi.used[id] = (P.baDoi.used[id] ?? 0) + 1;
      P.bag["bui-an"] -= d.buiAn;
      return { uid: a.uid, left: baDoiLeft(P, id) };
    },
    /** Nhận thưởng một lượt Bí Cảnh Bảo Ấn (gọi khi thắng trận): tốn Linh Lực, rơi đồ theo Thiên Tượng tt. */
    baoAnDomain(this: any, { id, tt }: any) {
      const P: Profile = this.P,
        B = BA.biCanh,
        dom = B.danhSach.find((x) => x.id === id);
      if (!dom) throw new Error("Không có bí cảnh này");
      if (hoTinhOf(P) < B.moCapHoTinh) throw new Error(`Cần một Hộ Tinh cấp ${B.moCapHoTinh}`);
      const t = Math.floor(Number(tt ?? ttMaxOf(P)));
      if (!(t >= 0 && t <= ttMaxOf(P))) throw new Error("Chưa mở mức Thiên Tượng này");
      const now = Date.now(),
        cur = linhLucNow(P, now);
      if (cur < B.linhLuc) throw new Error(`Cần ${B.linhLuc} Linh Lực`);
      P.ll = { v: cur - B.linhLuc, t: now };
      const roi = B.roi[t]!,
        items: string[] = [];
      for (const [r, e] of [
        [3, roi.r3],
        [4, roi.r4],
        [5, roi.r5],
      ] as [BaRarity, number][]) {
        const n = Math.floor(e) + (Math.random() < e - Math.floor(e) ? 1 : 0);
        for (let i = 0; i < n; i++) {
          const bo = pick(dom.bo),
            o = pick([...SLOT_IDS]);
          items.push(addBaoAn(P, { bo, o, r }).uid);
        }
      }
      const sap = domainSap(t);
      for (const [k, n] of Object.entries(sap)) P.bag[k] = capRes((P.bag[k] ?? 0) + n);
      P.coin = capRes(P.coin + B.xu);
      bump(P, "baoAnDomain");
      return { items, sap, coin: B.xu, ll: Math.floor(P.ll.v), tt: t };
    },
    /** Admin: cấp Bảo Ấn để thử (bộ, ô, độ hiếm, chỉ số chính, dòng phụ, cấp). */
    giveBaoAn(this: any, { bo, o, r = 5, chinh, phu, lv = 0 }: any) {
      const rr = Number(r) as BaRarity;
      if (![3, 4, 5].includes(rr)) throw new Error("Độ hiếm phải là 3, 4 hoặc 5");
      if (!SLOT_IDS.includes(o)) throw new Error("Ô không hợp lệ");
      const a = addBaoAn(this.P, {
        bo,
        o,
        r: rr,
        chinh: chinh || undefined,
        phu: Array.isArray(phu) ? (phu as StatId[]) : undefined,
      });
      const target = Math.min(baCapOf(BA, rr), Math.max(0, Math.floor(Number(lv) || 0)));
      let need = 0;
      for (let l = 0; l < target; l++) need += expToNext(BA, rr, l);
      if (need) baAddExp(BA, a, need, Math.random);
      return a;
    },
    giveWeapon(this: any, { id }: any) {
      return addWeapon(this.P, id);
    },
    giveChar(this: any, { id }: any) {
      if (!byId[id]) throw new Error("Không có nhân vật này");
      return this.grant(id);
    },
    maxLv(this: any, { id }: any) {
      const o = this.P.owned[id];
      if (!o) throw new Error("Bạn chưa có nhân vật này");
      o.lv = 60;
      return 60;
    },
    setGm(this: any, g: any) {
      Object.assign(this.P.gm, g);
      return this.P.gm;
    },
    resetDaily(this: any) {
      this.P.daily = genDaily(todayKey() + "-" + Date.now());
      return true;
    },
    wipe(this: any) {
      this.P = freshProfile();
      this.ensureDaily();
      return true;
    },
  },
};
export function lvCost(lv: number) {
  return lvCostOf(lv, ECON);
}
/** Đầu tư của một nhân vật để tính chỉ số: cấp, Nét Sao và vũ khí đang trang bị. */
/** Ô Bảo Ấn thay thử (so sánh trước khi mặc): uid mới hoặc null để tháo. */
export type BaOverride = Partial<Record<SlotId, string | null>>;
export function investOf(id: string, vkOverride?: string | null, baOverride?: BaOverride): Invest {
  const o = Server.P.owned[id] || { lv: 1, cons: 0 };
  const uid = vkOverride === undefined ? o.vk : vkOverride;
  const w = uid ? Server.P.weapons?.[uid] : undefined;
  const ba = Server.P.owned[id] ? worn(Server.P, id, baOverride) : [];
  return {
    lv: o.lv,
    cons: o.cons,
    vuKhi: w ? { id: w.id, tinhLuyen: w.tl, lv: w.lv } : null,
    baoAn: ba.length ? bonusOf(BA, ba, byId[id]?.el) : null,
  };
}
export function statsOf(id: string, vk?: string | null, ba?: BaOverride) {
  const { skill: _s, ...st } = charStats(byId[id], investOf(id, vk, ba), ECON);
  return st;
}
/** Chiến Lực một nhân vật đang có (cấp, Nét Sao, vũ khí, Bảo Ấn; Khai Tinh chưa có trong game). */
export function powerOf(id: string, vk?: string | null, ba?: BaOverride) {
  return chienLuc(charStats(byId[id], investOf(id, vk, ba), ECON), ECON);
}
