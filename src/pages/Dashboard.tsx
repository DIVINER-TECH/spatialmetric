import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { useNewsItems } from "@/hooks/useNewsItems";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Glasses,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { format } from "date-fns";

// Sector mapping for companies
const SECTOR_MAP: Record<string, string> = {
  AAPL: "Hardware",
  META: "Social/Metaverse",
  MSFT: "Enterprise",
  NVDA: "Semiconductor",
  GOOG: "Software/AI",
  GOOGL: "Software/AI",
  SONY: "Gaming/Hardware",
  QCOM: "Semiconductor",
  SNAP: "Social/AR",
  RBLX: "Gaming",
  U: "Gaming Engine",
  "005930.KS": "Hardware",
  MTTR: "Enterprise",
  VUZI: "Hardware",
  IMMR: "Input Tech",
  MVIS: "LiDAR/Sensing",
  KOPN: "Displays",
  LAZR: "LiDAR/Sensing",
  AEVA: "LiDAR/Sensing",
};

const SEGMENT_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(210, 70%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(340, 60%, 50%)",
  "hsl(160, 55%, 45%)",
];

// Curated quarterly VC funding data for XR sector (2025-2026)
const fundingData = [
  { quarter: "Q1 2025", amount: 3.8 },
  { quarter: "Q2 2025", amount: 4.2 },
  { quarter: "Q3 2025", amount: 6.8 },
  { quarter: "Q4 2025", amount: 3.6 },
  { quarter: "Q1 2026", amount: 5.1 },
];

// TAM/SAM/SOM data for spatial computing market
const tamSamSomData = [
  { name: "TAM", value: 280, fill: "hsl(var(--chart-1))", label: "$280B" },
  { name: "SAM", value: 85, fill: "hsl(var(--chart-2))", label: "$85B" },
  { name: "SOM", value: 24, fill: "hsl(var(--chart-3))", label: "$24B" },
];

// Market growth projections
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
    ? ((latestIndex.value - prevIndex.value) / prevIndex.value) * 100
    : 0;

  const companies = (snapshot?.topCompanies ?? [])
    .slice()
    .sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0));

  // Compute segment data from companies
  const segmentData = (() => {
    if (companies.length === 0) return [];
    const sectorTotals: Record<string, number> = {};
    companies.forEach((c) => {
      const sector = SECTOR_MAP[c.symbol] ?? "Other";
      sectorTotals[sector] = (sectorTotals[sector] ?? 0) + (c.marketCap ?? 0);
    });
    const totalCap = Object.values(sectorTotals).reduce((s, v) => s + v, 0);
    if (totalCap === 0) return [];
    return Object.entries(sectorTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value], idx) => ({
        name,
        value: Math.round((value / totalCap) * 1000) / 10,
        color: SEGMENT_COLORS[idx % SEGMENT_COLORS.length],
      }));
  })();

  // Market share by company (top 10)
  const marketShareData = (() => {
    if (companies.length === 0) return [];
    const totalCap = companies.reduce((sum, c) => sum + (c.marketCap ?? 0), 0);
    if (totalCap === 0) return [];
    return companies.slice(0, 10).map((c) => ({
      name: c.name,
      share: Math.round(((c.marketCap ?? 0) / totalCap) * 1000) / 10,
      cap: c.marketCap ?? 0,
    }));
  })();

  // Sector performance heatmap
  const sectorPerformance = (() => {
    if (companies.length === 0) return [];
    const sectorChanges: Record<string, number[]> = {};
    companies.forEach((c) => {
      const sector = SECTOR_MAP[c.symbol] ?? "Other";
      if (!sectorChanges[sector]) sectorChanges[sector] = [];
      sectorChanges[sector].push(c.changePercent);
    });
    return Object.entries(sectorChanges)
      .map(([sector, changes]) => ({
        sector,
        avgChange: Math.round((changes.reduce((s, v) => s + v, 0) / changes.length) * 100) / 100,
        count: changes.length,
      }))
      .sort((a, b) => b.avgChange - a.avgChange);
  })();

  // Scatter data: market cap vs change
  const scatterData = companies.slice(0, 15).map((c) => ({
    x: c.marketCap ? c.marketCap / 1e9 : 0,
    y: c.changePercent,
    z: c.volume / 1e6,
    name: c.symbol,
  }));

  const avgChange = companies.length > 0
    ? companies.reduce((sum, c) => sum + c.changePercent, 0) / companies.length
    : 0;
  const gainers = companies.filter((c) => c.changePercent > 0).length;
  const losers = companies.filter((c) => c.changePercent < 0).length;
  const totalVolume = companies.reduce((sum, c) => sum + c.volume, 0);
  const hasSnapshot = Boolean(indexSeries.length && companies.length);

  const kpiCards = hasSnapshot
    ? [
        { title: "XR Market Index", value: latestIndex ? latestIndex.value.toFixed(1) : "—", change: `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%`, positive: indexChangePercent >= 0, icon: DollarSign, description: "daily index level" },
        { title: "Average Daily Move", value: `${avgChange.toFixed(2)}%`, change: `${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(2)}%`, positive: avgChange >= 0, icon: Activity, description: "equal-weighted move" },
        { title: "Gainers / Losers", value: `${gainers} / ${losers}`, change: "", positive: gainers >= losers, icon: Users, description: "today's split" },
        { title: "Total Volume", value: formatVolume(totalVolume), change: "", positive: true, icon: Glasses, description: "tracked tickers" },
      ]
    : [
        { title: "XR Market Index", value: "—", change: "", positive: true, icon: DollarSign, description: "no snapshot data yet" },
        { title: "Average Daily Move", value: "—", change: "", positive: true, icon: Activity, description: "no snapshot data yet" },
        { title: "Gainers / Losers", value: "—", change: "", positive: true, icon: Users, description: "no snapshot data yet" },
        { title: "Total Volume", value: "—", change: "", positive: true, icon: Glasses, description: "no snapshot data yet" },
      ];

  const lastUpdatedLabel = snapshot?.asOfDate
    ? format(new Date(snapshot.asOfDate), "MMM d, yyyy")
    : "—";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">Market Dashboard</h1>
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Daily
            </Badge>
          </div>
          <p className="text-muted-foreground">Daily spatial computing market metrics and investment data</p>
          <p className="text-xs text-muted-foreground mt-2">Last updated: {lastUpdatedLabel}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((kpi) => (
            <Card key={kpi.title} className="bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <kpi.icon className="h-5 w-5 text-primary" />
                  </div>
                  {kpi.change ? (
                    <div className={`flex items-center gap-1 text-sm font-medium ${kpi.positive ? "text-success" : "text-destructive"}`}>
                      {kpi.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {kpi.change}
                    </div>
                  ) : null}
                </div>
                <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
                <div className="text-xs text-muted-foreground">{kpi.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Market Cap Trend */}
          <Card className="lg:col-span-2 bg-card/50">
            <CardHeader>
              <CardTitle>XR Public Market Index</CardTitle>
            </CardHeader>
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
                        <defs>
                          <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={formatAxisDate} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(v) => v.toFixed(1)} />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [value.toFixed(2), "Index"]} labelFormatter={(l: string) => formatAxisDate(l)} />
                        <Legend />
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
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(v) => v.toFixed(1)} />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [value.toFixed(2), "Index"]} labelFormatter={(l: string) => formatAxisDate(l)} />
                        <Legend />
                        <Line type="monotone" dataKey="value" name="Index" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Market Segments Pie */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Market Segments</CardTitle>
            </CardHeader>
            <CardContent>
              {segmentData.length > 0 ? (
                <>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={segmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                          {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [`${value}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {segmentData.map((segment) => (
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

        {/* TAM/SAM/SOM + Market Share */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* TAM/SAM/SOM */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Spatial Computing Market Sizing (2030)</CardTitle>
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
                {tamSamSomData.map((item) => (
                  <div key={item.name} className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-lg font-bold" style={{ color: item.fill }}>{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Share by Company */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Market Share by Company</CardTitle>
            </CardHeader>
            <CardContent>
              {marketShareData.length > 0 ? (
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketShareData} layout="vertical" margin={{ left: 60 }}>
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={55} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [`${value}%`, "Share"]} />
                      <Bar dataKey="share" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No market data available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Growth Projections + Sector Heatmap */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* YoY Growth by Sector */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>XR Market Growth by Segment ($B)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthProjections}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
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

          {/* Sector Performance Heatmap */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Sector Performance (Daily)</CardTitle>
            </CardHeader>
            <CardContent>
              {sectorPerformance.length > 0 ? (
                <div className="space-y-2">
                  {sectorPerformance.map((s) => (
                    <div key={s.sector} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-32 truncate">{s.sector}</span>
                      <div className="flex-1 h-8 rounded-md overflow-hidden bg-muted/30 relative">
                        <div
                          className={`absolute inset-y-0 left-0 ${s.avgChange >= 0 ? "bg-success/30" : "bg-destructive/30"}`}
                          style={{ width: `${Math.min(Math.abs(s.avgChange) * 20, 100)}%` }}
                        />
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

        {/* Scatter + VC Funding */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Market Cap vs Daily Change */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Market Cap vs Daily Change</CardTitle>
            </CardHeader>
            <CardContent>
              {scatterData.length > 0 ? (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ left: 10, right: 10 }}>
                      <XAxis type="number" dataKey="x" name="Market Cap" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `$${v > 1000 ? `${(v/1000).toFixed(1)}T` : `${v.toFixed(0)}B`}`} />
                      <YAxis type="number" dataKey="y" name="Change %" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                      <ZAxis type="number" dataKey="z" range={[40, 400]} name="Volume" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number, name: string) => [name === "Market Cap" ? `$${value.toFixed(0)}B` : name === "Change %" ? `${value}%` : `${value.toFixed(1)}M`, name]} />
                      <Scatter data={scatterData} fill="hsl(var(--chart-2))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No data available.</p>
              )}
            </CardContent>
          </Card>

          {/* VC Funding */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Quarterly VC Funding (XR Sector)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fundingData}>
                    <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [`$${value}B`, "Funding"]} />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Companies */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Top XR Companies by Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {companies.map((company, idx) => {
                  const positive = company.changePercent >= 0;
                  return (
                    <div key={company.symbol} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground w-5 text-right">{idx + 1}</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {company.name.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{company.name}</div>
                          <div className="text-xs text-muted-foreground">{company.symbol} · {SECTOR_MAP[company.symbol] ?? "XR"}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm">{formatMarketCap(company.marketCap)}</div>
                        <div className={`flex items-center justify-end gap-1 text-xs ${positive ? "text-success" : "text-destructive"}`}>
                          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {positive ? "+" : ""}{company.changePercent}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Latest News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsItems && newsItems.length > 0 ? (
                  newsItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex h-2 w-2 mt-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {item.source && (
                            <Badge variant="secondary" className="text-xs">{item.source}</Badge>
                          )}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
