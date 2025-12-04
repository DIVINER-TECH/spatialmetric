import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, TrendingUp, MapPin } from 'lucide-react';
import { useArticle } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { format } from 'date-fns';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, relatedArticles } = useArticle(slug || '');

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-3">Article Not Found</h1>
            <Link to="/">
              <Button size="sm">Return Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    'market-intelligence': 'Market Intelligence',
    'tech-explain': 'Tech Explain',
    'events': 'Events & Ecosystem',
    'companies': 'Company Structure',
    'spatial-updates': 'Spatial Updates',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-6 max-w-3xl">
          {/* Breadcrumb */}
          <Link to={`/${article.category}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-3 w-3" />
            Back to {categoryLabels[article.category]}
          </Link>

          {/* Header */}
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline" className="text-xs">{categoryLabels[article.category]}</Badge>
              <Badge variant="secondary" className="text-xs">{article.subcategory}</Badge>
              {article.region && (
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />{article.region}
                </Badge>
              )}
              {article.trending && (
                <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-3">{article.title}</h1>
            <p className="text-base text-muted-foreground mb-4">{article.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{article.author.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{article.author.name}</p>
                  <p className="text-xs text-muted-foreground">{article.author.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}m</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{format(article.publishedAt, 'MMM d, yyyy')}</span>
              </div>
            </div>
          </header>

          {/* Key Takeaways */}
          <Card className="mb-6 border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-2">Key Takeaways</h3>
              <ul className="space-y-1.5">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <div 
            className="prose prose-sm prose-invert max-w-none mb-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_li]:text-sm [&_blockquote]:text-sm [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-3" 
            dangerouslySetInnerHTML={{ 
              __html: article.content
                .replace(/\n/g, '<br/>')
                .replace(/## /g, '<h2>')
                .replace(/### /g, '<h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/> (.*?)(<br\/>|$)/g, '<blockquote>$1</blockquote>') 
            }} 
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mb-8">
            <Button variant="outline" size="sm" className="text-xs"><Share2 className="h-3 w-3 mr-1.5" />Share</Button>
            <Button variant="outline" size="sm" className="text-xs"><Bookmark className="h-3 w-3 mr-1.5" />Save</Button>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-3">
                {relatedArticles.map(a => (
                  <ArticleCard key={a.id} article={a} variant="compact" />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
