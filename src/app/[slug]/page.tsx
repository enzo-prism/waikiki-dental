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
    title: "Dr. Michael Narodovich, DMD in Roseville",
    description:
      "Meet Dr. Michael Narodovich, DMD, a Roseville sedation dentist with active California sedation permits and a calm, unhurried approach to dental care.",
  },
  "roseville-dental-care": {
    title: "Dental Services in Roseville, CA",
    description:
      "Explore dental care in Roseville, CA: monitored IV sedation, dental implants, two-visit lab crowns, Invisalign, porcelain veneers, and family exams.",
  },
  "waikiki-dental-roseville": {
    title: "Roseville Dental Office on Pleasant Grove",
    description:
      "Visit Waikiki Dental at 1271 Pleasant Grove Blvd in Roseville, CA for IV sedation, implants, and family care serving Granite Bay, Rocklin, and Lincoln.",
  },
  "new-patients": {
    title: "New Patients in Roseville: Plans & Forms",
    description:
      "Welcoming new dental patients in Roseville, CA. Check dental insurance, CareCredit financing, paperless forms, and weekday hours before your first visit.",
  },
  "patient-testimonials": {
    title: `Roseville Dentist Reviews (${reviewStats.rating.toFixed(1)} Stars)`,
    description: `See why Roseville patients rate Dr. Michael Narodovich ${reviewStats.rating.toFixed(1)} stars across ${reviewStats.count} verified Google reviews, or open Google Maps to read every review.`,
  },
  "contact-waikiki-dental": {
    title: "Contact Waikiki Dental in Roseville, CA",
    description: `Contact Waikiki Dental at 1271 Pleasant Grove Blvd in Roseville, CA. Call or text ${site.phone}, book online, or check Monday to Friday office hours.`,
  },
  orthodontics: {
    title: "Orthodontics & Invisalign in Roseville",
    description:
      "Compare Invisalign clear aligners and traditional braces in Roseville, CA. Get an honest bite evaluation, written estimate, and CareCredit options.",
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
