import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { AIInsightsFeed } from '@/components/ai/AIInsightsFeed';
import { ArticleGenerator } from '@/components/ai/ArticleGenerator';
import { useArticles } from '@/hooks/useArticles';
import { useMarketSnapshot } from '@/hooks/useMarketSnapshot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, BarChart3, Globe, DollarSign, Building2, Users, MapPin } from 'lucide-react';
import { regionalData, getRegionalComparison } from '@/data/regions';

const RegionalCard = ({ region }: { region: typeof regionalData[0] }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}B`;
    return `$${amount}M`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{region.displayName}</CardTitle>
          <Badge className={region.yoyGrowth > 30 ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {region.yoyGrowth}% YoY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Investment</p>
            <p className="text-xl font-semibold">{formatCurrency(region.totalInvestment)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Deal Count</p>
            <p className="text-xl font-semibold">{region.dealCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-muted/50 rounded">
            <p className="text-xs text-muted-foreground">Unicorns</p>
            <p className="text-sm font-medium">{region.unicornCount}</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <p className="text-xs text-muted-foreground">Active VCs</p>
            <p className="text-sm font-medium">{region.activeVCs}</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <p className="text-xs text-muted-foreground">Adoption</p>
            <p className="text-sm font-medium">{region.adoptionRate}%</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Top Sectors</p>
          <div className="flex flex-wrap gap-1">
            {region.topSectors.slice(0, 4).map(sector => (
              <Badge key={sector} variant="secondary" className="text-xs">{sector}</Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Key Players</p>
          <p className="text-sm">{region.keyPlayers.slice(0, 3).join(', ')}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Emerging Startups</p>
          <p className="text-sm">{region.emergingStartups.slice(0, 3).join(', ')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const MarketIntelligence = () => {
  const { articles } = useArticles('market-intelligence');
  const { data: snapshot } = useMarketSnapshot();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRegion, setActiveRegion] = useState('global');

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
        <section className="py-10 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-semibold">Market Intelligence</h1>
              <LiveIndicator label="Daily" />
            </div>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              Deep analysis of XR market dynamics, investment trends, valuations, and strategic insights for spatial computing investors. Regional analysis is curated and may not update daily.
            </p>
            {snapshot?.asOfDate ? (
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">
                No daily snapshot found. Deploy and run the `daily-market-snapshot` function to populate data.
              </p>
            )}
          </div>
        </section>

        {/* Daily Metrics */}
        <section className="py-6 border-b border-border/50 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dailyMetrics.map((metric, i) => (
                <Card key={i} className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-lg font-semibold">{metric.value}</p>
                    {metric.change ? (
                      <div className={`flex items-center gap-1 text-xs ${metric.positive ? 'text-success' : 'text-destructive'}`}>
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
        <section className="py-10">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
                <TabsTrigger value="generate">Generate Content</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="grid lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3">
                    <h2 className="text-xl font-medium mb-6">Latest Insights</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {articles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <AIInsightsFeed />
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          Regional Growth
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {growthComparison.slice(0, 5).map((region, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{region.region}</span>
                              <span className="text-primary">{region.value}%</span>
                            </div>
                            <Progress value={(region.value / maxGrowth) * 100} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="regional" className="mt-0">
                <div className="grid lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                      {regionalData.map(region => (
                        <Badge
                          key={region.regionCode}
                          variant={activeRegion === region.regionCode ? 'default' : 'outline'}
                          className="cursor-pointer text-xs"
                          onClick={() => setActiveRegion(region.regionCode)}
                        >
                          {region.region}
                        </Badge>
                      ))}
                    </div>

                    <RegionalCard region={selectedRegion} />

                    {/* Quarterly Data */}
                    <Card className="mt-6">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">Quarterly Investment Trend (2025)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedRegion.quarterlyData.map((q, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{q.quarter}</span>
                                <span className="text-muted-foreground">${q.investment}M / {q.deals} deals</span>
                              </div>
                              <Progress 
                                value={(q.investment / Math.max(...selectedRegion.quarterlyData.map(d => d.investment))) * 100} 
                                className="h-2" 
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <AIInsightsFeed />

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">All Regions Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {regionalData.filter(r => r.regionCode !== 'global').map((region, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => setActiveRegion(region.regionCode)}
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{region.region}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">${(region.totalInvestment / 1000).toFixed(1)}B</p>
                              <p className={`text-xs ${region.yoyGrowth > 30 ? 'text-success' : 'text-primary'}`}>
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

              <TabsContent value="generate" className="mt-0">
                <div className="max-w-3xl mx-auto">
                  <ArticleGenerator />
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
