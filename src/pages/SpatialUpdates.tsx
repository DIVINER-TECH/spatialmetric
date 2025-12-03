import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { useArticles } from '@/hooks/useArticles';
import { Zap } from 'lucide-react';

const SpatialUpdates = () => {
  const { articles } = useArticles('spatial-updates');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold">Spatial Updates</h1>
              <LiveIndicator />
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Breaking news, product launches, and real-time updates from the spatial computing industry.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SpatialUpdates;
