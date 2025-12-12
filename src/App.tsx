import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MarketIntelligence from "./pages/MarketIntelligence";
import TechExplain from "./pages/TechExplain";
import Events from "./pages/Events";
import Companies from "./pages/Companies";
import SpatialUpdates from "./pages/SpatialUpdates";
import Article from "./pages/Article";
import CompanyProfile from "./pages/CompanyProfile";
import RegionalIntelligence from "./pages/RegionalIntelligence";
import StartupTracker from "./pages/StartupTracker";
import VCDirectory from "./pages/VCDirectory";
import UnicornTracker from "./pages/UnicornTracker";
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
          <Route path="/startup-tracker" element={<StartupTracker />} />
          <Route path="/vc-directory" element={<VCDirectory />} />
          <Route path="/unicorn-tracker" element={<UnicornTracker />} />
          <Route path="/tech-explain" element={<TechExplain />} />
          <Route path="/events" element={<Events />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/spatial-updates" element={<SpatialUpdates />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/company/:slug" element={<CompanyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
