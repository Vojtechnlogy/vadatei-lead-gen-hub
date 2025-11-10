import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import FAQ from "@/components/FAQ";

const Index = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialServiceId, setInitialServiceId] = useState<string | null>(null);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const hasServicesHash = window.location.hash === '#services';
    
    console.log('Index useEffect - serviceParam:', serviceParam, 'hasServicesHash:', hasServicesHash);
    
    if (serviceParam) {
      console.log('Setting initialServiceId to:', serviceParam);
      setInitialServiceId(serviceParam);
      
      // Remove the service parameter from URL after capturing it
      searchParams.delete('service');
      setSearchParams(searchParams, { replace: true });
      
      // Always scroll to services section when returning from a service page
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        console.log('Attempting to scroll to services section:', servicesSection);
        if (servicesSection) {
          servicesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 200);
    } else if (hasServicesHash) {
      // Handle direct navigation to #services
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
    }
  }, [searchParams, setSearchParams]);

  // Additional effect to handle scrolling when initialServiceId is set
  useEffect(() => {
    console.log('initialServiceId changed:', initialServiceId);
    if (initialServiceId) {
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        console.log('Second scroll attempt to services section:', servicesSection);
        if (servicesSection) {
          servicesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 300);
    }
  }, [initialServiceId]);

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header with fixed positioning */}
      <Header onBookingClick={handleBookingClick} />
      
      {/* Main content with top padding for fixed header */}
      <main className="pt-16">
        <Hero onBookingClick={handleBookingClick} />  
        <Services onBookingClick={handleBookingClick} initialServiceId={initialServiceId} />
        {/* <Process /> */}
        <About />
        <FAQ />
      </main>
      
      {/* Footer */}
      <Footer onBookingClick={handleBookingClick} />
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
