/**
 * Vẽ atlas mặt anime (mắt + lông mày, miệng + mũi) bằng SVG rồi xuất PNG.
 * Mỗi ô 512×512 tương ứng vùng mặt chiếu thẳng từ trước, tâm ô là tâm đầu.
 * Thứ tự ô khớp với media/characters/base/ttart/head.py.
 */
import sharp from "sharp";

export const CELL = 512;
export const COLS = 4;
export const ROWS = 2;
export const EYE_CELLS = ["binh_thuong", "vui", "gian", "buon", "ngac_nhien", "nham", "lim_dim"] as const;
export const MOUTH_CELLS = ["binh_thuong", "vui", "gian", "buon", "ngac_nhien", "het"] as const;

export interface FaceOpts {
  eye: string;
  hair: string;
  skin: string;
  gioiTinh: "nam" | "nu";
}

function shade(hex: string, k: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k));
  return "#" + c.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");
}

const EX = 104; // khoảng cách tâm mắt tới trục giữa (px trong ô)
const EY = 330; // độ cao tâm mắt

/** Một mắt bên phải màn hình (s = 1) hoặc trái (s = -1). */
function eye(kind: (typeof EYE_CELLS)[number], s: 1 | -1, o: FaceOpts, id: string): string {
  const cx = 256 + s * EX;
  const line = shade(o.hair, -0.55);
  const w = o.gioiTinh === "nu" ? 56 : 54;
  const h = o.gioiTinh === "nu" ? 62 : 54;
  // Độ nghiêng mí trên: giận thì cụp vào trong, buồn thì cụp ra ngoài.
  const tilt = kind === "gian" ? 16 : kind === "buon" ? -12 : 0;
  const lidDrop = kind === "lim_dim" ? h * 0.9 : 0;
  const big = kind === "ngac_nhien" ? 1.08 : 1;
  const brow = browPath(kind, s, cx, line);
  if (kind === "vui") {
    return `${brow}<path d="M${cx - s * w} ${EY + 6} Q${cx} ${EY - 34} ${cx + s * w} ${EY + 6}" stroke="${line}" stroke-width="11" fill="none" stroke-linecap="round"/>`;
  }
  if (kind === "nham") {
    return `${brow}<path d="M${cx - s * w} ${EY - 2} Q${cx} ${EY + 22} ${cx + s * w * 1.05} ${EY - 6}" stroke="${line}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M${cx + s * w * 1.05} ${EY - 6} l${s * 12} -8" stroke="${line}" stroke-width="7" stroke-linecap="round"/>`;
  }
  const inner = cx - s * w; // góc mắt phía mũi
  const outer = cx + s * w;
  const topIn = EY - h + (tilt > 0 ? tilt : 0) + lidDrop;
  const topOut = EY - h - (tilt < 0 ? tilt : 0) * -1 + lidDrop;
  const clip = `${id}c${s}`;
  const sclera = `M${inner} ${EY + 4} Q${inner} ${topIn} ${cx} ${Math.min(topIn, topOut) - 6 + lidDrop * 0.2} Q${outer + s * 6} ${topOut} ${outer + s * 4} ${EY + 2} Q${cx} ${EY + h * 0.95 * big} ${inner} ${EY + 4} Z`;
  const irisR = w * 0.62 * big;
  const pupilR = kind === "ngac_nhien" ? irisR * 0.3 : irisR * 0.48;
  const ix = cx + s * 2;
  const iy = EY + 6;
  const g = `${id}g${s}`;
  return `${brow}
  <defs>
    <clipPath id="${clip}"><path d="${sclera}"/></clipPath>
    <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(o.eye, -0.55)}"/>
      <stop offset="0.45" stop-color="${o.eye}"/>
      <stop offset="1" stop-color="${shade(o.eye, 0.45)}"/>
    </linearGradient>
  </defs>
  <path d="${sclera}" fill="#fbf7f2"/>
  <g clip-path="url(#${clip})">
    <path d="M${inner} ${topIn - 6} L${outer + s * 8} ${topOut - 6} L${outer + s * 8} ${topOut + 14} L${inner} ${topIn + 14} Z" fill="${shade(o.skin, -0.25)}" opacity="0.55"/>
    <ellipse cx="${ix}" cy="${iy}" rx="${irisR}" ry="${irisR * 1.22}" fill="url(#${g})"/>
    <ellipse cx="${ix}" cy="${iy + 2}" rx="${pupilR * 0.8}" ry="${pupilR * 1.15}" fill="${shade(o.eye, -0.75)}"/>
    <ellipse cx="${ix}" cy="${iy + irisR * 0.75}" rx="${irisR * 0.62}" ry="${irisR * 0.28}" fill="${shade(o.eye, 0.6)}" opacity="0.7"/>
    <circle cx="${ix - s * irisR * 0.38}" cy="${iy - irisR * 0.45}" r="${irisR * 0.3}" fill="#ffffff"/>
    <circle cx="${ix + s * irisR * 0.42}" cy="${iy + irisR * 0.45}" r="${irisR * 0.13}" fill="#ffffff"/>
  </g>
  <path d="M${inner - s * 4} ${EY + 6} Q${inner - s * 2} ${topIn - 4} ${cx} ${Math.min(topIn, topOut) - 8 + lidDrop * 0.2} Q${outer + s * 8} ${topOut - 4} ${outer + s * 14} ${EY - 4}" stroke="${line}" stroke-width="${o.gioiTinh === "nu" ? 13 : 11}" fill="none" stroke-linecap="round"/>
  ${o.gioiTinh === "nu" ? `<path d="M${outer + s * 10} ${EY - 2} l${s * 12} -10" stroke="${line}" stroke-width="7" stroke-linecap="round"/>` : ""}
  <path d="M${cx - s * w * 0.3} ${EY + h * 0.95 * big + 2} Q${cx + s * w * 0.4} ${EY + h * 0.9 * big} ${outer} ${EY + 10}" stroke="${line}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>`;
}

function browPath(kind: string, s: 1 | -1, cx: number, line: string): string {
  const y = EY - 94;
  let inY = y,
    outY = y - 4,
    lift = 0;
  if (kind === "gian") {
    inY = y + 18;
    outY = y - 10;
  } else if (kind === "buon") {
    inY = y - 14;
    outY = y + 8;
  } else if (kind === "ngac_nhien") lift = -18;
  const a = cx - s * 44,
    b = cx + s * 50;
  return `<path d="M${a} ${inY + lift} Q${cx} ${Math.min(inY, outY) - 10 + lift} ${b} ${outY + lift + 6}" stroke="${line}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
}

function mouth(kind: (typeof MOUTH_CELLS)[number], o: FaceOpts): string {
  const line = shade(o.skin, -0.62);
  const inside = "#7a2b36";
  const y = 452;
  const nose = `<path d="M262 398 l-6 10" stroke="${shade(o.skin, -0.35)}" stroke-width="5" stroke-linecap="round"/>`;
  switch (kind) {
    case "binh_thuong":
      return `${nose}<path d="M240 ${y} Q256 ${y + 5} 272 ${y - 1}" stroke="${line}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    case "vui":
      return `${nose}<path d="M232 ${y - 6} Q256 ${y - 2} 280 ${y - 6} Q272 ${y + 24} 256 ${y + 24} Q240 ${y + 24} 232 ${y - 6} Z" fill="${inside}" stroke="${line}" stroke-width="4"/>
        <path d="M240 ${y + 14} Q256 ${y + 8} 272 ${y + 14} Q264 ${y + 24} 256 ${y + 24} Q248 ${y + 24} 240 ${y + 14}Z" fill="#e5737c"/>
        <ellipse cx="${256 - 140}" cy="392" rx="30" ry="12" fill="#ff7a7a" opacity="0.35"/><ellipse cx="${256 + 140}" cy="392" rx="30" ry="12" fill="#ff7a7a" opacity="0.35"/>`;
    case "gian":
      return `${nose}<path d="M236 ${y + 6} Q256 ${y - 6} 276 ${y + 6}" stroke="${line}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    case "buon":
      return `${nose}<path d="M242 ${y + 4} Q256 ${y - 4} 270 ${y + 4}" stroke="${line}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    case "ngac_nhien":
      return `${nose}<ellipse cx="256" cy="${y + 4}" rx="10" ry="13" fill="${inside}" stroke="${line}" stroke-width="4"/>`;
    case "het":
      return `${nose}<path d="M234 ${y - 8} L278 ${y - 8} Q274 ${y + 26} 256 ${y + 28} Q238 ${y + 26} 234 ${y - 8} Z" fill="${inside}" stroke="${line}" stroke-width="4"/>
        <path d="M236 ${y - 7} L276 ${y - 7} L275 ${y - 1} L237 ${y - 1} Z" fill="#fbf7f2"/>`;
  }
}

function atlas(cells: string[]): string {
  const body = cells
    .map((c, i) => {
      const x = (i % COLS) * CELL,
        y = Math.floor(i / COLS) * CELL;
      return `<g transform="translate(${x} ${y})">${c}</g>`;
    })
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL * COLS}" height="${CELL * ROWS}" viewBox="0 0 ${CELL * COLS} ${CELL * ROWS}">${body}</svg>`;
}

export function faceSvgs(o: FaceOpts): { mat: string; mieng: string } {
  return {
    mat: atlas(EYE_CELLS.map((k, i) => eye(k, -1, o, `e${i}`) + eye(k, 1, o, `e${i}`))),
    mieng: atlas(MOUTH_CELLS.map((k) => mouth(k, o))),
  };
}

export async function writeFaceTextures(o: FaceOpts, outMat: string, outMieng: string): Promise<void> {
  const s = faceSvgs(o);
  await sharp(Buffer.from(s.mat)).png().toFile(outMat);
  await sharp(Buffer.from(s.mieng)).png().toFile(outMieng);
}
