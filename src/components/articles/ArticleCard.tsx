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
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs px-2 py-0.5">{categoryLabels[article.category]}</Badge>
              {article.trending && <TrendingUp className="h-3 w-3 text-primary" />}
              {article.region && <span className="text-xs text-muted-foreground">{article.region}</span>}
            </div>
            <h4 className="font-medium text-sm line-clamp-2 mb-2 leading-snug">{article.title}</h4>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}m</span>
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
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0.5">{categoryLabels[article.category]}</Badge>
              {article.region && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  <MapPin className="h-3 w-3 mr-1" />{article.region}
                </Badge>
              )}
            </div>
            {article.trending && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs px-2 py-0.5">
                <TrendingUp className="h-3 w-3 mr-1" /> Hot
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2 px-4">
          <h3 className="font-medium text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="pt-2 pb-4 px-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(article.publishedAt, 'MMM d')}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
