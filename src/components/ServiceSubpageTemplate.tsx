import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { localizedPath } from "@/lib/localize";
import { useTranslation } from "react-i18next";
import { trackCtaClick, trackEvent } from "@/lib/analytics";

type ServiceSubpageTemplateProps = {
  serviceId: "diagnostic-deep-dive" | "targeted-transformation" | "extended-oversight";
};

function coerceStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((v) => String(v)) : [];
}

export default function ServiceSubpageTemplate({ serviceId }: ServiceSubpageTemplateProps) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tr = useMemo(() => {
    const getString = (key: string, fallback = "") => {
      const value = t(key, { defaultValue: "" });
      if (value && value !== key) return value;
      const enValue = t(key, { lng: "en", defaultValue: "" });
      return enValue || fallback;
    };

    const getArray = (key: string): string[] => {
      const value = t(key, { returnObjects: true }) as unknown;
      const coerced = coerceStringArray(value);
      if (coerced.length) return coerced;

      const enValue = t(key, { returnObjects: true, lng: "en" }) as unknown;
      return coerceStringArray(enValue);
    };

    return { getString, getArray };
  }, [t]);

  const title = tr.getString(`services.${serviceId}.title`);
  const subheadline = tr.getString(`services.${serviceId}.description`) || tr.getString(`services.${serviceId}.pageSubtitle`);

  const whenSignals = (
    tr.getArray(`services.${serviceId}.whenSignals`).length
      ? tr.getArray(`services.${serviceId}.whenSignals`)
      : tr.getArray(`services.${serviceId}.whatThisSolves.issues`).length
        ? tr.getArray(`services.${serviceId}.whatThisSolves.issues`)
        : tr.getArray(`services.${serviceId}.whyItMatters.issues`)
  ).slice(0, 6);

  const whenIntro = tr.getString(`services.${serviceId}.whenIntro`).trim();

  const outcomes = (
    tr.getArray(`services.${serviceId}.outcomesBullets`).length
      ? tr.getArray(`services.${serviceId}.outcomesBullets`)
      : tr.getArray(`services.${serviceId}.outcomes`)
  ).slice(0, 6);

  const scope = (
    tr.getArray(`services.${serviceId}.includes`).length
      ? tr.getArray(`services.${serviceId}.includes`)
      : tr.getArray(`services.${serviceId}.features`)
  ).slice(0, 7);

  const lightProcess = (
    tr.getArray(`services.${serviceId}.howSteps`).length
      ? tr.getArray(`services.${serviceId}.howSteps`)
      : tr.getArray(`services.${serviceId}.lightProcess`)
  ).slice(0, 4);

  const connectToExecution = tr.getArray(`services.${serviceId}.connectToExecution`).slice(0, 4);

  const duration = tr.getString(`services.${serviceId}.timelineTable.duration`);
  const investment = tr.getString(`services.${serviceId}.pricing.amount`);
  const pricingNote = tr.getString(`services.${serviceId}.pricing.note`) || tr.getString(`services.${serviceId}.pricing.commitment`) || tr.getString(`services.${serviceId}.pricing.value`);

  const nextStep = tr.getString(`services.${serviceId}.nextStep`) || tr.getString("servicePage.nextStep", "Short introductory call to confirm fit.");

  const quietSentence = (
    tr.getString(`services.${serviceId}.quietSentence`) ||
    tr.getString("servicePage.quietSentence", "")
  ).trim();

  const resolvedLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const serviceSlugMap: Record<ServiceSubpageTemplateProps["serviceId"], string> = {
    "diagnostic-deep-dive": "transformation-blueprint",
    "targeted-transformation": "transformation-execution",
    "extended-oversight": "transformation-leadership",
  };
  const slug = serviceSlugMap[serviceId];
  const pageUrl = `https://vadatei.com/${resolvedLanguage}/services/${slug}`;

  const hqStreet = tr.getString("organization.hqAddress.street").trim();
  const hqCity = tr.getString("organization.hqAddress.city").trim();
  const hqPostalCode = tr.getString("organization.hqAddress.postalCode").trim();
  const hqCountry = tr.getString("organization.hqAddress.country").trim();
  const hqAddress = hqStreet && hqCity && hqPostalCode && hqCountry
    ? {
        "@type": "PostalAddress",
        streetAddress: hqStreet,
        addressLocality: hqCity,
        postalCode: hqPostalCode,
        addressCountry: hqCountry,
      }
    : undefined;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: title,
    description: subheadline || tr.getString(`services.${serviceId}.fullDescription`) || title,
    url: pageUrl,
    inLanguage: resolvedLanguage,
    provider: {
      "@type": "Organization",
      "@id": "https://vadatei.com/#organization",
      name: tr.getString("organization.name", "Vadatei"),
      url: "https://vadatei.com/",
      logo: "https://vadatei.com/favicon.ico",
      description: tr.getString("organization.description"),
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 10,
      },
      areaServed: ["Europe", "DE", "NL"],
      address: hqAddress,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: tr.getString("organization.contactType"),
          areaServed: ["Europe", "DE", "NL"],
          email: "info@vadatei.com",
          telephone: ["+31 682 49 46 90", "+420 602 396 416"],
          availableLanguage: ["en", "cs", "de"],
        },
      ],
      sameAs: ["https://www.linkedin.com/in/marek-tolasz/"],
    },
    areaServed: ["Europe", "DE", "NL"],
    serviceType: "Business Consulting",
    category: "Change Management",
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "Price on request",
        priceCurrency: "EUR",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>
      <header className="pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => {
              const fromService = searchParams.get("from");
              if (fromService) {
                const targetUrl = `${localizedPath()}?service=${fromService}`;
                navigate(targetUrl);
                setTimeout(() => {
                  window.location.hash = "services";
                }, 100);
              } else {
                navigate(-1);
              }
            }}
            className="justify-start px-2 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("privacy.back")}
          </Button>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary">
            {title}
          </h1>
          {subheadline && (
            <p className="mt-4 text-xl text-muted-foreground font-body leading-relaxed">
              {subheadline}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <section className="py-8 border-t border-border">
          <h2 className="text-2xl font-heading font-bold text-primary mb-3">
            {tr.getString("servicePage.sections.whatIs", "What this service is")}
          </h2>
          <p className="text-foreground font-body leading-relaxed">
            {tr.getString(`services.${serviceId}.whatIs`) ||
              tr.getString(`services.${serviceId}.pageSubtitle`) ||
              subheadline}
          </p>
        </section>

        <section className="py-8 border-t border-border">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            {tr.getString("servicePage.sections.when", "When this service makes sense")}
          </h2>
          {whenIntro && (
            <p className="mb-4 text-muted-foreground font-body leading-relaxed">
              {whenIntro}
            </p>
          )}
          <ul className="list-disc pl-6 space-y-2 text-foreground font-body">
            {whenSignals.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="py-8 border-t border-border">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            {tr.getString("servicePage.sections.outcomes", "What changes after this engagement")}
          </h2>
          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <ul className="space-y-2 text-foreground font-body">
              {outcomes.map((item, idx) => (
                <li key={idx}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-8 border-t border-border">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            {tr.getString("servicePage.sections.includes", "What this includes")}
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-foreground font-body">
            {scope.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </section>

        <section className="py-8 border-t border-border">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            {tr.getString("servicePage.sections.how", "How it works")}
          </h2>
          {lightProcess.length ? (
            <ol className="list-decimal pl-6 space-y-2 text-foreground font-body">
              {lightProcess.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          ) : (
            <p className="text-muted-foreground font-body">
              {tr.getString("servicePage.sections.howFallback", "A short introductory call confirms scope, timing, and fit. Then we align on next steps.")}
            </p>
          )}
        </section>

        {connectToExecution.length > 0 && (
          <section className="py-8 border-t border-border">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              {tr.getString("servicePage.sections.connectToExecution", "How this connects to execution")}
            </h2>
            <div className="space-y-3 text-foreground font-body leading-relaxed">
              {connectToExecution.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </section>
        )}

        <section className="py-8 border-t border-b border-border">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            {tr.getString("servicePage.sections.practicalities", "Practicalities")}
          </h2>

          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-2 text-foreground font-body">
              {duration && (
                <p>
                  <span className="font-semibold">{tr.getString("servicePage.fields.duration", "Typical duration")}: </span>
                  {duration}
                </p>
              )}
              {investment && (
                <p>
                  <span className="font-semibold">{tr.getString("servicePage.fields.investment", "Investment")}: </span>
                  {investment}
                </p>
              )}
              {pricingNote && (
                <p className="text-muted-foreground">{pricingNote}</p>
              )}
              <p>
                <span className="font-semibold">{tr.getString("servicePage.fields.nextStep", "Next step")}: </span>
                {nextStep}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                variant="corporate"
                onClick={() => {
                  trackEvent("service_page_book_click", {
                    service_id: serviceId,
                    click_location: "service_page",
                  });
                  trackCtaClick("book_consultation", `service_page:${serviceId}`);
                  window.dispatchEvent(new Event("open-booking-modal"));
                }}
              >
                {tr.getString("servicePage.cta", "Book a Diagnostic Call")}
              </Button>
              <Button
                variant="corporate-outline"
                onClick={() => {
                  trackEvent("service_page_back_to_services_click", {
                    service_id: serviceId,
                    click_location: "service_page",
                  });
                  const currentLang = i18n.language || "en";
                  navigate(`/${currentLang}#services`);
                  setTimeout(() => {
                    const element = document.getElementById("services");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                {tr.getString("servicePage.backToServices", "Back to services")}
              </Button>
            </div>

            {quietSentence && (
              <p className="mt-6 text-sm text-muted-foreground font-body">
                {quietSentence}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
