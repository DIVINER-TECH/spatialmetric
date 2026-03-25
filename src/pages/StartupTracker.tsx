import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Rocket,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Search,
  Sparkles,
  Globe,
  Building2,
  TrendingUp
} from 'lucide-react';
import { startups, getStartupsByRegion, type Startup } from '@/data/startups';
import { format } from 'date-fns';
import { useContentItems } from '@/hooks/useContentItems';

const regionLabels: Record<string, string> = {
  'all': 'All Regions',
  'na': 'North America',
  'eu': 'Europe',
  'asean': 'ASEAN',
  'pacific': 'Pacific',
  'south-asia': 'South Asia',
  'mena': 'MENA'
};

const StartupCard = ({ startup }: { startup: Startup }) => {
  const formatFunding = (amount: number) => {
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}B`;
    return `$${amount}M`;
  };

  return (
    <Card className="bg-card/30 border-border/50 hover:border-primary/50 transition-all h-full group">
      <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-mono uppercase tracking-widest mb-1 truncate">{startup.name}</CardTitle>
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{startup.headquarters}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-tighter bg-muted/30 shrink-0 ml-2">{startup.stage}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {startup.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded bg-muted/20 border border-border/30">
            <DollarSign className="h-3 w-3 text-primary" />
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Raised</p>
              <p className="text-xs font-mono font-bold tracking-tighter">{formatFunding(startup.totalFunding)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-muted/20 border border-border/30">
            <Users className="h-3 w-3 text-primary" />
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Employees</p>
              <p className="text-xs font-mono font-bold tracking-tighter">{startup.employees}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">
            Last: {formatFunding(startup.lastRoundSize)} ({format(startup.lastRoundDate, 'MMM yyyy')})
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {startup.tags.slice(0, 4).map(tag => (
            <Badge key={tag} variant="outline" className="text-[9px] font-mono uppercase tracking-tighter bg-muted/30">{tag}</Badge>
          ))}
        </div>

        <div className="pt-2 border-t border-border/30">
          <p className="text-[9px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Key Metrics</p>
          <div className="space-y-1">
            {startup.traction.map((t, i) => (
              <div key={i} className="flex justify-between text-[10px] font-mono bg-muted/20 rounded border border-border/30 px-2 py-1">
                <span className="text-muted-foreground uppercase tracking-tight">{t.metric}</span>
                <span className="font-bold text-primary">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StartupTracker = () => {
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: aiStartups } = useContentItems('startup-profile', 1);
  const discoveredStartup = aiStartups && aiStartups.length > 0 ? aiStartups[0].metadata : null;

  const filteredStartups = activeRegion === 'all'
    ? startups
    : getStartupsByRegion(activeRegion);

  const searchFilteredStartups = filteredStartups.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalFunding = filteredStartups.reduce((sum, s) => sum + s.totalFunding, 0);
  const avgDealSize = totalFunding / filteredStartups.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-10 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter uppercase">Startup Tracker</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm font-mono uppercase tracking-tight leading-relaxed">
              Discover and track emerging XR startups across global markets. Filter by region, sector, and funding stage to find the next spatial computing unicorns.
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-6 border-b border-border/50 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-3 w-3 text-primary" />
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Startups Tracked</p>
                  </div>
                  <p className="text-2xl font-bold font-mono tracking-tighter">{filteredStartups.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-3 w-3 text-primary" />
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Total Funding</p>
                  </div>
                  <p className="text-2xl font-bold font-mono tracking-tighter">${(totalFunding / 1000).toFixed(1)}B</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Avg Deal Size</p>
                  </div>
                  <p className="text-2xl font-bold font-mono tracking-tighter">${avgDealSize.toFixed(0)}M</p>
                </CardContent>
              </Card>
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-3 w-3 text-primary" />
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Regions</p>
                  </div>
                  <p className="text-2xl font-bold font-mono tracking-tighter">6</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Filters and Discovery */}
        <section className="py-6 border-b border-border/50 bg-muted/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="SEARCH STARTUPS, SECTORS, TAGS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-[10px] font-mono uppercase tracking-widest bg-card/50 border-border/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AI Discovered Startup */}
        {discoveredStartup && (
          <section className="py-6 border-b border-border/50 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-mono uppercase tracking-widest">Latest AI Discovery</h3>
              </div>
              <Card className="bg-card/30 border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold font-mono tracking-tighter uppercase mb-1">{discoveredStartup.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-tighter bg-muted/30">{discoveredStartup.sector}</Badge>
                        <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-tighter bg-primary/10 text-primary border-primary/30">{discoveredStartup.stage}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {discoveredStartup.description}
                  </p>
                  {discoveredStartup.metrics && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {Object.entries(discoveredStartup.metrics).slice(0, 3).map(([key, value], i) => (
                        <div key={i} className="text-center p-3 bg-muted/20 border border-border/30 rounded">
                          <p className="text-[9px] font-mono text-muted-foreground mb-1 uppercase tracking-tighter">{key.replace(/_/g, ' ')}</p>
                          <p className="text-xs font-mono font-bold tracking-tighter">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {discoveredStartup.investmentThesis && (
                    <div className="p-4 bg-muted/20 border border-border/30 rounded">
                      <p className="text-[9px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Investment Thesis</p>
                      <p className="text-xs leading-relaxed font-mono">{discoveredStartup.investmentThesis}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Startup Grid with Tabs */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <Tabs value={activeRegion} onValueChange={setActiveRegion}>
              <TabsList className="mb-8 bg-muted/20 border border-border/50 p-1 flex-wrap h-auto">
                {Object.entries(regionLabels).map(([code, label]) => (
                  <TabsTrigger key={code} value={code} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-4">
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeRegion} className="mt-0">
                {searchFilteredStartups.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchFilteredStartups.map(startup => (
                      <StartupCard key={startup.id} startup={startup} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border border-dashed border-border/50 rounded-xl">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">No startups found matching your criteria</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartupTracker;
