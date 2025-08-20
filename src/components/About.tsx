import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseBusiness , ChartSpline,Zap, Handshake} from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";
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
    <section id="about" className="py-20 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            {t("about.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            {t("about.tagline")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-[2.1rem] md:text-[3.3rem] font-heading font-semibold text-primary mb-7">
              {t("about.heading")}
            </h3>
            <p className="text-[1.21rem] text-foreground mb-7 font-body leading-relaxed">
              {t("about.p1")}
            </p>
            <p className="text-[1.21rem] text-foreground mb-9 font-body leading-relaxed">
              {t("about.p2")}
            </p>
          </div>

          <div className="relative flex flex-col items-end w-full">
            <img
              src={marekTolasz}
              alt="Marek Tolasz"
              className="rounded-lg shadow-corporate w-full h-[660px] object-cover"
            />
            {/* Marek Tolasz name in the bottom right corner of the image */}
            <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-sm font-semibold text-primary shadow">
              {t("about.imageName")}
            </span>
            <span className="mt-2 text-sm italic text-muted-foreground">
              {t("about.imageRole")}
            </span>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-heading font-semibold text-primary mb-3">
                  {t(value.titleKey)}
                </h4>
                <p className="text-muted-foreground font-body">
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