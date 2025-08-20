import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart3, Map, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

const Process = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      number: "01",
      titleKey: "process.steps.audit.title",
      descKey: "process.steps.audit.description",
    },
    {
      icon: BarChart3,
      number: "02",
      titleKey: "process.steps.strategy.title",
      descKey: "process.steps.strategy.description",
    },
    {
      icon: Map,
      number: "03",
      titleKey: "process.steps.roadmap.title",
      descKey: "process.steps.roadmap.description",
    },
    {
      icon: Rocket,
      number: "04",
      titleKey: "process.steps.deployment.title",
      descKey: "process.steps.deployment.description",
    },
  ];

  return (
    <section id="process" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            {t("process.heading")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            {t("process.subhead")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-2 h-full">
                <CardContent className="p-8 text-center relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </CardContent>
              </Card>

              {/* Connection Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-primary/20"></div>
              )}
            </div>
          ))}

          {/* Guidance & Collaboration Card */}
          <div className="relative">
            <Card className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-2 h-full">
              <CardContent className="p-8 text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">
                    &#8734;
                  </div>
                </div>
                {/* Icon (Lucide Users) */}
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                  <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  {t("process.guidance.title")}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed italic mb-2">
                  {t("process.guidance.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-20 bg-gradient-corporate rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-heading font-bold text-white mb-6">
            {t("process.benefits.heading")}
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">100%</div>
              <div className="text-white/90 font-body">{t("process.benefits.item1")}</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">30+</div>
              <div className="text-white/90 font-body">{t("process.benefits.item2")}</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">500+</div>
              <div className="text-white/90 font-body">{t("process.benefits.item3")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;