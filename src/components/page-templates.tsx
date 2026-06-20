import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, Phone } from "lucide-react";
import {
  dentistJsonLd,
  doctor,
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

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistJsonLd) }}
    />
  );
}

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
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl sm:leading-[1.07]">
        {title}
      </h1>
      {body ? (
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-ink-muted">
          {body}
        </p>
      ) : null}
      {actions ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={site.bookingHref} className="btn btn-clay">
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

  return (
    <>
      <JsonLd />
      <section className="bg-background">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl sm:leading-[1.07]">
              {service.title} in Roseville
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-ink-muted">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.bookingHref} className="btn btn-clay">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <a href={site.phoneHref} className="btn btn-outline">
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-line bg-cream p-7 shadow-soft">
            <span className="grid size-14 place-items-center rounded-full bg-sage-600 text-cream">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-serif text-2xl font-medium text-ink">
              What this visit can support
            </h2>
            <ul className="mt-5 grid gap-3">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-ink">
                  <BadgeCheck
                    className="mt-0.5 size-5 shrink-0 text-sage-600"
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
            eyebrow="More dental care options"
            title="Care that connects prevention, confidence, and comfort."
            body="Explore related services from the Waikiki Dental team."
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
            title="A complete menu of modern family and cosmetic dentistry."
            body="From preventive cleanings to implants, orthodontics, smile makeovers, CEREC same-day crowns, and IV sedation, Waikiki Dental builds treatment around your needs."
          />
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="wrap grid gap-14">
          {groups.map((group) => (
            <div key={group.key}>
              <div className="border-b border-line pb-4">
                <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
                  {group.label}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{group.description}</p>
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
            <h1 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl sm:leading-[1.07]">
              A Roseville dentist focused on trust, comfort, and clear choices.
            </h1>
            <div className="mt-6 grid gap-4 text-lg leading-8 text-ink-muted">
              {doctor.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.bookingHref} className="btn btn-clay">
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
                  <BadgeCheck className="size-3.5 text-sage-600" aria-hidden="true" />
                  {credential}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-soft">
              <DoctorPortrait priority />
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
      <FinalCta />
    </>
  );
}

export function OfficePage() {
  const pillars: Array<[string, string]> = [
    [
      "High standards",
      "Comprehensive treatment planning and restorative and cosmetic dentistry support the quality care patients deserve.",
    ],
    [
      "Education & prevention",
      "The practice emphasizes exams, oral cancer screenings, x-rays, cleanings, sealants, fluoride, and practical patient education.",
    ],
    [
      "Uncompromising safety",
      "Infection control and sterilization processes help protect patients and the team.",
    ],
    [
      "A positive experience",
      "The team builds trust by treating patients as individuals and creating a relaxing, respectful visit.",
    ],
  ];

  return (
    <>
      <JsonLd />
      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap">
          <PageHeader
            eyebrow="Waikiki Dental Roseville"
            title="A conveniently located dental office with high standards of care."
            body="The Roseville practice is devoted to restoring and enhancing natural smiles with family dentistry, cosmetic dentistry, implant dentistry, and comfort-focused care."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {pillars.map(([title, body], index) => (
              <article key={title} className="card p-7">
                <span className="font-serif text-2xl text-sage-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-serif text-2xl font-medium text-ink">
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
      "Waikiki Dental accepts most dental insurance plans and can help you understand benefits and estimated costs.",
    ],
    [
      "Flexible payment options",
      "Cash, checks, debit cards, and major credit cards are accepted, with payment expected at the time of treatment.",
    ],
    [
      "CareCredit financing",
      "CareCredit can help make out-of-pocket healthcare expenses more manageable with flexible financing options.",
    ],
    [
      "Patient forms",
      "Registration paperwork can be completed in advance through the office's secure email or text platform.",
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
              title="Everything you need before your first Waikiki Dental visit."
              body="The team looks forward to meeting you and helping you prepare — with insurance, payment, financing, and patient form guidance."
            />
            <div className="grid gap-4">
              {details.map(([title, body]) => (
                <article key={title} className="card p-6">
                  <h2 className="font-serif text-xl font-medium text-ink">{title}</h2>
                  <p className="mt-3 leading-7 text-ink-muted">{body}</p>
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
            title="Roseville patients describe a friendly, gentle, professional team."
            body="Waikiki Dental's patients consistently mention warmth, comfort, professionalism, and genuine care for anxious visitors."
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
    <section className="bg-background py-28">
      <div className="wrap max-w-2xl text-center">
        <Eyebrow className="justify-center">404 · Page not found</Eyebrow>
        <h1 className="mt-4 text-balance font-serif text-5xl font-medium tracking-tight text-ink">
          Let’s get you back to your smile.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-muted">
          The page you’re looking for isn’t available on this preview site.
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
