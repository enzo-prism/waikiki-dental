"use client";

import { useEffect } from "react";
import { trackContactLinkClick } from "@/lib/analytics";

/**
 * Counts phone and email clicks from every `tel:` and `mailto:` link on the
 * site with one capture-phase listener, so new buttons are covered without
 * per-link handlers. Sends the event name only (see `ANALYTICS_EVENTS`).
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => trackContactLinkClick(event.target);
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
