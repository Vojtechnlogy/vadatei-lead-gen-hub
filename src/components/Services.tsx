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
    { id: "diagnostic-deep-dive", icon: Shield, image: "https://vadatei.com/it-health-check.jpg" },
    { id: "targeted-transformation", icon: Route, image: "https://vadatei.com/digital-transformation.jpg" },
    { id: "extended-oversight", icon: UserStar, image: "https://vadatei.com/cio-as-a-service.jpg" },
  ];

  const openService = (id: string) => setSelectedServiceId(id);
  const closeService = () => setSelectedServiceId(null);

  const getServiceObject = (id: string | null) => {
    if (!id) return null;
    const svc = services.find((s) => s.id === id)!;
    const rawFeatures = t(`services.${id}.features`, { returnObjects: true });
    const features = Array.isArray(rawFeatures)
      ? (rawFeatures as string[])
      : typeof rawFeatures === "string"
      ? [rawFeatures]
      : [];
    return {
      id,
      title: t(`services.${id}.title`),
      description: t(`services.${id}.description`),
      features: features || [],
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
      "url": "https://vadatei.com/"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": t("services.sectionTitle"),
      "itemListElement": services.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": t(`services.${service.id}.title`),
          "description": t(`services.${service.id}.description`),
          "provider": {
            "@type": "Organization",
            "name": "Vadatei"
          },
          "areaServed": i18n.language === "cs" ? "CZ" : i18n.language === "de" ? "DE" : "EU",
          "serviceType": t(`services.${service.id}.title`),
          "image": service.image
        }
      }))
    }
  };

  return (
    <section id="services" className="py-20 bg-corporate-light">
      {/* Service structured data (keep if you want) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {/* Product structured data for all services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            services.map((service) => ({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": t(`services.${service.id}.title`),
              "description": t(`services.${service.id}.description`),
              "image": service.image,
              "brand": {
                "@type": "Brand",
                "name": "Vadatei"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "price": 0,
                  "priceCurrency": "EUR",
                  "priceValidUntil": "2026-08-29",
                  "url": "https://vadatei.com/",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "price": 0,
                  "priceCurrency": "CZK",
                  "priceValidUntil": "2026-08-29",
                  "url": "https://vadatei.com/",
                  "availability": "https://schema.org/InStock"
                }
              ]
            }))
          )
        }}
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
            const rawFeatures = t(`services.${service.id}.features`, { returnObjects: true });
            const features = Array.isArray(rawFeatures)
              ? (rawFeatures as string[])
              : typeof rawFeatures === "string"
              ? [rawFeatures]
              : [];
            return (
              <Card key={service.id} className="border-none shadow-card transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="w-16 h-16 bg-corporate-light rounded-lg flex items-center justify-center mb-6 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                    {t(`services.${service.id}.title`)}
                  </h3>

                  <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                    {t(`services.${service.id}.description`)}
                  </p>

                  {/* What You Receive subtitle with icon and separator */}
                  <div className="flex items-center gap-2 mb-3 mt-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-heading font-semibold text-primary">What You Receive: </h4>
                  </div>
                  <Separator className="mb-4 bg-primary/20" />

                  <div className="mb-6">
                    <ul className="space-y-3">
                      {(features || []).map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground font-body leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1" />
                  <Button
                    variant="corporate-outline"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all mt-auto"
                    onClick={() => openService(service.id)}
                  >
                    {t("services.moreInfoButton")}
                    <ArrowRight className="ml-2 h-4 w-4" />
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