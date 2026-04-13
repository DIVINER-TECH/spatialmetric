import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { AIInsightsFeed } from '@/components/ai/AIInsightsFeed';
import { useHybridArticles } from '@/hooks/useHybridArticles';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useMarketSnapshot } from '@/hooks/useMarketSnapshot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, BarChart3, Globe, MapPin, RefreshCw, Activity, Loader2, ChevronDown } from 'lucide-react';
import { regionalData, getRegionalComparison } from '@/data/regions';
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/shared/CountUp";
import { RegionalIntelligenceMap } from "@/components/intelligence/RegionalIntelligenceMap";

const RegionalCard = ({ region }: { region: typeof regionalData[0] }) => {
  const formatCurrencyValue = (amount: number) => {
    if (amount >= 1000) return amount / 1000;
    return amount;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full glass-premium border-black/5 overflow-hidden relative shadow-sm">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Globe className="h-24 w-24 text-primary" />
        </div>
        
        <CardHeader className="pb-3 border-b border-black/5 bg-black/[0.03]">
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="text-sm font-mono uppercase tracking-[0.3em] font-bold">{region.displayName}</CardTitle>
            <Badge className={`font-mono text-[10px] uppercase tracking-tighter ${region.yoyGrowth > 30 ? 'bg-primary text-black' : 'bg-white text-primary border border-primary/30'}`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {region.yoyGrowth}% YoY
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 dark:bg-muted/20 p-4 rounded-xl border border-black/5 dark:border-white/5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Total Investment</p>
              <div className="text-2xl font-bold font-mono tracking-tighter text-primary-text">
                <CountUp 
                  value={formatCurrencyValue(region.totalInvestment)} 
                  prefix="$" 
                  suffix={region.totalInvestment >= 1000 ? "B" : "M"} 
                  decimals={region.totalInvestment >= 1000 ? 1 : 0} 
                />
              </div>
            </div>
            <div className="bg-secondary/50 dark:bg-muted/20 p-4 rounded-xl border border-black/5 dark:border-white/5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Deal Count</p>
              <div className="text-2xl font-bold font-mono tracking-tighter text-foreground">
                <CountUp value={region.dealCount} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Unicorns', val: region.unicornCount },
              { label: 'Active VCs', val: region.activeVCs },
              { label: 'Adoption', val: `${region.adoptionRate}%` }
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 bg-black/[0.03] border border-black/5 rounded-xl">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-sm font-bold font-mono text-primary-text">{stat.val}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Activity className="h-3 w-3 text-primary" />
              Strategic Sectors
            </p>
            <div className="flex flex-wrap gap-1.5">
              {region.topSectors.map(sector => (
                <Badge key={sector} variant="outline" className="text-[9px] font-mono uppercase tracking-tighter bg-primary/5 border-primary/20 text-primary px-3 py-1">
                  {sector}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 space-y-3">
            <div className="flex justify-between items-start">
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Key Players</p>
              <p className="text-[10px] font-mono font-bold text-right max-w-[150px]">{region.keyPlayers.slice(0, 3).join(', ')}</p>
            </div>
            <div className="flex justify-between items-start">
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Emerging</p>
              <p className="text-[10px] font-mono font-bold text-primary text-right max-w-[150px]">{region.emergingStartups.slice(0, 3).join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MarketIntelligence = () => {
  const { articles: contentItems, isLoading: isLoadingArticles, hasMore, loadMore } = useHybridArticles('market-intelligence', 9);
  const { data: snapshot, isLoading: isLoadingSnapshot } = useMarketSnapshot();
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRegion, setActiveRegion] = useState('global');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke("daily-pipeline", {
        body: { triggered_by: "manual_intelligence" },
      });
      if (error) throw error;
      toast.success("Market data pipeline triggered successfully");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["marketSnapshot"] });
        queryClient.invalidateQueries({ queryKey: ["contentItems"] });
      }, 5000);
    } catch (error) {
      console.error("Failed to trigger pipeline:", error);
      toast.error("Failed to trigger data refresh");
    } finally {
      setIsRefreshing(false);
    }
  };

  const growthComparison = getRegionalComparison('yoyGrowth');
  const maxGrowth = Math.max(...growthComparison.map(r => r.value));
  const selectedRegion = regionalData.find(r => r.regionCode === activeRegion) || regionalData[0];

  const companies = snapshot?.topCompanies ?? [];
  const avgChange = companies.length > 0
    ? companies.reduce((sum, c) => sum + c.changePercent, 0) / companies.length
    : 0;
  const gainers = companies.filter((c) => c.changePercent > 0).length;
  const losers = companies.filter((c) => c.changePercent < 0).length;
  const totalVolume = companies.reduce((sum, c) => sum + c.volume, 0);

  const dailyMetrics = [
    { label: 'Tracked Assets', value: companies.length, raw: companies.length, status: 'AI SYNCHRONIZING', prefix: '', suffix: '', decimals: 0, positive: true },
    { label: 'Market Velocity', value: avgChange, raw: avgChange, status: 'PENDING', prefix: '', suffix: '%', decimals: 2, positive: avgChange >= 0 },
    { label: 'Gainers Bias', value: gainers, raw: gainers, status: 'SCANNING', prefix: '', suffix: ' UP', decimals: 0, positive: true },
    { label: 'Signal Volume', value: totalVolume, raw: totalVolume, status: 'LOADING', prefix: '', suffix: '', decimals: 0, positive: true },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      <main className="flex-1 relative z-10">
        {/* HUD Sub-Navigation/Header */}
        <section className="pt-16 pb-12 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="h-16 w-16 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center bg-primary/5 backdrop-blur-sm"
                >
                  <BarChart3 className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-black font-mono tracking-tighter uppercase leading-none text-foreground">
                    Intelligence<span className="text-primary">.OS</span>
                  </h1>
                  <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.6em] mt-3">
                    Terminal Access // Global Market Analytics v2.0
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md p-2 rounded-full border border-black/5 shadow-sm">
              <Button 
                onClick={handleRefresh} 
                disabled={isRefreshing}
                className={`gap-3 font-mono text-[10px] uppercase tracking-widest rounded-full h-10 px-6 transition-all ${
                  isRefreshing ? "bg-muted cursor-not-allowed" : "bg-primary text-black hover:bg-primary/80 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                }`}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "SYNCING DATA..." : "CALIBRATE SYSTEM"}
              </Button>
              <LiveIndicator label="RT-STREAM" />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoadingSnapshot ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4 p-8 glass-premium border-primary/30 rounded-2xl animate-pulse"
              >
                <div className="h-4 w-4 rounded-full bg-primary animate-ping" />
                <span className="text-sm font-mono text-primary uppercase tracking-[0.3em] font-bold">
                  Establishing Neural Link with Global Exchanges...
                </span>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {dailyMetrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="glass-premium border-black h-full group hover:border-primary/50 transition-all cursor-crosshair overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                      <CardContent className="p-5">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center justify-between">
                          {metric.label}
                          <span className="h-1 w-1 rounded-full bg-primary/40 animate-pulse" />
                        </p>
                        <div className="text-2xl font-bold font-mono tracking-tighter group-hover:text-primary transition-colors">
                          {companies.length > 0 ? (
                            <CountUp 
                              value={metric.raw} 
                              decimals={metric.decimals} 
                              prefix={metric.prefix} 
                              suffix={metric.suffix} 
                            />
                          ) : metric.status}
                        </div>
                        {metric.value !== 0 && metric.label === 'Market Velocity' && (
                          <div className={`flex items-center gap-1 text-[10px] font-mono uppercase mt-2 ${metric.positive ? 'text-primary-text' : 'text-destructive'}`}>
                            {metric.positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                            {metric.value >= 0 ? '+' : ''}{metric.value.toFixed(2)}%
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Intelligence Grid */}
        <section className="py-20 px-4 md:px-8 border-t border-black">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-16 flex-wrap gap-6">
              <TabsList className="bg-white/50 backdrop-blur-md border border-black/5 p-1.5 rounded-full scale-110 origin-left shadow-sm">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-black font-mono text-[10px] uppercase tracking-widest px-10 h-10 rounded-full transition-all">TERMINAL FEED</TabsTrigger>
                <TabsTrigger value="regional" className="data-[state=active]:bg-primary data-[state=active]:text-black font-mono text-[10px] uppercase tracking-widest px-10 h-10 rounded-full transition-all">REGIONAL MATRIX</TabsTrigger>
              </TabsList>

              <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent hidden md:block mx-8" />

              <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5">
                <Globe className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-text font-bold">Active Nodes: 124/124</span>
              </div>
            </div>

            <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
              <div className="grid lg:grid-cols-4 gap-12">
                <div className="lg:col-span-3 space-y-12">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoadingArticles ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[400px] glass-premium border-black animate-pulse rounded-2xl" />
                      ))
                    ) : (
                      contentItems?.map((article, i) => (
                        <ArticleCard key={article.id} article={article} index={i} />
                      ))
                    )}
                  </div>

                  {hasMore && (
                    <div className="flex justify-center pt-8">
                      <Button 
                        onClick={loadMore} 
                        variant="outline" 
                        disabled={isLoadingArticles}
                        className="glass-premium border-primary/20 hover:border-primary px-10 h-14 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] group"
                      >
                        {isLoadingArticles ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
                        )}
                        Load More Intelligence
                      </Button>
                    </div>
                  )}
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="space-y-10"
                >
                  <AIInsightsFeed />

                  <Card className="glass-premium border-black/5 overflow-hidden shadow-sm">
                    <CardHeader className="pb-4 border-b border-black/5 bg-black/[0.02]">
                      <CardTitle className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        GVA Growth Momentum
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-8">
                      {growthComparison.slice(0, 5).map((region, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          className="group space-y-2"
                        >
                          <div className="flex justify-between text-[10px] font-mono uppercase tracking-tight">
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">{region.region}</span>
                            <span className="text-primary font-bold">{region.value}%</span>
                          </div>
                          <Progress value={(region.value / maxGrowth) * 100} className="h-1 bg-primary/10" />
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="regional" className="mt-0 focus-visible:outline-none">
              <div className="grid lg:grid-cols-4 gap-12">
                <div className="lg:col-span-3 space-y-10">
                  <RegionalIntelligenceMap 
                    activeRegion={activeRegion} 
                    onRegionChange={setActiveRegion} 
                  />

                  <div className="flex items-center gap-2 p-2 rounded-full bg-secondary/80 dark:bg-muted/20 border border-black/5 dark:border-white/5 w-fit mt-10">
                    {regionalData.map(region => (
                      <button
                        key={region.regionCode}
                        className={`text-[9px] font-mono uppercase tracking-widest px-6 py-2.5 rounded-full transition-all ${
                          activeRegion === region.regionCode 
                            ? 'bg-primary text-black font-bold shadow-[0_0_15px_rgba(var(--primary),0.2)]' 
                            : 'text-muted-foreground hover:text-white'
                        }`}
                        onClick={() => setActiveRegion(region.regionCode)}
                      >
                        {region.region}
                      </button>
                    ))}
                  </div>

                  <RegionalCard region={selectedRegion} />
                  
                  <Card className="glass-premium border-black mt-12">
                    <CardHeader className="pb-4 border-b border-black bg-black/40">
                      <CardTitle className="text-[10px] font-mono uppercase tracking-widest font-bold">Timeline Velocity: Quarterly Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-10">
                      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {selectedRegion.quarterlyData.map((q, i) => (
                          <div key={i} className="group p-4 bg-secondary/30 dark:bg-muted/10 rounded-xl border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all">
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-3">
                              <span className="text-primary font-bold">{q.quarter}</span>
                              <span className="text-muted-foreground">DEALS: {q.deals}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xl font-bold font-mono tracking-tighter text-foreground">${q.investment}M</span>
                              <Progress value={(q.investment / 1500) * 100} className="h-1.5 flex-1 bg-black/5 dark:bg-white/5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-10">
                  <AIInsightsFeed />
                  <Card className="glass-premium border-black/5 dark:bg-muted/10 overflow-hidden shadow-2xl">
                    <CardHeader className="pb-4 border-b border-black/5 bg-secondary/30 dark:bg-muted/20">
                      <CardTitle className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-foreground">Node Connectivity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {regionalData.filter(r => r.regionCode !== 'global').map((region, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ x: 5 }}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                            activeRegion === region.regionCode 
                              ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]' 
                              : 'bg-secondary/50 dark:bg-muted/10 border-black/5 dark:border-white/10 hover:border-primary/20'
                          }`}
                          onClick={() => setActiveRegion(region.regionCode)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${activeRegion === region.regionCode ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                            <span className="text-[11px] font-mono font-bold uppercase tracking-widest">{region.region}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold font-mono tracking-tighter text-primary">${(region.totalInvestment / 1000).toFixed(1)}B</p>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MarketIntelligence;
