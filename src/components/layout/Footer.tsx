import { Link } from "react-router-dom";
import { BarChart3, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  content: [
    { label: "Market Intelligence", href: "/market-intelligence" },
    { label: "Company Tracker", href: "/company-tracker" },
    { label: "Tech Explain", href: "/tech-explain" },
    { label: "Events & Ecosystem", href: "/events" },
  ],
  resources: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "API Access", href: "/api" },
    { label: "Reports", href: "/reports" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-20 backdrop-blur-md">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary group-hover:scale-110 transition-transform">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-mono tracking-tighter uppercase">SpatialMetrics</span>
            </Link>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8 leading-relaxed opacity-80">
              Strategic intelligence and market analytics for the spatial computing ecosystem.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-muted/20 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted/20 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted/20 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-6">Intelligence</h4>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[10px] font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[10px] font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-6">Corporate</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[10px] font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} SpatialMetrics // System Version 4.2.0
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Protocol</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
