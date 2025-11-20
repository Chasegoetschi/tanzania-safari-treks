import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Account from "./pages/Account";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import TanzaniaSafaris from "./pages/safaris/TanzaniaSafaris";
import MigrationSafaris from "./pages/safaris/MigrationSafaris";
import SafariDetail from "./pages/safaris/SafariDetail";
import HikingAdventures from "./pages/activities/HikingAdventures";
import HikingAdventuresDetail from "./pages/activities/HikingAdventuresDetail";
import CulturalExperiences from "./pages/activities/CulturalExperiences";
import CulturalExperiencesDetail from "./pages/activities/CulturalExperiencesDetail";
import OutdoorExperiences from "./pages/activities/OutdoorExperiences";
import OutdoorExperiencesDetail from "./pages/activities/OutdoorExperiencesDetail";
import ZanzibarIslands from "./pages/locations/ZanzibarIslands";
import MainlandHighlights from "./pages/locations/MainlandHighlights";
import NorthernCircuit from "./pages/locations/NorthernCircuit";
import Destinations from "./pages/locations/Destinations";
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

const App = () => {
  useEffect(() => {
    // Ensure fonts are loaded
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
    
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <NavigationHandler />
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/account" element={<Account />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/safaris/tanzania" element={<TanzaniaSafaris />} />
            <Route path="/safaris/migration" element={<MigrationSafaris />} />
            <Route path="/safaris/:slug" element={<SafariDetail />} />
            <Route path="/activities/hiking" element={<HikingAdventures />} />
            <Route path="/activities/hiking-detail" element={<HikingAdventuresDetail />} />
            <Route path="/activities/cultural" element={<CulturalExperiences />} />
            <Route path="/activities/cultural-detail" element={<CulturalExperiencesDetail />} />
            <Route path="/activities/outdoor" element={<OutdoorExperiences />} />
            <Route path="/activities/outdoor-detail" element={<OutdoorExperiencesDetail />} />
            <Route path="/locations" element={<Destinations />} />
            <Route path="/locations/zanzibar" element={<ZanzibarIslands />} />
            <Route path="/locations/mainland" element={<MainlandHighlights />} />
            <Route path="/locations/northern-circuit" element={<NorthernCircuit />} />
            <Route path="/book" element={<Book />} />
            <Route path="/book/success" element={<BookingSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
