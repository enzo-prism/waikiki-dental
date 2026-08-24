"use client";

import { CircleCheckBig, PhoneCall } from "lucide-react";
import { site } from "@/lib/site";

export function RequestSuccess({
  title,
  body,
  recap,
  onReset,
  resetLabel,
}: {
  title: string;
  body: string;
  recap: { label: string; value: string }[];
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div
      className="card p-8 text-center shadow-soft sm:p-12"
      role="status"
      aria-live="polite"
    >
      <span className="mx-auto grid size-20 place-items-center rounded-[26px] border border-ocean-100 bg-ocean-50 text-ocean-700 shadow-[0_16px_32px_-22px_rgb(0_81_174/0.8)]">
        <CircleCheckBig className="size-10" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-serif text-3xl font-medium tracking-tight text-ink">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-pretty leading-8 text-ink-muted">
        {body}
      </p>

      {recap.length > 0 ? (
        <dl className="mx-auto mt-8 max-w-md divide-y divide-line/80 rounded-2xl border border-line bg-background/50 px-5 text-left text-sm">
          {recap.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 py-3">
              <dt className="text-ink-muted">{row.label}</dt>
              <dd className="text-right font-medium text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-8 flex justify-center">
        <a href={site.phoneHref} className="btn btn-outline">
          <PhoneCall className="size-4" aria-hidden="true" />
          Need help? Call {site.phone}
        </a>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-ocean-700 underline-offset-2 hover:underline"
      >
        {resetLabel}
      </button>
    </div>
  );
}
