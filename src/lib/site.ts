import {
  BadgeCheck,
  CalendarCheck,
  HeartPulse,
  MapPin,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  WandSparkles,
} from "lucide-react";
import type { ComponentType } from "react";

export const site = {
  name: "Waikiki Dental",
  doctor: "Michael Narodovich, DMD",
  phone: "(916) 772-6248",
  phoneHref: "tel:+19167726248",
  email: "office@waikikidental.com",
  emailHref: "mailto:office@waikikidental.com",
  address: "1271 Pleasant Grove Blvd. Suite #100, Roseville, CA 95747",
  shortAddress: "1271 Pleasant Grove Blvd., Roseville, CA",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=1271%20Pleasant%20Grove%20Blvd%20Suite%20100%20Roseville%20CA%2095747",
  bookingHref:
    "https://bookit.dentrixascend.com/v1/view/organization/3061/index.html?mode=externalLink",
  baseUrl: "https://waikiki-dental.vercel.app",
  description:
    "Modern family, cosmetic, implant, and sedation dentistry in Roseville, CA with Dr. Michael Narodovich and the Waikiki Dental team.",
};

export const hours = [
  ["Monday", "9:00 AM - 5:00 PM"],
  ["Tuesday", "9:00 AM - 6:00 PM"],
  ["Wednesday", "8:00 AM - 5:00 PM"],
  ["Thursday", "9:00 AM - 6:00 PM"],
  ["Friday", "8:00 AM - 4:00 PM"],
  ["Saturday", "Closed"],
  ["Sunday", "Closed"],
];

export type Service = {
  title: string;
  slug: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  icon: ComponentType<{ className?: string }>;
  image?: string;
};

export const services: Service[] = [
  {
    title: "Cleanings & Exams",
    slug: "cleanings-exams",
    eyebrow: "Preventive care",
    summary:
      "Thorough dental exams, cleanings, x-rays, and oral health guidance for lasting wellness.",
    description:
      "Waikiki Dental is proud to provide dental examinations and cleanings in Roseville with a prevention-first approach. Routine care helps preserve natural teeth, monitor gum health, screen for oral cancer, and catch problems early.",
    highlights: [
      "Comprehensive dental exams",
      "Diagnostic x-rays when needed",
      "Oral cancer and gum health screenings",
      "Cleanings designed around your smile",
    ],
    icon: Stethoscope,
  },
  {
    title: "Composite Fillings",
    slug: "composite-fillings",
    eyebrow: "Natural restorations",
    summary:
      "Tooth-colored fillings that repair decay while blending naturally with your smile.",
    description:
      "Composite fillings restore strength and appearance after tooth decay or small fractures. The material is shaded to your tooth color for a clean, natural-looking result.",
    highlights: [
      "Tooth-colored repair",
      "Conservative treatment planning",
      "Comfort-focused visits",
      "Long-term oral health support",
    ],
    icon: SmilePlus,
  },
  {
    title: "Digital X-Ray",
    slug: "digital-x-ray",
    eyebrow: "Advanced diagnostics",
    summary:
      "Modern imaging helps the team evaluate teeth, roots, bone, and restorations clearly.",
    description:
      "Digital x-rays support accurate diagnosis by helping identify decay, bone loss, root position, cysts, and other concerns that may not be visible during a visual exam.",
    highlights: [
      "Clear diagnostic images",
      "Helps catch hidden concerns",
      "Supports precise treatment planning",
      "Part of comprehensive care",
    ],
    icon: BadgeCheck,
  },
  {
    title: "Early Dental Care",
    slug: "early-dental-care",
    eyebrow: "Family dentistry",
    summary:
      "Gentle early visits help children build comfort, confidence, and healthy habits.",
    description:
      "Early dental care gives families a foundation for prevention, education, and confidence. Waikiki Dental supports patients with gentle guidance and age-appropriate care.",
    highlights: [
      "Friendly first visits",
      "Prevention and education",
      "Family-centered communication",
      "Healthy habits from the start",
    ],
    icon: HeartPulse,
  },
  {
    title: "Smile Makeover",
    slug: "smile-makeover",
    eyebrow: "Cosmetic planning",
    summary:
      "A custom blend of cosmetic options designed to refresh your smile and confidence.",
    description:
      "A smile makeover can combine whitening, bonding, veneers, crowns, orthodontic care, or implant dentistry into one personalized plan based on your goals.",
    highlights: [
      "Personalized cosmetic roadmap",
      "Options for color, shape, and alignment",
      "Designed around your goals",
      "Confidence-focused outcomes",
    ],
    icon: Sparkles,
  },
  {
    title: "Dental Bonding",
    slug: "dental-bonding",
    eyebrow: "Cosmetic dentistry",
    summary:
      "A conservative way to refine chips, small gaps, discoloration, and uneven edges.",
    description:
      "Dental bonding uses tooth-colored material to make targeted cosmetic improvements, often with a conservative and efficient visit.",
    highlights: [
      "Repairs small chips",
      "Improves uneven edges",
      "Tooth-colored finish",
      "Conservative cosmetic option",
    ],
    icon: WandSparkles,
  },
  {
    title: "Same Day Crowns",
    slug: "roseville-cerec-same-day-crowns",
    eyebrow: "CEREC technology",
    summary:
      "CEREC same-day crowns use digital scanning and in-office milling for efficient restorations.",
    description:
      "With CEREC, Dr. Narodovich uses CAD/CAM tools and an in-house milling machine to plan, prepare, and place a strong porcelain crown in a single visit to the Roseville office.",
    highlights: [
      "Digital scanning instead of goopy impressions",
      "Porcelain crowns made in office",
      "Useful for broken, weak, or worn teeth",
      "Designed for strength and aesthetics",
    ],
    icon: CalendarCheck,
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    eyebrow: "Brighter smile",
    summary:
      "Professional whitening options designed to lift stains and refresh your smile.",
    description:
      "Professional teeth whitening can brighten years of discoloration and help you feel more confident in everyday photos, work, and social moments.",
    highlights: [
      "Professional guidance",
      "Stain and discoloration support",
      "Cosmetic boost with simple planning",
      "Pairs well with smile makeovers",
    ],
    icon: Sparkles,
  },
  {
    title: "Veneers",
    slug: "veneers",
    eyebrow: "Porcelain cosmetics",
    summary:
      "Natural-looking veneers can refine chipped, stained, worn, or uneven teeth.",
    description:
      "Porcelain veneers are designed to enhance the visible shape, color, and balance of your smile while keeping results polished and natural-looking.",
    highlights: [
      "Improves smile shape and color",
      "Natural-looking porcelain finish",
      "Useful for chips and uneven teeth",
      "Personalized cosmetic design",
    ],
    icon: WandSparkles,
  },
  {
    title: "Invisalign",
    slug: "roseville-invisalign",
    eyebrow: "Clear aligners",
    summary:
      "Straighten teeth discreetly with removable clear aligners customized for your smile.",
    description:
      "Invisalign clear aligners apply carefully controlled forces to move teeth into a better position while remaining removable for meals, brushing, and flossing.",
    highlights: [
      "Clear, removable aligners",
      "Comfortable alternative to braces",
      "Supports easier brushing and flossing",
      "Customized digital treatment planning",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Traditional Braces",
    slug: "traditional-braces",
    eyebrow: "Orthodontics",
    summary:
      "Reliable orthodontic care for alignment, bite function, and confident smiles.",
    description:
      "Traditional braces remain a trusted option for many orthodontic needs, especially when careful control is needed to improve alignment and bite function.",
    highlights: [
      "Time-tested orthodontic option",
      "Supports complex alignment needs",
      "Improves bite function",
      "Personalized treatment planning",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Dental Implants",
    slug: "roseville-dental-implants",
    eyebrow: "Tooth replacement",
    summary:
      "Durable, natural-looking tooth replacement designed to restore comfort and function.",
    description:
      "Dental implants replace missing teeth with a titanium post, abutment, and custom crown. They can support a single tooth, multiple teeth, or more extensive restorations.",
    highlights: [
      "Permanent tooth replacement option",
      "Restores chewing confidence",
      "Designed to look and feel natural",
      "Helps protect jawbone health",
    ],
    icon: SmilePlus,
  },
  {
    title: "IV Sedation",
    slug: "iv-sedation",
    eyebrow: "Anxiety-friendly care",
    summary:
      "Sedation dentistry helps anxious patients receive care in a calm, comfortable setting.",
    description:
      "Dr. Narodovich has focused training in sedation dentistry for patients who feel fearful, have sensitive gag reflexes, or need longer treatment completed with more comfort.",
    highlights: [
      "Helpful for dental anxiety",
      "Deep relaxation while monitored",
      "Can support longer treatment visits",
      "Designed around patient comfort",
    ],
    icon: Syringe,
  },
  {
    title: "Dental Emergencies",
    slug: "dental-emergencies",
    eyebrow: "Urgent dental care",
    summary:
      "Prompt support for dental pain, broken teeth, injuries, and urgent concerns.",
    description:
      "When a dental emergency occurs, Waikiki Dental makes every effort to see and care for patients as quickly as possible.",
    highlights: [
      "Tooth pain and swelling",
      "Broken or fractured teeth",
      "Lost or damaged restorations",
      "Call the office for urgent guidance",
    ],
    icon: HeartPulse,
  },
];

export const featuredServices = services.filter((service) =>
  [
    "cleanings-exams",
    "roseville-cerec-same-day-crowns",
    "roseville-invisalign",
    "roseville-dental-implants",
    "iv-sedation",
    "dental-emergencies",
  ].includes(service.slug),
);

export const serviceAliases: Record<string, string> = {
  "roseville-family-dentist": "cleanings-exams",
  "family-dentistry": "cleanings-exams",
  "cosmetic-dentistry": "smile-makeover",
  orthodontics: "roseville-invisalign",
};

export const testimonials = [
  {
    quote:
      "Always a great experience at Waikiki Dental. Professional and very friendly staff and doctor.",
    name: "Robert M.",
  },
  {
    quote:
      "We love Waikiki Dental. The culture is warm and welcoming, and the doctor and staff are gentle and friendly. Highly recommend!",
    name: "Rosanne P.",
  },
  {
    quote:
      "I've been looking for a dentist for awhile because I'm terrified of going. I was referred to Waikiki Dental by a friend and couldn't be happier.",
    name: "Lindsay F.",
  },
];

export const navItems = [
  { label: "Services", href: "/roseville-dental-care/" },
  { label: "Dr. Narodovich", href: "/michael-narodovich-dmd/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Reviews", href: "/patient-testimonials/" },
  { label: "Contact", href: "/contact-waikiki-dental/" },
];

export const trustPoints = [
  "Accepting new patients",
  "Family, cosmetic, implant, and sedation dentistry",
  "CEREC same-day crowns",
  "Anxiety-friendly care",
];

export const pageRoutes = [
  "",
  "michael-narodovich-dmd",
  "roseville-dental-care",
  "waikiki-dental-roseville",
  "new-patients",
  "patient-testimonials",
  "contact-waikiki-dental",
  ...services.map((service) => service.slug),
  ...Object.keys(serviceAliases),
];

export const heroImage =
  "https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?auto=format&fit=crop&w=1800&q=88";

export const careImage =
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=86";

export const consultImage =
  "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1400&q=86";

export const dentistJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: `${site.name} - Roseville`,
  url: site.baseUrl,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1271 Pleasant Grove Blvd. Suite #100",
    addressLocality: "Roseville",
    addressRegion: "CA",
    postalCode: "95747",
    addressCountry: "US",
  },
  medicalSpecialty: [
    "Family Dentistry",
    "Cosmetic Dentistry",
    "Orthodontics",
    "Dental Implants",
    "Sedation Dentistry",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  areaServed: ["Roseville", "Granite Bay", "Rocklin", "Lincoln"],
};

export function findService(slug: string) {
  const normalized = serviceAliases[slug] ?? slug;
  return services.find((service) => service.slug === normalized);
}

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${normalized}`;
}

export { MapPin };
