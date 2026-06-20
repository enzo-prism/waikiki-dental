import Image from "next/image";
import { doctor, doctorPortrait } from "@/lib/site";

/**
 * Waikiki Dental logomark — a wave cresting over a smile.
 * "Waikiki" (the wave) + "Dental" (the smile), drawn in a single accent color.
 * Uses currentColor so it adapts to sage / cream / ink contexts.
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
 * Inner fill for the doctor portrait frame.
 * Renders the real headshot when `doctorPortrait` is set; otherwise a
 * branded monogram — so we never pass a stock face off as Dr. Narodovich.
 */
export function DoctorPortrait({ priority = false }: { priority?: boolean }) {
  if (doctorPortrait) {
    return (
      <Image
        src={doctorPortrait}
        alt={`${doctor.name}, dentist at Waikiki Dental in Roseville`}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="img-warm object-cover"
        priority={priority}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sage-600 to-sage-800 text-cream">
      <Logomark className="size-9 text-cream/65" />
      <span className="mt-5 font-serif text-7xl font-medium leading-none tracking-tight">
        {doctor.initials}
      </span>
      <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/70">
        Photo coming soon
      </span>
    </div>
  );
}
