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
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">
            Spatial<span className="text-primary">Metrics</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/dashboard">
            <Button variant="default" className="hidden sm:flex">
              Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/50 glass">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-2">Dashboard</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
