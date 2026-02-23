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
<<<<<<< HEAD
    title: "Operational & Digital Transformation",
    description: "Half of change efforts fail. We ensure you're in the winning half. Expert change management consulting with 30+ years of experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
=======
    title: "Vadatei - Digital & Business Transformation | 20+ Years of Experience",
    description: "Half of change efforts fail. We ensure you're in the winning half. Expert change management consulting with 20+ years of experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
>>>>>>> 1308a9b8b913dd666d321b21521bed34d44c1526
    canonical: "https://vadatei.com/",
    lang: "en",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "en/index.html",
    bundleEntryPoint: "/src/main.tsx",
<<<<<<< HEAD
    title: "Operational & Digital Transformation",
    description: "Half of change efforts fail. We ensure you're in the winning half. Expert change management consulting with 30+ years of experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
=======
    title: "Vadatei - Digital & Business Transformation | 20+ Years of Experience",
    description: "Half of change efforts fail. We ensure you're in the winning half. Expert change management consulting with 20+ years of experience. Start with our Transformation Blueprint to discover the 5 hidden warning signs most leadership teams miss.",
>>>>>>> 1308a9b8b913dd666d321b21521bed34d44c1526
    canonical: "https://vadatei.com/en/",
    lang: "en",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "cz/index.html",
    bundleEntryPoint: "/src/main.tsx",
<<<<<<< HEAD
    title: "Operational & Digital Transformation",
    description: "70% organizačních změn selže. Zajistíme, aby vaše patřila mezi úspěšných 30%. Expertní poradenství v řízení změn s více než 30 lety zkušeností. Začněte s naší diagnostickou analýzou.",
=======
    title: "Vadatei - Řízení Transformace Podniku | 20+ let zkušeností",
    description: "Polovina změnových iniciativ selže. Zajistíme, že budete v té úspěšné polovině. Expertní poradenství v řízení změn s více než 20 lety zkušeností. Začněte s naším Transformation Blueprint a objevte 5 skrytých varovných signálů, které většina týmů vedení přehlíží.",
>>>>>>> 1308a9b8b913dd666d321b21521bed34d44c1526
    canonical: "https://vadatei.com/cz/",
    lang: "cs",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  },
  {
    url: "de/index.html",
    bundleEntryPoint: "/src/main.tsx",
<<<<<<< HEAD
    title: "Operational & Digital Transformation",
    description: "Die Hälfte aller Veränderungsvorhaben scheitert. Wir sorgen dafür, dass Sie zur erfolgreichen Hälfte gehören. Expertenberatung im Change Management mit über 30 Jahren Erfahrung. Starten Sie mit unserem Transformation Blueprint und entdecken Sie die 5 versteckten Warnzeichen, die die meisten Führungsteams übersehen.",
=======
    title: "Vadatei - Business-Transformation-Management | 20+ Jahre Erfahrung",
    description: "Die Hälfte aller Veränderungsvorhaben scheitert. Wir sorgen dafür, dass Sie zur erfolgreichen Hälfte gehören. Expertenberatung im Change Management mit über 20 Jahren Erfahrung. Starten Sie mit unserem Transformation Blueprint und entdecken Sie die 5 versteckten Warnzeichen, die die meisten Führungsteams übersehen.",
>>>>>>> 1308a9b8b913dd666d321b21521bed34d44c1526
    canonical: "https://vadatei.com/de/",
    lang: "de",
    image: "https://vadatei.com/assets/digital-transformation.jpg"
  }
];