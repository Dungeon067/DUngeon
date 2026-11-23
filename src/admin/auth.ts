/* Đăng nhập trang Admin (S10). CHỈ LÀ CHẶN TẠM: chưa có server, mọi thứ chạy trên trình duyệt nên ai đọc mã nguồn cũng vượt được.
   Khi có server thật, xác thực chuyển lên server. Repo chỉ giữ salt và hash PBKDF2, không giữ mật khẩu gốc. */
import type { AdminCfg } from "../data/menu-schema";

export const SESSION_KEY = "tinhtu-admin-session";

export async function derive(pw: string, salt: string, iterations: number): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: enc.encode(salt), iterations },
    key,
    256,
  );
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** So sánh hết chuỗi, không dừng sớm ở ký tự khác đầu tiên. */
function same(a: string, b: string) {
  let d = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0;
}

export async function checkPassword(pw: string, cfg: AdminCfg) {
  if (!pw) return false;
  return same(await derive(pw, cfg.login.salt, cfg.login.iterations), cfg.login.hash);
}

export function startSession(cfg: AdminCfg, now = Date.now(), store: Storage = sessionStorage) {
  store.setItem(SESSION_KEY, String(now + cfg.sessionMinutes * 60_000));
}
export function hasSession(now = Date.now(), store: Storage = sessionStorage) {
  const t = Number(store.getItem(SESSION_KEY));
  return isFinite(t) && t > now;
}
export function endSession(store: Storage = sessionStorage) {
  store.removeItem(SESSION_KEY);
}
