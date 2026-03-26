import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Calendar, MapPin, Globe, CalendarDays } from 'lucide-react';
import { type Article } from '@/data/articles';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
  index?: number;
}

const categoryLabels: Record<string, string> = {
  'market-intelligence': 'Market Intel',
  'tech-explain': 'Tech',
  'events': 'Events',
  'companies': 'Companies',
  'spatial-updates': 'Updates',
};

export const ArticleCard = ({ article, variant = 'default', index = 0 }: ArticleCardProps) => {
  const hasImage = article.imageUrl && article.imageUrl !== '/placeholder.svg';
  const CategoryIcon = Globe;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" as any }
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ x: 5 }}
      >
        <Link to={`/article/${article.slug}`}>
          <Card className="glass-premium hover:border-primary/50 transition-colors cursor-pointer h-full border-black/5 overflow-hidden group shadow-sm">
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest border-primary/30 text-primary">{categoryLabels[article.category]}</Badge>
                {article.trending && <TrendingUp className="h-3 w-3 text-primary animate-pulse" />}
              </div>
              <h4 className="font-bold font-mono text-sm uppercase tracking-tighter line-clamp-2 mb-2 leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span>{format(article.publishedAt, 'MMM d')}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/article/${article.slug}`}>
        <Card className="glass-premium group overflow-hidden flex flex-col h-full border-black/5 transition-all duration-500 relative shadow-sm">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          {/* Featured image or gradient fallback */}
          <div className={`relative h-48 w-full bg-secondary/50 overflow-hidden border-b border-black/5`}>
            {hasImage ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                <CategoryIcon className="h-16 w-16 text-primary/10" />
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              {article.category && (
                <Badge variant="secondary" className="text-[10px] font-mono tracking-[0.2em] font-bold uppercase py-1 px-3 bg-white/80 backdrop-blur-md border-black/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {categoryLabels[article.category]}
                </Badge>
              )}
              {article.trending && (
                <Badge className="bg-primary text-black text-[10px] font-mono uppercase tracking-widest px-3 py-1 font-bold shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </Badge>
              )}
            </div>
          </div>

          <CardHeader className="pb-2 pt-6 px-6 relative z-10">
            <div className="flex items-center gap-3">
              {article.region && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
                  <MapPin className="h-3.5 w-3.5" />
                  {article.region}
                </div>
              )}
              <div className="h-1 w-1 rounded-full bg-primary/30" />
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                {article.readTime}m read
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-6 px-6 flex-1 relative z-10">
            <h3 className="text-xl font-bold font-mono tracking-tighter uppercase mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {article.title}
            </h3>
            <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider line-clamp-3 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
              {article.excerpt}
            </p>
          </CardContent>

          <CardFooter className="pt-0 pb-6 px-6 flex items-center justify-between border-t border-black/5 bg-secondary/30 relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
              <Calendar className="h-3.5 w-3.5 text-primary/50" />
              <span>{format(article.publishedAt, 'MMM d, yyyy')}</span>
            </div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-primary"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Analyze</span>
              <TrendingUp className="h-3 w-3" />
            </motion.div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
