import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { type Article } from '@/data/articles';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

export const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  const categoryLabels: Record<string, string> = {
    'market-intelligence': 'Market Intel',
    'tech-explain': 'Tech',
    'events': 'Events',
    'companies': 'Companies',
    'spatial-updates': 'Updates',
  };

  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.slug}`}>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{categoryLabels[article.category]}</Badge>
              {article.trending && <TrendingUp className="h-2.5 w-2.5 text-accent" />}
              {article.region && <span className="text-[9px] text-muted-foreground">{article.region}</span>}
            </div>
            <h4 className="font-medium text-xs line-clamp-2 mb-1.5">{article.title}</h4>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{article.readTime}m</span>
              <span>{format(article.publishedAt, 'MMM d')}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`}>
      <Card className="hover:border-primary/50 transition-all cursor-pointer h-full group">
        <CardHeader className="pb-1.5 pt-3 px-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{categoryLabels[article.category]}</Badge>
              {article.region && (
                <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                  <MapPin className="h-2 w-2 mr-0.5" />{article.region}
                </Badge>
              )}
            </div>
            {article.trending && (
              <Badge className="bg-accent/20 text-accent border-accent/30 text-[9px] px-1.5 py-0">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> Hot
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-1.5 px-3">
          <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-2">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="pt-1.5 pb-3 px-3 flex items-center justify-between text-[10px] text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Clock className="h-3 w-3" />
            <span>{article.readTime}m read</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Calendar className="h-3 w-3" />
            <span>{format(article.publishedAt, 'MMM d')}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
