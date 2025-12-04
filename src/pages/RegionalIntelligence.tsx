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
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="h-7 w-7 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">Regional Market Intelligence</h1>
              <LiveIndicator />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Investment metrics, statistics, and insights across global XR markets: North America, Europe, ASEAN, Pacific, South Asia, and MENA.
            </p>
          </div>
        </section>

        {/* Global Summary */}
        {globalData && (
          <section className="py-6 border-b border-border/50 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="p-3">
                    <p className="text-[10px] text-muted-foreground">Global Investment</p>
                    <p className="text-xl font-bold">${(globalData.totalInvestment / 1000).toFixed(1)}B</p>
                    <p className="text-[10px] text-green-500">+{globalData.yoyGrowth}% YoY</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3">
                    <p className="text-[10px] text-muted-foreground">Total Deals</p>
                    <p className="text-xl font-bold">{globalData.dealCount}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3">
                    <p className="text-[10px] text-muted-foreground">Avg Deal Size</p>
                    <p className="text-xl font-bold">${globalData.avgDealSize}M</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3">
                    <p className="text-[10px] text-muted-foreground">Unicorns</p>
                    <p className="text-xl font-bold">{globalData.unicornCount}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3">
                    <p className="text-[10px] text-muted-foreground">Active VCs</p>
                    <p className="text-xl font-bold">{globalData.activeVCs}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3">
                    <p className="text-[10px] text-muted-foreground">Market Size</p>
                    <p className="text-xl font-bold">${(globalData.marketSize / 1000).toFixed(1)}B</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Regional Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" onValueChange={setActiveRegion}>
                  <TabsList className="mb-6 flex-wrap h-auto gap-1">
                    <TabsTrigger value="all" className="text-xs">All Regions</TabsTrigger>
                    <TabsTrigger value="na" className="text-xs">North America</TabsTrigger>
                    <TabsTrigger value="eu" className="text-xs">Europe</TabsTrigger>
                    <TabsTrigger value="asean" className="text-xs">ASEAN</TabsTrigger>
                    <TabsTrigger value="pacific" className="text-xs">Pacific</TabsTrigger>
                    <TabsTrigger value="south-asia" className="text-xs">South Asia</TabsTrigger>
                    <TabsTrigger value="mena" className="text-xs">MENA</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {regions.map(region => (
                        <RegionalCard key={region.regionCode} region={region} />
                      ))}
                    </div>
                  </TabsContent>

                  {regions.map(region => (
                    <TabsContent key={region.regionCode} value={region.regionCode}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <RegionalCard region={region} />
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Quarterly Investment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {region.quarterlyData.map((q, i) => (
                                <div key={i} className="flex items-center justify-between">
                                  <span className="text-xs">{q.quarter}</span>
                                  <div className="flex-1 mx-3">
                                    <Progress 
                                      value={(q.investment / Math.max(...region.quarterlyData.map(d => d.investment))) * 100} 
                                      className="h-2"
                                    />
                                  </div>
                                  <span className="text-xs font-medium">${q.investment}M</span>
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

              <div className="space-y-4">
                <AIInsightsFeed />
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Regional Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {regions
                      .sort((a, b) => b.yoyGrowth - a.yoyGrowth)
                      .map(r => (
                        <div key={r.regionCode} className="flex items-center justify-between text-xs">
                          <span>{r.region}</span>
                          <Badge variant={r.yoyGrowth > 40 ? 'default' : 'secondary'} className="text-[10px]">
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
