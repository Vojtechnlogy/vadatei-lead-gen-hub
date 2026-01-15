import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, Phone, Building, ArrowRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface Service {
  id: string;
  title: string;
  fullDescription: string;
  features: string[];
  icon: any;
  image?: string;
}

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const { t, i18n } = useTranslation();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    details: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double submit

    setLoading(true);

    // Prepare data in the required order
    const submission = {
      timeStamp: getCentralEuropeanTimestamp(),
      service: service.title,
      fullName: formData.fullName,
      email: formData.email,
      companyName: formData.companyName,
      phone: formData.phone,
      details: formData.details,
      analysisCurrent: "",
      identificationGaps: "",
      priorityServices: "",
      premiumServices: "",
      requestedServices: "",
    };

    const encoded = Object.keys(submission)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(submission[k]))
      .join('&');

    try {
      await fetch('https://script.google.com/macros/s/AKfycbysGkfFmGx1La7EVsZf1dHS_co2u6291egwxenTWuV0a789sKmwNJ6A1DWs8kuJkdmL/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encoded,
      });

      toast({
        title: t("serviceModal.toast.successTitle"),
        description: t("serviceModal.toast.successDescription", { service: service.title }),
        duration: 10000,
      });

      // Download PDF after successful submission
      // Google Drive direct download links
      const pdfMap: Record<string, string> = {
        'diagnostic-deep-dive': "https://drive.google.com/uc?export=download&id=1PoI6lYWAnEWWhZBZRBzsNDWK43dtU4zw",
        'targeted-transformation': "https://drive.google.com/uc?export=download&id=1QC9SD2Agng1y0krlw9fOJcvwfx1PCtuL",
        'extended-oversight': "https://drive.google.com/uc?export=download&id=18smKfNZ0hSH17pKaOVS1bj86JZJDP2_1"
      };
      
      if (pdfMap[service.id]) {
        const pdfPath = pdfMap[service.id];
        
        // Direct download from external URL
        window.location.href = pdfPath;
      }

      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        details: ""
      });

    } catch (error) {

      toast({
        title: t("serviceModal.toast.errorTitle"),
        description: t("serviceModal.toast.errorDescription"),
        variant: "destructive",
        duration: 10000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <>
        {/* Product schema removed. Only Service schema remains. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
                "name": (() => {
                  if (service.id === "diagnostic-deep-dive") return "Transformation Blueprint";
                  if (service.id === "targeted-transformation") return "Transformation Execution";
                  if (service.id === "extended-oversight") return "Transformation Leadership";
                  return service.title;
                })(),
              "description": service.fullDescription,
              "image": service.image || "/src/assets/digital-transformation.jpg",
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
              },
              "hasOfferCatalog": {
                "@type": "ItemList",
                "numberOfItems": service.features?.length || 0,
                "itemListElement": (service.features || []).map((feature, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "name": feature
                }))
              }
            })
          }}
        />
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="service-description">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold text-primary pr-8">
              {t("serviceModal.title", { service: service.title })}
            </DialogTitle>
          </DialogHeader>

          <div className="grid lg:grid-cols-2 gap-8 mt-4">
            {/* Service Information */}
            <article className="space-y-6" id="service-description">
              <header className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <service.icon className="h-8 w-8 text-primary" aria-hidden="true" />
              </header>

              <section>
                <h3 className="text-lg font-heading font-semibold text-primary mb-4">
                  {t("serviceModal.overviewTitle")}
                </h3>
                <p className="text-base text-muted-foreground font-body leading-relaxed">
                  {service.fullDescription}
                </p>
              </section>

              <section>
                <h3 className="text-lg font-heading font-semibold text-primary mb-4">
                  {t("serviceModal.featuresTitle")}
                </h3>
                <ul className="space-y-2" role="list">
                  {(Array.isArray(service.features) ? service.features : []).map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
                      <span className="text-base text-muted-foreground font-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-corporate-light p-6 rounded-lg">
                <h4 className="text-base font-heading font-semibold text-primary mb-2">
                  {t("infoCard.readyTitle")}
                </h4>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {t("infoCard.readyBody", { service: service.title })}
                </p>
                
                {/* View Full Service Page Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 group"
                  onClick={() => {
                    const servicePageMap: Record<string, string> = {
                      'diagnostic-deep-dive': 'transformation-blueprint',
                      'targeted-transformation': 'transformation-execution',
                      'extended-oversight': 'transformation-leadership'
                    };
                    const serviceSlug = servicePageMap[service.id] || service.id;
                    const currentLang = i18n.language || 'en';
                    window.location.href = `/${currentLang}/services/${serviceSlug}`;
                  }}
                >
                  {t("serviceModal.viewFullDetails", { defaultValue: "View Full Service Details" })}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </section>

              {/* Contact (moved here under "Ready to get started") */}
              <footer className="mt-6 pt-6 border-t border-border">
                <div className="flex items-start gap-4 text-sm text-muted-foreground font-body">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${t("contact.email")}`}
                      className="text-sm text-muted-foreground font-body underline hover:text-primary"
                    >
                      {t("contact.email")}
                    </a>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 mt-2.5" />
                    <div className="flex flex-col">
                      {(() => {
                        const raw = t("contact.phone");
                        const parts = Array.isArray(raw)
                          ? raw
                          : String(raw).split(/\s*(?:,|\bor\b|\||\/|;|\n)\s*/i).filter(Boolean);
                        return parts.map((p, i) => (
                          <a key={i} href={`tel:${p.replace(/\s+/g, "")}`} className="text-sm text-muted-foreground font-body">
                            {p}
                          </a>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </footer>
            </article>

            {/* Contact Form */}
            <div className="bg-gradient-subtle p-6 rounded-lg">
              <h3 className="text-lg font-heading font-semibold text-primary mb-4">
                {t(`serviceModal.headings.${service.id}`, { 
                  defaultValue: t("serviceModal.heading")
                })}
              </h3>
              
              {/* Subtitle appears under the heading for all services */}
              <p className="text-sm text-primary/80 font-body italic mb-6 leading-relaxed">
                {t(`services.${service.id}.subtitle`)}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="font-body">{t("form.fullName")}</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-body">{t("form.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName" className="font-body">{t("form.companyName")}</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="font-body">{t("form.phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="details" className="font-body">
                    {t("serviceModal.details_label", { service: service.title })}
                  </Label>
                  <Textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1"
                    placeholder={t(`serviceModal.placeholders.${service.id}`, { 
                      defaultValue: t("serviceModal.placeholder_details", { service: service.title })
                    })}
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="cta"
                  className="w-full hover:bg-purple-600 transition-colors"
                  disabled={loading}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {loading ? t("serviceModal.sending") : "Get Free Guide & Targeted Advice"}
                </Button>

                {/* Additional content for diagnostic-deep-dive service */}
                {service.id === 'diagnostic-deep-dive' && (
                  <div className="mt-6">
                    <p className="text-sm font-body text-foreground mb-2">
                      <span className="font-semibold">{t("serviceModal.bonus.diagnostic-deep-dive.title")}</span> {t("serviceModal.bonus.diagnostic-deep-dive.subtitle")}
                    </p>
                    <p className="text-sm font-body text-foreground">
                      {t("serviceModal.bonus.diagnostic-deep-dive.confidential")}
                    </p>
                  </div>
                )}

                {/* Additional content for targeted-transformation service */}
                {service.id === 'targeted-transformation' && (
                  <div className="mt-6">
                    <p className="text-sm font-body text-foreground mb-2">
                      <span className="font-semibold">{t("serviceModal.bonus.targeted-transformation.title")}</span> {t("serviceModal.bonus.targeted-transformation.subtitle")}
                    </p>
                    <p className="text-sm font-body text-foreground">
                      {t("serviceModal.bonus.targeted-transformation.confidential")}
                    </p>
                  </div>
                )}

                {/* Additional content for extended-oversight service */}
                {service.id === 'extended-oversight' && (
                  <div className="mt-6">
                    <p className="text-sm font-body text-foreground mb-2">
                      <span className="font-semibold">{t("serviceModal.bonus.extended-oversight.title")}</span> {t("serviceModal.bonus.extended-oversight.subtitle")}
                    </p>
                    <p className="text-sm font-body text-foreground">
                      {t("serviceModal.bonus.extended-oversight.confidential")}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </DialogContent>
      </>
    </Dialog>
  );
};

function getCentralEuropeanTimestamp() {
  return new Date().toLocaleString("en-GB", { timeZone: "Europe/Berlin" });
}

export default ServiceModal;