"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  ChevronDown,
  HeartPulse,
  Menu,
  Phone,
  X,
} from "lucide-react";
import {
  emergency,
  findService,
  navItems,
  scheduleHref,
  servicesByCategory,
  site,
} from "@/lib/site";
import { Hibiscus } from "./brand";

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function isCurrent(href: string, pathname: string) {
  return normalizePath(pathname) === normalizePath(href);
}

function isServicesCurrent(pathname: string) {
  const slug = normalizePath(pathname).replace(/^\//, "");
  if (!slug) return false;
  return slug === "roseville-dental-care" || Boolean(findService(slug));
}

function navClass(active: boolean) {
  return `text-sm font-medium transition ${
    active
      ? "text-ink underline decoration-ocean-600 decoration-1 underline-offset-[10px]"
      : "text-ink/80 hover:text-ink"
  }`;
}

/**
 * Accessible services mega-menu (a disclosure, not an ARIA menu): opens on
 * hover-intent and click, closes on outside-click, focus leaving, Escape, and
 * navigation. The "Services" label goes to the hub; the chevron toggles the
 * panel for keyboard users and gets focus back when Escape closes it.
 */
export function ServicesDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const groups = servicesByCategory();
  const active = isServicesCurrent(pathname);

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
      if (event.key !== "Escape") return;
      setOpen(false);
      if (
        ref.current &&
        document.activeElement &&
        ref.current.contains(document.activeElement)
      ) {
        toggleRef.current?.focus();
      }
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
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setOpen(false);
        }
      }}
    >
      <div className="flex items-center gap-0.5">
        <Link
          href="/roseville-dental-care/"
          aria-current={active ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={navClass(active)}
        >
          Services
        </Link>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="services-menu"
          aria-label="Browse services"
          onClick={() => setOpen((value) => !value)}
          // 32px visual chip; the ::after extends the hit area to 44×44
          // (into the gap before the next nav item) without layout shift.
          className={`relative grid size-8 place-items-center rounded-full text-ink-soft transition after:absolute after:-inset-y-1.5 after:-left-0.5 after:-right-2.5 after:content-[''] hover:bg-ocean-50 hover:text-ink ${
            open ? "bg-ocean-50 text-ink" : ""
          }`}
        >
          <ChevronDown
            className={`size-3.5 transition ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        id="services-menu"
        hidden={!open}
        className="absolute left-0 top-[calc(100%+0.75rem)] w-[min(46rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-cream p-5 shadow-soft-lg"
      >
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
                      aria-current={
                        isCurrent(`/${service.slug}/`, pathname)
                          ? "page"
                          : undefined
                      }
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
    </div>
  );
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-7 lg:flex">
      <ServicesDropdown />
      {navItems.slice(1).map((item) => {
        const active = isCurrent(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={navClass(active)}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

/** Mobile navigation — cream sheet, portaled to body so sticky chrome cannot trap it. */
export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close whenever the route changes by any means (link, Back/Forward).
  // Adjusting state during render avoids a setState-in-effect cascade.
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const sheet = sheetRef.current;

    // Background content is inert while the modal sheet is open.
    const inerted: Element[] = [];
    for (const child of Array.from(document.body.children)) {
      if (child === sheet || child.hasAttribute("inert")) continue;
      child.setAttribute("inert", "");
      inerted.push(child);
    }

    // The sheet is lg:hidden — close it if the viewport grows past lg so the
    // body is never left scroll-locked behind an invisible sheet.
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    desktop.addEventListener("change", onDesktopChange);

    const closeButton = sheet?.querySelector<HTMLButtonElement>(
      "[data-close-menu]",
    );
    closeButton?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key === "Tab" && sheet) {
        const focusable = sheet.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
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
      desktop.removeEventListener("change", onDesktopChange);
      for (const element of inerted) element.removeAttribute("inert");
      trigger?.focus({ preventScroll: true });
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
      className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-cream text-ink lg:hidden"
    >
      <div className="wrap-wide flex items-center justify-between py-4">
        <span className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-ocean-50 text-sunset-600">
            <Hibiscus size={26} />
          </span>
          <span className="font-serif text-lg tracking-tight">Waikiki Dental</span>
        </span>
        <button
          type="button"
          data-close-menu
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="grid size-11 place-items-center rounded-full border border-line text-ink transition hover:bg-background"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="wrap-wide relative flex-1 overflow-y-auto py-6"
      >
        <ul className="grid gap-1">
          {links.map((item) => {
            const active = isCurrent(item.href, pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block border-b border-line py-4 font-serif text-3xl font-medium tracking-tight transition hover:pl-2 hover:text-ocean-700 ${
                    active ? "text-ocean-700" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={emergency.href}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 py-4 text-sm font-semibold text-sunset-700"
            >
              <HeartPulse className="size-4" aria-hidden="true" />
              {emergency.label}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="wrap-wide relative grid gap-2 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-2">
        <Link
          href={scheduleHref}
          onClick={() => setOpen(false)}
          className="btn btn-sunset"
        >
          <CalendarCheck className="size-4" aria-hidden="true" />
          Request Appointment
        </Link>
        <a href={site.phoneHref} className="btn btn-outline">
          <Phone className="size-4" aria-hidden="true" />
          Call or text {site.phone}
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
