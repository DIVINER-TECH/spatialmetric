import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Menu,
  X,
  TrendingUp,
  Cpu,
  Calendar,
  Building2,
  Globe,
  Search,
  Rocket,
  Landmark
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

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:scale-110 transition-transform duration-300">
            <img src="/logo.png" alt="SpatialMetric Logo" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-mono tracking-tighter uppercase leading-none">
              Spatial<span className="text-primary">Metrics</span>
            </span>
            <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.4em] mt-1">Intelligence Terminal</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-md relative group"
            >
              <item.icon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-primary/5 hover:text-primary transition-colors">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/dashboard">
            <Button variant="default" className="hidden sm:flex font-mono text-[10px] uppercase tracking-[0.2em] px-6 h-9 shadow-[0_0_15px_rgba(var(--primary),0.2)] hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all">
              Access Terminal
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-primary/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="container py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-4 px-4 py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-lg border border-transparent hover:border-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="mt-4">
              <Button className="w-full font-mono text-[10px] uppercase tracking-[0.2em] h-12">Access Terminal</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
