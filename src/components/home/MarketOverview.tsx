import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity, Layers, Building2, BarChart3 } from "lucide-react";
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

  const stats = [
    {
      title: "Global Capability index",
      value: latestIndex ? latestIndex.value.toFixed(1) : "SCANNING...",
      change: latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "",
      positive: indexChangePercent >= 0,
      icon: Activity,
    },
    {
      title: "Aggregate Valuation",
      value: formatMarketCap(totalStaticMarketCap),
      change: "",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Vertical Integration",
      value: `${uniqueSectors} SECTORS`,
      change: "",
      positive: true,
      icon: Layers,
    },
    {
      title: "Neural Node Count",
      value: `${staticCompanies.length} ENTITIES`,
      change: "",
      positive: true,
      icon: Building2,
    },
  ];

  return (
    <section className="container py-32 md:py-48 relative">
      <div className="absolute top-0 right-10 w-px h-64 bg-gradient-to-b from-primary/30 to-transparent opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-10 glass-premium border-border flex items-center justify-center rounded-lg">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase leading-none">
              Market <span className="text-primary">Dynamics</span>
            </h2>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] mt-3">
              Spatial computing market variance & vector analytics
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <Card className="glass-premium overflow-hidden h-full group">
            <CardHeader className="border-b border-[hsl(var(--border-brand-dark)/0.2)] bg-secondary/40 p-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-primary animate-pulse" />
                  Performance Vector Matrix
                </span>
                <div className={`flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-secondary/80 border border-border/50 ${indexChangePercent >= 0 ? "text-primary" : "text-destructive"}`}>
                  {indexChangePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "SYNCHRONIZING"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="h-[400px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={indexSeries}>
                    <defs>
                      <linearGradient id="colorValueV3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} 
                      tickFormatter={formatAxisDate} 
                      dy={15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} 
                      tickFormatter={value => `$${value}`} 
                      dx={-15}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))", 
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)",
                        fontFamily: "var(--font-mono)",
                        color: "hsl(var(--foreground))",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                      }} 
                      labelStyle={{ color: "hsl(var(--primary))", fontWeight: "bold", marginBottom: "4px" }} 
                      formatter={(value: number) => [`${value.toFixed(2)} UNIT`, "VALUE"]} 
                      labelFormatter={formatAxisDate} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorValueV3)" 
                      animationDuration={3000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-premium h-full group hover:bg-secondary/20 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-4 py-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 border border-[hsl(var(--border-brand-dark)/0.2)] group-hover:border-primary/40 transition-all duration-500">
                      <stat.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    {stat.change ? (
                      <div className={`flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 bg-secondary rounded-full border border-[hsl(var(--border-brand-dark)/0.2)] ${stat.positive ? "text-primary shadow-[0_0_10px_rgba(var(--primary),0.2)]" : "text-destructive"}`}>
                        {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {stat.change}
                      </div>
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/20 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-1.5 group-hover:text-foreground/70 transition-colors">{stat.title}</p>
                    <p className="text-3xl font-bold font-mono tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
