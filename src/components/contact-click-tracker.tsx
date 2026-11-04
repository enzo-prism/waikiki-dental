"use client";

import { useEffect } from "react";
import { trackContactLinkClick } from "@/lib/analytics";

/**
 * Records phone, email and scheduler link clicks with one capture listener.
 * Sends the event name only.
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => trackContactLinkClick(event.target);
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
