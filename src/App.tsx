import React, { Component, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { CustomCursor } from "./components/shared/CustomCursor";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MarketIntelligence from "./pages/MarketIntelligence";
import SocialControlRoom from "./pages/SocialControlRoom";
import TechExplain from "./pages/TechExplain";
import Events from "./pages/Events";
import SpatialUpdates from "./pages/SpatialUpdates";
import Article from "./pages/Article";
import Content from "./pages/Content";
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

// === Error Boundary: prevents blank white pages on runtime errors ===
interface ErrorBoundaryState { hasError: boolean; message: string; }
class ErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[SpatialMetric] Uncaught error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff', fontFamily: 'monospace', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠</div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Application Error</h1>
          <p style={{ color: '#888', fontSize: '0.75rem', maxWidth: '480px', marginBottom: '1.5rem' }}>{this.state.message || 'An unexpected error occurred. Please refresh the page.'}</p>
          <button onClick={() => window.location.reload()} style={{ background: '#c8ff00', color: '#000', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });
  // Derived transforms must be declared at hook level (not inside JSX)
  const dotX = useTransform(mouseX, (v) => v * 1.5);
  const dotY = useTransform(mouseY, (v) => v * 1.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);
  
  return (
    <div 
      className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      <CustomCursor />
      {/* Global Spatial HUD Layer */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="fixed inset-[-5%] bg-grid-dynamic opacity-[0.15] pointer-events-none z-0" 
      />
      <motion.div 
        style={{ x: dotX, y: dotY }}
        className="fixed inset-[-5%] bg-dot-subtle opacity-[0.05] pointer-events-none z-0" 
      />
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <div className="animate-scanline opacity-20" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market-intelligence" element={<MarketIntelligence />} />
            <Route path="/social-control" element={<SocialControlRoom />} />
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
            <Route path="/content/:id" element={<Content />} />
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
