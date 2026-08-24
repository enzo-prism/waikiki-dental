"use client";

import { CalendarDays, Check, ContactRound, ListChecks } from "lucide-react";

const STEPS = [
  { key: "visit", label: "Visit", icon: ListChecks },
  { key: "when", label: "When", icon: CalendarDays },
  { key: "reach", label: "Reach", icon: ContactRound },
] as const;

export function FormProgress({
  step,
  onJump,
}: {
  step: number;
  onJump: (index: number) => void;
}) {
  return (
    <div className="min-w-0 border-b border-line bg-cream px-5 pt-5 sm:px-8 sm:pt-6">
      <div className="sm:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ocean-600 text-cream shadow-[0_8px_20px_-12px_rgb(0_81_174/0.75)]">
            {(() => {
              const Icon = STEPS[step].icon;
              return <Icon className="size-5" aria-hidden="true" />;
            })()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-700">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-ink">
              {STEPS[step].label}
            </span>
          </span>
          <span className="text-xs font-semibold tabular-nums text-ink-soft">
            {Math.round(((step + 1) / STEPS.length) * 100)}%
          </span>
        </div>
        <div className="mt-3 mb-5 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-ocean-600 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden min-w-0 items-center gap-2 pb-5 sm:flex">
        {STEPS.map((item, index) => {
          const Icon = item.icon;
          const done = index < step;
          const current = index === step;
          const reachable = index <= step;
          return (
            <li key={item.key} className="flex min-w-0 flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => onJump(index)}
                disabled={!reachable}
                aria-current={current ? "step" : undefined}
                aria-label={`${item.label}, step ${index + 1} of ${STEPS.length}${done ? ", completed" : current ? ", current" : ""}`}
                className={`flex min-h-11 min-w-0 items-center gap-2 rounded-xl px-1.5 transition ${
                  reachable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl border text-sm font-semibold transition ${
                    done
                      ? "border-ocean-600 bg-ocean-600 text-cream"
                      : current
                        ? "border-ocean-200 bg-ocean-50 text-ocean-700"
                        : "border-line bg-background text-ink-soft"
                  }`}
                >
                  {done ? (
                    <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  ) : (
                    <Icon className="size-4" aria-hidden="true" />
                  )}
                </span>
                <span
                  className={`truncate text-sm font-semibold ${
                    current ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
              {index < STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={`h-px min-w-3 flex-1 ${done ? "bg-ocean-600" : "bg-line"}`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
