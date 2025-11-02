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
    title: "Vadatei - Change & Transformation Management",
    description: "We help organizations understand what needs to change, implement transformation effectively, and sustain lasting improvement.",
    canonical: "https://vadatei.com/",
    lang: "en",
    image: "https://vadatei.com/digital-transformation.jpg"
  },
  {
    url: "en/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Change & Transformation Management",
    description: "We help organizations understand what needs to change, implement transformation effectively, and sustain lasting improvement.",
    canonical: "https://vadatei.com/en/",
    lang: "en",
    image: "https://vadatei.com/digital-transformation.jpg"
  },
  {
    url: "cz/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei - Řízení Změn a Transformace",
    description: "Pomáháme organizacím pochopit, co je třeba změnit, efektivně implementovat transformaci a udržovat trvalé zlepšení.",
    canonical: "https://vadatei.com/cz/",
    lang: "cs",
    image: "https://vadatei.com/digital-transformation.jpg"
  },
  {
    url: "de/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: "Vadatei – Change-und Transformationsmanagement",
    description: "Wir helfen Organisationen zu verstehen, was sich ändern muss, den Wandel effektiv umzusetzen und nachhaltige Verbesserungen zu erzielen.",
    canonical: "https://vadatei.com/de/",
    lang: "de",
    image: "https://vadatei.com/digital-transformation.jpg"
  }
];