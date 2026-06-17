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
  consultImage,
  featuredServices,
  hours,
  services,
  site,
  testimonials,
  trustPoints,
  type Service,
} from "@/lib/site";
import { ContactForm } from "./contact-form";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-black uppercase tracking-[0.24em] text-teal-700">
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  headingLevel = "h2",
  className = "",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  headingLevel?: "h1" | "h2";
  className?: string;
}) {
  const Heading = headingLevel;

  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading className="mt-3 text-balance text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </Heading>
      {body ? (
        <p className="mt-4 text-pretty text-lg leading-8 text-slate-600">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function ButtonRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={site.bookingHref}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-coral-500 px-5 text-sm font-black text-white shadow-lg shadow-coral-500/20 transition hover:bg-coral-600 focus:outline-none focus:ring-4 focus:ring-coral-100"
      >
        <CalendarCheck className="size-4" aria-hidden="true" />
        Book Online
      </a>
      <a
        href={site.phoneHref}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/50 bg-white/90 px-5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/60"
      >
        <Phone className="size-4" aria-hidden="true" />
        Call or Text
      </a>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {trustPoints.map((point) => (
          <div key={point} className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-700">
              <BadgeCheck className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-bold leading-5 text-slate-800">
              {point}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesGrid({
  items = featuredServices,
}: {
  items?: Service[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => {
        const Icon = service.icon;
        return (
          <Link
            key={service.slug}
            href={`/${service.slug}/`}
            className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-950/5"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-11 place-items-center rounded-lg bg-teal-50 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <ArrowRight
                className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-coral-500"
                aria-hidden="true"
              />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-coral-600">
              {service.eyebrow}
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {service.summary}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export function CareApproach() {
  const points = [
    {
      title: "Personalized recommendations",
      body: "The team explains options clearly so patients can make informed decisions about their care.",
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
    <section className="bg-mist-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white shadow-2xl shadow-teal-950/10">
          <Image
            src={careImage}
            alt="Dentist checking a patient in a bright clinical room"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeader
            eyebrow="Why choose Waikiki Dental"
            title="Clinical skill with a warm, patient-first rhythm."
            body="The current practice promise is simple: advanced dentistry, clear communication, and gentle care. The redesign brings that promise forward without making the experience feel cold or corporate."
          />
          <div className="mt-8 grid gap-4">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="rounded-lg border border-slate-200 bg-white p-5"
                >
                  <div className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-coral-50 text-coral-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-black text-slate-950">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {point.body}
                      </p>
                    </div>
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
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Meet the dentist"
            title="Dr. Michael Narodovich brings calm, detailed care to Roseville."
            body="Dr. Mike grew up in Cleveland, earned his Bachelor of Science from The Ohio State University, and completed dental training at Temple University in Philadelphia before relocating to Northern California."
          />
          <div className="mt-6 grid gap-4 text-base leading-8 text-slate-600">
            <p>
              His passion for safe, comfortable treatment for fearful patients
              led him to pursue sedation dentistry, helping patients relax while
              receiving the care they need.
            </p>
            <p>
              Outside dentistry, the original bio notes his love of Northern
              California beauty and Lake Tahoe snowfall.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/michael-narodovich-dmd/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-teal-900"
            >
              Learn About Dr. Narodovich
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
            <Image
              src={consultImage}
              alt="Dentist consulting with a patient in a modern dental office"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Patient reviews"
          title="Warm, welcoming, and reassuring for real people."
          body="The current site leads with patient language around friendliness, professionalism, gentleness, and anxiety relief."
          className="[&_*]:text-white [&_p:first-child]:text-teal-200 [&_p:last-child]:text-slate-300"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-lg border border-white/10 bg-white/[0.06] p-6"
            >
              <div className="mb-5 flex gap-1 text-coral-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-lg font-semibold leading-8 text-white">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-bold text-teal-200">
                {testimonial.name}
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
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Visit Waikiki Dental"
            title="A Roseville office designed for easier appointments."
            body="Book online, call or text the team, or use the contact form to start the conversation."
            headingLevel={headingLevel}
          />
          <div className="mt-8 grid gap-4">
            <a
              href={site.mapsHref}
              className="flex gap-4 rounded-lg border border-slate-200 bg-mist-50 p-5"
            >
              <MapPin className="mt-1 size-5 shrink-0 text-teal-700" />
              <span>
                <span className="block font-black text-slate-950">
                  {site.address}
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  Open directions in Google Maps
                </span>
              </span>
            </a>
            <a
              href={site.phoneHref}
              className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5"
            >
              <Phone className="mt-1 size-5 shrink-0 text-coral-600" />
              <span>
                <span className="block font-black text-slate-950">
                  {site.phone}
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  Call or text Waikiki Dental
                </span>
              </span>
            </a>
          </div>
          <dl className="mt-8 grid gap-2 rounded-lg border border-slate-200 p-5">
            {hours.map(([day, time]) => (
              <div key={day} className="flex justify-between gap-5 text-sm">
                <dt className="font-semibold text-slate-500">{day}</dt>
                <dd className="font-black text-slate-950">{time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-lg border border-slate-200 bg-mist-50 p-5">
          <h3 className="text-2xl font-black text-slate-950">
            Contact the office
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This form uses your email app to send the message. No patient
            details are stored on this website.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-teal-700 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-teal-100">
            Experience dental care as it should be
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">
            Ready for a calmer, clearer dental visit?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-teal-50">
            Schedule online or call the Roseville team. Waikiki Dental is
            accepting new patients.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={site.bookingHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-teal-800 transition hover:bg-teal-50"
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book Online
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-black text-white transition hover:bg-white/10"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export { services };
