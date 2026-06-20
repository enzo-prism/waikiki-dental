import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import {
  AggregateRating,
  CareApproach,
  DoctorSpotlight,
  FinalCta,
  NewPatientOffer,
  Reviews,
  SectionHeader,
  ServicesGrid,
  TrustBar,
  VisitPanel,
} from "@/components/sections";
import { JsonLd } from "@/components/page-templates";
import { heroImage, scheduleHref, site } from "@/lib/site";

const heroStats: Array<{ label: string; value: string }> = [
  { label: "Care for", value: "All ages" },
  { label: "CEREC", value: "Same-day crowns" },
  { label: "Sedation", value: "Anxiety-friendly" },
];

export default function Home() {
  return (
    <>
      <JsonLd />

      {/* Hero — editorial split */}
      <section className="relative overflow-hidden bg-background">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-32 size-[42rem] rounded-full bg-sage-100/55 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 size-[32rem] rounded-full bg-clay-100/40 blur-3xl" />
        </div>

        <div className="wrap-wide relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-clay-500" />
              Roseville · Family &amp; Cosmetic Dentistry
            </span>
            <h1 className="mt-6 text-balance font-serif text-5xl font-medium leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              A calmer, more beautiful way to{" "}
              <span className="italic text-sage-700">care for your smile.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-muted">
              Dr. Michael Narodovich and our team provide gentle, personalized
              care — from preventive visits and cleanings to cosmetic dentistry,
              implants, same-day crowns, Invisalign, and sedation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={site.bookingHref} className="btn btn-clay">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <a href={site.phoneHref} className="btn btn-outline">
                <Phone className="size-4" aria-hidden="true" />
                Call or Text {site.phone}
              </a>
            </div>

            <p className="mt-4 text-sm text-ink-muted">
              Prefer to pick a time?{" "}
              <Link
                href={scheduleHref}
                className="inline-flex items-center gap-1 font-semibold text-sage-700 underline-offset-4 transition hover:text-sage-800 hover:underline"
              >
                Request an appointment
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </p>

            <AggregateRating className="mt-8" />

            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-600">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-soft-lg">
              <Image
                src={heroImage}
                alt="Bright, modern dental treatment room at Waikiki Dental in Roseville"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="img-warm object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-night/35 via-transparent to-clay-700/10" />
            </div>

            <span className="absolute -right-3 -top-4 hidden rounded-full border border-line bg-sage-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream shadow-soft sm:inline-flex">
              Accepting new patients
            </span>

            <figure className="absolute -bottom-6 -left-4 hidden w-64 rounded-2xl border border-line bg-cream/95 p-5 shadow-soft-lg backdrop-blur sm:block">
              <AggregateRating />
              <figcaption className="mt-3 font-serif text-base leading-snug text-ink">
                Trusted by Roseville families
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services */}
      <section className="reveal bg-background py-20 sm:py-24">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="Dental care options"
              title="Everything from routine cleanings to confident smile transformations."
              body="The most important patient pathways — made easy to scan and act on."
            />
            <div className="flex lg:justify-end">
              <Link href="/roseville-dental-care/" className="btn btn-outline">
                View All Services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <NewPatientOffer />
      <CareApproach />
      <DoctorSpotlight />
      <Reviews />
      <VisitPanel />
      <FinalCta />
    </>
  );
}
