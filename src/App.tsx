import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
