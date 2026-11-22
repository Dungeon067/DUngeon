/* S20 preview: plays the pre-rendered wish video with separate audio, draws the banner constellation over
   scene 2, offers skip / fast-forward, and falls back to the code-driven prototype when video is not usable.
   Standalone on purpose: the game integration (S10) can copy the logic, not the file. */
"use strict";
const OUT = "../out/";
const $ = (id) => document.getElementById(id);
const vid = $("vid"), ov = $("overlay"), rv = $("reveal"), info = $("info");
const ctx = ov.getContext("2d"), rctx = rv.getContext("2d");
const params = new URLSearchParams(location.search);

// Example banner constellation: "Cánh Lạc" (a Lạc bird in flight). Points are in units of the overlay scale.
const CONSTELLATION = {
  stars: [[-1.0, 0.1], [-0.62, -0.18], [-0.25, -0.3], [0.0, -0.05], [0.28, -0.32], [0.66, -0.2], [1.0, 0.08],
          [0.0, 0.32], [-0.12, 0.62], [0.14, 0.62]],
  lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [3, 7], [7, 8], [7, 9]],
  color: "#ffe6a8",
};
const HEROES = {
  5: [["Lạc Hồng", "Hỏa"], ["Thủy Nguyệt", "Thủy"], ["Phong Vân", "Phong"]],
  4: [["Mai Linh", "Hỏa"], ["Sương Mai", "Thủy"], ["Minh Khải", "Lôi"]],
  3: [["Kiếm Sắt", ""], ["Cung Gỗ", ""]],
};
const RC = { 3: "#6fb6ff", 4: "#b98cff", 5: "#ffcf5a" };

const state = {
  tl: null, mode: params.get("mode") || "auto", wishes: 0, playing: false, variant: null,
  audio: null, fps: [], fallbackReason: null, fastForward: false, revealT: 0, result: null,
};
window.__cine = state;

function pickHeight() {
  const px = Math.max(innerWidth, innerHeight) * (devicePixelRatio || 1);
  const saver = navigator.connection && navigator.connection.saveData;
  return params.get("h") || (px > 1500 && !saver ? "1080" : "720");
}

function weakDevice() {
  if (params.get("fallback") === "1") return "đã yêu cầu bằng ?fallback=1";
  const mem = navigator.deviceMemory, cores = navigator.hardwareConcurrency;
  if (mem && mem < 2) return "máy ít bộ nhớ";
  if (cores && cores < 2) return "máy ít nhân";
  if (!vid.canPlayType('video/webm; codecs="vp9"') && !vid.canPlayType('video/mp4; codecs="avc1.640028"')) return "không phát được video";
  return null;
}

function resize() {
  const d = Math.min(2, devicePixelRatio || 1);
  for (const c of [ov, rv]) { c.width = Math.round(innerWidth * d); c.height = Math.round(innerHeight * d); }
}
addEventListener("resize", resize);

// video frame (0..1) -> overlay pixels, matching object-fit: cover
function toScreen(x, y) {
  const W = ov.width, H = ov.height, s = Math.max(W / 16, H / 9);
  const vw = 16 * s, vh = 9 * s;
  return [(W - vw) / 2 + x * vw, (H - vh) / 2 + y * vh, vh];
}

function anchorAt(t) {
  const a = state.tl.constellation.anchor;
  if (t <= a[0][0]) return a[0];
  for (let i = 1; i < a.length; i++) {
    if (a[i][0] >= t) {
      const k = (t - a[i - 1][0]) / (a[i][0] - a[i - 1][0]);
      return [t, a[i - 1][1] + (a[i][1] - a[i - 1][1]) * k, a[i - 1][2] + (a[i][2] - a[i - 1][2]) * k];
    }
  }
  return a[a.length - 1];
}

function drawConstellation(t) {
  ctx.clearRect(0, 0, ov.width, ov.height);
  const c = state.tl.constellation;
  if (t < c.drawFrom || t > c.hiddenAt) return;
  const grow = Math.min(1, (t - c.drawFrom) / (c.fullAt - c.drawFrom));
  const fade = t > c.fadeOutFrom ? 1 - (t - c.fadeOutFrom) / (c.hiddenAt - c.fadeOutFrom) : 1;
  const [, ax, ay] = anchorAt(t);
  const [sx, sy, vh] = toScreen(ax, ay);
  const R = vh * c.scale * (0.85 + 0.15 * grow);
  const P = CONSTELLATION.stars.map(([x, y]) => [sx + x * R, sy + y * R]);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = Math.max(0, fade);
  ctx.strokeStyle = "rgba(255,230,168,.55)";
  ctx.lineWidth = Math.max(1, vh / 540);
  const nl = CONSTELLATION.lines.length;
  CONSTELLATION.lines.forEach(([i, j], k) => {
    const u = Math.min(1, Math.max(0, grow * nl - k));
    if (u <= 0) return;
    ctx.beginPath();
    ctx.moveTo(P[i][0], P[i][1]);
    ctx.lineTo(P[i][0] + (P[j][0] - P[i][0]) * u, P[i][1] + (P[j][1] - P[i][1]) * u);
    ctx.stroke();
  });
  P.forEach(([x, y], k) => {
    const on = Math.min(1, Math.max(0, grow * P.length - k * 0.8));
    if (on <= 0) return;
    const r = vh * 0.012 * (1 + 0.25 * Math.sin(t * 9 + k));
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    g.addColorStop(0, "rgba(255,250,235,1)");
    g.addColorStop(0.25, "rgba(255,214,130,.8)");
    g.addColorStop(1, "rgba(255,200,90,0)");
    ctx.globalAlpha = on * fade;
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * 4, 0, 7); ctx.fill();
  });
  ctx.restore();
}

function loadVariant(name) {
  const v = state.tl.variants[name];
  const h = pickHeight();
  vid.innerHTML = "";
  const types = { webm: 'video/webm; codecs="vp9"', mp4: 'video/mp4; codecs="avc1.640028"' };
  for (const src of v.video[h]) {
    const s = document.createElement("source");
    s.src = OUT + src; s.type = types[src.split(".").pop()];
    vid.appendChild(s);
  }
  vid.load();
  const a = new Audio();
  const ogg = a.canPlayType('audio/ogg; codecs="opus"');
  a.src = OUT + (ogg ? v.audio[0] : v.audio[1]);
  a.preload = "auto";
  state.audio = a;
  state.height = h;
}

function setUI(playing) {
  $("ui").hidden = playing;
  $("skip").hidden = !playing;
  $("ff").hidden = !(playing && state.wishes >= state.tl.fastForward.allowedFromWish);
}

function rollRarity(multi) {
  const r = Math.random();
  const top = r < 0.06 ? 5 : r < 0.5 ? 4 : 3;
  return multi ? (top === 5 ? 5 : 4) : top;
}

function variantFor(multi) {
  const sel = $("variant").value;
  if (sel !== "auto") return sel;
  const r = rollRarity(multi);
  if (multi) return r === 5 ? "10x5" : "10x4";
  if (r === 5) return state.wishes % 2 ? "5b" : "5a";
  return String(r);
}

function waitReady(timeoutMs) {
  return new Promise((res) => {
    if (vid.readyState >= 3) return res(true);
    const done = (ok) => { clearTimeout(tm); vid.oncanplay = vid.onerror = null; res(ok); };
    const tm = setTimeout(() => done(false), timeoutMs);
    vid.oncanplay = () => done(true);
    vid.onerror = () => done(false);
    const last = vid.querySelector("source:last-child");
    if (last) last.onerror = () => done(false);
  });
}

async function wish(multi) {
  if (state.playing) return;
  state.wishes++;
  const name = variantFor(multi);
  state.variant = name;
  const rarity = state.tl.variants[name].rarity;
  const pool = HEROES[rarity];
  state.result = { rarity, multi, hero: pool[Math.floor(Math.random() * pool.length)] };
  const weak = state.mode === "fallback" ? "chọn chế độ dự phòng" : weakDevice();
  if (weak) return playFallback(multi, rarity, weak);
  loadVariant(name);
  const ok = await waitReady(4000);
  if (!ok) return playFallback(multi, rarity, "không tải được video");
  state.playing = true;
  state.fastForward = false;
  setUI(true);
  vid.currentTime = 0;
  vid.playbackRate = 1;
  state.audio.currentTime = 0;
  try { await vid.play(); } catch (e) { return playFallback(multi, rarity, "trình duyệt chặn phát video"); }
  state.audio.play().catch(() => {});
  vid.onended = () => startReveal();
  vid.onerror = () => { if (state.playing) playFallback(multi, rarity, "video lỗi khi phát"); };
  requestAnimationFrame(tick);
}

let lastFrame = 0;
function tick(now) {
  if (!state.playing) return;
  if (lastFrame) state.fps.push(1000 / (now - lastFrame));
  if (state.fps.length > 240) state.fps.shift();
  lastFrame = now;
  const t = vid.currentTime;
  const ffu = state.tl.fastForward.until;
  const rate = state.fastForward && t < ffu ? state.tl.fastForward.rate : 1;
  if (vid.playbackRate !== rate) { vid.playbackRate = rate; state.audio.playbackRate = rate; }
  const a = state.audio;
  if (a && !a.paused && Math.abs(a.currentTime - t) > 0.12) a.currentTime = t;
  drawConstellation(t);
  const fps = state.fps.length ? state.fps.reduce((x, y) => x + y) / state.fps.length : 0;
  info.textContent = `video ${state.variant} ${state.height}p · ${t.toFixed(2)} s · ${fps.toFixed(0)} khung/giây vẽ`;
  requestAnimationFrame(tick);
}

function stopVideo() {
  vid.pause(); vid.onended = null;
  ctx.clearRect(0, 0, ov.width, ov.height);
}

function skip() {
  if (!state.playing) return;
  if (state.audio) {
    const reveal = state.tl.cues.reveal;
    if (state.audio.currentTime < reveal) state.audio.currentTime = reveal;
  }
  startReveal();
}

// Scene 5 placeholder (in game: character art). Dark silhouette, rim light, colour rising from the feet.
function startReveal() {
  stopVideo();
  state.playing = false;
  state.revealing = true;
  $("skip").hidden = true; $("ff").hidden = true;
  rv.hidden = false;
  const t0 = performance.now();
  const col = RC[state.result.rarity];
  const draw = (now) => {
    const t = (now - t0) / 1000;
    const W = rv.width, H = rv.height;
    rctx.fillStyle = "#070b1c"; rctx.fillRect(0, 0, W, H);
    const g = rctx.createRadialGradient(W * 0.38, H * 0.55, 0, W * 0.38, H * 0.55, H * 0.8);
    g.addColorStop(0, col + "55"); g.addColorStop(1, "#070b1c00");
    rctx.fillStyle = g; rctx.fillRect(0, 0, W, H);
    const cx = W * 0.38, base = H * 0.95, h = H * 0.78;
    const rise = Math.min(1, Math.max(0, (t - 0.5) / 1.0));
    rctx.save();
    silhouettePath(rctx, cx, base, h);
    rctx.clip();
    rctx.fillStyle = "#05060c"; rctx.fillRect(0, 0, W, H);
    const lg = rctx.createLinearGradient(0, base, 0, base - h);
    lg.addColorStop(0, col); lg.addColorStop(Math.max(0.001, rise), col + "cc"); lg.addColorStop(Math.min(1, rise + 0.08), "#05060c");
    rctx.fillStyle = lg; rctx.fillRect(0, 0, W, H);
    rctx.restore();
    silhouettePath(rctx, cx, base, h);
    rctx.strokeStyle = col; rctx.lineWidth = Math.max(2, H / 300); rctx.shadowColor = col; rctx.shadowBlur = H / 40; rctx.stroke();
    rctx.shadowBlur = 0;
    if (t > 1.2) {
      const a = Math.min(1, (t - 1.2) / 0.5);
      rctx.globalAlpha = a;
      rctx.fillStyle = "#f4efe0";
      rctx.font = `600 ${Math.round(H / 11)}px "Cormorant Garamond", Georgia, serif`;
      rctx.fillText(state.result.hero[0], W * 0.6, H * 0.5);
      rctx.fillStyle = col;
      rctx.font = `${Math.round(H / 18)}px system-ui, sans-serif`;
      rctx.fillText("★".repeat(state.result.rarity), W * 0.6, H * 0.6);
      rctx.globalAlpha = 1;
    }
    if (t < 3.2 && state.revealing) requestAnimationFrame(draw); else endReveal();
  };
  requestAnimationFrame(draw);
}

function silhouettePath(c, cx, base, h) {
  const w = h * 0.36;
  c.beginPath();
  c.moveTo(cx - w * 0.55, base);
  c.quadraticCurveTo(cx - w * 0.5, base - h * 0.55, cx - w * 0.28, base - h * 0.78);
  c.quadraticCurveTo(cx - w * 0.2, base - h, cx, base - h);
  c.quadraticCurveTo(cx + w * 0.2, base - h, cx + w * 0.28, base - h * 0.78);
  c.quadraticCurveTo(cx + w * 0.5, base - h * 0.55, cx + w * 0.55, base);
  c.closePath();
}

function endReveal() {
  state.revealing = false;
  setTimeout(() => {
    rv.hidden = true;
    if (state.audio) state.audio.pause();
    setUI(false);
    info.textContent = `Lần ước ${state.wishes} xong · lần sau được tua nhanh`;
  }, 600);
}

// Code-driven fallback: the owner's prototype, driven through its own buttons.
function playFallback(multi, rarity, reason) {
  stopVideo();
  state.fallbackReason = reason;
  state.playing = false;
  info.textContent = `bản dự phòng chạy bằng code (${reason})`;
  let fr = document.querySelector("iframe");
  const go = () => {
    const d = fr.contentDocument;
    const btn = d.getElementById(multi ? "w10" : rarity === 5 ? "demo5" : "w1");
    if (btn) btn.click();
  };
  $("ui").hidden = true;
  if (!fr) {
    fr = document.createElement("iframe");
    fr.title = "Hoạt ảnh ước nguyện dự phòng";
    fr.src = "../fallback/uoc-nguyen-mau.html";
    fr.onload = go;
    $("stage").appendChild(fr);
    addCloseFallback();
  } else {
    fr.hidden = false;
    go();
  }
}

function addCloseFallback() {
  const b = document.createElement("button");
  b.id = "closeFallback"; b.textContent = "Đóng bản dự phòng";
  b.onclick = () => { document.querySelector("iframe").hidden = true; b.hidden = true; setUI(false); };
  $("top").appendChild(b);
  const fr = document.querySelector("iframe");
  new MutationObserver(() => { b.hidden = fr.hidden; }).observe(fr, { attributes: true });
}

$("w1").onclick = () => wish(false);
$("w10").onclick = () => wish(true);
$("skip").onclick = skip;
$("ff").onclick = () => { state.fastForward = !state.fastForward; $("ff").textContent = state.fastForward ? "Tốc độ thường" : "Tua nhanh"; };
$("mode").onclick = () => {
  state.mode = state.mode === "auto" ? "fallback" : "auto";
  $("mode").textContent = state.mode === "auto" ? "Chế độ: tự động" : "Chế độ: dự phòng";
};
if (state.mode === "fallback") $("mode").textContent = "Chế độ: dự phòng";
if (params.get("variant")) $("variant").value = params.get("variant");

resize();
fetch(OUT + "timeline.json").then((r) => r.json()).then((tl) => {
  state.tl = tl;
  state.ready = true;
  // warm the cache for the most common result so the first wish starts instantly
  if (!weakDevice()) loadVariant("4");
  info.textContent = `sẵn sàng · ${pickHeight()}p`;
}).catch(() => { state.ready = true; state.tl = null; info.textContent = "không đọc được timeline.json"; });
