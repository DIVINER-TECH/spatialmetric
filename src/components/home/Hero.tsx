import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Activity, Zap } from "lucide-react";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { MarketTicker } from "./MarketTicker";

export function Hero() {
  const { data: snapshot } = useMarketSnapshot();
  const companies = snapshot?.topCompanies ?? [];
  const totalMarketCap = companies.reduce((sum, c) => sum + (c.marketCap ?? 0), 0);

  const formatMarketCap = (value: number) => {
    if (!value) return "—";
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    return `$${(value / 1e6).toFixed(0)}M`;
  };

  return (
    <section className="relative overflow-hidden border-b border-border/50">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(var(--border-rgb),0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--border-rgb),0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="container relative pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/20 border border-border/50 mb-8 animate-fade-in backdrop-blur-sm">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">System Status: Operational</span>
            <div className="flex h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tighter uppercase mb-8 animate-fade-in leading-[0.9]" style={{ animationDelay: "0.1s" }}>
            Intelligence for <br />
            <span className="text-primary">Spatial Computing</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm md:text-base font-mono text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in uppercase tracking-widest leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Real-time market tracking, entity valuation analysis, and strategic opportunity identification in the XR economy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto gap-3 font-mono uppercase text-xs tracking-widest h-12 px-8">
                <TrendingUp className="h-4 w-4" />
                Access Terminal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/market-intelligence">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-3 font-mono uppercase text-xs tracking-widest h-12 px-8 border-border/50 bg-muted/10">
                <Zap className="h-4 w-4" />
                Intelligence Feed
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-primary/50 transition-colors">
              <div className="text-3xl font-bold font-mono text-primary tracking-tighter group-hover:scale-105 transition-transform">{formatMarketCap(totalMarketCap)}</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mt-2">Active Market Cap</div>
            </div>
            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-primary/50 transition-colors">
              <div className="text-3xl font-bold font-mono text-primary tracking-tighter group-hover:scale-105 transition-transform">{companies.length || "—"}</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mt-2">Tracked Entities</div>
            </div>
            <div className="p-6 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-primary/50 transition-colors">
              <div className="text-3xl font-bold font-mono text-primary tracking-tighter group-hover:scale-105 transition-transform">24H</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mt-2">Update Frequency</div>
            </div>
          </div>

          {/* Data freshness */}
          {snapshot?.asOfDate && (
            <div className="mt-10 flex items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="h-px w-8 bg-border/50" />
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                Last Sync: {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <div className="h-px w-8 bg-border/50" />
            </div>
          )}
        </div>
      </div>

      {/* Market Ticker */}
      <div className="border-t border-border/50 bg-muted/5">
        <MarketTicker />
      </div>
    </section>
  );
}
