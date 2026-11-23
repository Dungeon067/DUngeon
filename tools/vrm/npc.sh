#!/usr/bin/env bash
# Dựng lại bộ NPC từ mô hình đội khởi đầu (S26): đổi màu tóc/áo/mắt và tên. Chạy từ gốc repo.
# Tham số HSV: xoay sắc độ (độ), hệ số bão hòa, hệ số sáng — xem tools/vrm/npc.py.
set -euo pipefail
B=${BLENDER:-blender}
M=public/media/models
run() { mkdir -p "$M/npc/$2"; "$B" -b --python tools/vrm/npc.py -- "$M/$1/model.vrm" "$M/npc/$2/model.vrm" "$3" "$4" "$5" "$6" | grep -E "NPC OK|Error"; }
run havy lamchi "Lam Chi" 150,0.8,0.7 140,0.7,1.0 140,1,1
run suongmai thuha "Thu Hà" 160,0.9,0.9 30,0.7,0.95 160,1,1
run mailinh bena "Bé Na" 180,0.8,0.8 120,0.7,1.0 180,1,1
run bachvu khai "Khải" 0,0,0.35 150,0.8,0.9 100,1,1
