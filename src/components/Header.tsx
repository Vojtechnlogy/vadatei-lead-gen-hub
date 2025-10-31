import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import vadateiLogo from "../assets/vadatei_logo_vector_sharp_clean.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  onBookingClick: () => void;
}

const SUPPORTED_LANGS = ["en", "cz", "de"];

const Header = ({ onBookingClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
  const langMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  const changeLanguage = (newLang: string) => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (SUPPORTED_LANGS.includes(segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    navigate("/" + segments.join("/"));
    i18n.changeLanguage(newLang);
    setIsLangMenuOpen(false); // Close menu after selection
  };

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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.about")}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.services")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.faq", "FAQ")}
            </button>

            {/* Language Burger Menu */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen((open) => !open)}
                className="flex items-center px-3 py-2 rounded text-foreground hover:text-primary bg-transparent transition-colors font-body"
                aria-label="Language menu"
                style={{ border: "none" }}
                onMouseEnter={() => {
                  if (langMenuTimeout.current) clearTimeout(langMenuTimeout.current);
                  setIsLangMenuOpen(true);
                }}
                onMouseLeave={() => {
                  langMenuTimeout.current = setTimeout(() => setIsLangMenuOpen(false), 250);
                }}
              >
                {lang.toUpperCase()}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isLangMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-24 bg-background border border-slate-200 rounded shadow-lg z-50"
                  onMouseEnter={() => {
                    if (langMenuTimeout.current) clearTimeout(langMenuTimeout.current);
                    setIsLangMenuOpen(true);
                  }}
                  onMouseLeave={() => {
                    langMenuTimeout.current = setTimeout(() => setIsLangMenuOpen(false), 250);
                  }}
                >
                  {SUPPORTED_LANGS.map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      disabled={i18n.language === lng}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        i18n.language === lng
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10"
                      }`}
                    >
                      {lng.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="cta"
              onClick={onBookingClick}
              className=""
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
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.home")}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.about")}
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

              {/* Language Switcher for Mobile */}
              <div className="relative px-3 py-2">
                <button
                  onClick={() => setIsMobileLangMenuOpen((open) => !open)}
                  className="flex items-center w-full px-2 py-1 rounded text-foreground hover:text-primary bg-transparent transition-colors"
                  aria-label="Language menu"
                  style={{ border: "none" }}
                >
                  {lang.toUpperCase()}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isMobileLangMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileLangMenuOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-background border border-slate-200 rounded shadow-lg z-50">
                    {SUPPORTED_LANGS.map((lng) => (
                      <button
                        key={lng}
                        onClick={() => {
                          changeLanguage(lng);
                          setIsMobileMenuOpen(false);
                          setIsMobileLangMenuOpen(false);
                        }}
                        disabled={i18n.language === lng}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          i18n.language === lng
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary/10"
                        }`}
                      >
                        {lng.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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