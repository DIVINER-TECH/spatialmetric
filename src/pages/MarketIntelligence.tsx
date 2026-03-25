import { useState } from 'react';
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
import { TrendingUp, TrendingDown, BarChart3, Globe, MapPin, RefreshCw } from 'lucide-react';
import { regionalData, getRegionalComparison } from '@/data/regions';
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const RegionalCard = ({ region }: { region: typeof regionalData[0] }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}B`;
    return `$${amount}M`;
  };

  return (
    <Card className="h-full bg-card/30 border-border/50">
      <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono uppercase tracking-widest">{region.displayName}</CardTitle>
          <Badge variant="outline" className={`font-mono text-[10px] uppercase tracking-tighter ${region.yoyGrowth > 30 ? 'bg-success/10 text-success border-success/30' : 'bg-primary/10 text-primary border-primary/30'}`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {region.yoyGrowth}% YoY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Total Investment</p>
            <p className="text-xl font-bold font-mono tracking-tighter">{formatCurrency(region.totalInvestment)}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Deal Count</p>
            <p className="text-xl font-bold font-mono tracking-tighter">{region.dealCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted/20 border border-border/50 rounded-lg">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Unicorns</p>
            <p className="text-sm font-bold font-mono">{region.unicornCount}</p>
          </div>
          <div className="text-center p-3 bg-muted/20 border border-border/50 rounded-lg">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Active VCs</p>
            <p className="text-sm font-bold font-mono">{region.activeVCs}</p>
          </div>
          <div className="text-center p-3 bg-muted/20 border border-border/50 rounded-lg">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Adoption</p>
            <p className="text-sm font-bold font-mono">{region.adoptionRate}%</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Top Sectors</p>
          <div className="flex flex-wrap gap-1">
            {region.topSectors.slice(0, 4).map(sector => (
              <Badge key={sector} variant="outline" className="text-[9px] font-mono uppercase tracking-tighter bg-muted/30">{sector}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/30">
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Key Players</p>
            <p className="text-xs font-medium leading-relaxed">{region.keyPlayers.slice(0, 3).join(', ')}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Emerging Startups</p>
            <p className="text-xs font-medium leading-relaxed">{region.emergingStartups.slice(0, 3).join(', ')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MarketIntelligence = () => {
  const { articles: contentItems } = useHybridArticles('market-intelligence', 9);
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
    {
      label: 'Tracked Companies',
      value: companies.length > 0 ? `${companies.length}` : '—',
      change: '',
      positive: true
    },
    {
      label: 'Average Daily Move',
      value: companies.length > 0 ? `${avgChange.toFixed(2)}%` : '—',
      change: companies.length > 0 ? `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%` : '',
      positive: avgChange >= 0
    },
    {
      label: 'Gainers / Losers',
      value: companies.length > 0 ? `${gainers} / ${losers}` : '—',
      change: '',
      positive: gainers >= losers
    },
    {
      label: 'Total Volume',
      value: companies.length > 0 ? `${totalVolume.toLocaleString()}` : '—',
      change: '',
      positive: true
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-10 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-mono tracking-tighter uppercase">Market Intelligence</h1>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                  Deep analysis of XR market dynamics, investment trends, and strategic insights
                </p>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <Button 
                  onClick={handleRefresh} 
                  disabled={isRefreshing}
                  variant="outline"
                  size="sm"
                  className="gap-2 font-mono text-[9px] uppercase tracking-widest border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 h-9 px-4"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
                  {isRefreshing ? "Syncing..." : "Sync Data"}
                </Button>
                <LiveIndicator label="Daily" />
              </div>
            </div>
            
            {isLoadingSnapshot ? (
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit animate-pulse">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
                  Synchronizing Global Market Data...
                </span>
              </div>
            ) : snapshot?.asOfDate ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] font-mono text-success uppercase tracking-widest">
                  System Online: {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                <span className="text-[10px] font-mono text-destructive uppercase tracking-widest">
                  Data Pipeline Offline: Run daily-market-snapshot
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Daily Metrics */}
        <section className="py-8 border-b border-border/50 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {dailyMetrics.map((metric, i) => (
                <Card key={i} className="bg-card/30 hover:border-primary/50 transition-colors group">
                  <CardContent className="p-4">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">{metric.label}</p>
                    <p className="text-2xl font-bold font-mono tracking-tighter group-hover:text-primary transition-colors">{metric.value}</p>
                    {metric.change ? (
                      <div className={`flex items-center gap-1 text-[10px] font-mono uppercase mt-1 ${metric.positive ? 'text-success' : 'text-destructive'}`}>
                        {metric.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {metric.change}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content with Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-10 bg-muted/20 border border-border/50 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-8 h-10">Overview</TabsTrigger>
                <TabsTrigger value="regional" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-8 h-10">Regional Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="grid lg:grid-cols-4 gap-10">
                  <div className="lg:col-span-3">
                    <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8 flex items-center gap-3">
                      <div className="h-px flex-1 bg-border/50" />
                      Strategic Intelligence Feed
                      <div className="h-px flex-1 bg-border/50" />
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {contentItems && contentItems.length > 0 ? (
                        contentItems.map(item => (
                          <ArticleCard key={item.id} article={item} />
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center border border-dashed border-border/50 rounded-xl">
                          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest italic">No AI insights published yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <AIInsightsFeed />

                    <Card className="bg-card/30">
                      <CardHeader className="pb-4 border-b border-border/50 bg-muted/20">
                        <CardTitle className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
                          <Globe className="h-3 w-3 text-primary" />
                          Regional Growth Index
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6 pt-6">
                        {growthComparison.slice(0, 5).map((region, i) => (
                          <div key={i} className="group">
                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-tight mb-2">
                              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{region.region}</span>
                              <span className="text-primary font-bold">{region.value}%</span>
                            </div>
                            <Progress value={(region.value / maxGrowth) * 100} className="h-1 bg-muted/30" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="regional" className="mt-0">
                <div className="grid lg:grid-cols-4 gap-10">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-2 mb-8 flex-wrap bg-muted/20 p-2 rounded-lg border border-border/50 w-fit">
                      {regionalData.map(region => (
                        <Badge
                          key={region.regionCode}
                          variant={activeRegion === region.regionCode ? 'default' : 'outline'}
                          className={`cursor-pointer text-[10px] font-mono uppercase tracking-widest px-4 py-1.5 transition-all ${activeRegion === region.regionCode ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
                          onClick={() => setActiveRegion(region.regionCode)}
                        >
                          {region.region}
                        </Badge>
                      ))}
                    </div>

                    <RegionalCard region={selectedRegion} />

                    {/* Quarterly Data */}
                    <Card className="mt-8 bg-card/30">
                      <CardHeader className="pb-4 border-b border-border/50 bg-muted/20">
                        <CardTitle className="text-[10px] font-mono uppercase tracking-widest">Quarterly Investment Trend (2025)</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-8">
                        <div className="space-y-6">
                          {selectedRegion.quarterlyData.map((q, i) => (
                            <div key={i} className="group">
                              <div className="flex justify-between text-[10px] font-mono uppercase tracking-tight mb-2">
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">{q.quarter}</span>
                                <span className="text-primary font-bold">${q.investment}M / {q.deals} deals</span>
                              </div>
                              <Progress
                                value={(q.investment / Math.max(...selectedRegion.quarterlyData.map(d => d.investment))) * 100}
                                className="h-1 bg-muted/30"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-8">
                    <AIInsightsFeed />

                    <Card className="bg-card/30">
                      <CardHeader className="pb-4 border-b border-border/50 bg-muted/20">
                        <CardTitle className="text-[10px] font-mono uppercase tracking-widest">Global Market Matrix</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-6">
                        {regionalData.filter(r => r.regionCode !== 'global').map((region, i) => (
                          <div
                            key={i}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group ${activeRegion === region.regionCode ? 'bg-primary/10 border-primary/30' : 'bg-muted/10 border-transparent hover:border-border/50 hover:bg-muted/20'}`}
                            onClick={() => setActiveRegion(region.regionCode)}
                          >
                            <div className="flex items-center gap-3">
                              <MapPin className={`h-4 w-4 transition-colors ${activeRegion === region.regionCode ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                              <span className="text-[11px] font-mono font-bold uppercase tracking-widest">{region.region}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold font-mono tracking-tighter">${(region.totalInvestment / 1000).toFixed(1)}B</p>
                              <p className={`text-[9px] font-mono uppercase font-bold ${region.yoyGrowth > 30 ? 'text-success' : 'text-primary'}`}>
                                +{region.yoyGrowth}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MarketIntelligence;
