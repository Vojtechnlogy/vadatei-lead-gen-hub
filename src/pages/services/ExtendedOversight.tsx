import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, Users, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { localizedPath } from "../../lib/localize";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";

const ExtendedOversight = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    "Post-implementation reviews",
    "Leadership and team coaching",
    "Process audits & optimization",
    "Continuous improvement sessions",
    "Sustainment planning",
    "Performance monitoring",
    "Strategic guidance"
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
            onClick={() => navigate(localizedPath())}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("privacy.backToHome")}
          </Button>
          <h1 className="text-4xl font-heading font-bold">{t("services.extended-oversight.title")}</h1>
          <p className="text-white/90 mt-2">{t("services.extended-oversight.description")}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none font-body">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("serviceModal.overviewTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.extended-oversight.fullDescription")}
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Ensure your transformation investments deliver lasting value. Our extended oversight services provide 
              ongoing strategic guidance, performance optimization, and continuous improvement to sustain your organizational changes.
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
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Comprehensive Oversight Framework</h2>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">Risk Mitigation</h3>
                    <p className="text-foreground leading-relaxed">
                      Proactive identification and management of potential setbacks or challenges.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">Performance Optimization</h3>
                    <p className="text-foreground leading-relaxed">
                      Continuous monitoring and enhancement of key performance indicators.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">Leadership Development</h3>
                    <p className="text-foreground leading-relaxed">
                      Ongoing coaching and capability building for sustained leadership excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">The Value of Ongoing Partnership</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Short-term Benefits</h3>
                <ul className="list-disc pl-6 text-foreground">
                  <li>Immediate issue resolution</li>
                  <li>Process optimization</li>
                  <li>Team alignment</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Long-term Impact</h3>
                <ul className="list-disc pl-6 text-foreground">
                  <li>Sustainable transformation</li>
                  <li>Cultural evolution</li>
                  <li>Competitive advantage</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Why Choose Extended Oversight?</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="bg-muted p-4 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Flexible Engagement</h3>
                <p className="text-foreground">Scalable support based on your needs</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Risk Protection</h3>
                <p className="text-foreground">Safeguard your transformation investment</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Continuous Growth</h3>
                <p className="text-foreground">Ongoing optimization and improvement</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ExtendedOversight;