export function PrivacyConsent({
  checked,
  onChange,
  children,
  invalid = false,
  describedBy,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
  invalid?: boolean;
  describedBy?: string;
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border border-line bg-background/50 p-4 text-sm leading-6 text-ink-muted transition has-[:focus-visible]:border-ocean-400 hover:border-ocean-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? describedBy : undefined}
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
