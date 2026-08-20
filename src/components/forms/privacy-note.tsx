export function PrivacyNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm leading-6 text-ink-muted ${className}`}>{children}</p>
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
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-background/50 p-4 text-sm leading-6 text-ink-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 shrink-0 accent-ocean-600"
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
