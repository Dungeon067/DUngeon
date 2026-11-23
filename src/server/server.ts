import type { LogEntry, Profile } from "./types";
import { fmt, pick, todayKey } from "../core/util";
import { CHARS, DAILY_POOL, DEFAULT_CFG, ITEMS3, START_PROFILE, byId } from "../data/content";
import { toast } from "../ui/toast";
import { ECON } from "../data/economy";
import { charStats, chienLuc, lvCost as lvCostOf, rollRarity } from "../economy/core";

export const SAVE_KEY = "tinhtu-v3";
export const OLD_SAVE_KEY = "tinhtu-v2";
/** Nhật ký request dùng chung giữa game và trang Admin (cùng localStorage). */
export const LOG_KEY = "tinhtu-log";
/** Cỡ một khối sương bản đồ (ô). Bản đồ 110×110 ô thành 22×22 khối. */
export const FOG = 5;
export const FOG_N = 22;

export function freshProfile(): Profile {
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
  };
}
/** Chuyển hồ sơ cũ (v2) lên v3, giữ toàn bộ dữ liệu đã có. */
export function migrate(old: any): Profile | null {
  if (!old || typeof old !== "object") return null;
  if (old.v === 3) return withLimitedBanner({ ...freshProfile(), ...old });
  if (old.v !== 2) return null;
  const base = freshProfile();
  const party = Array.isArray(old.party) && old.party.length ? old.party : base.party;
  return withLimitedBanner({ ...base, ...old, v: 3, party, teams: [[...party], [], [], []], team: 0 });
}
/** Hồ sơ cũ có banner nổi bật không còn là 5★ giới hạn (ví dụ Lạc Hồng trước S23): chuyển về banner mặc định. */
function withLimitedBanner(p: Profile): Profile {
  if (!ECON.game.nhanVat5Sao.gioiHan.includes(p.cfg?.featured))
    p.cfg = { ...DEFAULT_CFG, ...p.cfg, featured: DEFAULT_CFG.featured };
  return p;
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
    P.owned[id] = { lv: 1, cons: 0 };
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
      out = { kind: "item", r: 3, name: pick(ITEMS3) };
    }
    P.history.unshift({ n: out.name, r: out.r, t: Date.now() });
    if (P.history.length > 100) P.history.pop();
    return out;
  },
  /** Ghi Đá Sao vào/ra theo nguồn để trang Admin thống kê kinh tế. */
  econ(key: string, n: number) {
    if (!n) return;
    this.P.econ[key] = (this.P.econ[key] ?? 0) + n;
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
      return { gems: daSao, books: sach };
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
      this.P[k] = Math.max(0, this.P[k] + a);
      if (k === "gems") this.econ("vao:admin", a);
      return this.P[k];
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
export function statsOf(id: string) {
  const o = Server.P.owned[id] || { lv: 1, cons: 0 };
  const { dmg: _d, skill: _s, ...st } = charStats(byId[id], o, ECON);
  return st;
}
/** Chiến Lực một nhân vật đang có (cấp và Nét Sao; vũ khí, Bảo Ấn, Khai Tinh chưa có trong game). */
export function powerOf(id: string) {
  const o = Server.P.owned[id] || { lv: 1, cons: 0 };
  return chienLuc(charStats(byId[id], o, ECON), ECON);
}
