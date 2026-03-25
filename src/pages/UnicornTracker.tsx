import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Building2, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { unicorns, getTotalUnicornValuation, getUnicornsByValuation, type Unicorn } from '@/data/unicorns';
import { format } from 'date-fns';

const UnicornTracker = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredUnicorns = selectedRegion === 'all' 
    ? getUnicornsByValuation() 
    : unicorns.filter(u => u.region === selectedRegion).sort((a, b) => b.valuation - a.valuation);

  const totalValuation = getTotalUnicornValuation();
  const totalRaised = unicorns.reduce((sum, u) => sum + u.totalRaised, 0);

  const regionColors: Record<string, string> = {
    na: 'bg-blue-500/20 text-blue-400',
    eu: 'bg-green-500/20 text-green-400',
    pacific: 'bg-purple-500/20 text-purple-400',
    asean: 'bg-orange-500/20 text-orange-400',
    mena: 'bg-amber-500/20 text-amber-400',
    'south-asia': 'bg-teal-500/20 text-teal-400',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-10 border-b border-border/50 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter uppercase">XR Unicorn Tracker</h1>
            </div>
            <p className="text-muted-foreground font-mono text-sm uppercase tracking-tight">Track {unicorns.length} spatial computing unicorns worth ${totalValuation.toFixed(1)}B combined</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Building2, label: 'Total Unicorns', value: unicorns.length, color: 'text-primary' },
              { icon: DollarSign, label: 'Combined Value', value: `$${totalValuation.toFixed(1)}B`, color: 'text-foreground' },
              { icon: TrendingUp, label: 'Total Raised', value: `$${(totalRaised / 1000).toFixed(1)}B`, color: 'text-foreground' },
              { icon: Users, label: 'Total Employees', value: `${(unicorns.reduce((sum, u) => sum + u.employees, 0) / 1000).toFixed(1)}K`, color: 'text-foreground' },
            ].map(s => (
              <Card key={s.label} className="bg-card/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="h-3 w-3 text-primary" />
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  </div>
                  <p className={`text-2xl font-bold font-mono tracking-tighter ${s.color}`}>{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Region Filter */}
          <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="mb-8">
            <TabsList className="bg-muted/20 border border-border/50 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-6">All Regions</TabsTrigger>
              <TabsTrigger value="na" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-6">North America</TabsTrigger>
              <TabsTrigger value="eu" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-6">Europe</TabsTrigger>
              <TabsTrigger value="pacific" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-6">Pacific</TabsTrigger>
              <TabsTrigger value="mena" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-6">MENA</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Unicorn List */}
          <div className="space-y-4">
            {filteredUnicorns.map((unicorn, index) => (
              <Card key={unicorn.id} className="bg-card/30 border-border/50 overflow-hidden group">
                <div 
                  className="p-6 cursor-pointer hover:bg-muted/20 transition-all"
                  onClick={() => setExpandedId(expandedId === unicorn.id ? null : unicorn.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <span className="text-3xl font-bold font-mono text-muted-foreground/30 w-12 shrink-0">{(index + 1).toString().padStart(2, '0')}</span>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold font-mono tracking-tighter uppercase">{unicorn.name}</h3>
                          <Badge variant="outline" className={`text-[10px] font-mono uppercase tracking-tighter border-none ${regionColors[unicorn.region]}`}>{unicorn.region}</Badge>
                          <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-tighter bg-muted/30">{unicorn.sector}</Badge>
                        </div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{unicorn.headquarters} · Founded {unicorn.foundedYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 md:gap-12">
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Valuation</p>
                        <p className="text-2xl font-bold font-mono tracking-tighter text-primary">${unicorn.valuation}B</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Raised</p>
                        <p className="text-xl font-bold font-mono tracking-tighter">${unicorn.totalRaised >= 1000 ? `${(unicorn.totalRaised/1000).toFixed(1)}B` : `${unicorn.totalRaised}M`}</p>
                      </div>
                      <div className="shrink-0">
                        {expandedId === unicorn.id ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedId === unicorn.id && (
                  <CardContent className="border-t border-border/50 bg-muted/10 p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid lg:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Company Overview</p>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">{unicorn.description}</p>
                          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-tighter bg-muted/20 border border-border/30 rounded px-3 py-2 w-fit">
                            <span className="text-muted-foreground">CEO:</span>
                            <span className="font-bold">{unicorn.ceo}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Product Ecosystem</p>
                          <div className="flex flex-wrap gap-1.5">
                            {unicorn.products.map(p => (
                              <Badge key={p} variant="outline" className="text-[9px] font-mono uppercase tracking-tighter bg-muted/30">{p}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Key Performance Metrics</p>
                          <div className="grid grid-cols-3 gap-3">
                            {unicorn.keyMetrics.map(m => (
                              <div key={m.label} className="bg-muted/20 border border-border/30 rounded p-3 text-center">
                                <p className="text-sm font-bold font-mono tracking-tighter text-primary">{m.value}</p>
                                <p className="text-[8px] font-mono uppercase tracking-tighter text-muted-foreground">{m.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Funding Trajectory</p>
                          <div className="space-y-1.5">
                            {unicorn.fundingRounds.slice(-4).reverse().map((round, i) => (
                              <div key={i} className="flex items-center justify-between text-[10px] font-mono bg-muted/20 rounded border border-border/30 px-3 py-2">
                                <div>
                                  <span className="font-bold uppercase tracking-tight">{round.round}</span>
                                  <span className="text-muted-foreground ml-2 uppercase">{format(round.date, 'MMM yyyy')}</span>
                                </div>
                                <div className="text-right">
                                  <span className="font-bold text-primary">${round.amount}M</span>
                                  {round.valuation && <span className="text-muted-foreground ml-2">@ ${round.valuation}B</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Strategic Investors</p>
                          <div className="flex flex-wrap gap-1.5">
                            {unicorn.investors.map(inv => (
                              <Badge key={inv} variant="outline" className="text-[9px] font-mono uppercase tracking-tighter bg-muted/30">{inv}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnicornTracker;
