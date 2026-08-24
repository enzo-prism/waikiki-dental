import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactPage,
  DoctorPage,
  NewPatientsPage,
  OfficePage,
  ServicePage,
  ServicesHubPage,
  TestimonialsPage,
} from "@/components/page-templates";
import { absoluteUrl, findService, pageRoutes, site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const staticPages: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "michael-narodovich-dmd": {
    title: "Michael Narodovich, DMD",
    description:
      "Meet Dr. Michael Narodovich, DMD — a Roseville dentist who leads with listening, with focused training in sedation dentistry for anxious patients.",
  },
  "roseville-dental-care": {
    title: "Roseville Dental Care",
    description:
      "Explore Waikiki Dental's full menu of Roseville dental care: cleanings, cosmetic dentistry, Invisalign, implants, CEREC same-day crowns, and IV sedation.",
  },
  "waikiki-dental-roseville": {
    title: "Waikiki Dental Roseville Office",
    description:
      "Get to know Waikiki Dental's Roseville office — high standards, prevention-first care, uncompromising safety, and a genuinely relaxed patient experience.",
  },
  "new-patients": {
    title: "New Patients",
    description:
      "New to Waikiki Dental? Insurance, payment options, CareCredit financing, and online forms — everything sorted before your first Roseville visit.",
  },
  "patient-testimonials": {
    title: "Patient Testimonials",
    description:
      "What Roseville patients say about Waikiki Dental: a friendly, gentle, professional team that's unusually good with dental anxiety.",
  },
  "contact-waikiki-dental": {
    title: "Contact Waikiki Dental",
    description:
      "Contact Waikiki Dental in Roseville, CA — request an appointment online, call or text (916) 772-6248, send a message, or stop by 1271 Pleasant Grove Blvd.",
  },
};

// Routes that have their own dedicated folder (e.g. /request-appointment/)
// must be excluded here so the catch-all doesn't claim the same path.
const reservedRoutes = new Set(["request-appointment"]);

export function generateStaticParams() {
  return pageRoutes
    .filter((slug) => slug && !reservedRoutes.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages[slug];
  const service = findService(slug);

  const title = page?.title ?? service?.title ?? "Waikiki Dental";
  const description = page?.description ?? service?.summary ?? site.description;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${slug}/`),
    },
    openGraph: {
      title: `${title} | Waikiki Dental`,
      description,
      url: absoluteUrl(`/${slug}/`),
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "michael-narodovich-dmd") return <DoctorPage />;
  if (slug === "roseville-dental-care") return <ServicesHubPage />;
  if (slug === "waikiki-dental-roseville") return <OfficePage />;
  if (slug === "new-patients") return <NewPatientsPage />;
  if (slug === "patient-testimonials") return <TestimonialsPage />;
  if (slug === "contact-waikiki-dental") return <ContactPage />;

  const service = findService(slug);
  if (service) return <ServicePage service={service} />;

  notFound();
}
