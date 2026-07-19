import Image from "next/image";
import { brandAssets, doctor, doctorPortrait } from "@/lib/site";

/**
 * The practice's real logo — hibiscus + "Waikiki DENTAL" wordmark,
 * the same artwork used on the current public waikikidental.com site.
 * Transparent PNG, so it sits directly on light surfaces.
 */
export function BrandLogo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={brandAssets.logo}
      alt="Waikiki Dental"
      width={brandAssets.logoWidth}
      height={brandAssets.logoHeight}
      priority={priority}
      className={className}
    />
  );
}

/** The hibiscus flower from the logo — the practice's brand mark. */
export function Hibiscus({
  className = "",
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={brandAssets.icon}
      alt=""
      aria-hidden="true"
      width={size}
      height={Math.round(size * (73 / 75))}
      className={className}
    />
  );
}

/**
 * Wave logomark — decorative "Waikiki wave over a smile" glyph used as
 * a supporting motif (footer chips, dark surfaces) where the full-color
 * logo would not read. Uses currentColor so it adapts to its context.
 */
export function Logomark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 12.5q2.75 3 5.5 0t5.5 0t5.5 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 18q8 7.5 16 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Dr. Narodovich's real headshot, from the current public practice site.
 * `sizes` stays modest — the source photo is 275×412, so the frame that
 * renders it should stay near that size for crisp results.
 */
export function DoctorPortrait({ priority = false }: { priority?: boolean }) {
  if (!doctorPortrait) return null;
  return (
    <Image
      src={doctorPortrait}
      alt={`${doctor.name}, dentist at Waikiki Dental in Roseville`}
      fill
      sizes="(max-width: 640px) 84vw, 320px"
      className="img-warm object-cover object-top"
      priority={priority}
    />
  );
}
