import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { useNewsItems } from "@/hooks/useNewsItems";
import { companies as staticCompanies } from "@/data/companies";
import { startups } from "@/data/startups";
import { unicorns } from "@/data/unicorns";
import {
  TrendingUp, TrendingDown, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, Building2, Layers, BarChart3,
  RefreshCw, Cpu, Globe, Zap, Clock, Search, ExternalLink
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  RadialBarChart, RadialBar, ScatterChart, Scatter, ZAxis,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { PipelineStatus } from "@/components/dashboard/PipelineStatus";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CountUp } from "@/components/shared/CountUp";
import { MarketTicker } from "@/components/home/MarketTicker";

const SECTOR_MAP: Record<string, string> = {
  AAPL: "Hardware", META: "Social/Metaverse", MSFT: "Enterprise", NVDA: "Semiconductor",
  GOOG: "Software/AI", GOOGL: "Software/AI", SONY: "Gaming/Hardware", QCOM: "Semiconductor",
  SNAP: "Social/AR", RBLX: "Gaming", U: "Gaming Engine", "005930.KS": "Hardware",
  MTTR: "Enterprise", VUZI: "Hardware", IMMR: "Input Tech", MVIS: "LiDAR/Sensing",
  KOPN: "Displays", LAZR: "LiDAR/Sensing", AEVA: "LiDAR/Sensing",
};

const SEGMENT_COLORS = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
  "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(210, 70%, 50%)",
  "hsl(280, 60%, 55%)", "hsl(340, 60%, 50%)", "hsl(160, 55%, 45%)",
];

// Industry research estimates (analyst consensus)
const tamSamSomData = [
  { name: "TAM", value: 280, fill: "hsl(var(--chart-1))", label: "$280B" },
  { name: "SAM", value: 85, fill: "hsl(var(--chart-2))", label: "$85B" },
  { name: "SOM", value: 24, fill: "hsl(var(--chart-3))", label: "$24B" },
];

const growthProjections = [
  { year: "2024", hardware: 18, software: 22, services: 28, content: 35 },
  { year: "2025", hardware: 21, software: 26, services: 32, content: 42 },
  { year: "2026", hardware: 25, software: 31, services: 38, content: 48 },
  { year: "2027", hardware: 28, software: 36, services: 44, content: 55 },
  { year: "2028", hardware: 32, software: 42, services: 52, content: 62 },
];

const formatMarketCap = (value?: number | null) => {
  if (!value) return "—";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
  return `$${value.toLocaleString()}`;
};

const formatVolume = (value: number) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toLocaleString();
};

const formatAxisDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return format(parsed, "MMM d");
};

const Dashboard = () => {
  const { data: snapshot, isLoading: isSnapshotLoading } = useMarketSnapshot();
  const { data: newsItems } = useNewsItems(5);
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke("daily-pipeline", {
        body: { triggered_by: "manual_dashboard" },
      });
      if (error) throw error;
      toast.success("Market data pipeline triggered successfully");
      // Invalidate queries to show new data when it's ready
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["marketSnapshot"] });
        queryClient.invalidateQueries({ queryKey: ["pipelineStatus"] });
      }, 5000);
    } catch (error) {
      console.error("Failed to trigger pipeline:", error);
      toast.error("Failed to trigger data refresh");
    } finally {
      setIsRefreshing(false);
    }
  };

  const indexSeries = snapshot?.indexSeries ?? [];
  const latestIndex = indexSeries.length > 0 ? indexSeries[indexSeries.length - 1] : undefined;
  const prevIndex = indexSeries.length > 1 ? indexSeries[indexSeries.length - 2] : undefined;
  const indexChangePercent = latestIndex && prevIndex && prevIndex.value !== 0
    ? ((latestIndex.value - prevIndex.value) / prevIndex.value) * 100 : 0;

  const snapshotCompanies = (snapshot?.topCompanies ?? []).slice().sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0));
  const totalVolume = snapshotCompanies.reduce((sum, c) => sum + c.volume, 0);

  // Compute from real static data
  const computedData = useMemo(() => {
    const totalStaticMarketCap = staticCompanies.reduce((s, c) => s + c.marketCap, 0);
    const totalRAndD = staticCompanies.reduce((s, c) => s + c.metrics.rAndDSpend, 0);
    const totalRevenue = staticCompanies.reduce((s, c) => s + c.revenue, 0);
    const uniqueSectors = new Set(staticCompanies.map(c => c.sector)).size;
    const totalTracked = staticCompanies.length + startups.length + unicorns.length;

    // Competitive radar from actual company metrics
    const top5 = staticCompanies.slice(0, 5);
    const maxMCap = Math.max(...top5.map(c => c.marketCap));
    const maxRnD = Math.max(...top5.map(c => c.metrics.rAndDSpend));
    const maxRevGrowth = Math.max(...top5.map(c => Math.abs(c.metrics.revenueGrowth)));
    const maxMargin = Math.max(...top5.map(c => c.metrics.grossMargin));
    const maxEmployees = Math.max(...top5.map(c => c.employees));

    const normalize = (val: number, max: number) => max > 0 ? Math.round((val / max) * 100) : 0;

    const radarSubjects = ['Market Cap', 'R&D Spend', 'Revenue Growth', 'Gross Margin', 'Scale'];
    const radarData = radarSubjects.map((subject, i) => {
      const row: Record<string, any> = { subject };
      top5.forEach(c => {
        const name = c.name.split(' ')[0];
        switch (i) {
          case 0: row[name] = normalize(c.marketCap, maxMCap); break;
          case 1: row[name] = normalize(c.metrics.rAndDSpend, maxRnD); break;
          case 2: row[name] = normalize(Math.abs(c.metrics.revenueGrowth), maxRevGrowth); break;
          case 3: row[name] = normalize(c.metrics.grossMargin, maxMargin); break;
          case 4: row[name] = normalize(c.employees, maxEmployees); break;
        }
      });
      return row;
    });

    // Funding funnel from actual data
    const stageCounts: Record<string, number> = {};
    startups.forEach(s => { stageCounts[s.stage] = (stageCounts[s.stage] || 0) + 1; });
    const unicornCount = unicorns.length;
    const funnelData = [
      { name: 'Seed', value: stageCounts['Seed'] || 0, fill: 'hsl(var(--chart-1))' },
      { name: 'Series A', value: stageCounts['Series A'] || 0, fill: 'hsl(var(--chart-2))' },
      { name: 'Series B', value: stageCounts['Series B'] || 0, fill: 'hsl(var(--chart-3))' },
      { name: 'Series C', value: stageCounts['Series C'] || 0, fill: 'hsl(var(--chart-4))' },
      { name: 'Series D+', value: (stageCounts['Series D+'] || 0) + (stageCounts['Growth'] || 0), fill: 'hsl(var(--chart-5))' },
      { name: 'Unicorn', value: unicornCount, fill: 'hsl(210, 70%, 50%)' },
    ];

    // Stock performance ranking
    const stockRanking = staticCompanies
      .filter(c => c.ticker)
      .sort((a, b) => b.marketCap - a.marketCap)
      .map(c => ({
        ticker: c.ticker!, name: c.name, sector: c.sector, price: c.stockPrice,
        change: c.priceChangePercent, marketCap: c.marketCap, revenue: c.revenue,
        peRatio: c.metrics.peRatio, margin: c.metrics.grossMargin,
      }));

    return {
      totalStaticMarketCap, totalRAndD, totalRevenue, uniqueSectors, totalTracked,
      radarData, top5Names: top5.map(c => c.name.split(' ')[0]),
      funnelData, stockRanking,
    };
  }, []);

  // Segment data from snapshot
  const segmentData = (() => {
    if (snapshotCompanies.length === 0) return [];
    const sectorTotals: Record<string, number> = {};
    snapshotCompanies.forEach(c => {
      const sector = SECTOR_MAP[c.symbol] ?? "Other";
      sectorTotals[sector] = (sectorTotals[sector] ?? 0) + (c.marketCap ?? 0);
    });
    const totalCap = Object.values(sectorTotals).reduce((s, v) => s + v, 0);
    if (totalCap === 0) return [];
    return Object.entries(sectorTotals).sort((a, b) => b[1] - a[1])
      .map(([name, value], idx) => ({ name, value: Math.round((value / totalCap) * 1000) / 10, color: SEGMENT_COLORS[idx % SEGMENT_COLORS.length] }));
  })();

  // Sector performance
  const sectorPerformance = (() => {
    if (snapshotCompanies.length === 0) return [];
    const sectorChanges: Record<string, number[]> = {};
    snapshotCompanies.forEach(c => {
      const sector = SECTOR_MAP[c.symbol] ?? "Other";
      if (!sectorChanges[sector]) sectorChanges[sector] = [];
      sectorChanges[sector].push(c.changePercent);
    });
    return Object.entries(sectorChanges)
      .map(([sector, changes]) => ({ sector, avgChange: Math.round((changes.reduce((s, v) => s + v, 0) / changes.length) * 100) / 100, count: changes.length }))
      .sort((a, b) => b.avgChange - a.avgChange);
  })();

  const scatterData = snapshotCompanies.slice(0, 15).map(c => ({
    x: c.marketCap ? c.marketCap / 1e9 : 0, y: c.changePercent, z: c.volume / 1e6, name: c.symbol,
  }));

  const hasSnapshot = Boolean(indexSeries.length && snapshotCompanies.length);

  const kpiCards = [
    { title: "Total XR Market Cap", value: computedData.totalStaticMarketCap, raw: computedData.totalStaticMarketCap, change: "", positive: true, icon: DollarSign, description: `${staticCompanies.length} tracked companies`, prefix: "$", divisor: 1e12, suffix: "T" },
    { title: "Total R&D Investment", value: computedData.totalRAndD, raw: computedData.totalRAndD, change: "", positive: true, icon: Activity, description: "annual R&D spend", prefix: "$", divisor: 1e9, suffix: "B" },
    { title: "Sectors Covered", value: computedData.uniqueSectors, raw: computedData.uniqueSectors, change: "", positive: true, icon: Layers, description: "unique sectors" },
    { title: "Companies Tracked", value: computedData.totalTracked, raw: computedData.totalTracked, change: "", positive: true, icon: Building2, description: "public + private" },
  ];

  const lastUpdatedLabel = snapshot?.asOfDate ? format(new Date(snapshot.asOfDate), "MMM d, yyyy") : "—";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase">Intelligence Terminal</h1>
              <Badge variant="outline" className="flex items-center gap-2 bg-success/10 text-success border-success/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                <span className="flex h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(var(--success),0.5)]" />
                Live Feed Active
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl font-mono text-sm tracking-tight">Spatial computing market metrics, company analytics, and investment data. Real-time processing enabled.</p>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] bg-muted/30 px-2 py-1 rounded border border-border/30">Last Snapshot: {lastUpdatedLabel}</p>
              <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] animate-pulse">System Status: Optimal</p>
            </div>
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            variant="outline"
            className="gap-3 font-mono text-[10px] uppercase tracking-[0.3em] border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-6 h-12"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Syncing..." : "Sync Market Data"}
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiCards.map(kpi => (
            <Card key={kpi.title} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <kpi.icon className="h-12 w-12 text-primary" />
              </div>
              <CardContent className="pt-8">
                <div className="text-3xl font-bold mb-2 font-mono tracking-tighter group-hover:text-primary transition-colors">
                  <CountUp 
                    value={kpi.divisor ? kpi.raw / kpi.divisor : kpi.raw} 
                    prefix={kpi.prefix || ""} 
                    suffix={kpi.suffix || ""} 
                    decimals={kpi.divisor ? 1 : 0} 
                  />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 border-b border-border/30 pb-2">{kpi.title}</div>
                <div className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest flex items-center gap-2 group-hover:text-foreground/70 transition-colors">
                  <Activity className="h-3 w-3 text-primary/50" />
                  {kpi.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stock Performance Ranking */}
        <Card className="bg-card/30 border-border/50 mb-12 overflow-hidden shadow-2xl shadow-primary/5">
          <CardHeader className="border-b border-border/50 bg-muted/20 py-4">
            <CardTitle className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              <BarChart3 className="h-4 w-4 text-primary" />
              XR Market Capitalization Index
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/10">
                    <th className="text-left py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">#</th>
                    <th className="text-left py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Ticker</th>
                    <th className="text-left py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Entity</th>
                    <th className="text-left py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground hidden md:table-cell">Sector</th>
                    <th className="text-right py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Price</th>
                    <th className="text-right py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Change</th>
                    <th className="text-right py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:table-cell">Market Cap</th>
                    <th className="text-right py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground hidden lg:table-cell">P/E</th>
                    <th className="text-right py-4 px-6 text-[9px] uppercase tracking-[0.2em] text-muted-foreground hidden lg:table-cell">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {computedData.stockRanking.map((stock, idx) => {
                    const positive = stock.change >= 0;
                    return (
                      <tr key={stock.ticker} className="hover:bg-primary/5 transition-all group cursor-pointer">
                        <td className="py-4 px-6 text-muted-foreground text-[10px]">{idx + 1}</td>
                        <td className="py-4 px-6 font-bold text-primary text-xs tracking-widest group-hover:translate-x-1 transition-transform">{stock.ticker}</td>
                        <td className="py-4 px-6 font-medium text-xs uppercase tracking-tight">{stock.name}</td>
                        <td className="py-4 px-6 text-muted-foreground hidden md:table-cell italic text-[10px] uppercase tracking-tighter">{stock.sector}</td>
                        <td className="py-4 px-6 text-right text-xs font-bold">${stock.price.toFixed(2)}</td>
                        <td className={`py-4 px-6 text-right text-xs font-bold ${positive ? 'text-success' : 'text-destructive'}`}>
                          <span className="flex items-center justify-end gap-1">
                            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {positive ? "+" : ""}{stock.change.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-xs hidden sm:table-cell">{formatMarketCap(stock.marketCap)}</td>
                        <td className="py-4 px-6 text-right text-xs hidden lg:table-cell">{stock.peRatio?.toFixed(1) ?? '—'}</td>
                        <td className="py-4 px-6 text-right text-xs hidden lg:table-cell">{stock.margin.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Index + Segments */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 bg-card/30 border-border/50 shadow-xl shadow-primary/5">
            <CardHeader className="border-b border-border/50 bg-muted/20 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">XR Market Performance Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <Tabs defaultValue="area" className="w-full">
                <div className="flex justify-end mb-6">
                  <TabsList className="bg-muted/30 border border-border/50 p-1">
                    <TabsTrigger value="area" className="text-[9px] font-mono uppercase tracking-widest px-4 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Area</TabsTrigger>
                    <TabsTrigger value="line" className="text-[9px] font-mono uppercase tracking-widest px-4 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Line</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="area">
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={indexSeries}>
                        <defs><linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} /></linearGradient></defs>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} tickFormatter={formatAxisDate} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} tickFormatter={v => v.toFixed(0)} />
                        <Tooltip contentStyle={{ backgroundColor: "rgba(var(--card), 0.9)", backdropFilter: "blur(8px)", border: "1px solid hsl(var(--border))", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "10px" }} formatter={(value: number) => [value.toFixed(2), "INDEX"]} labelFormatter={formatAxisDate} />
                        <Area type="monotone" dataKey="value" name="Index" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorIndex)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="line">
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={indexSeries}>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} tickFormatter={formatAxisDate} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} tickFormatter={v => v.toFixed(0)} />
                        <Tooltip contentStyle={{ backgroundColor: "rgba(var(--card), 0.9)", backdropFilter: "blur(8px)", border: "1px solid hsl(var(--border))", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "10px" }} formatter={(value: number) => [value.toFixed(2), "INDEX"]} labelFormatter={formatAxisDate} />
                        <Line type="monotone" dataKey="value" name="Index" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/50 shadow-xl shadow-primary/5">
            <CardHeader className="border-b border-border/50 bg-muted/20 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Market Segments</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              {segmentData.length > 0 ? (
                <>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={segmentData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value">
                          {segmentData.map((entry, index) => (<Cell key={index} fill={entry.color} stroke="transparent" />))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "rgba(var(--card), 0.9)", backdropFilter: "blur(8px)", border: "1px solid hsl(var(--border))", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "10px" }} formatter={(value: number) => [`${value}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 mt-8">
                    {segmentData.map(segment => (
                      <div key={segment.name} className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] group">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: segment.color, color: segment.color }} />
                          <span className="text-muted-foreground group-hover:text-primary transition-colors">{segment.name}</span>
                        </div>
                        <span className="font-bold tracking-tighter">{segment.value}%</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[350px] text-center">
                  <RefreshCw className="h-8 w-8 text-muted-foreground/30 animate-spin mb-4" />
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Initializing Data Stream...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* TAM/SAM/SOM + Sector Heatmap */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card/30 border-border/50 shadow-xl shadow-primary/5">
            <CardHeader className="border-b border-border/50 bg-muted/20 py-4">
              <CardTitle className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Spatial Computing Market Sizing (2030)</CardTitle>
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1">Industry research estimates / Aggregate consensus</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" barSize={20} data={tamSamSomData}>
                    <RadialBar dataKey="value" cornerRadius={6} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "10px" }} formatter={(value: number, _: string, props: { payload: { name: string } }) => [`$${value}B`, props.payload.name.toUpperCase()]} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {tamSamSomData.map(item => (
                  <div key={item.name} className="text-center p-3 rounded-lg bg-muted/20 border border-border/50">
                    <p className="text-lg font-bold font-mono tracking-tighter" style={{ color: item.fill }}>{item.label}</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{item.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-sm font-mono uppercase tracking-widest">Sector Performance (Daily)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {sectorPerformance.length > 0 ? (
                <div className="space-y-3">
                  {sectorPerformance.map(s => (
                    <div key={s.sector} className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-32 truncate">{s.sector}</span>
                      <div className="flex-1 h-6 rounded-sm overflow-hidden bg-muted/20 relative border border-border/30">
                        <div className={`absolute inset-y-0 left-0 ${s.avgChange >= 0 ? "bg-success/20" : "bg-destructive/20"}`} style={{ width: `${Math.min(Math.abs(s.avgChange) * 20, 100)}%` }} />
                        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold ${s.avgChange >= 0 ? "text-success" : "text-destructive"}`}>
                          {s.avgChange >= 0 ? "+" : ""}{s.avgChange}%
                        </span>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-mono min-w-[32px] justify-center h-5">{s.count}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono text-muted-foreground italic">No sector data available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Growth + Scatter */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/30 border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-sm font-mono uppercase tracking-widest">XR Market Growth by Segment ($B)</CardTitle>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Industry analyst projections</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthProjections}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "var(--font-mono)" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "var(--font-mono)" }} tickFormatter={v => `$${v}B`} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "10px" }} formatter={(value: number) => [`$${value}B`]} />
                    <Legend wrapperStyle={{ fontSize: "10px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }} />
                    <Bar dataKey="hardware" name="Hardware" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="software" name="Software" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="services" name="Services" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="content" name="Content" fill="hsl(var(--chart-4))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-sm font-mono uppercase tracking-widest">Market Cap vs Daily Change</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {scatterData.length > 0 ? (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ left: 10, right: 10 }}>
                      <XAxis type="number" dataKey="x" name="Market Cap" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "var(--font-mono)" }} tickFormatter={v => `$${v > 1000 ? `${(v/1000).toFixed(1)}T` : `${v.toFixed(0)}B`}`} />
                      <YAxis type="number" dataKey="y" name="Change %" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "var(--font-mono)" }} tickFormatter={v => `${v}%`} />
                      <ZAxis type="number" dataKey="z" range={[40, 400]} name="Volume" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "10px" }} />
                      <Scatter data={scatterData} fill="hsl(var(--chart-2))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-xs font-mono text-muted-foreground italic">No snapshot data available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Competitive Radar + Funding Funnel */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/30 border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-sm font-mono uppercase tracking-widest">Top 5 XR Companies – Competitive Radar</CardTitle>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Computed from actual company metrics</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={computedData.radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "var(--font-mono)" }} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    {computedData.top5Names.map((name, i) => (
                      <Radar key={name} name={name} dataKey={name} stroke={SEGMENT_COLORS[i]} fill={SEGMENT_COLORS[i]} fillOpacity={i === 0 ? 0.15 : 0.1} strokeWidth={2} />
                    ))}
                    <Legend wrapperStyle={{ fontSize: "10px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "10px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/50">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-sm font-mono uppercase tracking-widest">XR Startup Funding Funnel</CardTitle>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">From {startups.length} tracked startups & {unicorns.length} unicorns</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {computedData.funnelData.filter(s => s.value > 0).map(stage => {
                  const maxVal = Math.max(...computedData.funnelData.map(d => d.value));
                  const widthPercent = (stage.value / maxVal) * 100;
                  return (
                    <div key={stage.name} className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-20 text-right shrink-0">{stage.name}</span>
                      <div className="flex-1 relative h-9 bg-muted/10 rounded-sm border border-border/30 overflow-hidden">
                        <div className="absolute inset-y-0 left-0 flex items-center justify-end pr-3 transition-all duration-1000 ease-out" style={{ width: `${widthPercent}%`, backgroundColor: stage.fill, opacity: 0.8 }}>
                          <span className="text-[10px] font-mono font-bold text-white">{stage.value}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/50">
                  <p className="text-lg font-bold font-mono tracking-tighter text-primary">{startups.length}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Startups</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/50">
                  <p className="text-lg font-bold font-mono tracking-tighter text-primary">{unicorns.length}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Unicorns</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/50">
                  <p className="text-lg font-bold font-mono tracking-tighter text-primary">{startups.length > 0 ? ((unicorns.length / (startups.length + unicorns.length)) * 100).toFixed(1) : 0}%</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Unicorn Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Status */}
        <div className="mb-8">
          <PipelineStatus />
        </div>

        {/* Bottom: News */}
        <Card className="bg-card/30 border-border/50">
          <CardHeader className="border-b border-border/50 bg-muted/20">
            <CardTitle className="text-sm font-mono uppercase tracking-widest">Latest Market Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {newsItems && newsItems.length > 0 ? (
                newsItems.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="flex h-2 w-2 mt-2 shrink-0 rounded-full bg-primary animate-pulse" />
                    <div className="flex-1">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors cursor-pointer leading-snug">{item.title}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {item.source && <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-tighter bg-muted/30">{item.source}</Badge>}
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">
                          {item.publishedAt ? format(new Date(item.publishedAt), "MMM d, yyyy") : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs font-mono text-muted-foreground italic">No news ingested yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
