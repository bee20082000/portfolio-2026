#!/usr/bin/env bash
# ============================================================
# optimize-assets.sh
# 1. Remove unused font files (AkkuratLLVit-* 10 files)
# 2. Remove unused image files
# 3. Convert Panasonic/Social PNGs and Santen PNGs/JPGs → WebP
# 4. Patch JSX source references to point to .webp
# ============================================================
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
FONTS="$ROOT/src/assets/fonts"
IMAGES="$ROOT/public/asset/images"
SRC="$ROOT/src"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║         Portfolio Asset Optimizer            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── 1. REMOVE UNUSED FONTS ─────────────────────────────────
echo "▶ Removing unused fonts (AkkuratLLVit-*)..."
UNUSED_FONTS=(
  "AkkuratLLVit-Black.otf"
  "AkkuratLLVit-BlackItalic.otf"
  "AkkuratLLVit-Bold.otf"
  "AkkuratLLVit-BoldItalic.otf"
  "AkkuratLLVit-Light.otf"
  "AkkuratLLVit-LightItalic.otf"
  "AkkuratLLVit-Regular.otf"
  "AkkuratLLVit-RegularItalic.otf"
  "AkkuratLLVit-Thin.otf"
  "AkkuratLLVit-ThinItalic.otf"
  "Belmonte-Ballpoint-Print.RKnoreSF.woff2"
  "Maroni-Regular.woff"
)
for font in "${UNUSED_FONTS[@]}"; do
  f="$FONTS/$font"
  if [ -f "$f" ]; then
    rm "$f"
    echo "  ✓ Removed: $font"
  fi
done

# ── 2. REMOVE UNUSED IMAGES ────────────────────────────────
echo ""
echo "▶ Removing unused images..."

# Files confirmed to be NOT referenced anywhere in src/
UNUSED_IMAGES=(
  # Bio — large unreferenced photos
  "$IMAGES/Bio/HUY00978.jpg"
  "$IMAGES/Bio/HUY00834.jpg"
  "$IMAGES/Bio/HUY00599-Pano.jpg"
  "$IMAGES/Bio/pouring-card.jpg"
  "$IMAGES/Bio/working-card.jpg"
  "$IMAGES/Bio/falling-card.jpg"
  # Root-level orphans
  "$IMAGES/DSC00096-Enhanced-NR.jpg"
  "$IMAGES/Huy.png"
  "$IMAGES/tuongan-oil.png"
  "$IMAGES/never-think-again-v0-vwtk4ydjciag1.webp"
  "$IMAGES/fatcat.webp"
  # Panasonic orphans (not referenced, only Social ones are used)
  "$IMAGES/Panasonic/pana-cover.jpg"
  "$IMAGES/Panasonic/pana-cover-2.jpg"
  # Axon Active orphans
  "$IMAGES/axon-active/Pano-pantry-1.jpg"
  "$IMAGES/axon-active/Pano-pantry-2.jpg"
  "$IMAGES/axon-active/TDC/Lesonphoto-Axon-Active-2048px-40.jpg"
  "$IMAGES/axon-active/TDC/Train-1.jpg"
  "$IMAGES/axon-active/TDC/glacier-express-3-652fe3cfc907a.avif"
  # Chivas orphans (only 1,3,4,5,6 + chivas-cover.mp4 + cover.jpg used; no 2 exists)
  "$IMAGES/chivas/3.jpg"
  # iCoffee orphans
  "$IMAGES/icoffee/web/glvf-logo.png"
  # Santen orphan (Sancoba-Post-school-life-2 not referenced, only Sancoba-Post-school-life)
  "$IMAGES/santen/Sancoba-Post-school-life-2.png"
  # Tuong An orphans
  "$IMAGES/Tuong-an/KV-2023-lowres.jpg"
  "$IMAGES/Tuong-an/KV-2023-lowres-2.jpg"
  "$IMAGES/Tuong-an/Phao-hoa-1.png"
  "$IMAGES/Tuong-an/Phao-hoa-2.png"
  "$IMAGES/Tuong-an/VISUAL-CUE.png"
  # Lipton tet orphan
  "$IMAGES/Lipton/tet/KV-people.jpg"
  "$IMAGES/Lipton/tet/KV-product.jpg"
  "$IMAGES/Lipton/tet/Lipton-AOC-vid-2.mp4"
  "$IMAGES/Lipton/tet/later/Lipton-AOC-vid-1.mp4"
  # Moe Cafe orphans (photo-1.jpeg is duplicate of photo-1.jpg; gori-old.jpg not referenced)
  "$IMAGES/Moe-Cafe/gori-old.jpg"
  "$IMAGES/Moe-Cafe/photo-1.jpeg"
  # Suzuki orphan (cover.jpg is not referenced; cover.mp4 is)
  "$IMAGES/suzuki/web/cover.jpg"
)

for img in "${UNUSED_IMAGES[@]}"; do
  if [ -f "$img" ]; then
    rm "$img"
    echo "  ✓ Removed: ${img#$ROOT/public}"
  fi
done

# ── 3. CONVERT PANASONIC SOCIAL PNGs → WebP ────────────────
echo ""
echo "▶ Converting Panasonic/Social PNGs → WebP (quality 82)..."
PANA_SOCIAL="$IMAGES/Panasonic/Social"

PNG_FILES=(
  "Pana-AOC-post-1.png"
  "Pana-AOC-post-2.png"
  "Pana-AOC-post-3.png"
  "Pana-AOC-post-4.png"
  "Pana-AOC-post-5.png"
  "Pana-AOC-post-6.png"
  "Pana-AOC-post-7.png"
  "Pana-Nam-moi.png"
  "Pana-dai-ly.png"
)

for f in "${PNG_FILES[@]}"; do
  src="$PANA_SOCIAL/$f"
  dst="$PANA_SOCIAL/${f%.png}.webp"
  if [ -f "$src" ]; then
    ffmpeg -y -i "$src" -c:v libwebp -quality 82 -lossless 0 -preset picture -loop 0 "$dst" 2>/dev/null
    ORIG=$(wc -c < "$src")
    NEW=$(wc -c < "$dst")
    echo "  ✓ $f → ${f%.png}.webp  ($(( ORIG/1024 ))KB → $(( NEW/1024 ))KB)"
    rm "$src"
  fi
done

# ── 4. CONVERT SANTEN PNGs/JPGs → WebP ─────────────────────
echo ""
echo "▶ Converting Santen images → WebP (quality 82)..."
SANTEN="$IMAGES/santen"

SANTEN_FILES=(
  "ST_Sancoba_Trend_post-7.png"
  "Sancoba-Post-school-life.png"
  "Sancoba-This-that.png"
  "Sancoba-expert-advice-post-8.png"
  "Santen-HA-post.png"
  "Santen-Nam-Nu-post.png"
  "sancoba-product-post-4.png"
  "sancoba-product-post-8.png"
  "ST_KARI-UNI_230221_FA.jpg"
  "ST_Sancoba_230203.FA.jpg"
  "ST_Sancoba_230210.jpg"
  "Sancoba-Moment-Post2-1801.jpg"
  "cover.jpg"
)

for f in "${SANTEN_FILES[@]}"; do
  src="$SANTEN/$f"
  # strip extension, add .webp
  base="${f%.*}"
  dst="$SANTEN/${base}.webp"
  if [ -f "$src" ]; then
    ffmpeg -y -i "$src" -c:v libwebp -quality 82 -lossless 0 -preset picture -loop 0 "$dst" 2>/dev/null
    ORIG=$(wc -c < "$src")
    NEW=$(wc -c < "$dst")
    echo "  ✓ $f → ${base}.webp  ($(( ORIG/1024 ))KB → $(( NEW/1024 ))KB)"
    rm "$src"
  fi
done

# ── 5. UPDATE JSX REFERENCES ────────────────────────────────
echo ""
echo "▶ Updating source file references (.png/.jpg → .webp)..."

# Panasonic Social: update .png → .webp in panasonic_tho_dien/Modal.jsx
PANA_MODAL="$SRC/components/work/panasonic_tho_dien/Modal.jsx"
if [ -f "$PANA_MODAL" ]; then
  sed -i '' \
    -e 's|Social/Pana-AOC-post-1\.png|Social/Pana-AOC-post-1.webp|g' \
    -e 's|Social/Pana-AOC-post-2\.png|Social/Pana-AOC-post-2.webp|g' \
    -e 's|Social/Pana-AOC-post-3\.png|Social/Pana-AOC-post-3.webp|g' \
    -e 's|Social/Pana-AOC-post-4\.png|Social/Pana-AOC-post-4.webp|g' \
    -e 's|Social/Pana-AOC-post-5\.png|Social/Pana-AOC-post-5.webp|g' \
    -e 's|Social/Pana-AOC-post-6\.png|Social/Pana-AOC-post-6.webp|g' \
    -e 's|Social/Pana-AOC-post-7\.png|Social/Pana-AOC-post-7.webp|g' \
    -e 's|Social/Pana-Nam-moi\.png|Social/Pana-Nam-moi.webp|g' \
    -e 's|Social/Pana-dai-ly\.png|Social/Pana-dai-ly.webp|g' \
    "$PANA_MODAL"
  echo "  ✓ Patched: panasonic_tho_dien/Modal.jsx"
fi

# Santen: update .png/.jpg → .webp in santen/Modal.jsx
SANTEN_MODAL="$SRC/components/work/santen/Modal.jsx"
if [ -f "$SANTEN_MODAL" ]; then
  sed -i '' \
    -e 's|santen/ST_Sancoba_Trend_post-7\.png|santen/ST_Sancoba_Trend_post-7.webp|g' \
    -e 's|santen/Sancoba-Post-school-life\.png|santen/Sancoba-Post-school-life.webp|g' \
    -e 's|santen/Sancoba-This-that\.png|santen/Sancoba-This-that.webp|g' \
    -e 's|santen/Sancoba-expert-advice-post-8\.png|santen/Sancoba-expert-advice-post-8.webp|g' \
    -e 's|santen/Santen-HA-post\.png|santen/Santen-HA-post.webp|g' \
    -e 's|santen/Santen-Nam-Nu-post\.png|santen/Santen-Nam-Nu-post.webp|g' \
    -e 's|santen/sancoba-product-post-4\.png|santen/sancoba-product-post-4.webp|g' \
    -e 's|santen/sancoba-product-post-8\.png|santen/sancoba-product-post-8.webp|g' \
    -e 's|santen/ST_KARI-UNI_230221_FA\.jpg|santen/ST_KARI-UNI_230221_FA.webp|g' \
    -e 's|santen/ST_Sancoba_230203\.FA\.jpg|santen/ST_Sancoba_230203.FA.webp|g' \
    -e 's|santen/ST_Sancoba_230210\.jpg|santen/ST_Sancoba_230210.webp|g' \
    -e 's|santen/Sancoba-Moment-Post2-1801\.jpg|santen/Sancoba-Moment-Post2-1801.webp|g' \
    -e 's|santen/cover\.jpg|santen/cover.webp|g' \
    "$SANTEN_MODAL"
  echo "  ✓ Patched: santen/Modal.jsx"
fi

# Also patch WorkBento.jsx santen cover reference
WORKBENTO="$SRC/components/work/WorkBento.jsx"
if [ -f "$WORKBENTO" ]; then
  sed -i '' \
    -e "s|/asset/images/santen/cover\.jpg|/asset/images/santen/cover.webp|g" \
    "$WORKBENTO"
  echo "  ✓ Patched: WorkBento.jsx (santen cover)"
fi

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅  All done! Summary:                      ║"
echo "║  • Unused fonts deleted                      ║"
echo "║  • Unused images deleted                     ║"
echo "║  • Panasonic Social → WebP converted         ║"
echo "║  • Santen images → WebP converted            ║"
echo "║  • JSX references updated                    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
