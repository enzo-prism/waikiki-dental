import Link from "next/link";
import { careGuides } from "@/lib/care-guides";
import { site } from "@/lib/site";

export function CareGuide({ slug }: { slug: string }) {
  const guide = careGuides[slug];
  if (!guide) return null;

  return (
    <section className="bg-surface-alt py-16 sm:py-24" aria-labelledby="care-guide-title">
      <div className="wrap max-w-4xl">
        <h2 id="care-guide-title" className="font-serif text-3xl font-medium text-ink sm:text-4xl">
          Answers before you choose your care.
        </h2>
        <div className="mt-10 grid gap-10">
          {guide.sections.map(({ heading, body }) => (
            <article key={heading}>
              <h3 className="font-serif text-2xl font-medium text-ink">{heading}</h3>
              <p className="mt-3 leading-8 text-ink-muted">{body}</p>
            </article>
          ))}
        </div>
        <h2 className="mt-14 font-serif text-3xl font-medium text-ink">Common questions</h2>
        <div className="mt-6 divide-y divide-line">
          {guide.questions.map(({ question, answer }) => (
            <details className="py-5" key={question}>
              <summary className="cursor-pointer font-semibold leading-7 text-ink">{question}</summary>
              <p className="mt-3 leading-8 text-ink-muted">{answer}</p>
            </details>
          ))}
        </div>
        <nav aria-label="Explore your care" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ocean-700">
          {guide.links.map(({ href, label }) => <Link className="underline underline-offset-4" key={href} href={href}>{label}</Link>)}
        </nav>
        <p className="mt-8 text-sm leading-7 text-ink-muted">
          Visit Waikiki Dental at {site.address}. Call <a className="underline" href={site.phoneHref}>{site.phone}</a> to ask about availability.
        </p>
        {guide.professionalRecord ? <p className="mt-4 text-sm leading-7 text-ink-muted">Professional verification: <a className="underline" href={guide.professionalRecord.href}>{guide.professionalRecord.label}</a>. The Board record showed current-active status when checked {guide.professionalRecord.checked}. Discuss the clinician, monitoring and your individual plan at the consultation.</p> : null}
        <p className="mt-4 text-sm leading-7 text-ink-muted">
          Patient education: <a className="underline underline-offset-4" href={guide.source.href}>{guide.source.label}</a>.
          {" "}General information; your dentist provides recommendations after an examination.
        </p>
      </div>
    </section>
  );
}
