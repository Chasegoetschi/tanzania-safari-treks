import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TanzaniaSafaris from "./pages/safaris/TanzaniaSafaris";
import MigrationSafaris from "./pages/safaris/MigrationSafaris";
import HikingAdventures from "./pages/activities/HikingAdventures";
import CulturalExperiences from "./pages/activities/CulturalExperiences";
import OutdoorExperiences from "./pages/activities/OutdoorExperiences";
import ZanzibarIslands from "./pages/locations/ZanzibarIslands";
import MainlandHighlights from "./pages/locations/MainlandHighlights";
import NorthernCircuit from "./pages/locations/NorthernCircuit";
import Book from "./pages/Book";
import BookingSuccess from "./pages/BookingSuccess";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isReload = navEntry?.type === 'reload';
    if (isReload) {
      // Force scroll to top immediately on reload
      window.scrollTo(0, 0);
      // Small delay to ensure it takes effect
      setTimeout(() => window.scrollTo(0, 0), 0);
      
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavigationHandler />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/safaris/tanzania" element={<TanzaniaSafaris />} />
          <Route path="/safaris/migration" element={<MigrationSafaris />} />
          <Route path="/activities/hiking" element={<HikingAdventures />} />
          <Route path="/activities/cultural" element={<CulturalExperiences />} />
          <Route path="/activities/outdoor" element={<OutdoorExperiences />} />
          <Route path="/locations/zanzibar" element={<ZanzibarIslands />} />
          <Route path="/locations/mainland" element={<MainlandHighlights />} />
          <Route path="/locations/northern-circuit" element={<NorthernCircuit />} />
          <Route path="/book" element={<Book />} />
          <Route path="/book/success" element={<BookingSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
