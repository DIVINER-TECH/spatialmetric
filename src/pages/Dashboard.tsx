import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Glasses,
  Smartphone,
  Headphones,
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

const marketCapData = [
  { month: "Jan", vr: 18, ar: 22, mr: 8 },
  { month: "Feb", vr: 20, ar: 24, mr: 9 },
  { month: "Mar", vr: 19, ar: 26, mr: 10 },
  { month: "Apr", vr: 22, ar: 28, mr: 11 },
  { month: "May", vr: 25, ar: 30, mr: 12 },
  { month: "Jun", vr: 28, ar: 32, mr: 14 },
  { month: "Jul", vr: 30, ar: 35, mr: 15 },
  { month: "Aug", vr: 28, ar: 36, mr: 16 },
  { month: "Sep", vr: 32, ar: 38, mr: 18 },
  { month: "Oct", vr: 35, ar: 42, mr: 20 },
  { month: "Nov", vr: 38, ar: 45, mr: 22 },
  { month: "Dec", vr: 42, ar: 48, mr: 25 },
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

const topCompanies = [
  { name: "Meta Platforms", ticker: "META", marketCap: "$1.2T", change: 3.45, positive: true },
  { name: "Apple Inc", ticker: "AAPL", marketCap: "$3.0T", change: 1.23, positive: true },
  { name: "Microsoft", ticker: "MSFT", marketCap: "$2.8T", change: 2.18, positive: true },
  { name: "NVIDIA", ticker: "NVDA", marketCap: "$1.1T", change: 4.56, positive: true },
  { name: "Unity Software", ticker: "U", marketCap: "$10.8B", change: -2.34, positive: false },
  { name: "Snap Inc", ticker: "SNAP", marketCap: "$24.2B", change: -1.89, positive: false },
];

const kpiCards = [
  {
    title: "Total XR Market Cap",
    value: "$52.4B",
    change: "+18.2%",
    positive: true,
    icon: DollarSign,
    description: "vs last year",
  },
  {
    title: "Monthly Active XR Users",
    value: "384M",
    change: "+24.5%",
    positive: true,
    icon: Users,
    description: "global users",
  },
  {
    title: "XR Hardware Shipments",
    value: "12.8M",
    change: "+32.1%",
    positive: true,
    icon: Glasses,
    description: "units YTD",
  },
  {
    title: "VC Funding (2024)",
    value: "$16.3B",
    change: "+8.7%",
    positive: true,
    icon: Activity,
    description: "total raised",
  },
];

const recentActivity = [
  {
    event: "Apple announces Vision Pro 2 development",
    category: "Product",
    time: "2 hours ago",
  },
  {
    event: "Meta acquires spatial audio startup for $120M",
    category: "M&A",
    time: "5 hours ago",
  },
  {
    event: "Qualcomm XR2 Gen 3 chip benchmarks leaked",
    category: "Tech",
    time: "8 hours ago",
  },
  {
    event: "Unity announces enterprise XR partnership",
    category: "Partnership",
    time: "12 hours ago",
  },
  {
    event: "XR developer conference dates announced",
    category: "Event",
    time: "1 day ago",
  },
];

const Dashboard = () => {
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
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Real-time spatial computing market metrics and investment data
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
                </div>
                <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Market Cap Trend */}
          <Card className="lg:col-span-2 bg-card/50">
            <CardHeader>
              <CardTitle>XR Market Cap by Segment</CardTitle>
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
                      <AreaChart data={marketCapData}>
                        <defs>
                          <linearGradient id="colorVr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorAr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorMr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="month"
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
                          formatter={(value: number) => [`$${value}B`, ""]}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="ar"
                          name="AR"
                          stroke="hsl(var(--chart-2))"
                          fillOpacity={1}
                          fill="url(#colorAr)"
                          stackId="1"
                        />
                        <Area
                          type="monotone"
                          dataKey="vr"
                          name="VR"
                          stroke="hsl(var(--chart-1))"
                          fillOpacity={1}
                          fill="url(#colorVr)"
                          stackId="1"
                        />
                        <Area
                          type="monotone"
                          dataKey="mr"
                          name="MR"
                          stroke="hsl(var(--chart-3))"
                          fillOpacity={1}
                          fill="url(#colorMr)"
                          stackId="1"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="line">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={marketCapData}>
                        <XAxis
                          dataKey="month"
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
                          formatter={(value: number) => [`$${value}B`, ""]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="ar" name="AR" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="vr" name="VR" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="mr" name="MR" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
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
                {topCompanies.map((company) => (
                  <div key={company.ticker} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">{company.ticker}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{company.marketCap}</div>
                      <div
                        className={`flex items-center justify-end gap-1 text-sm ${
                          company.positive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {company.positive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {company.positive ? "+" : ""}
                        {company.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm">{item.event}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
