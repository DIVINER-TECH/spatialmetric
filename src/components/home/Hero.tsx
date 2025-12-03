import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Activity, Zap } from "lucide-react";
import { MarketTicker } from "./MarketTicker";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl opacity-20" />
      
      <div className="container relative pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Market Data</span>
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Investment Intelligence for{" "}
            <span className="text-gradient">Spatial Computing</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Track market trends, analyze company valuations, and discover opportunities 
            in VR, AR, and the metaverse economy with real-time data and expert insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <TrendingUp className="h-5 w-5" />
                Explore Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/market-intelligence">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <Zap className="h-5 w-5" />
                Market Intelligence
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">$52B+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Market Cap Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">847</div>
              <div className="text-xs md:text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
              <div className="text-xs md:text-sm text-muted-foreground">Live Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Ticker */}
      <MarketTicker />
    </section>
  );
}
