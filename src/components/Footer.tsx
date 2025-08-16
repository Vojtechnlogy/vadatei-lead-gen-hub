import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  onBookingClick: () => void;
}

const Footer = ({ onBookingClick }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-heading font-bold mb-6">Vadatei</h3>
            <p className="text-white/80 font-body text-lg leading-relaxed mb-6 max-w-md">
              Leading IT consulting firm with over 30 years of experience helping organizations 
              transform their technology landscape and achieve strategic business goals.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/60" />
                <span className="font-body">Blank for now</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/60" />
                <span className="font-body">blank for now </span>
              </div>

            </div>

            <Button 
              variant="corporate-outline" 
              onClick={onBookingClick}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Book Discovery Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-heading font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 font-body">
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("process")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Our Process
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3 font-body">
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  IT Health Check
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Digital Transformation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  CIO-as-a-Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Team Coaching and Mentoring
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Organizational Assessment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Performance Optimization
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="max-w-md">
            <h4 className="text-xl font-heading font-semibold mb-4">Stay Updated</h4>
            <p className="text-white/80 font-body mb-4">
              Get the latest insights on technology trends and best practices.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 font-body text-sm">
            © {currentYear} Vadatei. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {/* Social Links */} 
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/marek-tolasz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:marek.tolasz@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            
            {/* Legal Links */}
            <div className="flex gap-6 text-sm font-body">
              <Link 
                to="/privacy-policy" 
                className="text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-white/60 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// marek.tolasz@gmail.com
//31 6 82 49 46 90 or +420 602 396 416