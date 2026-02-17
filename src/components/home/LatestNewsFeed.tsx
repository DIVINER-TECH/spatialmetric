import { ExternalLink, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LiveIndicator } from "@/components/shared/LiveIndicator";
import { useNewsItems } from "@/hooks/useNewsItems";
import { formatDistanceToNow } from "date-fns";

export function LatestNewsFeed() {
  const { data: newsItems, isLoading } = useNewsItems(5);

  return (
    <section className="container py-12 md:py-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Newspaper className="h-5 w-5 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Latest News</h2>
          <LiveIndicator />
        </div>
      </div>

      <div className="grid gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="bg-card/50 animate-pulse">
              <CardContent className="py-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/4" />
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
              <Card className="bg-card/50 hover:border-primary/50 transition-all duration-200">
                <CardContent className="py-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {item.source && (
                        <Badge variant="secondary" className="text-xs">
                          {item.source}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {item.publishedAt
                          ? formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })
                          : "—"}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </a>
          ))
        ) : (
          <Card className="bg-card/50">
            <CardContent className="py-8 text-center">
              <p className="text-sm text-muted-foreground">No news available yet. Data pipeline will populate this automatically.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
