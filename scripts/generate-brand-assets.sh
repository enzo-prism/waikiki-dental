#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
asset_tmp="$(mktemp -d /tmp/waikiki-brand-assets.XXXXXX)"
trap 'rm -rf "$asset_tmp"' EXIT

icon_source="$repo_root/src/app/icon.svg"
social_dir="$repo_root/public/social"
mkdir -p "$social_dir"

# Browser/search icon fallbacks and the iOS home-screen icon all derive from
# the same simple five-petal construction so tiny sizes stay legible.
magick -size 512x512 canvas:'#0b2140' \
  -fill '#e76f5b' -stroke none \
  -draw 'circle 256,152 344,152' \
  -draw 'circle 360,224 448,224' \
  -draw 'circle 320,352 408,352' \
  -draw 'circle 192,352 280,352' \
  -draw 'circle 152,224 240,224' \
  -fill '#f5b3a5' -draw 'circle 256,256 306,256' \
  -stroke '#f3cf8b' -strokewidth 22 \
  -draw 'line 244,244 108,104' \
  -stroke none -fill '#f3cf8b' -draw 'circle 100,96 120,96' \
  -depth 8 "$asset_tmp/icon-master.png"
magick "$asset_tmp/icon-master.png" \
  -define icon:auto-resize=48,32,16 \
  "$repo_root/src/app/favicon.ico"
magick "$asset_tmp/icon-master.png" -resize 180x180 \
  "$repo_root/src/app/apple-icon.png"

# Crop the approved site hero into a social-first portrait composition.
magick "$repo_root/public/media/dr-narodovich-patient.jpg" \
  -auto-orient -resize '650x630^' -gravity center -extent 650x630 \
  "$asset_tmp/photo.png"

magick -size 1200x630 canvas:'#0b2140' \
  "$asset_tmp/photo.png" -gravity east -composite \
  \( -size 260x630 gradient:'#0b2140-none' \) \
  -gravity east -geometry +430+0 -composite \
  \( "$asset_tmp/icon-master.png" -resize 64x64 \) \
  -gravity northwest -geometry +64+54 -composite \
  -font '/System/Library/Fonts/Avenir Next.ttc' \
  -fill '#fdfcfa' -pointsize 30 -kerning 2 \
  -gravity northwest -annotate +146+70 'WAIKIKI DENTAL' \
  -font '/System/Library/Fonts/Supplemental/Arial.ttf' \
  -fill '#8badde' -pointsize 17 -kerning 3 \
  -annotate +148+110 'ROSEVILLE, CALIFORNIA' \
  -font '/System/Library/Fonts/NewYork.ttf' \
  -fill '#fdfcfa' -pointsize 65 -kerning -1 -interline-spacing -5 \
  -annotate +64+205 $'Dentistry that\nfeels like a' \
  -font '/System/Library/Fonts/NewYorkItalic.ttf' \
  -fill '#f0b4a6' -pointsize 66 \
  -annotate +64+371 'deep breath.' \
  -font '/System/Library/Fonts/Avenir Next.ttc' \
  -fill '#d8e5f5' -pointsize 22 -kerning 0.5 \
  -annotate +66+500 'Sedation  •  Implants  •  Same-day crowns' \
  -fill '#fdfcfa' -pointsize 20 \
  -annotate +842+575 'Michael Narodovich, DMD' \
  -strip -depth 8 -define png:compression-level=9 \
  "$social_dir/waikiki-dental-share-v2.png"

identify "$repo_root/src/app/favicon.ico" \
  "$repo_root/src/app/apple-icon.png" \
  "$social_dir/waikiki-dental-share-v2.png"
