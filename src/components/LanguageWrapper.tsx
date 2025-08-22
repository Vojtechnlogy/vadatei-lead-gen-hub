import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import i18n from "i18next";

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const langParam = (params as any).lang || "en";
  const allowed = ["en", "cz", "de"];

  useEffect(() => {
    if (!allowed.includes(langParam)) return;
    // i18n language code should match your src/locales folder names (e.g. "cz")
    if (i18n.language !== langParam) i18n.changeLanguage(langParam);
    // set proper html lang attribute (use "cs" for Czech)
    document.documentElement.lang = langParam === "cz" ? "cs" : langParam;
  }, [langParam]);

  if (!allowed.includes(langParam)) return <Navigate to="/en" replace />;

  return <>{children}</>;
}