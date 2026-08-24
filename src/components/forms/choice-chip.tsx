"use client";

import { FormIcon, type FormIconTone } from "@/components/forms/form-icon";

export function ChoiceChip({
  name,
  value,
  checked,
  onChange,
  icon,
  label,
  hint,
  tone = "ocean",
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  label: string;
  hint?: string;
  tone?: FormIconTone;
}) {
  return (
    <label
      className={`flex min-h-16 min-w-0 cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-3 transition duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ocean-100 ${
        checked
          ? "border-ocean-600 bg-ocean-50/80 ring-1 ring-inset ring-ocean-200"
          : "border-line bg-cream hover:-translate-y-0.5 hover:border-ocean-300 hover:shadow-soft"
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
      <FormIcon
        selected={checked}
        showCheck={checked}
        tone={tone}
        size="sm"
      >
        {icon}
      </FormIcon>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint ? (
          <span className="mt-0.5 block text-xs leading-5 text-ink-muted">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
}
