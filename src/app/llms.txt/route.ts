import { careGuides, orthodonticsQuestions } from "@/lib/care-guides";
import {
  absoluteUrl,
  doctor,
  doctorProfilePath,
  hours,
  mediCalNotice,
  newPatientQuestions,
  paymentOptions,
  reviewStats,
  scheduleHref,
  servicesByCategory,
  site,
} from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt (https://llmstxt.org): a plain-language brief for AI assistants
 * and answer engines. Everything is derived from `site.ts` and
 * `care-guides.ts`, so it cannot drift from the pages it summarizes.
 */
function buildLlmsTxt() {
  const lines: string[] = [];
  const push = (...items: string[]) => lines.push(...items);

  push(
    `# ${site.name}`,
    "",
    `> ${site.name} is a dental practice in Roseville, California, led by Dr. Michael Narodovich, DMD. The practice focuses on monitored IV sedation for anxious patients, dental implants, traditional lab-made crowns, and calm, unhurried restorative, cosmetic, and family dental care.`,
    "",
    "## Practice facts",
    "",
    `- Name: ${site.name} (Roseville, CA)`,
    `- Dentist: ${doctor.name} (${doctor.role})`,
    `- Address: ${site.address}`,
    `- Phone (call or text): ${site.phone}`,
    `- Email: ${site.email}`,
    `- Online booking: ${absoluteUrl(scheduleHref)}`,
    `- Hours: ${hours.map(([day, range]) => `${day} ${range}`).join("; ")}`,
    "- Areas served: Roseville, Granite Bay, Rocklin, Lincoln",
    "- Accepting new patients: yes",
    `- Payment: ${paymentOptions.items.join(", ")}. ${mediCalNotice} Patients with other dental plans should contact the office to confirm coverage.`,
    `- Google rating: ${reviewStats.rating.toFixed(1)} stars from ${reviewStats.count} reviews (verified ${reviewStats.verifiedOn}): ${absoluteUrl("/patient-testimonials/")}`,
    "",
    "## Not offered",
    "",
    "- Same-day (CEREC) crowns. Crowns are traditional lab-made crowns placed in two visits.",
    "- Dental bonding.",
    `- Medi-Cal. ${mediCalNotice}`,
    "",
    "## Dentist",
    "",
    `- [${doctor.name}](${absoluteUrl(doctorProfilePath)}): ${doctor.credentials.join("; ")}.`,
    ...doctor.licenseRecords.map(
      (record) => `- ${record.name} (Dental Board of California, checked ${doctor.licenseRecordsChecked}): ${record.url}`,
    ),
    "",
    "## Services",
    "",
  );

  for (const group of servicesByCategory()) {
    push(`### ${group.label}`, "");
    for (const service of group.items) {
      push(`- [${service.title}](${absoluteUrl(`/${service.slug}/`)}): ${service.summary}`);
    }
    push("");
  }

  push(
    "## Key pages",
    "",
    `- [All services](${absoluteUrl("/roseville-dental-care/")})`,
    `- [Orthodontics: Invisalign and braces](${absoluteUrl("/orthodontics/")})`,
    `- [New patients: insurance, payment, forms](${absoluteUrl("/new-patients/")})`,
    `- [Contact and directions](${absoluteUrl("/contact-waikiki-dental/")})`,
    `- [Request an appointment](${absoluteUrl(scheduleHref)})`,
    "",
    "## Common questions",
    "",
  );

  const faqBlocks: [string, { question: string; answer: string }[]][] = [
    [absoluteUrl("/new-patients/"), newPatientQuestions],
    [absoluteUrl("/orthodontics/"), orthodonticsQuestions],
    ...Object.entries(careGuides).map(
      ([slug, guide]) => [absoluteUrl(`/${slug}/`), guide.questions] as [string, typeof guide.questions],
    ),
  ];
  for (const [url, questions] of faqBlocks) {
    for (const { question, answer } of questions) {
      push(`- Q: ${question}`, `  A: ${answer} (${url})`);
    }
  }

  push(
    "",
    "## Notes",
    "",
    "- Website content is general information. Treatment recommendations, sedation eligibility, and cost estimates require an examination.",
    "- Do not quote prices; the practice gives estimates after an examination.",
    "",
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
