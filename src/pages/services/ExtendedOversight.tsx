import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Clock, Users, Building, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedPath } from "../../lib/localize";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ExtendedOversight = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Post-implementation reviews",
    "Leadership and team coaching",
    "Process audits & optimization",
    "Continuous improvement sessions",
    "Sustainment planning",
    "Performance monitoring",
    "Strategic guidance"
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
              {t("services.extended-oversight.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-body leading-relaxed">
              {t("services.extended-oversight.description")}
            </p>
            <p className="text-lg text-white/80 font-body italic">
              {t("services.extended-oversight.subtitle")}
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
                {t("services.extended-oversight.fullDescription")}
              </p>
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                Ensure your transformation investments deliver lasting value. Our extended oversight services provide 
                ongoing strategic guidance, performance optimization, and continuous improvement to sustain your organizational changes.
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

            {/* Oversight Framework */}
            <section className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                Our Comprehensive Oversight Framework
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">Risk Mitigation</h4>
                    <p className="text-sm text-muted-foreground">Proactive identification and management of potential setbacks or challenges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">Performance Optimization</h4>
                    <p className="text-sm text-muted-foreground">Continuous monitoring and enhancement of key performance indicators.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">Leadership Development</h4>
                    <p className="text-sm text-muted-foreground">Ongoing coaching and capability building for sustained leadership excellence.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Value Proposition */}
            <section className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                The Value of Ongoing Partnership
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-heading font-semibold text-gray-900 mb-3">Short-term Benefits</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Immediate issue resolution
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Process optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Team alignment
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-gray-900 mb-3">Long-term Impact</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Sustainable transformation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Cultural evolution
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Competitive advantage
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Trust Indicators */}
            <section className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                Why Choose Extended Oversight?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-gray-900 mb-2">Flexible Engagement</h4>
                  <p className="text-sm text-muted-foreground">Scalable support based on your needs</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-gray-900 mb-2">Risk Protection</h4>
                  <p className="text-sm text-muted-foreground">Safeguard your transformation investment</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-heading font-semibold text-gray-900 mb-2">Continuous Growth</h4>
                  <p className="text-sm text-muted-foreground">Ongoing optimization and improvement</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Form Card */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                  {t("serviceModal.headings.extended-oversight")}
                </h3>
                <p className="text-sm text-primary/80 font-body italic mb-6">
                  {t("services.extended-oversight.subtitle")}
                </p>
                
                <div className="space-y-4">
                  <Button variant="cta" className="w-full" size="lg">
                    Explore Oversight Options
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Schedule a Partnership Call
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-muted-foreground text-center">
                    Protect your transformation investment with ongoing support
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

export default ExtendedOversight;