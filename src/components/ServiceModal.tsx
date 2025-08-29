import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, Phone, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface Service {
  id: string;
  title: string;
  fullDescription: string;
  features: string[];
  icon: any;
}

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    details: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // checklist state for IT Health & Performance
  const isHealthService =
    service?.id === "it-health-performance" || service?.id === "it-health-check";

  const analysisOptions = [
    { key: "security", label: t("serviceModal.analysis.options.security", "Analysis of Security") },
    { key: "it_process", label: t("serviceModal.analysis.options.itProcess", "Analysis of IT process") },
    { key: "business_process", label: t("serviceModal.analysis.options.businessProcess", "Analysis of Business Process") },
    { key: "organization", label: t("serviceModal.analysis.options.organization", "Analysis of Organization") },
  ];

  const identificationOptions = [
    { key: "systems_architecture", label: t("serviceModal.identification.options.systemsArchitecture", "Systems landscape architecture") },
    { key: "vendor_team_performance", label: t("serviceModal.identification.options.vendorTeam", "Vendor and team performance") },
    { key: "it_strategy_fit", label: t("serviceModal.identification.options.itStrategy", "IT strategy fit") },
  ];

  // Digital Transformation specific checklist (Priority Services)
  const isDigitalService = service?.id === "digital-transformation";
  const digitalOptions = [
    { key: "vendor_selection", label: t("serviceModal.priorityServices.options.vendorSelection", "Vendor Selection") },
    { key: "project_portfolio", label: t("serviceModal.priorityServices.options.projectPortfolio", "Drive Project Portfolio") },
    { key: "change_management_org", label: t("serviceModal.priorityServices.options.changeManagement", "Organization of change management") },
    { key: "resource_needs", label: t("serviceModal.priorityServices.options.resourceNeeds", "Defining Resource needs") },
  ];

  // CIO / Premium Services checklist
  const isCIOService = service?.id === "cio-as-a-service";
  const cioOptions = [
    { key: "coaching_mentoring", label: t("serviceModal.premiumServices.options.coaching", "Coaching and mentoring") },
    { key: "strategic_advisory", label: t("serviceModal.premiumServices.options.strategicAdvisory", "Strategic Advisory") },
    { key: "team_management", label: t("serviceModal.premiumServices.options.teamManagement", "Team Management") },
    { key: "crisis_management", label: t("serviceModal.premiumServices.options.crisisManagement", "Crisis Management") },
  ];

  const [analysisSelections, setAnalysisSelections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(analysisOptions.map((o) => [o.key, false]))
  );
  const [identificationSelections, setIdentificationSelections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(identificationOptions.map((o) => [o.key, false]))
  );
  const [digitalSelections, setDigitalSelections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(digitalOptions.map((o) => [o.key, false]))
  );
  const [cioSelections, setCioSelections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(cioOptions.map((o) => [o.key, false]))
  );

  const toggleAnalysis = (key: string) =>
    setAnalysisSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleIdentification = (key: string) =>
    setIdentificationSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleDigital = (key: string) =>
    setDigitalSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleCio = (key: string) => setCioSelections((p) => ({ ...p, [key]: !p[key] }));

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

    // build combined requestedServices (readable labels from all checklists)
    const selectedAnalysisLabels = analysisOptions
      .filter(o => analysisSelections[o.key])
      .map(o => o.label);
    const selectedIdentificationLabels = identificationOptions
      .filter(o => identificationSelections[o.key])
      .map(o => o.label);
    const selectedDigitalLabels = digitalOptions
      .filter(o => digitalSelections[o.key])
      .map(o => o.label);
    const selectedCioLabels = cioOptions
      .filter(o => cioSelections[o.key])
      .map(o => o.label);
    const requestedServices = [
      ...selectedAnalysisLabels,
      ...selectedIdentificationLabels,
      ...selectedDigitalLabels,
      ...selectedCioLabels,
    ].join(", ");

    // Prepare data in the required order
    const submission = {
      timeStamp: getCentralEuropeanTimestamp(),
      service: service.title,
      fullName: formData.fullName,
      email: formData.email,
      companyName: formData.companyName,
      phone: formData.phone,
      details: formData.details,
      analysisCurrent: isHealthService ? selectedAnalysisLabels.join(", ") : "",
      identificationGaps: isHealthService ? selectedIdentificationLabels.join(", ") : "",
      priorityServices: isDigitalService ? selectedDigitalLabels.join(", ") : "",
      premiumServices: isCIOService ? selectedCioLabels.join(", ") : "",
      requestedServices,
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
      });

      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        details: ""
      });

      // reset checklists after submit
      if (isHealthService) {
        setAnalysisSelections(Object.fromEntries(analysisOptions.map((o) => [o.key, false])));
        setIdentificationSelections(Object.fromEntries(identificationOptions.map((o) => [o.key, false])));
      }
      if (isDigitalService) {
        setDigitalSelections(Object.fromEntries(digitalOptions.map((o) => [o.key, false])));
      }
      if (isCIOService) {
        setCioSelections(Object.fromEntries(cioOptions.map((o) => [o.key, false])));
      }

      onClose();
    } catch (error) {
      toast({
        title: t("serviceModal.toast.errorTitle"),
        description: t("serviceModal.toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": service.title,
              "description": service.fullDescription,
              // Add your actual image URL if available:
              // "image": "https://vadatei.com/path-to-service-image.jpg",
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
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": service.title,
              "description": service.fullDescription,
              "provider": {
                "@type": "Organization",
                "name": "Vadatei",
                "url": "https://vadatei.com/"
              },
              "areaServed": "EU",
              "serviceType": service.title,
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold text-primary pr-8">
              {t("serviceModal.title", { service: service.title })}
            </DialogTitle>
          </DialogHeader>

          <div className="grid lg:grid-cols-2 gap-8 mt-4">
            {/* Service Information */}
            <div className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <service.icon className="h-8 w-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                  {t("serviceModal.overviewTitle")}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                  {t("serviceModal.featuresTitle")}
                </h3>
                <ul className="space-y-2">
                  {(Array.isArray(service.features) ? service.features : []).map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground font-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-corporate-light p-6 rounded-lg">
                <h4 className="font-heading font-semibold text-primary mb-2">
                  {t("infoCard.readyTitle")}
                </h4>
                <p className="text-sm text-muted-foreground font-body">
                  {t("infoCard.readyBody", { service: service.title })}
                </p>
              </div>

              {/* Contact (moved here under "Ready to get started") */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-start gap-4 text-sm text-muted-foreground font-body">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${t("contact.email")}`}
                      className="text-sm text-muted-foreground underline hover:text-primary"
                    >
                      {t("contact.email")}
                    </a>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-1" />
                    <div className="flex flex-col">
                      {(() => {
                        const raw = t("contact.phone");
                        const parts = Array.isArray(raw)
                          ? raw
                          : String(raw).split(/\s*(?:,|\bor\b|\||\/|;|\n)\s*/i).filter(Boolean);
                        return parts.map((p, i) => (
                          <a key={i} href={`tel:${p.replace(/\s+/g, "")}`} className="text-sm text-muted-foreground">
                            {p}
                          </a>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-subtle p-6 rounded-lg">
              <h3 className="text-xl font-heading font-semibold text-primary mb-6">
                {t("serviceModal.heading")}
              </h3>
              
              {/* Conditional checklist sections for IT Health & Performance */}
              {/* checklist moved into form (rendered below the details textarea) */}
              
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
                    placeholder={t("serviceModal.placeholder_details", { service: service.title })}
                  />
                </div>

                {/* Conditional checklists placed directly below details */}
                {isHealthService && (
                  <div className="mt-4 mb-2 space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-primary">
                      {t("serviceModal.priorityAreas", "Priority Areas")}
                    </h3>
                    <div>
                      <h4 className="font-heading font-semibold text-primary">{t("serviceModal.analysis.title", "Analysis of current situation")}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {analysisOptions.map((opt) => (
                          <label key={opt.key} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!analysisSelections[opt.key]}
                              onChange={() => toggleAnalysis(opt.key)}
                              className="form-checkbox h-4 w-4 accent-primary"
                            />
                            <span className="text-sm text-muted-foreground">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-heading font-semibold text-primary">{t("serviceModal.identification.title", "Identification of gaps, risks and opportunities")}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {identificationOptions.map((opt) => (
                          <label key={opt.key} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!identificationSelections[opt.key]}
                              onChange={() => toggleIdentification(opt.key)}
                              className="form-checkbox h-4 w-4 accent-primary"
                            />
                            <span className="text-sm text-muted-foreground">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isDigitalService && (
                  <div className="mt-4 mb-2 space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-primary">
                      {t("serviceModal.priorityServicesTitle", "Required Services")}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {digitalOptions.map((opt) => (
                        <label key={opt.key} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!digitalSelections[opt.key]}
                            onChange={() => toggleDigital(opt.key)}
                            className="form-checkbox h-4 w-4 accent-primary"
                          />
                          <span className="text-sm text-muted-foreground">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {isCIOService && (
                  <div className="mt-4 mb-2 space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-primary">
                      {t("serviceModal.premiumServicesTitle", "Request Premium Services")}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cioOptions.map((opt) => (
                        <label key={opt.key} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!cioSelections[opt.key]}
                            onChange={() => toggleCio(opt.key)}
                            className="form-checkbox h-4 w-4 accent-primary"
                          />
                          <span className="text-sm text-muted-foreground">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button
                  type="submit"
                  variant="cta"
                  className="w-full hover:bg-purple-600 transition-colors"
                  disabled={loading}
                >
                   {loading ? t("serviceModal.sending") : t("serviceModal.submit")}
                 </Button>
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