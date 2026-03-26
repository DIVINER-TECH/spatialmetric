import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="relative overflow-hidden border-b border-black/5 bg-secondary/30">
      {/* HUD Background Flourish */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] border border-primary/10 rounded-full opacity-20 animate-pulse" />
      </div>
      
      <div className="container relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* System Status HUD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full glass-premium border-black/5 mb-12 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          >
            <div className="relative">
              <Target className="h-4 w-4 text-primary animate-pulse" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-primary/40 rounded-full scale-150 border-dashed"
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em]">Spatial Intelligence Active</span>
            <div className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
          </motion.div>

          {/* Holographic Heading */}
          <div className="relative mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold font-mono tracking-[calc(-0.05em)] uppercase leading-[0.85] relative z-10"
            >
              Intelligence for <br />
              <span className="text-primary relative inline-block">
                Spatial Computing
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-4 left-0 h-1 bg-primary/30 blur-sm"
                />
              </span>
            </motion.h1>
            <div className="absolute inset-0 pointer-events-none select-none opacity-20 blur-3xl bg-primary/20 -z-10 scale-150" />
          </div>

          {/* Terminal Subheading */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xs md:text-sm font-mono text-muted-foreground mb-16 max-w-3xl mx-auto uppercase tracking-[0.3em] leading-relaxed relative"
          >
            <span className="text-primary/60 mr-2">[ROOT::ACCESS//]</span>
            Real-time market velocity tracking, multi-node entity valuation, and strategic signal identification across the global XR infrastructure.
          </motion.p>

          {/* Premium CTA Matrix */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center mb-24"
          >
            <Link to="/dashboard">
              <Button size="lg" className="group relative w-full sm:w-auto gap-4 font-mono uppercase text-[10px] tracking-[0.2em] h-14 px-10 bg-primary text-black hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_50px_rgba(var(--primary),0.5)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <TrendingUp className="h-4 w-4" />
                Establish Control
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/market-intelligence">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-4 font-mono uppercase text-[10px] tracking-[0.2em] h-14 px-10 glass-premium border-black/5 text-foreground hover:bg-black/5 transition-all">
                <Zap className="h-4 w-4 text-primary" />
                Intelligence Stream
              </Button>
            </Link>
          </motion.div>

          {/* Stats Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
            {[
              { label: 'Active Capitalization', val: formatMarketCap(totalMarketCap), icon: Activity },
              { label: 'Neural Nodes Tracked', val: companies.length || "0", icon: Target },
              { label: 'Signal Refresh Rate', val: '24H/RT', icon: Zap }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + (i * 0.1) }}
                className="group relative p-8 glass-premium border-black/5 hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                <div className="text-4xl font-bold font-mono text-primary tracking-tighter mb-2 group-hover:translate-x-1 transition-transform">{stat.val}</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.3em] font-bold group-hover:text-foreground transition-colors flex items-center gap-2">
                  <stat.icon className="h-3 w-3" />
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sync Metadata */}
          <AnimatePresence>
            {snapshot?.asOfDate && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="mt-16 flex items-center justify-center gap-6"
              >
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-primary/50" />
                <p className="text-[9px] font-mono text-primary uppercase tracking-[0.5em] font-bold">
                  Last Synchronization: {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-primary/50" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Market Ticker with HUD overlay */}
      <div className="relative z-20 border-t border-black/5 bg-white/80 backdrop-blur-xl">
        <MarketTicker />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent h-4 top-0" />
      </div>
    </section>
  );
}
