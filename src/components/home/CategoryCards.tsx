import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Cpu, Calendar, Building2, Globe, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Market Intelligence",
    description: "Deep analysis of XR market trends, valuations, and investment opportunities",
    icon: TrendingUp,
    href: "/market-intelligence",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Tech Explain",
    description: "Breaking down complex spatial computing technologies for investors",
    icon: Cpu,
    href: "/tech-explain",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    title: "Events & Ecosystem",
    description: "Coverage of industry events, partnerships, and ecosystem developments",
    icon: Calendar,
    href: "/events",
    color: "from-success/20 to-success/5",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    title: "Company Structure",
    description: "In-depth analysis of XR companies, financials, and corporate strategy",
    icon: Building2,
    href: "/company-tracker",
    color: "from-warning/20 to-warning/5",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    title: "Spatial Updates",
    description: "Daily updates on spatial computing developments and launches",
    icon: Globe,
    href: "/spatial-updates",
    color: "from-chart-2/20 to-chart-2/5",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
];

export function CategoryCards() {
  return (
    <section className="container py-20 md:py-28">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Platform Navigation</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase mb-2">Intelligence Sectors</h2>
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Discover strategic insights across specialized coverage areas</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.title} to={category.href} className="group">
            <Card className={`h-full bg-card/30 border-border/50 hover:border-primary/50 transition-all duration-500 backdrop-blur-sm relative overflow-hidden`}>
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -mr-8 -mt-8 rotate-45 group-hover:bg-primary/10 transition-colors" />
              
              <CardContent className="p-8">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.iconBg} border border-border/50 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <category.icon className={`h-7 w-7 ${category.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold font-mono tracking-tighter uppercase mb-3 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                  {category.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Initialize Sector Access
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
