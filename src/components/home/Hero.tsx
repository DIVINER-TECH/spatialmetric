import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Activity, Zap, Target } from "lucide-react";
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
    <section className="relative overflow-hidden border-b border-black/5 bg-secondary/30 min-h-screen flex flex-col">
      {/* HUD Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-brand opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        {/* HUD Flourish */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute top-24 left-8 text-[7px] font-mono text-primary/30 uppercase tracking-[0.6em] vertical-text">System::Operational</div>
        <div className="absolute bottom-24 right-8 text-[7px] font-mono text-primary/30 uppercase tracking-[0.6em] vertical-text">Intelligence::Active</div>

        {/* Animated Scanlines */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          <div className="animate-scanline" />
          <div className="animate-scanline [animation-delay:4s]" />
        </div>
      </div>

      <div className="flex-1 container relative z-10 flex flex-col items-center justify-center py-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* System Status HUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-premium border-black/5 mb-8 backdrop-blur-xl shadow-sm"
          >
            <div className="relative">
              <Target className="h-4 w-4 text-primary animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-primary/40 rounded-full scale-150 border-dashed"
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em]">Spatial Intelligence Terminal</span>
            <div className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
          </motion.div>

          {/* Holographic Heading */}
          <div className="relative mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tighter uppercase leading-[0.9] relative z-20"
            >
              Intelligence for <br />
              <span className="text-primary glow-text-subtle">Spatial Computing</span>
            </motion.h1>
            <div className="absolute inset-0 pointer-events-none select-none opacity-20 blur-3xl bg-primary/20 -z-10 scale-150" />
          </div>

          {/* Terminal Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] md:text-xs font-mono text-muted-foreground mb-12 max-w-2xl mx-auto uppercase tracking-[0.3em] leading-relaxed relative opacity-80"
          >
            <span className="text-primary/60 mr-2">[ROOT::ACCESS//]</span>
            Real-time market velocity tracking, multi-node entity valuation, and strategic signal identification across the global XR infrastructure.
          </motion.p>

          {/* Premium CTA Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link to="/dashboard">
              <Button size="lg" className="group relative w-full sm:w-auto gap-4 font-mono uppercase text-[10px] tracking-[0.2em] h-12 px-8 bg-primary text-black hover:bg-primary/90 transition-all shadow-xl overflow-hidden border-none rounded-full">
                <TrendingUp className="h-4 w-4" />
                Access Terminal
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/market-intelligence">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-4 font-mono uppercase text-[10px] tracking-[0.2em] h-12 px-8 glass-premium border-black/5 text-foreground hover:bg-black/5 transition-all rounded-full">
                <Zap className="h-4 w-4 text-primary" />
                Intelligence Feed
              </Button>
            </Link>
          </motion.div>

          {/* Stats Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 mb-12">
            {[
              { label: 'Active Capitalization', val: formatMarketCap(totalMarketCap), icon: Activity },
              { label: 'Neural Nodes Tracked', val: companies.length || "0", icon: Target },
              { label: 'Signal Refresh Rate', val: '24H/RT', icon: Zap }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="group relative p-6 glass-premium border-black/5 hover:border-primary/50 transition-all duration-500 overflow-hidden text-left bg-white/40"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                <div className="text-3xl font-bold font-mono text-primary tracking-tighter mb-1 group-hover:translate-x-1 transition-transform">{stat.val}</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em] font-bold group-hover:text-foreground transition-colors flex items-center gap-2">
                  <stat.icon className="h-3 w-3 opacity-50" />
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sync Metadata */}
          {snapshot?.asOfDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="flex items-center justify-center gap-6"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50" />
              <p className="text-[8px] font-mono text-primary uppercase tracking-[0.5em] font-bold">
                Nodes Synced: {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit" })}
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/50" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Market Ticker with HUD overlay */}
      <div className="relative z-20 mt-auto border-t border-black/5 bg-white/90 backdrop-blur-2xl">
        <MarketTicker />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent h-4 top-0" />
      </div>
    </section>
  );
}
