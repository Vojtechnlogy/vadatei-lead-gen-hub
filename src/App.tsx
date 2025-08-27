import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocalizedRoutes from "./routes/LocalizedRoutes";
import Header from "./components/Header";
import HeadMeta from "@/components/MetaHead";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  // Hide header if the path includes 'privacy-policy'
  const hideHeader = location.pathname.includes("privacy-policy");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HeadMeta />
        <Toaster />
        <Sonner />
        {!hideHeader && <Header onBookingClick={() => {}} />}
        <main className="pt-0">
          <LocalizedRoutes />
        </main>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
