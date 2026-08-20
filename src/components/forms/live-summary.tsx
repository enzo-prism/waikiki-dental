"use client";

import { Pencil } from "lucide-react";

export type SummaryRow = {
  label: string;
  value: string;
  empty: boolean;
  step: number;
};

export function LiveRequestSummary({
  rows,
  currentStep,
  onJump,
  variant = "rail",
  frozen = false,
}: {
  rows: SummaryRow[];
  currentStep: number;
  onJump: (step: number) => void;
  variant?: "rail" | "compact";
  frozen?: boolean;
}) {
  if (variant === "compact") {
    const filled = rows
      .filter((row) => !row.empty)
      .map((row) => row.value)
      .join(" · ");
    return (
      <p className="truncate text-sm text-ink-muted" aria-live="polite">
        {filled || "Your request will gather here as you go."}
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-cream p-5 shadow-soft">
      <p className="eyebrow text-ocean-600">Your request</p>
      <dl className="mt-4 grid gap-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {row.label}
              </dt>
              <dd
                className={`mt-0.5 text-sm ${
                  row.empty ? "text-ink-soft" : "text-ink"
                }`}
              >
                {row.empty ? "—" : row.value}
              </dd>
            </div>
            {!frozen && !row.empty && row.step <= currentStep ? (
              <button
                type="button"
                onClick={() => onJump(row.step)}
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ocean-700 hover:text-ocean-800"
              >
                <Pencil className="size-3.5" aria-hidden="true" />
                Edit
              </button>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}
