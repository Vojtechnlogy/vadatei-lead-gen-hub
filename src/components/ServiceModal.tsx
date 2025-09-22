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
  const isHealthService = service?.id === "diagnostic-deep-dive";

  // Digital Diagnostics Deep Dive (i18n keys + fallbacks)
  const healthOptions = [
    {
      key: "security_risk",
      labelKey: "serviceModal.priorityAreas.options.securityRisk",
      fallback: "Security & Risk",
      hintKey: "serviceModal.priorityAreas.hints.securityRisk",
      hintFallback:
        "Assess vulnerabilities in your IT environment, data handling, and compliance posture."
    },
    {
      key: "it_systems",
      labelKey: "serviceModal.priorityAreas.options.itSystems",
      fallback: "IT & Systems",
      hintKey: "serviceModal.priorityAreas.hints.itSystems",
      hintFallback:
        "Audit infrastructure, software, device management, and digital workflows. Identify risks, inefficiencies, or misaligned tools."
    },
    {
      key: "people_roles",
      labelKey: "serviceModal.priorityAreas.options.peopleRoles",
      fallback: "People & Roles (HR)",
      hintKey: "serviceModal.priorityAreas.hints.peopleRoles",
      hintFallback:
        "Review team structure, role clarity, internal communication, hiring processes, and performance systems."
    },
    {
      key: "operations_workflow",
      labelKey: "serviceModal.priorityAreas.options.operationsWorkflow",
      fallback: "Operations & Workflow",
      hintKey: "serviceModal.priorityAreas.hints.operationsWorkflow",
      hintFallback:
        "Map and analyze how work gets done across departments. Identify bottlenecks, duplications, and automation opportunities."
    },
    {
      key: "costs_resources",
      labelKey: "serviceModal.priorityAreas.options.costsResources",
      fallback: "Costs & Resource Allocation",
      hintKey: "serviceModal.priorityAreas.hints.costsResources",
      hintFallback:
        "Analyze spend vs. value, staffing levels, tool usage, and underperforming investments to highlight cost-saving opportunities."
    },
  ];

  // Digital Transformation specific checklist (Priority Services)
  const isDigitalService = service?.id === "targeted-transformation";
  // Targeted Transformation priority areas (i18n keys + fallbacks + hints)
  const digitalOptions = [
    {
      key: "it_restructuring",
      labelKey: "serviceModal.targetedTransformation.options.itRestructuring",
      fallback: "IT Department Restructuring",
      hintKey: "serviceModal.targetedTransformation.hints.itRestructuring",
      hintFallback:
        "Redesign your IT team, workflows, and systems to support growth and align technology with business goals."
    },
    {
      key: "hr_people_strategy",
      labelKey: "serviceModal.targetedTransformation.options.hrPeople",
      fallback: "HR & People Strategy",
      hintKey: "serviceModal.targetedTransformation.hints.hrPeople",
      hintFallback:
        "Clarify roles, responsibilities, and reporting lines while improving onboarding, performance management, and team communication."
    },
    {
      key: "operations_workflow_opt",
      labelKey: "serviceModal.targetedTransformation.options.operationsOptimization",
      fallback: "Operations & Workflow Optimization",
      hintKey: "serviceModal.targetedTransformation.hints.operationsOptimization",
      hintFallback:
        "Streamline your processes across departments, eliminating bottlenecks and inefficiencies."
    },
    {
      key: "resource_capacity_planning",
      labelKey: "serviceModal.targetedTransformation.options.resourcePlanning",
      fallback: "Resource & Capacity Planning",
      hintKey: "serviceModal.targetedTransformation.hints.resourcePlanning",
      hintFallback:
        "Determine the right headcount, skill sets, and resource allocation to scale your teams effectively."
    },
    {
      key: "vendor_tool_selection",
      labelKey: "serviceModal.targetedTransformation.options.vendorTool",
      fallback: "Vendor & Tool Selection",
      hintKey: "serviceModal.targetedTransformation.hints.vendorTool",
      hintFallback:
        "Select and implement the best tools and service providers to boost efficiency and cost-effectiveness."
    },
    {
      key: "change_management_enablement",
      labelKey: "serviceModal.targetedTransformation.options.changeManagement",
      fallback: "Change Management & Leadership Enablement",
      hintKey: "serviceModal.targetedTransformation.hints.changeManagement",
      hintFallback:
        "Support leadership and teams through change adoption, creating structures for sustainable growth."
    },
  ];

  // CIO / Premium Services checklist
  const isCIOService = service?.id === "extended-oversight";
  // Extended Oversight / IT Outsourcing priority options with hints
  const cioOptions = [
    {
      key: "interim_leadership",
      labelKey: "serviceModal.premiumServices.options.interimLeadership",
      fallback: "Interim Leadership / Executive Support",
      hintKey: "serviceModal.premiumServices.hints.interimLeadership",
      hintFallback:
        "Embed senior-level guidance directly into your organization to oversee critical transformation initiatives."
    },
    {
      key: "implementation_management",
      labelKey: "serviceModal.premiumServices.options.implementationManagement",
      fallback: "Implementation Management",
      hintKey: "serviceModal.premiumServices.hints.implementationManagement",
      hintFallback:
        "Directly manage execution of departmental changes, monitoring progress and resolving roadblocks."
    },
    {
      key: "risk_compliance",
      labelKey: "serviceModal.premiumServices.options.riskCompliance",
      fallback: "Risk & Compliance Oversight",
      hintKey: "serviceModal.premiumServices.hints.riskCompliance",
      hintFallback:
        "Identify and mitigate risks during implementation, ensuring processes meet legal, security, and operational standards."
    },
    {
      key: "performance_monitoring",
      labelKey: "serviceModal.premiumServices.options.performanceMonitoring",
      fallback: "Performance Monitoring & Reporting",
      hintKey: "serviceModal.premiumServices.hints.performanceMonitoring",
      hintFallback:
        "Track KPIs and project milestones while providing actionable insights to leadership."
    },
    {
      key: "stakeholder_alignment",
      labelKey: "serviceModal.premiumServices.options.stakeholderAlignment",
      fallback: "Stakeholder & Team Alignment",
      hintKey: "serviceModal.premiumServices.hints.stakeholderAlignment",
      hintFallback:
        "Coordinate teams, vendors, and executives to maintain clear communication and accountability."
    },
    {
      key: "continuous_improvement",
      labelKey: "serviceModal.premiumServices.options.continuousImprovement",
      fallback: "Continuous Improvement",
      hintKey: "serviceModal.premiumServices.hints.continuousImprovement",
      hintFallback:
        "Make iterative adjustments during execution to ensure lasting, measurable results."
    },
  ];
 
  // selection state uses keys only; labels resolved by i18n at render / submit time
  const [healthSelections, setHealthSelections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(healthOptions.map((o) => [o.key, false]))
  );
  const [digitalSelections, setDigitalSelections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(digitalOptions.map((o) => [o.key, false]))
  );
  const [cioSelections, setCioSelections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(cioOptions.map((o) => [o.key, false]))
  );

  const [activeHintKey, setActiveHintKey] = useState<string | null>(null);
  const toggleHint = (key: string) => setActiveHintKey((k) => (k === key ? null : key));

  // toggle selection and keep hint open when checked (permanent open)
  const toggleHealth = (key: string) =>
    setHealthSelections((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // if newly checked -> make hint permanently visible; if unchecked -> collapse hint
      if (next[key]) {
        setActiveHintKey(key);
      } else if (activeHintKey === key) {
        setActiveHintKey(null);
      }
      return next;
    });
  const toggleDigital = (key: string) =>
    setDigitalSelections((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // keep hint open when checked
      if (next[key]) {
        setActiveHintKey(key);
      } else if (activeHintKey === key) {
        setActiveHintKey(null);
      }
      return next;
    });
  const toggleCio = (key: string) =>
    setCioSelections((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // keep hint open when checked
      if (next[key]) {
        setActiveHintKey(key);
      } else if (activeHintKey === key) {
        setActiveHintKey(null);
      }
      return next;
    });

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

    // build combined requestedServices (readable labels from available checklists)
    const selectedHealthLabels = healthOptions
      .filter(o => healthSelections[o.key])
      .map(o => t(o.labelKey, { defaultValue: o.fallback }));
    const selectedDigitalLabels = digitalOptions
      .filter(o => digitalSelections[o.key])
      .map(o => t(o.labelKey, { defaultValue: o.fallback }));
    const selectedCioLabels = cioOptions
      .filter(o => cioSelections[o.key])
      .map(o => t(o.labelKey, { defaultValue: o.fallback }));
    const requestedServices = [...selectedHealthLabels, ...selectedDigitalLabels, ...selectedCioLabels].join(", ");

    // Prepare data in the required order
    const submission = {
      timeStamp: getCentralEuropeanTimestamp(),
      service: service.title,
      fullName: formData.fullName,
      email: formData.email,
      companyName: formData.companyName,
      phone: formData.phone,
      details: formData.details,
      // map old field names to the new selections so backend receives readable labels
      analysisCurrent: isHealthService ? selectedHealthLabels.join(", ") : "",
      identificationGaps: isHealthService ? selectedHealthLabels.join(", ") : "",
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
        setHealthSelections(Object.fromEntries(healthOptions.map((o) => [o.key, false])));
        setActiveHintKey(null);
      }
      if (isDigitalService) {
        setDigitalSelections(Object.fromEntries(digitalOptions.map((o) => [o.key, false])));
        setActiveHintKey(null);
      }
      if (isCIOService) {
        setCioSelections(Object.fromEntries(cioOptions.map((o) => [o.key, false])));
        setActiveHintKey(null);
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
                      {t("serviceModal.priorityAreas.title", { defaultValue: "Priority Areas (Select One or More)" })}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      {healthOptions.map((opt) => {
                        const hint = t(opt.hintKey, opt.hintFallback);
                        const checked = !!healthSelections[opt.key];
                        // active if hovered/explicitly toggled OR the checkbox is checked (permanently open)
                        const isActive = activeHintKey === opt.key || checked;
                        return (
                          <div key={opt.key} className="w-full sm:w-auto">
                            <label
                              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded cursor-pointer"
                              onMouseEnter={() => setActiveHintKey(opt.key)}
                              onMouseLeave={() => { if (!checked) setActiveHintKey(null); }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleHealth(opt.key)}
                                className="form-checkbox h-4 w-4 accent-primary"
                              />
                              <span className="text-sm text-muted-foreground">{t(opt.labelKey, { defaultValue: opt.fallback })}</span>
                              <button
                                type="button"
                                className="ml-2 p-1 rounded hover:bg-primary/10 flex items-center justify-center"
                                aria-expanded={isActive}
                                aria-controls={`hint-${opt.key}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // only toggle hint manually when not checked; checked keeps it permanently open
                                  if (!checked) toggleHint(opt.key);
                                }}
                                title={hint}
                              >
                                <svg
                                  className={`h-3 w-3 text-primary transition-transform ${isActive ? "rotate-180" : ""}`}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </label>
                            {/* hint block visible on hover/toggle or permanently when checked */}
                            {isActive && (
                              <div id={`hint-${opt.key}`} className="mt-1 text-sm text-muted-foreground max-w-xs">
                                {t(opt.hintKey, { defaultValue: opt.hintFallback })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isDigitalService && (
                  <div className="mt-4 mb-2 space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-primary">
                      {t("serviceModal.targetedTransformation.title", { defaultValue: "Targeted Transformation – Priority Areas" })}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      {digitalOptions.map((opt) => {
                        const hint = t(opt.hintKey, opt.hintFallback);
                        const checked = !!digitalSelections[opt.key];
                        const isActive = activeHintKey === opt.key || checked;
                        return (
                          <div key={opt.key} className="w-full sm:w-auto">
                            <label
                              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded cursor-pointer"
                              onMouseEnter={() => setActiveHintKey(opt.key)}
                              onMouseLeave={() => { if (!checked) setActiveHintKey(null); }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleDigital(opt.key)}
                                className="form-checkbox h-4 w-4 accent-primary"
                              />
                              <span className="text-sm text-muted-foreground">{t(opt.labelKey, { defaultValue: opt.fallback })}</span>
                              <button
                                type="button"
                                className="ml-2 p-1 rounded hover:bg-primary/10 flex items-center justify-center"
                                aria-expanded={isActive}
                                aria-controls={`hint-${opt.key}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (!checked) toggleHint(opt.key);
                                }}
                                title={hint}
                              >
                                <svg
                                  className={`h-3 w-3 text-primary transition-transform ${isActive ? "rotate-180" : ""}`}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </label>
                            {isActive && (
                              <div id={`hint-${opt.key}`} className="mt-1 text-sm text-muted-foreground max-w-xs">
                                {t(opt.hintKey, { defaultValue: opt.hintFallback })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isCIOService && (
                  <div className="mt-4 mb-2 space-y-4">
                    <h3 className="text-lg font-heading font-semibold text-primary">
                      {t("serviceModal.premiumServices.title", { defaultValue: "Request Premium Services" })}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      {cioOptions.map((opt) => {
                        const hint = t(opt.hintKey, { defaultValue: opt.hintFallback });
                        const checked = !!cioSelections[opt.key];
                        const isActive = activeHintKey === opt.key || checked;
                        return (
                          <div key={opt.key} className="w-full sm:w-auto">
                            <label
                              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded cursor-pointer"
                              onMouseEnter={() => setActiveHintKey(opt.key)}
                              onMouseLeave={() => { if (!checked) setActiveHintKey(null); }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleCio(opt.key)}
                                className="form-checkbox h-4 w-4 accent-primary"
                              />
                              <span className="text-sm text-muted-foreground">{t(opt.labelKey, { defaultValue: opt.fallback })}</span>
                              <button
                                type="button"
                                className="ml-2 p-1 rounded hover:bg-primary/10 flex items-center justify-center"
                                aria-expanded={isActive}
                                aria-controls={`hint-${opt.key}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (!checked) toggleHint(opt.key);
                                }}
                                title={hint}
                              >
                                <svg
                                  className={`h-3 w-3 text-primary transition-transform ${isActive ? "rotate-180" : ""}`}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </label>
                            {isActive && (
                              <div id={`hint-${opt.key}`} className="mt-1 text-sm text-muted-foreground max-w-xs">
                                {hint}
                              </div>
                            )}
                          </div>
                        );
                      })}
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