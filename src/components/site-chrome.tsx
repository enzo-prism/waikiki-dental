import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { emergency, hours, navItems, site } from "@/lib/site";
import { Logomark } from "./brand";
import { MobileMenu, ServicesDropdown } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility bar */}
      <div className="bg-night text-cream/80">
        <div className="wrap-wide flex h-9 items-center justify-between gap-4 text-[12px]">
          <a
            href={site.mapsHref}
            className="inline-flex min-w-0 items-center gap-2 transition hover:text-cream"
          >
            <MapPin className="size-3.5 text-clay-300" aria-hidden="true" />
            <span className="truncate">{site.shortAddress}</span>
          </a>
          <div className="flex items-center gap-5">
            <Link
              href={emergency.href}
              className="inline-flex items-center gap-2 font-medium text-clay-200 transition hover:text-cream"
            >
              <HeartPulse className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{emergency.label}</span>
              <span className="underline-offset-2 hover:underline">
                {emergency.cta}
              </span>
            </Link>
            <span className="hidden items-center gap-2 lg:inline-flex">
              <Clock className="size-3.5 text-sage-300" aria-hidden="true" />
              Open Mon–Fri
            </span>
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 transition hover:text-cream sm:inline-flex"
            >
              <Phone className="size-3.5 text-clay-300" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-line bg-cream/85 backdrop-blur-xl">
        <nav className="wrap-wide flex items-center justify-between gap-6 py-3.5">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-sage-600/25 bg-sage-50 text-sage-700">
              <Logomark className="size-6" />
            </span>
            <span className="min-w-0">
              <span className="block font-serif text-xl tracking-tight text-ink">
                Waikiki Dental
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-sage-600">
                Roseville · California
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            <ServicesDropdown />
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink/80 transition hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden size-11 place-items-center rounded-full border border-line text-ink transition hover:border-ink hover:bg-background sm:grid lg:hidden xl:grid"
              aria-label={`Call Waikiki Dental at ${site.phone}`}
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <a
              href={site.bookingHref}
              className="hidden btn btn-clay btn-sm sm:inline-flex"
            >
              <CalendarCheck className="size-4" aria-hidden="true" />
              Book Online
            </a>
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}

/** Sticky Book / Call bar for mobile — primary actions always reachable. */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-2 gap-2 px-4 py-3">
        <a href={site.bookingHref} className="btn btn-clay btn-sm">
          <CalendarCheck className="size-4" aria-hidden="true" />
          Book Online
        </a>
        <a href={site.phoneHref} className="btn btn-outline btn-sm bg-cream">
          <Phone className="size-4" aria-hidden="true" />
          Call or Text
        </a>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-night text-cream/75">
      <div className="border-t-4 border-sage-700" />
      <section className="wrap-wide grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-sage-600 text-cream">
              <Logomark className="size-6" />
            </span>
            <div>
              <p className="font-serif text-xl text-cream">Waikiki Dental</p>
              <p className="text-xs uppercase tracking-[0.24em] text-sage-300">
                Family &amp; Cosmetic Dentistry
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/70">
            Dr. Michael Narodovich and our team provide modern, comfort-focused
            care — preventive visits, cosmetic dentistry, implants,
            orthodontics, same-day crowns, and sedation dentistry in Roseville.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.bookingHref} className="btn btn-light btn-sm">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Book Online
            </a>
            <a href={site.phoneHref} className="btn btn-ghost-light btn-sm">
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage-300">
            Explore
          </h2>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/75 transition hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage-300">
            Visit
          </h2>
          <address className="mt-5 not-italic text-sm leading-7 text-cream/75">
            <a href={site.mapsHref} className="transition hover:text-cream">
              {site.address}
            </a>
            <br />
            <a href={site.emailHref} className="transition hover:text-cream">
              {site.email}
            </a>
          </address>
          <div className="mt-5 grid gap-2 text-sm">
            <a
              href={site.mapsHref}
              className="inline-flex items-center gap-2 text-cream/75 transition hover:text-cream"
            >
              <MapPin className="size-4 text-clay-300" aria-hidden="true" />
              Directions
            </a>
            <a
              href={site.emailHref}
              className="inline-flex items-center gap-2 text-cream/75 transition hover:text-cream"
            >
              <Mail className="size-4 text-sage-300" aria-hidden="true" />
              Email the office
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sage-300">
            Hours
          </h2>
          <dl className="mt-5 grid gap-2 text-sm">
            {hours.map(([day, time]) => {
              const closed = time === "Closed";
              return (
                <div key={day} className="flex justify-between gap-4">
                  <dt className="text-cream/60">{day}</dt>
                  <dd
                    className={
                      closed ? "text-cream/55" : "font-medium text-cream/90"
                    }
                  >
                    {time}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <div className="border-t border-cream/10">
        <div className="wrap-wide flex flex-col gap-3 py-6 text-xs text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Waikiki Dental. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="/contact-waikiki-dental/"
              className="transition hover:text-cream"
            >
              Contact
            </Link>
            <Link
              href="/new-patients/"
              className="transition hover:text-cream"
            >
              New Patients
            </Link>
            <a
              href="https://waikikidental.com/privacy-policy/"
              className="transition hover:text-cream"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
