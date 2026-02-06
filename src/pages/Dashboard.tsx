import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { useNewsItems } from "@/hooks/useNewsItems";
import { tickerStocks } from "@/data/marketData";
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
} from "recharts";
import { format } from "date-fns";

const fallbackIndexSeries = [
  { date: "2025-01-01", value: 100 },
  { date: "2025-02-01", value: 103 },
  { date: "2025-03-01", value: 101 },
  { date: "2025-04-01", value: 106 },
  { date: "2025-05-01", value: 110 },
  { date: "2025-06-01", value: 114 },
  { date: "2025-07-01", value: 118 },
  { date: "2025-08-01", value: 115 },
  { date: "2025-09-01", value: 121 },
  { date: "2025-10-01", value: 126 },
  { date: "2025-11-01", value: 130 },
  { date: "2025-12-01", value: 134 },
];

const segmentData = [
  { name: "AR/MR Headsets", value: 35, color: "hsl(var(--chart-1))" },
  { name: "VR Headsets", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Software/Apps", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Enterprise Solutions", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Accessories", value: 5, color: "hsl(var(--chart-5))" },
];

const fundingData = [
  { quarter: "Q1 2024", amount: 3.2 },
  { quarter: "Q2 2024", amount: 4.1 },
  { quarter: "Q3 2024", amount: 3.8 },
  { quarter: "Q4 2024", amount: 5.2 },
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

  const indexSeries = snapshot?.indexSeries?.length ? snapshot.indexSeries : fallbackIndexSeries;
  const latestIndex = indexSeries[indexSeries.length - 1];
  const prevIndex = indexSeries[indexSeries.length - 2];
  const indexChangePercent = latestIndex && prevIndex && prevIndex.value !== 0
    ? ((latestIndex.value - prevIndex.value) / prevIndex.value) * 100
    : 0;

  const companies = snapshot?.topCompanies?.length ? snapshot.topCompanies : tickerStocks;
  const avgChange = companies.length > 0
    ? companies.reduce((sum, c) => sum + c.changePercent, 0) / companies.length
    : 0;
  const gainers = companies.filter((c) => c.changePercent > 0).length;
  const losers = companies.filter((c) => c.changePercent < 0).length;
  const totalVolume = companies.reduce((sum, c) => sum + c.volume, 0);

  const kpiCards = [
    {
      title: "XR Market Index",
      value: latestIndex ? latestIndex.value.toFixed(1) : "—",
      change: `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%`,
      positive: indexChangePercent >= 0,
      icon: DollarSign,
      description: "daily index level",
    },
    {
      title: "Average Daily Move",
      value: `${avgChange.toFixed(2)}%`,
      change: `${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(2)}%`,
      positive: avgChange >= 0,
      icon: Activity,
      description: "equal-weighted move",
    },
    {
      title: "Gainers / Losers",
      value: `${gainers} / ${losers}`,
      change: "",
      positive: gainers >= losers,
      icon: Users,
      description: "today's split",
    },
    {
      title: "Total Volume",
      value: formatVolume(totalVolume),
      change: "",
      positive: true,
      icon: Glasses,
      description: "tracked tickers",
    },
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
          <p className="text-muted-foreground">
            Daily spatial computing market metrics and investment data
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdatedLabel}
          </p>
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
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        kpi.positive ? "text-success" : "text-destructive"
                      }`}
                    >
                      {kpi.positive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {kpi.change}
                    </div>
                  ) : null}
                </div>
                <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
                {kpi.description ? (
                  <div className="text-xs text-muted-foreground">{kpi.description}</div>
                ) : null}
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
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={formatAxisDate}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => value.toFixed(1)}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [value.toFixed(2), "Index"]}
                          labelFormatter={(label: string) => formatAxisDate(label)}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="value"
                          name="Index"
                          stroke="hsl(var(--chart-2))"
                          fillOpacity={1}
                          fill="url(#colorIndex)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="line">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={indexSeries}>
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={formatAxisDate}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => value.toFixed(1)}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [value.toFixed(2), "Index"]}
                          labelFormatter={(label: string) => formatAxisDate(label)}
                        />
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
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, ""]}
                    />
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
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* VC Funding */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Quarterly VC Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fundingData}>
                    <XAxis
                      dataKey="quarter"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickFormatter={(value) => `$${value}B`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value}B`, "Funding"]}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Companies */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Top XR Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {companies.map((company) => {
                  const positive = company.changePercent >= 0;
                  const capOrPrice = company.marketCap
                    ? formatMarketCap(company.marketCap)
                    : `$${company.price.toFixed(2)}`;

                  return (
                    <div key={company.symbol} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">{company.symbol}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{capOrPrice}</div>
                      <div
                        className={`flex items-center justify-end gap-1 text-sm ${
                          positive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {positive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {positive ? "+" : ""}
                        {company.changePercent}%
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
                            <Badge variant="secondary" className="text-xs">
                              {item.source}
                            </Badge>
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
