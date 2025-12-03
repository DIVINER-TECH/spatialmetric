import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, TrendingUp } from 'lucide-react';
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
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link to="/">
              <Button>Return Home</Button>
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
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <Link to={`/${article.category}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to {categoryLabels[article.category]}
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{categoryLabels[article.category]}</Badge>
              <Badge variant="secondary">{article.subcategory}</Badge>
              {article.trending && (
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{article.author.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">{article.author.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime} min read</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{format(article.publishedAt, 'MMM d, yyyy')}</span>
              </div>
            </div>
          </header>

          {/* Key Takeaways */}
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2 class="text-2xl font-bold mt-8 mb-4">').replace(/### /g, '<h3 class="text-xl font-semibold mt-6 mb-3">').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/> (.*?)(<br\/>|$)/g, '<blockquote class="border-l-4 border-primary pl-4 italic my-4">$1</blockquote>') }} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-12">
            <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" />Share</Button>
            <Button variant="outline" size="sm"><Bookmark className="h-4 w-4 mr-2" />Save</Button>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-4">
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
