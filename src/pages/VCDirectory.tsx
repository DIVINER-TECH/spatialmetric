import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, DollarSign, TrendingUp, Users, Search, ExternalLink, RefreshCw } from 'lucide-react';
import { investors, getTopInvestorsByXRDeals, type VCFirm } from '@/data/investors';
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CountUp } from '@/components/shared/CountUp';

const VCDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke("daily-pipeline", {
        body: { triggered_by: "manual_vc" },
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

  const filteredInvestors = investors.filter(vc => {
    const matchesSearch = vc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vc.xrPortfolio.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegion === 'all' || vc.region === selectedRegion || vc.region === 'global';
    const matchesType = selectedType === 'all' || vc.type === selectedType;
    return matchesSearch && matchesRegion && matchesType;
  });

  const topByDeals = getTopInvestorsByXRDeals(5);

  const formatAUM = (aum: number) => {
    if (aum >= 100) return `$${aum}B`;
    return `$${aum}B`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          <section className="py-20 border-b border-black/5 bg-secondary/30 relative overflow-hidden -mx-4 px-4 mb-10">
            <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
                <div className="h-16 w-16 glass-premium flex items-center justify-center border-black/5 rounded-2xl shadow-sm">
                  <Building2 className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase leading-none">Capital <span className="text-primary">Allocation</span></h1>
                  <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.5em] mt-3">
                    VC Database & Portfolio Performance Metrics
                  </p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-4">
                  <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-sm">
                    <Button 
                      onClick={handleRefresh} 
                      disabled={isRefreshing}
                      variant="ghost"
                      size="sm"
                      className="gap-2 font-mono text-[9px] uppercase tracking-widest hover:bg-black/5 rounded-full"
                    >
                      <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
                      {isRefreshing ? "Syncing..." : "Sync Systems"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Firms', value: investors.length, raw: investors.length, icon: Building2 },
              { label: 'Combined AUM', value: `$${investors.reduce((sum, i) => sum + i.aum, 0).toFixed(0)}B`, raw: investors.reduce((sum, i) => sum + i.aum, 0), prefix: '$', suffix: 'B', icon: DollarSign },
              { label: 'XR Investments', value: investors.reduce((sum, i) => sum + i.xrInvestments, 0), raw: investors.reduce((sum, i) => sum + i.xrInvestments, 0), icon: TrendingUp },
              { label: 'Portfolio Cos', value: new Set(investors.flatMap(i => i.xrPortfolio)).size, raw: new Set(investors.flatMap(i => i.xrPortfolio)).size, icon: Users },
            ].map((stat, i) => (
              <Card key={i} className="glass-premium border-black/5 hover:border-primary/50 transition-all group overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/10 group-hover:bg-primary transition-colors" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-muted-foreground mb-4">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="text-[9px] font-mono uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-bold font-mono tracking-tighter group-hover:text-primary transition-colors">
                    <CountUp value={stat.raw} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-10 bg-muted/20 p-6 rounded-xl border border-border/50">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="SEARCH FIRMS OR PORTFOLIO ENTITIES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/50 border-border/50 font-mono text-xs uppercase tracking-widest focus:ring-primary/30"
              />
            </div>
            <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="w-full md:w-auto">
              <TabsList className="bg-background/50 border border-border/50 h-12 p-1">
                {['all', 'na', 'eu', 'pacific', 'mena'].map(region => (
                  <TabsTrigger key={region} value={region} className="text-[10px] font-mono uppercase tracking-widest px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    {region}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Top Investors */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border/50" />
              Most Active XR Capital Allocators
              <div className="h-px flex-1 bg-border/50" />
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
              {topByDeals.map(vc => (
                <Card key={vc.id} className="min-w-[280px] glass-premium border-black/5 hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
                  <CardContent className="p-6">
                    <p className="font-mono font-bold text-[10px] uppercase tracking-widest mb-4 group-hover:text-primary transition-colors border-b border-black/5 pb-2">{vc.name}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-primary text-3xl font-bold font-mono tracking-tighter">
                          <CountUp value={vc.xrInvestments} />
                        </div>
                        <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Deals Executed</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono font-bold tracking-tighter group-hover:text-primary transition-colors">{formatAUM(vc.aum)}</p>
                        <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">AUM Index</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Investor Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map(vc => {
              const typeColors: Record<string, string> = {
                'VC': 'bg-primary/10 text-primary border-primary/20',
                'Corporate VC': 'bg-chart-2/10 text-chart-2 border-chart-2/20',
                'PE': 'bg-chart-3/10 text-chart-3 border-chart-3/20',
                'Sovereign': 'bg-chart-4/10 text-chart-4 border-chart-4/20',
                'Angel': 'bg-chart-5/10 text-chart-5 border-chart-5/20',
              };
              const typeKey = Object.keys(typeColors).find(k => vc.type.toLowerCase().includes(k.toLowerCase()));
              const avatarColor = typeColors[typeKey || ''] || 'bg-muted text-muted-foreground border-border/50';
              const initials = vc.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

              return (
              <Card key={vc.id} className="glass-premium border-black/5 hover:border-primary/50 transition-all group overflow-hidden shadow-sm">
                <CardHeader className="pb-4 border-b border-black/5 bg-black/[0.02]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold font-mono border shrink-0 shadow-inner ${avatarColor}`}>
                        {initials}
                      </div>
                      <div>
                        <CardTitle className="text-sm font-mono font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{vc.name}</CardTitle>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">{vc.headquarters}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-mono uppercase tracking-widest border-border/50 ${avatarColor}`}>{vc.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground mb-6 line-clamp-2 font-mono leading-relaxed italic">"{vc.investmentThesis}"</p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'XR Deals', value: vc.xrInvestments, color: 'text-primary' },
                      { label: 'AUM', value: formatAUM(vc.aum) },
                      { label: 'Fund', value: vc.fundSize >= 1000 ? `${(vc.fundSize/1000).toFixed(1)}B` : `${vc.fundSize}M` },
                    ].map((m, i) => (
                      <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30 text-center group-hover:bg-muted/50 transition-colors">
                        <p className={`text-lg font-bold font-mono tracking-tighter ${m.color || ''}`}>{m.value}</p>
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-3 border-b border-border/30 pb-1">Strategic Portfolio</p>
                    <div className="flex flex-wrap gap-2">
                      {vc.xrPortfolio.slice(0, 4).map(co => (
                        <Badge key={co} variant="outline" className="text-[9px] font-mono uppercase tracking-widest bg-muted/20 border-border/50 group-hover:border-primary/30 transition-colors">{co}</Badge>
                      ))}
                      {vc.xrPortfolio.length > 4 && (
                        <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest bg-primary/5 text-primary border-primary/20">+{vc.xrPortfolio.length - 4} More</Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full font-mono text-[10px] uppercase tracking-[0.2em] h-10 border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                    <a href={`https://${vc.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Access Terminal
                    </a>
                  </Button>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VCDirectory;
