/**
 * Công thức tạo clip game từ clip UAL: lấy nguyên, lật trái phải (mirror), ghép thân dưới của clip khác (lower),
 * xoay hông (spin, radian) hoặc nhấc hông (lift, theo chiều cao hông) trong khoảng window (0..1), đổi tốc độ (speed).
 * Ghi lại mỗi lần thêm clip ở docs/art/nguon-hoat-anh.md.
 */
export interface ClipRecipe {
  from: string;
  lower?: string;
  mirror?: boolean;
  spin?: number;
  lift?: number;
  window?: [number, number];
  speed?: number;
}

export const CLIPS: Record<string, ClipRecipe> = {
  idle: { from: "Idle_Loop" },
  walk: { from: "Walk_Loop" },
  run: { from: "Jog_Fwd_Loop" },
  sprint: { from: "Sprint_Loop" },
  jumpUp: { from: "Jump_Start" },
  jumpAir: { from: "Jump_Loop" },
  jumpLand: { from: "Jump_Land" },
  dash: { from: "Roll", speed: 1.4 },
  hurt: { from: "Hit_Chest" },
  die: { from: "Death01" },
  // Kiếm (dùng chung cho đại kiếm, chậm hơn khi phát).
  swordIdle: { from: "Sword_Idle" },
  sword1: { from: "Sword_Attack", speed: 1.2 },
  sword2: { from: "Sword_Attack", mirror: true, speed: 1.2 },
  sword3: { from: "Sword_Attack", spin: Math.PI * 2, window: [0.1, 0.65] },
  // Thương: đâm thẳng.
  spear1: { from: "Punch_Jab" },
  spear2: { from: "Punch_Cross" },
  spear3: { from: "Punch_Jab", lower: "Jump_Start", lift: 0.15, window: [0.1, 0.9] },
  // Cung.
  bowAim: { from: "Pistol_Aim_Neutral" },
  bow1: { from: "Pistol_Shoot" },
  bow2: { from: "Pistol_Shoot", lower: "Crouch_Idle_Loop" },
  bow3: { from: "Pistol_Shoot", spin: -Math.PI * 2, lift: 0.35, window: [0, 0.7] },
  bowBurst: { from: "Pistol_Aim_Up", lower: "Idle_Loop", lift: 0.12, window: [0, 1] },
  // Pháp khí, kỹ năng, nộ.
  cast: { from: "Spell_Simple_Idle_Loop" },
  cat1: { from: "Spell_Simple_Shoot" },
  cat2: { from: "Spell_Simple_Shoot", mirror: true },
  cat3: { from: "Spell_Simple_Shoot", spin: Math.PI * 2, window: [0, 0.6] },
  skill: { from: "Spell_Simple_Shoot" },
  burst: { from: "Spell_Simple_Enter", lift: 0.2, window: [0, 1] },
};
