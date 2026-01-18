import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-consulting.jpg";
import { useTranslation } from "react-i18next";
import { trackCtaClick } from "@/lib/analytics";

interface HeroProps {
  onBookingClick: () => void;
}

const Hero = ({ onBookingClick }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            {t("hero.headline")}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-body leading-relaxed">
            {t("hero.subhead")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="cta" 
              size="lg" 
              onClick={() => {
                trackCtaClick("book_consultation", "hero");
                onBookingClick();
              }}
              className="text-lg px-8 py-4 h-auto whitespace-normal leading-snug text-center w-full sm:w-auto flex-wrap"
            >
              {t("hero.cta.book")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="corporate-outline" 
              size="lg"
              onClick={() => {
                trackCtaClick("view_services", "hero");
                const element = document.getElementById("services");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white hover:text-primary whitespace-normal leading-snug text-center w-full sm:w-auto flex-wrap"
            >
              {t("hero.cta.services")}
            </Button>
          </div>

          {/* Stats removed per request */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;