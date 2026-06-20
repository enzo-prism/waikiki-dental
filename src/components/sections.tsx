import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  careImage,
  doctor,
  featuredServices,
  hours,
  newPatientOffer,
  paymentOptions,
  reviewStats,
  scheduleHref,
  services,
  site,
  testimonials,
  trustPoints,
  type Service,
} from "@/lib/site";
import { DoctorPortrait } from "./brand";
import { ContactForm } from "./contact-form";

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
  const eyebrowTone = tone === "dark" ? "text-gold-soft" : "text-sage-600";

  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <Eyebrow className={eyebrowTone}>{eyebrow}</Eyebrow>
      <Heading
        className={`mt-4 text-balance font-serif text-3xl font-medium tracking-tight sm:text-[2.6rem] sm:leading-[1.1] ${titleColor}`}
      >
        {title}
      </Heading>
      {body ? (
        <p className={`mt-4 text-pretty text-lg leading-8 ${bodyColor}`}>{body}</p>
      ) : null}
    </div>
  );
}

export function StarRow({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-gold-soft" : "text-gold";
  return (
    <div
      className={`flex gap-1 ${color} ${className}`}
      aria-label={`Rated ${reviewStats.rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-4 fill-current" aria-hidden="true" />
      ))}
    </div>
  );
}

/** Honest aggregate rating — links to real reviews; shows a count only if set. */
export function AggregateRating({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <StarRow tone={tone} />
      <span className={`font-serif text-lg ${onDark ? "text-cream" : "text-ink"}`}>
        {reviewStats.rating.toFixed(1)}
      </span>
      <a
        href={reviewStats.href}
        target="_blank"
        rel="noreferrer"
        className={`text-sm transition ${
          onDark ? "text-cream/75 hover:text-cream" : "text-ink-muted hover:text-ink"
        }`}
      >
        {reviewStats.count
          ? `${reviewStats.count}+ ${reviewStats.source} reviews`
          : `Read our ${reviewStats.source} reviews`}
      </a>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-line bg-cream">
      <div className="wrap-wide grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:grid-cols-4">
        {trustPoints.map((point, index) => (
          <div
            key={point}
            className={`flex items-center gap-3 ${
              index > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""
            }`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sage-50 text-sage-600">
              <BadgeCheck className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium leading-5 text-ink">{point}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesGrid({ items = featuredServices }: { items?: Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, index) => {
        const Icon = service.icon;
        return (
          <Link
            key={service.slug}
            href={`/${service.slug}/`}
            className="group card flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sage-300 hover:shadow-soft-lg"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-full bg-sage-50 text-sage-600 transition group-hover:bg-sage-600 group-hover:text-cream">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-sm text-ink-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="eyebrow mt-6 text-clay-600">{service.eyebrow}</p>
            <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-ink-muted">{service.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700">
              Learn more
              <ArrowRight
                className="size-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/** Insurance + financing trust marks (text-based, references stated options only). */
export function PaymentStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
        <ShieldCheck className="size-4 text-sage-600" aria-hidden="true" />
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

export function NewPatientOffer() {
  return (
    <section className="bg-surface-alt">
      <div className="wrap py-14 sm:py-16">
        <div className="grid items-center gap-8 rounded-[1.75rem] border border-line bg-cream p-8 shadow-soft sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow className="text-clay-600">{newPatientOffer.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl sm:leading-[1.1]">
              {newPatientOffer.title}
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-8 text-ink-muted">
              {newPatientOffer.body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={scheduleHref} className="btn btn-clay">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Request an appointment
              </Link>
              <a href={site.phoneHref} className="btn btn-outline">
                <Phone className="size-4" aria-hidden="true" />
                Call or Text {site.phone}
              </a>
            </div>
          </div>
          <ul className="grid gap-3">
            {newPatientOffer.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 rounded-xl border border-line bg-background/40 px-4 py-3.5 text-sm font-medium text-ink"
              >
                <BadgeCheck className="size-5 shrink-0 text-sage-600" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CareApproach() {
  const points = [
    {
      title: "Personalized recommendations",
      body: "The team explains options clearly so patients can make confident, informed decisions about their care.",
      icon: ShieldCheck,
    },
    {
      title: "Comfort for anxious patients",
      body: "Sedation options and a calm setting help make longer or more sensitive visits feel manageable.",
      icon: HeartPulse,
    },
    {
      title: "Modern restorative technology",
      body: "Digital tools and CEREC same-day crowns support efficient, natural-looking dentistry.",
      icon: BadgeCheck,
    },
  ];

  return (
    <section className="reveal bg-background py-24 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-soft">
            <Image
              src={careImage}
              alt="Dentist gently examining a patient in a bright, calm clinical room"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-warm object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-night/30 via-transparent to-transparent" />
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Why Waikiki Dental"
            title="Clinical skill, delivered with a calmer rhythm."
            body="Advanced dentistry, clear communication, and genuinely gentle care — brought forward without ever feeling cold or corporate."
          />
          <div className="mt-9 grid gap-3">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex gap-5 rounded-2xl border border-line bg-cream p-5 transition hover:border-sage-200"
                >
                  <span className="font-serif text-2xl leading-none text-sage-400">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-sage-600" aria-hidden="true" />
                      <h3 className="font-serif text-lg font-medium text-ink">
                        {point.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-7 text-ink-muted">
                      {point.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DoctorSpotlight() {
  return (
    <section className="reveal bg-surface-alt py-24 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <Eyebrow>Meet the dentist</Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.08]">
            Dr. Michael Narodovich brings calm, considered care to Roseville.
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
                <BadgeCheck className="size-3.5 text-sage-600" aria-hidden="true" />
                {credential}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-soft">
            <DoctorPortrait />
          </div>
          <div className="absolute -bottom-5 -left-4 rounded-2xl border border-line bg-cream px-5 py-4 shadow-soft-lg">
            <p className="font-serif text-lg text-ink">{doctor.name}</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-600">
              {doctor.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="reveal relative overflow-hidden bg-night text-cream">
      <div className="grain" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 size-[34rem] rounded-full bg-sage-700/30 blur-3xl"
      />
      <div className="wrap relative py-24 sm:py-28">
        <SectionHeader
          tone="dark"
          eyebrow="Patient reviews"
          title="Warm, welcoming, and genuinely reassuring."
          body="Real Roseville patients describe a friendly, gentle, and professional team — especially the care they show anxious patients."
        />
        <AggregateRating tone="dark" className="mt-8" />

        <figure className="mt-10 max-w-4xl">
          <blockquote className="text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-cream sm:text-[2.5rem] sm:leading-[1.12]">
            “{featured.quote}”
          </blockquote>
          <figcaption className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
            — {featured.name} · {featured.location}
          </figcaption>
        </figure>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {rest.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-6"
            >
              <StarRow tone="dark" />
              <blockquote className="mt-4 text-lg leading-8 text-cream/90">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-gold-soft">
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
    <section className="reveal bg-background py-24 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeader
            eyebrow="Visit Waikiki Dental"
            title="A Roseville office designed for easier visits."
            body="Book online, call or text the team, or send a quick message to start the conversation."
            headingLevel={headingLevel}
          />

          <div className="mt-8 grid gap-3">
            <a
              href={site.mapsHref}
              className="group flex gap-4 rounded-2xl border border-line bg-cream p-5 transition hover:border-sage-300"
            >
              <MapPin
                className="mt-0.5 size-5 shrink-0 text-sage-600"
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
              className="group flex gap-4 rounded-2xl border border-line bg-cream p-5 transition hover:border-sage-300"
            >
              <Phone
                className="mt-0.5 size-5 shrink-0 text-clay-600"
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
        </div>

        <div className="rounded-[1.75rem] border border-line bg-cream p-7 shadow-soft sm:p-9">
          <h3 className="font-serif text-2xl text-ink">Send a message</h3>
          <p className="mt-2 text-sm leading-7 text-ink-muted">
            Send us a note and the team will reply by email or phone. No patient
            details are stored on this website.
          </p>
          <div className="mt-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-sage-700 text-cream">
      <div className="grain" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -bottom-24 size-[30rem] rounded-full bg-sage-800/50 blur-3xl"
      />
      <div className="wrap-wide relative grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Eyebrow className="text-gold-soft">
            Experience dental care as it should be
          </Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight sm:text-[2.75rem] sm:leading-[1.08]">
            Ready for a calmer, clearer dental visit?
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-cream/85">
            Schedule online or call the Roseville team. Waikiki Dental is
            accepting new patients.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.bookingHref} className="btn btn-light">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Book Online
            </a>
            <a href={site.phoneHref} className="btn btn-ghost-light">
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
          <Link
            href={scheduleHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/90 underline-offset-4 transition hover:text-cream hover:underline"
          >
            Or request an appointment online
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { services };
