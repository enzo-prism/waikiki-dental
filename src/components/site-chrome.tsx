import Link from "next/link";
import {
  CalendarCheck,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Waves,
} from "lucide-react";
import { hours, navItems, services, site } from "@/lib/site";

const serviceLinks = services.slice(0, 9);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
      <div className="border-b border-slate-100 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs font-medium sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <a href={site.mapsHref} className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-coral-200" aria-hidden="true" />
            {site.shortAddress}
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-3.5 text-teal-200" aria-hidden="true" />
              Mon-Thu care, Friday appointments
            </span>
            <a href={site.phoneHref} className="inline-flex items-center gap-2">
              <Phone className="size-3.5 text-coral-200" aria-hidden="true" />
              Call or text {site.phone}
            </a>
          </div>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-teal-700 text-white shadow-sm">
            <Waves className="size-6" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-black tracking-normal text-slate-950">
              Waikiki Dental
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              Roseville, CA
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-bold text-slate-700 transition hover:text-teal-700">
              Services
              <ChevronDown
                className="size-4 transition group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="absolute left-1/2 top-8 grid w-[520px] -translate-x-1/2 grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10">
              {serviceLinks.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}/`}
                  className="rounded-lg p-3 transition hover:bg-teal-50"
                >
                  <span className="block text-sm font-bold text-slate-950">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600">
                    {service.summary}
                  </span>
                </Link>
              ))}
            </div>
          </details>
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-slate-700 transition hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={site.phoneHref}
            className="grid size-11 place-items-center rounded-lg border border-slate-200 text-slate-800 transition hover:border-teal-600 hover:text-teal-700"
            aria-label={`Call Waikiki Dental at ${site.phone}`}
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <a
            href={site.bookingHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-coral-500 px-4 text-sm font-black text-white shadow-sm transition hover:bg-coral-600 focus:outline-none focus:ring-4 focus:ring-coral-100"
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book Online
          </a>
        </div>

        <details className="group relative lg:hidden">
          <summary
            className="grid size-11 cursor-pointer list-none place-items-center rounded-lg border border-slate-200 text-slate-800"
            aria-label="Open navigation"
          >
            <Menu className="size-5" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-13 w-[min(88vw,360px)] rounded-lg border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10">
            {[{ label: "Home", href: "/" }, ...navItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-800 transition hover:bg-teal-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 border-t border-slate-100 pt-3">
              <a
                href={site.bookingHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-coral-500 px-4 text-sm font-black text-white"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-900"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-teal-500 text-white">
                <Waves className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-lg font-black">Waikiki Dental</p>
                <p className="text-sm font-medium text-slate-300">
                  Family & cosmetic dentistry in Roseville
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
              Dr. Michael Narodovich and the Waikiki Dental team provide modern,
              comfort-focused care for preventive visits, cosmetic dentistry,
              implants, orthodontics, same-day crowns, and sedation dentistry.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.bookingHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-coral-500 px-4 text-sm font-black text-white transition hover:bg-coral-600"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-black text-white transition hover:bg-white/10"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-teal-200">
              Visit
            </h2>
            <address className="mt-4 not-italic text-sm leading-7 text-slate-300">
              <a href={site.mapsHref}>{site.address}</a>
              <br />
              <a href={site.emailHref}>{site.email}</a>
            </address>
            <div className="mt-5 grid gap-2">
              <a
                href={site.mapsHref}
                className="inline-flex items-center gap-2 text-sm font-bold text-white"
              >
                <MapPin className="size-4 text-coral-300" aria-hidden="true" />
                Directions
              </a>
              <a
                href={site.emailHref}
                className="inline-flex items-center gap-2 text-sm font-bold text-white"
              >
                <Mail className="size-4 text-teal-300" aria-hidden="true" />
                Email the office
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-teal-200">
              Hours
            </h2>
            <dl className="mt-4 grid gap-2 text-sm">
              {hours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt className="text-slate-400">{day}</dt>
                  <dd className="font-semibold text-slate-100">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Waikiki Dental. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact-waikiki-dental/">Contact</Link>
          <Link href="/new-patients/">New Patients</Link>
          <a href="https://waikikidental.com/privacy-policy/">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
