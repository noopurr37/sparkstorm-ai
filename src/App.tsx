
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";

// Lazy load pages for better performance
const MediWallet = lazy(() => import("./pages/MediWallet"));
const BookDemo = lazy(() => import("./pages/BookDemo"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const UserPreferences = lazy(() => import("./pages/UserPreferences"));
const AIEvents = lazy(() => import("./pages/AIEvents"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/mediwallet" element={<MediWallet />} />
                    <Route path="/book-demo" element={<BookDemo />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/preferences" element={<UserPreferences />} />
                    <Route path="/ai-events" element={<AIEvents />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
