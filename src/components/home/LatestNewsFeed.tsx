import { ExternalLink, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LiveIndicator } from "@/components/shared/LiveIndicator";
import { useNewsItems } from "@/hooks/useNewsItems";
import { formatDistanceToNow } from "date-fns";

export function LatestNewsFeed() {
  const { data: newsItems, isLoading } = useNewsItems(5);

  return (
    <section className="container py-16 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Newspaper className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tighter uppercase">Latest Intelligence</h2>
            <div className="flex items-center gap-2 mt-1">
              <LiveIndicator />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Real-time News Stream</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="bg-card/30 border-border/50 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted/20 rounded w-3/4 mb-4" />
                <div className="h-3 bg-muted/20 rounded w-1/4" />
              </CardContent>
            </Card>
          ))
        ) : newsItems && newsItems.length > 0 ? (
          newsItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card className="bg-card/30 border-border/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm group-hover:bg-muted/5">
                <CardContent className="p-6 flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono font-bold text-sm group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight leading-relaxed">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      {item.source && (
                        <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest bg-primary/5 border-primary/20 text-primary px-2 py-0">
                          {item.source}
                        </Badge>
                      )}
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                        {item.publishedAt
                          ? formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })
                          : "—"}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors shrink-0">
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))
        ) : (
          <Card className="bg-card/30 border-border/50 border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">No intelligence reports available. Monitoring data streams…</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
