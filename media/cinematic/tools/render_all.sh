#!/usr/bin/env bash
# Render every shot at 1080p into $FRAMES (default media/cinematic/frames, git-ignored), then encode,
# write timeline.json and the audio. Resumable: frames that already exist are skipped.
#   BLENDER=/path/to/blender tools/render_all.sh [variant ...]
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
BLENDER="${BLENDER:-blender}"
FRAMES="${FRAMES:-$HERE/frames}"
OUT="$HERE/out"
VARIANTS=("${@:-5a 5b 4 3 10x4 10x5}")
read -r -a VARIANTS <<< "${VARIANTS[*]}"
declare -A SAMPLES=([s1]=40 [s2]=32 [s3]=48 [s4]=36)
declare -A LAST=([s1]=75 [s2]=60 [s3]=75 [s4]=60)

render() {  # shot variant dir
  local shot=$1 variant=$2 dir=$3 missing=()
  mkdir -p "$dir"
  for ((f = 1; f <= LAST[$shot]; f++)); do
    [[ -f "$dir/$(printf %04d "$f").png" ]] || missing+=("$f")
  done
  if [[ $shot == s2 && ! -f "$dir/meta.json" ]]; then missing+=(${LAST[s2]}); fi
  ((${#missing[@]})) || return 0
  local spec; spec=$(IFS=,; echo "${missing[*]}")
  (cd "$HERE/blender" && "$BLENDER" -b --factory-startup -P build.py -- --shot "$shot" --variant "$variant" \
      --res 1920x1080 --samples "${SAMPLES[$shot]}" --frames "$spec" --out "$dir") | grep -E "^FRAME|Error" || true
}

render s1 5a "$FRAMES/common/s1"
render s2 5a "$FRAMES/common/s2"
python3 "$HERE/tools/timeline.py" --anchor "$FRAMES/common/s2/meta.json" --out "$OUT/timeline.json"
python3 "$HERE/tools/audio.py" --timeline "$OUT/timeline.json" --out "$OUT/audio"
for v in "${VARIANTS[@]}"; do
  render s3 "$v" "$FRAMES/$v/s3"
  render s4 "$v" "$FRAMES/$v/s4"
  python3 "$HERE/tools/encode.py" --name "$v" --out "$OUT/video" \
      --shots "$FRAMES/common/s1" "$FRAMES/common/s2" "$FRAMES/$v/s3" "$FRAMES/$v/s4"
done
