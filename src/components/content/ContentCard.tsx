import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles } from "lucide-react";
import { format } from "date-fns";
import type { ContentItem } from "@/hooks/useContentItems";

interface ContentCardProps {
  item: ContentItem;
}

const typeLabels: Record<string, string> = {
  "market-brief": "Market Brief",
  "article": "Article",
  "startup-profile": "Startup",
  "company-profile": "Company",
  "tech-explain": "Tech",
};

export const ContentCard = ({ item }: ContentCardProps) => {
  const label = typeLabels[item.type] ?? "Insight";
  const publishedLabel = item.publishedAt
    ? format(new Date(item.publishedAt), "MMM d")
    : "—";

  return (
    <Card className="hover:border-primary/50 transition-all cursor-pointer h-full group">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              {label}
            </Badge>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs px-2 py-0.5">
            <Sparkles className="h-3 w-3 mr-1" /> AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <h3 className="font-medium text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {item.excerpt}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4 px-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{publishedLabel}</span>
        </div>
        <span>Updated</span>
      </CardFooter>
    </Card>
  );
};
