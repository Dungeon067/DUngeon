import { GS } from "../../core/state";
import { byId } from "../../data/content";
import { CINEMATIC } from "../../data/menu-content";
import { hasProfile, loadProfile } from "../../data/profiles";
import { plain } from "../../data/markdown";
import { Server, wDef } from "../../server/server";
import { preloadWeaponArt } from "../weapon-art";
import { createCinematic } from "./cinematic";
import type { CineItem } from "./cinematic";

/**
 * WishPlayer (S10): phát cảnh ước nguyện. Nếu content/cinematic.yaml có video cho độ hiếm cao nhất
 * (S20) thì phát video trước rồi vào phần giới thiệu nhân vật bằng code; thiếu video, video lỗi hoặc
 * tải quá videoTimeoutMs thì chạy toàn bộ bằng code (cinematic.ts).
 */
const $ = (id: string) => document.getElementById(id)!;
let cine: ReturnType<typeof createCinematic> | null = null;
let done: (() => void) | null = null;
const lines: Record<string, string> = {};

export function normalize(list: any[]): CineItem[] {
  return list.map((x) =>
    x.kind === "char"
      ? { kind: "char", id: x.id, r: x.r, name: x.name, feat: !!x.feat, isNew: !x.dup }
      : x.kind === "weapon"
        ? { kind: "item", r: x.r, name: x.name, k: wDef(x.id)?.loai ?? "sword", wid: x.id, feat: !!x.feat }
        : { kind: "item", r: 3, name: typeof x.name === "string" ? x.name : String(x.name?.n ?? x.name), k: "sword" },
  );
}

/** Câu thoại "Nhận qua Ước nguyện" trong docs/characters/<id>/loi-thoai.md, hoặc mô tả gốc. */
async function preloadLines(list: CineItem[]) {
  await Promise.all(
    list
      .filter((x) => x.kind === "char" && x.id && !(x.id in lines))
      .map(async (x) => {
        const id = x.id!;
        lines[id] = byId[id]?.desc ?? "";
        if (!hasProfile(id)) return;
        try {
          const doc = (await loadProfile(id))["loi-thoai"];
          for (const s of doc?.sections ?? [])
            for (const b of s.blocks)
              if (b.t === "table") {
                const row = b.rows.find((r) => r.some((c) => /Ước nguyện/i.test(c)));
                if (row) {
                  lines[id] = plain(row[row.length - 1]).replace(/^"|"$/g, "");
                  return;
                }
              }
        } catch {
          /* giữ mô tả gốc */
        }
      }),
  );
}

function ensure() {
  if (cine) return cine;
  const fx = $("wishFx");
  const skipBtn = $("wishSkip") as HTMLButtonElement;
  const hint = $("wishHint");
  cine = createCinematic($("wishCv") as HTMLCanvasElement, {
    sound: () => GS.soundOn,
    done: () => finish(),
    featured: () => Server.P?.cfg?.featured ?? "loidinh",
    line: (id) => lines[id] ?? byId[id]?.desc ?? "",
    skipBtn,
    hint,
  });
  skipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cine!.skip();
  });
  fx.addEventListener("pointerdown", (e) => {
    if ((e.target as HTMLElement).id === "wishSkip") return;
    cine!.tap();
  });
  addEventListener("resize", () => !fx.hidden && cine!.resize());
  return cine;
}

export function wishKey(e: KeyboardEvent) {
  if (!cine || $("wishFx").hidden) return false;
  if (e.key === "Escape") cine.skip();
  else if (e.key === " " || e.key === "Enter") cine.tap();
  else return false;
  e.preventDefault();
  return true;
}

export const wishPlaying = () => !!cine && !$("wishFx").hidden;

function finish() {
  const fx = $("wishFx");
  fx.hidden = true;
  ($("wishVid") as HTMLVideoElement).pause();
  $("wishVid").hidden = true;
  const cb = done;
  done = null;
  cb?.();
}

function playVideo(src: string): Promise<boolean> {
  const v = $("wishVid") as HTMLVideoElement;
  return new Promise((res) => {
    let settled = false;
    const end = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(to);
      v.onended = v.onerror = null;
      v.hidden = true;
      res(ok);
    };
    const to = setTimeout(() => v.readyState < 2 && end(false), CINEMATIC.videoTimeoutMs);
    v.onended = () => end(true);
    v.onerror = () => end(false);
    v.hidden = false;
    v.src = src;
    v.play().catch(() => end(false));
    $("wishSkip").onclick = () => end(true);
  });
}

/** Phát cảnh cho danh sách kết quả từ Server.req("pull"). onDone gọi khi người chơi đóng bảng tổng kết. */
export async function playWish(raw: any[], onDone?: () => void) {
  const list = normalize(raw);
  const c = ensure();
  done = onDone ?? null;
  const fx = $("wishFx");
  fx.hidden = false;
  await Promise.all([preloadLines(list), preloadWeaponArt(list.flatMap((x) => (x.wid ? [x.wid] : [])))]);
  const best = Math.max(...list.map((x) => x.r));
  const src = CINEMATIC.videos[String(best)];
  if (src && (await playVideo(src))) {
    $("wishSkip").onclick = null;
    c.play(list);
    c.skip();
    return;
  }
  $("wishSkip").onclick = null;
  c.play(list);
}
