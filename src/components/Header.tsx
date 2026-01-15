import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import vadateiLogo from "../assets/vadatei_logo_vector_sharp_clean.jpg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedPath } from "../lib/localize";

interface HeaderProps {
  onBookingClick: () => void;
}

const SUPPORTED_LANGS = ["en", "cz", "de"];

const Header = ({ onBookingClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isMobileServicesMenuOpen, setIsMobileServicesMenuOpen] = useState(false);
  const langMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const servicesMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  // Keep i18n language aligned with the URL prefix (Header lives outside LangWrapper)
  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

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
    // Check if we're on a service detail page
    const isServicePage = location.pathname.includes('/services/');
    
    if (isServicePage) {
      // Navigate to home page with hash, then scroll
      const currentLang = i18n.language || 'en';
      navigate(`/${currentLang}#${sectionId}`);
      // Small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
              onClick={() => {
                const currentLang = i18n.language || 'en';
                const isServicePage = location.pathname.includes('/services/');
                if (isServicePage) {
                  navigate(`/${currentLang}`);
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-2xl font-heading font-bold text-primary focus:outline-none bg-transparent border-none cursor-pointer"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              {t("header.company")}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => {
                const currentLang = i18n.language || 'en';
                const isServicePage = location.pathname.includes('/services/');
                if (isServicePage) {
                  navigate(`/${currentLang}`);
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.home")}
            </button>

            {/* Services Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => scrollToSection("services")}
                className="flex items-center px-3 py-2 rounded text-foreground hover:text-primary bg-transparent transition-colors font-body"
                aria-label="Services menu"
                style={{ border: "none" }}
                onMouseEnter={() => {
                  if (servicesMenuTimeout.current) clearTimeout(servicesMenuTimeout.current);
                  setIsServicesMenuOpen(true);
                }}
                onMouseLeave={() => {
                  servicesMenuTimeout.current = setTimeout(() => setIsServicesMenuOpen(false), 250);
                }}
              >
                {t("header.nav.services")}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isServicesMenuOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-background border border-slate-200 rounded shadow-lg z-50"
                  onMouseEnter={() => {
                    if (servicesMenuTimeout.current) clearTimeout(servicesMenuTimeout.current);
                    setIsServicesMenuOpen(true);
                  }}
                  onMouseLeave={() => {
                    servicesMenuTimeout.current = setTimeout(() => setIsServicesMenuOpen(false), 250);
                  }}
                >
                  <Link
                    to={localizedPath("/services/transformation-blueprint")}
                    className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                    onClick={() => setIsServicesMenuOpen(false)}
                  >
                    {t("footer.services.itHealthCheck")}
                  </Link>
                  <Link
                    to={localizedPath("/services/transformation-execution")}
                    className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                    onClick={() => setIsServicesMenuOpen(false)}
                  >
                    {t("footer.services.digitalTransformation")}
                  </Link>
                  <Link
                    to={localizedPath("/services/transformation-leadership")}
                    className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                    onClick={() => setIsServicesMenuOpen(false)}
                  >
                    {t("footer.services.cioAsAService")}
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              {t("header.nav.about")}
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
                  const currentLang = i18n.language || 'en';
                  const isServicePage = location.pathname.includes('/services/');
                  if (isServicePage) {
                    navigate(`/${currentLang}`);
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.home")}
              </button>

              {/* Services Dropdown for Mobile */}
              <div className="relative">
                <button
                  onClick={() => setIsMobileServicesMenuOpen((open) => !open)}
                  className="flex items-center w-full px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
                  aria-label="Services menu"
                  style={{ border: "none" }}
                >
                  {t("header.nav.services")}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isMobileServicesMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileServicesMenuOpen && (
                  <div className="pl-6 space-y-1">
                    <Link
                      to={localizedPath("/services/change-strategy-diagnostic")}
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      onClick={() => {
                        setIsMobileServicesMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {t("footer.services.itHealthCheck")}
                    </Link>
                    <Link
                      to={localizedPath("/services/change-management-implementation")}
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      onClick={() => {
                        setIsMobileServicesMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {t("footer.services.digitalTransformation")}
                    </Link>
                    <Link
                      to={localizedPath("/services/change-sustainment-improvement")}
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      onClick={() => {
                        setIsMobileServicesMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {t("footer.services.cioAsAService")}
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                {t("header.nav.about")}
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