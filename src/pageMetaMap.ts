export interface PageMetaData {
  url: string;
  bundleEntryPoint: string;
  title: string;
  description: string;
  canonical: string;
  lang: string;
}

export const pages: PageMetaData[] = [
  {
    url: "index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Leading IT Consulting",
    description: "Innovate with expert IT consulting tailored to your business. 30+ years of experience helping companies boost efficiency and reduce costs. Book your free consultation today",
    canonical: "https://vadatei.com/",
    lang: "en"
  },
  {
    url: "cz/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Špičkové IT poradenství",
    description: "Inovujte s odborným IT poradenstvím na míru vašemu podnikání. 30+ let zkušeností s efektivitou a snižováním nákladů. Objednejte si bezplatnou konzultaci ještě dnes",
    canonical: "https://vadatei.com/cz/",
    lang: "cs"
  },
  {
    url: "de/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Führende IT-Beratung",
    description: "Innovieren Sie mit maßgeschneiderter IT-Beratung für Ihr Unternehmen. Über 30 Jahre Erfahrung zur Steigerung der Effizienz und Kostensenkung. Buchen Sie jetzt Ihre kostenlose Beratung",
    canonical: "https://vadatei.com/de/",
    lang: "de"
  }
];