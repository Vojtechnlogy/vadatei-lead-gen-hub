import { TrendingUp, Users, Zap, Building, Network, Shield, Target, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Accomplishments = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation: track which cards are visible
  const accomplishments = [
    {
      icon: TrendingUp,
      stat: "Reduced IT operating costs by up to 25%",
      description: "Freeing budget for growth initiatives and innovation instead of maintenance."
    },
    {
      icon: Zap,
      stat: "Improved service performance from 70–80% to 90–95%",
      description: "Resulting in fewer outages, smoother operations, and higher business productivity."
    },
    {
      icon: Shield,
      stat: "Delivered seamless SAP and digital platform rollouts with 0% disruption",
      description: "Ensuring operations stayed fully functional while upgrading core business systems."
    },
    {
      icon: Building,
      stat: "Redesigned national operating models and simplified legal structures",
      description: "Shortened decision cycles, reduced complexity, and accelerated execution across teams."
    },
    {
      icon: Users,
      stat: "Led digital adoption for 2,500+ users and 100+ distributors",
      description: "Improving speed, accuracy, and efficiency in commercial operations."
    },
    {
      icon: Target,
      stat: "Created internal transformation and change management capability",
      description: "Reducing dependency on costly external consulting and increasing self-sufficiency."
    },
    {
      icon: Network,
      stat: "Standardized business processes across multiple markets",
      description: "Enabling consistent execution, faster scaling, and easier onboarding of new teams."
    },
    {
      icon: Rocket,
      stat: "Built multi-year technology and transformation roadmaps",
      description: "Giving leadership clarity, predictability, and confidence on future prioritization and investment."
    }
  ];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(accomplishments.length).fill(false));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observers: IntersectionObserver[] = [];
    accomplishments.forEach((_, i) => {
      if (!cardRefs.current[i]) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              if (prev[i]) return prev;
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(cardRefs.current[i]!);
      observers.push(observer);
    });
    return () => {
      observers.forEach(o => o.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-corporate-light via-white to-gray-50" id="accomplishments">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Proven Results That Speak For Themselves
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop navigation arrows */}
          <div className="hidden lg:block">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 z-10 bg-white shadow-lg hover:bg-corporate-light"
              style={{ top: '140px', transform: 'translate(-4rem, -50%)' }}
              onClick={() => setCurrentIndex(prev => {
                const newIndex = prev - 2;
                return newIndex < 0 ? Math.max(0, accomplishments.length - 2) : newIndex;
              })}
              aria-label="Previous accomplishments"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 z-10 bg-white shadow-lg hover:bg-corporate-light"
              style={{ top: '140px', transform: 'translate(4rem, -50%)' }}
              onClick={() => setCurrentIndex(prev => {
                const newIndex = prev + 2;
                return newIndex >= accomplishments.length ? 0 : newIndex;
              })}
              aria-label="Next accomplishments"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Cards: Desktop = carousel, Mobile = horizontal scroll */}
          <div>
            {/* Desktop: 2-at-a-time carousel */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8" style={{ minHeight: '280px' }}>
              {accomplishments.slice(currentIndex, currentIndex + 2).map((accomplishment, index) => {
                const realIndex = currentIndex + index;
                const IconComponent = accomplishment.icon;
                return (
                  <div
                    key={realIndex}
                    ref={el => (cardRefs.current[realIndex] = el)}
                    className={
                      `bg-white rounded-xl p-8 shadow-card border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col`
                      + (visibleCards[realIndex] ? ' animate-in slide-in-from-right-5 fade-in duration-700' : ' opacity-0')
                    }
                    style={{
                      minHeight: '280px',
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex items-start gap-6 flex-1">
                      <div className="w-16 h-16 bg-gradient-corporate rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-all duration-300 group-hover:rotate-6">
                        <IconComponent className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-heading font-bold text-primary mb-3 leading-snug transition-colors duration-300 group-hover:text-primary/90">
                          {accomplishment.stat}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-0.5 bg-primary transition-all duration-300 group-hover:w-8 group-hover:bg-primary/80"></div>
                          <span className="text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary/80">Impact</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-muted-foreground font-body leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                            {accomplishment.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Mobile: horizontal scroll */}
            <div className="flex lg:hidden gap-4 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ minHeight: '280px' }}>
              {accomplishments.map((accomplishment, index) => {
                const IconComponent = accomplishment.icon;
                return (
                  <div
                    key={index}
                    ref={el => (cardRefs.current[index] = el)}
                    className={
                      `bg-white rounded-xl p-8 shadow-card border border-gray-100 flex-shrink-0 w-80 snap-center group flex flex-col hover:shadow-xl transition-all duration-500 hover:-translate-y-2`
                      + (visibleCards[index] ? ' animate-in slide-in-from-right-5 fade-in duration-700' : ' opacity-0')
                    }
                    style={{ minHeight: '280px', animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex items-start gap-6 flex-1">
                      <div className="w-16 h-16 bg-gradient-corporate rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-all duration-300 group-hover:rotate-6">
                        <IconComponent className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-heading font-bold text-primary mb-3 leading-snug transition-colors duration-300 group-hover:text-primary/90">
                          {accomplishment.stat}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-0.5 bg-primary transition-all duration-300 group-hover:w-8 group-hover:bg-primary/80"></div>
                          <span className="text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary/80">Impact</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-muted-foreground font-body leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                            {accomplishment.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicators - 4 dots for 4 slides (desktop only) */}
          <div className="hidden lg:flex justify-center gap-2 mt-12">
            {[0, 2, 4, 6].map((slideStartIndex, slideIndex) => (
              <button
                key={slideStartIndex}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === slideStartIndex
                    ? 'bg-primary scale-110'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                onClick={() => setCurrentIndex(slideStartIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-corporate rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              {t("services.cta.title")}
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-body">
              {t("services.cta.body")}
            </p>
            <Button
              variant="corporate-outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              // onClick={onBookingClick} // Uncomment and pass onBookingClick as prop if needed
            >
              {t("services.cta.button")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;