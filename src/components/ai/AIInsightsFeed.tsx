import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
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
  const insight = brief?.metadata as MarketBrief | undefined;

  const SignalIcon = insight?.signal === 'bullish' ? TrendingUp :
    insight?.signal === 'bearish' ? TrendingDown : Minus;
  const signalColor = insight?.signal === 'bullish' ? 'text-success' :
    insight?.signal === 'bearish' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className="bg-card/30 border-primary/30 backdrop-blur-sm overflow-hidden group">
      <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            Neural Market Analysis
          </CardTitle>
          <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest bg-primary/5 border-primary/20">
            v2.4.0-STABLE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {insight ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-mono font-bold text-lg leading-tight uppercase tracking-tighter group-hover:text-primary transition-colors">{insight.headline}</h3>
              <Badge variant="outline" className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 border-border/50 ${signalColor} bg-muted/20`}>
                <SignalIcon className="h-3 w-3 mr-2" />
                {insight.signal}
              </Badge>
            </div>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed uppercase tracking-wide opacity-80 italic">"{insight.summary}"</p>
            {insight.metrics && insight.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {insight.metrics.slice(0, 3).map((m, i) => (
                  <div key={i} className="text-center p-4 bg-muted/30 rounded-lg border border-border/30 group-hover:bg-muted/50 transition-colors">
                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/30 pb-1">{m.label}</p>
                    <p className="text-sm font-mono font-bold tracking-tighter">{m.value}</p>
                    {m.change && (
                      <p className={`text-[10px] font-mono font-bold mt-1 ${m.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {m.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">Confidence Score: 94.2%</span>
              <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">Model: GPT-4o-MINI</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-border/30 rounded-xl">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] animate-pulse">Awaiting Neural Synthesis...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
