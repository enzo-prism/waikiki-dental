import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import {
  DoctorSpotlight,
  FlagshipServices,
  HomeReviewProof,
  VisitPanel,
} from "@/components/sections";
import { JsonLd } from "@/components/page-templates";
import { Hibiscus } from "@/components/brand";
import { WaveUnderline } from "@/components/waves";
import { heroFacts, heroImage, heroImageAlt, scheduleHref, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd />

      <section className="relative overflow-hidden bg-background">
        <div className="wrap-wide relative grid items-center gap-12 pb-20 pt-14 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <span className="eyebrow">
              <Hibiscus size={16} className="shrink-0 text-sunset-600" />
              Roseville · IV sedation &amp; restorative care
            </span>
            <h1 className="mt-6 text-balance font-serif text-[2.7rem] font-medium leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
              Dentistry that feels like{" "}
              <span className="relative inline-block italic text-ocean-700">
                a deep breath.
                <WaveUnderline className="pointer-events-none absolute -bottom-1 left-0 h-2.5 w-full text-sunset-500 sm:-bottom-3 sm:h-3" />
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-ink-muted">
              Dr. Michael Narodovich built this practice for people who have put
              care off — monitored IV sedation, implants, and same-day crowns,
              delivered without rush or judgment.
            </p>
            <div className="mt-9 hidden flex-wrap items-center gap-3 lg:flex">
              <Link href={scheduleHref} className="btn btn-sunset">
                <CalendarCheck className="size-4" aria-hidden="true" />
                Request Appointment
              </Link>
              <a href={site.phoneHref} className="btn btn-outline" aria-label={`Call or text ${site.phone}`}>
                <Phone className="size-4" aria-hidden="true" />
                Call or text
              </a>
            </div>

            <ul className="mt-10 flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
              {heroFacts.map((fact) => (
                <li key={fact} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-sunset-500" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line shadow-soft">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <HomeReviewProof />
      <FlagshipServices />
      <DoctorSpotlight />
      <VisitPanel showForm={false} />
    </>
  );
}
