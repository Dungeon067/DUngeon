#!/usr/bin/env bash
# Hậu kỳ ảnh render: thêm quầng sáng từ <id>-glow.png, xuất bản lớn + icon có khung độ hiếm + bản nhỏ.
# Dùng: hau-ky.sh <thư mục render> <thư mục ra> <danh-sach.json> [thư mục public]
# Thư mục ra (media/weapons): <id>.png 1024 nền trong suốt, <id>-icon.png có khung, bản 256/128 PNG + WebP.
# Thư mục public (public/weapons): chỉ WebP 512/256/128 nền trong suốt mà game tải.
# Có <id>-sm.png (render --icon: ít hạt sáng, vòng phép mờ) thì bản 256/128 lấy từ đó thay vì thu nhỏ ảnh lớn.
# Cần ImageMagick (convert) và cwebp hoặc ImageMagick có WebP.
set -euo pipefail
src=$1 out=$2 list=$3 pub=${4:-}
mkdir -p "$out"
[ -n "$pub" ] && mkdir -p "$pub"
frame_colors() {
  case $1 in
    5) echo "#5a3a12 #c8903a #ffd98a" ;;
    4) echo "#2e1d4a #7a52c0 #d4b8ff" ;;
    *) echo "#16304a #3f7fb8 #a8d4ff" ;;
  esac
}
# quầng sáng mềm: làm mờ mặt nạ phát sáng, cộng theo kiểu screen. $3 = hệ số quầng (bản icon nhẹ hơn).
bloom() {
  if [ -f "$1-glow.png" ]; then
    local s=${3:-1} w=$(identify -format %w "$1.png")
    local r1=$((14 * w / 1024)) r2=$((40 * w / 1024))
    convert "$1.png" \( "$1-glow.png" -channel RGBA -blur 0x$r1 -evaluate multiply "$(echo "1.1 * $s" | bc -l)" \) \
      -compose screen -composite \( "$1-glow.png" -channel RGBA -blur 0x$r2 -evaluate multiply "$(echo "0.7 * $s" | bc -l)" \) \
      -compose screen -composite "$2"
  else
    cp "$1.png" "$2"
  fi
}
webp() { if command -v cwebp >/dev/null; then cwebp -quiet -q 88 -alpha_q 90 "$1" -o "$2"; else convert "$1" -quality 88 "$2"; fi; }
node -e 'for (const w of require(process.argv[1])) console.log(w.id + " " + w.r)' "$list" | while read -r id r; do
  [ -f "$src/$id.png" ] || continue
  big="$out/$id.png"
  bloom "$src/$id" "$big" 1
  small="$big"
  if [ -f "$src/$id-sm.png" ]; then
    small="$out/$id-sm.png"
    bloom "$src/$id-sm" "$small" 0.5
  fi
  read -r c0 c1 c2 <<<"$(frame_colors "$r")"
  # icon vuông: nền chuyển màu theo độ hiếm, viền sáng, vũ khí đặt giữa
  convert -size 1024x1024 -define gradient:angle=135 gradient:"$c0"-"$c1" \
    \( -size 1024x1024 xc:none -fill none -stroke "$c2" -strokewidth 14 -draw "roundrectangle 14,14 1009,1009 90,90" \) \
    -compose over -composite \( "$small" -resize 1024x1024 -resize 92% \) -gravity center -compose over -composite \
    \( -size 1024x1024 xc:black -fill white -draw "roundrectangle 0,0 1023,1023 100,100" \) \
    -alpha off -compose copy-opacity -composite "$out/$id-icon.png"
  for s in 256 128; do
    convert "$out/$id-icon.png" -filter Lanczos -resize ${s}x${s} -unsharp 0x0.6 "$out/$id-icon-$s.png"
    webp "$out/$id-icon-$s.png" "$out/$id-icon-$s.webp"
    convert "$small" -filter Lanczos -resize ${s}x${s} "$out/$id-$s.png"
    webp "$out/$id-$s.png" "$out/$id-$s.webp"
  done
  if [ -n "$pub" ]; then
    for s in 512 256 128; do
      img="$big"
      [ "$s" -lt 512 ] && img="$small"
      convert "$img" -filter Lanczos -resize ${s}x${s} "$pub/$id-$s.png"
      webp "$pub/$id-$s.png" "$pub/$id-$s.webp"
      rm "$pub/$id-$s.png"
    done
  fi
  echo "[hau ky] $id"
done
