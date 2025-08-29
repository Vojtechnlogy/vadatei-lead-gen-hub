import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import cz from "./locales/cz/translation.json";
import de from "./locales/de/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cz: { translation: cz },
      de: { translation: de },
    },
    lng: localStorage.getItem("lng") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
  .then(() => {
    // for debugging
    // eslint-disable-next-line no-console
    console.log("i18n initialized:", i18n.language, Object.keys(i18n.services.resourceStore.data));
    // expose to console
    (window as any).i18n = i18n;
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error("i18n init error:", err);
  });

export default i18n;