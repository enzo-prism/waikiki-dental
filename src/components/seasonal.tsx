import { activeSeason, buildSeasonScript } from "@/lib/seasonal";
import { artwork } from "@/lib/site";

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
