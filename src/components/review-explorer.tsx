"use client";

import { useMemo, useState } from "react";
import { Quote, Star } from "lucide-react";
import {
  reviewExcerpts,
  reviewThemeLabels,
  type ReviewTheme,
} from "@/lib/site";

const filters: Array<{ key: "all" | ReviewTheme; label: string }> = [
  { key: "all", label: "All highlights" },
  ...Object.entries(reviewThemeLabels).map(([key, label]) => ({
    key: key as ReviewTheme,
    label,
  })),
];

function ReviewStars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-4 fill-current" aria-hidden="true" />
      ))}
    </div>
  );
}

export function ReviewExplorer() {
  const [activeFilter, setActiveFilter] = useState<"all" | ReviewTheme>("all");

  const visibleReviews = useMemo(
    () =>
      activeFilter === "all"
        ? reviewExcerpts
        : reviewExcerpts.filter((review) => review.themes.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <div>
      <div
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        aria-label="Filter review highlights"
      >
        {filters.map((filter) => {
          const selected = filter.key === activeFilter;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={selected}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
                selected
                  ? "border-deep bg-deep text-cream"
                  : "border-line-strong bg-cream text-ink-muted hover:border-ocean-500 hover:text-ink"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-ink-soft" aria-live="polite">
        Showing {visibleReviews.length} verified review {visibleReviews.length === 1 ? "highlight" : "highlights"}
      </p>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {visibleReviews.map((review) => (
          <article
            key={`${review.name}-${review.context}`}
            className="flex min-h-[270px] flex-col rounded-3xl border border-line bg-cream p-6 shadow-soft sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <ReviewStars />
              <Quote className="size-5 text-ocean-200" aria-hidden="true" />
            </div>
            <blockquote className="mt-6 text-balance font-serif text-2xl font-medium leading-snug tracking-tight text-ink">
              “{review.quote}”
            </blockquote>
            <footer className="mt-auto flex items-center gap-3 border-t border-line pt-6">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full bg-ocean-50 text-xs font-bold text-ocean-700"
                aria-hidden="true"
              >
                {review.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{review.name}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">
                  {review.context} · Google review
                </span>
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
