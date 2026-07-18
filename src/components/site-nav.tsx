"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  CalendarCheck,
  ChevronDown,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { navItems, servicesByCategory, site } from "@/lib/site";
import { Logomark } from "./brand";
import { WaveLines } from "./waves";

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
        <div className="absolute left-0 top-[calc(100%+0.75rem)] w-[min(46rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-cream p-5 shadow-soft-lg">
          <div className="grid grid-cols-3 gap-x-6 gap-y-5">
            {groups.map((group) => (
              <div key={group.key}>
                <p className="eyebrow mb-2 text-ocean-600">{group.label}</p>
                <ul className="grid gap-0.5">
                  {group.items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/${service.slug}/`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2 py-1.5 text-sm text-ink-muted transition hover:bg-ocean-50 hover:text-ink"
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
              className="text-sm font-semibold text-ocean-700 transition hover:text-ocean-800"
            >
              View all services →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Mobile navigation — full-screen ocean sheet, portaled to <body> so the
 *  header's backdrop-blur can't trap it (backdrop-filter creates a containing
 *  block for fixed descendants) and it always beats the sticky CTA bar. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const sheet = sheetRef.current;
    const closeButton = sheet?.querySelector<HTMLButtonElement>(
      "[data-close-menu]"
    );
    closeButton?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key === "Tab" && sheet) {
        const focusable = sheet.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [{ label: "Home", href: "/" }, ...navItems];

  const sheet = open ? (
    <div
      ref={sheetRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-deep text-cream lg:hidden"
    >
      <WaveLines
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-ocean-300/15"
        rows={4}
      />
      <div className="wrap-wide flex items-center justify-between py-4">
        <span className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-ocean-600 text-cream">
            <Logomark className="size-5" />
          </span>
          <span className="font-serif text-lg tracking-tight">
            Waikiki Dental
          </span>
        </span>
        <button
          type="button"
          data-close-menu
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="grid size-11 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/10"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav className="wrap-wide relative flex-1 overflow-y-auto py-6">
        <ul className="grid gap-1">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-cream/10 py-4 font-serif text-3xl font-medium tracking-tight text-cream transition hover:pl-2 hover:text-gold-soft"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap-wide relative grid gap-2 pb-8 pt-2">
        <a href={site.bookingHref} className="btn btn-sunset">
          <CalendarCheck className="size-4" aria-hidden="true" />
          Book Online
        </a>
        <a href={site.phoneHref} className="btn btn-ghost-light">
          <Phone className="size-4" aria-hidden="true" />
          Call or Text {site.phone}
        </a>
      </div>
    </div>
  ) : null;

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-full border border-line text-ink"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
      {sheet ? createPortal(sheet, document.body) : null}
    </div>
  );
}
