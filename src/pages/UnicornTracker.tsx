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
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">XR Unicorn Tracker</h1>
            <p className="text-muted-foreground">Track {unicorns.length} spatial computing unicorns worth ${totalValuation.toFixed(1)}B combined</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">Total Unicorns</span>
                </div>
                <p className="text-2xl font-bold text-primary">{unicorns.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Combined Value</span>
                </div>
                <p className="text-2xl font-bold">${totalValuation.toFixed(1)}B</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Total Raised</span>
                </div>
                <p className="text-2xl font-bold">${(totalRaised / 1000).toFixed(1)}B</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Total Employees</span>
                </div>
                <p className="text-2xl font-bold">{(unicorns.reduce((sum, u) => sum + u.employees, 0) / 1000).toFixed(1)}K</p>
              </CardContent>
            </Card>
          </div>

          {/* Region Filter */}
          <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Regions</TabsTrigger>
              <TabsTrigger value="na">North America</TabsTrigger>
              <TabsTrigger value="eu">Europe</TabsTrigger>
              <TabsTrigger value="pacific">Pacific</TabsTrigger>
              <TabsTrigger value="mena">MENA</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Unicorn List */}
          <div className="space-y-4">
            {filteredUnicorns.map((unicorn, index) => (
              <Card key={unicorn.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => setExpandedId(expandedId === unicorn.id ? null : unicorn.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-muted-foreground w-8">#{index + 1}</span>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {unicorn.name}
                          <Badge className={regionColors[unicorn.region]}>{unicorn.region.toUpperCase()}</Badge>
                          <Badge variant="outline">{unicorn.sector}</Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{unicorn.headquarters} · Founded {unicorn.foundedYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${unicorn.valuation}B</p>
                        <p className="text-sm text-muted-foreground">Valuation</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">${unicorn.totalRaised >= 1000 ? `${(unicorn.totalRaised/1000).toFixed(1)}B` : `${unicorn.totalRaised}M`}</p>
                        <p className="text-sm text-muted-foreground">Raised</p>
                      </div>
                      {expandedId === unicorn.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </CardHeader>
                
                {expandedId === unicorn.id && (
                  <CardContent className="border-t bg-secondary/10">
                    <div className="grid md:grid-cols-2 gap-6 py-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">{unicorn.description}</p>
                        <p className="text-sm mb-4"><span className="text-muted-foreground">CEO:</span> {unicorn.ceo}</p>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Products</p>
                          <div className="flex flex-wrap gap-1">
                            {unicorn.products.map(p => (
                              <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Key Metrics</p>
                          <div className="grid grid-cols-3 gap-2">
                            {unicorn.keyMetrics.map(m => (
                              <div key={m.label} className="bg-secondary/50 rounded p-2 text-center">
                                <p className="text-sm font-bold text-primary">{m.value}</p>
                                <p className="text-xs text-muted-foreground">{m.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Funding History</p>
                        <div className="space-y-2 mb-4">
                          {unicorn.fundingRounds.slice(-4).reverse().map((round, i) => (
                            <div key={i} className="flex items-center justify-between text-sm bg-secondary/30 rounded px-3 py-2">
                              <div>
                                <span className="font-medium">{round.round}</span>
                                <span className="text-muted-foreground ml-2">{format(round.date, 'MMM yyyy')}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-semibold">${round.amount}M</span>
                                {round.valuation && <span className="text-muted-foreground ml-2">@ ${round.valuation}B</span>}
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="text-sm font-medium mb-2">Investors</p>
                        <div className="flex flex-wrap gap-1">
                          {unicorn.investors.map(inv => (
                            <Badge key={inv} variant="outline" className="text-xs">{inv}</Badge>
                          ))}
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
