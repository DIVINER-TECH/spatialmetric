import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Globe, DollarSign, Users, Building2, BarChart3 } from 'lucide-react';
import { regionalData, type RegionalMetrics } from '@/data/regions';
import { AIInsightsFeed } from '@/components/ai/AIInsightsFeed';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { CountUp } from '@/components/shared/CountUp';

const RegionalCard = ({ region }: { region: RegionalMetrics }) => {
  const formatNumber = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(1)}B`;
    return `$${n}M`;
  };

  return (
    <Card className="glass-premium border-black/5 overflow-hidden transition-all hover:shadow-lg group">
      <CardHeader className="pb-4 border-b border-black/5 bg-black/[0.02]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{region.displayName}</CardTitle>
          <Badge variant={region.yoyGrowth > 30 ? 'default' : 'secondary'} className="text-xs">
            {region.yoyGrowth > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {region.yoyGrowth}% YoY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-widest">
              <DollarSign className="h-3 w-3" /> Investment
            </p>
            <div className="text-xl font-bold font-mono tracking-tighter">
              <CountUp 
                value={region.totalInvestment >= 1000 ? region.totalInvestment / 1000 : region.totalInvestment} 
                prefix="$" 
                suffix={region.totalInvestment >= 1000 ? "B" : "M"} 
                decimals={region.totalInvestment >= 1000 ? 1 : 0}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-widest">
              <BarChart3 className="h-3 w-3" /> Deals
            </p>
            <div className="text-xl font-bold font-mono tracking-tighter">
              <CountUp value={region.dealCount} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Unicorns
            </p>
            <p className="text-lg font-bold text-foreground">{region.unicornCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" /> VCs
            </p>
            <p className="text-lg font-bold text-foreground">{region.activeVCs}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-muted-foreground mb-1">Adoption Rate</p>
          <Progress value={region.adoptionRate * 10} className="h-1.5" />
          <p className="text-[10px] text-right text-muted-foreground mt-0.5">{region.adoptionRate}%</p>
        </div>

        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5">Top Sectors</p>
          <div className="flex flex-wrap gap-1">
            {region.topSectors.slice(0, 4).map(s => (
              <Badge key={s} variant="outline" className="text-[9px]">{s}</Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5">Key Players</p>
          <p className="text-xs text-foreground font-medium">{region.keyPlayers.slice(0, 4).join(', ')}</p>
        </div>

        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5">Emerging Startups</p>
          <p className="text-xs text-primary-text font-bold">{region.emergingStartups.slice(0, 3).join(', ')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const RegionalIntelligence = () => {
  const [activeRegion, setActiveRegion] = useState('all');
  const globalData = regionalData.find(r => r.regionCode === 'global');
  const regions = regionalData.filter(r => r.regionCode !== 'global');

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      <main className="flex-1">
        <section className="py-20 border-b border-black/5 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
              <div className="h-16 w-16 glass-premium flex items-center justify-center border-black/5 rounded-2xl shadow-sm">
                <Globe className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase leading-none">Regional <span className="text-primary">Intelligence</span></h1>
                <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.5em] mt-3">
                  Global XR market metrics & performance vectors
                </p>
              </div>
              <div className="ml-auto flex items-center gap-4 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-black/5">
                <LiveIndicator label="RT-SYNC" />
              </div>
            </div>
          </div>
        </section>

        {/* Global Summary */}
        {globalData && (
          <section className="py-12 border-b border-black/5 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { label: 'Global Investment', raw: globalData.totalInvestment, prefix: '$', suffix: 'B', divisor: 1000, change: `+${globalData.yoyGrowth}% YoY`, positive: true },
                  { label: 'Total Deals', raw: globalData.dealCount },
                  { label: 'Avg Deal Size', raw: globalData.avgDealSize, prefix: '$', suffix: 'M' },
                  { label: 'Unicorns', raw: globalData.unicornCount },
                  { label: 'Active VCs', raw: globalData.activeVCs },
                  { label: 'Market Size', raw: globalData.marketSize, prefix: '$', suffix: 'B', divisor: 1000 },
                ].map((stat, i) => (
                  <Card key={i} className="glass-premium border-black/5 hover:border-primary/50 transition-all group overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/10 group-hover:bg-primary transition-colors" />
                    <CardContent className="p-5">
                      <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-3">{stat.label}</p>
                      <div className="text-2xl font-bold font-mono tracking-tighter group-hover:text-primary transition-colors">
                        <CountUp 
                          value={stat.divisor ? stat.raw / stat.divisor : stat.raw || 0} 
                          prefix={stat.prefix || ""} 
                          suffix={stat.suffix || ""} 
                          decimals={stat.divisor ? 1 : 0} 
                        />
                      </div>
                      {stat.change && (
                        <p className={`text-[9px] font-mono uppercase mt-2 font-bold ${stat.positive ? 'text-success' : 'text-destructive'}`}>
                          {stat.change}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regional Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-10">
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" onValueChange={setActiveRegion}>
                  <TabsList className="mb-8 bg-muted/20 border border-border/50 p-1 flex-wrap h-auto">
                    <TabsTrigger value="all" className="text-[10px] font-mono uppercase tracking-widest px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Regions</TabsTrigger>
                    {regions.map(r => (
                      <TabsTrigger key={r.regionCode} value={r.regionCode} className="text-[10px] font-mono uppercase tracking-widest px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        {r.region}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="all" className="mt-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {regions.map(region => (
                        <RegionalCard key={region.regionCode} region={region} />
                      ))}
                    </div>
                  </TabsContent>

                  {regions.map(region => (
                    <TabsContent key={region.regionCode} value={region.regionCode} className="mt-0">
                      <div className="grid md:grid-cols-2 gap-8">
                        <RegionalCard region={region} />
                        <Card className="glass-premium border-black/5 dark:bg-muted/10">
                          <CardHeader className="pb-4 border-b border-black/5 bg-secondary/30 dark:bg-muted/20">
                            <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-foreground">Quarterly Investment Trend (2025)</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-8">
                            <div className="space-y-6">
                              {region.quarterlyData.map((q, i) => (
                                <div key={i}>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{q.quarter}</span>
                                    <span className="text-xs font-bold font-mono text-primary-text">${q.investment}M</span>
                                  </div>
                                  <Progress 
                                    value={(q.investment / Math.max(...region.quarterlyData.map(d => d.investment))) * 100} 
                                    className="h-1 bg-muted/30"
                                  />
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="space-y-8">
                <AIInsightsFeed />
                
                <Card className="glass-premium border-black/5 dark:bg-muted/10">
                  <CardHeader className="pb-4 border-b border-black/5 bg-secondary/30 dark:bg-muted/20">
                    <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-foreground">Growth Ranking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {regions
                      .sort((a, b) => b.yoyGrowth - a.yoyGrowth)
                      .map((r, i) => (
                        <div key={r.regionCode} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-muted-foreground">0{i + 1}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-primary-text transition-colors">{r.region}</span>
                          </div>
                          <Badge variant="outline" className={`text-[9px] font-mono uppercase tracking-tighter ${r.yoyGrowth > 40 ? 'bg-success/10 text-success border-success/30' : 'bg-primary/10 text-primary-text border-primary/30'}`}>
                            +{r.yoyGrowth}%
                          </Badge>
                        </div>
                      ))
                    }
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RegionalIntelligence;
