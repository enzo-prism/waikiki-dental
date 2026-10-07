import Image from "next/image";
import { HarvestBats } from "@/components/seasonal-client";
import { activeSeason, buildSeasonScript } from "@/lib/seasonal";
import { artwork, doctorPortrait, teamStory } from "@/lib/site";

/**
 * Sets <html data-wd-season> before first paint while a season is active
 * (or previewed). Render inside the root layout's <head>.
 */
export function SeasonScript() {
  if (!activeSeason) return null;
  return (
    <script
      id="wd-season"
      dangerouslySetInnerHTML={{ __html: buildSeasonScript(activeSeason) }}
    />
  );
}

/** Friendly ghost-tooth: a molar crown whose roots become a ghost's hem. */
export function GhostTooth({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14 25c0-10.5 8-17 16-14.6 1 .3 1.6.6 2 .6s1-.3 2-.6C42 8 50 14.5 50 25v32.6c0 1.3-1.5 2-2.5 1.2l-3.3-2.7a2 2 0 0 0-2.5 0l-3.4 2.8a2 2 0 0 1-2.5 0l-3.5-2.8a2 2 0 0 0-2.5 0l-3.5 2.8a2 2 0 0 1-2.5 0l-3.4-2.8a2 2 0 0 0-2.5 0l-3.3 2.7c-1 .8-2.6.1-2.6-1.2V25Z"
        fill="#fdfcfa"
        stroke="#06438c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="25.5" cy="31" rx="2.6" ry="3.4" fill="#14243d" />
      <ellipse cx="38.5" cy="31" rx="2.6" ry="3.4" fill="#14243d" />
      <path
        d="M27.5 39.5c2.6 2.6 6.4 2.6 9 0"
        stroke="#14243d"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20.5" cy="37.5" r="2.6" fill="#e39179" opacity="0.55" />
      <circle cx="43.5" cy="37.5" r="2.6" fill="#e39179" opacity="0.55" />
    </svg>
  );
}

/** 404 seasonal art: the ghost-tooth over a porthole of the night Tide. */
export function SeasonalNotFoundArt() {
  return (
    <div aria-hidden="true" className="wd-season-only mb-10">
      <div
        className="wd-porthole relative mx-auto grid size-40 place-items-center overflow-hidden rounded-full bg-deep shadow-soft-lg ring-4 ring-cream"
        style={{ "--wd-season-porthole": `url(${artwork.tideNight.poster})` } as React.CSSProperties}
      >
        <GhostTooth className="wd-ghost w-16 drop-shadow-[0_10px_18px_rgb(11_33_64/0.45)]" />
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
        Happy Halloween from Waikiki Dental
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Homepage hero scene (October): a harvest moon over the dusk sky, a
 * string of lights, and the real team and Dr. Mike clipped to it as
 * Polaroids. Positions are percentages of the square scene, so the wire,
 * bulbs, and clothespins line up at every width. Shown only in season
 * (`wd-season-only`); the photos are lazy, so other months never fetch them.
 * ------------------------------------------------------------------ */

/** Two swags of light-string wire, in % of the scene. */
const swags = [
  { from: -4, to: 54, top: 4, sag: 20 },
  { from: 54, to: 104, top: 4, sag: 16 },
];

function wireY(swag: (typeof swags)[number], x: number) {
  const half = (swag.to - swag.from) / 2;
  const t = (x - swag.from - half) / half;
  return swag.top + (swag.sag - swag.top) * (1 - t * t);
}

function wirePath() {
  return swags
    .map((swag) => {
      const points = Array.from({ length: 25 }, (_, i) => {
        const x = swag.from + ((swag.to - swag.from) * i) / 24;
        return `${x.toFixed(2)} ${wireY(swag, x).toFixed(2)}`;
      });
      return `M${points.join(" L")}`;
    })
    .join(" ");
}

const bulbColors = ["#f39a3d", "#b593ff", "#ffd27a"];
const bulbs = [
  [0, 4],
  [0, 13],
  [0, 21],
  [0, 39],
  [0, 47],
  [1, 61],
  [1, 69],
  [1, 88],
  [1, 96],
].map(([swag, x], i) => ({
  x,
  y: wireY(swags[swag], x),
  color: bulbColors[i % bulbColors.length],
  delay: `${(0.3 + i * 0.17).toFixed(2)}s`,
}));

const teamPin = { x: 30, y: wireY(swags[0], 30) };
const doctorPin = { x: 79, y: wireY(swags[1], 79) };
/** The doctor's Polaroid hangs lower, on a short twine. */
const doctorTop = 33;

export function HalloweenHeroScene() {
  return (
    <div className="wd-season-only wd-scene relative aspect-square w-full">
      <div aria-hidden="true" className="wd-moon" />
      <HarvestBats />

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <path
          d={`${wirePath()} M${doctorPin.x} ${doctorPin.y} V${doctorTop}`}
          fill="none"
          stroke="var(--wd-harvest-ink)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {bulbs.map((bulb) => (
        <span
          key={bulb.x}
          aria-hidden="true"
          className="wd-bulb pointer-events-none"
          style={
            {
              left: `${bulb.x}%`,
              top: `${bulb.y - 0.6}%`,
              "--bulb": bulb.color,
              "--delay": bulb.delay,
            } as React.CSSProperties
          }
        >
          <span />
        </span>
      ))}

      <GhostTooth className="wd-ghost pointer-events-none absolute left-[-3%] top-[47%] w-[12%] -rotate-12 drop-shadow-[0_8px_16px_rgb(3_8_22/0.5)]" />

      <figure
        className="wd-polaroid p-[2cqw] pb-0"
        style={
          {
            left: `${teamPin.x - 27}%`,
            top: `${teamPin.y}%`,
            width: "54%",
            "--tilt": "-3.5deg",
          } as React.CSSProperties
        }
      >
        <span aria-hidden="true" className="wd-clothespin" />
        <span className="relative block aspect-square overflow-hidden rounded-[0.3cqw] bg-ocean-50">
          <Image
            src={teamStory.groupImage}
            alt={teamStory.groupImageAlt}
            fill
            sizes="(max-width: 1024px) 50vw, 340px"
            className="origin-[50%_45%] scale-[1.3] object-cover object-[50%_60%]"
          />
        </span>
        <figcaption className="py-[2.2cqw] text-center font-serif text-[3.5cqw] italic leading-tight text-ink">
          The Waikiki Dental crew
        </figcaption>
      </figure>

      {doctorPortrait ? (
        <figure
          className="wd-polaroid p-[1.8cqw] pb-0"
          style={
            {
              left: `${doctorPin.x - 18}%`,
              top: `${doctorTop}%`,
              width: "36%",
              "--tilt": "4deg",
              "--delay": "0.25s",
            } as React.CSSProperties
          }
        >
          <span aria-hidden="true" className="wd-clothespin" />
          <span className="relative block aspect-[4/5] overflow-hidden rounded-[0.3cqw] bg-ocean-50">
            <Image
              src={doctorPortrait}
              alt="Dr. Michael Narodovich, smiling"
              fill
              sizes="(max-width: 1024px) 34vw, 220px"
              className="origin-[50%_18%] scale-[1.3] object-cover object-[50%_10%]"
            />
          </span>
          <figcaption className="py-[2cqw] text-center font-serif text-[3.4cqw] italic leading-tight text-ink">
            Dr. Mike
          </figcaption>
        </figure>
      ) : null}

      <GrinningPumpkin className="pointer-events-none absolute left-[86%] top-[71%] w-[15%] rotate-[10deg] drop-shadow-[0_10px_18px_rgb(3_8_22/0.55)]" />
    </div>
  );
}

/** Rolling hills at the foot of the night hero, in the reviews band's navy. */
export function HeroHills() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="wd-season-only pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(56px,8vw,120px)] w-full"
    >
      <path d="M0 120V58c240-34 420-22 640 2s380-10 560-26 220-4 240 4v82Z" fill="#17204a" />
      <path d="M0 120V80c180-28 360-30 560-6s340 32 520-6 260-30 360-14v66Z" className="fill-deep" />
    </svg>
  );
}

/** A friendly jack-o'-lantern sticker with a full, healthy grin. */
export function GrinningPumpkin({ className = "" }: { className?: string }) {
  // Four teeth hang from the upper lip of the grin (a quadratic curve).
  const teeth = [39.5, 46.3, 53.7, 60.5].map((x) => {
    const t = (x - 24) / 52;
    return { x, y: 60 + 20 * t * (1 - t) };
  });
  const body = (
    <>
      <ellipse cx="34" cy="58" rx="26" ry="32" />
      <ellipse cx="66" cy="58" rx="26" ry="32" />
      <ellipse cx="50" cy="57" rx="20" ry="34" />
    </>
  );

  return (
    <svg viewBox="0 0 100 96" aria-hidden="true" className={className}>
      {/* die-cut sticker edge */}
      <g fill="#fdfcfa" stroke="#fdfcfa" strokeWidth="9" strokeLinejoin="round">
        {body}
        <path d="M46 25c-1-9 3-15 10-17l3 5c-5 2-6 6-5 12Z" />
      </g>
      <path d="M46 25c-1-9 3-15 10-17l3 5c-5 2-6 6-5 12Z" fill="#4f7a3a" />
      <g fill="#ec8a2f" stroke="#b9601b" strokeWidth="1.6">
        {body}
      </g>
      <ellipse cx="50" cy="57" rx="20" ry="34" fill="#f39a3d" stroke="#b9601b" strokeWidth="1.6" />
      {/* happy, squinting eyes */}
      <path d="M28 49q7-11 14 0q-7-5-14 0Z" fill="#ffd36b" />
      <path d="M58 49q7-11 14 0q-7-5-14 0Z" fill="#ffd36b" />
      <circle cx="27" cy="59" r="4" fill="#d9542f" opacity="0.4" />
      <circle cx="73" cy="59" r="4" fill="#d9542f" opacity="0.4" />
      {/* the grin */}
      <path d="M24 60q26 26 52 0q-26 10-52 0Z" fill="#ffd36b" />
      {teeth.map((tooth) => (
        <rect
          key={tooth.x}
          x={tooth.x - 2.9}
          y={tooth.y - 0.4}
          width="5.8"
          height="4.6"
          rx="1.3"
          fill="#fdfcfa"
        />
      ))}
      {/* sparkle: freshly brushed */}
      <path
        d="M76 46l1.3 3.2 3.2 1.3-3.2 1.3-1.3 3.2-1.3-3.2-3.2-1.3 3.2-1.3Z"
        fill="#fdfcfa"
      />
    </svg>
  );
}

/** Small pumpkin for the hero's "Happy Halloween" note. */
export function PumpkinGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M11 6.5c-.2-2.4.8-3.8 2.6-4.3l.8 1.4c-1.3.5-1.6 1.4-1.4 2.9Z" fill="#6f9a55" />
      <ellipse cx="8.4" cy="14" rx="6" ry="7.2" fill="#e9862c" />
      <ellipse cx="15.6" cy="14" rx="6" ry="7.2" fill="#e9862c" />
      <ellipse cx="12" cy="13.8" rx="4.4" ry="7.6" fill="#f39a3d" />
    </svg>
  );
}
