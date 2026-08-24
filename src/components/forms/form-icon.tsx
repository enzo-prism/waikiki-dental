"use client";

import { Check } from "lucide-react";

export type FormIconTone = "ocean" | "sunset" | "neutral";

const toneClasses: Record<FormIconTone, string> = {
  ocean: "border-ocean-100 bg-ocean-50 text-ocean-700",
  sunset: "border-sunset-100 bg-sunset-50 text-sunset-700",
  neutral: "border-line bg-background text-ink-muted",
};

export function FormIcon({
  children,
  selected = false,
  showCheck = false,
  tone = "ocean",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  selected?: boolean;
  showCheck?: boolean;
  tone?: FormIconTone;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid shrink-0 place-items-center border shadow-[inset_0_1px_0_rgb(255_255_255/0.65)] transition duration-200 ${
        size === "sm" ? "size-10 rounded-xl" : "size-12 rounded-[15px]"
      } ${
        selected
          ? "border-ocean-600 bg-ocean-600 text-cream shadow-[0_8px_20px_-12px_rgb(0_81_174/0.75)]"
          : toneClasses[tone]
      } ${className}`}
    >
      {children}
      {selected && showCheck ? (
        <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full border-2 border-cream bg-sunset-600 text-cream shadow-sm">
          <Check className="size-3" strokeWidth={3} />
        </span>
      ) : null}
    </span>
  );
}
