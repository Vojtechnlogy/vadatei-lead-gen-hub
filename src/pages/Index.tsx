import { useState } from "react";
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
        <Services onBookingClick={handleBookingClick} />
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
