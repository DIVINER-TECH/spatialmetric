import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Activity, Zap, Target, ChevronDown, Layers, MousePointer2 } from "lucide-react";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { MarketTicker } from "./MarketTicker";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { data: snapshot } = useMarketSnapshot();
  const companies = snapshot?.topCompanies ?? [];
  const totalMarketCap = companies.reduce((sum, c) => sum + (c.marketCap ?? 0), 0);

  const formatMarketCap = (value: number) => {
    if (!value) return "—";
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    return `$${(value / 1e6).toFixed(0)}M`;
  };

  // Viewpoint 1 transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const y1 = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  // Viewpoint 2 transforms
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.6, 0.9], [0, 1, 1]);
  const scale2 = useTransform(scrollYProgress, [0.4, 0.6], [0.9, 1]);
  const y2 = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

  // HUD line animate
  const scanY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative bg-secondary/30 min-h-[180vh]">
      {/* Persistent HUD Grid & Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-brand opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        {/* Animated Scanline */}
        <motion.div 
          style={{ top: scanY }}
          className="absolute left-0 right-0 h-[2px] bg-primary/20 blur-[1px] z-10"
        />
        
        {/* Corner HUD Markers */}
        <div className="absolute top-24 left-8 text-[8px] font-mono text-primary/40 uppercase tracking-[0.5em] vertical-text">System::Operational</div>
        <div className="absolute bottom-24 right-8 text-[8px] font-mono text-primary/40 uppercase tracking-[0.5em] vertical-text">Sector::Spatial</div>
        
        <div className="absolute top-32 right-12 w-32 h-32 border border-primary/5 rounded-full animate-spin-slow" />
        <div className="absolute bottom-32 left-12 w-48 h-48 border border-primary/5 rounded-full animate-reverse-spin" />
      </div>

      {/* VIEWPOINT 1: STRATEGIC ENTRY */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-20">
        <motion.div 
          style={{ opacity: opacity1, scale: scale1, y: y1 }}
          className="container px-4 text-center"
        >
          {/* System Status HUD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full glass-premium border-black/5 mb-12 backdrop-blur-xl shadow-lg"
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

          <div className="relative mb-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-mono tracking-tighter uppercase leading-[0.85] relative z-10">
              Intelligence for <br />
              <span className="text-primary glow-text">Spatial Computing</span>
            </h1>
          </div>

          <p className="text-xs md:text-sm font-mono text-muted-foreground mb-16 max-w-3xl mx-auto uppercase tracking-[0.3em] leading-relaxed">
            <span className="text-primary/60 mr-2">[ROOT::ACCESS//]</span>
            Real-time market velocity tracking, multi-node entity valuation, and strategic signal identification across the global XR infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="group relative w-full sm:w-auto gap-4 font-mono uppercase text-[10px] tracking-[0.2em] h-14 px-10 bg-primary text-black hover:bg-primary/90 transition-all shadow-xl overflow-hidden">
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
          </div>

          {/* Scroll Prompt */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden lg:flex"
          >
            <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-primary">Scroll to Synchronize</span>
            <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
            <MousePointer2 className="h-3 w-3 text-primary animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* VIEWPOINT 2: DATA MATRIX */}
      <div className="relative h-[80vh] z-20 flex items-center justify-center">
        <motion.div 
          style={{ opacity: opacity2, scale: scale2, y: y2 }}
          className="container px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/60 mb-12 flex items-center gap-4">
               <div className="h-px flex-1 bg-primary/20" />
               Live Sector Diagnostics
               <div className="h-px flex-1 bg-primary/20" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              {[
                { label: 'Active Capitalization', val: formatMarketCap(totalMarketCap), icon: Activity, desc: 'Aggregated ecosystem valuation' },
                { label: 'Neural Nodes Tracked', val: companies.length || "0", icon: Target, desc: 'Verified institutional entities' },
                { label: 'Signal Refresh Rate', val: '24H/RT', icon: Zap, desc: 'Real-time telemetry status' }
              ].map((stat, i) => (
                <div key={i} className="group relative p-8 glass-premium border-black/10 hover:border-primary/40 transition-all duration-700 bg-white/40">
                  <div className="absolute top-0 right-0 p-3">
                    <stat.icon className="h-4 w-4 text-primary rotate-12 group-hover:rotate-0 transition-transform" />
                  </div>
                  <div className="text-4xl font-black font-mono text-primary tracking-tighter mb-2">{stat.val}</div>
                  <div className="text-[10px] font-mono text-foreground uppercase tracking-[0.2em] font-bold mb-3">{stat.label}</div>
                  <div className="text-[8px] font-mono text-muted-foreground uppercase leading-relaxed opacity-60">Status: {stat.desc}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-black/5 p-12 rounded-3xl border border-black/5 backdrop-blur-md">
              <div className="space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Layers className="h-3 w-3 text-primary" />
                  <span className="text-[9px] font-mono font-bold text-primary uppercase">Multi-Pass Validation</span>
                </div>
                <h3 className="text-2xl font-bold font-mono tracking-tight uppercase">Strategic Infrastructure Layer</h3>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed uppercase tracking-wider">
                  Our system continuously parses SEC filings, venture capital disbursements, and holographic hardware patent streams to maintain sector dominance. 
                </p>
              </div>
              <div className="flex-shrink-0">
                 <div className="h-32 w-32 relative">
                    <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse" />
                    <div className="absolute inset-4 border border-primary/10 rounded-full animate-reverse-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Zap className="h-8 w-8 text-primary" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Market Ticker with HUD overlay */}
      <div className="relative z-30 border-t border-black/5 bg-white/90 backdrop-blur-2xl">
        <MarketTicker />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent h-4 top-0" />
      </div>
    </section>
  );
}
