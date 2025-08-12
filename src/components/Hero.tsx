import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-consulting.jpg";

interface HeroProps {
  onBookingClick: () => void;
}

const Hero = ({ onBookingClick }: HeroProps) => {
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
            Leading IT Consulting
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-body leading-relaxed">
            With over 30 years of industry expertise, we provide strategic technology guidance that transforms businesses. 
            Partner with us to navigate complex IT challenges and unlock your organization's full potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="cta" 
              size="lg" 
              onClick={onBookingClick}
              className="text-lg px-8 py-4 h-auto"
            >
              Book My Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="corporate-outline" 
              size="lg"
              onClick={() => {
                const element = document.getElementById("services");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white hover:text-primary"
            >
              Our Services
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-white mb-2">30+</div>
              <div className="text-white/80 font-body">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-white mb-2">500+</div>
              <div className="text-white/80 font-body">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-white mb-2">98%</div>
              <div className="text-white/80 font-body">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;