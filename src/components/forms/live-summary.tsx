"use client";

import { ClipboardList, Pencil } from "lucide-react";
import type { ComponentType } from "react";
import { FormIcon } from "@/components/forms/form-icon";

export type SummaryRow = {
  label: string;
  value: string;
  empty: boolean;
  step: number;
  icon: ComponentType<{ className?: string }>;
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
      <div className="flex min-w-0 items-start gap-2.5" aria-live="polite">
        <ClipboardList
          className="mt-0.5 size-4 shrink-0 text-ocean-700"
          aria-hidden="true"
        />
        <p className="line-clamp-2 min-w-0 text-sm leading-5 text-ink-muted">
          {filled || "Your request will gather here as you go."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-cream p-5 shadow-soft">
      <p className="eyebrow text-ocean-600">Your request</p>
      <dl className="mt-4 grid gap-2.5">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
          <div
            key={row.label}
            className={`flex min-w-0 items-center gap-3 rounded-xl border px-3 py-2.5 ${
              row.empty ? "border-transparent bg-background/45" : "border-ocean-100 bg-ocean-50/55"
            }`}
          >
            <FormIcon
              size="sm"
              tone={row.empty ? "neutral" : "ocean"}
              className="size-9 rounded-[11px]"
            >
              <Icon className="size-4" />
            </FormIcon>
            <div className="min-w-0 flex-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {row.label}
              </dt>
              <dd
                className={`mt-0.5 truncate text-sm ${
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
                aria-label={`Edit ${row.label.toLowerCase()}`}
                className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-ocean-700 transition hover:bg-ocean-100 hover:text-ocean-800"
              >
                <Pencil className="size-3.5" aria-hidden="true" />
                Edit
              </button>
            ) : null}
          </div>
          );
        })}
      </dl>
    </div>
  );
}
