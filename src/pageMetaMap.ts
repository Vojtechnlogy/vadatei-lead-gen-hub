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
    title: "Vadatei - Business Transformation Management | 30+ Years of Experience",
    description: "Half of change efforts fail. We ensure you're in the winning half. Expert change management consulting with 30+ years of experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
    canonical: "https://vadatei.com/",
    lang: "en",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "en/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Business Transformation Management | 30+ Years of Experience",
    description: "Half of change efforts fail. We ensure you're in the winning half. Expert change management consulting with 30+ years of experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
    canonical: "https://vadatei.com/en/",
    lang: "en",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "cz/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Řízení Transformace Podniku | 30+ let zkušeností",
    description: "70% organizačních změn selže. Zajistíme, aby vaše patřila mezi úspěšných 30%. Expertní poradenství v řízení změn s více než 30 lety zkušeností. Začněte s naší diagnostickou analýzou.",
    canonical: "https://vadatei.com/cz/",
    lang: "cs",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "de/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Business-Transformation-Management | 30+ Jahre Erfahrung",
    description: "Die Hälfte aller Veränderungsvorhaben scheitert. Wir sorgen dafür, dass Sie zur erfolgreichen Hälfte gehören. Expertenberatung im Change Management mit über 30 Jahren Erfahrung. Starten Sie mit unserem Transformation Blueprint und entdecken Sie die 5 versteckten Warnzeichen, die die meisten Führungsteams übersehen.",
    canonical: "https://vadatei.com/de/",
    lang: "de",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  }
];