import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { NewsCard } from '@/components/news/NewsCard';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { useHybridArticles } from '@/hooks/useHybridArticles';
import { useNewsItems } from '@/hooks/useNewsItems';
import { Zap } from 'lucide-react';

const SpatialUpdates = () => {
  const { articles } = useHybridArticles('spatial-updates');
  const { data: newsItems } = useNewsItems(24);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-10 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-mono tracking-tighter uppercase">Spatial Updates</h1>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                  Daily news, product launches, and updates from the spatial computing industry
                </p>
              </div>
              <div className="ml-auto">
                <LiveIndicator label="Daily" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems && newsItems.length > 0 ? (
                newsItems.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))
              ) : (
                articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SpatialUpdates;
