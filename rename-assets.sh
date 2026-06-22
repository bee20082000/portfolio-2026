#!/usr/bin/env bash
# rename-assets.sh
# Renames all git-tracked files/folders with spaces to use hyphens
# Run from the repo root: bash rename-assets.sh

set -e
cd "$(git rev-parse --show-toplevel)"

echo "=== Phase 1: Rename top-level directories ==="

# axon active → axon-active
git mv "public/asset/images/axon active" "public/asset/images/axon-active"

# Moe Cafe → Moe-Cafe
git mv "public/asset/images/Moe Cafe" "public/asset/images/Moe-Cafe"

# Nam Dinh Vu (rename entire tree, then fix internal subdirs)
git mv "public/asset/images/Nam Dinh Vu" "public/asset/images/Nam-Dinh-Vu"

# Tuong an → Tuong-an
git mv "public/asset/images/Tuong an" "public/asset/images/Tuong-an"

# Thuyen xua → Thuyen-xua
git mv "public/asset/images/Thuyen xua" "public/asset/images/Thuyen-xua"

echo "=== Phase 2: Rename internal subdirectories (now under renamed parents) ==="

# Nam-Dinh-Vu internal subdirs
git mv "public/asset/images/Nam-Dinh-Vu/Nha may nuoc thai" "public/asset/images/Nam-Dinh-Vu/Nha-may-nuoc-thai"
git mv "public/asset/images/Nam-Dinh-Vu/Tram dien" "public/asset/images/Nam-Dinh-Vu/Tram-dien"
git mv "public/asset/images/Nam-Dinh-Vu/nha may nuoc" "public/asset/images/Nam-Dinh-Vu/nha-may-nuoc"
git mv "public/asset/images/Nam-Dinh-Vu/tram bom tang ap" "public/asset/images/Nam-Dinh-Vu/tram-bom-tang-ap"

# Tuong-an internal subdir
git mv "public/asset/images/Tuong-an/21 context" "public/asset/images/Tuong-an/21-context"
# Individual files inside Tuong-an
git mv "public/asset/images/Tuong-an/Phao hoa 1.png" "public/asset/images/Tuong-an/Phao-hoa-1.png"
git mv "public/asset/images/Tuong-an/Phao hoa 2.png" "public/asset/images/Tuong-an/Phao-hoa-2.png"
git mv "public/asset/images/Tuong-an/VISUAL CUE.png" "public/asset/images/Tuong-an/VISUAL-CUE.png"

# Tuong-an/21-context internal files
git mv "public/asset/images/Tuong-an/21-context/2 Ha bang.jpg" "public/asset/images/Tuong-an/21-context/2-Ha-bang.jpg"
git mv "public/asset/images/Tuong-an/21-context/21 Phung tai loc.jpg" "public/asset/images/Tuong-an/21-context/21-Phung-tai-loc.jpg"
git mv "public/asset/images/Tuong-an/21-context/3 Giang gia dinh.jpg" "public/asset/images/Tuong-an/21-context/3-Giang-gia-dinh.jpg"
git mv "public/asset/images/Tuong-an/21-context/4 Tuyet tai loc.jpg" "public/asset/images/Tuong-an/21-context/4-Tuyet-tai-loc.jpg"
git mv "public/asset/images/Tuong-an/21-context/5 Hien su nghiep.jpg" "public/asset/images/Tuong-an/21-context/5-Hien-su-nghiep.jpg"
git mv "public/asset/images/Tuong-an/21-context/6 Hien suc khoe.jpg" "public/asset/images/Tuong-an/21-context/6-Hien-suc-khoe.jpg"
git mv "public/asset/images/Tuong-an/21-context/7 Phuong tai loc.jpg" "public/asset/images/Tuong-an/21-context/7-Phuong-tai-loc.jpg"
git mv "public/asset/images/Tuong-an/21-context/8 rita gia dinh.jpg" "public/asset/images/Tuong-an/21-context/8-rita-gia-dinh.jpg"
git mv "public/asset/images/Tuong-an/21-context/9 Huyen su nghiep.jpg" "public/asset/images/Tuong-an/21-context/9-Huyen-su-nghiep.jpg"

# Tuong-an/Phone files
git mv "public/asset/images/Tuong-an/Phone/phone 1.png" "public/asset/images/Tuong-an/Phone/phone-1.png"
git mv "public/asset/images/Tuong-an/Phone/phone 2.png" "public/asset/images/Tuong-an/Phone/phone-2.png"
git mv "public/asset/images/Tuong-an/Phone/phone 3.png" "public/asset/images/Tuong-an/Phone/phone-3.png"

echo "=== Phase 3: Rename individual files with spaces ==="

# axon-active internal files with spaces
git mv "public/asset/images/axon-active/TDC/blueprint train.jpg" "public/asset/images/axon-active/TDC/blueprint-train.jpg"
git mv "public/asset/images/axon-active/TDC/hiking sign ref.jpg" "public/asset/images/axon-active/TDC/hiking-sign-ref.jpg"

# Moe-Cafe files with spaces
git mv "public/asset/images/Moe-Cafe/gori kv - 12fps.mp4" "public/asset/images/Moe-Cafe/gori-kv-12fps.mp4"
git mv "public/asset/images/Moe-Cafe/moe cover.gif" "public/asset/images/Moe-Cafe/moe-cover.gif"
git mv "public/asset/images/Moe-Cafe/moe cover.jpeg" "public/asset/images/Moe-Cafe/moe-cover.jpeg"
git mv "public/asset/images/Moe-Cafe/photo 1.jpeg" "public/asset/images/Moe-Cafe/photo-1.jpeg"
git mv "public/asset/images/Moe-Cafe/photo 5.jpeg" "public/asset/images/Moe-Cafe/photo-5.jpeg"
git mv "public/asset/images/Moe-Cafe/photo 6.jpeg" "public/asset/images/Moe-Cafe/photo-6.jpeg"

# chivas
git mv "public/asset/images/chivas/chivas cover.mp4" "public/asset/images/chivas/chivas-cover.mp4"

# nakivo
git mv "public/asset/images/nakivo/Sequence 01.mp4" "public/asset/images/nakivo/Sequence-01.mp4"

# Panasonic social
git mv "public/asset/images/Panasonic/pana cover.jpg" "public/asset/images/Panasonic/pana-cover.jpg"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 1.png" "public/asset/images/Panasonic/Social/Pana-AOC-post-1.png"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 2.png" "public/asset/images/Panasonic/Social/Pana-AOC-post-2.png"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 3.png" "public/asset/images/Panasonic/Social/Pana-AOC-post-3.png"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 4.png" "public/asset/images/Panasonic/Social/Pana-AOC-post-4.png"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 5.png" "public/asset/images/Panasonic/Social/Pana-AOC-post-5.png"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 6.png" "public/asset/images/Panasonic/Social/Pana-AOC-post-6.png"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 7.png" "public/asset/images/Panasonic/Social/Pana-AOC-post-7.png"
git mv "public/asset/images/Panasonic/Social/Pana - AOC post 8.mp4" "public/asset/images/Panasonic/Social/Pana-AOC-post-8.mp4"
git mv "public/asset/images/Panasonic/Social/Pana - Nam moi.png" "public/asset/images/Panasonic/Social/Pana-Nam-moi.png"
git mv "public/asset/images/Panasonic/Social/Pana - dai ly.png" "public/asset/images/Panasonic/Social/Pana-dai-ly.png"

# Santen
git mv "public/asset/images/santen/Santen - HA post.png" "public/asset/images/santen/Santen-HA-post.png"
git mv "public/asset/images/santen/Santen - Nam Nu post.png" "public/asset/images/santen/Santen-Nam-Nu-post.png"
git mv "public/asset/images/santen/Santen - trend post5 - opt 2.gif" "public/asset/images/santen/Santen-trend-post5-opt-2.gif"
git mv "public/asset/images/santen/Sancoba - Post school life 2.png" "public/asset/images/santen/Sancoba-Post-school-life-2.png"
git mv "public/asset/images/santen/Sancoba - Post school life.png" "public/asset/images/santen/Sancoba-Post-school-life.png"
git mv "public/asset/images/santen/Sancoba - This that.png" "public/asset/images/santen/Sancoba-This-that.png"
git mv "public/asset/images/santen/ST_Sancoba_Trend_post 7.png" "public/asset/images/santen/ST_Sancoba_Trend_post-7.png"
git mv "public/asset/images/santen/Sancoba expert advice post 8.png" "public/asset/images/santen/Sancoba-expert-advice-post-8.png"
git mv "public/asset/images/santen/sancoba product - post 8.png" "public/asset/images/santen/sancoba-product-post-8.png"
git mv "public/asset/images/santen/sancoba product post 4.png" "public/asset/images/santen/sancoba-product-post-4.png"

# Lipton
git mv "public/asset/images/Lipton/summer/Lipton Post 4 video FA.mp4" "public/asset/images/Lipton/summer/Lipton-Post-4-video-FA.mp4"
git mv "public/asset/images/Lipton/tet/Lipton AOC vid 2.mp4" "public/asset/images/Lipton/tet/Lipton-AOC-vid-2.mp4"
git mv "public/asset/images/Lipton/tet/Lipton AOC vid 3.mp4" "public/asset/images/Lipton/tet/Lipton-AOC-vid-3.mp4"
git mv "public/asset/images/Lipton/tet/later/Lipton AOC vid 1.mp4" "public/asset/images/Lipton/tet/later/Lipton-AOC-vid-1.mp4"

# Audio
git mv "public/asset/audio/Taylor Swift - Opalite (Lyric Video).mp3" "public/asset/audio/Taylor-Swift-Opalite-Lyric-Video.mp3"
git mv "public/asset/audio/mixkit-arrow-whoosh-1491 (online-video-cutter.com).mp3" "public/asset/audio/mixkit-arrow-whoosh-1491.mp3"

# Nam-Dinh-Vu internal file with space
git mv "public/asset/images/Nam-Dinh-Vu/nha-may-nuoc/JPEG/nhamaynuoc1_high view.jpg" "public/asset/images/Nam-Dinh-Vu/nha-may-nuoc/JPEG/nhamaynuoc1_high-view.jpg"

# Fonts
git mv "src/assets/fonts/OTT Moore-Black.otf" "src/assets/fonts/OTT-Moore-Black.otf" 2>/dev/null || true

echo "=== Phase 4: Remove Windows shortcut (shouldn't be in repo) ==="
git rm "public/images - Shortcut.lnk" 2>/dev/null || true

echo "=== Done! All renames staged. ==="
git ls-files | grep " " && echo "WARNING: some space files remain!" || echo "SUCCESS: No more spaces in tracked filenames."
