import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Calendar } from 'lucide-react';
import { type Article } from '@/data/articles';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

export const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  const categoryLabels: Record<string, string> = {
    'market-intelligence': 'Market Intelligence',
    'tech-explain': 'Tech Explain',
    'events': 'Events & Ecosystem',
    'companies': 'Company Structure',
    'spatial-updates': 'Spatial Updates',
  };

  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.slug}`}>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">{categoryLabels[article.category]}</Badge>
              {article.trending && <TrendingUp className="h-3 w-3 text-accent" />}
            </div>
            <h4 className="font-semibold text-sm line-clamp-2 mb-2">{article.title}</h4>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
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
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{categoryLabels[article.category]}</Badge>
            {article.trending && (
              <Badge className="bg-accent/20 text-accent border-accent/30">
                <TrendingUp className="h-3 w-3 mr-1" /> Trending
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="pt-2 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(article.publishedAt, 'MMM d, yyyy')}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
