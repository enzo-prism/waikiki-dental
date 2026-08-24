import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  doctor,
  featuredServices,
  formPrivacy,
  hours,
  paymentOptions,
  reviewExcerpts,
  reviewStats,
  reviewTopics,
  scheduleHref,
  site,
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
          ? `${reviewStats.count} ${reviewStats.source} reviews`
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
        className="group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl bg-deep p-8 text-cream transition hover:bg-deep-800 sm:p-10"
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
  const featured = items.filter((service) => service.category === "sedation");
  const rest = items.filter((service) => service.category !== "sedation");
  const restCols =
    rest.length <= 1
      ? ""
      : rest.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="grid gap-5">
      {featured.map((service) => (
        <ServiceCard key={service.slug} service={service} featured />
      ))}
      {rest.length > 0 ? (
        <div className={`grid gap-5 ${restCols}`}>
          {rest.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FlagshipServices() {
  const [sedation, ...rest] = featuredServices;

  return (
    <section className="reveal bg-background py-20 sm:py-24">
      <div className="wrap">
        <SectionHeader
          eyebrow="The work we are known for"
          title="Sedation, implants, and same-day crowns."
          body="Higher-stakes care, delivered at a calmer pace — with the rest of the menu under one roof."
        />
        <Link
          href="/roseville-dental-care/"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 transition hover:text-ocean-800"
        >
          All services
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>

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

export function HomeReviewProof() {
  const quote = reviewExcerpts[2] ?? reviewExcerpts[0];
  const featuredTopics = reviewTopics.slice(0, 3);

  return (
    <section className="bg-deep text-cream">
      <div className="wrap grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
        <div className="rounded-3xl border border-cream/15 bg-cream/[0.055] p-6 sm:p-8">
          <p className="eyebrow text-gold-soft">Google reviews</p>
          <div className="mt-4 flex items-end gap-3">
            <span className="font-serif text-6xl font-medium leading-none text-cream sm:text-7xl">
              {reviewStats.rating.toFixed(1)}
            </span>
            <div className="pb-1.5">
              <StarRow className="mb-1.5" />
              <p className="text-sm text-cream/70">
                {reviewStats.count} patient reviews
              </p>
            </div>
          </div>
          <p className="mt-5 border-t border-cream/15 pt-4 text-xs leading-5 text-cream/55">
            {reviewStats.fiveStarCount} five-star reviews · verified {reviewStats.verifiedOn}
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold-soft">The pattern is the proof</p>
          <h2 className="mt-4 max-w-2xl text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl">
            Patients keep describing care that feels warm, capable, and genuinely calm.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {featuredTopics.map((topic) => (
              <span
                key={topic.label}
                className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.06] px-3.5 py-2 text-sm text-cream/80"
              >
                <strong className="font-semibold text-cream">{topic.mentions}</strong>
                {topic.label.toLowerCase()} mentions
              </span>
            ))}
          </div>

          <blockquote className="mt-7 border-l border-sunset-400 pl-5 text-lg leading-8 text-cream/85">
            <Quote className="mb-3 size-5 text-sunset-300" aria-hidden="true" />
            “{quote.quote}”
            <footer className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
              {quote.name} · Google review
            </footer>
          </blockquote>

          <Link
            href="/patient-testimonials/"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-cream underline-offset-4 hover:underline"
          >
            Explore what patients are saying
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function DoctorSpotlight() {
  return (
    <section className="reveal bg-surface-alt py-20 sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[275px] lg:mx-0">
          <div className="relative aspect-[275/412] overflow-hidden rounded-3xl border border-line shadow-soft">
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

export function VisitPanel({
  headingLevel = "h2",
  showForm = true,
}: {
  headingLevel?: "h1" | "h2";
  showForm?: boolean;
} = {}) {
  const FormHeading = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section className="reveal bg-background py-20 sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeader
            eyebrow="Visit Waikiki Dental"
            title="Getting started is the easy part."
            body={
              showForm
                ? "Request an appointment, call or text the front desk, or send a quick note. The office is on Pleasant Grove Boulevard in Roseville."
                : "Request a preferred day and time, or call or text the front desk. The office is on Pleasant Grove Boulevard in Roseville."
            }
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

          {showForm ? (
            <p className="mt-6 text-sm text-ink-muted">
              Ready to plan a visit?{" "}
              <Link
                href={scheduleHref}
                className="font-semibold text-ocean-700 underline-offset-4 hover:underline"
              >
                Use our appointment form
              </Link>
              .
            </p>
          ) : null}
        </div>

        {showForm ? (
          <div className="rounded-[1.75rem] border border-line bg-cream p-7 shadow-soft sm:p-9">
            <FormHeading className="font-serif text-2xl text-ink">
              Send a message
            </FormHeading>
            <p className="mt-2 text-sm leading-7 text-ink-muted">
              {formPrivacy.contactLead}
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between rounded-[1.75rem] bg-deep p-8 text-cream sm:p-10">
            <div>
              <p className="eyebrow text-gold-soft">Book a visit</p>
              <h3 className="mt-4 font-serif text-3xl font-medium tracking-tight text-cream">
                The next step is a conversation.
              </h3>
              <p className="mt-4 max-w-md text-pretty leading-8 text-cream/75">
                Choose a preferred day and time in our website form, or call or
                text the Roseville office. The team will confirm the final slot.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Link href={scheduleHref} className="btn btn-sunset">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Request Appointment
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                <Phone className="size-4" aria-hidden="true" />
                Call or text {site.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Quiet closer — one clear on-site scheduling action plus a phone fallback. */
export function BookStrip() {
  return (
    <section className="border-t border-line bg-cream">
      <div className="wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
            Ready when you are.
          </h2>
          <p className="mt-2 max-w-xl text-ink-muted">
            Request a preferred day and time in a couple of minutes, or call or
            text the Roseville office.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={scheduleHref} className="btn btn-sunset">
            <CalendarCheck className="size-4" aria-hidden="true" />
            Request Appointment
          </Link>
          <a href={site.phoneHref} className="btn btn-outline" aria-label={`Call or text ${site.phone}`}>
            <Phone className="size-4" aria-hidden="true" />
            Call or text
          </a>
        </div>
      </div>
    </section>
  );
}
