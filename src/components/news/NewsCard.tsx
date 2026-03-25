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
    <Card className="hover:border-primary/50 transition-all duration-300 h-full bg-card/30 border-border/50 backdrop-blur-sm flex flex-col group">
      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest border-primary/30 text-primary px-2 py-0.5 font-bold">
              {item.source || "INTEL"}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
            <Clock className="h-3 w-3 text-primary/50" />
            <span>{publishedLabel}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6 px-6 flex-1">
        <h3 className="text-base font-bold font-mono tracking-tighter uppercase mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {item.title}
        </h3>
        {item.summary && (
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest line-clamp-3 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {item.summary}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-6 px-6 border-t border-border/30 bg-muted/5">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group/link"
        >
          <span className="font-bold">Access Source Terminal</span>
          <ExternalLink className="h-3 w-3 translate-x-0 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </CardFooter>
    </Card>
  );
};
