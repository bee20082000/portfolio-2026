#!/usr/bin/env bash
# ============================================================
# convert-to-webp.sh
# Converts Panasonic/Social PNGs and Santen PNGs/JPGs → WebP
# Then patches all JSX source references
# ============================================================
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
IMAGES="$ROOT/public/asset/images"
SRC="$ROOT/src"

CWEBP=$(which cwebp || echo "/opt/homebrew/bin/cwebp")

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   WebP Conversion + Source Patch             ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Helper function: convert to webp, remove original, show size delta
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

# ── PANASONIC SOCIAL ───────────────────────────────────────
echo "▶ Converting Panasonic/Social PNGs → WebP (q82)..."
PANA="$IMAGES/Panasonic/Social"
for f in \
  "Pana-AOC-post-1.png" \
  "Pana-AOC-post-2.png" \
  "Pana-AOC-post-3.png" \
  "Pana-AOC-post-4.png" \
  "Pana-AOC-post-5.png" \
  "Pana-AOC-post-6.png" \
  "Pana-AOC-post-7.png" \
  "Pana-Nam-moi.png" \
  "Pana-dai-ly.png"; do
  convert_to_webp "$PANA/$f"
done

# ── SANTEN ─────────────────────────────────────────────────
echo ""
echo "▶ Converting Santen PNGs/JPGs → WebP (q82)..."
SANTEN="$IMAGES/santen"
for f in \
  "ST_Sancoba_Trend_post-7.png" \
  "Sancoba-Post-school-life.png" \
  "Sancoba-This-that.png" \
  "Sancoba-expert-advice-post-8.png" \
  "Santen-HA-post.png" \
  "Santen-Nam-Nu-post.png" \
  "sancoba-product-post-4.png" \
  "sancoba-product-post-8.png" \
  "ST_KARI-UNI_230221_FA.jpg" \
  "ST_Sancoba_230203.FA.jpg" \
  "ST_Sancoba_230210.jpg" \
  "Sancoba-Moment-Post2-1801.jpg" \
  "cover.jpg"; do
  convert_to_webp "$SANTEN/$f"
done

# ── PATCH JSX SOURCES ──────────────────────────────────────
echo ""
echo "▶ Patching JSX source references..."

# Panasonic tho dien modal
PANA_MODAL="$SRC/components/work/panasonic_tho_dien/Modal.jsx"
sed -i '' \
  -e 's|Pana-AOC-post-1\.png|Pana-AOC-post-1.webp|g' \
  -e 's|Pana-AOC-post-2\.png|Pana-AOC-post-2.webp|g' \
  -e 's|Pana-AOC-post-3\.png|Pana-AOC-post-3.webp|g' \
  -e 's|Pana-AOC-post-4\.png|Pana-AOC-post-4.webp|g' \
  -e 's|Pana-AOC-post-5\.png|Pana-AOC-post-5.webp|g' \
  -e 's|Pana-AOC-post-6\.png|Pana-AOC-post-6.webp|g' \
  -e 's|Pana-AOC-post-7\.png|Pana-AOC-post-7.webp|g' \
  -e 's|Pana-Nam-moi\.png|Pana-Nam-moi.webp|g' \
  -e 's|Pana-dai-ly\.png|Pana-dai-ly.webp|g' \
  "$PANA_MODAL"
echo "  ✓ panasonic_tho_dien/Modal.jsx"

# Santen modal
SANTEN_MODAL="$SRC/components/work/santen/Modal.jsx"
sed -i '' \
  -e 's|ST_Sancoba_Trend_post-7\.png|ST_Sancoba_Trend_post-7.webp|g' \
  -e 's|Sancoba-Post-school-life\.png|Sancoba-Post-school-life.webp|g' \
  -e 's|Sancoba-This-that\.png|Sancoba-This-that.webp|g' \
  -e 's|Sancoba-expert-advice-post-8\.png|Sancoba-expert-advice-post-8.webp|g' \
  -e 's|Santen-HA-post\.png|Santen-HA-post.webp|g' \
  -e 's|Santen-Nam-Nu-post\.png|Santen-Nam-Nu-post.webp|g' \
  -e 's|sancoba-product-post-4\.png|sancoba-product-post-4.webp|g' \
  -e 's|sancoba-product-post-8\.png|sancoba-product-post-8.webp|g' \
  -e 's|ST_KARI-UNI_230221_FA\.jpg|ST_KARI-UNI_230221_FA.webp|g' \
  -e 's|ST_Sancoba_230203\.FA\.jpg|ST_Sancoba_230203.FA.webp|g' \
  -e 's|ST_Sancoba_230210\.jpg|ST_Sancoba_230210.webp|g' \
  -e 's|Sancoba-Moment-Post2-1801\.jpg|Sancoba-Moment-Post2-1801.webp|g' \
  -e 's|santen/cover\.jpg|santen/cover.webp|g' \
  "$SANTEN_MODAL"
echo "  ✓ santen/Modal.jsx"

# WorkBento.jsx santen cover
WORKBENTO="$SRC/components/work/WorkBento.jsx"
sed -i '' \
  -e "s|/asset/images/santen/cover\.jpg|/asset/images/santen/cover.webp|g" \
  "$WORKBENTO"
echo "  ✓ WorkBento.jsx (santen cover)"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅  Conversion complete!                    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
