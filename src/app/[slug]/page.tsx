import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactPage,
  DoctorPage,
  NewPatientsPage,
  OfficePage,
  OrthodonticsPage,
  ServicePage,
  ServicesHubPage,
  TestimonialsPage,
} from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";
import {
  findService,
  pageRoutes,
  reviewStats,
  serviceSeo,
  site,
} from "@/lib/site";

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
    title: "Meet Dr. Michael Narodovich, DMD",
    description:
      "Meet Dr. Michael Narodovich, DMD, a Roseville dentist with active California sedation permits and a calm, unhurried approach to patient care.",
  },
  "roseville-dental-care": {
    title: "Dental Services in Roseville, CA",
    description:
      "Browse dental care at Waikiki Dental in Roseville: monitored IV sedation, dental implants, lab-made crowns, Invisalign, veneers, and preventive exams.",
  },
  "waikiki-dental-roseville": {
    title: "Our Roseville Dental Office",
    description:
      "Step inside Waikiki Dental in Roseville, CA. Clinical rigor, prevention-focused exams, strict safety standards, and calm neighborhood hospitality.",
  },
  "new-patients": {
    title: "New Dental Patients in Roseville, CA",
    description:
      "Preparing for your first visit to Waikiki Dental in Roseville? Review insurance questions, payment options, CareCredit financing, and paperless forms.",
  },
  "patient-testimonials": {
    title: "Patient Reviews in Roseville, CA",
    description: `See what Roseville patients say about Dr. Michael Narodovich and our team across ${reviewStats.count} verified Google reviews, or open Google Maps to read every review.`,
  },
  "contact-waikiki-dental": {
    title: "Contact Waikiki Dental in Roseville",
    description: `Reach Waikiki Dental in Roseville, CA. Book online, call or text ${site.phone}, send a general message, or visit us on ${site.addressParts.street}`,
  },
  orthodontics: {
    title: "Orthodontics & Invisalign in Roseville",
    description:
      "Compare Invisalign clear aligners and traditional braces at Waikiki Dental in Roseville, with an honest exam and a plan built around your bite.",
  },
};

// Routes that have their own dedicated folder (e.g. /request-appointment/)
// must be excluded here so the catch-all doesn't claim the same path.
const reservedRoutes = new Set(["request-appointment"]);

// Only the prerendered slugs exist; anything else 404s without rendering a
// self-canonical page. Legacy aliases are redirected in next.config.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return pageRoutes
    .filter((slug) => slug && !reservedRoutes.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages[slug];
  const service = findService(slug);
  const listing = serviceSeo[slug];

  const title =
    page?.title ??
    listing?.title ??
    (service ? `${service.title} in Roseville, CA` : "Roseville Dental Care");
  const description =
    page?.description ??
    listing?.description ??
    (service
      ? `${service.summary} Care is available at Waikiki Dental in Roseville, CA.`
      : site.description);

  return createPageMetadata({
    title,
    description,
    path: `/${slug}/`,
  });
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "michael-narodovich-dmd") return <DoctorPage />;
  if (slug === "roseville-dental-care") return <ServicesHubPage />;
  if (slug === "waikiki-dental-roseville") return <OfficePage />;
  if (slug === "new-patients") return <NewPatientsPage />;
  if (slug === "patient-testimonials") return <TestimonialsPage />;
  if (slug === "contact-waikiki-dental") return <ContactPage />;
  if (slug === "orthodontics") return <OrthodonticsPage />;

  const service = findService(slug);
  if (service) return <ServicePage service={service} />;

  notFound();
}
