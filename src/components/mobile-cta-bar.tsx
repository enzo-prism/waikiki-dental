"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Phone } from "lucide-react";
import { scheduleHref, sedationConsultHref, site } from "@/lib/site";

/** Site-wide mobile conversion bar. The appointment flow supplies its own actions. */
export function MobileCtaBar() {
  const pathname = usePathname();

  const path = pathname.replace(/\/$/, "");
  const isSedation = path === "/iv-sedation";
  const isEmergency = path === "/dental-emergencies";

  // Native fragment navigation reveals and focuses the contact section.
  const AppointmentLink = isSedation ? "a" : Link;

  if (pathname.startsWith("/request-appointment")) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="h-[calc(4.25rem+env(safe-area-inset-bottom,0px))] lg:hidden"
      />
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream/95 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="grid grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-2 px-4 py-2.5">
          {isEmergency ? (
            <>
              <a href={site.phoneHref} className="btn btn-outline btn-sm border-ocean-600 min-h-11 min-w-0 gap-1.5 px-3 tracking-normal">
                <Phone className="size-4 shrink-0 max-[359px]:hidden" aria-hidden="true" />
                Call the office
              </a>
              <Link href={scheduleHref} className="btn btn-sm min-h-11 min-w-0 px-3 tracking-normal underline underline-offset-4">
                Routine visit
              </Link>
            </>
          ) : (
            <>
              <AppointmentLink
                href={isSedation ? sedationConsultHref : scheduleHref}
                className="btn btn-sunset btn-sm min-h-11 min-w-0 gap-1.5 px-3 tracking-normal"
              >
                <CalendarCheck
                  className="size-4 shrink-0 max-[359px]:hidden"
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">Request Appointment</span>
              </AppointmentLink>
              <a
                href={site.phoneHref}
                className="btn btn-outline btn-sm min-h-11 min-w-0 gap-1.5 bg-cream px-3 tracking-normal"
                aria-label={isSedation ? `Call the office at ${site.phone}` : `Call or text ${site.phone}`}
              >
                <Phone
                  className="size-4 shrink-0 max-[359px]:hidden"
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">{isSedation ? "Call the office" : "Call or text"}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
