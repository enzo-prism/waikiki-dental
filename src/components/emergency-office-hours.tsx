"use client";

import { useSyncExternalStore } from "react";
import { hours } from "@/lib/site";

const weekday = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  timeZone: "America/Los_Angeles",
});

function subscribe(refresh: () => void) {
  const timer = window.setInterval(refresh, 60_000);
  window.addEventListener("focus", refresh);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", refresh);
  };
}

export function EmergencyOfficeHours() {
  const today = useSyncExternalStore(subscribe, () => weekday.format(new Date()), () => "");
  const regularHours = hours.find(([day]) => day === today)?.[1];

  return (
    <div className="mt-4 max-w-md text-sm leading-6 text-ink-muted">
      <details>
        <summary className="cursor-pointer font-semibold text-ink">
          {regularHours ? `Regular ${today} hours in Roseville: ${regularHours}` : "Regular Roseville office hours"}
        </summary>
        <dl className="mt-2">
          {hours.map(([day, range]) => (
            <div className="flex justify-between gap-4" key={day}>
              <dt>{day}</dt><dd>{range}</dd>
            </div>
          ))}
        </dl>
      </details>
      <p>Call before coming in. Holiday hours and urgent appointment availability may vary.</p>
    </div>
  );
}
