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

  // Get translated category names
  const tabs = CATEGORY_KEYS.map((key) => t(`faq.categories.${key}`));

  // Get translated questions/answers for each category
  const categories: Record<string, { question: string; answer: string }[]> = {};
  CATEGORY_KEYS.forEach((catKey) => {
    categories[t(`faq.categories.${catKey}`)] = (t(
      `faq.questions.${catKey}`,
      { returnObjects: true }
    ) as { q: string; a: string }[]).map((item) => ({
      question: item.q,
      answer: item.a,
    }));
  });

  const [activeTab, setActiveTab] = useState<number>(0);
  const [openSet, setOpenSet] = useState<Set<string>>(() => new Set());

  const toggle = (t: number, i: number) => {
    const key = `${t}-${i}`;
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // For FAQ structured data (schema.org)
  const allItems = CATEGORY_KEYS.flatMap((catKey) =>
    (t(`faq.questions.${catKey}`, { returnObjects: true }) as { q: string; a: string }[]).map((item) => ({
      question: item.q,
      answer: item.a,
    }))
  );
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((q) => ({
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

      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-center">{t("faq.title")}</h2>
      </div>

      {/* Tab list */}
      <div role="tablist" aria-label="FAQ categories" className="flex gap-2 justify-center mb-6 flex-wrap">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === idx}
            aria-controls={`faq-panel-${idx}`}
            id={`faq-tab-${idx}`}
            onClick={() => setActiveTab(idx)}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 border-2 px-4 py-2 font-semibold transition-all
              ${
                activeTab === idx
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-transparent text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panels */}
      {tabs.map((tab, idx) => (
        <div
          key={tab}
          id={`faq-panel-${idx}`}
          role="tabpanel"
          aria-labelledby={`faq-tab-${idx}`}
          hidden={activeTab !== idx}
          className={activeTab === idx ? "block" : "hidden"}
        >
          <div className="flex flex-col gap-4">
            {categories[tab].map((it, i) => {
              const key = `${idx}-${i}`;
              const isOpen = openSet.has(key);
              return (
                <article
                  key={key}
                  aria-labelledby={`faq-q-${idx}-${i}`}
                  className="bg-white/5 dark:bg-slate-800 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <h3 id={`faq-q-${idx}-${i}`} className="text-lg font-medium">
                      {it.question}
                    </h3>

                    <button
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${idx}-${i}`}
                      onClick={() => toggle(idx, i)}
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
                    id={`faq-a-${idx}-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${idx}-${i}`}
                    className={`mt-3 text-sm leading-relaxed ${isOpen ? "block" : "hidden"}`}
                  >
                    {it.answer}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}