import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, Phone } from "lucide-react";
import {
  consultImage,
  dentistJsonLd,
  featuredServices,
  findService,
  services,
  site,
  testimonials,
  type Service,
} from "@/lib/site";
import {
  Eyebrow,
  FinalCta,
  Reviews,
  SectionHeader,
  ServicesGrid,
  VisitPanel,
} from "./sections";
import { ContactForm } from "./contact-form";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistJsonLd) }}
    />
  );
}

export function ServicePage({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <>
      <JsonLd />
      <section className="bg-mist-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-normal text-slate-950 sm:text-5xl">
              {service.title} in Roseville, CA
            </h1>
            <p className="mt-5 text-pretty text-lg leading-8 text-slate-600">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-coral-500 px-5 text-sm font-black text-white transition hover:bg-coral-600"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-950 transition hover:border-teal-600"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
            <span className="grid size-14 place-items-center rounded-lg bg-teal-700 text-white">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-2xl font-black text-slate-950">
              What this visit can support
            </h2>
            <ul className="mt-5 grid gap-3">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-slate-700">
                  <BadgeCheck
                    className="mt-0.5 size-5 shrink-0 text-teal-700"
                    aria-hidden="true"
                  />
                  <span className="leading-7">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
  return (
    <>
      <JsonLd />
      <section className="bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Roseville dental care"
            title="A complete menu of modern family and cosmetic dentistry."
            body="From preventive cleanings to implants, orthodontics, smile makeovers, CEREC same-day crowns, and IV sedation, Waikiki Dental builds treatment around your needs."
            headingLevel="h1"
          />
          <div className="mt-10">
            <ServicesGrid items={services} />
          </div>
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
      <section className="bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <Eyebrow>Michael Narodovich, DMD</Eyebrow>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-normal text-slate-950 sm:text-5xl">
              A Roseville dentist focused on trust, comfort, and clear choices.
            </h1>
            <div className="mt-6 grid gap-4 text-lg leading-8 text-slate-600">
              <p>
                Dr. Mike was born and raised in Cleveland, Ohio, earned his
                Bachelor of Science from The Ohio State University, and received
                dental training from Temple University in Philadelphia.
              </p>
              <p>
                His passion for safe, comfortable treatment for even the most
                fearful patients led him to sedation dentistry, helping people
                get care with less stress and more confidence.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-coral-500 px-5 text-sm font-black text-white"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <Link
                href="/iv-sedation/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-950"
              >
                Sedation Dentistry
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/5">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg">
              <Image
                src={consultImage}
                alt="Dentist speaking with a patient in a modern office"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function OfficePage() {
  return (
    <>
      <JsonLd />
      <section className="bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Waikiki Dental Roseville"
            title="A conveniently located dental office with high standards of care."
            body="The Roseville practice is devoted to restoring and enhancing natural smiles with family dentistry, cosmetic dentistry, implant dentistry, and comfort-focused care."
            headingLevel="h1"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {[
              [
                "High standards",
                "Comprehensive treatment planning and restorative and cosmetic dentistry support the quality care patients deserve.",
              ],
              [
                "Education and prevention",
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
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <h2 className="text-xl font-black text-slate-950">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
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
  return (
    <>
      <JsonLd />
      <section className="bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Eyebrow>New patients</Eyebrow>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Everything you need before your first Waikiki Dental visit.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The team looks forward to meeting you and helping you prepare for
              your appointment with insurance, payment, financing, and patient
              form guidance.
            </p>
            <div className="mt-8">
              <a
                href={site.bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-coral-500 px-5 text-sm font-black text-white"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                Schedule a Visit
              </a>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              [
                "Insurance support",
                "Waikiki Dental accepts most dental insurance plans and can help patients understand benefits and estimated costs.",
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
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <h2 className="text-xl font-black text-slate-950">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </article>
            ))}
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
      <section className="bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Patient testimonials"
            title="Roseville patients describe a friendly, gentle, professional team."
            body="Waikiki Dental's current testimonials emphasize warmth, comfort, professionalism, and care for anxious patients."
            headingLevel="h1"
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
  return (
    <>
      <ServicePage service={service} />
    </>
  );
}

export function NotFoundMarketing() {
  return (
    <section className="bg-mist-50 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-4 text-4xl font-black tracking-normal text-slate-950">
          Let’s get you back to Waikiki Dental.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          The page you requested is not available on this preview site.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-black text-white"
          >
            Home
          </Link>
          <Link
            href="/roseville-dental-care/"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-950"
          >
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

export { testimonials };
