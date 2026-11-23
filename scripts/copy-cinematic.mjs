/* Chép video ước nguyện S20 (media/cinematic/out) vào dist khi build: âm thanh, video 720p (WebM, MP4) và
   1080p WebM. File con trỏ Git LFS (chưa kéo LFS) bị bỏ qua và gỡ khỏi timeline.json, game tự dùng bản code.
   Tên file trong dist có thêm mã băm nội dung, nên dựng lại video hay âm thanh thì cache PWA (CacheFirst) lấy bản mới. */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SRC = "media/cinematic/out";
const DST = "dist/media/cinematic/out";
const real = (f) => {
  const p = join(SRC, f);
  if (!existsSync(p) || statSync(p).size < 2048) return false;
  return !readFileSync(p).subarray(0, 40).toString().startsWith("version https://git-lfs");
};
const ship = (f) => /-720\.(webm|mp4)$|-1080\.webm$|\.(ogg|mp3)$/.test(f);
const copy = (f) => {
  const h = createHash("sha256")
    .update(readFileSync(join(SRC, f)))
    .digest("hex")
    .slice(0, 10);
  const out = f.replace(/(\.[a-z0-9]+)$/, `.${h}$1`);
  mkdirSync(dirname(join(DST, out)), { recursive: true });
  copyFileSync(join(SRC, f), join(DST, out));
  return out;
};

const tl = JSON.parse(readFileSync(join(SRC, "timeline.json"), "utf8"));
let n = 0;
for (const [id, v] of Object.entries(tl.variants)) {
  for (const h of Object.keys(v.video)) {
    v.video[h] = v.video[h].filter((f) => ship(f) && real(f));
    if (!v.video[h].length) delete v.video[h];
  }
  v.audio = v.audio.filter(real);
  if (!Object.keys(v.video).length) {
    delete tl.variants[id];
    continue;
  }
  for (const h of Object.keys(v.video)) v.video[h] = v.video[h].map(copy);
  v.audio = v.audio.map(copy);
  n += Object.values(v.video).flat().length + v.audio.length;
}
mkdirSync(DST, { recursive: true });
writeFileSync(join(DST, "timeline.json"), JSON.stringify(tl));
console.log(`cinematic: ${Object.keys(tl.variants).length} bản video, ${n} file`);
