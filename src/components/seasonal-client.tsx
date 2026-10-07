"use client";

import { useEffect, useRef, useState } from "react";
import { isAmbientMotionAllowed } from "@/components/ambient-video";
import {
  activeSeason,
  batFlightStorageKey,
  readActiveSeason,
} from "@/lib/seasonal";

function seasonIsOn() {
  return Boolean(activeSeason) && readActiveSeason() === activeSeason?.name;
}

const SVG_ICON = /\.svg(\?|$)/;

/**
 * Swaps the SVG favicon for the seasonal one after hydration. Next can
 * re-insert its metadata <link>s later (streamed metadata), so a
 * MutationObserver re-applies the swap to any SVG icon added afterwards.
 */
export function SeasonalFavicon() {
  useEffect(() => {
    if (!activeSeason || !seasonIsOn()) return;
    const icon = activeSeason.icon;
    const originals = new Map<HTMLLinkElement, string>();

    const swap = () => {
      for (const link of document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')) {
        const href = link.getAttribute("href") ?? "";
        if (href === icon || !SVG_ICON.test(href)) continue;
        originals.set(link, href);
        link.setAttribute("href", icon);
      }
    };

    swap();
    const observer = new MutationObserver(swap);
    observer.observe(document.head, { childList: true });
    return () => {
      observer.disconnect();
      for (const [link, href] of originals) link.setAttribute("href", href);
    };
  }, []);

  return null;
}

const FLIGHT_MS = 4_800;

// Three bats lift off the moon on staggered, slightly different paths.
// Total flight (delay + duration) stays under 5s (WCAG 2.2.2).
const bats = [
  { size: "2.75rem", flight: "wd-bat-flight-a", duration: "3.6s", delay: "0s" },
  { size: "2.1rem", flight: "wd-bat-flight-b", duration: "3.8s", delay: "0.35s" },
  { size: "1.7rem", flight: "wd-bat-flight-c", duration: "3.6s", delay: "0.75s" },
];

function Bat() {
  return (
    <svg viewBox="0 0 64 30" fill="currentColor" aria-hidden="true">
      <path d="M32 8c1.5 0 2.5 1 3 2.3L36.4 8l.8 3.2C41 7.8 46 6.2 51 6.4c3.4.1 6.6 1 9.4 2.8-2.7.4-4.7 2.2-5.4 4.6-2.1-.9-4.6-.6-6.3.9-1.5-1-3.6-1.1-5.2-.2-1.4.8-2.3 2.2-2.6 3.8-1.6-.9-3.4-1.3-5.3-1.2-1.5.1-2.8.9-3.6 2-.8-1.1-2.1-1.9-3.6-2-1.9-.1-3.7.3-5.3 1.2-.3-1.6-1.2-3-2.6-3.8-1.6-.9-3.7-.8-5.2.2-1.7-1.5-4.2-1.8-6.3-.9-.7-2.4-2.7-4.2-5.4-4.6C6.4 7.4 9.6 6.5 13 6.4c5-.2 10 1.4 13.8 4.8l.8-3.2 1.4 2.3c.5-1.3 1.5-2.3 3-2.3Z" />
    </svg>
  );
}

/**
 * Bats lifting off the harvest moon in the homepage hero art. Plays once
 * per session, only in season, only when the artwork is mostly on screen,
 * and never for reduced-motion, data-saver, or paused-animation visitors.
 */
export function HarvestBats() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !activeSeason || !seasonIsOn() || !isAmbientMotionAllowed()) return;

    const key = batFlightStorageKey(activeSeason);
    let session: Storage | null = null;
    try {
      session = window.sessionStorage;
      if (session.getItem(key) === "1") return;
    } catch {
      // Storage is blocked: still fly once for this page view.
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          session?.setItem(key, "1");
        } catch {
          // Best effort only.
        }
        setFlying(true);
        timer = window.setTimeout(() => setFlying(false), FLIGHT_MS + 200);
      },
      { threshold: 0.6 },
    );
    observer.observe(layer);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="wd-bats pointer-events-none absolute inset-0 overflow-hidden"
    >
      {flying
        ? bats.map((bat) => (
            <span
              key={bat.flight}
              className="wd-bat"
              style={
                {
                  "--size": bat.size,
                  "--flight": bat.flight,
                  "--duration": bat.duration,
                  "--delay": bat.delay,
                } as React.CSSProperties
              }
            >
              <Bat />
            </span>
          ))
        : null}
    </div>
  );
}
