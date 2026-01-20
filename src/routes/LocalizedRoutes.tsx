import React, { useEffect } from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "../pages/Index";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import DiagnosticDeepDive from "../pages/services/DiagnosticDeepDive";
import TargetedTransformation from "../pages/services/TargetedTransformation";
import ExtendedOversight from "../pages/services/ExtendedOversight";

const SUPPORTED = ["en", "cz", "de"];

function LangWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const next = SUPPORTED.includes(lang || "") ? lang! : "en";
    if (i18n.language !== next) i18n.changeLanguage(next);
    if (!SUPPORTED.includes(lang || "")) navigate(`/${next}`, { replace: true });
  }, [lang, i18n, navigate]);

  return <>{children}</>;
}

export default function LocalizedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<LangWrapper><Index /></LangWrapper>} />
      <Route path="/:lang/privacy-policy/*" element={<LangWrapper><PrivacyPolicy /></LangWrapper>} />
      <Route path="/:lang/services/transformation-blueprint/*" element={<LangWrapper><DiagnosticDeepDive /></LangWrapper>} />
      <Route path="/:lang/services/transformation-execution/*" element={<LangWrapper><TargetedTransformation /></LangWrapper>} />
      <Route path="/:lang/services/transformation-leadership/*" element={<LangWrapper><ExtendedOversight /></LangWrapper>} />
      {/* add other localized routes here */}
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}