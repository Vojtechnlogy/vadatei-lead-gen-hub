import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocalizedRoutes from "./routes/LocalizedRoutes";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Header onBookingClick={() => {}} />
      <main className="pt-0">
        <LocalizedRoutes />
      </main>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
