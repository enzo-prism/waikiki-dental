#!/usr/bin/env python3
"""Render Waikiki Dental's original abstract artwork ("Tide").

The site's imagery is either real photography of the practice or original,
non-representational art. This script is the source for the art: a calm,
Rothko-like Pacific horizon whose glow swells and settles on a slow breathing
cycle, echoing the homepage promise of "dentistry that feels like a deep
breath." Every animated term is periodic over the loop, so the video repeats
seamlessly, and frame 0 doubles as the still poster.

Usage (numpy + Pillow, ffmpeg on PATH):

    python3 scripts/generate-abstract-art.py            # all variants
    python3 scripts/generate-abstract-art.py --still    # posters only

Outputs land in public/media/art/, plus the Open Graph share card in
public/social/ (art + Dr. Narodovich's real headshot; macOS system fonts).
"""

from __future__ import annotations

import argparse
import subprocess
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "media" / "art"

FPS = 24
SECONDS = 12  # one slow inhale + exhale
FRAMES = FPS * SECONDS
TAU = 2 * np.pi


def hex_rgb(value: str) -> np.ndarray:
    value = value.lstrip("#")
    return np.array([int(value[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float32) / 255


@dataclass(frozen=True)
class Palette:
    # (position, colour) stops down the canvas, sampled on a warped y axis.
    # Sky stops end at the horizon; sea stops start there.
    sky: tuple[tuple[float, str], ...]
    sea: tuple[tuple[float, str], ...]
    sun_core: str
    sun_halo: str
    glitter: str
    horizon: float
    sun_x: float
    sun_strength: float


DAY = Palette(
    sky=(
        (0.00, "#0b2140"),
        (0.16, "#0f2d59"),
        (0.30, "#1d4a8c"),
        (0.40, "#4f78bd"),
        (0.47, "#b7a3c4"),
        (0.515, "#f0b8a0"),
        (0.545, "#f6d39a"),
        (0.56, "#f2a584"),
    ),
    sea=(
        (0.56, "#6285c2"),
        (0.60, "#3f6fb7"),
        (0.68, "#1c4d93"),
        (0.82, "#0d3268"),
        (1.00, "#0a2244"),
    ),
    sun_core="#fff1d6",
    sun_halo="#f4b28f",
    glitter="#ffe2b8",
    horizon=0.56,
    sun_x=0.63,
    sun_strength=1.0,
)

NIGHT = Palette(
    sky=(
        # Edges match the site's `deep` navy so the art dissolves into it.
        (0.00, "#0b2140"),
        (0.20, "#0d2446"),
        (0.36, "#132e58"),
        (0.46, "#29497f"),
        (0.515, "#8a7fa8"),
        (0.545, "#d9a58f"),
        (0.56, "#c98a86"),
    ),
    sea=(
        (0.56, "#3a5689"),
        (0.60, "#1f3f73"),
        (0.70, "#11294f"),
        (0.85, "#0c2244"),
        (1.00, "#0b2140"),
    ),
    sun_core="#f8e6cf",
    sun_halo="#c98f8a",
    glitter="#f1d3b8",
    horizon=0.56,
    sun_x=0.70,
    sun_strength=0.62,
)


def ramp(values: np.ndarray, stops: tuple[tuple[float, str], ...]) -> np.ndarray:
    positions = np.array([s[0] for s in stops], dtype=np.float32)
    colours = np.stack([hex_rgb(s[1]) for s in stops])
    flat = np.clip(values, 0, 1).ravel()
    out = np.empty((flat.size, 3), dtype=np.float32)
    for channel in range(3):
        out[:, channel] = np.interp(flat, positions, colours[:, channel])
    return out.reshape(values.shape + (3,))


def fractal_noise(rng, height: int, width: int, cells_y: float, cells_x: float,
                  octaves: int = 5, gain: float = 0.5) -> np.ndarray:
    """Smooth multi-octave value noise, normalised to zero mean, unit spread.

    `cells_x` < `cells_y` stretches features horizontally — brush strokes.
    """
    total = np.zeros((height, width), dtype=np.float32)
    amplitude = 1.0
    for _ in range(octaves):
        gy, gx = max(2, int(round(cells_y)) + 3), max(2, int(round(cells_x)) + 3)
        grid = rng.standard_normal((gy, gx)).astype(np.float32)
        layer = ndimage.zoom(grid, (height * 1.0 / (gy - 3), width * 1.0 / (gx - 3)), order=3)
        oy = int(rng.integers(0, max(1, layer.shape[0] - height)))
        ox = int(rng.integers(0, max(1, layer.shape[1] - width)))
        total += amplitude * layer[oy : oy + height, ox : ox + width]
        amplitude *= gain
        cells_y *= 2.0
        cells_x *= 2.0
    total -= total.mean()
    return total / (total.std() + 1e-6)


class LoopingField:
    """A noise field that drifts and morphs, returning exactly to frame 0.

    Three independent fields are blended with periodic weights, and each one
    sways horizontally on its own phase, so the texture keeps evolving but the
    loop has no seam.
    """

    def __init__(self, rng, height, width, cells_y, cells_x, sway_px, octaves=5, gain=0.5):
        pad = int(np.ceil(sway_px)) + 2
        self.pad, self.width, self.sway = pad, width, sway_px
        self.fields = [
            fractal_noise(rng, height, width + 2 * pad, cells_y, cells_x, octaves, gain)
            for _ in range(3)
        ]
        self.phases = [0.0, TAU / 3, 2 * TAU / 3]

    def at(self, theta: float) -> np.ndarray:
        total = None
        weights = []
        for field, phase in zip(self.fields, self.phases):
            weight = 0.5 + 0.5 * np.cos(theta - phase)
            weights.append(weight)
            shift = self.pad + self.sway * np.sin(theta + phase * 1.7)
            base = int(np.floor(shift))
            frac = shift - base
            sample = field[:, base : base + self.width] * (1 - frac) + field[
                :, base + 1 : base + 1 + self.width
            ] * frac
            total = sample * weight if total is None else total + sample * weight
        return total / np.sqrt(np.sum(np.square(weights)))


def smoothstep(edge0, edge1, value):
    t = np.clip((value - edge0) / (edge1 - edge0), 0, 1)
    return t * t * (3 - 2 * t)


class Renderer:
    def __init__(self, width: int, height: int, palette: Palette, seed: int = 4):
        self.w, self.h, self.p = width, height, palette
        rng = np.random.default_rng(seed)
        xs = (np.arange(width, dtype=np.float32) + 0.5) / width
        ys = (np.arange(height, dtype=np.float32) + 0.5) / height
        self.x, self.y = np.meshgrid(xs, ys)
        self.aspect = width / height
        scale = height / 1000

        # Cloudy, feathered edges between the colour bands.
        self.band_warp = LoopingField(rng, height, width, 3, 2.2, 18 * scale, octaves=4)
        # Long horizontal brush strokes (sea + sky striation).
        self.strokes = LoopingField(rng, height, width, 70, 3.2, 30 * scale, octaves=3, gain=0.55)
        # Soft mottling, like pigment pooling on paper.
        self.mottle = LoopingField(rng, height, width, 6, 6, 10 * scale, octaves=4)

        # Static paper tooth: fibres plus fine grain. Fixed across frames.
        fibre = fractal_noise(rng, height, width, 180, 40, octaves=2)
        grain = rng.standard_normal((height, width)).astype(np.float32)
        # Slightly soft grain survives video compression without flicker.
        grain = ndimage.gaussian_filter(grain, 1.1)
        grain /= grain.std() + 1e-6
        self.paper = (0.012 * fibre + 0.008 * grain)[..., None]

        xx, yy = self.x - 0.5, self.y - 0.5
        self.vignette = (1 - 0.22 * (xx**2 * 1.1 + yy**2 * 1.5))[..., None]
        self.sun_x = p_sun_x = palette.sun_x
        self.sun_dx = (self.x - p_sun_x) * self.aspect

    def frame(self, index: int) -> np.ndarray:
        p = self.p
        theta = TAU * index / FRAMES
        # Breath: slow ease in and out (0 → 1 → 0), lingering at the top.
        breath = (0.5 - 0.5 * np.cos(theta)) ** 0.85
        x, y = self.x, self.y

        warp = self.band_warp.at(theta)
        strokes = self.strokes.at(theta)
        mottle = self.mottle.at(theta)

        horizon = p.horizon + 0.004 * np.sin(TAU * 0.6 * x + theta)
        distance = y - horizon
        near = np.exp(-np.abs(distance) * 7)

        # Warp the vertical axis: cloudy edges far from the horizon, brushy
        # striation near it, and a horizon band that breathes open.
        # A calm sea keeps a near-level horizon, so the cloudy warp fades
        # out right at the waterline.
        level = 1 - 0.85 * np.exp(-np.abs(distance) * 30)
        band_y = y + 0.016 * warp * level + 0.0035 * strokes * (0.35 + near)
        open_by = 1 + 0.16 * breath
        band_y = horizon + (band_y - horizon) / (1 + (open_by - 1) * near)
        water_mask = smoothstep(-0.0015, 0.0025, distance)[..., None]
        # The sea is sampled on its own ramp so the warm sky never leaks below
        # the waterline; it only sways gently with the swell.
        sea_y = y + 0.006 * warp + 0.004 * strokes
        colour = ramp(band_y, p.sky) * (1 - water_mask) + ramp(sea_y, p.sea) * water_mask

        # Pigment mottling: gently modulate value, a little more in the sky.
        colour *= (1 + 0.035 * mottle * (1.2 - 0.4 * (y > horizon)))[..., None]

        # A diffused sun resting on the horizon — soft, painterly edge.
        sun_y = horizon - 0.028
        radius = 0.05 * (1 + 0.07 * breath)
        dy = y - sun_y
        r = np.sqrt(self.sun_dx**2 + dy**2)
        edge_noise = 0.006 * warp + 0.003 * mottle
        disc = (1 - smoothstep(radius - 0.012, radius + 0.014, r + edge_noise)) * smoothstep(
            0.006, -0.004, distance
        )
        halo = np.exp(-((r / (radius * 3.0)) ** 2)) * (0.42 + 0.22 * breath)
        bloom = np.exp(-((r / (radius * 8.5)) ** 2)) * (0.20 + 0.12 * breath)
        s = p.sun_strength
        colour += (bloom[..., None] * 0.55 + halo[..., None] * 0.55) * hex_rgb(p.sun_halo) * s
        # The disc is always the brightest thing in the sky, even at the
        # height of the breath when the halo swells around it.
        core = np.maximum(colour, hex_rgb(p.sun_core)) * (1 + 0.04 * breath)
        colour = colour * (1 - 0.9 * disc[..., None] * s) + 0.9 * disc[..., None] * s * core

        # Water: brush strokes catch the light, strongest in the sun's path.
        below = np.clip(distance / 0.44, 0, 1)
        water = smoothstep(0.0, 0.01, distance)
        path = np.exp(-((self.sun_dx / (0.05 + 0.2 * below)) ** 2))
        highlights = np.clip(strokes - 0.55, 0, None) ** 1.4
        glint = highlights * water * (0.10 + 0.9 * path) * np.exp(-below * 1.8)
        glint *= (0.6 + 0.4 * breath) * s
        colour += (glint * 0.42)[..., None] * hex_rgb(p.glitter)
        # Warm reflection pooling on the water beneath the sun.
        pool = path * water * np.exp(-below * 4.0) * (0.30 + 0.14 * breath) * s
        pool *= 1 + 0.35 * strokes
        colour += pool[..., None] * hex_rgb(p.sun_halo) * 0.55
        # Darker troughs between strokes give the sea body.
        troughs = np.clip(-strokes - 0.6, 0, None)
        colour *= (1 - 0.05 * troughs * water)[..., None]
        # Faint striation in the sky too, like dry-brushed layers.
        colour *= (1 + 0.012 * strokes * (1 - water))[..., None]

        colour = colour * self.vignette + self.paper
        return (np.clip(colour, 0, 1) * 255 + 0.5).astype(np.uint8)


def save_poster(renderer: Renderer, path: Path) -> None:
    Image.fromarray(renderer.frame(0)).save(path, quality=90, optimize=True, progressive=True)
    print(f"wrote {path.relative_to(ROOT)}")


def encode(renderer: Renderer, stem: Path) -> None:
    size = f"{renderer.w}x{renderer.h}"
    raw = ["-f", "rawvideo", "-pix_fmt", "rgb24", "-s", size, "-r", str(FPS), "-i", "-"]
    targets = [
        (
            stem.with_suffix(".mp4"),
            ["-c:v", "libx264", "-preset", "veryslow", "-crf", "22", "-tune", "grain",
             "-g", str(FRAMES), "-keyint_min", str(FRAMES), "-sc_threshold", "0",
             "-x264-params", "ipratio=1.0:pbratio=1.0:aq-mode=3",
             "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-profile:v", "high"],
        ),
        (
            stem.with_suffix(".webm"),
            ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "34", "-row-mt", "1",
             "-g", str(FRAMES), "-auto-alt-ref", "1", "-lag-in-frames", "25",
             "-deadline", "good", "-cpu-used", "1", "-pix_fmt", "yuv420p"],
        ),
    ]
    frames = [renderer.frame(i) for i in range(FRAMES)]
    for path, codec in targets:
        cmd = ["ffmpeg", "-y", "-loglevel", "error", *raw, "-an", *codec, str(path)]
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        assert proc.stdin
        for frame in frames:
            proc.stdin.write(frame.tobytes())
        proc.stdin.close()
        if proc.wait() != 0:
            raise SystemExit(f"ffmpeg failed for {path}")
        print(f"wrote {path.relative_to(ROOT)} ({path.stat().st_size / 1024:.0f} KB)")


SOCIAL = ROOT / "public" / "social" / "waikiki-dental-share-v3.jpg"
FONTS = Path("/System/Library/Fonts")


def social_card() -> None:
    """1200×630 share card: the Tide artwork, brand type, and the real doctor."""
    width, height = 1200, 630
    art = Renderer(width, height, Palette(**{**DAY.__dict__, "sun_x": 0.8}))
    card = Image.fromarray(art.frame(FRAMES // 2)).convert("RGBA")

    # Navy wash on the left so the type sits on a calm, legible field.
    xs = np.linspace(0, 1, width, dtype=np.float32)
    alpha = np.clip(1 - (xs - 0.18) / 0.5, 0, 1) ** 1.4 * 0.94
    wash = np.zeros((height, width, 4), dtype=np.uint8)
    wash[..., :3] = (hex_rgb("#0b2140") * 255).astype(np.uint8)
    wash[..., 3] = (np.tile(alpha, (height, 1)) * 255).astype(np.uint8)
    card = Image.alpha_composite(card, Image.fromarray(wash))

    draw = ImageDraw.Draw(card)
    avenir = lambda size, index=5: ImageFont.truetype(str(FONTS / "Avenir Next.ttc"), size, index=index)
    serif = ImageFont.truetype(str(FONTS / "NewYork.ttf"), 66)
    serif_italic = ImageFont.truetype(str(FONTS / "NewYorkItalic.ttf"), 68)

    hibiscus = Image.open(ROOT / "public" / "media" / "hibiscus.png").convert("RGBA")
    hibiscus = hibiscus.resize((52, 50), Image.LANCZOS)
    card.alpha_composite(hibiscus, (64, 58))
    draw.text((132, 60), "WAIKIKI DENTAL", font=avenir(28, 2), fill="#fdfcfa")
    draw.text((133, 96), "ROSEVILLE, CALIFORNIA", font=avenir(16, 5), fill="#8badde")

    draw.text((64, 168), "Dentistry that", font=serif, fill="#fdfcfa")
    draw.text((64, 246), "feels like a", font=serif, fill="#fdfcfa")
    draw.text((64, 318), "deep breath.", font=serif_italic, fill="#f0b4a6")
    draw.text((66, 424), "IV sedation  ·  Implants  ·  Unhurried care", font=avenir(22, 5), fill="#d8e5f5")

    # Real headshot, framed in a cream ring, with the doctor's name.
    size = 84
    avatar = Image.open(ROOT / "public" / "media" / "dr-narodovich-avatar.jpg").convert("RGBA")
    avatar = avatar.resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
    avatar.putalpha(mask.resize((size, size), Image.LANCZOS))
    ring = Image.new("RGBA", (size + 8, size + 8), (0, 0, 0, 0))
    ImageDraw.Draw(ring).ellipse((0, 0, size + 7, size + 7), fill="#fdfcfa")
    ax, ay = 68, 500
    card.alpha_composite(ring, (ax - 4, ay - 4))
    card.alpha_composite(avatar, (ax, ay))
    draw.text((ax + size + 22, ay + 14), "Michael Narodovich, DMD", font=avenir(24, 2), fill="#fdfcfa")
    draw.text((ax + size + 22, ay + 48), "Your dentist in Roseville", font=avenir(18, 5), fill="#b9cfee")

    SOCIAL.parent.mkdir(parents=True, exist_ok=True)
    card.convert("RGB").save(SOCIAL, quality=88, optimize=True, progressive=True)
    print(f"wrote {SOCIAL.relative_to(ROOT)} ({SOCIAL.stat().st_size / 1024:.0f} KB)")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--still", action="store_true", help="render posters only")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)

    variants = [
        ("tide", Renderer(1200, 1200, DAY)),
        ("tide-night", Renderer(1600, 1000, NIGHT)),
    ]
    for name, renderer in variants:
        save_poster(renderer, OUT / f"{name}-poster.jpg")
        if not args.still:
            encode(renderer, OUT / f"{name}-loop")
    social_card()


if __name__ == "__main__":
    main()
