import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MarketIntelligence from "./pages/MarketIntelligence";
import TechExplain from "./pages/TechExplain";
import Events from "./pages/Events";
import SpatialUpdates from "./pages/SpatialUpdates";
import Article from "./pages/Article";
import CompanyProfile from "./pages/CompanyProfile";
import RegionalIntelligence from "./pages/RegionalIntelligence";
import VCDirectory from "./pages/VCDirectory";
import CompanyTracker from "./pages/CompanyTracker";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Reports from "./pages/Reports";
import Newsletter from "./pages/Newsletter";
import ApiAccess from "./pages/ApiAccess";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/regional-intelligence" element={<RegionalIntelligence />} />
          <Route path="/company-tracker" element={<CompanyTracker />} />
          <Route path="/companies" element={<Navigate to="/company-tracker" replace />} />
          <Route path="/startup-tracker" element={<Navigate to="/company-tracker" replace />} />
          <Route path="/unicorn-tracker" element={<Navigate to="/company-tracker" replace />} />
          <Route path="/vc-directory" element={<VCDirectory />} />
          <Route path="/tech-explain" element={<TechExplain />} />
          <Route path="/events" element={<Events />} />
          <Route path="/spatial-updates" element={<SpatialUpdates />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/company/:slug" element={<CompanyProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/api" element={<ApiAccess />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
