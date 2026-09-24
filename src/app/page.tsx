import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Phone, Star } from "lucide-react";
import { AmbientVideo } from "@/components/ambient-video";
import {
  DoctorSpotlight,
  FlagshipServices,
  HomeReviewProof,
  TeamWelcome,
  VisitPanel,
} from "@/components/sections";
import { JsonLd } from "@/components/page-templates";
import { WaveUnderline } from "@/components/waves";
import {
  artwork,
  brandAssets,
  doctor,
  doctorAvatar,
  heroFacts,
  reviewStats,
  scheduleHref,
  site,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd />

      <section className="relative overflow-hidden bg-background">
        <div className="wrap-wide relative grid items-center gap-12 pb-20 pt-14 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <span className="inline-flex max-w-full flex-nowrap items-center gap-2.5 font-sans text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.12em] text-ocean-600 sm:text-[11px] sm:tracking-[0.24em]">
              <Image
                src={brandAssets.icon}
                alt=""
                width={75}
                height={73}
                aria-hidden="true"
                sizes="24px"
                className="h-auto w-6 shrink-0"
              />
              <span className="min-w-0">
                Roseville · IV sedation &amp; restorative care
              </span>
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
              care off — monitored IV sedation and dental implants, delivered
              without rush or judgment.
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

          <div className="relative mx-auto w-full max-w-[640px] pb-10 sm:pb-8 lg:max-w-none lg:pb-0">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-deep shadow-soft-lg sm:aspect-[4/3] lg:aspect-square">
              <AmbientVideo
                artwork={artwork.tide}
                sizes="(max-width: 1024px) 100vw, 46vw"
                preload
                controlClassName="right-4 top-4"
              />
            </div>

            <Link
              href="/michael-narodovich-dmd/"
              className="group absolute inset-x-4 bottom-0 flex items-center gap-4 rounded-2xl border border-line bg-cream/95 p-3 pr-4 shadow-soft-lg backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:inset-x-auto sm:left-6 sm:w-[24.5rem] lg:-bottom-8 lg:-left-8"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-ocean-50">
                <Image
                  src={doctorAvatar}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-base leading-6 text-ink sm:truncate sm:text-lg">
                  {doctor.name}
                </span>
                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ocean-600">
                  Your dentist · Roseville
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-muted">
                  <Star className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-ink">{reviewStats.rating}</strong>{" "}
                    on {reviewStats.source} · {reviewStats.count} reviews
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ocean-600"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      <HomeReviewProof />
      <TeamWelcome />
      <FlagshipServices />
      <DoctorSpotlight />
      <VisitPanel showForm={false} />
    </>
  );
}
