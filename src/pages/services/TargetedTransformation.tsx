import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Users, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { localizedPath } from "../../lib/localize";
import { useTranslation } from "react-i18next";

const TargetedTransformation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    "Change planning",
    "Alignment workshops",
    "Governance setup", 
    "Communication strategy",
    "Capability and culture development",
    "Adoption tracking",
    "Full Implementation oversight"
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          <h1 className="text-4xl font-heading font-bold">{t("services.targeted-transformation.title")}</h1>
          <p className="text-white/90 mt-2">{t("services.targeted-transformation.description")}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none font-body">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("serviceModal.overviewTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("services.targeted-transformation.fullDescription")}
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Transform your strategy into measurable results with our comprehensive implementation approach. 
              We guide your organization through every step of the transformation journey, ensuring sustainable change and lasting impact.
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
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Proven Transformation Process</h2>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">1. Strategic Alignment</h3>
                <p className="text-foreground leading-relaxed">
                  Align leadership, stakeholders, and organizational objectives for unified direction.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">2. Implementation Planning</h3>
                <p className="text-foreground leading-relaxed">
                  Develop detailed roadmaps with clear milestones, timelines, and success metrics.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">3. Change Execution</h3>
                <p className="text-foreground leading-relaxed">
                  Execute transformation initiatives with continuous monitoring and adaptive management.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Why Our Implementation Approach Works</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="bg-muted p-4 rounded-lg">
                <Target className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Focused Results</h3>
                <p className="text-foreground">Clear outcomes and measurable success</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">People-Centered</h3>
                <p className="text-foreground">Emphasis on culture and capability building</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <Building className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">Sustainable Change</h3>
                <p className="text-foreground">Long-term transformation that sticks</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TargetedTransformation;