import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const CATEGORY_KEYS = [
  "services",
  "locations",
  "process",
  "security",
  "results",
];

export default function FAQ(): JSX.Element {
  const { t } = useTranslation();

  // Get all questions from all categories in one continuous list
  const allQuestions = CATEGORY_KEYS.flatMap((catKey) =>
    (t(`faq.questions.${catKey}`, { returnObjects: true }) as { q: string; a: string }[]).map((item) => ({
      question: item.q,
      answer: item.a,
    }))
  );

  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // For FAQ structured data (schema.org)
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  return (
    <section id="faq" className="max-w-6xl mx-auto py-16 px-4">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-center">{t("faq.title")}</h2>
      </div>

      {/* Single continuous list of all FAQ items */}
      <div className="flex flex-col gap-4">
        {allQuestions.map((item, index) => {
          const isOpen = openSet.has(index);
          return (
            <article
              key={index}
              aria-labelledby={`faq-q-${index}`}
              className="bg-white/5 dark:bg-slate-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <h3 id={`faq-q-${index}`} className="text-lg font-medium">
                  {item.question}
                </h3>

                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => toggle(index)}
                  type="button"
                  className="ml-4 inline-flex items-center justify-center w-10 h-10 rounded-full text-sm"
                >
                  <svg
                    className={`w-4 h-4 transform ${isOpen ? "rotate-90" : "rotate-0"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              <div
                id={`faq-a-${index}`}
                role="region"
                aria-labelledby={`faq-q-${index}`}
                className={`mt-3 text-sm leading-relaxed ${isOpen ? "block" : "hidden"}`}
              >
                {item.answer}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}