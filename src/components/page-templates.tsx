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
  absoluteUrl,
  artwork,
  dentistId,
  dentistJsonLd,
  doctor,
  doctorPersonId,
  doctorProfilePath,
  newPatientQuestions,
  serviceNodeId,
  websiteJsonLd,
  featuredServices,
  findService,
  crownProcess,
  implantProcess,
  mediCalNotice,
  reviewDistribution,
  reviewStats,
  reviewTopics,
  scheduleHref,
  sedationConsultHref,
  servicesByCategory,
  site,
  teamStory,
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
import { AmbientVideo } from "./ambient-video";
import { DoctorPortrait } from "./brand";
import { ReviewExplorer } from "./review-explorer";
import { SeasonalNotFoundArt } from "./seasonal";
import { EmergencyOfficeHours } from "./emergency-office-hours";
import { SedationContactActions } from "./sedation-contact-actions";
import { CareGuide } from "./care-guide";
import { FaqJsonLd, FaqList } from "./faq";
import { orthodonticsQuestions } from "@/lib/care-guides";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([dentistJsonLd, websiteJsonLd]) }}
    />
  );
}

function ServiceJsonLd({ service }: { service: Service }) {
  const url = absoluteUrl(`/${service.slug}/`);
  const graph = [
    dentistJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceNodeId(service.slug),
      name: service.title,
      serviceType: service.title,
      description: service.description,
      url,
      areaServed: "Roseville, CA",
      provider: { "@id": dentistId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Dental services",
          item: absoluteUrl("/roseville-dental-care/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: url,
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

function ServiceBreadcrumbs({
  service,
  tone = "light",
}: {
  service: Service;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-cream/65" : "text-ink-muted";
  const current = tone === "dark" ? "text-cream" : "text-ink";
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-sm ${muted}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href="/roseville-dental-care/">Dental services</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className={current}>{service.title}</li>
      </ol>
    </nav>
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
          eyebrow="Flagship care in Roseville"
          title="Other ways we can help."
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
      <ServiceJsonLd service={service} />
      <section className="bg-background">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <ServiceBreadcrumbs service={service} />
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {service.title} in Roseville
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-muted">
              {service.description}
            </p>
            {service.slug === "dental-emergencies" ? (
              <div className="mt-6">
                <a href={site.phoneHref} className="btn btn-outline border-ocean-600">
                  <Phone className="size-4" aria-hidden="true" />
                  Call {site.phone}
                </a>
                <EmergencyOfficeHours />
              </div>
            ) : (
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
            )}
          </div>

          <div className="rounded-3xl border border-line bg-cream p-7 sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-ocean-50 text-ocean-600">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-serif text-2xl font-medium text-ink">
              What to expect from this visit
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
      <CareGuide slug={service.slug} />
      <RelatedCare excludeSlug={service.slug} />
      <BookStrip />
    </>
  );
}

function SedationServicePage({ service }: { service: Service }) {
  return (
    <>
      <ServiceJsonLd service={service} />
      <section className="relative isolate flex flex-col overflow-hidden bg-deep text-cream lg:block">
        <div className="wrap relative z-10 py-10 sm:py-14 lg:py-28">
          <ServiceBreadcrumbs service={service} tone="dark" />
          <Eyebrow className="text-gold-soft">{service.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-2xl text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-cream sm:text-6xl">
            IV sedation dentistry in Roseville
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-cream/75">
            {service.description}
          </p>
          <div className="mt-10 flex max-w-2xl flex-wrap gap-3">
            <a href={sedationConsultHref} className="btn btn-sunset">Request Appointment</a>
            <SedationContactActions dark />
          </div>
          <p className="mt-3 text-sm text-cream/80">Prefer to talk it through first? Our Roseville team arranges IV sedation consultations by phone or text.</p>
          <a href="#sedation-cost" className="mt-5 inline-block text-cream underline underline-offset-4">
            See what shapes your sedation estimate
          </a>
        </div>
        <div
          className="relative aspect-[4/1] w-full [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_80%,transparent)] sm:aspect-[5/1] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[60%] lg:[mask-image:linear-gradient(to_right,transparent,black_45%)]"
        >
          <AmbientVideo
            artwork={artwork.tideNight}
            sizes="(max-width: 1024px) 100vw, 60vw"
            tone="dark"
            controlClassName="right-4 bottom-4 lg:bottom-6 lg:right-6"
          />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div id="sedation-cost" className="scroll-mt-28">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-ink">
              How much does IV sedation cost in Roseville?
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-muted">
              Every sedation estimate reflects two parts: the dental care you
              need and the sedation planned for those visits. During your
              consultation, we break out the sedation fee and dental treatment
              fees separately, along with any imaging or follow-up visits, and
              check what your insurance covers so you know your expected cost
              upfront.
            </p>
            <Link href="/roseville-dental-implants/" className="mt-4 inline-block font-semibold text-ocean-700 underline underline-offset-4">
              Considering dental implants? Review the stages and estimate.
            </Link>
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
      <CareGuide slug={service.slug} />
      <RelatedCare excludeSlug={service.slug} />
      <section className="border-t border-line bg-cream">
        <div className="wrap py-12">
          <h2 className="font-serif text-3xl text-ink">Ready to talk through IV sedation?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={sedationConsultHref} className="btn btn-sunset">Request Appointment</a>
            <SedationContactActions />
          </div>
          <Link href={scheduleHref} className="mt-5 inline-block underline underline-offset-4">Book a routine dental visit online</Link>
        </div>
      </section>
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
      <ServiceJsonLd service={service} />
      <section className="bg-background">
        <div className="wrap py-16 sm:py-20">
          <ServiceBreadcrumbs service={service} />
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
              {service.slug === "roseville-dental-implants" ? "Request an implant consultation" : "Request Appointment"}
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
            How your care unfolds
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
      <CareGuide slug={service.slug} />
      <RelatedCare excludeSlug={service.slug} />
      <BookStrip />
    </>
  );
}

export function ServicePage({ service }: { service: Service }) {
  if (service.slug === "iv-sedation") {
    return <SedationServicePage service={service} />;
  }
  if (service.slug === "roseville-dental-implants") {
    return <ProcessServicePage service={service} steps={implantProcess} />;
  }
  if (service.slug === "dental-crowns") {
    return <ProcessServicePage service={service} steps={crownProcess} />;
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
            eyebrow="Dental care in Roseville"
            title="Thoughtful care for every stage of your smile."
            body="From monitored IV sedation and dental implants to routine cleanings, lab-made crowns, veneers, and orthodontics, every service here moves at a calm, unhurried pace."
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

export function OrthodonticsPage() {
  const items = [
    findService("roseville-invisalign"),
    findService("traditional-braces"),
  ].filter((service): service is Service => Boolean(service));
  const url = absoluteUrl("/orthodontics/");
  const jsonLd = [
    dentistJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceNodeId("orthodontics"),
      name: "Orthodontics and Invisalign",
      serviceType: "Orthodontics",
      description:
        "Invisalign clear aligners and traditional braces planned around alignment, bite, and daily life in Roseville, CA.",
      url,
      areaServed: "Roseville, CA",
      provider: { "@id": dentistId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Dental services", item: absoluteUrl("/roseville-dental-care/") },
        { "@type": "ListItem", position: 3, name: "Orthodontics", item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqJsonLd path="/orthodontics/" questions={orthodonticsQuestions} />
      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/roseville-dental-care/">Dental services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">Orthodontics</li>
            </ol>
          </nav>
          <PageHeader
            eyebrow="Orthodontics in Roseville"
            title="Straighter teeth, planned around your life."
            body="Compare clear, removable Invisalign aligners with the precise control of traditional braces. We help you choose the path that matches your bite, goals, and daily routine."
          />
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="wrap">
          <SectionHeader
            eyebrow="Two proven options"
            title="Invisalign or traditional braces?"
            body="Every orthodontic plan starts with an honest exam so you know which option moves your teeth best and fits smoothly into your day."
          />
          <div className="mt-10">
            <ServicesGrid items={items} />
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-3">
          {orthodonticsQuestions.map(({ question, answer }) => (
            <article key={question} className="card p-7">
              <h2 className="font-serif text-2xl font-medium text-ink">{question}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-muted">{answer}</p>
            </article>
          ))}
        </div>
      </section>
      <BookStrip />
    </>
  );
}

export function DoctorPage() {
  const profileUrl = absoluteUrl(doctorProfilePath);
  const personId = doctorPersonId;
  return (
    <>
      <JsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ProfilePage", "@id": profileUrl + "#webpage", url: profileUrl, name: doctor.name, mainEntity: { "@id": personId } },
          { "@type": "Person", "@id": personId, name: "Michael Narodovich", honorificPrefix: "Dr.", honorificSuffix: "DMD", jobTitle: "Dentist",
            url: profileUrl, image: absoluteUrl("/media/dr-narodovich-hd.jpg"), worksFor: { "@id": dentistId },
            knowsAbout: ["Sedation dentistry", "IV sedation", "Dental anxiety", "Dental implants", "Dental crowns", "Restorative dentistry"],
            alumniOf: [{ "@type": "CollegeOrUniversity", name: "The Ohio State University" }, { "@type": "CollegeOrUniversity", name: "Temple University" }],
            sameAs: ["https://sacramentodentalmedicine.com/meet-dr-narodovich#person"],
            hasCredential: doctor.licenseRecords.map((record) => ({ "@type": "EducationalOccupationalCredential", name: record.name, credentialCategory: record.category, identifier: record.identifier, url: record.url, recognizedBy: { "@type": "Organization", name: "Dental Board of California", url: "https://www.dbc.ca.gov/" } })) },
        ],
      }).replace(/</g, "\\u003c") }} />
      <section className="bg-background py-16 sm:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>{doctor.name}</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              A Roseville dentist who takes time to listen.
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
            <section aria-label="Verified licensing records" className="mt-8 border-t border-line pt-6">
              <h2 className="font-serif text-2xl font-medium text-ink">Active California licenses you can verify.</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-ocean-700">
                {doctor.licenseRecords.map((record) => <li key={record.identifier}><a className="underline underline-offset-4" href={record.url}>{record.name}</a></li>)}
              </ul>
              <p className="mt-3 text-sm leading-7 text-ink-muted">These Dental Board of California records showed current-active status when we checked them on {doctor.licenseRecordsChecked}. Follow any link above to view the live state record. During your consultation, we confirm who will administer and monitor your care.</p>
            </section>
            <p className="mt-6 text-sm leading-7 text-ink-muted">
              Exploring care options? Read about <Link className="underline" href="/iv-sedation/">IV sedation</Link>,
              {" "}<Link className="underline" href="/roseville-dental-implants/">dental implants</Link>, and
              {" "}<Link className="underline" href="/waikiki-dental-roseville/">the Roseville office</Link>.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[275px] lg:mx-0 lg:mt-12 lg:self-start lg:justify-self-end">
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
          <figure className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-surface-alt shadow-soft">
              <Image
                src={teamStory.groupImage}
                alt={teamStory.groupImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[50%_42%]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-soft">
              Dr. Mike and our Roseville team in front of the office&rsquo;s
              hand-painted hibiscus mural.
            </figcaption>
          </figure>
          <div>
            <Eyebrow>How we practice</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Clear answers before any treatment begins.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-8 text-ink-muted">
              Before picking up an instrument, Dr. Narodovich sits down to hear
              what brought you in and what has made past dental visits hard. He
              shows you what he sees, lays out your options in plain language,
              and gives you space to decide without pressure.
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
      "Clinical rigor",
      "From preventive exams to dental implants and lab-made crowns, we plan every detail carefully and recommend only the care your teeth genuinely need.",
    ],
    [
      "Prevention that lasts",
      "Thorough cleanings, oral cancer screenings, targeted digital X-rays, sealants, fluoride, and practical home-care coaching help keep natural teeth healthy for the long haul.",
    ],
    [
      "Strict safety standards",
      "Consistent sterilization and infection-control protocols protect every patient and every team member across every appointment.",
    ],
    [
      "Unhurried hospitality",
      "We leave room for questions, respect your comfort level, and focus on earning your trust one straightforward visit at a time.",
    ],
  ];

  return (
    <>
      <JsonLd />
      <section className="bg-surface-alt py-16 sm:py-20">
        <div className="wrap">
          <PageHeader
            eyebrow="Our Roseville office"
            title="Careful dentistry with a genuinely calmer touch."
            body="Our Roseville office brings together restorative, implant, cosmetic, and family dentistry with strict safety standards and a welcoming neighborhood pace."
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
      "Insurance & Medi-Cal",
      `${mediCalNotice} If you carry another dental plan, reach out before your visit and our front desk will check your coverage.`,
    ],
    [
      "Straightforward payment",
      "We accept cash, checks, debit, and major credit cards, with payment due at the time of treatment.",
    ],
    [
      "CareCredit financing",
      "Spread out-of-pocket costs into manageable monthly payments with CareCredit so important care fits comfortably in your budget.",
    ],
    [
      "Paperless intake forms",
      "We send your secure registration paperwork by email or text before your appointment, so you can fill it out at home in a few minutes.",
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
              title="Practical details, settled before you arrive."
              body="Insurance questions, payment options, CareCredit financing, and digital forms are easy to sort out ahead of time so your first visit stays focused on you."
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
      <section className="bg-background py-16 sm:py-20" aria-labelledby="new-patient-questions">
        <FaqJsonLd path="/new-patients/" questions={newPatientQuestions} />
        <div className="wrap max-w-4xl">
          <h2 id="new-patient-questions" className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            Common new-patient questions.
          </h2>
          <div className="mt-6">
            <FaqList questions={newPatientQuestions} />
            <Link href="/iv-sedation/#sedation-cost" className="mt-4 inline-flex font-semibold text-ocean-700 underline">
              See what shapes an IV sedation estimate
            </Link>
          </div>
        </div>
      </section>
      <BookStrip />
    </>
  );
}

export function TestimonialsPage() {
  const featuredTopics = reviewTopics.slice(0, 4);
  const rating = reviewStats.rating.toFixed(1);
  const fourOrFiveStarShare = Math.round(
    (reviewStats.fourOrFiveStarCount / reviewStats.count) * 100,
  );
  const supportingTopics = reviewTopics.slice(4);
  const corpusStats = [
    {
      value: reviewStats.count,
      label: "Public Google reviews",
      detail: "Our full public Google listing",
    },
    {
      value: reviewStats.writtenReviewCount,
      label: "Written patient stories",
      detail: "Every written review read and tallied",
    },
    {
      value: reviewStats.ratingOnlyCount,
      label: "Star-only ratings",
      detail: "Included in our overall breakdown",
    },
    {
      value: reviewStats.fourOrFiveStarCount,
      label: "Four- and five-star ratings",
      detail: `${fourOrFiveStarShare}% of all public reviews`,
    },
  ];

  return (
    <>
      <JsonLd />
      <section className="overflow-hidden bg-deep text-cream">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <Eyebrow className="text-gold-soft">Patient reviews</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-balance font-serif text-[2.7rem] font-medium leading-[1.04] tracking-tight text-cream sm:text-6xl">
              {reviewStats.count} Google reviews, verified {reviewStats.verifiedOn}.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-cream/75">
              We read every public rating and all {reviewStats.writtenReviewCount} written patient reviews on Google,
              then gathered the themes people bring up most often.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={reviewStats.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light"
              >
                Read live Google reviews
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
                    {rating}
                  </span>
                  <div className="pb-1.5">
                    <div className="flex gap-1 text-gold-soft" aria-label={`${rating} out of 5 stars`}>
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
              Verified on {reviewStats.verifiedOn}. Live Google ratings and review counts update over time.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream py-14 sm:py-16">
        <div className="wrap">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Every review counted</p>
              <h2 className="mt-4 text-balance font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                The complete picture, nothing hidden.
              </h2>
            </div>
            <p className="max-w-xl text-pretty leading-7 text-ink-muted">
              Rather than hand-picking only a few quotes, the numbers below
              reflect our complete public Google review listing as of{" "}
              {reviewStats.verifiedOn}. You can also open Google Maps anytime to
              read every original review yourself.
            </p>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {corpusStats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-line bg-background p-5 sm:p-6">
                <p className="font-serif text-4xl font-medium leading-none text-ocean-700">
                  {stat.value}
                </p>
                <h3 className="mt-3 font-semibold text-ink">{stat.label}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-muted">{stat.detail}</p>
              </article>
            ))}
          </div>

          <a
            href={reviewStats.href}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-ocean-700 underline decoration-ocean-200 underline-offset-4 transition hover:text-ocean-900"
          >
            Read every review on Google Maps
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="wrap">
          <SectionHeader
            eyebrow="What patients talk about most"
            title="Warmth and comfort come up more than anything else."
            body="Across hundreds of Google reviews, patients keep pointing to the same things: a welcoming, attentive team, clear communication from Dr. Mike, and a calmer visit than they expected."
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
                <h3 className="mt-4 font-serif text-xl font-medium">{topic.label}</h3>
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
              title="Read the stories closest to what you are looking for."
              body="Filter verified Google review excerpts by comfort, sedation, Dr. Mike, or our Roseville team."
            />
            <div className="rounded-2xl border border-line bg-cream p-5 text-sm leading-6 text-ink-muted lg:justify-self-end lg:max-w-md">
              Excerpts are shortened only for readability and credited with reviewer initials.
              All ratings, counts, and topic totals reflect Google&apos;s public listing on{" "}
              {reviewStats.verifiedOn}.
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
              Read all reviews on Google
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

export function NotFoundMarketing() {
  return (
    <section className="bg-background py-28">
      <div className="wrap relative max-w-2xl text-center">
        <SeasonalNotFoundArt />
        <Eyebrow className="justify-center">404 · Page not found</Eyebrow>
        <h1 className="mt-4 text-balance font-serif text-5xl font-medium tracking-tight text-ink">
          This page isn&rsquo;t here, but we are.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-muted">
          The link you followed may have moved or expired. Head back to our
          homepage or explore our Roseville dental services below.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-dark">
            Return Home
          </Link>
          <Link href="/roseville-dental-care/" className="btn btn-outline">
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  );
}
