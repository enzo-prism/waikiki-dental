import Link from "next/link";
import {
  CalendarCheck,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { emergency, hours, navItems, site } from "@/lib/site";
import { BrandLogo, Hibiscus, WordmarkLockup } from "./brand";
import { MobileMenu, ServicesDropdown } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-xl">
      <nav className="wrap-wide flex items-center justify-between gap-6 py-3.5">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center"
          aria-label="Waikiki Dental — home"
        >
          <BrandLogo priority className="h-8 w-auto sm:h-9" />
        </Link>

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
            href={site.bookingHref}
            className="hidden btn btn-sunset btn-sm lg:inline-flex"
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book Online
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

/** Sticky Book / Call bar for mobile — the only persistent conversion chrome below lg. */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-2 gap-2 px-4 py-2.5">
        <a href={site.bookingHref} className="btn btn-sunset btn-sm">
          <CalendarCheck className="size-4" aria-hidden="true" />
          Book Online
        </a>
        <a href={site.phoneHref} className="btn btn-outline btn-sm bg-cream">
          <Phone className="size-4" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-deep text-cream/75">
      <section className="wrap-wide grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr]">
        <div>
          <WordmarkLockup />
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/70">
            IV sedation, implants, same-day crowns, and unhurried family care
            from Dr. Michael Narodovich in Roseville.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.bookingHref} className="btn btn-sunset btn-sm">
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
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ocean-300">
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
            <li>
              <Link
                href={emergency.href}
                className="inline-flex items-center gap-2 text-cream/75 transition hover:text-cream"
              >
                <HeartPulse className="size-3.5 text-sunset-300" aria-hidden="true" />
                {emergency.label}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ocean-300">
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
              <MapPin className="size-4 text-sunset-300" aria-hidden="true" />
              Directions
            </a>
            <a
              href={site.emailHref}
              className="inline-flex items-center gap-2 text-cream/75 transition hover:text-cream"
            >
              <Mail className="size-4 text-ocean-300" aria-hidden="true" />
              Email the office
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ocean-300">
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
          <p className="inline-flex items-center gap-2">
            <Hibiscus size={14} className="text-sunset-400" />
            © {new Date().getFullYear()} Waikiki Dental. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="/contact-waikiki-dental/"
              className="transition hover:text-cream"
            >
              Contact
            </Link>
            <Link href="/new-patients/" className="transition hover:text-cream">
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
