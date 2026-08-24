import { LockKeyhole } from "lucide-react";

export function PrivacyNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-ocean-100 bg-ocean-50/60 p-4 ${className}`}
      role="note"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cream text-ocean-700 shadow-sm">
        <LockKeyhole className="size-4" aria-hidden="true" />
      </span>
      <p className="text-sm leading-6 text-ink-muted">{children}</p>
    </div>
  );
}

export function PrivacyConsent({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border border-line bg-background/50 p-4 text-sm leading-6 text-ink-muted transition has-[:focus-visible]:border-ocean-400 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ocean-100 hover:border-ocean-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-5 shrink-0 accent-ocean-600"
      />
      <span>{children}</span>
    </label>
  );
}

export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="hidden">
      <label>
        Company
        <input
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          name="_gotcha"
        />
      </label>
    </div>
  );
}
