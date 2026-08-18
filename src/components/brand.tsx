import Image from "next/image";
import { brandAssets, doctor, doctorPortrait } from "@/lib/site";

/**
 * The practice's real logo — hibiscus + "Waikiki DENTAL" wordmark.
 * Use on light surfaces only; the blue/green/red mark does not read on navy.
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

/** Single-color hibiscus mark. Uses currentColor so it fits cream or navy. */
export function Hibiscus({
  className = "",
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M18.5 42c-3.2-6.4 1.4-14.8 8.6-12.2-4.4 3.2-6.6 7.6-8.6 12.2Z"
        opacity="0.7"
      />
      <path
        fill="currentColor"
        d="M32 10c5.2 3.4 7.4 10.4 5.2 16.2C35.4 20.8 32 16.8 32 10c0 6.8-3.4 10.8-5.2 16.2C24.6 20.4 26.8 13.4 32 10Z"
      />
      <path
        fill="currentColor"
        d="M50 22c.2 6.2-3.8 12.2-9.8 14.2 5.2-3.8 8.2-8.8 9.8-14.2Z"
      />
      <path
        fill="currentColor"
        d="M48.5 44c-5.4 3.2-12.4 2.2-16.6-2.2 6 1.4 11.4-.4 16.6 2.2Z"
      />
      <path
        fill="currentColor"
        d="M15.5 44c5.2 3.2 11.8 2.4 16.2-1.8-6 1.2-11.2-.6-16.2 1.8Z"
      />
      <path
        fill="currentColor"
        d="M14 22c1.4 5.4 4.6 10.4 9.8 14.2C17.8 34.2 13.8 28.2 14 22Z"
      />
      <circle cx="32" cy="34" r="5.2" fill="currentColor" />
      <path
        d="M32 34c-3.2-2.4-8.4-6.8-11.5-16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20.2" cy="17.2" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Type lockup for navy surfaces — never the full-color PNG. */
export function WordmarkLockup({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 text-cream ${className}`}>
      <span className="grid size-11 place-items-center rounded-full bg-cream text-sunset-600">
        <Hibiscus size={26} />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-xl tracking-tight text-cream">
          Waikiki Dental
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-ocean-300">
          Roseville, CA
        </span>
      </span>
    </span>
  );
}

/**
 * Dr. Narodovich's real headshot. Keep the frame near the 275×412 source
 * so the portrait stays sharp.
 */
export function DoctorPortrait({
  priority = false,
  className = "object-cover object-top",
}: {
  priority?: boolean;
  className?: string;
}) {
  if (!doctorPortrait) return null;
  return (
    <Image
      src={doctorPortrait}
      alt={`${doctor.name}, dentist at Waikiki Dental in Roseville`}
      fill
      sizes="275px"
      className={className}
      priority={priority}
    />
  );
}
