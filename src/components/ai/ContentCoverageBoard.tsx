import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowUpRight, Globe, Newspaper, Radar, Sparkles } from 'lucide-react';
import { useHybridArticles } from '@/hooks/useHybridArticles';

const coverageLabels: Record<string, string> = {
  'market-intelligence': 'Market Intel',
  'tech-explain': 'Tech Explain',
  'events': 'Events',
  'companies': 'Companies',
  'spatial-updates': 'Spatial Updates',
};

const requiredCoverage = [
  { key: 'market-intelligence', label: 'Market Intel' },
  { key: 'tech-explain', label: 'Tech Explain' },
  { key: 'events', label: 'Events' },
  { key: 'companies', label: 'Companies' },
  { key: 'spatial-updates', label: 'Spatial Updates' },
];

export function ContentCoverageBoard() {
  const { all: articles } = useHybridArticles(undefined, 50);

  const coverage = useMemo(() => {
    const counts = articles.reduce<Record<string, number>>((acc, article) => {
      acc[article.category] = (acc[article.category] ?? 0) + 1;
      return acc;
    }, {});

    const latestByCategory = requiredCoverage.map((item) => {
      const latest = articles
        .filter((article) => article.category === item.key)
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())[0];

      const ageHours = latest
        ? Math.max(0, Math.round((Date.now() - latest.publishedAt.getTime()) / (1000 * 60 * 60)))
        : null;

      return {
        ...item,
        count: counts[item.key] ?? 0,
        ageHours,
        stale: ageHours === null || ageHours > 120,
        latestTitle: latest?.title ?? 'No coverage yet',
      };
    });

    const gaps = latestByCategory.filter((item) => item.count === 0 || item.stale);

    return { latestByCategory, gaps };
  }, [articles]);

  return (
    <Card className="glass-premium border-black/5 shadow-sm overflow-hidden">
      <CardHeader className="pb-4 border-b border-black/5 bg-black/[0.02]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-[10px] font-mono uppercase tracking-[0.35em] font-bold flex items-center gap-2">
              <Radar className="h-4 w-4 text-primary" />
              Content Coverage Board
            </CardTitle>
            <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Shows what content is missing, stale, or ready to refresh
            </p>
          </div>
          <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest bg-primary/5 border-primary/20 text-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            Live Audit
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {coverage.latestByCategory.map((item) => (
            <div
              key={item.key}
              className={`p-3 rounded-xl border ${item.stale ? 'border-amber-500/30 bg-amber-500/5' : 'border-black/5 bg-black/[0.02]'}`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {coverageLabels[item.key]}
                </span>
                <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest h-5 px-2">
                  {item.count}
                </Badge>
              </div>
              <p className="text-sm font-medium leading-snug">{item.latestTitle}</p>
              <p className="mt-2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                {item.ageHours === null ? 'No publish history' : `${item.ageHours}h ago`}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <Globe className="h-3.5 w-3.5 text-primary" />
            Recommended next articles
          </div>
          {coverage.gaps.length > 0 ? (
            <div className="space-y-2">
              {coverage.gaps.map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-secondary/30 border border-black/5">
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
                      {item.count === 0 ? 'Missing coverage' : 'Coverage is stale'}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                Coverage looks balanced. The next step is refreshing the oldest category.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
          <Newspaper className="h-3.5 w-3.5" />
          Refresh priority is based on age, category balance, and article availability.
        </div>
      </CardContent>
    </Card>
  );
}
