import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  TrendingUp,
  Cpu,
  Calendar,
  Building2,
  Globe,
  Search,
  Rocket,
  Landmark,
  Moon,
  Sun
} from "lucide-react";

const navItems = [
  { label: "Market Intelligence", href: "/market-intelligence", icon: TrendingUp },
  { label: "Company Tracker", href: "/company-tracker", icon: Rocket },
  { label: "VC Directory", href: "/vc-directory", icon: Landmark },
  { label: "Tech Explain", href: "/tech-explain", icon: Cpu },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Spatial Updates", href: "/spatial-updates", icon: Globe },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header 
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? "bg-background/60 backdrop-blur-2xl border-primary/20 py-2" 
          : "bg-background/0 border-transparent py-4"
      }`}
    >
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />
      <div className="animate-scanline opacity-30" />
      
      <div className="container flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden shadow-sm bg-primary/10 border border-primary/20"
          >
            <img src="/logo.png" alt="SpatialMetric Logo" className="h-full w-full object-cover" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-mono tracking-tighter uppercase leading-none">
              Spatial<span className="text-primary">Metrics</span>
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-4 bg-primary/50" />
              <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.4em]">Intelligence Terminal</span>
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-md rounded-full px-2 py-1 border border-black/5 shadow-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="relative group"
              >
                <div className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all rounded-full ${
                  isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                }`}>
                  <item.icon className={`h-3.5 w-3.5 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  {item.label}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hover:bg-primary/5 hover:text-primary transition-colors rounded-full"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex hover:bg-primary/5 hover:text-primary transition-colors rounded-full"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/dashboard">
            <Button className="hidden sm:flex font-mono text-[10px] uppercase tracking-[0.2em] px-6 h-9 rounded-full bg-primary text-black hover:bg-primary/80 shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all border-none">
              Access Terminal
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-primary/5 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-2xl p-4 md:p-24"
          >
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex items-center justify-between border-b border-primary/30 pb-8">
                <div className="flex items-center gap-6 flex-1">
                  <Search className="h-8 w-8 text-primary animate-pulse" />
                  <input
                    autoFocus
                    placeholder="QUERY SYSTEM: ENTER KEYWORD (e.g. APPLE, HARDWARE, VC)"
                    className="bg-transparent border-none text-3xl font-mono uppercase tracking-tighter w-full focus:outline-none placeholder:text-muted-foreground/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setIsSearchOpen(false)}
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchOpen(false)}
                  className="rounded-full hover:bg-primary/10 hover:text-primary h-12 w-12"
                >
                  <X className="h-8 w-8" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold">Terminal Access Nodes</h3>
                  <div className="space-y-2">
                    {navItems.filter(item => 
                      !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 transition-all group"
                      >
                        <item.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono uppercase tracking-widest">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Intelligence Matrix</h3>
                  <div className="space-y-4 opacity-70">
                    <p className="text-[10px] font-mono uppercase leading-relaxed text-muted-foreground italic">
                      SYSTEM NOTE: Real-time fuzzy search across the global SpatialMetric index is active. Matches are prioritized by terminal relevance and timestamp proximity.
                    </p>
                    {!searchQuery ? (
                      <div className="p-12 border border-dashed border-primary/20 rounded-2xl text-center">
                        <Rocket className="h-8 w-8 text-primary/30 mx-auto mb-4" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Standby for Query...</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                         <Link
                          to="/market-intelligence"
                          onClick={() => setIsSearchOpen(false)}
                          className="block p-4 rounded-xl border border-black/5 bg-secondary/30 hover:border-primary/20 transition-all"
                        >
                          <span className="text-[10px] font-mono text-primary uppercase block mb-1">Article Match</span>
                          <span className="text-xs font-mono font-bold uppercase lining-none">Recent findings matching "{searchQuery}"</span>
                        </Link>
                         <Link
                          to="/company-tracker"
                          onClick={() => setIsSearchOpen(false)}
                          className="block p-4 rounded-xl border border-black/5 bg-secondary/30 hover:border-primary/20 transition-all"
                        >
                          <span className="text-[10px] font-mono text-primary uppercase block mb-1">Company Match</span>
                          <span className="text-xs font-mono font-bold uppercase lining-none">Entity analysis matching "{searchQuery}"</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-primary/10 bg-background/95 backdrop-blur-2xl overflow-hidden"
          >
            <nav className="container py-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-4 px-6 py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-xl border border-transparent hover:border-primary/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
