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
  const { t, i18n } = useTranslation();

  const asFaqList = (value: unknown): Array<{ question: string; answer: string }> => {
    if (!Array.isArray(value)) return [];
    return value
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const maybe = item as { q?: unknown; a?: unknown };
        const question = typeof maybe.q === "string" ? maybe.q.trim() : "";
        const answer = typeof maybe.a === "string" ? maybe.a.trim() : "";
        if (!question || !answer) return null;
        return { question, answer };
      })
      .filter((x): x is { question: string; answer: string } => Boolean(x));
  };

  // Get all questions from all categories in one continuous list
  const allQuestions = CATEGORY_KEYS.flatMap((catKey) =>
    asFaqList(t(`faq.questions.${catKey}`, { returnObjects: true, defaultValue: [] }))
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
  const currentLang = i18n.resolvedLanguage || i18n.language || "en";
  const faqDescription = t("faq.description", {
    defaultValue: t("description", {
      defaultValue:
        "Frequently asked questions about Vadatei's change management and transformation consulting services",
    }),
  });

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://vadatei.com/#faq",
    name: t("faq.title"),
    description: faqDescription,
    inLanguage: currentLang,
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <section id="faq" className="max-w-6xl mx-auto py-16 px-4">
      <Helmet>
        <script id="ld-faqpage" type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      </Helmet>

      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-center">{t("faq.title")}</h2>
      </header>

      {/* Single continuous list of all FAQ items */}
      <div className="flex flex-col gap-4" role="list">
        {allQuestions.map((item, index) => {
          const isOpen = openSet.has(index);
          return (
            <article
              key={index}
              aria-labelledby={`faq-q-${index}`}
              className="bg-white/5 dark:bg-slate-800 rounded-lg p-4 shadow-sm"
              role="listitem"
            >
              <div className="flex items-start justify-between">
                <h3 
                  id={`faq-q-${index}`} 
                  className="text-lg font-medium"
                >
                  {item.question}
                </h3>

                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => toggle(index)}
                  type="button"
                  className="ml-4 inline-flex items-center justify-center w-12 h-12 rounded-full hover:bg-primary/10 transition-colors flex-shrink-0"
                  aria-label={isOpen ? "Close answer" : "Open answer"}
                >
                  <svg
                    className={`w-6 h-6 transform transition-transform ${isOpen ? "rotate-90" : "rotate-0"}`}
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
                className={`mt-3 text-sm leading-relaxed transition-all ${isOpen ? "block" : "hidden"}`}
              >
                <div>{item.answer}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}