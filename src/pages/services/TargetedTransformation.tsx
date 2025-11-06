import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Clock, Users, Building, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedPath } from "../../lib/localize";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TargetedTransformation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Change planning",
    "Alignment workshops",
    "Governance setup", 
    "Communication strategy",
    "Capability and culture development",
    "Adoption tracking",
    "Full Implementation oversight"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onBookingClick={() => {}} />
      
      {/* Hero Section */}
      <section className="bg-gradient-corporate text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate(localizedPath())}
            className="text-white hover:bg-white/10 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("privacy.backToHome")}
          </Button>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {t("services.targeted-transformation.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-body leading-relaxed">
              {t("services.targeted-transformation.description")}
            </p>
            <p className="text-lg text-white/80 font-body italic">
              {t("services.targeted-transformation.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                {t("serviceModal.overviewTitle")}
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                {t("services.targeted-transformation.fullDescription")}
              </p>
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                Transform your strategy into measurable results with our comprehensive implementation approach. 
                We guide your organization through every step of the transformation journey, ensuring sustainable change and lasting impact.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                {t("serviceModal.featuresTitle")}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-body">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Transformation Process */}
            <section className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                Our Proven Transformation Process
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">Strategic Alignment</h4>
                    <p className="text-sm text-muted-foreground">Align leadership, stakeholders, and organizational objectives for unified direction.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">Implementation Planning</h4>
                    <p className="text-sm text-muted-foreground">Develop detailed roadmaps with clear milestones, timelines, and success metrics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">Change Execution</h4>
                    <p className="text-sm text-muted-foreground">Execute transformation initiatives with continuous monitoring and adaptive management.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Indicators */}
            <section className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                Why Our Implementation Approach Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-gray-900 mb-2">Focused Results</h4>
                  <p className="text-sm text-muted-foreground">Clear outcomes and measurable success</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-gray-900 mb-2">People-Centered</h4>
                  <p className="text-sm text-muted-foreground">Emphasis on culture and capability building</p>
                </div>
                <div className="text-center">
                  <Building className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-gray-900 mb-2">Sustainable Change</h4>
                  <p className="text-sm text-muted-foreground">Long-term transformation that sticks</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Form Card */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                  {t("serviceModal.headings.targeted-transformation")}
                </h3>
                <p className="text-sm text-primary/80 font-body italic mb-6">
                  {t("services.targeted-transformation.subtitle")}
                </p>
                
                <div className="space-y-4">
                  <Button variant="cta" className="w-full" size="lg">
                    Start Your Transformation
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Schedule a Strategy Session
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-muted-foreground text-center">
                    Ready to turn strategy into action? Let's talk.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onBookingClick={() => {}} />
    </div>
  );
};

export default TargetedTransformation;