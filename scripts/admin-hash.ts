/* pnpm admin:hash "mật-khẩu-mới": in salt và hash PBKDF2-SHA256 để dán vào content/admin.yaml (mục login).
   Mật khẩu gốc không được ghi vào repo. */
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

const pw = process.argv[2];
if (!pw) {
  console.error('Cách dùng: pnpm admin:hash "mật-khẩu-mới"');
  process.exit(1);
}
const iterations = Number(parse(readFileSync("content/admin.yaml", "utf8"))?.login?.iterations) || 120000;
const salt = randomBytes(16).toString("hex");
const hash = pbkdf2Sync(pw, salt, iterations, 32, "sha256").toString("hex");
console.log(
  `Dán hai dòng sau vào mục login của content/admin.yaml (thay salt và hash cũ):\n  salt: ${salt}\n  hash: ${hash}`,
);
