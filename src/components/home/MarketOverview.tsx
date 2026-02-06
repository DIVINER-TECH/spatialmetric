import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Layers } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { format } from "date-fns";

const formatAxisDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return format(parsed, "MMM d");
};

export function MarketOverview() {
  const { data: snapshot } = useMarketSnapshot();
  const indexSeries = snapshot?.indexSeries ?? [];
  const companies = snapshot?.topCompanies ?? [];

  const latestIndex = indexSeries.length > 0 ? indexSeries[indexSeries.length - 1] : undefined;
  const prevIndex = indexSeries.length > 1 ? indexSeries[indexSeries.length - 2] : undefined;
  const indexChangePercent = latestIndex && prevIndex && prevIndex.value !== 0
    ? ((latestIndex.value - prevIndex.value) / prevIndex.value) * 100
    : 0;

  const avgChange = companies.length > 0
    ? companies.reduce((sum, c) => sum + c.changePercent, 0) / companies.length
    : 0;
  const gainers = companies.filter((c) => c.changePercent > 0).length;
  const losers = companies.filter((c) => c.changePercent < 0).length;

  const stats = [
    {
      title: "XR Market Index",
      value: latestIndex ? latestIndex.value.toFixed(1) : "—",
      change: latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "",
      positive: indexChangePercent >= 0,
      icon: DollarSign,
    },
    {
      title: "Average Daily Move",
      value: companies.length > 0 ? `${avgChange.toFixed(2)}%` : "—",
      change: companies.length > 0 ? `${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(2)}%` : "",
      positive: avgChange >= 0,
      icon: Activity,
    },
    {
      title: "Gainers / Losers",
      value: companies.length > 0 ? `${gainers} / ${losers}` : "—",
      change: "",
      positive: gainers >= losers,
      icon: Users,
    },
    {
      title: "Tracked Companies",
      value: companies.length > 0 ? `${companies.length}` : "—",
      change: "",
      positive: true,
      icon: Layers,
    },
  ];

  return (
    <section className="container py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Market Overview</h2>
        <p className="text-muted-foreground">Daily spatial computing market metrics</p>
        {snapshot?.asOfDate ? (
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {format(new Date(snapshot.asOfDate), "MMM d, yyyy")}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground mt-2">
            No daily snapshot found. Deploy and run the `daily-market-snapshot` function to populate data.
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>XR Public Market Index</span>
              <div className={`flex items-center gap-2 text-sm font-normal ${indexChangePercent >= 0 ? "text-success" : "text-destructive"}`}>
                {indexChangePercent >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "—"}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indexSeries}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [value.toFixed(2), "Index"]}
                    labelFormatter={(label: string) => formatAxisDate(label)}
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
                {stat.change ? (
                  <div className={`flex items-center gap-1 mt-2 text-sm ${stat.positive ? "text-success" : "text-destructive"}`}>
                    {stat.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {stat.change} vs prior day
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
