import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const Index = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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
        <About />
        <Process />
        <Services />
        <CaseStudies />
        <Testimonials />
        <Partners />
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
