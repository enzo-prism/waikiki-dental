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
  doctorCandid,
  doctorCandidAlt,
  doctorPortrait,
  featuredServices,
  hours,
  newPatientOffer,
  paymentOptions,
  reviewStats,
  scheduleHref,
  site,
  testimonials,
  trustPoints,
  type Service,
} from "@/lib/site";
import { ContactForm } from "./contact-form";
import { WaveDivider, WaveLines, WaveUnderline } from "./waves";

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
  const underlineTone = tone === "dark" ? "text-sunset-300" : "text-sunset-500";

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
      <WaveUnderline
        className={`mt-5 h-3 w-28 ${underlineTone} ${align === "center" ? "mx-auto" : ""}`}
      />
      {body ? (
        <p className={`mt-5 text-pretty text-lg leading-8 ${bodyColor}`}>{body}</p>
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
      aria-label="Read patient reviews"
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
      {reviewStats.rating ? (
        <span className={`font-serif text-lg ${onDark ? "text-cream" : "text-ink"}`}>
          {reviewStats.rating.toFixed(1)}
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
        {reviewStats.count
          ? `${reviewStats.count}+ ${reviewStats.source} reviews`
          : `Read our ${reviewStats.source} reviews`}
      </a>
    </div>
  );
}

/** Slow-drifting trust strip — duplicated for a seamless loop (copy is aria-hidden). */
export function TrustBar() {
  return (
    <section
      aria-label="Practice highlights"
      className="overflow-hidden border-y border-line bg-cream py-4"
    >
      <div className="wave-drift-slow flex w-max hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-10 pr-10"
          >
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 whitespace-nowrap">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ocean-50 text-ocean-600">
                  <BadgeCheck className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-ink">{point}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/** Three card treatments, assigned by service category, so grids never blur together. */
const cardVariantByCategory: Record<string, "cream" | "line" | "deep"> = {
  preventive: "cream",
  cosmetic: "deep",
  restorative: "line",
  orthodontics: "cream",
  sedation: "deep",
  emergency: "line",
};

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  const variant = cardVariantByCategory[service.category] ?? "cream";
  const number = String(index + 1).padStart(2, "0");

  if (variant === "deep") {
    return (
      <Link
        href={`/${service.slug}/`}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-deep p-7 text-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
      >
        <WaveLines className="pointer-events-none absolute -right-10 -top-6 h-24 w-56 text-ocean-300/15" />
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-full bg-cream/10 text-cream transition group-hover:bg-sunset-600">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-sm text-cream/40">{number}</span>
        </div>
        <p className="eyebrow mt-6 text-gold-soft">{service.eyebrow}</p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-cream">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-cream/70">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-sunset-300">
          Learn more
          <ArrowRight
            className="size-4 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    );
  }

  if (variant === "line") {
    return (
      <Link
        href={`/${service.slug}/`}
        className="group flex flex-col rounded-2xl border border-line-strong/70 bg-transparent p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ocean-400 hover:bg-cream/70"
      >
        <div className="flex items-start justify-between">
          <span
            aria-hidden="true"
            className="font-serif text-5xl leading-none text-line-strong"
          >
            {number}
          </span>
          <span className="grid size-11 place-items-center rounded-full border border-line text-ocean-600 transition group-hover:border-ocean-500 group-hover:bg-ocean-50">
            <Icon className="size-5" aria-hidden="true" />
          </span>
        </div>
        <p className="eyebrow mt-5 text-sunset-600">{service.eyebrow}</p>
        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-ink-muted">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ocean-700">
          Learn more
          <ArrowRight
            className="size-4 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${service.slug}/`}
      className="group card flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ocean-300 hover:shadow-soft-lg"
    >
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-full bg-ocean-50 text-ocean-600 transition group-hover:bg-ocean-600 group-hover:text-cream">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-serif text-sm text-ink-soft">{number}</span>
      </div>
      <p className="eyebrow mt-6 text-sunset-600">{service.eyebrow}</p>
      <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-ink-muted">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ocean-700">
        Learn more
        <ArrowRight
          className="size-4 transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export function ServicesGrid({ items = featuredServices }: { items?: Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, index) => (
        <ServiceCard key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
}

/** Insurance + financing trust marks (text-based, references stated options only). */
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

export function NewPatientOffer() {
  return (
    <section className="bg-surface-alt">
      <div className="wrap py-14 sm:py-16">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-deep p-8 text-cream shadow-soft-lg sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grain" aria-hidden="true" />
          <WaveLines className="pointer-events-none absolute -right-16 -top-10 h-40 w-[26rem] text-ocean-300/15" />
          <div className="relative">
            <Eyebrow className="text-gold-soft">{newPatientOffer.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium tracking-tight text-cream sm:text-4xl sm:leading-[1.1]">
              {newPatientOffer.title}
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-8 text-cream/75">
              {newPatientOffer.body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={scheduleHref} className="btn btn-sunset">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Request an appointment
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                <Phone className="size-4" aria-hidden="true" />
                Call or Text {site.phone}
              </a>
            </div>
          </div>
          <ul className="relative grid gap-3">
            {newPatientOffer.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.05] px-4 py-3.5 text-sm font-medium text-cream"
              >
                <BadgeCheck className="size-5 shrink-0 text-ocean-300" aria-hidden="true" />
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
      title: "Plans you can actually follow",
      body: "Dr. Narodovich shows you what he sees and lays out your options plainly — so every decision is made with you, never at you.",
      icon: ShieldCheck,
    },
    {
      title: "Built for nervous patients",
      body: "A calm room, a patient team, and sedation options for when nerves run deeper. Fear shouldn't cost anyone their health.",
      icon: HeartPulse,
    },
    {
      title: "Technology that saves you visits",
      body: "Digital X-rays sharpen the diagnosis, and in-office CEREC milling turns a crown into a single appointment.",
      icon: BadgeCheck,
    },
  ];

  return (
    <section className="reveal bg-background py-24 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-b-[2rem] rounded-t-[10rem] border border-ocean-200"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[10rem] border border-line shadow-soft">
            <Image
              src={careImage}
              alt="Bright, calm, modern dental treatment room"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-warm object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-deep/30 via-transparent to-transparent" />
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Why Waikiki Dental"
            title="The aloha spirit, applied to dentistry."
            body="Advanced care doesn't have to feel clinical. Expect clear explanations, honest recommendations, and a team that never makes you feel rushed — or judged."
          />
          <div className="mt-9">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex gap-6 border-t border-line py-6 transition first:border-t-0 first:pt-0 hover:bg-cream/50"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl leading-none text-ocean-300"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-ocean-600" aria-hidden="true" />
                      <h3 className="font-serif text-xl font-medium text-ink">
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
            The dentist people send their nervous friends to.
          </h2>
          <WaveUnderline className="mt-5 h-3 w-28 text-sunset-500" />
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

        <div className="order-1 lg:order-2 relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-line shadow-soft">
            <Image
              src={doctorCandid}
              alt={doctorCandidAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-warm object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-4 flex items-center gap-3.5 rounded-2xl border border-line bg-cream py-3.5 pl-3.5 pr-5 shadow-soft-lg">
            {doctorPortrait ? (
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line">
                <Image
                  src={doctorPortrait}
                  alt=""
                  fill
                  sizes="48px"
                  loading="eager"
                  className="object-cover object-[50%_22%]"
                />
              </span>
            ) : null}
            <span>
              <p className="font-serif text-lg text-ink">{doctor.name}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ocean-600">
                {doctor.role}
              </p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="reveal relative overflow-hidden bg-deep text-cream">
      <div className="grain" aria-hidden="true" />
      <WaveLines
        className="pointer-events-none absolute -right-24 -top-10 h-44 w-[36rem] text-ocean-300/15"
        rows={4}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -bottom-24 size-[34rem] rounded-full bg-ocean-700/30 blur-3xl"
      />
      <div className="wrap relative py-24 sm:py-28">
        <SectionHeader
          tone="dark"
          eyebrow="Patient reviews"
          title="What Roseville patients keep saying."
          body="Every word below comes from a real patient of the practice. The pattern is hard to miss: a warm welcome, gentle care, and nerves put to rest."
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
            title="Getting started is the easy part."
            body="Book online, call or text the front desk, or send a quick note — whichever feels easiest. You'll find the office on Pleasant Grove Boulevard in Roseville."
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
        </div>

        <div className="rounded-[1.75rem] border border-line bg-cream p-7 shadow-soft sm:p-9">
          <h3 className="font-serif text-2xl text-ink">Send a message</h3>
          <p className="mt-2 text-sm leading-7 text-ink-muted">
            Have a general question? Write to the team and choose how you&rsquo;d
            like to hear back. Please don&rsquo;t include medical, insurance, or
            other sensitive details.
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
    <section className="relative overflow-hidden bg-gradient-to-br from-sunset-600 via-sunset-600 to-sunset-700 text-cream">
      <div className="grain" aria-hidden="true" />
      <WaveDivider
        flip
        className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full text-sunset-700/30 sm:h-16"
      />
      <WaveLines
        className="pointer-events-none absolute -left-20 bottom-0 h-32 w-[30rem] text-cream/15"
        rows={3}
      />
      <div className="wrap-wide relative grid gap-8 py-20 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Eyebrow className="text-cream/85">
            Now accepting new patients
          </Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight sm:text-[2.75rem] sm:leading-[1.08]">
            Come see what a calm dental visit feels like.
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-cream/90">
            Book online in a couple of minutes, or call and talk to a real
            person at the Roseville office.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.bookingHref} className="btn btn-dark">
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
