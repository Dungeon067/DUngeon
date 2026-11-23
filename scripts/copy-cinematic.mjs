/* Chép video ước nguyện S20 (media/cinematic/out) vào dist khi build: âm thanh, video 720p (WebM, MP4) và
   1080p WebM. File con trỏ Git LFS (chưa kéo LFS) bị bỏ qua và gỡ khỏi timeline.json, game tự dùng bản code. */
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
  mkdirSync(dirname(join(DST, f)), { recursive: true });
  copyFileSync(join(SRC, f), join(DST, f));
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
  for (const f of [...Object.values(v.video).flat(), ...v.audio]) (copy(f), n++);
}
mkdirSync(DST, { recursive: true });
writeFileSync(join(DST, "timeline.json"), JSON.stringify(tl));
console.log(`cinematic: ${Object.keys(tl.variants).length} bản video, ${n} file`);
