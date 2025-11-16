import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { localizedPath } from "../../lib/localize";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";

const DiagnosticDeepDive = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header onBookingClick={() => {}} />
      
      {/* Page Header */}
      <header className="bg-primary text-white py-6 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => {
              const fromService = searchParams.get('from');
              const currentLang = i18n.language || 'en';
              if (fromService) {
                // Navigate back to homepage with service modal parameter and scroll to services section
                const targetUrl = `${localizedPath()}?service=${fromService}`;
                navigate(targetUrl);
                
                // Force scroll to services section after navigation
                setTimeout(() => {
                  window.location.hash = 'services';
                }, 100);
              } else {
                // Fallback to regular back navigation
                navigate(-1);
              }
            }}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("privacy.back")}
          </Button>
          <h1 className="text-4xl font-heading font-bold">{t("services.diagnostic-deep-dive.title")}</h1>
          <p className="text-white/90 mt-2">{t("services.diagnostic-deep-dive.pageSubtitle")}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none font-body">
          {/* Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">🔷 {t("serviceModal.overviewTitle")}</h2>
            <p className="text-foreground leading-relaxed">
              {t("services.diagnostic-deep-dive.overview")}
            </p>
          </section>

          {/* Why It Matters */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.whyItMatters.title")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.diagnostic-deep-dive.whyItMatters.intro")}
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.diagnostic-deep-dive.whyItMatters.description")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
              {(t("services.diagnostic-deep-dive.whyItMatters.items", { returnObjects: true }) as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-foreground leading-relaxed">
              {t("services.diagnostic-deep-dive.whyItMatters.conclusion")}
            </p>
          </section>

          {/* What You Get - Deliverables */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.deliverables.title")}</h2>
            <p className="text-foreground leading-relaxed mb-6">
              {t("services.diagnostic-deep-dive.deliverables.subtitle")}
            </p>
            {(t("services.diagnostic-deep-dive.deliverables.items", { returnObjects: true }) as Array<{number: string, title: string, description: string}>).map((item, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                  🔹 {item.number}. {item.title}
                </h3>
                <p className="text-foreground leading-relaxed pl-6">
                  {item.description}
                </p>
              </div>
            ))}
          </section>

          {/* How It Works - Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.process.title")}</h2>
            {(t("services.diagnostic-deep-dive.process.steps", { returnObjects: true }) as Array<{number: string, title: string, description: string, output: string}>).map((step, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                  STEP {step.number} — {step.title}
                </h3>
                <p className="text-foreground leading-relaxed mb-2">
                  {step.description}
                </p>
                <p className="text-foreground/70 italic text-sm">
                  Output: {step.output}
                </p>
              </div>
            ))}
          </section>

          {/* Timeline & Effort */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("serviceModal.timelineEffort")}</h2>
            <div className="bg-muted p-6 rounded-lg">
              <table className="w-full text-foreground">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 font-semibold">Duration</td>
                    <td className="py-2">{t("services.diagnostic-deep-dive.timelineTable.duration")}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-semibold">Effort</td>
                    <td className="py-2">{t("services.diagnostic-deep-dive.timelineTable.effort")}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-semibold">Meetings</td>
                    <td className="py-2">{t("services.diagnostic-deep-dive.timelineTable.meetings")}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Deliverables</td>
                    <td className="py-2">{t("services.diagnostic-deep-dive.timelineTable.deliverables")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Investment/Pricing */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ Investment</h2>
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <p className="text-2xl font-heading font-bold text-primary">{t("services.diagnostic-deep-dive.pricing.amount")}</p>
              <p className="text-foreground mt-1">{t("services.diagnostic-deep-dive.pricing.note")}</p>
              <p className="text-foreground mt-2">{t("services.diagnostic-deep-dive.pricing.commitment")}</p>
            </div>
          </section>

          {/* What This Solves */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.whatThisSolves.title")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.diagnostic-deep-dive.whatThisSolves.intro")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
              {(t("services.diagnostic-deep-dive.whatThisSolves.issues", { returnObjects: true }) as string[]).map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
            <p className="text-foreground leading-relaxed italic">
              {t("services.diagnostic-deep-dive.whatThisSolves.conclusion")}
            </p>
          </section>

          {/* Expected Outcomes */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ Expected Outcomes</h2>
            <p className="text-foreground leading-relaxed mb-4">
              After completing the Blueprint, you can expect:
            </p>
            <ul className="space-y-3">
              {(t("services.diagnostic-deep-dive.outcomes", { returnObjects: true }) as string[]).map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Typical Results - Real Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.realExamples.title")}</h2>
            {(t("services.diagnostic-deep-dive.realExamples.examples", { returnObjects: true }) as Array<{title: string, description: string}>).map((example, index) => (
              <div key={index} className="mb-6 bg-muted p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                  🔹 Example #{index + 1} — {example.title}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {example.description}
                </p>
              </div>
            ))}
          </section>

          {/* Signs You Need a Blueprint */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.needsChecklist.title")}</h2>
            <ul className="space-y-3">
              {(t("services.diagnostic-deep-dive.needsChecklist.items", { returnObjects: true }) as string[]).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 h-5 w-5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground leading-relaxed mt-4 italic font-semibold">
              {t("services.diagnostic-deep-dive.needsChecklist.conclusion")}
            </p>
          </section>

          {/* Why Vadatei */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.whyVadatei.title")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.diagnostic-deep-dive.whyVadatei.intro")}
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.diagnostic-deep-dive.whyVadatei.strengths")}
            </p>
            <ul className="space-y-3 mb-4">
              {(t("services.diagnostic-deep-dive.whyVadatei.points", { returnObjects: true }) as string[]).map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground leading-relaxed">
              {t("services.diagnostic-deep-dive.whyVadatei.conclusion")}
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.faq.title")}</h2>
            {(t("services.diagnostic-deep-dive.faq.questions", { returnObjects: true }) as Array<{q: string, a: string}>).map((faq, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                  {faq.q}
                </h3>
                <p className="text-foreground leading-relaxed pl-4">
                  {faq.a}
                </p>
              </div>
            ))}
          </section>

          {/* CTA Section */}
          <section className="mt-12 pt-8 border-t border-border">
            <div className="bg-primary/5 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">⭐ {t("services.diagnostic-deep-dive.cta.title")}</h2>
              <p className="text-foreground mb-6 max-w-2xl mx-auto">
                {t("services.diagnostic-deep-dive.cta.description")}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  size="lg" 
                  className="font-heading"
                  onClick={() => {
                    navigate(`${localizedPath()}#services`);
                  }}
                >
                  {t("services.diagnostic-deep-dive.cta.button")}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="font-heading"
                  onClick={() => {
                    navigate(`${localizedPath()}#services`);
                  }}
                >
                  {t("services.diagnostic-deep-dive.cta.buttonAlt")}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DiagnosticDeepDive;