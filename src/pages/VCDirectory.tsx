import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, DollarSign, TrendingUp, Users, Search, ExternalLink } from 'lucide-react';
import { investors, getTopInvestorsByXRDeals, type VCFirm } from '@/data/investors';

const VCDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

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
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">VC Directory</h1>
            <p className="text-muted-foreground">Comprehensive database of {investors.length}+ venture capital firms investing in spatial computing</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">Total Firms</span>
                </div>
                <p className="text-2xl font-bold">{investors.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Combined AUM</span>
                </div>
                <p className="text-2xl font-bold">${investors.reduce((sum, i) => sum + i.aum, 0).toFixed(0)}B</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">XR Investments</span>
                </div>
                <p className="text-2xl font-bold">{investors.reduce((sum, i) => sum + i.xrInvestments, 0)}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Portfolio Cos</span>
                </div>
                <p className="text-2xl font-bold">{new Set(investors.flatMap(i => i.xrPortfolio)).size}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search firms or portfolio companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="na">NA</TabsTrigger>
                <TabsTrigger value="eu">EU</TabsTrigger>
                <TabsTrigger value="pacific">Pacific</TabsTrigger>
                <TabsTrigger value="mena">MENA</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Top Investors */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Most Active XR Investors</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {topByDeals.map(vc => (
                <Card key={vc.id} className="min-w-[200px] bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">{vc.name}</p>
                    <p className="text-primary text-lg font-bold">{vc.xrInvestments} deals</p>
                    <p className="text-xs text-muted-foreground">{formatAUM(vc.aum)} AUM</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Investor Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvestors.map(vc => {
              const typeColors: Record<string, string> = {
                'VC': 'bg-primary/10 text-primary',
                'Corporate VC': 'bg-chart-2/20 text-chart-2',
                'PE': 'bg-chart-3/20 text-chart-3',
                'Sovereign': 'bg-chart-4/20 text-chart-4',
                'Angel': 'bg-chart-5/20 text-chart-5',
              };
              const typeKey = Object.keys(typeColors).find(k => vc.type.toLowerCase().includes(k.toLowerCase()));
              const avatarColor = typeColors[typeKey || ''] || 'bg-muted text-muted-foreground';
              const initials = vc.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

              return (
              <Card key={vc.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold shrink-0 ${avatarColor}`}>
                        {initials}
                      </div>
                      <div>
                        <CardTitle className="text-base">{vc.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{vc.headquarters}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{vc.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{vc.investmentThesis}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="bg-secondary/50 rounded p-2">
                      <p className="text-lg font-bold text-primary">{vc.xrInvestments}</p>
                      <p className="text-xs text-muted-foreground">XR Deals</p>
                    </div>
                    <div className="bg-secondary/50 rounded p-2">
                      <p className="text-lg font-bold">{formatAUM(vc.aum)}</p>
                      <p className="text-xs text-muted-foreground">AUM</p>
                    </div>
                    <div className="bg-secondary/50 rounded p-2">
                      <p className="text-lg font-bold">${vc.fundSize >= 1000 ? `${(vc.fundSize/1000).toFixed(1)}B` : `${vc.fundSize}M`}</p>
                      <p className="text-xs text-muted-foreground">Fund</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">XR Portfolio</p>
                    <div className="flex flex-wrap gap-1">
                      {vc.xrPortfolio.slice(0, 4).map(co => (
                        <Badge key={co} variant="outline" className="text-xs">{co}</Badge>
                      ))}
                      {vc.xrPortfolio.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{vc.xrPortfolio.length - 4}</Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`https://${vc.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Visit Website
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
