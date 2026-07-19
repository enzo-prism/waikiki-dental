import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, Phone } from "lucide-react";
import {
  dentistJsonLd,
  doctor,
  doctorCandid,
  doctorCandidAlt,
  featuredServices,
  findService,
  servicesByCategory,
  site,
  type Service,
} from "@/lib/site";
import {
  Eyebrow,
  FinalCta,
  PaymentStrip,
  Reviews,
  SectionHeader,
  ServicesGrid,
  VisitPanel,
} from "./sections";
import { DoctorPortrait } from "./brand";
import { ContactForm } from "./contact-form";
import { WaveLines, WaveUnderline } from "./waves";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistJsonLd) }}
    />
  );
}

/** Decorative underline accent per service category (never the sole signal). */
const categoryAccent: Record<string, string> = {
  preventive: "text-ocean-500",
  cosmetic: "text-sunset-500",
  restorative: "text-ocean-600",
  orthodontics: "text-gold",
  sedation: "text-sunset-600",
  emergency: "text-sunset-700",
};

function PageHeader({
  eyebrow,
  title,
  body,
  actions = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  actions?: boolean;
}) {
  return (
    <div className="relative">
      <WaveLines className="pointer-events-none absolute -right-24 -top-12 h-32 w-[26rem] text-ocean-200/40" />
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
        {title}
      </h1>
      <WaveUnderline className="mt-6 h-3 w-32 text-sunset-500" />
      {body ? (
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-muted">
          {body}
        </p>
      ) : null}
      {actions ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={site.bookingHref} className="btn btn-sunset">
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book Online
          </a>
          <a href={site.phoneHref} className="btn btn-outline">
            <Phone className="size-4" aria-hidden="true" />
            Call or Text
          </a>
        </div>
      ) : null}
    </div>
  );
}

export function ServicePage({ service }: { service: Service }) {
  const Icon = service.icon;
  const accent = categoryAccent[service.category] ?? "text-sunset-500";

  return (
    <>
      <JsonLd />
      <section className="relative overflow-hidden bg-background">
        <WaveLines className="pointer-events-none absolute -left-24 bottom-0 h-36 w-[30rem] text-ocean-200/40" />
        <div className="wrap relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {service.title} in Roseville
            </h1>
            <WaveUnderline className={`mt-6 h-3 w-32 ${accent}`} />
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-muted">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <div className="relative overflow-hidden rounded-[2rem] bg-deep p-7 text-cream shadow-soft-lg sm:p-8">
            <div className="grain" aria-hidden="true" />
            <WaveLines className="pointer-events-none absolute -right-12 -top-8 h-28 w-64 text-ocean-300/15" />
            <span className="relative grid size-14 place-items-center rounded-full bg-sunset-600 text-cream">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <h2 className="relative mt-6 font-serif text-2xl font-medium text-cream">
              What this visit can do for you
            </h2>
            <ul className="relative mt-5 grid gap-3">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-cream/90">
                  <BadgeCheck
                    className="mt-0.5 size-5 shrink-0 text-ocean-300"
                    aria-hidden="true"
                  />
                  <span className="leading-7">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="wrap">
          <SectionHeader
            eyebrow="Keep exploring"
            title="Everything else under one roof."
            body="Related care from the same Roseville team — no referral chase required."
          />
          <div className="mt-10">
            <ServicesGrid
              items={featuredServices.filter((item) => item.slug !== service.slug)}
            />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function ServicesHubPage() {
  const groups = servicesByCategory();

  return (
    <>
      <JsonLd />
      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap">
          <PageHeader
            eyebrow="Roseville dental care"
            title="One office for every stage of your smile."
            body="Preventive cleanings, cosmetic refinements, implants, orthodontics, CEREC same-day crowns, and IV sedation — a complete menu of care, delivered at a calmer pace."
          />
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="wrap grid gap-16">
          {groups.map((group) => (
            <div key={group.key}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
                <div>
                  <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
                    {group.label}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">{group.description}</p>
                </div>
                <WaveUnderline
                  className={`h-2.5 w-24 ${categoryAccent[group.key] ?? "text-sunset-500"}`}
                />
              </div>
              <div className="mt-6">
                <ServicesGrid items={group.items} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function DoctorPage() {
  return (
    <>
      <JsonLd />
      <section className="bg-background py-16 sm:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>{doctor.name}</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              A Roseville dentist who leads with listening.
            </h1>
            <WaveUnderline className="mt-6 h-3 w-32 text-sunset-500" />
            <div className="mt-6 grid gap-4 text-lg leading-8 text-ink-muted">
              {doctor.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.bookingHref} className="btn btn-sunset">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <Link href="/iv-sedation/" className="btn btn-outline">
                Sedation Dentistry
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

          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 h-full w-full rounded-b-[2rem] rounded-t-[7rem] border border-ocean-200"
            />
            <div className="relative aspect-[2/3] overflow-hidden rounded-b-[2rem] rounded-t-[7rem] border border-line shadow-soft">
              <DoctorPortrait priority />
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-line bg-cream px-5 py-4 shadow-soft-lg">
              <p className="font-serif text-lg text-ink">{doctor.name}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ocean-600">
                {doctor.role}
              </p>
            </div>
          </div>
        </div>

        <div className="wrap mt-20 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-line shadow-soft">
            <Image
              src={doctorCandid}
              alt={doctorCandidAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="img-warm object-cover"
            />
          </div>
          <div>
            <Eyebrow>In the office</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Care that starts with a real conversation.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-ink-muted">
              Every visit begins with listening. Dr. Narodovich walks patients
              through what he sees, what the options are, and what he
              recommends — so decisions about your smile always feel informed
              and unhurried.
            </p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function OfficePage() {
  const pillars: Array<[string, string]> = [
    [
      "High standards",
      "Comprehensive treatment planning, restorative care, and cosmetic dentistry — held to the standard we'd want for our own families.",
    ],
    [
      "Education & prevention",
      "Exams, oral cancer screenings, X-rays, cleanings, sealants, fluoride, and practical coaching — because the easiest dental problem is the one that never happens.",
    ],
    [
      "Uncompromising safety",
      "Sterilization and infection-control protocols that protect every patient and every team member, at every visit.",
    ],
    [
      "A positive experience",
      "You're a person here, not a chart number. Expect a relaxed, respectful visit that earns trust the old-fashioned way.",
    ],
  ];

  return (
    <>
      <JsonLd />
      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap">
          <PageHeader
            eyebrow="Waikiki Dental Roseville"
            title="High standards of care, with a genuinely lighter touch."
            body="The Roseville practice is devoted to restoring and enhancing natural smiles — family, cosmetic, and implant dentistry with prevention, safety, and hospitality at the center."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {pillars.map(([title, body], index) => (
              <article
                key={title}
                className="rounded-2xl border border-line-strong/70 bg-cream/60 p-7 transition hover:border-ocean-300 hover:bg-cream"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl leading-none text-ocean-200"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-serif text-2xl font-medium text-ink">
                  {title}
                </h2>
                <p className="mt-3 leading-7 text-ink-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <VisitPanel />
    </>
  );
}

export function NewPatientsPage() {
  const details: Array<[string, string]> = [
    [
      "Insurance support",
      "Most dental insurance plans are accepted, and the team will help you understand your benefits and estimated costs before treatment begins.",
    ],
    [
      "Flexible payment options",
      "Cash, checks, debit, and major credit cards are all welcome; payment is due at the time of treatment.",
    ],
    [
      "CareCredit financing",
      "CareCredit spreads out-of-pocket costs into manageable payments, so needed treatment doesn't have to wait.",
    ],
    [
      "Patient forms",
      "Registration paperwork arrives through the office's secure email or text platform — finish it from your couch before you arrive.",
    ],
  ];

  return (
    <>
      <JsonLd />
      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <PageHeader
              eyebrow="New patients"
              title="Everything sorted before your first visit."
              body="Insurance, payment, financing, forms — here's how the team makes the practical part painless, so your first appointment is just about you."
            />
            <div className="grid gap-4">
              {details.map(([title, body], index) => (
                <article
                  key={title}
                  className="flex gap-5 rounded-2xl border border-line bg-cream p-6 transition hover:border-ocean-300"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-2xl leading-none text-ocean-300"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-medium text-ink">{title}</h2>
                    <p className="mt-2 leading-7 text-ink-muted">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-cream p-6 sm:p-7">
            <p className="eyebrow mb-3">Insurance &amp; financing</p>
            <PaymentStrip />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function TestimonialsPage() {
  return (
    <>
      <JsonLd />
      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap">
          <PageHeader
            eyebrow="Patient testimonials"
            title="Don't take our word for it."
            body="Roseville patients describe the same practice again and again: friendly, gentle, professional — and unusually good with nerves."
            actions={false}
          />
        </div>
      </section>
      <Reviews />
      <FinalCta />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <JsonLd />
      <VisitPanel headingLevel="h1" />
    </>
  );
}

export function SedationArticlePage() {
  const service = findService("iv-sedation")!;
  return <ServicePage service={service} />;
}

export function NotFoundMarketing() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <WaveLines
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-ocean-200/40"
        rows={3}
      />
      <div className="wrap relative max-w-2xl text-center">
        <Eyebrow className="justify-center">404 · Page not found</Eyebrow>
        <h1 className="mt-4 text-balance font-serif text-5xl font-medium tracking-tight text-ink">
          Let’s get you back to your smile.
        </h1>
        <WaveUnderline className="mx-auto mt-6 h-3 w-32 text-sunset-500" />
        <p className="mt-5 text-lg leading-8 text-ink-muted">
          The page you’re looking for has moved or never existed — but
          everything else is right where it should be.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-dark">
            Back to Home
          </Link>
          <Link href="/roseville-dental-care/" className="btn btn-outline">
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ContactFormBlock() {
  return <ContactForm />;
}
