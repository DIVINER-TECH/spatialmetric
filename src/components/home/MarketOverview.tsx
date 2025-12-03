import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Building2, Layers } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const marketData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 43 },
  { month: "Apr", value: 48 },
  { month: "May", value: 52 },
  { month: "Jun", value: 55 },
  { month: "Jul", value: 58 },
  { month: "Aug", value: 54 },
  { month: "Sep", value: 60 },
  { month: "Oct", value: 65 },
  { month: "Nov", value: 68 },
  { month: "Dec", value: 72 },
];

const stats = [
  {
    title: "XR Market Size",
    value: "$52.4B",
    change: "+18.2%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "384M",
    change: "+24.5%",
    positive: true,
    icon: Users,
  },
  {
    title: "XR Companies",
    value: "847",
    change: "+12.3%",
    positive: true,
    icon: Building2,
  },
  {
    title: "App Downloads",
    value: "2.1B",
    change: "-3.1%",
    positive: false,
    icon: Layers,
  },
];

export function MarketOverview() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Market Overview</h2>
        <p className="text-muted-foreground">Real-time spatial computing market metrics</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>XR Market Growth (2024)</span>
              <div className="flex items-center gap-2 text-success text-sm font-normal">
                <TrendingUp className="h-4 w-4" />
                +71.4% YTD
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`$${value}B`, "Market Size"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className={`flex items-center gap-1 mt-2 text-sm ${stat.positive ? "text-success" : "text-destructive"}`}>
                  {stat.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {stat.change} vs last year
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
