import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import {
  CareApproach,
  DoctorSpotlight,
  FinalCta,
  Reviews,
  SectionHeader,
  ServicesGrid,
  TrustBar,
  VisitPanel,
} from "@/components/sections";
import { JsonLd } from "@/components/page-templates";
import { heroImage, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd />
      <section className="relative isolate min-h-[calc(100svh-130px)] overflow-hidden bg-slate-950 text-white">
        <Image
          src={heroImage}
          alt="Bright, modern dental treatment room"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.92),rgba(15,23,42,0.62)_48%,rgba(15,23,42,0.12))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100svh-130px)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-teal-100">
              Roseville family & cosmetic dentistry
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black tracking-normal text-white sm:text-7xl">
              Reimagine your smile in a calmer dental setting.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-8 text-slate-100 sm:text-xl">
              Dr. Michael Narodovich and the Waikiki Dental team provide
              personalized, gentle care for preventive visits, cosmetic goals,
              implants, same-day crowns, Invisalign, and sedation dentistry.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.bookingHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-coral-500 px-5 text-sm font-black text-white shadow-lg shadow-coral-950/30 transition hover:bg-coral-600 focus:outline-none focus:ring-4 focus:ring-coral-100"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                Book Online
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/50 bg-white/90 px-5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/60"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call or Text {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="Dental care options"
              title="Everything from routine cleanings to confident smile transformations."
              body="The old site hid the service menu in nested navigation. This redesign makes the most important patient pathways easy to scan and act on."
            />
            <div className="flex lg:justify-end">
              <Link
                href="/roseville-dental-care/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-950 transition hover:border-teal-600"
              >
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

      <CareApproach />
      <DoctorSpotlight />
      <Reviews />
      <VisitPanel />
      <FinalCta />
    </>
  );
}
