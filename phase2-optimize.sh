#!/usr/bin/env bash
# ============================================================
# phase2-optimize.sh
# 1. Convert massive GIFs to MP4
# 2. Convert remaining large JPEGs to WebP using cwebp
# ============================================================
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
IMAGES="$ROOT/public/asset/images"

CWEBP=$(which cwebp || echo "/opt/homebrew/bin/cwebp")

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║      Phase 2: GIF to MP4 & Large WebP        ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── 1. GIF to MP4 ──────────────────────────────────────────
echo "▶ Converting GIFs to MP4..."
convert_gif_to_mp4() {
  local src="$1"
  local dst="${src%.*}.mp4"
  if [ ! -f "$src" ]; then
    echo "  ⚠ Skipping (not found): $src"
    return
  fi
  # Use ffmpeg to convert GIF to MP4 (h264)
  # -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ensures dimensions are even, required by libx264
  # -pix_fmt yuv420p for max compatibility
  ffmpeg -y -i "$src" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 23 -preset medium "$dst" 2>/dev/null
  ORIG=$(wc -c < "$src")
  NEW=$(wc -c < "$dst")
  echo "  ✓ $(basename "$src") → $(basename "$dst")  ($(( ORIG/1024/1024 ))MB → $(( NEW/1024 ))KB)"
  rm "$src"
}

convert_gif_to_mp4 "$IMAGES/santen/Santen-trend-post5-opt-2.gif"
convert_gif_to_mp4 "$IMAGES/Moe-Cafe/moe-cover.gif"


# ── 2. Large JPEGs to WebP ─────────────────────────────────
echo ""
echo "▶ Converting Large JPEGs to WebP..."

convert_to_webp() {
  local src="$1"
  local dst="${src%.*}.webp"
  if [ ! -f "$src" ]; then
    echo "  ⚠ Skipping (not found): $src"
    return
  fi
  "$CWEBP" -q 82 -mt "$src" -o "$dst" 2>/dev/null
  ORIG=$(wc -c < "$src")
  NEW=$(wc -c < "$dst")
  echo "  ✓ $(basename "$src") → $(basename "$dst")  ($(( ORIG/1024 ))KB → $(( NEW/1024 ))KB)"
  rm "$src"
}

convert_to_webp "$IMAGES/Thuyen-xua/cover-1.jpg"
convert_to_webp "$IMAGES/axon-active/TDC/cover.jpg"
convert_to_webp "$IMAGES/icoffee/web/Scene-1.jpg"
convert_to_webp "$IMAGES/Moe-Cafe/photo-5.jpeg"
convert_to_webp "$IMAGES/Moe-Cafe/photo-6.jpeg"
convert_to_webp "$IMAGES/Moe-Cafe/moe-cover.jpeg"

echo ""
echo "✅ Conversions complete."
