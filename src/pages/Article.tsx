import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, TrendingUp, MapPin, Bot } from 'lucide-react';
import { useArticle } from '@/hooks/useArticles';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { format } from 'date-fns';
import { calculateReadingTime } from '@/lib/readingTime';

// Parse article content - convert markdown to HTML with structured insights
const parseArticleContent = (content: string): string => {
  return content
    // Convert [INSIGHT]...[/INSIGHT] to styled blocks
    .replace(/\[INSIGHT\](.*?)\[\/INSIGHT\]/gs, '<div class="insight-premium"><strong>Analyst Insight:</strong> $1</div>')
    // Convert [NOTE]...[/NOTE] to styled blocks
    .replace(/\[NOTE\](.*?)\[\/NOTE\]/gs, '<div class="note-premium"><strong>Strategic Note:</strong> $1</div>')
    // Remove bold/italic markers completely for a cleaner look
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Convert headers
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    // Convert blockquotes
    .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>')
    // Convert numbered lists
    .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')
    // Convert bullet points
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    // Remove any orphan # characters
    .replace(/^#\s*$/gm, '')
    // Convert paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p>')
    // Convert single newlines in remaining text
    .replace(/\n/g, '<br/>')
    // Wrap in paragraph tags
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p><br\/><\/p>/g, '')
    // Clean up paragraph wrapping around headers and custom blocks
    .replace(/<p>(<(h[23]|div|blockquote))/g, '$1')
    .replace(/(<\/(h[23]|div|blockquote)>)<\/p>/g, '$1');
};

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
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <Link to={`/${article.category}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to {categoryLabels[article.category]}
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="text-xs">{categoryLabels[article.category]}</Badge>
              <Badge variant="secondary" className="text-xs">{article.subcategory}</Badge>
              {article.region && (
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />{article.region}
                </Badge>
              )}
              {article.trending && (
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold mb-4">{article.title}</h1>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">{article.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm">
                    {article.author.avatar === 'AI' ? <Bot className="h-5 w-5" /> : article.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm flex items-center gap-1.5">
                    {article.author.name}
                    {article.author.avatar === 'AI' && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">AI Generated</Badge>
                    )}
                  </p>
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
            <CardContent className="p-5">
              <h3 className="font-medium text-base mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <div 
            className="prose prose-base max-w-none mb-12 
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tighter [&_h2]:uppercase [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-foreground
              [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-primary
              [&_p]:text-base [&_p]:leading-8 [&_p]:mb-6 [&_p]:text-foreground/80
              [&_li]:text-base [&_li]:leading-8 [&_li]:mb-2 [&_li]:text-foreground/80
              [&_blockquote]:text-lg [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:text-primary/80
              [&_.insight-premium]:p-6 [&_.insight-premium]:bg-primary/5 [&_.insight-premium]:border [&_.insight-premium]:border-primary/20 [&_.insight-premium]:rounded-2xl [&_.insight-premium]:my-10 [&_.insight-premium]:text-base [&_.insight-premium]:leading-8 [&_.insight-premium]:relative
              [&_.insight-premium]:before:content-[''] [&_.insight-premium]:before:absolute [&_.insight-premium]:before:left-0 [&_.insight-premium]:before:top-0 [&_.insight-premium]:before:bottom-0 [&_.insight-premium]:before:w-1 [&_.insight-premium]:before:bg-primary
              [&_.note-premium]:p-6 [&_.note-premium]:bg-secondary/30 [&_.note-premium]:border [&_.note-premium]:border-black/5 [&_.note-premium]:rounded-2xl [&_.note-premium]:my-10 [&_.note-premium]:text-base [&_.note-premium]:leading-8 [&_.note-premium]:italic
            " 
            dangerouslySetInnerHTML={{ 
              __html: parseArticleContent(article.content)
            }} 
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-10">
            <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" />Share</Button>
            <Button variant="outline" size="sm"><Bookmark className="h-4 w-4 mr-2" />Save</Button>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-5">Related Articles</h2>
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
