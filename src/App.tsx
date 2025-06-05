
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import MediWallet from "./pages/MediWallet";
import BookDemo from "./pages/BookDemo";
import Profile from "./pages/Profile";
import UserPreferences from "./pages/UserPreferences";
import AIEvents from "./pages/AIEvents";
import Dashboard from "./pages/Dashboard";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  // Create QueryClient inside the component to ensure proper React context
  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/mediwallet" element={<MediWallet />} />
              <Route path="/book-demo" element={<BookDemo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user-preferences" element={<UserPreferences />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-events" element={<AIEvents />} />
              <Route path="/ai-talk" element={<AIEvents />} /> {/* Keep old route for compatibility */}
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
