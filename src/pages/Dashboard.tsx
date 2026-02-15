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
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  RadialBarChart, RadialBar, ScatterChart, Scatter, ZAxis,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { format } from "date-fns";
import { useMemo } from "react";

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
  const { data: snapshot } = useMarketSnapshot();
  const { data: newsItems } = useNewsItems(5);

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
    { title: "Total XR Market Cap", value: formatMarketCap(computedData.totalStaticMarketCap), change: "", positive: true, icon: DollarSign, description: `${staticCompanies.length} tracked companies` },
    { title: "Total R&D Investment", value: formatMarketCap(computedData.totalRAndD), change: "", positive: true, icon: Activity, description: "annual R&D spend" },
    { title: "Sectors Covered", value: `${computedData.uniqueSectors}`, change: "", positive: true, icon: Layers, description: "unique sectors" },
    { title: "Companies Tracked", value: `${computedData.totalTracked}`, change: "", positive: true, icon: Building2, description: "public + private" },
  ];

  const lastUpdatedLabel = snapshot?.asOfDate ? format(new Date(snapshot.asOfDate), "MMM d, yyyy") : "—";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">Market Dashboard</h1>
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Daily
            </Badge>
          </div>
          <p className="text-muted-foreground">Spatial computing market metrics, company analytics, and investment data</p>
          <p className="text-xs text-muted-foreground mt-2">Last snapshot: {lastUpdatedLabel}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map(kpi => (
            <Card key={kpi.title} className="bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <kpi.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
                <div className="text-xs text-muted-foreground">{kpi.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stock Performance Ranking */}
        <Card className="bg-card/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              XR Stock Performance Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 text-muted-foreground font-medium">#</th>
                    <th className="text-left py-3 text-muted-foreground font-medium">Ticker</th>
                    <th className="text-left py-3 text-muted-foreground font-medium">Company</th>
                    <th className="text-left py-3 text-muted-foreground font-medium hidden md:table-cell">Sector</th>
                    <th className="text-right py-3 text-muted-foreground font-medium">Price</th>
                    <th className="text-right py-3 text-muted-foreground font-medium">Change</th>
                    <th className="text-right py-3 text-muted-foreground font-medium hidden sm:table-cell">Market Cap</th>
                    <th className="text-right py-3 text-muted-foreground font-medium hidden lg:table-cell">P/E</th>
                    <th className="text-right py-3 text-muted-foreground font-medium hidden lg:table-cell">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {computedData.stockRanking.map((stock, idx) => {
                    const positive = stock.change >= 0;
                    return (
                      <tr key={stock.ticker} className="border-b border-border/30 hover:bg-muted/20">
                        <td className="py-3 text-muted-foreground">{idx + 1}</td>
                        <td className="py-3 font-mono font-semibold text-primary">{stock.ticker}</td>
                        <td className="py-3">{stock.name}</td>
                        <td className="py-3 text-muted-foreground hidden md:table-cell">{stock.sector}</td>
                        <td className="py-3 text-right font-mono">${stock.price.toFixed(2)}</td>
                        <td className={`py-3 text-right font-mono ${positive ? 'text-success' : 'text-destructive'}`}>
                          {positive ? '+' : ''}{stock.change.toFixed(2)}%
                        </td>
                        <td className="py-3 text-right font-mono hidden sm:table-cell">{formatMarketCap(stock.marketCap)}</td>
                        <td className="py-3 text-right hidden lg:table-cell">{stock.peRatio?.toFixed(1) ?? '—'}</td>
                        <td className="py-3 text-right hidden lg:table-cell">{stock.margin.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Index + Segments */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-card/50">
            <CardHeader><CardTitle>XR Market Performance Trend</CardTitle></CardHeader>
            <CardContent>
              <Tabs defaultValue="area">
                <TabsList className="mb-4">
                  <TabsTrigger value="area">Area</TabsTrigger>
                  <TabsTrigger value="line">Line</TabsTrigger>
                </TabsList>
                <TabsContent value="area">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={indexSeries}>
                        <defs><linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} /></linearGradient></defs>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={formatAxisDate} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={v => v.toFixed(1)} />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [value.toFixed(2), "Index"]} labelFormatter={formatAxisDate} />
                        <Area type="monotone" dataKey="value" name="Index" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorIndex)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="line">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={indexSeries}>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={formatAxisDate} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={v => v.toFixed(1)} />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [value.toFixed(2), "Index"]} labelFormatter={formatAxisDate} />
                        <Line type="monotone" dataKey="value" name="Index" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader><CardTitle>Market Segments</CardTitle></CardHeader>
            <CardContent>
              {segmentData.length > 0 ? (
                <>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={segmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                          {segmentData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [`${value}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {segmentData.map(segment => (
                      <div key={segment.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
                          <span className="text-muted-foreground">{segment.name}</span>
                        </div>
                        <span className="font-medium">{segment.value}%</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Market segments feed not connected yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* TAM/SAM/SOM + Sector Heatmap */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Spatial Computing Market Sizing (2030)</CardTitle>
              <p className="text-xs text-muted-foreground">Industry research estimates</p>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" barSize={20} data={tamSamSomData}>
                    <RadialBar dataKey="value" cornerRadius={6} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number, _: string, props: any) => [`$${value}B`, props.payload.name]} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {tamSamSomData.map(item => (
                  <div key={item.name} className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-lg font-bold" style={{ color: item.fill }}>{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader><CardTitle>Sector Performance (Daily)</CardTitle></CardHeader>
            <CardContent>
              {sectorPerformance.length > 0 ? (
                <div className="space-y-2">
                  {sectorPerformance.map(s => (
                    <div key={s.sector} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-32 truncate">{s.sector}</span>
                      <div className="flex-1 h-8 rounded-md overflow-hidden bg-muted/30 relative">
                        <div className={`absolute inset-y-0 left-0 ${s.avgChange >= 0 ? "bg-success/30" : "bg-destructive/30"}`} style={{ width: `${Math.min(Math.abs(s.avgChange) * 20, 100)}%` }} />
                        <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${s.avgChange >= 0 ? "text-success" : "text-destructive"}`}>
                          {s.avgChange >= 0 ? "+" : ""}{s.avgChange}%
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs min-w-[32px] justify-center">{s.count}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sector data available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Growth + Scatter */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>XR Market Growth by Segment ($B)</CardTitle>
              <p className="text-xs text-muted-foreground">Industry analyst projections</p>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthProjections}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={v => `$${v}B`} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [`$${value}B`]} />
                    <Legend />
                    <Bar dataKey="hardware" name="Hardware" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="software" name="Software" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="services" name="Services" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="content" name="Content" fill="hsl(var(--chart-4))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader><CardTitle>Market Cap vs Daily Change</CardTitle></CardHeader>
            <CardContent>
              {scatterData.length > 0 ? (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ left: 10, right: 10 }}>
                      <XAxis type="number" dataKey="x" name="Market Cap" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={v => `$${v > 1000 ? `${(v/1000).toFixed(1)}T` : `${v.toFixed(0)}B`}`} />
                      <YAxis type="number" dataKey="y" name="Change %" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={v => `${v}%`} />
                      <ZAxis type="number" dataKey="z" range={[40, 400]} name="Volume" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                      <Scatter data={scatterData} fill="hsl(var(--chart-2))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No snapshot data available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Competitive Radar + Funding Funnel */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Top 5 XR Companies – Competitive Radar</CardTitle>
              <p className="text-xs text-muted-foreground">Computed from actual company metrics</p>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={computedData.radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    {computedData.top5Names.map((name, i) => (
                      <Radar key={name} name={name} dataKey={name} stroke={SEGMENT_COLORS[i]} fill={SEGMENT_COLORS[i]} fillOpacity={i === 0 ? 0.15 : 0.1} strokeWidth={2} />
                    ))}
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>XR Startup Funding Funnel</CardTitle>
              <p className="text-xs text-muted-foreground">From {startups.length} tracked startups & {unicorns.length} unicorns</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {computedData.funnelData.filter(s => s.value > 0).map(stage => {
                  const maxVal = Math.max(...computedData.funnelData.map(d => d.value));
                  const widthPercent = (stage.value / maxVal) * 100;
                  return (
                    <div key={stage.name} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-20 text-right shrink-0">{stage.name}</span>
                      <div className="flex-1 relative h-9">
                        <div className="absolute inset-y-0 left-0 rounded-r-md flex items-center justify-end pr-3" style={{ width: `${widthPercent}%`, backgroundColor: stage.fill, minWidth: '60px' }}>
                          <span className="text-xs font-bold text-primary-foreground">{stage.value}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-muted/30">
                  <p className="text-lg font-bold text-primary">{startups.length}</p>
                  <p className="text-xs text-muted-foreground">Startups</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/30">
                  <p className="text-lg font-bold text-primary">{unicorns.length}</p>
                  <p className="text-xs text-muted-foreground">Unicorns</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/30">
                  <p className="text-lg font-bold text-primary">{startups.length > 0 ? ((unicorns.length / (startups.length + unicorns.length)) * 100).toFixed(1) : 0}%</p>
                  <p className="text-xs text-muted-foreground">Unicorn Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom: News */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle>Latest News</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsItems && newsItems.length > 0 ? (
                newsItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.source && <Badge variant="secondary" className="text-xs">{item.source}</Badge>}
                        <span className="text-xs text-muted-foreground">
                          {item.publishedAt ? format(new Date(item.publishedAt), "MMM d") : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No news ingested yet.</p>
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
