import { GS } from "../core/state";
import { $ } from "../core/util";

export function toast(m: any) {
  const t = $("toast");
  t.textContent = m;
  t.hidden = false;
  clearTimeout(GS.toastT);
  GS.toastT = setTimeout(() => (t.hidden = true), 2400);
}
