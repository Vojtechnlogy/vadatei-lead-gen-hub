import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function HeadMeta() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").toLowerCase();
  const htmlLang = lang === "cz" ? "cs" : lang;

  const title = t("title") || t("meta.title") || "Vadatei - Leading IT Consulting";
  const description = t("description") || t("meta.description") || "";
  const ogImage = t("ogImage") || t("meta.ogImage") || "https://vadatei.com/your-og-image.png";
  const baseUrl = "https://vadatei.com";
  const url = lang === "en" ? `${baseUrl}/` : `${baseUrl}/${lang}/`;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}