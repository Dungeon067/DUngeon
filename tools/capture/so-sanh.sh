#!/usr/bin/env bash
# Ảnh so sánh trước/sau cho từng chiêu: ghép khung cùng thời điểm của hai lần quay xác định.
# Dùng: tools/capture/so-sanh.sh <thư mục trước> <thư mục sau> <thư mục ra>
set -euo pipefail
B=$1 A=$2 O=$3
F=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
mkdir -p "$O"
declare -A KHUNG=([thuong]="40" [trong]="82" [bam]="18 40" [giu]="40 120" [no]="70 140 220" [rutcat]="20 60 360")
for s in "${!KHUNG[@]}"; do
  for f in ${KHUNG[$s]}; do
    n=$(printf %05d "$f")
    [[ -f $B/$s/$n.jpg && -f $A/$s/$n.jpg ]] || continue
    ffmpeg -y -loglevel error -i "$B/$s/$n.jpg" -i "$A/$s/$n.jpg" -filter_complex \
      "[0]drawtext=fontfile=$F:text='TRƯỚC':x=24:y=24:fontsize=40:fontcolor=white:borderw=3:bordercolor=black[a];[1]drawtext=fontfile=$F:text='SAU':x=24:y=24:fontsize=40:fontcolor=white:borderw=3:bordercolor=black[b];[a][b]hstack,scale=1920:-2" \
      -q:v 3 "$O/$s-$n.jpg"
    echo "$O/$s-$n.jpg"
  done
done
