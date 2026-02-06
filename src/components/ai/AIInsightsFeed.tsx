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
    <Card className="border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2 font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Market Brief
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {insight ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-base leading-snug">{insight.headline}</p>
              <Badge variant="outline" className={`text-xs ${signalColor}`}>
                <SignalIcon className="h-3 w-3 mr-1" />
                {insight.signal}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{insight.summary}</p>
            {insight.metrics && insight.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {insight.metrics.slice(0, 3).map((m, i) => (
                  <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                    <p className="text-sm font-medium">{m.value}</p>
                    {m.change && (
                      <p className={`text-xs ${m.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {m.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">No AI market brief yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
