import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
import { trackCtaClick, trackEvent } from "@/lib/analytics";

interface ServicesProps {
  onBookingClick: () => void;
  initialServiceId?: string | null;
}

const Services = ({ onBookingClick, initialServiceId }: ServicesProps) => {
  // State for swipable process steps
  const [activeStep, setActiveStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"up" | "down" | null>(null);

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

  const getArray = (key: string, lng?: string): string[] => {
    const value = t(key, {
      returnObjects: true,
      lng,
      defaultValue: [] as unknown as string[],
    }) as unknown;
    return Array.isArray(value) ? value.map((v) => String(v)) : [];
  };

  const getArrayWithEnFallback = (key: string): string[] => {
    const current = getArray(key);
    if (current.length) return current;
    return getArray(key, "en");
  };

  const getFeaturesForService = (id: string): string[] => {
    // Prefer the standardized schema, but keep backwards-compatible fallback.
    const includes = getArrayWithEnFallback(`services.${id}.includes`);
    if (includes.length) return includes;
    return getArrayWithEnFallback(`services.${id}.features`);
  };

  const getServiceObject = (id: string | null) => {
    if (!id) return null;
    const svc = services.find((s) => s.id === id)!;

    const features = getFeaturesForService(id);
    
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

  const resolvedLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const merchantListingJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vadatei.com/#organization",
        "name": "Vadatei",
        "url": "https://vadatei.com/",
        "logo": "https://vadatei.com/favicon.ico",
        "description": t("organization.description"),
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 10
        },
        "areaServed": ["Europe", "DE", "NL"],
        "address": (() => {
          const street = t("organization.hqAddress.street", { defaultValue: "" }).trim();
          const city = t("organization.hqAddress.city", { defaultValue: "" }).trim();
          const postalCode = t("organization.hqAddress.postalCode", { defaultValue: "" }).trim();
          const country = t("organization.hqAddress.country", { defaultValue: "" }).trim();

          if (street && city && postalCode && country) {
            return {
              "@type": "PostalAddress",
              "streetAddress": street,
              "addressLocality": city,
              "postalCode": postalCode,
              "addressCountry": country,
            };
          }
          return undefined;
        })(),
        "sameAs": ["https://www.linkedin.com/in/marek-tolasz/"],
      },
      {
        "@type": "WebSite",
        "@id": "https://vadatei.com/#website",
        "url": "https://vadatei.com/",
        "name": "Vadatei",
        "publisher": { "@id": "https://vadatei.com/#organization" },
        "inLanguage": resolvedLanguage,
      },
      {
        "@type": "WebPage",
        "@id": "https://vadatei.com/#webpage",
        "url": "https://vadatei.com/",
        "name": t("services.sectionTitle"),
        "isPartOf": { "@id": "https://vadatei.com/#website" },
        "about": { "@id": "https://vadatei.com/#organization" },
        "inLanguage": resolvedLanguage,
      },
    ],
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
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 10
      },
      "areaServed": ["Europe", "DE", "NL"],
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
            "description": t("organization.description"),
            "areaServed": ["Europe", "DE", "NL"]
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
  return (
    <section id="services" className="py-20 bg-corporate-light">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(merchantListingJsonLd)}</script>
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
            <div className="flex flex-col justify-center lg:justify-start lg:pt-16 xl:pt-16 w-full lg:w-[520px]">
              <p className="text-xl text-muted-foreground max-w-2xl font-body mt-2 mb-6 mx-auto text-center lg:text-left">
                {t("services.processIntro", "Our transformation process is designed to guide your organization from initial assessment to lasting results. Each step builds on the previous, ensuring clarity, alignment, and sustainable transformation.")}
              </p>
              {/* Swipable Process Step */}
              <div className="flex flex-col items-center gap-4 mt-8 lg:mt-20">
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
            const features = getFeaturesForService(service.id);

            const duration = t(`services.${service.id}.timelineTable.duration`, { defaultValue: "" });
            const price = t(`services.${service.id}.pricing.amount`, { defaultValue: "" });

            const includedHeading = t("serviceModal.whatsIncluded", {
              defaultValue: "What this looks like in practice",
            });

            const isLeadership = service.id === "extended-oversight";
            const rolesTitleKey = `services.${service.id}.rolesCovered.title`;
            const rolesItemsKey = `services.${service.id}.rolesCovered.items`;
            const rolesTitle = isLeadership
              ? t(rolesTitleKey, { defaultValue: t(rolesTitleKey, { lng: "en", defaultValue: "" }) })
              : "";
            let rolesItems = isLeadership
              ? (t(rolesItemsKey, { returnObjects: true }) as unknown)
              : [];
            if (isLeadership && (!Array.isArray(rolesItems) || rolesItems.length === 0)) {
              rolesItems = t(rolesItemsKey, { returnObjects: true, lng: "en" }) as unknown;
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

                  {isLeadership && Array.isArray(rolesItems) && rolesItems.length > 0 && (
                    <section className="mb-6">
                      <div className="flex items-center gap-2 mb-3 mt-2">
                        <h4 className="text-lg font-heading font-semibold text-primary">{rolesTitle || "Typical roles covered"}:</h4>
                      </div>
                      <Separator className="mb-4 bg-primary/20" />
                      <ul className="mt-3 list-disc pl-6 text-muted-foreground font-body space-y-2" role="list">
                        {rolesItems.map((item, index) => (
                          <li key={index}>{String(item)}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* What's Included subtitle and separator */}
                  <div className="flex items-center gap-2 mb-3 mt-2">
                    <h4 className="text-lg font-heading font-semibold text-primary">{includedHeading}: </h4>
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

                  {(duration || price) && (
                    <div className="mb-6 rounded-lg border border-border bg-background/60 p-4">
                      {price && (
                        <p className="text-xs font-body text-muted-foreground italic mb-2">
                          {t(
                            "serviceModal.transparentPricingNote",
                            "We’re proud to offer 100% transparent pricing—no surprises, no hidden fees."
                          )}
                        </p>
                      )}
                      {duration && (
                        <p className="text-sm font-body text-muted-foreground">
                          <span className="font-semibold text-foreground">{t("serviceModal.duration")}</span> {duration}
                        </p>
                      )}
                      {price && (
                        <div className="space-y-1">
                          <p className="text-sm font-body text-muted-foreground">
                            <span className="font-semibold text-foreground">{t("serviceModal.pricing")}: </span>
                            {price}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    variant="corporate-outline"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all mt-auto"
                    onClick={() => {
                      trackEvent("service_more_info_click", {
                        service_id: service.id,
                        service_title: t(`services.${service.id}.title`),
                        click_location: "services_grid",
                      });
                      openService(service.id);
                    }}
                    aria-label={`Learn more about ${t(`services.${service.id}.title`)}`}
                  >
                    {t(`services.${service.id}.moreInfoButton`, {
                      defaultValue: t("services.moreInfoButton"),
                    })}
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
              className="border-white text-white hover:bg-white hover:text-primary whitespace-normal h-auto py-3 leading-snug text-center max-w-full flex-wrap"
              onClick={() => {
                trackCtaClick("book_consultation", "services_cta");
                onBookingClick();
              }}
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