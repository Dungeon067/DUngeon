/** Bí Cảnh Bảo Ấn (S31): đấu trường 3D của Tháp (S28), quái theo bí cảnh, độ khó theo Thiên Tượng. Thắng thì mở rương. */
import { GS } from "../core/state";
import { BA } from "../data/bao-an";
import { newSession } from "../entities/party";
import { enterPlay, showBanner } from "./session";
import { towerWaves } from "./tower";

export const baoAnFloor = (tt: number) => Math.min(12, 2 + tt);

export function startBaoAn(id: string, tt: number) {
  const d = BA.biCanh.danhSach.find((x) => x.id === id);
  if (!d) throw new Error("Không có bí cảnh này");
  const floor = baoAnFloor(tt);
  GS.G = newSession("baoan", { id, tt });
  GS.G.bounds = { x: 0, y: 0, w: 1000, h: 760 };
  GS.G.p.x = 500;
  GS.G.p.y = 620;
  const waves = towerWaves(floor).map((w, wi) => ({
    ...w,
    list: w.list.map((t: string, i: number) => (t === "golem" ? t : d.quai[(i + wi) % d.quai.length]!)),
  }));
  GS.G.tower = { floor, wave: 0, timeLeft: 180, waves, gap: 1.5 };
  GS.G.ba = { id, tt, ten: d.ten };
  enterPlay();
  showBanner(`${d.ten} · Thiên Tượng ${tt}`);
}
