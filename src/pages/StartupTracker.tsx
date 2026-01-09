import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Rocket,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Search,
  Sparkles,
  Loader2,
  Globe,
  Building2,
  ExternalLink
} from 'lucide-react';
import { startups, getStartupsByRegion, type Startup } from '@/data/startups';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    <Card className="hover:border-primary/50 transition-colors h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium mb-1">{startup.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {startup.headquarters}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">{startup.stage}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {startup.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Raised</p>
              <p className="text-sm font-medium">{formatFunding(startup.totalFunding)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Employees</p>
              <p className="text-sm font-medium">{startup.employees}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Last round: {formatFunding(startup.lastRoundSize)} ({format(startup.lastRoundDate, 'MMM yyyy')})
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {startup.tags.slice(0, 4).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Key Metrics</p>
          <div className="space-y-1">
            {startup.traction.map((t, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t.metric}</span>
                <span className="font-medium">{t.value}</span>
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
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveredStartup, setDiscoveredStartup] = useState<any>(null);

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

  const discoverStartup = async () => {
    setIsDiscovering(true);
    setDiscoveredStartup(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          type: 'startup-profile',
          topic: 'emerging spatial computing startup',
          region: activeRegion === 'all' ? 'Global' : regionLabels[activeRegion],
          searchResults: undefined // Placeholder for live search data injection
        }
      });

      if (error) throw error;

      if (data?.success && data?.data) {
        setDiscoveredStartup(data.data);
        toast.success('New startup discovered');
      }
    } catch (err) {
      console.error('Error discovering startup:', err);
      toast.error('Failed to discover startup');
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-10 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-semibold">Startup Tracker</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              Discover and track emerging XR startups across global markets. Filter by region, sector, and funding stage to find the next spatial computing unicorns.
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-6 border-b border-border/50 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Startups Tracked</p>
                  </div>
                  <p className="text-2xl font-semibold">{filteredStartups.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Total Funding</p>
                  </div>
                  <p className="text-2xl font-semibold">${(totalFunding / 1000).toFixed(1)}B</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Avg Deal Size</p>
                  </div>
                  <p className="text-2xl font-semibold">${avgDealSize.toFixed(0)}M</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Regions</p>
                  </div>
                  <p className="text-2xl font-semibold">6</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Filters and Discovery */}
        <section className="py-6 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search startups, sectors, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
              <Button onClick={discoverStartup} disabled={isDiscovering}>
                {isDiscovering ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Discovering...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Discover New Startup
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* AI Discovered Startup */}
        {discoveredStartup && (
          <section className="py-6 border-b border-border/50 bg-primary/5">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">AI Discovered Startup</h3>
              </div>
              <Card className="border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-medium mb-1">{discoveredStartup.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{discoveredStartup.sector}</Badge>
                        <Badge variant="secondary" className="text-xs">{discoveredStartup.stage}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {discoveredStartup.description}
                  </p>
                  {discoveredStartup.metrics && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {Object.entries(discoveredStartup.metrics).slice(0, 3).map(([key, value], i) => (
                        <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1 capitalize">{key.replace(/_/g, ' ')}</p>
                          <p className="text-sm font-medium">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {discoveredStartup.investmentThesis && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Investment Thesis</p>
                      <p className="text-sm leading-relaxed">{discoveredStartup.investmentThesis}</p>
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
              <TabsList className="mb-6 flex-wrap h-auto">
                {Object.entries(regionLabels).map(([code, label]) => (
                  <TabsTrigger key={code} value={code} className="text-xs">
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
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No startups found matching your criteria</p>
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
