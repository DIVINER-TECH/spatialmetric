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

const RegionalCard = ({ region }: { region: RegionalMetrics }) => {
  const formatNumber = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(1)}B`;
    return `$${n}M`;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
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
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3 w-3" /> Investment
            </p>
            <p className="text-lg font-bold">{formatNumber(region.totalInvestment)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <BarChart3 className="h-3 w-3" /> Deals
            </p>
            <p className="text-lg font-bold">{region.dealCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Unicorns
            </p>
            <p className="text-lg font-bold">{region.unicornCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" /> VCs
            </p>
            <p className="text-lg font-bold">{region.activeVCs}</p>
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
          <p className="text-xs">{region.keyPlayers.slice(0, 4).join(', ')}</p>
        </div>

        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5">Emerging Startups</p>
          <p className="text-xs text-primary">{region.emergingStartups.slice(0, 3).join(', ')}</p>
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-10 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-mono tracking-tighter uppercase">Regional Intelligence</h1>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                  Global XR market metrics, investment statistics, and regional performance
                </p>
              </div>
              <div className="ml-auto">
                <LiveIndicator label="Snapshot" />
              </div>
            </div>
          </div>
        </section>

        {/* Global Summary */}
        {globalData && (
          <section className="py-8 border-b border-border/50 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { label: 'Global Investment', value: `$${(globalData.totalInvestment / 1000).toFixed(1)}B`, change: `+${globalData.yoyGrowth}% YoY`, positive: true },
                  { label: 'Total Deals', value: globalData.dealCount },
                  { label: 'Avg Deal Size', value: `$${globalData.avgDealSize}M` },
                  { label: 'Unicorns', value: globalData.unicornCount },
                  { label: 'Active VCs', value: globalData.activeVCs },
                  { label: 'Market Size', value: `$${(globalData.marketSize / 1000).toFixed(1)}B` },
                ].map((stat, i) => (
                  <Card key={i} className="bg-card/30 border-border/50 hover:border-primary/50 transition-colors group">
                    <CardContent className="p-4">
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                      <p className="text-2xl font-bold font-mono tracking-tighter group-hover:text-primary transition-colors">{stat.value}</p>
                      {stat.change && (
                        <p className={`text-[10px] font-mono uppercase mt-1 ${stat.positive ? 'text-success' : 'text-destructive'}`}>
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
                        <Card className="bg-card/30 border-border/50">
                          <CardHeader className="pb-4 border-b border-border/50 bg-muted/20">
                            <CardTitle className="text-[10px] font-mono uppercase tracking-widest">Quarterly Investment Trend (2025)</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-8">
                            <div className="space-y-6">
                              {region.quarterlyData.map((q, i) => (
                                <div key={i}>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{q.quarter}</span>
                                    <span className="text-xs font-bold font-mono text-primary">${q.investment}M</span>
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
                
                <Card className="bg-card/30 border-border/50">
                  <CardHeader className="pb-4 border-b border-border/50 bg-muted/20">
                    <CardTitle className="text-[10px] font-mono uppercase tracking-widest">Growth Ranking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {regions
                      .sort((a, b) => b.yoyGrowth - a.yoyGrowth)
                      .map((r, i) => (
                        <div key={r.regionCode} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-muted-foreground">0{i + 1}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-primary transition-colors">{r.region}</span>
                          </div>
                          <Badge variant="outline" className={`text-[9px] font-mono uppercase tracking-tighter ${r.yoyGrowth > 40 ? 'bg-success/10 text-success border-success/30' : 'bg-primary/10 text-primary border-primary/30'}`}>
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
