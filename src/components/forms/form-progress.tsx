"use client";

import { Check } from "lucide-react";

const STEPS = [
  { key: "visit", label: "Visit" },
  { key: "when", label: "When" },
  { key: "reach", label: "Reach" },
] as const;

export function FormProgress({
  step,
  onJump,
}: {
  step: number;
  onJump: (index: number) => void;
}) {
  return (
    <div className="border-b border-line bg-cream px-6 pt-6 sm:px-8">
      <div className="sm:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-ink">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-ink-muted">{STEPS[step].label}</span>
        </div>
        <div className="mt-2 mb-5 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-ocean-600 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden items-center gap-3 pb-5 sm:flex">
        {STEPS.map((item, index) => {
          const done = index < step;
          const current = index === step;
          const reachable = index <= step;
          return (
            <li key={item.key} className="flex flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => onJump(index)}
                disabled={!reachable}
                aria-current={current ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full ${
                  reachable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold transition ${
                    done
                      ? "border-ocean-600 bg-ocean-600 text-cream"
                      : current
                        ? "border-ocean-600 text-ocean-700"
                        : "border-line text-ink-soft"
                  }`}
                >
                  {done ? <Check className="size-4" aria-hidden="true" /> : index + 1}
                </span>
                <span
                  className={`text-sm font-medium ${
                    current ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
              {index < STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={`h-px flex-1 ${done ? "bg-ocean-600" : "bg-line"}`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
