import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import vadateiLogo from "../assets/vadatei_logo_vector_sharp_clean.jpg";
// import LanguageToggle from "./ui/LanguageToggle"; // temporarily disabled
import { useTranslation } from "react-i18next";

interface HeaderProps {
  onBookingClick: () => void;
}

const Header = ({ onBookingClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={vadateiLogo}
              alt={t("header.logoAlt")}
              className="h-8 w-8 mr-3"
            />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-heading font-bold text-primary focus:outline-none bg-transparent border-none cursor-pointer"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              {t("header.company")}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.about")}
            </button>
            
            <button
              onClick={() => scrollToSection("process")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.process")}
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.services")}
            </button>

            {/* FAQ nav button */}
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.faq", "FAQ")}
            </button>
            
            {/* move language toggle between Process and Book Now */}

            {/*---- Language toggle temporarily disabled remove the comments also in imports---------------------------------- */}
            {/* <div className="ml-2">
              <LanguageToggle />
            </div> */}

            <Button 
              variant="cta" 
              onClick={onBookingClick}
              className="ml-4"
            >
              {t("header.bookNow")}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.about")}
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.process")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.services")}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.faq", "FAQ")}
              </button>
              <div className="px-3 py-2">
                <Button 
                  variant="cta" 
                  onClick={onBookingClick}
                  className="w-full"
                >
                  {t("header.bookDiscovery")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;