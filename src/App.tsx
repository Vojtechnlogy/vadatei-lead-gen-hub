import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocalizedRoutes from "./routes/LocalizedRoutes";
import Header from "./components/Header";
import HeadMeta from "@/components/MetaHead";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BookingModal from "@/components/BookingModal";
import { setAnalyticsPagePath, startScrollDepthTracking, trackPageView } from "@/lib/analytics";

const queryClient = new QueryClient();


const App = () => {
  const location = useLocation();
  const hasSentInitialPageView = useRef(false);
  // Hide header if the path includes 'privacy-policy'
  const hideHeader = location.pathname.includes("privacy-policy");

  // Booking modal state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setBookingModalOpen(true);
    window.addEventListener("open-booking-modal", handler);
    return () => window.removeEventListener("open-booking-modal", handler);
  }, []);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    // GA4 gtag('config') sends the initial page_view automatically.
    // For SPA navigation we send page_view events manually.
    if (!hasSentInitialPageView.current) {
      setAnalyticsPagePath(pagePath);
      hasSentInitialPageView.current = true;
    } else {
      trackPageView(pagePath);
    }
    window.dispatchEvent(new Event("vadatei:route_change"));
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const stop = startScrollDepthTracking();
    return () => stop();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HeadMeta />
        <Toaster />
        <Sonner />
        {!hideHeader && <Header onBookingClick={() => setBookingModalOpen(true)} />}
        <main className="pt-0">
          <LocalizedRoutes />
        </main>
        <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
