import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Route,
  UserStar,
  Users,
  LayoutList,
  TrendingUp,
  ArrowRight,
  Gift,
  Check,
  Search,
  BarChart3,
  Rocket,
  Map as LucideMap,
} from "lucide-react";
import ServiceModal from "./ServiceModal";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ServicesProps {
  onBookingClick: () => void;
  initialServiceId?: string | null;
}

const Services = ({ onBookingClick, initialServiceId }: ServicesProps) => {
      // Import Helmet for SEO structured data injection
      // ...existing code...
    // State for swipable process steps
    const [activeStep, setActiveStep] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState<'up' | 'down' | null>(null);

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServiceId || null);
  const { t, i18n } = useTranslation();

  // Update selectedServiceId when initialServiceId changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  const services = [
    { id: "diagnostic-deep-dive", icon: Search, image: "/assets/digital-transformation.jpg" },
    { id: "targeted-transformation", icon: Route, image: "/assets/digital-transformation.jpg" },
    { id: "extended-oversight", icon: UserStar, image: "/assets/hero-consulting.jpg" },
  ];

  const openService = (id: string) => setSelectedServiceId(id);
  const closeService = () => setSelectedServiceId(null);

  const getServiceObject = (id: string | null) => {
    if (!id) return null;
    const svc = services.find((s) => s.id === id)!;
    
    // Use the same robust feature loading logic
    let features: string[] = [];
    
    const rawFeatures = t(`services.${id}.features`, { returnObjects: true });
    console.log(`Modal - Raw features for ${id}:`, rawFeatures);
    
    if (Array.isArray(rawFeatures)) {
      features = rawFeatures as string[];
    } else {
      // Fallback: hardcode the features for the modal too
      if (id === 'diagnostic-deep-dive') {
        features = [
          "Organization assessment & culture scan",
          "Stakeholder interviews for insight",
          "Change readiness evaluation",
          "Gap and risk analysis",
          "Strategic transformation roadmap"
        ];
      } else if (id === 'targeted-transformation') {
        features = [
          "Change planning",
          "Alignment workshops",
          "Governance setup",
          "Communication strategy",
          "Capability and culture development",
          "Adoption tracking",
          "Full Implementation oversight"
        ];
      } else if (id === 'extended-oversight') {
        features = [
          "Post-implementation reviews",
          "Leadership and team coaching",
          "Process audits & optimization", 
          "Continuous improvement sessions",
          "Sustainment planning"
        ];
      }
    }
    
    return {
      id,
      title: t(`services.${id}.title`),
      description: t(`services.${id}.description`),
      features: features,
      fullDescription: t(`services.${id}.fullDescription`),
      icon: svc.icon,
      image: svc.image,
    };
  };

  // Structured data for SEO
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Organization",
      "name": "Vadatei",
      "description": t("organization.description"),
      "url": "https://vadatei.com/",
      "logo": "https://vadatei.com/favicon.ico",
      "sameAs": [
        "https://www.linkedin.com/in/marek-tolasz/"
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": t("services.sectionTitle"),
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": t(`services.${service.id}.title`),
          "description": t(`services.${service.id}.description`),
          "image": service.image,
          "provider": {
            "@type": "Organization",
            "name": "Vadatei",
            "description": t("organization.description")
          },
          "areaServed": ["Europe", "EU", "Czech Republic", "Germany", "Netherlands", "Austria", "Slovakia", "Poland", "Switzerland"],
          "serviceType": "Business Consulting",
          "category": "Change Management",
          "audience": {
            "@type": "Audience",
            "audienceType": "Business"
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString().split('T')[0],
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "Price on request",
              "priceCurrency": "EUR"
            }
          }
        }
      }))
    }
  };

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vadatei.com/"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": t("services.sectionTitle"),
        "item": "https://vadatei.com/#services"
      }
    ]
  };

  // Process steps data
  const processSteps = [{
    icon: Search,
    number: "01",
    titleKey: "process.steps.audit.title",
    descKey: "process.steps.audit.description",
  }, {
    icon: BarChart3,
    number: "02",
    titleKey: "process.steps.strategy.title",
    descKey: "process.steps.strategy.description",
  }, {
    icon: LucideMap,
    number: "03",
    titleKey: "process.steps.roadmap.title",
    descKey: "process.steps.roadmap.description",
  }, {
    icon: Rocket,
    number: "04",
    titleKey: "process.steps.deployment.title",
    descKey: "process.steps.deployment.description",
  }, {
    icon: Users,
    number: "∞",
    titleKey: "process.guidance.title",
    descKey: "process.guidance.description",
    guidance: true,
  }];

  const handleStepChange = (direction: "up" | "down") => {
    if (animating) return;
    setAnimationDirection(direction);
    setAnimating(true);
    setTimeout(() => {
      setActiveStep((prev) => {
        if (direction === "up") {
          return prev > 0 ? prev - 1 : prev;
        } else {
          return prev < processSteps.length - 1 ? prev + 1 : prev;
        }
      });
      setAnimating(false);
    }, 300); // Animation duration
  };

  // Use Helmet for SEO structured data injection
  const Helmet = require('react-helmet-async').Helmet;
  return (
    <section id="services" className="py-20 bg-corporate-light">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(servicesJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          {/* Section title above SVG, always centered */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">
              {t("services.sectionTitle")}
            </h2>
          </div>
          {/* Responsive flex: row on lg+, column on mobile/tablet */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
            {/* Infographic left on desktop, centered on mobile */}
            <div className="bg-corporate-light p-4 sm:p-8 rounded-lg flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
              <img 
                src={i18n.language === 'cz' 
                  ? '/assets/Czech_Grapphic.svg' 
                  : i18n.language === 'de' 
                    ? '/assets/German_Graphic.svg' 
                    : '/assets/English_Graphic.svg'} 
                alt="Vadatei Transformation Model Infographic"
                className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] rounded-lg bg-corporate-light block"
                style={{ display: 'block' }}
              />
            </div>
            {/* Process steps vertically next to infographic */}
            <div className="flex flex-col justify-center lg:justify-start w-full lg:w-[520px]">
              <p className="text-xl text-muted-foreground max-w-2xl font-body mt-2 mb-6 mx-auto text-center lg:text-left">
                {t("services.processIntro", "Our transformation process is designed to guide your organization from initial assessment to lasting results. Each step builds on the previous, ensuring clarity, alignment, and sustainable change.")}
              </p>
              {/* Swipable Process Step */}
              <div className="flex flex-col items-center gap-4">
                <div
                  className={`flex items-start gap-4 group w-full transition-all duration-300
                    ${animating ? (animationDirection === 'down' ? 'opacity-0 translate-y-8' : 'opacity-0 -translate-y-8') : 'opacity-100 translate-y-0'}`}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <div className="w-16 h-16 mb-2">
                    <div className="w-16 h-16 bg-gradient-corporate rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
                      {processSteps[activeStep].icon ? (
                        React.createElement(processSteps[activeStep].icon, { className: "h-8 w-8 text-white transition-all duration-300 group-hover:scale-110" })
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-heading font-bold text-primary mb-1${processSteps[activeStep].guidance ? '' : ''}`}>
                      {t(processSteps[activeStep].titleKey)}
                    </h4>
                    <p className={`text-muted-foreground font-body leading-relaxed${processSteps[activeStep].guidance ? ' italic' : ''}`}>
                      {t(processSteps[activeStep].descKey)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className={`p-2 rounded-full bg-corporate-light border border-primary text-primary transition disabled:opacity-40 disabled:cursor-not-allowed`}
                    onClick={() => handleStepChange("up")}
                    disabled={activeStep === 0 || animating}
                    aria-label="Previous step"
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 15 12 9 18 15"/></svg>
                  </button>
                  <button
                    className={`p-2 rounded-full bg-corporate-light border border-primary text-primary transition disabled:opacity-40 disabled:cursor-not-allowed`}
                    onClick={() => handleStepChange("down")}
                    disabled={activeStep === processSteps.length - 1 || animating}
                    aria-label="Next step"
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {activeStep + 1} / {processSteps.length}
                </div>
              </div>
            </div>
          </div>
          {/* Tailor Made Services title below infographic, always centered */}
          <div className="text-center mt-8 mb-10">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Services Tailored to Your Organization
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((service) => {
            // Use robust feature loading logic with debugging
            let features: string[] = [];
            
            // First, let's try the simple approach
            const rawFeatures = t(`services.${service.id}.features`, { returnObjects: true });
            console.log(`Raw features for ${service.id}:`, rawFeatures);
            
            if (Array.isArray(rawFeatures)) {
              features = rawFeatures as string[];
              console.log(`Successfully loaded ${features.length} features for ${service.id}`);
            } else {
              console.warn(`Features not loaded as array for ${service.id}, got:`, typeof rawFeatures, rawFeatures);
              // Fallback: hardcode the features to ensure they show up
              if (service.id === 'diagnostic-deep-dive') {
                features = [
                  "Organizational assessment & culture scan",
                  "Stakeholder interviews for insight & buy-in",
                  "Change readiness evaluation",
                  "Gap and risk analysis",
                  "Strategic transformation roadmap"
                ];
              } else if (service.id === 'targeted-transformation') {
                features = [
                  "Change planning",
                  "Alignment workshops",
                  "Governance setup",
                  "Communication strategy",
                  "Capability and culture development",
                  "Adoption tracking",
                  "Full Implementation oversight"
                ];
              } else if (service.id === 'extended-oversight') {
                features = [
                  "Post-implementation reviews",
                  "Leadership and team coaching", 
                  "Process audits & optimization",
                  "Continuous improvement sessions",
                  "Sustainment planning"
                ];
              }
            }
            
            return (
              <Card key={service.id} className="border-none shadow-card transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col">
                <CardContent className="p-8 flex flex-col h-full">
                  <header className="w-16 h-16 bg-corporate-light rounded-lg flex items-center justify-center mb-6 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </header>

                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                    {t(`services.${service.id}.title`)}
                  </h3>

                  <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                    {t(`services.${service.id}.description`)}
                  </p>

                  {/* What's Included subtitle and separator */}
                  <div className="flex items-center gap-2 mb-3 mt-2">
                    <h4 className="text-lg font-heading font-semibold text-primary">What's Included: </h4>
                  </div>
                  <Separator className="mb-4 bg-primary/20" />

                  <section className="mb-6">
                    <ul className="space-y-3" role="list">
                      {(features || []).map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground font-body leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="flex-1" />
                  <Button
                    variant="corporate-outline"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all mt-auto"
                    onClick={() => openService(service.id)}
                    aria-label={`Learn more about ${t(`services.${service.id}.title`)}`}
                  >
                    {t("services.moreInfoButton")}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-corporate rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              {t("services.cta.title")}
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-body">
              {t("services.cta.body")}
            </p>
            <Button
              variant="corporate-outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={onBookingClick}
            >
              {t("services.cta.button")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Service Modal: only render when we can build a service object */}
      {(() => {
        const modalService = getServiceObject(selectedServiceId);
        return modalService ? (
          <ServiceModal
            service={modalService}
            isOpen={!!selectedServiceId}
            onClose={closeService}
          />
        ) : null;
      })()}
    </section>
  );
};

export default Services;