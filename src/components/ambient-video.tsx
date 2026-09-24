"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Artwork } from "@/lib/site";

const PAUSE_STORAGE_KEY = "wd-ambient-motion-paused";
const PAUSE_EVENT = "wd-ambient-motion-change";
let memoryPaused = false;

function readPaused() {
  try {
    return window.localStorage.getItem(PAUSE_STORAGE_KEY) === "1";
  } catch {
    return memoryPaused;
  }
}

function writePaused(paused: boolean) {
  memoryPaused = paused;
  try {
    if (paused) window.localStorage.setItem(PAUSE_STORAGE_KEY, "1");
    else window.localStorage.removeItem(PAUSE_STORAGE_KEY);
  } catch {
    // Storage can be blocked; the in-memory value still applies.
  }
  window.dispatchEvent(new Event(PAUSE_EVENT));
}

function subscribePaused(onChange: () => void) {
  window.addEventListener(PAUSE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(PAUSE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function motionAllowedNow() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return !window.matchMedia(REDUCED_MOTION).matches && !connection?.saveData;
}

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const serverFalse = () => false;

/**
 * Decorative, silent artwork loop. The still poster renders on the server
 * (and is the only thing shown for reduced-motion or data-saver visitors);
 * the video fades in over it once it is actually playing, only plays while
 * on screen, and always offers a visible pause control (WCAG 2.2.2).
 */
export function AmbientVideo({
  artwork,
  sizes,
  preload = false,
  className = "",
  controlClassName = "bottom-3 right-3",
  tone = "light",
}: {
  artwork: Artwork;
  sizes: string;
  preload?: boolean;
  className?: string;
  controlClassName?: string;
  tone?: "light" | "dark";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Both read browser-only state, so the server (and hydration) render is
  // always the still poster; the video mounts right after.
  const motionAllowed = useSyncExternalStore(subscribeMotion, motionAllowedNow, serverFalse);
  const paused = useSyncExternalStore(subscribePaused, readPaused, serverFalse);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionAllowed) return;
    if (paused) {
      video.pause();
      return;
    }

    // Measured directly (not only via the observer, which stays silent in
    // a background tab) so a tab that loads hidden starts once it is shown.
    const onScreen = () => {
      const rect = video.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
    };
    const play = () => {
      if (document.hidden || !onScreen()) return;
      video.play().catch(() => {
        // Autoplay can be refused (e.g. low-power mode); the poster stays.
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : video.pause()),
      { threshold: 0.15 },
    );
    const onVisibility = () => (document.hidden ? video.pause() : play());

    observer.observe(video);
    play();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, [motionAllowed, paused]);

  const toggle = () => writePaused(!paused);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image
        src={artwork.poster}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
      />
      {motionAllowed ? (
        <>
          <video
            ref={videoRef}
            aria-hidden="true"
            tabIndex={-1}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-[1200ms] ease-out ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={artwork.webm} type="video/webm" />
            <source src={artwork.mp4} type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={toggle}
            aria-label={paused ? "Play background animation" : "Pause background animation"}
            className={`absolute z-10 grid size-11 place-items-center rounded-full border backdrop-blur-md transition-colors ${
              tone === "dark"
                ? "border-cream/25 bg-deep/45 text-cream hover:bg-deep/70"
                : "border-white/30 bg-deep/35 text-cream hover:bg-deep/55"
            } ${controlClassName}`}
          >
            {paused ? (
              <Play className="size-4 translate-x-px" aria-hidden="true" />
            ) : (
              <Pause className="size-4" aria-hidden="true" />
            )}
          </button>
        </>
      ) : null}
    </div>
  );
}
