import {
  BadgeCheck,
  Building2,
  CalendarClock,
  Ellipsis,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  WandSparkles,
} from "lucide-react";
import type { ComponentType } from "react";

const productionSiteUrl = "https://waikikidental.com";

export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return productionSiteUrl;
}

export const isPreviewDeploy = process.env.VERCEL_ENV === "preview";

/** Postal address parts; `site.address` and the Dentist JSON-LD derive from these. */
const addressParts = {
  street: "1271 Pleasant Grove Blvd.",
  suite: "Suite #100",
  locality: "Roseville",
  region: "CA",
  postalCode: "95747",
  country: "US",
};

export const site = {
  name: "Waikiki Dental",
  phone: "(916) 772-6248",
  phoneHref: "tel:+19167726248",
  smsHref: "sms:+19167726248",
  email: "office@waikikidental.com",
  emailHref: "mailto:office@waikikidental.com",
  address: `${addressParts.street} ${addressParts.suite}, ${addressParts.locality}, ${addressParts.region} ${addressParts.postalCode}`,
  addressParts,
  /** Office coordinates, matching the Google Maps listing in `reviewStats.href`. */
  geo: { latitude: 38.7717804, longitude: -121.3154872 },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Waikiki+Dental+Roseville+CA&query_place_id=ChIJmbGEGJUhm4AR7RCJgmMeb1U",
  baseUrl: resolveSiteUrl(),
  description:
    "Roseville dentist Dr. Michael Narodovich offers monitored IV sedation, dental implants, lab-made crowns, and calm restorative care in Roseville, CA.",
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

/* ------------------------------------------------------------------ *
 * Dr. Narodovich — single source of truth for bio + credentials.
 * Previously duplicated across DoctorSpotlight and DoctorPage.
 * ------------------------------------------------------------------ */
export const doctor = {
  licenseRecords: [
  {
    "name": "California dentist license #57101",
    "identifier": "57101",
    "category": "Professional license",
    "url": "https://search.dca.ca.gov/profile/440/4401/57101/DDS"
  },
  {
    "name": "Moderate Sedation Permit #44",
    "identifier": "44",
    "category": "Permit",
    "url": "https://search.dca.ca.gov/profile/440/4417/44/MS"
  },
  {
    "name": "Adult Oral Conscious Sedation Certificate #1628",
    "identifier": "1628",
    "category": "Certificate",
    "url": "https://search.dca.ca.gov/profile/440/4406/1628/OCS"
  }
],
  licenseRecordsChecked: "November 6, 2026",
  name: "Michael Narodovich, DMD",
  role: "Owner · Dentist",
  initials: "MN",
  credentials: [
    "BS, The Ohio State University",
    "DMD, Temple University",
    "Advanced sedation dentistry training",
  ],
  bio: [
    "Originally from Cleveland, Ohio, Dr. Mike earned his Bachelor of Science from The Ohio State University and his Doctor of Dental Medicine from Temple University in Philadelphia before putting down roots in Northern California.",
    "Seeing how many people avoid the dentist for years out of fear led him to focus on sedation dentistry and build an office where nobody feels rushed or judged. Away from the practice, he spends as much time as he can outdoors in Northern California, especially when fresh snow lands on Lake Tahoe.",
  ],
};

/* Service categories — used to group services for scannability + SEO. */
export type ServiceCategoryKey =
  | "preventive"
  | "cosmetic"
  | "restorative"
  | "orthodontics"
  | "sedation"
  | "emergency";

export const serviceCategories: {
  key: ServiceCategoryKey;
  label: string;
  description: string;
}[] = [
  {
    key: "preventive",
    label: "Preventive & Family",
    description: "Unhurried exams, thorough cleanings, and clear guidance for every age.",
  },
  {
    key: "cosmetic",
    label: "Cosmetic",
    description: "Thoughtful refinements or a coordinated smile plan, paced around your goals.",
  },
  {
    key: "restorative",
    label: "Restorative & Implants",
    description: "Strong, natural-looking repairs and tooth replacement built around your bite.",
  },
  {
    key: "orthodontics",
    label: "Orthodontics",
    description: "Clear aligners and traditional braces matched to how your teeth need to move.",
  },
  {
    key: "sedation",
    label: "Sedation & Comfort",
    description: "Monitored IV sedation for patients who feel anxious in the dental chair.",
  },
  {
    key: "emergency",
    label: "Emergency",
    description: "Prompt Roseville care when tooth pain, swelling, or a break cannot wait.",
  },
];

export type Service = {
  title: string;
  slug: string;
  eyebrow: string;
  category: ServiceCategoryKey;
  summary: string;
  description: string;
  highlights: string[];
  icon: ComponentType<{ className?: string }>;
};

export const services: Service[] = [
  {
    title: "Cleanings & Exams",
    slug: "cleanings-exams",
    eyebrow: "Preventive & family care",
    category: "preventive",
    summary:
      "An unhurried dental cleaning, a thorough exam, and plain-language answers from your Roseville family dentist.",
    description:
      "Lasting dental health starts with consistent, judgment-free preventive care. As a family dentist in Roseville, CA, we take time during routine cleanings and exams to protect your gums, screen for oral cancer, take digital X-rays only when clinically helpful, and catch small issues long before they hurt.",
    highlights: [
      "Comprehensive dental exams with clear, honest explanations",
      "Digital X-rays taken only when clinically needed",
      "Routine gum health and oral cancer screenings",
      "Gentle family cleanings paced around your comfort",
    ],
    icon: Stethoscope,
  },
  {
    title: "Composite Fillings",
    slug: "composite-fillings",
    eyebrow: "Tooth-colored repair",
    category: "restorative",
    summary:
      "Enamel-matched fillings that repair decay or small chips while preserving as much natural tooth as possible.",
    description:
      "When a cavity or minor fracture shows up, a tooth-colored composite filling restores strength without drawing attention to the repair. We shade the material to blend with your natural enamel and keep as much healthy tooth structure intact as possible.",
    highlights: [
      "Custom-shaded to blend with your natural enamel",
      "Conservative repair that preserves healthy tooth structure",
      "Calm, well-numbed appointments at your pace",
      "Strong, smooth support for everyday chewing",
    ],
    icon: SmilePlus,
  },
  {
    title: "Dental Crowns",
    slug: "dental-crowns",
    eyebrow: "Two-visit lab crowns",
    category: "restorative",
    summary:
      "Custom lab-made crowns placed over two visits to protect cracked, worn, or weakened teeth.",
    description:
      "When a tooth is too fractured, worn, or weakened for a filling, a custom crown restores both shape and chewing strength. We provide traditional lab-made crowns over two visits: we prepare the tooth and place a protective temporary crown first, then fit and cement your finished crown once our dental lab crafts it to your bite.",
    highlights: [
      "Reinforces cracked, heavily filled, or weakened teeth",
      "Restores natural contours and comfortable chewing",
      "Crafted by a dental lab to fit your exact bite",
      "Protected by a temporary crown between your two visits",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Digital X-Ray",
    slug: "digital-x-ray",
    eyebrow: "Clearer diagnostics",
    category: "preventive",
    summary:
      "Detailed digital imaging that reveals decay, roots, and bone health beneath the surface.",
    description:
      "A visual check only tells part of the story. Digital X-rays let us look between teeth, around roots, beneath older dental work, and into supporting bone so we can spot issues early and plan treatment with accuracy.",
    highlights: [
      "Detects early decay between teeth before pain starts",
      "Evaluates tooth roots, bone levels, and older restorations",
      "Sharp digital images ready to review with you chairside",
      "Guides accurate, conservative treatment planning",
    ],
    icon: BadgeCheck,
  },
  {
    title: "Early Dental Care",
    slug: "early-dental-care",
    eyebrow: "Kids & first visits",
    category: "preventive",
    summary:
      "Calm, encouraging first visits that help children feel comfortable at the dentist from the start.",
    description:
      "Early appointments shape how a child feels about dental care for years to come. We keep kids' visits gentle, patient, and low-pressure, explaining each step simply so young smiles build healthy brushing habits and lasting confidence.",
    highlights: [
      "Patient, low-pressure first dental appointments",
      "Age-appropriate brushing and prevention coaching",
      "Clear, supportive communication for parents",
      "Positive early habits that grow with your child",
    ],
    icon: HeartPulse,
  },
  {
    title: "Smile Makeover",
    slug: "smile-makeover",
    eyebrow: "Coordinated cosmetic care",
    category: "cosmetic",
    summary:
      "A tailored sequence of whitening, veneers, crowns, alignment, or implants designed around the smile you want.",
    description:
      "When you want to change more than one thing about your smile, order and planning matter. Dr. Narodovich works with you to combine whitening, porcelain veneers, crowns, orthodontics, or implants into a step-by-step plan matched to your health, timeline, and budget.",
    highlights: [
      "A step-by-step plan built around your exact goals",
      "Coordinates tooth color, shape, alignment, and replacement",
      "Paced in clear phases to fit your calendar and budget",
      "Focused on balanced, natural-looking results",
    ],
    icon: Sparkles,
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    eyebrow: "Professional brightening",
    category: "cosmetic",
    summary:
      "Dentist-guided whitening that safely lifts years of coffee, tea, and everyday staining.",
    description:
      "If everyday stains or dullness have dimmed your smile, professional whitening at our Roseville office starts with an exam and a candid conversation. We evaluate your natural shade, talk through tooth sensitivity or existing front-tooth dental work, and map out a realistic plan for brighter, even results.",
    highlights: [
      "Targets deeper coffee, tea, wine, and age-related stains",
      "Planned around tooth sensitivity and existing dental work",
      "Consistent, natural-looking brightness under dentist guidance",
      "Easy to sequence ahead of veneers or crowns",
    ],
    icon: Sparkles,
  },
  {
    title: "Veneers",
    slug: "veneers",
    eyebrow: "Porcelain veneers",
    category: "cosmetic",
    summary:
      "Thin, custom porcelain shells crafted to refine chipped, worn, stained, or uneven front teeth.",
    description:
      "Porcelain veneers cover the front surface of teeth to address chips, deep discoloration, worn edges, and slight spacing with natural translucency. Dr. Narodovich plans the shape, proportion, and shade carefully with you so the finished smile looks refined and authentically yours.",
    highlights: [
      "Refines chips, worn edges, deep stains, and uneven spacing",
      "Individually shaped and shaded for a natural appearance",
      "Durable, lifelike porcelain tailored to your features",
      "Planned conservatively around your bite and long-term health",
    ],
    icon: WandSparkles,
  },
  {
    title: "Invisalign",
    slug: "roseville-invisalign",
    eyebrow: "Clear aligners",
    category: "orthodontics",
    summary:
      "Discreet, removable aligners that straighten teeth without brackets or wires.",
    description:
      "Invisalign shifts teeth gradually with custom clear aligners you remove for meals, brushing, and flossing. During your Roseville consultation, we evaluate your bite, compare clear aligners honestly against braces, and provide a written estimate that includes retainers.",
    highlights: [
      "Discreet clear trays that blend into daily life",
      "Removable for eating, brushing, and normal flossing",
      "Planned step by step around your bite and alignment",
      "Clear written estimate including checkups and retainers",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Traditional Braces",
    slug: "traditional-braces",
    eyebrow: "Orthodontics",
    category: "orthodontics",
    summary:
      "Dependable bracket-and-wire alignment built for complex crowding, spacing, and bite correction.",
    description:
      "When teeth need rotational control or broader bite correction, traditional braces remain the most reliable tool in orthodontics. We plan treatment carefully around both function and appearance for steady, predictable alignment.",
    highlights: [
      "Reliable control for complex crowding and bite issues",
      "Steady, precise tooth movement from start to finish",
      "Improves both smile alignment and everyday bite comfort",
      "Time-tested option for teens and adults alike",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Dental Implants",
    slug: "roseville-dental-implants",
    eyebrow: "Tooth replacement",
    category: "restorative",
    summary:
      "A titanium root and custom crown designed to look, feel, and chew like a natural tooth.",
    description:
      "Replacing a missing tooth starts with a thorough exam and clear choices. At our Roseville office, we review whether a dental implant fits your health and bite, compare bridges or removable alternatives honestly, and lay out the stages, timeline, and written estimate before you decide.",
    highlights: [
      "Custom-matched to look and chew like a natural tooth",
      "Helps preserve surrounding jawbone structure",
      "Versatile support for a single tooth or multiple teeth",
      "Long-term tooth replacement backed by ongoing maintenance",
    ],
    icon: SmilePlus,
  },
  {
    title: "IV Sedation",
    slug: "iv-sedation",
    eyebrow: "Sedation dentistry",
    category: "sedation",
    summary:
      "Monitored IV sedation dentistry that helps anxious Roseville patients complete dental care calmly and comfortably.",
    description:
      "If dental fear, a strong gag reflex, or a difficult past experience has kept you out of the chair, sedation dentistry in Roseville can help you move forward comfortably. Start with an unhurried consultation where Dr. Narodovich listens to your goals, reviews your health history, and explains whether monitored IV sedation fits your treatment and budget.",
    highlights: [
      "Tailored for dental anxiety, fear, and years away from care",
      "Helps ease strong gag reflexes and longer restorative visits",
      "Continuous monitoring paired with an individualized comfort plan",
      "Starts with a calm consultation and a clear written estimate",
    ],
    icon: Syringe,
  },
  {
    title: "Dental Emergencies",
    slug: "dental-emergencies",
    eyebrow: "Urgent dental care",
    category: "emergency",
    summary:
      "Sudden tooth pain, swelling, or a broken tooth? Call our Roseville emergency dentist for prompt guidance.",
    description:
      "A severe toothache, facial swelling, broken tooth, or lost crown cannot wait. Call our Roseville emergency dentist Monday to Friday so we can guide you on immediate next steps and make every effort to see you as quickly as possible.",
    highlights: [
      "Severe toothaches, sensitivity, and facial or gum swelling",
      "Chipped, cracked, loosened, or knocked-out teeth",
      "Lost fillings, temporary crowns, or damaged restorations",
      "Direct phone guidance from our Roseville team Monday to Friday",
    ],
    icon: HeartPulse,
  },
];

/** Home flagships — higher-ticket care, in visual priority order. */
export const featuredServiceSlugs = [
  "iv-sedation",
  "roseville-dental-implants",
] as const;

export const featuredServices = featuredServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is Service => Boolean(service));

export const heroFacts = [
  "Monitored IV sedation for anxious patients",
  "Dental implants & restorative dentistry",
  "Welcoming new patients in Roseville",
];

export const implantProcess = [
  {
    title: "Plan",
    body: "We examine the space, review your bite and imaging, and walk you through each stage, provider role, and written estimate.",
  },
  {
    title: "Place & Heal",
    body: "A titanium implant post serves as a new root, followed by healing time so the surrounding jawbone stabilizes around it.",
  },
  {
    title: "Restore",
    body: "An abutment and custom-shaded crown complete the restoration so your replacement tooth looks and chews naturally.",
  },
];

/* Traditional (two-visit) crowns only — same-day/CEREC crowns are not offered. */
export const crownProcess = [
  {
    title: "Examine",
    body: "Dr. Narodovich evaluates the tooth, explains whether a crown is the best fit, and walks you through your written estimate.",
  },
  {
    title: "Prepare",
    body: "At your first visit, we gently shape the tooth, take detailed records for our dental lab, and place a temporary crown to protect it.",
  },
  {
    title: "Fit & Cement",
    body: "At your second visit, we try in your lab-made crown, fine-tune the fit against your bite, and cement it securely in place.",
  },
];

/** Services grouped by category, in `serviceCategories` order, skipping empties. */
export function servicesByCategory() {
  return serviceCategories
    .map((category) => ({
      ...category,
      items: services.filter((service) => service.category === category.key),
    }))
    .filter((group) => group.items.length > 0);
}

export const serviceAliases: Record<string, string> = {
  "roseville-family-dentist": "cleanings-exams",
  "family-dentistry": "cleanings-exams",
  "cosmetic-dentistry": "smile-makeover",
};

/* ------------------------------------------------------------------ *
 * Google review proof, verified by reading the complete public Waikiki Dental
 * review panel on August 24, 2026. Topic counts are Google's own corpus-wide
 * labels; excerpts are intentionally short and link back to the full source.
 * ------------------------------------------------------------------ */
export const reviewStats = {
  rating: 4.9,
  count: 426,
  fiveStarCount: 403,
  fourOrFiveStarCount: 413,
  writtenReviewCount: 323,
  ratingOnlyCount: 103,
  source: "Google",
  verifiedOn: "August 24, 2026",
  href: "https://www.google.com/maps/place/Waikiki+Dental+%7C+Roseville,+CA/@38.7717804,-121.3154872,15z/data=!3m1!5s0x809b2173405b150d:0x40163809ed708a6f!4m8!3m7!1s0x809b21951884b199:0x556f1e63828910ed!8m2!3d38.7717804!4d-121.3154872!9m1!1b1!16s%2Fg%2F1tgnrxyg?entry=ttu",
};

export const reviewDistribution = [
  { stars: 5, count: 403 },
  { stars: 4, count: 10 },
  { stars: 3, count: 3 },
  { stars: 2, count: 2 },
  { stars: 1, count: 8 },
];

export type ReviewTheme =
  | "team"
  | "comfort"
  | "doctor"
  | "sedation";

export const reviewThemeLabels: Record<ReviewTheme, string> = {
  team: "The team",
  comfort: "Comfort",
  doctor: "Dr. Mike",
  sedation: "Sedation",
};

export const reviewTopics = [
  { label: "Friendly staff", mentions: 171 },
  { label: "Dr. Mike", mentions: 58 },
  { label: "Caring staff", mentions: 54 },
  { label: "Welcoming atmosphere", mentions: 34 },
  { label: "Hygienist", mentions: 19 },
  { label: "Efficient staff", mentions: 16 },
  { label: "Crowns", mentions: 13 },
  { label: "Painless cleaning", mentions: 5 },
  { label: "Deep cleaning", mentions: 5 },
  { label: "Crown repair", mentions: 3 },
];

export type ReviewExcerpt = {
  quote: string;
  name: string;
  context: string;
  themes: ReviewTheme[];
};

export const reviewExcerpts: ReviewExcerpt[] = [
  {
    quote:
      "The service is great, the staff is knowledgeable and experienced, and their equipment is cutting edge.",
    name: "Greg R.",
    context: "Patient experience",
    themes: ["team"],
  },
  {
    quote:
      "Dr. Mike is a friendly, professional, talented dentist. I especially appreciate his sedation services.",
    name: "Janis C.",
    context: "Sedation patient",
    themes: ["sedation", "doctor"],
  },
  {
    quote:
      "Excellent chair-side manner, friendly and fun. Welcoming atmosphere and outstanding service.",
    name: "Benjamin S.",
    context: "Patient experience",
    themes: ["comfort", "team"],
  },
  {
    quote:
      "They listen to my husband's concerns and are attentive to details.",
    name: "Joeni C.",
    context: "Attentive care",
    themes: ["comfort", "doctor"],
  },
  {
    quote: "Great location and welcoming team. Dr. Mike is awesome.",
    name: "Charlene S.",
    context: "Long-time patient",
    themes: ["team", "doctor"],
  },
  {
    quote:
      "Everyone is so kind and professional. I felt comfortable and well taken care of the whole time.",
    name: "Lilyan A.",
    context: "Comfort-focused care",
    themes: ["comfort", "team"],
  },
  {
    quote:
      "Always a great experience here with knowledgeable and professional staff.",
    name: "Colin S.",
    context: "Patient experience",
    themes: ["team"],
  },
];

export const navItems = [
  { label: "Services", href: "/roseville-dental-care/" },
  { label: "Dr. Narodovich", href: "/michael-narodovich-dmd/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Reviews", href: "/patient-testimonials/" },
  { label: "Contact", href: "/contact-waikiki-dental/" },
];

/* ------------------------------------------------------------------ *
 * Team story — current practice-owned photos published by Waikiki
 * Dental on its official Facebook page in March 2026. Cropped portraits
 * are self-hosted so the experience stays fast and does not depend on a
 * social platform or expose visitors to third-party tracking.
 * ------------------------------------------------------------------ */
export const teamStory = {
  groupImage: "/media/waikiki-team-2026.webp",
  groupImageAlt:
    "Dr. Michael Narodovich with the Waikiki Dental team in burgundy scrubs in front of the practice's hibiscus mural",
  socialHref: "https://www.facebook.com/waikikidentalroseville/",
  members: [
    {
      name: "Jessica",
      role: "RDA manager",
      image: "/media/team-jessica.webp",
      alt: "Jessica, RDA manager at Waikiki Dental",
      summary:
        "With nearly a decade at Waikiki Dental, Jessica keeps every day running smoothly and makes sure patients feel remembered the moment they arrive.",
    },
    {
      name: "Nayeli",
      role: "Roving dental assistant",
      image: "/media/team-nayeli.webp",
      alt: "Nayeli, roving dental assistant at Waikiki Dental",
      summary:
        "Whether greeting you at reception or supporting Dr. Mike chairside, Nayeli brings calm, adaptable warmth wherever the day needs her.",
    },
  ],
};

/* Insurance & financing trust strip, based on the public new-patient page. */
export const mediCalNotice = "We do not accept Medi-Cal.";

export const paymentOptions = {
  insuranceNote: `${mediCalNotice} Call or email us to check other dental plans.`,
  items: [
    "CareCredit financing",
    "Major credit & debit cards",
    "Cash & check",
  ],
};

/** Dr. Narodovich's profile page and the Person node id it publishes. */
export const doctorProfilePath = "/michael-narodovich-dmd/";

/* Answers to the practical questions patients (and AI assistants) ask most.
 * Every answer is built from facts held in this file. */
export const officeHoursSummary = hours
  .map(([day, range]) => `${day} ${range}`)
  .join("; ");

export const newPatientQuestions = [
  {
    question: "Are you accepting new patients?",
    answer: `Yes. We welcome new patients from Roseville and nearby communities. Book online or call ${site.phone}, and let us know if dental anxiety has kept you away so we can plan an easier first visit.`,
  },
  {
    question: "Does Waikiki Dental accept Medi-Cal?",
    answer: `No. ${mediCalNotice} We accept CareCredit financing, major credit and debit cards, cash, and checks.`,
  },
  {
    question: "Do you accept my dental insurance?",
    answer: `Call us at ${site.phone} or email ${site.email} before your appointment and our front desk will check what your specific plan covers.`,
  },
  {
    question: "What payment and financing options do you accept?",
    answer: "We accept cash, checks, debit, and major credit cards, with payment due at the time of treatment. CareCredit financing is also available if you prefer to spread out-of-pocket costs over monthly payments.",
  },
  {
    question: "How do I complete new-patient forms?",
    answer: "We send registration paperwork securely by email or text before your visit, so you can fill it out comfortably at home instead of in the waiting room.",
  },
  {
    question: "What are your office hours?",
    answer: `Our Roseville office hours are ${officeHoursSummary}.`,
  },
  {
    question: "Where is Waikiki Dental located?",
    answer: `We are located at ${site.address}, serving patients from Roseville, Granite Bay, Rocklin, and Lincoln.`,
  },
  {
    question: "Can I request IV sedation if I am nervous about the dentist?",
    answer: "Yes. We offer monitored IV sedation for eligible patients. We always start with a consultation so Dr. Narodovich can review your medical history and planned care before recommending the right comfort option.",
  },
];

/* Emergency fast-path — surfaced in the header utility bar. */
export const emergency = {
  label: "Dental emergency?",
  href: "/dental-emergencies/",
};

/* On-site booking page: Jarvis embed plus office phone and email. */
export const scheduleHref = "/request-appointment/";
export const sedationContactId = "sedation-consultation";
export const sedationConsultHref = scheduleHref + "#" + sedationContactId;

/**
 * Search listing copy (title + meta description) for service pages. Titles
 * get " | Waikiki Dental" from the root layout, so keep them to 43 characters
 * (60 rendered); keep descriptions to 155. Use only facts held in this file
 * (hours, phone, `paymentOptions`, `reviewStats`, the service copy): no
 * prices, offers, or guarantees.
 */
export const serviceSeo: Record<string, { title: string; description: string }> = {
  "roseville-invisalign": {
    title: "Roseville Invisalign: Cost & Consultation",
    description:
      "Straighten teeth discreetly with Invisalign in Roseville, CA. Compare clear aligners and braces, get a written estimate with retainers, and CareCredit.",
  },
  "iv-sedation": {
    title: "IV Sedation Dentist in Roseville, CA",
    description:
      "Sedation dentistry in Roseville with Dr. Narodovich. Monitored IV sedation for dental anxiety, strong gag reflexes, implants, and restorative care.",
  },
  "dental-emergencies": {
    title: "Emergency Dentist in Roseville: Call Now",
    description: `Emergency dentist in Roseville: call ${site.phone} Monday to Friday for tooth pain, swelling, or a broken tooth. We make every effort to see you fast.`,
  },
  "digital-x-ray": {
    title: "Digital Dental X-Rays in Roseville, CA",
    description:
      "Low-dose digital dental X-rays in Roseville reveal hidden cavities, root concerns, and bone changes early. Learn how often X-rays are needed and why.",
  },
  "teeth-whitening": {
    title: "Teeth Whitening in Roseville, CA",
    description:
      "Professional teeth whitening in Roseville, CA with Dr. Narodovich. Lift coffee, tea, and age stains safely with guidance for sensitive teeth and shade.",
  },
  "dental-crowns": {
    title: "Dental Crowns in Roseville: Two Visits",
    description:
      "Cracked or weakened tooth? Get a custom lab-made crown in Roseville over two visits with a temporary crown, a clear written estimate, and CareCredit.",
  },
  veneers: {
    title: "Porcelain Veneers in Roseville, CA",
    description:
      "Custom porcelain veneers in Roseville for chipped, worn, gapped, or stained teeth. Compare veneers vs. crowns and plan natural cosmetic results with us.",
  },
  "smile-makeover": {
    title: "Smile Makeover in Roseville, CA",
    description:
      "Cosmetic dentistry and smile makeovers in Roseville, CA. Combine whitening, veneers, crowns, Invisalign, or implants in phases built around your budget.",
  },
  "traditional-braces": {
    title: "Traditional Braces in Roseville, CA",
    description:
      "Traditional braces in Roseville for teens and adults with crowding, spacing, or bite issues. Compare braces and Invisalign at Waikiki Dental.",
  },
  "cleanings-exams": {
    title: "Family Dentist & Cleanings in Roseville",
    description:
      "Looking for a family dentist in Roseville, CA? Unhurried cleanings, thorough exams, gum checks, and oral cancer screenings. Welcoming new patients.",
  },
  "composite-fillings": {
    title: "Tooth-Colored Fillings in Roseville, CA",
    description:
      "Tooth-colored composite fillings in Roseville repair cavities and small chips conservatively, shaded to match your enamel in a calm, unhurried visit.",
  },
  "early-dental-care": {
    title: "Kids' First Dental Visits in Roseville",
    description:
      "Gentle, patient kids' dental visits in Roseville, CA. Learn when children should first see a dentist and how we build healthy brushing habits early.",
  },
  "roseville-dental-implants": {
    title: "Dental Implants in Roseville, CA",
    description:
      "Single or multiple dental implants in Roseville, CA. Compare implants vs. bridges, review treatment stages and cost factors, and get a written estimate.",
  },
};

export const contactTopics = [
  {
    key: "general",
    label: "General question",
    hint: "Hours, directions, or a quick note",
    icon: MessageCircle,
  },
  {
    key: "new-patient",
    label: "New patient",
    hint: "First visit or insurance questions",
    icon: Sparkles,
  },
  {
    key: "existing-appointment",
    label: "Existing visit",
    hint: "Rescheduling or timing details",
    icon: CalendarClock,
  },
  {
    key: "office",
    label: "Office or billing",
    hint: "We will call you back (no account numbers)",
    icon: Building2,
  },
  {
    key: "other",
    label: "Something else",
    hint: "Brief and non-medical",
    icon: Ellipsis,
  },
];

export const formPrivacy = {
  contactLead:
    "Have a general question for our Roseville front desk? Send a short note below. Please leave out medical history, insurance IDs, and payment details.",
  contactConsent:
    "I confirm this note does not include medical history, insurance IDs, payment details, or other sensitive information.",
  contactPlaceholder: "How can our team help? Please keep your message general.",
};

export const canonicalPageRoutes = [
  "",
  "michael-narodovich-dmd",
  "roseville-dental-care",
  "waikiki-dental-roseville",
  "new-patients",
  "patient-testimonials",
  "contact-waikiki-dental",
  "orthodontics",
  "request-appointment",
  ...services.map((service) => service.slug),
];

/**
 * Routes prerendered by `[slug]`. Legacy aliases in `serviceAliases` are not
 * listed: `next.config.ts` redirects every one of them before routing.
 */
export const pageRoutes = canonicalPageRoutes;

/** Last substantive site update (ISO date), used for sitemap `lastModified`. */
export const siteLastUpdated = "2026-11-24";

/* ------------------------------------------------------------------ *
 * Imagery — self-hosted in /public/media for fast, reliable LCP.
 *
 * Editorial rule: every image is either real photography of this practice
 * (the doctor's portrait, the team, the office) or original abstract art.
 * No AI-generated or stock people, patients, or treatment rooms.
 *
 * `doctorPortrait` is Dr. Narodovich's real studio headshot. Team and office
 * photography lives in `teamStory` above. The artwork is rendered by
 * `scripts/generate-abstract-art.py` (see docs/MEDIA-PROVENANCE.md).
 * ------------------------------------------------------------------ */
export const brandAssets = {
  /** Full "Waikiki DENTAL" wordmark with hibiscus — transparent PNG, 511×73. */
  logo: "/media/logo.png",
  logoWidth: 511,
  logoHeight: 73,
  /** The hibiscus flower alone — transparent PNG, 75×73. */
  icon: "/media/hibiscus.png",
};
export const doctorPortrait: string | null = "/media/dr-narodovich-hd.jpg";
/** Square face crop of the same real headshot, for small avatar cards. */
export const doctorAvatar = "/media/dr-narodovich-avatar.jpg";

export type Artwork = {
  /** Frame 0 of the loop — the LCP-safe still and reduced-motion fallback. */
  poster: string;
  webm: string;
  mp4: string;
};

/** "Tide": a painted Pacific horizon whose light swells on a 12s breath. */
export const artwork = {
  tide: {
    poster: "/media/art/tide-poster.jpg",
    webm: "/media/art/tide-loop.webm",
    mp4: "/media/art/tide-loop.mp4",
  },
  tideNight: {
    poster: "/media/art/tide-night-poster.jpg",
    webm: "/media/art/tide-night-loop.webm",
    mp4: "/media/art/tide-night-loop.mp4",
  },
} satisfies Record<string, Artwork>;

/** Converts an `hours` range like "9:00 AM - 5:00 PM" to schema.org 24h times. */
function to24Hour(time: string) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!match) throw new Error(`Unrecognized office hour: ${time}`);
  const [, rawHour, minutes, meridiem] = match;
  const hour = (Number(rawHour) % 12) + (meridiem.toUpperCase() === "PM" ? 12 : 0);
  return `${String(hour).padStart(2, "0")}:${minutes}`;
}

/** Stable node id so Service JSON-LD can reference the practice as provider. */
export const dentistId = `${site.baseUrl}/#dentist`;
export const websiteId = `${site.baseUrl}/#website`;
/** Published in full on the doctor page; referenced by id everywhere else. */
export const doctorPersonId = `${site.baseUrl}${doctorProfilePath}#person`;
export const serviceNodeId = (slug: string) => `${site.baseUrl}/${slug}/#service`;

/*
 * No aggregateRating: Google's review-snippet policy disallows self-serving
 * review markup for a LocalBusiness on its own site, especially figures copied
 * from Google itself.
 */
export const dentistJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": dentistId,
  name: `${site.name} - Roseville`,
  alternateName: site.name,
  description: site.description,
  url: `${site.baseUrl}/`,
  image: absoluteUrl(teamStory.groupImage),
  logo: absoluteUrl(brandAssets.logo),
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.addressParts.street} ${site.addressParts.suite}`,
    addressLocality: site.addressParts.locality,
    addressRegion: site.addressParts.region,
    postalCode: site.addressParts.postalCode,
    addressCountry: site.addressParts.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  hasMap: site.mapsHref,
  medicalSpecialty: "Dentistry",
  /* heroFacts: "Now accepting new patients". */
  isAcceptingNewPatients: true,
  currenciesAccepted: "USD",
  /* `paymentOptions`; Medi-Cal is not accepted. */
  paymentAccepted: "Cash, Check, Credit Card, Debit Card, CareCredit",
  employee: { "@id": doctorPersonId },
  knowsAbout: [
    "Sedation Dentistry",
    "Family Dentistry",
    "Cosmetic Dentistry",
    "Restorative Dentistry",
    "Emergency Dentistry",
    ...services.map((service) => service.title),
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dental services in Roseville, CA",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": serviceNodeId(service.slug),
        name: service.title,
        url: absoluteUrl(`/${service.slug}/`),
      },
    })),
  },
  openingHoursSpecification: hours
    .filter(([, range]) => range.includes("-"))
    .map(([day, range]) => {
      const [opens, closes] = range.split("-");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: to24Hour(opens),
        closes: to24Hour(closes),
      };
    }),
  areaServed: ["Roseville", "Granite Bay", "Rocklin", "Lincoln"],
  sameAs: [teamStory.socialHref, reviewStats.href],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: `${site.baseUrl}/`,
  name: site.name,
  inLanguage: "en-US",
  publisher: { "@id": dentistId },
};

export function findService(slug: string) {
  const normalized = serviceAliases[slug] ?? slug;
  return services.find((service) => service.slug === normalized);
}

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${normalized}`;
}
