"use client";

import { Mail, Phone } from "lucide-react";
import { ANALYTICS_EVENTS, trackAllowedEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

export function AppointmentOfficeContact() {
  return (
    <aside className="rounded-2xl border border-line bg-cream p-6 sm:p-7">
      <p className="eyebrow">Or reach the office</p>
      <p className="mt-3 text-pretty leading-7 text-ink-muted">
        Call, text, or email the Roseville team if you would rather book that
        way.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href={site.phoneHref}
          className="btn btn-outline w-full"
          onClick={() =>
            trackAllowedEvent(ANALYTICS_EVENTS.appointmentPhoneClick)
          }
        >
          <Phone className="size-4" aria-hidden="true" />
          {site.phone}
        </a>
        <a
          href={site.emailHref}
          className="btn btn-outline w-full"
          onClick={() =>
            trackAllowedEvent(ANALYTICS_EVENTS.appointmentEmailClick)
          }
        >
          <Mail className="size-4" aria-hidden="true" />
          {site.email}
        </a>
      </div>
    </aside>
  );
}
