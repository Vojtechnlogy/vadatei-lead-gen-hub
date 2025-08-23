import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

type FaqItem = { question: string; answer: string };

const CATEGORIES: Record<string, FaqItem[]> = {
  Services: [
    {
      question: "What does an IT consultant do?",
      answer:
        "An IT consultant assesses your technology, recommends improvements, designs solutions and helps implement strategic projects to meet business goals.",
    },
    {
      question: "Why should my business hire an IT consultant?",
      answer:
        "A consultant brings experience and objectivity to solve technical problems faster, reduce risk, optimise costs and align IT with your business strategy.",
    },
    {
      question: "Can you help integrate new software into my current systems?",
      answer:
        "Yes — we design integration patterns, build connectors, plan data migrations and validate end‑to‑end workflows to ensure smooth adoption.",
    },
  ],
  "Locations & Availability": [
    {
      question: "Where are your services available?",
      answer:
        "We are based out of Ostrava and serve clients across the Czech Republic and EU; onsite visits available where needed.",
    },
    {
      question: "Do you offer remote IT consulting?",
      answer:
        "Yes — most work can be done remotely; we combine remote collaboration with onsite visits for workshops or deployments.",
    },
    {
      question: "How quickly can we start working together?",
      answer:
        "Initial discovery within days, proposal in 1–2 weeks, project start once scope and terms are agreed.",
    },
  ],
  "Process & Onboarding": [
    {
      question: "What is your consulting process like?",
      answer:
        "We start with discovery, define goals, design solutions, implement in phases and validate results with KPIs and knowledge transfer to your team.",
    },
    {
      question: "Do you provide one-time consultations or ongoing support?",
      answer:
        "Both — one‑off advisory sessions, project engagements and retainer-based ongoing support as needed.",
    },
    {
      question: "Do you offer a free consultation?",
      answer:
        "Yes — a short introductory consultation to understand needs and propose next steps at no charge.",
    },
  ],
  "Security & Trust": [
    {
      question: "Can you help with cybersecurity audits?",
      answer:
        "Yes — security assessments, vulnerability reviews, policy audits and remediation guidance are available.",
    },
    {
      question: "Do you sign NDAs with clients?",
      answer:
        "Yes — we sign NDAs to protect confidential information before detailed discussions or access to sensitive data.",
    },
    {
      question: "How do you ensure my company’s data stays secure?",
      answer:
        "We follow security best practices, use encrypted channels, apply least-privilege and help implement controls and policies.",
    },
  ],
  "Results & ROI": [
    {
      question: "How will IT consulting improve my business?",
      answer:
        "Consulting improves efficiency, reduces downtime, enables better decisions and aligns tech investments with business objectives.",
    },
    {
      question: "Can you help reduce IT costs?",
      answer:
        "Yes — via optimisation, consolidation, automation and cost‑effective cloud/licensing strategies to lower TCO.",
    },
    {
      question: "What ROI can I expect from working with you?",
      answer:
        "ROI varies by project; we define measurable KPIs during discovery and focus on tangible outcomes.",
    },
  ],
};

export default function FAQ(): JSX.Element {
  const tabs = Object.keys(CATEGORIES);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openSet, setOpenSet] = useState<Set<string>>(() => new Set()); // keys: `${tabIndex}-${itemIndex}`

  const toggle = (t: number, i: number) => {
    const key = `${t}-${i}`;
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const allItems = tabs.flatMap((tab) => CATEGORIES[tab]);
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
        <h2 className="text-3xl font-semibold text-center">Frequently Asked Questions</h2>
      </div>

      {/* Tab list */}
      <div role="tablist" aria-label="FAQ categories" className="flex gap-2 justify-center mb-6 flex-wrap">
        {tabs.map((t, idx) => (
          <button
            key={t}
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
            {t}
          </button>
        ))}
      </div>

      {/* Panels */}
      {tabs.map((t, idx) => (
        <div
          key={t}
          id={`faq-panel-${idx}`}
          role="tabpanel"
          aria-labelledby={`faq-tab-${idx}`}
          hidden={activeTab !== idx}
          className={activeTab === idx ? "block" : "hidden"}
        >
          <div className="flex flex-col gap-4">
            {CATEGORIES[t].map((it, i) => {
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