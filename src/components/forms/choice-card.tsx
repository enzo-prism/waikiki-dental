"use client";

import { Check } from "lucide-react";

export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  icon,
  label,
  hint,
  accent,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
  accent?: "ocean" | "sunset";
}) {
  const accentClass =
    accent === "sunset"
      ? "border-l-[3px] border-l-sunset-500"
      : accent === "ocean"
        ? "border-l-[3px] border-l-ocean-600"
        : "";
  return (
    <label
      className={`relative flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ocean-100 ${
        checked
          ? "border-ocean-500 bg-ocean-50"
          : "border-line bg-cream hover:border-ocean-300"
      } ${accentClass}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-full transition ${
          checked ? "bg-ocean-600 text-cream" : "bg-ocean-50 text-ocean-600"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-serif text-lg text-ink">{label}</span>
        <span className="mt-0.5 block text-sm text-ink-muted">{hint}</span>
      </span>
      {checked ? (
        <Check
          className="absolute right-4 top-4 size-5 text-ocean-600"
          aria-hidden="true"
        />
      ) : null}
    </label>
  );
}
