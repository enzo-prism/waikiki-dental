#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
asset_tmp="$(mktemp -d /tmp/waikiki-brand-assets.XXXXXX)"
trap 'rm -rf "$asset_tmp"' EXIT

icon_source="$repo_root/src/app/icon.svg"

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

# The Open Graph share card is rendered with the site artwork by
# scripts/generate-abstract-art.py (public/social/waikiki-dental-share-v3.jpg).

identify "$repo_root/src/app/favicon.ico" \
  "$repo_root/src/app/apple-icon.png"
