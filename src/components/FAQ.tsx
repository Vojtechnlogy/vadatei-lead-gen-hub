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
  // Get current language from i18next translation context
  const currentLang = (typeof t === 'function' && t('lang')) || 'en';
  // Use translated description if available, fallback to English
  const faqDescription = t('faq.description', { defaultValue: t('description', { defaultValue: "Frequently asked questions about Vadatei's change management and transformation consulting services" }) });
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": t("faq.title"),
    "description": faqDescription,
    "url": "https://vadatei.com/#faq",
    "inLanguage": currentLang,
    "publisher": {
      "@type": "Organization",
      "name": "Vadatei",
      "url": "https://vadatei.com/",
      "logo": "https://vadatei.com/favicon.ico"
    },
    "mainEntity": allQuestions.map((q, index) => ({
      "@type": "Question",
      "name": q.question,
      "position": index + 1,
      "acceptedAnswer": { 
        "@type": "Answer", 
        "text": q.answer,
        "inLanguage": currentLang,
        "author": {
          "@type": "Organization",
          "name": "Vadatei"
        }
      },
    })),
    "dateModified": new Date().toISOString().split('T')[0],
    "dateCreated": "2024-01-01"
  };

  return (
    <section id="faq" className="max-w-6xl mx-auto py-16 px-4" itemScope itemType="https://schema.org/FAQPage">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>

      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-center" itemProp="name">{t("faq.title")}</h2>
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
              itemScope 
              itemType="https://schema.org/Question"
              itemProp="mainEntity"
              role="listitem"
            >
              <div className="flex items-start justify-between">
                <h3 
                  id={`faq-q-${index}`} 
                  className="text-lg font-medium"
                  itemProp="name"
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
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <div itemProp="text">{item.answer}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}