import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MarketBrief {
  headline: string;
  summary: string;
  metrics: { label: string; value: string; change?: string }[];
  signal: 'bullish' | 'bearish' | 'neutral';
}

export const AIInsightsFeed = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insight, setInsight] = useState<MarketBrief | null>(null);

  const generateInsight = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { type: 'market-brief', region: 'Global' }
      });

      if (error) throw error;
      
      if (data?.success && data?.data) {
        setInsight(data.data);
        toast.success('Fresh insight generated');
      }
    } catch (err) {
      console.error('Error generating insight:', err);
      toast.error('Failed to generate insight');
    } finally {
      setIsGenerating(false);
    }
  };

  const SignalIcon = insight?.signal === 'bullish' ? TrendingUp : 
                     insight?.signal === 'bearish' ? TrendingDown : Minus;
  const signalColor = insight?.signal === 'bullish' ? 'text-green-500' : 
                      insight?.signal === 'bearish' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Market Brief
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={generateInsight}
            disabled={isGenerating}
            className="h-7 text-xs"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {insight ? (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-sm">{insight.headline}</p>
              <Badge variant="outline" className={`text-[10px] ${signalColor}`}>
                <SignalIcon className="h-3 w-3 mr-1" />
                {insight.signal}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{insight.summary}</p>
            {insight.metrics && insight.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {insight.metrics.slice(0, 3).map((m, i) => (
                  <div key={i} className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-[10px] text-muted-foreground">{m.label}</p>
                    <p className="text-xs font-bold">{m.value}</p>
                    {m.change && (
                      <p className={`text-[10px] ${m.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {m.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground mb-2">Click refresh to generate AI insights</p>
            <Button variant="outline" size="sm" onClick={generateInsight} disabled={isGenerating}>
              <Sparkles className="h-3 w-3 mr-1" />
              Generate Insight
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
