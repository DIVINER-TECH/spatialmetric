import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Calendar, MapPin, Cpu, BarChart3, Globe, Building2, CalendarDays } from 'lucide-react';
import { type Article } from '@/data/articles';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

const categoryGradients: Record<string, string> = {
  'market-intelligence': 'from-chart-1/30 to-chart-2/20',
  'tech-explain': 'from-chart-3/30 to-chart-4/20',
  'events': 'from-chart-5/30 to-chart-1/20',
  'companies': 'from-chart-2/30 to-chart-3/20',
  'spatial-updates': 'from-chart-4/30 to-chart-5/20',
};

const categoryIcons: Record<string, typeof Cpu> = {
  'market-intelligence': BarChart3,
  'tech-explain': Cpu,
  'events': CalendarDays,
  'companies': Building2,
  'spatial-updates': Globe,
};

export const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  const categoryLabels: Record<string, string> = {
    'market-intelligence': 'Market Intel',
    'tech-explain': 'Tech',
    'events': 'Events',
    'companies': 'Companies',
    'spatial-updates': 'Updates',
  };

  const hasImage = article.imageUrl && article.imageUrl !== '/placeholder.svg';
  const gradient = categoryGradients[article.category] || 'from-primary/20 to-secondary/20';
  const CategoryIcon = categoryIcons[article.category] || Globe;

  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.slug}`}>
        <Card className="border border-black hover:border-primary/50 transition-colors cursor-pointer h-full">
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
      <Card className="border border-black hover:border-primary/50 transition-all duration-500 cursor-pointer h-full group overflow-hidden bg-card/30 backdrop-blur-sm flex flex-col">
        {/* Featured image or gradient fallback */}
        <div className={`relative h-48 w-full bg-muted/20 overflow-hidden`}>
          {hasImage ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 flex items-center justify-center`}>
              <CategoryIcon className="h-16 w-16 text-primary/20" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest bg-background/80 backdrop-blur-md border-primary/30 text-primary px-2 py-0.5 font-bold">
              {categoryLabels[article.category]}
            </Badge>
            {article.trending && (
              <Badge className="bg-primary text-primary-foreground text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold animate-pulse">
                <TrendingUp className="h-3 w-3 mr-1" /> Hot
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex items-center gap-3">
            {article.region && (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
                <MapPin className="h-3 w-3" />
                {article.region}
              </div>
            )}
            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {article.readTime}m read
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6 px-6 flex-1">
          <h3 className="text-xl font-bold font-mono tracking-tighter uppercase mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h3>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest line-clamp-3 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {article.excerpt}
          </p>
        </CardContent>
        <CardFooter className="pt-0 pb-6 px-6 flex items-center justify-between border-t border-border/30 bg-muted/5">
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
            <Calendar className="h-3.5 w-3.5 text-primary/50" />
            <span>{format(article.publishedAt, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Analyze</span>
            <TrendingUp className="h-3 w-3" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
