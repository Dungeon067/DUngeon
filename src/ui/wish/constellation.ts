/** Chòm sao Hồng Điểu của banner: tọa độ sao (đơn vị theo bán kính vẽ) và các nét nối. Dùng chung cho bản code và lớp phủ video. */
export const BIRD: readonly (readonly [number, number])[] = [
  [-0.62, 0.05],
  [-0.38, -0.12],
  [-0.18, -0.02],
  [0, -0.22],
  [0.16, -0.04],
  [0.4, -0.16],
  [0.64, 0.02],
  [0.2, 0.18],
  [0, 0.36],
  [-0.2, 0.18],
];
export const BIRD_EDGES: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [2, 9],
  [4, 7],
  [9, 8],
  [7, 8],
  [3, 8],
];
