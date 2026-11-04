"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackAllowedEvent } from "@/lib/analytics";

/**
 * Fires `jarvis_booking_start` once per mount of the appointment page, when focus
 * first moves into the Jarvis frame. Cross-origin frames do not expose
 * clicks, but the parent window blurs and the frame becomes the active
 * element. Completed bookings are counted in Jarvis, not here.
 */
export function JarvisBookingTracker() {
  useEffect(() => {
    let recorded = false;
    let timer: number | undefined;
    const onBlur = () => {
      window.clearTimeout(timer);
      // activeElement updates after the blur event in some browsers.
      timer = window.setTimeout(() => {
        const active = document.activeElement;
        if (recorded || !active?.matches("iframe[data-jarvis-scheduler]")) return;
        recorded = true;
        trackAllowedEvent(ANALYTICS_EVENTS.jarvisBookingStart);
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return null;
}
