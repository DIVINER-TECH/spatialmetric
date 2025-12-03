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
    href: "/companies",
    color: "from-warning/20 to-warning/5",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    title: "Spatial Updates",
    description: "Real-time updates on spatial computing developments and launches",
    icon: Globe,
    href: "/spatial-updates",
    color: "from-chart-2/20 to-chart-2/5",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
];

export function CategoryCards() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Explore Content</h2>
        <p className="text-muted-foreground">Discover insights across all our coverage areas</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.title} to={category.href}>
            <Card className={`group h-full bg-gradient-to-br ${category.color} border-border/50 hover:border-primary/50 transition-all duration-300`}>
              <CardContent className="pt-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg} mb-4`}>
                  <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
