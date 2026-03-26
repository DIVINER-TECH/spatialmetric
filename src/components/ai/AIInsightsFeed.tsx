import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, TrendingDown, Minus, Cpu } from 'lucide-react';
import { useContentItems } from '@/hooks/useContentItems';

interface MarketBrief {
  headline: string;
  summary: string;
  metrics: { label: string; value: string; change?: string }[];
  signal: 'bullish' | 'bearish' | 'neutral';
}

export const AIInsightsFeed = () => {
  const { data: briefs } = useContentItems('market-brief', 1);
  const brief = briefs && briefs.length > 0 ? briefs[0] : null;
  const insight = brief?.metadata as unknown as MarketBrief | undefined;

  const SignalIcon = insight?.signal === 'bullish' ? TrendingUp :
    insight?.signal === 'bearish' ? TrendingDown : Minus;
  const signalColor = insight?.signal === 'bullish' ? 'text-primary' :
    insight?.signal === 'bearish' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-premium border-black/5 overflow-hidden group relative shadow-sm">
        <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
          <Cpu className="h-32 w-32 text-primary" />
        </div>
        
        <CardHeader className="pb-3 border-b border-black/5 bg-black/[0.03]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[10px] font-mono uppercase tracking-[0.4em] flex items-center gap-2 text-primary font-bold">
              <Sparkles className="h-3 w-3 animate-pulse" />
              Neural Node Analysis
            </CardTitle>
            <Badge className="text-[9px] font-mono uppercase tracking-widest bg-white text-primary border border-primary/20">
              STABLE_v2.4
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          {insight ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-mono font-bold text-xl leading-none uppercase tracking-tighter group-hover:text-primary transition-colors">{insight.headline}</h3>
                </div>
                <Badge variant="outline" className={`text-[9px] font-mono uppercase tracking-widest px-4 py-1.5 border-black/5 ${signalColor} bg-black/[0.03] shadow-sm`}>
                  <SignalIcon className="h-3 w-3 mr-2" />
                  Signal: {insight.signal}
                </Badge>
              </div>

              <div className="relative p-4 bg-secondary/30 rounded-xl border border-black/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                <p className="text-[11px] font-mono text-foreground leading-relaxed uppercase tracking-wide italic font-medium">
                  "{insight.summary}"
                </p>
              </div>

              {insight.metrics && insight.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {insight.metrics.slice(0, 3).map((m, i) => (
                    <div key={i} className="text-center p-3 bg-black/[0.03] rounded-xl border border-black/5 group-hover:border-primary/20 transition-all">
                      <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{m.label}</p>
                      <p className="text-[12px] font-mono font-bold tracking-tighter text-foreground">{m.value}</p>
                      {m.change && (
                        <p className={`text-[9px] font-mono font-bold mt-1 ${m.change.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                          {m.change}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Confidence: 94.2%</span>
                <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Core: GPT-4o-M</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-black/10 rounded-2xl bg-black/[0.02]">
              <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] animate-pulse">Establishing Satellite Uplink...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
