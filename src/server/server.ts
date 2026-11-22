import { fmt, pick, todayKey } from "../core/util";
import { CHARS, DAILY_POOL, DEFAULT_CFG, ITEMS3, START_PROFILE, byId } from "../data/content";
import { give } from "../ui/admin";
import { toast } from "../ui/toast";

export function freshProfile() {
  return {
    v: 2,
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
  };
}
export function genDaily(seedKey) {
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
  P: null,
  log: [],
  load() {
    try {
      const s = localStorage.getItem("tinhtu-v2");
      if (s) this.P = JSON.parse(s);
    } catch (e) {}
    if (!this.P || this.P.v !== 2) this.P = freshProfile();
    this.ensureDaily();
  },
  save() {
    try {
      localStorage.setItem("tinhtu-v2", JSON.stringify(this.P));
    } catch (e) {}
  },
  ensureDaily() {
    const k = todayKey();
    if (!this.P.daily || this.P.daily.date !== k) this.P.daily = genDaily(k);
  },
  req(action, payload = {}) {
    const fn = this.routes[action];
    let res;
    if (!fn) res = { ok: false, error: "Không có lệnh này" };
    else {
      try {
        res = { ok: true, data: fn.call(this, payload) };
        this.save();
      } catch (e) {
        res = { ok: false, error: e.message };
      }
    }
    if (action !== "progress") {
      this.log.unshift({ a: action, p: payload, ok: res.ok, msg: res.ok ? "200 OK" : res.error });
      if (this.log.length > 80) this.log.pop();
    }
    if (!res.ok) toast(res.error);
    return res;
  },
  grant(id) {
    const P = this.P,
      c = byId[id];
    if (P.owned[id]) {
      if (P.owned[id].cons < 6) {
        P.owned[id].cons++;
        return { dup: true, cons: P.owned[id].cons };
      }
      P.coin += c.r === 5 ? 20000 : 5000;
      return { dup: true, cons: 6, max: true };
    }
    P.owned[id] = { lv: 1, cons: 0 };
    return { dup: false, cons: 0 };
  },
  rollOne() {
    const P = this.P,
      cfg = P.cfg;
    P.pity5++;
    P.pity4++;
    let p5 = cfg.rate5 / 100;
    if (P.pity5 >= cfg.soft) p5 += (P.pity5 - cfg.soft + 1) * 0.06;
    if (P.pity5 >= cfg.hard) p5 = 1;
    const r = Math.random();
    let out;
    if (r < p5) {
      P.pity5 = 0;
      P.pity4 = 0;
      let c,
        feat = false;
      if (P.guaranteed || Math.random() < 0.5) {
        c = byId[cfg.featured];
        P.guaranteed = false;
        feat = true;
      } else {
        const pool = CHARS.filter((x) => x.r === 5 && x.id !== cfg.featured);
        c = pick(pool);
        P.guaranteed = true;
      }
      out = { kind: "char", id: c.id, r: 5, name: c.name, feat, ...this.grant(c.id) };
    } else if (P.pity4 >= 10 || r < p5 + cfg.rate4 / 100) {
      P.pity4 = 0;
      const c = pick(CHARS.filter((x) => x.r === 4));
      out = { kind: "char", id: c.id, r: 4, name: c.name, ...this.grant(c.id) };
    } else {
      P.coin += 500;
      out = { kind: "item", r: 3, name: pick(ITEMS3) };
    }
    P.history.unshift({ n: out.name, r: out.r, t: Date.now() });
    if (P.history.length > 100) P.history.pop();
    return out;
  },
  bumpDaily(id, n = 1) {
    const d = this.P.daily;
    if (!d) return;
    for (const t of d.tasks) if (t.id === id && !t.claimed) t.prog = Math.min(t.goal, t.prog + n);
  },
  routes: {
    pull({ count }) {
      const n = count === 10 ? 10 : 1,
        P = this.P,
        cost = P.cfg.cost * n;
      if (P.gems < cost) throw new Error(`Không đủ Đá Sao: cần ${fmt(cost)}, đang có ${fmt(P.gems)}`);
      P.gems -= cost;
      const out = [];
      for (let i = 0; i < n; i++) out.push(this.rollOne());
      this.bumpDaily("wish", n);
      return out;
    },
    setParty({ party }) {
      if (!Array.isArray(party) || party.length < 1 || party.length > 4) throw new Error("Đội cần từ 1 đến 4 người");
      if (party.some((id) => !this.P.owned[id])) throw new Error("Bạn chưa có nhân vật này");
      if (new Set(party).size !== party.length) throw new Error("Nhân vật bị trùng");
      this.P.party = party;
      return party;
    },
    levelUp({ id, times }) {
      const P = this.P,
        o = P.owned[id];
      if (!o) throw new Error("Bạn chưa có nhân vật này");
      let n = 0;
      for (let i = 0; i < (times || 1); i++) {
        if (o.lv >= 60) break;
        const c = lvCost(o.lv);
        if (P.books < c.books || P.coin < c.coin) break;
        P.books -= c.books;
        P.coin -= c.coin;
        o.lv++;
        n++;
      }
      if (!n) throw new Error(o.lv >= 60 ? "Đã đạt cấp tối đa" : "Không đủ Sách Kinh Nghiệm hoặc Xu");
      return o.lv;
    },
    reward({ gems = 0, coin = 0, books = 0 }) {
      const P = this.P;
      P.gems += Math.max(0, gems | 0);
      P.coin += Math.max(0, coin | 0);
      P.books += Math.max(0, books | 0);
      return true;
    },
    openChest({ idx }) {
      const P = this.P;
      if (P.chests.includes(idx)) throw new Error("Rương này đã mở");
      P.chests.push(idx);
      const g = 20 + Math.floor(Math.random() * 4) * 10,
        c = 1500 + Math.floor(Math.random() * 1500),
        b = 2 + Math.floor(Math.random() * 3);
      P.gems += g;
      P.coin += c;
      P.books += b;
      this.bumpDaily("chest");
      return { gems: g, coin: c, books: b };
    },
    towerClear({ floor, stars }) {
      const P = this.P,
        old = P.tower[floor] || 0,
        gain = Math.max(0, stars - old);
      P.tower[floor] = Math.max(old, stars);
      const gems = gain * 30,
        coin = 2000 + floor * 400,
        books = 2 + Math.floor(floor / 3);
      P.gems += gems;
      P.coin += coin;
      P.books += books;
      this.bumpDaily("tower");
      return { gems, coin, books, newStars: gain };
    },
    bossClear({ lv }) {
      const P = this.P,
        first = !P.boss[lv];
      P.boss[lv] = true;
      const gems = first ? 100 + lv * 40 : 20,
        coin = 6000 + lv * 3000,
        books = 6 + lv * 3;
      P.gems += gems;
      P.coin += coin;
      P.books += books;
      this.bumpDaily("boss");
      return { gems, coin, books, first };
    },
    progress({ id, n }) {
      this.bumpDaily(id, n);
      if (id === "kill") this.P.stats.kills += n;
      if (id === "react") this.P.stats.reacts += n;
      return true;
    },
    claimTask({ i }) {
      const d = this.P.daily,
        t = d.tasks[i];
      if (!t) throw new Error("Không có nhiệm vụ này");
      if (t.claimed) throw new Error("Đã nhận thưởng");
      if (t.prog < t.goal) throw new Error("Chưa hoàn thành");
      t.claimed = true;
      this.P.gems += 30;
      this.P.coin += 3000;
      return { gems: 30, coin: 3000 };
    },
    claimBonus() {
      const d = this.P.daily;
      if (d.bonus) throw new Error("Đã nhận thưởng");
      if (!d.tasks.every((t) => t.claimed)) throw new Error("Nhận đủ 4 nhiệm vụ trước");
      d.bonus = true;
      this.P.gems += 60;
      this.P.books += 5;
      return { gems: 60, books: 5 };
    },
    // ---- admin ----
    setConfig(c) {
      const cfg = this.P.cfg;
      for (const k of ["rate5", "rate4", "soft", "hard", "cost"]) {
        const v = Number(c[k]);
        if (!isFinite(v) || v < 0) throw new Error(`Giá trị "${k}" không hợp lệ`);
        cfg[k] = v;
      }
      if (cfg.rate5 > 100 || cfg.rate4 > 100) throw new Error("Tỉ lệ tối đa 100%");
      if (c.featured) {
        if (!byId[c.featured] || byId[c.featured].r !== 5) throw new Error("Banner chỉ nhận nhân vật 5★");
        if (cfg.featured !== c.featured) this.P.guaranteed = false;
        cfg.featured = c.featured;
      }
      return cfg;
    },
    give({ kind, amount }) {
      const a = Math.floor(Number(amount));
      if (!isFinite(a)) throw new Error("Số lượng không hợp lệ");
      const k = { gem: "gems", coin: "coin", book: "books" }[kind];
      if (!k) throw new Error("Loại không hợp lệ");
      this.P[k] = Math.max(0, this.P[k] + a);
      return this.P[k];
    },
    giveChar({ id }) {
      if (!byId[id]) throw new Error("Không có nhân vật này");
      return this.grant(id);
    },
    maxLv({ id }) {
      const o = this.P.owned[id];
      if (!o) throw new Error("Bạn chưa có nhân vật này");
      o.lv = 60;
      return 60;
    },
    setGm(g) {
      Object.assign(this.P.gm, g);
      return this.P.gm;
    },
    resetDaily() {
      this.P.daily = genDaily(todayKey() + "-" + Date.now());
      return true;
    },
    wipe() {
      this.P = freshProfile();
      this.ensureDaily();
      return true;
    },
  },
};
export function lvCost(lv) {
  return { books: 1 + Math.floor(lv / 6), coin: 300 + lv * 120 };
}
export function statsOf(id) {
  const c = byId[id],
    o = Server.P.owned[id] || { lv: 1, cons: 0 };
  const g = 1 + (o.lv - 1) * 0.07,
    cb = 1 + o.cons * 0.1;
  return {
    lv: o.lv,
    cons: o.cons,
    hp: Math.round(c.hp * g * cb * 1.0),
    atk: Math.round(c.atk * g * cb),
    crit: c.r === 5 ? 0.25 : 0.15,
    cdmg: c.r === 5 ? 0.9 : 0.6,
  };
}
