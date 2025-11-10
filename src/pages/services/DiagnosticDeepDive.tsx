import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, Users, Building } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { localizedPath } from "../../lib/localize";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";

const DiagnosticDeepDive = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const features = [
    "Organizational assessment",
    "Stakeholder interviews", 
    "Readiness evaluation",
    "Gap and risk analysis",
    "Transformation roadmap",
    "Implementation recommendations"
  ];

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
          <p className="text-white/90 mt-2">{t("services.diagnostic-deep-dive.description")}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none font-body">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("serviceModal.overviewTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.diagnostic-deep-dive.fullDescription")}
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Our comprehensive diagnostic process helps organizations identify critical gaps, 
              assess readiness for change, and develop actionable roadmaps for transformation success.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("serviceModal.featuresTitle")}</h2>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Why Choose Our Diagnostic Approach?</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="bg-muted p-4 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Fast Results</h3>
                <p className="text-foreground">Actionable insights within 2-4 weeks</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Expert Analysis</h3>
                <p className="text-foreground">30+ years of transformation experience</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <Building className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Proven Methods</h3>
                <p className="text-foreground">Evidence-based diagnostic framework</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DiagnosticDeepDive;