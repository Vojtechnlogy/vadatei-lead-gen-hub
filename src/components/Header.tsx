import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onBookingClick: () => void;
}

const Header = ({ onBookingClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-heading font-bold text-primary">
              Vadatei
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              About
            </button>
            
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("process")}
              className="text-foreground hover:text-primary transition-colors font-body"
            >
              Process
            </button>
            

            <Button 
              variant="cta" 
              onClick={onBookingClick}
              className="ml-4"
            >
              Book Now
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
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-body"
              >
                Process
              </button>
              <div className="px-3 py-2">
                <Button 
                  variant="cta" 
                  onClick={onBookingClick}
                  className="w-full"
                >
                  Book My Discovery Call
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