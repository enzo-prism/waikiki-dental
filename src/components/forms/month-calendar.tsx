"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  isSelectableDate,
  isSelectableIso,
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
  selectable: boolean;
};

/** Six fixed weeks so the calendar height never jumps between months. */
function buildWeeks(year: number, month: number, today: Date): Cell[][] {
  const startOffset = new Date(year, month, 1).getDay();
  const weeks: Cell[][] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(year, month, index - startOffset + 1);
    const inMonth = date.getMonth() === month;
    if (index % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push({
      iso: toLocalIso(date),
      date,
      inMonth,
      selectable: inMonth && isSelectableDate(date, today),
    });
  }

  return weeks;
}

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Same day-of-month `delta` months away, clamped to that month's length. */
function addMonths(date: Date, delta: number) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + delta + 1, 0);
  return new Date(
    lastDay.getFullYear(),
    lastDay.getMonth(),
    Math.min(date.getDate(), lastDay.getDate()),
  );
}

function fullDateLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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
  const captionId = useId();
  const today = startOfToday();
  const todayIso = toLocalIso(today);
  const [cursor, setCursor] = useState(() =>
    monthStart(isSelectableIso(value) ? parseLocalIso(value) : today),
  );
  // The day that owns the roving tabindex; follows the arrow keys.
  const [focusedIso, setFocusedIso] = useState(value);
  const gridRef = useRef<HTMLDivElement>(null);
  const pendingFocusIso = useRef<string | null>(null);

  const weeks = useMemo(
    () => buildWeeks(cursor.getFullYear(), cursor.getMonth(), startOfToday()),
    [cursor],
  );
  const selectableIsos = weeks
    .flat()
    .filter((cell) => cell.selectable)
    .map((cell) => cell.iso);

  const caption = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const prevDisabled = cursor <= monthStart(today);

  // Exactly one tabbable day in the visible month: the keyboard-focused day,
  // else the chosen day, else today, else the first requestable weekday.
  const activeIso =
    [focusedIso, value, todayIso].find((iso) => selectableIsos.includes(iso)) ??
    selectableIsos[0] ??
    "";

  // Move DOM focus only after a keyboard move has rendered the target day,
  // including when the move switched months and replaced every cell.
  useEffect(() => {
    const iso = pendingFocusIso.current;
    if (!iso) return;
    pendingFocusIso.current = null;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`button[data-iso="${iso}"]`)
      ?.focus();
  });

  function moveMonth(delta: number) {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  /** Nearest requestable weekday from `date`, stepping in `direction`. */
  function nearestSelectable(date: Date, direction: 1 | -1) {
    const beforeToday = date < today;
    let next = beforeToday ? today : date;
    const step = beforeToday ? 1 : direction;
    for (let i = 0; i < 7; i += 1) {
      if (isSelectableDate(next, today)) return next;
      next = addDays(next, step);
    }
    return null;
  }

  function onGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled || !activeIso) return;
    const origin = parseLocalIso(activeIso);
    let target: Date;
    let direction: 1 | -1 = 1;

    switch (event.key) {
      case "ArrowRight":
        target = addDays(origin, 1);
        break;
      case "ArrowLeft":
        target = addDays(origin, -1);
        direction = -1;
        break;
      case "ArrowDown":
        target = addDays(origin, 7);
        break;
      case "ArrowUp":
        target = addDays(origin, -7);
        direction = -1;
        break;
      case "Home":
        // Monday of this week (weekends are never requestable).
        target = addDays(origin, 1 - origin.getDay());
        break;
      case "End":
        // Friday of this week.
        target = addDays(origin, 5 - origin.getDay());
        direction = -1;
        break;
      case "PageDown":
        target = addMonths(origin, 1);
        break;
      case "PageUp":
        target = addMonths(origin, -1);
        direction = -1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const next = nearestSelectable(target, direction) ?? nearestSelectable(target, 1);
    if (!next) return;

    const iso = toLocalIso(next);
    setFocusedIso(iso);
    if (
      next.getMonth() !== cursor.getMonth() ||
      next.getFullYear() !== cursor.getFullYear()
    ) {
      setCursor(monthStart(next));
    }
    pendingFocusIso.current = iso;
  }

  return (
    <div
      className={`min-w-0 rounded-2xl border border-line bg-cream p-3 sm:p-4 ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
      aria-disabled={disabled || undefined}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p
          id={captionId}
          aria-live="polite"
          className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink"
        >
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
        ref={gridRef}
        role="grid"
        aria-labelledby={captionId}
        aria-disabled={disabled || undefined}
        onKeyDown={onGridKeyDown}
        className="grid min-w-0 gap-0.5 sm:gap-1"
      >
        <div role="row" className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {WEEKDAYS.map((day, index) => (
            <div
              key={`${day.long}-${index}`}
              role="columnheader"
              aria-label={day.long}
              className="grid h-8 place-items-center text-[11px] font-semibold uppercase tracking-wide text-ink-soft"
            >
              <abbr title={day.long} className="no-underline" aria-hidden="true">
                {day.short}
              </abbr>
            </div>
          ))}
        </div>
        {weeks.map((week) => (
          <div key={week[0].iso} role="row" className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {week.map((cell) => {
              // Days from the neighbouring months are empty, non-interactive cells.
              if (!cell.inMonth) {
                return <div key={cell.iso} role="gridcell" className="h-10 sm:h-11" />;
              }
              const selectedDay = cell.iso === value;
              const isToday = cell.iso === todayIso;
              const tabbable = !disabled && cell.iso === activeIso;
              return (
                <div key={cell.iso} role="gridcell" aria-selected={selectedDay}>
                  <button
                    type="button"
                    data-iso={cell.iso}
                    tabIndex={tabbable ? 0 : -1}
                    disabled={!cell.selectable || disabled}
                    onClick={() => {
                      setFocusedIso(cell.iso);
                      onChange(cell.iso);
                    }}
                    aria-label={`${fullDateLabel(cell.date)}${
                      cell.selectable ? "" : ", unavailable"
                    }`}
                    aria-current={isToday ? "date" : undefined}
                    className={`grid h-10 w-full min-w-0 place-items-center rounded-xl text-sm font-medium transition sm:h-11 ${
                      selectedDay
                        ? "bg-ocean-600 text-cream"
                        : !cell.selectable
                          ? "text-ink-soft"
                          : "text-ink hover:bg-ocean-50"
                    } ${isToday && !selectedDay && cell.selectable ? "ring-1 ring-ocean-400" : ""}`}
                  >
                    {cell.date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-ink-soft">
        Office hours are weekdays. Saturday and Sunday aren’t selectable. Arrow
        keys move between days; Enter chooses one.
      </p>
    </div>
  );
}
