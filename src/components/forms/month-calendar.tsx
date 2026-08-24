"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  isWeekend,
  parseLocalIso,
  startOfToday,
  toLocalIso,
} from "@/lib/forms";

const WEEKDAYS = [
  { short: "S", long: "Sunday" },
  { short: "M", long: "Monday" },
  { short: "T", long: "Tuesday" },
  { short: "W", long: "Wednesday" },
  { short: "T", long: "Thursday" },
  { short: "F", long: "Friday" },
  { short: "S", long: "Saturday" },
];

type Cell = {
  iso: string;
  date: Date;
  inMonth: boolean;
  disabled: boolean;
};

function buildCells(year: number, month: number): Cell[] {
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const today = startOfToday();
  const cells: Cell[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(year, month, index - startOffset + 1);
    const inMonth = date.getMonth() === month;
    const disabled =
      !inMonth || date < today || isWeekend(date);
    cells.push({
      iso: toLocalIso(date),
      date,
      inMonth,
      disabled,
    });
  }

  return cells;
}

export function MonthCalendar({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (iso: string) => void;
  disabled?: boolean;
}) {
  const today = startOfToday();
  const selected = value ? parseLocalIso(value) : null;
  const [cursor, setCursor] = useState(() =>
    selected
      ? new Date(selected.getFullYear(), selected.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const cells = useMemo(
    () => buildCells(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );

  const caption = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const prevDisabled = cursor <= currentMonthStart;

  const focusIso =
    value && cells.some((cell) => cell.iso === value && !cell.disabled)
      ? value
      : (cells.find((cell) => cell.iso === toLocalIso(today) && !cell.disabled)
          ?.iso ?? cells.find((cell) => !cell.disabled)?.iso ?? "");

  function moveMonth(delta: number) {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  function firstEnabledOnOrAfter(date: Date, direction: 1 | -1) {
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    for (let i = 0; i < 14; i += 1) {
      if (next >= today && !isWeekend(next)) return next;
      next.setDate(next.getDate() + direction);
    }
    return null;
  }

  function onGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;

    if (event.key === "PageDown") {
      event.preventDefault();
      moveMonth(1);
      return;
    }
    if (event.key === "PageUp") {
      event.preventDefault();
      if (!prevDisabled) moveMonth(-1);
      return;
    }

    const originIso = value || focusIso;
    if (!originIso) return;
    const origin = parseLocalIso(originIso);
    const next = new Date(origin.getFullYear(), origin.getMonth(), origin.getDate());
    let direction: 1 | -1 = 1;

    if (event.key === "ArrowRight") next.setDate(next.getDate() + 1);
    else if (event.key === "ArrowLeft") {
      next.setDate(next.getDate() - 1);
      direction = -1;
    } else if (event.key === "ArrowDown") next.setDate(next.getDate() + 7);
    else if (event.key === "ArrowUp") {
      next.setDate(next.getDate() - 7);
      direction = -1;
    } else if (event.key === "Home") {
      next.setDate(next.getDate() - ((next.getDay() + 6) % 7));
      direction = next < today ? 1 : -1;
    } else if (event.key === "End") {
      next.setDate(next.getDate() + ((5 - next.getDay() + 7) % 7));
    } else {
      return;
    }

    if (next < today) direction = 1;

    const enabled = firstEnabledOnOrAfter(next, direction);
    if (!enabled || (enabled < currentMonthStart && prevDisabled)) return;

    event.preventDefault();
    onChange(toLocalIso(enabled));
    if (enabled.getMonth() !== cursor.getMonth()) {
      setCursor(new Date(enabled.getFullYear(), enabled.getMonth(), 1));
    }
  }

  return (
    <div
      className={`min-w-0 rounded-2xl border border-line bg-cream p-3 sm:p-4 ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
      aria-disabled={disabled || undefined}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p id="calendar-caption" className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink">
          <CalendarDays className="size-4 shrink-0 text-ocean-700" aria-hidden="true" />
          <span className="truncate">{caption}</span>
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => moveMonth(-1)}
            disabled={prevDisabled || disabled}
            aria-label="Previous month"
            className="grid size-10 place-items-center rounded-xl border border-line bg-background/50 text-ink transition hover:border-ocean-200 hover:bg-ocean-50 disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => moveMonth(1)}
            disabled={disabled}
            aria-label="Next month"
            className="grid size-10 place-items-center rounded-xl border border-line bg-background/50 text-ink transition hover:border-ocean-200 hover:bg-ocean-50 disabled:opacity-40"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        role="grid"
        aria-labelledby="calendar-caption"
        onKeyDown={onGridKeyDown}
        className="grid min-w-0 grid-cols-7 gap-0.5 sm:gap-1"
      >
        {WEEKDAYS.map((day, index) => (
          <div
            key={`${day.long}-${index}`}
            className="grid h-8 place-items-center text-[11px] font-semibold uppercase tracking-wide text-ink-soft"
          >
            <abbr title={day.long} className="no-underline">
              {day.short}
            </abbr>
          </div>
        ))}
        {cells.map((cell) => {
          const selectedDay = cell.iso === value;
          const isToday = cell.iso === toLocalIso(today);
          const tabbable = !disabled && !cell.disabled && cell.iso === focusIso;
          return (
            <div key={cell.iso} role="gridcell" aria-selected={selectedDay}>
              <button
                type="button"
                tabIndex={tabbable ? 0 : -1}
                disabled={cell.disabled || disabled}
                onClick={() => onChange(cell.iso)}
                aria-label={cell.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                aria-disabled={cell.disabled || disabled}
                className={`grid h-10 w-full min-w-0 place-items-center rounded-xl text-sm font-medium transition sm:h-11 ${
                  selectedDay
                    ? "bg-ocean-600 text-cream"
                    : cell.disabled
                      ? "text-ink-soft"
                      : "text-ink hover:bg-ocean-50"
                } ${isToday && !selectedDay && !cell.disabled ? "ring-1 ring-ocean-400" : ""} ${
                  !cell.inMonth ? "opacity-0" : ""
                }`}
              >
                {cell.inMonth ? cell.date.getDate() : ""}
              </button>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs leading-5 text-ink-soft">
        Office hours are weekdays. Saturday and Sunday aren’t selectable.
      </p>
    </div>
  );
}
