import { useState } from "react";
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
} from "lucide-react";
import ServiceModal from "./ServiceModal";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ServicesProps {
  onBookingClick: () => void;
}

const Services = ({ onBookingClick }: ServicesProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const services = [
    { id: "diagnostic-deep-dive", icon: Search, image: "/src/assets/digital-transformation.jpg" },
    { id: "targeted-transformation", icon: Route, image: "/src/assets/digital-transformation.jpg" },
    { id: "extended-oversight", icon: UserStar, image: "/src/assets/hero-consulting.jpg" },
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
          "areaServed": ["Europe", "EU", "Czech Republic", "Germany", "Netherlands"],
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

  return (
    <section id="services" className="py-20 bg-corporate-light">
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            {t("services.sectionTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            {t("services.sectionIntro")}
          </p>
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