import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";
import { format } from "date-fns";
import type { NewsItem } from "@/hooks/useNewsItems";

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard = ({ item }: NewsCardProps) => {
  const publishedLabel = item.publishedAt
    ? format(new Date(item.publishedAt), "MMM d")
    : "—";

  return (
    <Card className="hover:border-primary/50 transition-colors h-full">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between gap-2">
          {item.source ? (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              {item.source}
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground">News</span>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{publishedLabel}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <h3 className="font-medium text-base mb-2 leading-snug line-clamp-2">
          {item.title}
        </h3>
        {item.summary && (
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4 px-4 text-xs text-muted-foreground">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          Read source
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
};
