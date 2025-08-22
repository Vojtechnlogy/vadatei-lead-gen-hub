import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import LanguageWrapper from "@/components/LanguageWrapper";
import LocalizedRoutes from "@/routes/LocalizedRoutes"; // your route tree
import Header from "./components/Header";
import HeadMeta from "@/components/MetaHead";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HeadMeta />
      <Toaster />
      <Sonner />
      <Header onBookingClick={() => {}} />

      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route
          path="/:lang/*"
          element={
            <LanguageWrapper>
              <LocalizedRoutes />
            </LanguageWrapper>
          }
        />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
