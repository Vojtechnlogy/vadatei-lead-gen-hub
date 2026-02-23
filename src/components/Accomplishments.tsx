import { TrendingUp, Users, Zap, Building, Network, Shield, Target, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
// import BookingModal from "@/components/BookingModal"; // BookingModal is now globally controlled

interface AccomplishmentsProps {
  onBookingClick?: () => void;
}

const Accomplishments = ({ onBookingClick }: AccomplishmentsProps) => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track the most visible card index for mobile dots
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const enT = useMemo(() => i18n.getFixedT("en"), [i18n]);

  const getString = useMemo(() => {
    return (key: string, fallback: string, options?: Record<string, unknown>) => {
      const current = t(key, { ...(options ?? {}), defaultValue: "" });
      if (typeof current === "string" && current.trim().length > 0) return current;
      const en = enT(key, { ...(options ?? {}), defaultValue: "" });
      if (typeof en === "string" && en.trim().length > 0) return en;
      return fallback;
    };
  }, [t, enT]);

  const getItems = useMemo(() => {
    return (tFn: typeof t) => {
      const raw = tFn("accomplishments.items", { returnObjects: true, defaultValue: [] });
      return Array.isArray(raw) ? raw : [];
    };
  }, [t]);

  // Animation: track which cards are visible
  const accomplishments = useMemo(() => {
    const icons = [TrendingUp, Zap, Shield, Building, Users, Target, Network, Rocket];
    const items = getItems(t);
    const enItems = getItems(enT as unknown as typeof t);
    const sourceItems = items.length > 0 ? items : enItems;

    return icons.map((icon, idx) => {
      const item = (sourceItems[idx] ?? {}) as { stat?: unknown; description?: unknown };
      return {
        icon,
        stat: typeof item.stat === "string" ? item.stat : "",
        description: typeof item.description === "string" ? item.description : "",
      };
    });
  }, [t, enT, getItems]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => {
    // Make the first card visible immediately for faster pop-in
    const arr = Array(accomplishments.length).fill(false);
    arr[0] = true;
    return arr;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observers: IntersectionObserver[] = [];
    accomplishments.forEach((_, i) => {
      if (!cardRefs.current[i]) return;
      // Skip the first card, already visible (for mobile)
      if (i === 0) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              if (prev[i]) return prev;
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(cardRefs.current[i]!);
      observers.push(observer);
    });

    // Mobile: track most centered card for dots
    let scrollContainer: HTMLDivElement | null = null;
    let removeScrollListeners: (() => void) | null = null;
    if (window.innerWidth < 1024) {
      scrollContainer = document.querySelector('#accomplishments-mobile-scroll');
      const handleScroll = () => {
        if (!scrollContainer) return;
        const containerRect = scrollContainer.getBoundingClientRect();
        let minDistance = Infinity;
        let activeIdx = 0;
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const cardRect = card.getBoundingClientRect();
          // Calculate card center relative to container center
          const cardCenter = cardRect.left + cardRect.width / 2;
          const containerCenter = containerRect.left + containerRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          if (distance < minDistance) {
            minDistance = distance;
            activeIdx = idx;
          }
        });
        setMobileActiveIndex(activeIdx);
      };
      // Initial call and add scroll listener
      handleScroll();
      scrollContainer?.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      // Clean up function for scroll/resize listeners
      removeScrollListeners = () => {
        scrollContainer?.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
    return () => {
      observers.forEach(o => o.disconnect());
      if (removeScrollListeners) removeScrollListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure desktop cards are visible when carousel index changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1024) return; // Only run on desktop
    setVisibleCards(prev => {
      const updated = [...prev];
      // Show the two currently visible cards
      [0, 1].forEach(offset => {
        const idx = (currentIndex + offset) % accomplishments.length;
        updated[idx] = true;
      });
      return updated;
    });
  }, [currentIndex, accomplishments.length]);

  return (
    <section className="py-24 bg-gradient-to-br from-corporate-light via-white to-gray-50" id="accomplishments">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            {getString("accomplishments.title", "Results That Speak For Themselves")}
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
              aria-label={getString("accomplishments.aria.previous", "Previous accomplishments")}
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
              aria-label={getString("accomplishments.aria.next", "Next accomplishments")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Cards: Desktop = carousel, Mobile = horizontal scroll */}
          <div>
            {/* Desktop: 2-at-a-time carousel */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8" style={{ minHeight: '280px' }}>
              {[0, 1].map((offset) => {
                // Wrap around if needed
                const realIndex = (currentIndex + offset) % accomplishments.length;
                const accomplishment = accomplishments[realIndex];
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
                      animationDelay: `${offset * 150}ms`,
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
                          <span className="text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary/80">{getString("accomplishments.impactLabel", "Impact")}</span>
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
            <div className="flex lg:hidden flex-col gap-2">
              <div id="accomplishments-mobile-scroll" className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ minHeight: '280px' }}>
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
                      style={{ minHeight: '280px', animationDelay: `${index === 0 ? 0 : index * 100}ms`, animationFillMode: 'both' }}
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
                            <span className="text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary/80">{getString("accomplishments.impactLabel", "Impact")}</span>
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
              {/* Mobile dots indicator */}
              <div className="flex justify-center gap-2 mt-2 lg:hidden">
                {accomplishments.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      mobileActiveIndex === idx ? 'bg-primary scale-110' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
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
                aria-label={getString("accomplishments.aria.goToSlide", "Go to slide {{n}}", { n: slideIndex + 1 })}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-corporate rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              {getString("accomplishments.cta.title", "What Could Your Business Achieve with Higher Profits?")}
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-body whitespace-pre-line">
              {getString(
                "accomplishments.cta.body",
                "Unlock your business's full potential. Discover how you can increase profits and drive growth with expert guidance tailored to your needs."
              )}
            </p>
            <Button
              variant="corporate-outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary whitespace-normal h-auto py-3 leading-snug text-center max-w-full flex-wrap"
              onClick={onBookingClick ? () => {
                trackCtaClick("book_consultation", "accomplishments_cta");
                onBookingClick();
              } : () => {
                trackCtaClick("book_consultation", "accomplishments_cta");
                // fallback: dispatch a custom event for global modal handler
                window.dispatchEvent(new CustomEvent('open-booking-modal'));
              }}
            >
              {getString("accomplishments.cta.button", "Book a Free Consultation to Find Out")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* BookingModal is now globally controlled in App.tsx */}
    </section>
  );
};

export default Accomplishments;