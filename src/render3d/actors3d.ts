/**
 * Billboard pixel cho nhân vật, quái, NPC. Có sheet ở media/sprites/<id>/ thì dùng sheet 8 hướng;
 * thiếu sheet thì vẽ sprite 2D cũ ra canvas nhỏ rồi dán lên billboard (đường lui).
 */
import * as THREE from "three";
import { DIR8 } from "../core/facing";
import { TS } from "../world/map";

export interface Sheet {
  json: any;
  tex: THREE.Texture;
  fx?: { json: any; tex: THREE.Texture };
}
const sheets = new Map<string, Promise<Sheet | null>>();
const base = (import.meta as any).env?.BASE_URL ?? "/";

function loadTex(url: string) {
  return new THREE.TextureLoader().loadAsync(url).then((t) => {
    t.magFilter = t.minFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}

export function loadSheet(id: string): Promise<Sheet | null> {
  let p = sheets.get(id);
  if (!p) {
    const dir = `${base}media/sprites/${id}/`;
    p = fetch(dir + "sheet.json")
      .then((r) => (r.ok ? r.json() : null))
      .then(async (json) => {
        if (!json) return null;
        const tex = await loadTex(dir + json.image);
        let fx: Sheet["fx"];
        try {
          const fj = await fetch(dir + "fx.json").then((r) => (r.ok ? r.json() : null));
          if (fj) fx = { json: fj, tex: await loadTex(dir + fj.image) };
        } catch {}
        return { json, tex, fx };
      })
      .catch(() => null);
    sheets.set(id, p);
  }
  return p;
}

/** Hệ số kéo dọc để pixel trông vuông khi camera nhìn chéo (mặt billboard đứng thẳng). */
export let STRETCH = 1.3;
export function setStretch(pitch: number) {
  STRETCH = 1 / Math.cos(Math.PI / 2 - pitch);
}

function planeAtFeet(w: number, h: number, ax: number, ay: number) {
  const g = new THREE.PlaneGeometry(w, h);
  g.translate(w / 2 - ax, h / 2 - (h - ay), 0);
  return g;
}

function silhouetteOf(mesh: THREE.Mesh, tex: THREE.Texture) {
  const m = new THREE.MeshBasicMaterial({
    map: tex,
    color: 0x1a2a66,
    transparent: true,
    opacity: 0.5,
    alphaTest: 0.5,
    depthFunc: THREE.GreaterDepth,
    depthWrite: false,
  });
  const s = new THREE.Mesh(mesh.geometry, m);
  s.renderOrder = 10;
  return s;
}

/** Sprite dùng sheet: đổi UV mỗi khung. */
export class SheetSprite {
  obj = new THREE.Group();
  mesh: THREE.Mesh;
  ghost: THREE.Mesh;
  private uv: THREE.BufferAttribute;
  private fw: number;
  private fh: number;
  constructor(
    readonly sheet: Sheet,
    shadows: boolean,
  ) {
    const J = sheet.json;
    const u = 1.42 / J.worldH;
    this.fw = J.frame.w;
    this.fh = J.frame.h;
    const g = planeAtFeet(J.frame.w * u, J.frame.h * u, J.anchor.x * u, J.anchor.y * u);
    const mat = new THREE.MeshLambertMaterial({ map: sheet.tex, alphaTest: 0.5, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(g, mat);
    this.mesh.castShadow = shadows;
    this.mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: sheet.tex, alphaTest: 0.5 });
    this.uv = g.getAttribute("uv") as THREE.BufferAttribute;
    this.ghost = silhouetteOf(this.mesh, sheet.tex);
    this.obj.add(this.mesh, this.ghost);
    this.obj.scale.y = STRETCH;
  }
  /** Chọn khung theo tên động tác, hướng 0..7 (DIR8) và thời gian đã chạy (giây). */
  show(anim: string, dir8: number, t: number) {
    const A = this.sheet.json.anims[anim] ?? this.sheet.json.anims.idle;
    const total = A.ms.reduce((a: number, b: number) => a + b, 0);
    let ms = t * 1000;
    ms = A.loop ? ms % total : Math.min(ms, total - 1);
    let i = 0;
    while (i < A.ms.length - 1 && ms >= A.ms[i]) ms -= A.ms[i++];
    const [x, y] = A.frames[DIR8[dir8]][i];
    const W = this.sheet.tex.image.width,
      H = this.sheet.tex.image.height;
    const u0 = x / W,
      u1 = (x + this.fw) / W,
      v1 = 1 - y / H,
      v0 = 1 - (y + this.fh) / H;
    this.uv.setXY(0, u0, v1);
    this.uv.setXY(1, u1, v1);
    this.uv.setXY(2, u0, v0);
    this.uv.setXY(3, u1, v0);
    this.uv.needsUpdate = true;
    this.obj.scale.y = STRETCH;
  }
  dispose() {
    this.mesh.geometry.dispose();
  }
}

/** Đường lui: vẽ hàm 2D lên canvas rồi dùng làm billboard. */
export class CanvasSprite {
  obj = new THREE.Group();
  cv = document.createElement("canvas");
  ctx: CanvasRenderingContext2D;
  tex: THREE.CanvasTexture;
  mesh: THREE.Mesh;
  constructor(
    readonly w: number,
    readonly h: number,
    shadows: boolean,
    ghost = true,
  ) {
    this.cv.width = w * 2;
    this.cv.height = h * 2;
    this.ctx = this.cv.getContext("2d")!;
    this.tex = new THREE.CanvasTexture(this.cv);
    this.tex.magFilter = this.tex.minFilter = THREE.NearestFilter;
    this.tex.generateMipmaps = false;
    this.tex.colorSpace = THREE.SRGBColorSpace;
    const g = planeAtFeet(w / TS, h / TS, w / 2 / TS, (h - 8) / TS);
    this.mesh = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: this.tex, alphaTest: 0.4, side: THREE.DoubleSide }));
    this.mesh.castShadow = shadows;
    this.mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: this.tex, alphaTest: 0.4 });
    this.obj.add(this.mesh);
    if (ghost) this.obj.add(silhouetteOf(this.mesh, this.tex));
  }
  /** `draw` vẽ với gốc tọa độ ở chân vật (đơn vị px logic). */
  paint(draw: (c: CanvasRenderingContext2D) => void) {
    const c = this.ctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, this.cv.width, this.cv.height);
    c.setTransform(2, 0, 0, 2, this.w, (this.h - 8) * 2);
    draw(c);
    this.tex.needsUpdate = true;
    this.obj.scale.y = STRETCH * 0.85;
  }
  dispose() {
    this.mesh.geometry.dispose();
    this.tex.dispose();
  }
}
