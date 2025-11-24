import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseBusiness , ChartSpline,Zap, Handshake, Linkedin} from "lucide-react";
import marekTolasz from '../assets/marekTolasz.jpg';
import { useTranslation } from "react-i18next";

// Bubbles at the bottom of the about section that display core values
// Each bubble contains an icon, title, and description
// The bubbles are styled to be visually appealing and consistent with the corporate theme
const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: BriefcaseBusiness, titleKey: "about.values.experience.title", descKey: "about.values.experience.description" },
    { icon: ChartSpline, titleKey: "about.values.impact.title", descKey: "about.values.impact.description" },
    { icon: Zap, titleKey: "about.values.diagnosis.title", descKey: "about.values.diagnosis.description" },
    { icon: Handshake, titleKey: "about.values.lowRisk.title", descKey: "about.values.lowRisk.description" }
  ];

  return (
    <section id="about" className="py-20 bg-corporate-light" itemScope itemType="https://schema.org/AboutPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://vadatei.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": t("about.title"),
                "item": "https://vadatei.com/#about"
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": t("organization.name"),
            "description": t("organization.description"),
            "url": "https://vadatei.com/",
            "logo": "https://vadatei.com/favicon.ico",
            "foundingDate": "2024",
            "numberOfEmployees": "1-10",
            "industry": "Business Consulting",
            "serviceArea": {
              "@type": "Place",
              "name": "Europe"
            },
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Europe",
              "addressCountry": ["CZ", "DE", "NL"]
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+31 682 49 46 90",
                "contactType": t("organization.contactType"),
                "areaServed": t("organization.areaServed"),
                "email": "info@vadatei.com",
                "availableLanguage": ["en", "cs", "de"]
              },
              {
                "@type": "ContactPoint",
                "telephone": "+420 602 396 416",
                "contactType": t("organization.contactType"),
                "areaServed": t("organization.areaServed"),
                "email": "info@vadatei.com",
                "availableLanguage": ["en", "cs", "de"]
              }
            ],
            "founder": {
              "@type": "Person",
              "name": t("about.imageName"),
              "jobTitle": t("about.imageRole")
            },
            "sameAs": [
              "https://www.linkedin.com/in/marek-tolasz/"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": t("about.imageName"),
            "jobTitle": t("about.imageRole"),
            "description": "Founder and Principal Consultant with over 30 years of experience in IT leadership and transformation management",
            "image": "/src/assets/marekTolasz.jpg",
            "nationality": "Czech",
            "workLocation": {
              "@type": "Place",
              "name": "Europe"
            },
            "worksFor": {
              "@type": "Organization",
              "name": t("organization.name"),
              "url": "https://vadatei.com/"
            },
            "alumniOf": {
              "@type": "International Institute for Management Development",
              "name": "Business Management and IT Leadership"
            },
            "knowsAbout": [
              "Business Growth",
              "Change Management",
              "Digital Transformation", 
              "IT Leadership",
              "Business Consulting",
              "Project Management",
              "Transformation management",
              "Organizational Change",
              "Leadership Development",
              "Team Building"
            ],
            "url": "https://www.linkedin.com/in/marek-tolasz/",
            "sameAs": [
              "https://www.linkedin.com/in/marek-tolasz/"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Vadatei",
            "url": "https://vadatei.com/"
          })
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6" itemProp="name">
            {t("about.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed" itemProp="description">
            {t("about.tagline")}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <article itemScope itemType="https://schema.org/Organization">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary mb-7 text-left" itemProp="name">
              {t("about.heading")}
            </h3>
            <p className="text-[1.21rem] text-foreground mb-7 font-body leading-relaxed" itemProp="description">
              {t("about.p1")}
            </p>
            <p className="text-[1.21rem] text-foreground mb-7 font-body leading-relaxed">
              {t("about.p2")}
            </p>
            <p className="text-[1.21rem] text-foreground mb-9 font-body leading-relaxed">
              {t("about.p3")}
            </p>
          </article>

          <div className="relative flex flex-col items-end w-full" itemScope itemType="https://schema.org/Person">
            <img
              src={marekTolasz}
              alt={t("about.imageName")}
              className="rounded-lg shadow-corporate w-full h-[660px] object-cover"
              itemProp="image"
            />
            {/* Marek Tolasz name in the bottom left corner of the image */}
            <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-sm font-semibold text-primary shadow" itemProp="name">
              {t("about.imageName")}
            </span>
            {/* LinkedIn link in the bottom right corner of the image */}
            <a
              href="https://linkedin.com/in/marek-tolasz/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white/90 p-2 rounded shadow hover:bg-white transition-colors"
              aria-label="Connect with Marek Tolasz on LinkedIn"
              itemProp="sameAs"
            >
              <Linkedin className="h-5 w-5 text-primary" />
            </a>
            <span className="mt-2 text-sm italic text-muted-foreground" itemProp="jobTitle">
              {t("about.imageRole")}
            </span>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
            {t("about.valuesHeading")}
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" itemScope itemType="https://schema.org/ItemList">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-1" itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <meta itemProp="position" content={String(index + 1)} />
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-heading font-semibold text-primary mb-3" itemProp="name">
                  {t(value.titleKey)}
                </h4>
                <p className="text-muted-foreground font-body" itemProp="description">
                  {t(value.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;