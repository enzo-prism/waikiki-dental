import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Phone,
  Star,
} from "lucide-react";
import {
  cerecProcess,
  dentistJsonLd,
  doctor,
  doctorCandid,
  doctorCandidAlt,
  featuredServices,
  findService,
  implantProcess,
  reviewDistribution,
  reviewStats,
  reviewTopics,
  scheduleHref,
  servicesByCategory,
  site,
  type Service,
} from "@/lib/site";
import {
  BookStrip,
  Eyebrow,
  PaymentStrip,
  SectionHeader,
  ServicesGrid,
  VisitPanel,
} from "./sections";
import { DoctorPortrait } from "./brand";
import { ReviewExplorer } from "./review-explorer";

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
      <h1 className="mt-4 text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
        {title}
      </h1>
      {body ? (
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-muted">
          {body}
        </p>
      ) : null}
      {actions ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={scheduleHref} className="btn btn-sunset">
            <CalendarCheck className="size-4" aria-hidden="true" />
            Request Appointment
          </Link>
          <a href={site.phoneHref} className="btn btn-outline" aria-label={`Call or text ${site.phone}`}>
            <Phone className="size-4" aria-hidden="true" />
            Call or text
          </a>
        </div>
      ) : null}
    </div>
  );
}

function RelatedCare({ excludeSlug }: { excludeSlug?: string }) {
  const items = featuredServices.filter((item) => item.slug !== excludeSlug);
  if (items.length === 0) return null;

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="wrap">
        <SectionHeader
          eyebrow="Also in this office"
          title="Related flagship care."
        />
        <div className="mt-10">
          <ServicesGrid items={items} />
        </div>
      </div>
    </section>
  );
}

function DefaultServicePage({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <>
      <JsonLd />
      <section className="bg-background">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {service.title} in Roseville
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-muted">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <div className="rounded-3xl border border-line bg-cream p-7 sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-ocean-50 text-ocean-600">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-serif text-2xl font-medium text-ink">
              What this visit can do for you
            </h2>
            <ul className="mt-5 grid gap-3">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-ink-muted">
                  <BadgeCheck
                    className="mt-0.5 size-5 shrink-0 text-ocean-600"
                    aria-hidden="true"
                  />
                  <span className="leading-7">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <RelatedCare excludeSlug={service.slug} />
      <BookStrip />
    </>
  );
}

function SedationServicePage({ service }: { service: Service }) {
  return (
    <>
      <JsonLd />
      <section className="bg-deep text-cream">
        <div className="wrap py-20 sm:py-28">
          <Eyebrow className="text-gold-soft">{service.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-cream sm:text-6xl">
            Years of put-off dentistry, finished in calm visits.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-cream/75">
            {service.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={scheduleHref} className="btn btn-sunset">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Request Appointment
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-light" aria-label={`Call or text ${site.phone}`}>
              <Phone className="size-4" aria-hidden="true" />
              Call or text
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
              Who this is for
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-muted">
              IV sedation is the heart of the practice: patients who are fearful,
              fighting a strong gag reflex, or who simply need more treatment
              done with less stress.
            </p>
          </div>
          <ul className="grid gap-4">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 border-t border-line pt-4 text-ink first:border-0 first:pt-0"
              >
                <BadgeCheck
                  className="mt-0.5 size-5 shrink-0 text-ocean-600"
                  aria-hidden="true"
                />
                <span className="leading-7">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BookStrip />
    </>
  );
}

function ProcessServicePage({
  service,
  steps,
}: {
  service: Service;
  steps: { title: string; body: string }[];
}) {
  const columns =
    steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <>
      <JsonLd />
      <section className="bg-background">
        <div className="wrap py-16 sm:py-20">
          <Eyebrow>{service.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            {service.title} in Roseville
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-muted">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

      <section className="bg-surface-alt py-20">
        <div className="wrap">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
            How a visit unfolds
          </h2>
          <ol className={`mt-10 grid gap-8 sm:grid-cols-2 ${columns}`}>
            {steps.map((step, index) => (
              <li key={step.title}>
                <p className="font-serif text-sm text-ocean-600">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 leading-7 text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="wrap max-w-3xl">
          <ul className="grid gap-3">
            {service.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-ink-muted">
                <BadgeCheck
                  className="mt-0.5 size-5 shrink-0 text-ocean-600"
                  aria-hidden="true"
                />
                <span className="leading-7">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <RelatedCare excludeSlug={service.slug} />
      <BookStrip />
    </>
  );
}

export function ServicePage({ service }: { service: Service }) {
  if (service.slug === "iv-sedation") {
    return <SedationServicePage service={service} />;
  }
  if (service.slug === "roseville-cerec-same-day-crowns") {
    return <ProcessServicePage service={service} steps={cerecProcess} />;
  }
  if (service.slug === "roseville-dental-implants") {
    return <ProcessServicePage service={service} steps={implantProcess} />;
  }
  return <DefaultServicePage service={service} />;
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
            body="Preventive cleanings, cosmetic refinements, implants, orthodontics, CEREC same-day crowns, and IV sedation — a complete menu, delivered at a calmer pace."
          />
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="wrap grid gap-16">
          {groups.map((group) => (
            <div key={group.key}>
              <div className="border-b border-line pb-4">
                <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
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
      <BookStrip />
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
            <div className="mt-6 grid gap-4 text-lg leading-8 text-ink-muted">
              {doctor.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={scheduleHref} className="btn btn-sunset">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Request Appointment
              </Link>
              <Link href="/iv-sedation/" className="btn btn-outline">
                Sedation dentistry
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

          <div className="relative mx-auto w-full max-w-[275px] lg:mx-0 lg:justify-self-end">
            <div className="relative aspect-[275/412] overflow-hidden rounded-3xl border border-line shadow-soft">
              <DoctorPortrait priority />
            </div>
            <p className="mt-4 font-serif text-lg text-ink">{doctor.name}</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ocean-600">
              {doctor.role}
            </p>
          </div>
        </div>

        <div className="wrap mt-20 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line shadow-soft">
            <Image
              src={doctorCandid}
              alt={doctorCandidAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
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
      <BookStrip />
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
            {pillars.map(([title, body]) => (
              <article
                key={title}
                className="rounded-2xl border border-line bg-cream p-7"
              >
                <h2 className="font-serif text-2xl font-medium text-ink">{title}</h2>
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
              {details.map(([title, body]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-line bg-cream p-6"
                >
                  <h2 className="font-serif text-xl font-medium text-ink">{title}</h2>
                  <p className="mt-2 leading-7 text-ink-muted">{body}</p>
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
      <BookStrip />
    </>
  );
}

export function TestimonialsPage() {
  const featuredTopics = reviewTopics.slice(0, 4);
  const supportingTopics = reviewTopics.slice(4);

  return (
    <>
      <JsonLd />
      <section className="overflow-hidden bg-deep text-cream">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <Eyebrow className="text-gold-soft">Patient reviews</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-balance font-serif text-[2.7rem] font-medium leading-[1.04] tracking-tight text-cream sm:text-6xl">
              426 reviews. One remarkably consistent feeling.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-cream/75">
              The full Google record is organized here by rating, recurring topics,
              and short patient excerpts — with one clear path to every review at
              the source.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={reviewStats.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light"
              >
                Read all {reviewStats.count} on Google
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <Link href={scheduleHref} className="btn btn-sunset">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Request Appointment
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-cream/15 bg-cream/[0.06] p-6 shadow-soft-lg sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-5 border-b border-cream/15 pb-6">
              <div>
                <p className="eyebrow text-gold-soft">Google rating</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="font-serif text-7xl font-medium leading-none text-cream">
                    {reviewStats.rating.toFixed(1)}
                  </span>
                  <div className="pb-1.5">
                    <div className="flex gap-1 text-gold-soft" aria-label="4.9 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="mt-1.5 text-sm text-cream/65">{reviewStats.count} reviews</p>
                  </div>
                </div>
              </div>
              <p className="rounded-full border border-gold-soft/30 bg-gold-soft/10 px-3 py-1.5 text-xs font-semibold text-gold-soft">
                {reviewStats.fiveStarCount} five-star reviews
              </p>
            </div>

            <div className="mt-6 grid gap-3" aria-label="Google review rating distribution">
              {reviewDistribution.map((row) => (
                <div key={row.stars} className="grid grid-cols-[2.75rem_1fr_2.25rem] items-center gap-3 text-xs">
                  <span className="text-cream/65">{row.stars} star</span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-cream/10">
                    <span
                      className="block h-full rounded-full bg-gold-soft"
                      style={{ width: `${(row.count / reviewStats.count) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-semibold text-cream/80">{row.count}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-5 text-cream/50">
              Rating and counts verified on {reviewStats.verifiedOn}. Google reviews can change over time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="wrap">
          <SectionHeader
            eyebrow="What patients mention most"
            title="The strongest themes are human, not clinical."
            body="Google's topic summary across the full review record points to the same experience again and again: a friendly team, caring attention, and an office that lowers the temperature of a dental visit."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTopics.map((topic, index) => (
              <article
                key={topic.label}
                className={`rounded-3xl border p-6 ${
                  index === 0
                    ? "border-ocean-700 bg-ocean-700 text-cream"
                    : "border-line bg-cream text-ink"
                }`}
              >
                <p
                  className={`font-serif text-5xl font-medium leading-none ${
                    index === 0 ? "text-cream" : "text-ocean-700"
                  }`}
                >
                  {topic.mentions}
                </p>
                <h2 className="mt-4 font-serif text-xl font-medium">{topic.label}</h2>
                <p className={`mt-2 text-sm leading-6 ${index === 0 ? "text-cream/70" : "text-ink-muted"}`}>
                  mentions in Google reviews
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {supportingTopics.map((topic) => (
              <span key={topic.label} className="chip bg-cream">
                <strong className="font-semibold text-ink">{topic.mentions}</strong>
                {topic.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="In patients' own words"
              title="Find the experience that matters to you."
              body="Use the filters to explore short, verified excerpts about comfort, the team, Dr. Mike, sedation, and same-day care."
            />
            <div className="rounded-2xl border border-line bg-cream p-5 text-sm leading-6 text-ink-muted lg:justify-self-end lg:max-w-md">
              Excerpts are shortened for readability and attributed with reviewer initials.
              The rating, distribution, and topic counts above were captured from Google
              on {reviewStats.verifiedOn}.
            </div>
          </div>
          <div className="mt-10">
            <ReviewExplorer />
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href={reviewStats.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Explore every review on Google
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <BookStrip />
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
  const service = findService("iv-sedation");
  if (!service) return null;
  return <ServicePage service={service} />;
}

export function NotFoundMarketing() {
  return (
    <section className="bg-background py-28">
      <div className="wrap relative max-w-2xl text-center">
        <Eyebrow className="justify-center">404 · Page not found</Eyebrow>
        <h1 className="mt-4 text-balance font-serif text-5xl font-medium tracking-tight text-ink">
          Let’s get you back to your smile.
        </h1>
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
