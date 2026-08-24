"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Phone } from "lucide-react";
import { scheduleHref, site } from "@/lib/site";

/** Site-wide mobile conversion bar. The appointment flow supplies its own actions. */
export function MobileCtaBar() {
  const pathname = usePathname();

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
        <div className="grid grid-cols-2 gap-2 px-4 py-2.5">
        <Link href={scheduleHref} className="btn btn-sunset btn-sm min-w-0 px-3">
          <CalendarCheck className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">Request a Time</span>
        </Link>
        <a
          href={site.phoneHref}
          className="btn btn-outline btn-sm min-w-0 bg-cream px-3"
          aria-label={`Call or text ${site.phone}`}
        >
          <Phone className="size-4 shrink-0" aria-hidden="true" />
          Call
        </a>
        </div>
      </div>
    </>
  );
}
