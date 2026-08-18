/**
 * Single remaining wave graphic — the hero headline underline.
 * Other wave textures were retired so the mark stays rare.
 */
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
