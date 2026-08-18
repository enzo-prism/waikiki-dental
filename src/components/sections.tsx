import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  doctor,
  featuredServices,
  hours,
  paymentOptions,
  reviewStats,
  scheduleHref,
  site,
  testimonials,
  type Service,
} from "@/lib/site";
import { ContactForm } from "./contact-form";
import { DoctorPortrait, Hibiscus } from "./brand";

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  headingLevel = "h2",
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  headingLevel?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const Heading = headingLevel;
  const titleColor = tone === "dark" ? "text-cream" : "text-ink";
  const bodyColor = tone === "dark" ? "text-cream/75" : "text-ink-muted";
  const eyebrowTone = tone === "dark" ? "text-gold-soft" : "text-ocean-600";

  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <Eyebrow className={eyebrowTone}>{eyebrow}</Eyebrow>
      <Heading
        className={`mt-4 text-balance font-serif text-[2.1rem] font-medium leading-[1.12] tracking-tight sm:text-[2.9rem] sm:leading-[1.08] ${titleColor}`}
      >
        {title}
      </Heading>
      {body ? (
        <p className={`mt-5 text-pretty text-lg leading-8 ${bodyColor}`}>{body}</p>
      ) : null}
    </div>
  );
}

function StarRow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex gap-1 text-gold ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-4 fill-current" />
      ))}
    </div>
  );
}

/** Honest aggregate rating — stars and a count only when verified. */
export function AggregateRating({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";
  const hasRating = Boolean(reviewStats.rating);
  const hasCount = Boolean(reviewStats.count);

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {hasRating ? <StarRow /> : null}
      {hasRating ? (
        <span className={`font-serif text-lg ${onDark ? "text-cream" : "text-ink"}`}>
          {reviewStats.rating!.toFixed(1)}
        </span>
      ) : null}
      <a
        href={reviewStats.href}
        target="_blank"
        rel="noreferrer"
        className={`text-sm transition ${
          onDark ? "text-cream/75 hover:text-cream" : "text-ink-muted hover:text-ink"
        }`}
      >
        {hasCount
          ? `${reviewStats.count}+ ${reviewStats.source} reviews`
          : `Read our ${reviewStats.source} reviews`}
      </a>
    </div>
  );
}

function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  const Icon = service.icon;
  const isSedation = service.category === "sedation";

  if (isSedation || featured) {
    return (
      <Link
        href={`/${service.slug}/`}
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-deep p-8 text-cream transition hover:bg-deep-800 sm:p-10"
      >
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            <Hibiscus size={16} className="text-sunset-400" />
            {service.eyebrow}
          </span>
          <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight text-cream sm:text-4xl">
            {service.title}
          </h3>
          <p className="mt-4 max-w-xl text-pretty leading-8 text-cream/75">
            {service.summary}
          </p>
        </div>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-sunset-300">
          Learn more
          <ArrowRight
            className="size-4 transition group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${service.slug}/`}
      className="group card flex flex-col p-7 transition hover:border-ocean-300"
    >
      <span className="grid size-11 place-items-center rounded-full bg-ocean-50 text-ocean-600">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="eyebrow mt-5 text-sunset-600">{service.eyebrow}</p>
      <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-ink-muted">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ocean-700">
        Learn more
        <ArrowRight
          className="size-4 transition group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export function ServicesGrid({ items = featuredServices }: { items?: Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <ServiceCard
          key={service.slug}
          service={service}
          featured={service.category === "sedation"}
        />
      ))}
    </div>
  );
}

export function FlagshipServices() {
  const [sedation, ...rest] = featuredServices;

  return (
    <section className="reveal bg-background py-20 sm:py-24">
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="The work we are known for"
            title="Sedation, implants, and same-day crowns."
            body="Higher-stakes care, delivered at a calmer pace — with the rest of the menu under one roof."
          />
          <Link href="/roseville-dental-care/" className="btn btn-outline shrink-0">
            All services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {sedation ? <ServiceCard service={sedation} featured /> : null}
          <div className="grid gap-5">
            {rest.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PaymentStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
        <ShieldCheck className="size-4 text-ocean-600" aria-hidden="true" />
        {paymentOptions.insuranceNote}
      </span>
      <div className="flex flex-wrap gap-2">
        {paymentOptions.items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeaturedQuote() {
  const quote = testimonials[2] ?? testimonials[0];

  return (
    <section className="bg-deep">
      <div className="wrap py-14 sm:py-16">
        <blockquote className="max-w-3xl text-balance font-serif text-2xl font-medium leading-snug tracking-tight text-cream sm:text-3xl sm:leading-[1.2]">
          “{quote.quote}”
        </blockquote>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-soft">
          {quote.name} · {quote.location}
        </p>
        <Link
          href="/patient-testimonials/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/80 underline-offset-4 hover:text-cream hover:underline"
        >
          More patient notes
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function DoctorSpotlight() {
  return (
    <section className="reveal bg-surface-alt py-20 sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line shadow-soft">
            <DoctorPortrait priority={false} />
          </div>
          <p className="mt-4 font-serif text-lg text-ink">{doctor.name}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ocean-600">
            {doctor.role}
          </p>
        </div>

        <div>
          <Eyebrow>Meet the dentist</Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.08]">
            The dentist people send their nervous friends to.
          </h2>
          <div className="mt-6 grid gap-4 text-lg leading-8 text-ink-muted">
            {doctor.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/michael-narodovich-dmd/" className="btn btn-outline">
              Meet Dr. Narodovich
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {doctor.credentials.map((credential) => (
              <span key={credential} className="chip">
                <BadgeCheck className="size-3.5 text-ocean-600" aria-hidden="true" />
                {credential}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="bg-deep text-cream">
      <div className="wrap py-20 sm:py-24">
        <SectionHeader
          tone="dark"
          eyebrow="Patient notes"
          title="What Roseville patients keep saying."
          body="Every word below comes from a real patient of the practice. Warm welcome, gentle care, nerves put to rest."
        />
        <AggregateRating tone="dark" className="mt-8" />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="border-t border-cream/15 pt-6">
              <blockquote className="text-lg leading-8 text-cream/90">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
                {testimonial.name}
                <span className="font-normal text-cream/60"> · {testimonial.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisitPanel({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
} = {}) {
  return (
    <section className="reveal bg-background py-20 sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeader
            eyebrow="Visit Waikiki Dental"
            title="Getting started is the easy part."
            body="Book online, call or text the front desk, or send a quick note. The office is on Pleasant Grove Boulevard in Roseville."
            headingLevel={headingLevel}
          />

          <div className="mt-8 grid gap-3">
            <a
              href={site.mapsHref}
              className="group flex gap-4 rounded-2xl border border-line bg-cream p-5 transition hover:border-ocean-300"
            >
              <MapPin
                className="mt-0.5 size-5 shrink-0 text-ocean-600"
                aria-hidden="true"
              />
              <span>
                <span className="block font-serif text-lg text-ink">
                  {site.address}
                </span>
                <span className="mt-1 block text-sm text-ink-muted">
                  Open directions in Google Maps
                </span>
              </span>
            </a>
            <a
              href={site.phoneHref}
              className="group flex gap-4 rounded-2xl border border-line bg-cream p-5 transition hover:border-ocean-300"
            >
              <Phone
                className="mt-0.5 size-5 shrink-0 text-sunset-600"
                aria-hidden="true"
              />
              <span>
                <span className="block font-serif text-lg text-ink">
                  {site.phone}
                </span>
                <span className="mt-1 block text-sm text-ink-muted">
                  Call or text Waikiki Dental
                </span>
              </span>
            </a>
          </div>

          <dl className="mt-6 rounded-2xl border border-line bg-cream p-5">
            <p className="eyebrow mb-3">Office hours</p>
            <div className="grid gap-2">
              {hours.map(([day, time]) => {
                const closed = time === "Closed";
                return (
                  <div
                    key={day}
                    className="flex justify-between gap-4 border-b border-line/70 pb-2 text-sm last:border-0 last:pb-0"
                  >
                    <dt className="text-ink-muted">{day}</dt>
                    <dd className={closed ? "text-ink-soft" : "font-semibold text-ink"}>
                      {time}
                    </dd>
                  </div>
                );
              })}
            </div>
          </dl>

          <PaymentStrip className="mt-6" />

          <p className="mt-6 text-sm text-ink-muted">
            Prefer that the office pick a time?{" "}
            <Link
              href={scheduleHref}
              className="font-semibold text-ocean-700 underline-offset-4 hover:underline"
            >
              Request an appointment
            </Link>
            .
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-line bg-cream p-7 shadow-soft sm:p-9">
          <h3 className="font-serif text-2xl text-ink">Send a message</h3>
          <p className="mt-2 text-sm leading-7 text-ink-muted">
            Have a general question? Write to the team and choose how you’d like
            to hear back. Please don’t include medical, insurance, or other
            sensitive details.
          </p>
          <div className="mt-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quiet closer — coral is reserved for the Book button, not a full-bleed slab. */
export function BookStrip() {
  return (
    <section className="border-t border-line bg-cream">
      <div className="wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
            Ready when you are.
          </h2>
          <p className="mt-2 max-w-xl text-ink-muted">
            Book online in a couple of minutes, or call the Roseville office.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.bookingHref} className="btn btn-sunset">
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book Online
          </a>
          <a href={site.phoneHref} className="btn btn-outline">
            <Phone className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
