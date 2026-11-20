import { absoluteUrl } from "@/lib/site";

export type FaqItem = { question: string; answer: string };

/**
 * FAQPage JSON-LD for questions that are visible on the same page. Google
 * limits FAQ rich results to a few site types, but the markup still gives
 * search and answer engines a clean question/answer map of the page. Only
 * mark up questions the page actually renders.
 */
export function FaqJsonLd({ path, questions }: { path: string; questions: FaqItem[] }) {
  if (questions.length === 0) return null;
  const url = absoluteUrl(path);
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Disclosure list; answers stay in the server-rendered HTML when collapsed. */
export function FaqList({ questions }: { questions: FaqItem[] }) {
  return (
    <div className="divide-y divide-line">
      {questions.map(({ question, answer }) => (
        <details className="py-5" key={question}>
          <summary className="cursor-pointer font-semibold leading-7 text-ink">{question}</summary>
          <p className="mt-3 leading-8 text-ink-muted">{answer}</p>
        </details>
      ))}
    </div>
  );
}
