"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  ChevronDown,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { navItems, servicesByCategory, site } from "@/lib/site";

/**
 * Accessible services mega-menu (replaces the pure-CSS <details>):
 * opens on hover-intent and click, closes on outside-click, Escape,
 * and navigation, and exposes aria-expanded / aria-haspopup.
 */
export function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const groups = servicesByCategory();

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 text-sm font-medium text-ink/80 transition hover:text-ink"
      >
        Services
        <ChevronDown
          className={`size-3.5 text-ink-soft transition ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div className="absolute left-1/2 top-[calc(100%+0.75rem)] w-[46rem] -translate-x-1/2 rounded-2xl border border-line bg-cream p-5 shadow-soft-lg">
          <div className="grid grid-cols-3 gap-x-6 gap-y-5">
            {groups.map((group) => (
              <div key={group.key}>
                <p className="eyebrow mb-2 text-sage-600">{group.label}</p>
                <ul className="grid gap-0.5">
                  {group.items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/${service.slug}/`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2 py-1.5 text-sm text-ink-muted transition hover:bg-sage-50 hover:text-ink"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-3">
            <Link
              href="/roseville-dental-care/"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-sage-700 transition hover:text-sage-800"
            >
              View all services →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Mobile navigation — accessible disclosure with outside-click + Escape. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const links = [{ label: "Home", href: "/" }, ...navItems];

  return (
    <div ref={ref} className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-full border border-line text-ink"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] w-[min(86vw,22rem)] rounded-2xl border border-line bg-cream p-3 shadow-soft-lg"
        >
          <nav className="grid">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-sage-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 grid gap-2 border-t border-line pt-3">
            <a href={site.bookingHref} className="btn btn-clay btn-sm">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Book Online
            </a>
            <a href={site.phoneHref} className="btn btn-outline btn-sm">
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
