"use client";

import { Check } from "lucide-react";

export function ChoiceChip({
  name,
  value,
  checked,
  onChange,
  icon,
  label,
  hint,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  label: string;
  hint?: string;
}) {
  return (
    <label
      className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ocean-100 ${
        checked
          ? "border-ocean-500 bg-ocean-50"
          : "border-line bg-cream hover:border-ocean-300"
      }`}
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
        className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full ${
          checked ? "bg-ocean-600 text-cream" : "bg-ocean-50 text-ocean-600"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint ? (
          <span className="mt-0.5 block text-xs leading-5 text-ink-muted">
            {hint}
          </span>
        ) : null}
      </span>
      {checked ? (
        <Check className="mt-1 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
      ) : null}
    </label>
  );
}
