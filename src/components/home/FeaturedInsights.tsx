import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp, Cpu, Calendar, Building2, Globe } from "lucide-react";

const categoryIcons = {
  "Market Intelligence": TrendingUp,
  "Tech Explain": Cpu,
  "Events & Ecosystem": Calendar,
  "Company Structure": Building2,
  "Spatial Updates": Globe,
};

const insights = [
  {
    id: 1,
    title: "Apple Vision Pro: Market Impact Analysis After Six Months",
    excerpt: "A deep dive into how Apple's spatial computing device has reshaped the XR market landscape and investment opportunities.",
    category: "Market Intelligence",
    readTime: "8 min read",
    date: "Dec 2, 2024",
    trending: true,
  },
  {
    id: 2,
    title: "Understanding LiDAR Technology in Modern XR Devices",
    excerpt: "Breaking down the technical foundations of depth sensing and its role in creating immersive spatial experiences.",
    category: "Tech Explain",
    readTime: "6 min read",
    date: "Dec 1, 2024",
    trending: false,
  },
  {
    id: 3,
    title: "CES 2025: What to Expect from Spatial Computing Announcements",
    excerpt: "Preview of the major XR and spatial computing reveals expected at the world's largest tech conference.",
    category: "Events & Ecosystem",
    readTime: "5 min read",
    date: "Nov 30, 2024",
    trending: true,
  },
  {
    id: 4,
    title: "Meta's Reality Labs: Q3 Financials and Strategic Direction",
    excerpt: "Analyzing Meta's continued investment in the metaverse and its impact on shareholder value.",
    category: "Company Structure",
    readTime: "7 min read",
    date: "Nov 29, 2024",
    trending: false,
  },
  {
    id: 5,
    title: "Enterprise XR Adoption Reaches Record Highs in Manufacturing",
    excerpt: "New data shows accelerating adoption of AR/VR tools in industrial settings, creating new investment thesis.",
    category: "Spatial Updates",
    readTime: "4 min read",
    date: "Nov 28, 2024",
    trending: true,
  },
  {
    id: 6,
    title: "The Hidden Value in Spatial Computing Patent Portfolios",
    excerpt: "How IP analysis can reveal undervalued companies in the XR supply chain.",
    category: "Market Intelligence",
    readTime: "9 min read",
    date: "Nov 27, 2024",
    trending: false,
  },
];

export function FeaturedInsights() {
  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Insights</h2>
          <p className="text-muted-foreground">Latest analysis and market intelligence</p>
        </div>
        <Link
          to="/market-intelligence"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          View All Insights
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight) => {
          const CategoryIcon = categoryIcons[insight.category as keyof typeof categoryIcons];
          return (
            <Card key={insight.id} className="group hover:border-primary/50 transition-all duration-300 bg-card/50 hover:bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CategoryIcon className="h-3 w-3" />
                    {insight.category}
                  </Badge>
                  {insight.trending && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Trending
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm line-clamp-2">{insight.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {insight.readTime}
                </div>
                <span>{insight.date}</span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
