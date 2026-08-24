"use client";

import { FormIcon, type FormIconTone } from "@/components/forms/form-icon";

export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  icon,
  label,
  hint,
  tone = "ocean",
  inputType = "radio",
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
  tone?: FormIconTone;
  inputType?: "radio" | "checkbox";
}) {
  return (
    <label
      className={`group relative flex min-h-24 min-w-0 cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 transition duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ocean-100 sm:p-5 ${
        checked
          ? "border-ocean-600 bg-ocean-50/80 ring-1 ring-inset ring-ocean-200"
          : "border-line bg-cream hover:-translate-y-0.5 hover:border-ocean-300 hover:shadow-soft"
      }`}
    >
      <input
        type={inputType}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <FormIcon selected={checked} showCheck={checked} tone={tone}>
        {icon}
      </FormIcon>
      <span className="min-w-0 flex-1">
        <span className="block text-balance font-serif text-lg leading-snug text-ink">
          {label}
        </span>
        <span className="mt-1 block text-sm leading-5 text-ink-muted">{hint}</span>
      </span>
    </label>
  );
}
