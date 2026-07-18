/**
 * Waikiki wave graphics — the logomark's wave as reusable SVG pieces.
 * Everything renders with currentColor and is decorative (aria-hidden).
 * The swell path tiles seamlessly every 180 units: the `t` reflection
 * keeps the end tangent identical to the start tangent.
 */

function swell(humps: number, closeAt?: number) {
  let d = "M0 64 q45 -34 90 0";
  for (let i = 1; i < humps; i++) d += " t90 0";
  if (closeAt) d += ` V${closeAt} H0 Z`;
  return d;
}

/**
 * Solid wave edge — sit at the top or bottom of a colored section.
 * `className` sets size + fill color (text-*). `flip` rotates it 180°.
 */
export function WaveDivider({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d={swell(16, 96)} fill="currentColor" opacity="0.35" transform="translate(90 10)" />
      <path d={swell(16, 96)} fill="currentColor" />
    </svg>
  );
}

/** Ghosted line-art waves — background texture for heroes and headers. */
export function WaveLines({
  className = "",
  rows = 3,
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
      className={`block ${className}`}
    >
      {Array.from({ length: rows }).map((_, row) => (
        <path
          key={row}
          d={swell(16)}
          transform={`translate(${row * 60} ${row * 26})`}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={0.9 - row * 0.3}
        />
      ))}
    </svg>
  );
}

/** Small hand-drawn underline for headline accents. */
export function WaveUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 16"
      aria-hidden="true"
      fill="none"
      className={`block ${className}`}
    >
      <path
        d="M3 9 q22.5 -9 45 0 t45 0 t45 0 t42 0"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Endlessly drifting wave strip — render inside an overflow-hidden
 * container. Two 1440-wide swells loop via the .wave-drift utility.
 */
export function DriftWaves({
  className = "",
  slow = false,
}: {
  className?: string;
  slow?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex w-[200%] ${slow ? "wave-drift-slow" : "wave-drift"} ${className}`}
    >
      {[0, 1].map((copy) => (
        <svg
          key={copy}
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="h-full w-1/2 shrink-0"
        >
          <path d={swell(16, 96)} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
