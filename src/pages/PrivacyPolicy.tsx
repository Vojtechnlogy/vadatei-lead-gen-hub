import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { localizedPath } from "../lib/localize";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate(localizedPath())}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("privacy.backToHome")}
          </Button>
          <h1 className="text-4xl font-heading font-bold">{t("privacy.title")}</h1>
          <p className="text-white/90 mt-2">{t("privacy.lastUpdated")}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none font-body">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("privacy.introTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.introText")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("privacy.infoCollectTitle")}</h2>
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">{t("privacy.personalInfoTitle")}</h3>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.personalInfoText")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>{t("privacy.personalInfoContact")}</li>
              <li>{t("privacy.personalInfoDiscovery")}</li>
              <li>{t("privacy.personalInfoNewsletter")}</li>
              <li>{t("privacy.personalInfoRequest")}</li>
            </ul>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.personalInfoIncludes")}
            </p>

            <h3 className="text-xl font-heading font-semibold text-primary mb-3">{t("privacy.autoInfoTitle")}</h3>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.autoInfoText")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>{t("privacy.autoInfoIP")}</li>
              <li>{t("privacy.autoInfoBrowser")}</li>
              <li>{t("privacy.autoInfoPages")}</li>
              <li>{t("privacy.autoInfoReferrer")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("privacy.useInfoTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.useInfoText")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>{t("privacy.useInfoProvide")}</li>
              <li>{t("privacy.useInfoRespond")}</li>
              <li>{t("privacy.useInfoSchedule")}</li>
              <li>{t("privacy.useInfoSend")}</li>
              <li>{t("privacy.useInfoAnalyze")}</li>
              <li>{t("privacy.useInfoLegal")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("privacy.sharingTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.sharingText")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>{t("privacy.sharingConsent")}</li>
              <li>{t("privacy.sharingProviders")}</li>
              <li>{t("privacy.sharingLaw")}</li>
              <li>{t("privacy.sharingTransfer")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("privacy.securityTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.securityText")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("privacy.rightsTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.rightsText")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>{t("privacy.rightsDelete")}</li>
              <li>{t("privacy.rightsOptOut")}</li>
              <li>{t("privacy.rightsCopy")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">{t("privacy.contactTitle")}</h2>
            <p className="text-foreground leading-relaxed mb-4">
              {t("privacy.contactText")}
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-foreground">
                <strong>Vadatei</strong><br />
                Email: info@vadatei.com<br />
                Phone: +31 682 49 46 90 &nbsp;&nbsp;&nbsp; {t("privacy.or")} &nbsp;&nbsp; +420 602 396 416<br />
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

//31 6 82 49 46 90 or +420 602 396 416