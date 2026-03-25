import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity, Layers, Building2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { companies as staticCompanies } from "@/data/companies";
import { format } from "date-fns";

const formatAxisDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return format(parsed, "MMM d");
};

const formatMarketCap = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  return `$${(value / 1e6).toFixed(0)}M`;
};

export function MarketOverview() {
  const { data: snapshot } = useMarketSnapshot();
  const indexSeries = snapshot?.indexSeries ?? [];
  const snapshotCompanies = snapshot?.topCompanies ?? [];

  const latestIndex = indexSeries.length > 0 ? indexSeries[indexSeries.length - 1] : undefined;
  const prevIndex = indexSeries.length > 1 ? indexSeries[indexSeries.length - 2] : undefined;
  const indexChangePercent = latestIndex && prevIndex && prevIndex.value !== 0
    ? ((latestIndex.value - prevIndex.value) / prevIndex.value) * 100
    : 0;

  const totalStaticMarketCap = staticCompanies.reduce((s, c) => s + c.marketCap, 0);
  const uniqueSectors = new Set(staticCompanies.map(c => c.sector)).size;
  const totalVolume = snapshotCompanies.reduce((s, c) => s + c.volume, 0);

  const stats = [
    {
      title: "Total XR Market Cap",
      value: formatMarketCap(totalStaticMarketCap),
      change: latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "",
      positive: indexChangePercent >= 0,
      icon: DollarSign,
    },
    {
      title: "Daily Index",
      value: latestIndex ? latestIndex.value.toFixed(1) : "—",
      change: latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "",
      positive: indexChangePercent >= 0,
      icon: Activity,
    },
    {
      title: "Sectors Covered",
      value: `${uniqueSectors}`,
      change: "",
      positive: true,
      icon: Layers,
    },
    {
      title: "Companies Tracked",
      value: `${staticCompanies.length}`,
      change: "",
      positive: true,
      icon: Building2,
    },
  ];

  return (
    <section className="container py-20 md:py-28">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Market Intelligence</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase mb-2">Market Overview</h2>
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Spatial computing market metrics and performance analytics</p>
        {snapshot?.asOfDate ? (
          <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <Activity className="h-3 w-3 text-success" />
            <span>Last Sync: {format(new Date(snapshot.asOfDate), "MMM d, yyyy HH:mm")} UTC</span>
          </div>
        ) : (
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-4 animate-pulse">Initializing data streams…</p>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card/30 border-border/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/5">
            <CardTitle className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest font-bold">Market Performance Trend</span>
              <div className={`flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest ${indexChangePercent >= 0 ? "text-success" : "text-destructive"}`}>
                {indexChangePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "—"}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indexSeries}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "var(--font-mono)" }} 
                    tickFormatter={formatAxisDate} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "var(--font-mono)" }} 
                    tickFormatter={value => value.toFixed(0)} 
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(var(--card-rgb), 0.9)", 
                      border: "1px solid rgba(var(--border-rgb), 0.5)", 
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      textTransform: "uppercase"
                    }} 
                    labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold", marginBottom: "4px" }} 
                    formatter={(value: number) => [value.toFixed(2), "Index"]} 
                    labelFormatter={formatAxisDate} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {stats.map(stat => (
            <Card key={stat.title} className="bg-card/30 border-border/50 backdrop-blur-sm group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  {stat.change ? (
                    <div className={`flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest ${stat.positive ? "text-success" : "text-destructive"}`}>
                      {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stat.change}
                    </div>
                  ) : null}
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold font-mono tracking-tighter text-primary">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
