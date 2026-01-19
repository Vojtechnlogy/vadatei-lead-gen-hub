export interface PageMetaData {
  url: string;
  bundleEntryPoint: string;
  title: string;
  description: string;
  canonical: string;
  lang: string;
  image: string; // Add this line
}

export const pages: PageMetaData[] = [
  {
    url: "index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Technology-Enabled Transformation | 30+ Years Experience",
    description: "70% of change efforts fail. We ensure you're in the winning 30%. Expert Transformation management consulting with 30+ years experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
    canonical: "https://vadatei.com/",
    lang: "en",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "en/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Technology-Enabled Transformation | 30+ Years Experience",
    description: "70% of change efforts fail. We ensure you're in the winning 30%. Expert Transformation management consulting with 30+ years experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
    canonical: "https://vadatei.com/en/",
    lang: "en",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "cz/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Transformace Pomocí Technologie | 30+ Let Zkušeností",
    description: "70% organizačních změn selže. Zajistíme, aby vaše patřila mezi úspěšných 30%. Expertní poradenství v řízení Transformace s více než 30 lety zkušeností. Začněte s naší diagnostickou analýzou.",
    canonical: "https://vadatei.com/cz/",
    lang: "cs",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "de/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Technologiegestützte Transformation | 30+ Jahre Erfahrung",
    description: "70% der Veränderungsprojekte scheitern. Wir sorgen dafür, dass Sie zu den erfolgreichen 30% gehören. Experten-Beratung im Transformation Management mit über 30 Jahren Erfahrung. Starten Sie mit unserer Diagnose-Analyse.",
    canonical: "https://vadatei.com/de/",
    lang: "de",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  }
];